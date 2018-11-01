$(function(){
	$('.no').click(function(){
		window.history.go(-1);
	});
	$('.perfect').click(function(){
		window.location.href = "/static/app/html/shopInformation.html";
	})
})
