var getAllYs_ss_url = "/publish/quguang/getAllYs_ss.htm"; //医生
var getAllYsAndCount_ss_url = "/publish/quguang/getAllYsAndCount_ss.htm"; //医生和数量
var qgtjssl_report_url = "/publish/quguang/qgtjssl_report.htm";//导出excel
/**
 * 加载js、css文件
 */
function qg_ssltj_load(){
	importCSS("/js/manager/tongji/tongjiCommon.js");
}
/**
 * 入口方法
 */
function qg_ssltj_main(){
//	alert("welcome to use 屈光手术量统计 function!");
	qg_ssltj_load();//加载js、css文件
	var width = $("#right").find(".title").width();//应用区域宽度
	var height = $("#right").height()-$("#right").find(".title").height()-10;//应用区域高度
	var body_qgssltj = $("<div/>").attr("id","body_qgssltj").attr("style","width:"+width+"px;height:"+height+"px;background:;").appendTo("#right");
	var right_qgssltj = $("<div/>").attr("id","body_qgssltj").attr("style","width:"+(width*0.3)+"px;height:"+height+"px;background:;float:right;").appendTo(body_qgssltj);
	var right_top_qgssltj = $("<div/>").attr("id","right_top_qgssltj").attr("style","width:"+(width*0.3)+"px;height:34px;background:;").appendTo(right_qgssltj);
	var right_title = $("<div/>").attr("id","right_title").addClass("title").html("<div style='width:23px;height:22px;background:url(../images/menuicon.png) no-repeat -69px 0px;margin-top:6px;float:left;'></div><div style='width:100px;height:23px;margin-top:3px;margin-left:5px;font-size:12px;float:left;'>查询条件</div>").appendTo(right_top_qgssltj);
	var right_bot_qgssltj = $("<div/>").attr("id","right_bot_qgssltj").attr("style","width:"+(width*0.3)+"px;height:"+(height-34)+"px;background:;").appendTo(right_qgssltj);
	$(right_bot_qgssltj).append(qgssl_cxtj_tab('ssys'));
	var left_qgssltj = $("<div/>").attr("id","body_qgssltj").attr("style","width:"+(width*0.7)+"px;height:"+height+"px;background:;float:right;").appendTo(body_qgssltj);
	var left_top_qgssltj = $("<div/>").attr("id","left_top_qgssltj").attr("style","width:"+(width*0.7)+"px;height:34px;background:;").appendTo(left_qgssltj);
	var left_bot_qgssltj = $("<div/>").attr("id","left_bot_qgssltj").attr("style","width:"+(width*0.7)+"px;height:"+(height-34)+"px;background:;").appendTo(left_qgssltj);
//	var left_bot_qgssltj = $("<div/>").attr("id","left_bot_qgssltj").attr("style","width:"+(width*0.7)+"px;height:"+height+"px;background:;").appendTo(left_qgssltj);
	qgssl_fa1('ssys');//默认按医生统计
	
	var left_title_ssys = $("<div/>").attr("id","left_title_ssys").addClass("tab_show").attr("style","margin-top:7px;").html("<span>按手术医生统计</span>").appendTo(left_top_qgssltj);
	var left_title_ptjs = $("<div/>").attr("id","left_title_ptjs").addClass("tab_hide").attr("style","margin-top:7px;").html("<span>按配台技师统计</span>").appendTo(left_top_qgssltj);
	var left_title_pths = $("<div/>").attr("id","left_title_pths").addClass("tab_hide").attr("style","margin-top:7px;").html("<span>按配台护士统计</span>").appendTo(left_top_qgssltj);
	$("#left_title_ssys").bind("click",function(){
		if($(this).hasClass("tab_show")){
			return;	
		}else{
			$(".tab_show").removeClass("tab_show").addClass("tab_hide");
			$(this).removeClass("tab_hide").addClass("tab_show");
			$(left_bot_qgssltj).html("");
			qgssl_fa1('ssys');
		}
	});
	$("#left_title_ptjs").bind("click",function(){
		if($(this).hasClass("tab_show")){
			return;	
		}else{
			$(".tab_show").removeClass("tab_show").addClass("tab_hide");
			$(this).removeClass("tab_hide").addClass("tab_show");
			$(left_bot_qgssltj).html("");
			qgssl_fa1('ptjs');
		}
	});
	$("#left_title_pths").bind("click",function(){
		if($(this).hasClass("tab_show")){
			return;	
		}else{
			$(".tab_show").removeClass("tab_show").addClass("tab_hide");
			$(this).removeClass("tab_hide").addClass("tab_show");
			$(left_bot_qgssltj).html("");
			qgssl_fa1('pths');
		}
	});
	calendarFun_qgssltj("beginSj",0);
	calendarFun_qgssltj("endSj",-100);
}
/**
 * 查询条件表格
 * @returns {String}
 */
