//色觉检查参数设置
var data_eyesjjc_yb = [ {
	value : '',
	text : ''
}, {
	value : '双眼',
	text : '双眼'
}, {
	value : '左眼',
	text : '左眼'
}, {
	value : '右眼',
	text : '右眼'
}];
var date_eyesjjc_zqbrl = [{
	value : '',
	text : ''
},{
	value : '1',
	text : '1'
},{
	value : '2',
	text : '2'
},{
	value : '3',
	text : '3'
},{
	value : '4',
	text : '4'
},{
	value : '5',
	text : '5'
},{
	value : '6',
	text : '6'
},{
	value : '7',
	text : '7'
},{
	value : '8',
	text : '8'
},{
	value : '9',
	text : '9'
},{
	value : '10',
	text : '10'
},{
	value : '11',
	text : '11'
},{
	value : '12',
	text : '12'
}];
var data_eyesjjc_result_1 = [ {
	value : '',
	text : ''
}, {
	value : '正常',
	text : '正常'
}, {
	value : '红色弱',
	text : '红色弱'
}, {
	value : '绿色弱',
	text : '绿色弱'
}, {
	value : '红绿色弱',
	text : '红绿色弱'
}, {
	value : '红色盲',
	text : '红色盲'
}, {
	value : '绿色盲',
	text : '绿色盲'
}, {
	value : '红绿色盲',
	text : '红绿色盲'
}];
var data_eyesjjc_result_2 = [{
	value : '',
	text : ''
}, {
	value : '正常',
	text : '正常'
}, {
	value : '色弱',
	text : '色弱'
}, {
	value : '色盲',
	text : '色盲'
}];

