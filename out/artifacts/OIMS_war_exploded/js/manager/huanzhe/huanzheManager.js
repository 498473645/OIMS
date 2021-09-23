function loadJsAndCss_Huanzhe() {
	importJS("/js/oimsUi.js");
	importJS("/js/oims_dengbi.js");
//	importJS("/js/manager/doctor/doctorManager.js");// 医生工作站
	importJS("/js/extend/camera/js/jquery.swfobject.1-1-1.min.js");
	importJS("/js/extend/camera/js/camera.js");
	importJS("/js/diqu.js");
	loadWelcomePage();
};

var l_hz = {
	fm : 832,// 家属
	Tel_hz : 831,// 固定电话
	Export : 68,// 导出
	Birth : 195,// 出生日期
	Sfzh : 385,// 身份证号
	MobilePhone : 200,// 手机号码
	WorkDW : 387,// 工作单位
	Zcsj : 388,// 注册时间
	Name : 188,// 患者姓名
	hzxb : 40,// 患者性别
	isYiBao : 52,// 是否医保

	zhi : 51,// 至
	TeleNum : 162,// 联系电话
	HzAge : 53,// 患者年龄
	DwTel : 54,// 单位电话
	BzFenLei : 60,// 病种分类
	JiuZhenJiLu : 61,// 就诊记录

	HzDwDz : 478,// 单位地址
	HzDwYb : 479,// 单位邮编
	Jtdz : 206,// 家庭地址
	YZBB : 480,// 邮政编码
	LXFS : 481,// 联系方式
	Lxr : 55,// 联系人
	JinJiTel : 56,// 紧急电话
	HzSource : 59,// 患者来源
	note : 482,// 备注

	inBlhOrHzXm : 457,// 请输入病历号或患者姓名
	InsertOK_Alert : 223,// 添加成功!
	InsertFail_Alert : 224,// 添加失败
	UpdateOK_Alert : 225,// 修改成功
	UpdateFail_Alert : 226,// 修改失败
	DelOK_Alert : 227,// 删除成功

	hzNameIsNotNull : 458,// 患者姓名不能为空
	birthIsNotNull : 451,// 出生日期不能为空!
	shojiIsNotNull : 459,// 手机号不能为空
	shojiIsFormatError : 460,// 手机号格式错误
	telFormatError : 461,// 联系电话格式错误
	hzYiBaoHao : 462,// 医保号
	isDelHZXX : 463,// 确认删除所选患者信息？
	XingMing : 35,// 姓名
	Sex : 189,// 性别
	SsDq : 389,// 所属地区
	birthday : 464,// 生日
	BingLiHao : 383,// 病历号
	jiuzheCiShu : 465,// 应该次数
	Age : 408,// 年龄
	phone : 466,// 手机
	idNum : 467,// 身份证
	yibao : 468,// 医保
	shangbao : 469,// 商保
	gongfei : 470,// 公费
	JiuZhenCase : 67,// 就诊情况
	return_ : 471,// 返回
	BingLiSee : 329,// 病历查看
	jiuzheDateIsNull : 472,// 无就诊数据
	Male : 204,// 男
	Female : 205,// 女
	has : 473,// 有
	noHas : 474,// 无
	privatePay : 475,// 自费
	HuanZheXinXiList : 262,// 患者列表
	fenZhen : 5000
// 分诊
};

// 弹出高级查询表格
function huanZheExSearch_luke() {
	var seniorSearchTemplate = findEx_hz();// 创建高级查询表格
	$.oimsBox({
		parentDiv : "advquery",// 将生成内容添加的id
		divContent : seniorSearchTemplate
	});
	//showFullDiquSelect("#search_ssdq_c");
}

// 患者信息高级查询操作(整理)
function seniorSearchSubmit_hz_luke() {
	var data_search = {};
	var search = $("#search_binglihao_xingming").val().indexOf("请输入") != -1 ? ""
			: $("#search_binglihao_xingming").val();
	var xingming = $("#search_xingming").length == 1 ? $("#search_xingming")
			.val() : "";// 患者姓名
	// 性别复选框
	var xingbie = "";
	if ($("#search_xingbie").length != 0) {
		$("input[name='search_xingbie']:checked").each(function() {
			xingbie += $(this).val() + ",";
		});
		if (xingbie != "")// 截取去掉后面的“,”
			xingbie = xingbie.substring(0, xingbie.lastIndexOf(","));
	}
	// 性别复选框
	var diqu = $("#search_diqu").length == 1 ? $("#search_diqu").val() : "";// 所属地区
	var zcrqStart = $("#search_zcrqStart").length == 1 ? $("#search_zcrqStart")
			.val() : "";// 注册时间开始
	var zcrqEnd = $("#search_zcrqEnd").length == 1 ? $("#search_zcrqEnd").val()
			: "";// 注册时间结束
	var shouji = $("#search_shouji").length == 1 ? $("#search_shouji").val()
			: "";// 手机号码
	// 是否医保复选框
	var yibao = "";
	if ($("#search_yibao").length != 0) {
		$("input[name='search_yibao']:checked").each(function() {
			yibao += $(this).val() + ",";
		});
		if (yibao != "")// 截取去掉后面的“,”
			yibao = yibao.substring(0, yibao.lastIndexOf(","));
	}
	// 是否医保复选框
	var dianhua = $("#search_dianhua").length == 1 ? $("#search_dianhua").val()
			: "";// 联系电话
	var shengriStart = $("#search_shengriStart").length == 1 ? $(
			"#search_shengriStart").val() : "";// 患者年龄开始
	var shengriEnd = $("#search_shengriEnd").length == 1 ? $(
			"#search_shengriEnd").val() : "";// 患者年龄结束
	var dwdh = $("#search_dwdh").length == 1 ? $("#search_dwdh").val() : "";// 单位电话
	var hzlxr = $("#search_hzlxr").length == 1 ? $("#search_hzlxr").val() : "";// 患者联系人家属
	var hzlxrdh = $("#search_hzlxrdh").length == 1 ? $("#search_hzlxrdh").val()
			: "";// 患者联系人电话紧急电话
	var sfzh = $("#search_sfzh").length == 1 ? $("#search_sfzh").val() : "";// 身份证号码
	// 患者来源复选框
	var laiyuan = "";
	if ($("#search_laiyuan").length != 0) {
		$("input[name='search_laiyuan']:checked").each(function() {
			laiyuan += $(this).val() + ",";
		});
		if (laiyuan != "")// 截取去掉后面的“,”
			laiyuan = laiyuan.substring(0, laiyuan.lastIndexOf(","));
	}
	// 患者来源复选框
	var jtdz = $("#search_jtdz").length == 1 ? $("#search_jtdz").val() : "";// 家庭地址
	var bingZhongId = $("#search_bingZhongId").length == 1 ? $(
			"#search_bingZhongId option:selected").val() : "";// 病种分类
	var bingLiKey = $("#search_bingLiKey").length == 1 ? $("#search_bingLiKey")
			.val() : "";// 就诊记录
	data_search = {
		search : search,
		xingming : xingming,// 患者姓名
		xingbie : xingbie,// 性别
		diqu : diqu,// 所属地区
		zcrqStart : zcrqStart,// 注册时间开始
		zcrqEnd : zcrqEnd,// 注册时间结束
		shouji : shouji,// 手机号码
		yibao : yibao,// 医保
		dianhua : dianhua,// 联系电话
		shengriStart : shengriStart,// 患者年龄开始
		shengriEnd : shengriEnd,// 患者年龄结束
		dwdh : dwdh,// 单位电话
		hzlxr : hzlxr,// 患者联系人家属
		hzlxrdh : hzlxrdh,// 患者联系人电话紧急电话
		sfzh : sfzh,// 身份证号码
		laiyuan : laiyuan,// 患者来源
		jtdz : jtdz,// 家庭地址
		bingZhongId : bingZhongId,// 病种分类
		bingLiKey : bingLiKey
	};

	$.extend(listFactor.data, data_search);
	$("#pageList").createPageList(listFactor);
//	var options = $("#pageList input[name='checkBoxObj'] ");
//	if(options.length==0){//本地数据库不存该患者，到his数据库进行查询
//		
//	}
};

