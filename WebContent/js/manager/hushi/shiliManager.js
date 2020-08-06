// 初始化页面
var ShiLi;
function showShiLiList(btns) {
	pageTitle = hushi_language.ShiLiGL;
	init();
	$("<div/>").attr("id", "advquery").addClass("advquery").appendTo("#right");
	var ShiLiTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='23%' class='leftalign' ><input name='search' type='text' class='blurview' id='search' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"
			+ "请输入姓名或病历号"
			+ "' size='28' /></td>"
			//class='search'起到了一个查找的增加框框的用用
			+ "<td width='9%'><a  href='javascript:queryShiLi();' class='search'>"+"查询"+"</a></td>"
			+ " <td width='9%'></td>"
			+ "<td width='59%' >"
			+ "<div class='btn'>"
			+ "<a onclick='return false;'  href='javascript:addShiLi();'><span class='adda'></span>"+hushi_language.LuRu+"</a>"
//			+ "<a disabled  href='javascript:editShiLi();'><span class='edita'></span>"+hushi_language.Modify+"</a>"
			+ "</div>" + "</td>" + "</tr>" + "</table>";
	$(ShiLiTemplate).appendTo("#advquery");
	
	$("#search").click(function() {
		clearInitQuery(this);
	});// 点击清空输入框文字
	//当在搜索框什么都不输入的情况下，取消焦点，那么在搜索框中再次添加默认信息
	$("#search").blur(function() {
		if (this.value == "") {
			$("#search").val( "请输入姓名或序列号");
			$("#search").addClass("blurview");
		}

	});
	
	btnProwerConfig(btns);//按钮加上权限
	listFactor = {
		listObj : [/* {
			title : language.Seria,
			key : "id"
		},  */
		 {
			title : data_language.Jcdh,
			key : "jcdh"
		},
		         
		{
			title: "病历号",
			key : "blh"
			
		},
		{
			title: "姓名",
			key : "xm"
			
		},
		{
			title: "性别",
			key : "xb",
			func : function(value) {
					return (value == 1) ? "女"
							: "男";
				}
		},
		{
			title: "出生日期",
			key : "sr",
			func:function(value){return value.toString().substring(0,11);}
			
		},
		{
			title : data_language.sfJC,
			key : "biaoshi",
			func:function (value){
				return (value==56)?data_language.YiJianCha:data_language.wJC;
			}
		},
		{
			// tinyint类型变量
			title : hushi_language.LeftEyeLuoShi,
			key : "ll"
		}, {
			title :hushi_language.LeftEyeJiaoZhen,
			key : "ljz"
		// varchar
		}, {
			// varchar类型变量
			title : hushi_language.LeftEyeJingShi,
			key : "lj"
		// varchar
		}, {
			title : hushi_language.RightEyeLuoShi,
			key : "rl"
		}, {
			title : hushi_language.RighEyeJiaoZhen,
			key : "rjz"
		}, {
			title : hushi_language.RighEyeJingShi,
			key : "rj"
		}
		, {
			title : hushi_language.JcYs,
			key : "jcys"
		}
		, {
			title : hushi_language.JCSJ,
			key : "jcsj"
		}
],
		url : contextPath + "/publish/hushi/findAllShiLiByPage.htm",// url
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

	$(div_list).createPageList(listFactor);// ????
	

}

function addShiLi() {
    var dataObj=getCheckBoxValue();
    if(dataObj.length==0){
    	$.oimsAlert(hushi_language.CheckOneItem_Alert);
    	return ;
    }
    var table_jiben = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
		+ "<tr>"
		+"<td width='8%'></td>"
		+ "<td width='19%' align='center'  class='sl'>"+"</td>"
		+ "<td width='7%' align='right' nowrap='nowrap'>姓名"+":</td>"
		+ "<td width='19%' align='left'><input type='text' name='xingming' size='20' id='xingming' disabled=true/></td>"
		+ "<td width='7%' align='right' nowrap='nowrap'>病历号 "+":</td>"
		+ "<td width='19%' align='left'><input type='text' name='binglihao' size='20' id='binglihao' disabled=true /></td>"
		+ "<td width='28%' align='left'>&nbsp;</td>" + "</tr>" + "</table>";

	var table_luoYan = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
			+ "<tr>"
			+"<td width='8%'></td>"
			+ "<td width='19%' align='center'  class='sl'>"+hushi_language.LuoYanShiLi+":</td>"
			+ "<td width='7%' align='right' nowrap='nowrap'>"+hushi_language.LeftEye+":</td>"
			+ "<td width='19%' align='left'><input type='text' name='ll' size='20' id='ll' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "<td width='7%' align='right' nowrap='nowrap'> "+hushi_language.RightEye+":</td>"
			+ "<td width='19%' align='left'><input type='text' name='rl' size='20' id='rl' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "<td width='28%' align='left'>&nbsp;</td>" + "</tr>" + "</table>";

	var table_jiaoZhengShiLi = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
			+ "<tr>"
			+"<td width='8%'></td>"
			+ "<td width='19%' align='center'  class='sl'>"+hushi_language.JiaoZhengShiLi+":</td>"
			+ "<td width='7%' align='right' nowrap='nowrap'>"+hushi_language.LeftEye+":</td>"
			+ "<td width='19%' align='left'><input type='text' name='ljz' size='20' id='ljz' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "<td width='7%' align='right' nowrap='nowrap'>"+hushi_language.RightEye+":</td>"
			+ "<td width='19%' align='left'><input type='text' name='rjz' size='20' id='rjz' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "<td width='28%' align='left'>&nbsp;</td>" + "</tr>" + "</table>";

	var table_JinShi = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
			+ "<tr>"
			+"<td width='8%'></td>"
			+ "<td width='19%' align='center'  class='sl'>"+hushi_language.JinShiLi+":</td>"
			+ "<td width='7%' align='right' nowrap='nowrap'>"+hushi_language.LeftEye+"</td>"
			+ "<td width='19%' align='left'><input type='text' name='lj' size='20' id='lj' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "<td width='7%' align='right' nowrap='nowrap'>"+hushi_language.RightEye+"</td>"
			+ "<td width='19%' align='left'><input type='text' name='rj' size='20' id='rj' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "<td width='28%' align='left'>&nbsp;</td>" + "</tr>" + "</table>";
	var jcd_id="<input type=hidden name='jcd_id' id='jcd_id'>";
	var f = oimsFormWindow({
		id : "form_ShiLi",
		url : contextPath + "/publish/hushi/addShiLi.htm",
		dialogTitle : hushi_language.ShiLi,
		height : 300,
		width : 600,
		resetForm : dataObj[0].biaoshi==50?resetShiLiForm:resetEditShiLiForm,
		btnOkSuccess : function(data, responseText, statusText) {
			$.oimsSucc(hushi_language.LrSucc);
			f.parent().parent().remove();
			flush_shili();  //!!!
		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
			$.oimsError(hushi_language.LrFail);

		},
		btnOkBefor : shiliFormValidate
	});
	f.append(table_jiben);
	f.append(table_luoYan);
	f.append(table_jiaoZhengShiLi);
	f.append(table_JinShi);
	f.append(jcd_id);
	$("#jcd_id").val(dataObj[0].id);
//	alert($("#jcd_id").val());
//  判断是否已检查，如果已检查，要赋值
    if(dataObj[0].biaoshi==56){
//    	alert(dataObj[0].id);
    	var date = getJSONData("/publish/hushi/getShiLiByJcd.htm", {
    		id : dataObj[0].id,
    		tag : Math.random()
    	}, "post");
    	if (date.state==1) {
    		 ShiLi = date.obj;
    		 $("#xingming").val(ShiLi.huanzhexinxi.xingming);
    		 $("#binglihao").val(ShiLi.huanzhexinxi.binglihao);
    		$("#id").val(ShiLi.shili.id);
    		$("#ll").val(ShiLi.shili.ll);
    		$("#rl").val(ShiLi.shili.rl);
    		$("#ljz").val(ShiLi.shili.ljz);
    		$("#rjz").val(ShiLi.shili.rjz);
    		$("#lj").val(ShiLi.shili.lj);
    		$("#rj").val(ShiLi.shili.rj);
    	}
    }
}
function resetShiLiForm() {
	$("#ll").val("");
	$("#rl").val("");
	$("#ljz").val("");
	$("#rjz").val("");
	$("#lj").val("");
	$("#rj").val("");
}
function resetEditShiLiForm(){
	$("#ll").val(ShiLi.ll);
	$("#rl").val(ShiLi.rl);
	$("#ljz").val(ShiLi.ljz);
	$("#rjz").val(ShiLi.rjz);
	$("#lj").val(ShiLi.lj);
	$("#rj").val(ShiLi.rj);
}
function shiliFormValidate() {
if(	$("#ll").val()==""||$("#rl").val()==""||$("#ljz").val()==""||$("#rjz").val()==""||$("#lj").val()==""||$("#rj").val()==""){
	$.oimsAlert(hushi_language.InsertAllInfo);
	return false;
}
}
function editShiLi() {
	var table_luoYan = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
			+ "<input type='hidden' id = 'id' name='id'>"
			+ "<tr>"
			+"<td width='8%'></td>"
			+ "<td width='19%' align='center'  class='sl'>"+hushi_language.LuoYanShiLi+":</td>"
			+ "<td width='7%' align='right' nowrap='nowrap'>"+hushi_language.LeftEye+":</td>"
			+ "<td width='19%' align='left'><input type='text' name='ll' size='20' id='ll' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "<td width='7%' align='right' nowrap='nowrap'>"+hushi_language.RightEye+":</td>"
			+ "<td width='19%' align='left'><input type='text' name='rl' size='20' id='rl' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "<td width='28%' align='left'>&nbsp;</td>" + "</tr>" + "</table>";

	var table_jiaoZhengShiLi = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
			+ "<input type='hidden' id = 'id' name='id'>"
			+ "<tr>"
			+"<td width='8%'></td>"
			+ "<td width='19%' align='center'  class='sl'>"+hushi_language.JiaoZhengShiLi+":</td>"
			+ "<td width='7%' align='right' nowrap='nowrap'>"+hushi_language.LeftEye+":</td>"
			+ "<td width='19%' align='left'><input type='text' name='ljz' size='20' id='ljz' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "<td width='7%' align='right' nowrap='nowrap'>"+hushi_language.RightEye+":</td>"
			+ "<td width='19%' align='left'><input type='text' name='rjz' size='20' id='rjz' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "<td width='28%' align='left'>&nbsp;</td>" + "</tr>" + "</table>";

	var table_JinShi = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
			+ "<input type='hidden' id = 'id' name='id'>"
			+ "<tr>"
			+"<td width='8%'></td>"
			+ "<td width='19%' align='center'  class='sl'>"+hushi_language.JinShiLi+":</td>"
			+ "<td width='7%' align='right' nowrap='nowrap'>"+hushi_language.LeftEye+":</td>"
			+ "<td width='19%' align='left'><input type='text' name='lj' size='20' id='lj' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "<td width='7%' align='right' nowrap='nowrap'>"+hushi_language.RightEye+":</td>"
			+ "<td width='19%' align='left'><input type='text' name='rj' size='20' id='rj' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
			+ "<td width='28%' align='left'>&nbsp;</td>" + "</tr>" + "</table>";
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert(language.CheckOneItem_Alert);
		return  false;
	}
	if (dataObjects.length >1) {
		$.oimsAlert(language.OnlyOpOneData);
		return;
	}
	var f = oimsFormWindow({
		icon : "edit",
		id : "edit_ShiLi",
		url : contextPath + "/publish/hushi/updateShiLi.htm",
		dialogTitle : hushi_language.ShiLi,
		height : 300,
		width : 600,
		resetForm : resetEditShiLiForm,
		btnOkSuccess : function(data, responseText, statusText) {
			$.oimsSucc(language.UpdateOK_Alert);
			f.parent().parent().remove();
			flush_shili();
		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
			$.oimsError(language.UpdateFail_Alert);

		},
		btnOkBefor : shiliFormValidate
	});
	f.append(table_luoYan);
	f.append(table_jiaoZhengShiLi);
	f.append(table_JinShi);
	var date = getJSONData("/publish/hushi/getShiLiByID.htm", {
		id : dataObjects[0].id,
		tag : Math.random()
	}, "post");
	if (date.state) {
		 ShiLi = date.obj;
		$("#id").val(ShiLi.id);
		$("#ll").val(ShiLi.ll);
		$("#rl").val(ShiLi.rl);
		$("#ljz").val(ShiLi.ljz);
		$("#rjz").val(ShiLi.rjz);
		$("#lj").val(ShiLi.lj);
		$("#rj").val(ShiLi.rj);
	}
}
function flush_shili(){
	$("#pageList").remove();
	listFactor = {
			listObj : [/* {
				title : language.Seria,
				key : "id"
			}, */
			{
				title : hushi_language.Jcdh,
				key : "jcdh"
			},
			{
				title: "病历号",
				key : "blh"
				
			},
			{
				title: "姓名",
				key : "xm"
				
			},
			{
				title: "性别",
				key : "xb",
				func : function(value) {
						return (value == 1) ? "女"
								: "男";
					}
			},
			{
				title: "出生日期",
				key : "sr",
					func:function(value){return value.toString().substring(0,11);}
			},
			{
				title : hushi_language.sfJC,
				key : "biaoshi",
				func:function (value){
					return (value==56)?hushi_language.YiJianCha:hushi_language.DaiJianCha;
				}
			},
			{
				// tinyint类型变量
				title : hushi_language.LeftEyeLuoShi,
				key : "ll"
			}, 
			{
				title :hushi_language.LeftEyeJiaoZhen,
				key : "ljz"
			// varchar
			}, {
				// varchar类型变量
				title : hushi_language.LeftEyeJingShi,
				key : "lj"
			// varchar
			}, {
				title : hushi_language.RightEyeLuoShi,
				key : "rl"
			}, {
				title : hushi_language.RighEyeJiaoZhen,
				key : "rjz"
			}, {
				title : hushi_language.RighEyeJingShi,
				key : "rj"
			}, {
				title : hushi_language.JcYs,
				key : "jcys"
			}, {
				title : hushi_language.JCSJ,
				key : "jcsj"
			} ],
			url : contextPath + "/publish/hushi/findAllShiLiByPage.htm",// url
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

		$(div_list).createPageList(listFactor);// ????
}
function queryShiLi() {
	var obj = {
		search : $("#search").val().indexOf("输入") != -1 ? "" : $("#search")
				.val()
	};
	$.extend(listFactor.data, obj);
	$("#pageList").createPageList(listFactor);
}