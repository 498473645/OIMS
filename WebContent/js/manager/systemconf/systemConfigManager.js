function loadJsAndCss_System() {
	loadWelcomePage();
};

var l_sys = {
	UserConfig : 25,// 用户配置
	defUserSetup : 496,// 默认用户配置
	Start : 31,// 启用
	Forbid : 46,// 禁用
	jianYaoMiaoShu : 703,// 描述
	workSpace : 497,// 工作台
	languager : 498,// 语言
	welcome : 499,// 欢迎词
	GuZhangChuli : 340,// 故障处理
	gzSetup : 825,// 故障处理配置
	WaterConfig : 341,// 水印配置
	DelOK_Alert : 227,// 删除成功
	DelError_Alert : 94,// 删除失败
	CheckOneItem_Alert : 222,// 请选择一条数据
	IsConfirmDelConfig : 124,// 确认删除
	Jcxm : 14,// 检查项目
	BelongsDepart : 191,// 所属科室
	WxSize : 800,// 水印X轴(原)
	WySize : 801,// 水印Y轴(原)
	TMV : 802,// 透明度(原)
	sWxSize : 803,// 水印X轴(缩)
	sWySize : 804,// 水印Y轴(缩)
	sTMV : 805,// 透明度(缩)
	wImage : 806,// 水印图片(原)
	swImage : 807,// 水印图片(缩)
	BiaoTi : 381,// 标题
	isNotNull : 808,// 不能为空
	isNotNum : 809,// 不是数字
	LanguageConfig : 26,// 语言配置
	languageType : 811,// 语言类型
	DateException : 812,// 数据异常
	LogConfig : 22,// 日志配置
	delDay : 813,// 删除天数
	delType : 814,// 清空类型
	UserLog : 62,// 用户日志
	sysLog : 815,// 系统日志
	All : 41,// 全部
	RzJb : 404,// 日志级别
	yiban : 816,// 一般
	ZhongDeng : 1006,// 中等
	YanZhong : 1007,// 严重
	AutoPaiDuiConfig : 184,// 自动排队配置
	DataBaseConfig : 23,// 数据库配置
	backPath : 817,// 备份路径
	backTime : 818,// 备份时间
	backDays : 819,// 备份频率
	day : 820,// 天
	week : 821,// 周
	month : 822,// 月
	season : 821,// 季
	year : 822,// 年

	// 宋仁非 短信平台配置
	SMSConfig : 573, // 短信平台配置
	JieRuFangShi : 574, // 接入方式
	ServerAddress : 575, // 服务器地址
	ServerPort : 576, // 服务器端口
	UserName : 360, // 用户名
	MiMa : 577, // 密码
	Save : 246, // 保存
	Reset : 85
// 重置
};
/** **************************************用户配置开始**************************************** */
// 用户配置加载的方法(整理)
function showUserConfiForm() {
	pageTitle = "用户配置";
	init();
	var userConfTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='23%' class='leftalign' ></td>"
			+ "<td width='9%'></td>"
			+ "<td width='9%'></td>"
			+ "<td width='59%' >" + "</td>" + "</tr>" + "</table>";

	$("<div/>").attr("id", "advquery").addClass("advquery").appendTo("#right");
	$(userConfTemplate).appendTo("#advquery");
	var confTab = "<table id='tab' width='100%' border=0 cellspacing=0 cellpadding=0>"
			+ "</table>";
	$("<div/>").addClass("list").appendTo("#right");
	$("<fieldset/>").addClass("fieldsetsytle").appendTo(".list");
	$("<legend/>").html("<b>" + "默认用户配置" + "</b>").appendTo(".fieldsetsytle");
	$(confTab).appendTo(".fieldsetsytle");
	var data = getJSONData(
			"/publish/systemconfi/getManageItemListByCategoryId.htm", {
				categoryId : oimsCategory.MANAGEITEM_CATEGORY_ID_YONGHUPEIZHI,
				tag : Math.random()
			}, "post");
	if (data.state) {
		var itemlist = data.obj;
		$
				.each(
						itemlist,
						function(i, d) {
							var tr = $("<tr/>").appendTo("#tab");
							var td1 = $("<td nowrap='nowrap'/>").attr("id",
									"state" + i + "").attr("width", "18%")
									.addClass("system").appendTo(tr);
							if (d.state) {
								$(
										"<a href='javascript:checkUserConf("
												+ d.id
												+ ");'><span class='using'></span><span>"
												+ "启用" + "</span></a>")
										.appendTo(td1);
							} else {
								$(
										"<a href='javascript:checkUserConf("
												+ d.id
												+ ");'><span class='disable'></span><span>"
												+ "禁用" + "</span></a>")
										.appendTo(td1);
							}
							var td2 = $("<td nowrap='nowrap'/>").attr("width",
									"20%").appendTo(tr);
							$("<p>" + d.manager + "</p>").addClass("title3")
									.appendTo(td2);
							$("<p><b>" + "简要描述" + "：</b>" + d.info + "</p>")
									.appendTo(td2);
							var vals = eval('(' + d.vals + ')');
							var td3 = $("<td align='left' nowrap='nowrap'/>")
									.attr("width", "30%").appendTo(tr);
							var div1 = $("<div/>").addClass("ot").appendTo(td3);
							$("<span>" + "工作台" + "：</span>").appendTo(div1);
							$(
									"<input name='gzt"
											+ i
											+ "' type='text' class='blur'   id='gzt"
											+ i
											+ "' onfocus=\"this.className='focus'\"   onblur=\"this.className='blur'\" value='"
											+ vals.gzt + "' />").appendTo(div1);

							var div3 = $("<div/>").addClass("ot").appendTo(td3);
							$("<span>" + "语言" + "：</span>").appendTo(div3);
							$(
									"<select name='yuyan"
											+ i
											+ "' id='yuyan"
											+ i
											+ "' onfocus=\"this.className='focus'\"   onblur=\"this.className='blur'\" ><option value='24'>中文</option></select>")
									.appendTo(div3);

							var td4 = $("<td align='left' nowrap='nowrap'/>")
									.attr("width", "30%").appendTo(tr);
							var div2 = $("<div/>").addClass("ot").appendTo(td4);
							$("<span>" + "欢迎词" + "：</span>").appendTo(div2);
							$(
									"<input name='hyc"
											+ i
											+ "' type='text' class='blur'   id='hyc"
											+ i
											+ "' onfocus=\"this.className='focus'\"   onblur=\"this.className='blur'\" value='"
											+ vals.hyc + "' />").appendTo(div2);

							var div4 = $("<div/>").addClass("ot").appendTo(td4);
							$("<span></span>").appendTo(div4);
							var td5 = $("<td nowrap='nowrap'/>").attr("width",
									"18%").appendTo(tr);
							// 提交删除操作
							var div = $("<div/>").addClass("selectbtn nobg")
									.appendTo(td5);
							$("<a href='#'>" + "提交" + "</a>").appendTo(div);
							if (d.state) {
								$("<a href='#' disabled>" + "删除" + "</a>")
										.appendTo(div);
							} else {
								$("<a href='#'>" + "删除" + "</a>").appendTo(div);
							}
						});
	}
}
// 用户默认配置启用操作(整理)
function checkUserConf(id) {
	var data = getJSONData("/publish/systemconfi/updateUserConfState.htm", {
		id : id,
		state : true,
		tag : Math.random()
	}, "post");
	if (data.state) {
		showUserConfiForm();// 刷新操作
	}
}
// 用户默认配置保存方法(整理)
function saveUserConf() {

}
/** **************************************用户配置结束**************************************** */

