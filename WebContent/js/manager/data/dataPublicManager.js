var listFactor_oimsLog = {
	listObj : [
			{
				title : language.Seria,
				key : "id"
			},
			{
				title : data_language.RzNr,
				key : "cznr",
				func : function(value) {
					if (value.length > 15)
						return value.substring(0, 15) + "...";
					else
						return value;
				}
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
	url : contextPath + "/publish/oims_log/findAllLogInfoByPage.htm",// url
	method : "post",
	checkbox : false,
	single : true,
	data : {// data表示传的参数
		currentPage : 1,
		pageSize : getPageSize(),// Page类的方法
		tag : Math.random()
	}
};
/**
 * 用户迭代
 */
var listFactor_User = {
	listObj : [ {
		title : data_language.UserName,
		key : "id"
	}, {
		title : data_language.GongHao,
		key : "gonghao"
	}, {
		title : data_language.DianZiEmail,
		key : "email"
	}, {
		title : data_language.Role,
		key : "jiaoseName"
	}, {
		title : data_language.State,
		key : "qiyong",
		func : function(value) {
			return (value = 1) ? data_language.Start : data_language.Forbid;
		}
	} ],
	url : contextPath + "/publish/user/findAllUserByPage.htm?qiyongflag=1",
	method : "post",
	checkbox : false,
	single : true,
	data : {// data表示传的参数
		currentPage : 1,
		pageSize : getPageSize(),// Page类的方法
		tag : Math.random()
	}
};
/**
 * 员工迭代
 */
var listFactor_YuanGong = {
	listObj : [ {
		title : data_language.Seria,
		key : "id"
	}, {
		title : data_language.XingMing,
		key : "xingming"
	// varchar
	}, {
		// tinyint类型变量
		title : data_language.Sex,
		key : "xingbie",
		func : function(value) {
			return (value == 1) ? data_language.Male : data_language.Female;
		}
	}, 
	{
		title : data_language.GongHao,
		key : "gh"
	// varchar
	}, 
	{
		title : data_language.Job,
		key : "zhiwu"
	// varchar
	}, {
		// varchar类型变量
		title : data_language.phone,
		key : "dianhua"
	// varchar
	}, {
		title : data_language.BelongsDepart,
		key : "bumenId"
	// int
	} ],
	url : contextPath + "/publish/yuangong/findAllyuangongByPage.htm",// url
	method : "post",
	checkbox : false,
	single : true,
	data : {// data表示传的参数
		currentPage : 1,
		pageSize : getPageSize(),// Page类的方法
		tag : Math.random()
	}
};
/**
 * 部门迭代
 */
var listFactor_BuMen = {
	listObj : [ {
		title : data_language.Seria,
		key : "id"
	}, {
		title : data_language.DepartCode,
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
	url : contextPath + "/publish/bumen/getBumenList.htm",// url
	method : "post",
	checkbox : false,
	single : true,
	data : {// data表示传的参数
		currentPage : 1,
		pageSize : getPageSize(),// Page类的方法
		tag : Math.random()
	}
};
/**
 * 设备迭代
 */
var listFactor_SheBei = {

	listObj : [
			{
				title : data_language.Seria,
				key : "shebeiid"
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
				key : "bmmc"
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
	url : contextPath + "/publish/oims_data/findAllSheBeiDataImport.htm",
	method : "post",
	checkbox : false,
	single : true,
	data : {// data表示传的参数
		currentPage : 1,
		pageSize : getPageSize(),// Page类的方法
		tag : Math.random()
	}
};
/**
 * 患者迭代
 */
var listFactor_HuanZhe = {
	listObj : [ {
		title : data_language.Seria,
		key : "paihao"
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
	url : contextPath + "/publish/huanZheXinXi/findHuanZheList.htm",
	method : "post",
	checkbox : false,
	single : true,
	data : {// data表示传的参数
		currentPage : 1,
		pageSize : getPageSize(),// Page类的方法
		tag : Math.random()
	}
};
/**
 * 检查项目迭代
 */
var listFactor_Jcxm = {
	listObj : [ {
		title : data_language.Seria,
		key : "jcxmid"
	}, {
		title : data_language.XmBianMa,
		key : "bianma"
	}, {
		title : data_language.Jcxm,
		key : "xmmc"
	}, {
		title : data_language.JcLeiBei,
		key : "categoryName"
	}, {
		title : data_language.FenLeiMc,
		key : "fatherName"
	} ],
	url : contextPath + "/publish/jcxm/findJcxmsByPageAndJcxm.htm",
	method : "post",
	checkbox : false,
	single : true,
	data : {// data表示传的参数
		currentPage : 1,
		pageSize : getPageSize(),// Page类的方法
		tag : Math.random()
	}
};
/**
 * 检查单迭代
 */
var listFactor_JCD = {
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
		key : "jfbs",
		func : function(value) {
			if (value == true)
				return data_language.Yes;
			else
				return data_language.No;
		}
	}, {
		title : data_language.YanBie,
		key : "yanbie",
		func : function(value) {
			if (value == 46)
				return data_language.LeftEye;
			else if (value == 47)
				return data_language.RightEye;
			else
				return data_language.DoubleEye;
		}
	}, {
		title : data_language.jcyq,
		key : "jcyq"
	}, {
		title : data_language.State,
		key : "state"
	} ],
	url : contextPath + "/publish/oims_data/findJcdBypage.htm",
	method : "post",
	checkbox : false,
	single : true,
	data : {// data表示传的参数
		currentPage : 1,
		pageSize : getPageSize(),// Page类的方法
		// biaoshi : 1,// 标识为1表示检查单已完成
		tag : Math.random()
	}
};
/**
 * 报告信息迭代
 */
var listFactor_BgXx = {
	// list1.add("id");
	// list0.add("序号");
	// list1.add("jcdId");
	// list0.add("检查单号");
	// list1.add("bgys");
	// list0.add("办公医生");
	// list1.add("bgTime");
	// list0.add("办公时间");
	// list1.add("shys");
	// list0.add("shys");
	// list1.add("shTime");
	// list0.add("shTime");
	// list1.add("jckj");
	// list0.add("jckj");
	// list1.add("jcts");
	// list0.add("检查提示");
	// list1.add("state");
	// list0.add("状态");
	// list1.add("mobanId");
	// list0.add("模版号");
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
	url : contextPath + "/publish/oims_data/findAllBgXxByPage.htm",
	method : "post",
	checkbox : false,
	single : true,
	data : {// data表示传的参数
		currentPage : 1,
		pageSize : getPageSize(),// Page类的方法
		tag : Math.random()
	}
};
/**
 * 输入模板迭代
 */
var listFactor_ShuRuMoBan = {
	listObj : [ {
		title : data_language.Seria,
		key : "shurumobanid"
	}, {
		title : data_language.NeiRong,
		key : "shuru",
	    func:function(value){
	    	if (value.length > 15)
				return value.substring(0, 15) + "...";
			else
				return value;
	    }
	}, {
		title : data_language.SuoYin,
		key : "suoyin"
	}, {
		title : data_language.BelongsDepart,
		key : "bmmc"
	}, {
		title : data_language.CZR,
		key : "xingming"
	}, {
		title : data_language.CzSj,
		key : "addTime"
	}, {
		title : data_language.LeiXing,
		key : "categoryName"
	} ],
	manageMenu : null,
	url : contextPath + "/publish/shurumoban/findAllShuruMobansByPage.htm",
	checkbox : false,   
	method : "post",
	single : true,
	data : {
//		 categoryId:categoryId,
		currentPage : 1,
		pageSize : getPageSize(),
		tag : Math.random()
	}
};
/**
 * 报告模板迭代
 */
var listFactor_BaoGaoMoBan = {
	listObj : [ {
		title : data_language.Seria,
		key : "baogaomobanid"
	}, {
		title : data_language.BiaoTi,
		key : "biaoti"
	}, {
		title : data_language.Jcxm,
		key : "xmmc"
	}, {
		title : data_language.BelongsDepart,
		key : "bmmc"
	}, {
		title : data_language.JiBie,
		key : "jibieName"
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
	url : contextPath + "/publish/baogaomoban/findAllBaogaoMobansByPage.htm",
	checkbox : false,
	method : "post",
	single : true,
	data : {
		currentPage : 1,
		pageSize : getPageSize(),
		tag : Math.random()
	}
};
var url_User = "/publish/oims_data/exportUserInfo.htm";
var url_YuanGong = "/publish/oims_data/exportYuanGongInfo.htm";
var url_BuMen = "/publish/oims_data/exportBuMenInfo.htm";
var url_SheBei = "/publish/oims_data/exportSheBeiInfo.htm";
var url_Patient = "/publish/oims_data/exportPatientInfo.htm";
var url_JcXm = "/publish/oims_data/exportJcXmInfo.htm";
var url_Jcd = "/publish/oims_data/exportJcdInfo.htm";
var url_BgXx = "/publish/oims_data/exportBgXxInfo.htm";
var url_SrMb = "/publish/oims_data/exportSrMbInfo.htm";
var url_Log = "/publish/oims_data/exportLogInfo.htm";
var url_BgMb = "/publish/oims_data/exportBgMbInfo.htm";

// 点击切换表单 用户searchform
var div_listUser_table = "";
div_listUser_table += "<table width='100%' border='0' cellspacing='0' cellpadding='0' class='dataexport'>"
		+ "<tr>"
		+ "<td width='5%' nowrap='nowrap' class='idname'>"
		+ data_language.UserName
		+ ":</td>"
		+ "<td width='15%' align='left'><input type='text' name='uid' id='uid'  class='blur'  /></td>"
		+ "<td width='8%' nowrap='nowrap' class='idname'>"
		+ data_language.GongHao
		+ ":</td>"
		+ "<td width='15%'><input type='text' name='gonghao' id='gonghao'  class='blur'  /></td>"
		+ "<td width='8%' nowrap='nowrap' class='idname'>"
		+ data_language.Role
		+ ":</td>"
		+ "<td width='15%' id='roleNames'></td>"
		+ "<td align='left' style ='display:none'><input type='hidden' name='job' id='job'/></td>"
		+ "<td width='8%' align='left' nowrap='nowrap'><a href='javascript:openExportWin(form_import_user)' class='btnone'><span class='export'></span>导出</a></td>"
		+ "<td width='3%' align='left' nowrap='nowrap'><a href='javascript:resetWinData()' class='btnone'><span class='reset'></span>重置</a></td>"
		+ "</tr>" + "</table>";
var div_listquery_user = $("<div/>").attr("id", "div_listquery_user").attr(
		"class", "listquery");
$(div_listquery_user).append(div_listUser_table);
var form_import_user = $("<form/>").attr("id", "form_import_user").attr(
		"action", contextPath + url_User)
		.attr("enctype", "multipart/form-data").attr("method", "post");
form_import_user.append(div_listquery_user);
// form_import.append(div_list_table1);
// 点击切换表单 员工searchform
var div_listYuanGong_table = "";
div_listYuanGong_table += "<table width='100%' border='0' cellspacing='0' cellpadding='0' class='dataexport'>"
		+ "<tr>" + "<td width='5%' nowrap='nowrap' class='idname'>"
		+ data_language.YgName
		+ ":</td>"
		+ "<td width='13%' align='left'><input type='text' name='xingming' id='xingming' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur'  /></td>"
		+ "<td width='6%' nowrap='nowrap' class='idname'>"
		+ data_language.Sex
		+ ":</td>"
		+ "<td width='11%' align='left' style=text-align:left; nowrap='nowrap'>"
		+ "<input type='radio' name='xingbie' class = 'c_r_class' id='xingbie'  value='1' />"
		+ data_language.Male
		+ "    <input type='radio' name='xingbie' class = 'c_r_class' id='xingbie' value='0'/>"
		+ data_language.Female
		+ "</td>"
		+ "<td width='6%' nowrap='nowrap' class='idname'>"
		+ data_language.BelongsDepart
		+ ":</td>"
		+ "<td width='13%' id='bumenNames'></td>"
		+ "<td align='left' style ='display:none'><input type='hidden' name='bumenId' id='bumenId'/></td>"
		+ "<td width='4%' align='right' nowrap='nowrap'>"
		+ data_language.Job
		+ ":</td>"
		+ "<td width='13%' id='zhiwuNames'></td>"
		+ "<td align='left' style ='display:none'><input type='hidden' name='zhiwu' id='zhiwu'/></td>"
		+ "<td  width='9%' align='left' nowrap='nowrap' >"
		+ "<a href='javascript:openExportWin(form_import_YuanGong)' class='btnone'><span class='export'></span>"
		+ data_language.Export
		+ "</a></td>"
		+ "<td width='13%' align='left' nowrap='nowrap'>"
		+ "<a href='javascript:resetWinData()' class='btnone'><span class='reset'></span>"
		+ language.Reset + "</a></td>" + "</tr>" + "</table>";
var div_listquery_yuangong = $("<div/>").attr("id", "div_listquery_yuangong")
		.attr("class", "listquery");
$(div_listquery_yuangong).append(div_listYuanGong_table);
// form封装
var form_import_YuanGong = $("<form/>").attr("id", "form_import_YuanGong")
		.attr("action", contextPath + url_YuanGong).attr("enctype",
				"multipart/form-data").attr("method", "post");
$(div_listquery_yuangong).appendTo(form_import_YuanGong);
// 点击切换表单 科室searchform
var div_listBuMen_table = "";
div_listBuMen_table += "<table width='100%' border='0' cellspacing='0' cellpadding='0' class='dataexport'>"
		+ "<tr>"
		+ "<td width='5%' nowrap='nowrap' class='idname'>"
		+ data_language.DepartCode
		+ ":</td>"
		+ "<td width='15%' align='left'><input type='text' name='bmbm' id='bmbm'  class='blur'  /></td>"
		+ "<td width='5%' nowrap='nowrap' class='idname'>"
		+ data_language.DepartName
		+ ":</td>"
		+ "<td width='15%' align='left' nowrap='nowrap'><input type='text' name='bmmc' id='bmmc'  class='blur'  /></td>"
		+ "<td width='30%' align='left' nowrap='nowrap'>&nbsp;</td>"
		+ "<td width='8%' align='left' nowrap='nowrap'><a href='javascript:openExportWin(form_import_BuMen)' class='btnone'><span class='export'></span>"
		+ data_language.Export
		+ "</a></td>"
		+ "<td width='5%' align='left' nowrap='nowrap'><a href='javascript:resetWinData()' class='btnone'><span class='reset'></span>"
		+ language.Reset + "</a></td>" + "</tr>" + "</table>";
var div_listquery_bumen = $("<div/>").attr("id", "div_listquery_bumen").attr(
		"class", "listquery");
$(div_listquery_bumen).append(div_listBuMen_table);
// form封装
var form_import_BuMen = $("<form/>").attr("id", "form_import_BuMen").attr(
		"action", contextPath + url_BuMen).attr("enctype",
		"multipart/form-data").attr("method", "post");
form_import_BuMen.append(div_listquery_bumen);
// 点击切换表单 設備searchform
var div_listSheBei_table = "";
div_listSheBei_table += "<table width='100%' border='0' cellspacing='0' cellpadding='0' class='dataexport'>"
		+ "<tr>"
		+ "<td width='5%' nowrap='nowrap' class='idname'>"
		+ data_language.BelongsDepart
		+ ":</td>"
		+ "<td width='12%' id='bumenNames'></td>"
		+ "<td align='left' style ='display:none'><input type='hidden' name='bumenId' id='bumenId'/></td>"
		+ "<td width='5%' nowrap='nowrap' class='idname'>"
		+ data_language.SheBeiState
		+ ":</td>"
		+ "<td width='14%' align='left'  style=text-align:left; nowrap='nowrap'><input type='radio' name='qiyong' class = 'c_r_class' id='qiyong' value='1' />"
		+ data_language.Start
		+ "     <input type='radio' name='qiyong' class = 'c_r_class' id='qiyong' value='0' />"
		+ data_language.Forbid
		+ "</td>"
		+ "<td width='20%' align='left' nowrap='nowrap'>&nbsp;</td>"
		+ "<td width='5%' align='left' nowrap='nowrap'><a href='javascript:openExportWin(form_import_SheBei)' class='btnone'><span class='export'></span>"
		+ data_language.Export
		+ "</a></td>"
		+ "<td width='8%' align='left' nowrap='nowrap'><a href='javascript:resetWinData()' class='btnone'><span class='reset'></span>"
		+ language.Reset + "</a></td>" + "</tr>" + "</table>";
var div_listquery_shebei = $("<div/>").attr("id", "div_listquery_shebei").attr(
		"class", "listquery");
$(div_listquery_shebei).append(div_listSheBei_table);
// form封装
var form_import_SheBei = $("<form/>").attr("id", "form_import_SheBei").attr(
		"action", contextPath + url_SheBei).attr("enctype",
		"multipart/form-data").attr("method", "post");
form_import_SheBei.append(div_listquery_shebei);
// 点击切换表单 患者searchform
var div_listPatient_table = "";
div_listPatient_table += "<table width='100%' border='0' cellspacing='0' cellpadding='0' class='dataexport'>"
		+ "<tr>" + "<td width='5%' nowrap='nowrap' class='idname'>"
		+ data_language.Name
		+ ":</td>"
		+ "<td width='10%' align='left'><input type='text' name='xingming' id='xingming'  class='blur'  /></td>"
		+ "<td width='5%' nowrap='nowrap' class='idname'>"
		+ data_language.Sex
		+ ":</td>"
		+ "<td width='12%' align='left' style=text-align:left; nowrap='nowrap'><input type='radio' name='xingbie' class = 'c_r_class' id='xingbie' value='1' />"
		+ data_language.Male
		+ "      <input type='radio' name='xingbie' class = 'c_r_class' id='xingbie'  value='0'/>"
		+ data_language.Female
		+ ":</td>"
		+ "<td width='6%' nowrap='nowrap' class='idname'>"
		+ data_language.Birth
		+ ":</td>"
		+ "<td width='12%' align='left' nowrap='nowrap'><input type='text' name='shengri' id='shengri'  class='blur'  /></td>"
		+ "<td width='4%' align='left' nowrap='nowrap'>&nbsp;</td>"
		+ "<td width='8%' align='left' nowrap='nowrap'><a href='javascript:openExportWin(form_import_Patient)' class='btnone'><span class='export'></span>"
		+ data_language.Export
		+ "</a></td>"
		+ "</tr>"
		+ "<tr>"
		+ "<td align='center'  class='idname'>"
		+ data_language.SsDq
		+ ":</td>"
		+ "<td  align='center' id='td_ssdq' ></td>"
		+ "<td align='center'  class='idname'>"
		+ data_language.HzSource
		+ ":</td>"
		+ "<td  width='8%'  id='laiyuanNames'></td>"
		+ "<td align='left' style ='display:none'><input type='hidden' name='laiyuan' id='laiyuan'/></td>"
		+ "<td width='6%' align='left' nowrap='nowrap' class='idname'>"
		+ data_language.Zcsj
		+ ":</td>"
		+ "<td  align='left' nowrap='nowrap'><input type='text' name='zcrq' id='zcrq'  class='blur'  /></td>"
		+ "<td align='center' ></td>"
		+ "<td align='center' ><a href='javascript:resetWinData()' class='btnone'><span class='reset'></span>"
		+ language.Reset + "</a></td>" + "</tr>" + "</table>";
var div_listquery_patient = $("<div/>").attr("id", "div_listquery_patient")
		.attr("class", "listquery");
$(div_listquery_patient).append(div_listPatient_table);
// form封装
var form_import_Patient = $("<form/>").attr("id", "form_import_Patient").attr(
		"action", contextPath + url_Patient).attr("enctype",
		"multipart/form-data").attr("method", "post");
form_import_Patient.append(div_listquery_patient);
// 点击切换表单 检查项目
var div_listJcXm_table = "";
div_listJcXm_table += "<table width='100%' border='0' cellspacing='0' cellpadding='0' class='dataexport'>"
		+ "<tr>" + "<td width='6%'><span class='idname'>"
		+ data_language.FenLeiMc
		+ ":</span></td>"
		+ "<td width='12%' style=text-align:left; align='left'><select id='fatherId' name='fatherId' class='blur' onchange='getXmFl()'>"
		+"<option value=''></option>"
		+"<option value='11'>"+data_language.AnBingZhong+"</option>"
		+"<option value='12'>"+data_language.QiTa+"</option>"
		+ "</td>"
		+ "<td width='6%'  align='right'>"
		+ data_language.XMFeiLei
		+ ":</td>"
		+ "<td width='15%' nowrap='nowrap' id= categoryNamess><input type='text' name ='temp' id='temp' readonly='readonly' class='blur'></td>"
		+ "<td align='left' style ='display:none'><input type='hidden' name='categoryid' id='categoryid'/></td>"
//		+ "<td width='8%' nowrap='nowrap' class='idname'>"
		+ "<td width='8%'  align='right'>"
		+ data_language.JcLeiBei
		+ ":</td>"
		+ "<td width='19%' align='left' style=text-align:left;><input type='radio' name='categoryId2' class = 'c_r_class' id='categoryId2' value='8'  />"
		+ data_language.ChangGuiJianCha
		+ "     <input type='radio' name='categoryId2' class = 'c_r_class' id='categoryId2' value='9' />"
		+ data_language.TeShuJianCha
		+ "</td>"
		+ "<td width='6%'><a href='javascript:openExportWin(form_import_JcXm)' class='btnone'><span class='export'></span>"
		+ data_language.Export
		+ "</a></td>"
		+ "<td width='6%'><a href='javascript:resetWinData()' class='btnone'><span class='reset'></span>"
		+ language.Reset + "</a></td>" + "</tr>" + "</table>";
var div_listquery_jcxm = $("<div/>").attr("id", "div_listquery_jcxm").attr(
		"class", "listquery");
$(div_listquery_jcxm).append(div_listJcXm_table);
// form封装
var form_import_JcXm = $("<form/>").attr("id", "form_import_JcXm").attr(
		"action", contextPath + url_JcXm)
		.attr("enctype", "multipart/form-data").attr("method", "post");
form_import_JcXm.append(div_listquery_jcxm);
// 点击切换表单 检查单
var div_listJcd_table = "";
div_listJcd_table += "<table width='90%' border='0' cellspacing='0' cellpadding='0' class='dataexport'>"
		+ "<tr>" + "<td width='6%' nowrap='nowrap' class='idname'>"
		+ data_language.BelongsDepart
		+ ":</td>"
		+ "<td align='center'  nowrap='nowrap'id='bumenNames' width='15%' ></td>"
		+ "<td align='left' style ='display:none'><input type='hidden' name='bumenId' id='bumenId'/></td>"
		+ "<td width='8%' nowrap='nowrap' class='idname'>"
		+ data_language.JcYs
		+ ":</td>"
		+ "<td width='15%' align='left' nowrap='nowrap' id='jcysNames'></td>"
		+ "<td align='left' style ='display:none'><input type='hidden' name='jcys' id='jcys'/></td>"
		+ "<td width='8%' align='left' nowrap='nowrap' class='idname'>"
		+ data_language.JcdState
		+ ":</td>"
		+ "<td width='15%' align='left' nowrap='nowrap' id ='stateNames'></td>"
		+ "<td align='left' style ='display:none'><input type='hidden' name='state' id='state'/></td>"
		+ "<td width='13%' align='center' nowrap='nowrap'><a href='javascript:openExportWin(form_import_Jcd)' class='btnone'><span class='export'></span>"
		+ data_language.Export
		+ "</a></td>"
		+ "</tr>"
		+ "<tr>"
		+ "<td align='center' class='idname'>"
		+ data_language.Jcxm
		+ ":</td>"
		+ "<td width='10%' align='left' id='jcxmNames'><input type='text' name ='temp' id='temp' readonly='readonly' class='blur'></td>"
		+ "<td align='left' style ='display:none'><input type='hidden' name='jcxmIds' id='jcxmIds'/></td>"
		+ " <td align='center' class='idname'>"
		+ data_language.Jianchasb
		+ ":</td>"
		+ "<td align='center'  id='shebeiNames'><input type='text' name ='temp' id='temp'readonly='readonly' class='blur'></td>"
		+ "<td align='left' style ='display:none'><input type='hidden' name='shebeiId' id='shebeiId'/></td>"
		+ "<td width='8%' nowrap='nowrap' class='idname'>"
		+ data_language.KdTime
		+ ":</td>"
		+ "<td width='15%'><input type='text' name='kdTime' id='kdTime'  class='blur'  /></td>"
		+ "<td align='left' ><a href='javascript:resetWinData()' class='btnone'><span class='reset'></span>"
		+ language.Reset + "</a></td>" + "</tr>" + "</table>";
var div_listquery_jcd = $("<div/>").attr("id", "div_listquery_jcd").attr(
		"class", "listquery");
$(div_listquery_jcd).append(div_listJcd_table);
// form封装
var form_import_Jcd = $("<form/>").attr("id", "form_import_Jcd").attr("action",
		contextPath + url_Jcd).attr("enctype", "multipart/form-data").attr(
		"method", "post");
form_import_Jcd.append(div_listquery_jcd);
// 点击切换表单 报告信息searchform
var div_listBaoGaoXinXi_table = "";
div_listBaoGaoXinXi_table += "<table width='100%' border='0' cellspacing='0' cellpadding='0' class='dataexport'>"
		+ "<tr>" + "<td width='5%' nowrap='nowrap' class='idname'>"
		+ data_language.ShengHeYs
		+ ":</td>"
		+ "<td width='12%'id='shysNames'></td>"
		+ "<td align='left' style ='display:none'><input type='hidden' name='shys' id='shys'/></td>"
		+ "<td width='8%' align='left' nowrap='nowrap' class='idname'>"
		+ data_language.ShenHeSJ
		+ ":</td>"
		+ "<td width='12%' align='left' nowrap='nowrap'><input type='text' name='shTime' id='shTime'  class='blur'  /></td>"
		+ "<td align='left' width='8%' class='idname'>"
		+ data_language.TaoYongMB
		+ ":</td>"
		+ "<td width='12%'id='mobanNames'></td>"
		+ "<td align='left' style ='display:none'><input type='hidden' name='mobanId' id='mobanId'/></td>"
		+ "<td width='5%' align='left' nowrap='nowrap'><a href='javascript:openExportWin(form_import_BaoGaoXinXi)' class='btnone'><span class='export'></span>"
		+ data_language.Export
		+ "</a></td>"
		+ "</tr>"
		+ "<tr>"
		+ "<td align='center' class='idname'>"
		+ data_language.BaoGaoZT
		+ ":</td>"
		+ "<td align='center' style=text-align:left; nowrap='nowrap' ><input type='checkbox' class = 'c_r_class' name='state' id='state' value='5'  />"
		+ data_language.Invaild    
		+ "      <input type='checkbox' class = 'c_r_class' name='state' id='state' value='6' />"
		+ data_language.Obtain
		+ "      <input type='checkbox' class = 'c_r_class' name='state' id='state' value='3' />"
		+ data_language.WeiTiQu
		+ "</td>"
		+ "<td align='center' class='idname' nowrap='nowrap'>"
		+ data_language.BaoGaoYs
		+ ":</td>"
		+ "<td width='12%'id='bgysNames'></td>"
		+ "<td align='left' style ='display:none'><input type='hidden' name='bgys' id='bgys'/></td>"
		+ "<td align='center' class='idname'>"
		+ data_language.BaoGaoSj
		+ ":</td>"
		+ "<td align='center' ><input type='text' name='bgTime' id='bgTime'  class='blur'  /></td>"
		+ "<td><a href='javascript:resetWinData()' class='btnone'><span class='reset'></span>"
		+ language.Reset + "</a></td>" + "</tr>" + "</table>";
var div_listquery_bgxx = $("<div/>").attr("id", "div_listquery_bgxx").attr(
		"class", "listquery");
$(div_listquery_bgxx).append(div_listBaoGaoXinXi_table);
// form封装
var form_import_BaoGaoXinXi = $("<form/>")
		.attr("id", "form_import_BaoGaoXinXi").attr("action",
				contextPath + url_BgXx).attr("enctype", "multipart/form-data")
		.attr("method", "post");
form_import_BaoGaoXinXi.append(div_listquery_bgxx);
// 点击切换表单 shuRuMoBan searchform
var div_listShuRuMoBan_table = "";
div_listShuRuMoBan_table += "<table width='100%' border='0' cellspacing='0' cellpadding='0' class='dataexport'>"
		+ "<tr>" + "<td width='5%' nowrap='nowrap' class='idname'>"
		+ data_language.BelongsDepart
		+ ":</td>"
		+ "<td width='12%' id='bumenNames'></td>"
		+ "<td align='left' style ='display:none'><input type='hidden' name='bumenId' id='bumenId'/></td>"
		+ "<td width='8%' nowrap='nowrap' class='idname'>"
		+ data_language.ShengChengRen
		+ ":</td>"
		+ "<td width='12%'><input type='text' name='gonghao' id='gonghao'   class='blur'  /></td>"
		+ "<td width='10%' nowrap='nowrap' class='idname'>"
		+ data_language.ShuRuFL
		+ ":</td>"
		+ "<td align='left' width='11%' nowrap='nowrap' id=categoryNames></td>"
		+ "<td align='left' style ='display:none'><input type='hidden' name='categoryId' id='categoryId'/></td>"
		+ "<td  nowrap='nowrap' width='8%' ><a href='javascript:openExportWin(form_import_ShuRuMoBan)' class='btnone'><span class='export'></span>"
		+ data_language.Export
		+ "</a></td>"
		+ "</tr>"
		+ "<tr>"
		+ "<td align='center' class='idname'>"
		+ data_language.Jcxm
		+ ":</td>"
		+ "<td align='center' width='11%' id='jcxmNames' ><input type='text' name ='temp' id='temp' readonly='readonly' class='blur'></td>"
		+ "<td align='left' style ='display:none'><input type='hidden' name='jcxmIds' id='jcxmIds'/></td>"
		+ "<td align='center' class='idname' nowrap='nowrap'>"
		+ data_language.ShengChengSJ
		+ "</td>"
		+ "<td align='center'  nowrap='nowrap' ><input type='text' name='addTime' id='addTime'  class='blur'  /></td>"
		+ "<td align='center' class='idname' nowrap='nowrap'>"
		+ data_language.MoBanJB
		+ ":</td>"
		+ "<td align='left' style=text-align:left;><input type='checkbox' class = 'c_r_class' name='jibie' id='jibie' value='101' />"
		+ data_language.QuanYuan
		+ "    <input type='checkbox' class = 'c_r_class' name='jibie' id='jibie' value='102' />"
		+ data_language.KeShi
		+ "    <input type='checkbox' class = 'c_r_class' name='jibie' id='jibie' value='103' />"
		+ data_language.UBGS
		+ "</td>"
		+ "<td ><a href='javascript:resetWinData()' class='btnone'><span class='reset'></span>"
		+ language.Reset + "</a></td>" + "</tr>" + "</table>";
var div_listquery_srmb = $("<div/>").attr("id", "div_listquery_srmb").attr(
		"class", "listquery");
$(div_listquery_srmb).append(div_listShuRuMoBan_table);
// form封装
var form_import_ShuRuMoBan = $("<form/>").attr("id", "form_import_ShuRuMoBan")
		.attr("action", contextPath + url_SrMb).attr("enctype",
				"multipart/form-data").attr("method", "post");
form_import_ShuRuMoBan.append(div_listquery_srmb);
// 点击切换表单 OimsLog searchform
var div_listLog_table = "";
div_listLog_table += " <table width='100%' border='0' cellspacing='0' cellpadding='0' class='dataexport'>"
		+ "<tr>" + "<td width='5%' nowrap='nowrap' class='idname'>"
		+ data_language.RzJb
		+ ":</td>"
		+ "<td width='12%' align='left' nowrap='nowrap' style=text-align:left;><input type='checkbox' class = 'c_r_class' name='rzjb' id='rzjb' value='0'  />"
		+ data_language.PuTong
		+ "    <input type='checkbox' class = 'c_r_class' name='rzjb' id='rzjb'  value='1'  />"
		+ data_language.ZhongDeng
		+ "    <input type='checkbox' class = 'c_r_class' name='rzjb' id='rzjb'  value='2' />"
		+ data_language.YanZhong
		+ "</td>"
		+ "<td width='8%' nowrap='nowrap' class='idname'>"
		+ data_language.RzJb
		+ ":</td>"
		+ "<td width='10%' nowrap='nowrap' style=text-align:left;><input type='checkbox' class = 'c_r_class' name='czjg' id='czjg' value='0'  />"
		+ data_language.zhengchang
		+ "<input type='checkbox' name='czjg' class = 'c_r_class' id='czjg'  value='1' />"
		+ data_language.yichang
		+ "</td>"
		+ "    <td width='10%' nowrap='nowrap' class='idname'>"
		+ data_language.CZR
		+ ":</td>"
		+ "<td width='15%' align='left' nowrap='nowrap'><input type='text' name='czr' id='czr'  class='blur'  /></td>"
		+ "<td width='10%' align='left' nowrap='nowrap' class='idname'>"
		+ data_language.CzSj
		+ ":</td>"
		+ "<td width='12%' align='left' nowrap='nowrap'><input type='text' name='czsj' id='czsj'  class='blur'  /></td>"
		+ "<td width='6%' align='left' nowrap='nowrap'><a href='javascript:openExportWin(form_import_Log)' class='btnone'><span class='export'></span>"
		+ data_language.Export
		+ "</a></td>"
		+ "</tr>"
		+ "<tr>"
		+ "<td align='center' class='idname'>"
		+ data_language.RzNr
		+ ":</td>"
		+ "<td colspan='7' align='center' ><textarea name='cznr'  class='blur textareab' id='cznr' cols='45' rows='2'></textarea></td>"
		+ "<td valign='top' ><a href='javascript:resetWinData()' class='btnone'><span class='reset'></span>"
		+ language.Reset + "</a></td>" + "</tr>" + "</table>";
var div_listquery_log = $("<div/>").attr("id", "div_listquery_log").attr(
		"class", "listquery");
$(div_listquery_log).append(div_listLog_table);
// form封装
var form_import_Log = $("<form/>").attr("id", "form_import_Log").attr("action",
		contextPath + url_Log).attr("enctype", "multipart/form-data").attr(
		"method", "post");
form_import_Log.append(div_listquery_log);
// 点击切换表单 BaoGaoMoBan searchform
var div_listBaoGaoMoBan_table = "";
div_listBaoGaoMoBan_table += "<table width='100%' border='0' cellspacing='0' cellpadding='0' class='dataexport'>"
		+ "<tr>" + "<td width='5%' nowrap='nowrap'>"
		+ data_language.BelongsDepart
		+ ":</td>"
		+ "<td width='15%' id='bumenNames'></td>"
		+ "<td align='left' style ='display:none'><input type='hidden' name='bumenId' id='bumenId'/></td>"
		+ "<td width='10%' align='right' nowrap='nowrap'>"
		+ data_language.Jcxm
		+ ":</td>"
		+ "<td width='15%'id='jcxmNames' ><input type='text' name ='temp' id='temp' readonly='readonly' class='blur'></td>"
		+ "<td align='left' style ='display:none'><input type='hidden' name='jcxmIds' id='jcxmIds'/></td>"
		+ "<td nowrap='nowrap'>"
		+ data_language.MoBanJB
		+ ":</td>"
		+ "<td align='left' style=text-align:left;><input type='checkbox' name='jibie' class = 'c_r_class' id='jibie' value='101' />"
		+ data_language.QuanYuan
		+ "    <input type='checkbox' name='jibie' class = 'c_r_class' id='jibie' value='102' />"
		+ data_language.KeShi
		+ "    <input type='checkbox' name='jibie' class = 'c_r_class' id='jibie' value='103' />"
		+ data_language.UBGS
		+ "</td>"
		+ "<td width='10%' align='left' nowrap='nowrap'><a href='javascript:openExportWin(form_import_BaoGaoMoBan)' class='btnone'><span class='export'></span>"
		+ data_language.Export
		+ "</a></td>"
		+ "<td align='left' nowrap='nowrap'><a href='javascript:resetWinData()' class='btnone'><span class='reset'></span>"
		+ language.Reset + "</a></td>" + "</tr>" + "</table>";
var div_listquery_bgmb = $("<div/>").attr("id", "div_listquery_bgmb").attr(
		"class", "listquery");
$(div_listquery_bgmb).append(div_listBaoGaoMoBan_table);
// form封装
var form_import_BaoGaoMoBan = $("<form/>")
		.attr("id", "form_import_BaoGaoMoBan").attr("action",
				contextPath + url_BgMb).attr("enctype", "multipart/form-data")
		.attr("method", "post");
form_import_BaoGaoMoBan.append(div_listquery_bgmb);




