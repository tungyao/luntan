import os,time,base64,hashlib,random
from werkzeug.utils import secure_filename
from core.db import  storage,news,comment,user
from core.tool import rame

ALLOWED_EXTENSIONS = set([
    'png',
    'jpg',
    'jpeg',
    'svg',
    'JPG',
    'gif',
    'docx'
])

basedir = os.path.abspath(os.path.dirname(__file__))
# 用于判断文件后缀
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS
def save_it(upload_file,get_name=None,save_path='img',table='img'):
    db = storage(table=table)
    # print(upload_file)
    if get_name ==None:
        get_name =rame(l=50)
    file_dir = os.path.join(basedir, save_path)

    if not os.path.exists(file_dir):
        os.makedirs(file_dir)

    f = upload_file  # 从表单的file字段获取文件，myfile为该表单的name值
    # print(file_dir)
    if allowed_file(f.filename):  # 判断是否是允许上传的文件类型

        fname = secure_filename(f.filename)

        print('upload name is ', fname)

        ext = fname.rsplit('.', 1)[1]  # 获取文件后缀

        unix_time = int(time.time())

        m = get_name+ str(unix_time)

        token = hashlib.md5(m.encode()).hexdigest()

        hexdigest = token + '.' + ext  # 修改了上传的文件名

        if db.insert(name=get_name,path=save_path,save_name=hexdigest,suffix=ext):
            f.save(file_dir+"\\"+hexdigest)
            # fn = open(os.path.join(file_dir, hexdigest),'wb')
            # fn.write(f)
            # fn.close()
            return {
                'status':True,
                'get_name':get_name
            }
        else:

            return {'status':False}
    else:

        return {'status':'failed','msg':'upload type is not supported'}
def save_news(user_id,img_name,title,content):
    n = news(user_id=user_id,img_name=img_name)
    i = n.insert(title=title,content=content)
    return i
def save_comment(id,user,comments):
    a = comment()


    return a.save(int(id),int(user),comments)

def save_head(user_id,get_name):
    a =user()
    if a.save_head(user_id,get_name):
        return True
if __name__ =="__main__":
    # print(range(random.randint(0,9)))
    pass