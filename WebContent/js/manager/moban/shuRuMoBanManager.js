var data_shurumoban_jibie;// 级别下拉框data
var data_shurumoban_bmId;// 所属科室下拉框data
var data_shurumoban_fenlei;// 分类名称下拉框data
var global_objName_shurumoban;// 主要记录当前div的id
var global_categoryId_shurumoban;// 主要记录当前输入模板分类
var value_finally_jckj = 10006;// 检查可见的默认值
var value_finally_jcts = 10007;// 检查提示的默认值
var btns_shuruMoban;
/*
 * 梁建业 页面准备好需要执行的方法
 */
function shuruMobanReady(btns) {
	btns_shuruMoban = btns;
	pageTitle = "输入模板";// 输入模板
	init();
	var div_tablabel = $("<div/>").attr("id", "div_tablabel").attr("class",
			"tablabel").appendTo("#right");

	var div1_5 = $("<div/>").attr("id", "div1_5").attr("class", "tab_hide")
			.attr(
					"onclick",
					"PageMenuActive_ShuRuMoBan('div1_5',"
							+ oimsCategory.SHURUMOBAN_CATEGORY_JIANCHAKEJIAN
							+ ")").appendTo(div_tablabel);
	var div1_5_html = "<span>" + "检查可见" + "</span>";// 检查可见
	$(div1_5_html).appendTo(div1_5);

	var div1_6 = $("<div/>").attr("id", "div1_6").attr("class", "tab_hide")
			.attr(
					"onclick",
					"PageMenuActive_ShuRuMoBan('div1_6',"
							+ oimsCategory.SHURUMOBAN_CATEGORY_JIANCHATISHI
							+ ")").appendTo(div_tablabel);
	var div1_6_html = "<span>" + "检查提示" + "</span>";// 检查提示
	$(div1_6_html).appendTo(div1_6);

	$("<div/>").attr("id", "div_main").appendTo("#right");// 主Div对象

	getPageMenu_ShuRuMoBan('div1_5');
	PageMenuActive_ShuRuMoBan('div1_5',
			oimsCategory.SHURUMOBAN_CATEGORY_JIANCHAKEJIAN);
	initialData_shuRuMoBan();// 初始化下拉框的data
}
/*
 * 梁建业 动态获取显示的条数
 */
function getPageSize_ShuruMoBan() {
	var height_header = $(".header").outerHeight();
	var height_footer = $(".footer").outerHeight();
	var winHeight = $(window).height();
	var height_right = winHeight - height_header - height_footer;
	var height_titleT = $(".titleT").outerHeight();
	var height_advquery = $(".advquery").outerHeight();
	var height_tablabel = $(".tablabel").outerHeight();
	var height_pageList = height_right - height_titleT - height_advquery
			- height_tablabel - 24;
	return Math.floor(height_pageList / 25);
}
// 初始化下拉框的data(整理)
function initialData_shuRuMoBan() {
	var url_findAllBuMen = "/publish/bumen/findAllBuMen.htm";// 查询所有部门
	var url_findCategorysByFatherId = "/publish/category/findCategorysByFatherId.htm";// 根据fatherid查询该fatherid下所有的码表信息
	data_shurumoban_jibie = getJSONData(url_findCategorysByFatherId, {
		fatherid : oimsCategory.SHRRUMOBAN_JIBIE,
		tag : Math.random()
	}, "post").obj;
	data_shurumoban_bmId = getJSONData(url_findAllBuMen, {
		tag : Math.random()
	}, "post").obj;
	data_shurumoban_fenlei = getJSONData(url_findCategorysByFatherId, {
		fatherid : oimsCategory.SHURUMOBAN_CATEGORY_NAME,
		tag : Math.random()
	}, "post").obj;
}

