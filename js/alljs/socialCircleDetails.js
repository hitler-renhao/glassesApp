$(function() {
	var $cid=getUrlParam('cid');
	var created=getUrlParam('created');
	var optistnum=getCookie("optistnum");    //账号
	var isIdentOrShop = getCookie('isIdentOrShop'); //验光师   商家
	var optistId=getCookie("loginUserId");    //用户ID
	$('.back').click(function(){
		window.history.go(-1);
	})
	//社圈详情
	Social();
	function Social(){
	    $.ajax({
	        type:'GET',
	        url: global + "/v1.0/circle/queryBolgBody",
	        data:{
	            "pageNum":1, 
	            "pageSize":10,
	            "optUserNum":optistnum,
	            "cid":$cid,
	        },
	        success:function(datas){
	        	var isLike = datas.data.isLike;
	        	var datas = datas.data.queryBolgBody;
	            var str = '';
	            if(datas.createdUserPhoto == '' || datas.createdUserPhoto == null) {
	    			headImg='/static/app/images/head.png';
	    		}else{
					headImg=datas.createdUserPhoto;
	    		}
	    		if(isLike==true){
	    			praise='/static/app/images/praise.png';
	    		}else{
	    			praise='/static/app/images/praise1.png';
	    		}
	            str+= "<div class='top'>" + 
	                    '<img class="headImg" src="'+ headImg +'">' + 
	                    "<h2>" + datas.createdUsername + "</h2>" + 
	                    "<p>"+datas.gtmCreate+"</p>" + 
	                "</div>" + 
	                "<p class='word'>" + datas.blogContent + "</p>" + 
	               /* "<div class='show'>" + 
						'<img src="/static/app/images/1.png">' + 
						'<img src="/static/app/images/2.png">' + 
						'<img src="/static/app/images/3.png">' +
						'<img src="/static/app/images/4.png">' +
						'<img src="/static/app/images/5.png">' +
						'<img src="/static/app/images/6.png">' +
					"</div>" +*/
					"<ul class='list flex'>" + 
						"<li class='flex'>" +
							'<img style="width: 0.37rem;height: 0.33rem;" src="/static/app/images/icon16.png">' + 
							"<p>"+datas.commentsNum+"</p>" + 
						"</li>" + 
						'<li class="flex share">' + 
							'<img style="width: 0.34rem;height: 0.36rem;" src="/static/app/images/icon17.png">' + 
							"<p>" + datas.forwardNum + "</p>" + 
						"</li>" + 
						'<li class="flex praise" id="'+datas.cid+'" data-isLike='+isLike+'>' + 
							'<img style="width: 0.33rem;height: 0.35rem;" src="'+praise+'" class="imgs">' + 
							"<p class='num'>" + datas.likeNum + "</p>" + 
						"</li>" + 
						'<li class="flex reward">' + 
							'<img style="width: 0.39rem;height: 0.35rem;" src="/static/app/images/dashang.png">' + 
							"<p>打赏</p>" + 
						"</li>" + 
					"</ul>"
	            $("#con .article").html(str);
	            $('.reward').on('click',function(){
			    	reward();
			    })
	            $('.praise').on('click',function(){
	            	var blogId = $(this).attr('id');
	            	var isLike = $(this).attr('data-isLike');
			    	change(blogId,isLike);
			    })
	             $('.share').on('click',function(){
			    	playShare();
			    })
	            if(created==null||created==''){
					$('.reward').hide();
				}
	        }
	    })
    }
     //点赞
	function change(blogId,isLike){
		if(isLike=='true'){
			$.ajax({
				type:"post",
				url:global+"/v1.0/circle/minusLikeNum ",
				async:true,
				data:{
					optUserNum:optistnum,
					blogId:blogId
				},
				success:function(data){
					if(data.code==200){
						Social();
					}
				}
			});
		}else{
			$.ajax({
				type:"post",
				url:global+"/v1.0/circle/addBlogContentLikeNum",
				async:true,
				data:{
					optUserNum:optistnum,
					type:isIdentOrShop,
					blogId:blogId
				},
				success:function(data){
					if(data.code==200){
						Social();
					}
				}
			});
		}
	}
	//分享
	function playShare(){
		layer.open({
		  type: 1,
		  title:'分享到',
		  offset: 'b',
		  area: ['100%', '200px'], //宽高
		  content: $('.playShare'),
		});
		
	}
	$('.close').click(function(){
		layer.closeAll();
	})
    function reward(){
    	layer.open({
		  type: 1,
		  title:'请选择打赏金额',
		  area: ['90%', '7.6rem'], //宽高
		  content: $('.playTour'),
		});
		$(".tourlist li").on("click",function(){
	        var ind=$(this).index();
	        $(this).addClass("tourchecked").siblings().removeClass("tourchecked");
	        tours = $(this).text();
	    })
		
		$('.money').bind('blur',function(){
			var money = $('.money').val();
			if(money!=''){
				$(".tourlist li").removeClass("tourchecked");
				tours=$('.money').val();
			}
		})
		
		$('.btn').click(function(){
			$.ajax({
				type:'get',
				url:global + "/v1.0/circle/selectLastDataByoptUserId",
				data:{
					optUserId:optistId,
				},
				success:function(data){
					var datas = data.data;
					if(datas !== null && datas.currentaccount>=tours){
						$.ajax({
							type:"get",
							url:global+"/v1.0/circle/doBlogReward",
							async:true,
							data:{
								rewardIdentityId:created,
								rewardByIdentityId:optistId,
								fee:tours,
								blogCid:$cid,
							},
							success:function(data){
								if(data.code==200){
									layer.closeAll();
									$('.ceng').show();
								}
							}
						});
					}else{
						layer.msg('余额不足，请充值！',function(){
							layer.closeAll();
						});
						
					}
				}
			})
			
		})
    }
    $('.back').click(function(){
    	$('.ceng').hide();
    })
    // 微博正文的评论
    commentList();
    function commentList(){
	    $.ajax({
	        type:'GET',
	        url: global + "/v1.0/circle/queryBolgBodyAppraises",
	        data:{
	            "pageNum":1, 
	            "pageSize":1000,
	            "optUserNum":optistnum,
	            "cid":$cid,
	        },
	        success:function(data){
	        	var list = data.data.bolgBodyAppraisesVOList;
	            var strs = '';
	            for(var i=0;i<list.length;i++){
	            	if(list[i].id!=null){
		            	if(list[i].createdUserPhoto == '' || list[i].createdUserPhoto == null) {
			    			headImg='/static/app/images/head.png';
			    		}else{
							headImg=list[i].createdUserPhoto;
			    		}
			            strs+= '<div class="comment_list">' + 
								"<dl>" + 
									"<dt>" + '<img class="headImg" src="'+ headImg +'">' + "</dt>" + 
									"<dd>" + 
										"<p>" + list[i].createdUsernameByComments+ "<span class='time'>"+list[i].createTime+"</span></p>";
									"</dd>" + 
								"</dl>" ;
								if(list[i].pid!=null){
									var isfound=false;
									for(var j=0;j<list.length;j++){
										if(list[j].id!=list[i].id&&list[j].id==list[i].pid){
											strs+="<p>" + "回复<i>"+list[j].createdUsernameByComments+"</i>"+list[i].commentsContent+ "</p>";
											isfound=true;
										}
									}
									if(!isfound){
										strs+="<p>" + list[i].commentsContent + "</p>";
									}
								}else{
									strs+="<p>" + list[i].commentsContent + "</p>";
								}
								strs+="</dd>" + 
								"</dl>" +
							"</div>";
					 }
		            $('.comment h2 span').html(data.total);
		            $(".comment").html(strs);
	            }
	        }
	    })
    }
    //发布评论
    $('.add').click(function(){
		var commentsContent=$('.commentsContent').val();
    	$.ajax({
    	 	type:"post",
    	 	url: global +"/v1.0/circle/saveComments",
    	 	data:{
    	 		"optUserNum":optistnum,
    	 		"type":isIdentOrShop,
            	"cid":$cid,
    	 		"commentsContent":commentsContent,
    	 	},
    	 	success:function(data){
    	 		if(data.code==200){
    	 			$('.commentsContent').val('');
    	 			commentList();
    	 			Social();
    	 		}
    	 	}
    	 });
    })
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
        var r = window.location.search.substr(1).match(reg);  
        if (r != null) return unescape(r[2]); return null; 
    }
})

