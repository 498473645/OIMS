// A超检查报告必要的数据初始化
var data_eyect_check_type = [ {
	value : '',
	text : ''
}, {
	value : '眼轴长度(A超)',
	text : '眼轴长度(A超)'
}, {
	value : '人工晶体度数',
	text : '人工晶体度数'
} ];

function initData_eyect() {
	if ($("#check_type").length == 1) {
		$.each(data_eyect_check_type, function(i, type) {
			$(
					"<option value='" + type.value + "'>" + type.value
							+ "</option>").appendTo("#check_type");
		});
	}

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

	var url_selectEyectByEyect = "/publish/Eyect/selectEyectByEyect.htm";// 根据A超报告对象查询符合条件的A超报告对象
	var data_selectEyectByEyect = getJSONData(url_selectEyectByEyect, {
		jcdId : dataObjects_choice[0].jcdid,
		tag : Math.random()
	}, "post");
	if (data_selectEyectByEyect.state) {
		var eyect = data_selectEyectByEyect.obj;
		if (eyect != null) {
			if ($("#check_type").length == 1)
				$("#check_type").val(eyect.check_type);
			if ($("#k1_r").length == 1)
				$("#k1_r").val(eyect.r_k1);
			if ($("#k2_r").length == 1)
				$("#k2_r").val(eyect.r_k2);
			if ($("#l_r").length == 1)
				$("#l_r").val(eyect.r_l);
			if ($("#iol_r").length == 1)
				$("#iol_r").val(eyect.r_iol);

			if ($("#k1_l").length == 1)
				$("#k1_l").val(eyect.l_k1);
			if ($("#k2_l").length == 1)
				$("#k2_l").val(eyect.l_k2);
			if ($("#l_l").length == 1)
				$("#l_l").val(eyect.l_l);
			if ($("#iol_l").length == 1)
				$("#iol_l").val(eyect.l_iol);

			if ($("#ct_result").length == 1)
				$("#ct_result").val(eyect.ct_result);

			if ($("#demo").length == 1)
				$("#demo").val(eyect.demo);
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyect.cli_date);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyect.rep_doc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyect.doctor);// 检查医生
			if (data_outBaogaoHelp.obj.reportDate != eyect.cli_date) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyect);
			}
		}
	}
}
// A超检查报告保存
function saveOrUpdateEyect() {
	var parameter_saveOrUpdateEyect = validateAndGetValue_eyect();
	var url_saveOrUpdateEyect = "/publish/Eyect/saveOrUpdateEyect.htm";// A超检查报告保存
	var data_saveOrUpdateEyect = getJSONData(url_saveOrUpdateEyect,
			parameter_saveOrUpdateEyect, "post");
	if (data_saveOrUpdateEyect.state)
		$.oimsSucc("报告保存成功", function() {

		});
	else
		$.oimsError("报告保存失败", function() {

		});
}

// A超检查报告打印预览
function previewEyect() {
	var parameter_saveOrUpdateEyect = validateAndGetValue_eyect();

	parameter_saveOrUpdateEyect = JSON.stringify(parameter_saveOrUpdateEyect)
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
			+ "/js/manager/baogao/previewEyect.js?tag='"+Math.random()+"></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyect="
			+ parameter_saveOrUpdateEyect + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}

function validateAndGetValue_eyect() {
	var oValidataData = {
			nullValidataData : {
				'check_type' : '检查子类为必填项'
			}
		};
		var sReturn = fnFormValidata(oValidataData);
		if (sReturn != null) {
			$.oimsAlert(sReturn);// 带*为必填项
			return;
		}
	var jcdId = dataObjects_choice[0].jcdid;// 检查单ID
	var huanzhexinxi_id = dataObjects_choice[0].huanzheId;// 患者ID
	var check_type =  $("#check_type").val();
	var k1_r = $("#k1_r").val();
	var k2_r = $("#k2_r").val();
	var l_r = $("#l_r").val();
	var iol_r = $("#iol_r").val();

	var k1_l = $("#k1_l").val();
	var k2_l = $("#k2_l").val();
	var l_l = $("#l_l").val();
	var iol_l = $("#iol_l").val();

	var demo = $("#demo").val();
	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var rep_doc_name = $("#rep_doc option:selected").text();// 申请医生
	var doctor_name = $("#doctor option:selected").text();// 检查医生
	var cli_date = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyect = {
		jcdId : jcdId,
		huanzhexinxi_id : huanzhexinxi_id,
		check_type:check_type,
		r_k1 : k1_r,
		r_k2 : k2_r,
		r_l : l_r,
		r_iol : iol_r,

		l_k1 : k1_l,
		l_k2 : k2_l,
		l_l : l_l,
		l_iol : iol_l,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		demo : demo,
		rep_doc : rep_doc,
		doctor : doctor,
		rep_doc_name : rep_doc_name,
		doctor_name : doctor_name,
		cli_date : cli_date,
		tag : Math.random()
	};
	return parameter_saveOrUpdateEyect;
}
