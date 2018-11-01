$(function(){
	 var shopNum=getCookie("optistnum");
	 $('.pic').click(function(){
	 	window.location.href = '/static/app/html/index_shop.html';
	 })
	$.ajax({
		type:'post',
		url:global+"/v1.0/LoginRegister/shopInvitationCode",
		data:{
			shopNum:shopNum
		},
		success:function(data){
			var data = data.data.invitationCodeList;
			var str="";
			for(var i=0;i<data.length;i++){
				if(data[i].isValid==1){
					str+="<li data-id="+data[i].isValid+">"
		        		+"<span class='left yjsy' >"
		        			+"<p>序列号:<i>"+data[i].invCode+"</i></p>"
		        			+"<p>您已将此序列号发送给了店铺</p>"
		        			+"<p>双创共赢  收益看得见</p>"
		        		+"</span>"
		        		+"<span class='right yjsys'>"
		        			+"<p>已经使用</p>"
		        		+"</span>"
		        	+"</li>"
				}else if(data[i].isValid==0){
					str+="<li data-id="+data[i].isValid+">"
		        		+"<span class='left' >"
		        			+"<p>序列号:<i>"+data[i].invCode+"</i></p>"
		        			+"<p>发送序列号给想合作的店铺</p>"
		        			+"<p>双创共赢  收益看得见</p>"
		        		+"</span>"
		        		+"<span class='right'>"
		        			+"<p>立即使用</p>"
		        		+"</span>"
		        	+"</li>"
				}
				
			}
			$('.box').append(str);
		}
	})
})