// 患者信息新增(整理)
function addHandler() {
	var view = addDialog('add');
	var form_saveHuanZhe = $("<form/>").attr("id", "form_saveHuanZhe").attr(
			"action", contextPath + "/publish/huanZheXinXi/saveHuanZhe.htm")
			.attr("enctype", "multipart/form-data").attr("method", "post");
	$(view).appendTo(form_saveHuanZhe);
	var div_openbutton = $("<div/>").attr("id", "div_openbutton").attr("class",
			"openbutton").appendTo(form_saveHuanZhe);// 底部div
	var div_openbutton_html = "<a href='javascript:saveHuanZhe();'><span class='advsumit'></span>"
			+ "提交"
			+ "</a> <a href='javascript:resetHuanZheXinXiForm();'><span class='advreset'></span>"
			+ "重置" + "</a>";
	$(div_openbutton_html).appendTo(div_openbutton);
	$(form_saveHuanZhe).oimsDialog({
		icon : "add",
		title : "新增",
		width : 700,
		height : 420,
		drag : false,// 是否可以拖动窗口
		locked : true,
		winType : 4,
		button : null
	});

	showFullDiquSelect($("#ssdq_c"));
	// 读取身份证begin
	// var sfzdq = "<a href='javascript:#'>" + "<span class='sfz'></span>"
	// + "读取身份" + "</a>";
	// sfzdq = $(sfzdq);
	// $(".openbutton").prepend(sfzdq);
	// sfzdq.click(readIdCard);
	// 读取身份证end
	calendarFun("shengri");// 出生日期
	$("#zcrq").val(getNow().substring(0, 10));// 注册日期
	$("#file_C").css({
		"width" : "200px",
		"margin-left" : "14px"
	});
	$.customfile('fieldbutton', 'filed', 'fieldtext', "openWin");// 图像浏览上传

	// 接诊医生下拉框赋值begin
	var data_getKaiDanDoctorByQuanxian = getJSONData(
			"/publish/yuangong/getKaiDanDoctorByQuanxian.htm", {
				tag : Math.random()
			}, "post");
	if (data_getKaiDanDoctorByQuanxian.state) {
		var yuangonglist = data_getKaiDanDoctorByQuanxian.obj;
		$.each(yuangonglist,
				function(i, d) {
					$(
							"<option value=\"" + d.gonghao + "\">" + d.xingming
									+ "</option>").appendTo("#fzys");
				});
	}
	// 接诊医生下拉框赋值end
};

// 保存患者基本信息
function saveHuanZhe() {
	$("#form_saveHuanZhe").ajaxForm(
			{
				beforeSend : validate_saveHuanZhe,
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
					if (state)

						$.oimsSucc("患者信息新增成功", function() {
							seniorSearchSubmit_hz_luke();
							removeDiv_openWin();
						});
					else
						$.oimsError("患者信息新增失败", function() {
							seniorSearchSubmit_hz_luke();
							removeDiv_openWin();
						});
				}
			});
	$("#form_saveHuanZhe").submit();
}

// 患者信息新增表单重置操作(整理)
function resetHuanZheXinXiForm() {
	$("#xingming").val("");// 姓名
	$("input[name='xingbie'][value='1']").attr("checked", true);// 性别
	$("#shengri").val("");// 出生日期
	$("#zcrq").val(getNow().substring(0, 10));// 注册日期
	$("#diqu").val("");// 所属地区
	$("#shouji").val("");// 手机
	$("input[name='yibao'][value='0']").attr("checked", true);// 是否医保
	$("#ybh").text("");// 医保号
	$("#ybhtxt").html("");
	$("#fzys").val("");// 接诊医生
	$("#dwdh").val("");// 单位电话
	$("#gzdw").val("");// 工作单位
	$("#dwdz").val("");// 单位地址
	$("#dwyb").val("");// 单位邮编
	$("#sfzh").val("");// 身份证号
	$("#jtdz").val("");// 家庭地址
	$("#youbian").val("");// 邮编
	$("#dianhua").val("");// 固定电话
	$("#hzlxr").val("");// 家属
	$("#hzlxrdh").val("");// 患者联系人电话紧急电话
	$("input[name='laiyuan'][value='1001']").attr("checked", true);// 患者来源
	$("#beizhu").val("");// 备注
}

