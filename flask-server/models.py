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


class Article(Base):
  __tablename__ = 'article'
  id = Column(Integer, primary_key=True)
  regDate = Column(DateTime, default=datetime.datetime.utcnow)
  title = Column(String(100))
  body = Column(String(1000))
  hitCount = Column(Integer)
  
  def __init__(self, regDate, title, body, hitCount):
    self.regDate = regDate
    self.title = title
    self.body = body
    self.hitCount = hitCount
    
    def __repr__(self):
      return "<Article('%d', '%s', '%s', '%s', '%s', '%d'>" %(self.id, str(self.regDate), str(self.updateDate), self.title, self.body, self.hitCount)