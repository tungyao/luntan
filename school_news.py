#coding=utf-8
from flask import Flask, render_template, request, session,redirect,Response
import json,os
from core.auth import login_auth
from core.tool import format_json,re_json
from app.middleware import get_user_session,logined,csrf
from core.csrf import csrf_start
from core.save import save_it,save_news,save_comment,save_head
from core.get import get,get_news_p,get_news_all,get_news_comment
app = Flask(__name__)
app.secret_key = "asdhiiai1238uad8drr8uq2894789"

@app.route('/')
@get_user_session
def index():
    return render_template('index.html', user=session['user'],csrf_token=csrf_start(session))


@app.route('/user/login', methods=['GET'])
@get_user_session
def login():
    if session['user']['check'] ==False:
        return render_template('user/login.html',user=session['user'],csrf_token=csrf_start(session))
    else:
        return redirect('/user/home')


@app.route('/user/login_auth', methods=['POST'])
@csrf
def login_auths():
    getjson = format_json(request.get_data())
    data = login_auth(getjson['email'], getjson['password'], session)
    return json.dumps(data)


@app.route('/user/login_out',methods=['POST'])
@csrf
def login_out():
    if session['user']['check'] ==True:
        session['user'] ={
            'check':False
        }
        return json.dumps({'status':"success"})
    else:
        return json.dumps({"status":'failed','msg':'you are not login in'})


@app.route('/user/register', methods=['GET'])
@get_user_session
def register():
    return render_template('user/register.html')


@app.route('/user/register_auth', methods=['POST'])
@csrf
def register_auth():
    pass


@app.route('/user/home', methods=['GET'])
@get_user_session
@logined
def user_home():
    return render_template('user/home.html',user=session['user'],csrf_token=csrf_start(session))
# 上传news
@app.route('/upload/news',methods=['POST'])
@logined
@csrf
def uuuuu():
    # print(request.form)
    d_title = request.form['title']
    d_content = request.form['content']
    s = request.files['file']
    if not s.filename == "":
        d =save_it(s,save_path='news',table='news')
        # print(d)
        if d['status']:
            if save_news(session['user']['id'],d['get_name'],d_title,d_content):
                return re_json()
            else:
                return re_json(status='failed',msg='error')
        else:
            return re_json('failed','save img failed')
    else:
        # print(2)
        if save_news(user_id=session['user']['id'],img_name='NULL',title=d_title,content=d_content):
            return re_json()
        else:
            return re_json(status='failed', msg='error')

# 上传用户头像
@app.route('/upload/head',methods=['POST'])
@logined
@csrf
def upload_head():
    s = request.files['head']
    if not s.filename=="":
        d = save_it(s,save_path='head',table='head')
        if d['status']:
            if save_head(session['user']['id'],d['get_name']):
                session['user']['head'] = d['get_name']
                # print(session['user'])
                return re_json()
            else:
                return re_json(status='failed', msg='error')
        else:
            return re_json('failed', 'save img failed')

@app.route('/get/<name>',methods=['GET'])
def get_img(name):
    q = request.args['t']
    # print(q)
    if len(q) == 0 or q == None:
        g = get(name)
        return Response(g[0],mimetype=g[1])
    else:
        g = get(name, q)
        return Response(g[0], mimetype=g[1])

@app.route('/p/<id>',methods=['GET'])
@get_user_session
def pppp(id):
    d = get_news_p(id)
    # print(d)
    if d['status']:
        return render_template('news/p.html',data=d,user=session['user'],csrf_token=csrf_start(session=session))
    else:
        return re_json('failed','not found news')

@app.route('/f',methods=['POST'])
def ffff():
    page = request.args['page']
    page = page =="" and 1 or page
    data = get_news_all(int(page))
    return json.dumps(data)

#获取评论
@app.route('/c',methods=['POST'])
@csrf
def cccc():
    c = request.args['c']
    page = request.args['page']
    page = page == "" and 1 or page
    return json.dumps(get_news_comment(int(c),int(page)))

@app.route('/c/comment',methods=['POST'])
@csrf
def cccoment():
    s = format_json(request.get_data())

    if session['user']['check']:
        a = save_comment(s['id'], session['user']['id'], s['comment'])
        if a:
            return json.dumps({'status':'success','msg':'ok','user':session['user']['name'],'comment':s['comment']})
        else:
            return re_json('failed', 'comment failed')
    else:
        return re_json('failed', 'you are not logined')
@app.route('/test')
@get_user_session
def test():
    return render_template('test.html',csrf_token=csrf_start(session))


if __name__ == '__main__':
    app.run(port=80, host='0.0.0.0')
