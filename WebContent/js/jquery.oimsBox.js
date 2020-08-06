/**
 * 弹出窗口插件
 * @author Li Yan
 * 用法举例：
 * parentDiv 填的容器的id
 * divContent 添加的内容
 *	$.oimsBox({
 *		parentDiv:"advquery",
 *		divContent : seniorSearchTemplate
 *	});
 */
;(function($) {
	$.oimsBox = function(setting) {
		var divContent = setting.divContent;
		var divID = setting.parentDiv;
		if($(".avdsearch").length==0){
			showWin();
		}else{			
			$(".avdsearch").animate({"height":"0"},"normal",function(){
				$(".avdsearch").remove();
				$(".xuanzhong_oimsDiv")[0].className = "advsearch";
			});
			
		};
		
		function showWin() {
			var win = $("<div />").addClass("avdsearch");
			$(divContent).appendTo(win);
			$("#"+ divID).append(win);
			win.css({"display":"none","margin":"0px 10px 0px 5px"});
			win.slideDown("normal");
			$(".advsearch")[0].className = "xuanzhong_oimsDiv";
			$("#closeId").click(function(){
				$(".avdsearch").animate({"height":"0"},"normal",function(){
					$(".avdsearch").remove();
					$(".xuanzhong_oimsDiv")[0].className = "advsearch";					
				});
			});
		};
		
	};
})(jQuery);
