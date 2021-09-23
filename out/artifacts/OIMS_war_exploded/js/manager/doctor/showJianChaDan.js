/**
 * 显示检查单列表信息
 * @author 宋仁非
 * @param md
 */

var jcd_click_dq = "";

function showStudies(md) 
{
	
	
	$("body").attr("style","overflow: hidden;");
	
	$("html").attr("style","overflow: hidden;");
	
	
	$(".displayTag").text("");
	var stt = $("<div />").addClass("studyTitleTag")
						.height(30).html("&nbsp;")
						.appendTo(dws.displayTag);
	
	var sst = $("<div />").addClass("studyShowTag").appendTo(dws.displayTag);
	
	var sltt = $("<div />").addClass("studyListTitleTag").height(28)
			               //.text("检查单")
						   .append(
								   $("<div />").append(
										               $("<span />").append(language_doctor.JianChaDan)//"检查单"
										               )
										       .attr("style","float:left;width:20%;")
								   )
			               .addClass("mcTitleTag")
			               .attr("id","jcd_title")
			               .attr("style","text-align: left;padding-left: 10px;overflow: hidden;")
			               .appendTo(dws.displayTag);
	
	var slt = $("<div />").addClass("studyListTag")
	                      .height(100).appendTo(dws.displayTag);
	
	var h = dws.displayTag.height() 
	        - $(".studyTitleTag").outerHeight()
			- $(".studyListTitleTag").outerHeight()
			- $(".studyListTag").outerHeight();
	
	var v = null;
	if(!debug)
	{
		//获取该次就诊视力数据
		v = getJSONData(getShiLiUrl,{id:md.id,tag:Math.random}).obj;
	}
	else
	{
		v = versionTestObj;
	}
	
	var y = null;
	if(!debug)
	{
		//cs("获取眼压数据");
		//cs(md.id);
		//获取该次就诊眼压数据
		y = getJSONData(getYanYaUrl,{id:md.id,tag:Math.random}).obj;
	}
	else
	{
		y = yanyaTestObj;
	}	
	
	var g = null;
	if(!debug)
	{
		//cs("获取验光数据");
		//cs(md.id);
		//获取该次就诊眼压数据
		g = getJSONData(getYanGuangUrl,{id:md.id,tag:Math.random}).obj;
		//cs(g);
	}
	else
	{
		g = yanyaTestObj;
	}
	
	$("<span />").text(language_doctor.ShiLi)//"视力"
				 .appendTo($("<div />")
						 			  .css("margin","4px 2px 0 4px")
						 			  .addClass("tab_show")
						 			  .appendTo(stt)
						   )
			     .click(function(){
			    	 
		$(".right .displayTag .studyTitleTag .tab_show")
		 .removeClass("tab_show").addClass("tab_hide");
		
		$(this).parent().removeClass().addClass("tab_show");
		
		showShili(v);
	});
	
	$("<span />").text(language_doctor.YanYa)//"眼压"
				 .appendTo($("<div />")
						              .css("margin","4px 2px 0")
			                          .addClass("tab_hide")
			                          .appendTo(stt)
			               )
			     .click(function(){
			    	 
		$(".right .displayTag .studyTitleTag .tab_show")
		 .removeClass("tab_show").addClass("tab_hide");
		
		$(this).parent().removeClass("tab_hide").addClass("tab_show");
		
		//cs(y);
		showYanya(y);
		
	});
	
	$("<span />").text(language_doctor.YanGuang)//"验光"language_doctor.YanGuang
	 			 .appendTo($("<div />")
			              			  .css("margin","4px 2px 0")
			              			  .addClass("tab_hide")
			              			  .appendTo(stt)
                          )
                 .click(function(){
   	 
			                       $(".right .displayTag .studyTitleTag .tab_show")
			                       .removeClass("tab_show").addClass("tab_hide");

			                       $(this).parent().removeClass("tab_hide").addClass("tab_show");

			                       //cs(g);
			                       showYanguang(g);

                 });
	
	//默认显示视力
	showShili(v);
	sst.height(h);
	
	var slo;
	if (!debug) 
	{
		slo = getJSONData(studyListUrl, {
			id : md.id,
			tag : Math.random()
		}).obj;
		
		//cs("检查单数据");
		//cs(slo);
		
	} 
	else 
	{
		slo = studyListTestObj;
	}
	
	var temp_div = $("<div />").attr("class","checklist").appendTo(slt);
	
	//显示检查单列表
	var ul = $("<ul />").appendTo(temp_div);
	
	$.each(slo, function(i, d) {
		
		var li = $("<li />").attr("style","cursor:pointer;").text(d.title).appendTo(ul);
		
		var so = getStudyState(d.biaoshi);
		
		li.attr("title", so.msg);
		
		$("<span />").addClass(so.className).appendTo(li);
		
		
		li.click(function() {
			
			//清空检查单图片显示区域
			sst.text("");
			showjcdTime_baogao(d,md);
			//显示该检查单信息
			showStudy(d, md,sst, li);
			
			//setTimeout(showStudy(d, md,sst, li),500) ;
			
			jcd_click_dq = $(this);
			
		});
	});
	
	
}

