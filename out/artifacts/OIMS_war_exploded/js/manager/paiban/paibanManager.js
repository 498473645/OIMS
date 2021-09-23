var findWorkforceByPageUrl = "/publish/workforce/findWorkforceByPage.htm";
var workforcebtn;//排班管理权限按钮
var paibanArray = null;
var currentpbtb = null;
/**
 * 单位管理==>排班管理
 * 入口函数
 */
function showPaipanPageList(btns){
	if(btns != undefined && btns != null){
		workforcebtn = btns;
	}else{
		btns = workforcebtn;
	}
	pageTitle = "排班管理";
	init();
	listFactor = {
			url : contextPath + findWorkforceByPageUrl,// url
			method : "post",
			checkbox : true,
			single : true,
			listObj : [ {
				title:"序号",
				key : "id"
			},{
				title : "类别",
				key : "leibie",
				func : function(v){
					if(v == 1){
						return "门诊排班";
					}else if(v == 2){
						return "护理排班";
					}else{
						return "住院排班";
					}
				}
			},{
				title:"生效日期",
				key : "startTime"
			},{
				title:"失效日期",
				key : "endTime"
			},{
				title:"启用",
				key:"isqiyong",
				func:function(v){
					if(v == 0){
						return "禁用";
					}else{
						return "启用";
					}
				}
			},{
				title:"是否临时",
				key:"istemp",
				func:function(v){
					if(v == 1){
						return "临时";
					}else if(v == 2){
						return "常规";
					}else{
						return "异常";
					}
				}
			},{
				title:"操作人工号",
				key:"gonghao"
			}],
			data : {// data表示传的参数
				currentPage : 1,
				pageSize : getPageSize(),
				tag : Math.random()
			}
		};
	
	var searchDiv = $("<div />").attr("id","advquery").addClass("advquery").appendTo("#right");
	var table = $("<table />").appendTo(searchDiv);
	var tr = $("<tr />").appendTo(table);
	var td = $("<td />").attr("width","23%").addClass("leftalign").appendTo(tr);
	var normalText = "请输入关键字";
	var input = $("<input />").val(normalText).addClass("blur blurview").blur(function(){
		var val = $.trim($(this).val());
		if(val.length && val!=normalText)return;
		$(this).addClass("blur blurview").removeClass("focus");
		if(!val.length)$(this).val(normalText);
	}).focus(function(){
		var val = $.trim($(this).val());
		if(val==normalText)
			$(this).removeClass().addClass("focus").val("");
	}).attr("name","keyword").appendTo(td);
	
	$("<a />").addClass("search").text("查询").click(function(){
		var val = $.trim(input.val());
		if(!val.length || val==normalText || val==$(this).data("keyword")){
			return;
		}
		$(this).data("keyword",val);
		var inputKeyword = $("#pageForm").children("input[name=keyword]");
		if(!inputKeyword.length){
			inputKeyword = $("<input />").attr("name","keyword").attr("type","hidden").appendTo("#pageForm");
		}
		$("#pageForm").children("input[name=currentPage]").val(1);
		inputKeyword.val(val);
		$("#pageForm").submit();
	}).appendTo($("<td />").attr("width","7%").appendTo(tr));
	
	td = $("<td />").appendTo(tr);
	var tag = $("<div />").addClass("btn").appendTo(td);
	showMyBTNS(btns,tag);
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
				.appendTo("#right");
	$(div_list).createPageList(listFactor);
}

/**
 * 新增排班
 */
function addPaiban(){
	paiban_saveOrUpdateForm(1);
}

/**
 * 修改排班
 */
function editPaiban(){
	var data = getCheckBoxValue();
	if(data.length==0){
		$.oimsAlert("请选择要修改的对象！");
		return;
	}
	paiban_saveOrUpdateForm(2,data[0]);
}

/**
 * 删除排班
 */
function delPaiban(){
	var data = getCheckBoxValue();
	if(data.length==0){
		$.oimsAlert("请选择要删除的对象！");
		return;
	}
	var result = getJSONData("/publish/workforce/deleteWorkforce.htm",{id:data[0].id,tag:Math.random()},"POST");
	if(result != null){
		if(result.state){
			$.oimsSucc("删除成功！");
			paibanArray = null;
			currentpbtb = null;
			showPaipanPageList();
		}else{
			$.oimsAlert(result.message);
		}
	}else{
		$.oimsAlert("删除失败！");
	}
}

