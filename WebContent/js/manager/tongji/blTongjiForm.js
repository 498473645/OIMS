var getKaiDanDoctorByQuanxian_url = "/publish/yuangong/getKaiDanDoctorByQuanxian.htm"; //获取所有的门诊医生权限的医生
var showWenZhenByBlTjForm_url = "/publish/tj/showWenZhenByBlTjForm.htm"; 
var showZKJCByBlTjForm_url = "/publish/tj/showZKJCByBlTjForm.htm"; 
var showJzZhenDuanByBlTjForm_url = "/publish/tj/showJzZhenDuanByBlTjForm.htm"; 
var showChuZhiByBlTjForm_url = "/publish/tj/showChuZhiByBlTjForm.htm"; 
var exportWenZhenExcel_url = "/publish/tj/exportWenZhenExcel.htm"; 
var exportZKJCExcel_url = "/publish/tj/exportZKJCExcel.htm"; 
var exportJzZhenDuanExcel_url = "/publish/tj/exportJzZhenDuanExcel.htm"; 
var exportChuZhiExcel_url = "/publish/tj/exportChuZhiExcel.htm"; 



function showBLTJ(){
	var width = ($("#right").find(".title").width());//应用区域宽度
	var height = ($("#right").height())-($("#right").find(".title").height())-10;//应用区域高度
	var tj_content = $("<div/>").attr("id","tj_content").attr("class","divContent").attr("style","width:"+width+"px;height:"+height+"px;background:;").appendTo("#right");
	var tj_content_right = $("<div/>").attr("id","tj_content_right").attr("style","width:"+(width*0.25-2)+"px;height:"+height+"px;background:;float:right;overflow:auto;border:1px solid black;").appendTo(tj_content);
	var tj_content_left = $("<div/>").attr("id","tj_content_left").attr("style","width:"+(width*0.75-2)+"px;height:"+height+"px;background:;float:left;overflow:auto;text-align:center;border:1px solid red;").appendTo(tj_content);
	blTongJi_init_openDic("#tj_content_right");
	
	
	$("<h1 id='h1Title' />").text("问诊统计").appendTo(tj_content_left);
	var tab = $("<table />").attr("id","tableData").attr("align","center").attr("style","width:80%;").appendTo(tj_content_left);
//	var tab_th = $("<tr />").attr("style","font-weight:bold;").appendTo(tab);
//	$("<td />").text("类型").appendTo(tab_th);
//	$("<td />").text("未完成").appendTo(tab_th);
//	$("<td />").text("完成").appendTo(tab_th);
//	$("<td />").text("总量").appendTo(tab_th);
//	$(tab).find("td").width($(tab).width()/(tab_th.find("td").length));
	
	clickWenZhen();
}

function blTongJi_init_openDic(divId){
	//时间、检查科室、检查项目、检查单状态、检查医生、眼别、检查设备、诊别
	
	var table = "<div class='right_findTitle'>统计查询</div>" +
			"<table width='100%' border='0' id='selectTable'>" +
			"<tr>" +
			"<td colspan='2' align='center'>" +
			"<input type='radio' name='RadioGroup1' value='ny' id='RadioGroup1_0' checked='checked' />年月" +
			"<input type='radio' name='RadioGroup1' value='sj' id='RadioGroup1_1' />时间" +
			"</td>" +
			"</tr>" +
			"<tr>" +
			"<td width='22%'>" +
			"<div align='right' id='fTime1_div'>年份:</div>" +
			"</td>" +
			"<td width='78%'>" +
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
			"<tr name='mzDoctor'>" +
			"<td colspan='2'>门诊医生:</td>" +
			"<tr name='mzDoctor'><td colspan='2'><div class='right_lilist_div' style='overflow:auto;height:120px;border:1px black solid;' id = 'mzDoctor'></div></td></tr>" +
			"</tr>" +
			"</table>"+
			"<div class='buttonsytle1'>" +
			"<a href='javascript:clickWenZhen();'><span class='report'></span>显示问诊</a>" +
			"<a  onclick='exportWenZhen()'><span class='view'></span>导出问诊</a>" +
			"<a href='javascript:clickZKJC()'><span class='report'></span>显示检查</a>" +
			"<a onclick='exportZKJC()' ><span class='view'></span>导出检查</a>"+
			"<a href='javascript:clickZD()'><span class='report'></span>显示诊断</a>" +
			"<a onclick='exportZD()' ><span class='view'></span>导出诊断</a>"+
			"<a href='javascript:clickCZ()'><span class='report'></span>显示处置</a>" +
			"<a onclick='exportCZ()' ><span class='view'></span>导出处置</a>";
			"</div>";
			$(table).appendTo($(divId));
	calendarFun("fTime1_input",-140);
	calendarFun("fTime2_input",-140);
	//单选按钮的选择切换
	tj_redioSelect();
	//初始化月份中的年月
	tj_markYear("#fTime1_select");
	tj_markMonth("#fTime2_select");
	
	//查询所有的门诊医生
	var getKaiDanDoctorByQuanxian_data = getJSONData(
			getKaiDanDoctorByQuanxian_url, {// 获取具有检查权限的医生
				tag : Math.random()
			}, "post");
	if (getKaiDanDoctorByQuanxian_data.state&&getKaiDanDoctorByQuanxian_data.obj.length>0) {
		var table_doctors = $("<table />").appendTo("#mzDoctor");
		var tr_doctors;
		var yuangonglist = getKaiDanDoctorByQuanxian_data.obj;
		$.each(yuangonglist, function(i, yuangong) {
			if(i%4==0)
				tr_doctors = $("<tr/>").appendTo(table_doctors);
			var td_doctors = $("<td align='left' />").appendTo(tr_doctors);
			$(
					"<input type='checkbox'  name='bg_doctor' value='"
							+ yuangong.gonghao + "'/>").appendTo(td_doctors);
			$("<label >" + yuangong.xingming + "</label><br>").appendTo(td_doctors);
		});
	}
}

