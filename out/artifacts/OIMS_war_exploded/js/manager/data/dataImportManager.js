/**
 * author:GuoBaoqiang date:2012-10-09 初始化页面
 */
data_language = setLanguage(data_language);
// 各种检验数据是否有误ListFactor
var ListFactor_Wrong = {
	// user错误信息
	listFactor_User_Wrong : {
		listObj : [
				{
					title : data_language.UserName,
					key : "uid"
				},
				{
					title : data_language.GongHao,
					key : "gonghao"
				},
				{
					title : data_language.DianZiEmail,
					key : "email"
				},
				{
					title : data_language.Role,
					key : "rolevalue"
				},
				{
					title : data_language.State,
					key : "qiyong",
					func : function(value) {
						return (value = 1) ? data_language.Start
								: data_language.Forbid;
					}
				} ],
		url : contextPath + "/publish/oims_data_import/getWrongUserInfo.htm",
		method : "post",
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			tag : Math.random()
		}
	},
	listFactor_YuanGong_Wrong : {

		listObj : [
				{
					title : data_language.Seria,
					key : "id"
				},
				{
					title : data_language.XingMing,
					key : "xingming"
				// varchar
				},
				{
					// tinyint类型变量
					title : data_language.Sex,
					key : "xingbie",
					func : function(value) {
						return (value == 1) ? data_language.Male
								: data_language.Female;
					}
				}, {
					title : data_language.GongHao,
					key : "gonghao"
				// varchar
				}, {
					title : data_language.Job,
					key : "zhiwu"
				// varchar
				}, {
					// varchar类型变量
					title : data_language.TeleNum,
					key : "dianhua"
				// varchar
				}, {
					title : data_language.BelongsDepart,
					key : "bumenId"
				// int
				} ],
		url : contextPath
				+ "/publish/oims_data_import/getWrongYuanGongInfo.htm",// url
		method : "post",
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			tag : Math.random()
		}

	},
	listFactor_BuMen_Wrong : {

		listObj : [ {
			title : data_language.Seria,
			key : "id"
		}, {
			title : data_language.BelongsDepart,
			key : "bmbm"
		}, {
			title : data_language.DepartName,
			key : "bmmc"
		}, {
			title : data_language.ChargeMan,
			key : "lxr"
		}, {
			title : data_language.TeleNum,
			key : "lxdh"
		} ],
		url : contextPath + "/publish/oims_data_import/getWrongBuMenInfo.htm",// url
		method : "post",
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			tag : Math.random()
		}

	},
	listFactor_SheBei_Wrong : {

		listObj : [
				{
					title : data_language.Seria,
					key : "id"
				},
				{
					title : data_language.SheBeiMC,
					key : "sbmc"
				},
				{
					title : data_language.GuiGeXH,
					key : "ggxh"
				},
				{
					title : data_language.HostIP,
					key : "ip"
				},
				{
					title : data_language.LianJieZT,
					key : "online",
					func : function(value) {
						return (value == 1) ? data_language.zhengchang
								: data_language.yichang;
					}
				},
				{
					title : data_language.SheBeiDZ,
					key : "bsgName"
				},
				{
					title : data_language.State,
					key : "qiyong",
					func : function(value) {
						return (value == 1) ? data_language.Start
								: data_language.Forbid;
					}
				}

		],
		url : contextPath + "/publish/oims_data_import/getWrongSheBeiInfo.htm",
		method : "post",
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : 10,// Page类的方法
			tag : Math.random()
		}

	},
	listFactor_HuanZhe_Wrong : {

		listObj : [ {
			title : data_language.Seria,
			key : "id"
		}, {
			title : data_language.BingLiHao,
			key : "binglihao"
		}, {
			title : data_language.XingMing,
			key : "xingming"
		}, {
			title : data_language.Sex,
			key : "xingbie",
			func : function(v) {
				if (v)
					return data_language.Male;
				else
					return data_language.Female;

			}
		}, {
			title : data_language.Birth,
			key : "shengri"
		}, {
			title : data_language.Sfzh,
			key : "sfzh"
		}, {
			title : data_language.MobilePhone,
			key : "shouji"
		}, {
			title : data_language.WorkDW,
			key : "gzdw"
		}, {
			title : data_language.Zcsj,
			key : "zcrq"
		}, {
			title : data_language.SsDq,
			key : "diqu"
		} ],
		url : contextPath + "/publish/oims_data_import/getWrongpatientInfo.htm",
		method : "post",
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			tag : Math.random()
		}

	},
	listFactor_JcXm_Wrong : {

		listObj : [ {
			title : data_language.Seria,
			key : "id"
		}, {
			title : data_language.XmBianMa,
			key : "bianma"
		}, {
			title : data_language.Jcxm,
			key : "xmmc"
		}, {
			title : data_language.JcLeiBei,
			key : "categoryIdValue"
		}, {
			title : data_language.FenLeiMc,
			key : "fatherIdValue"
		} ],
		url : contextPath + "/publish/oims_data_import/getWrongjcxmInfo.htm",
		method : "post",
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			tag : Math.random()
		}

	},
	listFactor_Jcd_Wrong : {

		listObj : [ {
			title : data_language.Seria,
			key : "id"
		}, {
			title : data_language.Jcdh,
			key : "jcdh"
		}, {
			title : data_language.JiuZhenHao,
			key : "jiuzhenId"
		}, {
			title : data_language.BiaoTi,
			key : "biaoti"
		}, {
			title : data_language.JcYs,
			key : "jcys"
		}, {
			title : data_language.KdTime,
			key : "kdTime"
		}, {
			title : data_language.JfBs,
			key : "jfbs"
		}, {
			title : data_language.YanBie,
			key : "yanbie"
		}, {
			title : data_language.jcyq,
			key : "jcyq"
		}, {
			title : data_language.State,
			key : "state"
		} ],
		url : contextPath + "/publish/oims_data_import/getWrongJcdInfo.htm",
		method : "post",
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			// biaoshi : 1,// 标识为1表示检查单已完成
			tag : Math.random()
		}

	},
	listFactor_BgXx_Wrong : {

		listObj : [ {
			title : data_language.Seria,
			key : "id"
		}, {
			title : data_language.Jcdh,
			key : "jcdId"
		}, {
			title : data_language.BaoGaoYs,
			key : "bgys"
		}, {
			title : data_language.BaoGaoSj,
			key : "bgTime"
		}, {
			title : data_language.ShengHeYs,
			key : "shys"

		}, {
			title : data_language.JianChaKj,
			key : "jckj"
		}, {
			title : data_language.JianChaTs,
			key : "jcts"
		}

		],
		url : contextPath + "/publish/oims_data_import/getWrongBaoGaoInfo.htm",
		method : "post",
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : 10,// Page类的方法
			tag : Math.random()
		}

	},
	listFactor_SrMb_Wrong : {

		listObj : [ {
			title : data_language.Seria,
			key : "shurumobanid"
		}, {
			title : data_language.NeiRong,
			key : "shuru"
		}, {
			title : data_language.SuoYin,
			key : "suoyin"
		}, {
			title : data_language.BelongsDepart,
			key : "bmIdValue"
		}, {
			title : data_language.CZR,
			key : "gonghao"
		}, {
			title : data_language.CzSj,
			key : "addTime"
		}, {
			title : data_language.LeiXing,
			key : "categoryIdValue"
		} ],
		manageMenu : null,
		url : contextPath
				+ "/publish/oims_data_import/getWrongShuRuMoBanInfo.htm",
		method : "post",
		single : true,
		data : {
			// categoryId:categoryId,
			currentPage : 1,
			pageSize : 10,
			tag : Math.random()
		}

	},
	listFactor_Log_Wrong : {

		listObj : [
				{
					title : data_language.Seria,
					key : "id"
				},
				{
					title : data_language.RzNr,
					key : "cznr"
				},
				{
					title : data_language.RzJb,
					key : "rzjb",
					func : function(value) {
						if (value == 0)
							return data_language.PuTong;
						if (value == 1)
							return data_language.ZhongDeng;
						if (value == 2)
							return data_language.YanZhong;
					}
				},
				{
					title : data_language.ShengChengSJ,
					key : "czsj"
				// varchar
				},
				{
					// varchar类型变量
					title : data_language.CZR,
					key : "czr"
				// varchar
				},
				{
					title : data_language.State,
					key : "czjg",
					func : function(value) {
						return (value == 0) ? data_language.zhengchang
								: data_language.yichang;
					}
				// int
				} ],
		url : contextPath + "/publish/oims_data_import/getWrongLogInfo.htm",// url
		method : "post",
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			tag : Math.random()
		}

	},
	listFactor_BgMb_Wrong : {

		listObj : [ {
			title : data_language.Seria,
			key : "id"
		}, {
			title : data_language.BiaoTi,
			key : "biaoti"
		}, {
			title : data_language.Jcxm,
			key : "jcxmIdsValue"
		}, {
			title : data_language.BelongsDepart,
			key : "bumenIdValue"
		}, {
			title : data_language.JiBie,
			key : "jibieValue"
		}
		// ,{
		// title : "状态",
		// key : "categoryId"
		// }
		, {
			title : data_language.CZR,
			key : "gonghao"
		}
		// ,{
		// title : "操作时间",
		// key : ""
		// }
		],
		manageMenu : null,
		url : contextPath + "/publish/oims_data_import/getWrongBgMbInfo.htm",
		method : "post",
		single : true,
		data : {
			currentPage : 1,
			pageSize : 10,
			tag : Math.random()
		}

	}
};
/**
 * 定义好form和table以及参数=========用户
 */

