(function () {
    var acount={
		//将测试结果发送至服务器
		toAnalyse:function(resultsStr,token){
			$.ajax({
				async: false,
			    type : "POST",
			    url : "http://api-sandbox.jiudafu.com/user/body/analyse",
			    data:{
			    	auth:"7bb2d6de688dc02bb6b419b17046335d",
			    	token:"7d5a88fffb992801a90d5e6cabb3fc67",
			    	results:resultsStr
			    },
			    dataType : 'json',
			    success : function(data){
			    	console.log(data);
	    			window.location.href="../rank/result.html"
			   }
			});
		},
		// 获取最新测试结果
		getResult:function(token){
			var result="";
			$.ajax({
				async:false,
				type:"GET",
				url:"http://api-sandbox.jiudafu.com/user/latest/result",
				data:{
					auth:"7bb2d6de688dc02bb6b419b17046335d",
					token:"7d5a88fffb992801a90d5e6cabb3fc67"
				},
				success : function(data){
			    	result=data.data.results;
			    	console.log(result);
			   	}
			});
			return result;
		},
		// 获取 取穴疗程列表
		getQuxue:function(keyword,token){
			var xueweiArr=[];
			$.ajax({
				async:false,
				type:"GET",
				url:"http://api-sandbox.jiudafu.com/treat/plan/search",
				data:{
					auth:"7bb2d6de688dc02bb6b419b17046335d",
					token:"7d5a88fffb992801a90d5e6cabb3fc67",
					keyword:keyword
				},
				success:function(data) {
					xueweiArr=data.data;
					console.log(data.data);
				}
			});
			return xueweiArr;
		},
		// 获取历史记录
		getHistory:function(token){
			var record=[];
			$.ajax({
				async: false,
			    type : "GET",
			    url : "http://api-sandbox.jiudafu.com/user/body/results",
			    data:{
			    	auth:"7bb2d6de688dc02bb6b419b17046335d",
			    	token:"7d5a88fffb992801a90d5e6cabb3fc67"
			    },
			    dataType : 'json',
			    success : function(data){
			    	record=data.data;
			    }
			});
			return record;
		},
		// 我的等级获取数据
		getRanks:function(){
			var rankData=[];
			$.ajax({
				async: false,
			    type : "GET",
			    url : "http://api-sandbox.jiudafu.com/ajys/user/level",
			    data:{
			    	auth:"7bb2d6de688dc02bb6b419b17046335d",
			    	token:"7d5a88fffb992801a90d5e6cabb3fc67"
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