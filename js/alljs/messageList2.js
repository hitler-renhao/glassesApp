$(function(){
    $(".pic").click(function(){
        window.location.href = '/static/app/html/index.html'
    })
    var optistId=getCookie("loginUserId");
    var optistnum=getCookie("optistnum");   //账号
    var isIdentOrShop = getCookie('isIdentOrShop');
    if(isIdentOrShop==0){
	    $.ajax({
	        type:'GET',
	        url: global + '/v1.0/message/queryMessageList',
	        data: {
	            "pageNum":1,
	            "pageSize": 10,
	            "optUserNum":optistnum,
	            "identificationId":optistId
	        },
	        success:function(data){
	            var res = data.list;
	            var str='';
	            $.each(res,function(index,value){
	                str+= "<ul class='list'>" + 
	                    "<a href='/static/app/html/messageDetail.html?notifyType="+value.notifyType+"'>" + 
	                        "<li>" + 
	                            "<span class='picImg'>" + 
	                                "<img src='/static/app/images/qbxx.png'>" + 
	                                "<span class='tip'>" + value.unReadCount + "</span>" + 
	                            "</span>" + 
	                            "<p>" + value.notifyName + "</p>" + 
	                        "</li>" + 
	                        "<span class='jiantou'>" + 
	                            "<img src='/static/app/images/jiantou.png'>" + 
	                        "</span>" + 
	                    "</a>" + "</ul>"
	                $("section").html(str)
	            })
	
	        }
	    })
    }else if(isIdentOrShop==1){
    	$.ajax({
	        type:'GET',
	        url: global + '/v1.0/message/queryMessageList',
	        data: {
	            "pageNum":1,
	            "pageSize": 10,
	            "optUserNum":optistnum,
	            "shopId":optistId
	        },
	        success:function(data){
	            var res = data.list;
	            var str='';
	            $.each(res,function(index,value){
	                str+= "<ul class='list'>" + 
	                    "<a href='/static/app/html/messageDetail.html?notifyType="+value.notifyType+"'>" + 
	                        "<li>" + 
	                            "<span class='picImg'>" + 
	                                "<img src='/static/app/images/qbxx.png'>" + 
	                                "<span class='tip'>" + value.unReadCount + "</span>" + 
	                            "</span>" + 
	                            "<p>" + value.notifyName + "</p>" + 
	                        "</li>" + 
	                        "<span class='jiantou'>" + 
	                            "<img src='/static/app/images/jiantou.png'>" + 
	                        "</span>" + 
	                    "</a>" + "</ul>"
	                $("section").html(str)
	            })
	
	        }
	    })
    }
})