//眼位眼肌
var data_eyeywyj_syyd = [ {
	value : '',
	text : ''
}, {
	value : '+1',
	text : '+1'
}, {
	value : '+2',
	text : '+2'
}, {
	value : '+3',
	text : '+3'
}, {
	value : '-1',
	text : '-1'
}, {
	value : '-2',
	text : '-2'
}, {
	value : '-3',
	text : '-3'
}];
var data_eyeywyj_dctw = [ {
	value : '无',
	text : '无'
}, {
	value : '头向右倾斜，面向右转，下颌内收',
	text : '头向右倾斜，面向右转，下颌内收'
}, {
	value : '头向左倾斜，面向左转，下颌内收',
	text : '头向左倾斜，面向左转，下颌内收'
}, {
	value : '头向右倾斜，面向左转，下颌内收',
	text : '头向右倾斜，面向左转，下颌内收'
}, {
	value : '头向左倾斜，面向右转，下颌上台',
	text : '头向左倾斜，面向右转，下颌上台'
}, {
	value : '头向左倾斜，面向左转，下颌上台',
	text : '头向左倾斜，面向左转，下颌上台'
}, {
	value : '头向左倾斜，面向右转，下颌上台',
	text : '头向左倾斜，面向左转，下颌上台'
}, {
	value : '头向左倾斜，面向右转，下颌内收',
	text : '头向左倾斜，面向左转，下颌内收'
}];
function initData_eyeywyj() {
	//左上直肌
	if ($("#sy_l_szj").length == 1) {
		for ( var i = 0; i < data_eyeywyj_syyd.length; i++)
			$(
					"<option value=\""
							+ data_eyeywyj_syyd[i].value
							+ "\">" + data_eyeywyj_syyd[i].text
							+ "</option>").appendTo("#sy_l_szj");
	}
	//左外直肌
	if ($("#sy_l_wzj").length == 1) {
		for ( var i = 0; i < data_eyeywyj_syyd.length; i++)
			$(
					"<option value=\""
							+ data_eyeywyj_syyd[i].value
							+ "\">" + data_eyeywyj_syyd[i].text
							+ "</option>").appendTo("#sy_l_wzj");
	}
	//左下直肌
	if ($("#sy_l_xzj").length == 1) {
		for ( var i = 0; i < data_eyeywyj_syyd.length; i++)
			$(
					"<option value=\""
							+ data_eyeywyj_syyd[i].value
							+ "\">" + data_eyeywyj_syyd[i].text
							+ "</option>").appendTo("#sy_l_xzj");
	}
	//左下斜肌
	if ($("#sy_l_xxj").length == 1) {
		for ( var i = 0; i < data_eyeywyj_syyd.length; i++)
			$(
					"<option value=\""
							+ data_eyeywyj_syyd[i].value
							+ "\">" + data_eyeywyj_syyd[i].text
							+ "</option>").appendTo("#sy_l_xxj");
	}
	//左内直肌
	if ($("#sy_l_lzj").length == 1) {
		for ( var i = 0; i < data_eyeywyj_syyd.length; i++)
			$(
					"<option value=\""
							+ data_eyeywyj_syyd[i].value
							+ "\">" + data_eyeywyj_syyd[i].text
							+ "</option>").appendTo("#sy_l_lzj");
	}
	//左上斜肌
	if ($("#sy_l_sxj").length == 1) {
		for ( var i = 0; i < data_eyeywyj_syyd.length; i++)
			$(
					"<option value=\""
							+ data_eyeywyj_syyd[i].value
							+ "\">" + data_eyeywyj_syyd[i].text
							+ "</option>").appendTo("#sy_l_sxj");
	}
	//右上直肌
	if ($("#sy_r_szj").length == 1) {
		for ( var i = 0; i < data_eyeywyj_syyd.length; i++)
			$(
					"<option value=\""
							+ data_eyeywyj_syyd[i].value
							+ "\">" + data_eyeywyj_syyd[i].text
							+ "</option>").appendTo("#sy_r_szj");
	}
	//右外直肌
	if ($("#sy_r_wzj").length == 1) {
		for ( var i = 0; i < data_eyeywyj_syyd.length; i++)
			$(
					"<option value=\""
					+ data_eyeywyj_syyd[i].value
					+ "\">" + data_eyeywyj_syyd[i].text
					+ "</option>").appendTo("#sy_r_wzj");
	}
	//右下直肌
	if ($("#sy_r_xzj").length == 1) {
		for ( var i = 0; i < data_eyeywyj_syyd.length; i++)
			$(
					"<option value=\""
					+ data_eyeywyj_syyd[i].value
					+ "\">" + data_eyeywyj_syyd[i].text
					+ "</option>").appendTo("#sy_r_xzj");
	}
	//右下斜肌
	if ($("#sy_r_xxj").length == 1) {
		for ( var i = 0; i < data_eyeywyj_syyd.length; i++)
			$(
					"<option value=\""
					+ data_eyeywyj_syyd[i].value
					+ "\">" + data_eyeywyj_syyd[i].text
					+ "</option>").appendTo("#sy_r_xxj");
	}
	//右内直肌
	if ($("#sy_r_lzj").length == 1) {
		for ( var i = 0; i < data_eyeywyj_syyd.length; i++)
			$(
					"<option value=\""
					+ data_eyeywyj_syyd[i].value
					+ "\">" + data_eyeywyj_syyd[i].text
					+ "</option>").appendTo("#sy_r_lzj");
	}
	//右上斜肌
	if ($("#sy_r_sxj").length == 1) {
		for ( var i = 0; i < data_eyeywyj_syyd.length; i++)
			$(
					"<option value=\""
					+ data_eyeywyj_syyd[i].value
					+ "\">" + data_eyeywyj_syyd[i].text
					+ "</option>").appendTo("#sy_r_sxj");
	}
	//代偿头位
	if ($("#dctw").length == 1) {
		for ( var i = 0; i < data_eyeywyj_dctw.length; i++)
			$(
					"<option value=\""
					+ data_eyeywyj_dctw[i].value
					+ "\">" + data_eyeywyj_dctw[i].text
					+ "</option>").appendTo("#dctw");
	}
	// 申请医生下拉框赋值
//	if ($("#rep_doc").length == 1) {
//		var data_getKaiDanDoctorByQuanxian = getJSONData(
//				"/publish/yuangong/getKaiDanDoctorByQuanxian.htm", {
//					tag : Math.random()
//				}, "post");
//		if (data_getKaiDanDoctorByQuanxian.state) {
//			var yuangonglist = data_getKaiDanDoctorByQuanxian.obj;
//			$.each(yuangonglist, function(i, yuangong) {
//				$(
//						"<option value=\"" + yuangong.gonghao + "\">"
//								+ yuangong.xingming + "</option>").appendTo(
//						"#rep_doc");
//			});
//		}
//	}
	// 检查医生下拉框赋值
	if ($("#doctor").length == 1) {
		var data_getJianChaDoctorByBumenAndQuanxian = getJSONData(
				"/publish/yuangong/getJianChaDoctorByBumenAndQuanxian.htm", {// 获取具有检查权限的医生
					tag : Math.random()
				}, "post");
		if (data_getJianChaDoctorByBumenAndQuanxian.state) {
			var yuangonglist = data_getJianChaDoctorByBumenAndQuanxian.obj;
			$.each(yuangonglist, function(i, yuangong) {
				$(
						"<option value=\"" + yuangong.gonghao + "\">"
								+ yuangong.xingming + "</option>").appendTo(
						"#doctor");
			});
		}
	}
	/***************************输入模板初始化*********************/
	//角膜映光法
	$(".jmygf").each(function(index,input){
		var input_id = $(input).attr("id");
		$("#"+input_id).click(function(){
			var position = $(this).position();
			var left = position.left;
			var top = position.top;
			//console.log($("#show_div_yanweiyanji").width()+","+$("#blk1").width()+","+position.left+","+$('body div:eq(0)').width());
			if($("#show_div_yanweiyanji").width()-position.left<$("#blk1").width()){
				left = $("#show_div_yanweiyanji").width()-$("#blk1").width()+25;
			}
			$(".blk_a").hide();
			$(".blk_b").hide();
			$("#blk1").css({
			"display":"block",
			left:left,
			top:top+25,
			});
			$("#confirm1").unbind('click').bind("click", function(){
				var nx = $("#nx").val();
				var rl = $("#rl").val();
				var sz = $("#sz").val();
				if($("#"+input_id).length==1)
				$("#"+input_id).val(nx+"、"+rl+"、"+sz);
				$("#blk1").hide();
				});	
			$("#close1").unbind("click").bind("click",function(){
				$("#blk1").hide();
			});
		});
	});
	//遮盖与不遮盖
	$("#zg_con").click(function(){
		var position = $(this).position();
		var left = position.left;
		var top = position.top;
		$(".blk_a").hide();
		$(".blk_b").hide();
		$("#blk2").css("display","block").css("left",left).css("top",top+25);
	});
	$("#confirm2").bind("click",function(){
			var wz_2 = $("#wz_2").val();
			var nx_2 = $("#nx_2").val();
			var sz_2 = $("#sz_2").val();
			var jcf = $("#jcf").val();
			var wgyq = $("#wgyq").val();
			var bgyq = $("#bgyq").val();
			var jielun = $("#jielun").val();
			var str2 =  wz_2+"、"+nx_2+"、"+sz_2+"、"+jcf+"、"+wgyq+"、"+bgyq+"、"+jielun;
			$("#zg_con").val(str2);
			$("#blk2").hide();
			});
		$("#close2").bind("click",function(){
				$("#blk2").hide();
			});
	//眼球运动
	$("#yq_con").click(function(){
		var position = $(this).position();
		var left = position.left;
		var top = position.top;
		$(".blk_a").hide();
		$(".blk_b").hide();
		$("#blk3").css("display","block").css("left",left).css("top",top+25);
	});
	$("#confirm3").bind("click",function(){
			var syyd = $("#syyd").val();
			var syzj = $("#syzj").val();
			var zt = $("#zt").val();
			var str3 =  syyd+"、"+syzj+"、"+zt;
			$("#yq_con").val(str3);
			$("#blk3").hide();
	});
	$("#close3").bind("click",function(){
				$("#blk3").hide();
			});
	//辐辏运动
	$("#fzyd_value").change(function(){
		var selectText = $(this).find("option:selected").text();
		if($("#fzyd").length==1)
		$("#fzyd").val(selectText);
		return false;
	});
	
	//A-V现
	$("#a_v_xx_value").change(function(){
		var selectText = $(this).find("option:selected").text();
		if($("#a_v_xx").length==1)
		$("#a_v_xx").val(selectText);
		return false;
	});
	//注释性质
	$("#zsxz").click(function(){
		var position = $("#zsxz").position();
		var left = position.left;
		var top = position.top;
		$(".blk_a").hide();
		$(".blk_b").hide();
		$("#blk4").css("display","block").css("left",left).css("top",top+225);
	});
	$("#confirm4").bind("click",function(){
			var yanbie_a = $("#yanbie_a").val();
			var zsxz_a = $("#zsxz_a").val();
			var str4 =  yanbie_a+"、"+zsxz_a;
			$("#zsxz").val(str4);
			$("#blk4").hide();
	});
	$("#close4").bind("click",function(){
				$("#blk4").hide();
			});
	/***************************输入模板初始化*********************/
	
	// 查询该报告页面所有元素信息
	var url_outBaogaoHelp = "/publish/baogao/outBaogaoHelp.htm";
	var patameter_outBaogaoHelp = {
		id : dataObjects_choice[0].jcdid,// 检查单ID
		huanzheId : dataObjects_choice[0].huanzheId,// 患者ID
		tag : Math.random()
	};
	var data_outBaogaoHelp = getJSONData(url_outBaogaoHelp,
			patameter_outBaogaoHelp, "post");
	if (data_outBaogaoHelp.state) {
		initial_Baogao(data_outBaogaoHelp.obj);// 报告页面各元素赋值
	}
	//根ywyj报告对象查询符合条件的ywyj报告对象
	var url_selectEyeywyjByEyeywyj = "/publish/Eyeywyj/selectEyeywyjByEyeywyj.htm";
	var data_selectEyeywyjByEyeywyj = getJSONData(
			url_selectEyeywyjByEyeywyj, {
				jcdId : dataObjects_choice[0].jcdid,
				tag : Math.random()
			}, "post");
	if (data_selectEyeywyjByEyeywyj.state) {
		var eyeywyj = data_selectEyeywyjByEyeywyj.obj;
		if (eyeywyj != null) {
			if ($("#ly_r_33").length == 1)
				$("#ly_r_33").val(eyeywyj.ly_r_33);//裸眼右
			if ($("#ly_r_5").length == 1)
				$("#ly_r_5").val(eyeywyj.ly_r_5);
			if ($("#ly_l_33").length == 1)
				$("#ly_l_33").val(eyeywyj.ly_l_33);//裸眼左
			if ($("#ly_l_5").length == 1)
				$("#ly_l_5").val(eyeywyj.ly_l_5);
			if ($("#dj_r_33").length == 1)
				$("#dj_r_33").val(eyeywyj.dj_r_33);//戴镜右
			if ($("#dj_r_5").length == 1)
				$("#dj_r_5").val(eyeywyj.dj_r_5);
			if ($("#dj_l_33").length == 1)
				$("#dj_l_33").val(eyeywyj.dj_l_33);//戴镜左
			if ($("#dj_l_5").length == 1)
				$("#dj_l_5").val(eyeywyj.dj_l_5);
			if ($("#zg_con").length == 1)
				$("#zg_con").val(eyeywyj.zg_con);//遮盖与不遮盖法
			if ($("#yq_con").length == 1)
				$("#yq_con").val(eyeywyj.yq_con);//眼球运动
			if ($("#sy_r_szj").length == 1)
				$("#sy_r_szj").val(eyeywyj.sy_r_szj);//右上直肌
			if ($("#sy_r_wzj").length == 1)
				$("#sy_r_wzj").val(eyeywyj.sy_r_wzj);//右外直肌
			if ($("#sy_r_xzj").length == 1)
				$("#sy_r_xzj").val(eyeywyj.sy_r_xzj);//右下直肌
			if ($("#sy_r_xxj").length == 1)
				$("#sy_r_xxj").val(eyeywyj.sy_r_xxj);//右下斜肌
			if ($("#sy_r_lzj").length == 1)
				$("#sy_r_lzj").val(eyeywyj.sy_r_lzj);//右内直肌
			if ($("#sy_r_sxj").length == 1)
				$("#sy_r_sxj").val(eyeywyj.sy_r_sxj);//右上斜肌
			if ($("#sy_l_szj").length == 1)
				$("#sy_l_szj").val(eyeywyj.sy_l_szj);//左上直肌
			if ($("#sy_l_wzj").length == 1)
				$("#sy_l_wzj").val(eyeywyj.sy_l_wzj);//左外直肌
			if ($("#sy_l_xzj").length == 1)
				$("#sy_l_xzj").val(eyeywyj.sy_l_xzj);//左下直肌
			if ($("#sy_l_xxj").length == 1)
				$("#sy_l_xxj").val(eyeywyj.sy_l_xxj);//左下斜肌
			if ($("#sy_l_lzj").length == 1)
				$("#sy_l_lzj").val(eyeywyj.sy_l_lzj);//左内直肌
			if ($("#sy_l_sxj").length == 1)
				$("#sy_l_sxj").val(eyeywyj.sy_l_sxj);//左上斜肌
			if ($("#seg_1").length == 1)
				$("#seg_1").val(eyeywyj.seg_1);//九方位斜视角
			if ($("#seg_2").length == 1)
				$("#seg_2").val(eyeywyj.seg_2);
			if ($("#seg_3").length == 1)
				$("#seg_3").val(eyeywyj.seg_3);
			if ($("#seg_4").length == 1)
				$("#seg_4").val(eyeywyj.seg_4);
			if ($("#seg_5").length == 1)
				$("#seg_5").val(eyeywyj.seg_5);
			if ($("#seg_6").length == 1)
				$("#seg_6").val(eyeywyj.seg_6);
			if ($("#seg_7").length == 1)
				$("#seg_7").val(eyeywyj.seg_7);
			if ($("#seg_8").length == 1)
				$("#seg_8").val(eyeywyj.seg_8);
			if ($("#seg_9").length == 1)
				$("#seg_9").val(eyeywyj.seg_9);
			if ($("#fzyd").length == 1)
				$("#fzyd").val(eyeywyj.fzyd);//辐辏运动
			if ($("#a_v_xx").length == 1)
				$("#a_v_xx").val(eyeywyj.a_v_xx);//A-V现象
			if ($("#dctw").length == 1)
				$("#dctw").val(eyeywyj.dctw);//代偿头位
			if ($("#zsxz").length == 1)
				$("#zsxz").val(eyeywyj.zsxz);//注视性质
			if ($("#jlsy").length == 1)
				$("#jlsy").val(eyeywyj.jlsy);//牵拉试验
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyeywyj.cliDate);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyeywyj.repDoc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyeywyj.doctor);// 检查医生
			if (data_outBaogaoHelp.obj.reportDate != eyeywyj.cliDate) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyeywyj);
			}
		}
	}
}

