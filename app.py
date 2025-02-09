from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)  # Allow all origins (React frontend)

mydb = mysql.connector.connect(
    host="mysql-279450c7-rajkisanssvrs-16fb.k.aivencloud.com",
    port=22461,
    user="avnadmin",
    password="AVNS_7JH-2ruzIie96bkdhcs",
    database="defaultdb",
    ssl_ca="./ca.pem"
)

cursor = mydb.cursor()

cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(50) NOT NULL
    )
""")
mydb.commit()
@app.route("/")
def index():
    return "index page"

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    try:
        cursor = mydb.cursor()
        cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
        mydb.commit()
        return jsonify({"message": "User logged in successfully"})
    except mysql.connector.IntegrityError:
        return jsonify({"message": "error in logging"}), 400

if __name__ == "__main__":
    app.run(port=5001,debug=True)
