/**
 * 
 * author:GuoBaoqiang date:2012-10-09 初始化页面
 */
// <!--新加样式 -->
var dataPageSize;
var form_import;
data_language = setLanguage(data_language);
function showDataExportList() {
	pageTitle = data_language.DataExport;
	init();

	var div_table = $("<div/>").attr("id", "tablabel")
			.attr("class", "tablabel").appendTo("#right");
	var div1_1 = $("<div/>")
			.attr("id", "div1_1")
			.attr("class", "tab_hide")
			.attr("onclick",
					"PageCurrentMenuActive('div1_1',listFactor_User,form_import_user)")
			.appendTo("#tablabel");
	var div1_1_html = "<span>" + data_language.UserInfo + "</span>";
	$(div1_1_html).appendTo(div1_1);
	var div1_2 = $("<div/>")
			.attr("id", "div1_2")
			.attr("class", "tab_hide")
			.attr(
					"onclick",
					"PageCurrentMenuActive('div1_2',  listFactor_YuanGong  ,  form_import_YuanGong )")
			.appendTo("#tablabel");
	var div1_2_html = "<span>" + data_language.YgInfo + "</span>";
	$(div1_2_html).appendTo(div1_2);
	var div1_3 = $("<div/>")
			.attr("id", "div1_3")
			.attr("class", "tab_hide")
			.attr("onclick",
					"PageCurrentMenuActive('div1_3', listFactor_BuMen,form_import_BuMen )")
			.appendTo("#tablabel");
	var div1_3_html = "<span>" + data_language.DepartInfo + "</span>";
	$(div1_3_html).appendTo(div1_3);

	var div1_4 = $("<div/>")
			.attr("id", "div1_4")
			.attr("class", "tab_hide")
			.attr("onclick",
					"PageCurrentMenuActive('div1_4', listFactor_SheBei,form_import_SheBei )")
			.appendTo("#tablabel");
	var div1_4_html = "<span>" + data_language.SheBeiInfo + "</span>";
	$(div1_4_html).appendTo(div1_4);

	var div1_5 = $("<div/>")
			.attr("id", "div1_5")
			.attr("class", "tab_hide")
			.attr("onclick",
					"PageCurrentMenuActive('div1_5', listFactor_HuanZhe ,form_import_Patient)")
			.appendTo("#tablabel");
	var div1_5_html = "<span>" + data_language.HuanZheInfo + "</span>";
	$(div1_5_html).appendTo(div1_5);

	var div1_6 = $("<div/>")
			.attr("id", "div1_6")
			.attr("class", "tab_hide")
			.attr("onclick",
					"PageCurrentMenuActive('div1_6', listFactor_Jcxm,form_import_JcXm )")
			.appendTo("#tablabel");
	var div1_6_html = "<span>" + data_language.JcXmInfo + "</span>";
	$(div1_6_html).appendTo(div1_6);

	var div1_7 = $("<div/>")
			.attr("id", "div1_7")
			.attr("class", "tab_hide")
			.attr("onclick",
					"PageCurrentMenuActive('div1_7',listFactor_JCD,form_import_Jcd)")
			.appendTo("#tablabel");
	var div1_7_html = "<span>" + data_language.jcdSJ + "</span>";
	$(div1_7_html).appendTo(div1_7);

	var div1_8 = $("<div/>")
			.attr("id", "div1_8")
			.attr("class", "tab_hide")
			.attr("onclick",
					"PageCurrentMenuActive('div1_8', listFactor_BgXx ,form_import_BaoGaoXinXi)")
			.appendTo("#tablabel");
	var div1_8_html = "<span>" + data_language.bgInfo + "</span>";
	$(div1_8_html).appendTo(div1_8);

	var div1_9 = $("<div/>")
			.attr("id", "div1_9")
			.attr("class", "tab_hide")
			.attr(
					"onclick",
					"PageCurrentMenuActive('div1_9', listFactor_ShuRuMoBan,form_import_ShuRuMoBan )")
			.appendTo("#tablabel");
	var div1_9_html = "<span>" + data_language.srmbInfo + "</span>";
	$(div1_9_html).appendTo(div1_9);

	var div1_10 = $("<div/>")
			.attr("id", "div1_10")
			.attr("class", "tab_hide")
			.attr("onclick",
					"PageCurrentMenuActive('div1_10', listFactor_oimsLog,form_import_Log )")
			.appendTo("#tablabel");
	var div1_10_html = "<span>" + data_language.LogInfo + "</span>";
	$(div1_10_html).appendTo(div1_10);

	var div1_11 = $("<div/>")
			.attr("id", "div1_11")
			.attr("class", "tab_hide")
			.attr(
					"onclick",
					"PageCurrentMenuActive('div1_11', listFactor_BaoGaoMoBan,form_import_BaoGaoMoBan)")
			.appendTo("#tablabel");
	var div1_11_html = "<span>" + data_language.bgmbInfo + "</span>";
	$(div1_11_html).appendTo(div1_11);

	getOtherMenu('div1_1');
	PageCurrentMenuActive('div1_1', listFactor_User, form_import_user);

}

