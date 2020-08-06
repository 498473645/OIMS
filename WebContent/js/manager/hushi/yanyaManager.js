// 眼压初始页面
var yanya;
// 给眼压变量赋值
// 眼压管理模块首次加载调用的方法(整理)
function showYanYaList(btns) {
	pageTitle = "眼压管理";
	init();
	$("<div/>").attr("id", "advquery").addClass("advquery").appendTo("#right");

	var ShiLiTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='23%' class='leftalign' ><input name='search' type='text' class='blurview' id='search' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"
			+ "请输入姓名或病历号"
			+ "' size='28' /></td>"
			+ "<td width='9%'><a  href='javascript:queryYanYa();' class='search'>"
			+ "查询"
			+ "</a></td>"
			+ " <td width='9%'></td>"
			+ "<td width='59%' >"
			+ "<div class='btn'>"
			+ "<a onclick='return false;'  href='javascript:addYanYa();'><span class='adda'></span>"
			+ "录入" + "</a>" + "</div>" + "</td>" + "</tr>" + "</table>";
	$(ShiLiTemplate).appendTo("#advquery");
	btnProwerConfig(btns);// 按钮加上权限
	$("#search").click(function() {
		clearInitQuery(this);
	});
	$("#search").blur(function() {
		if (this.value == "") {
			$("#search").val("请输入姓名或序列号");
			$("#search").addClass("blurview");
		}

	});
	listFactor = {

		listObj : [
				{
					title : "检查单号",
					key : "jcdh"
				},
				{
					title : "病历号",
					key : "blh"

				},
				{
					title : "姓名",
					key : "xm"

				},
				{
					title : "性别",
					key : "xb",
					func : function(value) {
						return (value) ? "女" : "男";
					}
				},
				{
					title : "出生日期",
					key : "sr",
					func : function(value) {
						return value.toString().substring(0, 11);
					}

				},
				{
					title : "标示",
					key : "biaoshi",
					func : function(value) {
						return value == 50 ? hushi_language.DaiJianCha
								: hushi_language.YiJianCha;
					}
				}, {
					title : "左眼",
					key : "od"
				}, {
					title : "右眼",
					key : "os"
				}, {
					title : "检查医生",
					key : "jcys"
				}, {
					title : "检查时间",
					key : "ycsj"
				} ],
		url : contextPath + "/publish/hushi/findAllYanYaByPage.htm",
		method : "post",
		checkbox : true,
		single : true,
		data : {
			currentPage : 1,
			pageSize : getPageSize(),
			tag : Math.random()
		}
	};
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#right");
	$(div_list).createPageList(listFactor);
}
function addYanYa() {
	var dataObjects = getCheckBoxValue();

	if (dataObjects.length == 0) {
		$.oimsAlert(language.CheckOneItem_Alert);
		return;
	}
	// 形成弹出窗口，并规定其样式
	var tabel_YanYa = "";
	tabel_YanYa += "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
			+ "<tr>"
			+ "<td width='10%'></td>"
			+ "<td width='12%' align='right' nowrap='nowrap'>姓名：</td>"
			+ "<td><input type='text' name='xingming' size='20' id='xingming' disabled=true></td>"
			+ "<td width='12%' align='right' nowrap='nowrap'>病历号：</td>"
			+ "<td><input type='text' name='huanzhexinxi' size='20' id='huanzhexinxi' disabled=true></td>"
			+ "<td></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td width='8%'></td>"
			+ "<td width='12%' align='right' nowrap='nowrap'>"
			+ hushi_language.LeftEye
			+ ":</td>"
			+ "<td width='25%' align='left'><input type='text' name='od' size='20' id='od' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "<td width='12%' align='right' nowrap='nowrap'>"
			+ hushi_language.RightEye
			+ ":</td>"
			+ "<td width='25%' align='left'><input type='text' name='os' size='20' id='os' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "<td width='54%' align='left'>&nbsp;</td>"
			+ "</tr>"
			+ "</table><br>";
	var jcd_id = "<input type=hidden name='jcd_id' id='jcd_id'>";
	var f = oimsFormWindow({
		id : "form_yanya",
		url : contextPath + "/publish/hushi/addYanYa.htm",
		dialogTitle : hushi_language.YanYa,
		height : 300,
		width : 500,
		resetForm : dataObjects[0].biaoshi == 50 ? resetYanYaForm
				: resetEditYanYaForm,
		btnOkSuccess : function(data, responseText, statusText) {
			$.oimsSucc(hushi_language.LrSucc);
			f.parent().parent().remove();
			flush_yanya();
		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
			$.oimsAlert(hushi_language.LrFail);

		},
		btnOkBefor : yanyaFormValidate
	});
	f.append(tabel_YanYa).append(jcd_id);
	$("#jcd_id").val(dataObjects[0].id);
	// alert($("#jcd_id").val());
	// 表单数据初始化
	if (dataObjects[0].biaoshi == 56) {
		var date = getJSONData("/publish/hushi/getYanYaByID.htm", {
			id : dataObjects[0].id,
			tag : Math.random()
		}, "post");
		// yanya为其保存
		if (date.state) {
			yanya = date.obj;
			$("#xingming").val(yanya.huanzhexinxi.xingming);
			$("#huanzhexinxi").val(yanya.huanzhexinxi.binglihao);
			$("#od").val(yanya.yy.od);
			$("#os").val(yanya.yy.os);
		}
	}
}
function yanyaFormValidate() {
	if ($("#od").val() == "" || $("#os").val() == "") {
		$.oimsAlert(hushi_language.InsertAllInfo);
		return false;
	}

}
// 该方法已被抛弃
function editYanYa() {
	var tabel_YanYa_update = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
			+ "<input type = 'hidden' name='id' id='id'>"
			+ "<tr>"
			+ "<td></td>"
			+ "<td></td>"
			+ "<td></td>"
			+ "<td></td>"
			+ "<td></td>"
			+ "<td></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td width='8%'></td>"
			+ "<td width='12%' align='right' nowrap='nowrap'>"
			+ hushi_language.LeftEye
			+ "</td>"
			+ "<td width='25%' align='left'><input type='text' name='od' size='20' id='od' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "<td width='12%' align='right' nowrap='nowrap'>"
			+ hushi_language.RightEye
			+ "</td>"
			+ "<td width='25%' align='left'><input type='text' name='os' size='20' id='os' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "<td width='54%' align='left'>&nbsp;</td>"
			+ "</tr>"
			+ "</table><br>";
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert(language.CheckOneItem_Alert);
		return;
	}
	if (dataObjects.length > 1) {
		$.oimsAlert(language.OnlyOpOneData);
		return;
	}
	var f = oimsFormWindow({
		id : "editYanYa",
		icon : "edit",
		url : contextPath + "/publish/hushi/updateYanYa.htm",
		height : 300,
		width : 500,
		dialogTitle : hushi_language.YanYa,
		resetForm : resetEditYanYaForm,
		btnOkSuccess : function(data, responseText, statusText) {
			$.oimsSucc(language.UpdateOK_Alert, yanya_DialogClose("editYanYa"));

		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
			$.oimsError(language.UpdateFail_Alert);

		},
		btnOkBefor : yanyaFormValidate
	});
	f.append(tabel_YanYa_update);
	var date = getJSONData("/publish/hushi/getYanYaByID.htm", {
		id : dataObjects[0].id,
		tag : Math.random()
	}, "post");
	if (date.state) {
		yanya = date.obj;
		$("#od").val(yanya.od);
		$("#os").val(yanya.os);
		$("#id").val(yanya.id);
	}
}
function resetYanYaForm() {
	$("#od").val("");
	$("#os").val("");
}
function resetEditYanYaForm() {
	$("#od").val(yanya.od);
	$("#os").val(yanya.os);
}
/*
 * GuoBaoqiang 检查项目分类窗口关闭
 */
