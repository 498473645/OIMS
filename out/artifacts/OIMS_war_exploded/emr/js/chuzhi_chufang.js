var GET_DRUG_DICT_URL="/publish/chufang/getDrugDictInfo.htm";
var GET_DRUG_STOCK_URL="/publish/chufang/findDrugStoreList.htm";

//处方审查基本配置
this.urlHead='http://132.147.160.115/';
this.url=urlHead+"/medicalData/webserver/doWebCheck.apl";
this.doCheckUrl =urlHead+"/medicalData/webserver/doWebCheck.apl";
this.doMagUrl =urlHead+"/medicalData/webserver/doWebMsg.apl";
this.realtime =urlHead+"/medicalData/webserver/realtime.apl";
this.loading =urlHead+"/medicalData/apis/loadingWait.apl";
this.NoticePath=urlHead+"/medicalData/apis/apiData_H.apl?model=ZYTS&key={dc}&show=2";
this.SmsPath=urlHead+"/medicalData/apis/apiData_S.apl?&key={dc}&show=2";
importJS("/layer/layer/mobile/layer.js");
importCSS("/layer/layer/mobile/need/layer.css");
importJS("/layer/layer/layer.js");
importCSS("/layer/layer/theme/default/layer.css");
importJS("/emr/js/functions.js");

var SSID = '';
var deptData = [];
this.config=function(){
	this.HZLX='2';  //HZLX:回执类型,1、警示级别+json，2、警示级别及Html、show
	this.SHOW='1';
	this.SAVE='0';
	this.BEHAVIOR='0';   //0自查,1提请药师审查,2双签,3强制提交,4医生签字执行
};

//病人基本信息
this.PatientInfo=function(){
	this.piPatCode ='';
	this.piInHospNo ='';
	this.piVisitCode ='';
	this.piName ='';
	this.piSex ='';
	this.piBirthday ='';
	this.piHeightCM ='';
	this.piWeighKG ='';
	this.piDeptCode ='';
	this.piDeptName ='';
	this.piDoctorCode ='';
	this.piDoctorName ='';
	this.piPatStatus ='';
	this.piIsLactation ='';
	this.piIsPregnancy ='';
	this.piPregStartDate ='';
	this.piHepDamageDegree ='';
	this.piRenDamageDegree ='';
	this.piVisitDate ='';
	this.piChronicDisease ='';
};
//诊断信息
this.DiagnosisInfo=function(){
	this.piIndex = '';
	this.piDiseaseCode = '';
	this.piDiseaseName = '';
	this.piRecipNo = '';
};
//过敏信息
this.AllergyInfo = function(){
	this.piIndex ='';
	this.piAllerCode ='';
	this.piAllerName ='';
	this.piAllerSymptom ='';
}
//用药信息
this.DrugUseInfo=function(){
	this.piIndex ='';
	this.piOrderNo ='';
	this.piOrderSubNo ='';
	this.piDrugUniqueCode ='';
	this.piDrugName ='';
	this.piDoseNum ='';
	this.piDosePerTime ='';
	this.piDoseUnit ='';
	this.piFrequency ='';
	this.piRouteCode ='';
	this.piRouteName ='';
	this.piStartTime ='';
	this.piEndTime ='';
	this.piExecuteTime ='';
	this.piGroupTag ='';
	this.piIsTempDrug ='';
	this.piOrderType ='';
	this.piDeptCode ='';
	this.piDeptName ='';
	this.piDoctorCode ='';
	this.piDoctorName ='';
	this.piRecipNo ='';
	this.piNum ='';
	this.piNumUnit ='';
	this.piPurpose ='';
	this.piOprCode ='';
	this.piMediTime ='';
	this.piRemark ='';
	this.piUseDay ='';
	this.piDroppingSpeed ='';
	this.piDripLength ='';
};
//手术信息
this.OperationInfo = function(){
	this.piIndex = '';
	this.piOprCode = '';
	this.piOprName = '';
	this.piIncisionType = '';
	this.piOprStartDateTime = '';
	this.piOprEndDateTime = '';
}
//返回消息结构体
this.callBackData = function(){
	this.NO = '';
	this.Time = '';
	this.Describe = '';
}
//通知服务器消息体
this.msgToSer = function()
{
	this.piMid = '';
	this.piSsid = '';
	this.piBehavior = '';
	this.piReason = 'true';
}

//全局变量
var gPatientModel;
var gDrugDataList = new Array();
var gAllerDataList = new Array();
var gDiagnosisDataList = new Array();
var gOperationDataList = new Array();
var layerIndex = '';
if(deptData.length<=0)
{
	initMedical();
}

