var FIND_JCD_LIST_URL = "/publish/doctor/studyList.htm";
var FIND_SHILI_LIST_URL = "/publish/ShiLi/findShili.htm";
var GET_SHILI_URL = "/publish/ShiLi/getShili.htm";
var GET_YANYA_24HOUER_URL = "/publish/doctor/getYanYaUrl.htm";
var GET_SHILI_BY_JIUZHENID_URL = "/publish/ShiLi/getShiliByJiuzhenId.htm";
var SAVE_SHILI_URL = "/publish/ShiLi/saveShili.htm";
var GET_YANYA_BY_JIUZHENID_URL = "/publish/yanya/getYanYaByJiuzheId.htm";
var GET_JCD_BY_ID_URL = "/publish/jcd/getJcdById.htm";
var getExamNoUrl='/publish/emrOrder/getExamNo.htm';
var getExamReportUrl='/publish/emrOrder/getExamReport.htm';
var getLisReportUrl='/publish/emrOrder/getLisReport.htm';
function getJCDObj(id) {
	var re = getJSONData(GET_JCD_BY_ID_URL, {
		id : id
	});
	if (re.state)
		return null;
	return re.obj;
}
var shiLiTemplateObj = [ {
	title : "5.3",
	value : 2.0
}, {
	title : "5.2",
	value : 1.5
}, {
	title : "5.1",
	value : 1.2
}, {
	title : "5.0",
	value : 1.0
},
{
	title:"0.9",
	value:0.9
},{
	title : "4.9",
	value : 0.8
}, 
{
	title:"0.7",
	value:0.7
},{
	title : "4.8",
	value : 0.6
}, {
	title : "4.7",
	value : 0.5
}, {
	title : "4.6",
	value : 0.4
}, {
	title : "4.5",
	value : 0.3
}, {
	title : "4.4",
	value : 0.25
}, {
	title : "4.3",
	value : 0.2
}, {
	title : "4.2",
	value : 0.15
}, {
	title : "4.1",
	value : 0.12
}, {
	title : "4.0",
	value : 0.1
},
{
	title :0.09,
	value :0.09
},
{
	title :0.08,
	value :0.08
},
{
	title :0.07,
	value :0.07
},
{
	title :0.06,
	value :0.06
},
{
	title :0.05,
	value :0.05
},
{
	title :0.04,
	value :0.04
},
{
	title :0.03,
	value :0.03
},
{
	title :0.02,
	value :0.02
},
{
	title :0.01,
	value :0.01
},
{
	title : "数指",
	value : -1
}, {
	title : "手动",
	value : -2
}, {
	title : "光感",
	value : -3
},{
	title : "无光感",
	value :-4
},{
	title : "光感不明确",
	value :-16
},{
	title : "患者拒查",
	value : -11
},{
	title : "患者不能配合检查",
	value : -12
},{
	title : "可追光",
	value : -13
},{
	title : "可追物",
	value : -14
},{
	title :"义眼",
	value :-15
} ];

var studyAsysList;

function getShiLiTitle(val) {
	var title = null;
	$.each(shiLiTemplateObj, function(i, d) {
		if (val == d.title || val == d.value) {
			title = d.title;
			return false;
		}
	});
	return title;
}

function getShiLiVal(val) {
	var v = null;
	if (val == null || !val.length)
		return v;
	$.each(shiLiTemplateObj, function(i, d) {
		if(val.indexOf("(")==-1){
			if(val==d.value){
				v=val;
				return false;
			}
			if(val==d.title){
				v=d.value;
				return false;
			}
		}
		else{
			var c = parseFloat(val.substring(0,val.indexOf("(")));
			if(c==d.value){
				v=c;
				return false;
			}
		}
	});
	return v;
}
function getShiLiDisplay(val){
	var v = null;
	if (!val)
		return v;
	$.each(shiLiTemplateObj, function(i, d) {
		if (d.value==val) {
			if((d.value>0&&d.value<0.1)||d.value==0.7||d.value==0.9){
				v=val;
				return false;
			}
			if(d.value<=-10){
				v=d.title;
				return false;
			}
			v = (d.value.toString().indexOf("\.")==-1?(d.value+".0"):d.value)+"("+d.title+")";
			return false;
		}
	});
	return v;

}

