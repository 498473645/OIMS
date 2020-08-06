/*
 * 医生工作站 入口文件
 * @author 宋仁非
 */

//医生工作站全局变量


//加载医生工作站的js和css文件
function _doctor_loadJsAndCss_YiSheng()
{
	
	/**
	 * 加载欢迎页面
	 */
	loadWelcomePage();
	
	//加载全局变量
	importJS("/js/manager/doctor/doctor_global_variabl.js");
	
	//加载测试数据
	importJS("/js/manager/doctor/doctor_demo_data.js");
	
	//后台交互url
	importJS("/js/manager/doctor/doctor_url.js");

	//医生工作站语言
	importJS("/js/manager/doctor/doctor_language.js");
	
	//医生工作站通用方法
	importJS("/js/manager/doctor/doctor_common.js");
	
	importCSS("/css/doctorWorkstation.css");

	importCSS("/css/oimsInput.css");
	
	importCSS("/css/doctor.css");
	
	//导入显示历次就诊记录
	importJS("/js/manager/doctor/doctor_show_Jiuzhen_List.js");
	
	//显示功能按钮
	importJS("/js/manager/doctor/doctor_show_Function_Button.js");
	
	//导入诊断页面
	importJS("/js/manager/doctor/doctor_show_JiuZhen_ZhenDuan.js");
	
	//导入处方页面
	importJS("/js/manager/doctor/doctor_show_JiuZhen_ChuFang.js");
	
	//导入开单页面js
	importJS("/js/manager/doctor/doctor_show_KaiDan.js");
	
	//导入显示病历记录页签
	importJS("/js/manager/doctor/doctor_show_BingLi_JiLu_Tab.js");
	
	//导入显示病历记录内容的js
	importJS("/js/manager/doctor/doctor_show_BingLi_JiLu_info.js");

	//导入医生电子病历界面js
	importJS("/js/manager/doctor/doctorHuanZheJieZhen.js");
	
	//导入就诊对比界面js
	importJS("/js/manager/doctor/doctor_show_JiuZhen_DuiBi.js");

	//导入检查单界面js
	importJS("/js/manager/doctor/doctor_show_JianChaDan.js");
	
	//导入等比缩放图片功能js
	importJS("/js/oims_dengbi.js");
	
	//导入眼压曲线展示插件
	importJS("/highcharts/highcharts.js") ;
	importJS("/highcharts/exporting.js");
	
	//导入jquery_ui
	importJS("/jquery_ui/js/jquery-ui-1.10.2.custom.js") ;
	importCSS("/jquery_ui/css/start/jquery-ui-1.10.2.custom.css");
		
	//加载语言
	language_doctor = setLanguage(language_doctor);
	
}

/**
 * 获取一个最早录入系统的未接诊的患者 (“患者接诊”程序主入口)
 * 宋仁非
 * --入口--
 */
function selectOnePatient()
{
	//标识进入医生工作站主界面的动作是由点击医生工作站模块菜单操作的.
	huanzheguanli_tiaozhuan_flag = 0;
	
	
	var p = null;
	var his_flag_1726 = getJSONData("/publish/getSessionHisFlag.htm", {tag : Math.random()},"POST").obj;
	
	if(his_flag_1726 == "10A")
	{
		var patient_his_id = getJSONData("/publish/getSessionHisPatientId.htm", {tag : Math.random()},"POST").obj;
		
		p = getJSONData("/publish/tj_getPatientInfo.htm", {"patient_id":patient_his_id,tag : Math.random()},"POST").obj;
		
		p.SN = 1;
	}
	else
	{	
		var patientListTodayUrl = "/publish/doctor/patientListToday.htm";
		//获取当前登录医生名下待诊患者列表
		var ps = getJSONData(patientListTodayUrl, {state:oimsCategory.VISITING_STATE_WAIT,searchText:"",tag : Math.random()},"POST").obj;
		
		if(ps==null||ps==""||ps.length==0)//如果当前医生没有待诊患者则显示"当前没有患者提示页面"
		{
			$("<div />").attr("class","backup1").append($("<p />").append(language_doctor.NoDaiZhenHuanZhe+"！")).appendTo(".right");
			return false;
		}
		
		//默认显示待诊患者的第一个
		p = ps[0];
	}
	//在页面标题位置显示统计信息
	showHuanZheTongJi();
	
	//显示一个患者的信息
	showOnePatient(p,p.SN);
}


