
/**
 * 检查项目统计入口
 */
function showjcsbTj(){
	var tj = new TongJi() ;
	tj.addMenu([{label:l_tj.Jianchasb}]) ;
	new JcsbTj().addEvent() ;
	$("#title_0").click() ;
} ;

function JcsbTj(){
	var _this = this ;
	var tj = new TongJi() ;
	var ee = new Ele() ;
	var t = tj.tjTitle() ;
	tj.setTjLx("jcd") ;
	
	this.initPage = function (fn){
		tj.pageChartShowCount(fn) ;
//		tj.showGroupKind() ;
	} ;
	this.chartPage = function(d){
		tj.setTjLx("jcd") ;
		var g1 = $("#group1").val() ;
		d = tj.booleanToWord(d, g1) ;
		var t = tj.tjTitle() ;
		var chart = {
			width:300,
			height:210,
			chartId:'chart',
		 	chart : { caption :t.ss+l_tj.tj, xAxisName :t.ssx,  yAxisName :l_tj.rc,  numberPrefix :l_tj.rc  },
		 	data:tj.dataToDef(d) 
		 } ;
		tj.c3d("pgChart", chart) ;
	} ;
	this.pro = function(){
		$("#a_btn_pro").click(function(){
			url = "tj/pro.htm" ;
			ee.proDown(url) ;
		}) ;
	} ;
	this.hzPageLook = function(){
		var ft = tj.tjTitle() ;
		tj.setTjLx("hz") ;
		tj.v_pageLook({
			tilte:ft.ss+"   "+l_tj.tjmx,
			url:"tj/list.htm",
//			cl:[{title:"患者id",key:"id"},{title:"患者姓名",key:"xingming"},{title:"身份证",key:"sfzh"},
//			    {title:"病历号",key:"binglihao"},{title:"生日",key:"shengri",func:function(v){return v.substring(0,10) ;}}]
			cl:[{title:l_tj.HzId,key:"id"},{title:l_tj.Name,key:"xingming"},{title:l_tj.idNum,key:"sfzh"},
			    {title:l_tj.BingLiHao,key:"binglihao"},{title:l_tj.birthday,key:"shengri",func:function(v){return v.substring(0,10) ;}}]
		}) ;
		url = "tj/chartEx.htm" ;
		ee.fs(url, _this.chartPage) ;
	} ;
	this.zdPageLook = function(){
		var ft = tj.tjTitle() ;
		tj.setTjLx("zd") ;
		tj.v_pageLook({
			tilte:ft.ss+"   "+l_tj.tjmx,
			url:"tj/list.htm",
//			cl:[{title:"病名",key:"zdmc"},{title:"诊断医生",key:"zdys"},{title:"诊断时间",key:"zdsj"}, {title:"就诊号",key:"ghdh"}]
			cl:[{title:l_tj.illName,key:"zdmc"},{title:l_tj.zdYs,key:"zdys"},{title:l_tj.zdTime,key:"zdsj"}, {title:l_tj.JiuZhenHao,key:"ghdh"}]
		}) ;
		url = "tj/chartEx.htm" ;
		ee.fs(url, _this.chartPage) ;
	} ;
	this.jcdPageLook = function(){
		var ft = tj.tjTitle() ;
		tj.setTjLx("jcd") ;
		tj.v_pageLook({
			tilte:ft.ss+"   "+l_tj.tjmx,
			url:"tj/list.htm",
//			cl:[{title:"检查单号",key:"jcdh"},{title:"患者姓名",key:"hzName"},{title:"检查医生",key:"jcys"}, {title:"检查项目",key:"jcxm"}
//			, {title:"检查项目",key:"jcxm",func:function(v){return v.substring(0,10) ;}}]
			cl:[{title:l_tj.Jcdh,key:"jcdh"},{title:l_tj.Name,key:"hzName"},{title:l_tj.JcYs,key:"jcys"}, {title:l_tj.Jcxm,key:"jcxm"}
			, {title:l_tj.Jcxm,key:"jcxm",func:function(v){return v.substring(0,10) ;}}]
		}) ;
		url = "tj/chartEx.htm" ;
		ee.fs(url, _this.chartPage) ;
	} ;
	
	this.addEvent = function(){
		$("#title_0").click(_this.title_0_jcsb) ;
	} ;
	
	//************************检查设备统计**********************************************************//
	this.requestDataJcsb = function(){
		tj.initPage() ;
		tj.chartEmpty() ;
		tj.setTjLx("jcd") ;
		tj.addAutoEleBase()  ;
		url = "tj/chart.htm" ;
		tj.setGroup1("") ;
		ee.fs(url, _this.chartJcxm) ;
	} ;
	this.chartJcxm = function(d){
		if(d!=undefined&&typeof(d.obj)=="object"){
			$.each(d.obj,function(i,v){
				v.link = "javascript:new JcsbTj().requestDataJcsbEx()" ;
			}) ;
		}
		var t = tj.tjTitle() ;
		var chart = {
			chartId:'chart',
		 	chart : { caption :t.ss+l_tj.tj, xAxisName :t.ssx,  yAxisName :l_tj.rc,  numberPrefix :l_tj.rc  },
		 	data:tj.dataToDef(d) 
		 } ;
		tj.c3d("flashChart1", chart) ;
	} ;
	this.requestDataJcsbEx = function(){
		tj.setTjLx("jcd") ;
		tj.setGroup1("jcsb") ;
		url = "tj/chart.htm" ;
		ee.fs(url, _this.chartJcxbEx) ;
	} ;
	this.chartJcxbEx = function(d){
		var t = tj.tjTitle() ;
		var chart = {
			chartId:'chart',
		 	chart : { caption :t.ss+l_tj.tj, xAxisName :t.ssx,  yAxisName :l_tj.rc,  numberPrefix :l_tj.rc  },
		 	data:tj.dataToDef(d) 
		 } ;
		tj.b3d("flashChart2", chart) ;
	} ;
	this.title_0_jcsb = function(){
		_this.initPage(_this.requestDataJcsb) ;
		tj.v_addJcks(_this.requestDataJcsb) ;
		tj.v_addJcsb(_this.requestDataJcsb) ;
		$("#fTime1").change() ;
		_this.pro() ;
		$("#a_btn_pageLook").click(_this.jcdPageLook) ;
		
//		tj.addAutoEleBase($("<tr><td></td><td width='50%'><input id='test' name='ntest' /></td></tr>"))
//		$("#test").oimsCombox({ar:[{k:'测试1',v:'test1'},{k:'测试2',v:'test2'},{k:'测试3',v:'test3'}]}) ;
	} ;
	
} ;