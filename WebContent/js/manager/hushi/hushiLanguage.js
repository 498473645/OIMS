var hushi_language={
		ShiLiGL           :1049,//视力管理
		LuRu              :1050,//录入    
		Modify            :2   ,//修改    
		LeftEyeLuoShi     :420 ,//左眼裸视
		LeftEyeJiaoZhen   :421 ,//左眼矫正
		LeftEyeJingShi    :422 ,//左眼近视
		RightEyeLuoShi    :423 ,//右眼裸视
		RighEyeJiaoZhen   :424 ,//右眼矫正
		RighEyeJingShi    :425 ,//右眼近视
		JcYs              :275 ,//检查医生
		JCSJ              :1051,//检查时间
		LrSucc            :1052,//录入成功
		LrFail            :1053,//录入失败
		ShiLi             :524 ,//视力    
		JiuZhenXH         :1054,//就诊序号
		YanYaGL        :1055,
		YanYa          :525 ,
		LeftEye        :418 ,
		RightEye       :419 ,
		LuoYanShiLi	:528,
		JiaoZhengShiLi	 :526	,
		JinShiLi	 :527	,
		InsertAllInfo:1058,
		Jcdh:392 ,//检查单号
		sfJC:1080,       //是否检查
		YiJianCha:532,//已检查
		wJC:1081,//未检查
		DaiJianCha:531,  //待检查
		CheckOneItem_Alert:222   //请选择 
};
function loadJsAndCss_HuShi(){
	loadWelcomePage();
	hushi_language = setLanguage(hushi_language);
}