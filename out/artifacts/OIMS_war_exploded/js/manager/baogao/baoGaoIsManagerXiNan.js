var current_jcxm_id;// 所有的设备信息
var dataObjects_choice;// 选中的行数据
var btns_baoGaoIs;// 权限btns
var current_object_div;//当前操作的DIV
var current_binglihao;
// 报告管理首次加载调用方法-已出报告检查单列表(整理)
function Ready_baoGaoIs(btns) {
	current_jcxm_id="";
	btns_baoGaoIs = btns = btns!=undefined?btns:[];
	pageTitle = "已出报告检查单";
	init();
	var ybaogodiv = $("<div/>").attr("id", "ybaogodiv").appendTo("#right");
	$("<input/>").attr("id","isprintsuc").attr("type","hidden").attr("value","0").appendTo(ybaogodiv);
	$(".title").appendTo(ybaogodiv);
	var div_advquery = $("<div/>").attr("id", "advquery").attr("class",
			"advquery").appendTo(ybaogodiv);
	var table_advquery = "";
	table_advquery += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	table_advquery += "<tr>"
			+ "<td width='23%' class='leftalign'><input name='search_binglihao' type='text' class='blurview' id='search_binglihao' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"
			+ "请输入ID号"
			+ "' size='28' /></td>" 
			+ "<td width='23%'>" 
			+ "<select name='search_jcxmIds' id='search_jcxmIds' onblur=\"this.className='blur'\">"
			+ "<option value=''></option></select></td>" 
			+ "<td width='9%'><a href='javascript:do_AdvancedSearch_baogaoIs();' class='search'>"
			+ "查询"
			+ "</a></td>"
			+ "<td width='9%'><a href='javascript:openDialog_AdvancedSearch_Jcd_baogaoIs();' class='advsearch' id='advsearch'>"
			+ "高级查询"
			+ "</a></td>"
			+ "<td width='45%' >"
			+ "<div class='btn'>"
			+ "<a onclick='return false;' href='javascript:deleteBaoGao();'><span class='dela'></span>"
			+ "删除" + "</a>"
			+ "<a onclick='return false;' style='width:70px;' href='javascript:baoGaoIsManagerXiNan_exportJcdPhoto();'><span class='exporta'></span>"
			+ "导出影像" + "</a>"
			+ "<a onclick='return false;' href='javascript:seeBaogao_baogaoIs();'><span class='viewa'></span>"
			+ "查看" + "</a>"
			+ "</div>" + "</td>" + "</tr>";
	table_advquery += "</table>";
	$(table_advquery).appendTo(div_advquery);
	btnProwerConfig(btns);// 按钮加上权限
	showJcdOfFinshIsList();// 已完成检查单列表
	initialData_baogao_jcxm();
	$("#search_binglihao").val("").focus();
	$("#search_binglihao").click(function() {
		clearInitQuery(this);
	});// 点击输入框清空字体
	$("#search_binglihao").blur(function() {
		if (this.value == "") {
			$("#search_binglihao").val("请输入ID号");
			$("#search_binglihao").addClass("blurview");
		}

	});
	$("#search_binglihao").bind("keyup", function(e) {
		if (e.which == 13) {
			do_AdvancedSearch_baogaoIs();
		}
	});
}
/**
 * 王涛 2015-01-23*/
