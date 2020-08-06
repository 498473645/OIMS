<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>医生工作站</title>
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
<script src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
<script language="javascript">
	var contextPath = "${pageContext.request.contextPath}";
</script>
<script
	src="${pageContext.request.contextPath}/js/jquery.createPageList.js"></script>
<style type="text/css">
	body,td{background:#f3f3f3}
	#buttons{margin-top:4px}
	#top{line-height:30px; height:30px; border-bottom:1px solid #d2d2d2}
	#top #patientInfo img{display:inline; vertical-align:middle;}
	#visitRecord{ background:#f3f3f3; font-size:15px; font-weight:bold; float:left; width: 26px;overflow: hidden; cursor: pointer; vertical-align:middle;text-align: center;border-right:1px solid #d2d2d2;border-bottom:1px solid #d2d2d2;}
	#medicalRecord{ margin-left:26px}
	.doctortitle{
		height: 28px;
		background: url(../style/green/images/tdtitlebg.png) repeat-x -1px;
		text-align: center;
		font-weight: bold;
		line-height: 27px;
		vertical-align: middle;
		margin-left:26px;
		padding-left:8px;
	}
	.tabContent{overflow-x: hidden}
	.tabContent h1, .tabRight h1{
		display: block;
		font-size:14px;
		height: 26px;
		line-height: 26px;
		text-align: center;
		background: url(../style/green/images/tdtitlebg.png) repeat-x;
	}
	.tabRight h1{color:blue}
	.tab{padding: 3px 0 0 0; margin:0; overflow:hidden; height:22px}
	.tabRight{width:408px; float:right; border-left:1px solid #d2d2d2;}
	.inputContent{border-top:1px solid #d2d2d2;border-bottom:1px solid #d2d2d2; padding:2px; background:#fff; height:88px;outline: none; word-break: break-all; overflow-x: hidden;}
	.inputCurrent{background:#fefeed:}
	#indexInput{height:28px; line-height:28px;}
</style>

<script
	src="js/main.js"></script>
</head>
<body>
	<div id="title"></div>
	<div id="top">
		<!-- 功能按键 -->
		<div id="buttons" class="btn">
			<a><span class="start"></span>下一位</a> <a><span class="gh"></span>过号</a>
			<a><span class="diagnosis"></span>完成</a> <a><span class="print"></span>打印</a>
		</div>
		<!-- 患者信息 -->
		<div id="patientInfo">
			<img width="25" height="25" src="../images/pople.png">
			<strong>病历号：</strong>
			<span style="color:blue">OIMS001</span>&nbsp;
			<strong>患者姓名：</strong>
			<span style="color:blue">患者一</span>&nbsp;
			<strong>性别：</strong>
			<span style="color:blue">男</span>&nbsp;
			<strong>年龄：</strong>
			<span style="color:blue">22岁</span>&nbsp;
			<strong>是否医保：</strong>
			<span style="color:blue">是</span>&nbsp;
			<strong>手机：</strong>
			<span style="color:blue">13021247871</span>
		</div>
	</div>
	<div id="visitRecord">
		<div id="visitRecordTitle">就诊记录<span style="color:blue"> 5 </span>次</div>
	</div>
	<div class="doctortitle">
           <div class="tab">
				  <div id="div1_1" class="tab_show"><span>问诊</span></div>
				  <div id="div1_2" class="tab_hide"><span>检查</span></div>
		          <div id="div1_6" class="tab_hide"><span>处置</span></div>
		          <div id="div1_7" class="tab_hide"><span>护理</span></div>
		          <div id="div1_8" class="tab_hide"><span>诊断</span></div>
		          <div id="div1_9" class="tab_hide"><span>处方</span></div>
          		<span class="edito"></span>
		 	</div>
    	</div>
	<div id="medicalRecord">
		<div class="tabRight">
			<h1>模板-主述</h1>
			<div id="indexInput" contenteditable="true" hidefocus="true" tabindex="1" class="inputContent">
			请输入检索
			</div>
		</div>
	    <div class="tabContent">
		    	<h1>主述</h1>
		    	<div contenteditable="true" hidefocus="true" tabindex="1" class="inputContent inputCurrent">
		    		<span style="cursor: pointer;color:blue" class="templateChange">test</span>
		    			dddddd
		    	</div>
	    </div>
	</div>
</body>
</html>