/** **************************************故障自处理开始**************************************** */
// 故障自处理菜单加载的方法(整理)
function showGuZhangChuLiForm() {
	pageTitle = "故障处理";
	init();
	var confTab = "<table id='tab' width='100%' border=0 cellspacing=0 cellpadding=0>"
			+ "</table>";
	$("<div/>").addClass("list").appendTo("#right");
	$("<fieldset/>").addClass("fieldsetsytle").appendTo(".list");
	$("<legend/>").html("<b>" + "故障处理配置" + "</b>").appendTo(".fieldsetsytle");
	$(confTab).appendTo(".fieldsetsytle");
	var data = getJSONData(
			"/publish/systemconfi/getManageItemListByCategoryId.htm",
			{
				categoryId : oimsCategory.MANAGEITEM_CATEGORY_ID_GUZHANGZICHULI,
				tag : Math.random()
			}, "post");
	if (data.state) {
		var itemlist = data.obj;
		$.each(itemlist, function(i, d) {
			var tr = $("<tr/>").appendTo("#tab");
			var td1 = $("<td nowrap='nowrap'/>").attr("id", "state" + i + "")
					.attr("width", "18%").addClass("system").appendTo(tr);// 状态
			if (d.state) {// 启用状态可以执行禁用操作
				$("input[name='vals" + i + "']").removeAttr("disabled");
				$(
						"<a href='javascript:chgState(" + i + "," + false + ","
								+ d.id + ""
								+ ");'><span class='disable'></span><span>"
								+ "禁用" + "</span></a>").appendTo(td1);
			} else {// 禁用状态可以执行启用操作
				$("input[name='vals" + i + "']").attr("disabled", "disabled");
				$(
						"<a href='javascript:chgState(" + i + "," + true + ","
								+ d.id
								+ ");'><span class='using'></span><span>"
								+ "启用" + "</span></a>").appendTo(td1);
			}
			var td2 = $("<td nowrap='nowrap'/>").attr("width", "64%").appendTo(// 名称描述
			tr);
			$("<p>" + d.manager + "</p>").addClass("title3").appendTo(td2);
			$("<p><b>" + "简要描述" + "：</b>" + d.info + "</p>").appendTo(td2);
			$("<td nowrap='nowrap'/>").attr("width", "7%").appendTo(tr);// 空td
			var td4 = $("<td nowrap='nowrap'/>").appendTo(tr);
			$(
					"<input type='radio' name='vals" + i
							+ "' value='1' onclick='chgVals(this.value," + d.id
							+ ");'/><span>" + d.yesdesc + "</span>").appendTo(
					td4);// true
			var td5 = $("<td nowrap='nowrap'/>").appendTo(tr);
			$(
					"<input type='radio' name='vals" + i
							+ "' value='0' onclick='chgVals(this.value," + d.id
							+ ");'/><span>" + d.nodesc + "</span>").appendTo(
					td5);// false

			$("input[name='vals" + i + "'][value=" + d.vals + "]").attr(
					"checked", true);// 选中状态
		});
	}

}

// 系统配置启用禁用的操作(整理)
function chgState(index, state, id) {
	var data = getJSONData("/publish/systemconfi/updateManageitemState.htm", {
		id : id,
		state : state,
		tag : Math.random()
	}, "post");
	if (data.state) {
		if (state) {
			$("input[name='vals" + index + "']").removeAttr("disabled");
			$("#state" + index).text("").html(
					"<a href='javascript:chgState(" + index + "," + false + ","
							+ id + ");'><span class='disable'></span><span>"
							+ "禁用" + "</span></a>");
		} else {
			$("input[name='vals" + index + "']").attr("disabled", "disabled");
			$("#state" + index).text("").html(
					"<a href='javascript:chgState(" + index + "," + true + ","
							+ id + ");'><span class='using'></span><span>"
							+ "启用" + "</span></a>");
		}

	}
}

// 故障自处理是否的操作(整理)
function chgVals(vals, id) {
	var data = getJSONData("/publish/systemconfi/updateManageitemVals.htm", {
		id : id,
		vals : vals,
		tag : Math.random()
	}, "post");
	if (data.state) {

	}
}
/** **************************************故障自处理结束**************************************** */

/** *****************************************水印配置开始******************************************* */
// 水印配置启用禁用操作(整理)
function waterConfigChgState(state, id) {
	var data = getJSONData("/publish/systemconfi/updateManageitemState.htm", {
		id : id,
		state : state,
		tag : Math.random()
	}, "post");
	if (data.state) {
		if (state) {
			start_Btns();
			$("#qyjyC").text("").html(
					"<a href='javascript:waterConfigChgState(" + false + ","
							+ id + ");'><span class='disable'></span><span>"
							+ "禁用" + "</span></a>");
		} else {
			prohibit_Btns();
			$("#qyjyC").text("").html(
					"<a href='javascript:waterConfigChgState(" + true + ","
							+ id + ");'><span class='using' ></span><span>"
							+ "启用" + "</span></a>");
		}

	}
}

// 禁用水印操作按钮(整理)
function prohibit_Btns() {
	$("#a_add").unbind("click", a_add_bind);
	$(".add").removeClass().addClass("adda");
	$("#a_update").unbind("click", a_update_bind);
	$(".edit").removeClass().addClass("edita");
	$("#a_del").unbind("click", a_del_bind);
	$(".del").removeClass().addClass("dela");
};

// 启用水印操作按钮(整理)
function start_Btns() {
	$("#a_add").bind("click", a_add_bind);
	$(".adda").removeClass().addClass("add");
	$("#a_update").bind("click", a_update_bind);
	$(".edita").removeClass().addClass("edit");
	$("#a_del").bind("click", a_del_bind);
	$(".dela").removeClass().addClass("del");
};

function showWatermark() {
	var c_addWatermark = "water/add.htm";// 新增水印配置
	var c_updateWatermark = "water/update.htm";// 修改水印配置
	var c_findAllWatermark = "water/findAll.htm";
	pageTitle = "水印配置";
	init();
	var ele = "<div class='advquery'>"
			+ "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
			+ "<tr>"
			+ "<td width='23%' id='qyjyC'></td>"
			+ "<td width='9%'></td>"
			+ "<td width='9%'></td>"
			+ "<td width='59%'>"
			+ "<div class='btn'>"
			+ "<a id='a_add'	onclick='return false;' ><span class='add'></span>"
			+ "新增"
			+ "</a>"
			+ "<a id='a_update' onclick='return false;'><span class='edit'></span>"
			+ "修改"
			+ "</a>"
			+ "<a id='a_del' onclick='return false;'	><span class='del'></span>"
			+ "删除" + "</a>" + "</div>" + "</td>" + "</tr>" + "</table>"
			+ "</div>" + "<div class='list'>" + "</div>";
	// 添加元素
	$("#right").append($(ele));
	// 添加事件

	// 水印配置新增的方法(整理)
	a_add_bind = function() {
		waterConfigForm(c_addWatermark, "新增", c_findAllWatermark, "add");
	};

	// 水印配置修改的方法(整理)
	a_update_bind = function() {
		var dataObjects = getCheckBoxValue();
		if (dataObjects.length == 0) {
			$.oimsAlert("请选择需要修改的水印配置");
			return;
		}
		var f = waterConfigForm(c_updateWatermark, "修改", c_findAllWatermark,
				"edit");
		f.append($("<input type='hidden' name='id' id='id' />"));
		waterConfigFormSetValue(dataObjects[0], f, c_findAllWatermark);// 修改窗口页面赋值
	};
	// 水印配置删除的方法(整理)
	a_del_bind = function() {
		var dataObjects = getCheckBoxValue();
		if (dataObjects.length == 0) {
			$.oimsAlert("请选择需要删除的水印配置");
			return;
		}
		$.oimsConfirm({
			strTitle : "是否确认删除该水印配置",
			remove_length : true
		}, doDeleteWaterConfig);
		function doDeleteWaterConfig() {
			var dataObjects = getCheckBoxValue();
			var url_deleteWaterconfigById = "/publish/water/deleteWaterconfigById.htm";
			var data = getJSONData(url_deleteWaterconfigById, {
				id : dataObjects[0].id,
				tag : Math.random()
			}, "post");
			if (data.state)
				$.oimsSucc("水印配置信息删除成功", waterConfigList(c_findAllWatermark));
			else
				$.oimsError("水印配置信息删除失败", waterConfigList(c_findAllWatermark));
		}
	};

	var url_getManageItemById = "/publish/systemconfi/getManageItemById.htm";// 根据系统配置ID查询系统配置对象
	var data_getManageItemById = getJSONData(url_getManageItemById, {
		id : oimsCategory.MANAGEITEM_ID_SHUIYINPEIZHI,// 日志配置ID 值为12
		tag : Math.random()
	}, "post");
	if (data_getManageItemById.state) {
		var data_obj_getManageItemById = data_getManageItemById.obj;
		if (data_obj_getManageItemById.state) {
			start_Btns();
			$(
					"<a href='javascript:waterConfigChgState(" + false + ","
							+ data_obj_getManageItemById.id
							+ ");'><span class='disable'></span><span>" + "禁用"
							+ "</span></a>").appendTo("#qyjyC");
		} else {
			prohibit_Btns();
			$(
					"<a href='javascript:waterConfigChgState(" + true + ","
							+ data_obj_getManageItemById.id
							+ ");'><span class='using'></span><span>" + " 启用"
							+ "</span></a>").appendTo("#qyjyC");
		}
	} else {
		$.oimsError("根据系统配置ID查询系统配置对象出错");
	}
	// 显示已存在水印列表
	waterConfigList(c_findAllWatermark);
};

