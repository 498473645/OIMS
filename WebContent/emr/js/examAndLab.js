var EXAM_EYE_LIST_URL = "/publish/jcxm/findJcxmList.htm";
//var EXAM_OTHER_LIST_URL = "/publish/emr/findExamItems.htm";
var EXAM_SAVE_OR_UPDATE_URL = "";
var JCTS_PAINT_SAVE_URL = "/publish/emr/saveJCTSPaint.htm";
var GET_EYE_JCXM_PRICE_URL = "/publish/emr/getPriceByJcxmIdAndEyE.htm";
var FIND_ZHIXING_KESHI_URL = "/publish/jcxm/findJcxmZhixingkeshi.htm";
var FIND_SAMPLE_URL = "/publish/jcxm/findJcxmSample.htm";
var FIND_JCXM_OPTIONS_URL = "/publish/jcxm/findJcxmOptions.htm";
var showPrescriptionsURL = "/publish/emr/showPrescriptions.htm";
var FIND_ORDER_URL = "/publish/emrOrder/findOrder.htm";
var FIND_ORDER_DETAIL_URL = "/publish/emrOrder/findOrderDetails.htm";
var SAVE_ORDERS_URL = "/publish/emrOrder/saveOrder.htm";
var SAVE_CHUFANG_URL = "/publish/chufang/saveChufang.htm";
var FIND_CHUFANGQINDAN_URL = "/publish/chufang/findChufangQindan.htm";
var FIND_CF_YONGFA_URL = "/publish/emr/findAdministrations.htm";
var FIND_CF_PINGLV_URL = "/publish/emr/findFrequencys.htm";
var FIND_SUIFANG_URL = "/publish/_emr/findSuifang.htm";
var yfArray, plArray;
var getInspectPhotoUrl = '/publish/emr/getInspectPhoto.htm';
var FIND_EYE_JIANCHASHI_URL="/publish/_emr/findEYEJianchashi.htm";
var FIND_CATEGORY_URL = "/publish/category/findCategorysByFatherId.htm";
var jctsPaintMovie = null;

/**
 * 显示搜索分类
 */
function showSearchCategory(listType){
	$("#searchExamDiv").text("");
	var url =EXAM_EYE_LIST_URL;
	if(listType==CHUZHI_CATEGORY.prescribe){
		url = showPrescriptionsURL;
	}
	var normalText = "请输入关键字按回车";
	var form = $("<form />").attr("action",contextPath+url).attr("method","post").ajaxForm({
		dataType : "json",
		success : function(d) {
			var search = form.children("input[name=search]");
			var val = $.trim(search.val());
			if(val==""){
				search.val(normalText);
			}
			search.data("val",val);
			if(!d.state){
				$.oimsError("向后台请求数据失败！");
				return;
			}
			initItemListData(d);
		}
	}).appendTo("#searchExamDiv");
	$("<input type=\"hidden\" name=\"categoryId\" value=\""+listType+"\" />").appendTo(form);
	$("<input type=\"hidden\" name=\"bgsId\" />").appendTo(form);
	$("<input type=\"hidden\" name=\"currentPage\" value=\"1\" />").appendTo(form);
	$("<input type=\"hidden\" name=\"pageSize\" value=\"100\" />").appendTo(form);
	$("<input />").attr("name","search").data("listType", listType).css("color","#ccc").focusin(function(){
		$(this).css("color","#000");
		if($.trim($(this).val())==normalText)$(this).val("");
	}).blur(function(){
		var search = $.trim($(this).val());
		if(search==normalText|| !search.length){
			$(this).val(normalText).css("color","#ccc");
		}
		form.submit();
	}).keyup(function(e){
		if(e.keyCode==13){
			$(this).blur();
		}
	}).appendTo(form);

}
/**
 * 获取随访记录数据
 * @returns
 */
function getSuifang(){
	var data = getJSONData(FIND_SUIFANG_URL,{jiuzhenId:currentVisit.id});
	return data.obj;
}

