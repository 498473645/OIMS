function loadJsAndCss_jiaose() {
	loadWelcomePage();
}

function jiaoSe_list(btns) {
	pageTitle = "角色列表";// 角色信息列表
	init();
	$("<div/>").attr("id", "advquery").addClass("advquery").appendTo("#right");
	var danweiTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='23%' class='leftalign' >&nbsp;</td>"
			+ "<td width='9%'>&nbsp;</td>"
			+ "<td width='9%'>&nbsp;</td>"
			+ "<td width='59%' >"
			+ "<div class='btn'>"
			+ "<a  href='javascript:jiaoSeAddDialog();' onclick='return false;'><span class='adda'></span>"
			+ "新增"
			+ "</a>"// 新增
			+ "<a  href='javascript:jiaoSeUpdateDialog();' onclick='return false;'><span class='edita'></span>"
			+ "修改"
			+ "</a>"// 修改
			+ "<a  href='javascript:delJiaoSe();' onclick='return false;'><span class='dela'></span>"
			+ "删除" + "</a>"// 删除
			+ "</div>" + "</td>" + "</tr>" + "</table>";
	$(danweiTemplate).appendTo("#advquery");
	btnProwerConfig(btns);// 按钮加上权限
	jiaoSe_List();
}

function jiaoSe_List() {
	listFactor = {
		listObj : [ {
			title : "序号",
			key : "paihao"
		}, {
			title : "角色名称",
			key : "jiaose"
		} ],
		url : contextPath + "/publish/role/findAllRoleByPage.htm",
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			tag : Math.random()
		}
	};
	$("#pageList").remove();
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#right");
	$(div_list).createPageList(listFactor);
}

// 角色信息删除(整理)
function delJiaoSe() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要删除的角色信息");
		return;
	}
	$.oimsConfirm({
		strTitle : "确认删除该角色信息",
		remove_length : true
	}, doDelJiaoSe);

}

// 执行角色信息删除(整理)
function doDelJiaoSe() {
	var dataObjects = getCheckBoxValue();
	var url_selectUsersByUser = "/publish/user/selectUsersByUser.htm";// 根据User对象查询符合条件的User对象集合
	var data_selectUsersByUser = getJSONData(url_selectUsersByUser, {
		jiaose : dataObjects[0].id,
		tag : Math.random()
	}, "post");
	if (data_selectUsersByUser.state) {
		if (data_selectUsersByUser.obj.length > 0) {
			$.oimsAlert("存在引用该角色的用户，不可删除该角色信息");
			return;
		}
		var url_deleteRoleById = "/publish/role/deleteRoleById.htm";
		var data_deleteRoleById = getJSONData(url_deleteRoleById, {
			id : dataObjects[0].id,
			tag : Math.random()
		}, "post");
		if (data_deleteRoleById.state)
			$.oimsSucc("角色信息删除成功", function() {
				jiaoSe_List();
				removeDiv_openWin();
			});
		else
			$.oimsError("角色信息删除失败", function() {
				jiaoSe_List();
				removeDiv_openWin();
			});
	}
}
// 角色配置前的验证(整理)
function jiaoSeConfigValidata() {
	var jiaose = $("#jiaose").val();
	if (jiaose == "") {
		$.oimsAlert("角色名称不能为空！");
		return false;
	}
}

// 角色新增重置方法
function resetJiaoSeFormAdd() {
	$("#jiaose").val("");
	var arry = $("input[name='quanxian']");
	$.each(arry, function(i, v) {
		$(v).attr("checked", false);
	});
}

// 角色新增窗口(整理)
function jiaoSeAddDialog() {
	var jiaosemingcheng = ""
			+ "<div>"
			+ "<table width='98%' cellspacing='0' cellpadding='0' border='0'>"
			+ "<tr>"
			+ "<td width='10%'>角色名称：</td>"
			+ "<td width='30%'><input name='jiaose' id='jiaose' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class=\"blur\" type=\"text\"></td>"
			+ "<td width='58%'></td>" + "</tr>" + "</table>" + "</div>"
			+ "<fieldset class='fieldsetsytle'>"
			+ "<legend><b>角色权限配置</b></legend>" + "<div class='tree'></div>"
			+ "</fieldset>";
	var addJiaoSeForm = oimsFormWindow({
		url : contextPath + "/publish/role/jiaoseConfig.htm",
		id : "addJiaoSeForm",
		width : 750,
		height : 300,
		resetForm : resetJiaoSeFormAdd,// 重置
		btnOkSuccess : function(data, responseText, statusText) {
			if (data.state)
				$.oimsSucc("角色信息新增成功！", function() {
					jiaoSe_List();
					removeDiv_openWin();
				});
			else
				$.oimsError("角色信息新增失败！", function() {
					jiaoSe_List();
					removeDiv_openWin();
				});
		},
		btnOkBefor : jiaoSeConfigValidata
	// 提交前的验证
	});
	$(addJiaoSeForm).append(jiaosemingcheng);
	/***************************************************************************
	 * ******************************权限树展示
	 */
	var tree = $(".tree");
	var qxNo1Data = getJSONData(
			"/publish/role/findCurLoginUserQuanXiangToNo1.htm", {
				tag : Math.random()
			}, 'post');
	if (qxNo1Data.state) {
		createMenuNo1_role(qxNo1Data.obj, tree);
	}
	/***************************************************************************
	 * ******************************权限树展示
	 */
}
// 修改角色信息重置（整理）
function resetJiaoSeFormUpdate() {
	var data = getJSONData("/publish/role/findJiaoSeQuanXianById.htm", {// 根据角色ID查询角色信息对象(整理)
		tag : Math.random(),
		id : $("#jiaoseId").val()
	}, "post");
	if (data.state) {
		var role = data.obj;
		$("#jiaose").val(role.jiaose);
		var arry = $("input[name='quanxian']");
		$.each(arry, function(i, v) {
			$(v).attr("checked", false);
		});
		var qx = role.quanxian;
		var qxs = qx.split(",");
		for ( var i = 0; i < qxs.length; i++) {
			checkedCheckBoxByValue("quanxian", qxs[i]);
		}

	}
}

