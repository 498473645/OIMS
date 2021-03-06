/**
 * @author 于洋 元素类，提供元素的jquery对象
 * @class
 */
function Ele(){
	var _this = this ;
	this.req = function(url,fn){
		var ar = _this.formAr() ;
		var d = {json:Math.random()*10} ;
		$.each(ar,function(i,v){
			var s = "({"+v.name+":\""+v.value+"\"})" ;
			$.extend(d,eval(s)) ;
		}) ;
		$.post(url,d,function(d){
			var rt  ;
			try{
				rt =JSON.parse(d.responseText) ;
				if(typeof(fn)=='function')
					fn(rt) ;
				else
					new TongJi().error("ele.formsubmit not callback function") ;
			}catch (e) {
//				new TongJi().error("程序异常") ;
				fn() ;
			}
		},"json") ;
	} ;
	
	this.fs = function(url,fn,p){
	
		$("#findEx").val(p) ;
		var f = $("#submitForm") ;
		f.attr("action",url) ;
		
		f.ajaxForm() ;
		f.ajaxSubmit({complete:function(d,e){
			var rt  ;
			try{
				rt =JSON.parse(d.responseText) ;
				if(typeof(fn)=='function'){
					fn(rt) ;
				}
				else{
					alert("ele.formsubmit not callback function") ;
				}
					
			}catch (e) {
//				new TongJi().error("程序异常") ;
				fn();
			}
		}}) ;
	} ;
	/**
	 * 用form提交
	 * @param ar {Array} [{name:"",value:""}]
	 * @param fn {function} 回调方法
	 */
	this.formsubmit = function(url,fn){
		var ar = _this.formAr() ;
		var f = "<form method='post' action="+url+" />" ;
		f = $(f) ;
		$.each(ar,function(i,v){
			f.append($("<input type='hidden' name="+v.name+" value="+v.value+" />")) ;
		}) ;
		f.appendTo("body") ;
		f.ajaxForm() ;
		f.ajaxSubmit({complete:function(d,e){
			var rt  ;
			try{
				rt =JSON.parse(d.responseText) ;
				if(typeof(fn)=='function')
					fn(rt) ;
				else
					alert("ele.formsubmit not callback function") ;
				f.remove() ;
			}catch (e) {
//				new TongJi().error("程序异常") ;
				f.remove() ;
			}
		}}) ;
	} ;
	
	this.formAr = function(){
		var ar = new Array() ;
		var f = $("#chartShowCount") ;
		var tmp  ;
		$("input",f).each(function(){
			tmp = $(this);
			ar.push({name:tmp.attr("name"),value:tmp.val()}) ;
		}) ;
		$("select",f).each(function(){
			tmp = $(this) ;
			ar.push({name:tmp.attr("name"),value:tmp.val()}) ;
		}) ;
		tmp = undefined ;
		return ar ;
	} ;
	
	/**
	 * 页面日历插件统一接口,给元素加日历插件方法
	 * @author 于洋
	 * @param id {String}元素id
	 * @param changeFn {function}change事件方法
	 * @param clickFn {function }单击事件方法
	 */
	this.rili = function (id){
		_this.calendarFun(id,-130) ;
	} ;
	
	/**
	 * 日历插件
	 * @author 于洋
	 * @param id {String} 元素id
	 * @param leftWidth {number} 向左移动像素值
	 */
	this.calendarFun = function (id,leftWidth){
		 var cal = Calendar.setup({
	        onSelect: function(cal) { cal.hide();
				 var date = cal.selection.get();
	            if (date) {
	            		var dd = document.getElementById(id).value ;
	                    date = Calendar.intToDate(date);
	                    document.getElementById(id).value = Calendar.printDate(date, "%Y-%m-%d");
	                    if(dd!=document.getElementById(id).value)
	                    	$("#"+id).change() ;
	            }
			  }
	    });
		cal.widthLength(id);
		cal.topLength(id);
	    cal.manageFields(id, id, "%Y-%m-%d");
	    if(!leftWidth){
	   	 leftWidth = 0;
	   }
	   cal.manageFields(id, id, "%Y-%m-%d",leftWidth);
	} ;
	
	
	
	/**
	 * 点击后自动下载
	 * {select:"",from:"",where:"",order:"",group:""}{cs:cp,head:head}
	 * @author 于洋
	 * @param url{String}
	 * @param d {Object} "{select:"",from:"",where:"",order:"",group:"",cs:cp,head:head}"
	 * 
	 */
	this.proDown = function (url){
		var f = $("#submitForm") ;
		f.attr("action",url) ;
		f.get(0).submit() ;
	} ;
	
	/**
	 * @param p {name:"",id:""}
	 * @returns  jquery input
	 * <p>返回jquery input 对象</p>
	 */
	this.makeInput = function(p){
		var s = " <input type='text'  class='blur' > " ;
		s = $(s) ;
		if(p==undefined)
			return s ;
		if(p.id!=undefined){
			s.attr("id",p.id) ;
			s.attr("name",p.id) ;
		}
		if(p.name!=undefined){
			s.attr("name",p.name) ;
		}
		return s ;	
	} ;
	/**
	 * @param p {name:"",id:"",defOption:boolean,array:[{k:"",v:""}]}
	 * @returns jquery select
	 * <p>返回jquery select 对象</p>
	 */
	this.makeSelect  = function(p){
		var s = " <select   > " ;
		s = $(s) ;
		if(p==undefined)
			return s ;
		if(p.id!=undefined){
			s.attr("id",p.id) ;
			s.attr("name",p.id) ;
		}
		if(p.name!=undefined){
			s.attr("name",p.name) ;
		}
		if(p.def){
			s.append($("<option />")) ;
		}
		if(typeof(p.array)=="object"&&p.array.length>0){
			$.each(p.array,function(i,v){
				if(!v)return false ;
				s.append($("<option />").val(v.v).text(v.k)) ;
			}) ;
		}
		return s ;
	} ;
	/**
	 * @param array Array
	 * @param p 转化参数
	 * @returns Array()
	 * <p>
	 * 参数p {k:"",v:""}
	 * k为对应array元素对象中，要转成option中显示的文字的属性
	 * v为对应array元素对象中，要转成option中value的属性
	 * </p>
	 */
	this.makeSelectArray = function (array,p){
		var ar = new Array() ;
		$.each(array,function(i,v){
			if(!v)return false ;
			var a = {k:"",v:""} ;
			a.k = eval("v."+p.k) ;
			a.v = eval("v."+p.v)  ;
			ar.push(a) ;
		}) ;
		return ar ;
	} ;
	
	
	/**
	 * @param id select 元素id
	 * @param change /**
	 * 拿到数据为select 元素添加选项
	 */
	this.addSelectOption = function (id,ar){
		var select = $("#"+id) ;
		$.each(ar,function(i,v){
			select.append("<option value="+v.v+" >"+v.k+"</option>") ;
		}) ;
	} ;
	/**
	 * @param start
	 * @param end 
	 * <p>返回一个年份的下拉，当前时间如果在start  与 end 范围会自动选中</p>
	 * 
	 */
	this.makeYear = function (id,change,start,end){
		var d = new Date() ;
		var m = new Array() ;
		var cy = d.getFullYear() ;
		if(start==undefined&&end==undefined){
			var y = cy -10 ;
			for(y;y<cy+10;y++)
				m.push({k:y,v:y}) ;
		}else{
			for(var i=start;i<end;i++)
				m.push({k:i,v:i}) ;
		}
		var year = new Ele().makeSelect({id:id,array:m}) ;
		year.children().each(function(i){
			var t = $(this) ;
			if(t.val()==cy){
				t.attr("selected","selected") ;
				return false ;
			}
		}) ;
		if(change)
			year.change(change) ;
		return year ;
	} ;
	/**
	 * @param id select 元素id
	 * @param change 
	 * <p>返回一个月份的下拉，当前时间会自动选中</p>
	 * 
	 */
	this.makeMonth = function (id,change){
		var m = new Array() ;
		for(var i=1;i<13;i++)
			m.push({k:i,v:i}) ;
		var month = new Ele().makeSelect({id:id,array:m}) ;
		var d = new Date() ;
		var cm = d.getMonth()+1 ;
		month.children().each(function(i){
			var t = $(this) ;
			if(t.val()==cm){
				t.attr("selected","selected") ;
				return false ;
			}
		}) ;
		month.change(change) ;
		return month ;
	} ;
	
	/**
	 * @param id 
	 * @param c_eleId 容器元素id
	 * <p>添加一个时间组件</p>
	 */
	this.makeTime = function (id,c_eleId){
		var time = _this.makeInput({id:id}) ;
		var fatherEle = $("#"+c_eleId) ;
		fatherEle.append(time) ;
		_this.rili(id) ;
	} ;
	
} ;

