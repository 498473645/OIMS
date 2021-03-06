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
<h3 style='text-align:center;font-weight:bold;'>陆军军医大学第一附属医院（西南医院）</h3>
<h3 style='text-align:center;font-weight:bold;'><span id='zyz_zyzlx'></span>住院证</h3>
<h5>
   <div style='width:100%;text-align:left;'>
       <table border="0" cellpadding="0" cellspacing="0" width="100%">
		  <tr>
		    <td>ID&nbsp;&nbsp;&nbsp;&nbsp;号&nbsp;&nbsp;<span id='zyz_patientid'>&nbsp;</span></td>
		    <td>住院号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
		    <td>危重等级：&nbsp;&nbsp;<span id='zyz_wzLevel'>&nbsp;</span></td>
		  </tr>
		</table>
   </div>
</h5>

<table border="1" cellpadding="0" cellspacing="0" width="100%">
			<tbody>
				<tr>
            <th width="3%" style="border-right-style:none;font-size:13px;"><span >姓名</span></th>
			<td width="15%" style=" text-align:left; border-left-style:none; border-right-style:none;font-size:13px;" >&nbsp;&nbsp;<span id="zyz_xingming"></span></td>
            <th width="3%" style="border-left-style:none; border-right-style:none;font-size:13px;"><span >性别</span></th>
			<td width="11%" style=" text-align:left;border-left-style:none; border-right-style:none;font-size:13px;">&nbsp;&nbsp;<span id="zyz_xingbie"></span></td>
            <th width="3%" style="border-left-style:none; border-right-style:none;font-size:13px;"><span >年龄</span></th>
			<td width="11%" style=" text-align:left;border-left-style:none; border-right-style:none;font-size:13px;">&nbsp;&nbsp;<span id="zyz_nianling"></span></td>
			<th width="3%" style="border-left-style:none; border-right-style:none;font-size:13px;"><span >身份</span></th>
			<td width="15%" style=" text-align:left;border-left-style:none; border-right-style:none;font-size:13px;" colspan="5">&nbsp;&nbsp;<span id="patType"></span></td>
		</tr>
        <tr style="line-height:40px; font-size:13px;">
          <td style="border-right-style:none;font-size:13px;" colspan="2">入院时科别</td>
          <td style="border-left-style:none; border-right-style:none;font-size:13px;" colspan="3" id="zyz_rykb"></td>
          <td style="border-left-style:none; border-right-style:none; text-align:right;font-size:13px;" colspan="2">签证时间</td>
          <td style="border-left-style:none; border-right-style:none; text-align:right;font-size:13px;" colspan="2" id="zyz_qzymd"></td>
          <td style="border-left-style:none;font-size:13px; " colspan="3" id="zyz_qzsf"></td>
        </tr>
        <!-- 诊断 start -->
        <tr >
          <td colspan="12" style="border-bottom-style:none;font-size:13px;">诊断</td>
        </tr>
        <tr style="font-size:13px; height:100px;" >
          <td colspan="12" valign="top" style="border-top-style:none; border-bottom-style:none;font-size:13px;padding-left: 20px;" ><span id="zyz_lszd"></span></td>
        </tr>
        <!-- 诊断  end -->
        <!-- 预交金 start -->
        <tr >
          <td colspan="2" style="border-top-style:none; border-bottom-style:none;border-right-style:none;font-size:13px;">预交金：</td>
          <td colspan="10" style="border-top-style:none; border-bottom-style:none; border-left-style:none;font-size:13px;" id="zyz_yjj"></td>
        </tr>
        <!-- 预交金 end -->
        <tr>
          <td colspan="12" style="border-top-style:none; border-bottom-style:none;font-size:13px;">&nbsp;</td>
        </tr>
        <!-- 家属签字  start-->
         <tr >
          <td colspan="12" style="border-top-style:none; border-bottom-style:none;font-size:13px;">家属签字：</td>
        </tr>
        <!-- 家属签字  end-->
        <!-- 二维码图片  start-->
        <tr style="font-size:12px; height:20px;" >
          <td colspan="8" valign="top" style="border-top-style:none; border-bottom-style:none; border-right-style:none;" ></td>
          <td rowspan="5" colspan="4" style="border-top-style:none; border-bottom-style:none; border-left-style:none;text-align:center;" >扫二维码&nbsp;&nbsp;即可<br>缴住院预&nbsp;&nbsp;交金<br> <img src="${pageContext.request.contextPath}/emr/zyz.bmp" height="100px" width="100px"></td>
        </tr>
        <!-- 二维码图片  end-->
        <!-- 签字医师  start-->
        <tr >
          <td colspan="2" style="border-top-style:none; border-bottom-style:none;border-right-style:none;font-size:13px;">签字医师：</td>
          <td colspan="6" style="border-top-style:none; border-bottom-style:none;border-right-style:none; border-left-style:none;font-size:13px;" id="zyz_ysqz"></td>
        </tr>
        <!-- 签字医师  end-->
        <tr style="height:20px;">
          <td colspan="8" style="border-top-style:none; border-bottom-style:none;border-right-style:none;"></td>
        </tr>
        <!-- 特殊情况说明  start-->
        <tr >
          <td colspan="8" style="border-top-style:none; border-bottom-style:none;border-right-style:none;font-size:13px;">特殊情况说明：</td>
        </tr>
        <tr style="font-size:12px; height:40px;" >
          <td colspan="8" valign="top" style="border-top-style:none; border-bottom-style:none;border-right-style:none;font-size:13px;" >&nbsp;&nbsp;<span id="zyz_tsqksm"></span></td>
        </tr>
        <!-- 特殊情况说明  end-->
			</tbody>
</table>
温馨提示：（1）请持此证先到<span id="zyz_qrsj"></span>（<span id="zyz_addr1">外科楼1楼大厅</span>）办理床位预约登记，<span id="zyz_bnz"></span>预约成功后请注意查收床位安排通知
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）住院当天来院办理好入院登记手续后请持此证到（<span id="zyz_addr2">外科楼15楼A区</span>）护士站住院
</div>
<br><br>
<div class='print_btn' style='margin-left:50%;margin-top:10px;'><a href='javascript:print_zyz();' class='btnone' ><span class='print'></span>打印</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:closeSCWindow();' class='btnone' ><span class='close'></span>关闭</a></div>
</body>
<script type="text/javascript">
var jiuzhenId='${param.visiteId}';
loadInformation(jiuzhenId);
</script>
</html>