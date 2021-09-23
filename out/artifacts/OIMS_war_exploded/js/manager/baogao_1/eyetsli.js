//特殊視力检查录入
function initData_eyetsli() {
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
	//根tsli报告对象查询符合条件的tsli报告对象
	var url_selectEyetsliByEyetsli = "/publish/Eyetsli/selectEyetsliByEyetsli.htm";
	var data_selectEyetsliByEyetsli = getJSONData(
			url_selectEyetsliByEyetsli, {
				jcdId : dataObjects_choice[0].jcdid,
				tag : Math.random()
			}, "post");
	if (data_selectEyetsliByEyetsli.state) {
		var eyetsli = data_selectEyetsliByEyetsli.obj;
		if (eyetsli != null) {
			if ($("#tx_ys_ly_l").length == 1)
				$("#tx_ys_ly_l").val(eyetsli.tx_ys_ly_l);//图形远视、近视
			if ($("#tx_ys_ly_r").length == 1)
				$("#tx_ys_ly_r").val(eyetsli.tx_ys_ly_r);
			if ($("#tx_ys_jz_l").length == 1)
				$("#tx_ys_jz_l").val(eyetsli.tx_ys_jz_l);
			if ($("#tx_ys_jz_r").length == 1)
				$("#tx_ys_jz_r").val(eyetsli.tx_ys_jz_r);
			if ($("#tx_ys_zk_l").length == 1)
				$("#tx_ys_zk_l").val(eyetsli.tx_ys_zk_l);
			if ($("#tx_ys_zk_r").length == 1)
				$("#tx_ys_zk_r").val(eyetsli.tx_ys_zk_r);
			if ($("#tx_js_ly_l").length == 1)
				$("#tx_js_ly_l").val(eyetsli.tx_js_ly_l);
			if ($("#tx_js_ly_r").length == 1)
				$("#tx_js_ly_r").val(eyetsli.tx_js_ly_r);
			if ($("#tx_js_jz_l").length == 1)
				$("#tx_js_jz_l").val(eyetsli.tx_js_jz_l);
			if ($("#tx_js_jz_r").length == 1)
				$("#tx_js_jz_r").val(eyetsli.tx_js_jz_r);
			if ($("#tx_js_zk_l").length == 1)
				$("#tx_js_zk_l").val(eyetsli.tx_js_zk_l);
			if ($("#tx_js_zk_r").length == 1)
				$("#tx_js_zk_r").val(eyetsli.tx_js_zk_r);
			
			if ($("#E_ys_ly_l").length == 1)// E形_远视、近视
				$("#E_ys_ly_l").val(eyetsli.e_ys_ly_l);
			if ($("#E_ys_ly_r").length == 1)
				$("#E_ys_ly_r").val(eyetsli.e_ys_ly_r);
			if ($("#E_ys_jz_l").length == 1)
				$("#E_ys_jz_l").val(eyetsli.e_ys_jz_l);
			if ($("#E_ys_jz_r").length == 1)
				$("#E_ys_jz_r").val(eyetsli.e_ys_jz_r);
			if ($("#E_ys_zk_l").length == 1)
				$("#E_ys_zk_l").val(eyetsli.e_ys_zk_l);
			if ($("#E_ys_zk_r").length == 1)
				$("#E_ys_zk_r").val(eyetsli.e_ys_zk_r);
			if ($("#E_js_ly_l").length == 1)
				$("#E_js_ly_l").val(eyetsli.e_js_ly_l);
			if ($("#E_js_ly_r").length == 1)
				$("#E_js_ly_r").val(eyetsli.e_js_ly_r);
			if ($("#E_js_jz_l").length == 1)
				$("#E_js_jz_l").val(eyetsli.e_js_jz_l);
			if ($("#E_js_jz_r").length == 1)
				$("#E_js_jz_r").val(eyetsli.e_js_jz_r);
			if ($("#E_js_zk_l").length == 1)
				$("#E_js_zk_l").val(eyetsli.e_js_zk_l);
			if ($("#E_js_zk_r").length == 1)
				$("#E_js_zk_r").val(eyetsli.e_js_zk_r);
			
			if ($("#xz_ys_ly_l").length == 1)// 选择_远视、近视
				$("#xz_ys_ly_l").val(eyetsli.xz_ys_ly_l);
			if ($("#xz_ys_ly_r").length == 1)
				$("#xz_ys_ly_r").val(eyetsli.xz_ys_ly_r);
			if ($("#xz_ys_jz_l").length == 1)
				$("#xz_ys_jz_l").val(eyetsli.xz_ys_jz_l);
			if ($("#xz_ys_jz_r").length == 1)
				$("#xz_ys_jz_r").val(eyetsli.xz_ys_jz_r);
			if ($("#xz_ys_zk_l").length == 1)
				$("#xz_ys_zk_l").val(eyetsli.xz_ys_zk_l);
			if ($("#xz_ys_zk_r").length == 1)
				$("#xz_ys_zk_r").val(eyetsli.xz_ys_zk_r);
			if ($("#xz_js_ly_l").length == 1)
				$("#xz_js_ly_l").val(eyetsli.xz_js_ly_l);
			if ($("#xz_js_ly_r").length == 1)
				$("#xz_js_ly_r").val(eyetsli.xz_js_ly_r);
			if ($("#xz_js_jz_l").length == 1)
				$("#xz_js_jz_l").val(eyetsli.xz_js_jz_l);
			if ($("#xz_js_jz_r").length == 1)
				$("#xz_js_jz_r").val(eyetsli.xz_js_jz_r);
			if ($("#xz_js_zk_l").length == 1)
				$("#xz_js_zk_l").val(eyetsli.xz_js_zk_l);
			if ($("#xz_js_zk_r").length == 1)
				$("#xz_js_zk_r").val(eyetsli.xz_js_zk_r);
			
			if ($("#sj_l").length == 1)// 色觉
				$("#sj_l").val(eyetsli.sj_l);
			if ($("#sj_r").length == 1)
				$("#sj_r").val(eyetsli.sj_r);
			
			
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyetsli.cliDate);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyetsli.repDoc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyetsli.doctor);// 检查医生
			if (data_outBaogaoHelp.obj.reportDate != eyetsli.cliDate) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyetsli);
			}
		}
	}
}