/**
 * 获取状态
 * 宋仁非
 * @param state
 * @returns
 */
function getStudyState(state) 
{
	var cn;
	var msg;
	switch (state) {
	case 50:
		cn = "dcheck";
		msg = language_doctor.DaiJianCha;//"待检查"
		break;
	case 51:
		cn = "ycheck";
		msg = language_doctor.YiJianCha;//"已检查"
		break;
	case 52:
		cn = "dSupplements";
		msg = language_doctor.DaiBuChuan;//"待补传"
		break;
	case 53:
		cn = "live";
		msg = language_doctor.YiGuoHao;//"已过号"
		break;
	case 54:
		cn = "start";
		msg = language_doctor.JianChaZhong;//"检查中"
		break;
	
	case 55:
		cn = "din";
		msg = language_doctor.DaiShangChuan;//"待上传"
		break;
	case 56:
		cn = "end";
		msg = language_doctor.YiWanCheng;//"已完成"
		break;
		
	case 57:
		cn = "dlinkno";
		msg = language_doctor.DaiShangChuanLinkError;//"待上传连接异常"
		break;
		
	case 58:
		cn = "fileno";
		msg = language_doctor.DaiShangChuanFileError;//"待上传未找到文件"
		break;
		
	case 59:
		cn = "slinkno";
		msg = language_doctor.ShangChuanZhongLinkError;//"上传中连接异常"
		break;
		
	case 60:
		cn = "lose";
		msg = language_doctor.ShangChuanZhongFileError;//"上传中文件丢失"
		break;
		
	case 61:
		cn = "derror";
		msg = language_doctor.ShangChuanZhongWenCuoWu;//"上传中文件错误"
		break;
	
	default:
		cn = "wrong";
		msg = language_doctor.Error;//"出错了"
	}
	return {
		className : cn,
		msg : msg
	};
}

/**
 * 显示视力
 * @param id
 * 宋仁非
 */
function showShili(d)
{
	//清空检查单图片显示区域
	$(".studyShowTag").text("");
	
	var t=$("<table />").appendTo(".studyShowTag");
	var tr = $("<tr />").appendTo(t);
	$("<th />").text(language_doctor.YanBie).appendTo(tr);//"眼别"
	$("<th />").text(language_doctor.JiaoZhengShiLi).appendTo(tr);//"矫正视力"
	$("<th />").text(language_doctor.JinShiLi).appendTo(tr);//"近视力"
	$("<th />").text(language_doctor.LuoYanShiLi).appendTo(tr);//"裸眼视力"
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.LeftEye).appendTo(tr);//"左眼"
	$("<td />").text(d.jz_l).appendTo(tr);
	$("<td />").text(d.j_l).appendTo(tr);
	$("<td />").text(d.l_l).appendTo(tr);
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.RightEye).appendTo(tr);//"右眼"
	$("<td />").text(d.jz_r).appendTo(tr);
	$("<td />").text(d.j_r).appendTo(tr);
	$("<td />").text(d.l_r).appendTo(tr);
}