function showShiLiTemplate(tag, showTag, valInput) {
	$.each(shiLiTemplateObj, function(i, d) {
		var text = d.title;
		var value = d.value;
		if(value.toString().indexOf("\.")==-1)value+=".0";
		/*if(!isNaN(text))*/value+="("+text+")";
		
		$("<a />").text(((d.value>0&&d.value<0.1)||d.value==0.7||d.value==0.9||d.value<=-10)?d.title:value).click(function(){
			showTag.val(((d.value>0&&d.value<0.1)||d.value==0.7||d.value==0.9||d.value<=-10)?d.title:value);
			valInput.val(d.value);
			showTag.focus();
		}).appendTo(tag);
		
	});
}

/**
 * 显示检查单清单
 * 
 * @param visitId
 * @param listTag
 * @param showTag
 * @returns
 */
function showEyeStudyList(visitId, listTag, showTag) {
	studyAsysList = [];
	var list = getJSONData(FIND_JCD_LIST_URL, {
		id : visitId,
		tag : Math.random()
	}).obj;
	if(list.length>0)
	$("#studyListTitle_ykjc").html("眼科检查("+list.length+")");
	var ul = $("<ul />").appendTo(listTag);
	$.each(list, function(i, d) {
		var title = d.title;
		var li = $("<li />").appendTo(ul);

		var so = getStudyState(d.biaoshi);
		var span = $("<span />").attr("id","studyStateSpan_"+d.id).addClass(so.className).css({
			width : "15",
			height : "20",
			display : "inline-block"
		}).appendTo(li);
		$("<a />").text(title).click(function(){
			if(d.biaoshi==56){
				if($(".studyViewDiv").length){
					$(".studyViewDiv").empty();
				}
				$("#studyViewTag h1").text(title);
				showEyeStudy(d,showTag);
			}
		}).appendTo(li);
		li.attr("title", so.msg);
		//查看是否存在报告
		showReportList(d.id, li,d.id);
		if (d.biaoshi != oimsCategory.JCD_STATE_YWC) {
			studyAsysList.push({
				id : d.id,
				bs : d.biaoshi
			});
		}
	});
	// if(studyAsysList.length>0)asysStudyBiaoshi();
}

/**
 * 显示其它医院检查项目
 * 
 * @returns
 */
function showOtherStudyList(listTag, showTag) {
	showExamAndLisItem(CHUZHI_CATEGORY.otherExam, listTag, showTag);
}
/**
 * 显示实验室检验项目
 */
function showLabTestList(listTag, showTag) {
	showExamAndLisItem(CHUZHI_CATEGORY.labTest, listTag, showTag);
}
function showExamAndLisItem(categoryId, listTag, showTag) {
	var result = getJSONData(FIND_ORDER_URL, {
		visitId : currentVisit.id,
		categoryId : categoryId
	}, "POST");
	//显示检查单数量
	if(categoryId==CHUZHI_CATEGORY.otherExam&&result.obj.length>0){
		$("#studyListTitle_qyjc").html("全院检查("+result.obj.length+")");
	}else if(categoryId==CHUZHI_CATEGORY.labTest&&result.obj.length>0 ){
		$("#studyListTitle_jy").html("检验("+result.obj.length+")");
	}
	if (!result.state || !result.obj.length)
		return;
	var ul = $("<ul />").appendTo(listTag);
	$.each(result.obj, function(i, d) {
		var li = $("<li />").appendTo(ul);
		$("<a />").click(function() {
			if(categoryId==CHUZHI_CATEGORY.otherExam){
				var examNo=getJSONData(getExamNoUrl,{orderNo:d.order.orderNo/*'24807984_1,24807984_2,24807984_3'*/},'POST').obj;
				var report=getJSONData(getExamReportUrl,{examNo:examNo},'POST').obj;
				$('#studyViewTag').children('h1').text(d.order.itemName);
				var div=$('div.studyViewDiv').empty();
				var inputButton=$('<input type="button" id="lookPhoto" value="图像" class="button" />');
				if(report){
					div.append('<h2>检查所见</h2>');
					div.append('<div>'+report.report+'</div>');
					div.append('<h2>印象</h2>');
					div.append('<div>'+report.note+'</div>');
				}
				inputButton.appendTo(div).click(function(){
					window.open("http://132.147.15.10/pkg_pacs/external_interface.aspx?LID=doct&LPW=doct&pid="+currentPatient.binglihao+"&an="+examNo);
				});
				
			}
			else if(categoryId==CHUZHI_CATEGORY.labTest){
				if(!d.order.orderNo)return;
				var report=getJSONData(getLisReportUrl,{orderNo:d.order.orderNo},'POST').obj;
				$('#studyViewTag').children('h1').text(d.order.itemName);
				$('div.studyViewDiv').empty();
				var table=$('<table style="width:100%"/>').appendTo($('div.studyViewDiv'));
				var tr=$('<tr/>').appendTo(table);
				tr.append('<th>'+d.order.itemName+'</th>');
				tr.append('<th style="width:32px">结果</th>');
				tr.append('<th style="width:32px">异常</th>');
				tr.append('<th style="width:48px">参考值</th>');
				tr.append('<th style="width:32px">单位</th>');
				if(report){
					$.each(report,function(i,n){
						var tr0=$('<tr/>').appendTo(table);
						tr0.append('<td>'+this.title+'</td>');
						tr0.append('<td>'+this.val+'</td>');
						tr0.append('<td>'+this.flag+'</td>');
						tr0.append('<td>'+this.note+'</td>');
						tr0.append('<td>'+this.unit+'</td>');
					});
				}
			}
		}).text(d.order.itemName).appendTo(li);
	});
}
/**
 * 显示眼科检查结果
 */
