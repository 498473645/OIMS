var importState = false;
var btns_jiancha;
var biaoshi="";
var biaoshiArray = [{
	key:oimsCategory.JCD_STATE_YJC,
	value:"已检查"
},{
	key:oimsCategory.JCD_STATE_DBC,
	value:"待补传"
},{
	key:oimsCategory.JCD_STATE_JCZ,
	value:"检查中"
},{
	key:oimsCategory.JCD_STATE_DSC,
	value:"待上传"
},{
	key:oimsCategory.JCD_STATE_YWC,
	value:"已完成"
}
];
// 检查单执行中，判断是否终止检查单(整理)
function isResetJiancha() {
	if (doing) {
		// if (confirm("检查中，是否中断检查!")) {
		// doing = false;
		// var data = getJSONData(resetJcdOpUrl, {
		// id : JcdID,
		// tag : Math.random()
		// });
		// if (data.state) {
		// clearInterval(jishiqi);
		// timer = {
		// h : 0,
		// m : 0,
		// s : 0
		// };
		// return true;
		// }
		// } else {
		// return false;
		// }
	}
	return true;
}

/** ***************************************已检患者执行的方法开始***************************************** */
function showFinishJcdList(btns) {
	btns_jiancha = btns;
	if (!isResetJiancha())// 检查单检查中判断是否终止检查
		return;
	pageTitle = "已完成检查单";
	init();
	var ybaogodiv = $("<div/>").attr("id", "ybaogodiv").appendTo("#right");
	$("<input/>").attr("id","isprintsuc").attr("type","hidden").attr("value","0").appendTo(ybaogodiv);
	$(".title").appendTo(ybaogodiv);
	shebeiManager();// 检查设备配置验证(根据工号和IP判断)
	var finishJcdFunTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='23%' class='leftalign' ><input name='search_binglihao_xingming' type='text' class='blurview' id='search_binglihao_xingming' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value="
			+ "请输入病历号或患者姓名"
			+ " size='28' /></td>"
			+ "<td width='10%'>" 
			+ "<select name='search_jcxmIds' id='search_biaoshi' onblur=\"this.className='blur'\">"
			+ "<option value=''></option></select></td>" 
			+ "<td width='9%'><a href='javascript:seniorSearchSubmit_finishJcd();' class='search'>"
			+ "查询"
			+ "</a></td>"
			+ "<td width='9%'><a href='javascript:finishJcdAdvSearch();' class='advsearch'>"
			+ "高级查询"
			+ "</a></td>"
			+ "<td width='59%' >"
			+ "<div class='btn'>"
			+ "<a onclick='return false;' href='javascript:showJcdPhoto();'><span class='viewa'></span>"
			+ "查看"
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:openDialog_outBaogao_jiancha();'><span class='reporta'></span>"
			+ "出报告"
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:importJcdPhoto_FinishJcd();'><span class='importa'></span>"
			+ "导入"
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:exportJcdPhoto();'><span class='exporta'></span>"
			+ "导出"
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:choiceJcdPhoto();'><span class='oufroma'></span>"
			+ "筛选"
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:resetJcdPhoto();'><span class='reseta'></span>"
			+ "重置" + "</a>" + "</div>" + "</td>" + "</tr>" + "</table>";

	$("<div/>").attr("id", "advquery").addClass("advquery").appendTo(ybaogodiv);
	$(finishJcdFunTemplate).appendTo("#advquery");
//	if (task.jcsbid != null && task.jcsbid != "") {
//		btnProwerConfig(btns);// 按钮加上权限
//	}
	btnProwerConfig(btns);// 按钮加上权限
	biaoshi="";
	$.each(biaoshiArray,function(index,data){
		if(index==0){
			biaoshi+=data.key;
		}else{
			biaoshi=biaoshi+","+data.key;
		}
		$("<option value='"+data.key+"'>"+data.value+"</option>").appendTo("#search_biaoshi");
	});
	loadFinishJcdList();// 已检检查单列表
	$("#search_binglihao_xingming").val("").focus();
	$("#search_binglihao_xingming").click(function() {
		clearInitQuery(this);
	});// 点击输入框清空字体
	$("#search_binglihao_xingming").blur(function() {
		if (this.value == "") {
			$("#search_binglihao_xingming").val("请输入病历号或姓名");
			$("#search_binglihao_xingming").addClass("blurview");
		}
	});
	$("#search_binglihao_xingming").bind("keydown", function(e) {
		if (e.which == 13) {
			seniorSearchSubmit_finishJcd();
		}
	});
	$("#search_biaoshi").change(function(){
		seniorSearchSubmit_finishJcd();
	});
}
/** ***************************************已检患者执行的方法结束***************************************** */

/** ***************************************检查单结果查看开始********************************** */
// 查看检查结果
function showJcdPhoto() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要操作的检查单");
		return;
	}
	var showJcdTemplate = "<div class='opencontent tableinfo'>"
			+ "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='100%'>"
			+ "<tr>"
			+ "<td width='6%' align='right' nowrap>"
			+ "病例号"
			+ "：</td>"
			+ "<td width='10%'>"
			+ "<input name='binglihao' type='text' class='blurview' id='binglihao'  value='' />"
			+ "</td>"
			+ "<td width='4%' align='right' nowrap>"
			+ "姓名"
			+ "：</td>"
			+ "<td width='8%'><input name='xingming' type='text' class='blurview' id='xingming'  value='' /></td>"
			+ "<td width='5%' align='right' nowrap>"
			+ "性别"
			+ "：</td>"
			+ "<td width='4%'><input name='xingbie' type='text' class='blurview' id='xingbie'  value='' /></td>"
			+ "<td width='5%' align='right' nowrap>"
			+ "年龄"
			+ "：</td>"
			+ "<td width='4%'><input name='nianling' type='text' class='blurview' id='nianling'  value='' /></td>"
			+ "<td width='8%' align='right' nowrap>"
			+ "检查项目"
			+ "：</td>"
			+ "<td width='23%'><input name='jcxmmc' type='text' class='blurview' id='jcxmmc'  value='' /></td>"
			+ "<td width='8%' align='right' nowrap>"
			+ "眼别"
			+ "：</td>"
			+ "<td width='6%'><input name='yanbie' type='text' class='blurview' id='yanbie'  value='' /></td>"
			+ "<td width='2%'><div class='more'></div></td> " + "</tr>"
			+ "</table>" + "</div>";

	var showJcdBtnTemplate = "<div class='openbtn'>"
			+ "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr></tr>"
			+ "<tr>"
			+ "<td width='12%'><div class='buttonsytle1'><a href='javascript:showPhoto("
			+ dataObjects[0].id
			+ ");'><span class='reset'></span>查看图片</a></div></td>"
			+ "<td width='12%'><div class='buttonsytle1'><a href='javascript:showVideo("
			+ dataObjects[0].id
			+ ");'><span class='reset'></span>查看视频</a></div></td>"
			+ "<td width='12%'><div class='buttonsytle1'><a href='javascript:showPDF("
			+ dataObjects[0].id
			+ ");'><span class='reset'></span>查看报告</a></div></td>"
			+ "<td width='76%'></td>" + " </tr>" + "</table>" + "</div>";
	var div = $("<div />").attr("id", "showjcdDiv");
	$(div).oimsDialog({
		winType : 4,
		icon : "view",
		title : language.See,
		drag : false,
		locked : true,
		width : "910",
		height : "600"
	});
	$(showJcdTemplate).appendTo(div);
	$(showJcdBtnTemplate).appendTo(div);

	$("#binglihao").val(dataObjects[0].binglihao);// 病例号
	$("#xingming").val(dataObjects[0].hzxm);// 患者姓名
	$("#xingbie").val(dataObjects[0].hzxb);// 患者性别
	$("#nianling").val(dataObjects[0].nianling);// 患者年龄
	$("#jcxmmc").val(dataObjects[0].jcxmmc);// 检查项目
	var yanbiename = "";
	if (dataObjects[0].yanbie == oimsCategory.LEFT_EYE)
		yanbiename = "左眼";
	else if (dataObjects[0].yanbie == oimsCategory.RIGHT_EYE)
		yanbiename = "右眼";
	else if (dataObjects[0].yanbie == oimsCategory.DOUBLE_EYE)
		yanbiename = "双眼";
	else
		yanbiename = "";
	$("#yanbie").val(yanbiename);// 眼别
	$("<div/>").attr("id", "imgview").addClass("imgview").appendTo(
			"#showjcdDiv");

	showPhoto(dataObjects[0].id);

}
/** ***************************************检查单结果查看结束********************************** */

