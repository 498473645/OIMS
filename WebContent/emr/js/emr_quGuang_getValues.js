/********************************************************问诊********************************************************************/
//自动读取数据，显示在病历上
function setAutoValues(){
	//set_wenzhen();//问诊
	set_shili();//视力
	set_yanya();//眼压
	//setBinglihao();//病历编号
	setJzrq();
}
function get_wenzhen_jzId(){
	var ret_jzId = '';
	var categoryIds = [30100,30102,30103,30104,30105];
	var blh = $("#patientInfo").children("span").first().text();
	var jbxx = getJbxx_qg(blh);
	var hz_id = jbxx.id;
	if(hz_id!=0){
		var jiuzhenList = getJSONData(EMR_JIUZHEN_URL+"?id="+hz_id,null).obj;//所有就诊信息
		if(jiuzhenList!=null){
			$.each(jiuzhenList,function(i,item1){
				var jz_id = item1.id;
				//查询就诊记录
				for(var j=0;j<categoryIds.length;j++){
					var data = getJSONData("/publish/jzjl/getJzjlListByCategoryIdAndJiuzhenId.htm",{categoryId:categoryIds[j],jiuzhenId:jz_id,tag:Math.random()},"post");
					if(data!=null){
						var listData = data.obj;
						if(listData!=null){
							$.each(listData,function(i,item){
								if(j==0){
									if(item.jilu!=null && item.jilu!=''){
										ret_jzId = jz_id;
										return false;
									}
								}else if(j==1){
									if(item.jilu!=null && item.jilu!=''){
										ret_jzId = jz_id;
										return false;
									}
								}else if(j==2){
									if(item.jilu!=null && item.jilu!=''){
										ret_jzId = jz_id;
										return false;
									}
								}else if(j==3){
									if(item.jilu!=null && item.jilu!=''){
										ret_jzId = jz_id;
										return false;
									}
								}else if(j==4){
									if(item.jilu!=null && item.jilu!=''){
										ret_jzId = jz_id;
										return false;
									}
								}
							});
						}
					}
					if(ret_jzId!=''){
						break;
					}
				}
				if(ret_jzId!=''){
					return false;
				}
			});
			
			
		}
	}
	return ret_jzId;
}
function get_wenzhen(){
	var temp = {};
	temp.zs = '';
	temp.xbs = '';
	temp.jws = '';
	temp.gms = '药物过敏史：';
	temp.jzs = '家庭近视史：';
	var blh = $("#patientInfo").children("span").first().text();
	var jz_first = getJiuzhen_qg(blh,"first");
	var jz_id = get_wenzhen_jzId();
	var categoryIds = [30100,30102,30103,30104,30105];
	if(jz_id!=null && jz_id!=''){
		for(var j=0;j<categoryIds.length;j++){
			var data = getJSONData("/publish/jzjl/getJzjlListByCategoryIdAndJiuzhenId.htm",{categoryId:categoryIds[j],jiuzhenId:jz_id,tag:Math.random()},"post");
			if(data!=null){
				var listData = data.obj;
				if(listData!=null){
					$.each(listData,function(i,item){
						if(j==0){
							temp.zs += item.jilu+";";
						}else if(j==1){
							temp.xbs +=item.jilu+";";
						}else if(j==2){
							temp.jws +=item.jilu+";";
						}else if(j==3){
							temp.gms +=item.jilu+";";
						}else if(j==4){
							temp.jzs +=item.jilu+";";
						}
					});
				}
			}
		}
	}
//	alert("主述："+temp.zs);
//	alert("现病史："+temp.xbs);
//	alert("既往史："+temp.jws);
//	alert("过敏史："+temp.gms);
//	alert("家族史："+temp.jzs);
	return temp;
}
function set_wenzhen(){
	var wenzhenValues = get_wenzhen();
	if(wenzhenValues.zs!=''){
		$("#qgzs").html(wenzhenValues.zs);	
	}
	if(wenzhenValues.jws!=''){
		$("#qgjws").html(wenzhenValues.jws);	
	}
	if(wenzhenValues.gms!=''){
		$("#ywgms").html(wenzhenValues.gms);	
	}
	if(wenzhenValues.jzs!=''){
		$("#jtjss").html(wenzhenValues.jzs);	
	}
}
/************************************视力****************************************/
function get_shili(){
	var temp = {};
	temp.lysl_r = '';//裸眼视力-右
	temp.lysl_l = '';//裸眼视力-左
	temp.jsl_r = '';//近视力-右
	temp.jsl_l = '';//近视力-左
	var blh = $("#patientInfo").children("span").first().text();
//	var jz_first = getJiuzhen(blh,"first");
//	var jz_id = jz_first.id;
//	var data = getJSONData("/publish/ShiLi/getShiliByJiuzhenId.htm", {
//		jiuzhenId : jz_id,
//		tag : Math.random()
//	});
	var jbxx = getJbxx_qg(blh);
	var hz_id = jbxx.id;
	if(hz_id!=0){
		var data = getJSONData("/publish/ShiLi/getShiliByHzId.htm", {
			hzId : hz_id,
			tag : Math.random()
		});	
		if (data.state) {
			var d = data.obj;
			if(d!=null){
				temp.lysl_r = d.rl;
				temp.lysl_l = d.ll;
				temp.jsl_r = d.rj;
				temp.jsl_l = d.lj;
				temp.jcys = d.jcys;
			}
		}
	}
	
	
//	alert("裸眼视力-右："+temp.lysl_r+";裸眼视力-左："+temp.lysl_l+";近视力-右："+temp.jsl_r+";近视力-左："+temp.jsl_l);
	return temp;
}
function set_shili(){
	var temp = get_shili();
	$("#ysl_r").val(temp.lysl_r);
	$("#jsl_r").val(temp.jsl_r);
	$("#ysl_l").val(temp.lysl_l);
	$("#jsl_l").val(temp.jsl_l);
	var qz = getXingmingByGonghao(temp.jcys);
	$("#sl_qz").text(qz);
}
/************************************眼压****************************************/
function get_yanya(){
	var temp = {};
	temp.yanya_r = '';//眼压-右
	temp.yanya_l = '';//眼压-左
	var blh = $("#patientInfo").children("span").first().text();
//	var jz_first = getJiuzhen(blh,"first");
//	var jz_id = jz_first.id;
//	var data = getJSONData("/publish/yanya/getYanYaByJiuzheId.htm", {
//		jiuzhenId : jz_id,
//		tag : Math.random()
//	},"POST");

	var jbxx = getJbxx_qg(blh);
	var hz_id = jbxx.id;
	if(hz_id!=0){
		var data = getJSONData("/publish/yanya/getYanYaByHzId.htm", {
			hzId : hz_id,
			tag : Math.random()
		},"POST");
		if (data.state) {
			var d = data.obj;
			if(d!=null){
				temp.yanya_r = d.od;
				temp.yanya_l = d.os;
				temp.jcys = d.jcys;
			}
		}
	}
	//alert("眼压-右："+temp.yanya_r+";裸眼视力-左："+temp.yanya_l);
	return temp;
}
function set_yanya(){
	var temp = get_yanya();
	$("#yanya_r").val(temp.yanya_r);
	$("#yanya_l").val(temp.yanya_l);
	var qz = getXingmingByGonghao(temp.jcys);
	$("#yanya_qz").text(qz);
}

