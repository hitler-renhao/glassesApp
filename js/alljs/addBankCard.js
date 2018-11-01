// 添加银行卡
$(function(){
   
    var optistId = getCookie("loginUserId");
	$('.bankcardnumber').bind('blur',function(){
		var bankcardnumber = $('.bankcardnumber').val();	
		var bankno = bankcardnumber.replace(/\s/g,'');
		if(bankno.length < 16 || bankno.length > 19) {
          layer.msg("银行卡号长度必须在16到19之间");
          return false;
	    }
	      var num = /^\d*$/;//全数字
	      if(!num.exec(bankno)) {
	          layer.msg("银行卡号必须全为数字");
	          return false;
	    }
	   		 $.ajax({
				type:"GET",
				url:global+'/v1.0/circle/queryBankNameByBankCode',
				data:{
					bankCode:bankcardnumber,
				},
				success:function(data){
					if(data.code==200){
						$('.bankname').val(data.msg);
					}else if(data.code==400){
						layer.msg('请输入正确的银行卡号');
						return false;
					}
					
				}
			})
	})
   
    $(".sureBtn").click(function(){
    	var cardowner = $('.cardowner').val();
    	var bankcardnumber = $('.bankcardnumber').val();
    	var bankname = $('.bankname').val();
    	/*var code = $('.codes').val();*/
    	var phonenumber = $.trim($(".phonenumber").val());
		var isMobile=/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		if(!cardowner){
			layer.msg('持卡人不能为空');
			return false;
		}
		if(!bankcardnumber){
			layer.msg('请填写银行卡号');
			return false;
		}
		
		if(!phonenumber){
			layer.msg('请输入手机号码，不能为空');
			return false;
		}else if (!isMobile.test(phonenumber)) {
			layer.msg('请输入有效的手机号码');
			return false;
		}
		/*if(!code){
			layer.msg('请输入验证码，不能为空');
			return false;
		}*/
        $.ajax({
            type: "GET",
            url: global + "/v1.0/circle/saveCrmUserBankcard",
            data: {
                "optuserid":optistId,
                "bankcardnumber":bankcardnumber,
                "bankname":bankname,
                "cardowner":cardowner,
                "phonenumber":phonenumber,
            },
            success:function(data){
                if(data.code==200){
                	window.location.href='/static/app/html/myBankcard.html';
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
			var phonenumber = $.trim($(".phonenumber").val());//手机号码 
			var isMobile=/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
			var jtel = $(".phonenumber");
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
				$(".getcode").text("请在" + curCount + "秒内输入验证码"); 
			} 
		} 
})
