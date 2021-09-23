var tjBaoGaoNumByDoctor_url = "/publish/tj/tjBaoGaoNumByDoctor.htm"; //统计检查医生和当天出的报告的数量
var tjBaoGaoNumAndWeek_url = "/publish/tj/tjBaoGaoNumAndWeek.htm";  //检查医生和一周出的报告的数量
var tjBaoGaoNumByDoctorAndJcxm_url = "/publish/tj/tjBaoGaoNumByDoctorAndJcxm.htm"; //统计检查医生和当天出的各个报告的数量
var tjBaoGaoNumByJcxm_url = "/publish/tj/tjBaoGaoNumByJcxm.htm"; //不同检查项目出的报告的数量
var findAllJcxm_url = "/publish/jcxm/findAllJcxm.htm"; // 查询所有检查项目信息
var getJianChaDoctorByBumenAndQuanxian_url = "/publish/yuangong/getJianChaDoctorByBumenAndQuanxian.htm"; //获取所有的检查医生权限的医生
var getKaiDanDoctorByQuanxian_url = "/publish/yuangong/getKaiDanDoctorByQuanxian.htm"; //获取所有的门诊医生权限的医生
var exportExecel_url = "/publish/tj/exportExecel.htm";  //检查医生导出execel表格
var tjMzGongZuoLiang_url = "/publish/tj/tjMzGongZuoLiang.htm";//门诊工作量统计
var tjBLFinishNumByTongJi_url = "/publish/tj/tjBLFinishNumByTongJi.htm";//门诊病历完成情况统计
var exportMzysExecel_url = "/publish/tj/exportMzysExecel.htm"; //导出门诊医生工作量数据
// 初始化界面
function showGzlTj() {
	
	var div_tablabel = $("<div/>").attr("id", "div_tablabel").attr("class","tablabel").appendTo("#right");
	var divTJ = $("<div/>").attr("id", "divTJ").attr("class", "tab_hide").attr("onclick", "tab_JSYClick()").appendTo(div_tablabel);
	var divTJ_html = "<span>技术员</span>";
	$(divTJ_html).appendTo(divTJ);

	var divMZ = $("<div/>").attr("id", "divMZ").attr("class", "tab_hide").attr("onclick", "tab_MZYSClick()").appendTo(div_tablabel);
	var divMZ_html = "<span>门诊医生</span>";
	$(divMZ_html).appendTo(divMZ);
	showJSYTongJi();
	showMZYSTongJi();
	var chartShowRight = $("<div />").attr("id","chartShowRight").attr("style","float:right;").appendTo("#right");
	showSearch(chartShowRight);
	init_opendiv();
	tab_JSYClick();
//	tab_MZYSClick();
	JSYDataInit();
	MZYSDataInit();
}

/**
 * 查询初始化
 */
