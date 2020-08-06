var currentDiv;//当前操作的div对比的全局变量
var listFactor;//全局变量
var prams = {};//参数
var oimscanvas;//对象
var oimscanvasleft;//对象
var oimscanvasright;//对象
var browse_date="browse_date";//浏览-日期
var browse_item="browse_item";//浏览-项目
var current_HuanZheId;//当前患者ID
/*
 *梁建业
 *引用此js加载的函数 
 */
$(function(){
	createElement();//创建页面元素
	showHuanZheXinXiList();
	main_ipad();
});

function createElement(){
	var body=$("#body");//获取body对象
	$(body).html("");//清空body对象
	
	var div_header=$("<div/>").attr("id","div_header").attr("class","header");//头部div
	$(div_header).appendTo(body);//追加到body上
	
	var div_headerBg=$("<div/>").attr("id","div_headerBg").attr("class","headerBg");//空的div
	$(div_headerBg).appendTo(div_header);//追加到头部div
	
	var div_headerContent=$("<div/>").attr("id","div_headerContent").attr("class","headerContent");//患者信息div
	$(div_headerContent).appendTo(div_header);//追加到头部div
	
	var table_div_headerContent="";//患者信息表格
	    table_div_headerContent+="<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	    table_div_headerContent+="<tr>"+
	                             "<td rowspan='2' class='logo'>&nbsp;</td>"+
		                         "<td rowspan='2' class='hz'><img src='"+contextPath+"/js/manager/ipad/skin/blue/images/hz.png'width='40' height='40' /></td>"+
		                         "<td height='26' align='right'>"+ipadLanguage.XingMing+"：</td>"+
		                         "<td><label id='xingming'></label></td>"+
		                         "<td align='right'>"+ipadLanguage.Sex+"：</td>"+
		                         "<td><label id='xingbie'></label></td>"+
		                         "<td align='right'>"+ipadLanguage.Birth+"：</td>"+
		                         "<td><label id='chushengriqi'></label></td>"+
		                         "<td rowspan='2' class='search'>"+
		                         "<div class='searchd'><input name='search_blh' id='search_blh' type='text' class='searchIpnut' value='请输入病历号或者卡号' /><a id='serach_HuanZhenXinXi'><span></span></a></div>"+
		                         "</td>"+
		                         "</tr>";
	    
	    table_div_headerContent+="<tr>"+
					             "<td align='right'>"+ipadLanguage.idNum+"：</td>"+
					             "<td><label id='shenfenzheng'></label></td>"+
					             "<td align='right'>"+ipadLanguage.BingLiHao+"：</td>"+
					             "<td><label id='binglihao'></label></td>"+
					             "<td align='right'>"+ipadLanguage.isYiBao+"：</td>"+
					             "<td><label id='shifouyibao'></labe></td>"+
					             "</tr>";
	  $(table_div_headerContent).appendTo(div_headerContent);//追加到头部div
	  
	  var div_content=$("<div/>").attr("id","div_content").attr("class","content");//中部div
	  $(div_content).appendTo("body");//追加到body上
	  
	  var div_leftMenu=$("<div/>").attr("id","div_leftMenu").attr("class","leftMenu");//左面操作栏的div
	  $(div_leftMenu).appendTo(div_content);//追加到中部div
	  
	  var div_leftMenuBg=$("<div/>").attr("id","div_leftMenuBg").attr("class","leftMenuBg");//从属于左面操作栏的div 可以理解为背景div
	  $(div_leftMenuBg).appendTo(div_leftMenu);//追加到左面操作栏的div
		
	  var div_leftMenuContent=$("<div/>").attr("id","div_leftMenuContent").attr("class","leftMenuContent");//左面操作栏div 此div包括所有操作栏div
	  $(div_leftMenuContent).appendTo(div_leftMenu);//追加到左面操作栏的div
	 
	  //基本调整  begin
	  var div_menuTitle_jbtz=$("<div/>").attr("id","div_menuTitle_jbtz").attr("class","menuTitle");
	  $(div_menuTitle_jbtz).appendTo(div_leftMenuContent);//追加到左面操作栏div
	  var div_menuTitle_jbtz_html="<span></span><label>"+ipadLanguage.JiBenTZ+"</label>";
	  $(div_menuTitle_jbtz_html).appendTo(div_menuTitle_jbtz);
	  var div_menucontent_jbtz=$("<div/>").attr("id","jbtz").attr("class","menucontent");
	  $(div_menucontent_jbtz).appendTo(div_leftMenuContent);//追加到左面操作栏div
	  //基本调整  end
	  //色相调整 begin
	  var div_menuTitle_sxtz=$("<div/>").attr("id","div_menuTitle_sxtz").attr("class","menuTitle");
	  $(div_menuTitle_sxtz).appendTo(div_leftMenuContent);
	  var div_menuTitle_sxtz_html="<span></span><label>"+ipadLanguage.SeXiangTZ+"</label>";
	  $(div_menuTitle_sxtz_html).appendTo(div_menuTitle_sxtz);
	  var div_menucontent_jbtz1=$("<div/>").attr("id","jbtz1").attr("class","menucontent");
	  $(div_menucontent_jbtz1).appendTo(div_leftMenuContent);
	  //色相调整 end
	  //高级功能 begin
	  var div_menuTitle_gjgn=$("<div/>").attr("id","div_menuTitle_gjtz").attr("class","menuTitle");
	  $(div_menuTitle_gjgn).appendTo(div_leftMenuContent);
	  var div_menuTitle_gjgn_html="<span></span><label>"+ipadLanguage.GaoJiGN+"</label>";
	  $(div_menuTitle_gjgn_html).appendTo(div_menuTitle_gjgn);
	  var div_menucontent_gjgn=$("<div/>").attr("id","div_menucontent_gjgn").attr("class","menucontent");
	  $(div_menucontent_gjgn).appendTo(div_leftMenuContent);
	  	
	  var a_bijiao=$("<a/>").attr("id","a_bijiao");//比较开始
	  $(a_bijiao).appendTo(div_menucontent_gjgn);
	  var a_bijiao_html="<span class='compare'></span><label>"+ipadLanguage.BiJiao+"</label>";
	  $(a_bijiao_html).appendTo(a_bijiao);
		
	  var a_celiang=$("<a/>").attr("id","a_celiang");//测量
	  $(a_celiang).appendTo(div_menucontent_gjgn);
	  var a_celiang_html="<span class='meter'></span><label>"+ipadLanguage.CeLiang+"</label>";
	  $(a_celiang_html).appendTo(a_celiang);
	  var a_huabi=$("<a/>").attr("id","a_huabi");//画笔
	  $(a_huabi).appendTo(div_menucontent_gjgn);
	  var a_huabi_html="<span class='pen'></span><label>"+ipadLanguage.HuaBi+"</label>";
	  $(a_huabi_html).appendTo(a_huabi);
	  //高级功能 end
	  //浏览功能 begin
	  
	  var div_menuTitle_llgn=$("<div/>").attr("id","div_menuTitle_gjtz").attr("class","menuTitle");
	  $(div_menuTitle_llgn).appendTo(div_leftMenuContent);
	  var div_menuTitle_llgn_html="<span></span><label>"+ipadLanguage.Browse+"</label>";
	  $(div_menuTitle_llgn_html).appendTo(div_menuTitle_llgn);
	  var div_menucontent_llgn=$("<div/>").attr("id","div_menucontent_llgn").attr("class","menucontent");
	  $(div_menucontent_llgn).appendTo(div_leftMenuContent);
	  var a_shijian=$("<a/>").attr("id","a_shijian");//时间
	  $(a_shijian).appendTo(div_menucontent_llgn);
	  var a_shijian_html="<span class='time'></span><label>"+ipadLanguage.Time+"</label>";
	  $(a_shijian_html).appendTo(a_shijian);
	  var a_xiangmu=$("<a/>").attr("id","a_xiangmu");//项目
	  $(a_xiangmu).appendTo(div_menucontent_llgn);
	  var a_xiangmu_html="<span class='itme'></span><label>"+ipadLanguage.Xiangmu+"</label>";
	  $(a_xiangmu_html).appendTo(a_xiangmu);
	  //浏览功能 end
	  //附加功能 begin
	  
	  var div_menuTitle_fjgn=$("<div/>").attr("id","div_menuTitle_fjgn").attr("class","menuTitle");
	  $(div_menuTitle_fjgn).appendTo(div_leftMenuContent);
	  var div_menuTitle_fjgn_html="<span></span><label>"+ipadLanguage.FuJiaGN+"</label>";
	  $(div_menuTitle_fjgn_html).appendTo(div_menuTitle_fjgn);
	  var div_menucontent_fjgn=$("<div/>").attr("id","div_menucontent_fjgn").attr("class","menucontent");
	  $(div_menucontent_fjgn).appendTo(div_leftMenuContent);
	  //附加功能 end
	  //其他调整
	  //其他调整
	  
	  //div_rightCon bengin 右下面的div
	  var div_rightCon=$("<div/>").attr("id","div_rightCon").attr("class","rightCon").attr("style","height: 450px;");//中部div中右面的div
	  $(div_rightCon).appendTo(div_content);//追加到中部div
	  
	  var div_rightConBg=$("<div/>").attr("id","div_rightConBg").attr("class","rightConBg");//中部div（操作）
	  $(div_rightConBg).appendTo(div_rightCon);//追加到中部div中右面的div
	  
	  var div_rightConContent=$("<div/>").attr("id","div_rightConContent").attr("class","rightConContent");//弹出div
	  $(div_rightConContent).appendTo(div_rightCon);//追加到中部div中右面的div
	  
	  var div_info=$("<div/>").attr("id","div_info").attr("class","info");//弹出按钮div
	  $(div_info).appendTo(div_rightConContent);//追加到中部div（操作）
	  var div_info_html="<label>"+ipadLanguage.HuanZheInfo+"</label>";
	  $(div_info_html).appendTo(div_info);//追加到弹出按钮div
	    
	  var div_infolist=$("<div/>").attr("id","div_infolist").attr("class","infolist");//患者信息列表div（属于弹出div）
	  $(div_infolist).appendTo(div_rightConContent);//追加到中部div（操作）
	  
	  var div_timetab=$("<div/>").attr("id","div_timetab").attr("class","timetab");//检查项目时间div
	  $(div_timetab).appendTo(div_rightConContent);//追加到中部div（操作）
	  
	  var span_up=$("<span/>").attr("id","span_up").attr("class","up");//左边按钮
	  $(span_up).appendTo(div_timetab);//追加到检查项目时间div
	  var ul_div_timetab=$("<ul/>").attr("id","ul_div_timetab");
	  $(ul_div_timetab).appendTo(div_timetab);//追加到检查项目时间div
	  var ul_div_timetab_html="<li class='on'></li>";
	  $(ul_div_timetab_html).appendTo(ul_div_timetab);
	  
	  var span_next=$("<span/>").attr("id","span_next");//右面按钮
	  $(span_next).appendTo(div_timetab);//追加到检查项目时间div
	  
	  var div_tabinfo=$("<div/>").attr("id","div_tabinfo").attr("class","tabinfo");//oct等 检查项目
	  $(div_tabinfo).appendTo(div_rightConContent);//追加到中部div（操作）
	  var span_text=$("<span/>").attr("id","span_text").attr("class","text");//Topcon_OCT
	  $(span_text).appendTo(div_tabinfo);
	  var span_text_html="Topcon_OCT";
	  $(span_text_html).appendTo(span_text);
	  
	  var div_picshow=$("<div/>").attr("id","div_picshow").attr("class","picshow");//图片操作div
	  $(div_picshow).appendTo(div_rightConContent);//追加到中部div（操作）
	  
	  var div_main_img=$("<div/>").attr("id","div_main_img").attr("style","top: 80px; position:relative;");//canvas的div
	  $(div_main_img).appendTo(div_picshow);//追加到图片操作div
	  
	  var main_img=$("<img/>").attr("id","main_img").attr("src","");//图片
	  $(main_img).appendTo(div_main_img);//追加到canvasdiv
	  
	  var div_footerImg=$("<div/>").attr("id","div_footerImg").attr("class","footerImg");//下部div
	  $(div_footerImg).appendTo(body);//追加到body
	  
	  var div_footerbg=$("<div/>").attr("id","div_footerbg").attr("class","footerbg");//可以理解为背景div
	  $(div_footerbg).appendTo(div_footerImg);//追加到下部div
	  
	  var div_basemenu=$("<div/>").attr("id","div_basemenu").attr("class","basemenu");//编辑按钮div
	  $(div_basemenu).appendTo(div_footerImg);//追加到下部div
	  
	  var div_basemenu_html="<a id='undo'><span class='undo'></span>"+ipadLanguage.CancelChe+"</a>" +
					 		"<a id='reset'><span class='reset'></span>"+ipadLanguage.Reset+"</a> " +
					 		"<a id='rightRotate'><span class='rightx'></span>"+ipadLanguage.YouXuan+"</a>" +
					 		"<a id='leftRotate'><span class='leftx'></span>"+ipadLanguage.ZuoXuan+"</a>" +
					 		"<a id='disc'><span class='desaturate'></span>"+ipadLanguage.ZuoXuan+"</a> " +
					 		"<a id='reversionCanvas'><span class='disc'></span>"+ipadLanguage.FanZhuan+"</a> "+
					 		"<a id='empty'><span class='empty'></span>"+ipadLanguage.qingkong+"</a> ";
		$(div_basemenu_html).appendTo(div_basemenu);//追加到编辑按钮div
		
		var div_thumbnail=$("<div/>").attr("id","div_thumbnail").attr("class","thumbnail");//患者图片展示div
	    $(div_thumbnail).appendTo(div_footerImg);//追加到下部div
	    
		var div_left=$("<div/>").attr("id","div_left").attr("class","left");//左移动图片div
		$(div_left).appendTo(div_thumbnail);
		
		var div_right=$("<div/>").attr("id","div_right").attr("class","right");
		$(div_right).appendTo(div_thumbnail);//右移动图片div
		
		var div_ulPicture=$("<div/>").attr("id","div_ulPicture").attr("class","ulPicture");//操作的div主要是根据不同的用户展示不同图片
		$(div_ulPicture).appendTo(div_thumbnail); 
}
//主方法
function main_ipad()
{
	oimscanvas = new _oimscanvas({});//创建oimscanvas对象
	var parmsRed = {
	"type" : "color",
	"cls" : "ca",
	"min" : "-100",
	"max" : "100",
	"name" : "red"
    }, parmsGreen = {
	"type" : "color",
	"cls" : "ca",
	"min" : "-100",
	"max" : "100",
	"name" : "green"
    }, parmsBlue = {
	"type" : "color",
	"cls" : "ca",
	"min" : "-100",
	"max" : "100",
	"name" : "blue"
    };
	showOptions(parmsRed, ipadLanguage.red, "jbtz1");
	showOptions(parmsGreen, ipadLanguage.green, "jbtz1");
	showOptions(parmsBlue, ipadLanguage.blue, "jbtz1");
	var parmsSaturation = {
		"type" : "hsl",
		"cls" : "hsl",
		"min" : "-100",
		"max" : "100",
		"name" : "saturation"
	}, parmsHue = {
		"type" : "hsl",
		"cls" : "hsl",
		"min" : "-180",
		"max" : "180",
		"name" : "hue"
	}, parmsLightness = {
		"type" : "hsl",
		"cls" : "hsl",
		"min" : "-180",
		"max" : "180",
		"name" : "lightness"
	};
	
	
	showOptions(parmsSaturation, ipadLanguage.BaoHeDu, "jbtz");
	showOptions(parmsHue, ipadLanguage.sedu, "jbtz");
	showOptions(parmsLightness, ipadLanguage.Bright, "jbtz");
	//去色操作
	$('#disc').click(function(e) {
		e.stopPropagation();
		oimscanvas.desaturate();
	});
	// 重置
	$("#reset").click(function(e) {
		e.stopPropagation();
		oimscanvas.reset();
		var rangeArray = $("input[type='range']");
		for(var i= 0,length = rangeArray.length;i<length;i++){
			rangeArray[i].value = 0;
		}
	});
//	// 左旋转
//	$("#leftRotate").click(function(e) {
//		e.stopPropagation();
//		oimscanvas.leftRotate();
//	});
//	// 右旋转
//	$("#rightRotate").click(function(e) {
//		e.stopPropagation();
//		oimscanvas.rightRotate();
//	});
	// 撤销操作
	$("#undo").click(function(e) {
		e.stopPropagation();
		oimscanvas.undo();
	});
	//颜色反转
	$("#reversionCanvas").click(function(e) {
		e.stopPropagation();
		oimscanvas.invert();
	});
//	// 画笔操作
//	$("#a_huabi").click(function(e) {
//		e.stopPropagation();
//		oimscanvas.pen();
//	});
	// 测量操作
//	$("#a_celiang").click(function(e) {
//		e.stopPropagation();
//		oimscanvas.mensuration();
//	});
    //比较
	$("#a_bijiao").click(function() {
		beyondImage();
	});
	//清空操作
	$("#empty").click(function() {
		empty();
	});
	//患者信息查询
	$("#serach_HuanZhenXinXi").click(function(){
		
	});
	$("#search_blh").click(function(){
		$("#search_blh").val("");
	  });//点击输入框清空字体
	$("#search_blh").blur(function(){
		if(this.value==""){
			$("#search_blh").val(ipadLanguage.shurublhhkahao);
			$("#search_blh").addClass("blurview");
		}
	});
	
	//按照时间浏览
	$("#a_shijian").click(function(){
		showDateListOfHuanZhe(current_HuanZheId);
	});
	//按照项目浏览
	$("#a_xiangmu").click(function(){
		showJcxmListOfHuanZhe(current_HuanZheId);
	});
	//患者信息查询
	$("#serach_HuanZhenXinXi").click(function(){
		search_HuanZheXinXi();
	});
    params = {"green":0,"red":0,"blue":0};
    oimscanvas.changing(function(){ oimscanvas.color(params, ""); });
    oimscanvas.apply();
    //body加入此事件主要是禁用页面整体放大
 	(document.body).addEventListener("touchmove",function (e){
         if(e.target.tagName.toLowerCase() != "input" && e.target.type != "range"){
             e.preventDefault();
         }
      },false);
     (document.body).addEventListener("dblclick",function (e){
         e.preventDefault();
     },false);
}

