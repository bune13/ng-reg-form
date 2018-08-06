from flask import Flask, redirect, url_for, request
import json
import uuid
import pymongo
import datetime
from flask_cors import CORS
from flask import Response
#from Crypto.Hash import SHA256
# from flask.ext.api import status
from flask_restful import Resource, Api
from flask_restful  import Api
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
        print "PASSWORD--------------------------"
        print d
        return d

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

        # -------------- GENERATING HASH PASSWORD --------------
        userpass = str(uuid.uuid4())[:8]        
        d['createdAt'] = datetime.datetime.now()
        con = conection_admin_db()
        con.regform.insert_one(d)
        return Response ({"register":'True'},status=200,mimetype='application/json')
    else:
        return Response ({"register":'False'},status=404,mimetype='application/json')

@app.route('/preemailvalidation', methods=["POST"])
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
        content = {'please move along': 'nothing to see here'}
        # return content, status.HTTP_404_NOT_FOUND
        return "1"
    else:
        # return HTTP_202_ACCEPTED
        return "0"

@app.route('/login', methods=["POST"])
def onlogin():
#    print dir(request)   
    print "############# On User Login #############"        
    print request.data
    d = json.loads(request.data)
    print d["password"]
    con = conection_admin_db()
    c =con.find_one(d)
    print c
    
    return "0"


if __name__ == '__main__':
   app.run(debug = True)
