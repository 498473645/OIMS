/**
 * 用于住院证
 */

/*
 * <p>患者xingming，患者binglihao，患者age，患者job，患者sex，患者id</p>
 * @param xingming
 * @param binglihao
 * @param age
 * @param job
 * @param sex
 * @param id
 */
function initPatient(xingming,binglihao,age,job,sex,id,patType){
	$("#zyz_xingming").html(xingming);
	$("#zyz_xingbie").html(sex);
	$("#zyz_nianling").html(age);
	$("#zyz_patientid").html(binglihao);
	
	$("#patType").html(patType);
}
/*
 * <p>医生姓名</p>
 * @param xingming
 * */
function initDoctor(zyz_ysqz){
	$("#zyz_ysqz").html(zyz_ysqz);
}

function otherParams(zyz_rykb,zyz_qzymd,zyz_qzsf,zyz_yjj,zyz_tsqksm,zyz_lszd,zyz_addr1,zyz_addr2,zyz_wzLevel){
	$("#zyz_rykb").html(zyz_rykb);
	$("#zyz_addr2").html(zyz_addr2);
	$("#zyz_qzymd").html(zyz_qzymd);
	$("#zyz_qzsf").html(zyz_qzsf);
	$("#zyz_yjj").html(zyz_yjj);
	$("#zyz_tsqksm").html(zyz_tsqksm);
	$("#zyz_lszd").html(zyz_lszd);
	$("#zyz_addr1").html(zyz_addr1);
	
	//添加危重等级
	$("#zyz_wzLevel").html(zyz_wzLevel);
}

/*
 * 关闭页面
 * */
function closeSCWindow(){
	this.window.close();
}

//打印
function print_zyz(){
	$('#zyzDiv').printArea();
}

//获取数据 并加载到各项
function loadInformation(jiuzhenID){
	var tmpData = window.opener.zyzloadInformation(jiuzhenID);
	if(tmpData != undefined && tmpData != null){
		initPatient(tmpData.zyz_xingming,tmpData.zyz_patientid,tmpData.zyz_nianling,tmpData.zyz_job,tmpData.zyz_xingbie,tmpData.zyz_OIMSPatientid,tmpData.patType);
		initDoctor(tmpData.zyz_ysqz);
		
		otherParams(tmpData.zyz_rykb,tmpData.zyz_qzymd,tmpData.zyz_qzsf,tmpData.zyz_yjj,tmpData.zyz_tsqksm,tmpData.zyz_lszd,tmpData.zyz_addr1,tmpData.zyz_addr2,tmpData.zyz_wzLevel);
		if(tmpData.zyz_bnzts != ""){
			$("#zyz_bnz").html("再回到"+tmpData.zyz_bnzts+"办理入院前准备，");
		}else{
			$("#zyz_qrsj").html(tmpData.zyz_qrsj+"确认入院时间，再到");
		}
		$("#zyz_zyzlx").html("（"+tmpData.zyz_zyzlx+"）");
	}else{
		$.oimsAlert("数据异常！");
	}
}

function print_zyzLodop(){
	importJS("/js/LodopFuncs.js");
	var strStyleCSS="<link href='"+contextPath+"/emr/style.css?tag="+Math.random()+"' type='text/css' rel='stylesheet'>";
	var strHtml=strStyleCSS+"<body>"+$('#zyzDiv').html()+"</body>"; 
	LODOP = getLodop();  
	LODOP.PRINT_INIT("OIMS住院证打印");
	LODOP.ADD_PRINT_HTM(0,0,"100%","100%",strHtml);
	LODOP.SET_PRINT_PAGESIZE(0,0,0,"A4");
	LODOP.PRINT();	
}