// 患者信息相关验证方法(整理)
function validataFm() {
	var oValidataData = {
		nullValidataData : {
			'xingming' : '患者姓名为空',
			'binglihao' : '患者病历号为空',
			'shengri' : '出生日期为空',
			'zcrq' : '注册日期为空'
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);// 带*为必填项
		return false;
	}
	return true;
};

// 患者信息相关验证方法(整理)
function validate_saveHuanZhe() {
	var oValidataData = {
		nullValidataData : {
			'xingming' : '患者姓名为空',
			'binglihao' : '患者病历号为空',
			'shengri' : '出生日期为空',
			'zcrq' : '注册日期为空'
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);// 带*为必填项
		return false;
	}
	var url_getHuanzhexinxiByBLH = "/publish/huanZheXinXi/getHuanzhexinxiByBLH.htm";
	var data_getHuanzhexinxiByBLH = getJSONData(url_getHuanzhexinxiByBLH, {
		binglihao : $("#binglihao").val(),
		tag : Math.random()
	}, "post");
	if (data_getHuanzhexinxiByBLH.state
			&& data_getHuanzhexinxiByBLH.obj != null) {
		$.oimsAlert("病历号已经存在于数据库");
		return false;
	}
	return true;
};

// 患者信息修改(整理)
function updateHandler() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要修改的患者");
		return;
	}
	var view = addDialog('update');
	var form_updateHuanZhe = $("<form/>").attr("id", "form_updateHuanZhe")
			.attr("action",
					contextPath + "/publish/huanZheXinXi/updateHuanZhe.htm")
			.attr("enctype", "multipart/form-data").attr("method", "post");
	$(view).appendTo(form_updateHuanZhe);
	var div_openbutton = $("<div/>").attr("id", "div_openbutton").attr("class",
			"openbutton").appendTo(form_updateHuanZhe);// 底部div
	var div_openbutton_html = "<a href='javascript:updateHuanZhe();'><span class='advsumit'></span>"
			+ "提交"
			+ "</a> <a href='javascript:FillData();'><span class='advreset'></span>"
			+ "重置" + "</a>";
	$(div_openbutton_html).appendTo(div_openbutton);
	$(form_updateHuanZhe).oimsDialog({
		icon : "edit",
		title : "修改",
		width : 700,
		height : 420,
		drag : false,
		locked : true,
		winType : 4,
		button : null
	});
	calendarFun("shengri");// 出生日期
	$("#zcrq").val(getNow().substring(0, 10));// 注册日期
	$("#file_C").css({
		"width" : "200px",
		"margin-left" : "14px"
	});
	$.customfile('fieldbutton', 'filed', 'fieldtext', "openWin");// 图像浏览上传
	FillData();// 页面赋值
};

// 修改患者基本信息
function fenzhenHuanZhe() {
	$("#form_updateHuanZhe").ajaxForm(
			{
				beforeSend : validataFm,
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
					if (state)
						$.oimsSucc("分诊操作成功", function() {
							seniorSearchSubmit_hz_luke();
							removeDiv_openWin();
						});
					else
						$.oimsError("分诊操作失败", function() {
							seniorSearchSubmit_hz_luke();
							removeDiv_openWin();
						});
				}
			});
	$("#form_updateHuanZhe").submit();
}

// 修改患者基本信息
function updateHuanZhe() {
	$("#form_updateHuanZhe").ajaxForm(
			{
				beforeSend : validataFm,
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
					if (state)
						$.oimsSucc("患者信息修改成功", function() {
							seniorSearchSubmit_hz_luke();
							removeDiv_openWin();
						});
					else
						$.oimsError("患者信息修改失败", function() {
							seniorSearchSubmit_hz_luke();
							removeDiv_openWin();
						});
				}
			});
	$("#form_updateHuanZhe").submit();
}

