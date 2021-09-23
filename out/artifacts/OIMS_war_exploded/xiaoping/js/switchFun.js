
//$(function(){
//	switchFun("menuleft","menuright");
//	switchFun("menuright","menuleft");
//});

function switchFun(menu,menu1,boleanStr){
    var ulList = $("."+menu +" ul li");
    ulLiControl(ulList);
    $("."+menu +" ul li").click(function(){
        switchTongYi(menu1);
        zIndex = 1000;
        for(var i = 0,length = ulList.length;i<length;i++){
            if(ulList[i] == $(this)[0]){
            }else{
                zIndex = zIndex - 10;
                $(ulList[i]).css({"z-index":zIndex});
                $(ulList[i]).removeClass("visited");
            }
        }
        $(this).addClass("visited");
        $(this).css({"z-index":"9999"});
    });
}
function ulLiControl(ulList){
    var zIndex = 1000;
    for(var i = 0,length = ulList.length;i<length;i++){
		zIndex = zIndex - 10;
		$(ulList[i]).css({"z-index":zIndex});
    }
}
function switchTongYi(divName){
    var ulList = $("."+divName +" ul li");
    for(var i = 0; i < ulList.length;i++){
         $(ulList[i]).removeClass("visited");
    }
}
function exportUl(leftUl,rightUl,exportLi){
    var leftulList = $("."+leftUl +" ul li");
	var rightulList = $("."+rightUl +" ul li");
	ulLiControl(leftulList);ulLiControl(rightulList);switchTongYi(leftUl);switchTongYi(rightUl);
	exportLi.addClass("visited");
	exportLi.css({"z-index":"9999"});
}