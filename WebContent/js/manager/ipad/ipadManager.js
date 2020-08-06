/*
 *梁建业
 *终端入口
 */
function loadJsAndCss_Ipad()
{
    var printWindow = window.open("","ipad","toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no,titlebar=no");
    html_ipad="";
    html_ipad+="<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'>";
    html_ipad+="<html xmlns='http://www.w3.org/1999/xhtml' style ='overflow:hidden'>";
    html_ipad+="<head>";
    html_ipad+="<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>";
    html_ipad+="<meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />";
    html_ipad+="<title>ipad</title>";
    html_ipad+="<script language='javascript'> var contextPath='"+contextPath+"';</script>";
    html_ipad+="<link href='"+contextPath+"/js/manager/ipad/skin/blue/css/main.css' rel='stylesheet' type='text/css'/>";
    html_ipad+="<link rel='stylesheet' type='text/css' href='"+contextPath+"/js/manager/ipad/js/default/easyui.css'>";
    html_ipad+="<script type='text/javascript' src='"+contextPath+"/js/manager/ipad/js/jquery-1.7.min.js'></script>";//jquery.js核心文件
    html_ipad+="<script type='text/javascript' src='"+contextPath+"/js/manager/ipad/js/jquery.form.js'></script>";
    html_ipad+="<script type='text/javascript' src='"+contextPath+"/js/manager/ipad/js/common.js'></script>";
    html_ipad+="<script type='text/javascript' src='"+contextPath+"/js/manager/ipad/js/jquery.createPageList.js'></script>";
    html_ipad+="<script type='text/javascript' src='"+contextPath+"/js/manager/ipad/js/pix.js'></script>";
    html_ipad+="<script type='text/javascript' src='"+contextPath+"/js/manager/ipad/main.js'></script>";
    html_ipad+="<script type='text/javascript' src='"+contextPath+"/js/manager/ipad/js/oimscanvas.js'></script>";
    html_ipad+="<script type='text/javascript' src='"+contextPath+"/js/manager/ipad/js/basicFunction.js'></script>";
    html_ipad+="</head>";
    html_ipad+="<body id='body'>";
    html_ipad+="</body>";
    html_ipad+="</html>";
    printWindow.document.write(html_ipad);
    printWindow.document.close();
}