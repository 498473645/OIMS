var passJianChaUrl = "/publish/jcd/executeJcdPass.htm";
var getexecuteJcdByJcdIdUrl = "/publish/jcd/getOneExecuteJcdByJcdid.htm";
var getJcdPhotoUrl = "/publish/jcd/getJcdPhotoList.htm";
var task = {
	start : true,
	jcsbid : null
};// 检查设备ID
var doing = false;
var jishiqi;
var timer = {
	h : 0,
	m : 0,
	s : 0
};
var Buttons;
// 加载检查模块需要引入的JS文件
function loadJsAndCss_JianCha() {
	loadWelcomePage();
	importCSS("/uploadify/uploadify.css");
	importCSS("/flowplayer/style.css");
	importJS("/flowplayer/flowplayer-3.2.11.min.js");
	importJS("/js/swfobject.js");
	importJS("/uploadify/jquery.uploadify.v2.1.4.min.js");
	importJS("/js/manager/jiancha/jiancha.language.js");
	importJS("/js/manager/jiancha/printBaoGao.js");
	importJS("/js/jquery.input.js");
	importJS("/js/jquery.PrintArea.js");
	importJS("/js/oimsUi.js");
//	importJS("/highcharts/highcharts.js");
//	importJS("/highcharts/exporting.js");
	importJS("/js/oims_dengbi.js");
	jiancha_Lanague = setLanguage(jiancha_Lanague);
}
// 计时方法(整理)
function jishi() {
	timer.s++;
	if (timer.s >= 60) {
		timer.s = 0;
		timer.m++;
		if (timer.m >= 60) {
			timer.h++;
			timer.m = 0;
		}
	}
	$(".startime li").eq(0).text(timer.m + "分");
	$(".startime li").eq(1).text(timer.s + "秒");
}
// 检查设备配置验证(整理)
function shebeiManager() {
	
	var glsbListUrl = "/publish/shebei/getShebeiListForUserAndIp.htm";// 根据工号和IP获得设备信息
	var data = getJSONData(glsbListUrl, {
		tag : Math.random()
	}, "post");
	if (data.state) {
		var shebei = data.obj;
		task.jcsbid = shebei[0].id;
	} else {
		$.oimsAlert("采集设备配置有误，请确认！");
	}
}


function jcysManager(){
	// 检查医生下拉框赋值
	
	var jcysData = getJSONData(
			"/publish/yuangong/getJianChaDoctorByBumenAndQuanxian.htm", {
				tag : Math.random()
			}, "post");
	if (jcysData.state) {
		var yuangonglist = jcysData.obj;
		$.each(yuangonglist, function(i, d) {
			if (d.gonghao == jcysData.gonghao) {
				$(
						"<option selected='selected' value=\""
								+ jcysData.gonghao + "\">" + d.xingming
								+ "</option>").appendTo("#jcysgh");
			} else {
				$(
						"<option value=\"" + d.gonghao + "\">" + d.xingming
								+ "</option>").appendTo("#jcysgh");
			}
		});
	}
	// 检查医生下拉框赋值
	// 更换检查医生进行登录判断
	var yuanshigonghao = $("#jcysgh").val();
	var yuanshiyonghuming = $("#jcysgh > option").html();
	var xuanzhegonghao = "";
	var xuanzheyonghuming = "";
	$("#jcysgh").change(
			function() {
				xuanzhegonghao = $("#jcysgh").val();
				xuanzheyonghuming = $(
						"#jcysgh option[value='" + xuanzhegonghao + "']")
						.html();
				$("#jcysgh").val(yuanshigonghao);
				var ta = addContent();
				if (xuanzheyonghuming == yuanshiyonghuming) {
					$("#jcysgh").val(yuanshigonghao);
					return;
				}
				var form_Checklogin = oimsFormWindow({
					id : "Checklogin",
					dialogTitle : "检查登录",
					url : contextPath + "/publish/user/userCheckLogin.htm",
					height : 350,
					width : 350,
					method : "post",
					resetForm : reset_form_Checklogin,// 重置方法
					btnOkSuccess : function(data_saveCategory, responseText,
							statusText) {
						if (data_saveCategory.state)
							$.oimsSucc("登录成功！", function() {
								$("#jcysgh").val(xuanzhegonghao);
								removeDiv_openWin();
							});
						else
							$.oimsError("登录失败", function() {
								$("#jcysgh").val(yuanshigonghao);
								removeDiv_openWin();
							});
					},
					btnOkError : function(jqXHR, textStatus, errorThrown) {
						$.oimsError("登录失败", function() {
							$("#jcysgh").val(yuanshigonghao);
							removeDiv_openWin();
						});
					},
				// btnOkBefor : validate_form_saveCategory

				});
				form_Checklogin.append(ta);
				// $("#input","#Checklogin").val(xuanzhegonghao);
				$("#input").val(xuanzheyonghuming);
			});
	function reset_form_Checklogin() {
		$("#input").val(xuanzheyonghuming);
		$("#pwd").val("");
		$("#loginType").val(0);
	}
	function addContent() {
		var rt = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
				+ "<tr>"
				+ "<td width='34%' align='right' id='oims_denglufs'><b>登录方式：</b></td>"
				+ "<td colspan='2'>"
				+ "<select name='loginType'>"
				+ "<option value='0'>用户名</option>"
				+ "<option value='1'>工号</option>"
				+ "</select>"
				+ "</td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td align='right' id='yongHu_id'><b>用&nbsp;户&nbsp;名：</b></td>"
				+ "<td colspan='2'>"
				+ "<input type='text' name='input' size='20' id='input' class='blur' /></td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td align='right' id='yongHu_pw'><b>密&nbsp;&nbsp;&nbsp;&nbsp;码：</b></td>"
				+ "<td colspan='2'>"
				+ "<input type='password' name='pwd' size='20' id='pwd' class='blur' /></td>"
				+ "</tr>" + "</table>";
		return rt;
	}

	// 更换检查医生进行登录判断
}

