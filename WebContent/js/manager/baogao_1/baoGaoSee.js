function baoGaoSee(bumenId, jcxmId, jcdId, huanzheId, elementId) {
	$("#" + elementId).html("");// 清空元素内容
	var url_findBaogaoByBaogao = "/publish/baogao/findBaogaoByBaogao.htm";// 根据报告对象查询报告
	var data_findBaogaoByBaogao = getJSONData(url_findBaogaoByBaogao, {
		jcdId : jcdId,
		tag : Math.random()
	}, "post");
	if (!data_findBaogaoByBaogao.state) {
		alert("查询检查单报告信息出错");
		return;
	}
	var data_obj_findBaogaoByBaogao = data_findBaogaoByBaogao.obj;
	if (data_obj_findBaogaoByBaogao != null) {
		var url_getBaogaoMobanById = "/publish/baogaomoban/getBaogaoMobanById.htm";
		var data_getBaogaoMobanById = getJSONData(url_getBaogaoMobanById, {
			id : data_obj_findBaogaoByBaogao.mobanId,
			tag : Math.random()
		}, "post");// 报告模板对象
		if (!data_getBaogaoMobanById.state) {
			alert("查询报告模板信息出错");
			return;
		}
		var data_obj_getBaogaoMobanById = data_getBaogaoMobanById.obj;
		if (data_obj_getBaogaoMobanById == null) {
			alert("报告模板信息不存在");
			return;
		}
		var div_reportdiv = $("<div/>").attr("id", "div_reportdiv").attr(
				"class", "");// 主div
		$(div_reportdiv).appendTo("#" + elementId);
		var div_reportresult = $("<div/>").attr("id", "div_reportresult").attr(
				"class", "reportresult").appendTo(div_reportdiv);// 报告模板主DIV
		$(div_reportresult).html(data_obj_getBaogaoMobanById.moban);// 模板内容
		var url_outBaogaoHelp = "/publish/baogao/outBaogaoHelp.htm";// 查询该报告页面所有元素信息
		var patameter_outBaogaoHelp = {
			id : jcdId,// 检查单ID
			huanzheId : huanzheId,// 患者ID
			tag : Math.random()
		};
		var data_outBaogaoHelp = getJSONData(url_outBaogaoHelp,
				patameter_outBaogaoHelp, "post");
		if (!data_outBaogaoHelp.state) {
			alert("检查单基础数据初始化出错");
			return;
		}
		var data_obj_outBaogaoHelp = data_outBaogaoHelp.obj;
		initial_Baogao(data_obj_outBaogaoHelp);// 报告页面各元素赋值
		$("#jckj").val(data_obj_findBaogaoByBaogao.jckj);// 检查可见
		$("#jcts").val(data_obj_findBaogaoByBaogao.jcts);// 检查提示
		$("#jckj").attr("readonly", "readonly");// 检查可见
		$("#jcts").attr("readonly", "readonly");// 检查提示

		var url_selectBaogaoPicsByBaogaoPic = "/publish/baogaopic/selectBaogaoPicsByBaogaoPic.htm";// 根据报告图片对象查询报告图片对象集合
		var data_selectBaogaoPicsByBaogaoPic = getJSONData(
				url_selectBaogaoPicsByBaogaoPic, {
					reportId : data_obj_findBaogaoByBaogao.id,
					tag : Math.random()
				}, "post");
		if (!data_selectBaogaoPicsByBaogaoPic.state) {
			alert("报告图片信息查询出错");
			return;
		}
		var data_obj_selectBaogaoPicsByBaogaoPic = data_selectBaogaoPicsByBaogaoPic.obj;
		$
				.each(
						data_obj_selectBaogaoPicsByBaogaoPic,
						function(i, BaogaoPic) {
							var operateDiv = $(".operateDiv");
							var array_div = $(operateDiv)[0].children;
							if (array_div[i] != undefined) {
								$(array_div[i]).html("");
								var id_image = encryption();
								var clientWidth = array_div[i].clientWidth;
								var clientHeight = array_div[i].clientHeight;
								var url_getImageInfoByPath = "/publish/image/getImageInfoByPath.htm";
								var path_Image = BaogaoPic.picUrl
										.substring(BaogaoPic.picUrl
												.indexOf("/") + 1);
								path_Image = path_Image.substring(path_Image
										.indexOf("/") + 1);
								path_Image = path_Image.split("/").join("\\");
								var data_getImageInfoByPath = getJSONData(
										url_getImageInfoByPath, {
											"path_Image" : path_Image,
											"clientWidth" : clientWidth,
											"clientHeight" : clientHeight,
											tag : Math.random()
										}, "post");
								if (!data_getImageInfoByPath.state) {
									alert("图片不存在于服务器上");
									return;
								}
								var data_obj_getImageInfoByPath = data_getImageInfoByPath.obj;
								var image_div = $("<img/>")
										.attr("id", id_image)
										.attr(
												"style",
												"width:"
														+ data_obj_getImageInfoByPath.width
														+ "px;height:"
														+ data_obj_getImageInfoByPath.height
														+ "px;").attr("src",
												BaogaoPic.picUrl).attr("class",
												"class_image_div");
								$(image_div).appendTo(array_div[i]);
							}
						});

		// 操作按钮div
		var div_buttonsytle1 = $("<div/>").attr("id", "div_buttonsytle1").attr(
				"class", "buttonsytle1").attr("style",
				"width: 640px;margin: 0px auto;");// 操作按钮div
		$(div_buttonsytle1).appendTo("#body_baogao");
		var a_print = "<a href='javascript:print_previewBaoGao();' class='btnone' id='a_print'><span class='print'></span>"
				+ "打印" + "</a>";
		$(a_print).appendTo(div_buttonsytle1);
		var a_close = "<a href='javascript:close_jsp_See();' class='btnone' id='a_close'><span class='del'></span>"
				+ "关闭" + "</a>";
		$(a_close).appendTo(div_buttonsytle1);
	}
}

// 打印页面
function print_previewBaoGao() {
	$("#div_buttonsytle1").remove();// 操作按钮div
	window.print();
	window.close();
}

// 关闭(整理)
function close_jsp_See() {
	window.close();
}

// 页面首次加载(整理)
$(function() {
	baoGaoSee(bumenId, jcxmId, jcdId, huanzheId, elementId);
});