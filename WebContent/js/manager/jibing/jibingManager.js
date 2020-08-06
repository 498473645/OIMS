var disease_id;
var category; // 用于保存分类对象
var jibing_saveOimsCategory = "/publish/oimsCategory/saveOimsCategory.htm";
var jibing_getOimsCategoryById = "/publish/oimsCategory/getOimsCategoryById.htm";
var jibing_delCategoryAndDiseaseById = "/publish/jibing/delCategoryAndDiseaseById.htm";
var jibing_addJiBing = "/publish/jibing/addJiBing.htm";
var jibing_delJiBing = "/publish/jibing/delJiBing.htm";
var jibing_updateJiBing = "/publish/jibing/updateJiBing.htm";
var jibing_getJiBingById = "/publish/jibing/getJiBingById.htm";
var jibing_validateIsExistNextLevel = "/publish/jibing/validateIsExistNextLevel.htm";

function jibingReady(btns) {
	importJS("/js/manager/jibing/jibingLanguage.js");
	loadJsAndCss_JiBing();
	// pageTitle = danwei_language.OfficeInfo;
	pageTitle = "疾病列表";
	init();
	var categoryTree = $(".right .categoryTree");
	if (!categoryTree.length) {
		categoryTree = $("<div />").width(180).height(
				$(".content").height() - $(".title").outerHeight(true))
				.addClass("categoryTree").appendTo(".right");
		categoryTree.css({
			"background" : "#fff",
			"overflow-y" : "auto",
			"overflow-x" : "hidden",
			"border-right" : "2px solid #ddd",
			"float" : "left"
		});
		var t = $("<div />").addClass("categoryTitle").width(280).css({
			height : "40px",
			"line-height" : "28px",
			"background" : "#fff"
		}).appendTo(categoryTree);
		// $("<a />").css({border:"1px solid #d2d2d2",
		// background:"#ccc",width:"58px",color:"#fff",height:"22px","text-align":"center","line-height":"22px",display:"block",float:"left"}).text("本地数据库").appendTo(t);
		// $("<a
		// />").css({width:"58px",color:"#fff",height:"22px","text-align":"center","line-height":"22px",display:"block",float:"left",border:"1px
		// solid #d2d2d2"}).text("远程数据库").appendTo(t);
		var titleDiv = $("<div />").addClass("tablabel");
		titleDiv.append(($("<div />").addClass("tab_show").append($("<span />")
				.append(jibing_language.localDb))));
		titleDiv.append(($("<div />").addClass("tab_hide").append($("<span />")
				.append(jibing_language.distanceDb))));
		titleDiv.appendTo(t);
	} else {
		categoryTree.text("");
	}
	getCategoryTree();

	showCategoryTree(categoryTree, oimsCategory.ILL_CATEGORY, onDiseaseClick,
			onDiseaseClick);

	var div_advquery = $("<div/>").attr("id", "advquery").width(
			$(".right").width() - categoryTree.outerWidth() - 30).height(
			categoryTree.outerHeight() - 16).css({
		"float" : "left",
		"margin-left" : "8px"
	}).addClass("advquery").appendTo("#right");

	var jibingTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='23%' class='leftalign' ><input name='search' type='text' class='blurview' id='search' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"
			+ "请输入疾病的国际编码或名称"
			+ "' size='28' /></td>"
			+ "<td width='7%'><a  href='javascript:queryJiBing();' class='search'>"
			+ "查询"
			+ "</a></td>"
			+ " <td width='9%'></td>"
			+ "<td width='59%' >"
			+ "<div class='btn'>"
			+ "<a onclick='return false;' href='javascript:addJiBingFenLei();' style='width:65px;'><span class='adda'></span>"
			+ "增加分类"
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:updateJiBingFenLei();' style='width:65px;'><span class='edita'></span>"
			+ "修改分类"
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:delJiBingFenLei();' style='width:65px;'><span class='dela'></span>"
			+ "删除分类"
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:addJiBing();'><span class='adda'></span>"
			+ "增加"
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:updateJiBing();'><span class='edita'></span>"
			+ "修改"
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:delJiBing();'><span class='dela'></span>"
			+ "删除" + "</a>" + "</div>" + "</td>" + "</tr>" + "</table>";
	$(jibingTemplate).appendTo(div_advquery);
	btnProwerConfig(btns);// 按钮加上权限
	showJiBingList();
	$("#search").click(function() {
		clearInitQuery(this);
	});// 点击清空输入框文字
	$("#search").blur(function() {
		if (this.value == "") {
			$("#search").val("请输入疾病的国际编码或名称");
			$("#search").addClass("blurview");
		}
	});
	disease_id=undefined;
}
// 创建疾病分类模版
function createjibingFenLeiTab() {
	var jibing = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
			+ "<tr>"
			+ "<td width='10%'></td>"
			+ "<td width='12%' align='right' nowrap='nowrap'>分类编码:</td>"
			+ "<td nowrap='nowrap' ><input style='width:60px;' type='text' name='fatherid' readonly size='20' value="
			+ disease_id
			+ " id='fatherid'  /><input id='add_fatherid_button' style='height:22px;width:90px' type='button' value='设为顶级节点'</td>"
			+ "<td width='12%' align='right' nowrap='nowrap'></td>"
			+ "<td></td>'"
			+ "</tr>"
			+ "<tr>"
			+ "<td width='8%'></td>"
			+ "<td width='12%' align='right' nowrap='nowrap'>分类名称:</td>"
			+ "<td><input type='text' name='category' size='20' id='category' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td width='8%'></td>"
			+ "<td width='12%' align='right' nowrap='nowrap'>分类描述:</td>"
			+ "<td><input type='text' name='intr' size='20' id='intr' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "</tr>" + "</table><br>";
	return jibing;
}

