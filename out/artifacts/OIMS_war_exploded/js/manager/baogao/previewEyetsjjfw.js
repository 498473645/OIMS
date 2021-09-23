//九方位斜视角报告首次加载(整理)
$(function() {
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyetsjjfw != null) {
		if ($("#danwei").length == 1)//
			$("#danwei").replaceWith($("<label/>").attr("id","danwei").html(
					parameter_saveOrUpdateEyetsjjfw.danwei));
		if ($("#seq_1").length == 1)//
			$("#seq_1").replaceWith($("<span/>").attr("id","seq_1").html(
					parameter_saveOrUpdateEyetsjjfw.seq_1));
		$("#seq_1").parent().attr("style","border:1px solid;height:40px;width:33%;font-size:14px;text-align:center;");
		if ($("#seq_2").length == 1)//
			$("#seq_2").replaceWith($("<span/>").attr("id","seq_2").html(
					parameter_saveOrUpdateEyetsjjfw.seq_2));
		$("#seq_2").parent().attr("style","border:1px solid;height:40px;width:33%;font-size:14px;text-align:center;");
		if ($("#seq_3").length == 1)//
			$("#seq_3").replaceWith($("<span/>").attr("id","seq_3").html(
					parameter_saveOrUpdateEyetsjjfw.seq_3));
		$("#seq_3").parent().attr("style","border:1px solid;height:40px;width:33%;font-size:14px;text-align:center;");
		if ($("#seq_4").length == 1)//
			$("#seq_4").replaceWith($("<span/>").attr("id","seq_4").html(
					parameter_saveOrUpdateEyetsjjfw.seq_4));
		$("#seq_4").parent().attr("style","border:1px solid;height:40px;width:33%;font-size:14px;text-align:center;");
		if ($("#seq_5").length == 1)//
			$("#seq_5").replaceWith($("<span/>").attr("id","seq_5").html(
					parameter_saveOrUpdateEyetsjjfw.seq_5));
		$("#seq_5").parent().attr("style","border:1px solid;height:40px;width:33%;font-size:14px;text-align:center;");
		if ($("#seq_6").length == 1)//
			$("#seq_6").replaceWith($("<span/>").attr("id","seq_6").html(
					parameter_saveOrUpdateEyetsjjfw.seq_6));
		$("#seq_6").parent().attr("style","border:1px solid;height:40px;width:33%;font-size:14px;text-align:center;");
		if ($("#seq_7").length == 1)//
			$("#seq_7").replaceWith($("<span/>").attr("id","seq_7").html(
					parameter_saveOrUpdateEyetsjjfw.seq_7));
		$("#seq_7").parent().attr("style","border:1px solid;height:40px;width:33%;font-size:14px;text-align:center;");
		if ($("#seq_8").length == 1)//
			$("#seq_8").replaceWith($("<span/>").attr("id","seq_8").html(
					parameter_saveOrUpdateEyetsjjfw.seq_8));
		$("#seq_8").parent().attr("style","border:1px solid;height:40px;width:33%;font-size:14px;text-align:center;");
		if ($("#seq_9").length == 1)//
			$("#seq_9").replaceWith($("<span/>").attr("id","seq_9").html(
					parameter_saveOrUpdateEyetsjjfw.seq_9));
		$("#seq_9").parent().attr("style","border:1px solid;height:40px;width:33%;font-size:14px;text-align:center;");

		if ($("#memo").length == 1){
			var val = parameter_saveOrUpdateEyetsjjfw.memo;
			val = val.replace(/\r|\n/g,"<br />");
			while(val.indexOf(" ")!=-1)
				val = val.replace(" ","&nbsp;&nbsp;");			
			$("#memo").replaceWith(
					$("<span/>").attr("id", "memo").html(val));
		} 
		//申请医生
		if ($("#rep_doc").length == 1) 
			$("#rep_doc").replaceWith(
					$("<span/>").attr("id", "rep_doc").html(
							parameter_saveOrUpdateEyetsjjfw.rep_doc_name));
		//检查医生
		if ($("#doctor").length == 1) 
			$("#doctor").replaceWith(
					$("<span/>").attr("id", "doctor").html(
							parameter_saveOrUpdateEyetsjjfw.doctor_name));

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
	var url_saveOrUpdateEyetsjjfw = "/publish/Eyetsjjfw/saveOrUpdateEyetsjjfw.htm";
	$.extend(parameter_saveOrUpdateEyetsjjfw,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyetsjjfw = getJSONData(url_saveOrUpdateEyetsjjfw,
			parameter_saveOrUpdateEyetsjjfw, "post");
	if (data_saveOrUpdateEyetsjjfw.state) {
		$("#div_buttonsytle1").remove();// 操作按钮div
		printBaoGaoLodap("B5 (JIS)");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	} else
		$.oimsError("九方位斜视角报告保存失败", function() {

		});
}
// 关闭jsp(整理)
function doClose() {
	window.close();
}