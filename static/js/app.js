/**
 * Created by TungYao on 2017/9/10.
 */
// 调整登录框的位置,让其居中
$(document).ready(function () {
    login_box_switch();
    login_box_switch_adshiasdio();

    window.onresize = function (ev) {
        $('.slider_bar').css('right', ($(this).width() - $('.f_news_show').width()) / 2 - 100)
    };

    $('.school_news_user_dilog').each(function (e) {
        $(this).height($(this).next('.school_news_user_content').height())
    });
    $('.school_news_user_content').each(function () {
        // $(this).css('margin-top',-$(this).children('.school_news_user_content_time').height())
    });
    $('.school_news_part').each(function () {
        var d = $(this).children('.school_news_user_content').height() + $(this).children('.school_news_user_title').height()
        $(this).height(d)
    })

    $('.write_post').click(function () {
        // if ($('.create_write_news_box').attr('data-toggle'))
        $('.create_write_news_box_inner ').addClass('yo_chocolate');

        $('.create_write_news_box ').toggle()
    })
    //调整位置
});

function login() {
    axios({
        method: 'post',
        url: '/user/login_auth',
        headers: {'CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
        data: $('.login_auth').formTOJSON()
    }).then(function (value) {
        if(value.data.status=="success"){
            window.location='/';
        }else {
            alert(value.data.msg)
        }
    })
}
// 监听回车事件
function listenEnter() {
    $(this).keydown(function (event) {
        if (event.keyCode == 13) {
            login();
        }
    });
}
//退出登录
function login_out() {
    axios({
        method: 'post',
        url: '/user/login_out',
        headers: {'CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
    }).then(function (value) {
        alert(value.data.status)
    })
}
//注册用户
function registerAuth() {
    axios({
        method: 'post',
        url: '/user/register_auth',
        headers: {'CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
        data: $('.login_auth').formTOJSON(),
    }).then(function (value) {
        if(value.data.status=="success"){
           alert('register success')
        }
    })
}
function get_news() {
    axios({
        method: 'post',
        url: '/f?page=',
        headers: {'CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
    }).then(function (value) {
        // console.log(value)
        format_news_json(value.data)
    })
}
//写新闻
function format_news_json(obj) {

    for (var i in obj) {
        var div = document.createElement('div');
        var a = document.createElement('a');
        // var p = document.createElement('p');
        var li = document.createElement('li');
        $(li).addClass('list-group-item col-md-12 col-xs-12 ');
        var d2 = document.createElement('div');
        $(d2).css('float', 'right');
        $(d2).css('margin-top', '35%');
        $(d2).addClass('hidden-xs');
        $(div).addClass('col-md-12 col-xs-12');
        $(a).addClass('col-md-10 col-xs-12');
        // $(p).addClass('col-md-10 col-xs-12');
        // $(p).css('overflow','hidden');
        // console.log(obj[i].img)
        if (obj[i].img !='NULL') {
            var img = document.createElement('img');
            $(img).attr('src', '/get/' + obj[i].img + "?t=");
            $(img).addClass('img-responsive col-md-4 col-xs-9');
        }
        $(a).attr('href', '/p/' + obj[i].id);
        $(a).text(obj[i].title);
        $(a).css('color','#111111')
        // $(p).text(obj[i].content);
        $(d2).html("<center>" + obj[i].user + "<br>" + obj[i].time + "</center>");

        $(div).append(a);
        // $(div).append(p);
        $(div).append(img);
        $(div).append(d2);
        $(li).append(div);
        $('.f_news_show').append($(li))
        $('.f_news_show').children().css('background-color','#BBBBBB')
    }

}
//侧边栏
function slider_bar(className) {
    var div = document.createElement('div');
    $(div).addClass('slider_bar');
    $(div).height(200);
    $(div).width(50)
    // $(div).css('background-color','red');
    $(div).css('position', 'fixed');
    $(div).css('right', ($(this).width() - $(className).width()) / 2 - 100);
    $(div).css('top', '70%');
    //生成按钮
    var o1 = document.createElement('i');
    $(o1).addClass('fa fa-chevron-up fa-3x slider_back yo_slider_bar yo_wheat');
    $(o1).click(function () {
        window.scrollTo(0, 0)
    })
    var o2 = document.createElement('i');
    $(o2).addClass('fa fa-pencil-square-o fa-3x yo_slider_bar write_post yo_wheat');
    $(o1).attr('role', 'button');
    $(o2).attr('role', 'button');
    $(o1).css('margin-bottom', 10)
    $(o2).css('margin-bottom', 10)
    $(div).append(o1);
    $(div).append(o2);
    $('body').append(div)
}
//生成写帖子盒子
function create_write_news_box() {
    var a = $('.slider_bar').offset()
    var top = a.top;
    var left = a.left;
    var div = document.createElement("div");
    $(div).width($(window).width() / 2);
    $(div).height($(window).height() / 2);
    $(div).addClass('create_write_news_box');
    $(div).css('margin-top', top - $(div).height() + $('.slider_bar').height() / 2)
    $(div).css('left', left - $(div).width())
    $('body').append(div)
}
//内部构造
function create_write_news_box_inner() {
    var div = document.createElement("div");
    $(div).addClass('create_write_news_box_inner').css('background-color','#444444');
    var form = document.createElement("form");
    $(form).addClass('upload_news');
    // $(form).attr('enctype', "multipart/form-data")
    var d1 = document.createElement("div");
    $(d1).addClass('form-group')
    var l1 = document.createElement("label")
    $(l1).text('标题')
    var i1 = document.createElement("input")
    $(i1).addClass('form-control')
    $(i1).attr('name', 'title')
    $(d1).append(l1);
    $(d1).append(i1);

    var d2 = document.createElement("div");
    $(d2).addClass('form-group')
    var l2 = document.createElement("label")
    $(l2).text('内容')
    var i2 = document.createElement("textarea");
    $(i2).attr('rows', 3)
    $(i2).attr('name', 'content')
    $(i2).addClass('form-control');
    $(d2).append(l2);
    $(d2).append(i2);

    //生成预览file框
    var button = document.createElement('button');
    $(button).addClass('btn btn-info').text('添加图片').css({
        float:'left',
        marginButtom:'10px'
    }).click(function () {
        $(this).nextAll('input[type="file"]').click()
        return false;
    })
    var d3 = document.createElement("div");
    $(d3).addClass('form-group')
    var l3 = document.createElement("label");
    // $(l3).text('图片')
    var i3_add_img = document.createElement("img")
    $(i3_add_img).addClass('col-md-3');
    var i3 = document.createElement("input");
    $(i3).attr('type', 'file')
    $(i3).attr('name', 'file')
    $(i3).attr('id', 'file')
    $(i3).hide()
    $(i3).addClass('form-control')
    $(d3).append(button);
    $(d3).append(l3);
    $(d3).append(i3);
    $(d3).append(i3_add_img);
    //注册事件
    $(i3).change(function () {
        var fiel = this.files[0];
        var reader = new FileReader()
        var imgFile
        reader.readAsDataURL(fiel)
        reader.onloadend = function (e) {
            // alert('文件读取完成');
            imgFile = e.target.result;
            // console.log(imgFile);
            $(i3_add_img).attr('src', imgFile);
        }
    })


    var i4 = document.createElement("input")
    $(i4).attr('type', 'button')
    $(i4).addClass('form-control submit_it_news')
    $(i4).val('提交')
    var r1 = document.createElement("div");
    var r2 = document.createElement("div");
    var r3 = document.createElement("div");
    $(r1).addClass('col-md-1 hidden-xs')
    $(r2).addClass('col-md-10 col-xs-12')
    $(r3).addClass('col-md-1 hidden-xs')

    $(form).append(d1)
    $(form).append(d2)
    $(form).append(d3)
    $(form).append(i4)

    $(r2).append(form)

    $(div).append(r1)
    $(div).append(r2)
    $(div).append(r3)
    $(form).css('margin-top',30)
    $('.create_write_news_box').append(div);
    $('.submit_it_news').click(function () {
        var formData = new FormData($('.upload_news')[0]);
        // var d = $('.upload_news').children('div');
        // formData.append('title',$(d[0]).children('input').val())
        // formData.append('content',$(d[1]).children('textarea').val())
        // formData.append('file',document.getElementById('file').files[0]);
        $.ajax({
            url: '/upload/news',
            type: 'POST',
            headers: {'CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                location.reload()
            },
            error: function (returndata) {
                alert('failed')
            }
        })
    })
}
//监听file框的改变
function listen_input_file_change() {

}
//提交news
function submit_news() {


}
//增加写评论按钮
function add_write_comment() {
    var i = document.createElement('i')
    $(i).attr('role', 'button')
    $(i).addClass('fa fa-pencil fa-3x write_comment yo_slider_bar yo_wheat')
    $(i).css('margin-bottom', 5)

    $('.slider_bar').append(i)
}
//请求评论
function school_new_req_comment(id) {
    axios({
        method: 'post',
        url: '/c?c=' + id + '&page=',
        headers: {'CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')}
    }).then(function (res) {
        // console.log(res)
        get_news_format(res.data)
    })
}
function random_color() {
    var color = [
        '#AAAAAA',
        '#BBBBBB',
        '#CCCCCC',
        // '#66CCCC',
        // '#9966CC',
        // '#CC66CC',
        // '#CCCCFF',
        // '#FF99CC',
        // '#FFFF99',
        // '#6699FF',
        // '#FF6699',
        // '#FFCC99'
    ]
    var a = Math.floor(Math.random() * 3)
    return color[a]
}
function get_news_format(obj) {
    for (var i in obj) {
        var d1 = document.createElement('div');
        $(d1).css('background-color', random_color());
        $(d1).css('margin-bottom', 20);
        $(d1).addClass('school_news_part')
        var d2 = document.createElement('div');
        $(d2).addClass('school_news_user_dilog');
        $(d2).css('font-size', '1.8em');
        $(d2).css('text-align', 'left');
        // 创建头像
        if (obj[i].head == "NULL") {
            var ii = document.createElement('i');
            var center = document.createElement('center')
            $(center).css('margin-top', 20)
            $(ii).addClass('fa fa-user-o fa-4x');
            $(center).append(ii)
            $(d2).append(center);

        } else {
            var img = document.createElement('img');
            var imgd = document.createElement('div');
            $(imgd).addClass('school_news_user_dilo_img');
            var head = '/get/' + obj[i].head + '?t=head';
            // console.log(head)
            $(img).attr('src',head);
            $(img).addClass('img-responsive img-thumbnail')
            $(imgd).append(img)
            $(d2).append(imgd)
        }
        //用户名字
        var p = document.createElement('p');
        $(p).addClass('user_name_1');
        $(p).text(obj[i].user)
        $(p).css('text-align', 'center')
        $(d2).append(p);
        // 评论区
        var d3 = document.createElement('div');
        $(d3).addClass('school_news_user_content')
        $(d3).css('margin', '0 0')
        // $(d3).addClass('border_px')
        var d3_3 = document.createElement('div');
        var d3_3_3 = document.createElement('p');
        $(d3_3_3).css("overflow-wrap", "break-word");
        $(d3_3_3).text(obj[i].content)
        $(d3_3).addClass('school_news_user_content_n')
        $(d3_3).css('margin-left', 8)
        $(d3_3).css('margin-top', 8)
        $(d3_3).append(d3_3_3)
        $(d3).append(d3_3);

        //s时间
        var d4 = document.createElement('div');
        $(d4).addClass('school_news_user_content_time');
        $(d4).text(obj[i].time);
        $(d3).append(d4);

        var nu = document.createElement('div');
        $(nu).addClass('school_news_user_title');
        $(d1).append(d2);
        $(d1).append(nu);
        $(d1).append(d3);
        $('.school_commet_show').append(d1)

    }
    judgment_user_is_lz()
}
//发表评论
function writes_comment() {
    $('.school_write_comment_box').width($('body').width());
    // $(d).height(200);
    // $('.school_write_comment_box').css('right', ($(this).width() - $('.school_news_part').width()) / 2 +70);

    $('.write_comment').click(function () {
        $('.school_write_comment_box').slideDown()
    });
}
function go_it_comment() {
    $('.go_comment').on('click', function () {
        axios({
            method: 'post',
            url: '/c/comment',
            data: $('.school_write_comment_box_form').formTOJSON(),
            headers: {'CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
        }).then(function (value) {
            if(value.data.status=='success'){
                var data = {0:{

                }}
            }else {
                alert('failed')
            }
        })
    })
}
function write_comment_down() {
    $('.school_write_comment_box').slideUp()
}
//判断是否是楼主
function judgment_user_is_lz() {
    var user = $('.user_name_0').text();

    $('.user_name_1').each(function () {
        var div = document.createElement('div');
        $(div).addClass('yo_ribbon_top_right');
        var s = document.createElement('span')
        $(s).text('楼主');
        $(div).append(s);
        // console.log($(this))
        $(this).prev('.school_news_user_dilo_img').children('img').before(div)
        // console.log(a)
    })
}
//login_box 切换
function login_box_switch() {
    $('.login_box_login').click(function () {
        login_box_switch_adshiasdio()
    });
    $('.login_box_register').click(function () {
        login_box_switch_iheuieu()
    })

}
function login_box_switch_adshiasdio() {
    $('.login_box_register_panel').html("");
    $('nav').removeClass('navbar-default-back').addClass('navbar-default');
   $('.search-btn').removeClass('btn-success').addClass('btn-default');
    $('body').removeClass('yo_3333').addClass('yo_333')
    $('.submit_login').removeClass('btn-success').addClass('btn-default')
    $('.login_box_login_panel').html("<center>" +
        "<i class='fa fa-chevron-up fa-3x  yo_wheat'></i>" +
        "</center>");
    $('.login_auth').attr('action', '/user/login_auth')
    var a = $('.login_auth');
    $(a).children('.repassword').remove();
    var b = $(a).children('button');
    $(b).text('登录')
    $(b).attr('onclick', 'login()')
}

function login_box_switch_iheuieu() {
    $('.login_box_login_panel').html("");
        $('body').removeClass('yo_333').addClass('yo_3333')
    $('nav').removeClass('navbar-default').addClass('navbar-default-back');
    $('.submit_login').addClass('btn-success')
    $('.login_box_register_panel').html("<center>" +
        "<i class='fa fa-chevron-up fa-3x yo_333'></i>" +
        "</center>");
    $('.search-btn').addClass('btn-success')
    $('.login_auth').attr('action', '/user/register_auth')
    $('.login_auth').children('.password').after('<div class="form-group repassword">' +
        '<label for="exampleInputPassword2">确认密码</label>' +
        '<input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"' +
        'name="repassword">' +
        '</div>')
    $('.login_auth').children('button').text('注册')
    $('.login_auth').children('button').attr('onclick', 'registerAuth()')

}
//换头像随便一上事件
function change_head() {

    $('.head_over').toggle();
    $('.head_over_change_box').toggle();

}
function select_heads() {
    $('.select_head').click(function () {
        $('.upload_head_form').children('input').click()
    });
    $('.upload_head_form').children('input').change(function () {
        var img = document.createElement('img');
        $(img).addClass('img-circle img-responsive');
        var fiel = this.files[0];
        var reader = new FileReader();
        var imgFile;
        reader.readAsDataURL(fiel);
        reader.onloadend = function (e) {
            // alert('文件读取完成');
            imgFile = e.target.result;
            // console.log(imgFile);
            $(img).attr('src', imgFile);
            $('.head_click_status').html('提交');
            $('.head_click_status').one('click',function () {
                    var formData = new FormData($('.upload_head_form')[0]);
                // var d = $('.upload_news').children('div');
                // formData.append('title',$(d[0]).children('input').val())
                // formData.append('content',$(d[1]).children('textarea').val())
                // formData.append('file',document.getElementById('file').files[0]);
                $.ajax({
                url: '/upload/head',
                type: 'POST',
                headers: {'CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (returndata) {
                    if (returndata.status=='success'){
                        alert('更换成功，重新登录即可')
                    }
                },
                })
                })
            console.log('123')
            $('.head_over_change_box').next().remove();
            $('.head_over_change_box').after(img);
        }
    })
}