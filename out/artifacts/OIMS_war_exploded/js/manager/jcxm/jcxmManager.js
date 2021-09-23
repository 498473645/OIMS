var data_jcxm_xiangmuleibie;// 项目类别
var data_jcxm_xiangmuguilei_first;// 项目归类_第一级
/*
 * 检查项目国际化
 */

var jcxm_Lanague = {
	JcxmItem : 337,// 检查项目列表
	InputJcxmMc : 357,// 请输入检查项目名称
	Seria : 214,// 序号
	XmBianMa : 365,// 项目编码
	Jcxm : 14,// 检查项目
	XmLeiBie : 366,// 项目类别
	XmGuiLei : 367,// 项目归类
	XiangMuMC : 431,// 项目名称
	XmLeiBie : 366,// 项目类别
	XmGuiLei : 367,// 项目归类
	zuoYanTuPian : 701,// 左眼图片
	youYanTuPian : 702,// 右眼图片
	jianYaoMiaoShu : 703,// 简要描述
	CheckOneItem_Alert : 222,// 请选择一条记录
	DelInfoOrNot_Confirm : 229,// 是否确定删除该信息
	DelOK_Alert : 227,// 删除成功
	DelError_Alert : 704,// 删除失败
	Sbyygjcxm : 705,// 设备引用该检查项目不可删除
	Xmbmbncf : 706,// 项目编码不能重复
	Jcxmxzsb : 707,// 检查项目新增失败
	Jcxmxzcg : 708,// 检查项目新增成功
	Qxzxyxgdjcxm : 709,// 请选择需要修改的检查项目
	Xmbmbnwk : 710,// 项目编码不能为空
	Xmmcbnwk : 711,// 项目名称不能为空
	Jcxmxgcg : 712,// 检查项目修改成功
	Jcxmxgsb : 713,// 检查项目修改失败
	Tpscsb : 714,// 图片上传失败
	Qsr : 735,// 请输入
	isnull : 0
// 最后删除
};
/*
 * 梁建业加载方法
 */
function loadJsAndCss_Jcxm() {
	loadWelcomePage();// 显示加载页面
	importJS("/js/jquery.customfile.js");
}
// 检查项目管理(整理)
function jcxmReady(btns) {
	importJS("/js/jquery.customfile.js");
	pageTitle = "检查项目列表";
	init();
	var div_advquery = $("<div/>").attr("id", "div_advquery").attr("class",
			"advquery").appendTo("#right");
	var table_advquery = "";
	table_advquery += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	table_advquery += "<tr>"
			+ "<td width='23%' class='leftalign' >"
			+ "<input name='search_xmmc' type='text' class='blurview' id='search_xmmc' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"
			+ "请输入检查项目名称"// 请输入检查项目名称
			+ "' size='28' />"
			+ "</td>"
			+ "<td width='9%'><a href='javascript:searchJcxm();' class='search'>"
			+ "查询"// 查询
			+ "</a></td>"
			+ "<td width='59%' >"
			+ "<div class='btn'>"
			+ "<a href='javascript:openSaveJcxmDialog();' onclick='return false;'><span class='adda'></span>"
			+ "新增"// 新增
			+ "</a>"
			+ "<a href='javascript:openUpdateJcxmDialog();' onclick='return false;'><span class='edita'></span>"
			+ "修改"// 修改
			+ "</a>"
			+ "<a href='javascript:delJcxmById();' onclick='return false;'><span class='dela'></span>"
			+ "删除"// 删除
			+ "</a>" + "</div>" + "</td>" + "</tr>";
	table_advquery += "</table>";
	$(table_advquery).appendTo(div_advquery);
	btnProwerConfig(btns);// 按钮加上权限
	showJcxmList();// 检查项目列表
	initialData_jcxm();// 初始化检查项目必要的数据
	$("#search_xmmc").click(function() {
		clearInitQuery(this);
	});// 点击输入框清空字体
	$("#search_xmmc").blur(function() {
		if (this.value == "") {
			$("#search_xmmc").val("请输入检查项目名称");
			$("#search_xmmc").addClass("blurview");
		}
	});
	$("#search_xmmc").bind("keyup", function(e) {
		if (e.which == 13) {
			searchJcxm();
		}
	});
}
// 初始化检查项目必要的数据(整理)
function initialData_jcxm() {
	var url_findCategorysByFatherId = "/publish/category/findCategorysByFatherId.htm";// 根据fatherid查询该fatherid下所有的码表信息
	data_jcxm_xiangmuleibie = getJSONData(url_findCategorysByFatherId, {
		fatherid : oimsCategory.JCXM_PROJECT_CATEGORY,//
		tag : Math.random()
	}, "post").obj;// 项目类别
	data_jcxm_xiangmuguilei_first = getJSONData(url_findCategorysByFatherId, {
		fatherid : oimsCategory.JCXMFL_CATEGORY_NAME,
		tag : Math.random()
	}, "post").obj;// 项目类别
}
// 检查项目列表(整理)
function showJcxmList() {
	listFactor = {
		listObj : [ {
			title : "序号",// 序号
			key : "jcxmid"
		}, {
			title : "项目编码",// 项目编码
			key : "bianma"
		}, {
			title : "检查项目",// 检查项目
			key : "xmmc"
		}, {
			title : "项目类别",// 项目类别
			key : "categoryName"
		}, {
			title : "项目归类",// 项目归类
			key : "fatherName"
		} ],
		url : contextPath + "/publish/jcxm/findJcxmsByPageAndJcxm.htm",
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			tag : Math.random()
		}
	};
	var div_list = $("<div/>").attr("id", "div_list").attr("class", "list")
			.appendTo("#right");// 创建一个div_list添加到div_right
	$(div_list).createPageList(listFactor);
}

