//三棱镜初始化
function initData_eyeslj() {
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
	//根slj报告对象查询符合条件的slj报告对象
	var url_selectEyesljByEyeslj = "/publish/Eyeslj/selectEyesljByEyeslj.htm";
	var data_selectEyesljByEyeslj = getJSONData(
			url_selectEyesljByEyeslj, {
				jcdId : dataObjects_choice[0].jcdid,
				tag : Math.random()
			}, "post");
	if (data_selectEyesljByEyeslj.state) {
		var eyeslj = data_selectEyesljByEyeslj.obj;
		if (eyeslj != null) {
			if ($("#ly_l_33").length == 1)
				$("#ly_l_33").val(eyeslj.ly_l_33);//裸眼左眼注视
			if ($("#ly_r_33").length == 1)
				$("#ly_r_33").val(eyeslj.ly_r_33);// 裸眼右眼注视 
			if ($("#dj_l_33").length == 1)
				$("#dj_l_33").val(eyeslj.dj_l_33);// 戴镜左眼注视
			if ($("#dj_r_33").length == 1)
				$("#dj_r_33").val(eyeslj.dj_r_33);// 戴镜右眼注视
			if ($("#ly_l_5").length == 1)
				$("#ly_l_5").val(eyeslj.ly_l_5);
			if ($("#ly_r_5").length == 1)
				$("#ly_r_5").val(eyeslj.ly_r_5);
			if ($("#dj_l_5").length == 1)
				$("#dj_l_5").val(eyeslj.dj_l_5);
			if ($("#dj_r_5").length == 1)
				$("#dj_r_5").val(eyeslj.dj_r_5);
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyeslj.cliDate);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyeslj.repDoc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyeslj.doctor);// 检查医生
			if (data_outBaogaoHelp.obj.reportDate != eyeslj.cliDate) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyeslj);
			}
		}
	}
}

// slj检查报告保存
function saveOrUpdateEyeslj(state) {
	var parameter_saveOrUpdateEyeslj = validateAndGetValue_eyeslj();
	var url_saveOrUpdateEyeslj = "/publish/Eyeslj/saveOrUpdateEyeslj.htm";// slj检查报告保存
	var data_saveOrUpdateEyeslj = getJSONData(url_saveOrUpdateEyeslj,
			parameter_saveOrUpdateEyeslj, "post");
	if (data_saveOrUpdateEyeslj.state)
		$.oimsSucc("三棱镜检查报告保存成功", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待检患者界面
				closeReporeDialog();
			}
		});
	else
		$.oimsError("三棱镜检查报告保存失败", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待检患者界面
				closeReporeDialog();
			}
		});
}

// slj检查报告打印预览
function previewEyeslj() {
	var parameter_saveOrUpdateEyeslj = validateAndGetValue_eyeslj();
	parameter_saveOrUpdateEyeslj = JSON.stringify(
			parameter_saveOrUpdateEyeslj)
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
			+ "/js/manager/baogao/previewEyeslj.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyeslj="
			+ parameter_saveOrUpdateEyeslj + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}
function validateAndGetValue_eyeslj(){
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
		var ly_l_33 = $("#ly_l_33").val();// 裸眼左眼注视
		var ly_r_33 = $("#ly_r_33").val();// 裸眼右眼注视
		var dj_l_33 = $("#dj_l_33").val();// 戴镜左眼注视
		var dj_r_33 = $("#dj_r_33").val();// 戴镜右眼注视
		var ly_l_5 = $("#ly_l_5").val();
		var ly_r_5 = $("#ly_r_5").val();
		var dj_l_5 = $("#dj_l_5").val();
		var dj_r_5 = $("#dj_r_5").val();
		var repDoc = $("#rep_doc option:selected").val();// 申请医生
		var doctor = $("#doctor option:selected").val();// 检查医生
		var repDoc_name = $("#rep_doc option:selected").text();// 申请医生姓名
		var doctor_name = $("#doctor option:selected").text();// 检查医生姓名
		var cliDate = $("#cli_date ").html();// 报告日期
		var parameter_saveOrUpdateEyeslj = {
			jcdId : jcdId,// 检查单ID
			ly_l_33 : ly_l_33,
			ly_r_33 : ly_r_33,
			dj_l_33 : dj_l_33,
			dj_r_33 : dj_r_33,
			ly_l_5 : ly_l_5,
			ly_r_5 : ly_r_5,
			dj_l_5 : dj_l_5,
			dj_r_5 : dj_r_5,
			repDoc : repDoc,// 申请医生
			doctor : doctor,// 检查医生
			repDoc_name : repDoc_name,// 申请医生姓名
			doctor_name : doctor_name,// 检查医生姓名
			cliDate : cliDate,// 报告日期
			baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
			tag : Math.random()
		};
		return parameter_saveOrUpdateEyeslj;
}