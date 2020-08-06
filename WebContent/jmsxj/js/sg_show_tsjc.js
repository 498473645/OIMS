/**
 * 显示特殊检查结果-IOLMaster
 * @param yb
 */
function show_IOLMaster(yb){
	jcxmId = 1000023;
	newWindowShowYCBG(jcxmId);
}
/**
 * 显示特殊检查结果-角膜内皮细胞
 * @param yb
 */
function show_jmnpxb(yb){
	jcxmId = 1000021;
	newWindowShowYCBG(jcxmId);
}
/**
 * 显示特殊检查结果-角膜厚度
 * @param yb
 */
function show_jmhd(yb){
	jcxmId = 1000047;
	newWindowShowYCBG(jcxmId);
}
/**
 * 显示特殊检查结果-角膜地形图
 * @param yb
 */
function show_jmdxt(yb){
	jcxmId = 1000056;
	newWindowShowYCBG(jcxmId);
}
/**
 * 显示特殊检查结果-前节OCT
 * @param yb
 */
function show_oct(yb){
	jcxmId = 1000007;
	newWindowShowYCBG(jcxmId);
}
/**
 * 显示特殊检查结果-三面镜
 * @param yb
 */
function show_smj(yb){
	jcxmId = 1000024;
	newWindowShowYCBG(jcxmId);
}
function show_yqjzx(yb){
	newWindowShowYCBG(jcxmId);
}
/**
 * 弹出新窗口，显示“已出报告”
 * 文件：/js/manager/baogao/baoGaoIsManagerXiNan.js
 * 方法：Ready_baoGaoIs
 */
function newWindowShowYCBG(jcxmId){
	blh = getBlh();
//	var newWindowUrl = contextPath + "/jmsxj/index.jsp?blh="+blh+"&jcxmId="+jcxmId;
//	window.open(newWindowUrl);
	importJS('/picbrowser/js/lookPhoto.js');
	look(blh);
}
