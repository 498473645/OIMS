$(function(){

    $(window).resize(function (){
        loadResize();
    });
 });
function timeFun(){
    /*
    *时间工具栏显示效果
    */
    var ulList = $(".timetab ul li");
    ulLiControl(ulList);
    $(".timetab ul li").click(function(){
        zIndex = 900;
        for(var i = 0,length = ulList.length;i<length;i++){
            if(ulList[i] == $(this)[0]){                
            }else{
                zIndex = zIndex - 1;
                $(ulList[i]).css({"z-index":zIndex});
                $(ulList[i])[0].className = "off";
            }
        }
        $(this)[0].className = "on";
        $(this).css({"z-index":"900"});
    });
}
function leftFun(){
    /*
    * 左边工具栏点击效果
    */
    $(".menucontent").css("display","none");
    $($(".menucontent")[0]).css("display","");
    show();
    $(".menuTitle1")[0].className = "menuTitle";
    //添加点击事件
    $(".menuTitle1").live("click",function(){
        show();
        $(".menucontent").css("display","none");
		if($.browser.msie && parseInt($.browser.version)<9){
			if($(this)[0].nextSibling){
					$(this)[0].nextSibling.style.display = "";
					$(this)[0].className = "menuTitle";
			}
		}else{
			if($(this)[0].nextElementSibling){
					$(this)[0].nextElementSibling.style.display = "";
					$(this)[0].className = "menuTitle";
			}
		}
    });
    $(".menuTitle").live("click",function(){
        show();
		if($.browser.msie && parseInt($.browser.version)<9){
			if($(this)[0].nextSibling){
					$(this)[0].nextSibling.style.display = "none";
					$(this)[0].className = "menuTitle1";
			}
		}else{
			if($(this)[0].nextElementSibling){
					$(this)[0].nextElementSibling.style.display = "none";
					$(this)[0].className = "menuTitle1";
			}
		}
    });
    
    function show(){
        var menTitleList = $(".menuTitle");
        for(var i in menTitleList){
            if(i<=menTitleList.length){
                menTitleList[i].className = "menuTitle1";
            }
        }
    }
};

function loadResize(){
    var height = $(window).height() - $(".header")[0].offsetHeight - $(".footerImg")[0].offsetHeight -10;
    $(".leftMenu").css({"height":height+"px"});
    $(".rightCon").css({"height":height+"px"});
}

function ulLiControl(ulList){
	var left = 15,
		zIndex = 900;
	for(var i = 0,length = ulList.length;i<length;i++){
		if(i != 0){
			left = left +94;
			zIndex = zIndex - 1;
			$(ulList[i]).css({"left":left+"px","position":"absolute","z-index":zIndex});
		}else{
			$(ulList[i]).css({"left":left+"px","position":"absolute","z-index":"900"});
		}
	}
}

function comparePic(divBtn,divId){
		var that = $("#" + divId);
		if(that.css("display") == "none"){
			that.slideDown("normal");
			$("."+divBtn).parent().addClass("visited");
			that.attr("style","display:block");
		}else{
			that.slideUp("normal");
			$("."+divBtn).parent().removeClass("visited");
			that.attr("style","display:none");
		}

 }