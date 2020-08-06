<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-1.6.2.min.js"></script>
<script type="text/javascript">
function getJSONData(url,data,type){
    var value=null;
    if(type==null){
    	type="GET";
    }else{
    	type="POST";
    }
    $.ajax({
        url : url+"?tag=" + Math.random(),
        data : data,
        async : false,
        type : type,
        dataType : 'json',
        success : function(data){
        	alert(0);
            value=data;
        }
    });
    return value;
}
$(document).ready(function() {
	var x = getJSONData("http://demo1.oims.com.cn/publish/user/loginCheck.htm", {uid:"admin",password:"admin"},"POST");
	alert(x);
});
</script>
</head>
<body>

</body>
</html>