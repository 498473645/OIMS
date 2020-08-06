// 首次加载的方法（整理）
function showDanweiList(btns) {
	pageTitle = "医院信息";// 医院信息
	init();
	$("<div/>").attr("id", "advquery").addClass("advquery").appendTo("#right");
	var danweiTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='23%' class='leftalign'>&nbsp;</td>"
			+ "<td width='9%'>&nbsp;</td>"
			+ "<td width='9%'>&nbsp;</td>"
			+ "<td width='59%'>"
			+ "<div class='btn'>"
			+ "<a  href='javascript:addDanWeiForm();' onclick='return false;'><span class='adda'></span>"
			+ "新增"
			+ "</a>"// 新增
			+ "<a  href='javascript:updateDanWeiForm();' onclick='return false;'><span class='edita'></span>"
			+ "修改" + "</a>"// 修改
			+ "</div>" + "</td>" + "</tr>" + "</table>";
	$(danweiTemplate).appendTo("#advquery");
	btnProwerConfig(btns);// 按钮加上权限
	shwoDanweilist();

}
// 显示单位列表（整理）
function shwoDanweilist() {
	listFactor = {
		listObj : [ {
			title : "序号",// 序号
			key : "id"
		}, {
			title : "医院名称",// 医院名称
			key : "dwmc"
		}, {
			title : "负责人",// 负责人
			key : "lianxiren"
		}, {
			title : "单位级别",// 单位级别
			key : "danweijibie"
		}, {
			title : "联系电话",// 联系电话
			key : "dianhua"
		}, {
			title : "地址",// 地址
			key : "dizhi"
		}, {
			title : "邮编",// 邮编
			key : "youbian"
		} ],
		url : contextPath + "/publish/danwei/findAllDanWeiByPage.htm",
		method : "post",
		checkbox : true,
		single : true,
		data : {
			currentPage : 1,
			pageSize : getPageSize(),
			tag : Math.random()
		}
	};
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#right");
	$(div_list).createPageList(listFactor);
}

// 单位信息新增窗口
function addDanWeiForm() {
	var addDanweiTable = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='9%' align='right'>"
			+ "医院名称"// 医院名称
			+ ":</td>"
			+ "<td width='23%'><input  type='text' name='dwmc' id='dwmc' onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur'  /></td>"
			+ " <td width='2%'><span class='required'>*</span></td>"
			+ "<td width='9%' align='right'>"
			+ "负责人"// 负责人
			+ ":</td>"
			+ "<td width='23%'><input type='text' name='lianxiren'  id='lianxiren'  onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ " <td width='2%'><span class='required'>*</span></td>"
			+ "<td  width='9%' align='right'>"
			+ "单位级别"// 单位级别
			+ ":</td>"
			+ "<td width='23% align='left'><select name='danweijibie' id='danweijibie' checkIsStrEmpty(this);\">"
			+ "<option value=''></option>"
			+ "</select></td>"
			+ " <td width='2%'><span class='required'>*</span></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right'>"
			+ "联系电话"// 联系电话
			+ ":</td>"
			+ "<td><input type='text' name='dianhua' id='dianhua' onblur=\"this.className='blur';checkIsTel(this);\" onfocus=\"this.className='focus'\" class='blur'  /></td>"
			+ " <td width='2%'></td>"
			+ "<td align='right'>"
			+ "邮箱"// 邮箱
			+ ":</td>"
			+ "<td align='left'><input type='text' name='email' id='email' onblur=\"this.className='blur' ;checkIsMail(this);\"  onfocus=\"this.className='focus'\" class='blur'  /></td>"
			+ " <td width='2%'></td>"
			+ "<td align='right'>"
			+ "邮编"// 邮编
			+ ":</td>"
			+ "<td><input type='text' name='youbian' id='youbian' onblur=\"this.className='blur';checkIsPost(this);\" onfocus=\"this.className='focus'\" class='blur'  /></td>"
			+ " <td width='2%'></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right'>"
			+ "地址"// 地址
			+ ":</td>"
			+ "<td colspan='7' align='left'><input type='text' name='dizhi' id='dizhi' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur'  /></td>"
			+ " <td width='2%'></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right' >"
			+ "简介"// 简介
			+ ":</td>"
			+ "<td colspan='7' height='180'  align='left'><br><textarea name='jianjie' id='jianjie' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' id='textarea' cols='45' rows='4'></textarea></td>"
			+ " <td width='2%'></td>" + "</tr>" + "</table>";
	var addDanweiForm = oimsFormWindow({
		id : "addDanweiForm",
		url : contextPath + "/publish/danwei/addDanwei.htm",
		height : 300,
		width : 900,
		resetForm : resetDanweiForm,// 重置方法（整理）
		btnOkSuccess : function(data, responseText, statusText) {
			if (data.state) {
				$.oimsSucc("医院信息新增成功", function() {
					flush_danwei();
					removeDiv_openWin();
				});
			} else {
				$.oimsError("医院信息新增失败", function() {
					flush_danwei();
					removeDiv_openWin();
				});
			}
		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
			$.oimsError("医院信息新增失败", function() {
				flush_danwei();
				removeDiv_openWin();
			});
		},
		btnOkBefor : danweiFormValidate
	// 提交前验证
	});
	// form元素 --单位信息
	addDanweiForm.append(addDanweiTable);
	// 单位级别赋值
	var data = getJSONData("/publish/category/findCategorysByFatherId.htm", {
		fatherid : oimsCategory.UNIT_LEVEL
	}, "post");
	if (data.state) {
		$.each(data.obj, function(i, d) {
			$("<option value=" + d.categoryid + ">" + d.category + "</option>")
					.appendTo("#danweijibie");
		});
	}
}
// 添加单位时信息验证(整理)
function danweiFormValidate() {
	// #dmmc只是选中了当前对象
	var oValidataData = {
		nullValidataData : {
			'dwmc' : '单位名称为空',
			'lianxiren' : '负责人为空',
			'danweijibie' : '单位级别为空'
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);// 带*为必填项
		return false;
	}
	return true;
}