// 新增分类
function addJiBingFenLei() {
	if (disease_id == undefined)
		disease_id = oimsCategory.ILL_CATEGORY;
	var jibingTable = createjibingFenLeiTab();
	var addForm = oimsFormWindow({
		id : "addForm",
		icon : "add",
		url : contextPath + jibing_saveOimsCategory,
		dialogTitle : "添加疾病分类",
		height : 300,
		width : 275,
		resetForm : function() {
			$("#fatherid").val(disease_id);
			$("#intr").val("");
			$("#category").val("");
		},
		btnOkSuccess : function(data, responseText, statusText) {
			if (data.state) {
				$.oimsSucc("录入成功！", function() {
					removeDiv_openWin();
					flush_jibing();
					flushTree();
				});
			} else {
				$.oimsError("录入失败！", function() {
					removeDiv_openWin();
				})
			}
		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
			$.oimsAlert("录入失败", function() {
				removeDiv_openWin();
			});
		},
		btnOkBefor : jibingFenLeiFormValidate
	});

	addForm.append(jibingTable);
	setNode();
}
// 修改分类
function updateJiBingFenLei() {
	if (disease_id == undefined) {
		$.oimsAlert("请选择要修改的分类");
		return;
	}
	var jibingTable = createjibingFenLeiTab();
	var addForm = oimsFormWindow({
		id : "editForm",
		icon : "edit",
		url : contextPath + jibing_saveOimsCategory,
		dialogTitle : "修改疾病分类",
		height : 300,
		width : 275,
		resetForm : function() {
			$("#fatherid").val(category.fatherid);
			$("#category").val(category.category);
			$("#intr").val(category.intr);
			$("#category_id").val(category.id);
		},
		btnOkSuccess : function(data, responseText, statusText) {
			if (data.state) {
				$.oimsSucc("修改成功！", function() {
					removeDiv_openWin();
					flush_jibing();
					flushTree();
				});
			} else {
				$.oimsError("修改失败！", function() {
					removeDiv_openWin();
				})
			}
		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
			$.oimsAlert("修改失败", function() {
				removeDiv_openWin();
			});
		},
		btnOkBefor : jibingFenLeiFormValidate
	});

	addForm.append(jibingTable);

	var data = getJSONData(jibing_getOimsCategoryById, {
		id : disease_id,
		tag : Math.random()
	}, "post");
	if (data.state) {
		category = data.obj;
		$(
				"<input type='hidden' id='category_id' value='" + category.id
						+ "' name='id'  />").appendTo("#editForm");
		$("#fatherid").val(category.fatherid);
		$("#category").val(category.category);
		$("#intr").val(category.intr);
	}
	setNode();
}
// 删除分类
function delJiBingFenLei() {
	if (disease_id == undefined) {
		$.oimsAlert("请选择要删除的分类");
		return;
	}
	var validate_data = getJSONData(jibing_validateIsExistNextLevel, {
		id : disease_id,
		tag : Math.random()
	}, "post");
	if (validate_data.state) {
		if (validate_data.message == "") {
			doDelJiBingFenLei();
		} else {
			$.oimsConfirm({
				strTitle : validate_data.message,
				remove_length : true
			}, function() {
				doDelJiBingFenLei();
			});
		}
	} else {
		$.oimsError("验证失败");
	}
}

