$(document).ready(function() {
	userData = getUserData();// userData全局变量
	config = userData.userConfig;// 用户配置信息类 全局变量
	resize();// 192.168.168.248
	getStaff();// 取得员工信息，将员工信息写入cookie
	showWelcome();
	showMenu();
	language = setLanguage(language);
	common_language = setLanguage(common_language);
	showRight();
	// $.oimsAlert("<p
	// style='font-size:18px;'>通知：医生工作站处置下的检查项目与处方的选取与删除都改为双击,有问题咨询765389</p>");
//	setTimeout(showRight,500);
	/*showTongzhi();
	showThesisPublished();
	showOperationPlanList(); */// 暂时注释主页通知、论文及手术安排
	// 禁止退格键 作用于Firefox、Opera
	document.onkeypress = banBackSpace;
	// 禁止退格键 作用于IE、Chrome
	document.onkeydown = banBackSpace;
});
var flag = false;
var currList = {};
var manager = {};
var listUrl;
var listFactor;
var pageTitle;
var mainBodyWidth;
var mainBodyHeight;
var isFormNotSubmit = false;// 处于表单未提交状态
// 检查单进行中状态
var doing = false;
var leftMenuClose = false;// 左边菜单是否关闭
var userData;
var currentStaff = JSON.parse(getCookie("staff"));// 当前员工
var config, currentBtns;
var task = {};
var skinPath = getCookie("skinPath") == undefined
		|| getCookie("skinPath") == null ? "green" : getCookie("skinPath");
var cardObj = '<object id=ReaderProMF style="display:none" classid=clsid:896D9B56-D814-473B-8FFD-2491435EC287 ><PARAM NAME="_Version" VALUE="65536"><PARAM NAME="_ExtentX" VALUE="2646"><PARAM NAME="_ExtentY" VALUE="1323"><PARAM NAME="_StockProps" VALUE="0"></OBJECT>';
var readIdentityCardHtml = "<object classid=\"clsid:E6E0A751-541A-4855-9A8D-35EB7122C950\" id=\"SynIDCard1\" codeBase=\"${pageContext.request.contextPath}/SynIDCard.CAB#version=1,0,0,1\" width=\"0\" height=\"0\">";
readIdentityCardHtml += "<param name=\"_Version\" value=\"65536\">";
readIdentityCardHtml += "<param name=\"_ExtentX\" value=\"635\">";
readIdentityCardHtml += "<param name=\"_ExtentY\" value=\"582\">";
readIdentityCardHtml += "<param name=\"_StockProps\" value=\"0\">";
readIdentityCardHtml += "</object>";

var getLanguageByIdUrl = "/publish/yuyan/findYuYanByIdAndFenLei.htm";// 获取指定ID的语言
var getPatientUrl = "/publish/patient/getPatient.htm";// 获取患者信息
var getCategoriesUrl = "/publish/oimsCategory/findCategories.htm";// 分类信息列表
var getDiseaseUrl = "/publish/oimsCategory/findCategories.htm";// 发现疾病树信息
//var getDiseaseUrl = "/publish/jibing/findDiseases.htm";// 发现疾病树信息
var hasTree = false;
var oims_currentPage=1;
document.oncontextmenu = new Function("event.returnValue=false;");

// 得到当前登录用户的基本信息，登录成功后信息保存到了session中
function getUserData() {
		var result = getJSONData("/publish/user/getUserData.htm", { tag :
		Math.random() });
	if (!result.state) {// 错误处理暂时未写
		$.oimsError(result.message);
	}
	//console.log("getUserData result = " + result);
	return result.obj;

}

function showRight(){
	showTongzhi();
	showThesisPublished();
	showOperationPlanList();
}

function getCategoryTree() {
	if (!hasTree) {
		importJS("/js/oimsCategory.config.js");
		importJS("/js/categoryTree.js");
		importCSS("/css/categoryTree.css");
		hasTree = true;
		;
	}
	return hasTree;
}