// 新增检查项目窗口(整理)
function openSaveJcxmDialog() {
	var table_jcxm = "";// 检查项目table
	table_jcxm += "<table width='98%' border='0' cellspacing='0' cellpadding='0'>";
	table_jcxm += "<tr>"
			+ "<td width='8%' align='right'>"
			+ "项目编码"// 项目编码
			+ "：</td>"
			+ "<td >"
			+ "<input type='text' name='bianma' id='bianma' onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur'/>"
			+ "</td>"
			+ "<td width='1%'><span class='required'>*</span></td>"
			+ "<td width='4%' align='right' nowrap='nowrap'>"
			+ "项目名称"// 项目名称
			+ "：</td>"
			+ "<td width='38%'>"
			+ "<input type='text' name='xmmc'  id='xmmc'  onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur' />"
			+ "</td>" + "<td width='1%'><span class='required'>*</span></td>"
			+ "<tr>";
	table_jcxm += "<tr>" + "<td align='right'>" + "项目类别"// 项目类别
			+ "：</td>" + "<td colspan='5' align='left'>"
			+ "<div id='div_xiangmuleibie'></div>" + "</td>" + "<tr>";
	table_jcxm += "<tr>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "项目归类"// 项目归类
			+ "：</td>"
			+ "<td width='28%' align='left'>"
			+ "<select name='fatherId' id='fatherId' onblur=\"this.className='blur'\" ></select>"
			+ "</td>" + "<td colspan='4' align='left'>"
			+ "<div id='div_xiangmuguilei_second'></div>" + // 项目归类复选框操作div
			"</td>" + "<tr>";
	table_jcxm += "</table>";
	table_jcxm += "<div id='div_picture' style='padding-left:10px;'>"
			+ "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td align='right' width='8%'>"
			+ "左眼图片"// 左眼图片
			+ "：</td>"
			+ "<td  align='left' id='sfile_C'>"
			+ "<div id='file_C'>"
			+ "<div class='searchfile' id='div_sfile_C_searchfile'>"
			+ "<input type='file' name='file_leftPicPath' id ='file_leftPicPath' class='filed' onchange=\"onChange_LeftOrRightPicPath('"
			+ contextPath
			+ "/publish/jcxm/saveJcxm.htm','form_saveJcxm');\"/>"
			+ "<div class='fieldstyle'><input type='text' name='txt_leftPicPath' id='txt_leftPicPath' class='fieldtext'/></div>"
			+ "<div class='buttonstyle'><input type='button'  id='btn_leftPicPath' class='fieldbutton'/></div>"
			+ "</div>"
			+ "</td>"
			+ "<td align='left' width='8%'>"
			+ "右眼图片"// 右眼图片
			+ "：</td>"
			+ "<td align='left' id='tfile_C'>"
			+ "<div id='file_C'>"
			+ "<div class='searchfile' id='div_tfile_C_searchfile'>"
			+ "<input type='file' name='file_rightPicPath' id ='file_rightPicPath'  class='filed' onchange=\"onChange_LeftOrRightPicPath('"
			+ contextPath
			+ "/publish/jcxm/saveJcxm.htm','form_saveJcxm');\"/>"
			+ "<div class='fieldstyle'><input type='text' name='txt_rightPicPath' id='txt_rightPicPath' class='fieldtext'/></div>"
			+ "<div class='buttonstyle'><input type='button'  id='btn_rightPicPath' class='fieldbutton'/></div>"
			+ "</div>"
			+ "</td>"
			+ "<tr>"
			+ "<tr>"
			+ "<td align='right' width='8%'></td>"
			+ "<td  align='left' class='jcxm_image_eye'>"
			+ "<img src='"
			+ contextPath
			+ oimsCategory.JCXM_IMAGE_LEFTPICPATH
			+ "' id='image_leftPicPath'/>"
			+ "<br/>"
			+ "</td>"
			+ "<td align='left' width='8%'></td>"
			+ "<td align='left' class='jcxm_image_eye'>"
			+ "<img src='"
			+ contextPath
			+ oimsCategory.JCXM_IMAGE_RIGHTPICPATH
			+ "' id='image_rightPicPath'/>"
			+ "<br/>"
			+ "</td>"
			+ "<tr>"
			+ "</table>" + "</div>";
	table_jcxm += "<div id='div_xmms' style='padding-left:10px;'>";
	table_jcxm += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	table_jcxm += "<tr>"
			+ "<td align='right' valign='top' width='8%'>"
			+ "简要描述"// 简要描述
			+ "：</td>"
			+ "<td align='left'>"
			+ "<textarea name='xmms' id='xmms' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' id='textarea' cols='45' rows='4'></textarea>"
			+ "</td>" + "<tr>";
	table_jcxm += "</table>";
	table_jcxm += "</div>";
	var jbfl_ids = "<input type='hidden' name='jbfl_ids' id='jbfl_ids' value=''/>";// 隐藏域
	var form_saveJcxm = $("<form/>").attr("id", "form_saveJcxm").attr("action",
			contextPath + "/publish/jcxm/saveJcxm.htm").attr("enctype",
			"multipart/form-data").attr("method", "post");
	$(table_jcxm).appendTo(form_saveJcxm);
	$(jbfl_ids).appendTo(form_saveJcxm);// 隐藏域追加
	var div_openbutton = $("<div/>").attr("id", "div_openbutton").attr("class",
			"openbutton").appendTo(form_saveJcxm);// 底部div
	var div_openbutton_html = "<a href='javascript:saveJcxm();'><span class='advsumit'></span>"
			+ "提交"
			+ "</a> <a href='javascript:reset_form_saveJcxm();'><span class='advreset'></span>"
			+ "重置" + "</a>";
	$(div_openbutton_html).appendTo(div_openbutton);
	$(form_saveJcxm).oimsDialog({
		icon : "add",
		title : "新增",
		width : 900,
		height : 450,
		drag : false,// 是否可以拖动窗口
		locked : true,
		winType : 4,
		button : null
	});
	$.customfile('fieldbutton', 'filed', 'fieldtext', "openWin", $("#sfile_C"));
	$.customfile('fieldbutton', 'filed', 'fieldtext', "openWin", $("#tfile_C"));
	// 项目类别数据初始化
	$.each(data_jcxm_xiangmuleibie, function(i, xiangmuleibie) {
		var label_Object = "<label >" + xiangmuleibie.category + "</label>";
		var categoryId_Object = $("<input/>").attr("type", "radio").attr("id",
				"categoryId").attr("name", "categoryId").attr("value",
				xiangmuleibie.categoryid);
		$(categoryId_Object).appendTo("#div_xiangmuleibie");
		$(label_Object).appendTo("#div_xiangmuleibie");
		$(categoryId_Object).bind("click", function() {
			var value_categoryId = $("input[name='categoryId']:checked").val();// 此处默认值为常规检查
			// 8表示常规检查9表示特殊检查
			// 常规检查begin
			if (value_categoryId == oimsCategory.JCXM_CHANGGUIJIANCHA) {
				$("#div_picture")[0].style.display = 'none';
				var this_oimsDialog = $("#form_saveJcxm").parent().parent();
				$(this_oimsDialog)[0].style.height = 244 + "px";
			}
			// 常规检查end
			// 特殊检查begin
			if (value_categoryId == oimsCategory.JCXM_TESHUJIANCHA) {
				$("#div_picture")[0].style.display = 'block';
				var this_oimsDialog = $("#form_saveJcxm").parent().parent();
				$(this_oimsDialog)[0].style.height = 444 + "px";
			}
			// 特殊检查end
		});
		// $(
		// "<input type='radio' id='categoryId' name='categoryId' value='"
		// + xiangmuleibie.categoryid
		// + "' onclick=\"onClick_categoryId('form_saveJcxm')\"/>")
		// .appendTo("#div_xiangmuleibie");
		// $("<label >" + xiangmuleibie.category + "</label>")
		// .appendTo("#div_xiangmuleibie");
	});
	// 项目归类_第一级初始化数据
	$.each(data_jcxm_xiangmuguilei_first, function(i, xiangmuguilei) {
		$(
				"<option value=\"" + xiangmuguilei.categoryid + "\">"
						+ xiangmuguilei.category + "</option>").appendTo(
				"#fatherId");
	});
	checkedRadioByValue("categoryId", data_jcxm_xiangmuleibie[0].categoryid);// 常规检查默认选中状态
	onClick_categoryId('form_saveJcxm');// 项目类别点击事件方法
	onChange_jcxm_fatherId();// 项目归类下拉框改变出触发的方法
	$("#fatherId").bind("change", onChange_jcxm_fatherId);
}

