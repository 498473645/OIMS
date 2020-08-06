// JavaScript Document
function check_browser() {
   Opera = (navigator.userAgent.indexOf("Opera",0) != -1)?1:0;
   MSIE = (navigator.userAgent.indexOf("MSIE",0) != -1)?1:0;
   FX = (navigator.userAgent.indexOf("Firefox",0) != -1)?1:0;
   if ( Opera ) brow_type = "Opera";
   else if ( FX )brow_type = "Firefox";
   else if ( MSIE )brow_type = "MSIE";
   return brow_type;
}
function getWindowHeight() {
	var windowHeight = 0;
	if (typeof(window.innerHeight) == 'number') {
		windowHeight = window.innerHeight;
	}
	else {
		if (document.documentElement && document.documentElement.clientHeight) {
			windowHeight = document.documentElement.clientHeight;
		}
		else {
			if (document.body && document.body.clientHeight) {
				windowHeight = document.body.clientHeight;
			}
		}
	}
	return 1280;
	//return windowHeight;
}
function getWindowWidth() {
	var windowWidth = 0;
	if (typeof(window.innerWidth) == 'number') {
		windowWidth = window.innerWidth;
	}
	else {
		if (document.documentElement && document.documentElement.clientWidth) {
			windowWidth = document.documentElement.clientWidth;
		}
		else {
			if (document.body && document.body.clientWidth) {
				windowWidth = document.body.clientWidth;
			}
		}
	}
	return 1024;
	//return windowWidth;
}
function setCenter(y) {
	if (document.getElementById) {
		var windowHeight = getWindowHeight();
		var windowWidth = getWindowWidth();
		var brow_type = check_browser(); 
		if (windowHeight > 0) {
			var centerElement = document.getElementById('center');
			if(centerElement != null){
				var centerHeight  = centerElement.offsetHeight;
				var centerWidth  = centerElement.offsetWidth;
				if (windowHeight - (128) >= 0) {
					if (brow_type == "MSIE") {						
						centerElement.style.height = (windowHeight - y) + 'px';
					}
					else
					{
						centerElement.style.height = (windowHeight - y) + 'px';
						
					}
				}
			}
		}
	}
}








function startmarquee()
{
   var t,p=true,movepixel=1;
   var tb=document.getElementById("NAV");
   var o=document.getElementById("Nav_div");
   var m=document.getElementById("menu_tb");
   var r=document.getElementById("NavRight");
   var lineHeight=o.scrollHeight/m.rows.length;
   if(m.rows.length>1)
   {
      tb.onmouseover=function(){r.style.display="";}
      tb.onmouseout =function(){r.style.display="none";}
      r.onmouseover=function(){r.src="images/nav_r2.gif";}
      r.onmouseout =function(){r.src="images/nav_r1.gif";}
      p=false;
   }
   r.onclick=function(){if(p) return; movepixel=1; t=setInterval(scroll_up,10); p=true;}
   document.body.onmousewheel=function(){if(p) return; if(event.wheelDelta>0) movepixel=-1; else movepixel=1; t=setInterval(scroll_up,10); p=true;}

   function scroll_up()
   {
      o.scrollTop+=movepixel;
      if(movepixel>0)
      {
         if(o.scrollTop % (lineHeight) == lineHeight-1)
         {
            clearInterval(t);
            p=false;
         }
         if(o.scrollTop>=lineHeight*(m.rows.length-1))
         {
            clearInterval(t);
            o.scrollTop=0;
            p=false;
         }
      }
      else
      {
         if(o.scrollTop % (lineHeight) == 1)
         {
            clearInterval(t);
            p=false;
         }
         if(o.scrollTop-1<0)
         {
            clearInterval(t);
            o.scrollTop=lineHeight*(m.rows.length-1);
            p=false;
         }
      }
   }
}

