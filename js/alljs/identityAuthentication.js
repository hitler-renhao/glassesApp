$(function() {
  var firstpic = null;
  var secondpic = null;
  var thirdpic = null;
  layui.use(['form', 'upload'], function(data) {
    var form = layui.form,
        layedit = layui.layedit,
        upload = layui.upload;
    var optistId = getCookie("loginUserId");
    var optistnum = getCookie("optistnum");  //商家账号
   /* var value_attr4 = [];
    var value_str = '';*/
    $('.back').click(function() {
      window.history.go(-1);
    })
    $.ajax({
      type: 'post',
      url: global + "/v1.0/LoginRegister/getByOptistNum",
      data: {
        optId: optistId,
      },
      success: function(data) {
        var data = data.data;
        
        faces = data.image1;
        backs = data.image2;
        photos = data.image3;
				$('.formImg1').val(faces);
		    $('.formImg2').val(backs);
		    $('.formImg3').val(photos);
				if(faces == null || faces == '') {
					$('#faces').attr('src','/static/app/images/phone03.png');
				} else {
					$('#faces').prop('src',faces);
				}
				
				if(backs == null || backs == '') {

					$('#backs').attr('src','/static/app/images/photo04.png');
					
				} else {
					$('#backs').attr('src',backs);
					
				}
				
				if(photos == null || photos == '') {

					$('#photos').attr('src','/static/app/images/ygszj.png');
					
				} else {
					$('#photos').attr('src',photos);
					
				}
				
//      $('#faces').attr('src',faces);
//      $('#backs').attr('src',backs);
//      $('#photos').attr('src',photos);
        
       /* $('.optistname').val(data.optistname);
        $('.optistidcard').val(data.optistidcard);
        $('.optistidcardjob').val(data.jobname);*/
        $('.layui-upload-file').attr("capture","camera");
      }
    });

    //图片上传
    var uploadInst = upload.render({
      elem: '#faces',

      url: global + '/v1.0/LoginRegister/uploadImg',

      before: function(obj) {
        obj.preview(function(index, file, result) {
          $('#faces').attr('src', result);
        });
      },
      done: function(res) {
        if (res.code == 200) {
          firstpic = res.data;
          layer.msg('上传成功');
        }
      }
    });
    var uploadInst = upload.render({
      elem: '#backs',
      url: global + '/v1.0/LoginRegister/uploadImg',
      before: function(obj) {
        obj.preview(function(index, file, result) {
          $('#backs').attr('src', result);
        });
      },
      done: function(res) {
        if (res.code == 200) {
          secondpic = res.data;
          layer.msg('上传成功');
        }
      }
    });
    var uploadInst = upload.render({
      elem: '#photos',
      url: global + '/v1.0/LoginRegister/uploadImg',
      before: function(obj) {
        obj.preview(function(index, file, result) {
          $('#photos').attr('src', result);

        });
      },
      done: function(res) {
        if (res.code == 200) {
          thirdpic = res.data;
          layer.msg('上传成功');
        }
      }
    });
    $('.btn').click(function() {
      var formImg1 = $('.formImg1').val();
		  var formImg2 =$('.formImg2').val();
		  var formImg3 =$('.formImg3').val();
      firstpic = firstpic == null ? faces : firstpic;
      secondpic = secondpic == null ? backs : secondpic;
      thirdpic = thirdpic == null ? photos : thirdpic;
      
			if(!firstpic || !secondpic ||!thirdpic){
				layer.msg('请上传全部图片！');
				return false;
			}
     /* var optistname = $('.optistname').val();
      var optistidcard = $.trim($('.optistidcard').val());
      var optistidjob = $('.optistidcardjob').val();
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;*/
      /*if (!optistname) {
        layer.msg('请输入姓名，不能为空');
        return false;
      }
      if (!optistidcard) {
        layer.msg('请输入身份证号码，不能为空');
        return false;
      } else if (!reg.test(optistidcard)) {
        layer.msg('请输入有效的身份证号码');
        return false;
      }*/
      $.ajax({
        type: "post",
        url: global + "/v1.0/LoginRegister/updateIdentification",
        data: {
          'image1': firstpic[0],
          'image2': secondpic[0],
          'image3': thirdpic[0],
          'optistnum':optistnum,
          'id': optistId,
         /* optistidcard: optistidcard,
          optistname: optistname,
          jobname: optistidjob,*/
          status: 1,
        },
        success: function(data) {
          if (data.code == 200) {
            layer.msg('提交成功！');
           /* setCookie("status",1,1);*/
             window.location.href = "/static/app/html/audit.html?type=0";
          }
        }
      });
    })
  })
  
})