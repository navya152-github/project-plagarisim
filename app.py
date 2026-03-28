from flask import Flask, render_template, request
from model import check_similarity

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():

    result = None

    if request.method == "POST":

        text1 = request.form["text1"]
        text2 = request.form["text2"]

        result = check_similarity(text1, text2)

    return render_template("index.html", result=result)


if __name__ == "__main__":
    app.run(debug=True)