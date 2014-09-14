import os
import facebook
import time
import json
from plaid_client import Plaid
from store import redis
from flask import Flask
from flask import redirect
from flask import request
from flask import render_template
from flask import make_response

app = Flask(__name__)

PLAID_ID = os.environ.get("PLAID_ID", "")
PLAID_KEY = os.environ.get("PLAID_KEY", "")
FB_KEY = os.environ.get("FACEBOOK_API_ID", "")
FB_SECRET = os.environ.get("FACEBOOK_API_SECRET", "")
REDIS_URL = os.getenv('REDISTOGO_URL', 'redis://localhost:6379')


@app.route('/connect', methods=['GET'])
def check():
    print "Called check"
    user = facebook.get_user_from_cookie(request.cookies, FB_KEY, FB_SECRET)
    if user:
        graph = facebook.GraphAPI(user["access_token"])
        fbId = user["uid"]
        if redis.exists(fbId):
            ret = 200
        else:
            ret = 201
        new_token = graph.extend_access_token(FB_KEY, FB_SECRET)
        resp = make_response("")
        resp.status_code = ret
        resp.set_cookie("fb_token", new_token["access_token"])
        return resp

    return "", 400

def getFbId():
    fbToken = request.cookies["fb_token"]
    graph = facebook.GraphAPI(fbToken)
    if not graph:
        return None
    profile = graph.get_object("me")
    fbId = profile['id']
    return fbId

@app.route('/unlink', methods=['GET', 'POST'])
def unlink():
    fbId = getFbId()
    if not fbId:
        return "", 403
    key = redis.get(fbId)
    redis.delete(fbId)
    plaid = Plaid(PLAID_ID, PLAID_KEY, key)
    plaid.delete()
    return redirect("/", code=302)

@app.route('/connect/step', methods=['POST'])
def mfa():
    fbId = getFbId()
    if not fbId:
        return "", 403
    key = redis.get(fbId)
    answer = request.form['answer']

    plaid = Plaid(PLAID_ID, PLAID_KEY, key)
    plaid_resp = plaid.answerMFA('chase', answer)
    if not plaid_resp:
        return "", 403
    return "", 200

@app.route('/connect', methods=['POST'])
def auth():
    print "Called auth"
    fbId = getFbId()
    if not fbId:
        return "", 403

    accntype = request.form['type']
    username = request.form['username']
    password = request.form['password']
    email = request.form['email']

    plaid = Plaid(PLAID_ID, PLAID_KEY)
    plaid_resp = plaid.connect(accntype, username, password, email)
    if not plaid_resp:
        return "", 403
    redis.set(fbId, plaid_resp['access_token'])
    if plaid_resp['mfa']:
        return plaid_resp['mfa']['message'], 201
    else:
        return "", 200

@app.route('/transactions', methods=['POST'])
def transactions():
    print "Called transactions"
    fbId = getFbId()
    if not fbId:
        return "", 403
    key = redis.get(fbId)
    daterange = request.form['daterange']
    dates = daterange.split("-")
    start = "-".join(dates[0].split("/"))
    end = "-".join(dates[1].split("/"))
    plaid = Plaid(PLAID_ID, PLAID_KEY, key)
    transactions = plaid.getTransactions(options={
            'gte':start,
            'lte':end
        })
    if not transactions:
        return "", 403
    print(transactions)
    map_key = os.environ.get("GOOGLE_KEY", "")
    return render_template('map.html', map_key=map_key, transactions=json.dumps(transactions['transactions']))

@app.route('/')
def index():
    print("Called index")
    return render_template('index.html')

# For Google Map API test purpose
@app.route('/map')
def map():
    print("Called map")
    map_key = os.environ.get("GOOGLE_KEY", "")
    transactions = getTransactions()
    return render_template('map.html', map_key=map_key, transactions=transactions)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.debug = True
    app.run(host='0.0.0.0', port=port)

