var GET_PATIENT_BY_BLH_URL="/publish/huanZheXinxi/getHuanzhexinxiByBLH.htm";
var GET_PATIENT_BY_ID_URL="/publish/huanZheXinxi/findHuanZheById.htm";
var FIND_OPERATION_DICT_URL="/publish/shoushu/findOperationDictList.htm";
var GET_OPERATION_DICT_URL="/publish/shoushu/getOperationDict.htm";
var FIND_OPERATION_URL="/publish/shoushu/findOperationList.htm";
var SAVE_OR_UPDATE_OPERATION_DICT_URL = "/publish/shoushu/saveOrUpdateOperationDict.htm";
var SAVE_OR_UPDATE_OPERATION_PLAN_URL = "/publish/shoushu/saveOrUpdateOperationPlan.htm";
var SAVE_OR_UPDATE_OPERATION_APPLICATION_URL = "/publish/shoushu/saveOrUpdateOperationApplication.htm";
var SAVE_OR_UPDATE_OPERATION_RECORD_URL="/publish/shoushu/saveOrUpdateOperationRecord.htm";
var GET_OPERTION_DICT_URL="/publish/shoushu/getOperationDict.htm";
var DELETE_OPERTION_DICT_URL = "/publish/shoushu/deleteOperationDict.htm";
var SAVE_OR_UPDATE_OPERATION_URL = "/publish/shoushu/saveOrUpdateOperation.htm";
var GET_OPERATION_URL = "/publish/shoushu/getOperation.htm";
var BEFORE_ADD_OPERATION_URL = "/publish/shoushu/getOperationMap.htm";
var DELETE_OPERATION_URL = "/publish/shoushu/deleteOperation.htm";
//var FIND_DEPT_URL = "/publish/bumen/findAllBuMen.htm";
//var FIND_DOCTOR_GROUP_URL = "/publish/yuangong/findYuangongByBumenId.htm";
var TEMPLATE_OPERATION_DICT_FORM_URL="/js/manager/shoushu/template/operationDictForm.html";
var TEMPLATE_OPERATION_FORM_URL="/js/manager/shoushu/template/operationForm.html";
var TEMPLATE_OPERATION_APPLICATION_FORM_URL="/js/manager/shoushu/template/operationShenqingForm.html";
var TEMPLATE_OPERATION_PLAN_FORM_URL="/js/manager/shoushu/template/operationAnpaiForm.html";
var TEMPLATE_OPERATION_PLAN_UPDATE_FORM_URL="/js/manager/shoushu/template/operationAnpaiUpdateForm.html";
var TEMPLATE_OPERATION_RECORD_FORM_URL="/js/manager/shoushu/template/operationJiluForm.html";
var FIND_OPERATION_GROUP_LIST_URL = "/publish/operationDict/findOperationGroupPageList.htm";
var FIND_OPERATION_GRUOP_MEMBERS_URL="/publish/operationDict/findGroupMember.htm";
var SET_OPERATION_STATE_URL="/publish/shoushu/setOperationState.htm";
var TEMPLATE_OPERATION_CONSUMABLE_FORM="/js/manager/shoushu/template/operationConsumable.html";
var SAVE_OPERATIONCONSUMABLE_URL="/publish/shoushu/saveOrUpdateOperationConsumable.htm";
var FIND_OPERATIONCONSUMABLE_URL="/publish/shoushu/findOperationConsumable.htm";
var FIND_OPERATIONCONSUMABLE_LIST_URL="/publish/shoushu/findOperationConsumablePageList.htm";
var MINI_READY_FOR_OPERATION=1;//最小预约间隔时间（天）
var PROCESS_STATE_PLAN=2;//已安排
var PROCESS_STATE_UNDOING=4;//未手术
var PROCESS_STATE_CLOSE=5;//停手术
var PROCESS_STATE_COMPELET=3;//手术完成
var shoushu_patientid;
var HAOCAI_REPORT_PAGESIZE=15;//耗材打印报表每页显示条数
var findPatsInHospital='/publish/shoushu/findPatsInHospital.htm';
//var FIND_TJ_OPER_URL='/publish/shoushu/findTJOper.htm';
//4953571
var process_t='0';
//高值耗材添加
//列表中加入手术间
var saveorupdateaftercurrentpage;
$(document).ready(function(){
	importCSS("/css/jquery.datetimepicker.css");
	importJS("/js/jquery.datetimepicker.js");
});


function showOperationConsumableReport(){
	var dialog;
	var now = new Date();
	var endDate = formatDate(now.getTime());
	now.setDate(1);
	var startDate = formatDate(now.getTime());
	var div = $("<form />").attr("action",contextPath+FIND_OPERATIONCONSUMABLE_LIST_URL).attr("method","post").css("margin","5px").attr("id","HaoCaiBaobiao").ajaxForm({
		dataType : "json",
		beforeSubmit: function(){
			
		},
		success:function(data){
			var title = $("#HaoCaiBaobiao").find("input[name=startDate]").val()+"至"+$("#HaoCaiBaobiao").find("input[name=endDate]").val();
			title+="高值耗材报表";
			showReportTable(data,title);
			dialog.close();
		}
	});
	$("<input />").attr("name","pageSize").val(HAOCAI_REPORT_PAGESIZE).attr("type","hidden").appendTo(div);
	$("<input />").attr("name","currentPage").val(1).attr("type","hidden").appendTo(div);
	$("<span />").html("通用名：").appendTo(div);
	$("<input />").attr("name","consumable_name").width(88).appendTo(div);
	$("<span />").html("日期：").appendTo(div);
	$("<input />").attr("name","startDate").val(startDate).attr("type","text").width(88).appendTo(div);
	$("<span />").html("&nbsp;-&nbsp;").appendTo(div);
	$("<input />").attr("name","endDate").val(endDate).attr("type","text").css("margin-right","4px").width(88).appendTo(div);
	$("<input />").attr("name","used").attr("checked","checked").attr("id","used1").attr("type","radio").val(1).appendTo(div);
	$("<label />").attr("for","used1").html("耗材确认已用&nbsp;").appendTo(div);
	$("<input />").attr("name","used").attr("id","used0").attr("type","radio").val(0).appendTo(div);
	$("<label />").attr("for","used0").html("耗材暂未用&nbsp;").appendTo(div);
	dialog = $(div).oimsDialog({
		icon:"view",
		title:"生成报表",
		width:600,
		height:120,
		locked:true,
		button:[{
			title : "提交",//按纽文字
			func : function(){
				$("#HaoCaiBaobiao").submit();
			},//响应函数
			isCloseWin:false,//点击后，是否关闭窗口 true关闭，false不关闭
			className : "ok"//指定CSS名称
		  }]
	});
	
	function showReportTable(data,title){
		var div = $("div.haocaiReportDialog");
		if(!div.length){
			div = $("<div />").addClass("haocaiReportDialog");
			showPrintDialog(div,title);
		}
		var page = $("<div />").addClass("printPage").appendTo(div);
		$("<h1 />").text(title).appendTo(page);
		var table = $("<table />").width("100%").appendTo(page);
		var tr = $("<tr />").appendTo(table);
		var titles=[
		            {key:"code",title:"产品编码"},
		            {key:"regName",title:"注册名称"},
		            {key:"specification",title:"规格型号"},
		            {key:"sn",title:"产品批号"},
		            {key:"quantity",title:"数量"},
		            {key:"unit",title:"单位"},
		            {key:"patientNo",title:"患者ID"},
		            {key:"patientName",title:"患者姓名"},
		            {key:"sex",title:"患者性别",func:function(d){return d?"男":"女";}},
		            {key:"birthday",title:"患者年龄",func:function(d){return getAge(d.time)}}
		           ];
		$.each(titles, function(i,d){
			$("<th />").text(d.title).appendTo(tr);
		});
		$.each(data.list,function(_i,d){
			tr = $("<tr />").appendTo(table);
			$.each(titles,function(i,t){
				var val = "-";
				$.each(d,function(k,v){
					if(t.key==k){
						if(t.func)
							val=t.func(v);
						else 
							val = v;
						return false;
					}
				});
				$("<td />").html(val).appendTo(tr);
			});
		});
		$("<div />").css("text-align","center").text(data.page.currentPage+"/"+data.page.pageCount).appendTo(page);
		var ci = $("#HaoCaiBaobiao").find("input[name=currentPage]");
		if(data.page.pageCount>ci.val()){
			ci.val(ci.val+1);
			$("#HaoCaiBaobiao").submit();
		}
	}
}

/**
 * 显示手术耗材对话框
 */
function showOperationConsumableDialog(){
	var data = getCheckBoxValue();
	if(data.length!=1){
		$.oimsAlert("请选择一条手术记录！");
		return;
	}
	var obj = showFormDialog({
		width:1024,
		height:580,
		title:"手术高值耗材",
		beforeSubmit:function(){
			var snInput = obj.form.find("input[name=code]");
			if(!snInput.length){
				return false;
			}
			var s=true;
			$.each(snInput, function(i,input){
				if(!$.trim($(input).val()).length){
					s=false;
					$.oimsAlert("请输入耗材编码！");
					return s;
				}
			});
			return s;
		},
		submitCallBack:function(d){
			if(!d.state){
				$.oimsErr("保存失败！");
				return;
			}
			if(obj.form.find("input[name=used]").is(":checked") && obj.form.find("table#mingxi")){
				$.oimsConfirm("是否打印耗材明细？",function(){
					importCSS("/css/print.css");
					importJS("/js/LodopFuncs.js");
					var template = $("<div />").addClass("printPage").append(common_getHtmlTemplate(contextPath+"/js/manager/shoushu/template/patientConsumablePrint.html"));
					template.find("td#patientId").text(data[0].patientNo);
					template.find("td#patientName").text(data[0].patientName);
					var time = data[0].operationTime?formatDate(data[0].operationTime.time):"";
					template.find("td#operationDate").text(time);
					var tmx= obj.form.find("table#mingxi");
					var inputele = tmx.find("input[type=text]");
					$.each(inputele,function(i,input){
						var tag = $(input).parent();
						tag.text($(input).val());
					});
					$.each(tmx.find("tr"),function(i,tr){
						$(tr).children(":last").remove();
					});
					template.find("#consumable").append(tmx);
					var strStyleCSS="<link href='"+contextPath+"/css/print.css?tag="+Math.random()+"' type='text/css' rel='stylesheet'>";
	       			var strHtml=strStyleCSS+"<body>"+$("<div />").append(template)[0].innerHTML+"</body>"; 
	       			LODOP = getLodop();  
	       			LODOP.PRINT_INIT("OIMS打印");
	       			LODOP.ADD_PRINT_HTM(0,0,"90%","90%",strHtml);
	       			LODOP.SET_PRINT_PAGESIZE (2, 0, 0,"A4");
	       			LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","88%");
	       			LODOP.PRINT();	
	       			LODOP.PREVIEW();
	       			return true;
				});
			}
			shoushuJiluPageList();
		},
		templateUrl:TEMPLATE_OPERATION_CONSUMABLE_FORM,
		action:SAVE_OPERATIONCONSUMABLE_URL
	});
	var patientInfo = "患者ID："+data[0].patientNo+"，姓名："+data[0].patientName+"，性别："+(data[0].sex?"男":"女")+"，年龄："+getAge(data[0].birthday.time);
	obj.form.find("td#patientInfo").text(patientInfo);
	
	var operationNames="";
	$.each(data[0].operationDetails,function(i,d){
		if(i>0)operationNames+="+";
		operationNames+=d.name;
	});
	obj.form.find("td#operationNames").text(operationNames);
	obj.form.find("input[name=operationId]").val(data[0].id);
	switch(data[0].processState){
		case PROCESS_STATE_CLOSE:
			obj.form.find("input[name=used]").attr("checked","checked");
			break;
		case PROCESS_STATE_COMPELET:
			obj.form.find("input[name=used]").attr("checked","checked").attr("onclick","javascript:return false");
			break;
		default:
			obj.form.find("input[name=used]").attr("disabled","disabled");
	}
	var mxTable = obj.form.find("table#mingxi");
	var trAdd = mxTable.find("tr:last").clone();
	trAdd.find("input[type=text]").height("100%");
	mxTable.find("tr:first").children("th:last").children("a").click(function(){
		addTr();
	});
	mxTable.find("tr:last").remove();
	
	var re = getJSONData(FIND_OPERATIONCONSUMABLE_URL,{operationId:data[0].id});
	if(!re.state){
		$.oimsAlert("查询手术耗材失败！");
		return;
	}
	$.each(re.obj,function(i,d){
		addTr(d);
	});
	addTr();
	
	function addTr(d){
		var tr = trAdd.clone().appendTo(mxTable);
		tr.children("td:last").children("a").click(function(){
			tr.remove();
		});
		if(d)
			$.each(d,function(k,v){
				if(k=='expiDate')v=formatDate(v.time);
				var input = tr.find("input[name="+k+"]");
				if(input.length)input.val(v);
			});
	}
}

//TODO 上面的几个东东 下一步需存入数据库中

function setOperationUpdoing(){
	setOperationState(PROCESS_STATE_UNDOING);
}

function setOperationStateClose(){
	setOperationState(PROCESS_STATE_CLOSE);
}

function getOperationDetails(details){
	var s="";
	$.each(details,function(i,d){
		if(i>0)s+="+";
		var eye="";
		switch(d.eyes){
		case oimsCategory.DOUBLE_EYE:
			eye = "双眼";
			break;
		case oimsCategory.RIGHT_EYE:
			eye = "右眼";
			break;
		case oimsCategory.LEFT_EYE:
			eye = "左眼";
			break;
		}
		s+= eye;
		s += d.name;
	});
	return s;
}

