
/**
 * 检查单统计入口
 */
function showJcdTj(){
	var tj = new TongJi() ;
	tj.addMenu([{label:l_tj.JcdState},{label:l_tj.zy_mz},{label:l_tj.JcYs}]) ;
	new JcdTj().addEvent() ;
	$("#title_0").click() ;
} ;


function JcdTj(){
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
	this.addEvent = function(){
		$("#title_0").click(_this.title_0_jcdZt) ;
		$("#title_1").click(_this.title_1_ZyMz) ;
		$("#title_2").click(_this.title_2_jcys) ;
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
			tilte:ft.ss+"  " +l_tj.tjmx,
			url:"tj/list.htm",
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
			cl:[{title:l_tj.Jcdh,key:"jcdh"},{title:l_tj.Name,key:"hzName"},{title:l_tj.JcYs,key:"jcys"}
			, {title:l_tj.Jcxm,key:"jcxm",func:function(v){return v.substring(0,10) ;}}
			, {title:l_tj.checkState,key:"state"}]
		}) ;
		url = "tj/chartEx.htm" ;
		ee.fs(url, _this.chartPage) ;
	} ;
	
	//********************************检查单状态******************************************************************//
	this.requestDataJcdZt = function(){
		tj.initPage() ;
		tj.chartEmpty() ;
		tj.setTjLx("jcd") ;
		url = "tj/chart.htm" ;
		tj.setGroup1("") ;
		ee.fs(url, _this.chartJcdZt) ;
	} ;
	this.chartJcdZt = function(d){
		if(d!=undefined&&typeof(d.obj)=="object"){
			$.each(d.obj,function(i,v){
				v.link = "javascript:new JcdTj().requestDataJcdZtEx()" ;
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
	this.requestDataJcdZtEx = function(){
		tj.setTjLx("jcd") ;
		tj.setGroup1("state") ;
		url = "tj/chart.htm" ;
		ee.fs(url, _this.chartJcdZtEx) ;
	} ;
	this.chartJcdZtEx = function(d){
		var t = tj.tjTitle() ;
		var chart = {
			chartId:'chart',
		 	chart : { caption :t.ss+l_tj.tj, xAxisName :t.ssx,  yAxisName :l_tj.rc,  numberPrefix :l_tj.rc  },
		 	data:tj.dataToDef(d) 
		 } ;
		tj.b3d("flashChart2", chart) ;
	} ;
	this.title_0_jcdZt = function(){
		_this.initPage(_this.requestDataJcdZt) ;
		tj.v_addJcks(_this.requestDataJcdZt) ;
		tj.v_addJcxm(_this.requestDataJcdZt) ;
		tj.v_addHuanZheYanBie(_this.requestDataJcdZt) ;
		tj.v_addZt(_this.requestDataJcdZt) ;
		$("#fTime1").change() ;
		_this.pro() ;
		$("#a_btn_pageLook").click(_this.jcdPageLook) ;
	} ;
	
	//********************************住院门诊******************************************************************//
	this.requestDataZyMz = function(){
		tj.initPage() ;
		tj.chartEmpty() ;
		tj.setTjLx("jcd") ;
		url = "tj/chart.htm" ;
		tj.setGroup1("") ;
		ee.fs(url, _this.chartZyMz) ;
	} ;
	this.chartZyMz = function(d){
		if(d!=undefined&&typeof(d.obj)=="object"){
			$.each(d.obj,function(i,v){
				v.link = "javascript:new JcdTj().requestDataZyMzEx()" ;
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
	this.requestDataZyMzEx = function(){
		tj.setTjLx("jcd") ;
		tj.setGroup1("zb") ;
		url = "tj/chart.htm" ;
		ee.fs(url, _this.chartJcdZtEx) ;
	} ;
	this.chartJcdZtEx = function(d){
		var t = tj.tjTitle() ;
		var chart = {
			chartId:'chart',
		 	chart : { caption :t.ss+l_tj.tj, xAxisName :t.ssx,  yAxisName :l_tj.rc,  numberPrefix :l_tj.rc  },
		 	data:tj.dataToDef(d) 
		 } ;
		tj.b3d("flashChart2", chart) ;
	} ;
	this.title_1_ZyMz = function(){
		_this.initPage(_this.requestDataZyMz) ;
		tj.v_addJcks(_this.requestDataZyMz) ;
		tj.v_addJcxm(_this.requestDataZyMz) ;
		tj.v_addHuanZheYanBie(_this.requestDataZyMz) ;
		tj.v_zhenBie(_this.requestDataZyMz) ;
		$("#fTime1").change() ;
		_this.pro() ;
		$("#a_btn_pageLook").click(_this.jcdPageLook) ;
	} ;
	
	//********************************检查医生******************************************************************//
	this.requestDataJcys = function(){
		tj.initPage() ;
		tj.chartEmpty() ;
		tj.setTjLx("jcd") ;
		url = "tj/chart.htm" ;
		tj.setGroup1("") ;
		ee.fs(url, _this.chartJcys) ;
	} ;
	this.chartJcys = function(d){
		if(d!=undefined&&typeof(d.obj)=="object"){
			$.each(d.obj,function(i,v){
				v.link = "javascript:new JcdTj().requestDataJcysEx()" ;
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
	this.requestDataJcysEx = function(){
		tj.setTjLx("jcd") ;
		tj.setGroup1("jcys") ;
		url = "tj/chart.htm" ;
		ee.fs(url, _this.chartJcysEx) ;
	} ;
	this.chartJcysEx = function(d){
		var t = tj.tjTitle() ;
		var chart = {
			chartId:'chart',
		 	chart : { caption :t.ss+l_tj.tj, xAxisName :t.ssx,  yAxisName :l_tj.rc,  numberPrefix :l_tj.rc  },
		 	data:tj.dataToDef(d) 
		 } ;
		tj.b3d("flashChart2", chart) ;
	} ;
	this.title_2_jcys = function(){
		_this.initPage(_this.requestDataJcys) ;
		tj.v_addJcks(_this.requestDataJcys) ;
		tj.v_addJcxm(_this.requestDataJcys) ;
		tj.v_addJcys(_this.requestDataJcys) ;
		tj.v_addHuanZheYanBie(_this.requestDataJcys) ;
		tj.v_zhenBie(_this.requestDataZyMz) ;
		$("#fTime1").change() ;
		_this.pro() ;
		$("#a_btn_pageLook").click(_this.jcdPageLook) ;
	} ;
} ;













