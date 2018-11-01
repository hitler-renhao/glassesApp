$(function(){
	var idCardTop = '';
	var idCardBottom = '';
	var shopCardTop = '';
	var shopCardBottom = '';
	var trading1 = '';
	var stores1 = '';
	var cardz1 = '';
	var cardf1 = '';
	layui.use(['form','upload'],function(data){
		var form = layui.form,
        layedit = layui.layedit;
        upload = layui.upload;
	    var shopnum = getCookie("optistnum");  //商家账号
	    var optistId=getCookie("loginUserId");
	    var shopType=getUrlParam('type');
	    $('.back').click(function(){
			window.history.go(-1);
		})
	    $.ajax({
	    	type:'post',
	    	url:global+"/v1.0/LoginRegister/getShopByShopNum",
	    	data:{
	    		shopNum:shopnum,
	    	},
	    	success:function(data){
					var data =data.data;
//					console.log(data);
//					if(data.shopcardphoto!=null){
//						
//					}
					trading1 = data.shopcardphoto==null ? null : data.shopcardphoto.split(',')[0];
					stores1 = data.shopcardphoto==null ? null : data.shopcardphoto.split(',')[1];
					cardz1 = data.shopidcardphoto==null ? null : data.shopidcardphoto.split(',')[0];
					cardf1 = data.shopidcardphoto==null ? null : data.shopidcardphoto.split(',')[1];
					
					//回显图片放入隐藏域，后面上传判断
					$('.cardz').val(cardz1);
					$('.cardf').val(cardf1);
					$('.trading').val(trading1);
					$('.stores').val(stores1);
				
	    		/*$('.shopmobilename').val(data.shopmobilename);
	    		$('.shopidcard').val(data.shopidcard);
	    		$('.shopname').val(data.shopname);
	    		$('.shopmobile1').val(data.shopmobile1);
	    		$('.shopmobile2').val(data.shopmobile2);
	    		$('.shopemail').val(data.shopemail);
	    		$('.shopaddress').val(data.shopaddress);*/
	    		// $('#stores').attr('src',data.shopshowimage);
	    		if(trading1 == '' || trading1 == null) {
	    			$('#trading').attr('src','/static/app/images/phone01.png');
	    		}else{
					$('#trading').attr('src',trading1);
	    		}
	    		if(stores1 == '' || stores1 == null) {
	    			$('#stores').attr('src','/static/app/images/phone02.png');
	    		}else{
	    			$('#stores').attr('src',stores1);
	    		}
	    		if(cardz1 == '' || cardz1 == null) {
	    			$('#cardz').attr('src','/static/app/images/phone03.png');
				}else{
					$('#cardz').attr('src',cardz1);
	    		}
	    		if(cardf1 == '' || cardf1 == null) {
	    			$('#cardf').prop('src','/static/app/images/photo04.png');
				}else{
					$('#cardf').attr('src',cardf1);
	    		}

					
	    	}
	    })
	    //图片上传
	     var uploadInst = upload.render({
		    elem: '#cardz',
		    url:global +'/v1.0/LoginRegister/uploadImg',
		    before: function(obj){
		      obj.preview(function(index, file, result){
		      		$('#cardz').attr('src', result); 
		      });
		    },
		    done: function(res){
		      if(res.code ==200){
				idCardTop = res.data[0];
		      	$('.cardz').val(res.data[0]);
		        layer.msg('上传成功');
		      }
		    }
		});	
	    var uploadInst = upload.render({
		    elem: '#cardf',
		    url:global +'/v1.0/LoginRegister/uploadImg',
		    before: function(obj){
		      obj.preview(function(index, file, result){
		        $('#cardf').attr('src', result); 
		       
		      });
		    },
		    done: function(res){
		      if(res.code ==200){
				idCardBottom = res.data[0];
		      	$('.cardf').val(res.data[0]);
		        layer.msg('上传成功');
		      }
		    }
		});	
		var uploadInst = upload.render({
		    elem: '#trading',
		    url:global +'/v1.0/LoginRegister/uploadImg',
		    before: function(obj){
		      obj.preview(function(index, file, result){
		        $('#trading').attr('src', result); 
		      });
		    },
		    done: function(res){
		      if(res.code ==200){
				shopCardTop = res.data[0];
		      	$('.trading').val(res.data[0]);
		        layer.msg('上传成功');
		      }
		    }
		});	
		
		var uploadInst = upload.render({
		    elem: '#stores',
		    url:global +'/v1.0/LoginRegister/uploadImg',
		    before: function(obj){
		      obj.preview(function(index, file, result){
		        $('#stores').attr('src', result); 
		      });
		    },
		    done: function(res){
		      if(res.code ==200){
				shopCardBottom = res.data[0];
		      	$('.stores').val(res.data[0]);
		        layer.msg('上传成功');
		      }
		    }
		});	
		
		// 拼接图片地址
//			var idCard = (idCardTop == '' ?  cardz1 : idCardTop) + ',' 
//								 + (idCardBottom == '' ? cardf1 : idCardBottom);
//			var shopCard = (shopCardTop == '' ? trading1 : shopCardTop) + ',' 
//								 + (shopCardBottom == '' ? stores1 : shopCardBottom);

		
	    $('.btn').click(function(){
	    	
	    	var card1 = $('.cardz').val();
			var card2 = $('.cardf').val();
			var card3 = $('.trading').val();
			var card4 = $('.stores').val();
	    	// 拼接图片地址
			var idCard = (idCardTop == '' ?  cardz1 : idCardTop) + ',' 
								 + (idCardBottom == '' ? cardf1 : idCardBottom);
			var shopCard = (shopCardTop == '' ? trading1 : shopCardTop) + ',' 
								 + (shopCardBottom == '' ? stores1 : shopCardBottom);
								 
								 
	    	if(!card1 || !card2 || !card3|| !card4 ) {
	    		layer.msg('请您上传全部图片！');
	    		return false;
	    	}

          /*  var cardz=$('.cardz').val();
            var cardf=$('.cardf').val();*/
            // var trading=$('.trading').val();
            // var stores=$('.stores').val();
            // value_attr.push(cardz,cardf);
            //value_attr.push(cardf);
            // value_str = value_attr.join(",");   //图片
            // console.log(value_str)
	    	/*var shopmobilename=$('.shopmobilename').val();
	    	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
	    	var isMobile=/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	    	var mails=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    		var shopidcard=$('.shopidcard').val();
    		var shopname=$('.shopname').val();
    		var shopmobile1=$('.shopmobile1').val();
    		var shopmobile2=$('.shopmobile2').val();
    		var shopemail=$('.shopemail').val();
    		var shopaddress=$('.shopaddress').val();*/
    		/*if(!shopmobilename){
				layer.msg('请输入姓名，不能为空');
				return false;
			}
    		if(!shopidcard){
				layer.msg('请输入身份证号码，不能为空');
				return false;
			}else if(!reg.test(shopidcard)){
				layer.msg('请输入正确的身份证号码');
				return false;
			}
			if(!shopname){
				layer.msg('请输入姓名商家名称，不能为空');
				return false;
			}
			if(!shopaddress){
				layer.msg('请输入姓名商家地址，不能为空');
				return false;
			}
			if(!shopmobile1){
				layer.msg('请输入联系方式，不能为空');
				return false;
			}else if(!isMobile.test(shopmobile1)){
				layer.msg('请输入正确的联系方式');
				return false;
			}
			if(!shopemail){
				layer.msg('请输入邮箱，不能为空');
				return false;
			}else if(!mails.test(shopemail)){
				layer.msg('请输入正确的联系方式邮箱');
				return false;
			}*/
			
    		$.ajax({
    			type:"post",
    			url:global+"/v1.0/LoginRegister/shopUpdateCrmShop",
    			data:{
					// 店铺及身份证图片
					shopcardphoto:shopCard,
					shopidcardphoto: idCard,
    				id:optistId,
    				shopnum:shopnum,
    			/*	shopmobilename:shopmobilename,
    				shopidcard:shopidcard,
    				shopname:shopname,
    				shopmobile1:shopmobile1,
    				shopmobile2:shopmobile2,
    				shopemail:shopemail,
    				shopaddress:shopaddress,*/
    				status:1,
    				// shopcardphoto:trading,
    				// shopshowimage:stores,
    				// shopidcardphoto:value_str
    				
    			},
    			success:function(data){
    				if(data.code==200){
    					/*setCookie("shopstatus",1,1);*/
						window.location.href = '/static/app/html/shopAudit.html?type=1';
    				}
    			}
    		});
	    })
    })
})