function qgssl_cxtj_tab(biaoshi){
	var data_ys = getYs_ss(biaoshi);//所以医生
//	var data_ys = [
//			{xingming:'张辰星',gonghao:'0001'},
//			{xingming:'熊洁',gonghao:'0002'},
//			{xingming:'胡春明',gonghao:'0003'}
//	];
	var data = getThisMonth1();
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
				"<td>按钮:</td>" +
				"<td>" +
					"<input type='button' value='查询' onclick='qgssltj_search()' style='width:82px;'/>&nbsp;&nbsp;" +
					"<input type='button' value='重置' onclick='qgssltj_reset()' style='width:82px;'/>&nbsp;&nbsp;" +
					"<input type='button' value='导出' onclick='qgssltj_export()' style='width:82px;'/>" +
				"</td>" +
			"</tr>"+
		  "</table>";
	return tab;
}
/**
 * 查询
 */
function qgssltj_search(){
	if($("#left_title_ssys").hasClass("tab_show")){
		qgssl_fa1('ssys',1);
	}
	if($("#left_title_ptjs").hasClass("tab_show")){
		qgssl_fa1('ptjs',1);	
	}
	if($("#left_title_pths").hasClass("tab_show")){
		qgssl_fa1('pths',1);	
	}
	
}
/**
 * 重置
 */
function qgssltj_reset(){
	var data = getThisMonth1();
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
	$("#right_bot_qgssltj").find("input[type='checkbox']").attr("checked",false);
	$("#ssfs1").val("");
	$("#ssfs2").val("");
	$("#ssfs3").val("");
}
///**
// * 总数量
// */
//function getTotleCount(ysAndCount_data){
//	var totleCount = 0;
//	$.each(ysAndCount_data,function(i,item){
//		totleCount+=item[1];
//	});
//	return totleCount;
//}
///**
// * 计算百分比
// * @param totleCount
// * @param count
// * @returns {___anonymous7997_7999}
// */
//function getBfb(totleCount,count){
//	var bfb = "";
//	if(totleCount!=0){
//		bfb = count/totleCount;
//		bfb = (bfb*100).toFixed(1)+"%";
//	}
//	return bfb;
//}
///**
// * 导出数据的title
// */
//function qgssltj_export_title_ys(jcxmAndCount_data){
//	var titleData = [];
//	titleData[0]="医生";
//	titleData[1]="总数";
//	titleData[2]="百分比";
//	$.each(jcxmAndCount_data,function(i,item){
//		var jcxm = item[0];
//		titleData[(i+3)] = item[0];
//	});
//	return titleData;
//}
//function qgssltj_export_title_jcxm(ysAndCount_data){
//	var titleData = [];
//	titleData[0]="检查项目";
//	titleData[1]="总数";
//	titleData[2]="百分比";
//	$.each(ysAndCount_data,function(i,item){
//		var ys = item[0];
//		titleData[(i+3)] = item[0];
//	});
//	return titleData;
//}
////张三(0087)→0087
//function getYsGhFromXmAndGh(xingmingAndGonghao){
//	var gonghao = null;
//	if(xingmingAndGonghao!=null){
//		var strs = xingmingAndGonghao.split("(");
//		if(strs.length==2){
//			var ss = strs[1].split(")");
//			if(ss.length==2){
//				gonghao = ss[0];
//			}
//		}
//	}
//	return gonghao;
//}
///**
// * 按医生统计
// * @returns {Array}
// */
//function get_qgssltj_export_ys_data(ysAndCount_data,jcxmAndCount_data){
//	var searchForm = qgssltj_getSearch();//查询条件
//	var newData = [];
//	var title_data = qgssltj_export_title_ys(jcxmAndCount_data);
//	newData[0] = title_data;
//	$.each(ysAndCount_data,function(i,item){
//		var tabData = [];
//		$.each(title_data,function(n,m){
//			tabData[n]="-";
//		});
//		var xingmingAndGonghao = item[0];
//		var totleCount = item[1];
//		var gonghao = getYsGhFromXmAndGh(xingmingAndGonghao);
//		tabData[0] = xingmingAndGonghao;
//		tabData[1] = totleCount;
//		tabData[2] = getBfb(getTotleCount(ysAndCount_data),totleCount); 
//		searchForm.ysqz = gonghao;
//		var jcxmAndCountByYs = getJcxmAndCount(searchForm);
//		if(jcxmAndCountByYs!=null){
//			$.each(jcxmAndCountByYs,function(j,obj){
//				var index = "";
//				$.each(title_data,function(k,v){
//					if(obj[0]==v){
//						index = k;
//					}
//				});
//				tabData[index]=obj[1];
//			});	
//		}
//		newData[(i+1)] = tabData;
//	});
//	return newData;
//}
///**
// * 开始等待
// */
//function wait_begin(){
//	var lockedDiv = $("<div />").addClass("lockedBackground").css({
//        top : 0,
//        left : 0,
//        position : "absolute",
//        width : "100%",
//        height : $(window).height(),
//        "z-index":$("div").length+1,
//        background:"#ccc",
//        filter:"alpha(opacity=60)",
//        opacity:0.6
//    }).appendTo("body");
//}
/**
 * 导出excel
 */
