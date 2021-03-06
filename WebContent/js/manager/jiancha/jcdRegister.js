var btns_jcdDengji;
var activePageMenu;
var global_flag;
var first_tijiao = true;
var baogao_flag;
var jiancha_flag;
/** *************************************检查单登记按钮首次加载调用的方法************************************** */
function jcdDengjiReady(btns) {
	btns_jcdDengji = btns;
	pageTitle = "检查单登记";
	init();
	var div_tablabel = $("<div/>").attr("id", "div_tablabel").attr("class",
			"tablabel").appendTo("#right");

	var div1_6 = $("<div/>").attr("id", "div1_6").attr("class", "tab_hide")
			.attr("onclick", "PageMenuActive_jcdDengji('div1_6','jcd')")
			.appendTo(div_tablabel);
	var div1_6_html = "<span>检查单</span>";
	$(div1_6_html).appendTo(div1_6);

	var div1_5 = $("<div/>").attr("id", "div1_5").attr("class", "tab_hide")
			.attr("onclick", "PageMenuActive_jcdDengji('div1_5','huanzhe')")
			.appendTo(div_tablabel);
	var div1_5_html = "<span>患者</span>";
	$(div1_5_html).appendTo(div1_5);
	$("<div/>").attr("id", "div_main").appendTo("#right");// 主Div对象

	setPageMenu_jcdDengji('div1_5');
	PageMenuActive_jcdDengji('div1_5', 'huanzhe');
}

/**
 * div层的显示隐藏切换，选项卡切换函数
 */
function PageMenuActive_jcdDengji(objName, DjFlag) {
	document.getElementById(activePageMenu).className = 'tab_hide';
	document.getElementById(objName).className = 'tab_show';
	$("#div_main").html("");
	var div_advquery = $("<div/>").attr("id", "advquery").attr("class",
			"advquery").appendTo("#div_main");
	var dengJiJcdFunTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='23%' class='leftalign' ><input name='search_binglihao_xingming' type='text' class='blurview' id='search_binglihao_xingming' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='请输入患者ID、患者姓名或刷卡' size='28'/></td>"
			+ "<td width='9%'><a href='javascript:showSearchDengJiFrom();' class='search'>"
			+ "查询"
			+ "</a></td>"
			+ "<td width='9%'><a href='javascript:openDialog_AdvancedSearch_JcdDengJi();' class='advsearch'>"
			+ "高级查询"
			+ "</a></td>"
			+ "<td width='59%' >"
			+ "<div class='btn'><a  href='javascript:doJcdDengJi();'><span class='registera'></span>"
			+ "登记" + "</a>" + "</div>" + "</td>" + "</tr>" + "</table>";
	$(dengJiJcdFunTemplate).appendTo(div_advquery);
	btnProwerConfig(btns_jcdDengji);// 按钮加上权限
	if (DjFlag == 'huanzhe') {
		showList_HuanZheXinXi_JcdDengJi();
	} else if (DjFlag == 'jcd') {
		loadDenJiJcdList();// 检查单登记列表
	}
	activePageMenu = objName;
	global_flag = DjFlag;
	$("#search_binglihao_xingming").val("").focus();
	$("#search_binglihao_xingming").click(function() {
		clearInitQuery(this);
	});
	$("#search_binglihao_xingming").blur(function() {
		if (this.value == "") {
			$("#search_binglihao_xingming").val("请输入患者ID、患者姓名或刷卡");
			$("#search_binglihao_xingming").addClass("blurview");
		}
	});
	$("#search_binglihao_xingming").bind("keyup", function(e) {
		if (e.which == 13) {
			showSearchDengJiFrom();
		}
	});
}
// 获取页面page的高度，最终得到分页高度(整理)
function getPageSizeToDengJi() {
	var bannerHeight = $("#header").outerHeight();
	var bottomHeight = $("#footer").outerHeight();
	var div_tabHeight = $(".tablabel").outerHeight();
	var winHeight = $(window).height();
	var bodyHeight = winHeight - bannerHeight - bottomHeight - div_tabHeight;
	var h = bodyHeight - 78;
	return Math.floor(h / 25);
}

// 全局赋值
function setPageMenu_jcdDengji(menuName) {
	activePageMenu = menuName;
}
/** *****************************************检查单列表开始******************************************* */
function loadDenJiJcdList() {
	listFactor = {
		listObj : [ {
			title : "序号",
			key : "paihao"
		}, {
			title : "检查单号",
			key : "jcdh"
		}, {
			title : "患者ID",
			key : "binglihao"
		}, {
			title : "患者姓名",
			key : "hzxm"
		}, {
			title : "患者性别",
			key : "hzxb"
		}, {
			title : "年龄",
			key : "nianling"
		}, {
			title : "检查项目",
			key : "jcxmmc"
		}, {
			title : "眼别",
			key : "yanbie",
			func : function(value) {
				if (value == oimsCategory.LEFT_EYE)
					return "左眼";
				else if (value == oimsCategory.RIGHT_EYE)
					return "右眼";
				else if (value == oimsCategory.DOUBLE_EYE)
					return "双眼";
				else
					return "";
			}
		}, {
			title : "开单时间",
			key : "kdsj"
		}, {
			title : "检查时间",
			key : "jssj"
		}, {
			title : "状态",
			key : "biaoshi"
		} ],
		url : contextPath + "/publish/jcd/getDengJiJcdList.htm",// 查询待登记的检查单
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			biaoshi : null,// 查询所有的检查单
			jcsbId : task.jcsbid,// 检查设备ID
			tag : Math.random()
		}
	};
	$("#pageList").remove();
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#right");
	$(div_list).createPageList(listFactor);
}
/** *****************************************检查单列表结束******************************************* */

