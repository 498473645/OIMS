//检查项目
var date_eyeEOG_sy_type =[{
	value : '',
	text : ''
},{
	value : 'Espion',
	text : 'Espion'
},{
	value : 'Veris',
	text : 'Veris'
},{
	value : 'metrovision',
	text : 'metrovision'
}];
var data_eyeEOG_reduceLevel = [ {
	value : '',
	text : ''
}, {
	value : '未见明显降低',
	text : '未见明显降低'
}, {
	value : '普遍略微降低',
	text : '普遍略微降低'
}, {
	value : '普遍轻度降低',
	text : '普遍轻度降低'
}, {
	value : '普遍中度降低',
	text : '普遍中度降低'
}, {
	value : '普遍重度降低',
	text : '普遍重度降低'
}, {
	value : '呈熄灭型',
	text : '呈熄灭型'
} ];

function initData_eyeEOG() {
	// 检查设备
	if ($("#sy_type").length == 1) {
		for (var i = 0; i < date_eyeEOG_sy_type.length; i++)
			$(
					"<option value='" + date_eyeEOG_sy_type[i].value
							+ "'>" + date_eyeEOG_sy_type[i].text
							+ "</option>").appendTo("#sy_type");
	}
	if ($("#reduceLevel_left").length == 1) {
		for (var i = 0; i < data_eyeEOG_reduceLevel.length; i++)
			$(
					"<option value='" + data_eyeEOG_reduceLevel[i].value + "'>"
							+ data_eyeEOG_reduceLevel[i].text + "</option>")
					.appendTo("#reduceLevel_left");
	}
	if ($("#reduceLevel_right").length == 1) {
		for (var i = 0; i < data_eyeEOG_reduceLevel.length; i++)
			$(
					"<option value='" + data_eyeEOG_reduceLevel[i].value + "'>"
							+ data_eyeEOG_reduceLevel[i].text + "</option>")
					.appendTo("#reduceLevel_right");
	}

	// 申请医生下拉框赋值
//	if ($("#rep_doc").length == 1) {
//		var data_getKaiDanDoctorByQuanxian = getJSONData(
//				"/publish/yuangong/getKaiDanDoctorByQuanxian.htm", {
//					tag : Math.random()
//				}, "post");
//		if (data_getKaiDanDoctorByQuanxian.state) {
//			var yuangonglist = data_getKaiDanDoctorByQuanxian.obj;
//			$.each(yuangonglist, function(i, yuangong) {
//				$(
//						"<option value=\"" + yuangong.gonghao + "\">"
//								+ yuangong.xingming + "</option>").appendTo(
//						"#rep_doc");
//			});
//		}
//	}
	// 申请医生下拉框赋值

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
	// 检查医生下拉框赋值
	var url_outBaogaoHemp = "/publish/baogao/outBaogaoHelp.htm";
	var patameter_outBaogaoHemp = {
		id : dataObjects_choice[0].jcdid,
		huanzheId : dataObjects_choice[0].huanzheId,
		tag : Math.random()
	};
	var data_outBaogaoHelp = getJSONData(url_outBaogaoHemp,
			patameter_outBaogaoHemp, "POST");
	if (data_outBaogaoHelp.state) {
		initial_Baogao(data_outBaogaoHelp.obj);
	}

	var url_selectEyeEOGByEyeEOG = "/publish/EyeEOG/selectEyeEOGByEyeEOG.htm";
	var data_selectEyeEOGByEyeEOG = getJSONData(url_selectEyeEOGByEyeEOG, {
		jcdId : dataObjects_choice[0].jcdid,
		tag : Math.random()
	}, "POST");

	if (data_selectEyeEOGByEyeEOG.state) {
		var eyeEOG = data_selectEyeEOGByEyeEOG.obj;
		if (eyeEOG != null) {
			if ($("#sy_type").length == 1)//检查设备
				$("#sy_type").val(eyeEOG.sy_type);
			if ($("#ardenRatio_left").length == 1)
				$("#ardenRatio_left").val(eyeEOG.ardenRatioLeft);
			if ($("#ardenRratio_right").length == 1)
				$("#ardenRratio_right").val(eyeEOG.ardenRatioRight);
			if ($("#reduceLevel_left").length == 1)
				$("#reduceLevel_left").val(eyeEOG.reduceLevelLeft);
			if ($("#reduceLevel_right").length == 1)
				$("#reduceLevel_right").val(eyeEOG.reduceLevelRight);
			if ($("#eye_compare").length == 1)
				$("#eye_compare").val(eyeEOG.eyeCompare);
			if ($("#demo").length == 1)
				$("#demo").val(eyeEOG.demo);
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyeEOG.cliDate);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyeEOG.repDoc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyeEOG.doctor);// 检查医生
			if (data_outBaogaoHelp.obj.reportDate != eyeEOG.cliDate) {
				utilTool().fdisabled($("#div_reportresult"));
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyeEOG);
			}
		}
	}
}

function saveOrUpdateEyeEOG() {
	var parameter_saveOrUpdateEyeEOG = validateAndGetValue_eyeEOG();
	var url_saveOrUpdateEyeEOG = "/publish/EyeEOG/saveOrUpdateEyeEOG.htm";
	var data_saveOrUpdateEyeEOG = getJSONData(url_saveOrUpdateEyeEOG,
			parameter_saveOrUpdateEyeEOG, "POST");
	if (data_saveOrUpdateEyeEOG.state)
		$.oimsSucc("电生理EOG检查报告保存成功", function() {

		});
	else
		$.oimsError("电生理EOG检查报告保存失败", function() {

		});
}

function previewEyeEOG() {
	var parameter_saveOrUpdateEyeEOG = validateAndGetValue_eyeEOG();
	parameter_saveOrUpdateEyeEOG = JSON.stringify(parameter_saveOrUpdateEyeEOG)
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
			+ "/js/manager/baogao/previewEyeEOG.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyeEOG="
			+ parameter_saveOrUpdateEyeEOG + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}

function validateAndGetValue_eyeEOG() {
	var oValidataData = {
		nullValidataData : {

		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);
		return;
	}

	var jcdId = dataObjects_choice[0].jcdid;
	var sy_type = $("#sy_type").val();
	var ardenRatio_left = $("#ardenRatio_left").val();
	var ardenRratio_right = $("#ardenRratio_right").val();
	var reduceLevel_left = $("#reduceLevel_left").val();
	var reduceLevel_right = $("#reduceLevel_right").val();

	var eye_compare = $("#eye_compare").val();
	var rep_doc = $("#rep_doc option:selected").val();
	var rep_doc_name = $("#rep_doc option:selected").text();
	var doctor = $("#doctor option:selected").val();
	var doctor_name = $("#doctor option:selected").text();
	var cli_date = $("#cli_date ").html();// 报告日期
	var demo = $("#demo").val();// 报告备注

	var parameter_saveOrUpdateEyeEOG = {
		sy_type : sy_type,
		ardenRatioLeft : ardenRatio_left,
		ardenRatioRight : ardenRratio_right,
		reduceLevelLeft : reduceLevel_left,
		reduceLevelRight : reduceLevel_right,
		eyeCompare : eye_compare,
		cliDate : cli_date,
		jcdId : jcdId,
		repDoc : rep_doc,
		doctor : doctor,
		rep_doc_name : rep_doc_name,
		doctor_name : doctor_name,
		demo : demo,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		tag : Math.random()
	}
	return parameter_saveOrUpdateEyeEOG;
}