/*
 * 梁建业
 * 清空所有操作
 */
function empty()
{
	currentDiv=null;
	$("#div_main_img").html("");
	$("#div_main_img").css({"top":"80px", "position":"relative","left":"40px"});
	var main_img=$("<img/>").attr("id","main_img").attr("src","");
	$(main_img).appendTo("#div_main_img");
	oimscanvas = new _oimscanvas({});
}

/*
 * 梁建业
 * 图片对比
 */
function beyondImage()
{
    var div_main_img=$("#div_main_img");
    $(div_main_img).html("");//清空当前div
    var div_core=$("<div/>").attr("id","div_core").attr("style","width:700px;height:290px;");//外层div
    $(div_core).appendTo(div_main_img);
    touchDong($("#div_core")[0],oimscanvas.events,true);//平板支持
    var div_left=$("<div/>").attr("id","div_left").attr("style","width:49%;height:100%;border: 2px solid red;float:left;");
    $(div_left).appendTo(div_core);
    touchDong($("#div_core")[0],oimscanvas.events,true);//平板支持
    var div_right=$("<div/>").attr("id","div_right").attr("style","width:49%;height:100%;border: 2px solid green;float:left;");
    $(div_right).appendTo(div_core);
    currentDiv=div_left;//赋默认值
    $(div_left).click(function(){
    	currentDiv=this;
    	$(this).css("border","2px solid red");
    	$("#div_right").css("border","2px solid green");
    	if(this.childNodes.length==1)
    	{    		 
    		 oimscanvas=oimscanvasleft;
    	}
    });
    $(div_right).click(function(){
    	currentDiv=this;
    	$(this).css("border","2px solid red");
    	$("#div_left").css("border","2px solid green");
    	if(this.childNodes.length==1)
    	{
    		 oimscanvas=oimscanvasright;
    	}
    });
}

