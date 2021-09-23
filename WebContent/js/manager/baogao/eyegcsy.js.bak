//视野检查
//视野机型
var data_eyegcsy_syType = [ {
	value : '',
	text : ''
}, {
	value : 'OCTOUPS 900',
	text : 'OCTOUPS 900'
}, {
	value : 'Humphvey',
	text : 'Humphvey'
}, {
	value : '微视野 MP-3',
	text : '微视野 MP-3'
}, {
	value : '微视野 Maia',
	text : '微视野 Maia'
}, {
	value : '上邦',
	text : '上邦'
}];
//眼别
var data_eyegcsy_yb = [{
	value : '',
	text : ''
},{
	value:'双眼',
	text:"双眼"
},{
	value:'右眼',
	text:"右眼"
},{
	value:'左眼',
	text:"左眼"
}];
//检查程序
var data_eyegcsy_prog1 = [{
	value : '',
	text : ''
},{
	value:'TG2',
	text:'TG2'
},{
	value:'ST',
	text:'ST'
},{
	value:'LVC',
	text:'LVC'
},{
	value:'LVP',
	text:'LVP'
},{
	value:'centval',
	text:'centval'
}];

var data_eyegcsy_prog2 = [{
	value : '',
	text : ''
},{
	value:'w/w,GoldmanⅢ/100ms,30度',
	text:'w/w,GoldmanⅢ/100ms,30度'
},{
	value:'w/w,GoldmanⅢ/100ms,60度',
	text:'w/w,GoldmanⅢ/100ms,60度'
},{
	value:'w/w,GoldmanⅤ/200ms,30度',
	text:'w/w,GoldmanⅤ/200ms,30度'
},{
	value:'w/w,GoldmanⅢ、100ms,85度',
	text:'w/w,GoldmanⅢ、100ms,85度'
},{
	value:'Ⅲ/wite',
	text:'Ⅲ/wite'
}];
function initData_eyegcsy() {
	if ($("#yanbie").length == 1) {
		for (var i = 0; i < data_eyegcsy_yb.length; i++)
			$(
					"<option value='" + data_eyegcsy_yb[i].value + "'>"
							+ data_eyegcsy_yb[i].text + "</option>").appendTo(
					"#yanbie");
	}
	if ($("#sy_type").length == 1)
		for (var i = 0; i < data_eyegcsy_syType.length; i++)
			$(
					"<option value='" + data_eyegcsy_syType[i].value + "'>"
							+ data_eyegcsy_syType[i].text + "</option>")
					.appendTo("#sy_type");
	if ($("#sy_prog1").length == 1)
		for (var i = 0; i < data_eyegcsy_prog1.length; i++)
			$(
					"<option value='" + data_eyegcsy_prog1[i].value + "'>"
							+ data_eyegcsy_prog1[i].text + "</option>")
					.appendTo("#sy_prog1");
	if ($("#sy_prog2").length == 1)
		for (var i = 0; i < data_eyegcsy_prog2.length; i++)
			$(
					"<option value='" + data_eyegcsy_prog2[i].value + "'>"
							+ data_eyegcsy_prog2[i].text + "</option>")
					.appendTo("#sy_prog2");

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
	var url_selectEyegcsyByEyegcsy = "/publish/Eyegcsy/selectEyegcsyByEyegcsy.htm";
	var data_selectEyegcsyByEyegcsy = getJSONData(url_selectEyegcsyByEyegcsy, {
		jcdId : dataObjects_choice[0].jcdid,
		tag : Math.random()
	}, "POST");
	if (data_selectEyegcsyByEyegcsy.state) {
		var eyegcsy = data_selectEyegcsyByEyegcsy.obj;
		if (eyegcsy != null) {
			if ($("#sy_no").length == 1)
				$("#sy_no").val(eyegcsy.syNo);
			if ($("#yanbie").length == 1)
				$("#yanbie").val(eyegcsy.yb);
			if ($("#sy_type").length == 1)
				$("#sy_type").val(eyegcsy.syType);
			if ($("#sy_prog1").length == 1)
				$("#sy_prog1").val(eyegcsy.syProg1);
			if ($("#sy_prog2").length == 1)
				$("#sy_prog2").val(eyegcsy.syProg2);
			if ($("#result").length == 1)
				$("#result").val(eyegcsy.result);
			if ($("#demo").length == 1)
				$("#demo").val(eyegcsy.demo);
			if($("#rep_doc").length == 1)
				$("#rep_doc").val(eyegcsy.repDoc);// 申请医生
			if($("#doctor").length == 1)
				$("#doctor").val(eyegcsy.doctor);// 申请医生
			if($("#cli_date").length==1)
				$("#cli_date").html(eyegcsy.cliDate);
			if (data_outBaogaoHelp.obj.reportDate != eyegcsy.cliDate) {
				utilTool().fdisabled($("#div_reportresult"));
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyegcsy);
			}
		}
	}
}

function saveOrUpdateEyegcsy() {
	var parameter_saveOrUpdateEyegcsy = validateAndGetValue_eyegcsy();
	var url_saveOrUpdateEyegcsy = "/publish/Eyegcsy/saveOrUpdateEyegcsy.htm";
	var data_saveOrUpdateEyegcsy = getJSONData(url_saveOrUpdateEyegcsy,
			parameter_saveOrUpdateEyegcsy, "POST");
	if (data_saveOrUpdateEyegcsy.state)
		$.oimsSucc("视野检查报告保存成功", function() {

		});
	else
		$.oimsError("视野检查报告保存失败", function() {

		});
}

function previewEyegcsy() {
	var parameter_saveOrUpdateEyegcsy = validateAndGetValue_eyegcsy();
	parameter_saveOrUpdateEyegcsy = JSON.stringify(
			parameter_saveOrUpdateEyegcsy).replace(new RegExp("\"", "gm"), "'");
	
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
			+ "/js/manager/baogao/previewEyegcsy.js' charset='utf-8' ></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyegcsy="
			+ parameter_saveOrUpdateEyegcsy + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}

// 验证非空并获取文本中的值
function validateAndGetValue_eyegcsy() {
	var oValidataData = {
		nullValidataData : {
			'yanbie' : '眼别为空',
			'result' : '视野表现为空'
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);
		return;
	}

	var jcdId = dataObjects_choice[0].jcdid;
	var sy_no = $("#sy_no").val();
	var yanbie = $("#yanbie").val();
	var sy_type = $("#sy_type").val();
	var sy_prog1 = $("#sy_prog1").val();
	var sy_prog2 = $("#sy_prog2").val();
	var rep_doc = $("#rep_doc option:selected").val();
	var rep_doc_name = $("#rep_doc option:selected").text();
	var doctor = $("#doctor option:selected").val();
	var doctor_name = $("#doctor option:selected").text();
	var cli_date = $("#cli_date ").html();// 报告日期
	var demo = $("#demo").val();// 报告备注
	var result = $("#result").val();
	var parameter_saveOrUpdateEyegcsy = {
		jcdId : jcdId,
		syNo : sy_no,
		yb : yanbie,
		syType : sy_type,
		syProg1 : sy_prog1,
		syProg2 : sy_prog2,
		repDoc : rep_doc,
		doctor : doctor,
		rep_doc_name : rep_doc_name,
		doctor_name : doctor_name,
		result : result,
		demo : demo,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		cliDate : cli_date,
		tag : Math.random()
	}
	return parameter_saveOrUpdateEyegcsy;
}