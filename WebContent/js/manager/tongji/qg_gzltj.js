var getAllYs_url = "/publish/quguang/getAllYs.htm"; //医生
var getAllJcxm_url = "/publish/quguang/getAllJcxm.htm"; //检查项目
var getAllYsAndCount_url = "/publish/quguang/getAllYsAndCount.htm"; //医生和数量
var getAllJcxmAndCount_url = "/publish/quguang/getAllJcxmAndCount.htm"; //检查项目和数量
var qgtj_report_url = "/publish/quguang/qgtj_report.htm";//导出excel
//加载js、css文件
function qg_gzltj_load(){
//	importJS("/js/commonLanguage.js");
//	importJS("/js/jquery.createPageList.js");
//	importJS("/subgroup/calendar/js/jscal2.js");
//	importJS("/subgroup/calendar/js/en.js");
//	importJS("/emr/js/emr_quGuang_getValues.js");
//	importCSS("/subgroup/calendar/css/jscal2.css");
	importCSS("/js/manager/tongji/tongjiCommon.js");
}
/**
 * 入口方法
 */
function qg_gzltj_main(){
	qg_gzltj_load();//加载js、css文件
	var width = $("#right").find(".title").width();//应用区域宽度
	var height = $("#right").height()-$("#right").find(".title").height()-10;//应用区域高度
	var body_qgtj = $("<div/>").attr("id","body_qgtj").attr("style","width:"+width+"px;height:"+height+"px;background:;").appendTo("#right");
	var right_qgtj = $("<div/>").attr("id","body_qgtj").attr("style","width:"+(width*0.3)+"px;height:"+height+"px;background:;float:right;").appendTo(body_qgtj);
	var right_top_qgtj = $("<div/>").attr("id","right_top_qgtj").attr("style","width:"+(width*0.3)+"px;height:34px;background:;").appendTo(right_qgtj);
	var right_title = $("<div/>").attr("id","right_title").addClass("title").html("<div style='width:23px;height:22px;background:url(../images/menuicon.png) no-repeat -69px 0px;margin-top:6px;float:left;'></div><div style='width:100px;height:23px;margin-top:3px;margin-left:5px;font-size:12px;float:left;'>查询条件</div>").appendTo(right_top_qgtj);
	var right_bot_qgtj = $("<div/>").attr("id","right_bot_qgtj").attr("style","width:"+(width*0.3)+"px;height:"+(height-34)+"px;background:;").appendTo(right_qgtj);
	$(right_bot_qgtj).append(qg_cxtj_tab());
	calendarFun_qgtj("beginSj",0);
	calendarFun_qgtj("endSj",-100);
	var left_qgtj = $("<div/>").attr("id","body_qgtj").attr("style","width:"+(width*0.7)+"px;height:"+height+"px;background:;float:right;").appendTo(body_qgtj);
	var left_top_qgtj = $("<div/>").attr("id","left_top_qgtj").attr("style","width:"+(width*0.7)+"px;height:34px;background:;").appendTo(left_qgtj);
	var left_bot_qgtj = $("<div/>").attr("id","left_bot_qgtj").attr("style","width:"+(width*0.7)+"px;height:"+(height-34)+"px;background:;").appendTo(left_qgtj);
	var left_title_fa1 = $("<div/>").attr("id","left_title_fa1").addClass("tab_show").attr("style","margin-top:7px;").html("<span>按医生统计</span>").appendTo(left_top_qgtj);
	var left_title_fa2 = $("<div/>").attr("id","left_title_fa2").addClass("tab_hide").attr("style","margin-top:7px;").html("<span>按检查项目统计</span>").appendTo(left_top_qgtj);
	$("#left_title_fa1").bind("click",function(){
		if($(this).hasClass("tab_show")){
			return;	
		}else{
			$(".tab_show").removeClass("tab_show").addClass("tab_hide");
			$(this).removeClass("tab_hide").addClass("tab_show");
			$(left_bot_qgtj).html("");
			qg_fa1();
		}
	});
	$("#left_title_fa2").bind("click",function(){
		if($(this).hasClass("tab_show")){
			return;	
		}else{
			$(".tab_show").removeClass("tab_show").addClass("tab_hide");
			$(this).removeClass("tab_hide").addClass("tab_show");
			$(left_bot_qgtj).html("");
			qg_fa2();
		}
	});
	qg_fa1();//默认按医生统计
}
/**
 * 查询条件表格
 * @returns {String}
 */
