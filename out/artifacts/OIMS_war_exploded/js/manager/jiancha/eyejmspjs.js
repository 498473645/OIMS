//角膜内皮计数
function initData_eyejmspjs_jiancha() {
	// 申请医生下拉框赋值
	if ($("#rep_doc").length == 1) {
		var data_getKaiDanDoctorByQuanxian = getJSONData(
				"/publish/yuangong/getKaiDanDoctorByQuanxian.htm", {
					tag : Math.random()
				}, "post");
		if (data_getKaiDanDoctorByQuanxian.state) {
			var yuangonglist = data_getKaiDanDoctorByQuanxian.obj;
			$.each(yuangonglist, function(i, yuangong) {
				$(
						"<option value=\"" + yuangong.gonghao + "\">"
								+ yuangong.xingming + "</option>").appendTo(
						"#rep_doc");
			});
		}
	}
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

	var url_selectEyejmspjsByEyejmspjs = "/publish/Eyejmspjs/selectEyejmspjsByEyejmspjs.htm";
	var data_selectEyejmspjsByEyejmspjs = getJSONData(
			url_selectEyejmspjsByEyejmspjs, {
				jcdId : dataObjects_choice[0].jcdid,
				tag : Math.random()
			}, "post");
	if (data_selectEyejmspjsByEyejmspjs.state) {
		var eyejmspjs = data_selectEyejmspjsByEyejmspjs.obj;
		if (eyejmspjs != null) {
			if ($("#r_cd").length == 1)
				$("#r_cd").val(eyejmspjs.r_cd);
			if ($("#r_num").length == 1)
				$("#r_num").val(eyejmspjs.r_num);
			if ($("#r_ave").length == 1)
				$("#r_ave").val(eyejmspjs.r_ave);
			if ($("#r_min").length == 1)
				$("#r_min").val(eyejmspjs.r_min);
			if ($("#r_sd").length == 1)
				$("#r_sd").val(eyejmspjs.r_sd);
			if ($("#r_cv").length == 1)
				$("#r_cv").val(eyejmspjs.r_cv);
			if ($("#r_max").length == 1)
				$("#r_max").val(eyejmspjs.r_max);
			if ($("#r_aa").length == 1)
				$("#r_aa").val(eyejmspjs.r_aa);

			if ($("#l_cd").length == 1)
				$("#l_cd").val(eyejmspjs.l_cd);
			if ($("#l_num").length == 1)
				$("#l_num").val(eyejmspjs.l_num);
			if ($("#l_ave").length == 1)
				$("#l_ave").val(eyejmspjs.l_ave);
			if ($("#l_min").length == 1)
				$("#l_min").val(eyejmspjs.l_min);
			if ($("#l_sd").length == 1)
				$("#l_sd").val(eyejmspjs.l_sd);
			if ($("#l_cv").length == 1)
				$("#l_cv").val(eyejmspjs.l_cv);
			if ($("#l_max").length == 1)
				$("#l_max").val(eyejmspjs.l_max);
			if ($("#l_aa").length == 1)
				$("#l_aa").val(eyejmspjs.l_aa);

			if ($("#memo").length == 1)
				$("#memo").val(eyejmspjs.memo);

			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyejmspjs.cli_date);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyejmspjs.rep_doc);
			if ($("#doctor").length == 1)
				$("#doctor").val(eyejmspjs.doctor);

			if (data_outBaogaoHelp.obj.reportDate != eyejmspjs.cli_date) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyejmspjs);
			}
		}
	}

}

