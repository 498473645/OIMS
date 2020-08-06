(function($) {
	$.parser = {
		auto : true,
		onComplete : function(_1) {
		},
		plugins : [ "draggable", "droppable", "resizable", "pagination",
				"linkbutton", "menu", "menubutton", "splitbutton",
				"progressbar", "tree", "combobox", "combotree", "combogrid",
				"numberbox", "validatebox", "searchbox", "numberspinner",
				"timespinner", "calendar", "datebox", "datetimebox", "slider",
				"layout", "panel", "datagrid", "propertygrid", "treegrid",
				"tabs", "accordion", "window", "dialog" ],
		parse : function(_2) {
			var aa = [];
			for ( var i = 0; i < $.parser.plugins.length; i++) {
				var _3 = $.parser.plugins[i];
				var r = $(".easyui-" + _3, _2);
				if (r.length) {
					if (r[_3]) {
						r[_3]();
					} else {
						aa.push({
							name : _3,
							jq : r
						});
					}
				}
			}
			if (aa.length && window.easyloader) {
				var _4 = [];
				for ( var i = 0; i < aa.length; i++) {
					_4.push(aa[i].name);
				}
				easyloader.load(_4, function() {
					for ( var i = 0; i < aa.length; i++) {
						var _5 = aa[i].name;
						var jq = aa[i].jq;
						jq[_5]();
					}
					$.parser.onComplete.call($.parser, _2);
				});
			} else {
				$.parser.onComplete.call($.parser, _2);
			}
		},
		parseOptions : function(_6, _7) {
			var t = $(_6);
			var _8 = {};
			var s = $.trim(t.attr("data-options"));
			if (s) {
				var _9 = s.substring(0, 1);
				var _a = s.substring(s.length - 1, 1);
				if (_9 != "{") {
					s = "{" + s;
				}
				if (_a != "}") {
					s = s + "}";
				}
				_8 = (new Function("return " + s))();
			}
			if (_7) {
				var _b = {};
				for ( var i = 0; i < _7.length; i++) {
					var pp = _7[i];
					if (typeof pp == "string") {
						if (pp == "width" || pp == "height" || pp == "left"
								|| pp == "top") {
							_b[pp] = parseInt(_6.style[pp]) || undefined;
						} else {
							_b[pp] = t.attr(pp);
						}
					} else {
						for ( var _c in pp) {
							var _d = pp[_c];
							if (_d == "boolean") {
								_b[_c] = t.attr(_c) ? (t.attr(_c) == "true")
										: undefined;
							} else {
								if (_d == "number") {
									_b[_c] = t.attr(_c) == "0" ? 0
											: parseFloat(t.attr(_c))
													|| undefined;
								}
							}
						}
					}
				}
				$.extend(_8, _b);
			}
			return _8;
		}
	};

	function init(_7bf) {
		var _7c0 = $(
				"<div class=\"slider\">"
						+ "<div class=\"slider-inner\" id = \"slider-inner"
						+ _7bf.attributes["name"].value
						+ "\" type=\""
						+ _7bf.attributes["type"].value
						+ "\" cls=\""
						+ _7bf.attributes["cls"].value
						+ "\" min=\""
						+ _7bf.attributes["min"].value
						+ "\" max=\""
						+ _7bf.attributes["max"].value
						+ "\" name=\""
						+ _7bf.attributes["name"].value
						+ "\">"
						+ "<a href=\"javascript:void(0)\" class=\"slider-handle\" id = \"slider-handleId\"></a>"
						+ "<span class=\"slider-tip\"></span>" + "</div>"
						+ "<div class=\"slider-rule\"></div>"
						+ "<div class=\"slider-rulelabel\"></div>"
						+ "<div style=\"clear:both\"></div>"
						+ "<input type=\"hidden\" class=\"slider-value\">"
						+ "</div>").insertAfter(_7bf);
		var name = $(_7bf).hide().attr("name");
		if (name) {
			_7c0.find("input.slider-value").attr("name", name);
			$(_7bf).removeAttr("name").attr("sliderName", name);
		}
		return _7c0;
	}
	;
	function _7c1(_7c2, _7c3) {
		var opts = $.data(_7c2, "slider").options;
		var _7c4 = $.data(_7c2, "slider").oimSlider;
		if (_7c3) {
			if (_7c3.width) {
				opts.width = _7c3.width;

			}
			if (_7c3.height) {
				opts.height = _7c3.height;
			}
		}
		if (opts.mode == "h") {
			_7c4.css("height", "");
			_7c4.children("div").css("height", "");
			if (!isNaN(opts.width)) {
				_7c4.width(opts.width);
			}
		} else {
			_7c4.css("width", "");
			_7c4.children("div").css("width", "");
			if (!isNaN(opts.height)) {
				_7c4.height(opts.height);
				_7c4.find("div.slider-rule").height(opts.height);
				_7c4.find("div.slider-rulelabel").height(opts.height);
				_7c4.find("div.slider-inner")._outerHeight(opts.height);
			}
		}
		_7c5(_7c2);
	}
	;
	function _7c6(_7c7) {
		var opts = $.data(_7c7, "slider").options;
		var _7c8 = $.data(_7c7, "slider").oimSlider;
		if (opts.mode == "h") {
			_7c9(opts.rule);
		} else {
			_7c9(opts.rule.slice(0).reverse());
		}
		function _7c9(aa) {
			var rule = _7c8.find("div.slider-rule");
			var _7ca = _7c8.find("div.slider-rulelabel");
			rule.empty();
			_7ca.empty();
			for ( var i = 0; i < aa.length; i++) {
				var _7cb = i * 100 / (aa.length - 1) + "%";
				var span = $("<span></span>").appendTo(rule);
				span.css((opts.mode == "h" ? "left" : "top"), _7cb);
				if (aa[i] != "|") {
					span = $("<span></span>").appendTo(_7ca);
					span.html(aa[i]);
					if (opts.mode == "h") {
						span.css({
							left : _7cb,
							marginLeft : -Math.round(span.outerWidth() / 2)
						});
					} else {
						span.css({
							top : _7cb,
							marginTop : -Math.round(span.outerHeight() / 2)
						});
					}
				}
			}
		}
		;
	}
	;
	function _7cc(_7cd) {
		var opts = $.data(_7cd, "slider").options;
		var _7ce = $.data(_7cd, "slider").oimSlider;
		_7ce.removeClass("slider-h slider-v slider-disabled");
		_7ce.addClass(opts.mode == "h" ? "slider-h" : "slider-v");
		_7ce.addClass(opts.disabled ? "slider-disabled" : "");
		_7ce.find("a.slider-handle").draggable(
				{
					axis : opts.mode,
					cursor : "pointer",
					disabled : opts.disabled,
					onDrag : function(e) {
						var left = e.data.left;
						var _7cf = _7ce.width();
						if (opts.mode != "h") {
							left = e.data.top;
							_7cf = _7ce.height();
						}
						if (left < 0 || left > _7cf) {
							return false;
						} else {
							var _7d0 = _7df(_7cd, left);
							_7d1(_7d0);
							return false;
						}
					},
					onStartDrag : function() {
						opts.onSlideStart.call(_7cd, opts.value);
					},
					onStopDrag : function(e) {
						var _7d2 = _7df(_7cd, (opts.mode == "h" ? e.data.left
								: e.data.top));
						_7d1(_7d2);
						opts.onSlideEnd.call(_7cd, opts.value);
					}
				});
		function _7d1(_7d3) {
			var s = Math.abs(_7d3 % opts.step);
			if (s < opts.step / 2) {
				_7d3 -= s;
			} else {
				_7d3 = _7d3 - s + opts.step;
			}
			_7d4(_7cd, _7d3);
		}
		;
	}
	;
	function _7d4(_7d5, _7d6) {
		var opts = $.data(_7d5, "slider").options;
		var _7d7 = $.data(_7d5, "slider").oimSlider;
		var _7d8 = opts.value;
		if (_7d6 < opts.min) {
			_7d6 = opts.min;
		}
		if (_7d6 > opts.max) {
			_7d6 = opts.max;
		}
		opts.value = _7d6;
		$(_7d5).val(_7d6);
		_7d7.find("input.slider-value").val(_7d6);
		var pos = _7d9(_7d5, _7d6);
		var tip = _7d7.find(".slider-tip");
		if (opts.showTip) {
			tip.show();
			tip.html(opts.tipFormatter.call(_7d5, opts.value));
		} else {
			tip.hide();
		}
		if (opts.mode == "h") {
			var _7da = "left:" + pos + "px;";
			_7d7.find(".slider-handle").attr("style", _7da);
			tip.attr("style", _7da + "margin-left:"
					+ (-Math.round(tip.outerWidth() / 2)) + "px");
		} else {
			var _7da = "top:" + pos + "px;";
			_7d7.find(".slider-handle").attr("style", _7da);
			tip.attr("style", _7da + "margin-left:"
					+ (-Math.round(tip.outerWidth())) + "px");
		}
		if (_7d8 != _7d6) {
			opts.onChange.call(_7d5, _7d6, _7d8);
		}
	}
	;
	function _7c5(_7db) {
		var opts = $.data(_7db, "slider").options;
		var fn = opts.onChange;
		opts.onChange = function() {
		};
		_7d4(_7db, opts.value);
		opts.onChange = fn;
	}
	;
	function _7d9(_7dc, _7dd) {
		var opts = $.data(_7dc, "slider").options;
		var _7de = $.data(_7dc, "slider").oimSlider;
		if (opts.mode == "h") {
			var pos = (_7dd - opts.min) / (opts.max - opts.min) * _7de.width();
		} else {
			var pos = _7de.height() - (_7dd - opts.min) / (opts.max - opts.min)
					* _7de.height();
		}
		return pos.toFixed(0);
	}
	;
	function _7df(_7e0, pos) {
		var opts = $.data(_7e0, "slider").options;
		var _7e1 = $.data(_7e0, "slider").oimSlider;
		if (opts.mode == "h") {
			var _7e2 = opts.min + (opts.max - opts.min) * (pos / _7e1.width());
		} else {
			var _7e2 = opts.min + (opts.max - opts.min)
					* ((_7e1.height() - pos) / _7e1.height());
		}
		return _7e2.toFixed(0);
	}
	;
	$.fn.oimSlider = function(_7e3, _7e4) {
		if (typeof _7e3 == "string") {
			return $.fn.oimSlider.methods[_7e3](this, _7e4);
		}
		_7e3 = _7e3 || {};
		return this.each(function() {
			var _7e5 = $.data(this, "slider");
			if (_7e5) {
				$.extend(_7e5.options, _7e3);
			} else {
				_7e5 = $.data(this, "slider", {
					options : $.extend({}, $.fn.oimSlider.defaults,
							$.fn.oimSlider.parseOptions(this), _7e3),
					oimSlider : init(this)
				});
				$(this).removeAttr("disabled");
			}
			_7cc(this);
			_7c6(this);
			_7c1(this);
		});
	};
	$.fn.oimSlider.methods = {
		options : function(jq) {
			return $.data(jq[0], "slider").options;
		},
		destroy : function(jq) {
			return jq.each(function() {
				$.data(this, "slider").oimSlider.remove();
				$(this).remove();
			});
		},
		resize : function(jq, _7e6) {
			return jq.each(function() {
				_7c1(this, _7e6);
			});
		},
		getValue : function(jq) {
			return jq.oimSlider("options").value;
		},
		setValue : function(jq, _7e7) {
			return jq.each(function() {
				_7d4(this, _7e7);
			});
		},
		enable : function(jq) {
			return jq.each(function() {
				$.data(this, "slider").options.disabled = false;
				_7cc(this);
			});
		},
		disable : function(jq) {
			return jq.each(function() {
				$.data(this, "slider").options.disabled = true;
				_7cc(this);
			});
		}
	};
	$.fn.oimSlider.parseOptions = function(_7e8) {
		var t = $(_7e8);
		return $.extend({}, $.parser.parseOptions(_7e8, [ "width", "height",
				"mode", {
					showTip : "boolean",
					min : "number",
					max : "number",
					step : "number"
				} ]), {
			value : (t.val() || undefined),
			disabled : (t.attr("disabled") ? true : undefined),
			rule : (t.attr("rule") ? eval(t.attr("rule")) : undefined)
		});
	};
	$.fn.oimSlider.defaults = {
		width : "auto",
		height : "auto",
		mode : "h",
		showTip : false,
		disabled : false,
		value : 0,
		min : 0,
		max : 100,
		step : 1,
		rule : [],
		tipFormatter : function(_7e9) {
			return _7e9;
		},
		onChange : function(_7ea, _7eb) {
		},
		onSlideStart : function(_7ec) {
		},
		onSlideEnd : function(_7ed) {
		}
	};
})(jQuery);
(function($) {
	var _10 = false;
	function _11(e) {
		var _12 = $.data(e.data.target, "draggable").options;
		var _13 = e.data;
		var _14 = _13.startLeft + e.pageX - _13.startX;
		var top = _13.startTop + e.pageY - _13.startY;
		if (_12.deltaX != null && _12.deltaX != undefined) {
			_14 = e.pageX + _12.deltaX;
		}
		if (_12.deltaY != null && _12.deltaY != undefined) {
			top = e.pageY + _12.deltaY;
		}
		if (e.data.parent != document.body) {
			_14 += $(e.data.parent).scrollLeft();
			top += $(e.data.parent).scrollTop();
		}
		if (_12.axis == "h") {
			_13.left = _14;
		} else {
			if (_12.axis == "v") {
				_13.top = top;
			} else {
				_13.left = _14;
				_13.top = top;
			}
		}
	}
	;
	function _15(e) {
		var _16 = $.data(e.data.target, "draggable").options;
		var _17 = $.data(e.data.target, "draggable").proxy;
		if (!_17) {
			_17 = $(e.data.target);
		}
		_17.css({
			left : e.data.left,
			top : e.data.top
		});
		$("body").css("cursor", _16.cursor);
	}
	;
	function _18(e) {
		_10 = true;
		var _19 = $.data(e.data.target, "draggable").options;
		var _1a = $(".droppable").filter(function() {
			return e.data.target != this;
		}).filter(function() {
			var _1b = $.data(this, "droppable").options.accept;
			if (_1b) {
				return $(_1b).filter(function() {
					return this == e.data.target;
				}).length > 0;
			} else {
				return true;
			}
		});
		$.data(e.data.target, "draggable").droppables = _1a;
		var _1c = $.data(e.data.target, "draggable").proxy;
		if (!_1c) {
			if (_19.proxy) {
				if (_19.proxy == "clone") {
					_1c = $(e.data.target).clone().insertAfter(e.data.target);
				} else {
					_1c = _19.proxy.call(e.data.target, e.data.target);
				}
				$.data(e.data.target, "draggable").proxy = _1c;
			} else {
				_1c = $(e.data.target);
			}
		}
		_1c.css("position", "absolute");
		_11(e);
		_15(e);
		_19.onStartDrag.call(e.data.target, e);
		return false;
	}
	;
	function _1d(e) {
		_11(e);
		if ($.data(e.data.target, "draggable").options.onDrag.call(
				e.data.target, e) != false) {
			_15(e);
		}
		var _1e = e.data.target;
		$.data(e.data.target, "draggable").droppables
				.each(function() {
					var _1f = $(this);
					var p2 = $(this).offset();
					if (e.pageX > p2.left
							&& e.pageX < p2.left + _1f.outerWidth()
							&& e.pageY > p2.top
							&& e.pageY < p2.top + _1f.outerHeight()) {
						if (!this.entered) {
							$(this).trigger("_dragenter", [ _1e ]);
							this.entered = true;
						}
						$(this).trigger("_dragover", [ _1e ]);
					} else {
						if (this.entered) {
							$(this).trigger("_dragleave", [ _1e ]);
							this.entered = false;
						}
					}
				});
		return false;
	}
	;
	function _20(e) {
		_10 = false;
		_11(e);
		var _21 = $.data(e.data.target, "draggable").proxy;
		var _22 = $.data(e.data.target, "draggable").options;
		if (_22.revert) {
			if (_23() == true) {
				_24();
				$(e.data.target).css({
					position : e.data.startPosition,
					left : e.data.startLeft,
					top : e.data.startTop
				});
			} else {
				if (_21) {
					_21.animate({
						left : e.data.startLeft,
						top : e.data.startTop
					}, function() {
						_24();
					});
				} else {
					$(e.data.target).animate({
						left : e.data.startLeft,
						top : e.data.startTop
					}, function() {
						$(e.data.target).css("position", e.data.startPosition);
					});
				}
			}
		} else {
			$(e.data.target).css({
				position : "absolute",
				left : e.data.left,
				top : e.data.top
			});
			_24();
			_23();
		}
		_22.onStopDrag.call(e.data.target, e);
		$(document).unbind(".draggable");
		setTimeout(function() {
			$("body").css("cursor", "");
		}, 100);
		function _24() {
			if (_21) {
				_21.remove();
			}
			$.data(e.data.target, "draggable").proxy = null;
		}
		;
		function _23() {
			var _25 = false;
			$.data(e.data.target, "draggable").droppables.each(function() {
				var _26 = $(this);
				var p2 = $(this).offset();
				if (e.pageX > p2.left && e.pageX < p2.left + _26.outerWidth()
						&& e.pageY > p2.top
						&& e.pageY < p2.top + _26.outerHeight()) {
					if (_22.revert) {
						$(e.data.target).css({
							position : e.data.startPosition,
							left : e.data.startLeft,
							top : e.data.startTop
						});
					}
					$(this).trigger("_drop", [ e.data.target ]);
					_25 = true;
					this.entered = false;
				}
			});
			return _25;
		}
		;
		return false;
	}
	;
	$.fn.draggable = function(_27, _28) {
		if (typeof _27 == "string") {
			return $.fn.draggable.methods[_27](this, _28);
		}
		return this.each(function() {
			var _29;
			var _2a = $.data(this, "draggable");
			if (_2a) {
				_2a.handle.unbind(".draggable");
				_29 = $.extend(_2a.options, _27);
			} else {
				_29 = $.extend({}, $.fn.draggable.defaults, $.fn.draggable
						.parseOptions(this), _27 || {});
			}
			if (_29.disabled == true) {
				$(this).css("cursor", "");
				return;
			}
			var _2b = null;
			if (typeof _29.handle == "undefined" || _29.handle == null) {
				_2b = $(this);
			} else {
				_2b = (typeof _29.handle == "string" ? $(_29.handle, this)
						: _29.handle);
			}
			$.data(this, "draggable", {
				options : _29,
				handle : _2b
			});
			_2b.unbind(".draggable").bind("mousemove.draggable", {
				target : this
			}, function(e) {
				if (_10) {
					return;
				}
				var _2c = $.data(e.data.target, "draggable").options;
				if (_2d(e)) {
					$(this).css("cursor", _2c.cursor);
				} else {
					$(this).css("cursor", "");
				}
			}).bind("mouseleave.draggable", {
				target : this
			}, function(e) {
				$(this).css("cursor", "");
			}).bind("mousedown.draggable", {
				target : this
			}, function(e) {
				if (_2d(e) == false) {
					return;
				}
				$(this).css("cursor", "");
				var _2e = $(e.data.target).position();
				var _2f = {
					startPosition : $(e.data.target).css("position"),
					startLeft : _2e.left,
					startTop : _2e.top,
					left : _2e.left,
					top : _2e.top,
					startX : e.pageX,
					startY : e.pageY,
					target : e.data.target,
					parent : $(e.data.target).parent()[0]
				};
				$.extend(e.data, _2f);
				var _30 = $.data(e.data.target, "draggable").options;
				if (_30.onBeforeDrag.call(e.data.target, e) == false) {
					return;
				}
				$(document).bind("mousedown.draggable", e.data, _18);
				$(document).bind("mousemove.draggable", e.data, _1d);
				$(document).bind("mouseup.draggable", e.data, _20);
			});
			function _2d(e) {
				var _31 = $.data(e.data.target, "draggable");
				var _32 = _31.handle;
				var _33 = $(_32).offset();
				var _34 = $(_32).outerWidth();
				var _35 = $(_32).outerHeight();
				var t = e.pageY - _33.top;
				var r = _33.left + _34 - e.pageX;
				var b = _33.top + _35 - e.pageY;
				var l = e.pageX - _33.left;
				return Math.min(t, r, b, l) > _31.options.edge;
			}
			;
		});
	};
	$.fn.draggable.methods = {
		options : function(jq) {
			return $.data(jq[0], "draggable").options;
		},
		proxy : function(jq) {
			return $.data(jq[0], "draggable").proxy;
		},
		enable : function(jq) {
			return jq.each(function() {
				$(this).draggable({
					disabled : false
				});
			});
		},
		disable : function(jq) {
			return jq.each(function() {
				$(this).draggable({
					disabled : true
				});
			});
		}
	};
	$.fn.draggable.parseOptions = function(_36) {
		var t = $(_36);
		return $.extend({}, $.parser.parseOptions(_36, [ "cursor", "handle",
				"axis", {
					"revert" : "boolean",
					"deltaX" : "number",
					"deltaY" : "number",
					"edge" : "number"
				} ]), {
			disabled : (t.attr("disabled") ? true : undefined)
		});
	};
	$.fn.draggable.defaults = {
		proxy : null,
		revert : false,
		cursor : "move",
		deltaX : null,
		deltaY : null,
		handle : null,
		disabled : false,
		edge : 0,
		axis : null,
		onBeforeDrag : function(e) {
		},
		onStartDrag : function(e) {
		},
		onDrag : function(e) {
		},
		onStopDrag : function(e) {
		}
	};
})(jQuery);
(function($) {
	function _37(_38) {
		$(_38).addClass("droppable");
		$(_38).bind(
				"_dragenter",
				function(e, _39) {
					$.data(_38, "droppable").options.onDragEnter.apply(_38, [
							e, _39 ]);
				});
		$(_38).bind(
				"_dragleave",
				function(e, _3a) {
					$.data(_38, "droppable").options.onDragLeave.apply(_38, [
							e, _3a ]);
				});
		$(_38).bind("_dragover", function(e, _3b) {
			$.data(_38, "droppable").options.onDragOver.apply(_38, [ e, _3b ]);
		});
		$(_38).bind("_drop", function(e, _3c) {
			$.data(_38, "droppable").options.onDrop.apply(_38, [ e, _3c ]);
		});
	}
	;
	$.fn.droppable = function(_3d, _3e) {
		if (typeof _3d == "string") {
			return $.fn.droppable.methods[_3d](this, _3e);
		}
		_3d = _3d || {};
		return this.each(function() {
			var _3f = $.data(this, "droppable");
			if (_3f) {
				$.extend(_3f.options, _3d);
			} else {
				_37(this);
				$.data(this, "droppable", {
					options : $.extend({}, $.fn.droppable.defaults,
							$.fn.droppable.parseOptions(this), _3d)
				});
			}
		});
	};
	$.fn.droppable.methods = {};
	$.fn.droppable.parseOptions = function(_40) {
		return $.extend({}, $.parser.parseOptions(_40, [ "accept" ]));
	};
	$.fn.droppable.defaults = {
		accept : null,
		onDragEnter : function(e, _41) {
		},
		onDragOver : function(e, _42) {
		},
		onDragLeave : function(e, _43) {
		},
		onDrop : function(e, _44) {
		}
	};
})(jQuery);