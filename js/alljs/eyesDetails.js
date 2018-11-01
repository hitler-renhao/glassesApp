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
			$('.remark').val(data.bespeakremake);
			$('.rp1RightQiujing').text(data.rp1RightQiujing);
	        $('.rp1LeftQiujing').text(data.rp1LeftQiujing);
	        $('.rp1RightZhujing').text(data.rp1RightZhujing);
	        $('.rp1LeftZhujing').text(data.rp1LeftZhujing);
	        $('.rp1RightZhouwei').text(data.rp1RightZhouwei);
	        $('.rp1LeftZhouwei').text(data.rp1LeftZhouwei);
	        $('.rp1RightTongju').text(data.rp1RightTongju);
	        $('.rp1LeftTongju').text(data.rp1LeftTongju);
	        $('.rp1RightTonggao').text(data.rp1RightTonggao);
	        $('.rp1LeftTonggao').text(data.rp1LeftTonggao);
	        $('.rp1RightJiaozhengshili').text(data.rp1RightJiaozhengshili);
	        $('.rp1LeftJiaozhengshili').text(data.rp1LeftJiaozhengshili);
	        $('.rp1Jiaozhengshili').text(data.rp1Jiaozhengshili);
	        $('.rp1LeftAdd').text(data.rp1LeftAdd);
		}
	});
	function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); return null; 
        }
})
