function loadJsAndCss_Danwei() {
	// 欢迎页面
	loadWelcomePage();
	danwei_language = setLanguage(danwei_language);
	importJS("/js/jquery.easyui.min.js");
	importJS("/js/oimsUi.js");
	importCSS("/css/easyui.css");
	importJS("/js/jquery.customfile.js");
	importJS("/js/oims_dengbi.js");
};

var danwei_language = {
	Add : 4,// ++++++++++++++++++++++医院管理+++++++++++++++++++++++++++
	Del : 5,
	Query : 6,
	Seria : 214,
	Submit : 77,// 提交
	Reset : 85,// 重置
	Tpscsb : 714,// 图片上传失败
	DelOK_Alert : 227,// 删除成功!
	DelError_Alert : 94,// 删除失败
	UpdateFail_Alert : 226,// 修改失败
	UpdateOK_Alert : 225,// 修改成功
	Hospital : 155, // 医院名称
	ChargeMan : 160, // 负责人
	DwJb : 156, // 单位级别
	TeleNum : 162, // 联系电话
	Email : 165, // 邮箱
	PostCode : 158, // 邮编
	Adress : 157, // 地址
	Intro : 167, // 简介
	HospitalInfo : 154, // 医院信息
	InsertOK_Alert : 223, // 添加成功
	InsertFail_Alert : 224, // 添加失败
	WithXinHaorequired_Alert : 217, // 带*为必填项
	TeleNumFormatError_Alert : 218, // 电话格式不正确
	MobilePhoneFormatError_Alert : 219, // 手机号码格式不正确
	EmailFormatError_Alert : 220, // 电子邮件格式不对
	PostFormatError_Alert : 221, // 邮编格式不对
	CheckOneItem_Alert : 222,
	Modify : 2,
	Qsr : 735,// 请输入
	DepartInfo : 168,// 科室信息//++++++++++++++++++++科室管理+++++++++++++++++++++++++++++
	InputDepartNameOrChargeMan : 169,// 请输入科室名称或负责人姓名
	IsConfirmDelKeShi : 105,// 是否确认删除该信息
	DepartCode : 170,// 科室编码
	DepartName : 171,// 科室名称
	BelongsDanWei : 175,// 所属单位：
	Belongbgs : 176,// 下属办公室：
	Ywfw : 178,// 业务范围:
	WithoutPerssion_Alert : 237,// 没有相应权限
	IsConfirmDelBgs : 108,// 确认删除该办公室信息//+++++++++++++++++++++办公室管理+++++++++++++++++++++++++++++
	OfficeInfo : 179,// 办公室信息
	OfficeName : 180, // 办公室名称
	Location : 181, // 位置
	LocationMap : 186, // 位置图片
	InputOfficeNameOrLocation : 183, // 请输入办公室名称或位置
	officeLocation : 185, // 办公室位置:
	YgInfo : 187,// 员工信息
	// //++++++++++++++++++++++++++++++++++员工++++++++++++++++++++++++++++++++++++
	XingMing : 35,// 姓名
	Sex : 189,// 性别
	Job : 190,// 职务
	BelongsDepart : 191,// 所属科室
	InputNameOrJob : 192,// 请输入员工姓名或职务
	YgName : 193,// 员工姓名：
	Yggonghao : 194,// 员工工号：
	Birth : 195,// 出生日期：
	Belongsbgs : 197,// 所属办公室：
	Sfzh : 201,// 身&nbsp;份&nbsp;证：
	DianZiEmail : 202,// 电子邮件：
	Male : 204,// 男
	Female : 205,// 女
	Jtdz : 206,// 家庭地址：
	GrJj : 207,// 个人简介：
	AddUserInfo : 1000,// 添加用户信息
	LoginName : 209,// 登&nbsp;录&nbsp;名:
	Password : 210,// 用户密码： eeww
	PasswordAgain : 211,// 重复密码：
	InputNotSame_Alert : 228,// 两次输入不一致
	AdvSearch : 236,// 高级查询
	Role : 11,// 角&nbsp;&nbsp;&nbsp;&nbsp;色：
	UYgSex : 442, // 员工性别
	TpSc : 1001,// 图片上传
	ghIsExistChange : 1002,// 工号已存在，请更换
	LoginNameExist : 1003,
	GongHao : 361,// 工号
	UYgZhiWu : 443,// 员工职务
	UpdateUserInfo : 1004,// 修改用户信息
	IsConfirmDelYg : 82,// 确认删除员工信息
	Close : 34,
	DianHua : 515,// 电话
	ghMustBeNum : 1143
// 工号须为数字
};