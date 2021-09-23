//低视力助视器
function initData_eyedslzsq() {
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
	//根dslzsq报告对象查询符合条件的dslzsq报告对象
	var url_selectEyedslzsqByEyedslzsq = "/publish/Eyedslzsq/selectEyedslzsqByEyedslzsq.htm";
	var data_selectEyedslzsqByEyedslzsq = getJSONData(
			url_selectEyedslzsqByEyedslzsq, {
				jcdId : dataObjects_choice[0].jcdid,
				tag : Math.random()
			}, "post");
	if (data_selectEyedslzsqByEyedslzsq.state) {
		var eyedslzsq = data_selectEyedslzsqByEyedslzsq.obj;
		if (eyedslzsq != null) {
			if ($("#R_LX").length == 1)
				$("#R_LX").val(eyedslzsq.r_lx);//助视器类型
			if ($("#L_LX").length == 1)
				$("#L_LX").val(eyedslzsq.l_lx);
			if ($("#R_QJ").length == 1)
				$("#R_QJ").val(eyedslzsq.r_qj);//球镜
			if ($("#L_QJ").length == 1)
				$("#L_QJ").val(eyedslzsq.l_qj);
			if ($("#R_ZJ").length == 1)
				$("#R_ZJ").val(eyedslzsq.r_zj);//柱镜
			if ($("#L_ZJ").length == 1)
				$("#L_ZJ").val(eyedslzsq.l_zj);
			if ($("#R_ZX").length == 1)
				$("#R_ZX").val(eyedslzsq.r_zx);//轴向
			if ($("#L_ZX").length == 1)
				$("#L_ZX").val(eyedslzsq.l_zx);
			if ($("#R_JZSL").length == 1)
				$("#R_JZSL").val(eyedslzsq.r_jzsl);//矫正视力
			if ($("#L_JZSL").length == 1)
				$("#L_JZSL").val(eyedslzsq.l_jzsl);
			if ($("#R_GZJL").length == 1)
				$("#R_GZJL").val(eyedslzsq.r_gzjl);//工作距离
			if ($("#L_GZJL").length == 1)
				$("#L_GZJL").val(eyedslzsq.l_gzjl);
			if ($("#R_DBMGD").length == 1)
				$("#R_DBMGD").val(eyedslzsq.r_dbmgd);//裸眼视力
			if ($("#L_DBMGD").length == 1)
				$("#L_DBMGD").val(eyedslzsq.l_dbmgd);
			if ($("#R_TJ").length == 1)
				$("#R_TJ").val(eyedslzsq.r_tj);//瞳距
			if ($("#L_TJ").length == 1)
				$("#L_TJ").val(eyedslzsq.l_tj);
			if ($("#R_LJXY").length == 1)
				$("#R_LJXY").val(eyedslzsq.r_ljxy);//棱镜效应
			if ($("#L_LJXY").length == 1)
				$("#L_LJXY").val(eyedslzsq.l_ljxy);
			if ($("#R_PTSL").length == 1)
				$("#R_PTSL").val(eyedslzsq.r_ptsl);//普通矫正视力
			if ($("#L_PTSL").length == 1)
				$("#L_PTSL").val(eyedslzsq.l_ptsl);
			if ($("#demo").length == 1)
				$("#demo").val(eyedslzsq.demo);//备注
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyedslzsq.cliDate);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyedslzsq.repDoc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyedslzsq.doctor);// 检查医生
			if (data_outBaogaoHelp.obj.reportDate != eyedslzsq.cliDate) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyedslzsq);
			}
		}
	}
}

// dslzsq检查报告保存
function saveOrUpdateEyedslzsq(state) {
	var parameter_saveOrUpdateEyedslzsq = validateAndGetValue_eyedslzsq();
	var url_saveOrUpdateEyedslzsq = "/publish/Eyedslzsq/saveOrUpdateEyedslzsq.htm";// dslzsq检查报告保存
	var data_saveOrUpdateEyedslzsq = getJSONData(url_saveOrUpdateEyedslzsq,
			parameter_saveOrUpdateEyedslzsq, "post");
	if (data_saveOrUpdateEyedslzsq.state)
		$.oimsSucc("低视力助视器检查报告保存成功", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待检患者界面
				closeReporeDialog();
				}
		});
	else
		$.oimsError("低视力助视器检查报告保存失败", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待检患者界面
				closeReporeDialog();
			}
		});
}

// dslzsq检查报告打印预览
function previewEyedslzsq() {
	var parameter_saveOrUpdateEyedslzsq = validateAndGetValue_eyedslzsq();
	parameter_saveOrUpdateEyedslzsq = JSON.stringify(
			parameter_saveOrUpdateEyedslzsq)
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
			+ "/js/manager/baogao/previewEyedslzsq.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyedslzsq="
			+ parameter_saveOrUpdateEyedslzsq + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}
function validateAndGetValue_eyedslzsq(){
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
		var r_lx = $("#R_LX").val();//助视器类型
		var l_lx = $("#L_LX").val();
		var r_qj = $("#R_QJ").val();//球镜
		var l_qj = $("#L_QJ").val();
		var r_zj = $("#R_ZJ").val();//柱镜
		var l_zj = $("#L_ZJ").val();
		var r_zx = $("#R_ZX").val();//轴向
		var l_zx = $("#L_ZX").val();
		var r_jzsl = $("#R_JZSL").val();//矫正视力
		var l_jzsl = $("#L_JZSL").val();
		var r_gzjl = $("#R_GZJL").val();//工作距离
		var l_gzjl = $("#L_GZJL").val();
		var r_dbmgd = $("#R_DBMGD").val();//裸眼视力
		var l_dbmgd = $("#L_DBMGD").val();
		var r_tj = $("#R_TJ").val();//瞳距
		var l_tj = $("#L_TJ").val();
		var r_ljxy = $("#R_LJXY").val();//棱镜效应
		var l_ljxy = $("#L_LJXY").val();
		var r_ptsl = $("#R_PTSL").val();//普通矫正视力
		var l_ptsl = $("#L_PTSL").val();
		var demo = $("#demo").val();
		var repDoc = $("#rep_doc option:selected").val();// 申请医生
		var repDoc_name = $("#rep_doc option:selected").text();// 申请医生
		var doctor = $("#doctor option:selected").val();// 检查医生
		var doctor_name = $("#doctor option:selected").text();// 检查医生
		var cliDate = $("#cli_date ").html();// 报告日期
		var parameter_saveOrUpdateEyedslzsq = {
			jcdId : jcdId,// 检查单ID
			r_lx : r_lx,
			l_lx : l_lx,
			r_qj : r_qj,
			l_qj : l_qj,
			r_zj : r_zj,
			l_zj : l_zj,
			r_zx : r_zx,
			l_zx : l_zx,
			r_jzsl : r_jzsl,
			l_jzsl : l_jzsl,
			r_gzjl : r_gzjl,
			l_gzjl : l_gzjl,
			r_dbmgd : r_dbmgd,
			l_dbmgd : l_dbmgd,
			r_tj : r_tj,
			l_tj : l_tj,
			r_ljxy : r_ljxy,
			l_ljxy : l_ljxy,
			r_ptsl : r_ptsl,
			l_ptsl : l_ptsl,
			demo : demo,
			baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
			repDoc : repDoc,// 申请医生
			doctor : doctor,// 检查医生
			repDoc_name : repDoc_name,// 申请医生姓名
			doctor_name : doctor_name,// 检查医生姓名
			cliDate : cliDate,// 报告日期
			tag : Math.random()
		}
		return parameter_saveOrUpdateEyedslzsq;
}