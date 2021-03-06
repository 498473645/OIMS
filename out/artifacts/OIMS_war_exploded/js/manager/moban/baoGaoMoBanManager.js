var data_BaoGaoMoBan_jibie;// 级别下拉框data
var data_BaoGaoMoBan_bumenId;// 所属科室下拉框data
var data_BaoGaoMoBan_baoGaoMoBanIds;// 模板复用下拉框data
var ckeditorObject;// ckeditor对象
var old_dataObjects;// 修改重置方法需要用到
var btns_baoGaoMoBan;
var toolbar = [ // 加粗 斜体， 下划线 穿过线 下标字 上标字
[ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript' ],
// 数字列表 实体列表 减小缩进 增大缩进
[ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent' ],
// 左对齐 居中对齐 右对齐 两端对齐
[ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ],
// 超链接 取消超链接 锚点
[ 'Link', 'Unlink', 'Anchor' ],
// 图片 flash 表格 水平线 表情 特殊字符 分页符
[ 'Table', 'Smiley', 'SpecialChar', 'PageBreak' ], '/',
// 样式 格式 字体 字体大小
[ 'Styles', 'Format', 'Font', 'FontSize' ],
// 文本颜色 背景颜色
[ 'TextColor', 'BGColor' ],
// 全屏 显示区块
[ 'Maximize', 'ShowBlocks', '-' ] ];

/*
 * 梁建业 添加引用css和js
 */
function initCssAndJs_baoGaoMoBan() {
	importJS("/js/jquery.customfile.js");
	importJS("/ckeditor/ckeditor.js");
}
// 报告模板首次调用的方法(整理)
function ready_BaoGaoMoBan(btns) {
	btns_baoGaoMoBan = btns;
	pageTitle = "报告模板";// 报告模板
	initCssAndJs_baoGaoMoBan();
	init();   //清空右侧的DIV
	var div_advquery = $("<div/>").attr("id", "div_advquery").attr("class",
			"advquery").appendTo("#right");
	var table_advquery = "";
	table_advquery += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	table_advquery += "<tr>"
			+ "<td width='23%' class='leftalign' >"
			+ "<input name='search_biaoti' type='text' class='blurview' id='search_biaoti' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"
			+ "请输入报告模板标题"// 请输入报告模板标题
			+ "' size='28' />"
			+ "</td>"
			+ "<td width='9%'><a href='javascript:searchBaogaoMoban();' class='search'>"
			+ "查询"// 查询
			+ "</a></td>"
			+ "<td width='59%'>"
			+ "<div class='btn'>"
			+ "<a onclick='return false;' href='javascript:openDialog_saveBaogaoMoban();'><span class='adda'></span>"
			+ "新增"// 新增
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:openDialog_updateBaogaoMoban();'><span class='edita'></span>"
			+ "修改"// 修改
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:delBaogaoMoban();'><span class='dela'></span>"
			+ "删除"// 删除
			+ "</a>" + "</div>" + "</td>" + "</tr>";
	table_advquery += "</table>";
	$(table_advquery).appendTo(div_advquery);
	btnProwerConfig(btns);// 按钮加上权限
	showBaoGaoMoBanList();// 显示报告模板列表
	initialData_BaoGaoMoBan();// 初始化报告模板模块必须的数据
	$("#search_biaoti").click(function() {
		clearInitQuery(this);
	});// 点击输入框清空字体
	$("#search_biaoti").blur(function() {
		if (this.value == "") {
			$("#search_biaoti").val("请输入报告模板标题");// 请输入报告模板标题
			$("#search_biaoti").addClass("blurview");
		}
	});
	$("#search_biaoti").bind("keyup", function(e) {
		if (e.which == 13) {
			searchBaogaoMoban();
		}
	});
}

// 刷新列表(整理)
function renovate_BaoGaoMoBan() {
	pageTitle = "报告模板";
	initCssAndJs_baoGaoMoBan();
	init();
	var div_advquery = $("<div/>").attr("id", "div_advquery").attr("class",
			"advquery").appendTo("#right");
	var table_advquery = "";
	table_advquery += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	table_advquery += "<tr>"
			+ "<td width='23%' class='leftalign' >"
			+ "<input name='search_biaoti' type='text' class='blurview' id='search_biaoti' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"
			+ "请输入报告模板标题"// 请输入报告模板标题
			+ "' size='28' />"
			+ "</td>"
			+ "<td width='9%'><a href='javascript:searchBaogaoMoban();' class='search'>"
			+ "查询"// 查询
			+ "</a></td>"
			+ "<td width='59%'>"
			+ "<div class='btn'>"
			+ "<a onclick='return false;' href='javascript:openDialog_saveBaogaoMoban();'><span class='adda'></span>"
			+ "新增"// 新增
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:openDialog_updateBaogaoMoban();'><span class='edita'></span>"
			+ "修改"// 修改
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:delBaogaoMoban();'><span class='dela'></span>"
			+ "删除" // 删除
			+ "</a>" + "</div>" + "</td>" + "</tr>";
	table_advquery += "</table>";
	$(table_advquery).appendTo(div_advquery);
	btnProwerConfig(btns_baoGaoMoBan);// 按钮加上权限
	showBaoGaoMoBanList();// 显示报告模板列表
	initialData_BaoGaoMoBan();// 初始化报告模板模块必须的数据
	$("#search_biaoti").click(function() {
		clearInitQuery(this);
	});// 点击输入框清空字体
	$("#search_biaoti").blur(function() {
		if (this.value == "") {
			$("#search_biaoti").val("请输入报告模板标题");// 请输入报告模板标题
			$("#search_biaoti").addClass("blurview");
		}
	});
	$("#search_biaoti").bind("keyup", function(e) {
		if (e.which == 13) {
			searchBaogaoMoban();
		}
	});
}
/*
 * 梁建业 初始化下拉框的data
 */
function initialData_BaoGaoMoBan() {
	var url_findAllBuMen = "/publish/bumen/findAllBuMen.htm";// 查询所有部门
	var url_findCategorysByFatherId = "/publish/category/findCategorysByFatherId.htm";// 根据fatherid查询该fatherid下所有的码表信息
	var url_findAllBaogaoMobans = "/publish/baogaomoban/findAllBaogaoMobans.htm";// 查询所有报告模板信息
	data_BaoGaoMoBan_jibie = getJSONData(url_findCategorysByFatherId, {
		fatherid : oimsCategory.BAOGAOMOBAN_JIBIE,
		tag : Math.random()
	}, "post").obj;
	data_BaoGaoMoBan_bumenId = getJSONData(url_findAllBuMen, {
		tag : Math.random()
	}, "post").obj;
	data_BaoGaoMoBan_baoGaoMoBanIds = getJSONData(url_findAllBaogaoMobans, {
		tag : Math.random()
	}, "post").obj;
}

// 弹出新增报告模版窗口(整理)
function openDialog_saveBaogaoMoban() {
	$("#right").html("");// 清空中部div
	var table_BaoGaoMoBan = "";// 报告模板表格
	table_BaoGaoMoBan += "<table width='98%' border='0' cellspacing='0' cellpadding='0' class=' templatetable'>";
	table_BaoGaoMoBan += "<tr>"
			+ "<td width='8%' align='right' nowrap>"
			+ "标题"// 标题
			+ "：</td>"
			+ "<td width='22%'>"
			+ "<input type='text' name='biaoti' size='20' id='biaoti' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' />"
			+ "</td>"
			+ "<td width='1%'><span class='required'>*</span></td>"
			+ // 必填提示
			"<td width='9%' align='right' nowrap>"
			+ "报告路径"// 报告路径
			+ "：</td>"
			+ "<td width='18%' id='td_url_moban'>"
			+ "<div class='searchfile'>"
			+ "<input type='file' name='url_moban' id ='url_moban' class='filed'  onChange='onChange_form_saveBaogaoMoban_UrlMoBan();'/>"
			+ "<div class='fieldstyle'><input type='text' name='txt_fieldstyle' id='txt_fieldstyle' class='fieldtext'/></div>"
			+ "<div class='buttonstyle'><input type='button'  id='btn_yuyan' class='fieldbutton'/></div>"
			+ "</div>"
			+ "</td>"
			+ "<td width='1%'></td>"
			+ "<td width='9%' align='right' nowrap>"
			+ "级别"// 级别
			+ "：</td>"
			+ "<td width='12%'>"
			+ "<select name='jibie' id='jibie' onblur=\"this.className='blur'\"></select>"
			+ "</td>" + "<td width='1%'><span class='required'>*</span></td>" + // 必填提示
			"<tr>";
	table_BaoGaoMoBan += "<tr>"
			+ "<td align='right' nowrap>"
			+ "模板复用"// 模板复用
			+ "：</td>"
			+ "<td>"
			+ "<select name='selectMoban' id='selectMoban' onblur=\"this.className='blur'\"><option value=''></option></select>"
			+ "</td>"
			+ "<td width='1%'></td>"
			+ "<td align='right' nowrap>"
			+ "所属科室"// 所属科室
			+ "：</td>"
			+ "<td>"
			+ "<select name='bumenId' id='bumenId' onblur=\"this.className='blur'\"></select>"
			+ "</td>"
			+ "<td width='1%'><span class='required'>*</span></td>"
			+ // 必填提示
			"<td align='right' nowrap>"
			+ "检查项目"// 检查项目
			+ "：</td>"
			+ "<td>"
			+ "<select name='jcxmIds' id='jcxmIds' onblur=\"this.className='blur'\"></select>"
			+ "</td>" + "<td width='1%'><span class='required'>*</span></td>" + // 必填提示
			"<tr>";
	table_BaoGaoMoBan += "<tr>"
			+ "<td align='right' valign='top' nowrap>"
			+ "模板内容"// 模板内容
			+ "：</td>"
			+ "<td colspan='7'>"
			+ "<textarea name='moban' id='moban' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' id='textarea' cols='45' rows='20'></textarea>"
			+ "</td>" + "<td width='1%'><span class='required'>*</span></td>" + // 必填提示
			"<tr>";
	table_BaoGaoMoBan += "</table>";
	var hidden_url = "<input type='hidden' name='url' id='url' vlaue=''/>";// 路径隐藏域
	var div_title = $("<div/>").attr("id", "div_title").attr("class", "title")
			.appendTo("#right");// 头部div
	var div_title_html = "<div class='titleT'><span class='title1'></span>"
			+ "新增" + "</div>";
	$(div_title_html).appendTo(div_title);// 头部div的内容追加
	var div_template = $("<div/>").attr("id", "div_template").attr("class",
			"template").appendTo("#right");// 中部div
	var form_saveBaogaoMoban = $("<form/>").attr("id", "form_saveBaogaoMoban")
			.attr("action",
					contextPath + "/publish/baogaomoban/saveBaogaoMoban.htm")
			.attr("enctype", "multipart/form-data").attr("method", "post")
			.appendTo("body");
	$(table_BaoGaoMoBan).appendTo(form_saveBaogaoMoban);
	$(hidden_url).appendTo(form_saveBaogaoMoban);
	var div_buttonsytle = $("<div/>").attr("id", "div_buttonsytle").attr(
			"class", "buttonsytle").appendTo(form_saveBaogaoMoban);
	var div_buttonsytle_html = "<a href='javascript:saveBaogaoMoban();'><span class='advsumit'></span>"
			+ "提交"
			+ "</a><a href='javascript:reset_form_saveBaogaoMoban();'><span class='advreset'></span>"
			+ "重置" + "</a>";
	$(div_buttonsytle_html).appendTo(div_buttonsytle);
	// 级别下拉框数据
	$.each(data_BaoGaoMoBan_jibie, function(i, jibie) {
		$(
				"<option value=\"" + jibie.categoryid + "\">" + jibie.intr
						+ "</option>").appendTo("#jibie");
	});
	// 模板复用下拉框数据
	$.each(data_BaoGaoMoBan_baoGaoMoBanIds, function(i, baogaomoban) {
		$(
				"<option value=\"" + baogaomoban.id + "\">"
						+ baogaomoban.biaoti + "</option>").appendTo(
				"#selectMoban");
	});
	// 所属科室下拉框数据
	$.each(data_BaoGaoMoBan_bumenId, function(i, bumen) {
		$("<option value=\"" + bumen.id + "\">" + bumen.bmmc + "</option>")
				.appendTo("#bumenId");
	});
	onChange_bumenId();
	$("#bumenId").change(onChange_bumenId);
	// 模板复选change事件
	$("#selectMoban").change(function() {
		change_selectMoban(this);
	});
	if (ckeditorObject)// ckeditorObject存在则删除该对象
		CKEDITOR.remove(ckeditorObject);
	ckeditorObject = CKEDITOR.replace('moban', {
//		toolbar : toolbar,
		height : 700
	});
	// 设置CKEDITOR宽度高度等属性
	$(form_saveBaogaoMoban).appendTo(div_template);// 中部div追加内容
	$("#biaoti")[0].focus();// 鼠标焦点事件
	$.customfile('fieldbutton', 'filed', 'fieldtext');
}
// 新增报告模版(整理)
function saveBaogaoMoban() {
	$("#biaoti").val(jQuery.trim($("#biaoti").val()));// 标题
	var value_baoGaoMoBan_biaoti = $("#biaoti").val();// 标题
	var value_jcxmIds = $("#jcxmIds").val();// 检查项目
	var regulation_null = "^[^ ]+$";// 非空验证
	var validate_null = new RegExp(regulation_null);
	if (!validate_null.test(value_baoGaoMoBan_biaoti))// 标题
	{
		$.oimsAlert("报告模板标题为空", function() {
			$("#biaoti").focus();
		});
		return;
	}
	if (value_jcxmIds == null || value_jcxmIds == "")// 检查项目
	{
		$.oimsAlert("检查项目为空", function() {
			$("#jcxmIds").focus();
		});
		return;
	}
	$("#moban").val(ckeditorObject.document.getBody().getHtml()); // 取得html文本
	$("#form_saveBaogaoMoban").ajaxForm(
			{
				beforeSend : function() {
				},
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
						$.oimsSucc("报告模板信息新增成功", function() {
							renovate_BaoGaoMoBan();
							removeDiv_openWin();
						});
					else
						$.oimsError("报告模板信息新增失败", function() {
							renovate_BaoGaoMoBan();
							removeDiv_openWin();
						});
				}
			});
	$("#form_saveBaogaoMoban").submit();
}

// 报告模版删除(整理)
function delBaogaoMoban() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要删除的报告模板");
		return;
	}
	$.oimsConfirm({
		strTitle : "确认删除该报告模板信息",
		remove_length : true
	}, doDelBaogaoMoban);
}

