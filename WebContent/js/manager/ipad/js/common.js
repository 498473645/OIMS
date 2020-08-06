var ipad_language={
		Sunday:	1089,//星期日
		Monday:1083,
		Saturday:1088,//星期六	按钮语言
		Friday:	1087,//星期五	按钮语言
		Thursday:	1086,//	星期四	标签语言
		Wednesday:	1085,//星期三	按钮语言
		Tuesday	:1084,//	星期二	按钮语言
		MIndex:1090,//yi
		TIndex:1091,//er
		WIndex:1092,//san
		TSIdex:1093,//si
		FIndex:1094,//wu
		SIndex:1095,//liu
		SubitumJizhen:1097,//急诊
		OutpatientMenZhen:1098,//menzhen
		HospitalizedZhuYuan:1099,//zhuyuan
		shutDownExam:1144,//shutDownExam
		YearRiQi:1101,//nian
		MonthRiQi:1102,//yue
		SRIndex:1096,//ri
		ShiRiQi:1103,//shi
		FenRiQi:1104,//fen
		MiaoRiQi:1105,//miao
		haveNo:1145,//meiyou
		property:1146,//shuxing
		TiJiao_suceess:1106,//tijiaochenggong
		Qsr:735,//qingshuru
		BuNotKong:1108,//bunengweikong
		EmailGeShiNO:1109,//email geshi
		EmailBianMaGeShiNo:1110,//youzhengbianmageshi
		TeleGeShiNo:1111,//shoujigeshi
		LianTeleGeShiNo:1112,//lianxidianhua
		notNullLanguage:1113,//bunengweikong
		notLongLanguage:1114,//changdubugou
		toLongLanguage:1115,//changduguochang
		notEqLongLanguage:1116,//changdubudengyu
		selectLtOneLanguage:1117,//qingxuanzeyitiaoshuju
		selectGtOneLanguage:1118,//zhinengcaozuoyitiaoshuju
		failLanguage:1119,//shibai
		successLanguage:1120,//chenggong
		zhishaoSelectDota:1121,//zhishaoxuanzeyitiaoshuju
		DeleteShiBai:1122,//shanchushibai
		QingShuRuNum:1126, 
		QingShuRuOneDao:1127,//请输入1到
		ZhiJianNum:1128,//之间的数字
		LastYeLanguage:1129,//尾页
		NextYeLanguage:1130,//下页
		ShangYeLanguage:1131,//上页
		ShowYeLanguage:1132,//首页
		DangQianNum:1133,//当前
		YeGongLanguage:1134,//页
		tiaoLanguageFen:1135,////条
		xuanZeLanguage:1136,///选择
		YongHuCaoLanguage:1137,///,用户操作
		XingMing:35,//姓名
		Sex:189,//性别
		Birth:195,//出生日期
		idNum:467,//身份证
		BingLiHao:383,//病历号
		isYiBao:52,//是否医保
		JiBenTZ	:284,//基本调整
		SeXiangTZ:285,//色相调整
		GaoJiGN:286,//高级功能
		BiJiao:288,//比较
		CeLiang:287,//测量
		HuaBi:299,//画笔
		Browse:289,//浏览功能
		Time:290,//时间
		Xiangmu:1147,//项目
		FuJiaGN:292,//附加功能
		HuanZheInfo	:1026,//患<br>者<br>信<br>息
		CancelChe:1148,//撤消
		Reset:85,//重置
		YouXuan:294,//右旋
		ZuoXuan:295,//左旋
		QuSe:1149,//去色
		FanZhuan:296,//反转
		qingkong:1150,//清空
		Seria:214,//序号
		BingLiHao:383,//病历号
		Male:204,//男
		Female:205,//女
		nopatientinfo:1151,//患者信息不存在
		Yes:17,//是
		No:18,//否
		red:1152,//红
		green:1153,//绿
		blue:1154,//蓝
		BaoHeDu:281,//饱和度
		sedu:1155,//色度
		Bright:279,//亮度
		shurublhhkahao:1156//请输入病历号或者卡号
};
$(document).ready(function(){
   ipadLanguage=setLanguage(ipad_language);
 });

/**
 * 设置语言
 */

 function setLanguage(l){
	if(l.yuyanListOnLoad!=undefined) return l;
	var x=getJSONData("/publish/findLanaguage.htm",l,"POST");
	if(x.state){
		l=x.obj;
	}
	return l;
}
/***
 * 
 * 急诊，门诊，住院，检查中...请先中断检查,年,月,日,时,分，秒，没有，属性，
 * 提交成功，请输入，不能为空！Email格式错误，邮政编码错误，手机号格式错误，联系电话格式错误，
 * 不能为空，长度不够，长度过长，长度不等于，请选择一条数据，只能操作一条数据，失败，成功，至少选择一条数据，删除失败
 */
function readCard(){
	if(ReaderProMF.ReadCardData() == 0){
		$("#card").val(ReaderProMF.readData);
		var result = getJSONData(getGuahaobyblhUrl, {blh:$("#card").val()});
		if(result.biaoshi == 0){
			alert(result.message);
		}else if(result.biaoshi == 1){
			showMainpage(result.message);
		}
	}
}

