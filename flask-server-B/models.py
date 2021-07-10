import datetime
from sqlalchemy import Column, Integer, String, DateTime
from database import Base




class Open_Graph(Base):
  __tablename__ = 'open_graph'
  id = Column(Integer, primary_key=True)
  ogTitle = Column(String(100))
  ogUrl = Column(String(100))
  ogImage = Column(String(100))
  ogDescription = Column(String(100))
  
  def __init__(self, ogTitle, ogUrl, ogImage, ogDescription):
    self.ogTitle = ogTitle
    self.ogUrl = ogUrl
    self.ogImage = ogImage
    self.ogDescription = ogDescription
    
    def __repr__(self):
      return "<Open_Graph('%d', '%s', '%s', '%s', '%s'>" %(self.id, self.ogTitle, self.ogUrl, self.ogImage, self.ogDescription)