// 重置—form_saveJcxm(整理)
function reset_form_saveJcxm() {

	$("#bianma").val("");// 项目编码
	$("#xmmc").val("");// 项目名称
	$("#xmms").val("");// 项目描述

	checkedRadioByValue("categoryId", data_jcxm_xiangmuleibie[0].categoryid);// 项目类别
	onClick_categoryId('form_saveJcxm');// 项目类别点击事件方法

	selectItemByValue("fatherId", data_jcxm_xiangmuguilei_first[0].categoryid);// 项目归类大类
	onChange_jcxm_fatherId();// 项目归类下拉框改变出触发的方法

	// 左眼图片上传begin
	$("#file_leftPicPath").remove();// 左眼图片上传
	$("<input/>").attr("name", "file_leftPicPath").attr("id",
			"file_leftPicPath").attr("type", "file").attr("class", "filed")
			.attr(
					"onchange",
					"onChange_LeftOrRightPicPath('" + contextPath
							+ "/publish/jcxm/saveJcxm.htm','form_saveJcxm');")
			.appendTo("#div_sfile_C_searchfile");
	$("#txt_leftPicPath").val("");
	$.customfile('fieldbutton', 'filed', 'fieldtext', "openWin", $("#sfile_C"));
	// 左眼图片上传end

	// 右眼图片上传begin
	$("#file_rightPicPath").remove();// 右眼图片上传
	$("<input/>").attr("name", "file_rightPicPath").attr("id",
			"file_rightPicPath").attr("type", "file").attr("class", "filed")
			.attr(
					"onchange",
					"onChange_LeftOrRightPicPath('" + contextPath
							+ "/publish/jcxm/saveJcxm.htm','form_saveJcxm');")
			.appendTo("#div_tfile_C_searchfile");
	$("#txt_rightPicPath").val("");
	$.customfile('fieldbutton', 'filed', 'fieldtext', "openWin", $("#tfile_C"));
	$("#image_leftPicPath").attr("src",
			contextPath + oimsCategory.JCXM_IMAGE_LEFTPICPATH);
	$("#image_rightPicPath").attr("src",
			contextPath + oimsCategory.JCXM_IMAGE_RIGHTPICPATH);
	// 右眼图片上传end
}