function showDrugStockList(list,listType,closeCallback){
	var tag = $("<table />").attr("id","drugChooseTable");
	var tr = $("<tr />").appendTo(tag);
	var thval = ['药品名称','包装规格','生产厂家','单价','单位','库存数量','药局'];
	$.each(thval,function(i,v){
		$("<th />").text(v).appendTo(tr);
	});
	var win = $(tag).oimsDialog({
		title:"请选择药品",
		icon:"view",
		locked:true,
		closeCallback:closeCallback
	});
	$.each(list,function(i,d){
		tr = $("<tr />").dblclick(function(){
			addDrug(d,1,listType);
			win.close();
		}).appendTo("#drugChooseTable");
		$("<td />").text(d.drugName).appendTo(tr);
		$("<td />").text(d.packageSpec).appendTo(tr);
		$("<td />").text(d.firmId).appendTo(tr);
		$("<td />").text(d.price).appendTo(tr);
		$("<td />").text(d.packageUnits).appendTo(tr);
		$("<td />").text(d.store).appendTo(tr);
		$("<td />").text(d.storeName).appendTo(tr);
	});
}
/**
 * 显示药品字典列表
 */
function showPrescribeItemList(result) {
	var showTag = $(".itemListDiv");
	var listType = $("#examListDiv .deptList a.selected").data("listType");
	if (!result.state)
		return;
	var listObj = [ {
		"title" : "药品名称",
	}, {
		"title" : "规格",
	}, {
		"title" : "单位",
	}, {
		"title" : "药局"
	}];
	var tableBody = $('<table />').appendTo(showTag);
	var tr = $("<tr />").appendTo(tableBody);
	$.each(listObj, function(i, d) {
		var th = $("<th />").text(d.title).appendTo(tr);
		if (d.width != undefined)
			th.width(d.width);
	});
	$.each(result.obj, function(i, d) {
    //		if(d.id==5167||d.id==15003)return true;
	//	var bool=false;
	//	var drugList = getDrugDictObject(d.id);
	//	$.each(drugList,function(j,n){
	//		if(n.price){
	//			bool=true;
	//			return false;
	//		}
	//	});
	//	if(!bool)return true;
		var tr = $("<tr />").appendTo(tableBody);
		$("<td />").text(d.drugName).appendTo(tr);
		$("<td />").text(d.packageSpec).appendTo(tr);
		$("<td />").text(d.packageUnits).appendTo(tr);
		var s = d.drugCode.split("@");
		var str = s[s.length-1];//=="YPCS"?"便民药房":"门诊西药房";
		if(str=="YPCS"){
			str = "药品超市";
		}else if(str=="MZYF"){
			str = "门诊药房";
		}else if(str == "MZZYF"){
			str = "门诊中药房";
		}else if(str == "BMYF"){
			str = "便民药房";
		}else if(str == "ZXBYS"){
			str = "中心摆药室";
		}else{
			str = "未知"
		}
		$("<td />").text(str).appendTo(tr);
		var price = d.price.toFixed(2);
		var className = "item_" + d.id + "_listType_" + listType;//item_1201010TA1_listType_4
		tr.addClass(className).dblclick(function() {
			if(ypArr != undefined && ypArr != null){
				$.each(ypArr,function(q,s){
					if(s == d.id){
						$.oimsAlert("注意！这个药品今天已经开过");
						return;
					}
				});
			}

			setCHUZHI_FORM(false);
//			setCHUZHI_ING(true);
			if ($(this).hasClass("on")) {
				$("#jctsDiv_" + d.id + "_eyeExam").hide().remove();
				$("tr#" + className).remove();
				$(this).removeClass("on");
				return;
			}
			var a = $(this);
			a.addClass("on");
			var drugList = getDrugDictObject(d.id);
			if(drugList==null||!drugList.length){
				$.oimsAlert("库存不足！");
				a.removeClass("on")
				return;
			}else if(drugList.length==1){
				addDrug(drugList[0],1,listType);
				return;
			}
			showDrugStockList(drugList,listType,function(){a.removeClass("on")});
		});
		if ($("tr#" + className).length)
			tr.addClass("on");
	});
}

/**
 * 获取药品信息
 * @param id
 * @returns
 */
function getDrugDictObject(id){
	var result = getJSONData(GET_DRUG_STOCK_URL,{drugDictId:id},'POST');
	if(!result.state)return null;
	return result.obj;
}

/**
 * 显示患者处方信息
 * @param listType
 */
function showPatientPrescribe(listType) {
	var re = getJSONData(FIND_CHUFANGQINDAN_URL, {
		jiuzhenId : currentVisit.id,
		jiaofei : 0,
		tag : Math.random()
	});
	if (!re.state || !re.obj.length)
		return;
	$.each(re.obj, function(i, d) {
		addDrug(d.yaopin, d.cfqd.shuliang, listType, d.cfqd);
	});
}

