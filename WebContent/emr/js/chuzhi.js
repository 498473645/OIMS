var EXAM_EYE_LIST_URL = "/publish/jcxm/findJcxmList.htm";
var EXAM_SAVE_OR_UPDATE_URL = "";
var JCTS_PAINT_SAVE_URL = "/publish/emr/saveJCTSPaint.htm";
var GET_EYE_JCXM_PRICE_URL = "/publish/emr/getPriceByJcxmIdAndEyE.htm";
var FIND_ZHIXING_KESHI_URL = "/publish/jcxm/findJcxmZhixingkeshi.htm";
var FIND_SAMPLE_URL = "/publish/jcxm/findJcxmSample.htm";
var FIND_JCXM_OPTIONS_URL = "/publish/jcxm/findJcxmOptions.htm";
var FIND_DRUG_DICT_URL = "/publish/chufang/findDrugDictList.htm";
var FIND_ORDER_URL = "/publish/emrOrder/findOrder.htm";
var FIND_ORDER_DETAIL_URL = "/publish/emrOrder/findOrderDetails.htm";
var SAVE_ORDERS_URL = "/publish/emrOrder/saveOrder.htm";
var SAVE_CHUFANG_URL = "/publish/chufang/saveChufang.htm";
var FIND_CHUFANGQINDAN_URL = "/publish/chufang/findChufangQindan.htm";
var FIND_CF_YONGFA_URL = "/publish/emr/findAdministrations.htm";
var FIND_CF_PINGLV_URL = "/publish/emr/findFrequencys.htm";
var FIND_SUIFANG_URL = "/publish/_emr/findSuifang.htm";
var DELETE_EMROrder="/publish/emrOrder/deleteEMROrders.htm";
var DELETE_EMRCHUFANGQINDAN="/publish/chufang/deleteEMRCHUFANGQINGDAN.htm";
var yfArray, plArray;
var getInspectPhotoUrl = '/publish/emr/getInspectPhoto.htm';
var FIND_EYE_JIANCHASHI_URL="/publish/_emr/findEYEJianchashi.htm";
var FIND_CATEGORY_URL = "/publish/category/findCategorysByFatherId.htm";
var saveSpecialTreat='/publish/emrOrder/saveOrUpdateSpecialTreat.htm';

var jctsPaintMovie = null;
var chuzhiSearching = false;
var jiuzhenId;//住院证初始就诊ID
var findJcxmUrl='/publish/jcxm/getJcxmById.htm';

//根据EMROrder的ID查询对应的检查在HIS/LIS上的缴费状态
var FIND_ORDER_HIS_JIFEI_STATUS = "/publish/emrOrder/checkOrderJiFeiStatus.htm";

var saveAndPrint=false;
var printAfterSave=false;//打印点击后回调成功打印
var printAfterSaveChoose=false;//打印选中点击后在回调成功打印
var yqprintAfterSaveChoose=false;//院前打印 选中点击后回调成功打印

var comboSubmit=false;
var listTypes=[];//每次提交后套餐中剩余的待提交的处置类型
var listTypes_combo=[];//套餐打印时候显示的所有处置类型，打印结束后清空
var CHUZHI_SAVEING = {eyeExam:false,otherExam:false,labTest:false,prescribe:false,treat:false};
var ypArr = null;//用于 处置里处方记录当天已经开出处方

//var comboList=[{id:1,tcmc:'慢性类囊炎',taocanXM:[{id:1,taocanId:1,xmType:5,xmId:1000027,shuliang:1.0},{id:2,taocanId:1,xmType:13,xmId:1970,shuliang:1.0},{id:5,taocanId:1,xmType:15,xmId:2079,shuliang:1.0}]},{id:2,tcmc:'测试',taocanXM:[{id:3,taocanId:2,xmType:5,xmId:1000027,shuliang:1.0},{id:4,taocanId:2,xmType:13,xmId:1970,shuliang:1.0}]}];
var CHUZHI_SAVE_NO_MSG={
		eyeExam:false,
		otherExam:false,
		labTest:false,
		prescribe:false,
		treat:false,
		Qg_operation:false,
		operation:false
};

//var CHUZHI_ING={
//		eyeExam:false,
//		otherExam:false,
//		labTest:false,
//		prescribe:false,
//		treat:false
//};

var CHUZHI_CATEGORY={
		eyeExam:13,//眼科检查
		otherExam:14,//其它检查
		labTest:15,//化验
		prescribe:4,//处方
		treat:5,//治疗
		follow:6,//处置
		Qg_operation:7,//屈光手术
		operation:11//门诊手术
}

var CHUZHI_FORM={
		eyeExam:true,
		otherExam:true,
		labTest:true,
		prescribe:true,
		treat:true,
		Qg_operation:true,
		operation:true
}

var chilredSelectObj = [ {
	category : "眼科检查",
	id : 13,
	intr : "eyeExam",
	listTitle : [ {
		title : "项目名称"
	}, {
		title : "数量",
		width : 50
	}, {
		title : "眼别",
		width : 80
	}, {
		title : "金额",
		width : 80
	} ]
}, {
	category : "全院检查",
	id : 14,
	intr : "otherExam",
	listTitle : [ {
		title : "项目名称"
	}, {
		title : "数量",
		width : 50
//	}, {
//		title : "部位",
//		width : 100
	}, {
		title : "金额",
		width : 80
	} ]
}, {
	category : "化验",
	id : 15,
	intr : "labTest",
	listTitle : [ {
		title : "项目名称"
	}, {
		title : "数量",
		width : 50
	}, {
		title : "标本",
		width : 100
	}
//	, {
//		title : "金额",	
//		width : 80
//	}
	]
}, {
	category : "处方",
	id : 4,
	intr : "prescribe",
	listTitle : [ {
		title : "药品名称",
		width:200
	}, {
		title : "规格",
		width : 100
	}, {
		title : "单位",
		width : 40
	}, {
		title : "数量",
		width : 40
	}, {
		title : "金额",
		width : 40
	}, {
		title : "用法",
		width : 80
	}, {
		title : "用量",
		width : 50
	}, {
		title : "频率",
		width : 80
	},{
		title:"药局",
		width:70
	},{
		title:"生产厂商",
		width:70
	},{
		title:"库存",
		width:40
	} ]
}, {
	category : "治疗",
	id : 5,
	intr : "treat",
	listTitle : [ {
		title : "项目名称"
	}, {
		title : "数量",
		width : 50
	}, {
		title : "单位",
		width : 100
	}, {
		title : "金额",
		width : 80
	} ]
}, {
      category:"随访",
        id:6,
        intr:"follow",
        listTitle:[]
},{
    	category : "屈光手术",
    	id : 7,
    	intr : "Qg_operation",
    	listTitle : [ {
    		title : "手术名称"
    	}, {
    		title : "数量",
    		width : 50
    	}, {
    		title : "眼别",
    		width : 80
    	}, {
    		title : "金额",
    		width : 80
    	} ]
    },{
    	category : "门诊手术",
    	id : 11,
    	intr : "operation",
    	listTitle : [ {
    		title : "手术名称"
    	}, {
    		title : "数量",
    		width : 50
    	}, {
    		title : "眼别",
    		width : 80
    	}, {
    		title : "金额",
    		width : 80
    	} ]
    }
 ];


/**
 * 显示搜索分类
 */
function showSearchCategory(listType){
	var id="search_chuzhi_item_form_"+listType;
	$(".search_chuzhi_item_form").hide();
	$("#"+id).show();
	//console.log("--------------");
}

/**
 * 初始化处置搜索表单
 * @param listType
 */
