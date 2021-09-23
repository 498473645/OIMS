var EMR_FIND_PATIENT_URL = "/huanZheXinXi/getHuanZheXinXiBySearch.htm";
var EMR_TAB_TITLE_URL = "/publish/emr/gettabs.htm";
var EMR_TAB_CATEGORY = "/publish/emr/getitemsbyparentid.htm";
var EMR_MEDICAL_RECORD_SAVE_OR_UPDATE_URL = "/publish/jzjl/saveMedicalRecord.htm";
var EMR_PATIENT_INFO_URL = "/publish/emr/showDoctorWorkstation.htm";
var CATEGORY_GET_URL="/publish/category/getCategoryById.htm";
var EMR_GET_MEDICAL_RECORD="/publish/emr/getMedicalRecord.htm";
var PAINT_SAVE_URL = '/publish/emr/savepaint.htm';
var GET_NEXT_PATIENT="/publish/jiuzhen/findNextPatient.htm";
var SET_PATIENT_STATE="/publish/jiuzhen/setPatientState.htm";
var SAVE_SUIFANG_URL="/publish/_emr/saveSuifang.htm";
var FIND_INPUT_TEMPLATE_CATEGORY_URL = "/publish/emr/findInquiryAndPhysicalCategory.htm";
var FIND_INPUT_TEMPLATE_URL = "/publish/emr/findInquiryAndPhsicalNode.htm";
var SAVE_YANYA_URL="/publish/yanya/saveYanYa.htm";
var _emr_patient_url='/publish/huanZheXinXi/updateHuanzhexinxi.htm';
var getDoctorNameUrl='/publish/emr/getDoctorNameUrl.htm';
var winWidth;
var winHeight;
var currentVisit;
var currentDoctor;
var paintMovie=null;
var photoShow = "见图示";
var debugFlag=false;
var notSave=false;
var currentPatient;
var DATA_TRANSMITTING=[];
var _emr_preview_click=false;
$(function(){
	language=setLanguage(language);
	resize();
	showPatientVisits();
	$("#buttons span.start").parent().click(function(){
		//下一位未接诊病人
		if(currentVisit.state!=oimsCategory.VISITING_STATE_YIWANCHENG){
			$.oimsConfirm({strTitle:"此患者未完成就诊，点确定将此患者置为过号状态，按取消继教填写病历!"},function(){
				var x = getJSONData(SET_PATIENT_STATE,{jiuzhenId:currentVisit.id,state:oimsCategory.VISITING_STATE_YIGUOHAO},'POST');
				if(!x.state){
					$.oimsAlert('更改当前患者状态操作失败！');
					return;
				}
				showNextPatient();
			});
		}
		else{
			showNextPatient();
		}
		
	});
	$("#buttons span.gh").parent().click(function(){
		//过号（复诊与未接诊的病人点）
		var x = getJSONData(SET_PATIENT_STATE,{jiuzhenId:currentVisit.id,state:oimsCategory.VISITING_STATE_YIGUOHAO},'POST');
		if(!x.state){
			$.oimsAlert('更改当前患者状态操作失败！');
			return;
		}
		showNextPatient();
	});
	$("#buttons span.diagnosis").parent().click(function(){
		//完成前验证
//		if(!validateBeforeDone()){
//			return;
//		};
		var x = getJSONData(SET_PATIENT_STATE,{jiuzhenId:currentVisit.id,state:oimsCategory.VISITING_STATE_YIWANCHENG},'POST');
		if(!x.state){
			$.oimsAlert('更改当前患者状态操作失败！');
		}
		else{
			currentVisit.state=oimsCategory.VISITING_STATE_YIWANCHENG;		
			$.oimsAlert('操作成功');
		}
			
	});
	$("#buttons span.print").parent().click(function(){
		finishPrint();
		}
	);
//	$("#buttons span.sumit").parent().click(function(){
//		parent.window.showHospitalEMRPage(currentPatient.binglihao);
//	});
//	
//	$("#menZhenBingLing").click(function(){
//		parent.window.showMenZhenBingPage(currentPatient.binglihao,currentPatient.xingming,currentPatient.sex,currentPatient.jtdz,currentPatient.shouji);
//	});
});

function finishPrint(){
	//完成
//	if(!validateBeforeDone()){
//		return;
//	}
	//打印
	if(currentVisit.state==oimsCategory.VISITING_STATE_YIWANCHENG){
		printEMRB5('BIG');
		setTimeout(function(){
			$('div.openbutton').find('a#printIll').click();
			$('div.openbutton').find('a#printClose').click();
		},1000);
	}
	else{
	//	$.oimsConfirm({strTitle:"确认要完成并打印病历？"},function(){
			printEMRB5('BIG');
			var x = getJSONData(SET_PATIENT_STATE,{jiuzhenId:currentVisit.id,state:oimsCategory.VISITING_STATE_YIWANCHENG},'POST');
			if(!x.state){
				$.oimsAlert('更改当前患者状态操作失败！');
				return;
			}
			currentVisit.state=oimsCategory.VISITING_STATE_YIWANCHENG;
			setTimeout(function(){
				$('div.openbutton').find('a#printIll').click();
				$('div.openbutton').find('a#printClose').click();
			},1000);
//		});
	}
	
	
}
function validateBeforeDone(){
	if($("#mobile input").length){
		if($("#mobile input").data('val')){
			return true;
		}
		$.oimsAlert("请输入手机号");
		return false;
	}
	return true;
}
function showNextPatient(){
	var re = getJSONData(GET_NEXT_PATIENT,{jiuzhenId:currentVisit.id,state:oimsCategory.VISITING_STATE_YIGUOHAO},'POST');
	if(re.state && re.obj!=null){
		
		location.href=contextPath+"/emr/emr.jsp?visiteId="+re.obj.id;
	}
	else{
		$.oimsAlert("当前患者已经是最后一位");
	}
}
/**
 * 重新定位
 */
function resize(){
	winWidth = $(window).width();
	winHeight = $(window).height();
	//console.log("winWidth:"+winWidth);
	if(winWidth<1024){
		winWidth = 1024;
		$("body").width(winWidth);
	}
	var contentHeight=$("#visitRecord").height()+$(window).height()-$("#top").outerHeight()-$("#title").outerHeight()-$("#visitRecord").outerHeight();
	$("#visitRecord").height(contentHeight);
	$("#visitRecordTitle").css("margin-top",(contentHeight-$("#visitRecordTitle").outerHeight())/2);
	$(".medicalRecord").height(contentHeight-$(".doctortitle").outerHeight()-2);
	$(".tabRight").height($(".medicalRecord").height()-$(".tabRight").outerHeight()+$(".tabRight").height());
}

/**
 * 入口
 * 显示患者就诊记录
 * @param visitId
 */
function showPatientVisits(){
	var data = getJSONData(EMR_PATIENT_INFO_URL,{fenzhenkaidan:fenzhenkaidan,jiuzhenId:jiuzhenId,binglihao:binglihao,huanzheId:huanzheId,sfzh:sfzh},"POST");
	currentPatient=data.obj.patient;
	if(!data.state){
		$.oimsAlert(data.message);
		return;
	}
	currentDoctor = data.gonghao;
	var hzxx = data.obj.patient;
	var sex = hzxx.xingbie?"男":"女";
	var age = getAge(hzxx.shengri.time);
	var baoxian = hzxx.yibao?"是":"否";
	var category = getJSONData(CATEGORY_GET_URL,{id:hzxx.laiyuan},"POST");
	var birthday = hzxx.shengri!=null?formatDate(hzxx.shengri.time):"";
	var regdate = hzxx.zcrq!=null? formatDate(hzxx.zcrq.time):"";
	$.extend(hzxx,{sex:sex,age:age,baoxian:baoxian,laiyuan:(category.obj?category.obj.category:1006),birthday:birthday,regdate:regdate});
	
	if(hzxx.photourl!=null && hzxx.photourl.length){
		$("#patientInfo img").attr("src",hzxx.photourl);
		$(".patientInformation img").attr("src",hzxx.photourl);
	}
	
	$("#patientInfo img").mouseover(function(){
		showPatient(hzxx);
		$(".patientInformation").show();
	}).mouseout(function(){
		$(".patientInformation").hide();
	});
	fillDataFactory($("#patientInfo span"),hzxx);
	if(!$("#mobile").text()){
		var input=$('<input />').appendTo($("#mobile")).blur(function(){
			var val=$.trim($(this).val());
			if(val){
				var value=$(this).data('val');
				if(val!=value){
				//保存
				getJSONData(_emr_patient_url,{id:currentPatient.id,shouji:val},'POST');
				$(this).data('val',val);
					return;
				}
			}
		});
	}
	showWorkStation(data.obj.visitList);
}

function showPatient(data){
	var div = $(".patientInformation");
	if(div.length){
		div.show();
		return;
	}
	div = $("<div />").css("top",$("#patientInfo").outerHeight()).addClass("patientInformation").appendTo("body");
	showWithHtmlTemplate("patient",data,div);
	div.show();
}

