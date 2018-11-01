$(function(){
	var optistId = getCookie("loginUserId");
	var bespeakId= getUrlParam('id');
	/*$(".save").click(function() {
		var str="";
		if($('.objection-text').val()!=''){
			str+='<li>'+$('.objection-text').val()+'<img src="/static/app/images/delete.png"></li>' 
			$('.objection').append(str);
			$('.success').fadeIn(1000).fadeOut(500).hide(0);
		}
		
	})*/
	$('.objection li img').bind('click',function(){
		$(this).parent().remove();
	})
	var lis= $('.objection li');
	for(i=0;i<lis.length;i++){
        lis[i].onclick = function(){
            $('.objection-text').val($(this).text());
        }
    }
	$('.btn').click(function(){
		$('#modal').show();
		$('.yes').click(function(){
			var reason = $('.objection-text').val();
			$.ajax({
				type:"post",
				url:global+'/v1.0/order/rejectBespeakOrder',
				data:{
	                "identificationId":optistId,
	                "bespeakId":bespeakId,
	                "reason":reason,  // 拒单原因
	            },
	            success:function(data){
	            	if(data.code==200){
	            		 window.location.href = "/static/app/html/index.html";
	            	}
	            }
			});
		})
		$('.no').click(function(){
			$('#modal').hide();
		})
		
	})
	function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); return null; 
     }
})
