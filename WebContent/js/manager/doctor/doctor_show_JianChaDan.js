/*
 * 显示检查单列表信息
 * @author 宋仁非
 * @param md
 */

var jcd_click_dq = "";

function showStudies(md) 
{
	
	$("body").attr("style","overflow: hidden;");
	
	$("html").attr("style","overflow: hidden;");
	
	//清空检查单显示区域（接诊界面右侧）
	$(".displayTag").text("");
	
	//视力、眼压、验光 ……标题页签div
	var stt = $("<div />").addClass("studyTitleTag").height(30).html("&nbsp;")
						  .appendTo(dws.displayTag);
	
	//视力、眼压、验光 、检查单、化验单……显示区域div
	var sst = $("<div />").addClass("studyShowTag")
						  .appendTo(dws.displayTag);
	
	//检查单、化验单标题页签div
	var sltt = $("<div />").addClass("studyListTitleTag").height(28)
			               //.text("检查单")
						   .append($("<div />").addClass("tab_show").append($("<span />").append(language_doctor.JianChaDan)/*检查单*/)
								               .attr("id","jcd_tab")
								   			   .click(function(){
								   				show_jianchadan_list_s(md,"jcd_tab");
								   			   })
								   )
							//.text("化验单")
						   .append($("<div />").addClass("tab_hide").append($("<span />").append("化验单")/*化验单*/)
								               .attr("id","hyd_tab")
								               .click(function(){
								   				show_huayandan_list_s(md,"hyd_tab");   
								   			   })
								   )
			               .addClass("mcTitleTag")
			               .attr("id","jcd_title")
			               .addClass("emr_jcdtitle")
			               //.attr("style","text-align: left;padding-left: 2.5px;overflow: hidden;")
			               .appendTo(dws.displayTag);
	
	//检查单、化验单列表显示区域div
	var slt = $("<div />").addClass("studyListTag").height(100).appendTo(dws.displayTag);
	
	var h = dws.displayTag.height() 
	        - $(".studyTitleTag").outerHeight()
			- $(".studyListTitleTag").outerHeight()
			- $(".studyListTag").outerHeight();
	
	sst.height(h);
	
	//视力页签
	$("<span />").text(language_doctor.ShiLi)//"视力"
				 .appendTo($("<div />").addClass("emr_jcdtab00")/*.css("margin","4px 2px 0 4px")*/.addClass("tab_show").appendTo(stt))
			     .click(function(){
		                          $(".right .displayTag .studyTitleTag .tab_show")
		                          .removeClass("tab_show").addClass("tab_hide");
		                          $(this).parent().removeClass("tab_hide").addClass("tab_show");
		                          showShili(md);
	                   });
	
	//眼压页签
	$("<span />").text(language_doctor.YanYa)//"眼压"
				 .appendTo($("<div />").addClass("emr_jcdtab01")/*.css("margin","4px 2px 0")*/.addClass("tab_hide").appendTo(stt))
			     .click(function(){ 
		                          $(".right .displayTag .studyTitleTag .tab_show")
		                          .removeClass("tab_show").addClass("tab_hide");
		                          $(this).parent().removeClass("tab_hide").addClass("tab_show");
		                          showYanya(md);
	                   });
	
	//验光页签
	$("<span />").text(language_doctor.YanGuang)//"验光"language_doctor.YanGuang
	 			 .appendTo($("<div />").addClass("emr_jcdtab01")/*.css("margin","4px 2px 0")*/.addClass("tab_hide").appendTo(stt))
                 .click(function(){
   	                              $(".right .displayTag .studyTitleTag .tab_show")
			                       .removeClass("tab_show").addClass("tab_hide");
			                       $(this).parent().removeClass("tab_hide").addClass("tab_show");
			                       showYanguang(md);
                       });
	
	//默认显示视力
	showShili(md);
	
	//默认显示检查单列表
	show_jianchadan_list_s(md);
	
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
function showShili(md)
{
	
	var d = null;
	
	//获取该次就诊视力数据
	d = getJSONData(getShiLiUrl,{id:md.id,tag:Math.random}).obj;
	
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
function showYanya(md)
{
	
	var d = null;
	
	//获取该次就诊眼压数据
	d = getJSONData(getYanYaUrl,{id:md.id,tag:Math.random}).obj;
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
		
		date.push(h_str+":"+m_str);
	}	
	
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
function showYanguang(md)
{
	
	var d = null;
	
	//获取该次就诊验光数据
	d = getJSONData(getYanGuangUrl,{id:md.id,tag:Math.random}).obj;
	
	
	
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
	$("<td />").text(language_doctor.ChuiZhiFangXiang/*"垂直方向"*/).appendTo(tr);//"左眼"
	$("<td />").attr("id","krtLVd").appendTo(tr);
	$("<td />").attr("id","krtLVmm").appendTo(tr);
	$("<td />").attr("id","krtLVa").appendTo(tr);
	
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.PingJunZhi/*"平均值"*/).appendTo(tr);//"左眼"
	$("<td />").attr("id","krtLAved").appendTo(tr);
	$("<td />").attr("id","krtLAvemm").appendTo(tr);
	$("<td />").attr("id","16od").appendTo(tr);
	
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.JiaoMoSanGuangDu/*"角膜散光度"*/).appendTo(tr);//"左眼"
	$("<td />").attr("id","14od").appendTo(tr);
	$("<td />").attr("id","krtLCylmm").appendTo(tr);
	$("<td />").attr("id","krtLCyla").appendTo(tr);
	
	var tr = $("<tr />").appendTo(t);
	$("<th />").text(language_doctor.RightEye/*"右眼"*/).appendTo(tr);//"眼别"
	$("<th />").text(language_doctor.JiaoMoQuGuangDu/*"角膜曲光度"*/).appendTo(tr);
	$("<th />").text(language_doctor.QuLvBanJing/*"曲率半径"*/).appendTo(tr);
	$("<th />").text(language_doctor.FangXiang/*"方向"*/).appendTo(tr);
	
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.ShuiPingFangXiang/*"水平方向"*/).appendTo(tr);//"右眼"
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

