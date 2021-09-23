//var data_eyejmdxt_check_doc = [ {
//	value_check_doc : '',
//	key_check_doc : ''
//}, {
//	value_check_doc : '暗适应',
//	key_check_doc : '暗适应'
//}, {
//	value_check_doc : '瞳孔光反射',
//	key_check_doc : '瞳孔光反射'
//}, {
//	value_check_doc : '黄斑色素密度',
//	key_check_doc : '黄斑色素密度'
//} ];

// 暗适应检查报告必要的数据初始化
function initData_eyejmdxt() {
	// 检查子类下拉框赋值
//	if ($("#check_doc").length == 1) {
//		for (var i = 0; i < data_eyejmdxt_check_doc.length; i++)
//			$(
//					"<option value=\""
//							+ data_eyejmdxt_check_doc[i].value_check_doc
//							+ "\">" + data_eyejmdxt_check_doc[i].key_check_doc
//							+ "</option>").appendTo("#check_doc");
//	}
	// 检查子类下拉框赋值

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
	var url_selectEyejmdxtByEyejmdxt = "/publish/Eyejmdxt/selectEyejmdxtByEyejmdxt.htm";// 根据暗适应报告对象查询符合条件的暗适应报告对象
	var data_selectEyejmdxtByEyejmdxt = getJSONData(
			url_selectEyejmdxtByEyejmdxt, {
				jcdId : dataObjects_choice[0].jcdid,
				tag : Math.random()
			}, "post");
	if (data_selectEyejmdxtByEyejmdxt.state) {
		var eyejmdxt = data_selectEyejmdxtByEyejmdxt.obj;
		if (eyejmdxt != null) {
			if ($("#check_doc").length == 1)
				$("#check_doc").val(eyejmdxt.check_type);// 检查子类
			if ($("#jm_ql").length == 1)
				$("#jm_ql").val(eyejmdxt.jm_ql);// 检查结果
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyejmdxt.cli_date);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyejmdxt.rep_doc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyejmdxt.doctor);// 检查医生
			if (data_outBaogaoHelp.obj.reportDate != eyejmdxt.cli_date) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyejmdxt);
			}
		}
	}
}

// 暗适应检查报告保存
function saveOrUpdateEyejmdxt(state) {
	var oValidataData = {
		nullValidataData : {
			'check_doc' : '检查子类为空',
			'jm_ql' : '检查结果为空',
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
	var check_doc = $("#check_doc").val();// 检查子类
	var jm_ql = $("#jm_ql").val();// 检查结果
	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var cli_date = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyejmdxt = {
		jcdId : jcdId,// 检查单ID
		check_type : check_doc,// 检查子类
		jm_ql : jm_ql,// 检查结果
		rep_doc : rep_doc,// 申请医生
		doctor : doctor,// 检查医生
		cli_date : cli_date,// 报告日期
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		tag : Math.random()
	};
	var url_saveOrUpdateEyejmdxt = "/publish/Eyejmdxt/saveOrUpdateEyejmdxt.htm";// 暗适应检查报告保存
	var data_saveOrUpdateEyejmdxt = getJSONData(url_saveOrUpdateEyejmdxt,
			parameter_saveOrUpdateEyejmdxt, "post");
	if (data_saveOrUpdateEyejmdxt.state)
		$.oimsSucc("暗适应检查报告保存成功", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待见患者界面
				closeReporeDialog();
			}
		});
	else
		$.oimsError("暗适应检查报告保存失败", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待见患者界面
				closeReporeDialog();
			}
		});
}

// 暗适应检查报告打印预览
function previewEyejmdxt() {
	var oValidataData = {
		nullValidataData : {
			'check_doc' : '检查子类为空',
			'jm_ql' : '检查结果为空',
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
	var check_doc = $("#check_doc").val();// 检查子类
	var jm_ql = $("#jm_ql").val();// 检查结果
	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var rep_doc_name = $("#rep_doc option:selected").text();// 申请医生
	var doctor_name = $("#doctor option:selected").text();// 检查医生
	var cli_date = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyejmdxt = {
		jcdId : jcdId,// 检查单ID
		check_type : check_doc,// 检查子类
		jm_ql : jm_ql,// 检查结果
		rep_doc : rep_doc,// 申请医生
		doctor : doctor,// 检查医生
		rep_doc_name : rep_doc_name,// 申请医生姓名
		doctor_name : doctor_name,// 检查医生姓名
		cli_date : cli_date,// 报告日期
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		tag : Math.random()
	};
	parameter_saveOrUpdateEyejmdxt = JSON.stringify(
			parameter_saveOrUpdateEyejmdxt)
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
			+ "/js/manager/baogao/previewEyejmdxt.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyejmdxt="
			+ parameter_saveOrUpdateEyejmdxt + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}
