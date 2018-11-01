$(function(){
	var optistId = getCookie("loginUserId");
	var employeeId=getUrlParam('id');
	$('.pic').click(function(){
		window.history.go(-1);
	})
	var Sun = {
		init: function() {
			this.isRefresh = true;
			this.hasMore = true;
			this.scroll();
			this.params = {
				shopId:optistId,
				employeeId:employeeId,
			};
			this.getList();
		},
		getList:function(){
			$.ajax({
		        type:'GET',
		        url: global + "/v1.0/merchant/employeeOrder",
		        async: true,
		        data: this.params,
		        success:function (data) {
		            res = data.data;
		            var stra = '';
		            Sun.hasMore = res.length;
		            if(res.length==0){
		            	this.hasMore=false;
		            };
	                for(var i=0;i<res.length;i++){
                        stra += "<div class='one_list'>" + 
                                '<div class="lists" id="'+ res[i].id+'">' + 
                                    '<dl>' 
                                        + "<dt>" + '<img src="/static/app/images/head04.png">' + "</dt>" + "<dd>" + 
                                            '<p>' + 
                                                "<span>" + res[i].username + "</span>" + 
                                                "<span>" + res[i].userphone + "</span>" + 
                                            '<p>' + 
                                            "<p>" + 
                                                '<time>' + res[i].createtime + "</time>" +
                                            '</p>' + 
                                        "</dd>" + 
                                    "</dl>" + 
                                    "<p class='address' style='color:#1a92e5'>收取服务费: " + res[i].fee + '元</p>' + 
                                "</div>" +
                            "</div>"
                     }   
                    if(Sun.isRefresh) {
						 $(".all_list").html(stra);
					} else {
						$('.all_list').append(stra);
					}
                     Sun.myscroll.refresh();
                    $('.lists').click(function(){
                        var ids = $(this).attr("id");
                        $(window).attr('location',"/static/app/html/staffSalesForm.html?id="+ ids+"");
                    })
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
				$(".pull-loading").html("没有了哦");
				return;
			}
			this.isRefresh = false;
			this.params.startRow++;
			this.getList();
		}
	}
     Sun.init();
})
