//Retcam
function initData_eyeRetcam() {
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
	//护士下拉框赋值
	if($("#nurse").length == 1) {
		var data_getNurseAll = getJSONData("/publish/operationDict/findGroupMember.htm",{groupId:1},"POST");
		if($("#nurse").children("option").length==0)
			$("<option />").appendTo($("#nurse"));
		else if($("#nurse").children("option").length>1)
			return;
		$.each(data_getNurseAll,function(i,d){
			$(
					"<option value=\"" + d.groupMemberId.workNo + "\">"
							+ d.name + "</option>").appendTo(
					"#nurse");
		});
	}
	
	// 初始化患者信息
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
	
	//诊断填充
	//patameter_outBaogaoHelp。id
	// 初始化报告信息
	var url_selectEyeRetcamByEyeRetcam = "/publish/EyeRetcam/selectEyeRetcamByEyeRetcam.htm";
	var data_selectEyeRetcam = getJSONData(url_selectEyeRetcamByEyeRetcam, {
		jcdId : dataObjects_choice[0].jcdid
	}, "post");
	if($("#yb").length==1)
		$("#yb").html(data_outBaogaoHelp.obj.eyeSex);
	//读取诊断
	var jcd=getJSONData('/publish/jcd/getJcdById.htm',{id:dataObjects_choice[0].jcdid}).obj;
	var zhenduan=getJSONData('/publish/emr/getExistsDiagnosis.htm',{visitId:jcd.jiuzhenId},'POST');
	var tmp='';
	if(zhenduan&&zhenduan.length){
		for(var i=0;i<zhenduan.length;i++){
			tmp+=((zhenduan[i].eye?zhenduan[i].eye:'')+zhenduan[i].zdflname);
			if(i!=zhenduan.length-1){
				tmp+=',';
			}
		}
	}
	if($("#zhenduan").length==1)
		$("#zhenduan").html(tmp);
	if (data_selectEyeRetcam.state) {
		var eyeRetcam = data_selectEyeRetcam.obj;
		if (eyeRetcam != null) {
		
				if ($("#memo").length == 1)
					$("#memo").val(eyeRetcam.memo);
				if ($("#jc_zhenduan").length == 1)
					$("#jc_zhenduan").val(eyeRetcam.jc_zhenduan);
				if ($("#chuzhi").length == 1)
					$("#chuzhi").val(eyeRetcam.chuzhi);
				if ($("#yb").length == 1)
					$("#yb").html(eyeRetcam.yb);
				if ($("#zhenduan").length == 1)
					$("#zhenduan").html(eyeRetcam.zhenduan);
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyeRetcam.cli_date);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyeRetcam.rep_doc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyeRetcam.doctor);// 检查医生
			if ($("#nurse").length==1)
				$("#nurse").val(eyeRetcam.nurse);
			if (data_outBaogaoHelp.obj.reportDate != eyeRetcam.cli_date) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyeRetcam);
				
			}
		}
	}

}
// 保存或修改Retcam
function saveOrUpdateEyeRetcam() {
	/*var oValidataData = {
			nullValidataData : {
				'memo' : '检查结果为空'
			}
		};
		var sReturn = fnFormValidata(oValidataData);
		if (sReturn != null) {
			$.oimsAlert(sReturn);
			return;
		}*/
//	var path_pictures = "";
//	var operateDiv = $(".operateDiv");
//	var array_div = $(operateDiv)[0].children;
//	for ( var i = 0; i < array_div.length; i++) {
//		if (array_div[i].children.length > 0
//				&& array_div[i].firstChild.tagName.toLowerCase() == "img")
//			path_pictures += ($(array_div[i].children[0]).attr("src")) + ",";
//	}
	var jcdId = dataObjects_choice[0].jcdid;// 检查单ID
	var huanzhexinxi_id = dataObjects_choice[0].huanzheId;// 患者ID

	var memo = $("#memo").val();
	var yb=$("#yb").html();
	var zhenduan=$("#zhenduan").html();
	var jc_zhenduan=$("#jc_zhenduan").val();
	var chuzhi=$("#chuzhi").val();
	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var nurse = $("#nurse option:selected").val();// 护士
	if(nurse==null||nurse==""){
		$.oimsAlert("护士为空");
		return;
	}
	var cli_date = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyeRetcam = {
//		path_pictures : path_pictures,
		jcdId : jcdId,
		huanzhexinxi_id : huanzhexinxi_id,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		memo : memo,
		yb:yb,
		zhenduan:zhenduan,
		jc_zhenduan:jc_zhenduan,
		chuzhi:chuzhi,
		rep_doc : rep_doc,
		doctor : doctor,
		nurse:nurse,
		cli_date : cli_date,
		tag : Math.random()
	};
	var url_saveOrUpdateEyeRetcam = "/publish/EyeRetcam/saveOrUpdateEyeRetcam.htm";
	var data_saveOrUpdateEyeRetcam = getJSONData(url_saveOrUpdateEyeRetcam,
			parameter_saveOrUpdateEyeRetcam, "post");
	if (data_saveOrUpdateEyeRetcam.state)
		$.oimsSucc("检查报告保存成功", function() {

		});
	else
		$.oimsError("检查报告保存失败", function() {

		});
}

