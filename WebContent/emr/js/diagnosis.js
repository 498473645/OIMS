var DISEASE_SEARCH_PINYIN_URL="/publish/jibing/findMyDiseases.htm";
var DIAGNOSIS_SAVE_OR_UPDATE_URL="/publish/emr/saveDiagnosis.htm";
var DIAGNOSIS_GET_LIST_URL = "/publish/emr/getExistsDiagnosis.htm";
var DIAGNOSIS_DELETE_URL="/publish/_emr/removeDiagnosis.htm";
var FIND_CATEGORYBYFATHERID_URL="/publish/category/findCategoryByFatherId.htm";
var SAVE_DIAGNOSIS_URL="/publish/jibing/addJiBing.htm";
var PatientDiagnosis=[];
var DIAGNOSIS_ING=false;//诊断中
var DIAGNOSIS_SAVE_NO_MSG;//保存并不提示

function _emr_diagnose(id){
	var tabData = getTabData(id);
	if(tabData==null)return;
	var tag1=tabData.tag1;
	var tag2=tabData.tag2;
	showDiagnosisLayout(tag1,tag2);
	showDiseOrg();
	showDiseaseList();
	showStudyList();
}

function showStudyList(){
	var studyType = $(".studyListTitle .tab .tab_show").data("examType");
	$(".studyListDiv").text("");
	if(studyType=='eyeExam'){
		showEyeStudyList(currentVisit.id,$(".studyListDiv"),$(".studyViewDiv"));
	}else if(studyType=='otherExam'){
		showOtherStudyList($(".studyListDiv"),$(".studyViewDiv"));
	}else if(studyType=='labTest'){
		showLabTestList($(".studyListDiv"),$(".studyViewDiv"));
	}
}
var diagnosisSearching = false;
function showDiagnosisLayout(tag1,tag2){
	var search = $("<div />").attr("id","searchDiseaseDiv").addClass("searchDiv").appendTo(tag2);
	var div = $("<div />").text("搜索：").appendTo(search).append($("<input />").width(200).attr("name","diseaseSearch").blur(function(){showDiseaseList($(this).val());}).keyup(function(e){
		var xkey=[0,16,17,20,37,38,39,40];
		if(diagnosisSearching||containArray(xkey,e.keyCode)){
			return true;
		}else{
			showDiseaseList($(this).val());
		}
	}));
	$("<input />").attr("type","button").val("查询").click(function(){
		showDiseaseList($("input[name=diseaseSearch]").val());
	}).appendTo(div);
	$("<span />").html("&nbsp;&nbsp;|&nbsp;&nbsp;").appendTo(div);
	//var btnDiv = $("<div />").css({float:"left"}).addClass("btn").appendTo(div);
	/*$("<input />").attr("type","button").val("添加诊断").click(function(){
		saveDiagnosis();
	}).appendTo(div);*/
	var h = tag2.innerHeight()-search.outerHeight();
	var diseDiv = $("<div />").attr("id","diseaseListDiv").addClass("diseaseList").height(h/5*3).appendTo(tag2);
	var btnDiv = $("<div />").text("诊断结果").addClass("btnDiv").appendTo(tag2);
	var pdd = $("<div />").attr("id","patientDiseaseDiv").addClass("patientDisease").height(h-diseDiv.outerHeight()-btnDiv.outerHeight()).appendTo(tag2);
	$("<div />").attr("id","studyViewTag").append("<h1>视力</h1>").height(tag1.innerHeight()-pdd.outerHeight()).appendTo(tag1);
	$("<div />").addClass("studyViewDiv").css({"overflow-y":"auto","height":"94%"}).appendTo($("#studyViewTag"));
	var studyListTag = $("<div />").attr("id","studyListTag").height(pdd.outerHeight()).appendTo(tag1);
	
	var tabTitle = $("<div />").addClass("tab").appendTo($("<div />").addClass("studyListTitle").appendTo(studyListTag));
	$("<div  />").addClass("tab_show").data("examType","eyeExam").append("<span id = 'studyListTitle_ykjc'>眼科检查</span>").appendTo(tabTitle);
	//全院检查开单数量
	var result = getJSONData(FIND_ORDER_URL, {
		visitId : currentVisit.id,
		categoryId : CHUZHI_CATEGORY.otherExam
	}, "POST");
	if(result.obj.length>0){
		$("<div />").addClass("tab_hide").data("examType","otherExam").append("<span id = 'studyListTitle_qyjc'>全院检查("+result.obj.length+")</span>").appendTo(tabTitle);
	}else{
		$("<div />").addClass("tab_hide").data("examType","otherExam").append("<span id = 'studyListTitle_qyjc'>全院检查</span>").appendTo(tabTitle);
	}
	//LIS开单数量
	result = getJSONData(FIND_ORDER_URL, {
		visitId : currentVisit.id,
		categoryId : CHUZHI_CATEGORY.labTest
		}, "POST");
		if(result.obj.length>0){
			$("<div />").addClass("tab_hide").data("examType","labTest").append("<span id = 'studyListTitle_jy'>检验("+result.obj.length+")</span>").appendTo(tabTitle);
		}else{
			$("<div />").addClass("tab_hide").data("examType","labTest").append("<span id = 'studyListTitle_jy'>检验</span>").appendTo(tabTitle);
		}
	$("<div />").addClass("studyListDiv").height(studyListTag.innerHeight()-tabTitle.outerHeight()).appendTo(studyListTag);
	var jwbg_span = $("<span />").addClass("tab_hide").append("<span id = 'studyListTitle_jwbg'>既往报告</span>").appendTo(tabTitle);
	jwbg_span.click(function(){
		var div = $("<div />").attr("id","baogao_result").oimsDialog({
			title : "查看院眼科报告",
			width : 900,
			icon : 'view',
			height : 500,
			drag : false,
			locked : true,
			winType : 4,
		});
//		$(".openWin").css({/*"overflow":"hidden",*/"height":($("#right").height()+50)});
//		parent.window.showHospitalReportPage(currentPatient.binglihao,$("#baogao_result"));
		importJS("/js/manager/baogao/jiWangBaoGao.js");
		showJWResultByBinglihao(currentPatient.binglihao,$("#baogao_result"));
	});
	$(".studyListTitle .tab").children("div").click(function(){
		if($(this).hasClass("tab_show"))
			return;
		$(this).parent().children(".tab_show").removeClass("tab_show").addClass("tab_hide");
		$(this).removeClass("tab_hide").addClass("tab_show");
		showStudyList();
	});
	
	var form = $("<form />").attr("action",contextPath+DIAGNOSIS_SAVE_OR_UPDATE_URL).attr("method","post").ajaxForm({
		dataType:"json",
		beforeSubmit:function(a,b,c){
			var diagnosisTrList = form.find("tr.diseaseTr");
			if(diagnosisTrList.length!=PatientDiagnosis.length){
				return true;
			}
			var re=false;
			$.each(diagnosisTrList,function(i,tr){
				tr = $(tr);
				var diseaseId = tr.find("input[name=diseaseId]").val();
				if(diseaseId!=PatientDiagnosis[i].zdflid){
					re=true;
					return false;
				}
				if(tr.find("select[name=eye]").val()!=PatientDiagnosis[i].eye){
					re=true;
					return false;
				}
				if(tr.find("select[name=eye]").val()!=PatientDiagnosis[i].eye){
					re=true;
					return false;
				}
				if(tr.find("select[name=state]").val()!=PatientDiagnosis[i].confirmed){
					re=true;
					return false;
				}
			});
			if(!re)DIAGNOSIS_ING=false;
			return re;
		},
		success:function(d){
			if(d.state){
				DIAGNOSIS_ING=false;
				if(!DIAGNOSIS_SAVE_NO_MSG)$.oimsSucc('诊断提交成功！');
			}else
				$.oimsError('诊断提交失败！');
		}
	}).appendTo(pdd)
	$("<input />").attr("type","hidden").attr("name","visitId").val(currentVisit.id).appendTo(form);
	//importJS('/emr/js/emr_print.js');
	//importJS('/emr/js/study.js');
	//$("<input />").attr("type","hidden").attr("name","zkjc").val(getZKJCText()).appendTo(form);
	$("<tr />").append("<th>病名</th><th style=\"width:120px\">眼别</th><th style=\"width:80px\">状态</th><th style=\"width:80px\"></th>").appendTo($("<table>").appendTo(form));
	var btn = $("<div />").addClass("btn").appendTo(btnDiv);
	$("<a />").append("<span class=\"advsumit\" /> 保存").click(function(){
		DIAGNOSIS_SAVE_NO_MSG=false;
		var selected =  $("#patientDiseaseDiv tr");
		if(selected.length==0){
			$.oimsAlert("请先下诊断再提交！");
			return;
		}
		form.submit();
	}).appendTo(btn);
	$("<a />").append("<span class=\"del\" /> 删除").click(function(){
		deletePatientDiagnosis();
	}).appendTo(btn);
	showPatientDiagnosis();
}

