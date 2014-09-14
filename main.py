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
    user = facebook.get_user_from_cookie(request.cookies, FB_KEY, FB_SECRET)
    print request.cookies
    if user:
        return user["uid"]
    else:
        return None

@app.route('/connect', methods=['GET'])
def check():
    print "Called check"
    fbId = getFacebookId()
    print fbId
    if fbId:
        if redis.exists(fbId):
            return "", 200
        else:
            return "", 201
    return "", 400

@app.route('/connect', methods=['POST'])
def auth():
    print "Called auth"
    fbId = getFacebookId()
    if fbId:
        accntype = request.form['type']
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']

        plaid = Plaid(PLAID_ID, PLAID_KEY)
        secret_key = plaid.connect(accntype, username, password, email)
        redis.set(fbId, secret_key)
        return secret_key, 200

    return "", 400

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