//显示检查单列表
function show_jianchadan_list_s(md,jcd)
{
	$(".right .displayTag .studyListTitleTag .tab_show")
	.removeClass("tab_show").addClass("tab_hide");
	$("#"+jcd).removeClass("tab_hide").addClass("tab_show");
	
	$(".studyListTag").text("");
	
	var slt = $(".studyListTag");
	var sst = $(".studyShowTag");
	
	var slo = null;
	
	slo = getJSONData(studyListUrl, {id : md.id,tag : Math.random()}).obj;
		
	
	var temp_div = $("<div />").attr("class","checklist").appendTo(slt);
	
	//显示检查单列表
	var ul = $("<ul />").appendTo(temp_div);
	
	$.each(slo, function(i, d) {
		//console.dir("slo长度"+slo.length);
		var jcxm_name="";
		var msg_name="";
		if(d.title.length>8){
			jcxm_name=d.title.substring(0,7);
			msg_name=d.title;
		}else{
			jcxm_name=d.title;
		}
		if(jcxm_name.substring(0,5)=="裂隙灯检查"){
			
			jcxm_name="裂隙灯检查";
		}
		
		//yulei 2013 12 20 修改,为了处理检查项目米名称过长--开始
		var li = $("<li />").addClass("emr_jcdlistpointer")/*.attr("style","cursor:pointer;")*/.text(jcxm_name).appendTo(ul);
		//原始
		//var li = $("<li />").addClass("emr_jcdlistpointer")/*.attr("style","cursor:pointer;")*/.text(d.title).appendTo(ul);
		//yulei 2013 12 20 修改,为了处理检查项目米名称过长--结束
		var so = getStudyState(d.biaoshi);
	
		li.attr("title", so.msg+"\n"+msg_name);
		
		$("<span />").addClass(so.className).appendTo(li);
		
		
		li.click(function() {
			//清空检查单图片显示区域
			sst.text("");
			//显示检查单检查时间和该检查单的报告
			showjcdTime_baogao(d,md);
			//显示该检查单信息
			showStudy(d, md,sst, li);
			jcd_click_dq = $(this);
		});
	});
}

