//复视检查初始化
var fushiFlash, fushiSaveAndPrint=false, fushiFlashSAVE=true;
var fushi_path;
//初始化复视模板
function showFushiFlash(){
	importJS("/js/jquery.swfobject.1-1-1.min.js");
	var params = {
			allowFullScreen : true,
			allowScriptAccess : "sameDomain",
			quality : "high",
			wmode : "transparent"
		};
	fushiFlash= $("#fushiReport").flash({
		swf : contextPath+"/swf/fushiReport.swf",
		id : "fushiReportSWF" ,
		width : $("#fushiReport").width(),
		height : $("#fushiReport").height(),
		flashvars : {savePhotoCallback:"fushiSaveCallback"},
		paremeters : params
	});
	fushiFlashSAVE=true;
}
function initData_eyejm() {
	// 检查医生下拉框赋值
	
	if ($("#doctor").length == 1) {
		var data_getJianChaDoctorByBumenAndQuanxian = getJSONData(
				"/publish/yuangong/getJianChaDoctorByBumenAndQuanxian.htm", {// 获取具有检查权限的医生
					tag : Math.random()
				}, "post");
		if (data_getJianChaDoctorByBumenAndQuanxian.state) {
			var yuangonglist = data_getJianChaDoctorByBumenAndQuanxian.obj;
			$.each(yuangonglist, function(i, yuangong) {
				$(
						"<option value=\"" + yuangong.gonghao + "\">"
								+ yuangong.xingming + "</option>").appendTo(
						"#doctor");
			});
		}
	}
	// 查询该报告页面所有元素信息
	var url_outBaogaoHelp = "/publish/baogao/outBaogaoHelp.htm";
	var patameter_outBaogaoHelp = {
		id : dataObjects_choice[0].jcdid,// 检查单ID
		huanzheId : dataObjects_choice[0].huanzheId,// 患者ID
		tag : Math.random()
	};
	var data_outBaogaoHelp = getJSONData(url_outBaogaoHelp,
			patameter_outBaogaoHelp, "post");
	if (data_outBaogaoHelp.state) {
		initial_Baogao(data_outBaogaoHelp.obj);// 报告页面各元素赋值
	}
	//根jm报告对象查询符合条件的jm报告对象
	var url_selectEyejmByEyejm = "/publish/Eyejm/selectEyejmByEyejm.htm";
	var data_selectEyejmByEyejm = getJSONData(
			url_selectEyejmByEyejm, {
				jcdId : dataObjects_choice[0].jcdid,
				tag : Math.random()
			}, "post");
	if (data_selectEyejmByEyejm.state) {
		var eyejm = data_selectEyejmByEyejm.obj;
		if (eyejm != null) {
			if ($("#result").length == 1)
				$("#result").val(eyejm.result);// 检查结果
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyejm.cliDate);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyejm.repDoc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyejm.doctor);// 检查医生
			if (eyejm.fsurl && eyejm.fsurl.length){
				var img = $("<img />").dblclick(function(){
					$("#fushiReport").text("");
					showFushiFlash();
				}).attr("src",contextPath+eyejm.fsurl+"?tag="+Math.random());
				$("#fushiReport").append(img).data("path",eyejm.fsurl);
				fushiFlashSAVE=false;
			}else{
				showFushiFlash();
			}
			if (data_outBaogaoHelp.obj.reportDate != eyejm.cliDate) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyejm);
			}
		}else{
			showFushiFlash();
		}
	}
}


function fushiSaveCallback(obj){
	var o = eval('('+obj+')');
	if(!o.state){
		alert('图片保存失败！');
		return;
	}
	var path = o.obj;
	saveOrUpdateFushiReport(path);
	fushiFlashSAVE=false;
	if(fushiSaveAndPrint){
		fushiReportPrint();
	}
}

