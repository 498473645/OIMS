/*
 * "<div class='searchfile'>"+
	"<input type='file' name='url_excel_yuyan' id ='url_excel_yuyan' class='filed'/>"+
	"<div class='fieldstyle'><input type='text' name='txt_fieldstyle' id='txt_fieldstyle' class='fieldtext'/></div>"+
	"<div class='buttonstyle'><input type='button'  id='btn_yuyan' class='fieldbutton'/></div>"+
	"</div>"
	调用方式 ：1、当应用于弹出框时  $.customfile('fieldbutton','filed','fieldtext',"openWin");
		   2、 当应用于一般窗口时 $.customfile('fieldbutton','filed','fieldtext');
*/
;(function(){
    /*
    *定义注册事件的方法
    */
    var addListener=function(element,eventName,funName){
        if(window.addEventListener){
            element.addEventListener(eventName,funName,false);
        }else if(window.attachEvent){
            element.attachEvent('on'+eventName,funName);
        }else{ 
            element['on'+eventName]=funName;  
        }  
    };
    
    /**
     *定义注册事件的方法
     *customerBtnClass表示浏览器按钮的标签类名
     *fileInputClass表示隐藏的file文本框类名
     *textInputClass表示显示路径的文本框类名
     *当应用于弹出框情况时，divContentClass表示文本框的类名
	 *	f:	父级元素 的jquery 对象
     */
    $.customfile = function (customerBtnClass,fileInputClass,textInputClass,divContentClass,f){
    	if(f==undefined)
    		f = document ;
    	loadResize();
    	$(window).resize(function(){
    		loadResize();
    	});
    	
        var fileInput=$("." + fileInputClass,f),
        customerBtn=$("." + customerBtnClass,f),
        textInput = $("." + textInputClass,f),
        divContentTop = 0,
        divContentLeft = 0;
        
        if(divContentClass){
        	divContentTop = $("." + divContentClass).offset().top;
            divContentLeft = $("." + divContentClass).offset().left;
        }

        fileInput[0].style.cssText="filter:alpha(opacity=0);opacity:0;"+
        "position:absolute;display:none;cursor:pointer;z-index:10;";
        fileInput[0].size=1;
        var fileInputLeft;
        var jiLuindex = 0;
        //当用户选择文件后，把文件框的value值显示到指定的文本框中
        addListener(fileInput[0],'change',function(){
        	textInput.val(fileInput.val());
        });
        //当鼠标移上自定义按钮时，显示文件框
        addListener(customerBtn[0],'mouseover',function(){
            fileInput[0].style.display='block';
            
        });
        //当鼠标在按钮上移动时，让文件框跟随鼠标移动
        addListener(customerBtn[0],'mousemove',function(event){
        	fileInput[0].style.left = event.clientX - 40  - divContentLeft + "px";
        	fileInput[0].style.top =  event.clientY - 20 - divContentTop + "px";
            fileInput[0].style.width=customerBtn.outerWidth() -20+'px';
            fileInput[0].style.height=customerBtn.outerHeight()+'px';
        });
        //当鼠标离开文件框时，让文件框隐藏
        addListener(fileInput[0],'mouseout',function(){
            fileInput[0].style.display='none';
        });
    };
    /*
     * divContent 表示存放file标签的容器的类名
     * fileInput  表示file标签存放的容器类名
     */
    $.resetFile = function (divContent,fileInput){
    	var fileInput_context = $("." + fileInput),
    		divContent_context = $("." + divContent);
    	var fileHtml = fileInput_context[0].outerHTML;
    	fileInput_context.remove();
    	divContent_context.append(fileHtml);
    };
    
    /*
     * 页面大小改变时，重新计算大小
     * 
     */
    function loadResize(){
    	if($(".searchfile")[0] && $(".buttonstyle")[0]){

	    	var width = $(".searchfile")[0].offsetWidth - $(".buttonstyle")[0].offsetWidth -6;
    		if(width <= 0) width = 150;
	    	$(".fieldstyle").css("width",width+"px"); 
    	}
    }
})(jQuery);