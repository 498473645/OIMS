//importJS("/js/manager/emr/doctorManager.js");
var huanZheFenZhen_selectHuanXhe_url = "/publish/huanZheXinXi/getHuanzhexinxiByBLH.htm";// 根据病历号本地数据库查询
var huanZheFenZhen_selectHuanXhe_his_url = "/publish/huanZheXinXi/getHuanzhexinxiByBLHToHis.htm";// 根据病历号查询his数据库
var huanZheFenZhen_saveOrUpdateJiuzhen_url = "/publish/jiuzhen/saveOrUpdateJiuzhen.htm"; // 根据ID号进行分诊
var huanZheFenZhen_ToDayJiuZhen_url = "/publish/jiuzhen/toDayJiuZhen.htm"; // 根据ID好查询今天是否挂号
var bingli_findBuSerch = "/publish/bingli/findBySeach.htm";
var CATEGORY_GET_URL = "/publish/category/getCategoryById.htm";
// 初始化弹出框
function showIDText() {
	var div = $("<div id = 'opencontent_div' style='padding-left:8px;' />")
			.append(
					"<div>ID号：<input type='text' name='binglihao' id='binglihao' style='margin-right:5px;' /><input type=\"button\" id=\"binglihaoSearchXX\" value=\"查询\" /></div>");
	showWithHtmlTemplate("patient", null, div);
	div.oimsDialog({
		title : "查询",
		width : 600,
		icon : 'view',
		height : 440,
		drag : false,
		locked : true,
		winType : 4,
		button : [ {
			title : "确定",
			func : huanZheFenZhen_selectHuanXhe_local,
			isCloseWin : true,
			className : "sumit"
		} ],
		closeCallback : function() {
			showPatientListToday(); // 显示患者信息列表
		}
	});
	$("#binglihao").focus();
	$("#opencontent_div #binglihao").keydown(function(event) {
		if (event.keyCode == 13) {
			searchHuanZheXinXi();
		}
	});
	
	$("#opencontent_div #binglihaoSearchXX").click(searchHuanZheXinXi);
	
	function searchHuanZheXinXi() {
		var binglihao = $("#binglihao").val();
		if (binglihao != null && binglihao != "") {
			var local_hzxx = getJSONData(
					huanZheFenZhen_selectHuanXhe_url, {
						binglihao : binglihao,
						tag : Math.random()
					}, "POST");
			if (local_hzxx.state && local_hzxx.obj != null) {
				huanZheFenZhen_showPatientVisits(local_hzxx.obj);
			} else {
				var his_hzxx = getJSONData(
						huanZheFenZhen_selectHuanXhe_his_url, {
							binglihao : binglihao,
							tag : Math.random()
						}, "POST");
				if (his_hzxx.state && his_hzxx.obj != null) {
					huanZheFenZhen_showPatientVisits(his_hzxx.obj);
				} else {
					$.oimsAlert("查无此人，请确认ID号是否正确！");
				}
			}
		}
	}
}

