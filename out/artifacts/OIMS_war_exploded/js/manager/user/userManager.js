//加载该模块所需要的插件
function loadJsAndCss_User() {
	loadWelcomePage();
	importJS("/js/oimsUi.js");
};
var language_user = {
	QiYongUser : 308,// 启用用户列表
	Choice : 213,// 选择
	Seria : 214,// 序号
	UserName : 360,// 用户名
	GongHao : 361,// 工号
	DianZiEmail : 202,// 电子邮件
	Role : 11,// 角色
	State : 364,// 状态
	InputUidOrGonghao : 356,// 请输入用户名或工号
	Forbid : 46,// 禁用
	QuanXian : 13,// 权限
	PWReset : 12,// 密码重置

	Uname : 436,// 用户名称
	UPassword : 437,// 使用密码
	OkPassword : 438,// 确认密码
	URole : 439,// 用户角色
	UGonghao : 440,// 用户工号
	addYuanGongInfo : 441,// 添加员工信息
	YgName : 193,// 员工姓名
	Birth : 195,// 出生日期
	UYgSex : 442,// 员工性别
	MobilePhone : 200,// 手机号码
	BelongsDepart : 191,// 所属科室
	Male : 204,// 男
	Female : 205,// 女
	UYgZhiWu : 443,// 员工职务
	TeleNum : 162,// 联系电话
	SsDq : 389,// 所属地区
	Jtdz : 206,// 家庭地址
	GrJj : 207,// 个人简介
	UBGS : 444,// 办公室
	Sfzh : 385,// 身份证号

	inPassword : 445,// 输入密码
	Start : 31,// 启用
	JingYongUser : 309,// 禁用用户列表

	InsertOK_Alert : 223,// 添加成功!
	InsertFail_Alert : 224,// 添加失败
	UpdateOK_Alert : 225,// 修改成功
	UpdateFail_Alert : 226,// 修改失败
	DelOK_Alert : 227,// 删除成功

	userNameIsNotNull : 446,// 用户名不能为空!
	passwordIsNotNull : 447,// 密码不能为空!
	InputNotSame_Alert : 228,// 两次输入密码不一致！
	ghIsNotNull : 448,// 工号不能为空！
	jiaoseIsNotNull : 449,// 用户角色未选择!
	EmailFormatError_Alert : 220,// 邮箱格式不对！
	MobilePhoneFormatError_Alert : 219,// 员工手机格式不对
	ygNameIsNotNull : 450,// 员工姓名不能为空
	birthIsNotNull : 451,// 出生日期不能为空
	ssksIsNotNull : 452,// 员工所属科室未选择
	needMostRole : 453,// 操作用户角色权限级别超出登录用户
	setRole : 454,// 权限配置
	IsConfirmProhibitUser : 136,// 是否确认禁用所选用户？
	IsConfirmStartUser : 137,// 是否确认启用所选用户？
	IsConfimDelUser : 455,// 是否确认删除用户信息？
	updateJiaoSe : 456,// 角色修改
	UYgInfo : 477
// 员工详细信息
};

// 角色信息修改表格 返回表格对象(整理)
function jiaoseTab() {
	var v = "<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody>"
			+ "  <tr>"
			+ "    <td align=\"right\" nowrap=\"nowrap\">"
			+ "用户名"
			+ "：</td>"
			+ "    <td><input readonly=\"true\" name=\"uid\" id=\"uid\" onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class=\"blur\" type=\"text\"></td>"
			+ "    <td align=\"right\" nowrap=\"nowrap\">"
			+ "角色"
			+ "：</td>"
			+ "    <td width='40%'><select id=\"jiaose\" name=\"jiaose\" onblur=\"this.className='blur'\"  class=\"blur\" /></td>"
			+ "  </tr>" + "</tbody></table>";
	return $(v);
};