/**
 * 今日手术安排
 */
function showOperationPlanToday(){
	var date = formatDate(new Date().getTime());
	showOperationPlanPrint(date+"手术安排",date+" 00:00",date+" 23:59");
}

/**
 * 明日手术安排
 */
function showOperationPlanTomorrow(){
	var date = new Date();
	date.setDate(date.getDate()+1);
	var t = formatDate(date.getTime());
	showOperationPlanPrint(t+"手术安排",t+" 00:00",t+" 23:59");
}

function showOperationPlanPrint(title, startDate, endDate){
	showOperationPrintPage(title,PROCESS_STATE_PLAN,null,startDate,endDate);
}

function showOperationPrintPage(title,processState, operationRoomId, startDate,endDate){
	importCSS("/css/print.css");
	importJS("/js/LodopFuncs.js");
	var template = common_getHtmlTemplate(contextPath+"/js/manager/shoushu/template/printPage.html");
	var pageDiv = $("<div />").addClass("printPage").append(template);
	
	var page=1;
	var printPage = $("<div />").attr("id","printTag");
	var dialog = printPage.oimsDialog({
		title:title,
		width:"1200",
		height:"600",
		locked:true,
		button:[{
		       		title : "打印",
		       		func : function(){
		       			var strStyleCSS="<link href='"+contextPath+"/css/print_operation.css?tag="+Math.random()+"' type='text/css' rel='stylesheet'>";
		       			var strHtml=strStyleCSS+"<body>"+printPage[0].innerHTML+"</body>"; 
		       			LODOP = getLodop();  
		       			LODOP.PRINT_INIT("OIMS打印");
		       			LODOP.ADD_PRINT_HTM(0,0,"100%","100%",strHtml);
		       			LODOP.SET_PRINT_PAGESIZE (2,'','',"A4");
//		       			LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","88%");
		       			LODOP.PRINT();	
		//       			LODOP.PREVIEW();
		       		},
		       		className : "print",
		       		isCloseWin:false
		       },{
		       		title : "关闭",
		       		func : function(){
		       			dialog.close();
		       		},
		       		className : "close"
		       }]
	});
	var cp;
	var n=0;
//	var array = [] ;
	while(true){
		cp = pageDiv.clone().appendTo(printPage);
		var table = cp.children("table");
		var re = getJSONData(FIND_OPERATION_URL,{pageSize:18,currentPage:page, process:processState,operationRoomId:operationRoomId, appointmentTimeStart:startDate, appointmentTimeEnd:endDate,isprint:true},"POST");
		n+=re.list.length;
//		array.reverse();
//		for(var i = 0 ;i<array.length ;i++){
//			$(array[i]).appendTo(table) ;
//		}
//		array.length=0;
		if(re.list.length==0)break;
		$.each(re.list,function(i,d){
			var tr = $("<tr style='height:24px'/>").appendTo(table);
			var category = getOperationCategoryByValue(d.category);
			$("<td />").text(category).appendTo(tr);
			$("<td />").text(d.urgent?'急':'-').appendTo(tr);
			var atime = d.operationTime;
			if(atime == null){
				atime = d.appointmentTime ;
			}
			$("<td />").text(formatDateTime(atime.time).substring(11)).appendTo(tr);
			$("<td />").text(getOperationRoomById(d.operationRoomId)).appendTo(tr);
			$("<td />").html(d.patientName+"，"+(d.sex?"男":"女")+"，"+getAge(d.birthday.time)).appendTo(tr);
			var local = d.area;
			if(d.bedNo>0)local+=d.bedNo;
			$("<td />").html(local).appendTo(tr);
			$("<td />").html(d.patientNo).appendTo(tr);
			var operationName = getOperationDetails(d.operationDetails);
			$("<td />").text(operationName).appendTo(tr);
			$("<td />").text(d.doctorName).appendTo(tr);
			var an = d.firstAssistantName;
			if(d.secondAssistantName) an += "&nbsp;"+d.secondAssistantName;
			$("<td />").html(an).appendTo(tr);
			$("<td />").text(d.circuitNurseName).appendTo(tr);
			$("<td />").text(getAnesthesiaById(d.anesthesia)).appendTo(tr);
			$("<td />").text(d.medical).appendTo(tr);
			$("<td />").text((d.note?d.note:'')+(d.nurse_note?d.nurse_note:'')+(d.geli_category?(d.geli_category==1?'HBV阳性':(d.geli_category==2?'ICT阳性':'其他传染病  ')):'')).appendTo(tr);
		});
		page++;
//		var tableHeight = $(table).innerHeight() ;
//		while (tableHeight>600) {
//			var tr = $(table).find('tr:last') ; //得到最后一个tr
//			tableHeight = tableHeight - $(table).find('tr:last').innerHeight() ;//设定新的tableheight
//			array.push(tr);
//			$(table).find('tr:last').remove() ;
//		}
		if(page>re.page.pageCount/*&&array.length==0*/){
			break;
		}
	}
	var titleDiv = $("<div />").css({"font-weight":"bold","text-align":"center","font-size":"17px"}).text(title).prependTo(".printPage");
	var roomName ="（全部）";
	if(operationRoomId!=null)roomName="（"+getOperationRoomById(operationRoomId)+"）";
	
	$("<a />").text(roomName).click(function(){
		var aTag = $(this);
		var div = aTag.parent().children(".operationRoomDiv");
		if(div.length){
			div.remove();
			return;
		}
		var closeMenu = false;
		var div = $("<div />").mouseout(function(){
			closeMenu = true;
			var m = $(this);
			setTimeout(function(){
				if(closeMenu)m.remove();
			},1000);
		}).mouseover(function(){
			closeMenu=false;
		}).css({left:$(this).position().left}).addClass("operationRoomDiv").appendTo(aTag.parent());
		$("<a />").attr("href","javascript:void(0)").text("全部").click(function(){
			aTag.parent().remove();
			showOperationPrintPage(title,processState,null,startDate,endDate);dialog.close();
		}).appendTo(div);
		$.each(operationRooms,function(i,d){
			$("<a />").attr("href","javascript:void(0)").text(d.name).click(function(){
				aTag.parent().remove();
				showOperationPrintPage(title,processState,d.id,startDate,endDate);
				dialog.close();
			}).appendTo(div);
		});
	}).appendTo(titleDiv);
	$("<span/>").text("(共"+n+"台)").appendTo(titleDiv);
}

function setOperationState(state){
	var ids="";
	var data = getCheckBoxValue();
	var r = false;
	$.each(data,function(i,d){
		if (i>0) ids += ",";
		if(d.processState==PROCESS_STATE_COMPELET){
			r=true;
			return false;
		}
		ids += d.id;
	});
	if(r){
		$.oimsAlert("手术已完成后不能更改状态！");
		return;
	}
	var re = getJSONData(SET_OPERATION_STATE_URL,{ids:ids,state:state});
	if(!re.state){
		$.oimsAlert("设置手术状态失败");
	}else{
		shoushuJiluPageList();
	}
}

/**
 * 显示手术预约列表
 * @param btns
 */
function shoushuYuyuePageList(btns){
	process_t='0';
	showShoushuPageList(btns,"手术预约列表",0);
	
}

/**
 * 手术申请列表
 */
function shoushuShenqingPageList(btns){
	process_t='0,1';
	showShoushuPageList(btns,"手术申请列表","0,1");
	
}
/**
 * 手术安排列表
 * @param btns
 */
function shoushuAnpaiPageList(btns){
	process_t='1,2';
	showShoushuPageList(btns,"手术安排列表","1,2");
	
}

/**
 * 手术记录列表
 * @param btns
 */
function shoushuJiluPageList(btns,currentPage){
	process_t='2,3,4,5,10';
	showShoushuPageList(btns,"手术记录","2,3,4,5,10",currentPage);
	
}

function showShoushuPageList(btns,title, process,currentPage){
	var shoushu_biaoji=true;
	importJS("/js/manager/shoushu/dataSetting.js");
	pageTitle = title;
	init();
	if(btns==undefined || btns==null)
		btns=currentBtns;
	else
		currentBtns=btns;
	
	var operationListObj = {
			url : contextPath + FIND_OPERATION_URL, // url
			method : "post",
			checkbox : true,
			single : true,
			listObj : [
			           {title:"加急",key:"urgent",func:function(d){
			        	   return d?"<font color=\"red\">急</font>":"-";
			           }},
			           {title:"患者ID",key:"patientNo"},
			           {title:"患者姓名",key:"patientName"},
			           {title:"性别", key:"sex", func:function(d){
			        	   return d?"男":"女";
			           }},
			          {title:"年龄",key:"birthday",func:function(d){
			        	  return getAge(d.time);
			          }},
			          {title:"手术室",key:"operationRoomId",func:function(d){
			        	  return getOperationRoomById(d);
			          }},
			          {title:"诊断",key:"medical"},
			          {title:"手术类别",key:"category",func:function(d){
			        	  return getOperationCategoryByValue(d);
			          }},
			          {title:"手术大小",key:"operationSize",func:function(d){
			        	  var s="-";
			        	  $.each(operationSizeValue,function(n,c){
			        		  if(c.value==d){
			        			  s=c.name;
			        			  return false;
			        		  }
			        	  });
			        	  return s;
			          }},
			          {title:"手术级别",key:"levelFlag",func:function(d){
			        	  var s="-";
			        	  $.each(operationLevelValue,function(n,c){
			        		  if(c.value==d){
			        			  s=c.name;
			        			  return false;
			        		  }
			        	  });
			        	  return s;
			          }},
			          {title:"手术名称",key:"operationDetails",func:function(v){
			        	  return getOperationDetails(v);
			          }},
			          {title:"手术预约时间",key:"appointmentTime"},
			          {title:"手术实际时间",key:"operationTime"},
			          {title:"麻醉方式",key:"anesthesia",func:function(d){
			        	  return getAnesthesiaById(d);
			          }},
			          {title:"主刀医生",key:"doctorName"},
			          {title:"专业组",key:"groupName"},
			          {title:"状态",key:"processState",func:function(d){
			        	  var s="-";
			        	  $.each(processStateValues,function(i,state){
			        		  if(state.value==d){
			        			  s=state.name;
			        			  return false;
			        		  }
			        	  });
			        	  return s;
			          }}
			          ],
			data : {// data表示传的参数
				currentPage : !currentPage?1:currentPage,
				pageSize : getPageSize()
			}
		};
	
	listFactor = operationListObj;
	var data = listFactor.data;
	data = $.extend(data,{process:process});//预约
	listFactor.data=data;
	var div = $("<div />").attr("id","advquery").addClass("advquery").append("<div style='clear:both'></div>").appendTo("#right");
	showSearchForm(div,listFactor);
	div = $("<div />").addClass("btn").prependTo(div);
	showMyBTNS(btns,div);
	if(title == "手术记录"){
		//加入安全核查与风险评估
		div.append('<a href="javascript:security_verification();"><span class="edit"></span>安全核查</a>');
		div.append('<a href="javascript:risk_assessment();"><span class="edit"></span>风险评估</a>');
	}
	//加入导出按钮
	div.append('<a href="javascript:operation_export();"><span class="export"></span>导出</a>');
	div.append('<a href="javascript:jingti_out();"><span class="edit"></span>晶体出库</a>');
	div.children("a").width(68);
	//第四个a后加入<br/>
	div.children("a:eq(5)").after("<br/>");
	div = $("<div />").attr("id","pageList").addClass("list").appendTo("#right");
	div.createPageList(listFactor);
	/*div.find("tr").children("td").dblclick(function(){
		var val = $(this).parent().find("input[name=checkBoxObj]").val();
		var d=eval("("+val+")");
		if(process=='0'){
			editShoushuYuyue(d);
		}else if(process=='0,1'){
			shoushuShenqing(d);
		}else if(process=='1,2'){
			shoushuAnpai(d);
		}else if(process=='2,3,4,5,10'){
			shoushuJilu(d);
		}
	});*/
	if(process=="1,2"||process=="2,3,4,5,10"){
		var option = {
				timepicker:false,
				onSelectDate:function(d){
					var date = formatDate(d);
					if(process=="1,2"){
						showOperationPlanPrint(date+"手术安排",date+" 00:00",date+" 23:59");
					} else {
						showOperationPrintPage(date+"手术记录", PROCESS_STATE_COMPELET, null, date+" 00:00",date+" 23:59")
					}
				}
			};
		var a = $("<a />").text("打印").appendTo(".advquery .btn").datetimepicker(option);
		$("<span />").addClass("print").prependTo(a);
	}
}
function security_verification(){//安全核查表
	var data = getCheckBoxValue();
	if(data.length==0){
		$.oimsAlert("请选择需要打印的对象！");
		return;
	}
	data = data[0];
	var datestr = (data.appointmentTime.year+1900) + "-" + ((data.appointmentTime.month + 1)<10?"0"+(data.appointmentTime.month + 1):(data.appointmentTime.month + 1)) + "-" + data.appointmentTime.date;
	var url = contextPath + '/js/manager/shoushu/template/aqhc.html';
	var printstr = common_getHtmlTemplate(url);
	if(printstr != null){
		//data.groupName 科室
		printstr = printstr.replace("#patientName",data.patientName).replace("#department","眼科").replace("#patientSex",data.sex?'男':'女')
		    .replace("#patientAge",getAge(data.birthday.time)+"岁").replace("#idnumber",data.patientNo).replace("#mzfunction",getAnesthesiaById(data.anesthesia))
		    .replace("#operationName",getOperationDetails(data.operationDetails)).replace("#operator",data.doctorName).replace("#operationDate",datestr);
		var printWindow = window.open("");
		printWindow.document.write(printstr);
	}
}

