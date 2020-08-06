/**
 * 开单页面js
 * 宋仁非
 */

 var paintCurrent_kd = 0;
 var paintLength_kd = 0;
 var paintWin_kd ;
 var CurrentInput_kd;
 var jcyq_kd = "";

/**
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
	 
	 //获取眼别分类 （左眼、右眼、双眼）
	 var result = getJSONData(getYanBieCategoryUrl, {fid:oimsCategory.CATEGORY_YANBIE,
		                                            tag : Math.random()}).obj;
	 
	 var yb = $("<div />").attr("class","eyeb").appendTo(div);
	 
	 $.each( result, function(i, d){
			
		 var input_yb = $("<input />").attr({"type":"radio" , "name":"eye_category" ,"style" : "vertical-align : top;" , "id":d.id , "value":d.id})
					                  .appendTo(yb);
		 
		 $("<label />").attr("for",d.id).text(d.category).append("&nbsp;&nbsp;&nbsp;").appendTo(yb);
			
		 //默认选择双眼
		 if(d.id == 48)
		 {
			 input_yb.attr("checked","checked");
		 }	 
		 
		});
	 
	 //检查项目div (包含 常规检查  特殊检查)
	 var check_div = $("<div />").attr("class","opencontent check")
	 							 //.attr("style","height:72%;")
	 							 .attr("id","jcxm")
	 							 .appendTo(div);
	 //常规检查
	 $("<p />").text(language_doctor.ChangGuiJianCha+"：").appendTo(check_div);
	 
	 var changgui_div = $("<div />").attr("class","checkdiv1").appendTo(check_div);
	 
	 var changgui_table = $("<table />").attr({"id":"chang_gui_table",
		                                       "width":"100%",
		                                       "border":"0",
		                                       "cellspacing":"0",
		                                       "cellpadding":"0",
		                                       "height":"25"}).appendTo(changgui_div);
	 //获取常规检查列表
	 var cglist = getJSONData(getChangGuiListUrl, {id : oimsCategory.CHANG_GUI_JIAN_CHA}).obj;
	 
	 var tr = null; var x = 0;
	 for(var i = 0; i < cglist.length ; i++)
	 {
		 x=x+1;
		 if(x==1){tr = $("<tr />").attr("id","tr_"+i);  tr.appendTo(changgui_table);}
		 
		 //每行显示八个
		 if(x==8){x=0;}	 
		 
		 var td = $("<td />").attr("width","11%").attr("align","left").appendTo(tr);
		 
		 $("<input />").attr({"type":"checkbox",
			                  "id":"888nn"+cglist[i].id,
			                  "name":"cgjc",
			                 "class":" ",
			                 "style" : "vertical-align : middle;" ,
			                  "value":cglist[i].xmmc})
		 			   .appendTo(td);
		 
		 $("<label />").attr("for","888nn"+cglist[i].id)
		               .append("&nbsp;")
		               .append(cglist[i].xmmc)
		               .appendTo(td);
		 //td.append("&nbsp;"+cglist[i].xmmc);
	 }
	 
	 
	 
	 //特殊检查
	 //$("<p />").text(language_doctor.TeShuJianCha+"：").appendTo(check_div);
	 $("<p />").text(" ").appendTo(check_div);
	 
	 //页签
	 var yeqian_div =$("<div />").attr("style","height:28px;width:auto;font-weight: bold;")
	 							 .attr("id","ts_yeqian_div")
	                             .appendTo(check_div);
	 
	 $("<div />").attr("class","tab_show")
     			 .append($("<span />").append(language_doctor.AllCheckItems))
     			 .click(function(){
     				
     				 $("#ts_yeqian_div .tab_show").removeClass("tab_show").addClass("tab_hide");
     				 $(this).addClass("tab_show");
     				 
     				show_all_jcxm(check_div,md);
     			 })
     			 .appendTo(yeqian_div);
	 
	 $("<div />").attr("class","tab_hide")
	             .append($("<span />").append(language_doctor.BzFenLei))
	             .click(function(){
	            	 
	            	 $("#ts_yeqian_div .tab_show").removeClass("tab_show").addClass("tab_hide");
     				 $(this).addClass("tab_show");
	            	 
	            	show_bingzhong_jcxm(check_div,md);
	             })
	             .appendTo(yeqian_div);
	 
	 //默认显示全部检查
	 show_all_jcxm(check_div,md);
	 
	 
	 div.append($("<br>"));
	 
	 //按钮
	 var divbtn = $("<div />").attr("class","openbutton").appendTo(div);
	 $("<a />").attr("href","#")
	 	   	   .append($("<span />").attr("class","advsumit"))
	 	       .attr("id","kaidantijiao")
	 	       .append(language.Submit)//"提交"
	 	       .click(function(){click_submit(md);})
	 	       .appendTo(divbtn);
	 
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
		 
		 //cs("jcxmids");	 
		 //cs(jcxmids);
		 
		 var jcyq = " ";
		 
		 var result = getJSONData(saveJcdInfoUrl, {jcxmids : jcxmids,
			 									      hzid : md.hzid,
			 									      jzid : md.id,
			 									        yb : ybc,
			 									      jcyq : jcyq,
			 									   tag : Math.random()},"POST").obj;
		 
		 //var result = true;
		 
		 if(result)
		 {
			//更新就诊状态为待复诊 
			var bl  = getJSONData(updateJiuZhenStateUrl, {jzid:md.id,
				                                      newstate:oimsCategory.VISITING_STATE_AGAIN,
				                                          tag : Math.random()}).obj;	
			if(bl)
			{	 
				 //开单成功
				 $.oimsSucc(language_doctor.KaiDanChengGong+"！"+language_doctor.DaiFuZhenAlert+"！",function(){
					 
					 //$.oimsAlert(language_doctor.DaiFuZhenAlert+"！",function(){
						 
						 $(".openWin").remove();
						 $(".lockedBackground").remove();
						 
					 //});
					 
					 
				 });
			}
		 }
	 }
	 
	 //重置
	 function click_reset()
	 {
		 
		 var id = $(".eyeb input:checked").attr("id");//checked=false;
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
function show_all_jcxm(check_div,md)
{
	if($("#checkdiv_jcxm").length>0)
	{
		$("#checkdiv_jcxm").remove();
	}
	
	var teshu_div = $("<div />").attr("class","checkdiv").attr("id","checkdiv_jcxm").attr("style","width:718px;height:258px;")
    .appendTo(check_div);
	
	var te_1 = $("<div />").attr({"class":"checkbilling","id":"te_1"}).attr("style","width:350px;padding-right:0px;float:left;").appendTo(teshu_div);
	 
	var te_2 = $("<div />").attr({"class":"checkbilling","id":"te_2"}).attr("style","width:350px;padding-left:0px;float:right;").appendTo(teshu_div);
	 
	//获取特殊检查列表
	var tslist = getJSONData(getTeShuListAllUrl, {id : oimsCategory.TE_SHU_JIAN_CHA}).obj;
	
	 //cs("特殊检查列表（疾病分类）");
	 //cs(tslist);
	 
	 var qh = 0; //两列显示切换
	 
	 for(var i = 0 ; i<tslist.length ; i++)
	 {
		 var d1 = $("<div />").attr("class","disease").attr("style","margin-right:0px;margin-bottom:0px;overflow-y: hidden;");
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
		 
		 $("<div />").attr({"class":"title","style":"padding-left: 6px;","onclick":"teshu_click("+tslist[i].jbid+")","id":"title"+tslist[i].jbid})
		             .append($("<input />").attr({"type":"checkbox","style":"display:block;float:left;height: 22px;"})
		            		 			   .attr("name","check_all_input")
		            		 			   .click(function(e){
		            		 				    
		            		 				     var temp = $(this).attr("checked");
		            		 				     
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
		            		 				     
		            		 				     stopBubble(e);   
		            		 				  
		            		 				})
		                    )
		 			 .append($("<span />"))
		             .append(tslist[i].jbname)
		             .append(kh_tubiao)
		             .appendTo(d1);
		 
		 var ul1 = $("<ul />").attr("id","ul"+tslist[i].jbid).appendTo(d1);
		 
		 for(var n = 0 ;n<tslist[i].jcxm.length;n++)
		 {
			 var xmid = tslist[i].jcxm[n].xmid;
			 var xmmc = tslist[i].jcxm[n].xmmc;
			 var btn = $("<span />").append(language_doctor.JianChaTs)//"图例"   "检查提示"
			                        .attr("style","display:block; float:right; width:53px; height:30px; background:url("+contextPath+"/style/green/images/tubg2.png) no-repeat center; padding-right:4px;cursor:hand; line-height:30px; text-align:center; padding-left:2px;")
			 						.attr("id","span_"+tslist[i].jbid+"nn"+tslist[i].jcxm[n].xmid+";span_"+tslist[i].jcxm[n].xmmc)
			                        .click(function(){
			                        	
			                        	//$(this).parent().find("input").attr("checked",true);
			                        	$("#"+$(this).attr("id").split(";")[0].split("_")[1]).attr("checked",true);
			                        	CurrentInput_kd = $("#"+$(this).attr("id").split(";")[0].split("_")[1]);
			                        	
			                        	showPaintDialog($(this).attr("id").split(";")[0].split("_")[1],
			                        			        $(this).attr("id").split(";")[1].split("_")[1],md);
			                        	//return false;
			                        });
			 
			 var inpl = $("<input />").attr({"type" : "checkbox",
				                             "name" : "tsjc",
				                            "style" : "vertical-align : middle;" ,
				                            "class" : " ",
				                               "id" : tslist[i].jbid+"nn"+tslist[i].jcxm[n].xmid,
				                            "value" : tslist[i].jcxm[n].xmmc
				                           });
			 var lab = $("<label />").attr("for",tslist[i].jbid+"nn"+tslist[i].jcxm[n].xmid).append("&nbsp;").append(tslist[i].jcxm[n].xmmc);
			 
			 $("<li />").append(btn).append(inpl).append("&nbsp;").append(lab)
			 		    .click(function(){
			 		    	
			 		    	/*var che = $(this).find("input").attr("checked");
			 		    	if(che != "checked")
			 		    	{
			 		    		$(this).find("input").attr("checked",true);
			 		    	}
			 		    	else
			 		    	{
			 		    		$(this).find("input").attr("checked",false);
			 		    	}*/	
			 		    	
			 		    })
			            .appendTo(ul1);
		 }	 
		 if(i!=0 && i!=1)
		 {
			 ul1.hide(); 
		 }	 
		  

	 }
}
 
