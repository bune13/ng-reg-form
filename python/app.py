from flask import Flask, redirect, url_for, request
import json
import pymongo
from flask_cors import CORS
# def mongo_connection():
con = pymongo.MongoClient()
collection = con.test
	# return collection
app = Flask(__name__)
CORS(app)
#@app.route('/success/<name>')
#def success(name):
#   return 'welcome %s' % name

@app.route('/success')
def success():
   return 'Welcome'



@app.route("/reg", methods=["GET", "POST"])
def reg():
	if request.method == 'POST':
         print request.data
#@app.route('/login',methods = ['POST', 'GET'])
@app.route('/register', methods=["GET", "POST"])
def login():
#    print dir(request)
    if request.method == 'POST':
        print "############# On Register #############"
        print request.data
        d = json.loads(request.data)
        #print type(d)        
        collection.regform.insert_one(d)
        return "0"
    else:
        return "1"

@app.route('/preemailvalidation', methods=["GET", "POST"])
def prelogin():
#    print dir(request)
    if request.method == 'POST':
        print "############# On Pre Email Validation #############"        
        print request.data
        # d = json.loads(request.data)
        #print type(d)        
        #collection.regform.insert_one(d)
        return "0"
    else:
        return "1"

if __name__ == '__main__':
   app.run(debug = True)
