function _oimscanvas(params, callback) {
	var self = this;
	self.pix = Pixastic;
	self.doc = params.element || "main_img";
	self.init_img = null;
	self.main = null;
	self.elm = null;
	self.histStates = 100;
	self.hist = [];
	self.last = [];
	self.hasChanged = false;
	self.server = 'do/save';
	self.loggedin = false;
	self.logging = true;
	self.events = {};
	self.lastCanvas = [];// 撤销 数组
	var userBrowser = navigator.userAgent;
	if (userBrowser.indexOf("iPhone") > -1 || userBrowser.indexOf("iPad") > -1) {
		self.events["down"] = "touchstart";
		self.events["up"] = "touchend";
		self.events["move"] = "touchmove";
	} else {
		self.events["down"] = "mousedown";
		self.events["up"] = "mouseup";
		self.events["move"] = "mousemove";
	}
	// 保存
	self.apply = function() {
		self.hasChanged = false;
	};
	// 取消
	self.cancel = function() {
		self.changing(function() {
			self.hasChanged = false;
		});
	};
	// 改变
	self.changing = function(callback) {
		if (self.hasChanged == false) {
			self.hasChanged = true;
			callback();
		} else {
			self.undo(function() {
				callback();
			});
		}
	};
    //色调，饱和度，亮度的调整
	self.hsl = function(params, callback) {
		self.hist.push({
			func : 'hsl',
			params : params
		});
		self.pix.process(self.elm, "hsl", params, function() {
			self.init({}, function() {
				if (typeof callback == 'function') {
					callback();
				}
			});
		});
	};
	// 对比
	self.sharpen = function(params, callback) {
		self.hist.push({
			func : 'sharpen',
			params : params
		});
		self.pix.process(self.elm, "sharpen", params, function() {
			self.init({}, function() {
				if (typeof callback == 'function') {
					callback();
				}
			});
		});
	};
    //马赛克效果
	self.pixelate = function(params, callback) {
		self.hist.push({
			func : 'pixelate',
			params : params
		});
		self.pix.process(self.elm, "mosaic", params, function() {
			self.init({}, function() {
				if (typeof callback == 'function') {
					callback();
				}
			});
		});
	};
    //雾化效果
	self.blur = function(params, callback) {
		self.hist.push({
			func : 'blur',
			params : params
		});
		self.pix.process(self.elm, "blurfast", params, function() {
			self.init({}, function() {
				if (typeof callback == 'function') {
					callback();
				}
			});
		});
	};
    //亮度
	self.bc = function(params, callback) {
		self.hist.push({
			func : 'bc',
			params : params
		});
		self.pix.process(self.elm, "brightness", params, function() {
			self.init({}, function() {
				if (typeof callback == 'function') {
					callback();
				}
			});
		});
	};
    //色相调整
	self.color = function(params, callback) {
		self.hist.push({
			func : 'bc',
			params : params
		});
		self.pix.process(self.elm, "coloradjust", params, function() {
			self.init({}, function() {
				if (typeof callback == 'function') {
					callback();
				}
			});
		});
	};
    //曝光
	self.solarize = function(params, callback) {
		self.hist.push({
			func : 'solarize',
			params : params
		});
		self.pix.process(self.elm, "solarize", params, function() {
			self.init(params, function() {
				if (typeof callback == 'function') {
					callback();
				}
			});
		});
	};

	//左旋转
	self.leftRotate = function(params, callback) {
		var params = {}; // {控件名：值，控件名：值}
		params.angle = -270;// 逆时针旋转
		self.hist.push({
			func : 'rotate',
			params : params
		});
		self.pix.process(self.elm, "rotate", params, function() {
			self.init({}, function() {
				if (typeof callback == 'function') {
					callback();
				}
			});
		});
		self.apply();// 保存操作
	};

    //右旋转
	self.rightRotate = function(params, callback) {
		var params = {}; // {控件名：值，控件名：值}
		params.angle = -90;// 顺时针旋转
		self.hist.push({
			func : 'rotate',
			params : params
		});
		self.pix.process(self.elm, "rotate", params, function() {
			self.init({}, function() {
				if (typeof callback == 'function') {
					callback();
				}
			});
		});
		self.apply();// 保存操作
	};
    //褐色，怀旧风格
	self.sepia = function(params, callback) {
		self.hist.push({
			func : 'sepia',
			params : params
		});
		self.pix.process(self.elm, "sepia", params, function() {
			self.init({}, function() {
				if (typeof callback == 'function') {
					callback();
				}
			});
		});
	};
    //锐化
	self.edges = function(params, callback) {
		self.hist.push({
			func : 'edges',
			params : params
		});
		self.pix.process(self.elm, "edges2", params, function() {
			self.init({}, function() {
				if (typeof callback == 'function') {
					callback();
				}
			});
		});
	};
    //颜色反转
	self.invert = function(params, callback) {
		self.hist.push({
			func : 'invert',
			params : params
		});
		self.pix.process(self.elm, "invert", {}, function() {
			self.init({}, function() {
				if (typeof callback == 'function') {
					callback();
				}
			});
		});
		self.apply();// 保存操作
	};
    //去色
	self.desaturate = function(params, callback) {
		self.hist.push({
			func : 'desaturate',
			params : params
		});
		self.pix.process(self.elm, "desaturate", {
			average : true
		}, function() {
			self.init({}, function() {
				if (typeof callback == 'function') {
					callback();
				}
			});
		});
	};
    //重置
	self.reset = function(callback) {
		if (self.last.length >= 2) {
			var imageData = self.last[0];
			if (imageData) {
				var context_image = self.elm.getContext('2d');
				self.elm.width = imageData.width;
				self.elm.height = imageData.height;
				context_image.putImageData(self.last[0], 0, 0, 0, 0,imageData.width, imageData.height);
				self.last.length = 1;
				self.lastCanvas.length = 1;
			}
		}
	};
    //撤销
	self.undo = function(callback) {
		if (self.last.length >= 0) {
			var imageData = self.last[(self.last.length - 2)];
			if (imageData) {
				var context_image = self.elm.getContext('2d');
				self.elm.width = imageData.width;
				self.elm.height = imageData.height;
				context_image.putImageData(self.last[(self.last.length - 2)],0, 0, 0, 0, imageData.width, imageData.height);
				self.last.pop();
				self.lastCanvas.pop();
			}
			if (typeof callback == 'function') {
				callback();
			}
		} else {
			if (typeof callback == 'function') {
				callback();
			}
		}
	};
    //对比
	self.compare = function(params, callback) {
		var s = self.elm.getContext('2d');
		s.putImageData(self.last[0], ($('#' + self.doc).width() / 2), 0);
		if (typeof callback == 'function') {
			callback();
		}
	};
    //停止对比
	self.stop_compare = function(params, callback) {
		var s = self.elm.getContext('2d');
		s.putImageData(self.last[(self.last.length - 1)], 0, 0);
		if (typeof callback == 'function') {
			callback();
		}
	};
    //获取图片像素
	self.getImgData = function(img, callback) {
		if ($("#" + self.doc)[0].tagName.toLowerCase() == "img") {
			var image_var = new Image();
			var canvas = document.createElement("canvas");
			var context = canvas.getContext('2d');
			image_var.onload = function() {
				canvas.width = image_var.width;
				canvas.height = image_var.height;
				context.drawImage(image_var, 0, 0, $('#' + self.doc).width(),$('#' + self.doc).height());
				callback(context.getImageData(0, 0, $('#' + self.doc).width(),$('#' + self.doc).height()));
				canvas = null;
				image_var = null;
				context = null;
			};
			image_var.src = img;
		}
	};

	self.log = function(task, msg) {
		if (self.logging == true) {
			console.log(task + ' :: ' + msg);
		}
	};
    //初始化
	self.init = function(paramsinit, callback) {
		var params = paramsinit || {};
		self.elm = document.getElementById(self.doc);
		if ((params.init != undefined) && params.init == true) {
			self.getImgData($('#' + self.doc).attr('src'), function(data) {
				self.init_img = data;
				self.last.push(data);
				self.lastCanvas.push(self.elm);
				touchDong($('#' + self.doc)[0], self.events, true);// 平板支持
				if (typeof callback == 'function') {
					callback();
				}
			});
		} else {
			touchDong($('#' + self.doc)[0], self.events, true);
			var context = self.elm.getContext('2d');
			self.lastCanvas.push(self.elm);
			self.last.push(context.getImageData(0, 0, context.canvas.width,context.canvas.height));
			if (self.last.length >= self.histStates) {
				self.last.shift();
				self.lastCanvas.shift();
			}
			if (typeof callback == 'function') {
				callback();
			}
		}
	};

	self.init({
		init : true
	}); 
	//画笔
    self.pen=function(params, callback){
        var canvas=$("#"+self.doc)[0];
        var parentNode=$("#"+self.doc)[0].parentNode;
        var imageData = canvas.getContext("2d").getImageData(0, 0,canvas.width,canvas.height);
        var canvasCopy = $("<canvas/>").attr("id", self.doc).attr("width",canvas.width ).attr("height",canvas.height);
        $(canvas).remove();
        $(canvasCopy).appendTo(parentNode);
		var contextCopy = canvasCopy[0].getContext("2d");
		contextCopy.putImageData(imageData,0,0);
		touchDong($(canvasCopy)[0], self.events, false);// 平板支持
		doDraw = false;// 默认情况下不执行画图
		canvasCopy[0].addEventListener(self.events.down, drawBegin, false);
		canvasCopy[0].addEventListener(self.events.move, drawing, false);
		canvasCopy[0].addEventListener(self.events.up, drawEnd, false);
    };
    //移除画图程序
    self.removeDraw=function(){
    	var array_canvas = $("canvas");
    	$.each(array_canvas, function(i, canvas) {
    		canvas.removeEventListener(self.events.down, drawBegin, false);
    		canvas.removeEventListener(self.events.move, drawing, false);
    		canvas.removeEventListener(self.events.up, drawEnd, false);
    	});
    };
     // 开始画图 鼠标 down 事件
    function drawBegin(e) {
    	this.onselectstart = function() {
    		return false; // 修复chrome下光标样式的问题
    	};
    	if (self.events.down == "touchstart") {// 事件类型为ipad
    		doDraw = true;// 执行画图程序
    		var stage_info = this.getBoundingClientRect();// this表示canvas对象
    		window.getSelection ? window.getSelection().removeAllRanges(): document.selection.empty();// （鼠标样式）清除文本的选中
    		this.getContext("2d").moveTo(e.touches[0].clientX - stage_info.left,e.touches[0].clientY - stage_info.top);
    	} else {
    		doDraw = true;// 执行画图程序
    		var stage_info = this.getBoundingClientRect();// this表示canvas对象
    		window.getSelection ? window.getSelection().removeAllRanges(): document.selection.empty();// （鼠标样式）清除文本的选中
    		this.getContext("2d").moveTo(e.clientX - stage_info.left,e.clientY - stage_info.top);
    	}
    }
     //画图中 鼠标 down 事件
    function drawing(e) {
    	if (doDraw == false)// 不执行画图
    		return;
    	if (self.events.down == "touchstart") {// 事件类型为ipad
    		var stage_info = this.getBoundingClientRect();
    		this.getContext("2d").lineTo(e.touches[0].clientX - stage_info.left,e.touches[0].clientY - stage_info.top);
    		this.getContext("2d").stroke();
    	} else {
    		var stage_info = this.getBoundingClientRect();
    		this.getContext("2d").lineTo(e.clientX - stage_info.left,e.clientY - stage_info.top);
    		this.getContext("2d").stroke();
    	}
    }
    function drawEnd(e) {
    	doDraw = false;// 不执行画图程序
    	var params = {"green":0,"red":0,"blue":0};
        self.changing(function(){ self.color(params, ""); });
        self.apply();
		touchDong($("#" + self.doc)[0], self.events, false);// 平板支持
        $("#" + self.doc)[0].addEventListener(self.events.down, drawBegin, false);
        $("#" + self.doc)[0].addEventListener(self.events.move, drawing, false);
        $("#" + self.doc)[0].addEventListener(self.events.up, drawEnd, false);
    }
    //测量
    self.mensuration=function(params, callback){
        var canvas=$("#"+self.doc)[0];
        var parentNode=$("#"+self.doc)[0].parentNode;
        var imageData = canvas.getContext("2d").getImageData(0, 0,canvas.width,canvas.height);
        var canvasCopy = $("<canvas/>").attr("id", self.doc).attr("width",canvas.width ).attr("height",canvas.height);
        $(canvas).remove();
        $(canvasCopy).appendTo(parentNode);
		var contextCopy = canvasCopy[0].getContext("2d");
		contextCopy.putImageData(imageData,0,0);
		touchDong($(canvasCopy)[0], self.events, false);// 平板支持
		doDraw = false;// 默认情况下不执行画图
		canvasCopy[0].addEventListener(self.events.down, mensurationBegin, false);
		canvasCopy[0].addEventListener(self.events.move, mensurationing, false);
		canvasCopy[0].addEventListener(self.events.up, mensurationEnd, false);
    };
     // 开始测量 鼠标 down 事件
    function mensurationBegin(e) {
    	this.onselectstart = function() {
    		return false; // 修复chrome下光标样式的问题
    	};
    	if (self.events.down=="touchstart") {// 事件类型为ipad
    		doMensuration = true;// 执行画图程序
    		var stage_info = this.getBoundingClientRect();// this表示canvas对象
    		x_start = e.touches[0].clientX - stage_info.left;
    		y_start = e.touches[0].clientY - stage_info.top;
    	} else {
    		doMensuration = true;// 执行测量程序
    		var stage_info = this.getBoundingClientRect();
    		x_start = e.clientX - stage_info.left;
    		y_start = e.clientY - stage_info.top;
    	}
    }
     //测量中 鼠标 down 事件
    function mensurationing(e) {
    	var stage_info = this.getBoundingClientRect();
    	if (self.events.down== "touchstart") {// 事件类型为ipad
    		x_end = e.touches[0].clientX - stage_info.left;
    		y_end = e.touches[0].clientY - stage_info.top;
    	} else {
    		x_end = e.clientX - stage_info.left;
    		y_end = e.clientY - stage_info.top;
    	}
    }
    function mensurationEnd(e) {
    	doMensuration = false;// 不执行测量程序
    	var stage_info = this.getBoundingClientRect();
    	if (self.events.down == "touchstart") {// 事件类型为ipad
    		x_end = e.touches[0].clientX - stage_info.left;
    		y_end = e.touches[0].clientY - stage_info.top;
    	} else {
    		x_end = e.clientX - stage_info.left;
    		y_end = e.clientY - stage_info.top;
    	}
    	this.getContext("2d").beginPath();
    	this.getContext("2d").moveTo(x_start, y_start);
    	this.getContext("2d").lineTo(x_end, y_end);
    	this.getContext("2d").stroke();
    	var params = {"green":0,"red":0,"blue":0};
        self.changing(function(){ self.color(params, ""); });
        self.apply();
    	touchDong($("#" + self.doc)[0], self.events, false);// 平板支持
        $("#" + self.doc)[0].addEventListener(self.events.down, mensurationBegin, false);
        $("#" + self.doc)[0].addEventListener(self.events.move, mensurationing, false);
        $("#" + self.doc)[0].addEventListener(self.events.up, mensurationEnd, false);
    }
}

