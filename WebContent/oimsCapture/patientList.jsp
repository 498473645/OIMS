<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>检查单列表</title>
<script type="text/javascript">
	var contextPath ="${pageContext.request.contextPath}";
</script>
<script src="js/jquery.min.js"></script>
<script src="js/json2.js"></script>

<script src="js/common.js"></script>
<script src="../js/oimsCategory.config.js"></script>
<script type="text/javascript" src="js/getUrlParam.js"></script>
<script src="patientList.js"></script>
<link href="css/css.css" rel="stylesheet" type="text/css" />
</head>
<body>
	<div class="querydiv">
		<div class="querytext">
			<input name=""
				type="button" class="sibmit" onclick="clickTest()"/><input name="" type="text" class="queryinput" id="queryinput"/>
		</div>
   <div class="btn"><span id="daijian">待检列表</span><span id="guohao">过号</span><span id="daibuchuan">待补传</span><span id="yiwancheng">已完成</span></div>
		<div id="pageList">
			<table width="100%" border="0" cellspacing="0" cellpadding="0"
				class="querytable">
				<tr>
					<th>序号</th>
					<th>病历号</th>
					<th>姓名</th>
					<th>性别</th>
					<th>年龄</th>
					<th>诊别</th>
					<th>检查项目</th>
				</tr>
				<tr>
					<td>1</td>
					<td>0091343</td>
					<td>李东伟</td>
					<td>男</td>
					<td>65</td>
					<th>门诊</th>
					<td>眼底彩照</td>
				</tr>
				<tr class="bg">
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>
				<tr>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>
				<tr class="bg">
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>
				<tr>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
					<td>&nbsp;</td>
				</tr>
			</table>
		</div>
		<div class="page">
			<span onclick="clickNext()">下一页</span><span onclick="clickUP()">上一页</span>
		</div>
	</div>

</body>
</html>