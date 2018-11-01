$(function(){
	var isIdentOrShop = getCookie('isIdentOrShop');  //验证是商家还是验光师   0验光师   1商家
	var optistnum = getCookie("optistnum");    //账号
	$('.pic').click(function(){
		window.history.go(-1);
	});
	$('.bindPhone').text(optistnum);
	$('#preserveBtn').click(function(){
		var tel = $.trim($(".tel").val());
        var code = $('.code').val();
        var isMobile=/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!tel){
			layer.msg('请输入手机号码，不能为空');
			return false;
		}else if (!isMobile.test(tel)) {
			layer.msg('请输入有效的手机号码');
			return false;
		};
		if(!code){
			layer.msg('请输入验证码，不能为空');
			return false;
		};
		layer.confirm('更换手机号码后之前的账户将无法登录',{btn: ['确定', '取消'], title: "更换手机号码"},function(){
			if(isIdentOrShop==0){
				$.ajax({
		            type: "POST",
		            url: global + "/v1.0/LoginRegister/updateIdentificationOptistNum",
		            data: {
		                "optistNum": optistnum,
		                "newOptistNum": tel,
		                "mesCode":code,
		            },
		            success:function(datas){
		                if (200 == datas.code) {
		                    layer.alert("手机号修改成功！",function(){
		                    	window.history.go(-1);
		                    })
		                    
		                } else {
		                    layer.msg(datas.msg);
		                }
		            }
		        }) 
			}else if(isIdentOrShop==1){
				$.ajax({
		            type: "POST",
		            url: global + "/v1.0/LoginRegister/shopUpdateCrmShopNum",
		            data: {
		                "shopNum": optistnum,
		                "newShopNum": tel,
		                "mesCode":code,
		            },
		            success:function(datas){
		                if (200 == datas.code) {
		                    layer.alert("手机号修改成功！",function(){
		                    	window.history.go(-1);
		                    })
		                    
		                } else {
		                    layer.msg(datas.msg);
		                }
		            }
		        }) 
			}
     		 
     	},function(){
     		layer.close();
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
		$("#btn").click(function(){
			curCount = count; 
			var phonenumber = $.trim(optistnum);//手机号码 
			var isMobile=/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
			var jtel = $(".tel");
			if(phonenumber != "" && isMobile.test(phonenumber) && phonenumber.length==11){ 
				//设置button效果，开始计时 
				$("#btn").attr("disabled", "true"); 
				$("#btn").text("请在" + curCount + "秒内输入验证码"); 
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
							layer.msg('验证码已发送到您当前绑定的手机，请注意查收！');
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
				$("#btn").removeAttr("disabled");//启用按钮 
				$("#btn").text("重新发送验证码"); 
				code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效 
			} else { 
				curCount--; 
				$("#btn").text("请在" + curCount + "秒内输入验证码"); 
			} 
		} 
})
