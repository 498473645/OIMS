/*$(document).ready(function(){
	showTestButton();
	showSWF();
});*/
var flash;
var divmain;
var timer;
var savephotopath="";
function showTestButton(){
	var backdiv=$("<div />").attr("class","backdiv").attr("id","div_back");
	backdiv.css({
		"position": "fixed",
		"left": "0px",
		"top": "0px",
		"width": "100%",
		"height": "100%",
		"background-color": "rgb(12, 11, 11)",
		"opacity": "0.5",
		"z-index": "9998"
	});
	backdiv.appendTo("body");
	divmain=$("<div />").attr("id","divmain").appendTo("body");
	divmain.css({
			"background-color": "rgb(247, 247, 247)",
			"width": "475px",
			"height": "380px",
			"padding-top": "20px",
			"z-index": "9999",
			"position": "fixed",
			"top": "50px"
		}
	);
	var mainLeft=($(document.body).width()-divmain.width())/2;
	divmain.css("left",(Math.floor(mainLeft)).toString()+"px");//设置居中
	
	var divtopbar=$('<div />').attr('class','topbar').attr('id','top_bar').appendTo(divmain);
	divtopbar.css({
		"height":"30px",
		"width":"100%",
		"margin-top":"-20px",
		"background-image":"url("+getContextPath()+"/style/green/images/topbar.jpg)",
		"background-repeat":"repeat-x",
		"background-position": "center",
		"margin-bottom":"10px"
	});
	var closetop=$('<a />').appendTo(divtopbar);
	closetop.css({
		"display":"block",
		"background-image":"url("+getContextPath()+"/style/green/images/close.png)",
		"background-repeat":"no-repeat",
		"background-position":"center",
		"margin-right":"10px",
		"height":"24px",
		"width":"24px",
		"float":"right",
		"margin-top":"2px",
		"cursor": "pointer"
	}).hover(function(){
		$(this).css({
			"background-image":"url("+getContextPath()+"/style/green/images/close1.png)"
		});
	}).mouseout(function(){
		$(this).css({
			"background-image":"url("+getContextPath()+"/style/green/images/close.png)"
		});
	}).attr({"title":"关闭"});
	closetop.click(function(){
		closephoto();
	});
	var captionlogo=$('<span />').appendTo(divtopbar);
	captionlogo.css({
		"display":"inline-block",
		"background-image":"url("+getContextPath()+"/style/green/images/photologo.png)",
		"background-repeat":"no-repeat",
		"height":"24px",
		"width":"24px",
		"background-position":"center",
		"margin-left":"5px"
	});
	var caption=$('<span />').text("拍照").appendTo(divtopbar);
	caption.css({
		"color": "rgb(71, 71, 71)",
		"display": "inline-block",
		"margin-left": "5px",
		"margin-top": "5px",
		"font-size": "15px",
		"font-weight": "bold"
	});
	
	var div = $("<div />").attr("id","testButton").appendTo(divmain);
	div.css({
		"marginLeft": "250px",
		"cursor": "pointer",
		"height":"15px"
	});

	var spancss={
		"background":"url("+getContextPath()+"/style/green/images/save.png) no-repeat center right",
		"width": "16px",
		"height": "16px",
		"float": "left"
	};
	var ld0=$("<a />").appendTo(div);
	var ld0icon = $("<span />").css(spancss).appendTo(ld0);
	ld0icon.css({
		"background":"url("+getContextPath()+"/style/green/images/photo.png) no-repeat center right",
		"marginRight":"5px"
	});
	ld0.html(ld0.html()+"拍照");
	ld0.css({
		"float":"left",
		"width":"60px",
		"display":"block"
	});
	ld0.click(function(){
		flash.camera();
	});


	var ld1=$("<a />").appendTo(div);
	var ld1icon = $("<span />").css(spancss).appendTo(ld1);
	ld1icon.css({
		"background":"url("+getContextPath()+"/style/green/images/rephoto.png) no-repeat center right",
		"marginRight":"5px"
	});
	ld1.html(ld1.html()+"重拍");
	ld1.css({
		"float":"left",
		"width":"60px",
		"display":"block"
	});
	ld1.click(function(){
		flash.reset();
	});

	var cut = $("<a />").appendTo(div);
	var cuticon =$("<span />").css(spancss).appendTo(cut);
	cuticon.css({
		"background":"url("+getContextPath()+"/style/green/images/cut1.png) no-repeat center right",
		"marginRight":"5px"
	});
	cut.html(cut.html()+"切图");
	cut.css({
		"float":"left",
		"width":"60px",
		"display":"block"
	});
	cut.click(function(){
		flash.cutPhoto();
	});

	/*var save = $("<a />").appendTo(div);
	var saveicon = $("<span />").css(spancss).appendTo(save);
	saveicon.css({
		"background":"url("+contextPath+"/style/green/images/save.png) no-repeat center right",
		"marginRight":"5px"
	});
	save.html(save.html()+"保存");
	save.css({
		"float":"left",
		"width":"60px",
		"display":"block"
	});
	save.click(function(){
		flash.uploadPhoto();
	});*/


	$("#Camera").css("height","450px");
	$("#testButton a").css({
		"color":"#4f4f4f",
		"background":"url("+getContextPath()+"/style/green/images/line.png) no-repeat center right",
		"height":"22px"
	}).last().css({
		"color":"#4f4f4f",
		"height":"22px"
	});
	$("span").css({
		"color": "rgb(71, 71, 71)",
		"margin-top":"-1px",
		"margin-left": "4px"
	});
	$("#testButton a").hover(function (){
		$(this).css({
			"background":"url("+getContextPath()+"/style/green/images/btnbg.png) repeat-x center right",
			"border-style": "solid",
			"border-width": "1px",
			"border-color": "gray"
		}).siblings().css({
			"float": "left",
			"width": "60px",
			"display": "block",
			"color": "rgb(79, 79, 79)",
			"background-image": "url("+getContextPath()+"/style/green/images/line.png)",
			"background-position": "100% 50%",
			"background-repeat": "no-repeat no-repeat",
			"border-width":"0px",
			"height":"20px"
		});

	});
	timer=setInterval(testFlash,500);
}

