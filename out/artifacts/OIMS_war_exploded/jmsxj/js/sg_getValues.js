//自动读取数据，显示在病历上
function sg_auto_set(){
	set_shili_sg();
	set_yanya_sg();
	setEyeygnew_sg();
	setZkjc();
	setEyejmspjs();
}
/************************************视力****************************************/
function get_shili_sg(){
	var temp = {};
	temp.lysl_r = '';//裸眼视力-右
	temp.lysl_l = '';//裸眼视力-左
	temp.jsl_r = '';//近视力-右
	temp.jsl_l = '';//近视力-左
	var blh = $("#patientInfo").children("span").first().text();
	var jbxx = getJbxx(blh);
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
	return temp;
}
function set_shili_sg(){
	if($("#blbh").text()==''){
		var temp = get_shili_sg();
		$("#lysl_y_r").val(temp.lysl_r);	
		$("#lysl_j_r").val(temp.jsl_r);	
		$("#lysl_y_l").val(temp.lysl_l);	
		$("#lysl_j_l").val(temp.jsl_l);	
	}
}
/************************************眼压****************************************/
function get_yanya_sg(){
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
function set_yanya_sg(){
	var temp = get_yanya_sg();
	$("#yanya_r").val(temp.yanya_r);
	$("#yanya_l").val(temp.yanya_l);
	var qz = getXingmingByGonghao_sg(temp.jcys);
	$("#yanya_qz").text(qz);
}
//工号查姓名
function getXingmingByGonghao_sg(gonghao){
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
//扩瞳验光、小瞳验光
function getEyeygnew_sg(jcxm_id,kt_xt){
	var temp = {};
	var blh = $("#patientInfo").children("span").first().text();
	var jbxx = getJbxx_qg(blh);
	var hz_id = jbxx.id;
	if(hz_id!=null){
		var data = getJSONData("/publish/shiGuang/autoGetEyeygnew.htm",{hz_id:hz_id,jcxm_id:jcxm_id,kt_xt:kt_xt},"POST");
		if(data!=null && data.obj!=null){
			var eyeygnew = data.obj;
			temp.ds_r = eyeygnew.qj_sp2_r;
			temp.dc_r = eyeygnew.zj_sp2_r;
			temp.ax_r = eyeygnew.z_sp2_r;
			temp.vacc_r = eyeygnew.jzsl_sp2_r;
			temp.ds_l = eyeygnew.qj_sp2_l;
			temp.dc_l = eyeygnew.zj_sp2_l;
			temp.ax_l = eyeygnew.z_sp2_l;
			temp.vacc_l = eyeygnew.jzsl_sp2_l;
		}
	}
	return temp;
}
function setEyeygnew_sg(){
	//小瞳验光
	var temp1 = getEyeygnew_sg(1000029,"小瞳验光");
	//if($("#xtyg_ds_r").val()==''){
		$("#xtyg_ds_r").val(temp1.ds_r);	
	//}
	//if($("#xtyg_dc_r").val()==''){
		$("#xtyg_dc_r").val(temp1.dc_r);	
	//}
	//if($("#xtyg_ax_r").val()==''){
		$("#xtyg_ax_r").val(temp1.ax_r);	
	//}
	//if($("#xtyg_vacc_r").val()==''){
		$("#xtyg_vacc_r").val(temp1.vacc_r);
	//}
	//if($("#xtyg_ds_l").val()==''){
		$("#xtyg_ds_l").val(temp1.ds_l);
	//}
	//if($("#xtyg_dc_l").val()==''){
		$("#xtyg_dc_l").val(temp1.dc_l);
	//}
	//if($("#xtyg_ax_l").val()==''){
		$("#xtyg_ax_l").val(temp1.ax_l);
	//}
	//if($("#xtyg_vacc_l").val()==''){
		$("#xtyg_vacc_l").val(temp1.vacc_l);
	//}
	
	//扩瞳验光
	var temp2 = getEyeygnew_sg(1000027,"扩瞳验光");
	//if($("#ktyg_ds_r").val()==''){
		$("#ktyg_ds_r").val(temp2.ds_r);
	//}
	//if($("#ktyg_ds_r").val()==''){
		$("#ktyg_ds_r").val(temp2.ds_r);
	//}
	//if($("#ktyg_ax_r").val()==''){
		$("#ktyg_ax_r").val(temp2.ax_r);
	//}
	//if($("#ktyg_vacc_r").val()==''){
		$("#ktyg_vacc_r").val(temp2.vacc_r);
	//}
	//if($("#ktyg_ds_l").val(temp2.ds_l)==''){
		$("#ktyg_ds_l").val(temp2.ds_l);
	//}
	//if($("#ktyg_dc_l").val()==''){
		$("#ktyg_dc_l").val(temp2.dc_l);
	//}
	//if($("#ktyg_ax_l").val()==''){
		$("#ktyg_ax_l").val(temp2.ax_l);
	//}
	//if($("#ktyg_vacc_l").val()==''){
		$("#ktyg_vacc_l").val(temp2.vacc_l);
	//}
}
function getEyejmspjs(){
	var temp = {};
	var blh = $("#patientInfo").children("span").first().text();
	var jbxx = getJbxx_qg(blh);
	var hz_id = jbxx.id;
	//alert("111---"+hz_id)
	if(hz_id!=null){
		var data = getJSONData("/publish/shiGuang/autoGetEyejmspjs.htm",{hz_id:hz_id},"POST");
		if(data!=null && data.obj!=null){
			var eyejmspjs = data.obj;
			temp.ave_r = eyejmspjs.r_ave;
			temp.cv_r = eyejmspjs.r_cv;
			temp.cd_r = eyejmspjs.r_cd;
			temp.min_r = eyejmspjs.r_min;
			temp.max_r = eyejmspjs.r_max;
			temp.num_r = eyejmspjs.r_num;
			temp.sd_r = eyejmspjs.r_sd;
			temp.aa_r = eyejmspjs.r_aa;
			temp.ave_l = eyejmspjs.l_ave;
			temp.cv_l = eyejmspjs.l_cv;
			temp.cd_l = eyejmspjs.l_cd;
			temp.min_l = eyejmspjs.l_min;
			temp.max_l = eyejmspjs.l_max;
			temp.num_l = eyejmspjs.l_num;
			temp.sd_l = eyejmspjs.l_sd;
			temp.aa_l = eyejmspjs.l_aa;
		}
	}
	return temp;
}
function setEyejmspjs(){
	var temp = getEyejmspjs();
	if(temp!=null){
		//if($("#jmnpxb_cd_r").val()==''){
			$("#jmnpxb_cd_r").val(temp.cd_r==null?'':temp.cd_r);
		//}
		//if($("#jmnpxb_ave_r").val()==''){
			$("#jmnpxb_ave_r").val(temp.ave_r==null?'':temp.ave_r);
		//}
		//if($("#jmnpxb_aa_r").val()==''){
			$("#jmnpxb_aa_r").val(temp.aa_r==null?'':temp.aa_r);
		//}
		//if($("#jmnpxb_cd_l").val()==''){
			$("#jmnpxb_cd_l").val(temp.cd_l==null?'':temp.cd_l);
		//}
		//if($("#jmnpxb_ave_l").val()==''){
			$("#jmnpxb_ave_l").val(temp.ave_l==null?'':temp.ave_l);
		//}
		//if($("#jmnpxb_aa_l").val()==''){
			$("#jmnpxb_aa_l").val(temp.aa_l==null?'':temp.aa_l);
		//}
	}
}
//专科检查
function getZkjc(){
	var jiaomoOD = '';
		var jiaomoODTag = false;
	var jiaomoOS = '';
		var jiaomoOSTag = false;
	var jiemoOD = '';
		var jiemoODTag = false;
	var jiemoOS = '';
		var jiemoOSTag = false;
	var yandiOD = '';
		var yandiODTag = false;
	var yandiOS = '';
		var yandiOSTag = false;
	var qtOD = '';
		var qtODTag = false;
	var qtOS = '';
		var qtOSTag = false;
	var blh = $("#patientInfo").children("span").first().text();
	var jbxx = getJbxx_qg(blh);
	var hz_id = jbxx.id;
	var tag = false;
	if(hz_id!=null){
		var data = getJSONData("/publish/shiGuang/autoFindZkjc1.htm",{hz_id:hz_id},"POST");
		if(data!=null && data.obj!=null){
			tag = true;
			var listZkjc = data.obj;
			$.each(listZkjc,function(i,item){
//					console.log("----------------------------------------------------------------");
//					console.log(item.id+"---"+item.category_id+"---"+item.jilu+"---"+item.category);	
					//角膜
					if(item.category_id==30313){//角膜OD
						var temp = item.jilu;
						if(jiaomoODTag==false && temp!=null && temp.trim()!=''){
							jiaomoOD = temp;
							jiaomoODTag = true;
						}
					}
					if(item.category_id==30314){//角膜OS
						var temp = item.jilu;
						if(jiaomoOSTag==false && temp!=null && temp.trim()!=''){
							jiaomoOS = temp;
							jiaomoOSTag = true;
						}
					}
					//结膜
					if(item.category_id==30309){//结膜OD
						var temp = item.jilu;
						if(jiemoODTag==false && temp!=null && temp.trim()!=''){
							jiemoOD = temp;
							jiemoODTag = true;
						}
					}
					if(item.category_id==30310){//结膜OS
						var temp = item.jilu;
						if(jiemoOSTag==false && temp!=null && temp.trim()!=''){
							jiemoOS = temp;
							jiemoOSTag = true;
						}
					}
					//眼底
					if(item.category_id==30325){//眼底OD
						var temp = item.jilu;
						if(yandiODTag==false && temp!=null && temp.trim()!=''){
							yandiOD = temp;
							yandiODTag = true;
						}
					}
					if(item.category_id==30326){//眼底OS
						var temp = item.jilu;
						if(yandiOSTag==false && temp!=null && temp.trim()!=''){
							yandiOS = temp;
							yandiOSTag = true;
						}
					}
					//其它
					if(item.category_id!=30313 && item.category_id!=30314 && item.category_id!=30309 && item.category_id!=30310 && item.category_id!=30325 && item.category_id!=30326){
						if(item.category_id%2==1){//右眼
							var temp = item.jilu;
							if(temp!=null && temp.trim()!='' && temp.trim()!='未见异常'){
								qtODTag = true;//异常
								qtOD+=item.category+":"+item.jilu+"；";
							}
						}else{//左眼
							var temp = item.jilu;
							if(temp!=null && temp.trim()!='' && temp.trim()!='未见异常'){
								qtOSTag = true;//异常
								qtOS+=item.category+":"+item.jilu+"；";
							}
						}
					}
			});
		}
	}
	var dataObjs = {};
	dataObjs.tag = tag;
	dataObjs.jiaomoOD = jiaomoOD;
		dataObjs.jiaomoODTag = jiaomoODTag;
	dataObjs.jiaomoOS = jiaomoOS;
		dataObjs.jiaomoOSTag = jiaomoOSTag;
	dataObjs.jiemoOD = jiemoOD;
		dataObjs.jiemoODTag = jiemoODTag;
	dataObjs.jiemoOS = jiemoOS;
		dataObjs.jiemoOSTag = jiemoOSTag;
	dataObjs.yandiOD = yandiOD;
		dataObjs.yandiODTag = yandiODTag;
	dataObjs.yandiOS = yandiOS;
		dataObjs.yandiOSTag = yandiOSTag;
	dataObjs.qtOD = qtOD;
	dataObjs.qtOS = qtOS;
	dataObjs.qtODTag = qtODTag;
	dataObjs.qtOSTag = qtOSTag;
	return dataObjs;
}
function setZkjc(){
	var temp = getZkjc();
	var tag = temp.tag;
//	console.log(temp.jiaomoOD+"--"+temp.jiaomoOS+"--"+temp.jiemoOD+"--"+temp.jiemoOS);
//	console.log(temp.yandiOD+"--"+temp.yandiOS+"--"+temp.qtOD+"--"+temp.qtOS);
//	console.log(temp.qtODTag+"--"+temp.qtOSTag);
	if(tag==false){//没有做专科检查
		$("#jiaomo_r").val("");
		$("#jiaomo_l").val("");
		$("#jiemo_r").val("");
		$("#jiemo_l").val("");
		$("#yandi_r").val("");
		$("#yandi_l").val("");
		$("#qt_r").val("");	
		$("#qt_l").val("");	
	}else{
		//if($("#jiaomo_r").val()==''){
			if(temp.jiaomoODTag==true){//异常
				$("#jiaomo_r").val(temp.jiaomoOD);
			}else{//未见异常
				$("#jiaomo_r").val("未见异常");	
			}
		//}
		//if($("#jiaomo_l").val()==''){
			if(temp.jiaomoOSTag==true){//异常
				$("#jiaomo_l").val(temp.jiaomoOS);
			}else{//未见异常
				$("#jiaomo_l").val("未见异常");	
			}
		//}
		//if($("#jiemo_r").val()==''){
			if(temp.jiemoODTag==true){//异常
				$("#jiemo_r").val(temp.jiemoOD);	
			}else{
				$("#jiemo_r").val("未见异常");
			}
		//}
		//if($("#jiemo_l").val()==''){
			if(temp.jiemoOSTag==true){
				$("#jiemo_l").val(temp.jiemoOS);	
			}else{
				$("#jiemo_l").val("未见异常");
			}
				
		//}	
		//if($("#yandi_r").val()==''){
			if(temp.yandiODTag==true){
				$("#yandi_r").val(temp.yandiOD);	
			}else{
				$("#yandi_r").val("未见异常");
			}
				
		//}
		//if($("#yandi_l").val()==''){
			if(temp.yandiOSTag==true){
				$("#yandi_l").val(temp.yandiOS);	
			}else{
				$("#yandi_l").val("未见异常");
			}
		//}
		//if($("#qt_r_hidden").val()==''){
			if(temp.qtODTag==true){//异常
				$("#qt_r").val("异常");
			}else{//未见异常
				$("#qt_r").val("未见异常");	
			}
			$("#qt_r_hidden").val(temp.qtOD);	
		//}
		//if($("#qt_l_hidden").val()==''){
			if(temp.qtOSTag==true){//异常
				$("#qt_l").val("异常");
			}else{//未见异常
				$("#qt_l").val("未见异常");	
			}
			$("#qt_l_hidden").val(temp.qtOS);	
		//}
	}
	
	
}