/**
 * 今日待诊患者列表 (“待诊患者”程序主入口)
 * 宋仁非
 * --入口--
 */
function showPatientListToday() 
{
	//每次初始化时清空这些全局变量的值
	dzhz=null;
	fzhz=null;
	ghhz=null;
	wchz=null;
	
	//在页面标题位置显示统计信息
	showHuanZheTongJi();
	
	//顶部左侧页签拼接和右侧搜索框功能按钮显示
	showTabAndSearchBtn();
	
	//判断显示模式
	if(display_mode == "block")
	{
		showBlock(oimsCategory.VISITING_STATE_WAIT); //方块显示
	}
	else if(display_mode == "grid")
	{
		showGrid(oimsCategory.VISITING_STATE_WAIT);  //表格显示
	}	
	
	global_state = oimsCategory.VISITING_STATE_WAIT;

}

/**
 * 患者管理跳转医生工作站
 * @param jz 就诊记录信息
 * @author 宋仁非
 * --入口--
 */

function showHuanZheGuanLi(p)
{	
	huanzheguanli_tiaozhuan_flag = 1;
	showTitle(language_doctor.HuanZheJieZhen);
	
	showHuanZheTongJi();
	
	showOnePatient(p,p.SN);
	
}


/**
 * 显示标题栏患者统计信息
 * 宋仁非
 */
function showHuanZheTongJi()
{
	
	var patientListTodayUrl = "/publish/doctor/getPatientStateCount.htm";
	
	//获取今天当前登录医生待诊患者列表
	var dzhzs = getJSONData(patientListTodayUrl, {state:oimsCategory.VISITING_STATE_WAIT,searchText:"",tag : Math.random()},"POST").obj;
	//获取今天当前登录医生复诊患者列表
	var fzhzs = getJSONData(patientListTodayUrl, {state:oimsCategory.VISITING_STATE_AGAIN,searchText:"",tag : Math.random()},"POST").obj;
	//获取今天当前登录医生已过号患者列表
	var yghhzs = getJSONData(patientListTodayUrl, {state:oimsCategory.VISITING_STATE_YIGUOHAO,searchText:"",tag : Math.random()},"POST").obj;
	//获取今天当前登录医生已完成患者列表
	var ywchzs = getJSONData(patientListTodayUrl, {state:oimsCategory.VISITING_STATE_YIWANCHENG,searchText:"",tag : Math.random()},"POST").obj;
	
	//给全局变量赋值
	dzhz=dzhzs;
	fzhz=fzhzs;
	ghhz=yghhzs;
	wchz=ywchzs;
	
    var hz_total = dzhz+fzhz+ghhz+wchz;
	
    //今日接诊患者总数
	$("<strong />").text(language_doctor.todayHuanZheTotal+"：").appendTo(".title .sum");
	$("<span />").text("[").appendTo(".title .sum");
	$("<span />").append($("<font />").attr("class","red").text(hz_total)).appendTo(".title .sum");
	$("<span />").text("]"+language_doctor.ren+":").appendTo(".title .sum");
	
	//待诊患者
	$("<strong />").text(language_doctor.daiZhenHuanZhe+"：").appendTo(".title .sum");
	$("<span />").text("[").appendTo(".title .sum");
	$("<span />").append($("<font />").attr("class","red").text(dzhz)).appendTo(".title .sum");
	$("<span />").text("]"+language_doctor.ren+",").appendTo(".title .sum");
	
	//复诊患者
	$("<strong />").text(language_doctor.FuZhenHuanZhe+"：").appendTo(".title .sum");
	$("<span />").text("[").appendTo(".title .sum");
	$("<span />").append($("<font />").attr("class","blue").text(fzhz)).appendTo(".title .sum");
	$("<span />").text("]"+language_doctor.ren+",").appendTo(".title .sum");
	
	//已过号患者
	$("<strong />").text(language_doctor.YiGuoHaoHuanZhe+"：").appendTo(".title .sum");
	$("<span />").text("[").appendTo(".title .sum");
	$("<span />").append($("<font />").attr("class","green").text(ghhz)).appendTo(".title .sum");
	$("<span />").text("]"+language_doctor.ren+",").appendTo(".title .sum");
	
	//已完成患者
	$("<strong />").text(language_doctor.YiWanChengHuanZhe+"：").appendTo(".title .sum");
	$("<span />").text("[").appendTo(".title .sum");
	$("<span />").append($("<font />").attr("class","green").text(wchz)).appendTo(".title .sum");
	$("<span />").text("]"+language_doctor.ren).appendTo(".title .sum");
}

