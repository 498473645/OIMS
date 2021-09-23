// 科室管理首次加载的方法(整理)
function showBuMenList(btns) {
	pageTitle = "科室管理";// 科室信息
	init();
	$("<div/>").attr("id", "advquery").addClass("advquery").appendTo("#right");
	var bumenTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='23%' class='leftalign' ><input name='search_bmmc_lxr' type='text' class='blurview' id='search_bmmc_lxr' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"
			+ "请输入科室名称或负责人姓名"
			+ "' size='28' /></td>"
			+ "<td width='7%'><a  href='javascript:queryBumen();' class='search'>"
			+ "查询"
			+ "</a></td>"// 查询
			+ " <td width='9%'></td>"
			+ "<td width='59%' >"
			+ "<div class='btn'>"
			+ "<a  href='javascript:addBuMenForm();' onclick='return false;'><span class='adda'></span>"
			+ "新增"
			+ "</a>"// 新增
			+ "<a  href='javascript:updateBuMenForm();' onclick='return false;'><span class='edita'></span>"
			+ "修改"
			+ "</a>"// 修改
			+ "<a  href='javascript:delBuMen();' onclick='return false;'><span class='dela'></span>"
			+ "删除" + "</a>"// 删除
			+ "</div>" + "</td>" + "</tr>" + "</table>";
	$(bumenTemplate).appendTo("#advquery");
	btnProwerConfig(btns);// 按钮加上权限
	$("#search_bmmc_lxr").click(function() {
		clearInitQuery(this);
	});
	$("#search_bmmc_lxr").blur(function() {
		if (this.value == "") {
			$("#search_bmmc_lxr").val("请输入科室名称或负责人姓名");// 请输入科室名称或负责人姓名
			$("#search_bmmc_lxr").addClass("blurview");
		}
	});
	$("#search_bmmc_lxr").bind("keyup", function(e) {
		if (e.which == 13) {
			queryBumen();
		}
	});
	listFactor = {
		listObj : [ {
			title : "序号",// 序号
			key : "id"
		}, {
			title : "科室编码",// 科室编码
			key : "bmbm"
		}, {
			title : "科室名称",// 科室名称
			key : "bmmc"
		}, {
			title : "负责人",// 负责人
			key : "lxr"
		}, {
			title : "联系电话",// 联系电话
			key : "lxdh"
		} ],
		url : contextPath + "/publish/bumen/getBumenList.htm",// url
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
// 查询方法（整理）
function queryBumen() {
	var obj = {
		search : $("#search_bmmc_lxr").val().indexOf("请输入") != -1 ? "" : $(
				"#search_bmmc_lxr").val()
	};
	$.extend(listFactor.data, obj);
	$("#pageList").createPageList(listFactor);
}
// 部门信息新增(整理)
function addBuMenForm() {
	var addBuMenTable = "";
	addBuMenTable += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td align='right'>"
			+ "科室名称"
			+ ":</td>"// 科室名称
			+ "<td align='left'><input type='text' name='bmmc' id='bmmc' onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur'  /></td>"
			+ " <td width='2%'><span class='required'>*</span></td>"
			+ "<td width='9%' align='right'>"
			+ "科室编码"
			+ ":</td>"// 科室编码
			+ "<td width='23%'><input type='text' name='bmbm' id='bmbm' onblur=\"this.className='blur';checkIsStrEmpty(this);\"  onfocus=\"this.className='focus'\"  class='blur' /></td>"
			+ " <td width='2%'><span class='required'>*</span></td>"
			+ "<td width='9%' align='right'>"
			+ "负责人"
			+ ":</td>"// 负责人
			+ " <td width='23%'><input type='text' name='lxr'  id='lxr'  onblur=\"this.className='blur';checkIsStrEmpty(this);\"  onfocus=\"this.className='focus'\" class='blur'/></td>"
			+ " <td width='2%'><span class='required'>*</span></td>"
			+ "</tr>"
			+ " <tr>"
			+ "<td align='right'>"
			+ "所属单位"
			+ ":</td>"// 所属单位
			+ "<td align='left'><select name='dwid' id='dwid'  onblur=\"this.className='blur';checkIsStrEmpty(this);\">"
			+ "<option value=''></option>"
			+ " </select></td>"
			+ " <td width='2%'><span class='required'>*</span></td>"
			+ "<td align='right'  nowrap='nowrap'>"
			+ "下属办公室"
			+ ":</td>"// 下属办公室
			+ "<td align='left' id='officeNames'>"
			+ "<td align='left' style ='display:none'><input type='hidden' name='officeId' id='officeId'/></td>"
			+ " </td>"
			+ "<td width='2%'><span class='required'>*</span></td>"
			+ "<td align='right' >"
			+ "联系电话"
			+ ":</td>"// 联系电话
			+ "<td><input type='text' name='lxdh' id='lxdh'  onblur=\"this.className='blur';checkIsTel(this);\" onfocus=\"this.className='focus'\" class='blur'  /></td>"
			+ "<td width='2%'></td>"
			+ " </tr>"
			+ " <tr>"
			+ "</tr>"
			+ " <tr>"
			+ "<td align='right'>"
			+ "业务范围"
			+ ":</td>"// 业务范围
			+ "<td colspan='7' align='left'><textarea name='ywfw' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' id='ywfw' cols='45' rows='4'></textarea></td>"
			+ "</tr>" + "<tr><td colspan='8'></td></tr>" + "</table>";
	var form_addBuMenForm = oimsFormWindow({
		id : "form_addBuMenForm",
		url : contextPath + "/publish/bumen/addBuMen.htm",
		height : 300,
		width : 900,
		resetForm : reset_form_addBuMenForm,
		btnOkSuccess : function(data, responseText, statusText) {
			if (data.state) {
				$.oimsSucc("部门信息新增成功", function() {
					queryBumen();
					removeDiv_openWin();
				});
			} else {
				$.oimsError("部门信息新增失败", function() {
					queryBumen();
					removeDiv_openWin();
				});
			}
		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
			$.oimsError("部门信息新增失败", function() {
				queryBumen();
				removeDiv_openWin();
			});
		},
		btnOkBefor : validate_form_addBuMenForm
	});
	// form元素 --单位信息
	form_addBuMenForm.append(addBuMenTable);
	getBgs3Info();// 获得所有办公室信息
	// 为所属单位赋值
	var date = getJSONData("/publish/danwei/findAllDanWei.htm", {
		tag : Math.random()
	}, "post");
	if (date.state) {
		$.each(date.obj, function(i, d) {
			$("<option value=" + d.id + ">" + d.dwmc + "</option>").appendTo(
					"#dwid");
		});
	}
}
// 部门信息新增表单重置(整理)
function reset_form_addBuMenForm() {
	$("#bmmc").val("");// 部门名称
	$("#bmbm").val("");// 部门编码
	$("#lxr").val("");// 联系人
	$("#dwid").val("");// 所属单位
	$("#officeId").val("");// 下属办公室隐藏域
	$("#bgsIds").val("");// 下属办公室
	$("#lxdh").val("");// 联系电话
	$("#ywfw").val("");// 业务范围
}

// 获得所有办公室信息(整理)
function getBgs3Info() {
	$("#dataselectdrop_bgsIds").remove();
	$("#bgsIds").remove();
	var arr = new Array();
	var data = getJSONData("/publish/bangongshi/findAllBanGongShi.htm", {},
			"post");
	if (data.state) {
		$.each(data.obj, function(i, d) {
			arr.push({
				text : d.bgs,
				id : d.id
			});
		});
	}
	var ff = $.textAddCommbo({
		id : "bgsIds",
		hiddenId : "officeId"
	});
	$("#officeNames").append(ff.ele);
	ff.tree(arr, "bgsIds");
	$(".selectlist").height(90);
	$(".dataselectdrop").css("position", "absolute");
}

// 部门信息新增表单验证方法(整理)
function validate_form_addBuMenForm() {
	var oValidataData = {
		nullValidataData : {
			'bmmc' : '科室名称不能为空',
			'bmbm' : '科室编码不能为空',
			'lxr' : '负责人不能为空',
			'dwid' : '所属单位不能为空',
			'officeId' : '下属办公室不能为空'
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);// 带*为必填项
		return false;
	}
}

// 科室信息修改(整理)
function updateBuMenForm() {
	var updateBuMenTable = "";
	updateBuMenTable += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<input type ='hidden' id='id' name ='id'>"// 隐藏域主键ID
			+ "<tr>"
			+ "<td align='right'>"
			+ "科室名称"// 科室名称
			+ ":</td>"
			+ "<td align='left'><input type='text' name='bmmc' id='bmmc' onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur'  /></td>"
			+ " <td width='2%'><span class='required'>*</span></td>"
			+ "<td width='9%' align='right'>"
			+ "科室编码"// 科室编码
			+ ":</td>"
			+ "<td width='23%'><input type='text' name='bmbm' id='bmbm' onblur=\"this.className='blur';checkIsStrEmpty(this);\"  onfocus=\"this.className='focus'\"  class='blur' /></td>"
			+ " <td width='2%'><span class='required'>*</span></td>"
			+ "<td width='9%' align='right'>"
			+ "负责人"// 负责人
			+ ":</td>"
			+ " <td width='23%'><input type='text' name='lxr'  id='lxr'  onblur=\"this.className='blur';checkIsStrEmpty(this);\"  onfocus=\"this.className='focus'\" class='blur'/></td>"
			+ " <td width='2%'><span class='required'>*</span></td>"
			+ "</tr>"
			+ " <tr>"
			+ "<td align='right'>"
			+ "所属单位"// 所属单位
			+ ":</td>"
			+ "<td align='left'><select name='dwid' id='dwid'  onblur=\"this.className='blur';checkIsStrEmpty(this);\">"
			+ "<option value=''></option>"
			+ " </select></td>"
			+ " <td width='2%'><span class='required'>*</span></td>"
			+ "<td align='right'  nowrap='nowrap'>"
			+ "下属办公室"// 下属办公室
			+ ":</td>"
			+ "<td align='left'id='officeNames'>"
			+ "<td align='left' style ='display:none'><input type='hidden' name='officeId' id='officeId'/></td>"// 隐藏域办公室IDS
			+ "</td>"
			+ " <td width='2%'><span class='required'>*</span></td>"
			+ "<td align='right' >"
			+ "联系电话"// 联系电话
			+ ":</td>"
			+ "<td><input type='text' name='lxdh' id='lxdh'  onblur=\"this.className='blur';checkIsTel(this);\" onfocus=\"this.className='focus'\" class='blur'  /></td>"
			+ " <td width='2%'></td>"
			+ " </tr>"
			+ " <tr>"
			+ "<td align='right'>"
			+ "业务范围"// 业务范围
			+ ":</td>"
			+ "<td colspan='7' align='left'><textarea name='ywfw' id='ywfw' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' id='textarea' cols='45' rows='4'></textarea></td>"
			+ "</tr>" + "<tr><td colspan='8'></td></tr>" + "</table>";
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要修改的科室");
		return;
	}
	var from_updateBuMen = oimsFormWindow({
		id : "from_updateBuMen",
		url : contextPath + "/publish/bumen/updateBuMen.htm",
		height : 300,
		width : 900,
		dialogTitle : "修改",
		icon : "edit",
		resetForm : reset_from_updateBuMen,
		btnOkSuccess : function(data, responseText, statusText) {
			if (data.state) {
				$.oimsSucc("科室信息修改成功", function() {
					queryBumen();
					removeDiv_openWin();
				});
			} else {
				$.oimsError("科室信息修改失败", function() {
					queryBumen();
					removeDiv_openWin();
				});
			}
		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
			$.oimsError("科室信息修改失败", function() {
				queryBumen();
				removeDiv_openWin();
			});
		},
		btnOkBefor : validate_from_updateBuMen
	});
	from_updateBuMen.append(updateBuMenTable);
	// 为所属单位赋值
	var date = getJSONData("/publish/danwei/findAllDanWei.htm", {
		tag : Math.random()
	}, "post");
	if (date.state) {
		$.each(date.obj, function(i, d) {
			$("<option value=" + d.id + ">" + d.dwmc + "</option>").appendTo(
					"#dwid");
		});
	}
	getBgs3Info();// 获得所有办公室信息
	// getJSOnData 返回从后台得到的数据
	var data = getJSONData("/publish/bumen/findBuMenByID.htm", {
		id : dataObjects[0].id,
		tag : Math.random()
	}, "post");
	if (data.state) {
		var bumen = data.obj;
		$("#id").val(bumen.id);// 隐藏域赋值
		$("#bmmc").val(bumen.bmmc);
		$("#bmbm").val(bumen.bmbm);
		$("#lxr").val(bumen.lxr);
		selectItemByValue("dwid", bumen.dwid);
		$("#officeId").val(bumen.officeId);// 隐藏域赋值
		$("#lxdh").val(bumen.lxdh);
		$("#ywfw").val(bumen.ywfw);
	}
	var data2 = getJSONData(
			"/publish/bangongshi/findAllBanGongShiByBuMenInfo.htm", {
				id : dataObjects[0].id,
				tag : Math.random()
			}, "post");
	if (data2.state) {
		$("#bgsIds").val(data2.obj);
	}
	var oForm = $('div.opencontent form');
	var oFormClone = oForm.clone();
	oForm.data('oFormClone', oFormClone);
	reset_from_updateBuMen();
}
// 科室信息修改表单重置方法(整理)
function reset_from_updateBuMen() {
	var dataObjects = getCheckBoxValue();
	var data_findAllBanGongShiByBuMenInfo = getJSONData(
			"/publish/bangongshi/findAllBanGongShiByBuMenInfo.htm", {
				id : dataObjects[0].id,
				tag : Math.random()
			}, "post");
	var data_findBuMenByID = getJSONData("/publish/bumen/findBuMenByID.htm", {
		id : dataObjects[0].id,
		tag : Math.random()
	}, "post");
	if ((data_findBuMenByID.state) && (data_findAllBanGongShiByBuMenInfo.state)) {
		var bumen = data_findBuMenByID.obj;
		$("#id").val(bumen.id);
		$("#bmmc").val(bumen.bmmc);
		$("#bmbm").val(bumen.bmbm);
		$("#lxr").val(bumen.lxr);
		$("#lxdh").val(bumen.lxdh);
		$("#ywfw").val(bumen.ywfw);
		selectItemByValue("dwid", bumen.dwid);
		$("#bgsIds").val(data_findAllBanGongShiByBuMenInfo.obj);
	}
}

// 科室信息修改表单验证方法(整理)
function validate_from_updateBuMen() {
	var oValidataData = {
		nullValidataData : {
			'bmmc' : '科室名称不能为空',
			'bmbm' : '科室编码不能为空',
			'lxr' : '负责人不能为空',
			'dwid' : '所属单位不能为空',
			'officeId' : '下属办公室不能为空'
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);// 带*为必填项
		return false;
	}
}
// 科室信息删除
function delBuMen() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要删除的科室信息");
		return;
	}
	$.oimsConfirm({
		strTitle : "确认删除该科室信息",
		remove_length : true
	}, doDelBuMen);
}
// 执行删除科室的操作
function doDelBuMen() {
	var dataObjects = getCheckBoxValue();
	var id = dataObjects[0].id;
	// var url_findBaogaoMobansByBaogaoMoban =
	// "/publish/baogaomoban/findBaogaoMobansByBaogaoMoban.htm";//
	// 根据报告模板对象查询报告模板
	// var data_obj_findBaogaoMobansByBaogaoMoban = getJSONData(
	// url_findBaogaoMobansByBaogaoMoban, {
	// gonghao : gonghao,// 工号
	// tag : Math.random()
	// }, "post").obj;// 报告模板对象
	// if (data_obj_findBaogaoMobansByBaogaoMoban.length != 0) {
	// $.oimsAlert("报告模板中引用该工号信息");
	// return;
	// }
	// 其他相关验证begin

	// 其他相关验证end

	var data_deleteBuMen = getJSONData("/publish/bumen/deleteBuMen.htm", {
		id : id,
		tag : Math.random()
	}, "post");
	if (data_deleteBuMen.state)
		$.oimsSucc("科室信息删除成功", function() {
			queryBumen();
			removeDiv_openWin();
		});
	else
		$.oimsError("科室信息删除失败", function() {
			queryBumen();
			removeDiv_openWin();
		});
}
