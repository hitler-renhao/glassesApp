
$(function(){
    var optistId=getCookie("loginUserId");
    var brief=getCookie("brief");
    var text;
    $('.pic').click(function(){
    	window.history.go(-1);
    })
    $.ajax({
        type:"POST",
        url: global + "/v1.0/LoginRegister/getByOptistNum",
        data:{
            "optId": optistId 
        },
        success:function(datas){
            var res = datas.data;
            var str = '';
            $.each(res,function(index,value){
                str+="<textarea id='text'>" + brief +  "</textarea>" + 
                    "<p>" + '你还可以输入' + "<span>" + '300' + "</span>" + '个字' + "</p>"
                $("#comment").html(str);
                $('#comment textarea').keyup(function(){ 
                    //输入字符后键盘up时触发事件
                    var txtLeng = $(' #comment textarea ').val().length; //把输入字符的长度赋给txtLeng
                    //拿输入的值做判断
                    if( txtLeng>300 ){  
                        //输入长度大于300时span显示0
                        $(' #comment p span ').text(' 0 '); 
                        //截取输入内容的前300个字符，赋给fontsize
                        var fontsize = $('#comment textarea').val().substring(0,300);
                        //显示到textarea上
                        $(' #comment textarea ').val( fontsize );
                    }else{
                        //输入长度小于300时span显示300减去长度
                        $('#comment p span').text(300-txtLeng);  
                    }
                });
                text = $("#text").val()
            })
        }
    })
    $(".btn").click(function(){
    	var jianjie = $("#text").val();
    	setCookie("brief",jianjie,1);
    	location.href = "/static/app/html/shopInformation.html?type=1";
    })
});