function init_opendiv(){
	var table = "<div id ='findTitle' class='findTitle'>统计查询</div>" +
			"<table width='100%' border='0'>" +
			"<tr>" +
			"<td colspan='2' align='center'>" +
			"<input type='radio' name='RadioGroup1' value='ny' id='RadioGroup1_0' checked='checked' />年月" +
			"<input type='radio' name='RadioGroup1' value='sj' id='RadioGroup1_1' />时间" +
			"</td>" +
			"</tr>" +
			"<tr>" +
			"<td width='35%'>" +
			"<div align='right' id='fTime1_div'>年份:</div>" +
			"</td>" +
			"<td width='65%'>" +
			"<select id='fTime1_select' style='width:100%;' /><input id='fTime1_input' style='width:100%;'/>" +
			"</td>" +
			"</tr>" +
			"<tr>" +
			"<td>" +
			"<div align='right'  id='fTime2_div'>月份:</div>" +
			"</td>" +
			"<td>" +
			"<select id='fTime2_select' style='width:100%;' /><input id='fTime2_input' style='width:100%;'/>" +
			"</td>" +
			"</tr>" +
			"<tr name='jcxm'>" +
			"<td colspan='2'>检查项目：</td>" +
			"</tr>" +
			"<tr name='jcxm'><td colspan='2'><div class='lilist_div' id = 'jcxms'></div></td></tr>" +
			"<tr name='doctors'><td colspan='2'>检查医生：</td></tr>" +
			"<tr name='doctors'><td colspan='2'><div class='lilist_div' id = 'doctors' style='height:100px;'></div></td></tr>" +
			"<tr name='mzDoctors'><td colspan='2'>门诊医生：</td></tr>" +
			"<tr name='mzDoctors'><td colspan='2'><div class='lilist_div' id = 'mzDoctors' style='height:150px;'></div></td></tr>" +
			"</table>"+
			"<div class='buttonsytle1'><a id='a_btn_report'><span class='report'></span>生成报表</a><a id='a_btn_look'><span class='view'></span>页面查看</a></div>"
			$(table).appendTo("#div_openimg");
	calendarFun("fTime1_input",-140);
	calendarFun("fTime2_input",-140);
	//单选按钮的选择切换
	tj_redioSelect();
	//初始化月份中的年月
	tj_markYear("#fTime1_select");
	tj_markMonth("#fTime2_select");
	
	//查询所有的检查项目
	var findAllJcxm_data = getJSONData(findAllJcxm_url, {
		tag : Math.random()
	}, "post");
	if(findAllJcxm_data.state!=null&&findAllJcxm_data.obj.length>0){
		var ul = $("<ul />").appendTo("#jcxms");
		$.each(findAllJcxm_data.obj,function(index,data){
			$(" <li title='"+data.xmmc+"'><input type='checkbox' name='jcxmId' id='jcxmId' value='"+data.id+"' /><span>"+data.xmmc+"</span></li>").appendTo(ul);
		});
	}
	//查询所有的检查医生
	var getJianChaDoctorByBumenAndQuanxian_data = getJSONData(
			getJianChaDoctorByBumenAndQuanxian_url, {// 获取具有检查权限的医生
				tag : Math.random()
			}, "post");
	if (getJianChaDoctorByBumenAndQuanxian_data.state&&getJianChaDoctorByBumenAndQuanxian_data.obj.length>0) {
		var table_doctors = $("<table />").appendTo("#doctors");
		var tr_doctors;
		var yuangonglist = getJianChaDoctorByBumenAndQuanxian_data.obj;
		$.each(yuangonglist, function(i, yuangong) {
			if(i%3==0)
				tr_doctors = $("<tr/>").appendTo(table_doctors);
			var td_doctors = $("<td align='left' />").appendTo(tr_doctors);
			$(
					"<input type='checkbox'  name='bg_doctor' value='"
							+ yuangong.gonghao + "'/>").appendTo(td_doctors);
			$("<label >" + yuangong.xingming + "</label><br>").appendTo(td_doctors);
		});
	}
	//查询所有的门诊医生
	var getKaiDanDoctorByQuanxian_data = getJSONData(
			getKaiDanDoctorByQuanxian_url, {// 获取具有检查权限的医生
				tag : Math.random()
			}, "post");
	if (getKaiDanDoctorByQuanxian_data.state&&getKaiDanDoctorByQuanxian_data.obj.length>0) {
		var table_doctors = $("<table />").appendTo("#mzDoctors");
		var tr_doctors;
		var yuangonglist = getKaiDanDoctorByQuanxian_data.obj;
		$.each(yuangonglist, function(i, yuangong) {
			if(i%3==0)
				tr_doctors = $("<tr/>").appendTo(table_doctors);
			var td_doctors = $("<td align='left' />").appendTo(tr_doctors);
			$(
					"<input type='checkbox'  value='"
					+ yuangong.gonghao + "'/>").appendTo(td_doctors);
			$("<label >" + yuangong.xingming + "</label><br>").appendTo(td_doctors);
		});
	}
}

/**
 * 显示技术员统计
 */
