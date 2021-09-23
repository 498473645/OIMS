//PERG
//检查项目
var date_eyePERG_sy_type =[{
	value : '',
	text : ''
},{
	value : 'Espion',
	text : 'Espion'
},{
	value : 'Veris',
	text : 'Veris'
},{
	value : 'metrovision',
	text : 'metrovision'
}];

function initData_eyePERG() {
	// 检查设备
	if ($("#sy_type").length == 1) {
		for (var i = 0; i < date_eyePERG_sy_type.length; i++)
			$(
					"<option value='" + date_eyePERG_sy_type[i].value
							+ "'>" + date_eyePERG_sy_type[i].text
							+ "</option>").appendTo("#sy_type");
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
	/***************输入模板初始化*****************/
	var _this;
	$(".pergpnClass").click(function(){
		_this = this;
		var position = $(this).position();
		var left = position.left;
		var top = position.top;
		$(".blk_a").hide();
		$(_this).focus();
		$("#blk1").css("display","block").css("left",left).css("top",top+$(this).height()+10);
		
		$("#pergpn").change(function(){
		var str = $("#pergpn").val();
		if($(_this).length==1)
		$(_this).val(str);
		$(".blk_a").hide();
		$(_this).focus();
		return false;
	});
	$("#confirm1").bind("click",function(){
		var str = $("#pergpn").val();
		$(_this).val(str);
		$(".blk_a").hide();
		$(_this).focus();
		});
		$("#close1").bind("click",function(){
			$(".blk_a").hide();
			$(_this).focus();
	});
		});
//
	$(".pergpnbClass").click(function(){
		_this = this;
		var position = $(this).position();
		var left = position.left;
		var top = position.top;
		$(".blk_a").hide();
		$(_this).focus();
		$("#blk2").css("display","block").css("left",left).css("top",top+$(this).height()+10);
		
		$("#pergpnb").change(function(){
		var str = $("#pergpnb").val();
		if($(_this).length==1)
		$(_this).val(str);
		$(".blk_a").hide();
		$(_this).focus();
		return false;
	});
	$("#confirm2").bind("click",function(){
		var str = $("#pergpnb").val();
		$(_this).val(str);
		$(".blk_a").hide();
		$(_this).focus();
		});
		$("#close2").bind("click",function(){
			$(".blk_a").hide();
			$(_this).focus();
	});
		});
	/***************输入模板初始化*****************/

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
	var url_outBaogaoHemp = "/publish/baogao/outBaogaoHelp.htm";
	var patameter_outBaogaoHemp = {
		id : dataObjects_choice[0].jcdid,
		huanzheId : dataObjects_choice[0].huanzheId,
		tag : Math.random()
	};
	var data_outBaogaoHelp = getJSONData(url_outBaogaoHemp,
			patameter_outBaogaoHemp, "POST");
	if (data_outBaogaoHelp.state) {
		initial_Baogao(data_outBaogaoHelp.obj);
	}

	var url_selectEyePERGByEyePERG = "/publish/EyePERG/selectEyePERGByEyePERG.htm";
	var data_selectEyePERGByEyePERG = getJSONData(url_selectEyePERGByEyePERG, {
		jcdId : dataObjects_choice[0].jcdid,
		tag : Math.random()
	}, "POST");

	if (data_selectEyePERGByEyePERG.state) {
		var eyePERG = data_selectEyePERGByEyePERG.obj;
		if (eyePERG != null) {
			if ($("#sy_type").length == 1)
				$("#sy_type").val(eyePERG.sy_type);//检查设备
			if ($("#checkType").length == 1)
				$("#checkType").val(eyePERG.checkType);//检查设备
			if ($("#wavePattern_left").length == 1)
				$("#wavePattern_left").val(eyePERG.wavePatternLeft);
			if ($("#wavePattern_right").length == 1)
				$("#wavePattern_right").val(eyePERG.wavePatternRight);
			if ($("#p50_rangeValue_left").length == 1)
				$("#p50_rangeValue_left").val(eyePERG.p50RangeValueLeft);
			if ($("#p50_rangeValue_right").length == 1)
				$("#p50_rangeValue_right").val(eyePERG.p50RangeValueRight);
			if ($("#n95_rangeValue_left").length == 1)
				$("#n95_rangeValue_left").val(eyePERG.n95RangeValueLeft);
			if ($("#n95_rangeValue_right").length == 1)
				$("#n95_rangeValue_right").val(eyePERG.n95RangeValueRight);
			if ($("#n95_p50_ratio_left").length == 1)
				$("#n95_p50_ratio_left").val(eyePERG.n95p50RatioLeft);
			if ($("#n95_p50_ratio_right").length == 1)
				$("#n95_p50_ratio_right").val(eyePERG.n95p50RatioRight);
			if ($("#eye_compare").length == 1)
				$("#eye_compare").val(eyePERG.eyeCompare);
			if ($("#demo").length == 1)
				$("#demo").val(eyePERG.demo);
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyePERG.cliDate);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyePERG.repDoc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyePERG.doctor);// 检查医生
			if (data_outBaogaoHelp.obj.reportDate != eyePERG.cliDate) {
				utilTool().fdisabled($("#div_reportresult"));
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyePERG);
			}
		}
	}
}

