//首次加载(整理)
$(function() {
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyejgzl != null) {
		if ($("#type").length == 1)//激光类型
			$("#type").replaceWith($("<span/>").attr("id","type").html(parameter_saveOrUpdateEyejgzl.type));
		if ($("#yb").length == 1)
			$("#yb").replaceWith($("<span/>").attr("id","yb").html(parameter_saveOrUpdateEyejgzl.yb));
		if ($("#jgzl_no").length == 1)
			$("#jgzl_no").replaceWith($("<span/>").attr("id","jgzl_no").html(parameter_saveOrUpdateEyejgzl.jgzlNo));
		if ($("#result").length == 1){
			var val = parameter_saveOrUpdateEyejgzl.result;
			while(val.indexOf(" ")!=-1)
				val = val.replace(" ","&nbsp;&nbsp;");
				val = val.replace(/\r|\n/g,"<br />");
			$("#result").replaceWith($("<span/>").attr("id","result").html(val));
		}
		//申请医生
		if ($("#rep_doc").length == 1) 
			$("#rep_doc").replaceWith(
					$("<span/>").attr("id", "rep_doc").html(
							parameter_saveOrUpdateEyejgzl.repDoc_name));
		//检查医生
		if ($("#doctor").length == 1) 
			$("#doctor").replaceWith(
					$("<span/>").attr("id", "doctor").html(
							parameter_saveOrUpdateEyejgzl.doctor_name));
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
	var url_saveOrUpdateEyejgzl = "/publish/Eyejgzl/saveOrUpdateEyejgzl.htm";// 暗适应检查报告保存或者修改
	$.extend(parameter_saveOrUpdateEyejgzl,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyejgzl = getJSONData(url_saveOrUpdateEyejgzl,
			parameter_saveOrUpdateEyejgzl, "post");
	if (data_saveOrUpdateEyejgzl.state) {
		$("#div_buttonsytle1").remove();// 操作按钮div
		printBaoGaoLodap("B5 (JIS)");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	} else
		$.oimsError("激光治疗报告保存失败", function() {

		});
}
// 关闭jsp(整理)
function doClose() {
	window.close();
}
