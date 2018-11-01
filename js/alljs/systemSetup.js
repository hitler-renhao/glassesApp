$(function(){
	$('.back').click(function(){
		window.history.go(-1);
	});
	// 退出系统
     $('.logout').click(function(){
     	layer.confirm('确认退出登录吗？',{btn: ['确定', '取消'], title: "提示"},function(){
     		 $.ajax({
		 	 	type:'get',
		 	 	url:global+'/logout',
		 	 	success:function(data){
		 			clearCookie('loginUserId');
					clearCookie('optistnum');
					clearCookie('shopstatus');
					clearCookie('isParent');
					clearCookie('status');
					clearCookie('loginUserOptistname');
					clearCookie('isIdentOrShop');
					clearCookie('orderStatus');
					clearCookie('shopmobilename');
					clearCookie('shopname');
		 			window.location.href = '/static/app/html/login.html';
		 	 	}
		 	 })	
     	},function(){
     		layer.close();
     	})
	})
    
    //清除缓存
    function clearCookie(name) {  
	    setCookie(name, "", -1);  
	} 
})
