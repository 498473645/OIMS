//验光检查参数设置
var data_eyeygnew_sffc = [ {
	value : '否',
	text : '否'
}, {
	value : '是',
	text : '是'
}];
var data_eyeygnew_logmar = [{
	value : 'logMAR',
	text : 'logMAR'
}, {
	value : 'VAsc',
	text : 'VAsc'
}];
function initData_eyeygnew() {
	//logmar
	if ($("#logmar").length == 1) {
		for ( var i = 0; i < data_eyeygnew_logmar.length; i++)
			$(
					"<option value=\""
							+ data_eyeygnew_logmar[i].value
							+ "\">" + data_eyeygnew_logmar[i].text
							+ "</option>").appendTo("#logmar");
	}
	
	//是否复查
	if ($("#sffc").length == 1) {
		for ( var i = 0; i < data_eyeygnew_sffc.length; i++)
			$(
					"<option value=\""
					+ data_eyeygnew_sffc[i].value
					+ "\">" + data_eyeygnew_sffc[i].text
					+ "</option>").appendTo("#sffc");
	}
	/***************输入模板初始化*****************//*
	//DS/DC
	$("#add").bind("click",function(){
		$(".text1").val(function(index,value){
			var temp=parseFloat(value);
			return temp+=0.25; 
		});
	});
	$("#reduce").bind("click",function(){
		$(".text1").val(function(index,value){
				var temp = parseFloat(value);
				temp-=0.25;
				if(temp>0)
				return temp;
				else
				return 0.25;
		});
	});
	$(".dsdc").each(function(index,input){
		var input_id = $(input).attr("id");
		$("#"+input_id).click(function(){
			var position = $(this).position();
			var left = position.left;
			var top = position.top;
			$(".blk_a").hide();
			$("#blk1").css({
			"display":"block",
			left:left,
			top:top+30,
			});
		$("#confirm1").unbind('click').bind("click",function(){
			var content = $(".text1").val();
			var add_reduce = $("#add_reduce").val();
			if($("#"+input_id).length==1)
			$("#"+input_id).val(add_reduce+content);
			$("#blk1").hide();
			});
		$("#close1").unbind("click").bind("click",function(){
			$("#blk1").hide();
		});
	});
});

//AX/△
$("#add2").bind("click",function(){
		$(".text2").val(function(index,value){
			var temp=parseFloat(value);
			return temp+=1; 
		});
	});
$("#reduce2").bind("click",function(){
		$(".text2").val(function(index,value){
				var temp = parseFloat(value);
				return temp-=1;
		});
	});
$(".axsan").each(function(index,input){
		var input_id = $(input).attr("id");
		$("#"+input_id).click(function(){
			var position = $(this).position();
			var left = position.left;
			var top = position.top;
			$(".blk_a").hide();
			$("#blk2").css({
			"display":"block",
			left:left,
			top:top+30,
			});
		$("#confirm2").unbind('click').bind("click",function(){
			var content = $(".text2").val();
			if($("#"+input_id).length==1)
			$("#"+input_id).val(content);
			$("#blk2").hide();
			});
		$("#close2").unbind("click").bind("click",function(){
			$("#blk2").hide();
		});
	});
});
//base
$(".base").each(function(index,input){
		var input_id = $(input).attr("id");
		$("#"+input_id).click(function(){
			var position = $(this).position();
			var left = position.left;
			var top = position.top;
			$(".blk_a").hide();
			$("#blk3").css({
			"display":"block",
			left:left,
			top:top+30,
			});
		$("#confirm3").unbind('click').bind("click",function(){
			var base = $("#base").val();
			if($("#"+input_id).length==1)
			$("#"+input_id).val(base);
			$("#blk3").hide();
			});
		$("#base").unbind('change').bind("change",function(){
			var base = $("#base").val();
			if($("#"+input_id).length==1)
			$("#"+input_id).val(base);
			$("#blk3").hide();
			return false;
			});
		$("#close3").unbind("click").bind("click",function(){
			$("#blk3").hide();
		});
	});
});
//VAcc、ETDRS、PD、logMAR
var add3_value = 1000;
$(".text3").val(1000/10000);
$("#add3").unbind("click").bind("click",function(){
		$(".text3").val(function(index,value){
		return (add3_value+=1000)/10000; 
		});
	});
$("#reduce3").unbind("click").bind("click",function(){
		$(".text3").val(function(index,value){
				return (add3_value-=1000)/10000;
		});
	});
$(".vepl").each(function(index,input){
		var input_id = $(input).attr("id");
		$("#"+input_id).click(function(){
			var position = $(this).position();
			var left = position.left;
			var top = position.top;
//			console.log($("#content_div").width()+","+position.left+","+$("#blk4").width());
			if($("#content_div").width()-position.left<$("#blk4").width()){
				left = $("#content_div").width()-$("#blk4").width()+25;
			}
			$(".blk_a").hide();
			$("#blk4").css({
			"display":"block",
			left:left,
			top:top+30,
			});
		$("#confirm4").unbind("click").bind("click",function(){
			var content = $(".text3").val();
			if($("#"+input_id).length==1)
			$("#"+input_id).val(content);
			$("#blk4").hide();
			});
		$("#close4").unbind("click").bind("click",function(){
			$("#blk4").hide();
		});
	});
});
	*//***************输入模板初始化*****************/
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
	//根ygnew报告对象查询符合条件的ygnew报告对象
	var url_selectEyeygnewByEyeygnew = "/publish/Eyeygnew/selectEyeygnewByEyeygnew.htm";
	var data_selectEyeygnewByEyeygnew = getJSONData(
			url_selectEyeygnewByEyeygnew, {
				jcdId : dataObjects_choice[0].jcdid,
				tag : Math.random()
			}, "post");
	if (data_selectEyeygnewByEyeygnew.state) {
		var eyeygnew = data_selectEyeygnewByEyeygnew.obj;
		if (eyeygnew != null) {
			if ($("#logmar").length == 1)
				$("#logmar").val(eyeygnew.logmar);//logmar
			if ($("#yyly").length == 1)//远用视力，裸眼视力
				$("#yyly").val(eyeygnew.yyly);//logmar
			if ($("#qj_sp2_r").length == 1)
				$("#qj_sp2_r").val(eyeygnew.qj_sp2_r);//rds
			if ($("#qj_sp2_l").length == 1)
				$("#qj_sp2_l").val(eyeygnew.qj_sp2_l);//lds
			if ($("#qj_fcsp1_r").length == 1)
				$("#qj_fcsp1_r").val(eyeygnew.qj_fcsp1_r);//rds1
			if ($("#qj_fcsp1_l").length == 1)
				$("#qj_fcsp1_l").val(eyeygnew.qj_fcsp1_l);//lds1
			if ($("#qj_fcsp2_r").length == 1)
				$("#qj_fcsp2_r").val(eyeygnew.qj_fcsp2_r);//rds2
			if ($("#qj_fcsp2_l").length == 1)
				$("#qj_fcsp2_l").val(eyeygnew.qj_fcsp2_l);//lds2
			if ($("#qj_jysp_1").length == 1)
				$("#qj_jysp_1").val(eyeygnew.qj_jysp_1);//rds3
			if ($("#qj_jysp_2").length == 1)
				$("#qj_jysp_2").val(eyeygnew.qj_jysp_2);//lds3
			if ($("#zj_sp2_r").length == 1)
				$("#zj_sp2_r").val(eyeygnew.zj_sp2_r);//rdc
			if ($("#zj_sp2_l").length == 1)
				$("#zj_sp2_l").val(eyeygnew.zj_sp2_l);//ldc
			if ($("#zj_fcsp1_r").length == 1)
				$("#zj_fcsp1_r").val(eyeygnew.zj_fcsp1_r);//rdc1
			if ($("#zj_fcsp1_l").length == 1)
				$("#zj_fcsp1_l").val(eyeygnew.zj_fcsp1_l);//ldc1
			if ($("#zj_fcsp2_r").length == 1)
				$("#zj_fcsp2_r").val(eyeygnew.zj_fcsp2_r);//rdc2
			if ($("#zj_fcsp2_l").length == 1)
				$("#zj_fcsp2_l").val(eyeygnew.zj_fcsp2_l);//ldc2
			if ($("#zj_jysp_1").length == 1)
				$("#zj_jysp_1").val(eyeygnew.zj_jysp_1);//ldc3
			if ($("#zj_jysp_2").length == 1)
				$("#zj_jysp_2").val(eyeygnew.zj_jysp_2);//rdc3
			if ($("#z_sp2_r").length == 1)
				$("#z_sp2_r").val(eyeygnew.z_sp2_r);//rax
			if ($("#z_sp2_l").length == 1)
				$("#z_sp2_l").val(eyeygnew.z_sp2_l);//lax
			if ($("#z_fcsp1_r").length == 1)
				$("#z_fcsp1_r").val(eyeygnew.z_fcsp1_r);//rax1
			if ($("#z_fcsp1_l").length == 1)
				$("#z_fcsp1_l").val(eyeygnew.z_fcsp1_l);//lax1
			if ($("#z_fcsp2_r").length == 1)
				$("#z_fcsp2_r").val(eyeygnew.z_fcsp2_r);//rax2
			if ($("#z_fcsp2_l").length == 1)
				$("#z_fcsp2_l").val(eyeygnew.z_fcsp2_l);//lax2
			if ($("#z_jysp_1").length == 1)
				$("#z_jysp_1").val(eyeygnew.z_jysp_1);//lax3
			if ($("#z_jysp_2").length == 1)
				$("#z_jysp_2").val(eyeygnew.z_jysp_2);//rax3
			if ($("#snj_sp2_r").length == 1)
				$("#snj_sp2_r").val(eyeygnew.snj_sp2_r);//r
			if ($("#snj_sp2_l").length == 1)
				$("#snj_sp2_l").val(eyeygnew.snj_sp2_l);//l
			if ($("#snj_fcsp1_r").length == 1)
				$("#snj_fcsp1_r").val(eyeygnew.snj_fcsp1_r);//r
			if ($("#snj_fcsp1_l").length == 1)
				$("#snj_fcsp1_l").val(eyeygnew.snj_fcsp1_l);//l1
			if ($("#snj_fcsp2_r").length == 1)
				$("#snj_fcsp2_r").val(eyeygnew.snj_fcsp2_r);//r2
			if ($("#snj_fcsp2_l").length == 1)
				$("#snj_fcsp2_l").val(eyeygnew.snj_fcsp2_l);//l2
			if ($("#snj_jysp_1").length == 1)
				$("#snj_jysp_1").val(eyeygnew.snj_jysp_1);//l3
			if ($("#snj_jysp_2").length == 1)
				$("#snj_jysp_2").val(eyeygnew.snj_jysp_2);//r3
			if ($("#d_sp2_r").length == 1)
				$("#d_sp2_r").val(eyeygnew.d_sp2_r);//rbase
			if ($("#d_sp2_l").length == 1)
				$("#d_sp2_l").val(eyeygnew.d_sp2_l);//lbase
			if ($("#d_fcsp1_r").length == 1)
				$("#d_fcsp1_r").val(eyeygnew.d_fcsp1_r);//rbase1
			if ($("#d_fcsp1_l").length == 1)
				$("#d_fcsp1_l").val(eyeygnew.d_fcsp1_l);//lbase1
			if ($("#d_fcsp2_r").length == 1)
				$("#d_fcsp2_r").val(eyeygnew.d_fcsp2_r);//rbase2
			if ($("#d_fcsp2_l").length == 1)
				$("#d_fcsp2_l").val(eyeygnew.d_fcsp2_l);//lbase2
			if ($("#d_jysp_1").length == 1)
				$("#d_jysp_1").val(eyeygnew.d_jysp_1);//lbase3
			if ($("#d_jysp_2").length == 1)
				$("#d_jysp_2").val(eyeygnew.d_jysp_2);//rbase3
			if ($("#jzsl_sp2_r").length == 1)
				$("#jzsl_sp2_r").val(eyeygnew.jzsl_sp2_r);//rvacc
			if ($("#jzsl_sp2_l").length == 1)
				$("#jzsl_sp2_l").val(eyeygnew.jzsl_sp2_l);//lvacc
			if ($("#jzsl_fcsp1_r").length == 1)
				$("#jzsl_fcsp1_r").val(eyeygnew.jzsl_fcsp1_r);//rvacc1
			if ($("#jzsl_fcsp1_l").length == 1)
				$("#jzsl_fcsp1_l").val(eyeygnew.jzsl_fcsp1_l);//lvacc1
			if ($("#jzsl_fcsp2_r").length == 1)
				$("#jzsl_fcsp2_r").val(eyeygnew.jzsl_fcsp2_r);//rvacc2
			if ($("#jzsl_fcsp2_l").length == 1)
				$("#jzsl_fcsp2_l").val(eyeygnew.jzsl_fcsp2_l);//lvacc2
			if ($("#jzsl_jysp_1").length == 1)
				$("#jzsl_jysp_1").val(eyeygnew.jzsl_jysp_1);//lvacc3
			if ($("#jzsl_jysp_2").length == 1)
				$("#jzsl_jysp_2").val(eyeygnew.jzsl_jysp_2);//rvacc3
			if ($("#lyy_sp2_r").length == 1)
				$("#lyy_sp2_r").val(eyeygnew.lyy_sp2_r);//retdrs
			if ($("#lyy_sp2_l").length == 1)
				$("#lyy_sp2_l").val(eyeygnew.lyy_sp2_l);//letdrs
			if ($("#lyy_fcsp1_r").length == 1)
				$("#lyy_fcsp1_r").val(eyeygnew.lyy_fcsp1_r);//retdrs1
			if ($("#lyy_fcsp1_l").length == 1)
				$("#lyy_fcsp1_l").val(eyeygnew.lyy_fcsp1_l);//letdrs1
			if ($("#lyy_fcsp2_r").length == 1)
				$("#lyy_fcsp2_r").val(eyeygnew.lyy_fcsp2_r);//retdrs2
			if ($("#lyy_fcsp2_l").length == 1)
				$("#lyy_fcsp2_l").val(eyeygnew.lyy_fcsp2_l);//letdrs2
			if ($("#lyy_jysp_1").length == 1)
				$("#lyy_jysp_1").val(eyeygnew.lyy_jysp_1);//lretdrs3
			if ($("#lyy_jysp_2").length == 1)
				$("#lyy_jysp_2").val(eyeygnew.lyy_jysp_2);//retdrs3
			if ($("#lyj_sp2_r").length == 1)
				$("#lyj_sp2_r").val(eyeygnew.lyj_sp2_r);//rpd
			if ($("#lyj_sp2_l").length == 1)
				$("#lyj_sp2_l").val(eyeygnew.lyj_sp2_l);//lpd
			if ($("#lyj_fcsp1_r").length == 1)
				$("#lyj_fcsp1_r").val(eyeygnew.lyj_fcsp1_r);//rpd1
			if ($("#lyj_fcsp1_l").length == 1)
				$("#lyj_fcsp1_l").val(eyeygnew.lyj_fcsp1_l);//lpd1
			if ($("#lyj_fcsp2_r").length == 1)
				$("#lyj_fcsp2_r").val(eyeygnew.lyj_fcsp2_r);//rpd2
			if ($("#lyj_fcsp2_l").length == 1)
				$("#lyj_fcsp2_l").val(eyeygnew.lyj_fcsp2_l);//lpd2
			if ($("#lyj_jysp_1").length == 1)
				$("#lyj_jysp_1").val(eyeygnew.lyj_jysp_1);//rpd3
			if ($("#lyj_jysp_2").length == 1)
				$("#lyj_jysp_2").val(eyeygnew.lyj_jysp_2);//lpd3
			if ($("#zk_sp2_r").length == 1)
				$("#zk_sp2_r").val(eyeygnew.zk_sp2_r);//rlogmar
			if ($("#zk_sp2_l").length == 1)
				$("#zk_sp2_l").val(eyeygnew.zk_sp2_l);//llogmar
			if ($("#zk_fcsp1_r").length == 1)
				$("#zk_fcsp1_r").val(eyeygnew.zk_fcsp1_r);//rlogmar1
			if ($("#zk_fcsp1_l").length == 1)
				$("#zk_fcsp1_l").val(eyeygnew.zk_fcsp1_l);//llogmar1
			if ($("#zk_fcsp2_r").length == 1)
				$("#zk_fcsp2_r").val(eyeygnew.zk_fcsp2_r);//rlogmar2
			if ($("#zk_fcsp2_l").length == 1)
				$("#zk_fcsp2_l").val(eyeygnew.zk_fcsp2_l);//llogmar2
			if ($("#zk_jysp_1").length == 1)
				$("#zk_jysp_1").val(eyeygnew.zk_jysp_1);//llogmar3
			if ($("#zk_jysp_2").length == 1)
				$("#zk_jysp_2").val(eyeygnew.zk_jysp_2);//rlogmar3
			if ($("#tjlm").length == 1)
				$("#tjlm").val(eyeygnew.tjlm);
            if ($("#yx_5m").length == 1)
				$("#yx_5m").val(eyeygnew.yx_5m);
			if ($("#yx_40m").length == 1)
				$("#yx_40m").val(eyeygnew.yx_40m);
			if ($("#ac_a").length == 1)
				$("#ac_a").val(eyeygnew.ac_a);//AC_A
			if ($("#worth4").length == 1)
				$("#worth4").val(eyeygnew.worth4);//fcc
			if ($("#nra").length == 1)
				$("#nra").val(eyeygnew.nra);//NRA
			if ($("#pra").length == 1)
				$("#pra").val(eyeygnew.pra);//PRA
			if ($("#kt_xt").length == 1)
				$("#kt_xt").val(eyeygnew.kt_xt);//扩瞳、小童
			if ($("#sffc").length == 1)
				$("#sffc").val(eyeygnew.sffc);//是否复查
			if ($("#ktyw").length == 1)
				$("#ktyw").val(eyeygnew.ktyw);//阿托品
			if ($("#xt_jy").length == 1)
				$("#xt_jy").val(eyeygnew.xt_jy);//小童、近用
			if ($("#jmsxj").length == 1 && eyeygnew.jmsxj == 1)
				$("#jmsxj").attr("checked","checked");//角膜塑形镜
			if ($("#zbqxcxjp").length == 1 && eyeygnew.zbqxcxjp == 1)
				$("#zbqxcxjp").attr("checked","checked");//周边清晰成像镜片
			if ($("#dgj").length == 1 && eyeygnew.dgj == 1)
				$("#dgj").attr("checked","checked");//单光镜
			if ($("#jbj").length == 1 && eyeygnew.jbj == 1)
				$("#jbj").attr("checked","checked");//渐变镜
			if ($("#rgp").length == 1 && eyeygnew.rgp == 1)
				$("#rgp").attr("checked","checked");//RGP
			if ($("#tjxl").length == 1 && eyeygnew.tjxl == 1){
				$("#tjxl").attr("checked","true");}//调节训练
			if ($("#zjxx").length == 1 && eyeygnew.zjxx == 1){
				$("#zjxx").attr("checked","true");}//调节训练
			if ($("#demo").length == 1)
				$("#demo").val(eyeygnew.demo);//备注
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyeygnew.cliDate);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyeygnew.repDoc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyeygnew.doctor);// 检查医生
			if (data_outBaogaoHelp.obj.reportDate != eyeygnew.cliDate) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyeygnew);
			}
		}
	}
}

