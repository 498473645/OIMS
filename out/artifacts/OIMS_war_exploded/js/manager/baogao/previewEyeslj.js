//三棱鏡首次加载(整理)
$(function() {
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyeslj != null) {
		if ($("#ly_l_33").length == 1)
			$("#ly_l_33").replaceWith($("<span/>").attr("id","ly_l_33").html(
					parameter_saveOrUpdateEyeslj.ly_l_33));
		if ($("#ly_r_33").length == 1)
			$("#ly_r_33").replaceWith($("<span/>").attr("id","ly_r_33").html(
					parameter_saveOrUpdateEyeslj.ly_r_33));
		if ($("#dj_l_33").length == 1)
			$("#dj_l_33").replaceWith($("<span/>").attr("id","dj_l_33").html(
					parameter_saveOrUpdateEyeslj.dj_l_33));
		if ($("#dj_r_33").length == 1)
			$("#dj_r_33").replaceWith($("<span/>").attr("id","dj_r_33").html(
					parameter_saveOrUpdateEyeslj.dj_r_33));
		if ($("#ly_l_5").length == 1)
			$("#ly_l_5").replaceWith($("<span/>").attr("id","ly_l_5").html(
					parameter_saveOrUpdateEyeslj.ly_l_5));
		if ($("#ly_r_5").length == 1)
			$("#ly_r_5").replaceWith($("<span/>").attr("id","ly_r_5").html(
					parameter_saveOrUpdateEyeslj.ly_r_5));
		if ($("#dj_l_5").length == 1)
			$("#dj_l_5").replaceWith($("<span/>").attr("id","dj_l_5").html(
					parameter_saveOrUpdateEyeslj.dj_l_5));
		if ($("#dj_r_5").length == 1)
			$("#dj_r_5").replaceWith($("<span/>").attr("id","dj_r_5").html(
					parameter_saveOrUpdateEyeslj.dj_r_5));
		//申请医生
		if ($("#rep_doc").length == 1) 
			$("#rep_doc").replaceWith(
					$("<span/>").attr("id", "rep_doc").html(
							parameter_saveOrUpdateEyeslj.repDoc_name));
		//检查医生
		if ($("#doctor").length == 1) 
			$("#doctor").replaceWith(
					$("<span/>").attr("id", "doctor").html(
							parameter_saveOrUpdateEyeslj.doctor_name));

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
	var url_saveOrUpdateEyeslj = "/publish/Eyeslj/saveOrUpdateEyeslj.htm";
	$.extend(parameter_saveOrUpdateEyeslj,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyeslj = getJSONData(url_saveOrUpdateEyeslj,
			parameter_saveOrUpdateEyeslj, "post");
	if (data_saveOrUpdateEyeslj.state) {
		$("#div_buttonsytle1").remove();// 操作按钮div
		printBaoGaoLodap("B5 (JIS)");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	} else
		$.oimsError("三棱镜报告保存失败", function() {

		});
}
// 关闭jsp(整理)
function doClose() {
	window.close();
}
