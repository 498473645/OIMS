var shebeiID;
var jianChaZhongJcdListUrl = "/publish/jcd/getJianChaZhongJcdList.htm";// 查询检查中
var updateBuChuanStateUrl = "/publish/jcd/updateBuChuanState.htm";// 查询检查中
var execureJcdListUrl = "/publish/jcd/getExecuteJcdList.htm"; // 待检列表
var ip;
var FILE_WATCH;
var nextJCDH;
$(function() {
	var gonghao = $.getUrlParam("gonghao");
	ip = $.getUrlParam("ip");
	var capture_JCDH = $.getUrlParam("JCDH");
	FILE_WATCH = $.getUrlParam("FILE_WATCH");
	var checkPatientListUrl = "/publish/jcd/getExecuteJcdListForCapture.htm";// 根据工号和IP获得设备信息
	var data = getJSONData(checkPatientListUrl, {
		ip : ip,
		biaoshi : 50,
		jcys : gonghao,
		currentPage : 1,
		pageSize : 2,
		tag : Math.random()
	}, "post");
	var jcdh;
	if (data.state && data.obj.list.length > 0) {
		jcdh = data.obj.list[0].jcdh;
		shebeiID = data.obj.shebeiId;
	}

	// if (data.state && data.obj.list.length > 1) {
	// nextJCDH = data.obj.list[1].jcdh;
	// }
	if (capture_JCDH == null || capture_JCDH == 'null' || capture_JCDH == '') {
		showHuanzhexinxi(gonghao, jcdh);
		updateJianChaZhongState(); // 修改检查中的状态为待补传
	} else {
		showHuanzhexinxi(gonghao, capture_JCDH);
		// 改变图标状态
		$("#star").removeClass("star").addClass("break");
	}
	//showInspectHuanzhe(gonghao, ip, '4714923');
});
// 显示患者头信息
function showHuanzhexinxi(gonghao, jcdh) {
	// alert(jcdh);
	if (jcdh == 'undefined' || jcdh == null || jcdh == "") {
		$(".tool").html("");
		var title = $("<span id='query' class='query'></span><span id='next' class='next-1' ></span><span id='one' class='one-1'></span><span id='star' class='star-1'></span><span id='hao' class='hao-1'></span><span id='qq' class='qq-1'></span><strong>&nbsp;&nbsp;&nbsp;&nbsp;不存在待检患者</strong> ");
		title.appendTo(".tool");
		$(".tool").css("background", "#f8f8f8");
		// 点击查询
		$("#query").click(function() {
			capture_query();
		});
	} else {
		var data = getJSONData("/publish/jcd/findJCDInfoByjcdhForCapture.htm",
				{
					jcdh : jcdh,
					gonghao : gonghao,
					tag : Math.random()
				}, "POST");
		var zhen = "急";
		if (data.obj.jcd.zhenbie == oimsCategory.ZHENBIE_ZHUYUAN) {
			zhen = "住";
			$(".main").addClass("zhu");
		} else if (data.obj.jcd.zhenbie == oimsCategory.ZHENBIE_MENZHEN) {
			zhen = "门";
			$(".main").addClass("men");
		}
		$(".tool").html("");
		var title = $("<div><span id='query' class='query'></span><span id='next' class='next' ></span><span id='one' class='one-1'></span><span id='star' class='star'></span><span id='hao' class='hao-1'></span><span id='qq' class='qq'></span>"+"<span class='huanzheName'>"
				+ zhen
				+ "</span>&nbsp;&nbsp;<font>"
				+ data.obj.jcd.xingming
				+ "</font> (病历号："
				+ data.obj.jcd.binglihao
				+ ")&nbsp;"
				+ data.obj.jcd.hzxb
				+ "&nbsp; "
				+ data.obj.jcd.nianling
				+ "岁</div>");
           $(".tool").append(title);

		// 结束检查
		function finishJianCha() {
			alert("检查结束时间"+getNow());
			capture_start("");
			var url_executeJcdEnd = "/publish/jcd/executeJcdEnd.htm";
			var data_executeJcdEnd = getJSONData(url_executeJcdEnd, {
				id : data.obj.jcd.id,
				jcys : gonghao,
				jcjsDate:getNow(),
				tag : Math.random()
			}, "post");
			// //取消完成检查的操作
			// $("#one").unbind("click", finishJianCha);
			// $("#one").removeClass("one").addClass("one-1");

			selectDaiJianHuanZhe();
			// 更换患者信息
			showHuanzhexinxi(gonghao, nextJCDH);
		}

		// 点击详情
		$("#qq").click(function() {
			capture_details(jcdh, gonghao);
		});
		// 点击查询
		$("#query").click(function() {
			capture_query();
		});
		// 过号
		$("#next").click(function() {
			alert("执行过号操作！");
			var url_executeJcdPass = "/publish/jcd/executeJcdPass.htm";//
			// 将检查单进行过号操作，并删除排队标识
			var data_executeJcdPass = getJSONData(url_executeJcdPass, {
				id : data.obj.jcd.id,
				tag : Math.random()
			}, "post");
			// 查询下一个要显示的患者信息
			selectDaiJianHuanZhe();
			// 更换Title的头部信息
			showHuanzhexinxi(gonghao, nextJCDH);

		});

		// 检查开始
		$("#star").click(function() {
			alert("检查开始时间"+getNow());
			// 判断Class的名字
			if ($(this).attr("class") == 'star') {
				capture_start(jcdh);
				var url_executeJcdStart = "/publish/jcd/executeJcdStart.htm";
				var data_executeJcdStart = getJSONData(url_executeJcdStart, {
					id : data.obj.jcd.id,// 检查单ID
					jcsbId : shebeiID,// 检查设备ID
					jcksDate:getNow(),
					jcys : gonghao
				// 检查医生
				}, "post");
				if (data_executeJcdStart.state) {
					$(this).removeClass("star").addClass("break");
				} else {
					alert("开始采集失败");
				}
				// 绑定完成检查的事件
				$("#one").bind("click", finishJianCha);
				$("#one").removeClass("one-1").addClass("one");
			} else {
				capture_start("");
				var url_executeJcdReset = "/publish/jcd/executeJcdReset.htm";
				var data_executeJcdReset = getJSONData(url_executeJcdReset, {
					id : data.obj.jcd.id,
					tag : Math.random()
				}, "post");// 检查单ID
				if (data_executeJcdReset.state) {
					$(this).removeClass("break").addClass("star");
				} else {
					alert("结束采集失败");
				}
			}
		});
		$("#hao").click(function() {
			alert("执行叫好操作！");
		});

		if (FILE_WATCH == "true") {
			removeStarAndEndClick();
		}
	}
	addTitle();
}

