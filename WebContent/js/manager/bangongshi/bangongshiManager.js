//办公室管理首次加载方法(整理)
function bsgReady(btns) {
	pageTitle = "办公室管理";
	init();
	$("<div/>").attr("id", "advquery").addClass("advquery").appendTo("#right");
	var bangongshiTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='23%' class='leftalign' ><input name='search_bgs_weizhi' type='text' class='blurview' id='search_bgs_weizhi' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"
			+ "请输入办公室名称或位置"// 请输入办公室名称或位置
			+ "' size='28' /></td>"
			+ "<td width='7%'><a  href='javascript:queryBanGongShi();' class='search' >"
			+ "查询"// 查询
			+ "</a></td>"
			+ " <td width='9%'></td>"
			+ "<td width='59%' >"
			+ "<div class='btn'>"
			+ "<a  href='javascript:openAddBanGongShiDialog();' onclick='return false;'><span class='adda'></span>"
			+ "新增"// 新增
			+ "</a>"
			+ "<a  href='javascript:openUpdatebgsDiaglog();' onclick='return false;'><span class='edita'></span>"
			+ "修改"// 修改
			+ "</a>"
			+ "<a  href='javascript:delBanGongShi();' onclick='return false;'><span class='dela'></span>"
			+ "删除"// 删除
			+ "</a>" + "</div>" + "</td>" + "</tr>" + "</table>";
	$(bangongshiTemplate).appendTo("#advquery");
	btnProwerConfig(btns);// 按钮加上权限
	showBanGongShiList();// 办公室信息列表
	$("#search_bgs_weizhi").click(function() {
		clearInitQuery(this);
	});// 点击清空输入框文字
	$("#search_bgs_weizhi").blur(function() {
		if (this.value == "") {
			$("#search_bgs_weizhi").val("请输入办公室名称或位置");
			$("#search_bgs_weizhi").addClass("blurview");
		}

	});
	$("#search_bgs_weizhi").bind("keyup", function(e) {
		if (e.which == 13) {
			queryBanGongShi();
		}
	});
}
// 办公室列表(整理)
function showBanGongShiList() {
	listFactor = {
		listObj : [ {
			title : "序号",// 序号
			key : "id"
		}, {
			title : "办公室名称",// 办公室名称
			key : "bgs"
		}, {
			title : "位置",// 位置
			key : "weizhi"
		}, {
			title : "位置图片",// 位置图片
			key : "wztp"
		} ],
		url : contextPath + "/publish/bangongshi/findAllBanGongShiByPage.htm",// url
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			tag : Math.random()
		}
	};
	$("<div />").attr("id", "div_list").attr("class", "list")
			.appendTo("#right");// 创建div_list添加到div_right
	$("#div_list").createPageList(listFactor);
}
// 新增办公室窗口(整理)
function openAddBanGongShiDialog() {
	var div_opencontent = $("<div/>").attr("id", "div_opencontent").attr(
			"class", "div_opencontent");
	var bgsTabel = "<div><table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='22%' rowspan='3' align='center' class='positionimg' ><img src='"
			+ contextPath
			+ "/style/green/images/img.png"
			+ "' width='200' height='150' id='image_WzTp' /></td>"
			+ "<td width='10%' align='right'>"
			+ "办公室名称"// 办公室名称
			+ ":</td>"
			+ " <td width='36%'><input type='text' name='bgs' id='bgs' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur'  /></td>"
			+ "<td width='2%'><span class='required'>*</span></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right'>"
			+ "办公室位置"// 办公室位置
			+ ":</td>"
			+ "<td align='left'><input type='text' name='weizhi' id='weizhi' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur'  /></td>"
			+ "<td width='2%'><span class='required'>*</span></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right'>"
			+ "位置图片"// 位置图片
			+ ":</td>"
			+ "<td align='left'>"
			+ "<div class='searchfile'>"
			+ "<input type='file' name='url_wztp' id ='url_wztp' class='filed' onchange=\"onChange_WzTpPicPath('"
			+ contextPath
			+ "/publish/bangongshi/addBanGongShi.htm','form_saveBgs');\"  />"
			+ "<div class='fieldstyle'><input type='text' name='txt_fieldstyle' readonly='readonly' id='txt_fieldstyle' class='fieldtext'/></div>"
			+ "<div class='buttonstyle'><input type='button'  id='btn_yuyan' class='fieldbutton'/></div>"
			+ "</div>"
			+ "</td>"
			+ "<td width='2%'></td>"
			+ "</tr>"
			+ "</table>" + "</div>" + "<br>";
	$(bgsTabel).appendTo(div_opencontent);
	var form_saveBgs = $("<form/>").attr("id", "form_saveBgs").attr("action",
			contextPath + "/publish/bangongshi/addBanGongShi.htm").attr(
			"enctype", "multipart/form-data").attr("method", "post");
	$(div_opencontent).appendTo(form_saveBgs);
	var div_openbutton = $("<div/>").attr("id", "div_openbutton").attr("class",
			"openbutton").appendTo(form_saveBgs);// 底部div
	var div_openbutton_html = "<a href='javascript:addBanGongShiForm();'><span class='advsumit'></span>"
			+ "提交"
			+ "</a>"
			+ "<a href='javascript:reset_form_saveBgs()'><span class='advreset'></span>"// resetBanGongShiForm
			+ "重置" + "</a>";
	$(div_openbutton_html).appendTo(div_openbutton);
	$(form_saveBgs).oimsDialog({
		icon : "add",
		title : "新增",
		width : 550,
		height : 190,
		drag : false,
		locked : true,
		winType : 4,
		button : null
	});
	$.customfile('fieldbutton', 'filed', 'fieldtext', "openWin");
}
// 办公室位置图片路径改变的方法(整理)
function onChange_WzTpPicPath(action_form, id_form) {
	$("#" + id_form)[0].action = contextPath
			+ "/publish/bangongshi/upLoadWzTp.htm";
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
						if (data_obj.wztp != null && data_obj.wztp != "") {
							dengbisuofang.pic_dengbi("image_WzTp", contextPath
									+ data_obj.wztp);
						}
					} else
						$.oimsAlert("图片上传失败");
				}
			});
	$("#" + id_form).submit();
}
// 办公室信息修改(整理)
function openUpdatebgsDiaglog() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要修改的办公室");
		return;
	}
	var div_opencontent = $("<div/>").attr("id", "div_opencontent").attr(
			"class", "div_opencontent");
	var bgsTabel = "<div>"
			+ "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='22%' rowspan='3' align='center' class='positionimg' ><img src='"
			+ contextPath
			+ "/style/green/images/img.png"
			+ "' width='200' height='150' id='image_WzTp' /></td>"
			+ "<td width='10%' align='right'>"
			+ "办公室名称"// 办公室名称
			+ ":</td>"
			+ " <td width='36%'><input type='text' name='bgs' id='bgs' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur'  /></td>"
			+ "<td width='2%'><span class='required'>*</span></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right'>"
			+ "办公室位置"// 办公室位置
			+ ":</td>"
			+ "<td align='left'><input type='text' name='weizhi' id='weizhi' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur'  /></td>"
			+ "<td width='2%'><span class='required'>*</span></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right'>"
			+ "位置图片"// 位置图片
			+ ":</td>"
			+ "<td align='left'>"
			+ "<div class='searchfile'>"
			+ "<input type='file' name='url_wztp' id ='url_wztp' class='filed' onchange=\"onChange_WzTpPicPath('"
			+ contextPath
			+ "/publish/bangongshi/updateBanGongShi.htm','form_updateBgs');\"  />"
			+ "<div class='fieldstyle'><input type='text'readonly='readonly' name='txt_fieldstyle' id='txt_fieldstyle' class='fieldtext'/></div>"
			+ "<div class='buttonstyle'><input type='button'  id='btn_yuyan' class='fieldbutton'/></div>"
			+ "</div>"
			+ "</td>"
			+ "<td width='2%'></td>"
			+ "</tr>"
			+ "</table>" + "</div>";
	$(bgsTabel).appendTo(div_opencontent);
	var hidden_id = "<input type='hidden' name='id' id='id' />";// id隐藏域
	var form_updateBgs = $("<form/>").attr("id", "form_updateBgs").attr(
			"action", contextPath + "/publish/bangongshi/updateBanGongShi.htm")
			.attr("enctype", "multipart/form-data").attr("method", "post");
	$(div_opencontent).appendTo(form_updateBgs);
	$(hidden_id).appendTo(form_updateBgs);// 隐藏域
	var div_openbutton = $("<div/>").attr("id", "div_openbutton").attr("class",
			"openbutton").appendTo(form_updateBgs);// 底部div
	var div_openbutton_html = "<a href='javascript:updateBanGongShiForm();'><span class='advsumit'></span>"
			+ "提交"
			+ "</a> "
			+ " <a href='javascript:reset_form_updateBgs()'><span class='advreset'></span>"
			+ "重置" + "</a>";
	$(div_openbutton_html).appendTo(div_openbutton);
	$(form_updateBgs).oimsDialog({
		icon : "edit",
		title : "修改",
		width : 550,
		height : 190,
		drag : false,
		locked : true,
		winType : 4,
		button : null
	});
	$.customfile('fieldbutton', 'filed', 'fieldtext', "openWin");
	init_BanGongShi(dataObjects[0]);// 信息赋值
}
// 办公室信息赋值
function init_BanGongShi(object) {
	// 为当前办公室赋值
	var data = getJSONData("/publish/bangongshi/getBanGongShiById.htm", {
		id : object.id,
		tag : Math.random()
	}, "post");
	if (data.state) {
		var bangongshi = data.obj;
		$("#id").val(bangongshi.id);
		$("#bgs").val(bangongshi.bgs);
		$("#weizhi").val(bangongshi.weizhi);
		$("#txt_fieldstyle").val(bangongshi.wztp);
		$("#image_WzTp").attr(
				"src",
				bangongshi.wztp == "" ? contextPath
						+ "/style/green/images/img.png" : contextPath
						+ bangongshi.wztp);
	}
}
// 修改办公室表单重置方法
function reset_form_updateBgs() {
	var dataObjects = getCheckBoxValue();
	init_BanGongShi(dataObjects[0]);
}

