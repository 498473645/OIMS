var tjDiseaseByDiseaseForm_url = "/publish/tj/tjDiseaseByDiseaseForm.htm";
var tjdrugDictByJiBingId_url = "/publish/tj/tjdrugDictByJiBingId.htm";
var tjXingBieByJiBingId_url = "/publish/tj/tjXingBieByJiBingId.htm";
var tjAgeByJiBingId_url = "/publish/tj/tjAgeByJiBingId.htm";

var jcd_submitData ="";

var jcd_tabData;
var width;
var height;
function diseasesTongji_initData(){
	jcd_submitData={
			"disease":"",
			"jcdTypeData":"",
			"checkDoctorData":"",
			"checkJcxmData":"",
			"checkDeviceData":"",
			"checkXingZhiData":""
	};
	jcd_tabData = [{
		"id":"div_disease",
		"cli":function(){tab_diseaseClick()},
		"txt":"疾病统计"
	}/*,{
		"id":"div_jcdType",
		"cli":function(){tab_jcdTypeClick()},
		"txt":"住院/门诊"
	},{
		"id":"div_checkDoctor",
		"cli":function(){tab_checkDoctor()},
		"txt":"检查医生"
	},{
		"id":"div_checkJcxm",
		"cli":function(){tab_checkJcxm()},
		"txt":"检查项目"
	},{
		"id":"div_checkDevice",
		"cli":function(){tab_checkDevice()},
		"txt":"检查设备"
	}*/
//	,{
//		"id":"div_checkXingZhi",
//		"cli":function(){tab_checkXingZhi()},
//		"txt":"阳性率"
//	}
	];
}
/**
 * 显示基础数据
 */
function diseasesTongji_showInitData(){
	pageTitle = "疾病统计";
	init();
	diseasesTongji_initData();
	var div_tablabel = $("<div/>").attr("id", "div_top").attr("class","tablabel").appendTo("#right");
	$.each(jcd_tabData,function(index,data){
		var divJcdState = $("<div/>").attr("id", data.id).click(data.cli).attr("class", "tab_hide").appendTo(div_tablabel);
		var divJcdState_html = "<span>"+data.txt+"</span>";
		$(divJcdState_html).appendTo(divJcdState);
	});
	width = $("#right").find(".title").width();//应用区域宽度
	height = $("#right").height()-$("#right").find(".title").height()-$("#div_top").height()-10;//应用区域高度
	var tj_content = $("<div/>").attr("id","tj_content").attr("class","divContent").attr("style","width:"+width+"px;height:"+height+"px;background:;").appendTo("#right");
	/*var tj_content_right = $("<div/>").attr("id","tj_content_right").attr("style","width:"+(width*0.25)+"px;height:"+height+"px;background:;float:right;overflow:auto;").appendTo(tj_content);
	var tj_content_left = $("<div/>").attr("id","tj_content_left").attr("style","width:"+(width*0.75)+"px;height:"+height+"px;background:;float:right;").appendTo(tj_content);*/
	
	var chartShowRight = $("<div />").attr("id","chartShowRight").attr("style","float:right;").appendTo("#right");
	showSearch(chartShowRight);
	
	diseasesTongji_init_opendiv("#div_openimg");
	tab_diseaseClick();
//	tab_jcdTypeClick();
//	tab_checkDoctor();
//	tab_checkJcxm();
}