function lookMedical(drugCode) {
	SmsPath=urlHead+"/medicalData/apis/apiData_S.apl?&key={dc}&show=2";
	SmsPath = SmsPath.replace('{dc}',drugCode);
	var request = $.ajax({
		url:SmsPath,
		type:'post',
		data:'',
		dataType:'html',
		success:function(response,status,xhr){
			var areas = ['900px', '600px'];
			var time = 300000000;
			if(response.indexOf('TimeDown')>1)
			{
				areas = ['600px', '300px'];
				time = 1000;
			}
			layerIndex = layer.open({
				type: 2,
				skin: 'my_skin', //样式类名
				title: false,
				closeBtn: 0, //不显示关闭按钮
				area: areas,
				content: [SmsPath, 'no'], //iframe的url，no代表不显示滚动条
				btn: ['关闭'],
				time:time,
				btn1: function(){
					layer.close(layerIndex);
				},
				cancel: function(){
					layer.close(layerIndex);
				}
			});
		},
		error:function(){
		},
	});
}

//审查
function medicalCheck() {

	/***************************************************
	 *循环传入患者基本信息
	 ***************************************************/
	debugger;

	var apt = new PatientInfo();
	var patient = currentPatient;
	apt.piPatCode = patient.binglihao;
	apt.piInHospNo =currentVisit.id;
	apt.piVisitCode =currentVisit.haoma;
	apt.piName = patient.xingming;
	apt.piSex =patient.sex;
	apt.piBirthday =patient.birthday;
	apt.piHeightCM =currentVisit.shengao;
	apt.piWeighKG =currentVisit.tizhong;
	//查询部门信息
	var data = getJSONData("/publish/bumen/findBuMenByID.htm", {
		id : currentVisit.jzks,
		tag : Math.random()
	}, "post");
	apt.piDeptCode = data.obj.bmbm;
	apt.piDeptName = data.obj.bmmc;
	apt.piDoctorCode = currentDoctor;
	apt.piDoctorName = getJSONData(getDoctorNameUrl,{gonghao:currentDoctor},'POST').obj;
	switch (currentVisit.zhenbie){
	  case 60100://急诊
		apt.piPatStatus ="2";
		break;
	  case 2://门诊
		apt.piPatStatus ="1";
		break;
	  case 3://住院
		apt.piPatStatus ="3";
		break;
	}


	apt.piIsLactation ='-1';
	apt.piIsPregnancy ='-1';
	apt.piPregStartDate ='';
	apt.piHepDamageDegree ='0';
	apt.piRenDamageDegree ='0';
	apt.piVisitDate =formatDate(currentVisit.caozuoTime.time).replace(/\-/g, '/');
	apt.piChronicDisease ='0';
	gPatientModel = apt;

	/***************************************************
	 *循环传入医嘱（处方，病人需要使用的药品）信息,对于过期、停嘱、非药疗类的记录不传。
	 ***************************************************/
	var form = document.getElementById("chuzhiForm_4");
	var tagElements = form.getElementsByTagName('tr');
	var arrayObj = new Array(); //可能包含多条
	for (var i = 1; i <= tagElements.length-1; i++){
		var useDrug = new DrugUseInfo();
		useDrug.piIndex =i;
		useDrug.piOrderNo =i;
		useDrug.piOrderSubNo ='1';
		useDrug.piDrugUniqueCode =tagElements[i].children[2].value;
		useDrug.piDrugName =tagElements[i].children[5].innerText;
		useDrug.piDoseNum ='';
		useDrug.piDosePerTime =tagElements[i].children[11].children[0].value;
		useDrug.piDoseUnit = tagElements[i].children[11].innerText;
		useDrug.piFrequency =tagElements[i].children[12].children[0].selectedOptions[0].value;
		useDrug.piRouteCode =tagElements[i].children[12].children[0].selectedOptions[0].value;
		// useDrug.piRouteCode ="230123";
		useDrug.piRouteName =tagElements[i].children[10].children[0].selectedOptions[0].value;
		useDrug.piStartTime ='';
		useDrug.piEndTime ='';
		useDrug.piExecuteTime ='';
		useDrug.piGroupTag ='0';
		useDrug.piIsTempDrug ='0';
		useDrug.piOrderType ='0';
		useDrug.piDeptCode =data.obj.bmbm;
		useDrug.piDeptName =data.obj.bmmc;
		useDrug.piDoctorCode =currentDoctor;
		useDrug.piDoctorName =getJSONData(getDoctorNameUrl,{gonghao:currentDoctor},'POST').obj;
		useDrug.piRecipNo ='';
		useDrug.piNum =tagElements[i].children[6].innerText + '|' + tagElements[i].children[8].children[0].value;
		useDrug.piNumUnit =tagElements[i].children[7].innerText;
		useDrug.piPurpose ='0';
		useDrug.piOprCode ='';
		useDrug.piMediTime ='';
		useDrug.piRemark ='';
		useDrug.piUseDay ='';
		useDrug.piDroppingSpeed ='0';
		useDrug.piDripLength ='0';

		arrayObj[arrayObj.length] = useDrug;
	}
	gDrugDataList = arrayObj;

	/***************************************************
	 *循环传入病生状态(疾病，诊断)信息
	 ***************************************************/
	var zhenduanList = getJSONData("/publish/emr/getExistsDiagnosis.htm", {
		visitId : currentVisit.id,
		tag : Math.random()
	}, "post");
	var arraDiag = new Array();
	if (zhenduanList != null) {
	   for(var i = 0; i < zhenduanList.length; i++){
		var dig = new DiagnosisInfo();
		dig.piIndex = i+1;
		dig.piDiseaseCode = zhenduanList[i].icdCode;
		dig.piDiseaseName = zhenduanList[i].zdflname;
		arraDiag[arraDiag.length] = dig
	   }
	}else {
	   var dig = new DiagnosisInfo();
		dig.piIndex = 1;
		dig.piDiseaseCode = '';
		dig.piDiseaseName = '';
		arraDiag[arraDiag.length] = dig
	}
	gDiagnosisDataList = arraDiag;

	/***************************************************
	 *过敏信息
	 ***************************************************/
	var arrayAllergen = new Array();
	var zhusu=getJSONData(getJzjlByCategoryIdAndJiuzhenid,{categoryId:oimsCategory.WENZHENMOBAN_JIAZUSHI,jiuzhenId:currentVisit.id},'POST').obj;
	var aller = new AllergyInfo();
	if (zhusu != null){
	  for(var i = 0; i < zhusu.length; i++){
		var dig = new DiagnosisInfo();
		dig.piIndex = i+1;
		dig.piDiseaseCode = zhusu[i].categoryId;
		dig.piDiseaseName = zhusu[i].jilu;
		arrayAllergen[arrayAllergen.length] = aller;
	  }
	}else {
		var dig = new DiagnosisInfo();
		dig.piIndex = 1;
		dig.piDiseaseCode = '';
		dig.piDiseaseName = '';
		arrayAllergen[arrayAllergen.length] = aller;
	}
	gAllerDataList = arrayAllergen;

	var rs = doWebCheck(callFunc_a);
}