/** *******************************************患者列表开始******************************************** */
function showList_HuanZheXinXi_JcdDengJi() {
	listFactor = {
		listObj : [ {
			title : "序号",
			key : "paihao"
		}, {
			title : "患者ID",
			key : "binglihao"
		}, {
			title : "姓名",
			key : "xingming"
		}, {
			title : "性别",
			key : "xingbie",
			func : function(value) {
				if (value)
					return "男";
				else
					return "女";
			}
		}, {
			title : "出生日期",
			key : "shengri"
		}, {
			title : "身份证号",
			key : "sfzh"
		}, {
			title : "手机号码",
			key : "shouji"
		}, {
			title : "工作单位",
			key : "gzdw"
		}, {
			title : "注册时间",
			key : "zcrq"
		}, {
			title : "所属地区",
			key : "diqu"
		} ],
		url : contextPath + "/publish/huanZheXinXi/findHuanZheList.htm",
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			tag : Math.random()
		}
	};
	$("#pageList").remove();
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#right");
	$(div_list).createPageList(listFactor);
}
/** *******************************************患者列表结束******************************************** */

/** **********************************************检查单登记操作开始************************************************ */
function doJcdDengJi() {
	if (global_flag == 'huanzhe') {
		openDialog_doJcdDengJi_HuanZheXinXi();
	}
	if (global_flag == 'jcd') {

	}

};

// 患者登记检查单
function openDialog_doJcdDengJi_HuanZheXinXi() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要登记检查单的患者");
		return;
	}
	var table_doJcdDengJi = getTable_doJcdDengJi();
	var form_dengJiJcd = oimsFormWindow({
		id : "form_dengJiJcd",
		url : contextPath + "/publish/jcd/dengJiJcd.htm",
		dialogTitle : "患者检查单登记",
		icon : "register",
		height : 300,
		width : 900,
		resetForm : initData_form_dengJiJcd,
		btnOkSuccess : function(data, responseText, statusText) {
			if (data.state) {
				$.oimsSucc("患者检查单登记操作成功", function() {
					showList_HuanZheXinXi_JcdDengJi();
					removeDiv_openWin();
					if(baogao_flag){
					importJS("/js/manager/baogao/baoGaoNotIsManagerXiNan.js");
					var submitBtn2 = $("#menu").find("li").find("a[title=报告管理]");
					submitBtn2.click();
					var submitBtn3 = $("#menu").find("li").find("a[title=未出报告]");
					submitBtn3.click();
					var binglihao_search =dataObjects[0].binglihao;
					$("#search_binglihao").val(binglihao_search);
					do_AdvancedSearch_baogaoNotIs();
					var options = document.getElementsByName("checkBoxObj");
					if(options.length == 1){
						options[0].checked='true';
						openDialog_outBaogao_baogaoNotIs();
					}
					baogao_flag = false;
					}
					if(jiancha_flag){
						importJS("/js/manager/jiancha/jcdExecute.js");
						var submitBtn3 = $("#menu").find("li").find("a[title=待检患者]");
						submitBtn3.click();
						var binglihao_search =dataObjects[0].binglihao;
						$("#search_binglihao_xingming").val(binglihao_search);
						seniorSearchSubmit_executeJcd();
						jiancha_flag = false;
					}
				});
				$("body").keyup(function(e){
					if(e.which == 32)
					$("div.openbutton a").find("span[class=submit]").parent().attr("href","#").click();
				});
				first_tijiao=true;
			} else {
				$.oimsError("患者检查单登记操作失败", function() {
					showList_HuanZheXinXi_JcdDengJi();
					removeDiv_openWin();
				});
			}
		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
			$.oimsError("患者检查单登记操作失败", function() {
				showList_HuanZheXinXi_JcdDengJi();
				removeDiv_openWin();
			});
		},
		btnOkBefor : validate_form_dengJiJcd
	});
	form_dengJiJcd.append(table_doJcdDengJi);
	form_dengJiJcd
			.append("<input type='hidden' id='huanzhexinxiId' name='huanzhexinxiId' value=''/>");
	// 患者基本信息赋值begin
	var url_findHuanZheById = "/publish/huanZheXinXi/findHuanZheById.htm";
	var data_findHuanZheById = getJSONData(url_findHuanZheById, {
		id : dataObjects[0].id,
		tag : Math.random()
	}, "post");
	if (data_findHuanZheById.state) {
		var huanzhexinxi = data_findHuanZheById.obj;
		$("#huanzhexinxiId").val(huanzhexinxi.id);
		$("#binglihao").val(huanzhexinxi.binglihao);// 病历号
		$("#xingming").val(huanzhexinxi.xingming);// 患者姓名
		utilTool().radioSelect('xingbie', huanzhexinxi.xingbie,
				$("#form_dengJiJcd"));// 性别
		$("#shouji").val(huanzhexinxi.shouji);// 手机
		$("#shengri").val(
				formatDateTime(huanzhexinxi.shengri.time).split(" ")[0]);// 生日
		$("#dianhua").val(huanzhexinxi.dianhua);// 电话
		$("#sfzh").val(huanzhexinxi.sfzh);// 身份证号
		utilTool().radioSelect('laiyuan', huanzhexinxi.laiyuan,
				$("#form_dengJiJcd"));// 患者来源
		$("#diqu").val(huanzhexinxi.diqu);// 所属地区
	}
