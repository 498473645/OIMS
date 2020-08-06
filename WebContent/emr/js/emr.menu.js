;(function($) {
    var url="/publish/category/findCategoryByFatherId.htm";
    var url_zhixingkeshi="/publish/jcxm/findBgsByCategoryId.htm";
    var _url = "/publish/jcxm/findJcxmCategoryByBgsId.htm";
	var showTypeMethod={
			CATEGORY_ZHIXINGKESHI:1,
			ZHIXINGKESHI_CATEGORY:2
	};
	var showZhixingkeshi=0;
	
	$.fn.emrMenu=function(setting){
		var current = $(this).addClass("emrMenu");
		var showType=setting.showType;//显示执行科室
		var callback = setting.callback;
		var keepSelected=setting.keepSelected;
		var selectShowTag=setting.selectShowTag;
		var firstChildShowWay=setting.firstChildShowWay;

		if(showType==undefined)showType=0;
		if(showType==showTypeMethod.ZHIXINGKESHI_CATEGORY){
			initZXKSMenuTag(current);
		}else{
			initCategoryMenuTag(current);
		}
		
		if(firstChildShowWay=="down")
			current.children(".menuTag").css("margin-top",current.outerHeight());
		else
			current.children(".menuTag").css({"margin-left":110});
		documentHideEvent();
		/**
		 * 显示菜单DOM
		 */
		function initCategoryMenuTag(ele,bgsId){
			var div = $("<div />").addClass("menuTag").addClass("emrMenu").prependTo(ele);
			div.mouseout(function(){
				$(this).parent().children("a").removeClass("on");
			}).mouseover(function(){
				$(this).parent().children("a").addClass("on");
			});
			var u = url;
			var sd = {fatherId:ele.data("id")};
			if(bgsId!=undefined){
				u=_url;
				sd = {bgsId:bgsId}
			}
			$.ajax({
				url : contextPath + u,
				data : sd,
				type : "GET",
				dataType : 'json',
				success : function(data) {
					ele.removeClass("initWait");
					if(!data.state||!data.obj.length){
						div.remove();
						if(showType==showTypeMethod.CATEGORY_ZHIXINGKESHI){
		        			initZXKSMenuTag(ele);
		    			}
						return;
					}
					var ul = $("<ul />").appendTo(div);
					if(sd.fatherId==CHUZHI_CATEGORY.otherExam){
						var li = $("<li />").addClass("emrMenu").attr("id","menu_tag_li_cyxm").data("id",CHUZHI_CATEGORY.otherExam).appendTo(ul);
						var a = $("<a />").addClass("emrMenu").click(function(){
							return menuSelected($(this).parent(),CHUZHI_CATEGORY.otherExam,null,1);
//							alert("全院常用项目");
		    			}).attr("title","常用项目").text("常用项目").appendTo(li);
					}
					setEleEvent(ele);
					 $.each(data.obj,function(i,d){
						 if(d.id==current.data("id"))return true;
			    		var li = $("<li />").addClass("emrMenu").attr("id","menu_tag_li_"+d.id).data("id",d.id).appendTo(ul);
			    		if(bgsId==undefined)li.addClass("initWait");
			    		var a = $("<a />").addClass("emrMenu").click(function(){
			    			var bgsId;
							if(showType==showTypeMethod.ZHIXINGKESHI_CATEGORY)
								bgsId = current.children(".menuTag").children().children("li.show").data("id");
			    			
			    			return menuSelected($(this).parent(),d.id,bgsId);
			    		}).attr("title",d.category).text(d.category).appendTo(li);
			    		if(!d.haveChildren){
			    			li.mouseover(function(){
			    				$(this).parent().find(".menuTag").hide();
			    			});
//			    			if(showType==showType.CATEGORY_ZHIXINGKESHI)
//			        			initZXKSMenuTag(li);
			    		}else
			    			setEleEvent(li);
					 });
					 if(ele==current && showSelectTag.length)showSelectTag(ele);
				}
			});
		}
		
		/**
		 * 选中
		 */
		function menuSelected(li,id, bgsId,cyxm){
			
			li.parent().parent().hide();
			var parent = li;
			if(keepSelected){
				var next;
				while((next = parent.parent().parent().parent()).hasClass("emrMenu")  && next.is("li")){
					parent = next;
				}
				parent.parent().find("a.selected").removeClass("selected");
				parent.children("a").addClass("selected");
			}
			if(selectShowTag!=null){
				selectShowTag.children("select").remove();
				showSelectTag(li);
			}
			callback(id,bgsId,cyxm);
		}
		
		/**
		 * 显示菜单
		 */
		function menuShow(menu){
			var children = menu.children().children("li.initWait");
			$.each(children,function(i,ele){
				var li = $(ele);
				if(li.children(".menuTag").length)return true;
				if(showType==showTypeMethod.ZHIXINGKESHI_CATEGORY)
					initZXKSMenuTag(li);
				else
					initCategoryMenuTag(li);
			});
			if(menu.parent().is("li")){
				menu.css("margin-left",110)
			}
			menu.show();
		}
		
		/**
		 * 初始化执行科室菜单
		 */
		function initZXKSMenuTag(ele){
			var div = $("<div />").addClass("menuTag").addClass("emrMenu").addClass("emrZhixingkeshi").prependTo(ele);
			div.mouseout(function(){
				$(this).parent().children("a").removeClass("on");
			}).mouseover(function(){
				$(this).parent().children("a").addClass("on");
			});
			 $.ajax({
					url : contextPath + url_zhixingkeshi,
					data : {categoryId:ele.data("id")},
					type : "GET",
					dataType : 'json',
					success : function(data) {
						ele.removeClass("initWait");
						if(!data.state||!data.obj.length){
							div.remove();
							if(showType==showTypeMethod.ZHIXINGKESHI_CATEGORY){
								initCategoryMenuTag(ele);
			    			}
							return;
						}
						setEleEvent(ele);
						var ul = $("<ul />").appendTo(div);
//						alert(ele.data("id"));
						if(ele.data("id")==CHUZHI_CATEGORY.labTest){
							var li = $("<li />").addClass("emrMenu").addClass("zxks").attr("id","menu_tag_li_ks_cyxm").data("id","cyxm").appendTo(ul);
							var a = $("<a />").addClass("emrMenu").click(function(){
					    		return menuSelected($(this).parent(),CHUZHI_CATEGORY.labTest,null,1);
//								alert("化验检查项目");
					    	}).attr("title","常用项目").text("常用项目").appendTo(li);
						}
						 $.each(data.obj,function(i,d){
							var li = $("<li />").addClass("emrMenu").addClass("zxks").attr("id","menu_tag_li_ks_"+d.id).data("id",d.id).appendTo(ul);
							var a = $("<a />").addClass("emrMenu").click(function(){
								
					    		return menuSelected($(this).parent(),ele.data("id"),d.id);
					    	}).attr("title",d.bgs).text(d.bgs).appendTo(li);
							if(showType==showTypeMethod.ZHIXINGKESHI_CATEGORY){
								//li.addClass("initWait");
								initCategoryMenuTag(li,d.id);
								//setEleEvent(ele);
			    			}
						 });
						 if(ele==current && showSelectTag.length)showSelectTag(ele);
					}
			});
		}
		
		/**
		 * 设置响应事件
		 */
		function setEleEvent(ele){
			if(ele.children("a").length)$("<span />").addClass("emrMenu").addClass("haveChildren").appendTo(ele.children("a"));
			ele.addClass("haveChildren").mouseover(function(){
					$(this).parent().children(".show").removeClass("show").children(".menuTag").hide();
					$(this).addClass("show");
					menuShow($(this).children(".menuTag"));
//				}).mouseout(function(){
//					$(this).removeClass("show");
//					$(this).children(".menuTag").hide();
			});
//			ele.children(".menuTag").mouseout(function(){
//				$(this).hide();
//			})
		}
		
		/**
		 * 显示SELECT标签
		 */
		function showSelectTag(ele,id){
			var ul = ele.children(".menuTag").children("ul");
			var fid = ele.data("id");
			if(ul.length){
				var select = getSelectTag(ul,id);
				if(selectShowTag!=null)
					select.prependTo(selectShowTag);
			}
			if(ele==current)return;
			var father = ele.parent().parent().parent();
			if(father.length)showSelectTag(father,fid);
		}
		
		/**
		 * 根据菜单UL生成SELECT标签
		 */
		function getSelectTag(ul,id){
			var isZXKS = ul.parent().hasClass("emrZhixingkeshi");
			var selectName = isZXKS ? "zxksSelect" : "categorySelect";
			var select = $("<select>").attr("name",selectName).change(function(){
				var index = selectShowTag.children("select:eq(0)")[0].selectedIndex;
				var next;
				while((next=$(this).next("select")).length){
				//	console.log(next);
					next.remove();
				}
				var _id = $(this).val();
				var cyxm=0;
				if((_id=='cyxm'||ul.parent().parent().data("id")==CHUZHI_CATEGORY.otherExam)&&selectShowTag.children("select:eq(0)").children("option:eq("+index+")").html()=='常用项目'){
					cyxm = 1;
				}
				if(isZXKS){//化验
					var categoryId=showType==showTypeMethod.CATEGORY_ZHIXINGKESHI?ul.parent().parent().data("id"):current.data("id");
					if(_id='cyxm'){
						callback(categoryId,null,cyxm);
					}else{
						callback(categoryId,_id,cyxm);
					}
				}else{//非化验
					if(showType==showTypeMethod.ZHIXINGKESHI_CATEGORY){//化验
						var zxksId = selectShowTag.children("select:first").val();
						callback(_id,zxksId,cyxm);
					}else//非化验
						callback(_id,null,cyxm);
				}
				if(_id!=ul.parent().parent().data("id"))showChildSelect($(this));
				//callback(_id);
			}).width(100);
			$("<option />").val(ul.parent().parent().data("id")).appendTo(select);
			$.each(ul.children("li"),function(i,li){
				var _id = $(li).data("id");
				var option = $("<option />").val(_id).text($(li).children("a").text()).appendTo(select);
				if(_id==id)option.attr("selected","selected");
			});		
			return select
		}
		
		/**
		 * 显示子SELECT
		 */
		function showChildSelect(select){
			var isZXKSSelect = select.attr("name")=="zxksSelect";
			var selectId = isZXKSSelect?"menu_tag_li_ks_":"menu_tag_li_";
			id = select.val();
			var li = $("#"+selectId+id);
			var ul = li.children(".menuTag").children("ul");
			if(ul.length){
				getSelectTag(ul,id).insertAfter(select);
				return;
			}
			var result = getJSONData(url,{fatherId:id});
			if(!result.state)return;
			
			if(!result.obj.length){
				var s = getMenuChildZhixingkeshiTag(select);
				if(s!=null)s.insertAfter(select);
			}else{
				var select = $("<select />").width(100).change(function(){
					var next;
					var _id = $(this).val();
					while((next=$(this).next("select")).length){
						next.remove();
					}
					if(_id!=id)showChildSelect($(this));
					callback(_id);
				}).insertAfter(select);
				$("<option />").val(id).appendTo(select);
				$.each(result.obj,function(i,d){
					$("<option />").val(d.id).text(d.category).appendTo(select);
				});
			}
		}
		/**
		 * 获取执行科室DOM
		 */
		function getMenuChildZhixingkeshiTag(ele){
			var id = ele.is("select")?ele.val():ele.data("id");
			var result = getJSONData(url_zhixingkeshi,{categoryId:id});
			if(!result.state || !result.obj.length)return null;
			if(ele.is("select")){
				li = $("li#menu_tag_li_ks_"+id);
			}
			if(ele.is("li")){
				setEleEvent(ele);
			}
			return ele.is("select")? getMenuZhixingkeshiSelectTag(id,result.obj) : getMenuZhixingKeshiTag(id,result.obj);
		}
		
		/**
		 * 生成执行科室SELECT
		 */
		function getMenuZhixingkeshiSelectTag(id,list){
			var select = $("<select />").addClass("selectKeshi").width(100).change(function(){
				return callback(id,$(this).val());
			});
			if(list.length>1)$("<option />").appendTo(select);
			$.each(list,function(i,d){
				$("<option />").val(d.id).text(d.bgs).appendTo(select);
			});
		}
		
		/**
		 * 生成执行科室菜单DOM
		 */
		function getMenuZhixingKeshiTag(id,list){
			var div = $("<div />").css("margin-left",110).addClass("menuTag").addClass("emrMenu").addClass("emrZhixingkeshi");
			div.mouseout(function(){
				$(this).parent().children("a").removeClass("on");
			}).mouseover(function(){
				$(this).parent().children("a").addClass("on");
			});
			 var ul = $("<ul />").appendTo(div);
			$.each(list,function(i,d){
				var li = $("<li />").addClass("emrMenu").attr("id","menu_tag_li_ks_"+d.id).data("id",d.id).appendTo(ul);
				var a = $("<a />").addClass("emrMenu").click(function(){
					return menuSelected($(this).parent(),id,d.id);
	    		}).attr("title",d.bgs).text(d.bgs).appendTo(li);
			});
			return div;
		}
	}
	
	function documentHideEvent(){
//		documentEvent=true;
		$(document).bind("mouseover",function(ele){
			var tag = $(ele.target);
			if(!tag.hasClass("emrMenu")&&!tag.parent().hasClass("emrMenu")){
				$("div.menuTag").hide();
//				$(document).unbind("mouseover");
//				documentEvent=false;
				return;
			}
		});
	}

})(jQuery);