var CHUZHI_CATEGORY={
		eyeExam:13,//眼科检查
		otherExam:14,//其它检查
		labTest:15,//化验
		prescribe:4,//处方
		treat:5,//治疗
		follow:6//处置
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
	}, {
		title : "部位",
		width : 100
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
	} ]
}, {
	category : "处方",
	id : 4,
	intr : "prescribe",
	listTitle : [ {
		title : "药品名称"
	}, {
		title : "规格",
		width : 80
	}, {
		title : "单位",
		width : 50
	}, {
		title : "数量",
		width : 50
	}, {
		title : "金额",
		width : 80
	}, {
		title : "用法",
		width : 100
	}, {
		title : "用量",
		width : 50
	}, {
		title : "频率",
		width : 100
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
},
  {
                    	   category:"随访",
                    	   id:6,
                    	   intr:"follow",
                    	   listTitle:[]
                       }
 ];

/**
 * 切换TAB入口
 * 
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
	var form = $("#searchExamDiv").children("form");
	$("#examListDiv").children(".categoryClass").children("ul").emrMenuList(form,function(id,bgsId){
		 form.children("input[name=categoryId]").val(id);
		 form.children("input[name=bgsId]").val(bgsId);
		 form.children("input[name=currentPage]").val(1);
		 form.children("input[name=pageSize]").val(100);
		////console.log(id+","+bgsId);
		form.submit();
	});
}

/**
 * 显示处方项目列表
 */
function showPrescribeItemList(result) {
//	var result = getJSONData(showPrescriptionsURL, {
//		currentPage : 1,
//		pageSize : 30,
//		search : $("#")
//	}, "POST");
	var showTag = $(".itemListDiv");
	var listType = $("#examListDiv .deptList a.selected").data("listType");

	if (!result.state)
		return;
	var listObj = [ {
		"title" : "药品名称"
	}, {
		"title" : "规格",
		width : 90
	}, {
		"title" : "单位",
		width : 50
	}, {
		"title" : "单价",
		width : 50
	}, {
		"title" : "库存",
		width : 50
	} ];

	var tableBody = $('<table />').appendTo(showTag);
	var tr = $("<tr />").appendTo(tableBody);
	$.each(listObj, function(i, d) {
		var th = $("<th />").text(d.title).appendTo(tr);
		if (d.width != undefined)
			th.width(d.width);
	});
	$.each(result.obj.list, function(i, d) {
		var tr = $("<tr />").appendTo(tableBody);
		var t0 = $("<td />").text(d.drugName).appendTo(tr);
		var t1 = $("<td />").text(d.drugSpec).appendTo(tr);
		var t2 = $("<td />").text(d.doseUnits).appendTo(tr);
		var price = d.price.toFixed(2);
		var t3 = $("<td />").text(price).appendTo(tr);
		var t4 = $("<td />").text(d.store).appendTo(tr);
		var className = "item_" + d.id + "_listType_" + listType;//item_1201010TA1_listType_4
		tr.addClass(className).click(function() {
			if ($(this).hasClass("on")) {
				$("#jctsDiv_" + d.id + "_eyeExam").hide().remove();
				$("tr#" + className).remove();
				$(this).removeClass("on");
				return;
			}
			$(this).addClass("on");
			addDrug(d, 1, listType);
		});
		if ($("tr#" + className).length)
			tr.addClass("on");
	});
}
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
function addDrug(d, num, listType, obj) {
	var tag = $("form#chuzhiForm_" + listType).children("table");
	var tr = $("<tr />").data('listType', listType).data("xmmc", d.drugName)
			.attr("id", "item_" + d.id + "_listType_" + listType)
			.appendTo(tag);
	$("<input type=\"hidden\" />").val(d.id).attr("name", "id").appendTo(tr);
	$("<td />").text(d.drugName).appendTo(tr);
	$("<td />").text(d.drugSpec).appendTo(tr);
	$("<td />").text(d.doseUnits).appendTo(tr);
	var td = $("<td />").appendTo(tr);
	var price = 0;
	if (d.price != null)
		price = (d.price * num).toFixed(2);
	$("<td />").text(price).appendTo(tr);
	var tdYf = $("<td />").appendTo(tr);
	var tdYl = $("<td />").appendTo(tr);
	var input = $("<input />").attr("name", "yongliang").appendTo(tdYl);
	if (obj != null)
		input.val(obj.yongliang);
	var tdPl = $("<td />").appendTo(tr);
	var s = $("<select />").attr("name", "yongfa").appendTo(tdYf);
	if (obj == null || !obj.yongfa.length)
		$("<option />").appendTo(s);
	$.each(yfArray.obj, function(i, data) {
		var o = $("<option />").text(data.dosageText).appendTo(s);
		if (obj != null && obj.yongfa == data.dosageText)
			o.attr("selected", "selected");
	});
	s = $("<select />").attr("name", "frequencys").appendTo(tdPl);
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
//		if(isNaN(v)){
//			$(this).val($(this).data("val"));
//			return;
//		}
		if (d.store < v) {
			if (!confirm("库存不足，确定要继续吗？")) {
				$(this).val($(this).data("val"));
			}
		}
		var price = v * $(this).data("price");
		$(this).parent().next().text(price.toFixed(2));
	}).appendTo(td);

	tr.mouseover(function() {
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
		// hideDrugInfo();
	});
}

/**
 * 显示药品说明书
 * 
 * @param tr
 * @param showTag
 */
function showDrugInfo(tr, showTag) {
	
}

function hideDrugInfo() {

}

/**
 * 显示治疗项目列表
 */
function showTreatItemList() {
	// TODO 治疗
}

/**
 * 显示执行执行科室表单
 * 
 */