/*
 *滑动控件begin 
 */
// ipad 触屏之类的begin 返回滑动控件的值
function selectClor(divId, t) {
	var val = 1;
	if (t == 'contrast') {
		val = 10;
	} else if (t == 'color') {
		val = 100;
	} else if (t == 'sharpen') {
		val = 100;
	} else if (t == 'blur') {
		val = 100;
	}
	var parm = {};
	var colorIntput = $("#" + divId + " input");
	for ( var i = 0; i < colorIntput.length; i++) {
		parm[colorIntput[i].attributes.name.value] = $(colorIntput[i]).val()/ val;
	}
	return parm;
}
//创建色度条件等滑动控件，绑定事件
function showOptions(parms, themeName, targetDiv) {
	var params = {};
	$("<span>" + themeName + "</span>").appendTo("#" + targetDiv);
	var li = $("<li />").appendTo($("<ul />").appendTo("#" + targetDiv));
	var divContent = "<div class='slider'>"
			+ "<div class='slider-inner' id = 'slider-inner" + parms.name
			+ "' cls='" + parms.cls + "'>"
			+ "<input type='range' typeLei='" + parms.type + "' cls='"
			+ parms.cls + "' min='" + parms.min + "' max='" + parms.max
			+ "' name='" + parms.name + "'></div>";
	li.append(divContent);
	// 判断平台
	var eventName;
	var userBrowser = navigator.userAgent;
	if (userBrowser.indexOf("iPhone") > -1 || userBrowser.indexOf("iPad") > -1) {
		eventName = "touchend";
	} else {
		eventName = "click";
	}
	($("#slider-inner" + parms.name)[0]).addEventListener(eventName,
			function(event) {
				params = selectClor(targetDiv, parms.type);
				eventSelect(parms.type, params);
			}, false);
}
//根据控件类型执行不同的方法
function eventSelect(t, params) {
	if (t == 'hsl') {
		oimscanvas.changing(function() {
			oimscanvas.hsl(params, "");
		});
	} else if (t == 'bc') {
		oimscanvas.changing(function() {
			oimscanvas.bc(params, "");
		});
	} else if (t == 'color') {
		oimscanvas.changing(function() {
			oimscanvas.color(params, "");
		});
	} else if (t == 'pixelate') {
		oimscanvas.changing(function() {
			oimscanvas.pixelate(params, "");
		});
	} else if (t == 'sharpen') {
		oimscanvas.changing(function() {
			oimscanvas.sharpen(params, "");
		});
	} else if (t == 'blur') {
		oimscanvas.changing(function() {
			oimscanvas.blur(params, "");
		});
	}
}