function qg_cxtj_tab(){
	var data_ys = getYs();//所以医生
//	console.log("~~~~"+data_ys);
	var data_jcxm = getJcxm();//所以检查项目
	var data = getThisMonth();
	var beginDate = "";
	var endDate = "";
	if(data!=null){
		if(data.beginDate!=null){
			beginDate = data.beginDate;
		}
		if(data.endDate!=null){
			endDate = data.endDate;
		}
	}
	var tab = "<table width='96%' cellpadding='0' cellspacing='8' style='background:;margin-left:2%;font-size:12px;'>" +
				"<tr>" +
					"<td style='width:40px;'>日期：</td>"+
					"<td>" +
						"&nbsp;&nbsp;<input type='text' id='beginSj' style='width:110px;' value='"+beginDate+"'/>&nbsp;&nbsp;至&nbsp;&nbsp;" +
						"<input type='text' id='endSj' style='width:110px' value='"+endDate+"'/>" +
					"</td>" +
				"</tr>" +
				"<tr>" +
					"<td>分类：</td>"+
					"<td>" +
						"<input type='checkbox' id='bl' name='xmfl' value='病历' style='width:16px;height:16px;'/>&nbsp;病历&nbsp;" +
						"<input type='checkbox' id='shfx' name='xmfl' value='术后复查' style='width:16px;height:16px;'/>&nbsp;术后复查&nbsp;" +
					"</td>" +
				"</tr>"+
				"<tr>" +
					"<td>手术：</td>"+
					"<td>" +
							"<select id='ssfs1' style='width:82px;;'>" +
								"<option id=''></option>" +
								"<option id='准分子'>准分子</option>" +
								"<option id='晶体植入'>晶体植入</option>" +
								"<option id='儿童屈光'>儿童屈光</option>" +
							"</select>&nbsp;&nbsp;" +
							"<select id='ssfs2' style='width:82px;'>" +
								"<option id=''></option>" +
								"<option id='lasik-90'>lasik-90</option>" +
								"<option id='lasik-110'>lasik-110</option>" +
								"<option id='lasik飞秒'>lasik飞秒</option>" +
								"<option id='ICL'>ICL</option>" +
								"<option id='TICL'>TICL</option>" +
								"<option id='PRL'>PRL</option>" +
							"</select>&nbsp;&nbsp;" +
							"<select id='ssfs3' style='width:82px;'>" +
								"<option id=''></option>" +
								"<option id='普通'>普通</option>" +
								"<option id='Q值'>Q值</option>" +
								"<option id='地形图'>地形图</option>" +
								"<option id='波前相差'>波前相差</option>" +
							"</select>" +
					"</td>" +
				"</tr>"+
				"<tr>" +
					"<td>医生：</td>" +
					"<td style='line-height:20px;'>"+
						"<div style='width:100%;height:80px;background:#d2b2a2;overflow:auto;'>";
							$.each(data_ys,function(i,item){
								tab+="<div style='width:120px;height:20px;float:left;'><input type='checkbox' id='bl"+i+"' name='ys' value='"+(item.xingming==''?'未签名':item.xingming)+"("+(item.gonghao==''?'null':item.gonghao)+")"+"' style='width:16px;height:16px;'/>&nbsp;&nbsp;"+(item.xingming==''?'未签名':item.xingming)+"("+(item.gonghao==''?'null':item.gonghao)+")"+"&nbsp;&nbsp;</div>";
								if((i+1)%2==0){
									tab+="<br/>";
								}
							});
						tab+="</div>"+
						"</td>" +
				"</tr>"+
				"<tr>" +
					"<td>检查：</td>" +
					"<td style='line-height:20px;'>"+
						"<div style='width:100%;height:260px;background:#d2b2a2;overflow:auto;'>";
						$.each(data_jcxm,function(i,item){
							tab+="<div style='width:120px;height:20px;float:left;'><input type='checkbox' id='jcxm"+i+"' name='jcxm' value='"+item+"' style='width:16px;height:16px;'/>&nbsp;&nbsp;"+item+"&nbsp;&nbsp;</div>";
							if((i+1)%2==0){
								tab+="<br/>";
							}
						});
					tab+="</div>"+
					"</td>" +
			"</tr>"+
			"<tr>" +
				"<td>按钮:</td>" +
				"<td>" +
					"<input type='button' value='查询' onclick='qgtj_search()' style='width:82px;'/>&nbsp;&nbsp;" +
					"<input type='button' value='重置' onclick='qgtj_reset()' style='width:82px;'/>&nbsp;&nbsp;" +
					"<input type='button' value='导出' onclick='qgtj_export()' style='width:82px;'/>" +
				"</td>" +
			"</tr>"+
		  "</table>";
	return tab;
}
/**
 * 查询
 */