function initSearchChuzhiItemForm(listType){
	var url =EXAM_EYE_LIST_URL;
	var id="search_chuzhi_item_form_"+listType;
	if(listType==CHUZHI_CATEGORY.prescribe){
		url = FIND_DRUG_DICT_URL;
	}
	if($("#"+id).length){
		return;
	}
	var normalText = "";
	var form = $("<form />").addClass("search_chuzhi_item_form").hide().attr("id",id).attr("action",contextPath+url).attr("method","post").ajaxForm({
		dataType : "json",
		beforeSubmit:function(c){
			var s=true;
			$.each(c,function(i,d){
				if(d.name=="search"){
					if(d.value==normalText){
						d.value="";
					}
					if(d.value==form.children("input[name=search]").data("val")){
						if(d.value!="")s=false;
						return false;
					}
				}
			});
			if(!s)return s;
			chuzhiSearching=true;
			DATA_TRANSMITTING.push(id);
		},
		success : function(d) {
			var search = form.children("input[name=search]");
			var val = $.trim(search.val());
			if(val==""){
				search.val(normalText)/*.css("color","#ccc")*/;
			}
			search.data("val",val);
			if(!d.state){
				$.oimsError("向后台请求数据失败！");
				return;
			}
			initItemListData(d);
			chuzhiSearching=false;
			DATA_TRANSMITTING=delObjectInArray(DATA_TRANSMITTING,id);
		}
	}).appendTo("#searchExamDiv");
	$("<input type=\"hidden\" name=\"categoryId\" value=\""+listType+"\" />").appendTo(form);
	$("<input type=\"hidden\" name=\"bgsId\" />").appendTo(form);
	$("<input type=\"hidden\" name=\"currentPage\" value=\"1\" />").appendTo(form);
	$("<input type=\"hidden\" name=\"pageSize\" value=\"100\" />").appendTo(form);
	$("<input type=\"hidden\" name=\"cyxm\" value=\"0\" />").appendTo(form);
	$("<span>搜索：</span>").appendTo(form);
	$("<input />").attr("name","search")/*.css("color","#ccc")*/.focusin(function(){
		$(this).css("color","#000");
		if($.trim($(this).val())==normalText)$(this).val("");
	}).blur(function(){
		var search = $.trim($(this).val());
		if(search==normalText|| !search.length){
			$(this).val(normalText)/*.css("color","#ccc")*/;
		}
		form.submit();
	}).keyup(function(e){
		var xkey=[0,16,17,20,37,38,39,40];
		if(containArray(xkey,e.keyCode)){
			return true;
		}
		if(e.keyCode==13){
			$(this).blur();
			return true;
		}
		if(chuzhiSearching)
			return false;//return true; 
		else{
			var ov = $(this).data("val");
			chuzhiSearching=true;
			if(ov!=$(this).val())form.submit();
		} 
	}).appendTo(form);
	if(listType == CHUZHI_CATEGORY.eyeExam || listType == CHUZHI_CATEGORY.labTest || listType == CHUZHI_CATEGORY.otherExam){//眼科检查,全院检查，化验 增加院前检查选项
		//TODO 给院前检查的项目 显示别的颜色
		$.each($("#chuzhiForm_13 > table").find("tr"),function(stk,stkv){
			if(stk > 0){
				if($(stkv).find("input[name='preExam']").eq(0).val() == 1){
					$(stkv).addClass("yqStyle");
				}else{
					$(stkv).removeClass("yqStyle");
				}
			}
		});
	}
	if(listType == CHUZHI_CATEGORY.prescribe){
		$("<span>药房：</span>").appendTo(form);
		$("<select name='storename' style='float:none;' ><option value='MZYF' selected='selected' >门诊药房</option><option value='MZZYF'>门诊中药房</option><option value='BMYF'>便民药房</option><option value='ZXBYS'>中心摆药室</option><option value='all'>全部</option></select>").change(function(){
			form.submit();
		}).appendTo(form);
	}else{
		$("<input type=\"hidden\" name=\"storename\" value='' />").appendTo(form);
	}
	if(listType==CHUZHI_CATEGORY.treat){
		$("<input type='checkbox' value='1' style='vertical-align:middle;margin-left:50px' name='specialTreat'>&nbsp;&nbsp;&nbsp;").appendTo(form);
		$("<span style='font-size:13px'>住院治疗</span>").appendTo(form);
		$("<input type='checkbox' value='2'  style='vertical-align:middle;margin-left:20px' name='specialTreat'>&nbsp;&nbsp;&nbsp;").appendTo(form);
		$("<span style='font-size:13px'>日间手术</span>").appendTo(form);
		$("<input type='checkbox' value='3'  style='vertical-align:middle;margin-left:20px' name='specialTreat'>&nbsp;&nbsp;&nbsp;").appendTo(form);
		$("<span style='font-size:13px'>门诊手术</span>").appendTo(form);
//		$("<a style='width:80px;float:right;font-size:15px;text-algin:center;'>手术预约</a>").appendTo(form).click(function(){
//			importJS('/js/manager/shoushu/shoushuManager.js');
//			importJS('/js/manager/shoushu/dataSetting.js');
//			addShoushuYuyue();
//			$("#patientNo").val(currentPatient.binglihao);
//			$("#patientNo").blur();
//		});
		$.each($("input[type=checkbox][name=specialTreat]"),function(i,n){
			if(parseInt($(n).val())==currentVisit.treatMethod){
				$(n).attr("checked","checked");
			}
		});
		$("input[type=checkbox][name=specialTreat]").click(function(){
			$("input[type=checkbox][name=specialTreat]").not($(this)[0]).attr("checked",false);
			getJSONData(saveSpecialTreat,{jiuzhenId:currentVisit.id,st:($(this).attr("checked")?$(this).val():null)},'POST');
			currentVisit.treatMethod=$(this).attr("checked")?$(this).val():null;
		});
	}

if($("#buttons span.zyz") == null || $("#buttons span.zyz") == undefined || $("#buttons span.zyz").length == 0){
		
		$("<a style='display: block;'><span class='zyz' />住院证</a>").appendTo($("#buttons"));
		$("#buttons span.zyz").parent().click(function(){
			//住院证弹出框
			zyzForm(currentVisit);
		});
	}
}

//提交保存住院证 并且弹出打印预览界面
function zyzForm(visitList){
	currentVisit = visitList;
	jiuzhenId = visitList.id;
	var view = addZyzDialog();
	var form_saveZyz = $("<form/>").attr("id", "form_saveZyz").attr(
			"action", contextPath + "/publish/emr/saveOrUpdateEMRInHospitalCard.htm")
			.attr("method", "post");
	$(view).appendTo(form_saveZyz);
	var div_openbutton = $("<div/>").attr("id", "div_openbutton").attr("class",
			"openbutton").appendTo(form_saveZyz);// 底部div
	if (jiuzhenId == undefined){
		$.oimsAlert("当天患者没有住院证记录!");
		return;
	}
	//查询住院证
	var emrInHospitalInfo = getJSONData("/publish/emr/findZyzByJiuzhenId.htm", {//zyzid
		jiuzhenId : jiuzhenId,
		tag : Math.random()
	}, "post");
	if(emrInHospitalInfo != null && emrInHospitalInfo != undefined && emrInHospitalInfo.state && emrInHospitalInfo.obj != null){
		emrInHospitalInfo = emrInHospitalInfo.obj;
	}else{
		emrInHospitalInfo = null;
	}
	var div_openbutton_html = "<a href='javascript:saveZyz();'><span class='advsumit'></span>"
			+ "打印预览"
			+ "</a>";
	$(div_openbutton_html).appendTo(div_openbutton);
	$(form_saveZyz).oimsDialog({
		icon : "add",
		title : "住院证",
		width : 700,
		height : 420,
		drag : false,// 是否可以拖动窗口
		locked : true,
		winType : 4,
		button : null
	});
	
	// 接诊医生下拉框赋值begin
	var data_getKaiDanDoctorByQuanxian = getJSONData(
			"/publish/yuangong/getKaiDanDoctorByQuanxian.htm", {
				tag : Math.random()
			}, "post");
	if (data_getKaiDanDoctorByQuanxian.state) {
		var yuangonglist = data_getKaiDanDoctorByQuanxian.obj;
		$.each(yuangonglist,
				function(i, d) {
					//判断当前登录的账号是否是开单医生 如果是  则默认选中 否则 选中空的 
					if(parent.window.currentStaff.gonghao == d.gonghao){
						$("<option value=\"" + d.xingming + "\" selected='selected' >" + d.xingming
								+ "</option>").appendTo("#zyz_ysqz");
					}else{
						$("<option value=\"" + d.xingming + "\">" + d.xingming
								+ "</option>").appendTo("#zyz_ysqz");
					}
				});
	}
	// 接诊医生下拉框赋值end
	
	//如果修改 则 赋值
	if(emrInHospitalInfo != null){
		$('#zyz_tsqksm').val(emrInHospitalInfo.specialDesc);
		$("#zyz_ysqz").val(emrInHospitalInfo.doctorName);
		$("#zyz_yjj").val(emrInHospitalInfo.prePerment);
		$("#zyz_wzlevel").val(emrInHospitalInfo.preCondition);
		$("#zyz_rykb").val(emrInHospitalInfo.preDept);
		$("#zyz_zyzlx").val(emrInHospitalInfo.inpCardType);
	}
}

//填写住院证所需数据 对应的
function addZyzDialog(){
	var table = "<table border='0' cellpadding='0' cellspacing='0' width='100%'><tbody>";
	
	table += "<tr ><td colspan='2' style='border-top-style:none; border-bottom-style:none;text-align:left;'>住院证类型</td>"
		   + "<td colspan='4' style='border-top-style:none; border-bottom-style:none;text-align:left;'><select id='zyz_zyzlx' style='width:50%'><option value='4' style='width:70%'>普通</option><option value='1'>急诊</option><option value='2'>院前</option><option value='3'>日间手术/治疗</option></select></td>"
		   + "<td colspan='2' style='border-top-style:none; border-bottom-style:none;text-align:left;'>危重等级</td>"
		   + "<td colspan='4' style='border-top-style:none; border-bottom-style:none;text-align:left;'><select id='zyz_wzlevel' style='width:50%'><option value='3'>一般</option><option value='1'>危</option><option value='2'>急</option></select></td></tr>";
	
	table += "<tr style='line-height:40px; font-size:12px;'><td style='border-right-style:none;text-align:left;' colspan='2'>入院时科别</td>"
		   + "<td style='border-left-style:none; border-right-style:none;text-align:left;' colspan='3'><select id='zyz_rykb' style='width:60%'><option value='230303'>眼科治疗A区</option><option value='230304'>眼科治疗B区</option><option value='230305'>眼科治疗C区</option><option value='230306'>眼科日间病房</option></select></td>"
		   + "<td style='border-left-style:none; border-right-style:none; text-align:right;' colspan='2'></td>"
		   + "<td style='border-left-style:none; border-right-style:none; text-align:right;' colspan='2' ></td>"
		   + "<td style='border-left-style:none; ' colspan='3'></td></tr>";
	
	table += "<tr ><td colspan='12' style='border-top-style:none; border-bottom-style:none;text-align:left;'>特殊情况说明</td></tr>";
	
	table += "<tr style='font-size:12px; height:40px;' ><td colspan='12' ><textarea cols='60' rows='6' id='zyz_tsqksm' style=' width:95%;'></textarea></td></tr>";
	
	table += "<tr ><td colspan='2' style='border-top-style:none; border-bottom-style:none;border-right-style:none;text-align:left;'>预交金</td>"
		   + "<td colspan='10' style='border-top-style:none; border-bottom-style:none;border-right-style:none; border-left-style:none;text-align:left;position:relative;' ><input id='zyz_yjj' style='position: absolute;width: 99px;height: 18px;left: 3px;top: 5px;border-bottom: 0px;border-right: 0px;border-left: 0px;border-top: 0px;' /><select style='width:120px' onchange='yjjSelectChange(this)'><option value='0'>0</option><option value='3000'>3000</option><option value='5000'>5000</option><option value='8000'>8000</option><option value='10000'>10000</option><option value='15000'>15000</option></select></td><tr >";
			
	table += "<tr ><td colspan='2' style='border-top-style:none; border-bottom-style:none;border-right-style:none;text-align:left;'>签字医师</td>"
		   + "<td colspan='10' style='border-top-style:none; border-bottom-style:none;border-right-style:none; border-left-style:none;text-align:left;'><select id='zyz_ysqz' style='width:30%;'><option value=''></option></select></td></tr>";
		   
	table += "</tbody></table>";
	table += "<input type='hidden' id='zyz_tsqksm_bak' />";
	table += "<input type='hidden' id='zyz_ysqz_bak' />";
	table += "<input type='hidden' id='zyz_yjj_bak' />";
	table += "<input type='hidden' id='zyz_wzlevel_bak' />";
	table += "<input type='hidden' id='zyz_rykb_bak' />";
	table += "<input type='hidden' id='zyz_zyzlx_bak' />";
	table += "<input type='hidden' id='zyz_lszd_bak' />";
	return $(table);
}
function yjjSelectChange(seobj){
	$('#zyz_yjj').val(seobj.value);
}

