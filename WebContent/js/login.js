$(document).ready(function(){
	loginResize();
	$(window).resize(function(){
		loginResize();
	});
	if($.cookie("login_type")!=null){
		var input = $.cookie("login_input");
		var pwd = $.cookie("login_password");
		var type = $.cookie("login_type");
		$("select").val(type);
		$("#textfield10").val(input);
		$("#textfield").val(pwd);
		$("#checkbox").attr("checked","checked");
	}
	$("#textfield10").focus();//用户名文本框
	//登陆按钮绑定方法
	$($(".loginbtn a")[0]).attr("href","#").click(function(){
		login();
	});
	//重置按钮绑定方法
	$($(".loginbtn a")[1]).attr("href","#").click(function(){
		$("#textfield10").val("");
		$("#textfield").val("");
		$("#checkbox")[0].checked = false;
	});
	//回车键绑定事件
	$("body").keyup(function(e){
		if(e.which == 13)login();
	});
	//===============================下拉条函数覆盖==========================================
	$("select").change(function(){
		var type = $(this).val();
		if(type == 0){//0表示用户名登陆方式
			var str0=$("select option[value='0']").text();
			$("#yongHu_id").html("<b>"+str0+":</b>");
		}else{//工号登陆方式
			var str1=$("select option[value='1']").text();
			$("#yongHu_id").html("<b>"+str1+":</b>");
		}
	});
});
//====================================宝强加的，英文版登录页面===========================================
function oims_eng(){
		$("#oims_i18n").html("<a href='javascript:oims_chi()' id='oims_english'>中文</a>");
		$("#oims_denglufs").html("<b>LoginMode:</b>");
		$("select")[0].options.length=0;
		$("<option value='0'>UserName</option>").appendTo($("select"));
		$("<option value='1'>JobNumber</option>").appendTo($("select"));
		$("#yongHu_id").html("<b>UserName:</b>");
		$("#yongHu_pw").html("<b>Password:</b>");
		$("#rem_pw").find("b").text("Remember");
		$(".loginbtn").find("a").first().html("<span class='loginicon'></span><b>Login</b>");
		$(".loginbtn").find("a").last().html("<span class='advreseticon'></span><b>Reset</b>");
}
function oims_chi(){
	$("#oims_i18n").html("<a href='javascript:oims_eng()' id='oims_english'>English</a>");
	$("#oims_denglufs").html("<b>登录方式:</b>");
	$("select")[0].options.length=0;
	$("<option value='0'>用&nbsp;户&nbsp;名</option>").appendTo($("select"));
	$("<option value='1'>工&nbsp;&nbsp;号</option>").appendTo($("select"));
	$("#yongHu_id").html("<b>用&nbsp;户&nbsp;名:</b>");
	$("#yongHu_pw").html("<b>密&nbsp;&nbsp;&nbsp;码:</b>");
	$("#rem_pw").find("b").html("<b>记住密码</b>");
	$(".loginbtn").find("a").first().html("<span class='loginicon'></span><b>登录</b>");
	$(".loginbtn").find("a").last().html("<span class='advreseticon'></span><b>重置</b>");
}
/***************************************************动态计算登陆容器的位置****************************************************/
function loginResize(){
	if($(window).height()>($("#header").outerHeight()+$(".logincontent").outerHeight()+$("#footer").outerHeight())){
		var h=$(".logincontent").outerHeight()-$(".logincontent").height();
		$(".logincontent").height($(window).height()-$("#header").outerHeight()-$("#footer").outerHeight()-h);
	}
}
/***************************************************登陆方法begin****************************************************/
function login(){
	var type = $("select").val();//登陆方式0=用户名登陆1=用户ID登陆
	var input = $("#textfield10").val();//用户名或者用户ID
	if(input==""){
		$("#textfield10").focus();
		return false;
	}
	var password = $("#textfield").val();//密码输入框的值
	if(password==""){
		$("#textfield").focus();
		return false;
	}
	//getJSONData 在common.js里面
	var result = getJSONData("publish/user/userLogin.htm",{loginType:type,input:input,pwd:password},"POST");
	if(result!=null && result.state){//js隐身转换非0即为真
		if($("#checkbox").attr("checked")){
			$.cookie("login_type",type,{expires: 365});
			$.cookie("login_input",input,{expires: 365});
			$.cookie("login_password",password,{expires: 365});
		}else{
			$.cookie("login_type",null);
			$.cookie("login_input",null);
			$.cookie("login_password",null);
		}
		//location.href = "publish/index.htm";
		if(navigator.appName.indexOf('Microsoft Internet Explorer')!=-1){
			var parentWindow=window.open('publish/index.htm','','fullscreen=0,channelmode=1,resizable=yes');//channelmode=yes,fullscreen=1,resizable=1,location=no,menubar=no,status=no,titlebar=no
			window.opener=null;
			window.open("","_self");
			window.close();
			return;
		}
		location.href = "publish/index.htm";
		//this.close();
	}else{
		alert(result.obj);
	}
}
/***************************************************登陆方法end****************************************************/
