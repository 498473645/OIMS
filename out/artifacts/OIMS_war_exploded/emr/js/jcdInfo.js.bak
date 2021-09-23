//var div;
//function getJCDInfo(jcdid) {
//	div = $("#imgview").text("");
//	// 查看系统中是否存在图片信息
//	showPhoto(jcdid);
//	// 查看系统中是否存在本地系统报告
//	showReportList(jcdid);
//	// 查看系统中是否存在PDF报告
//	showPDFList(jcdid);
//
//}
//
//function showPhoto(jcdid) {
//	var url_getFileListByJcd = "/publish/jcd/getFileListByJcd.htm";
//	var data_getFileListByJcd = getJSONData(url_getFileListByJcd, {
//		id : jcdid,
//		tag : Math.random()
//	}, "post");
//	if (data_getFileListByJcd.state) {
//		var filelist = data_getFileListByJcd.obj;
//		$("<div/>").attr("id", "photoarea").addClass("oimsslide-gallery")
//				.appendTo($(div));
//		var ul = $("<ul/>").appendTo("#photoarea");
//		$
//				.each(
//						filelist,
//						function(i, data_Photo) {
//							var path_relative_thumb = data_Photo.path;
//							var path_relative_big = path_relative_thumb
//									.replace("thumb/", "");// 大图的相对路径
//							var fileFormat = path_relative_thumb.substring(
//									path_relative_thumb.lastIndexOf(".") + 1)
//									.toLowerCase();// 获取文件格式
//							if (fileFormat != "flv") {
//								$(
//										"<li><a href='"
//												+ contextPath
//												+ path_relative_big
//												+ "' class='oimsslide' onclick='return hs.expand(this);' > <img src='"
//												+ contextPath + data_Photo.path
//												+ "'/></a></li>").appendTo(ul);
//							}
//
//						});
//	} else {
//		$.oimsSucc("查询该检查单文件失败");
//	}
//}
//
//function showReportList(jcdid) {
//	var url_getReportListByJcd = "/publish/jcd/getJcdByJcd.htm";
//	var data_getReportListByJcd = getJSONData(url_getReportListByJcd, {
//		id : jcdid,
//		tag : Math.random()
//	}, "post");
//	if (data_getReportListByJcd.state == 1
//			&& data_getReportListByJcd.obj.state == 1) {
//		$("<div/>").attr("id", "PDFarea").appendTo($(div));
//		var ul = $("<ul/>").appendTo("#PDFarea");
//		var li = $("<li><a>系统报告</a></li>").addClass("ji").appendTo(ul);
//		$(li).click(function() {
//			// 查看报告的方法
//			importJS("/js/manager/baogao/baogaoController.js");
//			initCssAndJs_baogaoAll();
//			seeReportButUpdate(jcd)
//		});
//	}
//}
//
//function showPDFList(jcdid) {
//	var url_getPDFListByJcd = "/publish/jcd/getJcdPDFList.htm";
//	var data_getPDFListByJcd = getJSONData(url_getPDFListByJcd, {
//		jcdid : jcdid,
//		tag : Math.random()
//	}, "post");
//	if (data_getPDFListByJcd.state == 1 && data_getPDFListByJcd.obj.length > 0) {
//		$("<div/>").attr("id", "Reportarea").addClass("oimsslide-gallery")
//				.appendTo($(div));
//		var ul = $("<ul/>").appendTo("#photoarea");
//		var PDFList = data_getPDFListByJcd.obj;
//		$.each(PDFList, function(i, data_PDF) {
//			$(
//					"<li><a href='" + contextPath + data_PDF
//							+ "' target='_blank' >PDF报告" + i + "</a></li>")
//					.appendTo(ul);
//		});
//	}
//}
//
//
//
//
//
//
//
//
//
//

//显示检查单报告(整理)检查单id 和 tabinfo
function showReportList(jcdid, tag, i) {
	pdfFag = false;
	reportFag = false;
	// 判断是不是存在PDF报告
	var url_getPDFListByJcd = "/publish/jcd/getJcdPDFList.htm";
	var data_getPDFListByJcd = getJSONData(url_getPDFListByJcd, {
		jcdid : jcdid,
		tag : Math.random()
	}, "post");
	if (data_getPDFListByJcd.state == 1 && data_getPDFListByJcd.obj.length > 0) {
		pdfFag = true;
	}
	// 判断是不是存在系统中出的报告
	var url_getReportListByJcd = "/publish/jcd/getJcdByJcd.htm";
	var data_getReportListByJcd = getJSONData(url_getReportListByJcd, {
		id : jcdid,
		tag : Math.random()
	}, "post");
	if (data_getReportListByJcd.state == 1
			&& data_getReportListByJcd.obj.state == 1) {
		reportFag = true;
	}
	if (pdfFag || reportFag) { // 表示存在报告
		clickReportButton(tag, i);
		createPDFList(jcdid, i, data_getPDFListByJcd);
		createReportList(jcdid, i, data_getReportListByJcd);
	}
}

