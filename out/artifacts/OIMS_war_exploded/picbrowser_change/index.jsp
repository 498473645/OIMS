<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>OIMS影像浏览</title>
<link
	href="${pageContext.request.contextPath}/picbrowser/skin/blue/css/main.css"
	rel="stylesheet" type="text/css" />
<link href="${pageContext.request.contextPath}/picbrowser/css/win.css"
	rel="stylesheet" type="text/css" />
<link type="text/css"
	href="${pageContext.request.contextPath}/picbrowser/css/easyui.css"
	rel="stylesheet" />
<link type="text/css"
	href="${pageContext.request.contextPath}/css/main.css" rel="stylesheet" />
<link href="${pageContext.request.contextPath}/oimsslide/oimsslide.css"
	rel="stylesheet" type="text/css" />
<link
	href="${pageContext.request.contextPath}/style/green/css/openWin.css"
	rel="stylesheet" type="text/css" />
<script type="text/javascript"
	src="${pageContext.request.contextPath}/picbrowser/js/jquery-1.6.2.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/picbrowser/js/jquery.createPageList.js"></script>
<script
	src="${pageContext.request.contextPath}/picbrowser/js/jquery.form.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/picbrowser/js/jquery.swfobject.1-1-1.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/picbrowser/js/jquery.easyui.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/picbrowser/js/jquery.ae.image.resize.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/picbrowser/js/basicFunc.js"></script>
<script
	src="${pageContext.request.contextPath}/picbrowser/js/language.config.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/picbrowser/js/main.js"></script>
<script
	src="${pageContext.request.contextPath}/picbrowser/js/jquery.oimsDialog.js"></script>
<script src="${pageContext.request.contextPath}/picbrowser/js/common.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/picbrowser_change/js/functions.js"></script>
<script src="${pageContext.request.contextPath}/oimsslide/oimsslide.js"></script>
<script language="javascript">
	var hzid = '${param.hzid}';
	var blh = '${param.blh}';
	var contextPath = '${pageContext.request.contextPath}';
</script>
</head>
<body>
	<div class="header">
		<div class="headerBg"></div>
		<div class="headerContent">
			<a href="javascript:closePage();"><div class="close"></div></a>
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td rowspan="2" class="logo">&nbsp;</td>
					<td rowspan="2" class="hz"><img src="skin/blue/images/hz.png"
						width="40" height="40" /></td>
					<td height="24" align="right" class="name">
					<span id="xingming_dp">姓名：</span></td>
					<td id="patientname" nowrap="nowrap"></td>
					<td align="right" class="name"><span id="xingbie_dp">性别：</span></td>
					<td id="sex" nowrap="nowrap"></td>
					<td align="right" class="name"><span id="csrq_dp">出生日期：</span></td>
					<td id="birthday" nowrap="nowrap"></td>
					<td rowspan="2" class="search">
						<div class="searchd">
							<input id='search' name="search" type="text" class="searchIpnut"
								value="<%
								String blh = request.getParameter("blh");
								if (blh != null && blh != "")
									out.print(blh);
								else
									out.print("请输入病历号或者卡号");
								//if(blh!=null)out.writer(blh);
								%>"
								onkeydown="searchHuanZhe(this);" /> <a
								href="javascript:findHuanZhe();"><span></span></a>
						</div>
					</td>
				</tr>
				<tr>
					<td align="right" height="20"><span id="sfzh_dp">身份证：</span></td>
					<td id="ident" nowrap="nowrap" class="name1"></td>
					<td align="right"><span id="blh_dp">病历号：</span></td>
					<td id="patientId" nowrap="nowrap" class="name1"></td>
					<td align="right"><span id="isYb_dp">是否医保：</span></td>
					<td id="insured" nowrap="nowrap"></td>
				</tr>
			</table>

		</div>
	</div>
	<div class="content">
		<div class="leftMenu">
			<div class="leftMenuBg"></div>
			<div class="leftMenuContent">
				<div class="menuTitle">
					<span></span>基本调整
				</div>
				<div id="jbtz" class="menucontent">
					<img src="skin/blue/images/img1.png" width="135" height="117" />
				</div>
				<div class="menuTitle">
					<span></span>色相调整
				</div>
				<div id="sxtz" class="menucontent"></div>
				<div class="menuTitle">
					<span></span>高级功能
				</div>
				<div id="gjgn" class="menucontent">
					<a href="javascript:removeColor();"><span class="disc"></span><span
						id="qs_dp">去色</span></a> <a href="javascript:fense();"><span
						class="reverse"></span><span id="fz_dp">反转</span></a> <a
						href="javascript:showBijiao();" id="compareId"><span
						class="compare"></span><span id="bj_dp">比较</span></a> <a
						href="javascript:showHuabi();"><span class="pen"></span><span
						id="hb_dp">画笔</span> </a>
					<!--a href="#"><span class="meter"></span>测量</a-->
					<div class="fgong" id="fgCompare" style="display: none">
						<a href="javascript:showGongge(2,this);" class="two"></a> <a
							href="javascript:showGongge(4,this);" class="four"></a>
					</div>
					<div class="fgong" id="huabi" style="display: none">
						<a href="javascript:setPenColor('0x000000');" id="black"
							class="black selectd"></a> <a
							href="javascript:setPenColor('0xff0000');" id="red" class="red"></a>
						<a href="javascript:setPenColor('0x00ff00');" id="green"
							class="green"></a> <a onmousedown="minusHuabiSize()"
							onmouseup="kongHuabisize()" class="minus"></a> <a href=""
							class="texti"><input id="huabiSize" name="huabiSize"
							type="text" value="10" /></a> <a onmousedown="addHuabiSize()"
							onmouseup="kongHuabisize()" class="add"></a>
					</div>
				</div>
				<div class="menuTitle">
					<span></span>浏览功能
				</div>
				<div class="menucontent">
					<a href="javascript:showDateList();"><span class="time"></span>时间</a>
					<a href="javascript:showJcxmList();"><span class="itme"></span>项目</a>
				</div>
				<div class="menuTitle1">
					<span></span>附加功能
				</div>
				<div class="menucontent">
					<a href="javascript:showYuePian();"><span class="itme"></span>阅片</a>
				</div>
			</div>
		</div>
		<div class="rightCon" style="height: 450px;">
			<div class="rightConBg"></div>
			<div class="rightConContent">
				<div class="info">
					患<br>者<br>信<br>息 
				</div>
				<div class="infolist"></div>
				<div class="timetab">
					<span class="up" id="spanUp"></span><span class="next"
						id="spanNext"></span>
				</div>
				<div class="tabinfo"></div>
				<div class="picshow"></div>
			</div>
		</div>
	</div>

	<div class="footerImg">
		<div class="footerbg"></div>
		<div class="basemenu">
			<a href="javascript:initBaseInfo();"><span class="undo"></span>还原</a>
			<a href="javascript:resetPic();"><span class="reset"></span>重置 </a> <a
				href="javascript:rightRotate();"><span class="rightx"></span>右旋</a>
			<a href="javascript:leftRotate();"><span class="leftx"></span>左旋</a>
			<a href="javascript:reducePic();"><span class="reduce"></span>缩小</a>
			<a href="javascript:enlargePic();"><span class="zoom"></span>放大 </a>
		</div>
		<div class="thumbnail">
			<div class="left"></div>
			<div class="right"></div>
			<div class="ulPicture"></div>
		</div>
	</div>
</body>
</html>
