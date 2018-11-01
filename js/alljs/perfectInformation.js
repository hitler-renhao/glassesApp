$(function(){
    var optistId=getCookie("loginUserId");
    var optId = getCookie("loginUserOptistname");
    var status=getCookie("status");
    var optistnum = getCookie("optistnum");  //商家账号
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
    			identificationId:optistId
    		},
    		success:function(data){
    			var data = data.data;
    			$('.todayMoney').text(data.todayIncome);
    			$('.monthOrder').text(data.monthOrders);
    		}
    	});
    }
    $(".shanchang").click(function(){
    	$('.scbox').slideDown('400');
    	$('.scbox textarea').keyup(function(){ 
            //输入字符后键盘up时触发事件
            var txtLeng = $(' .scbox textarea ').val().length; //把输入字符的长度赋给txtLeng
            //拿输入的值做判断
            if( txtLeng>500 ){  
                //输入长度大于500时span显示0
                $(' .scbox p span ').text(' 0 '); 
                //截取输入内容的前500个字符，赋给fontsize
                var fontsize = $('.scbox textarea').val().substring(0,500);
                //显示到textarea上
                $(' .scbox textarea ').val( fontsize );
            }else{
                //输入长度小于500时span显示500减去长度
                $('.scbox p span').text(500-txtLeng);  
            }
        });
    });
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
    $('.btnsc').click(function(){
    	var gettext=$('.scbox textarea').val();
    	$('#begoodat').text(gettext);
    	$('.scbox').slideUp('400');
    });
    $('.btnjj').click(function(){
    	var gettext=$('.jjbox textarea').val();
    	$('#jjs').text(gettext);
    	$('.jjbox').slideUp('400');
    })
    $.ajax({
        type:"POST",
        url: global + "/v1.0/LoginRegister/getByOptistNum",
        data:{
            "optId": optistId
        },
        success:function(data){
            var res = data.data;
            if(res.optistname==null||res.optistname==''){
            	 $('.names').text('您的姓名');
            }else{
            	 $('.names').text(res.optistname);
            }
            $('.Username').val(res.optistname);
            $('.tel').val(res.optistmobile);
            if(res.optistsex=='0'){
            	var sex='男';
            }else if(res.optistsex=='1'){
            	var sex='女';
            }
            $(".spans option[value='"+sex+"']").prop("selected","selected");
            $("#charge option[value='"+res.chargestandard+"']").prop("selected","selected");
            var shopaddress = res.address.split('-');
       		var address_detail = shopaddress[1];
        	var address = shopaddress[0];  
            $('.address').val(address);
            $('.address_detail').val(address_detail);
            $('#begoodat').text(res.begoodat);
            $('#jjs').text(res.summary);
            $('.optistidcard').val(res.optistidcard);
            $('.optistidcardjob').val(res.jobname);
            $('.scbox textarea').val(res.begoodat);
            $('.jjbox textarea').val(res.summary);
            $('.heads').val(res.picture);
            faces=res.picture;
            if(faces == null || faces == '') {
				$('#touxiang').attr('src','/static/app/images/sethead.png');
			} else {
				$('#touxiang').prop('src',faces);
			}
        }
    })
    $(".btn button").click(function(){
        var optistname = $(".Username").val()
        var sex = $(".spans option:selected").text();
        if(sex=='男'){
        	var optistsex=0;
        }else if(sex=='女'){
        	var optistsex=1;
        }
        var tel = $(".tel").val();
        var address = $(".address").val();
        var chargestandard = $("#charge option:selected").text();
        var summary = $("#jjs").text();
        var begoodat = $("#begoodat").text();
	    var optistidcard = $.trim($('.optistidcard').val());
	    var optistidjob = $('.optistidcardjob').val();
	    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	    var username = /^[\u4E00-\u9FA5A-Za-z]+$/;
	    var address_detail = $('.address_detail').val();
        var addressDetail=address+"-"+address_detail;
        var picture=$('.heads').val();
	    if (!optistname) {
	        layer.msg('请输入姓名，不能为空');
	        return false;
	    }else if (!username.test(optistname)) {
	        layer.msg('姓名只能输入中文和英文');
	        return false;
	    }
	    if (!optistidcard) {
	        layer.msg('请输入身份证号码，不能为空');
	        return false;
	    } else if (!reg.test(optistidcard)) {
	        layer.msg('请输入有效的身份证号码');
	        return false;
	    }
	   /* if (!optistidjob) {
	        layer.msg('请输入职位，不能为空');
	        return false;
	    }*/
	    if (!address) {
	        layer.msg('请选择地址，不能为空');
	        return false;
	    }
	    if(!address_detail){
			layer.msg('请输入商家详细地址，不能为空');
			return false;
		}
	    if(chargestandard=='请选择'){
			layer.msg('请选择收费标准');
			return false;
		}
	    if (!begoodat) {
	        layer.msg('请输入您所擅长的，不能为空');
	        return false;
	    }
	    if (!summary) {
	        layer.msg('请选择您的简介，不能为空');
	        return false;
	    }
        $.ajax({
            type:"POST",
            url: global + "/v1.0/LoginRegister/updateIdentification",
            data:{
                "id":optistId,
                "optistnum": optistnum,
                "optistname":optistname,
                "optistmobile":tel,
                "chargestandard":chargestandard,
                "optistsex":optistsex,
                "optistidcard": optistidcard,
                "begoodat":begoodat,
                "picture":picture,
                "summary":summary,
                "address":addressDetail,
                "status":status
//              "jobname": optistidjob
            },
            success:function(data){
            	if(data.code==200){
	                setCookie("loginUserOptistname",optistname,1);
	                window.location.href = "/static/app/html/index.html";
               }
            }
        })
    })
   /* if(status==3){
    	$('.btn button').text('编辑');
    }*/
})