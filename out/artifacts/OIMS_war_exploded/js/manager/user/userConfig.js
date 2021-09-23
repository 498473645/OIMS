/**
 * 用户设置
 */

var userConf_language = {
		PwdSet:148,//密码设置
		SpecialSet:149,//个性化设置
		TouXiangSet:159,//头像设置
		Fwmm:719,//访问密码
		OrigalPwd:906,//原密码
		NewPwd:907,//新密码
		OkPassword:438,//确认密码
		welcome:499,//欢迎词
		workSpace:497,//工作台
		languager:498,//语言
		ShowType:908,//显示类型
		ShowTime:909,//显示时间
		UserName:360,//用户名
		GongHao:361,//工号
		XingMing:35,//姓名
		Job:190,//职务
		Yes:17,//是
		No:18,//否
		UploadHeadPhoto:910,//上传头像
		UserSetting:911,//用户设置
		OrigalPwdNotEmpty:912,//原密码不能为空！
		NewPwdNotEmpty:913,//新密码不能为空！
		ConfirmPwdNotEmpty:914,//确认密码不能为空！
		InputNotSame_Alert:228,//两次输入密码不一致！
		InputWelcomLanguage:915,//输入欢迎词
		InputGztName:916,//输入工作台名称
		Tpscsb:714//图像上传失败
};