function deletePatientDiagnosis(){
	var seletedTr = $("#patientDiseaseDiv tr.selected");
	if(!seletedTr.length){
		$.oimsAlert('请选中需要删除的诊断！');
	}
	var ids=[];
	var v ='[';
	$.each(seletedTr,function(i,ele){
		var tr=$(ele);
		if(i>0)v+=',';
		var diseaseId=tr.children("input[name=diseaseId]").val();
		ids.push(diseaseId);
		v += '{diseaseId:'+diseaseId+',visitId:'+currentVisit.id+'}';
	});
	v+=']';
	if(deleteDiagnosis(v)){
		seletedTr.remove();
	}else{
		$.oimsAlert('诊断删除失败！');
	}
}

function deleteDiagnosis(array){
	var re = getJSONData(DIAGNOSIS_DELETE_URL,{diagnosis:array},"POST");
	if(!re.state)
		return false;
	var ids = eval('('+array+')');
	for(var i=0; i<ids.length; i++){
		$("#diseaseListDiv a.diseaseId_"+ids[i].diseaseId).removeClass("on");
	}
	return true;
}

/**
 * 显示患者现有诊断
 * @returns
 */
function showPatientDiagnosis(){
	PatientDiagnosis = getJSONData(DIAGNOSIS_GET_LIST_URL,{tag:Math.random(),visitId:currentVisit.id},"POST");
	var table = $("#patientDiseaseDiv table");
	$.each(PatientDiagnosis,function(i,d){
		addDiagnosis(table,d.zdflid,d.zdflname,d.eye,d.confirmed);
	});
}

