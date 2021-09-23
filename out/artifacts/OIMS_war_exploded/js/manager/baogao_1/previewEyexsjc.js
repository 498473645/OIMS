//调节辐辏首次加载
$(function() {
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyexsjc != null) {
//		replaceFormData($("table:eq(2)"), parameter_saveOrUpdateEyexsjc);
		if ($("#bi_5cm").length == 1)//
			$("#bi_5cm").replaceWith($("<span/>").attr("id","bi_5cm").html(parameter_saveOrUpdateEyexsjc.bi_5cm));
		if ($("#bi_40cm").length == 1)
			$("#bi_40cm").replaceWith($("<span/>").attr("id","bi_40cm").html(parameter_saveOrUpdateEyexsjc.bi_40cm));
		if ($("#tjfd_sy").length == 1)
			$("#tjfd_sy").replaceWith($("<span/>").attr("id","tjfd_sy").html(parameter_saveOrUpdateEyexsjc.tjfd_sy));
		if ($("#tjfd_yy").length == 1)
			$("#tjfd_yy").replaceWith($("<span/>").attr("id","tjfd_yy").html(parameter_saveOrUpdateEyexsjc.tjfd_yy));
		if ($("#tjfd_zy").length == 1)
			$("#tjfd_zy").replaceWith($("<span/>").attr("id","tjfd_zy").html(parameter_saveOrUpdateEyexsjc.tjfd_zy));
		if ($("#fxd1_sy").length == 1)
			$("#fxd1_sy").replaceWith($("<span/>").attr("id","fxd1_sy").html(parameter_saveOrUpdateEyexsjc.fxd1_sy));
		if ($("#fxd1_yy").length == 1)
			$("#fxd1_yy").replaceWith($("<span/>").attr("id","fxd1_yy").html(parameter_saveOrUpdateEyexsjc.fxd1_yy));
		if ($("#fxd1_zy").length == 1)
			$("#fxd1_zy").replaceWith($("<span/>").attr("id","fxd1_zy").html(parameter_saveOrUpdateEyexsjc.fxd1_zy));
		if ($("#fxd2_sy").length == 1)
			$("#fxd2_sy").replaceWith($("<span/>").attr("id","fxd2_sy").html(parameter_saveOrUpdateEyexsjc.fxd2_sy));
		if ($("#fxd2_yy").length == 1)
			$("#fxd2_yy").replaceWith($("<span/>").attr("id","fxd2_yy").html(parameter_saveOrUpdateEyexsjc.fxd2_yy));
		if ($("#fxd2_zy").length == 1)
			$("#fxd2_zy").replaceWith($("<span/>").attr("id","fxd2_zy").html(parameter_saveOrUpdateEyexsjc.fxd2_zy));
		if ($("#tjzh_1").length == 1)
			$("#tjzh_1").replaceWith($("<span/>").attr("id","tjzh_1").html(parameter_saveOrUpdateEyexsjc.tjzh_1));
		if ($("#tjzh_2").length == 1)
			$("#tjzh_2").replaceWith($("<span/>").attr("id","tjzh_2").html(parameter_saveOrUpdateEyexsjc.tjzh_2));
		if ($("#tjzh_3").length == 1)
			$("#tjzh_3").replaceWith($("<span/>").attr("id","tjzh_3").html(parameter_saveOrUpdateEyexsjc.tjzh_3));
		if ($("#tjzh_4").length == 1)
			$("#tjzh_4").replaceWith($("<span/>").attr("id","tjzh_4").html(parameter_saveOrUpdateEyexsjc.tjzh_4));
		if ($("#tjzh_5").length == 1)
			$("#tjzh_5").replaceWith($("<span/>").attr("id","tjzh_5").html(parameter_saveOrUpdateEyexsjc.tjzh_5));
		if ($("#tjzh_6").length == 1)
			$("#tjzh_6").replaceWith($("<span/>").attr("id","tjzh_6").html(parameter_saveOrUpdateEyexsjc.tjzh_6));
		if ($("#tjzh_7").length == 1)
			$("#tjzh_7").replaceWith($("<span/>").attr("id","tjzh_7").html(parameter_saveOrUpdateEyexsjc.tjzh_7));
		if ($("#tjzh_8").length == 1)
			$("#tjzh_8").replaceWith($("<span/>").attr("id","tjzh_8").html(parameter_saveOrUpdateEyexsjc.tjzh_8));
		if ($("#tjzh_9").length == 1)
			$("#tjzh_9").replaceWith($("<span/>").attr("id","tjzh_9").html(parameter_saveOrUpdateEyexsjc.tjzh_9));
		
		if ($("#npc_1").length == 1)
			$("#npc_1").replaceWith($("<span/>").attr("id","npc_1").html(parameter_saveOrUpdateEyexsjc.npc_1));
		if ($("#npc_4").length == 1)
			$("#npc_4").replaceWith($("<span/>").attr("id","npc_4").html(parameter_saveOrUpdateEyexsjc.npc_4));
		if ($("#npc_7").length == 1)
			$("#npc_7").replaceWith($("<span/>").attr("id","npc_7").html(parameter_saveOrUpdateEyexsjc.npc_7));
		if ($("#npc_10").length == 1)
			$("#npc_10").replaceWith($("<span/>").attr("id","npc_10").html(parameter_saveOrUpdateEyexsjc.npc_10));
		if ($("#npc_2").length == 1)
			$("#npc_2").replaceWith($("<span/>").attr("id","npc_2").html(parameter_saveOrUpdateEyexsjc.npc_2));
		if ($("#npc_5").length == 1)
			$("#npc_5").replaceWith($("<span/>").attr("id","npc_5").html(parameter_saveOrUpdateEyexsjc.npc_5));
		if ($("#npc_8").length == 1)
			$("#npc_8").replaceWith($("<span/>").attr("id","npc_8").html(parameter_saveOrUpdateEyexsjc.npc_8));
		if ($("#npc_11").length == 1)
			$("#npc_11").replaceWith($("<span/>").attr("id","npc_11").html(parameter_saveOrUpdateEyexsjc.npc_11));
		if ($("#npc_3").length == 1)
			$("#npc_3").replaceWith($("<span/>").attr("id","npc_3").html(parameter_saveOrUpdateEyexsjc.npc_3));
		if ($("#npc_6").length == 1)
			$("#npc_6").replaceWith($("<span/>").attr("id","npc_6").html(parameter_saveOrUpdateEyexsjc.npc_6));
		if ($("#npc_9").length == 1)
			$("#npc_9").replaceWith($("<span/>").attr("id","npc_9").html(parameter_saveOrUpdateEyexsjc.npc_9));
		if ($("#npc_12").length == 1)
			$("#npc_12").replaceWith($("<span/>").attr("id","npc_12").html(parameter_saveOrUpdateEyexsjc.npc_12));
		if ($("#zmd_b1_5m").length == 1)
			$("#zmd_b1_5m").replaceWith($("<span/>").attr("id","zmd_b1_5m").html(parameter_saveOrUpdateEyexsjc.zmd_b1_5m));
		if ($("#zmd_b0_5m").length == 1)
			$("#zmd_b0_5m").replaceWith($("<span/>").attr("id","zmd_b0_5m").html(parameter_saveOrUpdateEyexsjc.zmd_b0_5m));
		if ($("#czfcl_5m").length == 1)
			$("#czfcl_5m").replaceWith($("<span/>").attr("id","czfcl_5m").html(parameter_saveOrUpdateEyexsjc.czfcl_5m));
		if ($("#zmd_b1_40m").length == 1)
			$("#zmd_b1_40m").replaceWith($("<span/>").attr("id","zmd_b1_40m").html(parameter_saveOrUpdateEyexsjc.zmd_b1_40m));
		if ($("#zmd_b0_40m").length == 1)
			$("#zmd_b0_40m").replaceWith($("<span/>").attr("id","zmd_b0_40m").html(parameter_saveOrUpdateEyexsjc.zmd_b0_40m));
		
		if ($("#czfcl_40m").length == 1)
			$("#czfcl_40m").replaceWith($("<span/>").attr("id","czfcl_40m").html(parameter_saveOrUpdateEyexsjc.czfcl_40m));
		if ($("#hfd_b1_5m").length == 1)
			$("#hfd_b1_5m").replaceWith($("<span/>").attr("id","hfd_b1_5m").html(parameter_saveOrUpdateEyexsjc.hfd_b1_5m));
		if ($("#hfd_bo_5m").length == 1)
			$("#hfd_bo_5m").replaceWith($("<span/>").attr("id","hfd_bo_5m").html(parameter_saveOrUpdateEyexsjc.hfd_bo_5m));
		if ($("#bc_1").length == 1)
			$("#bc_1").replaceWith($("<span/>").attr("id","bc_1").html(parameter_saveOrUpdateEyexsjc.bc_1));
		if ($("#hfd_b1_40m").length == 1)
			$("#hfd_b1_40m").replaceWith($("<span/>").attr("id","hfd_b1_40m").html(parameter_saveOrUpdateEyexsjc.hfd_b1_40m));
		if ($("#hfd_bo_40m").length == 1)
			$("#hfd_bo_40m").replaceWith($("<span/>").attr("id","hfd_bo_40m").html(parameter_saveOrUpdateEyexsjc.hfd_bo_40m));
		if ($("#bc_2").length == 1)
			$("#bc_2").replaceWith($("<span/>").attr("id","bc_2").html(parameter_saveOrUpdateEyexsjc.bc_2));
		if ($("#bc_3").length == 1)
			$("#bc_3").replaceWith($("<span/>").attr("id","bc_3").html(parameter_saveOrUpdateEyexsjc.bc_3));
		if ($("#bc_4").length == 1)
			$("#bc_4").replaceWith($("<span/>").attr("id","bc_4").html(parameter_saveOrUpdateEyexsjc.bc_4));
		if ($("#bc_5").length == 1)
			$("#bc_5").replaceWith($("<span/>").attr("id","bc_5").html(parameter_saveOrUpdateEyexsjc.bc_5));
		if ($("#bc_6").length == 1)
			$("#bc_6").replaceWith($("<span/>").attr("id","bc_6").html(parameter_saveOrUpdateEyexsjc.bc_6));
		if ($("#bc_7").length == 1)
			$("#bc_7").replaceWith($("<span/>").attr("id","bc_7").html(parameter_saveOrUpdateEyexsjc.bc_7));
		if ($("#bc_8").length == 1)
			$("#bc_8").replaceWith($("<span/>").attr("id","bc_8").html(parameter_saveOrUpdateEyexsjc.bc_8));
		if ($("#aca").length == 1)
			$("#aca").replaceWith($("<span/>").attr("id","aca").html(parameter_saveOrUpdateEyexsjc.aca));
		if ($("#diag").length == 1)
			$("#diag").replaceWith($("<span/>").attr("id","diag").html(parameter_saveOrUpdateEyexsjc.diag));
		if ($("#demo").length == 1){
			var val = parameter_saveOrUpdateEyexsjc.demo;
			val = val.replace(/\r|\n/g,"<br />");
			while(val.indexOf(" ")!=-1)
				val = val.replace(" ","&nbsp;&nbsp;");
			$("#demo").replaceWith($("<span/>").attr("id","demo").html(val));
		}
		//申请医生
		if ($("#rep_doc").length == 1) 
			$("#rep_doc").replaceWith(
					$("<span/>").attr("id", "rep_doc").html(
							parameter_saveOrUpdateEyexsjc.repDoc_name));
		//检查医生
		if ($("#doctor").length == 1) 
			$("#doctor").replaceWith(
					$("<span/>").attr("id", "doctor").html(
							parameter_saveOrUpdateEyexsjc.doctor_name));
	}
	//添加条形码
	//var barcodeDiv = $("<div/>").attr("class","barcodeDiv").attr("style",
	//"height:40px;width:70px;").appendTo($(".barcodeTd"));
	//var binglihao = $("#caseNumber").html();
	//showBarcode(binglihao,barcodeDiv);
//	utilTool().fdisabled($("#div_reportresult"));// 全部只读
	
	$("#show_div_tiaojiefucou div:gt(0)").find("td").css("font-size","12px").css("font-weight","bold");
	$("#show_div_tiaojiefucou div:gt(0)").find("th").css("font-size","12px").css("font-weight","bold");
	$("#show_div_tiaojiefucou div:gt(0)").find("td").css("height","14px");
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
	var url_saveOrUpdateEyexsjc = "/publish/Eyexsjc/saveOrUpdateEyexsjc.htm";// 暗适应检查报告保存或者修改
	$.extend(parameter_saveOrUpdateEyexsjc,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyexsjc = getJSONData(url_saveOrUpdateEyexsjc,
			parameter_saveOrUpdateEyexsjc, "post");
	if (data_saveOrUpdateEyexsjc.state) {
		$("#div_buttonsytle1").remove();// 操作按钮div
		printBaoGaoLodap("B5 (JIS)");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	} else
		$.oimsError("调节辐辏报告保存失败", function() {

		});
}
// 关闭jsp(整理)
function doClose() {
	window.close();
}
