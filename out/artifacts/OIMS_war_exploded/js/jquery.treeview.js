;(function($) {
	function load(settings, root, child, container) {
		$.getJSON(contextPath + settings.url, root,
				function(response) {
					function createNode(parent) {
						var id = this.id;
						var current = $("<li/>").attr("id", id || "").appendTo(
								parent);
						var text = $(
								"<span id=\"contextCategory_" + id
										+ "\" title=\"" + this.intr + "\">"
										+ this.category + "</span>").appendTo(
								current);
						$(text).click(function() {
							settings.listFunc(id)
							$(".current").removeClass("current");
							$(text).addClass("current");
						});

						$(text).contextMenu({
							menu : settings.contextMenu.menuName
						}, function(action, el, pos) {
							settings.contextMenu.func(action, el, pos);
						});

						if (this.classes) {
							current.children("span").addClass(this.classes);
						}
						if (this.expanded) {
							current.addClass("open");
						}
						var hasChildren = getJSONData(settings.url, {
							id : this.id,tag:Math.random()
						});
						if (hasChildren.length > 0) {
							var branch = $("<ul/>").appendTo(current);
							current.addClass("hasChildren");
						}
					}

					$.each(response, createNode, [ child ]);
					$(container).treeview({
						add : child
					});
				});
	}

	var proxied = $.fn.treeview;
	$.fn.treeview = function(settings) {
		function createContextMenu(obj) {
			var menuObj = $("<ul />").attr("id", settings.contextMenu.menuName).addClass("contextMenu")
					.appendTo("#mainBody");
			$.each(obj, function(i, d) {
				var ele = $("<li />").addClass(d.className).appendTo(menuObj);
				$("<a />").attr("href", d.linkUrl).text(d.text).appendTo(ele);
			});
		}
		if (!settings.url) {
			return proxied.apply(this, arguments);
		}
		var container = this;
		var factor={id:0,tag:Math.random()};
		if(settings.factor!=undefined){
			factor=settings.factor;
		}
		load(settings,factor, this, container);
		if (settings.contextMenu.menuObj != undefined)
			createContextMenu(settings.contextMenu.menuObj);
		var userToggle = settings.toggle;
		return proxied.call(this, $.extend({}, settings,
				{
					collapsed : true,
					toggle : function() {
						var $this = $(this);
						if ($this.hasClass("hasChildren")) {
							var childList = $this.removeClass("hasChildren")
									.find("ul");
							childList.empty();
							load(settings, {id:this.id,tag:Math.random()}, childList, container);
						}
						if (userToggle) {
							userToggle.apply(this, arguments);
						}
					}
				}));
	};
})(jQuery);