// 修改，分诊 弹出窗口患者基本信息赋值(整理)
function FillData() {
	var dataObjects = getCheckBoxValue();
	var data_findHuanZheById = getJSONData(
			"/publish/huanZheXinXi/findHuanZheById.htm", {
				id : dataObjects[0].id,
				tag : Math.random()
			}, "post");
	if (data_findHuanZheById.state) {
		var huanzhexinxi = data_findHuanZheById.obj;
		showFullDiquSelect($("#ssdq_c"),huanzhexinxi.diquId);
		$("#id").val(huanzhexinxi.id);// 隐藏域ID
		$("#xingming").val(huanzhexinxi.xingming);// 姓名
		utilTool().radioSelect('xingbie', huanzhexinxi.xingbie,
				$("#form_updateHuanZhe"));// 性别
		$("#binglihao").val(huanzhexinxi.binglihao);// 病历号
		$("#binglihao").attr("readOnly", "true");
		$("#shengri").val(
				formatDate(huanzhexinxi.shengri.time));// 出生日期
		$("#diqu").val(huanzhexinxi.diqu);// 所属地区
		$("#shouji").val(huanzhexinxi.shouji);// 手机
		utilTool().radioSelect('yibao', huanzhexinxi.yibao,
				$("#form_updateHuanZhe"));// 是否医保
		if (huanzhexinxi.yibao) {
			$("#ybh").html("<span>" + "医保号" + "：</span>");
			$("#ybhtxt")
					.html(
							"<input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='yibaohao' name='yibaohao'>");
			$("#yibaohao").val(huanzhexinxi.yibaohao);
		} else {
			$("#ybh").html("");
			$("#ybhtxt").html("");
		}
		if(huanzhexinxi.zcrq)$("#zcrq").val(formatDate(huanzhexinxi.zcrq.time));// 注册日期
		$("#qq").val(huanzhexinxi.qq);
		$("#dwdh").val(huanzhexinxi.dwdh);// 单位电话
		$("#gzdw").val(huanzhexinxi.gzdw);// 工作单位
		$("#dwdz").val(huanzhexinxi.dwdz);// 单位地址
		$("#dwyb").val(huanzhexinxi.dwyb);// 单位邮编
		$("#sfzh").val(huanzhexinxi.sfzh);// 身份证号
		$("#jtdz").val(huanzhexinxi.jtdz);// 家庭地址
		
		$("#youbian").val(huanzhexinxi.youbian);// 邮编
		$("#dianhua").val(huanzhexinxi.dianhua);// 固定电话
		$("#hzlxr").val(huanzhexinxi.hzlxr);// 家属
		$("#hzlxrdh").val(huanzhexinxi.hzlxrdh);// 患者联系人电话紧急电话
		utilTool().radioSelect('laiyuan', huanzhexinxi.laiyuan,
				$("#form_updateHuanZhe"));// 患者来源
		$("#beizhu").val(huanzhexinxi.beizhu);// 备注
		// 患者头像赋值
		var imgpath = "/huanzhe_photos/pople.png";
		imgpath = (huanzhexinxi.photourl == null || huanzhexinxi.photourl == "") ? imgpath
				: huanzhexinxi.photourl;
		$("#imgPhoto").attr("src", contextPath + imgpath);
		$("#photourl").val(huanzhexinxi.photourl);// 头像路径隐藏域

		// 患者头像赋值
	}
};
// 患者信息删除(整理)
function delHandler() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要删除的患者");
		return;
	}
	$.oimsConfirm({
		strTitle : "确认删除该患者信息",
		remove_length : true
	}, doDelHandler);
};

// 执行患者信息删除操作
function doDelHandler() {
	var dataObjects = getCheckBoxValue();
	// 验证begin

	// 验证end
	var url_delHuanZhe = "/publish/huanZheXinXi/delHuanZhe.htm";
	var data_delHuanZhe = getJSONData(url_delHuanZhe, {
		id : dataObjects[0].id,
		tag : Math.random()
	}, "post");
	if (data_delHuanZhe.state)
		$.oimsSucc(data_delHuanZhe.message, function() {
			seniorSearchSubmit_hz_luke();
			removeDiv_openWin();
		});
	else
		$.oimsError("患者信息删除失败", function() {
			seniorSearchSubmit_hz_luke();
			removeDiv_openWin();
		});

}
// 患者就诊情况查看(整理)
function jzqkHandler() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要查看就诊情况的患者");
		return;
	}
	var url_findJiuZhenByHuanZhe = "/publish/huanZheXinXi/findJiuZhenByHuanZhe.htm";
	var data_findJiuZhenByHuanZhe = getJSONData(url_findJiuZhenByHuanZhe, {
		hzid : dataObjects[0].id,
		tag : Math.random()
	}, "post");
	if (data_findJiuZhenByHuanZhe.state
			&& data_findJiuZhenByHuanZhe.obj != null) {
		var Jiuzhen = data_findJiuZhenByHuanZhe.obj;
		var parm = {
			SN : 1,
			birthday : {},
			caozuoren : "",
			caozuotime : "",
			cztime : "",
			fzys : "",
			fzysname : "",
			haoma : "",
			id : "",
			mobile : "",
			name : "",
			patientId : "",
			photo : "",
			sex : "",
			state : "",
			zhenbie : ""
		};
		parm.birthday.time = Date.parse(new utilTool()
				.strToDate(Jiuzhen.shengri));
		$.extend(parm, Jiuzhen);
		$.extend(parm, dataObjects[0]);
		parm.patientId = parm.id;
		parm.cztime = time(Jiuzhen.caozuoTime).format_yyyy_mm_dd_hms();
		parm.mobile = parm.shouji;
		parm.name = parm.xingming;
		parm.photo = parm.photourl;
		parm.sex = parm.xingbie;
		//loadJsAndCss_YiSheng();
		importJS('/js/manager/doctor/doctorManagerList.js');
		showCurrentPatient(parm);
		//showHuanZheGuanLi(parm);
	} else
		$.oimsAlert("该患者不存在就诊记录");
};

// 患者数据导出操作
function exportHandler() {
	// var pt = proTool();
	// var ar = getCheckBoxValue();
	// var ids = "";
	// $.each(ar, function(i, v) {
	// if (!v)
	// return false;
	// ids += (ids == "") ? v.id : "," + v.id;
	// });
	// pt.proDown(contextPath + "/publish/huanZheXinXi/findHuanZhe4Export.htm",
	// {
	// where : ids
	// });
};

