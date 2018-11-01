// 忘记密码
$(function(){
	var type=getCookie('isIdentOrShop');
	$('.loginOnce').click(function(){
		window.location.href = "/static/app/html/login.html?type="+type+"";
	})
    $(".btn").click(function(){
        var $optistmobile = $.trim($("#tel").val());
		var $password = $("#newpsd").val();
		var $messigeCode = $("#yzm").val();
		var isMobile=/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		if(!$optistmobile){
			layer.msg('请输入手机号码，不能为空');
			return false;
		}else if (!isMobile.test($optistmobile)) {
			layer.msg('请输入有效的手机号码');
			return false;
		};
		if(!$messigeCode){
			layer.msg('请输入验证码，不能为空');
			return false;
		};
		if(!$password){
			layer.msg('请输入新密码，不能为空');
			return false;
		};
		$.ajax({
        	type:'POST',
            url:  global + '/v1.0/LoginRegister/isIdentOrShop',
            dataType:'json',
            data: {
                "userName":$optistmobile
            },
            success:function(data){
            	var datas = data.data;
            	if(data.code==200){
            		setCookie("isIdentOrShop",datas.type,1);
            		if(datas.type==0){
					//验光师
						$.ajax({
							type:'POST',
				            url : global + "/v1.0/LoginRegister/ajaxChangePassword",
				            data: {
				                "username":$optistmobile, // 手机号
				                "phone":$optistmobile,
				                "newPassword":$password,  // 密码
				                "mesCode":$messigeCode  // 验证码
				            },
				            success:function(data){
				            	if(data.code==200){
				            		layer.alert('修改成功',function(){
				            			window.location.href = "/static/app/html/login.html?type="+type+"";
				            		})
				            	}else{
				            		layer.msg(data.msg);
				            		return false;
				            	}
				            }
						})
					}else if(datas.type==1){
						//商家
						$.ajax({
							type:'POST',
				            url : global + "/v1.0/LoginRegister/shopChangePassword",
				            data: {
				                "shouNum":$optistmobile, 
				                "phone":$optistmobile,// 手机号
				                "newPassword":$password,  // 密码
				                "mesCode":$messigeCode  // 验证码
				            },
				            success:function(data){
				            	if(data.code==200){
				            		layer.alert('修改成功',function(){
				            			window.location.href = "/static/app/html/login.html?type="+type+"";
				            		})
				            	}else{
				            		layer.msg(data.msg);
				            		return false;
				            	}
				            }
						})
					}
            	}else if(data.code==400){
            		layer.msg(data.msg);
            		return false;
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
		$(".btns").click(function(){
			curCount = count; 
			var phonenumber = $.trim($("#tel").val());//手机号码 
			var isMobile=/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
			var jtel = $("#tel");
			if(phonenumber != "" && isMobile.test(phonenumber) && phonenumber.length==11){ 
				//设置button效果，开始计时 
				$(".btns").attr("disabled", "true"); 
				$(".btns").text("请在" + curCount + "秒内输入验证码"); 
				InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次 
				//	产生验证码 
				for (var i = 0; i < codeLength; i++) { 
					code += parseInt(Math.random() * 9).toString(); 
				} 
				//向后台获验证码 
				$.ajax({ 
					url:global+"/send", 
					type:"post",
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
				$(".btns").removeAttr("disabled");//启用按钮 
				$(".btns").text("重新发送验证码"); 
				code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效 
			} else { 
				curCount--; 
				$(".btns").text("请在" + curCount + "秒内输入验证码"); 
			} 
		} 
})