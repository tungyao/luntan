/**
 * Created by TungYao on 2017/9/13.
 */
//列表切换方法
$.fn.ydlistswitch = function (panel) {

    var list_length = $(this).children('.yd-list-switch-item');
    var panel_lenght = $(panel).children('.yd-panel-switch-item');
    for (var i = 0; i < list_length.length; i++) {
        $(list_length[i]).attr('role', 'button');
        onit(list_length[i], panel_lenght[i]);
    }
};

function onit(classNameList, classNamePanel) {
    $(classNameList).on('click', function () {
        // console.log('1232')
        $(classNamePanel).css('display', 'block');
        $(classNamePanel).nextAll().css('display', 'none');
        $(classNamePanel).prevAll().css('display', 'none');


        $(classNameList).addClass('active');
        $(classNameList).nextAll().removeClass('active');
        $(classNameList).prevAll().removeClass('active');
    });
}
$.fn.setlocation_to_center = function () {
    var defaults = {
        marginLeft: ($(this).parent().width()-$(this).width())/2
    };
    // var defaults = options == null ? defaults : options;
    $(this).css('margin-left',defaults.marginLeft);
};

$.fn.setlocation = function (options) {
    var defaults = {
        marginLeft: 200,
        marginTop: -300
    };
    var opts = $.extend(defaults, options);
    // var defaults = options == null ? defaults : options;
    $(this).css(opts);
};
$.fn.setheightwidth = function (options) {
    var defaults = {
        height: 300,
        width: '100%'
    };
    var opts = $.extend(defaults, options);
    $(this).css(opts);
};
$.fn.modifyimginfo = function () {
    var p = $(this).parents('.list-group-item').parent('.list-group');
    var name = $(p).children().eq(1);
    var status = $(p).children().eq(2);
    $('.modify-img-header').children('img').remove();
    $('.hidden_id').val($(p).children('input').val());
    $('.modify-img-header').append($(p).children().eq(0).children('img').clone());
    $('.modify-img-name').val(name.text());
    $('.modify-img-modal-lg').modal('show');
};
$.fn.formTOJSON= function () {
    var json = {};
    var data = $(this).serializeArray();
    $.each(data, function () {
        json[this.name] = this.value;
    });
    data = JSON.stringify(json);
    return data;
};
$.fn.itemshowhide = function (data) {
    // $(this).width(800);
    var ul = document.createElement('ul');
    $(ul).addClass('list-inline');
    $(ul).addClass('group');
    $(this).addClass('overflow-hidden');
    for (var i=0;i<data.length;i++){
        var li =document.createElement('li');
        $(li).text(data[i]);
        $(li).addClass('yd-list');
        $(li).css('padding-right',100);
        $(ul).append($(li));
    }
    $(this).append($(ul));
    if($(ul).height()>$(li).height()){
        $(this).css('overflow','hidden')
        $(this).css('height',$(li).height())
        $(ul).css('height',$(li).height())
        $(ul).css('margin',0)
        $(this).height($(li).height());
        $(this).append('<a role="button" onclick="app.overflows()" style="float: right;position: absolute;margin-left: 54%;margin-top:-20px ;' +
            '">更多</a>');
    }
};
//加载loading图
$.fn.dynamicLoading = function (option) {
    var op = option=='hide' ?'hide':'show';
    var op1 = option=='hide' ?'show':'hide';
   $(this).removeClass(op);
   $(this).removeClass(op1);
   $(this).addClass(op);
};
$.fn.ydsidebar = function (option) {
    var height = $(this).height($(window).height());
    if($(this).width()<=10){
        $(this).css('display','block');
        $(this).animate({'width':$(window).width()},500)
        $(this).children().removeClass('hide');
    }else {
        $(this).children().addClass('hide');
        $(this).animate({'width':0},500);
    }
    if(option==null){
    }else {
        $(this).children('.yd-sidebar-header').children('.qiandao_title').text(option.title);
        $(this).children('.yd-sidebar-body').children('.qiandao-content').text(option.content);
        option.func();
    }
};