//显示眼压  宋仁非
function showYanya(d)
{
	//console.log(d);
	//console.log(d.length);
	//清空检查单图片显示区域
	$(".studyShowTag").text("");
	$("<div />").attr({"id":"yanya_div"}).appendTo(".studyShowTag");
	
	var sw = $(".studyShowTag").innerWidth();
	var sh = $(".studyShowTag").innerHeight();
	
	var l_data = [];
	var r_data = [];
	
	var date = [];
	
	for(var i = 0;i<d.length;i++)
	{
		//console.log(d[i].left);
		//console.log(d[i].right);
		
		l_data.push(d[i].left==null?0:d[i].left);
		r_data.push(d[i].right==null?0:d[i].right);
		
		var h = d[i].ycsj.hours;
		var m = d[i].ycsj.minutes;
		var h_str = "";
		var m_str = "";
		
		if(h<10)
		{
			  h_str = "0"+h;
		}
		else
		{
			  h_str = h;
		}
		
		if(m<10)
		{
			m_str = "0"+m;
		}
		else
		{
			m_str = m;
		}	
		  
		//console.log("检查时间");
		//console.log(h_str);
		
		date.push(h_str+":"+m_str);
	}	
	
	//console.log("结果");
	//console.log(l_data);
	//console.log(r_data);
	//console.log(date);
	
	//console.log("宽："+sw);
	//console.log("高："+sh);
	
	createClick(sw,sh,l_data,r_data,date);
	
}

function createClick(sw,sh,l_data,r_data,date)
{
	
	if(date.length>8)
	{
		sw=sw+(date.length-8)*40;
	}	
	
	var option = 
				{
					chartContent:{width:sw-20,height:sh-20},
					divContent:{id:"yanya_div"},
					xAxisContent:{name:language_doctor.Jcsj,unit:""}, //检查时间
					yAxisContent:{name:language_doctor.YanYa+"(mmHg)",unit:""},//眼压
					arrayContent:[{name:language_doctor.LeftEye/*"左眼"*/,data:l_data},{name:language_doctor.RightEye/*"右眼"*/,data:r_data}],
					categoriesNum:date
				};
	creteChart(option);
}
function creteChart(options)
{
    var chart = new Highcharts.Chart({
    	
        chart: {
            	renderTo: options.divContent.id,
            	type: 'line',
            	width: options.chartContent.width,
            	height:options.chartContent.height,
            	style: 
            		 {
            			margin: '0 auto'
            		 }
               },
               
        title: {
            	text: language_doctor.YanYaToLine/*'眼压曲线'*/
               },
               
     subtitle: {
            	text: ''
               },
               
        xAxis: {
				categories: options.categoriesNum,
					 title: {
						 	 text: options.xAxisContent.name
					        },
			        labels: {
			                 formatter: function() 
			                            {
			                	 			return this.value + options.xAxisContent.unit;
			                            }
			        		}
        }, 
        	   
        yAxis: {
            	title: {
            			text: options.yAxisContent.name
            		   },
               labels: {
		                formatter: function() 
		                		   {
		                    			return this.value + options.yAxisContent.unit;
		                		   }
               		   },
            lineWidth: 2,
			      min: 0
        },
        
        legend: {
            enabled: true
        },
        
        tooltip: {
			enabled: true,
            formatter: function() 
            		   {
                			return this.x +options.xAxisContent.unit+"<br/>"+
                			this.series.name + ":"+ this.y +options.yAxisContent.unit + "<br/>";
            		   }
        },
        
		plotOptions: {
						line: {
								dataLabels: {
												enabled: true
											},
								enableMouseTracking: true
							  }
		},
		
        series: options.arrayContent
        
    });
}