// 水印配置信息修改窗口赋值操作(整理)
function waterConfigFormSetValue(d, f) {
	var url_getById = "/publish/water/getById.htm";
	var data_getById = getJSONData(url_getById, {
		id : d.id,
		tag : Math.random()
	}, "post");
	if (data_getById.state) {
		var waterconfig = data_getById.obj;
		$("#id", f).val(waterconfig.id);
		$("#title", f).val(waterconfig.title);
		$("#wfilename", f).val(waterconfig.wfilename);
		$("#x", f).val(waterconfig.x);
		$("#y", f).val(waterconfig.y);
		$("#alpha", f).val(waterconfig.alpha);
		$("#wthumbfilename", f).val(waterconfig.wthumbfilename);
		$("#thumbX", f).val(waterconfig.thumbX);
		$("#thumbY", f).val(waterconfig.thumbY);
		$("#thumbAlpha", f).val(waterconfig.thumbAlpha);
		$("#glbmid option", f).each(function() {
			if ($(this).val() == waterconfig.glbmid)
				$(this).attr("selected", "selected");
		});
		$("#jcxmid option", f).each(function() {
			if ($(this).val() == waterconfig.jcxmid)
				$(this).attr("selected", "selected");
		});
		if (waterconfig.wthumbfilename != "")
			$("#sl").attr("src", contextPath + waterconfig.wthumbfilename);
		if (waterconfig.wfilename != "")
			$("#yt").attr("src", contextPath + waterconfig.wfilename);
	}
};

// 水印新增，修改表单(整理)
function waterConfigForm(url, title, refactorUrl, ico) {
	var addFormEle = "<table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">\n"
			+ "  <tbody><tr>\n"
			+ "    <td width=\"14%\" nowrap=\"nowrap\" align=\"right\">"
			+ "标题"
			+ "：</td>\n"
			+ "    <td width=\"21%\"><input id='title' name='title' type=\"text\" class=\"blur\" onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" ></td>\n"
			+ "    <td width=\"12%\" nowrap=\"nowrap\" align=\"right\">"
			+ "检查项目"
			+ "：</td>\n"
			+ "    <td width=\"21%\"><select name='jcxmid' id='jcxmid' onblur=\"this.className='blur'\">\n"
			+ "      <option value=\"\"> </option>\n"
			+ "    </select></td>\n"
			+ "    <td width=\"15%\" nowrap=\"nowrap\" align=\"right\">"
			+ "所属科室"
			+ "：</td>\n"
			+ "    <td width=\"15%\"><select name='glbmid' id='glbmid' onblur=\"this.className='blur'\">\n"
			+ "      <option value=\"\"></option>\n"
			+ "    </select></td>\n"
			+ "    </tr>\n"
			+ "  <tr>\n"
			+ "    <td nowrap=\"nowrap\" align=\"right\">"
			+ "水印X轴(原)"
			+ "：</td>\n"
			+ "    <td align=\"left\"><input name='x' id='x' type=\"text\" class=\"blur\" onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" ></td>\n"
			+ "    <td nowrap=\"nowrap\" align=\"right\">"
			+ "水印Y轴(原)"
			+ "：</td>\n"
			+ "    <td><input name='y' id='y' type=\"text\" class=\"blur\" onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" ></td>\n"
			+ "    <td nowrap=\"nowrap\" align=\"right\">"
			+ "透明度(原)"
			+ "：</td>\n"
			+ "    <td width=\"12%\"><input name='alpha' id='alpha' type=\"text\" class=\"blur\" onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" ></td>\n"
			+ "  </tr>\n"
			+ "  <tr>\n"
			+ "    <td align=\"right\">"
			+ "水印X轴(缩)"
			+ "：</td>\n"
			+ "    <td align=\"left\"><input name='thumbX' id='thumbX' type=\"text\" class=\"blur\" onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" ></td>\n"
			+ "    <td align=\"right\">"
			+ "水印Y轴(缩)"
			+ "：</td>\n"
			+ "    <td><input name='thumbY' id='thumbY' type=\"text\" class=\"blur\" onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" ></td>\n"
			+ "    <td align=\"right\">"
			+ "透明度(缩)"
			+ "： </td>\n"
			+ "    <td><input name='thumbAlpha' id='thumbAlpha' type=\"text\" class=\"blur\" onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" ></td>\n"
			+ "  </tr>\n"
			+ "  <tr>\n"
			+ "    <td nowrap=\"nowrap\" align=\"right\">"
			+ "水印图片(原)"
			+ "：</td>\n"
			+ "    <td align=\"left\" colspan=\"2\" id='sfile_C'>"
			+ "<div id='file_C'>"
			+ "<div class='searchfile'>"
			+ "<input type='file' name='url_excel_yuyan' id ='file' class='filed'/>"
			+ "<div class='fieldstyle'><input type='text' name='txt_fieldstyle' id='txt_fieldstyle' class='fieldtext'/></div>"
			+ "<div class='buttonstyle'><input type='button'  id='btn_yuyan' class='fieldbutton'/></div>"
			+ "</div>"
			+ "</div>"
			+ "</td>\n"
			+ "<td align=\"right\">"
			+ "水印图片(缩)"
			+ "：</td>\n"
			+ "<td align=\"right\" colspan=\"2\" id='tfile_C'>"
			+ "<div id='file_C'>"
			+ "<div class='searchfile'>"
			+ "<input type='file' name='url_excel_yuyan' id ='tfile'  class='filed'/>"
			+ "<div class='fieldstyle'><input type='text' name='txt_fieldstyle' id='txt_fieldstyle' class='fieldtext'/></div>"
			+ "<div class='buttonstyle'><input type='button'  id='btn_yuyan' class='fieldbutton'/></div>"
			+ "</div>"
			+ "</div>"
			+ "</td>\n"
			+ "</tr>\n"
			+ "<tr>"
			+ "<td align=\"left\" colspan=\"3\"> <img id='yt' width='300' height='100'  /></td>"
			+ "<td align=\"right\" colspan=\"3\"> <img id='sl' width='300' height='100' /></td>"
			+ "</tr>" + "     </tbody></table>" + "";

	var f = $("<form/>").attr("action", contextPath + "/publish/" + url).attr(
			"method", "post").attr("enctype", "multipart/form-data");
	f.append($(addFormEle));
	// 图片自动提交
	$("#file", f).change(
			function() {
				fileUpload({
					uploadTag : "yt",
					fileId : "file",
					func : function(rt, id) {
						if (rt.state) {
							if (rt.obj != "")
								$("#yt").attr("src", contextPath + rt.obj);
							$("#" + id).remove();
							f.append($("<input type='hidden' name='ytPath'/>")
									.val(rt.obj));
						}

					}
				});
			});
	$("#tfile", f).change(
			function() {
				fileUpload({
					uploadTag : "sl",
					fileId : "tfile",
					func : function(rt, id) {
						if (rt.state) {
							if (rt.obj != "")
								$("#sl").attr("src", contextPath + rt.obj);
							$("#" + id).remove();
							f.append($("<input type='hidden' name='slPath' />")
									.val(rt.obj));
						}
					}
				});
			});
	f
			.oimsDialog({
				winType : 4,
				icon : ico,
				title : title,
				drag : false,
				locked : false,
				width : "850",
				height : "320",
				button : [
						{
							title : "提交",// 按纽文字
							func : function() {// 响应函数
								if (!WaterconfigValidate()) {
									return false;
								}
								$("#file", f).remove();
								$("#tfile", f).remove();
								f.ajaxForm();
								f.ajaxSubmit({
									complete : function(d) {
										var rt = {};
										var bro = $.browser;
										if (bro.chrome) {
											rt = JSON.parse(d.responseText);
										} else {
											rt = JSON.parse(d.responseText);
										}
										if (rt.state) {
											$.oimsSucc("水印配置操作成功");
											waterConfigList(refactorUrl);// 刷新操作
											f.parent().parent().remove();
										} else {
											$.oimsError("水印配置操作失败", function() {
												waterConfigList(refactorUrl);// 刷新操作
												f.parent().parent().remove();
											});
										}
									}
								});

							},
							isCloseWin : false,// 点击后，是否关闭窗口 true关闭，false不关闭
							className : "sumit"// 指定CSS名称
						},
						{
							title : "重置",// 按纽文字
							func : function() {// 响应函数
								if (ico == "add") {
									$("#id", f).val("");
									$("#title", f).val("");
									$("#wfilename", f).val("");
									$("#x", f).val("");
									$("#y", f).val("");
									$("#alpha", f).val("");
									$("#wthumbfilename", f).val("");
									$("#thumbX", f).val("");
									$("#thumbY", f).val("");
									$("#thumbAlpha", f).val("");
									$("#glbmid option", f).each(
											function() {
												if ($(this).val() == "")
													$(this).attr("selected",
															"selected");
											});
									$("#jcxmid option", f).each(
											function() {
												if ($(this).val() == "")
													$(this).attr("selected",
															"selected");
											});
									return;
								}
								if (ico == "edit") {
									var d = getCheckBoxValue()[0];
									var url_getById = "/publish/water/getById.htm";
									var data_getById = getJSONData(url_getById,
											{
												id : d.id,
												tag : Math.random()
											}, "post");
									if (data_getById.state) {
										var waterconfig = data_getById.obj;
										$("#id", f).val(waterconfig.id);
										$("#title", f).val(waterconfig.title);
										$("#wfilename", f).val(
												waterconfig.wfilename);
										$("#x", f).val(waterconfig.x);
										$("#y", f).val(waterconfig.y);
										$("#alpha", f).val(waterconfig.alpha);
										$("#wthumbfilename", f).val(
												waterconfig.wthumbfilename);
										$("#thumbX", f).val(waterconfig.thumbX);
										$("#thumbY", f).val(waterconfig.thumbY);
										$("#thumbAlpha", f).val(
												waterconfig.thumbAlpha);
										$("#glbmid option", f)
												.each(
														function() {
															if ($(this).val() == waterconfig.glbmid)
																$(this)
																		.attr(
																				"selected",
																				"selected");
														});
										$("#jcxmid option", f)
												.each(
														function() {
															if ($(this).val() == waterconfig.jcxmid)
																$(this)
																		.attr(
																				"selected",
																				"selected");
														});
										if (waterconfig.wthumbfilename != "")
											$("#sl")
													.attr(
															"src",
															contextPath
																	+ waterconfig.wthumbfilename);
										if (waterconfig.wfilename != "")
											$("#yt")
													.attr(
															"src",
															contextPath
																	+ waterconfig.wfilename);
									}
									return;
								}
							},
							isCloseWin : false,// 点击后，是否关闭窗口 true关闭，false不关闭
							className : "reset"// 指定CSS名称
						} ]
			});
	addJcks("glbmid");// 添加检查科室数据
	addJcxm("jcxmid");// 添加检查项目数据
	$.customfile('fieldbutton', 'filed', 'fieldtext', "openWin", $("#sfile_C"));
	$.customfile('fieldbutton', 'filed', 'fieldtext', "openWin", $("#tfile_C"));
	$(".fieldstyle").each(function() {
		$(this).width($(this).width() - 70);
	});
	$("input[name='txt_fieldstyle']").each(function() {
		$(this).css("float", "left");
	});
	return f;
};

