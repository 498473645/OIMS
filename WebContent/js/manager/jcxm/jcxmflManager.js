var listFactor;// 全局变量
var data_jcxmfl_fenleimingcheng;// 分类名称
var table_jcxmfl;// 检查项目分类表格
var hidden_id_jcxmfl = "<input type='hidden' name='id' id='id' value=''/>";// 隐藏域
/*
 * 梁建业加载方法
 */

function loadJsAndCss_Xmfl() {
	loadWelcomePage();// 显示加载页面
	table_jcxmfl = "";
	table_jcxmfl += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	table_jcxmfl += "<tr>"
			+ "<td align='right'>"
			+ "分类名称"// 分类名称
			+ "：</td>"
			+ "<td width='30%'>"
			+ "<select name='fatherid' id='fatherid' onblur=\"this.className='blur'\"></select>"
			+ "</td>" + "<td width='1%'><span class='required'>*</span></td>" + // 必填提示
			"<td width='40%'>&nbsp;</td>" + "<td width='1%'>&nbsp;</td>"
			+ "<tr>";
	table_jcxmfl += "<tr>"
			+ "<td width='14%' align='right' nowrap='nowrap'>"
			+ "项目归类名称"// 项目归类名称
			+ "：</td>"
			+ "<td colspan='3' align='right'>"
			+ "<input type='text' name='category' id='category' onblur=\"this.className='blur';checkIsStrEmpty(this)\" onfocus=\"this.className='focus'\" class='blur'  />"
			+ "</td>" + "<td width='1%'><span class='required'>*</span></td>" + // 必填提示
			"<tr>";
	table_jcxmfl += "<tr>"
			+ "<td height='69' align='right' valign='top'>"
			+ "项目归类描述"// 项目归类描述
			+ "：</td>"
			+ " <td colspan='3' align='left'>"
			+ "<textarea name='intr' id='intr' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' id='textarea' cols='45' rows='4'></textarea>"
			+ "</td>" + "<tr>";
	table_jcxmfl += "</table>";
}

/*
 * 梁建业 检查项目分类管理
 */
function jcxmflReady(btns) {
	loadJsAndCss_Xmfl();
	pageTitle = "项目分类列表";// 项目分类列表
	init();
	var div_advquery = $("<div/>").attr("id", "div_advquery").attr("class",
			"advquery").appendTo("#right");
	var table_advquery = "";
	table_advquery += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	table_advquery += "<tr>"
			+ "<td width='23%' class='leftalign' >"
			+ "<input name='search_category' type='text' class='blurview' id='search_category' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"
			+ "请输入归类名称"// 请输入归类名称
			+ "' size='28' />"
			+ "</td>"
			+ "<td width='9%'><a href='javascript:searchJcxmfl();' class='search'>"
			+ "查询"// 查询
			+ "</a></td>"
			+ // 查询按钮
			"<td width='59%' >"
			+ "<div class='btn'>"
			+ "<a href='javascript:saveCategory();'><span class='adda'></span>"
			+ "新增"// 新增
			+ "</a>"
			+ "<a href='javascript:updateCategory();'><span class='edita'></span>"
			+ "修改"// 修改
			+ "</a>"
			+ "<a href='javascript:delCategoryById();'><span class='dela'></span>"
			+ "删除" // 删除
			+ "</a>" + "</div>" + "</td>" + "</tr>";
	table_advquery += "</table>";
	$(table_advquery).appendTo(div_advquery);
	btnProwerConfig(btns);// 按钮加上权限
	showJcxmflList();// 检查项目分类列表
	initialData_jcxmfl();// 初始化检查项目分类必须的数据
	$("#search_category").click(function() {
		clearInitQuery(this);
	});// 点击输入框清空字体
	$("#search_category").blur(function() {
		if (this.value == "") {
			$("#search_category").val("请输入归类名称");
			$("#search_category").addClass("blurview");
		}
	});
	$("#search_category").bind("keyup", function(e) {
		if (e.which == 13) {
			searchJcxmfl();
		}
	});
}