// 执行报告模版删除操作(整理)
function doDelBaogaoMoban() {
	var dataObjects = getCheckBoxValue();
	var url_delBaogaoMoban = "/publish/baogaomoban/delBaogaoMoban.htm";
	var data = getJSONData(url_delBaogaoMoban, {
		id : dataObjects[0].baogaomobanid,
		tag : Math.random()
	}, "post");
	if (data.state)
		$.oimsSucc("报告模板信息删除成功", function() {
			renovate_BaoGaoMoBan();
			removeDiv_openWin();
		});
	else
		$.oimsError("报告模板信息删除失败", function() {
			renovate_BaoGaoMoBan();
			removeDiv_openWin();
		});
}
// 报告模版修改弹出窗口(整理)
function openDialog_updateBaogaoMoban() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要修改的报告模板");
		return;
	}
	old_dataObjects = dataObjects;// 主要是重置赋值用到
	$("#right").html("");// 清空中部div
	var table_BaoGaoMoBan = "";// 报告模板表格
	table_BaoGaoMoBan += "<table width='98%' border='0' cellspacing='0' cellpadding='0' class=' templatetable'>";
	table_BaoGaoMoBan += "<tr>"
			+ "<td width='8%' align='right' nowrap>"
			+ "标题"// 标题
			+ "：</td>"
			+ "<td width='22%'>"
			+ "<input type='text' name='biaoti' size='20' id='biaoti' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' />"
			+ "</td>"
			+ "<td width='1%'><span class='required'>*</span></td>"
			+ // 必填提示
			"<td width='9%' align='right' nowrap>"
			+ "报告路径"// 报告路径
			+ "：</td>"
			+ "<td width='18%' id='td_url_moban'>"
			+ "<div class='searchfile'>"
			+ "<input type='file' name='url_moban' id ='url_moban' class='filed'  onChange='onChange_form_updateBaogaoMoban_UrlMoBan();'/>"
			+ "<div class='fieldstyle'><input type='text' name='txt_fieldstyle' id='txt_fieldstyle' class='fieldtext'/></div>"
			+ "<div class='buttonstyle'><input type='button'  id='btn_yuyan' class='fieldbutton'/></div>"
			+ "</div>"
			+ "</td>"
			+ "<td width='1%'></td>"
			+ "<td width='9%' align='right' nowrap>"
			+ "级别"// 级别
			+ "：</td>"
			+ "<td width='12%'>"
			+ "<select name='jibie' id='jibie' onblur=\"this.className='blur'\"></select>"
			+ "</td>" + "<td width='1%'><span class='required'>*</span></td>" + // 必填提示
			"<tr>";
	table_BaoGaoMoBan += "<tr>"
			+ "<td align='right' nowrap>"
			+ "模板复用"// 模板复用
			+ "：</td>"
			+ "<td>"
			+ "<select name='selectMoban' id='selectMoban' onblur=\"this.className='blur'\"><option value=''></option></select>"
			+ "</td>"
			+ "<td width='1%'></td>"
			+ "<td align='right' nowrap>"
			+ "所属科室"// 所属科室
			+ "：</td>"
			+ "<td>"
			+ "<select name='bumenId' id='bumenId' onblur=\"this.className='blur'\"></select>"
			+ "</td>"
			+ "<td width='1%'><span class='required'>*</span></td>"
			+ // 必填提示
			"<td align='right' nowrap>"
			+ "检查项目"// 检查项目
			+ "：</td>"
			+ "<td>"
			+ "<select name='jcxmIds' id='jcxmIds' onblur=\"this.className='blur'\"></select>"
			+ "</td>" + "<td width='1%'><span class='required'>*</span></td>" + // 必填提示
			"<tr>";
	table_BaoGaoMoBan += "<tr>"
			+ "<td align='right' valign='top' nowrap>"
			+ "模板内容"// 模板内容
			+ "：</td>"
			+ "<td colspan='7'>"
			+ "<textarea name='moban' id='moban' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' id='textarea' cols='45' rows='20'></textarea>"
			+ "</td>" + "<td width='1%'><span class='required'>*</span></td>" + // 必填提示
			"<tr>";
	table_BaoGaoMoBan += "</table>";
	var hidden_url = "<input type='hidden' name='url' id='url' vlaue=''/>";// 路径隐藏域
	var div_title = $("<div/>").attr("id", "div_title").attr("class", "title")
			.appendTo("#right");// 头部div
	var div_title_html = "<div class='titleT'><span class='title1'></span>"
			+ "修改" + "</div>";
	$(div_title_html).appendTo(div_title);// 头部div的内容追加
	var div_template = $("<div/>").attr("id", "div_template").attr("class",
			"template").appendTo("#right");// 中部div
	var form_updateBaogaoMoban = $("<form/>").attr("id",
			"form_updateBaogaoMoban").attr("action",
			contextPath + "/publish/baogaomoban/updateBaogaoMoban.htm").attr(
			"enctype", "multipart/form-data").attr("method", "post").appendTo(
			div_template);
	var hidden_baogaomobanid = "<input type='hidden' name='id' id='id' value='-1'/>";// 隐藏域
	$(table_BaoGaoMoBan).appendTo(form_updateBaogaoMoban);// 报告模板表格追加到表单
	$(hidden_baogaomobanid).appendTo(form_updateBaogaoMoban);// 隐藏域追加到表单
	$(hidden_url).appendTo(form_updateBaogaoMoban);
	var div_buttonsytle = $("<div/>").attr("id", "div_buttonsytle").attr(
			"class", "buttonsytle").appendTo(form_updateBaogaoMoban);
	var div_buttonsytle_html = "<a href='javascript:updateBaogaoMoban();'><span class='advsumit'></span>修改</a><a href='javascript:reset_form_updateBaogaoMoBan();'><span class='advreset'></span>重置</a>";
	$(div_buttonsytle_html).appendTo(div_buttonsytle);
	// 级别下拉框数据
	$.each(data_BaoGaoMoBan_jibie, function(i, jibie) {
		$(
				"<option value=\"" + jibie.categoryid + "\">" + jibie.intr
						+ "</option>").appendTo("#jibie");
	});
	// 模板复用下拉框数据
	$.each(data_BaoGaoMoBan_baoGaoMoBanIds, function(i, baogaomoban) {
		$(
				"<option value=\"" + baogaomoban.id + "\">"
						+ baogaomoban.biaoti + "</option>").appendTo(
				"#selectMoban");
	});
	// 所属科室下拉框数据
	$.each(data_BaoGaoMoBan_bumenId, function(i, bumen) {
		$("<option value=\"" + bumen.id + "\">" + bumen.bmmc + "</option>")
				.appendTo("#bumenId");
	});
	$("#bumenId").change(onChange_bumenId);// 所属科室下拉框绑定change事件
	// 模板复选change事件
	$("#selectMoban").change(function() {
		change_selectMoban(this);
	});
	if (ckeditorObject)// ckeditorObject存在则删除该对象
		CKEDITOR.remove(ckeditorObject);
	ckeditorObject = CKEDITOR.replace('moban', {
//		toolbar : toolbar,
		height : 700
	});
	$.customfile('fieldbutton', 'filed', 'fieldtext');
	// 赋值
	$("#id").val(dataObjects[0].baogaomobanid);// 报告模板ID
	$("#biaoti").val(dataObjects[0].biaoti);// 报告模板标题
	selectItemByValue("jibie", dataObjects[0].jibie);// 级别
	selectItemByValue("bumenId", dataObjects[0].bumenId);// 所属科室
	onChange_bumenId();// 检查项目下拉框赋值
	selectItemByValue("jcxmIds", dataObjects[0].jcxmids);// 检查项目
	ckeditorObject.setData((dataObjects[0].moban));// 模板内容
	$("#url").val(dataObjects[0].url);// 路径
	$("#biaoti")[0].focus();// 鼠标焦点事件
}

