var jcjgListUrl = "/publish/jcd/getHuanzheJcjgList.htm";
var jcdateListUrl = "/publish/jcd/getHuanzheJiuzhenDateList.htm";
var jcxmListUrl = "/publish/jcd/getHuanzheJcxmByHzidList.htm";
var jcxmListBydateUrl = "/publish/jcd/getHzxxJcxmByHzidAndDateList.htm";
var getHzxinxiUrl = "/publish/huanZheXinXi/findHuanZheById.htm";
var getHzxinxiByBlhUrl = "/publish/huanZheXinXi/getHuanzhexinxiByBLH.htm";
var reportListUrl = "/publish/jcd/getHzReportList.htm";
var url_getPDFListByJcd = "/publish/jcd/getJcdPDFList.htm";
var pdfJcjgListUrl = "/publish/jcd/getHuanzhePDFJcjgList.htm";
var flash, gongge, page = 1;
var gongge = 0;
var currOldIndex = null;
var currShow = [];
var tp = 4;// 缩略图个数
var mark = true;// 是否只有访问水印图像的权限，这里应与后台交互得到当前用户权限

document.oncontextmenu = new Function("event.returnValue=false;");
document.onselectstart = new Function("event.returnValue=false;");

// 动态计算宽高(整理)
function resize() {
	var h = $(window).height() - $(".header")[0].offsetHeight
			- $(".footerImg")[0].offsetHeight - 13;// 中部DIV的高度
	$(".leftMenu").height(h);// 左面菜单栏的高度
	$(".rightCon").height(h);// 主DIV的高度
	$(".picshow").height(
			$(".content").height() - $(".timetab").height()
					- $(".tabinfo").height());// 图片显示DIV的高度
	var tw = $(window).width() - $(".left").outerWidth()
			- $(".right").outerWidth() - 40;
	$(".ulPicture").width(tw);
	tp = Math.floor(tw / 108);// 缩率图个数
}

function isInCurrShow(src) {
	var x = false;
	for (var i = 0; i < currShow.length; i++) {
		var path = currShow[i];
		if (path == src || path == src.replace("/thumb/")) {
			x = true;
		}
		if (x)
			break;
	}
	return x;
}

function clearCurrShow() {
	for (var i = 0; i < currShow.length; i++) {
		var path = currShow[i];
		var s = path.split(".");
		var ext = s[s.length - 1];
		if (ext == "flv") {
			closeFLVCallBack(path);
		}
	}
	currShow = [];
}

function deleteCurrShow(path) {
	console.dir(currShow);
	var c = [];
	for (var i = 0; i < currShow.length; i++) {
		if (currShow[i] != path) {
			c.push(currShow[i]);
		}
	}
	currShow = c;
	console.dir(currShow);
}

function getJSONData(url, data, type) {
	var value = null;
	if (type == null) {
		type = "GET";
	} else {
		type = "POST";
	}
	$.ajax({
		url : contextPath + url + "?tag=" + Math.random(),
		data : data,
		async : false,
		type : type,
		dataType : 'json',
		success : function(data) {
			value = data;
		}
	});
	return value;
}

// 显示患者的基本信息(整理)
function showHzxx() {
	if(hzid!=""){
		hzid=hzid;
	}else if(blh!=""){
		var data = getJSONData(getHzxinxiByBlhUrl, {
			binglihao : blh
		}, "POST");
		if (!data.state) {
			$.oimsAlert("无法查询到符合条件的患者");
			return;
		}
		var hzxx = data.obj;
		hzid = hzxx.id;
	}else{
		var data = getJSONData("/publish/huanZheXinXi/getOneExamedHzxx.htm", {
			tag : Math.random()
		});
		if (data.state) {
			hzid = data.obj;
		}
	}
	var hzxx = getJSONData(getHzxinxiUrl, {
		id : hzid
	}, 'post');
	if (!hzxx.state) {
		$.oimsAlert("根据ID查询患者对象出错");
		return;
	}
	hzxx = hzxx.obj;
	$("#patientname").text(hzxx.xingming);
	var xb = "女";
	if (hzxx.xingbie)
		xb = "男";
	$("#sex").text(xb);
	$("#birthday").text(formatDate(hzxx.shengri.time));
	$("#ident").text(hzxx.sfzh);
	$("#patientId").text(hzxx.binglihao);
	var yibao = "否";
	if (hzxx.yibao)
		yibao = "是";
	$("#insured").text(yibao);
}

// 显示检查单的检查结果
function showJcjg(date, jcxm) {
	var data = getJSONData(jcjgListUrl, {
		hzid : hzid,
		date : date,
		jcxmid : jcxm
	});
	if (!data.state) {
		$(".ulPicture").text("");// 缩略图DIV
		return;
	}
	var p = Math.floor(data.obj.length / tp);// 检查单图片的个数/缩率图展示个数
	if (data.obj.length % tp)
		p++;
	page = 1;
	showThumb(data);// 显示缩率图
	var nextImg = $(".right");
	$(nextImg).unbind("click");
	$(nextImg).click(function() {
		page++;
		if (page > p) {
			page = p;
			return;
		}
		showThumb(data);
	});
	var prevImg = $(".left");
	$(prevImg).unbind("click");
	$(prevImg).click(function() {
		page--;
		if (page < 1) {
			page = 1;
			return;
		}
		showThumb(data);
	});
}

function showFLV(path) {
	currShow.push(path);
	try {
		showObject(path);
	} catch (e) {
	}
}

function showFLVPlayer(path, i, li) {
	var w = 108, h = 73;
	$("<a />").width(w).height(h).attr("id", "player" + i).attr("href",
			contextPath + path).appendTo(li);
	var params = {
		allowScriptAccess : "sameDomain",
		quality : "high",
		wmode : "transparent"
	};
	var flashvars = {
		path : path,
		width : w,
		height : h,
		isShow : isInCurrShow(path)
	};
	$("#player" + i).flash({
		swf : "flvPlayer.swf",
		id : "flvPlayer" + i,
		width : w,
		height : h,
		flashvars : flashvars,
		paremeters : params
	});
}