function qgssltj_export(){
	$.oimsConfirm("导出excel需要比较长的时间，您确定要导出？",function(){
		var searchForm = qgssltj_getSearch();//查询条件
		var data = getJSONData(qgtjssl_report_url+"?biaoshi='ssys'",searchForm, "POST");
		if(data.state)
			location.href=contextPath+data.obj;
	});
}
///**
// * 数组转换成字符串
// */
//function arrToStr(arr){
//	var aa = "";
//	$.each(arr,function(i,item){
//		var bb = "";
//		$.each(item,function(n,m){
//			if(n!=(item.length-1)){
//				bb+=m+",";
//			}else{
//				bb+=m;
//			}
//		});
//		if(i!=(arr.length-1)){
//			aa+=item+"@";
//		}else{
//			aa+=item;
//		}
//	});
//	return aa;
//}
/**
 * 获取 查询条件
 */
function qgssltj_getSearch(){
	 var search = {};
	 search.beginSj = $("#beginSj").val();
	 search.endSj=$("#endSj").val();
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
//	 console.log("---------------");
//	 console.log(search);
	 return search;
}
/**
 * 本月第一天和最后一天
 */
function getThisMonth1(){
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
 * 统计
 */
function qgssl_fa1(biaoshi,n){
	if(n!=1){
		$(right_bot_qgssltj).html("");
		$(right_bot_qgssltj).append(qgssl_cxtj_tab(biaoshi));	
		calendarFun_qgssltj("beginSj",0);
		calendarFun_qgssltj("endSj",-100);
	}
	var searchForm = qgssltj_getSearch();//查询条件
	var data = getYsAndCount_ss(searchForm,biaoshi);
	var div = $("#left_bot_qgssltj");
	var titleText = "";
//	var data = [
//		            ['张晨星',45],
//		            ['熊洁',30],
//		            ['胡春明',15],
//		            ['未签名',10]
//	            ];
	showPie_fa1_ss(div, titleText, data,searchForm);
}
function showPie_fa1_ss(div, titleText, data,form){
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
/**
 * 医生
 */
function getYs_ss(biaoshi){
	var data = getJSONData(getAllYs_ss_url+"?biaoshi='"+biaoshi+"'",null, "POST");
	return data.obj;
}
/**
 * 医生和数量
 */
function getYsAndCount_ss(form,biaoshi){
	var data = getJSONData(getAllYsAndCount_ss_url+"?biaoshi='"+biaoshi+"'",form, "POST");
	return data.obj;
}
function calendarFun_qgssltj(id, leftWidth) {
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
