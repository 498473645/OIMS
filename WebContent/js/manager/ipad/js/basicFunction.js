/*
 *梁建业 
 *主要浏览器布局问题
 */
$(function() {
	$(window).resize(function() {//当调整浏览器窗口的大小时，发生 resize 事件。
		loadResize();
	});
	loadResize();
    //$(".infolist") 弹出窗口div $(".info") 弹出窗口字体div $(".picshow") 表示图片操作放置div
	var openDiv = $(".infolist"), btnOpen = $(".info"), picShow = $(".picshow");
	isMoveShow(openDiv, btnOpen, picShow);
	// 左边功能的初始化
	$(".menucontent").css("display", "none");
	$($(".menucontent")[0]).css("display", "");
	$($(".menucontent")[1]).css("display", "");
	show();
	$(".menuTitle1")[0].className = "menuTitle";
	$(".menuTitle1")[0].className = "menuTitle";
    //当div为关闭的
	$(".menuTitle1").live("click", function() {
		show();
		$(".menucontent").css("display", "none");
		if ($(this)[0].nextElementSibling) {
			$(this)[0].nextElementSibling.style.display = "";
			$(this)[0].className = "menuTitle";
		}
	});
	//当div为打开的
	$(".menuTitle").live("click", function() {
		if ($(this)[0].nextElementSibling) {
			$(this)[0].nextElementSibling.style.display = "none";
			$(this)[0].className = "menuTitle1";
		}
	});
	// 时间栏的功能
	var ulList = $(".timetab ul li");
	var tabWidth = $(".timetab")[0].offsetWidth;
	ulInit(ulList,tabWidth);
	
	// 时间栏的效果控制
	$(".timetab ul li").click(function() {
		ulZindex(ulList);
		$(this)[0].className = "on";
		$(this).css({
			"z-index" : "9999"
		});
	});
	$(".up").click(function() {
		$(".timetab ul li:first").appendTo($(".timetab ul"));
		var ulList = $(".timetab ul li");
		ulLiControl(ulList);
		isUlShow(ulList);
	});
	$(".next").click(function() {
		$(".timetab ul li:last").insertBefore($(".timetab ul li:first"));
		var ulList = $(".timetab ul li");
		ulLiControl(ulList);
		isUlShow(ulList);
	});
	// body下面的图片功能
	$(".left").click(function() {
		$(".ulPicture ul li:first").appendTo($(".ulPicture ul"));
	});
	$(".right").click(function() {
		$(".ulPicture ul li:last").insertBefore($(".ulPicture ul li:first"));
	});
});

function loadResize() {
	var height = $(window).height() - $(".header")[0].offsetHeight- $(".footerImg")[0].offsetHeight - 10;//获取中部div的高度
	$(".leftMenu").css({"height" : height + "px"});//左面操作栏的高度
	$(".rightCon").css({"height" : height + "px"});//中部div高度
	var heightShowCanvas = height - $(".timetab")[0].offsetHeight- $(".tabinfo")[0].offsetHeight;//真正编辑区域div
	$(".picshow").css({"height" : heightShowCanvas + "px"});
}
//openDiv 弹出窗口div对象，btnOpen表示触发此事件的对象，picShow表示 主div
function isMoveShow(openDiv, btnOpen, picShow) {
	var width = openDiv[0].offsetWidth;
	openDiv.css({"right" : "-" + width + "px"});//right 属性规定元素的右边缘。该属性定义了定位元素右外边距边界与其包含块右边界之间的偏移
	btnOpen.click(function() {
		// 从数据库中获取数据
		$(this).animate({//该方法通过CSS样式将元素从一个状态改变为另一个状态。CSS属性值是逐渐改变的，这样就可以创建动画效果
			"opacity" : "0"
		}, 100, function() {
			openDiv.animate({
				"right" : "0px"
			}, "slow");
		});
	});
	picShow.click(function() {
		openDiv.animate({
			"right" : "-" + width + "px"
		}, "slow", function() {
			btnOpen.css({
				"opacity" : "1"
			}, 10);
		});
	});
}

//将所有的 $(".menuTitle") 样式设置为menuTitle1
function show() {
	var menTitleList = $(".menuTitle");
	for ( var i in menTitleList) {
		if (i <= menTitleList.length) {
			menTitleList[i].className = "menuTitle1";
		}
	}
}

function ulInit(ulList) {
	ulLiControl(ulList);
	ulZindex(ulList);
	isUlShow(ulList);
	ulList[0].className = "on";
	$(ulList[0]).css({
		"z-index" : "9999"
	});
}
function isUlShow(ulList,tabWidth) {
	if (parseInt(ulList[ulList.length - 1].style.left) + 109 < tabWidth) {
		$(".up").css("display", "none");
		$(".next").css("display", "none");
	} else {
		for ( var i = 0, length = ulList.length; i < length; i++) {
			if (parseInt(ulList[i].style.left) + 109 > tabWidth - 18) {
				$(ulList[i]).css({
					"display" : "none"
				});
			} else {
				$(ulList[i]).css({
					"display" : ""
				});
			}
		}
	}
}
function ulLiControl(ulList) {
	var left = 18;
	for ( var i = 0, length = ulList.length; i < length; i++) {
		if (i != 0) {
			left = left + 94;
			$(ulList[i]).css({
				"left" : left + "px",
				"position" : "absolute"
			});
		} else {
			$(ulList[i]).css({
				"left" : left + "px",
				"position" : "absolute"
			});
		}
	}
}
function ulZindex(ulList) {
	zIndex = 1000;
	for ( var i = 0, length = ulList.length; i < length; i++) {
		zIndex = zIndex - 10;
		$(ulList[i]).css({
			"z-index" : zIndex
		});
		$(ulList[i])[0].className = "off";
	}
}