function doDelJiBingFenLei() {
	var data = getJSONData(jibing_delCategoryAndDiseaseById, {
		id : disease_id,
		tag : Math.random()
	}, "post");
	if (data.state) {
		$.oimsSucc("删除成功！", function() {
			flushTree();
			flush_jibing();
		});
	} else {
		$.oimsError("删除失败！", function() {
			flushTree();
			flush_jibing();
		});
	}
}

// 疾病分类验证
function jibingFenLeiFormValidate() {
	if ($("#fatherid").val() == undefined || $("#fatherid").val() == "") {
		$.oimsAlert("请输入父级编码");
		return false;
	}
	if ($("#category").val() == undefined || $("#category").val() == "") {
		$.oimsAlert("请输入分类名称");
		return false;
	}
}
// 按疾病分类查询疾病列表
function showDiseaseByCategory() {
	// if (treeNode.id != undefined) {
	var obj = {
		categoryId : disease_id,
		currentPage : 1,
		pageSize : getPageSize(),// Page类的方法
		tag : Math.random()
	};
	listFactor.data = obj;
	$("#div_list").createPageList(listFactor);
	$("#div_listTable").css("text-align", "center");
	// }
}
// 查询疾病分类列表
function queryJiBing() {
	var obj = {
		search : $("#search").val().indexOf("请输入") != -1 ? "" : $("#search")
				.val(),
		currentPage : 1,
		pageSize : getPageSize(),// Page类的方法
		tag : Math.random()
	};
//	$.extend(listFactor.data, obj);
	listFactor.data = obj;
	$("#div_list").createPageList(listFactor);
	$("#div_listTable").css("text-align", "center");
}
// 点击疾病分类的点击事件
function onDiseaseClick(event, treeId, treeNode, clickFlag) {
	// 获取点击节点的id
	disease_id = treeNode.id;
	var ccs = getCategoriesData(treeNode.id);
	if (ccs.length == 0) {
		treeNode.isParent = false;
		showDiseaseByCategory();
		return;
	} else {
		treeNode.isParent = true;// 这个属性为true才会显示子节点
	}

	var nodes = new Array();
	$.each(ccs, function(i, v) {
		if (v == undefined)
			return false;
		nodes.push(categoryToTreeDate(v));
	});

	var zTree = $.fn.zTree.getZTreeObj("bingLiUL");
	if (treeNode.children.length == 0) {
		var ttreeNode = zTree.addNodes(treeNode, nodes, false);
		if (ttreeNode) {
		} else {
			alert("叶子节点被锁定，无法增加子节点");
		}
	}
	showDiseaseByCategory();
};
// 显示列表
function showJiBingList() {
	listFactor = {
		listObj : [ {
			title : "疾病编号",
			key : "id"
		}, 
//		{
//			title : "父疾病编码",
//			key : "father_id"
//		},
		{
			title : "分类编码",
			key : "categoryId"
		}, {
			title : "国际编码",
			key : "icd_code"
		}, {
			title : "疾病名称",
			key : "disease"
		}, {
			title : "详述",
			key : "description"
		} ],
		url : contextPath + "/publish/jibing/findAllJiBingByPage.htm",// url
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			tag : Math.random()
		}
	};
	var div_list = $("<div />").attr("id", "div_list").attr("class", "list")
			.appendTo("#advquery");// 创建div_list添加到div_right
	div_list.createPageList(listFactor);
	$("#div_listTable").css("text-align", "center");
}
// 刷新左边的树
function flushTree() {
	var categoryTree = $(".right .categoryTree");
	$("#C_ri").remove();
	showCategoryTree(categoryTree, oimsCategory.ILL_CATEGORY, onDiseaseClick,
			onDiseaseClick);
	disease_id = undefined;
}
// 刷新列表
function flush_jibing() {
	$("#div_list").remove();
	showJiBingList();
}

// 添加疾病模版
function createJiBingTab() {
	var jibingTable = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
			+ "<tr>"
			+ "<td width='10%'></td>"
			+ "<td width='12%' align='right' nowrap='nowrap'>分类编码:</td>"
			+ "<td nowrap='nowrap' ><input type='text' name='categoryId' readonly size='20' value="
			+ disease_id
			+ " id='categoryId'  />"
			+ "<td width='12%' align='right' nowrap='nowrap'>国际编码:</td>"
			+ "<td><input type='text' name='icd_code' size='20' id='icd_code' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>'"
			+ "</tr>"
			+ "<tr>"
			+ "<td width='8%'></td>"
			+ "<td width='12%' align='right' nowrap='nowrap'>疾病名称:</td>"
			+ "<td><input type='text' name='disease' size='20' id='disease' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "<td width='12%' align='right' nowrap='nowrap'>详述:</td>"
			+ "<td><input type='text' name='description' size='20' id='description' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "</tr>" + "</table><br>";
	return jibingTable;
}

