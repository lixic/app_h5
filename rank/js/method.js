(function () {
    var acount={
		// 我的等级获取数据
		getRanks:function(token,callback){
			var rankData=[];
			$.ajax({
			    type : "GET",
			    url : "http://api-sandbox.jiudafu.com/ajys/user/level",
			    data:{
			    	auth:docApi.Config.auth,
			    	token:"7d5a88fffb992801a90d5e6cabb3fc67"
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