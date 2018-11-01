$(function(){
	$('.back').click(function(){
		window.history.go(-1);
	})
	$('.user-arrow').click(function(){
		 if($(this).hasClass("rotate")){ 
		 	$(this).removeClass("rotate");
		 	$(this).addClass("rotate1");
		 	$('.listDetail').css('height','auto')
		}else{
			$(this).removeClass("rotate1"); 
			$(this).addClass("rotate");
			$('.listDetail').css('height','3.6rem')
		}
	})
	
})