function showHuanZheXinXiList(btns) {
	pageTitle = "患者信息列表";
	init();
	var rt = "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
			+ "<tr>"
			+ "<td width='23%' class='leftalign'><input type='text' size='28' value='"
			+ "请输入病历号或患者姓名"
			+ "' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" id='search_binglihao_xingming' class='blurview' name='search_binglihao_xingming'></td>"
			+ "<td width='9%'><a href='javascript:seniorSearchSubmit_hz_luke();' class='search'>"
			+ "查询"
			+ "</a></td>"
			+ "<td width='9%'><a href='javascript:huanZheExSearch_luke();' class='advsearch'>"
			+ "高级查询"
			+ "</a></td>"
			+ "<td width='9%'><a href='javascript:seniorSearchSubmit_hz_luke();' class='advsearch'>"
			+ "同步his"
			+ "</a></td>"
			+ "<td width='45%'>"
			+ "<div class='btn'>"
			+ "<a onclick='return false;' href='javascript:fenzhenHandler();'><span class='edita' ></span>"
			+ "分诊"
			+ "</a>" // 分诊
			+ "<a onclick='return false;' href='javascript:addHandler();'><span class='adda' ></span>"
			+ "新增"
			+ "</a>"// 新增
			+ "<a onclick='return false;' href='javascript:updateHandler();'><span class='edita'></span>"
			+ "修改"
			+ "</a>"// 修改
			+ "<a onclick='return false;' href='javascript:delHandler();'><span class='dela' ></span>"
			+ "删除"
			+ "</a>  "// 删除
			+ "<a onclick='return false;' href='javascript:exportHandler();'><span class='exporta' ></span>"
			+ "导出"
			+ "</a>    "// 导出
		//	+ "<a onclick='return false;' href='javascript:jzqkHandler();' class='four' ><span class='seedoctora'></span>"
		//	+ "就诊情况" + "</a>           "// 就诊情况
			+ "</div>" + "</td>" + "</tr>" + "</table>";
	$("<div/>").attr("id", "advquery").addClass("advquery").appendTo("#right");
	$(rt).appendTo("#advquery");
	$("#search_binglihao_xingming").click(function() {
		clearInitQuery(this);
	});
	$("#search_binglihao_xingming").blur(function() {
		if (this.value == "") {
			$("#search_binglihao_xingming").val("请输入病历号或患者姓名");
			$("#search_binglihao_xingming").addClass("blurview");
		}
	});
	$("#search_binglihao_xingming").bind("keyup", function(e) {
		if (e.which == 13) {
			seniorSearchSubmit_hz_luke();
		}
	});
	btnProwerConfig(btns);
	showHzList_luke();
	// addIdCardHidden();
};

// 分诊操作
function fenzhenHandler() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要操作的患者");
		return;
	}
	var view = addDialog('fenzhen');
	var form_updateHuanZhe = $("<form/>").attr("id", "form_updateHuanZhe")
			.attr("action",
					contextPath + "/publish/huanZheXinXi/updateHuanZhe.htm")
			.attr("enctype", "multipart/form-data").attr("method", "post");
	$(view).appendTo(form_updateHuanZhe);
	var div_openbutton = $("<div/>").attr("id", "div_openbutton").attr("class",
			"openbutton").appendTo(form_updateHuanZhe);// 底部div
	var div_openbutton_html = "<a href='javascript:fenzhenHuanZhe();'><span class='advsumit'></span>"
			+ "提交"
			+ "</a> <a href='javascript:FillData();'><span class='advreset'></span>"
			+ "重置" + "</a>";
	$(div_openbutton_html).appendTo(div_openbutton);
	$(form_updateHuanZhe).oimsDialog({
		icon : "edit",
		title : "修改",
		width : 700,
		height : 450,
		drag : false,
		locked : true,
		winType : 4,
		button : null
	});
	calendarFun("shengri");// 出生日期
	$("#zcrq").val(getNow().substring(0, 10));// 注册日期
	$("#file_C").css({
		"width" : "200px",
		"margin-left" : "14px"
	});
	$.customfile('fieldbutton', 'filed', 'fieldtext', "openWin");// 图像浏览上传

	// 接诊医生下拉框赋值begin
	var data_getKaiDanDoctorByQuanxian = getJSONData(
			"/publish/yuangong/getKaiDanDoctorByQuanxian.htm", {
				tag : Math.random()
			}, "post");
	if (data_getKaiDanDoctorByQuanxian.state) {
		var yuangonglist = data_getKaiDanDoctorByQuanxian.obj;
		$.each(yuangonglist,
				function(i, d) {
					$(
							"<option value=\"" + d.gonghao + "\">" + d.xingming
									+ "</option>").appendTo("#fzys");
				});
	}
	// 接诊医生下拉框赋值end
	FillData();// 页面赋值
};

// 显示患者列表(整理)
function showHzList_luke() {
	listFactor = {
		listObj : [ {
			title : "序号",
			key : "paihao"
		}, {
			title : "病历号",
			key : "binglihao"
		}, {
			title : "姓名",
			key : "xingming"
		}, {
			title : "性别",
			key : "xingbie",
			func : function(value) {
				if (value)
					return "男";
				else
					return "女";
			}
		}, {
			title : "出生日期",
			key : "shengri"
		}, {
			title : "身份证号",
			key : "sfzh"
		}, {
			title : "手机号码",
			key : "shouji"
		}, {
			title : "工作单位",
			key : "gzdw"
		}, {
			title : "注册时间",
			key : "zcrq"
		}, {
			title : "所属地区",
			key : "diqu"
		} ],
		url : contextPath + "/publish/huanZheXinXi/findHuanZheList.htm",
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			tag : Math.random()
		}
	};
	$("#pageList").remove();
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#right");
	$(div_list).createPageList(listFactor);
};

