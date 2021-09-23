//禁用设备列表(整理)
function sheBeiOfNotQiYongReady(btns) {
	pageTitle = "禁用设备列表";
	init();
	var div_advquery = $("<div/>").attr("id", "div_advquery").attr("class",
			"advquery").appendTo("#right");
	var table_advquery = "";
	table_advquery += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	table_advquery += "<tr>"
			+ "<td width='23%' class='leftalign' >"
			+ "<input name='search_sbmc' type='text' class='blurview' id='search_sbmc' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"
			+ "请输入设备名称"
			+ "' size='28' />"
			+ "</td>"
			+ "<td width='9%'><a href='javascript:searchShebei();' class='search'>"
			+ "查询"
			+ "</a></td>"
			+ "<td width='59%' >"
			+ "<div class='btn'>"
			+ "<a  href='javascript:deleteSheBeiById();'><span class='dela'></span>"
			+ "删除"
			+ "</a>"
			+ "<a  href='javascript:enableOrDisable_SheBei_NotQiYong(true);'><span class='starta'></span>"
			+ "启用" + "</a>" + "</div>" + "</td>" + "</tr>";
	table_advquery += "</table>";
	$(table_advquery).appendTo(div_advquery);
	btnProwerConfig(btns);// 按钮加上权限
	showSheBeiOfNotQiYongList();// 设备列表
	$("#search_sbmc").click(function() {
		clearInitQuery(this);
	});// 点击输入框清空字体
	$("#search_sbmc").blur(function() {
		if (this.value == "") {
			$("#search_sbmc").val("请输入设备名称");
			$("#search_sbmc").addClass("blurview");
		}
	});
	$("#search_sbmc").bind("keyup", function(e) {
		if (e.which == 13) {
			searchShebei();
		}
	});
}

// 禁用设备列表(整理)
function showSheBeiOfNotQiYongList() {
	listFactor = {
		listObj : [ {
			title : "序号",
			key : "shebeiid"
		}, {
			title : "设备名称",
			key : "sbmc"
		}, {
			title : "规格型号",
			key : "ggxh"
		}, {
			title : "主机/IP地址",
			key : "ip"
		}, {
			title : "连接状态",
			key : "online",
			func : function(value) {
				return (value == 1) ? "正常" : "异常";
			}
		}, {
			title : "所属科室",
			key : "bmmc"
		}, {
			title : "所属办公室",
			key : "bsgName"
		}, {
			title : "状态",
			key : "qiyong",
			func : function(value) {
				return (value == 1) ? "启用" : "禁用";
			}
		} ],
		url : contextPath + "/publish/shebei/findAllSheBeisByPageAndSheBei.htm",
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			qiyong : false,
			sbmc : null,
			tag : Math.random()
		}
	};
	var div_list = $("<div/>").attr("id", "div_list").attr("class", "list")
			.appendTo("#right");// 创建一个div_list添加到div_right
	$(div_list).createPageList(listFactor);
}

// 启用禁用设备(整理)
function enableOrDisable_SheBei_NotQiYong(state_qiyong) {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0 && state_qiyong) {
		$.oimsAlert("请选择需要启用的设备");
		return;
	}
	if (dataObjects.length == 1 && state_qiyong) {
		$.oimsConfirm({
			strTitle : "确认启用该设备",
			remove_length : true
		}, do_enable_SheBei_NotQiYong);
	}
	if (dataObjects.length == 0 && (!state_qiyong)) {
		$.oimsAlert("请选择需要禁用的设备");
		return;
	}
	if (dataObjects.length == 1 && (!state_qiyong)) {
		$.oimsConfirm({
			strTitle : "确认禁用该设备",
			remove_length : true
		}, do_Disable_SheBei_NotQiYong);
	}
}

// 设备启用(整理)
function do_enable_SheBei_NotQiYong() {
	do_enableOrDisable_SheBei_NotQiYong(true);
}
// 设备禁用(整理)
function do_Disable_SheBei_NotQiYong() {
	do_enableOrDisable_SheBei_NotQiYong(false);
}
// 设备启用禁用执行(整理)
function do_enableOrDisable_SheBei_NotQiYong(state_qiyong) {
	var dataObjects = getCheckBoxValue();
	var url_updateSheBeiBySheBei = "/publish/shebei/updateSheBeiBySheBei.htm";
	var data = getJSONData(url_updateSheBeiBySheBei, {
		id : dataObjects[0].shebeiid,
		qiyong : state_qiyong,
		tag : Math.random()
	}, "post");
	if (data.state && state_qiyong)
		$.oimsSucc("设备启用成功", function() {
			searchShebei();
			removeDiv_openWin();
		});
	if (!data.state && state_qiyong)
		$.oimsError("设备启用失败", function() {
			searchShebei();
			removeDiv_openWin();
		});
	if (data.state && (!state_qiyong))
		$.oimsSucc("设备禁用成功", null);
	if (!data.state && (!state_qiyong))
		$.oimsError("设备禁用失败", null);
}

// 设备信息删除(整理)
function deleteSheBeiById() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要删除的设备");
		return;
	}
	$.oimsConfirm({
		strTitle : "是否确认删除该设备",
		remove_length : true
	}, doDeleteSheBeiById);
}

// 执行设备信息删除(整理)
function doDeleteSheBeiById() {
	var dataObjects = getCheckBoxValue();
	var url_deleteSheBeiById = "/publish/shebei/deleteSheBeiById.htm";
	var data = getJSONData(url_deleteSheBeiById, {
		id : dataObjects[0].shebeiid,
		tag : Math.random()
	}, "post");
	if (data.state)
		$.oimsSucc("设备信息删除成功", function() {
			searchShebei();
			removeDiv_openWin();
		});
	else
		$.oimsError("设备信息删除失败", function() {
			searchShebei();
			removeDiv_openWin();
		});
}

// 查询条件（searchShebei）(整理)
function searchShebei() {
	var data_search;
	if ($("#search_sbmc").val().indexOf("请输入") != -1)
		data_search = {
			sbmc : ''
		};
	else
		data_search = {
			sbmc : $("#search_sbmc").val()
		};
	$.extend(listFactor.data, data_search);
	$("#div_list").createPageList(listFactor);
};