function showJSYTongJi(){
	//显示内容
	var divTop = $("<div />");
	var dayChart = $("<div />").attr("id","dayChart").attr("class","divChart").appendTo(divTop);
	var weekChart = $("<div />").attr("id","weekChart").attr("class","divChart").appendTo(divTop);
	var chartShowJSY =  $("<div />").attr("id","chartShowJSY").attr("class","chartShowCount").attr("style","width:100%;").appendTo("#right").append(divTop);
//	var monthChart = $("<div />").attr("id","monthChart").attr("class","monthChart").appendTo(chartShowJSY);
	$(".divChart").width(function(){
		return ($(".title").width()-15)/2;
	}).height("auto");
}
function JSYDataInit(){
	// 显示当天的数据
	var tjBaoGaoNumByDoctor_data = getJSONData(tjBaoGaoNumByDoctor_url, {
		timeType : 'sj',
		fTime1 : getDateNow(),
		fTime2 : getDateNow(),
		tag : Math.random()
	}, "POST");
	showPie("#dayChart", "今日报告工作量", tjBaoGaoNumByDoctor_data.obj,showJcxmNumclickPie);
	//显示本月的数据
	var tjBaoGaoNumAndWeek_data = getJSONData(tjBaoGaoNumAndWeek_url,{
		tag : Math.random()
	},"POST");
	showPie("#weekChart", "本周报告工作量", tjBaoGaoNumAndWeek_data.obj,showJcxmNumclickPie);
	
//	var date = new Date();
//	var tjBaoGaoNumByDoctorAndJcxm_data = getJSONData(tjBaoGaoNumByDoctorAndJcxm_url, {
//		timeType : '',
//		fTime1 : date.getFullYear(),
//		fTime2 : date.getMonth()+1,
//		tag : Math.random()
//	}, "POST");
//	showColumnAndType("#monthChart", "本月报告工作量",tjBaoGaoNumByDoctorAndJcxm_data.obj.columnData);
}
function tab_JSYClick(){
	//tab显示隐藏
	$("#divTJ").removeClass("tab_hide").addClass("tab_show").siblings("div").removeClass("tab_show").addClass("tab_hide");
	$("#chartShowJSY").show();
	$("#chartShowMZYS").hide();
	$("table tr[name='mzDoctors']").hide();
	$("table tr[name='doctors']").show();
	$("table tr[name='jcxm']").show();

	$("#a_btn_report").show().unbind( "click" ).click(function(){
		var exportExecel_data = getJSONData(exportExecel_url,tj_searchData(), "POST");
		if(exportExecel_data.state){
			location.href = contextPath + exportExecel_data.obj;
		}else{
			$.oimsError("导出失败！");
		}
	});
	$("#a_btn_look").show().unbind( "click" ).click(function(){
		$("#chartShowJSY").height("auto").html("");
		var tjBaoGaoNumByDoctorAndJcxm_data = getJSONData(tjBaoGaoNumByDoctorAndJcxm_url,tj_searchData(), "POST");
		showColumnAndType("#chartShowJSY", "报告工作量",tjBaoGaoNumByDoctorAndJcxm_data.obj.columnData);
	});
}

function showJcxmNumclickPie(){
	var div = $("<div id='tjJcxm' style=''></div>");
	div.oimsDialog({
//		icon : "add",
		title : "展示检查详细信息",
		width : 700,
		height : 450,
		drag : false,// 是否可以拖动窗口
		locked : true,
		winType : 4,
		button : null
	});
	var searchData = event.point.searchData;
	var tjBaoGaoNumByJcxm_data = getJSONData(tjBaoGaoNumByJcxm_url, {
		timeType : searchData.timeType,
		fTime1 : searchData.fTime1,
		fTime2 : searchData.fTime2,
		doctors : event.point.gonghao,
		jcxms:searchData.jcxms,
		tag : Math.random()
	}, "POST");
	showColumn("#tjJcxm", "展示检查详细信息", tjBaoGaoNumByJcxm_data.obj.seriesData);
}













/**
 * 显示门诊医生统计
 */
function showMZYSTongJi(){
	var chartShowMZYS = $("<div />").attr("id","chartShowMZYS").attr("class","chartShowCount").attr("style","width:90%;").appendTo("#right");
	$("<div />").attr("id","doctorJieZhen").attr("class","mzChaetDiv").appendTo(chartShowMZYS);
	$("<div />").attr("id","bingliFinish").attr("class","mzChaetDiv").appendTo(chartShowMZYS);
//	var chartShowRight = $("<div />").attr("id","chartShowRight").attr("style","float:right;").appendTo("#right");
	$(".mzChaetDiv").width(function(){
		return $(".title").width()-5;
	}).height("auto");
}

