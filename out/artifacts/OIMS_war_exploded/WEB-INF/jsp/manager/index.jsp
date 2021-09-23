<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" style="overflow:hidden">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=8"></meta>
<!-- 插入打印控件-->
<!-- <object id="jatoolsPrinter" classid="CLSID:B43D3361-D075-4BE2-87FE-057188254255"
     codebase="jatoolsPrinter.cab#version=8,5,2391,0" width=0 height = 0>
</object> -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!-- 不缓存 -->
<META HTTP-EQUIV="pragma" CONTENT="no-cache">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate">
		<META HTTP-EQUIV="expires" CONTENT="0">
			<!-- 不缓存 -->

			<title>眼科电子病历及综合影像管理系统</title>
			<link href="${pageContext.request.contextPath}/css/main.css"
				rel="stylesheet" type="text/css" />
			<link
				href="${pageContext.request.contextPath}/style/green/css/green.css"
				rel="stylesheet" type="text/css" />
			<link
				href="${pageContext.request.contextPath}/style/green/css/openWin.css"
				rel="stylesheet" type="text/css" />
			<link href="${pageContext.request.contextPath}/css/icon.css"
				rel="stylesheet" type="text/css" />
			<link href="${pageContext.request.contextPath}/css/easyui.css"
				rel="stylesheet" type="text/css" />
			<link rel="stylesheet" type="text/css"
				href="${pageContext.request.contextPath}/subgroup/calendar/css/jscal2.css" />
			<link
				href="${pageContext.request.contextPath}/oimsslide/oimsslide.css"
				rel="stylesheet" type="text/css" />
			<!-- 加入字体库 -->
			<link href="${pageContext.request.contextPath}/tbyf/css/iconfont.css"
				rel="stylesheet" type="text/css" />
</head>
<body>
	<div id="kaishi"
		style="position: absolute; width: 100%; height: 100%; background-color: #f3f3f3; top: 0px">
		<div class="waiting"
			style="background: url(../images/b.gif) no-repeat; width: 340px; height: 95px; margin: 200px auto;">
			<p>系统正在加载中，请稍候......</p>
		</div>
	</div>
	<div id="cover_loading" style="display: none">
		<div class="waiting"
			 style="background: url(../images/b.gif) no-repeat; width: 340px; height: 95px; margin: 200px auto;">
			<p>努力加载中，请稍候......</p>
		</div>
	</div>
	<div style="display: none;" class="header" id="header">
		<div class="logo" style="padding: 20px 10px 0 15px;background:url(${pageContext.request.contextPath}/style/green/images/logo.png) no-repeat;background-position-x:20px;background-position-y:15px;height:45px;width:588px;float:left; "></div>
		<div class="header-main" style="background:url(${pageContext.request.contextPath}/style/green/images/top-bj-img.png) no-repeat #035733;height: 66px; width: 772px; position: absolute; right: 0px; clear: both; z-index: 0; float: right;">
			<dl class="user"></dl>
			<div class="icon">
				<a style="padding: 22.5px 0;" href="javascript:userConfing();"><img
					src="${pageContext.request.contextPath}/images/-e-icon-sz.png"
					alt=""></a><span class="line-two"><img
					src="${pageContext.request.contextPath}/images/line2.png" alt=""></span>
				<%-- <a style="padding:22.5px 0;"href="#"><img src="${pageContext.request.contextPath}/images/-e-icon-bz.png" alt=""></a><span class="line-three"><img src="${pageContext.request.contextPath}/images/line2.png" alt=""></span> --%>
				<a style="padding: 23.5px 0;" href="javascript:loginOut();"><img
					src="${pageContext.request.contextPath}/images/-e-icon-tc.png"
					alt=""></a>
			</div>
		</div>
	</div>
	<div class="linetbyf" style="width:100%;height:8px;background:url(${pageContext.request.contextPath}/style/green/images/top-bottom-bj.jpg) repeat"></div>
	<div class="content" id="content">
		<div class="left" id="left">
			<div class="menu">
				<div style="display: none;" class="wel"></div>
				<div class="modulertitle"></div>
				<!-- <div class="up"></div>-->
				<div id="menu" class="nav"></div>
				<!--  <div class="down"></div>-->
			</div>
			<div class="narrow">
				<span></span>
			</div>
		</div>
		<div class="right" id="right">
			<div class="welcomebg">
				<!-- <span class="welcomeSpan">欢迎使用门诊眼科电子病历及影像综合管理系统！</span> -->
				<div class="welcomefont"></div>
			</div>
		</div>
	</div>

	<div class="footertbyf" id="footer">Copyright©
		2019武汉市同步远方信息技术开发有限公司 All Rights Reserved</div>

	<script src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
	<script language="javascript">
		var contextPath = "${pageContext.request.contextPath}";

		function getContextPath() {
			return '${pageContext.request.contextPath}';
		};
	</script>
	<script src="${pageContext.request.contextPath}/js/main.js"></script>
	<!-- 项目程序入口js -->
	<script src="${pageContext.request.contextPath}/js/json2.js"></script>
	<!-- 处理string与json格式互换的方法类 -->
	<script src="${pageContext.request.contextPath}/js/jquery.cookie.js"></script>
	<!-- 提供了jquery中非常简单的操作cookie的方法 -->
	<script src="${pageContext.request.contextPath}/js/jquery.form.js"></script>
	<!-- 的Ajax表单插件 -->
	<script
		src="${pageContext.request.contextPath}/subgroup/calendar/js/jscal2.js"></script>
	<!-- JSCal2日历控件简单使用 -->
	<script
		src="${pageContext.request.contextPath}/subgroup/calendar/js/en.js"></script>
	<!-- JSCal2日历控件简单使用 -->
	<script type="text/javascript"
		src="${pageContext.request.contextPath}/ckeditor/ckeditor.js"></script>
	<!-- 文本编辑插件 -->
	<script src="${pageContext.request.contextPath}/oimsslide/oimsslide.js"></script>
	<!-- 图片放大插件 -->
	<script src="${pageContext.request.contextPath}/js/language.config.js"></script>
	<!-- 语言配置类 -->
	<script
		src="${pageContext.request.contextPath}/js/oimsCategory.config.js"></script>
	<!-- oims分类表配置信息 -->
	<script
		src="${pageContext.request.contextPath}/js/manager/user/userConfig.js"></script>
	<!-- 用户配置文件（国际化之类） -->
	<script src="${pageContext.request.contextPath}/js/common.js"></script>
	<!-- 图标 -->
	<script src="${pageContext.request.contextPath}/tbyf/js/iconfont.js"></script>
	<!-- js公共方法 -->
	<script
		src="${pageContext.request.contextPath}/js/jquery.oimsDialog.js"></script>
	<!-- 弹窗口插件-->
	<script src="${pageContext.request.contextPath}/js/jquery.menu.js"></script>
	<!-- 菜单树插件 -->
	<script
		src="${pageContext.request.contextPath}/js/jquery.createPageList.js"></script>
	<!-- 分页插件 -->
	<script src="${pageContext.request.contextPath}/js/jquery.oimsBox.js"></script>
	<!--oims输入模板插件-->
	<script
		src="${pageContext.request.contextPath}/js/jquery.customfile.js"></script>
	<!--  项目自己的插件-->

	
	<%-- <script
		src="${pageContext.request.contextPath}/js/manager/msg/MyMsg.js"></script> --%>
	<!-- 显示消息js -->

</body>
</html>