function clickWenZhen(){
	$("#h1Title").text("问诊统计");
	var showWenZhenByBlTjForm_data = getJSONData(
			showWenZhenByBlTjForm_url,blTongji_searchData() , "post");
	showTjResult(showWenZhenByBlTjForm_data)
}
function exportWenZhen(){
	var exportWenZhenExcel_data = getJSONData(exportWenZhenExcel_url,blTongji_searchData(), "POST");
	if(exportWenZhenExcel_data.state){
		location.href = contextPath + exportWenZhenExcel_data.obj;
	}else{
		$.oimsError("导出失败！");
	}
}
function clickZKJC(){
	$("#h1Title").text("专科检查统计");
	var showZKJCByBlTjForm_data = getJSONData(
			showZKJCByBlTjForm_url,blTongji_searchData() , "post");
	showTjResult(showZKJCByBlTjForm_data)
}
function exportZKJC(){
	var exportZKJCExcel_data = getJSONData(exportZKJCExcel_url,blTongji_searchData(), "POST");
	if(exportZKJCExcel_data.state){
		location.href = contextPath + exportZKJCExcel_data.obj;
	}else{
		$.oimsError("导出失败！");
	}
}
function clickZD(){
	$("#h1Title").text("诊断统计");
	var showJzZhenDuanByBlTjForm_data = getJSONData(
			showJzZhenDuanByBlTjForm_url,blTongji_searchData() , "post");
	showTjResult(showJzZhenDuanByBlTjForm_data)
}
function exportZD(){
	var exportJzZhenDuanExcel_data = getJSONData(exportJzZhenDuanExcel_url,blTongji_searchData(), "POST");
	if(exportJzZhenDuanExcel_data.state){
		location.href = contextPath + exportJzZhenDuanExcel_data.obj;
	}else{
		$.oimsError("导出失败！");
	}
}
function clickCZ(){
	$("#h1Title").text("处置统计");
	var showChuZhiByBlTjForm_data = getJSONData(
			showChuZhiByBlTjForm_url,blTongji_searchData() , "post");
	showTjResult(showChuZhiByBlTjForm_data)
}
function exportCZ(){
	var exportChuZhiExcel_data = getJSONData(exportChuZhiExcel_url,blTongji_searchData(), "POST");
	if(exportChuZhiExcel_data.state){
		location.href = contextPath + exportChuZhiExcel_data.obj;
	}else{
		$.oimsError("导出失败！");
	}
}
function showTjResult(data){
	$("#tableData tr[name=sel]").remove();
	if (data.state&&data.obj.length>0) {
		$.each(data.obj,function(i,data){
			var tab_th = $("<tr />").attr("name","sel");
			if(i==0)
				$(tab_th).attr("style","font-weight:bold;");
			$.each(data,function(i,d){
				$("<td />").text(d).appendTo(tab_th);
			});
			/*$("<td />").text(data.category).appendTo(tab_th);
			$("<td />").text(data.total).appendTo(tab_th);
			$("<td />").text(data.comp).appendTo(tab_th);
			$("<td />").text(data.ncomp).appendTo(tab_th);*/
			$("#tableData").append(tab_th);
		});
	}
}




function blTongji_searchData(){
	var timeType = $("input[name='RadioGroup1']:checked").val();
	var fTime1;
	var fTime2;
	var doctors='';
	if(timeType=='ny'){
		fTime1 = $("#fTime1_select").val();
		fTime2 = $("#fTime2_select").val();
	}else{
		fTime1 = $("#fTime1_input").val();
		fTime2 = $("#fTime2_input").val();
	}
	
	var diquId =	$("#diquId").val();
	
	$("#mzDoctor table input:checked").each(function(i){
		if(i==0){
			doctors = $(this).val();
		}else{
			doctors+=","+$(this).val();
		}
	});
	return {
		'fTime1':fTime1,
		'fTime2':fTime2,
		'timeType':timeType,
		'mzDoctors':doctors,
		tag : Math.random()
	};
}