//显示患者列表
function showHuanZheXinXiList()
{
   var div_infolist=$(".infolist");//主要操作div 患者信息列表div
   $(div_infolist).html("");//清空 infolist div
   listFactor = {
			listObj : [
		                {
		                    title :ipadLanguage.Seria,
		                    key :"paihao"
		                },
		                {
		                    title :ipadLanguage.BingLiHao,
		                    key :"binglihao"
		                },
		                {
		                    title :ipadLanguage.XingMing,
		                    key :"xingming"
		                },{
		                    title :ipadLanguage.Sex,
		                    key :"xingbie",
		                    func:function(v){
		                    	if(v)
		                    		return ipadLanguage.Male;
		                    	else
		                    		return  ipadLanguage.Female ;
		                    }
		                }
		            ],
		            url :contextPath+"/publish/huanZheXinXi/findHuanZheToExaminedByPageList.htm",
		            checkbox:true,
					single:true,
					invocationEvent:true,//启用行选中事件
					methodName_Checked:methodName_Checked,//触发的方法名
					method:"post",
					data : {
						currentPage : 1,
					    pageSize : 10,
						tag : Math.random()
					}
    };
	var div_pageList = $("<div/>").attr("id", "div_pageList");
	$(div_pageList).appendTo(div_infolist);
	$(div_pageList).createPageListIpad(listFactor);
    if($("#checkBoxObj0")[0]!=undefined){
	$("#checkBoxObj0")[0].checked=true;
	$("#checkBoxObj0")[0].parentNode.parentNode.className='t4';
	methodName_Checked();
    }
}

 //分页控件的行单击事件(选中的状态)