function doWebCheck(callback)
{
	//隐藏忽略双签
	var tmparr;
	var cData = new callBackData()
	var mData = new msgToSer()
	var localCon = new config();
	if(deptData.length<=0)
	{
		initMedical();
	}
	// if(deptData.indexOf(gPatientModel.piDeptCode)==-1)
	// {
	// 	cData.NO=7;
	// 	cData.Time=0;
	// 	cData.Describe = "审核没有问题或设置了不提醒直接返回";
	// 	callback(cData);
	// 	return;
	// }
	localCon.HZLX = 2;
	localCon.SHOW='1';
	localCon.SAVE='0';
	localCon.BEHAVIOR='0';   //0自查,1提请药师审查,2双签,3强制提交,4医生签字执行
	$.ajax({
		type: "post",
		url: doCheckUrl,
		dataType:'json',
		async:false,
		timeout:5000,
		data:{CONFIG:JSON.stringify(localCon),gPatientModel:JSON.stringify(gPatientModel),gDiagnosisDataList:JSON.stringify(gDiagnosisDataList),gDrugDataList:JSON.stringify(gDrugDataList),gAllerDataList:JSON.stringify(gAllerDataList),gOperationDataList:JSON.stringify(gOperationDataList)},
		success: function (data) {
			SSID = data.SSID;
			if(data.NO == 0  && data.DATA)
			{
				if(data.LJ>0)	//拦截
				{
					layerIndex = layer.open({
						type: 2,
						skin: 'my_skin', //样式类名
						title: ["审核结果",'background-color:#a7c0d9;'],
						closeBtn: 1, //不显示关闭按钮
						area: ['900px', '600px'],
						content: [data.DATA+'?frm=1', 'no'], //iframe的url，no代表不显示滚动条
						btn: ['返回修改'],
						btn1: function(){
							cData.NO=1;
							cData.Time=0;
							cData.Describe = "选择了返回修改";
							callback(cData);
							mData.piMid = '10001010';
							mData.piSsid = SSID;
							doMsgToSer(mData);
							layer.close(layerIndex);
						},
						cancel: function(){
							cData.NO=1;
							cData.Time=0;
							cData.Describe = "选择了返回修改";
							callback(cData);
							mData.piMid = '10001010';
							mData.piSsid = SSID;
							doMsgToSer(mData);
						}
					});
				}
				else if(data.ONLINE == 1)	//药师在线
				{
					layerIndex = layer.open({
						type: 2,
						skin: 'my_skin', //样式类名
						title: ["审核结果",'background-color:#a7c0d9;'],
						closeBtn: 1, //不显示关闭按钮
						area: ['900px', '600px'],
						content: [data.DATA+'?frm=1', 'no'], //iframe的url，no代表不显示滚动条
						btn: ['返回修改', '药师审核'],
						btn1: function(){
							cData.NO=1;
							cData.Time=0;
							cData.Describe = "选择了返回修改";
							callback(cData);
							mData.piMid = '10001010';
							mData.piSsid = SSID;
							doMsgToSer(mData);
							layer.close(layerIndex);
						},
						btn2: function(){
							cData.NO=2;
							cData.Time=0;
							cData.Describe = "选择了提请审核";
							callback(cData);
							mData.piMid = '10001007';
							mData.piSsid = SSID;
							mData.piBehavior = 1;
							mData.piReason = false;
							//提请审核
							var mBAMsg =doMsgToSer(mData);
							console.log(mBAMsg)
							send_request(SSID,callback);
							layer.close(layerIndex);
							var tTimeOut=(mBAMsg.Time>=0)?mBAMsg.Time:30;
							layerIndex = layer.open({
								type: 2,
								skin: 'my_skin', //样式类名
								title: false,
								closeBtn: 0, //不显示关闭按钮
								time: tTimeOut*1000,
								area: ['600px', '200px'],
								content: [loading, 'no'], //iframe的url，no代表不显示滚动条
							});
						},
						cancel: function(){
							cData.NO=1;
							cData.Time=0;
							cData.Describe = "选择了返回修改";
							callback(cData);
							mData.piMid = '10001010';
							mData.piSsid = SSID;
							doMsgToSer(mData);
						}
					});
				}
				else		//签名执行
				{
					layerIndex = layer.open({
						type: 2,
						skin: 'my_skin', //样式类名
						title: ["审核结果",'background-color:#a7c0d9;'],
						closeBtn: 1, //不显示关闭按钮
						area: ['900px', '600px'],
						content: [data.DATA+'?frm=1', 'no'], //iframe的url，no代表不显示滚动条
						btn: ['返回修改', '签名执行'],
						btn1: function(){
							cData.NO=1;
							cData.Time=0;
							cData.Describe = "选择了返回修改";
							callback(cData);
							mData.piMid = '10001010';
							mData.piSsid = SSID;
							doMsgToSer(mData);
							layer.close(layerIndex);
						},
						btn2: function(){
							cData.NO=5;
							cData.Time=0;
							cData.Describe = "点击了忽略(签字)";
							callback(cData);
							mData.piMid = '10001007';
							mData.piSsid = SSID;
							mData.piBehavior = 4;
							doMsgToSer(mData);
							layer.close(layerIndex);
						},
						cancel: function(){
							cData.NO=1;
							cData.Time=0;
							cData.Describe = "选择了返回修改";
							callback(cData);
							mData.piMid = '10001010';
							mData.piSsid = SSID;
							doMsgToSer(mData);
						}
					});
				}

			}
			else
			{
				cData.NO=7;
				cData.Time=0;
				cData.Describe = "审核没有问题或设置了不提醒直接返回";
				callback(cData);
			}
			tmparr = data;
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
			console.log(errorThrown);
		}
	});
	return tmparr;
}

