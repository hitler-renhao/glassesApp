$(function(){
	var optistId=getCookie("loginUserId");  //验光师id
    $(".pic").click(function(){
        window.location.href = '/static/app/html/index.html'
    })
    $(".sort_list").click(function(){
        window.location.href = '/static/app/html/customerDetail.html'
    })
	$.ajax({
		type:'get',
		url: global+ "/v1.0/merchant/employeeList",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		async:false,
		data:{
			shopId:optistId,
		},
		success:function(data){
			var data = data.data;
			var str="";
			for(var i=0;i<data.length;i++){
				str+='<div class="sort_list" id='+data[i].id+'>'
			            +'<div class="num_logo">'
			                +'<img src="'+data[i].user_head+'" alt="">'
			            +' </div>'
			            +' <div class="num_name">'+data[i].staffname+'</div>'
			        +' </div>'
			}
			$('.sort_box').append(str);
			$('.sort_list').click(function(){
				var ids = $(this).attr('id');
				window.location.href = '/static/app/html/teamInfo.html?id='+ids+'';
			})
		}
	})
})