function methodName_Checked(){
	var dataObjects=getCheckBoxValue();//获取选中的行数据
	var binglihao = dataObjects[0].binglihao;//病历号
	if(binglihao!=""){
		 var url_getHuanZheXinXiBySearch="/publish/huanZheXinXi/getHuanZheXinXiBySearch.htm";//根据查询条件查询符合条件的患者信息
		 var data = getJSONData(url_getHuanZheXinXiBySearch,{search:binglihao});
		 if(!data.state){
			alert(ipadLanguage.nopatientinfo);
			return;
		 }
		 var url_getHuanZheXinXiBySearch_obj=data.obj;//患者对象
		 current_HuanZheId=url_getHuanZheXinXiBySearch_obj.id;//当前患者ID
		 showHuanZheXinXiById(current_HuanZheId);//显示患者信息
		 showDateListOfHuanZhe(current_HuanZheId);
	}
}

/*
 *梁建业
 *显示当前患者所有做过的日期项目列表
 *患者ID
 *检查项目ID
 */
function showDateListOfHuanZhe(hzid){
	var url_getHuanzheJiuzhenDateList="/publish/jcd/getHuanzheJiuzhenDateList.htm";//得到患者所有做过的日期列表
	var url_getHuanzheJiuzhenDateList_data = getJSONData(url_getHuanzheJiuzhenDateList,{hzid:hzid});
	if(!url_getHuanzheJiuzhenDateList_data.state)
		return;
	var div_timetab=$(".timetab");//获取日期栏操作div
	var div_ulPicture=$(".ulPicture");//图片展示div
	$(div_timetab).html("");//清空日期栏操作div
	$(div_ulPicture).text("");//清空 图片div
	var ul_div_timetab=$("<ul/>").appendTo(div_timetab);
	var url_getHuanzheJiuzhenDateList_data_obj=url_getHuanzheJiuzhenDateList_data.obj;
	$.each(url_getHuanzheJiuzhenDateList_data_obj,function(i,obj){
		var li_ul_div_timetab=$("<li/>").text(obj.jsrq);
		$(li_ul_div_timetab).appendTo(ul_div_timetab);
		if(i==0)
			li_ul_div_timetab.addClass("on");//选中的样式
		else
			li_ul_div_timetab.addClass("off");//未选中的样式
		//时间 li 单击事件
		$(li_ul_div_timetab).click(function() {
			ulZindex($(".timetab ul li"));
			$(this)[0].className = "on";
			$(this).css({"z-index" : "9999"});
			showHuanZheScheduleByBrowseType(browse_date,obj.jsrq);
			showJcxmAndPictureByhuanZheIdAndDateAndjcxmId(hzid,obj.jsrq);//显示当前患者检查项目的检查图片 
		});	
	});
	showHuanZheScheduleByBrowseType(browse_date,url_getHuanzheJiuzhenDateList_data_obj[0].jsrq);
	showJcxmAndPictureByhuanZheIdAndDateAndjcxmId(hzid,url_getHuanzheJiuzhenDateList_data_obj[0].jsrq);//设置第一个li的值
}

