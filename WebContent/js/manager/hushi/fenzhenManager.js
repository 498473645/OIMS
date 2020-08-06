var getFzysToday_url = "/publish/emr/getFzysToday.htm"; // 查询今日负责医生列表
var getVisitListByState_url = '/publish/emr/getvisitlistbystate.htm';// 获取该就诊状态下的就诊信息
var getKaiDanDoctorByQuanxian_url = '/publish/yuangong/getKaiDanDoctorByQuanxian.htm';// 获取有开单医生的权限
var huanZheFenZhen_saveOrUpdateJiuzhen_url = "/publish/jiuzhen/saveOrUpdateJiuzhen.htm"; // 根据ID号进行分诊
var searchData = {
	currentPage : 1,
	pageSize : getPageSize() - 1,
	searchText : null,
	state : oimsCategory.VISITING_STATE_WAIT + ','
			+ oimsCategory.VISITING_STATE_YIGUOHAO,
	tag : Math.random(),
	gonghao : $("#helpOtherDoctor").val()
};
function initPatientListPage_fenzhen() {
	var rt = "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
			+ "<tr>"
			+ "<td width='23%' class='leftalign'><input type='text' size='28' value='"
			+ "请输入患者ID号或姓名"
			+ "' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" id='search_binglihao_xingming' class='blurview' name='search_binglihao_xingming'></td>"
			+ "<td width='9%'><a  class='search' id='fenzhenManager_search'>"
			+ "查询"
			+ "</a></td>"
			+ "<td width='20%'><select id='helpOtherDoctor' style='float:left;'>"
			+ "</select>" + "</td>" + "<td width='59%'>"
			+ "<div class='btn' id='fenzhenManager_fenzhen'>"
			+ "<a onclick='return false;' ><span class='edit' ></span>" + "分诊"
			+ "</a>" // 分诊
			+ "</div>" + "</td>" + "</tr>" + "</table>";
	$("<div/>").attr("id", "advquery").addClass("advquery").appendTo("#right");
	$(rt).appendTo("#advquery");
	// 查询框的操作
	$("#search_binglihao_xingming").click(function() {
		clearInitQuery(this);
	});
	$("#search_binglihao_xingming").blur(function() {
		if (this.value == "") {
			$("#search_binglihao_xingming").val("请输入患者ID号或姓名");
			$("#search_binglihao_xingming").addClass("blurview");
		}
	});
	$("#search_binglihao_xingming").bind("keyup", function(e) {
		if (e.which == 13) {// 执行查询
			fenzhenManager_search();
		}
	});

	fenzhenManager_init_fzysToday();
	fenzhenManager_initPatientList();
	$("#fenzhenManager_search").click(
			fenzhenManager_search);
	$("#fenzhenManager_fenzhen").click(fenzhenManager_fenzhen_click);

}

// 初始化负责医生
function fenzhenManager_init_fzysToday() {
	$("#helpOtherDoctor option").remove();
	var data = getJSONData(getFzysToday_url, {
		tag : Math.random()
	}, "POST");
	if (data.state && data.obj != null) {
		$.each(data.obj, function() {
			if (this.xingming == '机动')
				$("#helpOtherDoctor").append(
						$("<option selected='selected' value=" + this.gonghao
								+ ">" + this.xingming + "</option>"));
			else
				$("#helpOtherDoctor").append(
						$("<option value=" + this.gonghao + ">" + this.xingming
								+ "</option>"));
		});

	}
	$('#helpOtherDoctor').change(
			function() {
				fenzhenManager_initPatientList();
			});
}
//执行查询
function fenzhenManager_search(){
	var searchText=$.trim($("#search_binglihao_xingming").val());
	if(searchText=='请输入患者ID号或姓名'||searchText==''){
		$.oimsAlert("请输入患者ID号或者姓名");
		return;
	}
	searchData = {
			currentPage : 1,
			pageSize : getPageSize() - 1,
			searchText : searchText,
			state : oimsCategory.VISITING_STATE_WAIT + ','
					+ oimsCategory.VISITING_STATE_YIGUOHAO,
			tag : Math.random(),
			gonghao : null
	};
		fenzhenManager_showList();
	var options = $("#pageList input[name='checkBoxObj'] ");
	if(options.length>0){
		var dataObject=eval("("+options[0].value+")");
		console.log(dataObject);
		var fzys = dataObject.fzys;
		console.log(fzys);
		$('#helpOtherDoctor').val(fzys);
	}
}
//执行初始化
function fenzhenManager_initPatientList() {
	searchData = {
		currentPage : 1,
		pageSize : getPageSize() - 1,
		state : oimsCategory.VISITING_STATE_WAIT + ','
				+ oimsCategory.VISITING_STATE_YIGUOHAO,
		tag : Math.random(),
		gonghao : $("#helpOtherDoctor").val()
	};
	fenzhenManager_showList();
}

