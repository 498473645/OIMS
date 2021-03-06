var TEMPLATE_FIXEDASSETS_SEARCH_URL = "/js/manager/fixedAssets/template/fixedSearch.html"; // 高级查询HTML
var TEMPLATE_FIXEDASSETS_URL = "/js/manager/fixedAssets/template/fixedAssets.html"; // 资产信息HTML
var TEMPLATE_RECORD_URL = "/js/manager/fixedAssets/template/record.html"; // 维护记录HTML
var FIND_FIXEDASSETS_SEARCH_URL = "/publish/fixedAssets/findFixedAssets.htm"; // 高级分页查询固定资产
var SAVEORUPDATE_FIXEDASSETS_URL = "/publish/fixedAssets/saveOrUpdateFixedAssets.htm"; // 保存或更新固定资产信息
var GET_FIXEDASSETSBYID_URL = "/publish/fixedAssets/getFixedAssetsById.htm"; // 通过ID号获取资财信息
var SET_SCRAPFLAG_URL = "/publish/fixedAssets/setScrapFlag.htm"; // 设置报废状态
var FIND_FIXEDASSETSINMAINTAINTIME_URL = "/publish/fixedAssets/findFixedAssetsInMaintainTime.htm"; // 查询进入维护期的资产
var SAVEORUPDATE_MAINTAINRECORD_URL = "/publish/fixedAssets/saveOrUpdateMaintainRecord.htm"; // 保存维护记录
var FIND_MAINTAINRECORDS_URL = "/publish/fixedAssets/findMaintainRecords.htm"; // 获取设备的维护记录
var DEL_FIXEDASSETSBYID_URL = "/publish/fixedAssets/delFixedAssetsById.htm"; // 删除设备资产信息
var DEL_MAINTAINRECORDBYID_URL = "/publish/fixedAssets/delMaintainRecordById.htm"; // 删除资产维护信息
var GET_MAINTAINRECORD_URL = "/publish/fixedAssets/getMaintainRecordById.htm"; // 通过ID号获取资财信息

