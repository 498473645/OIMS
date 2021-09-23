var SAVE_DEPTGROUP_URL = "/publish/deptGroup/saveOrUpdateDeptGroup.htm";
var FIND_DEPTGROUP_URL = "/publish/deptGroup/findDeptGroupList.htm";
var SAVE_DEPT_GROUP_MEMBER_URL="/publish/deptGroup/saveOrUpdateGroupMember.htm";
var FIND_DEPT_STAFF_URL="/publish/yuangong/findYuangongByBumenId.htm";
var FIND_DEPT_GROUP_MEMBER_URL="/publish/deptGroup/findGroupMember.htm";
var DELETE_DEPT_GROUP_URL="/publish/deptGroup/deleteDeptGroup.htm";
var FIND_DEPT_GROUP_PATIENT_URL="/publish/deptGroup/findDeptGroupPatients.htm";
var FIND_PATIENT_URL = "/publish/huanZheXinXi/getHuanzhexinxiByBLH.htm";
var SAVE_GROUP_PATIENT_URL = "/publish/deptGroup/addDeptGroupPatient.htm";
var DELETE_GROUP_PATIENT_URL = "/publish/deptGroup/deleteDeptGroupPatient.htm";
var FIND_GROUP_PATIENT_MSGS_URL = "/publish/deptGroup/findDeptGroupPatientMsgs.htm";
var SAVE_GROUP_PATIENT_MSG_URL="/publish/deptGroup/saveOrDeptGroupPatientMsg.htm";
var FIND_JIANLI_URL="/publish/yuangong/findJianLiByConditon.htm" ;
var EXPORTALLARTCLE="/publish/yuangong/exportAllArtcle.htm" ;
var EXPORTSOMEARTCLE="/public/yuangong/exportSomeArtcle.htm";
var _emr_getprintdata_url = '/publish/emr/getprintdata.htm'; 

var groupLevelValues = [{value:0,name:'组长'},{value:1,name:'组员'}];
function showDeptGroupManage(btns){
	importCSS("/js/manager/shoushu/template/style.css");
	var h = $("#right").height()-$("#right").children("div.title").outerHeight();
	var rTag = $("<div />").width(200).height(h).addClass("deptTag").appendTo("#right");
	var lTag = $("<div />").width(200).height(h).addClass("groupTag").appendTo("#right");
	var mTag = $("<div />").addClass("memberList").height(h).css({"overflow-y":"hidden","background":"#fff"}).appendTo("#right");
	$("<div />").addClass("groupTitle").text("课题组").appendTo(lTag);
	$("<div />").addClass("groupTitle").text("部门员工").appendTo(rTag);
	var t = $("<div />").addClass("groupTitle").html("<span>组内成员</span> | ").appendTo(mTag);
	var form = $("<form />").attr("action",contextPath+SAVE_DEPT_GROUP_MEMBER_URL).attr("method","post").css("overflow","auto").height(mTag.innerHeight()-t.outerHeight()).addClass("list").appendTo(mTag);
	form.ajaxForm({
			dataType : "json",
			success : function(d) {
				if(d.state){
					$.oimsSucc("保存成功！");
					isFormNotSubmit=false;
				}else
					$.oimsError("保存失败！");
			}
		});
	$("<a />").attr("href","javascript:void(0)").text("（保存）").click(function(){
		form.submit();
	}).appendTo(t);
	showKeyanDeptAndStaff(rTag,mTag);
	showDeptGroupList(lTag,mTag);
}
function showKeyanDeptAndStaff(rTag,mTag){
	var sDept = $("<select />").change(function(){
		var val = $(this).val();
		if(val.length)
			showStaff(val);
	}).css({width:"100%"}).appendTo(rTag);
	var tag = $("<div />").css({overflow:"auto"}).height(rTag.innerHeight()-sDept.outerHeight()-rTag.children("div:first").outerHeight()-2).appendTo(rTag);
	var re = getJSONData(FIND_DEPT_URL,null,"POST");
	$("<option />").val("").text("部门").appendTo(sDept);
	$.each(re.obj,function(i,d){
		$("<option />").val(d.id).text(d.bmmc).appendTo(sDept);
	});
	function showStaff(val){
		tag.text("");
		re = getJSONData(FIND_DEPT_STAFF_URL,{deptId:val},"POST");
		if(!re.state)
			return;
		$.each(re.obj,function(i,d){
			$("<a />").click(function(){
				var table = mTag.find("table");
				if(!table.find("input[name=workNo][value="+d.gonghao+"]").length){
					isFormNotSubmit=true;
					addDeptGroupMember(table,{groupMemberId:{workNo:d.gonghao},name:d.xingming,firstTitle:d.zhiwu,secondTitle:d.title,deptId:d.bumenId});
				}
			}).hover(function(){
				$(this).addClass("hover");
				$(this).children("a").addClass("hover");
			},function(){
				$(this).removeClass("hover");
				$(this).children("a").removeClass("hover");
			}).css({display:"block",border:"1px solid #ddd", margin:"2px","text-align":"center","line-height":"22px"})
				.text(d.xingming).appendTo(tag);
		});
	}
}