// 点击报告按钮
var isShow = false;
function clickReportButton(tag, i) {
	// var a = $("<a />").appendTo(tag);
	var span = $("<span/>").addClass("report").css({
		width : "15",
		height : "20",
		display : "inline-block"
	}).appendTo(tag);
	span.click(function() {
		if (isShow == false) {
			$(".pdfDiv").slideUp();
			$("#pdfDiv" + i).slideDown();
			isShow = true;
		} else {
			$("#pdfDiv" + i).slideUp();
			isShow = false;
		}
	});
	var position = span.position();
	var left = position.left;
	if (left + 100 > $(".timetab").width())
		left = $(".timetab").width() - 105;
	$("<div />").removeClass().attr("id", "pdfDiv" + i).css({
		left : left,
		top : position.top + span.outerHeight() + 10,
		"float" : "left",
		"z-index" : "9999",
		"position" : "absolute",
		"display" : "none"
	}).addClass("pdfDiv").appendTo(tag);

	var ul = $("<ul/>").appendTo("#pdfDiv" + i);
}

/**
 * 创建PDF报告列表
 */
function createPDFList(jcdid, i, data_getPDFListByJcd) {
	if (data_getPDFListByJcd.state) {
		var filelist = data_getPDFListByJcd.obj;
		var ul = $("#pdfDiv" + i + " ul:eq(0)");
		$.each(filelist, function(i, data_PDF) {
			if ((i % 2 != 0)) {
				$(
						"<li><a href='" + contextPath + data_PDF
								+ "' target='_blank' >PDF报告" + i + "</a></li>")
						.addClass("ji").appendTo(ul);
			} else {
				$(
						"<li><a href='" + contextPath + data_PDF
								+ "' target='_blank' >PDF报告" + i + "</a></li>")
						.addClass("ou").appendTo(ul);
			}
		});
	}
}
/**
 * 创建本地报告列表
 */
function createReportList(jcdid, i, data_getReportListByJcd) {
	var jcd = data_getReportListByJcd.obj;
	if (jcd.state == 1) {
		var ul = $("#pdfDiv" + i + " ul:eq(0)");
		var num = $("#pdfDiv" + i + " ul li").length + 1;
		var li;
		if (num % 2 == 0) {
			li = $("<li><a>系统报告</a></li>").addClass("ji").appendTo(ul);
		} else {
			li = $("<li><a>系统报告</a></li>").addClass("ou").appendTo(ul);
		}
		$(li).click(function() {
			
			importJS("/js/manager/baogao/baogaoController.js");
			initCssAndJs_baogaoAll();
			
			seeReportButUpdate(jcd);
			//report_wenzhi(jcd);
		});
	}
}

// 双屏待测
function doubleSreen1(jcdid) {
	if ($("#studyViewTag h1 div").length) {
		$("#studyViewTag h1 div").remove();
	}
	// 双屏
	var doubleScreen = $('<div/>').addClass('btn').addClass('emr_doublebtn')
			.appendTo($("#studyViewTag h1"));
	var a = $(
			'<a class="four noline"><span class="screen emr_doublebtnspan"></span>双屏</a>')
			.appendTo(doubleScreen);
	a.click(function() {
		importJS("/js/flashShow.js");
		studyView(currentPatient.id);
	});
	// 图片
	var photos = getJSONData(getInspectPhotoUrl, {
		inspectId : jcdid,
		tag : Math.random()
	}, 'POST');
	var gallery = $("<div class='oimsslide-gallery'/>").appendTo(
			$(".studyViewDiv"));
	var oldWidth = (gallery.width()-30) / 2;
	var oldHeight = (gallery.height()-30) / 2;
	for (var i = 0; i < photos.length; i++) {
		var photo = photos[i];
		var href = photo.path.replace(/\\/g, '/');
		var suffix = href.substring(href.lastIndexOf('.') + 1).toUpperCase();
		var url_getImageInfoByPath = "/publish/image/getImageInfoByPath.htm";
		var data_getImageInfoByPath = getJSONData(
				url_getImageInfoByPath, {
					"path_Image" : href,
					"clientWidth" : oldWidth,
					"clientHeight" : oldHeight,
					tag : Math.random()
				}, "post");
		var a = $('<a onclick="return hs.expand(this)" class="oimsslide"/>').attr('style', 'float:left;padding-right:5px;').appendTo(gallery);
		if (suffix == "JPG" || suffix == "JPEG" || suffix == "GIF"
				|| suffix == "PNG") {// 图片
			a.attr('href', contextPath + '/' + href.replace('thumb/', ''));
			var img = $(
					"<img src='../" + href
							+ "'/ style='width:"+(data_getImageInfoByPath.obj.width-4)+"px;height:"+(data_getImageInfoByPath.obj.height-4)+"px;'>")
					.appendTo(a);
//			if(data_getImageInfoByPath.width=="0"||data_getImageInfoByPath.height =="0"){
//				img.attr("width",).attr("height",);
//			}
		} else {// 视频
			importCSS("/flowplayer/style.css");
			importJS("/js/swfobject.js");
			importJS("/flowplayer/flowplayer-3.2.11.min.js");
			if (flag) {
				a.width(a.width() - window.scrollbarWidth / 2);
			}
			var div = $('<div style="border:2px solid silver;"/>').width(
					a.width() - 4).height(a.height() - 4).appendTo(a);
			var flv = $('<a/>').attr({
				'id' : 'player' + i,
				'href' : contextPath + "\\" + photo.path
			}).appendTo(div);
			flowplayer("player" + i, contextPath
					+ "/flowplayer/flowplayer-3.2.15.swf");
		}
	}
}