/**
 * 查看排班
 * */
function viewPaiban(){
	var data = getCheckBoxValue();
	if(data.length==0){
		$.oimsAlert("请选择要查看的对象！");
		return;
	}
	paiban_saveOrUpdateForm(3,data[0]);
}

/**
 * 启用排班
 */
function enablePaiban(){
	var data = getCheckBoxValue();
	if(data.length==0){
		$.oimsAlert("请选择要启用的对象！");
		return;
	}
	
	tempablePaiban(data[0].id,1);
}

/**
 * 禁用排班
 */
function disEnablePaiban(){
	var data = getCheckBoxValue();
	if(data.length==0){
		$.oimsAlert("请选择要禁用的对象！");
		return;
	}
	tempablePaiban(data[0].id,0);
}

/**
 * 启用 禁用调用
 * */
function tempablePaiban(id,enable){
	var result = getJSONData("/publish/workforce/updateWorkforceObject.htm",{id:id,isqiyong:enable,tag:Math.random()},"POST");
	if(result != null && result.state){
		$.oimsSucc("操作成功！");
	}else{
		$.oimsAlert("操作失败！");
	}
	
	paibanArray = null;
	currentpbtb = null;
	showPaipanPageList();
}

/**
 * 新增或者修改方法
 * dunum 新增 修改 查看
 * 新增1 修改2 查看3
 */