function getAllTime(){
    var today,hour,second,minute,year,month,date;
    var strDate ;
    today=new Date();
    var n_day = today.getDay();
    switch (n_day) {
        case 0:
            strDate = ipadLanguage.Sunday;
            break;
        case 1:
            strDate = ipadLanguage.Monday;
            break;
        case 2:
            strDate =ipadLanguage.Tuesday;
            break;
        case 3:
            strDate = ipadLanguage.Wednesday;
            break;
        case 4:
            strDate = ipadLanguage.Thursday;
            break;
        case 5:
            strDate =  ipadLanguage.Friday;
            break;
        case 6:
            strDate = ipadLanguage.Saturday;
            break;
        case 7:
            strDate = ipadLanguage.Sunday;
            break;
    }
    year = today.getUTCFullYear();
    month = fd(today.getMonth()+1);
    date = fd(today.getDate());
    hour = fd(today.getHours());
    minute =fd(today.getMinutes());
    second = fd(today.getSeconds());
    var thisTime = year + "." + month + "." + date + " " +  strDate +" " + hour + ":" + minute + ":" + second;
    function fd(d){
    	d=d+"";
    	return d.length==1 ? "0"+d : d;
    }
    return thisTime;
}

var parseDate = function(_str){
    var _val = _str,_date = new Date(),_arr = [];
    if ( !_val || _val ==''){return null;}
    _arr = _val.split('-');
    _date.setFullYear(_arr[0],_arr[1]-1,_arr[2]);
    return _date;
}

function getXiqiShu(x){
	var strDate ; 
	var date = parseDate(x);
	var n_day = date.getDay();
	switch (n_day)
    {
        case 0:
            strDate = ipadLanguage.SRIndex;
            break;
        case 1:
            strDate = ipadLanguage.MIndex;
            break;
        case 2:
            strDate =ipadLanguage.TIndex;
            break;
        case 3:
            strDate =ipadLanguage.WIndex;
            break;
        case 4:
            strDate =  ipadLanguage.TSIdex;
            break;
        case 5:
            strDate =  ipadLanguage.FIndex;
            break;
        case 6:
            strDate =  ipadLanguage.SIndex;
            break;
        case 7:
            strDate =  ipadLanguage.SRIndex;
            break;
    }
	return strDate;
}

function getZhenbie(x){
    var str;
    switch(x){
        case 0:
            str=ipadLanguage.SubitumJizhen;
            break;
        case 1:
            str=ipadLanguage.OutpatientMenZhen;   
            break;
        case 2:
            str=ipadLanguage.HospitalizedZhuYuan;
            break;
    }
    return str;
}

function showSelected(url){
	if(doing){
		alert(ipadLanguage.shutDownExam);
		return;
	}
	window.location = url;
}

function getNow(){
    var now = new Date();
    var month = now.getMonth()+1+"";
    var day = now.getDate()+"";
    var hour = now.getHours()+"";
    var minute = now.getMinutes()+"";
    var second = now.getSeconds()+"";
    if(month.length==1){
    	month = "0"+month;
    }
    if(day.length==1){
    	day = "0"+day;
    }
    if(hour.length==1){
    	hour = "0"+hour;
    }
    if(minute.length==1){
    	minute = "0"+minute;
    }
    if(second.length==1){
    	second = "0"+second;
    }
    return now.getFullYear()+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
}

function getDateNow(){
    var now = new Date();
    var month = now.getMonth()+1+"";
    var day = now.getDate()+"";
    
    if(month.length==1){
    	month = "0"+month;
    }
    if(day.length==1){
    	day = "0"+day;
    }
    
    return now.getFullYear()+"-"+month+"-"+day+"";
}

function getDateRandomData(){
	var now = new Date();
    var month = now.getMonth()+1+"";
    var day = now.getDate()+"";
    var hour = now.getHours()+"";
    var minute = now.getMinutes()+"";
    var second = now.getSeconds()+"";
    if(month.length==1){
    	month = "0"+month;
    }
    if(day.length==1){
    	day = "0"+day;
    }
    if(hour.length==1){
    	hour = "0"+hour;
    }
    if(minute.length==1){
    	minute = "0"+minute;
    }
    if(second.length==1){
    	second = "0"+second;
    }
    return month+day+hour+minute+second;
}

function getJSONData(url,data,type){
    var value=null;
    if(type==null||type.toLowcase()=="get"){
    	type="GET";
    }else{
    	type="POST";
    }
    $.ajax({
        url:contextPath+url,
        data:data,
        async : false,
        type : type,
        dataType : 'json',
        success : function(data){
            value=data;
        }
    });
    return value;
}

function findSWF(movieName) {
	  if (navigator.appName.indexOf("Microsoft")!= -1) {
	    return window[movieName];
	  } else {
	    return document[movieName];
	  }
}



function format(date,time){
	if(date==null || date=="")return "-";
	date = new Date(date.time);
	var str=date.getUTCFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日";
	if(time!=null && time)str += date.getHours()+"时"+date.getMinutes()+"分"+date.getSeconds()+"秒";
	return str;
}

function formatDateTime(datetime){
  if(datetime==null || datetime=="")return "-";
	var date = new Date(datetime);
	var mounth=(date.getMonth()+1)+"";
	if(mounth.length==1)mounth="0"+mounth;
	var day=date.getDate()+"";
	if(day.length==1)day="0"+day;
	var h = date.getHours()+"";
	if(h.length==1)h="0"+h;
	var m = date.getMinutes()+"";
	if(m.length==1)m="0"+m;
	var s = date.getSeconds()+"";
	if(s.length==1)s="0"+s;
	var str=date.getUTCFullYear()+"-"+mounth+"-"+day+" "+h+":"+m+":"+s;
	return str;
}

