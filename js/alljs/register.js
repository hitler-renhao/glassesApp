$(function(){
	var identiType=getUrlParam('type');
	$('.loginOnce').click(function(){
		if(identiType==0){
			//验光师
			window.location.href = "/static/app/html/login.html?type=0";
		}else if(identiType==1){
			//商家
			window.location.href = "/static/app/html/login.html?type=1";
		}
	})
	$('.pic').click(function(){
		window.history.go(-1);
	})
	$(".btns").click(function(){
		var $optistmobile = $.trim($("#tel").val());
		var $password = $("#psd").val();
		var $messigeCode = $("#yzm").val();
		var isMobile=/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		if(!$optistmobile){
			layer.msg('请输入手机号码，不能为空');
			return false;
		}else if (!isMobile.test($optistmobile)) {
			layer.msg('请输入有效的手机号码');
			return false;
		}
		if(!$messigeCode){
			layer.msg('请输入验证码，不能为空');
			return false;
		}
		if(!$password){
			layer.msg('请输入密码，不能为空');
			return false;
		}
		if(identiType==0){
			//验光师
			 $.ajax({
	            type:'POST',
	            url : global + "/v1.0/LoginRegister/ajaxRegister",
	            data: {
	                "optistmobile":$optistmobile, // 手机号
	                "password":$password,  // 密码
	                "messigeCode":$messigeCode,  // 验证码
	            },
	            success:function(datas){
	                if(200 == datas.code) {
	                    layer.msg('注册成功！',function(){
	                    	$.ajax({
					        	type:'POST',
					            url:  global + '/v1.0/LoginRegister/isIdentOrShop',
					            data: {
					                "userName": $optistmobile,
					            },
					            success:function(data){
					            	var data = data.data;
	            					setCookie("isIdentOrShop",data.type,1);
	            					if(data.type==0){   //验光师
					            		$.ajax({
								            type:'POST',
								            url:  global + '/v1.0/LoginRegister/ajaxLogin',
								            data: {
								                "username": $optistmobile,
								                "password": $password,
								            },
								            success:function(data){
								            	var loginObj = data.data;
								            	setCookie("loginUserId",loginObj.id,1);
						                        setCookie("loginUserOptistname",loginObj.optistname,1);
						                        setCookie("appLoginUser",loginObj.appLoginUser,1);
						                        setCookie("status",loginObj.status,1);
						                        setCookie("optistnum",loginObj.optistnum,1);
						                        window.location.href = "/static/app/html/identityAuthentication.html";
								            } 
					            		})
	            					}
					            }
		                    })
	                    })
	                } else { // datas.code == 400
	                    layer.alert("此号码已经注册,请直接登录！",function(){
	                    	 window.location.href = "/static/app/html/login.html";
	                    })
	                }
	            }
	        })
		}else if(identiType==1){
			//商家
			 $.ajax({
	            type:'POST',
	            url : global + "/v1.0/LoginRegister/shopRegister",
	            data: {
	                "optistmobile":$optistmobile, // 手机号
	                "password":$password,  // 密码
	                "messigeCode":$messigeCode,  // 验证码
	            },
	            success:function(datas){
	                if(200 == datas.code) {
	                    layer.msg('注册成功！',function(){
	                    	$.ajax({
					        	type:'POST',
					            url:  global + '/v1.0/LoginRegister/isIdentOrShop',
					            data: {
					                "userName": $optistmobile,
					            },
					            success:function(data){
					            	var data = data.data;
	            					setCookie("isIdentOrShop",data.type,1);
	            					if(data.type==1){   //商家
					            		$.ajax({
								            type:'POST',
								            url:  global + '/v1.0/LoginRegister/shopLogin',
								            data: {
								                "username": $optistmobile,
								                "password": $password,
								            },
								            success:function(data){
								            	var loginObj = data.data;
								            	setCookie("loginUserId",loginObj.id,1);
							                    setCookie("optistnum",loginObj.shopnum,1);
							                    setCookie("shopstatus",loginObj.status,1);
							                    setCookie("shopmobilename",loginObj.shopmobilename,1);
						                        window.location.href = "/static/app/html/businessAudit.html";
								            } 
					            		})
	            					}
					            }
		                    })
	                    })
	                } else { 
	                    layer.alert("此号码已经注册,请直接登录！",function(){
	                    	 window.location.href = "/static/app/html/login.html";
	                    })
	                   
	                }
	            }
	        })
		}
	       
	})
	
	
    //验证码倒计时 
		var InterValObj; //timer变量，控制时间 
		var count = 60; //间隔函数，1秒执行 
		var curCount;//当前剩余秒数 
		var code = ""; //验证码 
		var regType;
		var phoneTemplet;
		var codeLength = 4;//验证码长度 
		$(".btn").click(function(){
			curCount = count; 
			var phonenumber = $.trim($("#tel").val());//手机号码 
			var isMobile=/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
			var jtel = $("#tel");
			if(phonenumber != "" && isMobile.test(phonenumber) && phonenumber.length==11){ 
				//设置button效果，开始计时 
				$(".btn").attr("disabled", "true"); 
				$(".btn").text("请在" + curCount + "秒内输入验证码"); 
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
				$(".btn").removeAttr("disabled");//启用按钮 
				$(".btn").text("重新发送验证码"); 
				code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效 
			} else { 
				curCount--; 
				$(".btn").text("请在" + curCount + "秒内输入验证码"); 
			} 
		} 
    
})