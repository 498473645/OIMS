var decide_protocol_windowsShare = 17;// 17表示访问协议为Windows共享
var data_list_jcxmobj;// 所有的检查项目
var data_shebei_bmId;// 所属科室
var data_shebei_protocol;// 访问协议
var data_shebei_xppath = [ {
	value_xppath : '',
	key_xppath : ''
}, {
	value_xppath : 'jianchaYanGuang.js',
	key_xppath : '验光'
}, {
	value_xppath : 'jianchaTeShu.js',
	key_xppath : '特殊检查'
}, {
	value_xppath : 'jianchaYanYa.js',
	key_xppath : '眼压'
}, {
	value_xppath : 'jianchaShili.js',
	key_xppath : '视力'
} ];
// 启用设备列表(整理)
function sheBeiOfQiYongReady(btns) {
	pageTitle = "启用设备管理";
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
			+ "<a  href='javascript:saveSheBeiBaseInfo();'><span class='adda'></span>"
			+ "新增"
			+ "</a>"
			+ "<a  href='javascript:updateSheBeiBaseInfo();'><span class='edita'></span>"
			+ "修改"
			+ "</a>"
			+ "<a  href='javascript:enableOrDisable_SheBei_QiYong(false);'><span class='prohibita'></span>"
			+ "禁用"
			+ "</a>"
			+ "<a  href='javascript:updateJcxmsOfSheBeiDialog();' class='four'><span class='checkitema'></span>"
			+ "检查项目" + "</a>" + "</div>" + "</td>" + "</tr>";
	table_advquery += "</table>";
	$(table_advquery).appendTo(div_advquery);
	btnProwerConfig(btns);// 按钮加上权限
	showSheBeiOfQiYongList();// 启用设备列表
	initialData_shebei();// 初始化设备必要的数据
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

/*
 * 梁建业 初始化设备必要的数据
 */
function initialData_shebei() {
	var url_findCategorysByFatherId = "/publish/category/findCategorysByFatherId.htm";// 根据fatherid查询该fatherid下所有的码表信息
	data_shebei_protocol = getJSONData(url_findCategorysByFatherId, {
		fatherid : oimsCategory.SHEBEI_FANGWENXIEYI,
		tag : Math.random()
	}, "post").obj;// 分类名称
	var url_findAllBuMen = "/publish/bumen/findAllBuMen.htm";// 查询所有部门
	data_shebei_bmId = getJSONData(url_findAllBuMen, {
		tag : Math.random()
	}, "post").obj;
	var url_findAllJcxm = "/publish/jcxm/findAllJcxm.htm"; // 查询所有检查项目信息
	data_list_jcxmobj = getJSONData(url_findAllJcxm, {
		categoryId:oimsCategory.YAN_KE_JIAN_CHA,
		currentPage:1,
		pageSize:1000,
		tag : Math.random()
	}, "post").obj;

}
// 启用设备列表(整理)
function showSheBeiOfQiYongList() {
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
			qiyong : true,
			sbmc : null,
			tag : Math.random()
		}
	};
	var div_list = $("<div/>").attr("id", "div_list").attr("class", "list")
			.appendTo("#right");// 创建一个div_list添加到div_right
	$(div_list).createPageList(listFactor);
}
// 新增设备基本信息(整理)
function saveSheBeiBaseInfo() {
	var table_shebei = "";// 设备table
	table_shebei += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	table_shebei += "<tr>"
			+ "<td width='10%' align='right' nowrap='nowrap'>"
			+ "设备名称"
			+ "：</td>"
			+ "<td width='22%' align='left'>"
			+ "<input type='text' name='sbmc'  id='sbmc'  onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur' />"
			+ "</td>"
			+ "<td width='1%'><span class='required'>*</span></td>"
			+ "<td width='8%' align='right' nowrap='nowrap'>"
			+ "规格型号"
			+ "：</td>"
			+ "<td width='22%' align='left'>"
			+ "<input type='text' name='ggxh'  id='ggxh'  onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur' />"
			+ "</td>"
			+ "<td width='1%'><span class='required'>*</span></td>"
			+ "<td width='8%' align='right' nowrap='nowrap'>"
			+ "所属科室"
			+ "：</td>"
			+ "<td width='22%' align='left'>"
			+ "<select name='bmId' id='bmId' onblur=\"this.className='blur'\"></select>"
			+ "</td>" + "<td width='1%'><span class='required'>*</span></td>"
			+ "<tr>";
	table_shebei += "<tr>"
			+ "<td align='right'>"
			+ "设备位置"
			+ "：</td>"
			+ "<td align='right'>"
			+ "<select name='bgsId' id='bgsId' onblur=\"this.className='blur'\"></select>"
			+ "</td>"
			+ "<td width='1%'></span></td>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "主机/IP地址"
			+ "：</td>"
			+ "<td align='right'>"
			+ "<input type='text' name='ip'  id='ip'  onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur' />"
			+ "</td>"
			+ "<td width='1%'><span class='required'>*</span></td>"
			+ "<td align='right'>"
			+ "管理用户"
			+ "：</td>"
			+ "<td align='right' id='manager_names'>"
			+ "<td align='left' style ='display:none'><input type='hidden' name='manageUser' id='manageUser'/>"// 隐藏域
			+ "</td>" + "<td width='1%'></td>" + "<tr>";
	table_shebei += "<tr>"
			+ "<td align='right'>"
			+ "访问协议"
			+ "：</td>"
			+ "<td align='right'>"
			+ "<select name='protocol' id='protocol' onblur=\"this.className='blur'\">"
			+ "</select>"
			+ "</td>"
			+ "<td width='1%'><span class='required'>*</span></td>"
			+ "<td align='right'>"
			+ "小屏幕采集"
			+ "：</td>"
			+ "<td align='right'>"
			+ "<select name='xppath' id='xppath' onblur=\"this.className='blur'\">"
			+ "</select>" + "</td>" + "<tr>";
	table_shebei += "</table>";
	var div_windowsShare = "<div style='display:block;padding-bottom:5px;' id='div_windowsShare'>";// windows共享div
	div_windowsShare += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	div_windowsShare += "<tr>"
			+ "<td width='10%' align='right' nowrap='nowrap'>"
			+ "共享名称"
			+ "：</td>"
			+ "<td width='22%' align='left'>"
			+ "<input type='text' name='smbName'  id='smbName'  onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' />"
			+ "</td>"
			+ "<td width='1%'></td>"
			+ "<td width='8%' align='right' nowrap='nowrap'>"
			+ "访问用户"
			+ "：</td>"
			+ "<td width='22%' align='left'>"
			+ "<input type='text' name='smbUser'  id='smbUser'  onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' />"
			+ "</td>"
			+ "<td width='1%'></td>"
			+ "<td width='8%' align='right' nowrap='nowrap'>"
			+ "访问密码"
			+ "：</td>"
			+ "<td width='22%' align='left'>"
			+ "<input type='password' name='smbPassword'  id='smbPassword'  onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' />"
			+ "</td>" + "<td width='1%'></td>" + "<tr>";
	div_windowsShare += "</table>";
	div_windowsShare += "<div/>";
	var form_saveSheBeiBaseInfo = oimsFormWindow({
		id : "form_saveSheBeiBaseInfo",
		dialogTitle : "新增",
		icon : "add",
		url : contextPath + "/publish/shebei/saveSheBei.htm",
		height : 420,
		width : 780,
		method : "post",
		resetForm : reset_form_saveSheBeiBaseInfo,
		btnOkSuccess : function(data, responseText, statusText) {
			if (data.state)
				$.oimsSucc("设备信息新增成功", function() {
					searchShebei();
					removeDiv_openWin();
				});
			else
				$.oimsError("设备信息新增失败", function() {
					searchShebei();
					removeDiv_openWin();
				});
		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {

		},
		btnOkBefor : validate_form_SheBeiBaseInfo

	});
	form_saveSheBeiBaseInfo.append(table_shebei);// 设备表格追加
	form_saveSheBeiBaseInfo.append(div_windowsShare);// 设备表格追加
	// 所属科室
	$.each(data_shebei_bmId, function(i, shebei_bmId) {
		$(
				"<option value=\"" + shebei_bmId.id + "\">" + shebei_bmId.bmmc
						+ "</option>").appendTo("#bmId");
	});
	// 分设备访问协议
	$.each(data_shebei_protocol, function(i, shebei_protocol) {
		$(
				"<option value=\"" + shebei_protocol.categoryid + "\">"
						+ shebei_protocol.category + "</option>").appendTo(
				"#protocol");
	});
	// 小屏采集
	for ( var i = 0; i < data_shebei_xppath.length; i++)
		$(
				"<option value=\"" + data_shebei_xppath[i].value_xppath + "\">"
						+ data_shebei_xppath[i].key_xppath + "</option>")
				.appendTo("#xppath");
	change_shebei_protocol();// 访问协议onchange事件
	change_shebei_bmId();// 所属科室的onchange事件
	$("#protocol").change(change_shebei_protocol);// protocol绑定change方法
	$("#bmId").change(change_shebei_bmId);// bmId绑定change方法
	multiple_shebeiUser();// 加载多选用户列表
}

// 实现设备的管理用户多选(整理)
function multiple_shebeiUser() {
	$("#shebeiUsers").remove();
	var array = new Array();
	var data = getJSONData("/publish/yuangong/findYuanGongsByYuanGong.htm", {
		bumenId : $("#bmId option:selected").val(),
		tag : Math.random()
	}, "post");
	if (data.state) {
		$.each(data.obj, function(i, d) {
			array.push({
				text : d.xingming,
				id : d.gonghao
			});
		});
	}
	var ff = $.textAddCommbo({
		id : "shebeiUsers",
		hiddenId : "manageUser"
	});
	$("#manager_names").append(ff.ele);
	ff.tree(array, "shebeiUsers");
	$(".selectlist").height(108);
	$(".dataselectdrop").css("position", "absolute");
}
// 设备新增验证(整理)
function validate_form_SheBeiBaseInfo() {
	var oValidataData = {
		nullValidataData : {
			'sbmc' : "设备名称为空",
			'ggxh' : "规格型号为空",
			'bmId' : "所属科室为空",
			'ip' : "IP地址为空",
			'protocol' : "访问协议为空"
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);// 带*为必填项
		return false;
	}
	return true;
}
// 修改设备基础信息(整理)
function updateSheBeiBaseInfo() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要修改的设备");
		return;
	}
	var table_shebei = "";// 设备table
	table_shebei += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	table_shebei += "<tr>"
			+ "<td width='10%' align='right' nowrap='nowrap'>"
			+ "设备名称"
			+ "：</td>"
			+ "<td width='22%' align='left'>"
			+ "<input type='text' name='sbmc'  id='sbmc'  onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur' />"
			+ "</td>"
			+ "<td width='1%'><span class='required'>*</span></td>"
			+ "<td width='8%' align='right' nowrap='nowrap'>"
			+ "规格型号"
			+ "：</td>"
			+ "<td width='22%' align='left'>"
			+ "<input type='text' name='ggxh'  id='ggxh'  onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur' />"
			+ "</td>"
			+ "<td width='1%'><span class='required'>*</span></td>"
			+ "<td width='8%' align='right' nowrap='nowrap'>"
			+ "所属科室"
			+ "：</td>"
			+ "<td width='22%' align='left'>"
			+ "<select name='bmId' id='bmId' onblur=\"this.className='blur'\"></select>"
			+ "</td>" + "<td width='1%'><span class='required'>*</span></td>"
			+ "<tr>";
	table_shebei += "<tr>"
			+ "<td align='right'>"
			+ "设备位置"
			+ "：</td>"
			+ "<td align='right'>"
			+ "<select name='bgsId' id='bgsId' onblur=\"this.className='blur'\"></select>"
			+ "</td>"
			+ "<td width='1%'></span></td>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "主机/IP地址"
			+ "：</td>"
			+ "<td align='right'>"
			+ "<input type='text' name='ip'  id='ip'  onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur' />"
			+ "</td>"
			+ "<td width='1%'><span class='required'>*</span></td>"
			+ "<td align='right'>"
			+ "管理用户"
			+ "：</td>"
			+
			/*---设备的管理用户多选修改baoqiang开始----*/
			"<td align='right' id='manager_names' name='manager_names'>"
			+ "<td align='left' style ='display:none'><input type='hidden' name='manageUser' id='manageUser'/>"// 隐藏域
			+ "</td>" +
			/*---设备的管理用户多选修改baoqiang结束----*/
			"<td width='1%'></td>" + "<tr>";
	table_shebei += "<tr>"
			+ "<td align='right'>"
			+ "访问协议"
			+ "：</td>"
			+ "<td align='right'>"
			+ "<select name='protocol' id='protocol' onblur=\"this.className='blur'\"></select>"
			+ "</td>"
			+ "<td width='1%'><span class='required'>*</span></td>"
			+ "<td align='right'>"
			+ "小屏幕采集"
			+ "：</td>"
			+ "<td align='right'>"
			+ "<select name='xppath' id='xppath' onblur=\"this.className='blur'\">"
			+ "</select>" + "</td>" + "<tr>";
	table_shebei += "</table>";
	var div_windowsShare = "<div style='display:block;padding-bottom:5px;' id='div_windowsShare'>";// windows共享div
	div_windowsShare += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	div_windowsShare += "<tr>"
			+ "<td width='10%' align='right' nowrap='nowrap'>"
			+ "共享名称"
			+ "：</td>"
			+ "<td width='22%' align='left'>"
			+ "<input type='text' name='smbName'  id='smbName'  onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' />"
			+ "</td>"
			+ "<td width='1%'></td>"
			+ "<td width='8%' align='right' nowrap='nowrap'>"
			+ "访问用户"
			+ "：</td>"
			+ "<td width='22%' align='left'>"
			+ "<input type='text' name='smbUser'  id='smbUser'  onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' />"
			+ "</td>"
			+ "<td width='1%'></td>"
			+ "<td width='8%' align='right' nowrap='nowrap'>"
			+ "访问密码"
			+ "：</td>"
			+ "<td width='22%' align='left'>"
			+ "<input type='password' name='smbPassword'  id='smbPassword'  onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' />"
			+ "</td>" + "<td width='1%'></td>" + "<tr>";
	div_windowsShare += "</table>";
	div_windowsShare += "<div/>";
	var hidden_id = "<input type='hidden' name='id' id='id' value=''/>";
	var form_updateSheBeiBaseInfo = oimsFormWindow({
		id : "form_updateSheBeiBaseInfo",
		dialogTitle : "修改",
		icon : "edit",
		url : contextPath + "/publish/shebei/updateSheBei.htm",
		height : 420,
		width : 780,
		method : "post",
		resetForm : reset_form_updateSheBeiBaseInfo,
		btnOkSuccess : function(data, responseText, statusText) {
			if (data.state)
				$.oimsSucc("设备信息修改成功",
						function() {
					searchShebei();
					removeDiv_openWin();
				});
			else
				$.oimsError("设备信息修改失败",
						function() {
					searchShebei();
					removeDiv_openWin();
				});
		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
			$.oimsError("设备信息修改失败",
					function() {
				searchShebei();
				removeDiv_openWin();
			});
		},
		btnOkBefor : validate_form_SheBeiBaseInfo,// validate_form_updateSheBeiBaseInfo

	});
	var hidden_online = "<input type='hidden' name='online' id='online' value=''/>";// 是否连接
	var hidden_qiyong = "<input type='hidden' name='qiyong' id='qiyong' value=''/>";// 是否启用
	var hidden_jcxmIds = "<input type='hidden' name='jcxmIds' id='jcxmIds' value=''/>";// 检查项目Ids
	form_updateSheBeiBaseInfo.append(table_shebei);// 设备表格追加
	form_updateSheBeiBaseInfo.append(div_windowsShare);// 设备表格追加
	form_updateSheBeiBaseInfo.append(hidden_id);// 隐藏域追加
	form_updateSheBeiBaseInfo.append(hidden_online);// 隐藏域追加
	form_updateSheBeiBaseInfo.append(hidden_qiyong);// 隐藏域追加
	form_updateSheBeiBaseInfo.append(hidden_jcxmIds);// 隐藏域追加
	// 所属科室
	$.each(data_shebei_bmId, function(i, shebei_bmId) {
		$(
				"<option value=\"" + shebei_bmId.id + "\">" + shebei_bmId.bmmc
						+ "</option>").appendTo("#bmId");
	});
	// 分设备访问协议
	$.each(data_shebei_protocol, function(i, shebei_protocol) {
		$(
				"<option value=\"" + shebei_protocol.categoryid + "\">"
						+ shebei_protocol.category + "</option>").appendTo(
				"#protocol");
	});
	// 小屏采集
	for ( var i = 0; i < data_shebei_xppath.length; i++)
		$(
				"<option value=\"" + data_shebei_xppath[i].value_xppath + "\">"
						+ data_shebei_xppath[i].key_xppath + "</option>")
				.appendTo("#xppath");
	multiple_shebeiUser();// 实现设备的管理用户多选
	reset_form_updateSheBeiBaseInfo();// 赋值
}
// 启用禁用设备(整理)
function enableOrDisable_SheBei_QiYong(state_qiyong) {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0 && state_qiyong) {
		$.oimsAlert("请选择需要启用的设备");
		return;
	}
	if (dataObjects.length == 1 && state_qiyong) {
		$.oimsConfirm({
			strTitle : "是否确认启用该设备",
			remove_length : true
		}, do_enable_SheBei_QiYong);

	}
	if (dataObjects.length == 0 && (!state_qiyong)) {
		$.oimsAlert("请选择需要禁用的设备");
		return;
	}
	if (dataObjects.length == 1 && (!state_qiyong)) {
		$.oimsConfirm({
			strTitle : "是否确认禁用该设备",
			remove_length : true
		}, do_Disable_SheBei_QiYong);
	}
}