function initData_eyesjjc() {
	//眼别
	if ($("#yb").length == 1) {
		for ( var i = 0; i < data_eyesjjc_yb.length; i++)
			$(
					"<option value=\""
							+ data_eyesjjc_yb[i].value
							+ "\">" + data_eyesjjc_yb[i].text
							+ "</option>").appendTo("#yb");
	}
	//几何图
	if ($("#geo").length == 1) {
		for ( var i = 0; i < 7; i++)
			$(
					"<option value=\""
					+ date_eyesjjc_zqbrl[i].value
					+ "\">" + date_eyesjjc_zqbrl[i].text
					+ "</option>").appendTo("#geo");
	}
	//线条图
	if ($("#line").length == 1) {
		for ( var i = 0; i < 4; i++)
			$(
					"<option value=\""
					+ date_eyesjjc_zqbrl[i].value
					+ "\">" + date_eyesjjc_zqbrl[i].text
					+ "</option>").appendTo("#line");
	}
	//数字
	if ($("#num").length == 1) {
		for ( var i = 0; i < date_eyesjjc_zqbrl.length; i++)
			$(
					"<option value=\""
					+ date_eyesjjc_zqbrl[i].value
					+ "\">" + date_eyesjjc_zqbrl[i].text
					+ "</option>").appendTo("#num");
	}
	//物体图
	if ($("#obj").length == 1) {
		for ( var i = 0; i < date_eyesjjc_zqbrl.length-1; i++)
			$(
					"<option value=\""
					+ date_eyesjjc_zqbrl[i].value
					+ "\">" + date_eyesjjc_zqbrl[i].text
					+ "</option>").appendTo("#obj");
	}
	//蓝黄色型
	if ($("#color").length == 1) {
		for ( var i = 0; i < 5; i++)
			$(
					"<option value=\""
					+ date_eyesjjc_zqbrl[i].value
					+ "\">" + date_eyesjjc_zqbrl[i].text
					+ "</option>").appendTo("#color");
	}
	//红绿色觉
	if ($("#result_1").length == 1) {
		for ( var i = 0; i < data_eyesjjc_result_1.length; i++)
			$(
					"<option value=\""
					+ data_eyesjjc_result_1[i].value
					+ "\">" + data_eyesjjc_result_1[i].text
					+ "</option>").appendTo("#result_1");
	}
	//蓝黄色觉
	if ($("#result_2").length == 1) {
		for ( var i = 0; i < data_eyesjjc_result_2.length; i++)
			$(
					"<option value=\""
					+ data_eyesjjc_result_2[i].value
					+ "\">" + data_eyesjjc_result_2[i].text
					+ "</option>").appendTo("#result_2");
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
	/*************************计算正确个数和百分比并赋值*******************************/
	$(document).ready(function(){
		$("input[type='checkbox']").click(function(){clickButton();});
		});
		function clickButton(){
		var checkNum=0;//选择个数。
		var total=0;//总个数。
		var trs	= $("#mydiv table:eq(0) tr");
		$.each(trs,function(index,tr){
			var tds = $(tr).children("td");
			var a = false;
			var num = 0;
			$.each(tds,function(index,td){
				var inputs = $(td).children("input[type='checkbox']");
				var b = inputs.length;
				num = num + b;
				$.each(inputs,function(index,input){
				if($(input).attr("checked")=="checked") {
					checkNum+=1;
					a = true;
				}
				if($(input).attr("checked")=="unchecked"){
					checkNum-=1;
					a = false;
				}
				if($("#zqlu").length == 1){
					if(checkNum==0)
						$("#zqlu").val("");
					else
						$("#zqlu").val(checkNum);
					}
				});
			});
			if(a){
				total+=num;
			}
		});
		if($("#bfb").length == 1){
			if(checkNum==0)
			$("#bfb").val("");
			else
			$("#bfb").val(new Number(checkNum*100/total).toFixed(1));
			}
		}
	/*************************计算正确个数和百分比并赋值*******************************/
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
	//根sjjc报告对象查询符合条件的sjjc报告对象
	var url_selectEyesjjcByEyesjjc = "/publish/Eyesjjc/selectEyesjjcByEyesjjc.htm";
	var data_selectEyesjjcByEyesjjc = getJSONData(
			url_selectEyesjjcByEyesjjc, {
				jcdId : dataObjects_choice[0].jcdid,
				tag : Math.random()
			}, "post");
	if (data_selectEyesjjcByEyesjjc.state) {
		var eyesjjc = data_selectEyesjjcByEyesjjc.obj;
		if (eyesjjc != null) {
			if ($("#yb").length == 1)
				$("#yb").val(eyesjjc.yb);//眼别
			if ($("#geo").length == 1)
				$("#geo").val(eyesjjc.geo);//几何图
			if ($("#line").length == 1)
				$("#line").val(eyesjjc.line);//线条图
			if ($("#num").length == 1)
				$("#num").val(eyesjjc.num);//数字
			if ($("#obj").length == 1)
				$("#obj").val(eyesjjc.obj);//物体图
			if ($("#color").length == 1)
				$("#color").val(eyesjjc.color);//蓝黄色型
			if ($("#zqlu").length == 1)
				$("#zqlu").val(eyesjjc.zqlu);//正确率
			if ($("#bfb").length == 1)
				$("#bfb").val(eyesjjc.bfb);//百分比
			if ($("#result_1").length == 1)
				$("#result_1").val(eyesjjc.result_1);//红绿色觉
			if ($("#result_2").length == 1)
				$("#result_2").val(eyesjjc.result_2);//蓝黄色觉
			if ($("#g5").length == 1 && eyesjjc.g5 == 1)
				$("#g5").attr("checked","checked");//几何图正确辨认图号
			if ($("#g6").length == 1 && eyesjjc.g6 == 1)
				$("#g6").attr("checked","checked");
			if ($("#g7").length == 1 && eyesjjc.g7 == 1)
				$("#g7").attr("checked","checked");
			if ($("#g8").length == 1 && eyesjjc.g8 == 1)
				$("#g8").attr("checked","checked");
			if ($("#g9").length == 1 && eyesjjc.g9 == 1)
				$("#g9").attr("checked","checked");
			if ($("#g10").length == 1 && eyesjjc.g10 == 1)
				$("#g10").attr("checked","checked");
			if ($("#gw5").length == 1 && eyesjjc.gw5 == 1)//几何图错误辨认图号
				$("#gw5").attr("checked","checked");
			if ($("#gw6").length == 1 && eyesjjc.gw6 == 1)
				$("#gw6").attr("checked","checked");
			if ($("#gw7").length == 1 && eyesjjc.gw7 == 1)
				$("#gw7").attr("checked","checked");
			if ($("#gw8").length == 1 && eyesjjc.gw8 == 1)
				$("#gw8").attr("checked","checked");
			if ($("#gw9").length == 1 && eyesjjc.gw9 == 1)
				$("#gw9").attr("checked","checked");
			if ($("#gw10").length == 1 && eyesjjc.gw10 == 1)
				$("#gw10").attr("checked","checked");
			if ($("#l11").length == 1 && eyesjjc.l11 == 1)//线条图正确辨认图号
				$("#l11").attr("checked","checked");
			if ($("#l12").length == 1 && eyesjjc.l12 == 1)
				$("#l12").attr("checked","checked");
			if ($("#l13").length == 1 && eyesjjc.l13 == 1)
				$("#l13").attr("checked","checked");
			if ($("#lw11").length == 1 && eyesjjc.lw11 == 1)//线条图错误辨认图号
				$("#lw11").attr("checked","checked");
			if ($("#lw12").length == 1 && eyesjjc.lw12 == 1)
				$("#lw12").attr("checked","checked");
			if ($("#lw13").length == 1 && eyesjjc.lw13 == 1)
				$("#lw13").attr("checked","checked");
			if ($("#n14").length == 1 && eyesjjc.n14 == 1)//数字正确辨认图号
				$("#n14").attr("checked","checked");
			if ($("#n15").length == 1 && eyesjjc.n15 == 1)
				$("#n15").attr("checked","checked");
			if ($("#n16").length == 1 && eyesjjc.n16 == 1)
				$("#n16").attr("checked","checked");
			if ($("#n17").length == 1 && eyesjjc.n17 == 1)
				$("#n17").attr("checked","checked");
			if ($("#n18").length == 1 && eyesjjc.n18 == 1)
				$("#n18").attr("checked","checked");
			if ($("#n19").length == 1 && eyesjjc.n19 == 1)
				$("#n19").attr("checked","checked");
			if ($("#n20").length == 1 && eyesjjc.n20 == 1)
				$("#n20").attr("checked","checked");
			if ($("#n21").length == 1 && eyesjjc.n21 == 1)
				$("#n21").attr("checked","checked");
			if ($("#n22").length == 1 && eyesjjc.n22 == 1)
				$("#n22").attr("checked","checked");
			if ($("#n23").length == 1 && eyesjjc.n23 == 1)
				$("#n23").attr("checked","checked");
			if ($("#n24").length == 1 && eyesjjc.n24 == 1)
				$("#n24").attr("checked","checked");
			if ($("#n25").length == 1 && eyesjjc.n25 == 1)
				$("#n25").attr("checked","checked");
			if ($("#nw14").length == 1 && eyesjjc.nw14 == 1)//数字错误辨认图号
				$("#nw14").attr("checked","checked");
			if ($("#nw15").length == 1 && eyesjjc.nw15 == 1)
				$("#nw15").attr("checked","checked");
			if ($("#nw16").length == 1 && eyesjjc.nw16 == 1)
				$("#nw16").attr("checked","checked");
			if ($("#nw17").length == 1 && eyesjjc.nw17 == 1)
				$("#nw17").attr("checked","checked");
			if ($("#nw18").length == 1 && eyesjjc.nw18 == 1)
				$("#nw18").attr("checked","checked");
			if ($("#nw19").length == 1 && eyesjjc.nw19 == 1)
				$("#nw19").attr("checked","checked");
			if ($("#nw20").length == 1 && eyesjjc.nw20 == 1)
				$("#nw20").attr("checked","checked");
			if ($("#nw21").length == 1 && eyesjjc.nw21 == 1)
				$("#nw21").attr("checked","checked");
			if ($("#nw22").length == 1 && eyesjjc.nw22 == 1)
				$("#nw22").attr("checked","checked");
			if ($("#nw23").length == 1 && eyesjjc.nw23 == 1)
				$("#nw23").attr("checked","checked");
			if ($("#nw24").length == 1 && eyesjjc.nw24 == 1)
				$("#nw24").attr("checked","checked");
			if ($("#nw25").length == 1 && eyesjjc.nw25 == 1)
				$("#nw25").attr("checked","checked");
			if ($("#o26").length == 1 && eyesjjc.o26 == 1)//物体图正确辨认图号
				$("#o26").attr("checked","checked");
			if ($("#o27").length == 1 && eyesjjc.o27 == 1)
				$("#o27").attr("checked","checked");
			if ($("#o28").length == 1 && eyesjjc.o28 == 1)
				$("#o28").attr("checked","checked");
			if ($("#o29").length == 1 && eyesjjc.o29 == 1)
				$("#o29").attr("checked","checked");
			if ($("#o30").length == 1 && eyesjjc.o30 == 1)
				$("#o30").attr("checked","checked");
			if ($("#o31").length == 1 && eyesjjc.o31 == 1)
				$("#o31").attr("checked","checked");
			if ($("#o32").length == 1 && eyesjjc.o32 == 1)
				$("#o32").attr("checked","checked");
			if ($("#o33").length == 1 && eyesjjc.o33 == 1)
				$("#o33").attr("checked","checked");
			if ($("#o34").length == 1 && eyesjjc.o34 == 1)
				$("#o34").attr("checked","checked");
			if ($("#o35").length == 1 && eyesjjc.o35 == 1)
				$("#o35").attr("checked","checked");
			if ($("#o36").length == 1 && eyesjjc.o36 == 1)
				$("#o36").attr("checked","checked");
			if ($("#ow26").length == 1 && eyesjjc.ow26 == 1)//物体图错误辨认图号
				$("#ow26").attr("checked","checked");
			if ($("#ow27").length == 1 && eyesjjc.ow27 == 1)
				$("#ow27").attr("checked","checked");
			if ($("#ow28").length == 1 && eyesjjc.ow28 == 1)
				$("#ow28").attr("checked","checked");
			if ($("#ow29").length == 1 && eyesjjc.ow29 == 1)
				$("#ow29").attr("checked","checked");
			if ($("#ow30").length == 1 && eyesjjc.ow30 == 1)
				$("#ow30").attr("checked","checked");
			if ($("#ow31").length == 1 && eyesjjc.ow31 == 1)
				$("#ow31").attr("checked","checked");
			if ($("#ow32").length == 1 && eyesjjc.ow32 == 1)
				$("#ow32").attr("checked","checked");
			if ($("#ow33").length == 1 && eyesjjc.ow33 == 1)
				$("#ow33").attr("checked","checked");
			if ($("#ow34").length == 1 && eyesjjc.ow34 == 1)
				$("#ow34").attr("checked","checked");
			if ($("#ow35").length == 1 && eyesjjc.ow35 == 1)
				$("#ow35").attr("checked","checked");
			if ($("#ow36").length == 1 && eyesjjc.ow36 == 1)
				$("#ow36").attr("checked","checked");
			if ($("#c37").length == 1 && eyesjjc.c37 == 1)//蓝黄色型正确辨认图号
				$("#c37").attr("checked","checked");
			if ($("#c38").length == 1 && eyesjjc.c38 == 1)
				$("#c38").attr("checked","checked");
			if ($("#c39").length == 1 && eyesjjc.c39 == 1)
				$("#c39").attr("checked","checked");
			if ($("#c40").length == 1 && eyesjjc.c40 == 1)
				$("#c40").attr("checked","checked");
			if ($("#cw37").length == 1 && eyesjjc.cw37 == 1)//蓝黄色型错误辨认图号
				$("#cw37").attr("checked","checked");
			if ($("#cw38").length == 1 && eyesjjc.cw38 == 1)
				$("#cw38").attr("checked","checked");
			if ($("#cw39").length == 1 && eyesjjc.cw39 == 1)
				$("#cw39").attr("checked","checked");
			if ($("#cw40").length == 1 && eyesjjc.cw40 == 1)
				$("#cw40").attr("checked","checked");
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyesjjc.cliDate);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyesjjc.repDoc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyesjjc.doctor);// 检查医生
			if (data_outBaogaoHelp.obj.reportDate != eyesjjc.cliDate) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyesjjc);
			}
		}
	}
}

