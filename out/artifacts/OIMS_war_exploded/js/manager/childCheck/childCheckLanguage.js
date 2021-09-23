function loadJsAndCss_ChildCheck() {
	//欢迎页面
	loadWelcomePage();
	child_language = setLanguage(child_language);
	importJS("/js/jquery.easyui.min.js");
	importJS("/js/oimsUi.js");
	importCSS("/css/easyui.css");
	importJS("/js/jquery.customfile.js");
	importJS("/js/oims_dengbi.js");
	importJS("/js/manager/childCheck/childImportAndExport.js");
	importJS("/js/manager/childCheck/childCheckManager.js");
	importJS("/js/manager/childCheck/childFzyyManager.js");
	
	importJS("/js/manager/huanzhe/huanzheManager.js");
	loadJsAndCss_Huanzhe();
}; 

var child_language = {
		Modify:2, //修改
		suizhenyuyue:5009, //随诊预约
		bingli:5008,   //病历
		yandizhaoxiang:5007, //眼底照相
		achao:5006, //A超
		pchao:5005, //P超
		Physicalexamination:5004, //体格检查
		inputPatentIdOrName:5003,//输入参数
		YanYa:525,  //眼压
		Query:6,   //查询
		Import : 80,  //导入
		Export: 68 ,//导出
		YanGuang:559 //验光
};