// 显隐层切换PageCurrentMenuActive
function PageCurrentMenuActive(objName, listFactor, form_import) {

	document.getElementById(OtherMenu).className = "tab_hide";
	document.getElementById(objName).className = "tab_show";
	$("#div_main").remove();
	var div_main = $("<div/>").attr("id", "div_main").appendTo("#right");

	$(form_import).appendTo("#div_main");

	dataPageSize = getDataPageSize_gbq($(div_main).height());
	showCurrentMenuList(listFactor);
	getOtherMenu(objName);
}
// 点击"确认导出"按钮触发函数事件
// 用form提交User
function openExportWin(form_import) {
	form_import = form_import;
	// $.oimsConfirm({strTitle:danwei_language.IsConfirmDelBgs,remove_length:true},
	// doDelBanGongShi);
	$.oimsConfirm({
		strTitle : data_language.isConfirmExport,
		remove_length : true
	}, function() {
		$(form_import).ajaxForm(
				{
					dataType : "json",
					method : "post",
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
							data_string = data_pre.substring(data_pre
									.indexOf("{"), data_pre.indexOf("</pre"));
						var data = eval("(" + data_string + ")");
						var data_state = data.state;
						var data_message = data.message;
						var data_obj = data.obj;
						if (data_message) {
							$("#processId").remove();
							$.oimsAlert(data_message);
							return;
						}
						if (data_state == 1) {
							$("#processId").remove();
							if (data_obj != null) {
								location.href = contextPath + "/temp/"
										+ data_obj;
							}
						} else if (data_state == 0) {
							$("#processId").remove();
							$.oimsAlert(data_language.importFailed, null);
						}
					}
				});
		$(form_import).submit();
		omis_JiaZaiExport();
	});
}
function exportsure(form_import) {
	$(form_import).ajaxForm(
			{
				dataType : "json",
				method : "post",
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
					var data = eval("(" + data_string + ")");
					var data_state = data.state;
					var data_message = data.message;
					var data_obj = data.obj;
					if (data_message) {
						$.oimsAlert(data_message);
						return;
					}
					if (data_state == 1) {
						if (data_obj != null) {
							location.href = contextPath + "/temp/" + data_obj;
						}
					} else
						$.oimsAlert(data_language.Fail, null);
				}
			});
	$(form_import).submit();
}
// 获取当前层，转换为隐层
var OtherMenu;
function getOtherMenu(Other) {
	OtherMenu = Other;
}
// 创建当前循环list函数
function showCurrentMenuList(listFactor) {
	listFactor.data.pageSize = dataPageSize;
	$("#div_main_list").remove();
	var div_main_list = $("<div/>").attr("id", "div_main_list").attr("class",
			"list").appendTo("#right");
	$(div_main_list).createPageList(listFactor);
	getCategoryInfo();
	getRoleInfo();
	getBuMenInfo();
	getSheBeiInBuMenInfo();
	getZhiWuInfo();
	getJcXmInfo();
	getMoBanInfo();
	getPatientInfo();
	getJcdStateInfo();
	getJCDoctor();
	getBgYsInfo();
	getShenHeInfo();
	$("#ssdq").remove();
	var dq = $.auto({
		id : "ssdq",
		url : "diqu/findAllDiqu.htm",
		chg : {
			id : "id",
			text : "name",
			index1 : "index1",
			index2 : "index2"
		}
	});
	$("#td_ssdq").append(dq);
	calendarFun("shengri");
	calendarFun("zcrq");
	calendarFun("jcsj");
	calendarFun("kdTime");
	calendarFun("shTime");
	calendarFun("bgTime");
	calendarFun("addTime");
	calendarFun("czsj");
	// cleanAll();

};
// 查找所有角色信息
function getRoleInfo() {
//	$("#dataselectdrop_roleIds").remove();
//	$("#roleIds").remove();
//	var arr = new Array();
//	var data = getJSONData("/publish/role/findAllRole.htm", {
//		tag : Math.random()
//	}, "post");
//	if (data.state) {
//		$.each(data.obj, function(i, d) {
//			arr.push({
//				text : d.jiaose,
//				id : d.id
//			});
//
//		});
//	}
//	var el_OfficeIds2 = $.textAddCommbo({
//		id : "roleIds",
//		hiddenId : "job"
//	});
//
//	$("#roleNames").append(el_OfficeIds2.ele);
//
//	el_OfficeIds2.tree(arr, "roleIds");
//	$(".selectlist").height(90);
//	$(".dataselectdrop").css("position", "absolute");
}
// 获得所有部门信息
function getBuMenInfo() {
	$("#dataselectdrop_bumenIds").remove();
	// input输入框清除
	$("#bumenIds").remove();

	var arr = new Array();
	var data = getJSONData("/publish/bumen/findAllBuMen.htm", {
		tag : Math.random()
	}, "post");
	if (data.state) {
		$.each(data.obj, function(i, d) {
			arr.push({
				text : d.bmmc,
				id : d.id
			});

		});
	}
	// hiddenId要跟页面一致
	var ff = $.textAddCommbo({
		id : "bumenIds",
		hiddenId : "bumenId"
	});
	$("#bumenNames").append(ff.ele);

	ff.tree(arr, "bumenIds");
	$(".selectlist").height(90);
	$(".dataselectdrop").css("position", "absolute");
}
// 获得部门信息下的检查项目信息
function getJcXmInfo() {
	$("#bumenIds").change(
			function() {
				var s = $("#bumenId").val();
				if ((s.indexOf(",") != -1) || s == "") {
					$("#jcxmids").val("");
					$("#jcxmids").attr("disabled", true);
				} else {
					$("#dataselectdrop_jcxmids").remove();
					$("#jcxmids").val("");
					$("#jcxmids").remove();
					var arr = new Array();
					var data = getJSONData(
							"/publish/oims_data/findJcXmsInSheBei.htm", {
								buMenId : $("#bumenId").val(),
								tag : Math.random()
							}, "post");
					if (data.state) {
						$("#temp").remove();
						$.each(data.obj, function(i, d) {
							arr.push({
								text : d.xmmc,
								id : d.id
							});
						});
					}
					var ff = $.textAddCommbo({
						id : "jcxmids",
						hiddenId : "jcxmIds"
					});
					$("#jcxmNames").append(ff.ele);
					ff.tree(arr, "jcxmids");
					$(".selectlist").height(90);
					$(".dataselectdrop").css("position", "absolute");
				}
			});
}
// 获得部门信息下的设备信息
function getSheBeiInBuMenInfo() {
	$("#bumenIds").change(
			function() {
				var s = $("#bumenId").val();
				if ((s.indexOf(",") != -1) || s == "") {
					$("#shebeiIds").val("");
					$("#shebeiIds").attr("disabled", true);
				} else {
					$("#dataselectdrop_shebeiIds").remove();
					$("#shebeiIds").val("");
					$("#shebeiIds").remove();
					$("#temp").remove();
					var arr = new Array();
					var data = getJSONData(
							"/publish/oims_data/findSheBeisInBuMen.htm", {
								buMenId : $("#bumenId").val(),
								tag : Math.random()
							}, "post");
					if (data.state) {
						$.each(data.obj, function(i, d) {
							arr.push({
								text : d.sbmc,
								id : d.id
							});
						});
					}
					var ff = $.textAddCommbo({
						id : "shebeiIds",
						hiddenId : "shebeiId"
					});
					$("#shebeiNames").append(ff.ele);
					ff.tree(arr, "shebeiIds");
					$(".selectlist").height(90);
					$(".dataselectdrop").css("position", "absolute");
				}
			});
}
// 获取患者来源信息
function getPatientInfo() {
	$("#dataselectdrop_laiyuanIds").remove();
	$("#laiyuanIds").remove();

	var arr = new Array();
	var data = getJSONData("/publish/category/findCategorysByFatherId.htm", {
		fatherid : oimsCategory.HUANZHE_RESOURCES,
		tag : Math.random()
	}, "post");
	if (data.state) {
		$.each(data.obj, function(i, d) {
			arr.push({
				text : d.category,
				id : d.categoryid
			});
		});
	}
	var ff = $.textAddCommbo({
		id : "laiyuanIds",
		hiddenId : "laiyuan"
	});
	$("#laiyuanNames").append(ff.ele);
	ff.tree(arr, "laiyuanIds");
	$(".selectlist").height(90);
	$(".dataselectdrop").css("position", "absolute");
}
/**
 * 获取报告医生
 */
