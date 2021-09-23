/** 
 * 科研、通知管理模块
 * @author Li Yan
 */
var saveOrUpdateArticleUrl = "/publish/article/saveOrUpdateArticle.htm";
var getArticleUrl = "/publish/article/getArticle.htm";
var deleteArticleUrl = "/publish/article/deleteArticles.htm";
var findArticleUrl = "/publish/article/findArticle.htm";
var setArticlePublishStateUrl = "/publish/article/setArticlePublishState.htm";
var setArticleOrder = "/publish/article/setArticleOrder.htm";
var uploadArticleAttachmentUrl = "/publish/article/uploadArticleAttachment.htm";
var deleteArticleAttachmentUrl = "/publish/article/deleteArticleAttachment.htm";
var findArticleAttachmentUrl = "/publish/article/findArticleAttachment.htm";
var findArticleCategoryUrl = "/publish/oimsCategory/findCategories.htm";

var articleNotificationBtns;//通知权限按钮
var articleThesisBtns;//科研管理权限按钮
var articleManageCategory;//当前管理分类ID

/**
 * 入口函数，通知管理入口
 * @param btns
 */
function article_NotificationManager(btns, categoryId){
	if(btns!=undefined && btns!=null)
		articleNotificationBtns=btns;
	else
		btns = articleNotificationBtns;	
	pageTitle = "通知管理";
	var listObj = [ {
		title : "序号",
		key : "id"
	}, {
		title : "标题",
		key : "title"
	}, {
		title : "时间",
		key : "insertTime"
	},{
		title:"发布状态",
		key : "publish",
		func : function(p){
			return p?"已发布":"未发布";
		}
	}];
	importJS("/js/manager/article/articleFunction.js");
	articleManageCategory = oimsCategory.ARTICLE_CATEGORY_NOTIFICATION;
	artilce_showArticlePageList(categoryId, btns, listObj);
}

/**
 * 入口函数，论文管理入口
 * @param btns
 */
function article_ThesisManager(btns, categoryId){
	if(btns!=undefined && btns!=null)
		articleThesisBtns=btns;
	else
		btns = articleThesisBtns;
	pageTitle = "论文管理";
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
		title : "时间",// 所属办公室
		key : "insertTime",
	},{
		title : "发布状态",
		key : "publish",
		func : function(p){
			return p?"已发布":"未发布";
		}
	}];
	importJS("/js/manager/article/articleFunction.js");
	articleManageCategory = oimsCategory.ARTICLE_CATEGORY_THESIS;
	artilce_showArticlePageList(categoryId, btns, listObj);
}

/**
 * Btn 入口 显示通知新增表单
 */
function article_showNotificationForm(){
	article_showSaveOrUpdateForm("notificationForm", {categoryId:$("#advquery").find("select[name=categoryId]").val()});
}

/**
 * Btn 入口 显示科研论文新增表单
 */
function article_showThesisForm(){
	article_showSaveOrUpdateForm("thesisForm", {categoryId:$("#advquery").find("select[name=categoryId]").val()});
}

/**
 * 显示文章保存表单
 */
function article_showUpdateForm(){
	var data = getCheckBoxValue();
	if(data.length==0){
		$.oimsAlert("请选择要设置的对象！");
		return;
	}
	
	var d = data[0];
	var form;
	if(articleManageCategory==oimsCategory.ARTICLE_CATEGORY_NOTIFICATION){
		pageTitle = "通知";
		form="notificationForm";
	}else{
		pageTitle = "科研论文";
		form="thesisForm";
	}
	var data = getJSONData(getArticleUrl,{id:d.id});
	if(!data.state){
		$.oimsAlert("未找到对象，有可能已被管理员删除！");
		return;
	}
	article_showSaveOrUpdateForm(form,data.obj);
}

/**
 * 添加文章
 * @param data
 * @returns
 */
