$(function(){
    $("body").show();
    var optistId=getCookie("loginUserId");    //用户ID
    var loginUserOptistname = getCookie("loginUserOptistname");    //验光师用户名
    var optistnum=getCookie("optistnum");   //账号
    var isIdentOrShop=getCookie('isIdentOrShop');    //验证是商家还是验光师   0验光师   1商家
    if(optistId == "" || optistId == null){
        layer.alert('您还未登录，请先登录',function(){
            window.location.href= '/static/app/html/login.html';
        })
    }
    if(isIdentOrShop==1){
    	 window.location.href= '/static/app/html/index_shop.html';
    }
    var mySwiper = new Swiper ('.banner .swiper-container', {
        direction: 'horizontal',
        autoplay: true,
        speed:500,
        loop: true,
        pagination: {
              el: '.swiper-pagination',
        },
    });  
    //抢单   预约单
    $('.centerbg li').click(function(){
    	$(this).addClass('pitch').siblings().removeClass('pitch');
        var orderStatus = $(this).attr('data-orderStatus');
        setCookie("orderStatus",orderStatus,1);
    })
    var orderStatus = getCookie('orderStatus');
    if(orderStatus==0){
    	$('.centerbg li:first').addClass('pitch').siblings().removeClass('pitch');
    }else{
    	$('.centerbg li:last-child').addClass('pitch').siblings().removeClass('pitch');
    }
    $('#myIncom .options .date p').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
    });
    //系统设置
    $('.systemSetup').click(function(){
    	window.location.href= '/static/app/html/systemSetup.html';
    })
    //首页头像，状态
    $.ajax({
    	type:"POST",
        url: global + "/v1.0/LoginRegister/getByOptistNum",
        data:{
            "optId": optistId
        },
        success:function(data){
        	var data = data.data;
        	$('.name').text(loginUserOptistname);
        	if(data.picture == '' || data.picture == null) {
        		$('.headImg').attr('src','/static/app/images/head.png');
    			$('.per_head').attr('src','/static/app/images/head.png');
    			
    		}else{
    			$('.headImg').attr('src',data.picture);
				$('.per_head').attr('src',data.picture);
    		}
        	
        }
    })
     $('.link p').click(function() {
        $(this).addClass('active3').siblings().removeClass('active3');
    });
    //我的订单下的收入，支出，利润
    $('#myIncom .items li').click(function() {
        $(this).addClass('active2').siblings().removeClass('active2');
        var data_type = $(this).attr('data-type');
        var startime = $('.startime').val();
        var endtime = $('.endtime').val();
        var urls="/v1.0/circle/queryCrmTradeFlowList";
        zhexian(data_type,startime,endtime);
    });
    $('.headImg').click(function(){
          $('.personal').animate({ 
            left: "0"
          }, 500 );
    });
    $('.close').click(function(){
          $('.personal').animate({ 
            left: "-100%"
          }, 500);
    });
    //点击更多
    $(".more").click(function(){
        window.location.href = "/static/app/html/messagePush.html"
    })
    $(".tips").click(function(){
        window.location.href = '/static/app/html/messageList2.html'
    })
    $(".per_top").click(function(){
    	if(isIdentOrShop==0){
    		 window.location.href = '/static/app/html/perfectInformation.html?type=0'
    	}else if(isIdentOrShop==1){
            window.location.href = '/static/app/html/shopInformation.html?type=1'
       }
    })
    $(".empty").click(function(){
        $('.personal').animate({ 
            left: "-100%"
        }, 500 );
    })
    /*精选干货*/
    $.ajax({
    	type:'GET',
    	url:global +"/v1.0/homePage/socials",
    	success:function(data){
    		var data = data.data;
    		var str="";
    		for(var i=0;i<data.length;i++){
				var stringTime = data[i].gtmCreate;
			   	stringTime = new Date(Date.parse(stringTime.replace(/-/g, "/")));
			   	date = stringTime.getTime();
				var times = timeago(stringTime);
				if(data[i].optistName==null){
					var optistName='';
				}else{
					var optistName=data[i].optistName;
				}
  			str+='<div class="swiper-slide"><a href="/static/app/html/jxsocialCircleDetails.html?cid='+data[i].cid+'"><span class="created">'+optistName+'</span><span class="content">'+data[i].title+' </span><i>'+times+'</i></a></div>'
    		}
    		$('.Headline .swiper-wrapper').append(str);
    		var mySwiper = new Swiper ('.Headline .swiper-container', {
		        direction: 'vertical',
		        slidesPerView : 2,
		        //autoplay: true,
		        autoplay: {
		            delay: 3000,
		            stopOnLastSlide: true,
		            disableOnInteraction: true,
		        },
		        speed:2000,
		        loop: true,
		    });
    	}
    })
    
    /*系统消息*/
   queryNewestMessage();
   setInterval(function(){
   	   queryNewestMessage();
    },10000)
   function queryNewestMessage(){
   	    if(optistnum!=''||optistId!=''){
	   	    $.ajax({
		    	type:"get",
		    	url: global +"/v1.0/message/queryNewestMessage",
		    	data:{
		    		pageNum:1,
		    		pageSize:5,
		    		optUserNum:optistnum,
		    		identificationId:optistId,
	    			status:true
		    	},
		    	success:function(data){
		    		var datas = data.data.messageList;
		    		//右上角信息提醒；
		    		var notReadNum= data.data.notReadNum;
		    		if(notReadNum=='0'){
		    			$('.infor').css('background','none');
		    		}else{
		    			$('.infor').css('background','red');
		    		};
		    		var allOrderCount = data.data.allOrderCount;
		    		var allCount=$('#all p').text();
		    		if(allOrderCount==allCount){
		    			$('#all p span').css('background','#1f9ef5');
		    		}else{
		    			$('#all p span').css('background','red');
		    		}
		    		var bespeakOrderCount = data.data.bespeakOrderCount;
		    		var yuyueCount=$('#yuyue p').text();
		    		if(bespeakOrderCount==yuyueCount){
		    			$('#yuyue p span').css('background','#1f9ef5');
		    		}else{
		    			$('#yuyue p span').css('background','red');
		    		}
		    		var reviewStatus = data.data.reviewStatus;
		    		setCookie('status',reviewStatus,1);
		    		var numberStatus=getCookie("status");        //账户的状态  0-4  通过不通过
		    		//获取订单数量
		    		getsummary(numberStatus);
		    		if(reviewStatus==0){
		        		$('.state').text('审核中');
		        	}else if(reviewStatus==1){
		        		$('.state').text('审核中');
		        	}else if(reviewStatus==2){
		        		$('.state').text('审核中');
		        	}else if(reviewStatus==3){
		        		$('.state').text('已审核');
		        	}else if(reviewStatus==4){
		        		$('.state').text('已冻结');
		        	}
		    		var str='';
		    		for(var i=0;i<datas.length;i++){
		    			if(datas[i].createDate!=null){
							var times = datas[i].createDate
						}else{
							var times = datas[i].updateDate
						}
		    			str+='<a href="/static/app/html/queryNewestDetails.html?id='+datas[i].id+'" >'
							+'<li>'
								+'<img src="/static/app/images/head.png">'
								+'<div class="con">'
									+'<p class="issueName">发布者：平台</p>'   
									+'<p class="time">'+times+'</p>'
								+'</div>'
								+'<p class="conText">'+datas[i].content+' </p>'
							+'</li>'
						+'</a>'
		    		}
		    		$('#systemMsg ul').html(str);
		    		
		    	}
		    });
	    }
    }
    
    // IM
    var iframes = '';
	var appToken=getCookie("appLoginUser");
    iframes = "<div class='iframe'>" +
            "<span style='color: #fff;font-size: 0.7rem;position: absolute;right: 0.5rem;top: 0.4rem;display:none;' class='close'>" + '×' + "</span>"
                "<iframe id=\"imframe\" src=\"/ysjim/im/optlogin?appLoginUser="+appToken+"\" style=\"position:fixed;left:0;top:0;width:100%;height:100%;z-index:999;display:none;\"}></iframe>" + 
            "</div>"
    $("body").append(iframes);
    $(".mes").click(function(){
       var iframes = '';
        iframes = "<div class='iframe' style='width:100%;height:100%;background:rgba(0,0,0,.5);position:fixed;top:0;left:0;z-index:99;'>" + "<span style='color: #fff;font-size: 0.7rem;position: absolute;right: 0.5rem;top: 0rem;display:block;' class='close'>" + '×' + "</span>" + 
        "<iframe id=\"imframe\" style=\"position:absolute;left:2%;top:0.65rem;width:94%;height:94%;z-index:999;display:block;\" src=\"/ysjim/im/optlogin?appLoginUser="+appToken+"\"}></iframe>" + "</div>"
        $("body").append(iframes);
        $(".close").click(function(){
            $(".iframe").hide(500)
        })
    });
    //统计订单；
    function getsummary(numberStatus){
	    if(numberStatus == 3){
	    	 //统计订单；
		    $.ajax({
		        type:'GET',
		        url:global+"/v1.0/homePage/summary",
		        data:{
		            "optUserId": optistId
		        },
		        success:function(datas){
		            var str = '';
		            var res = datas.data
		            str+= "<a href='/static/app/html/yuyueOrder.html' id='yuyue'>" + 
		                "<img class='icon01' src='/static/app/images/icon02.png'>" +
		                "<h2>" + '预约订单' + "</h2>" + 
		                "<p><span></span>" + res.orderCount + "</p>" + 
		            "</a>" + 
		            "<a href='/static/app/html/successData.html' id='success'>" + 
		                "<img class='icon02' src='/static/app/images/icon03.png'>" + 
		                "<h2>" + '完成订单' + "</h2>" + 
		                "<p><span></span>" + res.finishCount +"</p>" + 
		            "</a>" + 
		            "<a href='/static/app/html/receiveData.html' id='receive'>" + 
		                "<img class='icon03' src='/static/app/images/jieshoudd.png'>" + 
		                "<h2>" + '接收订单' + "</h2>" + 
		                "<p><span></span>" + res.acceptCount + "</p>" + 
		            "</a>" + 
		            "<a href='/static/app/html/allOrder.html' id='all'>" + 
		                "<img class='icon04' src='/static/app/images/icon05.png'>" + 
		                "<h2>" + '全部订单' + "</h2>" + 
		                "<p><span></span>" + res.allCount + "</p>" +
		            "</a>"
		            $("#nav").html(str)
		        }
		    })
	    }else{
	       
		    $.ajax({
		        type:'GET',
		        url:global+"/v1.0/homePage/summary",
		        data:{
		            "optUserId": optistId
		        },
		        success:function(datas){
		            var str = '';
		            var res = datas.data
		            str+= "<a href='javascript:;' id='yuyue'>" + 
		                "<img class='icon01' src='/static/app/images/icon02.png'>" +
		                "<h2>" + '预约订单' + "</h2>" + 
		                "<p><span></span>" + res.orderCount + "</p>" + 
		            "</a>" + 
		            "<a href='javascript:;' id='success'>" + 
		                "<img class='icon02' src='/static/app/images/icon03.png'>" + 
		                "<h2>" + '完成订单' + "</h2>" + 
		                "<p><span></span>" + res.finishCount +"</p>" + 
		            "</a>" + 
		            "<a href='javascript:;' id='receive'>" + 
		                "<img class='icon03' src='/static/app/images/jieshoudd.png'>" + 
		                "<h2>" + '接收订单' + "</h2>" + 
		                "<p><span></span>" + res.acceptCount + "</p>" + 
		            "</a>" + 
		            "<a href='javascript:;' id='all'>" + 
		                "<img class='icon04' src='/static/app/images/icon05.png'>" + 
		                "<h2>" + '全部订单' + "</h2>" + 
		                "<p><span></span>" + res.allCount + "</p>" +
		            "</a>"
		            $("#nav").html(str)
		        }
		    })
	    	$('#nav').click(function(){
	    		layer.msg('审核通过可使用此功能');
	    	})
	    }
    }
    $('.money').click(function(){
    	$('.items').show();
    	zhexian(0);
    	myChart.setOption(option);
    })
     //折线图
    var myChart = echarts.init(document.getElementById('main'));
     myChart.setOption({
             tooltip: {},
             xAxis: {
                 data: []
             },
             yAxis: {},
             series: [{
                 name: '销量',
                 type: 'bar',
                 data: []
             }]
         });
         myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画
         zhexian(0);
    $('.order').click(function(){
    	 $('.items').hide();
    	 myChart.setOption(option);
    	 var startime = $('.startime').val();
         var endtime = $('.endtime').val();
    	 $.ajax({
        	type:"post",
        	url:global+"/v1.0/circle/queryCrmIdentificationAndShopChart",
        	async:true,
        	data:{
        		offset:0,
        		limit:20,
        		optUserId:optistId,
        		starttime:startime,
        		endtime:endtime,
        	},
        	success:function(data){
        		var rows = data.data.rows;
        		var data=data.data;
        		var names=[];    //类别数组（实际用来盛放X轴坐标值）
     			var nums=[];    //销量数 
        		if (rows) {
                    for(var i=0;i<rows.length;i++){
                        names.push(rows[i].dayStr);    //挨个取出类别并填入时间数组
                     }
                    for(var i=0;i<rows.length;i++){
                        nums.push(rows[i].num);    //挨个取出销量并填入销量数组
                      }
                    myChart.hideLoading();    //隐藏加载动画
                    option = {
				        visualMap: [{
				            show: false,
				            type: 'continuous',
				            seriesIndex: 0,
				            min: 0,
				            max: 400
				        }, {
				            show: false,
				            type: 'continuous',
				            seriesIndex: 1,
				            dimension: 0,
				            min: 0,
				            max: names.length - 1
				        }],
				        title: [{
				            left: 'center',
				            text: ''
				        }],
				        tooltip: {
				            trigger: 'axis'
				        },
				        xAxis:[
				            {
				                // data: dateList
				            }, 
				            {
				                data: names,
				                gridIndex: 1,
				                axisLabel: {
				                    fontSize: 12
				                }
				            }
				        ],
				        yAxis: [
				            {
				                plitLine: {show: false}
				            }, 
				            {
				                splitLine: {show: false},
				                gridIndex: 1,
				                axisLabel: {
				                    fontSize: 12
				                }
				            }
				        ],
				         axisLabel: {
					            margin: 2,
					            formatter: function (value, index) {
					               if(value >= 1000 && value < 10000){
						              	value = value / 1000 + "千";	
						            }else if (value >= 10000 && value < 10000000) {
						                value = value / 10000 + "万";
						            } else if (value >= 10000000) {
						                value = value / 10000000 + "千万";
						            }
						               return value;
						        }
					        },
				        grid: [{
				            bottom: '30%'
				            
				        }, {
				            top: '15%'
				        }],
				        series: [{
				            type: 'line',
				            showSymbol: false,
				            // data: valueList
				        }, {
				            type: 'line',
				            showSymbol: false,
				            data: nums,
				            xAxisIndex: 1,
				            yAxisIndex: 1
				        }]
				    };
				    myChart.setOption(option);
	            }
        	},
        	error:function(errorMsg) {
	             //请求失败时执行该函数
	            //alert("图表请求数据失败!");
	            myChart.hideLoading();
	           
	        }
        })
    })
    //折线图
	 function zhexian(datatype,startime,endtime){
        $.ajax({
        	type:"get",
        	url:global+"/v1.0/circle/queryCrmTradeFlowList",
        	async:true,
        	data:{
        		offset:0,
        		limit:20,
        		optUserId:optistId,
        		type:datatype,
        		starttime:startime,
        		endtime:endtime,
        	},
        	success:function(data){
        		var rows = data.data.rows;
        		var names=[];    //类别数组（实际用来盛放X轴坐标值）
     			var nums=[];    //销量数 
        		if (rows) {
                    for(var i=0;i<rows.length;i++){
                        names.push(rows[i].dayStr);    //挨个取出类别并填入时间数组
                     }
                    for(var i=0;i<rows.length;i++){
                        nums.push(rows[i].fee);    //挨个取出销量并填入销量数组
                      }
                    myChart.hideLoading();    //隐藏加载动画
                    option = {
				        visualMap: [{
				            show: false,
				            type: 'continuous',
				            seriesIndex: 0,
				            min: 0,
				            max: 400
				        }, {
				            show: false,
				            type: 'continuous',
				            seriesIndex: 1,
				            dimension: 0,
				            min: 0,
				            max: names.length - 1
				        }],
				        title: [{
				            left: 'center',
				            text: ''
				        }],
				        tooltip: {
				            trigger: 'axis'
				        },
				        xAxis:[
				            {
				                // data: dateList
				            }, 
				            {
				                data: names,
				                gridIndex: 1,
				                axisLabel: {
				                    fontSize: 12
				                }
				            }
				        ],
				        yAxis: [
				            {
				                plitLine: {show: false}
				            }, 
				            {
				                splitLine: {show: false},
				                gridIndex: 1,
				                axisLabel: {
				                    fontSize: 12
				                }
				            }
				        ],
				         axisLabel: {
					            margin: 2,
					            formatter: function (value, index) {
					               if(value >= 1000 && value < 10000){
						              	value = value / 1000 + "千";	
						            }else if (value >= 10000 && value < 10000000) {
						                value = value / 10000 + "万";
						            } else if (value >= 10000000) {
						                value = value / 10000000 + "千万";
						            }
						               return value;
						        }
					        },
				        grid: [{
				            bottom: '30%'
				            
				        }, {
				            top: '15%'
				        }],
				        series: [{
				            type: 'line',
				            showSymbol: false,
				            // data: valueList
				        }, {
				            type: 'line',
				            showSymbol: false,
				            data: nums,
				            xAxisIndex: 1,
				            yAxisIndex: 1
				        }]
				    };
				    myChart.setOption(option);
	            }
			},
        	error:function(errorMsg) {
	             //请求失败时执行该函数
	            //alert("图表请求数据失败!");
	            myChart.hideLoading();
	           
	        }
        	
        });
     }
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); return null; 
    }
   
	//时间差
	function timeago(dateTimeStamp){   
			// dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
        var minute=1000*60;      //把分，时，天，周，半个月，一个月用毫秒表示
        var  hour=minute*60;
        var day=hour*24;
        var week=day*7;
        var halfamonth=day*15;
        var month=day*30;
    
        var  now=new Date().getTime();   //获取当前时间毫秒
        var diffValue=now - dateTimeStamp;//时间差
	      
	        if(diffValue<0){return;}
 
	        var  minC=diffValue / minute;  //计算时间差的分，时，天，周，月
	        var  hourC=diffValue / hour;
	        var  dayC=diffValue / day;
	       var  weekC=diffValue / week;     
	        var  monthC=diffValue / month;
 
	       if(monthC>=1){
				result="" + parseInt(monthC) + "月前";
		}
		else if(weekC>=1){
			result="" + parseInt(weekC) + "周前";
		}
		else if(dayC>=1){
			result=""+ parseInt(dayC) +"天前";
		}
		else if(hourC>=1){
			result=""+ parseInt(hourC) +"小时前";
		}
		else if(minC>=1){
			result=""+ parseInt(minC) +"分钟前";
		}else
		result="刚刚";
		return result;
	}
	$('#kefulink').on('click',function(event){
		location.href='/ysjim/im/optlogin?isService=1&appLoginUser='+appToken;
	});
})