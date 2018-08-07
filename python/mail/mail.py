from flask import Flask, redirect, url_for, request
import json
import uuid
import pymongo
import datetime
from flask_cors import CORS
from flask_mail import Mail, Message
from flask import Response
#from Crypto.Hash import SHA256
# from flask.ext.api import status
# from flask_restful import Resource, Api
# from flask_restful  import Api
#from connection.connection_mongo import conection_admin_db,conection_user_db
# con = pymongo.MongoClient()
# collection = con.test
app = Flask(__name__)
mail = Mail(app)
CORS(app)

app.config['MAIL_SERVER'] = 'smtp.mail.yahoo.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'test.dash@yahoo.com'
app.config['MAIL_PASSWORD'] = 'exponentia'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app)

@app.route("/")
def index():
   msg = Message('Hello', sender = 'test.dash@yahoo.com', recipients = ['pvivek1818@gmail.com'])
   msg.body = "Hello Flask message sent from Flask-Mail"
   mail.send(msg)
   return "Sent"


if __name__ == '__main__':
   app.run(debug = True)