/** *************************************待检患者按钮触发的方法************************************** */
function showExecuteJcdList(btns) {
	pageTitle = "执行检查单";
	init();
	// shebeiManager();// 检查设备配置验证(根据工号和IP判断)
	/** *************************************待检患者上面表格begin************************************** */
	var execJcdTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	execJcdTemplate += "<tr><td class='starwidth'><div class='star'><a class='startime'><ul><li>00"
			+ "分"
			+ "</li><li>00"
			+ "秒"
			+ "</li></ul></a>"
			+ "<span id='startJiancha'><a href='javascript:startJiancha();' class='starcheck'><p>"
			+ "开始检查"
			+ "</p></a></span>"
			+ "<a href='#' class='breakcheck' disabled><p>"
			+ "结束检查"
			+ "</p></a></div></td>";
	execJcdTemplate += "<td valign='top' class='tabled'>"
			+ "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='8%' align='right' nowrap>"
			+ "病历号"
			+ "：</td>"
			+ "<td width='20%'><input id='searchId' name='searchId' type='text' class='blurview' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"
			+ "请输入病历号或刷卡后回车"
			+ "'/></td>"
			+ "<td  width='8%' align='right' nowrap>"
			+ "患者姓名"
			+ "：</td>"
			+ "<td width='12%'><input type='text' id='xingming' name='xingming'  class='blur' readonly/></td>"
			+ "<td  width='8%' align='right' nowrap>"
			+ "性别"
			+ "：</td>"
			+ "<td width='7%'><input type='text' name='xingbie' id='xingbie' class='blur' readonly /></td>"
			+ "<td  width='8%' align='right' nowrap>"
			+ "年龄"
			+ "：</td>"
			+ "<td width='7%'><input type='text' name='nianling'   id='nianling'  class='blur' readonly /></td>"
			+ "<td  width='8%' align='right' nowrap>"
			+ "手机"
			+ "：</td>"
			+ "<td  width='17%'><input type='text' name='shouji'  id='shouji'  class='blur' readonly /></td>"
			+ "</tr>";
	execJcdTemplate += "<tr>"
			+ "<td align='right' nowrap>"
			+ "检查项目"
			+ "：</td>"
			+ "<td><input type='text' name='jcxmmc' size='20' id='jcxmmc' class='blur' readonly /></td>"
			+ "<td align='right' nowrap>"
			+ "眼别"
			+ "：</td>"
			+ "<td><input type='text' name='yanbie' id='yanbie' class='blur' value='' readonly /></td>"
			+ "<td align='right' nowrap>"
			+ "检查医生"
			+ "：</td>"
			+ "<td colspan=2><select id='jcysgh' name='jcysgh' onblur=\"this.className='blur'\"></select></td>"
			+ "<td width='2%' ><span class='required' style='float:left'>*</span></td>"
			+ "<td colspan='2' width='25%'><div class='curve'>"
			+ "<a href='javascript:showShiLiChart();'>" + "视力曲线" + "</a>"
			+ "<a href='javascript:showYanYaChart();'>" + "眼压曲线" + "</a>"
			+ "</div></td>" + "</tr>";
	execJcdTemplate += " <tr>"
			+ " <td align='right' nowrap> "
			+ "检查单号"
			+ "：</td>"
			+ "<td>"
			+ "<input type='text' name='jcdid' size='20' id='jcdid' class='blur' readonly/>"
			+ " </td>"
			+ " <td align='right' nowrap>"
			+ "检查要求"
			+ "：</td>"
			+ " <td colspan='7'>"
			+ "   <input type='text' name='yaoqiu' size='20' id='yaoqiu'  class='blur' readonly />"
			+ "</td>" + " </tr>";
	execJcdTemplate += "<tr>"
			+ "<td align='right' nowrap>"
			+ "诊断"
			+ "：</td>"
			+ "<td colspan='9'>"
			+ "<input type='text' name='zhenduan' size='20' id='zhenduan'  class='blur' readonly/>"
			+ "</td></tr>";
	execJcdTemplate += "<tr>"
			+ "<td align='right' nowrap>"
			+ "主诉"
			+ "：</td>"
			+ "<td colspan='9'>"
			+ " <input type='text' name='zushu' size='20' id='zushu'  class='blur' readonly />"
			+ "</td>" + "</tr>";
	execJcdTemplate += "<tr>"
			+ "<td align='right' nowrap>"
			+ "现病史"
			+ "：</td>"
			+ "<td colspan='9'>"
			+ "<input type='text' name='xianbingshi' size='20' id='xianbingshi'  class='blur' readonly/>"
			+ "</td> </tr>";
	execJcdTemplate += "<tr>"
			+ "<td align='right' nowrap>"
			+ "既往史"
			+ "：</td>"
			+ "<td colspan='9'>"
			+ "<input type='text' name='jiwangshi' size='20' id='jiwangshi'  class='blur' readonly/>"
			+ "</td></tr>";
	execJcdTemplate += "<tr>"
			+ "<td align='right' nowrap>"
			+ "家族史"
			+ "：</td>"
			+ "<td colspan='9'>"
			+ "<input type='text' name='jiazushi' size='20' id='jiazushi'  class='blur' readonly/>"
			+ "</td></tr>";
	execJcdTemplate += "<tr>"
			+ "<td align='right' valign='top' nowrap>"
			+ "检查所见"
			+ "：</td>"
			+ "<td colspan='9'><input type='text' id='jcsj' name='jcsj' class='blur' size='20' readonly/></td>"
			+ "</tr></table></td>";
	execJcdTemplate += "<td><div class='checkicon'><a><p>" + "检查图示"
			+ "</p></a></div>"
			+ "<div class='checkiconopenimg' style = 'position:absolute'>"
			+ "<div class='checkiconclose'><a><p>" + "关闭图示" + "</p></a></div>"
			+ "<div class='checkimg'>" + "<ul>" + "<li class='lefteye1'></li>"
			+ "<li class='righteye1'></li>" + "</ul>" + "</div>" + "</div>"
			+ "</td></tr></table>";
	$("<div/>").attr("id", "query").addClass("query").appendTo("#right");
	$(execJcdTemplate).appendTo("#query");
	/** ******************检查图示div******************* */
	var openDiv = $(".checkiconopenimg"), btnOpen = $(".checkicon"), btnClose = $(".checkiconclose");
	contextClose = $(".checkimg");
	isShowFun(openDiv, btnOpen, btnClose, contextClose);
	/** ******************检查图示div******************* */
	jcysManager();
	/** *************************************待检患者上面表格end************************************** */

	/** *************************************待检患者列表begin************************************** */
	var executeJcdListTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='23%' class='leftalign' ><input name='search_binglihao_xingming' type='text' class='blurview' id='search_binglihao_xingming' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"
			+ "请输入病历号或姓名"
			+ "' size='28'/></td>"
			+ "<td width='9%'><a href='javascript:seniorSearchSubmit_executeJcd();' class='search'>"
			+ "查询"
			+ "</a></td>"
			+ "<td width='9%'><a href='javascript:executeJcdAdvSearch();' class='advsearch'>"
			+ "高级查询"
			+ "</a></td>"
			+ "<td width='59%' >"
			+ "<div class='btn'>"
			+ "<a onclick='return false;' href='javascript:deleteJcd();'><span class='dela'></span>"
			+ "删除"
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:jiaoHao_ExecuteJcd();'><span class='plusa'></span>"
			+ "叫号"
			+ "</a>"
			+ "<a onclick='return false;' id='guohao' href='javascript:passJcd();'><span class='gha'></span>"
			+ "过号"
			+ "</a>"
			+ "<a onclick='return false;' id='tijiao' href='javascript:submitJcd();'><span class='sumita'></span>"
			+ "出报告"
			+ "</a>"
			+ "<a onclick='return false;' id='import' href='javascript:importJcdPhoto();'><span class='importa'></span>"
			+ "导入" + "</a>" + "</div>" + "</td>" + "</tr>" + "</table>";
	$("<div/>").attr("id", "advquery").addClass("advquery").appendTo("#right");
	$(executeJcdListTemplate).appendTo("#advquery");
	if (task.jcsbid != null && task.jcsbid != "") {
		 btnProwerConfig(btns);// 按钮加上权限
	}
	loadExecuteJcdList();// 待检查检查单列表
	$("#search_binglihao_xingming").val("").focus();
	$("#search_binglihao_xingming").click(function() {
		clearInitQuery(this);
	});// 点击输入框清空字体
	$("#search_binglihao_xingming").blur(function() {
		if (this.value == "") {
			$("#search_binglihao_xingming").val("请输入病历号或姓名");
			$("#search_binglihao_xingming").addClass("blurview");
		}
	});
	$("#search_binglihao_xingming").bind("keyup", function(e) {
		if (e.which == 13) {
			seniorSearchSubmit_executeJcd();
		}
	});
	/** *************************************待检患者列表end************************************** */
}
/** *************************************待检患者按钮触发的方法************************************** */
/** *************************************获取待检查检查单列表开始*************************************** */
function loadExecuteJcdList() {
	listFactor = {
		listObj : [ {
			title : "序号",
			key : "paihao"
		}, {
			title : "病历号",
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
			title : "诊别",
			key : "zb",
			func : function(value) {
				if (value == oimsCategory.ZHENBIE_MENZHEN) {
					return "门诊";
				} else if (value == oimsCategory.ZHENBIE_ZHUYUAN) {
					return "住院";
				} else {
					return "急诊";
				}
			}
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
		},{
			title : "缴费状态",
			key : "jfbs",
			func : function(value) {
				if (value == oimsCategory.JCD_JFBS_WJF)
					return "未交费";
				else if (value == oimsCategory.JCD_JFBS_YJF)
					return "已交费";
				else if (value == oimsCategory.JCD_JFBS_YTF)
					return "已退费";
				else
					return "";
			}
		}, {
			title : "开单时间",
			key : "kdsj"
		} ],
		url : contextPath + "/publish/jcd/getExecuteJcdList.htm",
		method : "post",
		checkbox : true,
		single : true,
		invocationEvent : true,// 启用行选中事件
		methodName_Checked : executeJcd,// 触发的方法名
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getexecuteJcdPageSize(),// Page类的方法
			biaoshi : oimsCategory.JCD_STATE_DJC,// 50表示待检查检查单
			jcsbId : task.jcsbid,// 检查设备ID
			startkdsj : formatDate(getLastDate(30).getTime()),
			endkdsj: getDateNow(),
			tag : Math.random()
		}
	};
	$("#pageList").remove();
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#right");
	$(div_list).createPageList(listFactor);
}

