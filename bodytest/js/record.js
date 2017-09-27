$(function(){
	var href = window.location.search;
	//	获取token
	var token = href.substring(href.indexOf("?token=") + 7, href.length);
	// if(token==""){
	// 	token="2636f17327cb14c743b4c99eb7b00a79";
	// }

	// 获取接口取得历史记录
	docApi.getHistory(token,function(data){
		if(data.error!=0){
			error();
		}else{
			console.log(data.data.length);
			getRecord(data.data);
		}
	});
	// 服务器请求错误友好提示
	function error(){
		$("body").html("<img src='../img/error.jpg' class='error'/>")
	}
	// 时间格式转换
	function timeFormat(time){  
      	Date.prototype.toLocaleString = function() {
          return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() +" "+ this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds() ;
    	};
	    var unixTimestamp = new Date( time*1000 ) ;
		commonTime = unixTimestamp.toLocaleString();
		return commonTime;         
	} 
	// 历史记录模板
	function getRecord(record){
		var recordHTML="";
		console.log(record);
		for(var i=0;i<record.length;i++){
			recordHTML+="<li>"+
				"<span class='record-time'>"+timeFormat(record[i].time)+"</span>"+
				"<p class='record-type'>体质类型：<span>"+record[i].results+"</span></p>"+
			"</li>";
		}
		$(".record").append(recordHTML);
	}
});