/** ***************************************图片信息展示开始********************************** */
function showPhoto(jcdid) {
	$("#imgview").text("");
	var url_getFileListByJcd = "/publish/jcd/getFileListByJcd.htm";
	var data_getFileListByJcd = getJSONData(url_getFileListByJcd, {
		id : jcdid,
		tag : Math.random()
	}, "post");
	if (data_getFileListByJcd.state) {
		var filelist = data_getFileListByJcd.obj;
		$("<div/>").attr("id", "photoarea").addClass("oimsslide-gallery")
				.appendTo("#imgview");
		var ul = $("<ul/>").appendTo("#photoarea");
		$
				.each(
						filelist,
						function(i, data_Photo) {
							var path_relative_thumb = data_Photo.path;
							var path_relative_big = path_relative_thumb
									.replace("thumb/", "");// 大图的相对路径
							var fileFormat = path_relative_thumb.substring(
									path_relative_thumb.lastIndexOf(".") + 1)
									.toLowerCase();// 获取文件格式
							if (fileFormat != "flv") {
								$(
										"<li><a href='"
												+ contextPath
												+ path_relative_big
												+ "' class='oimsslide' onclick='return hs.expand(this);' > <img src='"
												+ contextPath + data_Photo.path
												+ "'/></a></li>").appendTo(ul);
							}

						});
	} else {
		$.oimsSucc("查询该检查单文件失败");
	}
}
/** ***************************************图片信息展示开始********************************** */
/** ***************************************PDF报告信息展示开始********************************** */
var fag = 0;
function showPDF(jcdid) {
	$("#imgview").text("");
	var url_getPDFListByJcd = "/publish/jcd/getJcdPDFList.htm";
	var data_getPDFListByJcd = getJSONData(url_getPDFListByJcd, {
		jcdid : jcdid,
		tag : Math.random()
	}, "post");
//	if (fag == 0) {
//		var position = $(".openbtn tr td:eq(2)").position();
//		$("<div />").removeClass().attr("id", "pdfDiv").css({
//			left : position.left + 10,
//			top : position.top + 40,
//			"float" : "left",
//			"z-index" : "9999",
//			"position" : "absolute",
//			"display" : "none"
//		}).appendTo(".openbtn");
//		fag = 1;
//	} else {
//		$("#pdfDiv").slideUp();
//		$("#pdfDiv").remove();
//		fag = 0;
//	}
	if (data_getPDFListByJcd.state) {
		var filelist = data_getPDFListByJcd.obj;
		var ul = $("<ul/>").appendTo("#pdfDiv");

		$("<div/>").attr("id", "photoarea").addClass("oimsslide-gallery")
				.appendTo("#imgview");
		var pdfUl = $("<ul/>").appendTo("#photoarea");

		$
				.each(
						filelist,
						function(i, data_PDF) {
							$(
									"<li><a href='"
											+ contextPath
											+ data_PDF
											+ "' class='oimsslide' target='_black' > <img src='"
											+ contextPath + "/images/pdf.png"
											+ "'/></a></li>").appendTo(pdfUl);
						});

//		$.each(filelist, function(i, data_PDF) {
//			if ((i % 2 == 0)) {
//				$(
//						"<li><a href='" + contextPath + data_PDF
//								+ "' target='_black' >PDF报告" + (i + 1)
//								+ " </a></li>").addClass("ji").appendTo(ul);
//			} else {
//				$(
//						"<li><a href='" + contextPath + data_PDF
//								+ "' target='_black' >PDF报告" + (i + 1)
//								+ " </a></li>").addClass("ou").appendTo(ul);
//			}
//
//		});
//		$("#pdfDiv").slideDown();
	} else {
		$.oimsSucc("查询该检查单文件失败");
	}

}
/** ***************************************PDF报告信息展示开始********************************** */

/** ***************************************视频信息展示开始********************************** */
// 获取检查单影像视频
function showVideo(jcdid) {
	$("#imgview").text("");
	var url_getFileListByJcd = "/publish/jcd/getFileListByJcd.htm";
	var data_getFileListByJcd = getJSONData(url_getFileListByJcd, {
		id : jcdid,
		tag : Math.random()
	}, "post");
	if (data_getFileListByJcd.state) {
		var filelist = data_getFileListByJcd.obj;
		$("<div/>").attr("id", "vedio").width(500).height(400).appendTo(
				"#imgview");
		$.each(filelist, function(i, data_Photo) {
			var path_relative_thumb = data_Photo.path;
			var fileFormat = path_relative_thumb.substring(
					path_relative_thumb.lastIndexOf(".") + 1).toLowerCase();// 获取文件格式
			if (fileFormat == "flv") {
				$("<a />").attr("id", "player" + i).attr("href",
						contextPath + path_relative_thumb).appendTo("#vedio");
				flowplayer("player" + i, contextPath
						+ "/flowplayer/flowplayer-3.2.15.swf");
			}
		});
	} else {
		$.oimsSucc("查询该检查单文件失败");
	}
}

/** ***************************************视频信息展示结束********************************** */

/** *****************************检查单手动图片导入操作(已检检查单列表)开始******************************* */
function importJcdPhoto_FinishJcd() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要操作的检查单");
		return;
	}
	// 建立第一个table
	var uploadTemplate = "<div class='buttonsytle1 exportbtnbgbg'>"
			+
			// 上传，取消上传，浏览按钮
			"<a href='javascript:uploadifyUpload();'><span class='export'></span>"
			+ "上传文件"
			+ "</a>"
			+ " <a href='javascript:uploadifyClearQueue();'><span class='reset'></span>"
			+ "取消上传" + "</a>" + "</div>";
	// 建立第二个table
	var importinfo = "<div id='fileimport' class='bowsrediv' >"
			+ "<input type='file' name='fileinput' id='fileinput'/>"
			+ "<form  method='post' enctype='multipart/form-data' ></form>"
			+ "</div>";
	var div = $("<div/>").attr("id", "importDiv").appendTo("body");
	$(uploadTemplate).appendTo("#importDiv");
	$(importinfo).appendTo("#importDiv");
	// 弹出对话框
	$(div).oimsDialog({
		winType : 4,
		icon : "openexport",
		title : "图片导入",
		drag : false,
		locked : true,
		width : "450",
		height : "230",
		maxButton : false,
		minButton : false
	});
	var id = dataObjects[0].id;
	var huanzheId = dataObjects[0].huanzheid;
	var jiuzhenId = dataObjects[0].jiuzhenid;
	$("#fileinput")
			.uploadify(
					{
						'uploader' : contextPath + '/uploadify/uploadify.swf',
						'script' : contextPath
								+ '/publish/jcd/importJcdPhoto.htm?',
						'method' : 'Post',
						'cancelImg' : contextPath + '/uploadify/cancel.png',
						'buttonImg' : contextPath
								+ '/style/green/images/bowsre.png',
						'auto' : false,
						'folder' : '/',
						'multi' : true,
						'scriptData' : {
							'id' : id,
							'jiuzhenId' : jiuzhenId,
							'jcsbId' : task.jcsbid,
							'huanzheId' : huanzheId
						},
						'fileDesc' : '.jpg,.bmp,.png,.tiff,.tif,.gif,.avi,.wmv,.mpg,.pdf',
						'fileExt' : '*.jpg;*.bmp;*.png;*.tiff;*.tif;*.gif;*.avi;*.wmv;*.mpg;*.mpeg;*.pdf',
						'sizeLimit' : 10 * 1024 * 1024 * 1024,
						onComplete : function(event, queueID, fileObj,
								response, data) {
							var json_response = eval("(" + response + ")");
							if (!json_response.state) {
								$.oimsError("文件上传失败，请稍后重新上传");
							}
						},
						onAllComplete : function(event, queueID, fileObj) {
							$.oimsSucc("影像文件上传成功", function() {
								seniorSearchSubmit_finishJcd();
								removeDiv_openWin();
							});
						},
						onError : function(event, queueID, fileObj) {

						},
						onCancel : function(event, queueID, fileObj) {

						}
					});
}

function uploadifyUpload() {
	$('#fileinput').uploadifyUpload();
}
function uploadifyClearQueue() {
	$('#fileinput').uploadifyClearQueue();
}
/** *****************************检查单手动图片导入操作(已检检查单列表)开始******************************* */

/** *****************************检查单手动图片导出操作(已检检查单列表)开始******************************* */
function exportJcdPhoto() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要操作的检查单");
		return;
	}
	var showJcdTemplate = "<div class='opencontent tableinfo'>"
			+ "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='100%'>"
			+ "<tr>"
			+ "<td width='6%' align='right' nowrap>"
			+ "病例号"
			+ "：</td>"
			+ "<td width='10%'>"
			+ "<input name='binglihao' type='text' class='blurview' id='binglihao'  value='' />"
			+ "</td>"
			+ "<td width='4%' align='right' nowrap>"
			+ "姓名"
			+ "：</td>"
			+ "<td width='8%'><input name='xingming' type='text' class='blurview' id='xingming'  value='' /></td>"
			+ "<td width='5%' align='right' nowrap>"
			+ "性别"
			+ "：</td>"
			+ "<td width='4%'><input name='xingbiename' type='text' class='blurview' id='xingbiename'  value='' /></td>"
			+ "<td width='5%' align='right' nowrap>"
			+ "年龄"
			+ "：</td>"
			+ "<td width='4%'><input name='nianling' type='text' class='blurview' id='nianling'  value='' /></td>"
			+ "<td width='8%' align='right' nowrap>"
			+ "检查项目"
			+ "：</td>"
			+ "<td width='23%'><input name='jcxmmc' type='text' class='blurview' id='jcxmmc'  value='' /></td>"
			+ "<td width='8%' align='right' nowrap>"
			+ "眼别"
			+ "：</td>"
			+ "<td width='6%'><input name='yanbie' type='text' class='blurview' id='yanbie'  value='' /></td>"
			+ "<td width='2%'><div class='more'></div></td> " + "</tr>"
			+ "</table>" + "</div>";
	var photoExportBtnTemplate = "<div class='openbtn'>"
			+ "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr></tr>"
			+ "<tr>"
			+ "<td width='7%'><input type='checkbox' name='check' id='checkAll'  onclick='selectAllCheckPhoto();' style='vertical-align: middle;'/>"
			+ "全选"
			+ "</td>"
			+ "<td width='12%'><div class='buttonsytle1'><a href='javascript:doPhotoExport();'><span class='outfrom'></span>"
			+ "影像导出" + "</a></div></td>" + "<td width='81%'></td>" + " </tr>"
			+ "</table>" + "</div>";
	var div = $("<div />").attr("id", "showjcdDiv");
	$(div).oimsDialog({
		winType : 4,
		icon : "oufrom",
		title : "影像导出",
		drag : false,
		locked : true,
		width : "970",
		height : "600"
	});
	$("<form/>").attr("id", "form_PhotoExport").attr("action",
			contextPath + "/publish/jcd/PhotoExport.htm")
			.attr("method", "post").appendTo(div);
	$("<input type='hidden' id='jcdid' name='jcdid'/>").appendTo(
			"#form_PhotoExport");
	$(showJcdTemplate).appendTo("#form_PhotoExport");
	$(photoExportBtnTemplate).appendTo("#form_PhotoExport");

	$("<div/>").attr("id", "imgview").addClass("imgview").appendTo(
			"#form_PhotoExport");
	$("#jcdid").val(dataObjects[0].id);// 检查单ID
	$("#binglihao").val(dataObjects[0].binglihao);// 病例号
	$("#xingming").val(dataObjects[0].hzxm);// 患者姓名
	$("#xingbiename").val(dataObjects[0].hzxb);// 患者性别
	$("#nianling").val(dataObjects[0].nianling);// 患者年龄
	$("#jcxmmc").val(dataObjects[0].jcxmmc);// 检查项目
	var yanbiename = "";
	if (dataObjects[0].yanbie == oimsCategory.LEFT_EYE)
		yanbiename = "左眼";
	else if (dataObjects[0].yanbie == oimsCategory.RIGHT_EYE)
		yanbiename = "右眼";
	else if (dataObjects[0].yanbie == oimsCategory.DOUBLE_EYE)
		yanbiename = "双眼";
	else
		yanbiename = "";
	$("#yanbie").val(yanbiename);// 眼别

	$("#imgview").text("");
	var url_getFileListByJcd = "/publish/jcd/getFileListByJcd.htm";
	var data_getFileListByJcd = getJSONData(url_getFileListByJcd, {
		id : $("#jcdid").val(),
		tag : Math.random()
	}, "post");
	if (data_getFileListByJcd.state) {
		var filelist = data_getFileListByJcd.obj;
		$("<div/>").attr("id", "photoarea").addClass("oimsslide-gallery")
				.appendTo("#imgview");
		var ul = $("<ul/>").appendTo("#photoarea");
		$
				.each(
						filelist,
						function(i, data_Photo) {
							var path_relative_thumb = data_Photo.path;
							var path_relative_big = path_relative_thumb
									.replace("thumb/", "");// 大图的相对路径
							var fileFormat = path_relative_thumb.substring(
									path_relative_thumb.lastIndexOf(".") + 1)
									.toLowerCase();// 获取文件格式
							if (fileFormat != "flv") {
								$(
										"<li><a href='"
												+ contextPath
												+ path_relative_big
												+ "' class='oimsslide' onclick='return hs.expand(this);' > <img src='"
												+ contextPath
												+ data_Photo.path
												+ "'/></a><p><input type='checkbox' name='checkPhoto' id='checkPhoto' value='"
												+ path_relative_thumb
												+ "'/></p></li>").appendTo(ul);
							} else {
								var li = $("<li/>").appendTo(ul);
								$("<a />").attr("id", "player" + i).attr(
										"href",
										contextPath + path_relative_thumb).attr("style","display:block;")
										.appendTo(li);
								flowplayer("player" + i, contextPath
										+ "/flowplayer/flowplayer-3.2.15.swf");
								$(
										"<p><input type='checkbox' name='checkPhoto' id='checkPhoto' value='"
												+ path_relative_thumb
												+ "'/></p>").appendTo(li);
							}

						});
	} else {
		$.oimsSucc("查询该检查单文件失败");
	}
	var pdfList_url = "/publish/jcd/getJcdPDFList.htm";
	var data_pdfList = getJSONData(pdfList_url, {
		jcdid : $("#jcdid").val(),
		tag : Math.random()
	}, "post");
	if (data_pdfList.state) {
		var pdfList = data_pdfList.obj;
		$
				.each(
						pdfList,
						function(i, data) {
							$(
									"<li><a href='"
											+ contextPath
											+ data
											+ "' class='oimsslide' target='_black' title='PDF报告"
											+ (i + 1)
											+ "' > <img src='"
											+ contextPath
											+ "/images/pdf.png"
											+ "'/></a><p><input type='checkbox' name='checkPhoto' id='checkPhoto' value='"
											+ data + "'/></p></li>").appendTo(
									ul);
						});
	} else {
		$.oimsError("查询该检查单文件失败");
	}
}