//	var url_getUniqueJCDH = "/publish/jcd/getUniqueJCDH.htm";
//	var data_getUniqueJCDH = getJSONData(url_getUniqueJCDH, {
//		tag : Math.random()
//	}, "post");
//	if (data_getUniqueJCDH.state) {
//		if (data_getUniqueJCDH.obj != "")
//			$("#jcdh").val(data_getUniqueJCDH.obj);// 检查单号
//	}
	$("#jcdh").blur(function() {
		var jcdh = $("#jcdh").val();
		var url_getJcdByJCDH = "/publish/jcd/getJcdByJcdh.htm";
		var data_getJcdByJCDH = getJSONData(url_getJcdByJCDH, {
			jcdh : jcdh,
			tag : Math.random()
		}, "POST");
		if (data_getJcdByJCDH.obj != null) {
			$.oimsAlert("检查单号已存在，请重新更换");
			$("#jcdh").val("");
			$("#jcdh").focus();
		}
	});
	// 患者登记检查单基本信息赋值begin
	initData_form_dengJiJcd();
	//添加检查单登记和出报告合并按钮
	var a = $("<a href='javascript:openDialog_outBaogao_jcdRegister()';><span class='report'></span>"
			+ "出报告" + "</a>").appendTo($(".openbutton"));
	var a = $("<a href='javascript:openDialog_jiancha_jcdRegister()';> <span class='reset'></span>"
			+ "做检查" + "</a>").appendTo($(".openbutton"));
}
//登记检查单并打开出报告窗口
function openDialog_outBaogao_jcdRegister(){
	var submitBtn1 = $(".openbutton").find("span.advsumit").parent();
	submitBtn1.click();
	baogao_flag = true;
}
function openDialog_jiancha_jcdRegister(){
	var submitBtn1 = $(".openbutton").find("span.advsumit").parent();
	submitBtn1.click();
	jiancha_flag = true;
}
//初始化登记检查单表单数据
function initData_form_dengJiJcd() {
	var dataObj = getCheckBoxValue();
	$("#yanbie").val("");
	$("#jcksId", "#form_dengJiJcd")[0].options.length = 0;
	$("#jcxmIds", "#form_dengJiJcd")[0].options.length = 0;
	$("#kdysId", "#form_dengJiJcd")[0].options.length = 0;
	var url_findAllBuMen = "/publish/bumen/findAllBuMen.htm";// 查询所有部门
	data_findAllBuMen = getJSONData(url_findAllBuMen, {
		tag : Math.random()
	}, "post");
	if (data_findAllBuMen.state) {
		$.each(data_findAllBuMen.obj, function(i, bumen) {
			if (bumen.bmbm == oimsCategory.YANKE_BUMEN_BIANMA) {
				$(
						"<option selected = 'selected' value=\"" + bumen.id + "\">" + bumen.bmmc
								+ "</option>").appendTo("#jcksId",
						"#form_dengJiJcd");
			} else {
				$(
						"<option value=\"" + bumen.id + "\">" + bumen.bmmc
								+ "</option>").appendTo("#jcksId",
						"#form_dengJiJcd");
			}
		});
	}
	onchange_jcksId_form_dengjiJcd();
//	$("#jcksId", "#form_dengJiJcd").change(onchange_jcksId_form_dengjiJcd);
	// 开单医生下拉框赋值
	var kdysData1 = getJSONData(
			"/publish/yuangong/getKaiDanDoctorByHuanZheId.htm", {
				huanzheId : dataObj[0].id,
				tag : Math.random()
			}, "post");
	var kdysData = getJSONData(
			"/publish/yuangong/getKaiDanDoctorByQuanxian.htm", {
				tag : Math.random()
			}, "post");
	if (kdysData.state) {
		var yuangonglist = kdysData.obj;
		$.each(yuangonglist,
				function(i, d) {
					$(
							"<option value=\"" + d.gonghao + "\">" + (d.xingming=='admin'?'-':d.xingming)
									+ "</option>").appendTo("#kdysId");
				});
	}
	if (kdysData1.state) {
		var kdysLast = kdysData1.obj;
		if (kdysLast != null && kdysLast != 'admin'){
			$("#kdysId").val(kdysLast);
		}
	}
	// 开单医生下拉框赋值
}
function onchange_jcksId_form_dengjiJcd() {
	$("#jcxmIds")[0].options.length = 0;// 清空检查项目下拉框
//	var value_bumenId = $("#jcksId option:selected").val();// 所属科室
	var url_findJcxmsByCategoryIdAndBgsId = "/publish/jcxm/findJcxmList.htm";
	var data_findJcxmsByCategoryIdAndBgsId = getJSONData(url_findJcxmsByCategoryIdAndBgsId, {
		categoryId : 5,
	//	bgsId : 128,
		currentPage : 1,
		pageSize : 1000,// Page类的方法
		tag : Math.random()
	}, "post");
//	var url_findJcxmsByGH = "/publish/jcxm/findJcxmsByGH.htm";// 根据部门ID，查询该部门下所有可以做的检查项目
//	var data_findJcxmsByGH = getJSONData(url_findJcxmsByGH, {
//		tag : Math.random()
//	}, "post");
	var data_findJcxmsByGH=currentStaff.jcxmIds;
	var url_findAllJcxm = "/publish/jcxm/findAllJcxm.htm"; // 查询所有检查项目信息
	var data_list_jcxmobj = getJSONData(url_findAllJcxm, {
		categoryId:oimsCategory.YAN_KE_JIAN_CHA,
		currentPage:1,
		pageSize:1000,
		tag : Math.random()
	}, "post").obj;
	data_list_jcxmobj=$.merge(data_list_jcxmobj,data_findJcxmsByCategoryIdAndBgsId.obj);
	$.each(data_list_jcxmobj,function(i,jcxmobj){
		if(data_findJcxmsByGH.indexOf(jcxmobj.id.toString())!=-1){
			if(jcxmobj.id.toString()=='1000049'||jcxmobj.id.toString()=='1000050'){
				$("<option value=\"" + jcxmobj.id + "\">" + jcxmobj.xmmc + "</option>")
			.prependTo("#jcxmIds");
			}else{
				$("<option value=\"" + jcxmobj.id + "\">" + jcxmobj.xmmc + "</option>")
			.appendTo("#jcxmIds");
			}
			
		}
	});
	
//	var data_findAllJcxms = $.merge(data_findJcxmsByBmId.obj,data_findJcxmsByCategoryIdAndBgsId.obj);
//	if (data_findJcxmsByGH /*|| data_findJcxmsByCategoryIdAndBgsId.state*/) {
//		$.each(data_findJcxmsByGH.split(","), function(i, jcxm) {
//			$("<option value=\"" + jcxm.id + "\">" + jcxm.xmmc + "</option>")
//					.appendTo("#jcxmIds");
//		});
//	}
	if($.cookie("jcxmid") != null){
		var jcxmid = $.cookie("jcxmid");
		$("#jcxmIds").val(jcxmid);
	}
}
// 检查单登记验证方法
function validate_form_dengJiJcd() {
	var oValidataData = {
		nullValidataData : {
			'jcksId' : "检查科室为空",
			'jcxmIds' : "检查项目为空",
			'yanbie' : "眼别为空",
			'kdysId' : "开单医生为空"
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);// 带*为必填项
		return false;
	}
	$.cookie("jcxmid",$("#jcxmIds").val(),{expires: 365});
	if(first_tijiao){
		first_tijiao=false;
		$("#form_dengJiJcd").parent().next().children('a:eq(0)').attr("onclick","return false;");
		return true;
	}else{
		return false;
	}
}

