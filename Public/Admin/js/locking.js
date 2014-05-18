jQuery(function($){
    //定时判断用户是否过期
    var host = baseurl+'/Admin/Index/locking.html';
    setInterval(function(){PushGetSeesion();},parseInt(seesion_expire)*1000+500);
    function PushGetSeesion(){
        $.post(host,"",function(data){
            if(data!='admin'){
                window.location.href = host;
            }
        });
    }

    //创建提醒
    var timeoutbox = '<div class="timeoutbox">系统将在 <span class="yourtimeleft"></span> 后注销</div>'
    $('body').append(timeoutbox);
    $(".yourtimeleft").countdown({
        date: session_expire_totime,
        template: '%i %s'
    });

});

//ajax重新更新事件
function reloadtimecount(){
    jQuery.post('/Admin/Public/getExpireTime.html','',function(data,status){
        var session_expire_totime = data;
        jQuery(".yourtimeleft").countdown({
            date: session_expire_totime,
            template: '%i %s'
        });
    })
}
//为所有ajax请求更新session过期时间
$( document ).ajaxComplete(function(event,request,settings) {
    //console.log(event);console.log(request);console.log(settings);
    //排队一种情况，解决死循环。
    if(settings.url != '/Admin/Public/getExpireTime.html'){
        reloadtimecount();
    }
});

