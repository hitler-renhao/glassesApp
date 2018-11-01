$(function(){
	 var optistId=getCookie("loginUserId");
     var shopnum = getCookie("optistnum");
     var isParents= getCookie("isParent");
      var status=getCookie("shopstatus");
      layui.use(['form','upload'],function(data){
		var form = layui.form,
        layedit = layui.layedit;
        upload = layui.upload;
        var uploadInst = upload.render({
		    elem: '#touxiang',
		    url:global +'/v1.0/LoginRegister/uploadImg',
		    before: function(obj){
		      obj.preview(function(index, file, result){
		        $('#touxiang').attr('src', result); 
		      });
		    },
		    done: function(res){
		      if(res.code ==200){
		      	$('.heads').val(res.data[0]);
		        layer.msg('上传成功');
		      }
		    }
		});	
    })
     $('.pic').click(function(){
     	window.history.go(-1);
     })
     $('.headCold').click(function(){
     	var isParent=$(this).attr('data-isParent');
     	window.location.href = '/static/app/html/serialNumber.html?isParent=' + isParent;
     })
     $('.branchCold').click(function(){
     	var isParent=$(this).attr('data-isParent');
     	var tel = $(".tel").val();
     	window.location.href = '/static/app/html/series_number.html?isParent=' + isParent;
     })
   //地址信息
    getaddress();
    function getaddress(){
    	var area2 = new LArea();
			area2.init({
				'trigger': '.address',
				'valueTo': '#value',
				'keys': {
					id: 'value',
					name: 'text'
				},
				'type': 2,
				'data': [provs_data, citys_data, dists_data]
			});
	    }
    //今日收入跟订单
    getDayMoney();
    function getDayMoney(){
    	$.ajax({
    		type:"post",
    		url:global+"/v1.0/order/queryTodayIncomeAndMonthOrders",
    		async:true,
    		data:{
    			shopId:optistId
    		},
    		success:function(data){
    			var data = data.data;
    			$('.todayMoney').text(data.todayIncome);
    			$('.monthOrder').text(data.monthOrders);
    		}
    	});
    }
     $(".jianjie").click(function(){
    	$('.jjbox').slideDown('400');
    	$('.jjbox textarea').keyup(function(){ 
            //输入字符后键盘up时触发事件
            var txtLeng = $(' .jjbox textarea ').val().length; //把输入字符的长度赋给txtLeng
            //拿输入的值做判断
            if( txtLeng>500 ){  
                //输入长度大于500时span显示0
                $(' .jjbox p span ').text(' 0 '); 
                //截取输入内容的前500个字符，赋给fontsize
                var fontsize = $('.jjbox textarea').val().substring(0,500);
                //显示到textarea上
                $(' .jjbox textarea ').val( fontsize );
            }else{
                //输入长度小于500时span显示500减去长度
                $('.jjbox p span').text(500-txtLeng);  
            }
        });
    })
     $('.btnjj').click(function(){
    	var gettext=$('.jjbox textarea').val();
    	$('#jjs').text(gettext);
    	$('.jjbox').slideUp('400');
    })
    $.ajax({
        type:"POST",
        url: global + "/v1.0/LoginRegister/getShopByShopNum",
        data:{
            "shopNum": shopnum
        },
        success:function(data){
            var res = data.data;
            $("input[name='shopCold'][data-isParent='"+isParents+"']").prop("checked", "checked").parent().siblings().find('input').prop('disabled',true);
            $("#charge option[value='"+res.chargestandard+"']").prop("selected","selected");
            $('.names').text(res.shopmobilename);
            $('.shopName').val(res.shopname);
            $('.managername').val(res.shopmobilename);
            $('.tel').val(shopnum);
            $('#jjs').text(res.summary);
            $('.jjbox textarea').val(res.summary);
            $('.shopidcard').val(res.shopidcard);
            $('.shopmobile2').val(res.shopmobile2);
            $('.shopemail').val(res.shopemail);
            $('.heads').val(res.picture);
            var shopaddress = res.shopaddress.split('-');
       		var address_detail = shopaddress[1];
        	var address = shopaddress[0];  
            $('.address').val(address);
            $('.address_detail').val(address_detail);
            faces=res.picture;
            if(faces == null || faces == '') {
				$('#touxiang').attr('src','/static/app/images/sethead.png');
			} else {
				$('#touxiang').prop('src',faces);
			}
        }
    })
    $(".btn").click(function(){
        var shopname = $(".shopName").val()
        var tel = $(".tel").val();
        var managername=$('.managername').val();
        var address = $(".address").val();
        var chargestandard = $("#charge option:selected").text();
        var summary = $("#jjs").text();
        var shopidcard=$('.shopidcard').val();
        var shopmobile2=$('.shopmobile2').val();
        var isMobile=/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; //手机号码
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证号码
        var mails=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/; //邮箱
        var username = /^[\u4E00-\u9FA5A-Za-z]+$/;   //姓名
        var shopemail=$('.shopemail').val();
        var address_detail = $('.address_detail').val();
        var addressDetail=address+"-"+address_detail;
        var picture=$('.heads').val();
        if(!shopname){
			layer.msg('请输入商家姓名，不能为空');
			return false;
		}else if(!username.test(shopname)){
			layer.msg('商家姓名只能输入中文和英文');
			return false;
		}
         if(!managername){
			layer.msg('请输入店长姓名，不能为空');
			return false;
		}else if(!username.test(managername)){
			layer.msg('店长姓名只能输入中文和英文');
			return false;
		}
		if(!tel){
			layer.msg('请输入联系方式，不能为空');
			return false;
		}else if(!isMobile.test(tel)){
			layer.msg('请输入正确的联系方式');
			return false;
		}
		if(!shopidcard){
				layer.msg('请输入身份证号码，不能为空');
				return false;
			}else if(!reg.test(shopidcard)){
				layer.msg('请输入正确的身份证号码');
				return false;
			}
		if(!address){
			layer.msg('请输入商家地址，不能为空');
			return false;
		};
		if(!address_detail){
			layer.msg('请输入商家详细地址，不能为空');
			return false;
		}
		if(!shopmobile2){
			layer.msg('请输入备用联系方式，不能为空');
			return false;
		}else if(!isMobile.test(shopmobile2)){
			layer.msg('请输入正确的联系方式');
			return false;
		}
		if(!shopemail){
			layer.msg('请输入邮箱，不能为空');
			return false;
		}else if(!mails.test(shopemail)){
			layer.msg('请输入正确的联系方式邮箱');
			return false;
		}
		if(chargestandard=='请选择'){
			layer.msg('请选择收费标准');
			return false;
		}
		if(!summary){
			layer.msg('请输入商家简介，不能为空');
			return false;
		}
		var isParent=$("input[name='shopCold']:checked").attr('data-isParent');
        $.ajax({
            type:"POST",
            url: global + "/v1.0/LoginRegister/shopUpdateCrmShop",
            data:{
                "id":optistId,
                "shopname": shopname,
                "shopnum":shopnum,
                "shopmobilename":managername,
                "shopmobile1":tel,
                "shopmobile2":shopmobile2,
                "shopaddress":addressDetail,
                "shopemail":shopemail,
                "chargestandard":chargestandard,
                "summary":summary,
                "picture":picture,
                "status":status,
                "isparent":isParent,
                "shopidcard":shopidcard,
                
            },
            success:function(data){
                setCookie("shopname",shopname,1);
               // setCookie("isParent",isParent,1);
                setCookie("shopmobilename",managername,1);
                
                window.location.href = "/static/app/html/index_shop.html?type=1";
            }
        })
    })
    /* if(status==3){
    	$('.btn button').text('编辑');
    }*/
})
