/*
 * 开单页面js
 * 宋仁非
 * check 2013.9.22
 */

 var paintCurrent_kd = 0; 	//记录当前是第几个保存图片的回调
 var paintLength_kd = 0; 	//检查项目画图图片数
 var paintWin_kd ;			//开单画图弹窗
 var CurrentInput_kd;		//当前点击画图的检查项目对应的input复选框
 var jcyq_kd = "";			//检查要求

/*
 * 返回开单页面div
 * 宋仁非
 */
 function showKaiDanWindow(md)
 {
	 
	 //cs(md);
	 /*
	 date: "2012-11-25"
	 doctor: "赵医生"
	 fzys: "10007"
	 hzid: 9109070 //患者id
	 id: 13043     //就诊id
	 state: 27
	 */
	 
	 var div = $("<div />").attr({"style":"width:100%;height:100%"});
	 
	 var getYanBieCategoryUrl = "/publish/doctor/getYanBieCategoryUrl.htm";
	 
	 //获取眼别分类 （左眼、右眼、双眼）
	 var result = getJSONData(getYanBieCategoryUrl, {fid:oimsCategory.CATEGORY_YANBIE,
		                                            tag : Math.random()}).obj;
	 
	 var yb = $("<div />").attr("class","eyeb").appendTo(div);
	 
	 $.each( result, function(i, d){
		
		 var div_a = $("<div />").addClass("emr_kaidandiv00")/*.css({"width":"80px","height":"100%","float":"left"})*/.appendTo(yb);
		 
		 var div_b = $("<div />").addClass("emr_kaidandiv01")/*.css({"width":"20px","height":"100%","float":"left"})*/.appendTo(div_a);
		 
		 var div_c = $("<div />").addClass("emr_kaidandiv02")/*.css({"width":"60px","height":"100%","float":"left"})*/.appendTo(div_a);
		 
		 var input_yb = $("<input />").attr({"type":"radio" , 
			 								 "name":"eye_category" ,
			 							   "style" : "vertical-align : top;" , 
			 							       "id":d.id , 
			 							    "value":d.id})
					                  .appendTo(div_b);
		 
		 $("<label />").attr("for",d.id).text(d.category).appendTo(div_c);
			
		 //默认选择双眼
		 if(d.id == 48)
		 {
			 input_yb.attr("checked","checked");
		 }	 
		 
	 });
	 
	 //检查项目div (包含 常规检查  特殊检查)
	 var check_div = $("<div />").attr("class","opencontent check")
	 							 .attr("id","jcxm")
	 							 .appendTo(div);
	 //常规检查
	 $("<div />").css({"width":"100%","height":"25px"}).append(
			 
			 $("<p />").text(language_doctor.ChangGuiJianCha+"：")
			 
	 		 ).appendTo(check_div);
	 
	 var changgui_div = $("<div />").attr("class","checkdiv1").appendTo(check_div);
	 
	 var changgui_table_div = $("<div />").css({"height":"30px","width":"100%"}).appendTo(changgui_div);
	 
	 var getChangGuiListUrl = "/publish/doctor/getChangGuiListUrl.htm";
	 
	 //获取常规检查列表
	 var cglist = getJSONData(getChangGuiListUrl, {id : oimsCategory.CHANG_GUI_JIAN_CHA}).obj;
	 
	 for(var i = 0; i < cglist.length ; i++)
	 { 
		 var td_div = $("<div />").addClass("emr_kaidandiv03")/*.css({"height":"15px","width":"100px","float":"left"})*/.appendTo(changgui_table_div);
		 
		 var div_a = $("<div />").addClass("emr_kaidandiv04")/*.css({"height":"15px","width":"25px","float":"left"})*/.appendTo(td_div);
		 var div_b = $("<div />").addClass("emr_kaidandiv05")/*.css({"height":"15px","width":"75px","float":"left","text-align":"left"})*/.appendTo(td_div);
		 
		 $("<input />").attr({"type":"checkbox",
			                  "id":"888nn"+cglist[i].id,
			                  "name":"cgjc",
			                  "value":cglist[i].xmmc})
		 			   .appendTo(div_a);
		 
		 $("<label />").attr("for","888nn"+cglist[i].id)
		               .append(cglist[i].xmmc)
		               .appendTo(div_b);
	 }
	 
	 
	 
	 //特殊检查
	 $("<div />").addClass("emr_teshujianchadiv")/*.css({"height":"25px","width":"100%"})*/.append(
			 $("<p />").text("特殊检查：")
			 ).appendTo(check_div);
	 
	 //页签
	 var yeqian_div =$("<div />").addClass("emr_kaidanyeqiandiv")/*.attr("style","height:28px;width:auto;font-weight: bold;")*/
	 							 .attr("id","ts_yeqian_div")
	                             .appendTo(check_div);
	 
	 //全部检查页签
	 $("<div />").attr("class","tab_show")
     			 .append($("<span />").append(language_doctor.AllCheckItems))//全部检查
     			 .click(function(){
     				
     				 $("#ts_yeqian_div .tab_show").removeClass("tab_show").addClass("tab_hide");
     				 $(this).addClass("tab_show");
     				 
     				//显示全部检查 
     				show_all_jcxm(check_div,md);
     			 })
     			 .appendTo(yeqian_div);
	 
	 
	 //按病种分类页签
	 $("<div />").attr("class","tab_hide")
	             .append($("<span />").append(language_doctor.BzFenLei))//病种分类
	             .click(function(){
	            	 
	            	 $("#ts_yeqian_div .tab_show").removeClass("tab_show").addClass("tab_hide");
     				 $(this).addClass("tab_show");
     				 
	            	//显示病种分类检查 
	            	show_bingzhong_jcxm(check_div,md);
	             })
	             .appendTo(yeqian_div);
	 
	 
	 //默认显示全部检查
	 show_all_jcxm(check_div,md);
	 
	 //按钮
	 var divbtn = $("<div />").attr("class","openbutton").appendTo(div);
	 
	 //提交按钮
	 $("<a />").attr("href","#")
	 	   	   .append($("<span />").attr("class","advsumit"))
	 	       .attr("id","kaidantijiao")
	 	       .append(language.Submit)//"提交"
	 	       .click(function(){click_submit(md);})
	 	       .appendTo(divbtn);
	 
	 //重置按钮
	 $("<a />").attr("href","#")
	           .append($("<span />").attr("class","advreset"))
	           .attr("id","kaidanchongzhi")
	           .append(language.Reset)//"重置"
	           .click(function(){click_reset();})
	           .appendTo(divbtn);
	 
	//提交
	 function click_submit(md)
	 {
		 var ybc = $(".eyeb input:checked").attr("value");
		 
		 if(ybc==""||ybc==null||ybc.length==0)
		 {
			 //请选择眼别
			 $.oimsAlert(language_doctor.PlaceChoseYanBie+"！",null);
			 return false;
		 }	 
		 
		 var cgs1 = $("#jcxm input:checked");
		 
		 if(cgs1.length==0)
		 {
			 //请选择检查项目
			 $.oimsAlert(language_doctor.Qxzjcxm+"！",null);
			 return false;
		 }
		 
		 var jcxmids = "";
		 
		 for(var i = 0; i<cgs1.length;i++)
		 {
			 if($(cgs1[i]).attr("name")!="check_all_input")
			 {
				 jcxmids+=$(cgs1[i]).attr("id").split("nn")[1]+"v8v"+
		 		          $(cgs1[i]).attr("value")+"v8v"+
		                  $(cgs1[i]).attr("name")+"v8v"+
		                  $(cgs1[i]).attr("class")+"x8x";
			 }	 
			 
		 }	
		 
		 var jcyq = " ";
		 
		 var saveJcdInfoUrl = "/publish/doctor/saveJcdInfoUrl.htm";
		 
		 var result = getJSONData(saveJcdInfoUrl, {jcxmids : jcxmids,
			 									      hzid : md.hzid,
			 									      jzid : md.id,
			 									        yb : ybc,
			 									      jcyq : jcyq,
			 									   tag : Math.random()},"POST").obj;
		 
		 if(result)
		 {
			 
			 var updateJiuZhenStateUrl = "/publish/doctor/updateJiuZhenStateUrl.htm"; 
			 
			//开单成功后更新患者就诊状态为待复诊 
			var bl  = getJSONData(updateJiuZhenStateUrl, {jzid:md.id,
				                                      newstate:oimsCategory.VISITING_STATE_AGAIN,
				                                          tag : Math.random()}).obj;	
			if(bl)
			{	 
				 //开单成功
				 $.oimsSucc(language_doctor.KaiDanChengGong+"！"+language_doctor.DaiFuZhenAlert+"！",function(){
					 
						 
						 $(".openWin").remove();
						 $(".lockedBackground").remove();
					 
				 });
			}
		 }
	 }
	 
	 //重置
	 function click_reset()
	 {
		 
		 var id = $(".eyeb input:checked").attr("id");
		 if(id!=""&&id!=null)
		 {	 
			 document.getElementById(id).checked=false;
		 }
		 var cgs2 = $("#jcxm input:checked");
		 
		 for(var i = 0; i<cgs2.length;i++)
		 {
			 cgs2[i].checked=false;
			 $(cgs2[i]).attr("name","tsjc");
			 $(cgs2[i]).attr("class"," ");
		 }
		 
		 $("span[name='tushi_a']").remove();
	 }
	 
	 
	 return div;
	 
}
 
