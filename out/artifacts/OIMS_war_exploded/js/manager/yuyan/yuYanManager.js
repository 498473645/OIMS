var listFactor;// 全局变量
var data_yuyan_fenlei;// 语言分类
var data_yuyan_leibie;// 语言类别
var table_yuyan = "";// 语言表格
/*
 * 设备模块国际化
 */

var yuYan_Lanague = {
	YuyanId : 413,// 语言ID
	YuyanMc : 415,// 语言名称
	YuyanWenzi : 416,// 语言文字
	YuyanFenLei : 414,// 语言分类
	YuYanLeiBie : 417,// 语言类别
	YuyanItem : 339,// 系统语言列表
	Import : 80,// 导入
	QxzxtyypzExcel : 779,// 请选择系统语言配置Excel
	Yuyanxxdrcg : 780,// 语言信息导入成功
	Yuyanxxdrsb : 781,// 语言信息导入失败
	YuyanIdbnwk : 782,// 语言ID不能为空
	Yuyanmcbnwk : 783,// 语言名称不能为空
	Yuyanwzbnwk : 784,// 语言文字不能为空
	Yuyanflbnwk : 785,// 语言分类不能为空
	Yuyanlbbnwk : 786,// 语言类别不能为空
	Qxgyyidhzyyfl : 787,// 请修改语言ID或者语言分类
	yuYan_Lanague : 788,// 确认删除系统语言信息？
	Qsr : 735,// 请输入
	Qingshuruyuyanwenzi : 1057,// 请输入语言文字
	isNull : 0
// 最后删除
};

/*
 * 梁建业 添加引用css和js
 */
function loadJsAndCss_YuYan() {
	importJS("/js/jquery.customfile.js");
	loadWelcomePage();
	table_yuyan = "";
	table_yuyan += "<table width='95%' border='0' cellspacing='0' cellpadding='0' class=' templatetable'>";
	table_yuyan += "<tr>"
			+ "<td align='right' nowrap>"
			+ "语言ID"
			+ "：</td>"
			+ "<td><input type='text' name='id' id='id' size='20' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "<td width='1%'><span class='required'>*</span></td>"
			+ // 必填提示
			"<td align='right' nowrap>"
			+ "语言名称"
			+ "：</td>"
			+ "<td><input type='text' name='mc' id='mc' size='20' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "<td width='1%'><span class='required'>*</span></td>" + // 必填提示
			"</tr>";
	table_yuyan += "<tr>"
			+ "<td align='right' nowrap>"
			+ "语言文字"
			+ "：</td>"
			+ "<td><input type='text' name='wenzi' id='wenzi' size='20' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "<td width='1%'><span class='required'>*</span></td>"
			+ // 必填提示
			"<td align='right' nowrap>"
			+ "语言分类"
			+ "：</td>"
			+ "<td><select name='fenlei' id='fenlei' onblur=\"this.className='blur'\"></select></td>"
			+ "<td width='1%'><span class='required'>*</span></td>" + // 必填提示
			"</tr>";
	table_yuyan += "<tr>"
			+ "<td align='right' nowrap>"
			+ "语言类别"
			+ "：</td>"
			+ "<td><select name='leibie' id='leibie' onblur=\"this.className='blur'\"></select></td>"
			+ "<td width='1%'><span class='required'>*</span></td>" + // 必填提示
			"</tr>";
	table_yuyan += "</table>";
}
// 系统语言管理(整理)
function yuYanReady(btns) {
	loadJsAndCss_YuYan();
	pageTitle = "系统语言列表";
	init();
	var div_advquery = $("<div/>").attr("id", "div_advquery").attr("class",
			"advquery").appendTo("#right");
	var table_advquery = "";
	table_advquery += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	table_advquery += "<tr>"
			+ "<td width='23%' class='leftalign' >"
			+ "<input name='search_wenzi' type='text' class='blurview' id='search_wenzi' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"
			+ "请输入语言文字"
			+ "' size='28' />"
			+ "</td>"
			+ "<td width='9%'><a href='javascript:do_AdvancedSearch();' class='search'>"
			+ "查询"
			+ "</a></td>"
			+ // 查询按钮
			"<td width='9%'><a href='javascript:openDialog_AdvancedSearch_YuYan();' class='advsearch' id='advsearch'>"
			+ "高级查询"
			+ "</a></td>"
			+ // 高级查询
			"<td width='59%' >"
			+ "<div class='btn'>"
			+ "<a onclick='return false;' href='javascript:saveYuYan();'><span class='adda'></span>"
			+ "新增"
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:updateYuYan();'><span class='edita'></span>"
			+ "修改"
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:deleteYuYanByIdAndFenLei();'><span class='dela'></span>"
			+ "删除"
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:importYuYans();'><span class='importa'></span>"
			+ "导入" + "</a>" + "</div>" + "</td>" + "</tr>";
	table_advquery += "</table>";
	$(table_advquery).appendTo(div_advquery);
	btnProwerConfig(btns);// 按钮加上权限
	showYuYanList();// 系统语言列表
	initialData_yuyan();// 初始化语言必要的数据
	$("#search_wenzi").click(function() {
		clearInitQuery(this);
	});// 点击输入框清空字体
	$("#search_wenzi").blur(function() {
		if (this.value == "") {
			$("#search_wenzi").val("请输入语言文字");
			$("#search_wenzi").addClass("blurview");
		}
	});
	$("#search_wenzi").bind("keyup", function(e) {
		if (e.which == 13) {
			do_AdvancedSearch();
		}
	});
}

