var tjRealPatsInHospitalNum_url = "/publish/tj/tjRealPatsInHospitalNum.htm";  //统计眼科住院患者的各个病区的住院情况
var getRealPatsInHospitalInfo_url = "/publish/tj/getRealPatsInHospitalInfo.htm"; //根据病区的编码获取具体的床位信息
var tjPatsInHospitalAndGroup_url = "/publish/tj/tjPatsInHospitalAndGroup.htm"; //统计各个组收录了人数信息
var tjpatVisitInAndOutHospital_url = "/publish/tj/tjpatVisitInAndOutHospital.htm";//出入院患者信息统计
var tjpatVisitInHospital_url = "/publish/tj/tjpatVisitInHospital.htm"; //入院各区患者信息统计
var tjpatVisitOutHospital_url = "/publish/tj/tjpatVisitOutHospital.htm";//出院各区患者信息统计

function showRealTJ(){
	var divTop = $("<div />");
	var dayChart = $("<div />").attr("id","dayChart").attr("class","divChart").appendTo(divTop);
	var weekChart = $("<div />").attr("id","weekChart").attr("class","divChart").appendTo(divTop);
	var chartShowJSY =  $("<div />").attr("id","chartShowJSY").attr("class","chartShowCount").appendTo("#right").append(divTop);
	var monthChart = $("<div />").attr("id","monthChart").attr("class","monthChart").appendTo(chartShowJSY);
	var width = $(".title").width()-15;
	$(".divChart").width(function(){
		return (width)/2;
	}).height("auto");
	$("#monthChart").width(width).height("auto");
	showRealTJ_init();
}