//显示所有检查项目 
function show_all_jcxm(check_div,md)
{
	if($("#checkdiv_jcxm").length>0)
	{
		$("#checkdiv_jcxm").remove();
	}
	
	var teshu_div = $("<div />").attr("class","checkdiv").attr("id","checkdiv_jcxm").addClass("emr_kaidanteshu00")/*.attr("style","width:718px;height:258px;")*/
    							.appendTo(check_div);
	
	var te_1 = $("<div />").attr({"class":"checkbilling","id":"te_1"}).addClass("emr_kaidanteshu01")/*.attr("style","width:350px;padding-right:0px;float:left;")*/.appendTo(teshu_div);
	 
	var te_2 = $("<div />").attr({"class":"checkbilling","id":"te_2"}).addClass("emr_kaidanteshu02")/*.attr("style","width:350px;padding-left:0px;float:right;")*/.appendTo(teshu_div);
	
	var getTeShuListAllUrl = "/publish/doctor/getTeShuListAllUrl.htm";
	//获取特殊检查列表
	var tslist = getJSONData(getTeShuListAllUrl, {id : oimsCategory.TE_SHU_JIAN_CHA}).obj;
		 
	var ul1 = $("<ul />").attr("id","te_ul_1").css({"padding":"8px"}).appendTo(te_1);
		 
	var ul2 = $("<ul />").attr("id","te_ul_2").css({"padding":"8px"}).appendTo(te_2);
		 
	for(var n = 0 ; n < tslist.length ; n++)
	{
		var xmid = tslist[n].xmid;
		var xmmc = tslist[n].xmmc;
		
		var ul = "";
		var jbid = ""; 
		if((n+1)%2==1)
		{
			 ul = ul1;
			 jbid = "10001";
		}
		else
		{
			 ul = ul2;
			 jbid = "10002";
		}
			 
		var btn = $("<span />").append(language_doctor.JianChaTs)//"图例"   "检查提示"
							   .addClass("emr_kaidanjianchatishispan")
			 				   .css({
			 						/*"display":"block",
			 						"float":"right",
			 						"width":"53px",
			 						"height":"30px",*/
			 						"background":"url("+contextPath+"/style/green/images/tubg2.png) no-repeat center"/*,*/
			 						/*"padding-right":"4px",
			 						"cursor":"pointer",
			 						"line-height":"30px",
			 						"text-align":"center",
			 						"padding-left":"2px"*/
			 						})
			                   .attr("id","span_"+jbid+"nn"+xmid+"__span_"+xmmc)
			                   .click(function(){
			                        	
			                        $("#"+$(this).attr("id").split("__")[0].split("_")[1]).attr("checked",true);
			                        
			                        CurrentInput_kd = $("#"+$(this).attr("id").split("__")[0].split("_")[1]);
			                	   
			                	    var temp_jbid = $(this).attr("id").split("__")[0].split("_")[1];
			           			    var temp_xmid = $(this).attr("id").split("__")[1].split("_")[1];
			           			
			           			    showPaintDialog(temp_jbid,temp_xmid,md);
			                        	
			                        });
				
			 
			 var inpl = $("<input />").attr({"type" : "checkbox",
				                             "name" : "tsjc",
				                            "style" : "vertical-align : middle;" ,
				                            "class" : " ",
				                               "id" : jbid+"nn"+xmid,
				                            "value" : xmmc
				                           });
			 
			 var lab = $("<label />").attr("for",jbid+"nn"+xmid).append("&nbsp;").append(xmmc);
			 
			 $("<li />").append(btn).append(inpl).append("&nbsp;").append(lab)
			 			.addClass("emr_kaidanli")
			 			/*.css({"text-align":"left",
			 				 "line-height":"30px",
			 				      "height":"30px",
			 			   "border-bottom":"1px dashed #aeaeae"})*/
			 		    .click(function(){})
			            .appendTo(ul);
	}	 
		 
}
 