function doMsgToSer(serMsg)
{
	var serBack;
	$.ajax({
		type: "post",
		url: doMagUrl,
		dataType:'json',
		timeout:5000,
		async:serMsg.piReason,
		data:{serMsg:JSON.stringify(serMsg)},
		success: function (data) {
			serBack = data;
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
			console.log(errorThrown);
		}
	});
	return serBack;
}
function send_request(ssid,callback){
	var cData = new callBackData()
	var mData = new msgToSer()
	$.ajax({
		url:realtime+"?"+ssid,
		type:'post',
		data:'',
		dataType:'json',
		success:function(re){
			if(re=="fail"){
				send_request(ssid,callback);
			}
			console.log(re)
			if(re.NO==0 && re.Url)
			{
				layer.close(layerIndex);
				layerIndex = layer.open({
					type: 2,
					skin: 'my_skin', //样式类名
					title: false,
					closeBtn: 0, //不显示关闭按钮
					time: 1000,
					area: ['600px', '300px'],
					content: [re.Url, 'no'], //iframe的url，no代表不显示滚动条
				});
				cData.NO=6;
				cData.Time=0;
				cData.Describe = "药师审核中超时退出循环";
				callback(cData);
			}
			if(re.Step==3 && re.Url)
			{
				layer.close(layerIndex);
				layerIndex = layer.open({
					type: 2,
					skin: 'my_skin', //样式类名
					title: false,
					closeBtn: 0, //不显示关闭按钮
					time: 1000,
					area: ['600px', '300px'],
					content: [re.Url, 'no'], //iframe的url，no代表不显示滚动条
				});
				cData.NO=1;
				cData.Time=0;
				cData.Describe = "药师不同意只能返回修改";
				callback(cData);
			}
			else if(re.Step==1 && re.Url)		//双签
			{
				layer.close(layerIndex);
				layerIndex = layer.open({
					type: 2,
					skin: 'my_skin', //样式类名
					title: false,
					closeBtn: 0, //不显示关闭按钮
					area: ['900px', '600px'],
					content: [re.Url, 'no'], //iframe的url，no代表不显示滚动条
					btn: ['返回修改', '双签执行'],
					btn1: function(){
						cData.NO=1;
						cData.Time=0;
						cData.Describe = "选择了返回修改";
						callback(cData);
						mData.piMid = '10001010';
						mData.piSsid = SSID;
						doMsgToSer(mData);
						layer.close(layerIndex);
					},
					btn2: function(){
						cData.NO=3;
						cData.Time=0;
						cData.Describe = "选择了双签执行";
						callback(cData);
						mData.piMid = '10001007';
						mData.piSsid = SSID;
						mData.piBehavior = 2;
						mData.piReason = false;
						//双签执行
						var mBAMsg =doMsgToSer(mData);
						layer.close(layerIndex);
						send_request(SSID,callback);
						//load
						var tTimeOut=(mBAMsg.Time>=0)?mBAMsg.Time:30;
						layerIndex = layer.open({
							type: 2,
							skin: 'my_skin', //样式类名
							title: false,
							closeBtn: 0, //不显示关闭按钮
							time: tTimeOut*1000,
							area: ['600px', '200px'],
							content: [loading+"?2", 'no'], //iframe的url，no代表不显示滚动条
						});
					},
					cancel: function(){
						cData.NO=1;
						cData.Time=0;
						cData.Describe = "选择了返回修改";
						callback(cData);
						mData.piMid = '10001010';
						mData.piSsid = SSID;
						doMsgToSer(mData);
						layer.close(layerIndex);
					}
				});
			}
			else if(re.Step==2 && re.Url)		//强制提交
			{
				layer.close(layerIndex);
				layerIndex = layer.open({
					type: 2,
					skin: 'my_skin', //样式类名
					title: false,
					closeBtn: 0, //不显示关闭按钮
					area: ['900px', '600px'],
					content: [re.Url, 'no'], //iframe的url，no代表不显示滚动条
					btn: ['返回修改', '强制提交'],
					btn1: function(){
						cData.NO=1;
						cData.Time=0;
						cData.Describe = "选择了返回修改";
						callback(cData);
						mData.piMid = '10001010';
						mData.piSsid = SSID;
						doMsgToSer(mData);
						layer.close(layerIndex);
						layer.close(layerIndex);
					},
					btn2: function(){
						mData.piMid = '10001007';
						mData.piSsid = SSID;
						mData.piBehavior = 3;
						mData.piReason = false;
						//强制
						var mBAMsg =doMsgToSer(mData);
						layer.close(layerIndex);
						cData.NO=4;
						cData.Time=0;
						cData.Describe = "点击了强制提交";
						callback(cData);
					},
					cancel: function(){
						cData.NO=1;
						cData.Time=0;
						cData.Describe = "选择了返回修改";
						callback(cData);
						mData.piMid = '10001010';
						mData.piSsid = SSID;
						doMsgToSer(mData);
						layer.close(layerIndex);
					}
				});
			}
			else if(re.NO==3 && re.Url)		//只能返回修改
			{
				layer.close(layerIndex);
				layerIndex = layer.open({
					type: 2,
					skin: 'my_skin', //样式类名
					title: false,
					closeBtn: 0, //不显示关闭按钮
					area: ['900px', '600px'],
					content: [re.Url, 'no'], //iframe的url，no代表不显示滚动条
					btn: ['返回修改', ],
					btn1: function(){
						cData.NO=1;
						cData.Time=0;
						cData.Describe = "选择了返回修改";
						callback(cData);
						mData.piMid = '10001010';
						mData.piSsid = SSID;
						doMsgToSer(mData);
						layer.close(layerIndex);
					},
					cancel: function(){
						cData.NO=1;
						cData.Time=0;
						cData.Describe = "选择了返回修改";
						callback(cData);
						mData.piMid = '10001010';
						mData.piSsid = SSID;
						doMsgToSer(mData);
						layer.close(layerIndex);
					}
				});
			}
		},
		error:function(){
			layer.close(layerIndex);
			cData.NO=6;
			cData.Time=0;
			cData.Describe = "药师审核中超时退出循环";
			callback(cData);
			//send_request(ssid,callback);
		},
	});
}