function getBgYsInfo() {
	$("#dataselectdrop_bgysIds").remove();
	$("#bgysIds").remove();

	var arr = new Array();
	var data = getJSONData("/publish/oims_data/findManHasSomeQX.htm", {
		quanxianID : oimsCategory.BGDOCTOR,
		tag : Math.random()
	}, "post");
	if (data.state) {
		$.each(data.obj, function(i, d) {
			arr.push({
				text : d.xingming,
				id : d.gonghao
			});
		});
	}
	var ff = $.textAddCommbo({
		id : "bgysIds",
		hiddenId : "bgys"
	});
	$("#bgysNames").append(ff.ele);
	ff.tree(arr, "bgysIds");
	$(".selectlist").height(90);
	$(".dataselectdrop").css("position", "absolute");

}

// 获得科室下的套用模版信息
function getMoBanInfo() {
	$("#dataselectdrop_mobanIds").remove();
	$("#mobanIds").remove();
	var arr = new Array();
	var data = getJSONData("/publish/oims_data/findAllbgmb.htm", {}, "post");
	if (data.state) {
		$.each(data.obj, function(i, d) {
			arr.push({
				text : d.biaoti,
				id : d.id
			});
		});
	}
	var ff = $.textAddCommbo({
		id : "mobanIds",
		hiddenId : "mobanId"
	});
	$("#mobanNames").append(ff.ele);
	ff.tree(arr, "mobanIds");
	$(".selectlist").height(90);
	$(".dataselectdrop").css("position", "absolute");
}
/**
 * 获取员工职务信息
 */
