//眼位眼肌首次加载
$(function() {
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyeywyj != null) {
		if ($("#ly_r_33").length == 1)//
			$("#ly_r_33").replaceWith($("<span/>").attr("id","ly_r_33").html(parameter_saveOrUpdateEyeywyj.ly_r_33));
		if ($("#ly_r_5").length == 1)
			$("#ly_r_5").replaceWith($("<span/>").attr("id","ly_r_5").html(parameter_saveOrUpdateEyeywyj.ly_r_5));
		if ($("#ly_l_33").length == 1)
			$("#ly_l_33").replaceWith($("<span/>").attr("id","ly_l_33").html(parameter_saveOrUpdateEyeywyj.ly_l_33));
		if ($("#ly_l_5").length == 1)
			$("#ly_l_5").replaceWith($("<span/>").attr("id","ly_l_5").html(parameter_saveOrUpdateEyeywyj.ly_l_5));
		if ($("#dj_r_33").length == 1)
			$("#dj_r_33").replaceWith($("<span/>").attr("id","dj_r_33").html(parameter_saveOrUpdateEyeywyj.dj_r_33));
		if ($("#dj_r_5").length == 1)
			$("#dj_r_5").replaceWith($("<span/>").attr("id","dj_r_5").html(parameter_saveOrUpdateEyeywyj.dj_r_5));
		if ($("#dj_l_33").length == 1)
			$("#dj_l_33").replaceWith($("<span/>").attr("id","dj_l_33").html(parameter_saveOrUpdateEyeywyj.dj_l_33));
		if ($("#dj_l_5").length == 1)
			$("#dj_l_5").replaceWith($("<span/>").attr("id","dj_l_5").html(parameter_saveOrUpdateEyeywyj.dj_l_5));
		if ($("#zg_con").length == 1)
			$("#zg_con").replaceWith($("<span/>").attr("id","zg_con").html(parameter_saveOrUpdateEyeywyj.zg_con));
		if ($("#yq_con").length == 1)
			$("#yq_con").replaceWith($("<span/>").attr("id","yq_con").html(parameter_saveOrUpdateEyeywyj.yq_con));
		if ($("#sy_r_szj").length == 1)
			$("#sy_r_szj").replaceWith($("<span/>").attr("id","sy_r_szj").html(parameter_saveOrUpdateEyeywyj.sy_r_szj));
		if ($("#sy_r_wzj").length == 1)
			$("#sy_r_wzj").replaceWith($("<span/>").attr("id","sy_r_wzj").html(parameter_saveOrUpdateEyeywyj.sy_r_wzj));
		if ($("#sy_r_xzj").length == 1)
			$("#sy_r_xzj").replaceWith($("<span/>").attr("id","sy_r_xzj").html(parameter_saveOrUpdateEyeywyj.sy_r_xzj));
		if ($("#sy_r_xxj").length == 1)
			$("#sy_r_xxj").replaceWith($("<span/>").attr("id","sy_r_xxj").html(parameter_saveOrUpdateEyeywyj.sy_r_xxj));
		if ($("#sy_r_lzj").length == 1)
			$("#sy_r_lzj").replaceWith($("<span/>").attr("id","sy_r_lzj").html(parameter_saveOrUpdateEyeywyj.sy_r_lzj));
		if ($("#sy_r_sxj").length == 1)
			$("#sy_r_sxj").replaceWith($("<span/>").attr("id","sy_r_sxj").html(parameter_saveOrUpdateEyeywyj.sy_r_sxj));
		if ($("#sy_l_szj").length == 1)
			$("#sy_l_szj").replaceWith($("<span/>").attr("id","sy_l_szj").html(parameter_saveOrUpdateEyeywyj.sy_l_szj));
		if ($("#sy_l_wzj").length == 1)
			$("#sy_l_wzj").replaceWith($("<span/>").attr("id","sy_l_wzj").html(parameter_saveOrUpdateEyeywyj.sy_l_wzj));
		if ($("#sy_l_xzj").length == 1)
			$("#sy_l_xzj").replaceWith($("<span/>").attr("id","sy_l_xzj").html(parameter_saveOrUpdateEyeywyj.sy_l_xzj));
		if ($("#sy_l_xxj").length == 1)
			$("#sy_l_xxj").replaceWith($("<span/>").attr("id","sy_l_xxj").html(parameter_saveOrUpdateEyeywyj.sy_l_xxj));
		if ($("#sy_l_lzj").length == 1)
			$("#sy_l_lzj").replaceWith($("<span/>").attr("id","sy_l_lzj").html(parameter_saveOrUpdateEyeywyj.sy_l_lzj));
		if ($("#sy_l_sxj").length == 1)
			$("#sy_l_sxj").replaceWith($("<span/>").attr("id","sy_l_sxj").html(parameter_saveOrUpdateEyeywyj.sy_l_sxj));
		if ($("#seg_1").length == 1)
			$("#seg_1").replaceWith($("<span/>").attr("id","seg_1").html(parameter_saveOrUpdateEyeywyj.seg_1));
		if ($("#seg_2").length == 1)
			$("#seg_2").replaceWith($("<span/>").attr("id","seg_2").html(parameter_saveOrUpdateEyeywyj.seg_2));
		if ($("#seg_3").length == 1)
			$("#seg_3").replaceWith($("<span/>").attr("id","seg_3").html(parameter_saveOrUpdateEyeywyj.seg_3));
		if ($("#seg_4").length == 1)
			$("#seg_4").replaceWith($("<span/>").attr("id","seg_4").html(parameter_saveOrUpdateEyeywyj.seg_4));
		if ($("#seg_5").length == 1)
			$("#seg_5").replaceWith($("<span/>").attr("id","seg_5").html(parameter_saveOrUpdateEyeywyj.seg_5));
		if ($("#seg_6").length == 1)
			$("#seg_6").replaceWith($("<span/>").attr("id","seg_6").html(parameter_saveOrUpdateEyeywyj.seg_6));
		if ($("#seg_7").length == 1)
			$("#seg_7").replaceWith($("<span/>").attr("id","seg_7").html(parameter_saveOrUpdateEyeywyj.seg_7));
		if ($("#seg_8").length == 1)
			$("#seg_8").replaceWith($("<span/>").attr("id","seg_8").html(parameter_saveOrUpdateEyeywyj.seg_8));
		if ($("#seg_9").length == 1)
			$("#seg_9").replaceWith($("<span/>").attr("id","seg_9").html(parameter_saveOrUpdateEyeywyj.seg_9));
		if ($("#fzyd").length == 1)
			$("#fzyd").replaceWith($("<span/>").attr("id","fzyd").html(parameter_saveOrUpdateEyeywyj.fzyd));
		if ($("#a_v_xx").length == 1)
			$("#a_v_xx").replaceWith($("<span/>").attr("id","a_v_xx").html(parameter_saveOrUpdateEyeywyj.a_v_xx));
		if ($("#dctw").length == 1)
			$("#dctw").replaceWith($("<span/>").attr("id","dctw").html(parameter_saveOrUpdateEyeywyj.dctw));
		if ($("#zsxz").length == 1)
			$("#zsxz").replaceWith($("<span/>").attr("id","zsxz").html(parameter_saveOrUpdateEyeywyj.zsxz));
		if ($("#jlsy").length == 1)
			$("#jlsy").replaceWith($("<span/>").attr("id","jlsy").html(parameter_saveOrUpdateEyeywyj.jlsy));
		if ($("#fzyd_value").length == 1)
			$("#fzyd_value").replaceWith($("<span/>").attr("id","fzyd_value").html(" "));
		if ($("#a_v_xx_value").length == 1)
			$("#a_v_xx_value").replaceWith($("<span/>").attr("id","a_v_xx_value").html(" "));
		
		//申请医生
		if ($("#rep_doc").length == 1) 
			$("#rep_doc").replaceWith(
					$("<span/>").attr("id", "rep_doc").html(
							parameter_saveOrUpdateEyeywyj.repDoc_name));
		//检查医生
		if ($("#doctor").length == 1) 
			$("#doctor").replaceWith(
					$("<span/>").attr("id", "doctor").html(
							parameter_saveOrUpdateEyeywyj.doctor_name));
	}
	//添加条形码
	var barcodeDiv = $("<div/>").attr("class","barcodeDiv").attr("style",
	"height:44px;width:80px;").appendTo($(".barcodeTd"));
	var binglihao = $("#caseNumber").html();
	showBarcode(binglihao,barcodeDiv);
	utilTool().fdisabled($("#div_reportresult"));// 全部只读

	$("#show_div_yanweiyanji table").css("font-size","10px");
	$("#show_div_yanweiyanji table").find("td").css("height","auto");
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
	var url_saveOrUpdateEyeywyj = "/publish/Eyeywyj/saveOrUpdateEyeywyj.htm";// 暗适应检查报告保存或者修改
	$.extend(parameter_saveOrUpdateEyeywyj,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyeywyj = getJSONData(url_saveOrUpdateEyeywyj,
			parameter_saveOrUpdateEyeywyj, "post");
	if (data_saveOrUpdateEyeywyj.state) {
		$("#div_buttonsytle1").remove();// 操作按钮div
		printBaoGaoLodap("B5 (JIS)");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	} else
		$.oimsError("眼位眼肌报告保存失败", function() {

		});
}
// 关闭jsp(整理)
function doClose() {
	window.close();
}