/**
 * 显示工作台
 * @param list
 */
function showWorkStation(list){
	var div = $("#vistListDiv");
	if(!div.length)showVisitList(list);
	$("#visitRecord #record span").text(list.length);
//	$("#visitRecord").mouseover(function(){
//		$(this).css("background","#ddd");
//	}).mouseout(function(){
//		$(this).css("background","#f3f3f3");
//	}).click(function(){
//		$("#vistListDiv").toggle();
//	});
	$("#visitRecord a").mouseover(function() {
		$(this).addClass("hiden_a1");
		$($(this).find("label")).addClass("hiden_a_libel1");
	}).mouseout(function() {
		$(this).removeClass("hiden_a1");
		$(this).find("label").removeClass("hiden_a_libel1");
	})
	$("#record").click(function(){
		$("#vistListDiv").toggle();
	});
	$("#hospitalRecord").click(function(){
//		parent.window.showHospitalEMRPage(currentPatient.binglihao);
		importJS("/emr/js/zhuYuanBingLi.js");
		showQYBL(currentPatient.binglihao);
	});
	$("#oldVisitRecord").click(function(){
	//	parent.window.showMenZhenBingPage(currentPatient.binglihao,currentPatient.xingming,currentPatient.sex,currentPatient.jtdz,currentPatient.shouji);
		importJS("/emr/js/menZhenBingLi.js");
		showMZBLP(currentPatient.binglihao,currentPatient.xingming,currentPatient.sex,currentPatient.jtdz,currentPatient.shouji);
	});
	var getZhuYuanPatient_url = "/publish/emr/getZhuYuanPatient.htm";
	$("#hospitalRecord span").text("?");
	$.ajax({
		url : contextPath + getZhuYuanPatient_url,
		data : {patientId:currentPatient.binglihao,tag : Math.random()},
		async : true,
		type : "POST",
		dataType : 'json',
		success : function(data) {
			if(data.state && data.obj!=null && data.obj.length>=1){
				$("#hospitalRecord span").text(data.obj.length);
			}else{
				$("#hospitalRecord span").text(0);
			}
		}
	});
	
	var jiwangbingli_url='/publish/emr/getJiWangMenZhenBingLi.htm';
	$("#oldVisitRecord span").text("?");
	$.ajax({
		url : contextPath + jiwangbingli_url,
		data : {patientId:currentPatient.binglihao,tag : Math.random()},
		async : true,
		type : "POST",
		dataType : 'json',
		success : function(data) {
			if(data.state && data.obj!=null && data.obj.length>=1){
				$("#oldVisitRecord span").text(data.obj.length);
			}else{
				$("#oldVisitRecord span").text(0);
			}
		}
	});
}
/**
 * 显示就诊记录清单
 */
function showVisitList(list){
	var div = $("<div />").attr("id","vistListDiv").height($("#visitRecord").height()).addClass("visitList").hide().insertBefore("#visitRecord");
	var compareDiv=$("<div class=\"contrast\" />").text("对比").appendTo(div);
	var up = $("<a class=\"up1\" />").appendTo(div);
	var tag = $("<div />").css("overflow","hidden").appendTo(div);
	var down = $("<a class=\"down1\" />").appendTo(div);
	tag.scroll().height(div.height()-div.children(".contrast").outerHeight()-div.children(".up1").outerHeight()-div.children(".down1").outerHeight());
	var ul = $("<ul />").appendTo(tag);
	$.each(list,function(i,d){
		var li = $("<li />");
		li.data('visit',d);
		var id=d.id;
		$("<span />").addClass("emr_jiuzhenlistcheck").append("<input type=\"checkbox\" style=\"vertical-align: top;\">").appendTo(li);
		$("<p />").text(formatDate(d.caozuoTime.time)).appendTo(li);
		//d.fzys查找姓名
		var doctor_name=getJSONData(getDoctorNameUrl,{gonghao:d.fzys},'POST').obj;
		$("<p />").text("医生："+doctor_name).appendTo(li);
		li.children("p").click(function(){
			tag.find("li.on").removeClass("on");
			showMedicalRecord($(this).parent().data('visit'));
			$(this).parent().addClass("on");
		});
		if(fucha){
				if(jiuzhenId==d.id){
					ul.children("li.on").removeClass("on");
					li.addClass("on").prependTo(ul);
					showMedicalRecord(d);
				}
				else{
					li.appendTo(ul);
					}
		}
		else{
			if(/*currentDoctor==d.fzys && formatDate(d.caozuoTime.time)==formatDate(new Date())*/jiuzhenId==d.id){
				ul.children("li.on").removeClass("on");
				li.addClass("on").prependTo(ul);
				showMedicalRecord(d);
			}else if(jiuzhenId!=d.id&&parseInt(fenzhenkaidan)){
				if(i==0){
					ul.children("li.on").removeClass("on");
					li.addClass("on").prependTo(ul);
					showMedicalRecord(d);
				}
			}else{
				li.appendTo(ul);
//				if(jiuzhenId==d.id||(jiuzhenId=='' && i==0)){
//					li.addClass("on");
//					showMedicalRecord(d);
//				}
			}
		}
	});
	div.mouseover(function(){
		div.show();
	}).mouseout(function(){
		div.hide();
	});
	up.click(function(){
		var st = tag.scrollTop();
		if(st>0){
			var lh = ul.children(":first").outerHeight();
			var h = st-(tag.height()-lh);
			if(h<0)h=0;
			tag.scrollTop(h);
		}
	});
	down.click(function(){
		var st = tag.scrollTop();
		var sh = tag[0].scrollHeight;
		if(sh<=tag.height())return;
		var lh = ul.children(":first").outerHeight();
		var h = st+(tag.height()-lh);
		if(h>sh)h=sh;
		tag.scrollTop(h);
	});
	compareDiv.unbind('click').bind('click',function(){
		_emr_recordCompare();
	})
}

/**
 * 显示病历
 */