function paiban_saveOrUpdateForm(dunum,obj){
	init();
	
	importCSS("/js/manager/paiban/template/style.css");
	var h = $("#right").height()-$("#right").children("div.title").outerHeight();
	var rTag = $("<div />").width(200).height(h).addClass("deptTag").appendTo("#right");
	var mTag = $("<div />").addClass("memberList").height(h).css({"overflow-y":"scroll","background":"#fff"}).appendTo("#right");
	var t = $("<div />").addClass("groupTitle").html("<span>排班管理</span> | ").appendTo(mTag);
	$("<div />").addClass("groupTitle").text("部门员工").appendTo(rTag);
	$("<a />").attr("href","javascript:void(0)").text("（返回）").click(function(){
		paibanArray = null;
		currentpbtb = null;
		showPaipanPageList();
	}).appendTo(t);
	$("<span> | </span>").appendTo(t);
	if(dunum == 1 || dunum == 2){
		$("<a />").attr("href","javascript:void(0)").text("（提交）").click(function(){
			/*$.each(paibanArray,function(i,v){
				alert(v.names);
			});*/
			if(paibanArray == null || paibanArray.length < 1){
				$.oimsError("请加入排班人员！");
				return;
			}
			var leibie = $("#leibie").val();
			var istemp = $("#istemp").val();
			var startTime = $("#startTime").val();
			var endTime = $("#endTime").val();
			if(startTime == ""){
				$.oimsError("请选择生效日期！");
				return;
			}
			if(istemp == 2 && endTime == ""){
				$.oimsError("请选择失效日期！");
				return;
			}
			var wfId = $("#wfId").val();
			if(dunum == 1){
				if(wfId == 0){
					var paibanbgs = getJSONData("/publish/workforce/saveWorkforceObject.htm",{leibie:leibie,istemp:istemp,startTime:startTime,endTime:endTime,tag:Math.random()},"POST");
					if(paibanbgs != null && paibanbgs.state){
						var pbflag = false;
						$.each(paibanArray,function(k,m){
							var pbslis = getJSONData("/publish/workforce/saveWorkforceChild.htm",{wmid:paibanbgs.obj,bgsid:m.bgsid,lie:m.lie,gonghaos:m.gonghaos,names:m.names,endTime:startTime,chenum:m.chenum,tag:Math.random()},"POST");
							if(!pbslis.state){
								pbflag = true;
							}
							
						});
						if(pbflag){
							$.oimsError("提交失败！");
						}else{
							$("#wfId").val(paibanbgs.obj);
							$.oimsSucc("提交成功！",function(){
								paibanArray = null;
								currentpbtb = null;
								showPaipanPageList();
							});
						}
					}else{
						$.oimsError("提交失败！");
					}
					
				}else{
					//TODO 修改
					var pbupdate = getJSONData("/publish/workforce/updateWorkforceObject.htm",{id:$("#wfId").val(),leibie:leibie,istemp:istemp,startTime:startTime,endTime:endTime,tag:Math.random()},"POST");
					if(pbupdate.state){
						$.each(paibanArray,function(k,m){
							var pbslis = getJSONData("/publish/workforce/updateWorkforceChild",{id:m.id,bgsid:m.bgsid,lie:m.lie,gonghaos:m.gonghaos,names:m.names,wmid:m.wmid,endTime:$("#startTime").val(),chenum:m.chenum,tag:Math.random()},"POST");
							if(!pbslis.state){
								pbflag = true;
							}
							
						});
						if(pbflag){
							$.oimsError("提交失败！");
						}else{
							fillWorkforceData($("#wfId").val());
							$.oimsSucc("提交成功！",function(){
								paibanArray = null;
								currentpbtb = null;
								showPaipanPageList();
							});
						}
					}else{
						$.oimsError("提交失败！");
					}
					
				}
			}else if(dunum == 2){
				var pbupdate = getJSONData("/publish/workforce/updateWorkforceObject.htm",{id:$("#wfId").val(),leibie:leibie,istemp:istemp,startTime:startTime,endTime:endTime,biaoshi:1,tag:Math.random()},"POST");
				if(pbupdate.state){
					$.each(paibanArray,function(k,m){
						var pbslis = getJSONData("/publish/workforce/updateWorkforceChild.htm",{id:m.id.toString(),bgsid:m.bgsid,lie:m.lie,gonghaos:m.gonghaos,names:m.names,wmid:m.wmid,endTime:$("#startTime").val(),chenum:m.chenum,tag:Math.random()},"POST");
						if(!pbslis.state){
							pbflag = true;
						}
						
					});
					if(pbflag){
						$.oimsError("提交失败！");
					}else{
						fillWorkforceData($("#wfId").val());
						$.oimsSucc("提交成功！",function(){
							paibanArray = null;
							currentpbtb = null;
							showPaipanPageList();
						});
					}
				}else{
					$.oimsError("提交失败！");
				}
			}
		}).appendTo(t);
	}
	if(dunum == 1 || dunum == 2){
		showDeptAndStaffpb(rTag,mTag);
	}
	$("<input type='hidden' id='wfId' value='0' /><select id='leibie' style='width:15%;'><option value='1'>门诊排班</option><option value='2'>护理排班</option><option value='3'>住院排班</option></select>").appendTo(mTag);
	$("<span>&nbsp;&nbsp;&nbsp;&nbsp;是否临时排班：&nbsp;</span><select id='istemp' style='width:10%'><option value='2'>常规</option><option value='1'>临时</option>").appendTo(mTag);
	$("<span>&nbsp;&nbsp;&nbsp;&nbsp;生效日期：&nbsp;</span><input type='text' id='startTime' />").appendTo(mTag);
	$("<span>&nbsp;&nbsp;&nbsp;&nbsp;失效日期：&nbsp;</span><input type='text' id='endTime' />").appendTo(mTag);
	calendarFun("startTime");// 生效时间
	calendarFun("endTime");// 失效时间
	$("<hr/>").appendTo(mTag);
	
	/*$("#memo").replaceWith(
			$("<span/>").attr("id", "memo").html(
					memo));*/
	if(obj != undefined){
		$("#wfId").val(obj.id);
		fillWorkforceData(obj.id);
		$("#leibie").val(obj.leibie);
		$("#istemp").val(obj.istemp);
		//修改 禁止选择类别和临时排班
		$.each($("#leibie").find("option"),function(i,v){
			if($(v).val() != obj.leibie){
				$(v).remove();
			}
		});
		$.each($("#istemp").find("option"),function(i,v){
			if($(v).val() != obj.istemp){
				$(v).remove();
			}
		});
		$("#startTime").val(ChangeDateToString(obj.startTime));
		$("#endTime").val(ChangeDateToString(obj.endTime));
	}
	
	var table = $("<table/>").css({"border":"1px solid black","width":"100%"}).attr("id","maintable").appendTo(mTag);
	$("<tr><th colspan='2' scope='col'  >&nbsp;</th><th scope='col' style='width:12.5%;' >周一</th><th scope='col' style='width:12.5%;'>周二</th><th scope='col' style='width:12.5%;'>周三</th><th scope='col' style='width:12.5%;'>周四</th><th scope='col' style='width:12.5%;'>周五</th><th scope='col' >周六</th><th scope='col' style='width:12.5%;'>周日</th></tr>").appendTo(table);
	tmpCreateTr(table,dunum);
	$("#leibie").change(function(){
		/*$.each($("#maintable").find("tr"),function(){
			if($(this).find("td").length > 0){//这里 会把th那一行也删除
				$(this).parent().remove();
			}
		});*/
		$.each($("#maintable").find("tr"),function(){
			if($(this).find("th").length > 0){//索性全部删除
				$(this).parent().remove();
			}
		});
		$("<tr><th colspan='2' scope='col'  >&nbsp;</th><th scope='col' style='width:12.5%;' >周一</th><th scope='col' style='width:12.5%;'>周二</th><th scope='col' style='width:12.5%;'>周三</th><th scope='col' style='width:12.5%;'>周四</th><th scope='col' style='width:12.5%;'>周五</th><th scope='col' >周六</th><th scope='col' style='width:12.5%;'>周日</th></tr>").appendTo($("#maintable"));
		paibanArray = null;
		currentpbtb = null;
		if(obj != undefined){
			$("#wfId").val(obj.id);
			fillWorkforceData(obj.id);
		}
		tmpCreateTr($("#maintable"),dunum);
	});
	
	if(dunum == 2){//修改
		//修改前 需要填充数据
		
		
	}else if(dunum == 3){//查看
		//查看前 需要填充数据 并且让下拉框及选项失效
		var leibie = $("#leibie").val();
		if(leibie == 1){
			leibie = "门诊排班";
		}else if(leibie == 2){
			leibie = "护理排班";
		}else{
			leibie = "住院排班";
		}
		var istemp = $("#istemp").val();
		if(istemp == 2){
			istemp = "常规";
		}else{
			istemp = "临时";
		}
		var startTime = $("#startTime").val();
		var endTime = $("#endTime").val();
		$("#leibie").replaceWith(
		$("<span/>").attr("id", "leibie").html(
				leibie));
		$("#istemp").replaceWith(
				$("<span/>").attr("id", "istemp").html(
						istemp));
		$("#startTime").replaceWith(
				$("<span/>").attr("id", "startTime").html(
						startTime));
		$("#endTime").replaceWith(
				$("<span/>").attr("id", "endTime").html(
						endTime));
	}
	
}