// 显示缩率图
function showThumb(data) {
	var i = (page - 1) * tp, n = tp + i;
	$(".ulPicture").text("");
	var ul = $("<ul />").appendTo(".ulPicture");
	while (i++ < n) {
		if (i > data.obj.length)
			break;
		var li = $("<li />").appendTo(ul);
		var path = data.obj[i - 1].path;
		var ext = path.split(".")[path.split(".").length - 1].toLowerCase();
		if (ext == "flv") {
			showFLVPlayer(path, i, li);// 显示视频
		} else {
			var img = $("<img />").attr("src", path).appendTo(li);
			/** ************************************************获取图片时间************************************************** */
			var d = getJSONData("/publish/jcd/getTimeAndYb.htm", {
				url : path,
				tag : Math.random()
			}, "post");
			if (d.state) {
				zyData = d.obj;
				$(
						"<span>" + zyData.time + "<font>" + zyData.yb
								+ "</font><br>" + zyData.jcsj + "</span>")
						.appendTo(li);
			} else {
				$("<span><font></font><br></span>").appendTo(li);
			}
			/** ************************************************获取图片时间************************************************** */
			if (!isInCurrShow(path)) {
				$(img).bind("click", function() {
					setMenu();// 滑动控件重置
					showImg(this);
				});
			} else {
				$(img).bind("click", function() {
					setMenu();// 滑动控件重置
					closeImgShow(this);
				});
			}
		}
	}
	$(".ulPicture ul li img").aeImageResize({
		"width" : 108,
	});
}

// 获取该屏幕最多可以展示多少检查项目或者日期标签
function getPS() {
	var w = $(".timetab").width() - $(".timetab span").width();
	return Math.floor((w - 58 - 25) / 110);
}
// 根据实际情况判断是否显示上一页下一页标签
function getPC(data, ps) {
	var x = Math.floor(data.obj.length / ps); // 能使用几页
	if (data.obj.length % ps > 0)
		x++;
	return x;
}

// 显示患者检查单日期或者检查项目信息(整理)
function showDateList(jcxm) {
	currOldIndex = null;
	var data = getJSONData(jcdateListUrl, {
		hzid : hzid,
		jcxmid : jcxm
	});
	$(".timetab").text("");// 清空日期
	$(".tabinfo").text("");// 清空日期
	var ul = "";
	if (!data.state) {
		$(".ulPicture").text("");
		return;
	}
	var ps = getPS();
	var x = getPC(data, ps);
	var c = 1;
	var aaa = ps * (c - 1) + 1;
	if (x > 1) {// 显示下一页按钮
		var up = $("<span />").attr("id", "spanUp").addClass("up").appendTo(
				".timetab");
		ul = $("<ul />").appendTo(".timetab");
		var next = $("<span />").attr("id", "spanNext").addClass("next")
				.appendTo(".timetab");
		up.hide();
		up.click(function() {
			if (c == 2) {
				up.hide();
			}
			if (--c == x - 1) {
				next.show();
			}
			aaa = ps * (c - 1);
			showDateTag(data, ps, ul, c);
			showSecMenu(true, data.obj[aaa].jsrq);
			showJcjg(data.obj[aaa].jsrq, data.obj[aaa].jsrq.jcxmid);
			$(".timetab ul li:first").removeClass("off").addClass("on");
		});
		next.click(function() {
			if (c == 1) {
				up.show();
			}
			if (++c == x) {
				next.hide();
			}
			aaa = ps * (c - 1);
			showDateTag(data, ps, ul, c);
			showSecMenu(true, data.obj[aaa].jsrq);
			showJcjg(data.obj[aaa].jsrq, data.obj[aaa].jsrq.jcxmid);
			$(".timetab ul li:first").removeClass("off").addClass("on");
		});
	} else {
		ul = $("<ul />").appendTo(".timetab");
	}
	showDateTag(data, ps, ul, c);
}
function unShowSecMenu() {
	var h = $(".rightMenu2").height();
	$(".rightMenu2").hide();
	$("#imageViewer").attr("height", $("#imageViewer").attr("height") + h);
}
// 显示检查项目列表或者是检查时间列表
function showSecMenu(f, v) {// f为真则显示指定时间的检查项目列表，为否则显示指定项目的检查时间列表
	var data = null;
	if (f) {
		data = getJSONData("/publish/jcd/getHzxxJcxmByHzidAndDateList.htm", {
			hzid : hzid,
			date : v
		});
	} else {
		data = getJSONData("/publish/jcd/getHzxxJiuzhenDateList.htm", {
			hzid : hzid,
			jcxmid : v
		});
	}
	var div = $(".tabinfo");
	if (!div.length) {// 如果DIV为空创建DIV
		div = $("<div />").width($(".timetab").width() - 30).height(20)
				.addClass("tabinfo").insertAfter(".timetab");
		$("#imageViewer").attr("height", $("#imageViewer").attr("height"));
	} else {
		div.text("");
	}

	var ps = getPS();
	var x = getPC(data, ps);
	var c = 1;
	if (x > 1) {
		var up = $("<span />").attr("id", "spanUp").addClass("up")
				.appendTo(div);
		up.hide();
		up.click(function() {
			if (c == 2) {
				up.hide();
			}
			if (--c == x - 1) {
				next.show();
			}
			showTabInfo(data, ps, div, c, f, v);
		});
		// 遍历填充数据
		showTabInfo(data, ps, div, c, f, v);
		var next = $("<span />").attr("id", "spanNext").addClass("next")
				.appendTo(div);
		next.click(function() {
			if (c == 1) {
				up.show();
			}
			if (++c == x) {
				next.hide();
			}
			showTabInfo(data, ps, div, c, f, v);
		});
	} else {
		showTabInfo(data, ps, div, c, f, v);
	}
	div.show();
}

function showTabInfo(data, ps, div, p, x, v) {
	$(".tabinfo > a").attr("href", "#").remove();
	$(".tabinfo span[class='report']").remove();
	$(".tabinfo > div").attr("class", "pdfDiv").remove();
	if (ps > data.obj.length)
		ps = data.obj.length;
	var i = (p - 1) * ps;
	var n = 0;
	$.each(data.obj, function(z, d) {
		if (z >= i && n++ < ps) {
			var a = $("<a />").attr("href", "#").appendTo(div);
			var span = $("<span/>").addClass("text").appendTo(a);
			if (x) {
				var xmmc = d.xmmc;
				if (xmmc.length > 7) {
					xmmc = xmmc.substring(0, 6) + "...";
				}
				span.text(xmmc);// 检查项目名称
				a.click(function() {
					$(this).siblings().removeClass("on");
					$(this).addClass("on");
					showJcjg(v, d.jcxmid);
				});
				a.attr("title", d.xmmc)
				showReportList(d.jcdid, div, n);// 查看报告的操作
			} else {
				span.text(d.jsrq);// 检查日期
				a.click(function() {
					showJcjg(d.jsrq, v);
				});
				a.attr("title", d.jsrq)
				showReportList(d.jcdid, div, n);// 查看报告的操作
			}
		}
	});
}

