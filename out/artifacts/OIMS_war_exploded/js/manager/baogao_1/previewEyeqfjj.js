﻿//前房角镜首次加载(整理)
$(function() {
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyeqfjj != null) {
		if ($("#seq_r_1_s").length == 1) {
			$("#seq_r_1_s").replaceWith(
			$("<span/>").attr("id","seq_r_1_s").html(parameter_saveOrUpdateEyeqfjj.seq_r_1_s));
		}
		if ($("#seq_r_1_d").length == 1) {
			$("#seq_r_1_d").replaceWith(
			$("<span/>").attr("id","seq_r_1_d").html(parameter_saveOrUpdateEyeqfjj.seq_r_1_d));
		}
		if ($("#seq_r_2_s").length == 1) {
			$("#seq_r_2_s").replaceWith(
			$("<span/>").attr("id","seq_r_2_s").html(parameter_saveOrUpdateEyeqfjj.seq_r_2_s));
		}
		if ($("#seq_r_2_d").length == 1) {
			$("#seq_r_2_d").replaceWith(
			$("<span/>").attr("id","seq_r_2_d").html(parameter_saveOrUpdateEyeqfjj.seq_r_2_d));
		}
		if ($("#seq_r_3_s").length == 1) {
			$("#seq_r_3_s").replaceWith(
			$("<span/>").attr("id","seq_r_3_s").html(parameter_saveOrUpdateEyeqfjj.seq_r_3_s));
		}
		if ($("#seq_r_3_d").length == 1) {
			$("#seq_r_3_d").replaceWith(
			$("<span/>").attr("id","seq_r_3_d").html(parameter_saveOrUpdateEyeqfjj.seq_r_3_d));
		}
		if ($("#seq_r_4_s").length == 1) {
			$("#seq_r_4_s").replaceWith(
			$("<span/>").attr("id","seq_r_4_s").html(parameter_saveOrUpdateEyeqfjj.seq_r_4_s));
		}
		if ($("#seq_r_4_d").length == 1) {
			$("#seq_r_4_d").replaceWith(
			$("<span/>").attr("id","seq_r_4_d").html(parameter_saveOrUpdateEyeqfjj.seq_r_4_d));
		}

		if ($("#seq_l_1_s").length == 1) {
			$("#seq_l_1_s").replaceWith(
			$("<span/>").attr("id","seq_l_1_s").html(parameter_saveOrUpdateEyeqfjj.seq_l_1_s));
		}
		if ($("#seq_l_1_d").length == 1) {
			$("#seq_l_1_d").replaceWith(
			$("<span/>").attr("id","seq_l_1_d").html(parameter_saveOrUpdateEyeqfjj.seq_l_1_d));
		}
		if ($("#seq_l_2_s").length == 1) {
			$("#seq_l_2_s").replaceWith(
			$("<span/>").attr("id","seq_l_2_s").html(parameter_saveOrUpdateEyeqfjj.seq_l_2_s));
		}
		if ($("#seq_l_2_d").length == 1) {
			$("#seq_l_2_d").replaceWith(
			$("<span/>").attr("id","seq_l_2_d").html(parameter_saveOrUpdateEyeqfjj.seq_l_2_d));
		}
		if ($("#seq_l_3_s").length == 1) {
			$("#seq_l_3_s").replaceWith(
			$("<span/>").attr("id","seq_l_3_s").html(parameter_saveOrUpdateEyeqfjj.seq_l_3_s));
		}
		if ($("#seq_l_3_d").length == 1) {
			$("#seq_l_3_d").replaceWith(
			$("<span/>").attr("id","seq_l_3_d").html(parameter_saveOrUpdateEyeqfjj.seq_l_3_d));
		}
		if ($("#seq_l_4_s").length == 1) {
			$("#seq_l_4_s").replaceWith(
			$("<span/>").attr("id","seq_l_4_s").html(parameter_saveOrUpdateEyeqfjj.seq_l_4_s));
		}
		if ($("#seq_l_4_d").length == 1) {
			$("#seq_l_4_d").replaceWith(
			$("<span/>").attr("id","seq_l_4_d").html(parameter_saveOrUpdateEyeqfjj.seq_l_4_d));
		}
		if ($("#memo").length == 1) {
			var demo = parameter_saveOrUpdateEyeqfjj.memo;
			while(demo.indexOf(" ")!=-1)
				demo = demo.replace(" ","&nbsp;&nbsp;");
			demo = demo.replace(/\r|\n/g,"<br />");
			$("#memo").replaceWith(
					$("<span/>").attr("id","memo").html(demo));
		}

		//申请医生
		if ($("#rep_doc").length == 1) 
			$("#rep_doc").replaceWith(
					$("<span/>").attr("id", "rep_doc").html(
							parameter_saveOrUpdateEyeqfjj.rep_doc_name));
		//检查医生
		if ($("#doctor").length == 1) 
			$("#doctor").replaceWith(
					$("<span/>").attr("id", "doctor").html(
							parameter_saveOrUpdateEyeqfjj.doctor_name));

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
	var url_saveOrUpdateEyeqfjj = "/publish/Eyeqfjj/saveOrUpdateEyeqfjj.htm";
	$.extend(parameter_saveOrUpdateEyeqfjj,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyeqfjj = getJSONData(url_saveOrUpdateEyeqfjj,
			parameter_saveOrUpdateEyeqfjj, "post");
	if (data_saveOrUpdateEyeqfjj.state) {
		$("#div_buttonsytle1").remove();// 操作按钮div
		printBaoGaoLodap("B5 (JIS)");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	} else
		$.oimsError("前房角镜报告保存失败", function() {

		});
}
// 关闭jsp(整理)
function doClose() {
	window.close();
}