// 报告模版修改(整理)
function updateBaogaoMoban() {
	$("#biaoti").val(jQuery.trim($("#biaoti").val()));// 标题
	var value_baoGaoMoBan_biaoti = $("#biaoti").val();// 标题
	var value_jcxmIds = $("#jcxmIds").val();// 检查项目
	var regulation_null = "^[^ ]+$";// 非空验证
	var validate_null = new RegExp(regulation_null);
	if (!validate_null.test(value_baoGaoMoBan_biaoti))// 标题
	{
		$.oimsAlert("报告模板标题为空", function() {
			$("#biaoti").focus();
		});
		return;
	}
	if (value_jcxmIds == null || value_jcxmIds == "")// 检查项目
	{
		$.oimsAlert("检查项目信息为空", function() {
			$("#jcxmIds").focus();
		});
		return;
	}
	$("#moban").val(ckeditorObject.document.getBody().getHtml()); // 取得html文本
	$("#form_updateBaogaoMoban").ajaxForm(
			{
				beforeSend : function() {
				},
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
						$.oimsSucc("报告模板信息修改成功", function() {
							renovate_BaoGaoMoBan();
							removeDiv_openWin();
						});
					else
						$.oimsError("报告模板信息修改失败", function() {
							renovate_BaoGaoMoBan();
							removeDiv_openWin();
						});
				}
			});
	$("#form_updateBaogaoMoban").submit();
}
// 报告模版列表(整理)
function showBaoGaoMoBanList() {
	pageTitle = "报告模板";
	listFactor = {
		listObj : [ {
			title : "序号",// 序号
			key : "baogaomobanid"
		}, {
			title : "标题",// 标题
			key : "biaoti"
		}, {
			title : "检查项目",// 检查项目
			key : "xmmc"
		}, {
			title : "所属科室",// 所属科室
			key : "bmmc"
		}, {
			title : "级别",// 级别
			key : "jibieName"
		}, {
			title : "操作人",// 操作人
			key : "xingming"
		} ],
		manageMenu : null,
		url : contextPath
				+ "/publish/baogaomoban/findAllBaogaoMobansByPage.htm",
		checkbox : true,
		method : "post",
		single : true,
		data : {
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			tag : Math.random()
		}
	};
	var div_list = $("<div/>").attr("id", "div_list").attr("class", "list")
			.appendTo("#right");
	$(div_list).createPageList(listFactor);
}

