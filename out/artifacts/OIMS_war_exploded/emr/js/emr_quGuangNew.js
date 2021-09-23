var EMR_TAB_TITLE_URL_qg = "/publish/emr/gettabs_qg.htm";
var EMR_QGLC_GET_WWC_URL="/publish/quguang/findQglcByBlhWwc.htm";

var qg_doctor_priority={'0225':'杨于力','0316':'熊洁'};
var qg_engineer_priority={'0053':'王科','0349':'罗启惠'};
var qg_nurse_priority={'0243':'王素华','0069':'周青青','0288':'李欢欢'};
var QG_SWITCH_AUTO_SAVE_FORM=[];
var QG_LC_DATA=[{title:"病历",value:1},{title:"同意书",value:2},{title:"预约",value:3},{title:"手术记录",value:4},{title:"术后复查",value:5}];
var EMR_QGLC_DATA_CURRENT=null;
var QG_SSFS_OBJ=[{title:"准分子",template:{bl:"/emr/template/html/emr_zunfenzi.html",tys:"",ssjl:""},children:[{title:"lasik-110"},{title:"lasik-90"},{title:"lasik-飞秒"},{title:"Smart-TPRK"},{title:"全飞秒"}]},{title:"晶体植入",children:[{title:"ICL"},{title:"TICL"},{title:"PRL"}]},{title:"儿童屈光",children:[{title:"lasik-110"},{title:"lasik-90"},{title:"lasik-飞秒"},{title:"Smart-TPRK"},{title:"全飞秒"},{title:"ICL"},{title:"TICL"},{title:"PRL"}]}];
var QS_SSFS_OBJ_2=[{title:"普通"},{title:"Q值"},{title:"地形图"},{title:"波前相差"}];

/**
 * 屈光程序入口
 */
function _emr_preview_qg(id){
	console.log("------------屈光 程序入口,id:"+id+"-------------------");
	$(".medicalRecord").hide();
	var tag = $("#medicalRecordTab"+id);
	if(tag.length){
		tag.show();
		return;
	}
	var visitRecordHeight = $("#visitRecord").height();//543
	var tabTitleHeight = $("#tabTitle").height();
	var tabContentHeight = visitRecordHeight-tabTitleHeight-28;
	tag = $("<div />").attr("id","medicalRecordTab"+id).addClass("medicalRecord").height(tabContentHeight).appendTo("body");
	var childTag = $("<div />").css({background:"url(../style/green/images/thbg.png) repeat-x","padding-top":"2px"}).height(28).appendTo(tag);
	var data = getJSONData(EMR_TAB_TITLE_URL_qg,null,"POST");
	$.each(data,function(i,d){
		var div = $("<div/>").addClass("qgtab").attr("id","qg_"+d.id).appendTo(childTag);
		$("<span />").text(d.category).appendTo(div);
		//var className = i==0 ? "tab_show":"tab_hide";
		div.addClass("tab_hide").click(function(){
			if($(this).hasClass("tab_show"))return;
			if(QG_SWITCH_AUTO_SAVE_FORM.length){//没保存
				$.oimsConfirm("当前操作尚未提交，是否提交后继续？",function(){
					$.each(QG_SWITCH_AUTO_SAVE_FORM,function(i,form){
						form.submit();
					});
				});
				return;
			}
			var func = '('+d.intr+'('+d.id+'))';
			console.log(func);
			eval(func);	
		});
	});
	
	var qglcTag = $("<div />").attr("id","qglc_id").width(280).css({float:"left", "padding-top":2,"line-height":"25px","text-align":"center"}).appendTo(childTag);
	var qgssfsTag = $("<div />").attr("id","qgssfs").css({float:"left"}).appendTo(childTag);
	
	var select = $("<select />").attr("id","sel_lev1").width(100).change(function(){
		console.log("xxxxxx")
		var v = $(this).val();
		$("#sel_lev2").text("");
		if(v==''){
			$("#sel_lev3").hide();
			return;
		}
		
		if($(this).children("[value="+v+"]").data("data")){
			var child = $("select#sel_lev2");
			if(!child.length)
				child = $("<select />").attr("id","sel_lev2").insertAfter(select);
			else
				child.text("");
			$.each($(this).data("data"), function(k, m){
				$("<option />").text(m.title).appendTo(child);
			});
		}
		
		if(v == '晶体植入'){
			$("#sel_lev3").hide();
		}else{
			$("#sel_lev3").show();
		}
	}).appendTo(qgssfsTag);
	$.each(QG_SSFS_OBJ,function(i,d){
		var option = $("<option />").text(d.title).appendTo(select);
		if(d.child && d.child.length){
			option.data("data",d.child);
		}
	});
	select = $("<select />").attr("id","sel_lev3").width(100).appendTo(qgssfsTag);
	$.each(QS_SSFS_OBJ_2, function(i,d){
		$("<option />").text(d.title).appendTo(select);
	});
	
	EMR_QGLC_DATA_CURRENT = getJSONData(EMR_QGLC_GET_WWC_URL,{blh:currentPatient.binglihao},"POST");
	if(EMR_QGLC_DATA_CURRENT==null){
		childTag.children("div.qgtab:first").click();
	}else{
		setQGLCState();
		childTag.children("div.qgtab").eq(EMR_QGLC_DATA_CURRENT.state-1).click();
	}
}

/**
 * 病历入口
 */
function _emr_show_bl(){
	var setting={
			formMethod:"POST",
			beforeSubmit:function(){
				
			},
			saveCallback:function(){
				
			}
	}
	var data = getJSONData(EMR_QGBL_GET_URL,{lcid:EMR_QGLC_DATA_CURRENT.id},"POST");
	var templateUrl;
	var txt = $("#sel_lev1").val();
	$.each(QG_SSFS_OBJ,function(i,d){
		if(d.title == txt){
			templateUrl = d.template.bl;
		}
	});
	showFormByHtmlTemplate(tag, templateUrl, setting, data.obj)
}

/**
 * 手术同意书入口
 */
function _emr_show_tys(){
	
}

/**
 * 预约入口
 */
function _emr_show_yy(){
	
}

/**
 * 手术记录入口
 */
function _emr_show_ssjl(){
	
}

/**
 * 术后复查
 */
function _emr_show_shfc(){
	
}

/**
 * 既往病历
 */
function _emr_show_jwbl(){
	
}

function setQGLCState(){
	var qglcTag = $("#qglc_id");
	if(qglcTag.children().length){
		qglcTag.text("");
	}
	$("<label />").text("流程号：").appendTo(qglcTag);
	$("<label />").css("color","red").text(EMR_QGLC_DATA_CURRENT.id).appendTo(qglcTag);
	$("<label />").html("&nbsp;|&nbsp;").appendTo(qglcTag);
	var data = QG_LC_DATA[EMR_QGLC_DATA_CURRENT.state-1];
	$("<label />").text("当前环节：").appendTo(qglcTag);
	$("<label />").text(data.title).css("color","red").appendTo(qglcTag);
}