// 新增疾病
function addJiBing() {
	if (disease_id == undefined||disease_id==""){
		$.oimsAlert("请选择分类");
		return;
	}
	var jibingTable = createJiBingTab();

	var addForm = oimsFormWindow({
		id : "addForm",
		icon : "add",
		url : contextPath + jibing_addJiBing,
		dialogTitle : "添加疾病",
		height : 300,
		width : 500,
		resetForm : function() {
			$("#categoryId").val(disease_id);
			$("#icd_code").val("");
			$("#disease").val("");
			$("#description").val("");
		},
		btnOkSuccess : function(data, responseText, statusText) {
			if (data.state) {
				$.oimsSucc("录入成功！", function() {
					removeDiv_openWin();
					showDiseaseByCategory();
				});
			} else {
				$.oimsError("录入失败！", function() {
					removeDiv_openWin();
					showDiseaseByCategory();
				})
			}
		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
			$.oimsAlert("添加失败", function() {
				showDiseaseByCategory();
			});
		},
		btnOkBefor : jibingFormValidate

	});
	addForm.append(jibingTable);
}
// 修改疾病
function updateJiBing() {
	var dataObjects = getCheckBoxValue();

	if (dataObjects.length == 0) {
		$.oimsAlert(language.CheckOneItem_Alert);
		return;
	}

	var jibingTable = createJiBingTab();
	var id = "<input type=hidden name='id' value='" + dataObjects[0].id
			+ "'  id='id' />";
	var updateForm = oimsFormWindow({
		id : "updateForm",
		icon : "edit",
		url : contextPath + jibing_updateJiBing,
		dialogTitle : "修改疾病",
		height : 300,
		width : 500,
		resetForm : function() {// 重置
			$("#father_id").val(jibing.father_id);
			$("#icd_code").val(jibing.icd_code);
			$("#disease").val(jibing.disease);
			$("#description").val(jibing.description);
		},
		btnOkSuccess : function(data, responseText, statusText) {
			if (data.state) {
				$.oimsSucc("修改成功！", function() {
					removeDiv_openWin();
					showDiseaseByCategory();
				});
			} else {
				$.oimsError("修改失败！", function() {
					removeDiv_openWin();
					showDiseaseByCategory();
				})
			}
		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
			$.oimsAlert("修改失败", function() {
				showDiseaseByCategory();
			});
		},
		btnOkBefor : jibingFormValidate

	});
	updateForm.append(jibingTable).append(id);

	var data = getJSONData(jibing_getJiBingById, {
		id : dataObjects[0].id,
		tag : Math.random()
	}, "post");
	if (data.state) {
		jibing = data.obj;
		$("#categoryId").val(jibing.categoryId);
		$("#icd_code").val(jibing.icd_code);
		$("#disease").val(jibing.disease);
		$("#description").val(jibing.description);
	}

}

// 验证疾病
function jibingFormValidate() {
	if ($("#categoryId").val() == undefined || $("#categoryId").val() == "") {
		$.oimsAlert("分类编码不能为空！");
		return false;
	}
//	if ($("#icd_code").val() == undefined || $("#icd_code").val() == "") {
//		$.oimsAlert("国际编码不能为空！");
//		return false;
//	}
	if ($("#disease").val() == undefined || $("#disease").val() == "") {
		$.oimsAlert("疾病名称不能为空！");
		return false;
	}
}

// 删除疾病信息

function delJiBing() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择一条记录");
		return;
	}
	$.oimsConfirm({
		strTitle : "你确定要删除选中数据吗？",
		remove_length : true
	}, function() {
		var data = getJSONData(jibing_delJiBing, {
			id : dataObjects[0].id
		}, "post");
		if (data.state) {
			$.oimsSucc("删除成功！", function() {
				showDiseaseByCategory();
			});
		} else {
			$.oimsError("删除失败！", function() {
				showDiseaseByCategory();
			});
		}
	});
}
// 设置单击事件
function setNode() {
	$("#add_fatherid_button").click(function() {
		$("#fatherid").val(oimsCategory.ILL_CATEGORY);
	});
}
