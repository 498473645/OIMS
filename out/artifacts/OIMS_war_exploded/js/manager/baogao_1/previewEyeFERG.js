$(function() {
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/emr/js/emr_functions.js");
	if (parameter_saveOrUpdateEyeFERG != null) {
		if ($("#sy_type").length == 1) {
			$("#sy_type").replaceWith(
					$("<span/>").attr("id", "sy_type").html(
							parameter_saveOrUpdateEyeFERG.sy_type));
		}
		if ($("#wavePattern_left").length == 1) {
			$("#wavePattern_left").replaceWith(
					$("<span/>").attr("id", "wavePattern_left").html(
							parameter_saveOrUpdateEyeFERG.wavePatternLeft));
		}
		if ($("#wavePattern_right").length == 1) {
			$("#wavePattern_right").replaceWith(
					$("<span/>").attr("id", "wavePattern_right").html(
							parameter_saveOrUpdateEyeFERG.wavePatternRight));
		}
		if ($("#anshi_001_bbo_left").length == 1) {
			$("#anshi_001_bbo_left").replaceWith(
					$("<span/>").attr("id", "anshi_001_bbo_left").html(
							parameter_saveOrUpdateEyeFERG.anshi001BboLeft));
		}
		if ($("#anshi_001_bbo_right").length == 1) {
			$("#anshi_001_bbo_right").replaceWith(
					$("<span/>").attr("id", "anshi_001_bbo_right").html(
							parameter_saveOrUpdateEyeFERG.anshi001BboRight));
		}
		if ($("#anshi30_abo_left").length == 1) {
			$("#anshi30_abo_left").replaceWith(
					$("<span/>").attr("id", "anshi30_abo_left").html(
							parameter_saveOrUpdateEyeFERG.anshi30AboLeft));
		}
		if ($("#anshi30_bbo_left").length == 1) {
			$("#anshi30_bbo_left").replaceWith(
					$("<span/>").attr("id", "anshi30_bbo_left").html(
							parameter_saveOrUpdateEyeFERG.anshi30BboLeft));
		}
		if ($("#anshi30_abo_right").length == 1) {
			$("#anshi30_abo_right").replaceWith(
					$("<span/>").attr("id", "anshi30_abo_right").html(
							parameter_saveOrUpdateEyeFERG.anshi30AboRight));
		}
		if ($("#anshi30_bbo_right").length == 1) {
			$("#anshi30_bbo_right").replaceWith(
					$("<span/>").attr("id", "anshi30_bbo_right").html(
							parameter_saveOrUpdateEyeFERG.anshi30BboRight));
		}
		
		if ($("#anshi30_OP2bo_left").length == 1) {
			$("#anshi30_OP2bo_left").replaceWith(
					$("<span/>").attr("id", "anshi30_OP2bo_left").html(
							parameter_saveOrUpdateEyeFERG.anshi30Op2BoLeft));
		}
		if ($("#anshi30_OP2bo_right").length == 1) {
			$("#anshi30_OP2bo_right").replaceWith(
					$("<span/>").attr("id", "anshi30_OP2bo_right").html(
							parameter_saveOrUpdateEyeFERG.anshi30Op2BoRight));
		}
		
		if ($("#anshi100_abo_left").length == 1) {
			$("#anshi100_abo_left").replaceWith(
					$("<span/>").attr("id", "anshi100_abo_left").html(
							parameter_saveOrUpdateEyeFERG.anshi100AboLeft));
		}
		if ($("#anshi100_bbo_left").length == 1) {
			$("#anshi100_bbo_left").replaceWith(
					$("<span/>").attr("id", "anshi100_bbo_left").html(
							parameter_saveOrUpdateEyeFERG.anshi100BboLeft));
		}
		if ($("#anshi100_abo_right").length == 1) {
			$("#anshi100_abo_right").replaceWith(
					$("<span/>").attr("id", "anshi100_abo_right").html(
							parameter_saveOrUpdateEyeFERG.anshi100AboRight));
		}
		if ($("#anshi100_bbo_right").length == 1) {
			$("#anshi100_bbo_right").replaceWith(
					$("<span/>").attr("id", "anshi100_bbo_right").html(
							parameter_saveOrUpdateEyeFERG.anshi100BboRight));
		}
		
		if ($("#mingshi30_abo_left").length == 1) {
			$("#mingshi30_abo_left").replaceWith(
					$("<span/>").attr("id", "mingshi30_abo_left").html(
							parameter_saveOrUpdateEyeFERG.mingshi30AboLeft));
		}
		if ($("#mingshi30_bbo_left").length == 1) {
			$("#mingshi30_bbo_left").replaceWith(
					$("<span/>").attr("id", "mingshi30_bbo_left").html(
							parameter_saveOrUpdateEyeFERG.mingshi30BboLeft));
		}
		if ($("#mingshi30_abo_right").length == 1) {
			$("#mingshi30_abo_right").replaceWith(
					$("<span/>").attr("id", "mingshi30_abo_right").html(
							parameter_saveOrUpdateEyeFERG.mingshi30AboRight));
		}
		if ($("#mingshi30_bbo_right").length == 1) {
			$("#mingshi30_bbo_right").replaceWith(
					$("<span/>").attr("id", "mingshi30_bbo_right").html(
							parameter_saveOrUpdateEyeFERG.mingshi30BboRight));
		}
		
		if ($("#mingshi30HZ_OP2bo_left").length == 1) {
			$("#mingshi30HZ_OP2bo_left").replaceWith(
					$("<span/>").attr("id", "mingshi30HZ_OP2bo_left").html(
							parameter_saveOrUpdateEyeFERG.mingshi30HZOp2BoLeft));
		}
		if ($("#mingshi30HZ_OP2bo_right").length == 1) {
			$("#mingshi30HZ_OP2bo_right").replaceWith(
					$("<span/>").attr("id", "mingshi30HZ_OP2bo_right").html(
							parameter_saveOrUpdateEyeFERG.mingshi30HZOp2BoRight));
		}
		if ($("#checkType").length == 1) {
			$("#checkType").replaceWith(
					$("<span/>").attr("id", "checkType").html(
							parameter_saveOrUpdateEyeFERG.checkType));
		}
		
		if ($("#eye_compare").length == 1) {
			var eye_compare = parameter_saveOrUpdateEyeFERG.eyeCompare;
			while(eye_compare.indexOf(" ")!=-1)
				eye_compare = eye_compare.replace(" ","&nbsp;&nbsp;");
			eye_compare = eye_compare.replace(/\r|\n/g,"<br />");
			$("#eye_compare").replaceWith(
					$("<span/>").attr("id", "eye_compare").html(eye_compare));
		}
		if ($("#rep_doc").length == 1) {
			$("#rep_doc").replaceWith(
					$("<span/>").attr("id", "rep_doc").html(
							parameter_saveOrUpdateEyeFERG.rep_doc_name));
		}
		if ($("#doctor").length == 1) {
			$("#doctor").replaceWith(
					$("<span/>").attr("id", "doctor").html(
							parameter_saveOrUpdateEyeFERG.doctor_name));
		}
		if ($("#demo").length == 1) {
			var demo = parameter_saveOrUpdateEyeFERG.demo;
			while(demo.indexOf(" ")!=-1)
				demo = demo.replace(" ","&nbsp;&nbsp;");
			demo = demo.replace(/\r|\n/g,"<br />");
			$("#demo").replaceWith(
					$("<span/>").attr("id", "demo").html(demo));
		}
	}
	//添加条形码
	var barcodeDiv = $("<div/>").attr("class","barcodeDiv").attr("style",
	"height:44px;width:80px;").appendTo($(".barcodeTd"));
	var binglihao = $("#caseNumber").html();
	showBarcode(binglihao,barcodeDiv);
	$("#show_div_ferg table").css("font-size","12px");
	$("#show_div_ferg table").find("td").css("height","auto");
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
	debugger ;
	if(_d.length==1){
		$("#_tr_shqm").find('div').show() ;
		debugger;
		$("#_tr_shqm").find('div').css('top',_p.top-25) ;
	}
});

// 打印页面(整理)
function doPrintbaogao() {
	var url_saveOrUpdateEyeFERG = "/publish/EyeFERG/saveOrUpdateEyeFERG.htm";
	$.extend(parameter_saveOrUpdateEyeFERG,{'baogaoState':oimsCategory.BAOGAO_STATE_TQ});
	var data_saveOrUpdateEyeFERG = getJSONData(url_saveOrUpdateEyeFERG,
			parameter_saveOrUpdateEyeFERG, "post");
	if (data_saveOrUpdateEyeFERG.state) {
		$("#div_buttonsytle1").remove();// 操作按钮div
		printBaoGaoLodap("B5 (JIS)");
		window.opener.document.getElementById("isprintsuc").value="1";
		window.close();
	} else
		$.oimsError("电生理FERG保存失败", function() {

		});
}
// 关闭jsp(整理)
function doClose() {
	window.close();
}