function saveOrUpdateEyePERG() {
	var parameter_saveOrUpdateEyePERG = validateAndGetValue_eyePERG();
	var url_saveOrUpdateEyePERG = "/publish/EyePERG/saveOrUpdateEyePERG.htm";
	var data_saveOrUpdateEyePERG = getJSONData(url_saveOrUpdateEyePERG,
			parameter_saveOrUpdateEyePERG, "POST");
	if (data_saveOrUpdateEyePERG.state)
		$.oimsSucc("电生理PERG检查报告保存成功", function() {

		});
	else
		$.oimsError("电生理PERG检查报告保存失败", function() {

		});
}

function previewEyePERG(){
	var parameter_saveOrUpdateEyePERG = validateAndGetValue_eyePERG();
	parameter_saveOrUpdateEyePERG = JSON.stringify(parameter_saveOrUpdateEyePERG).replace(new RegExp("\"", "gm"), "'");
	
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
			+ "/js/manager/baogao/previewEyePERG.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyePERG="
			+ parameter_saveOrUpdateEyePERG + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}

function validateAndGetValue_eyePERG() {
	var oValidataData = {
		nullValidataData : {

		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);
		return;
	}

	var jcdId = dataObjects_choice[0].jcdid;
	var sy_type = $("#sy_type").val();
	var checkType = $("#checkType").val();
	var wavePattern_left = $("#wavePattern_left").val();
	var wavePattern_right = $("#wavePattern_right").val();
	var p50_rangeValue_left = $("#p50_rangeValue_left").val();
	var p50_rangeValue_right = $("#p50_rangeValue_right").val();
	var n95_rangeValue_left = $("#n95_rangeValue_left").val();
	var n95_rangeValue_right = $("#n95_rangeValue_right").val();
	var n95_p50_ratio_left = $("#n95_p50_ratio_left").val();
	var n95_p50_ratio_right = $("#n95_p50_ratio_right").val();
	var eye_compare = $("#eye_compare").val();

	var rep_doc = $("#rep_doc option:selected").val();
	var rep_doc_name = $("#rep_doc option:selected").text();
	var doctor = $("#doctor option:selected").val();
	var doctor_name = $("#doctor option:selected").text();
	var cli_date = $("#cli_date ").html();// 报告日期
	var demo = $("#demo").val();// 报告备注

	var parameter_saveOrUpdateEyePERG = {
		sy_type : sy_type,
		checkType : checkType,
		wavePatternLeft : wavePattern_left,
		wavePatternRight : wavePattern_right,
		p50RangeValueLeft : p50_rangeValue_left,
		p50RangeValueRight : p50_rangeValue_right,
		n95RangeValueLeft : n95_rangeValue_left,
		n95RangeValueRight : n95_rangeValue_right,
		n95p50RatioLeft : n95_p50_ratio_left,
		n95p50RatioRight : n95_p50_ratio_right,
		eyeCompare : eye_compare,

		jcdId : jcdId,
		cliDate : cli_date,
		repDoc : rep_doc,
		doctor : doctor,
		rep_doc_name : rep_doc_name,
		doctor_name : doctor_name,
		demo : demo,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		tag : Math.random()
	}
	return parameter_saveOrUpdateEyePERG;
}
