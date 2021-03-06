	//首次加载的方法（整理）
function showYuanGongList(btns) {
	importJS('/js/manager/tongji/personalTongji.js');
	pageTitle = "员工信息";// 员工信息
	init();
	$("<div/>").attr("id", "advquery").addClass("advquery").appendTo("#right");
	var yuangongTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='23%' class='leftalign' ><input name='search_xingming_zhiwu' type='text' class='blurview' id='search_xingming_zhiwu' onfocus=\"this.className='focus'\"  onblur=\"this.className='blur'\" value='"
			+ "请输入员工姓名或职务"// 请输入员工姓名或职务
			+ "' size='28' /></td>"
			+ "<td width='7%'><a  href='javascript:seniorYgSearchSubmit();' class='search' >"
			+ "查询"// 查询
			+ "</a></td>"
			+ "<td width='9%'><a  href='javascript:advSearchYuanGong();' class='advsearch'>"
			+ "高级查询"// 高级查询
			+ "</a></td>"
			+ "<td width='59%' >"
			+ "<div class='btn'>"
			+ "<a href='javascript:addYuanGongForm();' onclick='return false;'><span class='adda'></span>"
			+ "新增"// 新增
			+ "</a>"
			+ "<a href='javascript:updateYuanGongForm();' onclick='return false;'><span class='edita'></span>"
			+ "修改"// 修改
			+ "</a>"
			+ "<a href='javascript:yuangongLizhi();' onclick='return false;'><span class='starta'></span>"
			+ "离职"// 离职
			+ "</a>"
			+ "<a href='#' id ='tojianli' onclick='return false;'><span class='rolea'></span>"
			+ "简历"// 简历
			+ "</a>"
			+ "<a href='#' id ='toviewjianli' onclick='return false;'><span class='role'></span>"
			+ "查看"// 查看
			+ "</a>"
			+ "<a href='javascript:delYuanGong();' onclick='return false;'><span class='dela'></span>"
			+ "删除"// 删除
			+ "</a>"
			+ "<a href='javascript:showPersonalChart();' onclick='return false;'><span class='rolea'></span>"
			+ "统计"// 删除
			+ "</a>"
			+ "<a href='javascript:exportYuanGong();' onclick='return false;'><span class='exporta'></span>"
			+ "导出"// 删除
			+ "</a>"
			+ "<a href='javascript:updateJcxmsOfYuanGongDialog();' class='four' onclick='return false;'><span class='checkitema'></span>"
			+ "检查项目"// 删除
			+ "</a>"
			+ "</div>" + "</td>" + "</tr>" + "</table>";
//	function exportEXL(){

//	} ;
	$(yuangongTemplate).appendTo("#advquery");
//	console.dir(btns);
	btnProwerConfig(btns);// 按钮加上权限
	$("#search_xingming_zhiwu").click(function() {
		clearInitQuery(this);
	});
	$("#tojianli").click(function() {
		yuangongJianli(btns);
	});
	$("#toviewjianli").click(function() {
		yuangongJianliView(btns);
	});
	$("#search_xingming_zhiwu").blur(function() {
		if (this.value == "") {
			$("#search_xingming_zhiwu").val("请输入员工姓名或职务");// 请输入员工姓名或职务
			$("#search_xingming_zhiwu").addClass("blurview");
		}
	});
	$("#search_xingming_zhiwu").bind("keyup", function(e) {
		if (e.which == 13) {
			seniorYgSearchSubmit();
		}
	});
	showList_YuanGong();// 分页显示员工列表
}
function exportYuanGong(){
	var pt = proTool() ;
	var table=$("div.list").children("table");
	var yuangong_ids="";
	var arys=getCheckBoxValue();
	$.each(arys,function(i,n){
		yuangong_ids+=this.id;
		if(i!=arys.length-1){
			yuangong_ids+=",";
		}
	});
	if(!arys.length){
		$.oimsAlert("请至少选择一个导出员工");
		return;
	}
	pt.proDown(contextPath+"/publish/yuangong/exportYuanGong.htm" ,{patient_ids:yuangong_ids}) ;
//	var w = $(".title").width()-$(".categoryTree").width()-10 ;
//	$(".list").parent().width(w) ;	
}
// 分页显示员工列表（整理）
function showList_YuanGong() {
	listFactor = {
		listObj : [ {
			title : "序号",// 序号
			key : "id"
		}, {
			title : "类别",// 所属办公室
			key : "category"
		}, {
			title : "姓名",// 姓名
			key : "xingming"
		}, {
			title : "性别",// 性别
			key : "xingbie",
			func : function(value) {
				return (value == 1) ? "男" : "女";
			}
		}, {
			title : "工号",// 工号
			key : "gh"
		}, {
			title : "职务",// 职务
			key : "zhiwu"
		}, {
			title : "职称",// 职务
			key : "title"
		}, {
			title : "学历",// 职务
			key : "xueli"
		}, {
			title : "联系电话",// 联系电话
			key : "dianhua"
		}, {
			title : "所属科室",// 所属科室
			key : "bumenId"
		}, {
			title:"在职状态",
			key:"leaveOffice",
			func:function(d){return d?"离职":"在职"}
		} ],
		url : contextPath + "/publish/yuangong/findAllyuangongByPage.htm",// url
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			tag : Math.random()
		}
	};
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#right");
	$(div_list).createPageList(listFactor);
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
// 获得所有部门信息(整理)
function getBuMen2Info() {
	$("#bumenId")[0].options.length = 0;
	$("<option value=''></option>").appendTo("#bumenId");
	var data = getJSONData("/publish/bumen/findAllBuMen.htm", {
		tag : Math.random()
	}, "post");
	if (data.state) {
		$.each(data.obj, function(i, d) {
			$("<option value='" + d.id + "'>" + d.bmmc + "</option>").appendTo(
					"#bumenId");
		});
	}
}
// 点击部门后，获取办公室信息（整理）
function getBgsInfo() {
	$("#bumenId")
			.change(
					function() {
						$("#bgsId")[0].options.length = 0;// 清空办公室下拉框数据
						$("<option value=''></option>").appendTo("#bgsId");
						var bumen_id = $("#bumenId option:selected").val();
						if (bumen_id != "") {
							var data2 = getJSONData(
									"/publish/bangongshi/findAllBanGongShiByBuMenID.htm",
									{
										id : bumen_id,
										tag : Math.random()
									}, "post");
							if (data2.state) {
								var banGongShiList = data2.obj;
								$.each(banGongShiList, function(i, d) {
									$(
											"<option value='" + d.id + "'>"
													+ d.bgs + "</option>")
											.appendTo("#bgsId");
								});
							}
						}
					}

			);
}
//员工关联检查项目修改
function updateJcxmsOfYuanGongDialog(){
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length!=1) {
		$.oimsAlert("选择一个员工");
		return;
	}
	var div_opencontent_check = $("<div/>").attr("id", "div_opencontent_check")
			.attr("class", "opencontent check");
