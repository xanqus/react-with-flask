from flask import (Flask, request, jsonify)
import sqlalchemy
from sqlalchemy import sql

from database import init_db
from database import db_session
from models import Open_Graph
import sqlalchemy as db
app = Flask(__name__)
 
@app.route("/", methods=['POST'])
def index():
    #서버 A의 글에 link데이터가 있는지 판별
    hasData = request.form['hasData']
    
    print(hasData)
    if (hasData == 'True'):
        #link데이터가 있을 시 link데이터의 오픈그래프 데이터를 받아옴
        og_title = request.form['og.title']
        og_url = request.form['og.url']
        og_image = request.form['og.image']
        og_description = request.form['og.description']
        
        #open_graph테이블에 데이터 저장
        db_session.add(Open_Graph(ogTitle=og_title, ogUrl=og_url,ogImage=og_image,ogDescription=og_description))
        db_session.commit()
        db_session.close()

        #서버A로 반환
        returnData = [dict(ogTitle=og_title,ogUrl=og_url,ogImage=og_image,ogDescription=og_description)]
        #print("returnData")
        #print(returnData)
    return jsonify(returnData)

app.run(debug=True, port=8000)