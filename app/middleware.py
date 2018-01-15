from functools import wraps
from flask import session,Response,redirect,request
from core.csrf import jiemi
from core.tool import format_json
import json
def pipe_ip(f):
    @wraps(f)
    def inner(*args,**kwargs):
        # if check.check_allow_ip(request.remote_addr):
        #     print(request.remote_addr," 允许访问")
            return f(*args, **kwargs)
        # else:
        #     return Response(status=500)
    return inner
def get_user_session(f):
    @wraps(f)
    def bababa(*args, **kwargs):
        if session.get('user') == None:
            session['user'] = {
                'check': False
            }
            return f(*args, **kwargs)
        else:
            return f(*args, **kwargs)
    return bababa
def logined(f):
    @wraps(f)
    def banabana(*args,**kwargs):
        if session.get('user')['check'] == False or session.get('user')==None:
            return Response(json.dumps({'status':"failed",'msg':'you are not logined'}))
        return f(*args,**kwargs)
    return banabana
def csrf(f):
    @wraps(f)
    def banabana(*args,**kwargs):
        i =request.headers
        csrfs = i['CSRF-TOKEN']
        if jiemi(csrfs,session):
            return f(*args, **kwargs)
        else:
            return Response(json.dumps({'status':'failed','msg':'csrf_token is false'}))
    return banabana
