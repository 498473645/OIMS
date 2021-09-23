var data_baogao_shebeis;// 所有的设备信息
var dataObjects_choice;// 选中的行数据
var btns_baoGaoIs;// 权限btns
var current_object_div;//当前操作的DIV
// 报告管理首次加载调用方法-已出报告检查单列表(整理)
function Ready_baoGaoIs(btns) {
	btns_baoGaoIs = btns;
	pageTitle = "已出报告检查单";
	init();
	var div_advquery = $("<div/>").attr("id", "advquery").attr("class",
			"advquery").appendTo("#right");
	var table_advquery = "";
	table_advquery += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	table_advquery += "<tr>"
			+ "<td width='23%' class='leftalign' ><input name='search_jcdh' type='text' class='blurview' id='search_jcdh' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"
			+ "请输入检查单号"
			+ "' size='28' /></td>"
			+ "<td width='9%'><a href='javascript:do_AdvancedSearch_baogaoIs();' class='search'>"
			+ "查询"
			+ "</a></td>"
			+ // 普通查询
			"<td width='9%'><a href='javascript:openDialog_AdvancedSearch_Jcd_baogaoIs();' class='advsearch' id='advsearch'>"
			+ "高级查询"
			+ "</a></td>"
			+ // 高级查询
			"<td width='59%' >"
			+ "<div class='btn'>"
			+ "<a onclick='return false;' href='javascript:seeBaogao_baogaoIs();'><span class='viewa'></span>"
			+ "查看" + "</a>"
			+ "<a onclick='return false;'><span class='edita'></span>" + "修改"
			+ "</a>"
			+ "<a onclick='return false;'><span class='reseta'></span>" + "重置"
			+ "</a>"
			+ "<a onclick='return false;'><span class='nullifya'></span>"
			+ "作废" + "</a>"
			+ "<a onclick='return false;'><span class='outfroma'></span>"
			+ "提取" + "</a>" + "</div>" + "</td>" + "</tr>";
	table_advquery += "</table>";
	$(table_advquery).appendTo(div_advquery);
	btnProwerConfig(btns);// 按钮加上权限
	showJcdOfFinshIsList();// 已完成检查单列表
	initialData_baogaoIs();// 初始化报告必要的数据
	$("#search_jcdh").click(function() {
		clearInitQuery(this);
	});// 点击输入框清空字体
	$("#search_jcdh").blur(function() {
		if (this.value == "") {
			$("#search_jcdh").val("请输入检查单号");
			$("#search_jcdh").addClass("blurview");
		}

	});
	$("#search_jcdh").bind("keyup", function(e) {
		if (e.which == 13) {
			do_AdvancedSearch_baogaoIs();
		}
	});
//	initCssAndJs_baogaoIs();// 添加引用css和js
}
// 刷新列表(整理)
function renovate_BaoGaoIs() {
	pageTitle = "已出报告检查单";
	init();
	var div_advquery = $("<div/>").attr("id", "advquery").attr("class",
			"advquery").appendTo("#right");
	var table_advquery = "";
	table_advquery += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	table_advquery += "<tr>"
			+ "<td width='23%' class='leftalign' ><input name='search_jcdh' type='text' class='blurview' id='search_jcdh' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"
			+ "请输入检查单号"
			+ "' size='28' /></td>"
			+ "<td width='9%'><a href='javascript:do_AdvancedSearch_baogaoIs();' class='search'>"
			+ "查询"
			+ "</a></td>"
			+ // 普通查询
			"<td width='9%'><a href='javascript:openDialog_AdvancedSearch_Jcd_baogaoIs();' class='advsearch' id='advsearch'>"
			+ "高级查询"
			+ "</a></td>"
			+ // 高级查询
			"<td width='59%' >"
			+ "<div class='btn'>"
			+ "<a onclick='return false;' href='javascript:seeBaogao_baogaoIs();'><span class='viewa'></span>"
			+ "查看" + "</a>"
			+ "<a onclick='return false;'><span class='edita'></span>" + "修改"
			+ "</a>"
			+ "<a onclick='return false;'><span class='reseta'></span>" + "重置"
			+ "</a>"
			+ "<a onclick='return false;'><span class='nullifya'></span>"
			+ "作废" + "</a>"
			+ "<a onclick='return false;'><span class='outfroma'></span>"
			+ "提取" + "</a>" + "</div>" + "</td>" + "</tr>";
	table_advquery += "</table>";
	$(table_advquery).appendTo(div_advquery);
	btnProwerConfig(btns_baoGaoIs);// 按钮加上权限
	showJcdOfFinshIsList();// 已完成检查单列表
	initialData_baogaoIs();// 初始化报告必要的数据
	$("#search_jcdh").click(function() {
		clearInitQuery(this);
	});// 点击输入框清空字体
	$("#search_jcdh").blur(function() {
		if (this.value == "") {
			$("#search_jcdh").val("请输入检查单号");
			$("#search_jcdh").addClass("blurview");
		}

	});
	$("#search_jcdh").bind("keyup", function(e) {
		if (e.which == 13) {
			do_AdvancedSearch_baogaoIs();
		}
	});
	initCssAndJs_baogaoIs();// 添加引用css和js
}