function qgtj_search(){
	if($("#left_title_fa1").hasClass("tab_show")){
		qg_fa1();
	}
	if($("#left_title_fa2").hasClass("tab_show")){
		qg_fa2();	
	}
}
/**
 * 重置
 */
function qgtj_reset(){
	var data = getThisMonth();
	var beginDate = "";
	var endDate = "";
	if(data!=null){
		if(data.beginDate!=null){
			beginDate = data.beginDate;
		}
		if(data.endDate!=null){
			endDate = data.endDate;
		}
	}
	$("#beginSj").val(beginDate);
	$("#endSj").val(endDate);
	$("#right_bot_qgtj").find("input[type='checkbox']").attr("checked",false);
	$("#ssfs1").val("");
	$("#ssfs2").val("");
	$("#ssfs3").val("");
}
/**
 * 总数量
 */
function getTotleCount(ysAndCount_data){
	var totleCount = 0;
	$.each(ysAndCount_data,function(i,item){
		totleCount+=item[1];
	});
	return totleCount;
}
/**
 * 计算百分比
 * @param totleCount
 * @param count
 * @returns {___anonymous7997_7999}
 */
function getBfb(totleCount,count){
	var bfb = "";
	if(totleCount!=0){
		bfb = count/totleCount;
		bfb = (bfb*100).toFixed(1)+"%";
	}
	return bfb;
}
/**
 * 导出数据的title
 */
function qgtj_export_title_ys(jcxmAndCount_data){
	var titleData = [];
	titleData[0]="医生";
	titleData[1]="总数";
	titleData[2]="百分比";
	$.each(jcxmAndCount_data,function(i,item){
		var jcxm = item[0];
		titleData[(i+3)] = item[0];
	});
	return titleData;
}
function qgtj_export_title_jcxm(ysAndCount_data){
	var titleData = [];
	titleData[0]="检查项目";
	titleData[1]="总数";
	titleData[2]="百分比";
	$.each(ysAndCount_data,function(i,item){
		var ys = item[0];
		titleData[(i+3)] = item[0];
	});
	return titleData;
}
//张三(0087)→0087
function getYsGhFromXmAndGh(xingmingAndGonghao){
	var gonghao = null;
	if(xingmingAndGonghao!=null){
		var strs = xingmingAndGonghao.split("(");
		if(strs.length==2){
			var ss = strs[1].split(")");
			if(ss.length==2){
				gonghao = ss[0];
			}
		}
	}
	return gonghao;
}
/**
 * 按医生统计
 * @returns {Array}
 */
function get_qgtj_export_ys_data(ysAndCount_data,jcxmAndCount_data){
	var searchForm = qgtj_getSearch();//查询条件
	var newData = [];
	var title_data = qgtj_export_title_ys(jcxmAndCount_data);
	newData[0] = title_data;
	$.each(ysAndCount_data,function(i,item){
		var tabData = [];
		$.each(title_data,function(n,m){
			tabData[n]="-";
		});
		var xingmingAndGonghao = item[0];
		var totleCount = item[1];
		var gonghao = getYsGhFromXmAndGh(xingmingAndGonghao);
		tabData[0] = xingmingAndGonghao;
		tabData[1] = totleCount;
		tabData[2] = getBfb(getTotleCount(ysAndCount_data),totleCount); 
		searchForm.ysqz = gonghao;
		var jcxmAndCountByYs = getJcxmAndCount(searchForm);
		if(jcxmAndCountByYs!=null){
			$.each(jcxmAndCountByYs,function(j,obj){
				var index = "";
				$.each(title_data,function(k,v){
					if(obj[0]==v){
						index = k;
					}
				});
				tabData[index]=obj[1];
			});	
		}
		newData[(i+1)] = tabData;
	});
	return newData;
}
/**
 * 按检查项目统计
 */