/** ****************************************读取执行检查单，分页控件单击方法begin****************************************** */
function executeJcd() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要操作的检查单");
		return;
	}
	var url_getJcdExecuteFormByJcd = "/publish/jcd/getJcdExecuteFormByJcd.htm";
	var data_getJcdExecuteFormByJcd = getJSONData(url_getJcdExecuteFormByJcd, {
		id : dataObjects[0].id,
		tag : Math.random()
	}, "POST");
	if (data_getJcdExecuteFormByJcd.state) {
		var jcdexecuteform = data_getJcdExecuteFormByJcd.obj;
		$("#searchId").val(jcdexecuteform.binglihao);// 病历号
		$("#xingming").val(jcdexecuteform.xingming);// 患者姓名
		$("#xingbie").val(jcdexecuteform.xingbie ? "男" : "女");// 男
		$("#nianling").val(jcdexecuteform.nianling);// 年龄
		$("#shouji").val(jcdexecuteform.shouji);// 手机
		$("#jcxmmc").val(jcdexecuteform.jcxm);// 检查项目
		if (jcdexecuteform.yanbie == oimsCategory.LEFT_EYE) {
			$("#yanbie").val("左眼");
		} else if (jcdexecuteform.yanbie == oimsCategory.RIGHT_EYE) {
			$("#yanbie").val("右眼");
		} else if (jcdexecuteform.yanbie == oimsCategory.DOUBLE_EYE) {
			$("#yanbie").val("双眼");
		} else {
			$("#yanbie").val("");
		}
		$("#jcdid").val(jcdexecuteform.jcdid);// 检查单号
		$("#yaoqiu").val($("<div/>").html(jcdexecuteform.yaoqiu).text());// 检查要求
		$("#zhenduan").val($("<div/>").html(jcdexecuteform.zhenduan).text());// 诊断
		$("#zushu").val($("<div/>").html(jcdexecuteform.zushu).text());// 主诉
		$("#xianbingshi").val($("<div/>").html(jcdexecuteform.xianbingshi).text());// 现病史
		$("#jiwangshi").val($("<div/>").html(jcdexecuteform.jiwangshi).text());// 既往史
		$("#jiazushi").val($("<div/>").html(jcdexecuteform.jiazushi).text());// 家族史
		$("#jcsj").val($("<div/>").html(jcdexecuteform.jcsj).text());// 检查所见
	}
}
/** ****************************************读取执行检查单，分页控件单击方法end****************************************** */

function getexecuteJcdPageSize() {
	var bannerHeight = $("#header").outerHeight();
	var bottomHeight = $("#footer").outerHeight();
	var div_tabHeight = $(".query").outerHeight();
	var winHeight = $(window).height();
	var bodyHeight = winHeight - bannerHeight - bottomHeight - div_tabHeight;
	var h = bodyHeight - 78;
	return Math.floor(h / 25);
}

// 待检查高级查询弹出窗口(整理)
function executeJcdAdvSearch() {
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
			+ " <a href='javascript:seniorSearchSubmit_executeJcd();'><span class='advsumit'></span>"
			+ "提交"
			+ "</a>"
			+ " <a href='javascript:seniorSearchReset_executeJcd();'><span class='advreset'></span>"
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

// 待检查检查单高级查询(整理)
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

// 待检查检查单高级查询重置(整理)
function seniorSearchReset_executeJcd() {
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

/** *************************************获取待检查检查单列表结束************************************** */

/** ****************************************开始检查按钮调用的方法开始****************************************** */
function startJiancha() {
	var blh = $("#searchId").val();
	if (blh == "" || blh == "请输入病历号或刷卡后回车") {
		$.oimsAlert("请选择需要操作的检查单");
		return;
	}
	if (task.jcsbid == null || task.jcsbid == "") {
		$.oimsAlert("采集设备配置有误，请确认！");
		return;
	}
	var jcysgh = $('#jcysgh option:selected').val();// 检查医生
	// if (jcysgh = "undefined" || jcysgh == "") {
	// $.oimsAlert("请选择检查医生");
	// $("#jcysgh").focus();
	// return;
	// }
	var url_executeJcdStart = "/publish/jcd/executeJcdStart.htm";
	var data_executeJcdStart = getJSONData(url_executeJcdStart, {
		id : $("#jcdid").val(),// 检查单ID
		jcsbId : task.jcsbid,// 检查设备ID
		jcksDate:getNow(),
		jcys : jcysgh
	// 检查医生
	}, "post");
	if (data_executeJcdStart.state) {
		doing = true;
		jishiqi = setInterval(jishi, 1000);// 计时方法(整理)
		$("#startJiancha").text("").html(
				"<a href='javascript:resetJiancha();' class='starcheck'><p>"
						+ "中断检查" + "</p></a>");
		$(".breakcheck").attr("disabled", false);
		$(".breakcheck").bind("click", endJiancha);
//		$.oimsAlert("检查单执行中,点击确认结束检查", endJiancha);// 结束检查操作
		$.oimsConfirm({
			strTitle : "检查单执行中,点击确认结束检查,点击取消终止检查。",
			remove_length : true
		}, endJiancha, resetJiancha);
	} else {
		$.oimsAlert("检查单开始执行操作失败");
	}

}
/** ****************************************开始检查按钮调用的方法结束****************************************** */

/** ****************************************重置，和终止检查调用的方法开始****************************************** */
function resetJiancha() {
	var url_executeJcdReset = "/publish/jcd/executeJcdReset.htm";
	var data_executeJcdReset = getJSONData(url_executeJcdReset, {
		id : $("#jcdid").val(),
		biaoshi:$("#jcdBiaoshi").val(),
		tag : Math.random()
	}, "post");// 检查单ID
	if (data_executeJcdReset.state) {
		doing = false;
		clearInterval(jishiqi);// 清除计时器
		timer = {
			h : 0,
			m : 0,
			s : 0
		};
		$(".startime").html(
				"<ul><li>00" + "分" + "</li><li>00" + "秒" + "</li></ul>");
		$("#startJiancha").text("").html(
				"<a href='javascript:startJiancha();' class='starcheck'><p>"
						+ "开始检查" + "</p></a>");
		$(".breakcheck").attr("disabled", true);
		$(".breakcheck").unbind("click", endJiancha);
		seniorSearchSubmit_executeJcd();// 刷新列表
	} else {
		$.oimsAlert("检查单终止操作失败");
	}

}

/** ****************************************重置，和终止检查调用的方法开始****************************************** */

/** ****************************************结束检查按钮调用的方法开始****************************************** */
function endJiancha() {
	doing = false;
	clearInterval(jishiqi);// 清除计时器
	timer = {
		h : 0,
		m : 0,
		s : 0
	};
	$(".startime")
			.html("<ul><li>00" + "分" + "</li><li>00" + "秒" + "</li></ul>");
	$("#startJiancha").text("").html(
			"<a href='javascript:startJiancha();' class='starcheck'><p>"
					+ "开始检查" + "</p></a>");
	$(".breakcheck").attr("disabled", true);
	$(".breakcheck").unbind("click", endJiancha);
	var url_executeJcdEnd = "/publish/jcd/executeJcdEnd.htm";
	var data_executeJcdEnd = getJSONData(url_executeJcdEnd, {
		id : $("#jcdid").val(),
		jcys : $('#jcysgh option:selected').val(),
		jcjsDate:getNow(),
		tag : Math.random()
	}, "post");
	if (data_executeJcdEnd.state) {
		/*$.oimsSucc("检查单提交至待上传列表", function() {
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
		});*/
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
	} else {
		$.oimsError("结束检查单操作失败");
	}

}
/** ****************************************结束检查按钮调用的方法开始****************************************** */

/** ****************************************过号操作开始****************************************** */
// 将检查单进行过号操作，并删除排队标识
function passJcd() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要的检查单");
		return;
	}
	var url_executeJcdPass = "/publish/jcd/executeJcdPass.htm";// 将检查单进行过号操作，并删除排队标识
	var data_executeJcdPass = getJSONData(url_executeJcdPass, {
		id : dataObjects[0].id,
		tag : Math.random()
	}, "post");
	if (data_executeJcdPass.state)
		$.oimsSucc("检查单过号操作成功", function() {
			seniorSearchSubmit_executeJcd();
			removeDiv_openWin();
		});
	else
		$.oimsError("检查单过号操作失败", function() {
			seniorSearchSubmit_executeJcd();
			removeDiv_openWin();
		});
}
/** ****************************************过号操作结束****************************************** */
/** **************************叫号操作(待检查检查单列表)**************************** */
function jiaoHao_ExecuteJcd() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要操作的检查单");
		return;
	}
	$.oimsAlert("执行叫号操作");
}
/** **************************(待检查检查单列表)**************************** */
/** *****************************检查单提交操作开始******************************* */
//初始化报告模版
function init_Baogao_Moban(baogaoMoban_jcd){
	
	// $("#right").html("");// 清空中部div
	var div_reportdiv = $("<div/>").attr("id", "div_reportdiv").attr("style",
			"overflow-x:hidden;overflow-y:hidden;");// 主div
	// $(div_reportdiv).appendTo("#right");
	var div_reportresult = $("<div/>").attr("id", "div_reportresult").attr(
			"class", "reportresult").appendTo(div_reportdiv);// 报告模板主DIV
	$(div_reportresult).html(baogaoMoban_jcd.moban);// 模板内容
	var div_buttonsytle1 = $("<div/>").attr("id", "div_buttonsytle1").attr(
			"class", "buttonsytle1").attr("style",
			"width: 640px;margin: 0px auto;");// 操作按钮div
	$(div_buttonsytle1).appendTo(div_reportdiv);// 追加到主div

	var a_report = "<a id='a_printreport' class='btnone'><span class='print'></span>"
			+ "打印" + "</a>";// 打印报告信息
	$(a_report).appendTo(div_buttonsytle1);
	var a_save = "<a id='a_savebaogao' class='btnone'><span class='save'></span>"
			+ "保存" + "</a>";// 保存报告信息
	$(a_save).appendTo(div_buttonsytle1);
	var a_close = "<a id='a_closebaogao' class='btnone'><span class='close'></span>"
			+ "关闭" + "</a>";
	$(a_close).appendTo(div_buttonsytle1);
	$(div_reportdiv).oimsDialog({
		winType : 4,
		icon : "view",
		title : "录入",
		drag : false,
		locked : true,
		width : "740",
		height : "600"
	});
	var width = $("#div_reportdiv").width();
	var height = $("#div_reportdiv").height();
	$(".openWin").css({
		width : width,
		height : height + 30
	});
}


