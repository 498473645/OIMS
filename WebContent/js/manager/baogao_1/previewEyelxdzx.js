//裂隙灯照相检查报告首次加载(整理)
$(function() {
	importJS("/js/manager/baogao/initialBaoGao.js");
	if (parameter_saveOrUpdateEyelxdzx != null) {

		if ($("#demo").length == 1) 
			$("#demo").replaceWith(
					$("<span/>").attr("id", "demo").html(
							parameter_saveOrUpdateEyelxdzx.demo));
		if ($("#zxfs").length == 1) 
			$("#zxfs").replaceWith(
					$("<span/>").attr("id", "zxfs").html(
							parameter_saveOrUpdateEyelxdzx.zxfs));
		//申请医生
		if ($("#rep_doc").length == 1) 
			$("#rep_doc").replaceWith(
					$("<span/>").attr("id", "rep_doc").html(
							parameter_saveOrUpdateEyelxdzx.rep_doc_name));
	//检查医生
		if ($("#doctor").length == 1) 
			$("#doctor").replaceWith(
					$("<span/>").attr("id", "doctor").html(
							parameter_saveOrUpdateEyelxdzx.doctor_name));
		
		var operateDiv = $(".operateDiv");
		var array_div = $(operateDiv)[0].children;
		for ( var i = 0; i < array_div.length; i++)
			$(array_div[i]).css("border", "1px solid black");

	}
	utilTool().fdisabled($("#div_reportresult"));// 全部只读
	// 操作按钮div
	var div_buttonsytle1 = $("<div/>").attr("id", "div_buttonsytle1").attr(
			"class", "buttonsytle1").attr("style",
			"width: 640px;margin: 0px auto;");// 操作按钮div
	$(div_buttonsytle1).appendTo("#body_baogao");
	var a_print = "<a href='javascript:doPrint();' class='btnone' id='a_print'><span class='print'></span>"
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
function doPrint() {
	var url_saveOrUpdateEyelxdzx = "/publish/Eyelxdzx/saveOrUpdateEyelxdzx.htm";
	$.extend(parameter_saveOrUpdateEyelxdzx,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyelxdzx = getJSONData(url_saveOrUpdateEyelxdzx,
			parameter_saveOrUpdateEyelxdzx, "post");
	if (data_saveOrUpdateEyelxdzx.state) {
		$("#div_buttonsytle1").remove();// 操作按钮div
		printBaoGaoLodap("A4");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	} else
		$.oimsError("眼前节照相报告保存失败", function() {

		});
}
// 关闭jsp(整理)
function doClose() {
	window.close();
}