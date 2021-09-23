var jcjgListUrl = "/publish/jcd/getHuanzheJcjgList.htm";
var jcdateListUrl = "/publish/jcd/getHuanzheJiuzhenDateList.htm";
var jcxmListUrl = "/publish/jcd/getHuanzheJcxmByHzidList.htm";
var jcxmListBydateUrl = "/publish/jcd/getHuanzheJcxmByHzidAndDateList.htm";
var getHzxinxiUrl = "/publish/huanZheXinXi/findHuanZheById.htm";
var getHzxinxiByBlhUrl = "/publish/huanZheXinXi/getHuanZheXinXiBySearch.htm";
var reportListUrl = "/publish/jcd/getHzReportList.htm";


var flash,gongge,page=1;
var penEnabled=false;
var gongge=0;
var currOldIndex=null;
var currShow=[];
var tp=4;//缩略图个数
var mark=true;//是否只有访问水印图像的权限，这里应与后台交互得到当前用户权限

function resize(){
	var h = $(window).height()-$(".header").height()-16;
	if(h<568){
		h=568;
	}
	$(".content").height(h);
	$(".leftmenubg").height(h);
	$(".rightInfobg").height(h);
	
	if(h>568){
		$(".logo").css({"margin-top":$(".leftmenubg").height()-568});
	}
	$(".rightInfobg").width($(window).width()-226-10);
	$(".rightInfoMiddle").height($(".content").height()-$(".rightInfoTop").height()-$(".rightInfoBottom").height()-25);
	var tw = $(".minImg").width()-$(".prev").outerWidth()-$(".next").outerWidth();
	$(".wrapper").width(tw);
	tp = Math.floor(tw/140);
	initCorners();
}

function isInCurrShow(src){
	var x=false;
	for(var i=0; i<currShow.length; i++){
		var path = currShow[i];
		x=path==src||path==src.replace("/thumb/");
		if(x)break;
	}
	return x;
}

function clearCurrShow(){
	for(var i=0; i<currShow.length; i++){
		var path=currShow[i];
		var s = path.split(".");
		var ext = s[s.length-1];
		if(ext == "flv"){
			closeFLVCallBack(path);
		}
	}
	currShow=[];
}

function deleteCurrShow(path){
	var c=[];
	for(var i=0; i<currShow.length; i++){
		if(currShow[i]!=path){
			c.push(currShow[i]);
		}
	}
	currShow = c;
}

function getJSONData(url,data,type){
    var value = null;
    if(type == null){
    	type="GET";
    }else{
    	type="POST";
    }
    $.ajax({
        url : contextPath+url+"?tag=" + Math.random(),
        data : data,
        async : false,
        type : type,
        dataType : 'json',
        success : function(data){
            value = data;
        }
    });
    return value;
}

function showHzxx(){
	var hzxx = getJSONData(getHzxinxiUrl, {id:hzid},'post');
	if(!hzxx.state){
		alert("患者信息不存在！");
		return;
	}
	hzxx = hzxx.obj;
	$("#patientname").text(hzxx.xingming);
	var xb = "女";
	if (hzxx.xingbie)xb = "男";
	$("#sex").text(xb);
	//$("#birthday").text(formatDateTime(hzxx.shengri.time));
	$("#ident").text(hzxx.sfzh);
	$("#patientId").text(hzxx.binglihao);
	var yibao = "否";
	if(hzxx.yibao)yibao="是";
	$("#insured").text(yibao);
}

function showJcjg(date,jcxm){
	var data = getJSONData(jcjgListUrl,{hzid:hzid,date:date,jcxmid:jcxm});
	if(!data.state){
		$(".wrapper").text("");
		return;
	}
	var p = Math.floor(data.obj.length/tp);
	if(data.obj.length%tp) p++;
	page=1;
	showThumb(data);
		var nextImg = $(".next img").attr("src","skin/blue/images/right3-enabled.png");
		$(nextImg).unbind("click");
		$(nextImg).click(function(){
			page++;
			if(page>p){
				page=p;
				return;
			}
			showThumb(data);
		});
		var prevImg = $(".prev img");
		$(prevImg).unbind("click");
		$(prevImg).click(function(){
			page--;
			if(page<1){
				page=1;
				return;
			}
			showThumb(data);
		});
}

