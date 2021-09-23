//系统日期首次加载的方法(整理)
function showSysLogInfoList(btns) {
	pageTitle = "系统日志";
	init();
	$("<div/>").attr("id", "advquery").addClass("advquery").appendTo("#right");
	var LogInfoTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='23%' class='leftalign' ><input name='search_cznr_czr' type='text' class='blurview' id='search_cznr_czr' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"
			+ "请输入日志内容或操作人"
			+ "' size='28' /></td>"
			+ "<td width='7%'><a  href='javascript:seniorSysSearchSubmit();' class='search' >"
			+ "查询"
			+ "</a></td>"
			+ " <td width='9%'><a  href='javascript:advSearchSysLogInfo();' class='advsearch'>"
			+ "高级查询"
			+ "</a></td>"
			+ "<td width='59%' >"
			+ "<div class='btn'>"
			+ "<a onclick='return false;'  href='javascript:viewSysLogInfoForm();'><span class='viewa'></span>"
			+ "查看"
			+ "</a>"
			+ "<a onclick='return false;'  href='javascript:openExportSysLogInfoForm();'><span class='exporta'></span>"
			+ "导出" + "</a>" + "</div>" + "</td>" + "</tr>" + "</table>";
	$(LogInfoTemplate).appendTo("#advquery");
	btnProwerConfig(btns);// 按钮加上权限
	createPagelist_SysLogInfo();// 分页控件
	$("#search_cznr_czr").click(function() {
		clearInitQuery(this);
	});
	$("#search_cznr_czr").blur(function() {
		if (this.value == "") {
			$("#search_cznr_czr").val("请输入日志内容或操作人");
			$("#search_cznr_czr").addClass("blurview");
		}
	});
	$("#search_cznr_czr").bind("keyup", function(e) {
		if (e.which == 13) {
			seniorSysSearchSubmit();
		}
	});
}

function createPagelist_SysLogInfo() {
	listFactor = {
		listObj : [ {
			title : "序号",
			key : "id"
		}, {
			title : "日志内容",
			key : "cznr",
			func : function(value) {
				if (value.length > 15)
					return value.substring(0, 15) + "...";
				else
					return value;
			}
		}, {
			title : "日志级别",
			key : "rzjb",
			func : function(value) {
				if (value == oimsCategory.SELECTLOG_LEVEL)
					return "查询";
				if (value == oimsCategory.SAVELOG_LEVEL)
					return "保存";
				if (value == oimsCategory.DELETELOG_LEVEL)
					return "删除";
				if (value == oimsCategory.UPDATELOG_LEVEL)
					return "修改";
			}
		}, {
			title : "生成时间",
			key : "czsj"
		}, {
			title : "操作工号",
			key : "czr"
		}, {
			title : "日志状态",
			key : "czjg",
			func : function(value) {
				return (value) ? "正常" : "异常";
			}
		} ],
		url : contextPath + "/publish/oims_log/findAllLogInfoByPage.htm",
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			state : oimsCategory.OIMS_LOG_STATE_SYSTEMLOG,// 1表示系统日志
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			tag : Math.random()
		}
	};
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#right");
	$(div_list).createPageList(listFactor);
}
// 日志详情表格对象
var viewSysLogInfoTable = "";
viewSysLogInfoTable += "<table width='96%' border='0' cellspacing='0' cellpadding='0'>"
		+ " <tr>"
		+ "<td width='14%' align='right'>"
		+ "操作人"
		+ ":</td>"
		+ "<td width='38%'><input name='czr' id='czr1' type='text' class='blurview'   disabled='disabled'   onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\"    /></td>"
		+ "<td width='12%' align='right' nowrap='nowrap'  >"
		+ "日志级别"
		+ ":</td>"
		+ "<td width='28%' colspan='3' align='left'>"
		+ "<input type='text' name='rzjb' id='rzjb1'   disabled='disabled' class='blurview'  onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\"   /></td>"
		+ " </tr>"
		+ " <tr>"
		+ "<td align='right' nowrap='nowrap'>"
		+ "日志状态"
		+ ":</td>"
		+ "<td align='left'><input type='text' name='czjg' id='czjg1' class='blurview'  disabled='disabled'  onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\"    /></td>"
		+ "<td align='right'>"
		+ "生成时间"
		+ ":</td>"
		+ " <td><input type='text' name='czsj' id='czsj1' disabled='disabled' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur'  /></td>"
		+ "  </tr>"
		+ "<tr>"
		+ " <td align='right' valign='top'>"
		+ "日志内容"
		+ ":</td>"
		+ "   <td colspan='5' align='left'><textarea name='cznr' id='cznr1'   disabled='disabled' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' id='textarea3' cols='45' rows='4'></textarea></td>"
		+ " </tr>" + "    </table>";