function risk_assessment(){//风险评估表
	var data = getCheckBoxValue();
	if(data.length==0){
		$.oimsAlert("请选择需要打印的对象！");
		return;
	}
	data = data[0];
	var bedNum = (data.bedNo == null || data.bedNo == undefined || data.bedNo == "" )? "&nbsp;&nbsp;&nbsp;&nbsp;" : data.bedNo;
	var datestr = (data.appointmentTime.year+1900) + "-" + ((data.appointmentTime.month + 1)<10?"0"+(data.appointmentTime.month + 1):(data.appointmentTime.month + 1)) + "-" + data.appointmentTime.date;
	var url = contextPath + '/js/manager/shoushu/template/fxpg.html';
	var printstr = common_getHtmlTemplate(url);
	if(printstr != null){
		//data.groupName 科室
		printstr = printstr.replace("#patientName",data.patientName).replace("#department","眼科").replace("#patientSex",data.sex?'男':'女')
		    .replace("#patientAge",getAge(data.birthday.time)+"岁").replace("#idnumber",data.patientNo).replace("#mzfunction",getAnesthesiaById(data.anesthesia))
		    .replace("#operationName",getOperationDetails(data.operationDetails)).replace("#operationlocation",data.yanbie+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;").replace("#bedNum",bedNum).replace("#operationFunction",getOperationDetails(data.operationDetails)).replace("#operationDate",datestr);
		var printWindow = window.open("");
		printWindow.document.write(printstr);
	}
}

function operation_export(){
	var data_search = operation_data_search();
	$.ajax({
		url : contextPath + "/publish/shoushu/operation_export.htm",
		data :data_search,
		async : false,
		type : 'POST',
		dataType : 'json',
		success : function(data) {
			if(data.state)
				location.href=contextPath+data.obj;
		}
	});

}
function jingti_out(){
	importJS("/js/manager/jingti/jingtiManager.js");
	jingtiChuku();
}
function operation_data_search(){
	var data_search={
			search:($.trim($("input[name=search]").val())=='请输入患者ID、患者姓名或手术名称检索')?'':$.trim($("input[name=search]").val()),
			strOperRooms:$("select[name=strOperRooms]").val(),
			category:$("select[name=category]").val(),
			deptId:$("select[name=deptId]").val(),
			//process:$("select[name=process]").val(),
	};
	if($("#operationName").length){
		$.extend(data_search,{operationName:$.trim($("#operationName").val())});
	}
	if($("select[name=levelFlag]").length){
		$.extend(data_search,{levelFlag:$("#levelFlag").val()});
	}
	if($("select[name=process]").length){
		$.extend(data_search,{process:$("select[name=process]").val()});
	}
	else{
		$.extend(data_search,{process:3});
	}
	if($("#appointmentTimeStart").length){
		$.extend(data_search,{appointmentTimeStart:$.trim($("#appointmentTimeStart").val())?($("#appointmentTimeStart").val()+" 00:00"):''});
	}
	if($("#appointmentTimeEnd").length){
		$.extend(data_search,{appointmentTimeEnd:$.trim($("#appointmentTimeEnd").val())?($("#appointmentTimeEnd").val()+" 23:59"):''});
	}
	if($("input[name=doctorName]").length){
		$.extend(data_search,{doctor:$.trim($("input[name=doctorName]").val())?($.trim($("input[name=doctorName]").val())):''});
	}
	if($("input[name=diseases]").length){
		$.extend(data_search,{diseases:$.trim($("input[name=diseases]").val())?($.trim($("input[name=diseases]").val())):''});
	}
	if($("select[name=operationSize]").length){
		$.extend(data_search,{operationSize:$("select[name=operationSize]").val()});
	}
	if($("select[name=circuitNurse]").length){
		$.extend(data_search,{circuitNurse:$("select[name=circuitNurse]").val()});
	}
	return data_search;
}
function showSearchForm(tag,listFactor){
	var normalText = "请输入患者ID、患者姓名或手术名称检索";
	var sDiv = $("<div />").css("float","left").prependTo(tag);
	var sInput = $("<input />").css("float","left").focusin(function(){
		$(this).removeClass("blurview").addClass("focus");
		var val = $(this).val();
		if(val==normalText)$(this).val("");
	}).blur(function(){
		var val = $(this).val();
		if(!val.length||val==normalText)$(this).val(normalText).removeClass("focus").addClass("blurview");
	}).addClass("blurview").width(200).css("margin","2px 4px").attr("name","search").val(normalText).appendTo(sDiv);
//	var sCategory=$("<select />").width(88).attr("name","category").css("float","left").css("margin","2px 4px").appendTo(sDiv);
//	$("<option />").val("").text("手术类别").appendTo(sCategory);
//	$.each(operationCategories,function(n,c){
//		  $("<option />").val(c.value).text(c.name).appendTo(sCategory);
//	});
	
//	var sDept=$("<select />").width(88).attr("name","deptId").css("float","left").css("margin","2px 4px").appendTo(sDiv);
//	var bumenList = getJSONData(FIND_OPERATION_GROUP_LIST_URL,{pageSize:100,currentPage:1},"POST");
//	$("<option />").val("").text("手术分组").appendTo(sDept);
//	$.each(bumenList.list,function(i,d){
//		$("<option />").val(d.id).text(d.name).appendTo(sDept);
//	});
	$('<span style="height:22px;width:40px;float:left;margin-top:2px;margin-left:4px;margin-bottom:2px;margin-right:4px;line-height:22px;text-align:center">时间:<span>').appendTo(sDiv);
	var appointmentTimeStart=$("<input type='text' style='width:75px;float:left;margin-top:2px;margin-left:4px;margin-bottom:2px;margin-right:4px'  class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='appointmentTimeStart' name='appointmentTimeStart'>").appendTo(sDiv);
	$('<span style="height:22px;width:20px;float:left;margin-top:2px;margin-left:4px;margin-bottom:2px;margin-right:4px;line-height:22px;text-align:center">至<span>').appendTo(sDiv);
	var appointmentTimeEnd=$("<input type='text' style='width:75px;float:left;margin-top:2px;margin-left:4px;margin-bottom:2px;margin-right:4px'  class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='appointmentTimeEnd' name='appointmentTimeEnd'>").appendTo(sDiv);
	calendarEMR_FOLLOWED("appointmentTimeStart");//手术安排时间
	calendarEMR_FOLLOWED("appointmentTimeEnd");// 手术结束时间
	$("#appointmentTimeStart").val(formatDate(new Date()));
	$('<br />').appendTo(sDiv);
	var operation_rooms=$("<select />").width(68).attr("name","strOperRooms").css("float","left").css("margin","2px 4px").appendTo(sDiv);
//	var bumenList = getJSONData(FIND_OPERATION_GROUP_LIST_URL,{pageSize:100,currentPage:1},"POST");
	$("<option />").val("1,2,3,4,5,6,7").text("手术室").appendTo(operation_rooms);
	$.each(operationRooms,function(i,d){
		$("<option />").val(d.id).text(d.name).appendTo(operation_rooms);
	});
	
	var sState=$("<select />").width(88).attr("name","process").css("float","left").css("margin","2px 4px").appendTo(sDiv);
	$("<option />").val(listFactor.data['process']).text("状态").appendTo(sState);
	$.each(processStateValues,function(n,c){
		  $("<option />").val(c.value).text(c.name).appendTo(sState);
	});
	$("<input type='checkbox' value='true' name='urgent' id='urgent'  style='height:22px;width:20px;float:left;margin-top:2px;margin-right:4px;margin-bottom:2px;margin-left:4px;'/>").appendTo(sDiv);
	$("<label for='urgent' style='text-align:center;float:left;color:red; font-weight:bold;height:22px;width:30px;float:left;margin-top:2px;margin-right:4px;margin-bottom:2px;margin-left:4px;'>急诊</label>").appendTo(sDiv);
	$('<a class="search" href="javascript:void(0);">查询</a>').css("float","left").click(function(){
		var sval = sInput.val();
		if(sval==normalText)sval="";
		var data = listFactor.data;
		data = $.extend(data,{search:sval,urgent:$('div.advquery').find("input[name=urgent]").is(":checked")?true:false,appointmentTimeStart:(appointmentTimeStart.val()?(appointmentTimeStart.val()+" 00:00"):''),appointmentTimeEnd:(appointmentTimeEnd.val()?(appointmentTimeEnd.val()+" 23:59"):''),strOperRooms:operation_rooms.val(),process:sState.val()});//预约
		listFactor.data=data;
		$("#pageList").createPageList(listFactor);
	}).appendTo(sDiv);
//	$('<a  href="javascript:senior_operation_search();" class="advsearch" >高级查询</a>').css("float","left").appendTo(sDiv);
}
function senior_operation_search(){
	var seniorSearchTemplate = senior_operation_table();// 创建高级查询表格
	$.oimsBox({
		parentDiv : "advquery",// 将生成内容添加的id
		divContent : seniorSearchTemplate
	});
	calendarEMR_FOLLOWED("appointmentTimeStart");// 开始注册日期
	calendarEMR_FOLLOWED("appointmentTimeEnd");// 结束注册日期

}
function senior_operation_table(){

	var rt = "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
			+ " <tr>"
			+ "<td width='7%' nowrap='nowrap' align='right'>"
			+ "手术名称"
			+ "：</td>"
			+ "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='operationName' name='operationName'>"
			+ "</td>"
			+ "<td width='7%' nowrap='nowrap' align='right'> "
			+ "手术级别"
			+ "：</td>"
			+ "<td width='15%'><select id='levelFlag'><option></option><option value='0'>一级手术</option ><option value='1'>二级手术</option><option value='2'>三级手术</option><option value='3'>四级手术</option></select></td>"
			+ "<td width='7%' nowrap='nowrap' align='right'>"
			+ "手术日期"
			+ "：</td>"
			+ "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='appointmentTimeStart' name='appointmentTimeStart'>"
			+ "</td>"
			+"<td nowrap='nowrap' align='right'>至</td>"
			+ "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='appointmentTimeEnd' name='appointmentTimeEnd'>"
			+ "</td>"
			+ "<td width='7%' nowrap='nowrap' align='right'>"
			+ "手术医生"
			+ "</td>"
			+ "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='doctor' name='doctor'>"
			+ "</td>"
			+ "</tr>"
			+ "</table>"
			+ " <div class='avdopenbutton' >"
			+ " <a href='javascript:senior_operation_submit();'><span class='advsumit'></span>"
			+ "提交"
			+ "</a>"
			+ " <a href='javascript:senior_operation_reset();'><span class='advreset'></span>"
			+ "重置" + "</a>" + "<a id = 'closeId'><span class='close' ></span>"
			+ "关闭" + "</a>" + " </div> ";
	var table = $(rt);
	return table;

}
function senior_operation_submit(){
	var operationListObj = {
			url : contextPath + FIND_OPERATION_URL, // url
			method : "post",
			checkbox : true,
			single : false,
			listObj : [
			           {title:"加急",key:"urgent",func:function(d){
			        	   return d?"<font color=\"red\">急</font>":"-";
			           }},
			           {title:"患者ID",key:"patientNo"},
			           {title:"患者姓名",key:"patientName"},
			           {title:"性别", key:"sex", func:function(d){
			        	   return d?"男":"女";
			           }},
			          {title:"年龄",key:"birthday",func:function(d){
			        	  return getAge(d.time);
			          }},
			          {title:"诊断",key:"medical"},
			          {title:"手术类别",key:"category",func:function(d){
			        	  return getOperationCategoryByValue(d);
			          }},
			          {title:"手术大小",key:"operationSize",func:function(d){
			        	  var s="-";
			        	  $.each(operationSizeValue,function(n,c){
			        		  if(c.value==d){
			        			  s=c.name;
			        			  return false;
			        		  }
			        	  });
			        	  return s;
			          }},
			          {title:"手术级别",key:"levelFlag",func:function(d){
			        	  var s="-";
			        	  $.each(operationLevelValue,function(n,c){
			        		  if(c.value==d){
			        			  s=c.name;
			        			  return false;
			        		  }
			        	  });
			        	  return s;
			          }},
			          {title:"手术名称",key:"operationDetails",func:function(v){
			        	  return getOperationDetails(v);
			          }},
			          {title:"手术预约时间",key:"appointmentTime"},
			          {title:"手术实际时间",key:"operationTime"},
			          {title:"主刀医生",key:"doctorName"},
			          {title:"专业组",key:"groupName"},
			          {title:"状态",key:"processState",func:function(d){
			        	  var s="-";
			        	  $.each(processStateValues,function(i,state){
			        		  if(state.value==d){
			        			  s=state.name;
			        			  return false;
			        		  }
			        	  });
			        	  return s;
			          }}
			          ],
			data : {// data表示传的参数
				currentPage : 1,
				pageSize : getPageSize()
			}
		};
	listFactor = operationListObj;
	var data_search = {};
	var operationName = $.trim($("#operationName").val())?$("#operationName").val():'';
	var levelFlag=$("#levelFlag").val();
	var appointmentTimeStart=$("#appointmentTimeStart").val()?($("#appointmentTimeStart").val()+" 00:00"):'';
	var appointmentTimeEnd=$("#appointmentTimeEnd").val()?($("#appointmentTimeEnd").val()+" 23:59"):'';
	var doctor=$("#doctor").val();
	data_search = {
			operationName : operationName,
			levelFlag:levelFlag,
			appointmentTimeStart:appointmentTimeStart,
			appointmentTimeEnd:appointmentTimeEnd,
			doctor:doctor,
			process:process_t
			
	};
	data = $.extend(listFactor.data,data_search);
	$("#pageList").createPageList(listFactor);
}
function senior_operation_reset(){}
function deleteOperation(){
	var data = getCheckBoxValue();
	if(data.length==0){
		$.oimsAlert("请选择要编辑的对象！");
		return;
	}
	$.oimsConfirm("确定要删除吗？",function(){
		var re = getJSONData(DELETE_OPERATION_URL,{id:data[0].id},"POST");
		var msg ;
		if(re.state){
			msg="删除成功！";
			shoushuYuyuePageList();
		}else{
			msg="删除失败！";
		}
		$.oimsAlert(msg);
	});
}

/**
 * 添加手术字典
 */
function addShoushuDict(){
	pageTitle = "手术字典添加";
	init();
	showShoushuDictForm(null);
}

/**
 * 修改手术字典
 */
function editShoushuDict(){
	var data = getCheckBoxValue();
	if(data.length==0){
		$.oimsAlert("请选择要编辑的对象！");
		return;
	}
	pageTitle = "手术字典编辑";
	init();
	showShoushuDictForm(data[0]);
}

function showShoushuDictForm(data){
	var setting = {
			action:SAVE_OR_UPDATE_OPERATION_DICT_URL,
			saveCallback:function(data){
				shoushuDictPageList(null);
			}
	}
	showFormByHtmlTemplate("#right",TEMPLATE_OPERATION_DICT_FORM_URL,setting,data);
}

/**
 * 删除手术字典
 */
function deleteShoushuDict(){
	var data = getCheckBoxValue();
	if(data.length==0){
		$.oimsAlert("请选择要编辑的对象！");
		return;
	}
	if(data.length>1){
		$.oimsAlert("每次只能删除一个对象！");
		return;
	}
	var id = data[0].id
	$.oimsConfirm("确认要删除手术字典吗，删除后可能造成记录错误！",function(){
		var d = getJSONData(DELETE_OPERTION_DICT_URL,{id:id},"POST");
		if(!d.state){
			$.oimsAlert("删除手术字典失败！");
		}else{
			shoushuDictPageList(null);
		}
	});
}

/**
 * 入口 手术字典管理
 * @param btns
 */
function shoushuDictPageList(btns){
	
	importJS("/js/manager/shoushu/dataSetting.js");
	if(btns==undefined || btns==null)
		btns=currentBtns;
	else
		currentBtns=btns;
	pageTitle = "手术字典管理";
	init();
	listFactor = {
			url : contextPath + FIND_OPERATION_DICT_URL, // url
			method : "post",
			checkbox : true,
			single : true,
			listObj : [
			           {title:"ID",key:"id"},
			           {title:"手术名称",key:"name"},
			           {title:"手术大小",key:"operationSize",func:function(d){
			        	   return getOperationSizeByValue(d);
			           }},
			           {title:"手术分级", key:"levelFlag", func:function(d){
			        	   return getOperationLevelByValue(d);
			           }},
			          {title:"收费编码", key:"priceCode"},
			          {title:"金额", key:"price"}
			          ],
			data : {// data表示传的参数
				currentPage : 1,
				pageSize : getPageSize()
			}
		};
	var div = $("<div />").attr("id","advquery").addClass("advquery").append("<div style='float:left;width:40%;'><input type='text' style='width:60%;float:left;' value='"
			+ "请输入手术名称或短码"
			+ "' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" id='search_operation_dict' class='blurview' name='search_operation_dict'>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:searchOperationDict();' class='search' style='float:right;'>"
			+ "查询"
			+ "</a></div>").appendTo("#right");
	div = $("<div />").addClass("btn").css("float","right").prependTo(div);
	showMyBTNS(btns,div);
	div = $("<div />").attr("id","pageList").addClass("list").css("clear","both").appendTo("#right");
	div.createPageList(listFactor);
	
	$("#search_operation_dict").click(function() {
		clearInitQuery(this);
	});
	$("#search_operation_dict").blur(function() {
		if (this.value == "") {
			$("#search_operation_dict").val("请输入手术名称或短码");
			$("#search_operation_dict").addClass("blurview");
		}
	});
	$("#search_operation_dict").bind("keyup", function(e) {
		if (e.which == 13) {
			searchOperationDict();
		}
	});
}

/**
 * 查询手术字典
 * */
function searchOperationDict(){
	var search = $("#search_operation_dict").val().indexOf("请输入") != -1 ? ""
			: $("#search_operation_dict").val();
	var searchs = {
		inputCode : search
	};
	$.extend(listFactor.data, searchs);
	$("#pageList").createPageList(listFactor);

	
}

/**
 * 添加手术预约
 */
function addShoushuYuyue(){
	showSaveOrUpdateOpertionForm("手术预约");
}

/**
 * 手术预约修改
 */
function editShoushuYuyue(d){
	if(!d){
		var data = getCheckBoxValue();
		if(data.length==0){
			$.oimsAlert("请选择要编辑的对象！");
			return;
		}
		if(data.length>1){
			$.oimsAlert("每次只能删除一个对象！");
			return;
		}
		d = data[0];
	}
	var appointmentTime = d.appointmentTime!=null?formatDateTime(d.appointmentTime.time).substring(0,16):"";
	d = $.extend(d,{age:getAge(d.birthday.time),sex:(d.sex?"男":"女"),appointmentTime:appointmentTime});
	showSaveOrUpdateOpertionForm("手术预约修改",d);
}
/**
 * 预约表单验证
 * @returns {Boolean}
 */
function operationFormValidate(){
	if(!$("input[name=patientId]").val().length){
		$.oimsAlert("请选择患者！");
		return false;
	}
	if(!$("input[name=category]:checked").length){
		$.oimsAlert("请选择手术类别！");
		return false;
	}
	var operationNames = $("#operationNameDiv").find("li");
	if(!operationNames.length){
		$.oimsAlert("请选择预约手术名称！");
		return false;
	}
	var m = $.trim($("input#medical").val());
	if(!m.length){
		$.oimsAlert("请输入患者诊断！");
		return false;
	}
	var doctor = $("select#doctor").val();
	if(doctor==""){
		$.oimsAlert("请选择主刀医生！");
		return false;
	}
	var appointmentDate = $("input[name=appointmentDate]").val();
	if(appointmentDate==""){
		$.oimsAlert("请输入手术日期！");
		return false;
	}
	var appointmentTime0 = $("input[name=appointmentTime0]").val();
	if(appointmentTime0==""){
		$.oimsAlert("请输入手术时间！");
		return false;
	}
	
	//new Date(Date.parse(str.replace(/-/g,"/")));
	//var da = new Date().format('yyyy-MM-dd hh:mm:ss'); //将日期格式串,转换成先要的格式
	/*var date = new Date();
	if(userData.role==oimsCategory.ssshs_role||userData.role==oimsCategory.zy_role){
		
	}
	else if(!form.find("input[name=urgent]").is(":checked")&&form.find("input[name=category]:checked").val()=="1"){
		var d = date.getDate()+MINI_READY_FOR_OPERATION;
		if(date.getHours()>=17)
			d++;
		date.setDate(d);
	}
	var minDate= date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();*/
	
	//处理手术申请中  普通手术下午五点后提交的bug问题
	//需要判断是在手术申请列表中
	if($(".opentitle") != undefined && $(".opentitle") != null && $(".opentitle").eq(0).html().indexOf("手术申请") != -1){
		var date = new Date();
		if(userData.role==oimsCategory.ssshs_role||userData.role==oimsCategory.zy_role){
			
		}
		else if(!form.find("input[name=urgent]").is(":checked")){
			var d = date.getDate()+MINI_READY_FOR_OPERATION;
			if(date.getHours()>=17)
				d++;
			date.setDate(d);
		}
		var minDate= date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
		var dateMin = new Date(Date.parse(minDate.replace(/-/g,"/")));
		var dateSubmit = new Date(Date.parse(appointmentDate.replace(/-/g,"/")));
		if(dateMin > dateSubmit){
			$.oimsAlert("五点后只能处理急诊！");
			return false;
		}
	}
	//以上需要判断是在手术申请列表中
	
	return true;
}

function showSaveOrUpdateOpertionForm(title,data){
	var div = $("<div />");
	var dialog = div.oimsDialog({
		 width:698,
		 height:528,
		 icon:"view",
		 title:title,
		 locked:true,
		 button:[{
			title : "提交",
			func : function(){div.find("form").submit()},
			className : "ok",
			isCloseWin:false
		  }]
	});
	var setting = {
		action:SAVE_OR_UPDATE_OPERATION_URL,
		beforeSubmit : function(d){
			return operationFormValidate();
			//TODO 其它验证暂时未写
		},
		saveCallback:function(data){
			dialog.close();
			if(oims_currentPage==1){
				$($("#advquery").find('a[class=search]')[0]).click();
			}
			else{
				$("input[name=page]").val(oims_currentPage);
				$("#go").click();
			}
		}
	}
	
	var form = showFormByHtmlTemplate(div,TEMPLATE_OPERATION_FORM_URL,setting,data);
	showOperationDictList(form, data);
	initAppointmentDateTime(form,data);
}

function initOperationDateTime(form, data){
	var dateInput0 = form.find("input#operationDate");
	var timeInput0 = form.find("input#operationTime0");
	var valInput0 = form.find("input#operationTime");
	
	var dateInput1 = form.find("input#operationCompleteDate");
	var timeInput1 = form.find("input#operationCompleteTime0");
	var valInput1 = form.find("input#operationCompleteTime");
	
	if(data==null){
		form.find("input#appointmentDate").blur(function(){
			if(isDate($(this).val())){
				dateInput0.val($(this).val());
				dateInput1.val($(this).val());
			}
		});
		return;
	}
	if(data.operationTime!=null){
		var s0 = data.operationTime.split(" ");
		dateInput0.val(s0[0]);
		timeInput0.val(s0[1]);
	}else{
		if(data.appointmentTime!=null){
			var appointmentTime = data.appointmentTime;
			var s0 = appointmentTime.split(" ");
			dateInput0.val(s0[0]);
			timeInput0.val(s0[1]);
			valInput0.val(appointmentTime);
		}
	}
	if(data.operationCompleteTime!=null){
		var s1 = data.operationCompleteTime.split(" ");
		dateInput1.val(s1[0]);
		timeInput1.val(s1[1]);
	}else{
		if(data.appointmentTime!=null){
			var appointmentTime = data.appointmentTime;
			var s1 = appointmentTime.split(" ");
			dateInput1.val(s1[0]);
		}
	}
	initDateAndTimeInput(form, dateInput0, timeInput0, valInput0,function(){},function(){});
	
	initDateAndTimeInput(form, dateInput1, timeInput1, valInput1,function(){},function(){});
}
function initAppointmentDateTime(form,data){
	var dateInput = form.find("input#appointmentDate");
	var timeInput = form.find("input#appointmentTime0");
	var valInput = form.find("input#appointmentTime");
	var dateInputOnShowFunc = function(){
		var date = new Date();
		if(userData.role==oimsCategory.ssshs_role||userData.role==oimsCategory.zy_role){
			
		}
		//else if(!form.find("input[name=urgent]").is(":checked")&&form.find("input[name=category]:checked").val()=="1"){
		//2019年3月22日 修改 ， 门诊患者也判断17点 ，17点以后不得申请第二天手术
		else if(!form.find("input[name=urgent]").is(":checked")){
			var d = date.getDate()+MINI_READY_FOR_OPERATION;
			if(date.getHours()>=17)
				d++;
			date.setDate(d);
		}
		var minDate= date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
		this.setOptions({minDate:minDate});
	};
	var timeInputOnShowFunc = function(){
		
	};
	initDateAndTimeInput(form, dateInput, timeInput, valInput,dateInputOnShowFunc,timeInputOnShowFunc);
	if(data!=null && data.appointmentTime!=null){
		var appointmentTime = data.appointmentTime;
		var s0 = appointmentTime.split(" ");
		dateInput.val(s0[0]);
		timeInput.val(s0[1]);
	}
}

function initDateAndTimeInput(form, dateInput, timeInput, valInput,dateInputOnShowFunc, timeInputOnShowFunc){
	dateInput.blur(function(){
		if($(this).val().length)setInputValDateTime(form);
	});
	datetimepicker(dateInput,{
		todayButton:false,
		defaultSelect:false,
		timepicker:false,
		format:'Y-m-d',
		onShow:dateInputOnShowFunc,
		onSelectDate:function(){
			setInputValDateTime(form);
		}
	});
	timeInput.focusin(function(){
		if(!isDate(dateInput.val())){
			$.oimsAlert("请先设置手术日期！");
			dateInput.focus();
			return;
		}
	}).keydown(function(key){
		var keys0=[8,37,39,46];
		if(containArray(keys0,key.keyCode))return true;
		var keys1=[48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105];
		var v = $(this).val();
		if(!containArray(keys1,key.keyCode)/*||v.length==5*/)
			return false;
	}).keyup(function(key){
		var v = $(this).val();
		var n = v.length;
		var vs = v.split(":");
		var h = vs[0];
		if(key.keyCode!=8){
			if(n==2 && vs.length==1){
				if(parseInt(v)>23)
					$(this).val(v.substring(0,1));
				else
					$(this).val(v+":");
				$(this).focus();
			}
		}
		if(n<4) return true;
		if(parseInt(h)>23){
			h=h.substring(0,1);
		}
		var m="00";
		if(vs.length==2){
			m=vs[1]
			if (parseInt(m)>59){
				m=m.substring(0,1);
			}
		}
		
		$(this).val(h+":"+m);
	}).blur(function(){
		if($(this).val().length)setInputValDateTime(form);
	});
	datetimepicker(timeInput,{
		todayButton:false,
		defaultSelect:false,
		datepicker:false,
		format:'H:i',
		onShow:timeInputOnShowFunc,
		onSelectDate:function(){
			setInputValDateTime(form);
		}
	});
	
	function setInputValDateTime(form){
		var time = $.trim(timeInput.val());
		var date = $.trim(dateInput.val());
		if(!isDate(date)){
			$.oimsAlert("手术日期格式不正确！");
			valInput.val("");
			return;
		}
		if(!time.length){
			time = "00:00";
		}
		var vs = time.split(":");
		if(vs.length!=2 || parseInt(vs[0])>23||parseInt(vs[1])>59){
			$.oimsAlert("手术时间格式不正确！");
			valInput.val("");
			return;
		}
		valInput.val(date+" "+time);
	}
}
function addShoushuShenqing(){
	showSaveOrUpdateOpertionApplicationForm("新增手术申请");
}

/**
 * 手术申请
 */
function shoushuShenqing(d){
	if(!d){
		var data = getCheckBoxValue();
		if(data.length==0){
			$.oimsAlert("请选择要编辑的对象！");
			return;
		}
		if(data.length>1){
			$.oimsAlert("每次只能删除一个对象！");
			return;
		}
		d = data[0];
	}
	var time = d.appointmentTime!=null?formatDateTime(d.appointmentTime.time).substring(0,16):"";
	d = $.extend(d,{appointmentTime:time,age:getAge(d.birthday.time),sex:(d.sex?"男":"女")});
	showSaveOrUpdateOpertionApplicationForm("手术申请",d);
}

function showSaveOrUpdateOpertionApplicationForm(title,data){
	var div = $("<div />");
	var dialog = div.oimsDialog({
		 width:698,
		 height:528,
		 icon:"view",
		 title:title,
		 locked:true,
		 button:[{
			title : "提交",
			func : function(){div.find("form").submit()},
			className : "ok",
			isCloseWin:false
		  }]
	});
	
	var setting = {
		action:SAVE_OR_UPDATE_OPERATION_APPLICATION_URL,
		beforeSubmit : function(d){
			return operationFormValidate();
			//TODO 其它验证暂时未写
		},
		saveCallback:function(data){
			dialog.close();
			if(oims_currentPage==1){
				$($("#advquery").find('a[class=search]')[0]).click();
			}
			else{
				$("input[name=page]").val(oims_currentPage);
				$("#go").click();
			}
		}
	}
	var form = showFormByHtmlTemplate(div,TEMPLATE_OPERATION_APPLICATION_FORM_URL,setting,data);
	showOperationDictList(form, data);
	showOperationAnesthesia(form,data);
	initAppointmentDateTime(form,data);
}

function addShoushuAnpai(){
	showSaveOrUpdateOpertionPlanForm("新增手术安排");
}
/**
 * 手术安排
 */
function shoushuAnpai(data){
	var d=data;
		if(!d){
		var data = getCheckBoxValue();
		if(data.length==0){
			$.oimsAlert("请选择要安排的对象！");
			return;
		}
		if(data.length>1){
			$.oimsAlert("每次只能安排一个对象！");
			return;
		}
		d = data[0];
	}
	var time = "";
	if(d.appointmentTime){
		time = formatDateTime(d.appointmentTime.time).substring(0,16);
	}
	d = $.extend(d,{appointmentTime:time,age:getAge(d.birthday.time),sex:(d.sex?"男":"女")});
	showSaveOrUpdateOpertionPlanForm("手术安排",d);
}
function operationPlanFormValidate(){
	
	if(!operationFormValidate())return false;
	var groupId = $("select#groupId").val();
	if(groupId==null||groupId==""){
		$.oimsAlert("请选择手术专业组！");
		return false;
	}
	var doctor = $("select#doctor").val();
	if(doctor==null||doctor==""){
		$.oimsAlert("请选择主刀医生！");
		return false;
	}
	if($("#isPlanCancel").length&&$("#isPlanCancel").attr("checked")){
		return true;
	}
	var circuitNurse = $("select#circuitNurse").val();
	if(circuitNurse==null || !circuitNurse.length){
		$.oimsAlert("请选择巡回护士！");
		return false;
	}
	var operationRoomId = $("select#operationRoomId").val();
	if(operationRoomId==null || operationRoomId==""){
		$.oimsAlert("请选择手术间！");
		return false;
	}
	return true;
}

function showSaveOrUpdateOpertionPlanForm(title,data){
	var div = $("<div />");
	var dialog = div.oimsDialog({
		 width:698,
		 height:528,
		 icon:"view",
		 title:title,
		 locked:true,
		 button:[{
			title : "提交",
			func : function(){div.find("form").submit()},
			className : "ok",
			isCloseWin:false
		  }]
	});
	
	var setting = {
		action:SAVE_OR_UPDATE_OPERATION_PLAN_URL,
		beforeSubmit : function(d){
			//return operationPlanFormValidate();
			//TODO 其它验证暂时未写
			if(operationPlanFormValidate()){
				if(data){
					//移除某些表单disabled属性
					$("#area").removeAttr("readonly");
					$("#bedNo").removeAttr("readonly");
					$("#urgent").removeAttr("readonly");
					$("#isolation").removeAttr("readonly");
					$("#condition").removeAttr("readonly");
					$("#medical").removeAttr("readonly");
					$("#levelFlag").removeAttr("readonly");
					$("#appointmentDate").removeAttr("readonly");
					$("#groupId").removeAttr("readonly");
					$("#doctor").removeAttr("readonly");
				//	$("#firstAssistant").removeAttr("readonly");
				//	$("#secondAssistant").removeAttr("readonly");
					$("#anesthesia").removeAttr("readonly");
				//	$("#circuitNurse").removeAttr("readonly");
				//	$("#instrumentNurse").removeAttr("readonly");
					$("#anesthetist").removeAttr("readonly");
				//	$("#operationRoomId").removeAttr("readonly");
				//	$("#drugResistanceBacteriaCarrier").removeAttr("readonly");
				//	$("input[name=category]").removeAttr("readonly");
					$("#operationSize").removeAttr("readonly");
					return true;
				}else{
					return true;
				}
			}else{
				return false;
			}
		},
		saveCallback:function(data){
			dialog.close();
			if(oims_currentPage==1){
				$($("#advquery").find('a[class=search]')[0]).click();
			}
			else{
				$("input[name=page]").val(oims_currentPage);
				$("#go").click();
			}
		}
	}
	var form = showFormByHtmlTemplate(div,!data?TEMPLATE_OPERATION_PLAN_FORM_URL:TEMPLATE_OPERATION_PLAN_UPDATE_FORM_URL,setting,data);
	showOperationDictList(form, data);
	showOperationAnesthesia(form,data);
	var roomSelect = form.find("select#operationRoomId");
	$.each(operationRooms,function(i,r){
		$("<option />").val(r.id).text(r.name).appendTo(roomSelect);
	});
	if(data!=null&&data.operationRoomId!=null)roomSelect.val(data.operationRoomId);
	initAppointmentDateTime(form,data);
	//如果data存在
	if(data){
		//是医生还是护士
		if(currentStaff.category==oimsCategory.YUANGONG_YISHENG){
			$("#nurse_note").attr("readonly","readonly");
		}
		else if(currentStaff.category==oimsCategory.YUANGONG_HUSHI){
			$("#note").attr("readonly","readonly");
		}
	}
		
	
}

function shoushuJilu(d){
	if(!d){
		var data = getCheckBoxValue();
		if(data.length==0){
			$.oimsAlert("请选择要记录的对象！");
			return;
		}
		if(data.length>1){
			$.oimsAlert("每次只能选择一个对象！");
			return;
		}
		d = data[0];
	}
	var time = "";
	if(d.appointmentTime!=null){
		time = formatDateTime(d.appointmentTime.time).substring(0,16);
	}
	d = $.extend(d,{appointmentTime:time,age:getAge(d.birthday.time),sex:(d.sex?"男":"女")});
	if(d.operationTime!=null){
		var operationTime = formatDateTime(d.operationTime.time).substring(0,16);
		var completeTime = "";
		if(d.operationCompleteTime!=null)completeTime=formatDateTime(d.operationCompleteTime.time).substring(0,16);
		$.extend(d,{operationTime:operationTime,operationCompleteTime:completeTime});
	}
	showSaveOrUpdateOpertionRecordForm("手术记录",d);
	
}

function opertionRecordFormValidate(){
	if(!operationPlanFormValidate())return false;
//	if(!$("input#medicalAfter").val().length){
//		$.oimsAlert("请输入术后诊断！");
//		return false;
//	}
	if(!$("input[name=processState]:checked").length){
		$.oimsAlert("请选择手术状态！");
		return false;
	}
	if($("input[name=processState]:checked").val()==PROCESS_STATE_COMPELET){
		var startTime = $.trim($("input[name=operationTime]").val());
		var endTime = $.trim($("input[name=operationCompleteTime]").val());
		if(!startTime.length||!endTime.length){
			$.oimsAlert("请选择手术起止时间！");
			return false;
		}
		if(!compareTime(startTime+":00",endTime+":59")){
			$.oimsAlert("手术起止时间不正确！");
			return false;
		}
	}
	if($("input[name=quantity]").length){
		//有一个的数量不是正数,return false;
		var b=true;
		$.each($("input[name=quantity]"),function(i,n){
			var q=$(n).val();
			if(q.isNaN()||q<=0.0){
				$.oimsAlert("耗材数量不正确！");
				b=false;
			}
			return false;
		});
		return b;
	}
	return true;
}

function showSaveOrUpdateOpertionRecordForm(title, data){
	var div = $("<div />");
	var dialog = div.oimsDialog({
		 width:698,
		 height:528,
		 icon:"view",
		 title:title,
		 locked:true,
		 button:[{
			title : "提交",
			func : function(){div.find("form").submit()},
			className : "ok",
			isCloseWin:false
		  }]
	});
	
	var setting = {
		action:SAVE_OR_UPDATE_OPERATION_RECORD_URL,
		beforeSubmit : function(d){
//			//TODO 其它验证暂时未写
//			return opertionRecordFormValidate();
			if(opertionRecordFormValidate()){
				//移除某些表单disabled属性
				$("#area").removeAttr("readonly");
				$("#bedNo").removeAttr("readonly");
				$("#urgent").removeAttr("readonly");
				$("#isolation").removeAttr("readonly");
				$("#condition").removeAttr("readonly");
				$("#medical").removeAttr("readonly");
				$("#levelFlag").removeAttr("readonly");
				$("#appointmentDate").removeAttr("readonly");
				$("#groupId").removeAttr("readonly");
				$("#doctor").removeAttr("readonly");
//				$("#firstAssistant").removeAttr("disabled");
//				$("#secondAssistant").removeAttr("disabled");
				$("#anesthesia").removeAttr("readonly");
//				$("#circuitNurse").removeAttr("disabled");
//				$("#instrumentNurse").removeAttr("disabled");
				$("#anesthetist").removeAttr("readonly");
//				$("#operationRoomId").removeAttr("disabled");
//				$("#drugResistanceBacteriaCarrier").removeAttr("disabled");
//				$("input[name=processState]").removeAttr("disabled");
//				$("#operationDate").removeAttr("disabled");
//				$("#operationTime0").removeAttr("disabled");
//				$("#operationCompleteDate").removeAttr("disabled");
//				$("#operationCompleteTime0").removeAttr("disabled");
//				$("#input[name=category]").removeAttr("disabled");
//				$("#note").removeAttr("disabled");
//				$("#nurse_note").removeAttr("disabled");
				$("#operationSize").removeAttr("readonly");
				return true;
			}else{
				return false;
			}
		},
		saveCallback:function(data){
			dialog.close();
			//shoushuJiluPageList(null,oims_currentPage);
			//当前是否是第一页
			if(oims_currentPage==1){
				$($("#advquery").find('a[class=search]')[0]).click();
			}
			else{
				$("input[name=page]").val(oims_currentPage);
				$("#go").click();
			}
		}
	}
	var form = showFormByHtmlTemplate(div,TEMPLATE_OPERATION_RECORD_FORM_URL,setting,data);
	showOperationDictList(form, data);
	showOperationAnesthesia(form,data);
	var roomSelect = form.find("select#operationRoomId");
	$.each(operationRooms,function(i,r){
		$("<option />").val(r.id).text(r.name).appendTo(roomSelect);
	});
	if(data!=null&&data.operationRoomId!=null)roomSelect.val(data.operationRoomId);
	var after = $.trim(form.find("input#medicalAfter").val());
	if(!after.length)form.find("input#medicalAfter").val(form.find("input#medical").val());
	initAppointmentDateTime(form,data);
	initOperationDateTime(form,data);
	//如果data存在
	if(data)
		if(currentStaff.category==oimsCategory.YUANGONG_YISHENG){
			$("#nurse_note").attr("readonly","readonly");
		}
		else if(currentStaff.category==oimsCategory.YUANGONG_HUSHI){
			$("#note").attr("readonly","readonly");
		}
}
/**
 * 显示麻醉方式
 */
function showOperationAnesthesia(form,data){
	var select = form.find("select[name=anesthesia]");
	$.each(anesthesiaValues,function(i,d){
		$("<option />").val(d.id).text(d.name).appendTo(select);
	});
	if(data!=null && data.anesthesia!=null){
		select.val(data.anesthesia);
	}
}

function showOperationCategoryForOperationForm(data,tag){
	$.each(operationCategories,function(i,d){
		var c = $('<input type="radio" name="category" />').click(function(){
			$("#appointmentDate").val("");
			$(this).blur();
		}).blur(function(){
			if($(this).is(":checked"))showChildCategory($(this).val());
		}).val(d.value).attr("id","category"+d.value).appendTo(tag);
		if(data!=null && data.category==d.value)c.attr("checked",true);
		$('<label />').attr("for","category"+d.value).html(d.name+"&nbsp;&nbsp;").appendTo(tag);
	});
	if(data && data.category)
		showChildCategory(1,data.childCategory);
	function showChildCategory(val, c){
		var div=$("div[id=zhuyuan_category]").is(":hidden");
		
	//	var s = $("select[name=childCategory]");
		if(val==0){
			$("div[id=zhuyuan_category]").css({'display':'none'});
			$("input[type=radio][name=childCategory]").attr('disabled',true);
			return;
		}
		else{
			$("div[id=zhuyuan_category]").css({'display':'block'});
			$("input[type=radio][name=childCategory]").removeAttr('disabled');
		}
//		if(s.length)
//			s.text("");
//		else
//			s = $("<select />").width(100).attr("name","childCategory").appendTo(tag);
//		$.each(childOperationCategories,function(_i,_d){
//			$("<option />").val(_d.value).text(_d.name).appendTo(s);
//		});
		if(c)
			//s.val(c);
			$("input[type=radio][name=childCategory][value="+c+"]").attr("checked","checked");
	}
}
function showGeLiChildren(data){
	if($("#isolation").val()==2){
		$("#geli_category").css({'display':'block'});
		$("input[type=radio][name=geli_category]").removeAttr('disabled');
		$("input[type=radio][name=geli_category][value="+data.geli_category+"]").attr("checked","checked");
	}
	else{
		$("input[type=radio][name=geli_category]").attr('disabled',true);
	}
	$("#isolation").unbind('change').change(function(){
		if($("#isolation").val()==2){
			$("#geli_category").css({'display':'block'});
			$("input[type=radio][name=geli_category]").removeAttr('disabled');
		}
		else{
			$("#geli_category").css({'display':'none'});
			$("input[type=radio][name=geli_category]").attr('disabled',true);
		}
	});
}
/**
 * 显示手术字典清单(弹出窗口)
 * @param inputCode
 * @param data
 */
function showOperationDictList(form, data){
	var val = $("textarea#operationName").val();
	var textarea = $("textarea#operationName").replaceWith($("<div />").width($("#operationName").width()).height($("#operationName").height()).attr('id','operationNameDiv'));
	var td = $("#operationNameDiv").parent();
	var td0 = td.prev();
	textarea = $("#operationNameDiv").css({boder:"1px solid #9fffff",background:"#fff",border:"1px solid #666"});
	var tag = form.find("input#category").parent();
	form.find("input#category").remove();
	showOperationCategoryForOperationForm(data,tag);
	$("#patsinhospital").click(function(){
		var pathospitaldiv = $("<div/>").attr("id","pathospitaldiv");
		$(pathospitaldiv).oimsDialog({
			icon : "view",
			title : "在院患者",
			locked : true,
		});
		var ul=$("<ul/>").appendTo(pathospitaldiv);
		$.each(pat_dept,function(i,n){
			$('<li class="treetitle"/>').text(n).appendTo(ul).data('deptCode',i).toggle(function(){
				var positionTable=$(this).next();
				positionTable.css({'display':'block'});
				var data=getJSONData(findPatsInHospital,{tag:Math.random(),deptCode:$(this).data('deptCode')},'POST').obj;
				positionTable.empty();
				var length=data.length;
				if(!length){
					return;
				}
				var tr;
				$.each(data,function(i,n){
					if(!(i%8)){
						tr=$('<tr/>').appendTo(positionTable);
					}
					var td=$('<td/>').appendTo(tr);
					var div=$('<div style="border:1px solid rgb(0,255,31)"/>').appendTo(td);
					div.append('<p style="text-align:left"><span>姓名:</span><span>'+n.name+'</span></p>');
					div.append('<p style="text-align:left"><span>性别:</span><span>'+n.sex+'</span></p>');
					div.append('<p style="text-align:left"><span>病历号:</span><span>'+n.patientId+'</span></p>');
					div.append('<p style="text-align:left"><span>出生日期:</span><span>'+formatDate(n.birthday.time)+'</span></p>');
					div.append('<p style="text-align:left"><span>床位号：</span><span>'+n.bedNo+'</span></p>');
					td.data('patientId',n.patientId).click(function(){
						shoushu_patientid=$(this).data("patientId");
						$("#pathospitaldiv").parent().prev().find('a').click();
						$("#patientNo").val(shoushu_patientid);
						$("#patientNo").blur();
					});
				});
			},function(){
				$(this).next().css({'display':'none'});
			});
			$("<table width='100%' border=0 cellspacing=0 style='display:none'/>").appendTo(ul);
		});
	});
	//隔离标记选择隔离时加入
	showGeLiChildren(data);
	//$("#geli_category").css({'display':'block'});
	if(data!=null){
		$("#patientNo").attr("disabled","disabled");
		var details = data.operationDetails;
		if(details)$.each(details, function(i, d){
			addOperation(d);
		});
		var oss = form.find("select[name=operationSize]");
		$.each(operationSizeValue,function(i,v){
			$("<option />").val(v.value).text(v.name).appendTo(oss);
		});
		oss.val(data.operationSize);
		var ols = form.find("select[name=levelFlag]");
		$.each(operationLevelValue,function(i,v){
			$("<option />").val(v.value).text(v.name).appendTo(ols);
		});
		ols.val(data.levelFlag);
	}else{
		$("#patientNo").blur(function(){
			var blh = $.trim($(this).val());
			if(!blh.length)return;
			var re = getJSONData(BEFORE_ADD_OPERATION_URL,{binglihao:blh});
			if(re.state && re.obj!=null){
				var data = re.obj;
				var sex = data.sex?"男":"女";
				var age = getAge(data.birthday.time);
				var tel = re.obj.tel;
				var mobile = re.obj.mobile;
				if(mobile==null && tel!=null && tel.indexOf("1")==0)mobile=tel;
				data = $.extend(data,{sex:sex,age:age,patientName:re.obj.name,mobile:mobile,tel:re.obj.contactTel});
				fillFormWithData(form,data);
			}else{
				$.oimsAlert("未找到该患者，请确认病历号填写是否正确！");
				form[0].reset();
				textarea.text();
				$(this).focus();
				return;
			}
		}).keyup(function(e){
			if(e.keyCode==13)$(this).blur();
		});
	}
	var normalText = "请输入关键字敲回车";
	var input = $("<input />").val(normalText).css({"color":"#ccc",width:"100%"}).focusin(function(){
		$(this).css("color","#000");
		var val = $.trim($(this).val());
		if(val==normalText)$(this).val("");
	}).blur(function(){
		var val = $.trim($(this).val());
		if(!val.length||val==normalText)
			$(this).val(normalText).css("color","#ccc");
		if(val!=$(this).data("val")){
			if(val!=normalText)
				showOperationDict(val);
			else
				showOperationDict(null);
			$(this).data("val",val);
		}
	}).keyup(function(e){
		if(e.keyCode==13){
			$(this).blur();
		}else if(e.keyCode==40){
				$(this).blur();
				var div=input.next();
				if(div.children().length){
					div.children("a:eq(0)").css({'background-color':'rgb(235, 208, 175)'}).focus();
				}
		}
		else{
			showOperationDict($.trim(input.val()));
		}
	}).appendTo(td0);
	var div = $("<div />").css({overflow:"auto",height:td.height()-input.outerHeight()}).appendTo(td0);
	showOperationDict(null);
	showShoushuDeptAndDoctor(form,data);
	function showOperationDict(inputCode){
		var keyword = div.data("keyword");
		if(keyword==inputCode)return;
		div.text("").data("keyword",inputCode);
		var obj = getJSONData(FIND_OPERATION_DICT_URL,{currentPage:1,pageSize:100,inputCode:inputCode},"POST");
		if(!obj.list.length){
			return;
		}
		$.each(obj.list,function(i,d){
			var a = $("<a />").addClass("operationNameItem"+d.id).click(function(){
				if($(this).hasClass("selected")){
					$(this).removeClass("selected");
					$("li.operationName_"+d.id).remove();
					setOperationSizeAndLevel(d,false);
				}else{
					$(this).addClass("selected");
					addOperation(d);
					setOperationSizeAndLevel(d,true);
				}
			}).css({display:"block",margin:"2px",border:"1px solid #666"}).attr("href","javascript:void(0)").text(d.name).appendTo(div);
			a.focus(function(){
				document.onkeydown=function(e){e=e||event;if(e.keyCode==38||e.keyCode==40){
					return false;
				}};
				a.unbind('keyup').keyup(function(e){
					if(e.keyCode==38&&a.prev().length){
						a.css({'background':'#f7f7f7'});
						a.prev().focus().css({'background-color':'rgb(235, 208, 175)'});
					}
					else if(e.keyCode==40&&a.next().length){
						a.css({'background':'#f7f7f7'});
						a.next().focus().css({'background-color':'rgb(235, 208, 175)'});
					}
				});
			});
			if($("li.operationName_"+d.id).length)a.addClass("selected");
		});
	}
	
	function setOperationSizeAndLevel(d,a){
		if(!$("#operationNameDiv").find("li").length){
			$("select[name=operationSize]").text("");
			$("select[name=levelFlag]").text("");
		}else{
			if(!$("select[name=operationSize]").children("option").length)$.each(operationSizeValue,function(i,v){
				$("<option />").val(v.value).text(v.name).appendTo("select[name=operationSize]");
			});
			if(!$("select[name=levelFlag]").children("option").length)$.each(operationLevelValue,function(i,v){
				$("<option />").val(v.value).text(v.name).appendTo("select[name=levelFlag]");
			});
		}
		var size = form.find("select[name=operationSize]").val();
		var level = form.find("select[name=levelFlag]").val();
		if(a){
			if(size==""||d.operationSize>size)
				form.find("select[name=operationSize]").val(d.operationSize);
			if(level==""||d.levelFlag>level)
				form.find("select[name=levelFlag]").val(d.levelFlag);
		}else{
			if(d.operationSize==size||d.levelFlag==level){
				var _size = 0;
				var _level = 0;
				$.each($("#operationNameDiv").find("li"),function(i,ele){
					var id = $(ele).data("id");
					var re = getJSONData(GET_OPERATION_DICT_URL,{id:id});
					if(re.state){
						if(re.obj.operationSize>=_size)_size=re.obj.operationSize;
						if(re.obj.levelFlag>=_level)_level=re.obj.levelFlag;
					}
				});
				if(d.operationSize==size)form.find("select[name=operationSize]").val(_size);
				if(d.levelFlag==level)form.find("select[name=levelFlag]").val(_level);
			}
		}
	}
	
	function addOperation(d){
		var ul = $("#operationNameDiv").children("ul");
		if(!ul.length)ul = $("<ul />").appendTo("#operationNameDiv");
		var li = $("<li />").data("id",d.id).css({display:"block",border:"1px solid #666",margin:"2px", "text-align":"left"}).addClass("operationName_"+d.id).appendTo(ul);
		$("<a />").css({width:"14px",height:"14px",display:"block",float:"right",margin:"2px",border:"1px solid #ddd", "text-align":"center","line-height":"14px"}).text("x").click(function(){
			div.find("a.operationNameItem"+d.id).removeClass("selected");
			$(this).parent().remove();
			setOperationSizeAndLevel(d,false);
		}).appendTo(li);
		$("<input />").attr("name","operationDictIds").attr("type","hidden").val(d.id).appendTo(li);
		var select = $("<select />").css({"margin-right":"4px"}).width(48).attr("name","eyes").appendTo(li);
		$("<option />").val(oimsCategory.DOUBLE_EYE).text("双眼").appendTo(select);
		$("<option />").val(oimsCategory.RIGHT_EYE).text("右眼").appendTo(select);
		$("<option />").val(oimsCategory.LEFT_EYE).text("左眼").appendTo(select);
		$("<span />").appendTo(li).text(d.name);
		select.val(d.eyes);
	}
	
}

function showShoushuDeptAndDoctor(form,data){
	var bumenList = getJSONData(FIND_OPERATION_GROUP_LIST_URL,{pageSize:100,currentPage:1},"POST");
	var deptIdSelect = form.find("select#groupId").change(function(){
		showDoctors({groupId:$(this).val()});
	});
	form.find("select#levelFlag").change(function(){
		showDoctors({groupId:$("#groupId").val()});
	});
	deptIdSelect.text("");
	$.each(bumenList.list,function(i,d){
		$("<option />").val(d.id).text(d.name).appendTo(deptIdSelect);
	});
	if(data!=null && data.groupId!=null){
		deptIdSelect.val(data.groupId);
		showDoctors(data);
	}else{
		$("<option />").prependTo(deptIdSelect);
		deptIdSelect.val("");
	}
	
	showNurse();
	function showNurse(){
		var cns = form.find("select#circuitNurse");
		if(!cns.length)return;
		if(cns.children("option").length==0)
			$("<option />").appendTo(cns);
		else if(cns.children("option").length>1)
			return;

		var re = getJSONData(FIND_OPERATION_GRUOP_MEMBERS_URL,{groupId:1},"POST");

		$.each(re,function(i,d){
			$("<option />").val(d.groupMemberId.workNo).text(d.name).appendTo(cns);
		});
		
		cns.children("option").clone().appendTo("select#instrumentNurse");
		if(data && data.circuitNurse)
			cns.val(data.circuitNurse);
		if(data && data.instrumentNurse)
			$("select#instrumentNurse").val(data.instrumentNurse);
	}
	
	function showDoctors(_d){
		var doctorSelect = form.find("select#doctor");
		doctorSelect.html("<option />");
		var re = getJSONData(FIND_OPERATION_GRUOP_MEMBERS_URL,{groupId:_d.groupId},"POST");
		var level = form.find("select#levelFlag").val();
		$.each(re,function(i,d){
			var option = $("<option />").val(d.groupMemberId.workNo).text(d.name);
			if(d.category==oimsCategory.YUANGONG_YISHENG){
				if(d.levelFlag>=level)option.appendTo(doctorSelect);
			}
		});
		
		var fas = form.find("select#firstAssistant");
		if(!fas.length || fas.children("option").length>1) return;
		$("<option />").appendTo(fas);
//		doctorSelect.children("option").clone().appendTo(fas);
		var str='';
		$.each($("select#groupId").children("option"),function(i,option){
			var id = $(option).val();
			if(id==1/*||id==_d.groupId*/||!id)return true;
			str+=id+",";
		});
		
		var l = getJSONData(FIND_OPERATION_GRUOP_MEMBERS_URL,{groupId:str.substring(0, str.length-1)},"POST");
		$.each(l,function(n,d){
			var workNo = d.groupMemberId.workNo;
			if(fas.children("option[value="+workNo+"]").length) return true;
			$("<option />").val(workNo).text(d.name).appendTo(fas);
		});
		var sas = form.find("select#secondAssistant");
		fas.children("option").clone().appendTo(sas);
		if(_d.doctor)doctorSelect.val(_d.doctor);
		if(_d.firstAssistant)fas.val(_d.firstAssistant);
		if(_d.secondAssistant)sas.val(_d.secondAssistant);
	}
}
//function showShoushuDeptAndDoctor(form,data){
//	var bumenList = getJSONData(FIND_OPERATION_GROUP_LIST_URL,{pageSize:100,currentPage:1},"POST");
//	var deptIdSelect = form.find("select#groupId").change(function(){
//		showDoctors({groupId:$(this).val()});
//	});
//	deptIdSelect.text("");
//	$.each(bumenList.list,function(i,d){
//		$("<option />").val(d.id).text(d.name).appendTo(deptIdSelect);
//	});
//	if(data!=null && data.groupId!=null){
//		deptIdSelect.val(data.groupId);
//		showDoctors(data);
//	}else{
//		$("<option />").prependTo(deptIdSelect);
//		deptIdSelect.val("");
//	}
//	
//	function showDoctors(_d){
//		var doctorSelect = form.find("select#doctor");
//		doctorSelect.text("");
//		var re = getJSONData(FIND_OPERATION_GRUOP_MEMBERS_URL,{groupId:_d.groupId},"POST");
//		var fas = form.find("select#firstAssistant");
//		fas.text("");
//		var sas = form.find("select#secondAssistant");
//		sas.html("<option />");
//		var cns = form.find("select#circuitNurse");
//		cns.text("");
//		var ins = form.find("select#instrumentNurse");
//		ins.text("");
//		var level = form.find("select#levelFlag").val();
//		$.each(re,function(i,d){
//			var option = $("<option />").val(d.groupMemberId.workNo).text(d.name);
//			if(d.category==oimsCategory.YUANGONG_YISHENG){
//				if(d.levelFlag>=level)option.appendTo(doctorSelect);
//				if(fas.length)
//					option.clone().appendTo(fas);
//				if(sas.length)
//					option.clone().appendTo(sas);
//			}else if(d.category==oimsCategory.YUANGONG_HUSHI){
//				if(ins.length)
//					option.clone().appendTo(ins);
//				if(cns.length)
//					option.clone().appendTo(cns);
//			}
//		});
//		if(_d.doctor)doctorSelect.val(_d.doctor);
//		if(_d.firstAssistant)fas.val(_d.firstAssistant);
//		if(_d.secondAssistant)sas.val(_d.secondAssistant);
//		if(_d.circuitNurse)cns.val(_d.circuitNurse);
//		if(_d.instrumentNurse)ins.val(_d.instrumentNurse);
//	}
//}
function shoushuTongjiPagelist(){
	//showShoushuPageList(btns,"手术记录","2,3,4,5,10",currentPage);
	importJS("/js/manager/shoushu/dataSetting.js");
	pageTitle = "手术统计";
	init();
//	if(btns==undefined || btns==null)
//		btns=currentBtns;
//	else
//		currentBtns=btns;
	
	var operationListObj = {
			url : contextPath + FIND_OPERATION_URL, // url
			method : "post",
			checkbox : true,
			single : false,
			listObj : [
			           {title:"加急",key:"urgent",func:function(d){
			        	   return d?"<font color=\"red\">急</font>":"-";
			           }},
			           {title:"患者ID",key:"patientNo"},
			           {title:"患者姓名",key:"patientName"},
			           {title:"性别", key:"sex", func:function(d){
			        	   return d?"男":"女";
			           }},
			          {title:"年龄",key:"birthday",func:function(d){
			        	  return getAge(d.time);
			          }},
			          {title:"手术室",key:"operationRoomId",func:function(d){
			        	  return getOperationRoomById(d);
			          }},
			          {title:"诊断",key:"medical"},
			          {title:"手术类别",key:"category",func:function(d){
			        	  return getOperationCategoryByValue(d);
			          }},
			          {title:"手术大小",key:"operationSize",func:function(d){
			        	  var s="-";
			        	  $.each(operationSizeValue,function(n,c){
			        		  if(c.value==d){
			        			  s=c.name;
			        			  return false;
			        		  }
			        	  });
			        	  return s;
			          }},
			          {title:"手术级别",key:"levelFlag",func:function(d){
			        	  var s="-";
			        	  $.each(operationLevelValue,function(n,c){
			        		  if(c.value==d){
			        			  s=c.name;
			        			  return false;
			        		  }
			        	  });
			        	  return s;
			          }},
			          {title:"手术名称",key:"operationDetails",func:function(v){
			        	  return getOperationDetails(v);
			          }},
			          {title:"手术预约时间",key:"appointmentTime"},
			          {title:"手术实际时间",key:"operationTime"},
			          {title:"主刀医生",key:"doctorName"},
			          {title:"专业组",key:"groupName"},
			          {title:"状态",key:"processState",func:function(d){
			        	  var s="-";
			        	  $.each(processStateValues,function(i,state){
			        		  if(state.value==d){
			        			  s=state.name;
			        			  return false;
			        		  }
			        	  });
			        	  return s;
			          }}
			          ],
			data : {// data表示传的参数
				currentPage : 1,
				pageSize : getPageSize()
			}
		};
	listFactor = operationListObj;
	var data = listFactor.data;
	data = $.extend(data,{process:'3'});//已完成
	listFactor.data=data;
	var div = $("<div />").attr("id","advquery").addClass("advquery").append("<div style='clear:both'></div>").appendTo("#right");
	var rt = "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
		+ "<tr>"
		+ "<td width='23%' class='leftalign'><input type='text' size='28' value='"
		+ "请输入疾病或者主刀医生"
		+ "' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" id='search_shoushu' class='blurview' name='search_shoushu'></td>"
		+ "<td width='9%'><a href='javascript:seniorSearchSubmit();' class='search'>"
		+ "查询"
		+ "</a></td>"
		+ "<td width='9%'><a href='javascript:OperationExSearch();' class='advsearch'>"
		+ "高级查询"
		+ "</a></td>"
		+ "<td width='50%'>"
		+ "<div class='btn'>"
		+ "<a href='javascript:operation_export();'><span class='edit'></span>导出</a>           "// 就诊情况
		+ "</div>" + "</td>" + "</tr>" + "</table>";
	
	$(rt).appendTo(div);
	$("#search_shoushu").click(function() {
		clearInitQuery(this);
	});
	$("#search_shoushu").blur(function() {
		if (this.value == "") {
			$("#search_shoushu").val("请输入疾病或者主刀医生");
			$("#search_shoushu").addClass("blurview");
		}
	});
	$("#search_shoushu").bind("keyup", function(e) {
		if (e.which == 13) {
			seniorSearchSubmit();
		}
	});
	div = $("<div />").attr("id","pageList").addClass("list").appendTo("#right");
	div.createPageList(listFactor);
}
var videotype="mpg";
var operationName="";
function opevideo(d){
    var opeid=0;
    //importJS("/js/manager/shoushu/video.js");
    importCSS("/css/video-js.css");
	if(!d){
		var data = getCheckBoxValue();
		if(data.length==0){
			$.oimsAlert("请选择要记录的对象！");
			return;
		}
		if(data.length>1){ 
			$.oimsAlert("每次只能选择一个对象！");
			return;
		}
		d = data[0];
	    operationName = getOperationDetails(d.operationDetails);
		opeid =d.id;
	}
	var aname = $("<a id='aname'/>");
	aname.css({"text-align":"center"}).click(function(){
    player.DoPaly();
	});
	var delaname = $("<a />").attr("style","display:none").css({'color':'#FF0000'}).attr("id","delid").text("【删除】");
    var delform = $("<form />").attr("action",""+contextPath+"/publish/shoushu/checkIsUploadedOrDel.htm").attr("method","post");
	var input = $("<input />").attr("name","opeid").attr("type","hidden").attr("value",opeid).appendTo(delform);
	var input2 = $("<input />").attr("name","delflag").attr("type","hidden").attr("value","1").appendTo(delform);
	delform.ajaxForm({
		dataType : "json",
		success : function(d) {
		 	if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){
				if(d.state!=1){
					alert("删除失败，请查看是否网络原因或重试！");
				}else{
					alert("成功删除！");
					$('#aname').text("暂无上传文件，请上传！");
					$('#aname').css({'color':'#FF0000'});
					$('#delid').attr("style","display:none");
					removeDiv_openWin();
				}
		 		}else{
					if(d.state!=1){
						$.oimsSucc("删除失败，请查看是否网络原因或重试！");
					}else{
						$.oimsSucc("成功删除！");
						$('#aname').text("暂无上传文件，请上传！");
						$('#aname').css({'color':'#FF0000'});
						$('#delid').attr("style","display:none");
						removeDiv_openWin();
					}
		 		}
		}
	});	
	$.ajax({
		url : ""+contextPath+"/publish/shoushu/checkIsUploadedOrDel.htm",
		data : {"opeid":opeid,"delflag":"0"},
		async : false,
		type : 'POST',
		dataType : 'json',
		success : function(d) {
		if(d.state!=1){
			aname.text("暂无上传文件，请上传！");
			aname.css({'color':'#FF0000'});
			$('#delid').attr("style","display:none");
		}else{
			aname.css({'color':'#6A5ACD'});
			aname.text(operationName);
			videotype = d.message;
			if(parent.window.currentStaff.gonghao=='admin'){
				delaname.attr("style","display:block");
			}else{
				delaname.attr("style","display:none");
			}
		}
	}
	});
	var div = $("<div />");
	var div1 = $("<div style='margin-top:20px;margin-left:30px'  id='div1'/>").appendTo(div);
	var div01= $("<div id='id01'/>").appendTo(div1);
	var video = $("<video />").attr("id","example_video_1").attr("class","video-js vjs-default-skin").attr("controls","enabled").attr("preload",'none').attr("width","700").attr("height","400")
	.attr("poster","").attr("data-setup","{}").attr("style","float:center").appendTo(div01);
	var source = $("<source />").attr("id","sourceid").attr("src",""+getContextPath()+"/video/"+opeid+"."+videotype+"").attr("type","video/"+videotype+"").appendTo(video);
	var div2 = $(" <div id='opeid'/>").attr("width","200").attr("height","300").appendTo(div);
	aname.appendTo(div2);
	$("<br>").appendTo(div2);
	delaname.appendTo(div2);
	var form = $(" <form />").attr("id","videoupload").attr("action",""+contextPath+"/publish/shoushu/uploadforvideo.htm").attr("method","post").attr("enctype","multipart/form-data").appendTo(div2);
	var table = $(" <table> <thead></thead> <tr> <td style='background-color: gray;'>选择视频</td> <td><input type='file' name='vediofile' /></td><td><input name='opeid' type='hidden' value='"+opeid+"' /></td></tr> </table>").appendTo(form);
    var object = $("<object />").attr("classid","clsid:05589FA1-C356-11CE-BF01-00AA0055595A").attr("id","ActiveMovie1").attr("width","700").attr("height","400").appendTo(div1);
    $("<param />").attr("name","Appearance").attr("value","0").appendTo(object);
    $("<param />").attr("name","AutoStart").attr("value","-1").appendTo(object);
    $("<param />").attr("name","IsAutoPlay").attr("value","0").appendTo(object);
    $("<param />").attr("name","play").attr("value","false").appendTo(object);
    $("<param />").attr("name","autoplay").attr("value","false").appendTo(object);
    $("<param />").attr("name","AllowChangeDisplayMode").attr("value","-1").appendTo(object);
    $("<param />").attr("name","AllowHideDisplay").attr("value","0").appendTo(object);
    $("<param />").attr("name","AllowHideControls").attr("value","-1").appendTo(object);
    $("<param />").attr("name","AutoRewind").attr("value","1").appendTo(object);
    $("<param />").attr("name","Balance").attr("value","0").appendTo(object);
    $("<param />").attr("name","CurrentPosition").attr("value","0").appendTo(object);
    $("<param />").attr("name","DisplayBackColor").attr("value","0").appendTo(object);
    $("<param />").attr("name","DisplayForeColor").attr("value","16777215").appendTo(object);
    $("<param />").attr("name","DisplayMode").attr("value","0").appendTo(object);
    $("<param />").attr("name","Enabled").attr("value","-1").appendTo(object);
    $("<param />").attr("name","EnableContextMenu").attr("value","-1").appendTo(object);
    $("<param />").attr("name","EnablePositionControls").attr("value","-1").appendTo(object);
    $("<param />").attr("name","EnableSelectionControls").attr("value","0").appendTo(object);
    $("<param />").attr("name","EnableTracker").attr("value","-1").appendTo(object);
    $("<param />").attr("name","Filename").attr("id","srcid").attr("value",""+getContextPath()+"/video/"+opeid+"."+videotype+"").appendTo(object);
    $("<param />").attr("name","FullScreenMode").attr("value","0").appendTo(object);   
 	if ((navigator.userAgent.indexOf('MSIE') >= 0) 
 		    && (navigator.userAgent.indexOf('Opera') < 0)){
 		div01.remove();
 		}else{
 			object.attr("style","display:none");
 		}
 	var f = $("<div />");
	f.oimsDialog({
		icon:"view",
		title:"手术录像",
		width:800,
		height:600,
		locked:false,
		button:[{
			title : "上传",//按纽文字
			func : function(){
				var str = $("input[name=vediofile]").val();
				if( str == "" || str == null){
					 	if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){
                            alert("请选择上传文件！");
							return false;
					 		}else{
  							$.oimsAlert("请选择上传文件！");
							return false;
					 		}
				};		
				videotype = str.substring(str.lastIndexOf(".")+1,str.length);
				$("#sourceid").parent().attr("src",""+getContextPath()+"/video/"+opeid+"."+videotype+"");
				$("#sourceid").attr("src",""+getContextPath()+"/video/"+opeid+"."+videotype+"").attr("type","video/"+videotype+"");
				$("#videoupload").ajaxForm({
					dataType : "json",
					success : function(d) {
						//if(d.state){
						    $('div.lockedBackground').remove();	
						 	if ((navigator.userAgent.indexOf('MSIE') >= 0) 
						 		    && (navigator.userAgent.indexOf('Opera') < 0)){
						 		alert("提交成功！");
						 		}else{
									$.oimsSucc("提交成功！");
						 		}
							$("input[name=vediofile]").val("");
							$('#aname').text(operationName);
							$('#aname').css({'color':'#6A5ACD'});
							if(parent.window.currentStaff.gonghao=='admin'){
								$('#delid').attr("style","display:block");
							}else{
								$('#delid').attr("style","display:none");
							}
						//}else{
							//$.oimsError("提交失败，请检查网络或联系系统管理员！");
						//}
							removeDiv_openWin();
					}
				});
				$("#videoupload").submit();
				var divcock = $("<div />").addClass("lockedBackground")/*.addClass("lockedDiv")*/.css({
			        top : 0,
			        left : 0,
			        position : "absolute",
			        width : "100%",
			        height : $(window).height(),
			        "z-index":9999,
			        background:"#ccc",
			        filter:"alpha(opacity=60)",
			        opacity:0.6
			    }).appendTo("body");
				$("<div />").appendTo(divcock).width(300).height(30).text("上传中，请稍等。。。").css({"line-height":30,"font-size":"22px",background:"#fff","text-align":"center","color":"#000","font-weight":"bold","margin":"auto"});
			},//响应函数
			isCloseWin:false,//点击后，是否关闭窗口 true关闭，false不关闭
			className : "ok"//指定CSS名称
		  }]
	});
	f.append(div[0].outerHTML);
	$("#delid").click(function(){
	 	if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){
 			if(confirm("你确定要删除视频内容吗？")){			
 				delform.submit();
 			}
	 		}else{
			    $.oimsConfirm({strTitle :"你确定要删除视频内容吗？",remove_length : true},function(){  
					delform.submit();
				});
	 		}
	});
}