function showFLV(path){
	currShow.push(path);
	try{
		//flash.showDisplayObject(path);
		showObject(path) ;
	}catch(e){
	}
}

function showFLVPlayer(path,i,li){
	var w=130,h=102;
	$("<a />").width(w).height(h).attr("id", "player" + i).attr(
			"href", contextPath + path).appendTo(li);
// flowplayer("player" + i, contextPath
// + "/flowplayer/flowplayer-3.2.5.swf");
	var params = {
			allowScriptAccess : "sameDomain",
			quality:"high",
			wmode:"transparent"
		};
//	alert(w+"   :   "+h ) ;
		var flashvars = {path:path,width:w,height:h,isShow:isInCurrShow(path)};
		$("#player"+i).flash( {
			swf:"flvPlayer.swf",
			id:"flvPlayer"+i,
	        width: w, 
	        height: h, 
	        flashvars: flashvars, 
	        paremeters: params
	    });
}

function showThumb(data){
	var i = (page-1)*tp, n=tp+i;
	$(".wrapper").text("");
	var ul = $("<ul />").appendTo(".wrapper");
		while(i++<=n){
			if(i>data.obj.length)break;
			var li = $("<li />").appendTo(ul);
			var path = data.obj[i-1].path;
			var ext = path.split(".")[path.split(".").length-1];
			if(ext=="flv"){
				showFLVPlayer(path,i,li);
			}else{
				var img = $("<img />").attr("src",path).appendTo(li);
				if(!isInCurrShow(path)){
					img.addClass("wihte");
					$(img).bind("click",function(){showImg(this);});
				}else{
					img.addClass("blue");
					$(img).bind("click",function(){closeImgShow(this);});
				}
			}
		}
		$(".wrapper ul li img").aeImageResize({"width":130,"height":108});
}

function getPS(){
	var w = $(".rightInfoTop").width()-$(",rightInfoTop span").width();
	return Math.floor((w-58-25)/120);
}

function getPC(data,ps){
	var x = Math.floor(data.obj.length/ps);
	if(data.obj.length%ps>0)x++;
	return x;
}

function showDateList(jcxm){
	currOldIndex=null;
	var data = getJSONData(jcdateListUrl,{hzid:hzid,jcxmid:jcxm});
	$(".rightInfoTop").text("");
	$("<span />").html("<img src=\"skin/blue/images/sj.png\"  />").appendTo(".rightInfoTop");
	var ul = $("<ul />").appendTo(".rightInfoTop");
	if(!data.state){
		$(".wrapper").text("");
		return;
	}
	var ps = getPS();
	var x = getPC(data,ps);
	var c=1;
	if(x>1){// 显示下一页按钮
		var nt = $("<span />").addClass("right").appendTo(".rightInfoTop");
		var lt = $("<span />").addClass("noleft").appendTo(".rightInfoTop");
		nt.css({"position":"absolute","display":"block","margin-left":$(".rightInfoTop").width()-nt.width()-10});
		lt.css({"position":"absolute","display":"block","margin-left":28});
		nt.click(function(){
			if(c==x)return;
			if(++c==x){
				nt.removeClass().addClass("noright");
			}
			$(lt).removeClass().addClass("left");
			showDataTag(data,ps,ul,c);
		});
		lt.click(function(){
			if(c==1)return;
			if(--c==1){
				lt.removeClass().addClass("noleft");
			}
			nt.removeClass().addClass("right");
			showDataTag(data,ps,ul,c);
		});
	}
	showDateTag(data,ps,ul,c);
}
function unShowSecMenu(){
	var h = $(".rightMenu2").height();
	$(".rightMenu2").hide();
	$("#imageViewer").attr("height",$("#imageViewer").attr("height")+h);
}
function showSecMenu(x,v){// x为真则显示指定时间的检查项目列表，为否则显示指定项目的检查时间列表
	var data = null;
	if(x){
		data = getJSONData(jcxmListBydateUrl,{hzid:hzid,date:v});
	}else{
		data = getJSONData(jcdateListUrl,{hzid:hzid,jcxmid:v});
	}
	var div=$(".rightMenu2");
	if(!div.length){
		div=$("<div />").width($(".rightInfoTop").width()-30).height(20).addClass("rightMenu2").insertAfter(".rightInfoTop");
		var img = $("<img />").attr("src","skin/blue/images/close.png").appendTo($("<div />").addClass("close").appendTo(div));
		img.click(function(){unShowSecMenu();});
		$("#imageViewer").attr("height",$("#imageViewer").attr("height")-20);
	}else{
		div.text("");
		var img = $("<img />").attr("src","skin/blue/images/close.png").appendTo($("<div />").addClass("close").appendTo(div));
		img.click(function(){unShowSecMenu();});
	}
	$.each(data.obj,function(i,d){
		//if(i>0){
			//$("<span />").html("&nbsp;|&nbsp;").appendTo(div);
		//}
		var a = $("<a />").attr("href","#").appendTo(div);
		if(x){
			a.text(d.xmmc);
			a.click(function(){
				showJcjg(v,d.id);
				$(".rightMenu2 .show").removeClass("show");
				a.addClass("show");
			});
			showReportList(v,d.id,div);
		}else{
			a.text(d.jsrq);
			a.click(function(){
				showJcjg(d.jsrq,v);
				$(".rightMenu2 .show").removeClass("show");
				a.addClass("show");
			});
			showReportList(d.jsrq,v,div);
		}
	});
	div.show();
}

