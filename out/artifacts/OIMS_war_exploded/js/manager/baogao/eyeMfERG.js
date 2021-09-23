//mf-erg
//检查项目
var date_eyeMFERG_sy_type =[{
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
function initData_eyeMfERG() {
	
	// 检查设备
	if ($("#sy_type").length == 1) {
		for (var i = 0; i < date_eyeMFERG_sy_type.length; i++)
			$(
					"<option value='" + date_eyeMFERG_sy_type[i].value
							+ "'>" + date_eyeMFERG_sy_type[i].text
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
	/***************输入模板初始化*****************/
	var _this;
	$(".mfergClass").click(function(){
	_this = this;
		var position = $(this).position();
		var left = position.left;
		var top = position.top;
		$(".blk_a").hide();
		$(_this).focus();
		$("#blk1").css("display","block").css("left",left).css("top",top+$(this).height()+10);
		
		$("#yiji").change(function(){
		var str = $("#yiji").val();
		if($(_this).length==1)
		$(_this).val(str);
		$("#blk1").hide();
		$(_this).focus();
		return false;
	});
	$("#confirm1").bind("click",function(){
		var str = $("#yiji").val();
		$(_this).val(str);
		$("#blk1").hide();
		$(_this).focus();
		});
		$("#close1").bind("click",function(){
			$("#blk1").hide();
			$(_this).focus();
	});
		});
	/***************输入模板初始化*****************/
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

	var url_selectEyeMfERGByEyeMfERG = "/publish/EyeMfERG/selectEyeMfERGByEyeMfERG.htm";
	var data_selectEyeMfERGByEyeMfERG = getJSONData(
			url_selectEyeMfERGByEyeMfERG, {
				jcdId : dataObjects_choice[0].jcdid,
				tag : Math.random()
			}, "POST");

	if (data_selectEyeMfERGByEyeMfERG.state) {
		var eyeMfERG = data_selectEyeMfERGByEyeMfERG.obj;
		if (eyeMfERG != null) {
			if ($("#sy_type").length == 1)
				$("#sy_type").val(eyeMfERG.sy_type);//检查设备
			if ($("#wavePattern_left").length == 1)
				$("#wavePattern_left").val(eyeMfERG.wavePatternLeft);
			if ($("#wavePattern_right").length == 1)
				$("#wavePattern_right").val(eyeMfERG.wavePatternRight);
			if ($("#swingDensity_left").length == 1)
				$("#swingDensity_left").val(eyeMfERG.swingDensityLeft);
			if ($("#swingDensity_right").length == 1)
				$("#swingDensity_right").val(eyeMfERG.swingDensityRight);
			if ($("#centerToEdge_left").length == 1)
				$("#centerToEdge_left").val(eyeMfERG.centerToEdgeLeft);
			if ($("#centerToEdge_right").length == 1)
				$("#centerToEdge_right").val(eyeMfERG.centerToEdgeRight);
			if ($("#eye_compare").length == 1)
				$("#eye_compare").val(eyeMfERG.eyeCompare);
			if ($("#demo").length == 1)
				$("#demo").val(eyeMfERG.demo);
			if ($("#checkType").length == 1)
				$("#checkType").val(eyeMfERG.checkType);
			if ($("#cli_date").length == 1)
			$("#cli_date").html(eyeMfERG.cliDate);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyeMfERG.repDoc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyeMfERG.doctor);// 检查医生
			if (data_outBaogaoHelp.obj.reportDate != eyeMfERG.cliDate) {
				utilTool().fdisabled($("#div_reportresult"));
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyeMfERG);
			}
		}
	}
}

function saveOrUpdateEyeMfERG() {
	var parameter_saveOrUpdateEyeMfERG = validateAndGetValue_eyeMfERG();
	var url_saveOrUpdateEyeMfERG = "/publish/EyeMfERG/saveOrUpdateEyeMfERG.htm";
	var data_saveOrUpdateEyeMfERG = getJSONData(url_saveOrUpdateEyeMfERG,
			parameter_saveOrUpdateEyeMfERG, "POST");
	if (data_saveOrUpdateEyeMfERG.state)
		$.oimsSucc("电生理Mf-ERG检查报告保存成功", function() {
			
		});
	else
		$.oimsError("电生理Mf-ERG检查报告保存失败", function() {

		});
}

function previewEyeMfERG() {
	var parameter_saveOrUpdateEyeMfERG = validateAndGetValue_eyeMfERG();
	parameter_saveOrUpdateEyeMfERG = JSON.stringify(
			parameter_saveOrUpdateEyeMfERG).replace(new RegExp("\"", "gm"), "'");

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
			+ "/js/manager/baogao/previewEyeMfERG.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyeMfERG="
			+ parameter_saveOrUpdateEyeMfERG + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}

function validateAndGetValue_eyeMfERG() {
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
	var wavePattern_left = $("#wavePattern_left").val();
	var wavePattern_right = $("#wavePattern_right").val();
	var swingDensity_left = $("#swingDensity_left").val();
	var swingDensity_right = $("#swingDensity_right").val();
	var centerToEdge_left = $("#centerToEdge_left").val();
	var centerToEdge_right = $("#centerToEdge_right").val();
	var eye_compare = $("#eye_compare").val();
	var checkType = $("#checkType").val();

	var rep_doc = $("#rep_doc option:selected").val();
	var rep_doc_name = $("#rep_doc option:selected").text();
	var doctor = $("#doctor option:selected").val();
	var doctor_name = $("#doctor option:selected").text();
	var cli_date = $("#cli_date ").html();// 报告日期
	var demo = $("#demo").val();// 报告备注

	var checkDoc = $("#checkDoc option:selected").text();
	var parameter_saveOrUpdateEyeMfERG = {
		sy_type : sy_type,
		wavePatternLeft : wavePattern_left,
		wavePatternRight : wavePattern_right,
		swingDensityLeft : swingDensity_left,
		swingDensityRight : swingDensity_right,
		centerToEdgeLeft : centerToEdge_left,
		centerToEdgeRight : centerToEdge_right,
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
	return parameter_saveOrUpdateEyeMfERG;
}