// ywyj检查报告保存
function saveOrUpdateEyeywyj(state) {
	var parameter_saveOrUpdateEyeywyj = validateAndGetValue_eyeywyj();
	var url_saveOrUpdateEyeywyj = "/publish/Eyeywyj/saveOrUpdateEyeywyj.htm";// ywyj检查报告保存
	var data_saveOrUpdateEyeywyj = getJSONData(
			url_saveOrUpdateEyeywyj,
			parameter_saveOrUpdateEyeywyj,
			"post");
	if (data_saveOrUpdateEyeywyj.state)
		$.oimsSucc("眼位眼肌检查报告保存成功", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待检患者界面
				closeReporeDialog();
			}
		});
	else
		$.oimsError("眼位眼肌检查报告保存失败", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待检患者界面
				closeReporeDialog();
			}
		});
}

// ywyj检查报告打印预览
function previewEyeywyj() {
	var parameter_saveOrUpdateEyeywyj = validateAndGetValue_eyeywyj();
	parameter_saveOrUpdateEyeywyj = JSON.stringify(
			parameter_saveOrUpdateEyeywyj)
			.replace(new RegExp("\"", "gm"), "'");
	var html_div_reportresult = "<div id='div_reportresult'>"
			+ $("#div_reportresult").html() + "</div>";// 报告内容
	var printWindow = window.open("");
	html_baogao = "";
	html_baogao += "<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'>";
	html_baogao += "<html>";
	html_baogao += "<head>";
	html_baogao += "<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>";
	html_baogao += "<title>报告预览</title>";
	html_baogao += "<script language='javascript'> var contextPath='"
			+ contextPath + "';</script>";
	html_baogao += "<link rel='stylesheet' type='text/css' href='"
			+ contextPath + "/css/main.css' rel='stylesheet' type='text/css'>";
	html_baogao += "<link rel='stylesheet' type='text/css' href='"
			+ contextPath
			+ "/style/green/css/green.css' rel='stylesheet' type='text/css'>";
	html_baogao += "<link rel='stylesheet' type='text/css' href='"
			+ contextPath + "/css/icon.css' rel='stylesheet' type='text/css'>";
	html_baogao += "<link rel='stylesheet' type='text/css' href='"
			+ contextPath
			+ "/style/green/css/openWin.css' rel='stylesheet' type='text/css'>";
	html_baogao += "<script src='" + contextPath
			+ "/js/jquery.min.js'></script>";
	html_baogao += "<script src='" + contextPath + "/js/common.js'></script>";
	html_baogao += "<script src='" + contextPath
			+ "/js/jquery.oimsDialog.js'></script>";
	html_baogao += "<script src='" + contextPath
			+ "/js/oimsCategory.config.js'></script>";
	html_baogao += "<script src='" + contextPath
			+ "/js/manager/baogao/language.config.js'></script>";
	html_baogao += "<script src='" + contextPath
			+ "/js/manager/baogao/previewEyeywyj.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyeywyj="
			+ parameter_saveOrUpdateEyeywyj + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}