function showDateTag(data,ps,ul,p){
	if(ps>data.obj.length)ps=data.obj.length;
	var i = (p-1)*ps;
	ul.text("");
	var n=0;
	$.each(data.obj,function(z,d){
		if(z>=i && n++<ps){
			var x = data.obj.length-i-1;
			var b = $("<li />").text(d.jsrq).css({"position":"absolute","margin-left":120*(n-1)+58,"z-index":x}).appendTo(ul);
			if(currOldIndex!=null && x==currOldIndex){
				b.addClass("on");
			}else{
				b.addClass("off");
			}
			if(i==0 && currOldIndex==null){
				showSecMenu(true,d.jsrq);
				$(b).removeClass("off");
				$(b).addClass("on");
				currOldIndex=$(b).css("z-index");
				showJcjg(d.jsrq);
			}
			$(b).click(function(){
					showSecMenu(true,d.jsrq);
					$(".on").removeClass("on").addClass("off").css("z-index",currOldIndex);
					$(this).removeClass("off");
					currOldIndex=$(this).css("z-index");
					$(this).addClass("on").css("z-index",data.obj.length);
					showJcjg(d.jsrq);
				}
			);
			i++;
		}
	});
}

function showJcxmList(date){
	currOldIndex=null;
	var data = getJSONData(jcxmListBydateUrl,{hzid:hzid,date:date});
	$(".rightInfoTop").text("");
	$("<span />").html("<img src=\"skin/blue/images/xm.png\"  />").appendTo(".rightInfoTop");
	var ul = $("<ul />").appendTo(".rightInfoTop");
	if(!data.state){
		$(".wrapper").text("");
		return;
	}
	var ps = getPS();
	var x = getPC(data,ps);
	var c=1;
	if(x>1){// 显示下一页按钮
		var nt = $("<span />").addClass("right").appendTo(".rightInfoTop");
		var lt = $("<span />").addClass("noleft").appendTo(".rightInfoTop");
		nt.css({"position":"absolute","display":"block","margin-left":$(".rightInfoTop").width()-nt.width()-10});
		lt.css({"position":"absolute","display":"block","margin-left":28});
		nt.click(function(){
			if(c==x)return;
			if(++c==x){
				nt.removeClass().addClass("noright");
			}
			$(lt).removeClass().addClass("left");
			showJcxmTag(data,ps,ul,c,date);
		});
		lt.click(function(){
			if(c==1)return;
			if(--c==1){
				lt.removeClass().addClass("noleft");
			}
			nt.removeClass().addClass("right");
			showJcxmTag(data,ps,ul,c,date);
		});
	}
	showJcxmTag(data,ps,ul,c,date);
}