// 检查单影像数据导出操作
function doPhotoExport() {
	var data_checkPhoto = $("input[name='checkPhoto']:checked");
	if (data_checkPhoto.length == 0) {
		$.oimsAlert("请选择需要导出的影像数据");
		return;
	}
	$("#form_PhotoExport").ajaxForm({
		dataType : 'json',
		success : function(data) {
			if (data.state) {
				seniorSearchSubmit_finishJcd();
				removeDiv_openWin();
				location.href = contextPath + data.obj;
			}
		}
	});
	$("#form_PhotoExport").submit();
}

/** *****************************检查单手动图片导出操作(已检检查单列表)结束******************************* */

/** *****************************图片筛查操作开始******************************* */
function choiceJcdPhoto(jcdid) {
	if (jcdid == undefined) {
		var dataObjects = getCheckBoxValue();
		if (dataObjects.length == 0) {
			$.oimsAlert("请选择需要操作的检查单");
			return;
		}
		var showJcdTemplate = "<div class='opencontent tableinfo'>"
				+ "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='100%'>"
				+ "<tr>"
				+ "<td width='6%' align='right' nowrap>"
				+ "病例号"
				+ "：</td>"
				+ "<td width='10%'>"
				+ "<input name='binglihao' type='text' class='blurview' id='binglihao'  value='' />"
				+ "</td>"
				+ "<td width='4%' align='right' nowrap>"
				+ "姓名"
				+ "：</td>"
				+ "<td width='8%'><input name='xingming' type='text' class='blurview' id='xingming'  value='' /></td>"
				+ "<td width='5%' align='right' nowrap>"
				+ "性别"
				+ "：</td>"
				+ "<td width='4%'><input name='xingbiename' type='text' class='blurview' id='xingbiename'  value='' /></td>"
				+ "<td width='5%' align='right' nowrap>"
				+ "年龄"
				+ "：</td>"
				+ "<td width='4%'><input name='nianling' type='text' class='blurview' id='nianling'  value='' /></td>"
				+ "<td width='8%' align='right' nowrap>"
				+ "检查项目"
				+ "：</td>"
				+ "<td width='23%'><input name='jcxmmc' type='text' class='blurview' id='jcxmmc'  value='' /></td>"
				+ "<td width='8%' align='right' nowrap>"
				+ "眼别"
				+ "：</td>"
				+ "<td width='6%'><input name='yanbie' type='text' class='blurview' id='yanbie'  value='' /></td>"
				+ "<td width='2%'><div class='more'></div></td> " + "</tr>"
				+ "</table>" + "</div>";

		var photoChoiceBtnTemplate = "<div class='openbtn'>"
				+ "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
				+ "<tr></tr>"
				+ "<tr>"
				+ "<td width='7%'><input type='checkbox' name='check' id='checkAll'  onclick='selectAllCheckPhoto();' style='vertical-align: middle;'/>"
				+ "全选"
				+ "</td>"
				+ "<td width='12%'><div class='buttonsytle1'><a href='javascript:doPhotoChoice();'><span class='outfrom'></span>"
				+ "影像删除" + "</a></div></td>" + "<td width='81%'></td>"
				+ " </tr>" + "</table>" + "</div>";

		var div = $("<div />").attr("id", "showjcdDiv");
		$(div).oimsDialog({
			winType : 4,
			icon : "oufrom",
			title : "影像筛选",
			drag : false,
			locked : true,
			width : "970",
			height : "600"
		});
		$("<form/>").attr("id", "form_PhotoChoice").attr("action",
				contextPath + "/publish/jcd/PhotoChoice.htm").attr("method",
				"post").appendTo(div);
		$("<input type='hidden' id='jcdid' name='jcdid'/>").appendTo(
				"#form_PhotoChoice");
		$(showJcdTemplate).appendTo("#form_PhotoChoice");
		$(photoChoiceBtnTemplate).appendTo("#form_PhotoChoice");

		$("<div/>").attr("id", "imgview").addClass("imgview").appendTo(
				"#form_PhotoChoice");
		$("#jcdid").val(dataObjects[0].id);// 检查单ID
		$("#binglihao").val(dataObjects[0].binglihao);// 病例号
		$("#xingming").val(dataObjects[0].hzxm);// 患者姓名
		$("#xingbiename").val(dataObjects[0].hzxb);// 患者性别
		$("#nianling").val(dataObjects[0].nianling);// 患者年龄
		$("#jcxmmc").val(dataObjects[0].jcxmmc);// 检查项目
		var yanbiename = "";
		if (dataObjects[0].yanbie == oimsCategory.LEFT_EYE)
			yanbiename = "左眼";
		else if (dataObjects[0].yanbie == oimsCategory.RIGHT_EYE)
			yanbiename = "右眼";
		else if (dataObjects[0].yanbie == oimsCategory.DOUBLE_EYE)
			yanbiename = "双眼";
		else
			yanbiename = "";
		$("#yanbie").val(yanbiename);// 眼别

	} else {
		$("#jcdid").val(jcdid);
	}

	$("#imgview").text("");
	$("<div/>").attr("id", "photoarea").addClass("oimsslide-gallery").appendTo(
			"#imgview");
	var ul = $("<ul/>").appendTo("#photoarea");
	var url_getFileListByJcd = "/publish/jcd/getFileListByJcd.htm";
	var data_getFileListByJcd = getJSONData(url_getFileListByJcd, {
		id : $("#jcdid").val(),
		tag : Math.random()
	}, "post");
	if (data_getFileListByJcd.state) {
		var filelist = data_getFileListByJcd.obj;
		$
				.each(
						filelist,
						function(i, data_Photo) {
							var path_relative_thumb = data_Photo.path;
							var path_relative_big = path_relative_thumb
									.replace("thumb/", "");// 大图的相对路径
							var fileFormat = path_relative_thumb.substring(
									path_relative_thumb.lastIndexOf(".") + 1)
									.toLowerCase();// 获取文件格式
							if (fileFormat != "flv") {
								$(
										"<li><a href='"
												+ contextPath
												+ path_relative_big
												+ "' class='oimsslide' onclick='return hs.expand(this);' > <img src='"
												+ contextPath
												+ data_Photo.path
												+ "'/></a><p><input type='checkbox' name='checkPhoto' id='checkPhoto' value='"
												+ path_relative_thumb
												+ "'/></p></li>").appendTo(ul);
							} else {
								var li = $("<li/>").appendTo(ul);
								$("<a />").attr("id", "player" + i).attr(
										"href",
										contextPath + path_relative_thumb).attr("style","height:80%;display:block;")
										.appendTo(li);
								flowplayer("player" + i, contextPath
										+ "/flowplayer/flowplayer-3.2.15.swf");
								$(
										"<p><input type='checkbox' name='checkPhoto' id='checkPhoto' value='"
												+ path_relative_thumb
												+ "'/></p>").appendTo(li);
							}

						});
	} else {
		$.oimsError("查询该检查单文件失败");
	}
	var pdfList_url = "/publish/jcd/getJcdPDFList.htm";
	var data_pdfList = getJSONData(pdfList_url, {
		jcdid : $("#jcdid").val(),
		tag : Math.random()
	}, "post");
	if (data_pdfList.state) {
		var pdfList = data_pdfList.obj;
		$
				.each(
						pdfList,
						function(i, data) {
							$(
									"<li><a href='"
											+ contextPath
											+ data
											+ "' class='oimsslide' target='_black' title='PDF报告"
											+ (i + 1)
											+ "' > <img src='"
											+ contextPath
											+ "/images/pdf.png"
											+ "'/></a><p><input type='checkbox' name='checkPhoto' id='checkPhoto' value='"
											+ data + "'/></p></li>").appendTo(
									ul);
						});
	} else {
		$.oimsError("查询该检查单文件失败");
	}

}
// 检查单影像数据删除操作
function doPhotoChoice() {
	var data_checkPhoto = $("input[name='checkPhoto']:checked");
	if (data_checkPhoto.length == 0) {
		$.oimsAlert("请选择需要删除的影像数据");
		return;
	}
	$("#form_PhotoChoice").ajaxForm({
		dataType : 'json',
		success : function(data) {
			if (data.state) {
				choiceJcdPhoto(data.obj.jcdid);
			}
		}
	});
	$("#form_PhotoChoice").submit();
}
// 全选操作
function selectAllCheckPhoto() {
	var checkflag = $("#checkAll").attr("checked");
	if (checkflag == undefined || !checkflag) {
		$("input[name='checkPhoto']").attr("checked", false);
	} else {
		$("input[name='checkPhoto']").attr("checked", true);
	}
}