function deleteBaoGao(){
	dataObjects_choice = getCheckBoxValue();
	if (dataObjects_choice.length == 0) {
		$.oimsAlert("请选择需要操作的检查单");
		return;
	}
	$.oimsConfirm({
		strTitle : "确定同时删除检查单么？",
		remove_length : true
	}, deletebaogaoAndJcd, deletebaogaoOnly);
}
/********************删除报告************************/
function deletebaogaoOnly(){
	var url_deleteBaogaoByBaogao = "/publish/baogao/deleteBaogaoByBaogao.htm";
	var date_deleteBaogaoByBaogao = getJSONData(url_deleteBaogaoByBaogao, {
		jcdId : dataObjects_choice[0].jcdid,
		tag : Math.random()
	}, "post");
	if(date_deleteBaogaoByBaogao.state){
		$.oimsSucc(date_deleteBaogaoByBaogao.message,do_AdvancedSearch_baogaoIs);
	}else{
		$.oimsError(date_deleteBaogaoByBaogao.message,do_AdvancedSearch_baogaoIs);
	}
}
/********************删除报告************************/
/********************删除报告同时删除检查单************************/
function deletebaogaoAndJcd(){
	var url_deleteJcdByJcd = "/publish/jcd/deleteJcdByJcd.htm";
	var data_deleteJcdByJcd = getJSONData(url_deleteJcdByJcd, {
		id : dataObjects_choice[0].jcdid,
		tag : Math.random()
	}, "post");
	if(data_deleteJcdByJcd.state){
		deletebaogaoOnly();
	}else{
		$.oimsError(data_deleteJcdByJcd.message,do_AdvancedSearch_baogaoIs);
	}
}
/********************删除报告同时删除检查单************************/
// 刷新列表(整理)
function renovate_BaoGaoIs() {
	pageTitle = "已出报告检查单";
	init();
	var div_advquery = $("<div/>").attr("id", "advquery").attr("class",
			"advquery").appendTo("#right");
	var table_advquery = "";
	table_advquery += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	table_advquery += "<tr>"
			+ "<td width='23%' class='leftalign'><input name='search_binglihao' type='text' class='blurview' id='search_binglihao' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"
			+ "请输入ID号"
			+ "' size='28' /></td>" 
			+ "<td width='23%'>" 
			+ "<select name='search_jcxmIds' id='search_jcxmIds' onblur=\"this.className='blur'\">"
			+ "<option value=''></option></select></td>" 
			+ "<td width='9%'><a href='javascript:do_AdvancedSearch_baogaoIs();' class='search'>"
			+ "查询"
			+ "</a></td>"
			+ "<td width='9%'><a href='javascript:openDialog_AdvancedSearch_Jcd_baogaoIs();' class='advsearch' id='advsearch'>"
			+ "高级查询"
			+ "</a></td>"
			+ "<td width='45%' >"
			+ "<div class='btn'>"
			+ "<a onclick='return false;' href='javascript:deleteBaoGao();'><span class='dela'></span>"
			+ "删除" + "</a>"
			+ "<a onclick='return false;' style='width:70px;' href='javascript:baoGaoIsManagerXiNan_exportJcdPhoto();'><span class='exporta'></span>"
			+ "导出影像" + "</a>"
			+ "<a onclick='return false;' href='javascript:seeBaogao_baogaoIs();'><span class='viewa'></span>"
			+ "查看" + "</a>"
			+ "</div>" + "</td>" + "</tr>";
	table_advquery += "</table>";
	$(table_advquery).appendTo(div_advquery);
	btnProwerConfig(btns_baoGaoIs);// 按钮加上权限
	showJcdOfFinshIsList();// 已完成检查单列表
	initialData_baogao_jcxm();
	$("#search_binglihao").val("").focus();
	$("#search_binglihao").click(function() {
		clearInitQuery(this);
	});// 点击输入框清空字体
	$("#search_binglihao").blur(function() {
		if (this.value == "") {
			$("#search_binglihao").val("请输入ID号");
			$("#search_binglihao").addClass("blurview");
		}

	});
	$("#search_binglihao").bind("keyup", function(e) {
		if (e.which == 13) {
			do_AdvancedSearch_baogaoIs();
		}
	});
	$("#search_jcxmIds").val(current_jcxm_id);
	$("#search_binglihao").val(current_binglihao);
	do_AdvancedSearch_baogaoIs();
}


