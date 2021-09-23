/**
 * 数据备份开始页面 GuoBaoqiang
 */
function showDataBackup() {
	// 第一部分title
	pageTitle = data_language.DataRestor;
	init();
	// 第二部分list
	var div_list = $("<div/>").attr("id", "div_list")
			.attr("class", "listquery").appendTo("#right");
	var table_validate = "";
	table_validate = "<table width='80%' border='0' align='center' cellpadding='0' cellspacing='0' class='dataexport'>"
			+ "<tbody>"
			+ "<tr>"
			+ "<td width='25'%></td>"
			+ "<td width='7%'>"
			+ data_language.UserName
			+ ":</td>"
			+ "<td width='13%'><input type='text' name='loginName'   id='loginName'   onblur=\"this.className='blur';checkIsStrEmpty(this);\"  class='blur' /></td>"
			+ "<td width='35'% ></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td></td>"
			+ "<td nowrap='nowrap'>"
			+ data_language.Password
			+ ":</td>"
			+ "<td><input type='password' name='password'   id='password'   onblur=\"this.className='blur';checkIsStrEmpty(this);\"  class='blur' /></td>"
			+ "<td></td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td></td>"
			+ "<td></td>"
			+ "<td></td>" + "<td></td>" + "</tr>" + "</table>";
	$(table_validate).appendTo("#div_list");
	var div_list_backup = $("<div/>").attr("id", "div_list_backup").attr(
			"class", "backup").appendTo("#div_list");
	$(div_list_backup).html("<p>" + data_language.ServerIsOut + "</p>");

	// 进度条
	var progressbar = $("<div/>").attr("id", "progressbar").appendTo("#right");

	var div_class = $("<div/>").attr("class", "ui-corner-left").appendTo(
			"#progressbar");

	// 第三部分sumitbutton
	var div_sumitbutton = $("<div/>").attr("id", "div_sumitbutton").attr(
			"class", "sumitbutton").appendTo("#right");
	var div_sumitbutton_htm = "<a href='javascript:backupData();' align='center'><span class='backupbtn'></span>备份</a>";
	$(div_sumitbutton_htm).appendTo(div_sumitbutton);
	$("#progressbar").hide();
	/***
	 * 添加回车键事件,在页面打开时就对事件进行注册监听。
	 */
	 $("#password").keyup(function(e){
			if(e.which == 13){
				backupData();
			}
		});
}
function backupData() {
	if ($("#loginName").val() == "" || $("#password").val() == "") {
		$.oimsAlert(data_language.InputUsernamepassword);
		return false;
	}
//	 $("#password").keyup(function(e){
//		 alert(1);
//		 alert(e.keycode);
//			if(e.keycode == 13)executeBackup();
//		});
		executeBackup();
}
/***
 * 执行备份，添加了回车键
 */
function executeBackup(){

	var arr = new Array($("#loginName").val(), $("#password").val());
	var url = "/publish/oims_data_backup/backupOimsdata.htm";
	var list = arr[0] + "," + arr[1];

	var data = getJSONData(url, {
		list : list,
		tag : Math.random()
	}, "post");
	if (data.state == 1) {
	
//		$.oimsSucc(data_language.backupSucc);
//		$("#processId").remove();
	    $("#password").val("");
		$("#progressbar").show();
		progressFun();
//		$.oimsAlert(data_language.backupSucc);
		/**
		 * 用来下载txt的东东，主要用于form提交
		 */
	} else{
		$.oimsAlert(data.message);
//		$("#processId").remove();
	    $("#password").val("");
	}
	 
}
function progressFun() {
	var i = 0;
	var length = 5;
	setInterval(function() {
		i += 1;
		if (i <= length) {
			progressbarFun((100 / length) * i);
		} else {
			return;
		}
	}, 100);
}
function progressbarFun(value) {
	$(".ui-corner-left").css("width", value + "%");
	if (value == 100) {
		$.oimsSucc(data_language.backupSucc);
		$("#progressbar").css("display", "none");
	}

}
function omis_JiaZaiBackup(){
	var innerHtml = '<div id = "processId" style = "top: 0px;left: 0px;position: absolute;width: 100%;height: 100%;z-index: 29;background-color: rgb(204, 204, 204);opacity: 0.6;"><table border="0" cellspacing="0" cellpadding="0" width="100%" height="100%">'
		+ '<tr>'
		+ '<td align="center" valign="middle" style ="font-size: 20px;font-weight: bolder;color:red;">'
		+ '&nbsp;&nbsp;'+data_language.Processing+'....'+ '</td>' + '</tr>' + '</table><div>';
	$(document.body).append(innerHtml);
}

