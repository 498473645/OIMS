var common_language={
	//common.js
	Confirm:121,
	Alert:231,
	Monday:1083,//星期一	
	Tuesday:1084,//星期二
	Wednesday:1085,//星期三
	Thursday:1086,//星期四
	Friday:1087,//星期五
	Saturday:1088,//星期六
	Sunday:1089,//星期天
	MIndex:1090,//一
	TIndex:1091,//二
	WIndex:1092,//三
	TSIdex:1093,//四
	FIndex:1094,//五
	SIndex:1095,//六
	SRIndex:1096,//日
	SubitumJizhen:1097,//急诊
	OutpatientMenZhen:1098,//门诊
	HospitalizedZhuYuan:1099,//住院
	InspectionJianCha:1100,//检查中...,请先中断检查!
	YearRiQi:1101,//年
	MonthRiQi:1102,//月
	ShiRiQi:1103,//时
	FenRiQi:1104,//分
	MiaoRiQi:1105,//秒
	TiJiao_suceess:1106,//提交成功
	ShuRuLanguage:1107,//请输入
	BuNotKong:1108,//不能为空
	EmailGeShiNO:1109,//Email格式错误！
	EmailBianMaGeShiNo:1110,//邮政编码格式错误！
	TeleGeShiNo:1111,//手机号格式错误！
	LianTeleGeShiNo:1112,//联系电话格式错误！
	notNullLanguage:1113,//不能为空
	notLongLanguage:1114,//长度不够
	toLongLanguage:1115,//长度过长
	notEqLongLanguage:1116,//长度不等于
	selectLtOneLanguage:1117,//请选择一条数据
	selectGtOneLanguage:1118,//只能操作一条数据
	failLanguage:1119,//失败
	successLanguage:1120,//成功
	zhishaoSelectDota:1121,//至少选择一条数据！
	DeleteShiBai:1122,//删除失败！
	RiQiTimeChaoTu:1123,//日期不能超过当前时间
	
	
	//jquery.createPageList.js
	quanXuanLanguage:1124,//全选
	fanXuanLanguage:1125,//反选
	QingShuRuNum:1126,//请输入一个数字
	QingShuRuOneDao:1127,//请输入1到
	ZhiJianNum:1128,//之间的数字
	LastYeLanguage:1129,//尾页
	NextYeLanguage:1130,//下页
	ShangYeLanguage:1131,//上页
	ShowYeLanguage:1132,//首页
	DangQianNum:1133,//当前：第
	YeGongLanguage:1134,//页&nbsp;共
	tiaoLanguageFen:1135,//条
	xuanZeLanguage:1136,//选择
	
	
	
	//main.js
	YongHuCaoLanguage:1137,//用户操作
	ShuRuMaoBanLanguage:1138,//输入模版
	WangLuoYiChangLanguage:1139,//网络异常
	
	
	
	//oimsUi.js
	queDingLanguage:1140,//确定
	quXiaoLanguage:1141,//取消
	ZdwcYuanSu:1142//自动完成无选项元素
};
$(function(){
	common_language = setLanguage(common_language);// 初始化公共插件国际化
});