//显示按病种分类检查项目
function show_bingzhong_jcxm(check_div,md)
{
	if($("#checkdiv_jcxm").length>0)
	{
		$("#checkdiv_jcxm").remove();
	}	
	
	var teshu_div = $("<div />").attr("class","checkdiv").attr("id","checkdiv_jcxm").addClass("emr_kaidanteshu00")/*.attr("style","width:718px;height:258px;")*/
	                            .appendTo(check_div);
	 
	 var te_1 = $("<div />").attr({"class":"checkbilling","id":"te_1"}).addClass("emr_kaidanteshu01")/*.attr("style","width:350px;padding-right:0px;float:left;")*/.appendTo(teshu_div);
	 
	 var te_2 = $("<div />").attr({"class":"checkbilling","id":"te_2"}).addClass("emr_kaidanteshu02")/*.attr("style","width:350px;padding-left:0px;float:right;")*/.appendTo(teshu_div);
	 
	 var getTeShuListUrl = "/publish/doctor/getTeShuListUrl.htm";
	 
	 //获取特殊检查列表
	 var tslist = getJSONData(getTeShuListUrl, {id : oimsCategory.TE_SHU_JIAN_CHA}).obj;
	 	 
	 /*
	  [
	   {jbid : 40078, jbname : 青光眼, jcxm : [{xmmc:彩照, xmid:7}, {xmmc:暗室, xmid:8}]}, 
 	   {jbid : 40088, jbname : 角膜炎, jcxm : [{xmmc:暗室, xmid:10}]}
      ]
	  */
	 	 
	 var qh = 0; //两列显示切换
	 
	 for(var i = 0 ; i<tslist.length ; i++)
	 {
		 var d1 = $("<div />").attr("class","disease")
		 					  .addClass("emr_kaidantwolistshow")
		 					  /*.css({"margin-right":"0px","margin-bottom":"0px","overflow-y":"hidden"})*/;
		 
		 var co = "open";
		 if(qh==0)
		 {
			 d1.appendTo(te_1);
			 d1.attr("id",tslist[i].jbid+"_1");
			 qh=1;
		 }
		 else
		 {
			 d1.appendTo(te_2);
			 d1.attr("id",tslist[i].jbid+"_2");
			 qh=0;
		 }	
		 
		 if(i!=0 && i!=1)
		 {
			 co = "close"; 
		 }
		
		 
		 var kh_tubiao = $("<span />").attr("class",co).attr("id","khtubiao"+tslist[i].jbid);
		 
		 $("<div />").attr({"class":"title",
			 				"onclick":"teshu_click("+tslist[i].jbid+")",
			 				"id":"title"+tslist[i].jbid})
			 		 .css({"padding-left": "6px"})		
		             .append($("<input />").attr({"type":"checkbox"})
		            		 			   .addClass("emr_kaidancheckbox")
		            		 			   /*.css({"display":"block","float":"left","height":"22px"})*/
		            		 			   .attr("name","check_all_input")
		            		 			   .click(function(e){  //全选框点击事件
		            		 				    
		            		 				   	 //获取当前全选框选取状态
		            		 				     var temp = $(this).attr("checked");
		            		 				     
		            		 				     //计算出和当前全选框选取状态相反的状态
		            		 				     if(temp == "checked")
		            		 				     {
		            		 				    	 temp = "checked";
		            		 				     }
		            		 				     else
		            		 				     {
		            		 				    	 temp = false;
		            		 				     }	
		            		 				     
		            		 				     var all_li_div = $(this).parent().parent();
		            		 				     
		            		 				     var all_input = all_li_div.find("ul").find("input");
		            		 				    
		            		 				     $.each(all_input, function(i, n){
		            		 				    	
		            		 					   $(n).attr("checked",temp);
		            		 					  
		            		 					 });
		            		 				     
		            		 				     stopBubble(e);   //阻止页面的点击穿透
		            		 				  
		            		 				})
		                    )
		 			 .append($("<span />"))
		             .append(tslist[i].jbname) //疾病名称
		             .append(kh_tubiao)        //加减开合小图标
		             .appendTo(d1);
		 
		 var ul1 = $("<ul />").attr("id","ul"+tslist[i].jbid).appendTo(d1);
		 
		 //循环该疾病分类下的检查项目列表
		 for(var n = 0 ;n<tslist[i].jcxm.length;n++)
		 {
			 var jbid = tslist[i].jbid;
			 var xmid = tslist[i].jcxm[n].xmid;
			 var xmmc = tslist[i].jcxm[n].xmmc;
			 var btn = $("<span />").append(language_doctor.JianChaTs)//"图例"   "检查提示"
			 						.addClass("emr_kaidanjianchatishispan")
			 						.css({/*"display":"block",
			 							  "float":"right",
			 							  "width":"53px",
			 							  "height":"30px",*/
			 							  "background":"url("+contextPath+"/style/green/images/tubg2.png) no-repeat center"/*,
			 							  "padding-right":"4px",
			 							  "cursor":"pointer",
			 							  "line-height":"30px",
			 							  "text-align":"center",
			 							  "padding-left":"2px"*/})
			                        .attr("id","span_"+jbid+"nn"+xmid+"__span_"+xmmc)
			                        .click(function(){
			                   
			                        	//选中此检查项目的复选框
			                        	$("#"+$(this).attr("id").split("__")[0].split("_")[1]).attr("checked",true);
			                        	
			                        	//将当前选中的检查项目赋值给变量CurrentInput_kd
			                        	CurrentInput_kd = $("#"+$(this).attr("id").split("__")[0].split("_")[1]);
			                        	
			                        	var temp_jbid = $(this).attr("id").split("__")[0].split("_")[1];
			                        	var temp_xmid = $(this).attr("id").split("__")[1].split("_")[1];
			                        	
			                        	//打开画图窗口
			                        	showPaintDialog(temp_jbid,temp_xmid,md);
			                        	
			                        });
			 
			 var inpl = $("<input />").css({"vertical-align" : "middle"})
			 						  .attr({"type" : "checkbox",
				                             "name" : "tsjc",
				                            "class" : " ",
				                               "id" : jbid+"nn"+xmid,
				                            "value" : xmmc
				                           });
			 
			 var lab = $("<label />").attr("for",jbid+"nn"+xmid).append("&nbsp;").append(xmmc);
			 
			 $("<li />").append(btn).append(inpl).append("&nbsp;").append(lab)
			 		    .click(function(){})
			            .appendTo(ul1);
		 }	
		 
		 //默认如果不是第一排的病种分类将隐藏
		 if(i!=0 && i!=1)
		 {
			 ul1.hide(); 
		 }	 
		  

	 }
}
 
 
//弹出画图窗口   宋仁非
function showPaintDialog(xmid,xmmc,md) 
{
	//console.log(xmid);
	//console.log(xmmc);
	//console.log(md);
	
	//return false;
	
	if(flash_swfobject_flag==0)
	{	
		importJS("/js/jquery.swfobject.1-1-1.js");
		flash_swfobject_flag = 1 ;
	}
	
	//console.log($.flash.available);
	
	//console.log($.flash.activeX);
	
	//console.log($.flash.version);
	
	//console.log($.flash.hasVersion());
	
	
	//var div = $("<div />").width(510).height(190).appendTo("body");
	
	//打开画图窗口
	
	
	var div = $("<div />").attr("style","padding:10px;").appendTo("body");
	paintWin_kd = div.oimsDialog({
	  winType : -2,
		title : language_doctor.Paint+"-"+xmmc,
		width : 750,  //502
	   height : 380, //300
	   locked : true,
	   button : [ {
			title : language_doctor.Save, //"保存"
			 func : paintSave_kd,
	   isCloseWin : false,
		className : "submit"
		} ]
	});
	showPaintNew(div,md);
} 

 
 