var table_import_user = " <table width='100%' border='0' cellspacing='0' cellpadding='0' class='dataexportable'> "
		+ "<tr>   "
		+ "<td  align='left'   style='padding-left:10px;width:275px'>"
		+ "<div class='searchfile'>"
		+ "<input type='file' name='url_file' id ='url_file' class='filed'  />"
		+ "<div class='fieldstylebig'><input type='text' readonly='readonly' name='txt_fieldstyle' id='txt_fieldstyle' class='fieldtext'/></div>"
		+ "<div class='buttonstylebig'><input type='button'  id='btn_yuyan' class='fieldbutton'/></div>"
		+ "</div>"
		+ "</td>"
		+ "<td  nowrap='nowrap' class='idname'>"
		+ "<a href=\"javascript:importDataOpenWin('form_import_user2',ListFactor_Wrong.listFactor_User_Wrong,listFactor_User)\"  class='btnone' >"
		+ "<span class='reset'></span>"
		+ data_language.Import
		+ "</a></td>"
		+ "</tr> " + "</table>";
// 当应用于一般窗口时
var form_import_user2 = $("<form/>").attr("id", "form_import_user2").attr(
		"action", contextPath + "/publish/oims_data_import/importUserInfo.htm")
		.attr("enctype", "multipart/form-data").attr("method", "post");