function showZhixingkeshi(tr, tag) {
	var jcxmId = tr.children("input[name=jcxmId]").val();
	var result = getJSONData(FIND_ZHIXING_KESHI_URL, {
		jcxmId : jcxmId
	});
	if (!result.state || !result.obj.length)
		return;
	var val = tr.children("input[name=excutiveDept]").val();
	$("<label />").addClass("title").text("执行科室").appendTo(tag);
	var s = $("<select  />").height(25).attr("name", "zhixingkeshiSelected")
			.change(function() {
				tr.children("input[name=excutiveDept]").val($(this).val());
			}).appendTo(tag);
	$.each(result.obj, function(i, d) {
		var o = $("<option />").attr("value", d.id).text(d.bgs).appendTo(s);
		if (!val.length) {
			if (i == 0) {
				o.attr("selected", "selected");
				tr.children("input[name=excutiveDept]").val(d.id);
			}
		} else {
			if (d.id == val)
				o.attr("selected", "selected");
		}
	});
	tr.children("input[name=excutiveDept]").val(s.val());
}

/**
 * 显示项目附属
 * 
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
	$("<label />").addClass("title").text("附加项目").appendTo(tag);
	var t = $("<table />").width(tag.innerWidth()).appendTo(tag);
	var _new=orderDetails.length;
	$.each(result.obj, function(i, d) {
		var n = d.defaultNum;
		if(_new){
			orderDetails += d.id+"="+d.defaultNum;
		}
		var r = $("<tr />").appendTo(t);
		var td0 = $("<td />").appendTo(r);
		var a = $("<td />").text(d.xmmc).appendTo(r);
		var td = $("<td />").appendTo(r);
		if (i == 0) {
			td0.width(25);
			td.width(28);
		}
		var c = $("<input />").val(d.id).attr("type", "checkbox").click(
				function() {
					if (!d.chooseEnable)
						return false;
					chooseChange($(this));
				}).attr("checked", "checked").attr("name", "fsxmid").width(
				"100%").appendTo(td0);
		if (!d.chooseEnable) {
			c.attr("readonly", "readonly");
		} else {
			if (orderDetails.length > 1)
				n = isChoose(orderDetails, d.id);
			if (n == 0)
				c.removeAttr("checked");
		}
		var suliang = $("<input />").attr("name", "suliang").val(n).data("val",
				n).blur(function() {
			var n = $.trim($(this).val());
			var input = $(this).parent().parent().find("input[name=fsxmid]");
			if (!n.length || isNaN(n) || input.attr("checked") != "checked") {
				$(this).val($(this).data("val"));
				return;
			}
		}).width("100%").appendTo(td);
		if (!d.defaultNumChangeEnable) {
			suliang.attr("readonly", "readonly");
		}
	});

	function setShuliang(id, val) {
		var ds = tr.children("input[name=orderDetail]").val();
		var str = ds.split(",");
		var ns = [];
		for (var i = 0; i < str.length; i++) {
			var x = str[i].split("=");
			if (x[0] != id) {
				ns.push(str[i]);
			}
		}
		orderDetails = "";
		for (var i = 0; i < ns.length; i++) {
			if (i > 0)
				s += ",";
			s += ns[i];
		}
		tr.children("input[name=orderDetail]").val(
				orderDetails + "," + id + "=" + val);
	}

	function chooseChange(input) {
		var x = input.attr("selected") == "selected";
		var ds = tr.children("input[name=orderDetail]").val()
		if (x) {
			var sl = input.parent().parent().find("input[name=suliang]").val();
			tr.children("input[name=orderDetail]").val(
					ds + "," + input.val() + "=" + sl);
		} else {
			var str = ds.split(",");
			var ns = [];
			for (var i = 0; i < str.length; i++) {
				var x = str[i].split("=");
				if (x[0] != input.val()) {
					ns.push(str[i]);
				}
			}
			orderDetails = "";
			for (var i = 0; i < ns.length; i++) {
				if (i > 0)
					s += ",";
				s += ns[i];
			}
			tr.children("input[name=orderDetail]").val(orderDetails);
		}
	}

	function isChoose(orderDetails, id) {
		var n = 0;
		var str = orderDetails.split(",");
		for (var i = 0; i < str.length; i++) {
			var x = str[i].split("=");
			if (x[0] == id) {
				n = x[1];
				break;
			}
		}
		return n;
	}
}

/**
 * 获取眼科检查项目报价
 */
function getExamEYEPrice(id, eye) {
	var price =0.0;
	var d = getJSONData(GET_EYE_JCXM_PRICE_URL, {
		eye : eye,
		jcxmId : id
	}, "POST");
	if (d.state) {
		price = d.obj;
	}
	return price;
}

/**
 * 显示项目清单
 */
function showItemList() {
	var listType = $("#examListDiv .deptList a.selected").data("listType");
	
	showSearchCategory(listType);
	
	if(listType==CHUZHI_CATEGORY.follow){
		return showFollow(); 
	}
//	if(debugFlag)//console.log("listType:"+listType+",inputType:"+input.data("listType"));
//	if (search == input.data("val") && listType == input.data("listType"));
//		return;
	$("form.chuzhiForm").hide();
	$("form#chuzhiForm_" + listType).show();
//	if (listType == CHUZHI_CATEGORY.prescribe) {
//		return showPrescribeItemList($(".itemListDiv"), listType);
//	}	else {
	$("#searchExamDiv").children("form").submit();
//	}
}