// 重置—form_updateJcxm(整理)
function reset_form_updateJcxm() {
	var dataObjects = getCheckBoxValue();
	var url_getJcxmById = "/publish/jcxm/getJcxmById.htm";// 根据检查项目ID获取检查项目信息
	var data_obj_getJcxmById = getJSONData(url_getJcxmById, {
		id : dataObjects[0].jcxmid,
		tag : Math.random()
	}, "post").obj;// 检查项目对象
	// 赋值
	$("#id").val(data_obj_getJcxmById.id);// 检查项目ID
	$("#bianma").val(data_obj_getJcxmById.bianma);// 项目编码
	$("#xmmc").val(data_obj_getJcxmById.xmmc);// 项目名称
	checkedRadioByValue("categoryId", data_obj_getJcxmById.categoryId);// 项目类别
	onClick_categoryId('form_updateJcxm');
	selectItemByValue("fatherId", data_obj_getJcxmById.fatherId);// 项目归类大类
	onChange_jcxm_fatherId();
	$("#xmms").val(data_obj_getJcxmById.xmms);// 项目描述
	if (data_obj_getJcxmById.leftPicPath != ""
			&& data_obj_getJcxmById.leftPicPath != null)
		$("#image_leftPicPath").attr("src",
				contextPath + data_obj_getJcxmById.leftPicPath);// 左眼图片
	else
		$("#image_leftPicPath").attr("src",
				contextPath + oimsCategory.JCXM_IMAGE_LEFTPICPATH);// 左眼图片
	if (data_obj_getJcxmById.rightPicPath != ""
			&& data_obj_getJcxmById.rightPicPath != null)
		$("#image_rightPicPath").attr("src",
				contextPath + data_obj_getJcxmById.rightPicPath);// 右眼图片
	else
		$("#image_rightPicPath").attr("src",
				contextPath + oimsCategory.JCXM_IMAGE_RIGHTPICPATH);// 左眼图片
	// 查询检查项目分类信息
	var url_findJcxmFenleisByJcxmId = "/publish/jcxmfenlei/findJcxmFenleisByJcxmId.htm";// 根据检查项目ID查询相关的项目归类信息
	var data_jcxm_jcxmfenlei = getJSONData(url_findJcxmFenleisByJcxmId, {
		jcxmId : dataObjects[0].jcxmid,
		tag : Math.random()
	}, "post").obj;// 检查项目分类
	// 项目归类第二级选中状态
	$.each(data_jcxm_jcxmfenlei, function(i, jcxm_jcxmfenlei) {
		checkedCheckBoxByValue("check_xiangmuguilei", jcxm_jcxmfenlei.jbflId);
	});
	$("#file_leftPicPath").remove();// 左眼图片上传
	$("<input/>")
			.attr("name", "file_leftPicPath")
			.attr("id", "file_leftPicPath")
			.attr("type", "file")
			.attr("class", "filed")
			.attr(
					"onchange",
					"onChange_LeftOrRightPicPath('"
							+ contextPath
							+ "/publish/jcxm/updateJcxm.htm','form_updateJcxm');")
			.appendTo("#div_sfile_C_searchfile");
	$("#txt_leftPicPath").val("");
	$.customfile('fieldbutton', 'filed', 'fieldtext', "openWin", $("#sfile_C"));
	$("#file_rightPicPath").remove();// 右眼图片上传
	$("<input/>")
			.attr("name", "file_rightPicPath")
			.attr("id", "file_rightPicPath")
			.attr("type", "file")
			.attr("class", "filed")
			.attr(
					"onchange",
					"onChange_LeftOrRightPicPath('"
							+ contextPath
							+ "/publish/jcxm/updateJcxm.htm','form_updateJcxm');")
			.appendTo("#div_tfile_C_searchfile");
	$("#txt_rightPicPath").val("");
	$.customfile('fieldbutton', 'filed', 'fieldtext', "openWin", $("#tfile_C"));
}
/*
 * 梁建业 修改检查项目窗口
 */
