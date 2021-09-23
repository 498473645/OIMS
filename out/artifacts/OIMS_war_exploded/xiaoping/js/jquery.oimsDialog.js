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
 *     remove_length:true,//删除几个覆盖层
 *     button:[
 *        {
			title : "提交",//按纽文字
			func : onsubmit,//响应函数
			isCloseWin:true,//点击后，是否关闭窗口 true关闭，false不关闭
			className : "ok"//指定CSS名称
		  };
 *     ]
 * });
 */
;(function($) {
    var wo={
            icon:"openwinicon",
            drag:false,
            width:360,
            height:200,
            locked:true
        };
    $.oimsSucc = function(str,func){
        var div = $("<p />").text(str).appendTo("body");
        wo.winType=0;
        wo.title="成功";
        wo.divChild = div;
        div.oimsDialog(wo,func);
    };
    $.oimsSucc2 = function(str,func){
        var div = $("<p />").text(str).appendTo("body");
        wo.winType=-1;
        wo.title="成功";
        wo.divChild = div;
        div.oimsDialog(wo,func);
    };
    $.oimsAlert = function(str,func){
        var div = $("<p />").text(str).appendTo("body");
        wo.winType=1;
        wo.title="警告";
        wo.divChild = div;
        div.oimsDialog(wo,func);
    };
    //错误
    
    $.oimsError = function(str,func){
        var div = $("<p />").text(str).appendTo("body");
        wo.winType=2;
        wo.title="错误";
        wo.divChild = div;
        div.oimsDialog(wo,func);
    };
    //
    $.oimsConfirm = function(options,func0,func1){
        var div = $("<p />").text(options.strTitle).appendTo("body");
        wo.winType=3;
        wo.title="确认";
        wo.divChild = div;
        wo.remove_length = options.remove_length;
        return div.oimsDialog(wo,func0,func1);
    };
    $.fn.oimsDialog = function(setting,func0,func1) {
        var title = setting.title;// 窗口标题
        var winType = setting.winType;// 窗口类型:0为info,1为alert,2为error,3为confirm
        var closeButton = setting.closeButton;
        var maxButton = setting.maxButton;
        var minButton = setting.minButton;
        var current = this;
        var winIcon = setting.icon;// 窗口图标
        var width = setting.width;
        var height = setting.height;
        var drag = setting.drag;
        var button = setting.button;// 按纽
        var locked = setting.locked;// 弹窗时是否锁屏
        var divChild = setting.divChild;//显示内容
        var windowHeight = $(window).height();
        var win, tt, tbt,maxb,bc=false,dt,dl,content;
        if(locked) {
            $("<div />").addClass("lockedBackground").css({
                top : 0,
                left : 0,
                position : "absolute",
                width : "100%",
                height : windowHeight,
                "z-index":10000,
                background:"#ccc",
                filter:"alpha(opacity=60)",
                opacity:0.6
            }).appendTo("body");
        }
        var maxb = null;
        var okButton = {
            title :"确认",
            func : func0,
            className : "qd"
        };
        var cancelButton = {
            title : "取消",
            func : func1,
            className : "qx"
        };
        showWin();
        if(drag)addDrag();
        function addDrag(){
            var x = $("<div />").appendTo(win);
            $(win).mousedown(function(e){
                dt = e.clientY - $(win).offset().top;
                dl = e.clientX - $(win).offset().left;
                bc=true;
            });
            $(win).mouseup(function(event){
                bc = false;
            });
            $(win).mousemove(function(e){
                if(!bc)return;
                $(win).css({top:e.clientY-dt,left:e.clientX-dl});
            });
        }
        
        function showWin() {
            if(width==undefined)width=$(window).width()*0.8;
            if(height==undefined)height = $(window).height()*0.8;
            win = $("<div />").addClass("xpopenWin").css({
                position : "absolute",
                top : ($(window).height()-height)/2,
                left : ($(window).width()-width)/2,
                "z-index":10001
            }).appendTo("body");
            tt = $("<div />").addClass("titlexp").appendTo(win);
            tbt = $("<span />").addClass("close").appendTo(tt);
            $("<span />").addClass("icon").addClass(winIcon).appendTo(tt);
            $(tt).append(title);
            content=$("<div />").addClass("opencontant").appendTo(win).append(current);
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
				winClass = "warning";
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
				$(tbt).click(function() {
					closeWin(setting);
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
			var bt;
			if(winType==3){
			  bt = $("<div />").addClass("btn btn1").appendTo(win);	
			}else{
				 bt = $("<div />").addClass("btn").appendTo(win);		
			}
			 
			$.each(button, function(i,d) {
				var a = $("<a />").attr("href","#").appendTo(bt);
				$("<span />").addClass(d.className).appendTo(a);
				$(a).append(d.title);
				$(a).click(function() {
					var x=false;
					if (typeof (d.func) == "function") {
						x=d.func();
					}
					if(x||d.isCloseWin==undefined || d.isCloseWin == true)closeWin(setting) ;
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
		
		function closeWin(options){
			$(win).remove();
			if($(".lockedBackground").length>1){
				if(options.winType == 1 || options.winType == -1|| options.winType == -2){
					$($(".lockedBackground")[1]).remove();
				}else if(setting.remove_length){
					$($(".lockedBackground")[1]).remove();
					setting.remove_length = false;
				}
				else{
					$(".lockedBackground").remove();
				}
			}else{
				$(".lockedBackground").remove();
			}
		}
		$(window).resize(function(){
			var heightNum = $(window).height();
			var widthNum = $(window).width();
			var openWin = $(".xpopenWin");
			for(var i = 0, length = openWin.length;i<length;i++){
				var j_openWin = $(openWin[i]);
				j_openWin.css({"top":(heightNum-j_openWin.height())/2,left:(widthNum-j_openWin.width())/2});
			}
			$(".lockedBackground").css({width:"100%",height:heightNum});
		});
		return {close:function(){closeWin(setting);}};
		
	};
})(jQuery);
