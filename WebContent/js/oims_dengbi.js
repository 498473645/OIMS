//图片等比缩放
/*****************************************/
var dengbisuofang = {
    width:null,  
    height:null,
    OriginImage:null,
	pic_dengbi: function(pic_id,pic_src,imgWidth,imgHeight){
		var imgWidth_width = imgWidth ? imgWidth:100;
		var imgWidth_height = imgHeight ? imgHeight:100;
		var image =$("#" + pic_id); 
		OriginImage=new Image();
		var width = dengbisuofang.GetImageWidth(pic_src);
		var height = dengbisuofang.GetImageHeight(pic_src);
		 function loadImage(){
	            if(width != 0 && height != 0){
	                clearInterval(interval);
	        		dengbisuofang.imageZoom(width,height,imgWidth_width,imgWidth_height);
	        		image.attr("width",dengbisuofang.width).attr("height",dengbisuofang.height);
	        		image.attr("src",pic_src);
	        		if((image[0].parentNode.tagName).toLowerCase() == "div"){
		        		var marginTop = (image[0].parentNode.clientHeight - dengbisuofang.height)/2;
		        		image.css({"margin-top":marginTop});
	        		}
	            }
	    		width = OriginImage.width;
	    		height = OriginImage.height;
	        }
		
		 var interval = setInterval(loadImage,100);
	},
	createImg:function(pic_id,pic_src,imgWidth,imgHeight){
		OriginImage=new Image();
		$(OriginImage).attr("id",pic_id);
		var width = dengbisuofang.GetImageWidth(pic_src);
		var height = dengbisuofang.GetImageHeight(pic_src);
		 function loadImage(){
	            if(width != 0 && height != 0){
	                clearInterval(interval);
	        		dengbisuofang.imageZoom(width,height,imgWidth,imgHeight);
	        		$(OriginImage).attr("width",dengbisuofang.width).attr("height",dengbisuofang.height);
	            }
	    		width = OriginImage.width;
	    		height = OriginImage.height;
	        }
		
		 var interval = setInterval(loadImage,5);
		 return OriginImage;
	},
	//返回图片的宽度
	GetImageWidth:function (oImage){
		  if(OriginImage.src!=oImage)OriginImage.src=oImage;
		  return OriginImage.width;
	},
	//返回图片的高度
	GetImageHeight:function (oImage){
	  if(OriginImage.src!=oImage)OriginImage.src=oImage;
	  return OriginImage.height;
	},
	//等比缩放，返回等比缩放后的高和宽
	imageZoom:function (width,height,outWidth,outHeight)
	{  
	    width=parseInt(width);  
	    height=parseInt(height);  
	    outWidth=parseInt(outWidth);  
	    outHeight=parseInt(outHeight);  

	    var h=width;  
	    var w=height;  
	    var r=width/outWidth;  
	    var rs=height/outHeight;  
	    if((width<=outWidth)&&(height<=outHeight)){  
	        w=width;  
	        h=height;  
	    }  
	    if((width<=outWidth)&&(height>outHeight)){  
	        w=parseInt(outHeight/rs);  
	        h=outHeight;  
	    }  
	    if((width>outWidth)&&(height<=outHeight)){  
	        w=outWidth;  
	        h=parseInt(outWidth*r);  
	    }  
	    if((width>outWidth)&&(height>outHeight)){  
	        if(r<rs){  
	            h=parseInt(height/rs);  
	            w=parseInt(width/rs);
	        }  
	        if(r>rs){  
	            h=parseInt(height/r);  
	            w=parseInt(width/r);  
	        }  
	        if(r==rs){  
	            w=outWidth;  
	            h=outHeight;  
	        }  
	    }  
	    dengbisuofang.width=w;  
	    dengbisuofang.height=h;
	}
};