function openUpdateJcxmDialog() {
	var table_jcxm = "";// 检查项目table
	table_jcxm += "<table width='98%' border='0' cellspacing='0' cellpadding='0'>";
	table_jcxm += "<tr>"
			+ "<td width='8%' align='right'>"
			+ "项目编码"// 项目编码
			+ "：</td>"
			+ "<td >"
			+ "<input type='text' name='bianma' id='bianma' onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur'/>"
			+ "</td>"
			+ "<td width='1%'><span class='required'>*</span></td>"
			+ "<td width='4%' align='right' nowrap='nowrap'>"
			+ "项目名称"// 项目名称
			+ "：</td>"
			+ "<td width='38%'>"
			+ "<input type='text' name='xmmc'  id='xmmc'  onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur' />"
			+ "</td>" + "<td width='1%'><span class='required'>*</span></td>"
			+ "<tr>";
	table_jcxm += "<tr>" + "<td align='right'>" + "项目类别"// 项目类别
			+ "：</td>" + "<td colspan='5' align='left'>"
			+ "<div id='div_xiangmuleibie'></div>" + "</td>" + "<tr>";
	table_jcxm += "<tr>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "项目归类"// 项目归类
			+ "：</td>"
			+ "<td width='28%' align='left'>"
			+ "<select name='fatherId' id='fatherId' onblur=\"this.className='blur'\"></select>"
			+ "</td>" + "<td colspan='4' align='left'>"
			+ "<div id='div_xiangmuguilei_second'></div>" + // 项目归类复选框操作div
			"</td>" + "<tr>";
	table_jcxm += "</table>";
	table_jcxm += "<div id='div_picture' style='padding-left:10px;'>"
			+ "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td align='right' width='8%'>"
			+ "左眼图片"// 左眼图片
			+ "：</td>"
			+ "<td  align='left' id='sfile_C'>"
			+ "<div id='file_C'>"
			+ "<div class='searchfile' id='div_sfile_C_searchfile'>"
			+ "<input type='file' name='file_leftPicPath' id ='file_leftPicPath' class='filed' onchange=\"onChange_LeftOrRightPicPath('"
			+ contextPath
			+ "/publish/jcxm/updateJcxm.htm','form_updateJcxm');\"/>"
			+ "<div class='fieldstyle'><input type='text' name='txt_leftPicPath' id='txt_leftPicPath' class='fieldtext'/></div>"
			+ "<div class='buttonstyle'><input type='button'  id='btn_leftPicPath' class='fieldbutton'/></div>"
			+ "</div>"
			+ "</td>"
			+ "<td align='left' width='8%'>"
			+ "右眼图片"// 右眼图片
			+ "：</td>"
			+ "<td align='left' id='tfile_C'>"
			+ "<div id='file_C'>"
			+ "<div class='searchfile' id='div_tfile_C_searchfile'>"
			+ "<input type='file' name='file_rightPicPath' id ='file_rightPicPath'  class='filed' onchange=\"onChange_LeftOrRightPicPath('"
			+ contextPath
			+ "/publish/jcxm/updateJcxm.htm','form_updateJcxm');\"/>"
			+ "<div class='fieldstyle'><input type='text' name='txt_rightPicPath' id='txt_rightPicPath' class='fieldtext'/></div>"
			+ "<div class='buttonstyle'><input type='button'  id='btn_rightPicPath' class='fieldbutton'/></div>"
			+ "</div>"
			+ "</td>"
			+ "<tr>"
			+ "<tr>"
			+ "<td align='right' width='8%'></td>"
			+ "<td  align='left' class='jcxm_image_eye'>"
			+ "<img src='"
			+ contextPath
			+ oimsCategory.JCXM_IMAGE_LEFTPICPATH
			+ "' id='image_leftPicPath'/>"
			+ "<br/>"
			+ "</td>"
			+ "<td align='left' width='8%'></td>"
			+ "<td align='left' class='jcxm_image_eye'>"
			+ "<img src='"
			+ contextPath
			+ oimsCategory.JCXM_IMAGE_RIGHTPICPATH
			+ "' id='image_rightPicPath'/>"
			+ "<br/>"
			+ "</td>"
			+ "<tr>"
			+ "</table>" + "</div>";
	table_jcxm += "<div id='div_xmms' style='padding-left:10px;'>";
	table_jcxm += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	table_jcxm += "<tr>"
			+ "<td align='right' valign='top' width='8%'>"
			+ "简要描述"// 简要描述
			+ "：</td>"
			+ "<td align='left'>"
			+ "<textarea name='xmms' id='xmms' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' id='textarea' cols='45' rows='4'></textarea>"
			+ "</td>" + "<tr>";
	table_jcxm += "</table>";
	table_jcxm += "</div>";
	var hidden_id = "<input type='hidden' name='id' id='id' value=''/>";// id隐藏域
	var jbfl_ids = "<input type='hidden' name='jbfl_ids' id='jbfl_ids' value=''/>";// 隐藏域
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要修改的检查项目");
		return;
	}
	var form_updateJcxm = $("<form/>").attr("id", "form_updateJcxm").attr(
			"action", contextPath + "/publish/jcxm/updateJcxm.htm").attr(
			"enctype", "multipart/form-data").attr("method", "post");
	$(table_jcxm).appendTo(form_updateJcxm);
	$(hidden_id).appendTo(form_updateJcxm);// 隐藏域
	$(jbfl_ids).appendTo(form_updateJcxm);// 隐藏域
	var div_openbutton = $("<div/>").attr("id", "div_openbutton").attr("class",
			"openbutton").appendTo(form_updateJcxm);// 底部div
	var div_openbutton_html = "<a href='javascript:updateJcxm();'><span class='advsumit'></span>"
			+ "提交"
			+ "</a> <a href='javascript:reset_form_updateJcxm();'><span class='advreset'></span>"
			+ "重置" + "</a>";
	$(div_openbutton_html).appendTo(div_openbutton);
	$(form_updateJcxm).oimsDialog({
		icon : "edit",
		title : "修改",
		width : 900,
		height : 450,
		drag : false,
		locked : true,
		winType : 4,
		button : null
	});
	$.customfile('fieldbutton', 'filed', 'fieldtext', "openWin", $("#sfile_C"));
	$.customfile('fieldbutton', 'filed', 'fieldtext', "openWin", $("#tfile_C"));
	// 项目类别数据初始化
	$.each(data_jcxm_xiangmuleibie, function(i, xiangmuleibie) {
		var label_Object = "<label >" + xiangmuleibie.category + "</label>";
		var categoryId_Object = $("<input/>").attr("type", "radio").attr("id",
				"categoryId").attr("name", "categoryId").attr("value",
				xiangmuleibie.categoryid);
		$(categoryId_Object).appendTo("#div_xiangmuleibie");
		$(label_Object).appendTo("#div_xiangmuleibie");
		$(categoryId_Object).bind("click", function() {
			var value_categoryId = $("input[name='categoryId']:checked").val();// 此处默认值为常规检查
			// 8表示常规检查9表示特殊检查
			// 常规检查begin
			if (value_categoryId == oimsCategory.JCXM_CHANGGUIJIANCHA) {
				$("#div_picture")[0].style.display = 'none';
				var this_oimsDialog = $("#form_updateJcxm").parent().parent();
				$(this_oimsDialog)[0].style.height = 244 + "px";
			}
			// 常规检查end
			// 特殊检查begin
			if (value_categoryId == oimsCategory.JCXM_TESHUJIANCHA) {
				$("#div_picture")[0].style.display = 'block';
				var this_oimsDialog = $("#form_updateJcxm").parent().parent();
				$(this_oimsDialog)[0].style.height = 444 + "px";
			}
			// 特殊检查end
		});
		// var text_xiangmuleibie = xiangmuleibie.category + "";
		// $(
		// "<input type='radio' id='categoryId' name='categoryId' value='"
		// + xiangmuleibie.categoryid
		// + "' onclick=\"onClick_categoryId('form_updateJcxm')\"/>")
		// .appendTo("#div_xiangmuleibie");
		// $("<label >" + text_xiangmuleibie + "</label>")
		// .appendTo("#div_xiangmuleibie");
	});
	// 项目归类_第一级初始化数据
	$.each(data_jcxm_xiangmuguilei_first, function(i, xiangmuguilei) {
		$(
				"<option value=\"" + xiangmuguilei.categoryid + "\">"
						+ xiangmuguilei.category + "</option>").appendTo(
				"#fatherId");
	});
	// 赋值
	var url_getJcxmById = "/publish/jcxm/getJcxmById.htm";// 根据检查项目ID获取检查项目信息
	var data_obj_getJcxmById = getJSONData(url_getJcxmById, {
		id : dataObjects[0].jcxmid,
		tag : Math.random()
	}, "post").obj;// 检查项目对象
	$("#id").val(data_obj_getJcxmById.id);// 检查项目ID
	$("#bianma").val(data_obj_getJcxmById.bianma);// 项目编码
	$("#xmmc").val(data_obj_getJcxmById.xmmc);// 项目名称
	checkedRadioByValue("categoryId", data_obj_getJcxmById.categoryId);// 项目类别
	onClick_categoryId('form_updateJcxm');
	selectItemByValue("fatherId", data_obj_getJcxmById.fatherId);// 项目归类大类
	onChange_jcxm_fatherId();
	$("#fatherId").bind("change", onChange_jcxm_fatherId);
	$("#xmms").val(data_obj_getJcxmById.xmms);// 项目描述
	if (data_obj_getJcxmById.leftPicPath != ""
			&& data_obj_getJcxmById.leftPicPath != null)
		$("#image_leftPicPath").attr("src",
				contextPath + data_obj_getJcxmById.leftPicPath);// 左眼图片
	else
		$("#image_leftPicPath").attr("src",
				contextPath + oimsCategory.JCXM_IMAGE_LEFTPICPATH);// 左眼图片
	if (data_obj_getJcxmById.rightPicPath != ""
			&& data_obj_getJcxmById.rightPicPath != null)
		$("#image_rightPicPath").attr("src",
				contextPath + data_obj_getJcxmById.rightPicPath);// 右眼图片
	else
		$("#image_rightPicPath").attr("src",
				contextPath + oimsCategory.JCXM_IMAGE_RIGHTPICPATH);// 右眼图片
	// 查询检查项目分类信息
	var url_findJcxmFenleisByJcxmId = "/publish/jcxmfenlei/findJcxmFenleisByJcxmId.htm";// 根据检查项目ID查询相关的项目归类信息
	var data_jcxm_jcxmfenlei = getJSONData(url_findJcxmFenleisByJcxmId, {
		jcxmId : dataObjects[0].jcxmid,
		tag : Math.random()
	}, "post").obj;// 检查项目分类
	// 项目归类第二级选中状态
	$.each(data_jcxm_jcxmfenlei, function(i, jcxm_jcxmfenlei) {
		checkedCheckBoxByValue("check_xiangmuguilei", jcxm_jcxmfenlei.jbflId);
	});
}

