var btns_jcdPhotoIs;
function jcdPhotoIsReady(btns){
	btns_jcdPhotoIs = btns;
	pageTitle = "含影像的检查单";
	init();
	var div_tablabe = $("<div/>").attr("id", "div_tablabe").attr("class",
	"tablabe").appendTo("#right");
//	var div1_6 = $("<div/>").attr("id", "div1_6").attr("class", "tab_hide")
//	.appendTo(div_tablabe);
//	var div1_6_html = "<span>含影像的检查单</span>";
//	$(div1_6_html).appendTo(div1_6);
	$("<div/>").attr("id", "div_main").appendTo("#right");// 主Div对象
	PageMenuActive_jcdPhoto();
}
//显示检查单
function PageMenuActive_jcdPhoto() {
	$("#div_main").html("");
	var div_advquery = $("<div/>").attr("id", "advquery").attr("class",
			"advquery").appendTo("#div_main");
	var jcdPhotoFunTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='23%' class='leftalign' ><input name='search_binglihao_xingming' type='text' class='blurview' id='search_binglihao_xingming' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='请输入患者ID、患者姓名或刷卡' size='28'/></td>"
			+ "<td width='9%'><a href='javascript:seniorSearchSubmit_Jcd_JcdPhoto();' class='search'>"
			+ "查询"
			+ "</a></td>"
			+ "<td width='9%'><a href='javascript:openDialog_AdvancedSearch_Jcd_JcdPhoto();' class='advsearch'>"
			+ "高级查询"
			+ "</a></td>"
			+ "<td width='59%' >"
			+ "<div class='btn'>"
			+"<a style='width:70px;' href='javascript:baoGaoIsManagerXiNan_exportJcdPhoto();'><span class='exporta'></span>"
			+ "导出影像" + "</a>" + "</div>" + "</td>" + "</tr>" + "</table>";
	$(jcdPhotoFunTemplate).appendTo(div_advquery);
	btnProwerConfig(btns_jcdPhotoIs);// 按钮加上权限
	loadJcdPhotoList();// 检查单登记列表
	$("#search_binglihao_xingming").val("").focus();
	$("#search_binglihao_xingming").click(function() {
		clearInitQuery(this);
	});
	$("#search_binglihao_xingming").blur(function() {
		if (this.value == "") {
			$("#search_binglihao_xingming").val("请输入患者ID、患者姓名或刷卡");
			$("#search_binglihao_xingming").addClass("blurview");
		}
	});
	$("#search_binglihao_xingming").bind("keyup", function(e) {
		if (e.which == 13) {
			seniorSearchSubmit_Jcd_JcdPhoto();
		}
	});
}
/** *****************************************检查单列表开始******************************************* */
function loadJcdPhotoList() {
	listFactor = {
		listObj : [ {
			title : "序号",
			key : "paihao"
		}, {
			title : "检查单号",
			key : "jcdh"
		}, {
			title : "患者ID",
			key : "binglihao"
		}, {
			title : "患者姓名",
			key : "hzxm"
		}, {
			title : "患者性别",
			key : "hzxb"
		}, {
			title : "年龄",
			key : "nianling"
		}, {
			title : "检查项目",
			key : "jcxmmc"
		}, {
			title : "眼别",
			key : "yanbie",
			func : function(value) {
				if (value == oimsCategory.LEFT_EYE)
					return "左眼";
				else if (value == oimsCategory.RIGHT_EYE)
					return "右眼";
				else if (value == oimsCategory.DOUBLE_EYE)
					return "双眼";
				else
					return "";
			}
		}, {
			title : "开单时间",
			key : "kdsj"
		}, {
			title : "检查时间",
			key : "jssj"
		}, {
			title : "检查状态",
			key : "biaoshi"
		} ],
		url : contextPath + "/publish/jcd/getDengJiJcdList.htm",// 查询待登记的检查单
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			biaoshi : 56,// 查询所有的检查单
			jcsbId : task.jcsbid,// 检查设备ID
			tag : Math.random()
		}
	};
	$("#pageList").remove();
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#right");
	$(div_list).createPageList(listFactor);
}
/** *****************************************检查单列表结束******************************************* */
//查询
//function showSearchDengJiFrom() {
//		seniorSearchSubmit_Jcd_JcdPhoto();
//}
//高级查询
//function openDialog_AdvancedSearch_JcdDengJi() {
//		openDialog_AdvancedSearch_Jcd_JcdPhoto();
//}
/** ***********************************************检查单高级查询开始************************************************* */
function openDialog_AdvancedSearch_Jcd_JcdPhoto() {
	var seniorSearchTemplate = " <table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ " <tr>"
			+ " <td width='7%' align='right' nowrap>"
			+ "病例号"
			+ "：</td>"
			+ " <td width='12%'><input type='text' name='search_blh'   id='search_blh'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "  <td width='7%' align='right' nowrap>"
			+ "患者姓名"
			+ "：</td>"
			+ " <td width='12%'><input type='text' name='search_hzxm'   id='search_hzxm'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "  <td width='5%' align='right' nowrap>"
			+ "患者性别"
			+ "：</td>"
			+ "  <td width='10%'><input type='radio' name='search_xingbie' id='search_xingbie' value='1'/>"
			+ "男"
			+ "&nbsp;&nbsp;&nbsp;<input type='radio' name='search_xingbie' id='search_xingbie' value='0'/>"
			+ "女"
			+ "&nbsp;&nbsp;&nbsp;<input type='radio' name='search_xingbie' id='search_xingbie' value='2'/>"
			+ "全部"
			+ "</td>"
			+ " <td width='7%' align='right' nowrap>"
			+ "手机"
			+ "：</td>"
			+ " <td width='13%'><input type='text' name='search_shouji'   id='search_shouji'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ " <td align='right' nowrap>"
			+ "身份证号"
			+ "：</td>"
			+ " <td ><input type='text' name='search_sfzh'   id='search_sfzh'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ " </tr>"
			+ " <tr>"
			+ " <td width='4%' align='right' nowrap>"
			+ "诊别"
			+ "：</td>"
			+ " <td width='7%'><input type='radio' name='search_zhenbie' id='search_zhenbie' value='2'/>"
			+ "门诊"
			+ "&nbsp;<input type='radio' name='search_zhenbie' id='search_zhenbie' value='3'/>"
			+ "住院"
			+ "&nbsp;<input type='radio' name='search_zhenbie' id='search_zhenbie' value='1'/>"
			+ "全部"
			+ "</td>"
			+ " <td align='right' nowrap>"
			+ "检查项目"
			+ "：</td>"
			+ " <td><select name='search_jcxmIds' id='search_jcxmIds' onblur=\"this.className='blur'\">"
			+ " <option value=''></option>"
			+ " </select></td>"
			+ " <td width='8%' align='right' nowrap>"
			+ "开单医生"
			+ "：</td>"
			+ " <td width='13%'><select name='search_kdys' id='search_kdys' onblur=\"this.className='blur'\">"
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
			+ " </tr>"
			+ " </table>"
			+ " <div class='avdopenbutton' >"
			+ " <a href='javascript:seniorSearchSubmit_Jcd_JcdPhoto();'><span class='advsumit'></span>"
			+ "提交"
			+ "</a>"
			+ " <a href='javascript:seniorSearchReset_Jcd_JcdPhoto();'><span class='advreset'></span>"
			+ "重置"
			+ "</a>"
			+ "<a id = 'closeId'><span class='close' ></span>"
			+ "关闭" + "</a>" + " </div> ";
	$.oimsBox({
		parentDiv : "advquery",// 将生成内容添加的id
		divContent : seniorSearchTemplate
	// 需要添加的内容
	});
	calendarFun("search_startkdsj");// 开始开单时间
	calendarFun("search_endkdsj", -70);// 结束开单时间

	// 检查项目下拉框赋值
	var jcxmData = getJSONData("/publish/jcxm/getJcxmListByGonghao.htm", {// 根据员工工号获取对应的检查项目
		tag : Math.random()
	}, "post");
	if (jcxmData.state) {
		var jcxmlist = jcxmData.obj;
		$.each(jcxmlist, function(i, d) {
			$("<option value=\"" + d.id + "\">" + d.xmmc + "</option>")
					.appendTo("#search_jcxmIds");
		});
	}
	// 检查项目下拉框赋值

	// 开单医生下拉框赋值
	var kdysData = getJSONData(
			"/publish/yuangong/getKaiDanDoctorByQuanxian.htm", {
				tag : Math.random()
			}, "post");
	if (kdysData.state) {
		var yuangonglist = kdysData.obj;
		$.each(yuangonglist,
				function(i, d) {
					$(
							"<option value=\"" + d.gonghao + "\">" + d.xingming
									+ "</option>").appendTo("#search_kdys");
				});
	}
	// 开单医生下拉框赋值
}

