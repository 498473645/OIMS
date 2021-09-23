/**
 * 弹出窗口插件
 * @author Li Yan
 * 用法举例：
 * var div=$("<div />").text("Hello word!").appendTo("body");
 * $(div).oimsDialog({
 *     icon:view,//窗口图标
 *     title:"This is a test",//窗口标题
 *     drag:true,//是否允许拖动窗口
 *     locked:true,//是否锁屏
 *     closeCallback:function,//关闭回调
 *     button:[
 *        {
			title : "提交",//按纽文字
			func : onsubmit,//响应函数
			isCloseWin:true,//点击后，是否关闭窗口 true关闭，false不关闭
			className : "ok"//指定CSS名称
		  }
 *     ]
 * });
 */
;(function($) {	
    var wo={
            icon:"openwinicon",
            drag:true,
            width:360,
            height:200,
            locked:true
        };
    $.oimsSucc = function(str,func){
//    	debugger;
        var div = $("<p />").text(str).appendTo("body");
        wo.winType=0;
        wo.title=language.Succ;
        wo.divChild = div;
        div.oimsDialog(wo,func);
    };
    $.oimsSucc2 = function(str,func){
        var div = $("<p />").text(str).appendTo("body");
        wo.winType=-1;
        wo.title=language.Succ;
        wo.divChild = div;
        div.oimsDialog(wo,func);
    };
    $.oimsAlert = function(str,func){
        var div = $("<div />").html(str).appendTo("body");
        wo.winType=1;
        wo.title="提示";//language.Alert;
        wo.divChild = div;
        div.oimsDialog(wo,func,func);
    };
    
    $.prompt = function(str,func){
    	var div = $("<p />").text(str).appendTo("body");
    	
    	//TODO
    }
    //错误
    $.oimsError = function(str,func){
        var div = $("<p />").text(str).appendTo("body");
        wo.winType=2;
        wo.title=language.Error;
        wo.divChild = div;
        div.oimsDialog(wo,func);
    };
    //确认
    $.oimsConfirm = function(options,func0,func1){ 
//    	debugger;
    	var title = (typeof(options)=='string') ? options : options.strTitle;
        var div = $("<div />").html(title).appendTo("body");
        wo.winType=3;
        wo.title=language.Confirm;
        wo.divChild = div;
        wo.option= options;
        return div.oimsDialog(wo,func0,func1);
    };
    $.oimsXZ=function(options,func0,func1,func2){
    	var title = (typeof(options)=='string') ? options : options.strTitle;
        var div = $("<div />").html(title).css('padding','10px 10px').appendTo("body");
        wo.winType=-3;
        wo.title= "请确认" //language.Confirm;
        wo.divChild = div;
        return div.oimsXuZhen(wo,func0,func1,func2);
    };
    $.fn.oimsXuZhen=function(setting,func0,func1,func2){

        var title = setting.title;// 窗口标题
        var winType = setting.winType;// 窗口类型:0为info,1为alert,2为error,3为confirm
        var closeButton = setting.closeButton;
        var maxButton = setting.maxButton;
        var minButton = setting.minButton;
        var current = this;
        //var winIcon = setting.icon;// 窗口图标
        var width = setting.width;
        var height = setting.height;
        var drag = setting.drag;
        var button = setting.button;// 按纽
        var locked = setting.locked;// 弹窗时是否锁屏
        var divChild = setting.divChild;//显示内容
//        var removeLength = setting.remove_length;
        var windowHeight = $(window).height();
        var win, tt, tbt,maxb,bc=false,dt,dl,content;
        var lockedDiv=null;
        //if (winType == undefined || winType == null)
        //    winType = 0;
        if (locked) {
        	lockedDiv = $("<div />").addClass("lockedBackground").css({
                top : 0,
                left : 0,
                position : "absolute",
                width : "100%",
                height : windowHeight,
                "z-index":$("div").length+1,
                background:"#ccc",
                filter:"alpha(opacity=60)",
                opacity:0.6
            }).appendTo("body");
        }
        var maxb = null;
        var okButton = {
            title : "续诊",
            func : func0,
            className : "submit",
        };
        var cancelButton = {
            title : "新建",
            func : func1,
           // className : "cancel",
            isCloseWin : true
        };
        var viewButton = {
                title : "查看",
                func : func2,
                isCloseWin : true
            };
        showWin();
        if(drag)addDrag();
        function addDrag(){
            var x = $("<div />").appendTo(win);
            $(win).mousedown(function(e){
                dt = e.clientY - $(win).offset().top;
                dl = e.clientX - $(win).offset().left;
                $(document).mouseup(function(event){
                	$(document).unbind("mouseup");
                	$(document).unbind("mousemove");
                });
                $(document).mousemove(function(e){
        			var oEvent=e||event;
        			var l=oEvent.clientX-dl;
        			var t=oEvent.clientY-dt;
                    if(t<0){
                    	t = 0;
                    }else if(t>document.documentElement.clientHeight-($(win)[0]).offsetHeight){
                    	t= document.documentElement.clientHeight-($(win)[0]).offsetHeight;
                    }
                    	
                    if(l<0){
                    	l = 0;
                    }else if(l>document.documentElement.clientWidth-($(win)[0]).offsetWidth){
                    	l = document.documentElement.clientWidth-($(win)[0]).offsetWidth;
                    }
                    
                    $(win).css({top:t,left:l});
                });
                return false;
            });
        }
        
        function showWin() {
//        	debugger;
            if(width==undefined)width=$(window).width()*0.8;
            if(height==undefined)height = $(window).height()*0.8;
            win = $("<div />").addClass("openWin").css({
                position : "absolute",
                top : ($(window).height()-height)/2,
                left : ($(window).width()-width)/2,
                width:width,
                height:height,
                "z-index":$("div").length+1
            }).appendTo("body");
            tt = $("<div />").addClass("opentitle").appendTo(win);
            tbt = $("<div />").addClass("closediv").appendTo(tt);
            //$("<span />").addClass("viewIcon").addClass(winIcon).appendTo(tt);
            $(tt).append(title);
            content=$("<div />").addClass("opencontent").appendTo(win).append(current);
            var contHeight = win.height()-tt.outerHeight();
			content.height(contHeight);
            showTitleButton();
            setWinType();
            showButton();
        }

		function setWinType() {
			var winClass;
			switch (winType) {
			case 0:
				if (button == undefined || button == null)
					button = [ okButton ];
				winClass = "success";
				break;
			case 1:
				if (button == undefined || button == null)
					button = [ okButton ];
				winClass = "alert";
				break;
			case 2:
				if (button == undefined || button == null)
					button = [ okButton ];
				winClass = "error";
				break;
			case 3:
				if (button == undefined || button == null)
					button = [ okButton, cancelButton,viewButton ];
				winClass = "confirm";
				break;
			case -1:
				if (button == undefined || button == null)
					button = [ okButton];
				winClass = "success";
				break;
			case -2:
				winClass = "normal";
				break;
			case -3:
				if (button == undefined || button == null)
					button = [ okButton, cancelButton,viewButton ];
				break;
			default:
				winClass = "normal";
			}
			win.addClass(winClass);
		}
		
		function showTitleButton() {
			if (closeButton == undefined || closeButton) {
				$("<a />").addClass("close").appendTo(tbt).click(function() {
					closeWin();
//					var closeCallback = setting.closeCallback;
//					if(closeCallback!=undefined && closeCallback!=null)closeCallback();
//					if(func1!=undefined && func1!=null)return func1();
				});
			}
			if (maxButton) {
				maxb=$("<a />").addClass("big").appendTo(tbt).bind('click',function() {
					max();
				});
				$(tt).bind("dblclick",function(){max()});
			}
			if (minButton) {
				$("<a />").addClass("small").appendTo(tbt).click(function() {
					min();
				});
			}
		}
		
		function showButton() {
			if (button == undefined || button == null || button=="")
				return;
			var bt = $("<div />").addClass("openbutton").appendTo(win);
			$.each(button, function(i,d) {
				var a = $("<a />").appendTo(bt);
				//$("<span />").addClass(d.className).appendTo(a);
				$(a).append(d.title);
				$(a).click(function() {
					var x=true;
					if (typeof (d.func) == "function") {
						try{
							d.func();
						}catch(e){
							alert(e);
							x=false;
						}
					}
//					console.log("x:"+x+",isCloseWin:"+d.isCloseWin);
					if(x && (d.isCloseWin==undefined || d.isCloseWin))closeWin() ;
				});
			});
			var contHeight = win.height()-bt.outerHeight()-tt.outerHeight();
			content.height(contHeight);
			var Childheight = (contHeight - $(divChild).outerHeight())/2;
			$(divChild).css("paddingTop",Childheight);
		}

		function max() {
			$(win).width($(window).width()-2).height($(window).height()-2).css({top:0,left:0});
			$(maxb).unbind();
			$(maxb).removeClass("big").addClass("biga").bind('click',
					function() {
						normal();
					});
			$(tt).unbind();
			$(tt).bind("dblclick",function(){normal();});
		}

		function normal() {
			$(win).width(width).height(height).css({top : ($(window).height()-height)/2,
				left : ($(window).width()-width)/2});
			$(maxb).unbind();
			$(maxb).removeClass("biga").addClass("big").bind('click',
					function() {
						max();
					});
		}
		
		function closeWin(){	
			if($("#pgChart").get(0))$("#pgChart").disposeFusionCharts() ; 	
			$(win).remove();
			if(lockedDiv!=null)lockedDiv.remove();
			if($(".lockedBackground").length && !$(".opencontent").length)$(".lockedBackground").remove();
		}
		
		$(window).resize(function(){
			var heightNum = $(window).height();
			var widthNum = $(window).width();
			var openWin = $(".openWin");
			for(var i = 0, length = openWin.length;i<length;i++){
				var j_openWin = $(openWin[i]);
				j_openWin.css({"top":(heightNum-j_openWin.height())/2,left:(widthNum-j_openWin.width())/2});
			}
			if(lockedDiv!=null)lockedDiv.css({width:"100%",height:heightNum});
		});
		return {close:function(){closeWin();}};
		
	
    };
    $.fn.oimsDialog = function(setting,func0,func1) {
//    	debugger    	
        var title = setting.title;// 窗口标题
        var winType = setting.winType;// 窗口类型:0为info,1为alert,2为error,3为confirm
        var closeButton = setting.closeButton;
        var maxButton = setting.maxButton;
        var minButton = setting.minButton;
        var current = this;
        //var winIcon = setting.icon;// 窗口图标
        var width = setting.width;
        var height = setting.height;
        var drag = setting.drag;
        var button = setting.button;// 按纽
        var locked = setting.locked;// 弹窗时是否锁屏
        var divChild = setting.divChild;//显示内容
//        var removeLength = setting.remove_length;
        var windowHeight = $(window).height();
        var win, tt, tbt,maxb,bc=false,dt,dl,content;
        var lockedDiv=null;
        var option = setting.option;
        //if (winType == undefined || winType == null)
        //    winType = 0;
        if (locked) {
        	lockedDiv = $("<div />").addClass("lockedBackground").css({
                top : 0,
                left : 0,
                position : "absolute",
                width : "100%",
                height : windowHeight,
                "z-index":$("div").length+1,
                background:"#ccc",
                filter:"alpha(opacity=60)",
                opacity:0.6
            }).appendTo("body");
        }
        var maxb = null;
        var okButton = {
            title : language.Confirm,
            func : func0,
            className : "submit",
        };
        var cancelButton = {
            title : language.Cancel,
            func : func1,
            className : "cancel",
            isCloseWin : true
        };
//        alert(setting.option);
        showWin(option);
        if(drag)addDrag();
        function addDrag(){
            var x = $("<div />").appendTo(win);
            $(win).mousedown(function(e){
                dt = e.clientY - $(win).offset().top;
                dl = e.clientX - $(win).offset().left;
                $(document).mouseup(function(event){
                	$(document).unbind("mouseup");
                	$(document).unbind("mousemove");
                });
                $(document).mousemove(function(e){
        			var oEvent=e||event;
        			var l=oEvent.clientX-dl;
        			var t=oEvent.clientY-dt;
                    if(t<0){
                    	t = 0;
                    }else if(t>document.documentElement.clientHeight-($(win)[0]).offsetHeight){
                    	t= document.documentElement.clientHeight-($(win)[0]).offsetHeight;
                    }
                    	
                    if(l<0){
                    	l = 0;
                    }else if(l>document.documentElement.clientWidth-($(win)[0]).offsetWidth){
                    	l = document.documentElement.clientWidth-($(win)[0]).offsetWidth;
                    }
                    
                    $(win).css({top:t,left:l});
                });
                return false;
            });
        }
        
        function showWin(option) {
//        	debugger;
            if(width==undefined)width=$(window).width()*0.8;
            if(height==undefined)height = $(window).height()*0.8;
            win = $("<div />").addClass("openWin").css({
                position : "absolute",
                top : ($(window).height()-height)/2,
                left : ($(window).width()-width)/2,
                width:width,
                height:height,
                "z-index":$("div").length+5
            }).appendTo("body");
            tt = $("<div />").addClass("opentitle").appendTo(win);
            tbt = $("<div />").addClass("closediv").appendTo(tt);
            //$("<span />").addClass("viewIcon").addClass(winIcon).appendTo(tt);
            $(tt).append(title);
            content=$("<div />").addClass("opencontent").appendTo(win).append(current);
            var contHeight = win.height()-tt.outerHeight();
			content.height(contHeight);
            showTitleButton();
            setWinType();
            if(title == "确认"|| title =="提示" || title == '成功' || title == '错误'){
//            	alert(1);
            	showButton1();
            }else{            	
            	showButton();
            }
        }

		function setWinType() {
//			debugger;
			var winClass;
			switch (winType) {
			case 0:
				if (button == undefined || button == null)
					button = [ okButton ];
				winClass = "success";
				break;
			case 1:
				if (button == undefined || button == null)
					button = [ okButton ];
				winClass = "alert";
				break;
			case 2:
				if (button == undefined || button == null)
					button = [ okButton ];
				winClass = "error";
				break;
			case 3:
				if (button == undefined || button == null)
					button = [ okButton, cancelButton ];
				winClass = "confirm";
				break;
			case -1:
				if (button == undefined || button == null)
					button = [ okButton];
				winClass = "success";
				break;
			case -2:
				winClass = "normal";
				break;
			default:
				winClass = "normal";
			}
			win.addClass(winClass);
		}
		
		function showTitleButton() {
			if (closeButton == undefined || closeButton) {
				$("<a />").addClass("close").appendTo(tbt).click(function() {
					closeWin();
					var closeCallback = setting.closeCallback;
					if(closeCallback!=undefined && closeCallback!=null)closeCallback();
					if(func1!=undefined && func1!=null)return func1();
				});
			}
			if (maxButton) {
				maxb=$("<a />").addClass("big").appendTo(tbt).bind('click',function() {
					max();
				});
				$(tt).bind("dblclick",function(){max()});
			}
			if (minButton) {
				$("<a />").addClass("small").appendTo(tbt).click(function() {
					min();
				});
			}
		}
		function showButton1() {
//			debugger;
			if (button == undefined || button == null || button=="")
				return;
			var bt = $("<div />").addClass("openbutton").appendTo(win);
			$.each(button, function(i,d) {
				var a = $("<a />").appendTo(bt);
				/*$("<span />").addClass(d.className).appendTo(a);*///退出确认
				$(a).append(d.title);
				$(a).click(function() {
					var x=true;
					if (typeof (d.func) == "function") {
						try{
							d.func();
						}catch(e){
							alert(e);
							x=false;
						}
					}
//  				console.log("x:"+x+",isCloseWin:"+d.isCloseWin);
					if(x && (d.isCloseWin==undefined || d.isCloseWin))closeWin() ;
				});
			});
			var contHeight = win.height()-bt.outerHeight()-tt.outerHeight()-10;
			content.height(contHeight);
			var Childheight = (contHeight - $(divChild).outerHeight())/2;
			$(divChild).css("paddingTop",Childheight);
		}
		function showButton() {
//			debugger;
			if (button == undefined || button == null || button=="")
				return;
			var bt = $("<div />").addClass("openbutton").appendTo(win);			
			$.each(button, function(i,d) {
//				debugger;
				var a = $("<a />").appendTo(bt);				
				if(i == 0){
					a.addClass("a1");
					a.append("<span><img src='../images/tbyf/icon-bc.png'></span>");
				}else {
//					var a = $("<a />").addClass("a1").addCss("margin-left:40px;").appendTo(bt);			
					a.append("<span ><img src='../images/tbyf/icon-cz.png'></span>");
				}
				/*$("<span />").addClass(d.className).appendTo(a);*///退出确认
				
				$(a).append(d.title);
				$(a).click(function() {
					var x=true;
					if (typeof (d.func) == "function") {
						try{
							d.func();
						}catch(e){
							alert(e);
							x=false;
						}
					}
//  				console.log("x:"+x+",isCloseWin:"+d.isCloseWin);
					if(x && (d.isCloseWin==undefined || d.isCloseWin))closeWin() ;
				});
			});
			var contHeight = win.height()-bt.outerHeight()-tt.outerHeight()-10;
			content.height(contHeight);
			var Childheight = (contHeight - $(divChild).outerHeight())/2;
			$(divChild).css("paddingTop",Childheight);
		}

		function max() {
			$(win).width($(window).width()-2).height($(window).height()-2).css({top:0,left:0});
			$(maxb).unbind();
			$(maxb).removeClass("big").addClass("biga").bind('click',
					function() {
						normal();
					});
			$(tt).unbind();
			$(tt).bind("dblclick",function(){normal();});
		}

		function normal() {
			$(win).width(width).height(height).css({top : ($(window).height()-height)/2,
				left : ($(window).width()-width)/2});
			$(maxb).unbind();
			$(maxb).removeClass("biga").addClass("big").bind('click',
					function() {
						max();
					});
		}
		
		function closeWin(){	
			if($("#pgChart").get(0))$("#pgChart").disposeFusionCharts() ; 	
			$(win).remove();
			if(lockedDiv!=null)lockedDiv.remove();
			if($(".lockedBackground").length && !$(".opencontent").length)$(".lockedBackground").remove();
		}
		
		$(window).resize(function(){
			var heightNum = $(window).height();
			var widthNum = $(window).width();
			var openWin = $(".openWin");
			for(var i = 0, length = openWin.length;i<length;i++){
				var j_openWin = $(openWin[i]);
				j_openWin.css({"top":(heightNum-j_openWin.height())/2,left:(widthNum-j_openWin.width())/2});
			}
			if(lockedDiv!=null)lockedDiv.css({width:"100%",height:heightNum});
		});
		return {close:function(){closeWin();}};
		
	};
})(jQuery);
