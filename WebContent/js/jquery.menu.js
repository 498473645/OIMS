/**
 * 菜单生成组件
 * @author Li Yan
 * 调用举例：
 *var menuData = {menuData:[
      {
          title:"测试0",//菜单
          func:test,//响应函数
          ,css:cssName,//菜单图标
          child:[{title:"测试0-1",func:function(){alert("0-1");}}],//子菜单定义
          buttons:[{title:"新增",func:newFunc,css:cssName}]//响应函数可获得的此级菜单下的功能按纽
      }
      }
    ],
    showType:"slow"//菜单显示样式
    };
    $(".nav").menu({menuData:menuObj});
 */
;(function($) {
    $.fn.menu = function(setting) {
        var current = this;
        $(current).text("");
        var showType="fast";
        if(setting.showType!=undefined && setting.showType!=null){
            showType=setting.showType;
        }
        createMenu(setting.menuData,current);
        function removePic(){
        	$("#kaishi").remove();
        }
        setTimeout(removePic,1000);
        function createMenu(data,target,type) {
            var ul = $("<ul />").appendTo(target);            
            $.each(data, function(i,d) {
                var li = $("<li class=menu_"+d.id+"/>").appendTo(ul);
                var a = $("<a style='text-overflow: ellipsis;o-text-overflow: ellipsis;overflow: hidden;white-space: nowrap;width:160px;'></a>").appendTo(li);
                $("<span />").addClass(d.css).appendTo(a);
                $(a).append(d.title).attr("title",d.title);
                if(d.jsFileUrl!=null && d.jsFileUrl.length>3)importJS(d.jsFileUrl);
                var x=null;
                if(d.func!=null){
                    try{
                        x = eval('('+d.func+')');
                    }catch(e){
                        //$.oimsError(e);
                    }
                    
                }
                $(li).click(function(){
                    try{
                        if(x!=null){
                        	if(d.title!='诊断证明书'){
                        		showTitle(d.title);
                        	}
                            typeof(x) == "function" ? x(d.buttons) : $.oimsAlert("no function:"+d.func);
                        }
                    }catch(e){
                        $.oimsError(e);
                    }
                    if($(li).next().is("ul"))$(li).next().toggle(showType);
                  //点击除晶体管理外的菜单,如果晶体管理ul显示则关闭
                    if(d.id!=389&&d.fatherId!=389){
                    	$('li.menu_389').next().hide(showType).children('li.on').removeClass('on');
                    }
                    if(li.hasClass("on"))
                        return;
                //    debugger;
                    closeOpenMenu(li);
                    $(li).addClass("on");
                });
                if(d.child!=undefined && d.child.length>0){
                    createMenu(d.child,ul);
                }
            });
            if(target!=current)$(ul).hide(showType);
        }
        function closeOpenMenu(li){
            if(isMyChildren(li)){
                removeBrother(li);
            }else{
                var x = $("ul li.on");
                $.each(x,function(i,d){
                    if($(d).next().is("ul")){
                        $(d).next().hide(showType); 
                    }
                });
                $(x).removeClass("on");
            }
        }
        
        function removeBrother(li){
            var ul = $(li).parent();
            $.each(ul.children(),function(i,d){
                if($(d).hasClass("on")){
                    $(d).removeClass("on");
                    return true;
                }
            });
        }
        
        function isMyChildren(li){
            var p = $(li).parent();
            if(p.hasClass("on"))return true;
            p = $(li).parent().prev();
            return $(p).is("li") && $(p).hasClass("on");
        }
        
        function showTitle(title){
        	
        	if($("#pgChart").get(0))$("#pgChart").disposeFusionCharts() ; 
        	if($("#flashChart1").get(0))$("#flashChart1").disposeFusionCharts() ; 
        	if($("#flashChart2").get(0))$("#flashChart2").disposeFusionCharts() ; 
        	
            $(".right").text("");
            var t=$("<div />").addClass("title").appendTo(".right");
            var t1=$("<div />").addClass("titleT").text(title).appendTo(t);
            $("<span />").addClass("title1").prependTo(t1);
            $("<div />").addClass("sum").appendTo(t);
            //$("title").text("OIMS-"+title);
            document.title = "OIMS-"+title;
        }
    };
})(jQuery);
