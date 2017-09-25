$(function(){
	var href = window.location.search;
	//	获取token
	var token = href.substring(href.indexOf("?token=") + 7, href.length);
	docApi.getRanks(token,function(data){
		if(data.error!=0){
			error();
		}else{
			rankHTML(data.data[0],data.data[1]);
		}
	})
	// 服务器请求错误友好提示
	function error(){
		$("body").html("<img src='../img/error.jpg' class='error'/>")
	}
	// 等级展示
	function rankHTML(rank,days){
		// 特权数组
		var tequan=["一次性获得灸币20个！","一次性获得灸币300个！","每月18元艾绒片优惠券一张！","每月30元艾绒片优惠券一张！每月18元艾绒片优惠券一张！","以旧换新I9-4(仅一次)每月30元艾绒片优惠券一张！每月18元艾绒片优惠券一张！"];
		// 降级规定
		var jiangji=["达到该等级后，累计3天不艾灸则降回上个等级","达到该等级后，累计5天不艾灸则降回上个等级","达到该等级后，累计7天不艾灸则降回上个等级","达到该等级后，累计15天不艾灸则降回上个等级"]
		// 需要累计的艾灸天数
		var num;
		// 还剩下的累计时间
		var rest_num;
		$("#rank_type").html(rank);
		$("#continuity").html(days);
		if(rank=="艾灸学徒"){
			num=10;
			var jdWidth=(parseInt(days)/num)*100+"%";
			$(".pri-tit h5").html(tequan[0]);
			$(".pri-tit").find("span").hide();
			$(".one").addClass("end").siblings("span").removeClass("end");
			$(".one").find("span").css("width",(parseInt(days)/num)*100+"%");
			rest_num=num-days;
			$(".rest-days").html(rest_num);
		}else if(rank="艾灸达人"){

			num=20;
			$(".pri-tit h5").html(tequan[1]);
			$(".pri-tit span").html(jianji[0]);
			$(".two").addClass("end").siblings("span").removeClass("end");
			$(".two").find("span").css("width",(parseInt(days)/num)*100+"%")
			rest_num=num-days;
			$(".rest-days").html(rest_num);
		}else if(rank="艾灸专家"){
			num=60;
			$(".pri-tit h5").html(tequan[2]);
			$(".pri-tit span").html(jianji[1]);
			$(".three").addClass("end").siblings("span").removeClass("end");
			$(".three").find("span").css("width",(parseInt(days)/num)*100+"%")
			rest_num=num-days;
			$(".rest-days").html(rest_num);
		}else if(rank="艾灸教授"){
			num=180;
			$(".pri-tit h5").html(tequan[3]);
			$(".pri-tit span").html(jianji[2]);
			$(".four").addClass("end").siblings("span").removeClass("end");
			$(".four").find("span").css("width",(parseInt(days)/num)*100+"%")
			rest_num=num-days;
			$(".rest-days").html(rest_num);
		}else if(rank="艾灸大师"){
			$(".pri-tit h5").html(tequan[4]);
			$(".pri-tit span").html(jianji[3]);
			// num=10;
			// rest_num=num-days;
			$(".rest-days").html(rest_num);
		}
		$(".pri-tit span").html()
	}
});
