// JavaScript Document
document.onselectstart=new Function("event.returnValue=false;");
function changeRow_color(obj) {
var Ptr=document.getElementById(obj).getElementsByTagName("tr");
	
		for (var i=1;i<Ptr.length+1;i++) 
		{ 
		if(i%2>0)
		 { Ptr[i-1].className = "t2";}
		else
		 {Ptr[i-1].className = "t1";}
		}
	for(var i=0;i<Ptr.length;i++) {
		Ptr[i].onmouseover=function(){
		this.tmpClass=this.className;
		this.className = "t3";    
		};
		Ptr[i].onmouseout=function(){
		this.className=this.tmpClass;
		};
	}
}

function getPageMenu(menuName,divName)
{
	activePageMenu = menuName;
	activePageDiv = divName;
}

function PageMenuActive(objName,divName)
{
	document.getElementById(activePageMenu).className = 'tab_hide'; // styles for the unselected Tab
	document.getElementById(activePageDiv).style.display = 'none';
	document.getElementById(objName).className = 'tab_show'; // styles for selected Tabs
	document.getElementById(divName).style.display = '';
	activePageMenu = objName;
	activePageDiv = divName;
}

//$(document).ready(function() {
//    language=setLanguage(language);
//});
//
//function setLanguage(l){
//	if(l.yuyanListOnLoad!=undefined) return l;
//	var x=getJSONData("/publish/findLanaguage.htm",l,"POST");
//	if(x.state){
//		l=x.obj;
//	}
//	return l;
//}