// 初始化检查项目分类必要的数据(整理)
function initialData_jcxmfl() {
	var url_findCategorysByFatherId = "/publish/category/findCategorysByFatherId.htm";// 根据fatherid查询该fatherid下所有的码表信息
	data_jcxmfl_fenleimingcheng = getJSONData(url_findCategorysByFatherId, {
		fatherid : oimsCategory.JCXMFL_CATEGORY_NAME,
		tag : Math.random()
	}, "post").obj;// 分类名称
}
// 项目分类列表（整理）
function showJcxmflList() {
	listFactor = {
		listObj : [ {
			title : "序号",// 序号
			key : "oimscategoryid"
		}, {
			title : "分类规则",// 分类规则
			key : "fatherName"
		}, {
			title : "项目归类名称",// 项目归类名称
			key : "category"
		}, {
			title : "项目归类描述",// 项目归类描述
			key : "intr"
		} ],
		url : contextPath
				+ "/publish/category/findCategoriesOfJcxmflByPageAndCategory.htm",
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),
			tag : Math.random()
		}
	};
	var div_list = $("<div/>").attr("id", "div_list").attr("class", "list")
			.appendTo("#right");// 创建一个div_list添加到div_right
	$(div_list).createPageList(listFactor);
}

// 新增检查项目分类信息(整理)
function saveCategory() {
	var form_saveCategory = oimsFormWindow({
		id : "form_saveCategory",
		dialogTitle : "新增",
		icon : "add",
		url : contextPath + "/publish/category/saveCategory.htm",
		height : 300,
		width : 600,
		method : "post",
		resetForm : reset_form_saveCategory,// 重置方法
		btnOkSuccess : function(data_saveCategory, responseText, statusText) {
			if (data_saveCategory.state)
				$.oimsSucc("项目分类信息新增成功", function() {
					searchJcxmfl();
					removeDiv_openWin();
				});
			else
				$.oimsError("项目分类信息新增失败", function() {
					searchJcxmfl();
					removeDiv_openWin();
				});
		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
			$.oimsError("项目分类信息新增失败", function() {
				searchJcxmfl();
				removeDiv_openWin();
			});
		},
		btnOkBefor : validate_form_saveCategory

	});

	form_saveCategory.append(table_jcxmfl);
	// 分类名称下拉框
	$.each(data_jcxmfl_fenleimingcheng, function(i, fengleimingcheng) {
		$(
				"<option value=\"" + fengleimingcheng.categoryid + "\">"
						+ fengleimingcheng.category + "</option>").appendTo(
				"#fatherid");
	});
}

// 检查项目归类新增相关验证的方法(整理)
function validate_form_saveCategory() {
	$("#category").val(jQuery.trim($("#category").val()));// 项目归类名称
	var value_category = $("#category").val();
	var regulation_null = "^[^ ]";// 非空验证
	var validate_null = new RegExp(regulation_null);
	if (!validate_null.test(value_category))// 项目归类名称为空
	{
		$.oimsAlert("项目归类名称为空", function() {
			$("#category")[0].focus();
		});
		return false;
	}
	return true;
}

// 重置-检查项目归类新增(整理)
function reset_form_saveCategory() {
	selectItemByValue("fatherid", data_jcxmfl_fenleimingcheng[0].categoryid);// 分类名称
	$("#category").val("");// 项目归类名称
	$("#intr").val("");// 项目归类描述
}

