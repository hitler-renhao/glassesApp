$(function(){
    $('.tab li').click(function(event) {
        var ind=$(this).index();
        $(this).addClass('active').siblings().removeClass('active');
    });
	var optistId = getCookie("loginUserId");
    var account = {
        init:function(){
        	account.accountBalance();
            account.getdayData()
            $("#day").click(function(){
                account.getdayData()
            })
            $("#week").click(function(){
                account.getweekData()
            })
            $("#mouth").click(function(){
                account.getmouthData()
            })
            $("#year").click(function(){
                account.getyearData()
            })
        },
        accountBalance:function(){
        	$.ajax({
        		type:'get',
        		url:global + '/v1.0/circle/selectLastDataByoptUserId',
        		data:{
        			optUserId:optistId,
        		},
        		success:function(data){
        			var data= data.data;
        			if(data !=null){
        				var account = data.currentaccount.toFixed(2);
        				$('.money').text(account);
        			}else {
        				$('.money').text('0.00');
        			}
        		}
        	})
        },
        getdayData:function(){ // 日的数据
            $.ajax({
                type:"GET",
                url: global + "/v1.0/wallet/queryTradeFlow",
                data:{
                    "pageNum":1,
                    "pageSize":10,
                    "optUserId":optistId,
                    "queryType":1  // 年月周日类型:日-1,周-2,月-3,年-4  
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
                            $(".items").html(strs);
                            /*var a=$(".items ul:first").find('li').eq(2);
                            alert()*/
                        })
                    }
                }
            })
        },
        getweekData:function(){  // 周的数据
            $.ajax({
                type:"GET",
                url: global + "/v1.0/wallet/queryTradeFlow",
                data:{
                    "pageNum":1,
                    "pageSize":10,
                    "optUserId":optistId,
                    "queryType":2  // 年月周日类型:日-1,周-2,月-3,年-4  
                },
                success:function(datas){
                    var res = datas.list
                    var strs = '';
                    var length = res.length;
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
        },
        getmouthData:function(){  // 月的数据
            $.ajax({
                type:"GET",
                url: global + "/v1.0/wallet/queryTradeFlow",
                data:{
                    "pageNum":1,
                    "pageSize":10,
                    "optUserId":optistId,
                    "queryType":3  // 年月周日类型:日-1,周-2,月-3,年-4  
                },
                success:function(datas){
                    var res = datas.list
                    var strs = '';
                    var length = res.length;
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
        },
        getyearData:function(){  // 年的数据
            $.ajax({
                type:"GET",
                url: global + "/v1.0/wallet/queryTradeFlow",
                data:{
                    "pageNum":1,
                    "pageSize":10,
                    "optUserId":optistId,
                    "queryType":4  // 年月周日类型:日-1,周-2,月-3,年-4  
                },
                success:function(datas){
                    var res = datas.list
                    var strs = '';
                    var length = res.length;
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