/**
 * 插入一条诊断
 * @param table
 * @param diseaseId
 * @param disease
 * @param eye
 * @param state
 * @returns
 */
function addDiagnosis(table,diseaseId,disease,eye,state){
	var tr = $("<tr />").addClass("disease_"+diseaseId).addClass("diseaseTr").appendTo(table);
	$("<input />").attr("type","hidden").attr("name","diseaseId").val(diseaseId).appendTo(tr);
	$("<td />").append($("<span>").append(disease)).appendTo(tr);
	var eyeselect = $("<select />").attr("name","eye").change(function(){
		//checkDiagnosisForConfirm();
	}).appendTo($("<td />").appendTo(tr));
	var o=$("<option />").text("双眼").appendTo(eyeselect);
	if(eye=='双眼')o.attr("selected","selected");
	o = $("<option />")
	//.val(oimsCategory.RIGHT_EYE)
	.text("右眼").appendTo(eyeselect);
	if(eye=='右眼')o.attr("selected","selected");
	o = $("<option />")
	//.val(oimsCategory.LEFT_EYE)
	.text("左眼").appendTo(eyeselect);
	if(eye=='左眼')o.attr("selected","selected");
	o = $("<option />").text('').appendTo(eyeselect);
	if(!eye)o.attr("selected","selected");
	var qselect = $("<select />").attr("name","state").change(function(){
	//	checkDiagnosisForConfirm();
	}).appendTo($("<td />").appendTo(tr));
	o=$("<option />").val(1).text("初步诊断").appendTo(qselect);
	if(state == 1)o.attr("selected","selected");
	o = $("<option />").val(0).text("疑似?").appendTo(qselect);
	if(state == 0)o.attr("selected","selected");
	var tdud = $("<td />").appendTo(tr);
	$("<a/>").attr("href","#").attr("class","zxgup").text("上移").click(function(){
        var $tr = $(this).parents("tr");
        if ($tr.index() != 1) {
			$tr.fadeOut().fadeIn();
			$tr.prev().before($tr);		
        }	
	}).appendTo(tdud);
	$("<a/>").attr("href","#").attr("class","zxgdown").attr("style","margin-left:10px").text("下移").click(function(){
	    var len = $(".zxgdown").length;
        var $tr = $(this).parents("tr");
        if ($tr.index() != len) {
			$tr.fadeOut().fadeIn();
            $tr.next().after($tr);
        }	
	}).appendTo(tdud);
	tr.mouseover(function(){
		 tr.children("td").addClass("on");
	 }).mouseout(function(){
		 if(!tr.hasClass("selected")) tr.children("td").removeClass("on");
	 }).toggle(function(){
			 tr.addClass("selected");
		  },function(){
			 tr.removeClass("selected");
	 });
	DIAGNOSIS_ING=true;
}