function fillWorkforceData(id){
	var datafill = getJSONData("/publish/workforce/findWorkforceChildByWid.htm",{wid:id,tag:Math.random()},"POST");
	if(datafill.state && datafill.obj != null){
		paibanArray = null;
		currentpbtb = null;
		$.each($(".aparent"),function(){
			$(this).removeClass("aparent");
			$(this).removeClass("aown");
		});
		$.each($(".selectPaiban"),function(){
			$(this).removeClass("selectPaiban");
			$(this).addClass("normalPaidui");
		});
		$.each(datafill.obj,function(i,v){
			var pbtd = {"bgsid":v.zsid,"lie":v.weekday,"gonghaos":v.yggroup,"names":v.yggroupxm,"id":v.id,"wmid":v.workid,"endTime":v.endTime,"targegh":v.targegh,"repgh":v.repgh,"chenum":v.chenum};
			if(paibanArray != null && paibanArray != undefined && paibanArray.length > 0){
							
			}else{
				paibanArray = new Array();
			}
			paibanArray.push(pbtd);
		});
	}
}
/**
 * 初始化表格
 * 若dunum 是3 则不需要td的click事件
 * */
function tmpCreateTr(table,dunum){
	var paibanbgs = getJSONData("/publish/workforce/findPaibanBGSListQiyong.htm",{leibie:$("#leibie").val(),tag:Math.random()},"POST");
	if(paibanbgs.state && paibanbgs.obj != null){
		var leibie = "";
		if($("span[id='leibie']").length == 1){
			leibie = $.trim($("span[id='leibie']").html());
			if(leibie == "门诊排班"){
				leibie = 1;
			}else if(leibie == "护理排班"){
				leibie = 2;
			}else if(leibie == "住院排班"){
				leibie = 3;
			}
		}else{
			leibie = $("#leibie").val();
		}
		$.each(paibanbgs.obj,function(i,v){
			if(leibie == 1){
				$("<tr><th rowspan='2' scope='row'>"+v.bgs+"<input type='hidden' value='"+v.id+"' id='bgs"+v.id+"' /></th><th scope='row' style='width:30px;'>上午<input type='hidden' value='0' id='0index"+v.id+"' /></th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>").appendTo(table);
				$("<tr><th scope='row' style='width:30px;'>下午<input type='hidden' value='1' id='1index"+v.id+"' /></th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>").appendTo(table);
			}else if(leibie == 2){
				$("<tr><th rowspan='3'  scope='row'>"+v.bgs+"<input type='hidden' value='"+v.id+"' id='bgs"+v.id+"' /></th><th scope='row' style='width:30px;'>白班<input type='hidden' value='0' id='0index"+v.id+"' /></th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>").appendTo(table);
				$("<tr><th scope='row' style='width:30px;'>中班<input type='hidden' value='1' id='1index"+v.id+"' /></th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>").appendTo(table);
				$("<tr><th scope='row' style='width:30px;'>夜班<input type='hidden' value='2' id='2index"+v.id+"' /></th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>").appendTo(table);
			}else{
				$("<tr><th  scope='row'>"+v.bgs+"<input type='hidden' value='"+v.id+"' id='bgs"+v.id+"' /></th><th scope='row' style='width:30px;'>全天<input type='hidden' value='5' id='5index"+v.id+"' /></th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>").appendTo(table);
			}
			//$("<tr><th>"+v.bgs+"<input type='hidden' value='"+v.id+"' id='bgs"+v.id+"' /></th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>").appendTo(table);

		});
	}
	
	if(paibanArray != null && paibanArray != undefined && paibanArray.length > 0){
		$.each(paibanArray,function(xi,xv){
			//{"bgsid":vau,"lie":lienum,"gonghaos":"","names":"","id":"","wmid":"","endTime":"","replaceygs":"","chenum":""};
			//因为这里 显示错误
			var num = parseInt(xv.lie)-1;
			if(xv.chenum == 0){
				$("#0index"+xv.bgsid).parent().parent().find("td:eq("+num+")").html(xv.names);
			}else if(xv.chenum == 1){
				$("#1index"+xv.bgsid).parent().parent().find("td:eq("+num+")").html(xv.names);
			}else if(xv.chenum == 2){
				$("#2index"+xv.bgsid).parent().parent().find("td:eq("+num+")").html(xv.names);
			}else if(xv.chenum == 5){
				$("#bgs"+xv.bgsid).parent().parent().find("td:eq("+num+")").html(xv.names);
			}
		});
	}
	
	$.each($("th"),function(i,v){
		$(v).css({"background":"#ddd"});
	});
	
	$.each($("td"),function(i,v){
		$(v).css({"height":"50px","width":"12.5%"}).addClass("normalPaidui").click(function(){
			if(dunum != 3){
				$.each($(".aparent"),function(){
					$(this).removeClass("aparent");
					$(this).removeClass("aown");
				});
				$.each($(".selectPaiban"),function(){
					$(this).removeClass("selectPaiban");
					$(this).addClass("normalPaidui");
				});
				$(this).removeClass("normalPaidui");
				$(this).addClass("selectPaiban");
				var vau = "";
				var indexNum = "";
				var lienum = "";
				if($(this).parent().find("th").length == 1){
					//alert($(this).parent().find("th").find("input").attr("id"));
					indexNum = $(this).parent().find("th").find("input").val();
					if(indexNum == 1){
						vau = $(this).parent().prev().find("th:eq(0)").find("input:eq(0)").val();
					}else if(indexNum == 2){
						vau = $(this).parent().prev().prev().find("th:eq(0)").find("input:eq(0)").val();
					}
					
				}
				if($(this).parent().find("th").length == 2){
					//alert($(this).parent().find("th:eq(0)").attr("rowspan"));
					vau = $(this).parent().find("th:eq(0)").find("input").val();
					indexNum = $(this).parent().find("th:eq(1)").find("input").val();
					lienum = $(this).prevAll().length-1;
				}else{
					lienum = $(this).prevAll().length;
				}
				if(paibanArray != null && paibanArray != undefined && paibanArray.length > 0){
					var flag = true;
					//alert(paibanArray);
					$.each(paibanArray,function(xi,xv){
						//alert(xv.bgsid+";"+vau+";;;"+xv.lie+";"+lienum+";;;"+xv.chenum+";"+indexNum);
						if(xv.bgsid == vau && xv.lie == lienum && xv.chenum == indexNum){//填充数据
							$(this).html(xv.names);
							currentpbtb = xv;
							if(currentpbtb.gonghaos != ""){
								$.each(currentpbtb.gonghaos.split(","),function(fix,fiv){
									$("#yg"+fiv).addClass("aparent");
									$("#yg"+fiv).addClass("aown");
								})
							}
							flag = false;
						}
					});
					if(flag){//当单元格在数组中没有记录时 添加单元格数据到数组
						var pbtd = {"bgsid":vau,"lie":lienum,"gonghaos":"","names":"","id":"","wmid":"","endTime":"","targegh":"","repgh":"","chenum":indexNum};
						paibanArray.push(pbtd);
						currentpbtb = pbtd;
					}
				}else{
					paibanArray = new Array();
					var pbtd = {"bgsid":vau,"lie":lienum,"gonghaos":"","names":"","id":"","wmid":"","endTime":"","targegh":"","repgh":"","chenum":indexNum};
					paibanArray.push(pbtd);
					currentpbtb = pbtd;
				}
				
			}
		});
	});
}

