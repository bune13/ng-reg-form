from flask import Flask, redirect, url_for, request
import json
import uuid
import pymongo
import datetime
from flask_cors import CORS
from flask import Response,send_file,make_response  
#from Crypto.Hash import SHA256
# from flask.ext.api import status
# from flask_restful import Resource, Api
# from flask_restful  import Api
from connection.connection_mongo import conection_admin_db,conection_user_db
con = pymongo.MongoClient()
collection = con.test
app = Flask(__name__)
CORS(app)

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

# -------------- FOR LOGIN PAGE ----851bb8----------
@app.route('/login', methods=["POST"])
def onlogin():
#    print dir(request)   
    print "############# On User Login #############"        
    print request.data
    d = json.loads(request.data)
    print d["password"]
    con = conection_admin_db()
    c =con.regform.find_one({})
    print c
    
    return "0"

@app.route('/download_template', methods=["GET"])
def download_template():
    return send_file('E://dev//Genric bot//ng-reg-form//python//assest//Insurance.csv',
                     mimetype='text/csv',
                     attachment_filename='template.csv',
                     as_attachment=True)

@app.route('/upload', methods=["GET"])
def upload():
    pass
if __name__ == '__main__':
   app.run(debug = True,host='0.0.0.0')