//画图底图地址 
var intr_kd_url = "";
	
//显示画图窗口内容  宋仁非
function showPaintNew(div,md)
{
	intr_kd_url = "/images/lefteye.png,/images/eye.png";//默认左右眼画图图片
	
	//CurrentInput_kd = jbid+"nn"+xmid
	//以上id对应当前点击的input框的id
	
	//当前点击画图按钮对应的检查项目
	var jcxm_id = $(CurrentInput_kd).attr("id").split("nn")[1];
	 
	var getJcxmIntrUrl = "/publish/doctor/getJcxmIntrUrl.htm";
	
	//获取jcxm配置的眼睛图片
	var intr_jcxm = getJSONData(getJcxmIntrUrl, {jcxmid : jcxm_id,tag : Math.random()},"POST").obj;
	
	if(intr_jcxm!=null&&intr_jcxm!=""&&$.trim(intr_jcxm)!=",")
	{
		intr_kd_url = intr_jcxm;
	}	
	
	var patientId =  md.hzid;         //患者ID
	var regId     =  md.id;           //就诊ID
	var mrId      =  "";              //记录ID
	var _url      =  intr_kd_url.split(",");   //画图图片地址
	var photoType =  1;
	var paintSaveUrl = contextPath+"/publish/doctor/paintSave.htm";   //保存画图
	
	paintLength_kd = _url.length;//该检查项目需要画图的图片个数
	
	if(_url.length==2)//如果需要画两张图
	{
		var ost=$("<div />").addClass("OSPaint")
							.addClass("emr_paintosod")
							/*.attr("style","width:360px;height:242px ;float:left;margin-right:5px")*/
							.appendTo(div);
		var odt=$("<div />").addClass("ODPaint")
							.addClass("emr_paintosod")
						    /*.attr("style","width:360px;height:242px ;float:left;margin-left:5px")*/
						    .appendTo(div);
		showSWF(_url[0],"OD",ost);
		showSWF(_url[1],"OS",odt);
	}
	else//如果需要画一张图
	{
		var odiv=$("<div />").addClass("OSPaint")
							 .addClass("emr_paintosod")
							 /*.attr("style","width:360px;height:242px ;float:left;margin-right:5px")*/
							 .appendTo(div);
		showSWF(_url[0],null,odiv);
	}
	
	//检查要求输入文本域
	var area_div = $("<div />").addClass("emr_kaidanyaoqiudiv")/*.attr("style","height:30px;width:730px;float:left;padding-top: 5px;")*/.appendTo(div);
	$("<textarea />").addClass("emr_kaidanyaoqiuarea").attr({"id":"jcyq"/*,"style":"height:28px;width:728px;line-height: 15px;"*/}).appendTo(area_div); //.attr({"cols":"100","rows":"2"})
	
	//显示flash画图窗口
	function showSWF(src,y,odiv)
	{
		var params = 
		    {
				allowScriptAccess : "sameDomain",
				quality:"high",
				wmode:"transparent"
			};
		var swfID="paintSWF";  //paintSWF_OD
		
		if(y!=null) 
		{
			$("<a />").text(y).attr("style","font-size: 12px;").appendTo(odiv);
			swfID+= "_"+y; //paintSWF_OD/paintSWF_OS
		}
		
		$("<div />").attr("id",swfID+"_new").appendTo(odiv).flash({ 
	          swf: contextPath+'/swf/paint.swf?random='+Math.random(),
	          id: swfID,
	          width: 360,    //251
	          height: 230,   //195
	          flashvars: {		url : contextPath+src,	//画图底图地址
	        	  		 	   eyes : y,				//眼别OS/OD
	        	  		  patientId : patientId,		//患者id
	        	  		      regId : regId,			//就诊id
	        	  		    saveUrl : paintSaveUrl,		//保存画图的后台地址
	        	  		         id : mrId,				//记录id
	        	  		  photoType : photoType,		//1
	        	  	   callbackFunc : "paintCallback_kd"//回调方法
	        	  		 },
	          paremeters: params
	     });
	}
}


