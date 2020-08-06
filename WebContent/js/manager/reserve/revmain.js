//====================================首页面,首次加载，包括语言国际化，若页面出现'undefined',则页面没有定义该国际化=======================
//====================================首页面,首次加载，包括语言国际化，若页面出现'数字',则加载顺序有问题,改变language的位置=======================


function loadJsAndCss_Yuyue(){
	loadWelcomePage();
	importJS("/js/oimsUi.js");
	importJS("/js/jquery.easyui.min.js");
	importJS("/js/manager/reserve/revconst.js");
	importJS("/js/manager/reserve/revproj.js");
	importJS("/js/manager/reserve/revinfo.js");
	importJS("/js/manager/reserve/revinfols.js");
	importJS("/js/manager/reserve/revchgdt.js");
	importJS("/js/manager/reserve/revchgbat.js");
	yuyue_lan=setLanguage(yuyue_lan);
	
}
//**************************************************************语言国际化***********************************
var yuyue_lan={
		yuyuejianchaxgcg:1317,//预约检查修改成功
		Sunday:1089,//星期日
		Saturday:1088,//星期六
		biangengshuliangdydqhs:1316,//变更数量大于了当前号数
		YuyueHaoShuBat:334,//预约号数批处量
		DepartName:171,//科室名称
		qishiriqi:1258,//起始日期
		XingQiShu:430,//星 期 数
		Monday:1083,//星期一
		Tuesday:1084,//星期二
		Wednesday:1085,//星期三
		Thursday:1086,//星期四
		Friday:1087,//星期五
		yuyuezhouqi:1259,//预约周期
		MonthRiQi:1102,//月
		jidu:1260,//季度
		bannian:1261,//半年
		year:822,//年
		yuyuexiangmu:1262,//预约项目
		biangengshuliang:1263,//变更数量
		yuyueshijian:1264,//预约时间
		shangwu:1265,//上午
		xiawu:1266,//下午
		AddNo:113,//加号
		CutNo:114,//减号
		Seria:214,//序号
		YuYueSJ:426,//预约日期
		XingQiShu:430,//星期数
		XingQi:427,//星期
		ShangXiaWu:428,//上/下午
		biangengshu:1267,//变更数
		State:364,//状态
		qingshurubiangsl:1268,//请输入变更数量
		yuyuehaoshubgcg:1269,//预约号数变更成功		
		jishu:1270,//基数
		CZR:380,//操作人
		YuyueHaoShuChg:335,//预约号数变更
			MIndex:1090,//一
			TIndex:1091,//二
			WIndex:1092,//三
			TSIdex:1093,//四
			FIndex:1094,//五
			SIndex:1095,//六
			SRIndex:1096,//日
			qingxuanzefuzr:1274,//请选择负责人
			qingxuanzesuosbm:1275,//请选择所属部门
			yuyuexiangmutjcg:1276,//预约项目添加成功
			Add:4,//新增
			yuyuefuzer:1277,//预约负责人
			yuyuemiangmumc:1278,//预约项目名称
			yuyueguanlixm:1279,//预约管理项目
			yuyuexiangmuxgcg:1280,//预约项目修改成功
			qingxuanzeliebjljxcz:1281,//请选择列表记录进行操作
			shifoushanchuxzjcxm:1282,//是否删除选中检查项目
			DeleteShiBai:1122,//删除失败
			qingshurushangwzdyys:1283,//请输入上午最大预约数
			qingshuruxiawzdyys:1284,//请输入下午最大预约数
			InputJcxmMc:357,//请输入检查项目名称
			qingshurujiancwz:1285,//请输入检查位置
			CzSj:378,//操作时间
			dangqianhaoshu:1271,//当前号数
			yiyuyueshu:1272,//已预约数
			yuyuedizhi:1273,//预约地址
			xiawuyuyues:1286,//下午预约数
			shangwuyuyues:1287,//上午预约数
			JianChaWZ:432,//检查位置
			ChargeMan:160,//负责人
			suoshubumen:1288,//所属部门
			tianjia:1289,//添加
			qingshuruyuyxm:1290,//请输入预约项目
			yuyuejianchaxm:1291,//预约检查项目
			BingLiHao:383,//病历号
			XingMing:35,//姓名
			Sex:189,//性别
			RuRev:116,//预约分派
			Birth:195,//出生日期
			Sfzh:201,//身份证
			TeleNum:162,//联系电话
			lianxidizhi:1292,//联系地址
			jianchayanbie:1199,//检查眼别
			LeftEye:418,//左眼
			RightEye:419,//右眼
			DoubleEye:16,//双眼
			yuyue:1293,//预约
			qingxuanzeyuysj:1294,//请选择预约时间
			qingxuanzeyuyrq:1295,//请选择预约日期
			yuyuejianchacg:1296,//预约检查成功
			yuyuejianchasb:1297,//预约检查失败
			Query:6,//查询
			Modify:2,//修改
			Del:5,//删除
			Male:204,//男
			Female:205,//女
			Age:408,//年龄
			Jcxm:14,//检查项目
			jcyq:277,//检查要求
			State:364,//状态
			yiqueren:1298,//已确认
			TeleNum:162,//联系电话
			InputBlhOrXingMing:352,//请输入病历号或姓名
			YanBie:390,//眼别
			Jcxm:14,//检查项目
			yiyuyue:1299,//已预约
			Qsr:735,//请输入
			yuyuejianchaxgsb:1300,//预约检查修改失败
			yuyuejianchasccg:1301,//预约检查删除成功
			yuyuejianchascsb:1302,//预约检查删除失败
			qingshurubinglhhchsk:1303,//请输入病历号回车或刷卡
			keyuyueshu: 1306,//	可预约数	按钮语言
			 zongyuyue:1305,//	总预约	按钮语言
		  keyuyue:1304,//	可预约
		  ren:508,//人
		  qingshurubinglh:1307,//请输入病例号
		  weiqudaohuanzjzxx:1308,//未取到患者就诊信息
		  qingxianxuanzeyyxm:1309,//	请先选择预约项目\
		  binglihaobucz:1310,//兵力好不存在
		  YanBie:390,//眼别
		  YuyueItem:336,//预约信息列表
		  qingxuanzejiljxcz:1311,//请选择记录进行操作	按
		  qingxuanzeyitjljxcz:1312,//请选择一条记录进行操作
		  XiangMuMC:431,//项目名称
		  qingxuanzeyuyjcxm:1313,//请选择预约检查项目
		  shangwuyuyuezds	:1315,//上午预约最大数	按钮语言
		xiawuzuidayys:1314//	下午预约最大数
};
//预约分派表单
function showReserveForm(){
	revinfoinit();
}

