$.fn.slider_menu = function () {
    var a = $(this).children('.slider_menu_item');
    $(a[0]).children('.list-group').addClass(' add_list_lengthen slider_menu_lengh')
    $(a[0]).children('.list-group').slideDown();
    var p = $(a).children('a');
    $(p).next().attr('role','button');
    $(p).attr('role', 'button');
    // var f = $('.switch_panel').children('.switch_panel_item')
    // // $(f[0]).

    $(p).click(function () {
        var l = $(this).next('.list-group');
        $(l).addClass('test')
        var r = $(l).slideDown()[0]
        var ul = $(a).children('.list-group')
        for (var i = 0; i < ul.length; i++) {
            if (ul[i] == r) {
                ul.splice(i, 1)
            }
        }
        $(ul).slideUp();
        $(ul).removeClass('test')
        $(l).children('.list-group-item').each(function (e) {
            $(this).addClass('add_list_lengthen')
        })
    })
};
$.fn.switch_panel = function () {
    // var a = $('.switch_list');//获取菜单
    // var b = $('.switch_panel');//获取大面板
    // console.log(a)
    // console.log(b)
    // var aa = $(a).children('.switch_list_item');//菜单里的子元素
    // var bb = $(b).children('.switch_panel_item')//大面板里的小件
    // console.log(aa)
    // console.log(bb)
    var a = $('.data-switch').children();
    // $('.data-switch').children()[0].show();
    // console.log(a.length)
    for (var i =0;i<a.length;i++){
        var s = $(a[i]).attr('data-switch');
        if(i!=0){
            $(s).hide()
        }else {
            $(s).addClass('from_right_to_left')
        }
        register_event_panel(a[i],s);
    }
}
//注册面板事件
function register_event_panel(id,data_switch) {
    //获得所有面板
    var a = $('.switch_panel').children();

    $(id).click(function () {
        //获得需要的慢板id名
        $(data_switch).addClass('from_right_to_left');
        $(data_switch).show();

        $(data_switch).siblings().hide();

    })
}
