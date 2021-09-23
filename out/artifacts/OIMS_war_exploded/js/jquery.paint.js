;(function($) {
	var PAINT_SAVE_URL;
	var param;//保存时传送的对象
	var paintMovie=null;
	var paintDiv;
	var normalPhoto;
	var loadImg;
	var saveCallBack;
	var tip;
	var tipWidth='45';
	$.fn.paint = function(setting) {
		paintDiv = $("<div />").attr("id","_paintMovieDiv").addClass("paintDiv").appendTo($(this));
		param = setting.param;
		PAINT_SAVE_URL = setting.paintSaveUrl;
		saveCallBack = setting.saveCallBack;
		normalPhoto = setting.normalPhoto;
		loadImg = setting.loadImg;
		tip = setting.tip;
		if(setting.tipWidth!=undefined && setting.tipWidth>0)tipWidth = setting.tipWidth;
		showMovie();
		showBtn();
		return {
			close:function(){
				paintDiv.hide().remove();
			},
			setParam:function(d){
				param=d
			}, 
			setTip:function(t){
				tip = t;
			},
			loadImg:function(path){
				loadMyImg(path);
			},
			setNormalImg:function(path){
				normalPhoto = path;
			}
			};
	}
	function loadMyImg(path){
		if(path==null){
			path = normalPhoto;
		}
		loadImg = path;
		paintMovie.flash(function(){
				try{
					this.loadPhoto({url:path,tip:tip,tipWidth:tipWidth});
				}catch(e){
					paintDiv.text("");
					showMovie();
					showBtn();
//					if(i<3)setTimeout(function(){loadMyImg(path,i++)},200);
				}
		});
	}
	function showMovie(){
		paintMovie = $("<div />").appendTo(paintDiv);
		paintMovie.flash({
					swf: '../swf/mypaint.swf',
					width: paintDiv.innerWidth(),
					height: paintDiv.innerHeight()-30,
					play: false,
					flashvars: {
						url:loadImg,
						tip:tip|| '',
						tipWidth:tipWidth,
						saveCallBackFunc:saveCallBack
					}
		});
	}
	function getParam(){
		return param;
	}
	function setParam(obj){
		param = obj;
	}
	function showBtn(){
		var btnDiv = $("<div />").addClass("paintBtn").height(30).appendTo(paintDiv);
		$("<a />").text("保存").click(function(){
				paintMovie.flash(function(){
					//if(debugFlag) //console.log(PAINT_SAVE_URL);
					this.save(PAINT_SAVE_URL,param);
				});
		}).appendTo(btnDiv);
		$("<a />").text("重画").click(function(){
			paintMovie.flash(function(){
				this.loadPhoto({url:normalPhoto,tip:tip,tipWidth:tipWidth});
			});
		}).appendTo(btnDiv);
		$("<span />").addClass("bichuDiff").click(function(){changePenSize(false);}).appendTo(btnDiv);
		var input = $("<input />").blur(function(){changePenSize(null);}).val(1).appendTo(btnDiv);
		$("<span />").addClass("bichuAdd").click(function(){changePenSize(true);}).appendTo(btnDiv);
		$("<span />").css("background","#000").data("color","#000000").addClass("paintColor").appendTo(btnDiv);
		$("<span />").css("background","#ff0000").data("color","#ff0000").addClass("paintColor").addClass("on").appendTo(btnDiv);
		$("<span />").css("background","#FFFF00").data("color","#FFFF00").addClass("paintColor").appendTo(btnDiv);
		$("<span />").css("background","#0000FF").data("color","#0000FF").addClass("paintColor").appendTo(btnDiv);
		$("<span />").css("background","#00EE00").data("color","#00EE00").addClass("paintColor").appendTo(btnDiv);
		function changePenSize(add){
			if(isNaN(input.val()))input.val(1);
			var size=parseInt(input.val());
			if(add!=null){
				if(add)
					++size;
				else
					--size;
				if(size==0)size=1;
			}
			paintMovie.flash(function(){
				this.setPenSize(size);
				input.val(size);
			});
		}
		$("span.paintColor").click(function(){
			var color=$(this).data("color");
			paintMovie.flash(function(){
				this.setPenColor(color);
			})
			btnDiv.children(".on").removeClass("on");
			$(this).addClass("on");
		});
		$(".paintBtn").children("span").mouseover(function(){
			if(!$(this).hasClass("on"))
				$(this).css("border","2px solid #666");
		}).mouseout(function(){
			if(!$(this).hasClass("on"))$(this).css("border","none");
		})
	}
})(jQuery);