//显示验光  宋仁非
function showYanguang(d)
{
	//清空检查单图片显示区域
	$(".studyShowTag").text("");
	
	
	
	var t=$("<table />").appendTo(".studyShowTag");
	$("<caption />").append(language_doctor.KeGuanQuGuangDuValue/*"客观屈光度参考值"*/).appendTo(t);
	var tr = $("<tr />").appendTo(t);
	$("<th />").text("").appendTo(tr);
	$("<th />").text(language_doctor.QiuJingDu/*"球镜度"*/).appendTo(tr);
	$("<th />").text(language_doctor.SanGuangDu/*"散光度"*/).appendTo(tr);
	$("<th />").text(language_doctor.ZhouWei/*"轴位"*/).appendTo(tr);
	
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.LeftEye).appendTo(tr);//"左眼"
	$("<td />").attr("id","refLS").appendTo(tr);
	$("<td />").attr("id","refLC").appendTo(tr);
	$("<td />").attr("id","refLA").appendTo(tr);
	
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.RightEye).appendTo(tr);//"右眼"
	$("<td />").attr("id","refRS").appendTo(tr);
	$("<td />").attr("id","refRC").appendTo(tr);
	$("<td />").attr("id","refRA").appendTo(tr);
	
	
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.TongJu/*"瞳距"*/).appendTo(tr);//"瞳距"
	$("<td />").attr({"id":"refPd","colspan":"3"}).appendTo(tr);
	
	
	
	var t=$("<table />").appendTo(".studyShowTag");
	$("<caption />").append(language_doctor.JiaoMoQuLv/*"角膜曲率参考值"*/).appendTo(t);
	var tr = $("<tr />").appendTo(t);
	$("<th />").text(language_doctor.LeftEye/*"左眼"*/).appendTo(tr);//"眼别"
	$("<th />").text(language_doctor.JiaoMoQuGuangDu/*"角膜曲光度"*/).appendTo(tr);
	$("<th />").text(language_doctor.QuLvBanJing/*"曲率半径"*/).appendTo(tr);
	$("<th />").text(language_doctor.FangXiang/*"方向"*/).appendTo(tr);
	
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.ShuiPingFangXiang/*"水平方向"*/).appendTo(tr);//"左眼"
	$("<td />").attr("id","krtLHd").appendTo(tr);
	$("<td />").attr("id","krtLHmm").appendTo(tr);
	$("<td />").attr("id","krtLHa").appendTo(tr);
	
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.ChuiZhiFangXiang/*"垂直方向"*/).appendTo(tr);//"右眼"
	$("<td />").attr("id","krtLVd").appendTo(tr);
	$("<td />").attr("id","krtLVmm").appendTo(tr);
	$("<td />").attr("id","krtLVa").appendTo(tr);
	
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.PingJunZhi/*"平均值"*/).appendTo(tr);//"右眼"
	$("<td />").attr("id","krtLAved").appendTo(tr);
	$("<td />").attr("id","krtLAvemm").appendTo(tr);
	$("<td />").attr("id","16od").appendTo(tr);
	
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.JiaoMoSanGuangDu/*"角膜散光度"*/).appendTo(tr);//"右眼"
	$("<td />").attr("id","14od").appendTo(tr);
	$("<td />").attr("id","krtLCylmm").appendTo(tr);
	$("<td />").attr("id","krtLCyla").appendTo(tr);
	
	var tr = $("<tr />").appendTo(t);
	$("<th />").text(language_doctor.RightEye/*"右眼"*/).appendTo(tr);//"眼别"
	$("<th />").text(language_doctor.JiaoMoQuGuangDu/*"角膜曲光度"*/).appendTo(tr);
	$("<th />").text(language_doctor.QuLvBanJing/*"曲率半径"*/).appendTo(tr);
	$("<th />").text(language_doctor.FangXiang/*"方向"*/).appendTo(tr);
	
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.ShuiPingFangXiang/*"水平方向"*/).appendTo(tr);//"左眼"
	$("<td />").attr("id","krtRHd").appendTo(tr);
	$("<td />").attr("id","krtRHmm").appendTo(tr);
	$("<td />").attr("id","krtRHa").appendTo(tr);
	
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.ChuiZhiFangXiang/*"垂直方向"*/).appendTo(tr);//"右眼"
	$("<td />").attr("id","krtRVd").appendTo(tr);
	$("<td />").attr("id","krtRVmm").appendTo(tr);
	$("<td />").attr("id","krtRVa").appendTo(tr);
	
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.PingJunZhi/*"平均值"*/).appendTo(tr);//"右眼"
	$("<td />").attr("id","krtRAved").appendTo(tr);
	$("<td />").attr("id","krtRAvemm").appendTo(tr);
	$("<td />").attr("id","16od").appendTo(tr);
	
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.JiaoMoSanGuangDu/*"角膜散光度"*/).appendTo(tr);//"右眼"
	$("<td />").attr("id","14od").appendTo(tr);
	$("<td />").attr("id","krtRCylmm").appendTo(tr);
	$("<td />").attr("id","krtRCyla").appendTo(tr);
	
	/*$.each( d, function(i, n){
		
		 //cs(n);
		  
	});*/
	
	$("#refLS").text(d.refLS);
	$("#refLC").text(d.refLC);
	$("#refLA").text(d.refLA);
	
	$("#refRS").text(d.refRS);
	$("#refRC").text(d.refRC);
	$("#refRA").text(d.refRA);
	
	$("#refPd").text(d.refPd);
	
	$("#krtLHd").text(d.krtLHd);
	$("#krtLHmm").text(d.krtLHmm);
	$("#krtLHa").text(d.krtLHa);
	
	$("#krtLVd").text(d.krtLVd);
	$("#krtLVmm").text(d.krtLVmm);
	$("#krtLVa").text(d.krtLVa);
	
	$("#krtLAved").text(d.krtLAved);
	$("#krtLAvemm").text(d.krtLAvemm);
	
	$("#krtLCylmm").text(d.krtLCylmm);
	$("#krtLCyla").text(d.krtLCyla);
	
	$("#krtRHd").text(d.krtRHd);
	$("#krtRHmm").text(d.krtRHmm);
	$("#krtRHa").text(d.krtRHa);
	
	$("#krtRVd").text(d.krtRVd);
	$("#krtRVmm").text(d.krtRVmm);
	$("#krtRVa").text(d.krtRVa);
	
	$("#krtRAved").text(d.krtRAved);
	$("#krtRAvemm").text(d.krtRAvemm);
	
	$("#krtRCylmm").text(d.krtRCylmm);
	$("#krtRCyla").text(d.krtRCyla);
	
}


