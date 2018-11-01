$(function(){
	var optistId=getCookie("loginUserId");//商家id
	var shopnum=getCookie("optistnum");
	var isParent=getUrlParam("isParent");
	$('.back').click(function(){
		window.history.go(-1);
	})
	$('.btn').click(function(){
		$('.imgs').hide();
		getuuid();
		
	})
	$.ajax({
		type:"post",
		url:global+"/v1.0/LoginRegister/shopInvitationCode",
		async:true,
		data:{
			shopNum:shopnum,
		},
		success:function(data){
			var data=data.data.invitationCodeList;
			var str="";
			if(data.length>0){
				$('.imgs').hide();
			}
			for(var i=0;i<data.length;i++){
				str+="<li data-type="+data[i].isValid+">"+data[i].invCode+"</li>"
			}
			$('.serial').append(str);
		}
	})
	$('.save').click(function(){
		var value_attr = [];
        var value_str = '';
        $('.serial li').each(function() {
            value_attr.push($(this).text());
            value_str = value_attr.join(",");
        });
		$.ajax({
			type:"post",
			url:global+"/v1.0/LoginRegister/shopUpdateInvitationCode",
			async:true,
			data:{
				id:optistId,
				isParent:isParent,
				code:value_str,
			},
			success:function(data){
				if(data.code==200){
					layer.alert('生成的序列号将在个人中心页面展示',function(){
						setCookie("isParent",isParent,1);
						window.location.href = "/static/app/html/shopInformation.html?type=1&isParent="+isParent+"";
					});
				}
			}
		});
	})
	function getuuid() {
	    var s = [];
	    var hexDigits = "0123456789abcdefghijklmnopqrstuvwxyz";
	    for (var i = 0; i < 5; i++) {
	        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	    }
	    s[2] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
	    s[5] = hexDigits.substr((s[4] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
	    var list="";
	    var uuid = s.join("");
	    list+="<li>"+uuid+"</li>"
	    
	   $('.serial').append(list);
	}
})