/**
 * 获取患者信息
 * 
 * @param patientQueryObj
 * @returns
 */
function getPatient(patientQueryObj) {
	var patient = getJSONData(getPatientUrl, patientQueryObj, "POST");
	return patient != null ? patient.obj : null;
}

function doctorManager() {
	if (!manager.doctor) {
		importJS("js/manager/doctor/doctorManager.js");
		manager.doctor = true;
	}
	showPatientList();
}

$(window).unload(function() {
	// alert('upload');
	// getJSONData("/publish/user/userLoginOut.htm",{tag:Math.random()},"post");
	// alert(0);
});
function showDialog() {
	var div = $("<div />").appendTo("body");
	$(div).oimsDialog({
		winType : 0,
		title : "test",
		maxButton : true,
		minButton : true,
		locked : true,
		drag : true
	});
}

function isMyGroup(staff) {
	var x = false;
	$.each(userData.staff, function(i, d) {
		if (d == staff) {
			x = true;
			return x;
		}
	});
	return x;
}
/** *************************************取得当前用户的员工信息*************************************** */
function getStaff() {
	var staffList = userData.staff;// 员工信息集合
	if (staffList.length > 0
			&& (currentStaff == undefined || currentStaff == null || !isMyGroup(currentStaff))) {
		currentStaff = staffList[0];
		$.cookie("staff", currentStaff, {
			expires : 1
		});
	}
}
/** *************************************取得当前用户的员工信息*************************************** */
// 显示欢迎信息
function showWelcome() {
	var welcomeStr = "";// 欢迎词
	var salutation = "";// 欢迎
	var workSpaceName = "";// 工作台名字
	if (config == null) {
		// welcomeStr =
		// getJSONData(getLanguageByIdUrl,{id:language.welcomeStrId}).obj;
		// workSpaceName =
		// getJSONData(getLanaguageByIdUrl,{id:language.workSpace}).obj;
	} else {
		switch (config.xslx) {
		case 0:
			salutation = currentStaff.xingming + "(" + currentStaff.zhiwu + ")";// 姓名+职务
			break;
		case 1:
			salutation = userData.uid + "(" + currentStaff.xingming + ")";// 用户名+姓名
			break;
		case 2:
			salutation = currentStaff.xingming + "(" + currentStaff.gonghao
					+ ")";// 姓名+工号
			break;
		default:
			salutation = userData.uid + "(" + userData.gonghao + ")";// 用户名+工号
		}
		if (config.hyc != null)
			welcomeStr = config.hyc;// 欢迎词
		if (config.gzt != null)
			workSpaceName = config.gzt;// 工作台
	}
	var target = $(".header-main .user");
	var dt = $("<dt class='xx'/>").appendTo(target);
	var ygdata = getJSONData("/publish/yuangong/findYuangongByGonghao.htm", {
		tag : Math.random()
	}, "post");
	if (ygdata.state) {
		var yg = ygdata.obj;
		if (yg.photo != null && yg.photo != "") {
			$("<img/>").attr("src", contextPath + yg.photo).appendTo(dt);
		} else {
			$("<img/>").attr("src", "../tbyf/images/hbszyy-pic-name.png")
					.appendTo(dt);
		}

	} else {
		$("<img/>").attr("src", "../tbyf/images/hbszyy-pic-name.png").appendTo(
				dt);
	}
	var dd = $("<dd  class='xx' />").appendTo(target);
	$("<p />").text(currentStaff.xingming + " " + welcomeStr).appendTo(dd);
	// $("<p />").text(salutation).appendTo(dd);
	if (config != null && !config.xssj) {
		$("<p />").addClass("time").appendTo(dd);
	} else {
		showTime(dd);
	}
	$("#content .left .menu .modulertitle").text(workSpaceName);
	// 显示header
	$("#header").show();
}

