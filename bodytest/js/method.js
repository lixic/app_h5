(function () {
    var acount={
		//将测试结果发送至服务器
		toAnalyse:function(resultsStr,token,callback){
			$.ajax({
			    type : "POST",
			    url : "http://api-sandbox.jiudafu.com/user/body/analyse",
			    data:{
			    	auth:docApi.Config.auth,
			    	token:token,
			    	results:resultsStr
			    },
			    dataType : 'json',
			    success : function(data){
	    			callback(data);
			   }
			});
		},
		// 获取最新测试结果
		getResult:function(token,callback){
			$.ajax({
				type:"GET",
				url:"http://api-sandbox.jiudafu.com/user/latest/result",
				data:{
					auth:docApi.Config.auth,
					token:token
				},
				success : function(data){
					callback(data);
			   	}
			});
		},
		// 获取 取穴疗程列表
		getQuxue:function(keyword,token,callback){
			// var xueweiArr=[];
			$.ajax({
				// async:false,
				type:"GET",
				url:"http://api-sandbox.jiudafu.com/treat/plan/search",
				data:{
					auth:docApi.Config.auth,
					token:token,
					keyword:keyword
				},
				success:function(data) {
					callback(data);
				}
			});
		},
		// 获取历史记录
		getHistory:function(token,callback){
			// var record=[];
			$.ajax({
				// async: false,
			    type : "GET",
			    url : "http://api-sandbox.jiudafu.com/user/body/results",
			    data:{
			    	auth:docApi.Config.auth,
			    	token:token
			    },
			    dataType : 'json',
			    success : function(data){
			    	// record=data.data;
			    	callback(data);
			    }
			});
			// return record;
		},
		// 我的等级获取数据
		getRanks:function(){
			var rankData=[];
			$.ajax({
				async: false,
			    type : "GET",
			    url : "http://api-sandbox.jiudafu.com/ajys/user/level",
			    data:{
			    	auth:docApi.Config.auth,
			    	token:token
			    },
			    dataType:'json',
			    success:function(data){
			    	rankData=data.data;
			    }
			});
			return rankData;
		}
	}
	$.extend(true, docApi, acount);
}());