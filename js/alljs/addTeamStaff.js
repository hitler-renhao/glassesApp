$(function(){
	var optistId=getCookie("loginUserId");
	$('.pic').click(function(){
		window.history.go(-1);
	})
	$('.btn').click(function(){
		var compellation=$('.compellation').val();
		var tel=$.trim($('.tel').val());
		var phone=$.trim($('.phone').val());
		var address=$('.address').val();
		var sex=$('.sex').val();
		var isMobile=/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		if(sex=='男'){
			sex=0;
		}else if(sex=='女'){
			sex=1;
		}
		if(!compellation){
			layer.msg('请输入员工姓名，不能为空');
			return false;
		}
		if(!tel){
			layer.msg('请输入手机号码，不能为空');
			return false;
		}else if (!isMobile.test(tel)) {
			layer.msg('请输入有效的手机号码');
			return false;
		}
		if (!isMobile.test(phone)) {
			layer.msg('请输入有效的备用号码');
			return false;
		}
		if(!address){
			layer.msg('请输入员工地址，不能为空');
			return false;
		}
		$.ajax({
			type:"post",
			url:global+"/v1.0/merchant/addEmployee",
			async:true,
			data:{
				shopid:optistId,
				staffname:compellation,   //员工姓名
				staffsex:sex,   //性别
				staffmobile:tel,
				backupsstaffmobile:phone,
				staffaddress:address,
			},
			success:function(data){
				if(data.code==200){
					layer.msg('添加成功',function(){
						window.location.href = "/static/app/html/MyTeam.html";
					})
				}
			}
		});
	})
})
