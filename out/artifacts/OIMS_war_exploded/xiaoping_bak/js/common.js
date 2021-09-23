
function getNow(){
    var now = new Date();
    var month = now.getMonth()+1+"";
    var day = now.getDate()+"";
    var hour = now.getHours()+"";
    var minute = now.getMinutes()+"";
    var second = now.getSeconds()+"";
    if(month.length==1){
    	month = "0"+month;
    }
    if(day.length==1){
    	day = "0"+day;
    }
    if(hour.length==1){
    	hour = "0"+hour;
    }
    if(minute.length==1){
    	minute = "0"+minute;
    }
    if(second.length==1){
    	second = "0"+second;
    }
    return now.getFullYear()+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
}

function getJSONData(url,data,type){
    var value=null;
    if(type==null){
    	type="GET";
    }else{
    	type="POST";
    }
    $.ajax({
        url:contextPath+url,
        data:data,
        async : false,
        type : type,
        dataType : 'json',
        success : function(data){
            value=data;
        }
    });
    return value;
}


var fileArray=[];
/**
 * 数组中是否存在对像
 * @param o 对像
 * @param a 数组
 * @author 李炎
 */
function objExists(o,a){
	var r=false;
	for(var i=0; i<a.length; i++){
		if(a[i]==o){
			r=true;
			break;
		}
	}
	return r;
}
/**
 * 动态加载JS文件
 * 
 * @param src文件链接
 * @author 李炎
 */
function importJS(src){
	if(objExists(src,fileArray))return;
	fileArray.push(src);
	$("<script src='"+contextPath+src+"'><\/script>").appendTo("head");
}
/**
 * 动态加载CSS文件
 * @param src文件链接
 * @author 李炎
 */
function importCSS(src){
	if(objExists(src,fileArray))return;
	fileArray.push(src);
	var styleTag = document.createElement("link");  
	styleTag.setAttribute('type', 'text/css');  
	styleTag.setAttribute('rel', 'stylesheet');  
	styleTag.setAttribute('href', contextPath+src);  
	$("head")[0].appendChild(styleTag); 
}



/**
 * 清空查询框中的初始化文字信息
 * @param field
 */
function clearInitQuery(field){
	var initText = field.value ;
	if(initText.indexOf("请输入")!=-1){
		$("#"+field.id).val("");
		$("#"+field.id).focus();
	}
} ;
/**
 * @param p:String 
 * @returns :boolean 
 * <p>输入字符是字母返回true</p>
 */
function isChar(p){
	if(p==undefined||p=="") return true ;
	var partten = /^([a-zA-Z])$/;
	   if(partten.test(p)) {   
	       return true;   
	   }   
	   return false;
}