var FIND_ALLBUMEN_URL = "/publish/bumen/findAllBuMen.htm";// 查询所有部门
var FIND_DEPT_STAFF_URL = "/publish/yuangong/findYuangongByBumenId.htm";// 根据部门ID查询员工信息va
var fixed_yg=[{'gonghao':'','xingming':''},{'gonghao':'0014','xingming':'李国琴'},{'gonghao':'0027','xingming':'李家琴'},{'gonghao':'0076','xingming':'姜安丽'},{'gonghao':'0026','xingming':'付敏'},{'gonghao':'0349','xingming':'罗启惠'},{'gonghao':'0046','xingming':'张敏芳'},{'gonghao':'0034','xingming':'黄艳'},{'gonghao':'0404','xingming':'翁传煌'},{'gonghao':'0335','xingming':'罗达'}];
function showFixedAssetsList(btns) {
	pageTitle = "固定资产管理";
	init();
	var advqueryDiv = $("<div/>").attr("id", "advquery").addClass("advquery")
			.appendTo("#right");
	var yuangongTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='18%' class='leftalign' ><input name='search' type='text' class='blurview' id='search' onfocus=\"this.className='focus'\"  onblur=\"this.className='blur'\" value='"
			+ "请输入资财名称或资产编号"
			+ "' size='28' /></td>"
			+ "<td width='7%'><a  href='javascript:seniorFaSearchSubmit();' class='search' >"
			+ "查询"// 查询
			+ "</a></td>"
			+ "<td width='9%'><a  href='javascript:advSearchFixedAssets();' class='advsearch'>"
			+ "高级查询"// 高级查询
			+ "</a></td>" + "<td width='59%' >" + "<div class='btn' id='btn'>"
			// + "<a onclick='return false;'><span class='adda'></span>"
			// + "新增"// 新增
			// + "</a>"
			// + "<a href='javascript:updateFixedAssetsForm();' onclick='return
			// false;'><span class='edita'></span>"
			// + "修改"// 修改
			// + "</a>"
			// + "<a href='javascript:delFixedAssetsForm();' onclick='return
			// false;'><span
			// class='dela'></span>"
			// + "删除"//删除
			// + "</a>"
			// + "<a href='javascript:setScrapFixedAssetsForm();'
			// onclick='return
			// false;'><span class='prohibita'></span>"
			// + "报废"// 报废
			// + "</a>"
			// + "<a href='javascript:removeScrapFixedAssetsForm();'
			// onclick='return false;'
			// style='width:80px;'><span class='starta'></span>"
			// + "解除报废"// 解除报废
			// + "</a>"
			// + "<a href='javascript:addMaintainRecord();' onclick='return
			// false;'style='width:100px;'><span class='adda'></span>"
			// + "新增维护记录"// 新增维护记录
			// + "</a>"
			// + "<a
			// href='javascript:maintainRecord();'style='width:80px;'><span
			// class='viewa'></span>"
			// + "维护记录"// 维护记录
			// + "</a>"
//			 + "<a
//			 href='javascript:importExcel();><span
//			 class='importa'></span>"
//			 + "导入"// 导入
//			 + "</a>"
//			 + "<a
//			 href='javascript:exportExcel();><span
//			 class='exporta'></span>"
//			 + "导出"// 导出
//			 + "</a>"
			+ "</div>" + "</td>" + "</tr>" + "</table>";
	$(yuangongTemplate).appendTo(advqueryDiv);
	showMyBTNS(btns, $("#btn"));
	$(".start").parent("a").width(80);
	$(".view").parent("a").width(80);
	$(".dpersonnel").parent("a").width(100);
	
	$("#search").click(function() {
		clearInitQuery(this);
	}).blur(function() {
		if (this.value == "") {
			$(this).val("请输入资财名称或资产编号");
			$(this).addClass("blurview");
		}
	});
	showList_FixedAssets();
}
/**
 * 填充高级查询的弹框
 */
function advSearchFixedAssets() {
	var html;
	$.ajax({
		url : contextPath + TEMPLATE_FIXEDASSETS_SEARCH_URL + "?tag="
				+ Math.random(),
		async : false,
		type : "POST",
		success : function(t) {
			html = t;
		}
	});
	$.oimsBox({
		parentDiv : "advquery",// 将生成内容添加的id
		divContent : html
	});
	calendarFun("nextMaintenanceDate");
	calendarFun("purchaseOrderDateStart");
	calendarFun("purchaseOrderDateEnd", -80);
}
/**
 * 高级查询提交
 */
function seniorFaSearchSubmit() {
	var scrapFlag = "";
	$("input[name='search_scrapFlag']:checked").each(function() {
		scrapFlag = $(this).val();
	});

	var data_search = {
		search : $("input[name='search']").val().indexOf("请输入") != -1 ? "" : $(
				"input[name='search']").val(),
		name : $("input[name='search_name']").length == 1 ? $("input[name='search_name']")
				.val() : "",
		flowerNo : $("input[name='search_flowerNo']").length == 1 ? $(
				"input[name='search_flowerNo']").val() : "",
		sn : $("input[name='search_sn']").length == 1 ? $("input[name='search_sn']").val()
				: "",
		manufacturer : $("input[name='search_manufacturer']").length == 1 ? $(
				"input[name='search_manufacturer']").val() : "",
		contacts : $("input[name='search_contacts']").length == 1 ? $(
				"input[name='search_contacts']").val() : "",
		mobile : $("input[name='search_mobile']").length == 1 ? $(
				"input[name='search_mobile']").val() : "",
		priceMin : $("input[name='search_priceMin']").length == 1 ? $(
				"input[name='search_priceMin']").val() : "",
		priceMax : $("input[name='search_priceMax']").length == 1 ? $(
				"input[name='search_priceMax']").val() : "",
		scrapFlag : scrapFlag,
		mail : $("input[name='search_mail']").length == 1 ? $("input[name='search_mail']")
				.val() : "",
		nextMaintenanceDate : $("input[name='search_nextMaintenanceDate']").length == 1 ? $(
				"input[name='search_nextMaintenanceDate']").val()
				: "",
		operator : $("input[name='search_operator']").length == 1 ? $(
				"input[name='search_operator']").val() : "",
		purchaseOrderDateStart : $("input[name='search_purchaseOrderDateStart']").length == 1 ? $(
				"input[name='search_purchaseOrderDateStart']").val()
				: "",
		purchaseOrderDateEnd : $("input[name='search_purchaseOrderDateEnd']").length == 1 ? $(
				"input[name='search_purchaseOrderDateEnd']").val()
				: "",
		sysm : $("input[name='sysm']").val()
	};
	$.extend(listFactor.data, data_search);
	$("#pageList").createPageList(listFactor);
}
/**
 * 高级查询重置
 */
