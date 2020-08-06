//角膜曲率记初始化数据
function initData_eyejmqlj() {
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

	var url_selectEyejmqljByEyejmqlj = "/publish/Eyejmqlj/selectEyejmqljByEyejmqlj.htm";
	var data_selectEyejmqljByEyejmqlj = getJSONData(
			url_selectEyejmqljByEyejmqlj, {
				jcdId : dataObjects_choice[0].jcdid,
				tag : Math.random()
			}, "post");
	if (data_selectEyejmqljByEyejmqlj.state) {
		var eyejmqlj = data_selectEyejmqljByEyejmqlj.obj;
		if (eyejmqlj != null) {

			if ($("#rk1").length == 1)
				$("#rk1").val(eyejmqlj.rk1);
			if ($("#rk1_direction").length == 1)
				$("#rk1_direction").val(eyejmqlj.rk1_direction);
			if ($("#rk2").length == 1)
				$("#rk2").val(eyejmqlj.rk2);
			if ($("#rk2_direction").length == 1)
				$("#rk2_direction").val(eyejmqlj.rk2_direction);

			if ($("#lk1").length == 1)
				$("#lk1").val(eyejmqlj.lk1);
			if ($("#lk1_direction").length == 1)
				$("#lk1_direction").val(eyejmqlj.lk1_direction);
			if ($("#lk2").length == 1)
				$("#lk2").val(eyejmqlj.lk2);
			if ($("#lk2_direction").length == 1)
				$("#lk2_direction").val(eyejmqlj.lk2_direction);

			if ($("#demo").length == 1)
				$("#demo").val(eyejmqlj.demo);

			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyejmqlj.cli_date);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyejmqlj.rep_doc);
			if ($("#doctor").length == 1)
				$("#doctor").val(eyejmqlj.doctor);

			if (data_outBaogaoHelp.obj.reportDate != eyejmqlj.cli_date) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyejmqlj);
			}
		}
	}
}

// 角膜曲率计报告保存或者修改
function saveOrUpdateEyejmqlj(state) {
	var oValidataData = {
		nullValidataData : {
			'rk1' : '右眼K1为空',
			'rk1_direction' : '右眼K1方向为空',
			'rk2' : '右眼K2为空',
			'rk2_direction' : '右眼K2方向为空',

			'lk1' : '左眼K1为空',
			'lk1_direction' : '左眼K1方向为空',
			'lk2' : '左眼K2为空',
			'lk2_direction' : '左眼K2方向为空',

			'demo' : '报告备注为空',

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
	var rk1 = $("#rk1").val();// 右眼K1
	var rk1_direction = $("#rk1_direction").val();// 右眼K1方向
	var rk2 = $("#rk2").val();// 右眼K2
	var rk2_direction = $("#rk2_direction").val();// 右眼K2方向

	var lk1 = $("#lk1").val();// 左眼K1
	var lk1_direction = $("#lk1_direction").val();// 左眼K1方向
	var lk2 = $("#lk2").val();// 左眼K2
	var lk2_direction = $("#lk2_direction").val();// 左眼K2方向

	var demo = $("#demo").val();// 报告备注

	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var cli_date = $("#cli_date ").html();// 报告日期

	var parameter_saveOrUpdateEyejmqlj = {
		jcdId : jcdId,// 检查单ID

		rk1 : rk1,// 右眼K1
		rk1_direction : rk1_direction,// 右眼K1方向
		rk2 : rk2,// 右眼K2
		rk2_direction : rk2_direction,// 右眼K2方向

		lk1 : lk1,// 左眼K1
		lk1_direction : lk1_direction,// 左眼K1方向
		lk2 : lk2,// 左眼K2
		lk2_direction : lk2_direction,// 左眼K2方向

		demo : demo,// 报告备注
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,

		rep_doc : rep_doc,// 申请医生
		doctor : doctor,// 检查医生
		cli_date : cli_date,// 报告日期
		tag : Math.random()
	};
	var url_saveOrUpdateEyejmqlj = "/publish/Eyejmqlj/saveOrUpdateEyejmqlj.htm";
	var data_saveOrUpdateEyejmqlj = getJSONData(url_saveOrUpdateEyejmqlj,
			parameter_saveOrUpdateEyejmqlj, "post");
	if (data_saveOrUpdateEyejmqlj.state)
		$.oimsSucc("角膜曲率计报告保存成功", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待见患者界面
				closeReporeDialog();
			}
		});
	else
		$.oimsError("角膜曲率计报告保存失败", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待见患者界面
				closeReporeDialog();
			}
		});
}

// 角膜内皮计数报告打印预览
function previewEyejmqlj() {
	var oValidataData = {
		nullValidataData : {
			'rk1' : '右眼K1为空',
			'rk1_direction' : '右眼K1方向为空',
			'rk2' : '右眼K2为空',
			'rk2_direction' : '右眼K2方向为空',

			'lk1' : '左眼K1为空',
			'lk1_direction' : '左眼K1方向为空',
			'lk2' : '左眼K2为空',
			'lk2_direction' : '左眼K2方向为空',

			'demo' : '报告备注为空',

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
	var rk1 = $("#rk1").val();// 右眼K1
	var rk1_direction = $("#rk1_direction").val();// 右眼K1方向
	var rk2 = $("#rk2").val();// 右眼K2
	var rk2_direction = $("#rk2_direction").val();// 右眼K2方向

	var lk1 = $("#lk1").val();// 左眼K1
	var lk1_direction = $("#lk1_direction").val();// 左眼K1方向
	var lk2 = $("#lk2").val();// 左眼K2
	var lk2_direction = $("#lk2_direction").val();// 左眼K2方向

	var demo = $("#demo").val();// 报告备注

	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var rep_doc_name = $("#rep_doc option:selected").text();// 申请医生
	var doctor_name = $("#doctor option:selected").text();// 检查医生
	var cli_date = $("#cli_date ").html();// 报告日期

	var parameter_saveOrUpdateEyejmqlj = {
			jcdId : jcdId,// 检查单ID

		rk1 : rk1,// 右眼K1
		rk1_direction : rk1_direction,// 右眼K1方向
		rk2 : rk2,// 右眼K2
		rk2_direction : rk2_direction,// 右眼K2方向

		lk1 : lk1,// 左眼K1
		lk1_direction : lk1_direction,// 左眼K1方向
		lk2 : lk2,// 左眼K2
		lk2_direction : lk2_direction,// 左眼K2方向

		demo : demo,// 报告备注
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,

		rep_doc : rep_doc,// 申请医生
		doctor : doctor,// 检查医生
		rep_doc_name : rep_doc_name,// 申请医生姓名
		doctor_name : doctor_name,// 检查医生姓名
		cli_date : cli_date,// 报告日期
		tag : Math.random()
	};
	parameter_saveOrUpdateEyejmqlj = JSON.stringify(
			parameter_saveOrUpdateEyejmqlj)
			.replace(new RegExp("\"", "gm"), "'");
	var html_div_reportresult =  "<div id='div_reportresult'>"+$("#div_reportresult").html()+"</div>";// 报告内容
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
			+ "/js/manager/baogao/previewEyejmqlj.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyejmqlj="
			+ parameter_saveOrUpdateEyejmqlj + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}