// 动态创建患者检查日期或者检查项目(整理)
function showDateTag(data, ps, ul, p) {
	if (ps > data.obj.length)
		ps = data.obj.length;
	var i = (p - 1) * ps;
	ul.text("");
	var n = 0;
	$.each(data.obj, function(z, d) {
		if (z >= i && n++ < ps) {
			var x = data.obj.length - i - 1;
			var b = $("<li />").text(d.jsrq).appendTo(ul);
			if (currOldIndex != null && x == currOldIndex) {
				b.addClass("on");
			} else {
				b.addClass("off");
			}
			if (i == 0 && currOldIndex == null) {
				showSecMenu(true, d.jsrq);
				$(b).removeClass("off");
				$(b).addClass("on");
				currOldIndex = $(b).css("z-index");
				showJcjg(d.jsrq);
			}
			$(b).click(
					function() {
						showSecMenu(true, d.jsrq);
						$(".on").removeClass("on").addClass("off").css(
								"z-index", currOldIndex);
						$(this).removeClass("off");
						currOldIndex = $(this).css("z-index");
						$(this).addClass("on").css("z-index", data.obj.length);
						showJcjg(d.jsrq);
					});
			i++;
		}
	});
}

// 显示检查项目列表
function showJcxmList(date) {
	currOldIndex = null;
	var data = getJSONData("/publish/jcd/getHuanzheJcxmByHzidAndDateList.htm",
			{
				hzid : hzid,
				date : date
			});
	$(".timetab").text("");
	var ul = "";
	if (!data.state) {
		$(".ulPicture").text("");
		return;
	}
	var ps = getPS();
	var x = getPC(data, ps);
	var c = 1;
	if (x > 1) {// 显示下一页按钮
		var up = $("<span />").addClass("up").appendTo(".timetab");
		ul = $("<ul />").appendTo(".timetab");
		var next = $("<span />").addClass("next").appendTo(".timetab");
		up.hide();
		up.click(function() {
			if (c == 2) {
				up.hide();
			}
			if (--c == x - 1) {
				next.show();
			}
			aaa = ps * (c - 1);
			showJcxmTag(data, ps, ul, c, date);
			showSecMenu(false, data.obj[aaa].jsrq);
			showJcjg(data.obj[aaa].jsrq, data.obj[aaa].jsrq.jcxmid);
			$(".timetab ul li:first").removeClass("off").addClass("on");
		});
		next.click(function() {
			if (c == 1) {
				up.show();
			}
			if (++c == x) {
				next.hide();
			}
			aaa = ps * (c - 1);
			showJcxmTag(data, ps, ul, c, date);
			showSecMenu(false, data.obj[aaa].jsrq);
			showJcjg(data.obj[aaa].jsrq, data.obj[aaa].jsrq.jcxmid);
			$(".timetab ul li:first").removeClass("off").addClass("on");
		});
	} else {
		ul = $("<ul />").appendTo(".timetab");
	}
	showJcxmTag(data, ps, ul, c, date);
}

function showJcxmTag(data, ps, ul, p, date) {
	if (ps > data.obj.length)
		ps = data.obj.length;
	var i = (p - 1) * ps;
	ul.text("");
	var n = 0;
	$.each(data.obj, function(z, d) {
		if (z >= i && n++ < ps) {
			var x = data.obj.length - i - 1;
			var xmmc = d.xmmc;
			if (xmmc.length > 6) {
				xmmc = xmmc.substring(0, 5) + "...";
			}
			var b = $("<li />").attr("title", d.xmmc).text(xmmc).appendTo(ul);
			if (currOldIndex != null && x == currOldIndex) {
				b.addClass("on");
			} else {
				b.addClass("off");
			}
			if (i == 0 && currOldIndex == null) {
				showSecMenu(false, d.id);
				$(b).removeClass("off");
				$(b).addClass("on");
				currOldIndex = $(b).css("z-index");
				showJcjg(date, d.id);
			}
			$(b).click(
					function() {
						showSecMenu(false, d.id);
						$(".on").removeClass("on").addClass("off").css(
								"z-index", currOldIndex);
						$(this).removeClass("off");
						currOldIndex = $(this).css("z-index");
						$(this).addClass("on").css("z-index", data.obj.length);
						showJcjg(date, d.id);
					});
			i++;
		}
	});
}

function showSWF() {
	var params = {
		allowFullScreen : true,
		allowScriptAccess : "sameDomain",
		quality : "high",
		wmode : "transparent"
	};
	var w = $(".picshow").width();
	var h = $(".picshow").height();
	var flashvars = {};
	$(".picshow").flash({
		swf : "ImageViewer.swf",
		id : "imageViewer",
		wmode : "transparent",
		width : w - 40, // Recommended
		height : '100%', // Recommended
		flashvars : flashvars, // Optional
		allowFullScreen : true,
		paremeters : params
	});
	$(".picshow").height($("#imageViewer").height());
	$(".picshow").width($("#imageViewer").width());
	flash = thisMovie("imageViewer");
}
// 亮度的滑动控件(整理)
function showLiangdu() {
	$("#jbtz").text("");
	$("<span>" + "亮度" + "</span>").appendTo("#jbtz");
	var li = $("<li />").appendTo($("<ul />").appendTo("#jbtz"));
	var div = $("<div/>").appendTo(li);
	$(div).slider({
		min : -255,
		max : 255,
		value : 0
	});
	$(".slider-inner a:eq(0)").click(function() {
		var val = $(".slider-value:eq(0)").val();
		flash.colorMatrix(1, val);
	});
}
// 对比度的滑动控件(整理)
function showDuibidu() {
	$("<span>" + "对比度" + "</span>").appendTo("#jbtz");
	var li = $("<li />").appendTo($("<ul />").appendTo("#jbtz"));
	var div = $("<div />").appendTo(li);
	$(div).slider({
		min : 0,
		max : 255,
		value : 127.5
	});

	$(".slider-inner a:eq(1)").click(function() {
		var val = $(".slider-value:eq(1)").val();
		flash.colorMatrix(2, val);
	});

}
// 饱和度滑动控件(整理)
function showBaohedu() {
	$("<span>" + "饱和度" + "</span>").appendTo("#jbtz");
	var li = $("<li />").appendTo($("<ul />").appendTo("#jbtz"));
	var div = $("<div />").appendTo(li);
	$(div).slider({
		min : 1,
		max : 100,
		value : 50
	});
	$(".slider-inner a:eq(2)").click(function() {
		var val = $(".slider-value:eq(2)").val();
		flash.colorMatrix(2, val);
	});
}
// 色相滑动控件(整理)
function showSexiang() {
	$("#sxtz").text("");
	var li = $("<li />").appendTo($("<ul />").appendTo("#sxtz"));
	$("<span />").text("R:").appendTo(li);
	var div_r = $("<div />").appendTo(li);
	$(div_r).slider({
		min : -255,
		max : 255,
		value : 0
	});
	$(".slider-inner a:eq(3)").click(function() {
		var val = $(".slider-value:eq(3)").val();
		flash.sexiang(0, val);
	});
	var li_g = $("<li />").appendTo($("<ul />").appendTo("#sxtz"));
	$("<span />").text("G:").appendTo(li_g);
	var div_g = $("<div />").appendTo(li_g);
	$(div_g).slider({
		min : -255,
		max : 255,
		value : 0
	});
	$(".slider-inner a:eq(4)").click(function() {
		var val = $(".slider-value:eq(4)").val();
		flash.sexiang(1, val);
	});
	var li_b = $("<li />").appendTo($("<ul />").appendTo("#sxtz"));
	$("<span />").text("B:").appendTo(li_b);
	var div_b = $("<div />").appendTo(li_b);
	$(div_b).slider({
		min : -255,
		max : 255,
		value : 0
	});
	$(".slider-inner a:eq(5)").click(function() {
		var val = $(".slider-value:eq(5)").val();
		flash.sexiang(2, val);
	});
}