function seniorFaSearchReset() {
	$("input[name='search']").val("请输入资财名称或资产编号查询");
	$("input[name='search_name']").val("");	
	$("input[name='search_flowerNo']").val("");	
	$("input[name='search_sn']").val("");	
	$("input[name='search_manufacturer']").val("");	
	$("input[name='search_contacts']").val("");	
	$("input[name='search_mobile']").val("");	
	$("input[name='search_priceMin']").val("");	
	$("input[name='search_priceMax']").val("");	
	$("input[name='search_mail']").val("");	
	$("input[name='search_nextMaintenanceDate']").val("");	
	$("input[name='search_operator']").val("");	
	$("input[name='search_purchaseOrderDateStart']").val("");	
	$("input[name='search_purchaseOrderDateEnd']").val("");	
	$("#search_scrapFlag").attr("checked","checked");
}
/**
 * 显示列表
 */
function showList_FixedAssets() {
	listFactor =  {
		listObj : [ {
			title : "编号",// 资产编号
			key : "flowerNo"
		}, {
			title : "名称",// 名称
			key : "name"
		}, {
			title : "凭证号",// 所属科室
			key : "voucherNo"
		}, {
			title : "使用地点",// 使用部门
			key : "local"
		}, {
			title : "采购价格",// 采购价格
			key : "price"
		}, {
			title : "安装日期",// 采购价格
			key : "setupDate",
			func:function(v){
				return v?formatDate(v.time):"-";
			}
		}, {
			title : "使用年限",// 设备管理员
			key : "setupDate",
			func:function(v){
				return v?getAge(v.time):"-"
			}
		}, {
			title : "制造商",// 制造商
			key : "manufacturer"
		}, {
			title : "供货商",// 制造商联系人
			key : "supplier"
		}, 
//		{
//			title : "电话",// 电话
//			key : "tel"
//		},
		{
			title : "状态",// 电话
			key : "scrapFlag",
			func : function(v) {
				if (v)
					return "报废";
				else
					return "正常";
			}
		} ],
		url : contextPath + FIND_FIXEDASSETS_SEARCH_URL,
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			tag : Math.random()
		}
	};
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#right");
	$(div_list).createPageList(listFactor);
}

// 新增
function addFixedAssetsForm() {
	var setting = {
		width : 700,
		height : 450,
		title : "新增固定资产信息",
		submitCallBack : function(data) {
			seniorFaSearchSubmit();
		},
		templateUrl : TEMPLATE_FIXEDASSETS_URL,
		action : SAVEORUPDATE_FIXEDASSETS_URL
	};
	showFormDialog(setting);
	// 初始化数据
	fixedAssets_getBuMenInfo();
	calendarFun("purchaseOrderDate");
	calendarFun("setupDate");
	calendarFun("nextMaintenanceDate");
}

