$(function(){
	var optistId=getCookie("loginUserId");  //商家id
	 var isParent=getCookie('isParent');
    $(".pic").click(function(){
        window.location.href = '/static/app/html/index_shop.html?type=1';
    })
    $(".sort_list").click(function(){
        window.location.href = '/static/app/html/customerDetail_shop.html'
    })
	$.ajax({
		type:'get',
		url: global+ "/v1.0/merchantData/merchantCustomerDataList",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		async:false,
		data:{
			shopId:optistId,
			pageNum:1,
			pageSize:100,
		},
		success:function(data){
			var data = data.data.list;
			var str="";
			for(var i=0;i<data.length;i++){
				str+='<div class="sort_list" id='+data[i].id+'>'
			            +'<div class="num_logo">'
			                +'<img src="'+data[i].user_head+'" alt="">'
			                 /*+'<img src="/static/app/images/head03.png" alt="">'*/
			            +' </div>'
			            +' <div class="num_name">'+data[i].nickname+'</div>'
			        +' </div>'
			}
			$('.sort_box').append(str);
			$('.sort_list').click(function(){
				var ids = $(this).attr('id');
				window.location.href = '/static/app/html/customerDetail_shop.html?id='+ids+'';
			})
		}
	})
})