/**
 * 显示检查单详细信息
 * 宋仁非
 * @param s 检查单信息
 * @param li
 */
function showStudy(s, md,div, li) 
{
	
	var study;
	if (!debug) 
	{
		//获取检查单信息 （检查时间、图像列表）
		study = getJSONData(getStudyUrl, {
			id : s.id,
			tag : Math.random()
		}).obj;
		
		//cs(study.length);
	} 
	else 
	{
		study = studyTestObj;
	}
	
	//页签样式切换
	$(".right .displayTag .studyTitleTag .tab_show").removeClass("tab_show")
	.addClass("tab_hide");
	
	//如果“双屏显示”按钮存在则删除
	if($(".studyTitleTag .btn").length>0)
	{
		$(".studyTitleTag .btn").remove();
	}	
	
	//如果显示检查单的页签存在则删除
	if($(".studyTitleTag .study_tab").length>0)
	{
		$(".studyTitleTag .study_tab").remove();
	}
		
	//添加该检查单名称的页签
	$("<span />").text(s.title).appendTo($("<div />").css("margin","4px 2px 0")
			     .addClass("tab_show").addClass("study_tab").appendTo(".studyTitleTag"))
			     .click(function(){
						
			    	 $(".right .displayTag .studyTitleTag .tab_show")
			    	 	.removeClass("tab_show").addClass("tab_hide");
				
			    	 $(this).parent().removeClass("tab_hide").addClass("tab_show");
				
			    	 div.text("");
			    	 showjcdTime_baogao(s,md);
			    	 showStudy(s, md,div, li);
			    	 
			     });
		
	//添加双屏显示按钮	
	var btn_div = $("<div />").attr({"class":"btn","style":"float:right;margin: 3px 4px 3px 0px;"})
								  .appendTo(".studyTitleTag");
	$("<a />").attr({"href":"#","class":"four noline"})
				  .click(function(){fenping(s.id,md.hzid);})
				  .append($("<span />").attr({"class":"screen","style":"margin-top:3px;"}))
				  .append(language_doctor.ShuangPingXianShi).appendTo(btn_div);//"双屏显示"
	
	if($(".oimsslide-gallery").length>0)
	{
		$(".oimsslide-gallery").remove();
	}	
	
	//拼接图像显示区域的图片
	var slidediv = $("<div />").attr("class","oimsslide-gallery");
	
	slidediv.appendTo(div);
	
	//先显示8张图片
	forShow();
	
	//鼠标滚轮事件 触发动态加载剩余图片
	div.scroll( function() { 
		
		if(div.scrollTop()>=slidediv.height()-div.height())
		{
			forShow();
		}	
		
	});
	
	//加载图片
	function forShow()
	{
		if(study.length>0)
		{	
			var m = 0;
			if(study.length>=8){m=8;}else{m=study.length;}
			for(var i = 0; i<m;i++)
			{
				var d = study.shift();
				
				var div = $("<div />").attr({"style":"width:195px; height:146px; float:left;text-align:center ;vertical-align: middle; "})
									  .appendTo(slidediv);
				
				var t = $("<a />").appendTo(div);
				
				$("<div />").attr("class","oimsslide-caption")
				            .text("").appendTo(div);
				showThumb(d,i,t);
			}
		}
	}
}