//	var div_opencontent_check_html = "<p>" + "设备名称" + "：" + dataObjects[0].sbmc
//			+ "</p>";
//	$(div_opencontent_check_html).appendTo(div_opencontent_check);
	var div_checkdiv1 = $("<div/>").attr("id", "div_checkdiv1").attr("class",
			"checkdiv1").attr("style", "height:90px;").appendTo(
			div_opencontent_check);
	var table_jcxm = $("<table/>").attr("width", "100%").attr("border", "0")
			.attr("cellspacing", "0").attr("cellpadding", "0").appendTo(
					div_checkdiv1);
	var tr_jcxm;// 行对象
	// 检查项目集合
	var url_findAllJcxm = "/publish/jcxm/findAllJcxm.htm"; // 查询所有检查项目信息
	var data_list_jcxmobj = getJSONData(url_findAllJcxm, {
		categoryId:oimsCategory.YAN_KE_JIAN_CHA,
		currentPage:1,
		pageSize:1000,
		tag : Math.random()
	}, "post").obj;
	var url_findJcxmsByCategoryIdAndBgsId = "/publish/jcxm/findJcxmList.htm";
	var data_findJcxmsByCategoryIdAndBgsId = getJSONData(url_findJcxmsByCategoryIdAndBgsId, {
		categoryId : 5,
		//bgsId : 128,
		currentPage : 1,
		pageSize : 1000,// Page类的方法
		tag : Math.random()
	}, "post");
	data_list_jcxmobj=$.merge(data_list_jcxmobj,data_findJcxmsByCategoryIdAndBgsId.obj);
	$.each(data_list_jcxmobj, function(i, jcxmobj) {
		if (i % 5 == 0)
			tr_jcxm = $("<tr/>").appendTo(table_jcxm);
		var td_jcxm = $("<td  align='left' />").appendTo(tr_jcxm);
		$(
				"<input type='checkbox' id='shebei_jcxmId' name='shebei_jcxmId' value='"
						+ jcxmobj.id + "'/>").appendTo(td_jcxm);
		$("<label >" + jcxmobj.xmmc + "</label><br>").appendTo(td_jcxm);
	});
	var hidden_gonghao = $("<input type='hidden' name='gonghao' id='gonghao' value=''/>");// 主键隐藏域
	var hidden_jcxmIds = $("<input type='hidden' name='jcxmIds' id='jcxmIds' value=''/>");// 检查项目隐藏域
//	var hidden_qiyong = $("<input type='hidden' name='qiyong' id='qiyong' value=''/>");// 启用禁用状态隐藏域
	var form_updateJcxmsOfYuanGong_Jcxm = $("<form/>").attr("id",
			"form_updateJcxmsOfYuanGong_Jcxm").attr("action",
			contextPath + "/publish/yuangong/updateJcxmsOfYuanGong.htm").attr(
			"method", "post");
	$(div_opencontent_check).appendTo(form_updateJcxmsOfYuanGong_Jcxm);
	$(hidden_gonghao).appendTo(form_updateJcxmsOfYuanGong_Jcxm);// 隐藏域
	$(hidden_jcxmIds).appendTo(form_updateJcxmsOfYuanGong_Jcxm);// 隐藏域
//	$(hidden_qiyong).appendTo(form_updateJcxmsOfSheBei_Jcxm);// 隐藏域
	$("<br/>").appendTo(form_updateJcxmsOfYuanGong_Jcxm);
	var div_openbutton = $("<div/>").attr("id", "div_openbutton").attr("class",
			"openbutton").appendTo(form_updateJcxmsOfYuanGong_Jcxm);// 底部div
	var div_openbutton_html = "<a href='javascript:updateJcxmsOfYuanGong();'><span class='advsumit'></span>提交</a>"
			+ "<a href='javascript:rest_form_updateJcxmsOfYuanGong_Jcxm();'><span class='advreset'></span>重置</a>";
	$(div_openbutton_html).appendTo(div_openbutton);
	$(form_updateJcxmsOfYuanGong_Jcxm).oimsDialog({
		icon : "checkitem",
		title : "检查项目",
		width : 750,
		height : 245,
		drag : false,
		locked : true,
		winType : 4,
		button : null
	});
	// 赋值
	$("#gonghao").val(dataObjects[0].gh);
	$("#jcxmIds").val(dataObjects[0].jcxmIds);
//	$("#qiyong").val(dataObjects[0].qiyong);
	var value_jcxmIds = dataObjects[0].jcxmIds;
	if (value_jcxmIds != null && value_jcxmIds != "") {
		var array_jcxmIds = new Array();// 定义一个数组
		array_jcxmIds = value_jcxmIds.split(","); // 字符分割
		for ( var i = 0; i < array_jcxmIds.length; i++)
			checkedCheckBoxByValue("shebei_jcxmId", array_jcxmIds[i]);
	}

}
function updateJcxmsOfYuanGong() {
	var object_check_shebei_jcxmId = document
			.getElementsByName('shebei_jcxmId');
	var jcxmIds = "";
	for ( var i = 0; i < object_check_shebei_jcxmId.length; i++) {
		if (object_check_shebei_jcxmId[i].checked == true)
			jcxmIds += object_check_shebei_jcxmId[i].value + ",";
	}
	if (jcxmIds != "")// 截取去掉后面的“,”
		jcxmIds = jcxmIds.substring(0, jcxmIds.lastIndexOf(","));
	$("#jcxmIds").val(jcxmIds);
	$("#form_updateJcxmsOfYuanGong_Jcxm").ajaxForm(
			{
				dataType : 'json',
				success : function(data) {
					if (data.state)
						$.oimsSucc("员工检查项目信息配置成功",
								function() {
							searchYuanGong();
							removeDiv_openWin();
						});
					else
						$.oimsError("员工检查项目信息配置失败",
								function() {
							searchYuanGong();
							removeDiv_openWin();
						});
				}
			});
	$("#form_updateJcxmsOfYuanGong_Jcxm").submit();
}
function searchYuanGong() {
	var data_search;
	if ($("#search_xingming_zhiwu").val().indexOf("请输入") != -1)
		data_search = {
			sbmc : ''
		};
	else
		data_search = {
			sbmc : $("#search_xingming_zhiwu").val()
		};
	$.extend(listFactor.data, data_search);
	$("#pageList").createPageList(listFactor);
};
// 不点击获取办公室信息
function getNoClickBgsInfo() {
	$("#bgsId")[0].options.length = 0;
	var data2 = getJSONData(
			"/publish/bangongshi/findAllBanGongShiByBuMenID.htm", {
				id : $("#bumenId").val(),
				tag : Math.random()
			}, "post");
	if (data2.state) {
		var banGongShiList = data2.obj;
		$.each(banGongShiList, function(i, d) {
			$("<option value='" + d.id + "'>" + d.bgs + "</option>").appendTo(
					"#bgsId");
		});
	}
}