function tab_MZYSClick(){
	//tab显示隐藏
	$("#divMZ").removeClass("tab_hide").addClass("tab_show").siblings("div").removeClass("tab_show").addClass("tab_hide");
	$("#chartShowJSY").hide();
	$("#chartShowMZYS").show();
	$("table tr[name='mzDoctors']").show();
	$("table tr[name='doctors']").hide();
	$("table tr[name='jcxm']").hide();
	$("#a_btn_report").hide();
	var tjMzGongZuoLiang_data,tjBLFinishNumByTongJi_data;
	$("#a_btn_look").show().unbind( "click" ).click(function(){
		tjMzGongZuoLiang_data = getJSONData(tjMzGongZuoLiang_url, tj_searchData(), "POST");
		showColumnAndType("#doctorJieZhen", "门诊医生接诊情况",tjMzGongZuoLiang_data.obj);
		tjBLFinishNumByTongJi_data = getJSONData(tjBLFinishNumByTongJi_url, tj_searchData(), "POST");
		showColumnAndType("#bingliFinish", "门诊医生病历完成情况",tjBLFinishNumByTongJi_data.obj);
	});
	
	$("#a_btn_report").show().unbind( "click" ).click(function(){
		//var exportMzysExecel_data = getJSONData(exportMzysExecel_url,tj_searchData(), "POST");
		var exportMzysExecel_data = getJSONData(exportMzysExecel_url,{mzgzltj:JSON.stringify(tjMzGongZuoLiang_data.obj),blwctj:JSON.stringify(tjBLFinishNumByTongJi_data.obj)}, "POST");
		if(exportMzysExecel_data.state){
			location.href = contextPath + exportMzysExecel_data.obj;
		}else{
			$.oimsError("导出失败！");
		}
	});
	
}
function MZYSDataInit(){
	// 显示当天的数据
	var tjMzGongZuoLiang_data = getJSONData(tjMzGongZuoLiang_url, {
		timeType : 'sj',
		fTime1 : getDateNow(),
		fTime2 : getDateNow(),
		tag : Math.random()
	}, "POST");
	showColumnAndType("#doctorJieZhen", "今天门诊医生接诊情况",tjMzGongZuoLiang_data.obj);
	var tjBLFinishNumByTongJi_data = getJSONData(tjBLFinishNumByTongJi_url, {
		timeType : 'sj',
		fTime1 : getDateNow(),
		fTime2 : getDateNow(),
		tag : Math.random()
	}, "POST");
	showColumnAndType("#bingliFinish", "今天门诊医生病历完成情况",tjBLFinishNumByTongJi_data.obj);
}


//function showPie(div, titleText, data){
//	$(div).highcharts({
//							chart : {
//							type : 'pie',
//						},
//						title : {
//							text : titleText
//						},
//						tooltip : {
//							pointFormat : '数量: <b>{point.y}</b>'
//						},
//						plotOptions : {
//							pie : {
//								allowPointSelect : true,
//								cursor : 'pointer',
//								dataLabels : {
//									enabled : true,
//									format : '<b>{point.name}</b><br/>   {point.percentage:.1f} % ',
//									style : {
//										color : (Highcharts.theme && Highcharts.theme.contrastTextColor)
//												|| 'black'
//									}
//								},
//								events : {
//									click : function(event) {
//										var div = $("<div id='tjJcxm' style='width:90%;height:380px;border:red 1px solid;'></div>");
//										div.oimsDialog({
////											icon : "add",
//											title : "展示检查详细信息",
//											width : 700,
//											height : 420,
//											drag : false,// 是否可以拖动窗口
//											locked : true,
//											winType : 4,
//											button : null
//										});
//										var tjBaoGaoNumByJcxm_data = getJSONData(tjBaoGaoNumByJcxm_url, {
//											timeType : 'sj',
//											fTime1 : '2014-11-17',
//											fTime2 : '2014-11-23',
//											doctors : event.point.gonghao,
//											tag : Math.random()
//										}, "POST");
//										showColumn1("#tjJcxm", "展示检查详细信息", tjBaoGaoNumByJcxm_data.obj);
////										alert(event.point.name);
////										alert(event.point.gonghao);
//									}
//								}
//
//							}
//						},
//						series : [ {
//							type : 'pie',
//							name : '出报告的医生',
//							data : data
//						} ]
//					});
//}
//
//function showColumn(div, titleText,data){
//	 $(div).highcharts({
//         chart: {
//             type: 'column'                    //图表类型
//         },
//         title: {
//             text: titleText      //标题
//         },
//         xAxis: {
//         	title:{
//         		text:""
//         	},
//            categories:data.xAxis  //X轴数据列
//         },
//         yAxis: {
//             min: 0,
//             title: {
//                 text: 'Total fruit consumption'               //
//             }
//         },
//         tooltip: {
//             pointFormat: '<a><span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/><a>',
//             shared: true
//         },
//         plotOptions: {
//             column: {
//                 stacking: 'normal'
//             }
//         },
//         series:data.columnData
//     });
//}
//function showColumn1(div,titleText,data){
//	$(div).highcharts({                   //图表展示容器，与div的id保持一致
//        chart: {
//            type: 'column'                         //指定图表的类型，默认是折线图（line）
//        },
//        title: {
//            text: titleText      //指定图表标题
//        },
//        xAxis: {
//            categories: data.xAxis   //指定x轴分组
//        },
//        yAxis: {
//            title: {
//                text: '数量'                  //指定y轴的标题
//            }
//        },
//        series:[{
//        	name:"报告数量",
//        	data:data.seriesData
//        }]       
//    });
//	
//}