function showDeptGroupList(lTag,mTag){
	var listTag = $("<div />").css({overflow:"auto"}).height(lTag.innerHeight()-lTag.children("div:first").outerHeight()-2).appendTo(lTag);
	var re = getJSONData(FIND_DEPTGROUP_URL,{tag:Math.random()},"POST");
	var ul = $("<ul />").appendTo(listTag);	
	$.each(re.obj,function(i,d){
		genGroupELE(d).appendTo(ul);
		if(i==0)showDeptGroupMember(d.id, d.name, mTag);
	});
	var normalText = "请输入新组名称";
	$("<input />").val(normalText).attr("type","text").css({color:"#ccc"}).blur(function(){
		var val = $.trim($(this).val());
		if(!val.length||val==normalText){
			$(this).val(normalText).css("color","#ccc");
			return;
		}
		var r = getJSONData(SAVE_DEPTGROUP_URL,{name:val},"POST");
		if(r.state){
			genGroupELE(r.obj).appendTo(ul);
			showDeptGroupMember(r.obj.id,r.obj.name, mTag);
			$(this).val(normalText).css("color","#ccc");
		}else{
			$.oimsError("保存分组失败！");
		}
	}).focusin(function(){
		var i = $(this);
		if(isFormNotSubmit){
			$.oimsConfirm("成员修改后未保存，要保存吗？",function(){
				i.blur();
				mTag.find("form").submit();
			});
		}else
			i.val("").css("color","#000");
	}).appendTo(listTag);
	
	function genGroupELE(d){
		var li = $("<li />").data("id",d.id).data("name",d.name).hover(function(){
			$(this).addClass("hover");
			$(this).children("a").addClass("hover");
		},function(){
			$(this).removeClass("hover");
			$(this).children("a").removeClass("hover");
		}).dblclick(function(){
			var id = $(this).data("id");
			var input = $("<input />").data("id",id).val($(this).data("name")).data("val",$(this).data("name")).attr("type","text").blur(function(){
				var val = $.trim($(this).val());
				if(!val.length) val = $(this).data("val");
				if(val==$(this).data("val")){
					$(this).replaceWith(genGroupELE({id:id,name:val}));
					return;
				}
				var r = getJSONData(SAVE_DEPTGROUP_URL,{id:id, name:val},"POST");
				if(r.state){
					$(this).replaceWith(genGroupELE(r.obj));
				}
			});
			$(this).replaceWith(input);
			input.focus();
		});
		$("<a />").addClass("close").attr("title","删除").html("X").click(function(){
			var li = $(this).parent();
			var id = li.data("id");
			if(id==1){
				$.oimsAlert("此项为系统保留组，不能删除！");
				return;
			}
			//删除
			$.oimsConfirm("确定要删除吗？此操作不能恢复！",function(){
				var re = getJSONData(DELETE_DEPT_GROUP_URL,{id:id});
				if(re.state){
					if(mTag.find("input[name=groupId]").val()==id){
						var _li = li.parent().children("li:first");
						if (_li.length && _li.data("id")==id)
							_li = _li.next();
						if (_li.length) {
							_li.children("a:last").click();
						}else{
							mTag.find("form").text("");
							mTag.children("div:first").children("span").text("组内成员");
						}
					}
					li.remove();
				}else{
					$.oimsError("删除失败！");
				}
			});
			
		}).appendTo(li);
		var a = $("<a />").click(function(){
			if(isFormNotSubmit){
				var a = $(this);
				$.oimsConfirm("成员修改后未保存，要保存吗？",function(){
					mTag.find("form").submit();
					showDeptGroupMember(a.parent().data("id"),a.text(), mTag);
				});
			}else
				showDeptGroupMember($(this).parent().data("id"),$(this).text(), mTag);
		}).text(d.name).appendTo(li);
		return li;
	}
}

function showDeptGroupMember(id, name, mTag){
	var re = getJSONData(FIND_DEPT_GROUP_MEMBER_URL,{groupId:id},"POST");
	mTag.children("div:first").children("span").html(name+" - 组内成员");
	var tag = mTag.find("form");
	tag.text("");
	$("<input type='hidden' name='groupId' />").val(id).appendTo(tag);
	var table = $("<table />").appendTo(tag);
	var tr = $("<tr />").append("<th>姓名</th><th>组内角色</th><th>备注</th><th></th>").appendTo(table);
	$.each(re.obj,function(i,d){
		addDeptGroupMember(table,d);
	});
}

function addDeptGroupMember(table,d){
	tr = $("<tr />").appendTo(table);
	$("<input type='hidden' name='workNo' />").val(d.groupMemberId.workNo).appendTo(tr);
	$("<input type='hidden' name='name' />").val(d.name).appendTo(tr);
	$("<td />").text(d.name).appendTo(tr);
//	$("<td />").text(d.firstTitle).appendTo(tr);
//	$("<td />").text(d.secondTitle).appendTo(tr);
	var td = $("<td />").appendTo(tr);
	var s = $("<select />").attr("name","role").change(function(){
		isFormNotSubmit=true;
	}).appendTo(td);
	$.each(groupLevelValues,function(i,o){
		$("<option />").val(o.value).text(o.name).appendTo(s);
	});
	s.val(d.role);
	var note="";
	if(d.note)note=d.note;
	$("<td />").append("<input name=\"note\" type=\"text\" value=\""+note+"\" />").appendTo(tr);
	td = $("<td />").appendTo(tr);
	$("<a />").addClass("close").click(function(){
		if(table.find("tr").length<=2){
			$.oimsAlert("组内至少保留一个成员！");
			return;
		}
		$(this).parent().parent().remove();
		isFormNotSubmit=true;
	}).attr("title","删除此条").text("x").appendTo(td);
}

/**
 * 添加组内患者
 */
