var normalDateTimeFormat="yyyy-MM-dd HH:mm:ss";
var findTongzhiUrl = "/publish/article/findMyArticles.htm";
//身份证读卡器
function readCard() {
	if (ReaderProMF.ReadCardData() == 0) {
		$("#card").val(ReaderProMF.readData);
		var result = getJSONData(getGuahaobyblhUrl, {
			blh : $("#card").val()
		});
		if (result.biaoshi == 0) {
			alert(result.message);
		} else if (result.biaoshi == 1) {
			showMainpage(result.message);
		}
	}
}
// 解析当前日期，输出结果：“2013.03.26 星期二 10:06:11”
function getAllTime() {
	var today, hour, second, minute, year, month, date;
	var strDate;
	today = new Date();
	var n_day = today.getDay();
	switch (n_day) {
	case 0:
		strDate = common_language.Sunday;
		break;
	case 1:
		strDate = common_language.Monday;
		break;
	case 2:
		strDate = common_language.Tuesday;
		break;
	case 3:
		strDate = common_language.Wednesday;
		break;
	case 4:
		strDate = common_language.Thursday;
		break;
	case 5:
		strDate = common_language.Friday;
		break;
	case 6:
		strDate = common_language.Saturday;
		break;
	case 7:
		strDate = common_language.Sunday;
		break;
	}
	year = today.getUTCFullYear();
	month = fd(today.getMonth() + 1);
	date = fd(today.getDate());
	hour = fd(today.getHours());
	minute = fd(today.getMinutes());
	second = fd(today.getSeconds());
	var thisTime = year + "." + month + "." + date + " " + strDate + " " + hour
			+ ":" + minute + ":" + second;
	function fd(d) {
		d = d + "";
		return d.length == 1 ? "0" + d : d;
	}
	return thisTime;
}


//解析当前日期，输出结果：“2013.03.26 星期二 ”
function getAllDate() {
	var today, hour, second, minute, year, month, date;
	var strDate;
	today = new Date();
	var n_day = today.getDay();
	switch (n_day) {
	case 0:
		strDate = common_language.Sunday;
		break;
	case 1:
		strDate = common_language.Monday;
		break;
	case 2:
		strDate = common_language.Tuesday;
		break;
	case 3:
		strDate = common_language.Wednesday;
		break;
	case 4:
		strDate = common_language.Thursday;
		break;
	case 5:
		strDate = common_language.Friday;
		break;
	case 6:
		strDate = common_language.Saturday;
		break;
	case 7:
		strDate = common_language.Sunday;
		break;
	}
	year = today.getUTCFullYear();
	month = fd(today.getMonth() + 1);
	date = fd(today.getDate());
	hour = fd(today.getHours());
	minute = fd(today.getMinutes());
	second = fd(today.getSeconds());
	var thisTime = year + "-" + month + "-" + date + " " + strDate;
	function fd(d) {
		d = d + "";
		return d.length == 1 ? "0" + d : d;
	}
	return thisTime;
}

// 转换日期格式
var parseDate = function(_str) {
	var _val = _str, _date = new Date(), _arr = [];
	if (!_val || _val == '') {
		return null;
	}
	_arr = _val.split('-');
	_date.setFullYear(_arr[0], _arr[1] - 1, _arr[2]);
	return _date;
}
// 获取传入日期是星期几
function getXiqiShu(x) {
	var strDate;
	var date = parseDate(x);
	var n_day = date.getDay();
	switch (n_day) {
	case 0:
		strDate = common_language.SRIndex;
		break;
	case 1:
		strDate = common_language.MIndex;
		break;
	case 2:
		strDate = common_language.TIndex;
		break;
	case 3:
		strDate = common_language.WIndex;
		break;
	case 4:
		strDate = common_language.TSIdex;
		break;
	case 5:
		strDate = common_language.FIndex;
		break;
	case 6:
		strDate = common_language.SIndex;
		break;
	case 7:
		strDate = common_language.SRIndex;
		break;
	}
	return strDate;
}

function getZhenbie(x) {
	var str;
	switch (x) {
	case 0:
		str = common_language.SubitumJizhen;
		break;
	case 1:
		str = common_language.OutpatientMenZhen;
		break;
	case 2:
		str = common_language.HospitalizedZhuYuan;
		break;
	}
	return str;
}

function showSelected(url) {
	if (doing) {
		alert(common_language.InspectionJianCha);
		return;
	}
	window.location = url;
}

function getNow() {
	var now = new Date();
	var month = now.getMonth() + 1 + "";
	var day = now.getDate() + "";
	var hour = now.getHours() + "";
	var minute = now.getMinutes() + "";
	var second = now.getSeconds() + "";
	if (month.length == 1) {
		month = "0" + month;
	}
	if (day.length == 1) {
		day = "0" + day;
	}
	if (hour.length == 1) {
		hour = "0" + hour;
	}
	if (minute.length == 1) {
		minute = "0" + minute;
	}
	if (second.length == 1) {
		second = "0" + second;
	}
	return now.getFullYear() + "-" + month + "-" + day + " " + hour + ":"
			+ minute + ":" + second;
}

function getDateNow() {
	var now = new Date();
	var month = now.getMonth() + 1 + "";
	var day = now.getDate() + "";

	if (month.length == 1) {
		month = "0" + month;
	}
	if (day.length == 1) {
		day = "0" + day;
	}

	return now.getFullYear() + "-" + month + "-" + day;
}

function getDateRandomData() {
	var now = new Date();
	var month = now.getMonth() + 1 + "";
	var day = now.getDate() + "";
	var hour = now.getHours() + "";
	var minute = now.getMinutes() + "";
	var second = now.getSeconds() + "";
	if (month.length == 1) {
		month = "0" + month;
	}
	if (day.length == 1) {
		day = "0" + day;
	}
	if (hour.length == 1) {
		hour = "0" + hour;
	}
	if (minute.length == 1) {
		minute = "0" + minute;
	}
	if (second.length == 1) {
		second = "0" + second;
	}
	return month + day + hour + minute + second;
}
// ajax请求
function getJSONData(url, data, type) {
	var value = null;
	if (type == null) {
		type = "GET";
	} else {
		type = "POST";
	}
	$.ajax({
		url : contextPath + url,
		data : data,
		async : false,// 异步 false？
		type : type,
		dataType : 'json',
		success : function(data) {
			value = data;
		}
	});
	return value;
}

//ajax请求(POST)
function sendPost(url, data, fn) {
    $.ajax({
        type: "POST",
        data: data,
        url: contextPath + url,
        dataType : 'json',
        //contentType: "application/json",
        success: function (data) {
            if (typeof fn === "function") {
                fn(data);
//                alert(data);
            }
        }
    });
}

function findSWF(movieName) {
	if (navigator.appName.indexOf("Microsoft") != -1) {
		return window[movieName];
	} else {
		return document[movieName];
	}
}

function format(date, time) {
	if (date == null || date == "")
		return "-";
	date = new Date(date.time);
	var str = date.getUTCFullYear() + common_language.YearRiQi
			+ (date.getMonth() + 1) + common_language.MonthRiQi
			+ date.getDate() + common_language.SRIndex;
	if (time != null && time)
		str += date.getHours() + common_language.ShiRiQi + date.getMinutes()
				+ common_language.FenRiQi + date.getSeconds()
				+ common_language.MiaoRiQi;
	return str;
}

function formatDateTime(datetime) {
	if (datetime == null || datetime == "")
		return "-";
	var date = new Date(datetime);
	var mounth = (date.getMonth() + 1) + "";
	if (mounth.length == 1)
		mounth = "0" + mounth;
	var day = date.getDate() + "";
	if (day.length == 1)
		day = "0" + day;
	var h = date.getHours() + "";
	if (h.length == 1)
		h = "0" + h;
	var m = date.getMinutes() + "";
	if (m.length == 1)
		m = "0" + m;
	var s = date.getSeconds() + "";
	if (s.length == 1)
		s = "0" + s;
	var str = date.getUTCFullYear() + "-" + mounth + "-" + day + " " + h + ":"
			+ m + ":" + s;
	return str;
}
function formatDateDIY(date,tag,hms){
	if (date == null || date == "")
		return "-";
	var date = new Date(date.time);
	var mounth = (date.getMonth() + 1) + "";
	if (mounth.length == 1)
		mounth = "0" + mounth;
	var day = date.getDate() + "";
	if (day.length == 1)
		day = "0" + day;
	var str = date.getUTCFullYear() + tag + mounth + tag + day;
	if(hms!=null){
		var hour = date.getHours() + "";
		var minute = date.getMinutes() + "";
		var second = date.getSeconds() + "";

		if (hour.length == 1) {
			hour = "0" + hour;
		}
		if (minute.length == 1) {
			minute = "0" + minute;
		}
		if (second.length == 1) {
			second = "0" + second;
		}
		str+=" "+hour+":"+minute+":"+second;
	}
	return str;
}
function formatDate(d) {
	if (d == null || d == "")
		return "-";
	var date = new Date(d);
	var mounth = (date.getMonth() + 1) + "";
	if (mounth.length == 1)
		mounth = "0" + mounth;
	var day = date.getDate() + "";
	if (day.length == 1)
		day = "0" + day;
	var str = date.getFullYear() + "-" + mounth + "-" + day;
	return str;
};
function getDaysEmr(ds,dd){
	var o1,o2,idays;
	o1=ds.split("-");
	o2=dd.split("-");
	var sds=new Date(o1[0],o1[1]-1,o1[2]);
	var sde=new Date(o2[0],o2[1]-1,o2[2]);
	idays=parseInt(Math.abs(sds-sde)/1000/60/60/24);
	return idays;
}

