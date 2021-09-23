<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>请稍后。。。</title>

</head>
<body>
<script>

function toFull(){   
	  if(window.name=="fullscreen")return;   
	  var a =window.open("","fullscreen","height=600, width=800,fullscreen=no, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, status=no") ;  
	 // window.location.href = "shebei.jsp";
	 a.location = "shebei_bak.jsp";
	  window.opener=null;  
	  window.close();
}
toFull();
</script>
</body>
</html>