function initialData_baogao_jcxm(){
//	var url_findAllJcxm = "/publish/jcxm/findAllJcxm.htm"; // 查询所有检查项目信息
//	var data_baogao_jcxm = getJSONData(url_findAllJcxm, {
//		categoryId:oimsCategory.YAN_KE_JIAN_CHA,
//		currentPage:1,
//		pageSize:1000,
//		tag : Math.random()
//	}, "post").obj;
//	$.each(data_baogao_jcxm, function(i, jcxm) {
//		$("<option value=\"" + jcxm.id + "\">" + jcxm.xmmc + "</option>")
//		.appendTo("#search_jcxmIds");
//	});
//	$("#search_jcxmIds").change(function(){
//		do_AdvancedSearch_baogaoIs();
//	});
	
	var url_findAllJcxm = "/publish/jcxm/findAllJcxm.htm"; // 查询所有检查项目信息
	var data_baogao_jcxm = getJSONData(url_findAllJcxm, {
		categoryId:oimsCategory.YAN_KE_JIAN_CHA,
		currentPage:1,
		pageSize:1000,
		tag : Math.random()
	}, "post").obj;
	var url_findJcxmsByCategoryIdAndBgsId = "/publish/jcxm/findJcxmList.htm";
	var data_findJcxmsByCategoryIdAndBgsId = getJSONData(url_findJcxmsByCategoryIdAndBgsId, {
		categoryId : 5,
		bgsId : 128,
		currentPage : 1,
		pageSize : getPageSize(),// Page类的方法
		tag : Math.random()
	}, "post");
	data_baogao_jcxm = $.merge(data_baogao_jcxm,data_findJcxmsByCategoryIdAndBgsId.obj);
	$.each(data_baogao_jcxm, function(i, jcxm) {
		$("<option value=\"" + jcxm.id + "\">" + jcxm.xmmc + "</option>")
		.appendTo("#search_jcxmIds");
	});
	$("#search_jcxmIds").change(function(){
		do_AdvancedSearch_baogaoIs();
	});

}
//function findJcxmsByGH(){
//	var url_findJcxmsByGH = "/publish/jcxm/findJcxmsByGH.htm";// 根据部门ID，查询该部门下所有可以做的检查项目
//	var data_findJcxmsByGH = getJSONData(url_findJcxmsByGH, {
//		tag : Math.random()
//	}, "post");
//	var yg_jcxmid='';
//	if(data_findJcxmsByGH.state){
//		$.each(data_findJcxmsByGH.obj,function(i,n){
//			if(i!=data_findJcxmsByGH.obj.length-1){
//				yg_jcxmid+=this.id+",";
//			}
//			else{
//				yg_jcxmid+=this.id;
//			}
//		});
//	}
//	return yg_jcxmid;
//}
/*
 * 梁建业 已完成检查单列表
 */
function showJcdOfFinshIsList() {
	//根据登录人员筛选可以查看检查项目
	
	
	listFactor = {
		listObj : [
//				{
//					title : "序号",
//					key : "jcdid"
//				},
				{
					title : "病历号",
					key : "binglihao"
				},
//				{
//					title : "检查单号",
//					key : "jcdh"
//				},
				{
					title : "姓名",
					key : "xingming"
				},
				{
					title : "性别",
					key : "xingbie",
					func : function(value) {
						return (value == 0) ? "女" : "男";
					}
				},
				{
					title : "年龄",
					key : "shengri",
					func : function(value) {
						return getAge(value.time);
					}
				}, {
					title : "手机",
					key : "shouji"
				},
//				{
//					title : "身份证",
//					key : "sfzh"
//				}, 
//				{
//					title : "检查设备",
//					key : "sbmc"
//				}, 
//				{
//					title : "检查科室",
//					key : "bmmc"
//				}, 
				{
					title : "检查项目",
					key : "jcxmmc"
				}, 
				{
					title : "眼别",
					key : "yanbie_name"
				},
//				{
//					title : "状态",
//					key : "state_name"
//				}, 
				{
					title : "开单时间",
					key : "kdTime"
				} , {
					title : "状态",
					key : "state"
				} ],
		url : contextPath
				+ "/publish/jcd/findJcdsByPageAndJcdAndHuanZheXinXiXiNan.htm",
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			haveBaogao : 1,// 表示该检查的已经存在报告
			tag : Math.random()
		}
	};
	var div_list = $("<div/>").attr("id", "div_list").attr("class", "list")
			.appendTo("#ybaogodiv");
	$(div_list).createPageList(listFactor);
}