// 输入模版列表(整理)
function showShuruMobanList(categoryId) {
	listFactor = {
		listObj : [ {
			title : "序号",// 序号
			key : "shurumobanid"
		}, {
			title : "内容",// 内容
			key : "shuru"
		}, {
			title : "索引",// 索引
			key : "suoyin"
		}, {
			title : "所属科室",// 所属科室
			key : "bmmc"
		}, {
			title : "操作人",// 操作人
			key : "xingming"
		}, {
			title : "操作时间",// 操作时间
			key : "addTime"
		}, {
			title : "类型",// 类型
			key : "categoryName"
		} ],
		manageMenu : null,
		url : contextPath + "/publish/shurumoban/findAllShuruMobansByPage.htm",
		checkbox : true,
		method : "post",
		single : true,
		data : {
			categoryId : categoryId,
			currentPage : 1,
			pageSize : getPageSize_ShuruMoBan(),// Page类的方法
			tag : Math.random()
		}
	};
	var div_list = $("<div/>").attr("id", "div_list").attr("class", "list")
			.appendTo("#div_main");
	$(div_list).createPageList(listFactor);
}

// 输入模版信息新增(整理)
function saveShuruMoban() {
	var table_shurumoban = "";// 输入模板table
	table_shurumoban += "<table width='100%' border='0' cellspacing='0' cellpadding='0' class=' templatetable'>";
	table_shurumoban += "<tr>"
			+ "<td width='8%' align='right' nowrap>"
			+ "分类名称"// 分类名称
			+ "：</td>"
			+ "<td width='16%'>"
			+ "<select name='categoryId' id='categoryId'  onblur=\"this.className='blur'\"></select>"
			+ "</td>"
			+ "<td width='1%'><span class='required'>*</span></td>"
			+ // 必填提示
			"<td width='9%' align='right' nowrap>"
			+ "索引"// 索引
			+ "：</td>"
			+ "<td width='20%'>"
			+ "<input type='text' name='suoyin' size='20' id='suoyin' onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur' />"
			+ "</td>"
			+ "<td width='1%'><span class='required'>*</span></td>"
			+ // 必填提示
			"<td width='9%' align='right' nowrap>"
			+ "级别"// 级别
			+ "：</td>"
			+ "<td width='12%'>"
			+ "<select name='jibie' id='jibie' onblur=\"this.className='blur'\"></select>"
			+ "</td>" + "<td width='1%'><span class='required'>*</span></td>" + // 必填提示
			"</tr>";
	table_shurumoban += "<tr>"
			+ "<td align='right' nowrap>"
			+ "所属科室"// 所属科室
			+ "：</td>"
			+ "<td>"
			+ "<select name='bmId' id='bmId' onblur=\"this.className='blur'\"></select>"
			+ "</td>"
			+ "<td width='1%'><span class='required'>*</span></td>"
			+ // 必填提示
			"<td align='right' nowrap>"
			+ "检查项目"// 检查项目
			+ "：</td>"
			+ "<td >"
			+ "<select name='select_jcxmId' id='select_jcxmId' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\"><option value='0'></option></select>"
			+ "</td>" + "<td width='1%'><span class='required'>*</span></td>" + // 必填提示
			"</tr>";
	table_shurumoban += "<tr>"
			+ "<td align='right' valign='top' nowrap>"
			+ "内容"// 内容
			+ "：</td>"
			+ "<td colspan='7'>"
			+ "<textarea name='shuru' id='shuru' onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur' id='textarea' cols='45' rows='20'></textarea>"
			+ "</td>" + "<td width='1%'><span class='required'>*</span></td>" + // 必填提示
			"</tr>";
	table_shurumoban += "</table>";
	var hidden_jcxmId = "<input type='hidden' name='jcxmId' id='jcxmId'/>";// 检查项目隐藏域
	var form_saveShuruMoban = oimsFormWindow({
		id : "from_saveShuruMoban",
		dialogTitle : "新增",
		icon : "add",
		url : contextPath + "/publish/shurumoban/saveShuruMoban.htm",
		height : 400,
		width : 800,
		method : "post",
		resetForm : reset_from_saveShuruMoban,
		btnOkSuccess : function(data, responseText, statusText) {
			if (data.state)
				$.oimsSucc("输入模板信息新增成功", function() {
					searchShuruMoban();
					removeDiv_openWin();
				});
			else
				$.oimsError("输入模板信息新增失败", function() {
					searchShuruMoban();
					removeDiv_openWin();
				});
		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
			$.oimsError("输入模板信息新增失败", function() {
				searchShuruMoban();
				removeDiv_openWin();
			});
		},
		btnOkBefor : validate_shuRuMoBan_form_saveShuruMoban
	});
	form_saveShuruMoban.append(table_shurumoban);// 追加表格
	form_saveShuruMoban.append(hidden_jcxmId);// 检查项目隐藏域
	// 分类下拉框
	$.each(data_shurumoban_fenlei, function(i, fenlei) {
		$(
				"<option value=\"" + fenlei.categoryid + "\">"
						+ fenlei.category + "</option>")
				.appendTo("#categoryId");
	});
	// 级别下拉框数据
	$.each(data_shurumoban_jibie, function(i, jibie) {
		$(
				"<option value=\"" + jibie.categoryid + "\">" + jibie.category
						+ "</option>").appendTo("#jibie");
	});
	// 所属科室下拉框
	$.each(data_shurumoban_bmId, function(i, bumen) {
		$("<option value=\"" + bumen.id + "\">" + bumen.bmmc + "</option>")
				.appendTo("#bmId");
	});
	selectItemByValue("categoryId", global_categoryId_shurumoban);
	onChange_bmId();// 所属科室 onchange();
	$("#bmId").change(onChange_bmId);
	onChange_shuRuMoBan_categoryId();// 分类名称categoryId onChange方法
	$("#categoryId").change(onChange_shuRuMoBan_categoryId);// categoryId
	// onchage事件绑定方法
	$("#select_jcxmId").change(onChange_shuRuMoBan_select_JcxmId);// select_JcxmId
	// onchage事件绑定方法
}