var activePageMenu1,activePageDiv1;
function getPageMenu1(menuName,divName)
{
	activePageMenu1 = menuName;
	activePageDiv1 = divName;
}
//切换菜单
function PageMenuActive1(objName,divName)
{
	document.getElementById(activePageMenu1).className = 'tab_hide'; // styles for the unselected Tab
	document.getElementById(activePageDiv1).style.display = 'none';
	document.getElementById(objName).className = 'tab_show'; // styles for selected Tabs
	document.getElementById(divName).style.display = '';
	activePageMenu1 = objName;
	activePageDiv1 = divName;
}
//用户设置
function userConfing(){
	userConf_language = setLanguage(userConf_language);
	var userConfigTable = "<div class='tablabe2 tabline' >"+
		  "<div id='div1_1' class='tab_show' onclick=\"PageMenuActive1('div1_1','div1')\"><span>"+userConf_language.PwdSet+"</span></div>"+
		  "<div id='div1_2' class='tab_hide' onclick=\"PageMenuActive1('div1_2','div2')\"><span>"+userConf_language.SpecialSet+"</span></div>"+
          "<div id='div1_3' class='tab_hide' onclick=\"PageMenuActive1('div1_3','div3')\"><span>"+userConf_language.TouXiangSet+"</span></div>"+
		   "</div>";
	var div = $("<div style='overflow:hidden'/>").attr("id","userConfigDiv").appendTo("body");
	$(userConfigTable).appendTo("#userConfigDiv");
	var pwdConfig ="<div id='div1' class='passwordset'>" +
	                "<form id='pwdResetConfigfm'>"+
			        "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"+
					  "<tr><input type='hidden' name='uid' id='uid'>"+
					    "<td width='16%' align='right'>"+userConf_language.OrigalPwd+"：</td>"+
					    "<td width='41%'><span class='leftalign'>"+
					      "<input name='oldPwd' type='password' class='blurview' id='oldPwd' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" size='28' />"+
					    "</span></td>"+
					    "<td width=43%>&nbsp;</td>"+
					  "</tr>"+
					  "<tr>"+
					    "<td align='right'>"+userConf_language.NewPwd+"：</td>"+
					    "<td><span class='leftalign'>"+
					      "<input name='newPwd' type='password' class='blurview' id='newPwd' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" size='28' />"+
					    "</span></td>"+
					    "<td>&nbsp;</td>"+
					  "</tr>"+
					  "<tr>"+
					    "<td align='right'>"+userConf_language.OkPassword+"：</td>"+
					    "<td><span class='leftalign'>"+
					      "<input name='confirmPwd' type='password' class='blurview' id='confirmPwd' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" size='28' />"+
					    "</span></td>"+
					    "<td>&nbsp;</td>"+
					  "</tr>"+
					  "<tr>"+
					    "<td align='right'>&nbsp;</td>"+
					    "<td>&nbsp;</td>"+
					    "<td>&nbsp;</td>"+
					  "</tr>"+
				"</table>"+
				"</form>"+
         "<div class='openbutton'>"+
           "<a href='javascript:sumbitPwd();'><span class='advsumit'></span>"+language.Submit+"</a>"+
           "<a href='javascript:resetPwd();'><span class='advreset'></span>"+language.Reset+"</a>"+
       "</div>"+
    "</div>";
	$(pwdConfig).appendTo("#userConfigDiv");
	
	var specialConfig = "<div id='div2' style='display:none; overflow:hidden;' >"+
	                       "<form id='specialConfigfm'>"+
					       "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"+
							  "<tr>"+
							    "<td width='16%' align='right'>"+userConf_language.welcome+"：</td>"+
							    "<td colspan='3'><span class='leftalign'>"+
							      "<input name='hyc' type='text' class='blurview' id='hyc' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" size='28' />"+
							    "</span></td>"+
							    "</tr>"+
							  "<tr>"+
							    "<td align='right'>"+userConf_language.workSpace+"：</td>"+
							    "<td colspan='3'><span class='leftalign'>"+
							      "<input name='gzt' type='text' class='blurview' id='gzt' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" size='28' />"+
							    "</span></td>"+
							   " </tr>"+
							  "<tr>"+
							    "<td align='right'>"+userConf_language.languager+"：</td>"+
							    "<td width='33%'><select name='yuyan' id='yuyan'  onblur=\"this.className='blur'\">"+
							      "<option value='24'>中文</option>"+
							      "<option value='25'>English</option>"+
							   " </select></td>"+
							    "<td width='17%'>&nbsp;</td>"+
							    "<td width='34%'>&nbsp;</td>"+
							  "</tr>"+
							  "<tr>"+
							    "<td align='right'>"+userConf_language.ShowType+"：</td>"+
							    "<td><select name='xslx' id='xslx'  onblur=\"this.className='blur'\">"+
							    " <option value='3'>"+userConf_language.UserName+"("+userConf_language.GongHao+")</option>"+
							     " <option value='0'>"+userConf_language.XingMing+"("+userConf_language.Job+")</option>"+
							     " <option value='1'>"+userConf_language.UserName+"("+userConf_language.XingMing+")</option>"+
							     " <option value='2'>"+userConf_language.XingMing+"("+userConf_language.GongHao+")</option>"+
							   " </select></td>"+
							    "<td align='right'>"+userConf_language.ShowTime+"：</td>"+
							    "<td align='left' ><input type='radio' name='xssj' id='xssj' value='1' />"+userConf_language.Yes+" "+
							       " <input type='radio' name='xssj' id='xssj' value='0' /> "+userConf_language.No+"</td>"+
							  "</tr>"+
							"</table>"+
							"</form>"+
							"<div class='openbutton' >"+
							           "<a href='javascript:submitSpecial();'><span class='advsumit'></span>"+language.Submit+"</a>"+
							           "<a href='javascript:initSpecialConfig();'><span class='advreset'></span>"+language.Reset+"</a>"+
							  "</div>"+
					   "</div>";
	$(specialConfig).appendTo("#userConfigDiv");
	
	initSpecialConfig();
	
	var userTXDiv ="<div id='div3' style='display:none; overflow:hidden;' >"+
	               "<form id='upTXForm' action="+contextPath+"'/publish/yuangong/updataYuanGongTouXiang.htm' enctype='multipart/form-data' method='post'>"+
	               "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"+
					          "<tr>"+
					           " <td width='26%' rowspan='4' class='photo'><img src='../ygPhoto/head.png' width='80' height='100' id='image_Tx'/></td>"+
					            "<td width='17%' align='right' class='photo'>"+userConf_language.UploadHeadPhoto+"：</td>"+
					            "<td width='57%' align='left' >"+
					            "<div class='searchfile'>"+
					            "<input type='file' name='yg_photo' class='filed' id='yg_photo' onchange=\"onChange_TouXiangPath();\"/>"+
								"<div class='fieldstyle'><input type='text' name='txt_fieldstyle' readonly='readonly' id='txt_fieldstyle' class='fieldtext'/></div>"+
								"<div class='buttonstyle'><input type='button'  id='btn_yuyan' class='fieldbutton'/></div>"+
								"</div>"+
					         //    "<div class='searchfile'>"+
					        // "<input type='file' name='yg_photo' class='fileField' id='yg_photo' onchange=\"onChange_TouXiangPath();\"/>"+
					         //"<div  class='fieldstyle'><input type='text' name='file' class='fieldtext'></div>"+
					         //"<div  class='buttonstyle'>" +
					          //   "<input type='button' class='fieldbutton' style='' onClick='browse.disabled=false;browse.click();file.value=browse.value;browse.disabled=true' >  " +
					         //"</div>"+
					         //"</div>"+
					            "</td>"+
					          "</tr>"+
					          "<tr>"+
					           " <td align='right' class='photo'>&nbsp;</td>"+
					            "<td>&nbsp;</td>"+
					          "</tr>"+
					          "<tr>"+
					           " <td align='right' class='photo'>&nbsp;</td>"+
					           " <td>&nbsp;</td>"+
					         " </tr>"+
					          "<tr>"+
					            "<td align='right' class='photo'>&nbsp;</td>"+
					            "<td>&nbsp;</td>"+
					          "</tr>"+
					        "</table>"+
					        "</form>"+
					     "<div class='openbutton' >"+
					           "<a href='javascript:refrashTouXiang();'><span class='advsumit'></span>"+language.Submit+"</a>"+
					           "<a href=''><span class='advreset'></span>"+language.Reset+"</a>"+
                         "</div>"+
                     "</div>";
	
	$(userTXDiv).appendTo("#userConfigDiv");
	
	getPageMenu1('div1_1','div1');
	PageMenuActive1('div1_1','div1');
	
	$(div).oimsDialog({winType:4,icon:"addpersonnel",title:userConf_language.UserSetting,drag:false,locked:true,width:"500",height:"240",maxButton:false,minButton:false});
	
	$.customfile('fieldbutton', 'filed', 'fieldtext', "openWin");
}
//修改密码
function sumbitPwd(){
	var oldPwd = $("#oldPwd").val();
	var newPwd = $("#newPwd").val();
	var confirmPwd = $("#confirmPwd").val();
	if(oldPwd==""){
		$.oimsAlert(userConf_language.OrigalPwdNotEmpty);
		return;
	}
	if(newPwd==""){
		$.oimsAlert(userConf_language.NewPwdNotEmpty);
		return;
	}
	if(confirmPwd==""){
		$.oimsAlert(userConf_language.ConfirmPwdNotEmpty);
		return;
	}
	if(newPwd!=confirmPwd){
		$.oimsAlert(userConf_language.InputNotSame_Alert);
		return;
	}
	$("#pwdResetConfigfm").ajaxForm({
		url: contextPath + "/publish/user/modifyUserPwd.htm",
		type: 'post',
        dataType : 'json',
        success : function(data){
        	if(data.state){
        		$.oimsSucc(language.UpdateOK_Alert,function(){
        			$("#userConfigDiv").parent().parent().remove();
        		});
        	}else{
        		$.oimsAlert(data.message);
        	}
        }
	});
	 $("#pwdResetConfigfm").submit();
}

