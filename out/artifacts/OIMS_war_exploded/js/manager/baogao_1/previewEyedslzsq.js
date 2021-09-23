//低视力助视器首次加载(整理)
$(function() {
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyedslzsq != null) {
		if ($("#R_LX").length == 1)//激光类型
			$("#R_LX").replaceWith($("<span/>").attr("id","R_LX").html(parameter_saveOrUpdateEyedslzsq.r_lx));
		if ($("#L_LX").length == 1)
			$("#L_LX").replaceWith($("<span/>").attr("id","L_LX").html(parameter_saveOrUpdateEyedslzsq.l_lx));
		if ($("#R_QJ").length == 1)
			$("#R_QJ").replaceWith($("<span/>").attr("id","R_QJ").html(parameter_saveOrUpdateEyedslzsq.r_qj));
		if ($("#L_QJ").length == 1)
			$("#L_QJ").replaceWith($("<span/>").attr("id","L_QJ").html(parameter_saveOrUpdateEyedslzsq.l_qj));
		if ($("#R_ZJ").length == 1)
			$("#R_ZJ").replaceWith($("<span/>").attr("id","R_ZJ").html(parameter_saveOrUpdateEyedslzsq.r_zj));
		if ($("#L_ZJ").length == 1)
			$("#L_ZJ").replaceWith($("<span/>").attr("id","L_ZJ").html(parameter_saveOrUpdateEyedslzsq.l_zj));
		if ($("#R_ZX").length == 1)
			$("#R_ZX").replaceWith($("<span/>").attr("id","R_ZX").html(parameter_saveOrUpdateEyedslzsq.r_zx));
		if ($("#L_ZX").length == 1)
			$("#L_ZX").replaceWith($("<span/>").attr("id","L_ZX").html(parameter_saveOrUpdateEyedslzsq.l_zx));
		if ($("#R_JZSL").length == 1)
			$("#R_JZSL").replaceWith($("<span/>").attr("id","R_JZSL").html(parameter_saveOrUpdateEyedslzsq.r_jzsl));
		if ($("#L_JZSL").length == 1)
			$("#L_JZSL").replaceWith($("<span/>").attr("id","L_JZSL").html(parameter_saveOrUpdateEyedslzsq.l_jzsl));
		if ($("#R_GZJL").length == 1)
			$("#R_GZJL").replaceWith($("<span/>").attr("id","R_GZJL").html(parameter_saveOrUpdateEyedslzsq.r_gzjl));
		if ($("#L_GZJL").length == 1)
			$("#L_GZJL").replaceWith($("<span/>").attr("id","L_GZJL").html(parameter_saveOrUpdateEyedslzsq.l_gzjl));
		if ($("#R_DBMGD").length == 1)
			$("#R_DBMGD").replaceWith($("<span/>").attr("id","R_DBMGD").html(parameter_saveOrUpdateEyedslzsq.r_dbmgd));
		if ($("#L_DBMGD").length == 1)
			$("#L_DBMGD").replaceWith($("<span/>").attr("id","L_DBMGD").html(parameter_saveOrUpdateEyedslzsq.l_dbmgd));
		if ($("#R_TJ").length == 1)
			$("#R_TJ").replaceWith($("<span/>").attr("id","R_TJ").html(parameter_saveOrUpdateEyedslzsq.r_tj));
		if ($("#L_TJ").length == 1)
			$("#L_TJ").replaceWith($("<span/>").attr("id","L_TJ").html(parameter_saveOrUpdateEyedslzsq.l_tj));
		if ($("#R_LJXY").length == 1)
			$("#R_LJXY").replaceWith($("<span/>").attr("id","R_LJXY").html(parameter_saveOrUpdateEyedslzsq.r_ljxy));
		if ($("#L_LJXY").length == 1)
			$("#L_LJXY").replaceWith($("<span/>").attr("id","L_LJXY").html(parameter_saveOrUpdateEyedslzsq.l_ljxy));
		if ($("#R_PTSL").length == 1)
			$("#R_PTSL").replaceWith($("<span/>").attr("id","R_PTSL").html(parameter_saveOrUpdateEyedslzsq.r_ptsl));
		if ($("#L_PTSL").length == 1)
			$("#L_PTSL").replaceWith($("<span/>").attr("id","L_PTSL").html(parameter_saveOrUpdateEyedslzsq.l_ptsl));
		if ($("#demo").length == 1){
			var val = parameter_saveOrUpdateEyedslzsq.demo;
			while(val.indexOf(" ")!=-1)
				val = val.replace(" ","&nbsp;&nbsp;");
			val = val.replace(/\r|\n/g,"<br />");
			$("#demo").replaceWith($("<span/>").attr("id","demo").html(val));
		}
		//申请医生
		if ($("#rep_doc").length == 1) 
			$("#rep_doc").replaceWith(
					$("<span/>").attr("id", "rep_doc").html(
							parameter_saveOrUpdateEyedslzsq.repDoc_name));
		//检查医生
		if ($("#doctor").length == 1) 
			$("#doctor").replaceWith(
					$("<span/>").attr("id", "doctor").html(
							parameter_saveOrUpdateEyedslzsq.doctor_name));
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
	var url_saveOrUpdateEyedslzsq = "/publish/Eyedslzsq/saveOrUpdateEyedslzsq.htm";// 暗适应检查报告保存或者修改
	$.extend(parameter_saveOrUpdateEyedslzsq,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyedslzsq = getJSONData(url_saveOrUpdateEyedslzsq,
			parameter_saveOrUpdateEyedslzsq, "post");
	if (data_saveOrUpdateEyedslzsq.state) {
		$("#div_buttonsytle1").remove();// 操作按钮div
		printBaoGaoLodap("B5 (JIS)");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	} else
		$.oimsError("低视力助视器报告保存失败", function() {

		});
}
// 关闭jsp(整理)
function doClose() {
	window.close();
}