function set_qgbl_clyj(){
	var kaiyao = kaiyao_mx()==null?'':kaiyao_mx();
	$("#clyj").val(kaiyao);
}
function set_qgShjl_clyj(){
	var kaiyao = kaiyao_mx()==null?'':kaiyao_mx();
	$("#cl_l").val(kaiyao);
}
function set_zfz_shfc_clyj(){
	var kaiyao = kaiyao_mx()==null?'':kaiyao_mx();
	$("#clyj_r").val(kaiyao);
}
function set_qgblEr_clyj(){
	var kaiyao = kaiyao_mx()==null?'':kaiyao_mx();
	$("#clyj_r").val(kaiyao);
}

//自动生成病历号
function autoCreateBinglihao(id){
	var binglihao = '';
	//var nowTime = new Date();
	//var yy = nowTime.getFullYear();
	var data = getJSONData("/publish/quguang/autoCreateBinglihao.htm?id="+id,{},"POST");//所有就诊信息
	if(data.state==1){
		//binglihao = yy+data.message;
		binglihao = data.message;
	}
	return binglihao;
}
function setBinglihao(){
	var binglihao = autoCreateBinglihao();
	$("#bingliNumber").text(binglihao);
}

//工号查姓名
function getXingmingByGonghao(gonghao){
	var xingming = gonghao;
	if(gonghao!=null && gonghao!=''){
		var data = getJSONData("/publish/yuangong/findYuangongByGh.htm",{gh:gonghao},"POST");
		if(data!=null){
			var yuangong = data.obj;
			xingming = yuangong.xingming;
		}
	}
	return xingming;
}
function setJzrq(){
	var jzrq = dateToStr();
	$("#cli_date").val(jzrq);
	var czrq = dateToStr();
	$("#czrq").val(czrq);
}
/************************************反写病历****************************************/
function auto_fx_zfz_qg(){//准分子
	fx_zs_qg();
	fx_jws();
	fx_zkjc_sl();
	fx_zkjc_yanya();
	fx_zkjc_yd();
	fx_zkjc_jm();
}
function auto_fx_er_qg(){//儿童
	fx_zs_qg();
	fx_jws();
	fx_zkjc_sl();
	fx_zkjc_yanya();
}
//反写就诊记录
function fx_jzjl_qg(categoryid,msg){
	var data = getJSONData("/publish/jzjl/saveMedicalRecord.htm",{categoryId:categoryid,jiuzhenId:currentVisit.id,jilu:msg,picPath:null},"POST");
}
//反写主述
function fx_zs_qg(){
	var categoryid = 30100;
	var msg = "双眼";
	var qgzs = $("#qgzs").html();
	var qgzss = qgzs.split("，");
	if(qgzss!=null){
		msg += qgzss[0];
	}
	msg+="要求屈光手术矫正";
	fx_jzjl_qg(categoryid,msg);
}
//反写即往史
function fx_jws(){
	var categoryid = 30103;
	var msg = $("#qgjws").html();
	fx_jzjl_qg(categoryid,msg);
}
//反写专科检查-眼底
function fx_zkjc_yd(){
	var categoryid_r = 30325;//OD
	var msg_r = $("#ydjc_r").val();
	fx_jzjl_qg(categoryid_r,msg_r);
	
	var categoryid_l = 30326;//OS
	var msg_l = $("#ydjc_l").val();
	fx_jzjl_qg(categoryid_l,msg_l);
}
//反写专科检查-角膜(屈光：前节)
function fx_zkjc_jm(){
	var categoryid_r = 30313;//OD
	var msg_r = $("#qjjc_r").val();
	fx_jzjl_qg(categoryid_r,msg_r);
	
	var categoryid_l = 30314;//OS
	var msg_l = $("#qjjc_l").val();
	fx_jzjl_qg(categoryid_l,msg_l);
}

