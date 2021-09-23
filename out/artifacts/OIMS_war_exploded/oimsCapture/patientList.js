var ip;
var gonghao;
var shebeiId = 0;
var checkPatientListUrl = "/publish/jcd/getExecuteJcdListForCapture.htm";// 待检列表初始化
var execureJcdListUrl = "publish/jcd/getExecuteJcdList.htm"; // 待检列表
var guoHaoJcdListUrl = "/publish/jcd/getGuoHaoJcdList.htm";// 已过号列表
var finishJcdListUrl = "/publish/jcd/getFinishJcdList.htm"; // 已检患者列表
var daiBuChuanJcdListUrl = "/publish/jcd/getBuChuanJcdList.htm";// 查询待补传的检查单
var jianChaZhongJcdListUrl = "/publish/jcd/getJianChaZhongJcdList.htm";// 查询检查中
var updateBuChuanStateUrl = "/publish/jcd/updateBuChuanState.htm";// 查询检查中
var page = 1;
var pageSize = 5;
var biaoshi = 1;
var titleJCDH = null;
$(function() {
	gonghao = $.getUrlParam("gonghao");
	ip = $.getUrlParam("ip");
	$("#pageList").html("");
	var data = getJSONData(checkPatientListUrl, {
		ip : ip,
		biaoshi : 50,
		jcys : gonghao,
		currentPage : page,
		pageSize : pageSize,
		tag : Math.random()
	}, "post");
	shebeiId = data.obj.shebeiId;
	page = data.obj.page.currentPage;
	$("#daijian").css("background", "#FF0000");
	eachData(data.obj.list);


	// 过号患者列表
	$("#guohao").click(function() {
		biaoshi = 2;
		page = 1;
		$(".btn span").css("background", "#e9e9e9");
		$(this).css("background", "#FF0000");
		choosePatientList();
	});
	// 待检患者列表
	$("#daijian").click(function() {
		biaoshi = 1;
		page = 1;
		$(".btn span").css("background", "#e9e9e9");
		$(this).css("background", "#FF0000");
		choosePatientList();
	});
	// 已检患者列表
	$("#yiwancheng").click(function() {
		biaoshi = 3;
		page = 1;
		$(".btn span").css("background", "#e9e9e9");
		$(this).css("background", "#FF0000");
		choosePatientList();
	});
	// 待补传患者列表
	$("#daibuchuan").click(function() {
		biaoshi = 4;
		page = 1;
		$(".btn span").css("background", "#e9e9e9");
		$(this).css("background", "#FF0000");
		choosePatientList();
	});
});
// 填充患者列表
function eachData(list) {
	var tableObject = $("<table/>").attr("width", "100%");
	$(tableObject).addClass("querytable");
	$(tableObject).appendTo($("#pageList"));
	$(
			"<tr><th>序号</th><th>病历号</th><th>姓名</th><th>性别</th><th>年龄</th><th>诊别</th><th>检查项目</th><th>计费状态</th></tr>")
			.appendTo(tableObject);
	$.each(list, function(i, object) {
		var zhen = "急诊";
		if (object.zb == oimsCategory.ZHENBIE_ZHUYUAN) {
			zhen = "住院";
		} else if (object.zb == oimsCategory.ZHENBIE_MENZHEN) {
			zhen = "门诊";
		}
		var jfbsValue =object.jfbs?"<td>已缴费</td>":"<td style='color:red;'>未缴费</td>";
		if (i % 2 == 0) {
			$(
					"<tr><td>" + object.paihao + "</td><td>" + object.binglihao
							+ "</td><td>" + object.hzxm + "</td><td>"
							+ object.hzxb + "</td><td>" + object.nianling
							+ "</td><td>" + zhen + "</td><td>" + object.jcxmmc
							+ "</td>" +jfbsValue
							+ "</tr>").appendTo(tableObject);
			$(
					"<input type='hidden' id=o" + object.paihao + " value="
							+ object.jcdh + " />").appendTo("#pageList");
		} else {
			$(
					"<tr><td>" + object.paihao + "</td><td>" + object.binglihao
							+ "</td><td>" + object.hzxm + "</td><td>"
							+ object.hzxb + "</td><td>" + object.nianling
							+ "</td><td>" + zhen + "</td><td>" + object.jcxmmc
							+ "</td>" +jfbsValue
							+ "</tr>").addClass("bg")
					.appendTo(tableObject);
			$(
					"<input type='hidden' id=o" + object.paihao + " value="
							+ object.jcdh + " />").appendTo("#pageList");
		}
	});

	// 双击事件
	$(".querytable tr:gt(0)").dblclick(
			function() {
				var jcdh = $("#o" + $(this).find("td").eq(0).text()).val();
//				alert(titleJCDH);
				if (biaoshi != 3 && (titleJCDH==null||titleJCDH == "")) {// 不是已完成
					capture_doubleList(jcdh, gonghao);
				}
				location.href = contextPath
						+ "/oimsCapture/patientInfo.jsp?jcdh=" + jcdh
						+ "&gonghao=" + gonghao + "";
			});
}
// 修改检查中的检查单状态
function updateJianChaZhongState() {
	var data1 = getJSONData(jianChaZhongJcdListUrl, {
		jcsbId : shebeiId,
		biaoshi : oimsCategory.JCD_STATE_JCZ,// 53表示已过号检查单
		search : $("#queryinput").val(),
		currentPage : page,
		pageSize : pageSize,
		tag : Math.random()
	}, "post");
	if (data1.list.length > 0) {
		alert("存在状态为‘检查中’的患者，现已将这些患者的检查单状态设置为‘待补传’，请到待补传列表查看这些信息！");
		$.each(data1.list, function(i, object) {
			getJSONData(updateBuChuanStateUrl, {
				id : object.jcdid,
				tag : Math.random()
			}, "post");
		});
	}
}
// 点击查询
// 根据病历号查询患者列表
function clickTest() {
	$("#pageList").html("");
	page = 1;
	choosePatientList();
}
// 点击下一页
// 下一页
function clickNext() {
	$("#pageList").html("");
	page += 1;
	choosePatientList();
}
// 上一页
// 点击上一页
function clickUP() {
	$("#pageList").html("");
	page -= 1;
	if (page == 0) {
		page = 1;
	}
	choosePatientList();
}
// 查询已过号患者
function guohaoPtientList() {
	$("#pageList").html("");
	var data = getJSONData(guoHaoJcdListUrl, {
		jcsbId : shebeiId,
		biaoshi : oimsCategory.JCD_STATE_YGH,// 53表示已过号检查单
		search : $("#queryinput").val(),
		currentPage : page,
		pageSize : pageSize,
		tag : Math.random()
	}, "post");
	return data;
}
// 查询待检患者
function daijianPtientList() {
	$("#pageList").html("");
	var data = getJSONData(checkPatientListUrl, {
		ip : ip,
		biaoshi : oimsCategory.JCD_STATE_DJC,
		jcys : gonghao,
		search : $("#queryinput").val(),
		currentPage : page,
		pageSize : pageSize,
		tag : Math.random()
	}, "post");
	return data;
}
// 已检患者列表
function yijianPatientList() {
	$("#pageList").html("");
	var data = getJSONData(finishJcdListUrl, {
		jcsbId : shebeiId,
		biaoshi : oimsCategory.JCD_STATE_YWC,
		search : $("#queryinput").val(),
		currentPage : page,
		pageSize : pageSize,
		tag : Math.random()
	}, "post");
	return data;
}
// 待补传患者列表
function daibuchuanPatientList() {
	$("#pageList").html("");
	var data = getJSONData(daiBuChuanJcdListUrl, {
		jcsbId : shebeiId,
		biaoshi : oimsCategory.JCD_STATE_DBC,// 52表示待补传检查单
		search : $("#queryinput").val(),
		currentPage : page,
		pageSize : pageSize,
		tag : Math.random()
	}, "post");
	return data;
}
// 选择需要显示的列表
function choosePatientList() {
	if (biaoshi == 1) {
		var daijian_data = daijianPtientList();
		page = daijian_data.obj.page.currentPage;
		eachData(daijian_data.obj.list);
	} else if (biaoshi == 2) {
		var guohao_data = guohaoPtientList();
		page = guohao_data.page.currentPage;
		eachData(guohao_data.list);
	} else if (biaoshi == 3) {
		var yijian_data = yijianPatientList();
		page = yijian_data.page.currentPage;
		eachData(yijian_data.list);
	} else if (biaoshi == 4) {
		var daibuchuan_data = daibuchuanPatientList();
		page = daibuchuan_data.page.currentPage;
		eachData(daibuchuan_data.list);
	}
}
// 抬头信息的检查单号
function checkJCDH(Title_jcdh) {
	titleJCDH = Title_jcdh;
}