//查看报告和检查单检查时间    宋仁非
function showjcdTime_baogao(s,md)
{
	//console.dir(s);
	//cs(s);
	//cs(md);
	
	var jcd_time_bg_show = $("#jcd_time_bg_show");
	if(jcd_time_bg_show.length>0)
	{
		jcd_time_bg_show.remove();
	}	
	
	var startTime = "";
	var endTime = "";
	
	var gg = "";
	
	if(s.startTime!="" && s.startTime!=null)
	{
		startTime = s.startTime;
		gg = "--";
	}
	
	if(s.endTime!="" && s.endTime!=null)
	{
		endTime = s.endTime;
		gg = "--";
	}	
	
	var baogao_text = "";
	
	var url_findBaogaoByBaogao="/publish/baogao/findBaogaoByBaogao.htm";//根据报告对象查询报告
	var data_obj_findBaogaoByBaogao=getJSONData(url_findBaogaoByBaogao,{jcdId:s.id,tag:Math.random()},"post").obj;
	if(data_obj_findBaogaoByBaogao!=null)//该检查不存在报告信息
	{
		baogao_text = language_doctor.BaoGao;      //"报告"
	}
	
	
//	var url_findBaogaoMobansByBaogaoMoban="/publish/baogaomoban/findBaogaoMobansByBaogaoMoban.htm";//根据报告模板对象查询报告模板
//	var data_obj_findBaogaoMobansByBaogaoMoban=
//		getJSONData(url_findBaogaoMobansByBaogaoMoban,{bumenId:s.kdksid,
//			                                           jcxmIds:s.jcxmids,
//			                                           tag:Math.random()},"post").obj;//报告模板对象
//	var baogaoMoban_jcd=null;
//	if(data_obj_findBaogaoMobansByBaogaoMoban!=null)
//	{
//	 	 baogaoMoban_jcd=data_obj_findBaogaoMobansByBaogaoMoban[data_obj_findBaogaoMobansByBaogaoMoban.length-1];
//	}
//	if(baogaoMoban_jcd!=null)
//	{
//		 baogao_text = language_doctor.BaoGao;      //"报告"
//	}
	
	
	
	var time_bg = $("<div />").attr({"style":"float:right; width:70%;","id":"jcd_time_bg_show"});
	$("<span />").append(startTime+gg+endTime).appendTo(time_bg);
	//<span class="report"></span>
	if(baogao_text!="")
	{	
		var btn_div = $("<div />").attr("class","btn")
		                          .attr("style","margin-top: 2px;margin-right: 5px;")
		                          .click(function(){
						            	 
						            	 showReport(s.id,s.jcxmids,s.hzid,s.kdksid);
						            	 
						             });
		
		var btn_a = $("<a />").attr("href","#").appendTo(btn_div);
		
		$("<span />").attr("class","report").appendTo(btn_a);
		
		btn_a.append(baogao_text);
		
		/*var report_btn = $("<span />").append("    ")
						              .append(baogao_text)
						              .attr("style","color:blue;cursor:pointer;")
						              .appendTo(btn_div)
						              .click(function(){
						            	 
						            	 showReport(s.id,s.jcxmids,s.hzid,s.kdksid);
						             });*/
	btn_div.appendTo(time_bg);
	
	}
	$("#jcd_title").append(time_bg);
}