// 创建用户基本信息表格(整理)
function userAddTab() {
	var v = " <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">  "
			+ "<tbody>"
			+ "  <tr>"
			+ "    <td align=\"right\" nowrap=\"nowrap\">"
			+ "用户名称"
			+ "：</td>"
			+ "    <td><input name=\"uid\" id=\"uid\" onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class=\"blur\" type=\"text\"></td>"
			+ "    <td width='2%'><span class='required'>*</span></td>"
			+ "    <td align=\"right\" nowrap=\"nowrap\">"
			+ "使用密码"
			+ "：</td>"
			+ "    <td><input type='password' name=\"password\" id=\"password\" onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class=\"blur\" type=\"text\"></td>"
			+ "    <td width='2%'><span class='required'>*</span></td>"
			+ "    <td align=\"right\" nowrap=\"nowrap\">"
			+ "确认密码"
			+ "：</td>"
			+ "    <td><input type='password' name=\"password2\" id=\"password2\" onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class=\"blur\" type=\"text\"></td>"
			+ "    <td width='2%'><span class='required'>*</span></td>"
			+ "  </tr>"
			+ "  <tr>"
			+ "    <td align=\"right\" nowrap=\"nowrap\">"
			+ "用户工号"
			+ "：</td>"
			+ "    <td><input name=\"gonghao\" id=\"gonghao\" onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class=\"blur\" type=\"text\"></td>"
			+ "    <td width='2%'><span class='required'>*</span></td>"
			+ "    <td align=\"right\" nowrap=\"nowrap\">"
			+ "电子邮件"
			+ "：</td>"
			+ "    <td><input name=\"email\" id=\"email\" onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class=\"blur\" type=\"text\"></td>"
			+ "    <td width='2%'></td>"
			+ "    <td align=\"right\" nowrap=\"nowrap\">"
			+ "用户角色"
			+ "：</td>"
			+ "    <td><select id=\"jiaose\" name=\"jiaose\" onblur=\"this.className='blur'\"  class=\"blur\" >"
			+ "    <option value=''></option>"
			+ "  </select></td>"
			+ "    <td width='2%'><span class='required'>*</span></td>"
			+ "  </tr>" + "</tbody>" + "</table >";

	return $(v);
};
// 员工基本信息表格返回创建的表格对象(整理)
function yuangongAddTab() {
	var v = "<div class='yginfo'>  <fieldset class=\"fieldsetsytle\">"
			+ "       <legend><input type='checkbox' id='ygdetail' name='ygdetail'/>"
			+ "员工详细信息"
			+ "</legend>"
			+ "  <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">"
			+ "  <tbody><tr>"
			+ "    <td nowrap=\"nowrap\" align=\"right\">"
			+ "员工姓名"
			+ "：</td>"
			+ "    <td width=\"15%\"><input name=\"xingming\" id=\"xingming\" onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class=\"blur\" type=\"text\"></td>"
			+ "    <td width='2%'><span class='required'>*</span></td>"
			+ "    <td nowrap=\"nowrap\" align=\"right\">"
			+ "出生日期"
			+ "：</td>"
			+ "    <td width=\"12%\"><input name=\"shengri\" id=\"shengri\" onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class=\"blur\" type=\"text\"></td>"
			+ "    <td width='2%'><span class='required'>*</span></td>"
			+ "    <td nowrap=\"nowrap\" align=\"right\">"
			+ "员工性别"
			+ "：</td>"
			+ "    <td><input name=\"xingbie\"  value=\"1\" type=\"radio\" checked=\"checked\" >"
			+ "男"
			+ ""
			+ "         <input name=\"xingbie\" id=\"xingbie\" value=\"0\"  type=\"radio\">"
			+ "女"
			+ ""
			+ "    <td nowrap=\"nowrap\" align=\"right\">"
			+ "手机号"
			+ "：</td>"
			+ "    <td><input name=\"shouji\" id=\"shouji\" maxlength='11' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class=\"blur\" type=\"text\">"
			+ "    </td>"
			+ "  </tr>"
			+ "  <tr>"
			+ "    <td nowrap=\"nowrap\" align=\"right\">"
			+ "所属科室"
			+ "：</td>"
			+ "    <td><select name=\"bumenId\" id=\"bumenId\"  onblur=\"this.className='blur'\">"
			+ "    <option value=''></option>"
			+ "      </select></td>"
			+ "    <td width='2%'><span class='required'>*</span></td>"
			+ "    <td nowrap=\"nowrap\" align=\"right\">"
			+ "办公室"
			+ "：</td>"
			+ "    <td><select name=\"bgsId\" id=\"bgs_id\"  onblur=\"this.className='blur'\">"
			+ "    <option value=''></option>"
			+ "   </select></td>"
			+ "    <td width='2%'><span class='required'>*</span></td>"
			+ "    <td align=\"right\">"
			+ "电子邮件"
			+ "：</td>"
			+ "    <td><input name=\"y_email\" id=\"y_email\" onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class=\"blur\" type=\"text\"></td>"
			+ "    <td nowrap=\"nowrap\" align=\"right\">"
			+ "身份证号"
			+ "：</td>"
			+ "    <td><input name='sfzh' id='sfzh' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class=\"blur\" type=\"text\"></td>"
			+ "  </tr>"
			+ "  <tr>"
			+ "    <td align=\"right\">"
			+ "员工职务"
			+ "：</td>"
			+ "    <td><select name=\"zhiwu\" id=\"zhiwu\"  onblur=\"this.className='blur'\"><option value=''></option></select>"
			+ "    <td width='2%'></td>"
			+ "    <td align=\"right\">"
			+ "联系电话"
			+ "：</td>"
			+ "    <td><input name=\"dianhua\" id=\"dianhua\" onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class=\"blur\" type=\"text\"></td>"
			+ "    <td width='2%'></td>"
			+ "    <td align=\"right\">"
			+ "所属地区"
			+ "：</td>"
			+ "    <td id='diqu_c'></td>"
			+ "    <td align=\"right\">"
			+ "家庭地址"
			+ "：</td>"
			+ "    <td><input name=\"jtdz\"id=\"jtdz\" onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class=\"blur\" type=\"text\"></td>"
			+ "  </tr>"
			+"<tr><td align=\"right\">"
			+"人员类别"
			+ "：</td>"
			+ "    <td><select name=\"category\" id=\"category\"  onblur=\"this.className='blur'\"><option value=''></option></select>"
			+ "    <td width='2%'><span class='required'>*</span></td>"
			+ "<tr>"
			+ "    <td align=\"right\">"
			+ "个人简介"
			+ "：</td>"
			+ "    <td colspan=\"9\"><textarea name=\"jianjie\" id=\"jianjie\" onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class=\"blur\" id=\"textarea\" cols=\"45\" rows=\"4\"></textarea></td>"
			+ "    </tr>" + "</tbody></table>" + "</fieldset></div>";
	v = $(v);
	var dq = $.auto({
		id : "diqu",
		name : 'diqu',
		url : "diqu/findAllDiqu.htm",
		chg : {
			id : "id",
			text : "name",
			index1 : "index1",
			index2 : "index2"
		}
	});
	$("#diqu_c", v).append(dq);
	return v;
};
// 用户信息修改表格创建返回表格字符串
function userUpdateTab() {
	var v = " <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">  "
			+ "  <tbody>"
			+ "  <tr>"
			+ "    <td align=\"right\" nowrap=\"nowrap\">"
			+ "用户名称"
			+ "：</td>"
			+ "    <td><input name=\"uid\" id=\"uid\" onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class=\"blur\" type=\"text\"></td>"
			+ "    <td width='2%'><span class='required'>*</span></td>"
			+ "	 <td align=\"right\" nowrap=\"nowrap\">"
			+ "用户工号"
			+ "：</td>"
			+ "    <td><input readOnly='true' name=\"gonghao\" id=\"gonghao\" onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class=\"blur\" type=\"text\" ></td>"
			+ "    <td width='2%'><span class='required'>*</span></td>"
			+ "    <td align=\"right\" nowrap=\"nowrap\">"
			+ "电子邮件"
			+ "：</td>"
			+ "    <td><input name=\"email\" id=\"email\" onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class=\"blur\" type=\"text\"></td>"
			+ "    <td align=\"right\" nowrap=\"nowrap\">"
			+ "用户角色"
			+ "：</td>"
			+ "    <td><select id=\"jiaose\" name=\"jiaose\" onblur=\"this.className='blur'\"  class=\"blur\" >"
			+ "    <option value=''></option>"
			+ "  　　</select></td>"
			+ "    <td width='2%'><span class='required'>*</span></td>"
			+ "  </tr>" + "</tbody>" + "</table>";

	return $(v);
};

