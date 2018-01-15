import os,sys

from core.db import storage
from core.db import news
def get(filename,s='news'):
    db = storage(s)
    if db.find(filename):
        file_get =os.path.join(sys.path[0]+"\core\%s"%db.save_path,db.save_name)
        # print(file_get)
        f = open(file_get, 'rb')
        cnt = f.read()
        f.close()
        return [cnt,db.types]
    else:
        return ['None','text/html']
def get_news_p(id): #获取单独一个
    n = news(None,None)
    d = n.find(id)
    # print(d)
    return d

def get_news_all(page): #获取30个

    n = news(None,None)
    d = n.find_all(page)
    # print(d)
    return d
def get_news_comment(id,page):
    n = news(None,None)
    d = n.find_commet(id,page)
    # print(d)
    return d

if __name__=="__main__":
    print(sys.path)