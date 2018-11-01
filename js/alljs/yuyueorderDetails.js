$(function() {
	var bespeakId=getUrlParam('id');
	var optistId = getCookie("loginUserId");
	$('.back').click(function(){
		window.history.go(-1);
	})
	$.ajax({
		type:'get',
		url:global+"/v1.0/order/bespeakOrderDetails",
		data:{
			bespeakId:bespeakId,
		},
		success:function(data){
			var data = data.data;
			var str='';
			var times = data.bespeaktimeend.split('T');
            var dateT = times[1].split('.000+0000')[0]; // 16:00:00
            var dateTT = times[0];   // 2017-12-31
            var times = data.bespeaktimestart.split('T');
            var dateTs = times[1].split('.000+0000')[0]; // 16:00:00
            var dateTTs = times[0];   // 2017-12-31
			str='<li><span>姓名:</span>'+data.username+' </li>'
				+'<li><span>手机号:</span>'+data.phone+'</li>'
				+'<li><span>上门时间:</span>'+dateTTs+'&nbsp;&nbsp;'+dateTs+'--'+dateT+'</li>'
				+'<li><span>预约城市:</span>'+data.pcode+'-'+data.ccode+'-'+data.code+'</li>'
				/*+'<li><span>上门地址:</span>'+data.bespeakaddress+'</li>'*/
			$('#con ul').append(str);
			$('.remark').val(data.bespeakremake);
		}
	})
    $(".receipt").click(function(){
        $.ajax({
            type:'PUT',
            url: global + "/v1.0/order/receiveBespeakOrder",
            data:{
                "bespeakId":bespeakId,
            },
            success:function(datas){
                if(datas.code==200){
                	window.location.href = "/static/app/html/receiveData.html";
                }
            }
        })
    })
    $(".refuse").click(function(){
        window.location.href = "/static/app/html/refuse.html?id="+bespeakId+"";
    })
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); return null; 
        }
})