/*
 * 梁建业 选中指定值
 */
function selectItemByValue(selectId, selectValue) {
	var objSelect = $("#" + selectId)[0];
	for ( var i = 0; i < objSelect.options.length; i++) {
		if (objSelect.options[i].value == selectValue) {
			objSelect.options[i].selected = true;
			break;
		}
	}
}
/*
 * 梁建业 url改变的方法
 */
function onChange_form_updateBaogaoMoban_UrlMoBan() {
	$("#form_updateBaogaoMoban")[0].action = contextPath
			+ "/publish/baogaomoban/upLoadBaogaoMoban.htm";
	$("#form_updateBaogaoMoban")
			.ajaxForm(
					{
						beforeSend : function() {
						},
						uploadProgress : function() {
						},
						complete : function(data_Result) {
							$("#form_updateBaogaoMoban")[0].action = contextPath
									+ "/publish/baogaomoban/updateBaogaoMoban.htm";
							var data_pre = data_Result.responseText;
							var data_string = "";
							if (data_pre.indexOf("</pre") == -1)
								data_string = data_pre;
							else
								data_string = data_pre.substring(data_pre
										.indexOf("{"), data_pre
										.indexOf("</pre"));
							var data_Obj = eval("(" + data_string + ")");
							var state = data_Obj.state;
							if (state) {
								$("#url").val(data_Obj.obj);
								var url_openBaogaoMobanRarOfUpLoad = "/publish/baogaomoban/openBaogaoMobanRarOfUpLoad.htm";// 打开上传报告模版rar
								data_obj_openBaogaoMobanRarOfUpLoad = getJSONData(
										url_openBaogaoMobanRarOfUpLoad, {
											path_inZip : data_Obj.obj,
											tag : Math.random()
										}, "post").obj;
								ckeditorObject
										.setData(data_obj_openBaogaoMobanRarOfUpLoad);
							} else
								$.oimsError("报告模板上传失败", function() {
									renovate_BaoGaoMoBan();
									removeDiv_openWin();
								});
						}
					});
	$("#form_updateBaogaoMoban").submit();
}