// 办公室修改相关验证的方法(整理)
function validate_form_updateBgs() {
	var oValidataData = {
		nullValidataData : {
			'bgs' : '办公室名称不能为空',
			'weizhi' : '办公室位置不能为空'
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);
		return false;
	}
	var data = getJSONData("/publish/bangongshi/bgsIsExist.htm", {
		bgs : $("#bgs").val(),
		tag : Math.random()
	}, "post");
	if (data.state) {
		var id_hidden = $("#id", "#form_updateBgs").val();
		if (id_hidden != data.obj.id)// 重复操作
		{
			$.oimsAlert("办公室名称重复请修改");
			return false;
		}
	}
	return true;
}
// 办公室信息删除(整理)
function delBanGongShi() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要删除的办公室信息");
		return;
	}
	$.oimsConfirm({
		strTitle : "确认删除该办公室信息",
		remove_length : true
	}, doDelBanGongShi);
	// 在窗口进行确认删除时若选“确定”，就回执行doDelDanWei函数

}
// 执行办公室删除操作(整理)
function doDelBanGongShi() {
	var dataObjects = getCheckBoxValue();
	var url = "/publish/bangongshi/DelBanGongShi.htm";
	var data = getJSONData(url, {
		id : dataObjects[0].id
	}, "post");
	if (data.state)
		$.oimsSucc("办公室信息删除成功", function() {
			queryBanGongShi();
			removeDiv_openWin();
		});
	else
		$.oimsError("办公室信息删除失败", function() {
			queryBanGongShi();
			removeDiv_openWin();
		});
}

