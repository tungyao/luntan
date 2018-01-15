from core.db import user
db = user()
def login_auth(email,password,session):
    db.auth_user(email,password)
    if db.status ==True:
        session['user'] = {
            'check':True,
            'id':db.id,
            'name':db.name,
            'email':db.email,
            'password':db.password,
            'authority':db.authority,
            'head':db.head
        }
        return {'status': 'success'}
    else:
        session['user'] = {
            'check':False
        }
        return {'status':'failed'}

if __name__ =="__main__":
    print(login_auth('1922527051@qq.com','112233'))
    print(g.guser)