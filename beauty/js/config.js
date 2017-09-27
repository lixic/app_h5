var docApi={};
var API_URL="";
if(window.location.href.indexOf("sandbox") > 0) {
	API_URL = "http://api-sandbox.jiudafu.com/";
} else {
	API_URL = "http://api.jiudaifu.com/";
}
docApi.Config={
	auth: "7bb2d6de688dc02bb6b419b17046335d",
	Aijiu_Beauty_URL:API_URL+"treat/special/topic"//艾灸美容接口
}