// 密码重置表格 返回表格对象(整理)
function resetPwdTab() {
	var table = " <table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">"
			+ "  <tr>"
			+ "    <td width=\"28%\" align=\"right\">"
			+ "用户名称"
			+ "：</td>"
			+ "    <td width=\"72%\"><input readOnly=\"true\" type=\"text\" name=\"uid\" id=\"uid\" onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class=\"blur\"  /></td>"
			+ "  </tr>"
			+ "  <tr>"
			+ "    <td align=\"right\">"
			+ "输入密码"
			+ "：</td>"
			+ "    <td><input type=\"password\" name=\"password\" id=\"password\" onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class=\"blur\"  /></td>"
			+ "  </tr>"
			+ "  <tr>"
			+ "    <td align=\"right\">"
			+ "确认密码"
			+ "：</td>"
			+ "    <td><input type=\"password\" name=\"password2\" id=\"password2\" onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class=\"blur\"  /></td>"
			+ "  </tr>" + "</table>";
	return $(table);
};

// 启用用户加载方法（整理）
function qiyongUserlist(btns) {
	pageTitle = "启用用户列表";
	init();
	var table_qiyongUserlist = "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
			+ "<tr>"
			+ "<td width='23%' class='leftalign'><input type='text' size='28' value='"
			+ "请输入用户名或工号"
			+ "' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" id='search_uid_gonghao' class='blurview' name='search_uid_gonghao'></td>"
			+ "<td width='9%'><a href='javascript:searchSumit_user_luke();' class='search'>"
			+ "查询"
			+ "</a></td>"
			+ "<td width='9%'></td>"
			+ "<td width='59%'>"
			+ "<div class='btn'>"
			+ "<a href='javascript:userAddDialog();' onclick='return false;'><span class='adda' ></span>"
			+ "新增"
			+ "</a>"
			+ "<a href='javascript:userUpdateDialog();' onclick='return false;'><span class='edita'></span>"
			+ "修改"
			+ "</a>"
			+ "<a id='a_btn_qyjy' href='javascript:prohibitUser();' onclick='return false;'><span class='prohibita' ></span>"
			+ "禁用"
			+ "</a>"
			+ "<a href='javascript:jiaoseDialog();' onclick='return false;'><span class='rolea' ></span>"
			+ "角色"
			+ "</a>"
			+ "<a href='javascript:quanXianConfigDialog();' onclick='return false;'><span class='authoritya' ></span>"
			+ "权限"
			+ "</a>"
			+ "<a href='javascript:resetPwdDialog();' class='four' onclick='return false;'><span class='passa'></span>"
			+ "密码重置" + "</a> " + "</div>" + "</td>" + "</tr>" + "</table>";
	$("<div/>").attr("id", "advquery").addClass("advquery").appendTo("#right");
	$(table_qiyongUserlist).appendTo("#advquery");
	btnProwerConfig(btns);
	$("#search_uid_gonghao").click(function() {
		clearInitQuery(this);
	});
	$("#search_uid_gonghao").blur(function() {
		if (this.value == "") {
			$("#search_uid_gonghao").val("请输入用户名或工号");
			$("#search_uid_gonghao").addClass("blurview");
		}
	});
	$("#search_uid_gonghao").bind("keyup", function(e) {
		if (e.which == 13) {
			searchSumit_user_luke();
		}
	});
	qiYongList_luke();
};

