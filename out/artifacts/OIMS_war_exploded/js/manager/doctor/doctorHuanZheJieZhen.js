/**
 * 患者接诊操作页面（电子病历）
 * 宋仁非
 */

var paintCurrent = 0;
var paintLength = 0;
var paintWin ;


/**
 * 显示工作站界面、页面布局
 * 宋仁非
 * @returns
 */
function showDoctorWorkSpace() 
{
	//显示患者信息、功能按钮的区域（开单、完成、过号……）
	dws.patientTag = $("<div />").height(28)
								 .addClass("pt")
								 .appendTo(".right");
	
	//包含“左、中、右”显示区域
	var work = $("<div />").attr("id","work_song")
						.css({"margin" : "12px",
								border : "1px solid #d2d2d2",
							  overflow : "hidden", 
						   "min-width" : "900px"})  //最小宽度为1000px
						.appendTo(".right");
	
	var h = $("#content").height() - $(".title").outerHeight()
	                               - dws.patientTag.outerHeight() - 38;
	
	work.height(h);
	
	//显示患者就诊记录（就诊时间、接诊医生）的区域
	dws.mcListTag = $("<div />").width(112)
								.height(h)
								.addClass("mcListTag")
								.css("overflow","hidden")
								.appendTo(work);
	
	//显示电子病历的区域
	dws.mcTag = $("<div />").addClass("mcTag")
							.height(h)
							.appendTo(work);
	
	//显示检查单的区域
	dws.displayTag = $("<div />").addClass("displayTag")
								 .css("float", "right")
								 .width(418)
								 .height(h)
								 .appendTo(work);
	
	//动态控制中间电子病历的宽度
	var w = work.width() - dws.mcListTag.outerWidth()- dws.displayTag.outerWidth() - 4;
	
	dws.mcTag.width(w);
	
	//将电子病历区域的宽度赋值给全局变量
	work_song_width = work.width();
	
	work_song_height = work.height();
}

$(document).ready(function(){

	$(window).resize(function(){
		
		checkDivHeightAndWidth();
		
	});
});	

//实时检测div大小是否改变  宋仁非
function checkDivHeightAndWidth()
{
	
	var work_song_now_width = $("#work_song").width();
	
	if(work_song_now_width == 0)
	{
		return false;
	}	
	
	if(work_song_width != work_song_now_width)
	{
		work_song_width = work_song_now_width;
		
		var w = $("#work_song").width() - dws.mcListTag.outerWidth()- dws.displayTag.outerWidth() - 4;
		
		dws.mcTag.width(w);
	}

}


/**
 * 显示患者信息
 * 宋仁非
 * @param pt
 * @param patient
 */
function showPatient(patient,sn,jzid) 
{
	var getJiBingListUrl = "/publish/doctor/getJiBingListUrl.htm";
	//获取疾病类别完整信息   ILL_CATEGORY:40000,//疾病分类
    var jbdata = getJSONData(getJiBingListUrl, {jblb : oimsCategory.ILL_CATEGORY,tag : Math.random()}).obj;
    
    jibing_leibie_data = jbdata;
	
	var pt = dws.patientTag;
	
	//标题栏下边显示患者的基本信息
	showBaseInfoOfPatient(pt,patient);
	
	var hzid = patient.patientId;
	
	//显示患者就诊次数列表和功能按钮
	showMedicalReords(hzid,sn,patient); 
}