function tab_diseaseClick(){
	$("#div_disease").removeClass("tab_hide").addClass("tab_show").siblings("div").removeClass("tab_show").addClass("tab_hide");
	$("#selectTable tr").removeAttr("style");
	if(!$("#tj_content_disease").length){
		$("<div/>").attr("id","tj_content_disease").attr("style","width:100%;height:100%;").appendTo("#tj_content");
		$("#tj_content_disease").siblings("div").attr("style","display:none;");
	}
//	FillingValue(jcd_submitData.jcdStateData);
	if(!$("#tj_content_disease_top").length){
		var tj_content_disease_top = $("<div/>").attr("id","tj_content_disease_top").attr("style","width:100%;height:50%").appendTo("#tj_content_disease");
		diseaseRequctData();
	}else{
		$("#tj_content_disease_top").attr("style","display:block;").siblings("div").attr("style","display:none;");
	}
	//控制右边条件显示与否
	$("#a_btn_look").unbind().click(function(){
		$("#tj_content_disease_bottom").remove();
		$("#tj_content_disease_top_right").remove();
		diseaseRequctData();
	});
	
}
function diseaseRequctData(){
	if(!$("#tj_content_disease_top_left").length)
		$("<div id='tj_content_disease_top_left'  />").attr("style","width:50%;height:100%;border:1px solid red;float:left;").appendTo("#tj_content_disease_top");
	var tjDiseaseByDiseaseForm_data = getJSONData(tjDiseaseByDiseaseForm_url, diseasesTongji_searchData(), "POST");
//	showPie("#tj_content_jcdType_left", "检查单类型", jcdNewTongji_tjJcdType_data.obj,function(){});
	if(tjDiseaseByDiseaseForm_data.state){
//		$("#tj_content_disease_top").attr("style","width:100%;height:50%;border:1px solid red;");
		jcd_submitData.disease = diseasesTongji_searchData();
		showPie("#tj_content_disease_top_left", "疾病类型", tjDiseaseByDiseaseForm_data.obj,function(event){
			var jiBingId = event.point.jzzdId;
			if(jiBingId==undefined){
				$.oimsAlert(event.point.name+"不能查看下一级药品信息");
				return;
			}
			var ageData = getLiData();
			var tjAgeByJiBingId_data = getJSONData(tjAgeByJiBingId_url, {"jibingId":jiBingId,"strAgeInfos":JSON.stringify(ageData),"tag":Math.random()}, "POST");
			if(!$("#tj_content_disease_top_right").length)
				$("<div id='tj_content_disease_top_right'  />").attr("style","width:49%;height:100%;border:1px solid red;float:left;").appendTo("#tj_content_disease_top");
			showPie("#tj_content_disease_top_right", "年龄信息", tjAgeByJiBingId_data.obj,function(){});
			if(!$("#tj_content_disease_bottom").length){
				$("<div/>").attr("id","tj_content_disease_bottom").attr("style","width:100%;height:50%;").appendTo("#tj_content_disease");
			}else{
				$("#tj_content_disease_bottom").attr("style","display:block;");
			}
			if(!$("#tj_content_disease_bottom_left").length)
				$("<div/>").attr("id","tj_content_disease_bottom_left").attr("style","width:50%;float:left;height:100%;border:1px solid black;").appendTo("#tj_content_disease_bottom");
			var tjdrugDictByJiBingId_data = getJSONData(tjdrugDictByJiBingId_url, {"jibingId":jiBingId,"tag":Math.random()}, "POST");
			showPie("#tj_content_disease_bottom_left", "用药信息", tjdrugDictByJiBingId_data.obj,function(){});
			if(!$("#tj_content_disease_bottom_right").length)
				$("<div/>").attr("id","tj_content_disease_bottom_right").attr("style","width:49%;height:100%;float:left;border:1px solid black;").appendTo("#tj_content_disease_bottom");
			var tjXingBieByJiBingId_data = getJSONData(tjXingBieByJiBingId_url, {"jibingId":jiBingId,"tag":Math.random()}, "POST");
			showPie("#tj_content_disease_bottom_right", "性别统计", tjXingBieByJiBingId_data.obj,function(){});
			
			
			
			
			
		});
	}
}



function diseasesTongji_init_opendiv(divId){
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
			"<tr name='mzDoctors'>" +
			"<td colspan='2'>门诊医生:</td>" +
			"</tr>" +
			"<tr name='mzDoctors'><td colspan='2'><div class='right_lilist_div' style='overflow:auto;height:120px;border:1px black solid;' id = 'mzDoctors'></div></td></tr>" +
			"<tr name=''><td colspan='2'>" +
			"<ul list-style-type:none; id='ageUl' style='border:solid black 1px;'>" +
			"<li style='text-align:center;'><label>添加时间分段 &nbsp;&nbsp;&nbsp;&nbsp;</label>       <input type='button' onclick='addLi()' value='新增' /></li>"+
			"</ul>" +
			"</td></tr>"+
			
			"</table>"+
			"<div class='buttonsytle1'>" +
//			"<a id='a_btn_report' onclick='getLiData()'><span class='report'></span>生成报表</a>" +
			"<a id='a_btn_look'><span class='view'></span>页面查看</a></div>"
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
	addLi();
}

