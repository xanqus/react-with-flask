import datetime
from sqlalchemy import Column, Integer, String, DateTime
from database import Base

class TbTest(Base):
  __tablename__ = 'tbTable'
  id = Column(Integer, primary_key=True)
  datetime = Column(DateTime)
  string = Column(String(250))
  
  def __init__(self, datetime, string):
    self.datetime = datetime
    self.string = string
    
    def __repr__(self):
      return "<TbTest('%d', '%s', '%s'>" %(self.id, str(self.datetime), self.string)

# 게시물 모델
class Post(Base):
  __tablename__ = 'post'
  id = Column(Integer, primary_key=True)
  regDate = Column(DateTime, default=datetime.datetime.utcnow)
  title = Column(String(100))
  body = Column(String(1000))
  hitCount = Column(Integer)
  metaData = Column(String(1000))
  
  def __init__(self, regDate, title, body, hitCount, metaData):
    self.regDate = regDate
    self.title = title
    self.body = body
    self.hitCount = hitCount
    self.metaData = metaData
    
    def __repr__(self):
      return "<Post('%d', '%s', '%s', '%s', '%s', '%d', '%s'>" %(self.id, str(self.regDate), str(self.updateDate), self.title, self.body, self.hitCount, self.metadata)