// 检查项目删除(整理)
function delJcxmById() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要删除的检查项目");
		return;
	}
	$.oimsConfirm({
		strTitle : "确认删除该检查项目信息",
		remove_length : true
	}, doDelJcxmById);

}

// 执行检查项目删除(整理)
function doDelJcxmById() {
	var dataObjects = getCheckBoxValue();
	var validate_DelJcxmById = true;
	var url_findAllSheBeis = "/publish/shebei/findAllSheBeis.htm";// 查询所有设备信息
	var data_obj_findAllSheBeis = getJSONData(url_findAllSheBeis, {
		tag : Math.random()
	}, "post").obj;
	$.each(data_obj_findAllSheBeis, function(i, shebei) {
		var jcxmIds = shebei.jcxmIds;
		var array_jcxmIds = new Array();// 定义一个数组
		array_jcxmIds = jcxmIds.split(","); // 字符分割
		for ( var i = 0; i < array_jcxmIds.length; i++) {
			if (dataObjects[0].jcxmid == array_jcxmIds[i]) {
				validate_DelJcxmById = false;
				break;
			}
			;
		}
		;
	});
	if (validate_DelJcxmById) {
		var url_delJcxmById = "/publish/jcxm/delJcxmById.htm";
		var data_delJcxmById = getJSONData(url_delJcxmById, {
			id : dataObjects[0].jcxmid,
			tag : Math.random()
		}, "post");
		if (data_delJcxmById.state)
			$.oimsSucc("检查项目信息删除成功", function() {
				searchJcxm();
				removeDiv_openWin();
			});
		else
			$.oimsError("检查项目信息删除失败", function() {
				searchJcxm();
				removeDiv_openWin();
			});
	} else
		$.oimsAlert("设备引用该检查项目", function() {
			searchJcxm();
			removeDiv_openWin();
		});
}