function delLi(inp){
	$(inp).parent("li").remove();
}

function addLi(){
	$("<li name='dataLi' style='text-align:center;'><input name='startDate' type='text' style='width:60px;' />--<input type='text' name='endDate' style='width:60px;' /><label>&nbsp;&nbsp;&nbsp;&nbsp;</label><input style='width:30px;maggin-top:10px;' type='button' onclick='delLi(this)' value='删' /></li>").appendTo("#ageUl");
}
function getLiData(){
	var liData=new Array()
	var lis = $("#ageUl").children("li");
	for(var i=0;i<lis.length;i++){
		if($(lis[i]).children("input[name='startDate']").length>0){
			var dd = {'startDate':$(lis[i]).children("input[name='startDate']").val(),'endDate':$(lis[i]).children("input[name='endDate']").val()};
			liData.push(dd);
		}
	}
	return  liData;
}

/*function diseasesTongji_FillingValue(data){
	//单选按钮的选择切换
	tj_redioSelect();
	//初始化月份中的年月
	tj_markYear("#fTime1_select");
	tj_markMonth("#fTime2_select");
	
	$("#jcks").val("");
	$("#jcsb").val("");
	$("#jcxms ul li input").removeAttr("checked");
	$("input[name='bg_doctor']").removeAttr("checked");
	$("input[name='bg_yb']").removeAttr("checked");
	$("input[name='bg_zb']").removeAttr("checked");
	$("input[name='jcd_state']").removeAttr("checked");
	if(data!=undefined&&data!=""){
		$("input[name='RadioGroup1']").each(function(i,data){
			if($(this).val()==data.timeType){
				$(this).attr("checked","checked");
			}
		});
		if(data.timeType=='ny'){
			fTime1 = $("#fTime1_select").val(data.fTime1);
			fTime2 = $("#fTime2_select").val(data.fTime2);
		}else{
			fTime1 = $("#fTime1_input").val(data.fTime1);
			fTime2 = $("#fTime2_input").val(data.fTime2);
		}
		$("#jcks").val(data.jcks);
		$("#jcsb").val(data.jcsb);
//		$("input[name='jcxmId']");
		
		var splister = data.jcxms.split(",");
		$("#jcxms ul li input").each(function(){
			for (var int = 0; int < splister.length; int++) {
				if($(this).val()==splister[int]){
					$(this).attr("checked","checked");
				}
			}
		});
		
		splister = data.doctors.split(",");
		$("input[name='bg_doctor']").each(function(){
			for (var int = 0; int < splister.length; int++) {
				if($(this).val()==splister[int]){
					$(this).attr("checked","checked");
				}
			}
		});
		
		splister = data.yb.split(",");
		$("input[name='bg_yb']").each(function(){
			for (var int = 0; int < splister.length; int++) {
				if($(this).val()==splister[int]){
					$(this).attr("checked","checked");
				}
			}
		});
		
		splister = data.zb.split(",");
		$("input[name='bg_zb']").each(function(){
			for (var int = 0; int < splister.length; int++) {
				if($(this).val()==splister[int]){
					$(this).attr("checked","checked");
				}
			}
		});
		
		splister = data.jcdState.split(",");
		$("input[name='jcd_state']").each(function(){
			for (var int = 0; int < splister.length; int++) {
				if($(this).val()==splister[int]){
					$(this).attr("checked","checked");
				}
			}
		});
		
	}
}
*/
function diseasesTongji_searchData(){
	var timeType = $("input[name='RadioGroup1']:checked").val();
	var fTime1;
	var fTime2;
	var mzDoctors = '';
	if(timeType=='ny'){
		fTime1 = $("#fTime1_select").val();
		fTime2 = $("#fTime2_select").val();
	}else{
		fTime1 = $("#fTime1_input").val();
		fTime2 = $("#fTime2_input").val();
	}
	
	$("#mzDoctors table input:checked").each(function(i){
		if(i==0){
			mzDoctors = $(this).val();
		}else{
			mzDoctors+=","+$(this).val();
		}
	});
	
	return {
		'fTime1':fTime1,
		'fTime2':fTime2,
		'timeType':timeType,
		'mzDoctors':mzDoctors,
		tag : Math.random()
	};
}
