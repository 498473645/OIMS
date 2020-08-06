//色觉检查首次加载
$(function() {
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyesjjc != null) {
		if ($("#yb").length == 1)//眼别
			$("#yb").replaceWith($("<span/>").attr("id","yb").html(parameter_saveOrUpdateEyesjjc.yb));
		if ($("#geo").length == 1)
			$("#geo").replaceWith($("<span/>").attr("id","geo").html(parameter_saveOrUpdateEyesjjc.geo));
		if ($("#line").length == 1)
			$("#line").replaceWith($("<span/>").attr("id","line").html(parameter_saveOrUpdateEyesjjc.line));
		if ($("#num").length == 1)
			$("#num").replaceWith($("<span/>").attr("id","num").html(parameter_saveOrUpdateEyesjjc.num));
		if ($("#obj").length == 1)
			$("#obj").replaceWith($("<span/>").attr("id","obj").html(parameter_saveOrUpdateEyesjjc.obj));
		if ($("#color").length == 1)
			$("#color").replaceWith($("<span/>").attr("id","color").html(parameter_saveOrUpdateEyesjjc.color));
		if ($("#zqlu").length == 1)
			$("#zqlu").replaceWith($("<span/>").attr("id","zqlu").html(parameter_saveOrUpdateEyesjjc.zqlu));
		if ($("#bfb").length == 1)
			$("#bfb").replaceWith($("<span/>").attr("id","bfb").html(parameter_saveOrUpdateEyesjjc.bfb));
		if ($("#result_1").length ==1)
			$("#result_1").replaceWith($("<span/>").attr("id","result_1").html(parameter_saveOrUpdateEyesjjc.result_1));
		if ($("#result_2").length == 1)
			$("#result_2").replaceWith($("<span/>").attr("id","result_2").html(parameter_saveOrUpdateEyesjjc.result_2));
		$.each(parameter_saveOrUpdateEyesjjc,function(key,value){
			if ($("#"+key).length == 1 && value == 1)
				$("#"+key).replaceWith($("<img/>").attr("src",contextPath + '/images/checked.jpg'));
			if ($("#"+key).length == 1 && value == 0)
				$("#"+key).replaceWith($("<img/>").attr("src",contextPath + '/images/unchecked.jpg'));
		});

//		申请医生
		if ($("#rep_doc").length == 1) 
			$("#rep_doc").replaceWith(
					$("<span/>").attr("id", "rep_doc").html(
							parameter_saveOrUpdateEyesjjc.repDoc_name));
		//检查医生
		if ($("#doctor").length == 1) 
			$("#doctor").replaceWith(
					$("<span/>").attr("id", "doctor").html(
							parameter_saveOrUpdateEyesjjc.doctor_name));
	}
	//添加条形码
	var barcodeDiv = $("<div/>").attr("class","barcodeDiv").attr("style",
	"height:44px;width:80px;").appendTo($(".barcodeTd"));
	var binglihao = $("#caseNumber").html();
	showBarcode(binglihao,barcodeDiv);
	utilTool().fdisabled($("#div_reportresult"));// 全部只读
	$("#mydiv table:eq(0)").css("font-size","14px");
	$("#mydiv table:eq(0)").find("td").css("height","auto");
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
	if(_d.length==1){
		$("#_tr_shqm").find('div').show() ;
		debugger;
		$("#_tr_shqm").find('div').css('top',_p.top-25) ;
	}
});
// 打印页面(整理)
function doPrintbaogao() {
	var url_saveOrUpdateEyesjjc = "/publish/Eyesjjc/saveOrUpdateEyesjjc.htm";// 暗适应检查报告保存或者修改
	$.extend(parameter_saveOrUpdateEyesjjc,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyesjjc = getJSONData(url_saveOrUpdateEyesjjc,
			parameter_saveOrUpdateEyesjjc, "post");
	if (data_saveOrUpdateEyesjjc.state) {
		$("#div_buttonsytle1").remove();// 操作按钮div
		printBaoGaoLodap("B5 (JIS)");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	} else
		$.oimsError("色觉检查报告保存失败", function() {

		});
}
// 关闭jsp(整理)
function doClose() {
	window.close();
}