// 输入模板新增验证(整理)
function validate_shuRuMoBan_form_saveShuruMoban() {
	$("#suoyin").val(jQuery.trim($("#suoyin").val()));// 索引
	$("#shuru").val(jQuery.trim($("#shuru").val()));// 内容
	var value_shuRuMoBan_suoyin = $("#suoyin").val();
	var value_shuRuMoBan_shuru = $("#shuru").val();
	var value_shuRuMoBan_jcxmId = $("#jcxmId").val();
	var regulation_null = "^[^ ]+$";// 非空验证
	var validate_null = new RegExp(regulation_null);
	if (!validate_null.test(value_shuRuMoBan_suoyin))// 索引
	{
		$.oimsAlert("模板索引为空", function() {
			$("#suoyin")[0].focus();
		});
		return false;
	}
	var value_shuRuMoBan_categoryId = $("#categoryId")[0][$("#categoryId")[0].selectedIndex].value;
	if (value_shuRuMoBan_categoryId == value_finally_jckj
			|| value_shuRuMoBan_categoryId == value_finally_jcts) {
		if (0 == value_shuRuMoBan_jcxmId) {
			$.oimsAlert("检查项目为空");
			return false;
		}
	}
	if (!validate_null.test(value_shuRuMoBan_shuru))// 内容
	{
		$.oimsAlert("模板内容为空", function() {
			$("#shuru")[0].focus();
		});
		return false;
	}
	return true;
}
// 输入模版修改(整理)
function updateShuruMoban() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要修改的输入模板");
		return;
	}
	var table_shurumoban = "";// 输入模板table
	table_shurumoban += "<table width='100%' border='0' cellspacing='0' cellpadding='0' class=' templatetable'>";
	table_shurumoban += "<tr>"
			+ "<td width='8%' align='right' nowrap>"
			+ "分类名称"// 分类名称
			+ "：</td>"
			+ "<td width='16%'>"
			+ "<select name='categoryId' id='categoryId'  onblur=\"this.className='blur'\"></select>"
			+ "</td>"
			+ "<td width='1%'><span class='required'>*</span></td>"
			+ // 必填提示
			"<td width='9%' align='right' nowrap>"
			+ "索引"// 索引
			+ "：</td>"
			+ "<td width='20%'>"
			+ "<input type='text' name='suoyin' size='20' id='suoyin' onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur' />"
			+ "</td>"
			+ "<td width='1%'><span class='required'>*</span></td>"
			+ // 必填提示
			"<td width='9%' align='right' nowrap>"
			+ "级别"// 级别
			+ "：</td>"
			+ "<td width='12%'>"
			+ "<select name='jibie' id='jibie' onblur=\"this.className='blur'\"></select>"
			+ "</td>" + "<td width='1%'><span class='required'>*</span></td>" + // 必填提示
			"</tr>";
	table_shurumoban += "<tr>"
			+ "<td align='right' nowrap>"
			+ "所属科室"// 所属科室
			+ "：</td>"
			+ "<td>"
			+ "<select name='bmId' id='bmId' onblur=\"this.className='blur'\"></select>"
			+ "</td>"
			+ "<td width='1%'><span class='required'>*</span></td>"
			+ // 必填提示
			"<td align='right' nowrap>"
			+ "检查项目"// 检查项目
			+ "：</td>"
			+ "<td >"
			+ "<select name='select_jcxmId' id='select_jcxmId' onblur=\"this.className='blur'\"><option value='0'></option></select>"
			+ "</td>" + "<td width='1%'><span class='required'>*</span></td>" + // 必填提示
			"</tr>";
	table_shurumoban += "<tr>"
			+ "<td align='right' valign='top' nowrap>"
			+ "内容"// 内容
			+ "：</td>"
			+ "<td colspan='7'>"
			+ "<textarea name='shuru' id='shuru' onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur' id='textarea' cols='45' rows='20'></textarea>"
			+ "</td>" + "<td width='1%'><span class='required'>*</span></td>" + // 必填提示
			"</tr>";
	table_shurumoban += "</table>";
	var hidden_id = "<input type='hidden' name='id' id='id'/>";// 隐藏域
	var hidden_jcxmId = "<input type='hidden' name='jcxmId' id='jcxmId'/>";// 检查项目隐藏域
	var form_updateShuruMoban = oimsFormWindow({
		id : "form_updateShuruMoban",
		dialogTitle : "修改",
		icon : "edit",
		url : contextPath + "/publish/shurumoban/updateShuruMoban.htm",
		height : 400,
		width : 800,
		method : "post",
		resetForm : reset_from_updateShuruMoban,
		btnOkSuccess : function(data, responseText, statusText) {
			if (data.state)
				$.oimsSucc("输入模板信息修改成功", function() {
					searchShuruMoban();
					removeDiv_openWin();
				});
			else
				$.oimsError("输入模板信息修改失败", function() {
					searchShuruMoban();
					removeDiv_openWin();
				});
		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
			$.oimsError("输入模板信息修改失败", function() {
				searchShuruMoban();
				removeDiv_openWin();
			});
		},
		btnOkBefor : validate_shuRuMoBan_form_updateShuruMoban
	});
	form_updateShuruMoban.append(table_shurumoban);// 输入模板表格追加
	form_updateShuruMoban.append(hidden_id);// 隐藏域追加
	form_updateShuruMoban.append(hidden_jcxmId);// 检查项目隐藏域
	// 分类下拉框
	$.each(data_shurumoban_fenlei, function(i, fenlei) {
		$(
				"<option value=\"" + fenlei.categoryid + "\">"
						+ fenlei.category + "</option>")
				.appendTo("#categoryId");
	});
	// 级别下拉框数据
	$.each(data_shurumoban_jibie, function(i, jibie) {
		$(
				"<option value=\"" + jibie.categoryid + "\">" + jibie.category
						+ "</option>").appendTo("#jibie");
	});
	// 所属科室下拉框
	$.each(data_shurumoban_bmId, function(i, bumen) {
		$("<option value=\"" + bumen.id + "\">" + bumen.bmmc + "</option>")
				.appendTo("#bmId");
	});
	// 赋值
	$("#id").val(dataObjects[0].shurumobanid);
	selectItemByValue("categoryId", dataObjects[0].categoryId);
	$("#suoyin").val(dataObjects[0].suoyin);
	selectItemByValue("jibie", dataObjects[0].jibie);
	selectItemByValue("bmId", dataObjects[0].bmId);
	onChange_bmId();// 所属科室 onchange();
	$("#bmId").change(onChange_bmId);
	selectItemByValue("select_jcxmId", dataObjects[0].jcxmId);
	$("#shuru").val(dataObjects[0].shuru);
	$("#jcxmId").val(dataObjects[0].jcxmId);
	onChange_shuRuMoBan_categoryId();// 分类名称categoryId onChange方法
	$("#categoryId").change(onChange_shuRuMoBan_categoryId);// categoryId
	// onchage事件绑定方法
	$("#select_jcxmId").change(onChange_shuRuMoBan_select_JcxmId);// select_JcxmId
	// onchage事件绑定方法
}

