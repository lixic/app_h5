$(function(){
	var href = window.location.search;
	//	获取token
	var token = href.substring(href.indexOf("&token=") + 7, href.indexOf("&title="));
	var title = href.substring(href.indexOf("&title=") + 7, href.length);
	title=decodeURI(title);
	console.log(token);
	console.log(title);
	docApi.getBeautyList(token,title,function(data){
		if(data.error!=0){
			error();
		}else{
			console.log(data.data);
			beautyHTML(data.data.click,data.data.content,data.data.treats);
		} 
	});
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
	// 艾灸美容专题模板
	function beautyHTML(click,titleStr,obj){
		var html="";
		$("#read_data").html(click);
		var titleArr=titleStr.split("、");
		console.log(titleArr);

		// 获得键值
		function getKeyVal(key,obj){
			// alert(obj.length);
			var keys=[];
			var vals=[];
			for(var key in obj){    
			    keys.push(key);    
			    vals.push(obj[key]);//取得value     
		    }
		    // console.log(vals); 
		    return vals;
		}
		var result_arr=getKeyVal("id",obj);
		
		for(var i=0;i<result_arr.length;i++){
			// alert(result_arr.length)
			var moxiArr = $.parseJSON(result_arr[i].moxi);
			var xueweiArr=[];
			for(var j=0;j<moxiArr.length;j++){
				for(var k=0;k<getKeyVal("acupoint",moxiArr[j]).length;k++){
					xueweiArr.push(getKeyVal("acupoint",moxiArr[j])[k].acupoint);
				}
			}
			var xueweiArr=unique(xueweiArr);
			if(xueweiArr.join("、")!==""){
				var xueweiStr=xueweiArr.join("、");
			}else{
				var xueweiStr="";
			}
			
			var jiu_href = "ajzbb:///";
			html+="<section>"+
						"<h3>"+result_arr[i].name+"<a href="+jiu_href+result_arr[i].id+">马上调理</a></h3>"+
						"<p>"+result_arr[i].gaishu+"</p>"+
						"<h4><div>艾灸取穴："+xueweiStr+"</div></h4>"+
						"<span>"+result_arr[i].attend+"人参与</span><i>|</i><span>"+result_arr[i].help+"人觉得有用</span>"+
					"</section>";
		}
		$(".main").append(html);
	}
	function unique(array){
	    var n = [];//一个新的临时数组
	    //遍历当前数组
	    for(var i=0; i<array.length; i++){
	        //如果当前数组的第i已经保存进了临时数组，那么跳过，
	        //否则把当前项push到临时数组里面
	        if(n.indexOf(array[i]) == -1){
	            n.push(array[i]);
	        }
	    }
	    return n;
	}
	// 服务器请求错误友好提示
	function error(){
		$("body").html("<img src='img/error.jpg' class='error'/>");
	}
});