//显示化验单列表
function show_huayandan_list_s(md,hyd)
{
	$(".right .displayTag .studyListTitleTag .tab_show")
	.removeClass("tab_show").addClass("tab_hide");
	$("#"+hyd).removeClass("tab_hide").addClass("tab_show");
	
	$(".studyListTag").text("");
	
	var slt = $(".studyListTag");
	var sst = $(".studyShowTag");
	
	var slo = null;
	
	slo = getJSONData(getHuaYanDanListUrl, {jzid : md.id,tag : Math.random()},"post").obj;
		
	var temp_div = $("<div />").attr("class","checklist").appendTo(slt);
	
	//显示化验单列表
	var ul = $("<ul />").appendTo(temp_div);
	
	$.each(slo, function(i, d) {
		
		var li = $("<li />").addClass("emr_jcdlistpointer")/*.attr("style","cursor:pointer;")*/.text(d.huayanitem).appendTo(ul);
		
		var so = getStudyState(56);
		
		li.attr("title", d.huayanitem);
		
		$("<span />").addClass(so.className).appendTo(li);
		
		
		li.click(function() {
			
			//清空检查单图片显示区域
			sst.text("");
			
			//显示该化验单信息
			show_HuaYanDan_Detail(d,md,sst,li);
			
		});
	});
}

function show_HuaYanDan_Detail(d,md,sst,li)
{
	sst.text("");
	
	//页签样式切换
	$(".right .displayTag .studyTitleTag .tab_show").removeClass("tab_show").addClass("tab_hide");
	
	//如果显示检查单的页签存在则删除
	if($(".studyTitleTag .study_tab").length>0)
	{
		$(".studyTitleTag .study_tab").remove();
	}
	
	//添加该检查单名称的页签
	$("<span />").text(d.huayanitem).appendTo($("<div />").addClass("emr_jcdtab01")/*.css("margin","4px 2px 0")*/
			                                         .addClass("tab_show")
			                                         .addClass("study_tab").appendTo(".studyTitleTag")
			                            )
			     .click(function(){
						
			    	 $(".right .displayTag .studyTitleTag .tab_show")
			    	 	.removeClass("tab_show").addClass("tab_hide");
				
			    	 $(this).parent().removeClass("tab_hide").addClass("tab_show");
				
			    	 sst.text("");
			    	 
			    	//显示该化验单信息
					show_HuaYanDan_Detail(d,md,sst,li);
			    	 
			     });
	
	
	
	//var div_container = $("<div />").css("height","95%").addClass("studyShowTag").appendTo(div);
	var table_data =  $("<table />").attr({cellspacing:"2",cellpadding:"0",border:"0",})
									.addClass("emr_huayantable")
	                                /*.css({
											"border-top":"1px solid #D2D2D2",
											"text-align":"center",
											"color":" #4F4F4F",
											"font-size":"14px",
											"font-size": "12px",
											"color": "#4F4F4F;"
			                            })*/.appendTo(sst);
	
	var tb_th=["代号","项目名称","结果","参考值","单位"];//设置表头显示
	for(var i=0,l=tb_th.length;i<l;i++)
	{
		$("<th />").addClass("emr_huayantableth")/*.css({
							"background": "none repeat scroll 0 0 #D2D2D2",
							"height": "22px",
							"line-height": "22px"
					   })*/
				   .text(tb_th[i])
				   .appendTo(table_data);
	}
	
	var td_css={
					"border-top": "1px solid #D2D2D2",
					"text-align": "center",
					"height": "25px",
				    "padding-left": "2px",
				    "padding-right": "3px",
				    "word-break": "break-all",
				    "min-width": "50px"
		       };
	
	var huayandan = null;
	
	//获取该化验单详细数据
	huayandan = getJSONData(getHuaYanDanDetailInfoUrl, {hyid : d.huayan_id,tag : Math.random()},"post").obj;
	
	//加载单元格中的数据
	for(var i = 0 ; i < huayandan.length ; i++)
	{
		var tr = $("<tr />").appendTo(table_data);
		$("<td />").addClass("emr_huayantabletd")/*css(td_css)*/.text(huayandan[i].code).appendTo(tr);
		$("<td />").addClass("emr_huayantabletd")/*.css(td_css)*/.text(huayandan[i].name).appendTo(tr);
		$("<td />").addClass("emr_huayantabletd")/*.css(td_css)*/.text(huayandan[i].value).appendTo(tr);
		$("<td />").addClass("emr_huayantabletd")/*.css(td_css)*/.text(huayandan[i].reference).appendTo(tr);
		$("<td />").addClass("emr_huayantabletd")/*.css(td_css)*/.text(huayandan[i].unit).appendTo(tr);
	}
}