/** *****************************图片筛查操作结束******************************* */

/** ***************************************************检查单重置操作开始************************************ */
// 重置检查单
function resetJcdPhoto() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要操作的检查单");
		return;
	}
	var showJcdTemplate = "<div class='opencontent tableinfo'>"
			+ "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='100%'>"
			+ "<tr>"
			+ "<td width='6%' align='right' nowrap>"
			+ "病例号"
			+ "：</td>"
			+ "<td width='10%'>"
			+ "<input name='binglihao' type='text' class='blurview' id='binglihao'  value='' />"
			+ "</td>"
			+ "<td width='4%' align='right' nowrap>"
			+ "姓名"
			+ "：</td>"
			+ "<td width='8%'><input name='xingming' type='text' class='blurview' id='xingming'  value='' /></td>"
			+ "<td width='5%' align='right' nowrap>"
			+ "性别"
			+ "：</td>"
			+ "<td width='4%'><input name='xingbiename' type='text' class='blurview' id='xingbiename'  value='' /></td>"
			+ "<td width='5%' align='right' nowrap>"
			+ "年龄"
			+ "：</td>"
			+ "<td width='4%'><input name='nianling' type='text' class='blurview' id='nianling'  value='' /></td>"
			+ "<td width='8%' align='right' nowrap>"
			+ "检查项目"
			+ "：</td>"
			+ "<td width='23%'><input name='jcxmmc' type='text' class='blurview' id='jcxmmc'  value='' /></td>"
			+ "<td width='8%' align='right' nowrap>"
			+ "眼别"
			+ "：</td>"
			+ "<td width='6%'><input name='yanbiename' type='text' class='blurview' id='yanbiename'  value='' /></td>"
			+ "<td width='2%'><div class='more'></div></td> " + "</tr>"
			+ "</table>" + "</div>";
	var showJcdBtnTemplate = "<div class='openbtn'>"
			+ "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr></tr>"
			+ "<tr>"
			+ "<td width='12%'><div class='buttonsytle1'><a href='javascript:jcdPhotoReset();'><span class='reset'></span>"
			+ "重置检查" + "</a></div></td>" + "<td width='81%'></td>" + " </tr>"
			+ "</table>" + "</div>";
	var div = $("<div />").attr("id", "showjcdDiv");
	$(div).oimsDialog({
		winType : 4,
		icon : "oufrom",
		title : "重置检查单",
		drag : false,
		locked : true,
		width : "910",
		height : "600"
	});
	$("<form/>").attr("id", "resetJcdForm").attr("action",
			contextPath + "/publish/jcd/PhotoReset.htm").attr("method", "post")
			.appendTo(div);
	$("<input type='hidden' id='id' name='id'/>").appendTo("#resetJcdForm");
	$(showJcdTemplate).appendTo("#resetJcdForm");
	$(showJcdBtnTemplate).appendTo("#resetJcdForm");
	$("<div/>").attr("id", "imgview").addClass("imgview").appendTo(
			"#resetJcdForm");

	$("#id").val(dataObjects[0].id);// 检查单ID
	$("#binglihao").val(dataObjects[0].binglihao);// 病例号
	$("#xingming").val(dataObjects[0].hzxm);// 患者姓名
	$("#xingbiename").val(dataObjects[0].hzxb);// 患者性别
	$("#nianling").val(dataObjects[0].nianling);// 患者年龄
	$("#jcxmmc").val(dataObjects[0].jcxmmc);// 检查项目
	var yanbiename = "";
	if (dataObjects[0].yanbie == oimsCategory.LEFT_EYE)
		yanbiename = "左眼";
	else if (dataObjects[0].yanbie == oimsCategory.RIGHT_EYE)
		yanbiename = "右眼";
	else if (dataObjects[0].yanbie == oimsCategory.DOUBLE_EYE)
		yanbiename = "双眼";
	else
		yanbiename = "";
	$("#yanbiename").val(yanbiename);// 眼别

	$("#imgview").text("");
	var url_getFileListByJcd = "/publish/jcd/getFileListByJcd.htm";
	var data_getFileListByJcd = getJSONData(url_getFileListByJcd, {
		id : $("#id").val(),
		tag : Math.random()
	}, "post");
	if (data_getFileListByJcd.state) {
		var filelist = data_getFileListByJcd.obj;
		$("<div/>").attr("id", "photoarea").addClass("oimsslide-gallery")
				.appendTo("#imgview");
		var ul = $("<ul/>").appendTo("#photoarea");
		$
				.each(
						filelist,
						function(i, data_Photo) {
							var path_relative_thumb = data_Photo.path;
							var path_relative_big = path_relative_thumb
									.replace("thumb/", "");// 大图的相对路径
							var fileFormat = path_relative_thumb.substring(
									path_relative_thumb.lastIndexOf(".") + 1)
									.toLowerCase();// 获取文件格式
							if (fileFormat != "flv") {
								$(
										"<li><a href='"
												+ contextPath
												+ path_relative_big
												+ "' class='oimsslide' onclick='return hs.expand(this);' > <img src='"
												+ contextPath + data_Photo.path
												+ "'/></a></li>").appendTo(ul);
							} else {
								var li = $("<li/>").appendTo(ul);
								$("<a />").attr("id", "player" + i).attr(
										"href",
										contextPath + path_relative_thumb)
										.appendTo(li);
								flowplayer("player" + i, contextPath
										+ "/flowplayer/flowplayer-3.2.15.swf");
							}

						});
	} else {
		$.oimsSucc("查询该检查单文件失败");
	}
}
// 检查单重置操作
function jcdPhotoReset() {
	$("#resetJcdForm").ajaxForm({
		dataType : 'json',
		success : function(data) {
			if (data.state)
				$.oimsSucc("检查单重置操作成功", function() {
					seniorSearchSubmit_finishJcd();
					removeDiv_openWin();
				});
			else
				$.oimsError("检查单重置操作失败", function() {
					seniorSearchSubmit_finishJcd();
					removeDiv_openWin();
				});
		}
	});
	$("#resetJcdForm").submit();
}
/** ***************************************************检查单重置操作结束************************************ */

/** ***************************************已检检查单列表开始***************************************** */
function loadFinishJcdList() {
	listFactor = {
		listObj : [ {
			title : "序号",
			key : "paihao"
		}, {
			title : "检查单号",
			key : "jcdh"
		}, {
			title : "病历号",
			key : "binglihao"
		}, {
			title : "患者姓名",
			key : "hzxm"
		}, {
			title : "患者性别",
			key : "hzxb"
		}, {
			title : "年龄",
			key : "nianling"
		}, {
			title : "检查项目",
			key : "jcxmmc"
		}, {
			title : "眼别",
			key : "yanbie",
			func : function(value) {
				if (value == oimsCategory.LEFT_EYE)
					return "左眼";
				else if (value == oimsCategory.RIGHT_EYE)
					return "右眼";
				else if (value == oimsCategory.DOUBLE_EYE)
					return "双眼";
				else
					return "";
			}
		}, {
			title : "开单时间",
			key : "kdsj"
		}, {
			title : "检查时间",
			key : "jssj"
		}, {
			title : "状态",
			key : "biaoshi"
		} ],
		url : contextPath + "/publish/jcd/getFinishJcdList.htm",// 查询已检查检查单
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			biaoshi : biaoshi,// 56表示已检查检查单
			jcsbId : task.jcsbid,// 检查设备ID
			startkdsj : formatDate(getLastDate(30).getTime()),
			endkdsj: getDateNow(),
			tag : Math.random()
		}
	};
	$("#pageList").remove();
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#ybaogodiv");
	$(div_list).createPageList(listFactor);
}
/** ***************************************已检检查单列表开始***************************************** */

