

var task={start:true,jcsbid:null};
var TeShuJianChaFlag = false;
var jcdId;
var jcxmId;
var page =1;
var pageSize = 5;
var doing = false;
var focusId ;

function showHzBasinfo(){
	clearInterval(zxJishiqi);
	var dataObjects=getCheckBoxValue();
	$("#huanzheId").val(dataObjects[0].huanzheid);
	$("#jiuzhenId").val(dataObjects[0].jiuzhenid);
	$("#jcdId").val(dataObjects[0].id);
	$("#xingming").val(dataObjects[0].hzxm);
	$("#xingbie").val(dataObjects[0].hzxb);
	$("#nianling").val(dataObjects[0].nianling);
	$("#jcxmmc").val(dataObjects[0].jcxmmc);
	$("#yanbie").val(dataObjects[0].yanbie);
}

function clearHzBasinfo(){
	clearInterval(zxJishiqi);
	$("#huanzheId").val("");
	$("#jiuzhenId").val("");
	$("#jcdId").val("");
	$("#xingming").val("");
	$("#xingbie").val("");
	$("#nianling").val("");
	$("#jcxmmc").val("");
	$("#yanbie").val("");
}




var sbConfState = true;
function shebeiManager(){		
	var data = getJSONData("/publish/shebei/getShebeiListForUserAndIp.htm",{tag:Math.random()});
    if(data.state){
    	clearInterval(jishiqi);
    	var shebei = data.obj;
    	$.each(shebei,function(i,d){
    		task.jcsbid=d.id;
        	if(d.xppath=="jianchaYanGuang.js"){
        		$(".menuright ul li:eq(2)").text("验光采集");
        		TeShuJianChaFlag = false;
        	}else if(d.xppath=="jianchaYanYa.js"){
        		$(".menuright ul li:eq(2)").text("眼压采集");
        		TeShuJianChaFlag = false;
        	}else if(d.xppath=="jianchaShili.js"){
        		$(".menuright ul li:eq(2)").text("视力采集");
        		TeShuJianChaFlag = false;
        	}else if(d.xppath=="jianchaTeShu.js"){
        		$(".menuright ul li:eq(2)").text("检查要求");
        		TeShuJianChaFlag = true;
        	}
        	importJS("/xiaoping/"+d.xppath);  	
        	clearInterval(zxJishiqi);
        	zxJishiqi = setInterval(showExecuteJcdList,600);
        //	showExecuteJcdList();
    	});
    	initPage();
    	return true;
    	
    }else{ 
    	if(sbConfState){
    		$.oimsAlert("采集设备配置有误，请确认！");
    		sbConfState=false;
    	}
    	return false;
    }
}

function initHzxx(){
	task.start = false;
	var hzid = $("#huanzheId").val();
    var hzxxData = getJSONData("/publish/huanZheXinXi/findHuanZheById.htm",{id:hzid,tag:Math.random()},"post");
    if(hzxxData.state){
    	var huanzhe = hzxxData.obj;
    	$("#binglihao").text(huanzhe.binglihao);
        $("#hzxm").text(huanzhe.xingming);
        $("#hzxb").text(huanzhe.xingbie?"男":"女");
        $("#shouji").text(huanzhe.shouji);
        $("#dianhua").text(huanzhe.dianhua);
        $("#diqu").text(huanzhe.diqu);  
        $("#sfzh").text(huanzhe.sfzh); 
        $("#laiyuan").text(huanzhe.laiyuan); 
        $("#hzlxr").text(huanzhe.hzlxr);
        $("#hzlxrdh").text(huanzhe.hzlxrdh); 
        $("#jtdz").text(huanzhe.jtdz);
        $("#youbian").text(huanzhe.youbian); 
        $("#dwdz").text(huanzhe.dwdz);
        $("#dwyb").text(huanzhe.dwyb); 
    }
    
}
var capslockflag = false;
function keyNum(value){
	if(value=='exit'){
		$("#biginput").val("");
	}else if(value=='enter'){
		$("#opendiv").hide();
	}else if(value=='capslock'){
        if($("#capsLock").attr("class")=='enterr'){
        	capslockflag = true;
        	$("#capsLock").removeClass().addClass("enterr1");
        }else{
        	capslockflag = false;
        	$("#capsLock").removeClass().addClass("enterr");
        }
	}else{
		var prevalue = $("#biginput").val();
		if(capslockflag&&value&&isChar(value)){
			value = value.toUpperCase();
		}
    	$("#biginput").val(prevalue+value);
	}
}