function addGroupPatient(){
	var div = $("<div />").addClass("addGroupPatient");
	var qd = $("<div />").width(180).height(190).css({padding:"4px","float":"left","border-right":"1px solid #ccc"}).appendTo(div);
	var gl = $("<div />").width(180).height(190).css({"float":"left",margin:"4px","overflow":"auto"}).appendTo(div);
	$("<h1 />").css({"font-size":13,"line-height":1.5}).text("请选择要加入的课题组").appendTo(gl);
	$("<input />").attr("type","hidden").attr("name","patientId").appendTo(gl);
	$("<input />").attr("type","hidden").attr("name","groupId").appendTo(gl);
	var re = getJSONData(FIND_DEPTGROUP_URL,{tag:Math.random()},"POST");
	if(re.state)
		$.each(re.obj,function(i,d){
			$("<a />").text(d.name).click(function(){
				gl.find("input[name=groupId]").val(d.id);
				gl.children("a").css({border:"1px solid #ccc",background:"#fff",color:"#000"});
				$(this).css({border:"1px solid #ff0000",background:"#ff0000",color:"#fff"});
			}).attr("href","javascript:void(0)").css({margin:4,"line-height":"22px", height:"22px","text-align":"center",border:"1px solid #ccc",background:"#fff",color:"#000",display:"block"}).appendTo(gl);
		});
	
	var normalText="请输入患者ID";
	$("<input />").val(normalText).css({color:"#ccc"}).focusin(function(){
		var val = $.trim($(this).val());
		if(val==normalText)$(this).val("");
		$(this).css({color:"#000"});
	}).blur(function(){
		var val = $.trim($(this).val());
		if(!val.length||val==normalText){
			$(this).val(normalText).css({color:"#ccc"});
			return;
		}
		var re = getJSONData(FIND_PATIENT_URL,{binglihao:val},"POST");
		if(re.obj!=null){
			qd.children("p").remove();
			gl.find("input[name=patientId]").val(re.obj.id);
			$("<p />").css({"text-align":"left","line-height":1.5}).append("姓名："+re.obj.xingming).appendTo(qd);
			$("<p />").css({"text-align":"left","line-height":1.5}).append("性别："+(re.obj.xingbie?"男":"女")).appendTo(qd);
			$("<p />").css({"text-align":"left","line-height":1.5}).append("生日："+formatDate(re.obj.shengri.time)).appendTo(qd);
			$("<p />").css({"text-align":"left","line-height":1.5}).append("电话："+re.obj.dianhua).appendTo(qd);
			$("<p />").css({"text-align":"left","line-height":1.5}).append("手机："+re.obj.shouji).appendTo(qd);
		}
	}).width("100%").appendTo(qd);
	
	var dialog = div.oimsDialog({
		  icon:'view',//窗口图标
	      title:"导入患者",//窗口标题
	      drag:false,//是否允许拖动窗口
	      locked:true,//是否锁屏
	      width:400,
	      height:283,
	      button:[
	         {
				title : "提交",//按纽文字
				func : function(){
					var groupId=$(".addGroupPatient").find("input[name=groupId]").val();
					var patientId=$(".addGroupPatient").find("input[name=patientId]").val();
					var re = getJSONData(SAVE_GROUP_PATIENT_URL,{groupId:groupId,patientId:patientId});
					if(re.state){
						dialog.close();
						showGroupPatientPagelist();
					}else{
						$.oimsError("导入患者失败！");
					}
				},
				isCloseWin:false,//点击后，是否关闭窗口 true关闭，false不关闭
				className : "submit"//指定CSS名称
			  }
	      ]
	  });
}

/**
 * 删除组内患者
 */
function deleteGroupPatient(){
	var data = getCheckBoxValue();
	if(data.length!=1){
		$.oimsAlert("请选择一个患者！");
		return;
	}
	if(data[0].msgCount){
		$.oimsConfirm("这个患者已有讨论记录，是否真要删除？",function(){
			deletePatient();
		});
	}else
		deletePatient();
	function deletePatient(){
		var re = getJSONData(DELETE_GROUP_PATIENT_URL,{groupId:data[0].groupId,patientId:data[0].patientId});
		if(!re.state){
			$.oimsError("删除失败！");
		}
		showGroupPatientPagelist();
	}
}

/**
 * 病例讨论
 */
