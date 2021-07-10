from flask import (Flask, render_template, request, jsonify)
from flask_cors import CORS
import sqlalchemy
from sqlalchemy import sql

from database import init_db
from database import db_session
from models import TbTest, Post
import sqlalchemy as db
import re
from webpreview import OpenGraph
import requests




app = Flask("__main__")
CORS(app)

@app.route("/")
def my_index():
    #main()
    return render_template("index.html", flask_token="Hello world")

#게시글 리스트 가져오기
@app.route("/getPosts", methods=['POST'])
def getPosts():
    queries = db_session.query(Post).order_by(Post.id.desc()).all()
    entries = [dict(id=q.id, regDate=q.regDate,  title=q.title, body=q.body, hitCount=q.hitCount) for q in queries]
    
    #반환된 데이터 html태그 제거 작업
    """
    react의 quill에디터를 사용해 저장된 string data에 html태그가 들어가있어
    제거해주는 정규식을 사용했습니다.
    """
    for i in range(len(entries)):
        pattern = '<[^>]*>'
        string = entries[i]['body']
        entries[i]['body'] = re.sub(pattern=pattern, repl='', string=string)

    db_session.close()
    return jsonify(entries)
    
#게시글 아이템 가져오기
@app.route("/getPost", methods=['POST'])
def getPost():
    postId = request.form['postId']
    needToIncreaseHit = request.form['needToIncreaseHit']
    
    #postId로 해당 id와 일치하는 게시물을 가져옴
    getPost_filter_sql = sql.text('id='+postId)
    queries = db_session.query(Post).filter(getPost_filter_sql).all()
    entries = [dict(id=q.id, regDate=q.regDate,  title=q.title, body=q.body, hitCount=q.hitCount, metaData=q.metaData) for q in queries]
    db_session.commit()
    if needToIncreaseHit == 'true':
        post = db_session.query(Post).filter(Post.id==postId).update({'hitCount':int(entries[0]['hitCount']) + 1})
        db_session.commit()
    #print(entries[0]['hitCount'])
    #print(entries)
    db_session.close()
    return jsonify(entries)



#게시글 추가
@app.route("/addPost", methods=['POST'])
def addPost():
    title = request.form['title']
    
    print(title)
    body = request.form['body']
    #ip = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
    #print(ip)
    

    """
    아래의 작업에서는 프로세스가 조금 복잡합니다.
    우선 해당 프로세스는 게시물 저장 -> body에 link가 있다면 해당 포스트의 id로 게시물 불러옴
    -> 해당 링크의 open_graph데이터를 서버 B에 전송 -> 해당 postId의 게시물 데이터의 metaData칼럼에 서버B에 저장한 open_graph데이터 저장
    -> 게시물 반환의 순서입니다.
    그렇게 한 이유는 우선 open_graph데이터를 추출해서 metaData에 넣고 돌아오는 반환값을 넣을 postId를 찾을 수 없는 문제가 있었습니다.
    그래서 게시물을 만든 직후 가장 최근의 게시물의 id값을 가져와 해당 게시물의 metaData칼럼에 추가해주는 방식으로 문제를 해결하였습니다.
    """
    q = Post(None, title=title,body=body,hitCount=0, metaData="")
    db_session.add(q)
    db_session.commit()
    
    db_session.close()
    postId = db_session.query(Post).order_by(Post.id.desc()).first().id
    
    db_session.commit()
    db_session.close()
    opengraph_url = re.findall('http[s]?://(?:[a-zA-Z]|[0-9]|[$\-@\.&+:/?=]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', body)
    print(opengraph_url)
    og_data = {}
    og_data['hasData'] = False
    if(opengraph_url != []):
        for i in range(len(opengraph_url)):
            og = OpenGraph(opengraph_url[i], ["og:title", "og:image", "og:description", "og:url"])
            
            
            if(og.title != None):
                og_data={
                'og.title':og.title,
                'og.url': og.url,
                'og.image':og.image,
                'og.description':og.description
                }
                
                
                #print(og.title)
                #print(og.url)
                #print(og.image)
                #print(og.description)
                og_data['hasData'] = True
        
        print(og_data)
        res = requests.post('http://127.0.0.1:8000',data = og_data)
        print(res.text)
        post = db_session.query(Post).filter(Post.id==postId).update({'metaData':res.text})
        db_session.commit()

        #print(queries)
        print(postId)
        #넣어주기
        
    return "add_S"

app.run(debug=True)