/** ***************************************已检检查单高级窗口开始***************************************** */
function finishJcdAdvSearch() {
	var seniorSearchTemplate = " <table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ " <tr>"
			+ "  <td width='7%' align='right' nowrap>"
			+ "病例号"
			+ "：</td>"
			+ " <td width='12%'><input type='text' name='search_blh'   id='search_blh'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "  <td width='7%' align='right' nowrap>"
			+ "患者姓名"
			+ "：</td>"
			+ " <td width='12%'><input type='text' name='search_hzxm'   id='search_hzxm'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "  <td width='5%' align='right' nowrap>"
			+ "患者性别"
			+ "：</td>"
			+ "  <td width='15%' align='left'><input type='radio' name='search_xingbie' id='search_xingbie' value='1'/>"
			+ "男"
			+ "&nbsp;&nbsp;&nbsp;<input type='radio' name='search_xingbie' id='search_xingbie' value='0'/>"
			+ "女"
			+ "&nbsp;&nbsp;&nbsp;<input type='radio' name='search_xingbie' id='search_xingbie' value='2'/>"
			+ "全部"
			+ "</td>"
			+ " <td width='7%' align='right' nowrap>"
			+ "手机"
			+ "：</td>"
			+ " <td width='13%'><input type='text' name='search_shouji'   id='search_shouji'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ " <td align='right' nowrap>"
			+ "身份证号"
			+ "：</td>"
			+ " <td ><input type='text' name='search_sfzh'   id='search_sfzh'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ " </tr>"
			+ " <tr>"
			+ " <td width='4%' align='right' nowrap>"
			+ "诊别"
			+ "：</td>"
			+ " <td width='7%'><input type='radio' name='search_zhenbie' id='search_zhenbie' value='2'/>"
			+ "门诊"
			+ "&nbsp;<input type='radio' name='search_zhenbie' id='search_zhenbie' value='3'/>"
			+ "住院"
			+ "&nbsp;<input type='radio' name='search_zhenbie' id='search_zhenbie' value='1'/>"
			+ "全部"
			+ "</td>"
			+ " <td align='right' nowrap>"
			+ "检查项目"
			+ "：</td>"
			+ " <td>" 
			+"<select name='search_jcxmIds' id='search_jcxmIds'  onblur=\"this.className='blur'\">"
			+ " <option value=''></option>"
			+ " </select>" 
			+"</td>"
			+ " <td width='8%' align='right' nowrap>"
//			+ "检查医生："
			+ "</td>"
			+ " <td width='13%'>" 
//			+"<select name='search_jcys' id='search_jcys' onblur=\"this.className='blur'\">"
//			+ " <option value=''></option>"
//			+ " </select>" 
			+"</td>"
			+ " <td align='right' nowrap> "
			+ "检查时间"
			+ "：</td>"
			+ " <td><input type='text' name='search_startjcsj'   id='search_startjcsj'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ " <td align='center' nowrap>"
			+ "至"
			+ "</td>"
			+ " <td><input type='text' name='search_endjcsj'   id='search_endjcsj'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ " </tr>"
			+ " </table>"
			+ " <div class='avdopenbutton' >"
			+ " <a href='javascript:seniorSearchSubmit_finishJcd();'><span class='advsumit'></span>"
			+ "提交"
			+ "</a>"
			+ " <a href='javascript:seniorSearchReset_finishJcd();'><span class='advreset'></span>"
			+ "重置"
			+ "</a>"
			+ "<a id = 'closeId'><span class='close' ></span>"
			+ "关闭" + "</a>" + " </div> ";
	$.oimsBox({
		parentDiv : "advquery",// 将生成内容添加的id
		divContent : seniorSearchTemplate
	// 需要添加的内容
	});
	calendarFun("search_startjcsj");// 开始检查时间
	calendarFun("search_endjcsj");// 结束检查时间

	// 检查项目下拉框赋值
	var jcxmData = getJSONData("/publish/jcxm/getJcxmListByGonghao.htm", {// 根据员工工号获取对应的检查项目
		tag : Math.random()
	}, "post");
	if (jcxmData.state) {
		var jcxmlist = jcxmData.obj;
		$.each(jcxmlist, function(i, d) {
			$("<option value=\"" + d.id + "\">" + d.xmmc + "</option>")
					.appendTo("#search_jcxmIds");
		});
	}
	// 检查项目下拉框赋值

	// 检查医生下拉框赋值
	var data_getJianChaDoctorByBumenAndQuanxian = getJSONData(
			"/publish/yuangong/getJianChaDoctorByBumenAndQuanxian.htm", {// 获取具有检查权限的医生
				tag : Math.random()
			}, "post");
	if (data_getJianChaDoctorByBumenAndQuanxian.state) {
		var list = data_getJianChaDoctorByBumenAndQuanxian.obj;
		$.each(list, function(i, yuangong) {
			$(
					"<option value=\"" + yuangong.gonghao + "\">"
							+ yuangong.xingming + "</option>").appendTo(
					"#search_jcys");
		});
	}
	// 检查医生下拉框赋值
}

// 高级查询(整理)
function seniorSearchSubmit_finishJcd() {
	var data_search = {};
	var search = $("#search_binglihao_xingming").val().indexOf("请输入") != -1 ? ""
			: $("#search_binglihao_xingming").val();
	var blh = $("#search_blh").length == 1 ? $("#search_blh").val() : "";// 病例号
	var hzxm = $("#search_hzxm").length == 1 ? $("#search_hzxm").val() : "";// 患者姓名
	var xingbie = $("#search_xingbie").length != 0 ? $(
			"input[name='search_xingbie']:checked").val() : 2;// 患者性别
	var shouji = $("#search_shouji").length == 1 ? $("#search_shouji").val()
			: "";// 手机
	var sfzh = $("#search_sfzh").length == 1 ? $("#search_sfzh").val() : "";// 身份证号

	var zhenbie = $("#search_zhenbie").length != 0 ? $(
			"input[name='search_zhenbie']:checked").val() : "";// 诊别
	var jcxmid = $("#search_jcxmIds").length == 1 ? $(
			"#search_jcxmIds option:selected").val() : "";// 检查项目
//	var jcys = $("#search_jcys").length == 1 ? $("#search_jcys option:selected")
//			.val()
//			: "";// 检查医生
	var startjcsj = $("#search_startjcsj").length == 1 ? $("#search_startjcsj")
			.val() : "";// 检查时间 开始
	var endjcsj = $("#search_endjcsj").length == 1 ? $("#search_endjcsj").val()
			: "";// 检查时间 结束
	var searchBiaoshi;
	if(($("#search_biaoshi").length == 1 ?$("#search_biaoshi option:selected").val() : "")!=""){
		searchBiaoshi = $("#search_biaoshi option:selected").val();
	}else{
		searchBiaoshi = biaoshi;
	}
	data_search = {
		search : search,
		blh : blh,// 病例号
		hzxm : hzxm,// 患者姓名
		xingbie : xingbie,// 患者性别
		shouji : shouji,// 手机
		sfzh : sfzh,// 身份证号
		zhenbie : zhenbie,// 诊别
		jcxmid : jcxmid,// 检查项目
//		jcys : jcys,// 检查医生
		startjcsj : startjcsj,// 检查时间 开始
		endjcsj : endjcsj,
		biaoshi:searchBiaoshi
	};
	$.extend(listFactor.data, data_search);
	$("#pageList").createPageList(listFactor);
}

// 已检患者高级查询重置(整理)
function seniorSearchReset_finishJcd() {
	$("#search_blh").val("");// 病例号
	$("#search_hzxm").val("");// 患者姓名
	$("input[name='search_xingbie']").attr("checked", false);// 患者性别
	$("#search_shouji").val("");// 手机
	$("#search_sfzh").val("");// 身份证号
	$("input[name='search_zhenbie']").attr("checked", false);// 诊别
	$("#search_jcxmIds").val("");// 检查项目
	$("#search_jcys").val("");// 检查医生
	$("#search_startjcsj").val("");// 检查时间 开始
	$("#search_endjcsj").val("");// 检查时间 结束
}

/** ***************************************已检检查单高级窗口结束***************************************** */

/** ***************************************过号患者点击调用的方法开始***************************************** */
function showGuoHaoJcdList(btns) {
	if (!isResetJiancha())
		return;
	pageTitle = "已过号检查单";
	init();
	shebeiManager();// 检查设备配置验证(根据工号和IP判断)
	var passJcdFunTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='23%' class='leftalign' ><input name='search_binglihao_xingming' type='text' class='blurview' id='search_binglihao_xingming' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value="
			+ "请输入病历号或患者姓名"
			+ " size='28' /></td>"
			+ "<td width='9%'><a href='javascript:seniorSearchSubmit_guoHaoJcd();' class='search'>"
			+ "查询"
			+ "</a></td>"
			+ "<td width='9%'><a href='javascript:guoHaoJcdAdvSearch();' class='advsearch'>"
			+ "高级查询"
			+ "</a></td>"
			+ "<td width='59%' >"
			+ "<div class='btn'>"
			+ "<a disabled href='javascript:jiaoHao_GuoHaoJcd();'><span class='plusa'></span>"
			+ "叫号"
			+ "</a>"
			+ "<a disabled id='zhixing' href='javascript:executeJcd_GuoHaoJcd();'><span class='doinga'></span>"
			+ "执行"
			+ "</a>"
			+ "<a id='import' disabled href='javascript:importJcdPhoto_GuoHaoJcd();'><span class='importa'></span>"
			+ "导入" + "</a></div>" + "</td>" + "</tr>" + "</table>";
	$("<div/>").attr("id", "advquery").addClass("advquery").appendTo("#right");
	$(passJcdFunTemplate).appendTo("#advquery");
	if (task.jcsbid != null && task.jcsbid != "") {
		btnProwerConfig(btns);// 按钮加上权限
	}
	$("#search_binglihao_xingming").click(function() {
		clearInitQuery(this);
	});
	$("#search_binglihao_xingming").blur(function() {
		if (this.value == "") {
			$("#search_binglihao_xingming").val("请输入病历号或患者姓名");
			$("#search_binglihao_xingming").addClass("blurview");
		}

	});
	$("#search_binglihao_xingming").bind("keyup", function(e) {
		if (e.which == 13) {
			seniorSearchSubmit_guoHaoJcd();
		}
	});
	loadGuoHaoJcdList();

}