function show_bingzhong_jcxm(check_div,md)
{
	if($("#checkdiv_jcxm").length>0)
	{
		$("#checkdiv_jcxm").remove();
	}	
	
	var teshu_div = $("<div />").attr("class","checkdiv").attr("id","checkdiv_jcxm").attr("style","width:718px;height:258px;")
	                            .appendTo(check_div);
	 
	 var te_1 = $("<div />").attr({"class":"checkbilling","id":"te_1"}).attr("style","width:350px;padding-right:0px;float:left;").appendTo(teshu_div);
	 
	 var te_2 = $("<div />").attr({"class":"checkbilling","id":"te_2"}).attr("style","width:350px;padding-left:0px;float:right;").appendTo(teshu_div);
	 
	 //获取特殊检查列表
	 var tslist = getJSONData(getTeShuListUrl, {id : oimsCategory.TE_SHU_JIAN_CHA}).obj;
	 
	 //cs("特殊检查列表（疾病分类）");
	 //cs(tslist);
	 
	 var qh = 0; //两列显示切换
	 
	 for(var i = 0 ; i<tslist.length ; i++)
	 {
		 var d1 = $("<div />").attr("class","disease").attr("style","margin-right:0px;margin-bottom:0px;overflow-y: hidden;");
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
		 
		 $("<div />").attr({"class":"title","style":"padding-left: 6px;","onclick":"teshu_click("+tslist[i].jbid+")","id":"title"+tslist[i].jbid})
		             .append($("<input />").attr({"type":"checkbox","style":"display:block;float:left;height: 22px;"})
		            		 			   .attr("name","check_all_input")
		            		 			   .click(function(e){
		            		 				    
		            		 				     var temp = $(this).attr("checked");
		            		 				     
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
		            		 				     
		            		 				     stopBubble(e);   
		            		 				  
		            		 				})
		                    )
		 			 .append($("<span />"))
		             .append(tslist[i].jbname)
		             .append(kh_tubiao)
		             .appendTo(d1);
		 
		 var ul1 = $("<ul />").attr("id","ul"+tslist[i].jbid).appendTo(d1);
		 
		 for(var n = 0 ;n<tslist[i].jcxm.length;n++)
		 {
			 var xmid = tslist[i].jcxm[n].xmid;
			 var xmmc = tslist[i].jcxm[n].xmmc;
			 var btn = $("<span />").append(language_doctor.JianChaTs)//"图例"   "检查提示"
			                        .attr("style","display:block; float:right; width:53px; height:30px; background:url("+contextPath+"/style/green/images/tubg2.png) no-repeat center; padding-right:4px;cursor:hand; line-height:30px; text-align:center; padding-left:2px;")
			 						.attr("id","span_"+tslist[i].jbid+"nn"+tslist[i].jcxm[n].xmid+";span_"+tslist[i].jcxm[n].xmmc)
			                        .click(function(){
			                        	
			                        	//$(this).parent().find("input").attr("checked",true);
			                        	$("#"+$(this).attr("id").split(";")[0].split("_")[1]).attr("checked",true);
			                        	CurrentInput_kd = $("#"+$(this).attr("id").split(";")[0].split("_")[1]);
			                        	
			                        	showPaintDialog($(this).attr("id").split(";")[0].split("_")[1],
			                        			        $(this).attr("id").split(";")[1].split("_")[1],md);
			                        	//return false;
			                        });
			 
			 var inpl = $("<input />").attr({"type" : "checkbox",
				                             "name" : "tsjc",
				                            "style" : "vertical-align : middle;" ,
				                            "class" : " ",
				                               "id" : tslist[i].jbid+"nn"+tslist[i].jcxm[n].xmid,
				                            "value" : tslist[i].jcxm[n].xmmc
				                           });
			 var lab = $("<label />").attr("for",tslist[i].jbid+"nn"+tslist[i].jcxm[n].xmid).append("&nbsp;").append(tslist[i].jcxm[n].xmmc);
			 
			 $("<li />").append(btn).append(inpl).append("&nbsp;").append(lab)
			 		    .click(function(){
			 		    	
			 		    	/*var che = $(this).find("input").attr("checked");
			 		    	if(che != "checked")
			 		    	{
			 		    		$(this).find("input").attr("checked",true);
			 		    	}
			 		    	else
			 		    	{
			 		    		$(this).find("input").attr("checked",false);
			 		    	}*/	
			 		    	
			 		    })
			            .appendTo(ul1);
		 }	 
		 if(i!=0 && i!=1)
		 {
			 ul1.hide(); 
		 }	 
		  

	 }
}
 
 
 function stopBubble(e) 
 {
 	var a = e ? e : window.event;
 	
 	if (window.event)  // IE 
 	{ 
 		//alert("ie");

 		window.event.cancelBubble=true ;
 		//a.cancelBubble = true; 
 	} 
 	else  // FF
 	{ 
 		//alert("ff");
 		//a.preventDefault(); 
 		a.stopPropagation(); 
 	} 
 }
 
 
