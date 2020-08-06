var FIND_OPERATION_GROUP_LIST_URL = "/publish/operationDict/findOperationGroupPageList.htm";
var FIND_OPERATION_GRUOP_MEMBERS_URL="/publish/operationDict/findGroupMember.htm";
var SAVE_OPERATION_GROUP_URL="/publish/operationDict/saveOrUpdateOperationGroup.htm";
var FIND_DEPT_URL = "/publish/bumen/findAllBuMen.htm";
var FIND_DEPT_STAFF_URL="/publish/yuangong/findYuangongByBumenId.htm";
var DELETE_OPERATION_GROUP_URL="/publish/operationDict/deleteOperationGroup.htm";
var SAVE_OR_UPDATE_OPERATION_GROUP_URL="/publish/operationDict/saveOrUpdateGroupMembers.htm";

function showOperationGroupManage(btns){
	importJS("/js/manager/shoushu/dataSetting.js");
	importCSS("/js/manager/shoushu/template/style.css");
	var h = $("#right").height()-$("#right").children("div.title").outerHeight();
	var rTag = $("<div />").width(200).height(h).addClass("deptTag").appendTo("#right");
	var lTag = $("<div />").width(200).height(h).addClass("groupTag").appendTo("#right");
	var mTag = $("<div />").addClass("memberList").height(h).css({"overflow-y":"hidden","background":"#fff"}).appendTo("#right");
	$("<div />").addClass("groupTitle").text("手术分组").appendTo(lTag);
	$("<div />").addClass("groupTitle").text("部门员工").appendTo(rTag);
	var t = $("<div />").addClass("groupTitle").html("<span>组内成员</span> | ").appendTo(mTag);
	var form = $("<form />").attr("action",contextPath+SAVE_OR_UPDATE_OPERATION_GROUP_URL).attr("method","post").css("overflow","auto").height(mTag.innerHeight()-t.outerHeight()).addClass("list").appendTo(mTag);
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
	showDeptAndStaff(rTag,mTag);
	showOperationGroupList(lTag,mTag);
}

function showDeptAndStaff(rTag,mTag){
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
					addOperationGroupMember(table,{groupMemberId:{workNo:d.gonghao},name:d.xingming,firstTitle:d.zhiwu,secondTitle:d.title,deptId:d.bumenId});
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

function showOperationGroupList(lTag,mTag){
	var listTag = $("<div />").css({overflow:"auto"}).height(lTag.innerHeight()-lTag.children("div:first").outerHeight()-2).appendTo(lTag);
	var re = getJSONData(FIND_OPERATION_GROUP_LIST_URL,{pageSize:1000,currentPage:1},"POST");
	var ul = $("<ul />").appendTo(listTag);	
	$.each(re.list,function(i,d){
		genGroupELE(d).appendTo(ul);
		if(i==0)showOperationGroupMember(d.id, d.name, mTag);
	});
	var normalText = "请输入新组名称";
	$("<input />").val(normalText).attr("type","text").css({color:"#ccc"}).blur(function(){
		var val = $.trim($(this).val());
		if(!val.length||val==normalText){
			$(this).val(normalText).css("color","#ccc");
			return;
		}
		var r = getJSONData(SAVE_OPERATION_GROUP_URL,{name:val},"POST");
		if(r.state){
			genGroupELE(r.obj).appendTo(ul);
			showOperationGroupMember(r.obj.id,r.obj.name, mTag);
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
				var r = getJSONData(SAVE_OPERATION_GROUP_URL,{id:id, name:val},"POST");
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
				var re = getJSONData(DELETE_OPERATION_GROUP_URL,{id:id},"POST");
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
					showOperationGroupMember(a.parent().data("id"),a.text(), mTag);
				});
			}else
				showOperationGroupMember($(this).parent().data("id"),$(this).text(), mTag);
		}).text(d.name).appendTo(li);
		return li;
	}
}

function showOperationGroupMember(id, name, mTag){
	var re = getJSONData(FIND_OPERATION_GRUOP_MEMBERS_URL,{groupId:id},"POST");
	mTag.children("div:first").children("span").html(name+" - 组内成员");
	var tag = mTag.find("form");
	tag.text("");
	$("<input type='hidden' name='groupId' />").val(id).appendTo(tag);
	var table = $("<table />").appendTo(tag);
	var tr = $("<tr />").append("<th>姓名</th><th>职务</th><th>职称</th><th>手术级别</th><th></th>").appendTo(table);
	$.each(re,function(i,d){
		addOperationGroupMember(table,d);
	});
}

function addOperationGroupMember(table,d){
	tr = $("<tr />").appendTo(table);
	$("<input type='hidden' name='workNo' />").val(d.groupMemberId.workNo).appendTo(tr);
	$("<input type='hidden' name='operationDicts' />").val(d.operationDicts).appendTo(tr);
	$("<td />").text(d.name).appendTo(tr);
	$("<td />").text(d.firstTitle).appendTo(tr);
	$("<td />").text(d.secondTitle).appendTo(tr);
	var td = $("<td />").appendTo(tr);
	var s = $("<select />").attr("name","levelFlag").change(function(){
		isFormNotSubmit=true;
	}).appendTo(td);
	$.each(operationLevelValue,function(i,o){
		$("<option />").val(o.value).text(o.name).appendTo(s);
	});
	s.val(d.levelFlag);
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