from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import sqlalchemy
import bcrypt

app = Flask(__name__)

CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

db = sqlalchemy.create_engine(
    "mariadb+pymysql://root:@localhost:3306/practicedb", echo=True
)

@app.route("/register", methods=["POST"])
@cross_origin()
def register():
    data = request.get_json()
    
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")
    
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    register_new_user_to_db(username, hashed_password, email)
    
    return jsonify({"message": "Registration was succesful"}), 200

def register_new_user_to_db(username, hashed_password, email):
    with db.connect() as conn:
        result = conn.execute(
            sqlalchemy.text(
                """
                INSERT INTO practice (id, username, password, email)
                VALUES (NULL, :username, :password, :email)
                """
            ),
            {
                "username": username,
                "password": hashed_password.decode('utf-8'),
                "email": email,
            },
        )
        conn.commit()
        
        
if __name__=="__main__":
    app.run(port=5001, debug=True)