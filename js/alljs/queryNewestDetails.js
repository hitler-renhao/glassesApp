$(function(){
	var id=getUrlParam('id');
	var optistnum=getCookie('optistnum');
	$('.back').click(function(){
		window.history.go(-1);
	})
	$.ajax({
		type:'get',
		url:global+"/v1.0/message/queryNewestMessageDetails",
		data:{
			id:id,
		},
		success:function(data){
			var data = data.data;
			if(data.createDate!=null){
				var times = data.createDate
			}else{
				var times = data.updateDate
			}
			 
			var str="";
			$('.con h5').text(data.title);
			$('.con h4').append("<span>"+times+"</span>");
			$('.con p').text(data.content);
		}
	})
})
