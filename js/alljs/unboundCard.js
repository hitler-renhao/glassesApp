$(function(){
	var optistId = getCookie("loginUserId");
	$.ajax({
		type:"get",
		url:global+"/v1.0/wallet/queryBankCard",
		data:{
			optUserId:optistId,
		},
		success:function(data){
			var data = data.data;
			if(data.length=0||data==''){
				$('.unbound').show();
				$('.brank').hide();
			}else{
				$('.unbound').hide();
				$('.brank').show();
				$('.btn').text('提现');
				brank();
			}
		}
	});
	function brank(){
		$.ajax({
			type:"get",
			url:global+"/v1.0/wallet/queryBankCard",
			data:{
				optUserId:optistId,
			},
			success:function(data){
				var data = data.data;
				var num = data[0].bankcardnumber;
				var nums =num.substr(num.length-4)
				$('.brankname').text(data[0].bankname)
				$('.branknum').text(nums);
			}
		});
	}
	$('.brank').click(function(){
		window.location.href = "/static/app/html/myBankcard.html";
	})
	$('.btn').click(function(){
		layer.msg('暂时不支持提现！');
		// window.location.href = "/static/app/html/addBankCard.html?id="+optistId+"";
	})
})


//var str= "abcdefg";
//alert(str.substr(str.length-4));