//var dt, dl, bc = false, eventLeiXing;
//$("#div_main_img")  aa表示包含canvas的div的id
//oDiv 表示包含canvas的div对象
//w 表示包含canvas的div的宽
//h 表示包含canvas的div的高
//show_t_f 表示两个手指是否都在canvas上
var dt,dl,bc = false,eventLeiXing,oDiv,w,h,show_t_f = false;
function handlerDown(e) {
	if (eventLeiXing.down == "touchstart") {
		dt = e.touches[0].clientY - $("#div_main_img").offset().top
				+ $(".picshow").offset().top;
		dl = e.touches[0].clientX - $("#div_main_img").offset().left
				+ $(".picshow").offset().left;
	} else {
		dt = e.clientY - $("#div_main_img").offset().top
				+ $(".picshow").offset().top;
		dl = e.clientX - $("#div_main_img").offset().left
				+ $(".picshow").offset().left;
	}
	bc = true;
	document.addEventListener(eventLeiXing.up,handlerUp,false);
    document.addEventListener(eventLeiXing.move,handlerMove,false);
	var array_div=$("#div_main_img div");
	$.each(array_div,function(i,div){
		if(i!=0)
		$(div).css("border","");
	});
};
function handlerUp(e) {
	bc = false;
	var array_div=$("#div_main_img div");
	$.each(array_div,function(i,div){
		if(i!=0){
		    if(div.id==$(currentDiv)[0].id)
			   $(div).css("border","2px solid red");
		    else
		    	$(div).css("border","2px solid green");
		}
	});
};
function handlerMove(e) {
	if (!bc)
		return;
	if (eventLeiXing.down == "touchstart") {
		if(e.touches&&e.touches.length>1&&(e.touches[1].target.tagName.toLowerCase() != "canvas" || e.touches[0].target.tagName.toLowerCase() != "canvas")){
			show_t_f = true;
		}else{
			show_t_f = false;
		}
		$("#div_main_img").css({
			top : e.touches[0].clientY - dt,
			left : e.touches[0].clientX - dl
		});
	} else {
		$("#div_main_img").css({
			top : e.clientY - dt,
			left : e.clientX - dl
		});
	}
};
function gestureDown(e){
  w = $(oDiv).width();
  h = $(oDiv).height();
}
function gestureMove(e){
	if(!show_t_f){
		if($(oDiv).width() >=  500 || $(oDiv).height() >= 300){
			$(oDiv).width(w*e.scale);
			$(oDiv).height(h*e.scale);
		}else if(e.scale>1){
			$(oDiv).width(w*e.scale);
			$(oDiv).height(h*e.scale);
		}
		e.target.style.webkitTransform = 'scale(' + e.scale + ')'; 
	}

}

function touchDong(divContent, events, drag) {
	eventLeiXing = events;
	oDiv = divContent;
	if (drag) {
		divContent.addEventListener(events.down, handlerDown, false);
		divContent.addEventListener("gesturestart",gestureDown,false);
	    divContent.addEventListener("gesturechange",gestureMove,false);
	} else {
		divContent.removeEventListener(events.down, handlerDown, false);
		divContent.removeEventListener(events.up, handlerUp, false);
		divContent.removeEventListener(events.move, handlerMove, false);
		divContent.removeEventListener("gesturestart",gestureDown,false);
        divContent.removeEventListener("gesturechange",gestureMove,false);
	}
}

//ipad 触屏之类的end