function initItemListData(result){
	var listType = $("#examListDiv .deptList a.selected").data("listType");

	var tag = $("div.itemListDiv");
	tag.text("");
	if(listType==CHUZHI_CATEGORY.prescribe){
		return showPrescribeItemList(result);
	}
	var ul = $("<ul />").appendTo(tag);
	$.each(result.obj, function(i, d) {
		var li = $("<li />").width(
						(tag.parent().innerWidth() - $("div.deptList")
								.outerWidth()) / 2 - 8).appendTo(ul);
		var className = "item_" + d.id + "_listType_" + listType;
		var a = $("<a />").addClass(className).click(function() {
			if ($(this).hasClass("on")) {
				$("#jctsDiv_" + d.id + "_eyeExam").hide().remove();
				$("tr#" + className).remove();
				$(this).removeClass("on");
				return;
			}
			addExam(d, 1, listType);
			$(this).addClass("on");
		}).text(d.xmmc).appendTo(li);
		if ($("tr#" + className).length)
			a.addClass("on");
	});
}
function showFollow(){
	 var div=$("<div id='followed'/>");
	 div.oimsDialog({
			title : "随访时间与注意事项",
			width : 700,
			height : 450,
			drag : false,
			locked :true,
			winType : 4,
			button : null
		});
	 _emr_suifang_last(div);
}
function _emr_suifang_last(div){
	//debugger;
	var obj=getSuifang();
	var tag = $("<div />").addClass("tabContent").width(div.width()).css({overflow:"hidden","margin":"auto","border":"1px solid #d2d2d2"}).appendTo(div);
	$("<h1 />").text("随访时间").appendTo(tag);
	var suifang_time=$("<div style='height:auto'/>").addClass("inputContent").addClass("suifang").appendTo(tag);
	var div = $('<div style="width:60%;float:left" />').appendTo(suifang_time);//$("<div style='height:auto'/>").addClass("inputContent").addClass("suifang").appendTo(tag);
	var div1= $('<div style="width:39%;float:left;"/>').appendTo(suifang_time);
	var div1_time=$('<div style="text-align:center;" />').height(20).appendTo(div1);
	var p= $("<p />").css({margin:"8px"}).appendTo(div);
	$("<input />").val(1).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px'/>").text("1日后").appendTo(p);
	$("<input />").val(2).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px' />").text("2日后").appendTo(p);
	$("<input />").val(3).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px'/>").text("3日后").appendTo(p);
	$("<input />").val(4).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px'/>").text("4日后").appendTo(p);
	$("<input />").val(5).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px'/>").text("5日后").appendTo(p);
	
	p= $("<p />").css({margin:"8px"}).appendTo(div);
	$("<input />").val(7).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px'/>").text("1周后").appendTo(p);
	$("<input />").val(14).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px'/>").text("2周后").appendTo(p);
	$("<input />").val(21).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px'/>").text("3周后").appendTo(p);
	$("<input />").val(28).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px'/>").text("4周后").appendTo(p);
	
	p= $("<p />").css({margin:"8px"}).appendTo(div);
	$("<input />").val(30).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px'/>").text("1月后").appendTo(p);
	$("<input />").val(60).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px'/>").text("2月后").appendTo(p);
	$("<input />").val(90).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px'/>").text("3月后").appendTo(p);
	
	p= $("<p />").css({margin:"8px"}).appendTo(div);
	$("<input />").val(182).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px'/>").text("半年后").appendTo(p);
	$("<input />").val(365).attr("type","radio").attr("name","time").appendTo(p);
	$("<span style='margin-right:30px'/>").text("1年后").appendTo(p);
	
	 p= $("<p />").css({margin:"8px"}).appendTo(div);
	 $("<span />").text("其它指定时间：").appendTo(p);
	 $("<input />").val(0).attr("type","radio").attr("name","time").appendTo(p);
	 $("<input />").attr("name","date").width(88).appendTo(p);
	 $("<span />").text("(YYYY-MM-DD)").appendTo(p);
	 $("<h1/>").text("注意事项").appendTo(tag);
	 
	 
	div=$("<div  style='height:120px' contenteditable=\"true\" hidefocus=\"true\" id=\"zysx_suifang\"  />").addClass("inputContent").addClass("suifang").appendTo(tag);
	if(obj){
		if(obj.zhuyi){
			div.html(obj.zhuyi);
		}
		if(obj.yyrq){
			div1_time.html("<h2>请于:"+formatDate(obj.yyrq.time)+"复诊</h2>");
			var g=getDaysEmr(formatDate(new Date()),formatDate(obj.yyrq.time));
			$("input[name=time][type=radio][value="+g+"]").attr("checked","checked");
//			$("input[name=time][value=0]").attr("checked","checked");
//			$("input[name=date]").val(formatDate(obj.yyrq.time));
		}
	}
	
	div = $("<div style='height:71px;padding-top:35px' />").addClass("openbutton").appendTo(tag);
	$("<a><span class=\"advsumit\"></span>提交</a>").click(function(){
		var obj = {jiuzhenId:currentVisit.id,day:$("input[name=time]:checked").val(),yyrq:$("input[name=date]").val(),zysx:$("#zysx_suifang").html()};
		var d = getJSONData(SAVE_SUIFANG_URL,obj,"POST");
		if(d.state){
			$.oimsSucc('随访提交成功！');
			$(".opentitle .closediv a").click();
		}
	}).appendTo(div);
	$("<a><span class=\"reset\"></span>重填</a>").click(function(){
		$("input[name=time][selected=selected]").removeAttr("selected");
		$("input[name=date]").val("");
		$("#zysx_suifang").html("");
	}).appendTo(div);
	div1.height(suifang_time.height());
	div1_time.css({"margin-top":(div1.height()-div1_time.height())/2});
	$("input[name='time']").click(function(){
		var val=$(this).val();
		if(val==0){
			div1_time.html("");
			return;
		}
		var time=getFollowTime(val);
		if(time){
			div1_time.html("<h2>请于:"+time+"复诊</h2>");
		}
	});
	

}
function getFollowTime(n){
	var date=new Date();
	var s=date.getTime()+n*24*60*60*1000;
	return formatDate(new Date(s));
}

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
}
function setJCDData(tr, select, o) {
	var jcd = getJCDObj(o.jcdId);
	if (jcd == null)
		return;
	$(select).children("option[value=" + jcd.yanbie + "]").attr("selected",
			"selected");
	var path = ",";
	if (jcd.leftPic != null) {
		path += jcd.leftPic;
	}
	if (jcd.rightPic != null) {
		path = jcd.rightPic + path;
	}
	tr.children("input[namme=other]").val(path);
}
/**
 * 插入一个项目
 * 
 * @param d
 * @param count
 */
