$(function(){
	var optistId=getCookie("loginUserId");  //验光师id
	var userId=getUrlParam('id');   //用户id
    $(".uls li").on("click",function(){
        var ind=$(this).index();
        $(this).addClass("bg").siblings().removeClass("bg");
        $(".tab_content .box").eq(ind).show().siblings().hide()
    })
    $('.pic').click(function(){
        window.location.href = '/static/app/html/customerData.html'
    })

    var comment = {
        init:function() {
        	this.isRefresh = true;
			this.hasMore = true;
			this.scroll();
			this.params = {
				"pageNum":1, 
                "pageSize":1,
                "optUserId":optistId,
                "userId":userId,
			};
        	comment.getmesData();
            $("#msg").click(function() {
                comment.getmesData()
            })
            $("#com").click(function(){
                comment.getcomData()
            })
        },
        getmesData: function() {  // 信息
            $.ajax({
                type:'GET',
                url: global + "/v1.0/customerData/queryCustomerDataDetailList",
                data:this.params,
                success:function(data){
                	var neatpage=data.nextPage
                	var total = data.total;
                    var data = data.list;
                    var str="";
                    comment.hasMore = neatpage;
		            if(neatpage==0){
		            	this.hasMore=false;
		            };
		            if(total==0){
		            	 aa = "<div class='no_orders' style='width: 100%;height: 100vh;'>" + 
	                        "<p style='width: 3.5rem;height: 4.2rem;position: absolute;top: 50%;left: 50%;margin-top: -1.75rem;margin-left: -1.75rem;'>" + '<img src=" /static/app/images/no_orders.png" style="width:100%;height:100%" id="aa">' + "</p>" + "</div>"
	                        $('.con').html(aa);
		            }else{
	                    for(var i=0;i<data.length;i++){
	                    	str+='<ul class="list">' 
				                +'<li><span>姓名:</span>'+data[i].username+'</li>' 
				                +'<li><span>手机号:</span>'+data[i].phone+'</li>' 
				                +'<li><span>上门时间:</span>'+data[i].createTime+'</li>' 
				               /* +'<li><span>上门地址:</span>'+data[i].bespeakAddress+'</li>' */
				            +'</ul>'
				           +' <div class="beizhu">'
								+'<p style="font-size:0.3rem;padding:0.18rem 0.24rem;">备注：</p>'
								+'<textarea class="remark" placeholder="">'+data[i].bespeakRemake+'</textarea>'
							+'</div>'
				            +'<div class="table">'
				                +'<p style="font-size:0.3rem;padding:0.18rem 0.24rem;">视力详情：</p>'
				                +'<div class="lists">'
				                    +'<ul>'
				                       +' <li style="width:0.6rem;"></li>'
				                       +' <li>球镜</li>'
				                       +' <li>柱镜</li>'
				                       +'<li>轴位</li>'
				                       +'<li>瞳距</li>'
				                       +'<li>瞳高</li>'
				                       +'<li>视力矫正</li>'
				                    +'</ul>'
				                    +'<ul>'
				                        +'<li style="width:0.6rem;">右</li>'
				                        +'<li class="rp1RightQiujing">'+data[i].rp1RightQiuJing+'</li>'
				                        +'<li class="rp1RightZhujing">'+data[i].rp1RightZhuJing+'</li>'
				                        +'<li class="rp1RightZhouwei">'+data[i].rp1RightZhouWei+'</li>'
				                        +'<li class="rp1RightTongju">'+data[i].rp1RightTongju+'</li>'
				                        +'<li class="rp1RightTonggao">'+data[i].rp1RightTonggao+'</li>'
				                        +'<li class="rp1RightJiaozhengshili">'+data[i].rp1RightJiaoZhengShiLi+'</li>'
				                    +'</ul>'
				                    +'<ul>'
				                        +'<li style="width:0.6rem;">左</li>'
				                        +'<li class="rp1LeftQiujing">'+data[i].rp1LeftQiuJing+'</li>'
				                        +'<li class="rp1LeftZhujing">'+data[i].rp1LeftZhujing+'</li>'
				                        +'<li class="rp1LeftZhouwei">'+data[i].rp1LeftZhouWei+'</li>'
				                        +'<li class="rp1LeftTongju">'+data[i].rp1LeftTongju+'</li>'
				                        +'<li class="rp1LeftTonggao">'+data[i].rp1LeftTonggao+'</li>'
				                        +'<li class="rp1LeftJiaozhengshili">'+data[i].rp1LeftJiaoZhengShiLi+'</li>'
				                    +'</ul>'
				                    +'<ul>'
				                        +'<li style="width:0.6rem;">双</li>'
				                        +'<li></li>'
				                        +'<li></li>'
				                        +'<li></li>'
				                        +'<li></li>'
				                        +'<li></li>'
				                        +'<li class="rp1Jiaozhengshili">'+data[i].rp1Jiaozhengshili+'</li>'
				                    +'</ul>'
				                    +'<ul>'
				                        +'<li style="border:none;text-align:left;" class="rp1LeftAdd">'+data[i].rp1LeftAdd+'</li>'
				                        +'<li style="border:none;"></li>'
				                        +'<li style="border:none;"></li>'
				                        +'<li style="border:none;"></li>'
				                        +'<li style="border:none;"></li>'
				                        +'<li style="border:none;"></li>'
				                        +'<li style="border:none;"></li>'
				                    +'</ul>'
				                +'</div>'
				            +'</div>'
				            
	                    }
	                    if(comment.isRefresh) {
							 $(".con").html(str);
						} else {
							$('.con').append(str);
						}
	                     comment.myscroll.refresh();
                    }
                }
            })
        },
        scroll:function() {
			comment.myscroll = new iScroll("wrapper", {
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
						comment.pullOnLoad();
					}
				}
			});
		},
		pullOnLoad: function() {
			if(!this.hasMore) {
				layer.msg('数据没有了哦')
				return;
			}
			this.isRefresh = false;
			this.params.pageNum++;
			this.getmesData();
		},
        getcomData:function(){   // 评价
            $.ajax({
                type:'GET',
                url: global + "/v1.0/customerData/queryCustomerAppraisesList",
                data:{
                    "pageNum":1, 
                    "pageSize":10,
                    "optUserId":optistId,
                    "userId":userId,
                },
                success:function(datas){
                    var data = datas.list;
                    var str="";
                    for(var i=0;i<data.length;i++){
                    	if(data[i].createTime!=''){
                    		var times = data[i].createTime.split('T');
		                    var dateT = times[1].split('.000+0000')[0]; // 16:00:00
		                    var dateTT = times[0];   // 2017-12-31
                    	}
                    	//星级判断					
						if(parseInt(data[i].identificationScore) >=0 && parseInt(data[i].identificationScore)<=20){
							aaa="/static/app/images/one.png";							
						}else if(parseInt(data[i].identificationScore) >20 && parseInt(data[i].identificationScore)<=40){							
							aaa="/static/app/images/two.png";
						}else if(parseInt(data[i].identificationScore) >40 && parseInt(data[i].identificationScore)<=60){						
							aaa="/static/app/images/three.png";
						}else if(parseInt(data[i].identificationScore) >60 && parseInt(data[i].identificationScore)<=80){
							aaa="/static/app/images/four.png";
						}else if(parseInt(data[i].identificationScore) >80 && parseInt(data[i].identificationScore)<=100){
							aaa="/static/app/images/wu.png";
						}
                    	str+='<div class="box_pj">'
                            +'<div class="name">'
                                +'<span></span>'
                                +'<time style="color:#999;">'+dateTT+'</time>'
                            +'</div>'
                           +'<dl>'
                               +' <dt><img src="/static/app/images/head.png" alt=""></dt>'
                                +'<dd>'
                                    +'<p>'
                                       +' <span>'+data[i].contactorname+'</span>'
                                       +' <b class="star">'
                                            +'<span><img src="'+aaa+'" alt=""></span>'
                                       +' </b>'
                                    +'</p>'
                                    +'<p>'+data[i].content+'</p>'
                                    +'<p>追评：'+data[i].identificationContent+'</p>'
                                +'</dd>'
                            +'</dl>'
                        +'</div>'
                    }
                    $('.pingjia').html(str);
                }
            })
        }
    }
    comment.init()
})