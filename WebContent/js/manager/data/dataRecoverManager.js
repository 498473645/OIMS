/**
 * 数据恢复开始页面 GuoBaoqiang
 */
function showDataRecover(btns) {
	// 第一部分title
	pageTitle = data_language.DataRecover;
	init();
	// 第二部分advquery
	var div_advquery = $("<div/>").attr("id", "div_advquery").attr("class",
			"advquery").appendTo("#right");
	// advquery的table
	var div_advquery_table = "";
	div_advquery_table += "  <table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='9%'></td>"
			+ "<td width='59%' >"
			+ "<div class='btn'>"
			+ "<a onclick='return false;' href='javascript:downLoad();'><span class='downa'></span>"
			+ data_language.DownLoad
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:openRestoreDialog();'><span class='restorea'></span>"
			+ data_language.Recover
			+ "</a>"
			+ "<a onclick='return false;' href='javascript:del();'><span class='dela'></span>"
			+ data_language.Del
			+ "</a>"
			+ "</div>"
			+ "</td>"
			+ "</tr>"
			+ "</table>";
	$(div_advquery_table).appendTo("#div_advquery");
	btnProwerConfig(btns);// 按钮加上权限
	// 第三部分list
	listFactor = {

		listObj : [ {
			title : data_language.Seria,
			key : "id"
		}, {
			title : data_language.BackupFiles,
			key : "path"
		}, {
			title : data_language.ShengChengSJ,
			key : "time"
		} ],
		url : contextPath + "/publish/oims_data_backup/findAllDataFiles.htm",// url
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : 15,// Page类的方法
			tag : Math.random()
		}
	};
	var div_list = $("<div/>").attr("id", "div_list").attr("class", "list")
			.appendTo("#right");
	$(div_list).createPageList(listFactor);
}

/**
 * 页面刷新
 */
function flush_dataRecover() {
	$("#div_list").remove();
	listFactor = {

		listObj : [ {
			title : data_language.Seria,
			key : "id"
		}, {
			title : data_language.BackupFiles,
			key : "path"
		}, {
			title : data_language.ShengChengSJ,
			key : "time"
		} ],
		url : contextPath + "/publish/oims_data_backup/findAllDataFiles.htm",// url
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : 15,// Page类的方法
			tag : Math.random()
		}
	};
	var div_list = $("<div/>").attr("id", "div_list").attr("class", "list")
			.appendTo("#right");
	$(div_list).createPageList(listFactor);
}
/**
 * 定义删除函数
 */
function del() {
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert(data_language.CheckOneItem_Alert);
		return;
	}
//	$.oimsConfirm({strTitle:data_language.IsConfirmDelBakUp,remove_length:true}, doDelBanGongShi);
	$.oimsConfirm({strTitle:data_language.IsConfirmDelBakUp,remove_length:true}, function() {

		var url_del = "/publish/oims_data_backup/delrecoverInfo.htm";
		var data = getJSONData(url_del, {
			path : dataObjects[0].path,
			tag : Math.random()
		}, "post");
		if (data.state == 1) {
			flush_dataRecover();
			$.oimsSucc(data_language.DelOK_Alert);
		}
	});

}
/**
 * 定义下载函数
 */
function downLoad() {
	var dataObject = getCheckBoxValue();
	if (dataObject.length == 0) {
		$.oimsAlert(data_language.CheckOneItem_Alert);
	}
	// alert(dataObject[0].id);
	var u = contextPath + "/publish/oims_data_backup/downFile.htm";
	var f = $("<form id='fileDown' action='" + u + "' method='post' />");
	f.append("<input type='hidden' name='id' value='" + dataObject[0].id
			+ "' />");
	f.appendTo("body");
	f.get(0).submit();
	$("#fileDown").remove();
}
/**
 * 还原弹出窗口
 */
function restoreTab() {
	var v = "<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody>"
			+ "  <tr>"
			+ "    <td align=\"right\" nowrap=\"nowrap\" >"
			+ data_language.UserName
			+ ":</td>"
			+ "    <td width='35%'><input type='text'name=\"username\" id=\"username\" onblur=\"this.className='blur';checkIsStrEmpty(this);\"  class='blur'></td>"
			+ "    <td align=\"right\" nowrap=\"nowrap\"  >"
			+ data_language.Password
			+ ":</td>"
			+ "    <td width='35%'><input type='password' id='password' name='password' onblur=\"this.className='blur';checkIsStrEmpty(this);\" class='blur'/></td>"
			+ "  </tr>" + "</tbody></table>";
	var rt = $(v);
	rt.append($("<input type='hidden' />").attr({
		name : "id",
		id : "id"
	}));
	return rt;
};