// 查询本地数据库
function huanZheFenZhen_selectHuanXhe_local() {
	var binglihao = $("#binglihao").val();
	if (binglihao != null && binglihao != "") {
		var huanZheFenZhen_selectHuanXhe_data = getJSONData(
				huanZheFenZhen_selectHuanXhe_url, {
					binglihao : binglihao,
					tag : Math.random()
				}, "POST");
		if (huanZheFenZhen_selectHuanXhe_data.state
				&& huanZheFenZhen_selectHuanXhe_data.obj != null)
			huanZheFenZhen_ToDayJiuZhen(huanZheFenZhen_selectHuanXhe_data);
		else
			// $.oimsConfirm({
			// strTitle : "本地数据库没有查到该患者信息,是否都HIS数据库中进行查询？",
			// remove_length : true
			// }, function() {
			huanZheFenZhen_selectHuanXhe_his(binglihao);
		// }, function() {
		// showPatientListToday(); // 显示患者信息列表
		// });
	} else {
		$.oimsAlert("请输入ID号！");
		showPatientListToday(); // 显示患者信息列表
	}
}
/** ***************************显示患者信息****************************** */
function huanZheFenZhen_showPatientVisits(hzxx) {
	var sex = hzxx.xingbie ? "男" : "女";
	var age = getAge(hzxx.shengri.time);
	var baoxian = hzxx.yibao ? "是" : "否";
	var category = getJSONData(CATEGORY_GET_URL, {
		id : hzxx.laiyuan
	}, "POST");
	var birthday = hzxx.shengri != null ? formatDate(hzxx.shengri.time) : "";
	var regdate = hzxx.zcrq != null ? formatDate(hzxx.zcrq.time) : "";
	$.extend(hzxx, {
		sex : sex,
		age : age,
		baoxian : baoxian,
		laiyuan : category.obj.category,
		birthday : birthday,
		regdate : regdate
	});

	
	$("#opencontent_div").children("div:last").remove();
	showWithHtmlTemplate("patient", hzxx, "#opencontent_div");
}
// function huanZheFenZhen_getHtmlTemplate(template) {
// var tem = null;
// $.ajax({
// url : '../emr/template/html/' + template + '.html',
// type : 'POST',
// async : false,
// success : function(data) {
// tem = data;
// }
// });
// return tem;
// }
//
// function huanZheFenZhen_showWithHtmlTemplate(templateName, data, showTag) {
// $(showTag).find("div").remove();
// var template = huanZheFenZhen_getHtmlTemplate(templateName);
// $(template).appendTo(showTag);
// var eles = $(showTag).find("span.replaceTxt");
// // if(debugFlag)//console.log("eles.length:"+eles.length);
// $.each(eles, function(i, ele) {
// var t = $(ele).text();
// var txt = "";
// if (data != null)
// $.each(data, function(k, v) {
// var _t = "{" + k + "}";
// if (t.indexOf(_t) == -1)
// return true;
// txt = t.replace(_t, v);
// if (debugFlag)
// //console.log("{" + k + "}==>" + txt);
// return false;
// });
// // if(debugFlag)//console.log("==>"+txt);
// $(ele).text(txt).removeClass("replaceTxt");
// });
// }

/** ***************************显示患者信息****************************** */

// 查询his数据库
function huanZheFenZhen_selectHuanXhe_his(binglihao) {
	var huanZheFenZhen_selectHuanXhe_his_data = getJSONData(
			huanZheFenZhen_selectHuanXhe_his_url, {
				binglihao : binglihao,
				tag : Math.random()
			}, "POST");
	if (huanZheFenZhen_selectHuanXhe_his_data.state
			&& huanZheFenZhen_selectHuanXhe_his_data.obj != null)
		$.oimsConfirm({
			strTitle : "是否将该患者分诊到您的名下进行接诊？",
			remove_length : true
		}, function() {
			huanZheFenZhen_fenzhen(huanZheFenZhen_selectHuanXhe_his_data);
		}, function() {
			// alert("显示患者信息列表");
			showPatientListToday(); // 显示患者信息列表
		});
	else {
		$.oimsAlert("HIS数据库查无此人,请确认ID号是否正确再进行查询！");
		showPatientListToday(); // 显示患者信息列表
	}
}
// 进行分诊
function huanZheFenZhen_fenzhen(data) {
	var huanZheFenZhen_fenzhen_data = getJSONData(
			huanZheFenZhen_saveOrUpdateJiuzhen_url, {
				huanzheId : data.obj.id,
				tag : Math.random()
			}, "POST");
	if (huanZheFenZhen_fenzhen_data.state) {
		// alert("分诊成功!出现患者就诊");
		selectOnePatient(data.obj.binglihao,huanZheFenZhen_fenzhen_data.obj.id);
	} else {
		// alert("分诊失败！出现患者列表");
		showPatientListToday(); // 显示患者信息列表
	}
}
// 根据病历号查询当天的就诊记录
function huanZheFenZhen_ToDayJiuZhen(data) {
	var huanZheFenZhen_ToDayJiuZhen_data = getJSONData(
			huanZheFenZhen_ToDayJiuZhen_url, {
				huanzheId : data.obj.id
			}, "POST");
	if (huanZheFenZhen_ToDayJiuZhen_data.state
			&& huanZheFenZhen_ToDayJiuZhen_data.obj != null)
		if (huanZheFenZhen_ToDayJiuZhen_data.obj.fzys != huanZheFenZhen_ToDayJiuZhen_data.gonghao)
			$.oimsConfirm({
				strTitle : "该患者不是挂本人的号，是否接诊次患者？",
				remove_length : true
			}, function() {
				var huanZheFenZhen_saveOrUpdateJiuzhen_data = getJSONData(
						huanZheFenZhen_saveOrUpdateJiuzhen_url, {
							huanzheId : data.obj.id
						}, "POST");
				if (huanZheFenZhen_saveOrUpdateJiuzhen_data.state) {
					// alert("提示分诊成功!出现患者就诊");
					selectOnePatient(data.obj.binglihao,huanZheFenZhen_saveOrUpdateJiuzhen_data.obj.id);
				} else {
					// alert("提示分诊失败！出现患者列表");
					showPatientListToday(); // 显示患者信息列表
				}
			}, function() {
				// alert("出现患者列表");
				showPatientListToday(); // 显示患者信息列表
			});
		else
			selectOnePatient(data.obj.binglihao,huanZheFenZhen_ToDayJiuZhen_data.obj.id);
	else
		$.oimsConfirm({
			strTitle : "是否将该患者分诊到您的名下进行接诊？",
			remove_length : true
		}, function() {
			huanZheFenZhen_fenzhen(data);
		}, function() {
			// alert("显示患者信息列表");
			showPatientListToday(); // 显示患者信息列表
		});
}
// 根据病历号接诊该患者
function selectOnePatient(binglihao,jiuzhenId) { // 病历号或者是就诊id
	var iframe = $(".right #careFrame");
	$(".tablabel").remove();
	$(".mainBody").remove();
	if (!iframe.length) {
		iframe = $(
				"<iframe id='careFrame' width='100%' height='"
						+ ($('.right').height() - $('.title').height() - 2)
						+ "' frameBorder='0' scrolling='auto'/>").appendTo(
				$(".right"));
	}
	iframe[0].src = contextPath+"/emr/emr.jsp?binglihao=" + binglihao+"&visiteId="+jiuzhenId;
}

