//三级视功数据初始化
function initData_eyetsjsj() {
	/***************输入模板初始化*****************/
$("#sj_1").click(function(){
	var position = $(this).position();
	var left = position.left;
	var top = position.top;
	$(".blk_a").hide();
	$(this).focus();
	$("#blk1").css("display","block").css("left",left).css("top",top+55);
});
$("#confirm1").bind("click",function(){
	var value = $("#sj_1").val();
	var str1 = $("#yiji").val();
	$("#sj_1").val(value+str1);
	$("#blk1").hide();
	$("#sj_1").focus();
	});
$("#yiji").unbind('change').bind("change",function(){
	var value = $("#sj_1").val();
	var str1 = $("#yiji").val();
	if($("#sj_1").length==1)
	$("#sj_1").val(value+str1);
	$("#blk1").hide();
	$("#sj_1").focus();
	return false;
	});
	$("#close1").bind("click",function(){
		$("#blk1").hide();
		$("#sj_1").focus();
	});
//Ⅱ级
	$("#sj_2").click(function(){
		var position = $(this).position();
		var left = position.left;
		var top = position.top;
		$(".blk_a").hide();
		$("#sj_2").focus();
		$("#blk2").css("display","block").css("left",left).css("top",top+55);
	});
$("#confirm2").bind("click",function(){
	var value = $("#sj_2").val();
	var str1 = $("#erji").val();
	$("#sj_2").val(value+str1);
	$("#blk2").hide();
	$("#sj_2").focus();
	});
$("#erji").unbind('change').bind("change",function(){
	var value = $("#sj_2").val();
	var str1 = $("#erji").val();
	if($("#sj_2").length==1)
	$("#sj_2").val(value+str1);
	$("#blk2").hide();
	$("#sj_2").focus();
	return false;
	});
	$("#close2").bind("click",function(){
		$("#blk2").hide();
		$("#sj_2").focus();
	});
//Ⅲ级
	$("#sj_3").click(function(){
		var position = $(this).position();
		var left = position.left;
		var top = position.top;
		$(".blk_a").hide();
		$("#sj_3").focus();
		$("#blk3").css("display","block").css("left",left).css("top",top+55);
	});
$("#confirm3").bind("click",function(){
	var value = $("#sj_3").val();
	var str1 = $("#sanji").val();
	$("#sj_3").val(value+str1);
	$("#blk3").hide();
	$("#sj_3").focus();
	});
$("#sanji").unbind('change').bind("change",function(){
	var value = $("#sj_3").val();
	var str1 = $("#sanji").val();
	if($("#sj_3").length==1)
	$("#sj_3").val(value+str1);
	$("#blk3").hide();
	$("#sj_3").focus();
	return false;
	});
	$("#close3").bind("click",function(){
		$("#blk3").hide();
		$("#sj_3").focus();
	});
//视网膜对象
	$("#swmdy").click(function(){
		var position = $(this).position();
		var left = position.left;
		var top = position.top;
		$(".blk_a").hide();
		$("#blk4").css("display","block").css("left",left).css("top",top+55);
		$("#swmdy").focus();
	});
$("#confirm4").bind("click",function(){
	var value = $("#swmdy").val();
	var str1 = $("#swmdy_moban").val();
	$("#swmdy").val(value+str1);
	$("#blk4").hide();
	$("#swmdy").focus();
	});
$("#swmdy_moban").unbind('change').bind("change",function(){
	var value = $("#swmdy").val();
	var str1 = $("#swmdy_moban").val();
	if($("#swmdy").length==1)
	$("#swmdy").val(value+str1);
	$("#blk4").hide();
	$("#swmdy").focus();
	return false;
	});
	$("#close4").bind("click",function(){
		$("#blk4").hide();
		$("#swmdy").focus();
	});
	/***************输入模板初始化*****************/
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

	var url_selectEyetsjsjByEyetsjsj = "/publish/Eyetsjsj/selectEyetsjsjByEyetsjsj.htm";
	var data_selectEyetsjsjByEyetsjsj = getJSONData(
			url_selectEyetsjsjByEyetsjsj, {
				jcdId : dataObjects_choice[0].jcdid,
				tag : Math.random()
			}, "post");
	if (data_selectEyetsjsjByEyetsjsj.state) {
		var eyetsjsj = data_selectEyetsjsjByEyetsjsj.obj;
		if (eyetsjsj != null) {

			if ($("#sj_1").length == 1)
				$("#sj_1").val(eyetsjsj.sj_1);
			if ($("#sj_2").length == 1)
				$("#sj_2").val(eyetsjsj.sj_2);
			if ($("#rk2").length == 1)
				$("#rk2").val(eyetsjsj.rk2);
			if ($("#sj_3").length == 1)
				$("#sj_3").val(eyetsjsj.sj_3);
			if ($("#swmdy").length == 1)
				$("#swmdy").val(eyetsjsj.swmdy);
			
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyetsjsj.cli_date);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyetsjsj.rep_doc);
			if ($("#doctor").length == 1)
				$("#doctor").val(eyetsjsj.doctor);

			if (data_outBaogaoHelp.obj.reportDate != eyetsjsj.cli_date) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyetsjsj);
			}
		}
	}
}

