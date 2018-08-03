from flask import Flask, redirect, url_for, request
import json
import uuid
import pymongo
import datetime
from flask_cors import CORS
from Crypto.Hash import SHA256
# from flask.ext.api import status
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
def login():
#    print dir(request)
    if request.method == 'POST':
        print "-------------- On Register --------------"
        print request.data
        d = json.loads(request.data)
        username = str(uuid.uuid4())[:8]
        cleanusername = checkusername(username)
        d['username'] = cleanusername
        # -------------- GENERATING HASH PASSWORD --------------
        userpass = str(uuid.uuid4())[:8]        
        hash = SHA256.new(userpass).hexdigest()
        # print "^^^^^^^^^^^^ hash ^^^^^^^^^^^^"
        # print userpass
        # print hash
        d['password'] = hash
        d['createdAt'] = datetime.datetime.now()
        # d['username'] = "aaa"
        # d['password'] = "aaa"
        # print "^^^^^^^^^^^^ with username and password ^^^^^^^^^^^^"
        print d
        con = conection_admin_db
        con.regform.insert_one(d)
        return "0"
    else:
        return "1"

@app.route('/preemailvalidation', methods=["POST"])
def prelogin():
#    print dir(request)   
    print "############# On Pre Email Validation #############"        
    print request.data
    d = request.data
    #print type(d)        
    f = collection.regform.find_one({'email': d})
    print f
    # print type(f)
    if f:
        content = {'please move along': 'nothing to see here'}
        # return content, status.HTTP_404_NOT_FOUND
        return "1"
    else:
        # return HTTP_202_ACCEPTED
        return "0"

if __name__ == '__main__':
   app.run(debug = True)