//点击画图窗口保存按钮   宋仁非
function paintSave_kd()
{
	
	//获取检查要求的内容
	jcyq_kd = $("#jcyq").val();
	if(jcyq_kd==""||jcyq_kd==null)
	{
		jcyq_kd = "    ";
	}	
	
	if(intr_kd_url.split(",").length==2)
	{
		getFLASHJSONData("paintSWF_OD");
		getFLASHJSONData("paintSWF_OS");
	}
	else
	{
		getFLASHJSONData("paintSWF");
	}
	
	function getFLASHJSONData(swdId)
	{
		$("#"+swdId+"_new").flash(function(){
			
			//cs画图保存
			this.paintSave();
			
		});
		
	}
}

 
//图片保存回调函数  宋仁非
 function paintCallback_kd(data,eyes)
 {
 	//console.log("paintCallback");
 	//console.log(eyes);
 	
 	var d = eval('('+data+')');
 	//console.log(d);
 	
 	if(d.state)
 	{
 		paintCurrent_kd++;  //记录当前是第几个保存图片的回调
 		
 		paintSave_Callback_kd(d,eyes);
 		
 		if(paintCurrent_kd==paintLength_kd)
 		{
 			paintCurrent_kd=0;
 			
 			$(CurrentInput_kd).parent().find("span[name='tushi_a']").remove();
 			
 			//显示查看图示按钮
 			showTuShi_kd();
 			
 			//关闭弹出的画图窗口
 			paintWin_kd.close();
 		}
 	}
 }
 
 
