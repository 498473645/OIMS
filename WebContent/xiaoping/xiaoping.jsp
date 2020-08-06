<%-- 
    Document   : index.jsp
    Created on : 2010-8-30, 12:24:12
    Author     : liyan
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>OIMS</title>
        <link href="${pageContext.request.contextPath}/xiaoping/css/main.css" rel="stylesheet" type="text/css" />
        <script type="text/javascript" src="${pageContext.request.contextPath}/xiaoping/js/jquery-1.6.2.min.js"></script>   
		<script src="${pageContext.request.contextPath}/xiaoping/js/common.js"></script>
         <script src="${pageContext.request.contextPath}/xiaoping/js/jquery.oimsDialog.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/xiaoping/js/jquery.createPageList.js"></script>
        <script src="${pageContext.request.contextPath}/xiaoping/js/jquery.form.js"></script>
        <script src="${pageContext.request.contextPath}/xiaoping/js/main.js"></script>
        <script src="${pageContext.request.contextPath}/xiaoping/js/switchFun.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/xiaoping/xiaopingCaiJiManager.js"></script>
        
        <script type="text/javascript">
            var contextPath="${pageContext.request.contextPath}";
            
            function isServerCon(state){
            	if(state){
            	 $("<span title='"+xiaoping_language.fuwuqizhengchang+"' class='link'></span>").appendTo(".logo");
            	}else{
            		$("<span title='"+xiaoping_language.fuwuqiyichang+"' class='nolink'></span>").appendTo(".logo");
            	}
            };
            function isClientCon(state){
            	if(state){
            	 $("<span title='"+xiaoping_language.fuwuqizhengchang+"' class='link'></span>").appendTo(".logo");
            	}else{
            		$("<span title='"+xiaoping_language.fuwuqiyichang+"' class='nolink'></span>").appendTo(".logo");
            	}
            }
        </script>
    </head>

    <body>
       <div class="content">
   			<div class="header">
       			<div class="logo"><span id="showTime"></span></div>
   			</div>
  			 <div class="main">
			     <div class="menuleft">
			         <ul>
			         <li class="opation1" id ="opation1id"></li>
			         <li class="opation2" id ="opation2id"></li>
			         <li class="opation3" id ="opation3id"></li>
			         <li class="opation4" id ="opation4id"></li>
			         </ul>
			     </div>
			     <div class="contant">
			            <div class="info">
			               <div class="i">
			                    <div class="querybg">
			                      <div class="number">
			                        <input name="biginput" id="biginput" type="text" class="biginput" value=""/>&nbsp;
			                        <input name="queryhz" type="button" class="querybtn1" id="queryhz"/> &nbsp;
			                        <input name="showkey" type="button" class="enter"  id="show"/>
			                      </div>
									<div id="opendiv"  class="key" style="display:none;" >
									              <ul>
												     <li onmousedown="keyNum(1);">1</li>
												     <li onmousedown="keyNum(2);">2</li>
												     <li onmousedown="keyNum(3);">3</li>
												     <li onmousedown="keyNum(4);">4</li>
												     <li onmousedown="keyNum(5);">5</li>
												     <li onmousedown="keyNum(6);">6</li>
												     <li onmousedown="keyNum(7);">7</li>
												     <li onmousedown="keyNum(8);">8</li>
												     <li onmousedown="keyNum(9);">9</li>
												     <li onmousedown="keyNum(0);">0</li>
												     <li onmousedown="keyNum('-');">-</li>
												     <li onmousedown="keyNum('q');">Q</li>
												     <li onmousedown="keyNum('w');">W</li>
												     <li onmousedown="keyNum('e');">E</li>
												     <li onmousedown="keyNum('r');">R</li>
												     <li onmousedown="keyNum('t');">T</li>
												     <li onmousedown="keyNum('y');">Y</li>
												     <li onmousedown="keyNum('u');">U</li>
												     <li onmousedown="keyNum('i');">I</li>
												     <li onmousedown="keyNum('o');">O</li>
												     <li onmousedown="keyNum('p');">P</li>
												     <li onmousedown="keyNum('exit');"><span class="delect"></span></li>
												     <li onmousedown="keyNum('a');">A</li>
												     <li onmousedown="keyNum('s');">S</li>
												     <li onmousedown="keyNum('d');">D</li>
												     <li onmousedown="keyNum('f');">F</li>
												     <li onmousedown="keyNum('g');">G</li>
												     <li onmousedown="keyNum('h');">H</li>
												     <li onmousedown="keyNum('j');">J</li>
												     <li onmousedown="keyNum('k');">K</li>
												     <li onmousedown="keyNum('l');">L</li>
												     <li class="enterr" onmousedown="keyNum('enter');">Enter</li>
												     <li id="capsLock" class="enterr" onmousedown="keyNum('capslock');">CapsLock</li>      
												     <li onmousedown="keyNum('z');">Z</li>
												     <li onmousedown="keyNum('x');">X</li>
												     <li onmousedown="keyNum('c');">C</li>
												     <li onmousedown="keyNum('v');">V</li>
												     <li onmousedown="keyNum('b');">B</li>
												     <li onmousedown="keyNum('n');">N</li>
												     <li onmousedown="keyNum('m');">M</li>
												     <li  class="enterr" onmousedown="keyNum(' ');">Space</li>
    											</ul>
									          <!-- ul>
         										<li class="one" onmousedown="keyNum(1);"></li>
										         <li class="two" onmousedown="keyNum(2);"></li>
										         <li class="three" onmousedown="keyNum(3);"></li>
										         <li class="four" onmousedown="keyNum(4);"></li>
										         <li class="five" onmousedown="keyNum(5);"></li>
										         <li class="six" onmousedown="keyNum(6);"></li>
										         <li class="seven" onmousedown="keyNum(7);"></li>
										         <li class="eight" onmousedown="keyNum(8);"></li>
										         <li class="nain" onmousedown="keyNum(9);"></li>
										         <li class="del" onmousedown="keyNum('c');"></li>
										         <li class="zero" onmousedown="keyNum(0);"></li>
										         <li class="okbg" id="hide"></li>
										        </ul-->
									  </div>
				                    </div>
				                   <div class="patientinfo">
                                 <table width="100%" border="0" cellspacing="0" cellpadding="0">
						              <tr>
						               
						                <td><span id="xiaoping_xingming"></span>
						                <input type="hidden" id="huanzheId"/>
						                <input type="hidden" id="jiuzhenId"/>
						                <input type="hidden" id="jcdId"/>
						                </td>
						                <td><input name="xingming" type="text" id="xingming" readonly/></td>
						                <td ><span id="xiaoping_sex"></span></td>
						                <td><input name="xingbie" type="text" id="xingbie" readonly/></td>
						                <td><span id="xiaoping_age"></span></td>
						                <td><input name="nianling" type="text" id="nianling"  readonly/></td>
						              </tr>
						              <tr>
						                <td><span id="xiaoping_jcxm"></span></td>
						                <td><input name="jcxmmc" type="text" id="jcxmmc" readonly/></td>
						                <td><span id="xiaoping_yanbie"></span></td>
						                <td><input name="yanbie" type="text" id="yanbie" readonly/></td>
						                <td><span id="xiaoping_jcys"></span></td>
						                <td><input name="jcys" type="text" id="jcys" readonly/>
						                    <input type="hidden" id="jcysgh"/>
						                </td>
						              </tr>
						            </table>

				                   </div>
				               </div>
				           </div>
				           <div class="tabinfo">
				               <div class="title">已检列表</div>
				               <div id="tablist" class="tabmain list">
                
                               </div>
                          </div>
     </div>
     <div class="menuright">
          <ul>
          <li class="opation1"></li>
          <li class="opation2"></li>
          <li class="opation3"></li>
          <li class="opation4"></li>
          </ul>
     </div>
   </div>
   <div id="footer" class="footer">
   </div>
</div>
</body>

</html>