// 查询所有角色信息（整理）
function getRole2Info() {
	var data = getJSONData("/publish/role/findAllRole.htm", {
		tag : Math.random()
	}, "post");
	if (data.state) {
		var userlist = data.obj;
		$.each(userlist, function(i, d) {
			$("<option value='" + d.id + "'>" + d.jiaose + "</option>")
					.appendTo("#jiaose");
		});
	}
}
// 得到员工职务（整理）
function getZhiWu2Info() {
	var data = getJSONData("/publish/category/findCategorysByFatherId.htm", {
		fatherid : oimsCategory.DOCTOR_JOB,
		tag : Math.random()
	}, "post");
	if (data.state) {
		ZhiwuList = data.obj;
		$.each(ZhiwuList, function(i, d) {
			$("<option value='" + d.category + "'>" + d.category + "</option>")
					.appendTo("#zhiwu");
		});
	}
}

//得到员工分类
function getYuangongFenlei(v) {
	var data = getJSONData("/publish/category/findCategorysByFatherId.htm", {
		fatherid : oimsCategory.YUANGONG_FENLEI,
		tag : Math.random()
	}, "post");
	if (data.state) {
		$.each(data.obj, function(i, d) {
			$("<option value='" + d.categoryid + "'>" + d.category + "</option>")
					.appendTo("select#category");
		});	}
	if(v)$("select#category").val(v);
}
// 添加员工(整理)
function addYuanGongForm() {
	var YgTable = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='106' rowspan='4' align='center' ><div class='pople'><img src='"
			+ contextPath
			+ "/images/pople.png' width='104' height='97' id='yg_pic' /></div></td>"
			+ "<td width='52' align='right'>"
			+ "姓名"// 姓名
			+ ":</td>"
			+ "<td><input type='text' name='xingming' id='xingming' onblur=\"this.className='blur';checkIsStrEmpty(this);\"  class='blur' /></td>"
			+ "<td width='1%'><span class='required'>*</span></td>"
			+ "<td width='10%' align='right'>"
			+ "性别"// 性别
			+ ":</td>"
			+ "<td align='left'><input type='radio' name='xingbie' id='xingbie1' value='1' checked/>"
			+ "<label for='xingbie1'>男</label>"// 男
			+ "&nbsp;&nbsp;"
			+ "<input type='radio' name='xingbie' id='xingbie0' value='0' />"
			+ "<label for='xingbie0'>女</label>"// 女
			+ "</td>"
			+ "<td width='12'><span class='required'>*</span></td>"
			+ "<td width='52' align='right'>"
			+ "工号:"// 工号
			+ "</td>"
			+ "<td><input type='text' name='yggonghao' id='yggonghao' onblur=\"this.className='blur';checkIsStrEmpty(this);\" class='blur' /></td>"
			+ "<td width='12' align='left'><span class='required'>*</span></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right'>"
			+ "出生日期"// 出生日期
			+ ":</td>"
			+ "<td align='left'><input type='text' name='shengri' id='shengri' onblur=\"this.className='blur';checkIsStrEmpty(this);\"  class='blur' /></td>"
			+ "<td align='left'><span class='required'>*</span></td>"
			+ "<td align='right'>"
			+ "所属科室"// 所属科室
			+ ":</td>"
			+ "<td align='left'><select name='bumenId'  id='bumenId'  onblur=\"this.className='blur'; checkIsStrEmpty(this);\">"
			+ "</select></td>"
			+ "<td align='left'><span class='required'>*</span></td>"
			+ "<td align='right'>"
			+ "人员类别:"// 所属办公室
			+ "</td>"
			+ "<td align='left'><select name='category' id='category'  onblur=\"this.className='blur';checkIsStrEmpty(this);\">"
			+ "<option value=''></option>"
			+ "</select></td>"
			+ "<td align='left'><span class='required'>*</span></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right'>"
			+ "职务"
			+ ":</td>"
			+ "<td align='left'><select name='zhiwu' id='zhiwu'  onblur=\"this.className='blur';checkIsStrEmpty(this);\">"
			+ "<option value=''></option>"
			+ "</select></td>"
			+ "<td align='left'></td>"
			+ "<td align='right'>"
			+ "职称"// 员工职务
			+ ":</td>"
			+ "<td><input type='text' name='title' id='title' onblur=\"this.className='blur';\" class='blur'  /></td>"
			+ "<td align='left'></td>"
			+ "<td align='right'>"
			+ "学历"// 员工职务
			+ ":</td>"
			+ "<td><input type='text' name='xueli' id='xueli' onblur=\"this.className='blur';\" class='blur'  /></td><td></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right'>"
			+ "联系电话"// 联系电话
			+ ":</td>"
			+ "<td align='left'><input type='text' name='dianhua' id='dianhua' onblur=\"this.className='blur';checkIsTel(this)\" maxlength=11 class='blur' /></td>"
			+ "<td align='left'>&nbsp;</td>"
			+ "<td align='right'>"
			+ "身份证"// 身份证
			+ ":</td>"
			+ "<td align='left' colspan='4'><input type='text' name='sfzh' id='sfzh' onblur=\"this.className='blur'\"  class='blur'  /></td>"
			+ "<td align='left'>&nbsp;</td>" + "</tr>" + "</table>";

	var UserTable = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='10%' height='46' align='right'>"
			+ "图片上传"// 图片上传
			+ "</td>"
			+ "<td width='40%'>"
			+ "<div class='searchfile'>"
			+ "<input type='file' style='display:none' name='yg_photo' id ='yg_photo' class='filed' onchange=\"onChange_YgPicPath('"
			+ contextPath
			+ "/publish/yuangong/addYuanGong.htm','addYuanGongForm');\" />"
			+ "<div class='fieldstyle'><input type='text' name='txt_fieldstyle' id='txt_fieldstyle' class='fieldtext'/></div>"
			+ "<div class='buttonstyle'><input type='button'  id='btn_yuyan' class='fieldbutton'/></div>"
			+ "</div>"
			+ "</td>"
			+ "<td width='10%' align='right'>"
			+ "邮箱"// 邮箱
			+ ":</td>"
			+ "<td width='39%'><input type='text' name='ygemail' id='ygemail' onblur=\"this.className='blur';checkIsMail(this)\"  class='blur'  /></td>&nbsp;"
			+ "<td></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right'>"
			+ "家庭地址"// 家庭地址
			+ ":</td>"
			+ "<td colspan='3' align='left'><input type='text' name='jtdz' id='jtdz' onblur=\"this.className='blur'\"  class='blur'  /></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right'>"
			+ "个人简介"// 个人简介
			+ ":</td>"
			+ "<td colspan='3' align='left'><textarea name='jianjie' onblur=\"this.className='blur'\"  class='blur' id='jianjie' cols='45' rows='4'></textarea></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td colspan='4'><fieldset class='fieldsetsytle' id ='addUser' name='addUser'>"
			+ "<legend>"
			+ "<input type='checkbox' name='adduserform' id='adduserform' />"
			+ "&nbsp;"
			+ "添加用户信息"// 添加用户信息
			+ " </legend>"
			+ "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='15%' align='right' nowrap='nowrap'>"
			+ "登录名"// 登录名
			+ ":</td>"
			+ "<td width='33%'><input type='text' name='uid' id='uid' onblur=\"this.className='blur';checkIsStrEmpty(this);\"  class='blur'  /></td>"
			+ "<td width='1%' align='right' nowrap='nowrap'><span class='required'>*</span></td>"
			+ "<td width='17%' align='right' nowrap='nowrap'>"
			+ "用户密码"// 用户密码
			+ ":</td>"
			+ "<td width='33%'><input type='password' name='password' id='password' onblur=\"this.className='blur';checkIsStrEmpty(this);\"  class='blur'  /></td>"
			+ "<td width='1%'><span class='required'>*</span></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right'>"
			+ "角色"// 角色
			+ ":</td>"
			+ "<td class='fieldsettd'><select name='jiaose' id= 'jiaose'  onblur=\"this.className='blur';checkIsStrEmpty(this);\">"
			+ "<option value=''></option>"
			+ "</select></td>"
			+ "<td align='right'><span class='required'>*</span></td>"
			+ "<td align='right'>"
			+ "重复密码"// 重复密码
			+ ":</td>"
			+ "<td><input type='password' name='password2' id='password2' onblur=\"this.className='blur';checkIsStrEmpty(this);\"  class='blur'  /></td>"
			+ "<td><span class='required'>*</span></td>"
			+ "</tr>"
			+ "</table>"
			+ "</fieldset></td>" + "</tr>" + "</table>";
	var addYuanGongForm = $("<form/>").attr("id", "addYuanGongForm").attr(
			"action", contextPath + "/publish/yuangong/addYuanGong.htm").attr(
			"enctype", "multipart/form-data").attr("method", "post");
	$(addYuanGongForm).append(YgTable).append(UserTable);
	var div_openbutton = $("<div/>").attr("id", "div_openbutton").attr("class",
			"openbutton").appendTo(addYuanGongForm);// 底部div
	var div_openbutton_html = "<a href='javascript:ajaxYuanGongForm();'><span class='advsubmit'></span>"
			+ "提交"// 提交
			+ "</a>"
			+ "<a href='javascript:resetYuanGongForm()'><span class='advreset'></span>"
			+ "重置"// 重置
			+ "</a>";
	$(div_openbutton_html).appendTo(div_openbutton);
	$(addYuanGongForm).oimsDialog({
		icon : "add",
		title : "新增",// 新增
		width : 700,
		height : 440,
		drag : false,
		locked : true,
		winType : 4,
		button : null
	});
	// fieldset=addUser
	utilTool().fdisabled("#addUser");// 页面元素不可用
	// type="checkbox" name=adduserform
	if (hasYhQx(oimsCategory.YUANGONG_XINZENGYONGHUQUANXIAN)) {// 有新增用户的权限
		$("#adduserform").attr("disabled", false);// 添加用户信息可用
	}
	// type="checkbox" name=adduserform
	$("#adduserform").click(function() {
		if (this.checked) {
			utilTool().fundisabled("#addUser");// 子元素全部可用
		} else {
			utilTool().fdisabled("#addUser");// 子元素全部不可用
			$("#adduserform").attr("disabled", false);
		}
	});
	// 添加生日点击事件
	calendarFun("shengri");
	getBuMen2Info();// 部门信息
//	$("#bgsId")[0].options.length = 0;
//	getBgsInfo();// 办公室信息
	getRole2Info();// 角色信息
	getYuangongFenlei();
	getZhiWu2Info();// 职务信息
	$.customfile('fieldbutton', 'filed', 'fieldtext', "openWin");
}
// 员工信息新增操作（整理）
function ajaxYuanGongForm() {
	$("#addYuanGongForm").ajaxForm(
			{
				beforeSend : yuangongFormValidate,
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
						$.oimsSucc("员工信息新增成功", function() {
							seniorYgSearchSubmit();
							removeDiv_openWin();
						});
					else
						$.oimsError("员工信息新增失败", function() {
							seniorYgSearchSubmit();
							removeDiv_openWin();
						});

				}
			});
	$("#addYuanGongForm").submit();
}

