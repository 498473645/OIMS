var findArticleCategoryUrl = "/publish/oimsCategory/findCategories.htm";
/**
 * 显示文章分页
 * @param categoryId
 * @param btns
 * @param listObj
 * @param publish
 */
function artilce_showArticlePageList(categoryId,btns,listObj,publish,keyword){
	init();
	var searchDiv = $("<div />").attr("id","advquery").addClass("advquery").appendTo("#right");
	var table = $("<table />").appendTo(searchDiv);
	var tr = $("<tr />").appendTo(table);
	var td = $("<td />").attr("width","10%").addClass("leftalign").appendTo(tr);
	var categorySelect = initSelectForArticleCategory(categoryId).change(function(){
		$("#pageForm").children("input[name=categoryId]").val($(this).val());
		$("#pageForm").submit();
	}).appendTo(td);
	td = $("<td />").attr("width","23%").addClass("leftalign").appendTo(tr);
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
		if(val==normalText)val="";
		var categoryId = searchDiv.find("select[name=categoryId]").val();
		if(val==$(this).data("keyword") && categoryId==$(this).data("categoryId")){
			return;
		}
		$(this).data("keyword",val);
		$(this).data("categoryId",categoryId)
		var inputKeyword = $("#pageForm").children("input[name=keyword]");
		if(!inputKeyword.length){
			inputKeyword = $("<input />").attr("name","keyword").attr("type","hidden").appendTo("#pageForm");
		}
		$("#pageForm").children("input[name=currentPage]").val(1);
		inputKeyword.val(val);
		if(!val.length)val=normalText;
		$("#pageForm").submit();
	}).appendTo($("<td />").attr("width","7%").appendTo(tr));
	
	td = $("<td />").appendTo(tr);
	var tag = $("<div />").addClass("btn").appendTo(td);
	showMyBTNS(btns,tag);
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
				.appendTo("#right");
	
	listFactor = {
			url : contextPath + findArticleUrl,// url
			method : "post",
			checkbox : true,
			single : true,
			listObj : listObj,
			data : {// data表示传的参数
				currentPage : 1,
				pageSize : getPageSize(),
				categoryId:categorySelect.val(),
			}
		};
	if(publish!=undefined){
		var data = listFactor.data;
		data = $.extend(data,{publish:publish});
		listFactor.data=data;
	}
	if(keyword!=undefined){
		var data = listFactor.data;
		data = $.extend(data,{keyword:keyword});
		listFactor.data = data;
	}
	$(div_list).createPageList(listFactor);
}

/**
 * 生成文章分类标签SELECT
 * @param category
 */
function initSelectForArticleCategory(categoryId){
	var selectTag=$("<select />").attr("name","categoryId");
	var data = getJSONData(findArticleCategoryUrl,{fatherId:articleManageCategory,tag:Math.random()});
	$.each(data.obj,function(i,d){
		var option = $("<option />").val(d.id).text(d.category).appendTo(selectTag);
	});
	if(categoryId){
		selectTag.children("option[value="+categoryId+"]").attr("selected","selected");
	}
	return selectTag;
}
