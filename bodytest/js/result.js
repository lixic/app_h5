$(function(){
	var href = window.location.search;
	//	获取token
	var token = href.substring(href.indexOf("?token=") + 7, href.length);

	$("#re_test").attr("href","test.html?token="+token);
	$("#his_list").attr("href","record.html?token="+token);
	
	// 获取体质结果接口数据
	docApi.getResult(token,function(data){
	  	if(data.error!=0){
    		error();	    	
    	}else{
    		console.log(data);
	    	getTestResult(data.data.results);
	    	docApi.getQuxue(data.data.results,token,function(data){
	    		if(data.error!=0){
	    			error();
	    		}else{
	    			quxueHTML(data.data);
	    		}
	    	});
    	}
	});
	// 服务器请求错误友好提示
	function error(){
		$("body").html("<img src='../img/error.jpg' class='error'/>")
	}
	// 体质结果模板
	function getTestResult(result){
		var firstResultHtml=splitResults(result);
		$("#first-result").html(firstResultHtml);
		if(result.indexOf(",")==-1 && result.indexOf("。")==-1){
			$("#all-result").html("");
		}else{
			$("#all-result").html(result);
		}
	}

	// 获取测试结果的第一种体质
	function splitResults(result){
		var str="";
		var arr=[];
		console.log(result);
		console.log(result.indexOf(","));
		console.log(result.indexOf("。"));
		if(result.indexOf(",")==-1 && result.indexOf("。")==-1){
			str=result;
			console.log("第一种");
		}else if(result.indexOf(",")==-1 && result.indexOf("。")!=-1){
			arr=result.split("。");
			str=arr[0];
			console.log("第2种");
		}else if(result.indexOf("。")!=-1 && result.indexOf("。")<result.indexOf(",")){
			arr=result.split("。");
			str=arr[0];
			console.log("第3种");
		}else{
			arr=result.split(",");
			str=arr[0];
			console.log("第4种");
		}
		return str;
	}

	

	// 取穴模板
	function quxueHTML(resultArr){
		console.log(resultArr.length);
		var xueweihtml="";
		var jiu_href = "ajzbb:///";
		for(var i=0;i<resultArr.length;i++){
			if(resultArr[i].xuewei==""){
				resultArr[i].xuewei=resultArr[i].remark;
			}
			// 取穴位字符
			var xueweiStr=resultArr[i].xuewei.replace(/[^\u4e00-\u9fa5|,]+/g,',');
			xueweiStr=xueweiStr.substring(xueweiStr.length-1,1);
			xueweihtml+="<div class='course'>"+
							"<a href="+jiu_href+resultArr[i].id+">"+
								"<h3>"+resultArr[i].name+"</h3>"+
								"<p class='xuewei'>取穴："+xueweiStr+"</p>"+
							"</a>"+
						"</div>";
		}
		$(".xuewei-box").html(xueweihtml);
	}
	// 体质测试说明展开叠起特效
	function toLong(){
		$("button").click(function(){
			if($(this).html()=="点击收起"){
				$(this).html("点击展开").next().css({"height":"0px","lineHeight":"0rem"});
			}else{
				$(this).html("点击收起").next().css({"height":"auto","lineHeight":"2rem"});
			}
		});
	}
	toLong();
});