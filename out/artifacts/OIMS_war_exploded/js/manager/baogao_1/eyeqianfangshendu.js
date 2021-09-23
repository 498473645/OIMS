//前方深度
function initData_eyeqianfangshendu() {
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
	// 初始化患者信息
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
	// 初始化报告信息
	var url_selectEyeqianfangshenduByEyeqianfangshendu = "/publish/Eyeqianfangshendu/selectEyeqianfangshenduByEyeqianfangshendu.htm";
	var data_selectEyeqianfangshendu = getJSONData(url_selectEyeqianfangshenduByEyeqianfangshendu, {
		jcdId : dataObjects_choice[0].jcdid
	}, "post");
	// console.dir(data_selectEyeyxjc);
	if (data_selectEyeqianfangshendu.state) {
		var eyeqianfangshendu = data_selectEyeqianfangshendu.obj;
		if (eyeqianfangshendu != null) {
		
				if ($("#memo").length == 1)
				$("#memo").val(eyeqianfangshendu.memo);
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyeqianfangshendu.cli_date);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyeqianfangshendu.rep_doc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyeqianfangshendu.doctor);// 检查医生
			if (data_outBaogaoHelp.obj.reportDate != eyeqianfangshendu.cli_date) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyeqianfangshendu);
				
			}
		}
	}

}
// 保存或修改前方深度
function saveOrUpdateEyeqianfangshendu() {
	var oValidataData = {
			nullValidataData : {
				'memo' : '检查结果为空'
			}
		};
		var sReturn = fnFormValidata(oValidataData);
		if (sReturn != null) {
			$.oimsAlert(sReturn);
			return;
		}
//	var path_pictures = "";
//	var operateDiv = $(".operateDiv");
//	var array_div = $(operateDiv)[0].children;
//	for ( var i = 0; i < array_div.length; i++) {
//		if (array_div[i].children.length > 0
//				&& array_div[i].firstChild.tagName.toLowerCase() == "img")
//			path_pictures += ($(array_div[i].children[0]).attr("src")) + ",";
//	}
	var jcdId = dataObjects_choice[0].jcdid;// 检查单ID
	var huanzhexinxi_id = dataObjects_choice[0].huanzheId;// 患者ID

	var memo = $("#memo").val();

	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var cli_date = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyeqianfangshendu = {
//		path_pictures : path_pictures,
		jcdId : jcdId,
		huanzhexinxi_id : huanzhexinxi_id,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		memo : memo,
		rep_doc : rep_doc,
		doctor : doctor,
		cli_date : cli_date,
		tag : Math.random()
	};
	var url_saveOrUpdateEyeqianfangshendu = "/publish/Eyeqianfangshendu/saveOrUpdateEyeqianfangshendu.htm";
	var data_saveOrUpdateEyeqianfangshendu = getJSONData(url_saveOrUpdateEyeqianfangshendu,
			parameter_saveOrUpdateEyeqianfangshendu, "post");
	if (data_saveOrUpdateEyeqianfangshendu.state)
		$.oimsSucc("检查报告保存成功", function() {

		});
	else
		$.oimsError("检查报告保存失败", function() {

		});
}

// 前方深度检查打印预览
function previewEyeqianfangshendu() {
	var oValidataData = {
			nullValidataData : {
				'memo' : '检查结果为空'
			}
		};
		var sReturn = fnFormValidata(oValidataData);
		if (sReturn != null) {
			$.oimsAlert(sReturn);
			return;
		}
//	var path_pictures = "";
//	var operateDiv = $(".operateDiv");
//	var array_div = $(operateDiv)[0].children;
//	for ( var i = 0; i < array_div.length; i++) {
//		if (array_div[i].children.length > 0
//				&& array_div[i].firstChild.tagName.toLowerCase() == "img")
//			path_pictures += ($(array_div[i].children[0]).attr("src")) + ",";
//	}
	var jcdId = dataObjects_choice[0].jcdid;// 检查单ID
	var huanzhexinxi_id = dataObjects_choice[0].huanzheId;// 患者ID

	var memo = $("#memo").val();

	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var rep_doc_name = $("#rep_doc option:selected").text();// 申请医生
	var doctor_name = $("#doctor option:selected").text();// 检查医生
	var cli_date = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyeqianfangshendu = {
//		path_pictures : path_pictures,
		jcdId : jcdId,
		huanzhexinxi_id : huanzhexinxi_id,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		memo : memo,
		rep_doc : rep_doc,
		doctor : doctor,
		rep_doc_name : rep_doc_name,// 申请医生姓名
		doctor_name : doctor_name,// 检查医生姓名
		cli_date : cli_date,
		tag : Math.random()
	};
	parameter_saveOrUpdateEyeqianfangshendu = JSON.stringify(
			parameter_saveOrUpdateEyeqianfangshendu).replace(new RegExp("\"", "gm"), "'");
	var html_div_reportresult = "<div id='div_reportresult'>"
			+ $("#div_reportresult").html() + "</div>"; // 报告内容
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
			+ "/js/manager/baogao/previewEyeqianfangshendu.js'></script>";
	html_baogao += "<script type='text/javascript'>"
			+ "var parameter_saveOrUpdateEyeqianfangshendu = "
			+ parameter_saveOrUpdateEyeqianfangshendu + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}