function saveZyz(){
	if($("#zyz_ysqz").val() == ""){
		$.oimsAlert("请选择签字医师");
		return;
	}
	if($("#zyz_yjj").val() == "" || $("#zyz_yjj").val()== undefined){
		$.oimsAlert("请选择或者填写预交金");
		return;
	}
	
	//查询住院证
	var emrInHospitalInfo = getJSONData("/publish/emr/findZyzByJiuzhenId.htm", {//zyzid
		jiuzhenId : jiuzhenId,
		tag : Math.random()
	}, "post");
	if(emrInHospitalInfo != null && emrInHospitalInfo != undefined && emrInHospitalInfo.state && emrInHospitalInfo.obj != null){
		emrInHospitalInfo = emrInHospitalInfo.obj;
		
		//赋原值(用于对比，避免无修改还向后台请求)
		$('#zyz_tsqksm_bak').val(emrInHospitalInfo.specialDesc);
		$("#zyz_ysqz_bak").val(emrInHospitalInfo.doctorName);
		$("#zyz_yjj_bak").val(emrInHospitalInfo.prePerment);
		$("#zyz_wzlevel_bak").val(emrInHospitalInfo.preCondition);
		$("#zyz_rykb_bak").val(emrInHospitalInfo.preDept);
		$("#zyz_zyzlx_bak").val(emrInHospitalInfo.inpCardType);
		$("#zyz_lszd_bak").val(emrInHospitalInfo.outpDiagnosis);
	}else{
		emrInHospitalInfo = null;
	}
	var zyz_lszd = "";//获取诊断内容 并赋值
	var zhenduanList = getJSONData("/publish/emr/getExistsDiagnosis.htm", {
		visitId : jiuzhenId,
		tag : Math.random()
	}, "post");
	
	$.each(zhenduanList,function(zyzi,zyzv){
		var eyezyzv = zyzv.eye;
		if(eyezyzv == undefined || eyezyzv == "" || eyezyzv == null || eyezyzv == "null"){
			eyezyzv = "";
		}
		if(zyz_lszd == ""){
			zyz_lszd = eyezyzv+zyzv.zdflname;
		}else{
			zyz_lszd += ";"+eyezyzv+zyzv.zdflname;
		}
	});
	
	if($("#zyz_lszd_bak").val() != undefined && zyz_lszd ==$("#zyz_lszd_bak").val() && $('#zyz_tsqksm_bak').val() != undefined && $('#zyz_ysqz_bak').val() != undefined&&$('#zyz_yjj_bak').val() != undefined&&$('#zyz_wzlevel_bak').val() != undefined&&$('#zyz_rykb_bak').val() != undefined&&$('#zyz_zyzlx_bak').val() != undefined && ($.trim($('#zyz_zyzlx_bak').val()) == $.trim($('#zyz_zyzlx').val())&&$.trim($('#zyz_rykb_bak').val()) == $.trim($('#zyz_rykb').val())&&$.trim($('#zyz_wzlevel_bak').val()) == $.trim($('#zyz_wzlevel').val())&&$.trim($('#zyz_yjj_bak').val()) == $.trim($('#zyz_yjj').val())&&$.trim($('#zyz_tsqksm_bak').val()) == $.trim($('#zyz_tsqksm').val())&&$.trim($('#zyz_ysqz_bak').val()) == $.trim($('#zyz_ysqz').val()))){
		$.oimsSucc("未修改，确认后打开页面！", function() {
			emr_zyz_window_open();
		});
		return;
	}
	
	var job = $.trim(currentPatient.job);
	var priorityed;//获取优先级
	var zyzlx = parseInt($("#zyz_zyzlx").val());
	var patTypeCode = 0;//患者类型代码  0一般 1军属及其他优先 2军人
	if(job=="战士" || job=="师职干部" || job=="团以下干部" || job=="军以上干部"){
		priorityed = 1;
		patTypeCode = 2;
	}else if(job == "免减费家属" || job =="职工"){
		patTypeCode = 1;
		if(zyzlx == "1"){
			priorityed = 2;
		}else{
			priorityed = 3;
		}
	}else{
		patTypeCode = 0;
		if(zyzlx == "1"){
			priorityed = 2;
		}else if(zyzlx == "2" || zyzlx == "3"){
			priorityed = 4;
		}else{
			priorityed = 5;
		}
	}
	var zyzTmpStr = "保存";
	if(emrInHospitalInfo == null){
		var caozuotime = currentVisit.caozuoTime?currentVisit.caozuoTime.time:currentVisit.caozuotime.time;
		emrInHospitalInfo = {
				visitDate : new Date(caozuotime),
				visitNo : currentVisit.haoma,
				patientID : currentPatient.binglihao,
				specialDesc : $('#zyz_tsqksm').val(),
				orderedBy : "230320",
				doctorName : $("#zyz_ysqz").val(),
				prePerment : parseFloat($("#zyz_yjj").val()),
				createDate : new Date(),
				preCondition : parseInt($("#zyz_wzlevel").val()),
				status : 1,
				priority : priorityed,//优先级(战士，师职干部，团以下干部，军以上干部优先级1；除军人身份其他人只要是急诊优先级都是2；免减费家属，职工除急诊外的优先级都是3；普通人的院前和日间手术/治疗优先级为4；普通人的普通优先级为5)
				inpCardType : zyzlx,//1  2  3  4分别对应急诊  院前  日间手术/治疗  普通
				preDept : $("#zyz_rykb").val(),
				jiuzhenId : currentVisit.id,
				hzid : currentPatient.id,
				patTypeCode : patTypeCode,//患者类型代码  0一般 1军属及其他优先 2军人
				outpDiagnosis : zyz_lszd,//临时诊断
				tag : Math.random()
		};
	}else{
		emrInHospitalInfo.specialDesc = $('#zyz_tsqksm').val();
		emrInHospitalInfo.doctorName = $("#zyz_ysqz").val();
		emrInHospitalInfo.prePerment = $("#zyz_yjj").val();
		emrInHospitalInfo.preCondition = $("#zyz_wzlevel").val();
		emrInHospitalInfo.preDept = $("#zyz_rykb").val();
		emrInHospitalInfo.priority = priorityed;
		emrInHospitalInfo.inpCardType = zyzlx;
		emrInHospitalInfo.patTypeCode = patTypeCode;
		emrInHospitalInfo.outpDiagnosis = zyz_lszd;//临时诊断
		
		//防止日期异常
		emrInHospitalInfo.visitDate = new Date(currentVisit.caozuoTime.time);
		emrInHospitalInfo.createDate = new Date(emrInHospitalInfo.createDate.time);
		
		zyzTmpStr = "修改";
	}
	
	var emrInHospitalSave = getJSONData("/publish/emr/saveOrUpdateEMRInHospitalCard.htm", emrInHospitalInfo, "post");
	
	var zyzReceveStr = "住院证"+zyzTmpStr;
	if(emrInHospitalSave != null && emrInHospitalSave != undefined && emrInHospitalSave.state && emrInHospitalSave.obj != null){
		$.oimsSucc(zyzReceveStr+"成功！", function() {
			emr_zyz_window_open();
		});
	}else{
		$.oimsAlert(zyzReceveStr+"失败！");
	}
}

//打开住院证打印页面
function emr_zyz_window_open(){
	//查询住院证
	var emrInHospitalInfo = getJSONData("/publish/emr/findZyzByJiuzhenId.htm", {//zyzid
		jiuzhenId : jiuzhenId,
		tag : Math.random()
	}, "post");
	if(emrInHospitalInfo != null && emrInHospitalInfo != undefined && emrInHospitalInfo.state && emrInHospitalInfo.obj != null){
		emrInHospitalInfo = emrInHospitalInfo.obj;
		//页面跳转 传递挂号id 再通过调取父页面zyzloadInformation函数 获取数据信息 
		var zyzWindow = window.open(contextPath+"/emr/zyzempty.jsp?visiteId="+jiuzhenId,'channelmode=yes,resizable=1');
		
	}else{
		$.oimsAlert("未读取到住院证信息");
	}	
}

/*
 * 获取打印住院证的信息
 * */