//顶部左侧页签拼接和右侧搜索框功能按钮显示
function showTabAndSearchBtn()
{
	var getJiuZhenStateUrl = "/publish/doctor/getJiuZhenStateUrl.htm";
	
	//获取患者状态分类页签
	var zhuangtailist = getJSONData(getJiuZhenStateUrl, {state:oimsCategory.VISITING_STATE,tag : Math.random()}).obj;
	
	var table1 = $("<div />").attr("class","tablabel").addClass("emr_doctorTitle01")//.attr("style","padding-left:10px;height:36px;padding-top:0px")
							 .appendTo(".right");
	
	//左侧页签div
	var table_l =  $("<div />").addClass("emr_doctorTitle02")//.attr("style","float: left;padding-top:10px")
							   .appendTo(table1);
	
	//右侧搜索框 切换按钮div
	var table_r =  $("<div />").addClass("emr_doctorTitle03")//.attr("style","float: right;padding-top:4px")
							   .appendTo(table1);
	
	//循环生成页签  添加到左侧页签div
	for(var i = 0 ;i<zhuangtailist.length;i++)
	{
		var x = i+1;
		var tableclass = "tab_hide";
		
		//默认显示待诊患者页签
		if(zhuangtailist[i].id == oimsCategory.VISITING_STATE_WAIT)
		{
			tableclass = "tab_show";
		}	
		
		$("<div />").attr("id","div_"+x)
					.attr("class",tableclass)
					.attr("onclick","PageMenuActive_song('"+zhuangtailist[i].id+"','div_"+x+"')")
					.append($("<span />").text(zhuangtailist[i].category))
					.appendTo(table_l);
	}
	
	//定义右侧搜索div 添加到右侧div
	var searchDiv =  $("<div />").addClass("emr_searchDiv");//.attr("style","width:400px;height:26px;margin-right:10px;margin-bottom:0px;float: right;");//.appendTo(".right");
	
	searchDiv.appendTo(table_r);
	
	
	//用table布局右侧的搜索框、搜索按钮、切换功能按钮
	var searchtable = $("<table />").addClass("emr_searchTable")//.attr({"width":"100%","cellspacing":"0","cellpadding":"0","border":"0"})
	                                .appendTo(searchDiv);
	
	var tableTr = $("<tr />").appendTo(searchtable);
	
	
	var tableTd1 = $("<td />").appendTo(tableTr);
	 				 $("<input />").attr({"type":"text","size":"35","value":language_doctor.InputBlhOrXingMing,  //请输入病历号或姓名
										  "onblur":"this.className='blur';searchTextOnBlur()", 
		                                  "onfocus":"this.className='focus';searchTextOnFocus()",
		                                  "id":"search","class":"blur", "name":"search"})
		                           .appendTo(tableTd1);
	
	 				 
	var tableTd2 = $("<td />").appendTo(tableTr);
					$("<a />").attr({"href":"javascript:searchSumit_S()","class":"search"})
	                          .append(language.Query)  //查询
							  .appendTo(tableTd2);
	
					
	var tableTd3 = $("<td />").appendTo(tableTr);
					$("<a />").attr({"href":"javascript:changeShow()","class":"cutbg"})
							  .append($("<span />").attr("class","cut"))
							  .append(language_doctor.ShowChange)  //显示切换
	                          .appendTo(tableTd3);
}




