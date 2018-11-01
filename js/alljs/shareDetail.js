$(function(){
	$('pic').click(function(){
		window.history.go(-1);
	})
	$('.register').click(function(){
		var phone = $('.phone').val();
		var pass = $('.pass').val();
		var code = $('.code').val();
		var invitation = $('.invitation').val();
		var isMobile=/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		if(!phone){
			layer.msg('请输入手机号码，不能为空');
			return false;
		}else if (!isMobile.test(phone)) {
			layer.msg('请输入有效的手机号码');
			return false;
		}
		if(!pass){
			layer.msg('请输入登录密码，不能为空');
			return false;
		}
		if(!code){
			layer.msg('请输入手机验证码，不能为空');
			return false;
		}
		if(!invitation){
			layer.msg('请输入邀请码');
			return false;
		}
		$.ajax({
            type: "GET",
            url: global + "",
            data: {
               
            },
            success:function(data){
                if(data.code==200){
                	
                }
            }
        })
	})
	//验证码倒计时 
		var InterValObj; //timer变量，控制时间 
		var count = 60; //间隔函数，1秒执行 
		var curCount;//当前剩余秒数 
		var code = ""; //验证码 
		var regType;
		var phoneTemplet;
		var codeLength = 4;//验证码长度 
		$(".getcode").click(function(){
			curCount = count; 
			var phonenumber = $.trim($(".phone").val());//手机号码 
			var isMobile=/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
			var jtel = $(".phone");
			if(phonenumber != "" && isMobile.test(phonenumber) && phonenumber.length==11){ 
				//设置button效果，开始计时 
				$(".getcode").attr("disabled", "true"); 
				$(".getcode").text("请在" + curCount + "秒内输入验证码"); 
				InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次 
				//	产生验证码 
				for (var i = 0; i < codeLength; i++) { 
					code += parseInt(Math.random() * 9).toString(); 
				} 
				//向后台获验证码 
				$.ajax({ 
					url:global+"/send",
					type: "post",
					dataType: "JSON",
					data:{
						mobile:phonenumber,
					},
					success: function (data){
						if(data.code==200){
							layer.msg('验证码已发送到您的手机，请注意查收！');
						}
					} 
				}); 
			}else{ 
				layer.msg('请输入有效的手机号码'); 
			} 
		});
		//timer处理函数 
		function SetRemainTime() { 
			if (curCount == 0) { 
				window.clearInterval(InterValObj);//停止计时器 
				$(".getcode").removeAttr("disabled");//启用按钮 
				$(".getcode").text("重新发送验证码"); 
				code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效 
			} else { 
				curCount--; 
				$(".getcode").text("请在" + curCount + "秒内输入"); 
			} 
		} 
})