// 表格信息返回——检查单登记(整理)
function getTable_doJcdDengJi() {
	var table_doJcdDengJile = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='11%' align='right' nowrap='nowrap'>"
			+ "患者ID"
			+ "：</td>"
			+ "<td width='20%' align='left'><input name='binglihao' readOnly='true' type='text' class='blur' id='binglihao' onfocus=\"this.className='focus'\" onblur=\"this.className='blur';checkIsStrEmpty(this);\"/></td>"
			+ "<td width='1%' align='left' nowrap='nowrap'><span class='required'>*</span></td>"
			+ "<td width='11%' align='right' nowrap='nowrap'>"
			+ "患者姓名"
			+ "：</td>"
			+ "<td width='25%' align='left'><input name='xingming' readOnly='true' type='text' class='blur' id='xingming' onfocus=\"this.className='focus'\" onblur=\"this.className='blur';checkIsStrEmpty(this);\"  /></td>"
			+ "<td width='1%' align='left'><span class='required'>*</span></td>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "患者性别"
			+ "：</td>"
			+ "<td align='left'><input type='radio' name='xingbie' readOnly='true' id='xingbie' value='1'  /> "
			+ "男"
			+ "<input type='radio' name='xingbie' readOnly='true' id='xingbie' value='0' />"
			+ "女"
			+ "</td>"
			+ "<td align='left' nowrap='nowrap'>&nbsp;</td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td width='11%' align='right' nowrap='nowrap'>"
			+ "手机号"
			+ "：</td>"
			+ "<td width='23%' align='left'><input name='shouji' readOnly='true' type='text' maxlength=11 class='blur' id='shouji' onfocus=\"this.className='focus'\" onblur=\"this.className='blur';checkIsStrEmpty(this);checkIsPhone(this);\"  /></td>"
			+ "<td width='1%' align='left' nowrap='nowrap'><span class='required'>*</span></td>"
			+ "<td width='11%' align='right' nowrap='nowrap'>"
			+ "出生日期"
			+ "：</td>"
			+ "<td width='25%' align='left'><input name='shengri' readOnly='true' type='text' class='blur' id='shengri' onfocus=\"this.className='focus'\" onblur=\"this.className='blur';checkIsStrEmpty(this);\"/></td>"
			+ "<td width='1%' align='left'><span class='required'>*</span></td>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "联系电话"
			+ "：</td>"
			+ "<td align='left'><input name='dianhua' type='text' class='blur' readOnly='true' id='dianhua' onfocus=\"this.className='focus'\" onblur=\"this.className='blur';checkIsTel(this);\"/></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "身份证号"
			+ "：</td>"
			+ "<td align='left'><input name='sfzh' type='text' class='blur' readOnly='true' id='sfzh' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\"  /></td>"
			+ "<td width='1%' align='left' nowrap='nowrap'></td>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "患者来源"
			+ "：</td>"
			+ " <td align='left' colspan=5>"
			+ "<input type='radio' name='huanzhelaiyuan' id='huanzhelaiyuan' value='1001' readOnly='true'/>网络&nbsp;&nbsp;&nbsp;"
			+ "<input type='radio' name='laiyuan' id='laiyuan' value='1002' readOnly='true'/>电视&nbsp;&nbsp;&nbsp;"
			+ "<input type='radio' name='laiyuan' id='laiyuan' value='1003' readOnly='true'/>广播&nbsp;&nbsp;&nbsp;"
			+ "<input type='radio' name='laiyuan' id='laiyuan' value='1004' readOnly='true'/>报纸杂志&nbsp;&nbsp;&nbsp;"
			+ "<input type='radio' name='laiyuan' id='laiyuan' value='1005' readOnly='true'/>经人介绍&nbsp;&nbsp;&nbsp;"
			+ "<input type='radio' name='laiyuan' id='laiyuan' value='1006' readOnly='true'/>其他"
			+ "</td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "所属地区"
			+ "：</td>"
			+ "<td align='left'><input name='diqu' type='text' readOnly='true' class='blur' id='diqu' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\"  /></td>"
			+ "<td width='1%' align='left' nowrap='nowrap'></td>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "挂号号码"
			+ "：</td>"
			+ " <td align='left'><input name='haoma' type='text' class='blur' id='haoma' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\"/></td>"
			+ " <td align='left' nowrap='nowrap'></td>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "诊别"
			+ "：</td>"
			+ "<td align='left' nowrap='nowrap'>"
			+ "<input type='radio' name='zhenbie' id='zhenbie' value='2' checked/>"
			+ "门诊"
			+ " &nbsp;&nbsp;&nbsp;"
			+ "<input type='radio' name='zhenbie' id='zhenbie' value='3' />"
			+ "住院"
			+ "</td>"
			+ "<td align='left'>&nbsp;</td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td width='10%' align='right' nowrap='nowrap'>"
			+ "检查单号"
			+ "：</td>"
			+ "<td width='20%' align='left'>"
			+ "<input name='jcdh' type='text' class='blur' id='jcdh' onfocus=\"this.className='focus'\" onblur=\"this.className='blur';\"/>"
			+ "</td>"
			+ "<td width='1%' align='left' nowrap='nowrap'></td>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "检查科室"
			+ "：</td>"
			+ "<td align='left'><select id='jcksId' name='jcksId' onblur=\"this.className='blur';checkIsStrEmpty(this);\">"
			+ "</select></td>"
			+ " <td align='left' nowrap='nowrap'><span class='required'>*</span></td>"
			+ " <td align='right' nowrap='nowrap'>"
			+ "检查项目"
			+ "：</td>"
			+ "<td align='left'><select id='jcxmIds' name='jcxmIds' style='width: 270px' onblur=\"this.className='blur'\">"
			+ "</select>"
			+ "</td>"
			+ "<td align='left' nowrap='nowrap'><span class='required'>*</span></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "眼别"
			+ "：</td>"
			+ "<td align='left'><select name='yanbie' id='yanbie'>"
			+ "<option value='48'>"
			+ "双眼"
			+ "</option>"
			+ "<option value='46'>"
			+ "左眼"
			+ "</option>"
			+ "<option value='47'>"
			+ "右眼"
			+ "</option>"
			+ "</select>"
			+ "</td>"
			+ "<td align='left' nowrap='nowrap'><span class='required'>*</span></td>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "开单医生"
			+ "：</td>"
			+ "<td align='left'><select id='kdysId' name='kdysId' onblur=\"this.className='blur';checkIsStrEmpty(this);\">"
			+ "<option value=''></option>"
			+ "</select></td>"
			+ "<td align='left' nowrap='nowrap'><span class='required'>*</span></td>"
			+ " <td align='right' nowrap='nowrap'>"
			+ "检查要求"
			+ "：</td>"
			+ " <td align='left'><input name='jcyq' type='text' class='blur' id='jcyq' onfocus=\"this.className='focus'\" onblur=\"this.className='blur';\"/></td>"
			+ " <td align='left' nowrap='nowrap'>&nbsp;</td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "缴费状态"
			+ "：</td>"
			+ "<td align='left'><input type='radio' name='jfbs' id='jfbs' value='0'/>"
			+ "否"
			+ "<input type='radio' name='jfbs' id='jfbs' value='1'  checked/>"
			+ "是"
			+ "</td>"
			+ "<td align='left'>&nbsp;</td>"
			+ "</tr>"
			+ "</table>";
	var table = $(table_doJcdDengJile);
	return table;
};

