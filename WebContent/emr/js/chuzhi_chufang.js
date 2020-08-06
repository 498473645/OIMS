var GET_DRUG_DICT_URL="/publish/chufang/getDrugDictInfo.htm";
var GET_DRUG_STOCK_URL="/publish/chufang/findDrugStoreList.htm";

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
	$("<td />").text(d.drugName).appendTo(tr);
	$("<td />").text(d.packageSpec).appendTo(tr);
	$("<td />").text(d.packageUnits).appendTo(tr);
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
	var tdYl = $("<td />").text(yldw).appendTo(tr);
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