// 对工号进行关联，判断是否存在；false=表示当前工号不存在于数据库 true=表示当前工号存在于数据库（整理）
function ghIsExist() {
	var data = getJSONData("/publish/yuangong/gonghaoIsExist.htm", {
		allgonghao : $("#yggonghao").val(),
		tag : Math.random()
	}, "post");
	if (data.state)
		return true;
	else
		return false;
}
// 对工号进行关联，判断是否存在；false=表示当前工号不存在于数据库 true=表示当前工号存在于数据库（整理）
function uidIsExist() {
	var data = getJSONData("/publish/user/hasUid.htm", {
		uid : $("#uid").val(),
		tag : Math.random()
	}, "post");
	if (data.obj != null)
		return true;
	else
		return false;
}
// 对员工和用户一起进行验证
function yhValidate() {
	var oValidataData = {
		nullValidataData : {
			'uid' : '登录名为空',
			'password' : '用户密码为空',
			'jiaose' : '角色信息为空',
			'password2' : '重复密码为空'

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
// 对员工进行验证
function ygValidate() {
	// #dmmc只是选中了当前对象
	var oValidataData = {
		nullValidataData : {
			'xingming' : '员工姓名为空',
			'yggonghao' : '员工工号为空',
			'shengri' : '员工生日为空',
			'bumenId' : '所属科室为空'
//				,
//			'bgsId' : '下属办公室为空'
		}
	};
	var sReturn = fnFormValidata(oValidataData);
	if (sReturn != null) {
		$.oimsAlert(sReturn);
		return false;
	}
	return true;
}
// 员工验证调用函数
function yuangongFormValidate() {
	if (!ygValidate())
		return false;
	if (ghIsExist()) {
		$.oimsAlert("员工工号重复，请修改员工工号");
		$("#yggonghao").focus();
		return false;
	}
	if ($("#adduserform")[0].checked) {
		if (!yhValidate())
			return false;
		if (uidIsExist()) {
			$.oimsAlert("登录名重复，请修改登录名");
			$("#uid").focus();
			return false;
		}
	}
	return true;
}
// 这个方法是新添加的
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
}
// 员工信息新增重置（整理）
function resetYuanGongForm() {
	$("#xingming").val("");
	$("#yggonghao").val("");
	$("#shengri").val("");
	getBuMen2Info();
	$("#bgsId")[0].options.length = 0;
	$("#zhiwu").val("");
	$("#dianhua").val("");
	$("#sfzh").val("");
	$("#ygemail").val("");
	$("#jtdz").val("");
	$("#jianjie").val("");
	$("#uid").val("");
	$("#password").val("");
	$("#password2").val("");
	$("#jiaose").val("");
}
// 更新员工(整理)
function updateYuanGongForm() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择需要员工信息");
		return;
	}
	var objData = dataObjects[0];
	var YgTable="<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
	+ "<tr>"
	+ "<td width='106' rowspan='4' align='center' ><div class='pople'><img src='"
	+ contextPath
	+ "/images/pople.png' width='104' height='97' id='yg_pic' /></div></td>"
	+ "<td width='52' align='right'>"
	+ "姓名"// 姓名
	+ ":</td>"
	+ "<td><input type='text' name='xingming' id='xingming' onblur=\"this.className='blur';checkIsStrEmpty(this);\"  class='blur' /></td>"
	+ "<td width='1%'><span class='required'>*</span></td>"
	+ "<td width='10%' align='right'>"
	+ "性别"// 性别
	+ ":</td>"
	+ "<td align='left'><input type='radio' name='xingbie' id='xingbie1' value='1' checked/>"
	+ "<label for='xingbie1'>男</label>"// 男
	+ "&nbsp;&nbsp;"
	+ "<input type='radio' name='xingbie' id='xingbie0' value='0' />"
	+ "<label for='xingbie0'>女</label>"// 女
	+ "</td>"
	+ "<td width='12'><span class='required'>*</span></td>"
	+ "<td width='52' align='right'>"
	+ "工号:"// 工号
	+ "</td>"
	+ "<td><input type='text' name='yggonghao' id='yggonghao' onblur=\"this.className='blur';checkIsStrEmpty(this);\" class='blur' /></td>"
	+ "<td width='12' align='left'><span class='required'>*</span></td>"
	+ "</tr>"
	+ "<tr>"
	+ "<td align='right'>"
	+ "出生日期"// 出生日期
	+ ":</td>"
	+ "<td align='left'><input type='text' name='shengri' id='shengri' onblur=\"this.className='blur';checkIsStrEmpty(this);\"  class='blur' /></td>"
	+ "<td align='left'><span class='required'>*</span></td>"
	+ "<td align='right'>"
	+ "所属科室"// 所属科室
	+ ":</td>"
	+ "<td align='left'><select name='bumenId'  id='bumenId'  onblur=\"this.className='blur'; checkIsStrEmpty(this);\">"
	+ "</select></td>"
	+ "<td align='left'><span class='required'>*</span></td>"
	+ "<td align='right'>"
	+ "人员类别:"// 所属办公室
	+ "</td>"
	+ "<td align='left'><select name='category' id='category'  onblur=\"this.className='blur';checkIsStrEmpty(this);\">"
	+ "<option value=''></option>"
	+ "</select></td>"
	+ "<td align='left'><span class='required'>*</span></td>"
	+ "</tr>"
	+ "<tr>"
	+ "<td align='right'>"
	+ "职务"
	+ ":</td>"
	+ "<td align='left'><select name='zhiwu' id='zhiwu'  onblur=\"this.className='blur';checkIsStrEmpty(this);\">"
	+ "<option value=''></option>"
	+ "</select></td>"
	+ "<td align='left'></td>"
	+ "<td align='right'>"
	+ "职称"// 员工职务
	+ ":</td>"
	+ "<td><input type='text' name='title' id='title' onblur=\"this.className='blur';\" class='blur'  /></td>"
	+ "<td align='left'></td>"
	+ "<td align='right'>"
	+ "学历"// 员工职务
	+ ":</td>"
	+ "<td><input type='text' name='xueli' id='xueli' onblur=\"this.className='blur';\" class='blur'  /></td><td></td>"
	+ "</tr>"
	+ "<tr>"
	+ "<td align='right'>"
	+ "联系电话"// 联系电话
	+ ":</td>"
	+ "<td align='left'><input type='text' name='dianhua' id='dianhua' onblur=\"this.className='blur';checkIsTel(this)\" maxlength=11 class='blur' /></td>"
	+ "<td align='left'>&nbsp;</td>"
	+ "<td align='right'>"
	+ "身份证"// 身份证
	+ ":</td>"
	+ "<td align='left' colspan='4'><input type='text' name='sfzh' id='sfzh' onblur=\"this.className='blur'\"  class='blur'  /></td>"
	+ "<td align='left'>&nbsp;</td>" + "</tr>" + "</table>";
	var UpdateUserTable = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='10%' height='46' align='right'>"
			+ "图片上传"// 图片上传
			+ ":</td>"
			+ "<td width='40%'>"
			+ "<div class='searchfile'>"
			+ "<input type='file' style='display:none' name='yg_photo' id ='yg_photo' class='filed' onchange=\"onChange_YgPicPath('"
			+ contextPath
			+ "/publish/yuangong/updateYuanGong.htm','updateYuanGongForm');\" />"
			+ "<div class='fieldstyle'><input type='text' name='txt_fieldstyle' id='txt_fieldstyle' class='fieldtext'/></div>"
			+ "<div class='buttonstyle'><input type='button'  id='btn_yuyan' class='fieldbutton'/></div>"
			+ "</div>"
			+ "</td>"
			+ "<td width='10%' align='right'>"
			+ "电子邮件"// 电子邮件
			+ ":</td>"
			+ "<td width='39%'><input type='text' name='ygemail' id='ygemail' onblur=\"this.className='blur';checkIsMail(this)\"  class='blur'  /></td>&nbsp;"
			+ "<td></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right'>"
			+ "家庭住址"// 家庭地址
			+ ":</td>"
			+ "<td colspan='3' align='left'><input type='text' name='jtdz' id='jtdz' onblur=\"this.className='blur'\"  class='blur'  /></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right'>"
			+ "个人简介"// 个人简介
			+ ":</td>"
			+ "<td colspan='3' align='left'><textarea name='jianjie' onblur=\"this.className='blur'\"  class='blur' id='jianjie' cols='45' rows='4'></textarea></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td colspan='4'><fieldset class='fieldsetsytle' id ='addUser' name='addUser'>"
			+ "<legend>"
			+ "<input type='checkbox' name='adduserform' id='adduserform'  />"
			+ "&nbsp;"
			+ "修改用户信息"// 修改用户信息
			+ " </legend>"
			+ "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='15%' align='right' nowrap='nowrap'>"
			+ "登录名"// 登录名
			+ ":</td>"
			+ "<td width='33%'><input type='text' name='uid' id='uid' onblur=\"this.className='blur'\" class='blur'   /></td>"
			+ "<td width='1%' align='right' nowrap='nowrap'><span class='required'>*</span></td>"
			+ "<td width='17%' align='right' nowrap='nowrap'>"
			+ "电子邮件"// 电子邮件
			+ ":</td>"
			+ "<td width='33%'><input type='text' name='email' id='email' onblur=\"this.className='blur'\"  class='blur'  /></td>"
			+ "<td width='1%'></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td align='right'>"
			+ "角色"// 角色
			+ ":</td>"
			+ "<td class='fieldsettd'><select name='jiaose' id= 'jiaose'  onblur=\"this.className='blur'\">"
			+ "<option value=''></option>"
			+ "</select></td>"
			+ "<td align='right'><span class='required'>*</span></td>"
			+ "<td></td>"
			+ "<td></td>"
			+ "</tr>"
			+ "</table>"
			+ "</fieldset></td>" + "</tr>" + "</table>";
	var hiddenId = "<input type='hidden' id='id' name='id' >";
	var updateYuanGongForm = $("<form/>").attr("id", "updateYuanGongForm")
			.attr("action",
					contextPath + "/publish/yuangong/updateYuanGong.htm").attr(
					"enctype", "multipart/form-data").attr("method", "post");
	$(updateYuanGongForm).append(YgTable).append(UpdateUserTable);
	var div_openbutton = $("<div/>").attr("id", "div_openbutton").attr("class",
			"openbutton").appendTo(updateYuanGongForm);// 底部div
	var div_openbutton_html = "<a href='javascript:ajaxUpdateYuanGongForm();'><span class='advsumit'></span>"
			+ "提交"// 提交
			+ "</a>"
			+ "<a href='javascript:resetYuanGongFormUpdate()'><span class='advreset'></span>"
			+ "重置"// 重置
			+ "</a>";
	$(div_openbutton_html).appendTo(div_openbutton);
	$(hiddenId).appendTo(updateYuanGongForm);
	$(updateYuanGongForm).oimsDialog({
		icon : "edit",
		title : "修改",
		width : 700,
		height : 440,
		drag : false,
		locked : true,
		winType : 4,
		button : null
	});

	// fieldset=addUser
	utilTool().fdisabled("#addUser");// 页面元素不可用
	// type="checkbox" name=adduserform
	if (hasYhQx(oimsCategory.YUANGONG_XIUGAIYONGHUQUANXIAN)) {// 表示没有用户修改权限
		$("#adduserform").attr("disabled", false);
	}
	$("#adduserform").click(function() {
		if (this.checked) {
			utilTool().fundisabled("#addUser");
		} else {
			utilTool().fdisabled("#addUser");
			$("#adduserform").attr("disabled", false);
		}
	});
	// 添加生日点击事件
	calendarFun("shengri");
	// 获取员工信息
	var dataYuanGong = getJSONData("/publish/yuangong/findYuanGongByID.htm", {
		id : objData.id
	}, "post").obj;
	fillYuanGongInfo(dataYuanGong);// 员工信息赋值
	// 若查到用户信息则赋值
	var dataUser = getJSONData("/publish/yuangong/findUserByGh.htm", {
		gh : dataYuanGong.gonghao
	}, "post");
	if (dataUser.state) {
		fill2UserInfo(dataUser.obj);
	} else {
		utilTool().fdisabled("#addUser");
	}
	$.customfile('fieldbutton', 'filed', 'fieldtext', "openWin");
}
// 提交修改form
function ajaxUpdateYuanGongForm() {
	$("#updateYuanGongForm").ajaxForm(
			{
				beforeSend : updateYGFormValidate,
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
						$.oimsSucc("单位信息修改成功", function() {
							seniorYgSearchSubmit();
							removeDiv_openWin();
						});
					else
						$.oimsError("单位信息修改失败", function() {
							seniorYgSearchSubmit();
							removeDiv_openWin();
						});

				}
			});
	$("#updateYuanGongForm").submit();
}
// 为员工赋值
function fillYuanGongInfo(yg) {
	$("#id").val(yg.id);
	$("#xingming").val(yg.xingming);
	utilTool().radioSelect('xingbie', yg.xingbie, $("#updateYuanGongForm"));
	$("#yggonghao").val(yg.gonghao);
	if (yg.shengri != null)
		$("#shengri").val(formatDateTime(yg.shengri.time).split(" ")[0]);
	getBuMen2Info();// 部分信息
	selectItemByValue("bumenId", yg.bumenId);
	// 获取员工办公室信息
//	getNoClickBgsInfo();
//	selectItemByValue("bgsId", yg.bgsId);
//	getBgsInfo();
	getYuangongFenlei(yg.category);
	getZhiWu2Info();
	selectItemByValue("zhiwu", yg.zhiwu);
	$("input#title").val(yg.title);
	$("input#xueli").val(yg.xueli);
	$("#dianhua").val(yg.dianhua);
	$("#sfzh").val(yg.sfzh);
	$("#ygemail").val(yg.email);
	$("#jtdz").val(yg.jtdz);
	$("#jianjie").val(yg.jianjie);
	$("#yg_pic").attr(
			"src",
			yg.photo == "" ? contextPath + "/images/pople.png" : contextPath
					+ yg.photo);
}

