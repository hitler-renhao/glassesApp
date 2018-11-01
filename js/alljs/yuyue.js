$(function(){
	var optistId = getCookie("loginUserId");   //账户id
	var orderStatus = getCookie('orderStatus');  //抢单  预约单
	var geoCity = getCookie('geoCity');
	var geoProvince = getCookie('geoProvince');
	$('.refresh').click(function(){
		location.reload();
	})
	var Sun = {
		init: function() {
			this.isRefresh = true;
			this.hasMore = true;
			this.scroll();
			this.params = {
				'identificationId':optistId,
                'statusSign':0,
				"startRow":1,  // 页码
	            "pageSize":6,  // 每页显示数据
			};
			this.immediately = {
				'identificationId':optistId,
                'geocity':geoCity,    //地理市
				"geoprovince":geoProvince,  // 地理省
				"pageNum":1,
				"pageSize":3
			};
			this.getList()
		},
		getList:function(){
			var that = this;
			if(orderStatus==1){
				//预约单
				$('.refresh').hide();
				$.ajax({
	                type:'GET',
	                url: global + "/v1.0/order/allBespeakOrder",
	                async: true,
	                data: this.params,
	                success:function (data) {
	                    res = data.data.result;
	                    var data=data.data;
	                    var aa ='';
	                    var str = '';
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
	                                "<p>" + '<img src="'+imgs+'">' + "</p>" +
	                                "<p>" + "<span>" + '姓名：' + "</span>" + "<span>" + res[i].username+ "</span>" + "</p>" + 
	                                "<p>" + "<span>" + '电话：'+ "</span>" + "<span>" + res[i].phone + "</span>" + "</p>" + 
	                                "<p>" + "<span>" + '地址：'+ "</span>" + "<span>" + res[i].pcode + "-"+res[i].ccode+"-"+res[i].code+"</span>" + "</p>" +
//	                                "<p>" + "<span>" + '地址：'+ "</span>" + "<span>" + res[i].bespeakaddress + "</span>" + "</p>" +
	                                "<p>" + "<span>" + '预约时间：'+ "</span>" + "<span>" +res[i].createtime + "</span>" + "</p>" +
	                                '<a href="/static/app/html/yuyueorderDetails.html?id='+res[i].id+'"  id="look_detail">' + '查看详情' + '</a>' + 
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
			}else if(orderStatus==0){
				//即时单
				$.ajax({
	                type:'post',
	                url: global + "/v1.0/order/queryImmediateBespeakList",
	                async: true,
	                data: this.immediately,
	                success:function (data) {
	                    var data=data.data;
	                    var aa ='';
	                    var str = '';
	                     Sun.hasMore = data.length;
	                    if(data.length==0){
			            	this.hasMore=false;
			            };
	                    if(data.length ==0){
	                        aa = "<div class='no_orders' style='width: 100%;height: 100vh;'>" + 
	                        "<p style='width: 3.5rem;height: 4.2rem;position: absolute;top: 50%;left: 50%;margin-top: -1.75rem;margin-left: -1.75rem;'>" + '<img src=" /static/app/images/no_orders.png" style="width:100%;height:100%" id="aa">' + "</p>" + "</div>"
	                        $('.all_list').html(aa);
	                    }else {
	                    	for(var i=0;i<data.length;i++){
	                    		if(data[i].userHead == null || data[i].userHead == '') {
									var imgs = '/static/app/images/sethead.png';
								} else {
									var imgs = data[i].userHead;
								}
	                            str+= '<div class="grabOrder">'
					        			+'<div class="grab_top">'
					        				+'<dl>'
					        					+'<dt><img src="'+imgs+'"/></dt>'
					        					+'<dd>'
					        						+'<p>'+data[i].username+'</p>'
					        						+'<p>'+data[i].phone+'</p>'
					        					+'</dd>'
					        					+'<a href="javascript:;" id='+data[i].id+' class="grap">抢单</a>'
					        				+'</dl>'
					        				+'<dl>'
					        					+'<dt>'+data[i].serviceType+'</dt>'
					        					+'<dd>'
					        						+'<p>'+data[i].pcode+'-'+data[i].ccode+'-'+data[i].code+'</p>'
					        						+'<p><span>'+data[i].bespeaktimestart+'</span></p>'
					        					+'</dd>'
					        				+'</dl>'
					        				+'<h3>'+data[i].serviceContent+'</h3>'
					        			+'</div>'
					        		+'</div>'
	                        }   
							     if(Sun.isRefresh) {
									 $(".all_list").html(str);
								} else {
									$('.all_list').append(str);
								}
					            Sun.myscroll.refresh();
							    $('.grap').click(function(){
							    	var bespeakId = $(this).attr('id');
							    	$.ajax({
							    		type:"post",
							    		url:global+"/v1.0/order/receiveImmediateOrder",
							    		async:true,
							    		data:{
							    			identificationId:optistId,//验光师id
							    			bespeakId:bespeakId,       //及时单id
							    			geocity:geoCity,         //地理市
							    			geoprovince:geoProvince,     //地理省
							    		},
							    		success:function(data){
							    			if(data.code==200){
							    				layer.msg('抢单成功',function(){
//							    					layer.closeAll();
//							    					that.getList();
													location.reload();
													window.location.href="/static/app/html/receiveData.html";
							    				})
							    			}else if(data.code==400){
							    				layer.msg(data.msg+",请稍后继续");
							    			}
							    		}
							    	});
							    })
	                    }
	                }
	            })
			}
            
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
			this.immediately.pageNum++;
			this.getList();
		}
	}
	  Sun.init();
})