// 启用用户列表(整理)
function qiYongList_luke() {
	listFactor = {
		listObj : [ {
			title : "序号",
			key : "paihao"
		}, {
			title : "用户名",
			key : "id"
		}, {
			title : "工号",
			key : "gonghao"
		},{
			title : "姓名",
			key : "xingming"
		}, {
			title : "电子邮件",
			key : "email"
		}, {
			title : "角色",
			key : "jiaoseName"
		}, {
			title : "状态",
			key : "qiyong",
			func : function(v) {
				return (v) ? "启用" : "禁用";
			}
		} ],
		url : contextPath + "/publish/user/findAllUserByPage.htm",
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			qiyongflag : 1,
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			tag : Math.random()
		}
	};
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#right");
	$(div_list).createPageList(listFactor);
};

// 禁用用户首次加载的方法(整理)
function jingYongUserlist(btns) {
	pageTitle = "禁用用户列表";
	init();
	var rt = "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
			+ "<tr>"
			+ "<td width='23%' class='leftalign'><input type='text' size='28' value='"
			+ "请输入用户名或工号"
			+ "' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" id='search_uid_gonghao' class='blurview' name='search_uid_gonghao'></td>"
			+ "<td width='9%'><a href='javascript:searchSumit_user_luke();' class='search'>"
			+ "查询"
			+ "</a></td>"
			+ "<td width='9%'></td>"
			+ "<td width='59%'>"
			+ "<div class='btn'>"
			+ "<a href='javascript:qiyongUser();' onclick='return false;'><span class='starta' ></span>"
			+ "启用"
			+ "</a>"
			+ "<a href='javascript:deleteUser();' onclick='return false;'><span class='dela' ></span>"
			+ "删除" + "</a>  " + "</div>" + "</td>" + "</tr>" + "</table>";
	$("<div/>").attr("id", "advquery").addClass("advquery").appendTo("#right");
	$(rt).appendTo("#advquery");
	btnProwerConfig(btns);
	$("#search_uid_gonghao").click(function() {
		clearInitQuery(this);
	});
	$("#search_uid_gonghao").blur(function() {
		if (this.value == "") {
			$("#search_uid_gonghao").val("请输入用户名或工号");
			$("#search_uid_gonghao").addClass("blurview");
		}
	});
	$("#search_uid_gonghao").bind("keyup", function(e) {
		if (e.which == 13) {
			searchSumit_user_luke();
		}
	});
	jinYongList_luke();
};

// 禁用用户列表(整理)
function jinYongList_luke() {
	listFactor = {
		listObj : [ {
			title : "序号",
			key : "paihao"
		}, {
			title : "用户名",
			key : "id"
		}, {
			title : "工号",
			key : "gonghao"
		}, {
			title : "电子邮件",
			key : "email"
		}, {
			title : "角色",
			key : "jiaoseName"
		}, {
			title : "状态",
			key : "qiyong",
			func : function(v) {
				return (v) ? "启用" : "禁用";
			}
		} ],
		url : contextPath + "/publish/user/findAllUserByPage.htm",
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			qiyongflag : 0,
			tag : Math.random()
		}
	};
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#right");
	$(div_list).createPageList(listFactor);
};

// 用户查询（整理）
function searchSumit_user_luke() {
	var data_search;
	if ($("#search_uid_gonghao").val().indexOf("请输入") != -1)
		data_search = {
			search : ''
		};
	else
		data_search = {
			search : $("#search_uid_gonghao").val()
		};
	$.extend(listFactor.data, data_search);
	$("#pageList").createPageList(listFactor);
}