function testFlash(){
	if(flash){
		if(flash.camera){
			$("testButton").disabled=false;
			clearInterval(timer);
		}
		else{
			$("testButton").disabled=true;
		}
	}
}

function showSWF(){
	var params = {
		allowFullScreen : true,
		allowScriptAccess : "sameDomain",
		quality:"high",
		wmode:"transparent"
	};
	var w = 640;
	var h = 480;
	w=420;
	h=260;
	var div = $("<div />").addClass("picshow").css({width:w,height:h,border:"1px solid #ddd"}).appendTo("body");
	if(divmain){
		div.appendTo(divmain);
		div.css({
			"width": "420px",
			"height": "260px",
			"border": "1px solid rgb(221, 221, 221)",
			"margin": "20px 20px 20px 28px"
		});
	}
	var flashvars = {
			//photoPaths:contextPath+"/style/green/images/1.jpg|"+contextPath+"/style/green/images/2.jpg",//默认加载图片
			//photoMax:3,//最大显示数
			savePhotoUrl:getContextPath()+"/publish/temp/saveTmpFile.htm"
	};
	div.flash({
	        swf:getContextPath()+"/swf/Camera.swf",
	        id:"Camera",
	        width: w, // Recommended
	        height: h, // Recommended
	        flashvars: flashvars, // Optional
	        paremeters: params // Optional
	    });
	 flash = thisMovie("Camera");
	 
	 var span_save=$('<span />').css({
			"background":"url("+getContextPath()+"/style/green/images/save.png) no-repeat center right",
			"width": "16px",
			"height": "16px",
			"float": "left",
			"margin-left":"25px"
		});
	 var a_save=$('<a />').addClass('a_save').append(span_save).css({
		 "background":"url("+getContextPath()+"/style/green/images/bigbtnbg.png) no-repeat center right",
		 "width":"88px",
		 "height":"27px",
		 "margin-left":"50px",
		 "display":"table-cell",
		 "vertical-align": "middle"
	 }).hover(function(){
		 $(this).css({
			 "background":"url("+getContextPath()+"/style/green/images/bigbtnbg1.png) no-repeat center right"
		 }).mouseout(function(){
			 $(this).css({
			 "background":"url("+getContextPath()+"/style/green/images/bigbtnbg.png) no-repeat center right"
			 });});
	 });
	 var divSave=$('<div />').addClass("div_save").append(a_save.html(a_save.html()+"保存"));
	 divSave.css({
		 "margin-left":"100px",
	     "float":"left"
	 }).click(function(){
		 flash.uploadPhoto();
	 });
	 divSave.appendTo(divmain);
	 
	 
	 var span_reset=$('<span />').css({
			"background":"url(../images/menuicon.png) no-repeat -250px -140px",
			"width": "16px",
			"height": "16px",
			"float": "left",
			"margin-left":"25px"
		});
	 var a_reset=$('<a />').addClass('a_save').append(span_reset).css({
		 "background":"url("+getContextPath()+"/style/green/images/bigbtnbg.png) no-repeat center right",
		 "width":"88px",
		 "height":"27px",
		 "margin-left":"50px",
		 "display":"table-cell",
		 "vertical-align": "middle"
	 }).hover(function(){
		 $(this).css({
			 "background":"url("+getContextPath()+"/style/green/images/bigbtnbg1.png) no-repeat center right"
		 }).mouseout(function(){
			 $(this).css({
			 "background":"url("+getContextPath()+"/style/green/images/bigbtnbg.png) no-repeat center right"
			 });});
	 });
	 var divReset=$('<div />').addClass("div_save").append(a_reset.html(a_reset.html()+"重置"));
	 divReset.css({
		 "margin-left":"100px",
		  "float":"left"
	 }).click(function(){
		 flash.reset();
	 });
	 divReset.appendTo(divmain);
}

function thisMovie(movieName) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
        return window[movieName];
    } else {
        return document[movieName];
    }
}
/**
 * 保存回调函数
 * @param value
 */
function savePhotoCallback(value){
	var v = eval('('+value+')');
//	alert(v.obj);
	savephotopath=v.obj.toString();
}
function closephoto(){
	$("#div_back").remove();
	$("#divmain").remove();
}