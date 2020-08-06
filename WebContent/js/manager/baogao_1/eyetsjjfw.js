// 九方位斜视角报告必要的数据初始化
//九方位参数设置
//单位
var data_eyetsjjfw_danwei = [ {
	value : '',
	text : ''
}, {
	value : '棱镜',
	text : '棱镜'
}, {
	value : '弧度',
	text : '弧度'
} ];
function initData_eyetsjjfw() {
	//单位
	if ($("#danwei").length == 1) {
		for ( var i = 0; i < data_eyetsjjfw_danwei.length; i++)
			$(
					"<option value=\""
							+ data_eyetsjjfw_danwei[i].value
							+ "\">" + data_eyetsjjfw_danwei[i].text
							+ "</option>").appendTo("#danwei");
	}
	// 检查子类下拉框赋值
	if ($("#check_doc").length == 1) {
		for ( var i = 0; i < data_eyetsjjfw_check_doc.length; i++)
			$(
					"<option value=\""
							+ data_eyetsjjfw_check_doc[i].value_check_doc
							+ "\">" + data_eyetsjjfw_check_doc[i].key_check_doc
							+ "</option>").appendTo("#check_doc");
	}
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
	var url_selectEyetsjjfwByEyetsjjfw = "/publish/Eyetsjjfw/selectEyetsjjfwByEyetsjjfw.htm";// 根据暗适应报告对象查询符合条件的暗适应报告对象
	var data_selectEyetsjjfwByEyetsjjfw = getJSONData(
			url_selectEyetsjjfwByEyetsjjfw, {
				jcdId : dataObjects_choice[0].jcdid,
				tag : Math.random()
			}, "post");
	if (data_selectEyetsjjfwByEyetsjjfw.state) {
		var eyetsjjfw = data_selectEyetsjjfwByEyetsjjfw.obj;
		if (eyetsjjfw != null) {
			if ($("#danwei").length == 1)
				$("#danwei").val(eyetsjjfw.danwei);
			if ($("#seq_1").length == 1)
				$("#seq_1").val(eyetsjjfw.seq_1);
			if ($("#seq_2").length == 1)
				$("#seq_2").val(eyetsjjfw.seq_2);
			if ($("#seq_3").length == 1)
				$("#seq_3").val(eyetsjjfw.seq_3);
			if ($("#seq_4").length == 1)
				$("#seq_4").val(eyetsjjfw.seq_4);
			if ($("#seq_5").length == 1)
				$("#seq_5").val(eyetsjjfw.seq_5);
			if ($("#seq_6").length == 1)
				$("#seq_6").val(eyetsjjfw.seq_6);
			if ($("#seq_7").length == 1)
				$("#seq_7").val(eyetsjjfw.seq_7);
			if ($("#seq_8").length == 1)
				$("#seq_8").val(eyetsjjfw.seq_8);
			if ($("#seq_9").length == 1)
				$("#seq_9").val(eyetsjjfw.seq_9);
			
			if ($("#memo").length == 1)
				$("#memo").val(eyetsjjfw.memo);
			
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyetsjjfw.cli_date);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyetsjjfw.rep_doc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyetsjjfw.doctor);// 检查医生
			if (data_outBaogaoHelp.obj.reportDate != eyetsjjfw.cli_date) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyetsjjfw);
			}
		}
	}
}