function showJcxmTag(data,ps,ul,p,date){
	if(ps>data.obj.length)ps=data.obj.length;
	var i = (p-1)*ps;
	ul.text("");
	var n=0;
	$.each(data.obj,function(z,d){
		if(z>=i && n++<ps){
			var x = data.obj.length-i-1;
			var xmmc = d.xmmc;
			if(xmmc.length>6){
				xmmc = xmmc.substring(0,5)+"...";
			}
			var b = $("<li />").attr("title",d.xmmc).text(xmmc).css({"position":"absolute","margin-left":120*(n-1)+58,"z-index":x}).appendTo(ul);
			if(currOldIndex!=null && x==currOldIndex){
				b.addClass("on");
			}else{
				b.addClass("off");
			}
			if(i==0 && currOldIndex==null){
				showSecMenu(false,d.id);
				$(b).removeClass("off");
				$(b).addClass("on");
				currOldIndex=$(b).css("z-index");
				showJcjg(date,d.id);
			}
			$(b).click(function(){
				showSecMenu(false,d.id);
				$(".on").removeClass("on").addClass("off").css("z-index",currOldIndex);
				$(this).removeClass("off");
				currOldIndex=$(this).css("z-index");
				$(this).addClass("on").css("z-index",data.obj.length);
				showJcjg(date,d.id);
			});
			i++;
		}
	});
}

function showSWF(){
	var params = {
		allowFullScreen : true,
		allowScriptAccess : "sameDomain",
		quality:"high",
		wmode:"transparent"
	};
	var w = $(".rightInfoMiddle").width();
	var h = $(".rightInfoMiddle").height();
	var flashvars = {};

	 $(".rightInfoMiddle").flash( {
	        swf:"ImageViewer.swf",
	        id:"imageViewer",
	        wmode:"transparent",
	        width: w-40, // Recommended
	        height: h, // Recommended
	        flashvars: flashvars, // Optional
	        paremeters: params // Optional
	    });
	 $(".rightInfoMiddle").height($("#imageViewer").height()-20);
	 $(".rightInfoMiddle").width($("#imageViewer").width()) ;
	 flash = thisMovie("imageViewer");
}

function showLiangdu(){
	$(".ld").click(function(){
		$(".rightInfoTop").text("");
		$("<span><img src=\"skin/blue/images/ld.png\"  /></span>").appendTo(".rightInfoTop");
		var li =$("<li />").appendTo($("<ul />").appendTo(".rightInfoTop"));
		var div = $("<div />").appendTo(li);
		$(div).slider({
			min: -255,
			max: 255,
			value: 0,
			slide:function(event,ui){flash.colorMatrix(1,ui.value);}
		});
	});
}

function showDuibidu(){
	$(".dbd").click(function(){
		$(".rightInfoTop").text("");
		$("<span><img src=\"skin/blue/images/dbd.png\"  /></span>").appendTo(".rightInfoTop");
		var li =$("<li />").appendTo($("<ul />").appendTo(".rightInfoTop"));
		var div = $("<div />").appendTo(li);
		$(div).slider({
			min: 0,
			max: 255,
			value: 127.5,
			slide:function(event,ui){flash.colorMatrix(2,ui.value);}
		});
	});
}

function showBaohedu(){
	$(".bhd").click(function(){
		$(".rightInfoTop").text("");
		$("<span><img src=\"skin/blue/images/bhd.png\"  /></span>").appendTo(".rightInfoTop");
		var li =$("<li />").appendTo($("<ul />").appendTo(".rightInfoTop"));
		var div = $("<div />").appendTo(li);
		$(div).slider({
			min: 1,
			max: 100,
			value: 1,
			slide:function(event,ui){flash.colorMatrix(4,ui.value);}
		});
	});
}

