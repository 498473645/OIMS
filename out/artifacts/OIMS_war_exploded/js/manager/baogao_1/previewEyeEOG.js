//首次加载(整理)
$(function() {
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyeEOG != null) {
		if ($("#sy_type").length == 1) {
			$("#sy_type").replaceWith(
					$("<span/>").attr("id", "sy_type").html(
							parameter_saveOrUpdateEyeEOG.sy_type));
		}
		if ($("#ardenRatio_left").length == 1) {
			$("#ardenRatio_left").replaceWith(
					$("<span/>").attr("id", "ardenRatio_left").html(
							parameter_saveOrUpdateEyeEOG.ardenRatioLeft));
		}
		if ($("#ardenRratio_right").length == 1) {
			$("#ardenRratio_right").replaceWith(
					$("<span/>").attr("id", "ardenRratio_right").html(
							parameter_saveOrUpdateEyeEOG.ardenRatioRight));
		}
		if ($("#reduceLevel_left").length == 1) {
			$("#reduceLevel_left").replaceWith(
					$("<span/>").attr("id", "reduceLevel_left").html(
							parameter_saveOrUpdateEyeEOG.reduceLevelLeft));
		}
		if ($("#reduceLevel_right").length == 1) {
			$("#reduceLevel_right").replaceWith(
					$("<span/>").attr("id", "reduceLevel_right").html(
							parameter_saveOrUpdateEyeEOG.reduceLevelRight));
		}
		if ($("#eye_compare").length == 1) {
			var eye_compare = parameter_saveOrUpdateEyeEOG.eyeCompare;
			while(eye_compare.indexOf(" ")!=-1)
				eye_compare = eye_compare.replace(" ","&nbsp;&nbsp;");
			eye_compare = eye_compare.replace(/\r|\n/g,"<br />");
			$("#eye_compare").replaceWith(
					$("<span/>").attr("id", "eye_compare").html(eye_compare));
		}
		if ($("#demo").length == 1) {
			var val = parameter_saveOrUpdateEyeEOG.demo;
			while(val.indexOf(" ")!=-1)
				val = val.replace(" ","&nbsp;&nbsp;");
			val = val.replace(/\r|\n/g,"<br />");
			$("#demo").replaceWith(
					$("<span/>").attr("id", "demo").html(val));
		}
		
		if ($("#rep_doc").length == 1) {
			$("#rep_doc").replaceWith(
					$("<span/>").attr("id", "rep_doc").html(
							parameter_saveOrUpdateEyeEOG.rep_doc_name));
		}
		if ($("#doctor").length == 1) {
			$("#doctor").replaceWith(
					$("<span/>").attr("id", "doctor").html(
							parameter_saveOrUpdateEyeEOG.doctor_name));
		}
	}
	//添加条形码
	var barcodeDiv = $("<div/>").attr("class","barcodeDiv").attr("style",
	"height:44px;width:80px;").appendTo($(".barcodeTd"));
	var binglihao = $("#caseNumber").html();
	showBarcode(binglihao,barcodeDiv);
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
	/*显示审核医生*/
	var _p = $("#_tr_shqm").position() ;
	var _d = $("#_tr_shqm").find('div') ;
	debugger ;
	if(_d.length==1){
		$("#_tr_shqm").find('div').show() ;
		debugger;
		$("#_tr_shqm").find('div').css('top',_p.top-25) ;
	}
});
// 打印页面(整理)
function doPrintbaogao() {
	var url_saveOrUpdateEyeEOG = "/publish/EyeEOG/saveOrUpdateEyeEOG.htm";
	$.extend(parameter_saveOrUpdateEyeEOG,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyeEOG = getJSONData(url_saveOrUpdateEyeEOG,
			parameter_saveOrUpdateEyeEOG, "POST");
	if (data_saveOrUpdateEyeEOG.state) {
		$("#div_buttonsytle1").remove();// 操作按钮div
		printBaoGaoLodap("B5 (JIS)");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	} else
		$.oimsError("电生理EOG报告保存失败", function() {

		});
}
// 关闭jsp(整理)
function doClose() {
	window.close();
}