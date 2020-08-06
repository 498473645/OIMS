
/**
 * 患者统计入口
 */
function showHzTj(){
	var tj = new TongJi() ;
	tj.addMenu([{label:l_tj.hzlytj},{label:l_tj.hzDqTj},{label:l_tj.hzLxTj},{label:l_tj.hzJcTj}]) ;
	new HzTj().addEvent() ;
	$("#title_0").click() ;
} ;


function HzTj(){
	var _this = this ;
	var tj = new TongJi() ;
	var ee = new Ele() ;
	var t = tj.tjTitle() ;
	
	this.initPage = function (fn){
		tj.pageChartShowCount(fn) ;
//		tj.showGroupKind() ;
	} ;
	this.chartPage = function(d){
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
	this.addEvent = function(){
		$("#title_0").click(_this.title_0_hzly) ;
		$("#title_1").click(_this.title_1_hzdq) ;
		$("#title_2").click(_this.title_2_hzlx) ;
		$("#title_3").click(_this.title_3_hzjc) ;
	} ;
	this.pro = function(){
		$("#a_btn_pro").click(function(){
			url = "tj/pro.htm" ;
			ee.proDown(url) ;
		}) ;
	} ;
	this.hzPageLook = function(){
		var ft = tj.tjTitle() ;
		tj.v_pageLook({
			tilte:ft.ss+"   "+l_tj.tjmx,
			url:"tj/list.htm",
			cl:[{title:l_tj.HzId,key:"id"},{title:l_tj.Name,key:"xingming"},{title:l_tj.idNum,key:"sfzh"},
			    {title:l_tj.BingLiHao,key:"binglihao"},{title:l_tj.birthday,key:"shengri",func:function(v){return v.substring(0,10) ;}}]
		}) ;
		url = "tj/chartEx.htm" ;
		ee.fs(url, _this.chartPage) ;
	} ;
	this.zdPageLook = function(){
		var ft = tj.tjTitle() ;
		tj.v_pageLook({
			tilte:ft.ss+"   "+l_tj.tjmx,
			url:"tj/list.htm",
			cl:[{title:l_tj.illName,key:"zdmc"},{title:l_tj.zdYs,key:"zdys"},{title:l_tj.zdTime,key:"zdsj"}, {title:l_tj.JiuZhenHao,key:"ghdh"}]
		}) ;
		url = "tj/chartEx.htm" ;
		ee.fs(url, _this.chartPage) ;
	} ;
	this.jcdPageLook = function(){
		var ft = tj.tjTitle() ;
		tj.v_pageLook({
			tilte:ft.ss+"   "+l_tj.tjmx,
			url:"tj/list.htm",
			cl:[{title:l_tj.Jcdh,key:"jcdh"},{title:l_tj.Name,key:"hzName"},{title:l_tj.JcYs,key:"jcys"}, {title:l_tj.Jcxm,key:"jcxm"}
			, {title:l_tj.Jcxm,key:"jcxm",func:function(v){return v.substring(0,10) ;}}]
		}) ;
		url = "tj/chartEx.htm" ;
		ee.fs(url, _this.chartPage) ;
	} ;
	
	//********************************患者来源******************************************************************//
	this.requestDataHzly = function(){
		tj.initPage() ;
		tj.chartEmpty() ;
		url = "tj/chart.htm" ;
		tj.setGroup1("") ;
		ee.fs(url, _this.chartLy) ;
	} ;
	this.chartLy = function(d){
		if(d!=undefined&&typeof(d.obj)=="object"){
			$.each(d.obj,function(i,v){
				v.link = "javascript:new HzTj().requestDataLyEx()" ;
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
	this.requestDataLyEx = function(){
		tj.setGroup1("hz_laiyuan") ;
		url = "tj/chart.htm" ;
		ee.fs(url, _this.chartLyEx) ;
	} ;
	this.chartLyEx = function(d){
		var t = tj.tjTitle() ;
		var chart = {
			chartId:'chart',
		 	chart : { caption :t.ss+l_tj.tj, xAxisName :t.ssx,  yAxisName :l_tj.rc,  numberPrefix :l_tj.rc  },
		 	data:tj.dataToDef(d) 
		 } ;
		tj.b3d("flashChart2", chart) ;
	} ;
	this.title_0_hzly = function(){
		_this.initPage(_this.requestDataHzly) ;
		tj.v_addHuanZheLaiYuan(_this.requestDataHzly) ;
		$("#fTime1").change() ;
		_this.pro() ;
		$("#a_btn_pageLook").click(_this.hzPageLook) ;
	} ;
	
	
	//****************************************患者地区*********************************************************//
	this.requestDataHzdq = function(){
		tj.initPage() ;
		tj.chartEmpty() ;
		url = "tj/chart.htm" ;
		tj.setGroup1("") ;
		ee.fs(url, _this.chartDq) ;
	} ;
	this.chartDq = function(d){
		if(d!=undefined&&typeof(d.obj)=="object"){
			$.each(d.obj,function(i,v){
				v.link = "javascript:new HzTj().requestDataDqEx()" ;
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
	this.requestDataDqEx = function(){
		tj.setGroup1("hz_diqu") ;
		url = "tj/chart.htm" ;
		ee.fs(url, _this.chartDuEx) ;
	} ;
	this.chartDuEx = function(d){
		var t = tj.tjTitle() ;
		var chart = {
			chartId:'chart',
		 	chart : { caption :t.ss+l_tj.tj, xAxisName :t.ssx,  yAxisName :l_tj.rc,  numberPrefix :l_tj.rc  },
		 	data:tj.dataToDef(d) 
		 } ;
		tj.b3d("flashChart2", chart) ;
	} ;
	this.title_1_hzdq = function(){
		_this.initPage(_this.requestDataHzdq) ;
		tj.v_addHuanZheDiQu(_this.requestDataHzdq) ;
		$("#fTime1").change() ;
		_this.pro() ;
		$("#a_btn_pageLook").click(_this.hzPageLook) ;
	} ;
	
	//***********************患者类型**************************************************************************//
	this.requestDataHzLx = function(){
		tj.initPage() ;
		tj.chartEmpty() ;
		url = "tj/chart.htm" ;
		tj.setTjLx("hz") ;
		tj.setGroup1("") ;
		ee.fs(url, _this.chartHzLx) ;
	} ;
	this.chartHzLx = function(d){
		if(d!=undefined&&typeof(d.obj)=="object"){
			$.each(d.obj,function(i,v){
				v.link = "javascript:new HzTj().requestDataLxEx()" ;
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
	this.requestDataLxEx = function(){
		var lx = "hz_xingbie";
		$.each($("#hzlx_>option"),function(i,v){
			if($(v).attr("selected")=="selected"){
				lx = $(v).val() ;
			}
		}) ;
		tj.setTjLx("hz") ;
		tj.setGroup1(lx) ;
		url = "tj/chart.htm" ;
		ee.fs(url, _this.chartLxEx) ;
	} ;
	this.chartLxEx = function(d){
		var g1 = $("#group1").val() ;
		d = tj.booleanToWord(d, g1) ;
		var t = tj.tjTitle() ;
		var chart = {
			chartId:'chart',
		 	chart : { caption :t.ss+l_tj.tj, xAxisName :t.ssx,  yAxisName :l_tj.rc,  numberPrefix :l_tj.rc  },
		 	data:tj.dataToDef(d) 
		 } ;
		tj.b3d("flashChart2", chart) ;
	} ;
	this.title_2_hzlx = function(){
		_this.initPage(_this.requestDataHzLx) ;
		tj.v_groupHz("hzlx_") ;
		$("#hzlx_").change(function(){
			$("#group1").val($("#hzlx_").val()) ;
		}) ;
		tj.v_addHuanZheSex(_this.requestDataHzLx) ;
		tj.v_addHuanZheYiBao(_this.requestDataHzLx) ;
		tj.v_addHuanZheFeiBie(_this.requestDataHzLx) ;
		$("#fTime1").change() ;
		_this.pro() ;
		$("#a_btn_pageLook").click(_this.hzPageLook) ;
	} ;
	//************************患者检查********************************************************************************//
	this.requestDataHzJc = function(){
		tj.initPage() ;
		tj.chartEmpty() ;
		url = "tj/chart.htm" ;
		tj.setGroup1("") ;
		ee.fs(url, _this.chartLx) ;
	} ;
	this.chartLx = function(d){
		if(d!=undefined&&typeof(d.obj)=="object"){
			$.each(d.obj,function(i,v){
				v.link = "javascript:new HzTj().requestDataJcEx()" ;
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
	this.requestDataJcEx = function(){
		
		tj.setGroup1("jcxm") ;
		url = "tj/chart.htm" ;
		ee.fs(url, _this.chartJcEx) ;
	} ;
	this.chartJcEx = function(d){
		var g1 = $("#group1").val() ;
		d = tj.booleanToWord(d, g1) ;
		var t = tj.tjTitle() ;
		var chart = {
			chartId:'chart',
		 	chart : { caption :t.ss+l_tj.tj, xAxisName :t.ssx,  yAxisName :l_tj.rc,  numberPrefix :l_tj.rc  },
		 	data:tj.dataToDef(d) 
		 } ;
		tj.b3d("flashChart2", chart) ;
	} ;
	this.title_3_hzjc = function(){
		_this.initPage(_this.requestDataHzJc) ;
		tj.v_addJcxm(_this.requestDataHzJc) ;
		$("#fTime1").change() ;
		_this.pro() ;
		$("#a_btn_pageLook").click(_this.hzPageLook) ;
	} ;
	
} ;