function resetPwd(){
	$("#oldPwd").val("");
	$("#newPwd").val("");
	$("#confirmPwd").val("");
}

function submitSpecial(){
	var hyc = $("#hyc").val();
	var gzt = $("#gzt").val();
	if(hyc==""){
		$.oimsAlert(userConf_language.InputWelcomLanguage);
		return;	
	}
	if(gzt==""){
		$.oimsAlert(userConf_language.InputGztName);
		return;
	}
	
	$("#specialConfigfm").ajaxForm({
		url: contextPath + "/publish/yhpz/modifyYhpz.htm",
		type: 'post',
        dataType : 'json',
        success : function(data){
        	if(data.state){
        		$.oimsSucc(language.UpdateOK_Alert,function(){
        			showSpecialConfig();
        			$("#userConfigDiv").parent().parent().remove();
        		});
        	}else{
        		$.oimsAlert(data.message);
        	}
        }
	});
	 $("#specialConfigfm").submit();
}

function initSpecialConfig(){
	var data = getJSONData("/publish/yhpz/getYhpzByGonghao.htm",{tag:Math.random()});
	if(data.state){
		var yhpz = data.obj;
		$("#hyc").val(yhpz.hyc);
		$("#gzt").val(yhpz.gzt);
		$("#yuyan").val(yhpz.yuyan);
		$("#xslx").val(yhpz.xslx);
		var xssj = (yhpz.xssj)?1:0;
		$("input[name='xssj'][value='"+xssj+"']").attr("checked",true);
	}
}