// 输入模板修改验证(整理)
function validate_shuRuMoBan_form_updateShuruMoban() {
	$("#suoyin").val(jQuery.trim($("#suoyin").val()));// 索引
	$("#shuru").val(jQuery.trim($("#shuru").val()));// 内容
	var value_shuRuMoBan_suoyin = $("#suoyin").val();
	var value_shuRuMoBan_shuru = $("#shuru").val();
	var value_shuRuMoBan_jcxmId = $("#jcxmId").val();
	var regulation_null = "^[^ ]+$";// 非空验证
	var validate_null = new RegExp(regulation_null);
	if (!validate_null.test(value_shuRuMoBan_suoyin))// 索引
	{
		$.oimsAlert("输入模板索引为空", function() {
			$("#suoyin").focus();
		});
		return false;
	}
	var value_shuRuMoBan_categoryId = $("#categoryId")[0][$("#categoryId")[0].selectedIndex].value;
	if (value_shuRuMoBan_categoryId == value_finally_jckj
			|| value_shuRuMoBan_categoryId == value_finally_jcts) {
		if (0 == value_shuRuMoBan_jcxmId) {
			$.oimsAlert("检查项目为空");
			return false;
		}
	}
	if (!validate_null.test(value_shuRuMoBan_shuru))// 内容
	{
		$.oimsAlert("输入模板内容为空", function() {
			$("#shuru").focus();
		});
		return false;
	}
	return true;
}

