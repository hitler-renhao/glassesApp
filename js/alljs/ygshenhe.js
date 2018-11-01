$(function(){
	var optistidcard=getUrlParam('optistidcard');
	var optistname=getUrlParam('optistname');
	$('.pic').click(function(){
		window.history.go(-1);
	})
	$('.btn').click(function(){
		$.ajax({
			type:"get",
			url:"",
			async:true
		});
	})
})
