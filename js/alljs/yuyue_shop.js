$(function(){
	var optistId = getCookie("loginUserId");
	//0:未开始 1:接单 2:待确认 3:已确认 4:售后中 5:拒绝
	$('.pic').click(function(){
		window.location.href = '/static/app/html/index_shop.html';
	})
	var Sun = {
		init: function() {
			this.isRefresh = true;
			this.hasMore = true;
			this.scroll();
			this.params = {
				'shopId':optistId,
                'statusSign':0,
				"startRow":1,  // 页码
	            "pageSize":6,  // 每页显示数据
			};
			this.getList()
		},
		getList:function(){
            $.ajax({
                type:'get',
                url: global + "/v1.0/order/allBespeakOrder",
                async: true,
                data: this.params,
                success:function (data) {
                    res = data.data.result;
                    var data=data.data;
                    var aa ='';
                    var str = '';
                    var length = res.length;
                    Sun.hasMore = res.length;
                    if(res.length==0){
		            	this.hasMore=false;
		            };
                    if(data.total ==0){
                        aa = "<div class='no_orders' style='width: 100%;height: 100vh;'>" + 
                        "<p style='width: 3.5rem;height: 4.2rem;position: absolute;top: 50%;left: 50%;margin-top: -1.75rem;margin-left: -1.75rem;'>" + '<img src=" /static/app/images/no_orders.png" style="width:100%;height:100%" id="aa">' + "</p>" + "</div>"
                        $('.all_list').html(aa);
                    }else {
                    	for(var i=0;i<res.length;i++){
                    		if(res[i].userHead == null || res[i].userHead == '') {
								var imgs = '/static/app/images/head.png';
							} else {
								var imgs = res[i].userHead;
							}
                            str+= "<div class='yuyue_list'>" + 
                                "<div class='orders'>" + 
                                "<p>" + '<img src='+imgs+'>' + "</p>" +
                                "<p>" + "<span>" + '姓名：' + "</span>" + "<span>" + res[i].username+ "</span>" + "</p>" + 
                                "<p>" + "<span>" + '电话：'+ "</span>" + "<span>" + res[i].phone + "</span>" + "</p>" + 
                                /*"<p>" + "<span>" + '地址：'+ "</span>" + "<span>" + res[i].bespeakaddress + "</span>" + "</p>" +*/
                                "<p>" + "<span>" + '地址：'+ "</span>" + "<span>" + res[i].pcode + "-"+res[i].ccode+"-"+res[i].code+"</span>" + "</p>" +
                                "<p>" + "<span>" + '预约时间：'+ "</span>" + "<span>" + res[i].createtime + "</span>" + "</p>" +
                                /*'<a href="/static/app/html/yuyueorderDetails.html?id='+res[i].id+'"  id="look_detail">' + '查看详情' + '</a>' + */
                               '<a href="javascript:;"  id="look_detail"></a>' + 
                            "</div>" + "</div>"
                         }   
                           if(Sun.isRefresh) {
								 $(".all_list").html(str);
							} else {
								$('.all_list').append(str);
							}
				            Sun.myscroll.refresh();
                     }
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
				//$("#wrapper .pull-loading").html("");
				layer.msg('数据没有了哦！')
				return;
			}
			this.isRefresh = false;
			this.params.startRow++;
			this.getList();
		}
	}
	  Sun.init();
})