/*
 * 梁建业 url改变的方法
 */
function onChange_form_saveBaogaoMoban_UrlMoBan() {
	$("#form_saveBaogaoMoban")[0].action = contextPath
			+ "/publish/baogaomoban/upLoadBaogaoMoban.htm";
	$("#form_saveBaogaoMoban")
			.ajaxForm(
					{
						beforeSend : function() {
						},
						uploadProgress : function() {
						},
						complete : function(data_Result) {
							$("#form_saveBaogaoMoban")[0].action = contextPath
									+ "/publish/baogaomoban/saveBaogaoMoban.htm";
							var data_pre = data_Result.responseText;
							var data_string = "";
							if (data_pre.indexOf("</pre") == -1)
								data_string = data_pre;
							else
								data_string = data_pre.substring(data_pre
										.indexOf("{"), data_pre
										.indexOf("</pre"));
							var data_Obj = eval("(" + data_string + ")");
							var state = data_Obj.state;
							if (state) {
								$("#url").val(data_Obj.obj);
								var url_openBaogaoMobanRarOfUpLoad = "/publish/baogaomoban/openBaogaoMobanRarOfUpLoad.htm";// 打开上传报告模版rar
								data_obj_openBaogaoMobanRarOfUpLoad = getJSONData(
										url_openBaogaoMobanRarOfUpLoad, {
											path_inZip : data_Obj.obj,
											tag : Math.random()
										}, "post").obj;
								ckeditorObject
										.setData(data_obj_openBaogaoMobanRarOfUpLoad);
							} else
								$.oimsError("报告模板上传失败", function() {
									renovate_BaoGaoMoBan();
									removeDiv_openWin();
								});
						}
					});
	$("#form_saveBaogaoMoban").submit();
}

