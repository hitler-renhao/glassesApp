$(function(){
	// var txt="http://test.bjysjglasses.com:8084/app/ysj/app"; //线上
	// var gotal='http://10.0.232.197:8989/login';  //吉涛
	var optistId=getCookie("loginUserId");
	console.log(optistId)
	$('#optUserId').val(optistId);
	  /* $.ajax({
	    	type:"get",
	    	url:gotal+"/v1.0/LoginRegister/getSessionUser",
	    	success:function(data){
	    		var data = data.data;
	    		  $('#optUserId').val('32');
	    	}
	    });*/
	 
	     //图片上传
		layui.use(['upload','form'], function(){
		    var form = layui.form;
	    	var $ = layui.jquery,
	        upload = layui.upload;
	        upload.render({
			    elem: '#upload',
			    url: global +'/v1.0/circle/uploadFiles',
			    multiple: true,
			    type:'file',
			    number: 5,
			    choose: function(obj){
			       var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
					if(Object.keys(files).length == 6){
						$("#upload").hide();
						$('.text').hide();
					}   

			        obj.preview(function(index, file, result){
			      	 var imgs='<li class="">'
								+'<img src="'+ result +'" alt="'+ file.name +'" class="layui-upload-img">'
							+'</li>'
			           $('.choiceImgs').prepend(imgs);
			        });
			      
			    },
			    done: function(res){
	                if(res.code = 200){
	                    return layer.msg('上传成功');
	                   
	                }
	            }
			});
			form.on('submit(btn)', function(data){
				//表单提交
				$.ajax({
					url:global +"/v1.0/circle/sendMessage",
					type:'post',
					data:data.field,
					datatype:'json',
					success:function(data){
						if(data.code==200){
							 layer.alert('提交成功',function(){
							 	window.history.go(-1);
							 	/*window.location.href="socialCircle.html";*/
							 });
						}
					}
				})
				return false;
			})
		})
})