var hidden_id = "<input type='hidden' name='id' id='id'>";// 隐藏的id"
// 日志信息查询窗口(整理)
function viewSysLogInfoForm() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要查看的日志信息");
		return;
	}
	// 得到viewLogInfoForm
	var viewSysLogInfoForm = $("<form/>").attr("id", "viewSysLogInfoForm")
			.attr("name", "viewSysLogInfoForm").attr("action",
					contextPath + "/publish/oims_log/viewLogInfoByID.htm")
			.attr("method", "post");
	$(viewSysLogInfoTable).appendTo(viewSysLogInfoForm);
	// 给form添加id信息
	$(hidden_id).appendTo(viewSysLogInfoForm);
	// 获取窗口按键,定义div及其id，class属性
	var div_openbutton = $("<div/>").attr("id", "div_openbutton").attr("class",
			"openbutton").appendTo(viewSysLogInfoForm);// 底部div
	// 定义按键样式以及跳转脚本
	var div_openbutton_html = "<a href='javascript:syslogInfo_DialogClose()'><span class='advsumit'></span>确定</a> ";
	$(div_openbutton_html).appendTo(div_openbutton);
	$(viewSysLogInfoForm).oimsDialog({
		icon : "view",
		title : "查看",
		width : 600,
		height : 220,
		drag : false,
		locked : true,
		winType : 4,
		isCloseWin : false
	});
	// 设置只读属性
	$("#viewSysLogInfoForm").attr("readonly", true);
	var data_viewLogInfoByID = getJSONData(
			"/publish/oims_log/viewLogInfoByID.htm", {
				id : dataObjects[0].id,
				tag : Math.random()
			}, "post");
	if (data_viewLogInfoByID.state) {
		var OimsLog = data_viewLogInfoByID.obj;
		$("#czr1").val(OimsLog.czr);// 操作人
		$("#rzjb1").val(function() {// 日志级别
			if (OimsLog.rzjb == oimsCategory.SELECTLOG_LEVEL)
				return "查询";
			if (OimsLog.rzjb == oimsCategory.SAVELOG_LEVEL)
				return "保存";
			if (OimsLog.rzjb == oimsCategory.DELETELOG_LEVEL)
				return "删除";
			if (OimsLog.rzjb == oimsCategory.UPDATELOG_LEVEL)
				return "修改";
		});
		$("#czjg1").val(function() {
			return (OimsLog.czjg) ? "正常" : "异常";
		});// 日志状态
		$("#czsj1").val(formatDateTime(OimsLog.czsj.time));// 生成时间
		$("#cznr1").val(OimsLog.cznr);// 日志内容
	}
}
// 导出日志操作(整理)
function openExportSysLogInfoForm() {
	$.oimsConfirm({
		strTitle : "确认导出系统日志信息",
		remove_length : true
	}, exportSysLogInfo);
}