// 添加引用css和js(整理)
function initCssAndJs_baogaoIs() {
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
	importJS("/js/manager/baogao/eyegcsy.js");// 眼底照相检查报告JS
}
// 初始化报告必要的数据(整理)
function initialData_baogaoIs() {
	var url_findAllSheBeis = "/publish/shebei/findAllSheBeis.htm";// 查询所有设备实体信息
	data_baogao_shebeis = getJSONData(url_findAllSheBeis, {
		tag : Math.random()
	}, "post").obj;// 所有的设备信息
}

/*
 * 梁建业 已完成检查单列表
 */
function showJcdOfFinshIsList() {
	listFactor = {
		listObj : [
//				{
//					title : "序号",
//					key : "jcdid"
//				},
				{
					title : "病历号",
					key : "binglihao"
				},
//				{
//					title : "检查单号",
//					key : "jcdh"
//				},
				{
					title : "姓名",
					key : "xingming"
				},
				{
					title : "性别",
					key : "xingbie",
					func : function(value) {
						return (value == 0) ? "女" : "男";
					}
				},
				{
					title : "年龄",
					key : "shengri",
					func : function(value) {
						var date_now = new Date();
						var string_shengri = value;
						var array_shengri = string_shengri.split("-");
						var date_shengri = new Date(array_shengri[0],
								array_shengri[1],
								array_shengri[2].split(" ")[0]);
						var age = Math.floor((date_now - date_shengri)
								/ (1000 * 60 * 60 * 24) / 365);
						if (age < 0)
							return 0;
						else
							return age;
					}
				}, {
					title : "手机",
					key : "shouji"
				},
//				{
//					title : "身份证",
//					key : "sfzh"
//				}, 
				{
					title : "检查设备",
					key : "sbmc"
				}, 
//				{
//					title : "检查科室",
//					key : "bmmc"
//				}, 
				{
					title : "检查项目",
					key : "xmmc"
				}, 
				{
					title : "眼别",
					key : "yanbie_name"
				},
//				{
//					title : "状态",
//					key : "state_name"
//				}, 
				{
					title : "检查时间",
					key : "jcksTime"
				} ],
		url : contextPath
				+ "/publish/jcd/findJcdsByPageAndJcdAndHuanZheXinXi.htm",
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			biaoshi : oimsCategory.JCD_STATE_YWC,// 标识表示检查单已完成
			haveBaogao : 1,// 表示该检查的已经存在报告
			tag : Math.random()
		}
	};
	var div_list = $("<div/>").attr("id", "div_list").attr("class", "list")
			.appendTo("#right");
	$(div_list).createPageList(listFactor);
}

