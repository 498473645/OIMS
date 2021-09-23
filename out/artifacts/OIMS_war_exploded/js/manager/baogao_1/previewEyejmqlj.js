//角膜曲率首次加载(整理)
$(function() {
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyejmqlj != null) {
		if ($("#rk1").length == 1) 
			$("#rk1").replaceWith(
					$("<span/>").attr("id", "rk1").html(
							parameter_saveOrUpdateEyejmqlj.rk1));
		if ($("#rk1_direction").length == 1) 
			$("#rk1_direction").replaceWith(
					$("<span/>").attr("id", "rk1_direction").html(
							parameter_saveOrUpdateEyejmqlj.rk1_direction));
		if ($("#rk2").length == 1) 
			$("#rk2").replaceWith(
					$("<span/>").attr("id", "rk2").html(
							parameter_saveOrUpdateEyejmqlj.rk2));
		if ($("#rk2_direction").length == 1) 
			$("#rk2_direction").replaceWith(
					$("<span/>").attr("id", "rk2_direction").html(
							parameter_saveOrUpdateEyejmqlj.rk2_direction));
		if ($("#lk1").length == 1) 
			$("#lk1").replaceWith(
					$("<span/>").attr("id", "lk1").html(
							parameter_saveOrUpdateEyejmqlj.lk1));
		if ($("#lk1_direction").length == 1) 
			$("#lk1_direction").replaceWith(
					$("<span/>").attr("id", "lk1_direction").html(
							parameter_saveOrUpdateEyejmqlj.lk1_direction));
		if ($("#lk2").length == 1) 
			$("#lk2").replaceWith(
					$("<span/>").attr("id", "lk2").html(
							parameter_saveOrUpdateEyejmqlj.lk2));
		if ($("#lk2_direction").length == 1) 
			$("#lk2_direction").replaceWith(
					$("<span/>").attr("id", "lk2_direction").html(
							parameter_saveOrUpdateEyejmqlj.lk2_direction));
		if ($("#demo").length == 1) {
			var demo = parameter_saveOrUpdateEyejmqlj.demo;
			while(demo.indexOf(" ")!=-1)
				demo = demo.replace(" ","&nbsp;&nbsp;");
			demo = demo.replace(/\r|\n/g,"<br />");
			$("#demo").replaceWith(
					$("<span/>").attr("id", "demo").html(
							demo));
		}
		//申请医生
		if ($("#rep_doc").length == 1) 
			$("#rep_doc").replaceWith(
					$("<span/>").attr("id", "rep_doc").html(
							parameter_saveOrUpdateEyejmqlj.rep_doc_name));
		//检查医生
		if ($("#doctor").length == 1) 
			$("#doctor").replaceWith(
					$("<span/>").attr("id", "doctor").html(
							parameter_saveOrUpdateEyejmqlj.doctor_name));
		
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
	if(_d.length==1){
		$("#_tr_shqm").find('div').show() ;
		debugger;
		$("#_tr_shqm").find('div').css('top',_p.top-25) ;
	}
});
// 打印页面(整理)
function doPrintbaogao() {
	var url_saveOrUpdateEyejmqlj = "/publish/Eyejmqlj/saveOrUpdateEyejmqlj.htm";
	$.extend(parameter_saveOrUpdateEyejmqlj,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyejmqlj = getJSONData(url_saveOrUpdateEyejmqlj,
			parameter_saveOrUpdateEyejmqlj, "post");
	if (data_saveOrUpdateEyejmqlj.state) {
		$("#div_buttonsytle1").remove();// 操作按钮div
		printBaoGaoLodap("B5 (JIS)");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	} else
		$.oimsError("角膜曲率计报告保存失败", function() {

		});
}
// 关闭jsp(整理)
function doClose() {
	window.close();
}