// 比较两宫格，四宫格(整理)
function showBijiao() {
	if ($("#huabi").css("display") == "none") {
		comparePic("compare", "fgCompare");
	} else if ($("#fgCompare").css("display") == "none"
			&& $("#huabi").css("display") == "block") {
		comparePic("pen", "huabi");
		comparePic("compare", "fgCompare");
	}
	if ($("#huabi").css("display") == "none") {
		penEnabled = false;
		flash.penEnable(false);
	}

}

function initHuabiSize() {
	var huabiSize = $("#huabiSize").val();
	flash.setPenSize(huabiSize);
}

var huaBi_t_f;
function minusHuabiSize() {
	var huabiSize = $("#huabiSize").val();
	if (huabiSize > 0) {
		huabiSize = eval(huabiSize) - 1;
		$("#huabiSize").val(huabiSize);
		flash.setPenSize(huabiSize);
	}
	huaBi_t_f = setInterval(function() {
		var huabiSize = $("#huabiSize").val();
		if (huabiSize > 0) {
			huabiSize = eval(huabiSize) - 1;
			$("#huabiSize").val(huabiSize);
			flash.setPenSize(huabiSize);
		}
	}, 300);
}

function addHuabiSize() {
	var huabiSize = $("#huabiSize").val();
	if (huabiSize < 50) {
		huabiSize = eval(huabiSize) + 1;
		$("#huabiSize").val(huabiSize);
		flash.setPenSize(huabiSize);
	}
	huaBi_t_f = setInterval(function() {
		var huabiSize = $("#huabiSize").val();
		if (huabiSize < 50) {
			huabiSize = eval(huabiSize) + 1;
			$("#huabiSize").val(huabiSize);
			flash.setPenSize(huabiSize);
		}
	}, 300);
}

function kongHuabisize() {
	clearInterval(huaBi_t_f);
}

/**
 * 定义画笔使用
 */
var penEnabled = false;
function showHuabi() {
	initHuabiSize();
	if ($("#fgCompare").css("display") == "none") {
		comparePic("pen", "huabi");
	} else if ($("#huabi").css("display") == "none"
			&& $("#fgCompare").css("display") == "block") {
		comparePic("pen", "huabi");
		comparePic("compare", "fgCompare");
	}
	if ($("#huabi").css("display") == "block") {
		penEnabled = true;
		flash.penEnable(true);
	} else {
		penEnabled = false;
		flash.penEnable(false);
	}
}
/**
 * 定义画笔颜色
 * 
 * @param color
 */
function setPenColor(color) {
	if (color == '0x000000') {
		$("#black").removeClass().addClass("black selectd");
		$("#red").removeClass().addClass("red");
		$("#green").removeClass().addClass("green");
	} else if (color == '0xff0000') {
		$("#red").removeClass().addClass("red selectd");
		$("#black").removeClass().addClass("black");
		$("#green").removeClass().addClass("green");
	} else if (color == '0x00ff00') {
		$("#green").removeClass().addClass("green selectd");
		$("#black").removeClass().addClass("black");
		$("#red").removeClass().addClass("red");
	}
	flash.setPenColor(color);
}
/**
 * 反转颜色
 */
function fense() {
	flash.fanse();
}
/**
 * 去色
 */
var rColorFlag = false;
function removeColor() {
	if (!rColorFlag) {
		rColorFlag = true;
		flash.removeColor();
		$(".disc").parent().addClass("visited");
	} else {
		rColorFlag = false;
		flash.reset();
		$(".disc").parent().removeClass("visited");
	}
}

function thisMovie(movieName) {
	if (navigator.appName.indexOf("Microsoft") != -1) {
		return window[movieName];
	} else {
		return document[movieName];
	}
}
function closeFLVShow(src) {
	flash.closeImg(src);
	closeFLVCallBack(src);
}
function closeFLVCallBack(src) {
	deleteCurrShow(src);
	showTopBottomMenu();
	var aEle = $("a[href*='" + src + "']");
	var id = aEle.children().attr("id");
	if (id != undefined && id != "")
		thisMovie(id).playMovie();
}

function closeImg(src) {
	var i = src.lastIndexOf("/");
	var f = src.substring(0, i);
	var n = src.substring(i);
	var ext = n.split(".")[n.split(".").length - 1];
	if (ext == "flv") {
		closeFLVCallBack(src);
		return;
	}
	var path = f + "/thumb" + n;
	closeAfter(path);
}

function closeAfter(path) {
	deleteCurrShow(path);
	var img = $("li img[src=\""+path+"\"]");
	if(!img.length)return;
	img.parent().removeClass("imgborder");
	img.unbind("click").bind("click", function() {
		showImg($(this));
	});
	showTopBottomMenu();
}