function yanya_DialogClose(form_id) {
	$("#" + form_id).parent().parent().remove();
	flush_yanya();
}
function flush_yanya() {
	$("#pageList").remove();
	listFactor = {
		listObj : [ /*
					 * { title : language.Seria, key : "id" },
					 */
				{
					title : hushi_language.Jcdh,
					key : "jcdh"
				},
				{
					title : "病历号",
					key : "blh"

				},
				{
					title : "姓名",
					key : "xm"

				},
				{
					title : "性别",
					key : "xb",
					func : function(value) {
						return (value == 1) ? "女" : "男";
					}
				},
				{
					title : "出生日期",
					key : "sr",
					func : function(value) {
						return value.toString().substring(0, 11);
					}

				},
				{
					title : hushi_language.sfJC,
					key : "biaoshi",
					func : function(value) {
						return value == 50 ? hushi_language.DaiJianCha
								: hushi_language.YiJianCha;
					}
				}, {
					title : hushi_language.LeftEye,
					key : "od"
				}, {
					title : hushi_language.RightEye,
					key : "os"
				}, {
					title : hushi_language.JcYs,
					key : "jcys"
				}, {
					title : hushi_language.JCSJ,
					key : "ycsj"
				} ],
		url : contextPath + "/publish/hushi/findAllYanYaByPage.htm",
		method : "post",
		checkbox : true,
		single : true,
		data : {
			currentPage : 1,
			pageSize : getPageSize(),
			tag : Math.random()
		}
	};
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#right");

	$(div_list).createPageList(listFactor);// ????
}
function queryYanYa() {
	var obj = {
		search : $("#search").val().indexOf("输入") != -1 ? "" : $("#search")
				.val()
	};
	$.extend(listFactor.data, obj);
	$("#pageList").createPageList(listFactor);
}