/**
 * 选择部门 显示员工信息
 * **/
function showDeptAndStaffpb(rTag,mTag){
	var sDept = $("<select />").change(function(){
		var val = $(this).val();
		if(val.length)
			showStaff(val);
	}).css({width:"100%"}).appendTo(rTag);
	var tag = $("<div />").css({overflow:"auto"}).height(rTag.innerHeight()-sDept.outerHeight()-rTag.children("div:first").outerHeight()-2).appendTo(rTag);
	var re = getJSONData("/publish/bumen/findAllBuMen.htm",{tag:Math.random()},"POST");
	$("<option />").val("").text("部门").appendTo(sDept);
	$.each(re.obj,function(i,d){
		$("<option />").val(d.id).text(d.bmmc).appendTo(sDept);
	});
	function showStaff(val){
		tag.text("");
		re = getJSONData("/publish/yuangong/findYuangongByBumenId.htm",{deptId:val,tag:Math.random()},"POST");
		if(!re.state)
			return;
		$.each(re.obj,function(i,d){
			$("<a />").click(function(){
				if($(".selectPaiban").length > 0){
					var itclass = $(this).attr("class");
					if(itclass.indexOf("aparent") == -1){//向单元格增加
						if($(".selectPaiban").html() == ""){
							$(".selectPaiban").append(d.xingming);//名字添加到单元格
						}else{
							$(".selectPaiban").append(" "+d.xingming);//名字添加到单元格
						}
						if(currentpbtb.gonghaos == ""){
							var widpai = "";
							var paivid = "";
							//{"bgsid":vau,"lie":lienum,"gonghaos":"","names":"","id":"","wmid":"","endTime":"","targegh":"","repgh":""};
							$.each(paibanArray,function(paix,paiv){//先删除原先数组中对应元素
								if(paiv != undefined && paiv.bgsid == currentpbtb.bgsid && paiv.lie == currentpbtb.lie && paiv.chenum == currentpbtb.chenum){
									widpai = paiv.wmid;
									paivid = paiv.id;
									paibanArray.splice(paix,1);
								}
							});
							currentpbtb.gonghaos = d.gonghao;
							currentpbtb.names = d.xingming;
							if(widpai != undefined && widpai != "" && paivid != "" && paivid != undefined){
								currentpbtb.wmid = widpai;
								currentpbtb.id = paivid;
							}
							if($("#wfId").val() != null && $("#wfId").val() != undefined && $("#wfId").val() != 0){
								currentpbtb.wmid = $("#wfId").val();
							}
							paibanArray.push(currentpbtb);//将元素添加到数组
						}else{
							var widpai = "";
							var paivid = "";
							$.each(paibanArray,function(paix,paiv){//先删除原先数组中对应元素
								if(paiv != undefined && paiv.bgsid == currentpbtb.bgsid && paiv.lie == currentpbtb.lie && paiv.chenum == currentpbtb.chenum){
									widpai = paiv.wmid;
									paivid = paiv.id;
									paibanArray.splice(paix,1);
								}
							});
							currentpbtb.gonghaos = currentpbtb.gonghaos+","+d.gonghao;
							currentpbtb.names = currentpbtb.names+","+d.xingming;
							if(widpai != undefined && widpai != "" && paivid != "" && paivid != undefined){
								currentpbtb.wmid = widpai;
								currentpbtb.id = paivid;
							}
							paibanArray.push(currentpbtb);//将元素添加到数组
						}
					}else{//单元格内数据删除
						if(currentpbtb.gonghaos.indexOf(",") == -1){//当单元格内只有一个元素的时候
							var widpai = "";
							var paivid = "";
							$.each(paibanArray,function(paix,paiv){//先删除原先数组中对应元素
								if(paiv != undefined && paiv.bgsid == currentpbtb.bgsid && paiv.lie == currentpbtb.lie && paiv.chenum == currentpbtb.chenum){
									widpai = paiv.wmid;
									paivid = paiv.id;
									paibanArray.splice(paix,1);
								}
							});
							currentpbtb.gonghaos = "";
							currentpbtb.names = "";
							if(widpai != undefined && widpai != "" && paivid != "" && paivid != undefined){
								currentpbtb.wmid = widpai;
								currentpbtb.id = paivid;
							}
							paibanArray.push(currentpbtb);//将元素添加到数组
							$(".selectPaiban").html("");//清空单元格内元素
						}else{
							var widpai = "";
							var paivid = "";
							$.each(paibanArray,function(paix,paiv){//先删除原先数组中对应元素
								if(paiv != undefined && paiv.bgsid == currentpbtb.bgsid && paiv.lie == currentpbtb.lie && paiv.chenum == currentpbtb.chenum){
									widpai = paiv.wmid;
									paivid = paiv.id;
									paibanArray.splice(paix,1);
								}
							});
							var gonghaos = "";
							var names = "";
							var text = "";
							var indexpai = "";
							$.each(currentpbtb.gonghaos.split(","),function(paix,paiv){
								if(paiv != d.gonghao){
									if(gonghaos == ""){
										gonghaos = paiv;
									}else{
										gonghaos = gonghaos+","+paiv;
									}
								}else{
									indexpai = paix;
								}
							});
							$.each(currentpbtb.names.split(","),function(paix,paiv){
								if(paix != indexpai){
									if(names == ""){
										names = paiv;
									}else{
										names = names+","+paiv;
									}
								}
							});
							text = names.replace(","," ");
							while(text.indexOf(",") != -1){//一次获取不能将所有的都改变
								text = text.replace(","," ");
							}
							currentpbtb.gonghaos = gonghaos;
							currentpbtb.names = names;
							if(widpai != undefined && widpai != "" && paivid != "" && paivid != undefined){
								currentpbtb.wmid = widpai;
								currentpbtb.id = paivid;
							}
							paibanArray.push(currentpbtb);//将元素添加到数组
							$(".selectPaiban").html(text);
						}
					}
					$(this).toggleClass("aparent aown");
				}else{
					$.oimsError("请选择需要排班诊室对应的单元格！");
				}
			}).hover(function(){
				$(this).addClass("hover");
				$(this).children("a").addClass("hover");
			},function(){
				$(this).removeClass("hover");
				$(this).children("a").removeClass("hover");
			}).css({display:"block",border:"1px solid #ddd", margin:"2px","text-align":"center","line-height":"22px"})
				.text(d.xingming).attr("id","yg"+d.gonghao).appendTo(tag);
		});
	}
}

//时间转成字符串
function ChangeDateToString(DateIn)
{
    var Year=0;
    var Month=0;
    var Day=0;
    var CurrentDate="";
    //初始化时间
    Year      = DateIn.year+1900;
    Month     = DateIn.month+1;
    Day       = DateIn.date;

    CurrentDate = Year + "-";
    if (Month >= 10 ){
        CurrentDate = CurrentDate + Month + "-";
    }else{
        CurrentDate = CurrentDate + "0" + Month + "-";
    }
    if (Day >= 10 ){
        CurrentDate = CurrentDate + Day ;
    }else{
        CurrentDate = CurrentDate + "0" + Day ;
    }
    return CurrentDate;
}