/*
 *梁建业
 *显示当前患者所有做过的项目日期列表
 *患者ID
 */
function showJcxmListOfHuanZhe(hzid){
	var url_getHuanzheJcxmByHzidList="/publish/jcd/getHuanzheJcxmByHzidList.htm";
	var url_getHuanzheJcxmByHzidList_data=getJSONData(url_getHuanzheJcxmByHzidList,{hzid:hzid});
	if(!url_getHuanzheJcxmByHzidList_data.state)
		return;
	var div_timetab=$(".timetab");//获取日期栏操作div
	var div_ulPicture=$(".ulPicture");//图片展示div
	$(div_timetab).html("");//清空日期栏操作div
	$(div_ulPicture).text("");//清空 图片div
	var ul_div_timetab=$("<ul/>").appendTo(div_timetab);
	var url_getHuanzheJcxmByHzidList_data_obj=url_getHuanzheJcxmByHzidList_data.obj;
	$.each(url_getHuanzheJcxmByHzidList_data_obj,function(i,obj){
		var li_ul_div_timetab=$("<li/>").text(obj.xmmc.substring(0,6)+"..");
		$(li_ul_div_timetab).appendTo(ul_div_timetab);
		if(i==0)
			li_ul_div_timetab.addClass("on");//选中的样式
		else
			li_ul_div_timetab.addClass("off");//未选中的样式
		//时间 li 单击事件
		$(li_ul_div_timetab).click(function() {
			ulZindex($(".timetab ul li"));
			$(this)[0].className = "on";
			$(this).css({"z-index" : "9999"});
			showHuanZheScheduleByBrowseType(browse_item,obj.id);
			showJcxmAndPictureByhuanZheIdAndDateAndjcxmId(hzid,null,obj.id);//显示当前患者检查项目的检查图片 
		});	
	});
	showHuanZheScheduleByBrowseType(browse_item,url_getHuanzheJcxmByHzidList_data_obj[0].id);
	showJcxmAndPictureByhuanZheIdAndDateAndjcxmId(hzid,null,url_getHuanzheJcxmByHzidList_data_obj[0].id);//显示当前患者检查项目的检查图片 
}