function formatDate(date){
	  if(date==null || date=="")return "-";
		var date = new Date(date);
		var mounth=(date.getMonth()+1)+"";
		if(mounth.length==1)mounth="0"+mounth;
		var day=date.getDate()+"";
		if(day.length==1)day="0"+day;	
		var str=date.getUTCFullYear()+"-"+mounth+"-"+day;
		return str;
	};

function formatTime(datetime){
	var date = new Date(datetime);
	var h=date.getHours()+"";
	if(h.length==1)h="0"+h;
	var m=date.getMinutes()+"";
	if(m.length==1)m="0"+m;
	var s = date.getSeconds()+"";
	if(s.length==1)s="0"+s;
	var str=h+":"+m+":"+s;
	return str;
}

function getObjectValue(obj,key){
	$.each(obj,function(i,d){
		if(i===key){
			return d;
		}
	});
}

//浮点数加法运算
function FloatAdd(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length;}catch(e){r1=0;}
    try{r2=arg2.toString().split(".")[1].length;}catch(e){r2=0;}
    m=Math.pow(10,Math.max(r1,r2));
    return (arg1*m+arg2*m)/m;
}

//浮点数减法运算
function FloatSub(arg1,arg2){
    var r1,r2,m,n;
    try{r1=arg1.toString().split(".")[1].length;}catch(e){r1=0;}
    try{r2=arg2.toString().split(".")[1].length;}catch(e){r2=0;}
    m=Math.pow(10,Math.max(r1,r2));
    //动态控制精度长度
    n=(r1>=r2)?r1:r2;
    return ((arg1*m-arg2*m)/m).toFixed(n);
}

//浮点数乘法运算
function FloatMul(arg1,arg2){
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length;}catch(e){}
    try{m+=s2.split(".")[1].length;}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}

 //浮点数除法运算
function FloatDiv(arg1,arg2){
    var t1=0,t2=0,r1,r2;
    try{t1=arg1.toString().split(".")[1].length;}catch(e){}
    try{t2=arg2.toString().split(".")[1].length;}catch(e){}
    with(Math){
        r1=Number(arg1.toString().replace(".",""));
        r2=Number(arg2.toString().replace(".",""));
        return (r1/r2)*pow(10,t2-t1);
    }
}

function importJS(src){
	$("<script src='"+contextPath+src+"'><\/script>").appendTo("head");
}
function importCSS(src){
	var styleTag = document.createElement("link");  
	styleTag.setAttribute('type', 'text/css');  
	styleTag.setAttribute('rel', 'stylesheet');  
	styleTag.setAttribute('href', contextPath+src);  
	$("head")[0].appendChild(styleTag);  

	//$("<link type=\"text/css\" rel=\"stylesheet\" href=\""+contextPath+src+"\" />").appendTo("head");
}

function isDate(str){        
	var a=/^[1-2]\d{3}-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[0-1])$/ ;    
    if(str.match(a)){
        return false;   
    }   
    else{   
        return true;   
    }   
}

//日期比较
function dateCompare(date1,date2){
	date1 = date1.replace(/\-/gi,"/");
	date2 = date2.replace(/\-/gi,"/");
	var time1 = new Date(date1).getTime();
	var time2 = new Date(date2).getTime();
	if(time1 > time2){
		return 1;
	}else if(time1 == time2){
		return 0;
	}else{
		return -1;
	}
}

//判断日期，时间大小   
function compareTime(startDate, endDate) {   
 if (startDate.length > 0 && endDate.length > 0) {   
    var startDateTemp = startDate.split(" ");   
    var endDateTemp = endDate.split(" ");   
                   
    var arrStartDate = startDateTemp[0].split("-");   
    var arrEndDate = endDateTemp[0].split("-");   
  
    var arrStartTime = startDateTemp[1].split(":");   
    var arrEndTime = endDateTemp[1].split(":");   
  
	var allStartDate = new Date(arrStartDate[0], arrStartDate[1], arrStartDate[2], arrStartTime[0], arrStartTime[1], arrStartTime[2]);   
	var allEndDate = new Date(arrEndDate[0], arrEndDate[1], arrEndDate[2], arrEndTime[0], arrEndTime[1], arrEndTime[2]);   
	                   
	if (allStartDate.getTime() >= allEndDate.getTime()) {   
	     return false;   
	} else {   
	    return true;   
	}   
} else {     
	    return false;   
}   
}   

function linkcard()
{	
	var r_card= rfid.LinkCardReader();
	if(r_card>0){
		return true;
	}
	return false;
}

function unlinkcard()
{
	var r_card=rfid.UnlinkCardReader();
	if(r_card>0)
	{
	   return true;
	}
	return false;
}

function init(){
	
	$("#right").text("");	
	$("#right").append($("<div />").addClass("title"));
	
	$(".title",$("#right")).append($("<div />") .addClass("titleT")
			.append($("<span />").addClass("title1"))
			.append(pageTitle));
}



/**
 * @author 于洋
 * @param set
 *            set:{
 *            form:"jquery的form对象",
 *            beforeSubmit：需要返回 boolean，true提交请求
 *            successFn:回传两个参数-responseText, statusText,
 *            errorFn：回传三个参数-jqXHR, textStatus, errorThrown 
 *            }
 */