// 水印图片上传操作(整理)@param p{uploadTag:"",fileId:"",func:function(rt){}}
function fileUpload(p) {
	var url = contextPath + "/publish/water/fileUpload.htm";
	var ff = $("<form action='" + url + "' id='tempForm' />").attr("method",
			"post").attr("enctype", "multipart/form-data");
	$("#" + p.fileId).appendTo(ff);
	$("#" + p.fileId, ff).attr("name", "oimsUpload");
	$("#" + p.fileId, ff).val();
	$("<input type='hidden' name='uploadTag' />").val(p.uploadTag).appendTo(ff);
	ff.appendTo("body");
	ff.hide();
	ff.ajaxForm();
	ff.ajaxSubmit({
		complete : function(d) {
			var rt = {};
			if ($.browser.chrome) {
				rt = JSON.parse($(d.responseText).text());
			} else {
				rt = JSON.parse(d.responseText);
			}
			$("#" + p.fileId).appendTo($("#" + p.fileId + "_C"));
			if (typeof (p.func) == "function")
				p.func(rt, "tempForm");
		}
	});

};

// 水印列表(整理)
function waterConfigList(url) {
	listFactor = {
		listObj : [ {
			title : "序号",
			key : "xh"
		}, {
			title : "标题",
			key : "title"
		}, {
			title : "水印图片(原)",
			key : "wfilename"
		}, {
			title : "水印X轴(原)",
			key : "x"
		}, {
			title : "水印Y轴(原)",
			key : "y"
		}, {
			title : "透明度",
			key : "alpha"
		}, {
			title : "水印图片(缩)",
			key : "wthumbfilename"
		}, {
			title : "水印X轴(缩)",
			key : "thumbX"
		}, {
			title : "水印Y轴(缩)",
			key : "thumbY"
		}, {
			title : "透明度(缩)",
			key : "thumbAlpha"
		}, {
			title : "所属科室",
			key : "bmmc"
		}, {
			title : "检查项目",
			key : "xmmc"
		} ],
		url : contextPath + "/publish/" + url,
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : 10,// Page类的方法
			tag : Math.random()
		}
	};
	$("#pageList").remove();
	var div_list = $(".list");
	$(div_list).createPageList(listFactor);
};
// 添加检查科室数据(整理)
function addJcks(selectId) {

	var url_findAllBuMen = "/publish/bumen/findAllBuMen.htm";
	var data_findAllBuMen = getJSONData(url_findAllBuMen, {
		tag : Math.random()
	}, "post");
	$.each(data_findAllBuMen.obj, function(i, v) {
		var o = $("<option />").val(v.id).text(v.bmmc);
		$("#" + selectId).append(o);
	});
};
// 添加检查项目数据(整理)
function addJcxm(selectId, jcksid) {
	var url_findAllJcxm = "/publish/jcxm/findAllJcxm.htm";
	var data_list_jcxmobj = getJSONData(url_findAllJcxm, {
		tag : Math.random()
	}, "post");
	$.each(data_list_jcxmobj.obj, function(i, v) {
		var o = $("<option />").val(v.id).text(v.xmmc);
		$("#" + selectId).append(o);
	});
};

