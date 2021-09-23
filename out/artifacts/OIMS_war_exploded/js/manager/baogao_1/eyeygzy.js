// 眼底造影检查报告必要的数据初始化
//眼别
var data_eyeygzy_yanbie = [ {
	value : '',
	text : ''
}, {
	value : '左眼',
	text : '左眼'
}, {
	value : '右眼',
	text : '右眼'
}, {
	value : '双眼',
	text : '双眼'
} ];
//检查方法
var data_eyeygzy_ygzy_method = [{
	value : '',
	text : ''
},{
	value : 'FFA单项',
	text : 'FFA单项'
},{
	value : 'FFA全套',
	text : 'FFA全套'
},{
	value : 'ICGA单项',
	text : 'ICGA单项'
},{
	value : 'ICGA全套',
	text : 'ICGA全套'
},{
	value : '自发荧光(FFA)',
	text : '自发荧光(FFA)'
},{
	value : '自发荧光(ICGA)',
	text : '自发荧光(ICGA)'
},{
	value : '眼底彩色照相',
	text : '眼底彩色照相'
},{
	value : '立体照相',
	text : '立体照相'
},{
	value : '广角镜检查',
	text : '广角镜检查'
}];
function initData_eyeygzy() {
	//眼别下拉框赋值
	if($("#yanbie").length == 1){
		for ( var i = 0; i< data_eyeygzy_yanbie.length; i++) {
			$("<option value='"+data_eyeygzy_yanbie[i].value+"'>"
					+data_eyeygzy_yanbie[i].text
					+"</option>").appendTo($("#yanbie"));
		}
	}
	//检查方法下拉框赋值
	if($("#ygzy_method").length == 1){
		for ( var i = 0; i < data_eyeygzy_ygzy_method.length; i++) {
			$("<option value='"+data_eyeygzy_ygzy_method[i].value+"'>"
					+data_eyeygzy_ygzy_method[i].text
					+"</option>").appendTo($("#ygzy_method"));
		}
	}
	// 申请医生下拉框赋值
//	if ($("#rep_doc").length == 1) {
//		var data_getKaiDanDoctorByQuanxian = getJSONData(
//				"/publish/yuangong/getKaiDanDoctorByQuanxian.htm", {
//					tag : Math.random()
//				}, "post");
//		if (data_getKaiDanDoctorByQuanxian.state) {
//			var yuangonglist = data_getKaiDanDoctorByQuanxian.obj;
//			$.each(yuangonglist, function(i, yuangong) {
//				$(
//						"<option value=\"" + yuangong.gonghao + "\">"
//								+ yuangong.xingming + "</option>").appendTo(
//						"#rep_doc");
//			});
//		}
//	}
	// 申请医生下拉框赋值

	// 检查医生下拉框赋值
	if ($("#doctor").length == 1) {
		var data_getJianChaDoctorByBumenAndQuanxian = getJSONData(
				"/publish/yuangong/getJianChaDoctorByBumenAndQuanxian.htm", {// 获取具有检查权限的医生
					tag : Math.random()
				}, "post");
		if (data_getJianChaDoctorByBumenAndQuanxian.state) {
			var yuangonglist = data_getJianChaDoctorByBumenAndQuanxian.obj;
			$.each(yuangonglist, function(i, yuangong) {
				$(
						"<option value=\"" + yuangong.gonghao + "\">"
								+ yuangong.xingming + "</option>").appendTo(
						"#doctor");
			});
		}
	}
	// 检查医生下拉框赋值
	var url_outBaogaoHelp = "/publish/baogao/outBaogaoHelp.htm";// 查询该报告页面所有元素信息
	var patameter_outBaogaoHelp = {
		id : dataObjects_choice[0].jcdid,// 检查单ID
		huanzheId : dataObjects_choice[0].huanzheId,// 患者ID
		tag : Math.random()
	};
	var data_outBaogaoHelp = getJSONData(url_outBaogaoHelp,
			patameter_outBaogaoHelp, "post");
	if (data_outBaogaoHelp.state) {
		initial_Baogao(data_outBaogaoHelp.obj);// 报告页面各元素赋值
	}

	/** ********************************b超信息********************************** */
	var url_selectEyeygzyByEyeygzy = "/publish/Eyeygzy/selectEyeygzyByEyeygzy.htm";// 根据荧光造影报告对象查询符合条件的荧光造影报告对象
	var data_selectEyeygzyByEyeygzy = getJSONData(
			url_selectEyeygzyByEyeygzy, {
				jcdId : dataObjects_choice[0].jcdid,
				tag : Math.random()
			}, "post");
	if (data_selectEyeygzyByEyeygzy.state) {
//		showReportPictures();// 显示报告图片
		var eyeygzy = data_selectEyeygzyByEyeygzy.obj;
		if (eyeygzy != null) {
			if ($("#memo").length == 1)
				$("#memo").val(eyeygzy.memo);
			if ($("#yanbie").length == 1)
				$("#yanbie").val(eyeygzy.yanbie);
			if ($("#ygzy_no").length == 1)
				$("#ygzy_no").val(eyeygzy.ygzy_no);
			if ($("#ygzy_method").length == 1)
				$("#ygzy_method").val(eyeygzy.ygzy_method);
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyeygzy.cli_date);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyeygzy.rep_doc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyeygzy.doctor);// 检查医生
			if (data_outBaogaoHelp.obj.reportDate != eyeygzy.cli_date) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyeygzy);
			}