form_import_user2.append(table_import_user);
/**
 * 定义好form和table以及参数=========员工
 */
var table_import_yuangong = " <table width='100%' border='0' cellspacing='0' cellpadding='0' class='dataexportable'> "
		+ "<tr>   "
		+ "<td  align='left' style='padding-left:10px;width:275px'>"
		+ "<div class='searchfile'>"
		+ "<input type='file' name='url_file' id ='url_file' class='filed'  />"
		+ "<div class='fieldstylebig'><input type='text' readonly='readonly' name='txt_fieldstyle' id='txt_fieldstyle' class='fieldtext'/></div>"
		+ "<div class='buttonstylebig'><input type='button'  id='btn_yuyan' class='fieldbutton'/></div>"
		+ "</div>"
		+ "</td>"
		+ "<td  nowrap='nowrap' class='idname'>"
		+ "<a href=\"javascript:importDataOpenWin('form_import_yuangong',ListFactor_Wrong.listFactor_YuanGong_Wrong,listFactor_YuanGong)\" class='btnone' >"
		+ "<span class='reset'></span>"
		+ data_language.Import
		+ "</a></td>"
		+ "</tr> " + "</table>";
var form_import_yuangong = $("<form/>").attr("id", "form_import_yuangong")
		.attr(
				"action",
				contextPath
						+ "/publish/oims_data_import/importYuanGongInfo.htm")
		.attr("enctype", "multipart/form-data").attr("method", "post");
form_import_yuangong.append(table_import_yuangong);
/**
 * 定义好form和table以及参数=========部门
 */
var table_import_bumen = " <table width='100%' border='0' cellspacing='0' cellpadding='0' class='dataexportable'> "
		+ "<tr>   "
		+ "<td  align='left' style='padding-left:10px;width:275px' >"
		+ "<div class='searchfile'>"
		+ "<input type='file' name='url_file' id ='url_file' class='filed'  />"
		+ "<div class='fieldstylebig'><input type='text' readonly='readonly' name='txt_fieldstyle' id='txt_fieldstyle' class='fieldtext'/></div>"
		+ "<div class='buttonstylebig'><input type='button'  id='btn_yuyan' class='fieldbutton'/></div>"
		+ "</div>"

		+ "</td>"
		+ "<td  nowrap='nowrap' class='idname'>"
		+ "<a href=\"javascript:importDataOpenWin('form_import_bumen',ListFactor_Wrong.listFactor_BuMen_Wrong,listFactor_BuMen)\" class='btnone'>"
		+ "<span class='reset'></span>"
		+ data_language.Import
		+ "</a></td>"
		+ "</tr> " + "</table>";
