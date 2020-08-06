// OCT检查报告必要的数据初始化
function initData_eyeoct() {
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
	/**************************选择出报告的方式**********************************/
	$("#xmzl").unbind("change").bind("change",function(){
		if($("#xmzl").val()==1){
		$("#div_display").css("display","none");
		$(".xiNanReport").css("width","663px");
		$(".title1").show();
		$(".title2").hide();
		}else{
			$("#div_display").css("display","block");
			$(".xiNanReport").css("width","745px");
			$(".title1").hide();
			$(".title2").show();
			}
		return false;
	});
	/**************************选择出报告的方式**********************************/
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
	var url_selectEyeoctByEyeoct = "/publish/Eyeoct/selectEyeoctByEyeoct.htm";// 根据OCT报告对象查询符合条件的OCT报告对象
	var data_selectEyeoctByEyeoct = getJSONData(
			url_selectEyeoctByEyeoct, {
				jcdId : dataObjects_choice[0].jcdid,
				tag : Math.random()
			}, "post");
	if (data_selectEyeoctByEyeoct.state) {
		showReportPictures();// 显示报告图片
		var eyeoct = data_selectEyeoctByEyeoct.obj;
		if (eyeoct != null) {
			if ($("#xmzl").length == 1)
				$("#xmzl").val(eyeoct.xmzl);
			if ($("#memo").length == 1)
				$("#memo").val(eyeoct.memo);
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyeoct.cli_date);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyeoct.rep_doc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyeoct.doctor);// 检查医生
			if (data_outBaogaoHelp.obj.reportDate != eyeoct.cli_date) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyeoct);
			} else {
				initPictureOperate();
			}
		} else {
			initPictureOperate();
		}
	}

}
/** ********************************图片信息********************************** */
// OCT检查报告保存
function saveOrUpdateEyeoct() {
	var parameter_saveOrUpdateEyeoct = validateAndGetValue_eyeoct();
	var url_saveOrUpdateEyeoct = "/publish/Eyeoct/saveOrUpdateEyeoct.htm";// OCT检查报告保存
	var data_saveOrUpdateEyeoct = getJSONData(url_saveOrUpdateEyeoct,
			parameter_saveOrUpdateEyeoct, "post");
	if (data_saveOrUpdateEyeoct.state)
		$.oimsSucc("OCT检查报告保存成功", function() {

		});
	else
		$.oimsError("OCT检查报告保存失败", function() {

		});
}

function validateAndGetValue_eyeoct(){
	var oValidataData = {
			nullValidataData : {
				'memo' : '检查所见为空'
			}
		};
		var sReturn = fnFormValidata(oValidataData);
		if (sReturn != null) {
			$.oimsAlert(sReturn);// 带*为必填项
			return;
		}
	var path_pictures = "";
	var paixus = "";
	var operateDiv = $(".operateDiv");
	var array_div = $(operateDiv)[0].children;
	for ( var i = 0; i < array_div.length; i++) {
		if (array_div[i].children.length > 0
				&& array_div[i].firstChild.tagName.toLowerCase() == "img"){
			var str = $(array_div[i]).attr("id");
			path_pictures += ($(array_div[i].children[0]).attr("src")) + ",";
//			paixus+=str.substring(str.lastIndexOf("_")+1,str.length)+",";
			paixus+=$(array_div[i]).index()+",";
		}
	}
	var jcdId = dataObjects_choice[0].jcdid;// 检查单ID
	var huanzhexinxi_id = dataObjects_choice[0].huanzheId;// 患者ID

	var memo = $("#memo").val();
	var xmzl = $("#xmzl").val();
	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var rep_doc_name = $("#rep_doc option:selected").text();// 申请医生名称
	var doctor_name = $("#doctor option:selected").text();// 检查医生名称
	var cli_date = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyeoct = {
		path_pictures : path_pictures,
		paixus:paixus,
		jcdId : jcdId,
		huanzhexinxi_id : huanzhexinxi_id,
		xmzl : xmzl,
		memo : memo,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		rep_doc : rep_doc,
		doctor : doctor,
		rep_doc_name:rep_doc_name,
		doctor_name:doctor_name,
		cli_date : cli_date,
		tag : Math.random()
	};
	return parameter_saveOrUpdateEyeoct;
}


// OCT检查报告打印预览
function previewEyeoct() {
//	var oValidataData = {
//			nullValidataData : {
//				'memo' : '检查所见为空'
//			}
//		};
//		var sReturn = fnFormValidata(oValidataData);
//		if (sReturn != null) {
//			$.oimsAlert(sReturn);// 带*为必填项
//			return;
//		}
//	var path_pictures = "";
//	var operateDiv = $(".operateDiv");
//	var array_div = $(operateDiv)[0].children;
//	for ( var i = 0; i < array_div.length; i++) {
//		if (array_div[i].children.length > 0
//				&& array_div[i].firstChild.tagName.toLowerCase() == "img")
//			path_pictures += ($(array_div[i].children[0]).attr("src")) + ",";
//	}
//	var jcdId = dataObjects_choice[0].jcdid;// 检查单ID
//	var huanzhexinxi_id = dataObjects_choice[0].huanzheId;// 患者ID
//
//	var memo = $("#memo").val();
//	var xmzl = $("#xmzl").val();
//	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
//	var rep_doc_name = $("#rep_doc option:selected").text();// 申请医生名称
//	var doctor = $("#doctor option:selected").val();// 检查医生
//	var doctor_name = $("#doctor option:selected").text();// 检查医生名称
//	var cli_date = $("#cli_date ").html();// 报告日期
//	var parameter_saveOrUpdateEyeoct = {
//		path_pictures : path_pictures,
//		jcdId : jcdId,
//		huanzhexinxi_id : huanzhexinxi_id,
//		memo : memo,
//		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
//		xmzl : xmzl,
//		rep_doc : rep_doc,
//		doctor : doctor,
//		cli_date : cli_date,
//		rep_doc_name:rep_doc_name,
//		doctor_name:doctor_name,
//		tag : Math.random()
//	};
	var parameter_saveOrUpdateEyeoct = validateAndGetValue_eyeoct();
	parameter_saveOrUpdateEyeoct = JSON.stringify(
			parameter_saveOrUpdateEyeoct)
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
			+ "/js/manager/baogao/previewEyeoct.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyeoct="
			+ parameter_saveOrUpdateEyeoct + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}