/**
 * 显示报告
 * 宋仁非
 * @param data
 */
function showReport(jcdId,jcxmId,huanzheId,bumenId)
{
	   var elementId="body_baogao";
	   var url_findBaogaoMobansByBaogaoMoban="/publish/baogaomoban/findBaogaoMobansByBaogaoMoban.htm";//根据报告模板对象查询报告模板
	   var data_obj_findBaogaoMobansByBaogaoMoban=getJSONData(url_findBaogaoMobansByBaogaoMoban,{bumenId:bumenId,jcxmIds:jcxmId,tag:Math.random()},"post").obj;//报告模板对象
	   var baogaoMoban_jcd=null;
	   if(data_obj_findBaogaoMobansByBaogaoMoban!=null)
	   {
	 	 baogaoMoban_jcd=data_obj_findBaogaoMobansByBaogaoMoban[data_obj_findBaogaoMobansByBaogaoMoban.length-1];
	   }
	   if(baogaoMoban_jcd==null)
	   {
			$.oimsAlert(language_doctor.JcdBaoGaoIsNotExist);//"该检查单不存在报告信息"
			return;
	    }
	    var printWindow = window.open("");
	    html_baogao="";
	    html_baogao+="<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'>";
	    html_baogao+="<html>";
	    html_baogao+="<head>";
	    html_baogao+="<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>";
	    html_baogao+="<title>"+language_doctor.ShowBaoGao+"</title>";//报告查看
	    html_baogao+="<script language='javascript'> var contextPath='"+contextPath+"';</script>";
	    html_baogao+="<link rel='stylesheet' type='text/css' href='"+contextPath+"/css/main.css' rel='stylesheet' type='text/css'>";
	    html_baogao+="<link rel='stylesheet' type='text/css' href='"+contextPath+"/style/green/css/green.css' rel='stylesheet' type='text/css'>";
	    html_baogao+="<link rel='stylesheet' type='text/css' href='"+contextPath+"/css/icon.css' rel='stylesheet' type='text/css'>";
	    html_baogao+="<link rel='stylesheet' type='text/css' href='"+contextPath+"/style/green/css/openWin.css' rel='stylesheet' type='text/css'>";
	    html_baogao+="<script src='"+contextPath+"/js/jquery.min.js'></script>";
	    html_baogao+="<script src='"+contextPath+"/js/common.js'></script>";
	    html_baogao+="<script src='"+contextPath+"/js/jquery.oimsDialog.js'></script>";
	    html_baogao+="<script src='"+contextPath+"/js/manager/baogao/language.config.js'></script>";
	    html_baogao+="<script src='"+contextPath+"/js/manager/baogao/initialBaoGao.js'></script>";
	    html_baogao+="<script src='"+contextPath+"/js/manager/baogao/baoGaoSee.js'></script>";
	    html_baogao+="<script type='text/javascript'>";
	    html_baogao+="var bumenId="+bumenId+",jcxmId="+jcxmId+",jcdId="+jcdId+",huanzheId="+huanzheId+",elementId='"+elementId+"';";
	    html_baogao+="</script>";
	    html_baogao+="</head>";
	    html_baogao+="<body id='body_baogao'>";
	    html_baogao+="</body>";
	    html_baogao+="</html>";
	    printWindow.document.write(html_baogao);
	    printWindow.document.close();
	
}



/**
 * 分屏
 */
function fenping(jcdid,hzid)
{
   importJS("/js/flashShow.js");
   studyView(hzid);
}

//**************************************************************************

/**
 * 显示缩略图
 * 宋仁非
 * @param d  图片对象
 * @param t  a标签
 */