// 为用户赋值
function fill2UserInfo(user) {
	$("#uid").val(user.uid);
	$("#email").val(user.email);
	// 为角色赋值
	getRole2Info();
	selectItemByValue("jiaose", user.jiaose);
}

function updateYGFormValidate() {
	if (!ygValidate())
		return false;
	if ($("#adduserform").attr("disabled") != "disabled") {
		// 验证begin
		var oValidataData = {
			nullValidataData : {
				'uid' : '登录名为空',
				'jiaose' : '角色信息为空'
			}
		};
		var sReturn = fnFormValidata(oValidataData);
		if (sReturn != null) {
			$.oimsAlert(sReturn);
			return false;
		}
		var data = getJSONData("/publish/user/hasUid.htm", {
			uid : $("#uid").val(),
			tag : Math.random()
		}, "post");
		// 登录名重复验证
		if (data.obj != null && data.obj.gonghao != $("#yggonghao").val()) {
			$.oimsAlert("登录名重复请修改登录名");
			return false;
		}
		// 验证end
	}
	return true;
}
// 修改员工重置(整理)
function resetYuanGongFormUpdate() {
	var dataObjects = getCheckBoxValue();
	// 为员工赋值
	var data = getJSONData("/publish/yuangong/findYuanGongByID.htm", {
		id : dataObjects[0].id,
		tag : Math.random()
	}, "post");
	if (data.obj != null) {
		var yuangong = data.obj;
		fillYuanGongInfo(yuangong);// 员工信息赋值
	}
	// 修改当前用户，为其赋值。
	var data2 = getJSONData("/publish/yuangong/findUserByGh.htm", {
		gh : $("#yggonghao").val()
	}, "post");
	if (data2.state) {
		fill2UserInfo(data2.obj);
	} else {
		utilTool().fdisabled("#addUser");
	}

}
// 员工信息删除（整理）
function delYuanGong() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择一条需要删除的员工信息");
		return;
	}
	$.oimsConfirm({
		strTitle : "确认删除该员工信息",
		remove_length : true
	}, doDelYuanGong);

}