// 角膜内皮计数报告保存
function saveOrUpdateEyejmspjs_jiancha() {
	var oValidataData = {
		nullValidataData : {
			'r_cd' : '右眼CD为空',
			'r_num' : '右眼NUM为空',
			'r_ave' : '右眼AVE为空',
			'r_min' : '右眼MIN为空',
			'r_sd' : '右眼SD为空',
			'r_cv' : '右眼CV为空',
			'r_max' : '右眼MAX为空',
			'r_aa' : '右眼6A为空',

			'l_cd' : '左眼CD为空',
			'l_num' : '左眼NUM为空',
			'l_ave' : '左眼AVE为空',
			'l_min' : '左眼MIN为空',
			'l_sd' : '左眼SD为空',
			'l_cv' : '左眼CV为空',
			'l_max' : '左眼MAX为空',
			'l_aa' : '左眼6A为空',

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

	var r_cd = $("#r_cd").val();// 右眼CD
	var r_num = $("#r_num").val();// 右眼NUM
	var r_ave = $("#r_ave").val();// 右眼AVE
	var r_min = $("#r_min").val();// 右眼MIN
	var r_sd = $("#r_sd").val();// 右眼SD
	var r_cv = $("#r_cv").val();// 右眼CV
	var r_max = $("#r_max").val();// 右眼MAX
	var r_aa = $("#r_aa").val();// 右眼6A

	var l_cd = $("#l_cd").val();// 左眼CD
	var l_num = $("#l_num").val();// 左眼NUM
	var l_ave = $("#l_ave").val();// 左眼AVE
	var l_min = $("#l_min").val();// 左眼MIN
	var l_sd = $("#l_sd").val();// 左眼SD
	var l_cv = $("#l_cv").val();// 左眼CV
	var l_max = $("#l_max").val();// 左眼MAX
	var l_aa = $("#l_aa").val();// 左眼6A

	var memo = $("#memo").val();// 备注

	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var cli_date = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyejmspjs = {
			jcdId : jcdId,// 检查单ID
		r_cd : r_cd,// 右眼CD
		r_num : r_num,// 右眼NUM
		r_ave : r_ave,// 右眼AVE
		r_min : r_min,// 右眼MIN
		r_sd : r_sd,// 右眼SD
		r_cv : r_cv,// 右眼CV
		r_max : r_max,// 右眼MAX
		r_aa : r_aa,// 右眼6A

		l_cd : l_cd,// 左眼CD
		l_num : l_num,// 左眼NUM
		l_ave : l_ave,// 左眼AVE
		l_min : l_min,// 左眼MIN
		l_sd : l_sd,// 左眼SD
		l_cv : l_cv,// 左眼CV
		l_max : l_max,// 左眼MAX
		l_aa : l_aa,// 左眼6A

		memo : memo,// 备注

		rep_doc : rep_doc,// 申请医生
		doctor : doctor,// 检查医生
		cli_date : cli_date,// 报告日期
		tag : Math.random()
	};
	var url_saveOrUpdateEyejmspjs = "/publish/Eyejmspjs/saveOrUpdateEyejmspjs.htm";// 角膜内皮计数报告保存或者修改
	var data_saveOrUpdateEyejmspjs = getJSONData(url_saveOrUpdateEyejmspjs,
			parameter_saveOrUpdateEyejmspjs, "post");
	if (data_saveOrUpdateEyejmspjs.state)
		$.oimsSucc("角膜内皮计数报告保存成功", function() {
			closeReporeDialog();
		});
	else
		$.oimsError("角膜内皮计数报告保存失败", function() {
			closeReporeDialog();
		});
}

// 角膜内皮计数报告预览
function previewEyejmspjs_jiancha() {
	var oValidataData = {
		nullValidataData : {
			'r_cd' : '右眼CD为空',
			'r_num' : '右眼NUM为空',
			'r_ave' : '右眼AVE为空',
			'r_min' : '右眼MIN为空',
			'r_sd' : '右眼SD为空',
			'r_cv' : '右眼CV为空',
			'r_max' : '右眼MAX为空',
			'r_aa' : '右眼6A为空',

			'l_cd' : '左眼CD为空',
			'l_num' : '左眼NUM为空',
			'l_ave' : '左眼AVE为空',
			'l_min' : '左眼MIN为空',
			'l_sd' : '左眼SD为空',
			'l_cv' : '左眼CV为空',
			'l_max' : '左眼MAX为空',
			'l_aa' : '左眼6A为空',

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

	var r_cd = $("#r_cd").val();// 右眼CD
	var r_num = $("#r_num").val();// 右眼NUM
	var r_ave = $("#r_ave").val();// 右眼AVE
	var r_min = $("#r_min").val();// 右眼MIN
	var r_sd = $("#r_sd").val();// 右眼SD
	var r_cv = $("#r_cv").val();// 右眼CV
	var r_max = $("#r_max").val();// 右眼MAX
	var r_aa = $("#r_aa").val();// 右眼6A

	var l_cd = $("#l_cd").val();// 左眼CD
	var l_num = $("#l_num").val();// 左眼NUM
	var l_ave = $("#l_ave").val();// 左眼AVE
	var l_min = $("#l_min").val();// 左眼MIN
	var l_sd = $("#l_sd").val();// 左眼SD
	var l_cv = $("#l_cv").val();// 左眼CV
	var l_max = $("#l_max").val();// 左眼MAX
	var l_aa = $("#l_aa").val();// 左眼6A

	var memo = $("#memo").val();// 备注

	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var cli_date = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyejmspjs = {
			jcdId : jcdId,// 检查单ID
		r_cd : r_cd,// 右眼CD
		r_num : r_num,// 右眼NUM
		r_ave : r_ave,// 右眼AVE
		r_min : r_min,// 右眼MIN
		r_sd : r_sd,// 右眼SD
		r_cv : r_cv,// 右眼CV
		r_max : r_max,// 右眼MAX
		r_aa : r_aa,// 右眼6A

		l_cd : l_cd,// 左眼CD
		l_num : l_num,// 左眼NUM
		l_ave : l_ave,// 左眼AVE
		l_min : l_min,// 左眼MIN
		l_sd : l_sd,// 左眼SD
		l_cv : l_cv,// 左眼CV
		l_max : l_max,// 左眼MAX
		l_aa : l_aa,// 左眼6A

		memo : memo,// 备注

		rep_doc : rep_doc,// 申请医生
		doctor : doctor,// 检查医生
		cli_date : cli_date,// 报告日期
		tag : Math.random()
	};
	parameter_saveOrUpdateEyejmspjs = JSON.stringify(
			parameter_saveOrUpdateEyejmspjs).replace(new RegExp("\"", "gm"),
			"'");
	var html_div_reportresult = "<div id='div_reportresult'>"
			+ $("#div_reportresult").html() + "</div>";// 报告内容
	closeReporeDialog();
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
			+ "/js/manager/baogao/language.config.js'></script>";
	html_baogao += "<script src='" + contextPath
			+ "/js/manager/baogao/previewEyejmspjs.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyejmspjs="
			+ parameter_saveOrUpdateEyejmspjs + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}