function getZhiWuInfo() {
	$("#dataselectdrop_zhiwuIds").remove();
	$("#zhiwuIds").remove();
	var arr = new Array();
	var data = getJSONData("/publish/category/findCategorysByFatherId.htm", {
		fatherid : oimsCategory.DOCTOR_JOB,
		tag : Math.random()
	}, "post");
	if (data.state) {
		$.each(data.obj, function(i, d) {
			arr.push({
				text : d.category,
				id : d.category
			});

		});
	}
	var el_OfficeIds2 = $.textAddCommbo({
		id : "zhiwuIds",
		hiddenId : "zhiwu"
	});

	$("#zhiwuNames").append(el_OfficeIds2.ele);

	el_OfficeIds2.tree(arr, "zhiwuIds");
	$(".selectlist").height(90);
	$(".dataselectdrop").css("position", "absolute");
}
/**
 * 获取检查单状态信息
 * 
 */
function getJcdStateInfo() {
	$("#dataselectdrop_stateIds").remove();
	$("#stateIds").remove();
	var arr = new Array();
	var data = getJSONData("/publish/category/findCategorysByFatherId.htm", {
		fatherid : oimsCategory.JCD_STATE,
		tag : Math.random()
	}, "post");
	if (data.state) {
		$.each(data.obj, function(i, d) {
			arr.push({
				text : d.category,
				id : d.categoryid
			});

		});
	}
	var el_OfficeIds2 = $.textAddCommbo({
		id : "stateIds",
		hiddenId : "state"
	});
	$("#stateNames").append(el_OfficeIds2.ele);
	el_OfficeIds2.tree(arr, "stateIds");
	$(".selectlist").height(90);
	$(".dataselectdrop").css("position", "absolute");
}

