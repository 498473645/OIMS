//首次加载(整理)
$(function() {
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyebdx != null) {
		if ($("#ls_r").length == 1)//激光类型
			$("#ls_r").replaceWith($("<span/>").attr("id","ls_r").html(
					parameter_saveOrUpdateEyebdx.ls_r));
		if ($("#ls_l").length == 1)
			$("#ls_l").replaceWith($("<span/>").attr("id","ls_l").html(
					parameter_saveOrUpdateEyebdx.ls_l));
		if ($("#dj_r").length == 1)
			$("#dj_r").replaceWith($("<span/>").attr("id","dj_r").html(
					parameter_saveOrUpdateEyebdx.dj_r));
		if ($("#dj_l").length == 1)
			$("#dj_l").replaceWith($("<span/>").attr("id","dj_l").html(
					parameter_saveOrUpdateEyebdx.dj_l));
		//申请医生
		if ($("#rep_doc").length == 1) 
			$("#rep_doc").replaceWith(
					$("<span/>").attr("id", "rep_doc").html(
							parameter_saveOrUpdateEyebdx.repDoc_name));
		//检查医生
		if ($("#doctor").length == 1) 
			$("#doctor").replaceWith(
					$("<span/>").attr("id", "doctor").html(
							parameter_saveOrUpdateEyebdx.doctor_name));
	}
	var barcodeDiv = $("<div/>").attr("class","barcodeDiv").attr("style",
	"height:40px;width:80px;").appendTo($(".barcodeTd"));
	var binglihao = $("#caseNumber").html();
	showBarcode(binglihao,barcodeDiv);
	utilTool().fdisabled($("#div_reportresult"));// 全部只读

	// 操作按钮div
	var div_buttonsytle1 = $("<div/>").attr("id", "div_buttonsytle1").attr(
			"class", "buttonsytle1").attr("style",
			"width: 640px;margin: 0px auto;");// 操作按钮div
	$(div_buttonsytle1).appendTo("#body_baogao");
	var a_print = "<a href='javascript:doPrint_baogao();' class='btnone' id='a_print'><span class='print'></span>"
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
function doPrint_baogao() {
	var url_saveOrUpdateEyebdx = "/publish/Eyebdx/saveOrUpdateEyebdx.htm";// 不等像报告保存或者修改
	$.extend(parameter_saveOrUpdateEyebdx,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyebdx = getJSONData(url_saveOrUpdateEyebdx,
			parameter_saveOrUpdateEyebdx, "post");
	if (data_saveOrUpdateEyebdx.state) {
		$("#div_buttonsytle1").remove();// 操作按钮div
		printBaoGaoLodap("B5 (JIS)");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	} else
		$.oimsError("不等像报告保存失败", function() {

		});
}
// 关闭jsp(整理)
function doClose() {
	window.close();
}
