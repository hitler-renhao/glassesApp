$(function(){
	var optistId = getCookie("loginUserId");
	$('.back').click(function(){
		window.history.go(-1);
	})
    var account = {
        init:function(){
        	account.accountBalance();
            account.getdayData(1);
            account.tab();
        },
        tab:function(){
        	$('.tab li').click(function() {
		        $(this).addClass('active').siblings().removeClass('active');
		        var data_type = $(this).attr('data-type');
		        account.getdayData(data_type);
		    });
        },
        accountBalance:function(){
        	$.ajax({
        		type:'get',
        		url:global + '/v1.0/wallet/queryAccount',
        		data:{
        			optUserId:optistId,
        		},
        		success:function(data){
        			var data= data.data;
        			if(data !=null){
        				var account = data.account.toFixed(2);
        				$('.money').text(account);
        			}else {
        				$('.money').text('0.00');
        			}
        			
        		}
        	})
        },
        getdayData:function(data_type){ // 日的数据
            $.ajax({
                type:"GET",
                url: global + "/v1.0/wallet/queryTradeFlow",
                data:{
                    "pageNum":1,
                    "pageSize":10,
                    "optUserId":optistId,
                    "queryType":data_type,  // 年月周日类型:日-1,周-2,月-3,年-4  
                },
                success:function(datas){
                    var res = datas.list
                    var length = res.length;
                    var strs = '';
                    if (length == 0) {
                        $(".items").html("<p style='width:100%;height:1rem;line-height:1rem;text-align:center;font-size:0.3rem;'>" + '没有任何交易' + "</p>")
                    } else {
                        $.each(res,function(index,value){
                            // 时间正确格式
                            var times = value.createdate.split('T');
                            var dateT = times[1].split('.000+0000')[0]; // 16:00:00
                            var dateTT = times[0];   // 2017-12-31
                            if(value.type == '1') {
                                var status = '收入'
                            } else if(value.type == '2') {
                                var status = '支出'
                            } else if(value.type == '3') {
                                var status = '提现'
                            } 
                            strs+= "<ul class='list'>" + 
                                    "<li>" + status + "</li>" + 
                                    "<li>" + value.fee + "</li>" + 
                                    "<li>" + value.currentaccount + "</li>" + 
                                    "<li>" + dateTT + "</li>" + 
                                "</ul>"
                            $(".items").html(strs)
                        })
                    }
                }
            })
        }
    }
    account.init()
})