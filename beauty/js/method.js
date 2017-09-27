(function () {
    var acount={
		//获取艾灸美容数据接口
		getBeautyList:function(token,title,callback){
			// console.log(token+";"+title);
			$.ajax({
				type:"GET",
				url:docApi.Config.Aijiu_Beauty_URL,
				// url:"http://api-sandbox.jiudafu.com/treat/special/topic",
				data:{
					auth:docApi.Config.auth,
					token:token,
					title:title
				},
				dataType:'json',
				success:function(data){
					callback(data);
				}
			});
		}

	}
	$.extend(true, docApi, acount);
}());