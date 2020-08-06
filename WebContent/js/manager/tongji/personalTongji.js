var tjPersonalTJ_url='/publish/tj/tjPersonalTJ.htm';

function showPersonalChart(o){
	importJS('/js/manager/tongji/tongjiCommon.js');
	importJS("/js/highcharts.js") ;
	var data = getCheckBoxValue();
	if(!o){
		if(data.length!=1){
			$.oimsAlert("请选择一条数据");
			return;
		}
	}
	
//	var d = data[0];
//	console.dir(d);
	 var div=$("<div id='personal' style='padding:10px'/>");
	 div.oimsDialog({
			title : "个人工作量统计",
			width : 700,
			height : 500,
			drag : false,
			locked :true,
			winType : 4,
		});
	var chartPerson =  $("<div />").attr("id","personChart").attr("class","personChart").appendTo(div);
	var time_div=$("<div />").appendTo(chartPerson);
	time_div.append("开始时间:<input id='startDate'/>").append("结束时间:<input id='endDate' />").append("<a class='search' style='float:right'>查询</a>");
	var chartPersonPic = $("<div />").attr("id","personChartTJ").attr("class","personChartTJ").css({"overflow":"auto"}).appendTo(chartPerson);
	var width = 680;
	$("#personChartTJ").width(width).height(400);
	calendarFun("startDate");
	calendarFun("endDate");
	$("#startDate").val(formatDate(new Date()));
	$("#endDate").val(formatDate(new Date()));
	var a=$("#personal a.search").click(function(){
		showPersonanChartPic(o);
	});
	a.click();
}
function showPersonanChartPic(o){
	var data = getCheckBoxValue();
	var d;
	if(!o){
		if(data.length!=1){
			$.oimsAlert("请选择一条数据");
			return;
		}
		 d= data[0];
	}
	
	if(!$.trim($("#startDate").val())||!$.trim($("#endDate").val())){
		$.oimsAlert("选择开始或结束日期");
		return;
	}
	
	var tjPersonalTJ_data = getJSONData(tjPersonalTJ_url,{tag:Math.random(),gonghao:!o?d.gh:currentStaff.gonghao,startDate:$("#startDate").val(),endDate:$("#endDate").val()},"POST").obj;
	//var tjPersonalTJ_data=[{name:'门诊',y:10},{name:'手术量 ',y:300},{name:'检查量',y:400}];
	//showColumn("#personChartTJ","个人工作量统计",tjPersonalTJ_data);
	$("#personChartTJ").empty();
	var table=$("<table cellspacing=1 cellpadding=1 border=1 />").appendTo($("#personChartTJ"));
	var tr=$("<tr/>").appendTo(table);
	var td=$("<td style='text-align:left;font-size:17px;' colspan=2/>").appendTo(tr);
	td.html("<strong>门诊</strong>");
	tr=$("<tr/>").appendTo(table);
	td=$("<td/>").appendTo(tr);
	td.text("门诊接诊");
	td=$("<td/>").appendTo(tr);
	td.text(tjPersonalTJ_data.mz);
	tr=$("<tr/>").appendTo(table);
	td=$("<td style='text-align:left;font-size:17px;' colspan=2/>").appendTo(tr);
	td.html("<strong>检查</strong>");
	$.each(tjPersonalTJ_data.jc,function(i,n){
		tr=$("<tr/>").appendTo(table);
		td=$("<td/>").appendTo(tr);
		td.text(n.name);
		td=$("<td/>").appendTo(tr);
		td.text(n.data);
	});
	tr=$("<tr/>").appendTo(table);
	td=$("<td style='text-align:left;font-size:17px;' colspan=2/>").appendTo(tr);
	td.html("<strong>手术</strong>");
	$.each(tjPersonalTJ_data.ss,function(i,n){
		tr=$("<tr/>").appendTo(table);
		td=$("<td/>").appendTo(tr);
		td.text(n.name);
		td=$("<td/>").appendTo(tr);
		td.text(n.num);
	})
	
}