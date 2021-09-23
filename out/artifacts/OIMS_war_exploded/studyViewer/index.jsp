<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>OIMS影像浏览</title>
<link href="skin/${param.css}/css/main.css" rel="stylesheet" type="text/css" />
<link href="skin/${param.css}/css/${param.css}.css" rel="stylesheet" type="text/css" />
<link type="text/css" href="${pageContext.request.contextPath}/studyViewer/css/smoothness/jquery-ui-1.8.16.custom.css" rel="stylesheet" />	
<script type="text/javascript" src="${pageContext.request.contextPath}/studyViewer/js/jquery-1.6.2.min.js"></script>
<%--<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.swfobject.js"></script> --%>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.swfobject.1-1-1.min.js"></script> 
<script type="text/javascript" src="${pageContext.request.contextPath}/studyViewer/js/jquery-ui-1.8.16.custom.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/studyViewer/js/curvycorners.src.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.ae.image.resize.min.js"></script>
<script type="text/javascript" src="js/functions.js"></script>
<style type="text/css">
	.logo{position:static; margin:0 auto}
	.prev,.next{float:left; text-align:center; width:88px; padding-top:28px}
	.prev{margin-left:18px}
	.prev img,.next img{margin:0; border:0}
	.wrapper{float:left;  padding:0; margin:0}
	.rightInfoTop ul li{padding-top:0}
	.rightInfoTop span{height:18px}

	.minImg{padding:0; height:108px}
	.rightInfoBottom{height:108px}
	.rightInfoMiddle{ background:none  ; opacity:1; filter:alpha(opacity=100);}
</style>
<script language="javascript">
var ysgh="";
var blh="";
var hzid="";
ysgh='${param.ysgh}';
blh='${param.blh}';
hzid='${param.hzid}';
var contextPath='${pageContext.request.contextPath}';
</script>
</head>

<body>
<!--添加HEADERBG-->
<div class="headerbg"></div>
<!--<!--添加HEADERBG  end-->
<div class="header">
<div class="colorstyle">
      <ul>
      <li><a href="?css=pink&hzid=${param.hzid}"><img src="skin/black/images/pink.png" width="13" height="13" class="imgcurse" /></a></li>
      <li><a href="?css=black&hzid=${param.hzid}"><img src="skin/black/images/black.png" width="13" height="13" class="imgcurse"  /></a></li>
      <li><a href="?css=blue&hzid=${param.hzid}"><img src="skin/black/images/blue.png" width="13" height="13"  class="imgcurse" /></a></li>
      </ul>
  </div>
  <table  border="0" cellspacing="0" cellpadding="0" >
    <tr>
      <td nowrap="nowrap"><img src="skin/blue/images/tx.png" width="43" height="42" /></td>
      <td nowrap="nowrap">姓名：</td>
      <td class="info" id="patientname" nowrap="nowrap"></td>
      <td nowrap="nowrap">性别：</td>
      <td class="info" id="sex" nowrap="nowrap"></td>
      <td nowrap="nowrap">出生日期：</td>
      <td class="info" id="birthday" nowrap="nowrap"></td>
      <td nowrap="nowrap">身份证号：</td>
      <td class="info" id="ident" nowrap="nowrap"></td>
      <td nowrap="nowrap">病历号：</td>
      <td class="info" id="patientId" nowrap="nowrap"></td>
      <td nowrap="nowrap">是否医保：</td>
      <td class="info" id="insured" nowrap="nowrap"></td>
    </tr>
  </table>
  
</div>

<div class="content">
  <div class="leftmenu">
   <!-- <div class="leftMenuTop"></div>
    <div class="leftMenuMiddle"> 去掉的代码-->
           <div class="leftmenubg"></div><!--增加的DIV-->
            <div class="menu">
                  <div class="menutop">
                       <ul>
                       <li>常用功能</li>
                       </ul>
                  </div>
                  <div class="menumiddle">
                      <ul>
                          <li class="fd" onmousemove="this.className='fd1'" onmouseout="this.className='fd'"  ></li>
                          <li class="xs" onmousemove="this.className='xs1'" onmouseout="this.className='xs'" ></li>
                          <li class="cz" onmousemove="this.className='cz1'" onmouseout="this.className='cz'" ></li>
                          <li class="xz" onmousemove="this.className='xz1'" onmouseout="this.className='xz'" ></li>
                      </ul>
                  </div>
                  <div class="menubottom"></div>
            </div>
            <div class="menu">
                  <div class="menutop">
                    <ul>
                    <li>图像调节</li>
                    </ul>
                  </div>
                  <div class="menumiddle">
                      <ul>
                          <li class="ld" onmousemove="this.className='ld1'" onmouseout="this.className='ld'"  ></li>
                          <li class="dbd" onmousemove="this.className='dbd1'" onmouseout="this.className='dbd'" ></li>
                          <li class="bhd" onmousemove="this.className='bhd1'" onmouseout="this.className='bhd'" ></li>
                          <li class="sx" onmousemove="this.className='sx1'" onmouseout="this.className='sx'" ></li>
                          <li class="fzys" onmousemove="this.className='fzys1'" onmouseout="this.className='fzys'"></li>
                          <li class="qs" onmousemove="this.className='qs1'" onmouseout="this.className='qs'" ></li>                          
                       </ul>                  
                  </div>
                  <div class="menubottom"></div>
            </div>
            <div class="menu">
                  <div class="menutop">
                    <ul>
                    <li>高级功能</li>
                    </ul>                  
                  </div>
                  <div class="menumiddle">
                       <ul>
                          <li class="cl" onmousemove="this.className='cl1'" onmouseout="this.className='cl'" ></li>
                          <li class="bj" onmousemove="this.className='bj1'" onmouseout="this.className='bj'" ></li>
                          <li class="hb" onmousemove="this.className='hb1'" onmouseout="this.className='hb'" ></li>        
                       </ul>          
                  </div>
                  <div class="menubottom"></div>
            </div>
            <div class="menu">
                  <div class="menutop">
                    <ul>
                    <li>浏览功能</li>
                    </ul>                 
                    
                    </div>
                  <div class="menumiddle">
                          <ul>
                          <li class="sj" onmousemove="this.className='sj1'" onmouseout="this.className='sj'" ></li>
                          <li class="xm" onmousemove="this.className='xm1'" onmouseout="this.className='xm'" ></li>         
                          </ul>            
                  </div>
                  <div class="menubottom"></div>
            </div>
            <div class="logo"></div>                               
   <!-- </div>
    
    <div class="leftMenuBottom"></div>去掉的代码-->
    
  </div>

  <div class="rightInfo">
      <div class="rightInfobg"></div><!--增加的DIV-->
       <div class="rightInfoTop">
           <span><img src="skin/blue/images/sj.png"  /></span>
            <ul>
               <li class="on"> 2012-01-23</li>
              <li class="off">2012-01-23</li>
              <li class="off">2012-01-23</li>
            </ul>
    </div>
    <div class="rightInfoMiddlebg"></div><!--增加的DIV-->
       <div  class="rightInfoMiddle" id="center"></div>
       <div class="rightInfoBottom">
          <div class="minImg">
          <div class="prev">
          		<img src="skin/blue/images/left3-disabled.png" />
          </div>
			<div class="wrapper"></div>
			<div class="next">
				<img id="next-arrow" src="skin/blue/images/right3-disabled.png" />
			</div>
          </div>
       </div>
  </div>
</div>
</body>
</html>