/**
 * 显示检查单详细信息
 * 宋仁非
 * @param s 检查单信息
 * @param li
 * @param div = sst = $(".studyShowTag");  
 */
function showStudy(s, md,div, li) 
{
	
	var study;
	
	//获取检查单信息 （检查时间、图像列表）
	//console.dir(s.id+"@@");
	study = getJSONData(getStudyUrl, {id : s.id,tag : Math.random()}).obj;
	/*console.dir(getJSONData(getStudyUrl, {id : s.id,tag : Math.random()}));*/
	//console.dir(s);
	
	
	
	//页签样式切换
	$(".right .displayTag .studyTitleTag .tab_show").removeClass("tab_show").addClass("tab_hide");
	
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
	
	//添加该检查单名称的页签 2013.12.20 yulei 修改,页签检查项目名称过长
	var jcxm_name="";
	if(s.title.length>5){
		jcxm_name=s.title.substring(0,5);
	}else{
//		alert(s.title);
	//	s.title=s.title;
		jcxm_name=s.title;
	}	
	$("<span />").text(jcxm_name).appendTo($("<div />").addClass("emr_jcdtab01")/*.css("margin","4px 2px 0")*/
			                                         .addClass("tab_show")
			                                         .addClass("study_tab").appendTo(".studyTitleTag")
			                            )
			     .click(function(){
			    	//添加该检查单名称的页签 2013.12.20 yulei 修改,页签检查项目名称过长--结束					
			    	 $(".right .displayTag .studyTitleTag .tab_show")
			    	 	.removeClass("tab_show").addClass("tab_hide");
			    	 
			    	 $(this).parent().removeClass("tab_hide").addClass("tab_show");
			    	 
			    	 div.text("");
			    	 
			    	 showjcdTime_baogao(s,md);
			    	 
			    	 showStudy(s, md,div, li);
			    
			     });
	
	//如果s.title为a超或者p超
	var acaoorpcaoresult;
	if(s.title=="A超"||s.title=="p超"){
	//	console.dir("!!!!");
		
		acaoorpcaoresult = getJSONData("/publish/child/aorpresult.htm", {title:s.title,id:s.id,tag : Math.random()},"POST").obj;
		//移除div中内容
		$(".studyShowTag").text("");
		//添加表格
		var t=$("<table />").appendTo(".studyShowTag");
		
		if(s.title=="p超"){
		var p=acaoorpcaoresult.p;
		var tr = $("<tr />").appendTo(t);
		$("<th />").text("").appendTo(tr);
		$("<th />").text("第一次").appendTo(tr);
		$("<th />").text("第二次").appendTo(tr);
		$("<th />").text("第三次").appendTo(tr);
		$("<th />").text("平均值").appendTo(tr);
		
		tr=$("<tr />").appendTo(t);
		$("<td />").text("左眼").appendTo(tr);//"左眼"
		$("<td />").attr("id","OS1").appendTo(tr);
		$("<td />").attr("id","OS2").appendTo(tr);
		$("<td />").attr("id","OS3").appendTo(tr);
		$("<td />").attr("id","OSave").appendTo(tr);
		
		tr=$("<tr />").appendTo(t);
		$("<td />").text("右眼").appendTo(tr);//"右眼"
		$("<td />").attr("id","OD1").appendTo(tr);
		$("<td />").attr("id","OD2").appendTo(tr);
		$("<td />").attr("id","OD3").appendTo(tr);
		$("<td />").attr("id","ODave").appendTo(tr);
		
		//p超赋值
		$("#OS1").text(p.OS1);
		$("#OS2").text(p.OS2);
		$("#OS3").text(p.OS3);
		$("#OSave").text(p.OSave);
		$("#OS1").text(p.OS1);
		
		$("#OD1").text(p.OD1);
		$("#OD2").text(p.OD2);
		$("#OD3").text(p.OD3);
		$("#ODave").text(p.ODave);
		}
		else if(s.title=="A超"){
			var a=acaoorpcaoresult.a;
			var tr = $("<tr />").appendTo(t);
			$("<th />").text("").appendTo(tr);
			$("<th />").text("A").appendTo(tr);
			$("<th />").text("L").appendTo(tr);
			$("<th />").text("V").appendTo(tr);
			$("<th />").text("AL").appendTo(tr);
			
			tr=$("<tr />").appendTo(t);
			$("<td />").text("左眼").appendTo(tr);//"左眼"
			$("<td />").attr("id","os_a").appendTo(tr);
			$("<td />").attr("id","os_l").appendTo(tr);
			$("<td />").attr("id","os_v").appendTo(tr);
			$("<td />").attr("id","os_al").appendTo(tr);
			
			tr=$("<tr />").appendTo(t);
			$("<td />").text("右眼").appendTo(tr);//"右眼"
			$("<td />").attr("id","od_a").appendTo(tr);
			$("<td />").attr("id","od_l").appendTo(tr);
			$("<td />").attr("id","od_v").appendTo(tr);
			$("<td />").attr("id","od_al").appendTo(tr);
			
			//a超赋值
			$("#os_a").text(a.os_a);
			$("#os_l").text(a.os_l);
			$("#os_v").text(a.os_v);
			$("#os_al").text(a.os_al);
			
			$("#od_a").text(a.od_a);
			$("#od_l").text(a.od_l);
			$("#od_v").text(a.od_v);
			$("#od_al").text(a.od_al);
			
			
		}
	}
	
	 //div显示内容
//	achaoorpchao(s.title,div,study);
		
	
	//添加双屏显示按钮	
	var btn_div = $("<div />").attr({"class":"btn"/*,"style":"float:right;margin: 3px 4px 3px 0px;"*/}).addClass("emr_doublebtn")
							  .appendTo(".studyTitleTag");
	
	$("<a />").attr({"href":"#","class":"four noline"})
				  .click(function(){
					  				fenping(s.id,md.hzid);
					  			   })
				  .append($("<span />").attr({"class":"screen"/*,"style":"margin-top:3px;"*/}).addClass("emr_doublebtnspan"))
				  .append(language_doctor.ShuangPingXianShi)//"双屏显示"
				  .appendTo(btn_div);
	
	//先清除图片查看插件 防止重复加载
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
	//
//	function achaoorpchao(title,div,study){
//		if(title=="p超"){
//			alert(1);
//		}
//		else if(title=="A超"){
//			alert(2);
//		}
//	}
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
				
				var div = $("<div />").addClass("emr_oimsslidediv")/*.attr({"style":"width:195px; height:146px; float:left;text-align:center ;vertical-align: middle; "})*/
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
// s 检查单对象
// md 就诊信息对象
function showjcdTime_baogao(s,md)
{
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
	
	if(data_obj_findBaogaoByBaogao!=null)//该检查单存在报告信息
	{
		baogao_text = language_doctor.BaoGao;      //"报告"
	}
	
	
	//检查单开始结束时间
	var time_bg = $("<div />").addClass("emr_reportbtndiv").attr({/*"style":"float:right; width:70%;",*/"id":"jcd_time_bg_show"});
	
	$("<span />").append(startTime+gg+endTime).appendTo(time_bg);

	if(baogao_text!="")
	{	
		var btn_div = $("<div />").attr("class","btn")
								  .addClass("emr_reportbtndiv00")
		                          /*.attr("style","margin-top: 2px;margin-right: 5px;")*/
		                          .click(function(){
						            	 
						            	 showReport(s.id,s.jcxmids,s.hzid,s.kdksid);
						            	 
						             });
		
		var btn_a = $("<a />").attr("href","#").appendTo(btn_div);
		
		$("<span />").attr("class","report").appendTo(btn_a);
		
		btn_a.append(baogao_text);
		
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
	var ext = d.path.split(".")[d.path.split(".").length - 1].toLowerCase();
	if (ext == "jpg" || ext == "jpeg" || ext == "png" || ext == "gif") 
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

/**
 * 原图查看权限
 * 
 * @returns {Boolean}
 */
function yuantuQuanxian() 
{
	return true;
}

//等比缩放图片     宋仁非
function suofang_tupian(image,d)
{
	var result = imageZoom(d.w,d.h,195,146);
	
	image.attr("width",result.width).attr("height",result.height);
	
	if(image.attr("height")=="0"||image.attr("width")=="0")
	{
		image.attr("width",195).attr("height",146);
	}
	
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
	
    flowplayer("player"+i, contextPath+ "/flowplayer/flowplayer-3.2.15.swf");
    
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