// 初始化语言必要的数据(整理)
function initialData_yuyan() {
	var url_findCategorysByFatherId = "/publish/category/findCategorysByFatherId.htm";// 根据fatherid查询该fatherid下所有的码表信息
	data_yuyan_fenlei = getJSONData(url_findCategorysByFatherId, {
		fatherid : oimsCategory.YUYAN_FENLEi,
		tag : Math.random()
	}, "post").obj;// 语言分类
	data_yuyan_leibie = getJSONData(url_findCategorysByFatherId, {
		fatherid : oimsCategory.YUYAN_LEIBIE,
		tag : Math.random()
	}, "post").obj;// 语言类别
}
// 系统语言列表(整理)
function showYuYanList() {
	listFactor = {
		listObj : [ {
			title : "语言ID",
			key : "yuyanid"
		}, {
			title : "语言分类",
			key : "fenleiName"
		}, {
			title : "语言名称",
			key : "mc"
		}, {
			title : "语言文字",
			key : "wenzi"
		}, {
			title : "语言类别",
			key : "leibieName"
		} ],
		manageMenu : null,
		url : contextPath + "/publish/yuyan/findAllYuYansByPageAndYuYan.htm",
		checkbox : true,
		single : true,
		method : "post",
		data : {
			currentPage : 1,
			pageSize : getPageSize(),
			tag : Math.random()
		}
	};
	var div_list = $("<div />").attr("id", "div_list").attr("class", "list")
			.appendTo("#right");
	$(div_list).createPageList(listFactor);
}

// 导入语言(整理)
function importYuYans() {
	var table_importYuYans = "";
	table_importYuYans += "<table width='100%' border='0' cellspacing='0' cellpadding='0' class=' templatetable'>";
	table_importYuYans += "<tr>"
			+ "<td align='right' nowrap>"
			+ "请选择系统语言配置Excel"
			+ "</td>"
			+ "<td>"
			+ "<div class='searchfile'>"
			+ "<input type='file' name='url_excel_yuyan' id ='url_excel_yuyan' class='filed'/>"
			+ "<div class='fieldstyle'><input type='text' name='txt_fieldstyle' id='txt_fieldstyle' class='fieldtext'/></div>"
			+ "<div class='buttonstyle'><input type='button'  id='btn_yuyan' class='fieldbutton'/></div>"
			+ "</div>" + "</div>" + "</td>" + "</tr>";
	table_importYuYans += "</table>";
	var form_importYuYans = $("<form/>").attr("id", "form_importYuYans").attr(
			"action", contextPath + "/publish/yuyan/importYuYans.htm").attr(
			"enctype", "multipart/form-data").attr("method", "post");
	$(table_importYuYans).appendTo(form_importYuYans);
	var div_openbutton = $("<div/>").attr("id", "div_openbutton").attr("class",
			"openbutton").appendTo(form_importYuYans);// 底部div
	var div_openbutton_html = "<a href='javascript:doImportYuYans();'><span class='advsumit'></span>"
			+ "提交"
			+ "</a> <a href=''><span class='advreset'></span>"
			+ "重置"
			+ "</a>";
	$(div_openbutton_html).appendTo(div_openbutton);
	$(form_importYuYans).oimsDialog({
		icon : "export",
		title : "导入",
		width : 450,
		height : 120,
		drag : true,
		locked : true,
		winType : 4,
		button : null
	});
	$.customfile('fieldbutton', 'filed', 'fieldtext', "openWin");
}
// 执行数据导入功能(整理)
function doImportYuYans() {
	$("#form_importYuYans").ajaxForm(
			{
				beforeSend : fileTypeValidation,
				uploadProgress : function() {
				},
				complete : function(data_Result) {
					var data_pre = data_Result.responseText;
					var data_string = "";
					if (data_pre.indexOf("</pre") == -1)
						data_string = data_pre;
					else
						data_string = data_pre.substring(data_pre.indexOf("{"),
								data_pre.indexOf("</pre"));
					var data_Obj = eval("(" + data_string + ")");
					var state = data_Obj.state;
					if (state)
						$.oimsAlert("系统语言信息导入成功", function() {
							do_AdvancedSearch();
							removeDiv_openWin();
						});
					else
						$.oimsAlert("系统语言信息导入失败", function() {
							do_AdvancedSearch();
							removeDiv_openWin();
						});
				}
			});
	$("#form_importYuYans").submit();
}

