var flashWin;
var studyWin;
var flashHost="";
//var contextPath="/OIMSV3";
//flashHost="http://localhost:8080";
window.onbeforeunload = function() {
    closeWindow();
};
function closeWindow(){
    if(flashWin!=null){
        try{
            flashWin.close();
        }catch(e){}
    }
    
    if(studyWin!=null){
        try{
            studyWin.close();
        }catch(e){}
    }
}
function flashView(ryid){
    //var leftX=window.screen.width-3;
    var leftX=0;
    var weizhi="screenX="+leftX+",screenY=0";
    if(navigator.appName.indexOf("Microsoft") != -1){
        weizhi="left="+leftX+",top=0";
    }
    if(flashWin==null){
        flashWin=openWindow(ryid,weizhi);
        flashWin.onunload=function(){flashWin=null;};
    }else{
        try{
        	//flashWin.location.href=flashHost+contextPath+ "/studyViewer/index.jsp?css=blue&hzid="+ryid;
            flashWin.location.href=flashHost+contextPath+ "/publish/jcd/flashShow.htm?hzid="+ryid;
        }catch(e){
            flashWin=openWindow(ryid,weizhi);
        }
    }
    //studyView(ryid);
}

function studyView(ryid){
//var leftX=window.screen.width-3;
var leftX=0;
var weizhi="screenX="+leftX+",screenY=0";
if(navigator.appName.indexOf("Microsoft") != -1){
  weizhi="left="+leftX+",top=0";
}
if(studyWin==null){
  //studyWin= window.open(flashHost+contextPath+"/picbrowser/index.jsp?hzid="+ryid,"flashWin","width="+screen.width+",height="+screen.height+",toolbar=no,scrollbars=yes,menubar=no,"+weizhi+",dependent=yes,resizable=yes");
  studyWin= window.open(flashHost+contextPath+"/picbrowser/index.jsp?hzid="+ryid,"flashWin","channelmode=yes,fullscreen=yes,toolbar=no,scrollbars=yes,menubar=no,"+weizhi+",dependent=yes,resizable=yes");
  studyWin.onunload=function(){studyWin=null;};
}else{
  try{
  	studyWin.location.href=flashHost+contextPath+ "/picbrowser/index.jsp?hzid="+ryid;
      //flashWin.location.href=flashHost+contextPath+ "/publish/jcd/flashShow.htm?hzid="+ryid;
  }catch(e){
  	//studyWin=window.open(flashHost+contextPath+"/picbrowser/index.jsp?hzid="+ryid,"flashWin","width="+screen.width+",height="+screen.height+",toolbar=no,scrollbars=yes,menubar=no,"+weizhi+",dependent=yes,resizable=yes");
	  studyWin= window.open(flashHost+contextPath+"/picbrowser/index.jsp?hzid="+ryid,"flashWin","channelmode=yes,fullscreen=yes,toolbar=no,scrollbars=yes,menubar=no,"+weizhi+",dependent=yes,resizable=yes");
  }
}
}

function openWindow(ryid,weizhi){
	// return window.open(flashHost+contextPath+"/studyViewer/index.jsp?css=blue&hzid="+ryid,"flashWin","width=1380,height=960,toolbar=no,scrollbars=yes,menubar=no,"+weizhi+",dependent=yes,resizable=yes");
   return window.open(flashHost+contextPath+"/publish/jcd/flashShow.htm?hzid="+ryid,"flashWin","width=1440,height=900,toolbar=no,scrollbars=no,menubar=no,"+weizhi+",dependent=yes,resizable=yes");
}