// 前方深度检查打印预览
function previewEyeRetcam() {
	/*var oValidataData = {
			nullValidataData : {
				'memo' : '检查结果为空'
			}
		};
		var sReturn = fnFormValidata(oValidataData);
		if (sReturn != null) {
			$.oimsAlert(sReturn);
			return;
		}*/
//	var path_pictures = "";
//	var operateDiv = $(".operateDiv");
//	var array_div = $(operateDiv)[0].children;
//	for ( var i = 0; i < array_div.length; i++) {
//		if (array_div[i].children.length > 0
//				&& array_div[i].firstChild.tagName.toLowerCase() == "img")
//			path_pictures += ($(array_div[i].children[0]).attr("src")) + ",";
//	}
	var jcdId = dataObjects_choice[0].jcdid;// 检查单ID
	var huanzhexinxi_id = dataObjects_choice[0].huanzheId;// 患者ID

	var memo = $("#memo").val();
	var yb=$("#yb").html();
	var zhenduan=$("#zhenduan").html();
	var jc_zhenduan=$("#jc_zhenduan").val();
	var chuzhi=$("#chuzhi").val();
	
	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var nurse=$("#nurse option:selected").val();// 护士
	var rep_doc_name = $("#rep_doc option:selected").text();// 申请医生
	var doctor_name = $("#doctor option:selected").text();// 检查医生
	var nurse_name=$("#nurse option:selected").text();// 护士
	if(nurse_name==null||nurse_name==""){
		$.oimsAlert("护士为空");
		return;
	}
	var cli_date = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyeRetcam = {
//		path_pictures : path_pictures,
		jcdId : jcdId,
		huanzhexinxi_id : huanzhexinxi_id,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		memo : memo,
		yb:yb,
		zhenduan:zhenduan,
		jc_zhenduan:jc_zhenduan,
		chuzhi:chuzhi,
		rep_doc : rep_doc,
		doctor : doctor,
		nurse:nurse,
		rep_doc_name : rep_doc_name,// 申请医生姓名
		doctor_name : doctor_name,// 检查医生姓名
		nurse_name : nurse_name,
		cli_date : cli_date,
		tag : Math.random()
	};
	parameter_saveOrUpdateEyeRetcam = JSON.stringify(
			parameter_saveOrUpdateEyeRetcam).replace(new RegExp("\"", "gm"), "'");
	var html_div_reportresult = "<div id='div_reportresult'>"
			+ $("#div_reportresult").html() + "</div>"; // 报告内容
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
			+ "/js/manager/baogao/previewEyeRetcam.js'></script>";
	html_baogao += "<script type='text/javascript'>"
			+ "var parameter_saveOrUpdateEyeRetcam = "
			+ parameter_saveOrUpdateEyeRetcam + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}
