<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>系统登录中，请稍后。。。</title>
<script type="text/javascript" src="${pageContext.request.contextPath}/xiaoping/js/jquery-1.6.2.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/picbrowser/js/common.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/picbrowser/js/flashShow.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	var data = getJSONData("/publish/huanZheXinXi/getOneExamedHzxx.htm",{tag:Math.random()});
	if(data.state){
		var hzid = data.obj;
		studyView(hzid);
	}
	
});
</script>
</head>
<body scroll="no">
</body>
</html>