function showEyeStudy(d, showTag) {
	if (d.jcxmids == jcxmIDConfig.SHILI) {
		var result = getJSONData(GET_SHILI_URL, {
			jcdId : d.id,
			tag : Math.random()
		});
		if (!result.state)
			return;
		showShili(result.obj, showTag);
		return;
	} else if (d.jcxmids == jcxmIDConfig.YANYA) {
		showYanYa();
	}
	// else if(d.jcxmids ==jcxmIDConfig.SHILI){
	// showShili(d,showTag);
	// }
	else {
		// 双屏和图片
		doubleSreen1(d.id);
	}
}

/**
 * 显示其它检查结果
 */
function showOtherStudy(d, showTag) {
	// TODO
}

/**
 * 获取眼科检查报告
 */
function getReport(id) {
	// TODO
}

/**
 * 同步检查单状态
 * 
 * @param ele
 * @param id
 * @returns
 */
function asysStudyBiaoshi() {
	var ywc = [];
	var isHide = false;
	$.each(studyAsysList, function(i, d) {
		try {
			var result = getJSONData(STUDY_BIAOSHI_GET_URL, {
				id : d.id,
				tag : Math.random()
			});
			if (result.state)
				var biaoshi = result.obj.biaoshi;
			if (d.bs == biaoshi)
				return true;
			if (biaoshi == oimsCategory.JCD_STATE_YWC)
				ywc.push(d);
			var obj = getStudyState(biaoshi);
			if ($("#studyStateSpan_" + d.id).is(":hidden")) {
				isHide = true;
				return false;
			}
			$("#studyStateSpan_" + d.id).removeClass().addClass(obj.className);
			$("#studyStateSpan_" + d.id).parent().attr("title", obj.msg);
		} catch (e) {
		}
	});
	if (isHide)
		return;
	if (ywc.length) {
		var na = [];
		for (var i = 0; i < studyAsysList.length; i++) {
			var b = true;
			for (var n = 0; n < ywc.length; n++) {
				if (studyAsysList[i] == ywc[n]) {
					b = false;
					break;
				}
			}
			if (b)
				na.push(studyAsysList[i]);
		}
		studyAsysList = na;
	}
	if (studyAsysList.length)
		setTimeout(asysStudyBiaoshi(), 60000);
}

/**
 * 显示患者本次就诊的一次视力检查结果
 * 
 * @param id
 * @param template
 * @param tag
 */
function showShiliByJiuzhenId(id, template, tag) {
	var data = getJSONData(GET_SHILI_BY_JIUZHENID_URL, {
		jiuzhenId : id,
		tag : Math.random()
	});
	if (data.state) {
		showShili(data.obj, tag, template);
	}
}

/**
 * 显示视力
 * 
 * @param id
 */
