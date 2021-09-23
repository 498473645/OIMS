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
var TEMPLATE_OPERATION_RECORD_FORM_URL="/js/manager/shoushu/template/operationJiluForm.html";
var FIND_OPERATION_GROUP_LIST_URL = "/publish/operationDict/findOperationGroupPageList.htm";
var FIND_OPERATION_GRUOP_MEMBERS_URL="/publish/operationDict/findGroupMember.htm";
var SET_OPERATION_STATE_URL="/publish/shoushu/setOperationState.htm";
var MINI_READY_FOR_OPERATION=1;//最小预约间隔时间（天）
var PROCESS_STATE_UNDOING=4;//未手术
var PROCESS_STATE_COMPELET=3;//手术完成

//高值耗材添加
//列表中加入手术间

$(document).ready(function(){
	importCSS("/css/jquery.datetimepicker.css");
	importJS("/js/jquery.datetimepicker.js");
});
//TODO 上面的几个东东 下一步需存入数据库中
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
		          {title:"开台时间",key:"appointmentTime"},
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

function setOperationUpdoing(){
	setOperationState(PROCESS_STATE_UNDOING);
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
	importCSS("/css/print.css");
	importJS("/js/LodopFuncs.js");
	var template = common_getHtmlTemplate(contextPath+"/js/manager/shoushu/template/printPage.html");
	var pageDiv = $("<div />").addClass("printPage").append(template);
	$("<h1 />").text(title).prependTo(pageDiv);
	var page=1;
	var printPage = $("<div />").attr("id","printTag");
	var dialog = printPage.oimsDialog({
		title:title,
		width:"1000",
		height:"600",
		locked:true,
		button:[{
		       		title : "打印",
		       		func : function(){
		       			var strStyleCSS="<link href='"+contextPath+"/css/print.css?tag="+Math.random()+"' type='text/css' rel='stylesheet'>";
		       			
		       			var strHtml=strStyleCSS+"<body>"+printPage[0].innerHTML+"</body>"; 
		       			LODOP = getLodop();  
		       			LODOP.PRINT_INIT("OIMS打印");
		       			LODOP.ADD_PRINT_HTM(0,0,"100%","100%",strHtml);
		       			LODOP.SET_PRINT_PAGESIZE (2, 0, 0,"A4");
//		       			LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","88%");
		       			LODOP.PRINT();	
//		       			LODOP.PREVIEW();
		       		},
		       		className : "print"
		       },{
		       		title : "关闭",
		       		func : function(){
		       			dialog.close();
		       		},
		       		className : "close"
		       }]
	});
	var cp;
	while(true){
		cp = pageDiv.clone().appendTo(printPage);
		var table = cp.children("table");
		var re = getJSONData(FIND_OPERATION_URL,{pageSize:20,currentPage:page, process:2, appointmentTimeStart:startDate, appointmentTimeEnd:endDate},"POST");
		if(re.list.length==0)break;
		$.each(re.list,function(i,d){
			var tr = $("<tr />").appendTo(table);
			var category = getOperationCategoryByValue(d.category);
			$("<td />").text(category).appendTo(tr);
			$("<td />").text(getOperationRoomById(d.operationRoomId)).appendTo(tr);
			$("<td />").html(d.patientNo+"，"+d.patientName+"，"+(d.sex?"男":"女")+"，"+getAge(d.birthday.time)).appendTo(tr);
			var local = d.area;
			if(d.bedNo>0)local+=d.bedNo;
			$("<td />").html(local).appendTo(tr);
			var operationName = getOperationDetails(d.operationDetails);
			$("<td />").text(operationName).appendTo(tr);
			$("<td />").text(d.doctorName).appendTo(tr);
			var an = d.firstAssistantName;
			if(d.secondAssistantName) an += "&nbsp;"+d.secondAssistantName;
			$("<td />").html(an).appendTo(tr);
			$("<td />").text(d.circuitNurseName).appendTo(tr);
			$("<td />").text(getAnesthesiaById(d.anesthesia)).appendTo(tr);
			$("<td />").text(d.medical).appendTo(tr);
			$("<td />").text(d.note?d.note:"").appendTo(tr);
		});
		page++;
		if(page>re.page.pageCount)break;
	}
	
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
	showShoushuPageList(btns,"手术预约列表",0);
}