function addExam(d, count, listType, show, o) {
//	if (debugFlag)
		//console.log("addExam:" + listType);
	if (count == null || count == 0)
		count = 1;
	var tag = $("form#chuzhiForm_" + listType).children("table");
	var tr = $("<tr />").data("listType", listType).data("xmmc", d.xmmc).attr(
			"id", "item_" + d.id + "_listType_" + listType).appendTo(tag);

	$("<input type=\"hidden\" />").attr("name", "id").appendTo(tr);
	$("<input type=\"hidden\" />").attr("name", "jcxmId").val(d.id)
			.appendTo(tr);
	$("<input type=\"hidden\" />").attr("name", "categoryId").val(listType)
			.appendTo(tr);
	$("<input type=\"hidden\" />").attr("name", "excutiveDept").appendTo(tr);
	$("<input type=\"hidden\" />").attr("name", "orderDetail").appendTo(tr);
	$("<input type=\"hidden\" />").attr("name", "note").appendTo(tr);
	$("<input type=\"hidden\" />").attr("name", "other").appendTo(tr);

	if (o != null) {
		tr.children("input[name=id]").val(o.id);
		tr.children("input[name=excutiveDept]").val(o.excutiveDept);
		tr.children("input[name=orderDetail]").val(getOrderDetail(o.id));
		tr.children("input[name=note]").val(o.note);
	}
	var tdXMMC = $("<td />").text(d.xmmc).appendTo(tr);
	var sl = $("<input />").attr("name", "count").val(count).focusin(
			function() {
				$(this).data("count", $(this).val());
			}).appendTo($("<td />").appendTo(tr));
	var tdPART = $("<td />").appendTo(tr);
	var money = $("<td />").text(d.price * count.toFixed(2)).appendTo(tr);
	sl.blur(function() {
		var _n = parseInt($(this).data("count"));
		if (isNaN(sl.val()) || sl.val() == 0) {
			sl.val(_n);
			return;
		}
		var m = money.text();
		if (!m.length || isNaN(m))
			return;
		var n = parseInt(sl.val());
		var _m = parseFloat(money.text());
		m = ((_m * 100 / _n) / 100) * n.toFixed(2);
		money.text(m);
	});
	if (listType == CHUZHI_CATEGORY.eyeExam) {
		var select = $("<select />").attr("name", "part").appendTo(tdPART);
		$("<option />").val(oimsCategory.DOUBLE_EYE).text("双眼")
				.appendTo(select);
		$("<option />").val(oimsCategory.LEFT_EYE).text("左眼").appendTo(select);
		$("<option />").val(oimsCategory.RIGHT_EYE).text("右眼").appendTo(select);
		if (o != null) {
			setJCDData(tr, select, o);
		}
		tr.data("leftPicPath", d.leftPicPath).data("rightPicPath",
				d.rightPicPath);
		var price=0;
		if(o!=null){
			price = getExamEYEPrice(d.id,o.part);
		}
		else{
			price=getExamEYEPrice(d.id,oimsCategory.DOUBLE_EYE);
		}
		$( "#item_" + d.id + "_listType_" + listType).find("select[name='part']").change(function(){
			var price_change=getExamEYEPrice(d.id,$(this).val());
			money.text(price_change);
		});
		money.text(price*count);
	} else if (listType == CHUZHI_CATEGORY.otherExam) {
		$("<input type=\"hidden\" name=\"part\" />").appendTo(tdPART);
	} else if (listType = CHUZHI_CATEGORY.labTest) {
	//	$("<input type=\"hidden\" name=\"part\" />").appendTo(tdPART);
		var select = $("<select />").attr("name", "part").appendTo(tdPART);
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
	}
	else if(listType==CHUZHI_CATEGORY.treat){
		var select = $("<select />").attr("name","part").appendTo(tdPART);
		$("<option />").val(oimsCategory.DOUBLE_EYE).text("双眼").appendTo(select);
		$("<option />").val(oimsCategory.LEFT_EYE).text("左眼").appendTo(select);
		$("<option />").val(oimsCategory.RIGHT_EYE).text("右眼").appendTo(select);
	}
	if(o!=null){
		tdPART.children("select[name=part]").val(o.part);
	}
	//var divId = "jctsDiv_" + tr.find("input[name=examId]").val() + "_"+ tr.find("input[name=listType]").val();
	var divId =  "jctsDiv_" +d.id+"_"+listType;
	addItemInfo(tr, tag.parent(),divId);
	tr.mouseover(function() {
		if (!tr.hasClass("a_showJCTS"))
			tr.children("td").addClass("on");
	}).mouseout(function() {
		if (!tr.hasClass("selected"))
			tr.children("td").removeClass("on");
	}).toggle(function() {
		tr.addClass("selected");
		tr.addClass("on");
		//$("#"+divId).show();
		showItemInfo($(this),divId);
	}, function() {
		tr.removeClass("selected");
		tr.removeClass("on");
		hiddenItemInfo();
	});
	showItemInfo(tr,divId);
}

