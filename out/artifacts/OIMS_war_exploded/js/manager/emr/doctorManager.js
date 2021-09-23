/**医生工作站入口*/
(function() {//计算浏览器滚动条的宽度
	var i = document.createElement('p');
	i.style.width = '100%';
	i.style.height = '200px';
	var o = document.createElement('div');
	o.style.position = 'absolute';
	o.style.top = '0px';
	o.style.left = '0px';
	o.style.visibility = 'hidden';
	o.style.width = '200px';
	o.style.height = '150px';
	o.style.overflow = 'hidden';
	o.appendChild(i);
	document.body.appendChild(o);
	var w1 = i.offsetWidth;
	var h1 = i.offsetHeight;
	o.style.overflow = 'scroll';
	var w2 = i.offsetWidth;
	if (w1 == w2)
		w2 = o.clientWidth;
	document.body.removeChild(o);
	window.scrollbarWidth = w1 - w2;
	document.onkeydown=function(e){
			var ev = e || window.event;//获取event对象
		    var obj = ev.target || ev.srcElement;//获取事件源
		    var t = obj.type || obj.getAttribute('type');//获取事件源类型
		    //获取作为判断条件的事件类型
		    var vReadOnly = obj.readOnly;
		    var vDisabled = obj.disabled;
		    //处理undefined值情况
		    vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;
		    vDisabled = (vDisabled == undefined) ? true : vDisabled;
		    //当敲Backspace键时，事件源类型为密码或单行、多行文本的，
		    //并且readOnly属性为true或disabled属性为true的，则退格键失效
		    var flag1= ev.keyCode == 8 && (t=="password" || t=="text" || t=="textarea")&& (vReadOnly==true || vDisabled==true);
		    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
		    var flag2= ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea" ;
		    //判断
		   // if(flag2 || flag1)return false;
	}
})(); 
function loadJsAndCss_YiSheng(){
	loadWelcomePage();
	importJS('/js/manager/emr/doctor.common.js');
	importJS('/js/manager/emr/doctor.variable.js');
	importJS('/js/manager/emr/doctor.selection.js');
//	importJS('/js/manager/emr/pushlet.js');
	importJS('/js/manager/emr/admission/doctor.diagnosis.js');
	importJS('/js/manager/emr/patientList/doctor.patientlist.js');
	if(userData.role==61){
		showMenzhenListToday();
	}else{
		showPatientListToday();
	}
	importJS('/js/manager/emr/admission/doctor.compare.js');
	importJS('/js/manager/emr/jatoolsPrinter.js');
	importCSS("/css/doctorWorkstation.css");
	importCSS("/css/doctor.css");
	importCSS('/js/manager/emr/css/emr.css');
	importCSS('/js/manager/emr/css/selection.css');
}
var currentDoctorGonghao=userData.gonghao;
var fenzhenkaidan=0;//医生看病前护士进行常规检查开的单子
/**患者接诊入口*/
function selectOnePatient(){
	fenzhenkaidan=0;
	/**清空患者信息数据,保证点击‘患者接诊’菜单时，始终从挂号时间最早的患者开始*/
	$('body').removeData('patient');
	/**初始化获取患者的状态，27表示未接诊*/
	$('body').data('visitState',27);
//	_emr_initDiagnosisPage();
	_emr_initPatientListPage();
	
}

/**患者列表入口*/
function showPatientListToday(){
	fenzhenkaidan=0;
	_emr_initPatientListPage();
}
/**门诊检查入口*/
function showMenzhenListToday(){
	fenzhenkaidan=1;
	_emr_initPatientListPage();
}

/**
 * 获取指定名称的html文件内容
 * @param htmlName
 * @returns
 */
function getHtmlContent(htmlName){
	var html;
	$.ajax({
		url:'../js/manager/emr/html/'+htmlName+'.html',
		type:'POST',
		async:false,
		success:function(data){
			html = data;
			
		}
	});
	return html;
}