// 表单验证(整理)
function WaterconfigValidate() {
	var oValidataData = {
		nullValidataData : {
			'title' : '标题为空',
			'jcxmid' : '检查项目为空',
			'glbmid' : '所属科室为空',
			'x' : '水印X轴(原)为空',
			'y' : '水印Y轴(原)为空',
			'alpha' : '透明度(原)为空',
			'thumbX' : '水印X轴(缩)为空',
			'thumbY' : '水印X轴(缩)为空',
			'thumbAlpha' : '透明度(缩)为空'
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);// 带*为必填项
		return false;
	}
	return true;
};
/** *****************************************水印配置结束******************************************* */

/** ***************************************************语言配置开始***************************************************** */
function showLanguage() {
	pageTitle = "语言配置";
	init();
	var el = "<div class='list'>" + "<div class='systemlanguage'>"
			+ "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
			+ "<tbody><tr>" + "<td width='41%'>" + "语言类型" + "：</td>"
			+ "<td width='21%' id='languageC'></td>"
			+ "<td width='38%'>&nbsp;</td>" + "</tr>" + "</tbody></table>"
			+ "</div>  " + "</div>";
	var btn = "<div class='sumitbutton'>"
			+ "<a id='ok'><span class='advsumit'></span>" + "提交" + "</a>"
			+ "<a id='reset'><span class='advreset'></span>" + "重置" + "</a>"
			+ "</div>" + $("#right").append($(el));
	$("#right").append($(btn));
	// 语言类型下拉框赋值
	$("#languageC").append(categorySelect({
		elId : "language",
		elName : "language",
		fid : oimsCategory.YUYAN_FENLEi
	}));
	yuYanPeiZhiLoadData();// 语言配置加载页面赋值方法
	$("#ok").click(function() {
		var vals = $("#language").val();
		var url_updateManageItem = "/publish/systemconfi/updateManageItem.htm";// 系统配置表信息修改
		var data_updateManageItem = getJSONData(url_updateManageItem, {
			id : oimsCategory.MANAGEITEM_ID_YUYANPEIZHI,// 语言配置ID
			// 值为11
			vals : vals,
			tag : Math.random()
		}, "post");
		if (data_updateManageItem.state) {
			$.oimsSucc("语言配置操作成功");
		} else {
			$.oimsError("语言配置操作失败");
		}
	});
	// 重置按钮调用的方法
	$("#reset").click(function() {
		yuYanPeiZhiLoadData();
	});
};

// 语言配置加载页面赋值方法(整理)
function yuYanPeiZhiLoadData() {
	var url_getManageItemById = "/publish/systemconfi/getManageItemById.htm";// 根据系统配置ID查询系统配置对象
	var data_getManageItemById = getJSONData(url_getManageItemById, {
		id : oimsCategory.MANAGEITEM_ID_YUYANPEIZHI,// 语言配置ID 值为11
		tag : Math.random()
	}, "post");
	if (data_getManageItemById.state) {
		$("#language option").each(function() {
			if ($(this).val() == data_getManageItemById.obj.vals)
				$(this).attr("selected", "selected");
		});
	} else {
		$.oimsError("根据系统配置ID查询系统配置对象出错");
	}
};
/**
 * @author 于洋
 * @param p
 *            ,{elId:"",elName:"",fid:"category 表父级id",nullOption:""}
 */
function categorySelect(p) {
	var rt = getJSONData(getCategoriesUrl, {
		fatherId : p.fid
	});
	if (!rt.state) {// 错误处理，暂未写
		return 0;
	}
	var slt = $("<select />").attr("id", p.elId).attr("name", p.elName);
	if (p.nullOption)
		slt.append($("<option />"));
	$.each(rt.obj, function(i, v) {
		slt.append($("<option />").val(v.id).text(v.category));
	});
	return slt;
}
/** ***************************************************语言配置结束***************************************************** */
// -------------------------------系统日志配置开始---------------------------------------------------
// 表单控件禁用
function prohibit_SysLogConf() {
	// $("#day").attr("disabled", "disabled");
	// $("#typeC").attr("disabled", "disabled");
	// $("#safeC").attr("disabled", "disabled");
};
// 表单控件
function start_SysLogConf() {
	// $("#day").removeAttr("disabled");
	// $("#typeC").removeAttr("disabled");
	// $("#safeC").removeAttr("disabled");
};
// 系统日志启用禁用状态改变方法(整理)
function sysLogChgState(state, id) {
	var data = getJSONData("/publish/systemconfi/updateManageitemState.htm", {
		id : id,
		state : state,
		tag : Math.random()
	}, "post");
	if (data.state) {
		if (state) {
			start_SysLogConf();
			$("#qyjyC").text("").html(
					"<a href='javascript:sysLogChgState(" + false + "," + id
							+ ");'><span class='disable'></span><span>" + "禁用"
							+ "</span></a>");
		} else {
			prohibit_SysLogConf();
			$("#qyjyC").text("").html(
					"<a href='javascript:sysLogChgState(" + true + "," + id
							+ ");'><span class='using'></span><span>" + "启用"
							+ "</span></a>");
		}

	}
}
// 日志配置(整理)
function sytLogShow() {
	pageTitle = "日志配置";
	init();
	var el = "<div class='note'>"
			+ "       <table cellspacing='0' cellpadding='0' border='0' align='center'>"
			+ "<tbody><tr>"
			+ "<th colspan='2' id='qyjyC'>"
			+ " </th>"
			+ "<tr>"
			+ "<td width='114' align='right'>"
			+ "删除天数"
			+ "：</td>"
			+ " <td width='384' align='left'>"
			+ "<input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='day' name='day'></td>"
			+ "  </tr>" + " <tr>" + "<td align='right'>" + "清空类型" + "：</td>"
			+ "<td align='left' >" + "<select id='delType' name='state'>"
			+ "<option value='0'>" + "用户日志" + "</option>"
			+ "<option value='1'>" + "系统日志" + "</option>"
			+ "<option value='2'>" + "全部" + "</option>" + "</select>" + "</td>"
			+ "  </tr>" + "<tr>" + "<td align='right'>" + "日志级别" + "：</td>"
			+ "<td align='left'>" + "<select id='safeType' name='rzjb'>"
			+ "<option value='1'>" + "查询操作" + "</option>"
			+ "<option value='2'>" + "保存操作" + "</option>"
			+ "<option value='2'>" + "修改操作" + "</option>"
			+ "<option value='2'>" + "删除操作" + "</option>"
			+ "<option value='3'>" + "所有操作" + "</option>" + "</select>"
			+ "</td>" + " </tr>" + "<tr>"
			+ "<td colspan='2'><div class='openbutton'>"
			+ "   <a id='a_submit'><span class='advsumit'></span>" + "提交"
			+ "</a>" + "    <a id='a_reset'><span class='advreset'></span>"
			+ "重置" + "</a>" + "</div></td>" + " </tr>" + "    </tbody></table>"
			+ "</div>";
	$("#right").append($(el));
	var url_getManageItemById = "/publish/systemconfi/getManageItemById.htm";// 根据系统配置ID查询系统配置对象
	var data_getManageItemById = getJSONData(url_getManageItemById, {
		id : oimsCategory.MANAGEITEM_ID_RIZHIPEIZHI,// 日志配置ID 值为12
		tag : Math.random()
	}, "post");
	if (data_getManageItemById.state) {
		var data_obj_getManageItemById = data_getManageItemById.obj;
		if (data_obj_getManageItemById.state) {
			start_SysLogConf();
			$(
					"<a href='javascript:sysLogChgState(" + false + ","
							+ data_obj_getManageItemById.id
							+ ");'><span class='disable'></span><span>" + "禁用"
							+ "</span></a>").appendTo("#qyjyC");
		} else {
			prohibit_SysLogConf();// 所有表单不可以修改
			$(
					"<a href='javascript:sysLogChgState(" + true + ","
							+ data_obj_getManageItemById.id
							+ ");'><span class='using'></span><span>" + "启用"
							+ "</span></a>").appendTo("#qyjyC");
		}
	} else {
		$.oimsError("根据系统配置ID查询系统配置对象出错");
	}

	sysLogLoadData();// 基础数据赋值方法
	$("#a_submit")
			.click(
					function() {
						var _day = $("#day").val();
						var _type = $("#delType").val();
						var _safe = $("#safeType").val();
						var vals = "{_day:" + _day + ",_type:" + _type
								+ ",_safe:" + _safe + "}";
						var url_updateManageItem = "/publish/systemconfi/updateManageItem.htm";// 系统配置表信息修改
						var data_updateManageItem = getJSONData(
								url_updateManageItem,
								{
									id : oimsCategory.MANAGEITEM_ID_RIZHIPEIZHI,// 日志配置ID
									// 值为12
									vals : vals,
									tag : Math.random()
								}, "post");
						if (data_updateManageItem.state) {
							$.oimsSucc("日志配置操作成功");
						} else {
							$.oimsError("日志配置操作失败");
						}
					});
	$("#a_reset").click(function() {
		sysLogLoadData();
	});

};
// 日志配置信息加载赋值方法(整理)
function sysLogLoadData() {
	var url_getManageItemById = "/publish/systemconfi/getManageItemById.htm";// 根据系统配置ID查询系统配置对象
	var data_getManageItemById = getJSONData(url_getManageItemById, {
		id : oimsCategory.MANAGEITEM_ID_RIZHIPEIZHI,// 日志配置ID 值为12
		tag : Math.random()
	}, "post");
	if (data_getManageItemById.state) {
		var vals = eval('(' + data_getManageItemById.obj.vals + ')');
		$("#day").val(vals._day);
		$("#delType option").each(function() {
			if ($(this).val() == vals._type) {
				$(this).attr("selected", "selected");
				return false;
			}
		});
		$("#safeType option").each(function() {
			if ($(this).val() == vals._safe) {
				$(this).attr("selected", "selected");
				return false;
			}
		});
	} else {
		$.oimsError("根据系统配置ID查询系统配置对象出错");
	}
};
// -------------------------------系统日志配置结束---------------------------------------------------