// 打开出报告窗口(整理)
function openDialog_outBaogao_baogao_wenzi() {
	importJS("/js/manager/baogao/baogaoController.js");
	dataObjects_choice = null;// 选中行的数据
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要出报告的检查单");
		return;
	}
	dataObjects_choice = dataObjects;// 选中行的数据
	var url_findBaogaoMobansByBaogaoMoban = "/publish/baogaomoban/findBaogaoMobansByBaogaoMoban.htm";// 根据报告模板对象查询报告模板
	var data_obj_findBaogaoMobansByBaogaoMoban = getJSONData(
			url_findBaogaoMobansByBaogaoMoban, {
				bumenId : dataObjects[0].jcksId,// 检查科室ID
				jcxmIds : dataObjects[0].jcxmIds,// 检查项目ID
				tag : Math.random()
			}, "post").obj;// 报告模板对象
	var baogaoMoban_jcd = null;
	if (data_obj_findBaogaoMobansByBaogaoMoban != null
			&& data_obj_findBaogaoMobansByBaogaoMoban.length != 0) {
		baogaoMoban_jcd = data_obj_findBaogaoMobansByBaogaoMoban[data_obj_findBaogaoMobansByBaogaoMoban.length - 1];
		mobanId = baogaoMoban_jcd.id;
	}
	if (baogaoMoban_jcd == null) {
		$.oimsAlert("未配置报告模板");
		return;
	}
	reportControllerWenZi(dataObjects_choice[0].jcxmIds,baogaoMoban_jcd);
	$("#a_closebaogao").bind("click", closeReporeDialog);
	/*if (dataObjects_choice[0].jcxmIds == json_jcxm.anshiyingjiancha) {
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyejmdxt_jiancha();
		$("#a_printreport").bind("click", previewEyejmdxt_jiancha);
		$("#a_savebaogao").bind("click", saveOrUpdateEyejmdxt_jiancha);
		$("#a_closebaogao").bind("click", closeReporeDialog);
	} 
//		else if (dataObjects_choice[0].jcxmIds == json_jcxm.jiaomoneipijishu) {
//		init_Baogao_Moban(baogaoMoban_jcd);
//		initData_eyejmspjs_jiancha();
//		$("#a_printreport").bind("click", previewEyejmspjs_jiancha);
//		$("#a_savebaogao").bind("click", saveOrUpdateEyejmspjs_jiancha);
//		$("#a_closebaogao").bind("click", closeReporeDialog);
//	}
	else if (dataObjects_choice[0].jcxmIds == json_jcxm.jiaomoqulvji) {
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyejmqlj_jiancha();
		$("#a_printreport").bind("click", previewEyejmqlj_jiancha);
		$("#a_savebaogao").bind("click", saveOrUpdateEyejmqlj_jiancha);
		$("#a_closebaogao").bind("click", closeReporeDialog);
	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.qianfangjiaojing) {
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyeqfjj_jiancha();
		$("#a_printreport").bind("click", previewEyeqfjj_jiancha);
		$("#a_savebaogao").bind("click", saveOrUpdateEyeqfjj_jiancha);
		$("#a_closebaogao").bind("click", closeReporeDialog);
	}else if (dataObjects_choice[0].jcxmIds == json_jcxm.sanmianjing) {
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyesmj_jiancha();
		$("#a_printreport").bind("click", previewEyesmj_jiancha);
		$("#a_savebaogao").bind("click", saveOrUpdateEyesmj_jiancha);
		$("#a_closebaogao").bind("click", closeReporeDialog);
	}else if (dataObjects_choice[0].jcxmIds == json_jcxm.yinxiejiancha) {
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyeyxjc_jiancha();
		$("#a_printreport").bind("click", previewEyeyxjc_jiancha);
		$("#a_savebaogao").bind("click", saveOrUpdateEyeyxjc_jiancha);
		$("#a_closebaogao").bind("click", closeReporeDialog);
	}else{
		$.oimsAlert("请先上传图片，然后到已检患者中进行出报告");
	} 
//	else if (dataObjects_choice[0].jcxmIds == json_jcxm.jiufangwei) {
//		initData_eyetsjjfw_jiancha();
//		$("#a_printreport").bind("click", previewEyetsjjfw_jiancha);
//		$("#a_savebaogao").bind("click", saveOrUpdateEyetsjjfw_jiancha);
//		$("#a_closebaogao").bind("click", closeReporeDialog);
//	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.sanjishigongneng) {
//		initData_eyetsjsj_jiancha();
//		$("#a_printreport").bind("click", previewEyetsjsj_jiancha);
//		$("#a_savebaogao").bind("click", saveOrUpdateEyetsjsj_jiancha);
//		$("#a_closebaogao").bind("click", closeReporeDialog);
//	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.bchao) {
//		initData_eyebchao_jiancha();
//		$("#a_printreport").bind("click", previewEyebchao_jiancha);
//		$("#a_savebaogao").bind("click", saveOrUpdateEyebchao_jiancha);
//		$("#a_closebaogao").bind("click", closeReporeDialog);
//	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.yanya) {
//		initData_eyeballpress_jiancha();
//		$("#a_printreport").bind("click", previewEyeballpress_jiancha);
//		$("#a_savebaogao").bind("click", saveOrUpdateEyeballpress_jiancha);
//		$("#a_closebaogao").bind("click", closeReporeDialog);
//	}  else if (dataObjects_choice[0].jcxmIds == json_jcxm.ubm) {
//		initData_eyeubm();
//		$("#a_printreport").bind("click", previewEyeubm);
//		$("#a_savebaogao").bind("click", saveOrUpdateEyeubm);
//		$("#a_closebaogao").bind("click", closeReporeDialog);
//	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.achao) {
//		initData_eyect();
//		$("#a_printreport").bind("click", previewEyect);
//		$("#a_savebaogao").bind("click", saveOrUpdateEyect);
//		$("#a_closebaogao").bind("click", closeReporeDialog);
//	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.oct_huangbangqu_shipan
//			|| dataObjects_choice[0].jcxmIds == json_jcxm.oct_huangbangqu
//			|| dataObjects_choice[0].jcxmIds == json_jcxm.oct_shipan
//			|| dataObjects_choice[0].jcxmIds == json_jcxm.oct_qianjie) {
//		initData_eyeoct();
//		$("#a_printreport").bind("click", previewEyeoct);
//		$("#a_savebaogao").bind("click", saveOrUpdateEyeoct);
//		$("#a_closebaogao").bind("click", closeReporeDialog);
//	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.ygzy_yinduoqinglv
//			|| dataObjects_choice[0].jcxmIds == json_jcxm.ygzy_yiguangsunan
//			|| dataObjects_choice[0].jcxmIds == json_jcxm.ygzy_lishede) {
//		initData_eyeygzy();
//		$("#a_printreport").bind("click", previewEyeygzy);
//		$("#a_savebaogao").bind("click", saveOrUpdateEyeygzy);
//		$("#a_closebaogao").bind("click", closeReporeDialog);
//	} else if (dataObjects_choice[0].jcxmIds == json_jcxm.ydzx_litizhaoxiang
//			|| dataObjects_choice[0].jcxmIds == json_jcxm.ydzx) {
//		initData_eyeydzx();
//		$("#a_printreport").bind("click", previewEyeydzx);
//		$("#a_savebaogao").bind("click", saveOrUpdateEyeydzx);
//		$("#a_closebaogao").bind("click", closeReporeDialog);
//	}
	// else {
	// console.log("其他检查项目");
	// }
*/}
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

