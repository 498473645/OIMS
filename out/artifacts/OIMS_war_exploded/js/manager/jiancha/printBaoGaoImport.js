//首次加载(整理)
$(function() {
	$("#jckj").val(jckj);
	$("#jcts").val(jcts);
	$("#jckj").attr("readonly", "readonly");// 检查可见
	$("#jcts").attr("readonly", "readonly");// 检查提示ʾ
	var operateDiv = $(".operateDiv");
	var array_div = $(operateDiv)[0].children;
	for ( var i = 0; i < array_div.length; i++)
		$(array_div[i]).css("border", "1px solid black");
	// 操作按钮div
	var div_buttonsytle1 = $("<div/>").attr("id", "div_buttonsytle1").attr(
			"class", "buttonsytle1").attr("style",
			"width: 640px;margin: 0px auto;");// 操作按钮div
	$(div_buttonsytle1).appendTo("#body_baogao");
	var a_print = "<a href='javascript:print_previewBaoGaoImport();' class='btnone' id='a_print'><span class='print'></span>"
			+ "打印" + "</a>";
	$(a_print).appendTo(div_buttonsytle1);
	var a_close = "<a href='javascript:close_jsp_preview();' class='btnone' id='a_close'><span class='del'></span>"
			+ "关闭" + "</a>";
	$(a_close).appendTo(div_buttonsytle1);
});
// 打印页面(整理)
function print_previewBaoGaoImport() {
	var pic_urls = "";
	var operateDiv = $(".operateDiv");
	var array_div = $(operateDiv)[0].children;
	for ( var i = 0; i < array_div.length; i++) {
		if (array_div[i].children.length > 0
				&& array_div[i].firstChild.tagName.toLowerCase() == "img")
			pic_urls += ($(array_div[i].children[0]).attr("src")) + ",";
	}
	var parameter_saveBaogao = {
		jcdId : jcdId,// 检查单ID
		bgys : bgys,// 报告医生
		jckj : jckj,// 检查可见
		jcts : jcts,// 检查提示
		mobanId : mobanId,// 模板ID
		pic_urls : pic_urls
	// 图片路径
	};
	var url_saveBaogao = "/publish/baogao/saveBaogao.htm";// 保存报告的方法
	var data_saveBaogao = getJSONData(url_saveBaogao, parameter_saveBaogao,
			"post");
	if (data_saveBaogao.state) {
		 $("#div_buttonsytle1").remove();// 操作按钮div
		window.print();
		window.opener.renovate_loadFinishJcdList();
		window.close();
	} else {
		$("html").css({
			height : "100%"
		});
		$("body").css({
			overflow : "hidden",
			height : "100%"
		});
		$.oimsError("检查单报告信息保存失败", close_jsp_preview);
	}
}
// 关闭jsp(整理)
function close_jsp_preview() {
	window.close();
}