/** **********************************************检查单登记操作结束************************************************ */

function showSearchDengJiFrom() {
	if (global_flag == 'huanzhe') {
		seniorSearchSubmit_HuanZheXinXi_JcdDengJi();
	}
	if (global_flag == 'jcd') {
		seniorSearchSubmit_Jcd_JcdDengJi();
	}
}

// 高级查询，选择调用患者还是检查单(整理)
function openDialog_AdvancedSearch_JcdDengJi() {
	if (global_flag == 'huanzhe')
		openDialog_AdvancedSearch_HuanZheXinXi_JcdDengJi();
	if (global_flag == "jcd")
		openDialog_AdvancedSearch_Jcd_JcdDengJi();
}

/** ***********************************************检查单高级查询开始************************************************* */
function openDialog_AdvancedSearch_Jcd_JcdDengJi() {
	var seniorSearchTemplate = " <table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ " <tr>"
			+ " <td width='7%' align='right' nowrap>"
			+ "病例号"
			+ "：</td>"
			+ " <td width='12%'><input type='text' name='search_blh'   id='search_blh'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "  <td width='7%' align='right' nowrap>"
			+ "患者姓名"
			+ "：</td>"
			+ " <td width='12%'><input type='text' name='search_hzxm'   id='search_hzxm'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "  <td width='5%' align='right' nowrap>"
			+ "患者性别"
			+ "：</td>"
			+ "  <td width='10%'><input type='radio' name='search_xingbie' id='search_xingbie' value='1'/>"
			+ "男"
			+ "&nbsp;&nbsp;&nbsp;<input type='radio' name='search_xingbie' id='search_xingbie' value='0'/>"
			+ "女"
			+ "&nbsp;&nbsp;&nbsp;<input type='radio' name='search_xingbie' id='search_xingbie' value='2'/>"
			+ "全部"
			+ "</td>"
			+ " <td width='7%' align='right' nowrap>"
			+ "手机"
			+ "：</td>"
			+ " <td width='13%'><input type='text' name='search_shouji'   id='search_shouji'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ " <td align='right' nowrap>"
			+ "身份证号"
			+ "：</td>"
			+ " <td ><input type='text' name='search_sfzh'   id='search_sfzh'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ " </tr>"
			+ " <tr>"
			+ " <td width='4%' align='right' nowrap>"
			+ "诊别"
			+ "：</td>"
			+ " <td width='7%'><input type='radio' name='search_zhenbie' id='search_zhenbie' value='2'/>"
			+ "门诊"
			+ "&nbsp;<input type='radio' name='search_zhenbie' id='search_zhenbie' value='3'/>"
			+ "住院"
			+ "&nbsp;<input type='radio' name='search_zhenbie' id='search_zhenbie' value='1'/>"
			+ "全部"
			+ "</td>"
			+ " <td align='right' nowrap>"
			+ "检查项目"
			+ "：</td>"
			+ " <td><select name='search_jcxmIds' id='search_jcxmIds' onblur=\"this.className='blur'\">"
			+ " <option value=''></option>"
			+ " </select></td>"
			+ " <td width='8%' align='right' nowrap>"
			+ "开单医生"
			+ "：</td>"
			+ " <td width='13%'><select name='search_kdys' id='search_kdys' onblur=\"this.className='blur'\">"
			+ " <option value=''></option>"
			+ " </select></td>"
			+ " <td align='right' nowrap> "
			+ "开单时间"
			+ "：</td>"
			+ " <td><input type='text' name='search_startkdsj'   id='search_startkdsj'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ " <td align='center' nowrap>"
			+ "至"
			+ "</td>"
			+ " <td><input type='text' name='search_endkdsj'   id='search_endkdsj'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ " </tr>"
			+ " </table>"
			+ " <div class='avdopenbutton' >"
			+ " <a href='javascript:seniorSearchSubmit_Jcd_JcdDengJi();'><span class='advsumit'></span>"
			+ "提交"
			+ "</a>"
			+ " <a href='javascript:seniorSearchReset_Jcd_JcdDengJi();'><span class='advreset'></span>"
			+ "重置"
			+ "</a>"
			+ "<a id = 'closeId'><span class='close' ></span>"
			+ "关闭" + "</a>" + " </div> ";
	$.oimsBox({
		parentDiv : "advquery",// 将生成内容添加的id
		divContent : seniorSearchTemplate
	// 需要添加的内容
	});
	calendarFun("search_startkdsj");// 开始开单时间
	calendarFun("search_endkdsj", -70);// 结束开单时间

	// 检查项目下拉框赋值
	var jcxmData = getJSONData("/publish/jcxm/getJcxmListByGonghao.htm", {// 根据员工工号获取对应的检查项目
		tag : Math.random()
	}, "post");
	if (jcxmData.state) {
		var jcxmlist = jcxmData.obj;
		$.each(jcxmlist, function(i, d) {
			$("<option value=\"" + d.id + "\">" + d.xmmc + "</option>")
					.appendTo("#search_jcxmIds");
		});
	}
	// 检查项目下拉框赋值

	// 开单医生下拉框赋值
	var kdysData = getJSONData(
			"/publish/yuangong/getKaiDanDoctorByQuanxian.htm", {
				tag : Math.random()
			}, "post");
	if (kdysData.state) {
		var yuangonglist = kdysData.obj;
		$.each(yuangonglist,
				function(i, d) {
					$(
							"<option value=\"" + d.gonghao + "\">" + d.xingming
									+ "</option>").appendTo("#search_kdys");
				});
	}
	// 开单医生下拉框赋值
}

