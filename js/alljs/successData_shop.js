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
	            'statusSign':3,
	            "startRow":1,  // 页码
	            "pageSize":6,  // 每页显示数据
			};
			this.getList();
		},
		getList:function(){
			$.ajax({
		        type:'get',
		        url: global + "/v1.0/order/allBespeakOrder",
		        async: true,
		        data: this.params,
		        success:function (data) {
		            res = data.data.result;
		            var stra = '';
		            Sun.hasMore = res.length;
		            if(res.length==0){
		            	this.hasMore=false;
		            };
		            var data=data.data;
		             if(data.total==0){
		            	 aa = "<div class='no_orders' style='width: 100%;height: 100vh;'>" + 
                        "<p style='width: 3.5rem;height: 4.2rem;position: absolute;top: 50%;left: 50%;margin-top: -1.75rem;margin-left: -1.75rem;'>" + '<img src=" /static/app/images/no_orders.png" style="width:100%;height:100%" id="aa">' + "</p>" + "</div>"
                        $('.all_list').html(aa);
		            }else{
	                for(var i=0;i<res.length;i++){
	                   if(res[i].bespeakstatus == '0') {
                            var status = '未开始'
                            var btn = '删除订单'
                        } else if(res[i].bespeakstatus == '1') {
                            var status = '已接单'
                            var btn = '删除订单'
                            $(".delete").remove()
                        } else if(res[i].bespeakstatus == '2') {
                            var status = '待确认'
                            var btn = '删除订单'
                        } else if(res[i].bespeakstatus == '3') {
                            var status = '已完成'
                            var btn = '删除订单'
                        } else if(res[i].bespeakstatus == '5') {
                            var status = '已取消'
                            var btn = '删除订单'
                        }
                        if(res[i].userHead == null || res[i].userHead == '') {
							var imgs = '/static/app/images/head.png';
						} else {
							var imgs = res[i].userHead;
						}
                        stra += "<div class='one_list'>" + 
                                '<div class="lists" id="'+ res[i].id+'">' + 
                                    '<dl>' 
                                        + "<dt>" + '<img src='+imgs+'>' + "</dt>" + "<dd>" + 
                                            '<p>' + 
                                                "<span>" + res[i].username + "</span>" + 
                                                "<span>" + res[i].phone + "</span>" + 
                                                "<span>" + status + "</span>" + 
                                            '<p>' + 
                                            "<p>" + 
                                                '<time>' + res[i].updatetime + "</time>" +
                                            '</p>' + 
                                        "</dd>" + 
                                    "</dl>" + 
//                                  "<p class='address'>" + res[i].bespeakaddress + '</p>' + 
									"<p class='address'>" + res[i].pcode + '-'+res[i].ccode+'-'+res[i].code+'</p>' + 
                                "</div>" +
                              /* "<div class='delete'>" + 
                                    "<button class='btn' id="+res[i].id+">" + btn + "</button>" + 
                                "</div>" + */
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
                       // $(window).attr('location',"/static/app/html/eyesDetails.html?id="+ ids+"");
                    })
                    $('.btn').click(function(){
                    	var ids=$(this).attr('id');
                       layer.confirm('您确认删除此订单？', {
						  btn: ['否','是'] //按钮
						}, function(){
							layer.closeAll();
						}, function(){
						    $.ajax({
	                        	type:'POST',
	                        	url:global+"/v1.0/order/deleteBespeakOrder",
	                        	data:{
	                        		id:ids,
	                        	},
	                        	success:function(data){
	                        		if(data.code==200){
	                        			layer.msg('已删除', {icon: 1});
	                        			location.reload();
	                        		}else if(data.code==200){
	                        			layer.msg('删除失败');
	                        		}
	                        	}
	                        })
                    	})
                	})
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