function ajaxForm(set){
	if(typeof(set.form)=="object"){
		if(set.form.attr("action")==undefined){
			alert("form #ID="+set.form.attr("id")+"\t"+ipadLanguage.haveNo+"action"+ipadLanguage.property) ;
			return false ;
		}
		if(set.form.attr("method")==undefined)
			set.form.attr("method","post") ;
			
		set.form.ajaxForm() ;
		set.form.ajaxSubmit({
			dataType:"json",
			beforeSubmit:(typeof(set.beforeSubmit)=="function"?set.beforeSubmit:function(){return true;}),
			success:(typeof(set.successFn)=="function"?set.successFn:function(){
				$.oimsSucc(ipadLanguage.TiJiao_suceess);
				set.form.parent().parent().remove() ;
			}),
			error:(typeof(set.errorFn)=="function"?set.errorFn:function(jqXHR, textStatus, errorThrown){
				$.oimsError(textStatus+":"+errorThrown);
			})
		}) ;
	} ;
}


/**
 * set:{ 
 * id:form元素id 必须,
 * url:form元素action 必须 ,
 * width：对话窗宽,
 * height：对话窗高
 * dialogTitle：对话窗标题,
 * icon：对话窗标题图标 ,
 * okcls:确定按钮图标 ,
 * btnOkVal：确定按钮显示文字
 * btnOkSuccess：回传两个参数-data,responseText, statusText ,
 * btnOkError：回传三个参数-jqXHR,textStatus, errorThrown ,
 * btnOkBefor：需要返回 boolean，true提交请求 },
 *autoHeight:boolean
 */
function oimsFormWindow(set){
	var formSet = {id:set.id,action:set.url,method:"post"} ;
	var f = $("<form />") .attr(formSet) ;
	f.oimsDialog({
		width:(set.width==undefined?"600":set.width),
		height:(set.height==undefined?"auto":set.height),
		title:(set.dialogTitle==undefined?language.Add_Title:set.dialogTitle),
		icon:(set.icon==undefined?"add":set.icon),
		// drag:true,
		winType:4,
		locked:true,
		closeButton:true,
		button:[
		        {
		        	title:(set.btnOkVal==undefined?language.Submit_Btn:set.btnOkVal),
		        	className:(set.okcls==null?"advsumit":set.okcls),
		        	isCloseWin:false,
		        	func:function(){
		        		ajaxForm({
		        			form:$("#"+set.id),
		        			beforeSubmit:set.btnOkBefor,
		        			errorFn:set.btnOkError,
		        			successFn:set.btnOkSuccess}) ;
		        		},
		        		isCloseWin:false
		        },{
		        	title:(set.btnResetVal==undefined?language.Reset_Btn:set.btnResetVal),
		        	func:set.resetForm,
		        	className:"advreset",
		        	isCloseWin:false
		        }
		        ]
	}) ;
	if(set.autoHeight==undefined||set.autoHeight==true){
		f.parent().height("auto") ;
		f.parent().parent().height("auto") ;
	}
	
	return f ;
}

/**
 * 清空查询框中的初始化文字信息
 * @param field
 */
function clearInitQuery(field){
	var initText = field.value ;
	if(initText.indexOf(ipadLanguage.Qsr)!=-1){
		$("#"+field.id).val("");
		$("#"+field.id).focus();
	}
} ;




/*
 *梁建业
 *select 选中指定值 
 *selectId 下拉框控件的ID
 *selectValue 下拉框需要选中的值
 */      
function selectItemByValue(selectId, selectValue) {            
    var objSelect=$("#"+selectId)[0];     
    for (var i = 0; i < objSelect.options.length; i++) {        
        if (objSelect.options[i].value == selectValue) {        
            objSelect.options[i].selected = true;           
            break;        
        }        
    }              
}


/*
 *梁建业
 *checkBoxName 复选框的name
 *checkedValue 复选框需要选中的值
 */      
function checkedCheckBoxByValue(checkBoxName, checkedValue) {            
    var objCheckBoxs=document.getElementsByName(checkBoxName);    
    for (var i = 0; i < objCheckBoxs.length; i++) {  
        if (objCheckBoxs[i].value == checkedValue) {        
        	objCheckBoxs[i].checked = true;     
            break;        
        }        
    }              
}

/*
 *梁建业
 *radioName 单选框的name
 *radioValue 单选框需要选中的值
 */      
function checkedRadioByValue(radioName, radioValue) {            
    var objRadios=document.getElementsByName(radioName);    
    for (var i = 0; i < objRadios.length; i++) {  
        if (objRadios[i].value == radioValue) {        
        	objRadios[i].checked = true;     
            break;        
        }        
    }              
}




/**
 * <p>字符串为null,undefined,""返回true</p>
 * @param field
 * @param content
 */

function checkIsStrEmpty(field,content){
    if(validata().isStrEmpty(field.value)){
    	if(content==null){
    		content = ipadLanguage.BuNotKong;
    	}
    	$("#"+field.id).attr("title",content).addClass("error1");
    	return;
    }
    $("#"+field.id).removeAttr("title",content);
}
/**
 * <p>字符串为符合Email格式返回true</p>
 * @param field
 * @param content
 */

function checkIsMail(field,content){
    if(!validata().isMail(field.value)){
    	if(content==null){
    		content = ipadLanguage.EmailGeShiNO;
    	}
    	$("#"+field.id).attr("title",content).addClass("error1");
    	return;
    }
    $("#"+field.id).removeAttr("title",content);
}
/**
 * <p>字符串为符合邮编格式返回true</p>
 * @author 祝建荣
 * @param field
 * @param content
 */

function checkIsPost(field,content){
    if(!validata().isPost(field.value)){
    	if(content==null){
    		content = ipadLanguage.EmailBianMaGeShiNo;
    	}
    	$("#"+field.id).attr("title",content).addClass("error1");
    	return;
    }
    $("#"+field.id).removeAttr("title",content);
}
/**
 * <p>字符串为符合手机号格式返回true</p>
 *  @author 祝建荣
 * @param field
 * @param content
 */