function get_qgtj_export_jcxm_data(ysAndCount_data,jcxmAndCount_data){
	var searchForm = qgtj_getSearch();//查询条件
	var newData = [];
	var title_data = qgtj_export_title_jcxm(ysAndCount_data);
	newData[0] = title_data;
	$.each(jcxmAndCount_data,function(i,item){
		var tabData = [];
		$.each(title_data,function(n,m){
			tabData[n]="-";
		});
		var jcxm = item[0];
		var totleCount = item[1];
		tabData[0] = jcxm;
		tabData[1] = totleCount;
		tabData[2] = getBfb(getTotleCount(jcxmAndCount_data),totleCount); 
		searchForm.jcxm = jcxm;
		var ysAndCountByJcxm = getYsAndCount(searchForm);
		if(ysAndCountByJcxm!=null){
			$.each(ysAndCountByJcxm,function(j,obj){
				var index = "";
				$.each(title_data,function(k,v){
					if(obj[0]==v){
						index = k;
					}
				});
				tabData[index]=obj[1];
			});	
		}
		newData[(i+1)] = tabData;
	});
	return newData;
}
/**
 * 开始等待
 */
function wait_begin(){
	var lockedDiv = $("<div />").addClass("lockedBackground").css({
        top : 0,
        left : 0,
        position : "absolute",
        width : "100%",
        height : $(window).height(),
        "z-index":$("div").length+1,
        background:"#ccc",
        filter:"alpha(opacity=60)",
        opacity:0.6
    }).appendTo("body");
}
/**
 * 导出excel
 */
function qgtj_export(){
	$.oimsConfirm("导出excel需要比较长的时间，您确定要导出？",function(){
		var searchForm = qgtj_getSearch();//查询条件
		var ysAndCount_data = getYsAndCount(searchForm);
		var jcxmAndCount_data = getJcxmAndCount(searchForm);
		//按医生统计统计
		var dataByYs = get_qgtj_export_ys_data(ysAndCount_data,jcxmAndCount_data);
		var dataByYsStr = arrToStr(dataByYs);
		//按检查项目统计
		var dataByJcxm = get_qgtj_export_jcxm_data(ysAndCount_data,jcxmAndCount_data);
		var dataByJcxmStr = arrToStr(dataByJcxm);
		//以上两项的合并
		var data_export = dataByYsStr+"`"+dataByJcxmStr;
		$.ajax({
			url : contextPath + qgtj_report_url,
			data :{
				data_export:data_export
			},
			async : false,
			type : 'POST',
			dataType : 'json',
			success : function(data) {
				//锁屏 结束
				
				if(data.state)
					location.href=contextPath+data.obj;
			}
		});	
	});
		
}
/**
 * 数组转换成字符串
 */
function arrToStr(arr){
	var aa = "";
	$.each(arr,function(i,item){
		var bb = "";
		$.each(item,function(n,m){
			if(n!=(item.length-1)){
				bb+=m+",";
			}else{
				bb+=m;
			}
		});
		if(i!=(arr.length-1)){
			aa+=item+"@";
		}else{
			aa+=item;
		}
	});
	return aa;
}
/**
 * 获取 查询条件
 */
function qgtj_getSearch(){
	 var search = {};
//				jcxm:null,
//				xmfl:null,
//				ssfs1:null,
//				ssfs2:null,
//				ssfs3:null,
//				ysqz:gh,
//				ys_xingming:null,
//				beginSj:null,
//				endSj:null
	 search.beginSj = $("#beginSj").val();
	 search.endSj=$("#endSj").val();
	 var xmfls = $("input[name='xmfl']:checked");
	 if(xmfls.length==2 || xmfls.length==0){
		 search.xmfl="";
	 }else if(xmfls.length==1){
		 if($(xmfls).attr("id")=="bl"){
			 search.xmfl="病历";
		 }else if($(xmfls).attr("id")=="shfx"){
			 search.xmfl="术后复查";
		 }
	 }
	 search.ssfs1 = $("#ssfs1").val();
	 search.ssfs2 = $("#ssfs2").val();
	 search.ssfs3 = $("#ssfs3").val();
	 var ysqzs = $("input[name='ys']");
//	 console.log(ysqzs);
	 var ysqz = "";
	 $.each(ysqzs,function(i,item){
		 if($(item).attr("checked")=="checked"){
			 ysqz+=$(item).val()+"@";
		 }
	 });
	 search.ysqz=ysqz;
	 var jcxms = $("input[name='jcxm']");
	 var jcxm = "";
	 $.each(jcxms,function(i,item){
		 if($(item).attr("checked")=="checked"){
			 jcxm+=$(item).val()+"@";
		 }
	 });
	 search.jcxm=jcxm;
//	 console.log("---------------");
//	 console.log(search);
	 return search;
}
/**
 * 本月第一天和最后一天
 */