// 九方位斜视角报告保存
function saveOrUpdateEyetsjjfw(state) {
	var oValidataData = {
		nullValidataData : {
			'seq_1' : '九方位数据为空',
			'seq_2' : '九方位数据为空',
			'seq_3' : '九方位数据为空',
			'seq_4' : '九方位数据为空',
			'seq_5' : '九方位数据为空',
			'seq_6' : '九方位数据为空',
			'seq_7' : '九方位数据为空',
			'seq_8' : '九方位数据为空',
			'seq_9' : '九方位数据为空',
			'memo' : '报告备注为空',
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
	var danwei = $("#danwei").val();
	var seq_1 = $("#seq_1").val();
	var seq_2 = $("#seq_2").val();
	var seq_3 = $("#seq_3").val();
	var seq_4 = $("#seq_4").val();
	var seq_5 = $("#seq_5").val();
	var seq_6 = $("#seq_6").val();
	var seq_7 = $("#seq_7").val();
	var seq_8 = $("#seq_8").val();
	var seq_9 = $("#seq_9").val();
	
	var memo=$("#memo").val();
	
	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var cli_date = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyetsjjfw = {
		jcdId : jcdId,// 检查单ID
	    danwei : danwei,
		seq_1:seq_1,
		seq_2:seq_2,
		seq_3:seq_3,
		seq_4:seq_4,
		seq_5:seq_5,
		seq_6:seq_6,
		seq_7:seq_7,
		seq_8:seq_8,
		seq_9:seq_9,
		
		memo:memo,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		
		rep_doc : rep_doc,// 申请医生
		doctor : doctor,// 检查医生
		cli_date : cli_date,// 报告日期
		tag : Math.random()
	};
	var url_saveOrUpdateEyetsjjfw = "/publish/Eyetsjjfw/saveOrUpdateEyetsjjfw.htm";// 九方位斜视角报告保存
	var data_saveOrUpdateEyetsjjfw = getJSONData(url_saveOrUpdateEyetsjjfw,
			parameter_saveOrUpdateEyetsjjfw, "post");
	if (data_saveOrUpdateEyetsjjfw.state)
		$.oimsSucc("九方位斜视角报告保存成功", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待检患者界面
				closeReporeDialog();
			}
		});
	else
		$.oimsError("九方位斜视角报告保存失败", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待检患者界面
				closeReporeDialog();
			}
		});
}

// 九方位斜视角报告打印预览
function previewEyetsjjfw() {
	var oValidataData = {
			nullValidataData : {
				'seq_1' : '九方位数据为空',
				'seq_2' : '九方位数据为空',
				'seq_3' : '九方位数据为空',
				'seq_4' : '九方位数据为空',
				'seq_5' : '九方位数据为空',
				'seq_6' : '九方位数据为空',
				'seq_7' : '九方位数据为空',
				'seq_8' : '九方位数据为空',
				'seq_9' : '九方位数据为空',
				'memo' : '报告备注为空',
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
		var danwei = $("#danwei").val();
		var seq_1 = $("#seq_1").val();
		var seq_2 = $("#seq_2").val();
		var seq_3 = $("#seq_3").val();
		var seq_4 = $("#seq_4").val();
		var seq_5 = $("#seq_5").val();
		var seq_6 = $("#seq_6").val();
		var seq_7 = $("#seq_7").val();
		var seq_8 = $("#seq_8").val();
		var seq_9 = $("#seq_9").val();
		
		var memo = $("#memo").val();
		
		var rep_doc = $("#rep_doc option:selected").val();// 申请医生
		var doctor = $("#doctor option:selected").val();// 检查医生
		var rep_doc_name = $("#rep_doc option:selected").text();// 申请医生
		var doctor_name = $("#doctor option:selected").text();// 检查医生
		var cli_date = $("#cli_date ").html();// 报告日期
		var parameter_saveOrUpdateEyetsjjfw = {
			jcdId : jcdId,// 检查单ID
			danwei : danwei,
			seq_1:seq_1,
			seq_2:seq_2,
			seq_3:seq_3,
			seq_4:seq_4,
			seq_5:seq_5,
			seq_6:seq_6,
			seq_7:seq_7,
			seq_8:seq_8,
			seq_9:seq_9,
			
			memo:memo,
			baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
			rep_doc : rep_doc,// 申请医生
			doctor : doctor,// 检查医生
			rep_doc_name : rep_doc_name,// 申请医生姓名
			doctor_name : doctor_name,// 检查医生姓名
			cli_date : cli_date,// 报告日期
			tag : Math.random()
		};
		parameter_saveOrUpdateEyetsjjfw = JSON.stringify(
				parameter_saveOrUpdateEyetsjjfw)
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
			+ "/js/manager/baogao/previewEyetsjjfw.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyetsjjfw="
			+ parameter_saveOrUpdateEyetsjjfw + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}
