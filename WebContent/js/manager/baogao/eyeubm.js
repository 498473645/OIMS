// UBM检查报告必要的数据初始化
function initData_eyeubm() {
	/*备注添加快速录入*/
	$("#memo").dblclick(function(){
		var tab = createTable();
		var form_memo = $("<form/>").attr("id", "form_memo")
		$(tab).appendTo(form_memo);
		var div_openbutton = $("<div/>").attr("id", "div_openbutton").attr("class",
				"openbutton").appendTo(form_memo);// 底部div
		var div_openbutton_html = "<a href='javascript:fuzhi_data();'><span class='advsumit'></span>"
				+ "提交"
				+ "</a> <a href='javascript:reset_data();'><span class='advreset'></span>"
				+ "重置" + "</a>";
		$(div_openbutton_html).appendTo(div_openbutton);
		$(form_memo).oimsDialog({
			icon : "add",
			title : "快速输入",
			width : 700,
			height : 205,
			drag : true,// 是否可以拖动窗口
			locked : true,
			winType : 4,
			button : null
		});
	});
	/*备注添加快速录入*/
	
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

	/** ********************************UBM信息********************************** */
	var url_selectEyeubmByEyeubm = "/publish/Eyeubm/selectEyeubmByEyeubm.htm";// 根据UBM报告对象查询符合条件的UBM报告对象
	var data_selectEyeubmByEyeubm = getJSONData(
			url_selectEyeubmByEyeubm, {
				jcdId : dataObjects_choice[0].jcdid,
				tag : Math.random()
			}, "post");
	if (data_selectEyeubmByEyeubm.state) {
//		showReportPictures();// 显示报告图片
		var eyeubm = data_selectEyeubmByEyeubm.obj;
		if (eyeubm != null) {
			if ($("#memo").length == 1)
				$("#memo").val(eyeubm.memo);
			if ($("#ubm_no").length == 1)
				$("#ubm_no").val(eyeubm.ubm_no);
			if ($("#cli_date").length == 1)
				$("#cli_date").html(eyeubm.cli_date);// 报告日期
			if ($("#rep_doc").length == 1)
				$("#rep_doc").val(eyeubm.rep_doc);// 申请医生
			if ($("#doctor").length == 1)
				$("#doctor").val(eyeubm.doctor);// 检查医生
			if (data_outBaogaoHelp.obj.reportDate != eyeubm.cli_date) {
				utilTool().fdisabled($("#div_reportresult"));// 全部只读
				$("#a_updatebaogao").attr("disabled", "disabled");
				$("#a_updatebaogao").unbind("click", saveOrUpdateEyeubm);
			} 
//			else {
//				initPictureOperate();
//			}
		}
//		else {
//			initPictureOperate();
//		}
	}
	/** ********************************UBM信息********************************** */

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
// UBM检查报告保存
function saveOrUpdateEyeubm() {
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
	var ubm_no = $("#ubm_no").val();

	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var cli_date = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyeubm = {
		jcdId : jcdId,
		huanzhexinxi_id : huanzhexinxi_id,
		ubm_no : ubm_no,
		memo : memo,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		rep_doc : rep_doc,
		doctor : doctor,
		cli_date : cli_date,
		tag : Math.random()
	};
	var url_saveOrUpdateEyeubm = "/publish/Eyeubm/saveOrUpdateEyeubm.htm";// UBM检查报告保存
	var data_saveOrUpdateEyeubm = getJSONData(url_saveOrUpdateEyeubm,
			parameter_saveOrUpdateEyeubm, "post");
	if (data_saveOrUpdateEyeubm.state)
		$.oimsSucc("UBM检查报告保存成功", function() {

		});
	else
		$.oimsError("UBM检查报告保存失败", function() {

		});
}

// UBM检查报告打印预览
function previewEyeubm() {
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
	var ubm_no = $("#ubm_no").val();

	var rep_doc = $("#rep_doc option:selected").val();// 申请医生
	var doctor = $("#doctor option:selected").val();// 检查医生
	var rep_doc_name = $("#rep_doc option:selected").text();// 申请医生
	var doctor_name = $("#doctor option:selected").text();// 检查医生
	var cli_date = $("#cli_date ").html();// 报告日期
	var parameter_saveOrUpdateEyeubm = {
		jcdId : jcdId,
		huanzhexinxi_id : huanzhexinxi_id,
		ubm_no : ubm_no,
		memo : memo,
		baogaoState : oimsCategory.BAOGAO_STATE_CSDR,
		rep_doc : rep_doc,
		doctor : doctor,
		rep_doc_name : rep_doc_name,// 申请医生姓名
		doctor_name : doctor_name,// 检查医生姓名
		cli_date : cli_date,
		tag : Math.random()
	};
	parameter_saveOrUpdateEyeubm = JSON.stringify(
			parameter_saveOrUpdateEyeubm)
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
			+ "/js/manager/baogao/previewEyeubm.js'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter_saveOrUpdateEyeubm="
			+ parameter_saveOrUpdateEyeubm + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center'>";
	html_baogao += html_div_reportresult;
	html_baogao += "</body>";
	html_baogao += "</html>";
	printWindow.document.write(html_baogao);
	printWindow.document.close();
}

function createTable(){
	return "<select><option value='1'>11111</option><option value='2'>22222</option><select>"
	var tab="<table id='table_luru' width='100%' border='0' cellspacing='0' cellpadding='0' style='line-height: 30px;'>" +
			"<tr>" +
			"<td width='20%' align='center'>眼别：</td>" +
			"<td width='30%' align='center'>" +
			"<select style='height:25px;width:100%'>" +
			"<option></option>" +
			"<option value='双眼'>双眼</option>" +
			"<option value='左眼'>左眼</option>" +
			"<option value='右眼'>右眼</option>" +
			"</select>" +
			"</td>" +
			"<td width='20%' align='center'>角膜：</td>" +
			"<td  width='30%'>" +
			"<select style='height:25px;width:100%'>" +
			"<option></option>" +
			"<option value='角膜回声增厚'>角膜回声增厚</option>" +
			"<option value='角膜上皮层回声不光滑'>角膜上皮层回声不光滑</option>" +
			"<option value='角膜内皮层回声不光滑'>角膜内皮层回声不光滑</option>" +
			"</select>" +
			"</td>" +
			"</tr>" +
			"<tr>" +
			"<td width='20%' align='center'>晶体：</td>" +
			"<td width='30%' align='center'>" +
			"<select style='height:25px;width:100%'>" +
			"<option></option>" +
			"<option value='晶体位正'>晶体位正</option>" +
			"<option value='晶体回声向鼻侧偏移'>晶体回声向鼻侧偏移</option>" +
			"<option value='晶体回声增强'>晶体回声增强</option>" +
			"<option value='晶体回声靠前'>晶体回声靠前</option>" +
			"</select>" +
			"</td>" +
			"<td width='20%' align='center'>虹膜：</td>" +
			"<td  width='30%'>" +
			"<select style='height:25px;width:100%'>" +
			"<option></option>" +
			"<option value='虹膜回声后凹'>虹膜回声后凹</option>" +
			"<option value='虹膜回声前膨隆'>虹膜回声前膨隆</option>" +
			"<option value='虹膜回声僵直'>虹膜回声僵直</option>" +
			"</select>" +
			"</td>" +
			"</tr>" +
			"<tr>" +
			"<td width='20%' align='center'>房角：</td>" +
			"<td width='30%' align='center'>" +
			"<select style='height:25px;width:100%'>" +
			"<option></option>" +
			"<option value='房角开放'>房角开放</option>" +
			"<option value='房角狭窄'>房角狭窄</option>" +
			"<option value='房角关闭'>房角关闭</option>" +
			"<option value='房角后退'>房角后退</option>" +
			"</select>" +
			"</td>" +
			"<td width='20%' align='center'>睫状体：</td>" +
			"<td  width='30%'>" +
			"<select style='height:25px;width:100%'>" +
			"<option></option>" +
			"<option value='全周睫状体未见明显脱离回声'>全周睫状体未见明显脱离回声</option>" +
			"<option value='前部玻璃体腔内见弧形强回声光带'>全周睫状体脱离、未见明显离断口</option>" +
			"</select>" +
			"</td>" +
			"</tr>" +
			"<tr>" +
			"<td width='20%' align='center'>玻璃体：</td>" +
			"<td width='30%' align='center'>" +
			"<select style='height:25px;width:100%'>" +
			"<option></option>" +
			"<option value='前部玻璃体腔内见弧形强回声光带'>前部玻璃体腔内见弧形强回声光带</option>" +
			"<option value='前部玻璃体腔内见团点状中低回声'>前部玻璃体腔内见团点状中低回声</option>" +
			"<option value='前部玻璃体腔内见点絮状低回声'>前部玻璃体腔内见点絮状低回声</option>" +
			"</select>" +
			"</td>" +
			"<td width='20%' align='center'>前房：</td>" +
			"<td  width='30%'>" +
			"<select style='height:25px;width:100%'>" +
			"<option></option>" +
			"<option value='前房深度正常'>前房深度正常</option>" +
			"<option value='前房浅'>前房浅</option>" +
			"<option value='前房内见点状低回声'>前房内见点状低回声</option>" +
			"<option value='前房内见团状中低回声'>前房内见团状中低回声</option>" +
			"<option value='前房内见密集点状强回声'>前房内见密集点状强回声</option>" +
			"</select>" +
			"</td>" +
			"</tr>" +
			"</table>";
	return tab;
}

function fuzhi_data(){
	var memo ="";
	memo = $("#memo").val();
	var yanbie=$("#table_luru select:eq(0)").val();
	var jiaomo=$("#table_luru select:eq(1)").val();
	var jingti=$("#table_luru select:eq(2)").val();
	var hongmo=$("#table_luru select:eq(3)").val();
	var jiaofang=$("#table_luru select:eq(4)").val();
	var jiezhuangti=$("#table_luru select:eq(5)").val();
	var boliti=$("#table_luru select:eq(6)").val();
	var qianfeng=$("#table_luru select:eq(7)").val();
	if(yanbie!=null&&yanbie.length>0)
		memo+=yanbie+",";
	if(jiaomo!=null&&jiaomo.length>0)
		memo+=jiaomo+",";
	if(jingti!=null&&jingti.length>0)
		memo+=jingti+",";
	if(hongmo!=null&&hongmo.length>0)
		memo+=hongmo+",";
	if(jiaofang!=null&&jiaofang.length>0)
		memo+=jiaofang+",";
	if(jiezhuangti!=null&&jiezhuangti.length>0)
		memo+=jiezhuangti+",";
	if(boliti!=null&&boliti.length>0)
		memo+=boliti+",";
	if(qianfeng!=null&&qianfeng.length>0)
		memo+=qianfeng+",";
	
	$("#memo").val(memo);
	
	removeDiv_openWin();
}
function reset_data(){
	$("#table_luru select").val("");
}