function saveOrUpdateFushiReport(path){
	var parameter_saveOrUpdateEyejm = validateAndGetValue_eyejm();
	if(path==undefined || path==null) path = $("#fushiReport").data("path");
	$.extend(parameter_saveOrUpdateEyejm,{'fsurl':path});
	fushi_path = path;
	var url_saveOrUpdateEyejm = "/publish/Eyejm/saveOrUpdateEyejm.htm";// jm检查报告保存
	var data_saveOrUpdateEyejm = getJSONData(url_saveOrUpdateEyejm,
			parameter_saveOrUpdateEyejm, "post");
	if (data_saveOrUpdateEyejm.state){
		if(!fushiSaveAndPrint)$.oimsSucc("复视检查报告保存成功");
		var img = $("<img src='"+contextPath+parameter_saveOrUpdateEyejm.fsurl+"' />").dblclick(function(){
			$("#fushiReport").text("");
			showFushiFlash();
		});
		$("#fushiReport").data("path",path).html(img);
		if(fushiSaveAndPrint)fushiReportPrint();
	}else
		$.oimsError("复视检查报告保存失败");
}
// jm检查报告保存
function saveOrUpdateEyejm() {
	if(!fushiFlashSAVE){
		saveOrUpdateFushiReport(null);
		return;
	}
	fushiSaveAndPrint=false;
	var flash = findSWF("fushiReportSWF");
	var parameter_saveOrUpdateEyejm = validateAndGetValue_eyejm();
	flash.saveFushiReportImg(parameter_saveOrUpdateEyejm.jcdId+".jpg");
}
function fushiReportPrint(){
	var parameter_saveOrUpdateEyejm = validateAndGetValue_eyejm();
	$.extend(parameter_saveOrUpdateEyejm,{'fsurl':fushi_path});
	parameter_saveOrUpdateEyejm = JSON.stringify(
			parameter_saveOrUpdateEyejm)
			.replace(new RegExp("\"", "gm"), "'");
	var html_div_reportresult = "<div id='div_reportresult'>"
			+ $("#div_reportresult").html() + "</div>";// 报告内容
	var printWindow = window.open("");
	html_baogao = "";
	html_baogao += "<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'>";
	html_baogao += "<html>";
	html_baogao += "<head>";
	html_baogao += "<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>";
	html_baogao += "<title>报告预览</title>";
	html_baogao += "<script language='javascript'> var contextPath='"
			+ contextPath + "';</script>";
	html_baogao += "<link rel='stylesheet' type='text/css' href='"
			+ contextPath + "/css/main.css' rel='stylesheet' type='text/css'>";
	html_baogao += "<link rel='stylesheet' type='text/css' href='"
			+ contextPath
			+ "/style/green/css/green.css' rel='stylesheet' type='text/css'>";
	html_baogao += "<link rel='stylesheet' type='text/css' href='"
			+ contextPath + "/css/icon.css' rel='stylesheet' type='text/css'>";
	html_baogao += "<link rel='stylesheet' type='text/css' href='"
			+ contextPath
			+ "/style/green/css/openWin.css' rel='stylesheet' type='text/css'>";
	html_baogao += "<script src='" + contextPath
			+ "/js/jquery.min.js'></script>";
	html_baogao += "<script src='" + contextPath + "/js/common.js'></script>";
	html_baogao += "<script src='" + contextPath
			+ "/js/jquery.oimsDialog.js'></script>";
	html_baogao += "<script src='" + contextPath
			+ "/js/oimsCategory.config.js'></script>";
	html_baogao += "<script src='" + contextPath
			+ "/js/manager/baogao/language.config.js'></script>";
	html_baogao += "<script src='" + contextPath
			+ "/js/manager/baogao/previewEyejm.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyejm="
			+ parameter_saveOrUpdateEyejm + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}
// jm检查报告打印预览
function previewEyejm() {
	fushiSaveAndPrint=true;
	saveOrUpdateEyejm();
}
function validateAndGetValue_eyejm(){
	var oValidataData = {
			nullValidataData : {
			
			}
		};
		var sReturn = fnFormValidata(oValidataData);
		if (sReturn != null) {
			$.oimsAlert(sReturn);// 带*为必填项
			return;
		}
		var jcdId = dataObjects_choice[0].jcdid;// 检查单ID
		var result = $("#result").val();// 检查结果
		var repDoc = $("#rep_doc option:selected").val();// 申请医生
		var repDoc_name = $("#rep_doc option:selected").text();// 申请医生
		var doctor = $("#doctor option:selected").val();// 检查医生
		var doctor_name = $("#doctor option:selected").text();// 检查医生
		var cliDate = $("#cli_date").html();// 报告日期
		var parameter_saveOrUpdateEyejm = {
			jcdId : jcdId,// 检查单ID
			result : result,
			baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
			repDoc : repDoc,// 申请医生
			doctor : doctor,// 检查医生
			repDoc_name : repDoc_name,// 申请医生
			doctor_name : doctor_name,// 检查医生
			cliDate : cliDate,// 报告日期
			tag : Math.random()
		};
		return parameter_saveOrUpdateEyejm;
}