//显示查看图示按钮  宋仁非
 function showTuShi_kd()
 {
	 var image_url = $(CurrentInput_kd).attr("name"); //画图后保存的图片地址
	 
	 var jcyq_kd = $(CurrentInput_kd).attr("class");  //检查要求
	 
	 var a = $("<span />").attr({"name":"tushi_a"})
	 					  .addClass("emr_kaidanjianchatushi")
		                  .css({
		                	  /*"color":"blue",
		                	  "cursor":"pointer",
		                	  "display":"block",
		                	  "folat":"right",
		                	  "margin-right":"5px",
		                	  "height":"30px",
		                	  "width":"39px",
		                	  "float":"right",*/
		                	  "background":"url('"+contextPath+"/style/green/images/tubg.png') no-repeat center"/*,
		                	  "text-align":"center",
		                	  "line-height":"30px",
		                	  "vertical-align":"middle"*/
		                  })
	 				   .click(function(){showimage_kd(image_url,jcyq_kd);})
	 				   .append(language_doctor.TuShi);//"图示"
	 $(CurrentInput_kd).parent().append(a);
 }
 
//看图示  宋仁非
 function showimage_kd(url,jcyq_kd)
 {
 	
 	urls = url.split(",");
 	
 	console.log(urls);
 	
 	var div = $("<div />").addClass("emr_showimagediv01")/*.attr("style","padding:10px;")*/;
 	
 	var left = $("<div />").addClass("emr_showimagediv02")/*.attr("style","width:360px;height:230px ;float:left;margin-right:5px")*/
 						   .appendTo(div);
 	
 	var right = $("<div />").addClass("emr_showimagediv02")/*.attr("style","width:360px;height:230px ;float:left;margin-left:5px")*/
 		                    .appendTo(div);
 	if(urls.length>=2)
 	{	
	 	var limg = $("<img />").addClass("emr_showimage00")/*.attr("style","width:360px;height:230px ;")*/
	 	                       .attr("src",contextPath+urls[0]).appendTo(left);
	 	
	 	var rimg = $("<img />").addClass("emr_showimage00")/*.attr("style","width:360px;height:230px ;")*/
	 	                       .attr("src",contextPath+urls[1]).appendTo(right);
 	}
 	
 	//检查要求
 	var area_div = $("<div />").addClass("emr_kaidanjianchayqshow")/*.attr("style","height:30px;width:730px;float:left;padding-top: 5px;")*/.appendTo(div);
	$("<p />").attr("style","text-align: left;").append(jcyq_kd).appendTo(area_div); 
 	
 	div.appendTo("body");
 	
 	//打开看已画图示窗体
 	$(div).oimsDialog({
 		               winType : -2,
 		                  icon : "openform",
 		                 title : language_doctor.TuShi,//"图示"
 		                  drag : false,
 		                locked : true,
 		                 width : "750",
 		                height : "310"});
 	
 }
 
 //获取图片保存回调函数数据进行处理      宋仁非
 function paintSave_Callback_kd(data, eyes) 
 {
 	v = data.obj;  //"/UploadFile/16/15/m_r_photos/temp_OD_20139221023486632661.jpg"
 	
 	var input = $(CurrentInput_kd);
 	
 	var x = input.attr("name");
 	
 	if (x == null||x=="")
 	{
 		x = ",";
 	}
 	
 	var vs = x.split(",");
 	
 	if (eyes.toLocaleLowerCase() == "od")
 	{	
 		vs[0] = v;
 	}	
 	else if (eyes.toLocaleLowerCase() == "os")
 	{	
 		vs[1] = v;
 	}
 	
 	//console.log(vs.toString());
 	
 	input.attr("name",vs.toString());  //input复选框的name属性中存放了画图保存的图片地址
 	input.attr("class",jcyq_kd);       //input复选框的class属性中存放了检查要求
 }
 
//响应特殊检查分类项点击事件  宋仁非
 function teshu_click(jbid)
 {
	 
	 var id = "ul"+jbid;
	 
	 var ul_div = $("#ul"+jbid);
	 var kh = $("#khtubiao"+jbid);
	 
	 kaihe($(kh));
	 
	 $(ul_div).toggle("fast");
	 
	 function kaihe(d)
	 {
		 if(d.attr("class")=="open")
		 {
			 d.removeClass("open").addClass("close");
		 }
		 else if(d.attr("class")=="close")
		 {
			 d.removeClass("close").addClass("open");
		 }	 
	 }
	 
	 var parent_id = $(ul_div).parent().attr("id");
	 var temp = parent_id.split("_");
	 var lb = temp[1];
	 
	 
	 var data = $(".checkdiv ul:not([id = "+id+"])");
	 
	 $.each(data, function(i, n){
	
		 if($(n).parent().attr("id").split("_")[1]==lb)
		 {
			 var jid = $(n).parent().attr("id").split("_")[0];
			 var kho = $("#khtubiao"+jid);
			 if(kho.attr("class")=="open")
			 {
				 kho.removeClass("open").addClass("close");
			 }	 
			 $(n).hide("fast");
		 }	 
		 
	 });
	 
	 
 }