function formatTime(datetime) {
	var date = new Date(datetime);
	var h = date.getHours() + "";
	if (h.length == 1)
		h = "0" + h;
	var m = date.getMinutes() + "";
	if (m.length == 1)
		m = "0" + m;
	var s = date.getSeconds() + "";
	if (s.length == 1)
		s = "0" + s;
	var str = h + ":" + m + ":" + s;
	return str;
}

function getObjectValue(obj, key) {
	$.each(obj, function(i, d) {
		if (i === key) {
			return d;
		}
	});
}

// 浮点数加法运算
function FloatAdd(arg1, arg2) {
	var r1, r2, m;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	return (arg1 * m + arg2 * m) / m;
}

// 浮点数减法运算
function FloatSub(arg1, arg2) {
	var r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	// 动态控制精度长度
	n = (r1 >= r2) ? r1 : r2;
	return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

// 浮点数乘法运算
function FloatMul(arg1, arg2) {
	var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length;
	} catch (e) {
	}
	try {
		m += s2.split(".")[1].length;
	} catch (e) {
	}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", ""))
			/ Math.pow(10, m);
}

// 浮点数除法运算
function FloatDiv(arg1, arg2) {
	var t1 = 0, t2 = 0, r1, r2;
	try {
		t1 = arg1.toString().split(".")[1].length;
	} catch (e) {
	}
	try {
		t2 = arg2.toString().split(".")[1].length;
	} catch (e) {
	}
	with (Math) {
		r1 = Number(arg1.toString().replace(".", ""));
		r2 = Number(arg2.toString().replace(".", ""));
		return (r1 / r2) * pow(10, t2 - t1);
	}
}
var fileArray = [];
/**
 * 数组中是否存在对像
 * 
 * @param o
 *            对像
 * @param a
 *            数组
 * @author 李炎
 */
function objExists(o, a) {
	var r = false;
	for ( var i = 0; i < a.length; i++) {
		if (a[i] == o) {
			r = true;
			break;
		}
	}
	return r;
}
/**
 * 动态加载JS文件
 * 
 * @param src文件链接
 * @author 李炎
 */
function importJS(src) {
	if (objExists(src, fileArray))
		return;
	fileArray.push(src);
	$(
			"<script type = 'text/javascript' src='" + contextPath + src
					+ "?jsonsession="+Math.random()+"'><\/script>").appendTo("head");
}
/**
 * 动态加载CSS文件
 * 
 * @param src文件链接
 * @author 李炎
 */
function importCSS(src) {
	if (objExists(src, fileArray))
		return;
	fileArray.push(src);
	var styleTag = document.createElement("link");
	styleTag.setAttribute('type', 'text/css');
	styleTag.setAttribute('rel', 'stylesheet');
	styleTag.setAttribute('href', contextPath + src);
	$("head")[0].appendChild(styleTag);
	// $("<link type=\"text/css\" rel=\"stylesheet\"
	// href=\""+contextPath+src+"\" />").appendTo("head");
}

/**
 * 判断是否是日期字符串 yyyy-MM-dd
 * 
 * @param str
 * @returns boolean
 */
function isDate(str) {
	var a = /^[1-2]\d{3}-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[0-1])$/;
	return str.match(a);
}

/**
 * 日期字符串大小比较
 * 
 * @param date1[yyyy-MM-dd]
 * @param date2[yyyy-MM-dd]
 * @returns {Number}
 */
function dateCompare(date1, date2) {
	date1 = date1.replace(/\-/gi, "/");
	date2 = date2.replace(/\-/gi, "/");
	// getTime()返回当前时间距1970 年 1 月 1 日之间的毫秒数。
	var time1 = new Date(date1).getTime();
	var time2 = new Date(date2).getTime();
	if (time1 > time2) {
		return 1;
	} else if (time1 == time2) {
		return 0;
	} else {
		return -1;
	}
}

/**
 * 时间字符串大小比较
 * 
 * @param startDate[yyyy-MM-dd
 *            HH:mm:ss]
 * @param endDate[yyyy-MM-dd
 *            HH:mm:ss]
 * @returns {Number}
 */
function compareTime(startDate, endDate) {
	if (startDate.length > 0 && endDate.length > 0) {
		var startDateTemp = startDate.split(" ");
		var endDateTemp = endDate.split(" ");
		if(startDateTemp.length!=2||endDateTemp.length!=2)return false;
		var arrStartDate = startDateTemp[0].split("-");
		var arrEndDate = endDateTemp[0].split("-");
		if(arrStartDate.length!=3||arrEndDate.length!=3)return false;
		var arrStartTime = startDateTemp[1].split(":");
		var arrEndTime = endDateTemp[1].split(":");
		if(arrStartTime.length!=3||arrEndTime.length!=3)return false;

		var allStartDate = new Date(arrStartDate[0], arrStartDate[1],
				arrStartDate[2], arrStartTime[0], arrStartTime[1],
				arrStartTime[2]);
		var allEndDate = new Date(arrEndDate[0], arrEndDate[1], arrEndDate[2],
				arrEndTime[0], arrEndTime[1], arrEndTime[2]);

		if (allStartDate.getTime() >= allEndDate.getTime()) {
			return false;
		} else {
			return true;
		}
	} else {
		return false;
	}
}

function linkcard() {
	var r_card = rfid.LinkCardReader();
	if (r_card > 0) {
		return true;
	}
	return false;
}

function unlinkcard() {
	var r_card = rfid.UnlinkCardReader();
	if (r_card > 0) {
		return true;
	}
	return false;
}
// 添加右侧内容标题
function init() {

	$("#right").text("");
	$("#right").append($("<div />").addClass("title"));

	$(".title", $("#right")).append(
			$("<div />").addClass("titleT").append(
					$("<span />").addClass("title1")).append(pageTitle));
}

/**
 * @author 黄浩
 * @param set
 *            set:{ form:"jquery的form对象", beforeSubmit：需要返回 boolean，true提交请求
 *            successFn:回传两个参数-responseText, statusText, errorFn：回传三个参数-jqXHR,
 *            textStatus, errorThrown }
 */
function ajaxForm(set) {
	if (typeof (set.form) == "object") {
		if (set.form.attr("action") == undefined) {
			// alert("form #ID="+set.form.attr("id")+"\t没有action属性") ;
			return false;
		}
		if (set.form.attr("method") == undefined)
			set.form.attr("method", "post");

		set.form.ajaxForm();
		set.form
				.ajaxSubmit({
					dataType : "json",
					beforeSubmit : (typeof (set.beforeSubmit) == "function" ? set.beforeSubmit
							: function() {
								return true;
							}),
					success : (typeof (set.successFn) == "function" ? set.successFn
							: function() {
								$.oimsSucc(common_language.TiJiao_suceess);
								set.form.parent().parent().remove();
							}),
					error : (typeof (set.errorFn) == "function" ? set.errorFn
							: function(jqXHR, textStatus, errorThrown) {
								$.oimsError(textStatus + ":" + errorThrown);
							})
				});
	}
	;
}

/**
 * set:{ id:form元素id 必须, url:form元素action 必须 , width：对话窗宽, height：对话窗高
 * dialogTitle：对话窗标题, icon：对话窗标题图标 , okcls:确定按钮图标 , btnOkVal：确定按钮显示文字
 * btnOkSuccess：回传两个参数-data,responseText, statusText ,
 * btnOkError：回传三个参数-jqXHR,textStatus, errorThrown , btnOkBefor：需要返回
 * boolean，true提交请求 }, autoHeight:boolean
 */
