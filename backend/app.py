from flask import Flask, request, jsonify
from flask_cors import CORS

from ai_review import review_code

app = Flask(__name__)

CORS(app)


@app.route('/review', methods=['POST'])
def review():

    data = request.json

    code = data.get("code")

    ai_response = review_code(code)

    pylint_report = "Static analysis temporarily disabled"

    return jsonify({
        "ai_review": ai_response,
        "static_analysis": pylint_report
    })


if __name__ == '__main__':
    app.run(debug=True)