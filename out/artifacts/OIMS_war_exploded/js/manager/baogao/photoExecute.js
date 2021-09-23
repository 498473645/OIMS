function exportJcdPhotoView(jcd) {
	importCSS("/flowplayer/style.css");
	importJS("/js/swfobject.js");
	importJS("/flowplayer/flowplayer-3.2.11.min.js");
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
			+ "<td width='12%'><div class='buttonsytle1'><a href='javascript:executePhotoExport();'><span class='outfrom'></span>"
			+ "影像导出" + "</a></div></td>" 
			+ "<td width='12%'><div class='buttonsytle1'><a href='javascript:executePhotoExportAll();'><span class='outfrom'></span>"
			+ "历次导出" + "</a></div></td>" 
			+ "<td width='61%'></td>"
			+ " </tr>"
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
	$("#jcdid").val(jcd.jcdid);// 检查单ID
	$("#binglihao").val(jcd.binglihao);// 病例号
	$("#xingming").val(jcd.xingming);// 患者姓名
	$("#xingbiename").val(jcd.xingbieName);// 患者性别
	$("#nianling").val(jcd.nianling);// 患者年龄
	$("#jcxmmc").val(jcd.jcxmmc);// 检查项目
	$("#yanbie").val(jcd.yanbiename);// 眼别

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
										contextPath + path_relative_thumb)
										.attr("style", "display:block;height:80%;")
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


function executePhotoExport(){
	var data_checkPhoto = $("input[name='checkPhoto']:checked");
	if (data_checkPhoto.length == 0) {
		$.oimsAlert("请选择需要导出的影像数据");
		return;
	}
	$("#form_PhotoExport").ajaxForm({
		dataType : 'json',
		success : function(data) {
			if (data.state) {
				removeDiv_openWin();
				location.href = contextPath + data.obj;
			}
		}
	});
	$("#form_PhotoExport").submit();
}
function executePhotoExportAll(){
	$("#form_PhotoExport").attr("action",
			contextPath + "/publish/jcd/PhotoExportAll.htm")
	$("#form_PhotoExport").ajaxForm({
		dataType : 'json',
		success : function(data) {
			if (data.state) {
				removeDiv_openWin();
				location.href = contextPath + data.obj;
			}
		}
	});
	$("#form_PhotoExport").submit();
}