// 用户信息新增（整理）
function userAddDialog() {
	var uf = userAddTab();// 返回的用户表格字符串
	var yf = yuangongAddTab();// 返回员工表格字符串
	var ef = oimsFormWindow({
		url : contextPath + "/publish/user/addUser.htm",
		id : "addUserForm",
		dialogTitle : "新增",
		width : 900,
		height : 500,
		resetForm : resetUserForm,
		btnOkSuccess : function(data, responseText, statusText) {
			if (data.state)
				$.oimsSucc("用户信息新增成功", function() {
					searchSumit_user_luke();
					removeDiv_openWin();
				});
			else
				$.oimsError("用户信息新增失败", function() {
					searchSumit_user_luke();
					removeDiv_openWin();
				});

		},
		btnOkBefor : addUserValidata

	}).append(uf).append(yf);

	addJiaoSeValue(uf);// 角色信息下拉框赋值
	addBumenValue(yf);// 部门下拉框赋值
	calendarFun("shengri");// 生日
	$("#bumenId", yf).change(function() {
		var bumenId = $("#bumenId option:selected").val();
		addBgsValue(bumenId, yf);
	});
	addZhiwuValue(yf);
	addYuanGongCategory(yf);
	utilTool().fdisabled(yf);// 员工表格字符串全部禁用
	if (hasYhQx(oimsCategory.ADD_YUANGONG_POWER)) {// 存在员工信息新增权限
		// 15表示权限表中员工信息新增权限
		$("#ygdetail").attr("disabled", false);// 员工详细信息复选框可用
	}
	$("#ygdetail").click(function() {
		if (this.checked) {
			utilTool().fundisabled(yf);// 启用员工信息新增中的控件
		} else {
			utilTool().fdisabled(yf);// 禁用员工信息新增中的控件
			$("#ygdetail").attr("disabled", false);
		}
	});
	// 用户工号失去焦点的事件
	$("#gonghao", ef).focusout(
			function(e) {
				var regulation_null = "^[^ ]";// 非空验证
				var validate_null = new RegExp(regulation_null);
				if (!validate_null.test(this.value))// 非空验证
					return;
				// 判断此工号是否已经存在于user表中begin
				var data = getJSONData("/publish/user/findUserByGongHao.htm", {
					gonghao : this.value,
					tag : Math.random()
				}, "post");
				if (data.obj != null) {
					$.oimsAlert("用户工号重复，请修改");
					$(this)[0].focus();
					return;
				}
				// 判断此工号是否已经存在于user表中end

				// 根据该工号查询员工表存在给员工相信信息赋值begin
				var data_findYuangongByGh = getJSONData(
						"/publish/yuangong/findYuangongByGh.htm", {
							tag : Math.random(),
							gh : this.value
						}, "post");
				if (data_findYuangongByGh.state)
					fillYuangongInfo(data_findYuangongByGh.obj,
							$("#addUserForm"), $(".yginfo"));
				// 根据该工号查询员工表存在给员工相信信息赋值end

			});

};

// 员工信息重置方法(整理)
function resetUserForm() {
	$("#uid").val("");
	$("#password").val("");
	$("#password2").val("");
	$("#gonghao").val("");
	$("#email").val("");
	$("#jiaose").val("");
	if (hasYhQx(oimsCategory.ADD_YUANGONG_POWER)) {
		$("#xingming").val("");
		$("#shengri").val("");
		$("input[name='xingbie'][value='1']").attr("checked", "");
		$("#shouji").val("");
		addBumenValue($(".yginfo"));
		$("#bgs_id")[0].options.length = 0;
		$("#y_email").val("");
		$("#sfzh").val("");
		$("#zhiwu").val("");
		$("#dianhua").val("");
		$("#diqu").val("");
		$("#jtdz").val("");
		$("#jianjie").val("");
	}
};
// 用户信息修改(整理)
function userUpdateDialog() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要修改的用户");
		return;
	}
	var objData = dataObjects[0];
	var uf = userUpdateTab();// 用户信息修改表格创建返回表格字符串
	var yf = yuangongAddTab();// 员工基本信息表格返回创建的表格对象(整理)
	var f = oimsFormWindow({
		url : contextPath + "/publish/user/updateUser.htm",
		id : "updateUserForm",
		dialogTitle : "修改",
		icon : "edit",
		width : 900,
		height : 500,
		resetForm : resetUserFormUpdate,
		btnOkSuccess : function(data, responseText, statusText) {
			if (data.state)

				$.oimsSucc("用户信息修改成功", function() {
					searchSumit_user_luke();
					removeDiv_openWin();
				});
			else
				$.oimsError("用户信息修改失败", function() {
					searchSumit_user_luke();
					removeDiv_openWin();
				});

		},
		btnOkBefor : updateUserValidata
	}).append(uf).append(yf);

	addJiaoSeValue(uf);// 角色信息下拉框赋值
	addBumenValue(yf);// 部门下拉框赋值
	calendarFun("shengri");// 生日
	$("#bumenId", yf).change(function() {
		var bumenId = $("#bumenId option:selected").val();
		addBgsValue(bumenId, yf);
	});
	addZhiwuValue(yf);
	addYuanGongCategory(yf);
	fillUserInfo(objData, f);// 用户信息赋值

	// 根据该工号查询员工表存在给员工相信信息赋值begin
	var data_findYuangongByGh = getJSONData(
			"/publish/yuangong/findYuangongByGh.htm", {
				tag : Math.random(),
				gh : objData.gonghao
			}, "post");
	if (data_findYuangongByGh.state)
		fillYuangongInfo(data_findYuangongByGh.obj, f, yf);
	// 根据该工号查询员工表存在给员工相信信息赋值end

	// 判断是否存在员工信息修改的权限begin
	utilTool().fdisabled(yf);

	if (hasYhQx(oimsCategory.UPDATE_YUANGONG_POWER)) {
		$("#ygdetail").attr("disabled", false);
	}
	$("#ygdetail").click(function() {
		if (this.checked) {
			utilTool().fundisabled(yf);
		} else {
			utilTool().fdisabled(yf);
			$("#ygdetail").attr("disabled", false);
		}
	});
	// 判断是否存在员工信息修改的权限end
};