// ygnew检查报告保存
function saveOrUpdateEyeygnew(state) {
	var parameter_saveOrUpdateEyeygnew = validateAndGetValue_eyeygnew();
	var url_saveOrUpdateEyeygnew = "/publish/Eyeygnew/saveOrUpdateEyeygnew.htm";// ygnew检查报告保存
	var data_saveOrUpdateEyeygnew = getJSONData(
			url_saveOrUpdateEyeygnew,
			parameter_saveOrUpdateEyeygnew,
			"post");
	if (data_saveOrUpdateEyeygnew.state)
		$.oimsSucc("验光检查报告保存成功", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待检患者界面
				closeReporeDialog();
			}
		});
	else
		$.oimsError("验光检查报告保存失败", function() {
			if (state!= undefined &&state == 1) {
				importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待检患者界面
				closeReporeDialog();
			}
		});
}

// ygnew检查报告打印预览
function previewEyeygnew() {
	var parameter_saveOrUpdateEyeygnew = validateAndGetValue_eyeygnew();
	parameter_saveOrUpdateEyeygnew = JSON.stringify(
			parameter_saveOrUpdateEyeygnew)
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
			+ "/js/manager/baogao/previewEyeygnew.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyeygnew="
			+ parameter_saveOrUpdateEyeygnew + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}
