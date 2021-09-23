var dataObjects_choice_jiancha;// 选中的行数据
var mobanId = -1;// 模板ID
var current_object_div;// 当前操作div
var biaoshiArray = [{
	key:oimsCategory.JCD_STATE_YJC,
	value:"已检查"
},{
	key:oimsCategory.JCD_STATE_DBC,
	value:"待补传"
},{
	key:oimsCategory.JCD_STATE_JCZ,
	value:"检查中"
},{
	key:oimsCategory.JCD_STATE_DSC,
	value:"待上传"
},{
	key:oimsCategory.JCD_STATE_YWC,
	value:"已完成"
}
];

function openDialog_outBaogao_jiancha() {
	debugger;
	importJS("/js/manager/baogao/baogaoController.js");
	initCssAndJs_baogaoAll();
	openDialog_outBaogao_baogaoAll();
	$("#a_closebaogao").unbind("click");
	$("#a_closebaogao").bind("click", renovate_loadFinishJcdList);
	
//	initCssAndJs();
//	
//	dataObjects_choice = null;// 选中行的数据
//	var dataObjects = getCheckBoxValue();
//	if (dataObjects.length == 0) {
//		$.oimsAlert("请选择需要出报告的检查单");
//		return;
//	}
//	dataObjects_choice = dataObjects;// 选中行的数据
//	var url_findBaogaoMobansByBaogaoMoban = "/publish/baogaomoban/findBaogaoMobansByBaogaoMoban.htm";// 根据报告模板对象查询报告模板
//	var data_obj_findBaogaoMobansByBaogaoMoban = getJSONData(
//			url_findBaogaoMobansByBaogaoMoban, {
//				bumenId : dataObjects[0].jcksId,// 检查科室ID
//				jcxmIds : dataObjects[0].jcxmIds,// 检查项目ID
//				tag : Math.random()
//			}, "post").obj;// 报告模板对象
//	var baogaoMoban_jcd = null;
//	if (data_obj_findBaogaoMobansByBaogaoMoban != null
//			&& data_obj_findBaogaoMobansByBaogaoMoban.length != 0) {
//		baogaoMoban_jcd = data_obj_findBaogaoMobansByBaogaoMoban[data_obj_findBaogaoMobansByBaogaoMoban.length - 1];
//		mobanId = baogaoMoban_jcd.id;
//	}
//	if (baogaoMoban_jcd == null) {
//		$.oimsAlert("未配置报告模板");
//		return;
//	}
//	$("#right").html("");// 清空中部div
//	var div_reportdiv = $("<div/>").attr("id", "div_reportdiv").attr("style",
//			"overflow-x:hidden;overflow-y:hidden;");// 主div
//	$(div_reportdiv).appendTo("#right");
//	var div_reportresult = $("<div/>").attr("id", "div_reportresult").attr(
//			"class", "reportresult").appendTo(div_reportdiv);// 报告模板主DIV
//	$(div_reportresult).html(baogaoMoban_jcd.moban);// 模板内容
//	var div_buttonsytle1 = $("<div/>").attr("id", "div_buttonsytle1").attr(
//			"class", "buttonsytle1").attr("style",
//			"width: 640px;margin: 0px auto;");// 操作按钮div
//	$(div_buttonsytle1).appendTo(div_reportdiv);// 追加到主div
//	var a_report = "<a id='a_printreport' class='btnone'><span class='print'></span>"
//			+ "打印" + "</a>";// 打印报告信息
//	$(a_report).appendTo(div_buttonsytle1);
//	var a_save = "<a id='a_savebaogao' class='btnone'><span class='save'></span>"
//			+ "保存" + "</a>";// 保存报告信息
//	$(a_save).appendTo(div_buttonsytle1);
//	var a_close = "<a id='a_closebaogao' class='btnone'><span class='close'></span>"
//			+ "关闭" + "</a>";
//	$(a_close).appendTo(div_buttonsytle1);
//	if (dataObjects_choice[0].jcxmIds == json_jcxm.anshiyingjiancha) {
//		initData_eyejmdxt();
//		$("#a_printreport").bind("click", previewEyejmdxt);
//		$("#a_savebaogao").bind("click", saveOrUpdateEyejmdxt);
//		$("#a_closebaogao").bind("click", renovate_loadFinishJcdList);
//	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.jiaomoneipijishu) {
//		initData_eyejmspjs();
//		$("#a_printreport").bind("click", previewEyejmspjs);
//		$("#a_savebaogao").bind("click", saveOrUpdateEyejmspjs);
//		$("#a_closebaogao").bind("click", renovate_loadFinishJcdList);
//	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.jiaomoqulvji) {
//		initData_eyejmqlj();
//		$("#a_printreport").bind("click", previewEyejmqlj);
//		$("#a_savebaogao").bind("click", saveOrUpdateEyejmqlj);
//		$("#a_closebaogao").bind("click", renovate_loadFinishJcdList);
//	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.qianfangjiaojing) {
//		initData_eyeqfjj();
//		$("#a_printreport").bind("click", previewEyeqfjj);
//		$("#a_savebaogao").bind("click", saveOrUpdateEyeqfjj);
//		$("#a_closebaogao").bind("click", renovate_loadFinishJcdList);
//	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.jiufangwei) {
//		initData_eyetsjjfw();
//		$("#a_printreport").bind("click", previewEyetsjjfw);
//		$("#a_savebaogao").bind("click", saveOrUpdateEyetsjjfw);
//		$("#a_closebaogao").bind("click", renovate_loadFinishJcdList);
//	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.sanjishigongneng) {
//		initData_eyetsjsj();
//		$("#a_printreport").bind("click", previewEyetsjsj);
//		$("#a_savebaogao").bind("click", saveOrUpdateEyetsjsj);
//		$("#a_closebaogao").bind("click", renovate_loadFinishJcdList);
//	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.bchao) {
//		initData_eyebchao();
//		$("#a_printreport").bind("click", previewEyebchao);
//		$("#a_savebaogao").bind("click", saveOrUpdateEyebchao);
//		$("#a_closebaogao").bind("click", renovate_loadFinishJcdList);
//	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.yanya) {
//		initData_eyeballpress();
//		$("#a_printreport").bind("click", previewEyeballpress);
//		$("#a_savebaogao").bind("click", saveOrUpdateEyeballpress);
//		$("#a_closebaogao").bind("click", renovate_loadFinishJcdList);
//	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.yinxiejiancha) {
//		initData_eyeyxjc();
//		$("#a_printreport").bind("click", previewEyeyxjc);
//		$("#a_savebaogao").bind("click", saveOrUpdateEyeyxjc);
//		$("#a_closebaogao").bind("click", renovate_loadFinishJcdList);
//	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.sanmianjing) {
//		initData_eyesmj();
//		$("#a_printreport").bind("click", previewEyesmj);
//		$("#a_savebaogao").bind("click", saveOrUpdateEyesmj);
//		$("#a_closebaogao").bind("click", renovate_loadFinishJcdList);
//	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.ubm) {
//		initData_eyeubm();
//		$("#a_printreport").bind("click", previewEyeubm);
//		$("#a_savebaogao").bind("click", saveOrUpdateEyeubm);
//		$("#a_closebaogao").bind("click", renovate_loadFinishJcdList);
//	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.achao) {
//		initData_eyect();
//		$("#a_printreport").bind("click", previewEyect);
//		$("#a_savebaogao").bind("click", saveOrUpdateEyect);
//		$("#a_closebaogao").bind("click", renovate_loadFinishJcdList);
//	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.oct_huangbangqu_shipan
//			|| dataObjects_choice[0].jcxmIds == json_jcxm.oct_huangbangqu
//			|| dataObjects_choice[0].jcxmIds == json_jcxm.oct_shipan
//			|| dataObjects_choice[0].jcxmIds == json_jcxm.oct_qianjie) {
//		initData_eyeoct();
//		$("#a_printreport").bind("click", previewEyeoct);
//		$("#a_savebaogao").bind("click", saveOrUpdateEyeoct);
//		$("#a_closebaogao").bind("click", renovate_loadFinishJcdList);
//	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.ygzy_yinduoqinglv
//			|| dataObjects_choice[0].jcxmIds == json_jcxm.ygzy_yiguangsunan
//			|| dataObjects_choice[0].jcxmIds == json_jcxm.ygzy_lishede) {
//		initData_eyeygzy();
//		$("#a_printreport").bind("click", previewEyeygzy);
//		$("#a_savebaogao").bind("click", saveOrUpdateEyeygzy);
//		$("#a_closebaogao").bind("click", renovate_loadFinishJcdList);
//	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.ydzx_litizhaoxiang
//			|| dataObjects_choice[0].jcxmIds == json_jcxm.ydzx) {
//		initData_eyeydzx();
//		$("#a_printreport").bind("click", previewEyeydzx);
//		$("#a_savebaogao").bind("click", saveOrUpdateEyeydzx);
//		$("#a_closebaogao").bind("click", renovate_loadFinishJcdList);
//	}
	// else {
	// console.log("其他检查项目");
	// }
	
}

