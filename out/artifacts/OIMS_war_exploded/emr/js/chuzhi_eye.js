
/**
 * 获取眼科检查项目报价
 * @param id
 * @param eye
 * @returns {Number}
 */
function getExamEYEPrice(id, eye) {
	var price =0.0;
	var d = getJSONData(GET_EYE_JCXM_PRICE_URL, {
		eye : eye,
		jcxmId : id
	}, "POST");
	if (d.state) {
		price = d.obj;
	}
	return price;
}

/**
 * 设置检查单数据
 * @param tr
 * @param select
 * @param o
 */
function setJCDData(tr, select, o) {
	var jcd = getJCDObj(o.jcdId);
	if (jcd == null)
		return;
	$(select).data("val",jcd.yanbie).change(function(){
		var val = $(this).val();
		if(val!=$(this).data("val")){
			CHUZHI_FORM.eyeExam=false;
		}
	}).val(jcd.yanbie);
	var path = ",";
	if (jcd.leftPic != null) {
		path += jcd.leftPic;
	}
	if (jcd.rightPic != null) {
		path = jcd.rightPic + path;
	}
	tr.children("input[name=other]").val(path);
}

/**
 * 显示眼科检查提示
 * @param tr
 * @param showTag
 */
function showEYEItemInfo(tr, showTag) {
	var yanbie = tr.find("select[name=part]").val();
	var leftPicPath = tr.data("leftPicPath");
	var rightPicPath = tr.data("rightPicPath");
	showLog("leftPicPath=" + leftPicPath);
	showLog("rightPicPath=" + rightPicPath);
	if ((leftPicPath != null && leftPicPath.length)
			|| (rightPicPath != null && rightPicPath.length)) {
		var ptag = $("<div />").addClass("jctsPaintTag").appendTo(showTag);
		showJCTSPaint(yanbie, tr, ptag);
	}
}

/**
 * 显示检查提示画图
 * @param tip
 * @param normalPic
 * @param showPic
 * @param showTag
 */
function showJCTSPaint(yanbie, tr, showTag) {
	var showPic = "", normalPic, tip;
	var other = tr.find("input[name=other]").val();
	if (yanbie == oimsCategory.DOUBLE_EYE) {
		showJCTSPaint(oimsCategory.RIGHT_EYE, tr, showTag);
		showJCTSPaint(oimsCategory.LEFT_EYE, tr, showTag);
		return;
	} else if (yanbie == oimsCategory.LEFT_EYE) {
		tip = "OS";
		normalPic = tr.data("leftPicPath");
		if (other.length)
			showPic = other.split(",")[1];
	} else if (yanbie == oimsCategory.RIGHT_EYE) {
		tip = "OD";
		normalPic = tr.data("rightPicPath");
		if (other.length)
			showPic = other.split(",")[0];
	} else {
		$.oimsAlert('不是定义的眼别类型！');
		return;
	}

	if (normalPic == null || !normalPic.length)
		return;
	if (!showPic.length)
		showPic = normalPic;
	var titleTag = showTag.children(".jctsPaintTitleTag");
	var init = !titleTag.length;
	if (init)
		titleTag = $("<div />").addClass("jctsPaintTitleTag").appendTo(showTag);
	var a = $("<a />").addClass(tip).data("normalPic", normalPic).data("showPic", showPic)
			.data("yanbie", yanbie).text(tip).click(
					function() {
						var a = $(this);
						showJCTSPaintBYMOVIE(tr,a);
					}).appendTo(titleTag);
	if (!init) {
		titleTag.children("a.selected").removeClass(".selected");
		showJCTSPaintBYMOVIE(tr,a);
		a.addClass("selected");
		return;
	}
	var paintDiv = $("<div />").addClass("jctsPaint").appendTo(showTag);
	jctsPaintMovie = paintDiv.paint({
		param : {
			patientId : currentVisit.huanzheId,
			jcdId : tr.find("input[name=id]").val(),
			visitId : currentVisit.id,
			jcxmId : tr.find("input[name=jcxmId]").val(),
			eye : yanbie
		},
		tip : tip,
		paintSaveUrl : contextPath + JCTS_PAINT_SAVE_URL,
		saveCallBack : saveJCTSPaintCallback,
		normalPhoto : contextPath + normalPic,
		loadImg : contextPath + showPic
	});
}

function showJCTSPaintBYMOVIE(tr,a){
	if (a.hasClass("selected"))
		return;
	a.parent().children("a.selected").removeClass(
			"selected");
	a.addClass("selected");
	jctsPaintMovie.setTip(a.text());
	var obj = {
		patientId : currentVisit.huanzheId,
		jcdId : tr.find("input[name=id]").val(),
		visitId : currentVisit.id,
		jcxmId : tr.find("input[name=jcxmId]").val(),
		eye : a.data("yanbie")
	}
	jctsPaintMovie.setParam(obj);
	jctsPaintMovie.setNormalImg(contextPath
			+ a.data("normalPic"));
	jctsPaintMovie.loadImg(contextPath
			+ a.data("showPic"));
}
/**
 * 画图保存回调入口
 * @param data
 * @param swfId
 */
function saveJCTSPaintCallback(data,swfId){
	var msg ="(#)";
	msg = msg.replace("#",data);
	var d ;
	try{
		d=eval(msg);
	}catch(e){
		$.oimsAlert(e);
	}
	setJCTSData(d.obj, swfId);
}
/**
 * 设置检查提示
 * @param d
 * @param swfId
 */
function setJCTSData(d, swfId) {
	showLog(d);
	var tr = $("form#chuzhiForm_" + CHUZHI_CATEGORY.eyeExam).find(
			"input[name=jcxmId][value=" + d.jcxmId + "]").parent();
	var tag = tr.find("input[name=other]");
	var str = tag.val();
	if (!str.length)
		str = ",";
	if (d.eye == oimsCategory.LEFT_EYE) {
		tag.val(str.split(",")[0] + "," + d.filePath);
	} else {
		tag.val(d.filePath + "," + str.split(",")[1]);
	}
	$(".jctsPaintTitleTag").children("a.selected").data("showPic", d.filePath);
	CHUZHI_FORM.eyeExam=false;
}