function resetDanweiForm() {
	$("#dwmc").val("");
	$("#lianxiren").val("");
	$("#danweijibie").val("");
	$("#dianhua").val("");
	$("#email").val("");
	$("#youbian").val("");
	$("#dizhi").val("");
	$("#jianjie").val("");
}

// 郭宝强更新
function updateDanWeiForm() {

	var updateDanweiTable = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<input type = 'hidden' name='id' id='id'>"
			+ "<tr>"
			+ "<td width='9%' align='right'>"
			+ "医院名称"// 医院名称
			+ ":</td>"
			+ "<td width='23%'><input  type='text' name='dwmc' id='dwmc' onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur'  /></td>"
			+ " <td width='2%'><span class='required'>*</span></td>"
			+ "<td width='9%' align='right'>"
			+ "负责人"// 负责人
			+ ":</td>"
			+ "<td width='23%'><input type='text' name='lianxiren'  id='lianxiren'  onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ " <td width='2%'><span class='required'>*</span></td>"
			+ "<td  width='9%' align='right'>"
			+ "单位级别"// 单位级别
			+ ":</td>"
			+ "<td width='23% align='left'><select name='danweijibie' id='danweijibie' checkIsStrEmpty(this);\">"
			+ "<option value=''></option>"
			+ "</select></td>"
			+ " <td width='2%'><span class='required'>*</span></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right'>"
			+ "联系电话"// 联系电话
			+ ":</td>"
			+ "<td><input type='text' name='dianhua' id='dianhua' onblur=\"this.className='blur';checkIsTel(this);\" onfocus=\"this.className='focus'\" class='blur'  /></td>"
			+ " <td width='2%'></td>"
			+ "<td align='right'>"
			+ "邮箱"// 邮箱
			+ ":</td>"
			+ "<td align='left'><input type='text' name='email' id='email' onblur=\"this.className='blur' ;checkIsMail(this);\"  onfocus=\"this.className='focus'\" class='blur'  /></td>"
			+ " <td width='2%'></td>"
			+ "<td align='right'>"
			+ "邮编"// 邮编
			+ ":</td>"
			+ "<td><input type='text' name='youbian' id='youbian' onblur=\"this.className='blur';checkIsPost(this);\" onfocus=\"this.className='focus'\" class='blur'  /></td>"
			+ " <td width='2%'></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right'>"
			+ "地址"// 地址
			+ ":</td>"
			+ "<td colspan='7' align='left'><input type='text' name='dizhi' id='dizhi' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur'  /></td>"
			+ " <td width='2%'></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right' >"
			+ "简介"// 简介
			+ ":</td>"
			+ "<td colspan='7' height='180'  align='left'><br><textarea name='jianjie' id='jianjie' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' id='textarea' cols='45' rows='4'></textarea></td>"
			+ " <td width='2%'></td>" + "</tr>" + "</table>";
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要修改的医院信息");
		return;
	}
	var updateDanweiForm = oimsFormWindow({
		id : "updateDanweiForm",
		url : contextPath + "/publish/danwei/updateDanwei.htm",
		height : 300,
		width : 900,
		dialogTitle : "修改",
		icon : "edit",
		resetForm : resetDanweiFormUpdate,
		btnOkSuccess : function(data, responseText, statusText) {
			if (data.state) {
				$.oimsSucc("医院信息修改成功", function() {
					flush_danwei();
					removeDiv_openWin();
				});
			} else {
				$.oimsError("医院信息修改失败", function() {
					flush_danwei();
					removeDiv_openWin();
				});
			}

		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
			$.oimsError("医院信息修改失败", function() {
				flush_danwei();
				removeDiv_openWin();
			});
		},
		btnOkBefor : danweiFormValidate
	});
	updateDanweiForm.append(updateDanweiTable);
	var data2 = getJSONData("/publish/category/findCategorysByFatherId.htm", {
		fatherid : oimsCategory.UNIT_LEVEL
	}, "post");
	if (data2.state) {
		$.each(data2.obj, function(i, d) {
			$("<option value=" + d.categoryid + ">" + d.category + "</option>")
					.appendTo("#danweijibie");
		});
	}
	resetDanweiFormUpdate();
}
// 修改重置方法首次加载数据（整理）
function resetDanweiFormUpdate() {
	var dataObjects = getCheckBoxValue();
	var data = getJSONData("/publish/danwei/getDanWeiByID.htm", {
		id : dataObjects[0].id,
		tag : Math.random()
	});
	if (data.state) {
		var danwei = data.obj;
		$("#id").val(danwei.id);
		$("#dwmc").val(danwei.dwmc);
		$("#lianxiren").val(danwei.lianxiren);
		selectItemByValue("danweijibie", danwei.danweijibie);
		$("#dianhua").val(danwei.dianhua);
		$("#email").val(danwei.email);
		$("#youbian").val(danwei.youbian);
		$("#dizhi").val(danwei.dizhi);
		$("#jianjie").val(danwei.jianjie);
	}
}

// 刷新页面整理
function flush_danwei() {
	$("#pageList").remove();
	shwoDanweilist();
}