//三级視功能加载(整理)
$(function() {
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyetsjsj != null) {
		if ($("#sj_1").length == 1) {
			var sj_1 = parameter_saveOrUpdateEyetsjsj.sj_1;
			while(sj_1.indexOf(" ")!=-1)
				sj_1 = sj_1.replace(" ","&nbsp;&nbsp;");
			sj_1 = sj_1.replace(/\r|\n/g,"<br />");
			$("#sj_1").replaceWith(
					$("<span/>").attr("id", "sj_1").html(sj_1));
		}
		if ($("#sj_2").length == 1){
			var sj_2 = parameter_saveOrUpdateEyetsjsj.sj_2;
			while(sj_2.indexOf(" ")!=-1)
				sj_2 = sj_2.replace(" ","&nbsp;&nbsp;");
			sj_2 = sj_2.replace(/\r|\n/g,"<br />");
			$("#sj_2").replaceWith(
					$("<span/>").attr("id", "sj_2").html(sj_2));
		} 
		if ($("#sj_3").length == 1){
			var sj_3 = parameter_saveOrUpdateEyetsjsj.sj_3;
			while(sj_3.indexOf(" ")!=-1)
				sj_3 = sj_3.replace(" ","&nbsp;&nbsp;");
			sj_3 = sj_3.replace(/\r|\n/g,"<br />");
			$("#sj_3").replaceWith(
					$("<span/>").attr("id", "sj_3").html(sj_3));
		} 
		if ($("#swmdy").length == 1){
			var swmdy = parameter_saveOrUpdateEyetsjsj.swmdy;
			while(swmdy.indexOf(" ")!=-1)
				swmdy = swmdy.replace(" ","&nbsp;&nbsp;");
			swmdy = swmdy.replace(/\r|\n/g,"<br />");
			$("#swmdy").replaceWith(
					$("<span/>").attr("id", "swmdy").html(swmdy));
		} 
		
		//申请医生
		if ($("#rep_doc").length == 1) 
			$("#rep_doc").replaceWith(
					$("<span />").attr("id", "rep_doc").html(
							parameter_saveOrUpdateEyetsjsj.rep_doc_name));
		//检查医生
		if ($("#doctor").length == 1) 
			$("#doctor").replaceWith(
					$("<span />").attr("id", "doctor").html(
							parameter_saveOrUpdateEyetsjsj.doctor_name));

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
	var url_saveOrUpdateEyetsjsj = "/publish/Eyetsjsj/saveOrUpdateEyetsjsj.htm";// 弱視治疗
	$.extend(parameter_saveOrUpdateEyetsjsj,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyetsjsj = getJSONData(url_saveOrUpdateEyetsjsj,
			parameter_saveOrUpdateEyetsjsj, "post");
	if (data_saveOrUpdateEyetsjsj.state) {
		$("#div_buttonsytle1").remove();// 操作按钮div
		printBaoGaoLodap("B5 (JIS)");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	} else
		$.oimsError("同视机双眼视觉报告保存失败", function() {

		});
}
// 关闭jsp(整理)
function doClose() {
	window.close();
}