function showTime(dd) {
	var p = $("p.time");
	if (!p.length) {
		p = $("<p />").addClass("time").appendTo(dd);
	}
	setInterval(function() {
		p.text(getAllDate());
	}, 1000);
}

$(window).resize(function() {
	resize();
});

/**
 * ***********************************************动态计算div
 * begin**************************************************
 */
function resize() {
	var bannerHeight = $("#header").outerHeight();
	var bottomHeight = $("#footer").outerHeight();
	var winHeight = $(window).height();
	var bodyHeight = winHeight - bannerHeight - bottomHeight;
	$("#content").height(bodyHeight);

	var marginTop = ($(".content").height() - $(".welcomefont").height()) / 2;
	/* $(".welcomebg").height($(".content").height()).css("overflow", "hidden"); */
	$(".welcomefont").css("margin-top", marginTop / 2 - 20 + "px");

	mainBodyHeight = bodyHeight;

	var h0 = $(".menu .down").outerHeight();// 删除
	var h1 = $(".menu .up").outerHeight();// 删除
	var h2 = $(".menu .wel").outerHeight();// 删除
	var h3 = $(".menu .modulertitle").outerHeight();
	$(".menu .nav").height(bodyHeight - h3);

	$(".left .narrow").height(bodyHeight);
	var c = $(".left .narrow span");
	var h = (bodyHeight - c.height()) / 2;
	c.css({
		"margin-top" : h
	});
	c.click(function() {
		var cw = $(".left").width() - c.width();

		if (leftMenuClose) {
			$(".left").css("margin-left", 0);
			$(".right").css({
				"width" : $(".right").width() - cw,
				"margin-left" : $(".left").width()
			});
			leftMenuClose = false;
		} else {
			$(".left").css("margin-left", -cw);
			$(".right").css({
				"width" : $(".right").width() + cw,
				"margin-left" : c.width()
			});
			leftMenuClose = true;
		}
	});
}
/**
 * ***********************************************动态计算div
 * end**************************************************
 */
function menuScroll(way, timeNum) {
	var timeSpeed = 300;
	if (timeNum) {
		timeSpeed = timeNum;
	}
	var h0 = $(".nav").height();
	var h1 = $(".nav").children().height();
	if (h0 >= h1)
		return;
	var m = $(".nav").children();
	var h = m.css("margin-top");
	if (h == undefined) {
		h = 0;
	} else if (h.length > 2) {
		if (h.substring(h.length - 2, h.length) == "px") {
			h = eval('(' + h.substring(0, h.length - 2) + ')');
		}
	}
	var t;
	way ? t = h - h0 : t = h + h0;
	if (t < h0 - h1)
		t = h0 - h1;
	if (t > 0)
		t = 0;
	// alert(t);
	m.animate({
		"margin-top" : t
	}, timeSpeed);
}

function menuScroll1(way) {
	var h0 = $(".nav").height();
	var h1 = $(".nav").children().height();
	if (h0 >= h1)
		return;
	var m = $(".nav").children();
	var h = m.css("margin-top");
	if (h == undefined) {
		h = 0;
	} else if (h.length > 2) {
		if (h.substring(h.length - 2, h.length) == "px") {
			h = eval('(' + h.substring(0, h.length - 2) + ')');
		}
	}
	// var t;
	if (way) {
		if (h > h0 - h1) {
			h = h - parseInt($(".nav ul li")[0].offsetHeight);
		} else {
			h = h0 - h1;
		}
	} else {
		if (h < 0) {
			h = h + parseInt($(".nav ul li")[0].offsetHeight);
		} else {
			h = 0;
		}
	}
	// alert(t);
	m.css("margin-top", h);
}

function showMenu() {
	importJS("/js/jquery.mousewheel.js");
	var menuObj = userData.menuData;
	$(".nav").css("overflow", "hidden").menu({
		menuData : menuObj
	});
	$(".up").click(function() {
		menuScroll1(true);
	});
	$(".down").click(function() {
		menuScroll1(false);
	});
	$(".nav").mousewheel(function(e) {
		var down = false;
		if (e.originalEvent.wheelDelta) {/* ie */
			down = e.originalEvent.wheelDelta < 0 ? true : false;
		} else {
			down = e.originalEvent.detail < 0 ? false : true;
		}
		menuScroll1(down);
	});
}

