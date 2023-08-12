from flask import Flask, request, session, jsonify, redirect, url_for
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
import google.auth
import google.auth.transport.requests
import google.oauth2.credentials
import requests
from google.oauth2 import id_token
from google.auth.transport import requests
import jwt
import requests
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from flask_pymongo import PyMongo
from pymongo import MongoClient
from PyDictionary import PyDictionary
from bson.json_util import dumps
from bson import ObjectId
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
secret_key =  os.getenv('SECRET_KEY')
jwt_secret_key = os.getenv('')
app.config["SECRET_KEY"] == secret_key
app.config["JWT_SECRET_KEY"] = 'JWT_SECRET_KEY'
jwt = JWTManager(app)



class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email


db_password = os.getenv("DB_PASSWORD")
connection_string = f"mongodb+srv://fahid_shadman:{db_password}@pythonapp.yr3unbi.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(connection_string)
db = client["User"]
users_collection = db["users"]
notes_collection = db['Notes'] 



@app.route('/google',methods=["GET","POST"])
def google():

    access_token = request.json['access_token']
    url = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={access_token}'.format(access_token=access_token)
    response = requests.get(url)
    name = response.json()['name']
    email = response.json()['email']


    user = User(name,email)
    result = users_collection.find_one(user.__dict__)

    if result == None:
         users_collection.insert_one(user.__dict__)
    
    else:
       name_from_db = result['name']
       email_from_db = result['email']

    access_token = create_access_token(identity = [email,name])
    res = {"access_token":access_token}
    
    return res


@app.route('/my_profile')
@jwt_required()
def my_profile():
    
    current_user = get_jwt_identity()

    email = current_user[0]
    name = current_user[1]

    response_body = {
        "name": name,
        "email" : email
    }
    return response_body


@app.route('/add_notes', methods=['POST'])
@jwt_required()
def add_notes():

    current_user = get_jwt_identity()

    email = current_user[0]
    name = current_user[1]
   

    user = users_collection.find_one({"email": email})
    quote = request.json.get('userInput1')
    book = request.json.get('userInput2')
    theme = request.json.get('userInput3')

    notes_collection.insert_one({
        "user_id": str(user['_id']),
        "quote": quote,
        "book": book,
        "theme": theme
    })

    return jsonify({'Message': 'Data received and inserted into notes_collection'})
   

@app.route('/get_notes', methods=['GET'])
@jwt_required()
def get_notes():
    current_user = get_jwt_identity()
    email = current_user[0]
    user = users_collection.find_one({"email": email})
    user_id = str(user['_id'])

    filtered_notes = list(notes_collection.find({"user_id": user_id}, {"_id": 1, "quote": 1, "theme": 1, "book": 1}))

    # Convert the ObjectID to a string in the response
    for note in filtered_notes:
        note['_id'] = str(note['_id'])

    if not filtered_notes:
        return jsonify({"Message": "User not found"}), 404

    # Use dumps to serialize the list of dictionaries with ObjectID
    return dumps(filtered_notes), 200


@app.route('/delete_notes',methods=["POST","GET"])
@jwt_required()
def delete_notes():
    
    current_user = get_jwt_identity()
    email = current_user[0]
    user = users_collection.find_one({"email": email})
    user_id = str(user['_id'])

    data = request.get_json()
    note_id= data.get('note_id')
    note_id = ObjectId(note_id)

    result = notes_collection.delete_one({'_id': note_id})
   
    if result.deleted_count == 1:
        return jsonify({"message": "Note deleted successfully"}), 200
    else:
        return jsonify({"message": "Note not found or not deleted"}), 404



@app.route('/update_notes',methods=['POST','GET'])
@jwt_required()
def update_notes():

    current_user = get_jwt_identity()
    email = current_user[0]
    user = users_collection.find_one({"email": email})
    user_id = str(user['_id'])
      


    data = request.get_json()  # Get the JSON data from the request
    note_id = data.get('note_id')
    updated_data = data['updated_data']

    quote = updated_data['quote']
    book = updated_data['book']
    theme = updated_data['theme']

    note_id = ObjectId(note_id)

    # Update the note in the database
    notes_collection.update_one(
            {"_id": ObjectId(note_id)},
            {"$set": {"quote": quote, "book": book, "theme": theme}}
    )



    return jsonify({'Message': 'Data Updated'})

      



   
  


if __name__ == '__main__':
    app.run(debug=True)