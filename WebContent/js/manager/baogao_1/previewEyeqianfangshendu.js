//前方深度首次加载整理
$(function(){
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyeqianfangshendu != null) {
		var val = parameter_saveOrUpdateEyeqianfangshendu.memo;
		while(val.indexOf(" ")!=-1)
			val = val.replace(" ","&nbsp;&nbsp;");
		val = val.replace(/\r|\n/g,"<br />");
		if ($("#memo").length == 1) 
		$("#memo").replaceWith($("<span />").attr("id","memo").html(val));
		//申请医生
		if ($("#rep_doc").length == 1) 
			$("#rep_doc").replaceWith(
					$("<span/>").attr("id", "rep_doc").html(
							parameter_saveOrUpdateEyeqianfangshendu.rep_doc_name));
	//检查医生
		if ($("#doctor").length == 1) 
			$("#doctor").replaceWith(
					$("<span/>").attr("id", "doctor").html(
						parameter_saveOrUpdateEyeqianfangshendu.doctor_name));
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
	
	/*显示审核医生*/
	var _p = $("#_tr_shqm").position() ;
	var _d = $("#_tr_shqm").find('div') ;
	if(_d.length==1){
		$("#_tr_shqm").find('div').show() ;
		debugger;
		$("#_tr_shqm").find('div').css('top',_p.top-25) ;
	}
});

//function doPrintbaogao(){
//	//window.close();
//	
//	var url_saveOrUpdateEyeyxjc = "/publish/Eyeygnew/saveOrUpdateEyeygnew.htm";// 暗适应检查报告保存或者修改
//	$.extend(parameter_saveOrUpdateEyeygnew,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
//	var data_saveOrUpdateEyeygnew = getJSONData(url_saveOrUpdateEyeygnew,
//			parameter_saveOrUpdateEyeygnew, "post");
//	if (data_saveOrUpdateEyeygnew.state) {
//		$("#div_buttonsytle1").remove();// 操作按钮div
//		printBaoGaoLodap("B5 (JIS)");
//		window.opener.document.getElementById("isprintsuc").value="1";
//		window.close();
//	} else
//		$.oimsError("", function() {
//
//		});
//
//}

function doPrintbaogao(){
	var url_saveOrUpdateEyeqianfangshendu = "/publish/Eyeqianfangshendu/saveOrUpdateEyeqianfangshendu.htm";
	$.extend(parameter_saveOrUpdateEyeqianfangshendu,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyeqianfangshendu = getJSONData(url_saveOrUpdateEyeqianfangshendu,
			parameter_saveOrUpdateEyeqianfangshendu, "post");
	if (data_saveOrUpdateEyeqianfangshendu.state){
		$("#div_buttonsytle1").remove();
		printBaoGaoLodap("B5 (JIS)");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	}else{
		$.oimsError("前方深度报告保存失败", function(){
			
		});
	}
}

function doClose() {
	window.close();
}