// 用户信息修改，表单重置方法(整理)
function resetUserFormUpdate() {
	var gonghao = $("#gonghao").val();
	var data = getJSONData("/publish/user/findUserByGongHao.htm", {
		gonghao : gonghao,
		tag : Math.random()
	}, "post");
	if (data.state) {
		var user = data.obj;
		$("#uid").val(user.uid);
		$("#email").val(user.email);
		$("#jiaose").val(user.jiaose);
	}
	// 根据该工号查询员工表存在给员工相信信息赋值begin
	var data_findYuangongByGh = getJSONData(
			"/publish/yuangong/findYuangongByGh.htm", {
				tag : Math.random(),
				gh : gonghao
			}, "post");
	if (data_findYuangongByGh.state)
		fillYuangongInfo(data_findYuangongByGh.obj, $("#updateUserForm"),
				$(".yginfo"));
};

// 用户表单验证方法(整理)
function addUserValidata() {
	// 用户信息验证begin
	var oValidataData = {
		nullValidataData : {
			'uid' : '用户名称为空',
			'password' : '用户密码为空',
			'password2' : '确认密码为空',
			'gonghao' : '用户工号为空',
			'jiaose' : "用户角色为空"
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);
		return false;
	}
	if ($("#password").val() != $("#password2").val()) {
		$.oimsAlert("两次密码输入不一致");
		return false;
	}
	// 用户信息验证end

	// 员工信息验证begin
	var ygdetail = $("input[name='ygdetail']");// 员工详细信息复选框对象
	if (ygdetail[0].checked) {
		// 用户信息验证begin
		var oValidataData = {
			nullValidataData : {
				'xingming' : '员工姓名为空',
				'shengri' : '出生日期为空',
				'bumenId' : '所属科室为空',
				'bgs_id' : '办公室信息为空',
				'category':'人员类别为空'
			}
		};
		var sReturn = fnFormValidata(oValidataData);
		if (sReturn != null) {
			$.oimsAlert(sReturn);
			return false;
		}
	}
	// 员工信息验证end
	return true;

}

// 用户表单验证方法 用户信息修改用到(整理)
function updateUserValidata() {
	// 用户信息验证begin
	var oValidataData = {
		nullValidataData : {
			'uid' : '用户名称为空',
			'gonghao' : '用户工号为空',
			'jiaose' : "用户角色为空"
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);
		return false;
	}
	// 用户信息验证end

	// 员工信息验证begin
	var ygdetail = $("input[name='ygdetail']");// 员工详细信息复选框对象
	if (ygdetail[0].checked) {
		// 用户信息验证begin
		var oValidataData = {
			nullValidataData : {
				'xingming' : '员工姓名为空',
				'shengri' : '出生日期为空',
				'bumenId' : '所属科室为空',
				'bgs_id' : '办公室信息为空',
				'category':'人员类别为空'
			}
		};
		var sReturn = fnFormValidata(oValidataData);
		if (sReturn != null) {
			$.oimsAlert(sReturn);
			return false;
		}
	}
	// 员工信息验证end
	return true;

}

// 验证出生日期和系统当前日期
function checkDateCompare(startTime, endTime) {
	if (startTime.length > 0 && endTime.length > 0) {
		var startTmp = startTime.split("-");
		var endTmp = endTime.split("-");
		var sd = new Date(startTmp[0], startTmp[1], startTmp[2]);
		var ed = new Date(endTmp[0], endTmp[1], endTmp[2]);
		if (sd.getTime() > ed.getTime()) {
			return false;
		}
	}
	return true;
};

// 用户角色信息下拉框赋值用户信息修改用到（整理）
function addJiaoSeValue(ef) {
	$("#jiaose", ef)[0].options.length = 0;
	$("<option value=''></option>").appendTo("#jiaose", ef);
	var data = getJSONData("/publish/role/findAllRole.htm", {
		tag : Math.random()
	}, "post");
	if (data.state) {
		$.each(data.obj, function(i, v) {
			$("<option value=" + v.id + ">" + v.jiaose + "</option>").appendTo(
					"#jiaose", ef);
		});
	}

};
// 部门下拉框赋值
function addBumenValue(ef) {
	$("#bumenId", ef)[0].options.length = 0;
	$("<option value=''></option>").appendTo("#bumenId", ef);
	var data = getJSONData("/publish/bumen/findAllBuMen.htm", {
		tag : Math.random()
	}, "post");
	if (data.state) {
		$.each(data.obj, function(i, v) {
			$("<option value=" + v.id + ">" + v.bmmc + "</option>").appendTo(
					"#bumenId", ef);
		});
	}

};