// 角色信息修改(整理)
function jiaoSeUpdateDialog() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要修改的角色信息");
		return;
	}
	var objData = dataObjects[0];
	var jiaoseMingcheng = "<div><table width='98%' cellspacing='0' cellpadding='0' border='0'>"
			+ "<tr>"
			+ "<td width='10%'>角色名称：</td>"
			+ "<td width='30%'><input name='jiaose' id='jiaose' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class=\"blur\" type=\"text\"></td>"
			+ "<td width='58%'><input type='hidden' name='jiaoseId' id='jiaoseId'></td>"
			+ "</tr>"
			+ "</table>"
			+ "</div>"
			+ "<fieldset class='fieldsetsytle'>"
			+ "<legend><b>角色权限配置</b></legend>"
			+ "<div class='tree'></div></fieldset>";
	var updateUserForm = oimsFormWindow({
		url : contextPath + "/publish/role/jiaoseUpdate.htm",
		id : "updateUserForm",
		dialogTitle : "修改",
		icon : "edit",
		width : 750,
		height : 300,
		resetForm : resetJiaoSeFormUpdate,
		btnOkSuccess : function(data, responseText, statusText) {
			if (data.state) {
				if (data.state) {
					$.oimsSucc("角色信息修改成功！", function() {
						jiaoSe_List();
						removeDiv_openWin();
					});
				} else {
					$.oimsError("角色信息修改失败！", function() {
						jiaoSe_List();
						removeDiv_openWin();
					});
				}
			}
		},
		btnOkBefor : jiaoSeConfigValidata
	});
	$(updateUserForm).append(jiaoseMingcheng);
	var tree = $(".tree");
	var qxNo1Data = getJSONData(
			"/publish/role/findCurLoginUserQuanXiangToNo1.htm", {// 查询当前用户所具有的一级菜单权限(整理)
				tag : Math.random()
			}, 'post');
	var data = getJSONData("/publish/role/findJiaoSeQuanXianById.htm", {// 根据角色ID查询角色信息对象(整理)
		tag : Math.random(),
		id : objData.id
	}, "post");
	if (qxNo1Data.state) {
		createMenuNo1_role(qxNo1Data.obj, tree, data);
	}
	if (data.state) {
		var role = data.obj;// 角色对象
		$("#jiaoseId").val(role.id);
		$("#jiaose").val(role.jiaose);
	}

}
/** ******************************权限树创建******************************** */
// data表示权限对象的集合
function createMenuNo1_role(data, target, roles) {
	var ul = $("<ul />").appendTo(target);
	$
			.each(
					data,
					function(i, d) {
						var li = $("<li />").addClass("treetitle").appendTo(ul);
						$("<span />").addClass("treeicon").appendTo(li);
						var a = $("<a />").attr("href", "#").appendTo(li);
						$(a).append(d.label_zh);
						var table = $("<table width='100%' border='0' cellspacing='0' cellpadding='0' style='display:none;'></table>");
						ul.append(table);
						// 解决延迟加载问题
						if (roles != null) {
							var rs = roles.obj.quanxian.split(",");
							$
									.each(
											rs,
											function(index, r) {
												if (d.id == r) {
													var qxNo2Data = getJSONData(
															"/publish/role/findCurLoginUserQuanXiangToNo2.htm",//
															{
																id : d.id,// 权限主键ID
																tag : Math
																		.random()
															}, 'post');
													if (qxNo2Data.state) {
														createMenuNo2_role(
																qxNo2Data.obj,
																table, roles);
													}
													if ($(li).next()
															.is("table")) {
														$(li).next().toggle(
																"normal");
													}
												}

											});
						}
						// 解决延迟加载问题
						$(li)
								.click(
										function() {
											var qxNo2Data = getJSONData(
													"/publish/role/findCurLoginUserQuanXiangToNo2.htm",//
													{
														id : d.id,// 权限主键ID
														tag : Math.random()
													}, 'post');
											if (qxNo2Data.state) {
												createMenuNo2_role(
														qxNo2Data.obj, table,
														roles);
											}

											if ($(li).next().is("table")) {
												$(li).next().toggle("normal");
											}
										});
					});
}