/**
 * 手术申请列表
 */
function shoushuShenqingPageList(btns){
	showShoushuPageList(btns,"手术申请列表","0,1");
}
/**
 * 手术安排列表
 * @param btns
 */
function shoushuAnpaiPageList(btns){
	showShoushuPageList(btns,"手术安排列表","1,2");
}

/**
 * 手术记录列表
 * @param btns
 */
function shoushuJiluPageList(btns){
	showShoushuPageList(btns,"手术记录","2,3,4,5");
}

function showShoushuPageList(btns,title, process){
	importJS("/js/manager/shoushu/dataSetting.js");
	pageTitle = title;
	init();
	if(btns==undefined || btns==null)
		btns=currentBtns;
	else
		currentBtns=btns;
	
	listFactor = operationListObj;
	var data = listFactor.data;
	data = $.extend(data,{process:process});//预约
	listFactor.data=data;
	var div = $("<div />").attr("id","advquery").addClass("advquery").append("<div style='clear:both'></div>").appendTo("#right");
	showSearchForm(div);
	div = $("<div />").addClass("btn").prependTo(div);
	showMyBTNS(btns,div);
	div.children("a").width(68);
	div = $("<div />").attr("id","pageList").addClass("list").appendTo("#right");
	div.createPageList(listFactor);
	if(process=="1,2"){
		var option = {
				timepicker:false,
				onSelectDate:function(d){
					var date = formatDate(d);
					showOperationPlanPrint(date+"手术安排",date+" 00:00",date+" 23:59");
				}
			};
		var a = $("<a />").text("打印").appendTo(".advquery .btn").datetimepicker(option);
		$("<span />").addClass("print").prependTo(a);
	}
}

function showSearchForm(tag){
	var normalText = "请输入患者ID、患者姓名或手术名称检索";
	var sDiv = $("<div />").css("float","left").prependTo(tag);
	var sInput = $("<input />").css("float","left").focusin(function(){
		$(this).removeClass("blurview").addClass("focus");
		var val = $(this).val();
		if(val==normalText)$(this).val("");
	}).blur(function(){
		var val = $(this).val();
		if(!val.length||val==normalText)$(this).val(normalText).removeClass("focus").addClass("blurview");
	}).addClass("blurview").width(258).css("margin","2px 4px").attr("name","search").val(normalText).appendTo(sDiv);
	var sCategory=$("<select />").width(88).attr("name","category").css("float","left").css("margin","2px 4px").appendTo(sDiv);
	$("<option />").val("").text("手术类别").appendTo(sCategory);
	$.each(operationCategories,function(n,c){
		  $("<option />").val(c.value).text(c.name).appendTo(sCategory);
	});
	
	var sDept=$("<select />").width(88).attr("name","deptId").css("float","left").css("margin","2px 4px").appendTo(sDiv);
	var bumenList = getJSONData(FIND_OPERATION_GROUP_LIST_URL,{pageSize:100,currentPage:1},"POST");
	$("<option />").val("").text("手术分组").appendTo(sDept);
	$.each(bumenList.list,function(i,d){
		$("<option />").val(d.id).text(d.name).appendTo(sDept);
	});
	
	$('<a class="search" href="javascript:void(0);">查询</a>').css("float","left").click(function(){
		var sval = sInput.val();
		if(sval==normalText)sval="";
		var data = listFactor.data;
		data = $.extend(data,{search:sval,category:sCategory.val(),deptId:sDept.val()});//预约
		listFactor.data=data;
		$("#pageList").createPageList(listFactor);
	}).appendTo(sDiv);
}

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
	var div = $("<div />").attr("id","advquery").addClass("advquery").append("<div style='clear:both'></div>").appendTo("#right");
	div = $("<div />").addClass("btn").prependTo(div);
	showMyBTNS(btns,div);
	div = $("<div />").attr("id","pageList").addClass("list").appendTo("#right");
	div.createPageList(listFactor);
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
function editShoushuYuyue(){
	var data = getCheckBoxValue();
	if(data.length==0){
		$.oimsAlert("请选择要编辑的对象！");
		return;
	}
	if(data.length>1){
		$.oimsAlert("每次只能删除一个对象！");
		return;
	}
	var d = data[0];
	d = $.extend(d,{age:getAge(d.birthday.time),sex:(d.sex?"男":"女")});
	if(d.appointmentTime!=null)d=$.extend(d,{appointmentTime:formatDateTime(d.appointmentTime.time).substring(0,16)});
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
			shoushuYuyuePageList(null);
		}
	}
	
	var form = showFormByHtmlTemplate(div,TEMPLATE_OPERATION_FORM_URL,setting,data);
	showOperationDictList(form, data);
	
	datetimepicker(form.find("input#appointmentTime"),{
		minTime:'8:00', 
		maxTime:'17:00',
		allowTimes:['8:00',"8:30",'9:00','9:30','10:00','10:30','11:00','11:30','14:30','15:00','15:30','16:00','16:30','17:00'],
		todayButton:false,
		defaultSelect:false,
		onShow:function(){
			var date = new Date();
			var d = date.getDate()+MINI_READY_FOR_OPERATION;
			if(date.getHours()>=17)
				d++;
			date.setDate(d);
			var minDate= date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
			this.setOptions({minDate:minDate});
		}
	});
}