// 办公室信息新增(整理)
function addBanGongShiForm() {
	$("#form_saveBgs").ajaxForm(
			{
				beforeSend : validate_form_saveBgs,
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
						$.oimsSucc("办公室信息新增成功", function() {
							queryBanGongShi();
							removeDiv_openWin();
						});
					else
						$.oimsError("办公室信息新增失败", function() {
							queryBanGongShi();
							removeDiv_openWin();
						});

				}
			});
	$("#form_saveBgs").submit();

}

// 办公室新增相关验证的方法(整理)
function validate_form_saveBgs() {
	var oValidataData = {
		nullValidataData : {
			'bgs' : '办公室名称不能为空',
			'weizhi' : '办公室位置不能为空'
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);
		return false;
	}
	if (bgsIsExist())// 判断办公室名称是否存在于数据库；false=表示当前办公室名称不存在于数据库
	// true=表示当前办公室名称存在于数据库（整理）
	{
		$.oimsAlert("办公室名称已经存在请修改");
		return false;
	}
	return true;
}
// 判断办公室名称是否存在于数据库；false=表示当前办公室名称不存在于数据库 true=表示当前办公室名称存在于数据库（整理）
function bgsIsExist() {
	var data = getJSONData("/publish/bangongshi/bgsIsExist.htm", {
		bgs : $("#bgs").val(),
		tag : Math.random()
	}, "post");
	if (data.state)
		return true;
	else
		return false;
}
// 办公室新增表单重置操作(整理)
function reset_form_saveBgs() {
	$("#bgs").val("");
	$("#weizhi").val("");
	// 需要修改
	$("#txt_fieldstyle").val("");
}
// 办公室信息修改操作(整理)
function updateBanGongShiForm() {
	$("#form_updateBgs").ajaxForm(
			{
				beforeSend : validate_form_updateBgs,
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
					// 把请求返回结果转为对象
					var data_Obj = eval("(" + data_string + ")");
					var state = data_Obj.state;
					if (state)
						$.oimsSucc("办公室信息修改成功", function() {
							queryBanGongShi();
							removeDiv_openWin();
						});
					else
						$.oimsError("办公室信息修改失败", function() {
							queryBanGongShi();
							removeDiv_openWin();
						});
				}
			});
	$("#form_updateBgs").submit();
}
// 查询的操作(整理)
function queryBanGongShi() {
	var obj = {
		search : $("#search_bgs_weizhi").val().indexOf("请输入") != -1 ? "" : $(
				"#search_bgs_weizhi").val()
	};
	$.extend(listFactor.data, obj);
	$("#div_list").createPageList(listFactor);
}
