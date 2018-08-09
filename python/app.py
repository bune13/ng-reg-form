from flask import Flask, redirect, url_for, request
import json
import uuid
import pymongo
import datetime
from flask_mail import Mail, Message
from flask_cors import CORS
from flask import Response
#from Crypto.Hash import SHA256
# from flask.ext.api import status
# from flask_restful import Resource, Api
# from flask_restful  import Api
from flask_jwt_extended import (JWTManager, create_access_token,
                                create_refresh_token, jwt_required,
                                jwt_refresh_token_required, get_jwt_identity,
                                get_raw_jwt)
from connection.connection_mongo import conection_admin_db,conection_user_db
con = pymongo.MongoClient()
collection = con.test
app = Flask(__name__)
CORS(app)

# -------------- MAIL CONFIGURATION --------------
app.config['MAIL_SERVER'] = 'smtp.mail.yahoo.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'test.dash@yahoo.com'
app.config['MAIL_PASSWORD'] = 'exponentia'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app)

# -------------- JWT Secret Key --------------
app.config['JWT_SECRET_KEY'] = 'a37e1644f392640ce05cc29fc1c0859ddd56badba6a68d84fa809e14f518b26af13'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(minutes=60)
app.config['JWT_HEADER_NAME'] = 'Meow'
jwt = JWTManager(app)
print jwt


# -------------- TO CHECK IF USERID EXISTS --------------
def checkusername(value):
    d = str(uuid.uuid4())[:8]
    if (collection.regform.find_one({'username': value})):
        checkusername(d)
    else:
        print d
        return d

# -------------- FOR REGISTRATION SIGNUP --------------
print "**************** On Pre Email Validation ****************"
@app.route('/register', methods=["GET", "POST"])
def register():
#    print dir(request)
    if request.method == 'POST':
        print "-------------- On Register --------------"
        print request.data
        d = json.loads(request.data)
        username = str(uuid.uuid4())[:8]
        cleanusername = checkusername(username)
        d['username'] = cleanusername
        d['password'] = "123"
        d['role'] = 'admin'
        d['db_name'] = d['business_name'].replace(' ','')

        # -------------- GENERATING RANDOM PASSWORD --------------
        userpass = str(uuid.uuid4())[:8]
        d['createdAt'] = datetime.datetime.now()
        con = conection_admin_db()
        con.regform.insert_one(d)
        msg = Message('Welcome', sender = 'test.dash@yahoo.com', recipients = [d['email']])
        print d
        msg.body = "Hello "+str(d['first_name'])+" "+str(d['last_name'])+" Your Id "+str(d['username'])+" and Password"+str(d['password'])
        print msg,type(msg.body)
        mail.send(msg)
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'}
    else:
        return json.dumps({'success':False}), 404, {'ContentType':'application/json'}

# -------------- VALIDATED EMAIL ASYNC --------------
@app.route('/emailvalidation', methods=["POST"])
def prelogin():
#    print dir(request)   
    print "############# On Pre Email Validation #############"        
    print request.data
    d = request.data
    #print type(d)
    con = conection_admin_db()        
    f = con.regform.find_one({'email': d})
    print f
    # print type(f)
    if f:
        return "1"
    else:
        return "0"

# -------------- FOR LOGIN PAGE --------------
@app.route('/login', methods=["POST"])
def onlogin():
#    print dir(request)   
    print "############# On User Login #############"        
    print request.data
    d = json.loads(request.data)
    print d["password"]
    print d["username"]
    psw = d["password"]
    uname = d["username"]

    access_token = create_access_token(d['username'])
    refresh_token = create_refresh_token(d['username'])

    con = conection_admin_db()
    c =con.regform.find_one({'username':uname,'password':psw})
    print c
    if c:
        return json.dumps({'Found':True, 'access_token': access_token,'refresh_token': refresh_token}), 200, {'ContentType':'application/json'}
    else:
        return json.dumps({'Found':False}), 404, {'ContentType':'application/json'}


# -------------- FOR Forget Password --------------
@app.route('/forgetpassword', methods=["POST"])
def onforgetPassword():
#    print dir(request)   
    print "############# On Forget Password #############"
    print request.data
    d = json.loads(request.data)
    print d["email"]
    email = d["email"]
    con = conection_admin_db()
    c =con.regform.find_one({'email':email})
    if c:
        msg = Message('Your New Password', sender = 'test.dash@yahoo.com', recipients = [d['email']])
        print d
        msg.body = "Hello,"
        msg.html = "<br>Your new password is ..... generate new password"
        print msg,type(msg)
        mail.send(msg)
        return json.dumps({'Found':True}), 200, {'ContentType':'application/json'}
    else:
        return json.dumps({'Found':False}), 404, {'ContentType':'application/json'}

@app.route('/checkprotected', methods=['GET'])
@jwt_required
def protected():
    ret = {
        'current_identity': get_jwt_identity(),  # test
    }
    return json.dumps(ret), 200




if __name__ == '__main__':
   app.run(debug = True)