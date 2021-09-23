<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>系统登录中，请稍后。。。</title>
<script type="text/javascript" src="${pageContext.request.contextPath}/xiaoping/js/jquery-1.6.2.min.js"></script>
<script type="text/javascript">
var configUrl2="c:\\oims.ini";
function getSettings(){
    var setting={user:'',pwd:''};
    try{
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var ts = fso.OpenTextFile(configUrl2);
        var str;
        while((str=ts.ReadLine())!=null && str!=""){
            var config=str.split("=");
            if(config.length==2){
                if(config[0]=="user"){
                    setting.user=config[1];
                }else if(config[0]=="pwd"){
                    setting.pwd=config[1];
                }
            }
        }
        ts.Close();
    }catch(e){
    }
    return setting;
}
//function login(uid,pwd){
//	$("#uid").val(uid);
//    $("#password").val(pwd);
//    $("#shebeilogin").submit();
//}
$(document).ready(function(){
    var s=getSettings();
    $("#uid").val("yanshi");
    $("#password").val("admin");
    $("#shebeilogin").submit();
});
</script>
</head>
<body scroll="no">
<h1>WAIT</h1>
<form id="shebeilogin" action="${pageContext.request.contextPath}/publish/user/userSmallScreenNewLogin.htm" method="post">
    <input type="hidden" name="type" id="type" value='0'/>
	<input type="hidden" name="input" id="uid" />
	<input type="hidden" name="pwd" id="password" />
</form>
</body>
</html>