// 弹出高级查询窗口(整理)
function openDialog_AdvancedSearch_Jcd_baogaoIs() {
	var table_AdvancedSearch = "";
	table_AdvancedSearch += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	table_AdvancedSearch += "<tr>"
		+ " <td width='8%' align='right' nowrap>"
		+ "检查医生"
		+ "：</td>"
		+ " <td width='13%'><select name='search_jcys' id='search_jcys' onblur=\"this.className='blur'\">"
		+ " <option value=''></option>"
		+ " </select></td>"
		+ " <td align='right' nowrap> "
		+ "检查时间"
		+ "：</td>"
		+ " <td><input type='text' name='search_startjcsj'   id='search_startjcsj'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
		+ " <td align='center' nowrap>"
		+ "至"
		+ "</td>"
		+ " <td><input type='text' name='search_endjcsj'   id='search_endjcsj'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
		+ "</tr>";
	table_AdvancedSearch += "<tr>"
		+ " <td width='8%' align='right' nowrap>"
		+ "开单医生"
		+ "：</td>"
		+ " <td width='13%'><select name='search_jcys' id='search_kdys' onblur=\"this.className='blur'\">"
		+ " <option value=''></option>"
		+ " </select></td>"
		+ " <td align='right' nowrap> "
		+ "开单时间"
		+ "：</td>"
		+ " <td><input type='text' name='search_startkdsj'   id='search_startkdsj'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
		+ " <td align='center' nowrap>"
		+ "至"
		+ "</td>"
		+ " <td><input type='text' name='search_endkdsj'   id='search_endkdsj'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
		+ "</tr>";
	table_AdvancedSearch += "</table>";
	table_AdvancedSearch += " <div class='avdopenbutton' >";
	table_AdvancedSearch += "<a href='javascript:do_AdvancedSearch_baogaoIs();'><span class='advsumit'></span>"
			+ "提交"
			+ "</a> "
			+ "<a href='javascript:reset_AdvancedSearch_baogaoIs();'><span class='advreset'></span>"
			+ "重置"
			+ "</a>"
			+ "<a id = 'closeId'><span class='close' ></span>"
			+ "关闭" + "</a>";
	table_AdvancedSearch += "</div>";
	$.oimsBox({
		parentDiv : "advquery",// 将生成内容添加的id
		divContent : table_AdvancedSearch
	// 需要添加的内容
	});
	$("#search_jcys")[0].options.length = 0;// 清空检查设备下拉框
	$("#search_kdys")[0].options.length = 0;// 清空检查项目下拉框
	$("<option value=''></option>").appendTo("#search_jcys");
	$("<option value=''></option>").appendTo("#search_kdys");
	var data_getKaiDanDoctorByQuanxian = getJSONData(
			"/publish/yuangong/getKaiDanDoctorByQuanxian.htm", {
				tag : Math.random()
			}, "post");
	if (data_getKaiDanDoctorByQuanxian.state) {
		var yuangonglist = data_getKaiDanDoctorByQuanxian.obj;
		$.each(yuangonglist, function(i, yuangong) {
			$("<option value=\"" + yuangong.gonghao + "\">"
							+ yuangong.xingming + "</option>").appendTo("#search_kdys");
		});
	}
	var data_getJianChaDoctorByBumenAndQuanxian = getJSONData(
			"/publish/yuangong/getJianChaDoctorByBumenAndQuanxian.htm", {// 获取具有检查权限的医生
				tag : Math.random()
			}, "post");
	if (data_getJianChaDoctorByBumenAndQuanxian.state) {
		var yuangonglist = data_getJianChaDoctorByBumenAndQuanxian.obj;
		$.each(yuangonglist, function(i, yuangong) {
			$("<option value=\"" + yuangong.gonghao + "\">"
							+ yuangong.xingming + "</option>").appendTo("#search_jcys");
		});
	}
	calendarFun("search_startjcsj");
	calendarFun("search_endjcsj");
	calendarFun("search_startkdsj");
	calendarFun("search_endkdsj");
}

