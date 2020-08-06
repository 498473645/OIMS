
/*图片等比缩放--start*/
var scale={  
        width:null,  
        height:null  
};  

function imageZoom(width,height,outWidth,outHeight)
{  
    width=parseInt(width);  
    height=parseInt(height);  
    outWidth=parseInt(outWidth);  
    outHeight=parseInt(outHeight);  

    var h=width;  
    var w=height;  
    var r=height/width;  
    var rs=outHeight/outWidth;  
    if((width<=outWidth)&&(height<=outHeight)){  
        w=width;  
        h=height;  
    }  
    if((width<=outWidth)&&(height>outHeight)){  
        w=parseInt(outHeight/r);  
        h=outHeight;  
    }  
    if((width>outWidth)&&(height<=outHeight)){  
        w=outWidth;  
        h=parseInt(outWidth*r);  
    }  
    if((width>outWidth)&&(height>outHeight)){  
        if(r<rs){  
            w=outWidth;  
            h=parseInt(outWidth*r);  
        }  
        if(r>rs){  
            h=outHeight;  
            w=parseInt(outHeight/r);  
        }  
        if(r==rs){  
            w=outWidth;  
            h=outHeight;  
        }  
    }  
    scale.width=w;  
    scale.height=h;  
    return scale;  
}

/*图片等比缩放--end*/

//阻止html冒泡事件
function stopBubble(e) 
{
 	var a = e ? e : window.event;
 	
 	if (window.event)  // IE 
 	{ 
 		window.event.cancelBubble=true ; 
 	} 
 	else  // FF
 	{ 
 		a.stopPropagation(); 
 	} 
}