// 输入模板删除(整理)
function deleteShuruMobanById() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要删除的输入模板");
		return;
	}
	$.oimsConfirm({
		strTitle : "是否确认删除该输入模板",
		remove_length : true
	}, doDeleteShuruMobanById);
}

// 执行输入模板删除操作(整理)
function doDeleteShuruMobanById() {
	var dataObjects = getCheckBoxValue();
	var url_deleteShuruMobanById = "/publish/shurumoban/deleteShuruMobanById.htm";
	var data = getJSONData(url_deleteShuruMobanById, {
		id : dataObjects[0].shurumobanid,
		tag : Math.random()
	}, "post");
	if (data.state)
		$.oimsSucc("输入模板信息删除成功", function() {
			searchShuruMoban();
			removeDiv_openWin();
		});
	else
		$.oimsError("输入模板信息删除失败", function() {
			searchShuruMoban();
			removeDiv_openWin();
		});
}

// div层的显示隐藏切换(整理)
function PageMenuActive_ShuRuMoBan(objName, categoryId) {
	document.getElementById(activePageMenu).className = 'tab_hide';
	document.getElementById(objName).className = 'tab_show';
	$("#div_main").html("");
	var div_advquery = $("<div/>").attr("id", "div_advquery").attr("class",
			"advquery").appendTo("#div_main");
	var table_advquery = "";
	table_advquery += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	table_advquery += "<tr>"
			+ "<td width='23%' class='leftalign' ><input name='search_suoyin' type='text' class='blurview' id='search_suoyin' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"
			+ "请输入索引"// 请输入索引
			+ "' size='28' /></td>"
			+ "<td width='9%'><a href='javascript:searchShuruMoban();' class='search'>"
			+ "查询"// 查询
			+ "</a></td>"
			+ "<td width='9%'></td>"
			+ "<td width='59%'>"
			+ "<div class='btn'>"
			+ "<a onclick='return false;' href='javascript:saveShuruMoban();'><span class='adda'></span>"
			+ "新增"// 新增
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:updateShuruMoban();'><span class='edita'></span>"
			+ "修改"// 修改
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:deleteShuruMobanById();'><span class='dela'></span>"
			+ "删除"// 删除
			+ "</a>" + "</div>" + "</td>" + "</tr>";
	table_advquery += "</table>";
	$(table_advquery).appendTo(div_advquery);
	btnProwerConfig(btns_shuruMoban);// 按钮加上权限
	showShuruMobanList(categoryId);
	activePageMenu = objName;
	global_objName_shurumoban = objName;
	global_categoryId_shurumoban = categoryId;
	$("#search_suoyin").click(function() {
		clearInitQuery(this);
	});// 点击输入框清空字体
	$("#search_suoyin").blur(function() {
		if (this.value == "") {
			$("#search_suoyin").val("请输入索引");
			$("#search_suoyin").addClass("blurview");
		}
	});
	$("#search_suoyin").bind("keyup", function(e) {
		if (e.which == 13) {
			searchShuruMoban();
		}
	});
}
// 全局赋值（整理）
function getPageMenu_ShuRuMoBan(menuName) {
	activePageMenu = menuName;
}