function findEx_Operation() {
	var rt = "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
			+ " <tr>"
			+ "<td width='7%' nowrap='nowrap' align='left'>"
			+ "时间"
			+ ":</td>"
			+ "<td width='20%'><input type='text'  class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='appointmentTimeStart' name='appointmentTimeStart'>"
			+ "</td>"
			+ "<td width='2%' nowrap='nowrap' align='center'>"
			+ "至"
			+ "</td>"
			+ "<td width='20%'><input type='text'  class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='appointmentTimeEnd' name='appointmentTimeEnd'>"
			+ "</td>"
			+ "<td width='7%' nowrap='nowrap' align='right'> "
			+ "手术级别"
			+ "：</td>"
			+ "<td width='15%'>"
			+ "<select name='levelFlag' id='levelFlag' width='100'><option></option><option value=0>一级手术</option><option value=1>二级手术</option><option value=2>三级手术</option><option value=3>四级手术</option></select>"
			+"</td>"
			+ "<td width='7%'  nowrap='nowrap' align='right'>"
			+ "手术类别"
			+ "：</td>"
			+ "<td width='15%'>"
			+ "<select name='category' id='category' width='100'><option></option><option value=0>门诊</option><option value=1>住院</option></select>"
			//+ "<select name='category' id='category' width='100'><option></option><option value=0>门诊</option><option value=1>常规</option><option value=2>日间</option><option value=3>非二次计划</option><option value=4>周末</option></select>"
			+ "</td>"
			+ "<td>&nbsp;</td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td>"
			+ "疾病"
			+ ":</td>"
			+ "<td colspan='3'>"
			+ "<input type='text'  class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\"  name='diseases' id='diseases'>"
			+ "</td>"
			+ "<td> "
			+ "主刀医生"
			+ "：</td>"
			+ "<td colspan='3'>"
			+ "<input type='text'  class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='doctorName'  name='doctorName'>"
			+ "</td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td>"
			+ "手术名称"
			+ ":</td>"
			+ "<td colspan='7'>"
			+ "<input type='hidden' value='' id='shoushumc' /><input type='text'  class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='optName'  name='optName'>"
			+ "</td>"
			+"</tr>"
			+"<tr>"
			+"<td width='7%' align='left'>"
			+"手术大小："
			+"<td>"
			+ "<td colspan=2 width='20%'><select name='operationSize' id='operationSize' style='width:100%'><option></option><option value='0'>小型手术</option><option value='1'>中型手术</option><option value='2'>大型手术</option></select>"
			+ "</td>"
			+"<td width='7%' align='left'>"
			+"巡回护士："
			+"<td>"
			+ "<td colspan=2 width='20%'><select name='circuitNurse' id='circuitNurse' style='width:100%'></select>"
			+ "</td>"
			+ "<td>&nbsp;</td>"
			+ "</tr>"
			+ "<tr>"
			+ "<td>&nbsp;&nbsp;</td>"
			+ "<td colspan='7' id='shoushuNames'>&nbsp;</td>"
			+ "</tr>"
			+ "</table>"
			+ " <div class='avdopenbutton' >"
			+ " <a href='javascript:seniorSearchSubmit();'><span class='advsumit'></span>"
			+ "提交"
			+ "</a>"
			+ " <a href='javascript:seniorSearchResetthem();'><span class='advreset'></span>"
			+ "重置" + "</a>"
			+ "<a id = 'closeId'><span class='close' ></span>"
			+ "关闭" + "</a>" + " </div> ";
	var table = $(rt);
	
	return table;
};