// sjjc检查报告保存
function saveOrUpdateEyesjjc(state) {
	var parameter_saveOrUpdateEyesjjc = validateAndGetValue_eyesjjc();
	var url_saveOrUpdateEyesjjc = "/publish/Eyesjjc/saveOrUpdateEyesjjc.htm";// sjjc检查报告保存
	var data_saveOrUpdateEyesjjc = getJSONData(
			url_saveOrUpdateEyesjjc,
			parameter_saveOrUpdateEyesjjc,
			"post");
	if (data_saveOrUpdateEyesjjc.state)
		$.oimsSucc("色觉检查报告保存成功", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待检患者界面
				closeReporeDialog();
			}
		});
	else
		$.oimsError("色觉检查报告保存失败", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待检患者界面
				closeReporeDialog();
			}
		});
}

// sjjc检查报告打印预览
function previewEyesjjc() {
	var parameter_saveOrUpdateEyesjjc = validateAndGetValue_eyesjjc();
	parameter_saveOrUpdateEyesjjc = JSON.stringify(
			parameter_saveOrUpdateEyesjjc)
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
			+ "/js/manager/baogao/previewEyesjjc.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyesjjc="
			+ parameter_saveOrUpdateEyesjjc + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}
function validateAndGetValue_eyesjjc(){
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
		var yb = $("#yb").val();//眼别
		var geo = $("#geo").val();//几何图
		var line = $("#line").val();//线条图
		var num = $("#num").val();//数字
		var obj = $("#obj").val();//物体图
		var color = $("#color").val();//蓝黄色型
		var zqlu = $("#zqlu").val();//正确率
		var bfb = $("#bfb").val();//百分比
		var result_1 = $("#result_1").val();//红绿色觉
		var result_2 = $("#result_2").val();//蓝黄色觉
		var g5 = 0;//几何图正确辨认图号
		if ($("input[type='checkbox'][name='g5']").attr("checked")=="checked") 
			g5 = 1;
		var g6 = 0;
		if ($("input[type='checkbox'][name='g6']").attr("checked")=="checked") 
			g6 = 1;
		var g7 = 0;
		if ($("input[type='checkbox'][name='g7']").attr("checked")=="checked") 
			g7 = 1;
		var g8 = 0;
		if ($("input[type='checkbox'][name='g8']").attr("checked")=="checked") 
			g8 = 1;
		var g9 = 0;
		if ($("input[type='checkbox'][name='g9']").attr("checked")=="checked") 
			g9 = 1;
		var g10 = 0;
		if ($("input[type='checkbox'][name='g10']").attr("checked")=="checked") 
			g10 = 1;
		var gw5 = 0;//几何图错误辨认图号
		if ($("input[type='checkbox'][name='gw5']").attr("checked")=="checked") 
			gw5 = 1;
		var gw6 = 0;
		if ($("input[type='checkbox'][name='gw6']").attr("checked")=="checked") 
			gw6 = 1;
		var gw7 = 0;
		if ($("input[type='checkbox'][name='gw7']").attr("checked")=="checked") 
			gw7 = 1;
		var gw8 = 0;
		if ($("input[type='checkbox'][name='gw8']").attr("checked")=="checked") 
			gw8 = 1;
		var gw9 = 0;
		if ($("input[type='checkbox'][name='gw9']").attr("checked")=="checked") 
			gw9 = 1;
		var gw10 = 0;
		if ($("input[type='checkbox'][name='gw10']").attr("checked")=="checked") 
			gw10 = 1;
		var l11 = 0;//线条图正确辨认图号
		if ($("input[type='checkbox'][name='l11']").attr("checked")=="checked") 
			l11 = 1;
		var l12 = 0;
		if ($("input[type='checkbox'][name='l12']").attr("checked")=="checked") 
			l12 = 1;
		var l13 = 0;
		if ($("input[type='checkbox'][name='l13']").attr("checked")=="checked") 
			l13 = 1;
		var lw11 = 0;//线条图错误辨认图号
		if ($("input[type='checkbox'][name='lw11']").attr("checked")=="checked") 
			lw11 = 1;
		var lw12 = 0;
		if ($("input[type='checkbox'][name='lw12']").attr("checked")=="checked") 
			lw12 = 1;
		var lw13 = 0;
		if ($("input[type='checkbox'][name='lw13']").attr("checked")=="checked") 
			lw13 = 1;
		var n14 = 0;//数字正确辨认图号
		if ($("input[type='checkbox'][name='n14']").attr("checked")=="checked") 
			n14 = 1;
		var n15 = 0;
		if ($("input[type='checkbox'][name='n15']").attr("checked")=="checked") 
			n15 = 1;
		var n16 = 0;
		if ($("input[type='checkbox'][name='n16']").attr("checked")=="checked") 
			n16 = 1;
		var n17 = 0;
		if ($("input[type='checkbox'][name='n17']").attr("checked")=="checked") 
			n17 = 1;
		var n18 = 0;
		if ($("input[type='checkbox'][name='n18']").attr("checked")=="checked") 
			n18 = 1;
		var n19 = 0;
		if ($("input[type='checkbox'][name='n19']").attr("checked")=="checked") 
			n19 = 1;
		var n20 = 0;
		if ($("input[type='checkbox'][name='n20']").attr("checked")=="checked") 
			n20 = 1;
		var n21 = 0;
		if ($("input[type='checkbox'][name='n21']").attr("checked")=="checked") 
			n21 = 1;
		var n22 = 0;
		if ($("input[type='checkbox'][name='n22']").attr("checked")=="checked") 
			n22 = 1;
		var n23 = 0;
		if ($("input[type='checkbox'][name='n23']").attr("checked")=="checked") 
			n23 = 1;
		var n24 = 0;
		if ($("input[type='checkbox'][name='n24']").attr("checked")=="checked") 
			n24 = 1;
		var n25 = 0;
		if ($("input[type='checkbox'][name='n25']").attr("checked")=="checked") 
			n25 = 1;
		var nw14 = 0;//数字错误辨认图号
		if ($("input[type='checkbox'][name='nw14']").attr("checked")=="checked") 
			nw14 = 1;
		var nw15 = 0;
		if ($("input[type='checkbox'][name='nw15']").attr("checked")=="checked") 
			nw15 = 1;
		var nw16 = 0;
		if ($("input[type='checkbox'][name='nw16']").attr("checked")=="checked") 
			nw16 = 1;
		var nw17 = 0;
		if ($("input[type='checkbox'][name='nw17']").attr("checked")=="checked") 
			nw17 = 1;
		var nw18 = 0;
		if ($("input[type='checkbox'][name='nw18']").attr("checked")=="checked") 
			nw18 = 1;
		var nw19 = 0;
		if ($("input[type='checkbox'][name='nw19']").attr("checked")=="checked") 
			nw19 = 1;
		var nw20 = 0;
		if ($("input[type='checkbox'][name='nw20']").attr("checked")=="checked") 
			nw20 = 1;
		var nw21 = 0;
		if ($("input[type='checkbox'][name='nw21']").attr("checked")=="checked") 
			nw21 = 1;
		var nw22 = 0;
		if ($("input[type='checkbox'][name='nw22']").attr("checked")=="checked") 
			nw22 = 1;
		var nw23 = 0;
		if ($("input[type='checkbox'][name='nw23']").attr("checked")=="checked") 
			nw23 = 1;
		var nw24 = 0;
		if ($("input[type='checkbox'][name='nw24']").attr("checked")=="checked") 
			nw24 = 1;
		var nw25 = 0;
		if ($("input[type='checkbox'][name='nw25']").attr("checked")=="checked") 
			nw25 = 1;
		var o26 = 0;//物体图正确辨认图号
		if ($("input[type='checkbox'][name='o26']").attr("checked")=="checked") 
			o26 = 1;
		var o27 = 0;
		if ($("input[type='checkbox'][name='o27']").attr("checked")=="checked") 
			o27 = 1;
		var o28 = 0;
		if ($("input[type='checkbox'][name='o28']").attr("checked")=="checked") 
			o28 = 1;
		var o29 = 0;
		if ($("input[type='checkbox'][name='o29']").attr("checked")=="checked") 
			o29 = 1;
		var o30 = 0;
		if ($("input[type='checkbox'][name='o30']").attr("checked")=="checked") 
			o30 = 1;
		var o31 = 0;
		if ($("input[type='checkbox'][name='o31']").attr("checked")=="checked") 
			o31 = 1;
		var o32 = 0;
		if ($("input[type='checkbox'][name='o32']").attr("checked")=="checked") 
			o32 = 1;
		var o33 = 0;
		if ($("input[type='checkbox'][name='o33']").attr("checked")=="checked") 
			o33 = 1;
		var o34 = 0;
		if ($("input[type='checkbox'][name='o34']").attr("checked")=="checked") 
			o34 = 1;
		var o35 = 0;
		if ($("input[type='checkbox'][name='o35']").attr("checked")=="checked") 
			o35 = 1;
		var o36 = 0;
		if ($("input[type='checkbox'][name='o36']").attr("checked")=="checked") 
			o36 = 1;
		var ow26 = 0;//物体图错误辨认图号
		if ($("input[type='checkbox'][name='ow26']").attr("checked")=="checked") 
			ow26 = 1;
		var ow27 = 0;
		if ($("input[type='checkbox'][name='ow27']").attr("checked")=="checked") 
			ow27 = 1;
		var ow28 = 0;
		if ($("input[type='checkbox'][name='ow28']").attr("checked")=="checked") 
			ow28 = 1;
		var ow29 = 0;
		if ($("input[type='checkbox'][name='ow29']").attr("checked")=="checked") 
			ow29 = 1;
		var ow30 = 0;
		if ($("input[type='checkbox'][name='ow30']").attr("checked")=="checked") 
			ow30 = 1;
		var ow31 = 0;
		if ($("input[type='checkbox'][name='ow31']").attr("checked")=="checked") 
			ow31 = 1;
		var ow32 = 0;
		if ($("input[type='checkbox'][name='ow32']").attr("checked")=="checked") 
			ow32 = 1;
		var ow33 = 0;
		if ($("input[type='checkbox'][name='ow33']").attr("checked")=="checked") 
			ow33 = 1;
		var ow34 = 0;
		if ($("input[type='checkbox'][name='ow34']").attr("checked")=="checked") 
			ow34 = 1;
		var ow35 = 0;
		if ($("input[type='checkbox'][name='ow35']").attr("checked")=="checked") 
			ow35 = 1;
		var ow36 = 0;
		if ($("input[type='checkbox'][name='ow36']").attr("checked")=="checked") 
			ow36 = 1;
		var c37 = 0;//蓝黄色型正确辨认图号
		if ($("input[type='checkbox'][name='c37']").attr("checked")=="checked") 
			c37 = 1;
		var c38 = 0;
		if ($("input[type='checkbox'][name='c38']").attr("checked")=="checked") 
			c38 = 1;
		var c39 = 0;
		if ($("input[type='checkbox'][name='c39']").attr("checked")=="checked") 
			c39 = 1;
		var c40 = 0;
		if ($("input[type='checkbox'][name='c40']").attr("checked")=="checked") 
			c40 = 1;
		var cw37 = 0;//蓝黄色型错误辨认图号
		if ($("input[type='checkbox'][name='cw37']").attr("checked")=="checked") 
			cw37 = 1;
		var cw38 = 0;
		if ($("input[type='checkbox'][name='cw38']").attr("checked")=="checked") 
			cw38 = 1;
		var cw39 = 0;
		if ($("input[type='checkbox'][name='cw39']").attr("checked")=="checked") 
			cw39 = 1;
		var cw40 = 0;
		if ($("input[type='checkbox'][name='cw40']").attr("checked")=="checked") 
			cw40 = 1;
//		var jzfa=[];
////		写法一
////		$("input[type='checkbox'][name='jzfa']").each(function(){
////			if($(this).attr("checked")=="checked"){
////				jzfa.push($(this).val());
////			}
////		});
////		写法二
//		$.each($("input[name='jzfa']"),function(){
//			if($(this).attr("checked")=="checked"){
//				jzfa.push($(this).val());
//			}
//		});
		var repDoc = $("#rep_doc option:selected").val();// 申请医生
		var repDoc_name = $("#rep_doc option:selected").text();// 申请医生姓名
		var doctor = $("#doctor option:selected").val();// 检查医生
		var doctor_name = $("#doctor option:selected").text();// 检查医生姓名
		var cliDate = $("#cli_date ").html();// 报告日期
		var parameter_saveOrUpdateEyesjjc = {
			jcdId : jcdId,// 检查单ID
			yb : yb,
			geo : geo,
			line : line,
			num : num,
			obj : obj,
			color : color,
			zqlu : zqlu,
			bfb : bfb,
			result_1 : result_1,
			result_2 : result_2,
			g5 : g5,
			g6 : g6,
			g7 : g7,
			g8 : g8,
			g9 : g9,
			g10 : g10,
			gw5 : gw5,
			gw6 : gw6,
			gw7 : gw7,
			gw8 : gw8,
			gw9 : gw9,
			gw10 : gw10,
			l11 : l11,
			l12 : l12,
			l13 : l13,
			lw11 : lw11,
			lw12 : lw12,
			lw13 : lw13,
			n14 : n14,
			n15 : n15,
			n16 : n16,
			n17 : n17,
			n18 : n18,
			n19 : n19,
			n20 : n20,
			n21 : n21,
			n22 : n22,
			n23 : n23,
			n24 : n24,
			n25 : n25,
			nw14 : nw14,
			nw15 : nw15,
			nw16 : nw16,
			nw17 : nw17,
			nw18 : nw18,
			nw19 : nw19,
			nw20 : nw20,
			nw21 : nw21,
			nw22 : nw22,
			nw23 : nw23,
			nw24 : nw24,
			nw25 : nw25,
			o26 : o26,
			o27 : o27,
			o28 : o28,
			o29 : o29,
			o30 : o30,
			o31 : o31,
			o32 : o32,
			o33 : o33,
			o34 : o34,
			o35 : o35,
			o36 : o36,
			ow26 : ow26,
			ow27 : ow27,
			ow28 : ow28,
			ow29 : ow29,
			ow30 : ow30,
			ow31 : ow31,
			ow32 : ow32,
			ow33 : ow33,
			ow34 : ow34,
			ow35 : ow35,
			ow36 : ow36,
			c37 : c37,
			c38 : c38,
			c39 : c39,
			c40 : c40,
			cw37 : cw37,
			cw38 : cw38,
			cw39 : cw39,
			cw40 : cw40,
			repDoc : repDoc,// 申请医生
			doctor : doctor,// 检查医生
			repDoc_name : repDoc_name,// 申请医生姓名
			doctor_name : doctor_name,// 检查医生姓名
			cliDate : cliDate,// 报告日期
			baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
			tag : Math.random()
		}
		return parameter_saveOrUpdateEyesjjc;
}