function showtime(){
    var today,hour,second,minute,year,month,date;
    var strDate ;
    today=new Date();
    var n_day = today.getDay();
    switch (n_day)
    {
        case 0:
            strDate = "星期日";
            break;
        case 1:
            strDate = "星期一";
            break;
        case 2:
            strDate ="星期二";
            break;
        case 3:
            strDate =  "星期三";
            break;
        case 4:
            strDate =  "星期四";
            break;
        case 5:
            strDate =  "星期五";
            break;
        case 6:
            strDate =  "星期六";
            break;
        case 7:
            strDate =  "星期日";
            break;
    }
    year = today.getUTCFullYear();
    month = fd(today.getMonth()+1);
    date = fd(today.getDate());
    hour = fd(today.getHours());
    minute =fd(today.getMinutes());
    second = fd(today.getSeconds());
    thisTime = year + "年" + month + "月" + date + "日" +  strDate +" " + hour + ":" + minute + ":" + second;
    $("#showTime").text("当前时间："+thisTime);
    setTimeout("showtime();", 1000);
    function fd(d){
    	d=d+"";
    	return d.length==1 ? "0"+d : d;
    }
}


function initInpFrame(){
	switchFun("menuleft","menuright");
	switchFun("menuright","menuleft");
	var l2 = $(".menuleft ul li:eq(2)");
	exportUl("menuleft","menuright",l2);
	
//	$("#biginput").click(function(){
//		clearInitQuery(this);
//	});
//	
//	$("#biginput").blur(function(){
//		if(this.value==""){
//			$("#biginput").val("请输入病历号或刷卡");
//		}
//			
//	});
	
	$("#biginput").toggle(function(){		
		if($("#biginput").val().indexOf("请输入")!=-1){
			$("#biginput").val("");
		}
		$("#opendiv").show();
	},function(){
		if($("#biginput").val()==""){
			$("#biginput").val("请输入病历号或刷卡");
		}
		$("#opendiv").hide();
	});
	
	$("#show").toggle(function(){		
		if($("#biginput").val().indexOf("请输入")!=-1){
			$("#biginput").val("");
		}
		$("#opendiv").show();
	},function(){
		if($("#biginput").val()==""){
			$("#biginput").val("请输入病历号或刷卡");
		}
		$("#opendiv").hide();
	});
	$("#hide").click(function(){
		if($("#biginput").val()==""){
			$("#biginput").val("请输入病历号或刷卡");
		}
		$("#opendiv").hide();
	});
	
	$("#queryhz").click(function(){
		$("#opendiv").hide();
		clearInterval(zxJishiqi);
		var search = $("#biginput").val();
		if(search.indexOf("请输入")!=-1){
			search = "";
//			$.oimsAlert("请输入患者病历号");
//			return;
		}
		 var obj = {search:search};
	     $.extend(listFactor.data,obj);
	     $("#pageList").createPageList(listFactor);	
	});
}