/** **************************叫号_过号检查单操作**************************** */
function jiaoHao_GuoHaoJcd() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要操作的检查单");
		return;
	}
	$.oimsAlert("执行叫号操作");
}
/** **************************叫号_过号检查单操作**************************** */
/** **************************执行_过号检查单操作**************************** */
function executeJcd_GuoHaoJcd() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要操作的检查单");
		return;
	}
	showOneExecuteJcdForm();
	var url_getJcdExecuteFormByJcd = "/publish/jcd/getJcdExecuteFormByJcd.htm";
	var data_getJcdExecuteFormByJcd = getJSONData(url_getJcdExecuteFormByJcd, {
		id : dataObjects[0].id,
		tag : Math.random()
	}, "POST");
	if (data_getJcdExecuteFormByJcd.state) {
		var jcdexecuteform = data_getJcdExecuteFormByJcd.obj;
		$("#searchId").val(jcdexecuteform.binglihao);// 病历号
		$("#xingming").val(jcdexecuteform.xingming);// 患者姓名
		$("#xingbie").val(jcdexecuteform.xingbie ? "男" : "女");// 男
		$("#nianling").val(jcdexecuteform.nianling);// 年龄
		$("#shouji").val(jcdexecuteform.shouji);// 手机
		$("#jcxmmc").val(jcdexecuteform.jcxm);// 检查项目
		if (jcdexecuteform.yanbie == oimsCategory.LEFT_EYE) {
			$("#yanbie").val("左眼");
		} else if (jcdexecuteform.yanbie == oimsCategory.RIGHT_EYE) {
			$("#yanbie").val("右眼");
		} else if (jcdexecuteform.yanbie == oimsCategory.DOUBLE_EYE) {
			$("#yanbie").val("双眼");
		} else {
			$("#yanbie").val("");
		}
		$("#jcdid").val(jcdexecuteform.jcdid);// 检查单号
		$("#yaoqiu").val(jcdexecuteform.yaoqiu);// 检查要求
		$("#zhenduan").val(jcdexecuteform.zhenduan);// 诊断
		$("#zushu").val(jcdexecuteform.zushu);// 主诉
		$("#xianbingshi").val(jcdexecuteform.xianbingshi);// 现病史
		$("#jiwangshi").val(jcdexecuteform.jiwangshi);// 既往史
		$("#jiazushi").val(jcdexecuteform.jiazushi);// 家族史
		$("#jcsj").val(jcdexecuteform.jcsj);// 检查所见
		$("#jcdBiaoshi").val(jcdexecuteform.biaoshi);
	}
}
/** **************************执行_过号检查单操作**************************** */
/** *****************************检查单手动图片导入操作(已检检查单列表)开始******************************* */
function importJcdPhoto_GuoHaoJcd() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要操作的检查单");
		return;
	}
	// 建立第一个table
	var uploadTemplate = "<div class='buttonsytle1 exportbtnbgbg'>"
			+
			// 上传，取消上传，浏览按钮
			"<a href='javascript:uploadifyUpload();'><span class='export'></span>"
			+ "上传文件"
			+ "</a>"
			+ " <a href='javascript:uploadifyClearQueue();'><span class='reset'></span>"
			+ "取消上传" + "</a>" + "</div>";
	// 建立第二个table
	var importinfo = "<div id='fileimport' class='bowsrediv' >"
			+ "<input type='file' name='fileinput' id='fileinput'/>"
			+ "<form  method='post' enctype='multipart/form-data' ></form>"
			+ "</div>";
	var div = $("<div/>").attr("id", "importDiv").appendTo("body");
	$(uploadTemplate).appendTo("#importDiv");
	$(importinfo).appendTo("#importDiv");
	// 弹出对话框
	$(div).oimsDialog({
		winType : 4,
		icon : "openexport",
		title : "图片导入",
		drag : false,
		locked : true,
		width : "450",
		height : "230",
		maxButton : false,
		minButton : false
	});
	var id = dataObjects[0].id;
	var huanzheId = dataObjects[0].huanzheid;
	var jiuzhenId = dataObjects[0].jiuzhenid;
	$("#fileinput")
			.uploadify(
					{
						'uploader' : contextPath + '/uploadify/uploadify.swf',
						'script' : contextPath
								+ '/publish/jcd/importJcdPhoto.htm?',
						'method' : 'Post',
						'cancelImg' : contextPath + '/uploadify/cancel.png',
						'buttonImg' : contextPath
								+ '/style/green/images/bowsre.png',
						'auto' : false,
						'folder' : '/',
						'multi' : true,
						'scriptData' : {
							'id' : id,
							'jiuzhenId' : jiuzhenId,
							'jcsbId' : task.jcsbid,
							'huanzheId' : huanzheId
						},
						'fileDesc' : '.jpg,.bmp,.png,.tiff,.tif,.gif,.avi,.wmv,.mpg,.pdf',
						'fileExt' : '*.jpg;*.bmp;*.png;*.tiff;*.tif;*.gif;*.avi;*.wmv;*.mpg;*.mpeg;*.pdf',
						'sizeLimit' : 10 * 1024 * 1024 * 1024,
						onComplete : function(event, queueID, fileObj,
								response, data) {
							var json_response = eval("(" + response + ")");
							if (!json_response.state) {
								$.oimsError("文件上传失败，请稍后重新上传");
							}
						},
						onAllComplete : function(event, queueID, fileObj) {
							$.oimsSucc("影像文件上传成功", function() {
								seniorSearchSubmit_guoHaoJcd();
								removeDiv_openWin();
							});
						},
						onError : function(event, queueID, fileObj) {

						},
						onCancel : function(event, queueID, fileObj) {

						}
					});
}

function uploadifyUpload() {
	$('#fileinput').uploadifyUpload();
}
function uploadifyClearQueue() {
	$('#fileinput').uploadifyClearQueue();
}

/** *****************************检查单手动图片导入操作(过号检查单列表)结束******************************* */

/** ***************************************过号患者点击调用的方法开始***************************************** */

/** ***************************************过号检查单列表开始***************************************** */
function loadGuoHaoJcdList() {
	listFactor = {
		listObj : [ {
			title : "序号",
			key : "paihao"
		}, {
			title : "检查单号",
			key : "jcdh"
		}, {
			title : "病历号",
			key : "binglihao"
		}, {
			title : "患者姓名",
			key : "hzxm"
		}, {
			title : "患者性别",
			key : "hzxb"
		}, {
			title : "年龄",
			key : "nianling"
		}, {
			title : "检查项目",
			key : "jcxmmc"
		}, {
			title : "眼别",
			key : "yanbie",
			func : function(value) {
				if (value == oimsCategory.LEFT_EYE)
					return "左眼";
				else if (value == oimsCategory.RIGHT_EYE)
					return "右眼";
				else if (value == oimsCategory.DOUBLE_EYE)
					return "双眼";
				else
					return "";
			}
		}, {
			title : "开单时间",
			key : "kdsj"
		}, {
			title : "检查时间",
			key : "jssj"
		}, {
			title : "状态",
			key : "biaoshi"
		} ],
		url : contextPath + "/publish/jcd/getGuoHaoJcdList.htm",// 根据已过号的检查单
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			biaoshi : oimsCategory.JCD_STATE_YGH,// 53表示已过号检查单
			jcsbId : task.jcsbid,// 检查设备ID
			startkdsj : formatDate(getLastDate(30).getTime()),
			endkdsj: getDateNow(),
			tag : Math.random()
		}
	};
	$("#pageList").remove();
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#right");
	$(div_list).createPageList(listFactor);
}

// 过号检查单高级查询弹出窗口(整理)
function guoHaoJcdAdvSearch() {
	var seniorSearchTemplate = " <table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ " <tr>"
			+ " <td width='7%' align='right' nowrap>"
			+ "病例号"
			+ "：</td>"
			+ " <td width='12%'><input type='text' name='search_blh'   id='search_blh'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "  <td width='7%' align='right' nowrap>"
			+ "患者姓名"
			+ "：</td>"
			+ " <td width='12%'><input type='text' name='search_hzxm'   id='search_hzxm'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "  <td width='5%' align='right' nowrap>"
			+ "患者性别"
			+ "：</td>"
			+ "  <td width='10%'><input type='radio' name='search_xingbie' id='search_xingbie' value='1'/>"
			+ "男"
			+ "&nbsp;&nbsp;&nbsp;<input type='radio' name='search_xingbie' id='search_xingbie' value='0'/>"
			+ "女"
			+ "&nbsp;&nbsp;&nbsp;<input type='radio' name='search_xingbie' id='search_xingbie' value='2'/>"
			+ "全部"
			+ "</td>"
			+ " <td width='7%' align='right' nowrap>"
			+ "手机"
			+ "：</td>"
			+ " <td width='13%'><input type='text' name='search_shouji'   id='search_shouji'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ " <td align='right' nowrap>"
			+ "身份证号"
			+ "：</td>"
			+ " <td ><input type='text' name='search_sfzh'   id='search_sfzh'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ " </tr>"
			+ " <tr>"
			+ " <td width='4%' align='right' nowrap>"
			+ "诊别"
			+ "：</td>"
			+ " <td width='7%'><input type='radio' name='search_zhenbie' id='search_zhenbie' value='2'/>"
			+ "门诊"
			+ "&nbsp;<input type='radio' name='search_zhenbie' id='search_zhenbie' value='3'/>"
			+ "住院"
			+ "&nbsp;<input type='radio' name='search_zhenbie' id='search_zhenbie' value='1'/>"
			+ "全部"
			+ "</td>"
			+ " <td align='right' nowrap>"
			+ "检查项目"
			+ "：</td>"
			+ " <td><select name='search_jcxmIds' id='search_jcxmIds' onblur=\"this.className='blur'\">"
			+ " <option value=''></option>"
			+ " </select></td>"
			+ " <td width='8%' align='right' nowrap>"
			+ "开单医生"
			+ "：</td>"
			+ " <td width='13%'><select name='search_kdys' id='search_kdys' onblur=\"this.className='blur'\">"
			+ " <option value=''></option>"
			+ " </select></td>"
			+ " <td align='right' nowrap> "
			+ "开单时间"
			+ "：</td>"
			+ " <td><input type='text' name='search_startkdsj'   id='search_startkdsj'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ " <td align='center' nowrap>"
			+ "至"
			+ "</td>"
			+ " <td><input type='text' name='search_endkdsj'   id='search_endkdsj'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ " </tr>"
			+ " </table>"
			+ " <div class='avdopenbutton' >"
			+ " <a href='javascript:seniorSearchSubmit_guoHaoJcd();'><span class='advsumit'></span>"
			+ "提交"
			+ "</a>"
			+ " <a href='javascript:seniorSearchReset_guoHaoJcd();'><span class='advreset'></span>"
			+ "重置"
			+ "</a>"
			+ "<a id = 'closeId'><span class='close' ></span>"
			+ "关闭" + "</a>" + " </div> ";
	$.oimsBox({
		parentDiv : "advquery",// 将生成内容添加的id
		divContent : seniorSearchTemplate
	// 需要添加的内容
	});
	calendarFun("search_startkdsj");// 开始开单时间
	calendarFun("search_endkdsj", -70);// 结束开单时间

	// 检查项目下拉框赋值
	var jcxmData = getJSONData("/publish/jcxm/getJcxmListByGonghao.htm", {// 根据员工工号获取对应的检查项目
		tag : Math.random()
	}, "post");
	if (jcxmData.state) {
		var jcxmlist = jcxmData.obj;
		$.each(jcxmlist, function(i, d) {
			$("<option value=\"" + d.id + "\">" + d.xmmc + "</option>")
					.appendTo("#search_jcxmIds");
		});
	}
	// 检查项目下拉框赋值

	// 开单医生下拉框赋值
	var kdysData = getJSONData(
			"/publish/yuangong/getKaiDanDoctorByQuanxian.htm", {
				tag : Math.random()
			}, "post");
	if (kdysData.state) {
		var yuangonglist = kdysData.obj;
		$.each(yuangonglist,
				function(i, d) {
					$(
							"<option value=\"" + d.gonghao + "\">" + d.xingming
									+ "</option>").appendTo("#search_kdys");
				});
	}
	// 开单医生下拉框赋值
}

