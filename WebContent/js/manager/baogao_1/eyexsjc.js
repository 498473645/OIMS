//调节辐辏
function initData_eyexsjc() {
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
	//根xsjc报告对象查询符合条件的xsjc报告对象
	var url_selectEyexsjcByEyexsjc = "/publish/Eyexsjc/selectEyexsjcByEyexsjc.htm";
	var data_selectEyexsjcByEyexsjc = getJSONData(
			url_selectEyexsjcByEyexsjc, {
				jcdId : dataObjects_choice[0].jcdid,
				tag : Math.random()
			}, "post");
	if (data_selectEyexsjcByEyexsjc.state) {
		var eyexsjc = data_selectEyexsjcByEyexsjc.obj;
		if (eyexsjc != null) {
			if ($("#bi_5cm").length == 1)
				$("#bi_5cm").val(eyexsjc.bi_5cm);//隐斜（棱镜度）5m
			if ($("#bi_40cm").length == 1)
				$("#bi_40cm").val(eyexsjc.bi_40cm);//隐斜（棱镜度）40cm
			if ($("#tjfd_sy").length == 1)
				$("#tjfd_sy").val(eyexsjc.tjfd_sy);//调节幅度双眼
			if ($("#tjfd_yy").length == 1)
				$("#tjfd_yy").val(eyexsjc.tjfd_yy);//调节幅度右眼
			if ($("#tjfd_zy").length == 1)
				$("#tjfd_zy").val(eyexsjc.tjfd_zy);//调节幅度左眼
			if ($("#fxd1_sy").length == 1)
				$("#fxd1_sy").val(eyexsjc.fxd1_sy);//负相对调节NRA双眼
			if ($("#fxd1_yy").length == 1)
				$("#fxd1_yy").val(eyexsjc.fxd1_yy);//负相对调节NRA右眼
			if ($("#fxd1_zy").length == 1)
				$("#fxd1_zy").val(eyexsjc.fxd1_zy);//负相对调节NRA左眼
			if ($("#fxd2_sy").length == 1)
				$("#fxd2_sy").val(eyexsjc.fxd2_sy);//正相对调节PRA双眼
			if ($("#fxd2_yy").length == 1)
				$("#fxd2_yy").val(eyexsjc.fxd2_yy);//正相对调节PRA右眼
			if ($("#fxd2_zy").length == 1)
				$("#fxd2_zy").val(eyexsjc.fxd2_zy);//正相对调节PRA左眼
			if ($("#tjzh_1").length == 1)
				$("#tjzh_1").val(eyexsjc.tjzh_1);//调节滞后/超前(D)双眼
			if ($("#tjzh_2").length == 1)
				$("#tjzh_2").val(eyexsjc.tjzh_2);//调节滞后/超前(D)右眼
			if ($("#tjzh_3").length == 1)
				$("#tjzh_3").val(eyexsjc.tjzh_3);//调节滞后/超前(D)左眼
			if ($("#tjzh_4").length == 1)
				$("#tjzh_4").val(eyexsjc.tjzh_4);//调节敏捷度(C/M)双眼
			if ($("#tjzh_5").length == 1)
				$("#tjzh_5").val(eyexsjc.tjzh_5);//调节敏捷度(C/M)右眼
			if ($("#tjzh_6").length == 1)
				$("#tjzh_6").val(eyexsjc.tjzh_6);//调节敏捷度(C/M)左眼
			if ($("#tjzh_7").length == 1)
				$("#tjzh_7").val(eyexsjc.tjzh_7);//调节耐力(S)双眼
			if ($("#tjzh_8").length == 1)
				$("#tjzh_8").val(eyexsjc.tjzh_8);//调节耐力(S)右眼
			if ($("#tjzh_9").length == 1)
				$("#tjzh_9").val(eyexsjc.tjzh_9);//调节耐力(S)左眼
			if ($("#npc_1").length == 1)
				$("#npc_1").val(eyexsjc.npc_1);//近点辐辏NPC(cm)模糊点
			if ($("#npc_4").length == 1)
				$("#npc_4").val(eyexsjc.npc_4);
			if ($("#npc_7").length == 1)
				$("#npc_7").val(eyexsjc.npc_7);
			if ($("#npc_10").length == 1)
				$("#npc_10").val(eyexsjc.npc_10);
			if ($("#npc_2").length == 1)
				$("#npc_2").val(eyexsjc.npc_2);//近点辐辏NPC(cm)破裂点
			if ($("#npc_5").length == 1)
				$("#npc_5").val(eyexsjc.npc_5);
			if ($("#npc_8").length == 1)
				$("#npc_8").val(eyexsjc.npc_8);
			if ($("#npc_11").length == 1)
				$("#npc_11").val(eyexsjc.npc_11);
			if ($("#npc_3").length == 1)
				$("#npc_3").val(eyexsjc.npc_3);//近点辐辏NPC(cm)恢复点
			if ($("#npc_6").length == 1)
				$("#npc_6").val(eyexsjc.npc_6);
			if ($("#npc_9").length == 1)
				$("#npc_9").val(eyexsjc.npc_9);
			if ($("#npc_12").length == 1)
				$("#npc_12").val(eyexsjc.npc_12);
			if ($("#zmd_b1_5m").length == 1)
				$("#zmd_b1_5m").val(eyexsjc.zmd_b1_5m);//5m分开(BI)
			if ($("#zmd_b0_5m").length == 1)
				$("#zmd_b0_5m").val(eyexsjc.zmd_b0_5m);
			if ($("#czfcl_5m").length == 1)
				$("#czfcl_5m").val(eyexsjc.czfcl_5m);
			if ($("#zmd_b1_40m").length == 1)
				$("#zmd_b1_40m").val(eyexsjc.zmd_b1_40m);//5m集合(BO)
			if ($("#zmd_b0_40m").length == 1)
				$("#zmd_b0_40m").val(eyexsjc.zmd_b0_40m);
			if ($("#czfcl_40m").length == 1)
				$("#czfcl_40m").val(eyexsjc.czfcl_40m);
			if ($("#hfd_b1_5m").length == 1)
				$("#hfd_b1_5m").val(eyexsjc.hfd_b1_5m);//40CM分开
			if ($("#hfd_bo_5m").length == 1)
				$("#hfd_bo_5m").val(eyexsjc.hfd_bo_5m);
			if ($("#bc_1").length == 1)
				$("#bc_1").val(eyexsjc.bc_1);
			if ($("#hfd_b1_40m").length == 1)
				$("#hfd_b1_40m").val(eyexsjc.hfd_b1_40m);//40cm集合
			if ($("#hfd_bo_40m").length == 1)
				$("#hfd_bo_40m").val(eyexsjc.hfd_bo_40m);
			if ($("#bc_2").length == 1)
				$("#bc_2").val(eyexsjc.bc_2);
			if ($("#bc_3").length == 1)
				$("#bc_3").val(eyexsjc.bc_3);//辐辏难易度(C/M)1
			if ($("#bc_4").length == 1)
				$("#bc_4").val(eyexsjc.bc_4);
			if ($("#bc_5").length == 1)
				$("#bc_5").val(eyexsjc.bc_5);
			if ($("#bc_6").length == 1)
				$("#bc_6").val(eyexsjc.bc_6);//辐辏耐力(S)1
			if ($("#bc_7").length == 1)
				$("#bc_7").val(eyexsjc.bc_7);
			if ($("#bc_8").length == 1)
				$("#bc_8").val(eyexsjc.bc_8);
			if ($("#aca").length == 1)
				$("#aca").val(eyexsjc.aca);//调节性集合/调节比率(AC/A)
			if ($("#diag").length == 1)
				$("#diag").val(eyexsjc.diag);//检查诊断
			if ($("#demo").length == 1)
				$("#demo").val(eyexsjc.demo);//备注
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyexsjc.cliDate);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyexsjc.repDoc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyexsjc.doctor);// 检查医生
			if (data_outBaogaoHelp.obj.reportDate != eyexsjc.cliDate) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyexsjc);
			}
		}
	}
}