function oimsFormWindow(set) {
//	debugger;
	var formSet = {
		id : set.id,
		action : set.url,
		method : "post"
	};
	var f = $("<form />").attr(formSet);
	f
			.oimsDialog({
				width : (set.width == undefined ? "600" : set.width),
				height : (set.height == undefined ? "auto" : set.height),
				title : (set.dialogTitle == undefined ? language.Add
						: set.dialogTitle),
				icon : (set.icon == undefined ? "add" : set.icon),
				// drag:true,
				winType : 4,
				locked : true,
				closeButton : true,
				button : [
						{
							title : (set.btnOkVal == undefined ? language.Submit
									: set.btnOkVal),
							className : (set.okcls == null ? "advsumit"
									: set.okcls),
							isCloseWin : false,
							func : function() {
								ajaxForm({
									form : $("#" + set.id),
									beforeSubmit : set.btnOkBefor,
									errorFn : set.btnOkError,
									successFn : set.btnOkSuccess
								});
							},
							isCloseWin : false
						},
						{
							title : (set.btnResetVal == undefined ? language.Reset
									: set.btnResetVal),
							func : set.resetForm,
							className : "advreset",
							isCloseWin : false
						} ]
			});
	if (set.autoHeight == undefined || set.autoHeight == true) {
		f.parent().height("auto");
		f.parent().parent().height("auto");
	}

	return f;
}

/**
 * 清空查询框中的初始化文字信息
 * 
 * @param field
 */
function clearInitQuery(field) {
	var initText = $(field).val();
	if (initText.indexOf("请输入") != -1) {
		$(field).val("");
	}
};

/*
 * 梁建业 select 选中指定值 selectId 下拉框控件的ID selectValue 下拉框需要选中的值
 */
function selectItemByValue(selectId, selectValue) {
	var objSelect = $("#" + selectId)[0];
	for ( var i = 0; i < objSelect.options.length; i++) {
		if (objSelect.options[i].value == selectValue) {
			objSelect.options[i].selected = true;
			break;
		}
	}
}

/*
 * 梁建业 checkBoxName 复选框的name checkedValue 复选框需要选中的值
 */
function checkedCheckBoxByValue(checkBoxName, checkedValue) {
	var objCheckBoxs = document.getElementsByName(checkBoxName);
	for ( var i = 0; i < objCheckBoxs.length; i++) {
		if (objCheckBoxs[i].value == checkedValue) {
			objCheckBoxs[i].checked = true;
			break;
		}
	}
}

/*
 * 梁建业 radioName 单选框的name radioValue 单选框需要选中的值
 */
function checkedRadioByValue(radioName, radioValue) {
	var objRadios = document.getElementsByName(radioName);
	for ( var i = 0; i < objRadios.length; i++) {
		if (objRadios[i].value == radioValue) {
			objRadios[i].checked = true;
			break;
		}
	}
}

/**
 * <p>
 * 字符串为null,undefined,""返回true
 * </p>
 * 
 * @param field
 * @param content
 */
function checkIsStrEmpty(field, content) {
	if (validata().isStrEmpty(field.value)) {
		if (content == null) {
			content = common_language.BuNotKong;
		}
		$("#" + field.id).attr("title", content).addClass("error1");
		return;
	}
	$("#" + field.id).removeAttr("title", content);

}

/**
 * <p>
 * 字符串为符合Email格式返回true
 * </p>
 * 
 * @param field
 * @param content
 */
function checkIsMail(field, content) {
	if (!validata().isMail(field.value)) {
		if (content == null) {
			content = common_language.EmailGeShiNO;
		}
		$("#" + field.id).attr("title", content).addClass("error1");
		return;
	}
	$("#" + field.id).removeAttr("title", content);
}
/**
 * <p>
 * 字符串为符合邮编格式返回true
 * </p>
 * 
 * @author 祝建荣
 * @param field
 * @param content
 */
function checkIsPost(field, content) {
	if (!validata().isPost(field.value)) {
		if (content == null) {
			content = common_language.EmailBianMaGeShiNo;
		}
		$("#" + field.id).attr("title", content).addClass("error1");
		return;
	}
	$("#" + field.id).removeAttr("title", content);
}
/**
 * <p>
 * 字符串为符合手机号格式返回true
 * </p>
 * 
 * @author 祝建荣
 * @param field
 * @param content
 */
function checkIsPhone(field, content) {
	if (!validata().isPhone(field.value)) {
		if (content == null) {
			content = common_language.TeleGeShiNo;
		}
		$("#" + field.id).attr("title", content).addClass("error1");
		return;
	}

	$("#" + field.id).removeAttr("title", content);
}

/**
 * <p>
 * 字符串为符合联系电话格式返回true
 * </p>
 * 
 * @author 祝建荣
 * @param field
 * @param content
 */
function checkIsTel(field, content) {
	if (!validata().isTel(field.value)) {
		if (content == null) {
			content = common_language.LianTeleGeShiNo;
		}
		$("#" + field.id).attr("title", content).addClass("error1");
		return;
	}

	$("#" + field.id).removeAttr("title", content);
}

