var language = {	
		Modify: 2,// 修改
		Add: 4,// 新增
		Del : 5,// 删除
		Query : 6,// 查询
		Close:34,//关闭
		AdvSearch:236,//高级查询
		See:247,//查看
		Submit : 77,// 提交
		Reset : 85,// 重置
		Confirm : 121,// 确认
		Cancel : 122, // 取消
		Dengji : 153, // 登记	
		Choice:213,//选择
		Seria:214,//序号
		Succ:230,//成功
		Alert:231,//警告
		Error:232,//错误
		CheckOneItem_Alert:222,//请选择一条数据！
		OnlyOpOneData:86,//只能操作一条数据！
		DelOK_Alert:227,//删除成功!
		DelError_Alert:94,//删除失败
		UpdateFail_Alert:226,//修改失败
		UpdateOK_Alert:225,//修改成功
		InsertFail_Alert:224,//添加失败
		InsertOK_Alert:223,//添加成功
		Dayin:769,//打印
		Mobanxinxisx:1066,//模板信息失效
		Baogaoxinxibcsb:1065//报告信息保存失败
};
/*
 * 梁建业
 * 国际化
 */
function setLanguage(parameters){
	if(parameters.yuyanListOnLoad!=undefined) return parameters;
	var data=getJSONData("/publish/findLanaguage.htm",parameters,"POST");
	if(data.state){
		parameters=data.obj;
	}
	return parameters;
}
$(function(){

});