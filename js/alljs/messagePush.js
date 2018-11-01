$(function(){
	// var global="http://test.bjysjglasses.com:8084/app/ysj/app";
	// var txt="http://10.0.232.197:8989/ysj/app";
	// var optistname=getCookie("loginUserOptistname");
	var optistnum=getCookie("optistnum");   //账号
	var Sun = {
		init: function() {
			this.isRefresh = true;
			this.hasMore = true;
			this.scroll();
			this.params = {
				"pageNum":1,  // 页码
	            "pageSize":5,  // 每页显示数据
	          /*  "optUserNum":optistnum*/
			};
			this.getList()
		},
		getList:function(){
			$.ajax({
		        type:'GET',
		        url: global + "/v1.0/circle/queryCircleList",
		        data:this.params,
		        success:function(datas){
		            console.log(datas,"11111");
		            var res = datas.list;
		            var str = '';
		            Sun.hasMore = res.length;
		            if(res.length==0){
		            	this.hasMore=false;
		            };
		            for(var i =0;i<res.length;i++){
		            	if(res[i].picture == '' || res[i].picture == null) {
			    			headImg='/static/app/images/head.png';
			    		}else{
							headImg=res[i].picture;
			    		}
		            	str+= '<li class="details" id="'+res[i].cid+'">' + 
		            	       "<a href='/static/app/html/jxsocialCircleDetails.html?cid="+res[i].cid+"&created="+res[i].created+"'>"+
		                        "<div class='top'>" + 
		                            '<img class="headImg" src="'+headImg+'"/>' + 
									"<h2>" + res[i].optistName + "</h2>" + 
									"<h3>"+res[i].releaseTime+"</h3>"+
		                            "<p class='checkAll'>" + '查看全部' + "</p>" +
		                        "</div>" + 
		                        "<p class='word'>" + res[i].title + "</p>" + 
		                        "</a>"+
		                    "</li>"
		                   
		                
		            }
		            if(Sun.isRefresh) {
						 $(".uls").html(str);
					} else {
						$('.uls').append(str);
					}
		            Sun.myscroll.refresh();
		        }
		    })
		},
		scroll:function() {
			Sun.myscroll = new iScroll("wrapper", {
				onScrollMove: function() {
					if(this.y < this.maxScrollY) {
						$("#wrapper .pull-loading").html("");
						$("#wrapper .pull-loading").addClass("loading");
					} else {
						$("#wrapper .pull-loading").html("");
						$("#wrapper .pull-loading").removeClass("loading");
					}
				},
				onScrollEnd: function() {
					if($("#wrapper .pull-loading").hasClass('loading')) {
						$("#wrapper .pull-loading").html("");
						Sun.pullOnLoad();
					}
				}
			});
		},
		pullOnLoad: function() {
			console.log( Sun.hasMore);
			if(!this.hasMore) {
				$(".con .pull-loading").html("");
				return;
			}
			this.isRefresh = false;
			this.params.pageNum++;
			this.getList();
		}
    }
   Sun.init();
})