function submitJcd() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要操作的检查单");
		return;
	}
	openDialog_outBaogao_baogao_wenzi();//打开出报告Dialog

	/*
	 * $.oimsConfirm({ strTitle : "确认提交该检查单", remove_length : true },
	 * doSubmitJcd);
	 */
}

// 直接提交检查单
function doSubmitJcd() {
	var dataObjects = getCheckBoxValue();
	var url_submitJcdById = "/publish/jcd/submitJcdById.htm";
	var data_submitJcdById = getJSONData(url_submitJcdById, {
		id : dataObjects[0].id,
		jcsbId : task.jcsbid,
		tag : Math.random()
	}, "post");
	if (data_submitJcdById.state)
		$.oimsSucc("检查单提交操作成功", function() {
			seniorSearchSubmit_executeJcd();
			removeDiv_openWin();
		});
	else
		$.oimsError("检查单提交操作失败", function() {
			seniorSearchSubmit_executeJcd();
			removeDiv_openWin();
		});
}

/** *****************************检查单提交操作结束******************************* */

/** *****************************检查单手动图片导入操作开始******************************* */
function importJcdPhoto() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要操作的检查单");
		return;
	}
	// 建立第一个table
	var uploadTemplate = "<div class='buttonsytle1 exportbtnbgbg'>"
			+
			// 上传，取消上传，浏览按钮
			"<a href='javascript:uploadifyUpload();'><span class='export'></span>"
			+ "上传文件"
			+ "</a>"
			+ " <a href='javascript:uploadifyClearQueue();'><span class='reset'></span>"
			+ "取消上传" + "</a>" + "</div>";
	// 建立第二个table
	var importinfo = "<div id='fileimport' class='bowsrediv' >"
			+ "<input type='file' name='fileinput' id='fileinput'/>"
			+ "<form  method='post' enctype='multipart/form-data' ></form>"
			+ "</div>";
	var div = $("<div/>").attr("id", "importDiv").appendTo("body");
	$(uploadTemplate).appendTo("#importDiv");
	$(importinfo).appendTo("#importDiv");
	// 弹出对话框
	$(div).oimsDialog({
		winType : 4,
		icon : "openexport",
		title : "图片导入",
		drag : false,
		locked : true,
		width : "450",
		height : "230",
		maxButton : false,
		minButton : false
	});
	var id = dataObjects[0].id;
	var huanzheId = dataObjects[0].huanzheid;
	var jiuzhenId = dataObjects[0].jiuzhenid;
	$("#fileinput")
			.uploadify(
					{
						'uploader' : contextPath + '/uploadify/uploadify.swf',
						'script' : contextPath
								+ '/publish/jcd/importJcdPhoto.htm?',
						'method' : 'Post',
						'cancelImg' : contextPath + '/uploadify/cancel.png',
						'buttonImg' : contextPath
								+ '/style/green/images/bowsre.png',
						'auto' : false,
						'folder' : '/',
						'multi' : true,
						'scriptData' : {
							'id' : id,
							'jiuzhenId' : jiuzhenId,
							'jcsbId' : task.jcsbid,
							'huanzheId' : huanzheId
						},
						'fileDesc' : '.jpg,.bmp,.png,.tiff,.tif,.gif,.avi,.wmv,.mpg,.pdf',
						'fileExt' : '*.jpg;*.bmp;*.png;*.tiff;*.tif;*.gif;*.avi;*.wmv;*.mpg;*.mpeg;*.pdf',
						'sizeLimit' : 10 * 1024 * 1024 * 1024,
						onComplete : function(event, queueID, fileObj,
								response, data) {
							var json_response = eval("(" + response + ")");
							if (!json_response.state) {
								$.oimsError("文件上传失败，请稍后重新上传");
							}
						},
						onAllComplete : function(event, data) {
							$.oimsSucc("影像文件上传成功", function() {
								seniorSearchSubmit_executeJcd();
								removeDiv_openWin();
							});
						},
						onError : function(event, queueID, fileObj) {

						},
						onCancel : function(event, queueID, fileObj) {

						}
					});
}

