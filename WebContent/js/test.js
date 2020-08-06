/**
 * 
 * @param id
 *            填充div对应的categoryid
 * @param category
 *            categoryid对应的中文
 * @param tag
 *            填充div
 * @param tag1
 *            模板div
 */
function showTemplate(id, category, tag, tag1) {
	$("<h1 />").text("模板-" + category).appendTo(tag1);
	// $("<input
	// />").width(tag1.width()).data("id",id).val("请输入检索").attr("id","indexInput").addClass("inputContent").focus(function(){
	// var val = $.trim($(this).val());
	// if(val=="请输入检索")$(this).val("").css("color","#000");
	// }).blur(function(){
	// if(!$(this).val()){
	// $(this).val("请输入检索").css("color","#ccc");
	// }else{
	// $(".templateList").empty();
	// categoryDiv.children(".selected").removeClass("selected");
	// showList();
	// }
	// }).css("color","#ccc").appendTo(tag1);
	var categoryDiv = $("<div />").addClass("templateCategory").height(58)
			.appendTo(tag1);
	var div = $("<div />").addClass("templateList").height(
			tag1.height() - tag1.children("h1").outerHeight()
					- $("#indexInput").outerHeight()
					- categoryDiv.outerHeight()).appendTo(tag1);
	showCategory();
	function showList(fid) {
		var val = $.trim($("#indexInput").val());
		if (val == "请输入检索") {
			val = "";
		}
		var sd = $(".templateChangeValueSelect");
		if (!sd.length)
			$("<div />").addClass("templateChangeValueSelect").appendTo("body");
		var result = getJSONData(FIND_INPUT_TEMPLATE_URL, {
			fatherId : fid,
			search : val
		}, "POST");
		$.each(result.obj, function(i, d) {
			var html = d.shuru;
			var text = d.shuru;
			var v = d.items;
			$.each(v, function(n, k) {
				var sid = "templateChangeValue_" + d.id + "_" + n;
				html = html.replace("?", "<span id=\"" + sid
						+ "\"  class=\"templateChangeValue\">" + k[0]
						+ "</span>");
				text = text.replace("?", k[0]);
				var t = sd.children("." + sid);
				if (!t.length)
					t = $("<div />").addClass("showSelectTemplate").mouseover(
							function() {
								$(this).show();
							}).mouseout(function() {
						// setTimeout($(this).hide(),1000);
						$(this).hide();
					}).addClass(sid).appendTo(sd);
				t.text("");
				$.each(k, function(x, y) {
					$("<a />").text(y).click(function() {
						$("span#" + sid).text(y);
						$(this).parent().hide();
					}).appendTo(t);
				})
			});
			$("<a />").click(function() {
				var pre = tag.find(".templateChangeValue");
				pre.replaceWith(pre.text());
				if (tag.html() == "未见异常") {
					tag.html("&nbsp;" + html);
				} else {
					tag.html(tag.html() + "&nbsp;" + html);
				}

				tag.focus();
			}).text(text).appendTo(div);
		});
		$("span.templateChangeValue").mouseover(function() {
			var id = $(this).attr("id");
			var p = $(this).offset();
			$(".templateChangeValueSelect").children("." + id).css({
				left : p.left,
				top : p.top + $(this).outerHeight()
			}).show();
		});
	}
	function showCategory() {
		var result = getJSONData(FIND_INPUT_TEMPLATE_CATEGORY_URL, {
			id : id
		}, "POST");
		$.each(result.obj, function(i, d) {
			var a = $("<a />").click(function() {
				if ($(this).hasClass("selected")) {
					return;
				}
				categoryDiv.children(".selected").removeClass("selected");
				$(this).addClass("selected");
				// 清空之前选项
				$(".templateList").empty();
				showList(d.id);
			}).text(d.text).appendTo(categoryDiv);
			if (i == 0) {
				a.addClass("selected");
				showList(d.id);
			}
		});
	}
}