//显示患者的基本信息
function showBaseInfoOfPatient(pt,patient)
{
	var leftDiv = $("<div />").attr("style","float:left").appendTo(pt);
	
	var tr = $("<tr />");
	
    $("<table />").attr("cellspacing","0")
                  .attr("cellpadding","0")
                  .attr("border","0")
                  .attr("vertical-align","middle")
                  .append(tr)
                  .appendTo(leftDiv);
	
	
	//显示患者头像
	var td1 = $("<td />").attr("id","s_minihead").appendTo(tr);
	
	if(patient.photo!=null&&$.trim(patient.photo)!="")
	{	
		$("<div />").attr({"class":"headimg_s","style":"display:block;"})
					.append(
							$("<img />").attr("src",contextPath+patient.photo)
				            			.attr("id","pic_head_"+patient.patientId)
				            
			               )
		            .appendTo(td1);
		
		var img_id = "pic_head_"+patient.patientId;
		var img_url = contextPath + patient.photo;
		
		//等比缩放小头像
		dengbisuofang.pic_dengbi(img_id,img_url,38,30);
		
	}
	else
	{
		
		var common_img = "";
		
		if(patient.sex)
		{	
			common_img = contextPath+"/images/pople.png";
		}
		else
		{
			common_img = contextPath+"/images/pople0.png";
		}	
		
		$("<span />").attr("class","headimg")
		 			 .append(
							 $("<img />")
							 			.attr("src",common_img)
							 			.attr("width","30px")
							 			.attr("height","30px")
		 			 		)
		 			 .appendTo(td1);
		
	}	
	
	//鼠标移动到患者小头像上时显示患者的详细信息 
	showFullInfoOfPatient(patient);
	
	
	//显示患者病历号
	var td2 = $("<td />").appendTo(tr);
	$("<strong />").text(language_doctor.BingLiHao+"：").appendTo(td2); //病历号
	if(patient.patientId!=""&&patient.patientId!=null)
	{	
		$("<span />").html(patient.patientId + "&nbsp;").appendTo(td2);
	}
	else
	{
		$("<span />").html("&nbsp;").appendTo(td2);
	}	
	
	//显示患者姓名
	var td3 = $("<td />").appendTo(tr);
	$("<strong />").text(language_doctor.XingMing+"：").appendTo(td3);//姓名
	if(patient.name!=""&&patient.name!=null)
	{	
		$("<span />").html(patient.name + "&nbsp;").appendTo(td3);
	}
	else
	{
		$("<span />").html("&nbsp;").appendTo(td3);
	}
	
	//显示患者性别
	var td4 = $("<td />").appendTo(tr);
	$("<strong />").text(language_doctor.Sex+"：").appendTo(td4); //性别
	var sex = patient.sex ?language_doctor.Male  : language_doctor.Female; //"男""女"
	$("<span />").html(sex + "&nbsp;").appendTo(td4);
	
	//显示患者年龄
	var td5 = $("<td />").appendTo(tr);
	$("<strong />").text(language_doctor.Age+"：").appendTo(td5);//年龄
	if(patient.birthday!=null&&patient.birthday!="")
	{
		var sr = new Date(patient.birthday.time);//"岁"
		$("<span />").text((new Date().getFullYear() - sr.getFullYear()) + language_doctor.sui).append("&nbsp;&nbsp;").appendTo(td5);
	}
	else
	{
		//"岁"
		$("<span />").text(language_doctor.sui).append("&nbsp;").appendTo(td5);
	}
	
	//显示患者电话
	var td6 = $("<td />").appendTo(tr);
	$("<strong />").text(language_doctor.DianHua+"：").appendTo(td6);//电话
	if(patient.mobile!=""&&patient.mobile!=null)
	{	
		$("<span />").html(patient.mobile.substring(0,11) + "&nbsp;").appendTo(td6);
	}
	else
	{
		$("<span />").html("").appendTo(td6);
	}	
}

