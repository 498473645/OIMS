<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>住院证预览</title>

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
<link href="${pageContext.request.contextPath}/subgroup/calendar/css/jscal2.css" 
	rel="stylesheet" type="text/css" />
	
<script src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
<script src="${pageContext.request.contextPath}/js/common.js"></script>
<script src="${pageContext.request.contextPath}/js/jquery.oimsDialog.js"></script>
<script src="${pageContext.request.contextPath}/js/jquery.PrintArea.js"></script>
<script src="${pageContext.request.contextPath}/emr/js/zyz.js"></script>


<script type="text/javascript">
var contextPath = "${pageContext.request.contextPath}";
</script>
</head>
<body>
<div id='zyzDiv' style='padding-bottom: 10px; margin: 0px auto; padding-left: 10px; width:590px; background: rgb(255,255,255); color: rgb(79,79,79); padding-top: 0px;border:0px solid;font-size:14px;'>
<h3 style='text-align:center;'>陆军军医大学第一附属医院（西南医院）</h3>
<h3 style='text-align:center;'><span id='zyz_zyzlx'></span>住院证</h3>
<h5><div style='width:20%;text-align:left;float:right;'>ID&nbsp;&nbsp;&nbsp;&nbsp;号&nbsp;&nbsp;<span id='zyz_patientid'>&nbsp;</span></div><br><div style='width:20%;text-align:left;float:right;'>住院号&nbsp;&nbsp;</div><br></h5>
<table border="1" cellpadding="0" cellspacing="0" width="100%">
			<tbody>
				<tr>
            <th width="3%" style="border-right-style:none;"><span >姓名</span></th>
			<td width="15%" style=" text-align:center; border-left-style:none; border-right-style:none;" ><span id="zyz_xingming"></span></td>
            <th width="3%" style="border-left-style:none; border-right-style:none;"><span >性别</span></th>
			<td width="11%" style=" text-align:center;border-left-style:none; border-right-style:none;"><span id="zyz_xingbie"></span></td>
            <th width="3%" style="border-left-style:none; border-right-style:none;"><span >年龄</span></th>
			<td width="11%" style=" text-align:center;border-left-style:none; border-right-style:none;"><span id="zyz_nianling"></span></td>
			<th width="3%" style="border-left-style:none; border-right-style:none;"><span >部别</span></th>
			<td width="15%" style=" text-align:center;border-left-style:none; border-right-style:none;"><span id="zyz_department"></span></td>
            <th width="3%" style="border-left-style:none; border-right-style:none;"><span >职别</span></th>
			<td width="15%" style=" text-align:center;border-left-style:none; border-right-style:none;"><span id="zyz_joblevel"></span></td>
            <th width="3%" style="border-left-style:none; border-right-style:none;"><span >级别</span></th>
			<td width="15%" style=" text-align:center;border-left-style:none;"><span id="zyz_level"></span></td>
		</tr>
        <tr style="line-height:40px; font-size:12px;">
          <td style="border-right-style:none;" colspan="2">入院时科别</td>
          <td style="border-left-style:none; border-right-style:none;" colspan="3" id="zyz_rykb"></td>
          <td style="border-left-style:none; border-right-style:none; text-align:right;" colspan="2">签证时间</td>
          <td style="border-left-style:none; border-right-style:none; text-align:right;" colspan="2" id="zyz_qzymd"></td>
          <td style="border-left-style:none; " colspan="3" id="zyz_qzsf"></td>
        </tr>
        <tr style="line-height:40px;">
          <td colspan="3" style="border-right-style:none;">病区</td>
          <td style=" text-align:right; border-left-style:none; border-right-style:none;">病室</td>
          <td style=" text-align:center; border-left-style:none; border-right-style:none;"></td>
          <td style=" text-align:center; border-left-style:none; border-right-style:none;">床</td>
          <td style=" text-align:center; border-left-style:none; border-right-style:none;"></td>
          <td colspan="5" style=" text-align:left; border-left-style:none; ">入院时间</td>
        </tr>
        <tr >
          <td colspan="12" style="border-bottom-style:none;">临时诊断</td>
        </tr>
        <tr style="font-size:12px; height:100px;" >
          <td colspan="12" valign="top" style="border-top-style:none; border-bottom-style:none;" ><span id="zyz_lszd"></span></td>
        </tr>
        <tr >
          <td colspan="12" style="border-top-style:none; border-bottom-style:none;">特殊情况说明</td>
        </tr>
        <tr style="font-size:12px; height:40px;" >
          <td colspan="12" valign="top" style="border-top-style:none; border-bottom-style:none;" >&nbsp;&nbsp;<span id="zyz_tsqksm"></span></td>
        </tr>
         <tr >
          <td colspan="12" style="border-top-style:none; border-bottom-style:none;">家属签字</td>
        </tr>
        <tr style="height:20px;">
          <td colspan="9" style="border-top-style:none; border-bottom-style:none;border-right-style:none;"></td>
        </tr>
        <tr style="font-size:12px; height:40px;" >
          <td colspan="9" valign="top" style="border-top-style:none; border-bottom-style:none; border-right-style:none;" ></td>
          <td rowspan="4" style="border-top-style:none; border-bottom-style:none; border-left-style:none;text-align:right;" >入&nbsp;&nbsp;<br />院&nbsp;&nbsp;<br />清&nbsp;&nbsp;<br />洁&nbsp;&nbsp;<br />整&nbsp;&nbsp;<br />顿&nbsp;&nbsp;</td>
          <td colspan="2" rowspan="4" valign="top" style="border-top-style:none; border-bottom-style:none; " ><br />1.&nbsp;全&nbsp;整&nbsp;顿<br /><br />2.&nbsp;半&nbsp;整&nbsp;顿<br /><br />3.&nbsp;不&nbsp;整&nbsp;顿<br /><br />4.&nbsp;灭&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;虱</td>
        </tr>
        <tr >
          <td colspan="2" style="border-top-style:none; border-bottom-style:none;border-right-style:none;">预交金</td>
          <td colspan="7" style="border-top-style:none; border-bottom-style:none;border-right-style:none; border-left-style:none;" id="zyz_yjj"></td>
        </tr>
        <tr style="height:20px;">
          <td colspan="9" style="border-top-style:none; border-bottom-style:none;border-right-style:none;"></td>
        </tr>
        <tr >
          <td colspan="2" style="border-top-style:none; border-bottom-style:none;border-right-style:none;">签字医师</td>
          <td colspan="7" style="border-top-style:none; border-bottom-style:none;border-right-style:none; border-left-style:none;" id="zyz_ysqz"></td>
        </tr>
			</tbody>
</table>
温馨提示：请持此证先到（<span id="zyz_addr1">外科楼1楼大厅</span>）收费室办理住院手续，再到（<span id="zyz_addr2">外科楼16楼A区</span>）护士站办理入科手续
</div>
<br><br>
<div class='print_btn' style='margin-left:50%;margin-top:10px;'><a href='javascript:print_zyz();' class='btnone' ><span class='print'></span>打印</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:closeSCWindow();' class='btnone' ><span class='close'></span>关闭</a></div>
</body>
<script type="text/javascript">
var jiuzhenId='${param.visiteId}';
loadInformation(jiuzhenId);
</script>
</html>