/**
 * @author 于洋
 * @class 
 * 常用方法类
 */
function UtilTool(){
	var _this = this ;
	/**
	  * @author 于洋
	  * @param id
	  * @returns {String}
	  * 页面元素中得到的是"{value},{value},...."
	  * 在hql中列属性为字符串时，把值转成"'{value}','{value}',...."
	  */
	 this.rtInputSplitString = function (id,tag){
		 tag = tag == undefined?",":tag ;
			var vl = $("#"+id).val() ;
		 if(vl==undefined) return "" ;
			var vs = vl.split(tag) ;
			var rt = "" ;
			$.each(vs,function(i,v){
				if(v==undefined) return false ;
				if(rt=="")
					rt+="'"+v+"'" ;
				else
					rt+=",'"+v+"'" ;
			}) ;
			rt = rt=="''"?"":rt ;
			return rt ;
		};
		
		/**
		 * 返回多选按钮所选中的值
		 * @param 多选按钮 name属性
		 * @param f 多选按钮所在的form 如果是空，默认为document
		 * @param type=str 返回格式"'','',''..." type=undefined返回  ",,,,..."
		 */
		this.rtCheckboxClickVal = function (n,f,type){
			var dn = (type!=undefined&&type=='str')?"'":"" ;
			 var d = "";
		        f = f==undefined?document:f;
		        $.each($("input:checkbox[name='"+ n+"']",f),function(i,v){
		            if(v==undefined) return ;
		            if($(v).attr("checked")=="checked"){
		            	if(d=="")
		            		d = dn+$(v).val()+dn;
		            	else
		            		d+=","+dn+$(v).val()+dn;
		            }
		        }) ;
		        return d ;
		} ;
	
	/**
	 * 返回单选按键的值
	 * @param n 单选按钮 name属性
	 * @param f 单选按钮所在的form 如果是空，默认为document
	 * @returns {String}
	 */
   this.rtRadioClick = function (n,f){
       var d = "";
       f = f==undefined?document:f;
       $.each($("input:radio[name='"+ n+"']",f),function(i,v){
           if(v==undefined) return ;
           if($(v).attr("checked")=="checked"){
               d = $(v).val();
               return false ;
           }
       }) ;
       return d ;
   } ;
   /**
	 * @param array Array
	 * @param p 转化参数
	 * @returns Array()
	 * <p>
	 * 参数p {k:"",v:""}
	 * k为对应array元素对象中，要转成option中显示的文字的属性
	 * v为对应array元素对象中，要转成option中value的属性
	 * </p>
	 */
	this.rtSelectArray = function (array,p){
		var ar = new Array() ;
		$.each(array,function(i,v){
			if(!v)return false ;
			var a = {k:"",v:""} ;
			a.k = eval("v."+p.k) ;
			a.v = eval("v."+p.v)  ;
			ar.push(a) ;
		}) ;
		return ar ;
	} ;
	
	/**
     * 返回指定时间的 字符串形式
     * @param {Data} d 
     * @returns {string} yyyy-mm-dd
     */
	this.yyyy_mm_dd = function (d){
		var str=d.getUTCFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
		return str;
	} ;
	 /**
     * 返回指定时间的 字符串形式
     * @param d Data
     * @returns string yyyy-mm-dd hh:mm:ss
     */
	this.yyyy_mm_dd_hms = function (d){
		var str=d.getUTCFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+
			" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
		return str;
	} ;
	
	 /**
     * 得到指定年月的最后一天
     * @returns String yyyy-mm-dd
     */
    this.lastDay = function (nian,yue){
        nian= nian==undefined?undefined:Number(nian) ;
        yue= yue==undefined?undefined:Number(yue) ;
        var d = new Date() ;
        var y = nian==undefined?d.getFullYear():nian ;
        var m = yue==undefined?(d.getMonth()+1):yue ;
        return  y+"-"+m+"-"+_this.getlastDay(y,m) ;
    } ;
    /**
     * 得到指定年月的最后一天
     * @returns int 28 or 29 or 30 or 31
     */
    this.getlastDay = function (y,m){
        if(m==1||m==3||m==5||m==7||m==8||m==10||m==12)
            return 31 ;
        else if(m==4||m==6||m==9||m==11)
            return 30 ;
        else if(y%4!=0&&m==2)
            return 28 ;
        else
            return 29 ;
    };
	/**
     * 某年某月的第一天
     * @param nian
     * @param yue
     * @returns String yyyy-mm-dd
     */
    this.firstDay = function (nian,yue){
        nian= nian==undefined?undefined:Number(nian) ;
        yue= yue==undefined?undefined:Number(yue) ;
        var d = new Date() ;
        var y = nian==undefined?d.getFullYear():nian ;
        var m = yue==undefined?(d.getMonth()+1):yue ;
        return y+"-"+m+"-"+1 ;
    } ;
} ;