function showShili(d, tag, template) {
	//if (debugFlag)
		//console.log(d);
	var ks = [ "ll", "rl", "lj", "rj", "ljz", "rjz"];
	if (d != null)
		$.each(d, function(k, v) {
			// if(debugFlag)//console.log("kv=="+k+":"+v);
			if (containArray(ks, k)) {
				try {
					var l = parseFloat(v);
					var o = l == 0 ? "" : getShiLiDisplay(l);
					// //console.log("thisobj:"+l+"==>>"+o);
					if (o != null)
						$.extend(d, eval("({" + k + ":'" + o + "'})"));
				} catch (e) {
					//if (debugFlag)
						//console.log(e);
				}
			}
		});
	if (template != null) {
		showWithHtmlTemplate(template, d, tag);
		return;
	}
	var t = $("<table />").appendTo(tag);
	var tr = $("<tr />").appendTo(t);
	$("<th />").text("眼别").appendTo(tr);// "眼别"
	$("<th />").text("矫正视力").appendTo(tr);// "矫正视力"
	$("<th />").text("近视力").appendTo(tr);// "近视力"
	$("<th />").text("裸眼视力").appendTo(tr);// "裸眼视力"
	tr = $("<tr />").appendTo(t);
	$("<td />").text("左眼").appendTo(tr);// "左眼"
	$("<td />").text(d.ljz).appendTo(tr);
	$("<td />").text(d.lj).appendTo(tr);
	$("<td />").text(d.ll).appendTo(tr);
	tr = $("<tr />").appendTo(t);
	$("<td />").text("右眼").appendTo(tr);// "右眼"
	$("<td />").text(d.rjz).appendTo(tr);
	$("<td />").text(d.rj).appendTo(tr);
	$("<td />").text(d.rl).appendTo(tr);
}

function showYanguang(d, tag) {
	var t = $("<table />").appendTo(tag);
	$("<caption />").append("客观屈光度参考值").appendTo(t);
	var tr = $("<tr />").appendTo(t);
	$("<th />").text("").appendTo(tr);
	$("<th />").text("球镜度").appendTo(tr);
	$("<th />").text("散光度").appendTo(tr);
	$("<th />").text("轴位").appendTo(tr);

	tr = $("<tr />").appendTo(t);
	$("<td />").text("左眼").appendTo(tr);// "左眼"
	$("<td />").attr("id", "refLS").appendTo(tr);
	$("<td />").attr("id", "refLC").appendTo(tr);
	$("<td />").attr("id", "refLA").appendTo(tr);

	tr = $("<tr />").appendTo(t);
	$("<td />").text("右眼").appendTo(tr);// "右眼"
	$("<td />").attr("id", "refRS").appendTo(tr);
	$("<td />").attr("id", "refRC").appendTo(tr);
	$("<td />").attr("id", "refRA").appendTo(tr);

	tr = $("<tr />").appendTo(t);
	$("<td />").text("瞳距").appendTo(tr);// "瞳距"
	$("<td />").attr({
		"id" : "refPd",
		"colspan" : "3"
	}).appendTo(tr);

	var t = $("<table />").appendTo(tag);
	$("<caption />").append("角膜曲率参考值").appendTo(t);
	var tr = $("<tr />").appendTo(t);
	$("<th />").text("左眼").appendTo(tr);// "眼别"
	$("<th />").text("角膜曲光度").appendTo(tr);
	$("<th />").text("曲率半径").appendTo(tr);
	$("<th />").text("方向").appendTo(tr);

	tr = $("<tr />").appendTo(t);
	$("<td />").text("水平方向").appendTo(tr);// "左眼"
	$("<td />").attr("id", "krtLHd").appendTo(tr);
	$("<td />").attr("id", "krtLHmm").appendTo(tr);
	$("<td />").attr("id", "krtLHa").appendTo(tr);

	tr = $("<tr />").appendTo(t);
	$("<td />").text("垂直方向").appendTo(tr);// "左眼"
	$("<td />").attr("id", "krtLVd").appendTo(tr);
	$("<td />").attr("id", "krtLVmm").appendTo(tr);
	$("<td />").attr("id", "krtLVa").appendTo(tr);

	tr = $("<tr />").appendTo(t);
	$("<td />").text("平均值").appendTo(tr);// "左眼"
	$("<td />").attr("id", "krtLAved").appendTo(tr);
	$("<td />").attr("id", "krtLAvemm").appendTo(tr);
	$("<td />").attr("id", "16od").appendTo(tr);

	tr = $("<tr />").appendTo(t);
	$("<td />").text("角膜散光度").appendTo(tr);// "左眼"
	$("<td />").attr("id", "14od").appendTo(tr);
	$("<td />").attr("id", "krtLCylmm").appendTo(tr);
	$("<td />").attr("id", "krtLCyla").appendTo(tr);

	var tr = $("<tr />").appendTo(t);
	$("<th />").text("右眼").appendTo(tr);// "眼别"
	$("<th />").text("角膜曲光度").appendTo(tr);
	$("<th />").text("曲率半径").appendTo(tr);
	$("<th />").text("方向").appendTo(tr);

	tr = $("<tr />").appendTo(t);
	$("<td />").text("水平方向").appendTo(tr);// "右眼"
	$("<td />").attr("id", "krtRHd").appendTo(tr);
	$("<td />").attr("id", "krtRHmm").appendTo(tr);
	$("<td />").attr("id", "krtRHa").appendTo(tr);

	tr = $("<tr />").appendTo(t);
	$("<td />").text("垂直方向").appendTo(tr);// "右眼"
	$("<td />").attr("id", "krtRVd").appendTo(tr);
	$("<td />").attr("id", "krtRVmm").appendTo(tr);
	$("<td />").attr("id", "krtRVa").appendTo(tr);

	tr = $("<tr />").appendTo(t);
	$("<td />").text("平均值").appendTo(tr);// "右眼"
	$("<td />").attr("id", "krtRAved").appendTo(tr);
	$("<td />").attr("id", "krtRAvemm").appendTo(tr);
	$("<td />").attr("id", "16od").appendTo(tr);

	tr = $("<tr />").appendTo(t);
	$("<td />").text("角膜散光度").appendTo(tr);// "右眼"
	$("<td />").attr("id", "14od").appendTo(tr);
	$("<td />").attr("id", "krtRCylmm").appendTo(tr);
	$("<td />").attr("id", "krtRCyla").appendTo(tr);

	$("#refLS").text(d.refLS);
	$("#refLC").text(d.refLC);
	$("#refLA").text(d.refLA);

	$("#refRS").text(d.refRS);
	$("#refRC").text(d.refRC);
	$("#refRA").text(d.refRA);

	$("#refPd").text(d.refPd);

	$("#krtLHd").text(d.krtLHd);
	$("#krtLHmm").text(d.krtLHmm);
	$("#krtLHa").text(d.krtLHa);

	$("#krtLVd").text(d.krtLVd);
	$("#krtLVmm").text(d.krtLVmm);
	$("#krtLVa").text(d.krtLVa);

	$("#krtLAved").text(d.krtLAved);
	$("#krtLAvemm").text(d.krtLAvemm);

	$("#krtLCylmm").text(d.krtLCylmm);
	$("#krtLCyla").text(d.krtLCyla);

	$("#krtRHd").text(d.krtRHd);
	$("#krtRHmm").text(d.krtRHmm);
	$("#krtRHa").text(d.krtRHa);

	$("#krtRVd").text(d.krtRVd);
	$("#krtRVmm").text(d.krtRVmm);
	$("#krtRVa").text(d.krtRVa);

	$("#krtRAved").text(d.krtRAved);
	$("#krtRAvemm").text(d.krtRAvemm);

	$("#krtRCylmm").text(d.krtRCylmm);
	$("#krtRCyla").text(d.krtRCyla);
}