/**
 * 设置语言
 */

function setLanguage(l) {
	if (l.yuyanListOnLoad != undefined)
		return l;
	var x = getJSONData("/publish/findLanaguage.htm", l, "POST");
	if (x.state) {
		l = x.obj;
	}
	return l;
}
// function setLanguage(l){
// $.each(l,function(i,d){
// var x=getJSONData(getLanguageByIdUrl,{id:d}).obj;
// $.extend(l,eval('('+"{"+i+":\""+x+"\"}"+')'));
// });
// return l;
// }

function getPageSize() {
	var h = mainBodyHeight - 78;
	return Math.floor(h / 50);
}

/**
 * 显示输入模版
 * 
 * @param t
 * @param id
 */
function showInputTemplate(t, id, func) {
	var div = $("<div />").css({
		top : t.position().top,
		left : t.position().left
	}).addClass("inputTemplateList").appendTo("body");
	var h = $("<div />").addClass("title").appendTo(div);
	var tag = $("<div />").appendTo(div);
	h.text(common_language.ShuRuMaoBanLanguage);
	$("<span />").text("X").click(function() {
		div.hide("slow", function() {
			div.remove();
		});
		if (func != undefined)
			func();
	}).appendTo(h);
	div.hide();
	var d;
	if (debug) {
		d = {
			state : 1,
			obj : [ {
				index : "aaa",
				val : "测试一下"
			}, {
				index : "bbb",
				val : "测试一下啦"
			}, {
				index : "ccc",
				val : "测试二下啦"
			} ]
		};
	} else {
		d = getJSONData(getTemplateListUrl, {
			categoryId : id,
			tag : Math.random()
		});
	}
	if (!d.state) {
		$.oimsAlert(d.message);
		return;
	}
	$.each(d.obj, function(i, x) {
		var a = $("<a />").text(x.val).appendTo(tag);
		$(a).click(function() {
			t.val(t.val() + x.val + "。");
		});
	});
	div.show("slow", function() {
		var x = 0, y = 0, c = false;
		h.mousedown(function(e) {
			c = true;
			x = e.clientX - div.offset().left;
			y = e.clientY - div.offset().top;
		});
		h.mouseup(function() {
			c = false;
		});
		h.mousemove(function(e) {
			if (!c)
				return;
			var cx = e.clientX - x;
			var cy = e.clientY - y;
			if (cx + div.outerWidth() > $(window).width()
					|| cx + div.outerWidth() < 0)
				return;
			if (cy + div.outerHeight() > $(window).height()
					|| cy + div.outerHeight() < 0)
				return;
			div.css({
				top : cy,
				left : cx
			});
		});
	});
	if (div.offset().top + div.outerHeight() > $(window).height())
		div.css("overflow", "auto").height(
				$(window).height() - div.offset().top - 20);
}
/**
 * 显示标题
 * 
 * @param title
 */
function showTitle(title) {
	$(".right").text("");
	var t = $("<div />").addClass("title").appendTo(".right");
	var t1 = $("<div />").addClass("titleT").text(title).appendTo(t);
	$("<span />").addClass("title1").prependTo(t1);
	$("<div />").addClass("sum").appendTo(t);
	// $("title").text("OIMS-"+title);
	document.title = "OIMS-" + title;
}
function updateUserOnline() {
	var data = getJSONData("/publish/userOnlineUpdate.htm", {
		tag : Math.random()
	});
	if (!data.state) {
		$.oimsAlert(common_language.WangLuoYiChangLanguage);
		location.href = "../login.html";
	}
}
function loginOut() {
//	debugger;
	$.oimsConfirm("确定要退出登录吗？", function() {
		var data = getJSONData("/publish/user/userLoginOut.htm", {
			tag : Math.random()
		}, "post");
		// if(data.state){
		location.href = "../login.html";
	});
	// var data = getJSONData("/publish/user/userLoginOut.htm", {
	// tag : Math.random()
	// }, "post");
	// // if(data.state){
	// location.href = "../login.html";
	// }
}
/**
 * 查看全院电子病历
 */