// 重置-报告模板新增(整理)
function reset_form_saveBaogaoMoban() {
	$("#biaoti").val("");// 标题
	$("#url_moban").remove(); // 移除报告路径
	var obj_url_moban = $("<input/>").attr("name", "url_moban").attr("id",
			"url_moban").attr("type", "file").attr("class", "filed").appendTo(
			".searchfile");
	obj_url_moban.change(onChange_form_saveBaogaoMoban_UrlMoBan);
	$("#txt_fieldstyle").val("");
	$.customfile('fieldbutton', 'filed', 'fieldtext');
	selectItemByValue("jibie", data_BaoGaoMoBan_jibie[0].categoryid);// 级别
	selectItemByValue("selectMoban", "");// 模板重用
	selectItemByValue("bumenId", data_BaoGaoMoBan_bumenId[0].id);// 所属科室
	onChange_bumenId();// 检查项目下拉框赋值
	$("#moban").val(""); // 模板内容
	ckeditorObject.setData("");// ckeditor对象内容设置
}

// 重置-报告模板修改(整理)
function reset_form_updateBaogaoMoBan() {
	// 赋值
	$("#url_moban").remove(); // 移除报告路径
	var obj_url_moban = $("<input/>").attr("name", "url_moban").attr("id",
			"url_moban").attr("type", "file").attr("class", "filed").appendTo(
			".searchfile");
	obj_url_moban.change(onChange_form_updateBaogaoMoban_UrlMoBan);
	$("#txt_fieldstyle").val("");
	$.customfile('fieldbutton', 'filed', 'fieldtext');
	$("#id").val(old_dataObjects[0].baogaomobanid);// 隐藏的ID
	$("#biaoti").val(old_dataObjects[0].biaoti);// 模板标题
	selectItemByValue("jibie", old_dataObjects[0].jibie);// 级别
	selectItemByValue("selectMoban", "");// 模板重用
	selectItemByValue("bumenId", old_dataObjects[0].bumenId);// 所属科室
	onChange_bumenId();// 检查项目下拉框赋值
	selectItemByValue("jcxmIds", old_dataObjects[0].jcxmids);// 检查项目
	ckeditorObject.setData((old_dataObjects[0].moban));// 模板内容
}