// 创建患者信息表格
function addDialog(state) {
	var rt = "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
			+ "<tr>"
			+ "<td width='19%' align='center' rowspan='5'><div class='pople' ><img id='imgPhoto' onload='loadImge(this)'  src="
			+ contextPath
			+ "/huanzhe_photos/pople.png></div></td>"
			+ "<td width='11%' align='right' nowrap='nowrap'>"
			+ "患者姓名"
			+ "：</td>"
			+ "<td width='28%' align='left'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur';checkIsStrEmpty(this);\" id='xingming' name='xingming'></td>"
			+ "<td width='2%'><span class='required'>*</span></td>"
			+ "<td width='12%' align='right' nowrap='nowrap'>"
			+ "患者性别"
			+ "：</td>"
			+ "<td width='30%' align='left'>"
			+ "<input type='radio' checked='checked' value='1' id='idMan' name='xingbie' class = 'c_r_class'>"
			+ "男"
			+ "&nbsp;&nbsp;&nbsp;&nbsp;"
			+ "<input type='radio' value='0' id='idWoman' name='xingbie' class = 'c_r_class' >"
			+ "女"
			+ "</td>"
			+ "<td width='2%'></td>"
			+ "</tr>"
			+ "  <tr>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "病历号"
			+ "：</td>"
			+ "<td align='left'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur';checkIsStrEmpty(this);\" id='binglihao' name='binglihao'></td>"
			+ "<td width='2%'><span class='required'>*</span></td>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "出生日期"
			+ "：</td>"
			+ "<td align='left'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur';checkIsStrEmpty(this);\" id='shengri' name='shengri'></td>"
			+ "<td width='2%'><span class='required'>*</span></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td height='25' align='right' nowrap='nowrap'>"
			+ "所属地区"
			+ "：</td>"
			+ "<td align='left' id='ssdq_c'></td>"
			+ "<td width='1%'><span class='required'></span></td>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "手机号码"
			+ "：</td>"
			+ "<td align='left'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur';checkIsPhone(this);\" id='shouji' name='shouji' maxlength=11></td>"
			+ "<td width='1%'><span class='required'></span></td>"
			+ "</tr>"
			+ " <tr>"
			+ "<td height='25' align='right' nowrap='nowrap'>"
			+ "是否医保"
			+ "：</td>"
			+ "<td align='left'>"
			+ "<input type='radio' value='1' id='idSYiBao' class = 'c_r_class' name='yibao'  onclick='showYiBaoText(this);'/>"
			+ "有"
			+ "&nbsp;&nbsp;&nbsp;&nbsp;"
			+ "<input type='radio' value='0' id='idSYiBao' class = 'c_r_class' name='yibao' onclick='showYiBaoText(this);' checked/>"
			+ "无"
			+ "</td>"
			+ "<td width='2%'></td>"
			+ "<td collspan=2 id='ybh'></td>"
			+ "<td align='left' id='ybhtxt'></td>"
			+ "<td width='2%'></td>"
			+ "</tr>"
			+ " <tr>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "注册时间"
			+ "：</td>"
			+ "<td align='left'><input type='text' class='blur' readonly='readonly' id='zcrq' name='zcrq'></td>"
			+ "<td width='1%'><span class='required'>*</span></td>"
			/*+ "<td align='right' nowrap='nowrap'></td>"
			+ "<td align='left'></td>"
			+ "<td width='2%'></td>"*/
			+ "<td>QQ号</td>"
			+ "<td><input type='text' id='qq' name='qq'/></td>"
			+ "</tr>"
			+ "</table>";
	rt += "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
			+ "<tr>"
			+ "<td width='29%' colspan=2 nowrap='nowrap'>"
			+ "<div id='file_C'>"
			+ "<div class='searchfile'>"
			+ "<input type='file' name='oimsUpload' id ='upload_el' onchange='photoUpload(this)' class='filed'/>"
			+ "<div class='fieldstyle'><input type='text' name='txt_fieldstyle' id='txt_fieldstyle' class='fieldtext' style='display:hidden'/></div>"
			+ "<div class='buttonstyle'><input type='button'  id='btn_yuyan' class='fieldbutton'/></div>"
			+ "</div>" + "</div>" + "</td>";
	if (state == 'add') {
		rt += "<td width='11%' align='right' nowrap='nowrap'>接诊医生：</td>"
				+ "<td width='30%'>" + "<select id='fzys' name='fzys'>"
				+ "<option value=''></option>" + "</select>" + "</td>";
	}

	rt += "<td width='11%' align='right' nowrap='nowrap'>单位电话："
			+ "</td>"
			+ "<td width='17%'><input type='text' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='dwdh' name='dwdh'/></td>"
			+ "<td width='2%'></td>" + "</tr></table>";
	rt += "<input type='hidden'  name='photourl' id='photourl' />";
	rt += "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
			+ "<tr>"
			+ "<td width='11%' align='right' nowrap='nowrap'>"
			+ "工作单位"
			+ "：</td>"
			+ "<td width='18%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='gzdw' name='gzdw'></td>"
			+ "<td width='11%' align='right' nowrap='nowrap'>"
			+ "单位地址"
			+ "：</td>"
			+ "<td width='32%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='dwdz' name='dwdz'></td>"
			+ "<td width='11%' align='right' nowrap='nowrap'>"
			+ "单位邮编"
			+ "：</td>"
			+ "<td width='17%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur';checkIsPost(this);\" id='dwyb' name='dwyb'></td>"
			+ "<td width='2%'></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "身份证号"
			+ "：</td>"
			+ "<td><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='sfzh' name='sfzh'></td>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "家庭地址"
			+ "：</td>"
			+ "<td><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='jtdz' name='jtdz'></td>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "邮政编码"
			+ "：</td>"
			+ "<td><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur';checkIsPost(this);\" id='youbian' name='youbian'></td>"
			+ "<td width='2%'></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "固定电话"
			+ "：</td>"
			+ "<td><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur';checkIsTel(this);\" id='dianhua' name='dianhua'></td>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "家属"
			+ "：</td>"
			+ "<td><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='hzlxr' name='hzlxr'></td>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "紧急电话"
			+ "：</td>"
			+ "<td><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur';checkIsTel(this);\" id='hzlxrdh' name='hzlxrdh'></td>"
			+ "<td width='2%'></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "患者来源"
			+ "：</td>"
			+ "<td colspan=6 align='left' id='tdlaiyuan'>"
			+ "</td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right' nowrap='nowrap'>"
			+ "备注说明"
			+ "：</td>"
			+ "<td colspan=6 align='left'>"
			+ "<input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='beizhu' name='beizhu'>"
			+ "</td>" + "</tr>" + "<input type='hidden' name='id' id='id' />";

	if (state == 'fenzhen') {
		var select = "<select id='fzys' name='fzys'>"
				+ "<option value=''></option>" + "</select>";
		rt += "<tr>";
		rt += "<td>接诊医生：</td>";
		rt += "<td>" + select + "</td>";
		rt += "</tr>";
	}
	rt += "</table>";

	var t = $(rt);
	// 患者来源信息动态添加
	var list = getJSONData("/publish/category/findCategorysByFatherId.htm", {
		fatherid : oimsCategory.HUANZHE_RESOURCES,
		tag : Math.random()
	}, "post");
	var rv = "";
	$.each(list.obj, function(i, v) {
		var ipt = "<input type='radio' value='" + v.categoryid
				+ "' name='laiyuan' class = 'c_r_class' >" + v.category
				+ "&nbsp;&nbsp;&nbsp;&nbsp;";
		if (i == 0)
			rv = v.categoryid;
		$("#tdlaiyuan", t).append(ipt);
	});
	utilTool().radioSelect("laiyuan", rv, t);
	// 患者来源信息动态添加
	// 地区动态
//	var dq = $.auto({
//		eff : true,
//		id : "diqu",
//		name : 'diqu',
//		url : "diqu/findAllDiqu.htm",
//		chg : {
//			id : "id",
//			text : "name",
//			index1 : "index1",
//			index2 : "index2"
//		}
//	});
//	$("#ssdq_c", t).append(dq);
	// 地区动态

	// // 添加flash照相功能
	// $("#imgPhoto", t).click(function(im) {
	// showTestButton();
	// showSWF();
	// });
	return t;

};