// 重置-检查项目归类修改(整理)
function reset_form_updateCategory() {
	var dataObjects = getCheckBoxValue();
	// 赋值
	selectItemByValue("fatherid", dataObjects[0].fatherid);// 分类名称
	$("#category").val(dataObjects[0].category);// 归类名称
	$("#intr").val(dataObjects[0].intr);// 归类描述
}
// 检查项目归类修改相关验证的方法(整理)
function validate_form_updateCategory() {
	$("#category").val(jQuery.trim($("#category").val()));// 项目归类名称
	var value_category = $("#category").val();
	var regulation_null = "^[^ ]";// 非空验证
	var validate_null = new RegExp(regulation_null);
	if (!validate_null.test(value_category))// 项目归类名称为空
	{
		$.oimsAlert("项目归类名称为空", function() {
			$("#category")[0].focus();
		});
		return false;
	}
	return true;
}
// 修改检查项目分类信息(整理)
function updateCategory() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要操作的项目分类信息");
		return;
	}
	if (dataObjects.length > 1) {
		$.oimsAlert("只能单条数据操作");
		return;
	}
	var form_updateCategory = oimsFormWindow({
		id : "form_updateCategory",
		dialogTitle : "修改",
		icon : "edit",
		url : contextPath + "/publish/category/updateCategory.htm",
		height : 300,
		width : 600,
		method : "post",
		resetForm : reset_form_updateCategory,
		btnOkSuccess : function(data_updateCategory, responseText, statusText) {
			if (data_updateCategory.state)
				$.oimsSucc("项目分类信息修改成功", function() {
					searchJcxmfl();
					removeDiv_openWin();
				});
			else
				$.oimsError("项目分类信息修改失败", function() {
					searchJcxmfl();
					removeDiv_openWin();
				});
		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
			$.oimsError("项目分类信息修改失败", function() {
				searchJcxmfl();
				removeDiv_openWin();
			});
		},
		btnOkBefor : validate_form_updateCategory

	});
	form_updateCategory.append(table_jcxmfl);// 表格的追加
	form_updateCategory.append(hidden_id_jcxmfl);// 隐藏域的追加
	// 分类名称下拉框
	$.each(data_jcxmfl_fenleimingcheng, function(i, fengleimingcheng) {
		$(
				"<option value=\"" + fengleimingcheng.categoryid + "\">"
						+ fengleimingcheng.category + "</option>").appendTo(
				"#fatherid");
	});
	// 赋值
	$("#id").val(dataObjects[0].oimscategoryid);// 分类ID
	selectItemByValue("fatherid", dataObjects[0].fatherid);// 分类名称
	$("#category").val(dataObjects[0].category);// 归类名称
	$("#intr").val(dataObjects[0].intr);// 归类描述
}

// 项目分类信息删除(整理)
function delCategoryById() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择一条需要删除的项目分类信息");
		return;
	}
	$.oimsConfirm({
		strTitle : "确认删除该项目分类信息",
		remove_length : true
	}, doDelCategoryById);
}

// 执行项目分类信息删除 操作(整理)
function doDelCategoryById() {
	var dataObjects = getCheckBoxValue();
	var url_findJcxmFenleisByJcxmFenlei = "/publish/jcxmfenlei/findJcxmFenleisByJcxmFenlei.htm";// 根据检查项目分类对象查询符合条件的检查项目分类信息
	var data_obj_findJcxmFenleisByJcxmFenlei = getJSONData(
			url_findJcxmFenleisByJcxmFenlei, {
				jbflId : dataObjects[0].oimscategoryid,
				tag : Math.random()
			}, "post").obj;
	if (data_obj_findJcxmFenleisByJcxmFenlei.length != 0) {
		$.oimsAlert("存在引用该项目分类的检查项目");
		return;
	}
	var url_delCategoryById = "/publish/category/delCategoryById.htm";
	var data_delCategoryById = getJSONData(url_delCategoryById, {
		id : dataObjects[0].oimscategoryid,
		tag : Math.random()
	}, "post");
	if (data_delCategoryById.state)
		$.oimsSucc("项目分类信息删除成功", function() {
			searchJcxmfl();
			removeDiv_openWin();
		});
	else
		$.oimsError("项目分类信息删除失败", function() {
			searchJcxmfl();
			removeDiv_openWin();
		});
}

// 查询条件（searchJcxmfl）(整理)
function searchJcxmfl() {
	var data_search;
	if ($("#search_category").val().indexOf("请输入") != -1)
		data_search = {
			category : ''
		};
	else
		data_search = {
			category : $("#search_category").val()
		};
	$.extend(listFactor.data, data_search);
	$("#div_list").createPageList(listFactor);
};
