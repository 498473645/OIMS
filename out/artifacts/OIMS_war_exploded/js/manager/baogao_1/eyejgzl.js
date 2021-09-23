//激光治疗参数设置
//激光类型
var data_eyejgzl_type = [{
	value : '',
	text : ''
}, {
	value : '虹膜周切术',
	text : '虹膜周切术'
}, {
	value : '视网膜多波长激光',
	text : '视网膜多波长激光'
}, {
	value : 'PDT',
	text : 'PDT'
}, {
	value : 'TTT',
	text : 'TTT'
}, {
	value : 'YAG激光后囊膜切开术',
	text : 'YAG激光后囊膜切开术'
}, {
	value : '激光前囊膜松解术',
	text : '激光前囊膜松解术'
}, {
	value : '氪黄激光巩膜瓣缝线切断术',
	text : '氪黄激光巩膜瓣缝线切断术'
}, {
	value : '安顿孔渗出膜切开术',
	text : '安顿孔渗出膜切开术'
}, {
	value : '瞳孔区渗出膜切开术',
	text : '瞳孔区渗出膜切开术'
}, {
	value : 'YAG虹膜残膜切开术',
	text : 'YAG虹膜残膜切开术'
}, {
	value : '激光虹膜表面新生血管封闭术',
	text : '激光虹膜表面新生血管封闭术'
}, {
	value : '激光治疗青光眼(SLT)',
	text : '激光治疗青光眼(SLT)'
}, {value:'激光虹膜周边成形术',text:'激光虹膜周边成形术'}
];
//眼别
var data_eyejgzl_yb = [ {
	value : '',
	text : ''
}, {
	value : '左眼',
	text : '左眼'
}, {
	value : '右眼',
	text : '右眼'
}, {
	value : '双眼',
	text : '双眼'
} ];

function initData_eyejgzl() {
	//激光类型
	if ($("#type").length == 1) {
		for ( var i = 0; i < data_eyejgzl_type.length; i++)
			$(
					"<option value=\""
							+ data_eyejgzl_type[i].value
							+ "\">" + data_eyejgzl_type[i].text
							+ "</option>").appendTo("#type");
	}
	//眼别
	if ($("#yb").length == 1) {
		for ( var i = 0; i < data_eyejgzl_yb.length; i++)
			$(
					"<option value=\""
							+ data_eyejgzl_yb[i].value
							+ "\">" + data_eyejgzl_yb[i].text
							+ "</option>").appendTo("#yb");
	}
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
	//治疗过程
	var _this;
	$("#result").click(function(){
		_this = this;
		var position = $(this).position();
		var left = position.left;
		var top = position.top;
		$(".blk_a").hide();
		$("#blk1").css("display","block").css("left",left).css("top",top+$(this).height()+10);
	});
	$("#result_moban").change(function(){
		var str = $("#result_moban").val();
		$("#result").val(str);
		$("#blk1").hide();
		$(_this).focus();
		return false;
	});
	$("#confirm").bind("click",function(){
		var str = $("#result_moban").val();
		$("#result").val(str);
		$("#blk1").hide();
		$(_this).focus();
		});
	$("#close").bind("click",function(){
		$("#blk1").hide();
		$(_this).focus();
	});
	/***************输入模板初始化*****************/
	// 查询该报告页面所有元素信息
	var url_outBaogaoHelp = "/publish/baogao/outBaogaoHelp.htm";
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
	//根jgzl报告对象查询符合条件的jgzl报告对象
	var url_selectEyejgzlByEyejgzl = "/publish/Eyejgzl/selectEyejgzlByEyejgzl.htm";
	var data_selectEyejgzlByEyejgzl = getJSONData(
			url_selectEyejgzlByEyejgzl, {
				jcdId : dataObjects_choice[0].jcdid,
				tag : Math.random()
			}, "post");
	if (data_selectEyejgzlByEyejgzl.state) {
		var eyejgzl = data_selectEyejgzlByEyejgzl.obj;
		if (eyejgzl != null) {
			if ($("#jgzl_no").length == 1)
				$("#jgzl_no").val(eyejgzl.jgzlNo);//激光治疗单
			if ($("#type").length == 1)
				$("#type").val(eyejgzl.type);//激光类型 
			if ($("#yb").length == 1)
				$("#yb").val(eyejgzl.yb);//眼别
			if ($("#result").length == 1)
				$("#result").val(eyejgzl.result);//治疗过程
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyejgzl.cliDate);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyejgzl.repDoc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyejgzl.doctor);// 检查医生
			if (data_outBaogaoHelp.obj.reportDate != eyejgzl.cliDate) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyejgzl);
			}
		}
	}
}

// jgzl检查报告保存
function saveOrUpdateEyejgzl(state) {
	var oValidataData = {
		nullValidataData : {
			'result' : '治疗过程为空'
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);// 带*为必填项
		return;
	}
	var jcdId = dataObjects_choice[0].jcdid;// 检查单ID
	var jgzlNo = $("#jgzl_no").val();//激光治疗号
	var type = $("#type").val();//  激光类型
	var yb = $("#yb").val();//眼别
	var result = $("#result").val();// 治疗过程
	var repDoc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var cliDate = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyejgzl = {
		jcdId : jcdId,// 检查单ID
		jgzlNo : jgzlNo,
		type : type,
		yb : yb,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		result : result,
		repDoc : repDoc,// 申请医生
		doctor : doctor,// 检查医生
		cliDate : cliDate,// 报告日期
		tag : Math.random()
	};
	var url_saveOrUpdateEyejgzl = "/publish/Eyejgzl/saveOrUpdateEyejgzl.htm";// jgzl检查报告保存
	var data_saveOrUpdateEyejgzl = getJSONData(url_saveOrUpdateEyejgzl,
			parameter_saveOrUpdateEyejgzl, "post");
	if (data_saveOrUpdateEyejgzl.state)
		$.oimsSucc("激光治疗检查报告保存成功", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待检患者界面
				closeReporeDialog();
			}
		});
	else
		$.oimsError("激光治疗检查报告保存失败", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待检患者界面
				closeReporeDialog();
			}
		});
}

// jgzl检查报告打印预览
function previewEyejgzl() {
	var oValidataData = {
		nullValidataData : {
		
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);// 带*为必填项
		return;
	}
	var jcdId = dataObjects_choice[0].jcdid;// 检查单ID
	var jgzlNo = $("#jgzl_no").val();//激光治疗号
	var type = $("#type").val();//  激光类型
	var yb = $("#yb").val();//眼别
	var result = $("#result").val();// 治疗过程
	var repDoc = $("#rep_doc option:selected").val();// 申请医生
	var repDoc_name = $("#rep_doc option:selected").text();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var doctor_name = $("#doctor option:selected").text();// 检查医生
	var cliDate = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyejgzl = {
		jcdId : jcdId,// 检查单ID
		jgzlNo : jgzlNo,
		type : type,
		yb : yb,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		result : result,
		repDoc : repDoc,// 申请医生
		doctor : doctor,// 检查医生
		repDoc_name : repDoc_name,// 申请医生
		doctor_name : doctor_name,// 检查医生
		cliDate : cliDate,// 报告日期
		tag : Math.random()
	};
	parameter_saveOrUpdateEyejgzl = JSON.stringify(
			parameter_saveOrUpdateEyejgzl)
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
			+ "/js/manager/baogao/previewEyejgzl.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyejgzl="
			+ parameter_saveOrUpdateEyejgzl + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}