function fenzhenManager_showList() {
	var listFactor = {
		listObj : [ {
			title : "序号",
			key : "serial_no",
		}, {
			title : "患者id号",// his那边的
			key : "binglihao"
		}, {
			title : "姓名",// "姓名",
			key : "name"
		}, {
			title : "性别",// "性别",
			key : "psex"
		}, {
			title : "年龄",// "年龄",
			key : "birthday"
		// ,
		// func : function(d) {
		// return _emr_calculteAge(d);
		// }
		}, {
			title : "联系方式",// "联系方式",
			key : "mobile"
		}, {
			title : "挂号时间",// "挂号时间",
			key : "ptime",
			func : function(value) {
				return value.toString().substring(0, 10);
			}
		}, {
			title : "就诊状态",// "就诊状态",
			key : "pstate"
		} ],
		url : contextPath + getVisitListByState_url,
		method : "post",
		checkbox : true,
		single : false,
		invocationEvent : true,
		data : searchData
	// 启用行选中事件
	};
	$("#pageList").remove();
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#right");
	$(div_list).createPageList(listFactor);
}

function fenzhenManager_fenzhen_click() {
	var options = getCheckBoxValue();
	if(options.length==0){
		if (dataObjects.length == 0) {
			$.oimsAlert("请选择需要分诊的患者");
			return;
		}
	}
	var div = $("<div/>")
			.append(
					"<table><tr><td width='40%'>选择接诊医生：</td><td width='60%'><select id='jiezhenDoctor' /></td></tr></table>");
	div.oimsDialog({
		title : "提交接诊医生",
		width : 250,
		icon : 'view',
		height : 110,
		drag : false,
		locked : true,
		winType : 4,
		button : [ {
			title : "提交",
			func : function() {
				options = getCheckBoxValue();
				var doctor_gonghao = $("#jiezhenDoctor").val();
				var flag = true;
				$.each(options, function(i, data) {
					var huanZheFenZhen_fenzhen_data = getJSONData(
							huanZheFenZhen_saveOrUpdateJiuzhen_url, {
								id : data.id,
								fzys : doctor_gonghao,
								tag : Math.random()
							}, "POST");
					if (huanZheFenZhen_fenzhen_data.state) {
						flag = true;
					} else {
						flag = false;
						return;
					}
				});
				if(flag){
					$.oimsSucc("分诊成功！");
					fenzhenManager_initPatientList();
					var gong =  $("#helpOtherDoctor").val();
					fenzhenManager_init_fzysToday();
					 $("#helpOtherDoctor").val(gong);
				}else{
					$.oimsError("分诊失败！");
				}
			},
			isCloseWin : true,
			className : "sumit"
		} ]
	});
	var getKaiDanDoctorByQuanxian_data = getJSONData(
			getKaiDanDoctorByQuanxian_url, {
				tag : Math.random()
			}, "post");
	if (getKaiDanDoctorByQuanxian_data.state
			&& getKaiDanDoctorByQuanxian_data.obj != null) {
		$.each(getKaiDanDoctorByQuanxian_data.obj, function(i, data) {
			$("#jiezhenDoctor").append(
					$("<option value=" + data.gonghao + " >" + data.xingming
							+ "</option>"));
		});
	}
}