/**
 * 显示诊断分类筛选的SELECT
 * @param i
 * @param categoryId
 *//*
function showDiseCategorySelect(i,categoryId){
	if(i==undefined)i=0;
	var tag = $("#searchDiseaseDiv");
	var searchInput = tag.find("input[name=search]");
	if(categoryId!=null ){
		if( !$("input[name=category]").length)
			$("<input />").attr("type","hidden").attr("name","category").val(categoryId).prependTo(tag);
		else
			$("input[name=category]").val(categoryId);
		showDiseaseList("",categoryId);
	}else{
		categoryId=oimsCategory.ILL_CATEGORY;
	}
	var result = getJSONData(FIND_CATEGORY_URL,{fatherid:categoryId},"POST");
	if(!result.state || !result.obj.length)return;
	var select = $("<select />").width(100).height(22).change(function(){
		var next;
		while((next=$(this).next("select")).length){
			next.remove();
		}
		i++;
		showDiseCategorySelect(i,$(this).val());
	}).addClass("diseaCategoryChoose").attr("id","diseaCategoryChoose_"+i);
		select.appendTo(tag);
	$("<option />").appendTo(select);
	$.each(result.obj,function(i,d){
		$("<option />").val(d.categoryid).text(d.category).appendTo(select);
	});
}*/
/**
 * 显示病名分类菜单
 * @param diseDiv
 */
function showDiseOrg(){
	var menuDiv = $("<div />").attr("id","menuTagDiv").data("id",oimsCategory.ILL_CATEGORY).text("疾病分类").prependTo("#searchDiseaseDiv");
	$(menuDiv).emrMenu({firstChildShowWay:"down",selectShowTag:$("#searchDiseaseDiv").children("div:last"),callback:function(id){
		showDiseaseList("",id);
	}});
}

/**
 * 显示病名清单
 */
function showDiseaseList(val,category){
	var diseDiv = $("#diseaseListDiv");
	var ul;
	var input = $("#searchDiseaseDiv input[name=diseaseSearch]");
	if(category==undefined)category = $("#searchDiseaseDiv").children("input[name=category]").val();
	val = $.trim(input.val());
	if(val==input.data("val") && category==undefined){
		//console.log("###############");
		return;
	}
	input.data("val",input.val());
	ul = diseDiv.children("ul.itemList");
	if(!ul.length){
		ul = $("<ul />").addClass("itemList").height(diseDiv.height()).appendTo(diseDiv);
	}else{
		ul.text("");
	}
	var ul_width=ul.width();
	diagnosisSearching=true;
	$.ajax({
		url : contextPath + DISEASE_SEARCH_PINYIN_URL,
		data : {search:val, categoryId:category},
		type : "POST",
		dataType : 'json',
		success : function(data) {
			diagnosisSearching=false;
			if(!data.state || !data.obj.length)return;
			input.data("val",val);
			var table = $("#patientDiseaseDiv table");
			$.each(data.obj,function(i,d){
				var li = $("<li />").width(ul_width/3-16).appendTo(ul);
				var a = $("<a />").addClass("diseaseId_"+d.id).click(function(){
					if($(this).hasClass("on")){
						var array = '[{diseaseId:'+d.id+',visitId:'+currentVisit.id+'}]';
						if(deleteDiagnosis(array)){
							$("tr.disease_"+d.id).remove();
							$(this).removeClass("on");
							//checkDiagnosisForConfirm();
						}
						DIAGNOSIS_ING=true;
					}else{
						addDiagnosis(table,d.id,d.disease,'双眼',1);
						$(this).addClass("on");
						//checkDiagnosisForConfirm();
					}
				}).text(d.icd_code+" "+d.disease).appendTo(li);
				if($("tr.disease_"+d.id).length)a.addClass("on");
			});
		}
	});
	
}

function saveDiagnosis(){

	var val = $.trim($("input[name=diseaseSearch]").val());
	var n = $("#diseaseListDiv").find("li").length;
//	console.log(n);
	if(!val.length){
		$.oimsAlert("请先在搜索框内输入诊断名称！");
		return;
	}
	else{
		if(n){
			$.oimsConfirm({strTitle :"你确定要添加此诊断(列表下方已有相似诊断)？",remove_length : true},function(){
				var re = getJSONData(SAVE_DIAGNOSIS_URL,{disease:val,categoryId:3000},"POST");
				if(!re.state){
					$.oimsAlert("保存失败！");
					return;
				}
				var table = $("#patientDiseaseDiv table");
				addDiagnosis(table,re.obj,val,'双眼',1);
				});
		}
		else{
			var re = getJSONData(SAVE_DIAGNOSIS_URL,{disease:val,categoryId:3000},"POST");
			if(!re.state){
				$.oimsAlert("保存失败！");
				return;
			}
			var table = $("#patientDiseaseDiv table");
			addDiagnosis(table,re.obj,val,'双眼',1);
		}
		
	}

}