// 设备启用(整理)
function do_enable_SheBei_QiYong() {
	do_enableOrDisable_SheBei_QiYong(true);
}
// 设备禁用(禁用)
function do_Disable_SheBei_QiYong() {
	do_enableOrDisable_SheBei_QiYong(false);
}

// 设备启用禁用执行(整理)
function do_enableOrDisable_SheBei_QiYong(state_qiyong) {
	var dataObjects = getCheckBoxValue();
	var url_updateSheBeiBySheBei = "/publish/shebei/updateSheBeiBySheBei.htm";
	var data = getJSONData(url_updateSheBeiBySheBei, {
		id : dataObjects[0].shebeiid,
		qiyong : state_qiyong,
		tag : Math.random()
	}, "post");
	if (data.state && state_qiyong)
		$.oimsSucc("设备启用成功", null);
	if (!data.state && state_qiyong)
		$.oimsError("设备启用失败", null);
	if (data.state && (!state_qiyong))
		$.oimsSucc("设备禁用成功", function() {
			searchShebei();
			removeDiv_openWin();
		});
	if (!data.state && (!state_qiyong))
		$.oimsError("设备禁用失败", function() {
			searchShebei();
			removeDiv_openWin();
		});
}

// 设备检查项目改变窗口(整理)
function updateJcxmsOfSheBeiDialog() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要操作的设备");
		return;
	}
	var div_opencontent_check = $("<div/>").attr("id", "div_opencontent_check")
			.attr("class", "opencontent check");
	var div_opencontent_check_html = "<p>" + "设备名称" + "：" + dataObjects[0].sbmc
			+ "</p>";
	$(div_opencontent_check_html).appendTo(div_opencontent_check);
	var div_checkdiv1 = $("<div/>").attr("id", "div_checkdiv1").attr("class",
			"checkdiv1").attr("style", "height:90px;").appendTo(
			div_opencontent_check);
	var table_jcxm = $("<table/>").attr("width", "100%").attr("border", "0")
			.attr("cellspacing", "0").attr("cellpadding", "0").appendTo(
					div_checkdiv1);
	var tr_jcxm;// 行对象
	// 检查项目集合
	$.each(data_list_jcxmobj, function(i, jcxmobj) {
		if (i % 5 == 0)
			tr_jcxm = $("<tr/>").appendTo(table_jcxm);
		var td_jcxm = $("<td align='left' />").appendTo(tr_jcxm);
		$(
				"<input type='checkbox' id='shebei_jcxmId' name='shebei_jcxmId' value='"
						+ jcxmobj.id + "'/>").appendTo(td_jcxm);
		$("<label >" + jcxmobj.xmmc + "</label><br>").appendTo(td_jcxm);
	});
	var hidden_id = $("<input type='hidden' name='id' id='id' value=''/>");// 主键隐藏域
	var hidden_jcxmIds = $("<input type='hidden' name='jcxmIds' id='jcxmIds' value=''/>");// 检查项目隐藏域
	var hidden_qiyong = $("<input type='hidden' name='qiyong' id='qiyong' value=''/>");// 启用禁用状态隐藏域
	var form_updateJcxmsOfSheBei_Jcxm = $("<form/>").attr("id",
			"form_updateJcxmsOfSheBei_Jcxm").attr("action",
			contextPath + "/publish/shebei/updateSheBeiBySheBei.htm").attr(
			"method", "post");
	$(div_opencontent_check).appendTo(form_updateJcxmsOfSheBei_Jcxm);
	$(hidden_id).appendTo(form_updateJcxmsOfSheBei_Jcxm);// 隐藏域
	$(hidden_jcxmIds).appendTo(form_updateJcxmsOfSheBei_Jcxm);// 隐藏域
	$(hidden_qiyong).appendTo(form_updateJcxmsOfSheBei_Jcxm);// 隐藏域
	$("<br/>").appendTo(form_updateJcxmsOfSheBei_Jcxm);
	var div_openbutton = $("<div/>").attr("id", "div_openbutton").attr("class",
			"openbutton").appendTo(form_updateJcxmsOfSheBei_Jcxm);// 底部div
	var div_openbutton_html = "<a href='javascript:updateJcxmsOfSheBei();'><span class='advsumit'></span>提交</a>"
			+ "<a href='javascript:rest_form_updateJcxmsOfSheBei_Jcxm();'><span class='advreset'></span>重置</a>";
	$(div_openbutton_html).appendTo(div_openbutton);
	$(form_updateJcxmsOfSheBei_Jcxm).oimsDialog({
		icon : "checkitem",
		title : "检查项目",
		width : 750,
		height : 245,
		drag : false,
		locked : true,
		winType : 4,
		button : null
	});
	// 赋值
	$("#id").val(dataObjects[0].shebeiid);
	$("#jcxmIds").val(dataObjects[0].jcxmIds);
	$("#qiyong").val(dataObjects[0].qiyong);
	var value_jcxmIds = dataObjects[0].jcxmIds;
	if (value_jcxmIds != null && value_jcxmIds != "") {
		var array_jcxmIds = new Array();// 定义一个数组
		array_jcxmIds = value_jcxmIds.split(","); // 字符分割
		for ( var i = 0; i < array_jcxmIds.length; i++)
			checkedCheckBoxByValue("shebei_jcxmId", array_jcxmIds[i]);
	}
}