// 分类名称categoryId onChange方法(整理)
function onChange_shuRuMoBan_categoryId() {
	var value_shuRuMoBan_categoryId = $("#categoryId")[0][$("#categoryId")[0].selectedIndex].value;
	if (value_shuRuMoBan_categoryId == value_finally_jckj
			|| value_shuRuMoBan_categoryId == value_finally_jcts) {
		$("#select_jcxmId")[0].disabled = false;
	} else {
		selectItemByValue("select_jcxmId", 0);
		$("#jcxmId").val(0);
		$("#select_jcxmId")[0].disabled = true;// 只读状态
	}

}
function onChange_shuRuMoBan_select_JcxmId() {
	var value_shuRuMoBan_select_jcxmId = $("#select_jcxmId option:selected")
			.val();// 所属科室
	if ("undefined" == value_shuRuMoBan_select_jcxmId
			|| "" == value_shuRuMoBan_select_jcxmId)
		$("#jcxmId").val("");
	else
		$("#jcxmId").val(value_shuRuMoBan_select_jcxmId);
}
/*
 * 梁建业 查询条件（searchShuruMoban）
 */
function searchShuruMoban() {
	var data_search;
	if ($("#search_suoyin").val().indexOf("请输入") != -1)
		data_search = {
			suoyin : ''
		};
	else
		data_search = {
			suoyin : $("#search_suoyin").val()
		};
	$.extend(listFactor.data, data_search);
	$("#div_list").createPageList(listFactor);
};

// 重置新增输入模板表单(整理)
function reset_from_saveShuruMoban() {
	selectItemByValue("categoryId", data_shurumoban_fenlei[0].categoryid);// 分类名称
	$("#suoyin").val('');// 索引
	selectItemByValue("jibie", data_shurumoban_jibie[0].categoryid);// 级 别
	selectItemByValue("bmId", data_shurumoban_bmId[0].id);// 所属科室
	onChange_bmId();
	onChange_shuRuMoBan_categoryId();// 检查项目
	$("#shuru").val('');// 内容
}

/*
 * 梁建业 重置修改输入模板表单
 */
function reset_from_updateShuruMoban(dataObjects) {
	var dataObjects = getCheckBoxValue();
	// 赋值
	$("#id").val(dataObjects[0].shurumobanid);
	selectItemByValue("categoryId", dataObjects[0].categoryId);
	$("#suoyin").val(dataObjects[0].suoyin);
	selectItemByValue("jibie", dataObjects[0].jibie);
	selectItemByValue("bmId", dataObjects[0].bmId);
	onChange_bmId();
	selectItemByValue("select_jcxmId", dataObjects[0].jcxmId);
	$("#shuru").val(dataObjects[0].shuru);
	$("#jcxmId").val(dataObjects[0].jcxmId);
	onChange_shuRuMoBan_categoryId();// 分类名称categoryId onChange方法
}

// change 部门ID(整理)
function onChange_bmId() {
	$("#select_jcxmId")[0].options.length = 0;// 清空检查项目下拉框
	var value_bmId = $("#bmId option:selected").val();// 所属科室
	var url_findJcxmsByBmId = "/publish/jcxm/findJcxmsByBmId.htm";// 根据部门ID，查询该部门下所有可以做的检查项目
	var data_obj_findJcxmsByBmId = getJSONData(url_findJcxmsByBmId, {
		bmId : value_bmId,
		tag : Math.random()
	}, "post").obj;
	$.each(data_obj_findJcxmsByBmId, function(i, jcxm) {
		$("<option value=\"" + jcxm.id + "\">" + jcxm.xmmc + "</option>")
				.appendTo("#select_jcxmId");
	});
	onChange_shuRuMoBan_select_JcxmId();
}
