var docApi={};
var API_URL="";
if(window.location.href.indexOf("sandbox") > 0) {
	API_URL = "http://api-sandbox.jiudafu.com/";
} else {
	API_URL = "http://api.jiudaifu.com/";
}
docApi.Config={
	auth: "7bb2d6de688dc02bb6b419b17046335d",
	My_rank_URL:API_URL+"ajys/user/level"//我的等级接口
}