//添加引用css和js(整理)
function initCssAndJs() {
	importJS("/js/jquery.jqprint-0.3.js");
	importJS("/js/jquery.input.js");
	importJS("/js/oims_dengbi.js");
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/js/manager/baogao/eyejmdxt.js");// 暗适应检查报告JS
	importJS("/js/manager/baogao/eyejmspjs.js");// 角膜内皮计数检查报告JS
	importJS("/js/manager/baogao/eyejmqlj.js");// 角膜曲率计检查报告JS
	importJS("/js/manager/baogao/eyeqfjj.js");// 前房角镜检查报告JS
	importJS("/js/manager/baogao/eyetsjjfw.js");// 九方位检查报告JS
	importJS("/js/manager/baogao/eyetsjsj.js");// 三级视功能检查报告JS
	importJS("/js/manager/baogao/eyebchao.js");// B超检查报告JS
	importJS("/js/manager/baogao/eyeballpress.js");// 眼压检查报告JS
	importJS("/js/manager/baogao/eyeyxjc.js");// 隐斜检查报告JS
	importJS("/js/manager/baogao/eyesmj.js");// 三面镜检查报告JS
	importJS("/js/manager/baogao/eyeubm.js");// 超声生物显微镜(UBM)检查报告JS
	importJS("/js/manager/baogao/eyect.js");// A超检查报告JS
	importJS("/js/manager/baogao/eyeoct.js");// OCT检查报告JS
	importJS("/js/manager/baogao/eyeygzy.js");// 荧光造影检查报告JS
	importJS("/js/manager/baogao/eyeydzx.js");// 眼底照相检查报告JS
}

