(function () {
    var acount={
		//将测试结果发送至服务器
		toAnalyse:function(resultsStr,token,callback){
			$.ajax({
			    type : "POST",
			    url : docApi.Config.Submit_result_URL,
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
				url:docApi.Config.Last_result_URL,
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
				url:docApi.Config.Xuewei_URL,
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
			    url : docApi.Config.History_result_URL,
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
		}
	}
	$.extend(true, docApi, acount);
}());