//搜索文本框获取焦点事件  宋仁非
function searchTextOnFocus()
{
	if($("#search").val()==language_doctor.InputBlhOrXingMing) //请输入病历号或姓名
	{
		$("#search").val("");
	}	
}

//搜索文本框失去焦点事件  宋仁非
function searchTextOnBlur()
{
	if($("#search").val()=="")
	{
		$("#search").val(language_doctor.InputBlhOrXingMing);  //请输入病历号或姓名
	}	
}

//搜索该分类下的患者  宋仁非
function searchSumit_S()
{
	$("#search").val($.trim($("#search").val()));
	
	if($("#search").val()==language_doctor.InputBlhOrXingMing) //请输入病历号或姓名
	{
		$("#search").val("");
	}
	else
	{
		//标识此操作是由点击搜索按钮触发的
		search_bl = true;
		PageMenuActive_song(global_state,"change");
	}	
}

//回车搜索  宋仁非
$("body").keyup(function(event){
	
	var activeElementId = document.activeElement.id;
	
	if(event.which == 13 && activeElementId == "search")
	{
		searchSumit_S();
	}
});


//切换列表和方块显示  宋仁非
function changeShow()
{
	if(display_mode == "block")
	{
		display_mode = "grid";
	}
	else if(display_mode == "grid")
	{
		display_mode = "block";
	}	
	
	search_bl = true;
	
	PageMenuActive_song(global_state,"change");
}


/**
 * 待诊患者页面页签切换
 * 宋仁非
 */
function PageMenuActive_song(state,div_title)
{
	if(div_title!="change")
	{
		$(".tab_show").removeClass("tab_show").addClass("tab_hide");
		$("#"+div_title).removeClass("tab_hide").addClass("tab_show");
		
		search_bl = false;
	}
	if(display_mode == "block")
	{
		showBlock(state);
	}
	else if(display_mode == "grid")
	{
		showGrid(state);
	}	
	
	global_state = state;
	
	
}


