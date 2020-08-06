var data_language = {
	RzNr : 403, // 日志内容
	RzJb : 404, // 日志级别
	PuTong : 1005,// 普通
	ZhongDeng : 1006,
	YanZhong : 1007,
	ShengChengSJ : 405,
	Seria : 214, // 序号
	State : 364, // 状态
	zhengchang : 721, // 正常
	yichang : 722, // 异常
	UserName : 360, // 用户名
	GongHao : 361, // 工号
	DianZiEmail : 202, // 电子邮件
	Role : 11, // 角色
	Forbid : 46, // 禁用
	Start : 31, // 启用
	XingMing : 35, // 姓名
	Sex : 189, // 性别
	Male : 204, // 男
	Female : 205, // 女
	Job : 190, // 职务
	TeleNum : 162, // 联系电话
	DepartCode : 170, // 科室编码
	DepartName : 171, // 科室名称
	ChargeMan : 160, // 负责人
	SheBeiMC : 371, // 设备名称
	GuiGeXH : 372, // 规格型号
	HostIP : 373, // 主机/IP地址
	LianJieZT : 375, // 连接状态
	BingLiHao : 383, // 病历号
	Birth : 195, // 出生日期
	Sfzh : 385, // 身份证号
	MobilePhone : 200, // 手机号码
	WorkDW : 387, // 工作单位
	Zcsj : 388, // 注册时间
	SsDq : 389, // 所属地区
	XmBianMa : 365, // 项目编码
	Jcxm : 14, // 检查项目
	JcLeiBei : 369, // 检查类别
	FenLeiMc : 370, // 分类名称
	Jcdh : 392, // 检查单号
	JiuZhenHao : 394, // 就诊号
	BiaoTi : 381, // 标题
	JcYs : 275, // 检查医生
	KdTime : 391, // 开单时间
	JfBs : 1008, // 计费标识 +++++++++++++++++++++新加的
	Yes : 17, // 是
	No : 18, // 否
	YanBie : 390, // 眼别
	RightEye : 419, // 右眼
	LeftEye : 418, // 左眼
	jcyq : 277, // 检查要求
	BaoGaoYs : 398, // 报告医生
	BaoGaoSj : 399, // 报告时间
	ShengHeYs : 400, // 审核医生
	JianChaKj : 401, // 检查可见
	JianChaTs : 402, // 检查提示
	NeiRong : 376, // 内容
	SuoYin : 377, // 索引
	CZR : 380, // 操作人
	CzSj : 378, // 操作时间
	LeiXing : 379, // 类型
	BelongsDepart : 191, // 所属科室
	JiBie : 382, // 级别
	Obtain : 104,// 提取
	WeiTiQu : 1013,// 未提取
	Jcxm : 14, // 检查项目
	Invaild : 72,// 作废
	Name : 188,// 患者姓名
	HzSource : 59,// 患者来源
	AnBingZhong : 1011,// 按病种
	ChangGuiJianCha : 511, // 常规检查
	TeShuJianCha : 512, // 特殊检查
	UserName : 360, // 用户名
	SheBeiDZ : 1009,// 设备地址
	XMFeiLei : 1010,// 项目分类
	XingMing : 35,// 姓名
	YgName : 193,// 员工姓名
	Export : 68,// 导出
	JcdState : 278, // 检查单状态
	DoubleEye : 16,// 双眼
	Jianchasb : 768, // 检查设备
	QiTa : 1012,// 其他
	ShenHeRen : 1022,// 审核人
	BiaoTi : 381, // 标题
	BaoGaoZT : 1021, // 报告状态
	TaoYongMB : 1020,// 套用模板
	ShenHeSJ : 1019,// 审核时间
	ShengChengRen : 1014, // 生成人
	ShuRuFL : 1015,// 输入分类
	MoBanJB : 1016, // 模版级别
	QuanYuan : 1017, // 全院
	KeShi : 1018, // 科室
	UBGS : 444,
	Import : 1039,
	DataImport : 33,
	UserInfo : 1024,
	YgInfo : 187,
	DepartInfo : 168,
	SheBeiInfo : 1025,
	HuanZheInfo : 1026,
	JcXmInfo : 1027,
	jcdSJ : 1028,
	bgInfo : 1029,
	srmbInfo : 1030,
	LogInfo : 1031,
	bgmbInfo : 1032,
	ImportSucc : 139,
	BaoGaoZT : 1023,// 报告状态
	HasWrongData : 1033,
	CheckImportFile : 1034,
	FileIsNotRight : 1035,
	DataRestor : 314,
	DelOK_Alert : 227,// 删除成功!
	Password : 210,
	ServerIsOut : 1036,
	InputUsernamepassword : 1037,
	backupSucc : 1038,
	DataExport : 1040,
	CheckOneItem_Alert : 222,
	IsConfirmDelBakUp : 126,
	Fail : 1041,
	DataRecover : 317,
	DownLoad : 263,
	Recover : 264,
	Del : 5,
	BackupFiles : 406,
	RecoverFail : 1043,
	RecoverOK : 1042,
	InputUsernamepassword : 1037,
	SheBeiState : 1056,
	Import : 1039,
	Processing : 1068,// 正在处理数据，请稍候
	dataColumnWrong : 1069,
	phone : 466,
	importFailed:1079,
	isConfirmExport:1048
};
function loadJsAndCss_Data() {
	loadWelcomePage();
	data_language = setLanguage(data_language);
	importJS("/js/jquery.easyui.min.js");
	importJS("/js/oimsUi.js");
	importJS("/js/manager/data/dataPublicManager.js");
	importCSS("/css/easyui.css");
};