function zyzloadInformation(currentVisitID){

	var emrInHospitalInfo = getJSONData("/publish/emr/findZyzByJiuzhenId.htm", {
		jiuzhenId : currentVisitID,
		tag : Math.random()
	}, "post");
	var tmpData = null;
	if(emrInHospitalInfo != null && emrInHospitalInfo != undefined && emrInHospitalInfo.state && emrInHospitalInfo.obj != null){
		emrInHospitalInfo = emrInHospitalInfo.obj;
		
		var zyz_rykb = "";
		var rykb_zyzid = 246;
		if(emrInHospitalInfo.preDept == '230303'){
			zyz_rykb = "眼科治疗A区";
		}else if(emrInHospitalInfo.preDept == '230304'){
			zyz_rykb = "眼科治疗B区";
			rykb_zyzid = 247;
		}else if(emrInHospitalInfo.preDept == '230305'){
			zyz_rykb = "眼科治疗C区";
			rykb_zyzid = 248;
		}else if(emrInHospitalInfo.preDept == '230306'){
			zyz_rykb = "眼科日间病房";
			rykb_zyzid = 620;
		}
		
		var zyz_addr2 = "";//住院证再到地址
		var bangongshiZyzaddr2 = getJSONData("/publish/bangongshi/getBanGongShiById.htm", {
			id : rykb_zyzid,// 这个需要修改成 住院证对应的位置的id
			tag : Math.random()
		}, "post");
		if(bangongshiZyzaddr2 != null && bangongshiZyzaddr2.state && bangongshiZyzaddr2.obj != null){
			zyz_addr2 = bangongshiZyzaddr2.obj.weizhi;
		}
		
		var zyz_qzymd = parseInt(emrInHospitalInfo.createDate.year)+1900+"年"+(parseInt(emrInHospitalInfo.createDate.month)+1)+"月"+parseInt(emrInHospitalInfo.createDate.date)+"日";
		var zyz_qzsf = emrInHospitalInfo.createDate.hours+"时"+emrInHospitalInfo.createDate.minutes+"分";
		var zyz_yjj = emrInHospitalInfo.prePerment;
		var zyz_tsqksm = emrInHospitalInfo.specialDesc;
		var zyz_ysqz = emrInHospitalInfo.doctorName;
		// 这里 应该干掉 因为 住院证里 包含了临时诊断
		var zyz_lszd = "";//获取诊断内容 并赋值 
		
		var zhenduanList = getJSONData("/publish/emr/getExistsDiagnosis.htm", {
			visitId : currentVisitID,
			tag : Math.random()
		}, "post");
		var zyz_bnzts = "";
		
		$.each(zhenduanList,function(zyzi,zyzv){
			var eyezyzv = zyzv.eye;
			if(eyezyzv == undefined || eyezyzv == "" || eyezyzv == null || eyezyzv == "null"){
				eyezyzv = "";
			}
			if(zyz_lszd == ""){
				zyz_lszd = eyezyzv+zyzv.zdflname;
				if(zyz_lszd.indexOf("白内障") != -1){
					var bangongshiZyzbnz = getJSONData("/publish/bangongshi/getBanGongShiById.htm", {
						id : 621,// 这个需要修改成 住院证对应的位置的id
						tag : Math.random()
					}, "post");
					if(bangongshiZyzbnz != null && bangongshiZyzbnz.state && bangongshiZyzbnz.obj != null){
						zyz_bnzts = bangongshiZyzbnz.obj.weizhi;
					}
				}
			}else{
				zyz_lszd += " <br/> "+eyezyzv+zyzv.zdflname;
			}
		});
		var zyz_addr1 = "";//住院证地址
		var bangongshiZyz = getJSONData("/publish/bangongshi/getBanGongShiById.htm", {
			id : 580,// 这个需要修改成 住院证对应的位置的id
			tag : Math.random()
		}, "post");
		if(bangongshiZyz != null && bangongshiZyz.state && bangongshiZyz.obj != null){
			zyz_addr1 = bangongshiZyz.obj.weizhi;
		}
		var zyz_xingming = currentPatient.xingming;
		var zyz_patientid = currentPatient.binglihao;
		var zyz_nianling = _emr_calculteAge(formatDate(currentPatient.shengri.time));
		var man = '男';
		var women = '女'
		var zyz_xingbie = currentPatient.xingbie?man:women;
		var zyz_job = currentPatient.job;
		var zyz_OIMSPatientid = currentPatient.id;
		var zyz_zyzlx = parseInt(emrInHospitalInfo.inpCardType);
		switch(zyz_zyzlx){
			case 1:
				zyz_zyzlx = "急诊";
				break;
			case 2:
				zyz_zyzlx = "院前";
				break;
			case 3:
				zyz_zyzlx = "日间";
				break;
			case 4:
				zyz_zyzlx = "普通";
				break;
		}
		var zyz_wzLevel = "";//1危 2急 3一般
		switch(parseInt(emrInHospitalInfo.preCondition)){
			case 1:
				zyz_wzLevel = "危";
				break;
			case 2:
				zyz_wzLevel = "急";
				break;
			case 3:
				zyz_wzLevel = "一般";
				break;
		}
		//patTypeCode;//患者类型代码  0一般 1军属及其他优先 2军人
		var patType = "";
		switch(parseInt(emrInHospitalInfo.patTypeCode)){
			case 0:
				patType = "一般人员";
				break;
			case 1:
				patType = "军属及其他优先";
				break;
			case 2:
				patType = "军人";
				break;
		}
        var  zyz_qrsj = "";
		var bangongshiZyzqrsj = getJSONData("/publish/bangongshi/getBanGongShiById.htm", {
			id : 662,// 这个需要修改成 住院证对应的位置的id
			tag : Math.random()
		}, "post");
		if(bangongshiZyzqrsj != null && bangongshiZyzqrsj.state && bangongshiZyzqrsj.obj != null){
			zyz_qrsj = bangongshiZyzqrsj.obj.weizhi;
		}
		tmpData = {
				zyz_xingming : zyz_xingming,//患者姓名
				zyz_patientid : zyz_patientid,//患者病历号
				zyz_nianling : zyz_nianling,//患者年龄
				zyz_xingbie : zyz_xingbie,//患者性别
				zyz_job : zyz_job,//患者职业（军人身份之类）
				zyz_OIMSPatientid : zyz_OIMSPatientid,//PACS中患者id
				zyz_ysqz : zyz_ysqz,//签字医生
				zyz_rykb : zyz_rykb,//入院科别
				zyz_qzymd : zyz_qzymd,//签证年月日
				zyz_qzsf : zyz_qzsf,//签证时分秒
				zyz_yjj : zyz_yjj,//预交金
				zyz_tsqksm : zyz_tsqksm,//特殊情况说明
				zyz_lszd : zyz_lszd,//临时诊断
				zyz_addr1 : zyz_addr1,//住院证地址
				zyz_addr2 : zyz_addr2,//住院证 再到地址
				zyz_bnzts : zyz_bnzts,//如果临时诊断有白内障 则显示白内障地址
				zyz_qrsj : zyz_qrsj,//确认入院时间的地址
				zyz_wzLevel : zyz_wzLevel,//危重等级
				patType : patType,//身份
				zyz_zyzlx : zyz_zyzlx//急诊、院前、日间、普通
		};
	}
	
	return tmpData;
}

/**
 * 切换TAB入口
 * @param id
 */
function _emr_inspection(id) {
	var tabData = getTabData(id);
	if (tabData == null)
		return;
	var tag1 = tabData.tag1;
	var tag2 = tabData.tag2;
	yfArray = getJSONData(FIND_CF_YONGFA_URL, null, "POST");
	plArray = getJSONData(FIND_CF_PINGLV_URL, null, "POST");
	showExamLayout(tag1, tag2);
	showItemList();
}

/**
 * 显示执行执行科室表单
 * @param tr
 * @param tag
 * @param dept 通过套餐添加的执行科室
 */
function showZhixingkeshi(tr, tag,dept) {
//	console.log("+++++++++++++++++")
	var jcxmId = tr.children("input[name=jcxmId]").val();
	var result = getJSONData(FIND_ZHIXING_KESHI_URL, {
		jcxmId : jcxmId,
		tag:Math.random()
	});
	if (!result.state || !result.obj.length)
		return;
	var val = tr.children("input[name=excutiveDept]").val();
	$("<label style='color:red'/>").addClass("title").text("执行科室").appendTo(tag);
	var s = $("<select  />").height(25).attr("name", "zhixingkeshiSelected")
			.change(function() {
				var val=$(this).val();
				tr.children("input[name=excutiveDept]").val(val);
				setCHUZHI_FORM(false);
			}).appendTo(tag);
	$.each(result.obj, function(i,d) {
		var o = $("<option />").attr("value", d.id).text(d.bgs).appendTo(s);
//		if (!val.length) {
//			if(dept){
//				if (d.id==dept) {
//					o.attr("selected", "selected");
//					tr.children("input[name=excutiveDept]").val(dept);
//				}
//			}
//			else{
//				if (i == 0) {
//					o.attr("selected", "selected");
//					tr.children("input[name=excutiveDept]").val(d.id);
//				}
//			}
//		} else {
//			if (d.id == val)
//				o.attr("selected", "selected");
//		}
	});
	if(val.length){
		s.val(val);
	}else{
		if(dept){
			s.val(dept);
		}
	}
	tr.children("input[name=excutiveDept]").val(s.val());
}

/**
 * 显示项目附属
 * @param tr
 * @param tag
 */
function showOptions(tr, tag) {
	var jcxmId = tr.children("input[name=jcxmId]").val();
	var result = getJSONData(FIND_JCXM_OPTIONS_URL, {
		jcxmId : jcxmId
	});
	if (!result.state || !result.obj.length)
		return;
	var orderDetails = tr.children("input[name=orderDetail]").val();
	$("<label style='color:red'/>").addClass("title").text("附加项目").appendTo(tag);
	var t = $("<table />").attr("id","jcxmFushu_"+jcxmId).addClass("jcxmFushu").width(tag.innerWidth()).appendTo(tag);
	$.each(result.obj, function(i, d) {
		var n = d.defaultNum;
		var r = $("<tr />").addClass("fsxmId_"+d.id).appendTo(t).data('pricecode',d.pricecode);
		var td0 = $("<td />").appendTo(r);
		var a = $("<td />").text(d.xmmc).appendTo(r);
		var td = $("<td />").appendTo(r);
		if (i == 0) {
			td0.width(25);
			td.width(28);
		}
		var c = $("<input />").data("price",d.price).data("id",d.id).attr("type", "checkbox").click(
				function() {
					if (!d.chooseEnable)
						return false;
					setCHUZHI_FORM(false);
					setOrderDetailsAndMoney(tr,t);
				}).attr("checked", "checked").attr("name", "fsxmid").width(
				"100%").appendTo(td0);
		if (!d.chooseEnable) {
			c.attr("readonly", "readonly");
		}
		c.val(d.id);
		var suliang = $("<input />").attr("name", "suliang").data("defaultNum",d.defaultNum).val(n).data("val",
				n).blur(function() {
					if($(this).val()!=$(this).data("val")){
						setCHUZHI_FORM(false);
						setOrderDetailsAndMoney(tr,t);
					}
		}).width("100%").appendTo(td);
		if (!d.defaultNumChangeEnable) {
			suliang.attr("readonly", "readonly");
		}
	});
	if(orderDetails.length)setOrderDetails();
	setOrderDetailsAndMoney(tr,t);
	function setOrderDetails(){
		var _orderDetails = orderDetails.split(",");
		t.find("input[name=fsxmid]").removeAttr("checked");
		$.each(_orderDetails,function(i,str){
			var order = str.split("=");
			var tr = t.find("tr.fsxmId_"+order[0]);
			tr.find("input[name=fsxmid]").attr("checked","checked");
			tr.find("input[name=suliang]").val(order[1]);
		});
	}
}
/**
 * 设置订单详情和金额
 * @param tr
 * @param t
 */