//反写视力
function fx_zkjc_sl(){
	var temp = {};
	var shili = getShiLiByJiuzhenId_qg();
	if(shili==null){
		temp.id = null;
		temp.lgg = null;
		temp.rgg = null;
		temp.jcd_id=null;
		temp.redtrs=null;
		temp.ledtrs=null;
		temp.ljz=null;
		temp.rjz=null;
	}else{
		temp.id = shili.id;
		temp.lgg = shili.lgg;
		temp.rgg = shili.rgg;
		temp.redtrs=shili.redtrs;
		temp.ledtrs=shili.redtrs;
		temp.jcd_id=shili.jcd_id;
		temp.ljz=shili.ljz;
		temp.rjz=shili.rjz;
	}
	temp.jcsj = new Date();
	temp.jiuzhen_id=currentVisit.id;
	temp.huanzhe_id=getHz_id();
	temp.rl=$("#ysl_r").val();//裸眼视力OD
	temp.ll=$("#ysl_l").val();//裸眼视力OS
	temp.rj=$("#jsl_r").val();//近视力OD
	temp.lj=$("#jsl_l").val();//近视力OS
	temp.jcys=$("#sl_qz_gh").text();
	var data = getJSONData("/publish/ShiLi/saveShili.htm",temp,"POST");
}
function getHz_id(){
	var blh = $("#patientInfo").children("span").first().text();
	var jbxx = getJbxx_qg(blh);
	var hz_id = jbxx.id;
	return hz_id;
}
//就诊id取视力
function getShiLiByJiuzhenId_qg(){
	var data = getJSONData("/publish/ShiLi/getShiliByJiuzhenId.htm",{jiuzhenId:currentVisit.id});
	if(data!=null){
		return data.obj;
	}else{
		return null;
	}
}
//反写眼压
function fx_zkjc_yanya(){
	var temp = {};
	var yanya = getYanyaByJiuzhenId_qg();
	if(yanya==null){
		temp.id = null;
		temp.jcdid=null;
		temp.jcsbid=null;
		temp.beizhu='null,null';
		temp.OS_METHOD=1;
		temp.OD_METHOD=1;
		temp.refuse=0;
	}else{
		temp.id = yanya.id;
		temp.jcdid=yanya.jcd_id;
		temp.jcsbid=yanya.jcsbid;
		temp.beizhu=yanya.beizhu;
		temp.OS_METHOD=yanya.OS_METHOD;
		temp.OD_METHOD=yanya.OD_METHOD;
		temp.refuse=yanya.refuse;
	}
	temp.jcsj = new Date();
	temp.jiuzhenId=currentVisit.id;
	temp.huanzheId=getHz_id();
	temp.OD = $("#yanya_r").val();
	temp.OS = $("#yanya_l").val();
	temp.jcys=$("#yanya_qz_gh").text();
	if(temp.OD==null && temp.OS==null){
		
	}else{
		var data = getJSONData("/publish/yanya/saveYanYa.htm",temp,"POST");	
	}
}
//就诊id取眼压
function getYanyaByJiuzhenId_qg(){
	var data = getJSONData("/publish/yanya/getYanYaByJiuzheId.htm",{jiuzhenId:currentVisit.id},"POST");
	if(data!=null){
		return data.obj;
	}else{
		return null;
	}
}












