$(function(){
	var bespeakId=getUrlParam('id');
    $(".refuse").on('click', function() {
        window.location.href = '/static/app/html/refuse.html'
    })
	$('.back').click(function(){
		window.history.go(-1);
	})
	$('.optometry').click(function(){
		window.location.href = '/static/app/html/updateYanguangData.html?id='+bespeakId+'';
	})
    var Details = {
        init:function(){
            Details.getList();
        },
        getList:function(){
        	var that = this;
            $.ajax({
                type:"GET",
                url: global + "/v1.0/order/bespeakOrderDetails",
                data: {
                    "bespeakId":bespeakId
                },
                success:function(data) {
                    var data = data.data;
					var str='';
					var times = data.bespeaktimeend.split('T');
		            var dateT = times[1].split('.000+0000')[0]; // 16:00:00
		            var dateTT = times[0];   // 2017-12-31
		            var times = data.bespeaktimestart.split('T');
		            var dateTs = times[1].split('.000+0000')[0]; // 16:00:00
		            var dateTTs = times[0];   // 2017-12-31
					str='<li><span>姓名:</span>'+data.username+' </li>'
						+'<li><span>手机号:</span>'+data.phone+'</li>'
						+'<li><span>上门时间:</span>'+dateTTs+'&nbsp;&nbsp;'+dateTs+'--'+dateT+'</li>'
						+'<li><span>预约城市:</span>'+data.pcode+'-'+data.ccode+'-'+data.code+'</li>'
/*						+'<li><span>上门地址:</span>'+data.bespeakaddress+'</li>'*/
					$('#con ul').append(str);
					$('.remark').val(data.bespeakremake);
                }
            });
            
            $.ajax({
        		type:"get",
        		url:global+"/v1.0/order/bespeakOrderDetails",
        		async:true,
        		data:{
        			bespeakId:bespeakId,
        		},
        		success:function(data){
        			var data = data.data;
        			if(!data.rp1RightQiujing===''||data.rp1RightQiujing===null){
        				$('.serve').show();
        				$('.serve').click(function(){
        					$('.serve').hide();
        					layer.msg('点击按钮开始服务！');
        					$('.refer').show();
        				})
        				$('.refer').click(function(){
        					that.remark();
        				})
        			}else{
        				$('.refer').show();
        				$('.serve').hide();
        				$('.refer').click(function(){
//      					layer.msg('点击按钮结束服务！')
        					that.remark();
        				})
        			}
        		}
        	});
            
        },
        remark:function(){
        	$.ajax({
        		type:"get",
        		url:global+"/v1.0/order/bespeakOrderDetails",
        		async:true,
        		data:{
        			bespeakId:bespeakId,
        		},
        		success:function(data){
        			var data = data.data;
        			if(data.rp1RightQiujing==''||data.rp1RightQiujing==null){
        				layer.alert('视力信息未填写完善',{icon: 3, title:'提示',btn:'继续完善'},function(){
		               	    window.location.href = '/static/app/html/yanguangData.html?id='+bespeakId+'';
		               	})
        			}else{
        				$.ajax({
							type:'put',
			        		url:global+"/v1.0/order/publicChangeStatus",
			        		data:{
			        			bespeakId:bespeakId,
			        			bespeakStatus:3,
			        		},
			        		success:function(data){
			        			if(data.code==200){
			        				window.location.href = '/static/app/html/successData.html';
			        			}
			        		}
						})
        			}
        		}
        	});
        }
    }
    Details.init() 
})