// ------------------------------------------黄浩-------------如果改动，请在分割线下面--------------------------------------
function validata() {
	var l = {
		notNull : common_language.notNullLanguage,
		notLong : common_language.notLongLanguage,
		toLong : common_language.toLongLanguage,
		notEqLong : common_language.notEqLongLanguage
	};
	function isTel(p, msg) {
		if (p == undefined || p == "")
			return true;
		var partten = /^((0\d{2,3})(-)?)(\d{7,8})(-(\d{3,}))?$/;
		var partten2 = /^1[3|4|5|8][0-9]\d{4,8}$/;
		if (partten.test(p) || partten2.test(p)) {
			return true;
		}
		if (msg != undefined && msg != "")
			$.oimsAlert(msg);
		return false;
	}
	;
	function isPhone(p, msg) {
		if (p == undefined || p == "")
			return true;
		var partten = /^((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(147))[0-9]{8}$/;
		if (partten.test(p)) {
			return true;
		}
		if (msg != undefined && msg != "")
			$.oimsAlert(msg);
		return false;
	}
	;

	function isLeightNub(p, l) {
		if (p.leight == l)
			return true;
		else
			return false;
	}
	;
	/**
	 * @author 黄浩
	 * @param p:String
	 * @returns boolean
	 *          <p>
	 *          是数字返回true
	 *          </p>
	 */
	function isNub(p) {
		if (isNaN(p))
			return false;
		else
			return true;
	}
	;

	function isNotEmpty4EverySubmit(arIds, f) {
		var t = true;
		$.each(arIds, function(i, v) {
			if (v == undefined || v == null)
				return false;
			if ($("#" + v.id).val() == undefined || $("#" + v.id).val() == null
					|| $("#" + v.id).val() == "") {
				t = false;
				$.oimsAlert(v.lb + ":" + l.notNull);
				return false;
			}
		});
		return t;
	}
	;

	function isNotEmpty4Every(arIds, f) {
		if (f == undefined || f == null)
			f = document;
		var isEmptyValue = function(e) {
			var el = $(e.currentTarget);
			var msg = "";
			$.each(arIds, function(i, v) {
				if (v == undefined || v == null)
					return false;
				if (v.id == el.attr("id")) {
					msg = v.lb;
					return false;
				}
			});
			if (el.val() == "")
				$.oimsAlert(msg + ":" + l.notNull);

		};
		$.each(arIds, function(i, v) {
			if (v == undefined || v == null)
				return false;
			$("#" + v.id, f).focusout(isEmptyValue);
		});
	}
	;

	function length4Every(arids, f) {

		// 添加事件
		$.each(arids, function(i, v) {
			if (v == undefined)
				return false;
			$("#" + v.id, f).focusout(lengthE);
		});
		// 事件操作方法
		function lengthE(e) {
			var el = $(e.currentTarget);
			var setting = "";
			$.each(arids, function(i, v) {
				if (el.attr("id") == v.id) {
					setting = v;
					return false;
				}
			});
			var bln = true;// boolean类型标志
			var val = $("#" + setting.id, f).val().length;
			if (val == 0)
				return;
			if (isNub(setting.fh.gt)) {
				bln = val > setting.fh.gt;
				if (!bln)
					$.oimsAlert(setting.lb + "：" + l.notLong);
			}
			if (isNub(setting.fh.lt)) {
				bln = val < setting.fh.gt;
				if (!bln)
					$.oimsAlert(setting.lb + "：" + l.toLong);
			}
			if (isNub(setting.fh.eq)) {
				bln = val == setting.fh.eq;
				if (!bln)
					$.oimsAlert(setting.lb + "：" + l.notEqLong);
			}
		}
		;
	}
	;

	function length4EverySubmit(arids, f) {

		var bln = true;
		$.each(arids, function(i, v) {
			if (v == undefined)
				return false;
			var len = $("#" + v.id, f).val().length;
			if (len == 0)
				return true;
			var fh = v.fh;
			if (isNub(fh.gt)) {
				bln = len > fh.gt;
				if (!bln) {
					$.oimsAlert(v.lb + "：" + l.notLong);
					return false;
				}
			}
			if (isNub(fh.lt)) {
				bln = len < fh.lt;
				if (!bln) {
					$.oimsAlert(v.lb + "：" + l.toLong);
					return false;
				}
			}
			if (isNub(fh.eq)) {
				bln = len == fh.eq;
				if (!bln) {
					$.oimsAlert(v.lb + "：" + l.notEqLong);
					return false;
				}
			}
		});
		return bln;
	}
	;

	return {
		/**
		 * 需要什么验证
		 */
		tag : "validate",
		/**
		 * 标签
		 */
		lbl : "lbl",
		/**
		 * @author 黄浩
		 * @param p:String
		 * @returns boolean
		 *          <p>
		 *          是数字返回true
		 *          </p>
		 */
		isNub : isNub,
		/**
		 * @author 黄浩
		 * @param p:String
		 * @returns :boolean
		 *          <p>
		 *          符合email格式返回true
		 *          </p>
		 */
		isMail : function(p) {
			if (p == undefined || p == "")
				return true;
			var partten = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if (partten.test(p)) {
				return true;
			}
			return false;
		},
		/**
		 * @author 黄浩
		 * @param p1:元素1id
		 * @param p2:元素2id
		 * @returns :boolean
		 *          <p>
		 *          两个字符串相同返回true
		 *          </p>
		 */
		isValueSame : function(p1, p2) {
			return $("#" + p1).val() == $("#" + p2).val();
		},
		/**
		 * @author 黄浩
		 * @param p:String
		 * @returns :boolean
		 *          <p>
		 *          字符串为null,undefined,""返回true
		 *          </p>
		 */
		isStrEmpty : function(p) {
			if (p == null || p == undefined || p == "")
				return true;
			else
				return false;
		},
		isNotStrEmpty : function(p) {
			if (p == null || p == undefined || p == "")
				return false;
			else
				return true;
		},
		/**
		 * @author 黄浩
		 * @param p:Object
		 * @param l:长度
		 * @returns :booelan
		 *          <p>
		 *          长度是否符合，符合返回true
		 *          </p>
		 */
		isLeightNub : isLeightNub,
		/**
		 * @author 黄浩
		 * @param p:String
		 * @returns :booelan
		 *          <p>
		 *          是否符合手机格式，符合返回true
		 *          </p>
		 */
		isPhone : isPhone,
		/**
		 * @author 黄浩
		 * @param p:String
		 * @returns :boolean
		 *          <p>
		 *          是否符合电话格式，符合返回true
		 *          </p>
		 */
		isTel : isTel,
		/**
		 * @author 黄浩
		 * @param p：String
		 * @returns :boolean
		 *          <p>
		 *          是否符合邮政编码格式，符合返回true
		 *          </p>
		 */
		isPost : function(p) {
			if (p == undefined || p == "")
				return true;
			var partten = /^[0-9]{6}$/;
			if (partten.test(p)) {
				return true;
			}
			return false;
		},
		/**
		 * 
		 * @param arIds:{id:"",lb:""}
		 * @param f
		 *            :范围
		 * @returns boolean
		 *          <p>
		 *          时时校验，添加focusout()事件，数组内指定id的元素不能填空
		 *          </p>
		 */
		isNotEmpty4Every : isNotEmpty4Every,
		/**
		 * 
		 * @param arIds:{id:"",lb:""}
		 * @param f
		 *            :范围
		 * @returns boolean
		 *          <p>
		 *          提交时，数组内指定id的元素不能填空 有空值时返回false
		 *          </p>
		 */
		isNotEmpty4EverySubmit : isNotEmpty4EverySubmit,
		/**
		 * fh = "<10;>6;=7"
		 * 
		 * @param arids:[{id:"",lb:"",fh:{gt:"",lt:"",eq:""}}]
		 * @param f
		 * @returns void
		 *          <p>
		 *          时时校验，添加focusout()事件，数组内指定id的元素值的长度校验
		 *          </p>
		 */
		length4Every : length4Every,
		/**
		 * 
		 * @param arIds:[{id:"",lb:"",fh:{gt:"",lt:"",eq:""}}]
		 * @param f
		 *            :范围
		 * @returns boolean
		 *          <p>
		 *          提交时，数组内指定id的元素值的长度校验 有不满足时，返回false
		 *          </p>
		 */
		length4EverySubmit : length4EverySubmit
	};
};
/**
 * 页面元素常用方法
 */
function utilTool() {
	/**
	 * 页面元素可用
	 * 
	 * @param je
	 */
	function fundisabled(je) {
		$.each($("input", je), function(i, v) {
			$(v).attr("disabled", false);
		});
		$.each($("select", je), function(i, v) {
			$(v).attr("disabled", false);
		});
		$.each($("textarea", je), function(i, v) {
			$(v).attr("disabled", false);
		});
	}
	;
	/**
	 * 页面元素不可用
	 * 
	 * @param je
	 */
	function fdisabled(je) {
		$.each($("input", je), function(i, v) {
			$(v).attr("disabled", "disabled");
		});
		$.each($("select", je), function(i, v) {
			$(v).attr("disabled", "disabled");
		});
		$.each($("textarea", je), function(i, v) {
			$(v).attr("disabled", "disabled");
		});
	}
	;
	/**
	 * 列表中选中的是否是一条数据
	 * 
	 * @returns obj
	 */
	function listSelectOne() {
		var selectLtOne = common_language.selectLtOneLanguage;
		var selectGtOne = common_language.selectGtOneLanguage;
		var checked = getCheckBoxValue();
		if (checked.length < 1) {
			$.oimsAlert(selectLtOne);
			return false;
		} else if (checked.length > 1) {
			$.oimsAlert(selectGtOne);
			return false;
		}
		return checked[0];
	}
	;
	/**
	 * @author 黄浩
	 * @param vl:option:value
	 * @param id:select
	 *            元素id
	 * @param f:所在的父级元素
	 *            select 元素选中一个值
	 */
	function selected(vl, id, f) {
		f = f == undefined ? document : f;
		$.each($("#" + id + ">option", f), function(i, v) {
			if (v == undefined)
				return false;
			v = $(v);
			if (v.val() == vl) {
				v.attr("SELECTED", "SELECTED");
				return false;
			}
		});
	}
	;
	/**
	 * @author 黄浩
	 * @param name
	 * @param val
	 * @param f
	 *            radio中选中一个
	 */
	function radioSelect(name, val, f) {
		var arry = $("input[name='" + name + "']", f);
		$.each(arry, function(i, v) {
			if (v == undefined)
				return false;
			if ($(v).val() == val) {
				$(v).attr("checked", "checked");
				return false;
			}
		});
	}
	;
	/**
	 * @author 黄浩
	 * @param name
	 * @param vs
	 * @param f
	 *            checkBox 中选中vs数据中的值
	 */
	function checkSelect(name, vs, f) {
		if (vs == undefined || vs.length < 1)
			return;
		var arry = $("input[name='" + name + "']", f);
		for (i = 0; i < vs.length; i++) {
			$.each(arry, function(i, v) {
				if (v == undefined)
					return;
				if ($(v).val() == vs[i]) {
					$(v).attr("checked", "checked");
					return false;
				}
			});
		}
	}
	;

	/**
	 * 返回多选按钮所选中的值
	 * 
	 * @param 多选按钮
	 *            name属性
	 * @param f
	 *            多选按钮所在的form 如果是空，默认为document
	 * @param type=str
	 *            返回格式"'','',''..." type=undefined返回 ",,,,..."
	 */
	function checkboxClick(n, f, type) {
		var dn = (type != undefined && type == 'str') ? "'" : "";
		var d = "";
		f = f == undefined ? document : f;
		$.each($("input:checkbox[name='" + n + "']", f), function(i, v) {
			if (v == undefined)
				return;
			if ($(v).attr("checked") == "checked") {
				if (d == "")
					d = dn + $(v).val() + dn;
				else
					d += "," + dn + $(v).val() + dn;
			}
		});
		return d;
	}
	;
	/**
	 * @author 黄浩 字符串转时间
	 * @param s
	 *            <p>
	 *            符合yyyy-mm-dd的返回Date对象，不符合的返回""
	 *            </p>
	 */
	function strToDate(s) {
		if (s == null || typeof (s) != "string" || s.length != 10)
			return null;
		var d = new Date();
		d.setFullYear(s.substring(0, 4));
		d.setMonth(s.substring(5, 7));
		d.setDate(s.substring(8, 9));
		return d;
	}
	;
	var f = {
		strToDate : strToDate,
		checkboxClick : checkboxClick,
		fundisabled : fundisabled,
		/**
		 * @param f
		 *            :jquery 对象
		 *            <p>
		 *            把参数f内的input,select,textarea设置为不可用
		 *            </p>
		 */
		fdisabled : fdisabled,
		/**
		 * 页面列表中选择一个选中项，如果是返回选中数据，如果不是返回false
		 */
		listSelectOne : listSelectOne,
		/**
		 * 下拉菜单设置默认值
		 */
		selected : selected,
		/**
		 * 单选选择
		 * 
		 * @param name,
		 *            checkbox 名
		 * @param vs,
		 *            需要选中的值
		 * @param f
		 *            checkbox所在的form
		 */
		radioSelect : radioSelect,
		/**
		 * 多选选择
		 * 
		 * @param name,
		 *            checkbox 名
		 * @param vs,
		 *            需要选中的值
		 * @param f
		 *            checkbox所在的form
		 */
		checkSelect : checkSelect
	};
	return f;
};
/**
 * @author 黄浩 导出数据常用方法
 */
function proTool() {

	/**
	 * {select:"",from:"",where:"",order:"",group:""}{cs:cp,head:head}
	 * 
	 * @param url
	 * @param d
	 *            点击后自动下载
	 */
	function proDown(url, d) {
		var f = $("<form />").attr({
			action : url,
			method : "post",
			target : "_blank"
		});
		var h = "";

		h = $("<input type='hidden' name='cs' value='" + d.cs + "' />");
		f.append(h);
		h = $("<input type='hidden' name='findTag' value='" + d.findTag
				+ "' />");
		f.append(h);
		h = $("<input type='hidden' name='head' value='" + d.head + "' />");
		f.append(h);

		h = $("<input type='hidden' name='select' value='" + d.select + "' />");
		f.append(h);
		h = $("<input type='hidden' name='from' value='" + d.from + "' />");
		f.append(h);
		h = $("<input type='hidden' name='where' value='" + d.where + "' />");
		f.append(h);
		h = $("<input type='hidden' name='order' value='" + d.order + "' />");
		f.append(h);
		h = $("<input type='hidden' name='group' value='" + d.group + "' />");
		f.append(h);
		h = $("<input type='hidden' name='patient_ids' value='" + d.patient_ids + "' />");
		f.append(h);
		f.appendTo($("html"));
		f.get(0).submit();
		f.remove();
	}
	;
	function jtproDown(url,d){

		var f = $("<form />").attr({
			action : url,
			method : "post",
			target : "_blank"
		});
		var h = "";
		h = $("<input type='hidden' name='productId' value='" + d.productId + "' />");
		f.append(h);
		h = $("<input type='hidden' name='startDate' value='" + d.startDate + "' />");
		f.append(h);
		h = $("<input type='hidden' name='endDate' value='" + d.endDate + "' />");
		f.append(h);
		h = $("<input type='hidden' name='doctor' value='" + d.doctor + "' />");
		f.append(h);
		h = $("<input type='hidden' name='patientName' value='" + d.patientName + "' />");
		f.append(h);
		h = $("<input type='hidden' name='sn' value='" + d.sn + "' />");
		f.append(h);
		h = $("<input type='hidden' name='batchNumber' value='" + d.batchNumber + "' />");
		f.append(h);
		f.appendTo($("html"));
		f.get(0).submit();
		f.remove();
	
	};
	/**
	 * 
	 * 生成报表头字符串
	 * 
	 * @param ds
	 *            :{index:"",title:"",column:"",defValue:"",tValue:"",fValue:""}
	 * @returns {String}
	 */
	function getProHead(ds) {
		var rt = "";
		$.each(ds, function(i, v) {
			if (i == undefined)
				return false;
			if (rt != "")
				rt += ",";
			rt += "index" + "<kv>" + (v.index == undefined ? "" : v.index);
			rt += "<f>" + "title" + "<kv>"
					+ (v.title == undefined ? "" : v.title);
			rt += "<f>" + "column" + "<kv>"
					+ (v.column == undefined ? "" : v.column);
			rt += "<f>" + "defValue" + "<kv>"
					+ (v.defValue == undefined ? "" : v.defValue);
			rt += "<f>" + "tValue" + "<kv>"
					+ (v.tValue == undefined ? "t" : v.tValue);
			rt += "<f>" + "fValue" + "<kv>"
					+ (v.fValue == undefined ? "f" : v.fValue);
			rt += "<f>" + "type" + "<kv>"
					+ (v.type == undefined ? "str" : v.type);
			rt += "<f>" + "width" + "<kv>"
					+ (v.width == undefined ? "100" : v.width);
		});
		return rt;
	}
	;
	return {
		proDown : proDown,
		getProHead : getProHead,
		jtproDown:jtproDown
	};
};
function hqlTool() {
	/**
	 * hql语句中有where 返回and 没有返回where
	 * 
	 * @param s
	 * @returns {String}
	 */
	function whereOrAnd(s) {
		if (s.indexOf("where") > 0)
			return " and ";
		else
			return " where ";
	}
	;
	/**
	 * @author 黄浩
	 * @param id
	 * @returns {String} 页面元素中得到的是"{value},{value},...."
	 *          在hql中列属性为字符串时，把值转成"'{value}','{value}',...."
	 */
	function stringValues(id) {
		var vl = $("#" + id).val();
		var vs = vl.split(",");
		var rt = "";
		$.each(vs, function(i, v) {
			if (v == undefined)
				return false;
			if (rt == "")
				rt += "'" + v + "'";
			else
				rt += ",'" + v + "'";
		});
		rt = rt == "''" ? "" : rt;
		return rt;
	}
	;
	/**
	 * 
	 * @param s
	 * @param f
	 * @param w
	 * @param o
	 * @param g
	 * @returns {___anonymous27363_27408}
	 */
	function createHql(tag, s, f, w, o, g) {
		var h = {
			findTag : "",
			select : "",
			from : "",
			where : "",
			order : "",
			group : ""
		};
		h.findTag = tag;
		h.select = s == undefined ? "" : " " + s + " ";
		h.from = f == undefined ? "" : " " + f + " ";
		h.where = w == undefined ? "" : " " + w + " ";
		h.order = o == undefined ? "" : " " + o + " ";
		h.group = g == undefined ? "" : " " + g + " ";
		return h;
	}
	;
	/**
	 * 生成可被后台解析成hql map参数的字符串
	 * 
	 * @param t
	 * @param v
	 * @param n
	 * @returns {String}
	 */
	function createHqlMapParam(t, v, n) {
		if (t == undefined)
			t = "string";
		if (v == undefined)
			v = "";
		if (n == undefined)
			return "";
		return "value" + "<kv>" + v + "<f>" + "name" + "<kv>" + n + "<f>"
				+ "type" + "<kv>" + t;
	}
	;

	return {
		whereOrAnd : whereOrAnd,
		stringValues : stringValues,
		createHql : createHql,
		createHqlMapParam : createHqlMapParam
	};
};
/**
 * @author 黄浩 全局常量globeConstant
 */
function globeConstant() {
	return {
		man : false,// 男
		woman : true,// 女
		yes : true,// 是
		no : false
	// 否
	};
};
// 计算孕周，endDay是出生日期，startDay是预产期
function JsDate() {
	/**
	 * 
	 * @param startDay
	 *            js Date类型
	 * @param endDay
	 *            js Date类型 endDay - startDa
	 */
	this.xcts = function(startDay, endDay) {

		var dif = endDay.getTime() - startDay.getTime();
		var days = dif / (24 * 60 * 60 * 1000) + 280;
		return days;
	};
	/**
	 * s 字符串格式(yyyy-mm-dd) 返回js Date类型
	 */
	this.strToDate = function(s) {
		var ar = s.split("-");
		return new Date(ar[0], ar[1] - 1, ar[2]);
	};
};
jsDate = new JsDate();

/**
 * 后台时间转前台时间
 */
function time(t) {
	var d = new Date(t.time);
	/**
	 * 某年某月的最后一天
	 * 
	 * @param nian
	 * @param yue
	 * @returns {String}
	 */
	function lastDay(nian, yue) {
		nian = nian == undefined ? undefined : Number(nian);
		yue = yue == undefined ? undefined : Number(yue);
		var d = new Date();
		var y = nian == undefined ? d.getFullYear() : nian;
		var m = yue == undefined ? (d.getMonth() + 1) : yue;
		return y + "-" + m + "-" + getlastDay(y, m);
	}
	;
	function getlastDay(y, m) {
		if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10
				|| m == 12)
			return 31;
		else if (m == 4 || m == 6 || m == 9 || m == 11)
			return 30;
		else if (y % 4 != 0 && m == 2)
			return 28;
		else
			return 29;
	}
	;
	/**
	 * 某年某月的第一天
	 * 
	 * @param nian
	 * @param yue
	 * @returns {String}
	 */
	function firstDay(nian, yue) {
		nian = nian == undefined ? undefined : Number(nian);
		yue = yue == undefined ? undefined : Number(yue);
		var d = new Date();
		var y = nian == undefined ? d.getFullYear() : nian;
		var m = yue == undefined ? (d.getMonth() + 1) : yue;
		return y + "-" + m + "-" + 1;
	}
	;
	function yyyy_mm_dd() {
		var str = d.getUTCFullYear() + "-" + (d.getMonth() + 1) + "-"
				+ d.getDate();
		return str;
	}
	;
	function yyyy_mm_dd_hms() {
		var str = d.getUTCFullYear() + "-" + (d.getMonth() + 1) + "-"
				+ d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":"
				+ d.getSeconds();
		return str;
	}
	;

	return {
		/**
		 * 某年某月的最后一天
		 * 
		 * @param nian
		 * @param yue
		 * @returns {String}
		 */
		lastDay : lastDay,
		/**
		 * 某年某月的第一天
		 * 
		 * @param nian
		 * @param yue
		 * @returns {String}
		 */
		firstDay : firstDay,
		/**
		 * 后台时间转成yyyy-mm-dd格式
		 */
		format_yyyy_mm_dd : yyyy_mm_dd,
		/**
		 * 后台时间转成yyyy-mm-dd HH:mm:ss格式
		 */
		format_yyyy_mm_dd_hms : yyyy_mm_dd_hms

	};
};

