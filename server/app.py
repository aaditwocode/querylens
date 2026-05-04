from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
# CORS allows your React app (on port 3000/5173) to talk to Flask (on port 5000)
CORS(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from the Python Backend!", "status": "success"})

@app.route('/api/analyze', methods=['POST'])
def analyze_sql():
    # Example logic: receiving data from React
    # data = request.json
    return jsonify({
        "status": "success",
        "message": "SQL Analysis complete",
        "data": {"score": 85, "optimization": "Add index on user_id"}
    })
if __name__ == "__main__":
    app.run(debug=True, port=5001)