// 设备检查项目操作(整理)
function updateJcxmsOfSheBei() {
	var object_check_shebei_jcxmId = document
			.getElementsByName('shebei_jcxmId');
	var jcxmIds = "";
	for ( var i = 0; i < object_check_shebei_jcxmId.length; i++) {
		if (object_check_shebei_jcxmId[i].checked == true)
			jcxmIds += object_check_shebei_jcxmId[i].value + ",";
	}
	if (jcxmIds != "")// 截取去掉后面的“,”
		jcxmIds = jcxmIds.substring(0, jcxmIds.lastIndexOf(","));
	$("#jcxmIds").val(jcxmIds);
	$("#form_updateJcxmsOfSheBei_Jcxm").ajaxForm(
			{
				dataType : 'json',
				success : function(data) {
					if (data.state)
						$.oimsSucc("设备检查项目信息配置成功",
								function() {
							searchShebei();
							removeDiv_openWin();
						});
					else
						$.oimsError("设备检查项目信息配置失败",
								function() {
							searchShebei();
							removeDiv_openWin();
						});
				}
			});
	$("#form_updateJcxmsOfSheBei_Jcxm").submit();
}

// 所属科室onchange事件(整理)
function change_shebei_bmId() {
	if ($("#bgsId")[0].options)
		$("#bgsId")[0].options.length = 0;// 清空设备位置下拉框
	var value_shebei_bmId = $("#bmId option:selected").val();// 访问协议
	var url_findAllBanGongShiByBuMenID = "/publish/bangongshi/findAllBanGongShiByBuMenID.htm";// 查询所有办公室信息（根据科室信息）
	var data_obj_findAllBanGongShiByBuMenID = getJSONData(
			url_findAllBanGongShiByBuMenID, {
				id : value_shebei_bmId,
				tag : Math.random()
			}, "post").obj;
	// 设备位置下拉框
	if (data_obj_findAllBanGongShiByBuMenID != null) {
		$.each(data_obj_findAllBanGongShiByBuMenID, function(i, bangongshi) {
			$(
					"<option value=\"" + bangongshi.id + "\">" + bangongshi.bgs
							+ "</option>").appendTo("#bgsId");
		});
	}
	multiple_shebeiUser();
}

