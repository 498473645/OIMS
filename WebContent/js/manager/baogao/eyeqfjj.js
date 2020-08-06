//前房角镜
var data_eyeqfjj_common = [ {
	value_common : '',
	key_common : ''
}, {
	value_common : 'W',
	key_common : 'W'
}, {
	value_common : 'N1',
	key_common : 'N1'
}, {
	value_common : 'N2',
	key_common : 'N2'
}, {
	value_common : 'N3',
	key_common : 'N3'
}, {
	value_common : 'N4',
	key_common : 'N4'
}, {
	value_common : 'W-N1',
	key_common : 'W-N1'
}, {
	value_common : 'N1-N2',
	key_common : 'N1-N2'
}, {
	value_common : 'N2-N3',
	key_common : 'N2-N3'
}, {
	value_common : 'N3-N4',
	key_common : 'N3-N4'
} ];
//前房角镜报告初始化
function initData_eyeqfjj() {

	// 右眼
	if ($("#seq_r_1_s").length == 1) {
		for ( var i = 0; i < data_eyeqfjj_common.length; i++)
			$(
					"<option value=\"" + data_eyeqfjj_common[i].value_common
							+ "\">" + data_eyeqfjj_common[i].key_common
							+ "</option>").appendTo("#seq_r_1_s");
	}
	if ($("#seq_r_1_d").length == 1) {
		for ( var i = 0; i < data_eyeqfjj_common.length; i++)
			$(
					"<option value=\"" + data_eyeqfjj_common[i].value_common
							+ "\">" + data_eyeqfjj_common[i].key_common
							+ "</option>").appendTo("#seq_r_1_d");
	}

	if ($("#seq_r_2_s").length == 1) {
		for ( var i = 0; i < data_eyeqfjj_common.length; i++)
			$(
					"<option value=\"" + data_eyeqfjj_common[i].value_common
							+ "\">" + data_eyeqfjj_common[i].key_common
							+ "</option>").appendTo("#seq_r_2_s");
	}
	if ($("#seq_r_2_d").length == 1) {
		for ( var i = 0; i < data_eyeqfjj_common.length; i++)
			$(
					"<option value=\"" + data_eyeqfjj_common[i].value_common
							+ "\">" + data_eyeqfjj_common[i].key_common
							+ "</option>").appendTo("#seq_r_2_d");
	}

	if ($("#seq_r_3_s").length == 1) {
		for ( var i = 0; i < data_eyeqfjj_common.length; i++)
			$(
					"<option value=\"" + data_eyeqfjj_common[i].value_common
							+ "\">" + data_eyeqfjj_common[i].key_common
							+ "</option>").appendTo("#seq_r_3_s");
	}
	if ($("#seq_r_3_d").length == 1) {
		for ( var i = 0; i < data_eyeqfjj_common.length; i++)
			$(
					"<option value=\"" + data_eyeqfjj_common[i].value_common
							+ "\">" + data_eyeqfjj_common[i].key_common
							+ "</option>").appendTo("#seq_r_3_d");
	}

	if ($("#seq_r_4_s").length == 1) {
		for ( var i = 0; i < data_eyeqfjj_common.length; i++)
			$(
					"<option value=\"" + data_eyeqfjj_common[i].value_common
							+ "\">" + data_eyeqfjj_common[i].key_common
							+ "</option>").appendTo("#seq_r_4_s");
	}
	if ($("#seq_r_4_d").length == 1) {
		for ( var i = 0; i < data_eyeqfjj_common.length; i++)
			$(
					"<option value=\"" + data_eyeqfjj_common[i].value_common
							+ "\">" + data_eyeqfjj_common[i].key_common
							+ "</option>").appendTo("#seq_r_4_d");
	}

	// 右眼

	// 左眼
	if ($("#seq_l_1_s").length == 1) {
		for ( var i = 0; i < data_eyeqfjj_common.length; i++)
			$(
					"<option value=\"" + data_eyeqfjj_common[i].value_common
							+ "\">" + data_eyeqfjj_common[i].key_common
							+ "</option>").appendTo("#seq_l_1_s");
	}
	if ($("#seq_l_1_d").length == 1) {
		for ( var i = 0; i < data_eyeqfjj_common.length; i++)
			$(
					"<option value=\"" + data_eyeqfjj_common[i].value_common
							+ "\">" + data_eyeqfjj_common[i].key_common
							+ "</option>").appendTo("#seq_l_1_d");
	}

	if ($("#seq_l_2_s").length == 1) {
		for ( var i = 0; i < data_eyeqfjj_common.length; i++)
			$(
					"<option value=\"" + data_eyeqfjj_common[i].value_common
							+ "\">" + data_eyeqfjj_common[i].key_common
							+ "</option>").appendTo("#seq_l_2_s");
	}
	if ($("#seq_l_2_d").length == 1) {
		for ( var i = 0; i < data_eyeqfjj_common.length; i++)
			$(
					"<option value=\"" + data_eyeqfjj_common[i].value_common
							+ "\">" + data_eyeqfjj_common[i].key_common
							+ "</option>").appendTo("#seq_l_2_d");
	}

	if ($("#seq_l_3_s").length == 1) {
		for ( var i = 0; i < data_eyeqfjj_common.length; i++)
			$(
					"<option value=\"" + data_eyeqfjj_common[i].value_common
							+ "\">" + data_eyeqfjj_common[i].key_common
							+ "</option>").appendTo("#seq_l_3_s");
	}
	if ($("#seq_l_3_d").length == 1) {
		for ( var i = 0; i < data_eyeqfjj_common.length; i++)
			$(
					"<option value=\"" + data_eyeqfjj_common[i].value_common
							+ "\">" + data_eyeqfjj_common[i].key_common
							+ "</option>").appendTo("#seq_l_3_d");
	}

	if ($("#seq_l_4_s").length == 1) {
		for ( var i = 0; i < data_eyeqfjj_common.length; i++)
			$(
					"<option value=\"" + data_eyeqfjj_common[i].value_common
							+ "\">" + data_eyeqfjj_common[i].key_common
							+ "</option>").appendTo("#seq_l_4_s");
	}
	if ($("#seq_l_4_d").length == 1) {
		for ( var i = 0; i < data_eyeqfjj_common.length; i++)
			$(
					"<option value=\"" + data_eyeqfjj_common[i].value_common
							+ "\">" + data_eyeqfjj_common[i].key_common
							+ "</option>").appendTo("#seq_l_4_d");
	}

	// 左眼

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

	var url_selectEyeqfjjByEyeqfjj = "/publish/Eyeqfjj/selectEyeqfjjByEyeqfjj.htm";
	var data_selectEyeqfjjByEyeqfjj = getJSONData(url_selectEyeqfjjByEyeqfjj, {
		jcdId : dataObjects_choice[0].jcdid,
		tag : Math.random()
	}, "post");
	if (data_selectEyeqfjjByEyeqfjj.state) {
		var eyeqfjj = data_selectEyeqfjjByEyeqfjj.obj;
		if (eyeqfjj != null) {

			if ($("#seq_r_1_s").length == 1)
				$("#seq_r_1_s").val(eyeqfjj.seq_r_1_s);
			if ($("#seq_r_1_d").length == 1)
				$("#seq_r_1_d").val(eyeqfjj.seq_r_1_d);
			if ($("#seq_r_2_s").length == 1)
				$("#seq_r_2_s").val(eyeqfjj.seq_r_2_s);
			if ($("#seq_r_2_d").length == 1)
				$("#seq_r_2_d").val(eyeqfjj.seq_r_2_d);
			if ($("#seq_r_3_s").length == 1)
				$("#seq_r_3_s").val(eyeqfjj.seq_r_3_s);
			if ($("#seq_r_3_d").length == 1)
				$("#seq_r_3_d").val(eyeqfjj.seq_r_3_d);
			if ($("#seq_r_4_s").length == 1)
				$("#seq_r_4_s").val(eyeqfjj.seq_r_4_s);
			if ($("#seq_r_4_d").length == 1)
				$("#seq_r_4_d").val(eyeqfjj.seq_r_4_d);

			if ($("#seq_l_1_s").length == 1)
				$("#seq_l_1_s").val(eyeqfjj.seq_l_1_s);
			if ($("#seq_l_1_d").length == 1)
				$("#seq_l_1_d").val(eyeqfjj.seq_l_1_d);
			if ($("#seq_l_2_s").length == 1)
				$("#seq_l_2_s").val(eyeqfjj.seq_l_2_s);
			if ($("#seq_l_2_d").length == 1)
				$("#seq_l_2_d").val(eyeqfjj.seq_l_2_d);
			if ($("#seq_l_3_s").length == 1)
				$("#seq_l_3_s").val(eyeqfjj.seq_l_3_s);
			if ($("#seq_l_3_d").length == 1)
				$("#seq_l_3_d").val(eyeqfjj.seq_l_3_d);
			if ($("#seq_l_4_s").length == 1)
				$("#seq_l_4_s").val(eyeqfjj.seq_l_4_s);
			if ($("#seq_l_4_d").length == 1)
				$("#seq_l_4_d").val(eyeqfjj.seq_l_4_d);

			if ($("#memo").length == 1)
				$("#memo").val(eyeqfjj.memo);

			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyeqfjj.cli_date);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyeqfjj.rep_doc);
			if ($("#doctor").length == 1)
				$("#doctor").val(eyeqfjj.doctor);

			if (data_outBaogaoHelp.obj.reportDate != eyeqfjj.cli_date) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyeqfjj);
			}
		}
	}

}