function showMedicalRecord(visit){
	currentVisit=visit;
	var visitDate = new Date(visit.caozuoTime.time);
	var now = new Date();
	if(fucha){
		if((formatDate(visitDate)==formatDate(now))){
			$("div.btn").children().css({"display":"block"});
			if($("div.btn").find("a#printBingLi").length){
				$("div.btn").find("a#printBingLi").css({"display":"none"});
			}
			showTabTitle();
			if($(".emrHistoryRecord").length){
				$("#tabTitle").css({"display":"block"});
				$(".emrHistoryRecord").remove();
			}
			$("#tabTitle").children("div").removeClass("tab_show");
			$("#tabTitle").children("div:eq(0)").addClass("tab_show");
			if(hasRole()==9 || hasRole()==12 || hasRole()==1){//屈光门诊1、屈光门诊2、admin权限可以看到"屈光病历"页签
				$("#tabTitle").children("div:eq(5)").show();
				if(hasRole()==9){	//屈光门诊1权限隐藏"病历预览"
					$("#tabTitle").children("div:eq(0)").removeClass().addClass("tab_hide");
					$("#tabTitle").children("div:eq(5)").removeClass().addClass("tab_show");
					$("#tabTitle").children("div:eq(0)").hide();
					$("#tabTitle").children("div:eq(1)").hide();
					$("#tabTitle").children("div:eq(2)").hide();
					$("#tabTitle").children("div:eq(3)").hide();
					$("#tabTitle").children("div:eq(4)").hide();
				}
			}else{
				$("#tabTitle").children("div:eq(5)").hide();
			}
			if(hasRole()==10 || hasRole()==11 || hasRole()==1){//角膜塑形镜1、角膜塑形镜2、admin权限可以看到"角膜塑形镜"页签
				$("#tabTitle").children("div:eq(6)").show();
				if(hasRole()==10){//角膜塑形镜1权限隐藏"病历预览"
					$("#tabTitle").children("div:eq(4)").hide();
				}
			}else{
				$("#tabTitle").children("div:eq(6)").hide();
			}
			if(hasRole()==9){
				eval('(_emr_preview_qg(30008))');
			}else{
				getTabData(30001);
			}
			return;
		}
	}
	else{
		if(/*formatDate(visitDate)==formatDate(now)&& visit.fzys==currentDoctor*/visit.id==jiuzhenId){
			$("div.btn").children().css({"display":"block"});
			if($("div.btn").find("a#printBingLi").length){
				$("div.btn").find("a#printBingLi").css({"display":"none"});
			}
			showTabTitle();
			if($(".emrHistoryRecord").length){
				$("#tabTitle").css({"display":"block"});
				$(".emrHistoryRecord").remove();
			}
			$("#tabTitle").children("div").removeClass("tab_show");
			$("#tabTitle").children("div:eq(0)").addClass("tab_show");
			if(hasRole()==9 || hasRole()==12 || hasRole()==1){//屈光门诊1、屈光门诊2、admin权限可以看到"屈光病历"页签
				$("#tabTitle").children("div:eq(5)").show();
				if(hasRole()==9){	//屈光门诊1权限隐藏"病历预览"
					$("#tabTitle").children("div:eq(0)").removeClass().addClass("tab_hide");
					$("#tabTitle").children("div:eq(5)").removeClass().addClass("tab_show");
					$("#tabTitle").children("div:eq(0)").hide();
					$("#tabTitle").children("div:eq(1)").hide();
					$("#tabTitle").children("div:eq(2)").hide();
					$("#tabTitle").children("div:eq(3)").hide();
					$("#tabTitle").children("div:eq(4)").hide();
				}
			}else{
				$("#tabTitle").children("div:eq(5)").hide();
			}
			if(hasRole()==10 || hasRole()==11 || hasRole()==1){//角膜塑形镜1、角膜塑形镜2、admin权限可以看到"角膜塑形镜"页签
				$("#tabTitle").children("div:eq(6)").show();
				if(hasRole()==10){//角膜塑形镜1权限隐藏"病历预览"
					$("#tabTitle").children("div:eq(4)").hide();
				}
			}else{
				$("#tabTitle").children("div:eq(6)").hide();
			}
			if(hasRole()==9){
				eval('(_emr_preview_qg(30008))');
			}else{
				if(!parseInt(fenzhenkaidan))
				getTabData(30001);
			}
			return;
		}
	}

	if($(".emrHistoryRecord").length){
		$(".emrHistoryRecord").remove();
	}
	$("#tabTitle").css({"display":"none"});
	$(".medicalRecord:visible").css({"display":"none"});
//	$("#buttons").css({"display":"none"});
	$('div.btn').children().css({"display":"none"});
	if(!$('div.btn').find("a#printBingLi").length){
		$('div.btn').append($("<a id='printBingLi'/>").text("打印").append($("<span class='print'/>")));
	}else{
		$('div.btn').find("a#printBingLi").css({"display":"block"});
	}
	var div=makeRecordEMR(currentVisit.id);
	div.appendTo($('body')).height($(window).height()- $("#top").height()-$(".doctortitle").height());
	$("#printBingLi").unbind('click').click(function(){
		printEMRB5_JIWANG();
		function printEMRB5_JIWANG(){
			var EMR_PATIENT_INFO_URL = "/publish/emr/showDoctorWorkstation.htm";
			var CATEGORY_GET_URL = "/publish/category/getCategoryById.htm";
			var GETPRINTDATA_URL="/publish/emr/getprintdata.htm";
			var _emr_input_itemsUrl = '/publish/emr/getitemsbyparentid.htm';
			var specialTreat='/publish/jiuzhen/';
			var _emr_physical_categoryId = 30002;
			var win = showPrintWindow();
			var page = $("<div />").addClass("printPage").appendTo(win);
			var printData=getJSONData(GETPRINTDATA_URL,{visitId:currentVisit.id},'POST');
			var sex = currentPatient.xingbie?"男":"女";
			var age = getAge(currentPatient.shengri.time);
			var doctor_name=getJSONData(getDoctorNameUrl,{gonghao:currentVisit.fzys},'POST').obj;
			showWithHtmlTemplate("emr_print",{binglihao:currentPatient.binglihao,xingming:currentPatient.xingming,sex:currentPatient.sex,age:currentPatient.age,kdsj:formatDate(currentVisit.caozuoTime.time),kdys:doctor_name},page);
			showBarcode(currentPatient.binglihao,page.find(".barcodeDiv"));
			$('.printPage h1').css({'line-height':'50px'});
			var tag = page.find(".orderList");
			$.each(printData.records,function(){
				if(this.categoryId==30100){
					var div = $("<div />").appendTo(tag);
					$("<strong />").text("主诉：").appendTo(div);
					$("<p />").text(this.jilu).appendTo(div);
				}
				if(this.categoryId==30103){
					div = $("<div />").appendTo(tag);
					$("<strong />").text("即往史：").appendTo(div);
					$("<p />").text(this.jilu).appendTo(div);
				}
			});
			div = $("<div />").appendTo(tag);
			$("<strong />").text("专科检查：").appendTo(div);
			var p0 = $("<p />").appendTo(div);
			showZKJC(printData,p0);
			function showZKJC(printData,p0){
			var	vision=printData.vision;
			var iop=printData.iop;
			var zkjc='';
			if(vision){
				zkjc+=(vision.lr?('右眼裸眼视力:'+getShiLiDisplay(vision.lr)):'')+(vision.jr?('。右眼近视力:'+getShiLiDisplay(vision.jr)):'')+(vision.jzr?('。右眼矫正视力:'+getShiLiDisplay(vision.jzr)):'')+(vision.redtrs?('。右眼ETDRs：'+vision.redtrs):'')+'。';
				zkjc+=(vision.ll?('左眼裸眼视力:'+getShiLiDisplay(vision.ll)):'')+(vision.jl?('。左眼近视力:'+getShiLiDisplay(vision.jl)):'')+(vision.jzl?('。左眼矫正视力:'+getShiLiDisplay(vision.jzl)):'')+(vision.ledtrs?('。左眼ETDRs：'+vision.ledtrs):'')+'。';
			}
			if(iop){
				zkjc+= '右眼眼压:'+(iop.od?(iop.od+"mmHg"):(iop.beizhu.split(',')[0]?iop.beizhu.split(',')[0]:''))+'。';
				zkjc+= '左眼眼压:'+(iop.os?(iop.os+"mmHg"):(iop.beizhu.split(',')[1]?iop.beizhu.split(',')[1]:''))+'。';
			}
			
			var records=printData.records;
			var physicalitems = getJSONData(_emr_input_itemsUrl,{categoryId:_emr_physical_categoryId,tag:Math.random()},'POST');
			$.each(physicalitems,function(i){
				var item = this.child;
				var rStr = findPhysicalResult(item[0].categoryid,records);
				var lStr = findPhysicalResult(item[1].categoryid,records);
				if(rStr){
					zkjc += '右眼'+this.category+'：'+$('<p />').html(rStr).text()+';';
				}
				if(lStr){
					zkjc += '左眼'+this.category+'：'+$('<p />').html(lStr).text()+';';
				}
			});
			p0.text(zkjc);
			}
			div = $("<div />").appendTo(tag);
			$("<strong />").text("诊断：").appendTo(div);
			p0=$("<p />").appendTo(div);
			showZHENDUAN(printData,p0);
			function showZHENDUAN(printData,p0){
				var zd='';
				var zhenduan=printData.diagnosis;
				$.each(zhenduan,function(){
					zd+=this.eye+this.zdflname+(parseInt(this.confirmed)==0?'?':'')+";";
				});
				p0.text(zd);
			}
			div = $("<div />").appendTo(tag);
			$("<strong />").text("处置：").appendTo(div);
			p0 = $("<p />").appendTo(div);
			showCHUZHI(printData,p0);
			function showCHUZHI(printData,p0){
				var chuzhi='';
				var lis=printData.inspect.lis;
				var hospital=printData.inspect.hospital;
				var treat=printData.inspect.treat;
				var prescription=printData.prescription;
				var special_items=printData.inspect.special;
				var specialTreat=printData.specialTreat;
				var st='';
				switch(parseInt(specialTreat)){
				case 1:st='建议住院治疗';break;
				case 2:st='预约日间手术';break;
				case 3:st='预约门诊手术';break;
				}
				var special='';
				$.each(special_items,function(i,n){
					special+=this.inspectName;
					if(i!=special_items.length-1){
						special+=";";
					}
				});
				var sf=printData.sf;
				chuzhi+=(lis?(lis+";"):'')+(hospital?(hospital+";"):'')+(special?(special+";"):'')+(prescription?(prescription+";"):'')+(treat?(treat+";"):'')+(st?(st+";"):'')+(sf?((sf.yyrq?('复诊时间:'+formatDate(sf.yyrq.time)+';'):'')+(sf.zhuyi?sf.zhuyi:'')):'');
				p0.text(chuzhi);
			}
			function findPhysicalResult(categoryid,records){
				for(var i=0;i<records.length;i++){
					if(categoryid==records[i].categoryId){
						return records[i].jilu;
					}
				}
				return '';
			}
		}
	});
}

function fillDataFactory(eles,obj){
	$.each(obj,function(k,v){
		$.each(eles,function(i,d){
			var txt = $(d).text();
			if(txt.indexOf("{"+k+"}")!=-1){
				if(v.length>11){
					v=v.substring(0,11)+"...";
				}
				txt = txt.replace("{"+k+"}",v);
				$(d).text(txt).show();
			}
		});
	});
}

