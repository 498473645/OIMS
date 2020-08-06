/*
 *设备模块国际化
 */
var sheBei_Lanague = {
	SheBeiMC : 371,// 设备名称
	GuiGeXH : 372,// 规格型号
	BelongsDepart : 191,// 所属科室
	SheBeiWz : 374,// 设备位置
	HostIP : 373,// 主机/IP地址
	Glyh : 715,// 管理用户
	Fwxy : 716,// 访问协议
	Gxmc : 717,// 共享名称
	Fwyh : 718,// 访问用户
	Fwmm : 719,// 访问密码
	Qysbgl : 720,// 启用设备管理
	Forbid : 46,// 禁用
	Jcxm : 14,// 检查项目
	Seria : 214,// 序号
	LianJieZT : 375,// 连接状态
	zhengchang : 721,// 正常
	yichang : 722,// 异常
	State : 364,// 状态
	Start : 31,// 启用
	InsertFail_Alert : 224,// 添加失败!
	InsertOK_Alert : 223,// 添加成功!
	Sbmcbnwk : 723,// 设备名称不能为空
	Ggxhbnwk : 724,// 规格型号不能为空
	Ggxhbnwk : 724,// 规格型号不能为空
	CheckOneItem_Alert : 222,// 请选择一条数据！
	UpdateFail_Alert : 226,// 修改失败!
	UpdateOK_Alert : 225,// 修改成功!
	Sfqdqysxsb : 726,// 是否确定启用所选设备?
	Shqdjysxsb : 727,// 是否确定禁用所选设备?
	Sbqycg : 728,// 设备启用成功
	Sbqysb : 729,// 设备启用失败
	Sbjycg : 730,// 设备禁用成功
	Sbjysb : 731,// 设备禁用失败
	ProhibitSheBei : 332,// 禁用设备列表
	IsConfirmDelSheBei : 111,// 是否确认删除设备信息？
	DelError_Alert : 94,// 删除失败！
	DelOK_Alert : 227,// 删除成功!
	Ipdzbnwk : 725,// IP地址不能为空
	Qingshurusbmc : 1060,// 请输入设备名称
	Qsr : 735,// 请输入
	Xiaopingcaiji : 1062,// 小屏幕采集
	Belongsbgs : 197,// 所属办公室
	isNull : 0
// 最后删除
};
/*
 * 梁建业 设备模块国际化操作
 */
function loadJsAndCss_SheBei(btns) {
	loadWelcomePage();// 加载页面
	importJS("/js/jquery.easyui.min.js");
	importJS("/js/oimsUi.js");
	importCSS("/css/easyui.css");
	importJS("/js/jquery.customfile.js");
}