function article_showSaveOrUpdateForm(templateName,data){
	init();
	var html;
	$.ajax({
	        url:contextPath+"/js/manager/article/template/"+templateName+".html?tag="+Math.random(),
	        async : false,
	        type : "GET",
	        success : function(t){
	            html=t;
	        }
	});
	var form = $("<form />").attr("id","articleSaveOrUpdateForm").attr("method","post").attr("action",contextPath+saveOrUpdateArticleUrl).append(html).appendTo("#right");
	if(data!=undefined && data!=null){
		$.each(data,function(k,v){
			form.find("#"+k).val(v);
		});
	}
	form.ajaxForm({
		dataType : "json",
		success : function(d){
			if(!d.state){
				$.oimsError("保存失败！");
				return;
			}
			showThisArticles(d.obj.categoryId);
		}
	});
	form.find("select[name=categoryId]").replaceWith(initSelectForArticleCategory(data.categoryId));
	form.find(".advsumit").parent().click(function(){form.submit();});
	form.find(".advreset").parent().click(function(){form[0].reset();});
}

/**
 * 根据文章Id显示添加文章附件表单
 */
function article_showUploadAttachmentForm(){
	var data = getCheckBoxValue();
	if(data.length==0){
		$.oimsAlert("请选择要设置的对象！");
		return;
	}
	var id = data[0].id;
	
	var div = $("<div />").attr("id","articleAttachementDialog").oimsDialog({
		icon:"view",
		locked:true,
		title:"文章附件管理"
	});
	var ul = $("<ul />").css({padding:"8px"}).appendTo("#articleAttachementDialog");
	showAttachmentList();

	var form = $("<form />").ajaxForm({
		dataType:'json',
		success:function(data){
			form.resetForm();
			ul.text("");
			showAttachmentList();
		}
	}).attr("action",contextPath + uploadArticleAttachmentUrl).attr("encoding","multipart/form-data").attr("enctype","multipart/form-data").attr("method","post").appendTo("#articleAttachementDialog");
	$("<input />").attr("type", "file").attr("name","mf").appendTo(form);
	$("<input />").attr("type","hidden").attr("name","id").val(id).appendTo(form);
	$("<input />").attr("type", "submit").val("上传文件").appendTo(form);
	
	function showAttachmentList(){
		var result = getJSONData(findArticleAttachmentUrl,{articleId:id,tag:Math.random()});
		if(!result.state){
			$.oimsError("向服务器请求数据失败！");
			return;
		}
		$.each(result.obj,function(i,d){
			addAttachment(d);
		});
	}
	
	function addAttachment(d){
		var li = $("<li />").css({"text-align":"left","line-height":"1.5"}).appendTo(ul);
		$("<a />").click(function(){
			window.open(contextPath+d.downloadLink);
//			location.href=contextPath+d.downloadLink;
		}).text(d.attachment).appendTo(li);
		$("<span />").html(" &nbsp; - &nbsp; ").appendTo(li);
		$("<a />").click(function(){
			$.oimsConfirm("确定要删除此附件吗？",function(){
				var delRe = getJSONData(deleteArticleAttachmentUrl,{id:d.id,tag:Math.random()}, "POST");
				if(!delRe.state){
					$.oimsError("删除附件失败！");
				}else{
					li.remove();
				}
			});
		}).addClass("manageBtn").html("[ 删除 ]").appendTo(li);
	}
}

/**
 * 删除文章
 */
function article_deleteArticle(){
	var data = getCheckBoxValue();
	if(data.length==0){
		$.oimsAlert("请选择要设置的对象！");
		return;
	}
	var d = data[0];
	$.oimsConfirm("确定要删除此条吗？",function(){
		var delRe = getJSONData(deleteArticleUrl,{id:d.id,tag:Math.random()},"POST");
		if(!delRe.state){
			$.oimsError("删除失败！");
			return;
		}
		showThisArticles(d.categoryId);
	});
}

/**
 * 设置文章发表状态
 */
function article_setArticlePublish(){
	var data = getCheckBoxValue();
	if(data.length==0){
		$.oimsAlert("请选择要设置的对象！");
		return;
	}
	var d = data[0];
	var re = getJSONData(setArticlePublishStateUrl,{id:d.id,publish:!d.publish,tag:Math.random()}, "POST");
	if(!re.state){
		$.oimsError("操作失败！");
		return;
	}
	$.oimsSucc("操作成功！");

	showThisArticles(d.categoryId);
}

function showThisArticles(categoryId){
	if(articleManageCategory==oimsCategory.ARTICLE_CATEGORY_NOTIFICATION){
		article_NotificationManager(null,categoryId);
	}else{
		article_ThesisManager(null,categoryId);
	}
}
