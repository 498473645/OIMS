//UBM检查报告首次加载(整理)
$(function() {
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyeubm != null) {

		if ($("#memo").length == 1) {
			var memo = parameter_saveOrUpdateEyeubm.memo;
			while(memo.indexOf(" ")!=-1)
				memo = memo.replace(" ","&nbsp;&nbsp;");
			memo = memo.replace(/\r|\n/g,"<br />");			
			$("#memo").replaceWith(
					$("<span/>").attr("id", "memo").html(
							memo));
		}
		if ($("#ubm_no").length == 1) 
			$("#ubm_no").replaceWith(
					$("<span/>").attr("id", "ubm_no").html(
							parameter_saveOrUpdateEyeubm.ubm_no));
		//申请医生
		if ($("#rep_doc").length == 1) 
			$("#rep_doc").replaceWith(
					$("<span/>").attr("id", "rep_doc").html(
							parameter_saveOrUpdateEyeubm.rep_doc_name));
	//检查医生
		if ($("#doctor").length == 1) 
			$("#doctor").replaceWith(
					$("<span/>").attr("id", "doctor").html(
							parameter_saveOrUpdateEyeubm.doctor_name));
//		var operateDiv = $(".operateDiv");
//		var array_div = $(operateDiv)[0].children;
//		for ( var i = 0; i < array_div.length; i++)
//			$(array_div[i]).css("border", "1px solid black");

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
	var url_saveOrUpdateEyeubm = "/publish/Eyeubm/saveOrUpdateEyeubm.htm";
	$.extend(parameter_saveOrUpdateEyeubm,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyeubm = getJSONData(url_saveOrUpdateEyeubm,
			parameter_saveOrUpdateEyeubm, "post");
	if (data_saveOrUpdateEyeubm.state) {
		$("#div_buttonsytle1").remove();// 操作按钮div
		printBaoGaoLodap("B5 (JIS)");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	} else
		$.oimsError("UBM报告保存失败", function() {

		});
}
// 关闭jsp(整理)
function doClose() {
	window.close();
}