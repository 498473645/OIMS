//角膜厚度初始化
function initData_eyejmhd() {
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
	//根jmhd报告对象查询符合条件的jmhd报告对象
	var url_selectEyejmhdByEyejmhd = "/publish/Eyejmhd/selectEyejmhdByEyejmhd.htm";
	var data_selectEyejmhdByEyejmhd = getJSONData(
			url_selectEyejmhdByEyejmhd, {
				jcdId : dataObjects_choice[0].jcdid,
				tag : Math.random()
			}, "post");
	if (data_selectEyejmhdByEyejmhd.state) {
		var eyejmhd = data_selectEyejmhdByEyejmhd.obj;
		if (eyejmhd != null) {
			if ($("#zuoyan").length == 1)
				$("#zuoyan").val(eyejmhd.zuoyan);// 左眼
			if ($("#youyan").length == 1)
				$("#youyan").val(eyejmhd.youyan);//右眼
			if ($("#demo").length == 1)
				$("#demo").val(eyejmhd.demo);// 备注
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyejmhd.cliDate);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyejmhd.repDoc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyejmhd.doctor);// 检查医生
			if (data_outBaogaoHelp.obj.reportDate != eyejmhd.cliDate) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyejmhd);
			}
		}
	}
}

// jmhd检查报告保存
function saveOrUpdateEyejmhd(state) {
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
	var zuoyan = $("#zuoyan").val();// 左眼
	var youyan = $("#youyan").val();// 右眼
	var demo = $("#demo").val();//备注
	var repDoc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var cliDate = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyejmhd = {
		jcdId : jcdId,// 检查单ID
		zuoyan : zuoyan,
		youyan : youyan,
		demo : demo,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		repDoc : repDoc,// 申请医生
		doctor : doctor,// 检查医生
		cliDate : cliDate,// 报告日期
		tag : Math.random()
	};
	var url_saveOrUpdateEyejmhd = "/publish/Eyejmhd/saveOrUpdateEyejmhd.htm";// jmhd检查报告保存
	var data_saveOrUpdateEyejmhd = getJSONData(url_saveOrUpdateEyejmhd,
			parameter_saveOrUpdateEyejmhd, "post");
	if (data_saveOrUpdateEyejmhd.state)
		$.oimsSucc("角膜厚度检查报告保存成功", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待检患者界面
				closeReporeDialog();
			}
		});
	else
		$.oimsError("角膜厚度检查报告保存失败", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待检患者界面
				closeReporeDialog();
			}
		});
}

// jmhd检查报告打印预览
function previewEyejmhd() {
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
	var zuoyan = $("#zuoyan").val();// 左眼
	var youyan = $("#youyan").val();//右眼
	var demo = $("#demo").val();// 备注
	var repDoc = $("#rep_doc option:selected").val();// 申请医生
	var repDoc_name = $("#rep_doc option:selected").text();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var doctor_name = $("#doctor option:selected").text();// 检查医生
	var cliDate = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyejmhd = {
		jcdId : jcdId,// 检查单ID
		zuoyan : zuoyan,
		youyan : youyan,
		demo : demo,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		repDoc : repDoc,// 申请医生
		doctor : doctor,// 检查医生
		repDoc_name : repDoc_name,// 申请医生
		doctor_name : doctor_name,// 检查医生
		cliDate : cliDate,// 报告日期
		tag : Math.random()
	};
	parameter_saveOrUpdateEyejmhd = JSON.stringify(
			parameter_saveOrUpdateEyejmhd)
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
			+ "/js/manager/baogao/previewEyejmhd.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyejmhd="
			+ parameter_saveOrUpdateEyejmhd + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}