//自定义回调函数
function callFunc_a(rData)
{
	console.log(rData)
	switch(rData.NO)
	{
		case 1://点击了返回修改，立刻返回
			break;
		case 2://点击了提请审核，退出循环，设置一个time时长的等待
			break;
		case 3://执行双签，退出循环，设置一个time时长的等待
			break;
		case 4://强制提交，退出循环，继续his原有逻辑
			break;
		case 5://忽略签字，退出循环，继续his原有逻辑
			break;
		case 6://审核中发生超时服务器给出退出指令，退出循环，继续his原有逻辑
			break;
		case 7://审核没有问题或设置了不提醒直接返回
			break;
	}

}

function medicalDrugNotice(drugCode) {
	NoticePath=urlHead+"/medicalData/apis/apiData_H.apl?model=ZYTS&key={dc}&show=2";
	NoticePath = NoticePath.replace('{dc}',drugCode);
	var request = $.ajax({
		url:NoticePath,
		type:'post',
		data:'',
		dataType:'html',
		success:function(response,status,xhr){
			var areas = ['600px', '380px'];
			var time = 300000000;
			if(response.indexOf('TimeDown')>1)
			{
				areas = ['600px', '300px'];
				time = 1000;
			}
			layerIndex = layer.open({
				type: 2,
				skin: 'my_skin', //样式类名
				title: false,
				closeBtn: 0, //不显示关闭按钮
				area: areas,
				content: [NoticePath, 'no'], //iframe的url，no代表不显示滚动条
				btn: ['关闭'],
				time:time,
				btn1: function(){
					layer.close(layerIndex);
				},
				cancel: function(){
					layer.close(layerIndex);
				}
			});
		},
		error:function(){
		},
	});
}
function initMedical()
{
	var mData = new msgToSer();
	mData.piMid = '20001003';
	$.ajax({
		type: "post",
		url: doMagUrl,
		dataType:'text',
		timeout:5000,
		data:{serMsg:JSON.stringify(mData)},
		success: function (data) {
			if(data.indexOf(',')!=-1)
			{
				deptData = data.split(',');
			}
			//deptData
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
			console.log(errorThrown);
		}
	});
}