function showHospitalEMRPage(patientId) {
	importJS("/emr/js/zhuYuanBingLi.js");
	showQYBL(patientId);
}
/**
 * 查看门诊电子病历
 */
function showMenZhenBingPage(patientId, xingming, sex, jtdz, shouji) {
	importJS("/emr/js/menZhenBingLi.js");
	showMZBLP(patientId, xingming, sex, jtdz, shouji);
}
/**
 * 查看既往报告
 * 
 * @param patientId
 * @param div
 */
function showHospitalReportPage(patientId, div) {
	importJS("/js/manager/baogao/jiWangBaoGao.js");
	showJWResultByBinglihao(patientId, div);
}

/**
 * 显示通知
 */
function showTongzhi(tag) {
	if (tag == undefined || tag == null)
		tag = $("<div />").css("overflow", "auto").addClass("tongzhiShowDiv")
				.prependTo("#right");
	var w = tag.parent().width() / 2 - 8;
	var h = tag.parent().height() / 2 - 8;
	var p = tag.offset();
	tag.width(w).height(h).css({
		top : p.top + 2,
		left : p.left + 2
	});
	$("<div />").addClass("tongzhiShowDivBg").width(w).height(h).css({
		top : p.top + 2,
		left : p.left + 2
	}).prependTo("#right");
	$("<h1 />").text("通知").attr("style", "height:32px;").appendTo(tag);
	var ul = $("<ul />").attr("style", "margin-top:-10px;").appendTo(tag);
//	var re = getJSONData(findTongzhiUrl, {//改成异步请求getJSONDate
//		max : 10,
//		tag : Math.random()
//	}, "POST");
	sendPost(findTongzhiUrl, {//改成异步请求getJSONDate
		max : 10,
		tag : Math.random()
	}, function (re) {
	$.each(re.obj, function(i, d) {
		var li = $("<li />").attr("style", "margin-top:5px;margin-left:4px;")
				.appendTo(ul);
		$("<span />").text("[" + d.category + "]").appendTo(li);
		$("<span />").html("&nbsp;").appendTo(li);
		var a = $("<a />").attr("href", "javascript:void(0);").click(
				function() {
					showArticles("通知", d.id);
				}).text(d.title).appendTo(li);
		$("<span />").html("&nbsp;").appendTo(li);
		$("<span />").html(formatDate(d.insertTime.time)).appendTo(li);
		// console.log("d.insertTime.time:"+d.insertTime.time);
		if (!d.read) {
			var span = $("<span />").addClass("new").text("NEW").appendTo(li);
			a.click(function() {
				span.remove();
			});
		}
	});
	})
}

/**
 * 显示科研论文
 * 
 * @param tag
 */
