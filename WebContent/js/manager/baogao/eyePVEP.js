//电生理PVEP参数设置
//检查项目
var date_eyePVEP_sy_type =[{
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
function initData_eyePVEP() {
	// 检查设备
	if ($("#sy_type").length == 1) {
		for (var i = 0; i < date_eyePVEP_sy_type.length; i++)
			$(
					"<option value='" + date_eyePVEP_sy_type[i].value
							+ "'>" + date_eyePVEP_sy_type[i].text
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
	$(".pvepfzClass").click(function(){
		_this = this;
		var position = $(this).position();
		var left = position.left;
		var top = position.top;
		$(".blk_a").hide();
		$(_this).focus();
		$("#blk1").css("display","block").css("left",left).css("top",top+$(this).height()+10);
		
		$("#pvepfz").change(function(){
		var str = $("#pvepfz").val();
		if($(_this).length==1)
		$(_this).val(str);
		$(".blk_a").hide();
		$(_this).focus();
		return false;
	});
	$("#confirm1").bind("click",function(){
		var str = $("#pvepfz").val();
		$(_this).val(str);
		$(".blk_a").hide();
		$(_this).focus();
		});
		$("#close1").bind("click",function(){
			$(".blk_a").hide();
			$(_this).focus();
	});
		});
//峰时
	$(".pvepfsClass").click(function(){
		_this = this;
		var position = $(this).position();
		var left = position.left;
		var top = position.top;
		$(".blk_a").hide();
		$(_this).focus();
		$("#blk2").css("display","block").css("left",left).css("top",top+$(this).height()+10);
		
		$("#pvepfs").change(function(){
		var str = $("#pvepfs").val();
		if($(_this).length==1)
		$(_this).val(str);
		$(".blk_a").hide();
		$(_this).focus();
		return false;
	});
	$("#confirm2").bind("click",function(){
		var str = $("#pvepfs").val();
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
	//根PVEP报告对象查询符合条件的PVEP报告对象
	var url_selectEyePVEPByEyePVEP = "/publish/EyePVEP/selectEyePVEPByEyePVEP.htm";
	var data_selectEyePVEPByEyePVEP = getJSONData(
			url_selectEyePVEPByEyePVEP, {
				jcdId : dataObjects_choice[0].jcdid,
				tag : Math.random()
			}, "post");
	if (data_selectEyePVEPByEyePVEP.state) {
		var eyePVEP = data_selectEyePVEPByEyePVEP.obj;
//		console.log(eyePVEP);
		if (eyePVEP != null) {
			if ($("#sy_type").length == 1)
				$("#sy_type").val(eyePVEP.sy_type);//检查设备
			if ($("#checkType").length == 1)
				$("#checkType").val(eyePVEP.checkType);//检查设备
			if ($("#wavePattern_left").length == 1)
				$("#wavePattern_left").val(eyePVEP.wavePatternLeft);//波形稳定性 
			if ($("#wavePattern_right").length == 1)
				$("#wavePattern_right").val(eyePVEP.wavePatternRight);
			
			if ($("#rangeValue_1_left").length == 1)
				$("#rangeValue_1_left").val(eyePVEP.rangeValue1Left);//1°时P100幅值
			if ($("#rangeValue_1_right").length == 1)
				$("#rangeValue_1_right").val(eyePVEP.rangeValue1Right);
			
			if ($("#peakValue_1_left").length == 1)
				$("#peakValue_1_left").val(eyePVEP.peakValue1Left);//1°时P100峰时
			if ($("#peakValue_1_right").length == 1)
				$("#peakValue_1_right").val(eyePVEP.peakValue1Right);
			
			if ($("#rangeValue_15_left").length == 1)
				$("#rangeValue_15_left").val(eyePVEP.rangeValue15Left);//15′时P100幅值
			if ($("#rangeValue_15_right").length == 1)
				$("#rangeValue_15_right").val(eyePVEP.rangeValue15Right);
			
			if ($("#peakValue_15_left").length == 1)
				$("#peakValue_15_left").val(eyePVEP.peakValue15Left);//15′时P100峰时
			if ($("#peakValue_15_right").length == 1)
				$("#peakValue_15_right").val(eyePVEP.peakValue15Right);
			
			if ($("#eye_compare").length == 1)
				$("#eye_compare").val(eyePVEP.eyeCompare);// 双眼比较
			if ($("#demo").length == 1)
				$("#demo").val(eyePVEP.demo);// 备注
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyePVEP.cliDate);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyePVEP.repDoc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyePVEP.doctor);// 检查医生
			if (data_outBaogaoHelp.obj.reportDate != eyePVEP.cliDate) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyePVEP);
			}
		}
	}
}

// PVEP检查报告保存
function saveOrUpdateEyePVEP() {
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
	var sy_type = $("#sy_type").val();//  检查设备
	var checkType = $("#checkType").val();//  检查设备
	var wavePatternLeft = $("#wavePattern_left").val();//  波形稳定性
	var wavePatternRight = $("#wavePattern_right").val();
	var rangeValue1Left = $("#rangeValue_1_left").val();// 1°时P100幅值
	var rangeValue1Right = $("#rangeValue_1_right").val();
	var peakValue1Left = $("#peakValue_1_left").val();//   1°时P100峰时
	var peakValue1Right = $("#peakValue_1_right").val();
	var rangeValue15Left = $("#rangeValue_15_left").val();//  15′时P100幅值
	var rangeValue15Right = $("#rangeValue_15_right").val();// 
	var peakValue15Left = $("#peakValue_15_left").val();//  15′时P100峰时
	var peakValue15Right = $("#peakValue_15_right").val();// 
	var eyeCompare = $("#eye_compare").val();// 双眼比较
	var demo = $("#demo").val();// 备注
	var repDoc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var cliDate = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyePVEP = {
		jcdId : jcdId,// 检查单ID
		sy_type : sy_type,// 检查设备
		checkType : checkType,// 检查设备
		wavePatternLeft : wavePatternLeft,// 波形稳定性
		wavePatternRight : wavePatternRight,
		rangeValue1Left : rangeValue1Left,// 1°时P100幅值
		rangeValue1Right : rangeValue1Right,
		peakValue1Left : peakValue1Left,//1°时P100峰时
		peakValue1Right : peakValue1Right,
		rangeValue15Left : rangeValue15Left,// 15′时P100幅值
		rangeValue15Right : rangeValue15Right,
		peakValue15Left : peakValue15Left,// 15′时P100峰时
		peakValue15Right : peakValue15Right,
		eyeCompare : eyeCompare,// 双眼比较
		demo : demo,// 备注
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		repDoc : repDoc,// 申请医生
		doctor : doctor,// 检查医生
		cliDate : cliDate,// 报告日期
		tag : Math.random()
	};
	var url_saveOrUpdateEyePVEP = "/publish/EyePVEP/saveOrUpdateEyePVEP.htm";// PVEP检查报告保存
	var data_saveOrUpdateEyePVEP = getJSONData(url_saveOrUpdateEyePVEP,
			parameter_saveOrUpdateEyePVEP, "post");
	if (data_saveOrUpdateEyePVEP.state)
		$.oimsSucc("PVEP检查报告保存成功", function() {

		});
	else
		$.oimsError("PVEP检查报告保存失败", function() {

		});
}

// PVEP检查报告打印预览
function previewEyePVEP() {
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
	
	var sy_type = $("#sy_type").val();//  检查设备
	var checkType = $("#checkType").val();//  检查设备
	var wavePatternLeft = $("#wavePattern_left").val();//  波形稳定性
	var wavePatternRight = $("#wavePattern_right").val();
	var rangeValue1Left = $("#rangeValue_1_left").val();// 1°时P100幅值
	var rangeValue1Right = $("#rangeValue_1_right").val();
	var peakValue1Left = $("#peakValue_1_left").val();//   1°时P100峰时
	var peakValue1Right = $("#peakValue_1_right").val();
	var rangeValue15Left = $("#rangeValue_15_left").val();//  15′时P100幅值
	var rangeValue15Right = $("#rangeValue_15_right").val();// 
	var peakValue15Left = $("#peakValue_15_left").val();//  15′时P100峰时
	var peakValue15Right = $("#peakValue_15_right").val();// 
	var eyeCompare = $("#eye_compare").val();// 双眼比较
	var demo = $("#demo").val();// 备注
	var repDoc = $("#rep_doc option:selected").val();// 申请医生
	var repDoc_name = $("#rep_doc option:selected").text();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var doctor_name = $("#doctor option:selected").text();// 检查医生
	var cliDate = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyePVEP = {
		jcdId : jcdId,// 检查单ID
		sy_type : sy_type,// 检查设备
		checkType : checkType,// 检查设备
		wavePatternLeft : wavePatternLeft,// 波形稳定性
		wavePatternRight : wavePatternRight,
		rangeValue1Left : rangeValue1Left,// 1°时P100幅值
		rangeValue1Right : rangeValue1Right,
		peakValue1Left : peakValue1Left,//1°时P100峰时
		peakValue1Right : peakValue1Right,
		rangeValue15Left : rangeValue15Left,// 15′时P100幅值
		rangeValue15Right : rangeValue15Right,
		peakValue15Left : peakValue15Left,// 15′时P100峰时
		peakValue15Right : peakValue15Right,
		eyeCompare : eyeCompare,// 双眼比较
		demo :demo,//备注
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		repDoc : repDoc,// 申请医生
		doctor : doctor,// 检查医生
		repDoc_name : repDoc_name,// 申请医生
		doctor_name : doctor_name,// 检查医生
		cliDate : cliDate,// 报告日期
		tag : Math.random()
	};
	parameter_saveOrUpdateEyePVEP = JSON.stringify(
			parameter_saveOrUpdateEyePVEP)
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
			+ "/js/manager/baogao/previewEyePVEP.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyePVEP="
			+ parameter_saveOrUpdateEyePVEP + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}
