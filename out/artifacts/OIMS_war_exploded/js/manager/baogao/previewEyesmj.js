//三面镜首次加载(整理)
$(function() {
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyesmj != null) {
		if ($("#smj_result").length == 1) {
			var demo = parameter_saveOrUpdateEyesmj.smj_result;
			while(demo.indexOf(" ")!=-1)
				demo = demo.replace(" ","&nbsp;&nbsp;");
			demo = demo.replace(/\r|\n/g,"<br />");
			$("#smj_result").replaceWith($("<span/>").attr("id", "smj_result").html(
						demo));
		}
		//申请医生
		if ($("#rep_doc").length == 1) 
			$("#rep_doc").replaceWith(
					$("<span/>").attr("id", "rep_doc").html(
							parameter_saveOrUpdateEyesmj.rep_doc_name));
	//检查医生
		if ($("#doctor").length == 1) 
			$("#doctor").replaceWith(
					$("<span/>").attr("id", "doctor").html(
							parameter_saveOrUpdateEyesmj.doctor_name));

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
	var url_saveOrUpdateEyesmj = "/publish/Eyesmj/saveOrUpdateEyesmj.htm";// 三面镜检查报告保存或者修改
	$.extend(parameter_saveOrUpdateEyesmj,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyesmj = getJSONData(url_saveOrUpdateEyesmj,
			parameter_saveOrUpdateEyesmj, "post");
	if (data_saveOrUpdateEyesmj.state) {
		$("#div_buttonsytle1").remove();// 操作按钮div
		printBaoGaoLodap("B5 (JIS)");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	} else
		$.oimsError("三面镜检查报告保存失败", function() {

		});
}
// 关闭jsp(整理)
function doClose() {
	window.close();
}