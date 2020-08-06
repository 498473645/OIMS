//裂隙灯照相检查报告必要的数据初始化
function initData_eyelxdzx() {
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

	/** ********************************裂隙灯照相信息********************************** */
	var url_selectEyelxdzxByEyelxdzx = "/publish/Eyelxdzx/selectEyelxdzxByEyelxdzx.htm";// 根据眼底照相报告对象查询符合条件的眼底照相报告对象
	var data_selectEyelxdzxByEyelxdzx = getJSONData(
			url_selectEyelxdzxByEyelxdzx, {
				jcdId : dataObjects_choice[0].jcdid,
				tag : Math.random()
			}, "post");
	if (data_selectEyelxdzxByEyelxdzx.state) {
		showReportPictures();// 显示报告图片
		var eyelxdzx = data_selectEyelxdzxByEyelxdzx.obj;
		if (eyelxdzx != null) {
			if ($("#demo").length == 1)
				$("#demo").val(eyelxdzx.demo);
			if ($("#zxfs").length == 1)
				$("#zxfs").val(eyelxdzx.zxfs);
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyelxdzx.cli_date);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyelxdzx.rep_doc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyelxdzx.doctor);// 检查医生
			if (data_outBaogaoHelp.obj.reportDate != eyelxdzx.cli_date) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyelxdzx);
			} else {
				initPictureOperate();
			}
		} else {
			initPictureOperate();
		}
	}
	/** ********************************裂隙灯照相信息********************************** */

}
// 眼底照相检查报告保存
function saveOrUpdateEyelxdzx() {
	var path_pictures = "";
	var operateDiv = $(".operateDiv");
	var array_div = $(operateDiv)[0].children;
	for ( var i = 0; i < array_div.length; i++) {
		if (array_div[i].children.length > 0
				&& array_div[i].firstChild.tagName.toLowerCase() == "img")
			path_pictures += ($(array_div[i].children[0]).attr("src")) + ",";
	}
	var jcdId = dataObjects_choice[0].jcdid;// 检查单ID
	var huanzhexinxi_id = dataObjects_choice[0].huanzheId;// 患者ID

	var demo = $("#demo").val();
	var zxfs = $("#zxfs").val();

	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var cli_date = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyelxdzx = {
		path_pictures : path_pictures,
		jcdId : jcdId,
		huanzhexinxi_id : huanzhexinxi_id,
		demo : demo,
		zxfs : zxfs,
		rep_doc : rep_doc,
		doctor : doctor,
		cli_date : cli_date,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		tag : Math.random()
	};
	var url_saveOrUpdateEyelxdzx = "/publish/Eyelxdzx/saveOrUpdateEyelxdzx.htm";// 眼底照相检查报告保存
	var data_saveOrUpdateEyelxdzx = getJSONData(url_saveOrUpdateEyelxdzx,
			parameter_saveOrUpdateEyelxdzx, "post");
	if (data_saveOrUpdateEyelxdzx.state)
		$.oimsSucc("眼前节照相检查报告保存成功", function() {

		});
	else
		$.oimsError("眼前节照相检查报告保存失败", function() {

		});
}

// 眼底照相检查报告打印预览
function previewEyelxdzx() {
	var path_pictures = "";
	var operateDiv = $(".operateDiv");
	var array_div = $(operateDiv)[0].children;
	for ( var i = 0; i < array_div.length; i++) {
		if (array_div[i].children.length > 0
				&& array_div[i].firstChild.tagName.toLowerCase() == "img")
			path_pictures += ($(array_div[i].children[0]).attr("src")) + ",";
	}
	var jcdId = dataObjects_choice[0].jcdid;// 检查单ID
	var huanzhexinxi_id = dataObjects_choice[0].huanzheId;// 患者ID

	var demo = $("#demo").val();
	var zxfs = $("#zxfs").val();

	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var rep_doc_name = $("#rep_doc option:selected").text();// 申请医生
	var doctor_name = $("#doctor option:selected").text();// 检查医生
	var cli_date = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyelxdzx = {
		path_pictures : path_pictures,
		jcdId : jcdId,
		huanzhexinxi_id : huanzhexinxi_id,
		demo : demo,
		zxfs : zxfs,
		rep_doc : rep_doc,
		doctor : doctor,
		rep_doc_name : rep_doc_name,// 申请医生姓名
		doctor_name : doctor_name,// 检查医生姓名
		cli_date : cli_date,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		tag : Math.random()
	};
	parameter_saveOrUpdateEyelxdzx = JSON.stringify(
			parameter_saveOrUpdateEyelxdzx)
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
			+ "/js/manager/baogao/previewEyelxdzx.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyelxdzx="
			+ parameter_saveOrUpdateEyelxdzx + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}
