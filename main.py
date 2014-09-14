import os
import facebook
import plaid
from store import redis
from flask import Flask
from flask import request
from flask import render_template

app = Flask(__name__)

PLAID_ID = os.environ.get("PLAID_ID", "")
PLAID_KEY = os.environ.get("PLAID_KEY", "")
FB_KEY = os.environ.get("FACEBOOK_API_ID", "")
FB_SECRET = os.environ.get("FACEBOOK_API_SECRET", "")
REDIS_URL = os.getenv('REDISTOGO_URL', 'redis://localhost:6379')

def getFacebookId():


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
        resp = make_response("", ret)
        resp.set_cookie("fb_token", new_token["access_token"])
        return resp

    return "", 400

@app.route('/connect', methods=['POST'])
def auth():
    print "Called auth"
    fbToken = request.cookies["fb_token"]
    graph = facebook.GraphAPI(user["access_token"])
    if not graph:
        return "", 400
    fbId = graph.id

    accntype = request.form['type']
    username = request.form['username']
    password = request.form['password']
    email = request.form['email']

    plaid = Plaid(PLAID_ID, PLAID_KEY)
    secret_key = plaid.connect(accntype, username, password, email)
    print secret_key
    # redis.set(fbId, secret_key)
    return secret_key, 200

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