function addGroupPatientMsg(){
	var data = getCheckBoxValue();
	if(data.length!=1){
		$.oimsAlert("请选择一个患者！");
		return;
	}
	pageTitle="病例讨论";
	init();
	//加入门诊与住院病例显示 
//	var div_bl_show=$("<div class='bl' style='height:700px;margin:4px'/>").appendTo("#right");
//	var div_tab_show=$("<div/>").css({'height':'35px'}).appendTo(div_bl_show);
//	div_tab_show
	var template=common_getHtmlTemplate(contextPath+"/js/manager/keyan/html/bl.html");
	$(template).appendTo("#right");
	getKyBingLi(data[0]);
	var tag = $("<div />").addClass("patientMsgListDiv").css({margin:"4px","line-height":1.5,"height":$('#right').height()-$('div.title').height()-$('div.bl').height()-15,"overflow-y":"auto","overflow-x":"hidden"}).appendTo("#right");
	var patientDiv = $("<div />").addClass("patientDiv").appendTo(tag);
	$("<span />").text("姓名：").appendTo(patientDiv);
	$("<span />").text(data[0].xingming+"，").appendTo(patientDiv);
	$("<span />").text("性别：").appendTo(patientDiv);
	$("<span />").text((data[0].xingbie?"男":"女")+"，").appendTo(patientDiv);
	$("<span />").text("生日：").appendTo(patientDiv);
	$("<span />").text(formatDate(data[0].shengri.time)+"，").appendTo(patientDiv);
	
	var dh = data[0].dianhua;
	if(dh!=null){
		$("<span />").text("电话：").appendTo(patientDiv);
		$("<span />").text(dh+"，").appendTo(patientDiv);
	}
	var shouji = data[0].shouji;
	if(shouji!=null){
		$("<span />").text("手机：").appendTo(patientDiv);
		$("<span />").text(shouji).appendTo(patientDiv);
	}
	
	var msgDiv = $("<div />").addClass("msgListDiv").appendTo(tag);
	showMsgs();
	var form = $("<form />").attr("action",contextPath+SAVE_GROUP_PATIENT_MSG_URL).attr("method","post").appendTo(tag);
	$("<input type=\"hidden\" name=\"groupId\" />").val(data[0].groupId).appendTo(form);
	$("<input type=\"hidden\" name=\"patientId\" />").val(data[0].patientId).appendTo(form);
	$("<textarea />").attr("name","msg").css({width:"100%",height:58}).appendTo(form);
	$("<p />").append("<input type=\"submit\" value=\"发布\" />").appendTo(form);
	form.ajaxForm({
		dataType : "json",
		success : function(d) {
			if(d.state){
				msgDiv.text("");
				showMsgs();
				$("textarea[name=msg]").val("");
			}
		}
	});
	function showMsgs(){
		var re = getJSONData(FIND_GROUP_PATIENT_MSGS_URL,{groupId:data[0].groupId,patientId:data[0].patientId,currentPage:1,pageSize:20,tag:Math.random()},"POST");
		$.each(re.list,function(i,d){
			var color = i%2==0? "#ddd":"#fff";
			var div = $("<div />").addClass("msg").css({margin:"2px",border:"1px solid #666",background:color}).appendTo(msgDiv);
			$("<p />").css({"border-bottom":"#666"}).html(d.insertUser+"["+formatDateTime(d.insertDate.time)+"]").appendTo(div)
			$("<p />").text(d.msg).appendTo(div);
		});
	}
}
function getKyBingLi(data_item){
	$('div.mz').click(function(){
		empty_div(this);
		var _bingli_getpatientinfo_url='/publish/bingli/getpatientinfo.htm';
		var param = {patientId:data_item.patientId,tag:Math.random()};
		var patient = getJSONData(_bingli_getpatientinfo_url,param,'POST');
		/**今天*/
		$.each(patient.visit,function(i){
			var div = $('<div style="cursor: pointer; overflow: hidden;background:url(/OIMS/style/green/images/menubg.png) repeat-x left"/>').data('visit',this).appendTo($('div.items'));
			$('<div />').text(this.date.substring(0,10)).appendTo(div);
			$('<div />').text('医生：'+this.doctorName).appendTo(div);
			div.unbind('click').bind('click',function(){
				items_change_color($(this));
				_ky_show_mzbl($(this));
			});
		});
	});
	$('div.zy').click(function(){
		empty_div(this);
		var getZhuYuanPatient_url = "/publish/emr/getZhuYuanPatient.htm";
		var getBingliHTML_url = "/publish/emr/getBingliHTML.htm";
		var qybl = $("<div />").addClass("qybl").attr("id","qybl");
	//	var ul = $("<ul />").appendTo($("<div id='leftMenu' />").attr("style","width:25%;float:left;").appendTo($(qybl)));
	//	$("<div id='rightContent' />").attr("style","float:left;text-align:left;overflow:auto;width:74%;").appendTo(qybl);
		var getZhuYuanPatient_data = getJSONData(getZhuYuanPatient_url,{binglihao:data_item.binglihao,tag : Math.random()},"POST");
		if(getZhuYuanPatient_data.state&&getZhuYuanPatient_data.obj!=null){
			$.each(getZhuYuanPatient_data.obj,function(index,data){
				var visit_date = data.visitDate.time!=null?formatDate(data.visitDate.time):null;
				var a_value =  visit_date+"  "+data.deptName;
				var div = $('<div style="cursor: pointer; overflow: hidden;background:url(/OIMS/style/green/images/menubg.png) repeat-x left"/>').data('visit',this).appendTo($('div.items'));
				$('<div />').text(a_value).appendTo(div);
				//$('<div />').text('医生：'+this.doctorName).appendTo(div);
				//var li = $("<li><a>"+a_value+"</a></li>").appendTo(ul);
				$("<input id='visitNo' type='hidden' />").val(data.visitNo).appendTo(div);
				$("<input id='visitDate' type='hidden' />").val(visit_date).appendTo(div);
				div.unbind('click').bind('click',function(){
					items_change_color($(this));
					$('div.bl_show').empty();
					//$($(this).siblings()).find("a").removeClass("on");
					//$(this).find("a").addClass("on");
					var getBingliHTML_data = getJSONData(getBingliHTML_url,{
						binglihao:data_item.binglihao,
						visitID:$(this).find("input#visitNo").val(),
						visitType:oimsCategory.ZHENBIE_ZHUYUAN,
						visitDate:$(this).find("input#visitDate").val(),
						typeID:"",
						tag : Math.random()
						},"POST");
					if(getBingliHTML_data.state&&getBingliHTML_data.obj!=null){
						var div_temp=$("<div style='height:100%;width:100%;overflow-y:auto;overflow-x:hidden'/>").appendTo($("div.bl_show"));
						$(div_temp).append($(getBingliHTML_data.obj));
					}
				});
			});
		}else{
			$.oimsAlert("没有住院记录！");
		}

	});
	$('div.mz').click();
	function _ky_show_mzbl(div){
		var visit = $(div).data('visit');
		importJS('/js/manager/emr/doctor.common.js');
		importCSS('/js/manager/emr/css/emr.css');
		importJS('/emr/js/emr_functions.js');
//		importCSS('/emr/style.css');
		importJS('/emr/js/emr_print.js');
		importJS('/emr/js/study.js');
		var main = $('div.bl_show').empty();
		var recordcontainer = $('<div class="recordcontainer"/>').appendTo(main);
		var div = $('<div class="record"/>').appendTo(recordcontainer);
		var data = getJSONData(_emr_getprintdata_url,{visitId:visit.id},'POST');
//		eyePDFBaoGao_jw=[];
		$(makeRecord(data)).appendTo(div);
//		$.each(eyePDFBaoGao_jw,function(){
//			var epbg=this;
//			$("#spe"+this.jcdid).click(function(){
//				speClickPDF(epbg.jcdid,epbg.data_getPDFListByJcd,epbg.data_getReportListByJcd);
//			});
//			
//		});
	}
	function empty_div(div){
		$(div).removeClass('tab_hide').addClass('tab_show');
		$(div).siblings().removeClass('tab_show').addClass('tab_hide');
		$('div.items').empty();
		$('div.bl_show').empty();
	}
	function items_change_color(div){
		$(div).css({'background':'url(/OIMS/style/green/images/menubghover.png) repeat-x left'});
		$(div).siblings().css({'background':'url(/OIMS/style/green/images/menubg.png) repeat-x left'});
	}

}
function showGroupPatientPagelist(btns){
	listFactor = {
			listObj : [ {
				title : "患者ID",
				key : "binglihao"
			}, {
				title : "姓名",
				key : "xingming"
			}, {
				title : "性别",
				key : "xingbie",
				func : function(value) {
					if (value)
						return "男";
					else
						return "女";
				}
			}, {
				title : "出生日期",
				key : "shengri"
			}, {
				title : "电话",
				key : "dianhua"
			}, {
				title : "手机号码",
				key : "shouji"
			},{title:"导入医生",key:"insertDoctor"}, {
				title : "导入时间",
				key : "insertDate",
				func:function(value){return formatDate(value.time);}
			}, {
				title : "课题组",
				key : "name"
			},{title:"讨论记录",key:"msgCount"}],
			url : contextPath + FIND_DEPT_GROUP_PATIENT_URL,
			method : "post",
			checkbox : true,
			single : true,
			data : {// data表示传的参数
				currentPage : 1,
				pageSize : getPageSize(),// Page类的方法
				tag : Math.random()
			}
		};
		pageTitle = "课题组内的患者";
		init();
		if(btns==undefined || btns==null)
			btns=currentBtns;
		else
			currentBtns=btns;
		var div = $("<div />").attr("id","advquery").addClass("advquery").append("<div style='clear:both'></div>").appendTo("#right");
		div = $("<div />").addClass("btn").prependTo(div);
		showMyBTNS(btns,div);
		div = $("<div />").attr("id","pageList").addClass("list").appendTo("#right");
		div.createPageList(listFactor);
}