// 所属科室关联办公室查询（整理）
function addBgsValue(bumenid, ef) {
	$("#bgs_id", ef)[0].options.length = 0;// 清空办公室下拉框数据
	$("<option value=''></option>").appendTo("#bgs_id", ef);
	if (bumenid != "") {
		var data = getJSONData(
				"/publish/bangongshi/findAllBanGongShiByBuMenID.htm", {
					id : bumenid,
					tag : Math.random()
				}, "post");
		if (data.state) {
			$.each(data.obj, function(i, v) {
				$("<option value=" + v.id + ">" + v.bgs + "</option>")
						.appendTo("#bgs_id", ef);
			});
		}
	}
};

// 员工职务下拉框赋值（整理）
function addZhiwuValue(ef) {
	$("#zhiwu", ef)[0].options.length = 0;
	$("<option value=''></option>").appendTo("#zhiwu", ef);
	var data = getJSONData("/publish/category/findCategorysByFatherId.htm", {
		fatherid : oimsCategory.DOCTOR_JOB,
		tag : Math.random()
	}, "post");
	if (data.state) {
		$.each(data.obj, function(i, v) {
			$("<option value='" + v.category + "'>" + v.category + "</option>")
					.appendTo("#zhiwu", ef);
		});
	}
	
}
function addYuanGongCategory(ef){
	$("#category", ef)[0].options.length = 0;
	$("<option value=''></option>").appendTo("#category", ef);
	var data = getJSONData("/publish/category/findCategorysByFatherId.htm", {
		fatherid : oimsCategory.YUANGONG_FENLEI,
		tag : Math.random()
	}, "post");
	if (data.state) {
		$.each(data.obj, function(i, v) {
			$("<option value='" + v.categoryid + "'>" + v.category + "</option>")
					.appendTo("#category", ef);
		});
	}
}

// 判断是否拥有用户权限操作(整理)
function hasYhQx(id) {
	var data = getJSONData("/publish/user/hasYhQx.htm", {
		qxid : id,
		tag : Math.random()
	});
	if (data.state)
		return true;
	else
		return false;
}
// 用户信息修改时的赋值方法(整理)
function fillUserInfo(objData, f) {
	$("<input type='hidden' name='qiyong' />").val(objData.qiyong ? 1 : 0)
			.appendTo(f);
	$("#uid", f).val(objData.id);
	$("#gonghao", f).val(objData.gonghao);
	$("#email", f).val(objData.email);
	$("#jiaose", f).val(objData.jsid);

};
// 员工详细信息赋值(整理) f表示 用户信息新增表单对象 yf 表示员工相信信息div对象
function fillYuangongInfo(objData, f, yf) {
	$("#xingming", f).val(objData.xingming);// 员工姓名
	var shengri =objData.shengri;
	if(shengri!=null)   //前台的插件不允许生日为空
	$("#shengri", f).val(time(shengri).format_yyyy_mm_dd());// 出生日期
	utilTool().radioSelect('xingbie', objData.xingbie, f);// 员工性别
	$("#shouji", f).val(objData.shouji);// 手机号
	$("#bumenId", f).val(objData.bumenId);// 所属科室
	$("#bumenId").change(function() {
		$("#bgs_id").text("");
		var bumenId = $("#bumenId option:selected").val();
		addBgsValue(bumenId, yf);
	});
	addBgsValue(objData.bumenId, yf);// 根据科室查询该科室下所有的办公室信息
	$("#bgs_id", f).val(objData.bgsId);// 办公室
	$("#y_email", f).val(objData.email);// 电子邮件
	$("#sfzh", f).val(objData.sfzh);// 身份证号
	$("#zhiwu", f).val(objData.zhiwu);// 员工职务
	$("#dianhua", f).val(objData.dianhua);// 联系电话
	$("#diqu", f).val(objData.diqu);// 所属地区
	$("#jtdz", f).val(objData.jtdz);// 家庭地址
	$("#jianjie", f).val(objData.jianjie);
	$("#category",f).val(objData.category);
};

// 权限配置操作(整理)
function quanXianConfigDialog() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要配置权限的用户");
		return;
	}
};

function quanXianConfigValidata() {

};

// 启用用户禁用操作(整理)
function prohibitUser() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要禁用的用户");
		return;
	}
	$.oimsConfirm({
		strTitle : "确认禁用该用户",
		remove_length : true
	}, doProhibitUser);
};

function doProhibitUser() {
	var dataObjects = getCheckBoxValue();
	var url_jingYongUser = "/publish/user/jingYongUser.htm";// 禁用用户操作
	var data_jingYongUser = getJSONData(url_jingYongUser, {
		uid : dataObjects[0].id,
		tag : Math.random()
	}, "post");
	if (data_jingYongUser.state)
		$.oimsSucc("禁用用户操作成功", function() {
			searchSumit_user_luke();
			removeDiv_openWin();
		});
	else
		$.oimsError("禁用用户操作失败", function() {
			searchSumit_user_luke();
			removeDiv_openWin();
		});
}

// 启用用户操作(整理)
function qiyongUser() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要启用的用户");
		return;
	}
	$.oimsConfirm({
		strTitle : "确认启用该用户",
		remove_length : true
	}, doQiyongUser);
};

