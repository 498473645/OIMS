var findArticleUrl = "/publish/article/findArticle.htm";
var showArticleUrl = "/publish/article/showArticle.htm";
var saveOrUpdateQingjiatiaoUrl = "/publish/qingjia/saveOrUpdateQingjiatiao.htm";
var getQingjiatiaoUrl = "/publish/qingjia/getQingjiatiao.htm";
var findQingjiatiaoUrl = "/publish/qingjia/findQingjiatiao.htm";
var setQingjiatiaoStateUrl = "/publish/qingjia/setQingjiatiaoState.htm";
var deleteQingjiatiaoUrl = "/publish/qingjia/deleteQingjiatiao.htm";
var articleManageCategory;//当前管理分类ID
/**
 * 入口 显示通知列表
 * @param btns
 */
function showNotificationPageList(btns){
	pageTitle = "通知";
	var listObj = [ {
		title : "序号",
		key : "id"
	}, {
		title : "标题",
		key : "title"
	}, {
		title : "时间",
		key : "insertTime"
	}];
	importJS("/js/manager/article/articleFunction.js");
	articleManageCategory = oimsCategory.ARTICLE_CATEGORY_NOTIFICATION;
	artilce_showArticlePageList(null, btns, listObj,true);
}

function showNotification(){
	showArticles("通知");
}

function showArticle(){
	showArticles("论文");
}

/**
 * 入口 请假条
 * @param btns
 */
