//optistId = getCookie("loginUserId");  //用户ID
//loginUserOptistname = getCookie("loginUserOptistname");   //验光师用户名
//isIdentOrShop = getCookie('isIdentOrShop');   //验证是商家还是验光师   0验光师   1商家
//isParent = getCookie('isParent');    //验证是否是总店  0总店 1分店
//status = getCookie("status");        //账户的状态  0-4  通过不通过
//optistnum = getCookie("optistnum");  //验光师账号
//orderStatus = getCookie("orderStatus");  //订单转态    0抢单  1预约单
//shopmobilename = getCookie("shopmobilename");   //商家用户名
//shopname = getCookie("shopname");      //商家名称
//shopnum = getCookie("shopnum");     //商家账户
//shopstatus = getCookie("shopstatus");  //商家账户的状态

var loginObj;

//本地
//global = "http://10.0.232.197:8989/ysj/app"

// 线上接口
global = "http://wx.bjysjglasses.com:8989/ysj/app";

//测试
/*global = "http://test.bjysjglasses.com:8989/ysj/app"*/

function setCookie(c_name,value,expiredays)
{
  // debugger
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

// global = 'http://test.bjysjglasses.com:8084/app/ysj/app'  // 测试线

function getCookie(c_name){
  // debugger
	if (document.cookie.length>0){
	  c_start=document.cookie.indexOf(c_name + "=")
	  if (c_start!=-1)
	    { 
	    c_start=c_start + c_name.length+1 
	    c_end=document.cookie.indexOf(";",c_start)
	    if (c_end==-1) c_end=document.cookie.length
	    return unescape(document.cookie.substring(c_start,c_end))
	    } 
	  }
	return ""
}

 function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null; 
 }
 //定位变量
 var geoProvince, geoCity, geoAddress;

 