var form_import_bumen = $("<form/>").attr("id", "form_import_bumen")
		.attr("action",
				contextPath + "/publish/oims_data_import/importBuMenInfo.htm")
		.attr("enctype", "multipart/form-data").attr("method", "post");
form_import_bumen.append(table_import_bumen);
/**
 * 定义好form和table以及参数=========设备
 */
var table_import_shebei = " <table width='100%' border='0' cellspacing='0' cellpadding='0' class='dataexportable'> "
		+ "<tr>   "
		+ "<td  align='left' style='padding-left:10px;width:275px'>"
		+ "<div class='searchfile'>"
		+ "<input type='file' name='url_file' id ='url_file' class='filed'  />"
		+ "<div class='fieldstylebig'><input type='text' readonly='readonly' name='txt_fieldstyle' id='txt_fieldstyle' class='fieldtext'/></div>"
		+ "<div class='buttonstylebig'><input type='button'  id='btn_yuyan' class='fieldbutton'/></div>"
		+ "</div>"
		+ "</td>"
		+ "<td  nowrap='nowrap' class='idname'>"
		+ "<a href=\"javascript:importDataOpenWin('form_import_shebei',ListFactor_Wrong.listFactor_SheBei_Wrong,listFactor_SheBei)\" class='btnone'>"
		+ "<span class='reset'></span>"
		+ data_language.Import
		+ "</a></td>"
		+ "</tr> " + "</table>";
var form_import_shebei = $("<form/>").attr("id", "form_import_shebei").attr(
		"action",
		contextPath + "/publish/oims_data_import/importSheBeiInfo.htm").attr(
		"enctype", "multipart/form-data").attr("method", "post");
form_import_shebei.append(table_import_shebei);
/**
 * 定义好form和table以及参数=========患者
 */
var table_import_huanzhe = " <table width='100%' border='0' cellspacing='0' cellpadding='0' class='dataexportable'> "
		+ "<tr>   "
		+ "<td   align='left' style='padding-left:10px;width:275px' >"
		+ "<div class='searchfile'>"
		+ "<input type='file' name='url_file' id ='url_file' class='filed'  />"
		+ "<div class='fieldstylebig'><input type='text' readonly='readonly' name='txt_fieldstyle' id='txt_fieldstyle' class='fieldtext'/></div>"
		+ "<div class='buttonstylebig'><input type='button'  id='btn_yuyan' class='fieldbutton'/></div>"
		+ "</div>"
		+ "</td>"
		+ "<td   nowrap='nowrap' class='idname'>"
		+ "<a href=\"javascript:importDataOpenWin('form_import_huanzhe',ListFactor_Wrong.listFactor_HuanZhe_Wrong,listFactor_HuanZhe)\"  class='btnone'>"
		+ "<span class='reset'></span>"
		+ data_language.Import
		+ "</a></td>"
		+ "</tr> " + "</table>";
var form_import_huanzhe = $("<form/>").attr("id", "form_import_huanzhe").attr(
		"action",
		contextPath + "/publish/oims_data_import/importPatientInfo.htm").attr(
		"enctype", "multipart/form-data").attr("method", "post");
form_import_huanzhe.append(table_import_huanzhe);
/**
 * 定义好form和table以及参数=========检查项目
 */
var table_import_jcxm = " <table width='100%' border='0' cellspacing='0' cellpadding='0' class='dataexportable'> "
		+ "<tr>   "
		+ "<td   align='left' style='padding-left:10px;width:275px' >"
		+ "<div class='searchfile'>"
		+ "<input type='file' name='url_file' id ='url_file' class='filed'  />"
		+ "<div class='fieldstylebig'><input type='text' readonly='readonly' name='txt_fieldstyle' id='txt_fieldstyle' class='fieldtext'/></div>"
		+ "<div class='buttonstylebig'><input type='button'  id='btn_yuyan' class='fieldbutton'/></div>"
		+ "</div>"
		+ "</td>"
		+ "<td   nowrap='nowrap' class='idname'>"
		+ "<a href=\"javascript:importDataOpenWin('form_import_jcxm',ListFactor_Wrong.listFactor_JcXm_Wrong,listFactor_Jcxm)\" class='btnone'>"
		+ "<span class='reset'></span>"
		+ data_language.Import
		+ "</a></div> </td>" + "</tr> " + "</table>";