// 模板复用 change事件(整理)
function change_selectMoban(object_select) {
	var baoGaoMoBanid = object_select.value;
	if (baoGaoMoBanid == "") {
		ckeditorObject.setData("");
		return;
	}
	var url_getBaogaoMobanById = "/publish/baogaomoban/getBaogaoMobanById.htm";
	data_obj_getBaogaoMobanById = getJSONData(url_getBaogaoMobanById, {
		id : baoGaoMoBanid,
		tag : Math.random()
	}, "post").obj;
	ckeditorObject.setData(data_obj_getBaogaoMobanById.moban);
}
// change 部门ID(整理)
function onChange_bumenId() {

//	 alert("change 部门ID(整理)");
	$("#jcxmIds")[0].options.length = 0;// 清空检查项目下拉框
//	var value_bumenId = $("#bumenId option:selected").val();// 所属科室
//	var url_findJcxmsByBmId = "/publish/jcxm/findJcxmsByBmId.htm";// 根据部门ID，查询该部门下所有可以做的检查项目
//	var data_obj_findJcxmsByBmId = getJSONData(url_findJcxmsByBmId, {
//		bmId : value_bumenId,
//		tag : Math.random()
//	}, "post").obj;
	
	
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
	
	
	$.each(data_list_jcxmobj, function(i, jcxm) {
		$("<option value=\"" + jcxm.id + "\">" + jcxm.xmmc + "</option>")
				.appendTo("#jcxmIds");
	});

}

// 查询条件（searchBaogaoMoban）(整理)
function searchBaogaoMoban() {
	var data_search;
	if ($("#search_biaoti").val().indexOf("请输入") != -1)
		data_search = {
			biaoti : ''
		};
	else
		data_search = {
			biaoti : $("#search_biaoti").val()
		};
	$.extend(listFactor.data, data_search);
	$("#div_list").createPageList(listFactor);
};