function checkIsPhone(field,content){
    if(!validata().isPhone(field.value)){
    	if(content==null){
    		content = ipadLanguage.TeleGeShiNo;
    	}
    	$("#"+field.id).attr("title",content).addClass("error1");
    	return;
    }
    
    $("#"+field.id).removeAttr("title",content);
}

/**
 * <p>字符串为符合联系电话格式返回true</p>
 *  @author 祝建荣
 * @param field
 * @param content
 */

function checkIsTel(field,content){
    if(!validata().isTel(field.value)){
    	if(content==null){
    		content = ipadLanguage.LianTeleGeShiNo;
    	}
    	$("#"+field.id).attr("title",content).addClass("error1");
    	return;
    }
    
    $("#"+field.id).removeAttr("title",content);
}




//------------------------------------------于洋-------------如果改动，请在分割线下面--------------------------------------


function validata(){
	var l = {
			notNull:ipadLanguage.notNullLanguage,
			notLong:ipadLanguage.notLongLanguage,
			toLong:ipadLanguage.toLongLanguage,
			notEqLong:ipadLanguage.notEqLongLanguage
	} ;
	function isTel(p,msg){
		if(p==undefined||p=="") return true ;
		var partten = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
		var partten2= /^1[3|4|5|8][0-9]\d{4,8}$/;
		   if(partten.test(p)||partten2.test(p)) {   
		       return true;   
		   }   
		   if(msg!=undefined&&msg!="")
			   $.oimsAlert(msg) ;
		   return false;
	} ;
	function isPhone(p,msg){
		if(p==undefined||p=="") return true ;
		var partten = /^((13[0-9]{1})|(159)|(153)|(186)｜(147))[0-9]{8}$/;
		   if(partten.test(p)) {   
		       return true;   
		   }
		   if(msg!=undefined&&msg!="")
			   $.oimsAlert(msg) ;
		   return false;
	} ;
	
	function isLeightNub(p,l){
		if(p.leight==l)
			return true ;
		else
			return false ;
	} ;
	/**
	 * @author 于洋
	 * @param p:String
	 * @returns boolean
	 * <p>是数字返回true</p>
	 */
	function isNub(p){
		if(isNaN(p))
			return false ;
		else 
			return true ;
	} ;
	
	function isNotEmpty4EverySubmit(arIds,f){
		var t = true ;
		$.each(arIds,function(i,v){
			if(v==undefined||v==null) return false ;
			if($("#"+v.id).val()==undefined||$("#"+v.id).val()==null||$("#"+v.id).val()==""){
				t = false ;
				$.oimsAlert(v.lb+":"+l.notNull) ;
				return false ;
			}
		}) ;
		return t ;
	} ;
	
	function isNotEmpty4Every(arIds,f){
		if(f==undefined||f==null) f = document ;
		var isEmptyValue = function(e){
			var el = $(e.currentTarget) ;
			var msg = "" ;
			$.each(arIds,function(i,v){
				if(v==undefined||v==null) return false ;
				if(v.id==el.attr("id")){
					msg = v.lb ;
					return false ;
				}
			}) ;
			if(el.val()=="")
				$.oimsAlert(msg+":"+l.notNull) ;
			
		} ;
		$.each(arIds,function(i,v){
			if(v==undefined||v==null) return false ;
			$("#"+v.id,f).focusout(isEmptyValue) ;
		}) ;
	} ;
	
	function length4Every(arids,f){
		
		//添加事件
		$.each(arids,function(i,v){
			if(v==undefined) return false ;
			$("#"+v.id,f).focusout(lengthE) ;
		}) ;
		//事件操作方法
		function lengthE(e){
			var el = $(e.currentTarget) ;
			var setting = "" ;
			$.each(arids,function(i,v){
				if(el.attr("id")==v.id){
					setting = v ;
					return false ;
				}
			}) ;
			var bln = true ;//boolean类型标志
			var val = $("#"+setting.id,f).val().length ;
			if(val==0)
				return ;
			if(isNub(setting.fh.gt)){
				bln = val>setting.fh.gt ;
				if(!bln)
					$.oimsAlert(setting.lb+"："+l.notLong) ;
			}
			if(isNub(setting.fh.lt)){
				bln = val<setting.fh.gt ;
				if(!bln)
					$.oimsAlert(setting.lb+"："+l.toLong) ;
			}
			if(isNub(setting.fh.eq)){
				bln = val==setting.fh.eq ;
				if(!bln)
					$.oimsAlert(setting.lb+"："+l.notEqLong) ;
			}
		} ;
	};
	
	function length4EverySubmit(arids,f){
		
		var bln = true ;
		$.each(arids,function(i,v){
			if(v==undefined) return false ;
			var len = $("#"+v.id,f).val().length ;
			if(len==0)
				return true ;
			var fh = v.fh ;
			if(isNub(fh.gt)){
				bln = len>fh.gt ; 
				if(!bln){
					$.oimsAlert(v.lb+"："+l.notLong) ;
					return false ;
				}
			}
			if(isNub(fh.lt)){
				bln = len<fh.lt ; 
				if(!bln){
					$.oimsAlert(v.lb+"："+l.toLong) ;
					return false ;
				}
			}
			if(isNub(fh.eq)){
				bln = len==fh.eq ; 
				if(!bln){
					$.oimsAlert(v.lb+"："+l.notEqLong) ;
					return false ;
				}
			}
		}) ;
		return bln ;
	} ;
	
	
	return {
		/**
		 * 需要什么验证
		 */
		tag:"validate",
		/**
		 * 标签
		 */
		lbl:"lbl",
		/**
		 * @author 于洋
		 * @param p:String
		 * @returns boolean
		 * <p>是数字返回true</p>
		 */
		isNub:isNub,
		/**
		 * @author 于洋
		 * @param p:String 
		 * @returns :boolean 
		 * <p>符合email格式返回true</p>
		 */
		isMail:function(p){
			if(p==undefined||p=="") return true ;
			var partten = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			   if(partten.test(p)) {   
			       return true;   
			   }   
			   return false;
		},
		/**
		 * @author 于洋
		 * @param p1:元素1id 
		 * @param p2:元素2id 
		 * @returns :boolean 
		 * <p>两个字符串相同返回true</p>
		 */
		isValueSame:function(p1,p2){
			return $("#"+p1).val()==$("#"+p2).val() ;
		},
		/**
		 * @author 于洋
		 * @param p:String
		 * @returns :boolean 
		 * <p>字符串为null,undefined,""返回true</p>
		 */
		isStrEmpty:function(p){
			if(p==null||p==undefined||p=="")
				return true ;
			else
				return false ;
		},
		isNotStrEmpty:function(p){
			if(p==null||p==undefined||p=="")
				return false ;
			else
				return true ;
		},
		/**
		 * @author 于洋
		 * @param p:Object 
		 * @param l:长度
		 * @returns :booelan
		 * <p>长度是否符合，符合返回true</p>
		 */
		isLeightNub:isLeightNub,
		/**
		 * @author 于洋
		 * @param p:String
		 * @returns :booelan
		 * <p>是否符合手机格式，符合返回true</p>
		 */
		isPhone:isPhone,
		/**
		 * @author 于洋
		 * @param p:String 
		 * @returns :boolean
		 * <p>是否符合电话格式，符合返回true</p>
		 */
		isTel:isTel,
		/**
		 * @author 于洋
		 * @param p：String
		 * @returns :boolean
		 * <p>是否符合邮政编码格式，符合返回true</p>
		 */
		isPost:function(p){
			if(p==undefined||p=="") return true ;
			var partten = /^[0-9]{6}$/;
			   if(partten.test(p)) {   
			       return true;   
			   }   
			   return false;
		},
		/**
		 * 
		 * @param arIds:{id:"",lb:""}
		 * @param f :范围
		 * @returns
		 * <p>时时校验，添加focusout()事件，数组内指定id的元素不能填空</p>
		 */
		isNotEmpty4Every:isNotEmpty4Every,
		/**
		 * 
		 * @param arIds:{id:"",lb:""}
		 * @param f :范围
		 * @returns
		 * <p>提交时，数组内指定id的元素不能填空 有空值时返回false</p>
		 */
		isNotEmpty4EverySubmit:isNotEmpty4EverySubmit,
		/**
		 * fh = "<10;>6;=7"
		 * @param arids:[{id:"",lb:"",fh:{gt:"",lt:"",eq:""}}]
		 * @param f
		 * @returns
		 * <p>时时校验，添加focusout()事件，数组内指定id的元素值的长度校验</p>
		 */
		length4Every:length4Every,
		/**
		 * 
		 * @param arIds:[{id:"",lb:"",fh:{gt:"",lt:"",eq:""}}]
		 * @param f :范围
		 * @returns
		 * <p>提交时，数组内指定id的元素值的长度校验 有不满足时，返回false</p>
		 */
		length4EverySubmit:length4EverySubmit
	} ;
} ;
/**
 * 页面元素常用方法
 */
