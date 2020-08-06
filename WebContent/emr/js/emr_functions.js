function showBarcode(value,showTag){
	importJS("/js/jquery-barcode.min.js");
 	showTag.barcode(value, "code128", {
			output : "css",
			bgColor : "#fff",
			color : "#000",
			barWidth : 1,
			barHeight : showTag.height()-15,
			moduleSize : 5,
			posX : 10,
			posY : 20,
			addQuietZone : 1
		});
 	showTag.css("overflow","hidden");
}

/**
 * 验证打印控件是否安装成功。控件默认采用在线安装的方式，即cab文件
 * 如果采用cab方式安装失败，使用离线安装方式
 */
function validPrinter(){
	if(!jatoolsPrinter.object){
		var select = confirm('未安装打印控件，是否下载安装？');
		if(select){
			window.location = '../plugin/setup.exe';
		}
		return false;
	}
	return true;
}

/**
 * 打印
 * @param doc
 */
function doPrint(doc,paper,how){
	if(!validPrinter()) return false;
	var printDoc = {
		documents:{html:$(doc).html()}||document,//设置打印文档
		importedStyle:['style.css','../css/main.css'],
		settings:{
			paperName:paper||'B5(JIS)',//选择打印纸张，未设置，默认A4
			orientation:1,// 选择横向打印,1为纵向，2为横向
			topMargin:40,
            leftMargin:50,
            bottomMargin:20,
            rightMargin:50
		},
		copyrights: '杰创软件拥有版权  www.jatools.com',
	};
	    if (how== 1)
	    	 jatoolsPrinter.printPreview(printDoc); // 打印预览
	    else if (how == 0)
	         jatoolsPrinter.print(printDoc, true); // 打印前弹出打印设置对话框
	    else
	         jatoolsPrinter.print(printDoc, false); // 不弹出对话框打印
}


function getHtmlTemplate(template){
	var tem=null;
	$.ajax({
		url:'../emr/template/html/'+template+'.html?tag='+Math.random(),
		type:'GET',
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
	
	//检查申请单 军人优先及身份显示
	if(data != null){
		var elements = $(showTag).find(".hidespan");
		var flagele = true;
		$.each(data,function(k,v){
			if(k != null && v != null && k.indexOf("chargeType") != -1 && v.indexOf("军队医改") != -1 ){
				flagele = false;
			}
		});
		if(flagele){
			$.each(elements,function(i,v){
				$(v).remove();
			});
		}else{
			$.each(elements,function(i,v){
				$(v).removeClass("hidespan");
			});
			console.log("junjai flag is "+jifeiFlagPrint);
			if(jifeiFlagPrint) {
				$(".jungaiJifei").css("visibility","visible");
			}
		}
	}
	
}

function htmIsEmpty(html){
	var v=true;
	if(!html.length)return v;
	html = html.toString().replace(/(<\s*\S*>)|\s|&nbsp;/g,"");
	return !html.length;
}

function showPrintWindow(preview){
	importJS("/js/LodopFuncs.js")
	var bg = $("<div />").addClass("lockedBackground").css({
        top : 0,
        left : 0,
        position : "absolute",
        width : "100%",
        height : $(window).height(),
        "z-index":$("div").length+1,
        background:"#ccc",
        filter:"alpha(opacity=60)",
        opacity:0.6
    }).appendTo("body");
	var w = $(window).width()/4*3;
	var h = $(window).height()/10*9;
	var showTag = $("<div />").css({
			top : ($(window).height()-h)/2,
	        left : ($(window).width()-w)/2,
	        position : "absolute",
	        "z-index":999
	}).width(730).height(h).appendTo("body");
	if(preview=='BIG'){
		showTag.css({'display':'none'});
	}
	var printTag = $("<div id='printTag'/>").addClass("printTag").appendTo(showTag);

	var btn = $("<div style='padding-top:5px'/>").addClass("openbutton").appendTo(showTag);
	printTag.height(showTag.innerHeight()-btn.outerHeight());
	$("<a id='printIll'><span class=\"print\"></span>打印</a>").click(function(){
		var printPage = printTag.children(".printPage");
		if(undefined!=currentVisit && isEMRPaage(printPage) && !printPage.hasClass('jiwang') && !emrComplete(printPage)){
			return;
		}
		if(preview=='preview'){
			$(this).next().click();
			finishPrint();
			return;
		}
		printLodap(printTag);
		$(this).next().click();
		
//		doPrint(printTag,"B5(JIS)");
//		printTag.children(".printPage").printArea(
//				{
//					mode : "iframe",
////					popClose : close,
//					extraCss : "",
//					retainAttr : [ "class",
//							"id", "style" ],
//					extraHead : '<meta charset="utf-8" />,<meta http-equiv="X-UA-Compatible" content="IE=edge"/>'
//				});
	}).appendTo(btn);
	$("<a id='printClose'><span class=\"close\"></span>关闭</a>").click(function(){
		showTag.hide().remove();
		bg.hide().remove();
	}).appendTo(btn);
	if(preview=='preview'){
		$("<a><span></span>小病例</a>").click(function(){
			printEMRB5();
		}).appendTo(btn);
	}
	return printTag;
}

function printLodap(html){
	var strStyleCSS="<link href='"+contextPath+"/emr/style.css?tag="+Math.random()+"' type='text/css' rel='stylesheet'>";
	var strHtml=strStyleCSS+"<body>"+html[0].innerHTML+"</body>"; 
	LODOP = getLodop();  
	LODOP.PRINT_INIT("OIMS打印");
	LODOP.ADD_PRINT_HTM(0,0,"100%","100%",strHtml);
	//LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW",true);
	//LODOP.SET_PRINT_MODE("FULL_HEIGHT_FOR_OVERFLOW",true); 
	LODOP.SET_PRINT_PAGESIZE(0,0,0,"B5 (JIS)");
	LODOP.PRINT();	
	//LODOP.PREVIEW();
}

function isEMRPaage(div){
	if(!div.length)return false;
	if(div.find("h1").text().indexOf("门诊病历")==-1)return false;
	return true;
}
function emrComplete(div){
	var id = oimsCategory.WENZHENMOBAN_ZHUSHU+"_"+currentVisit.id;
	var record_zhushu = div.find("p.p_emr_zhusu").text();
	if(!record_zhushu.length){
		alert("主诉没有填写完成！");
		return false;
	}
	if(div.find("p.zkjc_emr").text().indexOf("视力")==-1){
		alert("视力没有填写完成！");
		return false;
	}
	if(!div.find("p.zhenduan_emr").text().length){
		alert("诊断没有填写完成！");
		return false;
	}
	if(getSuifang()==null){
		alert("随访没有填写完成！");
		return false;
	}
	return true;
}

function dataInTransit(id){
	var div = $("<div />").addClass("lockedBackground").attr("id","lokcedDiv_"+id).addClass("lockedDiv").css({
        top : 0,
        left : 0,
        position : "absolute",
        width : "100%",
        height : $(window).height(),
        "z-index":$("div").length+1,
        background:"#ccc",
        filter:"alpha(opacity=60)",
        opacity:0.6
    }).appendTo("body");
	$("<div />").appendTo(div).width(200).height(30).text("保存中，请稍后。。。").css({"line-height":30,"font-size":"22px",background:"#fff","text-align":"center","color":"#000","font-weight":"bold","margin":"auto"});
}

function transferComplete(id){
	$("#lokcedDiv_"+id).remove();
}