function initLeftFun(){
	$(".menuleft ul li:eq(0)").click(function(){
		$("#opendiv").hide();
		clearInterval(zxJishiqi);
		showHuanZheXinXi();
		if(TeShuJianChaFlag){
			btnValiate();
		}else{
			btnDisabled();
		}
	});
	
	$(".menuleft ul li:eq(1)").click(function(){
		$("#opendiv").hide();
		clearInterval(zxJishiqi);
		showFinishJcdList();
		if(TeShuJianChaFlag){
			btnValiate();
		}else{
			btnDisabled();
		}
	});
	
	$(".menuleft ul li:eq(2)").click(function(){
		$("#opendiv").hide();
		clearInterval(zxJishiqi);
		zxJishiqi = setInterval(showExecuteJcdList,600);
	//	showExecuteJcdList();
		if(TeShuJianChaFlag){
			btnValiate();
		}else{
			btnDisabled();
		}
		
	});
	
	$(".menuleft ul li:eq(3)").click(function(){
		$("#opendiv").hide();
		clearInterval(zxJishiqi);
		showGuohaoJcdList();
		if(TeShuJianChaFlag){
			btnValiate();
		}else{
			btnDisabled();
		}
	});
}

function initRightFun(){
	$(".menuright ul li:eq(0)").click(function(){
		$("#opendiv").hide();
		clearInterval(zxJishiqi);
		showJianChaDoctor();
		if(TeShuJianChaFlag){
			btnValiate();
		}else{
			btnDisabled();
		}
	});
	
	$(".menuright ul li:eq(1)").click(function(){
		$("#opendiv").hide();
		clearInterval(zxJishiqi);
		showBingliBingShi();
		if(TeShuJianChaFlag){
			btnValiate();
		}else{
			btnDisabled();
		}
	});
	
	$(".menuright ul li:eq(2)").click(function(){
		$("#opendiv").hide();
		clearInterval(zxJishiqi);
		if(showJianChaTiShi()){
			btnValiate();
		}
		

	});
	
	$(".menuright ul li:eq(3)").click(function(){
		$("#opendiv").hide();
		clearInterval(zxJishiqi);
		showAllJcdList();
		if(TeShuJianChaFlag){
			btnValiate();
		}else{
			btnDisabled();
		}
	});
};

function initPage(){
	initInpFrame();
	initLeftFun();
	initRightFun();
	initBtnFooter();
}

var jishiqi;
var zxJishiqi;

$(document).ready(function() {
	showtime(); 
	if(!shebeiManager()){
    	jishiqi = setInterval(shebeiManager,500);
    } 
});


/**
 *设置过号
 */
function setGuohao(){
	 var jcdId = $("#jcdId").val();
		if(jcdId==""){
			$.oimsAlert("未选择患者检查单!");
			return;
		}
		$.oimsConfirm({strTitle:"确认过号！",remove_length:true},function(){
			task.start = true;
		    var result = getJSONData("/publish/jcd/executeJcdPass.htm",{id:$("#jcdId").val(),tag:Math.random()});
		    if(result.state){
		        getOneJcdForm();
		        showExecuteJcdList();
		    }else{
		        $.oimsAlert("设置过号失败！");
		    }
		});
    
}

function getOneJcdForm(){
	var data = getJSONData("/publish/jcd/zhixingGetOne.htm?jcsbid="+task.jcsbid,{tag:Math.random()});
	if(data.state){
		var jef = data.obj;
		$("#huanzheId").val(jef.huanzheid);
		$("#jiuzhenId").val(jef.jiuzhenid);
		$("#jcdId").val(jef.jcdid);
		$("#xingming").val(jef.xingming);
		$("#xingbie").val(jef.xingbie?"男":"女");
		$("#nianling").val(jef.nianling);
		$("#jcxmmc").val(jef.jcxm);
		if(jef.yanbie==48){
			$("#yanbie").val("双眼");
		}else if(jef.yanbie==46){
			$("#yanbie").val("左眼");
		}else if(jef.yanbie==47){
			$("#yanbie").val("右眼");
		}
	}
};

function isExistHzxx(){
	var huanzheId = $("#huanzheId").val();
	if(huanzheId==""){
		var l2 = $(".menuleft ul li:eq(2)");
		exportUl("menuleft","menuright",l2);
		clearInterval(zxJishiqi);
    	zxJishiqi = setInterval(showExecuteJcdList,600);
//		showExecuteJcdList();
		$.oimsAlert("未选择患者检查单");
		return false;
	}
	return true;
}