function showThesisPublished(tag) {
	if (tag == undefined || tag == null)
		tag = $("<div />").css("overflow", "auto").addClass("tongzhiShowDiv")
				.addClass("articleShowDiv").prependTo("#right");
	var w = tag.parent().width() / 2 - 8;
	var h = tag.parent().height() / 2 - 8;
	var p = tag.offset();
	tag.width(w).height(h).css({
		top : p.top + 2,
		left : p.left + 6 + w
	});
	$("<div />").addClass("tongzhiShowDivBg").width(w).height(h).css({
		top : p.top + 2,
		left : p.left + 6 + w
	}).prependTo("#right");
	$("<h1 />").text("论文").appendTo(tag);
	var ul = $("<ul />").attr("style", "margin-top:-10px;").appendTo(tag);
//	var re = getJSONData("/publish/yuangong/findJianLiByConditon.htm", {
	sendPost("/publish/yuangong/findJianLiByConditon.htm", {		
		currentPage : 1,
		pageSize : 10,
		type : 'fblw'
	}, function (re) {
	$.each(re.list, function(i, d) {
		var li = $("<li />").attr("style", "margin-top:5px;margin-left:4px;")
				.appendTo(ul);
		$("<span />").text("[" + d.detailKind + "]").appendTo(li);
		$("<span />").html("&nbsp;").appendTo(li);
		$("<span />").text(
				"[" + (isNullNull(d.detailType) ? "其它" : d.detailType) + "]")
				.appendTo(li);
		$("<span />").html("&nbsp;").appendTo(li);
		var a = $("<a />").attr("href", "javascript:void(0);").click(
				function() {
					/* if(d.fujian)window.open(d.fujian); */
				}).text(d.project_name).appendTo(li);
		$("<span />").html("&nbsp;").appendTo(li);
		$("<span />").html(formatDate(d.finalTime.time)).appendTo(li);
	});
	})
}

function isNullNull(a) {
	if (a == "" || a == null || a == undefined) {
		return true;
	} else {
		return false;

	}
}

/**
 * 显示手术安排
 * 
 * @param tag
 */
function showOperationPlanList(tag) {
	if (tag == undefined || tag == null)
		tag = $("<div />").css("overflow", "auto").addClass("operationPlan")
				.addClass("tongzhiShowDiv").prependTo("#right");
	var w = tag.parent().width() - 12;
	var h = tag.parent().height() / 2 - 8;
	var p = tag.offset();
	tag.width(w).height(h).css({
		top : p.top + 4 + h,
		left : p.left + 2
	});

	$("<div />").addClass("tongzhiShowDivBg").width(w).height(h).css({
		top : p.top + 4 + h,
		left : p.left
	}).prependTo("#right");
	$("<h1 />").text("手术安排").appendTo(tag);
	var table = $("<table />").appendTo(tag);
	var tr = $("<tr />").appendTo(table);
	$("<th />").text("手术名称").appendTo(tr);
	$("<th />").text("患者").appendTo(tr);
	$("<th />").text("性别").appendTo(tr);
	$("<th />").text("年龄").appendTo(tr);
	$("<th />").text("临床诊断").appendTo(tr);
	$("<th />").text("主刀医生").appendTo(tr);
	$("<th />").text("预定手术时间").appendTo(tr);
	var page = 1;
	while (true) {
//		var re = getJSONData("/publish/shoushu/findOperationList.htm", {
		sendPost("/publish/shoushu/findOperationListForIndex.htm", {
			tag : Math.random(),
			currentPage : page,
			pageSize : 30,
			process : 2
		}, function (re) {
		$.each(re.list, function(i, d) {
			d = $.extend(d, {
				sex : (d.sex ? "男" : "女"),
				age : getAge(d.birthday.time),
				appointmentTime : formatDateTime(d.appointmentTime.time)
			})
			tr = $("<tr />").click(function() {
				showThisOperationPlan(d);
			}).hover(function() {
				$(this).addClass("curr");
			}, function() {
				$(this).removeClass("curr");
			}).appendTo(table);
			var td = $("<td />").appendTo(tr);
			var s = "";
			$.each(d.operationDetails, function(_i, _d) {
				if (_i > 0)
					s += "+";
				var eye = "";
				switch (_d.eyes) {
				case oimsCategory.DOUBLE_EYE:
					eye = "双眼";
					break;
				case oimsCategory.RIGHT_EYE:
					eye = "右眼";
					break;
				case oimsCategory.LEFT_EYE:
					eye = "左眼";
					break;
				}
				s += eye;
				s += _d.name;
			});
			var a = $("<a />").attr("href", "javascript:void(0);").text(s)
					.appendTo(td);
			$("<td />").text(d.patientName).appendTo(tr);
			var sex = d.sex ? "男" : "女";
			$("<td />").text(d.sex).appendTo(tr);
			$("<td />").text(d.age).appendTo(tr);
			$("<td />").text(d.medical).appendTo(tr);
			$("<td />").text(d.doctorName).appendTo(tr);
			$("<td />").html(d.appointmentTime).appendTo(tr);
			// console.log("re:"+d.read);
			/*
			 * if(!d.read){ var span = $("<span
			 * />").addClass("new").text("NEW").appendTo(td);
			 * a.click(function(){ span.remove(); }); }
			 */
		});	
		})
		page++;
		if (page > 1)
			break;		
	
	}	
}