//---------------------------------新增资料检索
 function article_search_func(btns){
	 var yuangongTemplate ;
	    pageTitle = "科研资料检索";// 员工信息
		init();
		 var obj = [{
				title : "成果级别",
				key : "classType"
			}, {
				title : "成果名称",
				key : "project_name"
			},{
				title:'成果类别',
				key:'detailType',
			}, {
				title : "获得时间",
				key : "finalTime"
			}, {
				title : "附件",
				key:'fujian',
				func:function(v){
					if(v==null)return "-";
					return v.replace(/\\/g,'/');
				}
			},{
				title:'作者',
				key:'author'
			}];
		 listFactor = {
					listObj : obj,
					url : contextPath + FIND_JIANLI_URL,//"/publish/yuangong/findJianLiByConditon.htm"
					method : "post",
					single : false,
					checkbox:true,
					invocationEvent : true, // 启用行选中事件
					methodName_Checked : function() {
						var dataObjects = getCheckBoxValue();
					},
					data : {// data表示传的参数
						currentPage : 1,
						pageSize : getPageSize(),// Page类的方法
						tag : Math.random(),
						type:'cgjl'
					}
				};
				var div = $("<div />").attr("id","advquery").css('height','33px').append(yuangongTemplate).addClass("advquery").appendTo("#right");
				
		
		//分类:<select name='type' id='type' style='width:10%' onchange='typeChangeEvent(this)'><option value='cgjl'>成果奖励</option><option value='cykt'>参与课题</option><option value='fblw'>发表论文</option><option value='xwlw'>学位论文</option><option value='hdzl'>获得专利</option><option value='qtry'>其他奖励及荣誉称号</option></select>
		yuangongTemplate ="<table width='85%' height='100%' border='0' cellspacing='0' cellpadding='0'>" +
				"<tr>" +
				"<td width='10%'>" +
				"<select name='type' style='height:27px' id='type' >" +
					"<option value='cgjl'>成果奖励</option>" +
					"<option value='cykt'>参与课题</option>" +
					"<option value='fblw'>发表论文</option>" +
					"<option value='xwlw'>学位论文</option>" +
					"<option value='hdzl'>获得专利</option>" +
					"<option value='qtry'>其他奖励及荣誉称号</option>" +
				"</select>" +
				"</td>" +
				"<td width='100%' id='context_search' style='float:left;height:30px;line-height:33px'>" +
				"</td>" +
				"</tr>" +
				"</table>";
		$(".advquery").html(yuangongTemplate);
		div = $("<div />").addClass("btn").prependTo(div);
		/*
		 * btns[{func:"downloadFujian",title:'下载',id:'569'},{func:"article_export",title:'导出',id:'570'}]
		 * */
		showMyBTNS(btns,div);
		div = $("<div />").attr("id","pageList").addClass("list").appendTo("#right");
		div.createPageList(listFactor);
		$("#type").change(function(){//种类改变事件
			typeChangeEvent($(this),listFactor,true);
		});
		typeChangeEvent($("input[name=type]"),listFactor,false);//页面初始化的时候默认走一次change事件(false指的是是否触发查询)
 }
 /*下载附件方法*/
 function downloadFujian(){
	 var obj = getCheckBoxValue();
	 if(obj.length!=1){
		 $.oimsAlert("只能选择一条记录进行此操作");
		return  
	 }
	 if(obj[0].fujian){
		 var url = obj[0].fujian.replace(/\\/g,'/');
		 window.open(url);
	 }else {
		 $.oimsAlert("对不起此记录不包含有附件,无法提供下载");
		return  
	}
	 
 }
 
 function showArticleList(btns,a){
	 var obj = [{
			title : "成果级别",
			key : "classType"
		}, {
			title : "成果名称",
			key : "project_name"
		},{
			title:'成果类别',
			key:'detailType',
		}, {
			title : "获得时间",
			key : "finalTime"
		}, {
			title : "附件",
			key:'fujian',
			func:function(v){
				if(v==null)return "-";
				return v.replace(/\\/g,'/');
			}
		},{
			title:'作者',
			key:'author'
		}];
	 listFactor = {
				listObj : obj,
				url : contextPath + FIND_JIANLI_URL,
				method : "post",
				checkbox : true,
				single : true,
				invocationEvent : true, // 启用行选中事件
				methodName_Checked : function() {
					var dataObjects = getCheckBoxValue();
				},
				data : {// data表示传的参数
					currentPage : 1,
					pageSize : getPageSize(),// Page类的方法
					tag : Math.random()
				}
			};
			var div = $("<div />").attr("id","advquery").css('height','33px').append(a).addClass("advquery").appendTo("#right");
			div = $("<div />").addClass("btn").prependTo(div);
			showMyBTNS(btns,div);
			div = $("<div />").attr("id","pageList").addClass("list").appendTo("#right");
			div.createPageList(listFactor);
		
			typeChangeEvent($("#type"),listFactor);
 }
 /*根据不同的类型，生成不同的查询条件和表格*/
 function typeChangeEvent(v,li,eventable){
	 var val = $(v).val() ;//得到当前用户所选的种类，需要按照此种类加载不同的查询条件
	 var context= $("#context_search");//各种条件框所在的td
	 context.html('');//清空查询条件
	 context.append("<span>作者:<input style='width:60px;height:27px' type='text' name='author' /></span>");
	 switch(val){
		 case 'cgjl':
			 var jibie = '<span style="width:10%">级别:<select style="width:80px;height:27px" name="classType"><option>全部</option><option value="国家级">国家级</option><option value="军队、省部级">军队、省部级</option><option value="校级">校级</option><option value="院级">院级</option><option value="其他">其他</option></select></span>';
			 var fujian = '<span  style="width:10%">成果名称:<input style="width:80px;height:27px" name="project_name" type="text"></span>';
			 var leibie = '<span  style="width:80px">成果类别:<input style="width:80px;height:27px" name="detailType" type="text"></span>';
			 var riqi = '<span  style="width:10%">起止日期:<input style="width:80px;height:27px" type="text" class="blur" onfocus=\"this.className="focus"\" onblur=\"this.className="blur"\" id="startTime" name="startTime">至<input style="width:80px;height:27px" type="text" class="blur" onfocus=\"this.className="focus"\" onblur=\"this.className="blur"\" id="endTime" name="endTime"></span>';
			 context.append(jibie);
			 context.append(fujian);
			 context.append(leibie);
			 context.append(riqi);
			 calendarFun("startTime");// 开始注册日期
			 calendarFun("endTime");// 开始注册日期
			 if(li){
				 li.listObj=[{
						title : "成果级别",
						key : "classType"
					}, {
						title : "成果名称",
						key : "project_name"
					},{
						title:'成果类别',
						key:'detailType',
					}, {
						title : "获得时间",
						key : "finalTime"
					}, {
						title : "附件",
						key:'fujian',
						func:function(v){
							if(v==null)return "-";
							return v.replace(/\\/g,'/');
						}
					},{
						title:'作者',
						key:'author'
					}];
			 }
			 
			 break ;
		 case 'cykt':
			 var jibie = '<span style="width:10%">级别:<select style="width:80px;height:27px" name="classType"><option>全部</option><option value="国家级">国家级</option><option value="军队、省部级">军队、省部级</option><option value="校级">校级</option><option value="院级">院级</option><option value="其他">其他</option></select></span>';
			 var fujian = '<span  style="width:10%">课题名称:<input style="width:80px;height:27px" name="project_name" type="text"></span>';
			 var leibie = '<span  style="width:80px">参与人员:<input style="width:80px;height:27px" type="text" name="user_name"></span>';
			 var riqi = '<span  style="width:10%">起止日期:<input style="width:80px;height:27px" type="text" class="blur" onfocus=\"this.className="focus"\" onblur=\"this.className="blur"\" id="startTime" name="startTime">至<input style="width:80px;height:27px" type="text" class="blur" onfocus=\"this.className="focus"\" onblur=\"this.className="blur"\" id="endTime" name="endTime"></span>';
			 context.append(jibie);
			 context.append(fujian);
			 context.append(leibie);
			 context.append(riqi);
			 calendarFun("startTime");// 开始注册日期
			 calendarFun("endTime");// 开始注册日期
			 if(li){
				 li.listObj=[{
						title : "课题级别",
						key : "classType"
					}, {
						title : "课题名称",
						key : "project_name"
					},{
						title:'获得经费（万元）',
						key:'money',
					}, {
						title : "课题人员",
						key : "user_name"
					}, {
						title : "开始时间",
						key : "startTime",
						func:function(v){return formatDate(v.time);}
					}, {
						title : "结束时间",
						key : "endTime",
						func:function(v){return formatDate(v.time);}
					},{
						title:'附件',
						key:'fujian',
						func:function(v){
							if(v==null)return "-";
							return v.replace(/\\/g,'/');
						}
					},{
						title:'作者',
						key:'author'
					}];
			 }
			 break ;
		 case 'fblw':
			 var fenlei = '<span  style="width:80px">论文分类:<input style="width:60px;height:27px" name="detailKind" type="text"></span>';
			 var jibie = '<span  style="width:80px">论文类别:<input style="width:60px;height:27px" name="detailType" type="text"></span>';
			 var fujian = '<span  style="width:80px">论文名称:<input style="width:60px;height:27px" type="text" name="project_name"></span>';
			 var leibie = '<span  style="width:80px">期刊:<input style="width:60px;height:27px" type="text" name="job"></span>';
			 var qikan = '<span  style="width:80px">期刊号:<input style="width:60px;height:27px" type="text" name="other"></span>';
			 var riqi = '<span  style="width:10%">起止日期:<input style="width:60px;height:27px" type="text" class="blur" onfocus=\"this.className="focus"\" onblur=\"this.className="blur"\" id="startTime" name="startTime">至<input style="width:60px;height:27px" type="text" class="blur" onfocus=\"this.className="focus"\" onblur=\"this.className="blur"\" id="endTime" name="endTime"></span>';
			 context.append(fenlei);
			 context.append(jibie);
			 context.append(fujian);
			 context.append(leibie);
			 context.append(qikan);
			 context.append(riqi);
			 calendarFun("startTime");// 开始日期
			 calendarFun("endTime");// 开始日期
			 if(li){
				 li.listObj=[{
						title : "论文分类",
						key : "detailKind"
					}, {
						title : "论文类别",
						key : "detailType"
					}, {
						title : "论文名称",
						key : "project_name"
					},{
						title:'发表期刊',
						key:'job',
					}, {
						title : "期刊号（期、卷、页码）",
						key : "other"
					}, {
						title : "发表时间",
						key : "finalTime"
					},{
						title:'附件',
						key:'fujian',
						func:function(v){
							if(v==null)return "-";
							return v.replace(/\\/g,'/');
						}
					},{
						title:'作者',
						key:'author'
					}];
			 }
			 break ;
		 case 'xwlw':
			 var jibie = '<span  style="width:80px">论文类别:<input style="width:80px;height:27px" name="detailType" type="text"></span>';
			 var fujian = '<span  style="width:80px">论文名称:<input style="width:80px;height:27px" type="text" name="project_name"></span>';
			 var leibie = '<span  style="width:80px">指导老师:<input style="width:80px;height:27px" type="text" name="user_name"></span>';
			 var riqi = '<span  style="width:10%">起止日期:<input style="width:80px;height:27px" type="text" class="blur" onfocus=\"this.className="focus"\" onblur=\"this.className="blur"\" id="startTime" name="startTime">至<input style="width:80px;height:27px" type="text" class="blur" onfocus=\"this.className="focus"\" onblur=\"this.className="blur"\" id="endTime" name="endTime"></span>';
			 context.append(jibie);
			 context.append(fujian);
			 context.append(leibie);
			 context.append(riqi);
			 calendarFun("startTime");// 开始注册日期
			 calendarFun("endTime");// 开始注册日期
			 if(li){
				 li.listObj=[{
						title : "论文类别",
						key : "detailType"
					}, {
						title : "论文名称",
						key : "project_name"
					},{
						title:'指导导师',
						key:'user_name',
					}, {
						title : "发表时间",
						key : "finalTime"
					},{
						title:'附件',
						key:'fujian',
						func:function(v){
							if(v==null)return "-";
							return v.replace(/\\/g,'/');
						}
					},{
						title:'作者',
						key:'author'
					}];
			 }
			 break ;
		 case 'hdzl':
			 var jibie = '<span  style="width:80px">专利类型:<input style="width:80px;height:27px" name="detailType" type="text"></span>';
			 var fujian = '<span  style="width:80px">专利名称:<input style="width:80px;height:27px" name="project_name" type="text"></span>';
			 var leibie = '<span  style="width:80px">专利号:<input style="width:80px;height:27px" type="text" name="job"></span>';
			 var riqi = '<span  style="width:10%">起止日期:<input style="width:80px;height:27px" type="text" class="blur" onfocus=\"this.className="focus"\" onblur=\"this.className="blur"\" id="startTime" name="startTime">至<input style="width:80px;height:27px" type="text" class="blur" onfocus=\"this.className="focus"\" onblur=\"this.className="blur"\" id="endTime" name="endTime"></span>';
			 context.append(jibie);
			 context.append(fujian);
			 context.append(leibie);
			 context.append(riqi);
			 calendarFun("startTime");// 开始注册日期
			 calendarFun("endTime");// 开始注册日期
			 if(li){
				 li.listObj=[{
						title : "专利类型",
						key : "detailType"
					}, {
						title : "专利名称",
						key : "project_name"
					},{
						title:'专利号',
						key:'job',
					}, {
						title : "获得时间",
						key : "finalTime"
					}, {
						title:'附件',
						key:'fujian',
						func:function(v){
							if(v==null)return "-";
							return v.replace(/\\/g,'/');
						}
					},{
						title:'作者',
						key:'author'
					}];
			 }
			 break ;
		 case 'qtry':
			 var jibie = '<span style="width:10%">奖励级别:<select style="width:80px;height:27px" name="classType"><option>全部</option><option value="国家级">国家级</option><option value="军队、省部级">军队、省部级</option><option value="校级">校级</option><option value="院级">院级</option><option value="其他">其他</option></select></span>';
			 var fujian = '<span  style="width:80px">奖励/荣誉名称:<input style="width:80px;height:27px" name="project_name" type="text"></span>';
			 var leibie = '<span  style="width:80px">奖励缘由:<input style="width:80px;height:27px" type="text" name="job"></span>';
			 var riqi = '<span  style="width:10%">起止日期:<input style="width:80px;height:27px" type="text" class="blur" onfocus=\"this.className="focus"\" onblur=\"this.className="blur"\" id="startTime" name="startTime">至<input style="width:80px;height:27px" type="text" class="blur" onfocus=\"this.className="focus"\" onblur=\"this.className="blur"\" id="endTime" name="endTime"></span>';
			 context.append(jibie);
			 context.append(fujian);
			 context.append(leibie);
			 context.append(riqi);
			 calendarFun("startTime");// 开始注册日期
			 calendarFun("endTime");// 开始注册日期
			 if(li){
				 li.listObj=[{
						title : "奖励级别",
						key : "classType"
					}, {
						title : "奖励或荣誉名称",
						key : "project_name"
					},{
						title:'奖励事由',
						key:'content',
					}, {
						title : "奖励时间",
						key : "finalTime"
					},{
						title:'附件',
						key:'fujian',
						func:function(v){
							if(v==null)return "-";
							return v.replace(/\\/g,'/');
						}
					},{
						title:'作者',
						key:'author'
					}];
			 }
			 break ;
		 case 'all':
			 context.html('');
			 return 
			 break ;
	 }
	 context.append("<span><button id='data_search' style='height:30px;text-align:center' onclick='loadData(this)'>查询</button></span>");
	 $("input").keypress(function(a,b){
		if(a.keyCode==13){
			 loadData($("#data_search"));
		}
	 });
	 if(eventable){
		 loadData($("#data_search"));
//		 $("#pageList").createPageList(listFactor); 
	 }
 }
 //88888888888888888将所有的查询条件按照  属性：值的形式封装成对象,并返回data对象
 function formatData(btn){
	 var inputs = $(btn).parents('tr').find('input');
	 var selects = $(btn).parents('tr').find('select');
	 var data = {};
	 $.each(inputs,function(i,d){
		 var name = $(d).attr('name');
		 var val = $(d).val();
		 
		 if(name=='startTime'||name=='endTime'){
			 eval("data."+name+"='"+jsDate.strToDate(val)+"'");
		 }else {
			 eval("data."+name+"='"+val+"'");
		 }
		 if(val==''){//如果值为''则删除当前值对应的属性--避免类似出现时间为空后台无法接受的问题
			 eval("delete data."+name);
		 }
	 });
	 $.each(selects,function(i,d){
		 var name = $(d).attr('name');
		 var val = $(d).val();
		 eval("data."+name+"='"+val+"'");
		 
	 });
	 return data ;
	 
 }
 /*查询事件处理--*/
 function loadData(btn){
	 
	 var data = formatData(btn);//获得不同的类型下所组成的查询条件对象
	 for ( var da in listFactor.data) {//循环往后台发送的参数，处理当前页，条数，和tag之外，其他数据全部移除，否则会下面继承的时候参数会不对
		 if(da!='currentPage'&&da!='pageSize'&&da!='tag'){
			 //移除listFactor中的属性
			 eval("listFactor.data."+da+"=undefined");
			 listFactor.data.currentPage=1;//每次查询页面从1开始
			 listFactor.data.pageSize = getPageSize();
		 }
	 }

	 var d = $.extend(listFactor.data, data);
	 listFactor.data = d;
	 $("#pageList").createPageList(listFactor);
 }
 /*数据导出*/
 function article_export(){
	 var ids = '' ;
	 var objs = getCheckBoxValue();//得到被选中的条目
	//如果没有选中任何条目，则会根据查询条件导出符合条件的所有记录
	 var btnFind = $("#data_search") ;//得到当前页面的查询按钮--并且根据查询根据此按钮得出当前需要传完后台的所有参数
	 /*此处发送data到后台查询出所有的结果后导出*/
	 var data = formatData(btnFind);//---需要传递到后台的参数，注意假如选择性导出的时候加此条件是为了确定导出模板
	 if (objs.length==0) {
		
	 }else {
		for ( var id in objs) {
			ids+=(objs[id].id+',');//得到资料的id
		}
	 }
//	 if(objs.length==0){
		 $.oimsConfirm({
				strTitle : "确认导出当前条件下的所有数据信息？",
				remove_length : true
			}, function(){doExportAll(data)},null);
/*	 }else {
		 $.oimsConfirm({
				strTitle : "确认只导出选中的数据?",
				remove_length : true
			}, function(){doExportSome(ids,data)},null);
	}*/
 }
 /*按条件导出所有数据*/
 function doExportAll(data){
	 var re = getJSONData(EXPORTALLARTCLE,data,"POST");
	 console.log(re);
		if(!re.state){
			$.oimsAlert("数据导出失败");
		}else{
			location.href = contextPath + "/temp/" + re.obj;
		}
 }
 /*导出选中的数据*/
 function doExportSome(ids,data){
	 var re = getJSONData(EXPORTALLARTCLE,{ids:ids,type:data.type},"POST");
	 	if(!re.state){
			$.oimsAlert("数据导出失败");
		}else{
			location.href = contextPath + "/temp/" + re.obj;
		}
 }