function getThisMonth(){
	var today = new Date();
	year = today.getUTCFullYear();
	month = today.getMonth() + 1;
	var beginDate = "01";
	var endDate = "31";
	if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
		dateEnd="31";
	}else if(month==4 || month==6 || month==9 || month==11){
		dateEnd="30"
	}else{
		if((year%4==0 && year%100==1) || year%400==0){
			dateEnd = "29";
		}else{
			dateEnd = "28";
		}
	}
	if(month<10){
		month = "0"+month;
	}
	beginDate = year+"-"+month+"-"+beginDate;
	endDate = year+"-"+month+"-"+dateEnd;
	var data = {};
	data.beginDate=beginDate;
	data.endDate=endDate;
	return data;
}
/**
 * 按医生统计
 */
function qg_fa1(){
	var searchForm = qgtj_getSearch();//查询条件
	var data = getYsAndCount(searchForm);
	var div = $("#left_bot_qgtj");
	var titleText = "按医生统计";
//	var data = [
//		            ['张晨星',45],
//		            ['熊洁',30],
//		            ['汪辉',10],
//		            ['胡春明',5],
//		            ['李美芳',60],
//		            ['李欢欢',20],
//		            ['未签名',40]
//	            ];
	//showPie(div, titleText, data,qg_fa1_detail);
	showPie_fa1(div, titleText, data,searchForm);
}
function showPie_fa1(div, titleText, data,form){
	$(div).highcharts({
							chart : {
							type : 'pie',
						},
						title : {
							text : titleText
						},
						tooltip : {
							pointFormat : '数量: <b>{point.y}</b>'
						},
						plotOptions : {
							pie : {
								allowPointSelect : true,
								cursor : 'pointer',
								dataLabels : {
									enabled : true,
									format : '<b>{point.name}</b><br/>   {point.percentage:.1f} % ',
									style : {
										color : (Highcharts.theme && Highcharts.theme.contrastTextColor)
												|| 'black'
									}
								},
								events : {
									click :  function(e) {
										var gh = null;
										 var nameAndId = e.point.name;
										 if(nameAndId!=null){
											 var vals = nameAndId.split("(");
											 if(vals.length==2){
												 var val1 = vals[1];
												 var ghs = val1.split(")");
												 if(ghs.length>0){
													 gh = ghs[0];
												 }
											 }
										 }
//										 console.log("------------------------------");
//										 console.log(form);
										 form.ysqz=gh;
//										 var qgtj = {
//														jcxm:null,
//														xmfl:null,
//														ssfs1:null,
//														ssfs2:null,
//														ssfs3:null,
//														ysqz:gh,
//														ys_xingming:null,
//														beginSj:null,
//														endSj:null
//										 			};
										 qg_fa1_detail(form);
									}
								}

							}
						},
						series : [ {
							type : 'pie',
							name : '出报告的医生',
							data : data
						} ]
					});
}
function qg_fa1_detail(form){
	var div = $("<div id='qg_fa1_detail' style=''></div>");
	div.oimsDialog({
//		icon : "add",
		title : "展示检查详细信息",
		width : 1200,
		height : 450,
		drag : false,// 是否可以拖动窗口
		locked : true,
		winType : 4,
		button : null
	});
	var data = getJcxmAndCount(form);
//	var data = [
//		            ['视力',45],
//		            ['眼压',30],
//		            ['眼位',10],
//		            ['瞳孔直径',5],
//		            ['角膜厚度',60],
//		            ['角膜地形图',20],
//		            ['眼底',40],
//		            ['前节',45],
//		            ['同时视',30],
//		            ['注视性质',10],
//		            ['三面镜',5],
//		            ['电脑验光',60],
//		            ['散瞳检影',20],
//		            ['散瞳试片',40],
//		            ['小瞳检影',45],
//		            ['小瞳试片',30],
//		            ['裂隙灯',10],
//		            ['主述病史',5]
//		         ];
	showColumn("#qg_fa1_detail", "展示检查详细信息",data);
}
/**
 * 按项目统计
 */
