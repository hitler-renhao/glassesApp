$(function(){
	var optistId=getCookie("loginUserId");
	var optistnum=getCookie("optistnum");
	var imgList=[];
	var aa;
	$('#optistNum').val(optistnum);
	 
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
			       /*var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
					if(Object.keys(files).length == 6){
						$("#upload").hide();
						$('.text').hide();
					}  */ 
					//console.log(files)
			        obj.preview(function(index, file, result){
			      	 var imgs='<li class="">'
								+'<img src="'+ result +'" alt="'+ file.name +'" class="layui-upload-img">'
							+'</li>'
			           $('.choiceImgs').prepend(imgs);
			        });
			      
			    },
			    done: function(res){
	                if(res.code = 200){
	                	
	                	imgList.push(res.data[0]);
	                	aa=imgList.join();
	                    layer.msg('上传成功');
	                    if($('.choiceImgs li').length==7){
	                    	$("#upload").hide();
							$('.text').hide();
	                    }
	                   
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
							 	window.location.href="/static/app/html/messagePush.html";
							 });
						}
					}
				})
				return false;
			})
		})
		
})