//前房角镜报告保存
function saveOrUpdateEyeqfjj(state) {
	var oValidataData = {
		nullValidataData : {
			
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

	var seq_r_1_s = $("#seq_r_1_s").val();// 右眼S1
	var seq_r_1_d = $("#seq_r_1_d").val();// 右眼D1
	var seq_r_2_s = $("#seq_r_2_s").val();// 右眼S2
	var seq_r_2_d = $("#seq_r_2_d").val();// 右眼D2
	var seq_r_3_s = $("#seq_r_3_s").val();// 右眼S3
	var seq_r_3_d = $("#seq_r_3_d").val();// 右眼D3
	var seq_r_4_s = $("#seq_r_4_s").val();// 右眼S4
	var seq_r_4_d = $("#seq_r_4_d").val();// 右眼D4

	var seq_l_1_s = $("#seq_l_1_s").val();// 左眼S1
	var seq_l_1_d = $("#seq_l_1_d").val();// 左眼D1
	var seq_l_2_s = $("#seq_l_2_s").val();// 左眼S2
	var seq_l_2_d = $("#seq_l_2_d").val();// 左眼D2
	var seq_l_3_s = $("#seq_l_3_s").val();// 左眼S3
	var seq_l_3_d = $("#seq_l_3_d").val();// 左眼D3
	var seq_l_4_s = $("#seq_l_4_s").val();// 左眼S4
	var seq_l_4_d = $("#seq_l_4_d").val();// 左眼D4

	var memo = $("#memo").val();// 备注

	var cli_date = $("#cli_date ").html();// 报告日期
	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生

	var parameter_saveOrUpdateEyeqfjj = {
		jcdId : jcdId,// 检查单ID

		seq_r_1_s : seq_r_1_s,// 右眼S1
		seq_r_1_d : seq_r_1_d,// 右眼D1
		seq_r_2_s : seq_r_2_s,// 右眼S2
		seq_r_2_d : seq_r_2_d,// 右眼D2
		seq_r_3_s : seq_r_3_s,// 右眼S3
		seq_r_3_d : seq_r_3_d,// 右眼D3
		seq_r_4_s : seq_r_4_s,// 右眼S4
		seq_r_4_d : seq_r_4_d,// 右眼D4

		seq_l_1_s : seq_l_1_s,// 左眼S1
		seq_l_1_d : seq_l_1_d,// 左眼D1
		seq_l_2_s : seq_l_2_s,// 左眼S2
		seq_l_2_d : seq_l_2_d,// 左眼D2
		seq_l_3_s : seq_l_3_s,// 左眼S3
		seq_l_3_d : seq_l_3_d,// 左眼D3
		seq_l_4_s : seq_l_4_s,// 左眼S4
		seq_l_4_d : seq_l_4_d,// 左眼D4

		memo : memo,// 备注
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,

		rep_doc : rep_doc,// 申请医生
		doctor : doctor,// 检查医生
		cli_date : cli_date,// 报告日期
		tag : Math.random()
	};
	var url_saveOrUpdateEyeqfjj = "/publish/Eyeqfjj/saveOrUpdateEyeqfjj.htm";// 角膜内皮计数报告保存
	var data_saveOrUpdateEyeqfjj = getJSONData(url_saveOrUpdateEyeqfjj,
			parameter_saveOrUpdateEyeqfjj, "post");
	if (data_saveOrUpdateEyeqfjj.state)
		$.oimsSucc("前房角镜报告保存成功", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待见患者界面
				closeReporeDialog();
			}
		});
	else
		$.oimsError("前房角镜报告保存失败", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待见患者界面
				closeReporeDialog();
			}
		});
}