//预约检查项目
function showRevProj(){
	revprojinit();
}
//预约号数处理
function showRevChgdt(){
	revchgdtinit();
}
//预约号数批量
function showRevChgbat(){
	revchgbatinit();
}
//已预约
function showHasRevInfo(){
	revinfolsinit();
}

var dateArray;
function cal(txtVal) {
	var tYear = 0;
	var bYear = 0;
	if (!checkdate(txtVal)) {
		return "";
	}
	today = new Date();
	bhday = new Date(eval(dateArray[0]), eval(dateArray[1]), eval(dateArray[2]));
	tYear = today.getFullYear();
	bYear = bhday.getFullYear();
	return (tYear - bYear);
}
function replace(str, oldStr, newStr) {
	var buffer = "";
	var length = oldStr.length;
	var beginIndex = 0;
	if (length > 0) {
		index = str.indexOf(oldStr);
		while (index >= 0) {
			buffer = buffer + str.substring(beginIndex, index);
			buffer = buffer + newStr;
			beginIndex = index + length;
			index = str.indexOf(oldStr, beginIndex);
		}
	}
	buffer = buffer + str.substring(beginIndex);
	return buffer;
}
function checkdate(str) {
	var datestr = str;
	var lthdatestr = datestr.length;
	var tmpy = "";
	var tmpm = "";
	var tmpd = "";
	var status = 0;
	var status1 = 0;
	for (i = 0; i < lthdatestr; i++) {
		if (datestr.charAt(i) == '/') {
			status++;
		}
	}
	if (status > 2 || status == 1) {
		return false;
	}
	for (i = 0; i < lthdatestr; i++) {
		if (datestr.charAt(i) == '-') {
			status1++;
		}
	}
	if (status1 > 2 || status1 == 1) {
		return false;
	}
	status = 0;
	datestr = replace(datestr, "-", "/");
	if (lthdatestr == 0) {
		return false;
	}
	for (i = 0; i < lthdatestr; i++) {
		if (datestr.charAt(i) == '/') {
			status++;
		}
		if (status > 2) {
			return false;
		}
		if ((status == 0) && (datestr.charAt(i) != '/')) {
			tmpy = tmpy + datestr.charAt(i);
		}
		if ((status == 1) && (datestr.charAt(i) != '/')) {
			tmpm = tmpm + datestr.charAt(i);
		}
		if ((status == 2) && (datestr.charAt(i) != '/')){
			tmpd = tmpd + datestr.charAt(i);
		}
	}
	year = new String(tmpy);
	month = new String(tmpm);
	day = new String(tmpd);
	if ((tmpy.length != 4) || (tmpm.length > 2) || (tmpd.length > 2)){
		return false;
	}
	if (!((1 <= month) && (12 >= month) && (31 >=day) && (1 <= day))){
		return false;
	}
	if (!((year % 4) == 0) && (month == 2) && (day == 29)) {
		return false;
	}
	if ((month <= 7) && ((month % 2) == 0) && (day >=31)) {
		return false;
	}
	if ((month >=8) && ((month % 2) == 1) && (day >=31)) {
		return false;
	}
	if ((month == 2) && (day == 30)) {
		return false;
	}
	dateArray = new Array(3);
	dateArray = [year, month, day];
	return true;
}
