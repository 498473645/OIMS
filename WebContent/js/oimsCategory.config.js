var oimsCategory = {
	MEDICAL_RECORD:30000,// 病历记录分类
	YUANGONG_FENLEI:6000,
	YUANGONG_YISHENG:6001,
	YUANGONG_HUSHI:6002,
	
	ILL_CATEGORY : 40000,// 疾病分类
	VISITING_STATE : 26,// 患者接诊状态
	VISITING_STATE_WAIT : 27,// 待诊状态
	VISITING_STATE_AGAIN : 28,// 复诊
	VISITING_STATE_YIWANCHENG : 29,// 已完成
	VISITING_STATE_YIGUOHAO : 30,// 已过号
	HUANZHE_RESOURCES : 1000,// 患者来源
	BINGZHONG : 11,// 病种
	DOCTOR_MANAGER_ZHENDUAN : 30003, // 诊断分类id
	DOCTOR_MANAGER_CHUFANG : 30006, // 处方
	DOCTOR_NANAGER_EMR_PREVIEW : 30007,
	CHANG_GUI_JIAN_CHA : 8, // 常规检查
	TE_SHU_JIAN_CHA : 9, // 特殊检查
	YAN_KE_JIAN_CHA : 13, //眼科检查
	CHUZHI:30004,//处置

	MOBAN_JIBIE_QUANKE : 101,//全科
	MOBAN_JIBIE_GEREN : 102,//个人
	YANKE_BUMEN_BIANMA : 230320,  //眼科部门编码：西南医院眼科
	
	ZHENBIE_MENZHEN : 2,// 诊别_门诊
	ZHENBIE_ZHUYUAN : 3,// 诊别_住院
	
	JCD_JFBS_WJF : 0,// 未交费
	JCD_JFBS_YJF : 1,// 已交费
	JCD_JFBS_YTF :-1,//已退费
	PRINT_SUCESS :0,
	
	ADD_YUANGONG_POWER : 15, // 新增员工权限
	UPDATE_YUANGONG_POWER : 16, // 修改员工权限
	ADD_USER_POWER : 20,// 新增用户权限
	UPDATE_USER_POWER : 21,// 修改用户权限
	ADD_USER_POWER : 21,// 修改用户权限

	JCD_STATE_DJC : 50,// 待检查
	JCD_STATE_YJC : 51,// 已检查
	JCD_STATE_DBC : 52,// 待补传
	JCD_STATE_YGH : 53,// 已过号
	JCD_STATE_JCZ : 54,// 检查中
	JCD_STATE_DSC : 55,// 等上传
	JCD_STATE_YWC : 56,// 已完成
	JCD_STATE_DSCWLJ : 57,// 待上传未连接
	JCD_STATE_DSCWZDWJ : 58,// 待上传未找到文件
	JCD_STATE_SCZYC : 59,// 上传中连接异常
	JCD_STATE_SCZDS : 60,// 上传中文件丢失
	JCD_STATE_SCZWJCW : 61,// 上传中文件错误
	
	BAOGAO_STATE_TQ:6, //报告提取
	BAOGAO_STATE_CSDR:1007,//初始导入
	JCXMFL_CATEGORY_NAME : 10,// 项目分类管理模块-分类名称
	JCXM_PROJECT_CATEGORY : 7,// 检查项目管理模块-项目类别
	SHURUMOBAN_CATEGORY_NAME : 10001,// 输入模板模块-分类名称
	SHRRUMOBAN_JIBIE : 100,// 输入模板模块-级别
	BAOGAOMOBAN_JIBIE : 100,// 报告模板模块-级别
	SHURUMOBAN_CATEGORY_JIANCHAKEJIAN : 10006,// 输入模板模块-检查可见
	SHURUMOBAN_CATEGORY_JIANCHATISHI : 10007,// 输入模板模块-检查提示
	WENZHENMOBAN_CATEGORY_NAME : 30001,// 问诊模板模块-分类名称
	WENZHENMOBAN_ZHUSHU : 30100,// 问诊模板模块-主诉
	WENZHENMOBAN_XIANBINGSHI : 30102,// 问诊模板模块-现病史
	WENZHENMOBAN_JIWANGSHI : 30103,// 问诊模板模块-即往史
	WENZHENMOBAN_JIAZUSHI : 30104,// 问诊模板模块-家族史
	TIGEMOBAN_CATEGORY_NAME : 30002,// 体格模板模块-分类名称
	TIGEMOBAN_YANJIAN : 30200,// 体格模板模块-眼睑
	TIGEMOBAN_JIEMO : 30201,// 体格模板模块-结膜
	TIGEMOBAN_GONGMO : 30202,// 体格模板模块-巩膜
	TIGEMOBAN_YANWAIJI : 30203,// 体格模板模块-眼外肌
	TIGEMOBAN_JIAOMO : 30204,// 体格模板模块-角膜
	TIGEMOBAN_QIANFANG : 30205,// 体格模板模块-前房
	TIGEMOBAN_HONGMO : 30206,// 体格模板模块-虹膜
	TIGEMOBAN_TONGKONG : 30207,// 体格模板模块-瞳孔
	TIGEMOBAN_JINGZHUANGTI : 30208,// 体格模板模块-晶状体
	TIGEMOBAN_BOLITI : 30209,// 体格模板模块-玻璃体
	TIGEMOBAN_SHIPAN : 30210,// 体格模板模块-视盘
	TIGEMOBAN_HUANGBAN : 30211,// 体格模板模块-黄斑
	TIGEMOBAN_XUEGUAN : 30212,// 体格模板模块-血管
	TIGEMOBAN_SHIWANGMO : 30213,// 体格模板模块-视网膜
	BAOGAO_JCKJ : 10006,// 报告模板-检查可见
	BAOGAO_JCTS : 10007,// 报告模板-提示
	BAOGAO_MOBAN_OCT : 1,// 报告模板-oct使用的模板
	BAOGAO_MOBAN_ZHAOYING : 2,// 报告模板-照影使用的模板
	BAOGAO_ZHAOYING : "海德堡造影",// 报告模板-海德堡造影
	BAOGAO_OCT : "光学成相OCT",// 报告模板-OCT
	CATEGORY_YANBIE : 45, // 眼别
	LEFT_EYE : 46,// 左眼
	RIGHT_EYE : 47,// 右眼
	DOUBLE_EYE : 48,// 双眼
	CI:49,//次
	// =======GuoBaoqiang=========
	JCD_STATE : 49,
	DOCTOR_JOB : 80,// 员工职务fatherId
	JCDOCTOR : '114',// 检查权限的医生
	SHDOCTOR : '124',// 审核权限的医生
	BGDOCTOR : '113',// 报告医生
	YUYAN_LEIBIE : 50000,// 系统语言配置模块-语言类别
	YUYAN_FENLEi : 23,// 系统语言配置模块-语言分类
	YUYAN_LEIBIE : 50000,// 系统语言配置模块-语言类别
	YUYAN_FENLEi : 23,// 系统语言配置模块-语言分类
	JCXM_IMAGE_LEFTPICPATH : "/images/eKarte-2nd-2.jpg",// 检查项目管理模块-左眼图片默认路径
	JCXM_IMAGE_RIGHTPICPATH : "/images/eKarte-2nd-3.jpg",// 检查项目管理模块-右眼图片默认路径
	JCXM_CHANGGUIJIANCHA : 8,// 检查项目管理模块-常规检查
	JCXM_TESHUJIANCHA : 9,// 检查项目管理模块-特殊检查
	
	SELECTLOG_LEVEL : 1,// 查询日志级别
	SAVELOG_LEVEL : 2,// 保存日志级别
	DELETELOG_LEVEL : 3,// 删除日志级别
	UPDATELOG_LEVEL : 4,// 修改日志级别
	
	YUANGONG_XINZENGYONGHUQUANXIAN : 20,// 员工管理模块-新增用户权限=20
	YUANGONG_XIUGAIYONGHUQUANXIAN : 21,// 员工管理模块-修改用户权限=21
	SHEBEI_FANGWENXIEYI : 16,// 设备管理模块-访问协议
	UNIT_LEVEL : 31,// 医院管理模块-单位级别
	OIMS_LOG_STATE_SYSTEMLOG : 1,// 日志管理模板1表示系统日志
	OIMS_LOG_STATE_USERLOG : 0,// 日志管理模板0表示用户日志
	MANAGEITEM_CATEGORY_ID_GUZHANGZICHULI : 201,// 系统配置管理模块-故障自处理配置
	MANAGEITEM_CATEGORY_ID_YONGHUPEIZHI : 202,// 系统配置管理模块-用户配置
	MANAGEITEM_CATEGORY_ID_ZIDONGPAIDUIPEIZHI : 207,// 系统配置管理模块-自动排队配置
	MANAGEITEM_CATEGORY_ID_RIZHIPEIZHI : 204,// 系统配置管理模块-日志配置
	MANAGEITEM_ID_SHUJUKUPEIZHI : 13,// 系统配置管理模块-数据库配置
	MANAGEITEM_ID_YUYANPEIZHI : 11,// 系统配置管理模块-语言配置
	MANAGEITEM_ID_SHUIYINPEIZHI : 10,// 系统配置管理模块-水印配置
	MANAGEITEM_ID_RIZHIPEIZHI : 12,
	ARTICLE_CATEGORY_NOTIFICATION : 8001,
	ARTICLE_CATEGORY_THESIS : 8002,
	// 系统配置管理模块-日志配置 ID配置确定为日志配置
	//手术室护士角色对应数据库id
	ssshs_role:41,
	//住院角色对应数据库id
	zy_role:81
};
var json_jcxm = {
		ydzx : 1000000,// 眼底照相
		ydzx_jfw : 1000876,//眼底照相（九方位）
		ydzx_litizhaoxiang : 1000001,// 眼底照相（立体照相）
		ygzy_lishede:1000002,//眼底荧光造影（立摄得）
		ygzy_yiguangsunan:1000003,//眼底荧光造影（荧光素钠）
		ygzy_yinduoqinglv:1000004,//眼底荧光造影（吲哚青绿）
		shiye:1000005,  //视野检查（进口视野计）
		weishiye:1000006, //偏振激光(GDX)眼底扫描(微视野)
		oct_qianjie:1000007,//oct 前节
		oct_shipan:1000008,//oct 视盘
		oct_huangbangqu : 1000009,//oct 黄斑区
		oct_huangbangqu_shipan : 1000010,//oct黄斑区——视盘
		dsl_fvep:1000011, //电生理 FVEP
		dsl_pvep:1000012, //电生理 PVEP
		dsl_perg:1000013, //电生理 PERG
		dsl_ferg:1000014, //电生理 FERG
		dsl_mf_erg:1000015, //电生理 MF-ERG
		dsl_eog:1000016,  //电生理 眼电图 EOG
		anshiyingjiancha : 1000017,// 暗适应检查项目
		achao : 1000018,// A超
		bchao : 1000019,// B超
		jiaomoqulvji : 1000020,// 角膜曲率计
		jiaomoneipijishu : 1000021,// 角膜内皮计数
		ubm:1000022,//超声生物显微镜(UBM)
		iolmaster:1000023,  //IOL Matster 
		sanmianjing : 1000024,// 三面镜眼底检查
		qianfangjiaojing : 1000025,// 前房角镜
		yanya : 1000026,// 非接触式眼压
		ktYanguang:1000027, //扩瞳验光
		xtYanguang:1000029, //小瞳验光
                xtYanguangLg:1000885,//小瞳验光+老光
		tiaojiefucou : 1000030,//调节辐辏
		fushijiancha:1000031, //复视检查
		sanjishigongneng : 1000052,// 同视机双眼视觉
		xieshiduceding:1000033, //斜视度测定
		mashigan : 1000034,// 马氏杆试验
		teshushili : 1000035,//特殊视力
		sejuejiancha : 1000036,//色觉检查
		liexidengzhaoxiang : 1000037,//眼前段照相
		tuxingshili:1000039,  //图形视力
		dishilizhushiqi : 1000040,//低视力助视器
		jiguangzhiliao : 1000041,//激光治疗
		jgqnmsjs : 1992,//激光前囊膜松解术
		hmzbqcs : 1993,//虹膜周边切除术
		swmdbcjggn : 1994,//视网膜多波长激光光凝
		pdt : 1995,//光动力疗法（PDT）
		ttt : 1996,//经瞳孔温热疗法（TTT）
		jghnmqks : 1998,//激光后囊膜切开术
		khjggmbfxqds : 1999,//氪黄激光巩膜瓣缝线切断术
		adkscmqks : 2000,//安顿孔渗出膜切开术
		tkqscmqks : 2001,//瞳孔区渗出膜切开术
		jgzlqgy : 2002,//激光治疗青光眼（SLT）
		jghmbmxsxgfbs : 2003,//激光虹膜表面新生血管封闭术
		yagjghmcmqks : 2004,//YAG激光虹膜残膜切开术
		jiufangwei : 1000042,// 九方位斜视角
		yanweiyanji : 1000043,//斜视度测定(眼位眼肌)
		yanwaiji : 1000354,//眼外肌功能检查
		ruoshizhiliao : 1000044,//弱视治疗
		yinxiejiancha : 1000045,// 隐斜检查
		sanlengjing : 1000046,//三棱镜
		jiaomohoudu : 1000047,//角膜厚度
		duibimingandu : 1000048,//对比敏感度
		zfygFFA:1000049, //自发荧光FFA
		zfygICGA:1000050, //自发荧光ICGA
		zfyg_jfw : 1000877,//自发荧光（九方位）
		gfs:1000055,    //光反射
		rgjtdsjs:1000053, //人工晶体度数计算
		zhushixingzhi:1000038, //注释性质
		yizhiandian:1000057, //抑制暗点
		weimangjiancha:1000058, //伪盲检查
		leidaochongxi : 1970,
		budengxiang:1000377,
		jiaomodixingtu:1000056,
		qianfangshendu:1000348,
		xtygedtrs:1000418,
		oct_xlcx:1000420,
		jmdxtsirius:1000416,
		jghmzbcxs:1000425,
		retcam:1000376,
		ceshi : -1
		
	};