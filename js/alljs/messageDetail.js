// 消息详情
$(function() {
	var optistId=getCookie("loginUserId");
	var optistnum=getCookie("optistnum");   //账号
	var notifyType=getUrlParam('notifyType'); 
	var Sun = {
		init: function() {
			this.isRefresh = true;
			this.hasMore = true;
			this.scroll();
			this.params = {
				"pageNum":1,  // 页码
	            "pageSize":5,  // 每页显示数据
	            "optUserNum":optistnum,  // 验光师ID
	            "notifyType":notifyType  // 消息类型ID
			};
			this.getList();
		},
		getList:function(){
			$.ajax({
		        type:'GET',
		        url: global + "/v1.0/message/queryMessageDetails",
		        data:this.params,
		        success:function(data){
		            console.log(data.list,"messageDetail")
		            var res = data.list;
		            var str = '';
		            Sun.hasMore = data.lastPage;
		             if(data.lastPage==0){
		            	this.hasMore=false;
		            };
		            for(var i=0;i<res.length;i++){
		                // 时间正确格式
		                if(res[i].createDate != null){
		                	var times = res[i].createDate
		                }else{
		                	var times = res[i].updateDate
		                }
		                
		                str+= '<li class="details">' + 
		                        "<a href='/static/app/html/messageDetails.html?id="+res[i].id+"'>"+
		                        "<div class='top'>" + 
									"<h2>" + res[i].title + "</h2>" + 
		                           /* "<p class='checkAll'><img src='/static/app/images/8.png'/></p>" +*/
		                        "</div>" + 
		                        "<p class='word'>" + res[i].content + "</p>" + 
		                        "<h3>"+times+"</h3>"+
		                        "</a>"
		                        if(res[i].is_read==false){
		                        	 str+= "<h4>未读</h4>"
		                        }else{
		                        	 str+= "<h4 class='bg'>已读</h4>"
		                        }
		                        
		                   str+= "</li>"
		            }
			        if(Sun.isRefresh) {
					     $(".list").html(str);
					} else {
						$('.list').append(str);
					}
	                 Sun.myscroll.refresh();
		        }   
		    })
		},
		scroll:function() {
			Sun.myscroll = new iScroll("wrapper", {
				onScrollMove: function() {
					if(this.y < this.maxScrollY) {
						$("#wrapper .pull-loading").html("释放加载");
						$("#wrapper .pull-loading").addClass("loading");
					} else {
						$("#wrapper .pull-loading").html("上拉加载");
						$("#wrapper .pull-loading").removeClass("loading");
					}
				},
				onScrollEnd: function() {
					if($("#wrapper .pull-loading").hasClass('loading')) {
						$("#wrapper .pull-loading").html("上拉加载");
						Sun.pullOnLoad();
					}
				}
			});
		},
		pullOnLoad: function() {
			console.log( Sun.hasMore);
			if(!this.hasMore) {
				layer.msg('数据没有了哦')
				return;
			}
			this.isRefresh = false;
			this.params.pageNum++;
			this.getList();
		}
    }
	 Sun.init();
})