$(function(){
	var bespeakId=getUrlParam('id');
	$.ajax({
		type:"get",
		url:global + "/v1.0/order/bespeakOrderDetails",
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
			$('.list').append(str);
			$('.remark').val(data.optRemark);
		}
	});
	function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); return null; 
    }
})