/**
 * 显示手术安排
 * 
 * @returns
 * 
 */
function showThisOperationPlan(d) {
	importJS("/js/manager/shoushu/dataSetting.js");
	var template = common_getHtmlTemplate(contextPath
			+ "/js/manager/shoushu/template/operationAnpaiShow.html?tag="
			+ Math.random());
	$("<div />").attr("id", "operationView" + d.id).append(template)
			.oimsDialog({
				icon : "view",
				title : "手术安排查看",
				locked : true,
				width : 640,
				height : 423
			});
	var tag = $("#operationView" + d.id);
	tag.find("table").width("100%");
	var category = getOperationCategoryByValue(d.category);
	var operationNames = "";
	$.each(d.operationDetails, function(i, _d) {
		if (i > 0)
			operationNames += "+";
		operationNames += _d.name;
	});
	var isolation = d.isolation;
	if (!isolation)
		isolation = 1;
	var operationSize = getOperationSizeByValue(d.operationSize);
	var room = getOperationRoomById(d.operationRoomId);
	var a = getAnesthesiaById(d.anesthesia);
	var level = getOperationLevelByValue(d.levelFlag);
	var categoryName = getOperationCategoryByValue(d.category);
	d = $.extend(d, {
		category : category,
		operationNames : operationNames,
		categoryName : categoryName,
		isolation : isolation,
		operationSize : operationSize,
		anesthesiaName : a,
		opertionRoomName : room,
		levelFlag : level
	});
	replaceFormData(tag, d, true);
	tag.find("table").addClass("showTableData");
	$('td#tdOperationRoom').text(room);
}

// 处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
function banBackSpace(e) {
	// alert(event.keyCode)
	var ev = e || window.event;// 获取event对象
	var obj = ev.target || ev.srcElement;// 获取事件源
	var t = obj.type || obj.getAttribute('type');// 获取事件源类型
	// 获取作为判断条件的事件类型
	var vReadOnly = obj.readOnly;
	var vDisabled = obj.disabled;
	// 处理undefined值情况
	vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;
	vDisabled = (vDisabled == undefined) ? true : vDisabled;
	// 当敲Backspace键时，事件源类型为密码或单行、多行文本的，
	// 并且readOnly属性为true或disabled属性为true的，则退格键失效
	var flag1 = ev.keyCode == 8
			&& (t == "password" || t == "text" || t == "textarea")
			&& (vReadOnly == true || vDisabled == true);
	// 当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
	var flag2 = ev.keyCode == 8 && t != "password" && t != "text"
			&& t != "textarea";
	// 判断
	if (flag2 || flag1)
		event.returnValue = false;// 这里如果写 return false 无法实现效果
}
$("#content .left .menu .modulertitle")
		.click(
				function() {
					if (navigator.appName
							.indexOf('Microsoft Internet Explorer') != -1) {
						var parentWindow = window.open('index.htm', '',
								'fullscreen=0,channelmode=1,resizable=yes');// channelmode=yes,fullscreen=1,resizable=1,location=no,menubar=no,status=no,titlebar=no
						window.opener = null;
						window.open("", "_self");
						window.close();
						return;
					}
					location.href = "index.htm";
				});


//获取cookie
function getCookie(name)
{
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null) return unescape(arr[2]);
	return false;
}