function closeImgShow(img) {
	var path = $(img).attr("src");
	if (!isInCurrShow(path))
		return;
	path = path.replace(/\/thumb\//, "\/");
	flash.closeImg(path);
	closeImg(path);
}

function showImg(img) {
	var path = $(img).attr("src");
	if (isInCurrShow(path))
		return;
//	currShow.push(path);
	$(img).unbind("click");
	$(img).bind("click", function() {
		closeImgShow(this);
		showTopBottomMenu();
	});
	$(img).parent().addClass("imgborder");

	path = path.replace(/\/thumb\//, "\/");
	showObject(path);
	hideTopBottomMenu();
}
/**
 * 比较显示宫格数
 * 
 * @param x
 * @param o
 */
function showGongge(x, o) {
	clearCurrShow();
	var img = $(".ulPicture ul li img");
	img.unbind("click");
	if (gongge == x) {
		flash.unShowXBox();
		gongge = 0;
		img.bind("click", function() {
			showImg(this);
		});
		return;
	}
	flash.showXBox(x);
	img.bind("click", function() {
		showImg(this);
	});
	gongge = x;
}

// 基本调整，色调调整，高级调整等滑动控件初始化(整理)
function setMenu() {
	showLiangdu();// 亮度调整
	showDuibidu();// 对比度
	showBaohedu();// 饱和度
	showSexiang();// 色相调整
	showDaXiao();// 图片大小滑动条
}

function resetPic() {
	flash.reset();
}

var tmpVal = 0;
function showDaXiao() {
	$(".zoomt").html("");
	var li = $("<li />").appendTo($("<ul />").appendTo(".zoomt"));
	var div = $("<div />").appendTo(li);
	$(div).slider({
		min : 0,
		max : 100,
		value : 0
	});

	$(".slider-inner a:eq(6)").click(function() {
		var val = $(".slider-value:eq(6)").val();

		if (val < tmpVal) {
			flash.zoomIt(false); //
			if (val > 0) {
				var resultVal = parseInt(val) - 6;
				tmpVal = resultVal;
				$(".slider-value:eq(6)").val(resultVal);
				$(".zoomt .slider-handle").css("left", resultVal + "px");
			}
		} else {
			flash.zoomIt(true);
			if (val < 100) {
				var resultVal = parseInt(val) + 6;
				tmpVal = resultVal;
				$(".slider-value:eq(6)").val(resultVal);
				$(".zoomt .slider-handle").css("left", resultVal + "px");
			}
		}
	});
}
/**
 * 缩小
 */
function reducePic() {
	flash.zoomIt(false);
	var val = $(".slider-value:eq(6)").val();
	if (val > 0) {
		var resultVal = parseInt(val) - 6;
		tmpVal = resultVal;
		$(".slider-value:eq(6)").val(resultVal);
		$(".zoomt .slider-handle").css("left", resultVal + "px");
	}

}
/**
 * 放大
 */
function enlargePic() {
	flash.zoomIt(true);
	var val = $(".slider-value:eq(6)").val();
	if (val < 100) {
		var resultVal = parseInt(val) + 6;
		tmpVal = resultVal;
		$(".slider-value:eq(6)").val(resultVal);
		$(".zoomt .slider-handle").css("left", resultVal + "px");
	}
}
/**
 * 左旋
 */
function leftRotate() {
	flash.rotateIt(-90);
}

/**
 * 左旋
 */
function rightRotate() {
	flash.rotateIt(90);
}
function initCorners() {
	var setting = {
		tl : {
			radius : 10
		},
		tr : {
			radius : 10
		},
		bl : {
			radius : 10
		},
		br : {
			radius : 10
		},
		antiAlias : true
	};
	curvyCorners(setting, ".leftmenubg");
}
var pdfFag;
var reportFag;
// 显示检查单报告(整理)检查单id 和 tabinfo
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
	var span = $("<span/>").addClass("report").appendTo(tag);
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
	//
	var position = span.position();
	var left = position.left;
	if (left + 100 > $(".timetab").width())
		left = $(".timetab").width() - 105;
	// console.log(position.left);
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
			readOIMSReport(jcd);
		});
	}
}
// 查看本地系统报告
function readOIMSReport(jcd) {
	importJS("/js/manager/baogao/baogaoController.js");
	initCssAndJs_baogaoAll();
	seeReportButUpdate(jcd)
	// var url_findBaogaoMobansByBaogaoMoban =
	// "/publish/baogaomoban/findBaogaoMobansByBaogaoMoban.htm";//
	// 根据报告模板对象查询报告模板
	// var data_obj_findBaogaoMobansByBaogaoMoban = getJSONData(
	// url_findBaogaoMobansByBaogaoMoban, {
	// bumenId : jcd.jcksId,// 检查科室ID
	// jcxmIds : jcd.jcxmIds,// 检查项目ID
	// tag : Math.random()
	// }, "post").obj;// 报告模板对象
	// var baogaoMoban_jcd = null;
	// if (data_obj_findBaogaoMobansByBaogaoMoban != null
	// && data_obj_findBaogaoMobansByBaogaoMoban.length != 0) {
	// baogaoMoban_jcd =
	// data_obj_findBaogaoMobansByBaogaoMoban[data_obj_findBaogaoMobansByBaogaoMoban.length
	// - 1];
	// }
	// if (baogaoMoban_jcd == null) {
	// $.oimsAlert("未配置报告模板");
	// return;
	// }
	//	
	// var parameter = {
	// jcd : jcd,
	// baogaomoban:data_obj_findBaogaoMobansByBaogaoMoban
	// };
	//	
	// parameter = JSON.stringify(parameter);
	//	
	// var div_reportdiv = "<div id='div_reportdiv'
	// style='overflow-x:hidden;overflow-y:hidden;'>" +
	// "<div class='reportresult'>" +
	// baogaoMoban_jcd.moban +
	// "</div>" +
	// "</div>";
	// importJS("/js/manager/baogao/baogaoController.js");
	// initCssAndJs_baogaoAll();
	// reportController(jcd.jcxmIds)

	// // div_reportdiv = JSON.stringify(div_reportdiv);
	// var printWindow = window.open("");
	// var html_baogao = "";
	// html_baogao += "<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01
	// Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'>";
	// html_baogao += "<html>";
	// html_baogao += "<head>";
	// html_baogao += "<meta http-equiv='Content-Type' content='text/html;
	// charset=UTF-8'>";
	// html_baogao += "<title>报告预览</title>";
	// html_baogao += "<script language='javascript'> var contextPath='"
	// + contextPath + "';</script>";
	// html_baogao += "<link rel='stylesheet' type='text/css' href='"
	// + contextPath + "/css/main.css' rel='stylesheet' type='text/css'>";
	// html_baogao += "<link rel='stylesheet' type='text/css' href='"
	// + contextPath
	// + "/style/green/css/green.css' rel='stylesheet' type='text/css'>";
	// html_baogao += "<link rel='stylesheet' type='text/css' href='"
	// + contextPath + "/css/icon.css' rel='stylesheet' type='text/css'>";
	// html_baogao += "<link rel='stylesheet' type='text/css' href='"
	// + contextPath
	// + "/style/green/css/openWin.css' rel='stylesheet' type='text/css'>";
	// html_baogao += "<script src='" + contextPath
	// + "/js/jquery.min.js'></script>";
	// html_baogao += "<script src='" + contextPath +
	// "/js/common.js'></script>";
	// html_baogao += "<script src='" + contextPath
	// + "/js/jquery.oimsDialog.js'></script>";
	// html_baogao += "<script src='" + contextPath+
	// "/js/manager/baogao/language.config.js'></script>";
	// html_baogao += "<script src='" + contextPath+
	// "/js/manager/baogao/initialBaoGao.js'></script>";
	// html_baogao += "<script src='" + contextPath+
	// "/js/oimsCategory.config.js'></script>";
	// html_baogao += "<script src='" + contextPath+ "/js/common.js'></script>";
	// html_baogao += "<script src='" +
	// contextPath+"/picbrowser/js/reportPreview.js' charset='UTF-8'></script>";
	// html_baogao += "<script type='text/javascript'>";
	// html_baogao += "var parameter="
	// + parameter + ";";
	// html_baogao += "</script>";
	// html_baogao += "</head>";
	// html_baogao += "<body id='body_baogao' text-align='center'>";
	// html_baogao += div_reportdiv;
	// html_baogao += "</body>";
	// html_baogao += "</html>";
	// printWindow.document.write(html_baogao);
	// printWindow.document.close();
}