/**
 * 向列表中插入一个药品信息
 * @param d
 * @param num
 * @param listType
 * @param obj
 */
function addDrug(d, num, listType, obj) {
	var tag = $("form#chuzhiForm_" + listType).children("table");
	var tr = $("<tr />").data('listType', listType).data("xmmc", d.drugName)
			.attr("id", "item_" + d.drugDictId + "_listType_" + listType)
			.appendTo(tag);
	$("<input type=\"hidden\" />").val(d.bumenId).attr("name", "excutiveDept").appendTo(tr);
	$("<input type=\"hidden\" />").val(d.id).attr("name", "id").appendTo(tr);
	$("<input type=\"hidden\" />").val(d.drugCode).attr("name", "drugCode").appendTo(tr);
	$("<td />").append("<a class='warn' />").appendTo(tr);
	$("<td />").append("<a class='detail' onclick='medicalDrugNotice(\""+d.drugCode + "\")'/>").appendTo(tr);
	//$("<td />").text(d.drugName).append("<a  style='margin-top:-22px;margin-left: 20px' class='book' onclick='lookMedical(\""+d.drugCode + "\")'/>").attr("name", "drugName").appendTo(tr);
	$("<td class='book_outer'/>").append("<a class='book' onclick='lookMedical(\""+d.drugCode + "\")'/>" + d.drugName).attr("name", "drugName").appendTo(tr);
	$("<td />").text(d.packageSpec).attr("name", "packageSpec").appendTo(tr);
	$("<td />").text(d.packageUnits).attr("name", "packageUnits").appendTo(tr);
	var td = $("<td />").appendTo(tr);
	var price = 0;
	if (d.price != null)
		price = (d.price * num).toFixed(2);
	$("<td />").text(price).appendTo(tr);
	var tdYf = $("<td />").appendTo(tr);
	var yldw = d.dosePerUnit;
	if(!yldw)
		yldw="";
	else
		yldw = "*"+yldw;
	yldw += d.dosageUnit.indexOf('滴眼液')!=-1?'滴':d.dosageUnit;
	var tdYl = $("<td />").text(yldw).attr("name", "dosageUnit").appendTo(tr);
	var yongliang="";
	if (obj != null){
		setCHUZHI_FORM(true,listType);
		yongliang = obj.yongliang;
	}
	else{
		/*if(d.drugName.indexOf('眼膏')!=-1||d.drugName.indexOf('眼用凝胶')!=-1){
			yongliang=0.1;
		}
		if(d.drugName.indexOf('眼液')!=-1||d.drugName.indexOf('眼药水')!=-1){
			yongliang=1;
		}*/
	}

	var input = $("<input />").data("val",yongliang).val(yongliang).blur(function(){
		if($(this).val()!=$(this).data("val")){
			setCHUZHI_FORM(false);
		}
	}).attr("name", "yongliang").width("50%").prependTo(tdYl);

	var tdPl = $("<td />").appendTo(tr);
	var s = $("<select />").attr("name", "yongfa").change(function(){
		setCHUZHI_FORM(false);
	}).appendTo(tdYf);
	if (obj == null || !obj.yongfa.length)
		$("<option />").appendTo(s);
	$.each(yfArray.obj, function(i, data) {
		var o = $("<option />").text(data.dosageText).appendTo(s);
		if (obj != null && obj.yongfa == data.dosageText)
			o.attr("selected", "selected");
	});

	s = $("<select />").change(function(){
		setCHUZHI_FORM(false);
	}).attr("name", "frequencys").appendTo(tdPl);
	if (obj == null || !obj.yongyaopinlv.length)
		$("<option />").appendTo(s);
	$.each(plArray.obj, function(i, data) {
		var o = $("<option />").text(data.frequencyText).appendTo(s);
		if (obj != null && obj.yongyaopinlv == data.frequencyText)
			o.attr("selected", "selected");
	});

	$("<input name=\"count\" />").data("price", d.price).data("val", num).val(
			num).blur(function() {
		var v = $(this).val();
		if (d.store < v) {
			$.oimsAlert("库存不足！");
			$(this).val($(this).data("val"));
		}
		setCHUZHI_FORM(false);
		var price = v * $(this).data("price");
		$(this).parent().next().text(price.toFixed(2));
	}).appendTo(td);
	var s = d.storeName;
	if(s=="便民药房"||s=="药品超市")s="便民药房";
//	if(d.drugCode.indexOf("YPCS")!=-1)storeName="便民药房";
	$("<td />").text(s).appendTo(tr);
	$("<td />").text(d.firmId).appendTo(tr);
	$("<td />").text(d.store).appendTo(tr);
	tr.children('td').not($('select').parent()).mouseover(function() {
		if (!tr.hasClass("a_showJCTS"))
			tr.children("td").addClass("on");
	}).mouseout(function() {
		if (!tr.hasClass("selected"))
			tr.children("td").removeClass("on");
	}).toggle(function() {
		tr.addClass("selected");
		showDrugInfo($(this), tag.parent());
	}, function() {
		tr.removeClass("selected");
		tr.removeClass("on");
		hideDrugInfo()
	});
	if(obj&&obj.jifeiFlag){
		tr.css('color','red');
		tr.data('jifei',1);
		tr.addClass("yijifei");
	}
}