// 获得所有部门信息
function fixedAssets_getBuMenInfo(deptId) {
	$("select[name='deptId']")[0].options.length = 0;
	$("<option/>").appendTo("select[name='deptId']");
	var data = getJSONData(FIND_ALLBUMEN_URL, {
		tag : Math.random()
	}, "post");
	if (data.state) {
		$.each(data.obj, function(i, d) {
			$("<option/>").val(d.id).text(d.bmmc).appendTo(
					"select[name='deptId']")
		});
	}
//	if (deptId != null && deptId != undefined) {
		$("select[name='operator']")[0].options.length = 0;
//		var re = getJSONData(FIND_DEPT_STAFF_URL, {
//			deptId : deptId
//		}, "POST");
//		if (!re.state)
//			return;
		$.each(fixed_yg, function(i, d) {
			$("<option/>").val(d.gonghao).text(d.xingming).appendTo(
					"select[name='operator']");
		});
//	}

//	$("select[name='deptId']").change(
//			function() {
//				$("select[name='operator']")[0].options.length = 0;
//				var re = getJSONData(FIND_DEPT_STAFF_URL, {
//					deptId : $(this).val()
//				}, "POST");
//				if (!re.state)
//					return;
//				$.each(re.obj, function(i, d) {
//					$("<option/>").val(d.gonghao).text(d.xingming).appendTo(
//							"select[name='operator']");
//				});
//			});
}

// 修改
function updateFixedAssetsForm() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择一个您需要修改的资产信息！");
		return;
	}
	if(dataObjects.length>1){
		$.oimsAlert("只能选择一个进行修改！");
		return;
	}
	var objData = dataObjects[0];
	var setting = {
		width : 700,
		height : 450,
		title : "修改固定资产信息",
		submitCallBack : function(data) {
			seniorFaSearchSubmit();
		},
		templateUrl : TEMPLATE_FIXEDASSETS_URL,
		action : SAVEORUPDATE_FIXEDASSETS_URL
	};
	showFormDialog(setting);
	// 初始化数据
	fixedAssets_getBuMenInfo(objData.deptId);
	fillFormWithData($(".opencontent form"), objData)
	// 填充时间
	if(objData.purchaseOrderDate){
		$("input[name='purchaseOrderDate']").val(
				formatDate(objData.purchaseOrderDate.time));
	}
	if(objData.setupDate){
		$("input[name='setupDate']").val(formatDate(objData.setupDate.time));
	}
	if(objData.nextMaintenanceDate){
		$("input[name='nextMaintenanceDate']").val(
				formatDate(objData.nextMaintenanceDate.time));
	}
	calendarFun("purchaseOrderDate");
	calendarFun("setupDate");
	calendarFun("nextMaintenanceDate");
}

// 删除
function delFixedAssetsForm() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要修改的资产信息");
		return;
	}
	var objData = dataObjects[0];
	$.oimsConfirm({
		strTitle : '确定删除该资产信息以及维护信息吗？'
	}, function() {
		var data = getJSONData(DEL_FIXEDASSETSBYID_URL, {
			id : objData.id,
			tag : Math.random()
		}, "post");
		if (data.state) {
			$.oimsSucc("删除成功！");
			seniorFaSearchSubmit();
		} else {
			$.oimsError("删除失败！");
		}
	});
}

// 报废
function setScrapFixedAssetsForm() {
	setScrapscrapFlagFixedAssets(true);
}

// 解除报废
function removeScrapFixedAssetsForm() {
	setScrapscrapFlagFixedAssets(false);
}

/**
 * 设置报废状态
 * 
 * @param scrapFlag
 *            true 报废/false 解除
 */
function setScrapscrapFlagFixedAssets(scrapFlag) {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要设置的资产信息");
		return;
	}
	var objData = dataObjects[0];
	var data = getJSONData(SET_SCRAPFLAG_URL, {
		id : objData.id,
		scrapFlag : scrapFlag,
		tag : Math.random()
	}, "post");
	if (data.state && data.obj) {
		$.oimsSucc("设置成功！");
		seniorFaSearchSubmit();
	} else {
		$.oimsError("设置失败！");
	}
}