//			else {
//				initPictureOperate();
//			}
		} 
//		else {
//			initPictureOperate();
//		}
	}
	/** ********************************b超信息********************************** */

}
/** ********************************图片信息********************************** */
//function showReportPictures() {
//	var url_selectEyereportpicturesByEyereportpicture = "/publish/Eyereportpicture/selectEyereportpicturesByEyereportpicture.htm";
//	var data_selectEyereportpicturesByEyereportpicture = getJSONData(
//			url_selectEyereportpicturesByEyereportpicture, {
//				jcdId : dataObjects_choice[0].jcdid,
//				tag : Math.random()
//			}, "post");
//	if (data_selectEyereportpicturesByEyereportpicture.state) {
//		$
//				.each(
//						data_selectEyereportpicturesByEyereportpicture.obj,
//						function(i, Eyereportpicture) {
//							var operateDiv = $(".operateDiv");
//							var array_div = $(operateDiv)[0].children;
//							if (array_div[i] != undefined) {
//								$(array_div[i]).html("");
//								var id_image = encryption();
//								var clientWidth = array_div[i].clientWidth;
//								var clientHeight = array_div[i].clientHeight;
//								var url_getImageInfoByPath = "/publish/image/getImageInfoByPath.htm";
//								var path_Image = Eyereportpicture.path_picture
//										.substring(Eyereportpicture.path_picture
//												.indexOf("/") + 1);
//								path_Image = path_Image.substring(path_Image
//										.indexOf("/") + 1);
//								path_Image = path_Image.split("/").join("\\");
//								var data_getImageInfoByPath = getJSONData(
//										url_getImageInfoByPath, {
//											"path_Image" : path_Image,
//											"clientWidth" : clientWidth,
//											"clientHeight" : clientHeight,
//											tag : Math.random()
//										}, "post");
//								if (data_getImageInfoByPath.state) {
//									var image_div = $("<img/>")
//											.attr("id", id_image)
//											.attr(
//													"style",
//													"width:"
//															+ data_getImageInfoByPath.obj.width
//															+ "px;height:"
//															+ data_getImageInfoByPath.obj.height
//															+ "px;")
//											.attr(
//													"src",
//													Eyereportpicture.path_picture)
//											.attr("class", "class_image_div");
//									$(image_div).appendTo(array_div[i]);
//								}
//							}
//						});
//	}
//}
/** ********************************图片信息********************************** */
/** **************************************图片相关操作开始**************************************** */
//function initPictureOperate() {
//	var div_i = $("<div/>").attr("id", "div_i").attr("class", "i").attr(
//			"style", "display:none;");// 删除div
//	$(div_i).appendTo("#div_reportdiv");
//	/** 选取图片div开始 */
//	var div_chooseopendiv = $("<div/>").attr("id", "div_chooseopendiv").attr(
//			"class", "chooseopendiv").appendTo("#div_reportdiv");// 选取图片div
//	var div_chooseclosebtn = $("<div/>").attr("id", "div_chooseclosebtn").attr(
//			"class", "chooseclosebtn").appendTo(div_chooseopendiv);// 关闭图片div
//	var div_chooseclosebtn_html = "<span>" + "关闭图片" + "</span>";
//	$(div_chooseclosebtn_html).appendTo(div_chooseclosebtn);// 关闭图片
//	$("<div/>").attr("id", "div_chooseopenimg").attr("class", "chooseopenimg")
//			.appendTo(div_chooseopendiv);// 所有图片div
//	var div_chooseimg = $("<div/>").attr("id", "div_chooseimg").attr("class",
//			"chooseimg").appendTo("#div_reportdiv");// 打开选取图片div
//	var div_chooseimg_html = "<span>" + "选取图片" + "</span>";
//	$(div_chooseimg_html).appendTo(div_chooseimg);
//	/** 选取图片div结束 */
//	setCss_Chooseopendiv();
//	setClick_div_baogao_picture();// 设置图片div的click事件
//	setCSS_div_baogao_picture();// div为黑色边框
//	showImagesOfJcd();// 显示检查图片
//	// body添加事件
//	$(document.body).mouseover(
//			function(e) {
//				var event = window.event || e;
//				var target = event.srcElement || event.target;
//				var className = $(target).attr("class");
//				if (className != "class_img" && className != "i"
//						&& className != "class_image_div") {
//					$(".i").css({
//						"position" : "absolute",
//						"display" : "none",
//						"left" : "0px",
//						"top" : "0px"
//					});
//				}
//				;
//			});
//
//	// 图片移除事件
//	$(".i").click(function(e) {
//		$(this.parentNode.firstChild).remove();
//		$(".i").css("display", "none");
//		$(".i").appendTo("#div_reportdiv");
//		showImagesOfJcd();
//	});
//	var operateDiv = $(".operateDiv");
//	var array_div = $(operateDiv)[0].children;
//	if (array_div.length > 0) {
//		current_object_div = array_div[0];
//		$(current_object_div).css("border", "1px solid red");
//	}
//
//}
//
//// 设置图片选取div的样式
//function setCss_Chooseopendiv() {
//	var width = $(".chooseopendiv").width(), divHeight = $("body").height()
//			- $(".header").height() - $(".footer").height(), divTop = $(
//			".header").height(), divOpenHeight = divHeight - 22;
//	$(".chooseopendiv").css({
//		"right" : "-" + width + "px",
//		"height" : divHeight + "px",
//		"top" : divTop + "px"
//	});
//	$(".chooseopenimg").css("height", divOpenHeight + "px");
//	$(".chooseimg").click(function() {
//		// 从数据库中获取数据
//		$(this).animate({
//			"opacity" : "0"
//		}, 100, function() {
//			$(this).css("z-index", "-9999");
//			$(".chooseopendiv").animate({
//				"right" : "0px"
//			}, "slow");
//		});
//	});
//	$(".chooseclosebtn").click(function() {
//		$(".chooseopendiv").animate({
//			"right" : "-" + width + "px"
//		}, "slow", function() {
//			$(".chooseimg").css({
//				"opacity" : "1",
//				"z-index" : "9999"
//			}, 10);
//		});
//	});
//}
//
//// 设置图片div的click事件
//function setClick_div_baogao_picture() {
//	var operateDiv = $(".operateDiv");
//	var array_div = $(operateDiv)[0].children;
//	for ( var i = 0; i < array_div.length; i++) {
//		$(array_div[i]).bind("click", function() {
//			setCSS_div_baogao_picture();
//			$(this).css("border", "1px solid red");
//			current_object_div = this;
//		});
//		$(array_div[i]).mouseover(function(e) {
//			var event = window.event || e;
//			var target = event.srcElement || event.target;
//			if (target.tagName.toLowerCase() == "img") {
//				var left = target.offsetLeft + target.offsetWidth - 16;
//				var top = target.offsetTop - $("#right")[0].scrollTop;
//				if (top < parseInt($("#header").height())) {
//					$(".i").css("display", "none");
//				} else {
//					$(".i").css({
//						"position" : "absolute",
//						"display" : "",
//						"left" : left + "px",
//						"top" : top + "px",
//						"z-index" : "9999"
//					});
//				}
//				$(".i").appendTo(this);
//			}
//		});
//		$("#right").scroll(function() {
//			$(".i").css("display", "none");
//		});
//	}
//}
//
//// 设置图片div的css样式 黑色边框样式(整理)
//function setCSS_div_baogao_picture() {
//	var operateDiv = $(".operateDiv");
//	var array_div = $(operateDiv)[0].children;
//	for ( var i = 0; i < array_div.length; i++)
//		$(array_div[i]).css("border", "1px solid black");
//}
//
//// 显示图片(整理)
//function showImagesOfJcd() {
//	$("#div_chooseopenimg").html("");
//	var url_getFileListByJcd = "/publish/jcd/getFileListByJcd.htm";
//	var data_getFileListByJcd = getJSONData(url_getFileListByJcd, {
//		id : dataObjects_choice[0].jcdid,
//		tag : Math.random()
//	}, "post");
//	if (data_getFileListByJcd.state) {
//		var div_oimsslide_gallery = $("<div/>").attr("id",
//				"div_oimsslide_gallery").attr("class", "oimsslide-gallery")
//				.appendTo("#div_chooseopenimg");// oimsslide
//		// div
//		var div_oimsslide_gallery_html = "";// div_oimsslide_gallery div内容
//		var breakCondition = false;
//		var operateDiv = $(".operateDiv");
//		var array_div = $(operateDiv)[0].children;
//		$
//				.each(
//						data_getFileListByJcd.obj,
//						function(i, data_Photo) {
//							for ( var i = 0; i < array_div.length; i++) {
//								if (array_div[i].children.length > 0
//										&& array_div[i].firstChild.tagName
//												.toLowerCase() == "img") {
//									var src_img = $(array_div[i].children[0])
//											.attr("src");
//									if (src_img == (contextPath + data_Photo.path
//											.replace("thumb/", ""))) {
//										breakCondition = true;
//										break;
//									} else
//										breakCondition = false;
//								} else
//									breakCondition = false;
//							}
//							if (!breakCondition) {
//								var fileFormat = data_Photo.path.substring(
//										data_Photo.path.lastIndexOf(".") + 1)
//										.toLowerCase();// 获取文件格式
//								if (fileFormat == "jpg" || fileFormat == "gif"
//										|| fileFormat == "bmp") {
//									div_oimsslide_gallery_html += "<div style='height: 200px;width: 190px;vertical-align: middle;text-align: center;float: left;padding-top:5px'>";
//									div_oimsslide_gallery_html += "<a href='"
//											+ contextPath
//											+ data_Photo.path.replace("thumb/",
//													"")
//											+ "' class='oimsslide' onclick='return hs.expand(this);'>";
//									div_oimsslide_gallery_html += "<img style='height:160px;width:185px;' src='"
//											+ contextPath
//											+ data_Photo.path
//											+ "' alt='oimsslide JS' title='双击放大' /></a>";
//									div_oimsslide_gallery_html += "<div><input type='checkbox' name='checkbox_baogao_picture' id='checkbox_baogao_picture' value='"
//											+ contextPath
//											+ data_Photo.path.replace("thumb/",
//													"")
//											+ "' onclick='click_checkbox_baogao_picture(this)'/></div>";
//									div_oimsslide_gallery_html += "</div>";
//								}
//							}
//						});
//		$(div_oimsslide_gallery_html).appendTo(div_oimsslide_gallery);
//	}
//}
//
//// 单击事件 复选框(整理)
//function click_checkbox_baogao_picture(object_checkbox_baogao_picture) {
//	if (current_object_div == undefined) {
//		var operateDiv = $(".operateDiv");
//		var array_div = $(operateDiv)[0].children;
//		if (array_div.length > 0)
//			current_object_div = array_div[0];
//	}
//	$(".i").appendTo("#div_reportdiv");
//	$(current_object_div).html("");
//	var id_image = encryption();
//	var clientWidth = current_object_div.clientWidth;
//	var clientHeight = current_object_div.clientHeight;
//	var image_current_object_div = dengbisuofang.createImg(id_image,
//			object_checkbox_baogao_picture.value, clientWidth, clientHeight);
//	$(image_current_object_div).appendTo(current_object_div);
//	$(image_current_object_div).attr("class", "class_image_div");
//	showImagesOfJcd();// 显示图片
//}
//
//// 生成一个随机数(整理)
//var encryption = function() {
//	var date = new Date();
//	var times1970 = date.getTime();
//	var times = date.getDate() + "" + date.getHours() + "" + date.getMinutes()
//			+ "" + date.getSeconds();
//	var encrypt = times * times1970;
//	if (arguments.length == 1) {
//		return arguments[0] + encrypt;
//	} else {
//		return encrypt;
//	}
//};

