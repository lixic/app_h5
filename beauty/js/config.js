var docApi={};
var API_URL="";
if(window.location.href.indexOf("sandbox") > 0) {
	API_URL = "http://api-sandbox.jiudafu.com/";
} else {
	API_URL = "http://api.jiudaifu.com/";
}
docApi.Config={
	auth: "7bb2d6de688dc02bb6b419b17046335d",
	Last_result_URL: API_URL + "user/latest/result", //最新测试结果接口
	History_result_URL:API_URL +"user/body/results",//历史记录测试结果接口
	Submit_result_URL:API_URL +"user/body/analyse",//提交测试结果接口
}