function seniorSearchSubmit_Jcd_JcdDengJi() {
	var data_search = {};
	var search = $("#search_binglihao_xingming").val().indexOf("请输入") != -1 ? ""
			: $("#search_binglihao_xingming").val();
	var blh = $("#search_blh").length == 1 ? $("#search_blh").val() : "";// 病例号
	var hzxm = $("#search_hzxm").length == 1 ? $("#search_hzxm").val() : "";// 患者姓名
	var xingbie = $("#search_xingbie").length != 0 ? $(
			"input[name='search_xingbie']:checked").val() : 2;// 患者性别
	var sfzh = $("#search_sfzh").length == 1 ? $("#search_sfzh").val() : "";// 身份证号
	var shouji = $("#search_shouji").length == 1 ? $("#search_shouji").val()
			: "";// 手机
	var zhenbie = $("#search_zhenbie").length != 0 ? $(
			"input[name='search_zhenbie']:checked").val() : "";// 诊别
	var jcxmid = $("#search_jcxmIds").length == 1 ? $(
			"#search_jcxmIds option:selected").val() : "";// 检查项目
	var kdys = $("#search_kdys").length == 1 ? $("#search_kdys option:selected")
			.val()
			: "";// 开单医生
	var startkdsj = $("#search_startkdsj").length == 1 ? $("#search_startkdsj")
			.val() : "";// 开单时间 开始
	var endkdsj = $("#search_endkdsj").length == 1 ? $("#search_endkdsj").val()
			: "";// 开单时间 结束
	data_search = {
		search : search,
		blh : blh,// 病例号
		hzxm : hzxm,// 患者姓名
		xingbie : xingbie,// 患者性别
		shouji : shouji,// 手机
		sfzh : sfzh,// 身份证号
		zhenbie : zhenbie,// 诊别
		jcxmid : jcxmid,// 检查项目
		kdys : kdys,// 开单医生
		startkdsj : startkdsj,// 开单时间 开始
		endkdsj : endkdsj
	// 开单时间 结束
	};
	$.extend(listFactor.data, data_search);
	$("#pageList").createPageList(listFactor);
}

// 待补传检查单高级查询重置(整理)
function seniorSearchReset_Jcd_JcdDengJi() {
	$("#search_blh").val("");// 病例号
	$("#search_hzxm").val("");// 患者姓名
	$("input[name='search_xingbie']").attr("checked", false);// 患者性别
	$("#search_shouji").val("");// 手机
	$("#search_sfzh").val("");// 身份证号
	$("input[name='search_zhenbie']").attr("checked", false);// 诊别
	$("#search_jcxmIds").val("");// 检查项目
	$("#search_kdys").val("");// 开单医生
	$("#search_startkdsj").val("");// 开单时间 开始
	$("#search_endkdsj").val("");// 开单时间 结束
}

/** ***********************************************检查单高级查询开始************************************************* */

/** ***********************************************患者高级查询开始************************************************* */
function openDialog_AdvancedSearch_HuanZheXinXi_JcdDengJi() {
	var seniorSearchTemplate = getTable_HuanZheXinXi_JcdDengJi();// 创建高级查询表格
	$.oimsBox({
		parentDiv : "advquery",// 将生成内容添加的id
		divContent : seniorSearchTemplate
	});
	calendarFun("search_zcrqStart");// 开始注册日期
	calendarFun("search_zcrqEnd");// 结束注册日期
}

