//视野检查
$(function() {
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyegcsy != null) {
		if ($("#sy_no").length == 1) {
			$("#sy_no").replaceWith(
					$("<span/>").attr("id", "sy_no").html(
							parameter_saveOrUpdateEyegcsy.syNo));
		}
		if ($("#yanbie").length == 1) {
			$("#yanbie").replaceWith(
					$("<span/>").attr("id", "yanbie").html(
							parameter_saveOrUpdateEyegcsy.yb));
		}
		if ($("#sy_type").length == 1) {
			$("#sy_type").replaceWith(
					$("<span/>").attr("id", "sy_type").html(
							parameter_saveOrUpdateEyegcsy.syType));
		}
		if ($("#sy_prog1").length == 1) {
			$("#sy_prog1").replaceWith(
					$("<span/>").attr("id", "sy_prog1").html(
							parameter_saveOrUpdateEyegcsy.syProg1));
		}
		if ($("#sy_prog2").length == 1) {
			$("#sy_prog2").replaceWith(
					$("<span/>").attr("id", "sy_prog2").html(
							parameter_saveOrUpdateEyegcsy.syProg2));
		}
		if ($("#rep_doc").length == 1) {
			$("#rep_doc").replaceWith(
					$("<span/>").attr("id", "rep_doc").html(
							parameter_saveOrUpdateEyegcsy.rep_doc_name));
		}
		if ($("#doctor").length == 1) {
			$("#doctor").replaceWith(
					$("<span/>").attr("id", "doctor").html(
							parameter_saveOrUpdateEyegcsy.doctor_name));
		}
		var result = parameter_saveOrUpdateEyegcsy.result;
		while(result.indexOf(" ")!=-1)
			result = result.replace(" ","&nbsp;&nbsp;");
		result = result.replace(/\r|\n/g,"<br />");
		if ($("#result").length == 1) {
			$("#result").replaceWith(
					$("<span/>").attr("id", "result").html(
							result));
		}
		var demo = parameter_saveOrUpdateEyegcsy.demo;
		while(demo.indexOf(" ")!=-1)
			demo = demo.replace(" ","&nbsp;&nbsp;");
		demo = demo.replace(/\r|\n/g,"<br />");
		if ($("#demo").length == 1) {
			$("#demo").replaceWith(
					$("<span/>").attr("id", "demo").html(
							demo));
		}
	}
	//添加条形码
	var barcodeDiv = $("<div/>").attr("class","barcodeDiv").attr("style",
	"height:44px;width:80px;").appendTo($(".barcodeTd"));
	var binglihao = $("#caseNumber").html();
	showBarcode(binglihao,barcodeDiv);
	utilTool().fdisabled($("#div_reportresult"));// 全部只读
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
	var url_saveOrUpdateEyegcsy = "/publish/Eyegcsy/saveOrUpdateEyegcsy.htm";
	$.extend(parameter_saveOrUpdateEyegcsy,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyegcsy = getJSONData(url_saveOrUpdateEyegcsy,
			parameter_saveOrUpdateEyegcsy, "post");
	if (data_saveOrUpdateEyegcsy.state) {
		$("#div_buttonsytle1").remove();// 操作按钮div
		printBaoGaoLodap("B5 (JIS)");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	} else
		$.oimsError("视野检查报告保存失败", function() {

		});
}
// 关闭jsp(整理)
function doClose() {
	window.close();
}