function showObject(path) {
	$(".picshow").flash(function() {
		this.showDisplayObject(path);
	});
}

// 请输入病历号或者卡号文本控件失去焦点的方法(整理)
function initHzid() {
	$("#search").click(function() {
		clearInitQuery(this);
	});
	$("#search").blur(function() {
		if (this.value == "") {
			$("#search").val("请输入病历号或者卡号");
		}
	});
}

function searchHuanZhe(field) {
	if (event.keyCode == 13) {
		var blh = field.value;
		if (blh != "") {
			var data = getJSONData(getHzxinxiByBlhUrl, {
				binglihao : blh
			}, "POST");
			if (!data.state) {
				$.oimsAlert("没有查询到符合条件的患者");
				return;
			}
			var hzxx = data.obj;
			hzid = hzxx.id;
			initBaseInfo();
		}

	}
};

function findHuanZhe() {
	var blh = $("#search").val();
	if (blh != "") {
		var data = getJSONData(getHzxinxiByBlhUrl, {
			binglihao : blh
		}, "POST");
		if (!data.state) {
			$.oimsAlert("无法查询到符合条件的患者");
			return;
		}
		var hzxx = data.obj;
		hzid = hzxx.id;
		initBaseInfo();
	}
}

// 分页控件的单击事件(整理)
function showHuanZhe() {
	var dataObjects = getCheckBoxValue();
	var blh = dataObjects[0].binglihao;
	if (blh != "") {
		var data = getJSONData(getHzxinxiByBlhUrl, {
			binglihao : blh
		}, "POST");
		if (!data.state) {
			$.oimsAlert("无法查询到符合条件的患者");
			return;
		}
		var hzxx = data.obj;
		hzid = hzxx.id;
		initBaseInfo();
	}
}
function readHzxx() {
	if (event.keyCode == 13) {
		var val = $("#queryHzxx").val();
		if (val.indexOf("请输入") != -1) {
			val = "";
		}
		var obj = {
			search : val
		};
		$.extend(listFactor.data, obj);
		$("#pageList").createPageList(listFactor);
	}
};
function readHzxxByClick() {
	var val = $("#queryHzxx").val();
	if (val.indexOf("请输入") != -1) {
		val = "";
	}
	var obj = {
		search : val
	};
	$.extend(listFactor.data, obj);
	$("#pageList").createPageList(listFactor);
}

// 分页显示患者信息(整理)
function showHzxxList() {
	$(".infolist").text("");
	var div = $("<div/>").addClass("searchd1").appendTo(".infolist");
	$(
			"<input type='text' id='queryHzxx' name='queryHzxx' class='searchIpnut' value='"
					+ "请输入病历号或患者姓名" + "' onkeydown='readHzxx();'/>").appendTo(
			div);
	$("<a href='javascript:readHzxxByClick();'><span></span></a>")
			.appendTo(div);

	$("#queryHzxx").click(function() {
		clearInitQuery(this);
	});

	$("#queryHzxx").blur(function() {
		if (this.value == "") {
			$("#queryHzxx").val("请输入病历号或患者姓名");
		}

	});
	listFactor = {
		listObj : [ {
			title : "序号",
			key : "paihao"
		}, {
			title : "病历号",
			key : "binglihao"
		}, {
			title : "姓名",
			key : "xingming"
		}, {
			title : "性别",
			key : "xingbie",
			func : function(value) {
				if (value)
					return "男";
				else
					return "女";

			}
		} ],
		url : contextPath
				+ "/publish/huanZheXinXi/findHuanZheToExaminedByPageList.htm",
		checkbox : true,
		single : true,
		invocationEvent : true,// 启用行选中事件
		methodName : showHuanZhe,// 触发的方法名
		method : "post",
		data : {
			currentPage : 1,
			pageSize : 8,
			tag : Math.random()
		}
	};
	var pageList = $("<div/>").attr("id", "pageList").appendTo(".infolist");
	$(pageList).createPageList(listFactor);

}

// 患者信息浮动层动态效果(整理)
function isMoveShow(openDiv, btnOpen, picShow) {
	var width = openDiv[0].offsetWidth;
	openDiv.css({
		"right" : "-" + width + "px"
	});
	btnOpen.click(function() {
		// 从数据库中获取数据
		$(this).animate({
			"opacity" : "0"
		}, 100, function() {
			openDiv.animate({
				"right" : "0px"
			}, "slow");
		});
	});
	picShow.mousedown(function() {
		openDiv.animate({
			"right" : "-" + width + "px"
		}, "slow", function() {
			btnOpen.css({
				"opacity" : "1"
			}, 10);
		});
	});
};