function validateAndGetValue_eyeygnew(){
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
		var logmar = $("#logmar").val();//logmar
		var yyly = $("#yyly").val();//logmar
		var qj_sp2_r = $("#qj_sp2_r").val();//rds
		var qj_sp2_l = $("#qj_sp2_l").val();//lds
		var qj_fcsp1_r = $("#qj_fcsp1_r").val();//rds1
		var qj_fcsp1_l = $("#qj_fcsp1_l").val();//lds1
		var qj_fcsp2_r = $("#qj_fcsp2_r").val();//rds2
		var qj_fcsp2_l = $("#qj_fcsp2_l").val();//lds2
		var qj_jysp_1 = $("#qj_jysp_1").val();//rds3
		var qj_jysp_2 = $("#qj_jysp_2").val();//lds3
		var zj_sp2_r = $("#zj_sp2_r").val();//rdc
		var zj_sp2_l = $("#zj_sp2_l").val();//ldc
		var zj_fcsp1_r = $("#zj_fcsp1_r").val();//rdc1
		var zj_fcsp1_l = $("#zj_fcsp1_l").val();//ldc1
		var zj_fcsp2_r = $("#zj_fcsp2_r").val();//rdc2
		var zj_fcsp2_l = $("#zj_fcsp2_l").val();//ldc2
		var zj_jysp_1 = $("#zj_jysp_1").val();//ldc3
		var zj_jysp_2 = $("#zj_jysp_2").val();//rdc3
		var z_sp2_r = $("#z_sp2_r").val();//rax
		var z_sp2_l = $("#z_sp2_l").val();//lax
		var z_fcsp1_r = $("#z_fcsp1_r").val();//rax1
		var z_fcsp1_l = $("#z_fcsp1_l").val();//lax1
		var z_fcsp2_r = $("#z_fcsp2_r").val();//rax2
		var z_fcsp2_l = $("#z_fcsp2_l").val();///lax2
		var z_jysp_1 = $("#z_jysp_1").val();//lax3
		var z_jysp_2 = $("#z_jysp_2").val();//rax3
		var snj_sp2_r = $("#snj_sp2_r").val();//r
		var snj_sp2_l = $("#snj_sp2_l").val();//l
		var snj_fcsp1_r = $("#snj_fcsp1_r").val();//r1
		var snj_fcsp1_l = $("#snj_fcsp1_l").val();//l1
		var snj_fcsp2_r = $("#snj_fcsp2_r").val();//r2
		var snj_fcsp2_l = $("#snj_fcsp2_l").val();//l2
		var snj_jysp_1 = $("#snj_jysp_1").val();//l3
		var snj_jysp_2 = $("#snj_jysp_2").val();//r3
		var d_sp2_r = $("#d_sp2_r").val();//rbase
		var d_sp2_l = $("#d_sp2_l").val();//lbase
		var d_fcsp1_r = $("#d_fcsp1_r").val();//rbase1
		var d_fcsp1_l = $("#d_fcsp1_l").val();//lbase1
		var d_fcsp2_r = $("#d_fcsp2_r").val();//rbase2
		var d_fcsp2_l = $("#d_fcsp2_l").val();//lbase2
		var d_jysp_1 = $("#d_jysp_1").val();//lbase3
		var d_jysp_2 = $("#d_jysp_2").val();//rbase3
		var jzsl_sp2_r = $("#jzsl_sp2_r").val();//rvacc
		var jzsl_sp2_l = $("#jzsl_sp2_l").val();//lvacc
		var jzsl_fcsp1_r = $("#jzsl_fcsp1_r").val();//rvacc1
		var jzsl_fcsp1_l = $("#jzsl_fcsp1_l").val();//lvacc1
		var jzsl_fcsp2_r = $("#jzsl_fcsp2_r").val();//rvacc2
		var jzsl_fcsp2_l = $("#jzsl_fcsp2_l").val();//lvacc2
		var jzsl_jysp_1 = $("#jzsl_jysp_1").val();//lvacc3
		var jzsl_jysp_2 = $("#jzsl_jysp_2").val();//rvacc3
		var lyy_sp2_r = $("#lyy_sp2_r").val();//retdrs
		var lyy_sp2_l = $("#lyy_sp2_l").val();//letdrs
		var lyy_fcsp1_r = $("#lyy_fcsp1_r").val();//retdrs1
		var lyy_fcsp1_l = $("#lyy_fcsp1_l").val();//letdrs1
		var lyy_fcsp2_r = $("#lyy_fcsp2_r").val();//retdrs2
		var lyy_fcsp2_l = $("#lyy_fcsp2_l").val();//letdrs2
		var lyy_jysp_1 = $("#lyy_jysp_1").val();//lretdrs3
		var lyy_jysp_2 = $("#lyy_jysp_2").val();//retdrs3
		var lyj_sp2_r = $("#lyj_sp2_r").val();//rpd
		var lyj_sp2_l = $("#lyj_sp2_l").val();//lpd
		var lyj_fcsp1_r = $("#lyj_fcsp1_r").val();//rpd1
		var lyj_fcsp1_l = $("#lyj_fcsp1_l").val();//lpd1
		var lyj_fcsp2_r = $("#lyj_fcsp2_r").val();//rpd2
		var lyj_fcsp2_l = $("#lyj_fcsp2_l").val();//lpd2
		var lyj_jysp_1 = $("#lyj_jysp_1").val();//rpd3
		var lyj_jysp_2 = $("#lyj_jysp_2").val();//lpd3
		var zk_sp2_r = $("#zk_sp2_r").val();//rlogmar
		var zk_sp2_l = $("#zk_sp2_l").val();//llogmar
		var zk_fcsp1_r = $("#zk_fcsp1_r").val();//rlogmar1
		var zk_fcsp1_l = $("#zk_fcsp1_l").val();//llogmar1
		var zk_fcsp2_r = $("#zk_fcsp2_r").val();//rlogmar2
		var zk_fcsp2_l = $("#zk_fcsp2_l").val();//llogmar2
		var zk_jysp_1 = $("#zk_jysp_1").val();//llogmar3
		var zk_jysp_2 = $("#zk_jysp_2").val();//rlogmar3
		var tjlm = $("#tjlm").val();//TJLM
        var yx_5m = $("#yx_5m").val();//5
		var yx_40m = $("#yx_40m").val();//40
		var ac_a = $("#ac_a").val();//AC_A
		var worth4 = $("#worth4").val();//fcc
		var nra = $("#nra").val();//NRA
		var pra = $("#pra").val();//PRA
		var kt_xt = $("#kt_xt").val();//扩瞳、小童
		var sffc = $("#sffc").val();//是否复查
		var ktyw = $("#ktyw").val();//阿托品
		var xt_jy = $("#xt_jy").val();//小童、近用
		var jmsxj = 0;
		if ($("input[type='checkbox'][name='jmsxj']").attr("checked")=="checked") 
			jmsxj = 1;
		var zbqxcxjp = 0;
		if ($("input[type='checkbox'][name='zbqxcxjp']").attr("checked")=="checked") 
			zbqxcxjp = 1;
		var dgj = 0;
		if ($("input[type='checkbox'][name='dgj']").attr("checked")=="checked") 
			dgj = 1;
		var jbj = 0;
		if ($("input[type='checkbox'][name='jbj']").attr("checked")=="checked") 
			jbj = 1;
		var rgp = 0;
		if ($("input[type='checkbox'][name='rgp']").attr("checked")=="checked") 
			rgp = 1;
		var tjxl = 0;
		if ($("input[type='checkbox'][name='tjxl']").attr("checked")=="checked") 
			tjxl = 1;
		var zjxx = 0;
		if ($("input[type='checkbox'][name='zjxx']").attr("checked")=="checked") 
			zjxx = 1;
		var demo = $("#demo").val();// 备注
		var repDoc = $("#rep_doc option:selected").val();// 申请医生
		var repDoc_name = $("#rep_doc option:selected").text();// 申请医生姓名
		var doctor = $("#doctor option:selected").val();// 检查医生
		var doctor_name = $("#doctor option:selected").text();// 检查医生姓名
		var cliDate = $("#cli_date ").html();// 报告日期
		var parameter_saveOrUpdateEyeygnew = {
			jcdId : jcdId,// 检查单ID
			logmar : logmar,
			yyly : yyly,
			qj_sp2_r : qj_sp2_r,
			qj_sp2_l : qj_sp2_l,
			qj_fcsp1_r : qj_fcsp1_r,
			qj_fcsp1_l : qj_fcsp1_l,
			qj_fcsp2_r : qj_fcsp2_r,
			qj_fcsp2_l : qj_fcsp2_l,
			qj_jysp_1 : qj_jysp_1,
			qj_jysp_2 : qj_jysp_2,
			zj_sp2_r : zj_sp2_r,
			zj_sp2_l : zj_sp2_l,
			zj_fcsp1_r : zj_fcsp1_r,
			zj_fcsp1_l : zj_fcsp1_l,
			zj_fcsp2_r : zj_fcsp2_r,
			zj_fcsp2_l : zj_fcsp2_l,
			zj_jysp_1 : zj_jysp_1,
			zj_jysp_2 : zj_jysp_2,
			z_sp2_r : z_sp2_r,
			z_sp2_l : z_sp2_l,
			z_fcsp1_r : z_fcsp1_r,
			z_fcsp1_l : z_fcsp1_l,
			z_fcsp2_r : z_fcsp2_r,
			z_fcsp2_l : z_fcsp2_l,
			z_jysp_1 : z_jysp_1,
			z_jysp_2 : z_jysp_2,
			snj_sp2_r : snj_sp2_r,
			snj_sp2_l : snj_sp2_l,
			snj_fcsp1_r : snj_fcsp1_r,
			snj_fcsp1_l : snj_fcsp1_l,
			snj_fcsp2_r : snj_fcsp2_r,
			snj_fcsp2_l : snj_fcsp2_l,
			snj_jysp_1 : snj_jysp_1,
			snj_jysp_2 : snj_jysp_2,
			d_sp2_r : d_sp2_r,
			d_sp2_l : d_sp2_l,
			d_fcsp1_r : d_fcsp1_r,
			d_fcsp1_l : d_fcsp1_l,
			d_fcsp2_r : d_fcsp2_r,
			d_fcsp2_l : d_fcsp2_l,
			d_jysp_1 : d_jysp_1,
			d_jysp_2 : d_jysp_2,
			jzsl_sp2_r : jzsl_sp2_r,
			jzsl_sp2_l : jzsl_sp2_l,
			jzsl_fcsp1_r : jzsl_fcsp1_r,
			jzsl_fcsp1_l : jzsl_fcsp1_l,
			jzsl_fcsp2_r : jzsl_fcsp2_r,
			jzsl_fcsp2_l : jzsl_fcsp2_l,
			jzsl_jysp_1 : jzsl_jysp_1,
			jzsl_jysp_2 : jzsl_jysp_2,
			lyy_sp2_r : lyy_sp2_r,
			lyy_sp2_l : lyy_sp2_l,
			lyy_fcsp1_r : lyy_fcsp1_r,
			lyy_fcsp1_l : lyy_fcsp1_l,
			lyy_fcsp2_r : lyy_fcsp2_r,
			lyy_fcsp2_l : lyy_fcsp2_l,
			lyy_jysp_1 : lyy_jysp_1,
			lyy_jysp_2 : lyy_jysp_2,
			lyj_sp2_r : lyj_sp2_r,
			lyj_sp2_l : lyj_sp2_l,
			lyj_fcsp1_r : lyj_fcsp1_r,
			lyj_fcsp1_l : lyj_fcsp1_l,
			lyj_fcsp2_r : lyj_fcsp2_r,
			lyj_fcsp2_l : lyj_fcsp2_l,
			lyj_jysp_1 : lyj_jysp_1,
			lyj_jysp_2 : lyj_jysp_2,
			zk_sp2_r : zk_sp2_r,
			zk_sp2_l : zk_sp2_l,
			zk_fcsp1_r : zk_fcsp1_r,
			zk_fcsp1_l : zk_fcsp1_l,
			zk_fcsp2_r : zk_fcsp2_r,
			zk_fcsp2_l : zk_fcsp2_l,
			zk_jysp_1 : zk_jysp_1,
			zk_jysp_2 : zk_jysp_2,
			tjlm : tjlm,
            yx_5m : yx_5m,
			yx_40m : yx_40m,
			ac_a : ac_a,
			worth4 : worth4,
			nra : nra,
			pra : pra,
			kt_xt : kt_xt,
			sffc : sffc,
			ktyw : ktyw,
			xt_jy : xt_jy,
			jmsxj : jmsxj,
			zbqxcxjp : zbqxcxjp,
			dgj : dgj,
			jbj : jbj,
			rgp : rgp,
			tjxl : tjxl,
			zjxx : zjxx,
			demo : demo,
			baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
			repDoc : repDoc,// 申请医生
			doctor : doctor,// 检查医生
			repDoc_name : repDoc_name,// 申请医生姓名
			doctor_name : doctor_name,// 检查医生姓名
			cliDate : cliDate,// 报告日期
			tag : Math.random()
		}
		return parameter_saveOrUpdateEyeygnew;
}