$(function(){
	$('.pic').click(function(){
		window.history.go(-1);
	})
	var optistId=getCookie("loginUserId");
	var isParent=getUrlParam("isParent");//分店
	var shopnum = getCookie('optistnum');
	 $('.phone i').text(shopnum);
	 $.ajax({
	 		type:'post',
	 		url:global + "/v1.0/LoginRegister/shopInvitationCode",
	 		data:{
	 			shopNum:shopnum,
	 		},
	 		success:function(data){
	 			var data = data.data.invitationCodeList[0].invCode;
	 			if(data==null||data==''){
	 				$('.code').val('');
	 				$('.btn button').attr('disabled',false).css('background','#198fe0');
	 			}else{
	 				$('.code').val(data).attr('readonly',true);
	 				$('.btn button').attr('disabled',true).css('background','#ccc').text('已绑定');
	 			}
	 			
	 		}
	 	})
	 $('.btn').click(function(){
	 	var code=$('.code').val();
	 	$.ajax({
	 		type:'post',
	 		url:global + "/v1.0/LoginRegister/shopUpdateInvitationCode",
	 		data:{
	 			id:optistId,
	 			isParent:isParent,
	 			code:code,
	 		},
	 		success:function(data){
	 			if(data.code==200){
	 				layer.alert('绑定成功',function(){
	 					setCookie("isParent",isParent,1);
	 					window.location.href = '/static/app/html/shopInformation.html?type=1&isParent='+isParent+'';
	 				})
	 			}else if(data.code==400){
	 				layer.msg('邀请码有误，请重新输入');
	 				$('.code').val('');
	 			}
	 		}
	 	})
	 })
})