// 文件上传提交之前对文件后缀验证
// 这里是新添加的
function fileTypeValidation() {
	var fileName = $("#txt_fieldstyle").val().trim();
	var s = fileName.substring(fileName.lastIndexOf('.') + 1);// 文件后缀
	if (s.toLowerCase() == "xls" || s.toLowerCase() == "xlsx")
		return true;
	$.oimsError("格式不对，请重新选择");
	return false;
}

// 语言信息新增(整理)
function saveYuYan() {
	var form_saveYuYan = oimsFormWindow({
		id : "form_saveYuYan",
		dialogTitle : "新增",
		icon : "add",
		url : contextPath + "/publish/yuyan/saveYuYan.htm",
		height : 300,
		width : 650,
		method : "post",
		resetForm : reset_form_saveYuYan,
		btnOkSuccess : function(data, responseText, statusText) {
			if (data.state)
				$.oimsSucc("系统语言信息新增成功", function() {
					do_AdvancedSearch();
					removeDiv_openWin();
				});
			else
				$.oimsError("系统语言信息新增失败", function() {
					do_AdvancedSearch();
					removeDiv_openWin();
				});
		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
			$.oimsError("系统语言信息新增失败", function() {
				do_AdvancedSearch();
				removeDiv_openWin();
			});
		},
		btnOkBefor : validate_form_saveYuYan

	});
	$(table_yuyan).appendTo(form_saveYuYan);
	// 语言分类
	$.each(data_yuyan_fenlei, function(i, yuyan_fenlei) {
		$(
				"<option value=\"" + yuyan_fenlei.categoryid + "\">"
						+ yuyan_fenlei.category + "</option>").appendTo(
				"#fenlei");
	});
	// 语言类别
	$.each(data_yuyan_leibie, function(i, yuyan_leibie) {
		$(
				"<option value=\"" + yuyan_leibie.categoryid + "\">"
						+ yuyan_leibie.category + "</option>").appendTo(
				"#leibie");
	});
}

// 语言新增相关验证的方法(整理)
function validate_form_saveYuYan() {
	var oValidataData = {
		nullValidataData : {
			'id' : '语言ID为空',
			'mc' : '语言名称为空',
			'wenzi' : '语言名称为空',
			'fenlei' : '语言分类为空',
			'leibie' : '语言类别为空'
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);
		return false;
	}
	var value_id = $("#id").val();
	var value_fenlei = $("#fenlei").val();
	var ulr_findAllYuYansByYuYan = "/publish/yuyan/findAllYuYansByYuYan.htm";// 根据语言实体对象查询符合条件的语言集合
	var data_obj_findAllYuYansByYuYan = getJSONData(ulr_findAllYuYansByYuYan, {
		id : value_id,
		fenlei : value_fenlei,
		tag : Math.random()
	}, "post").obj;
	if (data_obj_findAllYuYansByYuYan.length != 0) {
		$.oimsAlert("请修改语言ID或者语言分类");
		return false;
	}
	return true;
}