/*
 *梁建业
 *显示当前患者检查项目，检查图片信息
 *huanZheId 表示患者ID
 *date 表示检查日期
 *jcxmId 表示检查项目
 */
function showJcxmAndPictureByhuanZheIdAndDateAndjcxmId(huanZheId,date,jcxmid){
	var div_ulPicture=$(".ulPicture");//图片显示div
	$(div_ulPicture).text("");
	var url_jcjgListUrl="/publish/jcd/getHuanzheJcjgList.htm";//查询当前用户特定日期特定检查项目的所有检查图片
	var url_jcjgListUrl_data=getJSONData(url_jcjgListUrl,{hzid:huanZheId,date:date,jcxmid:jcxmid});
	if(!url_jcjgListUrl_data.state){
		return;
	}
	var url_jcjgListUrl_data_obj=url_jcjgListUrl_data.obj;
	var ul_div_ulPicture=$("<ul/>").attr("id","ul_div_ulPicture");
	$(ul_div_ulPicture).appendTo(div_ulPicture);
	$.each(url_jcjgListUrl_data_obj,function(i,obj){
		var li_ul_div_ulPicture=$("<li/>").attr("class","imgborder");
		$(li_ul_div_ulPicture).appendTo(ul_div_ulPicture);
		if(obj.path.substring(obj.path.indexOf(".")+1)!="flv"){//图片
		var img_li_ul_div_ulPicture=$("<img/>").attr("id","img_li_ul_div_ulPicture"+i).attr("src",obj.path).attr("style","width:108px; height:86px;");
		$(img_li_ul_div_ulPicture).appendTo(li_ul_div_ulPicture);
		$(img_li_ul_div_ulPicture).click(function(){//图片li的单击事件
			 src = this.src.replace("thumb/","");
			 if(currentDiv==undefined||currentDiv==null){
				 $("#a_huabi").unbind("click");//移除画笔事件
				 $("#leftRotate").unbind("click");//移除左旋转
				 $("#rightRotate").unbind("click");//移除右旋转
				 // 画笔操作
			     $("#a_huabi").click(function(e) {
						e.stopPropagation();
						oimscanvas.pen();
				  });
			     //测量
			     $("#a_celiang").click(function(e) {
			 		e.stopPropagation();
			 		oimscanvas.mensuration();
			 	});
			 	 // 左旋转
			 	 $("#leftRotate").click(function(e) {
			 		e.stopPropagation();
			 		oimscanvas.leftRotate();
			 	 });
			 	 // 右旋转
			 	 $("#rightRotate").click(function(e) {
			 		e.stopPropagation();
			 		oimscanvas.rightRotate();
			 	 });
				 var div_main_img=$("#div_main_img");
				 $(div_main_img).html("");
				 var main_img=new Image();
				 main_img.src = src;
				 main_img.id = "main_img";
				 $(main_img).attr("style","width:400px;height:330px;");
				 $(main_img).appendTo(div_main_img);
				 main_img.onload = function() {
					 var params_oimscanvas={element:"main_img"};
					 oimscanvas = new _oimscanvas(params_oimscanvas);
					 params = {"green":0,"red":0,"blue":0};
					 oimscanvas.changing(function(){ oimscanvas.color(params, ""); });
					 oimscanvas.pen();
				     oimscanvas.removeDraw();
				     oimscanvas.rightRotate();
				 };
			 }else{
				 $("#a_huabi").unbind("click");//移除画笔事件
				 $("#a_celiang").unbind("click");//移除测量事件
				 $("#leftRotate").unbind("click");//移除左旋转
				 $("#rightRotate").unbind("click");//移除右旋转
				 $(currentDiv).html("");
				 var main_img=new Image();
				 main_img.src = src;
				 main_img.id = "img_"+$(currentDiv)[0].id;
				 $(main_img).attr("style","width:346px;height:290px;");
				 $(main_img).appendTo(currentDiv);
				 main_img.onload = function() {
					 var params_oimscanvas={element:"img_"+$(currentDiv)[0].id};
					 oimscanvas = new _oimscanvas(params_oimscanvas);
					 if($(currentDiv)[0].id=="div_left")
					     oimscanvasleft=oimscanvas;
					 if($(currentDiv)[0].id=="div_right")
						 oimscanvasright=oimscanvas;
					 params = {"green":0,"red":0,"blue":0};
					 oimscanvas.changing(function(){ oimscanvas.color(params, ""); });
					 oimscanvas.pen();
				     oimscanvas.removeDraw();
				     oimscanvas.rightRotate();
				 };
			 }
		});
		}
		else//视频操作
		{
			var img_li_ul_div_ulPicture=$("<img/>").attr("id","img_li_ul_div_ulPicture"+i).attr("src",contextPath+"/js/manager/ipad2/shipin.jpg").attr("title",contextPath+"/js/manager/ipad2/video/shipin2.mp4").attr("style","width:108px; height:86px;");
			$(img_li_ul_div_ulPicture).appendTo(li_ul_div_ulPicture);
			$(img_li_ul_div_ulPicture).click(function(){
				var videoSource=this.title;
				var div_main_img=$("#div_main_img");
				$(div_main_img).html("");
				$("#div_main_img").css({"top":"20px", "position":"relative","left":"20px"});
				var video_li_ul_div_ulPicture="<video id='video_li_ul_div_ulPicture' width='430px' height='330px' autoplay='autoplay' controls='controls'> <source src='"+videoSource+"' type='video/mp4' /></video>";
				$(video_li_ul_div_ulPicture).appendTo(div_main_img);
				touchDong($("#video_li_ul_div_ulPicture")[0],oimscanvas.events,true);//平板支持
				currentDiv=null;
			});
		}
	});
}

