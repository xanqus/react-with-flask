from flask import (Flask, render_template, request, jsonify)
from flask_cors import CORS
import sqlalchemy
from sqlalchemy import sql

from database import init_db
from database import db_session
from models import TbTest, Article
import sqlalchemy as db
import re

app = Flask("__main__")
CORS(app)

@app.route("/")
def my_index():
    #main()
    return render_template("index.html", flask_token="Hello world")

#게시글 리스트 가져오기
@app.route("/getArticles", methods=['POST'])
def getArticles():
    queries = db_session.query(Article).order_by(Article.id.desc())
    entries = [dict(id=q.id, regDate=q.regDate,  title=q.title, body=q.body, hitCount=q.hitCount) for q in queries]
    
    #반환된 데이터 html태그 제거 작업
    for i in range(len(entries)):
        pattern = '<[^>]*>'
        string = entries[i]['body']
        entries[i]['body'] = re.sub(pattern=pattern, repl='', string=string)

    db_session.close()
    return jsonify(entries)
    
#게시글 아이템 가져오기
@app.route("/getArticle", methods=['POST'])
def getArticle():
    postId = request.form['postId']
    getArticle_filter_sql = sql.text('id='+postId)
    queries = db_session.query(Article).filter(getArticle_filter_sql)
    entries = [dict(id=q.id, regDate=q.regDate,  title=q.title, body=q.body, hitCount=q.hitCount) for q in queries]
    db_session.close()
    return jsonify(entries)

#게시글 추가
@app.route("/addArticle", methods=['POST'])
def addArticle():
    title = request.form['title']
    print(title)
    body = request.form['body']
    db_session.add(Article(None, title=title,body=body,hitCount=0))
    db_session.commit()
    db_session.close()
    return 'insertTest'

app.run(debug=True)