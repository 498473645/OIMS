<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html style="overflow-x:auto">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=8" ></meta>
<!-- 插入打印控件-->
 <!-- <object id="jatoolsPrinter" classid="CLSID:B43D3361-D075-4BE2-87FE-057188254255"
     codebase="jatoolsPrinter.cab#version=8,5,2391,0" width=0 height = 0>
</object> --> 
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>医生工作站</title>
<link href="${pageContext.request.contextPath}/css/main.css" rel="stylesheet" type="text/css" />
<link	href="${pageContext.request.contextPath}/style/green/css/green.css" 	rel="stylesheet" type="text/css" />
<link
	href="${pageContext.request.contextPath}/style/green/css/openWin.css"
	rel="stylesheet" type="text/css" />
<link href="${pageContext.request.contextPath}/css/icon.css"
	rel="stylesheet" type="text/css" />
<link href="${pageContext.request.contextPath}/oimsslide/oimsslide.css"
	rel="stylesheet" type="text/css" />
<link href="${pageContext.request.contextPath}/emr/style.css"
	rel="stylesheet" type="text/css" />		
<script src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
<script src="${pageContext.request.contextPath}/js/jquery.swfobject.1-1-1.js"></script>
<script src="${pageContext.request.contextPath}/js/jquery.form.js"></script>
<script src="${pageContext.request.contextPath}/js/jquery.paint.js"></script>
<script src="${pageContext.request.contextPath}/js/common.js"></script>
<script src="${pageContext.request.contextPath}/js/oimsCategory.config.js"></script>
<script src="${pageContext.request.contextPath}/js/jcxmIDConfig.js"></script>
<script src="${pageContext.request.contextPath}/oimsslide/oimsslide.js"></script>
<script src="${pageContext.request.contextPath}/js/jquery.PrintArea.js"></script>
<script src="${pageContext.request.contextPath}/js/language.config.js"></script>
<script src="js/emr.menu.js"></script>
<script src="js/chuzhi_suifang.js"></script>
<script src="js/chuzhi_chufang.js"></script>
<script src="js/main.js"></script>
<script src="js/compare.js"></script>
<script type="text/javascript">
var contextPath = "${pageContext.request.contextPath}";
var jiuzhenId='${param.visiteId}';
var binglihao='${param.binglihao}';
var huanzheId='${param.huanzheId}';
var sfzh=null;
</script>
<script src="${pageContext.request.contextPath}/js/jquery.oimsDialog.js"></script>
<script src="js/study.js"></script>
<script src="js/jcdInfo.js"></script>
<script src="js/diagnosis.js"></script>
<script src="js/chuzhi.js"></script>
<script src="js/makeRecordEMR.js"></script>
<script src="js/emr_print.js"></script>
<script src="js/functions.js"></script>
<script src="js/huanZheFenZhen.js"></script>
<style type="text/css">


</style>

</head>
<body>
	<div id="title"></div>
	<div id="top">
		<!-- 功能按键 -->
		<div id="buttons" class="btn">
			<!-- <a style="width:65px;"><span class="sumit" ></span>住院病历</a> -->
			<a><span class="start"></span>下一位</a> <a><span class="gh"></span>过号</a>
			<a><span class="diagnosis"></span>完成</a> <a><span class="print"></span>打印</a>
		</div>
		<!-- 患者信息 -->
		
		<div id="patientInfo">
			<img width="25" height="25" src="../images/pople.png">
			<strong>ID号：</strong>
			<span class="replaceTxt">{binglihao}</span>&nbsp;
			<strong>患者姓名：</strong>
			<span class="replaceTxt">{xingming}</span>&nbsp;
			<strong>性别：</strong>
			<span class="replaceTxt">{sex}</span>&nbsp;
			<strong>年龄：</strong>
			<span class="replaceTxt">{age}</span>&nbsp;
			<strong>是否医保：</strong>
			<span class="replaceTxt">{baoxian}</span>&nbsp;
			<strong>手机：</strong>
			<span class="replaceTxt" id="mobile">{shouji}</span>
		</div>
	</div>
	<div id="visitRecord">
		<!-- <div id="visitRecordTitle">就诊记录<span style="color:blue; display:block"> 5 </span>次</div>
		<div id="menZhenBingLing" style="padding-top:10px;"><a href="javascript:void(0)" style="color:#FF0000">门诊病历</a></div> -->
		<a id="record" class="hiden_a"><label class="hiden_a_label">就诊记录<span style="color:blue; display:block"> 5 </span>次</label></a>
		<a id="hospitalRecord" class="hiden_a"><label class="hiden_a_label">住院病历</label></a>
		<a id="oldVisitRecord" class="hiden_a"><label class="hiden_a_label">原系统既往病历</label></a>
	</div>
	<div class="doctortitle">
           <div class="tab" id="tabTitle">

		 	</div>
    	</div>

</body>
</html>