//弹出高级查询表格
function OperationExSearch() {
	var seniorSearchTemplate = findEx_Operation();// 创建高级查询表格
	$.oimsBox({
		parentDiv : "advquery",// 将生成内容添加的id
		divContent : seniorSearchTemplate
	});
	var re = getJSONData(FIND_OPERATION_GRUOP_MEMBERS_URL,{groupId:1},"POST");

	$.each(re,function(i,d){
		$("<option />").val(d.groupMemberId.workNo).text(d.name).appendTo($("#circuitNurse"));
	});
	$("#circuitNurse").prepend("<option></option>");
	calendarEMR_FOLLOWED("appointmentTimeStart");//手术安排时间
	calendarEMR_FOLLOWED("appointmentTimeEnd");// 手术结束时间
	$("#optName").focus(function(){
		this.className='focus';
		if($("#checkshoushu") == undefined || $("#checkshoushu").length == 0){
			$("<div/>").css({"float":"left","border":"1px solid black","overflow":"scroll"}).width("49%").height("200px").attr("id","checkshoushu").appendTo($("#shoushuNames"));
			$("<div/>").css({"float":"right","border":"1px solid black","overflow":"scroll"}).width("50%").height("200px").attr("id","showshoushu").appendTo($("#shoushuNames"));
		}
		
	}).blur(function(){
		this.className='blur';
	}).keyup(function(e){
		if(e.keyCode == 40){
			$(this).blur();
			var div=$("#checkshoushu");
			if(div.children().length){
				div.children("a:eq(0)").css({'background-color':'rgb(235, 208, 175)'}).focus();
			}
		}else{
			var inputCode = $("#optName").val();
			if(inputCode != $("#optName").data("inputCode")){
				var obj = getJSONData(FIND_OPERATION_DICT_URL,{currentPage:1,pageSize:100,inputCode:inputCode},"POST");
				$("#optName").data("inputCode",inputCode);
				if(!obj.list.length){
					return;
				}else{
					$("#checkshoushu").html("");
				}
				$.each(obj.list,function(i,d){
					var a = $("<a />").addClass("operationNameItem"+d.id).click(function(){
						if($(this).hasClass("selected")){
							$(this).removeClass("selected");
							$.each($("#showshoushu").find("a"),function(k,m){
								if($(m).hasClass("operationNameItem"+d.id)){
									$(m).remove();
									
									var shoushumc = $("#shoushumc").val();
									if(shoushumc.indexOf(",;") != -1){
										var flag = true;
										var mcshoushu = "";
										$.each(shoushumc.split(",;"),function(i,v){
											if(v != d.name || !flag){
												if(mcshoushu == ""){
													mcshoushu = v;
												}else{
													mcshoushu = mcshoushu + ",;" +v;
												}
											}else{
												flag = false;
											}
										});
										$("#shoushumc").val(mcshoushu);
									}else{
										$("#shoushumc").val("");
									}
								}
							});
						}else{
							$(this).addClass("selected");
							if($("#shoushumc").val() == "" || $("#shoushumc").val() == null){
								$("#shoushumc").val(d.name);
							}else{
								var shoushumc = $("#shoushumc").val()+",;"+d.name
								$("#shoushumc").val(shoushumc);
							}
							$("<a />").addClass("operationNameItem"+d.id).click(function(){
								$("a .operationNameItem"+d.id).removeClass("selected");
								$(this).remove();
								
								var shoushumc = $("#shoushumc").val();
								if(shoushumc.indexOf(",;") != -1){
									var flag = true;
									var mcshoushu = "";
									$.each(shoushumc.split(",;"),function(i,v){
										if(v != d.name || !flag){
											if(mcshoushu == ""){
												mcshoushu = v;
											}else{
												mcshoushu = mcshoushu + ",;" +v;
											}
										}else{
											flag = false;
										}
									});
									$("#shoushumc").val(mcshoushu);
								}else{
									$("#shoushumc").val("");
								}
								
							}).css({display:"block",margin:"2px",border:"1px solid #666"}).attr("href","javascript:void(0)").text(d.name).appendTo($("#showshoushu"));
						}
					}).css({display:"block",margin:"2px",border:"1px solid #666"}).attr("href","javascript:void(0)").text(d.name).appendTo($("#checkshoushu"));
					a.focus(function(){
						document.onkeydown=function(e){e=e||event;if(e.keyCode==38||e.keyCode==40){
							return false;
						}};
						a.unbind('keyup').keyup(function(e){
							if(e.keyCode==38&&a.prev().length){
								a.css({'background':'#f7f7f7'});
								a.prev().focus().css({'background-color':'rgb(235, 208, 175)'});
							}
							else if(e.keyCode==40&&a.next().length){
								a.css({'background':'#f7f7f7'});
								a.next().focus().css({'background-color':'rgb(235, 208, 175)'});
							}
						});
					});
					
				});
			}
		}

	});
}



