# encoding=utf-8
import pymysql,time

times = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
pwd ="1121"

class user:
    conn = pymysql.connect(host="127.0.0.1", port=3306, user='root', password=pwd, db='school_news')
    def get_limit_20(self):
        cursor = self.conn.cursor()
        pass
    def auth_user(self,email,password):
        cursor  = self.conn.cursor()
        sql = "select a.id,a.name,a.email,a.password,a.authority,b.head from user a JOIN user_head b on a.id =b.user where email ='%s' and password='%s'"%(email,password)
        cursor.execute(sql)
        row = cursor.fetchone()
        # print(row)
        if not row ==None:
            self.status = True
            self.id =row[0]
            self.name = row[1]
            self.email = row[2]
            self.password = row[3]
            self.authority = row[4]
            self.head = row[5]
        else:
            self.status = False
        cursor.close()
    def head_check(self,id):
        cursor  = self.conn.cursor()
        sql = "select count(*) from user_head where user =%s"%id
        cursor.execute(sql)
        self.conn.commit()
        row = cursor.fetchone()
        cursor.close()
        if row ==0:
            return True
        else:
            return False
    def save_head(self,id,get_name):
        cursor = self.conn.cursor()
        if self.head_check(id):
            sql = "insert into user_head(id,user,head,created_at,updated_at) VALUES (NULL ,%d,'%s','%s','%s')"%(int(id),get_name,times,times)
            i = cursor.execute(sql)
            self.conn.commit()
            cursor.close()
            # conn.close()
            return i == 1 and True or False
        else:
            sql = "update user_head set head='%s' where user=%d"%(get_name,int(id))
            i = cursor.execute(sql)
            self.conn.commit()
            cursor.close()
            # conn.close()
            return i == 1 and True or False
class storage:
    host = '127.0.0.1'
    port = 3306
    user = 'root'
    db = 'storage'
    # table ='img'
    def __init__(self,table):
        self.table =table
    def where(self, col, e, col_name):
        sql = "select * from %s where %s %s %s" % (self.table, col, e, col_name)
        self.con().commit()
        conn = self.con().cursor()
        conn.execute(sql)
        data = conn.fetchall()
        conn.close()
        return data

    def insert(self,name,path,save_name,suffix,status=1):
        # print(name)
        # print(path)
        # print(save_name)
        # print(suffix)
        times = time.strftime("%Y-%m-%d %H:%M:%S",time.localtime())
        type =self.typee(suffix)
        sql = """insert into %s(id,name,path,save_name,suffix,status,type,created_at,updated_at) VALUES (NULL ,'%s','%s','%s','%s',%d,'%s','%s','%s')"""%(self.table,name,path,save_name,suffix,status,type,times,times)
        conn = self.con()
        cursor = conn.cursor()
        i = cursor.execute(sql)
        conn.commit()
        cursor.close()
        # conn.close()
        return i ==1 and True or False
    def find(self, name, status=1):
        sql = """select * from %s where name='%s' and status=%d""" % (self.table,name,status)
        self.con().commit()
        conn = self.con()
        cursor = conn.cursor()
        cursor.execute(sql)
        row = cursor.fetchone()
        cursor.close()
        if not row ==None:
            self.id = row[0]
            self.name = row[1]
            self.save_path = row[2]
            self.save_name = row[3]
            self.suffix = row[4]
            self.status = row[5]
            self.types = row[6]
            self.created_at = row[7]
            self.updated_at = row[8]
            return True
        else:
            return False

    def typee(self, ext):
        types = {
            'gif': 'image/gif',
            'jpeg': 'image/jpeg',
            'jpg': 'image/jpeg',
            'svg': 'image/svg+xml',
            'png': 'image/png',
            'docx': 'application/msword'
        }
        for i in types:
            if ext == i:
                return types[i]

    def con(self):
        c = pymysql.connect(host=self.host, port=self.port, user=self.user, password=pwd, db=self.db,charset='utf8')
        return c

class news:
    user_id =None
    img_name =None
    conn = pymysql.connect(host="127.0.0.1", port=3306, user='root', password=pwd, db='school_news',charset='utf8')
    def __init__(self,user_id,img_name):
        self.user_id = user_id
        self.img_name = img_name
    def insert(self,title,content):
        sql ="insert into news(id,title,content,user,img,created_at,updated_at) VALUES (NULL ,'%s','%s',%d,'%s','%s','%s')"%(
            title,
            content,
            self.user_id,
            self.img_name,
            times,
            times
        )
        cursor =self.conn.cursor()
        i = cursor.execute(sql)
        self.conn.commit()
        cursor.close()
        return i==1 and True or False
    def find(self,id):
        sql = "select a.id,a.title,a.content,b.name,c.head,a.img,CAST(a.created_at as CHAR ) from news a JOIN user b on a.user = b.id JOIN user_head c on b.id = c.user where a.id=%d"%int(id)
        self.conn.commit()
        cursor = self.conn.cursor()
        cursor.execute(sql)
        row = cursor.fetchone()
        # print(row)
        if not row ==None:
            return {
                "status": True,
                'id':row[0],
                'title':row[1],
                'content':row[2],
                'user':row[3],
                'head':row[4],
                'img':row[5],
                'time':row[6]
            }
        else:
            return {
                "status":False
            }
    def find_all(self,page=1):
        d = (page-1)*20
        sql = "select a.id,a.title,a.content,b.name,a.img,CAST(a.created_at as CHAR ) from news a JOIN user b on a.user =b.id ORDER BY id DESC limit 20 offset %d"%d
        self.conn.commit()
        cursor = self.conn.cursor()
        cursor.execute(sql)
        row = cursor.fetchall()
        data =[]

        # print(row)
        for i in range(len(row)):
            r = {}
            r['id'] = row[i][0]
            r['title'] = row[i][1]
            r['content'] = row[i][2]
            r['user'] = row[i][3]
            r['img'] = row[i][4]
            r['time'] = row[i][5]
            data.append(r)
        return data

    # 获取评论
    def find_commet(self,id,page):
        d = (page - 1) * 20
        sql = "select a.id,a.content,b.name,c.head,CAST(a.created_at as CHAR) from comment a JOIN user b on a.user_name = b.id JOIN user_head c on a.user_name=c.user where a.news_id = %d ORDER BY id DESC limit 10 offset %d"%(int(id),d)
        # print(sql)
        # print(sql)
        self.conn.commit()
        cursor = self.conn.cursor()
        cursor.execute(sql)
        row = cursor.fetchall()

        data = []
        # print(row)
        for i in range(len(row)):
            r = {}
            r['id'] = row[i][0]
            r['content'] = row[i][1]
            r['user'] = row[i][2]
            r['head'] = row[i][3]
            r['time'] = row[i][4]
            data.append(r)
        # print(data)
        return data

class comment:
    conn = pymysql.connect(host="127.0.0.1", port=3306, user='root', password=pwd, db='school_news',charset='utf8')
    def save(self,id,user,content):
        sql = "insert into comment(id,news_id,content,user_name,created_at,updated_at) VALUES(NULL,%d,'%s',%d,'%s','%s')"%(id,content,user,times,times)
        # print(sql)
        # self.conn.set_charset('utf8')
        self.conn.commit()
        cursor = self.conn.cursor()
        i = cursor.execute(sql)
        self.conn.commit()
        cursor.close()
        return i == 1 and True or False

if __name__ =="__main__":
    # a = user()
    # a.auth_user('1922527051@qq.com','112233')
    a = news(None,None)
    a.find_commet(2,1)