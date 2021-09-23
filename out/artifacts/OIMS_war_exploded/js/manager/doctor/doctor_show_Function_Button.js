//****************************************************************************

/*
 * 显示电子病历 和 功能按钮
 * @param sn 就诊序号 
 * @param md 医生 时间 状态（一次就诊记录信息）
 * @param patient 患者信息
 * 宋仁非
 */
function showMedicalRecord(md,sn,patient) 
{
	
	var getSessionGongHaoUrl =  "/publish/doctor/getSessionGongHaoUrl.htm";
	
	//获取当前登录医生的工号
	var gh = getJSONData(getSessionGongHaoUrl, {tag : Math.random()}).obj;
	
	//当前患者就诊状态的患者列表
	/*var pa_objs = null;
	
	if(patient.state==oimsCategory.VISITING_STATE_WAIT){pa_objs=dzhz;}
	else if(patient.state==oimsCategory.VISITING_STATE_AGAIN){pa_objs=fzhz;}
	else if(patient.state==oimsCategory.VISITING_STATE_YIGUOHAO){pa_objs=ghhz;}
	else if(patient.state==oimsCategory.VISITING_STATE_YIWANCHENG){pa_objs=wchz;}*/
	
	
	//如果存在功能按钮则删除
	if($(".whatDoButton").length>0)
	{
		$(".whatDoButton").remove();
	}	
	
	//创建功能按钮显示区域的div
	var v=$("<div />").addClass("btn")
					  .addClass("whatDoButton")
					  .addClass("emr_functionbutton");
		              //.css({"float":"right","text-align":"right","width":"420px"});
	
	//判断是否是从医生工作站菜单中进入的
	if(huanzheguanli_tiaozhuan_flag==0)
	{
		v.appendTo(".right .pt");
	}
	var his_flag_1726 = getJSONData("/publish/getSessionHisFlag.htm", {tag : Math.random()},"POST").obj;
	
	if(his_flag_1726 == "10X")
	{
		
/***************************************下一位*******************************************/
		//check
		var next = $("<a />").addClass("emr_functionbuttona")
							 /*.css({"float":"right","margin-right":0})*/
							 .text(language_doctor.Next)//"下一位"
							 .appendTo(v)
							 .click(function(){
								 
		var patientListTodayUrl = "/publish/doctor/patientListToday.htm";
		//获取当前登录医生名下待诊患者列表
		var ps = getJSONData(patientListTodayUrl, {state:patient.state,searchText:"",tag : Math.random()},"POST").obj;						 
		//console.log(ps);
		if(sn+1>ps.length)
		{
			$.oimsAlert(language_doctor.TheLast+"！",null);//最后一位
			return false;
		}	
		
		//获取下一位患者
		var p = null;
		for(var i = 0 ; i<ps.length; i++)
		{
			if(sn+1 == ps[i].SN)
			{
				p = ps[i];
			}	
		}	
		
		//显示标题（同时清空显示区域）
		showTitle(language_doctor.HuanZheJieZhen);
		
		//显示患者统计信息
		showHuanZheTongJi();
		
		//显示一个患者（门诊界面入口程序）
		showOnePatient(p,sn+1);
								 
									      });
		
		$("<span />").addClass("diagnosis").appendTo(next);  //下一位按钮前边的图标
		
	}

/**************************************过号********************************************/
	//check
	//判断挂号时间是否是当天
	var cznow = shijianduibi_s(md.czdate);
	
	//2013.12.20 yulei 处理空格问题
	
	//如果当前患者状态为待诊、复诊或过号  并且  患者的负责医生为当前登录员工  则显示"过号"、"开单"、"完成"按钮 	
	
	
	if(md.state!=oimsCategory.VISITING_STATE_YIWANCHENG && trim_str_v(md.fzys)==trim_str_v(gh)	&&   cznow){	
		if(his_flag_1726 == "10X"){
			var guohao = $("<a />").addClass("emr_functionbuttona")/*.css({"float":"right","margin-right":0})*/
							   .text(language_doctor.GuoHao)//"过号"
							   .appendTo(v)
							   .click(function(){
								   
								   var options = {"strTitle":language_doctor.ConfirmTiaoGuo+"？"};						
								   
			//确定跳过此患者						   
			$.oimsConfirm(options,yes,no);
		
			function yes()
			{
				var updateJiuZhenStateUrl = "/publish/doctor/updateJiuZhenStateUrl.htm";
				
				var jzid = md.id;
				
				//更新就诊记录的状态为30 （已过号）
				var bl  = getJSONData(updateJiuZhenStateUrl, {jzid:jzid,newstate:oimsCategory.VISITING_STATE_YIGUOHAO,tag : Math.random()}).obj;	
				
				if(bl)
				{
					
					var patientListTodayUrl = "/publish/doctor/patientListToday.htm";
					//获取当前登录医生名下待诊患者列表
					var ps = getJSONData(patientListTodayUrl, {state:patient.state,searchText:"",tag : Math.random()},"POST").obj;
					
					console.log(ps);
					console.log(patient);
					
					var p = null;
					
					if(ps.length==0)  //过号之后该分类下没有患者了
					{
						gotoMenZhenDeskTop();
					}
					else if(sn>ps.length)//如果序号大于现在患者的数量
					{
						
						gotoMenZhenDeskTop();
							
					}
					else if(sn<=ps.length) //如果序号小于现在患者的数量
					{
						p = ps[sn-1];
						//显示标题（同时清空显示区域）
						showTitle(language_doctor.HuanZheJieZhen);
						//显示患者统计信息
						showHuanZheTongJi();
						//显示一个患者
						showOnePatient(p,sn);
					}
					
				}
				else
				{
					//过号失败
					$.oimsError(language_doctor.GuoHaoShiBai+"！",null);
				}	
			}		
			function no()
			{
	
			}
								   				});
		
			$("<span />").addClass("gh").appendTo(guohao);  //按钮前边的图标
		}
/**************************************开单********************************************/
		//check
		var sa = $("<a />").addClass("emr_functionbuttona")/*.css({"float":"right","margin-right":0})*/
						   .text(language_doctor.KaiDan)//"开单"
						   .appendTo(v)
						   .click(function(){
			
			
			//获取开单页面内容
			var kaidan_div = showKaiDanWindow(md);
			
			kaidan_div.appendTo("body");
			
			//显示弹出页面
			$(kaidan_div).oimsDialog({winType:4,
							      icon:"openform",
							     title:language_doctor.KaiDan,//"开单"
							      drag:false,
							    locked:true,
							     width:"750",
							    height:"528"});//width:750
			
		});
		$("<span />").addClass("makelist").prependTo(sa);  //按钮前边的图标
		
/***************************************完成*******************************************/
		//check
		var ok = $("<a />").addClass("emr_functionbuttona")/*.css({"float":"right","margin-right":"0"})*/
		                   .text(language_doctor.Finish)//"完成"
		                   .appendTo(v)
		                   .click(function(){
		    
		    var getZhenDuanInfoUrl = "/publish/doctor/getZhenDuanInfoUrl.htm";           	   
		                	   
		    //获取诊断信息            	   
			var zd = getJSONData(getZhenDuanInfoUrl, {jzid:md.id,tag : Math.random()}).obj;
			
			
			//判断是否已有诊断信息
			if(zd.length<=0)
			{
				   $.oimsAlert(language_doctor.InputZhenDuanInfo+"！");//请填写诊断信息
				   return false;
			}
			
			
			
			$.oimsConfirm({"strTitle":language_doctor.ConfirmJiuZhenZhenDuan+"？"},yes,no);//确认要完成本次就诊诊断
			
			function yes()
			{
				var updateJiuZhenStateUrl = "/publish/doctor/updateJiuZhenStateUrl.htm";
				//更新本次就诊状态为29  （已完成）
				var bl  = getJSONData(updateJiuZhenStateUrl, {jzid:md.id,newstate:oimsCategory.VISITING_STATE_YIWANCHENG,tag : Math.random()}).obj;	
					
				
				if(bl)
				{
										
					//完成该患者本次就诊成功
					$.oimsSucc(language_doctor.FinishedJiuZhen+"！",function(){
						
						var patientListTodayUrl = "/publish/doctor/patientListToday.htm";
						//获取当前登录医生名下待诊患者列表
						var ps = getJSONData(patientListTodayUrl, {state:patient.state,searchText:"",tag : Math.random()},"POST").obj;
						
						var his_flag_1726 = getJSONData("/publish/getSessionHisFlag.htm", {tag : Math.random()},"POST").obj;
						
						if(his_flag_1726 == "10A") //如果是和his做嵌入，则从session中取出患者信息
						{
							var patient_his_id = getJSONData("/publish/getSessionHisPatientId.htm", {tag : Math.random()},"POST").obj;
							var p = null;
							p = getJSONData("/publish/tj_getPatientInfo.htm", {"patient_id":patient_his_id,tag : Math.random()},"POST").obj;
							p.SN = 1;
							//显示标题（同时清空显示区域）
							showTitle(language_doctor.HuanZheJieZhen);
							//显示患者统计信息
							showHuanZheTongJi();
							//显示一个患者
							showOnePatient(p,p.SN);
							return false;
						}	
						
						
						//当前患者就诊状态的患者列表
						var pa_objs = ps;
						
						var p = null;
						
						//如果序号大于现在患者的数量
						if(sn>pa_objs.length)
						{
							//跳转至门诊医生站界面
							gotoMenZhenDeskTop();
						}
						else if(pa_objs.length == 0)
						{
							//跳转至门诊医生站界面
							gotoMenZhenDeskTop();
						}	
						else if(sn<=pa_objs.length)  //如果序号小于现在患者的数量
						{
							p = pa_objs[sn-1];
							
							//显示标题（同时清空显示区域）
							showTitle(language_doctor.HuanZheJieZhen);
							//显示患者统计信息
							showHuanZheTongJi();
							//显示一个患者
							showOnePatient(p,sn);
						}
					});
				}
				else
				{
					$.oimsError(language_doctor.FinishError+"！",null);//完成本次就诊失败
				}	
			}		
			function no()
			{
				//取消完成操作
			}
					
		});
		
		$("<span />").addClass("start").prependTo(ok);
		
/***************************************打印*******************************************/		
		//check
		var print = $("<a />").addClass("emr_functionbuttona")/*.css({"float":"right","margin-right":0})*/
        					  .text("打印")//"病历打印"
        					  .appendTo(v)
        					  .click(function(){
        		
        		var bingliinfo = getJSONData("/publish/doctor/getBingLiInfoUrl.htm", {jzid:md.id,hzid:md.hzid,tag : Math.random()},"post").obj;
        	
        	    var newWindow;
        	 
        		newWindow = window.open("","","status,height=650,width=1024,scrollbars=yes");
        	    
        	    newWindow.focus();
        	    
        	    //性别
        	    var psex = patient.sex==true?"男":"女";
        	    
        	    //年龄
        	    var sr = new Date(patient.birthday.time);
        	    var page = new Date().getFullYear() - sr.getFullYear();
        	    
        	    function getTrimValue(a)
        	    {
        	    	var d = a!=null&&$.trim(a)!=""?$.trim(a):"—";
        	    	
        	    	return d;
        	    }
        	    
        	    
        	    var var_str  = "var menzhenID = '"+getTrimValue(md.id)+"' ;";						//就诊id
        	        var_str += "var binglihao = '"+getTrimValue(md.hzid)+"' ;";					//患者id
        	        var_str += "var name = '"+getTrimValue(patient.name)+"' ;";					//患者姓名
        	        var_str += "var sex = '"+getTrimValue(psex)+"' ;";							//患者性别
        	        var_str += "var jiuzhentime = '"+getTrimValue(md.date)+"' ;";					//就诊时间
        	        var_str += "var age = '"+getTrimValue(page)+"' ;";							//年龄
        	        var_str += "var phone = '"+getTrimValue(patient.mobile)+"' ;";				//电话
        	        var_str += "var address = '"+getTrimValue(patient.jtdz)+"' ;";				//家庭地址
        	        var_str += "var zhushu = '  "+getTrimValue(bingliinfo.zhushu)+"' ;";			//主述
        	        var_str += "var xianbingshi = '  "+getTrimValue(bingliinfo.xianbingshi)+"' ;";//现病史
        	        var_str += "var jiazushi = '"+getTrimValue(bingliinfo.jiazushi)+"' ;";		//家族史
        	        var_str += "var jiwangshi = '"+getTrimValue(bingliinfo.jiwangshi)+"' ;";		//既往史
        	        var_str += "var yanjian = '"+getTrimValue(bingliinfo.yanjian)+"' ;";			//眼睑
        	        var_str += "var jiemo = '"+getTrimValue(bingliinfo.jiemo)+"' ;";				//结膜
        	        var_str += "var gongmo = '"+getTrimValue(bingliinfo.gongmo)+"' ;";			//巩膜
        	        var_str += "var yanwaiji = '"+getTrimValue(bingliinfo.yanwaiji)+"' ;";		//眼外肌
        	        var_str += "var jiaomo = '"+getTrimValue(bingliinfo.jiaomo)+"' ;";			//角膜
        	        var_str += "var qianfang = '"+getTrimValue(bingliinfo.qianfang)+"' ;";		//前房
        	        var_str += "var hongmo = '"+getTrimValue(bingliinfo.hongmo)+"' ;";			//虹膜
        	        var_str += "var tongkong = '"+getTrimValue(bingliinfo.tongkong)+"' ;";		//瞳孔
        	        var_str += "var jingzhuangti = '"+getTrimValue(bingliinfo.jingzhuangti)+"' ;";//晶状体
        	        var_str += "var boliti = '"+getTrimValue(bingliinfo.boliti)+"' ;";			//玻璃体
        	        var_str += "var shipan = '"+getTrimValue(bingliinfo.shipan)+"' ;";			//视盘
        	        var_str += "var huangban = '"+getTrimValue(bingliinfo.huangban)+"' ;";		//黄斑
        	        var_str += "var xueguan = '"+getTrimValue(bingliinfo.xueguan)+"' ;";			//血管
        	        var_str += "var shiwangmo = '"+getTrimValue(bingliinfo.shiwangmo)+"' ;";		//视网膜
        	        var_str += "var chufang = '"+getTrimValue(bingliinfo.chufang)+"' ;";			//处方
        	        var_str += "var zhenduan = '"+getTrimValue(bingliinfo.zhenduan)+"' ;";		//诊断
        	        
        	        
        	    
        	    var newContent  = printBingLiMoBanHead+var_str+printBingLiMoBanAfter;//拼接门诊病历打印页面
        	        
        	    
        	    newWindow.document.write(newContent);
        	    newWindow.document.close();    
        	    

        	
        });
		
		$("<span />").addClass("start").prependTo(print);
		
	}
	
}

//跳转至门诊医生站界面
//check
function gotoMenZhenDeskTop()
{
	//显示标题（同时清空显示区域）
	showTitle(language_doctor.huanzheList);
	//显示今天患者就诊列表
	showPatientListToday();

}


//对比时间
//check
function shijianduibi_s(czdate)
{
	var cz_d = new Date(czdate.time);
	var cz_day=cz_d.getDate();
	var cz_month=cz_d.getMonth() + 1;
	var cz_year=cz_d.getFullYear();
	
	var no_d=new Date();
	var no_day=no_d.getDate();
	var no_month=no_d.getMonth() + 1;
	var no_year=no_d.getFullYear();
	
	if(cz_year==no_year&&cz_month==no_month&&cz_day==no_day)
	{
		return true;
	}
	else
	{
		return false;
	}	
	
	
}



function trim_str_v(str){   
    return str.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '');   
}
