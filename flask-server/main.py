from flask import (Flask, render_template, request, jsonify)
from flask_cors import CORS
import datetime, json
import time
from sqlalchemy.ext.declarative import DeclarativeMeta
from sqlalchemy import func

from database import init_db
from database import db_session
from models import TbTest
import sqlalchemy as db

def json_default(value):
    if isinstance(value, datetime.date):
        return value.strftime('%Y-%m-%d')
    raise TypeError('not JSON serializable')

data = {'date': datetime.date.today()}
json_data = json.dumps(data, default=json_default)

class AlchemyEncoder(json.JSONEncoder):

    def default(self, obj):
        if isinstance(obj.__class__, DeclarativeMeta):
            # an SQLAlchemy class
            fields = {}
            for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
                data = obj.__getattribute__(field)
                try:
                    json.dumps(data) # this will fail on non-encodable values, like other classes
                    fields[field] = data
                except TypeError:
                    fields[field] = None
            # a json-encodable dict
            return fields

        return json.JSONEncoder.default(self, obj)




#data select
def show_tables():
    queries = db_session.query(TbTest)
    entries = [dict(id=q.id, datetime=q.datetime, string=q.string) for q in queries]
    print( entries )
    return entries
    

#def add_entry(datetime, string):
    #t = TbTest(datetime, string)
    #db_session.add(t)
    #db_session.commit()

#def delete_entry(datetime, string):
    #db_session.query(TbTest).filter(TbTest.datetime==datetime, TbTest.string==string).delete()
    #db_session.commit()
    
#def main():
    
    #add_entry("2015-02-06 09:00:05", "test1")
    #delete_entry("2015-02-06 09:00:05","test1")
    #db_session.close()
    

app = Flask("__main__")
CORS(app)

engine = db.create_engine('mysql://testuser:1234@localhost/alchemy_test?charset=utf8', convert_unicode=False)
connection = engine.connect()
metadata = db.MetaData()
table = db.Table('TbTable', metadata, autoload=True, autoload_with=engine)

#시간 데이터 json변환 테스트
#now = time.localtime()
#now_converted = "%04d/%02d/%02d %02d:%02d:%02d" % (now.tm_year, now.tm_mon, now.tm_mday, now.tm_hour, now.tm_min, now.tm_sec)
#date_converted = datetime(now_converted)
#now_json_converted = date_converted.strftime('%Y-%m-%d %H:%M:%S')
#cr_date = '2013-10-31 18:23:29.000227'
print('2013-10-31 18:23:29.000227')
cr_date = datetime.datetime.now()
print(datetime.datetime.now())
#cr_date = datetime.datetime.strptime(cr_date, '%Y-%m-%d %H:%M:%S.%f')
cr_date = cr_date.strftime("%Y-%m-%d %H:%M:%S")
print(cr_date)





@app.route("/")
def my_index():
    #main()
    return render_template("index.html", flask_token="Hello   world")


@app.route("/showTable")
def showTable():
    show_tables()
    return jsonify(show_tables())

@app.route("/getData")
def connect_db():
    query = db.select([table])
    result_proxy = connection.execute(query)
    result_set = result_proxy.fetchall()
    print(result_set)
    return str(result_set[:10])

@app.route("/insertData")
def insertData():
    time="2015-02-06 09:00:05"
    values = "datetime=\"2015-02-06 09:00:05\", string=\"test1\""
    #data insert
    query = db.insert(table).values(datetime=cr_date, string="test1") # 이때 values는 table의 column의 순서와 갯수가 일치해야 함
    #print(now_json_converted)
    print(query)
    result_proxy = connection.execute(query)
    result_proxy.close()
    return "test"

@app.route("/new_select_test")
def newSelectTest():
    db_session.query(TbTest).all()
    db_session.query(TbTest.id, TbTest.datetime, TbTest.string).all() # SELECT id, name, age FROM model
    db_session.query(TbTest).first() 
    db_session.query(func.count(TbTest.id))
    print(db_session.query(TbTest.string.label('ddd')).all())
    return "test"

@app.route("/test")
def test_db():
    #foo = show_tables()
    
    print(now_converted)
    bar = "test"
    return bar
    
    

@app.route('/post', methods=['POST'])
def post():
    value = request.form['test']
    return value

app.run(debug=True)