function uploadifyUpload() {
	$('#fileinput').uploadifyUpload();
}
function uploadifyClearQueue() {
	$('#fileinput').uploadifyClearQueue();
}
/** *****************************检查单手动图片导入操作开始******************************* */
// /**
// *************************用户切换验证所需要的方法（王杰添加）***************************************
// */
// /**
// * 用户验证弹出的界面元素字符串
// *
// * @returns 生成页面的额字符串
// */
// function resetPwdTabJcd() {
// var f = " <table width=\"100%\" border=\"0\" cellspacing=\"0\"
// cellpadding=\"0\">"
// + " <tr>"
// + " <td width=\"28%\" align=\"right\">用户名称：</td>"
// + " <td width=\"50%\"><input disabled='disabled' type=\"text\" name=\"huid\"
// id=\"huid\" onblur=\"this.className='blur'\"
// onfocus=\"this.className='focus'\" class=\"blur\" /></td>"
// + " </tr>"
// + " <tr>"
// + " <td align=\"right\">输入密码：</td>"
// + " <td><input type=\"password\" name=\"password\" id=\"password\"
// onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\"
// class=\"blur\" /></td>"
// + " </tr>" + "</table>";
// var rt = $(f);
// rt.append($("<input type='hidden' />").attr({
// id : "uid",
// name : "uid"
// }));
// return rt;
// };
// /**
// * 密码表单验证
// */
// function resetPwdValidata() {
// // var vl = validata() ;
// // var t = vl.isNotEmpty4EverySubmit([
// // {id:"password",lb:"输入密码"},
// // {id:"password2",lb:"确认密码"}
// // ]) ;
// // if(!t)
// // return false ;
// // if(!vl.isValueSame("password", "password2")){
// // $.oimsAlert("两次输入密码不一致！") ;
// // return false ;
// // }
// // return true ;
// };
// /** ***************************************************************** */
function showOneExecuteJcdForm() {
	pageTitle = "执行检查单";
	init();
	// shebeiManager();// 检查设备配置验证(根据工号和IP判断)
	/** *************************************待检患者上面表格begin************************************** */
	var execJcdTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	execJcdTemplate += "<tr><td class='starwidth'><div class='star'><a class='startime'><ul><li>00"
			+ "分"
			+ "</li><li>00"
			+ "秒"
			+ "</li></ul></a>"
			+ "<span id='startJiancha'><a href='javascript:startJiancha();' class='starcheck'><p>"
			+ "开始检查"
			+ "</p></a></span>"
			+ "<a href='#' class='breakcheck' disabled><p>"
			+ "结束检查"
			+ "</p></a></div></td>";
	execJcdTemplate += "<td valign='top' class='tabled'>"
			+ "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='8%' align='right' nowrap>"
			+ "病历号"
			+ "：</td>"
			+ "<td width='20%'><input id='searchId' name='searchId' type='text' class='blurview' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"
			+ "请输入病历号或刷卡后回车"
			+ "'/></td>"
			+ "<td  width='8%' align='right' nowrap>"
			+ "患者姓名"
			+ "：</td>"
			+ "<td width='12%'><input type='text' id='xingming' name='xingming'  class='blur' readonly/></td>"
			+ "<td  width='8%' align='right' nowrap>"
			+ "性别"
			+ "：</td>"
			+ "<td width='7%'><input type='text' name='xingbie' id='xingbie' class='blur' readonly /></td>"
			+ "<td  width='8%' align='right' nowrap>"
			+ "年龄"
			+ "：</td>"
			+ "<td width='7%'><input type='text' name='nianling'   id='nianling'  class='blur' readonly /></td>"
			+ "<td  width='8%' align='right' nowrap>"
			+ "手机"
			+ "：</td>"
			+ "<td  width='17%'><input type='text' name='shouji'  id='shouji'  class='blur' readonly /></td>"
			+ "</tr>";
	execJcdTemplate += "<tr>"
			+ "<td align='right' nowrap>"
			+ "检查项目"
			+ "：</td>"
			+ "<td><input type='text' name='jcxmmc' size='20' id='jcxmmc' class='blur' readonly /></td>"
			+ "<td align='right' nowrap>"
			+ "眼别"
			+ "：</td>"
			+ "<td><input type='text' name='yanbie' id='yanbie' class='blur' value='' readonly /></td>"
			+ "<td align='right' nowrap>"
			+ "检查医生"
			+ "：</td>"
			+ "<td colspan=2><select id='jcysgh' name='jcysgh' onblur=\"this.className='blur'\"></select></td>"
			+ "<td width='2%' ><span class='required' style='float:left'>*</span></td>"
			+ "<td colspan='2' width='25%'><div class='curve'>"
			+ "<a href='javascript:showShiLiChart();'>" + "视力曲线" + "</a>"
			+ "<a href='javascript:showYanYaChart();'>" + "眼压曲线" + "</a>"
			+ "</div></td>" + "</tr>";
	execJcdTemplate += " <tr>"
			+ " <td align='right' nowrap> "
			+ "检查单号"
			+ "：</td>"
			+ "<td>"
			+ "<input type='text' name='jcdid' size='20' id='jcdid' class='blur' readonly/>"
			+"<input type='hidden' name='jcdBiaoshi' id = 'jcdBiaoshi' />"
			+ " </td>"
			+ " <td align='right' nowrap>"
			+ "检查要求"
			+ "：</td>"
			+ " <td colspan='7'>"
			+ "   <input type='text' name='yaoqiu' size='20' id='yaoqiu'  class='blur' readonly />"
			+ "</td>" + " </tr>";
	execJcdTemplate += "<tr>"
			+ "<td align='right' nowrap>"
			+ "诊断"
			+ "：</td>"
			+ "<td colspan='9'>"
			+ "<input type='text' name='zhenduan' size='20' id='zhenduan'  class='blur' readonly/>"
			+ "</td></tr>";
	execJcdTemplate += "<tr>"
			+ "<td align='right' nowrap>"
			+ "主诉"
			+ "：</td>"
			+ "<td colspan='9'>"
			+ " <input type='text' name='zushu' size='20' id='zushu'  class='blur' readonly />"
			+ "</td>" + "</tr>";
	execJcdTemplate += "<tr>"
			+ "<td align='right' nowrap>"
			+ "现病史"
			+ "：</td>"
			+ "<td colspan='9'>"
			+ "<input type='text' name='xianbingshi' size='20' id='xianbingshi'  class='blur' readonly/>"
			+ "</td> </tr>";
	execJcdTemplate += "<tr>"
			+ "<td align='right' nowrap>"
			+ "既往史"
			+ "：</td>"
			+ "<td colspan='9'>"
			+ "<input type='text' name='jiwangshi' size='20' id='jiwangshi'  class='blur' readonly/>"
			+ "</td></tr>";
	execJcdTemplate += "<tr>"
			+ "<td align='right' nowrap>"
			+ "家族史"
			+ "：</td>"
			+ "<td colspan='9'>"
			+ "<input type='text' name='jiazushi' size='20' id='jiazushi'  class='blur' readonly/>"
			+ "</td></tr>";
	execJcdTemplate += "<tr>"
			+ "<td align='right' valign='top' nowrap>"
			+ "检查所见"
			+ "：</td>"
			+ "<td colspan='9'><input type='text' id='jcsj' name='jcsj' class='blur' size='20' readonly/></td>"
			+ "</tr></table></td>";
	execJcdTemplate += "<td><div class='checkicon'><a><p>" + "检查图示"
			+ "</p></a></div>"
			+ "<div class='checkiconopenimg' style = 'position:absolute'>"
			+ "<div class='checkiconclose'><a><p>" + "关闭图示" + "</p></a></div>"
			+ "<div class='checkimg'>" + "<ul>" + "<li class='lefteye1'></li>"
			+ "<li class='righteye1'></li>" + "</ul>" + "</div>" + "</div>"
			+ "</td></tr></table>";
	$("<div/>").attr("id", "query").addClass("query").appendTo("#right");
	$(execJcdTemplate).appendTo("#query");
	/** ******************检查图示div******************* */
	var openDiv = $(".checkiconopenimg"), btnOpen = $(".checkicon"), btnClose = $(".checkiconclose");
	contextClose = $(".checkimg");
	isShowFun(openDiv, btnOpen, btnClose, contextClose);
	/** ******************检查图示div******************* */
	jcysManager();
	/** *************************************待检患者上面表格end************************************** */

	/** *************************************待检患者列表begin************************************** */
	var executeJcdListTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='23%' class='leftalign' ><input name='search_binglihao_xingming' type='text' class='blurview' id='search_binglihao_xingming' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"
			+ "请输入病历号或姓名"
			+ "' size='28'/></td>"
			+ "<td width='9%'><a href='javascript:seniorSearchSubmit_executeJcd();' class='search'>"
			+ "查询"
			+ "</a></td>"
			+ "<td width='9%'><a href='javascript:executeJcdAdvSearch();' class='advsearch'>"
			+ "高级查询"
			+ "</a></td>"
			+ "<td width='59%' >"
			+ "<div class='btn'>"
			+ "<a onclick='return false;' href='javascript:jiaoHao_ExecuteJcd();'><span class='plusa'></span>"
			+ "叫号"
			+ "</a>"
			+ "<a onclick='return false;' id='guohao' href='javascript:passJcd();'><span class='gha'></span>"
			+ "过号"
			+ "</a>"
			+ "<a onclick='return false;' id='tijiao' href='javascript:submitJcd();'><span class='sumita'></span>"
			+ "提交"
			+ "</a>"
			+ "<a href='javascript:fenping();'><span class='doing'></span>查看</a>"
			+ "<a onclick='return false;' id='import' href='javascript:importJcdPhoto();'><span class='importa'></span>"
			+ "导入" + "</a>" + "</div>" + "</td>" + "</tr>" + "</table>";
	$("<div/>").attr("id", "advquery").addClass("advquery").appendTo("#right");
	$(executeJcdListTemplate).appendTo("#advquery");
	loadExecuteJcdList();// 待检查检查单列表
	$("#search_binglihao_xingming").click(function() {
		clearInitQuery(this);
	});// 点击输入框清空字体
	$("#search_binglihao_xingming").blur(function() {
		if (this.value == "") {
			$("#search_binglihao_xingming").val("请输入病历号或姓名");
			$("#search_binglihao_xingming").addClass("blurview");
		}
	});
	$("#search_binglihao_xingming").bind("keyup", function(e) {
		if (e.which == 13) {
			seniorSearchSubmit_executeJcd();
		}
	});
	/** *************************************待检患者列表end************************************** */
}