// 过号检查单高级查询(整理)
function seniorSearchSubmit_guoHaoJcd() {
	var data_search = {};
	var search = $("#search_binglihao_xingming").val().indexOf("请输入") != -1 ? ""
			: $("#search_binglihao_xingming").val();
	var blh = $("#search_blh").length == 1 ? $("#search_blh").val() : "";// 病例号
	var hzxm = $("#search_hzxm").length == 1 ? $("#search_hzxm").val() : "";// 患者姓名
	var xingbie = $("#search_xingbie").length != 0 ? $(
			"input[name='search_xingbie']:checked").val() : 2;// 患者性别
	var sfzh = $("#search_sfzh").length == 1 ? $("#search_sfzh").val() : "";// 身份证号
	var shouji = $("#search_shouji").length == 1 ? $("#search_shouji").val()
			: "";// 手机
	var zhenbie = $("#search_zhenbie").length != 0 ? $(
			"input[name='search_zhenbie']:checked").val() : "";// 诊别
	var jcxmid = $("#search_jcxmIds").length == 1 ? $(
			"#search_jcxmIds option:selected").val() : "";// 检查项目
	var kdys = $("#search_kdys").length == 1 ? $("#search_kdys option:selected")
			.val()
			: "";// 开单医生
	var startkdsj = $("#search_startkdsj").length == 1 ? $("#search_startkdsj")
			.val() : "";// 开单时间 开始
	var endkdsj = $("#search_endkdsj").length == 1 ? $("#search_endkdsj").val()
			: "";// 开单时间 结束
	data_search = {
		search : search,
		blh : blh,// 病例号
		hzxm : hzxm,// 患者姓名
		xingbie : xingbie,// 患者性别
		shouji : shouji,// 手机
		sfzh : sfzh,// 身份证号
		zhenbie : zhenbie,// 诊别
		jcxmid : jcxmid,// 检查项目
		kdys : kdys,// 开单医生
		startkdsj : startkdsj,// 开单时间 开始
		endkdsj : endkdsj
	// 开单时间 结束
	};
	$.extend(listFactor.data, data_search);
	$("#pageList").createPageList(listFactor);
}

// 过号检查单高级查询重置(整理)
function seniorSearchReset_guoHaoJcd() {
	$("#search_blh").val("");// 病例号
	$("#search_hzxm").val("");// 患者姓名
	$("input[name='search_xingbie']").attr("checked", false);// 患者性别
	$("#search_shouji").val("");// 手机
	$("#search_sfzh").val("");// 身份证号
	$("input[name='search_zhenbie']").attr("checked", false);// 诊别
	$("#search_jcxmIds").val("");// 检查项目
	$("#search_kdys").val("");// 开单医生
	$("#search_startkdsj").val("");// 开单时间 开始
	$("#search_endkdsj").val("");// 开单时间 结束
}

/** ***************************************过号检查单列表结束***************************************** */

/** ***************************************待补传检查单调用方法开始***************************************** */
// 待补传检查单列表
function showBuChuanJcdList(btns) {
	if (!isResetJiancha())
		return;
	pageTitle = "待补传检查单";
	init();
	shebeiManager();// 检查设备配置验证(根据工号和IP判断)
	var passJcdFunTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='23%' class='leftalign' ><input name='search_binglihao_xingming' type='text' class='blurview' id='search_binglihao_xingming' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value="
			+ "请输入病历号或患者姓名"
			+ " size='28' /></td>"
			+ "<td width='9%'><a href='javascript:seniorSearchSubmit_buChuanJcd();' class='search'>"
			+ "查询"
			+ "</a></td>"
			+ "<td width='9%'><a href='javascript:buChuanJcdAdvSearch();' class='advsearch'>"
			+ "高级查询"
			+ "</a></td>"
			+ "<td width='59%' >"
			+ "<div class='btn'>"
			+ "<a onclick='return false;' href='javascript:jiaoHao_BuChuanJcd();'><span class='plusa'></span>"
			+ "叫号"
			+ "</a>"
			+ "<a onclick='return false;' id='zhixing' href='javascript:executeJcd_BuChuanJcd();'><span class='doinga'></span>"
			+ "执行"
			+ "</a>"
			+ "<a onclick='return false;' id='import' href='javascript:importJcdPhoto_BuChuanJcd();'><span class='importa'></span>"
			+ "导入" + "</a></div>" + "</td>" + "</tr>" + "</table>";

	$("<div/>").attr("id", "advquery").addClass("advquery").appendTo("#right");
	$(passJcdFunTemplate).appendTo("#advquery");
	if (task.jcsbid != null && task.jcsbid != "") {
		btnProwerConfig(btns);// 按钮加上权限
	}
	$("#search_binglihao_xingming").click(function() {
		clearInitQuery(this);
	});
	$("#search_binglihao_xingming").blur(function() {
		if (this.value == "") {
			$("#search_binglihao_xingming").val("请输入病历号或患者姓名");
			$("#search_binglihao_xingming").addClass("blurview");
		}

	});
	$("#search_binglihao_xingming").bind("keyup", function(e) {
		if (e.which == 13) {
			seniorSearchSubmit_buChuanJcd();
		}
	});
	loadBuChuanJcdList();
}

/** **************************叫号_待补传检查单操作**************************** */
function jiaoHao_BuChuanJcd() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要操作的检查单");
		return;
	}
	$.oimsAlert("执行叫号操作");
}
/** **************************叫号_待补传检查单操作**************************** */
/** **************************执行_待补传检查单操作**************************** */
function executeJcd_BuChuanJcd() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要操作的检查单");
		return;
	}
	showOneExecuteJcdForm();
	var url_getJcdExecuteFormByJcd = "/publish/jcd/getJcdExecuteFormByJcd.htm";
	var data_getJcdExecuteFormByJcd = getJSONData(url_getJcdExecuteFormByJcd, {
		id : dataObjects[0].id,
		tag : Math.random()
	}, "POST");
	if (data_getJcdExecuteFormByJcd.state) {
		var jcdexecuteform = data_getJcdExecuteFormByJcd.obj;
		$("#searchId").val(jcdexecuteform.binglihao);// 病历号
		$("#xingming").val(jcdexecuteform.xingming);// 患者姓名
		$("#xingbie").val(jcdexecuteform.xingbie ? "男" : "女");// 男
		$("#nianling").val(jcdexecuteform.nianling);// 年龄
		$("#shouji").val(jcdexecuteform.shouji);// 手机
		$("#jcxmmc").val(jcdexecuteform.jcxm);// 检查项目
		if (jcdexecuteform.yanbie == oimsCategory.LEFT_EYE) {
			$("#yanbie").val("左眼");
		} else if (jcdexecuteform.yanbie == oimsCategory.RIGHT_EYE) {
			$("#yanbie").val("右眼");
		} else if (jcdexecuteform.yanbie == oimsCategory.DOUBLE_EYE) {
			$("#yanbie").val("双眼");
		} else {
			$("#yanbie").val("");
		}
		$("#jcdid").val(jcdexecuteform.jcdid);// 检查单号
		$("#yaoqiu").val(jcdexecuteform.yaoqiu);// 检查要求
		$("#zhenduan").val(jcdexecuteform.zhenduan);// 诊断
		$("#zushu").val(jcdexecuteform.zushu);// 主诉
		$("#xianbingshi").val(jcdexecuteform.xianbingshi);// 现病史
		$("#jiwangshi").val(jcdexecuteform.jiwangshi);// 既往史
		$("#jiazushi").val(jcdexecuteform.jiazushi);// 家族史
		$("#jcsj").val(jcdexecuteform.jcsj);// 检查所见
		$("#jcdBiaoshi").val(jcdexecuteform.biaoshi);
	}
}
/** **************************执行_待补传检查单操作**************************** */
/** *****************************检查单手动图片导入操作(待补传检查单列表)开始******************************* */
function importJcdPhoto_BuChuanJcd() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要操作的检查单");
		return;
	}
	// 建立第一个table
	var uploadTemplate = "<div class='buttonsytle1 exportbtnbgbg'>"
			+
			// 上传，取消上传，浏览按钮
			"<a href='javascript:uploadifyUpload();'><span class='export'></span>"
			+ "上传文件"
			+ "</a>"
			+ " <a href='javascript:uploadifyClearQueue();'><span class='reset'></span>"
			+ "取消上传" + "</a>" + "</div>";
	// 建立第二个table
	var importinfo = "<div id='fileimport' class='bowsrediv' >"
			+ "<input type='file' name='fileinput' id='fileinput'/>"
			+ "<form  method='post' enctype='multipart/form-data' ></form>"
			+ "</div>";
	var div = $("<div/>").attr("id", "importDiv").appendTo("body");
	$(uploadTemplate).appendTo("#importDiv");
	$(importinfo).appendTo("#importDiv");
	// 弹出对话框
	$(div).oimsDialog({
		winType : 4,
		icon : "openexport",
		title : "图片导入",
		drag : false,
		locked : true,
		width : "450",
		height : "230",
		maxButton : false,
		minButton : false
	});
	var id = dataObjects[0].id;
	var huanzheId = dataObjects[0].huanzheid;
	var jiuzhenId = dataObjects[0].jiuzhenid;
	$("#fileinput")
			.uploadify(
					{
						'uploader' : contextPath + '/uploadify/uploadify.swf',
						'script' : contextPath
								+ '/publish/jcd/importJcdPhoto.htm?',
						'method' : 'Post',
						'cancelImg' : contextPath + '/uploadify/cancel.png',
						'buttonImg' : contextPath
								+ '/style/green/images/bowsre.png',
						'auto' : false,
						'folder' : '/',
						'multi' : true,
						'scriptData' : {
							'id' : id,
							'jiuzhenId' : jiuzhenId,
							'jcsbId' : task.jcsbid,
							'huanzheId' : huanzheId
						},
						'fileDesc' : '.jpg,.bmp,.png,.tiff,.tif,.gif,.avi,.wmv,.mpg',
						'fileExt' : '*.jpg;*.bmp;*.png;*.tiff;*.tif;*.gif;*.avi;*.wmv;*.mpg;*.mpeg',
						'sizeLimit' : 10 * 1024 * 1024 * 1024,
						onComplete : function(event, queueID, fileObj,
								response, data) {
							var json_response = eval("(" + response + ")");
							if (!json_response.state) {
								$.oimsError("文件上传失败，请稍后重新上传");
							}
						},
						onAllComplete : function(event, queueID, fileObj) {
							$.oimsSucc("影像文件上传成功", function() {
								seniorSearchSubmit_buChuanJcd();
								removeDiv_openWin();
							});
						},
						onError : function(event, queueID, fileObj) {

						},
						onCancel : function(event, queueID, fileObj) {

						}
					});
}

