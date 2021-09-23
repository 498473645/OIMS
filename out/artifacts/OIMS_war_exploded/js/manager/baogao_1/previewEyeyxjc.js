//隐斜检查首次加载整理
$(function(){
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if(parameter_saveOrUpdateEyeyxjc !=null){
	if ($("#jcfs").length == 1){
		var jcfs = parameter_saveOrUpdateEyeyxjc.jcfs;
		jcfs = jcfs.replace(/\r|\n/g,"<br />");
		while(jcfs.indexOf(" ")!=-1)
			jcfs = jcfs.replace(" ","&nbsp;&nbsp;");
		$("#jcfs").replaceWith(
				$("<span/>").attr("id", "jcfs").html(jcfs));
	} 
	if ($("#result").length == 1){
		var result = parameter_saveOrUpdateEyeyxjc.result;
		result = result.replace(/\r|\n/g,"<br />");
		while(result.indexOf(" ")!=-1)
			result = result.replace(" ","&nbsp;&nbsp;");
		$("#result").replaceWith(
				$("<span/>").attr("id", "result").html(result));
	} 
	//申请医生
	if ($("#rep_doc").length == 1) 
		$("#rep_doc").replaceWith(
				$("<span/>").attr("id", "rep_doc").html(
						parameter_saveOrUpdateEyeyxjc.rep_doc_name));
	//检查医生
		if ($("#doctor").length == 1) 
			$("#doctor").replaceWith(
					$("<span/>").attr("id", "doctor").html(
						parameter_saveOrUpdateEyeyxjc.doctor_name));
	}
	//添加条形码
	var barcodeDiv = $("<div/>").attr("class","barcodeDiv").attr("style",
	"height:44px;width:80px;").appendTo($(".barcodeTd"));
	var binglihao = $("#caseNumber").html();
	showBarcode(binglihao,barcodeDiv);
	//添加按钮
	var div_buttonsytle1 = $("<div/>").attr("id","div_buttonsytle1").attr("class","buttonstyle1").attr("style","width:640px;margin:0px auto;");
	$(div_buttonsytle1).appendTo("#body_baogao");
	var a_print = "<a href='javascript:doPrintbaogao();' class='btnone' id='a_print'><span class='print'></span>打印</a>";
	$(a_print).appendTo(div_buttonsytle1);
	var a_close = "<a href = 'javascript:doClose();' class='btnone' id='a_clode'><span class='del'></span>关闭</a>";
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
	var url_saveOrUpdateEyeyxjc = "/publish/Eyeyxjc/saveOrUpdateEyeyxjc.htm";
	$.extend(parameter_saveOrUpdateEyeyxjc,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyeyxjc = getJSONData(url_saveOrUpdateEyeyxjc,
			parameter_saveOrUpdateEyeyxjc, "post");
	if (data_saveOrUpdateEyeyxjc.state){
		$("#div_buttonsytle1").remove();
		printBaoGaoLodap("B5 (JIS)");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	}else{
		$.oimsError("隐斜检查报告保存失败", function(){
			
		});
	}
}

function doClose() {
	window.close();
}