// 新增维护记录
function addMaintainRecord() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要添加的资产信息");
		return;
	}
	var objData = dataObjects[0];
	objData["fixedAssetsId"] = objData.id;
	objData["id"] = undefined;
	var setting = {
		width : 800,
		height : 270,
		title : "新增维护记录",
		submitCallBack : function(data) {
			seniorFaSearchSubmit();
			$.oimsSucc("添加成功!");
		},
		templateUrl : TEMPLATE_RECORD_URL,
		action : SAVEORUPDATE_MAINTAINRECORD_URL,
		formData : objData
	};
	showFormDialog(setting);
	if(objData.nextMaintenanceDate){
		$("#nextMaintenanceDate").val(formatDate(objData.nextMaintenanceDate.time));
	}
	$("#maintainDate").val(getDateNow());
	calendarFun("maintainDate");
	calendarFun("nextMaintenanceDate");
}

// 维护记录
var objData;
function maintainRecord() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要查看的的资产信息");
		return;
	}
	objData = dataObjects[0];
	objData["fixedAssetsId"] = objData.id;
	objData["id"] = undefined;
var div = $("<div />").attr("id","maintainRecordDiv");
if(showMaintainRecord(div)){
	var dialog =$(div)
	.oimsDialog(
			{
				title : "查询",
				width : 950,
				icon : 'view',
				height : 280,
				drag : false,
				locked : true,
				winType : 4,
				button : [
						{
							title : "修改",
							func : function() {
								$("#rightContentForm")
										.attr(
												"action",
												contextPath
														+ SAVEORUPDATE_MAINTAINRECORD_URL)
										.attr("method", "POST");
								ajaxForm({
									form : $("#rightContentForm"),
									errorFn : function(XmlHttpRequest,
											textStatus, errorThrown) {
										$.oimsError("提交失败！");
									},
									successFn : function(data) {
										if (data.state) {
											$.oimsSucc("修改成功！");
										} else {
											$.oimsSucc("修改失败！");
										}
									}
								});
							},
							isCloseWin : false,
							className : "edit"
						},
						{
							title : "删除",
							func : function() {
								$("#rightContentForm")
										.attr(
												"action",
												contextPath
														+ DEL_MAINTAINRECORDBYID_URL)
										.attr("method", "POST");
								ajaxForm({
									form : $("#rightContentForm"),
									errorFn : function(XmlHttpRequest,
											textStatus, errorThrown) {
										$.oimsError("提交失败！");
									},
									successFn : function(data) {
										if (data.state) {
											$.oimsSucc("删除成功！");
											if(showMaintainRecord($("#maintainRecordDiv"))){
												$("#leftMenu ul li:eq(0)").click();
											}else{
												dialog.close();
												$.oimsAlert("该资产已无维护记录！");
												seniorFaSearchSubmit();
											}
										} else {
											$.oimsSucc("删除失败！");
										}
									}
								});
							},
							isCloseWin : false,
							className : "del"
						} ]
			});
$("#leftMenu").css({
"overflow" : "auto"
}).height(($(".opencontent").height()));
$("#leftMenu ul li:eq(0)").click();
}else{
	$.oimsAlert("该资产没有维护记录");
}
}
//导入固定资产报表
function importExcel(){
	importJS("/js/manager/data/dataLanguage.js");
	loadJsAndCss_Data();

	var table_import_fixedAssets = " <table width='100%' border='0' cellspacing='0' cellpadding='0' class='dataexportable'> "
		+ "<tr>   "
		+ "<td  align='left' style='padding-left:10px;width:275px' >"
		+ "<div class='searchfile'>"
		+ "<input type='file' name='url_file' id ='url_file' class='filed' />"
//		+ "<div class='fieldstylebig'><input type='text'readonly='readonly' name='txt_fieldstyle' id='txt_fieldstyle' class='fieldtext'/></div>"
//		+ "<div class='buttonstylebig'><input type='button'  id='btn_yuyan' class='fieldbutton'/></div>"
		+ "</div>"
		+ "</td>"
		+ "<td  nowrap='nowrap' class='idname'>"
		+ "<a href=\"javascript:importFixedAssetsOpenWin('form_import_fixedAssets')\" class='btnone'>"
		+ "<span class='reset'></span>"
		+ data_language.Import
		+ "</a></td>"
		+ "</tr> " + "</table>";
	var form_import_fixedAssets = $("<form/>").attr("id", "form_import_fixedAssets")
			.attr("action",
					contextPath + "/publish/fixedAssets/importExcel.htm")
			.attr("enctype", "multipart/form-data").attr("method", "post");
	form_import_fixedAssets.append(table_import_fixedAssets);
	var div = $("<div/>").attr("id", "importDiv").appendTo("body");
	$(form_import_fixedAssets).appendTo("#importDiv");
	// 弹出对话框
	var dialog = $(div).oimsDialog({
		winType : 4,
		icon : "openexport",
		title : "报表导入",
		drag : false,
		locked : true,
		width : "450",
		height : "230"
	});
	form_import_fixedAssets.ajaxForm({
		
	})

}
/**
 * 导入弹出窗口
 */