/**
 * 获取输入模版类别信息
 * 
 */
function getCategoryInfo() {
	$("#dataselectdrop_categoryIDS").remove();
	$("#categoryIDS").remove();
	var arr = new Array();
	var data = getJSONData("/publish/category/findCategorysByFatherId.htm", {
		fatherid : oimsCategory.WENZHENMOBAN_CATEGORY_NAME,
		tag : Math.random()
	}, "post");
	if (data.state) {
		$.each(data.obj, function(i, d) {
			arr.push({
				text : d.category,
				id : d.categoryid
			});

		});
	}
	var el_OfficeIds2 = $.textAddCommbo({
		id : "categoryIDS",
		hiddenId : "categoryId"
	});

	$("#categoryNames").append(el_OfficeIds2.ele);

	el_OfficeIds2.tree(arr, "categoryIDS");
	$(".selectlist").height(90);
	$(".dataselectdrop").css("position", "absolute");
}
/**
 * 获得疾病分类
 * 
 * @param id
 */
function getXmFl() {
	var url_findCategorysByFatherId = "/publish/category/findCategorysByFatherId.htm";// 根据fatherid查询该fatherid下所有的码表信息
	var s = $("#fatherId").val();
	$("#dataselectdrop_categoryIds").remove();
	$("#temp").remove();
	$("#categoryIds").val("");
	$("#categoryIds").remove();
	var arr = new Array();
	var data = getJSONData(url_findCategorysByFatherId, {
		fatherid : s,
		tag : Math.random()
	}, "post");// 项目归类_第二级
	if (data.state) {
		$.each(data.obj, function(i, d) {
			arr.push({
				text : d.category,
				id : d.id
			});
		});
	}
	var ff = $.textAddCommbo({
		id : "categoryIds",
		hiddenId : "categoryid"
	});
	$("#categoryNamess").append(ff.ele);
	ff.tree(arr, "categoryIds");
	$(".selectlist").height(90);
	$(".dataselectdrop").css("position", "absolute");
}
/**
 * 获取检查医生权限
 */
