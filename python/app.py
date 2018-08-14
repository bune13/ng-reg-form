from flask import Flask, redirect, url_for, request, jsonify, make_response
import json
import uuid
import pymongo
import datetime
from flask_mail import Mail, Message
from flask_cors import CORS
from flask import Response
from flask import render_template,send_file
# from Crypto.Hash import SHA256
# from flask.ext.api import status
# from flask_restful import Resource, Api
# from flask_restful  import Api
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from flask_jwt_extended import (JWTManager, create_access_token,
                                create_refresh_token, jwt_required,
                                jwt_refresh_token_required, get_jwt_identity,
                                get_raw_jwt)
from connection.connection_mongo import conection_admin_db,conection_user_db,conection_agent_db
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
# app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(minutes=60)
# app.config['JWT_HEADER_NAME'] = 'Meow'
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
        
        print '*********'
        print username
        print '*********'
        cleanusername = checkusername(username)
        d['username'] = cleanusername
        d['password'] = "123"
        d['role'] = 'admin'
        d['db_name'] = d['business_name'].replace(' ','')

        # -------------- GENERATING RANDOM PASSWORD --------------
        userpass = str(uuid.uuid4())[:8]
        # -------------- ^^^^^^ NOT SAVING PASSWORD --------------
        UUID_STRIN = uuid.uuid4()
        d['UUID'] = UUID_STRIN
        d['createdAt'] = datetime.datetime.now()
        con = conection_admin_db()
        con.regform.insert_one(d)
        msg = Message('Welcome', sender = 'test.dash@yahoo.com', recipients = [d['email']])
        print d
        
        # confirm_url = "http://localhost:4200/"+UUID_STRIN
        # msg.html=render_template('confirm.html', confirm_url=confirm_url)
        # #msg.body = html
        # print msg,type(msg.body)
        mail.send(msg)

        return jsonify({'success':True}), 200
    else:
        return jsonify({'success':False}), 404

# -------------- VALIDATED EMAIL ASYNC --------------

# @app.route('/', methods=["POST"])
# def confirm(UUID_string):
    
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

    access_token = create_access_token(identity=d['username'])
    refresh_token = create_refresh_token(identity=d['username'])

    con = conection_admin_db()
    c =con.regform.find_one({'username':uname,'password':psw})
    print c
    if c:
        return jsonify({'Found':True, 'access_token': access_token,'refresh_token': refresh_token}), 200
    else:
        return jsonify({'Found':False}), 404

# -------------- AUTH ADMIN --------------
@app.route('/checkprotected', methods=['POST'])
@jwt_required
def protected():
    print "########### CHECK PROTECTED "
    print get_jwt_identity()
    ret = {
        'current_identity': get_jwt_identity(),  # test
    }
    return jsonify(ret), 200 


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
        return jsonify({'Found':True}), 200
    else:
        return jsonify({'Found':False}), 404


@app.route('/download_template', methods=["GET"])
def download_template():
    return send_file('D://UDEMY//New folder//angular//ng-reg-form//python//assest//Insurance.csv',
                     mimetype='text/csv',
                     attachment_filename='template.csv',
                     as_attachment=True)


@app.route('/upload', methods=["POST"])
@jwt_required
def upload():
    print "####################"
    # data = json.dumps(request.data)
    print request.data
    # print request.data[0]
    # print request.file
    # print request.template
    tokenUserName = get_jwt_identity()
    if tokenUserName:
        con = conection_admin_db()
        c = con.regform.find_one({'username':tokenUserName})
        admin_db_name =  c['db_name']
        print admin_db_name


        # data = json.loads(request.data)
        print "~~~~~~~~~~~~~~~~"
        f = request.files['template']

        # f = request.files['data_file']

        #store the file contents as a string
        fstring = f.read()
        import csv
        print fstring
        #create list of dictionaries keyed by header row
        csv_dicts = [{k: v for k, v in row.items()} for row in csv.DictReader(fstring.splitlines(), skipinitialspace=True)]
        d =conection_user_db(admin_db_name)
        d.local.insert_many(csv_dicts)
        # p protected()
        print csv_dicts
        print "hello"
        return jsonify({'Found':True}), 200
    else:
        return jsonify({'Found':False}), 401

#------------check agents are present in agent_db
@app.route('/checkAgentsPresent', methods=["POST"])
@jwt_required
def checkAgentsPresent():
    tokenUserName = get_jwt_identity()
    if tokenUserName:
        con = conection_agent_db()
        c = con.regform.find_one({})
        print "#__________CHEKC AGENTs"
        if(c == None):
            return jsonify({'Found':"None"}), 401
        else:
            return jsonify({'Found':True}), 200
    else:
        return jsonify({'Found':False}), 401


if __name__ == '__main__':
   app.run(debug = True,host='0.0.0.0')