/**
 * 打开还原窗口
 */
function openRestoreDialog() {
	var dataObj = getCheckBoxValue();
	if (dataObj.length == 0) {
		$.oimsAlert(data_language.CheckOneItem_Alert);
		return;
	}
	var restoreTable = restoreTab();
	// 定义form进行表单封装
	var recoverForm = $("<form/>").attr("id", "restoreSure").attr("action",
			contextPath + "/publish/oims_data_backup/recoverOimsdata.htm")
			.attr("method", "post");
	restoreTable.appendTo(recoverForm);
	var recover_openbutton = $("<div/>").attr("id", "recover_openbutton").attr(
			"class", "openbutton").appendTo(recoverForm);// 底部div
	var recover_openbutton_html = "<a href='javascript:restoreSubmit();'><span class='advsumit'></span>"
			+ language.Submit
			+ "</a> "
			+ " <a href='javascript:resetRestoreForm()'><span class='advreset'></span>"
			+ language.Reset + "</a>";
	$(recover_openbutton_html).appendTo(recover_openbutton);
	$(recoverForm).oimsDialog({
		icon : "restore",
		title : data_language.Recover,
		width : 480,
		height : 150,
		drag : false,
		locked : true,
		winType : 4,
		button : null
	});
	$("#id").val(dataObj[0].id);
}

// 确定还原过程
function restoreSubmit() {
	$("#restoreSure").ajaxForm(
		    {
			beforeSend : restoreValidate,
			uploadProgress : function() {
			},
			complete : function(data_Result) {
				var data_pre = data_Result.responseText;
				var data_string = "";
				if (data_pre.indexOf("</pre") ==-1)
					data_string = data_pre;
				else
					data_string = data_pre.substring(data_pre.indexOf("{"),
							data_pre.indexOf("</pre"));
				var data_Obj = eval("(" + data_string + ")");
				var state = data_Obj.state;
				if(state==1){
					$("#processId").remove();
					$.oimsSucc(	data_language.RecoverOK,recover_DialogClose("restoreSure"));					
				}
				else if(state==0){
					$("#processId").remove();
					$.oimsError(data_Obj.message,recover_DialogClose("restoreSure"));
				}
					
			}
		});
$("#restoreSure").submit();
recover_DialogClose("restoreSure");
omis_JiaZaiRecover();
};
function recover_DialogClose(form_id){
	$("#" + form_id).parent().parent().remove();
	flush_dataRecover();
}
function restorePreview(){
	var dataObj = getCheckBoxValue();
	if (dataObj.length == 0) {
		$.oimsAlert(data_language.CheckOneItem_Alert);
		return;
	}
	omis_JiaZaiRecover();
	var restoreTable = restoreTab();
	var ef = oimsFormWindow({
		url : contextPath + "/publish/oims_data_backup/recoverOimsdata.htm",
		id : "restoreSure",
		dialogTitle : data_language.Recover,
		width : 480,
		height : 400,
		resetForm : resetRestoreForm,
		btnOkSuccess : function(data, responseText, statusText) {
			if (data.state == 1) {
				$("#processId").remove();
				$.oimsSucc(data_language.RecoverOK);
				ef.parent().parent().remove();
			} else if (state == 0) {
				$("#processId").remove();
				$.oimsAlert(data.message);
				ef.parent().parent().remove();
			}
		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
			$.oimsError(data_language.RecoverFail);
			ef.parent().parent().remove();
		},
		btnOkBefor : restoreValidate
	}).append(restoreTable);
	$("#id").val(dataObj[0].id);
}
function resetRestoreForm() {
	$("#username").val("");
	$("#password").val("");
};
function restoreValidate() {
	if ($("#username").val() == "" || $("#password").val() == "") {
		$.oimsAlert(data_language.InputUsernamepassword);
		return false;
	}

}
function omis_JiaZaiRecover() {
	var innerHtml = '<div id = "processId" style = "top: 0px;left: 0px;position: absolute;width: 100%;height: 100%;z-index: 29;background-color: rgb(204, 204, 204);opacity: 0.6;"><table border="0" cellspacing="0" cellpadding="0" width="100%" height="100%">'
			+ '<tr>'
			+ '<td align="center" valign="middle" style ="font-size: 20px;font-weight: bolder;color:red;">'
			+ '&nbsp;&nbsp;'+data_language.Processing+'....' + '</td>' + '</tr>' + '</table><div>';
	$(document.body).append(innerHtml);
}
