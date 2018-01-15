import json,math,random
def format_json(res):
    get_json = res.decode()

    jsons = json.loads(get_json)
    return jsons
def rame(l=40):
    str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    arr = ""
    i = 0
    while i < l:
        n = math.floor(random.random() * 62)
        arr += (str[n])
        i = i + 1
    return arr
def re_json(status='success',msg=None):
    return json.dumps({'status':status,'msg':msg})