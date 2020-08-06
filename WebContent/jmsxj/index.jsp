<%-- 
    Document   : index.jsp
    Created on : 2012-7-14, 12:24:12
    Author     : liyan
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" style="overflow:hidden">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=8" ></meta>
<!-- 插入打印控件-->
<!-- <object id="jatoolsPrinter" classid="CLSID:B43D3361-D075-4BE2-87FE-057188254255"
     codebase="jatoolsPrinter.cab#version=8,5,2391,0" width=0 height = 0>
</object> --> 
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>OIMS奥美视眼科检查及图像管理系统</title>
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
<link href="${pageContext.request.contextPath}/oimsslide/oimsslide.css"
	rel="stylesheet" type="text/css" />

</head>
<body>
	<div id="kaishi"
		style="position: absolute; width: 100%; height: 100%; background-color: #f3f3f3; top: 0px">
		<div class="waiting"
			style="background: url(../images/waitting.gif) no-repeat; width: 300px; height: 90px; margin: 200px auto;">
			<p>系统正在加载中，请稍候......</p>
		</div>
	</div>
	<div class="header" id="header">
		<div class="logo"></div>
		<div class="set">
			<ul>
				<li class="settext"><a href="javascript:userConfing();">设置</a></li>
				<li class="exit"><a href="javascript:loginOut();">退出</a></li>
				<li class="help"><a href="#">帮助</a></li>
			</ul>
		</div>
	</div>
	<div class="content" id="content">
		<div class="left" id="left">
			<div class="menu">
				<div class="wel"></div>
				<div class="modulertitle"></div>
				<div class="up"></div>
				<div id="menu" class="nav"></div>
				<div class="down"></div>
			</div>
			<div class="narrow">
				<span></span>
			</div>
		</div>
		<div class="right" id="right">
			<div class="welcomebg">
				<div class="welcomefont"></div>
			</div>
		</div>
	</div>

	<div class="footer" id="footer">
		<div class="footerlogo"></div>
		<p>版权所有：北京思格玛软件有限公司</p>
	</div>
	<input type="hidden" id="sg_blh" value="<%=request.getParameter("blh")%>"/>
	<input type="hidden" id="sg_jcxmId" value="<%=request.getParameter("jcxmId")%>"/>
	<script src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
	<script language="javascript">
		var contextPath = "${pageContext.request.contextPath}";

		function getContextPath() {
			return '${pageContext.request.contextPath}';
		};
	</script>

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
	<script src="${pageContext.request.contextPath}/jmsxj/js/copyMain.js"></script><!-- 项目程序入口js -->
</body>
</html>