// 已检检查单的高级查询(整理)
function pbg_seniorSearchSubmit_finishJcd() {
	var data_search = {};
	var search = $("#search_binglihao_xingming").val().indexOf("请输入") != -1 ? ""
			: $("#search_binglihao_xingming").val();
	var blh = $("#search_blh").length == 1 ? $("#search_blh").val() : "";// 病例号
	var hzxm = $("#search_hzxm").length == 1 ? $("#search_hzxm").val() : "";// 患者姓名
	var xingbie = $("#search_xingbie").length != 0 ? $(
			"input[name='search_xingbie']:checked").val() : 2;// 患者性别
	var shouji = $("#search_shouji").length == 1 ? $("#search_shouji").val()
			: "";// 手机
	var sfzh = $("#search_sfzh").length == 1 ? $("#search_sfzh").val() : "";// 身份证号

	var zhenbie = $("#search_zhenbie").length != 0 ? $(
			"input[name='search_zhenbie']:checked").val() : "";// 诊别
	var jcxmid = $("#search_jcxmIds").length == 1 ? $(
			"#search_jcxmIds option:selected").val() : "";// 检查项目
	var jcys = $("#search_jcys").length == 1 ? $("#search_jcys option:selected")
			.val()
			: "";// 检查医生
	var startjcsj = $("#search_startjcsj").length == 1 ? $("#search_startjcsj")
			.val() : "";// 检查时间 开始
	var endjcsj = $("#search_endjcsj").length == 1 ? $("#search_endjcsj").val()
			: "";// 检查时间 结束
	var searchBiaoshi;
	if(($("#search_biaoshi").length == 1 ?$("#search_biaoshi option:selected").val() : "")!=""){
		searchBiaoshi = $("#search_biaoshi option:selected").val();
	}else{
		searchBiaoshi="";
		$.each(biaoshiArray,function(index,data){
			if(index==0){
				searchBiaoshi+=data.key;
			}else{
				searchBiaoshi=biaoshi+","+data.key;
			}
		});
	}
	data_search = {
		search : search,
		blh : blh,// 病例号
		hzxm : hzxm,// 患者姓名
		xingbie : xingbie,// 患者性别
		shouji : shouji,// 手机
		sfzh : sfzh,// 身份证号
		zhenbie : zhenbie,// 诊别
		jcxmid : jcxmid,// 检查项目
		jcys : jcys,// 检查医生
		startjcsj : startjcsj,// 检查时间 开始
		endjcsj : endjcsj,
		biaoshi:searchBiaoshi
	};
	$.extend(listFactor.data, data_search);
	$("#pageList").createPageList(listFactor);
}

