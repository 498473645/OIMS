var utils = $.extend({}, utils);

/**
 * 增加命名空间功能
 * 
 * 使用方法：rev.ns('a.b.c');
 */
utils.ns = function() {
	var o = {}, d;
	for ( var i = 0; i < arguments.length; i++) {
		d = arguments[i].split(".");
		o = window[d[0]] = window[d[0]] || {};
		for ( var k = 0; k < d.slice(1).length; k++) {
			o = o[d[k + 1]] = o[d[k + 1]] || {};
		}
	}
	return o;
};

/**
 * 获得项目根路径 contextPath cp
 * 
 * 使用方法：utils.cp();
 */
utils.cp = function() {
	var curWwwPath = window.document.location.href;
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	var localhostPaht = curWwwPath.substring(0, pos);
	var projectName = pathName
			.substring(0, pathName.substr(1).indexOf('/') + 1);
	return (localhostPaht + projectName);
};
/**
 * 提示标签
 * 
 * 使用方法：utils.tip();
 */
utils.tip = {
	tips : function(ele) {
		if (typeof (ele) == "object")
			return ele;
		else if (typeof (ele) == "string" || typeof (ele) == "number")
			return document.getElementById(ele.toString());
		return null;
	},
	mousePos : function(e) {
		var x, y;
		var e = e || window.event;
		return {
			x : e.clientX + document.body.scrollLeft
					+ document.documentElement.scrollLeft,
			y : e.clientY + document.body.scrollTop
					+ document.documentElement.scrollTop
		};
	},
	start : function(obj) {
		var self = this;
		var t = self.tips("mjs:tip");
		obj.onmousemove = function(e) {
			var mouse = self.mousePos(e);
			t.style.left = mouse.x - 115 + 'px';
			t.style.top = mouse.y + 'px';
			t.innerHTML = obj.getAttribute("tips");
			t.style.display = '';
		};
		obj.onmouseout = function() {
			t.style.display = 'none';
		};
	}
};
function toIELowerDate(dateStringInRange) {  
    var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,  
        date = new Date(NaN), month,  
        parts = isoExp.exec(dateStringInRange);  
   
    if(parts) {  
      month = +parts[2];  
      date.setFullYear(parts[1], month - 1, parts[3]);  
      if(month != date.getMonth() + 1) {  
        date.setTime(NaN);  
      }  
    }  
    return date;  
}
Date.prototype.Format = function(formatStr) {
	var str = formatStr;
	var Week = [ '日', '一', '二', '三', '四', '五', '六' ];
	str = str.replace(/yyyy|YYYY/, this.getFullYear());
	str = str.replace(/yy|YY/,
			(this.getYear() % 100) > 9 ? (this.getYear() % 100).toString()
					: '0' + (this.getYear() % 100));
	var month = this.getMonth() + 1;
	str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);
	str = str.replace(/M/g, month);
	str = str.replace(/w|W/g, Week[this.getDay()]);
	str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString()
			: '0' + this.getDate());
	str = str.replace(/d|D/g, this.getDate());
	str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString()
			: '0' + this.getHours());
	str = str.replace(/h|H/g, this.getHours());
	str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes()
			.toString() : '0' + this.getMinutes());
	str = str.replace(/m/g, this.getMinutes());
	str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds()
			.toString() : '0' + this.getSeconds());
	str = str.replace(/s|S/g, this.getSeconds());
	return str;
};
//dtflag true返回 yyyy-MM-dd false返回 yyyy-MM-dd HH:mm:ss
function fromJavaDate(obj, dtflag){
	var year = Number(obj.year) + 1900;
	var month = Number(obj.month)+1;
	var day = obj.date;
	var hours = obj.hours;
	var minutes = obj.minutes;
	var seconds = obj.seconds;
	var d = "";
	d = year + "-" 
		+ (month<9?("0"+month):month).toString() + "-"
		+ (day<9?("0"+day):day).toString();
	alert("==>"+d);
	if(!dtflag) {
		d = d + " "
			+ (hours<9?("0"+hours):hours).toString() + ":"		
			+ (minutes<9?("0"+minutes):minutes).toString() + ":"
			+ (seconds<9?("0"+seconds):seconds).toString(); 
	}
	alert(d);
	return d;
}
