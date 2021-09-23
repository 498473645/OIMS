// 待检查检查单高级查询
function seniorSearchSubmit_executeJcd() {
	var data_search = {};
	var search = $("#search_binglihao_xingming").val().indexOf("请输入") != -1 ? ""
			: $("#search_binglihao_xingming").val();
	var blh = $("#search_blh").length == 1 ? $("#search_blh").val() : "";// 病例号
	var hzxm = $("#search_hzxm").length == 1 ? $("#search_hzxm").val() : "";// 患者姓名
	var xingbie = $("#search_xingbie").length != 0 ? $(
			"input[name='search_xingbie']:checked").val() : 2;// 患者性别
	var sfzh = $("#search_sfzh").length == 1 ? $("#search_sfzh").val() : "";// 身份证号
	var shouji = $("#search_shouji").length == 1 ? $("#search_shouji").val()
			: "";// 手机
	var zhenbie = $("#search_zhenbie").length != 0 ? $(
			"input[name='search_zhenbie']:checked").val() : "";// 诊别
	var jcxmid = $("#search_jcxmIds").length == 1 ? $(
			"#search_jcxmIds option:selected").val() : "";// 检查项目
	var kdys = $("#search_kdys").length == 1 ? $("#search_kdys option:selected")
			.val()
			: "";// 开单医生
	var startkdsj = $("#search_startkdsj").length == 1 ? $("#search_startkdsj")
			.val() : "";// 开单时间 开始
	var endkdsj = $("#search_endkdsj").length == 1 ? $("#search_endkdsj").val()
			: "";// 开单时间 结束
	data_search = {
		search : search,
		blh : blh,// 病例号
		hzxm : hzxm,// 患者姓名
		xingbie : xingbie,// 患者性别
		shouji : shouji,// 手机
		sfzh : sfzh,// 身份证号
		zhenbie : zhenbie,// 诊别
		jcxmid : jcxmid,// 检查项目
		kdys : kdys,// 开单医生
		startkdsj : startkdsj,// 开单时间 开始
		endkdsj : endkdsj
	// 开单时间 结束
	};
	$.extend(listFactor.data, data_search);
	$("#pageList").createPageList(listFactor);
}

function closeReporeDialog() {
	$("#searchId").val("请输入病历号或刷卡后回车");
	$("#searchId").addClass("blurview");
	$("#xingming").val("");// 患者姓名
	$("#xingbie").val("");// 患者性别
	$("#nianling").val("");// 年龄
	$("#shouji").val("");// 手机
	$("#jcxmmc").val("");// 检查项目
	$("#yanbie").val("");// 眼别
	$("#jcdid").val("");// 检查单号
	$("#yaoqiu").val("");// 检查要求
	$("#zhenduan").val("");// 诊断
	$("#zushu").val("");// 主诉
	$("#xianbingshi").val("");// 现病史
	$("#jiwangshi").val("");// 既往史
	$("#jiazushi").val("");// 家族史
	$("#jcsj").val("");// 检查所见
	seniorSearchSubmit_executeJcd();// 刷新列表
	removeDiv_openWin();
}