/** **************************************图片相关操作结束**************************************** */
// 荧光造影检查报告保存
function saveOrUpdateEyeygzy() {
	var oValidataData = {
			nullValidataData : {
				'memo' : '结果为空',
				'ygzy_method' : '检查方法为空',
				'yanbie' : '眼别为空'
			}
		};
		var sReturn = fnFormValidata(oValidataData);
		if (sReturn != null) {
			$.oimsAlert(sReturn);// 带*为必填项
			return;
		}
//	var path_pictures = "";
//	var operateDiv = $(".operateDiv");
//	var array_div = $(operateDiv)[0].children;
//	for ( var i = 0; i < array_div.length; i++) {
//		if (array_div[i].children.length > 0
//				&& array_div[i].firstChild.tagName.toLowerCase() == "img")
//			path_pictures += ($(array_div[i].children[0]).attr("src")) + ",";
//	}
	var jcdId = dataObjects_choice[0].jcdid;// 检查单ID
	var huanzhexinxi_id = dataObjects_choice[0].huanzheId;// 患者ID

	var memo = $("#memo").val();
	var yanbie = $("#yanbie").val();
	var ygzy_no = $("#ygzy_no").val();
	var ygzy_method = $("#ygzy_method").val();

	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var cli_date = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyeygzy = {
//		path_pictures : path_pictures,
		jcdId : jcdId,
		huanzhexinxi_id : huanzhexinxi_id,
		memo : memo,
		yanbie : yanbie,
		ygzy_no : ygzy_no,
		ygzy_method : ygzy_method,
		rep_doc : rep_doc,
		doctor : doctor,
		cli_date : cli_date,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		tag : Math.random()
	};
	var url_saveOrUpdateEyeygzy = "/publish/Eyeygzy/saveOrUpdateEyeygzy.htm";// 荧光造影检查报告保存
	var data_saveOrUpdateEyeygzy = getJSONData(url_saveOrUpdateEyeygzy,
			parameter_saveOrUpdateEyeygzy, "post");
	if (data_saveOrUpdateEyeygzy.state)
		$.oimsSucc("眼底造影检查报告保存成功", function() {

		});
	else
		$.oimsError("眼底造影检查报告保存失败", function() {

		});
}