/**
 * 显示项目提示
 * 
 * @param tr
 */
function showItemInfo(tr,divId) {
	hiddenItemInfo();
	$("div.jckdJcTsDiv").hide();
	tr.children("td").addClass("showJCTS");
	tr.children("td").children().addClass("showJCTS");
	$("#" + divId).show();
}

function hiddenItemInfo(){
	$(".showJCTS").removeClass("showJCTS");
	$("div.jckdJcTsDiv").hide();
}

function addItemInfo(tr, showTag,divId){
	var div = $("#" + divId);
	if (div.length) {
		showLog("divId exists:"+divId);
		return;
	}
	var ts = $("div.tabRight:visible");
	var p = ts.position();
	var left = $(window).width()-ts.outerWidth();
	div = $("<div />").addClass("jckdJcTsDiv").attr("id", divId).css({
		top : p.top,
		left : left
	}).width(ts.width()-8).height(ts.height()-8).hide()
			.appendTo(showTag);
	$("<h1 />").text(tr.data("xmmc")).appendTo(div);
	var listType = tr.data("listType");
	showOptions(tr, div);
	showNoteInput(tr, div);
	if (listType == CHUZHI_CATEGORY.eyeExam) {
		showEYEItemInfo(tr, div);
		return;
	}
	showZhixingkeshi(tr, div);
}

function showNoteInput(tr, showTag) {
	var jcyqTag = tr.find("input[name=note]");
	var normalTxt = "请输入检查要求";
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
				$(this).data("val", val);
			}).focusin(function() {
		$(this).css("color", "#000")
		if ($(this).html().indexOf(normalTxt) != -1)
			$(this).text("");
	}).html(jcyq).appendTo(showTag);
}

/**
 * 显示眼科检查提示
 * 
 * @param tr
 * @param showTag
 */
function showEYEItemInfo(tr, showTag) {
	var yanbie = tr.find("select[name=part]").val();
	showLog("yanbie:" + yanbie);
	var leftPicPath = tr.data("leftPicPath");
	var rightPicPath = tr.data("rightPicPath");
	showLog("leftPicPath=" + leftPicPath);
	showLog("rightPicPath=" + rightPicPath);
	if ((leftPicPath != null && leftPicPath.length)
			|| (rightPicPath != null && rightPicPath.length)) {
		var ptag = $("<div />").addClass("jctsPaintTag").appendTo(showTag);
		showJCTSPaint(yanbie, tr, ptag);
	}
}

/**
 * 显示检查提示画图
 * 
 * @param tip
 * @param normalPic
 * @param showPic
 * @param showTag
 */
