//首次加载(整理)
$(function() {
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyezsxz != null) {
		if ($("#zsxz_r").length == 1){
			var val = parameter_saveOrUpdateEyezsxz.zsxz_r;
			while(val.indexOf(" ")!=-1)
				val = val.replace(" ","&nbsp;&nbsp;");
			val = val.replace(/\r|\n/g,"<br />");
			$("#zsxz_r").replaceWith($("<span/>").attr("id","zsxz_r").html(val));
		}
		if ($("#zsxz_l").length == 1){
			var val = parameter_saveOrUpdateEyezsxz.zsxz_l;
			while(val.indexOf(" ")!=-1)
				val = val.replace(" ","&nbsp;&nbsp;");
			val = val.replace(/\r|\n/g,"<br />");
			$("#zsxz_l").replaceWith($("<span/>").attr("id","zsxz_l").html(val));
		}
		if ($("#memo").length == 1){
			var val = parameter_saveOrUpdateEyezsxz.memo;
			while(val.indexOf(" ")!=-1)
				val = val.replace(" ","&nbsp;&nbsp;");
			val = val.replace(/\r|\n/g,"<br />");
			$("#memo").replaceWith($("<span/>").attr("id","memo").html(val));
		}
		//申请医生
		if ($("#rep_doc").length == 1) 
			$("#rep_doc").replaceWith(
					$("<span/>").attr("id", "rep_doc").html(
							parameter_saveOrUpdateEyezsxz.rep_doc_name));
		//检查医生
		if ($("#doctor").length == 1) 
			$("#doctor").replaceWith(
					$("<span/>").attr("id", "doctor").html(
							parameter_saveOrUpdateEyezsxz.doctor_name));
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
	var url_saveOrUpdateEyezsxz = "/publish/Eyezsxz/saveOrUpdateEyezsxz.htm";// 暗适应检查报告保存或者修改
	$.extend(parameter_saveOrUpdateEyezsxz,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyezsxz = getJSONData(url_saveOrUpdateEyezsxz,
			parameter_saveOrUpdateEyezsxz, "post");
	if (data_saveOrUpdateEyezsxz.state) {
		$("#div_buttonsytle1").remove();// 操作按钮div
		printBaoGaoLodap("B5 (JIS)");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	} else
		$.oimsError("报告保存失败", function() {

		});
}
// 关闭jsp(整理)
function doClose() {
	window.close();
}