/*
 *梁建业
 *时间li 设置为选中状态
 */
function ulZindex(ulList) {
	zIndex = 1000;
	for ( var i = 0, length = ulList.length; i < length; i++) {
		zIndex = zIndex - 10;
		$(ulList[i]).css({
			"z-index" : zIndex
		});
		$(ulList[i])[0].className = "off";
	}
}

/*
 * 梁建业
 * 显示患者信息清单（是按照日期，还是按照项目）
 */
function showHuanZheScheduleByBrowseType(type_browse,parameter)
{
	var data=null;
	if(type_browse==browse_date)//按照时间浏览
	{
		var url_getHuanzheJcxmByHzidAndDateList="/publish/jcd/getHuanzheJcxmByHzidAndDateList.htm";//指定时间的检查项目列表
		data=getJSONData(url_getHuanzheJcxmByHzidAndDateList,{hzid:current_HuanZheId,date:parameter});
	}
	if(type_browse==browse_item)
	{
		var url_getHuanzheJiuzhenDateList="/publish/jcd/getHuanzheJiuzhenDateList.htm";//指定项目的检查时间列表
		data=getJSONData(url_getHuanzheJiuzhenDateList,{hzid:current_HuanZheId,jcxmid:parameter});
	}
    var div_tabinfo=$(".tabinfo");//日期下面的检查项目div
    $(div_tabinfo).html("");//清空div的内容
    $.each(data.obj,function(i,obj){
    	var a = $("<a />").attr("href","#").appendTo(div_tabinfo);
		var span = $("<span/>").addClass("text").appendTo(a);
    	if(type_browse==browse_date)//按照时间浏览
    	{
    		span.text(obj.xmmc);//项目名称
			a.click(function(){
				showJcxmAndPictureByhuanZheIdAndDateAndjcxmId(current_HuanZheId,parameter,obj.id);//检查项目ID
			});
    	}
    	if(type_browse==browse_item)//按照项目浏览
    	{
    		span.text(obj.jsrq);//检查日期
			a.click(function(){
				showJcxmAndPictureByhuanZheIdAndDateAndjcxmId(current_HuanZheId,obj.jsrq,parameter);
			});
    	}
    });
}