/**
 * @author 黄浩
 * @param param
 *            json param : 可以是字符串，字符串必为url param ：可以是对象，{ url:"响应地址", //必须
 *            data:参数 ajaxBefor:"在ajax请求前所执行的函数，返回boolean，true:可以向下执行请求",
 *            errorFn:"请求发生错误，回传三个参数(jqXHR, textStatus, errorThrown)"
 *            successFn:请求成功后，结果做为参数回传 (data, textStatus, jqXHR),
 *            defInfo:boolean }
 * 
 * @returns 成功返回json数据
 */
function ajaxReq(param) {
	var l = {
		fail : common_language.failLanguage,
		success : common_language.successLanguage
	};

	if (typeof (param) == "string")
		param = {
			url : param
		};
	var rt = undefined;
	var run = true;
	if (param.defInfo == undefined)
		param.defInfo = false;
	if (typeof (param.ajaxBefor) == "function") {
		run = param.ajaxBefor;
		if (!run)
			return false;
	}
	var fn_error = function(jqXHR, textStatus, errorThrown) {
		if (param.defInfo)
			$.oimsAlert(l.fail);
		if (typeof (param.errorFn) == "function")
			param.errorFn(jqXHR, textStatus, errorThrown);
	};
	var fn_success = function(data, textStatus, jqXHR) {
		if (param.defInfo)
			$.oimsAlert(l.success);
		rt = data;
		if (typeof (param.successFn) == "function")
			param.successFn(data);
	};
	$.ajax({
		url : param.url,
		data : param.data,
		type : (param.type == undefined ? "post" : param.type),
		dataType : (param.dataType == undefined ? "json" : param.dataType),
		async : false,
		success : fn_success,
		error : fn_error
	});
	return rt;
};