// 保存检查项目(整理)
function saveJcxm() {
	var value_bianma = $("#bianma").val();
	var url_findJcxmsByJcxm = "/publish/jcxm/findJcxmsByJcxm.htm";
	var data_obj_findJcxmsByJcxm = getJSONData(url_findJcxmsByJcxm, {
		bianma : value_bianma,
		tag : Math.random()
	}, "post").obj;
	if (data_obj_findJcxmsByJcxm.length != 0) {
		$.oimsAlert("检查项目编码重复，请修改");
		return;
	}
	var xiangmuguilei = "";
	$("input[name='check_xiangmuguilei']:checked").each(function() {
		xiangmuguilei += $(this).val() + ",";
	});
	if (xiangmuguilei != "")// 截取去掉后面的“,”
		xiangmuguilei = xiangmuguilei.substring(0, xiangmuguilei
				.lastIndexOf(","));
	$("#jbfl_ids").val(xiangmuguilei);
	$("#form_saveJcxm").ajaxForm(
			{
				beforeSend : validate_form_saveJcxm,
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
						$.oimsSucc("检查项目信息新增成功", function() {
							searchJcxm();
							removeDiv_openWin();
						});
					else
						$.oimsError("检查项目信息新增失败", function() {
							searchJcxm();
							removeDiv_openWin();
						});
				}
			});
	$("#form_saveJcxm").submit();
}

// 检查项目新增相关验证的方法(整理)
function validate_form_saveJcxm() {
	var oValidataData = {
		nullValidataData : {
			'bianma' : "项目编码为空",
			'xmmc' : "项目名称为空"
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);
		return false;
	}
	return true;
}

