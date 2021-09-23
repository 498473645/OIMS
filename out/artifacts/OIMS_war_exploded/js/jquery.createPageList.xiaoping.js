;(function($) {
	$.fn.createPageList = function(settings) {
		var current = this;
		load(settings, current);
	};
	function load(settings, current) {
		$.ajax({
			url : settings.url,
			data : settings.data,
			async : false,
			dataType : 'json',
			type : settings.method,
			success : function(data) {
				showMyList(current, data, settings);
			}
		});
	}

	function showMyList(current, data, settings) {
		$(current).text("");
		addListData(current, data.list, settings);
		var formId=settings.formId;
		if(formId==undefined)formId="pageFormXiaoping";
		var pageForm = $("#"+formId);
		if(!pageForm.length){
			pageForm=$("<form />").attr("id", formId).addClass("tfoot").css("text-align","center").width($(current).width()).appendTo(current);
		}else{
			$(pageForm).text("");
		}
		$.each(settings.data,function(n,v){
			$("<input />").attr("name",n).attr("type","hidden").val(v).appendTo(pageForm);
		});
		$(pageForm).attr("method", settings.method);
		$(pageForm).attr("action", settings.url);
		addPageData(data.page, pageForm);
		$(pageForm).ajaxForm({
			dataType : 'json',
			success : function(result) {
				showMyList(current, result, settings);
			}
		});
	}
	
	function addPageData(page, target) {
		$("<input />").attr("type", "hidden").attr("name", "pageCount").val(
				page.pageCount).appendTo(target);
		var str = "<span  class=\"textpage\"> 共：" + page.pageCount + "页，"+page.rowsCount+"条记录，每页" + page.pageSize
				+ "条，当前第" + page.currentPage + "页。</span>";

		$(str).appendTo(target);
		if (page.currentPage > 1) {
			var firstPage = $("<a />").addClass("btn").text("首页").appendTo(target);
			
			$(firstPage).click(function() {
				$("input[name=currentPage]").val(1);
				$(target).submit();
			});
			var p = $("<a />").addClass("btn").html("上一页").appendTo(target);
			$(p).click(
					function() {
						var curPage = page.currentPage-1;
						$("input[name=currentPage]").val(curPage);
						$(target).submit();
					});
		}

		if (page.currentPage < page.pageCount) {
			var nextPage = $("<a />").addClass("btn").html("下一页").appendTo(target);
			$(nextPage).click(
					function() {
						var curPage = page.currentPage+1;
						$("input[name=currentPage]").val(curPage);
						$(target).submit();
					});
			var l = $("<a />").addClass("btn").html("末页").appendTo(target);
			$(l).click(function() {
				$("input[name=currentPage]").val(page.pageCount);
				$(target).submit();
			});
		}
	}

	function addListData(current, listData, settings) {
		var listObj = settings.listObj;
		var tableId= $(current).attr("id")+"Table";
		var x = $("<table width=\"100%\" />").attr("id",tableId).attr("cellpadding", 0).attr(
				"cellspacing", 0).addClass("tabled").appendTo(current);
		var trTitle = $("<tr />").appendTo(x);
		$.each(listObj, function(i, d) {
			$("<th />").text(d.title).appendTo(trTitle);
		});
		$("<th />").appendTo(trTitle);
		$.each(listData, function(m, data) {
			var tr = $("<tr />").appendTo(x);
			$.each(listFactor.listObj, function(n, obj) {
				var val="-";
				$.each(data, function(key, value) {
					if (key == obj.key) {
						if (obj.func != undefined)
							value = obj.func(value);
						val=value;
					}
				});
				$("<td />").html(val).appendTo(tr);
			});
		    if(settings.manageMenu!=undefined && settings.manageMenu!=null && settings.manageMenu!="")$(getManageMenuForList(data, settings)).appendTo($("<td />").appendTo(tr));
			if (settings.contextMenu!=undefined) {
				$(tr).contextMenu({
					menu : settings.contextMenu.menuName
				}, function(action, el, pos) {
					settings.contextMenu.func(action, el, pos);
				});
			}
		});
		tableXuanRan(tableId);
	}

	function tableXuanRan(id) {
		$("#" + id).css("width", "100%");
		var trObj = $("#" + id + " tr");
		for ( var i = 0; i < trObj.length; i++) {
			for ( var n = 0; n < (trObj[i].children).length; n++) {
				if (n > 0)
					$((trObj[i].children)[n]).addClass("boderClass");
			}
			if (i == 0)
				continue;
			if (i % 2 != 0) {
				$(trObj[i]).addClass("bgTrXiaoping");
				$(trObj[i]).hover(function() {
					$(this).attr("class", "currTrXiaoping");
				}, function() {
					$(this).attr("class", "bgTrXiaoping");
				});
			} else {
				$(trObj[i]).addClass("bgTr1Xiaoping");
				$(trObj[i]).hover(function() {
					$(this).attr("class", "currTrXiaoping");
				}, function() {
					$(this).attr("class", "bgTr1Xiaoping");
				});
			}
		}
	}
	
	function getManageMenuForList(data, settings) {
		var obj = settings;
		var str = "";
		$.each(obj.manageMenu, function(i, d) {
			if (i > 0)
				str += " | ";
			var menuStr = d.title;
			var url = d.url;

			if (url.split(":")[0] == "javascript") {
				var x = url.indexOf("(");
				if (x > 0) {
					var params = url.substring(x + 1, url.indexOf(")")).split(
							",");
					for ( var n = 0; n < params.length; n++) {
						$.each(data, function(key, value) {
							if (params[n] == key)
								url = url.replace(key, "'" + value + "'");
						});
					}
				} else {
					url += "(" + data.id + ")";
				}
			}
			str += "<a href=\"" + url + "\">" + menuStr + "</a>";
		});
		return str;
	}
})(jQuery);