// 语言信息修改相关验证的方法(整理)
function validate_form_updateYuYan() {
	var oValidataData = {
		nullValidataData : {
			'id' : '语言ID为空',
			'mc' : '语言名称为空',
			'wenzi' : '语言名称为空',
			'fenlei' : '语言分类为空',
			'leibie' : '语言类别为空'
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);
		return false;
	}
	var value_id = $("#id").val();
	var value_fenlei = $("#fenlei").val();
	var ulr_findAllYuYansByYuYan = "/publish/yuyan/findAllYuYansByYuYan.htm";// 根据语言实体对象查询符合条件的语言集合
	var data_obj_findAllYuYansByYuYan = getJSONData(ulr_findAllYuYansByYuYan, {
		id : value_id,
		fenlei : value_fenlei,
		tag : Math.random()
	}, "post").obj;
	if (data_obj_findAllYuYansByYuYan.length != 1) {
		$.oimsAlert("请修改语言ID或者语言分类");
		return false;
	}
	return true;
}
// 语言信息修改(整理)
function updateYuYan() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要修改的系统语言");
		return;
	}
	var form_updateYuYan = oimsFormWindow({
		id : "form_updateYuYan",
		dialogTitle : "修改",
		icon : "edit",
		url : contextPath + "/publish/yuyan/updateYuYan.htm",
		height : 300,
		width : 650,
		method : "post",
		resetForm : reset_form_updateYuYan,
		btnOkSuccess : function(data, responseText, statusText) {
			if (data.state)
				$.oimsSucc("系统语言修改成功", function() {
					do_AdvancedSearch();
					removeDiv_openWin();
				});
			else
				$.oimsError("系统语言修改失败", function() {
					do_AdvancedSearch();
					removeDiv_openWin();
				});
		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
			$.oimsError("系统语言修改失败", function() {
				do_AdvancedSearch();
				removeDiv_openWin();
			});
		},
		btnOkBefor : validate_form_updateYuYan

	});
	$(table_yuyan).appendTo(form_updateYuYan);// 表格的追加
	// 语言分类
	$.each(data_yuyan_fenlei, function(i, yuyan_fenlei) {
		$(
				"<option value=\"" + yuyan_fenlei.categoryid + "\">"
						+ yuyan_fenlei.category + "</option>").appendTo(
				"#fenlei");
	});
	// 语言类别
	$.each(data_yuyan_leibie, function(i, yuyan_leibie) {
		$(
				"<option value=\"" + yuyan_leibie.categoryid + "\">"
						+ yuyan_leibie.category + "</option>").appendTo(
				"#leibie");
	});
	// 赋值
	$("#id").val(dataObjects[0].yuyanid);// 语言ID
	$("#mc").val(dataObjects[0].mc);// 语言名称
	$("#wenzi").val(dataObjects[0].wenzi);// 语言文字
	selectItemByValue("fenlei", dataObjects[0].fenlei);// 语言分类
	selectItemByValue("leibie", dataObjects[0].leibie);// 语言类别
}

// 语言信息删除(根据ID和分类)(整理)
function deleteYuYanByIdAndFenLei() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要删除的系统语言");
		return;
	}
	$.oimsConfirm({
		strTitle : "确认删除该系统语言信息",
		remove_length : true
	}, doDeleteYuYanByIdAndFenLei);
}

// 执行语言信息删除(根据ID和分类)(整理)
function doDeleteYuYanByIdAndFenLei() {
	var dataObjects = getCheckBoxValue();
	var url_deleteYuYanByIdAndFenLei = "/publish/yuyan/deleteYuYanByIdAndFenLei.htm";
	var data = getJSONData(url_deleteYuYanByIdAndFenLei, {
		id : dataObjects[0].yuyanid,
		fenlei : dataObjects[0].fenlei,
		tag : Math.random()
	}, "post");
	if (data.state)
		$.oimsSucc("系统语言信息删除成功", function() {
			do_AdvancedSearch();
			removeDiv_openWin();
		});
	else
		$.oimsError("系统语言信息删除失败", function() {
			do_AdvancedSearch();
			removeDiv_openWin();
		});
}

// 重置—form_saveYuYan(整理)
function reset_form_saveYuYan() {
	$("#id").val("");// 语言ID
	$("#mc").val("");// 语言名称
	$("#wenzi").val("");// 语言文字
	selectItemByValue("fenlei", data_yuyan_fenlei[0].categoryid);// 语言分类
	selectItemByValue("leibie", data_yuyan_leibie[0].categoryid);// 语言类别
}

