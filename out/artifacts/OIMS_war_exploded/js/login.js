var contextPath = "";
	$(function() {
		
	});
$(document).ready(function() {
	$('.beautify_input').cssSelect();
	$("#textfield10").focus();// 用户名文本框
	if ($.cookie("login_type") != null) {
		var type = $.cookie("login_type");
		var input = $.cookie("login_input");
		var pwd = $.cookie("login_password");
		$("select").val(type);
		$("#textfield10").val(input);
		$("#textfield").val(pwd);
		$("#checkbox").attr("checked", "checked");
	}
	
	// 登陆按钮绑定方法
	$(".sure").click(function() {
		login();
	});
	// 重置按钮绑定方法
	$(".reset").click(function() {
		$("#textfield10").val("");
		$("#textfield").val("");
		$("#checkbox")[0].checked = false;
	});
	// 回车键绑定事件
	$("body").keyup(function(e) {
		if (e.which == 13)
			login();
	});
});
// ====================================英文版登录页面===========================================
function oims_eng() {
	var htmlmain = '<p class="line"><img src="tbyf/images/img_07.jpg"></p>'
			+ '<a href="javascript:oims_chi()" class="change" id="oims_english">中文</a>'
			+ '<div class="user">'
			+ '<select class="beautify_input" id="oims_denglufs">'
			+ '<option value="0">UserName</option>'
			+ '<option value="1">JobNumber</option>'
			+ '</select>'
			+ '</div>'
			+ '<input type="text" class="name" id="textfield10">'
			+ '<input type="password" id="textfield" class="password">'
			+ '<label class="check">'
			+ '<input name="chkAll" type="checkbox" style="vertical-align: middle;" id="checkbox" value="" />&nbsp;Remember'
			+ '</label>'
			+ '<div class="buttongroup">'
			+ '<input type="button" class="sure" value="Login" />'
			+ '<input type="button" class="reset" value="Reset" />'
			+ '</div>';
	$(".main").html(htmlmain);
	
	// 美化select
	$('.beautify_input').cssSelect();
	
	//html界面替换后绑定事件失效重新绑定
	$(".sure").click(function() {
		login();
	});
	// 重置按钮绑定方法
	$(".reset").click(function() {
		$("#textfield10").val("");
		$("#textfield").val("");
		$("#checkbox")[0].checked = false;
	});
}
function oims_chi() {
	var htmlmain = '<p class="line"><img src="tbyf/images/img_07.jpg"></p>'
			+ '<a href="javascript:oims_eng()" class="change" id="oims_english">English</a>'
			+ '<div class="user">'
			+ '<select class="beautify_input" id="oims_denglufs">'
			+ '<option value="0">用户名</option>'
			+ '<option value="1">工号</option>'
			+ '</select>'
			+ '</div>'
			+ '<input type="text" class="name" id="textfield10">'
			+ '<input type="password" id="textfield" class="password">'
			+ '<label class="check">'
			+ '<input name="chkAll" style="vertical-align: middle;" type="checkbox" id="checkbox" value="" />&nbsp;记住密码'
			+ '</label>' + '<div class="buttongroup">'
			+ '<input type="button" class="sure" value="登录" />'
			+ '<input type="button" class="reset" value="重置" />'
			+ '</div>';
	$(".main").html(htmlmain);

	// 美化select
	$('.beautify_input').cssSelect();
	
	//html界面替换后绑定事件失效重新绑定
	$(".sure").click(function() {
		login();
	});
	// 重置按钮绑定方法
	$(".reset").click(function() {
		$("#textfield10").val("");
		$("#textfield").val("");
		$("#checkbox")[0].checked = false;
	});
}

/** *************************************************登陆方法begin*************************************************** */
function login() {
	var type = $("select").val();// 登陆方式0=用户名登陆,1=用户ID登陆
	var input = $("#textfield10").val();// 用户名或者用户ID
	if (input == "") {
		$("#textfield10").focus();
		return false;
	}
	var password = $("#textfield").val();// 密码输入框的值
	if (password == "") {
		$("#textfield").focus();
		return false;
	}
	// sendPost 在common.js里面
	sendPost("publish/user/userLogin.htm", {
		loginType : type,
		input : input,
		pwd : password
	}, function (result) {
		if (result != null && result.state) {// js隐身转换非0即为真
			if (document.getElementById('checkbox').checked) {
				$.cookie("login_type", type, {
					expires : 365
				});
				$.cookie("login_input", input, {
					expires : 365
				});
				$.cookie("login_password", password, {
					expires : 365
				});
			} else {
				$.cookie("login_type", null);
				$.cookie("login_input", null);
				$.cookie("login_password", null);
			}
			// location.href = "publish/index.htm";
			if (navigator.appName.indexOf('Microsoft Internet Explorer') != -1) {
				var parentWindow = window.open('publish/index.htm', '',
						'fullscreen=0,channelmode=1,resizable=yes');// channelmode=yes,fullscreen=1,resizable=1,location=no,menubar=no,status=no,titlebar=no
				window.opener = null;
				window.open("", "_self");
				window.close();
				return;
			}
			location.href = "publish/index.htm";//首页
        } else {
        	alert(result.obj);
        }
    });
}
/** *************************************************登陆方法end*************************************************** */
