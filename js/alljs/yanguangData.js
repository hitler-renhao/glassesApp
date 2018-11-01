$(function(){
	var bespeakId=getUrlParam('id');
    $(".pic").click(function(){
    	window.history.go(-1);
    });
    $(".btn").click(function(){
       /* window.location.href =  "/static/app/html/ordersDetails.html"*/
         //点击保存 调接口
        var num=/^[A-Za-z0-9]+$/;
        var rp1RightQiujing = $('.rp1RightQiujing').val();
        var rp1LeftQiujing = $('.rp1LeftQiujing').val();
        var rp1RightZhujing = $('.rp1RightZhujing').val();
        var rp1LeftZhujing = $('.rp1LeftZhujing').val();
        var rp1RightZhouwei = $('.rp1RightZhouwei').val();
        var rp1LeftZhouwei = $('.rp1LeftZhouwei').val();
        var rp1RightTongju = $('.rp1RightTongju').val();
        var rp1LeftTongju = $('.rp1LeftTongju').val();
        var rp1RightTonggao = $('.rp1RightTonggao').val();
        var rp1LeftTonggao = $('.rp1LeftTonggao').val();
        var rp1RightJiaozhengshili = $('.rp1RightJiaozhengshili').val();
        var rp1LeftJiaozhengshili = $('.rp1LeftJiaozhengshili').val();
        var rp1Jiaozhengshili = $('.rp1Jiaozhengshili').val();
        var rp1LeftAdd = $('.rp1LeftAdd').val();
        if (!rp1RightQiujing) {
            layer.msg("右球镜不能为空");
            return false;
        }else if (!num.test(rp1RightQiujing)) {
            layer.msg("右球镜只能输入数字及字母");
            return false;
        };
        if (!rp1LeftQiujing) {
            layer.msg("左球镜不能为空");
            return false;
        }else if (!num.test(rp1LeftQiujing)) {
            layer.msg("左球镜只能输入数字及字母");
            return false;
        };
        if (!rp1RightZhujing) {
            layer.msg("右柱镜不能为空");
            return false;
        }else if (!num.test(rp1RightZhujing)) {
            layer.msg("右柱镜只能输入数字及字母");
            return false;
        };
        if (!rp1LeftZhujing) {
            layer.msg("左柱镜不能为空");
            return false;
        }else if (!num.test(rp1LeftZhujing)) {
            layer.msg("左柱镜只能输入数字及字母");
            return false;
        };
        if (!rp1RightZhouwei) {
            layer.msg("右轴位不能为空");
            return false;
        }else if (!num.test(rp1RightZhouwei)) {
            layer.msg("右轴位只能输入数字及字母");
            return false;
        };
        if (!rp1LeftZhouwei) {
            layer.msg("左轴位不能为空");
            return false;
        }else if (!num.test(rp1LeftZhouwei)) {
            layer.msg("左轴位只能输入数字及字母");
            return false;
        };
        if (!rp1RightTongju) {
            layer.msg("右瞳距不能为空");
            return false;
        }else if (!num.test(rp1RightTongju)) {
            layer.msg("右瞳距只能输入数字及字母");
            return false;
        };
        if (!rp1LeftTongju) {
            layer.msg("左瞳距不能为空");
            return false;
        }else if (!num.test(rp1LeftTongju)) {
            layer.msg("左瞳距只能输入数字及字母");
            return false;
        };
        if (!rp1RightTonggao) {
            layer.msg("右瞳高不能为空");
            return false;
        }else if (!num.test(rp1RightTonggao)) {
            layer.msg("右瞳高只能输入数字及字母");
            return false;
        };
        if (!rp1LeftTonggao) {
            layer.msg("左瞳高不能为空");
            return false;
        }else if (!num.test(rp1LeftTonggao)) {
            layer.msg("左瞳高只能输入数字及字母");
            return false;
        };
        if (!rp1RightJiaozhengshili) {
            layer.msg("右眼矫正视力不能为空");
            return false;
        }else if (!num.test(rp1RightJiaozhengshili)) {
            layer.msg("右眼矫正视力只能输入数字及字母");
            return false;
        };
        if (!rp1LeftJiaozhengshili) {
            layer.msg("左眼矫正视力不能为空");
            return false;
        }else if (!num.test(rp1LeftJiaozhengshili)) {
            layer.msg("左眼矫正视力只能输入数字及字母");
            return false;
        };
        if (!rp1Jiaozhengshili) {
            layer.msg("双眼矫正视力不能为空");
            return false;
        }else if (!num.test(rp1Jiaozhengshili)) {
            layer.msg("双眼矫正视力只能输入数字及字母");
            return false;
        };
        if (!rp1LeftAdd) {
            layer.msg("ADD不能为空");
            return false;
        }else if (!num.test(rp1LeftAdd)) {
            layer.msg("ADD只能输入数字及字母");
            return false;
        };
	    $.ajax({
	        type:"POST",
	        url: global + "/v1.0/order/saveOptometryData",
	        data: {
	            "bespeakid":bespeakId,
	            "rp1RightQiujing":rp1RightQiujing,
	            "rp1LeftQiujing":rp1LeftQiujing,
	            "rp1RightZhujing":rp1RightZhujing,
	            "rp1LeftZhujing":rp1LeftZhujing,
	            "rp1RightZhouwei":rp1RightZhouwei,
	            "rp1LeftZhouwei":rp1LeftZhouwei,
	            "rp1RightTongju":rp1RightTongju,
	            "rp1LeftTongju":rp1LeftTongju,
	            "rp1RightTonggao":rp1RightTonggao,
	            "rp1LeftTonggao":rp1LeftTonggao,
	            "rp1RightJiaozhengshili":rp1RightJiaozhengshili,
	            "rp1LeftJiaozhengshili":rp1LeftJiaozhengshili,
	            "rp1Jiaozhengshili":rp1Jiaozhengshili,
	            "rp1LeftAdd":rp1LeftAdd,
	        },
	        success:function(datas) {
	           if(datas.code==200){
	           	  layer.msg('保存成功');
	           	  window.location.href =  "/static/app/html/receivedorderDetails.html?id="+bespeakId+"";
	           }
	        }
	    })
    })
   
})