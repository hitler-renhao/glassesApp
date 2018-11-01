$(function(){
	var flowId=getUrlParam('id');
	$.ajax({
		type:"get",
		url:global+"/v1.0/merchant/employeeOrderDetails",
		async:true,
		data:{
			flowId:flowId
		},
		success:function(data){
			var data = data.data;
			var model;
			var color;
			var texture;
			var times =data.staffFlowOrder.createtime.split('T');
       		var dateT = times[1].split('.000+0000')[0]; // 11:30:27
        	var dateTT = times[0];   // 2018-08-22
			$('.sales').text(data.employeeDetails.staffname);
			$('.artice').text(data.productDetails.productno);
			$('.designation').text(data.productDetails.productname);
			if(data.productDetails.modelname==0){
				model='c1';
			}else if(data.productDetails.modelname==1){
				model='c2';
			}else if(data.productDetails.modelname==2){
				model='c3';
			}
			$('.model').text(model);
			if(data.productDetails.colorname==0){
				color='红色';
			}else if(data.productDetails.colorname==1){
				color='黄色';
			}else if(data.productDetails.colorname==2){
				color='绿色';
			}
			$('.color').text(color);
			if(data.productDetails.materialname==0){
				texture='纯钛';
			}else if(data.productDetails.materialname==1){
				texture='塑料';
			}else if(data.productDetails.materialname==2){
				texture='合金 ';
			}else if(data.productDetails.materialname==3){
				texture='金属 ';
			}
			$('.textures').text(texture);
			$('.names').text(data.staffFlowOrder.username);
			$('.tel').text(data.staffFlowOrder.userphone);
			$('.money').text(data.staffFlowOrder.fee);
			$('.time').text(dateTT);
		}
	});
})