function importFixedAssetsOpenWin(form_id) {

	$("#" + form_id).ajaxForm(
			{
				beforeSend : CheckOpenFile,
				uploadProgress : function() {
				},
				complete : function(data_Result) {
					var data_pre = data_Result.responseText;
					
					console.log(data_pre);
					
					var data_string = "";
					if (data_pre.indexOf("</pre") == -1)
						data_string = data_pre;
					else
						data_string = data_pre.substring(data_pre.indexOf("{"),
								data_pre.indexOf("</pre"));
					var data_Obj = eval("(" + data_string + ")");
					
					var state = data_Obj.state;
					if (state == 1) {
						var vs = data_Obj.obj;
						
						$.oimsSucc("文件中共有条"+vs[0]+"条数据，成功导入"+vs[1]+"条");
						removeDiv_openWin();
						showList_FixedAssets();
					} else if (state == 0) {
						$.oimsAlert(data_language.HasWrongData);
					}
				}
			});
	$("#" + form_id).submit();
}
//判断文件类型
function CheckOpenFile() {
	if ($("#url_file").val() == "") {
		$.oimsAlert("请选择需要导入的文件！");
		return false;
	}
	var stuff = $("#url_file").val().toLocaleLowerCase().indexOf(".xlsx");
	var stvff = $("#url_file").val().toLocaleLowerCase().indexOf(".xls");
	if ((stuff == -1) && (stvff == -1)) {
		$.oimsAlert("要导入的文件不是Excel文件！");
		return false;
	}
	return true;
}
//导出固定资产报表
function exportExcel(){
	var search_date = fixedAssets_date();
	var fixedAssets_dates = $.extend(listFactor.data, search_date);
	var exportExecel_url = "/publish/fixedAssets/exportExecel.htm"; 
	var exportExecel_data = getJSONData(exportExecel_url,fixedAssets_dates, "POST");
	if(exportExecel_data.state){
		location.href = contextPath + exportExecel_data.obj;
	}else{
		$.oimsError("导出失败！");
	}
}
function fixedAssets_date(){
	var search_date = {};
	var search = $("input[name='search']").val().indexOf("请输入") != -1 ? "": $("#search").val();
	var category = $("input[name='category']").length == 1 ? $("input[name='category']").val() : "";// 资产类别
	var flowerNo = $("input[name='flowerNo']").length == 1 ? $("input[name='flowerNo']").val() : "";// 资产编号
	var name = $("input[name='name']").length == 1 ? $("input[name='name']").val() : "";// 名称
	var guige = $("input[name='guige']").length == 1 ? $("input[name='guige']").val() : "";// 规格
	var xinghao = $("input[name='xinghao']").length == 1 ? $("input[name='xinghao']").val() : "";// 型号
	var danwei = $("input[name='danwei']").length == 1 ? $("input[name='danwei']").val() : "";// 单位
	var price = $("input[name='price']").length == 1 ? $("input[name='price']").val() : "";// 单价
	var num = $("input[name='num']").length == 1 ? $("input[name='num']").val() : "";// 数量
	var money = $("input[name='money']").length == 1 ? $("input[name='money']").val() : "";// 金额
	var department = $("input[name='department']").length == 1 ? $("input[name='department']").val() : "";// 所属单位
	var userDepartment = $("input[name='userDepartment']").length == 1 ? $("input[name='userDepartment']").val() : "";// 使用单位
	var scrapFlag = $("input[name='scrapFlag']").length == 1 ? $("input[name='scrapFlag']").val() : "";// 状态
	var yongtu = $("input[name='yongtu']").length == 1 ? $("input[name='yongtu']").val() : "";// 用途
	var local = $("input[name='local']").length == 1 ? $("input[name='local']").val() : "";// 所在位置
	var operator = $("select[name='operator']").length == 1 ? $("select[name='operator']:checked").val() : "";// 保管人
	var detalieduse = $("input[name='detalieduse']").length == 1 ? $("input[name='detalieduse']").val() : "";// 详细用途
	var information = $("input[name='information']").length == 1 ? $("input[name='information']").val() : "";// 备注
	search_date = {
			search : search,
			category : category,// 资产类别
			flowerNo : flowerNo,// 资产编号
			name : name,// 名称
			guige : guige,// 规格
			xinghao : xinghao,// 型号
			danwei : danwei,// 单位
			price : price,//单价
			num : num,//数量
			money : money,//金额
			department : department,// 所属单位
			userDepartment : userDepartment,// 使用单位
			scrapFlag : scrapFlag,// 状态
			yongtu : yongtu,// 用途
			local : local,// 所在位置
			operator : operator,// 保管人
			detalieduse : detalieduse,// 详细用途
			information : information,//备注
		};
		return search_date;
	
}
/********************** 报表的导入导出******************************/
function showMaintainRecord(div) {
	var data = getJSONData(FIND_MAINTAINRECORDS_URL, {
		fixedAssetsId : objData.fixedAssetsId,
		tag : Math.random()
	}, "POST");
	if (data.state && data.obj.length > 0) {
		var maintainRecord = $("<div />").addClass("qybl").attr("id",
			"maintainRecord");
		var ul = $("<ul />").appendTo(
			$("<div id='leftMenu' />").attr("style", "width:20%;float:left;")
					.appendTo(maintainRecord));
		$("<div id='rightContent' />").attr("style",
			"float:left;text-align:left;overflow:auto;width:79%;").appendTo(
					maintainRecord);
		var html;
		$.ajax({
			url : contextPath + TEMPLATE_RECORD_URL + "?tag=" + Math.random(),
			async : false,
			type : "POST",
			success : function(t) {
				html = t;
			}
		});
		$.each(data.obj, function(index, d) {
			var maintainDate = d.maintainDate;
			var li = $("<li><a>" + (maintainDate?formatDate(maintainDate.time):'') + "</a></li>")
					.appendTo(ul);
			$("<input />").attr("type", "hidden").appendTo(li).val(d.id);
			li.click(function() {
				var rc_data = getJSONData(GET_MAINTAINRECORD_URL, {
					id : $(this).find("input").val(),
					tag : Math.random()
				}, "POST");
				$("#rightContent").text("");
				$("<form />").attr("id", "rightContentForm").appendTo(
						"#rightContent").append(html);
				$($(this).siblings()).find("a").removeClass("on");
				$(this).find("a").addClass("on");
				fillFormWithData($("#rightContent"), objData);
				fillFormWithData($("#rightContent"), rc_data);
				if(objData.nextMaintenanceDate){
					$("#nextMaintenanceDate").val(
							formatDate(objData.nextMaintenanceDate.time));
				}
				if(rc_data.maintainDate){
					$("#maintainDate").val(formatDate(rc_data.maintainDate.time));
				}
				calendarFun("maintainDate");
				calendarFun("nextMaintenanceDate");
			});
		});
		$(div).text("").append(maintainRecord);
		return true;
	} else {
		return false;
	}
}