var form_import_jcxm = $("<form/>").attr("id", "form_import_jcxm").attr(
		"action", contextPath + "/publish/oims_data_import/importJcXmInfo.htm")
		.attr("enctype", "multipart/form-data").attr("method", "post");
form_import_jcxm.append(table_import_jcxm);
/**
 * 定义好form和table以及参数=========检查单
 */
var table_import_jcd = " <table width='100%' border='0' cellspacing='0' cellpadding='0' class='dataexportable'> "
		+ "<tr>   "
		+ "<td   align='left'style='padding-left:10px;width:275px' >"
		+ "<div class='searchfile'>"
		+ "<input type='file' name='url_file' id ='url_file' class='filed'  />"
		+ "<div class='fieldstylebig'><input type='text' readonly='readonly'  name='txt_fieldstyle' id='txt_fieldstyle' class='fieldtext'/></div>"
		+ "<div class='buttonstylebig'><input type='button'  id='btn_yuyan' class='fieldbutton'/></div>"
		+ "</div>"
		+ "</td>"
		+ "<td   nowrap='nowrap' class='idname'>"
		+ "<a href=\"javascript:importDataOpenWin('form_import_jcd',ListFactor_Wrong.listFactor_Jcd_Wrong,listFactor_JCD)\" class='btnone' >"
		+ "<span class='reset'></span>"
		+ data_language.Import
		+ "</a></td>"
		+ "</tr> " + "</table>";
var form_import_jcd = $("<form/>").attr("id", "form_import_jcd").attr("action",
		contextPath + "/publish/oims_data_import/importJcdInfo.htm").attr(
		"enctype", "multipart/form-data").attr("method", "post");
form_import_jcd.append(table_import_jcd);
/**
 * 定义好form和table以及参数=========报告信息
 */
var table_import_bgxx = " <table width='100%' border='0' cellspacing='0' cellpadding='0' class='dataexportable'> "
		+ "<tr>   "
		+ "<td align='left' style='padding-left:10px;width:275px' >"
		+ "<div class='searchfile'>"
		+ "<input type='file' name='url_file' id ='url_file' class='filed'  />"
		+ "<div class='fieldstylebig'><input type='text' readonly='readonly' name='txt_fieldstyle' id='txt_fieldstyle' class='fieldtext'/></div>"
		+ "<div class='buttonstylebig'><input type='button'  id='btn_yuyan' class='fieldbutton'/></div>"
		+ "</div>"
		+ "</td>"
		+ "<td   nowrap='nowrap' class='idname'>"
		+ "<a href=\"javascript:importDataOpenWin('form_import_bgxx',ListFactor_Wrong.listFactor_BgXx_Wrong,listFactor_BgXx)\" class='btnone'>"
		+ "<span class='reset'></span>"
		+ data_language.Import
		+ "</a></td>"
		+ "</tr> " + "</table>";
var form_import_bgxx = $("<form/>").attr("id", "form_import_bgxx").attr(
		"action",
		contextPath + "/publish/oims_data_import/importBaoGaoInfo.htm").attr(
		"enctype", "multipart/form-data").attr("method", "post");
form_import_bgxx.append(table_import_bgxx);
/**
 * 定义好form和table以及参数=========输入模版
 */
var table_import_srmb = " <table width='100%' border='0' cellspacing='0' cellpadding='0' class='dataexportable'> "
		+ "<tr>   "
		+ "<td   align='left' style='padding-left:10px;width:275px'  >"
		+ "<div class='searchfile'>"
		+ "<input type='file' name='url_file' id ='url_file' class='filed'  />"
		+ "<div class='fieldstylebig'><input type='text' readonly='readonly' name='txt_fieldstyle' id='txt_fieldstyle' class='fieldtext'/></div>"
		+ "<div class='buttonstylebig'><input type='button'  id='btn_yuyan' class='fieldbutton'/></div>"
		+ "</div>"
		+ "</td>"
		+ "<td   nowrap='nowrap' class='idname'>"
		+ "<a href=\"javascript:importDataOpenWin('form_import_srmb',ListFactor_Wrong.listFactor_SrMb_Wrong,listFactor_ShuRuMoBan)\"  class='btnone'>"
		+ "<span class='reset'></span>"
		+ data_language.Import
		+ "</a></td>"
		+ "</tr> " + "</table>";