// tsli检查报告保存
function saveOrUpdateEyetsli(state) {
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
	var tx_ys_ly_l = $("#tx_ys_ly_l").val();//图形远视、近视
	var tx_ys_ly_r = $("#tx_ys_ly_r").val();//  诊断
	var tx_ys_jz_l = $("#tx_ys_jz_l").val();
	var tx_ys_jz_r = $("#tx_ys_jz_r").val();
	var tx_ys_zk_l = $("#tx_ys_zk_l").val();
	var tx_ys_zk_r = $("#tx_ys_zk_r").val();
	var tx_js_ly_l = $("#tx_js_ly_l").val();
	var tx_js_ly_r = $("#tx_js_ly_r").val();
	var tx_js_jz_l = $("#tx_js_jz_l").val();
	var tx_js_jz_r = $("#tx_js_jz_r").val();
	var tx_js_zk_l = $("#tx_js_zk_l").val();
	var tx_js_zk_r = $("#tx_js_zk_r").val();
	
	var E_ys_ly_l = $("#E_ys_ly_l").val();//E形_远视/近视
	var E_ys_ly_r = $("#E_ys_ly_r").val();
	var E_ys_jz_l = $("#E_ys_jz_l").val();
	var E_ys_jz_r = $("#E_ys_jz_r").val();
	var E_ys_zk_l = $("#E_ys_zk_l").val();
	var E_ys_zk_r = $("#E_ys_zk_r").val();
	var E_js_ly_l = $("#E_js_ly_l").val();
	var E_js_ly_r = $("#E_js_ly_r").val();
	var E_js_jz_l = $("#E_js_jz_l").val();
	var E_js_jz_r = $("#E_js_jz_r").val();
	var E_js_zk_l = $("#E_js_zk_l").val();
	var E_js_zk_r = $("#E_js_zk_r").val();
	
	var xz_ys_ly_l = $("#xz_ys_ly_l").val();//选择_远视/近视
	var xz_ys_ly_r = $("#xz_ys_ly_r").val();
	var xz_ys_jz_l = $("#xz_ys_jz_l").val();
	var xz_ys_jz_r = $("#xz_ys_jz_r").val();
	var xz_ys_zk_l = $("#xz_ys_zk_l").val();
	var xz_ys_zk_r = $("#xz_ys_zk_r").val();
	var xz_js_ly_l = $("#xz_js_ly_l").val();
	var xz_js_ly_r = $("#xz_js_ly_r").val();
	var xz_js_jz_l = $("#xz_js_jz_l").val();
	var xz_js_jz_r = $("#xz_js_jz_r").val();
	var xz_js_zk_l = $("#xz_js_zk_l").val();
	var xz_js_zk_r = $("#xz_js_zk_r").val();
	
	var sj_l = $("#sj_l").val();//色觉
	var sj_r = $("#sj_r").val();
	
	var repDoc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var cliDate = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyetsli = {
		jcdId : jcdId,// 检查单ID
		tx_ys_ly_l : tx_ys_ly_l,// 图形_远视
		tx_ys_ly_r : tx_ys_ly_r,
		tx_ys_jz_l : tx_ys_jz_l,
		tx_ys_jz_r : tx_ys_jz_r,
		tx_ys_zk_l : tx_ys_zk_l,
		tx_ys_zk_r : tx_ys_zk_r,
		tx_js_ly_l : tx_js_ly_l,
		tx_js_ly_r : tx_js_ly_r,
		tx_js_jz_l : tx_js_jz_l,
		tx_js_jz_r : tx_js_jz_r,
		tx_js_zk_l : tx_js_zk_l,
		tx_js_zk_r : tx_js_zk_r,
		E_ys_ly_l : E_ys_ly_l,//E形_远视
		E_ys_ly_r : E_ys_ly_r,
		E_ys_jz_l : E_ys_jz_l,
		E_ys_jz_r : E_ys_jz_r,
		E_ys_zk_l : E_ys_zk_l,
		E_ys_zk_r : E_ys_zk_r,
		E_js_ly_l : E_js_ly_l,
		E_js_ly_r : E_js_ly_r,
		E_js_jz_l : E_js_jz_l,
		E_js_jz_r : E_js_jz_r,
		E_js_zk_l : E_js_zk_l,
		E_js_zk_r : E_js_zk_r,
		xz_ys_ly_l : xz_ys_ly_l,// 选择_远视
		xz_ys_ly_r : xz_ys_ly_r,
		xz_ys_jz_l : xz_ys_jz_l,
		xz_ys_jz_r : xz_ys_jz_r,
		xz_ys_zk_l : xz_ys_zk_l,
		xz_ys_zk_r : xz_ys_zk_r,
		xz_js_ly_l : xz_js_ly_l,
		xz_js_ly_r : xz_js_ly_r,
		xz_js_jz_l : xz_js_jz_l,
		xz_js_jz_r : xz_js_jz_r,
		xz_js_zk_l : xz_js_zk_l,
		xz_js_zk_r : xz_js_zk_r,
		sj_l : sj_l,// 色觉
		sj_r : sj_r,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		repDoc : repDoc,// 申请医生
		doctor : doctor,// 检查医生
		cliDate : cliDate,// 报告日期
		tag : Math.random()
	};
	var url_saveOrUpdateEyetsli = "/publish/Eyetsli/saveOrUpdateEyetsli.htm";// tsli检查报告保存
	var data_saveOrUpdateEyetsli = getJSONData(url_saveOrUpdateEyetsli,
			parameter_saveOrUpdateEyetsli, "post");
	if (data_saveOrUpdateEyetsli.state)
		$.oimsSucc("特殊视力检查报告保存成功", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待检患者界面
				closeReporeDialog();
			}
		});
	else
		$.oimsError("特殊视力检查报告保存失败", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待检患者界面
				closeReporeDialog();
			}
		});
}