function getJCDoctor() {
	$("#dataselectdrop_doctorIds").remove();
	$("#doctorIds").remove();
	var arr = new Array();
	var data = getJSONData("/publish/oims_data/findManHasSomeQX.htm", {
		quanxianID : oimsCategory.JCDOCTOR,
		tag : Math.random()
	}, "post");
	if (data.state) {
		$.each(data.obj, function(i, d) {
			arr.push({
				text : d.xingming,
				id : d.gonghao
			});

		});
	}
	var el_OfficeIds2 = $.textAddCommbo({
		id : "doctorIds",
		hiddenId : "jcys"
	});

	$("#jcysNames").append(el_OfficeIds2.ele);

	el_OfficeIds2.tree(arr, "doctorIds");
	$(".selectlist").height(90);
	$(".dataselectdrop").css("position", "absolute");
}
/**
 * 获取审核医生
 */
function getShenHeInfo() {
	$("#dataselectdrop_shysIds").remove();
	$("#shysIds").remove();
	var arr = new Array();
	var data = getJSONData("/publish/oims_data/findManHasSomeQX.htm", {
		quanxianID : oimsCategory.SHDOCTOR,
		tag : Math.random()
	}, "post");
	if (data.state) {
		$.each(data.obj, function(i, d) {
			arr.push({
				text : d.xingming,
				id : d.gonghao
			});
		});
	}
	var ff = $.textAddCommbo({
		id : "shysIds",
		hiddenId : "shys"
	});
	$("#shysNames").append(ff.ele);
	ff.tree(arr, "shysIds");
	$(".selectlist").height(90);
	$(".dataselectdrop").css("position", "absolute");
}
/**
 * 每次刷新时清空当前页数据
 * 
 */
function cleanAll() {
	// $.each($("select"), function(i, v) {
	// $(v)[0].options.length = 0;
	// });
	$.each($('input[type=checkbox]'), function(i, v) {
		$(v).val("");
	});

	// $("#bgsId")[0].options.length = 0;
	$.each($("textarea"), function(i, v) {
		$(v).val("");
	});
	$.each($('input[type=radio]'), function(i, v) {
		$(v).attr("checked", false);
	});
	$.each($('input[type=text]'), function(i, v) {
		$(v).val("");
	});
};
// 重置函数定义
function resetWinData() {
	$("#bumenIds").val("");
	$("#zhiwuIds").val("");
	$("#roleIds").val("");
	$("#laiyuanIds").val("");
	$("#jcxmids").val("");
	$("#shebeiIds").val("");
	$("#stateIds").val("");
	$("#doctorIds").val("");
	$("#categoryIDS").val("");
	$("#bgysIds").val("");
	$("#shysIds").val("");
	$("#mobanIds").val("");
	$.each($("select"), function(i, v) {
		$(v)[0].options.length = 0;
	});
	$.each($('input[type=checkbox]'), function(i, v) {
		$(v).attr("checked", false);
	});

	$.each($('input[type=text]'), function(i, v) {
		$(v).val("");
	});
	$.each($('input[type=radio]'), function(i, v) {
		$(v).attr("checked", false);
	});
	$.each($("textarea"), function(i, v) {
		$(v).val("");
	});
}
function getDataPageSize_gbq(divHeight) {
	var mainBodyHeight;
	var bannerHeight = $("#header").outerHeight();
	var bottomHeight = $("#footer").outerHeight();
	var winHeight = $(window).height();
	var bodyHeight = winHeight - bannerHeight - bottomHeight - divHeight;
	mainBodyHeight = bodyHeight;
	var h = mainBodyHeight - 100;
	return Math.floor(h / 25);
}
// 加载底色
function omis_JiaZaiExport() {
	var innerHtml = '<div id = "processId" style = "top: 0px;left: 0px;position: absolute;width: 100%;height: 100%;z-index: 29;background-color: rgb(204, 204, 204);opacity: 0.6;"><table border="0" cellspacing="0" cellpadding="0" width="100%" height="100%">'
			+ '<tr>'
			+ '<td align="center" valign="middle" style ="font-size: 20px;font-weight: bolder;color:red;">'
			+ '&nbsp;&nbsp;'+data_language.Processing+'……' + '</td>' + '</tr>' + '</table><div>';
	$(document.body).append(innerHtml);
}