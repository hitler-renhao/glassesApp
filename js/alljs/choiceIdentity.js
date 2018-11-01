$(function(){
    var optistId=getCookie("loginUserId");
    $('.pic').click(function(){
    var optistId=getCookie("loginUserId");
       window.location.href='/static/app/static/app/html/index.html?optistId='+optistId+'';
    })
})