function clearPicShow() {
	for (var i = 0; i < currShow.length; i++) {
		var path = currShow[i];
		var s = path.split(".");
		var ext = s[s.length - 1];
		if (ext != "flv") {
			path = path.replace(/\/thumb\//, "\/");
		}
		flash.closeImg(path);
	}
	currShow = [];
}
var yp_hzid;
// 新增功能给一个可以查看全部的阅片
function showYuePian() {
	yp_hzid = hzid;
	importCSS("/flowplayer/style.css");
	importJS("/js/swfobject.js");
	importJS("/flowplayer/flowplayer-3.2.11.min.js");
	var div = $("<div style='width:100%;' />").attr("id", "showjcdDiv");
	$(div).oimsDialog({
		winType : 4,
		icon : "oufrom",
		title : "影像查看",
		drag : false,
		locked : true,
		width : "970",
		height : "600"
	});

	var showJcdTemplate = "<div class='opencontent tableinfo'>"
			+ "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='100%'>"
			+ "<tr>"
			+ "<td width='6%' align='right' nowrap>"
			+ "病例号"
			+ "：</td>"
			+ "<td width='8%'>"
			+ "<input name='binglihao' type='text' class='blurview' id='binglihao'  value='' />"
			+ "</td>"
			+ "<td width='4%' align='right' nowrap>"
			+ "姓名"
			+ "：</td>"
			+ "<td width='8%'><input name='xingming' type='text' class='blurview' id='xingming'  value='' /></td>"
			+ "<td width='4%' align='right' nowrap>"
			+ "性别"
			+ "：</td>"
			+ "<td width='4%'><input name='xingbie' type='text' class='blurview' id='xingbie'  value='' /></td>"
			+ "<td width='4%' align='right' nowrap>"
			+ "年龄"
			+ "：</td>"
			+ "<td width='6%'><input name='nianling' type='text' class='blurview' id='nianling'  value='' /></td>"
			+ "<td width='6%' align='right' nowrap>"
			+ "检查日期"
			+ "：</td>"
			+ "<td width='12%'><select name='jcrq' id='jcrq' class='blurview'></select></td>"
			+ "<td width='6%' align='right' nowrap>"
			+ "检查项目"
			+ "：</td>"
			+ "<td width='25%'><select name='jcxmmc' id='jcxmmc' class='blurview'></select></td>"
			+ "<td width='7%'><input type='button' id='change_' value='切换'/></td>"
			+ "</tr>" + "</table>" + "</div>";
	div.append(showJcdTemplate);
	$("<div/>").attr("id", "imgview").addClass("imgview").appendTo(div);
	var hzxx = getJSONData(getHzxinxiUrl, {
		id : yp_hzid
	}, 'post');
	if (!hzxx.state) {
		$.oimsAlert("根据ID查询患者对象出错");
		return;
	}
	hzxx = hzxx.obj;
	initHzxxInfo(hzxx);
	$("#binglihao").keydown(function(event) {
		if (event.keyCode == 13) {
			initHzxxInfoKeydown();
		}
	});
}
function initHzxxInfoKeydown() {
	var hzxx = getJSONData(getHzxinxiByBlhUrl, {
		binglihao : $("#binglihao").val()
	}, 'post');
	if (!hzxx.state) {
		$.oimsAlert("请确认ID号！");
		return;
	}
	hzxx = hzxx.obj;
	initHzxxInfo(hzxx);
}

// 初始化患者信息
function initHzxxInfo(hzxx) {
	if (hzxx == null) {
		$("#xingming").val("");
		$("#xingbie").val("");// 男
		$("#nianling").val("");
		$("#jcxm option").remove();
		$("#jcrq option").remove();
	} else {
		$("#xingming").val(hzxx.xingming);
		$("#xingbie").val(hzxx.xingbie ? "男" : "女");// 男
		$("#nianling").val(getAge(hzxx.shengri.time));
		yp_hzid = hzxx.id;
	}
	$("#binglihao").val(hzxx.binglihao);
	function_show_jcrq_jcxm();
}
// 显示检查项目，根据检查项目显示检查日期
function function_show_jcxm_jcrq() {
	$("#showjcdDiv table td:eq(8)").text("检查项目:");
	$("<select />").attr("id", "jcxm").appendTo(
			$("#showjcdDiv table td:eq(9)").width("25%").text(""));
	$("#showjcdDiv table td:eq(10)").text("检查日期:");
	$("<select />").attr("id", "jcrq").appendTo(
			$("#showjcdDiv table td:eq(11)").width("12%").text(""));
	$("#change_").click(function_show_jcrq_jcxm);
	var data = getJSONData(jcxmListBydateUrl, {
		hzid : yp_hzid
	});
	if (data.state) {
		$("#jcxm option").remove();
		$.each(data.obj, function(i, d) {
			$("<option value=\"" + d.jcxmid + "\">" + d.xmmc + "</option>")
					.appendTo("#jcxm");
		});
	}
	$("#jcxm").change(function() {
		function_showJcrqByJcxm();
	});
	function_showJcrqByJcxm();
}
function function_showJcrqByJcxm() {
	var data = getJSONData("/publish/jcd/getHzxxJiuzhenDateList.htm", {
		hzid : yp_hzid,
		jcxmid : $("#jcxm").val()
	});
	if (data.state) {
		$.each(data.obj, function(i, d) {
			$("#jcrq option").remove();
			$("<option />").appendTo("#jcrq");
			$("<option value=\"" + d.jsrq + "\">" + d.jsrq + "</option>")
					.appendTo("#jcrq");
		});
	}
	function_showjcjg();
	$("#jcrq").change(function() {
		function_showjcjg();
	});

}

// 显示检查日期，根据检查日期显示检查项目
function function_show_jcrq_jcxm() {
	$("#showjcdDiv table td:eq(8)").text("检查日期:");
	$("<select />").attr("id", "jcrq").appendTo(
			$("#showjcdDiv table td:eq(9)").width("12%").text(""));
	$("#showjcdDiv table td:eq(10)").text("检查项目:");
	$("<select />").attr("id", "jcxm").appendTo(
			$("#showjcdDiv table td:eq(11)").width("25%").text(""));
	$("#change_").click(function_show_jcxm_jcrq);
	var data = getJSONData(jcdateListUrl, {
		hzid : yp_hzid,
	});
	if (data.state) {
		$.each(data.obj, function(i, d) {
			$("<option value=\"" + d.jsrq + "\">" + d.jsrq + "</option>")
					.appendTo("#jcrq");
		});
	}
	function_showJcxmByJcrq($("#jcrq").val());
	$("#jcrq").change(function() {
		function_showJcxmByJcrq($("#jcrq").val());
	});
}
function function_showJcxmByJcrq(jcrq) {
	var data = getJSONData(jcxmListBydateUrl, {
		hzid : yp_hzid,
		date : jcrq
	});
	if (data.state) {
		$("#jcxm option").remove();
		$("<option />").appendTo("#jcxm");
		$.each(data.obj, function(i, d) {
			$("<option value=\"" + d.jcxmid + "\">" + d.xmmc + "</option>")
					.appendTo("#jcxm");
		});
	}
	$("#jcxm").change(function() {
		function_showjcjg();
	});
	function_showjcjg();
}
function function_showjcjg() {
	$("#imgview").text("");
	var ul = $("<ul />").appendTo($("#imgview"));
	// 获取图片和视频结果
	var data = getJSONData(jcjgListUrl, {
		hzid : yp_hzid,
		date : $("#jcrq").val(),
		jcxmid : $("#jcxm").val()
	});
	if (data.state) {
		var filelist = data.obj;
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
												+ path_relative_big
												+ "' class='oimsslide' onclick='return hs.expand(this);' > <img src='"
												+ path_relative_thumb
												+ "'/></a></li>").appendTo(ul);
							} else {
								var li = $("<li/>").appendTo(ul);
								$("<a />").attr("id", "player" + i).attr(
										"href", path_relative_thumb).attr(
										"style", "height:100%;display:block;")
										.appendTo(li);
								flowplayer("player" + i, contextPath
										+ "/flowplayer/flowplayer-3.2.15.swf");
							}

						});
	} else {
		$.oimsError("查询该检查单文件失败");
	}
	// 获取PDF文件并展示
	var PDF_data = getJSONData(pdfJcjgListUrl, {
		hzid : yp_hzid,
		date : $("#jcrq").val(),
		jcxmid : $("#jcxm").val()
	});
	if (PDF_data.state) {
		var pdfList = PDF_data.obj;
		$
				.each(
						pdfList,
						function(i, data) {
							$(
									"<li><a href='"
											+ contextPath
											+ data
											+ "' class='oimsslide' target='_black' title='PDF报告"
											+ (i + 1) + "' > <img src='"
											+ contextPath + "/images/pdf.png"
											+ "'/></a></li>").appendTo(ul);
						});
	} else {
		$.oimsError("查询该检查单文件失败");
	}
}