// -------------------------------短信平台配置开始---------------------------------------------------
function showSMS() {
	pageTitle = "短信平台配置"/* "短信平台配置" */;
	init();
	/** *********************************html代码拼接开始******************************************** */
	var note = $("<div />").attr("class", "note");
	var table = $("<table />").attr({
		"cellspacing" : "0",
		"cellpadding" : "0",
		"border" : "0",
		"align" : "center"
	});
	// 启用禁用图标
	var first = $("<tr />").append($("<th />").attr({
		"colspan" : "2",
		"id" : "qyjyC"
	}));
	var td_2_1 = $("<td />").attr({
		"width" : "114",
		"align" : "right"
	}).append("接入方式" + ":"/* "接入方式：" */);

	var td_2_2 = $("<td />").attr({
		"width" : "384",
		"align" : "left"
	}).append($("<input />").attr({
		"type" : "radio",
		"id" : "mode_1",
		"name" : "access_mode",
		"value" : "socket",
		"style" : "width:30px"
	})).append($("<label />").attr({
		"for" : "mode_1"
	}).append("socket"))
	// ""
	.append($("<input />").attr({
		"type" : "radio",
		"id" : "mode_2",
		"name" : "access_mode",
		"value" : "webservice",
		"style" : "width:30px"
	})).append($("<label />").attr({
		"for" : "mode_2"
	}).append("webservice"));
	// 接入方式单选radio
	var second = $("<tr />").append(td_2_1).append(td_2_2);
	var td_3_1 = $("<td />").attr({
		"colspan" : "2",
		"align" : "left",
		"style" : "padding-left: 30px;font-weight:bold; "
	}).append("Socket");
	var third = $("<tr />").append(td_3_1);
	var td_3_1_1 = $("<td />").attr("align", "right")
			.append("服务器地址" + "："/* "服务器地址：" */);
	var td_3_1_2 = $("<td />").attr("align", "left").append(
			$("<input />").attr({
				"type" : "text",
				"id" : "server_address"
			}));
	var tr_3_1 = $("<tr />").append(td_3_1_1).append(td_3_1_2);
	var td_3_2_1 = $("<td />").attr("align", "right")
			.append("服务器端口" + ":"/* "服务器端口：" */);
	var td_3_2_2 = $("<td />").attr("align", "left").append(
			$("<input />").attr({
				"type" : "text",
				"id" : "server_port"
			}));
	var tr_3_2 = $("<tr />").append(td_3_2_1).append(td_3_2_2);
	var td_3_3_1 = $("<td />").attr("align", "right")
			.append("用户名" + ":"/* "用户名：" */);
	var td_3_3_2 = $("<td />").attr("align", "left").append(
			$("<input />").attr({
				"type" : "text",
				"id" : "username"
			}));
	var tr_3_3 = $("<tr />").append(td_3_3_1).append(td_3_3_2);
	var td_3_4_1 = $("<td />").attr("align", "right")
			.append("密码" + ":"/* "密码：" */);
	var td_3_4_2 = $("<td />").attr("align", "left").append(
			$("<input />").attr({
				"type" : "text",
				"id" : "password"
			}));
	var tr_3_4 = $("<tr />").append(td_3_4_1).append(td_3_4_2);
	var td_4_1 = $("<td />").attr({
		"colspan" : "2",
		"align" : "left",
		"style" : "padding-left: 30px;font-weight:bold;"
	}).append("Webservice");
	var tr_4 = $("<tr />").append(td_4_1);
	var td_5_1 = $("<td />").attr("align", "right").append("URL：");
	var td_5_2 = $("<td />").attr("align", "left").append($("<input />").attr({
		"type" : "text",
		"id" : "url_address"
	}));
	var tr_5 = $("<tr />").append(td_5_1).append(td_5_2);
	var button_1 = $("<td />").attr("colspan", "2").append(
			$("<div />").attr("class", "openbutton").append(
					$("<a />").attr("id", "sms_submit").append(
							$("<span>").attr("class", "advsumit"))
							.append("保存"/* "保存" */)).append(
					$("<a />").attr("id", "sms_resert").append(
							$("<span>").attr("class", "advsumit"))
							.append("重置"/* "重置" */)));
	var tr_6 = $("<tr />").append(button_1);
	table.append(first).append(second).append(third).append(tr_3_1).append(
			tr_3_2).append(tr_3_3).append(tr_3_4).append(tr_4).append(tr_5)
			.append(tr_6);
	note.append(table);
	$("#right").append(note);
	/** *********************************html代码拼接结束******************************************** */
	var data = getJSONData(
			"/publish/systemconfi/getManageItemListByCategoryId.htm", {
				categoryId : 208,
				tag : Math.random()
			}, "post");
	var qyjy = $("#qyjyC");
	sms_submit_bind = function() {
		var access_mode = $("input[name='access_mode']:checked").val();
		var server_address = $("#server_address").val();
		var server_port = $("#server_port").val();
		var username = $("#username").val();
		var password = $("#password").val();
		var url_address = $("#url_address").val();
		if (access_mode == 'socket') {
			var server_address_validate = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
			if (isNaN(server_port) || parseInt(server_port) > 65535
					|| parseInt(server_port) < 0
					|| !(server_address_validate.test(server_address))) {
				$.oimsError("验证失败，请检查端口号和服务器地址验证");
				;

			} else {
				updateManagerItem_sms(16, access_mode);
				updateManagerItem_sms(17, server_address);
				updateManagerItem_sms(18, server_port);
				updateManagerItem_sms(19, username);
				updateManagerItem_sms(20, password);
				updateManagerItem_sms(21, url_address);
				$.oimsSucc("短信平台配置操作成功");
			}

		} else {
			var reg = "^((https|http|ftp|rtsp|mms)://)?[a-z0-9A-Z]{3}\.[a-z0-9A-Z][a-z0-9A-Z]{0,61}?[a-z0-9A-Z]\.com|net|cn|cc (:s[0-9]{1-4})?/$";
			if (url_address.match(reg)) {
				updateManagerItem_sms(16, access_mode);
				updateManagerItem_sms(17, server_address);
				updateManagerItem_sms(18, server_port);
				updateManagerItem_sms(19, username);
				updateManagerItem_sms(20, password);
				updateManagerItem_sms(21, url_address);
				$.oimsSucc("短信平台配置操作成功");
			} else {
				$("#url_address").focus();
				$("#url_address").val('');
				$.oimsError("URL验证不通过");
			}
		}
		;

	};

	// 重置方法
	sms_resert_bind = function() {
		smsconfigload(16, "access_mode");
		smsconfigload(17, "server_address");
		smsconfigload(18, "server_port");
		smsconfigload(19, "username");
		smsconfigload(20, "password");
		smsconfigload(21, "url_address");
	};

	smsconfig_changehtml(data, qyjy);

	// socket接入方式
	$("#mode_1").change(function() {
		$("#server_address").removeAttr("disabled");
		$("#server_port").removeAttr("disabled");
		$("#username").removeAttr("disabled");
		$("#password").removeAttr("disabled");
		$("#url_address").attr("disabled", "disabled");
	});
	// webservice接入方式
	$("#mode_2").change(function() {
		$("#url_address").removeAttr("disabled");
		$("#server_address").attr("disabled", "disabled");
		$("#server_port").attr("disabled", "disabled");
		$("#username").attr("disabled", "disabled");
		$("#password").attr("disabled", "disabled");
	});
	smsconfigload(16, "access_mode");// 赋值
	smsconfigload(17, "server_address");
	smsconfigload(18, "server_port");
	smsconfigload(19, "username");
	smsconfigload(20, "password");
	smsconfigload(21, "url_address");
}