function showJCTSPaint(yanbie, tr, showTag) {
	var showPic = "", normalPic, tip;
	var other = tr.find("input[name=other]").val();
	if (yanbie == oimsCategory.DOUBLE_EYE) {
		showJCTSPaint(oimsCategory.RIGHT_EYE, tr, showTag);
		showJCTSPaint(oimsCategory.LEFT_EYE, tr, showTag);
		return;
	} else if (yanbie == oimsCategory.LEFT_EYE) {
		tip = "OS";
		normalPic = tr.data("leftPicPath");
		if (other.length)
			showPic = other.split(",")[1];
	} else if (yanbie == oimsCategory.RIGHT_EYE) {
		tip = "OD";
		normalPic = tr.data("rightPicPath");
		if (other.length)
			showPic = other.split(",")[0];
	} else {
		$.oimsAlert('不是定义的眼别类型！');
		return;
	}
	showLog("normalPic:" + normalPic);
	if (normalPic == null || !normalPic.length)
		return;
	if (!showPic.length)
		showPic = normalPic;
	var titleTag = showTag.children(".jctsPaintTitleTag");
	showLog("showPic:" + showPic);
	var init = !titleTag.length;
	if (init)
		titleTag = $("<div />").addClass("jctsPaintTitleTag").appendTo(showTag);
	var a = $("<a />").data("normalPic", normalPic).data("showPic", showPic)
			.data("yanbie", yanbie).text(tip).click(
					function() {
						var a = $(this);
						if (a.hasClass("selected"))
							return;
						a.parent().children("a.selected").removeClass(
								"selected");
						a.addClass("selected");
						jctsPaintMovie.setTip(a.text());
						var obj = {
							patientId : currentVisit.huanzheId,
							jcdId : tr.find("input[name=id]").val(),
							visitId : currentVisit.id,
							jcxmId : tr.find("input[name=jcxmId]").val(),
							eye : $(this).data("yanbie")
						}
					
						jctsPaintMovie.setParam(obj);
						jctsPaintMovie.setNormalImg(contextPath
								+ $(this).data("normalPic"));
						jctsPaintMovie.loadImg(contextPath
								+ $(this).data("showPic"));
					}).appendTo(titleTag);
	if (!init) {
		return;
	}
	a.addClass("selected");
	var paintDiv = $("<div />").addClass("jctsPaint").appendTo(showTag);
	jctsPaintMovie = paintDiv.paint({
		param : {
			patientId : currentVisit.huanzheId,
			jcdId : tr.find("input[name=id]").val(),
			visitId : currentVisit.id,
			jcxmId : tr.find("input[name=jcxmId]").val(),
			eye : yanbie
		},
		tip : tip,
		paintSaveUrl : contextPath + JCTS_PAINT_SAVE_URL,
		saveCallBack : saveJCTSPaintCallback,
		normalPhoto : contextPath + normalPic,
		loadImg : contextPath + showPic
	});
}

function saveJCTSPaintCallback(data,swfId){
	var msg ="(#)";
	msg = msg.replace("#",data);
	var d ;
	try{
		d=eval(msg);
	}catch(e){
		$.oimsAlert(e);
	}
	setJCTSData(d.obj, swfId);
}

function setJCTSData(d, swfId) {
	showLog(d);
	var tr = $("form#chuzhiForm_" + CHUZHI_CATEGORY.eyeExam).find(
			"input[name=jcxmId][value=" + d.jcxmId + "]").parent();
	var tag = tr.find("input[name=other]");
	var str = tag.val();
	if (!str.length)
		str = ",";
	if (d.eye == oimsCategory.LEFT_EYE) {
		tag.val(str.split(",")[0] + "," + d.filePath);
	} else {
		tag.val(d.filePath + "," + str.split(",")[1]);
	}
	$(".jctsPaintTitleTag").children("a.selected").data("showPic", d.filePath);
}

/**
 * 显示主界面
 * 
 * @param tag1
 * @param tag2
 */
