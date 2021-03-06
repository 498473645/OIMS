var daping_language={
		ShuRuLanguage:1107,//请输入
		nopatientinfo:1151,//患者信息不存在
		Female:205,//女
		Male:204,//男
		No:18,//No
		Yes:17,//是
		Bright:279,//亮度
		DuiBiDu:280,//对比度
		BaoHeDu:281,//饱和度
		JcdBaoGaoIsNotExist:102,//该检查单不存在报告信息
		ShowBaoGao:550,//报告查看
		inBlhOrHzXm:457,//请输入病历号或患者姓名
		Seria:214,//序号
		BingLiHao:383,//病历号
		XingMing:35,//姓名
		Sex:189,//性别
		xuanZeLanguage:1136,//选择
		YongHuCaoLanguage:1137,//用户操作
		ShangYeLanguage:1131,//上页
		ShowYeLanguage:1132,//首页
		LastYeLanguage:1129,//尾页
		NextYeLanguage:1130,//下页
		DangQianNum:1133,//当前：第
		YeGongLanguage:1134,//页&nbsp;共
		tiaoLanguageFen:1135//条
};



/**
 * 获取年龄
 * @param birthday
 * @returns
 */
function getAge(birthday){
	var now = new Date();
	var date = new Date(birthday);
	var _y = now.getUTCFullYear();
	var y = _y-date.getUTCFullYear();
	var _m = now.getMonth();
	var m = _m-date.getMonth();
	var _d = now.getDate();
	var d = _d-date.getDate();
	var age;
	if(m<0||d<0){
		y = y-1;
		if(m<0)m+=12;
		if(d<0)m = m-1;
	}
	if(y>0){
		age = y+"岁";
	}else{
		if(m>0){
			age = m+"月";
		}else{
			age = parseInt(Math.abs(now-date)/1000/60/60/24)+"天";
		}
	}
	return age;
}

function formatDateTime(datetime){
  if(datetime==null || datetime=="")return "-";
	var date = new Date(datetime);
	var mounth=(date.getMonth()+1)+"";
	if(mounth.length==1)mounth="0"+mounth;
	var day=date.getDate()+"";
	if(day.length==1)day="0"+day;
	var h = date.getHours()+"";
	if(h.length==1)h="0"+h;
	var m = date.getMinutes()+"";
	if(m.length==1)m="0"+m;
	var s = date.getSeconds()+"";
	if(s.length==1)s="0"+s;
	var str=date.getUTCFullYear()+"-"+mounth+"-"+day+" "+h+":"+m+":"+s;
	return str;
}

function formatDate(date){
	  if(date==null || date=="")return "-";
		var date = new Date(date);
		var mounth=(date.getMonth()+1)+"";
		if(mounth.length==1)mounth="0"+mounth;
		var day=date.getDate()+"";
		if(day.length==1)day="0"+day;	
		var str=date.getUTCFullYear()+"-"+mounth+"-"+day;
		return str;
};

function formatTime(datetime){
	var date = new Date(datetime);
	var h=date.getHours()+"";
	if(h.length==1)h="0"+h;
	var m=date.getMinutes()+"";
	if(m.length==1)m="0"+m;
	var s = date.getSeconds()+"";
	if(s.length==1)s="0"+s;
	var str=h+":"+m+":"+s;
	return str;
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