// jcjgListUrl 显示检查单的检查结果
// 新增功能给一个可以查看全部的阅片

// 患者检查单等基本信息初始化展示(整理)
function initBaseInfo() {
	penEnabled = false;// 画笔操作
	currOldIndex = null;
	clearPicShow();// 清空flash组件中的元素
	showHzxx();// 显示患者基本信息
	showDateList();
	timeFun();
};
function closePage() {
	window.close();
}

$(document).ready(function() {
	daping_language = setLanguage(daping_language);
	initHzid();// 请输入病历号或者卡号文本控件失去焦点的方法
	resize();// 动态计算宽高
	setMenu();// 基本调整，色调调整，高级调整等滑动控件初始化(整理)
	leftFun();// 左边工具栏点击效果(显示隐藏)
	isMoveShow($(".infolist"), $(".info"), $(".picshow"));// 患者信息浮动层动态效果
	showSWF();// 加载flash播放插件，与插件位置定位
	initBaseInfo();
	showHzxxList();// 显示患者信息列表
	$(window).resize(function() {
		resize();
	});
//	fullScreen();
	fullScreenPhoto();
});

/**
 * 执行放大
 */
function fullScreen() {
	$(this).toggle(function() {
		$(".header").hide();
		$(".thumbnail").hide();
		$(".footerImg").height($(".footerImg").height() - 130);
		resize();
		$("#fullScreen span:eq(1)").text('小屏');
	}, function() {
		$(".header").show();
		$(".thumbnail").show();
		$(".footerImg").height($(".footerImg").height() + 130);
		resize();
		$("#fullScreen span:eq(1)").text('全屏');
	});
}
var hideSign=false;
//隐藏上下菜单
function hideTopBottomMenu(){
	if(!hideSign&&currShow.length>0){
		hideSign = true;
		$(".header").hide();
		$(".thumbnail").hide();
		$(".footerImg").height($(".footerImg").height() - 130);
		resize();
	}
}

//显示上下菜单
function showTopBottomMenu(){
	if(hideSign&&currShow.length<=0){
		hideSign = false;
		$(".header").show();
		$(".thumbnail").show();
		$(".footerImg").height($(".footerImg").height() + 130);
		resize();
	}
}

function fullScreenPhoto() {
	$(".footerImg").hover(function() {
		if(hideSign){
			$(".thumbnail").show();
			$(".footerImg").height($(".footerImg").height() + 130);
			resize();
			hideSign=false;
		}
	}, function() {
		if(!hideSign&&currShow.length>0){
			$(".thumbnail").hide();
			$(".footerImg").height($(".footerImg").height() - 130);
			resize();
			hideSign=true;
		}
	});
}

/**
 * FLASH中图片加载成功回调
 * @param path
 */
function showImgComplete(path){
	var i = path.lastIndexOf("/");
	var thumbPath = path.substring(0,i)+"/thumb"+path.substring(i);
	currShow.push(thumbPath);
	$("img[src=\""+thumbPath+"\"]").parent().addClass("imgborder");
}

/**
 * FLASH中图片下一张回调
 * @param path
 */
function getNextPic(path){
	var i = path.lastIndexOf("/");
	var thumbPath = path.substring(0,i)+"/thumb"+path.substring(i);
	var p = $("img[src=\""+thumbPath+"\"]").parent().next().children("img").attr("src");
	return p.replace("/thumb","");
}

/**
 * FLASH中图片上一张回调
 * @param path
 */
function getPrevPic(path){
	var i = path.lastIndexOf("/");
	var thumbPath = path.substring(0,i)+"/thumb"+path.substring(i);
	var p = $("img[src=\""+thumbPath+"\"]").parent().prev().children("img").attr("src");
	return p.replace("/thumb","");
}