// 执行系统日志导出操作(整理)
function exportSysLogInfo() {
	var data_search = {};
	var search = $("#search_cznr_czr").val().indexOf("请输入") != -1 ? "" : $(
			"#search_cznr_czr").val();
	var czr = $("#search_czr").length == 1 ? $("#search_czr").val() : "";// 患者姓名
	// 日志级别
	var rzjb = "";
	if ($("#search_rzjb").length != 0) {
		$("input[name='search_rzjb']:checked").each(function() {
			rzjb += $(this).val() + ",";
		});
		if (rzjb != "")// 截取去掉后面的“,”
			rzjb = rzjb.substring(0, rzjb.lastIndexOf(","));
	}
	// 日志级别
	// 操作结果
	var czjg = "";
	if ($("#search_czjg").length != 0) {
		$("input[name='search_czjg']:checked").each(function() {
			czjg += $(this).val() + ",";
		});
		if (czjg != "")// 截取去掉后面的“,”
			czjg = czjg.substring(0, czjg.lastIndexOf(","));
	}
	// 操作结果
	var czsj = $("#search_czsj_begin").length == 1 ? $("search_czsj_begin")
			.val() : "";// 开始时间
	var czsj2 = $("#search_czsj_end").length == 1 ? $("#search_czsj_end").val()
			: "";// 结束时间
	var cznr = $("#search_cznr").length == 1 ? $("#search_cznr").val() : "";// 操作内容
	data_search = {
		search : search,
		czr : czr,// 操作人
		rzjb : rzjb,// 日志级别
		czjg : czjg,// 操作结果
		czsj : czsj,// 开始时间
		czsj2 : czsj2,// 结束时间
		cznr : cznr
	// 操作内容
	};
	omis_JiaZaiSyslogExport();
	var url = "/publish/oims_log/exportLogInfo.htm";
	var data = getJSONData(url, data_search, "post");
	if (data.state) {
		$("#processId").remove();
		location.href = contextPath + "/temp/" + data.obj;
		seniorSysSearchSubmit();// 查询
	} else {
		$("#processId").remove();
		$.oimsAlert("导出失败");
	}
}
// 关闭窗口
function syslogInfo_DialogClose() {
	removeDiv_openWin();
}

