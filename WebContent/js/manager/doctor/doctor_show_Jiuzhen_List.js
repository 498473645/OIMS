/**
 * 显示就诊次数列表
 * 
 * @param id 患者id
 * @param sn 患者序号
 * @param patient 患者信息
 * @returns
 * 宋仁非
 */
function showMedicalReords(id,sn,patient) 
{
	
	var li_count = 0;
	var li_sn = 0;
	
	var current_sn = "";
	
	var mcList;
	
	var getMedicalRecords = "/publish/doctor/getMedicalRecords.htm";
	//获取患者的就诊次数列表信息
	
	mcList = getJSONData(getMedicalRecords, {id : id}).obj;
	//对比按钮
	var duibi_btn_div = $("<div />").css({"height":"20px","width":dws.mcListTag.width()+"px"})
									.append(
											$("<span />").addClass("emr_jiuzhenlistduibispan")
														 /*.css({"display": "block","float": "right","margin-right": "40px","margin-top": "2.5px","cursor": "pointer"})*/
														 .click(function(){
											                	  	show_duibi();
												              })
											             .text("对比")
											)
									.appendTo(dws.mcListTag);
	
	//固定大小的div框
	var gdkuang_div = $("<div />").css({"height":dws.mcListTag.height()-20+"px","overflow":"hidden"})
								  .attr("id","jzlistdiv_gd")
								  .appendTo(dws.mcListTag);
	
	//显示历次就诊记录的div（追加到固定大小的div框里）
	var jzlistdiv = $("<div />").attr("id","jzlistdiv").appendTo(gdkuang_div);
	
	var ul = $("<ul />").appendTo(jzlistdiv);
	
	li_count = mcList.length;
	//循环拼接就诊次数信息页面并绑定单击事件
	$.each(mcList, function(i, d) 
	{
		var keshi_s = d.bumen!=null?d.bumen:"";     //科室
		var yisheng_s = d.doctor!=null?d.doctor:""; //医生
		
		var li = $("<li />").attr("id","li_sn_"+(++li_sn)).css({"cursor":"pointer"}).appendTo(ul);
		
		
		//左侧复选框
		$("<span />").addClass("emr_jiuzhenlistcheck")
					 /*.css({"display":"block","float":"left","margin-left":"8px","margin-top":"15px"})*/
		             .appendTo(li)
		             .append(
		        			$("<input />").attr({"type":"checkbox","value":d.id})   //“d.id” 为就诊id
		        			              .click(function(e){
		        			            	  
		        				                      var checkedList = $("#jzlistdiv input[type = checkbox]");
		        				                      
		        				                      var indexNum = 0;
		        				                      
		        				                      var reTF = true;
		        				                      
		        				                      for(var ci = 0,length = checkedList.length;ci<length;ci++)
		        				                      {
		        					                     if(checkedList[ci].checked == true)
		        					                     {
		        						                    indexNum++;
		        					                     }
		        					                     if(indexNum>3)
		        					                     {
		        						                    $.oimsAlert("最多对比三次就诊记录");
		        						                    reTF = false;
		        						                    break;
		        					                     }
		        				                      }
		        				                      
		        				                      if(!reTF)
		        				                      {
		        					                     return false;
		        				                      }
		        				                      
		        				                      stopBubble(e); //阻止html冒泡事件
		        			             })				  
		        		  );
		
		//显示就诊时间
		$("<p />").text(d.date).appendTo(li);
		//显示就诊科室：医生
		//$("<p />").text(keshi_s + "：" + d.id/*yisheng_s*/).appendTo(li);//科室:医生
		$("<p />").text("就诊ID：" + d.id/*yisheng_s*/).appendTo(li);//病历号:jzid
		
		
		//默认显示点击选择的就诊记录
		if (d.id == patient.id) 
		{
			li.addClass("visited");
			
			current_sn = li.attr("id");
			
			//显示功能按钮 
			showMedicalRecord(d,sn,patient);
			//显示病历记录页签
			show_bingli_jilu_tab(d);
			//显示检查单
			showStudies(d);
		}
	
		//单击事件
		li.click(function() 
		{
			$("li.visited").removeClass("visited");
			li.addClass("visited");
			//显示功能按钮
			showMedicalRecord(d,sn,patient);
			//显示病历记录页签
			show_bingli_jilu_tab(d);
			//显示检查单
			showStudies(d);
		});
	
		//鼠标事件 //css样式切换
		li.bind("mouseover", function() 
		{
			li.addClass("mo");
		});
		
		li.bind("mouseout", function() 
		{
			li.removeClass("mo");
		});
		
	});
	//循环拼接就诊记录结束
	
	importJS("/jquery_mousewheel/jquery.mousewheel.js");
	//绑定就诊列表滚动事件
	dws.mcListTag.mousewheel(function(event, delta, deltaX, deltaY) 
	{
			var waih = $("#jzlistdiv_gd").innerHeight();
			var neih = $("#jzlistdiv").innerHeight();
		
		    if(neih>waih)
		    {	
		        if (delta > 0)
		        {
		            var h = $("#jzlistdiv").css("margin-top");
		            var a = h.substring(0,h.indexOf("px"));
		            if(parseInt(a)!=0)
		            {	
		            	var v = 0;
		            	if(a>-40)
		            	{
		            		v = 0;
		            	}
		            	else
		            	{
		            		v = parseInt(a)+40;
		            	}	
		            	
		            	var t = v+"px";
		            	$("#jzlistdiv").css("margin-top",t);
		            }
		            else if(parseInt(a)>=0)
		            {
		            	var t = 0+"px";
		            	$("#jzlistdiv").css("margin-top",t);
		            }	
		        }
		        else if (delta < 0)
		        {
		            var h = $("#jzlistdiv").css("margin-top");
		            var a = h.substring(0,h.indexOf("px"));
		            
		            var chah = neih - waih ;
		            chah = Math.abs(chah);
		            
		            a = Math.abs(a);
		            var v = 0;
		            if(chah - a >= 40)
		            {	
		            	v = -a - 40;
		            	
		            }
		            else if(chah - a < 40)
		            {
		            	v = -a - (chah-a);
		            }	
		            
		            var t = v+"px";
	            	$("#jzlistdiv").css("margin-top",t);
		        }
		   }
		        return false; // prevent default
		        
	});
	
	//如果就诊列表超出显示区域 则添加向上点击按钮和向下点击按钮
	if($("#jzlistdiv").height() > $('#jzlistdiv_gd').height())
	{
		$("#jzlistdiv_gd").height(dws.mcListTag.height()-40);
		
		$("<div />").addClass("emr_jiuzhenlistgundongbtn").css({/*"cursor":"pointer","height":"10px",*/"background":"url("+contextPath+"/images/up1.png)"}).attr("id","jzjl_up1").prependTo(dws.mcListTag);
		
		duibi_btn_div.prependTo(dws.mcListTag);
		
		$("<div />").addClass("emr_jiuzhenlistgundongbtn").css({/*"cursor":"pointer","height":"10px",*/"background":"url("+contextPath+"/images/down1.png)"}).attr("id","jzjl_down1").appendTo(dws.mcListTag);
		
		$("#jzjl_up1").click(function(){
			
			var h = $("#jzlistdiv").css("margin-top");
			
            var a = h.substring(0,h.indexOf("px"));
            
            var waih = $("#jzlistdiv_gd").innerHeight();
            var neih = $("#jzlistdiv").innerHeight();
            
            var chah = neih - waih ;
            chah = Math.abs(chah);
            
            a = Math.abs(a);
            var v = 0;
            if(chah - a >= 40)
            {	
            	v = -a - 40;
            	
            }
            else if(chah - a < 40)
            {
            	v = -a - (chah-a);
            }	
            
            var t = v+"px";
        	$("#jzlistdiv").css("margin-top",t);
            
		});
		
		$("#jzjl_down1").click(function(){
			
			var h = $("#jzlistdiv").css("margin-top");
			
            var a = h.substring(0,h.indexOf("px"));
            
            if(Math.abs(a)!=0)
            {	
            	var v = 0;
            	if(a>-40)
            	{
            		v = 0;
            	}
            	else
            	{
            		v = parseInt(a)+40;
            	}	
            	
            	var t = v+"px";
            	$("#jzlistdiv").css("margin-top",t);
            }
            else if(parseInt(a)>=0)
            {
            	var t = 0+"px";
            	$("#jzlistdiv").css("margin-top",t);
            }
           
		});
	}
	
	var gd_height = $('#jzlistdiv_gd').height();
	
	
	var current_sn_int = current_sn.substring(6,current_sn.length);
	
	if((gd_height/2)>=(current_sn_int*67))
	{
		//console.log("正好合适！");
	}
	else
	{
		var t = "";
		
		var waih = $("#jzlistdiv_gd").innerHeight();
        var neih = $("#jzlistdiv").innerHeight();
        
        if(((current_sn_int*67)-(gd_height/2))>=(neih-waih))
        {
        	t = -(neih-waih)+"px";
        }
        else
        {
        	t = -((current_sn_int*67)-(gd_height/2))+"px";
        }	
        
        $("#jzlistdiv").css("margin-top",t);
		
		//console.log("需要滚动！");
	}	
	
};