// 重置—form_updateYuYan(整理)
function reset_form_updateYuYan() {
	var dataObjects = getCheckBoxValue();
	// 赋值
	$("#id").val(dataObjects[0].yuyanid);// 语言ID
	$("#mc").val(dataObjects[0].mc);// 语言名称
	$("#wenzi").val(dataObjects[0].wenzi);// 语言文字
	selectItemByValue("fenlei", dataObjects[0].fenlei);// 语言分类
	selectItemByValue("leibie", dataObjects[0].leibie);// 语言类别
}

// 弹出高级查询窗口(整理)
function openDialog_AdvancedSearch_YuYan() {
	var table_AdvancedSearch = "";
	table_AdvancedSearch += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	table_AdvancedSearch += "<tr>"
			+ "<td width='7%' align='right' nowrap>"
			+ "语言ID"
			+ "：</td>"
			+ "<td width='15%'>"
			+ "<input type='text' name='search_id' id='search_id'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' />"
			+ "</td>"
			+ "<td width='7%' align='right' nowrap>"
			+ "语言分类"
			+ "：</td>"
			+ "<td width='15%'>"
			+ "<select name='search_fenlei' id='search_fenlei' onblur=\"this.className='blur'\"><option value=''></option></select>"
			+ "</td>"
			+ "<td width='7%' align='right' nowrap>"
			+ "语言类别"
			+ "：</td>"
			+ "<td width='15%'>"
			+ "<select name='search_leibie' id='search_leibie' onblur=\"this.className='blur'\"><option value=''></option></select>"
			+ "</td>" + "</tr>";
	table_AdvancedSearch += "</table>";
	table_AdvancedSearch += "<div class='avdopenbutton'>";
	table_AdvancedSearch += "<a href='javascript:do_AdvancedSearch();'><span class='advsumit'></span>"
			+ "提交"
			+ "</a> "
			+ "<a href='javascript:reset_AdvancedSearch();'><span class='advreset'></span>"
			+ "重置"
			+ "</a>"
			+ "<a id='closeId'><span class='close'></span>"
			+ "关闭" + "</a>";
	table_AdvancedSearch += "</div>";
	$.oimsBox({
		parentDiv : "div_advquery",// 将生成内容添加的id
		divContent : table_AdvancedSearch
	// 需要添加的内容
	});
	$("#search_fenlei")[0].options.length = 0;// 清空分类下拉框
	$("#search_leibie")[0].options.length = 0;// 清空类别下拉框
	$("<option value=''></option>").appendTo("#search_fenlei");
	$("<option value=''></option>").appendTo("#search_leibie");
	// 语言分类
	$.each(data_yuyan_fenlei, function(i, yuyan_fenlei) {
		$(
				"<option value=\"" + yuyan_fenlei.categoryid + "\">"
						+ yuyan_fenlei.category + "</option>").appendTo(
				"#search_fenlei");
	});
	// 语言类别
	$.each(data_yuyan_leibie, function(i, yuyan_leibie) {
		$(
				"<option value=\"" + yuyan_leibie.categoryid + "\">"
						+ yuyan_leibie.category + "</option>").appendTo(
				"#search_leibie");
	});
}

// 执行高级查询(整理)
function do_AdvancedSearch() {
	var data_search = {};
	var wenzi = $("#search_wenzi").val().indexOf("请输入") != -1 ? "" : $(
			"#search_wenzi").val();// 语言文字
	var id = $("#search_id").length == 1 ? $("#search_id").val() : "";// 语言ID
	var fenlei = $("#search_fenlei").length == 1 ? $("#search_fenlei").val()
			: "";// 语言分类
	var leibie = $("#search_leibie").length == 1 ? $("#search_leibie").val()
			: "";// 语言类别
	data_search = {
		wenzi : wenzi,// 语言文字
		id : id,// 语言ID
		fenlei : fenlei,// 语言分类
		leibie : leibie
	// 语言类别
	};
	$.extend(listFactor.data, data_search);
	$("#div_list").createPageList(listFactor);
}

// 重置AdvancedSearch(整理)
function reset_AdvancedSearch() {
	$("#search_id").val("");// 语言ID
	selectItemByValue("search_fenlei", "");// 语言分类
	selectItemByValue("search_leibie", "");// 语言类别
}