/**
 * 显示患者视力曲线
 */
function showShiliChart(tag) {
	var shiliResult = getJSONData(FIND_SHILI_LIST_URL, {
		patientId : currentVisit.huanzheId,
		max : 10,
		tag : Math.random()
	});
	if (!shiliResult.state || !shiliResult.obj.length) {
		return;
	}
	var data = shiliResult.obj;
	$.each(data, function() {
		// TODO
	});
}

/**
 * 显示眼压数据
 * 
 * @param id
 * @param showTag
 * @returns
 */
function showYanya(id, showTag) {
	var result = getJSONData(GET_YANYAN_URL, {
		jcdId : id,
		tag : Math.random()
	});
	if (!yanya.state || result.state == null) {
		alert('眼压数据获取失败');
		return 

	}
	$("<h1 />").text("眼压检查").appendTo(showTag);

}

/**
 * 显示24小时眼压折线图
 * 
 * @param jiuzhenId
 * @param showTag
 * @returns
 */
function show24HourYanyaChart(jiuzhenId, showTag) {
	var d = getJSONData(GET_YANYA_24HOUER_URL, {
		id : md.id,
		tag : Math.random
	}).obj;
	// 清空检查单图片显示区域
	var chartTagId = "yanya24HourDiv" + jiuzhenId;
	$("<div />").attr({
		"id" : chartTagId
	}).appendTo(showTag);
	var sw = showTag.innerWidth();
	var sh = showTag.innerHeight();
	var l_data = [];
	var r_data = [];
	var date = [];
	for (var i = 0; i < d.length; i++) {
		l_data.push(d[i].left == null ? 0 : d[i].left);
		r_data.push(d[i].right == null ? 0 : d[i].right);
		var h = d[i].ycsj.hours;
		var m = d[i].ycsj.minutes;
		var h_str = "";
		var m_str = "";
		if (h < 10)
			h_str = "0" + h;
		else
			h_str = h;
		if (m < 10)
			m_str = "0" + m;
		else
			m_str = m;
		date.push(h_str + ":" + m_str);
	}
	if (date.length > 8) {
		sw = sw + (date.length - 8) * 40;
	}
	var option = {
		chartContent : {
			width : sw,
			height : sh
		},
		divContent : {
			id : chartTagId
		},
		xAxisContent : {
			name : language_doctor.Jcsj,
			unit : "time"
		}, // 检查时间
		yAxisContent : {
			name : language_doctor.YanYa + "(mmHg)",
			unit : "mmHg"
		},// 眼压
		arrayContent : [ {
			name : language_doctor.LeftEye/* "左眼" */,
			data : l_data
		}, {
			name : language_doctor.RightEye/* "右眼" */,
			data : r_data
		} ],
		categoriesNum : date
	};
	creteLineChart(options);
}

