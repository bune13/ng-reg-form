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
        print "HI"        
        print request.data
        d = json.loads(request.data)
        #print type(d)
        
        collection.regform.insert_one(d)
		# collection.chathistory.insert_one({'username':request.form['Name'],'email':request.form['Email'],'phone':request.form['Phone'],'message':request.form['send_username']})
        #return render_template("messagesend.html")
        return "0"
    else:
        return "1"

if __name__ == '__main__':
   app.run(debug = True)