// xsjc检查报告保存
function saveOrUpdateEyexsjc(state) {
	var parameter_saveOrUpdateEyexsjc = validateAndGetValue_eyexsjc();
	var url_saveOrUpdateEyexsjc = "/publish/Eyexsjc/saveOrUpdateEyexsjc.htm";// xsjc检查报告保存
	var data_saveOrUpdateEyexsjc = getJSONData(
			url_saveOrUpdateEyexsjc,
			parameter_saveOrUpdateEyexsjc,
			"post");
	if (data_saveOrUpdateEyexsjc.state)
		$.oimsSucc("调节辐辏检查报告保存成功", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待检患者界面
				closeReporeDialog();
			}
		});
	else
		$.oimsError("调节辐辏检查报告保存失败", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待检患者界面
				closeReporeDialog();
			}
		});
}

// xsjc检查报告打印预览
function previewEyexsjc() {
	var parameter_saveOrUpdateEyexsjc = validateAndGetValue_eyexsjc();
	parameter_saveOrUpdateEyexsjc = JSON.stringify(
			parameter_saveOrUpdateEyexsjc)
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
			+ "/js/manager/baogao/previewEyexsjc.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyexsjc="
			+ parameter_saveOrUpdateEyexsjc + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}
function validateAndGetValue_eyexsjc(){
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
		var bi_5cm = $("#bi_5cm").val();//隐斜（棱镜度）5m
		var bi_40cm = $("#bi_40cm").val();//隐斜（棱镜度）40cm
		var tjfd_sy = $("#tjfd_sy").val();//调节幅度双眼
		var tjfd_yy = $("#tjfd_yy").val();//调节幅度右眼
		var tjfd_zy = $("#tjfd_zy").val();//调节幅度左眼
		var fxd1_sy = $("#fxd1_sy").val();//负相对调节NRA双眼
		var fxd1_yy = $("#fxd1_yy").val();//负相对调节NRA右眼
		var fxd1_zy = $("#fxd1_zy").val();//负相对调节NRA左眼 
		var fxd2_sy = $("#fxd2_sy").val();//正相对调节PRA双眼
		var fxd2_yy = $("#fxd2_yy").val();//正相对调节PRA右眼
		var fxd2_zy = $("#fxd2_zy").val();//正相对调节PRA左眼
		var tjzh_1 = $("#tjzh_1").val();//调节滞后/超前(D)双眼
		var tjzh_2 = $("#tjzh_2").val();//调节滞后/超前(D)右眼
		var tjzh_3 = $("#tjzh_3").val();//调节滞后/超前(D)左眼
		var tjzh_4 = $("#tjzh_4").val();//调节敏捷度(C/M)双眼
		var tjzh_5 = $("#tjzh_5").val();//调节敏捷度(C/M)右眼
		var tjzh_6 = $("#tjzh_6").val();//调节敏捷度(C/M)左眼
		var tjzh_7 = $("#tjzh_7").val();//调节耐力(S)双眼
		var tjzh_8 = $("#tjzh_8").val();//调节耐力(S)右眼
		var tjzh_9 = $("#tjzh_9").val();//调节耐力(S)左眼
		var npc_1 = $("#npc_1").val();//近点辐辏NPC(cm)模糊点
		var npc_4 = $("#npc_4").val();
		var npc_7 = $("#npc_7").val();
		var npc_10 = $("#npc_10").val();
		var npc_2 = $("#npc_2").val();//近点辐辏NPC(cm)破裂点
		var npc_5 = $("#npc_5").val();
		var npc_8 = $("#npc_8").val();
		var npc_11 = $("#npc_11").val();
		var npc_3 = $("#npc_3").val();//近点辐辏NPC(cm)恢复点
		var npc_6 = $("#npc_6").val();
		var npc_9 = $("#npc_9").val();
		var npc_12 = $("#npc_12").val();
		var zmd_b1_5m = $("#zmd_b1_5m").val();//5m分开(BI)
		var zmd_b0_5m = $("#zmd_b0_5m").val();
		var czfcl_5m = $("#czfcl_5m").val();
		var zmd_b1_40m = $("#zmd_b1_40m").val();//5m集合(BO)
		var zmd_b0_40m = $("#zmd_b0_40m").val();
		var czfcl_40m = $("#czfcl_40m").val();
		var hfd_b1_5m = $("#hfd_b1_5m").val();//40CM分开
		var hfd_bo_5m = $("#hfd_bo_5m").val();
		var bc_1 = $("#bc_1").val();
		var hfd_b1_40m = $("#hfd_b1_40m").val();//40cm集合
		var hfd_bo_40m = $("#hfd_bo_40m").val();
		var bc_2 = $("#bc_2").val();
		var bc_3 = $("#bc_3").val();//辐辏难易度(C/M)1
		var bc_4 = $("#bc_4").val();
		var bc_5 = $("#bc_5").val();
		var bc_6 = $("#bc_6").val();//辐辏耐力(S)1
		var bc_7 = $("#bc_7").val();
		var bc_8 = $("#bc_8").val();
		var aca = $("#aca").val();//调节性集合/调节比率(AC/A)
		var diag = $("#diag").val();//检查诊断
		var demo = $("#demo").val();// 备注
		var repDoc = $("#rep_doc option:selected").val();// 申请医生
		var repDoc_name = $("#rep_doc option:selected").text();// 申请医生姓名
		var doctor = $("#doctor option:selected").val();// 检查医生
		var doctor_name = $("#doctor option:selected").text();// 检查医生姓名
		var cliDate = $("#cli_date ").html();// 报告日期
		var parameter_saveOrUpdateEyexsjc = {
			jcdId : jcdId,// 检查单ID
			bi_5cm : bi_5cm,
			bi_40cm : bi_40cm,
			tjfd_sy : tjfd_sy,
			tjfd_yy : tjfd_yy,
			tjfd_zy : tjfd_zy,
			fxd1_sy : fxd1_sy,
			fxd1_yy : fxd1_yy,
			fxd1_zy : fxd1_zy,
			fxd2_sy : fxd2_sy,
			fxd2_yy : fxd2_yy,
			fxd2_zy : fxd2_zy,
			tjzh_1 : tjzh_1,
			tjzh_2 : tjzh_2,
			tjzh_3 : tjzh_3,
			tjzh_4 : tjzh_4,
			tjzh_5 : tjzh_5,
			tjzh_6 : tjzh_6,
			tjzh_7 : tjzh_7,
			tjzh_8 : tjzh_8,
			tjzh_9 : tjzh_9,
			npc_1 : npc_1,
			npc_4 : npc_4,
			npc_7 : npc_7,
			npc_10 : npc_10,
			npc_2 : npc_2,
			npc_5 : npc_5,
			npc_8 : npc_8,
			npc_11 : npc_11,
			npc_3 : npc_3,
			npc_6 : npc_6,
			npc_9 : npc_9,
			npc_12 : npc_12,
			zmd_b1_5m : zmd_b1_5m,
			zmd_b0_5m : zmd_b0_5m,
			czfcl_5m : czfcl_5m,
			zmd_b1_40m : zmd_b1_40m,
			zmd_b0_40m : zmd_b0_40m,
			czfcl_40m : czfcl_40m,
			hfd_b1_5m : hfd_b1_5m,
			hfd_bo_5m : hfd_bo_5m,
			bc_1 : bc_1,
			hfd_b1_40m : hfd_b1_40m,
			hfd_bo_40m : hfd_bo_40m,
			bc_2 : bc_2,
			bc_3 : bc_3,
			bc_4 : bc_4,
			bc_5 : bc_5,
			bc_6 : bc_6,
			bc_7 : bc_7,
			bc_8 : bc_8,
			aca : aca,
			diag : diag,
			demo : demo,
			baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
			repDoc : repDoc,// 申请医生
			doctor : doctor,// 检查医生
			repDoc_name : repDoc_name,// 申请医生姓名
			doctor_name : doctor_name,// 检查医生姓名
			cliDate : cliDate,// 报告日期
			tag : Math.random()
		}
		return parameter_saveOrUpdateEyexsjc;
}