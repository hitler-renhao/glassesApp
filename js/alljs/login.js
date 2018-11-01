$(function(){
	clearCookie('loginUserId');
	clearCookie('optistnum');
	clearCookie('shopstatus');
	clearCookie('isParent');
	clearCookie('status');
	clearCookie('loginUserOptistname');
	clearCookie('isIdentOrShop');
	clearCookie('orderStatus');
	clearCookie('shopmobilename');
	clearCookie('shopname');
	var identiType=getCookie('isIdentOrShop');
	$('.registerOnce').click(function(){
		window.location.href = '/static/app/html/choiceIdentity.html';
	})
    $(".forget").click(function(){
		window.location.href = '/static/app/html/forgetPassword.html';
	})
    $(".btn").click(function(){
        var tel = $.trim($("#tel").val());
        var psd = $('#psd').val();
        var pattern = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (!tel) {
            layer.msg("请输入手机号");
            return false;
        }else if (!pattern.test(tel)) {
            layer.msg("请输入正确的手机号");
            return false;
        };
        if(!psd){
        	layer.msg("请输入密码");
            return false;
        }
        $.ajax({
        	type:'POST',
            url:  global + '/v1.0/LoginRegister/isIdentOrShop',
            data: {
                "userName": tel,
            },
            success:function(data){
            	var datas = data.data;
            	if(data.code==200){
	            	setCookie("isIdentOrShop",datas.type,1);
	            	if(datas.type==0){
	            		$.ajax({
				            type:'POST',
				            url:  global + '/v1.0/LoginRegister/ajaxLogin',
				            data: {
				                "username": tel,
				                "password": psd,
				            },
				            success:function(data){
				                var loginObj;
				                if(data.code == 200) {
				                    loginObj = data.data;
				                    if(loginObj.status == 4){
				                     	layer.alert('证件审核未通过，请重新注册！',function(){
				                     		window.location.href = '/static/app/html/register.html';
				                     	});
				                    }else if(loginObj.image1==null||loginObj.image1==''){
				                    	setCookie("loginUserId",loginObj.id,1);
				                    	setCookie("optistnum",loginObj.optistnum,1);
				                    	window.location.href = '/static/app/html/identityAuthentication.html';
				                    }else if(loginObj.optistname==null||loginObj.optistname==''){
				                    	setCookie("loginUserId",loginObj.id,1);
				                    	setCookie("optistnum",loginObj.optistnum,1);
				                    	window.location.href = '/static/app/html/audit.html';
				                    }else{
										setCookie("loginUserId",loginObj.id,1);
				                        setCookie("loginUserOptistname",loginObj.optistname,1);
				                        setCookie("appLoginUser",loginObj.appLoginUser,1);
				                        setCookie("optistnum",loginObj.optistnum,1);
				                        setCookie("status",loginObj.status,1);
				                        setCookie("orderStatus",1,1); //0抢单  1预约单
				                        window.location.href = '/static/app/html/index.html';
			                        }
				                }else if(data.code == 400){
				                    layer.msg(data.msg);
				                    return false;
				                }
				            }
				        })
	            	}else if(datas.type==1){
	            		$.ajax({
				            type:'POST',
				            url:  global + '/v1.0/LoginRegister/shopLogin',
				            data: {
				                "username": tel,
				                "password": psd,
				            },
				            success:function(data){
				                var loginObj;
				                if(data.code == 200) {
				                    loginObj = data.data;
				                    setCookie("shopstatus",loginObj.status,1);
				                    if(loginObj.status == 4){
				                        layer.alert('证件审核未通过，请重新注册！',function(){
				                     		window.location.href = '/static/app/html/register.html';
				                     	});
				                    }else if(loginObj.shopcardphoto==null||loginObj.shopcardphoto==''){
				                    	setCookie("loginUserId",loginObj.id,1);
				                    	setCookie("optistnum",loginObj.shopnum,1);
				                    	window.location.href = '/static/app/html/businessAudit.html';
				                    }else if(loginObj.shopmobilename==null||loginObj.shopmobilename==''){
				                    	setCookie("loginUserId",loginObj.id,1);
				                    	setCookie("optistnum",loginObj.shopnum,1);
				                    	window.location.href = '/static/app/html/shopAudit.html';
				                    }else{
				                    	
				                     	 setCookie("loginUserId",loginObj.id,1);
					                     setCookie("optistnum",loginObj.shopnum,1);
					                     setCookie("shopmobilename",loginObj.shopmobilename,1);
					                     setCookie("isParent",loginObj.isparent,1);
					                     window.location.href = '/static/app/html/index_shop.html';
				                    }
				                     
				                }else if(data.code == 400){
				                    layer.msg(data.msg);
				                    return false;
				                }
				            }
				        })
	            	}
            	}else{
            		layer.msg(data.msg);
            		return false;
            	}
            }
        })
       
    })
    //清除缓存
    function clearCookie(name) {  
	    setCookie(name, "", -1);  
	} 
})