function showLeavePageList(btns){
	pageTitle = "请假条";
	init();
	listFactor = {
			url : contextPath + findQingjiatiaoUrl, // url
			method : "post",
			checkbox : true,
			single : true,
			listObj : [
			           {title:"序号",key:"id"},
			           {title:"员工",key:"xingming"},
			           {title:"请假类型", key:"qjlx", func:function(d){
			        	   var re="";
			        	   switch(d){
			        	   	case 1 : re="年假"; break;
			        	   	case 2 : re="病假"; break;
			        	   	case 3 : re="婚假"; break;
			        	   	case 4 : re="产假"; break;
			        	   	case 5 : re="丧假"; break;
			        	   	default : re="事假";
			        	   }
			        	   return re;
			           }},
			           {title:"休假开始时间",key:"kssj"},
			           {title:"休假结束时间", key:"jssj"},
			           {title:"请假事由", key:"qingjiaYuanyou"},
			           {title:"状态", key:"state",func:function(d){
			        	   var re="";
			        	   switch(d){
				        	   case 1 : re="已批准"; break;
				        	   case 2 : re = "未批准"; break;
				        	   case 3 : re="已销假"; break;
				        	   default : re = "待批";
			        	   }
			        	   return re;
			           }}
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

function showQingjiaForm(){
	var div = $("<div />").attr("id","qingjiaFormDialog").hide().appendTo("body");
	var form = $("<form />").attr("id","qingjiaForm").attr("action",contextPath+saveOrUpdateQingjiatiaoUrl).attr("method","post").appendTo(div);
	var table = $("<table />").appendTo(form);
	var tr = $("<tr />").appendTo(table);
	var td = $("<td style=\"width:88px; text-align:right; font-weight:bold;  font-size:14px\" />").text("请假类型").appendTo(tr);
	td = $("<td style=\"text-align:left\" />").appendTo(tr);
	$("<input type=\"radio\" name=\"qjlx\" value=\"0\" /><label>事假&nbsp; </label>").appendTo(td);
	$("<input type=\"radio\" name=\"qjlx\" value=\"1\" /><label>年假&nbsp; </label>").appendTo(td);
	$("<input type=\"radio\" name=\"qjlx\" value=\"2\" /><label>病假&nbsp; </label>").appendTo(td);
	$("<input type=\"radio\" name=\"qjlx\" value=\"3\" /><label>婚假&nbsp; </label>").appendTo(td);
	$("<input type=\"radio\" name=\"qjlx\" value=\"4\" /><label>产假&nbsp; </label>").appendTo(td);
	$("<input type=\"radio\" name=\"qjlx\" value=\"5\" /><label>丧假&nbsp; </label>").appendTo(td);
	tr = $("<tr />").appendTo(table);
	$("<td style=\"width:88px; text-align:right; font-weight:bold;  font-size:14px\" />").text("请假事由").appendTo(tr);
	$("<td style=\"text-align:left\" />").append("<textarea style=\"width:100%; height:158px\" name=\"qingjiaYuanyou\" id=\"qingjiaYuanyou\"></textarea>").appendTo(tr);
	tr = $("<tr />").appendTo(table);
	$("<td style=\"width:88px; text-align:right; font-weight:bold;  font-size:14px\" />").text("休假时间").appendTo(tr);
	td = $("<td style=\"text-align:left\" />").appendTo(tr);
	$("<input type=\"text\" name=\"kssj\" class=\"inputTime\" />").appendTo(td);
	$("<span> 至 </span>").appendTo(td);
	$("<input type=\"text\" name=\"jssj\" class=\"inputTime\" />").appendTo(td);
	$(".inputTime").val(normalDateTimeFormat).css({color:"#ccc"}).focus(function(){
		var val = $(this).val();
		if(val==normalDateTimeFormat)$(this).val("").css({color:"#000"});
	}).blur(function(){
		var val = $(this).val();
		if(!val.length)$(this).val(normalDateTimeFormat).css({color:"#ccc"});
	});
	var dialog = $(div).show().oimsDialog({
		width:500,
		height:320,
		title:"请假条",
		icon:"view",
		locked:true,
		button:[{title : "提交",func : function(){
			form.ajaxSubmit({
				dataType:'json',
				beforeSubmit:function(){
					return validateQingjiaForm(form);
				},
				success:function(data){
					dialog.close();
					resetQingjiaPageList();
				}
			});
		},
		isCloseWin:false,className : "ok"}]
	});
	return form;
}

/**
 * 验证表单
 * @param form
 * @returns
 */
function validateQingjiaForm(form){
	var t = $("input[name=qjlx]:checked");
	if(!t.length){
		$.oimsAlert("请选择请假类型！");
		return false;
	}
	var kssj = $.trim(form.find("input[name=kssj]").val());
	if( !kssj.length || kssj==normalDateTimeFormat ) return false;
	var date0 = parseDatetime(kssj);
	if(date0==null){
		$.oimsAlert("请按指定格式填写请假开始时间：yyyy:MM:dd HH:mm:ss");
		return false;
	}
	if(date0.getTime()<new Date().getTime()){
		$.oimsAlert("请假开始时间应大于当前时间！");
		return false;
	}
	var jssj = $.trim(form.find("input[name=jssj]").val()); 
	if( !jssj.length || jssj==normalDateTimeFormat ) return false;
	var date1 = parseDatetime(jssj);
	if(date0==null){
		$.oimsAlert("请按指定格式填写请假结束时间：yyyy:MM:dd HH:mm:ss");
		return false;
	}
	if(date1.getTime()<date0.getTime()){
		$.oimsAlert("请假结束时间应在开始时间之后！");
		return false;
	}
	return true;
}

/**
 * 修改假条
 * @returns
 */
function showQingjiaUpdateForm(){
	var data = getCheckBoxValue();
	if(data.length!=0){
		var d=data[0];
		if(d.state==1||d.state==3){
			$.oimsAlert("请注意，此项已被审批！");
			return;
		}
		form = showQingjiaForm();
		form.find("input[name=qjlx][value="+d.qjlx+"]").attr("checked",true);
		form.find("#qingjiaYuanyou").val(d.qingjiaYuanyou);
		form.find("input[name=kssj]").val(formatDateTime(d.kssj.time)).css("color","#000");
		form.find("input[name=jssj]").val(formatDateTime(d.jssj.time)).css("color","#000");
		$("<input name='id' type='hidden' />").val(d.id).appendTo(form);
	}else{
		$.oimsError("请选择您要修改的请假条！");
	}
}

/**
 * 准假
 */
function qingjiaZhunjia(){
	var data = getCheckBoxValue();
	if(!data.length){
		$.oimsAlert("请选择您要批示的请假条！");
		return;
	}
	if(data[0].state==1){
//		$.oimsAlert("假条已销！");
		return;
	}
	if(data[0].state==3){
		$.oimsAlert("假条已销！");
		return;
	}
	
	setQingjiatiaoState(data[0].id,1);
}

/**
 * 不准假
 */
function qinjiaBuZhunjia(){
	var data = getCheckBoxValue();
	if(!data.length){
		$.oimsAlert("请选择您要批示的请假条！");
		return;
	}
	if(data[0].state==2)return;
	if(data[0].state==3){
		$.oimsAlert("假条已销！");
		return;
	}
	setQingjiatiaoState(data[0].id,2);
}
/**
 * 销假
 */
function qinjiaXiaojia(){
	var data = getCheckBoxValue();
	if(!data.length){
		$.oimsAlert("请选择您要销的请假条！");
		return;
	}
	if(data[0].state==3){
		$.oimsAlert("假条已销！");
		return;
	}
	if(data[0].state!=1){
		$.oimsAlert("假条未被批准！");
		return;
	}

	if(data[0].jssj.time>new Date().getTime()){
		$.oimsConfirm("当前假期未休完， 是否销假！",function(){setQingjiatiaoState(data[0].id,3);});
	}else
		setQingjiatiaoState(data[0].id,3);
}

function setQingjiatiaoState(id,state){
	var d = getJSONData(setQingjiatiaoStateUrl,{id:id,state:state},"POST");
	if(!d.state){
		$.oimsError("请假条批示失败！");
		return;
	}
	resetQingjiaPageList();
}

/**
 * 删除请假条
 * @returns
 */
function deleteQingjiatiao(){
	var data = getCheckBoxValue();
	if(!data.length){
		$.oimsAlert("请选择您要删除的请假条！");
		return;
	}
	if(data[0].state!=0){
		$.oimsError("请假条已有批示，不能被删除！");
		return;
	}
	var d = getJSONData(deleteQingjiatiaoUrl,{id:data[0].id},"POST");
	if(!d.state){
		$.oimsError("请假条删除失败！");
		return;
	}
	resetQingjiaPageList();
}

function resetQingjiaPageList(){
	$("#pageForm").children("input[name=currentPage]").val(1);
	$("#pageForm").submit();
}

/**
 * 入口函数，科研资料入口
 * @param btns
 */
function showArticlePageList(btns){
	pageTitle = "论文";
	var listObj = [ {
		title : "序号",
		key : "id"
	}, {
		title : "标题",
		key : "title"
	}, {
		title : "作者",
		key : "author"
	},{
		title : "期刊名",
		key : "publication"
	},{
		title : "期刊号",
		key : "ISSN"
	},{
		title : "时间",
		key : "insertTime",
	}];
	importJS("/js/manager/article/articleFunction.js");
	articleManageCategory = oimsCategory.ARTICLE_CATEGORY_THESIS;
	artilce_showArticlePageList(null,btns, listObj,true);
}

function showArticles(t,id){
	if(id==undefined||id==null){
		var data = getCheckBoxValue();
		if(data.length==0){
			$.oimsAlert("请选择要查看的通知！");
			return;
		}
		id = data[0].id;
	}
	
	var data = getJSONData(showArticleUrl,{id:id},"POST");
	if(!data.state){
		$.oimsError("获取通知失败！");
		return;
	}
	var content = data.obj.content;
	content = content.replace(/\n/g,"<br />");
	var title = data.obj.title;
	var attachmentList = data.obj.articleAttachment;
	var div = $("<div />").css({padding:"8px","line-height":1.5, "background":"#fff", "text-align":"left"}).html(content);
	$("<h1 />").css({"text-align":"center","font-size":"18px"}).text(title).prependTo(div);
	if(attachmentList.length){
		$("<p />").css({"font-weight":"bold","border-top":"1px solid #000","margin-top":"22px","padding":"8px 0"}).text("附件：").appendTo(div);
		var ul = $("<ul />").css("padding","0 8px").appendTo(div);
		$.each(attachmentList,function(i,d){
			var li = $("<li />").css({"text-align":"left","line-height":"1.5"}).appendTo(ul);
			$("<a />").attr("href",contextPath+d.downloadLink).text(d.attachment).appendTo(li);
		});
	}
	if(t!="通知"){
		var foot = $("<div />").css("margin-top","22px").prependTo(div);
		var infomation = data.obj.infomation;
		infomation = infomation.replace(/\n/g,"<br />");
		$("<p />").html(infomation).prepend("<strong>内容摘要：</strong>").appendTo(foot);
		var p = $("<p />").append("<strong>出版物名称：</strong>").appendTo(foot);
		$("<span />").text(data.obj.publication).appendTo(p);
		p = $("<p />").append("<strong>期刊号：</strong>").appendTo(foot);
		$("<span />").text(data.obj.ISSN).appendTo(p);
		p = $("<p />").append("<strong>作者：</strong>").appendTo(foot);
		$("<span />").text(data.obj.author).appendTo(p);
		p = $("<p />").append("<strong>发布时间：</strong>").appendTo(foot);
		$("<span />").text(formatDate(data.obj.insertTime.time)).appendTo(p);
	}
	div.oimsDialog({
		icon:"view",
		title: t+"  —— "+title,
		locked:true
	});
}