// 前房角镜报告打印
function previewEyeqfjj() {
	var oValidataData = {
		nullValidataData : {
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

	var seq_r_1_s = $("#seq_r_1_s").val();// 右眼S1
	var seq_r_1_d = $("#seq_r_1_d").val();// 右眼D1
	var seq_r_2_s = $("#seq_r_2_s").val();// 右眼S2
	var seq_r_2_d = $("#seq_r_2_d").val();// 右眼D2
	var seq_r_3_s = $("#seq_r_3_s").val();// 右眼S3
	var seq_r_3_d = $("#seq_r_3_d").val();// 右眼D3
	var seq_r_4_s = $("#seq_r_4_s").val();// 右眼S4
	var seq_r_4_d = $("#seq_r_4_d").val();// 右眼D4

	var seq_l_1_s = $("#seq_l_1_s").val();// 左眼S1
	var seq_l_1_d = $("#seq_l_1_d").val();// 左眼D1
	var seq_l_2_s = $("#seq_l_2_s").val();// 左眼S2
	var seq_l_2_d = $("#seq_l_2_d").val();// 左眼D2
	var seq_l_3_s = $("#seq_l_3_s").val();// 左眼S3
	var seq_l_3_d = $("#seq_l_3_d").val();// 左眼D3
	var seq_l_4_s = $("#seq_l_4_s").val();// 左眼S4
	var seq_l_4_d = $("#seq_l_4_d").val();// 左眼D4

	var memo = $("#memo").val();// 备注

	var cli_date = $("#cli_date ").html();// 报告日期
	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var rep_doc_name = $("#rep_doc option:selected").text();// 申请医生
	var doctor_name = $("#doctor option:selected").text();// 检查医生

	var parameter_saveOrUpdateEyeqfjj = {
		jcdId : jcdId,// 检查单ID

		seq_r_1_s : seq_r_1_s,// 右眼S1
		seq_r_1_d : seq_r_1_d,// 右眼D1
		seq_r_2_s : seq_r_2_s,// 右眼S2
		seq_r_2_d : seq_r_2_d,// 右眼D2
		seq_r_3_s : seq_r_3_s,// 右眼S3
		seq_r_3_d : seq_r_3_d,// 右眼D3
		seq_r_4_s : seq_r_4_s,// 右眼S4
		seq_r_4_d : seq_r_4_d,// 右眼D4

		seq_l_1_s : seq_l_1_s,// 左眼S1
		seq_l_1_d : seq_l_1_d,// 左眼D1
		seq_l_2_s : seq_l_2_s,// 左眼S2
		seq_l_2_d : seq_l_2_d,// 左眼D2
		seq_l_3_s : seq_l_3_s,// 左眼S3
		seq_l_3_d : seq_l_3_d,// 左眼D3
		seq_l_4_s : seq_l_4_s,// 左眼S4
		seq_l_4_d : seq_l_4_d,// 左眼D4

		memo : memo,// 备注
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,

		rep_doc : rep_doc,// 申请医生
		doctor : doctor,// 检查医生
		rep_doc_name : rep_doc_name,// 申请医生姓名
		doctor_name : doctor_name,// 检查医生姓名
		cli_date : cli_date,// 报告日期
		tag : Math.random()
	};
	parameter_saveOrUpdateEyeqfjj = JSON.stringify(
			parameter_saveOrUpdateEyeqfjj).replace(new RegExp("\"", "gm"), "'");
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
			+ "/js/manager/baogao/previewEyeqfjj.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyeqfjj="
			+ parameter_saveOrUpdateEyeqfjj + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}