//弹出画图窗口   宋仁非
function showPaintDialog(xmid,xmmc,md) 
{
	//importJS("/js/jquery.swfobject.js");
	if(flash_swfobject_flag==0)
	{	
		importJS("/js/jquery.swfobject.1-1-1.js");
		flash_swfobject_flag = 1 ;
	}
	
	//alert($.flash.available);
	
	//alert($.flash.activeX);
	
	//alert($.flash.version);
	
	//alert($.flash.hasVersion());
	
	//importJS("/js/swfobject-2.2.js");
	
	
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

 
 
 
var intr_kd_url = "";
	
//显示画图窗口内容  宋仁非
function showPaintNew(div,md)
{
	intr_kd_url = "/images/lefteye.png,/images/eye.png";
	
	var getJcxmIntrUrl = "/publish/doctor/getJcxmIntrUrl.htm";
	
	var jcxm_id = $(CurrentInput_kd).attr("id").split("nn")[1];
	 
	//获取jcxm配置的眼睛图片
	var intr_jcxm = getJSONData(getJcxmIntrUrl, {jcxmid : jcxm_id,tag : Math.random()},"POST").obj;
	if(intr_jcxm!=null&&intr_jcxm!=""&&intr_jcxm!=",")
	{
		intr_kd_url = intr_jcxm;
	}	
	
	var patientId =  md.hzid;         //患者ID
	var regId     =  md.id;           //就诊ID
	var mrId      =  "";              //记录ID
	var _url      =  intr_kd_url.split(",");   //画图图片地址
	var photoType =  1;
	var paintSaveUrl = contextPath+"/publish/paint/paintSave.htm";   //保存画图
	
	paintLength_kd = _url.length;
	
	if(_url.length==2)
	{
		var ost=$("<div />").addClass("OSPaint")
							.attr("style","width:360px;height:242px ;float:left;margin-right:5px")
							.appendTo(div);
		var odt=$("<div />").addClass("ODPaint")
						    .attr("style","width:360px;height:242px ;float:left;margin-left:5px")
						    .appendTo(div);
		showSWF(_url[0],"OD",ost);
		showSWF(_url[1],"OS",odt);
	}
	else
	{
		showSWF(_url[0],null,odiv);
	}
	
	var area_div = $("<div />").attr("style","height:30px;width:730px;float:left;padding-top: 5px;").appendTo(div);
	$("<textarea />").attr({"id":"jcyq","style":"height:28px;width:728px;line-height: 15px;"}).appendTo(area_div); //.attr({"cols":"100","rows":"2"})
	
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
			swfID+= "_"+y;
		}
		
		$("<div />").attr("id",swfID+"_new").appendTo(odiv).flash({ 
	          swf: contextPath+'/swf/paint.swf?random='+Math.random(),
	          id: swfID,
	          width: 360,    //251
	          height: 230,   //195
	          flashvars: {		url : contextPath+src,
	        	  		 	   eyes : y,
	        	  		  patientId : patientId,
	        	  		      regId : regId,
	        	  		    saveUrl : paintSaveUrl,
	        	  		         id : mrId,
	        	  		  photoType : photoType,
	        	  	   callbackFunc : "paintCallback_kd"
	        	  		 },
	          paremeters: params
	     });
	}
}


