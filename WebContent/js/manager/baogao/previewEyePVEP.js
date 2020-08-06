//首次加载(整理)
$(function() {
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyePVEP != null) {
		if ($("#sy_type").length == 1)
			$("#sy_type").replaceWith($("<span/>").attr("id","sy_type").html(
					parameter_saveOrUpdateEyePVEP.sy_type));
		if ($("#checkType").length == 1)
			$("#checkType").replaceWith($("<span/>").attr("id","checkType").html(
					parameter_saveOrUpdateEyePVEP.checkType));
		if ($("#wavePattern_left").length == 1)
			$("#wavePattern_left").replaceWith($("<span/>").attr("id","wavePattern_left").html(
					parameter_saveOrUpdateEyePVEP.wavePatternLeft));
		if ($("#wavePattern_right").length == 1)
			$("#wavePattern_right").replaceWith($("<span/>").attr("id","wavePattern_right").html(
					parameter_saveOrUpdateEyePVEP.wavePatternRight));
		if ($("#rangeValue_1_left").length == 1)
			$("#rangeValue_1_left").replaceWith($("<span/>").attr("id","rangeValue_1_left").html(
					parameter_saveOrUpdateEyePVEP.rangeValue1Left));
		if ($("#rangeValue_1_right").length == 1)
			$("#rangeValue_1_right").replaceWith($("<span/>").attr("id","rangeValue_1_right").html(
					parameter_saveOrUpdateEyePVEP.rangeValue1Right));
		if ($("#peakValue_1_left").length == 1)
			$("#peakValue_1_left").replaceWith($("<span/>").attr("id","peakValue_1_left").html(
					parameter_saveOrUpdateEyePVEP.peakValue1Left));
		if ($("#peakValue_1_right").length == 1)
			$("#peakValue_1_right").replaceWith($("<span/>").attr("id","peakValue_1_right").html(
					parameter_saveOrUpdateEyePVEP.peakValue1Right));
		if ($("#rangeValue_15_left").length == 1)
			$("#rangeValue_15_left").replaceWith($("<span/>").attr("id","rangeValue_15_left").html(
					parameter_saveOrUpdateEyePVEP.rangeValue15Left));
		if ($("#rangeValue_15_right").length == 1)
			$("#rangeValue_15_right").replaceWith($("<span/>").attr("id","rangeValue_15_right").html(
					parameter_saveOrUpdateEyePVEP.rangeValue15Right));
		if ($("#peakValue_15_left").length == 1)
			$("#peakValue_15_left").replaceWith($("<span/>").attr("id","peakValue_15_left").html(
					parameter_saveOrUpdateEyePVEP.peakValue15Left));
		if ($("#peakValue_15_right").length == 1)
			$("#peakValue_15_right").replaceWith($("<span/>").attr("id","peakValue_15_right").html(
					parameter_saveOrUpdateEyePVEP.peakValue15Right));
		if ($("#eye_compare").length == 1){
			var eye_compare = parameter_saveOrUpdateEyePVEP.eyeCompare;
			while(eye_compare.indexOf(" ")!=-1)
				eye_compare = eye_compare.replace(" ","&nbsp;&nbsp;");
			eye_compare = eye_compare.replace(/\r|\n/g,"<br />");
			$("#eye_compare").replaceWith($("<span/>").attr("id","eye_compare").html(eye_compare));
		}
		if ($("#demo").length == 1){
			var demo = parameter_saveOrUpdateEyePVEP.demo;
			while(demo.indexOf(" ")!=-1)
				demo = demo.replace(" ","&nbsp;&nbsp;");
			demo = demo.replace(/\r|\n/g,"<br />");
			$("#demo").replaceWith($("<span/>").attr("id","demo").html(
					demo));
		}
		//申请医生
		if ($("#rep_doc").length == 1)
			$("#rep_doc").replaceWith($("<span/>").attr("id","rep_doc").html(parameter_saveOrUpdateEyePVEP.repDoc_name));
		//检查医生
		if ($("#doctor").length == 1)
			$("#doctor").replaceWith($("<span/>").attr("id","doctor").html(parameter_saveOrUpdateEyePVEP.doctor_name));
		

	}
	//添加条形码
	var barcodeDiv = $("<div/>").attr("class","barcodeDiv").attr("style",
	"height:44px;width:80px;").appendTo($(".barcodeTd"));
	var binglihao = $("#caseNumber").html();
	showBarcode(binglihao,barcodeDiv);
	// 操作按钮div
	var div_buttonsytle1 = $("<div/>").attr("id", "div_buttonsytle1").attr(
			"class", "buttonsytle1").attr("style",
			"width: 640px;margin: 0px auto;");// 操作按钮div
	$(div_buttonsytle1).appendTo("#body_baogao");
	var a_print = "<a href='javascript:doPrintbaogao();' class='btnone' id='a_print'><span class='print'></span>"
			+ "打印" + "</a>";
	$(a_print).appendTo(div_buttonsytle1);
	var a_close = "<a href='javascript:doClose();' class='btnone' id='a_close'><span class='del'></span>"
			+ "关闭" + "</a>";
	$(a_close).appendTo(div_buttonsytle1);
	// 操作按钮div
});
// 打印页面(整理)
function doPrintbaogao() {
	var url_saveOrUpdateEyePVEP = "/publish/EyePVEP/saveOrUpdateEyePVEP.htm";// PVEP检查报告保存或者修改
	$.extend(parameter_saveOrUpdateEyePVEP,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyePVEP = getJSONData(url_saveOrUpdateEyePVEP,
			parameter_saveOrUpdateEyePVEP, "post");
	if (data_saveOrUpdateEyePVEP.state) {
		$("#div_buttonsytle1").remove();// 操作按钮div
		printBaoGaoLodap("B5 (JIS)");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	} else
		$.oimsError("PVEP检查报告保存失败", function() {

		});
}
// 关闭jsp(整理)
function doClose() {
	window.close();
}
//获取申请医生和检查医生姓名
