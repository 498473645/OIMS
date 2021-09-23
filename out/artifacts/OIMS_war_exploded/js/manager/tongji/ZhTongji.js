//importJS("/js/manager/tongji/tongjiPlugin.js") ;

//function show(){
//	var tj = new TongJi() ;
//	tj.addMenu([{label:"综合统计"}]) ;
//	tj.pageChartShowCount();
////	tj.addAutoEle("aya", new Ele().makeInput({id:"tt"})) ;
////	tj.v_group("wowo", "和我") ;
//	tj.v_addTjlx() ;
//	tj.v_addJcxm();
//	tj.v_addHuanZheLaiYuan() ;
//	tj.v_addHuanZheDiQu() ;
//	tj.v_addHuanZheJianCha();
//	tj.v_addHuanZheZD();
//	tj.v_addJcks() ;
//	tj.v_addJcxm() ;
//	tj.v_addJcsb() ;
//	tj.v_addZdYs() ;
//	tj.v_addJcys() ;
//	tj.v_addHuanZheYanBie() ;
//	tj.v_addHuanZheSex() ;
//	tj.v_addHuanZheYiBao() ;
//	tj.v_addZt() ;
//	tj.v_addHuanZheFeiBie() ;
//} ;

/**
 * 综合统计入口
 */
function showZhTj(){
	var tj = new TongJi() ;
	tj.addMenu([{label:l_tj.zhTj}]) ;
	new ZhTj().addEvent() ;
	$("#title_0").click() ;
} ;

function ZhTj(){
	var _this = this ;
	var tj = new TongJi() ;
	var ee = new Ele() ;
	this.requestData = function(){
		tj.initPage() ;
		tj.chartEmpty() ;
		url = "tj/chart.htm" ;
		ee.fs(url, _this.chart) ;
	} ;
	this.chart = function (d){
		if(d!=undefined&&typeof(d.obj)=="object"){
			$.each(d.obj,function(i,v){
				if(v.label!=l_tj.other){
					if(v.tag!="tag")
						v.link = "javascript:new ZhTj().requestDataEx('"+tj.toAsc(v.tagLabel+"<fg>"+v.tag)+"')" ;
				}
			}) ;
		}
		var g1 = $("#group1").val() ;
		d = tj.booleanToWord(d, g1) ;
		var t = tj.tjTitle() ;
		var chart = {
			chartId:'chart',
		 	chart : { caption :t.ss+l_tj.tj, xAxisName :t.ssx,  yAxisName :l_tj.rc,  numberPrefix :l_tj.rc  },
		 	data:tj.dataToDef(d) 
		 } ;
		tj.c3d("flashChart1", chart) ;
	} ;
	
	this.requestDataEx = function(p){
		if($("#group2").val()==""){
			 $.oimsAlert(l_tj.choose2Group) ;
			 return ;
		}
		url = "tj/chartEx.htm" ;
		ee.fs(url, _this.chartEx,p) ;
		$("#findEx").val("") ;
	} ;
	this.chartEx = function (d){
		var g1 = $("#group2").val() ;
		d = tj.booleanToWord(d, g1) ;
		var t = tj.tjTitle() ;
		var chart = {
			chartId:'chartEx',
		 	chart : { caption :t.ss+l_tj.tj ,useRoundEdges:"1", xAxisName :t.ssx,  yAxisName :l_tj.rc,  numberPrefix :l_tj.rc  },
		 	data:tj.dataToDef(d) 
		 } ;
		tj.b3d("flashChart2", chart) ;
	} ;
	
	this.event = function(h){
		tj.v_addHuanZheLaiYuan(h) ;
		tj.v_addHuanZheDiQu(h) ;
		tj.v_addHuanZheZD(h) ;
		tj.v_addHuanZheJianCha(h) ;
		
		tj.v_addJcks(h) ;
		tj.v_addJcxm(h) ;
		tj.v_addJcsb(h) ;
		tj.v_addJcys(h) ;
		tj.v_addZdYs(h) ;
		tj.v_zhenBie(h) ;
		tj.v_addHuanZheFeiBie(h) ;
		tj.v_addHuanZheSex(h) ;
		tj.v_addHuanZheYanBie(h) ;
		tj.v_addHuanZheYiBao(h) ;
		tj.v_addZt(h) ;
		
	} ;
	this.addEvent = function(){
		$("#title_0").click(function(){
			
			tj.pageChartShowCount(_this.requestData) ;
			tj.showGroupKind() ;
			tj.setGroup1("zd.category") ;//页面分组
			_this.event(_this.requestData) ;
			
			$("#a_btn_pageLook").bind('click',_this.hzPageLook) ;
			$("#tjlx").change(function(){
				var tjlx = $(this).val() ;
				if(tjlx=="hz"){
					$("#a_btn_pageLook").unbind('click',_this.zdPageLook) ;
					$("#a_btn_pageLook").unbind('click',_this.jcdPageLook) ;
					$("#a_btn_pageLook").bind('click',_this.hzPageLook);
				}else if(tjlx=='jcd'){
					$("#a_btn_pageLook").unbind('click',_this.zdPageLook);
					$("#a_btn_pageLook").unbind('click',_this.hzPageLook);
					$("#a_btn_pageLook").bind('click',_this.jcdPageLook);
				}else if(tjlx=='zd'){
					$("#a_btn_pageLook").unbind('click',_this.jcdPageLook);
					$("#a_btn_pageLook").unbind('click',_this.hzPageLook);
					$("#a_btn_pageLook").bind('click',_this.zdPageLook);
				}
			}) ;
			
			$("#a_btn_pro").click(function(){
				url = "tj/pro.htm" ;
				ee.proDown(url) ;
			}) ;
		}) ;
	} ;
	var t = tj.tjTitle() ;
	this.hzPageLook = function(){
		var ft = tj.tjTitle() ;
		tj.v_pageLook({
			tilte:ft.ss+"  "+l_tj.tjmx,
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
			tilte:ft.ss+"  "+l_tj.tjmx,
			url:"tj/list.htm",
			cl:[{title:l_tj.illName,key:"zdmc"},{title:l_tj.zdYs,key:"zdys"},{title:l_tj.zdTime,key:"zdsj"}, {title:l_tj.JiuZhenHao,key:"ghdh"}]
		}) ;
		url = "tj/chartEx.htm" ;
		ee.fs(url, _this.chartPage) ;
	} ;
	this.jcdPageLook = function(){
		var ft = tj.tjTitle() ;
		tj.v_pageLook({
			tilte:ft.ss+"  "+l_tj.tjmx,
			url:"tj/list.htm",
			cl:[{title:l_tj.Jcdh,key:"jcdh"},{title:l_tj.Name,key:"hzName"},{title:l_tj.JcYs,key:"jcys"}
			, {title:l_tj.Jcxm,key:"jcxm",func:function(v){return v.substring(0,10) ;}},{title:l_tj.State,key:"state"}]
		}) ;
		url = "tj/chartEx.htm" ;
		ee.fs(url, _this.chartPage) ;
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
} ;