// 检查项目修改相关验证的方法(整理)
function validate_form_updateJcxm() {
	var oValidataData = {
		nullValidataData : {
			'bianma' : "项目编码为空",
			'xmmc' : "项目名称为空"
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);
		return false;
	}
	return true;
}
// 修改检查项目(整理)
function updateJcxm() {
	var value_bianma = $("#bianma").val();
	var value_id = $("#id").val();
	var url_findJcxmsByJcxm = "/publish/jcxm/findJcxmsByJcxm.htm";
	var data_obj_findJcxmsByJcxm = getJSONData(url_findJcxmsByJcxm, {
		bianma : value_bianma,
		tag : Math.random()
	}, "post").obj;
	if (data_obj_findJcxmsByJcxm.length != 0
			&& (data_obj_findJcxmsByJcxm[0].id != value_id)) {
		$.oimsAlert("检查项目编码重复，请修改");
		return;
	}
	var xiangmuguilei = "";
	$("input[name='check_xiangmuguilei']:checked").each(function() {
		xiangmuguilei += $(this).val() + ",";
	});
	if (xiangmuguilei != "")// 截取去掉后面的“,”
		xiangmuguilei = xiangmuguilei.substring(0, xiangmuguilei
				.lastIndexOf(","));
	$("#jbfl_ids").val(xiangmuguilei);
	$("#form_updateJcxm").ajaxForm(
			{
				beforeSend : validate_form_updateJcxm,
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
						$.oimsSucc("检查项目信息修改成功", function() {
							searchJcxm();
							removeDiv_openWin();
						});
					else
						$.oimsError("检查项目信息修改失败", function() {
							searchJcxm();
							removeDiv_openWin();
						});
				}
			});
	$("#form_updateJcxm").submit();
}

// 项目归类下拉框改变事件（整理）
function onChange_jcxm_fatherId() {
	$("#div_xiangmuguilei_second").html("");
	var data_jcxm_xiangmuguilei_second;// 项目归类_第二级
	var value_fatherId = $("#fatherId").val();// 项目归类
	var url_findCategorysByFatherId = "/publish/category/findCategorysByFatherId.htm";// 根据fatherid查询该fatherid下所有的码表信息
	data_jcxm_xiangmuguilei_second = getJSONData(url_findCategorysByFatherId, {
		fatherid : value_fatherId,
		tag : Math.random()
	}, "post");// 项目归类_第二级
	// 项目归类_第二级
	if (data_jcxm_xiangmuguilei_second.state) {
		$
				.each(
						data_jcxm_xiangmuguilei_second.obj,
						function(i, xiangmuleibie_second) {
							$(
									"<input type='checkbox' id='check_xiangmuguilei' name='check_xiangmuguilei' value='"
											+ xiangmuleibie_second.categoryid
											+ "'/>").appendTo(
									"#div_xiangmuguilei_second");
							$(
									"<label >" + xiangmuleibie_second.category
											+ "&nbsp;&nbsp;</label>").appendTo(
									"#div_xiangmuguilei_second");
						});
	}
}
// 项目类别点击事件方法(整理)
function onClick_categoryId(id_form) {
	var value_categoryId = $("input[name='categoryId']:checked").val();// 此处默认值为常规检查
	// 8表示常规检查9表示特殊检查
	// 常规检查begin
	if (value_categoryId == oimsCategory.JCXM_CHANGGUIJIANCHA) {
		$("#div_picture")[0].style.display = 'none';
		var this_oimsDialog = $("#" + id_form).parent().parent();
		$(this_oimsDialog)[0].style.height = 244 + "px";
	}
	// 常规检查end
	// 特殊检查begin
	if (value_categoryId == oimsCategory.JCXM_TESHUJIANCHA) {
		$("#div_picture")[0].style.display = 'block';
		var this_oimsDialog = $("#" + id_form).parent().parent();
		$(this_oimsDialog)[0].style.height = 444 + "px";
	}
	// 特殊检查end
}

// 查询条件（searchJcxm）(整理)
function searchJcxm() {
	var data_search;
	if ($("#search_xmmc").val().indexOf("请输入") != -1)
		data_search = {
			xmmc : ''
		};
	else
		data_search = {
			xmmc : $("#search_xmmc").val()
		};
	$.extend(listFactor.data, data_search);
	$("#div_list").createPageList(listFactor);
};

// 左眼右眼图片路径改变的方法(整理)
function onChange_LeftOrRightPicPath(action_form, id_form) {
	$("#" + id_form)[0].action = contextPath
			+ "/publish/jcxm/upLoadLeftOrRightPic.htm";
	$("#" + id_form).ajaxForm(
			{
				dataType : "json",
				iframe : true,
				beforeSend : function() {
				},
				uploadProgress : function() {
				},
				complete : function(data_Result) {
					$("#" + id_form)[0].action = action_form;
					var data_pre = data_Result.responseText;
					var data_string = "";
					if (data_pre.indexOf("</pre") == -1)
						data_string = data_pre;
					else
						data_string = data_pre.substring(data_pre.indexOf("{"),
								data_pre.indexOf("</pre"));
					var data = eval("(" + data_string + ")");
					var data_state = data.state;
					var data_obj = data.obj;
					if (data_state) {
						if (data_obj.leftPicPath != null
								&& data_obj.leftPicPath != "")
							$("#image_leftPicPath").attr("src",
									contextPath + data_obj.leftPicPath);
						if (data_obj.rightPicPath != null
								&& data_obj.rightPicPath != "")
							$("#image_rightPicPath").attr("src",
									contextPath + data_obj.rightPicPath);

					} else
						$.oimsAlert("图片上传失败", null);
				}
			});
	$("#" + id_form).submit();
}
