var current_jcxm_id_NotIs;
var dataObjects_choice;// 选中的行数据
var btns_baoGaoNotIs;// 权限btns
var current_object_div;// 当前操作的DIV
var current_binglihao;

// 报告管理首次加载调用方法-未出报告检查单列表(整理)
function Ready_baoGaoNotIs(btns) {
	current_jcxm_id_NotIs="";
	btns_baoGaoNotIs = btns;
	pageTitle = "未出报告检查单";
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
			+ "<td width='9%'><a href='javascript:do_AdvancedSearch_baogaoNotIs();' class='search'>"
			+ "查询"
			+ "</a></td>"
			+ "<td width='45%' >"
			+ "<div class='btn'>"
			+ "<a onclick='return false;' style='width:70px;' href='javascript:baoGaoNotIsManagerXiNan_exportJcdPhoto();'><span class='exporta'></span>"
			+ "导出影像" + "</a>"
			+ "<a onclick='return false;' href='javascript:openDialog_outBaogao_baogaoNotIs();'><span class='reporta'></span>"
			+ "出报告" + "</a>" + "</div>" + "</td>" + "</tr>";
	table_advquery += "</table>";
	$(table_advquery).appendTo(div_advquery);
	btnProwerConfig(btns);// 按钮加上权限
	showJcdOfFinshNotIsList();// 已完成检查单列表
	initialData_baogao_jcxmNot();
	$("#search_binglihao").val("").focus();
	$("#search_binglihao").click(function() {
		clearInitQuery(this);
	}).blur(function() {
		if (this.value == "") {
			$("#search_binglihao").val("请输入ID号");
			$("#search_binglihao").addClass("blurview");
		}

	});
	$("#search_binglihao").bind("keyup", function(e) {
		if (e.which == 13) {
			do_AdvancedSearch_baogaoNotIs();
			var options = document.getElementsByName("checkBoxObj");
			if(options.length == 1){
				options[0].checked='true';
				openDialog_outBaogao_baogaoNotIs();
			}
			
		}
	});
	$("#div_listTable input[type='checkbox']").bind("keyup", function(e){
			var options = document.getElementsByName("checkBoxObj");
			$.each(options,function(index,input){
				if($(input).attr("checked") == 'checked' && e.which == 13){
				openDialog_outBaogao_baogaoNotIs();
				}
			});
	});
}
function initialData_baogao_jcxmNot(){
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
//		do_AdvancedSearch_baogaoNotIs();
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
	//	bgsId : 128,
		currentPage : 1,
		pageSize : 1000,// Page类的方法
		tag : Math.random()
	}, "post");
	data_baogao_jcxm = $.merge(data_baogao_jcxm,data_findJcxmsByCategoryIdAndBgsId.obj);
	$.each(data_baogao_jcxm, function(i, jcxm) {
		$("<option value=\"" + jcxm.id + "\">" + jcxm.xmmc + "</option>")
		.appendTo("#search_jcxmIds");
	});
	$("#search_jcxmIds").change(function(){
		do_AdvancedSearch_baogaoNotIs();
	});

}



// 刷新列表(整理)
function renovate_BaoGaoNotIs() {
	pageTitle = "未出报告检查单";
	init();
	var ybaogodiv = $("<div/>").attr("id", "ybaogodiv").appendTo("#right");
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
			+ "<td width='9%'><a href='javascript:do_AdvancedSearch_baogaoNotIs();' class='search'>"
			+ "查询"
			+ "</a></td>"
			+ "<td width='45%' >"
			+ "<div class='btn'>"
			+ "<a onclick='return false;' style='width:70px;' href='javascript:baoGaoNotIsManagerXiNan_exportJcdPhoto();'><span class='exporta'></span>"
			+ "导出影像" + "</a>"
			+ "<a onclick='return false;' href='javascript:openDialog_outBaogao_baogaoNotIs();'><span class='reporta'></span>"
			+ "出报告" + "</a>"
			+ "</div>" + "</td>" + "</tr>";
	table_advquery += "</table>";
	$(table_advquery).appendTo(div_advquery);
	btnProwerConfig(btns_baoGaoNotIs);// 按钮加上权限
	showJcdOfFinshNotIsList();// 已完成检查单列表
	initialData_baogao_jcxmNot();
	$("#search_binglihao").val("").focus();
	$("#search_binglihao").click(function() {
		clearInitQuery(this);
	}).blur(function() {
		if (this.value == "") {
			$("#search_binglihao").val("请输入ID号");
			$("#search_binglihao").addClass("blurview");
		}

	});
	$("#search_binglihao").bind("keyup", function(e) {
		if (e.which == 13) {
			do_AdvancedSearch_baogaoNotIs();
		}
	});
	$("#search_jcxmIds").val(current_jcxm_id_NotIs);
	$("#search_binglihao").val(current_binglihao);
	do_AdvancedSearch_baogaoNotIs();
}

// 已完成检查单列表(整理)
function showJcdOfFinshNotIsList() {
	listFactor = {
		listObj : [
//				{
//					title : "序号",
//					key : "jcdid"
//				},
				{
					title : "ID号",
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
						return (value == 1) ? "男" : "女";
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
				}, {
					title : "眼别",
					key : "yanbie_name"
				}, {
					title : "开单时间",
					key : "kdTime"
				} , {
					title : "状态",
					key : "state"
				} ],
		url : contextPath
				+ "/publish/jcd/findJcdsByPageAndJcdAndHuanZheXinXi.htm",
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			haveBaogao : 0,// 表示该检查的不存在报告
			tag : Math.random(),
			jcxmid:currentStaff.jcxmIds
		}
	};
	var div_list = $("<div/>").attr("id", "div_list").attr("class", "list")
			.appendTo("#ybaogodiv");
	$(div_list).createPageList(listFactor);
}

// 打开出报告窗口(整理)
function openDialog_outBaogao_baogaoNotIs() {
	importJS("/js/manager/baogao/baogaoController.js");
	initCssAndJs_baogaoAll();
	openDialog_outBaogao_baogaoAll(1);
	$("#a_closebaogao").unbind("click");
	$("#a_closebaogao").bind("click", renovate_BaoGaoNotIs);
}


function do_AdvancedSearch_baogaoNotIs() {
	var data_search = {};
	var binglihao = $("#search_binglihao").val().indexOf("请输入") == -1 ? $("#search_binglihao").val() : "";// 病例号
	var jcxmIds = $("#search_jcxmIds").length == 1 ? ($("#search_jcxmIds option:selected").val()?$("#search_jcxmIds option:selected").val():currentStaff.jcxmIds): "";//检查项目
	current_jcxm_id_NotIs = jcxmIds;
	current_binglihao = binglihao;
	data_search = {
		binglihao : binglihao,// 病历号
		jcxmid : jcxmIds// 检查项目
	};
	$.extend(listFactor.data, data_search);
	$("#div_list").createPageList(listFactor);
}


function baoGaoNotIsManagerXiNan_exportJcdPhoto() {
	importJS("/js/manager/baogao/photoExecute.js");
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要操作的检查单");
		return;
	}
	var xingbieName;
	if(dataObjects[0].xingbie){
		xingbieName = "男";
	}else{
		xingbieName = "女";
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
		nianling:getAge(dataObjects[0].shengri.time),
		jcxmmc:dataObjects[0].biaoti,
		yanbiename:yanbieName
	}
	exportJcdPhotoView(jcd);
	
}
