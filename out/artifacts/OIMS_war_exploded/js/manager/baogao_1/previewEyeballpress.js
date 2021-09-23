//首次加载(整理)
$(function() {
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyeballpress != null) {
		if ($("#r_eye_value1").length == 1) 
			$("#r_eye_value1").replaceWith($("<span/>").attr("id", "r_eye_value1").html(
							parameter_saveOrUpdateEyeballpress.r_eye_value1));
		if ($("#l_eye_value1").length == 1) 
			$("#l_eye_value1").replaceWith($("<span/>").attr("id", "l_eye_value1").html(
					parameter_saveOrUpdateEyeballpress.l_eye_value1));
		if ($("#r_eye_value2").length == 1) 
			$("#r_eye_value2").replaceWith($("<span/>").attr("id", "r_eye_value2").html(
					parameter_saveOrUpdateEyeballpress.r_eye_value2));
		if ($("#l_eye_value2").length == 1) 
			$("#l_eye_value2").replaceWith($("<span/>").attr("id", "l_eye_value2").html(
					parameter_saveOrUpdateEyeballpress.l_eye_value2));
		if ($("#check_doc").length == 1) 
			$("#check_doc").replaceWith($("<span/>").attr("id", "check_doc").html(
					parameter_saveOrUpdateEyeballpress.check_doc));
			if ($("#memo").length == 1){
				var val = parameter_saveOrUpdateEyeballpress.memo;
				val = val.replace(/\r|\n/g,"<br />");
				while(val.indexOf(" ")!=-1)
					val = val.replace(" ","&nbsp;&nbsp;");
				$("#memo").replaceWith($("<span />").attr("id","memo").html(val));
			} 
		//申请医生
		if ($("#rep_doc").length == 1) 
			$("#rep_doc").replaceWith(
					$("<span/>").attr("id", "rep_doc").html(
							parameter_saveOrUpdateEyeballpress.rep_doc_name));
		//检查医生
		if ($("#doctor").length == 1) 
			$("#doctor").replaceWith(
					$("<span/>").attr("id", "doctor").html(
							parameter_saveOrUpdateEyeballpress.doctor_name));
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
	var url_saveOrUpdateEyeballpress = "/publish/Eyeballpress/saveOrUpdateEyeballpress.htm";// 眼压检查报告保存或者修改
	$.extend(parameter_saveOrUpdateEyeballpress,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyeballpress = getJSONData(url_saveOrUpdateEyeballpress,
			parameter_saveOrUpdateEyeballpress, "post");	
	if (data_saveOrUpdateEyeballpress.state) {
		$("#div_buttonsytle1").remove();// 操作按钮div
		printBaoGaoLodap("B5 (JIS)");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	} else
		$.oimsError("眼压检查报告保存失败", function() {

		});
}
// 关闭jsp(整理)
function doClose() {
	window.close();
}