// 根据病历号或者检查单号获取单个检查单对象
function readexecuteJcd() {
	if (event.keyCode == 13) {
		var searchid = $("#searchId").val();
		if (searchid == "" || searchid == jiancha_Lanague.InputBlhOrCarNo) {
			$.oimsAlert(jiancha_Lanague.InputBlhOrCarNo);
			$("#searchid").focus();
		} else {
			var data = getJSONData(
					"/publish/jcd/getOneExecuteJcdByBlhOrJcdid.htm", {
						searchId : searchid,
						tag : Math.random()
					});
			if (data.state == 1) {
				var jef = data.obj;
				$("#xingming").val(jef.xingming);
				$("#xingbie").val(
						jef.xingbie ? jiancha_Lanague.Male
								: jiancha_Lanague.Female);
				$("#nianling").val(jef.nianling);
				$("#jcxmmc").val(jef.jcxmmc);
				$("#yaoqiu").val(jef.yaoqiu);
				if (jef.yanbie == oimsCategory.LEFT_EYE) {
					$("#yanbie").val(jiancha_Lanague.LeftEye);
				} else if (jef.yanbie == oimsCategory.RIGHT_EYE) {
					$("#yanbie").val(jiancha_Lanague.RightEye);
				} else if (jef.yanbie == oimsCategory.DOUBLE_EYE) {
					$("#yanbie").val(jiancha_Lanague.DoubleEye);
				}
				$("#zushu").val(jef.zushu);
				$("#xianbingshi").val(jef.xianbingshi);
				$("#jiwangshi").val(jef.jiwangshi);
				$("#jiazushi").val(jef.jiazushi);
				$("#jcdid").val(jef.jcdid);
			} else {
				$.oimsAlert(jiancha_Lanague.NoChoiceexecuteJcd);
			}
		}
	}
}

/** *******************************显示检查图示开始********************************** */
function showJianChaTuShi() {
	var jcdid = $("#jcdid").val();
	if (jcdid == "") {
		$.oimsAlert("请选择需要操作的检查单");
		return false;
	}
	var url_getJcdByJcd = "/publish/jcd/getJcdByJcd.htm";
	var data_getJcdByJcd = getJSONData(url_getJcdByJcd, {
		id : jcdid,
		tag : Math.random()
	}, "post");
	if (data_getJcdByJcd.state) {
		var jcd = data_getJcdByJcd.obj;// 检查单对象
		$(".lefteye1").text("");
		$(".righteye1").text("");
		if (jcd.leftPic != "" && jcd.leftPic != null) {
			$(
					"<img src=\"" + contextPath + jcd.leftPic
							+ "\" width=\"200\" height=\"150\"/>").appendTo(
					".lefteye1");
		} else {
			$(
					"<img src=\""
							+ contextPath
							+ "/exam_photos/eyea.png\" width=\"200\" height=\"150\"/>")
					.appendTo(".lefteye1");
		}
		if (jcd.rightPic != "" && jcd.rightPic != null) {
			$(
					"<img src=\"" + contextPath + jcd.rightPic
							+ "\" width=\"200\" height=\"150\"/>").appendTo(
					".righteye1");
		} else {
			$(
					"<img src=\""
							+ contextPath
							+ "/exam_photos/eyeaa.png\" width=\"200\" height=\"150\"/>")
					.appendTo(".righteye1");
		}
	}
	return true;
}

function isShowFun(openDiv, btnOpen, btnClose, contextClose) {
	var width = openDiv.width();
	openDiv.css({
		"right" : "-" + width + "px"
	});
	btnOpen.click(function() {
		if (showJianChaTuShi()) {
			// 从数据库中获取数据
			$(this).animate({
				"opacity" : "0"
			}, 100, function() {
				$(this).css("z-index", "-9999");
				openDiv.animate({
					"right" : "0px"
				}, "slow");
			});
		}
	});
	btnClose.click(function() {
		openDiv.animate({
			"right" : "-" + width + "px"
		}, "slow", function() {
			btnOpen.css({
				"opacity" : "1",
				"z-index" : "9999"
			}, 10);
		});
	});

	contextClose.click(function() {
		openDiv.animate({
			"right" : "-" + width + "px"
		}, "slow", function() {
			btnOpen.css({
				"opacity" : "1",
				"z-index" : "9999"
			}, 10);
		});
	});
}
/** *******************************显示检查图示结束********************************** */

function fillLlData(slJcsj, slVal, name, slobj) {
	var ll = new Array();
	var nll = {
		name : null,
		data : ll
	};
	$.each(slobj, function(i, d) {
		slJcsj.push(formatDate(d.jcsj.time));
		ll.push(d.ll);
	});
	nll.name = name;
	slVal.push(nll);
};

function fillLjzData(slJcsj, slVal, name, slobj) {
	var ljz = new Array();
	var nljz = {
		name : null,
		data : ljz
	};
	$.each(slobj, function(i, d) {
		slJcsj.push(formatDate(d.jcsj.time));
		ljz.push(d.ljz);
	});
	nljz.name = name;
	slVal.push(nljz);
};

function fillLjData(slJcsj, slVal, name, slobj) {
	var lj = new Array();
	var nlj = {
		name : null,
		data : lj
	};
	$.each(slobj, function(i, d) {
		slJcsj.push(formatDate(d.jcsj.time));
		lj.push(d.lj);
	});
	nlj.name = name;
	slVal.push(nlj);
};

function fillRlData(slJcsj, slVal, name, slobj) {
	var rl = new Array();
	var nrl = {
		name : null,
		data : rl
	};
	$.each(slobj, function(i, d) {
		slJcsj.push(formatDate(d.jcsj.time));
		rl.push(d.rl);
	});
	nrl.name = name;
	slVal.push(nrl);
};

function fillRjzData(slJcsj, slVal, name, slobj) {
	var rjz = new Array();
	var nrjz = {
		name : null,
		data : rjz
	};
	$.each(slobj, function(i, d) {
		slJcsj.push(formatDate(d.jcsj.time));
		rjz.push(d.rjz);
	});
	nrjz.name = name;
	slVal.push(nrjz);
};