function thisMovie(movieName) {
	if (navigator.appName.indexOf("Microsoft") != -1) {
		return window[movieName];
	} else {
		return document[movieName];
	}
}
// ---------------------------------------------------------------------------------------------

// 操作一条或多条数据(整理)
function opOneAndMutiDialog(msg, url, callback) {
	var checked = getCheckBoxValue();
	if (checked.length < 1) {
		$.oimsAlert(common_language.zhishaoSelectDota);
		return;
	}
	$.oimsConfirm({
		strTitle : msg,
		remove_length : true
	}, function() {
		var ids = "-1";
		$.each(checked, function(i, v) {
			ids += "," + v.id;
		});
		var result = getJSONData(url, {
			ids : ids
		}, "post");
		if (result.state) {
			$.oimsSucc(result.message, callback);
		} else {
			$.oimsAlert(common_language.DeleteShiBai);// 删除失败
		}

	});
}
/**
 * <p>
 * 日期比较
 * </p>
 * 
 * @author 王学良
 */
Date.prototype.Format = function(fmt) { // author: meizz
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

function dateCompare(startId, endId) {
	var startStr, endStr;
	startStr = $("#" + startId).val();
	if (!!endId) {
		endStr = $("#" + endId).val();
	} else {
		endStr = new Date().Format("yyyy-MM-dd");
		;
	}

	var d1, d2, s, arr, arr1, arr2;
	if (startStr.length > 10) {
		arr = startStr.split(" ");
		arr1 = arr[0].split("-");
		arr2 = arr[1].split(":");
		d1 = new Date(arr1[0], arr1[1] - 1, arr1[2], arr2[0], arr2[1], arr2[2]);
	} else {
		arr = startStr.split("-");
		d1 = new Date(arr[0], arr[1], arr[2]);
	}
	if (endStr.length > 10) {
		arr = endStr.split(" ");
		arr1 = arr[0].split("-");
		arr2 = arr[1].split(":");
		d2 = new Date(arr1[0], arr1[1] - 1, arr1[2], arr2[0], arr2[1], arr2[2]);
	} else {
		arr = endStr.split("-");
		d2 = new Date(arr[0], arr[1], arr[2]);
	}

	s = d2 - d1;
	if (s < 0) {
		return false;
	} else {
		return true;
	}
}
/**
 * <p>
 * 日历插件
 * </p>
 * 
 * @author 王学良
 * @param id
 * @param leftWidth
 */
function calendarFun(id, leftWidth) {
	if ($("#" + id).length) {
		var cal = Calendar.setup({
			onSelect : function(cal) {
				cal.hide();
				var date = cal.selection.get();
				if (date) {
					date = Calendar.intToDate(date);
					document.getElementById(id).value = Calendar.printDate(
							date, "%Y-%m-%d");
					if (document.getElementById(id).value != "") {
						$("#" + id).removeAttr("title").removeClass("error1");
//						if (!dateCompare(id, "")) {
//							$("#" + id).attr("title",
//									common_language.RiQiTimeChaoTu).addClass(
//									"error1");
//						}
					}
				}
			}
		});
		cal.widthLength(id);
		cal.topLength(id);
		cal.manageFields(id, id, "%Y-%m-%d");
		if (!leftWidth) {
			leftWidth = 0;
		}
		cal.manageFields(id, id, "%Y-%m-%d", leftWidth);
	}

}
/**
 * <p>
 * 日历插件（可以大于当前日期）
 * </p>
 * 
 * @author 刘洋
 * @param id
 * @param leftWidth
 */
function calendarEMR_FOLLOWED(id, leftWidth) {
	if ($("#" + id).length) {
		var cal = Calendar.setup({
			onSelect : function(cal) {
				cal.hide();
				var date = cal.selection.get();
				if (date) {
					date = Calendar.intToDate(date);
					document.getElementById(id).value = Calendar.printDate(
							date, "%Y-%m-%d");
					if (document.getElementById(id).value != "") {
						$("#" + id).removeAttr("title").removeClass("error1");
					}
				}
			}
		});
		cal.widthLength(id);
		cal.topLength(id);
		cal.manageFields(id, id, "%Y-%m-%d");
		if (!leftWidth) {
			leftWidth = 0;
		}
		cal.manageFields(id, id, "%Y-%m-%d", leftWidth);
	}

}
/**
 * 按钮权限配置
 */
function btnProwerConfig(btns) {
	$.each(btns, function(i, d) {
		// console.dir($("." + d.css + "a"));
		$("." + d.css + "a").parent().attr("onclick", "return true;");
		$("." + d.css + "a").removeClass().addClass(d.css);
	});
}
/**
 * 加载欢迎页面
 */
function loadWelcomePage() {
	$("#right").text("");
	var welcomeHtml = '<div class="welcomebg"><div class="welcomefont" ></div></div>';
	$(welcomeHtml).appendTo("#right");
	var marginTop = ($(".content").height() - $(".welcomefont").height()) / 2;
	$(".welcomebg").height($(".content").height()).css("overflow", "hidden");
	$(".welcomefont").css("margin-top", marginTop / 2 - 20 + "px");
}

/**
 * @author 黄浩
 * @param o
 * <p>
 *  调试用方法可打印字符串与对象
 * </p>
 */
function cf(o) {
	var ots = function(obj, n) {
		n++;
		var rt = "";
		if (typeof (obj) == "object") {
			for ( var s in obj) {
				rt += s + ":" + ots(obj[s], n) + "\n";
			}
		} else {
			rt += obj;
		}
		return rt;
	};
	var use = false;
	if (use) {
		if (!$.browser.msie) {
			if (typeof (o) != "object") {
				console.log(o);
			} else {
				console.dir(o);
			}
		} else {
			alert(ots(o));
		}
	}

};

/**
 * <p>
 * 身份证号码验证方法
 * </p>
 * 
 * @author 王杰
 * @param num
 *            身份证号
 * @returns {Boolean}
 */
function isIdCardNo(num) {
	var len = num.length, re;
	if (len == 15) {
		re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{3})$/);
	} else if (len == 18) {
		re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\d|x|X)$/);
	} else {
		$.oimsAlert("身份证号位数错误");
		return false;
	}
	var a = num.match(re);
	if (a != null) {
		var B = null;
		if (len == 15) {
			var D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
			B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4]
					&& D.getDate() == a[5];
		} else {
			var D = new Date(a[3] + "/" + a[4] + "/" + a[5]);
			B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4]
					&& D.getDate() == a[5];
		}
		if (!B) {
			$.oimsAlert("身份证号里出生日期错误");
			return false;
		}
	} else {
		$.oimsAlert("身份证号输入错误");
		return false;
	}
	return true;
}

