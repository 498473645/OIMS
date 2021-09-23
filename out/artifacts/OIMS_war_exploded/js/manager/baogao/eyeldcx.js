// B超检查报告必要的数据初始化
function initData_eyeldcx() {

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
	/********************模板录入*********************/
	var _this;
	$("#demo").click(function(){
		_this = this;
		var position = $(this).position();
		var left = position.left;
		var top = position.top;
		$(".blk_a").hide();
		$("#blk1").css("display","block").css("left",left).css("top",top+$(this).height()+10);
	});
	$("#result_moban").change(function(){
		var str = $("#result_moban").val();
		$("#demo").val(str);
		$("#blk1").hide();
		$(_this).focus();
		return false;
	});
	$("#confirm").bind("click",function(){
		var str = $("#result_moban").val();
		$("#demo").val(str);
		$("#blk1").hide();
		$(_this).focus();
		});
	$("#close").bind("click",function(){
		$("#blk1").hide();
		$(_this).focus();
	});
	/********************模板录入*********************/
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

	/** ********************************泪道冲洗信息********************************** */
	var url_selectEyeldcxByEyeldcx = "/publish/Eyeldcx/selectEyeldcxByEyeldcx.htm";// 根据B超报告对象查询符合条件的B超报告对象
	var data_selectEyeldcxByEyeldcx = getJSONData(
			url_selectEyeldcxByEyeldcx, {
				jcdId : dataObjects_choice[0].jcdid,
				tag : Math.random()
			}, "post");
	if (data_selectEyeldcxByEyeldcx.state) {
//		showReportPictures();// 显示报告图片
		var eyeldcx = data_selectEyeldcxByEyeldcx.obj;
		if (eyeldcx != null) {
			if ($("#demo").length == 1)
				$("#demo").val(eyeldcx.demo);
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyeldcx.cli_date);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyeldcx.rep_doc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyeldcx.doctor);// 检查医生
			if (data_outBaogaoHelp.obj.reportDate != eyeldcx.cli_date) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyeldcx);
			} 
		} 
	}
	/** ********************************泪道冲洗信息********************************** */

}
// 泪道冲洗检查报告保存
function saveOrUpdateEyeldcx() {
	var oValidataData = {
			nullValidataData : {
				'demo' : '检查结果为空'
			}
		};
		var sReturn = fnFormValidata(oValidataData);
		if (sReturn != null) {
			$.oimsAlert(sReturn);
			return;
		}
	var jcdId = dataObjects_choice[0].jcdid;// 检查单ID
	var huanzhexinxi_id = dataObjects_choice[0].huanzheId;// 患者ID

	var demo = $("#demo").val();

	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var cli_date = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyeldcx = {
		jcdId : jcdId,
		huanzhexinxi_id : huanzhexinxi_id,
		demo : demo,
		rep_doc : rep_doc,
		doctor : doctor,
		cli_date : cli_date,
		tag : Math.random()
	};
	var url_saveOrUpdateEyeldcx = "/publish/Eyeldcx/saveOrUpdateEyeldcx.htm";// B超检查报告保存
	var data_saveOrUpdateEyeldcx = getJSONData(url_saveOrUpdateEyeldcx,
			parameter_saveOrUpdateEyeldcx, "post");
	if (data_saveOrUpdateEyeldcx.state)
		$.oimsSucc("泪道冲洗报告保存成功", function() {

		});
	else
		$.oimsError("泪道冲洗报告保存失败", function() {

		});
}

// 泪道冲洗检查报告打印预览
function previewEyeldcx() {
	var oValidataData = {
			nullValidataData : {
				'demo' : '检查结果为空'
			}
		};
		var sReturn = fnFormValidata(oValidataData);
		if (sReturn != null) {
			$.oimsAlert(sReturn);
			return;
		}
	var jcdId = dataObjects_choice[0].jcdid;// 检查单ID
	var huanzhexinxi_id = dataObjects_choice[0].huanzheId;// 患者ID

	var demo = $("#demo").val();

	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var rep_doc_name = $("#rep_doc option:selected").text();// 申请医生
	var doctor_name = $("#doctor option:selected").text();// 检查医生
	var cli_date = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyeldcx = {
		jcdId : jcdId,
		huanzhexinxi_id : huanzhexinxi_id,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		demo : demo,
		rep_doc : rep_doc,
		doctor : doctor,
		rep_doc_name : rep_doc_name,// 申请医生姓名
		doctor_name : doctor_name,// 检查医生姓名
		cli_date : cli_date,
		tag : Math.random()
	};
	parameter_saveOrUpdateEyeldcx = JSON.stringify(
			parameter_saveOrUpdateEyeldcx)
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
			+ "/js/manager/baogao/previewEyeldcx.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyeldcx="
			+ parameter_saveOrUpdateEyeldcx + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}

