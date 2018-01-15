import random,math,base64
def csrf_start(session):
    toke = token()
    tokens =toke+"yaodong"
    csrf = base64.b16encode(tokens.encode())
    session.pop("ld_csrf",None)
    session["ld_csrf"] = csrf
    return toke
def jiemi(up_token,session):
    new = up_token+"yaodong"
    csrf = base64.b16encode(new.encode())
    get_session = session.get('ld_csrf') ==None and "NONE" or session['ld_csrf']
    if csrf ==get_session:
        print('CSRF 校验成功')
        return True
    else:
        print('CSRF 校验失败')
        return False
def token():
    str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    arr =""
    i =0
    while i<40:
        n = math.floor(random.random()*62)
        arr +=(str[n])
        i = i+1
    return arr
if __name__ =='__main__':
    # jiemi('2ngkfCDvIjYW1tuGkoRKpmM0Rn5OrzHHXtyaFwTJ')
    # print(token())
    pass