var form_import_srmb = $("<form/>").attr("id", "form_import_srmb").attr(
		"action",
		contextPath + "/publish/oims_data_import/importShuRuMoBanInfo.htm")
		.attr("enctype", "multipart/form-data").attr("method", "post");
form_import_srmb.append(table_import_srmb);
/**
 * 定义好form和table以及参数=========日志信息
 */
var table_import_log = " <table width='100%' border='0' cellspacing='0' cellpadding='0' class='dataexportable'> "
		+ "<tr>   "
		+ "<td  align='left' style='padding-left:10px;width:275px' >"
		+ "<div class='searchfile'>"
		+ "<input type='file' name='url_file' id ='url_file' class='filed'  />"
		+ "<div class='fieldstylebig'><input type='text'readonly='readonly' name='txt_fieldstyle' id='txt_fieldstyle' class='fieldtext'/></div>"
		+ "<div class='buttonstylebig'><input type='button'  id='btn_yuyan' class='fieldbutton'/></div>"
		+ "</div>"
		+ "</td>"
		+ "<td  nowrap='nowrap' class='idname'>"
		+ "<a href=\"javascript:importDataOpenWin('form_import_log',ListFactor_Wrong.listFactor_Log_Wrong,listFactor_oimsLog)\" class='btnone'>"
		+ "<span class='reset'></span>"
		+ data_language.Import
		+ "</a></td>"
		+ "</tr> " + "</table>";
var form_import_log = $("<form/>").attr("id", "form_import_log").attr("action",
		contextPath + "/publish/oims_data_import/importLogInfo.htm").attr(
		"enctype", "multipart/form-data").attr("method", "post");
form_import_log.append(table_import_log);
/**
 * 定义好form和table以及参数=========报告模版
 */
var table_import_bgmb = "<table width='100%' border='0' cellspacing='0' cellpadding='0' class='dataexportable'> "
		+ "<tr>   "
		+ "<td   align='left' style='padding-left:10px;width:275px' >"
		+ "<div class='searchfile'>"
		+ "<input type='file' name='url_file' id ='url_file' class='filed'  />"
		+ "<div class='fieldstylebig'><input type='text' readonly='readonly' name='txt_fieldstyle' id='txt_fieldstyle' class='fieldtext'/></div>"
		+ "<div class='buttonstylebig'><input type='button'  id='btn_yuyan' class='fieldbutton'/></div>"
		+ "</div>"
		+ "</td>"
		+ "<td   nowrap='nowrap' class='idname'>"
		+ "<a href=\"javascript:importDataOpenWin('form_import_bgmb',ListFactor_Wrong.listFactor_BgMb_Wrong,listFactor_BaoGaoMoBan)\" class='btnone' >"
		+ "<span class='reset'></span>"
		+ data_language.Import
		+ "</a></td>"
		+ "</tr> " + "</table>";
var form_import_bgmb = $("<form/>").attr("id", "form_import_bgmb").attr(
		"action",
		contextPath + "/publish/oims_data_import/importBaoGaoMoBanInfo.htm")
		.attr("enctype", "multipart/form-data").attr("method", "post");
form_import_bgmb.append(table_import_bgmb);

// 科室信息设备信息患者信息检查项目信息检查单数据报告信息输入模板日志信息报告模板
var url_userImport = contextPath
		+ "/publish/oims_data_import/importUserInfo.htm";
var url_yuangongImport = contextPath
		+ "/publish/oims_data_import/importYuanGongInfo.htm";
var url_bumenImport = contextPath
		+ "/publish/oims_data_import/importBuMenInfo.htm";
var url_shebeiImport = contextPath
		+ "/publish/oims_data_import/importSheBeiInfo.htm";
var url_patientImport = contextPath
		+ "/publish/oims_data_import/importPatientInfo.htm";
var url_jcxmImport = contextPath
		+ "/publish/oims_data_import/importJcXmInfo.htm";
var url_jcdImport = contextPath + "/publish/oims_data_import/importJcdInfo.htm";
var url_baogaoImport = contextPath
		+ "/publish/oims_data_import/importBaoGaoInfo.htm";
var url_shuruMoBanImport = contextPath
		+ "/publish/oims_data_import/importShuRuMoBanInfo.htm";