function showTabTitle(){
	var tag = $("#tabTitle");
	if(tag.children().length)return;
	var data = getJSONData(EMR_TAB_TITLE_URL,null,"POST");
	$.each(data,function(i,d){
		if(parseInt(fenzhenkaidan)&&d.id!=oimsCategory.CHUZHI){
			return true;
		}
		var div = $("<div />").appendTo(tag);
		$("<span />").text(d.category).appendTo(div);
		var className = i==0 ? "tab_show":"tab_hide";
	
		div.addClass(className).click(function(){
			if($(this).hasClass("tab_show"))return;
			var validateP=true;
			if(d.id!=oimsCategory.CHUZHI){
//				$.each(CHUZHI_ING,function(i,n){
//					//新添加或者删除的是true
//					if(n){
//						if(i=='eyeExam'){
//							CHUZHI_SAVE_NO_MSG.eyeExam=true;
//							$('#chuzhiForm_'+CHUZHI_CATEGORY.eyeExam).submit();
//						}
//						if(i=='otherExam'){
//							CHUZHI_SAVE_NO_MSG.otherExam=true;
//							$('#chuzhiForm_'+CHUZHI_CATEGORY.otherExam).submit();
//						}
//						if(i=='labTest'){
//							CHUZHI_SAVE_NO_MSG.labTest=true;
//							$('#chuzhiForm_'+CHUZHI_CATEGORY.labTest).submit();
//						}
//						if(i=='prescribe'){
//							CHUZHI_SAVE_NO_MSG.prescribe=true;
//							if(!chufangValidation(CHUZHI_CATEGORY.prescribe)){
//								validateP=false;
//								return false;
//							}
//							$('#chuzhiForm_'+CHUZHI_CATEGORY.prescribe).submit();
//						}
//						if(i=='treat'){
//							CHUZHI_SAVE_NO_MSG.treat=true;
//							$('#chuzhiForm_'+CHUZHI_CATEGORY.treat).submit();
//						}
//					}
//				});
				$.each(CHUZHI_FORM,function(i,n){
					//新添加或者删除的是true
					if(!n){
						if(i=='eyeExam'){
							CHUZHI_SAVE_NO_MSG.eyeExam=true;
							$('#chuzhiForm_'+CHUZHI_CATEGORY.eyeExam).submit();
						}
						if(i=='otherExam'){
							CHUZHI_SAVE_NO_MSG.otherExam=true;
							$('#chuzhiForm_'+CHUZHI_CATEGORY.otherExam).submit();
						}
						if(i=='labTest'){
							CHUZHI_SAVE_NO_MSG.labTest=true;
							$('#chuzhiForm_'+CHUZHI_CATEGORY.labTest).submit();
						}
						if(i=='prescribe'){
							CHUZHI_SAVE_NO_MSG.prescribe=true;
							if(!chufangValidation(CHUZHI_CATEGORY.prescribe)){
								validateP=false;
								return false;
							}
							$('#chuzhiForm_'+CHUZHI_CATEGORY.prescribe).submit();
						}
						if(i=='treat'){
							CHUZHI_SAVE_NO_MSG.treat=true;
							$('#chuzhiForm_'+CHUZHI_CATEGORY.treat).submit();
						}
					}
				});
			}
			if(!validateP){
				return false;
			}
			if(DIAGNOSIS_ING){
				DIAGNOSIS_SAVE_NO_MSG=true;
				$("#patientDiseaseDiv").children("form").submit();
			}
			if(notSave){
				$.oimsAlert("请先提交保存！");
				return;
			}
			
			hidePhotoPaint();
			tag.find(".tab_show").removeClass("tab_show").addClass("tab_hide");
			$(this).addClass("tab_show");
			if(d.id==oimsCategory.DOCTOR_NANAGER_EMR_PREVIEW){
				var needSave=false;
				$.each(CHUZHI_FORM,function(i,n){
					if(!n){
						needSave=true;
						return false;
					}
				});
				if(needSave){
					_emr_preview_click=true;
				}else{
					eval('('+d.intr+'('+d.id+'))');
				}
			}else{
				eval('('+d.intr+'('+d.id+'))');
			}
		});
		if(parseInt(fenzhenkaidan)){
			if(d.id==oimsCategory.CHUZHI)
			eval('('+d.intr+'('+oimsCategory.CHUZHI+'))');
		}else{
			if(i==0){
				eval('('+d.intr+'('+d.id+'))');
			}
		}
		
	});
	var div1 = $("<div class='tab_hide'/>").appendTo(tag);
	var span=$("<span />").text("检查结果").appendTo(div1);
	span.click(function(){
		importJS("/js/flashShow.js");
		studyView(currentPatient.id);
	});
}

function getTabData(id){
	$(".medicalRecord").hide();
	var tag = $("#medicalRecordTab"+id);
	if(tag.length){
		tag.show();
		return null;
	}
	tag = $("<div />").attr("id","medicalRecordTab"+id).addClass("medicalRecord").appendTo("body");
	var h = $("#visitRecord").height()-$("#tabTitle").outerHeight()-tag.outerHeight()-4;
	tag.height(h);
	var tag1 = $("<div />").addClass("tabRight").appendTo(tag);
	var tag2 = $("<div />").addClass("tabContent").appendTo(tag);
	tag1.height(tag.innerHeight()-tag1.outerHeight());
	tag2.height(tag.innerHeight()-tag2.outerHeight())
	return {tag1:tag1,tag2:tag2, data: getJSONData(EMR_TAB_CATEGORY,{categoryId:id},"POST")};
}

/**
 * 保存记录
 * @param id
 * @param categoryId
 * @param jiuzhenId
 * @param msg
 * @returns
 */
function saveOrUpdateMedicalRecord(mr){
	//if(debugFlag)//console.log(mr);
	if(mr.categoryId==oimsCategory.WENZHENMOBAN_ZHUSHU){
		mr.jilu=mr.jilu.replace(/\s+/g,"");
	}
	var data = getJSONData(EMR_MEDICAL_RECORD_SAVE_OR_UPDATE_URL,mr,"POST");
	return data.state;
}

function showInputDiv(div,d,t){
	if(t==undefined || t==null)t="";
	div.text(t).blur(function(){
		$(this).css("background","#fff");
		var msg = $.trim($(this).text());
		if(htmIsEmpty(msg))msg="";
		var oldJilu = div.data("jilu");

		if((oldJilu==undefined && msg.length) ||(oldJilu!=undefined && msg != oldJilu)){
			var picPath = div.data("picPath");
			if(saveOrUpdateMedicalRecord({categoryId:d.categoryid,jiuzhenId:currentVisit.id,jilu:msg,picPath:((picPath==undefined)?null:picPath)})){
				if(oldJilu!=undefined && picPath!=undefined && (!msg.length || (oldJilu.indexOf(photoShow)!=-1 && msg.indexOf(photoShow)==-1))){
					div.removeData("picPath");
					if(paintMovie!=null)paintMovie.loadImg(null);
				}
				div.data("jilu",msg);
			}else{
				$.oimsError("保存失败！");
			}
		}
		
		if(!msg.length){
			div.text(t);
		}
		
	}).focusin(function(){
		if($.trim($(this).text())==t)$(this).text("");
	});
	DATA_TRANSMITTING.push("GET_MR_RECORD_"+d.categoryid);
	$.ajax({
		url : contextPath + EMR_GET_MEDICAL_RECORD,
		data : {categoryId:d.categoryid,jiuzhenId:currentVisit.id},
		type : "POST",
		async:false,
		dataType : 'json',
		success : function(data) {
			if(data.state&& data.obj!=null){
				div.html(data.obj.jilu).data("jilu",data.obj.jilu);
				if(data.obj.picPath!=null && data.obj.picPath.length){
					div.data("picPath",data.obj.picPath+"?tag="+Math.random());
				}
			}
			div.attr("contenteditable","true").attr("hidefocus","true");
			delObjectInArray(DATA_TRANSMITTING,"GET_MR_RECORD_"+d.categoryid);
		}
	});
}
/**
 * 
 * @param id 填充div对应的categoryid
 * @param category categoryid对应的中文
 * @param tag 填充div
 * @param tag1	模板div
 */