// 执行员工信息删除操作(整理)
function doDelYuanGong() {
	var dataObjects = getCheckBoxValue();
	var id = dataObjects[0].id;
	var gonghao = dataObjects[0].gh;
	var url_findBaogaoMobansByBaogaoMoban = "/publish/baogaomoban/findBaogaoMobansByBaogaoMoban.htm";// 根据报告模板对象查询报告模板
	var data_obj_findBaogaoMobansByBaogaoMoban = getJSONData(
			url_findBaogaoMobansByBaogaoMoban, {
				gonghao : gonghao,// 工号
				tag : Math.random()
			}, "post").obj;// 报告模板对象
	if (data_obj_findBaogaoMobansByBaogaoMoban.length != 0) {
		$.oimsAlert("报告模板中引用该工号信息");
		return;
	}
	var url_findBaogaosByBaogao = "/publish/baogao/findBaogaosByBaogao.htm";// 根据报告对象查询符合条件的报告对象集合
	var data_obj_findBaogaosByBaogao = getJSONData(url_findBaogaosByBaogao, {
		bgys : gonghao,// 报告医生
		tag : Math.random()
	}, "post").obj;// 报告模板对象
	if (data_obj_findBaogaosByBaogao.length != 0) {
		$.oimsAlert("报告中引用该工号信息");
		return;
	}
	// 其他相关验证begin

	// 其他相关验证end
	var url_deleteYuanGongById = "/publish/yuangong/deleteYuanGongById.htm";
	var data_deleteYuanGongById = getJSONData(url_deleteYuanGongById, {
		id : id,
		tag : Math.random()
	}, "post");
	if (data_deleteYuanGongById.state)
		$.oimsSucc("员工信息删除成功", function() {
			seniorYgSearchSubmit();
			removeDiv_openWin();
		});
	else
		$.oimsError("员工信息删除失败", function() {
			seniorYgSearchSubmit();
			removeDiv_openWin();
		});

}

