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
			var str="";
			for(var i=0;i<data.length;i++){
				str+='<p>'
                    +'<span>'+data[i].bankname+'</span>'
                    +'<span>'+data[i].bankcardnumber+'</span>'
                +'</p>'
			}
			$('.card').append(str);
		}
	});
})