function showSexiang(){
	$(".sx").click(function(){
		$(".rightInfoTop").text("");
		$("<span><img src=\"skin/blue/images/bhd.png\"  /></span>").appendTo(".rightInfoTop");
		
		var li =$("<li />").appendTo($("<ul />").appendTo(".rightInfoTop"));
		var r_t = $("<div />").css({width:240, float:"left"}).appendTo(li);
		$("<span />").text("R:").css({width:28,float:"left"}).appendTo(r_t);
		var div_r = $("<div />").appendTo(r_t);
		$(div_r).slider({
			min: -255,
			max: 255,
			value: 0,
			slide:function(event,ui){flash.sexiang(0,ui.value);}
		});
		
		var g_t = $("<div />").css({width:240, float:"left"}).appendTo(li);
		$("<span />").text("G:").css({width:28,float:"left"}).appendTo(g_t);
		var div_g = $("<div />").appendTo(g_t);
		$(div_g).slider({
			min: -255,
			max: 255,
			value: 0,
			slide:function(event,ui){flash.sexiang(1,ui.value);}
		});
		
		var b_t = $("<div />").css({width:240, float:"left"}).appendTo(li);
		$("<span />").text("B:").css({width:28,float:"left"}).appendTo(b_t);
		var div_b = $("<div />").appendTo(b_t);
		$(div_b).slider({
			min: -255,
			max: 255,
			value: 0,
			slide:function(event,ui){flash.sexiang(2,ui.value);}
		});
	});
}

function showBijiao(){
	$(".bj").click(function(){
		$(".rightInfoTop").text("");
		$("<span><img src=\"skin/blue/images/bj.png\"  /></span>").appendTo(".rightInfoTop");
		var div = $("<div />").appendTo($("<li />").appendTo($("<ul />").appendTo(".rightInfoTop")));
		var a0 = $("<a />").attr("href","#").text("两宫格").appendTo(div);
		var a1 = $("<a />").attr("href","#").text("四宫格").appendTo(div);
		if(gongge==2)$(a0).addClass("visitedd");
		if(gongge==4)$(a1).addClass("visitedd");
		$(a0).click(function(){showGongge(2,this);});
		$(a1).click(function(){showGongge(4,this);});
	});
}

function showHuabi(){
	$(".hb").click(function(){
		$(".rightInfoTop").text("");
		$("<span><img src=\"skin/blue/images/hb.png\"  /></span>").appendTo(".rightInfoTop");
		
		var li =$("<li />").appendTo($("<ul />").appendTo(".rightInfoTop"));
		
		var pen = $("<span />").css({width:10,height:10,border:"2px solid red"}).appendTo(li);
		if(penEnabled){
			$(pen).css({background:"#ff0000"});
		}
		$(pen).click(function(){
			if(penEnabled){
				$(this).css({background:"none"});
				penEnabled=false;
				flash.penEnable(false);
			}else{
				$(this).css({background:"#ff0000"});
				penEnabled=true;
				flash.penEnable(true);
			}
		});
		var div = $("<div />").appendTo(li);
		$(div).slider({
			min: 1,
			max: 50,
			value: 0,
			slide:function(event,ui){flash.setPenSize(ui.value);}
		});
	});
}


function thisMovie(movieName) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
        return window[movieName];
    } else {
        return document[movieName];
    }
}
function closeFLVShow(src){
	flash.closeImg(src);
	closeFLVCallBack(src);
}
function closeFLVCallBack(src){
	deleteCurrShow(src);
//	var id=$("param[name=\"flashvars\"][value=\"path="+src+"&width=130&height=102&isShow=true\"]").parent().attr("id");
//	if(id==undefined)id=$("param[name=\"flashvars\"][value=\"path="+src+"&width=130&height=102&isShow=false\"]").parent().attr("id");
	var aEle = $("a[href*='"+src+"']") ;
	var id = aEle.children().attr("id") ;
	if(id!=undefined && id!="")thisMovie(id).playMovie();
}

