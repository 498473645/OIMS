//特殊视力首次加载(整理)
$(function() {
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyetsli != null) {
		if ($("#tx_ys_ly_l").length == 1)
			$("#tx_ys_ly_l").replaceWith($("<span/>").attr("id","tx_ys_ly_l").html(parameter_saveOrUpdateEyetsli.tx_ys_ly_l));
		if ($("#tx_ys_ly_r").length == 1)
			$("#tx_ys_ly_r").replaceWith($("<span/>").attr("id","tx_ys_ly_r").html(parameter_saveOrUpdateEyetsli.tx_ys_ly_r));
		if ($("#tx_ys_jz_l").length == 1)
			$("#tx_ys_jz_l").replaceWith($("<span/>").attr("id","tx_ys_jz_l").html(parameter_saveOrUpdateEyetsli.tx_ys_jz_l));
		if ($("#tx_ys_jz_r").length == 1)
			$("#tx_ys_jz_r").replaceWith($("<span/>").attr("id","tx_ys_jz_r").html(parameter_saveOrUpdateEyetsli.tx_ys_jz_r));
		if ($("#tx_ys_zk_l").length == 1)
			$("#tx_ys_zk_l").replaceWith($("<span/>").attr("id","tx_ys_zk_l").html(parameter_saveOrUpdateEyetsli.tx_ys_zk_l));
		if ($("#tx_ys_zk_r").length == 1)
			$("#tx_ys_zk_r").replaceWith($("<span/>").attr("id","tx_ys_zk_r").html(parameter_saveOrUpdateEyetsli.tx_ys_zk_r));
		if ($("#tx_js_ly_l").length == 1)
			$("#tx_js_ly_l").replaceWith($("<span/>").attr("id","tx_js_ly_l").html(parameter_saveOrUpdateEyetsli.tx_js_ly_l));
		if ($("#tx_js_ly_r").length == 1)
			$("#tx_js_ly_r").replaceWith($("<span/>").attr("id","tx_js_ly_r").html(parameter_saveOrUpdateEyetsli.tx_js_ly_r));
		if ($("#tx_js_jz_l").length == 1)
			$("#tx_js_jz_l").replaceWith($("<span/>").attr("id","tx_js_jz_l").html(parameter_saveOrUpdateEyetsli.tx_js_jz_l));
		if ($("#tx_js_jz_r").length == 1)
			$("#tx_js_jz_r").replaceWith($("<span/>").attr("id","tx_js_jz_r").html(parameter_saveOrUpdateEyetsli.tx_js_jz_r));
		if ($("#tx_js_zk_l").length == 1)
			$("#tx_js_zk_l").replaceWith($("<span/>").attr("id","tx_js_zk_l").html(parameter_saveOrUpdateEyetsli.tx_js_zk_l));
		if ($("#tx_js_zk_r").length == 1)
			$("#tx_js_zk_r").replaceWith($("<span/>").attr("id","tx_js_zk_r").html(parameter_saveOrUpdateEyetsli.tx_js_zk_r));
		
		if ($("#E_ys_ly_l").length == 1)
			$("#E_ys_ly_l").replaceWith($("<span/>").attr("id","E_ys_ly_l").html(parameter_saveOrUpdateEyetsli.E_ys_ly_l));
		if ($("#E_ys_ly_r").length == 1)
			$("#E_ys_ly_r").replaceWith($("<span/>").attr("id","E_ys_ly_r").html(parameter_saveOrUpdateEyetsli.E_ys_ly_r));
		if ($("#E_ys_jz_l").length == 1)
			$("#E_ys_jz_l").replaceWith($("<span/>").attr("id","E_ys_jz_l").html(parameter_saveOrUpdateEyetsli.E_ys_jz_l));
		if ($("#E_ys_jz_r").length == 1)
			$("#E_ys_jz_r").replaceWith($("<span/>").attr("id","E_ys_jz_r").html(parameter_saveOrUpdateEyetsli.E_ys_jz_r));
		if ($("#E_ys_zk_l").length == 1)
			$("#E_ys_zk_l").replaceWith($("<span/>").attr("id","E_ys_zk_l").html(parameter_saveOrUpdateEyetsli.E_ys_zk_l));
		if ($("#E_ys_zk_r").length == 1)
			$("#E_ys_zk_r").replaceWith($("<span/>").attr("id","E_ys_zk_r").html(parameter_saveOrUpdateEyetsli.E_ys_zk_r));
		if ($("#E_js_ly_l").length == 1)
			$("#E_js_ly_l").replaceWith($("<span/>").attr("id","E_js_ly_l").html(parameter_saveOrUpdateEyetsli.E_js_ly_l));
		if ($("#E_js_ly_r").length == 1)
			$("#E_js_ly_r").replaceWith($("<span/>").attr("id","E_js_ly_r").html(parameter_saveOrUpdateEyetsli.E_js_ly_r));
		if ($("#E_js_jz_l").length == 1)
			$("#E_js_jz_l").replaceWith($("<span/>").attr("id","E_js_jz_l").html(parameter_saveOrUpdateEyetsli.E_js_jz_l));
		if ($("#E_js_jz_r").length == 1)
			$("#E_js_jz_r").replaceWith($("<span/>").attr("id","E_js_jz_r").html(parameter_saveOrUpdateEyetsli.E_js_jz_r));
		if ($("#E_js_zk_l").length == 1)
			$("#E_js_zk_l").replaceWith($("<span/>").attr("id","E_js_zk_l").html(parameter_saveOrUpdateEyetsli.E_js_zk_l));
		if ($("#E_js_zk_r").length == 1)
			$("#E_js_zk_r").replaceWith($("<span/>").attr("id","E_js_zk_r").html(parameter_saveOrUpdateEyetsli.E_js_zk_r));
		
		if ($("#xz_ys_ly_l").length == 1)
			$("#xz_ys_ly_l").replaceWith($("<span/>").attr("id","xz_ys_ly_l").html(parameter_saveOrUpdateEyetsli.xz_ys_ly_l));
		if ($("#xz_ys_ly_r").length == 1)
			$("#xz_ys_ly_r").replaceWith($("<span/>").attr("id","xz_ys_ly_r").html(parameter_saveOrUpdateEyetsli.xz_ys_ly_r));
		if ($("#xz_ys_jz_l").length == 1)
			$("#xz_ys_jz_l").replaceWith($("<span/>").attr("id","xz_ys_jz_l").html(parameter_saveOrUpdateEyetsli.xz_ys_jz_l));
		if ($("#xz_ys_jz_r").length == 1)
			$("#xz_ys_jz_r").replaceWith($("<span/>").attr("id","xz_ys_jz_r").html(parameter_saveOrUpdateEyetsli.xz_ys_jz_r));
		if ($("#xz_ys_zk_l").length == 1)
			$("#xz_ys_zk_l").replaceWith($("<span/>").attr("id","xz_ys_zk_l").html(parameter_saveOrUpdateEyetsli.xz_ys_zk_l));
		if ($("#xz_ys_zk_r").length == 1)
			$("#xz_ys_zk_r").replaceWith($("<span/>").attr("id","xz_ys_zk_r").html(parameter_saveOrUpdateEyetsli.xz_ys_zk_r));
		if ($("#xz_js_ly_l").length == 1)
			$("#xz_js_ly_l").replaceWith($("<span/>").attr("id","xz_js_ly_l").html(parameter_saveOrUpdateEyetsli.xz_js_ly_l));
		if ($("#xz_js_ly_r").length == 1)
			$("#xz_js_ly_r").replaceWith($("<span/>").attr("id","xz_js_ly_r").html(parameter_saveOrUpdateEyetsli.xz_js_ly_r));
		if ($("#xz_js_jz_l").length == 1)
			$("#xz_js_jz_l").replaceWith($("<span/>").attr("id","xz_js_jz_l").html(parameter_saveOrUpdateEyetsli.xz_js_jz_l));
		if ($("#xz_js_jz_r").length == 1)
			$("#xz_js_jz_r").replaceWith($("<span/>").attr("id","xz_js_jz_r").html(parameter_saveOrUpdateEyetsli.xz_js_jz_r));
		if ($("#xz_js_zk_l").length == 1)
			$("#xz_js_zk_l").replaceWith($("<span/>").attr("id","xz_js_zk_l").html(parameter_saveOrUpdateEyetsli.xz_js_zk_l));
		if ($("#xz_js_zk_r").length == 1)
			$("#xz_js_zk_r").replaceWith($("<span/>").attr("id","xz_js_zk_r").html(parameter_saveOrUpdateEyetsli.xz_js_zk_r));
		if ($("#sj_l").length == 1)
			$("#sj_l").replaceWith($("<span/>").attr("id","sj_l").attr("align","left").html(parameter_saveOrUpdateEyetsli.sj_l));
		if ($("#sj_r").length == 1)
			$("#sj_r").replaceWith($("<span/>").attr("id","sj_r").html(parameter_saveOrUpdateEyetsli.sj_r));
		//申请医生
		if ($("#rep_doc").length == 1) 
			$("#rep_doc").replaceWith(
					$("<span/>").attr("id", "rep_doc").html(
							parameter_saveOrUpdateEyetsli.repDoc_name));
		//检查医生
		if ($("#doctor").length == 1) 
			$("#doctor").replaceWith(
					$("<span/>").attr("id", "doctor").html(
							parameter_saveOrUpdateEyetsli.doctor_name));

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
	var url_saveOrUpdateEyetsli = "/publish/Eyetsli/saveOrUpdateEyetsli.htm";// 暗适应检查报告保存或者修改
	$.extend(parameter_saveOrUpdateEyetsli,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyetsli = getJSONData(url_saveOrUpdateEyetsli,
			parameter_saveOrUpdateEyetsli, "post");
	if (data_saveOrUpdateEyetsli.state) {
		$("#div_buttonsytle1").remove();// 操作按钮div
		printBaoGaoLodap("B5 (JIS)");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	} else
		$.oimsError("特殊视力检查报告保存失败", function() {

		});
}
// 关闭jsp(整理)
function doClose() {
	window.close();
}
