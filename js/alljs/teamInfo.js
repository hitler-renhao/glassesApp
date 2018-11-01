$(function(){
	var optistId=getCookie("loginUserId");
	var personName=getCookie("personName");
	var employeeId=getUrlParam('id');
	$('.personName').text(personName);
	var myChart = echarts.init(document.getElementById('main'));
	$('.pic').click(function(){
		window.history.go(-1);
	})
	$('.count').click(function(){
		window.location.href="/static/app/html/staffAccount.html?id="+employeeId+"";
	})
	$('.order').click(function(){
		window.location.href="/static/app/html/staffAllOrder.html?id="+employeeId+"";
	})
	$.ajax({
		type:"get",
        	url:global+"/v1.0/merchant/employeeStatistic",
        	async:true,
        	data:{
        		employeeId:employeeId,
        		shopId:optistId,
        	},
        	success:function(data){
        		var data = data.data;
        		$('.amount span').text(data.amount);
        		$('.ordercount span').text(data.ordercount);
        	}
	})
	$('.close').click(function(){
		layer.open({
		  type: 1,
		  title:false,
		  closeBtn: 0, //不显示关闭按钮
		  anim: 2,
		  shadeClose: true, //开启遮罩关闭
		  content: $('.closeAccount')
		});
		$('.yes').click(function(){
			$.ajax({
				type:"put",
				url:global+"/v1.0/merchant/closeEmployee",
				data:{
					employeeId:employeeId
				},
				success:function(data){
					if(data.code==200){
						layer.msg('删除成功')
						window.location.href="/static/app/html/MyTeam.html?type=1";
					}
				}
			});
		})
		$('.no').click(function(){
			layer.closeAll();
		})
	})
	 $('.list li').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
        var data_type = $(this).attr('data-type');
        zhexian(data_type);
    });
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
         zhexian(1);
    //折线图
	 function zhexian(datatype){
        $.ajax({
        	type:"get",
        	url:global+"/v1.0/merchant/employeeStatisticalChart",
        	async:true,
        	data:{
        		employeeId:employeeId,
        		queryType:datatype,
        	},
        	success:function(data){
        		var rows = data.data;
        		var names=[];    //类别数组（实际用来盛放X轴坐标值）
     			var nums=[];    //销量数 
        		if (rows) {
                    for(var i=0;i<rows.length;i++){
                        names.push(rows[i].createtime);    //挨个取出类别并填入时间数组
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
				                    fontSize: 14
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
				                    fontSize: 14
				                }
				            }
				        ],
				         axisLabel: {
					            margin: 2,
					            formatter: function (value, index) {
					                if (value >= 10000 && value < 10000000) {
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
	            layer.alert("图表请求数据失败!");
	            myChart.hideLoading();
	           
	        }
        	
        });
     }
})
