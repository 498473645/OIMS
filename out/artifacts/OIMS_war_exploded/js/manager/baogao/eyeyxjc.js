//隐斜检查初始化数据
function initData_eyeyxjc() {
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
	// 初始化患者信息
	var url_outBaogaoHelp = "/publish/baogao/outBaogaoHelp.htm";// 查询该报告页面所有元素信息
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
	// 初始化报告信息
	var url_selectEyeyxjcByEyeyxjc = "/publish/Eyeyxjc/selectEyeyxjcByEyeyxjc.htm";
	var data_selectEyeyxjc = getJSONData(url_selectEyeyxjcByEyeyxjc, {
		jcdId : dataObjects_choice[0].jcdid
	}, "post");
	// console.dir(data_selectEyeyxjc);
	if (data_selectEyeyxjc.state) {
		var eyeyxjc = data_selectEyeyxjc.obj;
		if (eyeyxjc != null) {
			if ($("#jcfs").length == 1)
				$("#jcfs").val(eyeyxjc.jcfs); // 检查方式
			if ($("#result").length == 1)
				$("#result").val(eyeyxjc.result); // 检查结果
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyeyxjc.cli_date); // 检查时间
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyeyxjc.rep_doc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyeyxjc.doctor);// 检查医生
			// console.log(data_outBaogaoHelp.obj.reportDate !=
			// eyeyxjc.cli_date);
			if (data_outBaogaoHelp.obj.reportDate != eyeyxjc.cli_date) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyeyxjc);
			}
		}
	}

}
// 保存或修改隐斜检查
function saveOrUpdateEyeyxjc(state) {
	var oValidataData = {
		nullValidataData : {
			'jcfs' : '检查方式为空',
			'result' : '检查结果为空',
			'rep_doc' : '申请医生为空',
			'doctor' : '检查医生为空'
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);
		return;
	}
	var jcdId = dataObjects_choice[0].jcdid; // 检查单ID
	var huanzhexinxi_id = dataObjects_choice[0].huanzheId;// 患者ID
	var result = $("#result").val(); // 检查结果
	var jcfs = $("#jcfs").val(); // 检查方式
	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var cli_date = $("#cli_date").html(); // 报告日期
	var parameter_saveOrUpdateEyeyxjc = {
		jcdId : jcdId,
		huanzhexinxi_id : huanzhexinxi_id,
		jcfs : jcfs,
		result : result,
		rep_doc : rep_doc,
		doctor : doctor,
		cli_date : cli_date,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		tag : Math.random()
	};
	var url_saveOrUpdateEyeyxjc = "/publish/Eyeyxjc/saveOrUpdateEyeyxjc.htm";
	var data_saveOrUpdateEyeyxjc = getJSONData(url_saveOrUpdateEyeyxjc,
			parameter_saveOrUpdateEyeyxjc, "post");
	if (data_saveOrUpdateEyeyxjc.state)
		$.oimsSucc("隐斜检查报告保存成功", function() {
			if (state != undefined && state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待见患者界面
				closeReporeDialog();
			}
		});
	else
		$.oimsError("隐斜检查保存失败", function() {
			if (state != undefined && state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待见患者界面
				closeReporeDialog();
			}
		});
}

// 隐斜检查打印预览
function previewEyeyxjc() {
	var oValidataData = {
		nullValidataData : {
			'jcfs' : '检查方式为空',
			'result' : '检查结果为空',
			'rep_doc' : '申请医生为空',
			'doctor' : '检查医生为空'
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);
		return;
	}
	var jcdId = dataObjects_choice[0].jcdid; // 检查单ID
	var huanzhexinxi_id = dataObjects_choice[0].huanzheId;// 患者ID
	var result = $("#result").val(); // 检查结果
	var jcfs = $("#jcfs").val(); // 检查方式
	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var rep_doc_name = $("#rep_doc option:selected").text();// 申请医生
	var doctor_name = $("#doctor option:selected").text();// 检查医生
	var cli_date = $("#cli_date").html(); // 报告日期
	var parameter_saveOrUpdateEyeyxjc = {
		jcdId : jcdId,
		huanzhexinxi_id : huanzhexinxi_id,
		jcfs : jcfs,
		result : result,
		rep_doc : rep_doc,
		doctor : doctor,
		rep_doc_name : rep_doc_name,// 申请医生姓名
		doctor_name : doctor_name,// 检查医生姓名
		cli_date : cli_date,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		tag : Math.random()
	};
	parameter_saveOrUpdateEyeyxjc = JSON.stringify(
			parameter_saveOrUpdateEyeyxjc).replace(new RegExp("\"", "gm"), "'");
	var html_div_reportresult = "<div id='div_reportresult'>"
			+ $("#div_reportresult").html() + "</div>"; // 报告内容
	var printWindow = window.open("");
	var html_baogao = "";
	html_baogao += "<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'>";
	html_baogao += "<html>";
	html_baogao += "<head>";
	html_baogao += "<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>";
	html_baogao += "<title>报告预览</title>";
	html_baogao += "<script language='javascript'> var contextPath='"
			+ contextPath + "';</script>";
	html_baogao += "<link rel='stylesheet' type='text/css' href='"
			+ contextPath + "/css/main.css' >";
	html_baogao += "<link rel='stylesheet' type='text/css' href='"
			+ contextPath + "/style/green/css/green.css' >";
	html_baogao += "<link rel='stylesheet' type='text/css' href='"
			+ contextPath + "/css/icon.css' >";
	html_baogao += "<link rel='stylesheet' type='text/css' href='"
			+ contextPath + "/style/green/css/openWin.css' >";
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
			+ "/js/manager/baogao/previewEyeyxjc.js'></script>";
	html_baogao += "<script type='text/javascript'>"
			+ "var parameter_saveOrUpdateEyeyxjc = "
			+ parameter_saveOrUpdateEyeyxjc + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}