/**
 * 取得检查单状态对应的className和msg
 * 
 * @param state
 * @returns
 */
function getStudyState(state) {
	var cn;
	var msg;
	switch (state) {
	case oimsCategory.JCD_STATE_DJC:
		cn = "dcheck";
		msg = "待检查"
		break;
	case oimsCategory.JCD_STATE_YJC:
		cn = "ycheck";
		msg = "已检查"
		break;
	case oimsCategory.JCD_STATE_DBC:
		cn = "dSupplements";
		msg = "待补传"
		break;
	case oimsCategory.JCD_STATE_YGH:
		cn = "live";
		msg = "已过号"
		break;
	case oimsCategory.JCD_STATE_JCZ:
		cn = "start";
		msg = "检查中"
		break;

	case oimsCategory.JCD_STATE_DSC:
		cn = "din";
		msg = "待上传"
		break;
	case oimsCategory.JCD_STATE_YWC:
		cn = "end";
		msg = "已完成"
		break;

	case oimsCategory.JCD_STATE_DSCWLJ:
		cn = "dlinkno";
		msg = "待上传连接异常"
		break;

	case oimsCategory.JCD_STATE_DSCWZDWJ:
		cn = "fileno";
		msg = "待上传未找到文件"
		break;

	case oimsCategory.JCD_STATE_SCZYC:
		cn = "slinkno";
		msg = "上传中连接异常"
		break;

	case oimsCategory.JCD_STATE_SCZDS:
		cn = "lose";
		msg = "上传中文件丢失"
		break;

	case oimsCategory.JCD_STATE_SCZWJCW:
		cn = "derror";
		msg = "上传中文件错误"
		break;
	default:
		cn = "wrong";
		msg = "出错了"
	}
	return {
		className : cn,
		msg : msg
	};
}

function creteLineChart(options) {
	var chart = new Highcharts.Chart({
		chart : {
			renderTo : options.divContent.id,
			type : 'line',
			width : options.chartContent.width,
			height : options.chartContent.height,
			style : {
				margin : '0 auto'
			}
		},
		title : {
			text : option.title
		/* '眼压曲线' */
		},
		subtitle : {
			text : ''
		},
		xAxis : {
			categories : options.categoriesNum,
			title : {
				text : options.xAxisContent.name
			},
			labels : {
				formatter : function() {
					return this.value + options.xAxisContent.unit;
				}
			}
		},
		yAxis : {
			title : {
				text : options.yAxisContent.name
			},
			labels : {
				formatter : function() {
					return this.value + options.yAxisContent.unit;
				}
			},
			lineWidth : 2,
			min : 0
		},
		legend : {
			enabled : true
		},
		tooltip : {
			enabled : true,
			formatter : function() {
				return this.x + options.xAxisContent.unit + "<br/>"
						+ this.series.name + ":" + this.y
						+ options.yAxisContent.unit + "<br/>";
			}
		},
		plotOptions : {
			line : {
				dataLabels : {
					enabled : true
				},
				enableMouseTracking : true
			}
		},
		series : options.arrayContent
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