// 高级查询员工窗口
function advSearchYuanGong() {
	if ($("#seniorSearch").length == 0) {
		var seniorSearchTemplate = " <table width='100%' border='0' cellspacing='0' cellpadding='0'>"
				+ " <tr>"
				+ "  <td width='2%' style='text-align:right' nowrap>"
				+ "姓名"
				+ ":</td>"
				+ " <td width='12%'><input type='text' name='search_xingming'   id='search_xingming'   onblur=\"this.className='blur'\"  class='blur' /></td>"
				+ "  <td width='3%' style='text-align:right' nowrap>"
				+ "职务"
				+ ":</td>"
				+ " <td width='12%'><select id='search_zhiwu' name='search_zhiwu'  onblur=\"this.className='blur';checkIsStrEmpty(this);\">"
				+ " <option value=''></option>"
				+ " </select></td>"
				+ " <td width='5%' style='text-align:right' nowrap>"
				+ "联系电话"
				+ ":</td>"
				+ " <td width='13%'><input type='text' name='search_dianhua'   id='search_dianhua'   onblur=\"this.className='blur'\"  class='blur' /></td>"
				+ " <td width='3%' style='text-align:right' nowrap>"
				+ "身份证"
				+ ":</td>"
				+ " <td width='13%'><input type='text' name='search_sfzh'   id='search_sfzh'   onblur=\"this.className='blur'\"  class='blur' /></td>"
				+ " </tr>"
				//-------
				+ " <tr>"
				+ "  <td width='2%' style='text-align:right' nowrap>"
				+ "职称"
				+ ":</td>"
				+ " <td width='12%'><input type='text' name='search_title'   id='search_title'   onblur=\"this.className='blur'\"  class='blur' /></td>"
				+ "  <td width='3%' style='text-align:right' nowrap>"
				+ "学历"
				+ ":</td>"
				+ " <td width='12%'><input type='text' name='search_xueli'   id='search_xueli'   onblur=\"this.className='blur'\"  class='blur' /></td>"
				+ " <td width='5%' style='text-align:right' nowrap>"
				+ "在职状态"
				+ ":</td>"
				+ " <td width='12%'><select id='search_leaveOffice' name='search_leaveOffice'  onblur=\"this.className='blur';checkIsStrEmpty(this);\">"
				+ " <option value=''></option>"
				+ " </select></td>"
				+ " </tr>"
				//--------
				+ " </table>"
				+ " <div class='avdopenbutton' >"
				+ " <a href='javascript:seniorYgSearchSubmit();'><span class='advsumit'></span>"
				+ "提交"
				+ "</a>"
				+ " <a href='javascript:seniorYgSearchReset();'><span class='advreset'></span>"
				+ "重置"
				+ "</a>"
				+ "<a id = 'closeId'><span class='close' ></span>"
				+ "关闭"
				+ "</a>" + " </div> ";
		$.oimsBox({
			parentDiv : "advquery",// 将生成内容添加的id
			divContent : seniorSearchTemplate
		// 需要添加的内容
		});
		var data = getJSONData("/publish/category/findCategorysByFatherId.htm",
				{
					fatherid : oimsCategory.DOCTOR_JOB,
					tag : Math.random()
				}, "post");
		if (data.state) {
			ZhiwuList = data.obj;
			$("<option value = false>在职</optin><option value = true>离职<option>").appendTo("#search_leaveOffice") ;
			$.each(ZhiwuList, function(i, d) {
				$(
						"<option value='" + d.category + "'>" + d.category
								+ "</option>").appendTo("#search_zhiwu");
			});
		}
	}
}

