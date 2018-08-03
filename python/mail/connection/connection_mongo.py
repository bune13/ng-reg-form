import pymongo

def conection_admin_db():

    con = pymongo.MongoClient()
    collection = con.test
    return collection

def conection_user_db(db):

    con = pymongo.MongoClient()
    collection = con.db
    return collection