function createMenuNo2_role(data, target, roles) {
	var table = target;
	if (table.children().length == 0)
		$.each(data, function(i, d) {
			var tr = $("<tr />").appendTo(table);
			var td1 = $("<td width='12%' nowrap='nowrap'></td>").addClass(
					"treedropmenu solidline").appendTo(tr);
			var obj_checkbox = $("<input/>").attr("type", "checkbox").attr(
					"name", "quanxian").attr("id", "quanxian").attr("class",
					"classQuanxianSelector" + d.id + "father").attr("style",
					"height:15px; vertical-align:middle;").attr("value", d.id);
			$(obj_checkbox).bind("click", function() {
				var className = this.className.replace("father", "");
				var arrayObject = $("." + className);
				for ( var i = 0; i < arrayObject.length; i++) {
					var Object = $(arrayObject)[i];
					if (this.checked)
						Object.checked = true;
					else
						Object.checked = false;
				}
			});
			var obj_spn = "<span>" + d.label_zh + "</span>";
			$(obj_checkbox).appendTo(td1);
			$(obj_spn).appendTo(td1);
			// var cb = $("<input type='checkbox' name='quanxian' id='quanxian'
			// class='classQuanxianSelector"
			// + d.id
			// + "father' style = 'height:15px; vertical-align:middle;' value="
			// + d.id
			// + " onClick='selectNo3_role("
			// + this
			// + ");'/><span>" + d.label_zh + "</span>");
			// cb.appendTo(td1);
			if (roles != null) {
				var rs = roles.obj.quanxian.split(",");
				$.each(rs, function(index, r) {
					if (d.id == r)
						obj_checkbox.attr("checked", "checked");
				});
			}
			var qxNo3Data = getJSONData(
					"/publish/role/findCurLoginUserQuanXiangToNo3.htm", {
						id : d.id,
						tag : Math.random(),
					}, 'post');

			if (qxNo3Data.state) {
				createMenuNo3_role(qxNo3Data.obj, tr, roles);
			}
		});
}

function createMenuNo3_role(data, target, roles) {
	var td2 = $("<td width='88%'></td>").addClass("solidline").appendTo(target);
	var div = $("<div/>").addClass("treedropmenu1").appendTo(td2);
	$.each(data, function(i, d) {
		// var cb = $("<input type='checkbox' name='quanxian' id='quanxian'
		// class='classQuanxianSelector"
		// + d.fatherId
		// + "' onclick='selectNo2_role(this);' style = 'height:15px;
		// vertical-align:middle;' value="
		// + d.id + " /><span>" + d.label_zh + "</span>");
		// cb.appendTo(div);
		var obj_checkbox = $("<input/>").attr("type", "checkbox").attr("name",
				"quanxian").attr("id", "quanxian").attr("class",
				"classQuanxianSelector" + d.fatherId).attr("style",
				"height:15px; vertical-align:middle;").attr("value", d.id);
		$(obj_checkbox).bind("click", function() {
			var className = this.className;
			var arrayObject = $("." + className);
			for ( var i = 0; i < arrayObject.length; i++) {
				var Object = $(arrayObject)[i];
				if (Object.checked) {
					$("." + className + "father")[0].checked = true;
					break;
				}
				if (i + 1 == arrayObject.length) {
					$("." + className + "father")[0].checked = false;
				}
			}
		});
		var obj_spn = "<span>" + d.label_zh + "</span>";
		$(obj_checkbox).appendTo(div);
		$(obj_spn).appendTo(div);

		if (roles != null) {
			var rs = roles.obj.quanxian.split(",");
			$.each(rs, function(index, r) {
				if (d.id == r)
					obj_checkbox.attr("checked", "checked");
			});
		}
	});

}
/** ******************************权限树创建******************************** */
// 二级菜单单击事件
function selectNo3_role(field) {
	var qxNo3Data = getJSONData(
			"/publish/role/findCurLoginUserQuanXiangToNo3.htm", {// 查询当前用户所具有的三级菜单权限
				id : field.value,
				tag : Math.random()
			}, 'post');
	if (qxNo3Data.state) {
		$.each(qxNo3Data.obj, function(i, d) {
			var arry = $("input[name='quanxian']");
			$.each(arry, function(i, v) {
				if ($(v).val() == d.id) {
					if (field.checked) {
						$(v).attr("checked", "checked");
					} else {
						$(v).attr("checked", false);
					}

				}
			});

		});

	}
}

// 三级菜单单击事件
function selectNo2_role(checkObject) {
	var className = checkObject.className;
	var arrayObject = $("." + className);
	for ( var i = 0; i < arrayObject.length; i++) {
		var Object = $(arrayObject)[i];
		if (Object.checked) {
			$("." + className + "father")[0].checked = true;
			break;
		}
		if (i + 1 == arrayObject.length) {
			$("." + className + "father")[0].checked = false;
		}
	}
}