function validateAndGetValue_eyeywyj(){
	var oValidataData = {
			nullValidataData : {
				
			}
		};
		var sReturn = fnFormValidata(oValidataData);
		if (sReturn != null) {
			$.oimsAlert(sReturn);// 带*为必填项
			return;
		}
		var jcdId = dataObjects_choice[0].jcdid;// 检查单ID
		var ly_r_33 = $("#ly_r_33").val();//裸眼右
		var ly_r_5 = $("#ly_r_5").val();
		var ly_l_33 = $("#ly_l_33").val();//裸眼左
		var ly_l_5 = $("#ly_l_5").val();
		var dj_r_33 = $("#dj_r_33").val();//戴镜右
		var dj_r_5 = $("#dj_r_5").val();
		var dj_l_33 = $("#dj_l_33").val();//戴镜左
		var dj_l_5 = $("#dj_l_5").val();
		var zg_con = $("#zg_con").val();//遮盖与不遮盖法
		var yq_con = $("#yq_con").val();//眼球运动
		var sy_r_szj = $("#sy_r_szj").val();//右上直肌
		var sy_r_wzj = $("#sy_r_wzj").val();//右外直肌
		var sy_r_xzj = $("#sy_r_xzj").val();//右下直肌
		var sy_r_xxj = $("#sy_r_xxj").val();//右下斜肌
		var sy_r_lzj = $("#sy_r_lzj").val();//右内直肌
		var sy_r_sxj = $("#sy_r_sxj").val();//右上斜肌
		var sy_l_szj = $("#sy_l_szj").val();//左上直肌
		var sy_l_wzj = $("#sy_l_wzj").val();//左外直肌
		var sy_l_xzj = $("#sy_l_xzj").val();//左下直肌
		var sy_l_xxj = $("#sy_l_xxj").val();//左下斜肌
		var sy_l_lzj = $("#sy_l_lzj").val();//左内直肌
		var sy_l_sxj = $("#sy_l_sxj").val();//左上斜肌
		var seg_1 = $("#seg_1").val();//九方位斜视角
		var seg_2 = $("#seg_2").val();
		var seg_3 = $("#seg_3").val();
		var seg_4 = $("#seg_4").val();
		var seg_5 = $("#seg_5").val();
		var seg_6 = $("#seg_6").val();
		var seg_7 = $("#seg_7").val();
		var seg_8 = $("#seg_8").val();
		var seg_9 = $("#seg_9").val();
		var fzyd = $("#fzyd").val();//辐辏运动
		var a_v_xx = $("#a_v_xx").val();//A-V现象
		var dctw = $("#dctw").val();//代偿头位
		var zsxz = $("#zsxz").val();//注视性质
		var jlsy = $("#jlsy").val();//牵拉试验
		var repDoc = $("#rep_doc option:selected").val();// 申请医生
		var repDoc_name = $("#rep_doc option:selected").text();// 申请医生姓名
		var doctor = $("#doctor option:selected").val();// 检查医生
		var doctor_name = $("#doctor option:selected").text();// 检查医生姓名
		var cliDate = $("#cli_date ").html();// 报告日期
		var parameter_saveOrUpdateEyeywyj = {
			jcdId : jcdId,// 检查单ID
			ly_r_33 : ly_r_33,
			ly_r_5 : ly_r_5,
			ly_l_33 : ly_l_33,
			ly_l_5 : ly_l_5,
			dj_r_33 : dj_r_33,
			dj_r_5 : dj_r_5,
			dj_l_33 : dj_l_33,
			dj_l_5 : dj_l_5,
			zg_con : zg_con,
			yq_con : yq_con,
			sy_r_szj : sy_r_szj,
			sy_r_wzj : sy_r_wzj,
			sy_r_xzj : sy_r_xzj,
			sy_r_xxj : sy_r_xxj,
			sy_r_lzj : sy_r_lzj,
			sy_r_sxj : sy_r_sxj,
			sy_l_szj : sy_l_szj,
			sy_l_wzj : sy_l_wzj,
			sy_l_xzj : sy_l_xzj,
			sy_l_xxj : sy_l_xxj,
			sy_l_lzj : sy_l_lzj,
			sy_l_sxj : sy_l_sxj,
			seg_1 : seg_1,
			seg_2 : seg_2,
			seg_3 : seg_3,
			seg_4 : seg_4,
			seg_5 : seg_5,
			seg_6 : seg_6,
			seg_7 : seg_7,
			seg_8 : seg_8,
			seg_9 : seg_9,
			fzyd : fzyd,
			a_v_xx : a_v_xx,
			dctw : dctw,
			zsxz : zsxz,
			jlsy : jlsy,
			baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
			repDoc : repDoc,// 申请医生
			doctor : doctor,// 检查医生
			repDoc_name : repDoc_name,// 申请医生姓名
			doctor_name : doctor_name,// 检查医生姓名
			cliDate : cliDate,// 报告日期
			tag : Math.random()
		}
		return parameter_saveOrUpdateEyeywyj;
}