function setOrderDetailsAndMoney(tr,t){
	var listType=parseInt($(tr).find("input[name=categoryId]").val());
	var orderDetails="";
	var money=0;
	var fsxmidInputs = t.find("input[name=fsxmid]");
	$.each(fsxmidInputs, function(i,fsxmidInput){
		var fsxm = $(fsxmidInput);
		if(fsxm.attr("checked")=="checked"){
			if(orderDetails.length)orderDetails+=",";
			var slInput = fsxm.parent().parent().find("input[name=suliang]");
			var defaultNum = slInput.data("defaultNum");
			if(defaultNum!=1 && (listType==CHUZHI_CATEGORY.eyeExam || listType==CHUZHI_CATEGORY.treat||listType==CHUZHI_CATEGORY.Qg_operation||listType==CHUZHI_CATEGORY.operation)){//如果是眼科特检,治疗，屈光手术，门诊手术
				var yb = tr.find("select[name=part]").val();
				if(yb==oimsCategory.DOUBLE_EYE||parseInt(fsxm.data("id"))==24737){
					slInput.val(defaultNum);
				}else{
					slInput.val((defaultNum*100)/2/100);
				}
			}
		//	if(defaultNum!=1&&(parseInt(tr.children("input[name=jcxmId]").val())==1000076||parseInt(tr.children("input[name=jcxmId]").val())==1000077||parseInt(tr.children("input[name=jcxmId]").val())==1000237)){ //新价表要修改的
			if(defaultNum!=1&&(parseInt(tr.children("input[name=jcxmId]").val())==1000048||parseInt(tr.children("input[name=jcxmId]").val())==1000057||parseInt(tr.children("input[name=jcxmId]").val())==1000042||parseInt(tr.children("input[name=jcxmId]").val())==1000010)){
				slInput.val(defaultNum);
			}
			var sl=slInput.val();
			orderDetails += fsxm.data("id")+"="+sl;
			money += sl*fsxm.data("price");
		}
	});
	tr.children("input[name=orderDetail]").val(orderDetails);
	money = money * tr.find("input[name=count]").val();
	if(listType!=CHUZHI_CATEGORY.labTest){
		if(listType==CHUZHI_CATEGORY.Qg_operation)
			tr.children("td:last").find('input').val(money.toFixed(2));
		else
			tr.children("td:last").text(money.toFixed(2));
	}
	
}

/**
 * 显示项目清单
 */
function showItemList() {
	var listType = $("#examListDiv .deptList a.selected").data("listType");
	if(listType==CHUZHI_CATEGORY.follow){
		importJS("/emr/js/chuzhi_suifang.js");
		return showFollow(); 
	}
	$("form.chuzhiForm").hide();
	$("form#chuzhiForm_" + listType).show();
	$("#searchExamDiv").children("form:visible").submit();
}

/**
 * 设置表单提交状态
 * @param val
 * @param listType
 */
function setCHUZHI_FORM(val, listType){
	if(listType==undefined||listType==null)
		listType=$("#examListDiv .deptList a.selected").data("listType");
//	console.log("setCHUZHI_FORM:"+listType+","+val);
	switch(listType){
		case CHUZHI_CATEGORY.prescribe:
			CHUZHI_FORM.prescribe=val;
			break;
		case CHUZHI_CATEGORY.eyeExam:
			CHUZHI_FORM.eyeExam=val;
			break;
		case CHUZHI_CATEGORY.follow:
			CHUZHI_FORM.follow=val;
			break;
		case CHUZHI_CATEGORY.labTest:
			CHUZHI_FORM.labTest=val;
			break;
		case CHUZHI_CATEGORY.otherExam:
			CHUZHI_FORM.otherExam=val;
			break;
		case CHUZHI_CATEGORY.treat:
			CHUZHI_FORM.treat=val;
			break;
		case CHUZHI_CATEGORY.Qg_operation:
			CHUZHI_FORM.Qg_operation=val;
			break;
		case CHUZHI_CATEGORY.operation:
			CHUZHI_FORM.operation=val;
			break;
	}
}

/**
 * 初始化项目清单数据
 * @param result
 */
function initItemListData(result){
	var listType = $("#examListDiv .deptList a.selected").data("listType");
	var tag = $("div.itemListDiv");
	tag.text("");
	if(listType==CHUZHI_CATEGORY.prescribe){
		return showPrescribeItemList(result);
	}
	var ul = $("<ul />").appendTo(tag);
	var liWidth = (tag.parent().innerWidth() - $("div.deptList").outerWidth()) / 2 ;
	if(listType == CHUZHI_CATEGORY.treat)liWidth = (tag.parent().innerWidth() - $("div.deptList").outerWidth()) / 3 - 2;
	$.each(result.obj, function(i, d) {
		var li = $("<li />").width(liWidth - 20).appendTo(ul);
		var className = "item_" + d.id + "_listType_" + listType;
		var a = $("<a />").addClass(className).dblclick(function() {
			setCHUZHI_FORM(false);//只要添加一个，设置此类型的处置为未提交
//			setCHUZHI_ING(true);//只要添加一个，设置此类型的处置为处置中
			if ($(this).hasClass("on")) {
				$("#jctsDiv_" + d.id + "_"+listType).hide().remove();
				$("tr#" + className).remove();
				$(this).removeClass("on");
				hiddenItemInfo();
				return;
			}
			addExam(d, 1, listType);
			$(this).addClass("on");
		}).text(d.xmmc).appendTo(li);
		if ($("tr#" + className).length)
			a.addClass("on");
	});
}

/**
 * 获取订单详情
 * @param orderId
 * @returns {String}
 */
function getOrderDetail(orderId) {
	var s = ""
	var re = getJSONData(FIND_ORDER_DETAIL_URL, {
		id : orderId,
		tag : Math.random()
	}, "POST");
	if (!re.state || !re.obj.length)
		return s;
	$.each(re.obj, function(i, d) {
		if (i > 0)
			s += ",";
		s += d.fushuJcxmId + "=" + d.suliang;
	});
	return s;
}

/**
 * 插入一个项目
 * @param d
 * @param count
 * @param temp1 通过模板添加的眼别或标本
 * @param temp2 通过模板添加的执行科室
 */
function addExam(d, count, listType, show, o,temp1,temp2) {
	var trId = "item_" + d.id + "_listType_" + listType;
	if($("tr#"+trId).length)return;
//	if(!o){
//		setCHUZHI_ING(true,listType);
//	}
	var divId =  "jctsDiv_" +d.id+"_"+listType;
	if (count == null || count == 0)
		count = 1;
	var tag = $("form#chuzhiForm_" + listType).children("table");
	var tr = $("<tr />").data("listType", listType).data("xmmc", d.xmmc).attr(
			"id", trId).appendTo(tag);
	
	$("<input type=\"hidden\" />").attr("name", "id").appendTo(tr);
	$("<input type=\"hidden\" />").attr("name", "jcxmId").val(d.id)
			.appendTo(tr);
	$("<input type=\"hidden\" />").attr("name", "categoryId").val(listType)
			.appendTo(tr);
	$("<input type=\"hidden\" />").attr("name", "excutiveDept").appendTo(tr);
	$("<input type=\"hidden\" />").attr("name", "orderDetail").appendTo(tr);
	$("<input type=\"hidden\" />").attr("name", "note").appendTo(tr);
	$("<input type=\"hidden\" />").attr("name", "other").appendTo(tr);
	$("<input type=\"hidden\" />").attr("name","urgent").appendTo(tr);
	$("<input type=\"hidden\" />").attr("name", "preExam").appendTo(tr);
	var preExam = (o==null || !o.preExam) ? 0 : o.preExam;
	if (o != null) {
		tr.children("input[name=id]").val(o.id);
		tr.children("input[name=excutiveDept]").val(o.excutiveDept);
		tr.children("input[name=orderDetail]").val(getOrderDetail(o.id));
		tr.children("input[name=note]").val(o.note);
		tr.children("input[name=urgent]").val(o.urgent);
		tr.children("input[name=preExam]").val(preExam);
		count = o.shuliang;
	}
	var tdXMMC = $("<td />").click(function(){
		if(!$("#"+divId).is(":visible")){
			showItemInfo($(this).parent(),divId);
		}else{
			hiddenItemInfo();
		}
	}).text(d.xmmc).appendTo(tr);
	var sl = $("<input />").attr("name", "count").val(count).data("val",count).focusin(
			function() {
				$(this).data("count", $(this).val());
			}).blur(function(){
				if($(this).val()!=$(this).data("val")){
					setCHUZHI_FORM(false);
				}
			}).appendTo($("<td />").appendTo(tr));
	var tdPART;
	if (listType != CHUZHI_CATEGORY.otherExam) tdPART= $("<td />").appendTo(tr);
	var money;
	if(listType !=CHUZHI_CATEGORY.labTest){
		if(listType==CHUZHI_CATEGORY.Qg_operation){
			money=$("<input />").attr("name", "money").val(0.0).data("val",0.0).focusin(
					function() {
						$(this).data("money", $(this).val());
					}).blur(function(){
						if($(this).val()!=$(this).data("val")){
							setCHUZHI_FORM(false);
						}
					}).appendTo($("<td />").appendTo(tr));
		}
		else
		money = $("<td />").text(d.price * count.toFixed(2)).appendTo(tr);
	}
		
	sl.blur(function() {
		var _n = parseInt($(this).data("count"));
		if (isNaN(sl.val()) || sl.val() == 0) {
			sl.val(_n);
			return;
		}
		var m;
		if(listType==CHUZHI_CATEGORY.Qg_operation){
			m=money.val();
		}
		else
			m = money.text();
		if (!m.length || isNaN(m))
			return;
		var n = parseInt(sl.val());
		var _m = parseFloat(m);
		m = (((_m * 100 / _n) / 100) * n).toFixed(2);
		if(listType==CHUZHI_CATEGORY.Qg_operation){
			money.val(m);
		}
		else
			money.text(m);
	});
	if (listType == CHUZHI_CATEGORY.eyeExam||listType==CHUZHI_CATEGORY.Qg_operation||listType==CHUZHI_CATEGORY.operation) {
		var select = $("<select />").attr("name", "part").change(function(){
			var trThis = $(this).parent().parent();
			var fsTable = $("table#jcxmFushu_"+trThis.children("input[name=jcxmId]").val());
			if(!fsTable.length)return;
			setCHUZHI_FORM(false);
			setOrderDetailsAndMoney(trThis,fsTable);
			var yb = $(this).val();
			$("#"+divId).find(".jctsPaintTitleTag").text("");
			showJCTSPaint($(this).val(),trThis,$("#"+divId).children(".jctsPaintTag"));
		}).appendTo(tdPART);
		
		if(d.id!=1000001&&d.id!=1000003){
			$("<option />").val(oimsCategory.DOUBLE_EYE).text("双眼").appendTo(select);
		}
		if(d.id!=1000002&&d.id!=1000004){
			$("<option />").val(oimsCategory.LEFT_EYE).text("左眼").appendTo(select);
			$("<option />").val(oimsCategory.RIGHT_EYE).text("右眼").appendTo(select);	
		}
		if (o != null) {
			setJCDData(tr, select, o);
		}
		tr.data("leftPicPath", d.leftPicPath).data("rightPicPath",
				d.rightPicPath);
		var price=0;
		if(o!=null){
//			price = getExamEYEPrice(d.id,o.part);
			if(listType!=CHUZHI_CATEGORY.Qg_operation)
				money.text(o.price);
			else
				money.val(o.price);
		}
		if(temp1){
			select.val(temp1);
		}
	} else if (listType == CHUZHI_CATEGORY.otherExam) {
		$("<input type=\"hidden\" name=\"part\" />").prependTo(tr);
	} else if (listType == CHUZHI_CATEGORY.labTest) {
	//	$("<input type=\"hidden\" name=\"part\" />").appendTo(tdPART);
		var select = $("<select />").attr("name", "part").change(function(){
			setCHUZHI_FORM(false);
		}).appendTo(tdPART);
		var result = getJSONData(FIND_SAMPLE_URL, {
			jcxmId : d.id
		});
		if (result.state)
			$.each(result.obj, function(i, s) {
				var o = $("<option />").attr("value", s.id).text(s.sampleName)
						.appendTo(select);
				if (s.id == d.sampleId)
					o.attr("selected", "selected");
			});
		if(temp1){
			select.val(temp1);
		}
	}else if(listType==CHUZHI_CATEGORY.treat){
		var select = $("<select />").attr("name","part").change(function(){
			var trThis = $(this).parent().parent();
			var fsTable = $("table#jcxmFushu_"+trThis.children("input[name=jcxmId]").val());
			if(!fsTable.length)return;
			setCHUZHI_FORM(false);
			setOrderDetailsAndMoney(trThis,fsTable);
		}).appendTo(tdPART);
		$("<option />").val(oimsCategory.DOUBLE_EYE).text("双眼").appendTo(select);
		$("<option />").val(oimsCategory.LEFT_EYE).text("左眼").appendTo(select);
		$("<option />").val(oimsCategory.RIGHT_EYE).text("右眼").appendTo(select);
		$("<option />").val(oimsCategory.CI).text("次").appendTo(select);
		if(temp1){
			select.val(temp1);
		}
	}
	if(o!=null){
		tr.find("select[name=part]").val(o.part);
	}
	addItemInfo(tr, tag.parent(),divId,temp2);
	if(listType==CHUZHI_CATEGORY.Qg_operation&&o)
		tr.children("td:last").find('input').val(o.price);
	tr.children('td').not($('select').parent()).mouseover(function() {
	//	if (!tr.hasClass("a_showJCTS"))
			tr.children("td").addClass("on");
	}).mouseout(function() {
		if (!tr.hasClass("selected"))
			tr.children("td").removeClass("on");
	}).toggle(function() {
		tr.addClass("selected");
		tr.addClass("on");
	//	hiddenItemInfo();
		showItemInfo($(this),divId);
	}, function() {
		tr.removeClass("selected");
		tr.removeClass("on");
		hiddenItemInfo();
	});
	showItemInfo(tr,divId);
	if(o){$(".jckdJcTsDiv").css({"display":"none"});}
	if (o&&o.jifeiFlag) {
		tr.css('color','red');
		tr.data('jifei',1);
		tr.addClass("yijifei");
	} else if(preExam==1){
		tr.addClass("yqStyle");
	}
}

