import os
from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

# For Google Map API test purpose
@app.route('/map')
def map():
    map_key = os.environ.get("GOOGLE_KEY", "")
    return render_template('map.html', map_key=map_key)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.debug = True
    app.run(host='0.0.0.0', port=port)