//	dataObjects_choice_jiancha = null;// 选中行的数据
//	var dataObjects = getCheckBoxValue();
//	if (dataObjects.length == 0) {
//		$.oimsAlert("请选择需要操作的检查单");
//		return;
//	}
//	var url_findBaogaoByBaogao = "/publish/baogao/findBaogaoByBaogao.htm";// 根据报告对象查询报告
//	var data_obj_findBaogaoByBaogao = getJSONData(url_findBaogaoByBaogao, {
//		jcdId : dataObjects[0].id,
//		tag : Math.random()
//	}, "post").obj;
//	if (data_obj_findBaogaoByBaogao != null)// 该检查已经存在报告信息
//	{
//		$.oimsAlert("该检查单已经存在报告信息");
//		return;
//	}
//	var url_findBaogaoMobansByBaogaoMoban = "/publish/baogaomoban/findBaogaoMobansByBaogaoMoban.htm";// 根据报告模板对象查询报告模板
//	var data_obj_findBaogaoMobansByBaogaoMoban = getJSONData(
//			url_findBaogaoMobansByBaogaoMoban, {
//				bumenId : dataObjects[0].jcksId,
//				jcxmIds : dataObjects[0].jcxmIds,
//				tag : Math.random()
//			}, "post").obj;// 报告模板对象
//	var baogaoMoban_jcd = null;
//	if (data_obj_findBaogaoMobansByBaogaoMoban != null
//			&& data_obj_findBaogaoMobansByBaogaoMoban.length != 0) {
//		baogaoMoban_jcd = data_obj_findBaogaoMobansByBaogaoMoban[data_obj_findBaogaoMobansByBaogaoMoban.length - 1];
//		mobanId = baogaoMoban_jcd.id;
//	}
//	if (baogaoMoban_jcd == null) {
//		$.oimsAlert("检查单未配置报告模板");
//		return;
//	}
//	var baogaoMoban_jcd = data_obj_findBaogaoMobansByBaogaoMoban[data_obj_findBaogaoMobansByBaogaoMoban.length - 1];
//	mobanId = baogaoMoban_jcd.id;
//	dataObjects_choice_jiancha = dataObjects;// 选中行的数据
//	$("#right").html("");// 清空中部div
//	var div_reportdiv = $("<div/>").attr("id", "div_reportdiv").attr("class",
//			"reportdiv").attr("style", "overflow-x:hidden;overflow-y:hidden;");// 主div
//	$(div_reportdiv).appendTo("#right");
//	var div_i = $("<div/>").attr("id", "div_i").attr("class", "i").attr(
//			"style", "display:none;");// 删除div
//	$(div_i).appendTo(div_reportdiv);
//	/** 选取图片div开始 */
//	var div_chooseopendiv = $("<div/>").attr("id", "div_chooseopendiv").attr(
//			"class", "chooseopendiv").appendTo(div_reportdiv);// 选取图片div
//	var div_chooseclosebtn = $("<div/>").attr("id", "div_chooseclosebtn").attr(
//			"class", "chooseclosebtn").appendTo(div_chooseopendiv);// 关闭图片div
//	var div_chooseclosebtn_html = "<span>" + "关闭图片" + "</span>";
//	$(div_chooseclosebtn_html).appendTo(div_chooseclosebtn);// 关闭图片
//	$("<div/>").attr("id", "div_chooseopenimg").attr("class", "chooseopenimg")
//			.appendTo(div_chooseopendiv);// 所有图片div
//	var div_chooseimg = $("<div/>").attr("id", "div_chooseimg").attr("class",
//			"chooseimg").appendTo(div_reportdiv);// 打开选取图片div
//	var div_chooseimg_html = "<span>" + "选取图片" + "</span>";
//	$(div_chooseimg_html).appendTo(div_chooseimg);
//	/** 选取图片div结束 */
//	var div_reportresult = $("<div/>").attr("id", "div_reportresult").attr(
//			"class", "reportresult").appendTo(div_reportdiv);// 报告模板主DIV
//	$(div_reportresult).html(baogaoMoban_jcd.moban);// 模板内容
//	var div_buttonsytle1 = $("<div/>").attr("id", "div_buttonsytle1").attr(
//			"class", "buttonsytle1").attr("style",
//			"width: 640px;margin: 0px auto;");// 操作按钮div
//	$(div_buttonsytle1).appendTo(div_reportdiv);// 追加到主div
//	var a_save = "<a href='javascript:saveBaoGao_JianCha();' class='btnone'><span class='save'></span>"
//			+ "保存" + "</a>";// 保存报告信息
//	$(a_save).appendTo(div_buttonsytle1);
//	var a_report = "<a href='javascript:previewBaoGao_JianCha();' class='btnone'><span class='print'></span>"
//			+ "预览" + "</a>";// 预览报告信息
//	$(a_report).appendTo(div_buttonsytle1);
//	setCss_Chooseopendiv_JianCha();// 设置图片选取div的样式
//	setClick_div_baogao_picture_JianCha();// 设置图片div的click事件
//	setCSS_div_baogao_picture_JianCha();// 黑色边框
//	var url_outBaogaoHelp = "/publish/baogao/outBaogaoHelp.htm";// 查询该报告页面所有元素信息
//	var patameter_outBaogaoHelp = {
//		id : dataObjects[0].id,// 检查单ID
//		huanzheId : dataObjects[0].huanzheid,// 患者ID
//		tag : Math.random()
//	};
//	var data_obj_outBaogaoHelp = getJSONData(url_outBaogaoHelp,
//			patameter_outBaogaoHelp, "post").obj;
//	initial_Baogao(data_obj_outBaogaoHelp);// 报告页面各元素赋值
//	set_input_jckj();// 检查可见自动补全设置
//	set_input_jcts();// 检查提示自动补全设置
//	showImagesOfJcd_JianCha();// 显示图片
//	// 图片移除事件
//	$(".i").click(function(e) {
//		$(this.parentNode.firstChild).remove();
//		$(".i").css("display", "none");
//		$(".i").appendTo("#div_reportdiv");
//		showImagesOfJcd_JianCha();
//	});
//}
//
//// 保存报告信息(整理)
//function saveBaoGao_JianCha() {
//	var pic_urls = "";
//	var operateDiv = $(".operateDiv");
//	var array_div = $(operateDiv)[0].children;
//	for ( var i = 0; i < array_div.length; i++) {
//		if (array_div[i].children.length > 0
//				&& array_div[i].firstChild.tagName.toLowerCase() == "img")
//			pic_urls += ($(array_div[i].children[0]).attr("src")) + ",";
//	}
//	var jcdId = dataObjects_choice_jiancha[0].id;// 检查单ID
//	var jckj = $("#jckj").val();// 检查可见
//	var jcts = $("#jcts").val();// 检查提示
//	var bgys = $("#reportDoctor").html();// 报告医生
//	var parameter_saveBaogao = {
//		jcdId : jcdId,// 检查单ID
//		bgys : bgys,// 报告医生
//		jckj : jckj,// 检查可见
//		jcts : jcts,// 检查提示
//		mobanId : mobanId,// 模板ID
//		pic_urls : pic_urls
//	// 图片路径
//	};
//	var url_saveBaogao = "/publish/baogao/saveBaogao.htm";// 保存报告的方法
//	var data_saveBaogao = getJSONData(url_saveBaogao, parameter_saveBaogao,
//			"post");
//	if (data_saveBaogao.state)
//		$.oimsSucc("报告信息保存成功", renovate_loadFinishJcdList);
//	else
//		$.oimsError("报告信息保存失败", renovate_loadFinishJcdList);
//}
//
///*
// * 梁建业 报告信息预览
// */
//function previewBaoGao_JianCha() {
//	var pic_urls = "";
//	var operateDiv = $(".operateDiv");
//	var array_div = $(operateDiv)[0].children;
//	for ( var i = 0; i < array_div.length; i++) {
//		if (array_div[i].children.length > 0
//				&& array_div[i].firstChild.tagName.toLowerCase() == "img")
//			pic_urls += ($(array_div[i].children[0]).attr("src")) + ",";
//	}
//	var jcdId = dataObjects_choice_jiancha[0].id;// 检查单ID
//	var jckj = $("#jckj").val();// 检查可见
//	var jcts = $("#jcts").val();// 检查提示
//	var bgys = $("#reportDoctor").html();// 报告医生
//	var html_div_reportresult = $("#div_reportresult").html();// 报告内容
//	var printWindow = window.open("");
//	html_baogao = "";
//	html_baogao += "<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'>";
//	html_baogao += "<html>";
//	html_baogao += "<head>";
//	html_baogao += "<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>";
//	html_baogao += "<title>报告预览</title>";
//	html_baogao += "<script language='javascript'> var contextPath='"
//			+ contextPath + "';</script>";
//	html_baogao += "<link rel='stylesheet' type='text/css' href='"
//			+ contextPath + "/css/main.css' rel='stylesheet' type='text/css'>";
//	html_baogao += "<link rel='stylesheet' type='text/css' href='"
//			+ contextPath
//			+ "/style/green/css/green.css' rel='stylesheet' type='text/css'>";
//	html_baogao += "<link rel='stylesheet' type='text/css' href='"
//			+ contextPath + "/css/icon.css' rel='stylesheet' type='text/css'>";
//	html_baogao += "<link rel='stylesheet' type='text/css' href='"
//			+ contextPath
//			+ "/style/green/css/openWin.css' rel='stylesheet' type='text/css'>";
//	html_baogao += "<script src='" + contextPath
//			+ "/js/jquery.min.js'></script>";
//	html_baogao += "<script src='" + contextPath + "/js/common.js'></script>";
//	html_baogao += "<script src='" + contextPath
//			+ "/js/oimsCategory.config.js'></script>";
//	html_baogao += "<script src='" + contextPath
//			+ "/js/jquery.oimsDialog.js'></script>";
//	html_baogao += "<script src='" + contextPath
//			+ "/js/manager/baogao/language.config.js'></script>";
//	html_baogao += "<script src='" + contextPath
//			+ "/js/manager/jiancha/printBaoGaoImport.js'></script>";
//	html_baogao += "<script type='text/javascript'>";
//	html_baogao += "var jcdId=" + jcdId + ",bgys='" + bgys + "',jckj='" + jckj
//			+ "',jcts='" + jcts + "',mobanId=" + mobanId + ",pic_urls='"
//			+ pic_urls + "';";
//	html_baogao += "</script>";
//	html_baogao += "</head>";
//	html_baogao += "<body id='body_baogao' text-align='center'>";
//	html_baogao += html_div_reportresult;
//	html_baogao += "</body>";
//	html_baogao += "</html>";
//	printWindow.document.write(html_baogao);
//	printWindow.document.close();
//}
//
///*
// * 梁建业 设置图片div的click事件
// */
//function setClick_div_baogao_picture_JianCha() {
//	var operateDiv = $(".operateDiv");
//	var array_div = $(operateDiv)[0].children;
//	for ( var i = 0; i < array_div.length; i++) {
//		$(array_div[i]).bind("click", function() {
//			setCSS_div_baogao_picture_JianCha();
//			$(this).css("border", "1px solid red");
//			current_object_div = this;
//		});
//		$(array_div[i]).mouseover(function(e) {
//			var event = window.event || e;
//			var target = event.srcElement || event.target;
//			if (target.tagName.toLowerCase() == "img") {
//				var left = target.offsetLeft + target.offsetWidth - 16;
//				var top = target.offsetTop - $("#right")[0].scrollTop;
//				if (top < parseInt($("#header").height())) {
//					$(".i").css("display", "none");
//				} else {
//					$(".i").css({
//						"position" : "absolute",
//						"display" : "",
//						"left" : left + "px",
//						"top" : top + "px",
//						"z-index" : "9999"
//					});
//				}
//				$(".i").appendTo(this);
//			}
//		});
//		$("#right").scroll(function() {
//			$(".i").css("display", "none");
//		});
//	}
//}
//
///*
// * 梁建业 设置图片div的css样式
// */
//function setCSS_div_baogao_picture_JianCha() {
//	var operateDiv = $(".operateDiv");
//	var array_div = $(operateDiv)[0].children;
//	for ( var i = 0; i < array_div.length; i++)
//		$(array_div[i]).css("border", "1px solid black");
//}
//
///*
// * 梁建业 设置图片选取div的样式
// */
//function setCss_Chooseopendiv_JianCha() {
//	var width = $(".chooseopendiv").width(), divHeight = $("body").height()
//			- $(".header").height() - $(".footer").height(), divTop = $(
//			".header").height(), divOpenHeight = divHeight - 22;
//	$(".chooseopendiv").css({
//		"right" : "-" + width + "px",
//		"height" : divHeight + "px",
//		"top" : divTop + "px"
//	});
//	$(".chooseopenimg").css("height", divOpenHeight + "px");
//	$(".chooseimg").click(function() {
//		// 从数据库中获取数据
//		$(this).animate({
//			"opacity" : "0"
//		}, 100, function() {
//			$(this).css("z-index", "-9999");
//			$(".chooseopendiv").animate({
//				"right" : "0px"
//			}, "slow");
//		});
//	});
//	$(".chooseclosebtn").click(function() {
//		$(".chooseopendiv").animate({
//			"right" : "-" + width + "px"
//		}, "slow", function() {
//			$(".chooseimg").css({
//				"opacity" : "1",
//				"z-index" : "9999"
//			}, 10);
//		});
//	});
//}
//
///*
// * 梁建业 显示图片
// */
//function showImagesOfJcd_JianCha() {
//	var url_getFileListByJcd = "/publish/jcd/getFileListByJcd.htm";
//	var data_getFileListByJcd = getJSONData(url_getFileListByJcd, {
//		id : dataObjects_choice_jiancha[0].id,
//		tag : Math.random()
//	}, "post");
//	if (data_getFileListByJcd.state) {
//		var data_getJcdPhotoList = data_getFileListByJcd.obj;
//		$("#div_chooseopenimg").html("");
//		var div_oimsslide_gallery = $("<div/>").attr("id",
//				"div_oimsslide_gallery").attr("class", "oimsslide-gallery")
//				.appendTo("#div_chooseopenimg");// oimsslide
//		// div
//		var div_oimsslide_gallery_html = "";// div_oimsslide_gallery div内容
//		var breakCondition = false;
//		var operateDiv = $(".operateDiv");
//		var array_div = $(operateDiv)[0].children;
//		$
//				.each(
//						data_getJcdPhotoList,
//						function(i, data_Photo) {
//							for ( var i = 0; i < array_div.length; i++) {
//								if (array_div[i].children.length > 0
//										&& array_div[i].firstChild.tagName
//												.toLowerCase() == "img") {
//									var src_img = $(array_div[i].children[0])
//											.attr("src");
//									if (src_img == (contextPath + data_Photo.path
//											.replace("thumb/", ""))) {
//										breakCondition = true;
//										break;
//									} else
//										breakCondition = false;
//								} else
//									breakCondition = false;
//							}
//							if (!breakCondition) {
//								var fileFormat = data_Photo.path.substring(
//										data_Photo.path.indexOf(".") + 1)
//										.toLowerCase();
//								if (fileFormat != "flv") {
//									div_oimsslide_gallery_html += "<div style='height: 200px;width: 190px;vertical-align: middle;text-align: center;float: left;padding-top:5px'>";
//									div_oimsslide_gallery_html += "<a href='"
//											+ contextPath
//											+ data_Photo.path.replace("thumb/",
//													"")
//											+ "' class='oimsslide' onclick='return hs.expand(this);'>";
//									div_oimsslide_gallery_html += "<img style='height:160px;width:185px;' src='"
//											+ contextPath
//											+ data_Photo.path
//											+ "' alt='oimsslide JS' title='双击放大' /></a>";
//									div_oimsslide_gallery_html += "<div><input type='checkbox' name='checkbox_baogao_picture' id='checkbox_baogao_picture' value='"
//											+ contextPath
//											+ data_Photo.path.replace("thumb/",
//													"")
//											+ "' onclick='click_checkbox_baogao_picture_jiancha(this)'/></div>";
//									div_oimsslide_gallery_html += "</div>";
//								}
//							}
//						});
//		$(div_oimsslide_gallery_html).appendTo(div_oimsslide_gallery);
//	}
//}
//
///*
// * 梁建业 单击事件 复选框
// */
//function click_checkbox_baogao_picture_jiancha(object_checkbox_baogao_picture) {
//	if (current_object_div == undefined) {
//		var operateDiv = $(".operateDiv");
//		var array_div = $(operateDiv)[0].children;
//		if (array_div.length > 0)
//			current_object_div = array_div[0];
//	}
//	$(".i").appendTo("#div_reportdiv");
//	$(current_object_div).html("");
//	var id_image = encryption();
//	var clientWidth = current_object_div.clientWidth;
//	var clientHeight = current_object_div.clientHeight;
//	var image_current_object_div = dengbisuofang.createImg(id_image,
//			object_checkbox_baogao_picture.value, clientWidth, clientHeight);
//	$(image_current_object_div).appendTo(current_object_div);
//	$(image_current_object_div).attr("class", "class_image_div");
//	showImagesOfJcd_JianCha();// 显示图片
//}
//
/*
 * 梁建业 刷新页面
 */