function addShoushuShenqing(){
	showSaveOrUpdateOpertionApplicationForm("新增手术申请");
}

/**
 * 手术申请
 */
function shoushuShenqing(){
	var data = getCheckBoxValue();
	if(data.length==0){
		$.oimsAlert("请选择要编辑的对象！");
		return;
	}
	if(data.length>1){
		$.oimsAlert("每次只能删除一个对象！");
		return;
	}
	var d = data[0];
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
			shoushuShenqingPageList(null);
		}
	}
	var form = showFormByHtmlTemplate(div,TEMPLATE_OPERATION_APPLICATION_FORM_URL,setting,data);
	showOperationDictList(form, data);
	showOperationAnesthesia(form,data);
	datetimepicker(form.find("input#appointmentTime"));
}

function addShoushuAnpai(){
	showSaveOrUpdateOpertionPlanForm("新增手术安排");
}
/**
 * 手术安排
 */
function shoushuAnpai(){
	var data = getCheckBoxValue();
	if(data.length==0){
		$.oimsAlert("请选择要安排的对象！");
		return;
	}
	if(data.length>1){
		$.oimsAlert("每次只能安排一个对象！");
		return;
	}
	var d = data[0];
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
	var circuitNurse = $("select#circuitNurse").val();
	if(circuitNurse==null || !circuitNurse.length){
		$.oimsAlert("请选择巡回护士！");
		return false;
	}
	var instrumentNurse = $("select#instrumentNurse").val();
	if(instrumentNurse==null || instrumentNurse==""){
		$.oimsAlert("请选择器械护士！");
		return false;
	}
	var appointmentTime = $("input[name=appointmentTime]").val();
	if(appointmentTime==""){
		$.oimsAlert("请输入开台日期时间！");
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
			return operationPlanFormValidate();
			//TODO 其它验证暂时未写
		},
		saveCallback:function(data){
			dialog.close();
			shoushuAnpaiPageList(null);
		}
	}
	var form = showFormByHtmlTemplate(div,TEMPLATE_OPERATION_PLAN_FORM_URL,setting,data);
	showOperationDictList(form, data);
	showOperationAnesthesia(form,data);
	var roomSelect = form.find("select#operationRoomId");
	$.each(operationRooms,function(i,r){
		$("<option />").val(r.id).text(r.name).appendTo(roomSelect);
	});
	if(data!=null&&data.operationRoomId!=null)roomSelect.val(data.operationRoomId);
	datetimepicker(form.find("input#appointmentTime"));
}

