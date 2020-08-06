$(function() {
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyePERG != null) {
		if ($("#sy_type").length == 1) {
			$("#sy_type").replaceWith(
					$("<span/>").attr("id", "sy_type").html(
							parameter_saveOrUpdateEyePERG.sy_type));
		}
		if ($("#checkType").length == 1) {
			$("#checkType").replaceWith(
					$("<span/>").attr("id", "checkType").html(
							parameter_saveOrUpdateEyePERG.checkType));
		}
		if ($("#wavePattern_left").length == 1) {
			$("#wavePattern_left").replaceWith(
					$("<span/>").attr("id", "wavePattern_left").html(
							parameter_saveOrUpdateEyePERG.wavePatternLeft));
		}
		if ($("#wavePattern_right").length == 1) {
			$("#wavePattern_right").replaceWith(
					$("<span/>").attr("id", "wavePattern_right").html(
							parameter_saveOrUpdateEyePERG.wavePatternRight));
		}
		if ($("#p50_rangeValue_left").length == 1) {
			$("#p50_rangeValue_left").replaceWith(
					$("<span/>").attr("id", "p50_rangeValue_left").html(
							parameter_saveOrUpdateEyePERG.p50RangeValueLeft));
		}
		if ($("#p50_rangeValue_right").length == 1) {
			$("#p50_rangeValue_right").replaceWith(
					$("<span/>").attr("id", "p50_rangeValue_right").html(
							parameter_saveOrUpdateEyePERG.p50RangeValueRight));
		}
		if ($("#n95_rangeValue_left").length == 1) {
			$("#n95_rangeValue_left").replaceWith(
					$("<span/>").attr("id", "n95_rangeValue_left").html(
							parameter_saveOrUpdateEyePERG.n95RangeValueLeft));
		}
		if ($("#n95_rangeValue_right").length == 1) {
			$("#n95_rangeValue_right").replaceWith(
					$("<span/>").attr("id", "n95_rangeValue_right").html(
							parameter_saveOrUpdateEyePERG.n95RangeValueRight));
		}
		if ($("#n95_p50_ratio_left").length == 1) {
			$("#n95_p50_ratio_left").replaceWith(
					$("<span/>").attr("id", "n95_p50_ratio_left").html(
							parameter_saveOrUpdateEyePERG.n95p50RatioLeft));
		}
		if ($("#n95_p50_ratio_right").length == 1) {
			$("#n95_p50_ratio_right").replaceWith(
					$("<span/>").attr("id", "n95_p50_ratio_right").html(
							parameter_saveOrUpdateEyePERG.n95p50RatioRight));
		}
		if ($("#eye_compare").length == 1) {
			var eye_compare = parameter_saveOrUpdateEyePERG.eyeCompare;
			eye_compare = eye_compare.replace(/\r|\n/g,"<br />");
			while(eye_compare.indexOf(" ")!=-1)
				eye_compare = eye_compare.replace(" ","&nbsp;&nbsp;");
			$("#eye_compare").replaceWith(
					$("<span/>").attr("id", "eye_compare").html(eye_compare));
		}
		if ($("#rep_doc").length == 1) {
			$("#rep_doc").replaceWith(
					$("<span/>").attr("id", "rep_doc").html(
							parameter_saveOrUpdateEyePERG.rep_doc_name));
		}
		if ($("#doctor").length == 1) {
			$("#doctor").replaceWith(
					$("<span/>").attr("id", "doctor").html(
							parameter_saveOrUpdateEyePERG.doctor_name));
		}
		if ($("#demo").length == 1) {
			var demo = parameter_saveOrUpdateEyePERG.demo;
			demo = demo.replace(/\r|\n/g,"<br />");
			while(demo.indexOf(" ")!=-1)
				demo = demo.replace(" ","&nbsp;&nbsp;");
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
			+ "print" + "</a>";
	$(a_print).appendTo(div_buttonsytle1);
	var a_close = "<a href='javascript:doClose();' class='btnone' id='a_close'><span class='del'></span>"+ '关闭' + "</a>";
	
	$(a_close).appendTo(div_buttonsytle1);
	// 操作按钮div
	/*显示审核医生*/
	var _p = $("#_tr_shqm").position() ;
	var _d = $("#_tr_shqm").find('div') ;
	if(_d.length==1){
		$("#_tr_shqm").find('div').show() ;
		debugger;
		$("#_tr_shqm").find('div').css('top',_p.top-25) ;
	}
});

// 打印页面(整理)
function doPrintbaogao() {
	var url_saveOrUpdateEyePERG = "/publish/EyePERG/saveOrUpdateEyePERG.htm";
	$.extend(parameter_saveOrUpdateEyePERG,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyePERG = getJSONData(url_saveOrUpdateEyePERG,
			parameter_saveOrUpdateEyePERG, "post");
	if (data_saveOrUpdateEyePERG.state) {
		$("#div_buttonsytle1").remove();// 操作按钮div
		printBaoGaoLodap("B5 (JIS)");
		window.close();
	} else
		$.oimsError("电生理PERG保存失败", function() {

		});
}
// 关闭jsp(整理)
function doClose() {
	window.close();
}