function utilTool(){
	/**
	 * 页面元素可用
	 * @param je
	 */
	function fundisabled(je){
		$.each($("input",je),function(i,v){
			$(v).attr("disabled",false) ;
		}) ;
		$.each($("select",je),function(i,v){
			$(v).attr("disabled",false) ;
		}) ;
		$.each($("textarea",je),function(i,v){
			$(v).attr("disabled",false) ;
		}) ;
	} ;
	/**
	 * 页面元素不可用
	 * @param je
	 */
	function fdisabled(je){
		$.each($("input",je),function(i,v){
			$(v).attr("disabled","disabled") ;
		}) ;
		$.each($("select",je),function(i,v){
			$(v).attr("disabled","disabled") ;
		}) ;
		$.each($("textarea",je),function(i,v){
			$(v).attr("disabled","disabled") ;
		}) ;
	} ;
	/**
	 * 列表中选中的是否是一条数据
	 * @returns
	 */
	
	function listSelectOne(){
		var selectLtOne = ipadLanguage.selectLtOneLanguage;
		var selectGtOne = ipadLanguage.selectGtOneLanguage ;
		var checked = getCheckBoxValue() ;
		if(checked.length<1){
			$.oimsAlert(selectLtOne) ;
			return false;
		}else if(checked.length>1){
			$.oimsAlert(selectGtOne) ;
			return false;
		}
		return checked[0] ;
	} ;
	/**
	 * @author 于洋
	 * @param vl:option:value
	 * @param id:select 元素id
	 * @param f:所在的父级元素
	 * select 元素选中一个值
	 */
	function selected(vl,id,f){
		f = f==undefined?document:f ;
		$.each($("#"+id+">option",f),function(i,v){
			if(v==undefined)return false;
			v = $(v) ;
			if(v.val()==vl){
				v.attr("SELECTED","SELECTED") ;
				return false ;
			}
		}) ;
	} ;
	/**
	 * @author 于洋
	 * @param name
	 * @param val
	 * @param f
	 * radio中选中一个
	 */
	function radioSelect(name,val,f){
		var arry = $("input[name='"+name+"']",f) ;
		$.each(arry,function(i,v){
			if(v==undefined) return false ;
			if($(v).val() == val){
				$(v).attr("checked","checked") ;
				return false ;
			}
		}) ;
	} ;
	/**
	 * @author 于洋
	 * @param name
	 * @param vs
	 * @param f
	 * checkBox 中选中vs数据中的值
	 */
	function checkSelect(name,vs,f){
		if(vs==undefined||vs.length<1) return ;
		var arry = $("input[name='"+name+"']",f);
		for(i=0;i<vs.length;i++){
			$.each(arry,function(i,v){
				if(v==undefined)return ;
				if($(v).val()==vs[i]){
					$(v).attr("checked","checked") ;
					return false ;
				} 
			}) ;
		}
	} ;
	
	/**
	 * 返回多选按钮所选中的值
	 * @param 多选按钮 name属性
	 * @param f 多选按钮所在的form 如果是空，默认为document
	 * @param type=str 返回格式"'','',''..." type=undefined返回  ",,,,..."
	 */
	function checkboxClick(n,f,type){
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
	var f = {
			checkboxClick:checkboxClick,
			fundisabled:fundisabled,
			/**
			 * @param f :jquery 对象
			 * <p>把参数f内的input,select,textarea设置为不可用</p>
			 */
			fdisabled:fdisabled,
			/**
			 * 页面列表中选择一个选中项，如果是返回选中数据，如果不是返回false
			 */
			listSelectOne:listSelectOne,
			/**
			 * 下拉菜单设置默认值
			 */
			selected:selected,
			/**
			 * 单选选择
			 * @param name, checkbox 名
			 * @param vs,	需要选中的值
			 * @param f		checkbox所在的form
			 */
			radioSelect:radioSelect,
			/**
			 * 多选选择
			 * @param name, checkbox 名
			 * @param vs,	需要选中的值
			 * @param f		checkbox所在的form
			 */
			checkSelect:checkSelect
	} ;
	return f ;
} ;
/**
 * @author 于洋
 * 导出数据常用方法
 */
function proTool(){
	
	/**
	 * {select:"",from:"",where:"",order:"",group:""}{cs:cp,head:head}
	 * @param url
	 * @param d
	 * 点击后自动下载
	 */
	function proDown(url,d){
		var f = $("<form />").attr({action:url,method:"post"}) ;
		var h = "" ;
		
		h = $("<input type='hidden' name='cs' value='"+d.cs+"' />") ;
		f.append(h) ;
		h = $("<input type='hidden' name='findTag' value='"+d.findTag+"' />") ;
		f.append(h) ;
		h = $("<input type='hidden' name='head' value='"+d.head+"' />") ;
		f.append(h) ;
		
		h = $("<input type='hidden' name='select' value='"+d.select+"' />") ;
		f.append(h) ;
		h = $("<input type='hidden' name='from' value='"+d.from+"' />") ;
		f.append(h) ;
		h = $("<input type='hidden' name='where' value='"+d.where+"' />") ;
		f.append(h) ;
		h = $("<input type='hidden' name='order' value='"+d.order+"' />") ;
		f.append(h) ;
		h = $("<input type='hidden' name='group' value='"+d.group+"' />") ;
		f.append(h) ;
		f.appendTo($("html")) ;
		f.get(0).submit() ;
		f.remove() ;
	} ;
	
	/**
	 * 
	 * 生成报表头字符串
	 * @param ds  :{index:"",title:"",column:"",defValue:"",tValue:"",fValue:""}
	 * @returns {String}
	 */
	function getProHead(ds){
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
	return {
		proDown:proDown,
		getProHead:getProHead
	} ;
} ;
function hqlTool(){
	 /**
     * hql语句中有where 返回and 没有返回where 
     * @param s
     * @returns {String}
     */
    function whereOrAnd(s){
        if(s.indexOf("where")>0)
            return " and " ;
        else
            return " where " ;
    } ;
	 /**
	  * @author 于洋
	  * @param id
	  * @returns {String}
	  * 页面元素中得到的是"{value},{value},...."
	  * 在hql中列属性为字符串时，把值转成"'{value}','{value}',...."
	  */
	 function stringValues(id){
			var vl = $("#"+id).val() ;
			var vs = vl.split(",") ;
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
	 * 
	 * @param s
	 * @param f
	 * @param w
	 * @param o
	 * @param g
	 * @returns {___anonymous27363_27408}
	 */
		function createHql(tag,s,f,w,o,g){
			var h =  {findTag:"",select:"",from:"",where:"",order:"",group:""} ;
			h.findTag = tag ;
			h.select = s==undefined?"":" "+s+" " ;
			h.from = f==undefined?"":" "+f +" ";
			h.where = w==undefined?"":" "+w+" " ;
			h.order = o ==undefined?"":" "+o+" ";
			h.group = g ==undefined?"":" "+g+" ";
			return h ;
		} ;
	/**
	 * 生成可被后台解析成hql map参数的字符串
	 * @param t
	 * @param v
	 * @param n
	 * @returns {String}
	 */
	function createHqlMapParam(t,v,n){
		if(t==undefined)
			t = "string" ;
		if(v==undefined)
			v = "" ;
		if(n==undefined)
			return "" ;
		return "value"+"<kv>"+v+"<f>"+"name"+"<kv>"+n+"<f>"+"type"+"<kv>"+t ;
	} ;
	
	return {
		whereOrAnd:whereOrAnd,
		stringValues:stringValues,
		createHql:createHql,
		createHqlMapParam:createHqlMapParam
	} ;
} ;
/**
 * @author 于洋
 * 全局常量globeConstant
 */
function globeConstant(){
	return {
		man:false ,//男
		woman:true,//女
		yes:true,//是
		no:false//否
	} ;
} ;

/**
 * 后台时间转前台时间
 */
function time(t){
	var d = new Date(t.time) ;
	 /**
     * 某年某月的最后一天
     * @param nian
     * @param yue
     * @returns {String}
     */
    function lastDay(nian,yue){
        nian= nian==undefined?undefined:Number(nian) ;
        yue= yue==undefined?undefined:Number(yue) ;
        var d = new Date() ;
        var y = nian==undefined?d.getFullYear():nian ;
        var m = yue==undefined?(d.getMonth()+1):yue ;
        return  y+"-"+m+"-"+getlastDay(y,m) ;
    } ;
    function getlastDay(y,m){
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
     * @returns {String}
     */
    function firstDay(nian,yue){
        nian= nian==undefined?undefined:Number(nian) ;
        yue= yue==undefined?undefined:Number(yue) ;
        var d = new Date() ;
        var y = nian==undefined?d.getFullYear():nian ;
        var m = yue==undefined?(d.getMonth()+1):yue ;
        return y+"-"+m+"-"+1 ;
    } ;
	function yyyy_mm_dd(){
		var str=d.getUTCFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
		return str;
	} ;
	function yyyy_mm_dd_hms(){
		var str=d.getUTCFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
		return str;
	} ;
	return {
		 /**
	     * 某年某月的最后一天
	     * @param nian
	     * @param yue
	     * @returns {String}
	     */
		lastDay:lastDay,
		/**
	     * 某年某月的第一天
	     * @param nian
	     * @param yue
	     * @returns {String}
	     */
		firstDay:firstDay,
		/**
		 * 后台时间转成yyyy-mm-dd格式
		 */
		format_yyyy_mm_dd:yyyy_mm_dd,
		/**
		 * 后台时间转成yyyy-mm-dd HH:mm:ss格式
		 */
		format_yyyy_mm_dd_hms:yyyy_mm_dd_hms
	} ;
} ;


/**
 * @author 于洋
 * @param param
 *  json param : 可以是字符串，字符串必为url
 *  	param ：可以是对象，{
 *  		url:"响应地址", //必须
 *  		data:参数
 *          ajaxBefor:"在ajax请求前所执行的函数，返回boolean，true:可以向下执行请求",
 *          errorFn:"请求发生错误，回传三个参数(jqXHR, textStatus, errorThrown)"
 *          successFn:请求成功后，结果做为参数回传 (data, textStatus, jqXHR),
 *          defInfo:boolean
 *          }
 *
 * @returns 成功返回json数据
 */

function ajaxReq (param){
    var l ={fail:ipadLanguage.failLanguage,success:ipadLanguage.successLanguage} ;

    if(typeof(param)=="string")
        param = {url:param} ;
    var rt = undefined ;
    var run = true ;
    if(param.defInfo==undefined)
        param.defInfo = false ;
    if(typeof(param.ajaxBefor)=="function"){
        run = param.ajaxBefor ;
        if(!run)
            return false;
    }
    var fn_error = function(jqXHR, textStatus, errorThrown){
        if(param.defInfo)
            $.oimsAlert(l.fail) ;
        if(typeof(param.errorFn)=="function")
            param.errorFn(jqXHR, textStatus, errorThrown) ;
    } ;
    var fn_success = function(data, textStatus, jqXHR){
        if(param.defInfo)
            $.oimsAlert(l.success) ;
        rt = data  ;
        if(typeof(param.successFn)=="function")
            param.successFn(data) ;
    } ;
    $.ajax({
        url:param.url,
        data:param.data,
        type:(param.type==undefined?"post":param.type),
        dataType:(param.dataType==undefined?"json":param.dataType),
        async:false,
        success:fn_success,
        error:fn_error
    }) ;
    return rt ;
} ;

function thisMovie(movieName) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
        return window[movieName];
    } else {
        return document[movieName];
    }
}
//---------------------------------------------------------------------------------------------

/**
 * <p>操作一条或多条数据</p>
 *  @author 祝建荣
 * @param field
 * @param content
 */

function opOneAndMutiDialog(msg,url,callback){
	var checked =getCheckBoxValue() ;
	if(checked.length<1){
		$.oimsAlert(ipadLanguage.zhishaoSelectDota) ;
	    return;
	}
	$.oimsConfirm(msg,function(){	
		var ids = "" ;
		$.each(checked,function(i,v){
			if(ids!="")
				ids+="," ;
			ids+=""+v.id+"" ;
		}) ;
		var result = getJSONData(url,{ids:ids},"post") ;
		if(result.state){
			$.oimsSucc(result.message,callback) ;
			
		}else{
			$.oimsAlert(ipadLanguage.DeleteShiBai) ;
		}

	}) ;
}

function calendarFun(id,leftWidth){
	 var cal = Calendar.setup({
         onSelect: function(cal) { cal.hide();
			 var date = cal.selection.get();
             if (date) {
                     date = Calendar.intToDate(date);
                     document.getElementById(id).value = Calendar.printDate(date, "%Y-%m-%d");
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


}