// 三级视功能报告保存或者修改
function saveOrUpdateEyetsjsj(state) {
	var oValidataData = {
		nullValidataData : {
			
			'sj_1' : '三级视功能Ⅰ级为空',
			'sj_2' : '三级视功能Ⅱ级为空',
			'sj_3' : '三级视功能Ⅲ级为空',
			'swmdy' : '三级视功能视网膜对象为空',
			
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
	var huanzhexinxi_id=dataObjects_choice[0].huanzheId;//患者ID
	var sj_1 = $("#sj_1").val();
	var sj_2 = $("#sj_2").val();
	var sj_3 = $("#sj_3").val();
	var swmdy = $("#swmdy").val();
	
	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var cli_date = $("#cli_date ").html();// 报告日期

	var parameter_saveOrUpdateEyetsjsj = {
		jcdId : jcdId,// 检查单ID
		huanzhexinxi_id:huanzhexinxi_id,//患者ID
		sj_1 : sj_1,
		sj_2 : sj_2,
		sj_3 : sj_3,
		swmdy : swmdy,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,

		rep_doc : rep_doc,// 申请医生
		doctor : doctor,// 检查医生
		cli_date : cli_date,// 报告日期
		tag : Math.random()
	};
	var url_saveOrUpdateEyetsjsj = "/publish/Eyetsjsj/saveOrUpdateEyetsjsj.htm";
	var data_saveOrUpdateEyetsjsj = getJSONData(url_saveOrUpdateEyetsjsj,
			parameter_saveOrUpdateEyetsjsj, "post");
	if (data_saveOrUpdateEyetsjsj.state)
		$.oimsSucc("同视机双眼视觉报告保存成功", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待检患者界面
				closeReporeDialog();
			}
		});
	else
		$.oimsError("同视机双眼视觉报告保存失败", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待检患者界面
				closeReporeDialog();
			}
		});
}

// 三级视功能数报告打印预览
function previewEyetsjsj() {
	var oValidataData = {
			nullValidataData : {
				
				'sj_1' : '三级视功能Ⅰ级为空',
				'sj_2' : '三级视功能Ⅱ级为空',
				'sj_3' : '三级视功能Ⅲ级为空',
				'swmdy' : '三级视功能视网膜对象为空',
				
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
		var huanzhexinxi_id=dataObjects_choice[0].huanzheId;//患者ID
		var sj_1 = $("#sj_1").val();
		var sj_2 = $("#sj_2").val();
		var sj_3 = $("#sj_3").val();
		var swmdy = $("#swmdy").val();
		
		var rep_doc = $("#rep_doc option:selected").val();// 申请医生
		var doctor = $("#doctor option:selected").val();// 检查医生
		var rep_doc_name = $("#rep_doc option:selected").text();// 申请医生
		var doctor_name = $("#doctor option:selected").text();// 检查医生
		var cli_date = $("#cli_date ").html();// 报告日期

		var parameter_saveOrUpdateEyetsjsj = {
			jcdId : jcdId,// 检查单ID
			huanzhexinxi_id:huanzhexinxi_id,//患者ID
			sj_1 : sj_1,
			sj_2 : sj_2,
			sj_3 : sj_3,
			swmdy : swmdy,
			baogaoState : oimsCategory.BAOGAO_STATE_CSDR,

			rep_doc : rep_doc,// 申请医生
			doctor : doctor,// 检查医生
			rep_doc_name : rep_doc_name,// 申请医生姓名
			doctor_name : doctor_name,// 检查医生姓名
			cli_date : cli_date,// 报告日期
			tag : Math.random()
		};
		parameter_saveOrUpdateEyetsjsj = JSON.stringify(
				parameter_saveOrUpdateEyetsjsj)
			.replace(new RegExp("\"", "gm"), "'");
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
			+ "/js/manager/baogao/previewEyetsjsj.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyetsjsj="
			+ parameter_saveOrUpdateEyetsjsj + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}
