//Retcam首次加载整理
$(function(){
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyeRetcam != null) {
		var val = parameter_saveOrUpdateEyeRetcam.memo;
		while(val.indexOf(" ")!=-1)
			val = val.replace(" ","&nbsp;&nbsp;");
		val = val.replace(/\r|\n/g,"<br />");
		if ($("#memo").length == 1) 
		$("#memo").replaceWith($("<span />").attr("id","memo").html(val));
		
		var yb = parameter_saveOrUpdateEyeRetcam.yb;
		while(yb.indexOf(" ")!=-1)
			yb = yb.replace(" ","&nbsp;&nbsp;");
		yb = yb.replace(/\r|\n/g,"<br />");
		if ($("#yb").length == 1) 
		$("#yb").replaceWith($("<span />").attr("id","yb").html(yb));
		
		var zhenduan = parameter_saveOrUpdateEyeRetcam.zhenduan;
		while(zhenduan.indexOf(" ")!=-1)
			zhenduan = zhenduan.replace(" ","&nbsp;&nbsp;");
		zhenduan = zhenduan.replace(/\r|\n/g,"<br />");
		if ($("#zhenduan").length == 1) 
		$("#zhenduan").replaceWith($("<span />").attr("id","zhenduan").html(zhenduan));
		
		var jc_zhenduan = parameter_saveOrUpdateEyeRetcam.jc_zhenduan;
		while(jc_zhenduan.indexOf(" ")!=-1)
			jc_zhenduan = jc_zhenduan.replace(" ","&nbsp;&nbsp;");
		jc_zhenduan = jc_zhenduan.replace(/\r|\n/g,"<br />");
		if ($("#jc_zhenduan").length == 1) 
		$("#jc_zhenduan").replaceWith($("<span />").attr("id","jc_zhenduan").html(jc_zhenduan));
		
		var chuzhi = parameter_saveOrUpdateEyeRetcam.chuzhi;
		while(chuzhi.indexOf(" ")!=-1)
			chuzhi = chuzhi.replace(" ","&nbsp;&nbsp;");
		chuzhi = chuzhi.replace(/\r|\n/g,"<br />");
		if ($("#chuzhi").length == 1) 
		$("#chuzhi").replaceWith($("<span />").attr("id","chuzhi").html(chuzhi));
		
		//申请医生
		if ($("#rep_doc").length == 1) 
			$("#rep_doc").replaceWith(
					$("<span/>").attr("id", "rep_doc").html(
							parameter_saveOrUpdateEyeRetcam.rep_doc_name));
	        //检查医生
		if ($("#doctor").length == 1) 
			$("#doctor").replaceWith(
					$("<span/>").attr("id", "doctor").html(
						parameter_saveOrUpdateEyeRetcam.doctor_name));
		//护士
		if ($("#nurse").length == 1) 
			$("#nurse").replaceWith(
					$("<span/>").attr("id", "nurse").html(
						parameter_saveOrUpdateEyeRetcam.nurse_name));
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
	var url_saveOrUpdateEyeRetcam = "/publish/EyeRetcam/saveOrUpdateEyeRetcam.htm";
	$.extend(parameter_saveOrUpdateEyeRetcam,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyeRetcam = getJSONData(url_saveOrUpdateEyeRetcam,
			parameter_saveOrUpdateEyeRetcam, "post");
	if (data_saveOrUpdateEyeRetcam.state){
		$("#div_buttonsytle1").remove();
		printBaoGaoLodap("B5 (JIS)");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	}else{
		$.oimsError("Retcam报告保存失败", function(){
			
		});
	}
}

function doClose() {
	window.close();
}