function showInspectHuanzhe(gonghao, ip, blh) {
	//alert("病历号是：" + blh);
	var checkPatientListUrl = "/publish/jcd/getExecuteJcdListForCapture.htm";// 根据工号和IP获得设备信息
	var data = getJSONData(checkPatientListUrl, {
		ip : ip,
		jcys : gonghao,
		blh : blh,
		currentPage : 1,
		pageSize : 1,
		tag : Math.random()
	}, "post");
	var jcdh = data.obj.list[0].jcdh;
	//alert("检查单好是" + jcdh);
	shebeiID = data.obj.shebeiId;
	showHuanzhexinxi(gonghao, jcdh);
}

// 修改检查中的检查单状态
function updateJianChaZhongState() {
	var data1 = getJSONData(jianChaZhongJcdListUrl, {
		jcsbId : shebeiID,
		biaoshi : oimsCategory.JCD_STATE_JCZ,// 53表示已过号检查单
		search : $("#queryinput").val(),
		currentPage : 1,
		pageSize : 10,
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

// 禁用开始完成操作
function removeStarAndEndClick() {
	$("#one").unbind("click");
	$("#star").unbind("click");
	$("#one").removeClass("one").addClass("one-1");
	$("#star").removeClass("star").addClass("star-1");
}
// 查询待检患者列表
function selectDaiJianHuanZhe() {
	var data = getJSONData(execureJcdListUrl, {
		jcsbId : shebeiID,
		biaoshi : oimsCategory.JCD_STATE_DJC,// 待检查
		currentPage : 1,
		pageSize : 2,
		tag : Math.random()
	}, "post");
	if (data.list.length > 0) {
		nextJCDH = data.list[0].jcdh;
	}
}

function addTitle() {
	$("#query").attr("title", "查询");
	$("#next").attr("title", "过号");
	$("#one").attr("title", "完成");
	$("#star").attr("title", "开始");
	$("#hao").attr("title", "叫号");
	$("#qq").attr("title", "详情");
}