function fillRjData(slJcsj, slVal, name, slobj) {
	var rj = new Array();
	var nrj = {
		name : null,
		data : rj
	};
	$.each(slobj, function(i, d) {
		slJcsj.push(formatDate(d.jcsj.time));
		rj.push(d.rj);
	});
	nrj.name = name;
	slVal.push(nrj);
};

function showShiLiChart() {
	var jcdid = $("#jcdid").val();
	if (jcdid == "") {
		$.oimsAlert("请选择需要操作的检查单");
		return;
	}
	// var dataObjects=getCheckBoxValue();
	// if(dataObjects.length==0){
	// $.oimsAlert(language.CheckOneItem_Alert);
	// return;
	// }
	// if(dataObjects.length>1){
	// $.oimsAlert(language.OnlyOpOneData);
	// return;
	// }
	//	
	// var huanzheId = dataObjects[0].huanzheid;
	// var slData =
	// getJSONData("/publish/ShiLi/getShiLiListByHzid.htm",{huanzheId:huanzheId,tag:Math.random()},"post");
	//	
	// var slJcsj=new Array();
	// var slVal = new Array();
	// if(slData.state){
	// var slobj = slData.obj;
	// if(slobj.length>0){
	//			
	// var div = "<div id='container' style='min-width: 400px; height: 400px;
	// margin: 0 auto'></div>";
	// $(div).oimsDialog({winType:4,icon:"vision",title:jiancha_Lanague.ShiLiToLine,drag:false,locked:true,width:"500",height:"500",maxButton:false,minButton:false});
	//			
	// fillLlData(slJcsj,slVal,jiancha_Lanague.LeftEyeOrignVision,slobj);
	// fillLjzData(slJcsj,slVal,jiancha_Lanague.LeftEyeJZVision,slobj);
	// fillLjData(slJcsj,slVal,jiancha_Lanague.LeftEyeJinVision,slobj);
	// fillRlData(slJcsj,slVal,jiancha_Lanague.RightEyeOrignVision,slobj);
	// fillRjzData(slJcsj,slVal,jiancha_Lanague.RightEyeJZVision,slobj);
	// fillRjData(slJcsj,slVal,jiancha_Lanague.RightEyeJinVision,slobj);
	// }
	//
	//		
	// }else{
	// $.oimsAlert("该患者无视力检查数据！");
	// return;
	// }
	// var option = {
	// chartContent:{width:"500"},
	// divContent:{id:"container"},
	// xAxisContent:{name:"检查日期",unit:""},
	// yAxisContent:{name:"视力",unit:"度"},
	// //
	// arrayContent:[{name:"左眼",data:[0.5,0.2,1.7,3.6]},{name:"右眼",data:[0.7,0.5,2.7,3.9]}],
	// // categoriesNum:["2011-12-09","2012-02-09","2012-04-09","2012-09-09"]
	// arrayContent:slVal,
	// categoriesNum:slJcsj
	// //arrayContent:[{name:'左眼裸眼视力',data:[[8,0.5],[3,0.2]]},{name:'左眼矫正视力',data:[[8,1.5],[3,0.6]]},{name:'右眼',data:[[8,0.6],[3,0.2]]}]
	// };
	// creteChart(option);
};

function fillLyyData(yyJcsj, yyVal, name, yyobj) {
	var lyy = new Array();
	var nlyy = {
		name : null,
		data : lyy
	};
	$.each(yyobj, function(i, d) {
		yyJcsj.push(formatDate(d.ycsj.time));
		lyy.push(d.os);
	});
	nlyy.name = name;
	yyVal.push(nlyy);
};

function fillRyyData(yyJcsj, yyVal, name, yyobj) {
	var ryy = new Array();
	var nryy = {
		name : null,
		data : ryy
	};
	$.each(yyobj, function(i, d) {
		yyJcsj.push(formatDate(d.ycsj.time));
		ryy.push(d.od);
	});
	nryy.name = name;
	yyVal.push(nryy);
};

function showYanYaChart() {
	var jcdid = $("#jcdid").val();
	if (jcdid == "") {
		$.oimsAlert("请选择需要操作的检查单");
		return;
	}
	// var dataObjects=getCheckBoxValue();
	// if(dataObjects.length==0){
	// $.oimsAlert(language.CheckOneItem_Alert);
	// return;
	// }
	// if(dataObjects.length>1){
	// $.oimsAlert(language.OnlyOpOneData);
	// return;
	// }
	//	
	// var huanzheId = dataObjects[0].huanzheid;
	// var yyData =
	// getJSONData("/publish/yanya/getYanYaListByHzid.htm",{huanzheId:huanzheId,tag:Math.random()},"post");
	//	
	// var yyJcsj=new Array();
	// var yyVal = new Array();
	// if(yyData.state){
	// var yyobj = yyData.obj;
	// if(yyobj.length>0){
	// var div = "<div id='container' style='min-width: 400px; height: 400px;
	// margin: 0 auto'></div>";
	// $(div).oimsDialog({winType:4,icon:"presure",title:"眼压曲线",drag:false,locked:true,width:"500",height:"500",maxButton:false,minButton:false});
	// fillLyyData(yyJcsj,yyVal,"左眼眼压",yyobj);
	// fillRyyData(yyJcsj,yyVal,"右眼眼压",yyobj);
	// }
	//
	//		
	// }else{
	// $.oimsAlert("该患者无眼压检查数据！");
	// return;
	// }
	// var option = {
	// chartContent:{width:"500"},
	// divContent:{id:"container"},
	// xAxisContent:{name:"检查日期",unit:""},
	// yAxisContent:{name:"眼压",unit:"mmHg"},
	// //
	// arrayContent:[{name:"左眼",data:[0.5,0.2,1.7,3.6]},{name:"右眼",data:[0.7,0.5,2.7,3.9]}],
	// // categoriesNum:["2011-12-09","2012-02-09","2012-04-09","2012-09-09"]
	// arrayContent:yyVal,
	// categoriesNum:yyJcsj
	// //arrayContent:[{name:'左眼裸眼视力',data:[[8,0.5],[3,0.2]]},{name:'左眼矫正视力',data:[[8,1.5],[3,0.6]]},{name:'右眼',data:[[8,0.6],[3,0.2]]}]
	// };
	// creteChart(option);
};

function creteChart(options) {
	var chart = new Highcharts.Chart({
		chart : {
			renderTo : options.divContent.id,
			type : 'line',
			width : options.chartContent.width,
			style : {
				margin : '0 auto'
			}
		},
		title : {
			text : ''
		},
		subtitle : {
			text : ''
		},
		xAxis : {
			categories : options.categoriesNum
		},
		yAxis : {
			title : {
				text : options.yAxisContent.name
			},
			labels : {
				formatter : function() {
					return this.value + options.yAxisContent.unit;
				}
			},
			lineWidth : 2,
			min : 0
		},
		legend : {
			enabled : true
		},
		tooltip : {
			enabled : true,
			formatter : function() {
				return this.x + "<br/>" + this.series.name + ":" + this.y
						+ options.yAxisContent.unit + "<br/>";
			}
		},
		plotOptions : {
			line : {
				dataLabels : {
					enabled : true
				},
				enableMouseTracking : true
			}
		},
		series : options.arrayContent
	});
}

function deleteJcd(){
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要操作的检查单");
		return;
	}
	
	var url_deleteJcdByOneselfAdd = "/publish/jcd/deleteJcdByOneselfAdd.htm";
	var data_url_deleteJcdByOneselfAdd = getJSONData(url_deleteJcdByOneselfAdd, {
		id : dataObjects[0].jcdid,
		tag : Math.random()
	}, "post");
	if(data_url_deleteJcdByOneselfAdd.state){
		$.oimsSucc(data_url_deleteJcdByOneselfAdd.message,seniorSearchSubmit_executeJcd);
	}else{
		$.oimsError(data_url_deleteJcdByOneselfAdd.message,seniorSearchSubmit_executeJcd);
	}
	
	
	
	
}
