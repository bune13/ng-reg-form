from flask import Flask, redirect, url_for, request
import json
import uuid
import pymongo
import datetime
from flask_cors import CORS
con = pymongo.MongoClient()
collection = con.test
app = Flask(__name__)
CORS(app)

print "**************** On Pre Email Validation ****************"
print str(uuid.uuid4())[:8]

@app.route('/register', methods=["GET", "POST"])
def login():
#    print dir(request)
    if request.method == 'POST':
        print "############# On Register #############"
        print request.data
        d = json.loads(request.data)
        d['username'] = str(uuid.uuid4())[:8]
        d['password'] = str(uuid.uuid4())[:8]
        d['createdAt'] = datetime.datetime.now()
        # d['username'] = "aaa"
        # d['password'] = "aaa"
        print "^^^^^^^^^^^^ with username and password ^^^^^^^^^^^^"
        print d
        
        collection.regform.insert_one(d)
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
        return "1"
    else:
        return "0"

if __name__ == '__main__':
   app.run(debug = True)