/**
 * 显示药品说明书
 * @param tr
 * @param showTag
 */
function showDrugInfo(tr, showTag) {
	//TODO
}

/**
 * 关闭药品说明书
 */
function hideDrugInfo() {
	//TODO
}
/**
 * 处方表单验证
 * @param listType
 */
function chufangValidation(listType){
	var message;
	if(!count()[0]||!yongliang()[0]||!yongfa()[0]||!frequencys()[0]){
		$.oimsError(message);
		return false;
	}else{
	//	$("form.chuzhiForm:visible").submit();
		return true;
	}
	function count(){
		var isSubmit=true;
		$.each($("#chuzhiForm_"+CHUZHI_CATEGORY.prescribe+" input[name='count']"),function(i,d){
			if(!$.trim($(this).val())){
				isSubmit=false;
				message="数量不能为空";
				return false;
			}
			if(isNaN($(this).val())){
				isSubmit=false;
				message="数量不能为数字以外的数";
				return;
			}
			if(!isNaN($(this).val())&&$(this).val()<0){
				isSubmit=false;
				message="数量不能为负数";
				return;
			}
		});
		return [isSubmit,message];
	}
	function yongliang(){
		var isSubmit=true;
		$.each($("#chuzhiForm_"+CHUZHI_CATEGORY.prescribe+" input[name='yongliang']"),function(i,d){
			if(!$.trim($(this).val())){
				isSubmit=false;
				message="用量不能为空";
				return;
			}
			if(isNaN($(this).val())){
				isSubmit=false;
				message="用量不能为数字以外的数";
				return;
			}
			if(!isNaN($(this).val())&&$(this).val()<0){
				isSubmit=false;
				message="用量不能为负数";
				return;
			}
		});
		return [isSubmit,message];
	}
	function yongfa(){
		var isSubmit=true;
		$.each($("#chuzhiForm_"+CHUZHI_CATEGORY.prescribe+" select[name='yongfa']"),function(i,d){
			if(!$.trim($(this).val())){
				isSubmit=false;
				message="用法不能为空";
				return;
			}
		});
		return [isSubmit,message];
	}
	function frequencys(){
		var isSubmit=true;
		$.each($("#chuzhiForm_"+CHUZHI_CATEGORY.prescribe+" select[name='frequencys']"),function(i,d){
			if(!$.trim($(this).val())){
				isSubmit=false;
				message="频率不能为空";
				return;
			}
		});
		return [isSubmit,message];
	}
}