function showTemplate(id,category,tag,tag1){
	var a=$('<a id="paintPic" style="position:absolute;display:block;font-size:15px;font-weight:bold;" />').appendTo(tag1);
	a.text("画图");
	var h1=$("<h1 />").text("模板-"+category).appendTo(tag1);
	a.css({'margin-left':tag1.width()-a.width(),'line-height':h1.height()+'px'});
	var categoryDiv = $("<div />").addClass("templateCategory").appendTo(tag1);
	var div = $("<div />").addClass("templateList").appendTo(tag1);
	showCategory();
	if(categoryDiv.height()>112)categoryDiv.height(112);
	div.height(tag1.height()-tag1.children("h1").outerHeight()-categoryDiv.outerHeight());
	function showList(fid){
		var val = $.trim($("#indexInput").val());
		if(val=="请输入检索"){
			val="";
		}
		var sd = $(".templateChangeValueSelect");
		if(!sd.length)$("<div />").addClass("templateChangeValueSelect").appendTo("body");
		var result = getJSONData(FIND_INPUT_TEMPLATE_URL,{fatherId:fid,search:val},"POST");
		$.each(result.obj,function(i,d){
			var html = d.shuru;
			var text = d.shuru;
			var v = d.items;
			$.each(v,function(n,k){
				var sid = "templateChangeValue_"+d.id+"_"+n;
				html = html.replace("?","<span id=\""+sid+"\"  class=\"templateChangeValue\">"+k[0]+"</span>");
				text = text.replace("?",k[0]);
				var t = sd.children("."+sid);
				if(!t.length) t = $("<div />").addClass("showSelectTemplate").mouseover(function(){
					 $(this).show();
				 }).mouseout(function(){
					 $(this).hide();
				 }).addClass(sid).appendTo(sd);
				t.text("");
				$.each(k,function(x,y){
					$("<a />").text(y).click(function(){
						$("span#"+sid).text(y);
						$(this).parent().hide();
						$("span#"+sid).parent().focus();
					}).appendTo(t);
				})
			});
			$("<a />").click(function(){
				var pre = tag.find(".templateChangeValue");
				pre.replaceWith(pre.text());
				if(tag.html()=="未见异常"){
					tag.html(html);
				}
				else{
					tag.html($.trim(tag.html())==''?(html):(tag.html()+','+html));
				}
				
				tag.blur();
			}).text(text).appendTo(div);
		});
		$("span.templateChangeValue").mouseover(function(){
			var id = $(this).attr("id");
			var p = $(this).offset();
			var heigh=$(".templateChangeValueSelect").children("."+id).outerHeight();
			if((p.top+$(this).outerHeight()+heigh)<571){
				$(".templateChangeValueSelect").children("."+id).css({left:p.left,top:p.top+$(this).outerHeight()}).show();
			}
			else{
				$(".templateChangeValueSelect").children("."+id).css({left:p.left,top:p.top-heigh}).show();
			}
			
		});
	}
	function showCategory(){
		var result = getJSONData(FIND_INPUT_TEMPLATE_CATEGORY_URL,{id:id},"POST");
		$.each(result.obj,function(i,d){
			var a = $("<a />").click(function(){
				if($(this).hasClass("selected")){
					return;
				}
				categoryDiv.children(".selected").removeClass("selected");
				$(this).addClass("selected");
				//清空之前选项
				$(".templateList").empty();
				showList(d.id);
			}).text(d.text).appendTo(categoryDiv);
			if(i==0){
				a.addClass("selected");
				showList(d.id);
			}
		});
	}
}
/**
 * 问诊
 * @param id
 */
function _emr_inquiry(id){
	var tabData = getTabData(id);
	if(tabData==null)return;
	var tag1=tabData.tag1;
	var tag2=tabData.tag2;
	$.each(tabData.data,function(i,d){
		$("<h1 />").text(d.category).appendTo(tag2);
		showLog(d);
		var div = $("<div />").addClass("inputContent").attr("id",d.categoryid+"_"+currentVisit.id).focus(function(){
			$(this).css("background","#fefeed");
			tag1.text("");
			showTemplate(d.categoryid,d.category,$(this),tag1);
		}).appendTo(tag2);
		showInputDiv(div,d);
	});
}

function showShiLiTemplateForZKJC(tag1,showTag,valTag){
	var div = $("div.shiliOrYanyaTemplate");
	if(div.length){
		div.remove();
	}
	var p = tag1.offset();
	div=$("<div />").addClass("shiliOrYanyaTemplate").css({top:p.top,left:p.left}).width(tag1.width()).height(tag1.height()).appendTo(tag1);
	var h1 = $("<h1 />").text("视力输入").appendTo(div);
	var h = tag1.height()-h1.outerHeight();
	div = $("<div />").addClass("templateList").height(h).appendTo(div);
	showShiLiTemplate(div,showTag,valTag);
}

function showYanyaTemplate(tag1,tag){
	var div = $("div.shiliOrYanyaTemplate");
	if(div.length){
		div.remove();
	}
	var p = tag1.offset();
	var index=tag.parent().index();//0表示普通，1表示指测
	var tr=tag.parent().parent().parent();
	div=$("<div />").addClass("shiliOrYanyaTemplate").css({top:p.top,left:p.left}).width(tag1.width()).height(tag1.height()).appendTo(tag1);
	var h1 = $("<h1 />").text("眼压输入").appendTo(div);
	var h = tag1.height()-h1.outerHeight();
	div = $("<div />").addClass("templateList").height(h).appendTo(div);
	if(index==0){
		for(var  i=5; i<=35; i++){
			$("<a />").data("val",i).text(i).width(59).click(function(){
				tag.val($(this).data("val"));
				tag.focus();
			}).appendTo(div);
		}
		var vs = ["T+3","T+2","T+1","Tn","T-1","T-2","T-3"];
		for(var i=0;i<vs.length;i++){
			$("<a disabled />").data("val",vs[i]).text(vs[i]).width(59).click(function(){
				tag.val($(this).data("val"));
				tag.focus();
			}).appendTo(div);
		}
		
		
	}
	else if(index==1){
		for(var  i=5; i<=35; i++){
			$("<a disabled />").data("val",i).text(i).width(59).click(function(){
				tag.val($(this).data("val"));
				tag.focus();
			}).appendTo(div);
		}
		var vs = ["T+3","T+2","T+1","Tn","T-1","T-2","T-3"];
		for(var i=0;i<vs.length;i++){
			$("<a />").data("val",vs[i]).text(vs[i]).width(59).click(function(){
				tag.val($(this).data("val"));
				tag.focus();
			}).appendTo(div);
		}
	}
	var refuse='患者拒查';
	$('<a />').text(refuse).width(59).click(function(){
		refuseYanYa(tr,tag1);
		tr.children('td:eq(0)').children('input').val(1);
		saveZKJCYanya();
	}).appendTo(div);
}

function showZHICEYanya(tag,yb){
	var od = $("<input style='height:22px;line-height:22px;text-align:center;border:0px;'/>").width("50%").attr("id","yanyaJianchaOD").data("val","").addClass("yanyaInput").focusin(function(){
		$(this).css("background","#fefeed");
		tag1.text("");
		showYanyaTemplate(tag1,od);
	}).appendTo(div1);
	tag.append("<span style='text-align:left;height:22px;line-height:22px;font-size:15px;'>指测眼压</span>");
	var input = $("<input />").change(function(){
		saveZKJCYanya();
	}).width(57).attr("name","beizhi_"+yb).appendTo(tag);
//	$("<option />").appendTo(select);
//	var vs = ["T+3","T+2","T+1","偏高","正常","偏低","T-1","T-2","T-3"];
//	for(var i=0; i<vs.length; i++){
//		$("<option />").text(vs[i]).appendTo(select);
//	}
}
/**
 * 眼压检查插入
 * @param tag
 * @param tag1
 */