// 查询表格(整理)
function getTable_HuanZheXinXi_JcdDengJi() {
	var rt = "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
			+ " <tr>"
			+ "<td width='7%' nowrap='nowrap' align='right'>"
			+ "患者姓名"
			+ "：</td>"
			+ "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_xingming' name='search_xingming'>"
			+ "</td>"
			+ "<td width='7%' nowrap='nowrap' align='right'>"
			+ "患者性别"
			+ "：</td>"
			+ "<td width='18%'><input type='checkbox' name='search_xingbie' class = 'c_r_class' id='search_xingbie' value='1'/>"
			+ "男"
			+ "<input type='checkbox' name='search_xingbie' class = 'c_r_class' id='search_xingbie' value='0'/>"
			+ "女"
			+ "</td>"
			+ "<td width='7%' nowrap='nowrap' align='right'> "
			+ "所属地区"
			+ "：</td>"
			+ "<td width='15%' id='search_ssdq_c'></td>"
			+ "<td  nowrap='' align='right'>"
			+ "注册时间"
			+ "：</td>"
			+ "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_zcrqStart' name='search_zcrqStart'>"
			+ "</td>"
			+ "<td  nowrap='nowrap' align='right'>"
			+ "至"
			+ "</td>"
			+ "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_zcrqEnd' name='search_zcrqEnd'>"
			+ "</td>"
			+ "</tr>"
			+ " <tr>"
			+ "<td width='7%' nowrap='nowrap' align='right'>"
			+ "手机号码"
			+ "：</td>"
			+ "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_shouji' name='search_shouji'>"
			+ "</td>"
			+ "<td width='7%' nowrap='nowrap' align='right'>"
			+ "是否医保"
			+ "：</td>"
			+ "<td width='18%'><input type='checkbox' name='search_yibao' id='search_idSYiBao' class = 'c_r_class' value='1'/>"
			+ "是"
			+ "<input type='checkbox' name='search_yibao' id='search_idNYiBao' class = 'c_r_class' value='0'/>"
			+ "否"
			+ "</td>"
			+ "<td width='7%' nowrap='nowrap' align='right'> "
			+ "联系电话"
			+ "：</td>"
			+ "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_dianhua' name='search_dianhua'></td>"
			+ "<td  nowrap='' align='right'>"
			+ "患者年龄"
			+ "：</td>"
			+ "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_shengriStart' name='search_shengriStart'>"
			+ "</td>"
			+ "<td  nowrap='nowrap' align='right'>"
			+ "至"
			+ "</td>"
			+ "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_shengriEnd' name='search_shengriEnd'>"
			+ "</td>"
			+ "</tr>"
			+ " <tr>"
			+ "<td width='7%' nowrap='nowrap' align='right'>"
			+ "单位电话"
			+ "：</td>"
			+ "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_dwdh' name='search_dwdh'>"
			+ "</td>"
			+ "<td width='7%' nowrap='nowrap' align='right'>"
			+ "家属"
			+ "：</td>"
			+ "<td width='18%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_hzlxr' name='search_hzlxr'></td>"
			+ "<td width='7%' nowrap='nowrap' align='right'> "
			+ "紧急电话"
			+ "：</td>"
			+ "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_hzlxrdh' name='search_hzlxrdh'></td>"
			+ "<td  nowrap='' align='right'>"
			+ "身份证号"
			+ "：</td>"
			+ "<td colspan=3><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_sfzh' name='search_sfzh'>"
			+ "</td>"
			+ "</tr>"
			+ " <tr>"
			+ "<td width='7%' nowrap='nowrap' align='right'>"
			+ "患者来源"
			+ "：</td>"
			+ "<td align='left' colspan=4 id='search_laiyuans'></td>"
			+ "<td  nowrap='nowrap' align='right'>"
			+ "家庭地址"
			+ "：</td>"
			+ "<td colspan=4><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_jtdz' name='search_jtdz'>"
			+ "</td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td nowrap='nowrap' aling='right'>"
			+ "病种分类"
			+ "：</td>"
			+ "<td width='15%'><select id='search_bingZhongId'><option value=''></option></select></td>"
			+ "<td  nowrap='' align='right'>"
			+ "就诊记录"
			+ "：</td>"
			+ "<td colspan=7><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" name='search_bingLiKey' id='search_bingLiKey'/>"
			+ "</tr>"
			+ "</table>"
			+ " <div class='avdopenbutton' >"
			+ " <a href='javascript:seniorSearchSubmit_HuanZheXinXi_JcdDengJi();'><span class='advsumit'></span>"
			+ "提交"
			+ "</a>"
			+ " <a href='javascript:seniorSearchReset_HuanZheXinXi_JcdDengJi();'><span class='advreset'></span>"
			+ "重置" + "</a>" + "<a id = 'closeId'><span class='close' ></span>"
			+ "关闭" + "</a>" + " </div> ";
	var table = $(rt);
	// 患者来源赋值
	var list = getJSONData("/publish/category/findCategorysByFatherId.htm", {
		fatherid : oimsCategory.HUANZHE_RESOURCES,
		tag : Math.random()
	}, "post");
	$.each(list.obj, function(i, v) {
		var ipt = "<input type='checkbox' value='" + v.categoryid
				+ "' name='search_laiyuan' class = 'c_r_class' >" + "&nbsp;"
				+ v.category + "&nbsp;&nbsp;";
		$("#search_laiyuans", table).append(ipt);
	});
	// 患者来源赋值

	// 病种分类赋值
	list = getJSONData("/publish/category/findCategorysByFatherId.htm", {
		fatherid : oimsCategory.BINGZHONG,
		tag : Math.random()
	}, "post");

	$.each(list.obj, function(i, v) {
		var ipt = $("<option>").val(v.categoryid).text(v.category);
		$("#bingZhongId", table).append(ipt);
	});
	// 病种分类赋值

	// 地区赋值begin
	var dq = $.auto({
		id : "search_diqu",
		name : 'search_diqu',
		url : "diqu/findAllDiqu.htm",
		chg : {
			id : "id",
			text : "name",
			index1 : "index1",
			index2 : "index2"
		}
	});
	// 地区赋值begin
	$("#search_ssdq_c", table).append(dq);
	return table;
};