//鼠标移动到患者小头像上时显示患者的详细信息 
//宋仁非
function showFullInfoOfPatient(patient)
{
	//鼠标移到患者小头像时显示患者详细信息
	$("#s_minihead").mouseover(function(){
		
		$("<div />").attr("id","p_info_full")
					.appendTo("body")              //浮动div直接添加到body上，并且定位方式为绝对定位
					.css({"position":"absolute",
						     "width":"445px",
						    "height":"320px",
					    "background":"rgb(243,244,243)",
					       "display":"block"});
		
		//定位悬浮窗位置
		$("#p_info_full").css({
			top : $("#s_minihead").offset().top ,
			left : $("#s_minihead").offset().left + 30
		});
		
		
		//患者头像
		var src = $.trim(patient.photo);
		if(src==null||!src.length)
		{
			if(patient.sex)
			{	
				src="/images/pople.png";
			}
			else
			{
				src="/images/pople0.png";
			}	
		}
		
		var table_info_full = $("<table />").css("border","1")
											.attr("class","p_info_full_table_0")
										    .appendTo("#p_info_full");
		
		$("<tr />").appendTo(table_info_full)
        		   .append($("<td />").attr({"rowspan":"4","style":"width:115px"}).append(
        				   									$("<img />").attr("src",contextPath + src)
        				   												.attr("id","p_info_full_img")
        				   									)
        				  )
				   .append($("<td />").attr({"class":"p_info_full_0_title","style":"width:80px"}).text("患者姓名:"))
				   .append($("<td />").attr({"class":"p_info_full_0_detail","style":"width:75px"}).text(patient.name!=null?patient.name:""))
				   .append($("<td />").attr({"class":"p_info_full_0_title","style":"width:80px"}).text("注册时间:"))
				   .append($("<td />").attr({"class":"p_info_full_0_detail","style":"width:95px"}).text(patient.zcrq_str!=null?patient.zcrq_str:""));
		var img = $("#p_info_full_img");
		var rel ;
		if(src=="/images/pople.png"||src=="/images/pople0.png")
		{
			rel = imageZoom(116,108,95,95);
		}
		else
		{
			rel = imageZoom(patient.w,patient.h,95,95);
		}	
		
		//图片左右居中
		if(rel.width<95)
		{
			var temp = (95-rel.width)/2;
			img.attr("style","padding-left: "+temp+"px;");
		}
		//图片上下居中
		if(rel.height<95)
		{
			var temp = (95-rel.height)/2;
			img.attr("style","padding-top: "+temp+"px;");
		}	
		
		img.attr("width",rel.width);
		img.attr("height",rel.height);
		
		$("<tr />").appendTo(table_info_full)
				   .append($("<td />").attr({"class":"p_info_full_0_title"}).text("患者性别:"))
				   .append($("<td />").attr({"class":"p_info_full_0_detail"}).text(patient.sex==true?language_doctor.Male:language_doctor.Female))
				   .append($("<td />").attr({"class":"p_info_full_0_title"}).text("所属地区:"))
				   .append($("<td />").attr({"class":"p_info_full_0_detail"}).text(patient.diquname==null?"":patient.diquname));
		
		$("<tr />").appendTo(table_info_full)
				   .append($("<td />").attr({"class":"p_info_full_0_title"}).text("手机号码:"))
				   .append($("<td />").attr({"class":"p_info_full_0_detail"}).text(patient.mobile!=null?patient.mobile:""))
				   .append($("<td />").attr({"class":"p_info_full_0_title"}).text("是否医保:"))
				   .append($("<td />").attr({"class":"p_info_full_0_detail"}).text(patient.yibao==true?"是":"否"));
		
		$("<tr />").appendTo(table_info_full)
				   .append($("<td />").attr({"class":"p_info_full_0_title"}).text("出生日期:"))
				   .append($("<td />").attr({"class":"p_info_full_0_detail"}).text(patient.birthday_str!=null?patient.birthday_str:""))
				   .append($("<td />").attr({"class":"p_info_full_0_title"}).text("身份证号:"))
				   .append($("<td />").attr({"class":"p_info_full_0_detail"}).text(patient.sfzh!=null?patient.sfzh:""));
		
		var table_info_full_1 = $("<table />").css("border","1")
											  .attr("class","p_info_full_table_1")
	    									  .appendTo("#p_info_full");
		
		$("<tr />").appendTo(table_info_full_1)
				   .append($("<td />").attr({"style":"width:10px"}))
				   .append($("<td />").attr({"class":"p_info_full_1_title","style":"width:80px"}).text("固定电话:"))
				   .append($("<td />").attr({"class":"p_info_full_1_detail","style":"width:100px"}).text(patient.dianhua!=null?patient.dianhua:""))
				   .append($("<td />").attr({"class":"p_info_full_1_title","style":"width:80px"}).text("工作单位:"))
				   .append($("<td />").attr({"class":"p_info_full_1_detail","style":"width:175px"}).text(patient.gzdw!=null?patient.gzdw:""));
		
		$("<tr />").appendTo(table_info_full_1)
				   .append($("<td />"))
				   .append($("<td />").attr("class","p_info_full_1_title").text("患者来源:"))
				   .append($("<td />").attr("class","p_info_full_1_detail").text(patient.laiyuan!=null?patient.laiyuan:""))
				   .append($("<td />").attr("class","p_info_full_1_title").text("单位地址:"))
				   .append($("<td />").attr("class","p_info_full_1_detail").text(patient.dwdz!=null?patient.dwdz:""));
		
		$("<tr />").appendTo(table_info_full_1)
		           .append($("<td />"))
				   .append($("<td />").attr("class","p_info_full_1_title").text("患者家属:"))
				   .append($("<td />").attr("class","p_info_full_1_detail").text(patient.hzlxr!=null?patient.hzlxr:""))
				   .append($("<td />").attr("class","p_info_full_1_title").text("单位邮编:"))
				   .append($("<td />").attr("class","p_info_full_1_detail").text(patient.dwyb!=null?patient.dwyb:""));
		
		$("<tr />").appendTo(table_info_full_1)
		           .append($("<td />"))
				   .append($("<td />").attr("class","p_info_full_1_title").text("紧急电话:"))
				   .append($("<td />").attr("class","p_info_full_1_detail").text(patient.hzlxrdh!=null?patient.hzlxrdh:""))
				   .append($("<td />").attr("class","p_info_full_1_title").text("邮政编码:"))
				   .append($("<td />").attr("class","p_info_full_1_detail").text(patient.youbian!=null?patient.youbian:""));
		
		$("<tr />").appendTo(table_info_full_1)
		           .append($("<td />"))
				   .append($("<td />").attr("class","p_info_full_1_title").text("家庭地址:"))
				   .append($("<td />").attr("class","p_info_full_1_detail").attr("colspan","3").text(patient.jtdz!=null?patient.jtdz:""))
				   ;
		
		$("<tr />").appendTo(table_info_full_1)
		           .append($("<td />"))
				   .append($("<td />").attr("class","p_info_full_1_title").text("备注说明:"))
				   .append($("<td />").attr("class","p_info_full_1_detail").attr("colspan","3").text(patient.beizhu!=null?patient.beizhu:""))
				   ;
	});
	
	//鼠标移出患者小头像时移除信息弹窗
	$("#s_minihead").mouseout(function(){
		
		$("#p_info_full").remove();
		
	});
}