function showYanYaForZkjz(tag,tag1){
	var tr = $("<tr />").appendTo(tag);
	var tdM=$("<td />").text("眼压").addClass("tdTitle").appendTo(tr);
	tdM.append('<input type="hidden"  />');
	var td = $("<td />").addClass("input").appendTo(tr);
	var div0 = $("<div />").height(22).css("float","left").width(td.width()/2-15).appendTo(td);
	var div1 = $("<div />").height(22).css("float","left").width(td.width()/2-15).appendTo(td);
	var od = $("<input style='height:22px;line-height:22px;text-align:right;border:0px;'/>").width("20%").attr("id","yanyaJianchaOD").data("val","").data("div",div0).addClass("yanyaInput").focusin(function(){
		$(this).css("background","#fefeed");
		tag1.text("");
		$(this).data('div').find('span').text('mmHg');
		$(this).parent().siblings().find('span').text('');
		$(this).parent().siblings().find('input').val('');
		$(this).parent().find('select').css({'display':'block'});
		showYanyaTemplate(tag1,od);
//		if($("#paintDiv").length)$("#paintDiv").remove()
		hidePhotoPaint();
	}).appendTo(div0);
	div0.append("<span style='text-align:left;height:22px;line-height:22px;font-size:15px;'>mmHg</span>");
	div0.append("<select id='yanyaMethodOD' style='height:22px;width:40%'><option selected='selected' value=1>非接触</option><option value=2>回弹式</option><option value=3>修式</option><option value=4>Goldman</option></select>");
	div1.append("<span style='text-align:left;height:22px;line-height:22px;font-size:15px;'>指测眼压</span>");
	 $("<input style='height:22px;line-height:22px;text-align:left;border:0px;'/>").width(50).attr("id","zhiceOD").data("val","").data("div",div1).addClass("yanyaInput").focusin(function(){
		$(this).css("background","#fefeed");
		tag1.text("");
		$(this).data('div').find('span').text('指测眼压');
		$(this).parent().siblings().find('span').text('');
		$(this).parent().siblings().find('input').val('');
		$(this).parent().siblings().find('select').css({'display':'none'});
		showYanyaTemplate(tag1,$(this));
		hidePhotoPaint();
	}).appendTo(div1);
	td = $("<td />").addClass("input").appendTo(tr);
	div0 = $("<div />").height(22).css("float","left").width(td.width()/2-15).appendTo(td);
	div1 = $("<div />").height(22).css("float","left").width(td.width()/2-15).appendTo(td);
	var os = $("<input style='height:22px;line-height:22px;text-align:right;border:0px;'/>").width("20%").attr("id","yanyaJianchaOS").data("val","").data("div",div0).addClass("yanyaInput").focusin(function(){
		$(this).css("background","#fefeed");
		tag1.text("");
		$(this).data('div').find('span').text('mmHg');
		$(this).parent().siblings().find('span').text('');
		$(this).parent().siblings().find('input').val('');
		$(this).parent().find('select').css({'display':'block'});
		showYanyaTemplate(tag1,os);
//		if($("#paintDiv").length)$("#paintDiv").remove()
		hidePhotoPaint();
	}).appendTo(div0);
	div0.append("<span style='text-align:left;height:22px;line-height:22px;font-size:15px;'>mmHg</span>");
	div0.append("<select id='yanyaMethodOS' style='height:22px;width:40%'><option selected='selected' value=1>非接触</option><option value=2>回弹式</option><option value=3>修式</option><option value=4>Goldman</option></select>");
	div1.append("<span style='text-align:left;height:22px;line-height:22px;font-size:15px;'>指测眼压</span>");
	 $("<input style='height:22px;line-height:22px;text-align:left;border:0px;'/>").width(50).attr("id","zhiceOS").data("val","").data("div",div1).addClass("yanyaInput").focusin(function(){
		$(this).css("background","#fefeed");
		tag1.text("");
		$(this).data('div').find('span').text('指测眼压');
		$(this).parent().siblings().find('span').text('');
		$(this).parent().siblings().find('input').val('');
		$(this).parent().siblings().find('select').css({'display':'none'});
		showYanyaTemplate(tag1,$(this));
//		if($("#paintDiv").length)$("#paintDiv").remove()
		hidePhotoPaint();
	}).appendTo(div1);
	var result = getJSONData(GET_YANYA_BY_JIUZHENID_URL,{jiuzhenId:currentVisit.id},"POST");
	if(result.state){
		if(result.obj!=null){
			od.data("id",result.obj.id).data("val",result.obj.od).val(result.obj.od?(result.obj.od):"");
			od.parent().children('select').find('option[value='+result.obj.methodOD+']').attr('selected','selected');
			if(result.obj.od){
				od.next().text('mmHg');
			}
			os.data("id",result.obj.id).data("val",result.obj.os).val(result.obj.os?(result.obj.os):"");
			os.parent().children('select').find('option[value='+result.obj.methodOS+']').attr('selected','selected');
			if(result.obj.os){
				os.next().text('mmHg');
			}
			var beizhu = result.obj.beizhu.split(",");
			od.parent().next().children("input").val(beizhu[0]=='null'?'':beizhu[0]);
			os.parent().next().children("input").val(beizhu[1]=='null'?'':beizhu[1]);
			var refuse=result.obj.refuse;
			od.parent().parent().prev().children('input').val(refuse);
		}
	}
	$("input.yanyaInput").blur(function(){
		//if(!$(this).val())$(this).next().text('');
		$("input#yanyaJianchaOD").parent().parent().prev().children('input').val(0);
		if($(this).data('val')!=$(this).val())
		saveZKJCYanya();
		$(this).css("background","#fff");
	});
	$("select#yanyaMethodOD").change(function(){
		$("input#yanyaJianchaOD").parent().parent().prev().children('input').val(0),
		saveZKJCYanya();
	});
	$("select#yanyaMethodOS").change(function(){
		$("input#yanyaJianchaOD").parent().parent().prev().children('input').val(0),
		saveZKJCYanya();
	});
	
}

//当店患者拒查的时候清空所有眼压为初始值
function refuseYanYa(tr,tag1){
	var tdOD=$(tr).children('td:eq(1)');
	var tdOS=$(tr).children('td:eq(2)');
	var div0=tdOD.children('div:eq(0)').empty();
	var div1=tdOD.children('div:eq(1)').empty();
	var od = $("<input style='height:22px;line-height:22px;text-align:right;border:0px;'/>").width("20%").attr("id","yanyaJianchaOD").data("val","").data("div",div0).addClass("yanyaInput").focusin(function(){
		$(this).css("background","#fefeed");
		tag1.text("");
		$(this).data('div').find('span').text('mmHg');
		$(this).parent().siblings().find('span').text('');
		$(this).parent().siblings().find('input').val('');
		$(this).parent().find('select').css({'display':'block'});
		showYanyaTemplate(tag1,od);
		hidePhotoPaint();
	}).appendTo(div0);
	div0.append("<span style='text-align:left;height:22px;line-height:22px;font-size:15px;'>mmHg</span>");
	div0.append("<select id='yanyaMethodOD' style='height:22px;width:40%'><option selected='selected' value=1>非接触</option><option value=2>回弹式</option><option value=3>修式</option><option value=4>Goldman</option></select>");
	div1.append("<span style='text-align:left;height:22px;line-height:22px;font-size:15px;'>指测眼压</span>");
	 $("<input style='height:22px;line-height:22px;text-align:left;border:0px;'/>").width(50).attr("id","zhiceOD").data("val","").data("div",div1).addClass("yanyaInput").focusin(function(){
		$(this).css("background","#fefeed");
		tag1.text("");
		$(this).data('div').find('span').text('指测眼压');
		$(this).parent().siblings().find('span').text('');
		$(this).parent().siblings().find('input').val('');
		$(this).parent().siblings().find('select').css({'display':'none'});
		showYanyaTemplate(tag1,$(this));
		hidePhotoPaint();
	}).appendTo(div1);
	div0=tdOS.children('div:eq(0)').empty();
	div1=tdOS.children('div:eq(1)').empty();
	var os = $("<input style='height:22px;line-height:22px;text-align:right;border:0px;'/>").width("20%").attr("id","yanyaJianchaOS").data("val","").data("div",div0).addClass("yanyaInput").focusin(function(){
		$(this).css("background","#fefeed");
		tag1.text("");
		$(this).data('div').find('span').text('mmHg');
		$(this).parent().siblings().find('span').text('');
		$(this).parent().siblings().find('input').val('');
		$(this).parent().find('select').css({'display':'block'});
		showYanyaTemplate(tag1,os);
		hidePhotoPaint();
	}).appendTo(div0);
	div0.append("<span style='text-align:left;height:22px;line-height:22px;font-size:15px;'>mmHg</span>");
	div0.append("<select id='yanyaMethodOS' style='height:22px;width:40%'><option selected='selected' value=1>非接触</option><option value=2>回弹式</option><option value=3>修式</option><option value=4>Goldman</option></select>");
	div1.append("<span style='text-align:left;height:22px;line-height:22px;font-size:15px;'>指测眼压</span>");
	 $("<input style='height:22px;line-height:22px;text-align:left;border:0px;'/>").width(50).attr("id","zhiceOS").data("val","").data("div",div1).addClass("yanyaInput").focusin(function(){
		$(this).css("background","#fefeed");
		tag1.text("");
		$(this).data('div').find('span').text('指测眼压');
		$(this).parent().siblings().find('span').text('');
		$(this).parent().siblings().find('input').val('');
		$(this).parent().siblings().find('select').css({'display':'none'});
		showYanyaTemplate(tag1,$(this));
		hidePhotoPaint();
	}).appendTo(div1);
	 var result = getJSONData(GET_YANYA_BY_JIUZHENID_URL,{jiuzhenId:currentVisit.id},"POST");
		if(result.state){
			if(result.obj!=null){
				od.data("id",result.obj.id).data("val",0).val("");
				od.parent().children('select').find('option[value=1]').attr('selected','selected');
				os.data("id",result.obj.id).data("val",0).val("");
				os.parent().children('select').find('option[value=1]').attr('selected','selected');
			}
		}
	$("input.yanyaInput").blur(function(){
		if(!$(this).val())$(this).next().text('');
		$("input#yanyaJianchaOD").parent().parent().prev().children('input').val(0);
		if($(this).data('val')==$(this).val()){
			saveZKJCYanya();
		}
		$(this).css("background","#fff");
	});
	$("select#yanyaMethodOD").change(function(){
		$("input#yanyaJianchaOD").parent().parent().prev().children('input').val(0),
		saveZKJCYanya();
	});
	$("select#yanyaMethodOS").change(function(){
		$("input#yanyaJianchaOD").parent().parent().prev().children('input').val(0),
		saveZKJCYanya();
	});
}

