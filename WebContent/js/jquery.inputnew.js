;(function($){
$.fn.input1=function(settings)
{
	var templateUrl = setting.url;
	var showTag = setting.showTag;
	var defaultText = setting.defaultText;
	if(defaultText==undefined)defaultText="";
	var categoryUrl =setting.showCategory;
	if(showTag==undefined){
		var p = $(this).position();
		var top = p.top+$(this).outerHeight();
		showTag = $("<div />").css({postion:"absolute",left:p.left,top:top,overflow:"auto"}).width($(this).width()).height(200).appendTo("body");
		var h = $(document).height();
		if($(window).height()>h)h=$(window).height();
		if(top+showTag.outerHeight>h){
			showTag.css("top",p.top()-showTag.outerHeight());
		}
	}
	var temDiv=$("<div />").addClass("templateDiv").appendTo(showTag);
	var tag = $(this).parent();
	var input = setting.input;
	var current = null;
	var tagName=$(this).prop("tagName");
	if(input==undefined){
		input = $("<input />").attr("name",$(this).attr("name")).appendTo(tag);
	}
	if(tagName=="div"){
		current = $(this).attr("contenteditable","true").attr("hidefocus","true");
	}else{
		current = $("<div contenteditable=\"true\" hidefocus=\"true\" />").width($(this).width()).height($(this).height()).replaceAll($(this));
	}
	current.blur(function(){
		var v =$(this).html();
		if(htmlIsEmpty(v)){
			v=defaultTxt;
			$(this).html(v);
		}
		input.val(v);
		showTag.hide();
	}).focusin(function(){
		var v =$(this).html();
		if(v==defaultTxt)$(this).text("");
		showTemplate();
	});
	
	function showTemplate(){
		var templateList = $("<div />").appendTo(showTag);
		$.ajax({
			url : url,
			data : data,
			type : type,
			dataType : 'json',
			success : function(data) {
				$.each(function(i,d){
					var text = d.title
					$("<a />").text(text).appendTo(templateList);
					var html = $(text).appendTo()
				});
			}
		});
	}
	
	function htmIsEmpty(html){
		var v=true;
		if(!html.length)return v;
		html = html.toString().replace(/(<\s*\S*>)|\s|&nbsp;/g,"");
		return !html.length;
	}
}
})(jQuery);