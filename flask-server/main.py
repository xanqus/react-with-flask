from flask import (Flask, render_template, request)
from flask_cors import CORS

app = Flask("__main__")
CORS(app)

@app.route("/")
def my_index():
    return render_template("index.html", flask_token="Hello   world")


@app.route('/post', methods=['POST'])
def post():
    value = request.form['test']
    return value

app.run(debug=True)