function fnFormValidata(oValidataData) {
	var sReturn = null;
	if (!$.isEmptyObject(oValidataData.nullValidataData)) {
		$.each(oValidataData.nullValidataData, function(key, value) {
			var sId = $('#' + key);
			if (sId.val() == null || $.trim(sId.val()) == '') {
				sId.focus();
				sReturn = value;
				return false;
			}
		});
	}
	return sReturn;
}

/**
 * @author 王杰 对新增弹出框进行重置操作
 */
function fnResetAddForm() {
	// 查找到form中所有的input并清空
	var oInput = $('form input');
	if (oInput.length > 0) {
		oInput.val('');
	}
	// 查找到form中所有的select并将vale值设为空
	var oSelect = $('form select');
	if (oSelect.length > 0) {
		oSelect.each(function() {
			$(this).find('option:eq(0)').prop('selected', true);
		});
	}
	// 查找到form中所有的textarea并清空
	var oTextarea = $('form textarea');
	if (oTextarea.length > 0) {
		oTextarea.val('');
	}

}

function fnResetUpdateForm() {
	var oUpdateForm = $('div.opencontent form').data('oFormClone');
	$('div.opencontent').find('form').remove().end().append(oUpdateForm);
	// alert(oUpdateForm.html());
}

// 弹出窗口DIV移除操作
function removeDiv_openWin() {
	var openWin = $(".openWin");
	if (openWin.length > 0)
		openWin.remove();
	var lockedBackground = $(".lockedBackground");
	if (lockedBackground.length > 0)
		lockedBackground.remove();

}

/**
 * 获取年龄
 * @param birthday
 * @author Li Yan
 * @returns
 */
function getAge(birthday){
	if(typeof birthday=='string'){
		birthday = birthday.toString().replace(/\-/g,'/');
	}
	var now = new Date();
	var date = new Date(birthday);
	var _y = now.getUTCFullYear();
	var y = _y-date.getUTCFullYear();
	var _m = now.getMonth();
	var m = _m-date.getMonth();
	var _d = now.getDate();
	var d = _d-date.getDate();
	var age;
//	if(m<0||d<0){
//		y = y-1;
//		if(m<0)m+=12;
//		if(d<0)m = m-1;
//	}
	if(parseInt(Math.abs(now-date)/1000/60/60/24/365)>=1){
		age=y;
	}
	else{
		if(parseInt(Math.abs(now-date)/1000/60/60/24/30)>=1){
			if(y>0){
				age=m+12+"月";
			}
			else{
					age=m+"月";
			}
		}else{
			age = parseInt(Math.abs(now-date)/1000/60/60/24)+"天";
		}
	}
//	if(y>0){
//		if(m<0){
//			y=y-1;
//		}else if(m==0){
//			if(d<0){
//				y=y-1;
//			}
//		}else{
//			//什么都不走
//		}
//		age = y+"岁";
//	}else{//这种情况就是不足一岁的孩子
//		if(m>0){
//			if(d>=0)
//				age = m+"月";
//			else
//				
//		}else{
//			age = parseInt(Math.abs(now-date)/1000/60/60/24)+"天";
//		}
//	}
	return age;
}

/**
 * 对象是否在数组中
 * @param source
 * @param obj
 * @returns {Boolean}
 */
function containArray(source,obj){
	var result = false;
	for(var i=0; i<source.length; i++){
		if(obj==source[i]){
			result=true;
			break;
		}
	}
	return result;
}

/**
 * 从数组中删除指定对像
 * @param source
 * @param obj
 */
function delObjectInArray(source, obj){
	var target = [];
	for(var i=0; i<source.length; i++){
		if(obj!=source[i]){
			target.push(source[i]);
		}
	}
	return target;
}

function showLog(obj){
	if(debugFlag){
		console.log(obj);
	}
}

function initJSONData(url, data, type,func) {
	if (type == null) {
		type = "GET";
	} else {
		type = "POST";
	}
	$.ajax({
		url : contextPath + url,
		data : data,
		type : type,
		dataType : 'json',
		success : function(data) {
			func(data);
		}
	});
}

/**************************模版***************************/
function getHtmlTemplate(templatenName, path){
	var tem=null;
	var url = path==undefined?'/emr/template/html/':path;
	$.ajax({
		url:contextPath + url+templatenName+'.html',
		type:'POST',
		async:false,
		success:function(data){
			tem=data;
		}
	});
	return tem;
}

function showWithHtmlTemplate(templateName, data,showTag){
	var template = getHtmlTemplate(templateName);
	$(template).appendTo(showTag);
	var eles = $(showTag).find("span.replaceTxt");
	//if(debugFlag)console.log("eles.length:"+eles.length);
	$.each(eles,function(i,ele){
		var t = $(ele).text();
		var txt ="";
		if(data!=null)
			$.each(data,function(k,v){
				var _t = "{"+k+"}";
				if(t.indexOf(_t)==-1)return true;
				txt = t.replace(_t,v);
//				if(debugFlag)console.log("{"+k+"}==>"+txt);
				return false;
			});
		//if(debugFlag)console.log("==>"+txt);
		$(ele).text(txt).removeClass("replaceTxt");
	});
}
//'../emr/template/html/'+template+'.html';
function common_getHtmlTemplate(url){
	var tem=null;
	$.ajax({
		url:url,
		type:'GET',
		async:false,
		success:function(data){
			tem=data;
		}
	});
	return tem;
}

function imgResize(tag,width,height){
	$.each($(tag).find("img"),function(i,d){
		var img = $(d);
		img.load(function(){
			var s0 = width/$(this).width();
			var s1 = height/$(this).height();
			if(s0>=1 && s1>=1)return;
			var s = s0>s1?s1:s0;
			$(this).width($(this).width()*s).height($(this).height()*s);
		});
	});
}

function common_showWithHtmlTemplate(url, data,showTag){
	var template = common_getHtmlTemplate(url);
	$(template).appendTo(showTag);
	var eles = $(showTag).find(".replaceTxt");
	//if(debugFlag)//console.log("eles.length:"+eles.length);
	$.each(eles,function(i,ele){
		var t = $(ele).text();
		var txt ="";
		if(data!=null)
			$.each(data,function(k,v){
				var _t = "{"+k+"}";
				if(t.indexOf(_t)==-1)return true;
				txt = t.replace(_t,v);
				//if(debugFlag)//console.log("{"+k+"}==>"+txt);
				return false;
			});
		//if(debugFlag)//console.log("==>"+txt);
		$(ele).text(txt).removeClass("replaceTxt");
	});
}


function htmIsEmpty(html){
	var v=true;
	if(!html.length)return v;
	html = html.toString().replace(/(<\s*\S*>)|\s|&nbsp;/g,"");
	return !html.length;
}
/**************************模版***************************/

/**
 * 显示权限按钮
 * @author Li Yan
 */
function showMyBTNS(btns,tag){
	$.each(btns, function(i,d){
		$("<a />").text(d.title).click(function(){
			if(d.jsFileUrl!=null && d.jsFileUrl.length>0)
				importJS(d.jsFileUrl);
			eval('('+d.func+'())');
		}).prepend($("<span />").addClass(d.css)).appendTo(tag);
	});
}

/**
 * 判断是不是日期时间字符串
 * @param str
 * @author Li Yan
 */
function parseDatetime(str){
	if(str.length<14||str.length>19)return null;
	var arr = str.split(" ");
	if(arr.length!=2)return null;
	var arr0 = arr[0].split("-");
	if(arr0.length!=3)return null;
	var arr1 = arr[1].split(":");
	if(arr1.length!=3)return null;
	var date=null;
	try{
		date = new Date(arr0[0], arr0[1] - 1, arr0[2], arr1[0], arr1[1], arr1[2]);
	}catch(e){
	}
	return date;
}