function showRealTJ_init(){
	var tjRealPatsInHospitalNum_data = getJSONData(tjRealPatsInHospitalNum_url, {tag : Math.random()}, "post");
	var totaldata =  tjRealPatsInHospitalNum_data.obj;
	var total = 0;
	for(var i = 0;i<totaldata.length;i++){
		total += totaldata[i].y;
	}
	var strfortal="     总数:"+total;
	showPie("#dayChart", "今日住院部患者人数"+strfortal, tjRealPatsInHospitalNum_data.obj,function(){
		var dept = event.point.dept; //部门编码
		var div = $("<div id='hospitalInfo'></div>");
		var hiddenUl = $("<ul />").appendTo($("<div  />").attr("id","hiddenUl").attr("style","display:none;").appendTo(div));
		div.oimsDialog({
			title : "展示各区详细信息",
			width : 700,
			drag : false,// 是否可以拖动窗口
			locked : true,
			winType : 4,
			button : null
		});
		var div_num = parseInt($("#right").width()/200);

		$(".openWin").css({"overflow":"hidden","height":($("#right").height()),"top":"50px","width":(215*div_num),"left":(($("body").width()-215*div_num)/2)});
		$("#opencontent").height(($(".openWin").height()-$(".opentitle").height()));
		
		var getRealPatsInHospitalInfo_data = getJSONData(getRealPatsInHospitalInfo_url, {dept:dept,tag : Math.random()}, "post");	
		if(getRealPatsInHospitalInfo_data.state){
			var table_doctors = $("<table border='0' cellpadding='5' cellspacing='5' />").appendTo("#hospitalInfo");
			var div_tr;
			var hospitalInfos = getRealPatsInHospitalInfo_data.obj;
			$.each(hospitalInfos,function(index,data){
				if(index % div_num==0)
					div_tr = $("<tr/>").appendTo(table_doctors);
				var div_td = $("<td align='left' style='width:200px;height:140px;' />").appendTo(div_tr);
				var td_html = data.bedNo+"床&nbsp;&nbsp;&nbsp;&nbsp;"+data.patient.patientId+"<br/>";
				td_html+=data.patient.name+"&nbsp;&nbsp;"+data.patient.sex+"&nbsp;&nbsp;"+getAge(data.patient.birthday.time)+"<br/>";
				td_html+=data.clinDiag+"<br/>";
				td_html+="预付（元）"+data.prepayments+"<br/>";
				td_html+="费用（元）"+data.totalCosts+"<br/>";
				td_html+="医生："+data.doctorName+"<br/>";
				td_html+="入院时间："+formatDateTime(data.admissionDateTime.time);
				$(div_td).html(td_html);
				if(formatDate(data.admissionDateTime.time)==getDateNow())
					$(div_td).addClass("biaoqian2");
				else
					$(div_td).addClass("biaoqian1");
				var hiddenLiHtml = td_html;
				while(hiddenLiHtml.indexOf("<br/>")!=-1)
					hiddenLiHtml = hiddenLiHtml.replace("<br/>","&nbsp;&nbsp;");
				$("<li/>").html(hiddenLiHtml).attr("style","text-align:left;").appendTo(hiddenUl);
			});
		}
		var div_openbutton = $("<div/>").attr("id", "div_openbutton").attr("class","openbutton").attr("style","padding:0px;").appendTo(".openWin");// 底部div
		var div_openbutton_html = "<a href='javascript:pringHospitalInit();'><span class='advreset'></span>" + "打印" + "</a>";
		$(div_openbutton_html).appendTo(div_openbutton);
	});
	var tjpatVisitInAndOutHospital_data = getJSONData(tjpatVisitInAndOutHospital_url,{tag:Math.random()},"POST");
	var totaldata =  tjpatVisitInAndOutHospital_data.obj;
	var total = 0;
	for(var i = 0;i<totaldata.length;i++){
		total += totaldata[i].y;
	}
	var strfortal="     总数:"+total;
	showPie("#weekChart", "今日住院部出入院患者人数"+strfortal, tjpatVisitInAndOutHospital_data.obj,function(){
		var div = $("<div id='tjJcxm' style=''></div>");
		div.oimsDialog({
//			icon : "add",
			title : "展示各区详细信息",
			width : 700,
			height : 450,
			drag : false,// 是否可以拖动窗口
			locked : true,
			winType : 4,
			button : null
		});
		if(event.point.type=='IN'){
			var tjpatVisitInHospital_data = getJSONData(tjpatVisitInHospital_url,{tag:Math.random()},"POST");
			showColumn("#tjJcxm", "入院患者详细分布", tjpatVisitInHospital_data.obj,function(){
				var dept = event.point.dept; //部门编码
				var div = $("<div id='hospitalInfo'></div>");
				var hiddenUl = $("<ul />").appendTo($("<div  />").attr("id","hiddenUl").attr("style","display:none;").appendTo(div));
				div.oimsDialog({
					title : "展示各区详细信息",
					width : 700,
					drag : false,// 是否可以拖动窗口
					locked : true,
					winType : 4,
					button : null
				});
				var div_num = parseInt($("#right").width()/200);
                debugger;
				$(".openWin").last().css({"overflow":"hidden","height":($("#right").height()),"top":"50px","width":(215*div_num),"left":(($("body").width()-215*div_num)/2)});
				$("#opencontent").height(($(".openWin").last().height()-$(".opentitle").height()));				
				var getRealPatsInHospitalInfo_data = getJSONData(getRealPatsInHospitalInfo_url, {dept:dept,tag : Math.random(),isToday:"1"}, "post");	
				if(getRealPatsInHospitalInfo_data.state){
					var table_doctors = $("<table border='0' cellpadding='5' cellspacing='5' />").appendTo("#hospitalInfo");
					var div_tr;
					var hospitalInfos = getRealPatsInHospitalInfo_data.obj;
					$.each(hospitalInfos,function(index,data){
						if(index % div_num==0)
							div_tr = $("<tr/>").appendTo(table_doctors);
						var div_td = $("<td align='left' style='width:200px;height:140px;' />").appendTo(div_tr);
						var td_html = data.bedNo+"床&nbsp;&nbsp;&nbsp;&nbsp;"+data.patient.patientId+"<br/>";
						td_html+=data.patient.name+"&nbsp;&nbsp;"+data.patient.sex+"&nbsp;&nbsp;"+getAge(data.patient.birthday.time)+"<br/>";
						td_html+=data.clinDiag+"<br/>";
						td_html+="预付（元）"+data.prepayments+"<br/>";
						td_html+="费用（元）"+data.totalCosts+"<br/>";
						td_html+="医生："+data.doctorName+"<br/>";
						td_html+="入院时间："+formatDateTime(data.admissionDateTime.time);
						$(div_td).html(td_html);
						if(formatDate(data.admissionDateTime.time)==getDateNow())
							$(div_td).addClass("biaoqian2");
						else
							$(div_td).addClass("biaoqian1");
						var hiddenLiHtml = td_html;
						while(hiddenLiHtml.indexOf("<br/>")!=-1)
							hiddenLiHtml = hiddenLiHtml.replace("<br/>","&nbsp;&nbsp;");
						$("<li/>").html(hiddenLiHtml).attr("style","text-align:left;").appendTo(hiddenUl);
					});
				}
				var div_openbutton = $("<div/>").attr("id", "div_openbutton").attr("class","openbutton").attr("style","padding:0px;").appendTo($(".openWin").last());// 底部div
				var div_openbutton_html = "<a href='javascript:pringHospitalInit();'><span class='advreset'></span>" + "打印" + "</a>";
				$(div_openbutton_html).appendTo(div_openbutton);				
			});
		}else if(event.point.type=='OUT'){
			var tjpatVisitOutHospital_data = getJSONData(tjpatVisitOutHospital_url,{tag:Math.random()},"POST");
			showColumn("#tjJcxm", "出院患者详细分布", tjpatVisitOutHospital_data.obj,function(){});
		}
	});
	var tjPatsInHospitalAndGroup_data = getJSONData(tjPatsInHospitalAndGroup_url,{tag:Math.random()},"POST");
	var totaldata =  tjPatsInHospitalAndGroup_data.obj;
	var total = 0;
	for(var i = 0;i<totaldata.length;i++){
		total += totaldata[i].y;
	}
	var strfortal="     总数:"+total;
	showColumnEveryOne("#monthChart","专业组住院患者人数"+strfortal,tjPatsInHospitalAndGroup_data.obj);
	
	
}

function pringHospitalInit(){
	importJS("/js/LodopFuncs.js");
	var strHtml="<body>"+$("#hiddenUl").html()+"</body>"; 
	LODOP = getLodop();  
	LODOP.PRINT_INIT("OIMS打印");
	LODOP.ADD_PRINT_HTM(0,0,"100%","100%",strHtml);
	LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW",true);
	LODOP.SET_PRINT_MODE("FULL_HEIGHT_FOR_OVERFLOW",true); 
	LODOP.SET_PRINT_PAGESIZE(0,0,0,"A4");
	LODOP.PRINT();
}