// 弹出高级查询窗口(整理)
function openDialog_AdvancedSearch_Jcd_baogaoIs() {
	var table_AdvancedSearch = "";
	table_AdvancedSearch += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	table_AdvancedSearch += "<tr>"
			+ "<td width='7%' align='right' nowrap>"
			+ "病历号"
			+ "：</td>"
			+ "<td width='15%'><input type='text' name='search_binglihao'   id='search_binglihao'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "<td width='7%' align='right' nowrap>"
			+ "姓名"
			+ "：</td>"
			+ "<td width='15%'><input type='text' name='search_xingming'   id='search_xingming'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "<td width='7%' align='right' nowrap>"
			+ "联系电话"
			+ "：</td>"
			+ "<td width='15%'><input type='text' name='search_shouji'   id='search_shouji'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "</tr>";
	table_AdvancedSearch += "<tr>"
			+ "<td align='right' nowrap>"
			+ "身份证"
			+ "：</td>"
			+ "<td>"
			+ "<input type='text' name='search_sfzh'   id='search_sfzh'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' />"
			+ "</td>"
			+ "<td align='right' nowrap>"
			+ "检查设备"
			+ "：</td>"
			+ "<td>"
			+ "<select name='search_jcsbId' id='search_jcsbId' onblur=\"this.className='blur'\">"
			+ "<option value=''></option>"
			+ "</select>"
			+ "</td>"
			+ "<td align='right' nowrap>"
			+ "检查项目"
			+ "：</td>"
			+ "<td>"
			+ "<select name='search_jcxmIds' id='search_jcxmIds' onblur=\"this.className='blur'\">"
			+ "<option value=''></option>" + "</select>" + "</td>" + "</tr>";
	table_AdvancedSearch += "</table>";
	table_AdvancedSearch += " <div class='avdopenbutton' >";
	table_AdvancedSearch += "<a href='javascript:do_AdvancedSearch_baogaoIs();'><span class='advsumit'></span>"
			+ "提交"
			+ "</a> "
			+ "<a href='javascript:reset_AdvancedSearch_baogaoIs();'><span class='advreset'></span>"
			+ "重置"
			+ "</a>"
			+ "<a id = 'closeId'><span class='close' ></span>"
			+ "关闭" + "</a>";
	table_AdvancedSearch += "</div>";
	$.oimsBox({
		parentDiv : "advquery",// 将生成内容添加的id
		divContent : table_AdvancedSearch
	// 需要添加的内容
	});
	$("#search_jcsbId")[0].options.length = 0;// 清空检查设备下拉框
	$("#search_jcxmIds")[0].options.length = 0;// 清空检查项目下拉框
	$("<option value=''></option>").appendTo("#search_jcsbId");
	$("<option value=''></option>").appendTo("#search_jcxmIds");
	// 设备下拉框赋值
	$.each(data_baogao_shebeis, function(i, shebei) {
		$("<option value=\"" + shebei.id + "\">" + shebei.sbmc + "</option>")
				.appendTo("#search_jcsbId");
	});
	onchange_search_jcsbId_BaoGaoIs();
	$("#search_jcsbId").change(onchange_search_jcsbId_BaoGaoIs);// 检查设备关联检查项目
}

// 检查设备onchange事件(整理)
function onchange_search_jcsbId_BaoGaoIs() {
	$("#search_jcxmIds")[0].options.length = 0;// 清空检查项目下拉框
	$("<option value=''></option>").appendTo("#search_jcxmIds");
	var value_search_jcsbId = $("#search_jcsbId option:selected").val();// 检查设备
	if (value_search_jcsbId != "") {
		var url_findJcxmsBySheBeiId = "/publish/jcxm/findJcxmsBySheBeiId.htm";
		var data_obj_findJcxmsBySheBeiId = getJSONData(url_findJcxmsBySheBeiId,
				{
					id : value_search_jcsbId,
					tag : Math.random()
				}, "post").obj;
		// 检查项目下拉框赋值
		$.each(data_obj_findJcxmsBySheBeiId, function(i, jcxm) {
			$("<option value=\"" + jcxm.id + "\">" + jcxm.xmmc + "</option>")
					.appendTo("#search_jcxmIds");
		});
	}
}
// 执行高级查询(整理)
function do_AdvancedSearch_baogaoIs() {
	var data_search = {};
	var jcdh = $("#search_jcdh").val().indexOf("请输入") != -1 ? "" : $(
			"#search_jcdh").val();// 检查单号
	var binglihao = $("#search_binglihao").length == 1 ? $("#search_binglihao")
			.val() : "";// 病例号
	var xingming = $("#search_xingming").length == 1 ? $("#search_xingming")
			.val() : "";// 患者姓名
	var shouji = $("#search_shouji").length == 1 ? $("#search_shouji").val()// 联系方式，手机
	: "";
	var sfzh = $("#search_sfzh").length == 1 ? $("#search_sfzh").val() : "";// 身份证号
	var jcsbId = $("#search_jcsbId").length == 1 ? $(
			"#search_jcsbId option:selected").val() : "";// 检查设备
	var jcxmIds = $("#search_jcxmIds").length == 1 ? $(
			"#search_jcxmIds option:selected").val() : "";// 检查项目
	data_search = {
		jcdh : jcdh,// 检查单号
		binglihao : binglihao,// 病历号
		xingming : xingming,// 患者姓名
		shouji : shouji,// 联系方式，手机
		sfzh : sfzh,// 身份证号
		jcsbId : jcsbId,// 检查设备
		jcxmIds : jcxmIds
	// 检查项目
	};
	$.extend(listFactor.data, data_search);
	$("#div_list").createPageList(listFactor);
}

