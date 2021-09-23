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
var currentVisit;
var currentDoctor;
var paintMovie=null;
var photoShow = "见图示";
var debugFlag=false;
var notSave=false;
var currentPatient;
var DATA_TRANSMITTING=[];

$(function(){
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
		if(!validateBeforeDone()){
			return;
		};
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
	
	
});
function finishPrint(){
	//完成
	if(!validateBeforeDone()){
		return;
	}
	//打印
	if(currentVisit.state==oimsCategory.VISITING_STATE_YIWANCHENG){
		printEMRB5();
	}
	else{
		$.oimsConfirm({strTitle:"确认要完成并打印病例？"},function(){
			printEMRB5();
			var x = getJSONData(SET_PATIENT_STATE,{jiuzhenId:currentVisit.id,state:oimsCategory.VISITING_STATE_YIWANCHENG},'POST');
			if(!x.state){
				$.oimsAlert('更改当前患者状态操作失败！');
				return;
			}
			currentVisit.state=oimsCategory.VISITING_STATE_YIWANCHENG;
		});
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
	var data = getJSONData(EMR_PATIENT_INFO_URL,{jiuzhenId:jiuzhenId,binglihao:binglihao,huanzheId:huanzheId,sfzh:sfzh},"POST");
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
	$.extend(hzxx,{sex:sex,age:age,baoxian:baoxian,laiyuan:category.obj.category,birthday:birthday,regdate:regdate});
	
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
	$("#visitRecord span").text(list.length);
	$("#visitRecord").mouseover(function(){
		$(this).css("background","#ddd");
	}).mouseout(function(){
		$(this).css("background","#f3f3f3");
	}).click(function(){
		$("#vistListDiv").toggle();
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
	//debugger;
	$.each(list,function(i,d){
		var li = $("<li />");
		li.data('visit',d);
		$("<span />").addClass("emr_jiuzhenlistcheck").append("<input type=\"checkbox\" style=\"vertical-align: top;\">").appendTo(li);
		$("<p />").text(formatDate(d.caozuoTime.time)).appendTo(li);
		$("<p />").text("医生："+d.fzys).appendTo(li);
		li.children("p").click(function(){
			tag.find("li.on").removeClass("on");
			showMedicalRecord(d);
			li.addClass("on");
		});
		if(currentDoctor==d.fzys && formatDate(d.caozuoTime.time)==formatDate(new Date())){
			ul.children("li.on").removeClass("on");
			li.addClass("on").prependTo(ul);
			showMedicalRecord(d);
		}else{
			li.appendTo(ul);
			if(jiuzhenId==d.id||(jiuzhenId=='' && i==0)){
				li.addClass("on");
				showMedicalRecord(d);
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
	if(formatDate(visitDate)==formatDate(now) && visit.fzys==currentDoctor){
		showTabTitle();
		if($(".emrHistoryRecord").length){
			$("#tabTitle").css({"display":"block"});
			$(".emrHistoryRecord").remove();
		}
		$("#tabTitle").children("div").removeClass("tab_show");
		$("#tabTitle").children("div:eq(0)").addClass("tab_show");
		//----------------------- 开始 lxl 屈光用--------------
			eval(_emr_preview_qg(30008));
			getTabData(30008);
			$("#tabTitle").children("div:eq(4)").hide();
			$("#tabTitle").children("div:eq(6)").hide();
		//----------------------- 开始 lxl 屈光用--------------
		return;
	}
	if($(".emrHistoryRecord").length){
		$(".emrHistoryRecord").remove();
	}
	$("#tabTitle").css({"display":"none"});
	$(".medicalRecord:visible").css({"display":"none"});
	var div=makeRecordEMR(currentVisit.id);
	div.appendTo($('body')).height($(window).height()- $("#top").height()-$(".doctortitle").height());
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
		var div = $("<div />").appendTo(tag);
		$("<span />").text(d.category).appendTo(div);
		var className = i==0 ? "tab_show":"tab_hide";
		div.addClass(className).click(function(){
			if($(this).hasClass("tab_show"))return;
			var validateP=true;
			if(d.id!=CHUZHI_CATEGORY.prescribe){
				$.each(CHUZHI_ING,function(i,n){
					//新添加或者删除的是true
					if(n){
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
				//return;
			}
			if(notSave){
				$.oimsAlert("请先提交保存！");
				return;
			}
//			$.each(CHUZHI_FORM,function(i,n){
//				if(!n){
//					$("#chuzhiForm_"+).children("form").submit();
//				}
//			});
			hidePhotoPaint();
			tag.find(".tab_show").removeClass("tab_show").addClass("tab_hide");
			$(this).addClass("tab_show");
			eval('('+d.intr+'('+d.id+'))');
		});
		if(i==0){
			eval('('+d.intr+'('+d.id+'))');
		}
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
	var data = getJSONData(EMR_MEDICAL_RECORD_SAVE_OR_UPDATE_URL,mr,"POST");
	return data.state;
}

function showInputDiv(div,d,t){
	if(t==undefined || t==null)t="";
	div.text(t).blur(function(){
		$(this).css("background","#fff");
		var msg = $.trim($(this).html());
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
	$("<h1 />").text("模板-"+category).appendTo(tag1);
	var categoryDiv = $("<div />").addClass("templateCategory").height(58).appendTo(tag1);
	var div = $("<div />").addClass("templateList").height(tag1.height()-tag1.children("h1").outerHeight()-/*$("#indexInput").outerHeight()-*/categoryDiv.outerHeight()).appendTo(tag1);
	showCategory();
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
				
				tag.focus();
			}).text(text).appendTo(div);
		});
		$("span.templateChangeValue").mouseover(function(){
			var id = $(this).attr("id");
			var p = $(this).offset();
			$(".templateChangeValueSelect").children("."+id).css({left:p.left,top:p.top+$(this).outerHeight()}).show();
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
		var vs = ["T+3","T+2","T+1","T正常","T-1","T-2","T-3"];
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
		var vs = ["T+3","T+2","T+1","T正常","T-1","T-2","T-3"];
		for(var i=0;i<vs.length;i++){
			$("<a />").data("val",vs[i]).text(vs[i]).width(59).click(function(){
				tag.val($(this).data("val"));
				tag.focus();
			}).appendTo(div);
		}
	}
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
	$("<td />").text("眼压").addClass("tdTitle").appendTo(tr);
	var td = $("<td />").addClass("input").appendTo(tr);
	var div0 = $("<div />").height(22).css("float","left").width(td.width()/2-15).appendTo(td);
	var div1 = $("<div />").height(22).css("float","left").width(td.width()/2-15).appendTo(td);
	var od = $("<input style='height:22px;line-height:22px;text-align:right;border:0px;'/>").width("50%").attr("id","yanyaJianchaOD").data("val","").data("div",div0).addClass("yanyaInput").focusin(function(){
		$(this).css("background","#fefeed");
		tag1.text("");
		$(this).data('div').find('span').text('mmHg');
		$(this).parent().siblings().find('span').text('');
		$(this).parent().siblings().find('input').val('');
		showYanyaTemplate(tag1,od);
//		if($("#paintDiv").length)$("#paintDiv").remove()
		hidePhotoPaint();
	}).appendTo(div0);
	div0.append("<span style='text-align:left;height:22px;line-height:22px;font-size:15px;'>mmHg</span>");
	//div0.append("<span style='text-align:left;height:22px;line-height:22px;font-size:15px;'>mmHg</span>");
	//showZHICEYanya(div1,"OD");
	div1.append("<span style='text-align:left;height:22px;line-height:22px;font-size:15px;'>指测眼压</span>");
	 $("<input style='height:22px;line-height:22px;text-align:center;border:0px;'/>").width("60%").attr("id","zhiceOD").data("val","").data("div",div1).addClass("yanyaInput").focusin(function(){
		$(this).css("background","#fefeed");
		tag1.text("");
		$(this).data('div').find('span').text('指测眼压');
		$(this).parent().siblings().find('span').text('');
		$(this).parent().siblings().find('input').val('');
		showYanyaTemplate(tag1,$(this));
		
//		if($("#paintDiv").length)$("#paintDiv").remove()
		hidePhotoPaint();
	}).appendTo(div1);
	td = $("<td />").addClass("input").appendTo(tr);
	div0 = $("<div />").height(22).css("float","left").width(td.width()/2-15).appendTo(td);
	div1 = $("<div />").height(22).css("float","left").width(td.width()/2-15).appendTo(td);
	var os = $("<input style='height:22px;line-height:22px;text-align:right;border:0px;'/>").width("50%").attr("id","yanyaJianchaOS").data("val","").data("div",div0).addClass("yanyaInput").focusin(function(){
		$(this).css("background","#fefeed");
		tag1.text("");
		$(this).data('div').find('span').text('mmHg');
		$(this).parent().siblings().find('span').text('');
		$(this).parent().siblings().find('input').val('');
		showYanyaTemplate(tag1,os);
//		if($("#paintDiv").length)$("#paintDiv").remove()
		hidePhotoPaint();
	}).appendTo(div0);
	div0.append("<span style='text-align:left;height:22px;line-height:22px;font-size:15px;'>mmHg</span>");
	//div0.append("<span style='text-align:left;height:22px;line-height:22px;font-size:15px;'>mmHg</span>");
	//showZHICEYanya(div1,"OS");
	div1.append("<span style='text-align:left;height:22px;line-height:22px;font-size:15px;'>指测眼压</span>");
	 $("<input style='height:22px;line-height:22px;text-align:center;border:0px;'/>").width("60%").attr("id","zhiceOS").data("val","").data("div",div1).addClass("yanyaInput").focusin(function(){
		$(this).css("background","#fefeed");
		tag1.text("");
		$(this).data('div').find('span').text('指测眼压');
		$(this).parent().siblings().find('span').text('');
		$(this).parent().siblings().find('input').val('');
		showYanyaTemplate(tag1,$(this));
//		if($("#paintDiv").length)$("#paintDiv").remove()
		hidePhotoPaint();
	}).appendTo(div1);
	var result = getJSONData(GET_YANYA_BY_JIUZHENID_URL,{jiuzhenId:currentVisit.id},"POST");
	if(result.state){
		if(result.obj!=null){
			od.data("id",result.obj.id).data("val",result.obj.od).val(result.obj.od?(result.obj.od):"");
			if(result.obj.od){
				od.next().text('mmHg');
			}
			os.data("id",result.obj.id).data("val",result.obj.os).val(result.obj.os?(result.obj.os):"");
			if(result.obj.os){
				os.next().text('mmHg');
			}
			var beizhu = result.obj.beizhu.split(",");
			od.parent().next().children("input").val(beizhu[0]=='null'?'':beizhu[0]);
			os.parent().next().children("input").val(beizhu[1]=='null'?'':beizhu[1]);
		}
	}
	$("input.yanyaInput").blur(function(){
		if(!$(this).val())$(this).next().text('');
		if($(this).val()==$(this).data("val"))return;
		saveZKJCYanya();
		$(this).css("background","#fff");
	});
}

function saveZKJCYanya(){
	var id = $("input#yanyaJianchaOS").data("id");
	if(id==undefined)id=null;
	var obj ={
			OD:$.trim($("input#yanyaJianchaOD").val()),
			OS:$.trim($("input#yanyaJianchaOS").val()),
			beizhu:($("input#yanyaJianchaOD").parent().next().children("input").val()?$("input#yanyaJianchaOD").parent().next().children("input").val():'null')+","+($("input#yanyaJianchaOS").parent().next().children("input").val()?$("input#yanyaJianchaOS").parent().next().children("input").val():'null'),
			jiuzhenId:currentVisit.id,
			id:id,
			huanzheId:currentVisit.huanzheId
	}
	var re = getJSONData(SAVE_YANYA_URL,obj,"POST");
	if(!re.state)
		$.oimsAlert("眼压保存失败");
	else{
		$("input#yanyaJianchaOD").data("val",obj.OD).data("id",re.obj);
		$("input#yanyaJianchaOS").data("val",obj.OS).data("id",re.obj);
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
		input.val(title=='0'?'':title).css({width:$(ele).width()-$(ele).children("span.eyeTitle").outerWidth()-parseInt($(ele).children("span.eyeTitle").css("margin-right"))-20}).focusin(function(){
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
							showPaint(tag1,input);
						}else{
							hidePhotoPaint(tag1);
						}
					}).appendTo($("<td />").appendTo(tr));
				 showInputDiv(input,_d,"未见异常");
				 if(i==0 && _i==0){
						//showTemplate(d.categoryid,d.category,input,tag1);
						if(_d.intr!=null && _d.intr.length){
							showPaint(tag1,input);
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