function saveZKJCYanya(){
	var id = $("input#yanyaJianchaOS").data("id");
	if(id==undefined)id=null;
	var obj ={
			OD:$.trim($("input#yanyaJianchaOD").val()),
			OS:$.trim($("input#yanyaJianchaOS").val()),
			OD_METHOD:$('#yanyaMethodOD').val(),
			OS_METHOD:$('#yanyaMethodOS').val(),
			beizhu:($("input#yanyaJianchaOD").parent().next().children("input").val()?$("input#yanyaJianchaOD").parent().next().children("input").val():'null')+","+($("input#yanyaJianchaOS").parent().next().children("input").val()?$("input#yanyaJianchaOS").parent().next().children("input").val():'null'),
			refuse:$("input#yanyaJianchaOD").parent().parent().prev().children('input').val(),
			jiuzhenId:currentVisit.id,
			id:id,
			huanzheId:currentVisit.huanzheId
	}
	if(obj.OD&&isNaN(obj.OD)){
		$("input#yanyaJianchaOD").val($("input#yanyaJianchaOD").data("val"));
		$.oimsAlert("右眼压输入格式有误");
	}
	else if(obj.OS&&isNaN(obj.OS)){
		$("input#yanyaJianchaOS").val($("input#yanyaJianchaOS").data("val"));
		$.oimsAlert("左眼压输入格式有误");
	}
	else{
		var re = getJSONData(SAVE_YANYA_URL,obj,"POST");
		if(!re.state)
			$.oimsAlert("眼压保存失败");
		else{
			$("input#yanyaJianchaOD").data("val",obj.OD).data("id",re.obj);
			$("input#yanyaJianchaOS").data("val",obj.OS).data("id",re.obj);
			$("input#yanyaJianchaOD").parent().parent().prev().children('input').val(parseInt(obj.refuse));
		}
	}
}
/**
 * 视力检查插入
 * @param table
 */
function shiLiFormForZkjc(tag,tag1){
	showShiliByJiuzhenId(currentVisit.id,"shili0",tag);
	var form = tag.parent();
	$("<input name=\"jiuzhen_id\" type=\"hidden\"  />").val(currentVisit.id).appendTo(form);
	$("<input name=\"huanzhe_id\" type=\"hidden\"  />").val(currentVisit.huanzheId).appendTo(form);
	$.each($("td.input"),function(i,ele){
		var span = $(ele).children("span.canBeInput").removeClass("canBeInput");
		var title = span.text();
		var name = span.attr("class");
		var input = $("<input style='height:32px;line-height:32px;'/>").data("val",title).attr("name","_"+name).replaceAll(span);
		$("<input />").attr("name",name).val((name!='ledtrs'&&name!='redtrs')?getShiLiVal(title):title).attr("type","hidden").appendTo(form);
		input.val(title=='0'?'':title).css({width:$(ele).width()-$(ele).children("span.eyeTitle").outerWidth()*2-parseInt($(ele).children("span.eyeTitle").css("margin-right"))-20}).focusin(function(){
//			if($("#paintDiv").length)
//			$("#paintDiv").remove();
			hidePhotoPaint();
			var name = $(this).attr("name").substring(1);
			var input=form.children("input[name="+name+"]");
			if(name=='redtrs'||name=='ledtrs'){
				edtrsDivCreate(tag1,$(this),input);
				return;
			}
			showShiLiTemplateForZKJC(tag1,$(this),input);
		}).blur(function(){
			var name = $(this).attr("name");
			var val = $.trim($(this).val());
			var oldData = input.data("val");
			if(val==oldData)
				return;
			var v;
			if(name!='_redtrs'&&name!='_ledtrs')
				 v = getShiLiVal(val);
			else
				v=val;
			if(name!='_redtrs'&&name!='_ledtrs'){
				 if(val!="" && v==null){
					 $.oimsAlert("请输入标准视力数据，或是从右侧选择！");
				    	$(this).val("");
				    	return;
				 }
			}
			else{
				if(!isNaN(v)&&v>=0&&v<=100&&v.indexOf("\.")==-1){
    			}
    			else{
    			$.oimsAlert("请输入大于0小于100的整数！");
    			$(this).val("");
    			return;
    			}
			}
		    form.children("input[name="+name.substring(1)+"]").val(v);
			form.ajaxSubmit({
				dataType:"json",
				url:contextPath+SAVE_SHILI_URL,
				success:function(data){
					if(data.state)
						input.data("val",val);
			}});
		});
    });
}

/**
 * 显示ETDRs模板
 * @param tag1
 * @param showTag
 * @param valTag
 */
function edtrsDivCreate(tag1,showTag,valTag){
	$(".tabRight").empty();
	var p = tag1.offset();
	div=$("<div />").addClass("shiliOrYanyaTemplate").css({top:p.top,left:p.left}).width(tag1.width()).height(tag1.height()).appendTo(tag1);
	var h1 = $("<h1 />").text("ETDRs").appendTo(div);
	var h = tag1.height()-h1.outerHeight();
	div = $("<div />").addClass("templateList").height(h).appendTo(div);
	var table=$("<table cellspacing=0 style='margin:auto'>").append($("<tr/>").append($("<th style='background-color:#f3f3f3'/>").text("十位")).append($("<th style='background-color:#f3f3f3' />").text("个位")));
	div.append(table);
	for(var i=0; i<=9; i++){
		var tr=$("<tr/>").appendTo(table);
		$("<a />").data("val",i).css({"float":"none"}).text(i).width(59).click(function(){
			//十位判断
			if($.trim(showTag.val())==""){
				showTag.val($(this).data("val")*10);
			}else if(showTag.val()>=0&&showTag.val()<10){
				showTag.val(parseInt($(this).data("val")*10)+parseInt(showTag.val()));
			}else if(showTag.val()>=10&&showTag.val()<100){
				showTag.val(parseInt($(this).data("val")*10)+parseInt(showTag.val()%10));
			}
			showTag.focus();
		}).appendTo($("<td/>").appendTo(tr));
		$("<a />").data("val",i).css({"float":"none"}).text(i).width(59).click(function(){
			//个位判断
			if($.trim(showTag.val())==""){
				showTag.val($(this).data("val"));
			}else if(showTag.val()>=0&&showTag.val()<10){
				showTag.val($(this).data("val"));
			}else if(showTag.val()>=10&&showTag.val()<100){
				showTag.val(Math.floor(showTag.val()/10)*10+$(this).data("val"));
			}
			showTag.focus();
		}).appendTo($("<td/>").appendTo(tr));
	}
}

/**
 * 体格检查
 * @param id
 */
function _emr_physical(id){
	var tabData = getTabData(id);
	if(tabData==null)return;
	var tag1=tabData.tag1;
	var tag2=tabData.tag2;
	var form = $("<form />").attr("method","post").appendTo(tag2);
	var table = $("<table />").appendTo(form);
	$("<tr />").append($("<th />").width(80)).append($("<th />").text("右眼")).append($("<th />").text("左眼")).appendTo(table);
	shiLiFormForZkjc(table,tag1);
	showYanYaForZkjz(table,tag1);
	$.each(tabData.data,function(i,d){
		  var tr =  $("<tr />").appendTo(table);
		  $("<td />").addClass("tdTitle").text(d.category).appendTo(tr);
		  $.each(d.child,function(_i,_d){
				 var input = $("<div />").attr("id",_d.categoryid+"_"+currentVisit.id).focusin(function(){
						$(this).css("background","#fefeed");
						tag1.text("");
						showTemplate(d.categoryid,d.category,$(this),tag1);
						if(_d.intr!=null && _d.intr.length){
							var tip = (_i%2==0)?"OD":"OS";
							input.data("categoryId",_d.categoryid).data("categoryPhoto", _d.intr).data("tip",tip);
							//单击时显示图像
							tag1.find("#paintPic").toggle(function(){
								showPaint(tag1,input);
							},function(){
								hidePhotoPaint(tag1);
							});
						}else{
							hidePhotoPaint(tag1);
						}
					}).appendTo($("<td />").appendTo(tr));
				 showInputDiv(input,_d,"未见异常");
				 if(i==0 && _i==0){
						//showTemplate(d.categoryid,d.category,input,tag1);
						if(_d.intr!=null && _d.intr.length){
							$("#paintPic").click(function(){
								showPaint(tag1,input);
							},function(){
								hidePhotoPaint(tag1);
							});
						}else{
							hidePhotoPaint(tag1);
						}
				 }
		  });
	});
}

function saveMRCallback(data,swfId){//神奇的问题待解
	var msg ="(#)";
	msg = msg.replace("#",data);
	var d ;
	try{
		d=eval(msg);
	}catch(e){
		$.oimsAlert(e);
	}
	setData(d.obj);
}