// 访问协议onchange事件(整理)
function change_shebei_protocol() {
	// 相当于数组
	var value_shebei_protocol = $("#protocol")[0][$("#protocol")[0].selectedIndex].value;// 访问协议
	if (value_shebei_protocol == decide_protocol_windowsShare)// 访问协议为Windows共享
	{
		$("#smbName").val("");// 共享名称
		$("#smbUser").val("");// 访问用户
		$("#smbPassword").val("");// 访问密码
		$("#div_windowsShare")[0].style.visibility = 'visible';
	} else
		$("#div_windowsShare")[0].style.visibility = 'hidden';
}

// 设备基本信息添加表单(整理)
function reset_form_saveSheBeiBaseInfo() {
	$("#sbmc").val("");// 设备名称
	$("#ggxh").val("");// 规格型号
	selectItemByValue("bmId", data_shebei_bmId[0].id);// 所属科室
	change_shebei_bmId();// 设备位置下拉框获取数据胡方法
	$("#ip").val("");// 主机名/IP
	selectItemByValue("protocol", data_shebei_protocol[0].categoryid);// 访问协议
	change_shebei_protocol();// 访问协议onchange事件
	$("#smbName").val("");// 共享名称
	$("#smbUser").val("");// 访问用户
	$("#smbPassword").val("");// 访问密码
	selectItemByValue("xppath", data_shebei_xppath[0].value_xppath);// 小屏采集
}