// tsli检查报告打印预览
function previewEyetsli() {
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
	var tx_ys_ly_l = $("#tx_ys_ly_l").val();//图形远视、近视
	var tx_ys_ly_r = $("#tx_ys_ly_r").val();//  诊断
	var tx_ys_jz_l = $("#tx_ys_jz_l").val();
	var tx_ys_jz_r = $("#tx_ys_jz_r").val();
	var tx_ys_zk_l = $("#tx_ys_zk_l").val();
	var tx_ys_zk_r = $("#tx_ys_zk_r").val();
	var tx_js_ly_l = $("#tx_js_ly_l").val();
	var tx_js_ly_r = $("#tx_js_ly_r").val();
	var tx_js_jz_l = $("#tx_js_jz_l").val();
	var tx_js_jz_r = $("#tx_js_jz_r").val();
	var tx_js_zk_l = $("#tx_js_zk_l").val();
	var tx_js_zk_r = $("#tx_js_zk_r").val();
	
	var E_ys_ly_l = $("#E_ys_ly_l").val();//E形_远视/近视
	var E_ys_ly_r = $("#E_ys_ly_r").val();
	var E_ys_jz_l = $("#E_ys_jz_l").val();
	var E_ys_jz_r = $("#E_ys_jz_r").val();
	var E_ys_zk_l = $("#E_ys_zk_l").val();
	var E_ys_zk_r = $("#E_ys_zk_r").val();
	var E_js_ly_l = $("#E_js_ly_l").val();
	var E_js_ly_r = $("#E_js_ly_r").val();
	var E_js_jz_l = $("#E_js_jz_l").val();
	var E_js_jz_r = $("#E_js_jz_r").val();
	var E_js_zk_l = $("#E_js_zk_l").val();
	var E_js_zk_r = $("#E_js_zk_r").val();
	
	var xz_ys_ly_l = $("#xz_ys_ly_l").val();//选择_远视/近视
	var xz_ys_ly_r = $("#xz_ys_ly_r").val();
	var xz_ys_jz_l = $("#xz_ys_jz_l").val();
	var xz_ys_jz_r = $("#xz_ys_jz_r").val();
	var xz_ys_zk_l = $("#xz_ys_zk_l").val();
	var xz_ys_zk_r = $("#xz_ys_zk_r").val();
	var xz_js_ly_l = $("#xz_js_ly_l").val();
	var xz_js_ly_r = $("#xz_js_ly_r").val();
	var xz_js_jz_l = $("#xz_js_jz_l").val();
	var xz_js_jz_r = $("#xz_js_jz_r").val();
	var xz_js_zk_l = $("#xz_js_zk_l").val();
	var xz_js_zk_r = $("#xz_js_zk_r").val();
	
	var sj_l = $("#sj_l").val();//色觉
	var sj_r = $("#sj_r").val();
	var repDoc = $("#rep_doc option:selected").val();// 申请医生
	var repDoc_name = $("#rep_doc option:selected").text();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var doctor_name = $("#doctor option:selected").text();// 检查医生
	var cliDate = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyetsli = {
			jcdId : jcdId,// 检查单ID
			tx_ys_ly_l : tx_ys_ly_l,// 图形_远视
			tx_ys_ly_r : tx_ys_ly_r,
			tx_ys_jz_l : tx_ys_jz_l,
			tx_ys_jz_r : tx_ys_jz_r,
			tx_ys_zk_l : tx_ys_zk_l,
			tx_ys_zk_r : tx_ys_zk_r,
			tx_js_ly_l : tx_js_ly_l,
			tx_js_ly_r : tx_js_ly_r,
			tx_js_jz_l : tx_js_jz_l,
			tx_js_jz_r : tx_js_jz_r,
			tx_js_zk_l : tx_js_zk_l,
			tx_js_zk_r : tx_js_zk_r,
			E_ys_ly_l : E_ys_ly_l,//E形_远视
			E_ys_ly_r : E_ys_ly_r,
			E_ys_jz_l : E_ys_jz_l,
			E_ys_jz_r : E_ys_jz_r,
			E_ys_zk_l : E_ys_zk_l,
			E_ys_zk_r : E_ys_zk_r,
			E_js_ly_l : E_js_ly_l,
			E_js_ly_r : E_js_ly_r,
			E_js_jz_l : E_js_jz_l,
			E_js_jz_r : E_js_jz_r,
			E_js_zk_l : E_js_zk_l,
			E_js_zk_r : E_js_zk_r,
			xz_ys_ly_l : xz_ys_ly_l,// 选择_远视
			xz_ys_ly_r : xz_ys_ly_r,
			xz_ys_jz_l : xz_ys_jz_l,
			xz_ys_jz_r : xz_ys_jz_r,
			xz_ys_zk_l : xz_ys_zk_l,
			xz_ys_zk_r : xz_ys_zk_r,
			xz_js_ly_l : xz_js_ly_l,
			xz_js_ly_r : xz_js_ly_r,
			xz_js_jz_l : xz_js_jz_l,
			xz_js_jz_r : xz_js_jz_r,
			xz_js_zk_l : xz_js_zk_l,
			xz_js_zk_r : xz_js_zk_r,
			sj_l : sj_l,// 色觉
			sj_r : sj_r,
			baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		repDoc : repDoc,// 申请医生
		doctor : doctor,// 检查医生
		repDoc_name : repDoc_name,// 申请医生
		doctor_name : doctor_name,// 检查医生
		cliDate : cliDate,// 报告日期
		tag : Math.random()
	};
	parameter_saveOrUpdateEyetsli = JSON.stringify(
			parameter_saveOrUpdateEyetsli)
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
			+ "/js/manager/baogao/previewEyetsli.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyetsli="
			+ parameter_saveOrUpdateEyetsli + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}
