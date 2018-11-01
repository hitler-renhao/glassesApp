$(function() {
    $(".pic").click(function(){
		window.location.href = '/static/app/html/messageList.html'
	})
    $(".sort_list").click(function(){
        window.location.href = '/static/app/html/focusChat.html'

    })


    $.ajax({
        type:'GET',
        url: global + "/v1.0/homePage/queryContactor",
        data:{
            "pageNum":1,
            "pageSize":10,
            "optUserId":1
        },
        success:function(datas){
            console.log(datas,"55555");
            var res = datas.list;
            console.log(res);
            var str = '';
            $.each(res,function(i,v){
                console.log(i,v)
                // str+= "<div class='sort_list'>" +
                //         "<div class='num_logo'>" +
                //             '<img src="' + v.picture +'" alt="">' + 
                //         "</div>" + 
                //         "<div class='num_name'>" + v.picture + "</div>" + 
                //     "</div>"
                // $(".sort_box").html(str)
            })
        }
    })
})