var url_logImport = contextPath + "/publish/oims_data_import/importLogInfo.htm";
var url_baogaoMoBanImport = contextPath
		+ "/publish/oims_data_import/importBaoGaoMoBanInfo.htm";

function showDataImportList() {
	// importCSS("/css/easyui.css") ;
	// importJS("/js/jquery.customfile.js");
	// importJS("/js/manager/data/dataPublicManager.js");
	// 标题
	pageTitle = data_language.DataImport;
	init();
	var div_table = $("<div/>").attr("id", "tablabel")
			.attr("class", "tablabel").appendTo("#right");
	var div1_1 = $("<div/>")
			.attr("id", "div1_1")
			.attr("class", "tab_show")
			.attr("onclick",
					"PageMenuActive3('div1_1',listFactor_User ,form_import_user2)")
			.appendTo("#tablabel");
	var div1_1_html = "<span>" + data_language.UserInfo + "</span>";
	$(div1_1_html).appendTo(div1_1);

	var div1_2 = $("<div/>")
			.attr("id", "div1_2")
			.attr("class", "tab_hide")
			.attr("onclick",
					"PageMenuActive3('div1_2',listFactor_YuanGong,form_import_yuangong)")
			.appendTo("#tablabel");
	var div1_2_html = "<span>" + data_language.YgInfo + "</span>";
	$(div1_2_html).appendTo(div1_2);

	var div1_3 = $("<div/>")
			.attr("id", "div1_3")
			.attr("class", "tab_hide")
			.attr("onclick",
					"PageMenuActive3('div1_3',listFactor_BuMen,form_import_bumen)")
			.appendTo("#tablabel");
	var div1_3_html = "<span>" + data_language.DepartInfo + "</span>";
	$(div1_3_html).appendTo(div1_3);

	var div1_4 = $("<div/>")
			.attr("id", "div1_4")
			.attr("class", "tab_hide")
			.attr("onclick",
					"PageMenuActive3('div1_4',listFactor_SheBei,form_import_shebei)")
			.appendTo("#tablabel");
	var div1_4_html = "<span>" + data_language.SheBeiInfo + "</span>";
	$(div1_4_html).appendTo(div1_4);

	var div1_5 = $("<div/>")
			.attr("id", "div1_5")
			.attr("class", "tab_hide")
			.attr("onclick",
					"PageMenuActive3('div1_5',listFactor_HuanZhe,form_import_huanzhe)")
			.appendTo("#tablabel");
	var div1_5_html = "<span>" + data_language.HuanZheInfo + "</span>";
	$(div1_5_html).appendTo(div1_5);

	var div1_6 = $("<div/>")
			.attr("id", "div1_6")
			.attr("class", "tab_hide")
			.attr("onclick",
					"PageMenuActive3('div1_6',listFactor_Jcxm,form_import_jcxm)")
			.appendTo("#tablabel");
	var div1_6_html = "<span>" + data_language.JcXmInfo + "</span>";
	$(div1_6_html).appendTo(div1_6);

	var div1_7 = $("<div/>").attr("id", "div1_7").attr("class", "tab_hide")
			.attr("onclick",
					"PageMenuActive3('div1_7',listFactor_JCD,form_import_jcd)")
			.appendTo("#tablabel");
	var div1_7_html = "<span>" + data_language.jcdSJ + "</span>";
	$(div1_7_html).appendTo(div1_7);

	var div1_8 = $("<div/>")
			.attr("id", "div1_8")
			.attr("class", "tab_hide")
			.attr("onclick",
					"PageMenuActive3('div1_8',listFactor_BgXx,form_import_bgxx)")
			.appendTo("#tablabel");
	var div1_8_html = "<span>" + data_language.bgInfo + "</span>";
	$(div1_8_html).appendTo(div1_8);

	var div1_9 = $("<div/>")
			.attr("id", "div1_9")
			.attr("class", "tab_hide")
			.attr("onclick",
					"PageMenuActive3('div1_9',listFactor_ShuRuMoBan,form_import_srmb)")
			.appendTo("#tablabel");
	var div1_9_html = "<span>" + data_language.srmbInfo + "</span>";
	$(div1_9_html).appendTo(div1_9);

	var div1_10 = $("<div/>")
			.attr("id", "div1_10")
			.attr("class", "tab_hide")
			.attr("onclick",
					"PageMenuActive3('div1_10',listFactor_oimsLog,form_import_log)")
			.appendTo("#tablabel");
	var div1_10_html = "<span>" + data_language.LogInfo + "</span>";
	$(div1_10_html).appendTo(div1_10);

	var div1_11 = $("<div/>")
			.attr("id", "div1_11")
			.attr("class", "tab_hide")
			.attr("onclick",
					"PageMenuActive3('div1_11',listFactor_BaoGaoMoBan,form_import_bgmb)")
			.appendTo("#tablabel");
	var div1_11_html = "<span>" + data_language.bgmbInfo + "</span>";
	$(div1_11_html).appendTo(div1_11);
	// var div_tabright = $("<div/>").attr("id", "div_tabright").attr("class",
	// "tabright").appendTo("#tablabel");

	getOtherMenu('div1_1');
	PageMenuActive3('div1_1', listFactor_User, form_import_user2);
}
/*
 * 梁建业 div层的显示隐藏切换获得当前表，并添加参数
 */
