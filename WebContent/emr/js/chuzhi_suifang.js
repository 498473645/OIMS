/**
 * 显示随访信息对话框
 */
function showFollow(){
	 var div=$("<div id='followed'/>");
	 div.oimsDialog({
			title : "随访时间与注意事项",
			width : 700,
			height : 450,
			drag : false,
			locked :true,
			winType : 4,
			button : null
		});
	 _emr_suifang_last(div);
}

/**
 * 获取随访记录数据
 * @returns
 */
function getSuifang(){
	var data = getJSONData(FIND_SUIFANG_URL,{jiuzhenId:currentVisit.id,tag:Math.random()});
	return data.obj;
}

/**
 * 显示随访信息
 * @param div
 */
function _emr_suifang_last(div){
	var obj=getSuifang();
	var tag = $("<div />").addClass("tabContent").width(div.width()).css({overflow:"hidden","margin":"auto","border":"1px solid #d2d2d2"}).appendTo(div);
	$("<h1 />").text("随访时间").appendTo(tag);
	var suifang_time=$("<div style='height:auto'/>").addClass("inputContent").addClass("suifang").appendTo(tag);
	var div = $('<div style="width:60%;float:left" />').appendTo(suifang_time);//$("<div style='height:auto'/>").addClass("inputContent").addClass("suifang").appendTo(tag);
	var div1= $('<div style="width:39%;float:left;"/>').appendTo(suifang_time);
	var div1_time=$('<div style="text-align:center;" />').height(20).appendTo(div1);
	var p= $("<p />").css({margin:"8px"}).appendTo(div);
	$("<input />").val(1).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px'/>").text("1日后").appendTo(p);
	$("<input />").val(2).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px' />").text("2日后").appendTo(p);
	$("<input />").val(3).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px'/>").text("3日后").appendTo(p);
	$("<input />").val(4).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px'/>").text("4日后").appendTo(p);
	$("<input />").val(5).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px'/>").text("5日后").appendTo(p);
	
	p= $("<p />").css({margin:"8px"}).appendTo(div);
	$("<input />").val(7).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px'/>").text("1周后").appendTo(p);
	$("<input />").val(14).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px'/>").text("2周后").appendTo(p);
	$("<input />").val(21).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px'/>").text("3周后").appendTo(p);
	$("<input />").val(28).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px'/>").text("4周后").appendTo(p);
	
	p= $("<p />").css({margin:"8px"}).appendTo(div);
//	$("<input />").val(30).attr("type","radio").attr("name","time").appendTo(p);
//	$("<span style='margin-right:30px'/>").text("1月后").appendTo(p);
	$("<input />").val(56).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px'/>").text("8周后").appendTo(p);
	$("<input />").val(84).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px'/>").text("12周后").appendTo(p);
	
	p= $("<p />").css({margin:"8px"}).appendTo(div);
	$("<input />").val(182).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px'/>").text("半年后").appendTo(p);
	$("<input />").val(365).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px'/>").text("1年后").appendTo(p);
	
	 p= $("<p />").css({margin:"8px"}).appendTo(div);
	 $("<span />").text("其它指定时间：").appendTo(p);
	 $("<input />").val(0).attr("type","radio").attr("name","time").appendTo(p);
	 $("<input />").attr("name","date").width(88).appendTo(p);
	 $("<span />").text("(YYYY-MM-DD)").appendTo(p);
	 $("<h1/>").text("注意事项").appendTo(tag);
	 
	$("input[name=date]").focus(function(){
		$("input[type=radio][name=time][value=0]").attr("checked",true);
	});
	div=$("<div  style='height:120px' contenteditable=\"true\" hidefocus=\"true\" id=\"zysx_suifang\"  />").addClass("inputContent").addClass("suifang").appendTo(tag);
	if(obj){
		if(obj.zhuyi){
			div.html(obj.zhuyi);
		}
		if(obj.yyrq){
			div1_time.html("<h2>请于:"+formatDate(obj.yyrq.time)+"复诊</h2>");
			var g=getDaysEmr(formatDate(new Date()),formatDate(obj.yyrq.time));
			$("input[name=time][type=radio][value="+g+"]").attr("checked",true);
//			$("input[name=time][value=0]").attr("checked","checked");
//			$("input[name=date]").val(formatDate(obj.yyrq.time));
		}
	}
	
	div = $("<div style='height:71px;padding-top:35px' />").addClass("openbutton").appendTo(tag);
	$("<a><span class=\"advsumit\"></span>提交</a>").click(function(){
		var obj = {jiuzhenId:currentVisit.id,day:$("input[name=time]:checked").val(),yyrq:$("input[name=date]").val(),zysx:$("#zysx_suifang").text()};
		var d = getJSONData(SAVE_SUIFANG_URL,obj,"POST");
		if(d.state){
			$.oimsSucc('随访提交成功！');
			$(".opentitle .closediv a").click();
		}
	}).appendTo(div);
	$("<a><span class=\"reset\"></span>重填</a>").click(function(){
		$("input[name=time][selected=selected]").removeAttr("selected");
		$("input[name=date]").val("");
		$("#zysx_suifang").html("");
	}).appendTo(div);
	div1.height(suifang_time.height());
	div1_time.css({"margin-top":(div1.height()-div1_time.height())/2});
	$("input[name='time']").click(function(){
		var val=$(this).val();
		if(val==0){
			div1_time.html("");
			return;
		}
		var time=getFollowTime(val);
		if(time){
			div1_time.html("<h2>请于:"+time+"复诊</h2>");
		}
	});
}

function getFollowTime(n){
	var date=new Date();
	var s=date.getTime()+n*24*60*60*1000;
	return formatDate(new Date(s));
}