// 执行高级查询(整理)
function do_AdvancedSearch_baogaoIs() {
	var data_search = {};
	var binglihao = $("#search_binglihao").val().indexOf("请输入") == -1 ? $("#search_binglihao").val() : "";// 病例号
	var jcxmIds = $("#search_jcxmIds").length == 1 ? $("#search_jcxmIds option:selected").val() : "";//检查项目
	var kdys = $("#search_kdys").length==1?$("#search_kdys option:selected").val():"";  //开单医生
	var jcys = $("#search_jcys").length==1?$("#search_jcys option:selected").val():"";  //检查医生
	var startjcsj = $("#search_startjcsj").length==1?$("#search_startjcsj").val():"";   //检查开始时间
	var endjcsj = $("#search_endjcsj").length==1?$("#search_endjcsj").val():"";   //检查开始时间
	var startkdsj = $("#search_startkdsj").length==1?$("#search_startkdsj").val():"";   //检查开始时间
	var endkdsj = $("#search_endkdsj").length==1?$("#search_endkdsj").val():"";   //检查开始时间
	current_binglihao = binglihao;
	current_jcxm_id = jcxmIds;
	data_search = {
		binglihao : binglihao,// 病历号
		jcxmid : jcxmIds,// 检查项目
		startjcsj:startjcsj,
		endjcsj:endjcsj,
		startkdsj:startkdsj,
		endkdsj:endkdsj,
		kdys:kdys,
		jcys:jcys
	};
	$.extend(listFactor.data, data_search);
	$("#div_list").createPageList(listFactor);
}

// 报告查看(整理)
function seeBaogao_baogaoIs() {
	importJS("/js/manager/baogao/baogaoController.js");
	initCssAndJs_baogaoAll();
	openDialog_outBaogao_baogaoAll();
	$("#a_closebaogao").unbind("click");
	//$("#a_closebaogao").bind("click", renovate_BaoGaoIs);
}

function baoGaoIsManagerXiNan_exportJcdPhoto(){
	importJS("/js/manager/baogao/photoExecute.js");
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要操作的检查单");
		return;
	}
	var xingbieName=dataObjects[0].hzxb;
	var age = dataObjects[0].nianling;
	if(xingbieName==undefined){
		xingbieName = dataObjects[0].xingbie?"男":"女";
		age = getAge(dataObjects[0].shengri.time);
	}
	var yanbieName = dataObjects[0].yanbie_name;
	if(yanbieName==undefined || yanbieName==""){
		var yanbie = dataObjects[0].yanbie;
		if(yanbie==oimsCategory.LEFT_EYE){
			yanbieName = "左眼";
		}else if(yanbie == oimsCategory.RIGHT_EYE){
			yanbieName = "右眼";
		}else{
			yanbieName = "双眼";
		}
	}
	var jcd ={
		jcdid:dataObjects[0].jcdid,
		xingming:dataObjects[0].xingming,
		binglihao:dataObjects[0].binglihao,
		xingbieName:xingbieName,
		nianling:age,
		jcxmmc:dataObjects[0].biaoti,
		yanbiename:yanbieName
	}
	exportJcdPhotoView(jcd);
}

//function do_AdvancedSearch_baogaoIs() {
//	var data_search = {};
//	var binglihao = $("#search_binglihao").val().indexOf("请输入") == -1 ? $("#search_binglihao").val() : "";// 病例号
//	var jcxmIds = $("#search_jcxmIds").length == 1 ? $("#search_jcxmIds option:selected").val() : "";//检查项目
//	current_jcxm_id = jcxmIds;
//	data_search = {
//		binglihao : binglihao,// 病历号
//		jcxmIds : jcxmIds// 检查项目
//	};
//	$.extend(listFactor.data, data_search);
//	$("#div_list").createPageList(listFactor);
//}