function shoushuJilu(){
	var data = getCheckBoxValue();
	if(data.length==0){
		$.oimsAlert("请选择要记录的对象！");
		return;
	}
	if(data.length>1){
		$.oimsAlert("每次只能选择一个对象！");
		return;
	}
	var d = data[0];
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
	var startTime = $.trim($("input#opertionTime").val());
	var endTime = $.trim($("input#opertionCompleteTime").val());
	if(!startTime.length||!endTime.length){
		$.oimsAlert("请选择手术起止时间！");
		return false;
	}
	if(!compareTime(startTime+":00",endTime+":59")){
		$.oimsAlert("手术起止时间不正确！");
		return false;
	}
//	if(!$.trim($("#operationRecord").val()).length){
//		$.oimsAlert("手术记录输入错误！");
//		return false;
//	};
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
			//TODO 其它验证暂时未写
			return opertionRecordFormValidate();
		},
		saveCallback:function(data){
			dialog.close();
			shoushuJiluPageList(null);
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
	var iot = datetimepicker(form.find("input#opertionTime"),{
		defaultSelect:false,
		onShow:function(){
				var val = $.trim($("input#appointmentTime").val());
				if(!val.length){
					return formatDate(new Date().getTime());
				}
				val = val.split(" ")[0];
				this.setOptions({minDate:val});
			}
	});
	datetimepicker(form.find("input#opertionCompleteTime"),{
		defaultSelect:false,
		onShow:function(){
			var val = $.trim($("input#appointmentTime").val());
			if(!val.length){
				return formatDate(new Date().getTime());
			}
			val = val.split(" ")[0];
			this.setOptions({minDate:val});
		}
	});
	datetimepicker(form.find("input#appointmentTime"));
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
		if(val==0){
			tag.next().next().text("");
			return;
		}
		var s = $("select[name=childCategory]");
		if(s.length)
			s.text("");
		else
			s = $("<select />").attr("name","childCategory").appendTo(tag.next().next());
		$.each(childOperationCategories,function(_i,_d){
			$("<option />").val(_d.value).text(_d.name).appendTo(s);
		});
		if(c)
			s.val(c);
	}
}
/**
 * 显示手术字典清单
 * @param inputCode
 * @param data
 */
function showOperationDictList(form, data){
	var val = $("textarea#operationName").val();
	var textarea = $("textarea#operationName").replaceWith($("<div />").width($("#operationName").width()).height($("#operationName").height()).attr('id','operationNameDiv'));
	var td = $("#operationNameDiv").parent();
	var td0 = td.prev();
	textarea = $("#operationNameDiv").css({boder:"1px solid #9fffff",background:"#fff",border:"1px solid #666"});
	var tag = form.find("input#category").parent().text("");
	showOperationCategoryForOperationForm(data,tag);
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
				data = $.extend(data,{sex:sex,age:age,patientName:re.obj.name});
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
		}else{
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
//		$("<option />").appendTo(fas);
		doctorSelect.children("option").clone().appendTo(fas);
		$.each($("select#groupId").children("option"),function(i,option){
			var id = $(option).val();
			if(id==1||id==_d.groupId)return true;
			var l = getJSONData(FIND_OPERATION_GRUOP_MEMBERS_URL,{groupId:id},"POST");
			$.each(l,function(n,d){
				var workNo = d.groupMemberId.workNo;
				if(fas.children("option[value="+workNo+"]").length) return true;
				$("<option />").val(workNo).text(d.name).appendTo(fas);
			});
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