function seniorSearchSubmit_Jcd_JcdPhoto() {
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

// 待补传检查单高级查询重置(整理)
function seniorSearchReset_Jcd_JcdPhoto() {
	$("#search_blh").val("");// 病例号
	$("#search_hzxm").val("");// 患者姓名
	$("input[name='search_xingbie']").attr("checked", false);// 患者性别
	$("#search_shouji").val("");// 手机
	$("#search_sfzh").val("");// 身份证号
	$("input[name='search_zhenbie']").attr("checked", false);// 诊别
	$("#search_jcxmIds").val("");// 检查项目
	$("#search_kdys").val("");// 开单医生
	$("#search_startkdsj").val("");// 开单时间 开始
	$("#search_endkdsj").val("");// 开单时间 结束
}
//导出影像
function baoGaoIsManagerXiNan_exportJcdPhoto(){
	importJS("/js/manager/baogao/photoExecute.js");
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要操作的检查单");
		return;
	}
	var xingbieName=dataObjects[0].hzxb;
	var age = dataObjects[0].nianling;
	
	var jcxmmc = dataObjects[0].biaoti;
	if(xingbieName==undefined){
		xingbieName = dataObjects[0].xingbie?"男":"女";
		age = getAge(dataObjects[0].shengri.time);
	}
	if(jcxmmc == undefined){
		jcxmmc = dataObjects[0].jcxmmc;
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
		jcxmmc:jcxmmc,
		yanbiename:yanbieName
	}
	exportJcdPhotoView(jcd);
}