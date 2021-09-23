var jcdNewTongji_findAllJcxm_url = "/publish/jcxm/findAllJcxm.htm"; // 查询所有检查项目信息
var jcdNewTongji_getJianChaDoctorByBumenAndQuanxian_url  = "/publish/yuangong/getJianChaDoctorByBumenAndQuanxian.htm"; //获取所有的检查医生权限的医生
var jcdNewTongji_findAllSheBeis_url = "/publish/shebei/findAllSheBeis.htm";//查询所有的检查设备
var jcdNewTongji_findAllBuMen_url = "/publish/bumen/findAllBuMen.htm";//查询所有的检查设备
var jcdNewTongji_findCategories_url="/publish/oimsCategory/findCategories.htm"; //根据父级id获取字迹
var jcdNewTongji_tjJcdState_url = "/publish/tj/tjJcdState.htm"; //检查单状态统计
var jcdNewTongji_tjJcdType_url = "/publish/tj/tjJcdType.htm"; //检查单所在诊别统计
var jcdNewTongji_tjCheckDoctor_url = "/publish/tj/tjCheckDoctor.htm";//检查医生统计
var jcdNewTongji_tjCheckJcxm_url = "/publish/tj/tjCheckJcxm.htm";//检查项目统计
var jcdNewTongji_tjCheckDevice_url = "/publish/tj/tjCheckDevice.htm";//检查项目统计
var jcd_submitData ="";