function uploadifyUpload() {
	$('#fileinput').uploadifyUpload();
}
function uploadifyClearQueue() {
	$('#fileinput').uploadifyClearQueue();
}

/** *****************************检查单手动图片导入操作(待补传检查单列表)结束******************************* */

function loadBuChuanJcdList() {
	listFactor = {
		listObj : [ {
			title : "序号",
			key : "paihao"
		}, {
			title : "检查单号",
			key : "jcdh"
		}, {
			title : "病历号",
			key : "binglihao"
		}, {
			title : "患者姓名",
			key : "hzxm"
		}, {
			title : "患者性别",
			key : "hzxb"
		}, {
			title : "年龄",
			key : "nianling"
		}, {
			title : "检查项目",
			key : "jcxmmc"
		}, {
			title : "眼别",
			key : "yanbie",
			func : function(value) {
				if (value == oimsCategory.LEFT_EYE)
					return "左眼";
				else if (value == oimsCategory.RIGHT_EYE)
					return "右眼";
				else if (value == oimsCategory.DOUBLE_EYE)
					return "双眼";
				else
					return "";
			}
		}, {
			title : "开单时间",
			key : "kdsj"
		}, {
			title : "检查时间",
			key : "jssj"
		}, {
			title : "状态",
			key : "biaoshi"
		} ],
		url : contextPath + "/publish/jcd/getBuChuanJcdList.htm",// 查询待补传的检查单
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			biaoshi : oimsCategory.JCD_STATE_DBC,// 52表示待补传检查单
			jcsbId : task.jcsbid,// 检查设备ID
			startkdsj : formatDate(getLastDate(30).getTime()),
			endkdsj: getDateNow(),
			tag : Math.random()
		}
	};
	$("#pageList").remove();
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#right");
	$(div_list).createPageList(listFactor);
}

// 待补传检查单高级查询弹出窗口(整理)
function buChuanJcdAdvSearch() {
	var seniorSearchTemplate = " <table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ " <tr>"
			+ " <td width='7%' align='right' nowrap>"
			+ "病例号"
			+ "：</td>"
			+ " <td width='12%'><input type='text' name='search_blh'   id='search_blh'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "  <td width='7%' align='right' nowrap>"
			+ "患者姓名"
			+ "：</td>"
			+ " <td width='12%'><input type='text' name='search_hzxm'   id='search_hzxm'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "  <td width='5%' align='right' nowrap>"
			+ "患者性别"
			+ "：</td>"
			+ "  <td width='10%'><input type='radio' name='search_xingbie' id='search_xingbie' value='1'/>"
			+ "男"
			+ "&nbsp;&nbsp;&nbsp;<input type='radio' name='search_xingbie' id='search_xingbie' value='0'/>"
			+ "女"
			+ "&nbsp;&nbsp;&nbsp;<input type='radio' name='search_xingbie' id='search_xingbie' value='2'/>"
			+ "全部"
			+ "</td>"
			+ " <td width='7%' align='right' nowrap>"
			+ "手机"
			+ "：</td>"
			+ " <td width='13%'><input type='text' name='search_shouji'   id='search_shouji'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ " <td align='right' nowrap>"
			+ "身份证号"
			+ "：</td>"
			+ " <td ><input type='text' name='search_sfzh'   id='search_sfzh'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ " </tr>"
			+ " <tr>"
			+ " <td width='4%' align='right' nowrap>"
			+ "诊别"
			+ "：</td>"
			+ " <td width='7%'><input type='radio' name='search_zhenbie' id='search_zhenbie' value='2'/>"
			+ "门诊"
			+ "&nbsp;<input type='radio' name='search_zhenbie' id='search_zhenbie' value='3'/>"
			+ "住院"
			+ "&nbsp;<input type='radio' name='search_zhenbie' id='search_zhenbie' value='1'/>"
			+ "全部"
			+ "</td>"
			+ " <td align='right' nowrap>"
			+ "检查项目"
			+ "：</td>"
			+ " <td><select name='search_jcxmIds' id='search_jcxmIds' onblur=\"this.className='blur'\">"
			+ " <option value=''></option>"
			+ " </select></td>"
			+ " <td width='8%' align='right' nowrap>"
			+ "开单医生"
			+ "：</td>"
			+ " <td width='13%'><select name='search_kdys' id='search_kdys' onblur=\"this.className='blur'\">"
			+ " <option value=''></option>"
			+ " </select></td>"
			+ " <td align='right' nowrap> "
			+ "开单时间"
			+ "：</td>"
			+ " <td><input type='text' name='search_startkdsj'   id='search_startkdsj'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ " <td align='center' nowrap>"
			+ "至"
			+ "</td>"
			+ " <td><input type='text' name='search_endkdsj'   id='search_endkdsj'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ " </tr>"
			+ " </table>"
			+ " <div class='avdopenbutton' >"
			+ " <a href='javascript:seniorSearchSubmit_buChuanJcd();'><span class='advsumit'></span>"
			+ "提交"
			+ "</a>"
			+ " <a href='javascript:seniorSearchReset_buChuanJcd();'><span class='advreset'></span>"
			+ "重置"
			+ "</a>"
			+ "<a id = 'closeId'><span class='close' ></span>"
			+ "关闭" + "</a>" + " </div> ";
	$.oimsBox({
		parentDiv : "advquery",// 将生成内容添加的id
		divContent : seniorSearchTemplate
	// 需要添加的内容
	});
	calendarFun("search_startkdsj");// 开始开单时间
	calendarFun("search_endkdsj", -70);// 结束开单时间

	// 检查项目下拉框赋值
	var jcxmData = getJSONData("/publish/jcxm/getJcxmListByGonghao.htm", {// 根据员工工号获取对应的检查项目
		tag : Math.random()
	}, "post");
	if (jcxmData.state) {
		var jcxmlist = jcxmData.obj;
		$.each(jcxmlist, function(i, d) {
			$("<option value=\"" + d.id + "\">" + d.xmmc + "</option>")
					.appendTo("#search_jcxmIds");
		});
	}
	// 检查项目下拉框赋值

	// 开单医生下拉框赋值
	var kdysData = getJSONData(
			"/publish/yuangong/getKaiDanDoctorByQuanxian.htm", {
				tag : Math.random()
			}, "post");
	if (kdysData.state) {
		var yuangonglist = kdysData.obj;
		$.each(yuangonglist,
				function(i, d) {
					$(
							"<option value=\"" + d.gonghao + "\">" + d.xingming
									+ "</option>").appendTo("#search_kdys");
				});
	}
	// 开单医生下拉框赋值
}
// 待补传检查单高级查询(整理)
function seniorSearchSubmit_buChuanJcd() {
	var data_search = {};
	var search = $("#search_binglihao_xingming").val().indexOf("请输入") != -1 ? ""
			: $("#search_binglihao_xingming").val();
	var blh = $("#search_blh").length == 1 ? $("#search_blh").val() : "";// 病例号
	var hzxm = $("#search_hzxm").length == 1 ? $("#search_hzxm").val() : "";// 患者姓名
	var xingbie = $("#search_xingbie").length != 0 ? $(
			"input[name='search_xingbie']:checked").val() : 2;// 患者性别
	var sfzh = $("#search_sfzh").length == 1 ? $("#search_sfzh").val() : "";// 身份证号
	var shouji = $("#search_shouji").length == 1 ? $("#search_shouji").val()
			: "";// 手机
	var zhenbie = $("#search_zhenbie").length != 0 ? $(
			"input[name='search_zhenbie']:checked").val() : "";// 诊别
	var jcxmid = $("#search_jcxmIds").length == 1 ? $(
			"#search_jcxmIds option:selected").val() : "";// 检查项目
	var kdys = $("#search_kdys").length == 1 ? $("#search_kdys option:selected")
			.val()
			: "";// 开单医生
	var startkdsj = $("#search_startkdsj").length == 1 ? $("#search_startkdsj")
			.val() : "";// 开单时间 开始
	var endkdsj = $("#search_endkdsj").length == 1 ? $("#search_endkdsj").val()
			: "";// 开单时间 结束
	data_search = {
		search : search,
		blh : blh,// 病例号
		hzxm : hzxm,// 患者姓名
		xingbie : xingbie,// 患者性别
		shouji : shouji,// 手机
		sfzh : sfzh,// 身份证号
		zhenbie : zhenbie,// 诊别
		jcxmid : jcxmid,// 检查项目
		kdys : kdys,// 开单医生
		startkdsj : startkdsj,// 开单时间 开始
		endkdsj : endkdsj
	// 开单时间 结束
	};
	$.extend(listFactor.data, data_search);
	$("#pageList").createPageList(listFactor);
}
// 待补传检查单高级查询重置(整理)
function seniorSearchReset_buChuanJcd() {
	$("#search_blh").val("");// 病例号
	$("#search_hzxm").val("");// 患者姓名
	$("input[name='search_xingbie']").attr("checked", false);// 患者性别
	$("#search_shouji").val("");// 手机
	$("#search_sfzh").val("");// 身份证号
	$("input[name='search_zhenbie']").attr("checked", false);// 诊别
	$("#search_jcxmIds").val("");// 检查项目
	$("#search_kdys").val("");// 开单医生
	$("#search_startkdsj").val("");// 开单时间 开始
	$("#search_endkdsj").val("");// 开单时间 结束
}
/** ***************************************待补传检查单调用方法结束***************************************** */