// 患者信息高级查询操作(整理)
function seniorSearchSubmit_HuanZheXinXi_JcdDengJi() {
	var data_search = {};
	var search = $("#search_binglihao_xingming").val().indexOf("请输入") != -1 ? ""
			: $("#search_binglihao_xingming").val();
	var xingming = $("#search_xingming").length == 1 ? $("#search_xingming")
			.val() : "";// 患者姓名
	// 性别复选框
	var xingbie = "";
	if ($("#search_xingbie").length != 0) {
		$("input[name='search_xingbie']:checked").each(function() {
			xingbie += $(this).val() + ",";
		});
		if (xingbie != "")// 截取去掉后面的“,”
			xingbie = xingbie.substring(0, xingbie.lastIndexOf(","));
	}
	// 性别复选框
	var diqu = $("#search_diqu").length == 1 ? $("#search_diqu").val() : "";// 所属地区
	var zcrqStart = $("#search_zcrqStart").length == 1 ? $("#search_zcrqStart")
			.val() : "";// 注册时间开始
	var zcrqEnd = $("#search_zcrqEnd").length == 1 ? $("#search_zcrqEnd").val()
			: "";// 注册时间结束
	var shouji = $("#search_shouji").length == 1 ? $("#search_shouji").val()
			: "";// 手机号码
	// 是否医保复选框
	var yibao = "";
	if ($("#search_yibao").length != 0) {
		$("input[name='search_yibao']:checked").each(function() {
			yibao += $(this).val() + ",";
		});
		if (yibao != "")// 截取去掉后面的“,”
			yibao = yibao.substring(0, yibao.lastIndexOf(","));
	}
	// 是否医保复选框
	var dianhua = $("#search_dianhua").length == 1 ? $("#search_dianhua").val()
			: "";// 联系电话
	var shengriStart = $("#search_shengriStart").length == 1 ? $(
			"#search_shengriStart").val() : "";// 患者年龄开始
	var shengriEnd = $("#search_shengriEnd").length == 1 ? $(
			"#search_shengriEnd").val() : "";// 患者年龄结束
	var dwdh = $("#search_dwdh").length == 1 ? $("#search_dwdh").val() : "";// 单位电话
	var hzlxr = $("#search_hzlxr").length == 1 ? $("#search_hzlxr").val() : "";// 患者联系人家属
	var hzlxrdh = $("#search_hzlxrdh").length == 1 ? $("#search_hzlxrdh").val()
			: "";// 患者联系人电话紧急电话
	var sfzh = $("#search_sfzh").length == 1 ? $("#search_sfzh").val() : "";// 身份证号码
	// 患者来源复选框
	var laiyuan = "";
	if ($("#search_laiyuan").length != 0) {
		$("input[name='search_laiyuan']:checked").each(function() {
			laiyuan += $(this).val() + ",";
		});
		if (laiyuan != "")// 截取去掉后面的“,”
			laiyuan = laiyuan.substring(0, laiyuan.lastIndexOf(","));
	}
	// 患者来源复选框
	var jtdz = $("#search_jtdz").length == 1 ? $("#search_jtdz").val() : "";// 家庭地址
	var bingZhongId = $("#search_bingZhongId").length == 1 ? $(
			"#search_bingZhongId option:selected").val() : "";// 病种分类
	var bingLiKey = $("#search_bingLiKey").length == 1 ? $("#search_bingLiKey")
			.val() : "";// 就诊记录
	data_search = {
		search : search,
		xingming : xingming,// 患者姓名
		xingbie : xingbie,// 性别
		diqu : diqu,// 所属地区
		zcrqStart : zcrqStart,// 注册时间开始
		zcrqEnd : zcrqEnd,// 注册时间结束
		shouji : shouji,// 手机号码
		yibao : yibao,// 医保
		dianhua : dianhua,// 联系电话
		shengriStart : shengriStart,// 患者年龄开始
		shengriEnd : shengriEnd,// 患者年龄结束
		dwdh : dwdh,// 单位电话
		hzlxr : hzlxr,// 患者联系人家属
		hzlxrdh : hzlxrdh,// 患者联系人电话紧急电话
		sfzh : sfzh,// 身份证号码
		laiyuan : laiyuan,// 患者来源
		jtdz : jtdz,// 家庭地址
		bingZhongId : bingZhongId,// 病种分类
		bingLiKey : bingLiKey
	};
	$.extend(listFactor.data, data_search);
	$("#pageList").createPageList(listFactor);
};

// 高级查询的重置方法(整理)
function seniorSearchReset_HuanZheXinXi_JcdDengJi() {
	$("#search_xingming").val("");// 患者姓名
	$("[name = search_xingbie]:checkbox").attr("checked", false);// 性别
	$("#search_diqu").val("");// 所属地区
	$("#search_zcrqStart").val("");// 注册时间开始
	$("#search_zcrqEnd").val("");// 注册时间结束
	$("#search_shouji").val("");// 手机号码
	$("[name = search_yibao]:checkbox").attr("checked", false);// 医保
	$("#search_dianhua").val("");// 联系电话
	$("#search_shengriStart").val("");// 患者年龄开始
	$("#search_shengriEnd").val("");// 患者年龄结束
	$("#search_dwdh").val("");// 单位电话
	$("#search_hzlxr").val("");// 患者联系人家属
	$("#search_hzlxrdh").val("");// 患者联系人电话紧急电话
	$("#search_sfzh").val("");// 身份证号码
	$("[name = search_laiyuan]:checkbox").attr("checked", false);// 患者来源
	$("#search_jtdz").val("");// 家庭地址
	$("#search_bingZhongId").val("");// 病种分类
	$("#search_bingLiKey").val("");// 就诊记录
}
/** ***********************************************患者高级查询开始************************************************* */