// 查询表格(整理)
function findEx_hz() {
	var rt = "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
			+ " <tr>"
			+ "<td width='7%' nowrap='nowrap' align='right'>"
			+ "患者姓名"
			+ "：</td>"
			+ "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_xingming' name='search_xingming'>"
			+ "</td>"
			+ "<td width='7%' nowrap='nowrap' align='right'>"
			+ "患者性别"
			+ "：</td>"
			+ "<td width='18%'><input type='checkbox' name='search_xingbie' class = 'c_r_class' id='search_xingbie' value='1'/>"
			+ "男"
			+ "<input type='checkbox' name='search_xingbie' class = 'c_r_class' id='search_xingbie' value='0'/>"
			+ "女"
			+ "</td>"
			+ "<td width='7%' nowrap='nowrap' align='right'> "
			//+ "所属地区："
			+ "</td>"
			+ "<td width='15%' id='search_ssdq_c'></td>"
			+ "<td  nowrap='' align='right'>"
			+ "注册时间"
			+ "：</td>"
			+ "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_zcrqStart' name='search_zcrqStart'>"
			+ "</td>"
			+ "<td  nowrap='nowrap' align='right'>"
			+ "至"
			+ "</td>"
			+ "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_zcrqEnd' name='search_zcrqEnd'>"
			+ "</td>"
			+ "</tr>"
			+ " <tr>"
			+ "<td width='7%' nowrap='nowrap' align='right'>"
			+ "手机号码"
			+ "：</td>"
			+ "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_shouji' name='search_shouji'>"
			+ "</td>"
			+ "<td width='7%' nowrap='nowrap' align='right'>"
			+ "是否医保"
			+ "：</td>"
			+ "<td width='18%'><input type='checkbox' name='search_yibao' id='search_idSYiBao' class = 'c_r_class' value='1'/>"
			+ "是"
			+ "<input type='checkbox' name='search_yibao' id='search_idNYiBao' class = 'c_r_class' value='0'/>"
			+ "否"
			+ "</td>"
			+ "<td width='7%' nowrap='nowrap' align='right'> "
			+ "联系电话"
			+ "：</td>"
			+ "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_dianhua' name='search_dianhua'></td>"
			+ "<td  nowrap='' align='right'>"
			+ "患者年龄"
			+ "：</td>"
			+ "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_shengriStart' name='search_shengriStart'>"
			+ "</td>"
			+ "<td  nowrap='nowrap' align='right'>"
			+ "至"
			+ "</td>"
			+ "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_shengriEnd' name='search_shengriEnd'>"
			+ "</td>"
			+ "</tr>"
			+ " <tr>"
			+ "<td width='7%' nowrap='nowrap' align='right'>"
			+ "单位电话"
			+ "：</td>"
			+ "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_dwdh' name='search_dwdh'>"
			+ "</td>"
			+ "<td width='7%' nowrap='nowrap' align='right'>"
			+ "家属"
			+ "：</td>"
			+ "<td width='18%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_hzlxr' name='search_hzlxr'></td>"
			+ "<td width='7%' nowrap='nowrap' align='right'> "
			+ "紧急电话"
			+ "：</td>"
			+ "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_hzlxrdh' name='search_hzlxrdh'></td>"
			+ "<td  nowrap='' align='right'>"
			+ "身份证号"
			+ "：</td>"
			+ "<td colspan=3><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_sfzh' name='search_sfzh'>"
			+ "</td>"
			+ "</tr>"
			+ " <tr>"
			+ "<td width='7%' nowrap='nowrap' align='right'>"
			+ "患者来源"
			+ "：</td>"
			+ "<td align='left' colspan=4 id='search_laiyuans'></td>"
			+ "<td  nowrap='nowrap' align='right'>"
			+ "家庭地址"
			+ "：</td>"
			+ "<td colspan=4><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_jtdz' name='search_jtdz'>"
			+ "</td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td nowrap='nowrap' aling='right'>"
			+ "病种分类"
			+ "：</td>"
			+ "<td width='15%'><select id='search_bingZhongId'><option value=''></option></select></td>"
			+ "<td  nowrap='' align='right'>"
			+ "就诊记录"
			+ "：</td>"
			+ "<td colspan=7><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" name='search_bingLiKey' id='search_bingLiKey'/>"
			+ "</tr>"
			+ "</table>"
			+ " <div class='avdopenbutton' >"
			+ " <a href='javascript:seniorSearchSubmit_hz_luke();'><span class='advsumit'></span>"
			+ "提交"
			+ "</a>"
			+ " <a href='javascript:seniorSearchReset();'><span class='advreset'></span>"
			+ "重置" + "</a>" + "<a id = 'closeId'><span class='close' ></span>"
			+ "关闭" + "</a>" + " </div> ";
	var table = $(rt);
	// 患者来源赋值
	var list = getJSONData("/publish/category/findCategorysByFatherId.htm", {
		fatherid : oimsCategory.HUANZHE_RESOURCES,
		tag : Math.random()
	}, "post");
	$.each(list.obj, function(i, v) {
		var ipt = "<input type='checkbox' value='" + v.categoryid
				+ "' name='search_laiyuan' class = 'c_r_class' >" + "&nbsp;"
				+ v.category + "&nbsp;&nbsp;";
		$("#search_laiyuans", table).append(ipt);
	});
	// 患者来源赋值

	// 病种分类赋值
	list = getJSONData("/publish/category/findCategorysByFatherId.htm", {
		fatherid : oimsCategory.BINGZHONG,
		tag : Math.random()
	}, "post");

	$.each(list.obj, function(i, v) {
		var ipt = $("<option>").val(v.categoryid).text(v.category);
		$("#bingZhongId", table).append(ipt);
	});
	// 病种分类赋值

	// 地区赋值begin
/*	var dq = $.auto({
		id : "search_diqu",
		name : 'search_diqu',
		url : "diqu/findAllDiqu.htm",
		chg : {
			id : "id",
			text : "name",
			index1 : "index1",
			index2 : "index2"
		}
	});*/
	// 地区赋值begin

//	$("#search_ssdq_c", table).append(dq);
	calendarFun("search_zcrqStart");// 开始注册日期
	calendarFun("search_zcrqEnd");// 结束注册日期
	return table;
};