// 页面控件赋值(整理)
function smsconfigload(id, htmlid) {
	var url_getManageItemById = "/publish/systemconfi/getManageItemById.htm";
	data_getManageItemById = getJSONData(url_getManageItemById, {
		id : id,
		tag : Math.random()
	}, "post");
	if (data_getManageItemById.state) {
		if (data_getManageItemById.obj.id == 16) {
			if (data_getManageItemById.obj.vals == "socket") {
				$("#mode_1").attr("checked", "checked");
				$("#mode_1").change();
			} else {
				$("#mode_2").change();
				$("#mode_2").attr("checked", "checked");

			}
		} else {
			$("#" + htmlid).val(data_getManageItemById.obj.vals);
		}
	} else {
		$.oimsError("根据ID查询系统配置对象出错");
	}
}

function updateManagerItem_sms(id, vals) {

	$.post(contextPath + "/publish/systemconfi/updateManageItem.htm", {
		id : id,
		vals : vals
	}, function(data) {

		if (data.state != 1) {
			return false;
		}

	}, "json");

}

function smsconfig_changestate(state, id) {
	var data = getJSONData("/publish/systemconfi/updateManageitemState.htm", {
		id : id,
		state : state,
		tag : Math.random()
	}, "post");
	var data = getJSONData(
			"/publish/systemconfi/getManageItemListByCategoryId.htm", {
				categoryId : 208,
				tag : Math.random()
			}, "post");

	var qyjy = $("#qyjyC");

	smsconfig_changehtml(data, qyjy);
}

// 禁用启用操作(整理)
function smsconfig_changehtml(data, qyjy) {
	if (data.state) {
		var d = data.obj[0];
		if (d.state) {
			var a = $("<a />").attr(
					{
						"href" : "javascript:smsconfig_changestate(" + false
								+ "," + d.id + ")"
					}).append($("<span />").attr("class", "disable")).append(
					$("<span />").text("禁用"));
			qyjy.empty();
			qyjy.append(a);
			smsconfig_inputstate_start();
			var access_mode = $("input[name='access_mode']:checked").val();
			if (access_mode == "socket") {
				$("#mode_1").attr("checked", "checked");
				$("#mode_1").change();
			} else {
				$("#mode_2").attr("checked", "checked");
				$("#mode_2").change();
			}
		} else {
			var a = $("<a />").attr(
					{
						"href" : "javascript:smsconfig_changestate(" + true
								+ "," + d.id + ")"
					}).append($("<span />").attr("class", "using")).append(
					$("<span />").text("启用"));
			qyjy.empty();
			qyjy.append(a);
			smsconfig_inputstate_stop();
		}
	}
}

function smsconfig_inputstate_start() {
	$("#mode_1").removeAttr("disabled");
	$("#mode_2").removeAttr("disabled");
	$("#server_address").removeAttr("disabled");
	$("#server_port").removeAttr("disabled");
	$("#username").removeAttr("disabled");
	$("#password").removeAttr("disabled");
	$("#url_address").removeAttr("disabled");
	$("#sms_submit").bind("click", sms_submit_bind);
	$("#sms_resert").bind("click", sms_resert_bind);

}

function smsconfig_inputstate_stop() {
	$("#mode_1").attr("disabled", "disabled");
	$("#mode_2").attr("disabled", "disabled");
	$("#server_address").attr("disabled", "disabled");
	$("#server_port").attr("disabled", "disabled");
	$("#username").attr("disabled", "disabled");
	$("#password").attr("disabled", "disabled");
	$("#url_address").attr("disabled", "disabled");
	$("#sms_submit").unbind("click", sms_submit_bind);
	$("#sms_resert").unbind("click", sms_resert_bind);
}

/** ************************************************数据库配置开始************************************************** */
// 启用操作(整理)
function prohibit_DataBaseConf() {
	// $("#bakPath").attr("disabled", "disabled");
	// $("#bakup_times").attr("disabled", "disabled");
	// $("#bakup_days").attr("disabled", "disabled");
	// $("#a_submit").unbind("click", a_submit_bind);
	// $("#a_reset").unbind("click", a_reset_bind);
};

// 禁用操作(整理)
function start_DataBaseConf() {
	// $("#bakPath").removeAttr("disabled");
	// $("#bakup_times").removeAttr("disabled");
	// $("#bakup_days").removeAttr("disabled");
	// $("#a_submit").bind("click", a_submit_bind);
	// $("#a_reset").bind("click", a_reset_bind);
};

// 数据库配置的启用禁用操作(整理)
function DataBaseConfChgState(state, id) {
	var data = getJSONData("/publish/systemconfi/updateManageitemState.htm", {
		id : id,
		state : state,
		tag : Math.random()
	}, "post");
	if (data.state) {
		if (state) {
			start_DataBaseConf();
			$("#qyjyC").text("").html(
					"<a href='javascript:DataBaseConfChgState(" + false + ","
							+ id + ");'><span class='disable' ></span><span>"
							+ "禁用" + "</span></a>");
		} else {
			prohibit_DataBaseConf();
			$("#qyjyC").text("").html(
					"<a href='javascript:DataBaseConfChgState(" + true + ","
							+ id + ");'><span class='using'></span><span>"
							+ "启用" + "</span></a>");
		}

	}
}

/**
 * {_path:'文件路径',_time:'备份时间',_safe:'备份频率'}
 */