//显示患者"方块"列表       宋仁非
function showBlock(state)
{
	
		if($(".mainBody").length>0)
		{
			$(".mainBody").remove();
		}	
	
		var searchText = "";
		
		if(search_bl)
		{	
			$("#search").val($.trim($("#search").val()));
			searchText = $("#search").val();
		}
		else
		{
			searchText = "";
		}	
		var div = $("<div />")
					.addClass("mainBody")
					.addClass("emr_minwidth")
					//.css("min-width" , "900px")
					.height($("#content").height() - $(".title").outerHeight()-$(".tablabel").outerHeight()-5)
					.appendTo(".right");
		
		var ul = $("<ul />").appendTo(div);
		
		var pl = "";
		
		var patientListTodayUrl = "/publish/doctor/patientListToday.htm";
		
		//获取该患者状态下过滤搜索条件后的患者列表
		pl = getJSONData(patientListTodayUrl, {state:state,searchText:searchText,tag : Math.random()},"POST").obj;
		
		
		
		if(pl!=null&&pl.length>0)  //如果患者列表不为空
		{	
			$.each(pl, function(i, patient) 
			{
				var li = $("<li />").appendTo(ul);
				
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
				var img = $("<img />").attr("src",contextPath + src)
				            		  .attr("id","pic_"+i+patient.patientId)
							          .appendTo($("<a />").appendTo(li));
				            		  
				var rel ;
				if(src=="/images/pople.png"||src=="/images/pople0.png")
				{
					rel = imageZoom(116,108,100,100);
				}
				else
				{
					rel = imageZoom(patient.w,patient.h,100,100);
				}	
				
				
				//图片居中
				if(rel.width<100)
				{
					var temp = (100-rel.width)/2;
					img.attr("style","padding-left: "+temp+"px;");
				}
				if(rel.height<100)
				{
					var temp = (100-rel.height)/2;
					img.attr("style","padding-top: "+temp+"px;");
				}	
				
				img.attr("width",rel.width);
				img.attr("height",rel.height);
				
				//病历号
				$("<strong />").text(language_doctor.BingLiHao+"：").appendTo(li);
				$("<span />").html(patient.patientId + "&nbsp;&nbsp;<br />").appendTo(li);
				
				//姓名
				$("<strong />").text(language_doctor.XingMing+"：").appendTo(li);
				$("<span />").html(patient.name + "&nbsp;&nbsp;<br />").appendTo(li);
				
				//性别
				$("<strong />").text(language_doctor.Sex+"：").appendTo(li);
				var sex = patient.sex ? language_doctor.Male+"" : language_doctor.Female+"";
				$("<span />").html(sex + "&nbsp;&nbsp;<br />").appendTo(li);
				
				//年龄
				$("<strong />").text(language_doctor.Age+"：").appendTo(li);
				if(patient.birthday!=null&&patient.birthday!="")
				{
					var sr = new Date(patient.birthday.time);
					$("<span />").html((new Date().getFullYear() - sr.getFullYear()) + language_doctor.sui+"<br />").appendTo(li);
				}
				else
				{
					$("<span />").html(language_doctor.sui+"<br />").appendTo(li);
				}
				
				//手机
				$("<strong />").text(language_doctor.phone+"：").appendTo(li);
				if(patient.mobile!=null&&patient.mobile!="")
				{
					$("<span />").text(patient.mobile.substring(0,11)).appendTo(li);
				}
				else
				{
					$("<span />").text(" ").appendTo(li);
				}
				
				//挂号时间
				var jztimestr = patient.cztime;
				$("<div />").attr("class","jtime")
				            .append($("<strong />").text(language_doctor.GuaHaoSJ+"："))
				            .append($("<span />")
				            .text(jztimestr))
				            .appendTo(li);
				
				//点击事件  --出口--
				li.click(function() {
					
					huanzheguanli_tiaozhuan_flag = 0;
					
					showTitle(language_doctor.HuanZheJieZhen);
					
					showHuanZheTongJi();
					
					showOnePatient(patient,patient.SN,patient.id);
				});
			});
		}
		else   //如果患者列表为空
		{
			var str = "";
			
			if(state==oimsCategory.VISITING_STATE_WAIT)  //待诊
			{
				str = language_doctor.NoDaiZhenHuanZhe;
			}
			else if(state==oimsCategory.VISITING_STATE_AGAIN) //复诊
			{
				str = language_doctor.NoFuZhenHuanZhe;
			}
			else if(state==oimsCategory.VISITING_STATE_YIGUOHAO)  //已过号
			{
				str = language_doctor.NoGuoHaoHuanZhe;
			}
			else if(state==oimsCategory.VISITING_STATE_YIWANCHENG)  //已完成
			{
				str = language_doctor.NoWanChengHuanZhe;
			}	
			
			$("<div />").attr("class","backup1").append($("<p />").append(str+"！")).appendTo(".mainBody");
		}	
		
		search_bl = false;
		
}

//显示患者"表格"列表     宋仁非
function showGrid(state)
{
	
		if($(".mainBody").length>0)
		{
			$(".mainBody").remove();
		}
		
		var div = $("<div />").addClass("mainBody")
							  .addClass("emr_minwidth")
							  //.css("min-width" , "900px")
	                          .height($("#content").height() - $(".title").outerHeight()-$(".tablabel").outerHeight()-5)
	                          .appendTo(".right");
	
		var searchText = "";
		
		if(search_bl)
		{	
			$("#search").val($.trim($("#search").val()));
			searchText = $("#search").val();
		}
		else
		{
			searchText = "";
		}	
		var listFactor = {
				  listObj : [ {
					  			title : language_doctor.BingLiHao,//"病历号",
					  			key : "patientId"
				  			  }, 
				  			  {
				  				title : language_doctor.XingMing,//"姓名",
				  				key : "name"
				  			  }, 
				  			  {
				  				title : language_doctor.Sex,//"性别",
				  				key : "psex"
				  			  }, 
				  			  {
					  			title : language_doctor.Age,//"年龄",
					  			key : "page"
					  		  },
					  		  {
						  		title : language_doctor.phone,//"手机",
						  		key : "mobile"
						  	  },
						  	  {
							  	title : language_doctor.GuaHaoSJ,//"挂号时间",
							  	key : "ptime"
							  },
							  {
								title : language_doctor.JiuZhenState,//"就诊状态",
								key : "pstate"
							  }],
                 url : contextPath + "/publish/doctor/patientListTodayByPage.htm",
			  method : "post",
			checkbox : true,
			  single : true,
	 invocationEvent : true,  //启用行选中事件
  methodName_Checked : methodName_Checked,   //触发的方法名
			    data : {
			    		currentPage : 1,
			    		pageSize    : getPageSize()-1,
			    		searchText  : searchText,
			    		state       : state,
			    		tag         : Math.random()
			           }
		        };
	
		$("<div />").attr("id", "div_list").attr({"class":"list"/*,"style":"padding-top:12px"*/}).addClass("emr_listdiv")
				.appendTo(div);
		$("#div_list").createPageList(listFactor);
		
		search_bl = false; 
}

