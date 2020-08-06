// 三面镜检查报告必要的数据初始化
function initData_eyesmj_jiancha() {
	// 申请医生下拉框赋值
	if ($("#rep_doc").length == 1) {
		var data_getKaiDanDoctorByQuanxian = getJSONData(
				"/publish/yuangong/getKaiDanDoctorByQuanxian.htm", {
					tag : Math.random()
				}, "post");
		if (data_getKaiDanDoctorByQuanxian.state) {
			var yuangonglist = data_getKaiDanDoctorByQuanxian.obj;
			$.each(yuangonglist, function(i, yuangong) {
				$(
						"<option value=\"" + yuangong.gonghao + "\">"
								+ yuangong.xingming + "</option>").appendTo(
						"#rep_doc");
			});
		}
	}
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
	var url_selectEyesmjByEyesmj = "/publish/Eyesmj/selectEyesmjByEyesmj.htm";// 根据三面镜报告对象查询符合条件的三面镜报告对象
	var data_selectEyesmjByEyesmj = getJSONData(url_selectEyesmjByEyesmj, {
		jcdId : dataObjects_choice[0].jcdid,
		tag : Math.random()
	}, "post");
	if (data_selectEyesmjByEyesmj.state) {
		var eyesmj = data_selectEyesmjByEyesmj.obj;
		if (eyesmj != null) {
			if ($("#smj_result").length == 1)
				$("#smj_result").val(eyesmj.smj_result);// 检查结果
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyesmj.cli_date);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyesmj.rep_doc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyesmj.doctor);// 检查医生
			if (data_outBaogaoHelp.obj.reportDate != eyesmj.cli_date) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyesmj);
			}
		}
	}
}

// 三面镜检查报告保存
function saveOrUpdateEyesmj_jiancha() {
	var oValidataData = {
		nullValidataData : {
			'smj_result' : '检查结果为空',
			'rep_doc' : '申请医生为空',
			'doctor' : '检查医生为空'
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);// 带*为必填项
		return;
	}
	var jcdId = dataObjects_choice[0].jcdid;// 检查单ID
	var huanzhexinxi_id = dataObjects_choice[0].huanzheId;// 患者ID
	var smj_result = $("#smj_result").val();// 检查结果
	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var cli_date = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyesmj = {
		jcdId : jcdId,// 检查单ID
		huanzhexinxi_id : huanzhexinxi_id,// 患者ID
		smj_result : smj_result,// 检查结果
		rep_doc : rep_doc,// 申请医生
		doctor : doctor,// 检查医生
		cli_date : cli_date,// 报告日期
		tag : Math.random()
	};
	var url_saveOrUpdateEyesmj = "/publish/Eyesmj/saveOrUpdateEyesmj.htm";// 三面镜检查报告保存
	var data_saveOrUpdateEyesmj = getJSONData(url_saveOrUpdateEyesmj,
			parameter_saveOrUpdateEyesmj, "post");
	if (data_saveOrUpdateEyesmj.state)
		$.oimsSucc("三面镜检查报告保存成功", function() {
			closeReporeDialog();
		});
	else
		$.oimsError("三面镜检查报告保存失败", function() {
			closeReporeDialog();
		});
}

// 三面镜检查报告打印预览
function previewEyesmj_jiancha() {
	var oValidataData = {
		nullValidataData : {
			'smj_result' : '检查结果为空',
			'rep_doc' : '申请医生为空',
			'doctor' : '检查医生为空'
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);// 带*为必填项
		return;
	}
	var jcdId = dataObjects_choice[0].jcdid;// 检查单ID
	var huanzhexinxi_id = dataObjects_choice[0].huanzheId;// 患者ID
	var smj_result = $("#smj_result").val();// 检查结果
	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var cli_date = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyesmj = {
		jcdId : jcdId,// 检查单ID
		huanzhexinxi_id : huanzhexinxi_id,// 患者ID
		smj_result : smj_result,// 检查结果
		rep_doc : rep_doc,// 申请医生
		doctor : doctor,// 检查医生
		cli_date : cli_date,// 报告日期
		tag : Math.random()
	};
	parameter_saveOrUpdateEyesmj = JSON.stringify(parameter_saveOrUpdateEyesmj)
			.replace(new RegExp("\"", "gm"), "'");
	var html_div_reportresult = "<div id='div_reportresult'>"
			+ $("#div_reportresult").html() + "</div>";// 报告内容
	closeReporeDialog();
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
			+ "/js/manager/baogao/language.config.js'></script>";
	html_baogao += "<script src='" + contextPath
			+ "/js/manager/baogao/previewEyesmj.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyesmj="
			+ parameter_saveOrUpdateEyesmj + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}