/** *************************************既往病历查询************************************************** */
function showBingLiByBingLiHao() {
	
	importJS("/js/manager/doctor/doctorManagerList.js");
	var div = $("<div id='jiwangbingli'/>").append(
			"<p>ID号：<input type='text' name='binglihao' id='binglihao' /></p>");
	div.oimsDialog({
		title : "查询",
		width : 250,
		icon : 'view',
		height : 110,
		drag : false,
		locked : true,
		winType : 4,
		button : [ {
			title : "查询",
			func : function() {
				showBingLi();
			},
			isCloseWin : true,
			className : "sumit"
		} ],
		closeCallback : function() {
			showPatientListToday(); // 显示患者信息列表
		}
	});
	$("#binglihao").focus();
	$("#binglihao").keydown(function(event) {
		if (event.keyCode == 13) {
			showBingLi();
		}
	});

	function showBingLi() {
		var binglihao = $("#binglihao").val();
		removeDiv_openWin();
		if (binglihao != null && binglihao != "") {
			executeBingLibyBingLiHao(binglihao);
		} else {
			$.oimsAlert("请输入ID号！");
			showPatientListToday(); // 显示患者信息列表
		}
	}
}
// 使用病历号查询病历
function executeBingLibyBingLiHao(binglihao) {
	var huanZheFenZhen_selectHuanXhe_data = getJSONData(bingli_findBuSerch, {
		search : binglihao,
		currentPage : 1,
		pageSize : 1,
		tag : Math.random()
	}, "POST");
	// 显示病历信息
	if (huanZheFenZhen_selectHuanXhe_data.list.length > 0) {
		var data = huanZheFenZhen_selectHuanXhe_data.list[0];
		var cp = {};
		cp.patientId = data.id;
		cp.name = data.xingming;
		cp.sex = data.xingbie;
		cp.birthday = data.shengri;
		cp.mobile = data.shouji;
		showCurrentPatient(cp);
	} else {
		$.oimsAlert("患者不存在病历！", function() {
			showPatientListToday(); // 显示患者信息列表
		});
	}
}