function showThumb(d,i,t) 
{
	//获取图像后缀名
	var ext = d.path.split(".")[d.path.split(".").length - 1];
	
	if (ext == "jpg" || ext == "jpeg" || ext == "png" || ext == "gif"
		||ext == "JPG"|| ext == "JPEG" || ext == "PNG" || ext == "GIF") 
	{
		
		var image = $("<img />").attr("src", contextPath+"/"+d.path)
								.appendTo(t);
								
		//获取大图地址
		var path = yuantuQuanxian() ? d.path.replace("\\thumb", "") : d.path;
		
		//给A标签添加方法 class href
		t.attr("onclick","return hs.expand(this)")
		 .attr("class","oimsslide")
		 .attr("href",contextPath+"/"+path);
		
		
		//图片等比缩放
		suofang_tupian(image,d);
		
	} 
	else 
	{
		//查看视频文件
		showFlv(d.path,i,t);
	}
}

//等比缩放图片     宋仁非
function suofang_tupian(image,d)
{
	//cs("缩放图片"+image.attr("src"));
	
	var width = GetImageWidth(image.attr("src"));
	var height = GetImageHeight(image.attr("src"));
	
	var result = imageZoom(d.w,d.h,195,146);
	
	image.attr("width",result.width).attr("height",result.height);
	
	if(image.attr("height")=="0"||image.attr("width")=="0")
	{
		image.attr("width",195).attr("height",146);
		//jcd_click_dq.click();
	}
	
	
	
		
	/*var src = image.attr("src");
	
	var width = "";
	var height ="";
	var OriginImage=new Image();
	alert(src);
	if(OriginImage.src!=src)OriginImage.src=src;
	  width = OriginImage.width;
	  
	  alert(width);*/
	
	
}

 

/**
 * 显示视频
 * 
 * @param path
 */
function showFlv(path,i,t) 
{
	importCSS("/flowplayer/style.css");
	importJS("/js/swfobject.js");
	importJS("/flowplayer/flowplayer-3.2.11.min.js");
	
	 t.attr("id", "player"+i)
	  .attr("class","oimsslide")
	  .attr("href", contextPath +"\\"+path);
	
    //flowplayer("player"+i, contextPath+ "/flowplayer/flowplayer-3.2.5.swf?random0="+Math.random()+"&random1="+Math.random());
    flowplayer("player"+i, contextPath+ "/flowplayer/flowplayer-3.2.15.swf");
}

/**
 * 原图查看权限
 * 
 * @returns {Boolean}
 */
function yuantuQuanxian() 
{
	return true;
}

//图片等比缩放处理程序    宋仁非
/*****************************************/
var OriginImage=new Image();
function GetImageWidth(oImage)
{
	  if(OriginImage.src!=oImage)OriginImage.src=oImage;
	  return OriginImage.width;
}

function GetImageHeight(oImage)
{
  if(OriginImage.src!=oImage)OriginImage.src=oImage;
  return OriginImage.height;
}

var scale={  
        width:null,  
        height:null  
};  

function imageZoom(width,height,outWidth,outHeight)
{  
    width=parseInt(width);  
    height=parseInt(height);  
    outWidth=parseInt(outWidth);  
    outHeight=parseInt(outHeight);  

    var h=width;  
    var w=height;  
    var r=height/width;  
    var rs=outHeight/outWidth;  
    if((width<=outWidth)&&(height<=outHeight)){  
        w=width;  
        h=height;  
    }  
    if((width<=outWidth)&&(height>outHeight)){  
        w=parseInt(outHeight/r);  
        h=outHeight;  
    }  
    if((width>outWidth)&&(height<=outHeight)){  
        w=outWidth;  
        h=parseInt(outWidth*r);  
    }  
    if((width>outWidth)&&(height>outHeight)){  
        if(r<rs){  
            w=outWidth;  
            h=parseInt(outWidth*r);  
        }  
        if(r>rs){  
            h=outHeight;  
            w=parseInt(outHeight/r);  
        }  
        if(r==rs){  
            w=outWidth;  
            h=outHeight;  
        }  
    }  
    scale.width=w;  
    scale.height=h;  
    return scale;  
}
/*****************************************/