var jcd_tabData;
var width;
var height;
function initData(){
	jcd_submitData={
			"jcdStateData":"",
			"jcdTypeData":"",
			"checkDoctorData":"",
			"checkJcxmData":"",
			"checkDeviceData":"",
			"checkXingZhiData":""
	};
	jcd_tabData = [{
		"id":"div_jcdState",
		"cli":function(){tab_jcdStateClick()},
		"txt":"检查单状态"
	},{
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
	}
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
function showInitData(){
	pageTitle = "检查单统计";
	init();
	initData();
	var div_tablabel = $("<div/>").attr("id", "div_top").attr("class","tablabel").appendTo("#right");
	$.each(jcd_tabData,function(index,data){
		var divJcdState = $("<div/>").attr("id", data.id).click(data.cli).attr("class", "tab_hide").appendTo(div_tablabel);
		var divJcdState_html = "<span>"+data.txt+"</span>";
		$(divJcdState_html).appendTo(divJcdState);
	});
	width = $("#right").find(".title").width();//应用区域宽度
	height = $("#right").height()-$("#right").find(".title").height()-$("#div_top").height()-10;//应用区域高度
	var tj_content = $("<div/>").attr("id","tj_content").attr("class","divContent").attr("style","width:"+width+"px;height:"+height+"px;background:;").appendTo("#right");
	var tj_content_right = $("<div/>").attr("id","tj_content_right").attr("style","width:"+(width*0.25)+"px;height:"+height+"px;background:;float:right;overflow:auto;").appendTo(tj_content);
	var tj_content_left = $("<div/>").attr("id","tj_content_left").attr("style","width:"+(width*0.75)+"px;height:"+height+"px;background:;float:right;").appendTo(tj_content);
	//点击检查单状态
	jcdNewTongji_init_opendiv("tj_content_right");
	tab_jcdStateClick();
//	tab_jcdTypeClick();
//	tab_checkDoctor();
//	tab_checkJcxm();
}

/**
 * 查询初始化
 */
function jcdNewTongji_init_opendiv(divId){
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
			"<tr name='jcks_jcxms'>" +
			"<td>检查科室:</td><td><select id = 'jcks'></select></td>" +
			"</tr>" +
			
			"<tr name='jcsb_jcxms'>" +
			"<td>检查设备:</td><td><select id = 'jcsb'></select></td>" +
			"</tr>" +
			
			"<tr name='jcxms'>" +
			"<td colspan='2'>检查项目:</td>" +
			"</tr>" +
			"<tr name='jcxms'><td colspan='2'><div class='right_lilist_div' style='overflow:auto;height:100px;border:1px black solid;' id = 'jcxms'></div></td></tr>" +
			
			"<tr name='checkDoctor'>" +
			"<td colspan='2'>检查医生:</td>" +
			"</tr>" +
			"<tr name='checkDoctor'><td colspan='2'><div class='right_lilist_div' style='overflow:auto;height:80px;border:1px black solid;' id = 'checkDoctor'></div></td></tr>" +
			
			"<tr name='yb' ><td align='right'>眼别:</td><td id='yb'></td></tr>" +
			
			"<tr name='zhenbie'><td align='right'>诊别:</td><td id='zhenbie'></td></tr>" +
			
			"<tr name='jcdState'><td align='right'>状态:</td><td id='jcd_state'></td></tr>" +
			"</table>"+
			"<div class='buttonsytle1'>" +
//			"<a id='a_btn_report'><span class='report'></span>生成报表</a>" +
			"<a id='a_btn_look'><span class='view'></span>页面查看</a></div>"
			$(table).appendTo("#"+divId);
	calendarFun("fTime1_input",-140);
	calendarFun("fTime2_input",-140);
	//单选按钮的选择切换
	tj_redioSelect();
	//初始化月份中的年月
	tj_markYear("#fTime1_select");
	tj_markMonth("#fTime2_select");
	
	//查询所有的设备
	var jcdNewTongji_findAllSheBeis_data = getJSONData(jcdNewTongji_findAllSheBeis_url, {
		tag : Math.random()
	}, "post");
	if(jcdNewTongji_findAllSheBeis_data.state!=null&&jcdNewTongji_findAllSheBeis_data.obj.length>0){
		$("<option selected='selected'></option>").appendTo("#jcsb");		
		$.each(jcdNewTongji_findAllSheBeis_data.obj,function(index,data){
			$("<option value="+data.id+">"+data.sbmc+"</option>").appendTo("#jcsb");
		});
	}
	//查询检查科室
	var jcdNewTongji_findAllBuMen_data = getJSONData(jcdNewTongji_findAllBuMen_url,{tag:Math.random()},"POST");
	if(jcdNewTongji_findAllBuMen_data.obj!=null&&jcdNewTongji_findAllBuMen_data.obj.length>0){
		$("<option selected='selected'></option>").appendTo("#jcks");		
		$.each(jcdNewTongji_findAllBuMen_data.obj,function(index,data){
			$("<option value="+data.id+">"+data.bmmc+"</option>").appendTo("#jcks");
		});
	}
	
	
	//查询所有的检查项目
	var jcdNewTongji_findAllJcxm_data = getJSONData(jcdNewTongji_findAllJcxm_url, {
		tag : Math.random()
	}, "post");
	if(jcdNewTongji_findAllJcxm_data.state!=null&&jcdNewTongji_findAllJcxm_data.obj.length>0){
		var jcxms_ul = $("<ul />").appendTo("#jcxms");
		$.each(jcdNewTongji_findAllJcxm_data.obj,function(index,data){
			$(" <li title='"+data.xmmc+"'><input type='checkbox' name='jcxmId' value='"+data.id+"' /><span>"+data.xmmc+"</span></li>").appendTo(jcxms_ul);
		});
	}
	
	//查询所有的检查医生
	var getJianChaDoctorByBumenAndQuanxian_data = getJSONData(
			getJianChaDoctorByBumenAndQuanxian_url, {// 获取具有检查权限的医生
				tag : Math.random()
			}, "post");
	if (getJianChaDoctorByBumenAndQuanxian_data.state&&getJianChaDoctorByBumenAndQuanxian_data.obj.length>0) {
		var table_doctors = $("<table />").appendTo("#checkDoctor");
		var tr_doctors;
		var yuangonglist = getJianChaDoctorByBumenAndQuanxian_data.obj;
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
	
	//检查单状态
	var jcdStateData = [{"id":oimsCategory.JCD_STATE_DJC,"category":"待检查"},
	                    {"id":oimsCategory.JCD_STATE_DBC,"category":"待补传"},
	                    {"id":oimsCategory.JCD_STATE_YGH,"category":"已过号"},
	                    {"id":oimsCategory.JCD_STATE_YWC,"category":"已完成"}];
	
//	var table_jcdState = $("<table />").appendTo("#jcdState");
	var table_jcdState = $("#selectTable");
	var tr_jcdState;
	var td_jcdState;
//	$.each(jcdStateData, function(i, data) {
//		if(i%4==0){
//			tr_jcdState = $("<tr/>").attr("name","jcdState").appendTo(table_jcdState);
////			$("<td />").appendTo(tr_jcdState);
//			td_jcdState= $("<td name='jcdState' align='left' colspan='2'  />").appendTo(tr_jcdState);
//		}
//		$("<input type='checkbox'  name='jcd_state' value='"
//				+ data.id + "'/>").appendTo(td_jcdState);
//		$("<b >" + data.category + "</b>").appendTo(td_jcdState);
//	});
	$.each(jcdStateData, function(i, data) {
//		if(i%4==0){
//			tr_jcdState = $("<tr/>").attr("name","jcdState").appendTo(table_jcdState);
////			$("<td />").appendTo(tr_jcdState);
//			td_jcdState= $("<td name='jcdState' align='left' colspan='2'  />").appendTo(tr_jcdState);
//		}
		$("<input type='checkbox'  name='jcd_state' value='"
				+ data.id + "'/>").appendTo("#jcd_state");
		$("<label >" + data.category + "</label>").appendTo("#jcd_state");
	});
	
	
	
	//眼别
	var getYanBieByFatherId_data = getJSONData(jcdNewTongji_findCategories_url,{tag:Math.random(),fatherId:oimsCategory.CATEGORY_YANBIE});
	if(getYanBieByFatherId_data.state&&getYanBieByFatherId_data.obj.length>0){
		$.each(getYanBieByFatherId_data.obj, function(i, yb) {
			$("<input type='checkbox'  name='bg_yb' value='"
							+ yb.id + "'/>").appendTo("#yb");
			$("<label >" + yb.category + "</label>").appendTo("#yb");
		});
	}
	//诊别
	var getZhenBieByFatherId_data = getJSONData(jcdNewTongji_findCategories_url,{tag:Math.random(),fatherId:oimsCategory.ZHENBIE});
	if(getZhenBieByFatherId_data.state&&getZhenBieByFatherId_data.obj.length>0){
		$.each(getZhenBieByFatherId_data.obj, function(i, zb) {
			$(
					"<input type='checkbox'  name='bg_zb' value='"
					+ zb.id + "'/>").appendTo("#zhenbie");
			$("<label >" + zb.category + "</label>&nbsp;&nbsp;").appendTo("#zhenbie");
		});
	}
}

function jcdNewTongji_searchData(){
	var timeType = $("input[name='RadioGroup1']:checked").val();
	var fTime1;
	var fTime2;
	var jcxms='';
	var doctors = '';
	var yb = '';
	var zhenbie = '';
	var jcdState = '';
	var mzDoctors = '';
	if(timeType=='ny'){
		fTime1 = $("#fTime1_select").val();
		fTime2 = $("#fTime2_select").val();
	}else{
		fTime1 = $("#fTime1_input").val();
		fTime2 = $("#fTime2_input").val();
	}
	
	var jcks =	$("#jcks option:selected").val();
	var jcsb =	$("#jcsb option:selected").val();
	
	$("#jcxms ul li input:checked").each(function(i){
		if(i==0){
			jcxms = $(this).val();
		}else{
			jcxms+=","+$(this).val();
		}
	}); 
	
	$("#checkDoctor table input:checked").each(function(i){
		if(i==0){
			doctors = $(this).val();
		}else{
			doctors+=","+$(this).val();
		}
	});
	$("#yb input:checked").each(function(i){
		if(i==0){
			yb = $(this).val();
		}else{
			yb +=","+$(this).val();
		}
	});
	$("#zhenbie input:checked").each(function(i){
		if(i==0){
			zhenbie = $(this).val();
		}else{
			zhenbie+=","+$(this).val();
		}
	});
	
	$("#jcd_state input:checked").each(function(i){
		if(i==0){
			jcdState = $(this).val();
		}else{
			jcdState +=","+$(this).val();
		}
	});
	
	return {
		'fTime1':fTime1,
		'fTime2':fTime2,
		'jcxms':jcxms,
		'doctors':doctors,
		'timeType':timeType,
		'jcks':jcks,
		'jcsb':jcsb,
		'yb':yb,
		'zb':zhenbie,
		'jcdState':jcdState,
		tag : Math.random()
	};
}

function FillingValue(data){
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
/**
 * 检查单状态点击事件
 */
function tab_jcdStateClick(){
	$("#div_jcdState").removeClass("tab_hide").addClass("tab_show").siblings("div").removeClass("tab_show").addClass("tab_hide");
	$("#selectTable tr").removeAttr("style");
	FillingValue(jcd_submitData.jcdStateData);
	if(!$("#tj_content_jcdState_left").length){
		$("<div/>").attr("id","tj_content_jcdState_left").attr("style","width:100%;height:100%;").appendTo("#tj_content_left");
		$("#tj_content_jcdState_left").siblings("div").attr("style","display:none;");
		jcdStateRequctData();
	}else{
		$("#tj_content_jcdState_left").attr("style","display:block;").siblings("div").attr("style","display:none;");
	}
	//控制右边条件显示与否
	$("tr[name='jcdState']").attr("style","display:none;");
	$("#a_btn_look").unbind().click(function(){
		jcdStateRequctData();
	});
}
function jcdStateRequctData(){
	var a = jcdNewTongji_searchData();
	var jcdNewTongji_tjJcdState_data = getJSONData(jcdNewTongji_tjJcdState_url, jcdNewTongji_searchData(), "POST");
	if(jcdNewTongji_tjJcdState_data.state){
		jcd_submitData.jcdStateData = jcdNewTongji_searchData();
		$("#tj_content_jcdState_left").attr("style","width:100%;height:100%;");
		showPie("#tj_content_jcdState_left", "检查单状态统计", jcdNewTongji_tjJcdState_data.obj,function(){});
	}
}
/**
 * 患者类型
 */
function tab_jcdTypeClick(){
	$("#div_jcdType").removeClass("tab_hide").addClass("tab_show").siblings("div").removeClass("tab_show").addClass("tab_hide");
//	$("#selectTable tr").attr("style","display:block;");
	$("#selectTable tr").removeAttr("style");
	FillingValue(jcd_submitData.jcdTypeData);
	if(!$("#tj_content_jcdType_left").length){
		$("<div/>").attr("id","tj_content_jcdType_left").attr("style","width:100%;height:100%;").appendTo("#tj_content_left");
		$("#tj_content_jcdType_left").siblings("div").attr("style","display:none;");
		jcdTypeRequctData();
	}else{
		$("#tj_content_jcdType_left").attr("style","display:block;").siblings("div").attr("style","display:none;");
	}
	$("tr[name='zhenbie']").attr("style","display:none;");
	$("#a_btn_look").unbind().click(function(){
		jcdTypeRequctData();
	});
}
function jcdTypeRequctData(){
	var jcdNewTongji_tjJcdType_data = getJSONData(jcdNewTongji_tjJcdType_url, jcdNewTongji_searchData(), "POST");
//	showPie("#tj_content_jcdType_left", "检查单类型", jcdNewTongji_tjJcdType_data.obj,function(){});
	if(jcdNewTongji_tjJcdType_data.state){
		$("#tj_content_jcdType_left").attr("style","width:100%;height:100%;");
		jcd_submitData.jcdTypeData = jcdNewTongji_searchData();
		showPie("#tj_content_jcdType_left", "检查单类型", jcdNewTongji_tjJcdType_data.obj,function(){});
	}
}
/**
 * 检查医生
 */
function tab_checkDoctor(){
	$("#div_checkDoctor").removeClass("tab_hide").addClass("tab_show").siblings("div").removeClass("tab_show").addClass("tab_hide");
	$("#selectTable tr").removeAttr("style");
	FillingValue(jcd_submitData.checkDoctorData);
	if(!$("#tj_content_checkDoctor_left").length){
		$("<div/>").attr("id","tj_content_checkDoctor_left").attr("style","width:100%;height:100%;").appendTo("#tj_content_left");
		$("#tj_content_checkDoctor_left").siblings("div").attr("style","display:none;");
		checkDoctorRequctData();
	}else{
		$("#tj_content_checkDoctor_left").attr("style","display:block;").siblings("div").attr("style","display:none;");
	}
	$("tr[name='checkDoctor']").attr("style","display:none;");
	$("#a_btn_look").unbind().click(function(){
		checkDoctorRequctData();
	});
}
function checkDoctorRequctData(){
	var jcdNewTongji_tjCheckDoctor_data = getJSONData(jcdNewTongji_tjCheckDoctor_url, jcdNewTongji_searchData(), "POST");
	if(jcdNewTongji_tjCheckDoctor_data.state){
		$("#tj_content_checkDoctor_left").attr("style","width:100%;height:100%;");
		jcd_submitData.checkDoctorData = jcdNewTongji_searchData();
		showColumn("#tj_content_checkDoctor_left", "检查医生检查项目统计", jcdNewTongji_tjCheckDoctor_data.obj);
	}
}

/**
 * 检查项目
 */
function tab_checkJcxm(){
	$("#div_checkJcxm").removeClass("tab_hide").addClass("tab_show").siblings("div").removeClass("tab_show").addClass("tab_hide");
	$("#selectTable tr").removeAttr("style");
	FillingValue(jcd_submitData.checkJcxmData);
	if(!$("#tj_content_checkJcxm_left").length){
		$("<div/>").attr("id","tj_content_checkJcxm_left").attr("style","width:100%;height:100%;").appendTo("#tj_content_left");
		$("#tj_content_checkJcxm_left").siblings("div").attr("style","display:none;");
		checkJcxmRequctData();
	}else{
		$("#tj_content_checkJcxm_left").attr("style","display:block;").siblings("div").attr("style","display:none;");
	}
	$("tr[name='jcxms']").attr("style","display:none;");
	$("#a_btn_look").unbind().click(function(){
		checkJcxmRequctData();
	});
}
function checkJcxmRequctData(){
	var jcdNewTongji_tjCheckJcxm_data = getJSONData(jcdNewTongji_tjCheckJcxm_url, jcdNewTongji_searchData(), "POST");
	if(jcdNewTongji_tjCheckJcxm_data.state){
		$("#tj_content_checkJcxm_left").attr("style","width:100%;height:100%;");
		jcd_submitData.checkJcxmData = jcdNewTongji_searchData();
		showColumn("#tj_content_checkJcxm_left", "检查医生检查项目统计", jcdNewTongji_tjCheckJcxm_data.obj);
	}
}
/**
 * 检查设备
 */
function tab_checkDevice(){
	$("#div_checkDevice").removeClass("tab_hide").addClass("tab_show").siblings("div").removeClass("tab_show").addClass("tab_hide");
	$("#selectTable tr").removeAttr("style");
	FillingValue(jcd_submitData.checkDeviceData);
	if(!$("#tj_content_checkDevice_left").length){
		$("<div/>").attr("id","tj_content_checkDevice_left").attr("style","width:100%;height:100%;").appendTo("#tj_content_left");
		$("#tj_content_checkDevice_left").siblings("div").attr("style","display:none;");
		checkDeviceRequestData();
	}else{
		$("#tj_content_checkDevice_left").attr("style","display:block;").siblings("div").attr("style","display:none;");
	}
	$("tr[name='jcsb_jcxms']").attr("style","display:none;");
	$("#a_btn_look").unbind().click(function(){
		checkDeviceRequestData();
	});
}
function checkDeviceRequestData(){
	var jcdNewTongji_tjCheckDevice_data = getJSONData(jcdNewTongji_tjCheckDevice_url, jcdNewTongji_searchData(), "POST");
	if(jcdNewTongji_tjCheckDevice_data.state){
		$("#tj_content_checkDevice_left").attr("style","width:100%;height:100%;");
		jcd_submitData.checkDeviceData = jcdNewTongji_searchData();
		showColumn("#tj_content_checkDevice_left", "检查医生检查项目统计", jcdNewTongji_tjCheckDevice_data.obj);
	}
	
}
/**
 * 阳性率统计
 */
function tab_checkXingZhi(){
	$("#div_checkXingZhi").removeClass("tab_hide").addClass("tab_show").siblings("div").removeClass("tab_show").addClass("tab_hide");
	$("#selectTable tr").removeAttr("style");
	FillingValue(jcd_submitData.checkDeviceData);
	if(!$("#tj_content_checkXingZhi_left").length){
		$("<div/>").attr("id","tj_content_checkXingZhi_left").attr("style","width:100%;height:100%;").appendTo("#tj_content_left");
		$("#tj_content_checkXingZhi_left").siblings("div").attr("style","display:none;");
		checkXingZhiRequestData();
	}else{
		$("#tj_content_checkXingZhi_left").attr("style","display:block;").siblings("div").attr("style","display:none;");
	}
	$("tr[name='jcsb_jcxms']").attr("style","display:none;");
	$("#a_btn_look").unbind().click(function(){
		checkXingZhiRequestData();
	});
}

function checkXingZhiRequestData(){
	
}