function setData(obj){
	var idstr = "#"+obj.categoryid+"_"+obj.visitId;
	var path = obj.pictruePath;
	var old = $(idstr).data("picPath");
	//if(debugFlag) //console.log("Old pic Path:"+old);
	if(old!=undefined || old!=null)path += "?tag="+Math.random();
	$(idstr).data("picPath",path);
	//if(debugFlag) //console.log("newPath:"+$(idstr).data("picPath"));
	var val = $.trim($(idstr).text());
	//if(debugFlag) //console.log("value:"+val);
	var str = photoShow;
	if(val.indexOf(str)<0){
		if(val!="未见异常")
			str = $(idstr).html()+"&nbsp;"+str;
	//	if(debugFlag) //console.log("str:"+str);
		$(idstr).html(str).data("jilu",str);
	}
}

function showPaint(tag,input){
	var paintDiv = $("#paintDiv");
	var t = tag.children(".templateList");
	var p = t.offset();
	if(!paintDiv.length){
		paintDiv =$("<div />").attr("id","paintDiv").addClass("paintTag").show().appendTo("body");
	}else
		paintDiv.show();
	var rightHeight = tag.innerHeight()-tag.children("h1").outerHeight()-/*tag.children("input").outerHeight()-*/tag.children(".templateCategory").outerHeight();
	var h = rightHeight-paintDiv.outerHeight();
	t.height(h);
	var left=p.left;
	if(t.width()>paintDiv.outerWidth()) left=p.left+(t.width()-paintDiv.outerWidth())/2;
	paintDiv.css({top:p.top+t.outerHeight(), left:left});

	var loadImg = input.data("picPath");
	//if(debugFlag) //console.log("loadImg:"+loadImg);
	if(loadImg ==undefined || loadImg==null)loadImg=input.data("categoryPhoto");
	if(paintMovie==null){
		paintMovie = paintDiv.paint({
			param:{
				patientId:currentVisit.huanzheId,
				regId:currentVisit.id,
				categoryId:input.data("categoryId"),
				eyes:input.data("tip")
			},
			tip:input.data("tip"),
			paintSaveUrl:contextPath+PAINT_SAVE_URL,
			saveCallBack:saveMRCallback,
			normalPhoto:contextPath+input.data("categoryPhoto"),
			loadImg:contextPath + loadImg
		});
	}else{
		paintMovie.setTip(input.data("tip"));
		paintMovie.setParam({
			patientId:currentVisit.huanzheId,
				regId:currentVisit.id,
				categoryId:input.data("categoryId"),
				eyes:input.data("tip")
		});
		paintMovie.setNormalImg(contextPath + input.data("categoryPhoto"));
		paintMovie.loadImg(contextPath + loadImg);
	}
}

/**
 * 关闭画图
 * @param tag
 * @returns
 */
function hidePhotoPaint(tag){
	if(paintMovie==null)return;
	paintMovie.close();
	paintMovie=null;
	$("#paintDiv").remove();
}

/**
 * 确定本页面是否可以被切换
 * @param v
 * @returns
 */
function setMyPageState(v){
	notSave=v;
	//TODO
}

function _emr_suifang(id){
	$(".medicalRecord").hide();
	var tag = $("#medicalRecordTab"+id);
	if(tag.length){
		tag.show();
		return null;
	}
	tag = $("<div />").attr("id","medicalRecordTab"+id).addClass("medicalRecord").appendTo("body");
	var h = $("#visitRecord").height()-$("#tabTitle").outerHeight()-tag.outerHeight()-4;
	tag = $("<div />").addClass("tabContent").width(tag.width()/10*8).css({overflow:"auto","margin":"auto","border":"1px solid #d2d2d2"}).height(h).appendTo(tag);
	
	$("<h1 />").text("病史摘要").appendTo(tag);
	$("<div />").addClass("inputContent").attr("id","_bingshi").appendTo(tag);
	$("<h1/>").text("注意事项").appendTo(tag);
	$("<div  contenteditable=\"true\" hidefocus=\"true\" id=\"zysx_suifang\"  />").addClass("inputContent").appendTo(tag);
	$("<h1 />").text("随访时间").appendTo(tag);
	var div = $("<div />").addClass("inputContent").addClass("sunfang").appendTo(tag);
	var p= $("<p />").css({margin:"8px"}).appendTo(div);
	$("<input />").val(3).attr("type","radio").attr("name","time").appendTo(p);
	$("<span />").text("3个月后复查").appendTo(p);
	
	 p= $("<p />").css({margin:"8px"}).appendTo(div);
	$("<input />").val(6).attr("type","radio").attr("name","time").appendTo(p);
	$("<span />").text("6个月后复查").appendTo(p);
	 p= $("<p />").css({margin:"8px"}).appendTo(div);
	 $("<span />").text("其它指定时间：").appendTo(p);
	 $("<input />").val(0).attr("type","radio").attr("name","time").appendTo(p);
	 $("<input />").attr("name","date").width(88).appendTo(p);
	 $("<span />").text("(YYYY-MM-DD)").appendTo(p);
	div = $("<div/>").addClass("openbutton").appendTo(tag);
	$("<a><span class=\"advsumit\"></span>提交</a>").click(function(){
		var obj = {jiuzhenId:currentVisit.id,month:$("input[name=time]:checked").val(),yyrq:$("input[name=date]").val(),zysx:$("#zysx_suifang").html()};
		var d = getJSONData(SAVE_SUIFANG_URL,obj,"POST");
		if(d.state)$.oimsSucc('随访提交成功！');
	}).appendTo(div);
	$("<a><span class=\"reset\"></span>重填</a>").click(function(){
		$("input[name=time][selected=selected]").removeAttr("selected");
		$("input[name=date]").val("");
		$("#zysx_suifang").html("");
	}).appendTo(div);
		// TODD 病史摘要
	$("#tabTitle div:last").click(
			function() {
				var bingshi = "";
				//主诉
				var ykjc = "";
				ykjc = $("#30100_" + currentVisit.id).html() == '' ? ''
						: '主诉：' + $("#30100_" + currentVisit.id).html() + "; ";
				bingshi+="<div>"+ykjc+"</div>";
				//现病史
				ykjc = "";
				ykjc = $("#30102_" + currentVisit.id).html() == '' ? ''
						: '现病史：' + $("#30102_" + currentVisit.id).html()+ ";";
				bingshi+="<div>"+ykjc+"</div>";
				//视力
				ykjc = "";
				ykjc += !$("input[name='_rl']").val() ? '' : '右眼裸眼视力:'
						+ $("input[name='_rl']").val() + ";";
				ykjc += !$("input[name='_ll']").val() ? '' : '左眼裸眼视力:'
						+ $("input[name='_ll']").val() + ";";
				ykjc += !$("input[name='_rj']").val() ? '' : '右眼近视力:'
						+ $("input[name='_rj']").val() + ";";
				ykjc += !$("input[name='_lj']").val() ? '' : '左眼近视力:'
						+ $("input[name='_lj']").val() + ";";
				ykjc += !$("input[name='_rjz']").val() ? '' : '右眼矫正视力:'
						+ $("input[name='_rjz']").val() + ";";
				ykjc += !$("input[name='_ljz']").val() ? '' : '左眼矫正视力:'
						+ $("input[name='_ljz']").val() + ";";
				bingshi+="<div>"+ykjc+"</div>";
				//诊断
				ykjc = "";
				$.each($("#patientDiseaseDiv table tr:gt(0)"), function(i, data) {
					ykjc += $(data).children("td").eq(0).text() + ";";
				});
				bingshi += ykjc == '' ? '' : '<div>诊断名称：' + ykjc+"</div>";
				//处置
				ykjc = "";
				$.each($("#chuzhiForm_13 table tr:gt(0)"), function(i, data) {
					ykjc += $(data).children("td").eq(0).text() + ";";
				});
				bingshi += ykjc == '' ? '' : '<div>眼科检查项目：' + ykjc+"</div>";
				ykjc = "";
				$.each($("#chuzhiForm_4 table tr:gt(0)"), function(i, data) {
					ykjc += $(data).children("td").eq(0).text() + ";";
					
					
				});
				bingshi += ykjc == '' ? '' : '<div>处方：' + ykjc+"</div>";
				//治疗
				ykjc = "";
				$.each($("#chuzhiForm_5 table tr:gt(0)"), function(i, data) {
					ykjc += $(data).children("td").eq(0).text() + ";";
				});
				bingshi += ykjc == '' ? '' : '<div>治疗项目：' + ykjc+"</div>";
				$("#_bingshi").html("");
				$("#_bingshi").html(bingshi);
			});
	$("#tabTitle div:last").click();
}

function setLanguage(l) {
	if (l.yuyanListOnLoad != undefined)
		return l;
	var x = getJSONData("/publish/findLanaguage.htm", l, "POST");
	if (x.state) {
		l = x.obj;
	}
	return l;
}
//是否拥有屈光权限
function hasRole(){
	var ygdata = getJSONData("/publish/yuangong/findYuangongByGonghao.htm", {
		tag : Math.random()
	}, "post").obj;
	var user = getJSONData("/publish/user/findUserByGongHao.htm", {
		gonghao : ygdata.gonghao,
		tag : Math.random()
	}, "post").obj;
	var jiaose = user.jiaose;
	return jiaose;
}