// 重置 设备基本信息修改表单(整理)
function reset_form_updateSheBeiBaseInfo() {
	var dataObjects = getCheckBoxValue();
	// 赋值
	$("#id").val(dataObjects[0].shebeiid);// 设备ID
	$("#sbmc").val(dataObjects[0].sbmc);// 设备名称
	$("#ggxh").val(dataObjects[0].ggxh);// 规格型号
	selectItemByValue("bmId", dataObjects[0].bmId);// 所属科室
	change_shebei_bmId();// 设备位置下拉框获取数据胡方法
	$("#bmId").change(change_shebei_bmId);// bmId绑定change方法
	selectItemByValue("bgsId", dataObjects[0].bgsId);// 设备位置
	$("#ip").val(dataObjects[0].ip);// 主机名/IP
	selectItemByValue("protocol", dataObjects[0].protocol);// 访问协议
	change_shebei_protocol();
	$("#manageUser").val(dataObjects[0].manageUser);
	$("#protocol").change(change_shebei_protocol);// protocol绑定change方法
	$("#smbName").val(dataObjects[0].smbName);// 共享名称
	$("#smbUser").val(dataObjects[0].smbUser);// 访问用户
	$("#smbPassword").val(dataObjects[0].smbPassword);// 访问密码
	$("#online").val(dataObjects[0].online);// 连接状态
	$("#qiyong").val(dataObjects[0].qiyong);// 启用状态
	$("#jcxmIds").val(dataObjects[0].jcxmIds);// 检查项目
	$("#xppath").val(dataObjects[0].xppath);// 小屏采集
	/*----宝强修改设备多选用户开始-----*/
	var string_users = "";
	var data = getJSONData("/publish/shebei/getSheBeiUsersByShebei.htm", {
		shebei_users : dataObjects[0].manageUser
	}, "post");
	if (data.state) {
		for ( var i = 0; i < data.obj.length; i++) {
			if (i + 1 == data.obj.length) {
				if (data.obj[i] != null)
					string_users += data.obj[i].xingming;
			} else
				string_users += data.obj[i].xingming + ",";
		}
		$("#shebeiUsers").val(string_users);
	}
	/*----宝强修改设备多选用户结束-----*/
}

function rest_form_updateJcxmsOfSheBei_Jcxm() {
	$("[name = shebei_jcxmId]:checkbox").attr("checked", false);
	var dataObjects = getCheckBoxValue();
	// 赋值
	$("#id").val(dataObjects[0].shebeiid);
	$("#jcxmIds").val(dataObjects[0].jcxmIds);
	$("#qiyong").val(dataObjects[0].qiyong);
	var value_jcxmIds = dataObjects[0].jcxmIds;
	if (value_jcxmIds != null && value_jcxmIds != "") {
		var array_jcxmIds = new Array();// 定义一个数组
		array_jcxmIds = value_jcxmIds.split(","); // 字符分割
		for ( var i = 0; i < array_jcxmIds.length; i++)
			checkedCheckBoxByValue("shebei_jcxmId", array_jcxmIds[i]);
	}
}

// 查询条件（searchShebei） (整理)
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