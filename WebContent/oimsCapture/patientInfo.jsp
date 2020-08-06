<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>检查单详细信息</title>
<script type="text/javascript">
var contextPath ="${pageContext.request.contextPath}";
</script>
<script src="js/jquery.min.js"></script>
<script src="js/json2.js"></script>
<script src="js/common.js"></script>
<script type="text/javascript" src="../js/oimsCategory.config.js"></script>
<script type="text/javascript" src="js/getUrlParam.js"></script>
<script src="patientInfo.js"></script>
<link href="css/css.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div class="listsee black" id="listsee">
  <div class="listseebg"><span class="huanzheName">急</span><font>张三丰</font> (病历号：0000001)&nbsp; 男&nbsp; 49岁&nbsp; <span class="shouji">手机：
    <input name="textfield" type="text" id="textfield" value="点输入框外即保存" /></span>
  </div>
 <div class="main">
   <div class="left">
   <p>主述及病史：</p>
   <div class="con"></div>
    <p>检查要求：</p>
   <div class="con"></div>
   </div>
   <div class="right">
     <div class="od"><span>OD</span></div>
     <div class="os"><span>OS</span></div>
   </div>
 </div>
 <table id="tableKD" width="100%" border="0" cellspacing="0" cellpadding="0" class="tt">
  <tr>
    <td width="17%">开单医生：</td>
    <td width="30%">&nbsp;</td>
    <td width="18%">开单时间：</td>
    <td width="35%">&nbsp;</td>
  </tr>
</table>

<input type="hidden" id="huanzheid" value=""/>
</div>
</body>
</html>