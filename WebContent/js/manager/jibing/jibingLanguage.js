function loadJsAndCss_JiBing() {
	//欢迎页面
	
	loadWelcomePage();
	jibing_language = setLanguage(jibing_language);
	importJS("/js/jquery.easyui.min.js");
	importJS("/js/oimsUi.js");
	importCSS("/css/easyui.css");
	importJS("/js/jquery.customfile.js");
	importJS("/js/oims_dengbi.js");
	
};            

var jibing_language = {
		localDb:483,//本地数据库
		distanceDb:484//远程数据库
};