/**
 * 显示项目提示
 * @param tr
 */
function showItemInfo(tr,divId) {
	hiddenItemInfo();
	$("div.jckdJcTsDiv").hide();
//	tr.children("td").addClass("showJCTS");
//	tr.children("td").children().addClass("showJCTS");
	$("#" + divId).show();
}

/**
 * 关闭项目提示
 */
function hiddenItemInfo(){
//	$(".showJCTS").removeClass("showJCTS");
	$("div.jckdJcTsDiv").hide();
}

/**
 * 插入项目提示
 * @param tr
 * @param showTag
 * @param divId
 * @param dept 通过套餐添加的执行科室
 */
function addItemInfo(tr, showTag,divId,dept){
	var div = $("#" + divId);
	if (div.length) {
		showLog("divId exists:"+divId);
		setOrderDetailsAndMoney(tr,div.children("table"));
		return;
	}
	var ts = $("div.tabRight:visible");
	var p = ts.position();
	var left = winWidth-ts.outerWidth();
	div = $("<div />").addClass("jckdJcTsDiv").attr("id", divId).css({
		top : p.top,
		left : left
	}).width(ts.width()-8).height(ts.height()-8).hide()
			.appendTo(showTag);
	$('<div style="float:left;width:50px;height:30px;border:1px solid red;text-align:center;font-size:initial" >隐藏</div>').appendTo(div).click(function(){
		div.css({'display':'none'});
	});
	$("<h1 />").text(tr.data("xmmc")).appendTo(div);
	var listType = tr.data("listType");
	showOptions(tr, div);
	showNoteInput(tr, div);
	showZhixingkeshi(tr, div,dept);
	var check = tr.children("input[name=urgent]").val().toLowerCase()=="true";
	var jiajiCheckbox = $("<input type=\"checkbox\" style=' width: 25px;height: 25px;'/>").attr("id","jiajijiancha").attr("checked",check).blur(function(){
		var x = $(this).attr("checked");
		//console.log("checked:"+x);
		if(tr.children("input[name=urgent]").val()!=$(this).is(":checked")){
			setCHUZHI_FORM(false);
		}
		tr.children("input[name=urgent]").val($(this).is(":checked"));
	}).appendTo(div);
	div.append('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
	$("<label style='font-size: 12px;font-weight: bolder;'/>").attr("for","jiajijiancha").text("加急").appendTo(div);
	if (listType == CHUZHI_CATEGORY.eyeExam) {
		showEYEItemInfo(tr, div);
		return;
	}
}

/**
 * 显示检查要求输入框
 * @param tr
 * @param showTag
 */
function showNoteInput(tr, showTag) {
	var jcyqTag = tr.find("input[name=note]");
	var normalTxt = "附加说明:";
	var jcyq = jcyqTag.val();
	if (!jcyq.length)
		jcyq = normalTxt;
	$("<div contenteditable=\"true\" hidefocus=\"true\" />").data("val",
			jcyqTag.val()).css("color", "#ccc").addClass("inputContent").blur(
			function() {
				var val = $(this).html();
				if (!val.length || htmIsEmpty(val)) {
					val = normalTxt;
					$(this).text(val).css("color", "#ccc");
					val = "";
				}
				if (val == $(this).data("val"))
					return;
				jcyqTag.val(val);
				setCHUZHI_FORM(false);
				$(this).data("val", val);
			}).focusin(function() {
		$(this).css("color", "#000")
		if ($(this).html().indexOf(normalTxt) != -1)
			$(this).text("");
	}).html(jcyq).appendTo(showTag);
}

function valIsInArray(arr,value){
	for(var i = 0; i < arr.length; i++){
        if(value === arr[i]){
            return true;
        }
    }
    return false;
}

/**
 * 显示主界面
 * @param tag1
 * @param tag2
 */
function showExamLayout(tag1, tag2) {
	importJS("/emr/js/chuzhi_eye.js");
	var search = $("<div />").attr("id", "searchExamDiv").addClass("searchDiv").appendTo(tag2);
	var h = tag2.innerHeight() - search.outerHeight();
	var examItemDiv = $("<div />").attr("id", "examListDiv").addClass(
			"examList").height(h / 2).appendTo(tag2);
	var btnDiv = $("<div />").text("开出的项目").addClass("btnDiv").appendTo(tag2);
	var pdd = $("<div />").attr("id", "patientExamDiv").addClass(
			"patientDisease").height(
			h - examItemDiv.outerHeight() - btnDiv.outerHeight())
			.appendTo(tag2);
	var t = $("<div />").addClass("deptList").addClass("categoryClass").height(examItemDiv.innerHeight())
			.appendTo(examItemDiv);
	$("<div />").addClass("itemListDiv").height(t.height()).appendTo(
			examItemDiv);
	var h = $("<h1 />").text("常用套餐").appendTo(tag1);
	importJS("/emr/js/taocan.js");
	showTaocanList(tag1);
	var ul = $("<ul />").appendTo(t);
	ypArr = null;
	
	
	$.each(chilredSelectObj, function(i, d) {
		initSearchChuzhiItemForm(d.id);
		var chuzhiid=d.id;
		
		var li = $("<li />").data("id",d.id).appendTo(ul);
		var a = $("<a />").text(d.category).data("listType", d.id).click(
				function() {
					
					if(chuzhiid == 4){
						//  这里查询当天的处方信息  弹出显示框
						var jiuzhens = getJSONData("/publish/jiuzhen/toDayJiuZhenByHzid.htm",{huanzheId:currentVisit.huanzheId},'POST');
						if(jiuzhens.state && jiuzhens.obj != null){
							var yaopinStr = "";
							ypArr = new Array();
							$.each(jiuzhens.obj,function(ci,cv){
								if(cv.id != currentVisit.id){
									var cfinfos = getJSONData("/publish/chufang/findChufang.htm",{jiuzhenId:cv.id},null);
									if(cfinfos != null && cfinfos.state && cfinfos.obj != null){
										$.each(cfinfos.obj,function(fi,fv){
											var qds = fv.qindan;
											$.each(qds,function(qdi,qdv){
												if(yaopinStr == ""){
													yaopinStr = qdv.yaoming;
												}else{
													if(yaopinStr.indexOf(qdv.yaoming) == -1){
														yaopinStr += ","+qdv.yaoming;
													}
												}
												
												var drugStock = getJSONData("/publish/chufang/findDrugStore.htm",{drugStockId:qdv.yaopinId},"POST");
												if(drugStock != null && drugStock.state && drugStock.obj != null){
													
													if(!valIsInArray(ypArr,drugStock.obj.drugDictId)){
														ypArr.push(drugStock.obj.drugDictId);
													}
												}
											});
										});
									}
								}
							});
							if(yaopinStr != ""){
								$.oimsAlert("今天已开出的药品："+yaopinStr);
							}
						}
					}
					
					var id = $(this).data("listType");
					if ($(this).hasClass("selected")){
						return;
					}
					$("#search_chuzhi_item_form_"+d.id).children("input[name=search]").val("");
					if(id==CHUZHI_CATEGORY.follow){
						importJS("/emr/js/chuzhi_suifang.js");
						return showFollow(); 
					}
					ul.find("a.selected").removeClass("selected");
					$(this).addClass("selected");
					showSearchCategory(id);
					showItemList();
				}).appendTo(li);
		var form = $("<form />").attr("method", "post").addClass("chuzhiForm").attr("id", "chuzhiForm_" + d.id).ajaxForm({
					beforeSubmit:function(c){
						if(CHUZHI_SAVEING[findChuZhiKey(chuzhiid)])
							return false;
						dataInTransit("chuzhiForm_"+chuzhiid);
						CHUZHI_SAVEING[findChuZhiKey(chuzhiid)]=true;
					},
					dataType : "json",
					success : function(re) {
						CHUZHI_SAVEING[findChuZhiKey(chuzhiid)] = false;
						var title=$("#examListDiv").children(".deptList").find("a.selected").text();
						//如果后台返回了保存失败（没有Order_no的开单）那么不能进行打印
						if(!re.state){
							$.oimsError(title+'保存失败!');
						}
						else {
							setCHUZHI_FORM(true,chuzhiid);//设置此类型处置为已提交
							refreshOrderList(d.id);
//							setCHUZHI_ING(false,chuzhiid);//设置此类型处置为已处置（切换标签不需要再次提交）
							if(saveAndPrint){
								//判断listTypes是否为空
								if(!listTypes.length){
									//TODO 判断CHUZHI_FORM(除了处方外)是否都提交了true，如果都提交成功了，那么调用新的打印方法
									var b=true;
									$.each(CHUZHI_FORM,function(key,value){
										if(key!='prescribe'){
											if(!value){
												b=false;
												return false;
											}
										}
									});
									if(b){
										printComboList(listTypes_combo);
										//listTypes=[];
										listTypes_combo=[];
										saveAndPrint=false;
										comboSubmit=false;
									}
								}
								else{
									//继续提交套餐中的其他类型
									$.each(listTypes,function(){
										var lt=this;
										$.each($("#examListDiv .deptList").children('ul').children('li').children('a'),function(){
											if(parseInt($(this).data('listType'))==parseInt(lt)){
												$(this).click();
												return false;
											}
										});
										//保存并打印相应类型处置
										chuzhiFormSubmit();
										//TODO 从listTypes中移除掉此type,下次不用再提交
										listTypes.shift();
										//先提交第一个
										return false;
									});
								}
								
							}
							if(printAfterSave){
								if(chuzhiFormIsSubmit()){
									printOrders();
									printAfterSave=false;
								}
							}
							if(printAfterSaveChoose){
								if(chuzhiFormIsSubmit()){
									printOrders('choose');
									printAfterSaveChoose=false;
								}
							}
							if(yqprintAfterSaveChoose){
								if(chuzhiFormIsSubmit()){
									printOrders('yqchoose');
									yqprintAfterSaveChoose=false;
								}
							}
							//TODO 1.点击了病例预览标签页2.CHUZHI_FORM中每个选项都为true
							if(_emr_preview_click){
								var okpreview=true;
								$.each(CHUZHI_FORM,function(i,n){
									if(!n){
										okpreview=false;
										return false;
									}
								});
								//只有所有都提交了
								if(okpreview){
									_emr_preview();
									_emr_preview_click=false;
								}
							}
							//
							if(chuzhiid==CHUZHI_CATEGORY.prescribe){
								if(re.obj&&re.obj.length){
									var l=re.obj;
									var trs=$("#chuzhiForm_"+chuzhiid).children('table').find('tr:gt(0)');
									$.each(trs,function(i,n){
										var yaopinId1=$($(n).find('input[name=id]')[0]).val();
										var b=true;
										$.each(l,function(j,m){
											if(yaopinId1==m){
												$(n).css('color','red');
												$(n).addClass("yijifei");
												b=false;
												return false;
											}
										});
										if(b)$(n).removeAttr('color');
									});
								}
							}
							
						}
						transferComplete("chuzhiForm_"+chuzhiid);
					}
		}).hide().appendTo(pdd);

		$("<input />").attr("type", "hidden").attr("name", "huanzheId").val(
				currentVisit.huanzheId).appendTo(form);
		$("<input />").attr("type", "hidden").attr("name", "jiuzhenId").val(
				currentVisit.id).appendTo(form);
		$("<input />").attr("type","hidden").attr("name","fenzhenkaidan").val(fenzhenkaidan).appendTo(form);
		$("<input />").attr("type","hidden").attr("name","listType").val(d.id).appendTo(form);
		
		var tr = $("<tr />").appendTo($("<table>").appendTo(form));
		$.each(d.listTitle, function(n, t) {
			var th = $("<th />").text(t.title).appendTo(tr);
			if (t.width != undefined)
				th.width(t.width);
		});
		if (d.id == CHUZHI_CATEGORY.prescribe) {
			form.attr("action", contextPath + SAVE_CHUFANG_URL);
			importJS("/emr/js/chuzhi_chufang.js");
			showPatientPrescribe(d.id);
		} else {
			form.attr("action", contextPath + SAVE_ORDERS_URL);
			addPatientExam(d.id);
		}
		if (i === 0) {
			a.addClass("selected");
			showSearchCategory(d.id);
		}
		if(/*d.id!=CHUZHI_CATEGORY.prescribe && d.id!=CHUZHI_CATEGORY.follow && d.id!=CHUZHI_CATEGORY.eyeExam&&*/d.id==CHUZHI_CATEGORY.labTest||d.id==CHUZHI_CATEGORY.otherExam){
			var selectShowTag = $("#search_chuzhi_item_form_"+d.id);
			var option = {
					selectShowTag:selectShowTag,
					showType:1,
					keepSelected:true,
					callback:function(id,bgsId,cyxm){
						showSearchCategory(d.id);
						selectShowTag.children("input[name=categoryId]").val(id);
						selectShowTag.children("input[name=bgsId]").val(bgsId);
						selectShowTag.children("input[name=currentPage]").val(1);
						selectShowTag.children("input[name=pageSize]").val(100);
						selectShowTag.children("input[name=search]").val("");
						selectShowTag.children("input[name=cyxm]").val(cyxm);
						showItemList();
					}
			};
			if(d.id==CHUZHI_CATEGORY.labTest)option.showType=2;
			li.emrMenu(option);
		}
		if(parseInt(fenzhenkaidan)&&(chuzhiid==CHUZHI_CATEGORY.otherExam||chuzhiid==CHUZHI_CATEGORY.labTest||chuzhiid==CHUZHI_CATEGORY.prescribe||chuzhiid==CHUZHI_CATEGORY.follow)){
			li.css({'display':'none'});
		}
	});

	var btn = $("<div />").addClass("btn").appendTo(btnDiv);
	var div_save_combo=$('<div style="float:left"/>').appendTo(btn);
	//20190403 按苗老师要求 去掉 存为套餐
	/*var save=$("<a style='width:80px'/>").append("<span class=\"combo\" />存为套餐").click(function(){
		createSaveComboDiv($(this));
	}).appendTo(div_save_combo);*/
	var clickEnabled = true;
	$("<a style='width:80px'/>").append("<span class=\"print\" />打印清单").click(function(){
		if (!clickEnabled) return;
		clickEnabled = false;
		//13眼科检查 14全院检查 15检验
		var emrOrderMap = getJSONData("/publish/emrOrder/findOrder.htm",{visitId:currentVisit.id,tag : Math.random()},'POST');
		if(emrOrderMap != undefined && emrOrderMap != null && emrOrderMap.state){
			var ykexam = "";
			var qyexam = "";
			var jyexam = "";
			$.each(emrOrderMap.obj,function(i,v){
				if(v.order.preExam != null && v.order.preExam ==1){
					switch(v.order.categoryId){
					case 13:
						if(ykexam == ""){
							ykexam = new Array();
						}
						ykexam.push(v.order.itemName);
						break;
					case 14:
						if(qyexam == ""){
							qyexam = new Array();
						}
						qyexam.push(v.order.itemName);
						break;
					case 15:
						if(jyexam == ""){
							jyexam = new Array();
						}
						jyexam.push(v.order.itemName);
						break;
					}
				}
			});
			if(ykexam == "" && qyexam == "" && jyexam == ""){
				alert("打印院前检查清单，请确认是否有开院前检查！");
			}else{
				//TODO 打印院前清单
				var win = showPrintWindow();
				var page = $("<div />").addClass("printPage").appendTo(win);
				var yqpdiv = $("<div />").addClass("yqDiv").appendTo(page);
				var table1 = "<table border='0' width='90%' style='margin:0 auto;'><tr><td colspan='4' style='text-align:center; font-size:26px; font-weight:bold;'>院前检查清单</td></tr>";
				    table1 += "<tr><td width='25%'>ID  号："+currentPatient.binglihao+"</td><td width='25%'>姓名："+currentPatient.xingming+"</td><td width='25%'>性别："+currentPatient.sex+"</td><td width='25%'>住院号：</td></tr><tr><td colspan='4'><hr /></td></tr></table>";
				$(table1).appendTo(yqpdiv);
				var table2 = "<table border='1' width='90%' style='margin:0 auto;'><tr><th>类别</th><th>序号</th><th>项目名称</th><th>检查类别</th><th>检查子类</th><th>数量</th><th>执行科室</th></tr>";
				var xuhaoNum = 0;
				$.each(ykexam,function(ki,kv){
					xuhaoNum += 1;
					table2 += "<tr><td>眼科检查</td><td>"+xuhaoNum+"</td><td>"+kv+"</td><td></td><td></td><td></td><td></td></tr>";
				});
				$.each(qyexam,function(ki,kv){
					xuhaoNum += 1;
					table2 += "<tr><td>全院检查</td><td>"+xuhaoNum+"</td><td>"+kv+"</td><td></td><td></td><td></td><td></td></tr>";
				});
				$.each(jyexam,function(ki,kv){
					xuhaoNum += 1;
					table2 += "<tr><td>检验</td><td>"+xuhaoNum+"</td><td>"+kv+"</td><td></td><td></td><td></td><td></td></tr>";
				});
				table2 += "</table>";
				$(table2).appendTo(yqpdiv);
			}
		}else{
			alert("请确认是否有开单信息！");
		}
		clickEnabled = true;
	}).appendTo(div_save_combo);

	$("<a />").append("<span class=\"advsumit\" /> 保存").click(function() {
		if (!clickEnabled) return;
		clickEnabled = false;
		chuzhiFormSubmit();
		clickEnabled = true;
	}).appendTo(btn);
	$("<a />").append("<span class=\"del\" /> 删除").click(function() {
		if (!clickEnabled) return;
		clickEnabled = false;
		$.oimsConfirm({strTitle:'确认要删除选中项目么？'},function(){
			deleteItems();
		});
		clickEnabled = true;
	}).appendTo(btn);
	$("<a />").append("<span class=\"print\" />打印").click(function() {
		if (!clickEnabled) return;
		clickEnabled = false;
		if(chuzhiFormIsSubmit())
			printOrders();
		else{
				printAfterSave=true;
				chuzhiFormSubmit();
//				setTimeout(function(){
//					if(chuzhiFormIsSubmit())
//						printOrders();
//				},2000);
		}
		clickEnabled = true;
	}).appendTo(btn);
	$("<a style='width:80px'/>").append("<span class=\"print\" />打印选中").click(function() {
		if (!clickEnabled) return;
		clickEnabled = false;
		if(chuzhiFormIsSubmit())
			printOrders('choose');
		else{
				printAfterSaveChoose=true;
				chuzhiFormSubmit();
//				setTimeout(function(){
//					if(chuzhiFormIsSubmit())
//						printOrders('choose');
//				},2000);
		}
		clickEnabled = true;
	}).appendTo(btn);
	
	//需判断 眼科检查 全院检查以及化验
	$("<a style='width:80px'/>").append("<span class=\"print\" />院前打印").click(function() {
		if (!clickEnabled) return;
		clickEnabled = false;
		var	yqlistType= $("#examListDiv .deptList a.selected").data("listType");
		if(yqlistType == CHUZHI_CATEGORY.eyeExam || yqlistType == CHUZHI_CATEGORY.otherExam || yqlistType == CHUZHI_CATEGORY.labTest || yqlistType == CHUZHI_CATEGORY.prescribe){
			var table = $("form.chuzhiForm:visible").children("table");
			if(table.find("tr").hasClass("selected")){
				var yqflag = false;
				$.each(table.find("tr"),function(){
					if($(this).hasClass("selected")){
						if($(this).find("input[name='preExam']").length > 0){
							if($(this).find("input[name='preExam']").val() == 0){
								$(this).find("input[name='preExam']").val("1");
								$(this).addClass("yqStyle");
								yqflag = true;
							}
						}
					}
				});
				if(yqflag){
					yqprintAfterSaveChoose = true;
					chuzhiFormSubmit();
				}else{
					if(chuzhiFormIsSubmit())
						printOrders('yqchoose');
					else{
						yqprintAfterSaveChoose = true;
						chuzhiFormSubmit();
					}
				}
			}else{
				alert("未选中院前打印项目");
			}
			
		}else{
			alert("请确认项目是否可以院前打印！");
		}
		clickEnabled = true;
	}).appendTo(btn);
}

function chuzhiFormSubmit(listType){
	if(listType==undefined || listType==null){
		listType=$("#examListDiv .deptList a.selected").data("listType");
		if(listType==CHUZHI_CATEGORY.Qg_operation){
			var trs=$("#chuzhiForm_"+listType).children('table').find('tr:gt(0)');
			var flag_qg=true;
			$.each(trs,function(i,n){
				var money=$(n).find('input[name=money]').val();
				if(isNaN(money)||money<=0){
					flag_qg=false;
					return false;
				}
			});
			if(!flag_qg){
				$.oimsAlert("手术费用不正确请再次输入");
				return;
			}
		}
	}
		
	if(listType==CHUZHI_CATEGORY.prescribe){
		if(!chufangValidation(listType))return;
	}
	CHUZHI_SAVE_NO_MSG[findChuZhiKey(listType)]=false;
	$("form.chuzhiForm:visible").submit();
}

function findChuZhiKey(listType){
	var key;
	switch(listType){
	case CHUZHI_CATEGORY.prescribe:
		key = 'prescribe';
		break;
	case CHUZHI_CATEGORY.eyeExam:
		key ='eyeExam';
		break;
	case CHUZHI_CATEGORY.follow:
		key= 'follow';
		break;
	case CHUZHI_CATEGORY.labTest:
		key = 'labTest';
		break;
	case CHUZHI_CATEGORY.otherExam:
		key = 'otherExam';
		break;
	case CHUZHI_CATEGORY.treat:
		key = 'treat';
		break;
	}
	return key;
}
/**
 * 处置表单是否已提交
 * @param listType
 */
function chuzhiFormIsSubmit(listType){
	if(listType==undefined || listType==null)
		listType=$("#examListDiv .deptList a.selected").data("listType");
	var result = true;
	switch(listType){
		case CHUZHI_CATEGORY.prescribe:
			result = CHUZHI_FORM.prescribe;
			break;
		case CHUZHI_CATEGORY.eyeExam:
			result = CHUZHI_FORM.eyeExam;
			break;
		case CHUZHI_CATEGORY.follow:
			result= CHUZHI_FORM.follow;
			break;
		case CHUZHI_CATEGORY.labTest:
			result = CHUZHI_FORM.labTest;
			break;
		case CHUZHI_CATEGORY.otherExam:
			result = CHUZHI_FORM.otherExam;
			break;
		case CHUZHI_CATEGORY.treat:
			result = CHUZHI_FORM.treat;
			break;
		case CHUZHI_CATEGORY.operation:
			result = CHUZHI_FORM.operation;
			break;
		case CHUZHI_CATEGORY.Qg_operation:
			result = CHUZHI_FORM.Qg_operation;
			break;
	}
	if(!result){
		result = $("#chuzhiForm_"+listType).children("table").find("tr").length==1;
	}
	return result;
}

/**
 * 删除项目
 */
function deleteItems() {
	var form = $("form.chuzhiForm:visible");
	var flag=true;
	$.each(form.children("table").find("tr.selected"), function(i, tr) {
		tr = $(tr);
		// var id = tr.data('id');
		// var jiFei_flag = checkOrderJiFeiStatus(id);

		if(tr.data('jifei')){
			$.oimsAlert(tr.text() + '已缴费无法删除');
			return false;
		}
		var selectClass = tr.attr("id");
		if (tr.data("listType") == CHUZHI_CATEGORY.prescribe) {
			$(".itemListDiv tr." + selectClass).removeClass("on");
		} else {
			$(".itemListDiv a." + selectClass).removeClass("on");
		}
		$('#jctsDiv_'+$(tr).children('input[name=jcxmId]').val()+'_'+tr.data('listType')).remove();
		
		//直接删除删除后台数据
		if(tr.data("listType") == CHUZHI_CATEGORY.prescribe){
			var yaopinId=$(tr).children("input[name=id]").val();
			var obj=getJSONData(DELETE_EMRCHUFANGQINDAN,{jiuzhenId:currentVisit.id,yaopinId:yaopinId},'POST');
			if(obj.state){
				if(obj.obj&&obj.obj.length){
					//提示由于缴费不能删除的药品
					var l=obj.obj;
					var b=true;
					$.each(l,function(i,n){
						if(n==yaopinId){
							tr.css('color','red');
							tr.addClass("yijifei");
							b=false;
							return false;
						}
					});
					if(b)tr.remove();
				}else{
					tr.remove();
				}
			}
		}else{
			var jcxmId=$(tr).children('input[name=jcxmId]').val();
			var obj=getJSONData(DELETE_EMROrder,{jiuzhenId:currentVisit.id,jcxmId:jcxmId},'POST');
			if(obj.state){
				tr.remove();
			}
		}
	});
	setCHUZHI_FORM(false);
	hiddenItemInfo();
}
//var comboList=[{id:1,tcmc:'慢性类囊炎',taocanXM:[{id:1,taocanId:1,xmType:5,xmId:1000027,shuliang:1.0},{id:2,taocanId:1,xmType:13,xmId:1970,shuliang:1.0},{id:5,taocanId:1,xmType:15,xmId:2079,shuliang:1.0}]},{id:2,tcmc:'测试',taocanXM:[{id:3,taocanId:2,xmType:5,xmId:1000027,shuliang:1.0},{id:4,taocanId:2,xmType:13,xmId:1970,shuliang:1.0}]}];

/**
 * 插入患者已有检查项目
 * @param listType
 */
function addPatientExam(listType) {
	var result = getJSONData(FIND_ORDER_URL, {
		visitId : currentVisit.id,
		categoryId : listType//,
		//jiaofei:0
	}, "POST");
	if (!result.state || !result.obj.length)
		return;
	$.each(result.obj, function(i, d) {
		if(d.order.kdys==parent.window.currentStaff.gonghao)
		addExam(d.jcxm, d.order.shuliang, listType, false, d.order);
	});
	setCHUZHI_FORM(true,listType);
}

function refreshOrderList(listType){
	var tag = $("form#chuzhiForm_" + listType).children("table");
	tag.children("tbody").children("tr").not(":first").remove();
	if (listType == CHUZHI_CATEGORY.prescribe) {
		showPatientPrescribe(listType);
	} else {
		addPatientExam(listType);
	}
}

/**
 * 根据EMROrder的ID查询对应的检查在HIS/LIS上的缴费状态
 */
function checkOrderJiFeiStatus(id) {
	var result = getJSONData(FIND_ORDER_HIS_JIFEI_STATUS,{id : id},"POST");
	if (null == result.state || null == result.obj){
		$.oimsAlert('查询该条目缴费信息异常');
		return false;
	}
	return result.obj;
}