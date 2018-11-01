$(function(){
	$(".uls li").on("click",function(){
        var ind=$(this).index();
        $(this).addClass("bg").siblings().removeClass("bg");
        $(".tab_con .all_list").eq(ind).show().siblings().hide()
    })
	 $('.pic').click(function(){
	 	window.history.go(-1);
	 })
	 var optistId = getCookie("loginUserId");
	 var Orders = {
	 	init:function() {
            this.isRefresh = true;
			this.hasMore = true;
			this.scroll();
			this.params = {
                'identificationId':optistId,
                'startRow':1,
                'pageSize':5,
            }
			 Orders.getAllList();
            $("#all_orders").click(function(){
                console.log('全部订单')
                Orders.getAllList();
            })
            $("#delete_orders").click(function(){
                console.log('取消订单')
                Orders.deleteList();
            })
        },
        getAllList:function() {
            // ajax请求数据
            $.ajax({
                type:'GET',
                url: global + "/v1.0/order/allBespeakOrder",
                async: true,
                data: this.params,
                success:function (data) {
                    res = data.data.result;
                    var data=data.data;
                    var str = '';
                    //var length = res.length;
                    Orders.hasMore = res.length;
		            if(res.length==0){
		            	this.hasMore=false;
		            };
		            if(data.total==0){
		                aa = "<div class='no_orders' style='width: 100%;height: 100vh;'>" + 
                        "<p style='width: 3.5rem;height: 4.2rem;position: absolute;top: 50%;left: 50%;margin-top: -1.75rem;margin-left: -1.75rem;'>" + '<img src=" /static/app/images/no_orders.png" style="width:100%;height:100%" id="aa">' + "</p>" + "</div>"
                        $('.all_list .con').append(aa);
		            }else{
                   for(var i=0;i<res.length;i++){
                   		if(res[i].userHead == null || res[i].userHead == '') {
							var imgs = '/static/app/images/sethead.png';
						} else {
							var imgs = res[i].userHead;
						}
						  //订单类型 0：普通预约单 1：既时预约单 orderType
						if(res[i].orderType == '0') {
							var ordertype = '/static/app/images/yue.png';
						} else {
							var ordertype = '/static/app/images/qiang.png';
						}
                        if(res[i].bespeakstatus == '0') {
                            var status = '未开始'
                            var btn = '删除订单';
                            str += '<div class="one_list">' + 
                        		'<a href="/static/app/html/yuyueorderDetails.html?id='+res[i].id+'">'+
                                '<div class="lists" id="'+ res[i].id+'">' + 
                                    '<dl>' 
                                        + "<dt>" + '<img src="'+imgs+'">' + "</dt>" + "<dd>" + 
                                            '<p>' + 
                                                "<span>" + res[i].username + "</span>" + 
                                                "<span>" + res[i].phone + "</span>" + 
                                                "<span>" + status + "</span>" + 
                                            '<p>' + 
                                            "<p>" + 
                                                '<time>' + res[i].createtime + "</time>" +
                                            '</p>' + 
                                        "</dd>" + 
                                    "</dl>" + 
                                    "<p class='address'>" + res[i].pcode + '-'+res[i].ccode+'-'+res[i].code+'</p>' + 
                                   /* "<p class='address'>" + res[i].bespeakaddress + '</p>' + */
                                    "<img src='"+ordertype+"' class='ordertype'/>"+
                                "</div>" + 
                                "</a></div>"
	                        } else if(res[i].bespeakstatus == '1') {
	                            var status = '已接单'
	                            var btn = '删除订单'
	                            str += '<div class="one_list">' + 
	                        		'<a href="/static/app/html/receivedorderDetails.html?id='+res[i].id+'">'+
	                                '<div class="lists" id="'+ res[i].id+'">' + 
	                                    '<dl>' 
	                                        + "<dt>" + '<img src="'+imgs+'">' + "</dt>" + "<dd>" + 
	                                            '<p>' + 
	                                                "<span>" + res[i].username + "</span>" + 
	                                                "<span>" + res[i].phone + "</span>" + 
	                                                "<span>" + status + "</span>" + 
	                                            '<p>' + 
	                                            "<p>" + 
	                                                '<time>' + res[i].createtime + "</time>" +
	                                            '</p>' + 
	                                        "</dd>" + 
	                                    "</dl>" + 
	                                    "<p class='address'>" + res[i].pcode + '-'+res[i].ccode+'-'+res[i].code+'</p>' + 
	                                    /*"<p class='address'>" + res[i].bespeakaddress + '</p>' + */
	                                    "<img src='"+ordertype+"' class='ordertype'/>"+
	                                "</div>" + 
	                                "</a></div>"
	                        } else if(res[i].bespeakstatus == '2') {
	                            var status = '待确认'
	                            var btn = '删除订单'
	                            str += '<div class="one_list">' + 
	                        		'<a href="/static/app/html/receivedorderDetails.html?id='+res[i].id+'">'+
	                                '<div class="lists" id="'+ res[i].id+'">' + 
	                                    '<dl>' 
	                                        + "<dt>" + '<img src="'+imgs+'">' + "</dt>" + "<dd>" + 
	                                            '<p>' + 
	                                                "<span>" + res[i].username + "</span>" + 
	                                                "<span>" + res[i].phone + "</span>" + 
	                                                "<span>" + status + "</span>" + 
	                                            '<p>' + 
	                                            "<p>" + 
	                                                '<time>' + res[i].createtime + "</time>" +
	                                            '</p>' + 
	                                        "</dd>" + 
	                                    "</dl>" + 
	                                    "<p class='address'>" + res[i].pcode + '-'+res[i].ccode+'-'+res[i].code+'</p>' + 
	                                   /* "<p class='address'>" + res[i].bespeakaddress + '</p>' + */
	                                    "<img src='"+ordertype+"' class='ordertype'/>"+
	                                "</div>" + 
	                                "</a></div>"
	                        } else if(res[i].bespeakstatus == '3') {
	                            var status = '已完成'
	                            var btn = '删除订单'
	                            str += '<div class="one_list">' + 
	                        		'<a href="/static/app/html/eyesDetails.html?id='+res[i].id+'">'+
	                                '<div class="lists" id="'+ res[i].id+'">' + 
	                                    '<dl>' 
	                                        + "<dt>" + '<img src="'+imgs+'">' + "</dt>" + "<dd>" + 
	                                            '<p>' + 
	                                                "<span>" + res[i].username + "</span>" + 
	                                                "<span>" + res[i].phone + "</span>" + 
	                                                "<span>" + status + "</span>" + 
	                                            '<p>' + 
	                                            "<p>" + 
	                                                '<time>' + res[i].createtime + "</time>" +
	                                            '</p>' + 
	                                        "</dd>" + 
	                                    "</dl>" + 
	                                    "<p class='address'>" + res[i].pcode + '-'+res[i].ccode+'-'+res[i].code+'</p>' + 
	                                    /*"<p class='address'>" + res[i].bespeakaddress + '</p>' + */
	                                    "<img src='"+ordertype+"' class='ordertype'/>"+
	                                "</div>" + 
	                                "<div class='delete'>" + 
	                                    "<button class='btn' id="+res[i].id+">" + btn + "</button>" + 
	                                "</div>" + "</a></div>"
	                        } else if(res[i].bespeakstatus == '5') {
	                            var status = '已取消'
	                            var btn = '删除订单'
	                            str += '<div class="one_list">' + 
	                        		'<a href="/static/app/html/refuseDetails.html?id='+res[i].id+'">'+
	                                '<div class="lists" id="'+ res[i].id+'">' + 
	                                    '<dl>' 
	                                        + "<dt>" + '<img src="'+imgs+'">' + "</dt>" + "<dd>" + 
	                                            '<p>' + 
	                                                "<span>" + res[i].username + "</span>" + 
	                                                "<span>" + res[i].phone + "</span>" + 
	                                                "<span>" + status + "</span>" + 
	                                            '<p>' + 
	                                            "<p>" + 
	                                                '<time>' + res[i].createtime + "</time>" +
	                                            '</p>' + 
	                                        "</dd>" + 
	                                    "</dl>" + 
	                                    "<p class='address'>" + res[i].pcode + '-'+res[i].ccode+'-'+res[i].code+'</p>' + 
	                                    /*"<p class='address'>" + res[i].bespeakaddress + '</p>' + */
	                                    "<img src='"+ordertype+"' class='ordertype'/>"+
	                                "</div>" + 
	                                "<div class='delete'>" + 
	                                    "<button class='btn' id="+res[i].id+">" + btn + "</button>" + 
	                                "</div>" + "</a></div>"
	                        }
                         
                    	} 
                    	 if(Orders.isRefresh) {
							 $(".all_list .con").html(str);
						} else {
							$('.all_list .con').append(str);
						}	
                         Orders.myscroll.refresh();
                        
                        $('.btn').click(function(){
                    	var ids=$(this).attr('id');
                       layer.confirm('您确认删除此订单？', {
						  btn: ['否','是'] //按钮
						}, function(){
							layer.closeAll();
						}, function(){
						    $.ajax({
	                        	type:'POST',
	                        	url:global + "/v1.0/order/deleteBespeakOrder",
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
        deleteList:function() {
            // ajax请求数据
            var optistId = getCookie("loginUserId");
            $.ajax({
                type:'GET',
                url: global + "/v1.0/order/allBespeakOrder",
                async: true,
                data: {
                    'identificationId':optistId,
                    'statusSign':5,
                    'startRow':1,
                    'pageSize':10
                },
                success:function (data) {
                    res = data.data.result;
                    var data=data.data;
                    var stra = '';
                    var length = res.length;
                     if(data.total==0){
		            	 aa = "<div class='no_orders' style='width: 100%;height: 100vh;'>" + 
                        "<p style='width: 3.5rem;height: 4.2rem;position: absolute;top: 50%;left: 50%;margin-top: -1.75rem;margin-left: -1.75rem;'>" + '<img src=" /static/app/images/no_orders.png" style="width:100%;height:100%" id="aa">' + "</p>" + "</div>"
                        $('.dellist').html(aa);
		            }else{
                       for(var i=0;i<res.length;i++){
                           if(res[i].bespeakstatus == '5') {
                                var status = '已取消'
                                var btn = '删除订单'
                            }
                           if(res[i].userHead == null || res[i].userHead == '') {
								var imgs = '/static/app/images/sethead.png';
							} else {
								var imgs = res[i].userHead;
							}
							  //订单类型 0：普通预约单 1：既时预约单 orderType
							if(res[i].orderType == '0') {
								var ordertype = '/static/app/images/yue.png';
							} else {
								var ordertype = '/static/app/images/qiang.png';
							}
                            stra += "<div class='one_list'>" + 
                                    '<div class="lists" id="'+ res[i].id+'">' + 
                                        '<dl>' 
                                            + "<dt>" + '<img src="'+ imgs + '">' + "</dt>" + "<dd>" + 
                                                '<p>' + 
                                                    "<span>" + res[i].username + "</span>" + 
                                                    "<span>" + res[i].phone + "</span>" + 
                                                    "<span>" + status + "</span>" + 
                                                '<p>' + 
                                                "<p>" + 
                                                    '<time>' + res[i].createtime + "</time>" +
                                                '</p>' + 
                                            "</dd>" + 
                                        "</dl>" + 
                                        "<p class='address'>" + res[i].pcode + '-'+res[i].ccode+'-'+res[i].code+'</p>' + 
                                        /*"<p class='address'>" + res[i].bespeakaddress + '</p>' + */
                                        "<img src='"+ordertype+"' class='ordertype'/>"+
                                    "</div>" + 
                                    "<div class='delete'>" + 
                                        "<button class='btn' id="+res[i].id+">" + btn + "</button>" + 
                                    "</div>" + "</div>"
                           
                       }
                        $('.dellist').html(stra);
                        $('.lists').click(function(){
                            var ids = $(this).attr("id");
                            //console.log(bespeakstatus,"999")
                            $(window).attr('location',"refuseDetails.html?id="+ids+"")
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
	                        	url: global + "/v1.0/order/deleteBespeakOrder",
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
			Orders.myscroll = new iScroll("wrapper", {
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
						Orders.pullOnLoad();
					}
				}
			});
		},
		pullOnLoad: function() {
			console.log( Orders.hasMore);
			if(!this.hasMore) {
				layer.msg('数据没有了哦！');
				return;
			}
			this.isRefresh = false;
			this.params.startRow++;
			this.getAllList();
		}
	 }
	  Orders.init();
})
