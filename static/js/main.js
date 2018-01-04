/**
 * Created by TungYao on 2017/9/5.
 */
function popovers() {
    $('.tips_appid_secret').popover({
        title: ':)',
        content: '如果没有这些限制,我们的服务器讲遭到恶意的访问,给你们带来访问延迟。'
    });
}

function modifyText() {
    $.ajax({
        url: 'http://landminetech.x2.natapp.link/api/interface/login',
        data:{"user":"test","password":"2y101iXWE1TIhuMFeGUKqPd7Z"} ,
        type: 'POST',
        success: function (data) {
            console.log(data);
        }
    });
}

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

// 点击接口左面的列表详情 显示右边的面板
function clickListShowRight(data, click) {
    $(data[0]).show();
    $(click[0]).addClass('active');
    for (var i = 0; i < data.length; i++) {
        $(data[i + 1]).hide();
        $(click[i + 1]).removeClass('active');
    }
}

function clickListShowRight_click(className, data, click) {
    $(className).click(function () {
        clickListShowRight(data, click);
    });
}

//生成回到顶部
function buildTop() {
    var h = document.createElement("h1");
    $(h).css('position', 'fixed');
    $(h).css('margin-top', $(this).height() / 1.1);
    $(h).css('margin-left', ($(this).width() - 1170) / 2 + 1170 + 30);
    $(h).attr('role', 'button');
    $(h).click(function () {
        $('body').scrollTop(0);
    });
    $(h).addClass('glyphicon glyphicon-eject');
    $('body').append($(h));
}

//请求文档详情
function requstDocDetails(docName) {
    $('.showDocDetail').children().remove();
    console.log('remove success');
    $.ajax({
        type: 'GET',
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
        url: '/api/jquery/' + docName,
        success: function (data) {
                $('.showDocDetail').html(data);
        }

    });
}

// 将请求的文件加入页面
function dataInpage(data) {
    for (var i = 0; i < jsonLength(data); i++) {
        for (var j = 0; j < jsonLength(data.detail + i); j++) {
            var panel = document.createElement('div');
            var panel_heading = document.createElement('div');
            var panel_body = document.createElement('div');
            var panel_footer = document.createElement('div');
            $(panel).addClass('panel');
            $(panel).addClass('panel-success');
            $(panel_heading).addClass('panel-heading');
            $(panel_body).addClass('panel-body');
            $(panel_footer).addClass('panel-footer');
            $(panel_heading).text(data.detail + i.heading);
            $(panel_body).text(data.detail + i.body);
            $(panel_footer).text(data.detail + i.footer);
            $(panel).append($(panel_heading));
            $(panel).append($(panel_body));
            $(panel).append($(panel_footer));
            $('.showDocDetail').append($(panel));
        }

    }
}

function jsonLength(jsonData) {
    var jsonLength = 0;
    for (var item in jsonData) {
        jsonLength++;
    }
    return jsonLength;

}
$(document).ready(function () {

});