function renovate_loadFinishJcdList() {
	if (!isResetJiancha())// 检查单检查中判断是否终止检查
		return;
	pageTitle = "已完成检查单";
	init();
	shebeiManager();// 检查设备配置验证
	var finishJcdFunTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='23%' class='leftalign' ><input name='search_binglihao_xingming' type='text' class='blurview' id='search_binglihao_xingming' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value="
			+ "请输入病历号或患者姓名"
			+ " size='28' /></td>"
			+ "<td width='10%'>" 
			+ "<select name='search_jcxmIds' id='search_biaoshi' onblur=\"this.className='blur'\">"
			+ "<option value=''></option></select></td>" 
			+ "<td width='9%'><a href='javascript:pbg_seniorSearchSubmit_finishJcd();' class='search'>"
			+ "查询"
			+ "</a></td>"
			+ "<td width='9%'><a href='javascript:finishJcdAdvSearch();' class='advsearch'>"
			+ "高级查询"
			+ "</a></td>"
			+ "<td width='59%' >"
			+ "<div class='btn'>"
			+ "<a onclick='return false;' href='javascript:showJcdPhoto();'><span class='viewa'></span>"
			+ "查看"
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:openDialog_outBaogao_jiancha();'><span class='reporta'></span>"
			+ "出报告"
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:importJcdPhoto_FinishJcd();'><span class='importa'></span>"
			+ "导入"
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:exportJcdPhoto();'><span class='exporta'></span>"
			+ "导出"
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:choiceJcdPhoto();'><span class='oufroma'></span>"
			+ "筛选"
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:resetJcdPhoto();'><span class='reseta'></span>"
			+ "重置" + "</a>" + "</div>" + "</td>" + "</tr>" + "</table>";

	$("<div/>").attr("id", "advquery").addClass("advquery").appendTo("#right");
	$(finishJcdFunTemplate).appendTo("#advquery");
	btnProwerConfig(btns_jiancha);// 按钮加上权限
	$.each(biaoshiArray,function(index,data){
		if(index==0){
			biaoshi+=data.key;
		}else{
			biaoshi=biaoshi+","+data.key;
		}
		$("<option value='"+data.key+"'>"+data.value+"</option>").appendTo("#search_biaoshi");
	});
	loadFinishJcdList();// 已检检查单列表
	$("#search_binglihao_xingming").click(function() {
		clearInitQuery(this);
	});// 点击输入框清空字体
	$("#search_binglihao_xingming").blur(function() {
		if (this.value == "") {
			$("#search_binglihao_xingming").val("请输入病历号或姓名");
			$("#search_binglihao_xingming").addClass("blurview");
		}
	});
	$("#search_binglihao_xingming").bind("keydown", function(e) {
		if (e.which == 13) {
			pbg_seniorSearchSubmit_finishJcd();
		}
	});
	$("#search_biaoshi").change(function(){
		pbg_seniorSearchSubmit_finishJcd();
	});
}