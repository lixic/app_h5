(function () {
    var acount={
		// 我的等级获取数据
		getRanks:function(token,callback){
			var rankData=[];
			$.ajax({
			    type : "GET",
			    url : docApi.Config.My_rank_URL,
			    data:{
			    	auth:docApi.Config.auth,
			    	token:token
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