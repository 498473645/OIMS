

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
        		$(".menuright ul li:eq(2)").text(xiaoping_language.yanguangcaiji);
        		TeShuJianChaFlag = false;
        	}else if(d.xppath=="jianchaYanYa.js"){
        		$(".menuright ul li:eq(2)").text(xiaoping_language.yanyacaiji);
        		TeShuJianChaFlag = false;
        	}else if(d.xppath=="jianchaShili.js"){
        		$(".menuright ul li:eq(2)").text(xiaoping_language.shilicaiji);
        		TeShuJianChaFlag = false;
        	}else if(d.xppath=="jianchaTeShu.js"){
        		$(".menuright ul li:eq(2)").text(xiaoping_language.jcyq);
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
    		$.oimsAlert(xiaoping_language.peizhicwqueren);
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
        $("#hzxb").text(huanzhe.xingbie?xiaoping_language.Male:xiaoping_language.Female);
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
            strDate = xiaoping_language.Sunday;
            break;
        case 1:
            strDate = xiaoping_language.Monday;
            break;
        case 2:
            strDate =xiaoping_language.Tuesday;
            break;
        case 3:
            strDate =  xiaoping_language.Wednesday;
            break;
        case 4:
            strDate =  xiaoping_language.Thursday;
            break;
        case 5:
            strDate = xiaoping_language.Friday;
            break;
        case 6:
            strDate = xiaoping_language.Saturday ;
            break;
        case 7:
            strDate =  xiaoping_language.Sunday;
            break;
    }
    year = today.getUTCFullYear();
    month = fd(today.getMonth()+1);
    date = fd(today.getDate());
    hour = fd(today.getHours());
    minute =fd(today.getMinutes());
    second = fd(today.getSeconds());
    thisTime = year + xiaoping_language.year + month +xiaoping_language.MonthRiQi + date + xiaoping_language.SRIndex +  strDate +" " + hour + ":" + minute + ":" + second;
    $("#showTime").text(xiaoping_language.RiQiTimeChaoTu+"："+thisTime);
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
		if($("#biginput").val().indexOf(xiaoping_language.Qsr)!=-1){
			$("#biginput").val("");
		}
		$("#opendiv").show();
	},function(){
		if($("#biginput").val()==""){
			$("#biginput").val(xiaoping_language.shurublhhuoshuaka);
		}
		$("#opendiv").hide();
	});
	
	$("#show").toggle(function(){		
		if($("#biginput").val().indexOf(xiaoping_language.Qsr)!=-1){
			$("#biginput").val("");
		}
		$("#opendiv").show();
	},function(){
		if($("#biginput").val()==""){
			$("#biginput").val(xiaoping_language.shurublhhuoshuaka);
		}
		$("#opendiv").hide();
	});
	$("#hide").click(function(){
		if($("#biginput").val()==""){
			$("#biginput").val(xiaoping_language.shurublhhuoshuaka);
		}
		$("#opendiv").hide();
	});
	
	$("#queryhz").click(function(){
		$("#opendiv").hide();
		clearInterval(zxJishiqi);
		var search = $("#biginput").val();
		if(search.indexOf(xiaoping_language.Qsr)!=-1){
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

function initJspLan(){
	$("#opation1id").text(xiaoping_language.HuanZheInfo);
	$("#opation2id").text(xiaoping_language.YjLb);
	$("#opation3id").text(xiaoping_language.DjLb);
	$("#opation4id").text(xiaoping_language.guohaoliebiao);
	$("#biginput").text(xiaoping_language.shurublhhuoshuak);
	$("#xiaoping_xingming").text(xiaoping_language.XingMing+":");
	$("#xiaoping_sex").text(xiaoping_language.Sex+":");
	$("#xiaoping_age").text(xiaoping_language.Age+":");
	$("#xiaoping_jcxm").text(xiaoping_language.Jcxm+":");
	$("#xiaoping_yanbie").text(xiaoping_language.jianchayanbie+":");
	$("#xiaoping_jcys").text(xiaoping_language.JcYs+":");
    $(".menuright ul li:.opation1").text(xiaoping_language.JcYs);
    $(".menuright ul li:.opation2").text(xiaoping_language.BingLiBs);
      $(".menuright ul li:.opation3").text(xiaoping_language.jcyq);
        $(".menuright ul li:.opation4").text(xiaoping_language.JcdState);
          
}

$(document).ready(function() {
	xiaoping_language = setLanguage(xiaoping_language);
	initJspLan();
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
			$.oimsAlert(xiaoping_language.weixuanzehuanzhe);
			return;
		}
		$.oimsConfirm({strTitle:xiaoping_language.querenguohao,remove_length:true},function(){
			task.start = true;
		    var result = getJSONData("/publish/jcd/executeJcdPass.htm",{id:$("#jcdId").val(),tag:Math.random()});
		    if(result.state){
		        getOneJcdForm();
		        showExecuteJcdList();
		    }else{
		        $.oimsAlert(xiaoping_language.shezhiguohaosb);
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
		$("#xingbie").val(jef.xingbie?xiaoping_language.Male:xiaoping_language.Female);
		$("#nianling").val(jef.nianling);
		$("#jcxmmc").val(jef.jcxm);
		if(jef.yanbie==48){
			$("#yanbie").val(xiaoping_language.DoubleEye);
		}else if(jef.yanbie==46){
			$("#yanbie").val(xiaoping_language.LeftEye);
		}else if(jef.yanbie==47){
			$("#yanbie").val(xiaoping_language.RightEye);
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
		$.oimsAlert(xiaoping_language.weixuanzehuanzhe);
		return false;
	}
	return true;
}





