//角膜内皮计数首次加载(整理)
$(function() {
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyejmspjs != null) {
		if ($("#r_cd").length == 1){
			$("#r_cd").replaceWith($("<span/>").attr("id","r_cd").html(parameter_saveOrUpdateEyejmspjs.r_cd));
		}
		if ($("#r_num").length == 1) {
			$("#r_num").replaceWith($("<span/>").attr("id","r_num").html(parameter_saveOrUpdateEyejmspjs.r_num));
		}
		if ($("#r_ave").length == 1) {
			$("#r_ave").replaceWith($("<span/>").attr("id","r_ave").html(parameter_saveOrUpdateEyejmspjs.r_ave));
		}
		if ($("#r_min").length == 1) {
			$("#r_min").replaceWith($("<span/>").attr("id","r_min").html(parameter_saveOrUpdateEyejmspjs.r_min));
		}
		if ($("#r_sd").length == 1) {
			$("#r_sd").replaceWith($("<span/>").attr("id","r_sd").html(parameter_saveOrUpdateEyejmspjs.r_sd));
		}
		if ($("#r_cv").length == 1) {
			$("#r_cv").replaceWith($("<span/>").attr("id","r_cv").html(parameter_saveOrUpdateEyejmspjs.r_cv));
		}
		if ($("#r_max").length == 1) {
			$("#r_max").replaceWith($("<span/>").attr("id","r_max").html(parameter_saveOrUpdateEyejmspjs.r_max));
		}
		if ($("#r_aa").length == 1) {
			$("#r_aa").replaceWith($("<span/>").attr("id","r_aa").html(parameter_saveOrUpdateEyejmspjs.r_aa));
		}
		if ($("#l_cd").length == 1) {
			$("#l_cd").replaceWith($("<span/>").attr("id","l_cd").html(parameter_saveOrUpdateEyejmspjs.l_cd));
		}
		if ($("#l_num").length == 1) {
			$("#l_num").replaceWith($("<span/>").attr("id","l_num").html(parameter_saveOrUpdateEyejmspjs.l_num));
		}
		if ($("#l_ave").length == 1) {
			$("#l_ave").replaceWith($("<span/>").attr("id","l_ave").html(parameter_saveOrUpdateEyejmspjs.l_ave));
		}
		if ($("#l_min").length == 1) {
			$("#l_min").replaceWith($("<span/>").attr("id","l_min").html(parameter_saveOrUpdateEyejmspjs.l_min));
		}
		if ($("#l_sd").length == 1) {
			$("#l_sd").replaceWith($("<span/>").attr("id","l_sd").html(parameter_saveOrUpdateEyejmspjs.l_sd));
		}
		if ($("#l_cv").length == 1) {
			$("#l_cv").replaceWith($("<span/>").attr("id","l_cv").html(parameter_saveOrUpdateEyejmspjs.l_cv));
		}
		if ($("#l_max").length == 1) {
			$("#l_max").replaceWith($("<span/>").attr("id","l_max").html(parameter_saveOrUpdateEyejmspjs.l_max));
		}
		if ($("#l_aa").length == 1) {
			$("#l_aa").replaceWith($("<span/>").attr("id","l_aa").html(parameter_saveOrUpdateEyejmspjs.l_aa));
		}
		if ($("#memo").length == 1) {
			var val = parameter_saveOrUpdateEyejmspjs.memo;
			while(val.indexOf(" ")!=-1)
				val = val.replace(" ","&nbsp;&nbsp;");
			val = val.replace(/\r|\n/g,"<br />");
			$("#memo").replaceWith($("<span/>").attr("id","memo").html(val));
		}

		//申请医生
		if ($("#rep_doc").length == 1) 
			$("#rep_doc").replaceWith(
					$("<span/>").attr("id", "rep_doc").html(
							parameter_saveOrUpdateEyejmspjs.rep_doc_name));
		//检查医生
		if ($("#doctor").length == 1) 
			$("#doctor").replaceWith(
					$("<span/>").attr("id", "doctor").html(
							parameter_saveOrUpdateEyejmspjs.doctor_name));
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
	if(_d.length==1){
		$("#_tr_shqm").find('div').show() ;
		debugger;
		$("#_tr_shqm").find('div').css('top',_p.top-25) ;
	}
});
// 打印页面(整理)
function doPrintbaogao() {
	var url_saveOrUpdateEyejmspjs = "/publish/Eyejmspjs/saveOrUpdateEyejmspjs.htm";// 暗适应检查报告保存或者修改
	$.extend(parameter_saveOrUpdateEyejmspjs,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyejmspjs = getJSONData(url_saveOrUpdateEyejmspjs,
			parameter_saveOrUpdateEyejmspjs, "post");
	if (data_saveOrUpdateEyejmspjs.state) {
		$("#div_buttonsytle1").remove();// 操作按钮div
		printBaoGaoLodap("B5 (JIS)");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	} else
		$.oimsError("角膜内皮计数报告保存失败", function() {

		});
}
// 关闭jsp(整理)
function doClose() {
	window.close();
}