/*
 *梁建业
 *显示患者的基本信息 
 *根据患者ID查询患者信息（显示头部）
 */
function showHuanZheXinXiById(id){
	var url_findHuanZheById="/publish/huanZheXinXi/findHuanZheById.htm";//根据患者ID查询患者信息
	var url_findHuanZheById_data=getJSONData(url_findHuanZheById, {id:id},'post');
	if(!url_findHuanZheById_data.state){
		alert(ipadLanguage.nopatientinfo);
		return;
	}
	current_HuanZheXinXi=url_findHuanZheById_data.obj;//当前患者对象
	//患者显示元素 begin
	$("#xingming").text(current_HuanZheXinXi.xingming);
	var xingbie = ipadLanguage.Female;
	if (current_HuanZheXinXi.xingbie)xingbie = ipadLanguage.Male;
	$("#xingbie").text(xingbie);
	$("#chushengriqi").text(formatDate(current_HuanZheXinXi.shengri.time));
	$("#shenfenzheng").text(current_HuanZheXinXi.sfzh);
	$("#binglihao").text(current_HuanZheXinXi.binglihao);
	var shifouyibao = ipadLanguage.No;
	if(current_HuanZheXinXi.yibao)shifouyibao=ipadLanguage.Yes;
	$("#shifouyibao").text(shifouyibao);
	//患者显示元素 end
}

/*
 * 梁建业
 * 查询患者信息
 */
function search_HuanZheXinXi(){
	var url_getHuanZheXinXiBySearch="/publish/huanZheXinXi/getHuanZheXinXiBySearch.htm";
	var search_blh = $("#search_blh").val();	
	if(search_blh!=""){
		 var data = getJSONData(url_getHuanZheXinXiBySearch,{search:search_blh});
		 if(!data.state){
			alert(ipadLanguage.nopatientinfo);
			return;
		 }
		 var obj_huanzhenxinxi = data.obj;
		 current_HuanZheId = obj_huanzhenxinxi.id;
		 showHuanZheXinXiById(current_HuanZheId);//显示患者信息
		 showDateListOfHuanZhe(current_HuanZheId);
	}
}