// 荧光造影检查报告打印预览
function previewEyeygzy() {
	var oValidataData = {
			nullValidataData : {
				'memo' : '结果为空',
				'ygzy_method' : '检查方法为空',
				'yanbie' : '眼别为空'
			}
		};
		var sReturn = fnFormValidata(oValidataData);
		if (sReturn != null) {
			$.oimsAlert(sReturn);// 带*为必填项
			return;
		}
//	var path_pictures = "";
//	var operateDiv = $(".operateDiv");
//	var array_div = $(operateDiv)[0].children;
//	for ( var i = 0; i < array_div.length; i++) {
//		if (array_div[i].children.length > 0
//				&& array_div[i].firstChild.tagName.toLowerCase() == "img")
//			path_pictures += ($(array_div[i].children[0]).attr("src")) + ",";
//	}
	var jcdId = dataObjects_choice[0].jcdid;// 检查单ID
	var huanzhexinxi_id = dataObjects_choice[0].huanzheId;// 患者ID

	var memo = $("#memo").val();
	var yanbie = $("#yanbie").val();
	var ygzy_no = $("#ygzy_no").val();
	var ygzy_method = $("#ygzy_method").val();

	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var rep_doc_name = $("#rep_doc option:selected").text();// 申请医生
	var doctor_name = $("#doctor option:selected").text();// 检查医生
	var cli_date = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyeygzy = {
//		path_pictures : path_pictures,
		jcdId : jcdId,
		huanzhexinxi_id : huanzhexinxi_id,
		memo : memo,
		yanbie : yanbie,
		ygzy_no : ygzy_no,
		ygzy_method : ygzy_method,
		rep_doc : rep_doc,
		doctor : doctor,
		rep_doc_name : rep_doc_name,// 申请医生姓名
		doctor_name : doctor_name,// 检查医生姓名
		cli_date : cli_date,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		tag : Math.random()
	};
	parameter_saveOrUpdateEyeygzy = JSON.stringify(
			parameter_saveOrUpdateEyeygzy)
			.replace(new RegExp("\"", "gm"), "'");
	var html_div_reportresult = "<div id='div_reportresult'>"
			+ $("#div_reportresult").html() + "</div>";// 报告内容
	var printWindow = window.open("");
	html_baogao = "";
	html_baogao += "<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'>";
	html_baogao += "<html>";
	html_baogao += "<head>";
	html_baogao += "<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>";
	html_baogao += "<title>报告预览</title>";
	html_baogao += "<script language='javascript'> var contextPath='"
			+ contextPath + "';</script>";
	html_baogao += "<link rel='stylesheet' type='text/css' href='"
			+ contextPath + "/css/main.css' rel='stylesheet' type='text/css'>";
	html_baogao += "<link rel='stylesheet' type='text/css' href='"
			+ contextPath
			+ "/style/green/css/green.css' rel='stylesheet' type='text/css'>";
	html_baogao += "<link rel='stylesheet' type='text/css' href='"
			+ contextPath + "/css/icon.css' rel='stylesheet' type='text/css'>";
	html_baogao += "<link rel='stylesheet' type='text/css' href='"
			+ contextPath
			+ "/style/green/css/openWin.css' rel='stylesheet' type='text/css'>";
	html_baogao += "<script src='" + contextPath
			+ "/js/jquery.min.js'></script>";
	html_baogao += "<script src='" + contextPath + "/js/common.js'></script>";
	html_baogao += "<script src='" + contextPath
			+ "/js/jquery.oimsDialog.js'></script>";
	html_baogao += "<script src='" + contextPath
			+ "/js/oimsCategory.config.js'></script>";
	html_baogao += "<script src='" + contextPath
			+ "/js/manager/baogao/language.config.js'></script>";
	html_baogao += "<script src='" + contextPath
			+ "/js/manager/baogao/previewEyeygzy.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyeygzy="
			+ parameter_saveOrUpdateEyeygzy + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}