// var div_list_table1 = "";
// div_list_table1 += " <table width='100%' border='0' cellspacing='0'
// cellpadding='0' class='dataexportable'> "
// + "<tr> "
// + "<td width='30%' align='left'><input type='file' name='url_file'
// id='url_file' class='fileField fileFieldh' />"
// + "</td>"
// + "<td width='70%' nowrap='nowrap' class='idname'>"
// + "<div class='buttonsytle1 erporm' ><a href='javascript:importDataOpenWin()'
// >"
// + "<span class='reset'></span>导&nbsp;&nbsp;&nbsp;&nbsp;入</a></div> </td> "
// + "</tr> " + "</table>";
function PageMenuActive3(objName, listFactor, form) {
	document.getElementById(OtherMenu).className = "tab_hide";
	document.getElementById(objName).className = "tab_show";
	$("#div_main").remove();
	var div_main = $("<div/>").attr("id", "div_main").attr("class", "main")
			.appendTo("#right");
	form.appendTo("#div_main");
	showMainMenuList(listFactor);
	getOtherMenu(objName);
	$.customfile('fieldbutton', 'filed', 'fieldtext');
}
/**
 * 定义全局变量
 */
var OtherMenu;
function getOtherMenu(menuName) {
	OtherMenu = menuName;
}

function showMainMenuList(listFactor) {
	var div_list = $("<div/>").attr("id", "div_list").attr("class", "list")
			.appendTo("#div_main");
	$(div_list).createPageList(listFactor);
}
/**
 * 导入弹出窗口
 */
function importDataOpenWin(form_id, listFactor, LISTfactor) {

	$("#" + form_id).ajaxForm(
			{
				beforeSend : CheckWorkFile,
				uploadProgress : function() {
				},
				complete : function(data_Result) {
					var data_pre = data_Result.responseText;
					var data_string = "";
					if (data_pre.indexOf("</pre") == -1)
						data_string = data_pre;
					else
						data_string = data_pre.substring(data_pre.indexOf("{"),
								data_pre.indexOf("</pre"));
					var data_Obj = eval("(" + data_string + ")");
					var state = data_Obj.state;
					if (state == 1) {
						$.oimsSucc(data_language.ImportSucc);
						// $("#txt_fieldstyle").val("");
						$("#div_list").remove();

						showMainMenuList(LISTfactor);
					} else if (state == 2) {
						$.oimsAlert(data_language.dataColumnWrong);
						// $("#txt_fieldstyle").val("");
					} else if (state == 0) {
						$.oimsAlert(data_language.HasWrongData);
						// $("#txt_fieldstyle").val("");
						showWrongList(listFactor);

					}
				}
			});
	$("#" + form_id).submit();
}

function showWrongList(ListFactor) {
	$("#div_list").remove();
	var div_list = $("<div/>").attr("id", "div_list").attr("class", "list")
			.appendTo("#div_main");
	$(div_list).createPageList(ListFactor);
}
// 判断文件类型
function CheckWorkFile() {
	if ($("#txt_fieldstyle").val() == "") {
		$.oimsAlert(data_language.CheckImportFile);
		return false;
	}
	var stuff = $("#txt_fieldstyle").val().indexOf(".xlsx");
	var stvff = $("#txt_fieldstyle").val().indexOf(".xls");
	if ((stuff == -1) && (stvff == -1)) {
		$.oimsAlert(data_language.FileIsNotRight);
		return false;
	}
	return true;
}