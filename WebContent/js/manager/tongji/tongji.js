var tongji_Load = false ;//加载统计js标志
function loadJsAndCss_Tongji(){
	loadWelcomePage();
	if(!tongji_Load){
		
		importJS("/FusionCharts/FusionCharts.js") ;
		importJS("/FusionCharts/FusionCharts.jQueryPlugin.js") ;
		importJS("/js/jquery.easyui.min.js") ;
		importJS("/js/oimsUi.js") ;
		importJS("/js/oimsCategory.config.js") ;
		//importCSS("/css/easyui.css") ;
		
		importJS("/js/manager/tongji/tongjiPlugin.js") ;
		importJS("/js/highcharts.js") ;
//		importJS("/js/exporting.js") ;
		
		importJS("/js/manager/tongji/tongjiCommon.js") ;
		tongji_Load = true ;
		
		l_tj =  setLanguage(l_tj);
	}
	
} ;


var l_tj = {
		noDate:494,//无数据
		zhTj:826,//综合统计
		HzSource:59,//患者来源
		SsDq:389,//所属地区
		diagnose:485,//诊断
		zdYs:827,//诊断医生
		YanBie:390,//眼别
		Sex:189,//性别
		feiBie:828,//费别
		yibao:468,//医保
		level1:829,//一级分组
		level2:830,//二级分组
		jcks:824,//检查科室
		Jcxm:14,//检查项目
		State:364,//状态
		Jianchasb:768,//检查设备
		JcdState:278,//检查单状态
		zy_mz:1201,//住院/门诊
		JcYs:275,//检查医生
		JianChaDan:523,//查检单
		ZhenBie:42,//诊别
		NetWork:917,//网络
		DianShi:918,//电视
		Broad:919,//广播 
		DoubleEye:16,//双眼
		DoubleEye:16,//双眼
		ZhuYuan:43,//住院
		MenZhen:44,//门诊
		Male:204,//男
		Female:205,//女
		Yes:17,//是
		No:18,//否
		privatePay:475,//自费
		gongfei:470,//公费
		wJC:1081,//未检查
		YiWanCheng:537,//已完成
		YiGuoHao:534,//已过号
		DaiBuChuan:533,//待补传
		YearRiQi:1101,//年
		MonthRiQi:1102,//月
		zhi:51,//至
		BingLiHao:383,//病历号
		Name:188,//患者姓名
		Jcdh:392,//检查单号
		JiuZhenHao:394,//就诊号
		birthday:464,//生日
		idNum:467,//身份证
		
		
		tj:1202,//统计
		tjmx:1203,//统计明细
		rc:1204,//人次
		ny:1205,//年月
		Time:290,//时间
		creatProc:1206,//生成报表
		pageLook:1207,//页面查看
		startTime:1208,//开始时间
		endTime :1209,//结束时间
		group1:1210,//第一分组
		group2:1211,//第二分组
		tjlx:1212,//统计类型
		groupBy:1213,//分组
		huanzhe:1214,//患者
		huanzheZhenDuan:1215,//患者诊断
		huanzheDiQu:1216,//患者地区
		year:1217,//年份
		month:1218,//月分
		bzzz:1219,//报纸杂志
		jrjs:1220,//经人介绍
		other:1221,//其它
		hzJc:1222,//患者检查
		sigEye:1223,//单眼
		hasYb:1224,//有医保
		noHasYb:1225,//无医保
		illName:1226,//病名
		zdTime:1227,//诊断时间
		HzId:1228,//患者ID
		choose2Group:1229,//请选择第二分组
		checkState:1230,//检查状态 
		hzlytj:1231,//患者来源统计
		hzDqTj:1232,//患者地区统计
		hzLxTj:1233,//患者类型统计
		hzJcTj:1234,//患者检查统计
} ;