// 高级查询的重置方法(整理)
function seniorSearchReset() {
	$("#search_xingming").val("");// 患者姓名
	$("[name = search_xingbie]:checkbox").attr("checked", false);// 性别
	$("#search_diqu").val("");// 所属地区
	$("#search_zcrqStart").val("");// 注册时间开始
	$("#search_zcrqEnd").val("");// 注册时间结束
	$("#search_shouji").val("");// 手机号码
	$("[name = search_yibao]:checkbox").attr("checked", false);// 医保
	$("#search_dianhua").val("");// 联系电话
	$("#search_shengriStart").val("");// 患者年龄开始
	$("#search_shengriEnd").val("");// 患者年龄结束
	$("#search_dwdh").val("");// 单位电话
	$("#search_hzlxr").val("");// 患者联系人家属
	$("#search_hzlxrdh").val("");// 患者联系人电话紧急电话
	$("#search_sfzh").val("");// 身份证号码
	$("[name = search_laiyuan]:checkbox").attr("checked", false);// 患者来源
	$("#search_jtdz").val("");// 家庭地址
	$("#search_bingZhongId").val("");// 病种分类
	$("#search_bingLiKey").val("");// 就诊记录
}

// 单点击存在医保显示医保号的录入标签
function showYiBaoText(field) {
	var yibaoFlag = field.value;
	if (yibaoFlag == 1) {
		$("#ybh").html("<span>" + "医保号" + "：</span>");
		$("#ybhtxt")
				.html(
						"<input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='yibaohao' name='yibaohao'>");
	} else {
		$("#ybh").text("");
		$("#ybhtxt").html("");
	}
}

// 患者头像上传操作(整理)
function photoUpload(e) {
	var file = $("#upload_el");
	var url = contextPath + "/publish/huanZheXinXi/photoUpload.htm";
	var ff = $("<form action='" + url + "' id='tempForm' />").attr("method",
			"POST").attr("enctype", "multipart/form-data");
	file.appendTo(ff);
	ff.appendTo("body");
	ff.hide();
	ff.ajaxForm({
		dataType : "json",
		iframe : true,
		beforeSend : function() {
		},
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
			var data = eval("(" + data_string + ")");
			var data_state = data.state;
			var data_obj = data.obj;
			if (data_state) {
				if (data_obj != "") {
					$("#photourl").val(data_obj);
					$("#imgPhoto").attr("src", contextPath + data_obj);
				}
			} else
				$.oimsAlert("图片上传失败", null);
			$("#file_C").append(file);
			ff.remove();
		}
	});
	ff.submit();
};

// 加载图片
function loadImge(el) {
	$("#imgPhoto").width("auto").height("auto");
	var w = $("#imgPhoto").width();
	var h = $("#imgPhoto").height();
	var bl = w / 104 > h / 97 ? w / 104 : h / 97;
	$("#imgPhoto").width(w / bl);
	$("#imgPhoto").height(h / bl);
};

// 加载身份证读卡器相关资料
function addIdCardHidden() {
	var readIdentityCardHtml = "<object classid=\"clsid:E6E0A751-541A-4855-9A8D-35EB7122C950\" id=\"SynIDCard1\" codeBase=\""
			+ contextPath
			+ "/SynIDCard.CAB#version=1,0,0,1\" width=\"0\" height=\"0\">";
	readIdentityCardHtml += "<param name=\"_Version\" value=\"65536\">";
	readIdentityCardHtml += "<param name=\"_ExtentX\" value=\"635\">";
	readIdentityCardHtml += "<param name=\"_ExtentY\" value=\"582\">";
	readIdentityCardHtml += "<param name=\"_StockProps\" value=\"0\">";
	readIdentityCardHtml += "</object>";
	$(readIdentityCardHtml).appendTo("#right");

};
// 读取身份证相关信息
function readIdCard() {
	SynIDCard1.Port = 1001;
	SynIDCard1.Init();
	var readCard = SynIDCard1.ReadCard();
	if (readCard.indexOf("成功") > 0) {
		$("#xingming").val(SynIDCard1.NameL);
		$("#shengri").val(SynIDCard1.BornL);
		if (SynIDCard1.Sex == 1) {// 男
			$("#idMan").attr("checked", "checked");
		} else if (SynIDCard1.Sex == 2) {// 女
			$("#idWoman").attr("checked", "checked");
		}
		$("#diqu").val(SynIDCard1.Address);
		$("#sfzh").val(SynIDCard1.CardNo);

		$("#imgPhoto").attr("src", "file:///" + SynIDCard1.PhotoName);
	} else {
		alert(SynIDCard1.ReadCard());
	}
	return false;
};