function showSpecialConfig(){
	var result = getJSONData("/publish/user/getUserData.htm",{tag:Math.random()});
	if(result.state){
		var welcomeStr = "";//欢迎词
		var salutation="" ;//欢迎
		var workSpaceName = "";//工作台名字
		var staffList = result.obj.staff;
		var curStaff = staffList[0];
		var yhpz = result.obj.userConfig;
		if(yhpz != null){
			switch(yhpz.xslx){
				case 0:
					salutation = curStaff.xingming+"("+curStaff.zhiwu+")";
					break;
				case 1:
					salutation = result.obj.uid+"("+curStaff.xingming+")";
					break;
				case 2:
					salutation = curStaff.xingming+"("+curStaff.gonghao+")";
					break;
				default:
					salutation = result.obj.uid+"("+result.obj.gonghao+")";
			}
			if(yhpz.hyc!=null)welcomeStr = yhpz.hyc;
			if(yhpz.gzt!=null)workSpaceName = yhpz.gzt;
		}
		var target=$("#content .left .menu .wel");
		target.text("");
		var span = $("<span />").appendTo(target);
		var ygdata = getJSONData("/publish/yuangong/findYuangongByGonghao.htm",{tag:Math.random()},"post");
		if(ygdata.state){
			var yg = ygdata.obj;
			if(yg.photo!=null&&yg.photo!=""){
				$("<img/>").attr("src",contextPath+yg.photo).width(38).height(38).appendTo(span);
			}else{
				$("<img/>").attr("src","../ygPhoto/head.png").width(38).height(38).appendTo(span);
			}
			
		}else{
			$("<img/>").attr("src","../ygPhoto/head.png").width(38).height(38).appendTo(span);
		}
		
		$("<p />").text(welcomeStr).appendTo(target);
     	$("<p />").text(salutation).appendTo(target);
		if(yhpz!=null && !yhpz.xssj){
			$("<p />").addClass("time").appendTo(target);
		}else{
			var p=$("p.time");
			if(!p.length){
				p=$("<p />").addClass("time").appendTo(target);
			}
			setInterval(function(){
				p.text(getAllTime());
			},1000);
		}
		$("#content .left .menu .modulertitle").text(workSpaceName);
	}
}

var ygPhoto = "";

function onChange_TouXiangPath() {
	 
	$("#upTXForm")[0].action = contextPath
			+ "/publish/yuangong/updataYuanGongTouXiang.htm";
	$("#upTXForm").ajaxForm(
			{
				dataType : "json",
				iframe : true,
				beforeSend : function() {
				},
				uploadProgress : function() {
				},
				complete : function(data_Result) {
					$("#upTXForm")[0].action = "/publish/yuangong/updataYuanGongTouXiang.htm";
					var data_pre = data_Result.responseText;
					var data_string = "";
					if (data_pre.indexOf("</pre") == -1)
						data_string = data_pre;
					else
						data_string = data_pre.substring(data_pre.indexOf("{"),
								data_pre.indexOf("</pre"));
					var data = eval("(" + data_string + ")");
					var data_state = data.state;
					var data_obj = data.obj;
					if (data_state == 1) {
						if (data_obj.photo != null&& data_obj.photo != ""){
							$("#image_Tx").attr("src",contextPath+ data_obj.photo);
							ygPhoto = contextPath +data_obj.photo;
						}
					} else
						$.oimsAlert(userConf_language.Tpscsb, null);
				}
			});
	$("#upTXForm").submit();
}

function refrashTouXiang(){
	$("#content .left .menu .wel span img").attr("src",ygPhoto);
	$("#userConfigDiv").parent().parent().remove();
	$(".lockedBackground").remove();
}