function showExamLayout(tag1, tag2) {
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
	$("<div />").attr("id", "examComboDiv").height(
			tag1.innerHeight() - h.outerHeight()).addClass("examCombo")
			.appendTo(tag1);
	$("<div />").addClass("examComboList").height(h / 2).appendTo(tag1);
	var ul = $("<ul />").appendTo(t);
	$.each(chilredSelectObj, function(i, d) {
		var li = $("<li />").data("id",d.id).appendTo(ul);
		var a = $("<a />").text(d.category).data("listType", d.id).click(
				function() {
					$("#searchExamDiv input").val("");
					if ($(this).hasClass("selected")&&d.id!=CHUZHI_CATEGORY.follow)
						return;
					ul.find("a.selected").removeClass("selected");
					$(this).addClass("selected");
					//showItemList();
				}).appendTo(li);
		var form = $("<form />").attr("method", "post").addClass("chuzhiForm")
				.attr("id", "chuzhiForm_" + d.id).ajaxForm({
					dataType : "json",
					success : function(d) {
				var title=$("#examListDiv").children(".deptList").children("a.selected").text();
				if(d.state)
					$.oimsSucc(title+'已成功提交！');
				else
					$.oimsError(title+'提交失败!');
					}
				}).hide().appendTo(pdd);

		$("<input />").attr("type", "hidden").attr("name", "huanzheId").val(
				currentVisit.huanzheId).appendTo(form);
		$("<input />").attr("type", "hidden").attr("name", "jiuzhenId").val(
				currentVisit.id).appendTo(form);
		var tr = $("<tr />").appendTo($("<table>").appendTo(form));
		$.each(d.listTitle, function(n, t) {
			var th = $("<th />").text(t.title).appendTo(tr);
			if (t.width != undefined)
				th.width(t.width);
		});
		if (d.id == CHUZHI_CATEGORY.prescribe) {
			form.attr("action", contextPath + SAVE_CHUFANG_URL);
			showPatientPrescribe(d.id);
		} else {
			form.attr("action", contextPath + SAVE_ORDERS_URL);
			addPatientExam(d.id);
		}
		if (i === 0) {
			a.addClass("selected");
		}
	});
	
	var btn = $("<div />").addClass("btn").appendTo(btnDiv);
	$("<a />").append("<span class=\"advsumit\" /> 提交").click(function() {
//		var form = $("form.chuzhiForm:visible");
//		var selected = form.find("tr");
//		if (selected.length == 0) {
//			alert("请先开单再提交！");
//			return;
//		}
		if($("#searchExamDiv").find("input[name=search]").data("listType")==CHUZHI_CATEGORY.prescribe){
			
			var message;
			
			if(!count()[0]||!yongliang()[0]||!yongfa()[0]||!frequencys()[0]){
				$.oimsError(message);
				return;
			}else{
				$("form.chuzhiForm:visible").submit();
				return;
			}
				
			function count(){
				var isSubmit=true;
				$.each($("#chuzhiForm_4 input[name='count']"),function(i,d){
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
				$.each($("#chuzhiForm_4 input[name='yongliang']"),function(i,d){
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
				$.each($("#chuzhiForm_4 select[name='yongfa']"),function(i,d){
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
				$.each($("#chuzhiForm_4 select[name='frequencys']"),function(i,d){
					if(!$.trim($(this).val())){
						isSubmit=false;
						message="频率不能为空";
						return;
					}
				});
				return [isSubmit,message];
			}
		};
		$("form.chuzhiForm:visible").submit();
	}).appendTo(btn);
	$("<a />").append("<span class=\"del\" /> 删除").click(function() {
		deleteItems();
	}).appendTo(btn);
	$("<a />").append("<span class=\"print\" />打印").click(function() {
		printOrders();
	}).appendTo(btn);
}

/**
 * 
 */
function deleteItems() {
	var form = $("form.chuzhiForm:visible");
	$.each(form.children("table").find("tr.selected"), function(i, tr) {
		tr = $(tr);
		var selectClass = tr.attr("id");
		if (tr.data("listType") == CHUZHI_CATEGORY.prescribe) {
			$(".itemListDiv tr." + selectClass).removeClass("on");
		} else {
			$(".itemListDiv a." + selectClass).removeClass("on");
		}
		tr.remove();
	});
}
/**
 * 插入已有检查项目
 */
function addPatientExam(listType) {
	var result = getJSONData(FIND_ORDER_URL, {
		visitId : currentVisit.id,
		categoryId : listType,
		jiaofei:0
	}, "POST");
	if (!result.state || !result.obj.length)
		return;
	$.each(result.obj, function(i, d) {
		addExam(d.jcxm, d.order.shuliang, listType, false, d.order);
	});
}
//双屏待测
function doubleSreen(jcdid){
	if($("#studyViewTag h1 div").length){
		$("#studyViewTag h1 div").remove();
	}
	//双屏
	var doubleScreen = $('<div/>').addClass('btn').addClass('emr_doublebtn').appendTo($("#studyViewTag h1"));
	var a = $('<a class="four noline"><span class="screen emr_doublebtnspan"></span>双屏</a>').appendTo(doubleScreen);
	a.click(function(){
		importJS("/js/flashShow.js");
		studyView(currentPatient.id);
	});
	//图片
	var photos = getJSONData(getInspectPhotoUrl,{inspectId:jcdid,tag:Math.random()},'POST');
	
	var gallery = $("<div class='oimsslide-gallery'/>").appendTo($(".studyViewDiv"));
	var flag = false;
	var oldWidth = gallery.width();
	for(var i=0;i<photos.length;i++){
		var photo = photos[i];
		var href = photo.path.replace(/\\/g,'/');
		var suffix = href.substring(href.lastIndexOf('.')+1).toUpperCase();
		var a = $('<a onclick="return hs.expand(this)" class="oimsslide"/>').appendTo(gallery);
		a.attr('style','float:left;');
		if(oldWidth>gallery.width()){
			if(!flag){
				flag = true;
				oldWidth = gallery.width();
				var as = gallery.find('a');
				$.each(as,function(){
					$(this).width($(this).width()-window.scrollbarWidth/2);
				});
			}
		}
		a.width(193).height(165);
		if(suffix=="JPG"||suffix=="JPEG"||suffix=="GIF"||suffix=="PNG"){//图片
			a.attr('href',contextPath+'/'+href.replace('thumb/',''));
			if(flag){
				a.width(a.width()-window.scrollbarWidth/2);
			}
			var img = $('<img src="../'+href+'"/ style="width:100%;height:100%;">').appendTo(a);
		}else{//视频
			importCSS("/flowplayer/style.css");
			importJS("/js/swfobject.js");
			importJS("/flowplayer/flowplayer-3.2.11.min.js");
			if(flag){
				a.width(a.width()-window.scrollbarWidth/2);
			}
			var div = $('<div style="border:2px solid silver;"/>').width(a.width()-4).height(a.height()-4).appendTo(a);
			var flv = $('<a/>').attr({'id':'player'+i,'href':contextPath +"\\"+photo.path}).appendTo(div);
		    flowplayer("player"+i, contextPath+ "/flowplayer/flowplayer-3.2.15.swf");
		}
	}
}