function doQiyongUser() {
	var dataObjects = getCheckBoxValue();
	var url_qiYongUser = "/publish/user/qiYongUser.htm";// 启用用户操作
	var data_qiYongUser = getJSONData(url_qiYongUser, {
		uid : dataObjects[0].id,
		tag : Math.random()
	}, "post");
	if (data_qiYongUser.state)
		$.oimsSucc("启用户操作成功", function() {
			searchSumit_user_luke();
			removeDiv_openWin();
		});
	else
		$.oimsError("启用户操作失败", function() {
			searchSumit_user_luke();
			removeDiv_openWin();
		});
}

// 用户删除操作(整理)
function deleteUser() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要删除的用户");
		return;
	}
	$.oimsConfirm({
		strTitle : "确认删除该用户",
		remove_length : true
	}, doDeleteUser);
};

function doDeleteUser() {
	var dataObjects = getCheckBoxValue();
	var url_deleteUser = "/publish/user/deleteUser.htm";// 删除用户操作
	var data_deleteUser = getJSONData(url_deleteUser, {
		uid : dataObjects[0].id,
		gonghao : dataObjects[0].gonghao,
		tag : Math.random()
	}, "post");
	if (data_deleteUser.state)
		$.oimsSucc("用户信息删除成功", function() {
			searchSumit_user_luke();
			removeDiv_openWin();
		});
	else
		$.oimsError("用户信息删除失败", function() {
			searchSumit_user_luke();
			removeDiv_openWin();
		});
}

// 修改用户角色信息(整理)
function jiaoseDialog() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要修改角色信息的用户");
		return;
	}
	var table_jiaoseTab = jiaoseTab();
	oimsFormWindow({
		id : "form_updateJiaose",
		dialogTitle : "用户角色信息修改",
		icon : "role",
		url : contextPath + "/publish/user/updateJiaose.htm",
		height : 420,
		width : 400,
		method : "post",
		resetForm : resetJiaoSeForm,// 重置方法
		btnOkSuccess : function(data, responseText, statusText) {
			if (data.state) {
				$.oimsSucc("用户角色信息修改成功", function() {
					searchSumit_user_luke();
					removeDiv_openWin();
				});
			} else {
				$.oimsError("用户角色信息修改失败", function() {
					searchSumit_user_luke();
					removeDiv_openWin();
				});
			}

		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
			$.oimsError("用户角色信息修改失败", function() {
				searchSumit_user_luke();
				removeDiv_openWin();
			});
		},
		btnOkBefor : validate_jiaoseDialog

	}).append(table_jiaoseTab);
	addJiaoSeValue(table_jiaoseTab);// 角色下拉框赋值
	initjiaoseDialog(dataObjects[0]);// 用户角色信息修改赋值(整理)
};
// 用户角色信息修改赋值(整理)
function initjiaoseDialog(dataObject) {
	$("#jiaose").val(dataObject.jsid);
	$("#uid").val(dataObject.id);
}
// 角色信息重置(整理)
function resetJiaoSeForm() {
	var dataObjects = getCheckBoxValue();
	initjiaoseDialog(dataObjects[0]);// 用户角色信息修改赋值(整理)
};
// 角色信息修改验证(整理)
function validate_jiaoseDialog() {
	var oValidataData = {
		nullValidataData : {
			'jiaose' : "用户角色为空"
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);
		return false;
	}
	return true;
}
// 密码重置操作(整理)
function resetPwdDialog() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要操作的用户");
		return;
	}
	var table_resetPwdTab = resetPwdTab();
	oimsFormWindow({
		id : "form_updateUserPassword",
		dialogTitle : "密码重置",
		icon : "pass",
		url : contextPath + "/publish/user/updateUserPassword.htm",
		height : 360,
		width : 300,
		method : "post",
		resetForm : reset_form_updateUserPassword,// 重置方法
		btnOkSuccess : function(data, responseText, statusText) {
			if (data.state) {
				$.oimsSucc("用户密码重置操作成功", function() {
					searchSumit_user_luke();
					removeDiv_openWin();
				});
			} else {
				$.oimsError("用户密码重置操作失败", function() {
					searchSumit_user_luke();
					removeDiv_openWin();
				});
			}

		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
			$.oimsError("用户密码重置操作失败", searchSumit_user_luke);
			$("#form_updateUserPassword").parent().parent().remove();
		},
		btnOkBefor : validate_form_updateUserPassword

	}).append(table_resetPwdTab);
	$("#uid", table_resetPwdTab).val(dataObjects[0].id);
};

// 用户密码重置相关验证方法
function validate_form_updateUserPassword() {
	var oValidataData = {
		nullValidataData : {
			'password' : '输入密码为空',
			'password2' : '确认密码为空'
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);
		return false;
	}
	if ($("#password").val() != $("#password2").val()) {
		$.oimsAlert("两次密码输入不一致");
		return false;
	}
	return true;
}
// 用户密码重置的表单重置方法
function reset_form_updateUserPassword() {
	$("#password", "#form_updateUserPassword").val("");
	$("#password2", "#form_updateUserPassword").val("");
}