function closeImg(src){
	var i = src.lastIndexOf("/");
	var f=src.substring(0,i);
	var n = src.substring(i);
	var ext = n.split(".")[n.split(".").length-1];
	if(ext=="flv"){
		closeFLVCallBack(src);
		return;
	}
	var path;
	if(mark){
		//path = src.replace(/\/mark\//,"\/markthumb\/");
		path = src.replace(/\/mark\//,"\/thumb\/");
	}else{
		path = f + "/thumb"+ n;
	}
	closeAfter(path);
}

function closeAfter(path){
	deleteCurrShow(path);
	var data = $(".wrapper ul li img");
	$.each(data,function(x,d){
		var cs = $(d).attr("src");
		if(cs==path){
			$(d).removeClass("blue");
			$(d).addClass("wihte");
			$(d).unbind("click");
			$(d).bind("click",function(){showImg(d);});
		}
	});
}

function closeImgShow(img){
	var path=$(img).attr("src");
	if(!isInCurrShow(path))return;

	if(mark){
		//path = path.replace(/\/markthumb\//,"\/mark\/");
		path = path.replace(/\/thumb\//,"\/mark\/");
	}else{
		path = path.replace(/\/thumb\//,"\/");
	}
	flash.closeImg(path);
	closeImg(path);
}

function showImg(img){
	var path=$(img).attr("src");
	if(isInCurrShow(path))return;
	
	currShow.push(path);
	$(img).unbind("click");
	$(img).bind("click",function(){closeImgShow(this);});
	$(img).removeClass("wihte");
	$(img).addClass("blue");
	path = path.replace(/\/thumb\//,"\/");
	showObject(path) ;
}

function showGongge(x,o){
	clearCurrShow();
	var img = $(".wrapper ul li img");
	img.unbind("click");
	$(".blue").attr("class","wihte");
	$(o).removeClass();
	$(".visitedd").removeClass();
	if(gongge == x){
		flash.unShowXBox();
		gongge=0;
		img.bind("click",function(){showImg(this);});
		return;
	}
	flash.showXBox(x);
	$(o).addClass("visitedd");
	img.bind("click",function(){
		(this);
	});
	gongge=x;
}

function setMenu(){
	$(".fd").click(function(){flash.zoomIt(true);});
	$(".xs").click(function(){flash.zoomIt(false); });
	$(".cz").click(function(){flash.reset();});
	$(".xz").click(function(){flash.rotateIt(90);});
	showLiangdu();
	showDuibidu();
	showBaohedu();
	showSexiang();
	$(".fzys").click(function(){flash.fanse();});
	$(".qs").click(function(){flash.removeColor();});
	showBijiao();
	showHuabi();
	$(".sj").click(function(){showDateList();});
	$(".xm").click(function(){showJcxmList();});
}

function initCorners() {
	var setting = {
	tl: { radius: 10 },
	tr: { radius: 10 },
	bl: { radius: 10 },
	br: { radius: 10 },
	antiAlias: true
	};
	curvyCorners(setting, ".leftmenubg");
}

function showReportList(date,jcxmid,tag){
	var data = getJSONData(reportListUrl,{hzid:hzid,date:date,jcxmid:jcxmid});
	if(!data.state){
		return;
	}
	
	//$("<span />").text("报告:").appendTo(tag);
		$.each(data.obj,function(i,d){
			var a = $("<a />").attr("title",d.jcdh).appendTo(tag);
			$("<img />").attr("alt","报告").attr("src","skin/blue/images/report.png").attr("align","absmiddle").appendTo(a);
			a.click(function(){
//				showReport(d.id);
//				showReportToDoc(d.id,"&docView=true");
			});
		});
}

/**
 * 显示报告
 */
//function showReportToDoc(jcdid, docViewFlag){
//	window.open(contextPath+"/publish/zxJcd/showReport.htm?jcdId="+jcdid+docViewFlag);
//}
/**
 * 显示报告
 * 
 * @param data
 */
//function showReport(jcdid){
//	window.open(contextPath+"/publish/zxJcd/showReport.htm?jcdId="+jcdid);
//}

function showObject(path){
	$(".rightInfoMiddle").flash(function(){
		this.showDisplayObject(path) ;
	}) ;
}

function initHzid(){
	if(blh!=""){
		var data = getJSONData(getHzxinxiByBlhUrl,{search:blh});
		if(!data.state){
			alert("患者信息不存在！");
			return;
		}
		var hzxx = data.obj;
		hzid = hzxx.id;
	}
}

$(document).ready(function() {
    initHzid();
	resize();
	showSWF();
	setMenu();
	showHzxx();
	showDateList();
});