//点击画图窗口保存按钮   宋仁非
function paintSave_kd()
{
	jcyq_kd = $("#jcyq").val();
	if(jcyq_kd==""||jcyq_kd==null)
	{
		jcyq_kd = "    ";
	}	
	//cs(jcyq);
	
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
			
			//cs("画图保存");
			
			this.paintSave();
			
		});
		
	}
}

 
//图片保存回调函数  宋仁非
 function paintCallback_kd(data,eyes)
 {
 	//cs("paintCallback");
 	//cs(eyes);
 	
 	var d = eval('('+data+')');
 	//cs(d);
 	
 	if(d.state)
 	{
 		paintCurrent_kd++;
 		
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
	 var image_url = $(CurrentInput_kd).attr("name");
	 var jcyq_kd = $(CurrentInput_kd).attr("class");
	 var a = $("<span />").attr({"name":"tushi_a",
		                        "style":"color: blue;cursor: pointer;display:block;folat:right;margin-right: 5px;"})
	 				   //.append("&nbsp;&nbsp;&nbsp;&nbsp;")
	 				   .click(function(){showimage_kd(image_url,jcyq_kd);})
	 				   .append(language_doctor.TuShi);//"图示"
	 $(CurrentInput_kd).parent().append(a);
 }
 
//看图示  宋仁非
 function showimage_kd(url,jcyq_kd)
 {
 	
 	//v = getJSONData(getJiuZhenImageUrl,{jlid:jlid,tag:Math.random}).obj;
 	
 	urls = url.split(",");
 	
 	var div = $("<div />").attr("style","padding:10px;");
 	
 	var left = $("<div />").attr("style","width:360px;height:230px ;float:left;margin-right:5px")
 						   .appendTo(div);
 	
 	var right = $("<div />").attr("style","width:360px;height:230px ;float:left;margin-left:5px")
 		                    .appendTo(div);
 	
 	var limg = $("<img />").attr("style","width:360px;height:230px ;")
 	                       .attr("src",contextPath+urls[0]).appendTo(left);
 	
 	var rimg = $("<img />").attr("style","width:360px;height:230px ;")
 	                       .attr("src",contextPath+urls[1]).appendTo(right);
 	
 	var area_div = $("<div />").attr("style","height:30px;width:730px;float:left;padding-top: 5px;").appendTo(div);
	$("<p />").attr("style","text-align: left;").append(jcyq_kd).appendTo(area_div); //.attr({"cols":"100","rows":"2"})
 	
 	div.appendTo("body");
 	
 	$(div).oimsDialog({
 		               winType : -2,
 		                  icon : "openform",
 		                 title : language_doctor.TuShi,//"图示"
 		                  drag : false,
 		                locked : true,
 		                 width : "750",
 		                height : "310"});
 	//return false;
 }
 
 //获取图片保存回调函数数据进行处理      宋仁非
 function paintSave_Callback_kd(data, eyes) 
 {
 	v = data.obj;
 	
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
 	
 	//cs("vs:"+vs.toString());
 	//cs(vs);
 	
 	input.attr("name",vs.toString());
 	input.attr("class",jcyq_kd);
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