//查询
function seniorSearchSubmit(){
	var data = listFactor.data;
	if($("#appointmentTimeStart") != undefined && $("#appointmentTimeStart").length > 0){
		data = $.extend(data,{appointmentTimeStart:($("#appointmentTimeStart").val()?($("#appointmentTimeStart").val()+" 00:00"):''),appointmentTimeEnd:($("#appointmentTimeEnd").val()?($("#appointmentTimeEnd").val()+" 23:59"):''),category:$("#category").val(),levelFlag:$("#levelFlag").val(),diseases:$("#diseases").val(),operationName:$("#shoushumc").val(),doctor:$("#doctorName").val(),operationSize:$("#operationSize").val(),circuitNurse:$("#circuitNurse").val()});//统计
	}else{
		data = $.extend(data,{search:$("#search_shoushu").val()+"*****"});//统计
	}
	listFactor.data=data;
	$("#pageList").createPageList(listFactor);
}

//重置
function seniorSearchResetthem(){
	$("#appointmentTimeStart").val("");
	$("#appointmentTimeEnd").val("");
	$("#category").val("");
	$("#levelFlag").val("");
	$("#diseases").val("");
	$("#shoushumc").val("");
	$("#doctorName").val("");
	$("#optName").val("");
	$("#checkshoushu").html("");
	$("#showshoushu").html("");
	$("#operationSize").val("");
	$("#circuitNurse").val("");
}