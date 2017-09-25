$(function(){
	var href = window.location.search;
	//	获取token
	var token = href.substring(href.indexOf("?token=") + 7, href.length);
	if(token==""){
		token="2636f17327cb14c743b4c99eb7b00a79";
	}
	const YES_RESULT = 1;
    const NO_RESULT = 0;
    const MAYBE_RESULT =2;
    var isQixu,isYangxu,isYinxu,isTanshi,isShire,isXueyu,isQiyu,isTebing,isPinghe;
    var resultArr=[];
    var maybeArr=[];
    var yesArr=[];

	getAnswer();
	chooseSex();
	checkQues();
	// 选择题目
	function checkQues(){
		$("#question h3").click(function(){
			if($(this).next().css("display")=="none"){
				$(this).css("borderBottom","none").next().css("borderBottom","1px solid #f0f0f0").show();
			}else{
				$(this).css("borderBottom","1px solid #f0f0f0").next().css("borderBottom","none").hide();
			}
		});
	}

	// 将用户的操作记录下来
	function getAnswer(){
		var answerScore=0;
		$(".ques li").click(function(){
			$(this).addClass("checked").siblings().removeClass("checked").parent().prev().css("color","#888");
		})
	}

	// 根据用户选择性别更改题目
	function chooseSex(){
		$("#sex li").click(function(){
			if($(this).html()=="男"){
				$("#special").html("37.您的阴囊部位潮湿吗？");
			}else{
				$("#special").html("37.您带下色黄（白带颜色发黄）吗？")
			}
		});
	}
	// 提醒用户哪些题目没有进行选择
	function checkFinish(){
		if($(".checked").length-1!=($("h3").length)){
			alert("您还有题目未进行答题，请继续答题！");
			$("h3").each(function(){
				if(!$(this).next().children().hasClass("checked")){
					$(this).css("color","red");
				}else{
					$(this).css("color","#888");
				}
			});
		}
	}
	// 显示已完成题数以及总题数
	function show_quesNum(){
		var resultSArr=[];
		var resultsStr="";
		var yet=$(".checked").length-1;
		var all=$("h3").length;
		if(yet==all){
			// 用户完成操作，计算结果，再进行提交数据
			isQixu= getResult(sumScore($(".qixu")),"qixu","气虚型体质");
			isYangxu= getResult(sumScore($(".yangxu")),"yangxu","阳虚型体质");
			isYinxu= getResult(sumScore($(".yinxu")),"yinxu","阴虚型体质");
			isTanshi= getResult(sumScore($(".tanshi")),"tanshi","痰湿型体质");
			isShire= getResult(sumScore($(".shire")),"shire","湿热型体质");
			isXueyu= getResult(sumScore($(".xueyu")),"xueyu","血瘀型体质");
			isQiyu= getResult(sumScore($(".qiyu")),"qiyu","气郁型体质");
			isTebing= getResult(sumScore($(".tebing")),"tebing","特禀型体质");
			isPinghe= getResult(sumScore($(".pinghe")),"pinghe","平和型体质");
			
			if(yesArr.length==0&&maybeArr.length==0){
				resultsStr="";
			}else if(yesArr.length==0 && maybeArr.length!=0){
				resultsStr=maybeArr.join(",");
			}else if(maybeArr.length==0 && yesArr.length!=0){
				resultsStr=yesArr.join(",")
			}else{
				resultsStr=yesArr.join(",")+","+maybeArr.join(",");
			}
			console.log(resultsStr);
			docApi.toAnalyse(resultsStr,token,function(data){
				if(data.error!=0){
					error();
				}else{
					console.log(data);
	    			window.location.href="../bodytest/index.html"
				}
			});
		}else{
			// 此时用户答题未完成不能提交
			if($(".ques-num").length){
				$(".ques-num").remove();
				var $span=$("<span class='ques-num'><i>"+yet+"</i>/<i>"+all+"</i></span>");
				$span.insertAfter($("#question"));
			}else{
				var $span=$("<span class='ques-num'><i>"+yet+"</i>/<i>"+all+"</i></span>");
				$span.insertAfter($("#question"));
			}
		}
	}
	// 服务器请求错误友好提示
	function error(){
		$("body").html("<img src='../img/error.jpg' class='error'/>")
	}
	// 算测试分数
	function sumScore(obj){
		var num=obj.length;
		var sum=0;
		obj.find( $(".checked") ).each(function(){
			sum+=parseInt($(this).attr("data-score"))
		});
		console.log( Math.round(((sum-num)/(num*4))*100) );
		var znum=Math.round(((sum-num)/(num*4))*100)
		resultArr.push(znum);
		console.log(resultArr);
		return znum;
	}

	// 由于平和体质的特殊，所以其他体质测试结果也放入比较
	 function checkOther(setNum){ 
	 	console.log(resultArr);
	 	for(var i=0;i<resultArr.length-1;i++){
	 		if(resultArr[i]>=setNum){
                return false;
            }
            console.log(resultArr);
	 	}
        return true;
    }
	// 根据分数判断体质结果
	function getResult(num,type,name){
		var bool=checkOther(40);
		console.log(bool);
        var result;
        var tizhiName="";
        if(type == 'pinghe'){
            if(num>=60){
                if(checkOther(40)){
                	console.log("第一种");
                    result= MAYBE_RESULT;
                    tizhiName="倾向"+name;
                    maybeArr.push(tizhiName);

                }else if(checkOther(30)){
                    // 其他测试分数在30~40之间的分数，并且平和测试的分数大于60的情况下为平和体质
                    console.log("第2种");
                    result= YES_RESULT;
                    tizhiName=name;
                    yesArr.push(tizhiName);
                }else{
                	console.log("第3种");
                    result= NO_RESULT;
                }
            }else{
                result= NO_RESULT;
            }
        }else{
            if(num>=40){
                //result = "您是"+name;
                result= YES_RESULT;
                tizhiName=name;
                yesArr.push(tizhiName);
            }else if(num <30 ){
                //result = "您不是"+name;
                result= NO_RESULT;
            }else{
                //result = "您有"+name+"的倾向";
                result= MAYBE_RESULT;
                tizhiName="倾向"+name;
                maybeArr.push(tizhiName);
            }
        }
        console.log(tizhiName);
        return tizhiName;
    }
	submit();
	// 点击提交时触发的事件
	function submit(){
		$("#submit").click(function(){
			checkFinish();
			// 确定体质
			show_quesNum();
			// 显示未做题目
		});
	}
});