// 弹出高级查询表格(整理)
function advSearchSysLogInfo() {
	var seniorSearchTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ " <tr>"
			+ " <td width='5%' style='text-align:right'>"
			+ "操作人"
			+ ":</td>"
			+ "<td width='38%'><input type='text' name='search_czr' id='search_czr' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur'/></td>"
			+ " <td width='5%' style='text-align:right' nowrap='nowrap'>"
			+ "日志级别"
			+ ":</td>"
			+ "<td width='36%' colspan='3' align='left'>"
			+ "<input type='checkbox' name='search_rzjb' id='search_rzjb' value='"
			+ oimsCategory.SELECTLOG_LEVEL
			+ "' />"
			+ "查询"
			+ "<input type='checkbox' name='search_rzjb' id='search_rzjb' value='"
			+ oimsCategory.SAVELOG_LEVEL
			+ "' />"
			+ "保存"
			+ "<input type='checkbox' name='search_rzjb' id='search_rzjb' value='"
			+ oimsCategory.DELETELOG_LEVEL
			+ "' />"
			+ "删除"
			+ "<input type='checkbox' name='search_rzjb' id='search_rzjb' value='"
			+ oimsCategory.UPDATELOG_LEVEL
			+ "' />"
			+ "修改"
			+ "</td>"
			+ " </tr>"
			+ "<tr>"
			+ "<td style='text-align:right' nowrap='nowrap'>"
			+ "日志状态"
			+ ":</td>"
			+ "<td align='left'><input type='checkbox' name='search_czjg' id='search_czjg' value='1' />"
			+ "正常"
			+ " <input type='checkbox' name='search_czjg' id='search_czjg' value='0' />"
			+ "异常"
			+ "</td>"
			+ "  <td style='text-align:right'>"
			+ "生成时间"
			+ ":</td>"
			+ "<td><input type='text' name='search_czsj_begin' id='search_czsj_begin' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur'  /></td>"
			+ "  <td>--</td>"
			+ " <td><input type='text' name='search_czsj_end' id='search_czsj_end' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur'  /></td>"
			+ " </tr>"
			+ " <tr>"
			+ "<td style='text-align:right' valign='top'>"
			+ "日志内容"
			+ ":</td>"
			+ "  <td colspan='5' align='left'><textarea name='search_cznr' id ='search_cznr' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' id='textarea2' cols='45' rows='4'></textarea></td>"
			+ " </tr>"
			+ "  </table>"
			+ " <div class='avdopenbutton' >"
			+ " <a href='javascript:seniorSysSearchSubmit();'><span class='advsumit'></span>"
			+ "提交"
			+ "</a>"
			+ " <a href='javascript:seniorSysSearchReset();'><span class='advreset'></span>"
			+ "重置"
			+ "</a>"
			+ "<a id = 'closeId'><span class='close' ></span>"
			+ "关闭" + "</a>" + " </div> ";
	$.oimsBox({
		parentDiv : "advquery",// 将生成内容添加的id
		divContent : seniorSearchTemplate
	// 需要添加的内容
	});
	$(seniorSearchTemplate).appendTo("#seniorSearch");
	calendarFun("search_czsj_begin");// 开始日期
	calendarFun("search_czsj_end");// 结束日期
}
// 系统日志高级查询操作(整理)
function seniorSysSearchSubmit() {
	var data_search = {};
	var search = $("#search_cznr_czr").val().indexOf("请输入") != -1 ? "" : $(
			"#search_cznr_czr").val();
	var czr = $("#search_czr").length == 1 ? $("#search_czr").val() : "";// 患者姓名
	// 日志级别
	var rzjb = "";
	if ($("#search_rzjb").length != 0) {
		$("input[name='search_rzjb']:checked").each(function() {
			rzjb += $(this).val() + ",";
		});
		if (rzjb != "")// 截取去掉后面的“,”
			rzjb = rzjb.substring(0, rzjb.lastIndexOf(","));
	}
	// 日志级别
	// 操作结果
	var czjg = "";
	if ($("#search_czjg").length != 0) {
		$("input[name='search_czjg']:checked").each(function() {
			czjg += $(this).val() + ",";
		});
		if (czjg != "")// 截取去掉后面的“,”
			czjg = czjg.substring(0, czjg.lastIndexOf(","));
	}
	// 操作结果
	var czsj = $("#search_czsj_begin").length == 1 ? $("search_czsj_begin")
			.val() : "";// 开始时间
	var czsj2 = $("#search_czsj_end").length == 1 ? $("#search_czsj_end").val()
			: "";// 结束时间
	var cznr = $("#search_cznr").length == 1 ? $("#search_cznr").val() : "";// 操作内容
	data_search = {
		search : search,
		czr : czr,// 操作人
		rzjb : rzjb,// 日志级别
		czjg : czjg,// 操作结果
		czsj : czsj,// 开始时间
		czsj2 : czsj2,// 结束时间
		cznr : cznr
	// 操作内容
	};
	$.extend(listFactor.data, data_search);
	$("#pageList").createPageList(listFactor);
}
// 高级查询重置操作(整理)
function seniorSysSearchReset() {
	$("#search_czr").val("");// 操作人
	$("[name = search_rzjb]:checkbox").attr("checked", false);// 日志级别
	$("[name = search_czjg]:checkbox").attr("checked", false);// 日志状态
	$("#search_czsj_begin").val("");// 开始时间
	$("#search_czsj_end").val("");// 结束时间
	$("#search_cznr").val("");// 日志内容
}
// 加载底色
function omis_JiaZaiSyslogExport() {
	var innerHtml = '<div id = "processId" style = "top: 0px;left: 0px;position: absolute;width: 100%;height: 100%;z-index: 29;background-color: rgb(204, 204, 204);opacity: 0.6;"><table border="0" cellspacing="0" cellpadding="0" width="100%" height="100%">'
			+ '<tr>'
			+ '<td align="center" valign="middle" style ="font-size: 20px;font-weight: bolder;color:red;">'
			+ '&nbsp;&nbsp;'
			+ "系统运行中，请等待"
			+ '....'
			+ '</td>'
			+ '</tr>'
			+ '</table><div>';
	$(document.body).append(innerHtml);
}