/**
 * @author 于洋 统计插件件类 ，
 * @returns
 */
function TongJi(){
	var _this = this ;
	var r = $("#right") ;
	var ele = new Ele() ;
	/**
	 * 统计 统一 提示接口
	 * 
	 */
	this.alert = function (info,cbFn,fnPm){
		alert(info) ;
		if(typeof(cbFn)=="function")
			cbfn(fnPm) ;
	} ;
	/**
	 * 统计 统一错误接口
	 */
	this.error = function(info,cbFn,fnPm){
		alert(info) ;
		if(typeof(cbFn)=="function")
			cbfn(fnPm) ;
	} ;
	
	
	/**
	 * 
	 * 生成报表头字符串
	 * @param ds  :{index:"",title:"",column:"",defValue:"",tValue:"",fValue:""}
	 * @returns {String}
	 */
	this.getProHead = function (ds){
		var rt ="" ;
		$.each(ds,function(i,v){
			if(i==undefined) return false ;
			if(rt!="")
				rt+="," ;
			rt+="index"+"<kv>"+(v.index==undefined?"":v.index) ;
			rt+="<f>"+"title"+"<kv>"+(v.title==undefined?"":v.title)  ;
			rt+="<f>"+"column"+"<kv>"+(v.column==undefined?"":v.column);
			rt+="<f>"+"defValue"+"<kv>"+(v.defValue==undefined?"":v.defValue) ;
			rt+="<f>"+"tValue"+"<kv>"+(v.tValue==undefined?"t":v.tValue) ;
			rt+="<f>"+"fValue"+"<kv>"+(v.fValue==undefined?"f":v.fValue) ;
			rt+="<f>"+"type"+"<kv>"+(v.type==undefined?"str":v.type) ;
			rt+="<f>"+"width"+"<kv>"+(v.width==undefined?"100":v.width) ;
		}) ;
		return rt ;
	} ;
	
	/**
	 * 显示统计图表，在调用本方法前不要remove掉原来的装载flashChart的div
	 * @author 于洋
     * @param chart {Object} {
     * 	chart : { caption :"患者地区统计" , xAxisName :"地区",  yAxisName :"人次",  numberPrefix :"人"  },
     * 	data:[ {"value":0,"label":l_tj.noDate,"link":"javascript:alert('not data')"}] ,
     *  chartId:"",
     *  width:"",
     *  height:""
     * }
     * 
	 */
	this.c3d = function(id,chart){
	if(chart.data==undefined||chart.data.length==0){
			chart.data = [{label:l_tj.noDate,value:0}] ;
		}
		 var chartEx = {
//			       showVlineLabelBorder:0	   ,
//			       unescapeLinks:'0',
//		           logoURL:contextPath+"/images/l0g0Canve.png",
//		           logoLink:"#"
		       } ;
		       $.extend(chart.chart,chartEx) ;
		var param = {} ;
	       param.id = "chart"+(Math.random()*10) ;
	       param.swfUrl = contextPath+"/FusionCharts/Column3D.swf" ;
	       param.width = chart.width==undefined?580:chart.width ;
	       param.height = chart.height==undefined?330:chart.height ;
	       param.dataFormat="json" ;
	       param.debugMode = false ;
	       param.dataSource = {
	    		   styles:{
	    			   definition:[{name:"Font_0", type:"font",size:"16"},{name:"Font_1", type:"font",size:"12"}],
	    			   application:[{"toobject": "CAPTION",styles:"Font_0"},
	    			                {"toobject": "DATALABELS",styles:"Font_1"},
	    			                {"toobject": "DATAPLOT",styles:"Font_1"}]
	    		   },
	    		   chart:chart.chart,
	    		   data:chart.data
	       };
	       if($("#"+id).get(0)==null){
	    	   var chartDiv = $("<div class='square1' id="+id+" />") ;
	    	   $("#flashChart").append(chartDiv) ;
	       }
	    	   
	       $("#"+id).disposeFusionCharts() ;
	       $("#"+id).insertFusionCharts(param);
	} ;
	this.b3d = function(id,chart){
		if(chart.data==undefined||chart.data.length==0){
			chart.data = [{label:l_tj.noDate,value:0}] ;
		}
			var chartEx = {
	    		unescapeLinks:'0',
		    	showVlineLabelBorder:0,
		    	logoURL:contextPath+"/images/l0g0Canve.png",
		        logoLink:"#"
	        } ;
			chart.chart.numberSuffix = chart.chart.numberPrefix ;
			chart.chart.numberPrefix = "" ;
	        $.extend(chart.chart,chartEx) ;
		
	       var param = {} ;
	       param.id = chart.chartId+Math.random() ;
	       param.swfUrl = contextPath+"/FusionCharts/Pie3D.swf" ;
	       param.width = chart.width==undefined?580:chart.width ;
	       param.height = chart.height==undefined?330:chart.height ;
	       param.dataFormat="json" ;
	       param.debugMode = false ;
	       param.dataSource = {
	    		   chart:chart.chart,
	    		   data:chart.data
	       };
	       if($("#"+id).get(0)==null){
	    	   var chartDiv = $("<div class='square1' id="+id+" />") ;
	    	   $("#flashChart").append(chartDiv);
	       }
	       $("#"+id).disposeFusionCharts() ;
	       $("#"+id).insertFusionCharts(param);
	      
	} ;
	
	/**
	 * 页面元素布局,默认会添加到#right元素上
	 * @author 于洋
	 * @returns {Object} jquery页面元素对象
	 */
	this.pageChartShowCount = function(h){
		
		_this.initPage();
		$("#submitForm").remove() ;
		var el = "<form method='post' id='submitForm'>"+
			"<div id=\"chartShowCount\" >" +
        "<table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" class=\"statistics\">" +
        "<tbody>" +
        "<tr>" +
        "<td align=\"center\">" +
        "<div id=\"flashChart\" class=\"statisticssquare\" style=\"height: 450px;\">" +
        " <div id=\"flashChart1\" class=\"square1\"> <!--flashChart1 --></div>" +
        "</div>" +
        "</td>" +
        "<td valign=\"top\">" +
        "<div class=\"statisticsfrom1\" style=\"height: 430px; width: 230px; overflow-y: scroll;\">" +
        "  <div id=\"findTitle\" class=\"t\"><span class=\"openicon\"></span>"+l_tj.tj+"</div>" +
        "" +
        "<table id=\"findForm\" width=\"98%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" >" +
        "<tbody>" +
        "  <tr>" +
        "<td align=\"center\" colspan=\"2\">" +
        "<input type=\"radio\" name=\"timeType\" id=\"timeType_1\" value=\"timeType_1\" checked=\"checked\">" +
        l_tj.ny +
        "<input type=\"radio\" name=\"timeType\" id=\"timeType_2\" value=\"timeType_2\">" +
        l_tj.Time +
        "</td>" +
        "  </tr>" +
        "  <tr>" +
        "<td width=\"36%\" align=\"right\" id=\"time1_lbl\"></td>" +
        "<td width=\"62%\" id=\"time1_el\"><!--time1 --></td>" +
        "  </tr>" +
        "  <tr>" +
        "<td align=\"right\" id=\"time2_lbl\"></td>" +
        "<td id=\"time2_el\"><!-- time2 --></td>" +
        "</tr>" +
        "<!--   " +
        "<tr> " +
        "<td width=\"36%\" align=\"right\"></td>" +
        "<td width=\"62%\"></td>" +
        "</tr>" +
        "-->" +
        "</tbody>" +
        "</table>" +
        "<div class=\"buttonsytle1 bton\">" +
        "<a id=\"a_btn_pro\"><span class=\"report\"></span>"+l_tj.creatProc+"</a>" +
        "<a id=\"a_btn_pageLook\"><span class=\"view\"></span>"+l_tj.pageLook+"</a>" +
        "</div>       " +
        "</div>" +
        "</td>" +
        "</tr>" +
        "</tbody>" +
        "</table>       " +
        "</div>"+
        "</form>";
		var rt = $(el) ;
		
		$("#findTitle",rt).click(function(e){
			var tmp = $("<div class='statisticsfrom' id='showQuery'>") ;
			tmp.append(l_tj.tj) ;
			$(".statisticsfrom1").parent().append(tmp) ;
			$(".statisticsfrom1").hide(500) ;
			var h = $("#right").height()-$(".title").height() ;
			tmp.height(h) ;
			tmp.click(function(){
				$(".statisticsfrom1").show(500);
				tmp.remove() ;
			}) ;
		}) ;
		/**
		 * @author 于洋
		 * @param id 生成元素的id
		 * @param h change事件执行方法
		 * @returns
		 * 统计模块页面添加的时间元素，默认选中当前年，并添加change事件（类型1）
		 */
		var _timeType1 = function(){
			
			$("#time1_lbl").html(l_tj.year) ;
			$("#time1_el").html(ele.makeYear("fTime1")) ;
			$("#time2_lbl").html(l_tj.month) ;
			$("#time2_el").html(ele.makeMonth("fTime2")) ;
			$("#fTime1").change(h) ;
			$("#fTime2").change(h) ;
		} ;
		/**
		 * @author 于洋
		 * @param id 生成元素的id
		 * @param h change事件执行方法
		 * @returns
		 * 统计模块页面添加的时间元素，默认选中当前年，并添加change事件（类型2）
		 */
		var _timeType2 = function(){
			
			$("#time1_lbl").html(l_tj.startTime) ;
			$("#time1_el",rt).html("") ;
			ele.makeTime("fTime1", "time1_el") ;
			$("#time2_lbl").html(l_tj.endTime) ;
			$("#time2_el",rt).html("") ;
			ele.makeTime("fTime2", "time2_el") ;
			$("#fTime1").change(h) ;
			$("#fTime2").change(h) ;
		} ;
		$("input:radio[name='timeType']",rt).each(function(i){//添加时间类型change事件 
			$(this).change(function(e){
				if($(e.currentTarget).val()=="timeType_1"){
					_timeType1() ;
				}else{
					_timeType2() ;
				}
			}) ;
		}) ;
		$("#right").append(rt) ;
		$("#timeType_1").change() ;
		_this.tableHeight() ;
		_this.groupKind(h) ;
		_this.setGroup1("") ;
		_this.setGroup2("") ;
		_this.addAutoEle("",$("<input type='hidden' name='findEx' id='findEx' />"),"findExTd") ;
		$("#findExTd").hide() ;
		return rt ;
	} ;
	
	this. groupKind = function(h){
		_this.v_addTjlx(h) ;
		_this.v_group("group1",l_tj.group1,undefined,"rtgroup1") ;
		_this.v_group("group2",l_tj.group2,undefined,"rtgroup2") ;
		$("#group1").change(h) ;
//		$("#group2").change(h) ;
		$("#trtjlx").hide() ;
		$("#rtgroup1").hide() ;
		$("#rtgroup2").hide() ;
	} ;
	
	this.showGroupKind = function(){
		$("#trtjlx").show() ;
		$("#rtgroup1").show() ;
		$("#rtgroup2").show() ;
	} ;
	
	this.chartEmpty = function(){
		$("#flashChart").empty() ;
	} ;
	this.initPage = function(){
		if($("#flashChart1").length==1)
		 $("#flashChart1").disposeFusionCharts() ;
		if($("#flashChart2").length==1)
		 $("#flashChart2").disposeFusionCharts() ;
		if($("#flashChart3").length==1)
		 $("#flashChart3").disposeFusionCharts() ;
		if($("#flashChart4").length==1)
		 $("#flashChart4").disposeFusionCharts() ;
		if($("#flashChart5").length==1)
		 $("#flashChart5").disposeFusionCharts() ;
	} ;
	this.addTimeTypeEvent = function(h){
		$("#fTime1").change(h) ;
		$("#fTime2").change(h) ;
	} ;
	

	/**
	 * <p>添加统计menu组件 用ar参数配置标签菜单 ，点击高亮显示,默认会添加到#right元素上</p>
	 * @param ar [{label:""}]
	 * 
	 */
	this.addMenu = function (ar){
		var ele = "<div class=\"tablabel\" id='div_title'>\n"  ;
//		var _this = this ;
		if(typeof(ar)=="object"&&ar.length>0)
			$.each(ar,function(i,v){
				ele+= "  <div  class=\"tab_hide\" id=\"title_"+i+"\"><span>"+v.label+"</span></div>\n" ;
			}) ;
		ele+="  </div>"  ;
		r.append($(ele)) ;
		$("#div_title").children().each(function(i){//给每个菜单添加单击事件
			$(this).click(function(e){
				$("#div_title").children().each(function(){
					$(this).removeClass() ;
					$(this).addClass("tab_hide") ;
				}) ;
				$(e.currentTarget).removeClass("tab_hide") ;
				$(e.currentTarget).addClass("tab_show") ;
			}) ;
		}) ;
		$("#title_0",$("#div_title")).addClass("tab_show") ;
		$("#right").append($("#div_title")) ;
		return $("#div_title") ;
	} ;
	
	this.hiddenChart = function(){
		var chartp = $("#chartShowCount") ;
		$("#flashChart1",chartp).hide() ;
	} ;
	this.tableHeight = function(){
		var h = r.height()-$(".title").height()-$("#div_title").height() ;
		$(".statisticsfrom1").height(h) ;
		$("#flashChart").height(h) ;
		
	} ;
	/**
	 * 向右边的查询条件tabel中添加元素
	 * @author 于洋
	 * @param {String} title
	 * @param {Object} ele jqueryObject
	 */
	this.addAutoEle=function(title,ele,id){
		var ids = id?"id="+id:"" ;
		  var jq = "<tr "+ids+"> " +
	        "<td width=\"36%\" align=\"right\">"+title+"</td>" +
	        "<td width=\"62%\"></td>" +
	        "</tr>"  ;
		  var tmp = $(jq) ;
		  $("td",tmp).last().append(ele) ;
		$("#findForm").append(tmp) ;
	} ;
	
	
	/**
	 * 直接添加一个table的tr 
	 */
	this.addAutoEleBase = function(tr){
		$("#findForm").append(tr) ;
	} ;
	
	/**
	 * 患者类型分组
	 */
	this.v_groupHz = function(id){
		var ar = new Array() ;
		ar.push({k:l_tj.Sex,v:"hz_xingbie"}) ;
		ar.push({k:l_tj.feiBie,v:"hz_gongfei"}) ;
		ar.push({k:l_tj.yibao,v:"hz_yibao"}) ;
		if(!id){
			_this.error("TongJi.v_group not param id") ;
			return false ;
		}
		var group  = ele.makeSelect({id:id,def:false,array:ar}) ;
		_this.addAutoEle(l_tj.groupBy, group) ;
	} ;
	/**
	 * 统计类型 分组,并添加change事件
	 */
	this.v_addTjlx = function(h){
		var ar = new Array() ;
		ar.push({k:l_tj.huanzhe,v:"hz"}) ;
		ar.push({k:l_tj.diagnose,v:"zd"}) ;
		ar.push({k:l_tj.JianChaDan,v:"jcd"}) ;
		var group  = ele.makeSelect({id:"tjlx",def:false,array:ar}) ;
		_this.addAutoEle(l_tj.tjlx, group,"trtjlx") ;
		if(h)
			$("#tjlx").change(h) ;
	} ;
	/**
	 * 统计数据分组,并添加change事件
	 */
	this.v_group = function(id,lab,ar,trid){
		if(ar==undefined){
			ar = new Array() ;
			ar.push({k:l_tj.huanzheZhenDuan,v:"hzzd"}) ;
			ar.push({k:l_tj.jcks,v:"jcks"}) ;
			ar.push({k:l_tj.Jcxm,v:"jcxm"}) ;
			ar.push({k:l_tj.zdYs,v:"zdys"}) ;
			ar.push({k:l_tj.Jianchasb,v:"jcsb"}) ;
			ar.push({k:l_tj.JcYs,v:"jcys"}) ;
			
			ar.push({k:l_tj.huanzheDiQu,v:"hz_diqu"}) ;
			ar.push({k:l_tj.HzSource,v:"hz_laiyuan"}) ;
			ar.push({k:l_tj.feiBie,v:"hz_gongfei"}) ;
			ar.push({k:l_tj.yibao,v:"hz_yibao"}) ;
			ar.push({k:l_tj.Sex,v:"hz_xingbie"}) ;
			
			ar.push({k:l_tj.YanBie,v:"yanbie"}) ;
			ar.push({k:l_tj.State,v:"state"}) ;
			ar.push({k:l_tj.ZhenBie,v:"zb"}) ;
//			ar.push({k:"患者检查",v:"jcd_jcxmIds"}) ;
		}
		
//		ar.push({k:"",v:""}) ;
		if(!id){
			_this.error("TongJi.v_group not param id") ;
			return false ;
		}
		var group  = ele.makeSelect({id:id,def:true,array:ar}) ;
		_this.addAutoEle(lab, group,trid) ;
	} ;
	
	
	
	this.setTjLx = function(val){
		$.each($("#tjlx>option"),function(i,v){
			if($(v).val()==val){
				$(v).attr("selected","selected");
				return false ;
			}
		}) ;
	} ;
	this.setGroup1 = function(val){
		$.each($("#group1>option"),function(i,v){
			if($(v).val()==val){
				$(v).attr("selected","selected");
				return false ;
			}
		}) ;
	} ;
	this.setGroup2 = function(val){
		$.each($("#group2>option"),function(i,v){
			if($(v).val()==val){
				$(v).attr("selected","selected");
				return false ;
			}
		}) ;
	} ;
	
	
	
	
	/**
	 * 添加检查科室,并添加change事件
	 */
	this.v_addJcks = function(h){
		var jcks = ele.makeSelect({id:"jcks",def:true}) ;
		_this.addAutoEle(l_tj.jcks, jcks) ;
		$.post(contextPath+"/publish/bumen/findAllBuMen.htm",{tag:Math.random()},function(d){
			var ele = new Ele() ;
			var jcks_ar = ele.makeSelectArray(d.obj, {k:"bmmc",v:"id"}) ;
			ele.addSelectOption("jcks", jcks_ar) ;
			$("#jcks").change() ;
		},"json") ;
		if(h)
			$("#jcks").change(h) ;
	} ;
	/**
	 * 添加检查项目
	 */
	this.v_addJcxm = function(h){
		var jcks = ele.makeSelect({id:"jcxm",def:true}) ;
		_this.addAutoEle(l_tj.Jcxm, jcks) ;
		
		$.post(contextPath+"/publish/jcxm/findAllJcxm.htm",{tag:Math.random()},function(d){
			var ele = new Ele() ;
			var ar = ele.makeSelectArray(d.obj, {k:"xmmc",v:"id"}) ;
			$.each(ar,function(i,v){
				v.k = v.k ;
			}) ;
			ele.addSelectOption("jcxm", ar) ;
		},"json") ;
		if(h)
			$("#jcxm").change(h) ;
	} ;
	/**
	 * 添加患者来源,并添加change事件
	 */
	this.v_addHuanZheLaiYuan = function(h){
		var ar = [
					{id:"1001",text:l_tj.NetWork,index1:"wangluo",index2:"wl"},
					{id:"1002",text:l_tj.DianShi,index1:"dianshi",index2:"ds"},
					{id:"1003",text:l_tj.Broad,index1:"guangbo",index2:"gb"},
					{id:"1004",text:l_tj.bzzz,index1:"baozhizazhi",index2:"bzzz"},
					{id:"1005",text:l_tj.jrjs,index1:"jingrenjieshao",index2:"jrjs"},
					{id:"1006",text:l_tj.other,index1:"qita",index2:"qt"}
					] ;
		var ly = $.auto({id:"hzly",name:"hzly",ar:ar,eff:true}) ;
		_this.addAutoEle(l_tj.HzSource,ly) ;
		if(h)
			$("#hzly_").change(h) ;
	} ;
	/**
	 * 添加患者地区,并添加change事件
	 */
	this.v_addHuanZheDiQu = function(h){
		var dq = $.auto({eff:true,id:"hzdq",name:"hzdq",url:"diqu/findAllDiqu.htm",
			chg:{id:"id",text:"name",index1:"index1",index2:"index2"}}) ;
		_this.addAutoEle(l_tj.huanzheDiQu,dq) ;
		if(h)
			$("#hzdq_").change(h) ;
	} ;
	/**
	 * 添加诊断医生,并添加change事件
	 */
	this.v_addZdYs = function(h){

		var ui = ele.makeInput({id:"zdys"}) ;
		_this.addAutoEle(l_tj.zdYs,ui) ;
		ui.attr("disabled","disabled") ;
		$("#jcks").change(function(){//添加检查医生改变事件
			if($(this).val()==''){
				$("#zdys").attr({disabled:"disabled"}) ;
			}else{
				$("#zdys").attr("disabled",false) ;

				$("#zdys").oimsCombox({url:contextPath+"/publish/tj/findYuanGongByBumen.htm",
					param:{bumenId:$(this).val()},change:{k:"text",v:"gonghao"},strlength:7}) ;
			}
		}) ;
		if(h)
			$("#zdys").change(h) ;
	} ;
	/**
	 * 添加患者检查,并添加change事件
	 */
	this.v_addHuanZheJianCha = function(h){
		var jcxm = ele.makeInput({id:"hzjc"}) ;
		_this.addAutoEle(l_tj.hzJc,jcxm) ;
		if(h)
			$("#hzjc").change(h) ;
	} ;
	/**
	 * 添加患者诊断,并添加change事件
	 */
	this.v_addHuanZheZD = function(h){
		var jcxm = ele.makeInput({id:"hzzd"}) ;
		_this.addAutoEle(l_tj.huanzheZhenDuan,jcxm) ;
		if(h)
			$("#hzzd").change(h) ;
	} ;
	
	/**
	 * 添加检查设备,并添加change事件
	 */
	this.v_addJcsb = function(h){

		var jcxm = ele.makeInput({id:"jcsb"}) ;
		_this.addAutoEle(l_tj.Jianchasb,jcxm) ;
		
		$("#jcsb").attr("disabled","disabled") ;
		$("#jcks").change(function(){
			$("#jcsb").attr("disabled",false) ;
			 var jcksVal = $(this).val() ;
			 if(jcksVal=="") {
				 $("#jcsb").val("") ;
				 $("#jcsb").attr("disabled","disabled") ;
				 return  false ;
			 }

			$("#jcsb").oimsCombox({url:contextPath+"/publish/tj/findSheBieByBumen.htm",param:{bumenId:$(this).val()},change:{k:"text",v:"id"},strlength:7}) ;
		}) ;
		if(h)
			$("#jcsb").change(h) ;
	} ;
	
	/**
	 * 添加检查医生,并添加change事件
	 */
	this.v_addJcys = function (h){
		var ui = ele.makeInput({id:"jcys"}) ;
		_this.addAutoEle(l_tj.JcYs,ui) ;
		
		$("#jcks").change(function(){//添加检查医生改变事件
			if($(this).val()==''){
				$("#jcys").attr({disabled:"disabled"}) ;
			}else{
				$("#jcys").attr("disabled",false) ;
				$("#jcys").oimsCombox({url:contextPath+"/publish/tj/findYuanGongByBumen.htm",
					param:{bumenId:$(this).val()},change:{k:"text",v:"gonghao"},strlength:7}) ;
			}
		}) ;
		if(h)
			$("#jcys").change(h) ;
	} ;
	
	
	/**
	 * 添加 眼别,并添加change事件
	 */
	this.v_addHuanZheYanBie = function(h){
		var tr = "<tr>\n" +
        "                        <td nowrap=\"nowrap\" align=\"right\">"+l_tj.YanBie+"：</td>\n" +
        "                        <td ><input type='checkbox' name='eyeType' id='ve_doubleEye' value='48' />\n" +
        "                          "+l_tj.DoubleEye+"&nbsp;&nbsp;" +
        "                        <input type='checkbox' name='eyeType' id='ve_oneEye' value='46,47' />\n" +
        l_tj.sigEye+"</td>\n" +
        "                      </tr>\n"  ;
		_this.addAutoEleBase($(tr)) ;
		if(h)
		$("input:checkbox[name=eyeType]").each(function(i){
			$(this).change(h) ;
		}) ;
	} ;
	/**
	 * 添加 诊别,并添加change事件
	 */
	this.v_zhenBie = function(h){
		var tr = "<tr>\n" +
        "                        <td nowrap=\"nowrap\" align=\"right\">"+l_tj.ZhenBie+"：</td>\n" +
        "                        <td ><input type='checkbox' name='zbType' id='ve_doubleEye' value='3' />\n" +
        l_tj.ZhuYuan+"                          &nbsp;&nbsp;" +
        "                        <input type='checkbox' name='zbType' id='ve_oneEye' value='2' />\n" +
        l_tj.MenZhen+"</td>\n" +
        "                      </tr>\n"  ;
		_this.addAutoEleBase($(tr)) ;
		if(h)
		$("input:checkbox[name=zbType]").each(function(i){
			$(this).change(h) ;
		}) ;
	} ;
	/**
	 * 添加 性别,并添加change事件
	 */
	this.v_addHuanZheSex = function(h){
		var tr = "<tr>\n" +
		"                        <td nowrap=\"nowrap\" align=\"right\">"+l_tj.Sex+"：</td>\n" +
		"                        <td ><input type='checkbox' name='sex' id='ve_sex_1' value='1' />\n" +
		l_tj.Male+"                          &nbsp;&nbsp;&nbsp;&nbsp;" +
		"                        <input type='checkbox' name='sex' id='ve_sex_2' value='0' />\n" +
		l_tj.Female+"</td>\n" +
		"                      </tr>\n"  ;
		_this.addAutoEleBase($(tr)) ;
		if(h)
		$("input:checkbox[name=sex]").each(function(i){
			$(this).change(h) ;
		}) ;
	} ;
	/**
	 * 添加 医保,并添加change事件
	 */
	this.v_addHuanZheYiBao = function(h){
		var tr = "<tr>\n" +
		"                        <td nowrap=\"nowrap\" align=\"right\">"+l_tj.yibao+"：</td>\n" +
		"                        <td ><input type='checkbox' name='yibao' id='ve_yibao_1' value='1' />\n" +
		l_tj.Yes+"                          &nbsp;&nbsp;&nbsp;&nbsp;" +
		"                        <input type='checkbox' name='yibao' id='ve_yibao_2' value='0' />\n" +
		l_tj.No+"</td>\n" +
		"                      </tr>\n"  ;
		_this.addAutoEleBase($(tr)) ;
		if(h)
		$("input:checkbox[name=yibao]").each(function(i){
			$(this).change(h) ;
		}) ;
	} ;
	/**
	 * 添加 费别,并添加change事件
	 */
	this.v_addHuanZheFeiBie = function(h){
		var tr = "<tr>\n" +
		"                        <td nowrap=\"nowrap\" align=\"right\">"+l_tj.feiBie+"：</td>\n" +
		"                        <td ><input type='checkbox' name='feibie' id='ve_feibie_1' value='1' />\n" +
		l_tj.privatePay+"                          &nbsp;&nbsp;" +
		"                        <input type='checkbox' name='feibie' id='ve_feibie_2' value='0' />\n" +
		l_tj.gongfei+"</td>\n" +
		"                      </tr>\n"  ;
		_this.addAutoEleBase($(tr)) ;
		if(h)
		$("input:checkbox[name=feibie]").each(function(i){
			$(this).change(h) ;
		}) ;
	} ;
	
	/**
	 * 添加检查状态,并添加change事件
	 */
	this.v_addZt = function(h){
		var tr = "<tr>\n" +
        "                        <td nowrap=\"nowrap\" align=\"right\">"+l_tj.State+"：</td>\n" +
        "                        <td ><input type='checkbox' name='jczt' id='ve_wjc' value='"+oimsCategory.JCD_STATE_DJC+"' />\n" +
        l_tj.wJC+"                          " +
        "                        <input type='checkbox' name='jczt' id='ve_yjc' value='"+oimsCategory.JCD_STATE_YWC+"' />\n" +
        l_tj.YiWanCheng+"</td>\n" +
        "                      </tr>\n"+
        "<tr>" +
        "                        <td nowrap=\"nowrap\" align=\"right\"></td>\n" +
        "                        <td><input type='checkbox' name='jczt' id='ve_ygh'  value='"+oimsCategory.JCD_STATE_YGH+"' />\n" +
        l_tj.YiGuoHao+"                          " +
        "                        <input type='checkbox' name='jczt' id='ve_dbc'  value='"+oimsCategory.JCD_STATE_DBC+"' />\n" +
        l_tj.DaiBuChuan+"</td>\n" +
        "</tr>" ;
		_this.addAutoEleBase($(tr)) ;
		if(h)
		$("input:checkbox[name='jczt']").each(function(){
			$(this).change(h) ;
		}) ;
	} ;
	
	/**
	 * 页面查看弹出
	 * @param p {title:"弹出窗标题",url:"列表请求地址",hql:"hql参数",cl:"可以添加到列表中的列",hjTitle:"合计标题",icon:"弹出窗样式"}
	 */
	this.v_pageLook = function(p){
		var ele =  "<div>\n" +
        "   <div class=\"opencontent\">\n" +
        "        <div class=\"tt\" id='pgTile'></div>\n" +
        "        <div class=\"list list1\" id='pgList'>\n" +
        "\t\t</div>\n" +
        "          <div class=\"fromimg\" id='pgChart'></div>\n" +
        "\t</div>\n" +
        "   <br>\n" +
        "\t<div class=\"openbutton\">\n" +
        "\t  <p id='pgInfo'></p>\n" +
        "\t</div>\n" +
        "</div>" ;
    	//pgInfo = 合计： 网络：<font>55</font>人  报纸：<font>67</font>人  其他：<font>989</font>人
    	
    	$(ele) .oimsDialog({
    		width:800,
    		height:380,
    		title:l_tj.tjmx,
    		icon:"add",
    		// drag:true,
    		winType:4,
    		locked:true,
    		closeButton:true,
    		button:[
    		        ]
    	}) ;
    	var listFactor = list(p.url,p.cl) ;
    	$("#pgList").createPageList(listFactor) ;
    	 $("#pgTile").text(p.tilte) ;
//    	 $("#pgInfo").html("合计:"+luke.heJiInfo(mr.obj)) ;
    	
	} ;
	/**
	 * 页面查看 中列表显示 
	 * @param url
	 * @param cl
	 * @returns {___anonymous32174_32479}
	 */
	function list(url,cl){
        var  listFactor = {
        	listObj :[],
        	method:'post',
            manageMenu : [],
            url :url,
            checkbox:false,
            single:false,
            data : {// data表示传的参数
                currentPage : 1,
                pageSize : 5,// Page类的方法
                tag : Math.random()
            }
        };
        $.extend(listFactor.data,getData()) ;
        if(cl!=undefined&&typeof(cl)=='object'&&cl.length>0){
        	$.each(cl,function(i,v){
        		if(v==undefined) return false ;
        		listFactor.listObj.push(v) ;
        	}) ;
        }else{
//        	_this.supper.log("无列参数", "Tj.list") ;
//        	_this.error("无列参数, Tj.list") ;
        	return false ;
        }
        return listFactor ;
    } ;
    
    function getData(){
    	var f = $("#submitForm") ;
    	var d = {} ;
    	$.each($("input[type='text']",f),function(i,v){
    		var n = $(v).attr("name") ;
    		var val = $(v).val() ;
    		var s = "({"+n+":\""+val+"\"})" ;
			$.extend(d,eval(s)) ;
    	}) ;
    	$.each($("input[type='hidden']",f),function(i,v){
    		var n = $(v).attr("name") ;
    		var val = $(v).val() ;
    		var s = "({"+n+":\""+val+"\"})" ;
    		$.extend(d,eval(s)) ;
    	}) ;
    	$.each($("input[type='checkbox']",f),function(i,v){
    		var n = $(v).attr("name") ;
    		var val = "" ;
    		if($(v).attr("checked")=="checked"){
    			val = $(v).val() ;
	    		var s = "({"+n+":\""+val+"\"})" ;
	    		$.extend(d,eval(s)) ;
    		}
    	}) ;
    	$.each($("input[type='radio']",f),function(i,v){
    		var n = $(v).attr("name") ;
    		var val = "" ;
    		if($(v).attr("checked")=="checked"){
    			val = $(v).val() ;
	    		var s = "({"+n+":\""+val+"\"})" ;
	    		$.extend(d,eval(s)) ;
    		}
    	}) ;
    	$.each($("select",f),function(i,v){
    		var n = $(v).attr("name") ;
    		var val = $(v).val() ;
    		var s = "({"+n+":\""+val+"\"})" ;
			$.extend(d,eval(s)) ;
    	}) ;
    	return d ;
    } ;

    
    this.doBoolean = function(d,tv,fv){
    	$.each(d,function(i,v){
    		if(v.label==true)
    			v.label = tv ;
    		else
    			v.label=fv ;
    	}) ;
    	return d ;
    } ;
    this.booleanToWord = function(d,g){
    	if(g=="hz_xingbie")
    		d.obj = _this.doBoolean(d.obj,l_tj.Male,l_tj.Female);
    	if(g=="hz_yibao")
    		d.obj = _this.doBoolean(d.obj,l_tj.hasYb,l_tj.noHasYb);
    	if(g=="hz_gongfei")
    		d.obj = _this.doBoolean(d.obj,l_tj.gongfei,l_tj.privatePay);
    	return d ;
    } ;
    this.tjTitle = function(){
    	var tt = "" ;
    	$("input:radio[name='timeType']").each(function(){
    		var _this = $(this) ;
    		if(_this.attr("checked")=="checked")
    			tt = _this.val() ;
    	}) ;
    	
    	if(tt=='timeType_1'){
    		tt = $("#fTime1").val()+l_tj.YearRiQi+$("#fTime2").val()+l_tj.MonthRiQi ;
    	}else if( $("#fTime1").val()!=""&&$("#fTime2").val()!=""){
    		tt =  $("#fTime1").val()+l_tj.zhi+$("#fTime2").val() ;
    	}
    		
    	
    	tt+="    " ;
    	var ss = "" ;
		var ssx = "" ;
		$.each($("#tjlx>option"),function(i,v){
			var _ = $(v) ;
			if(_.attr("selected")=="selected"){
				ss+=_.text()+"  " ;
				return false ;
			}
		}) ;
		$.each($("#group1>option"),function(i,v){
			var _ = $(v) ;
			if(_.attr("selected")=="selected"){
				ss+=_.text()+"  " ;
				ssx = _.text() ;
				return false ;
			}
		}) ;
		$.each($("#group2>option"),function(i,v){
			var _ = $(v) ;
			if(_.attr("selected")=="selected"){
				ssx += _.text() ;
				return false ;
			}
		}) ;
		return {ss:tt+ss,ssx:tt+ssx} ;
    } ;

    this.toAsc = function(s){
    	var t = "" ;
    	for(var i=0;i<s.length;i++)
    		t+=s.charCodeAt(i)+" ";
    	return t ;
    } ;
    
    this.dataToDef = function(d){
    	if(d==undefined ||typeof(d.obj)!="object"||d.obj.length==0){
    		d.obj = [ {"value":0,"label":l_tj.noDate}]  ;
		}
    	return d.obj ;
    } ;
} ;