function qg_fa2(){
	var searchForm = qgtj_getSearch();//查询条件
	var data = getJcxmAndCount(searchForm);
	var div = $("#left_bot_qgtj");
	var titleText = "按检查项目统计";
//	var data = [
//		            ['视力',45],
//		            ['眼压',30],
//		            ['眼位',10],
//		            ['瞳孔直径',5],
//		            ['角膜厚度',60],
//		            ['角膜地形图',20],
//		            ['眼底',40],
//		            ['前节',45],
//		            ['同时视',30],
//		            ['注视性质',10],
//		            ['三面镜',5],
//		            ['电脑验光',60],
//		            ['散瞳检影',20],
//		            ['散瞳试片',40],
//		            ['小瞳检影',45],
//		            ['小瞳试片',30],
//		            ['裂隙灯',10],
//		            ['主述病史',5]
//	            ];
	showPie_fa2(div, titleText, data,searchForm);
}
function showPie_fa2(div, titleText, data,form){
	$(div).highcharts({
							chart : {
							type : 'pie',
						},
						title : {
							text : titleText
						},
						tooltip : {
							pointFormat : '数量: <b>{point.y}</b>'
						},
						plotOptions : {
							pie : {
								allowPointSelect : true,
								cursor : 'pointer',
								dataLabels : {
									enabled : true,
									format : '<b>{point.name}</b><br/>   {point.percentage:.1f} % ',
									style : {
										color : (Highcharts.theme && Highcharts.theme.contrastTextColor)
												|| 'black'
									}
								},
								events : {
									click :  function(e) {
										var gh = null;
										 var jcxm = e.point.name;
//										 var qgtj = {
//														jcxm:jcxm,
//														xmfl:null,
//														ssfs1:null,
//														ssfs2:null,
//														ssfs3:null,
//														ysqz:null,
//														ys_xingming:null,
//														beginSj:null,
//														endSj:null
//										 			};
										 form.jcxm=jcxm;
										 qg_fa2_detail(form);
									}
								}

							}
						},
						series : [ {
							type : 'pie',
							name : '出报告的医生',
							data : data
						} ]
					});
}
function qg_fa2_detail(form){
	var div = $("<div id='qg_fa2_detail' style=''></div>");
	div.oimsDialog({
//		icon : "add",
		title : "展示检查详细信息",
		width : 1200,
		height : 450,
		drag : false,// 是否可以拖动窗口
		locked : true,
		winType : 4,
		button : null
	});
//	var data = [
//	            ['张晨星',45],
//	            ['熊洁',30],
//	            ['汪辉',10],
//	            ['胡春明',5],
//	            ['李美芳',60],
//	            ['李欢欢',20],
//	            ['未签名',40]
//		         ];
	var data = getYsAndCount(form);
	showColumn("#qg_fa2_detail", "展示检查详细信息",data);
}
/**
 * 医生
 */
function getYs(){
	var data = getJSONData(getAllYs_url,null, "POST");
	return data.obj;
}
/**
 * 检查项目
 */
function getJcxm(){
	var data = getJSONData(getAllJcxm_url,null, "POST");
	return data.obj;
}
/**
 * 医生和数量
 */
function getYsAndCount(form){
	var data = getJSONData(getAllYsAndCount_url,form, "POST");
	return data.obj;
}
/**
 * 检查项目和数量
 */
function getJcxmAndCount(form){
	var data = getJSONData(getAllJcxmAndCount_url,form, "POST");
	return data.obj;
}
function calendarFun_qgtj(id, leftWidth) {
//	$(".DynarchCalendar-topCont").hide();
	if ($("#" + id).length) {
		var cal = Calendar.setup({
			onSelect : function(cal) {
				cal.hide();
				var date = cal.selection.get();
				if (date) {
					date = Calendar.intToDate(date);
					document.getElementById(id).value = Calendar.printDate(
							date, "%Y-%m-%d");
					if (document.getElementById(id).value != "") {
						$("#" + id).removeAttr("title").removeClass("error1");
					}
				}
			}
		});
		cal.widthLength(id);
		cal.topLength(id);
		cal.manageFields(id, id, "%Y-%m-%d");
		if (!leftWidth) {
			leftWidth = 0;
		}
		cal.manageFields(id, id, "%Y-%m-%d", leftWidth);
	}
}
