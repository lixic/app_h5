$(function(){
	showIntro();
	// 点击介绍，介绍详情展开
	function showIntro(){
		$(".intro h2 button").click(function(){
			if($(this).parent().next().css("display")=="none"){
				$(this).html("X").parent().next().show();
			}else{
				$(this).html("介绍<i>></i>").parent().next().hide();
			}
		})
	}
});