// 数据库配置加载方法(整理)
function showDb() {
	pageTitle = "数据库配置";
	init();
	var el = "<div class='note'>"
			+ "<table cellspacing='0' cellpadding='0' border='0' align='center'>"
			+ "<tbody><tr>"
			+ "<th colspan='2' id='qyjyC'> </th>"
			+ "<tr>"
			+ "<td width='114' align='right'>"
			+ "备份路径"
			+ "：</td>"
			+ " <td width='384' align='left'>"
			+ "<input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='bakPath' name='bakPath'>"
			+ "</td>" + "  </tr>" + " <tr>" + "<td align='right'>" + "备份时间"
			+ "：</td>" + "<td align='left'>"
			+ "<select id='bakup_times' name='bakup_times'>"
			+ "<option value='19:00'>19:00</option>"
			+ "<option value='20:00'>20:00</option>"
			+ "<option value='21:00'>21:00</option>"
			+ "<option value='22:00'>22:00</option>"
			+ "<option value='23:00'>23:00</option>"
			+ "<option value='24:00'>24:00</option>"
			+ "<option value='1:00'>1:00</option>"
			+ "<option value='2:00'>2:00</option>"
			+ "<option value='3:00'>3:00</option>"
			+ "<option value='4:00'>4:00</option>" + "</select>" + "</td>"
			+ "  </tr>" + "<tr>" + "<td align='right'>" + "备份频率" + "：</td>"
			+ "<td align='left'>"
			+ "<select id='bakup_days' name='bakup_days'>"
			+ "<option value='1'>" + "天" + "</option>" + "<option value='7'>"
			+ "周" + "</option>" + "<option value='30'>" + "月" + "</option>"
			+ "<option value='90'>" + "季" + "</option>"
			+ "<option value='360'>" + "年" + "</option>" + "</select>"
			+ "</td>" + " </tr>" + "<tr>"
			+ "<td colspan='2'><div class='openbutton'>"
			+ "            <a id='a_submit'><span class='advsumit'></span>"
			+ "提交" + "</a>"
			+ "             <a id='a_reset'><span class='advreset'></span>"
			+ "重置" + "</a>" + "</div></td>" + " </tr>" + "</tbody></table>"
			+ "</div>";

	$("#right").append($(el));
	dbLoadData();// 数据库配置加载页面赋值方法
	$("#a_submit")
			.click(
					function() {
						var _day = $("#bakPath").val();
						var _type = $("#bakup_times").val();
						var _safe = $("#bakup_days").val();
						var vals = "{_path:'" + _day + "',_time:'" + _type
								+ "',_rate:'" + _safe + "'}";
						var url_updateManageItem = "/publish/systemconfi/updateManageItem.htm";// 系统配置表信息修改
						var data_updateManageItem = getJSONData(
								url_updateManageItem,
								{
									id : oimsCategory.MANAGEITEM_ID_SHUJUKUPEIZHI,// 数据库配置ID
									// 值为13
									vals : vals,
									tag : Math.random()
								}, "post");
						if (data_updateManageItem.state) {
							$.oimsSucc("数据库配置操作成功");
						} else {
							$.oimsError("数据库配置操作失败");
						}
					});
	// 重置按钮调用的方法
	$("#a_reset").click(function() {
		dbLoadData();
	});
	var url_getManageItemById = "/publish/systemconfi/getManageItemById.htm";// 根据系统配置ID查询系统配置对象
	var data_getManageItemById = getJSONData(url_getManageItemById, {
		id : oimsCategory.MANAGEITEM_ID_SHUJUKUPEIZHI,// 数据库配置ID 值为13
		tag : Math.random()
	}, "post");
	if (data_getManageItemById.state) {
		data_obj_getManageItemById = data_getManageItemById.obj;
		if (data_obj_getManageItemById.state) {
			start_DataBaseConf();
			$(
					"<a href='javascript:DataBaseConfChgState(" + false + ","
							+ data_obj_getManageItemById.id
							+ ");'><span class='disable' ></span><span>" + "禁用"
							+ "</span></a>").appendTo("#qyjyC");
		} else {
			prohibit_DataBaseConf();
			$(
					"<a href='javascript:DataBaseConfChgState(" + true + ","
							+ data_obj_getManageItemById.id
							+ ");'><span class='using' ></span><span>" + "启用"
							+ "</span></a>").appendTo("#qyjyC");
		}
	} else {
		$.oimsError("根据系统配置ID查询系统配置对象出错");
	}
};
// 数据库配置加载页面赋值方法(整理)
function dbLoadData() {
	var url_getManageItemById = "/publish/systemconfi/getManageItemById.htm";// 根据系统配置ID查询系统配置对象
	var data_getManageItemById = getJSONData(url_getManageItemById, {
		id : oimsCategory.MANAGEITEM_ID_SHUJUKUPEIZHI,// 数据库配置ID 值为13
		tag : Math.random()
	}, "post");
	if (data_getManageItemById.state) {
		var vals = eval('(' + data_getManageItemById.obj.vals + ')');
		$("#bakPath").val(vals._path);
		$("#bakup_times option").each(function() {
			if ($(this).val() == vals._time) {
				$(this).attr("selected", "selected");
				return false;
			}
		});
		$("#bakup_days option").each(function() {
			if ($(this).val() == vals._rate) {
				$(this).attr("selected", "selected");
				return false;
			}
		});
	} else {
		$.oimsError("根据系统配置ID查询系统配置对象出错");
	}
};
/** ************************************************数据库配置结束************************************************** */
/** ************************************************自动排队配置开始************************************************** */
function showAutoPaiDui() {
	pageTitle = "自动排队配置";
	init();
	var confTab = "<table id='tab' width='100%' border=0 cellspacing=0 cellpadding=0>"
			+ "</table>";
	$("<div/>").addClass("list").appendTo("#right");
	$("<fieldset/>").addClass("fieldsetsytle").appendTo(".list");
	$("<legend/>").html("<b>" + "自动排队配置" + "</b>").appendTo(".fieldsetsytle");
	$(confTab).appendTo(".fieldsetsytle");
	var data = getJSONData(
			"/publish/systemconfi/getManageItemListByCategoryId.htm",
			{
				categoryId : oimsCategory.MANAGEITEM_CATEGORY_ID_ZIDONGPAIDUIPEIZHI,
				tag : Math.random()
			}, "post");
	if (data.state) {
		var itemlist = data.obj;
		$.each(itemlist, function(i, d) {
			var tr = $("<tr/>").appendTo("#tab");
			var td1 = $("<td nowrap='nowrap'/>").attr("id", "state" + i + "")
					.attr("width", "18%").addClass("system").appendTo(tr);
			var td2 = $("<td nowrap='nowrap'/>").attr("width", "64%").appendTo(
					tr);
			$("<p>" + d.manager + "</p>").addClass("title3").appendTo(td2);
			$("<p><b>" + "简要描述" + "：</b>" + d.info + "</p>").appendTo(td2);
			$("<td nowrap='nowrap'/>").attr("width", "7%").appendTo(tr);
			var td4 = $("<td nowrap='nowrap'/>").appendTo(tr);
			$(
					"<input type='radio' name='vals" + i
							+ "' value='1' onclick='chgVals(this.value," + d.id
							+ ");'/><span>" + d.yesdesc + "</span>").appendTo(
					td4);
			var td5 = $("<td nowrap='nowrap'/>").appendTo(tr);
			$(
					"<input type='radio' name='vals" + i
							+ "' value='0' onclick='chgVals(this.value," + d.id
							+ ");'/><span>" + d.nodesc + "</span>").appendTo(
					td5);
			$("input[name='vals" + i + "'][value=" + d.vals + "]").attr(
					"checked", true);
			if (d.state) {
				$("input[name='vals" + i + "']").removeAttr("disabled");
				$(
						"<a href='javascript:chgState(" + i + "," + false + ","
								+ d.id
								+ ");'><span class='disable'></span><span>"
								+ "禁用" + "</span></a>").appendTo(td1);
			} else {
				$("input[name='vals" + i + "']").attr("disabled", "disabled");
				$(
						"<a href='javascript:chgState(" + i + "," + true + ","
								+ d.id
								+ ");'><span class='using'></span><span>"
								+ "启用" + "</span></a>").appendTo(td1);
			}

		});
	}
};
/** ************************************************自动排队配置结束************************************************** */