/**
 * 根据提供对象替换表单元素
 * @author Li Yan
 * @param form  $("#formId")
 * @param idOrName 替换时已ID或名字
 * @param data
 */
function replaceFormData(form, data, idOrName){
	var attrName = "id";
	if(idOrName){
		attrName="name";
	}
	var inputs = form.find("input[type=text]");
	$.each(inputs,function(i,input){
		var name = $(input).attr(attrName);
		var v = getFormObjVal(data,name);
		if(v==null)v="";
		$(input).replaceWith("<span>"+v+"</span>");
	});
	
	var selects = form.find("select");
	$.each(selects,function(i,select){
		var name = $(select).attr(attrName);
		var v = getFormObjVal(data,name);
		var option = $(select).children("option[value="+v+"]");
		if(option.length)
			$(select).replaceWith("<span>"+option.text()+"</span>");
		else
			$(select).replaceWith("<span id='select"+name+"'></span>");
	});
	
	var ic = form.find("input[type=checkbox]");
	replaceCheckboxOrRadio(ic);
	
	var is = form.find("input[type=radio]");
	replaceCheckboxOrRadio(is);

	var ts = form.find("textarea");
	$.each(ts,function(i,textarea){
		var v = getFormObjVal(data,$(textarea).attr(attrName));
		if(v==null)
			v="";
		else{
			while(v.indexOf(" ")!=-1)
				v=v.replace(" ","&nbsp;&nbsp;");
			v = v.replace(/\n/g,"<br />");
		}
		$(textarea).replaceWith("<div>"+v+"</div>");
	});
	
	function replaceCheckboxOrRadio(checkboxs){
		$.each(checkboxs,function(i,checkbox){
			var id = $(checkbox).attr("id");
			var x=false;
			var v = $(checkbox).val();
			var vs=[];
			var vc = getFormObjVal(data,$(checkbox).attr("name"));
			if(vc!=null)vs=vc.toString().split(",");
			
			$.each(vs,function(_i,_v){
				if(v==_v){
					x=true;
					return false;
				}
			});
			if(!x){
				$(checkbox).parent().children("label[for="+id+"]").remove();
			}
			$(checkbox).remove();
		});
	}
}
/**
 * 获取对象中指定KEY的值
 * @author Li Yan
 * @param obj
 * @param key
 * @returns 
 */
function getFormObjVal(obj,key){
	var val="";
	$.each(obj,function(k,v){
		if(k==key){
			val=v;
			return false;
		}
	});
	return val;
}

/**
 * 显示表单
 * @author Li Yan
 * @param tag
 * @param templateUrl
 * @param setting
 * @param data
 */
function showFormByHtmlTemplate(tag, templateUrl, setting, data){
//	debugger;
	var html;
	$.ajax({url:contextPath+templateUrl+"?tag="+Math.random(), async : false, type : "GET", success : function(t){html=t;}});
	var method="POST";
	if(setting.formMethod!=undefined && setting.formMethod!=null)method=setting.formMethod;
	var form = $("<form />").ajaxForm({
		dataType : "json",
		beforeSubmit: setting.beforeSubmit,
		success : function(d){
			if(!d.state){
				$.oimsError("保存失败！");
				return;
			}
			setting.saveCallback(d);
		}
	}).attr("action",contextPath+setting.action).attr("method",method).append(html).appendTo(tag);
//	alert(html);
	var sbtn = form.find("span.advsumit");
	if(sbtn.length && sbtn.parent().is("a"))
		sbtn.parent().click(function(){form.submit();});
	var rbtn = form.find("span.advreset");
	if(rbtn.length && rbtn.parent().is("a"))
		rbtn.parent().click(function(){form[0].reset();});
	if(data==undefined || data==null) return form;
	fillFormWithData(form,data);
	return form;
}

/**
 * 自动填表
 * @param Li Yan
 * @param form
 * @param data
 */
function fillFormWithData(form,data){
	$.each(data,function(k,v){
		if(v==null)v="";
		var tag = form.find("input[name="+k+"]");
		if(tag.length>=1){
			var type = $(tag[0]).attr("type");
			if(type=="radio"){
				form.find("input[name="+k+"][value="+v+"]").attr("checked",true);
			}else if(type=="checkbox"){
				v = v+"";
				form.find("input[name="+k+"]:checked").removeAttr("checked");
				$.each(v.split(","),function(_i,_v){
					form.find("input[name="+k+"][value="+_v+"]").attr("checked",true);
				});
			}else{
				tag.val(v);
			}
		}else{
			tag = form.find("select[name="+k+"]");
			if(tag.length)
				tag.val(v);
			else{
				tag = form.find("textarea[name="+k+"]");
				if(tag.length){
					tag.text(v);
				}
			}
		}
	});
}

/**
 * 显示表单对话框
 * @author Li Yan
 * @param setting{width:width,height:height,title,locked:locked,beforeSubmit:function,submitCallBack:function,templateUrl:url,formData:formData}
 * @return {dialog:dialog,form:form}
 */
function showFormDialog(setting){
	var div = $("<div />");
	var locked=true;
	if(setting.locked!=undefined)locked=setting.locked;
	var dialog = div.oimsDialog({
		width:setting.width,
		height:setting.height,
		icon:"view",
			 title:setting.title,
			 locked:locked,
			 button:[{
				title : "提交",
				func : function(){div.find("form").submit()},
				className : "ok",
				isCloseWin:false
			  }]
	});
		
	var formSetting = {
			action:setting.action,
			beforeSubmit : function(d){
				if(setting.beforeSubmit!=undefined)return setting.beforeSubmit(d);
			},
			saveCallback:function(data){
				if(!setting.ps){
					dialog.close();
				}
				setting.submitCallBack(data);
			}
	}
	var form = showFormByHtmlTemplate(div,setting.templateUrl,formSetting,setting.formData);
	return {dialog:dialog,form:form};
}

function datetimepicker(ele,option){
	importJS("/js/jquery.datetimepicker.js");
	importCSS("/css/jquery.datetimepicker.css");
	$(ele).datetimepicker(option);
}

/**
 * 检查是否是web支持的后缀
 * @author Li Yan
 * @param name
 * @returns {Boolean}
 */
function isWebPhoto(name){
	var r=false;
	var photos=[".jpg",".png",".jpeg",".gif"];
	for(var i=0; i<photos.length; i++){
		var photo = photos[i];
		var s = name.substring(name.length-photo.length);
		if(s.toLowerCase()==photo){
			r=true;
			break;
		}
	}
	return r;
}

function showPrintDialog(div,title){
	div.oimsDialog({title:title,locked:true,icon:"view",button:[{
		title : "打印",//按纽文字
		func : function(){
			importCSS("/css/print.css");
			importJS("/js/LodopFuncs.js");
			var strStyleCSS="<link href='"+contextPath+"/css/print.css?tag="+Math.random()+"' type='text/css' rel='stylesheet'>";
   			var strHtml=strStyleCSS+"<body>"+div[0].innerHTML+"</body>"; 
   			LODOP = getLodop();  
   			LODOP.PRINT_INIT("OIMS打印");
   			LODOP.ADD_PRINT_HTM(0,0,"90%","90%",strHtml);
   			LODOP.SET_PRINT_PAGESIZE (2, 0, 0,"A4");
   			LODOP.PREVIEW();
   			return true;
		},//响应函数
		isCloseWin:true,//点击后，是否关闭窗口 true关闭，false不关闭
		className : "print"//指定CSS名称
	  }]});
}
/**
 * 获取指定日期的月第一天
 * @param date
 * @returns {Date}
 */
function getFistDateOfMonth(date){
	var d = date==undefined?new Date():new Date(date.getTime());
	d.setDate(1);
	return d;
}
/**
 * 获取指定日期的月最后一天
 * @param date
 * @returns {Date}
 */
function getLastDateOfMonth(date){
	var d = date==undefined?new Date():new Date(date.getTime());
	d.setMonth(d.getMonth()+1);
	d.setDate(0);
	return d;
}


/**
 * 获取几天前的日期
 * @param date
 * @returns {Date}
 */
function getLastDate(days){
	var now = new Date();
	return new Date(now - 24*60*60*1000*days);
}

function createButton(tag, setting){
	var a = $("<a />").text(setting.title).appendTo(tag);
	$("<span />").addClass(setting.ico).prependTo(a);
	a.click(function(){
		doClick();
	});
	function doClick(){
		a.unbind("click");
		setting.func();
		a.bind('click',function(){
			doClick();
		});
	}
	return a;
}