// 高级查询（整理）
function seniorYgSearchSubmit() {
	var data_search = {};
	var search = $("#search_xingming_zhiwu").val().indexOf("请输入") != -1 ? ""
			: $("#search_xingming_zhiwu").val();
	var xingming = $("#search_xingming").length == 1 ? $("#search_xingming")
			.val() : "";
	var zhiwu = $("#search_zhiwu").length == 1 ? $("#search_zhiwu").val() : "";
	var dianhua = $("#search_dianhua").length == 1 ? $("#search_dianhua").val()
			: "";
	var sfzh = $("#search_sfzh").length == 1 ? $("#search_sfzh").val() : "";
	//--------------------------------
	var leaveOffice = $("#search_leaveOffice").length==1?$("#search_leaveOffice").val():"" ;
	var xueli = $("#search_xueli").length==1 ? $("#search_xueli").val():"" ;
	var title = $("#search_title").length==1 ? $("#search_title").val():"" ;
	//--------------------------------
	data_search = {
		search : search,// 员工姓名职务
		xingming : xingming,// 姓名
		zhiwu : zhiwu,// 职务
		dianhua : dianhua,// 电话
		sfzh : sfzh,
		// 身份证
		//--------------------------------
		leaveOffice:leaveOffice,//在职与否
		xueli:xueli,//学历
		title:title//职称
		//--------------------------------
	};
	$.extend(listFactor.data, data_search);
	$("#pageList").createPageList(listFactor);
}

function seniorYgSearchReset() {
	$("#search_xingming").val("");
	$("#search_zhiwu").val("");
	$("#search_dianhua").val("");
	$("#search_sfzh").val("");
}

// 员工图片路径改变的方法(整理)
function onChange_YgPicPath(action_form, id_form) {
	$("#" + id_form)[0].action = contextPath
			+ "/publish/yuangong/upLoadYgPic.htm";
	$("#" + id_form).ajaxSubmit(
			{
				dataType : "json",
				iframe : true,
				beforeSend : function() {
				},
				uploadProgress : function() {
				},
				complete : function(data_Result) {
					$("#" + id_form)[0].action = action_form;
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
						if (data_obj != null && data_obj != "") {
							dengbisuofang.pic_dengbi("yg_pic", contextPath
									+ data_obj);
						}
					} else
						$.oimsAlert("图片上传失败");
				}
			});
}

function yuangongLizhi(){
	var result = getCheckBoxValue();
	if(result.length!=1){
		$.oimsAlert("请选择一个要操作的员工！");
	}
	var state = result[0].leaveOffice;
	var msg = !state?"该员工已离职？":"该员工还在职？";
	$.oimsConfirm(msg, function(){
		var re = getJSONData("/publish/yuangong/setYuangGongLizhi.htm",{id:result[0].id,lizhi:!state},"POST");
		if(!re.state){
			$.oimsError("设置员工离职状态失败！");
			return;
		}
		$("#pageList").remove();
		showList_YuanGong();
	});
	
}

function yuangongJianliView(btns){
	var result = getCheckBoxValue();
	if(result.length!=1){
		$.oimsAlert("请选择一个要查看的员工！");
		return;
	}
	//------需要查询当前登陆用户的权限，如果是管理员权限则可以查看所有人的，如果不是则只能查看自己的
	var data = getJSONData("/publish/user/findUserQXByGongHao.htm", {
		tag : Math.random()
	},'POST');
	if (data.state==1){
		if(data.obj.jiaose==1){//是管理员
		}else {
			if(data.obj.gonghao!=result[0].gh){
				$.oimsAlert("对不起,您所在的角色组不能查看其他人的简历", null);
				return ;
			}
		} 
	}else{
		$.oimsAlert("系统错误,请联系管理员", null);
		return ;
	}
	
	importJS("/js/manager/yuangong/jianli.js");
	showYuangongJianli(result[0].gh,false,btns);
}

function yuangongJianli(btns){
	var result = getCheckBoxValue();
	if(result.length!=1){
		$.oimsAlert("请选择一个要操作的员工！");
		return;
	}
	
	//------需要查询当前登陆用户的权限，如果是管理员权限则可以查看所有人的，如果不是则只能查看自己的
	var data = getJSONData("/publish/user/findUserQXByGongHao.htm", {
		tag : Math.random()
	},'POST');
	if (data.state==1){
		if(data.obj.jiaose==1){//是管理员
		}else {
			if(data.obj.gonghao!=result[0].gh){
				$.oimsAlert("对不起,您所在的角色组不能编辑其他人的简历", null);
				return ;
			}
		} 
	}else{
		$.oimsAlert("系统错误,请联系管理员", null);
		return ;
	}
	importJS("/js/manager/yuangong/jianli.js");
	importCSS("/css/jquery.datetimepicker.css");
	importJS("/js/jquery.datetimepicker.js");
	showYuangongJianli(result[0].gh,true,btns);
}