// 重置AdvancedSearch(整理)
function reset_AdvancedSearch_baogaoIs() {
	$("#search_binglihao").val("");// 病历号
	$("#search_xingming").val("");// 患者姓名
	$("#search_shouji").val("");// 联系方式，手机
	$("#search_sfzh").val("");// 身份证
	selectItemByValue("search_jcsbId", "");// 检查设备
	onchange_search_jcsbId_BaoGaoIs();
}

// 报告查看(整理)
function seeBaogao_baogaoIs() {
	importJS("/js/manager/baogao/baogaoController.js");
	initCssAndJs_baogaoAll();
	openDialog_outBaogao_baogaoAll();
	$("#a_closebaogao").unbind("click");
	$("#a_closebaogao").bind("click", renovate_BaoGaoIs);
/*	dataObjects_choice = null;// 选中行的数据
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要查看报告的检查单");
		return;
	}
	dataObjects_choice = dataObjects;// 选中行的数据
	var url_findBaogaoMobansByBaogaoMoban = "/publish/baogaomoban/findBaogaoMobansByBaogaoMoban.htm";// 根据报告模板对象查询报告模板
	var data_obj_findBaogaoMobansByBaogaoMoban = getJSONData(
			url_findBaogaoMobansByBaogaoMoban, {
				bumenId : dataObjects[0].jcksId,// 检查科室ID
				jcxmIds : dataObjects[0].jcxmIds,// 检查项目ID
				tag : Math.random()
			}, "post").obj;// 报告模板对象
	var baogaoMoban_jcd = null;
	if (data_obj_findBaogaoMobansByBaogaoMoban != null
			&& data_obj_findBaogaoMobansByBaogaoMoban.length != 0) {
		baogaoMoban_jcd = data_obj_findBaogaoMobansByBaogaoMoban[data_obj_findBaogaoMobansByBaogaoMoban.length - 1];
	}
	if (baogaoMoban_jcd == null) {
		$.oimsAlert("未配置报告模板");
		return;
	}
	$("#right").html("");// 清空中部div
	var div_reportdiv = $("<div/>").attr("id", "div_reportdiv").attr("style",
			"overflow-x:hidden;overflow-y:hidden;");// 主div
	$(div_reportdiv).appendTo("#right");
	var div_reportresult = $("<div/>").attr("id", "div_reportresult").attr(
			"class", "reportresult").appendTo(div_reportdiv);// 报告模板主DIV
	$(div_reportresult).html(baogaoMoban_jcd.moban);// 模板内容
	var div_buttonsytle1 = $("<div/>").attr("id", "div_buttonsytle1").attr(
			"class", "buttonsytle1").attr("style",
			"width: 640px;margin: 0px auto;");// 操作按钮div
	$(div_buttonsytle1).appendTo(div_reportdiv);// 追加到主div
	var a_report = "<a id='a_printreport' class='btnone'><span class='print'></span>"
			+ "打印" + "</a>";// 打印报告信息
	$(a_report).appendTo(div_buttonsytle1);
	var a_update = "<a id='a_updatebaogao' class='btnone'><span class='edit'></span>"
			+ "修改" + "</a>";// 保存报告信息
	$(a_update).appendTo(div_buttonsytle1);
	var a_close = "<a id='a_closebaogao' class='btnone'><span class='close'></span>"
			+ "关闭" + "</a>";
	$(a_close).appendTo(div_buttonsytle1);
	if (dataObjects_choice[0].jcxmIds == json_jcxm.anshiyingjiancha) {
		$("#a_printreport").bind("click", previewEyejmdxt);
		$("#a_updatebaogao").bind("click", saveOrUpdateEyejmdxt);
		$("#a_closebaogao").bind("click", renovate_BaoGaoIs);
		initData_eyejmdxt();
	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.jiaomoneipijishu) {
		$("#a_printreport").bind("click", previewEyejmspjs);
		$("#a_updatebaogao").bind("click", saveOrUpdateEyejmspjs);
		$("#a_closebaogao").bind("click", renovate_BaoGaoIs);
		initData_eyejmspjs();
	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.jiaomoqulvji) {
		$("#a_printreport").bind("click", previewEyejmqlj);
		$("#a_updatebaogao").bind("click", saveOrUpdateEyejmqlj);
		$("#a_closebaogao").bind("click", renovate_BaoGaoIs);
		initData_eyejmqlj();
	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.qianfangjiaojing) {
		$("#a_printreport").bind("click", previewEyeqfjj);
		$("#a_updatebaogao").bind("click", saveOrUpdateEyeqfjj);
		$("#a_closebaogao").bind("click", renovate_BaoGaoIs);
		initData_eyeqfjj();
	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.jiufangwei) {
		$("#a_printreport").bind("click", previewEyetsjjfw);
		$("#a_updatebaogao").bind("click", saveOrUpdateEyetsjjfw);
		$("#a_closebaogao").bind("click", renovate_BaoGaoIs);
		initData_eyetsjjfw();
	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.sanjishigongneng) {
		$("#a_printreport").bind("click", previewEyetsjsj);
		$("#a_updatebaogao").bind("click", saveOrUpdateEyetsjsj);
		$("#a_closebaogao").bind("click", renovate_BaoGaoIs);
		initData_eyetsjsj();
	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.yanya) {
		$("#a_printreport").bind("click", previewEyeballpress);
		$("#a_updatebaogao").bind("click", saveOrUpdateEyeballpress);
		$("#a_closebaogao").bind("click", renovate_BaoGaoIs);
		initData_eyeballpress();
	}else if (dataObjects_choice[0].jcxmIds == json_jcxm.bchao) {
		$("#a_printreport").bind("click", previewEyebchao);
		$("#a_updatebaogao").bind("click", saveOrUpdateEyebchao);
		$("#a_closebaogao").bind("click", renovate_BaoGaoIs);
		initData_eyebchao();
	}else if (dataObjects_choice[0].jcxmIds == json_jcxm.yinxiejiancha) {
		$("#a_printreport").bind("click", previewEyeyxjc);
		$("#a_updatebaogao").bind("click", saveOrUpdateEyeyxjc);
		$("#a_closebaogao").bind("click", renovate_BaoGaoIs);
		initData_eyeyxjc();
	}else if (dataObjects_choice[0].jcxmIds == json_jcxm.sanmianjing) {
		initData_eyesmj();
		$("#a_printreport").bind("click", previewEyesmj);
		$("#a_updatebaogao").bind("click", saveOrUpdateEyesmj);
		$("#a_closebaogao").bind("click", renovate_BaoGaoIs);
	}else if (dataObjects_choice[0].jcxmIds == json_jcxm.ubm) {
		initData_eyeubm();
		$("#a_printreport").bind("click", previewEyeubm);
		$("#a_updatebaogao").bind("click", saveOrUpdateEyeubm);
		$("#a_closebaogao").bind("click", renovate_BaoGaoIs);
	}else if (dataObjects_choice[0].jcxmIds == json_jcxm.achao) {
		initData_eyect();
		$("#a_printreport").bind("click", previewEyect);
		$("#a_updatebaogao").bind("click", saveOrUpdateEyect);
		$("#a_closebaogao").bind("click", renovate_BaoGaoIs);
	}else if (dataObjects_choice[0].jcxmIds == json_jcxm.oct_huangbangqu_shipan||dataObjects_choice[0].jcxmIds == json_jcxm.oct_huangbangqu||dataObjects_choice[0].jcxmIds == json_jcxm.oct_shipan||dataObjects_choice[0].jcxmIds == json_jcxm.oct_qianjie) {
		initData_eyeoct();
		$("#a_printreport").bind("click", previewEyeoct);
		$("#a_updatebaogao").bind("click", saveOrUpdateEyeoct);
		$("#a_closebaogao").bind("click", renovate_BaoGaoIs);
	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.ygzy_yinduoqinglv
			|| dataObjects_choice[0].jcxmIds == json_jcxm.ygzy_yiguangsunan
			|| dataObjects_choice[0].jcxmIds == json_jcxm.ygzy_lishede) {
		initData_eyeygzy();
		$("#a_printreport").bind("click", previewEyeygzy);
		$("#a_updatebaogao").bind("click", saveOrUpdateEyeygzy);
		$("#a_closebaogao").bind("click", renovate_BaoGaoIs);
	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.ydzx_litizhaoxiang
			|| dataObjects_choice[0].jcxmIds == json_jcxm.ydzx) {
		initData_eyeydzx();
		$("#a_printreport").bind("click", previewEyeydzx);
		$("#a_updatebaogao").bind("click", saveOrUpdateEyeydzx);
		$("#a_closebaogao").bind("click", renovate_BaoGaoIs);
	}else if (dataObjects_choice[0].jcxmIds == json_jcxm.shiye
			|| dataObjects_choice[0].jcxmIds == json_jcxm.weishiye) {
		initData_eyegcsy();
		$("#a_printreport").bind("click", previewEyegcsy);
		$("#a_savebaogao").bind("click", saveOrUpdateEyegcsy);
		$("#a_closebaogao").bind("click", renovate_BaoGaoNotIs);
	}*/
//	else if(dataObjects_choice[0].JcxmIds==){
//		
//	}
	
}
