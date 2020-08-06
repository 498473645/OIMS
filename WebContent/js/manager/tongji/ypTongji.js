var findCFTJUrl='/publish/chufang/findDrugTJPageList.htm';
var GET_YPMX_REPORT_URL="/publish/chufang/findUseDocList.htm";
var YPTJ_EXPORT_URL="/publish/chufang/ypmxexport.htm";
function showYpTJ(){
	pageTitle = '药品';
	init();
	listFactor = {
			url : contextPath + findCFTJUrl, // url
			method : "post",
			checkbox : true,
			single : true,
			listObj : [
			           {
				title : "药品名称",// 
				key : "yaoming"
			}, {
				title : "规格",// 
				key : "packageSpec"
			}, {
				title : "单位",// 
				key : "packageUnits"
			}, {
				title : "药局",// 
				key : "storeName"
			}, {
				title : "使用数量",// 
				key : "countyp"
			}
			],
			data : {// data表示传的参数
				currentPage : 1,
				pageSize : getPageSize(),
				tag:Math.random()
			}
		};
		 var div = $("<div />").attr("id","advquery").addClass("advquery").appendTo("#right");
		 var div1=$("<div />").css("float","left").prependTo(div);
		$('<span style="height:22px;width:60px;float:left;margin-top:2px;margin-left:4px;margin-bottom:2px;margin-right:4px;line-height:22px;text-align:center">药品名称:<span>').appendTo(div1);
		 var normalText = "请输入要药品名称";
		 var searchInput = $("<input />").attr("name","search").focusin(function(){
			if($.trim($(this).val())==normalText){
				$(this).val("").removeClass("blurview").addClass("focus");
			}
		}).blur(function(){
			if(!$.trim($(this).val()).length){
				$(this).val(normalText).removeClass("focus").addClass("blurview");
			}
		}).val(normalText).addClass("blurview").css({"float":"left","margin":"2px 4px"}).width(266).height(20).appendTo(div1);
		$('<span style="height:22px;width:60px;float:left;margin-top:2px;margin-left:4px;margin-bottom:2px;margin-right:4px;line-height:22px;text-align:center">处方时间:<span>').appendTo(div1);
		var cfDateStart=$("<input type='text' style='width:75px;float:left;margin-top:2px;margin-left:4px;margin-bottom:2px;margin-right:4px'  class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='cfDateStart' name='cfDateStart'>").appendTo(div1);
		$('<span style="height:22px;width:20px;float:left;margin-top:2px;margin-left:4px;margin-bottom:2px;margin-right:4px;line-height:22px;text-align:center">至<span>').appendTo(div1);
		var cfDateEnd=$("<input type='text' style='width:75px;float:left;margin-top:2px;margin-left:4px;margin-bottom:2px;margin-right:50px'  class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='cfDateEnd' name='cfDateEnd'>").appendTo(div1);
		calendarEMR_FOLLOWED("cfDateStart");//手术安排时间
		calendarEMR_FOLLOWED("cfDateEnd");// 手术结束时间
		//$("#cfDateStart").val(formatDate(new Date()));
	$('<a class="search" href="javascript:void(0);" style="float: left;">查询</a>').appendTo(div1).click(function(){
		var search = $.trim(searchInput.val());
		if(search == normalText)search="";
		var data = listFactor.data;
		data = $.extend(data,{search:search,cfDateStart:$("#cfDateStart").val(),cfDateEnd:$("#cfDateEnd").val()});//预约
		listFactor.data=data;
		$("#pageList").createPageList(listFactor);
	});
	var btntemp = $("<div />").addClass("btn").appendTo(div);
	var abtn = $("<a style='width:68px;'/>").text("使用明细").click(function(){
		showUseDoc();
	}).appendTo(btntemp);
	$("<span class='role'></span>").appendTo(abtn);
    $("<a id='export' style='width:68px;' ><span class='export'></span>导出明细</a>").appendTo(btntemp);
	$("#export").click(exportYPTJ) ;
	div.append("<div style='clear:both'></div>");
	div = $("<div />").addClass("btn").prependTo(div);
	div = $("<div />").attr("id","pageList").addClass("list").appendTo("#right");
	div.createPageList(listFactor);
}
function showUseDoc(){
	var data = getCheckBoxValue();
	if(data.length==0||data.length>1){
		$.oimsAlert("请选择一条查询数据！");
		return;
	}
	importCSS("/css/print.css");
	importJS("/js/LodopFuncs.js");
	var template =$("<table/>");
	var temptr =$("<tr />").appendTo(template);
	$("<th />").attr("style","width:30px").text("序号").appendTo(temptr);
	$("<th />").attr("style","width:30px").text("药品名称").appendTo(temptr);
	$("<th />").attr("style","width:30px").text("使用医生").appendTo(temptr);
	$("<th />").attr("style","width:30px").text("使用数量").appendTo(temptr);
	$("<th />").attr("style","width:30px").text("诊断内容").appendTo(temptr);
	var pageDiv = $("<div />").addClass("printPage").append(template);
	var printPage = $("<div />").attr("id","printTag").attr("style","width:1000px");
	var dialog = printPage.oimsDialog({
		title:"药品使用明细",
		width:"1000",
		height:"600",
		locked:true,
		button:[
//		        {
//		       		title : "打印",
//		       		func : function(){
//		       			var strStyleCSS="<link href='"+contextPath+"/css/print_operation.css?tag="+Math.random()+"' type='text/css' rel='stylesheet'>";
//		       			var strHtml=strStyleCSS+"<body>"+printPage[0].innerHTML+"</body>"; 
//		       			LODOP = getLodop();  
//		       			LODOP.PRINT_INIT("OIMS打印");
//		       			LODOP.ADD_PRINT_HTM(0,0,"100%","100%",strHtml);
//		       			LODOP.SET_PRINT_PAGESIZE (2,'','',"A4");
//		       			LODOP.PRINT();	
//		       		},
//		       		className : "print",
//		       		isCloseWin:false
//		       },
                  {
		       		title : "关闭",
		       		func : function(){
		       			dialog.close();
		       		},
		       		className : "close"
		       }]
	});
	$.ajax({
		url : contextPath + GET_YPMX_REPORT_URL,
		data : {
			yaopinId : data[0].yaopinId,cfDateStart:$("#cfDateStart").val(),cfDateEnd:$("#cfDateEnd").val()
		},
		async : false,
		type : 'POST',
		dataType : 'json',
		success : function(re) {
			cp = pageDiv.clone().appendTo(printPage);
			var table = cp.children("table");
			$.each(re.list, function(i, d) {
				var tr = $("<tr style='height:30px'/>").appendTo(table);
				$("<td />").text(""+(i+1)+"").appendTo(tr);
				$("<td />").attr("style","width:100px").text(d[0]).appendTo(tr);
				$("<td />").attr("style","width:50px").text(d[2]).appendTo(tr);
				$("<td />").attr("style","width:50px").text(d[1]).appendTo(tr);
				$("<td />").text(d[3]).appendTo(tr);					

			});
		}
	});
}
function exportYPTJ(){
	var data = getCheckBoxValue();
	if(data.length==0||data.length>1){
		$.oimsAlert("请选择一条查询数据！");
		return;
	}
	$.ajax({
		url : contextPath + YPTJ_EXPORT_URL,
		data :{yaopinId : data[0].yaopinId,cfDateStart:$("#cfDateStart").val(),cfDateEnd:$("#cfDateEnd").val()},
		async : false,
		type : 'POST',
		dataType : 'json',
		success : function(data) {
			if(data.state)
				location.href=contextPath+data.obj;
		}
	});
}