//检查项目
var date_eyeFERG_sy_type =[{
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
function initData_eyeFERG() {
	var _this;
	$(".inputClass").click(function(){
		_this = this;
		var position = $(this).position();
		var left = position.left;
		var top = position.top;
		$(".blk_a").hide();
		$("#blk1").css("display","block").css("left",left).css("top",top+$(this).height()+5);
		$("#confirm1").bind("click",function(){
			var str1 = $("#fuzhi").val();
			$(_this).val(str1);
			$("#blk1").hide();
			$(_this).focus();
		});
		$("#fuzhi").unbind('change').bind("change",function(){
			var str1 = $("#fuzhi").val();
			if($(_this).length==1)
				$(_this).val(str1);
			$("#blk1").hide();
			$(_this).focus();
			return false;
		});
		$("#close1").bind("click",function(){
			$("#blk1").hide();
			$(_this).focus();
		});
	});
	
	// 检查设备
	if ($("#sy_type").length == 1) {
		for (var i = 0; i < date_eyeFERG_sy_type.length; i++)
			$(
					"<option value='" + date_eyeFERG_sy_type[i].value
							+ "'>" + date_eyeFERG_sy_type[i].text
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

	var url_selectEyeFERGByEyeFERG = "/publish/EyeFERG/selectEyeFERGByEyeFERG.htm";
	var data_selectEyeFERGByEyeFERG = getJSONData(url_selectEyeFERGByEyeFERG, {
		jcdId : dataObjects_choice[0].jcdid,
		tag : Math.random()
	}, "POST");

	if (data_selectEyeFERGByEyeFERG.state) {
		var eyeFERG = data_selectEyeFERGByEyeFERG.obj;
		if (eyeFERG != null) {
			if ($("#sy_type").length == 1)//检查设备
				$("#sy_type").val(eyeFERG.sy_type);
			if ($("#wavePattern_left").length == 1)
				$("#wavePattern_left").val(eyeFERG.wavePatternLeft);
			if ($("#wavePattern_right").length == 1)
				$("#wavePattern_right").val(eyeFERG.wavePatternRight);
			if ($("#anshi_001_bbo_left").length == 1)
				$("#anshi_001_bbo_left").val(eyeFERG.anshi001BboLeft);
			if ($("#anshi_001_bbo_right").length == 1)
				$("#anshi_001_bbo_right").val(eyeFERG.anshi001BboRight);
			if ($("#anshi30_abo_left").length == 1)
				$("#anshi30_abo_left").val(eyeFERG.anshi30AboLeft);
			if ($("#anshi30_bbo_left").length == 1)
				$("#anshi30_bbo_left").val(eyeFERG.anshi30BboLeft);
			if ($("#anshi30_abo_right").length == 1)
				$("#anshi30_abo_right").val(eyeFERG.anshi30AboRight);
			if ($("#anshi30_bbo_right").length == 1)
				$("#anshi30_bbo_right").val(eyeFERG.anshi30BboRight);
			if ($("#anshi30_OP2bo_left").length == 1)
				$("#anshi30_OP2bo_left").val(eyeFERG.anshi30Op2BoLeft);
			if ($("#anshi30_OP2bo_right").length == 1)
				$("#anshi30_OP2bo_right").val(eyeFERG.anshi30Op2BoRight);
			if ($("#anshi100_abo_left").length == 1)
				$("#anshi100_abo_left").val(eyeFERG.anshi100AboLeft);
			if ($("#anshi100_bbo_left").length == 1)
				$("#anshi100_bbo_left").val(eyeFERG.anshi100BboLeft);
			if ($("#anshi100_abo_right").length == 1)
				$("#anshi100_abo_right").val(eyeFERG.anshi100AboRight);
			if ($("#anshi100_bbo_right").length == 1)
				$("#anshi100_bbo_right").val(eyeFERG.anshi100BboRight);
			if ($("#mingshi30_abo_left").length == 1)
				$("#mingshi30_abo_left").val(eyeFERG.mingshi30AboLeft);
			if ($("#mingshi30_bbo_left").length == 1)
				$("#mingshi30_bbo_left").val(eyeFERG.mingshi30BboLeft);
			if ($("#mingshi30_abo_right").length == 1)
				$("#mingshi30_abo_right").val(eyeFERG.mingshi30AboRight);
			if ($("#mingshi30_bbo_right").length == 1)
				$("#mingshi30_bbo_right").val(eyeFERG.mingshi30BboRight);
			if ($("#mingshi30HZ_OP2bo_left").length == 1)
				$("#mingshi30HZ_OP2bo_left").val(eyeFERG.mingshi30HZOp2BoLeft);
			if ($("#mingshi30HZ_OP2bo_right").length == 1)
				$("#mingshi30HZ_OP2bo_right").val(eyeFERG.mingshi30HZOp2BoRight);
			
			if ($("#checkType").length == 1)
				$("#checkType").val(eyeFERG.checkType);
			if ($("#eye_compare").length == 1)
				$("#eye_compare").val(eyeFERG.eyeCompare);
			if ($("#demo").length == 1)
				$("#demo").val(eyeFERG.demo);
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyeFERG.cliDate);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyeFERG.repDoc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyeFERG.doctor);// 检查医生
			if (data_outBaogaoHelp.obj.reportDate != eyeFERG.cliDate) {
				utilTool().fdisabled($("#div_reportresult"));
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyeFERG);
			}
		}
	}
}

function saveOrUpdateEyeFERG() {
	var parameter_saveOrUpdateEyeFERG = validateAndGetValue_eyeFERG();
	var url_saveOrUpdateEyeFERG = "/publish/EyeFERG/saveOrUpdateEyeFERG.htm";
	var data_saveOrUpdateEyeFERG = getJSONData(url_saveOrUpdateEyeFERG,
			parameter_saveOrUpdateEyeFERG, "POST");
	if (data_saveOrUpdateEyeFERG.state)
		$.oimsSucc("电生理FERG检查报告保存成功", function() {

		});
	else
		$.oimsError("电生理FERG检查报告保存失败", function() {

		});
}

function previewEyeFERG() {
	var parameter_saveOrUpdateEyeFERG = validateAndGetValue_eyeFERG();
	parameter_saveOrUpdateEyeFERG = JSON.stringify(
			parameter_saveOrUpdateEyeFERG).replace(new RegExp("\"", "gm"), "'");

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
			+ "/js/manager/baogao/previewEyeFERG.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyeFERG="
			+ parameter_saveOrUpdateEyeFERG + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}

function validateAndGetValue_eyeFERG() {
	var oValidataData = {
		nullValidataData : {

		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);
		return;
	}

	var sy_type = $("#sy_type").val();
	var wavePattern_left = $("#wavePattern_left").val();
	var wavePattern_right = $("#wavePattern_right").val();
	var anshi_001_bbo_left = $("#anshi_001_bbo_left").val();
	var anshi_001_bbo_right = $("#anshi_001_bbo_right").val();
	var anshi30_abo_left = $("#anshi30_abo_left").val();
	var anshi30_bbo_left = $("#anshi30_bbo_left").val();
	var anshi30_abo_right = $("#anshi30_abo_right").val();
	var anshi30_bbo_right = $("#anshi30_bbo_right").val();
	var anshi30_OP2bo_left = $("#anshi30_OP2bo_left").val();
	var anshi30_OP2bo_right = $("#anshi30_OP2bo_right").val();
	var anshi100_abo_left = $("#anshi100_abo_left").val();
	var anshi100_bbo_left = $("#anshi100_bbo_left").val();
	var anshi100_abo_right = $("#anshi100_abo_right").val();
	var anshi100_bbo_right = $("#anshi100_bbo_right").val();
	var mingshi30_abo_left = $("#mingshi30_abo_left").val();
	var mingshi30_bbo_left = $("#mingshi30_bbo_left").val();
	var mingshi30_abo_right = $("#mingshi30_abo_right").val();
	var mingshi30_bbo_right = $("#mingshi30_bbo_right").val();
	var mingshi30HZ_OP2bo_left = $("#mingshi30HZ_OP2bo_left").val();
	var mingshi30HZ_OP2bo_right = $("#mingshi30HZ_OP2bo_right").val();
	var checkType = $("#checkType").val();
	
	var jcdId = dataObjects_choice[0].jcdid;
	var eye_compare = $("#eye_compare").val();
	var rep_doc = $("#rep_doc option:selected").val();
	var rep_doc_name = $("#rep_doc option:selected").text();
	var doctor = $("#doctor option:selected").val();
	var doctor_name = $("#doctor option:selected").text();
	var cli_date = $("#cli_date ").html();// 报告日期
	var demo = $("#demo").val();// 报告备注

	var parameter_saveOrUpdateEyeFERG = {
			sy_type : sy_type,
		wavePatternLeft : wavePattern_left,
		wavePatternRight :wavePattern_right, 
		anshi001BboLeft : anshi_001_bbo_left,
		anshi001BboRight : anshi_001_bbo_right,
		anshi30AboLeft : anshi30_abo_left,
		anshi30BboLeft :anshi30_bbo_left,
		anshi30AboRight : anshi30_abo_right,
		anshi30BboRight : anshi30_bbo_right,
		anshi30Op2BoLeft : anshi30_OP2bo_left, 
		anshi30Op2BoRight :anshi30_OP2bo_right,
		anshi100AboLeft : anshi100_abo_left,
		anshi100BboLeft : anshi100_bbo_left,
		anshi100AboRight : anshi100_abo_right, 
		anshi100BboRight :anshi100_bbo_right,
		mingshi30AboLeft : mingshi30_abo_left,
		mingshi30BboLeft : mingshi30_bbo_left, 
		mingshi30AboRight : mingshi30_abo_right,
		mingshi30BboRight :mingshi30_bbo_right,
		mingshi30HZOp2BoLeft : mingshi30HZ_OP2bo_left,
		mingshi30HZOp2BoRight : mingshi30HZ_OP2bo_right,
		eyeCompare : eye_compare,
		cliDate : cli_date,
		jcdId : jcdId,
		repDoc : rep_doc,
		doctor : doctor,
		rep_doc_name : rep_doc_name,
		doctor_name : doctor_name,
		demo : demo,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		checkType:checkType,
		tag : Math.random()
	}
	return parameter_saveOrUpdateEyeFERG;
}
