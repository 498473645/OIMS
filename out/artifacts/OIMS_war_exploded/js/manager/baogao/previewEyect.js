//首次加载(整理)
$(function() {
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyect != null) {
		if ($("#check_type").length == 1)
			$("#check_type").replaceWith($("<span/>").attr("id","check_type").html(parameter_saveOrUpdateEyect.check_type));
		if ($("#k1_r").length == 1)
			$("#k1_r").replaceWith($("<span/>").attr("id","k1_r").html(parameter_saveOrUpdateEyect.r_k1));
		if ($("#k2_r").length == 1)
			$("#k2_r").replaceWith($("<span/>").attr("id","k2_r").html(parameter_saveOrUpdateEyect.r_k2));
		if ($("#l_r").length == 1)
			$("#l_r").replaceWith($("<span/>").attr("id","l_r").html(parameter_saveOrUpdateEyect.r_l));
		if ($("#iol_r").length == 1)
			$("#iol_r").replaceWith($("<span/>").attr("id","iol_r").html(parameter_saveOrUpdateEyect.r_iol));
		if ($("#k1_l").length == 1)
			$("#k1_l").replaceWith($("<span/>").attr("id","k1_l").html(parameter_saveOrUpdateEyect.l_k1));
		if ($("#k2_l").length == 1)
			$("#k2_l").replaceWith($("<span/>").attr("id","k2_l").html(parameter_saveOrUpdateEyect.l_k2));
		if ($("#l_l").length == 1)
			$("#l_l").replaceWith($("<span/>").attr("id","l_l").html(parameter_saveOrUpdateEyect.l_l));
		if ($("#iol_l").length == 1)
			$("#iol_l").replaceWith($("<span/>").attr("id","iol_l").html(parameter_saveOrUpdateEyect.l_iol));
		var val = parameter_saveOrUpdateEyect.demo;
		while(val.indexOf(" ")!=-1)
			val = val.replace(" ","&nbsp;&nbsp;");
		val = val.replace(/\r|\n/g,"<br />");
		if ($("#demo").length == 1)
			$("#demo").replaceWith($("<span/>").attr("id","demo").html(val));
		//申请医生
		if ($("#rep_doc").length == 1)
			$("#rep_doc").replaceWith($("<span/>").attr("id","rep_doc").html(parameter_saveOrUpdateEyect.rep_doc_name));
		//检查医生
		if ($("#doctor").length == 1)
			$("#doctor").replaceWith($("<span/>").attr("id","doctor").html(parameter_saveOrUpdateEyect.doctor_name));
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
	var url_saveOrUpdateEyect = "/publish/Eyect/saveOrUpdateEyect.htm";
	$.extend(parameter_saveOrUpdateEyect,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyect = getJSONData(url_saveOrUpdateEyect,
			parameter_saveOrUpdateEyect, "post");
	if (data_saveOrUpdateEyect.state) {
		$("#div_buttonsytle1").remove();// 操作按钮div
		window.opener.document.getElementById("isprintsuc").value="1";
		printBaoGaoLodap("B5 (JIS)");
		window.close();
	} else
		$.oimsError("报告保存失败", function() {

		});
}
// 关闭jsp(整理)
function doClose() {
	window.close();
}