from flask import Flask, redirect, url_for, request, render_template,session
import pymysql as pb
from flask import json
from flask import jsonify
from csv import writer
from datetime import date
db = pb.connect(host = "localhost",user = "root",password  = "root",database = "expensetracker")
cursor=db.cursor();
app = Flask(__name__)
import uuid
#db = pb.connect("localhost","root","admin","usersData")
#cursor=db.cursor();


@app.route('/')
def index():
    return render_template('index.html')
	
@app.route('/login',methods=['Get','Post'])
def login():
    if request.method == 'POST':
        login  = request.form['login']
        pass1  = request.form['password']
	## validate login
	## if succesful go to /home and save session
	## else try again
@app.route('/home')
def home():
    return render_template('home.html') 

@app.route('/addExpense')
def addExpense():
# get today's date [income/expense,amount,category,note,type,date,time)
# add to DB  
    return render_template('addExpense.html') 
	
@app.route('/addToDB',methods = ['Get','Post'])
def addToDB():
    if request.method == 'POST':
        id = uuid.uuid1()
        typeOfTransaction  = str(request.form['TypeOfTransaction'])
        wayOfTransaction  = str(request.form['WayOfTransaction'])
        category  = str(request.form['Category'])
        amount  = float(request.form['amount'])
        note  = str(request.form['note'])
        todays_date = date.today()
        row = [id,'Jon',typeOfTransaction,wayOfTransaction,category,amount,note,int(todays_date.day),int(todays_date.month),int(todays_date.year)]
        query = "insert into expense values('%s','%s','%s','%s','%s',%f,'%s',%d,%d,%d)"%tuple(row)
        print(query)
        cursor.execute(query)
        db.commit()
        print("done")
    return render_template('addExpense.html') 
@app.route('/getdailydata',methods=['GET', 'POST'])
def getDailyData():
	if request.method == 'GET':
		dataDict = {}
		today = date.today()
		query = "select * from expense where user = '{}' and day = {} and month = {} and year = {}".format('Jon',int(today.day),int(today.month),int(today.year))
		cursor.execute(query)
		row_headers=[x[0] for x in cursor.description]
		data=cursor.fetchall();
		for item in data:
			dataDict[item[0]]={}
			for i in range(1,len(item)):
				dataDict[item[0]][row_headers[i]]=item[i]
		json_object = json.loads(json.dumps(dataDict))
		print(type(json_object) )
		return jsonify(json_object),200
#get daily data from db
@app.route('/daily')
def loadDailyPage():
    return render_template('today.html')

@app.route('/monthc')
def loadCurrMonthPage():
    return render_template('monthc.html')
@app.route('/monthl')
def loadLastMonthPage():
    return render_template('monthl.html')
@app.route('/month3')
def load3MonthPage():
    return render_template('month3.html')
@app.route('/month6')
def load6MonthPage():
    return render_template('month6.html')
#get latest 12 months data from db
@app.route('/getmonthlydata',methods=['GET', 'POST'])
def getMonthlyData():
    if request.method == 'GET':
        dataDict = {}
        today = date.today()
        query = "select * from expense where user = '{}' and year ={}".format('Jon',int(today.year))
        cursor.execute(query)
        row_headers=[x[0] for x in cursor.description]
        data=cursor.fetchall();
        for item in data:
            dataDict[item[0]]={}
            for i in range(1,len(item)):
                dataDict[item[0]][row_headers[i]]=item[i]
        json_object = json.loads(json.dumps(dataDict))

        return jsonify(json_object),200

@app.route('/yearly')
def getYearlyData():
    return render_template('year.html')
	
@app.route('/temp')
def loadData():
    return render_template('year.html')
#get latest 12 years data from db

if __name__ == '__main__':
    app.run(debug=True)