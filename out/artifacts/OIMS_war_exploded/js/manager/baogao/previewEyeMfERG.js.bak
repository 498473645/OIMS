$(function() {
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyeMfERG != null) {
		if ($("#sy_type").length == 1) {
			$("#sy_type").replaceWith(
					$("<span/>").attr("id", "sy_type").html(
							parameter_saveOrUpdateEyeMfERG.sy_type));
		}
		if ($("#checkType").length == 1) {
			$("#checkType").replaceWith(
					$("<span/>").attr("id", "checkType").html(
							parameter_saveOrUpdateEyeMfERG.checkType));
		}
		if ($("#wavePattern_left").length == 1) {
			$("#wavePattern_left").replaceWith(
					$("<span/>").attr("id", "wavePattern_left").html(
							parameter_saveOrUpdateEyeMfERG.wavePatternLeft));
		}
		if ($("#wavePattern_right").length == 1) {
			$("#wavePattern_right").replaceWith(
					$("<span/>").attr("id", "wavePattern_right").html(
							parameter_saveOrUpdateEyeMfERG.wavePatternRight));
		}
		if ($("#swingDensity_left").length == 1) {
			$("#swingDensity_left").replaceWith(
					$("<span/>").attr("id", "swingDensity_left").html(
							parameter_saveOrUpdateEyeMfERG.swingDensityLeft));
		}
		if ($("#swingDensity_right").length == 1) {
			$("#swingDensity_right").replaceWith(
					$("<span/>").attr("id", "swingDensity_right").html(
							parameter_saveOrUpdateEyeMfERG.swingDensityRight));
		}
		if ($("#centerToEdge_left").length == 1) {
			$("#centerToEdge_left").replaceWith(
					$("<span/>").attr("id", "centerToEdge_left").html(
							parameter_saveOrUpdateEyeMfERG.centerToEdgeLeft));
		}
		if ($("#centerToEdge_right").length == 1) {
			$("#centerToEdge_right").replaceWith(
					$("<span/>").attr("id", "centerToEdge_right").html(
							parameter_saveOrUpdateEyeMfERG.centerToEdgeRight));
		}
		if ($("#eye_compare").length == 1) {
			var eye_compare = parameter_saveOrUpdateEyeMfERG.eyeCompare;
			while(eye_compare.indexOf(" ")!=-1)
				eye_compare = eye_compare.replace(" ","&nbsp;&nbsp;");
			eye_compare = eye_compare.replace(/\r|\n/g,"<br />");
			$("#eye_compare").replaceWith(
					$("<span/>").attr("id", "eye_compare").html(eye_compare));
		}
		if ($("#rep_doc").length == 1) {
			$("#rep_doc").replaceWith(
					$("<span/>").attr("id", "rep_doc").html(
							parameter_saveOrUpdateEyeMfERG.rep_doc_name));
		}
		if ($("#doctor").length == 1) {
			$("#doctor").replaceWith(
					$("<span/>").attr("id", "doctor").html(
							parameter_saveOrUpdateEyeMfERG.doctor_name));
		}
		if ($("#checkType").length == 1) {
			$("#checkType").replaceWith(
					$("<span/>").attr("id", "checkType").html(
							parameter_saveOrUpdateEyeMfERG.checkType));
		}
		if ($("#demo").length == 1) {
			var demo = parameter_saveOrUpdateEyeMfERG.demo;
			while(demo.indexOf(" ")!=-1)
				demo = demo.replace(" ","&nbsp;&nbsp;");
			demo = demo.replace(/\r|\n/g,"<br />");
			$("#demo").replaceWith(
					$("<span/>").attr("id", "demo").html(demo));
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
	var url_saveOrUpdateEyeMfERG = "/publish/EyeMfERG/saveOrUpdateEyeMfERG.htm";
	$.extend(parameter_saveOrUpdateEyeMfERG,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyeMfERG = getJSONData(url_saveOrUpdateEyeMfERG,
			parameter_saveOrUpdateEyeMfERG, "post");
	if (data_saveOrUpdateEyeMfERG.state) {
		$("#div_buttonsytle1").remove();// 操作按钮div
		printBaoGaoLodap("B5 (JIS)");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	} else
		$.oimsError("电生理Mf-ERG保存失败", function() {

		});
}
// 关闭jsp(整理)
function doClose() {
	window.close();
}