//行点击事件   宋仁非
function methodName_Checked()
{
	huanzheguanli_tiaozhuan_flag = 0;
	
	var dataObjects=getCheckBoxValue();
    
	showTitle(language_doctor.HuanZheJieZhen);
	
	showHuanZheTongJi();

	showOnePatient(dataObjects[0],dataObjects[0].SN);
	
}

/**
 * 显示一个患者的信息
 * 宋仁非
 * --出口--
 */
function showOnePatient(p,sn) 
{
	//显示患者接诊操作页面框架
	showDoctorWorkSpace();
	//显示患者信息
	
	showPatient(p,sn);
}


//作废 
function showKaiDanBtn(md)
{
	 var divbtn = $("<div />").attr("class","openbutton").attr("style","padding-top:10px;");
	 var kaidantijiao =  $("<a />").attr("href","#")
	 	   .append($("<span />").attr("class","sumit")) //提交
	 	   .attr("id","kaidantijiao").append(language_doctor.Submit+"").appendTo(divbtn);
	 
	 var kaidanchongzhi = $("<a />").attr("href","#")
	       .append($("<span />").attr("class","reset"))  //重置
	       .attr("id","kaidanchongzhi").append(language_doctor.Reset+"").appendTo(divbtn);
	 
	 kaidantijiao.click(function(){
		 //alert("患者id："+md.hzid);
		
		 var ybc = $(".eyeb input:checked").attr("value");
		 
		 //cs("眼别");
		 //cs(ybc);
		 if(ybc==""||ybc==null||ybc.length==0)
		 {
			 //cs("眼别");
			 //cs(ybc);
			 
			 //请选择眼别
			 $.oimsAlert(language_doctor.PlaceChoseYanBie+"！",null);
			 return false;
		 }	 
		 
		 var cgs1 = $("#jcxzxm input:checked");
		 //cs(cgs1);
		 var jcxmids = "";
		 for(var i = 0; i<cgs1.length;i++)
		 {
			 jcxmids+=cgs1[i].id+","+cgs1[i].value+";";
		 }	
		 if(jcxmids.length==0)
		 {
			 //请选择检查项目
			 $.oimsAlert(language_doctor.Qxzjcxm+"！",null);
			 return false;
		 }	 
		 //cs(jcxmids);
		 
		 var jcyq = $("#textarea2").val();
		 
		 
		 var result = getJSONData(saveJcdInfoUrl, {jcxmids:jcxmids,hzid:md.hzid,jzid:md.id,yb:ybc,jcyq:jcyq,tag : Math.random()},"POST");
		 
		 if(result.obj)
		 {
			 //开单成功
			 $.oimsSucc(language_doctor.KaiDanChengGong+"！",function(){
				 $(".openWin").remove();
				 $(".lockedBackground").remove();
			 });
			 
		 }	 
		 
	 });
	 kaidanchongzhi.click(function(){
		 //alert("重置");
		 var cgs2 = $("#guohaoDiv input:checked");
		 
		 for(var i = 0; i<cgs2.length;i++)
		 {
			 cgs2[i].checked=false;
		 }	
	 });
	 return divbtn;
	 
}
 

