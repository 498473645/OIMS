/*********************************视光病历*****************************/
function getSgbl(){//页面取值
	var temp = {};
	temp.id = $("#blbh").text() == ''?null:$("#blbh").text();
	temp.djs = $("#djs").val();
	temp.dj_nian = $("#dj_nian").val();
	temp.mnzjd = $("#mnzjd").val();
	//矫正方法
	var jzffs = $("input[name='jzff']");
	var jzff = "";
	$.each(jzffs,function(i,item){
		if($(item).attr("checked")=="checked"){
			jzff+=(i+1)+",";
		}
	});
	temp.jzff = jzff;
	//视力验光检查
	var slygjcs = $("input[name='slygjc']");
	var slygjc = "";
	$.each(slygjcs,function(i,item){
		if($(item).attr("checked")=="checked"){
			slygjc +=(i+1)+",";
		}
	});
	temp.slygjc = slygjc;
	temp.slygjc_pl = $("#slygjc_pl").val();
	
	if($("#zjycpjsj").val()!=''){
		temp.zjycpjsj = new Date($("#zjycpjsj").val());	
	}else{
		temp.zjycpjsj = getDateNull();
	}
	temp.zjycpjds = $("#zjycpjds").val();
	temp.zjycpjds_l = $("#zjycpjds_l").val();
	//验配目的
	var ypmds = $("input[name='ypmd']");
	var ypmd = "";
	$.each(ypmds,function(i,item){
		if($(item).attr("checked")=="checked"){
			ypmd += (i+1)+",";
		}
	});
	temp.ypmd = ypmd;
	temp.jzs = $("#jzs").val();
	temp.gms = $("#gms").val();
	temp.qsbs = $("#qsbs").val();
	
	temp.lysl_y_r = $("#lysl_y_r").val();
	temp.lysl_j_r = $("#lysl_j_r").val();
	temp.lysl_y_l = $("#lysl_y_l").val();
	temp.lysl_j_l = $("#lysl_j_l").val();
	
	temp.ktyg_ds_r = $("#ktyg_ds_r").val();
	temp.ktyg_dc_r = $("#ktyg_dc_r").val();
	temp.ktyg_ax_r = $("#ktyg_ax_r").val();
	temp.ktyg_vacc_r = $("#ktyg_vacc_r").val();
	
	temp.ktyg_ds_l = $("#ktyg_ds_l").val();
	temp.ktyg_dc_l = $("#ktyg_dc_l").val();
	temp.ktyg_ax_l = $("#ktyg_ax_l").val();
	temp.ktyg_vacc_l = $("#ktyg_vacc_l").val();
	
	temp.xtyg_ds_r = $("#xtyg_ds_r").val();
	temp.xtyg_dc_r = $("#xtyg_dc_r").val();
	temp.xtyg_ax_r = $("#xtyg_ax_r").val();
	temp.xtyg_vacc_r = $("#xtyg_vacc_r").val();
	
	temp.xtyg_ds_l = $("#xtyg_ds_l").val();
	temp.xtyg_dc_l = $("#xtyg_dc_l").val();
	temp.xtyg_ax_l = $("#xtyg_ax_l").val();
	temp.xtyg_vacc_l = $("#xtyg_vacc_l").val();
	
	temp.jmdxt_hk_r = $("#jmdxt_hk_r").val();
	temp.jmdxt_a1_r = $("#jmdxt_a1_r").val();
	temp.jmdxt_vk_r = $("#jmdxt_vk_r").val();
	temp.jmdxt_a2_r = $("#jmdxt_a2_r").val();
	temp.jmdxt_jmsg_r = $("#jmdxt_jmsg_r").val();
	temp.jmdxt_e_r = $("#jmdxt_e_r").val();
	temp.jmzj_r = $("#jmzj_r").val();
	
	temp.jmdxt_hk_l = $("#jmdxt_hk_l").val();
	temp.jmdxt_a1_l = $("#jmdxt_a1_l").val();
	temp.jmdxt_vk_l = $("#jmdxt_vk_l").val();
	temp.jmdxt_a2_l = $("#jmdxt_a2_l").val();
	temp.jmdxt_jmsg_l = $("#jmdxt_jmsg_l").val();
	temp.jmdxt_e_l = $("#jmdxt_e_l").val();
	temp.jmzj_l = $("#jmzj_l").val();

	temp.yanya_r = $("#yanya_r").val();
	temp.yanya_l = $("#yanya_l").val();
	temp.jiaomo_r = $("#jiaomo_r").val();
	temp.jiaomo_l = $("#jiaomo_l").val();
	temp.jiemo_r = $("#jiemo_r").val();
	temp.jiemo_l = $("#jiemo_l").val();
	temp.yandi_r = $("#yandi_r").val();
	temp.yandi_l = $("#yandi_l").val();
	temp.qt_r = $("#qt_r").val();
	temp.qt_l = $("#qt_l").val();
	//眼睑-右
	var yj_rs = $("input[name='yj_r']");
	var yj_r = "";
	$.each(yj_rs,function(i,item){
		if($(item).attr("checked")=="checked"){
			yj_r+= (i+1)+",";
		}
	});
	temp.yj_r = yj_r;
	//眼睑-左
	var yj_ls = $("input[name='yj_l']");
	var yj_l = "";
	$.each(yj_ls,function(i,item){
		if($(item).attr("checked")=="checked"){
			yj_l+= (i+1)+",";
		}
	});
	temp.yj_l = yj_l;
	temp.tkzj_m_r = $("#tkzj_m_r").val();
	temp.tkzj_a_r = $("#tkzj_a_r").val();
	temp.tkzj_m_l = $("#tkzj_m_l").val();
	temp.tkzj_a_l = $("#tkzj_a_l").val();
	
	temp.zxjmhd_r = $("#zxjmhd_r").val();
	temp.zxjmhd_l = $("#zxjmhd_l").val();
	temp.BUT_r = $("#BUT_r").val();
	temp.BUT_l = $("#BUT_l").val();
	temp.jmnpxb_cd_r = $("#jmnpxb_cd_r").val();
	temp.jmnpxb_ave_r = $("#jmnpxb_ave_r").val();
	temp.jmnpxb_6a_r = $("#jmnpxb_6a_r").val();
	temp.jmnpxb_cd_l = $("#jmnpxb_cd_l").val();
	temp.jmnpxb_ave_l = $("#jmnpxb_ave_l").val();
	temp.jmnpxb_6a_l = $("#jmnpxb_6a_l").val();
	
	temp.yzcd_r = $("#yzcd_r").val();
	temp.qfsd_r = $("#qfsd_r").val();
	temp.jtsd_r = $("#jtsd_r").val();
	temp.yzcd_l = $("#yzcd_l").val();
	temp.qfsd_l = $("#qfsd_l").val();
	temp.jtsd_l = $("#jtsd_l").val();
	temp.wszk = $("#wszk").val();
	temp.ycxpg_r = $("#ycxpg_r").val();
	//temp.ycxpg_l = $("#ycxpg_l").val();
	temp.jy = $("#jy").val();
	
	temp.ys = $("#ys_sg").val();
	temp.yps = $("#yps_sg").val();
	temp.ygs = $("#ygs_sg").val();
	if($("#rq").val()!=''){
		temp.czrq = new Date($("#rq").val());
	}else{
		temp.czrq = getNewDate();	
	}
	temp.blh = getBlh();
	temp.state=1;
	temp.slxj = $("#slxj").val();
	return temp;
}
function setSgbl(data){//页面赋值
	if(data!=null){
		$("#blbh").val(data.id);
		$("#djs").val(data.djs);
		$("#dj_nian").val(data.dj_nian);
		$("#mnzjd").val(data.mnzjd);
		//矫正方法
		if(data.jzff!=null){
			for(var i=1;i<=6;i++){
				if(data.jzff.indexOf(i)>-1){
					$("#jzff"+i).attr("checked","checked");
				}
			}
		}
		//视力验光检查
		if(data.slygjc!=null){
			for(var i=1;i<=2;i++){
				if(data.slygjc.indexOf(i)>-1){
					$("#slygjc"+i).attr("checked","checked");
				}
			}
		}
		//视力验光检查频率
		$("#slygjc_pl").val(data.slygjc_pl);
		$("#zjycpjsj").val(formatDateDIY(data.zjycpjsj,"-"));
		$("#zjycpjds").val(data.zjycpjds);
		$("#zjycpjds_l").val(data.zjycpjds_l);
		//验配目的
		if(data.ypmd!=null){
			for(var i=1;i<=3;i++){
				if(data.ypmd.indexOf(i)>-1){
					$("#ypmd"+i).attr("checked","checked");
				}
			}
		}
		$("#jzs").val(data.jzs);
		$("#gms").val(data.gms);
		$("#qsbs").val(data.qsbs);
		
		$("#lysl_y_r").val(data.lysl_y_r);
		$("#lysl_j_r").val(data.lysl_j_r);
		$("#lysl_y_l").val(data.lysl_y_l);
		$("#lysl_j_l").val(data.lysl_j_l);
		
		$("#ktyg_ds_r").val(data.ktyg_ds_r);
		$("#ktyg_dc_r").val(data.ktyg_dc_r);
		$("#ktyg_ax_r").val(data.ktyg_ax_r);
		$("#ktyg_vacc_r").val(data.ktyg_vacc_r);
		
		$("#ktyg_ds_l").val(data.ktyg_ds_l);
		$("#ktyg_dc_l").val(data.ktyg_dc_l);
		$("#ktyg_ax_l").val(data.ktyg_ax_l);
		$("#ktyg_vacc_l").val(data.ktyg_vacc_l);
		
		$("#xtyg_ds_r").val(data.xtyg_ds_r);
		$("#xtyg_dc_r").val(data.xtyg_dc_r);
		$("#xtyg_ax_r").val(data.xtyg_ax_r);
		$("#xtyg_vacc_r").val(data.xtyg_vacc_r);
		
		$("#xtyg_ds_l").val(data.xtyg_ds_l);
		$("#xtyg_dc_l").val(data.xtyg_dc_l);
		$("#xtyg_ax_l").val(data.xtyg_ax_l);
		$("#xtyg_vacc_l").val(data.xtyg_vacc_l);
		
		$("#jmdxt_hk_r").val(data.jmdxt_hk_r);
		$("#jmdxt_a1_r").val(data.jmdxt_a1_r);
		$("#jmdxt_vk_r").val(data.jmdxt_vk_r);
		$("#jmdxt_a2_r").val(data.jmdxt_a2_r);
		$("#jmdxt_jmsg_r").val(data.jmdxt_jmsg_r);
		$("#jmdxt_e_r").val(data.jmdxt_e_r);
		$("#jmzj_r").val(data.jmzj_r);
		
		$("#jmdxt_hk_l").val(data.jmdxt_hk_l);
		$("#jmdxt_a1_l").val(data.jmdxt_a1_l);
		$("#jmdxt_vk_l").val(data.jmdxt_vk_l);
		$("#jmdxt_a2_l").val(data.jmdxt_a2_l);
		$("#jmdxt_jmsg_l").val(data.jmdxt_jmsg_l);
		$("#jmdxt_e_l").val(data.jmdxt_e_l);
		$("#jmzj_l").val(data.jmzj_l);
		
		$("#yanya_r").val(data.yanya_r);
		$("#yanya_l").val(data.yanya_l);
		$("#jiaomo_r").val(data.jiaomo_r);
		$("#jiaomo_l").val(data.jiaomo_l);
		$("#jiemo_r").val(data.jiemo_r);
		$("#jiemo_l").val(data.jiemo_l);
		$("#yandi_r").val(data.yandi_r);
		$("#yandi_l").val(data.yandi_l);
		$("#qt_r").val(data.qt_r);
		$("#qt_l").val(data.qt_l);
		$("#qt_r_hidden").val(data.qt_r);
		$("#qt_l_hidden").val(data.qt_l);
		//眼睑-右
		if(data.yj_r!=null){
			for(var i=1;i<=3;i++){
				if(data.yj_r.indexOf(i)>-1){
					$("#yj_r"+i).attr("checked","checked");
				}
			}
		}
		//眼睑-左
		if(data.yj_l!=null){
			for(var i=1;i<=3;i++){
				if(data.yj_l.indexOf(i)>-1){
					$("#yj_l"+i).attr("checked","checked");
				}
			}
		}
		$("#tkzj_m_r").val(data.tkzj_m_r);
		$("#tkzj_a_r").val(data.tkzj_a_r);
		$("#tkzj_m_l").val(data.tkzj_m_l);
		$("#tkzj_a_l").val(data.tkzj_a_l);
		
		$("#zxjmhd_r").val(data.zxjmhd_r);
		$("#zxjmhd_l").val(data.zxjmhd_l);
		$("#BUT_r").val(data.BUT_r);
		$("#BUT_l").val(data.BUT_l);
		
		$("#jmnpxb_cd_r").val(data.jmnpxb_cd_r);
		$("#jmnpxb_ave_r").val(data.jmnpxb_ave_r);
		$("#jmnpxb_6a_r").val(data.jmnpxb_6a_r);
		$("#jmnpxb_cd_l").val(data.jmnpxb_cd_l);
		$("#jmnpxb_ave_l").val(data.jmnpxb_ave_l);
		$("#jmnpxb_6a_l").val(data.jmnpxb_6a_l);
		
		$("#yzcd_r").val(data.yzcd_r);
		$("#qfsd_r").val(data.qfsd_r);
		$("#jtsd_r").val(data.jtsd_r);
		$("#yzcd_l").val(data.yzcd_l);
		$("#qfsd_l").val(data.qfsd_l);
		$("#jtsd_l").val(data.jtsd_l);
		$("#wszk").val(data.wszk);
		$("#ycxpg_r").val(data.ycxpg_r);
		//$("#ycxpg_l").val(data.ycxpg_l);
		$("#jy").val(data.jy);
		
		$("#ys").val(getUser1_sg(data.ys));
		$("#yps").val(getUser1_sg(data.yps));
		$("#ygs").val(getUser1_sg(data.ygs));
		$("#ys_sg").val(data.ys);
		$("#yps_sg").val(data.yps);
		$("#ygs_sg").val(data.ygs);
		$("#rq").val(formatDateDIY(data.czrq,"-"));		
		$("#slxj").val(data.slxj);
	}
}
/*************************************初次戴镜************************************/
function getSgCcdj(){//页面取值
	var temp = {};
	temp.id = $("#ccdj_id").val() == ''?null:$("#ccdj_id").val();
	var djrq = getDateNull();
	if($("#djrq").val()!=''){
		djrq = new Date($("#djrq").val());
	}
	temp.djrq = djrq;
	
	temp.vacc1_r = $("#vacc1_r").val();
	temp.ds_r = $("#ds_r").val();
	temp.vacc2_r = $("#vacc2_r").val();
	temp.vacc1_l = $("#vacc1_l").val();
	temp.ds_l = $("#ds_l").val();
	temp.vacc2_l = $("#vacc2_l").val();
	
	temp.jpcs_fk_r = $("#jpcs_fk_r").val();
	temp.jpcs_rp_r = $("#jpcs_rp_r").val();
	temp.jpcs_zj_r = $("#jpcs_zj_r").val();
	temp.jpcs_ys_r = $("#jpcs_ys_r").val();
	temp.jpcs_ph_r = $("#jpcs_ph_r").val();
	
	temp.jpcs_fk_l = $("#jpcs_fk_l").val();
	temp.jpcs_rp_l = $("#jpcs_rp_l").val();
	temp.jpcs_zj_l = $("#jpcs_zj_l").val();
	temp.jpcs_ys_l = $("#jpcs_ys_l").val();
	temp.jpcs_ph_l = $("#jpcs_ph_l").val();
	
	temp.zxdw_x_r = $("#zxdw_x_r").val();
	temp.zxdw_x_l = $("#zxdw_x_l").val();
	temp.zxdw_y_r = $("#zxdw_y_r").val();
	temp.zxdw_y_l = $("#zxdw_y_l").val();
	temp.ydd_czsh_r = $("#ydd_czsh_r").val();
	temp.ydd_dybd_r = $("#ydd_dybd_r").val();
	temp.ydd_czsh_l = $("#ydd_czsh_l").val();
	temp.ydd_dybd_l = $("#ydd_dybd_l").val();
	temp.ydd_sd_r = $("input[name='ydd_sd_r']:checked").attr("id");
	temp.ydd_sd_l = $("input[name='ydd_sd_l']:checked").attr("id");
	temp.jtps_r = $("#jtps_r").val();
	temp.jtps_l = $("#jtps_l").val();
	temp.psfz_r = $("#psfz_r").val(); 
	temp.psfz_l = $("#psfz_l").val();
	temp.ypzj_r = $("#ypzj_r").val();
	temp.ypzj_l = $("#ypzj_l").val();
	temp.fzhk_r = $("#fzhk_r").val();
	temp.fzhk_l = $("#fzhk_l").val();
	temp.bhkd_r = $("#bhkd_r").val();
	temp.bhkd_l = $("#bhkd_l").val();
	
	temp.blh = getBlh();
	temp.bl_id = $("#blbh").text();
	return temp;
}
function setSgCcdj(data){//页面赋值
	if(data!=null){
		var id = data.id==null?'':data.id;
		$("#ccdj_id").val(id);
		$("#djrq").val(formatDateDIY(data.djrq,"-"));
		
		$("#vacc1_r").val(data.vacc1_r);
		$("#ds_r").val(data.ds_r);
		$("#vacc2_r").val(data.vacc2_r);
		$("#vacc1_l").val(data.vacc1_l);
		$("#ds_l").val(data.ds_l);
		$("#vacc2_l").val(data.vacc2_l);
		
		$("#jpcs_fk_r").val(data.jpcs_fk_r);
		$("#jpcs_rp_r").val(data.jpcs_rp_r);
		$("#jpcs_zj_r").val(data.jpcs_zj_r);
		$("#jpcs_ys_r").val(data.jpcs_ys_r);
		$("#jpcs_ph_r").val(data.jpcs_ph_r);
		
		$("#jpcs_fk_l").val(data.jpcs_fk_l);
		$("#jpcs_rp_l").val(data.jpcs_rp_l);
		$("#jpcs_zj_l").val(data.jpcs_zj_l);
		$("#jpcs_ys_l").val(data.jpcs_ys_l);
		$("#jpcs_ph_l").val(data.jpcs_ph_l);
		
		$("#zxdw_x_r").val(data.zxdw_x_r);
		$("#zxdw_x_l").val(data.zxdw_x_l);
		$("#zxdw_y_r").val(data.zxdw_y_r);
		$("#zxdw_y_l").val(data.zxdw_y_l);
		$("#ydd_czsh_r").val(data.ydd_czsh_r);
		$("#ydd_dybd_r").val(data.ydd_dybd_r);
		$("#ydd_czsh_l").val(data.ydd_czsh_l);
		$("#ydd_dybd_l").val(data.ydd_dybd_l);
		$("#"+data.ydd_sd_r).attr("checked","checked");
		$("#"+data.ydd_sd_l).attr("checked","checked");
		$("#jtps_r").val(data.jtps_r);
		$("#jtps_l").val(data.jtps_l);
		$("#psfz_r").val(data.psfz_r); 
		$("#psfz_l").val(data.psfz_l);
		$("#ypzj_r").val(data.ypzj_r);
		$("#ypzj_l").val(data.ypzj_l);
		$("#fzhk_r").val(data.fzhk_r);
		$("#fzhk_l").val(data.fzhk_l);
		$("#bhkd_r").val(data.bhkd_r);
		$("#bhkd_l").val(data.bhkd_l);	
	}
	
}
/*******************************定片记录****************************/
function getDpjl(){//页面取值
	var temp = {};
	temp.id = $("#dpjl_id").val() == ''?null:$("#dpjl_id").val();
	var dprq = getDateNull();
	if($("#dprq").val()!=''){
		dprq = new Date($("#dprq").val());
	}
	temp.dprq = dprq;
	
	temp.dp_ddh = $("#dp_ddh").val();
	temp.jpxh = $("#jpxh").val();
	
	temp.dpcs_fk_r = $("#dpcs_fk_r").val();
	temp.dpcs_rp_r = $("#dpcs_rp_r").val();
	temp.dpcs_zj_r = $("#dpcs_zj_r").val();
	temp.dpcs_ys_r = $("#dpcs_ys_r").val();
	
	temp.dpcs_fk_l = $("#dpcs_fk_l").val();
	temp.dpcs_rp_l = $("#dpcs_rp_l").val();
	temp.dpcs_zj_l = $("#dpcs_zj_l").val();
	temp.dpcs_ys_l = $("#dpcs_ys_l").val();
	
	temp.yp_ddh = $("#yp_ddh").val();
	temp.xingming = $("#xingming").val();
	
	var sprq = getDateNull();
	if($("#sprq").val()!=''){
		sprq = new Date($("#sprq").val());
	}
	temp.sprq = sprq;
	
	var yprq = getDateNull();
	if($("#yprq").val()!=''){
		yprq = new Date($("#yprq").val());
	}
	temp.yprq = yprq;
	
	temp.bmhh_r = $("input[name='bmhh_r']:checked").attr("id");
	temp.byqs_r = $("input[name='byqs_r']:checked").attr("id");
	temp.bmhh_l = $("input[name='bmhh_l']:checked").attr("id");
	temp.byqs_l = $("input[name='byqs_l']:checked").attr("id");
	
	temp.djsl_r = $("#djsl_r").val();
	temp.wz_r = $("#wz_r").val();
	temp.hdd_r = $("#hdd_r").val();
	temp.djsl_l = $("#djsl_l").val();
	temp.wz_l = $("#wz_l").val();
	temp.hdd_l = $("#hdd_l").val();
	temp.jl = $("input[name='jl']:checked").attr("id");
	
	var jprq = getDateNull();
	if($("#jprq").val()!=''){
		jprq = new Date($("#jprq").val());
	}
	temp.jprq = jprq;
	
	
	temp.jpr = $("#jpr").val();
	temp.spr = $("#spr").val();
	
	temp.btn1 = $("input[name='btn1']:checked").attr("id");
	temp.btn2 = $("input[name='btn2']:checked").attr("id");
	temp.btn3 = $("input[name='btn3']:checked").attr("id");
	temp.btn4 = $("input[name='btn4']:checked").attr("id");
	temp.btn5 = $("input[name='btn5']:checked").attr("id");
	temp.btn6 = $("input[name='btn6']:checked").attr("id");
	temp.btn7 = $("input[name='btn7']:checked").attr("id");
	temp.btn8 = $("input[name='btn8']:checked").attr("id");
	temp.btn9 = $("input[name='btn9']:checked").attr("id");
	temp.btn10 = $("input[name='btn10']:checked").attr("id");
	
	temp.blh = getBlh();
	temp.bl_id = $("#blbh").text();
	return temp;
}
function setDpjl(data){//页面赋值
	if(data!=null){
		$("#dpjl_id").val(data.id);
		$("#dprq").val(formatDateDIY(data.dprq,"-"));
		$("#dp_ddh").val(data.dp_ddh);
		$("#jpxh").val(data.jpxh);
		$("#dpcs_fk_r").val(data.dpcs_fk_r);
		$("#dpcs_rp_r").val(data.dpcs_rp_r);
		$("#dpcs_zj_r").val(data.dpcs_zj_r);
		$("#dpcs_ys_r").val(data.dpcs_ys_r);
		$("#dpcs_fk_l").val(data.dpcs_fk_l);
		$("#dpcs_rp_l").val(data.dpcs_rp_l);
		$("#dpcs_zj_l").val(data.dpcs_zj_l);
		$("#dpcs_ys_l").val(data.dpcs_ys_l);
		
		$("#yp_ddh").val(data.yp_ddh);
		$("#xingming").val(data.xingming);
		$("#sprq").val(formatDateDIY(data.sprq,"-"));
		$("#yprq").val(formatDateDIY(data.yprq,"-"));
		
		$("#"+data.bmhh_r).attr("checked","checked");
		$("#"+data.byqs_r).attr("checked","checked");
		$("#"+data.bmhh_r).attr("checked","checked");
		$("#"+data.byqs_l).attr("checked","checked");
		
		$("#djsl_r").val(data.djsl_r);
		$("#wz_r").val(data.wz_r);
		$("#hdd_r").val(data.hdd_r);
		$("#djsl_l").val(data.djsl_l);
		$("#wz_l").val(data.wz_l);
		$("#hdd_l").val(data.hdd_l);
		$("#"+data.jl).attr("checked","checked");
		
		$("#jprq").val(formatDateDIY(data.jprq,"-"));
		$("#jpr").val(data.jpr);
		$("#spr").val(data.spr);
		
		$("#"+data.btn1).attr("checked","checked");
		$("#"+data.btn2).attr("checked","checked");
		$("#"+data.btn3).attr("checked","checked");
		$("#"+data.btn4).attr("checked","checked");
		$("#"+data.btn5).attr("checked","checked");
		$("#"+data.btn6).attr("checked","checked");
		$("#"+data.btn7).attr("checked","checked");
		$("#"+data.btn8).attr("checked","checked");
		$("#"+data.btn9).attr("checked","checked");
		$("#"+data.btn10).attr("checked","checked");
	}	
}
/************************************复查记录********************************/
function getFcjl(){
	var temp = {};
	temp.id = $("#fcjl_id").val() == ''?null:$("#fcjl_id").val();
	var fcrq = $("#fcrq").val();
	if(fcrq==''){
		fcrq = getDateNull();
	}else{
		fcrq = new Date($("#fcrq").val());
	}
	temp.fcrq = fcrq;
	temp.ydjsj = $("#ydjsj").val();
	temp.qjsj = $("#qjsj").val();
	temp.jcr = $("#jcr").val();
		
	//用户主述
	var yhzss = $("input[name='yhzs']");
	var yhzs = "";
	$.each(yhzss,function(i,item){
		if($(item).attr("checked")=="checked"){
			yhzs+=(i+1)+",";
		}
	});
	temp.yhzs = yhzs;
	
	temp.lysl_r = $("#lysl_r").val();
	temp.qgd_ds_r = $("#qgd_ds_r").val();
	temp.qgd_dc_r = $("#qgd_dc_r").val();
	temp.qgd_ax_r = $("#qgd_ax_r").val();
	temp.jzsl_r = $("#jzsl_r").val();
	temp.jm_r = $("#jm_r").val();
	temp.yy_r = $("#yy_r").val();
	temp.bz_r = $("#bz_r").val();
	
	temp.lysl_l = $("#lysl_l").val();
	temp.qgd_ds_l = $("#qgd_ds_l").val();
	temp.qgd_dc_l = $("#qgd_dc_l").val();
	temp.qgd_ax_l = $("#qgd_ax_l").val();
	temp.jzsl_l = $("#jzsl_l").val();
	temp.jm_l = $("#jm_l").val();
	temp.yy_l = $("#yy_l").val();
	temp.bz_l = $("#bz_l").val();
	
	//处置 - 右
	var cz_rs = $("input[name='cz_r']");
	var cz_r = "";
	$.each(cz_rs,function(i,item){
		if($(item).attr("checked")=="checked"){
			cz_r+=(i+1)+",";
		}
	});
	temp.cz_r = cz_r;
	//处置1 - 左
	var cz_ls = $("input[name='cz_l']");
	var cz_l = "";
	$.each(cz_ls,function(i,item){
		if($(item).attr("checked")=="checked"){
			cz_l+=(i+1)+",";
		}
	});
	temp.cz_l = cz_l;

	
	temp.cz_td_r = $("#cz_td_r").val();
	temp.cz_td_l = $("#cz_td_l").val();
	temp.yongyao_r = $("#yongyao_r").val();
	temp.yongyao_l = $("#yongyao_l").val();

	
	//表面状况 - 右
	var bmzk_rs = $("input[name='bmzk_r']");
	var bmzk_r = "";
	$.each(bmzk_rs,function(i,item){
		if($(item).attr("checked")=="checked"){
			bmzk_r+=(i+1)+",";
		}
	});
	temp.bmzk_r = bmzk_r;
	//表面状况 - 左
	var bmzk_ls = $("input[name='bmzk_l']");
	var bmzk_l = "";
	$.each(bmzk_ls,function(i,item){
		if($(item).attr("checked")=="checked"){
			bmzk_l+=(i+1)+",";
		}
	});
	temp.bmzk_l = bmzk_l;

	//边缘状况 - 右
	var byzk_rs = $("input[name='byzk_r']");
	var byzk_r = "";
	$.each(byzk_rs,function(i,item){
		if($(item).attr("checked")=="checked"){
			byzk_r+=(i+1)+",";
		}
	});
	temp.byzk_r = byzk_r;
	//边缘状况 - 左
	var byzk_ls = $("input[name='byzk_l']");
	var byzk_l = "";
	$.each(byzk_ls,function(i,item){
		if($(item).attr("checked")=="checked"){
			byzk_l+=(i+1)+",";
		}
	});
	temp.byzk_l = byzk_l;

	//镜片检查-处置 - 右
	var jpjc_cz_rs = $("input[name='jpjc_cz_r']");
	var jpjc_cz_r = "";
	$.each(jpjc_cz_rs,function(i,item){
		if($(item).attr("checked")=="checked"){
			jpjc_cz_r+=(i+1)+",";
		}
	});
	temp.jpjc_cz_r = jpjc_cz_r;
	//表面状况 - 左
	var jpjc_cz_ls = $("input[name='jpjc_cz_l']");
	var jpjc_cz_l = "";
	$.each(jpjc_cz_ls,function(i,item){
		if($(item).attr("checked")=="checked"){
			jpjc_cz_l+=(i+1)+",";
		}
	});
	temp.jpjc_cz_l = jpjc_cz_l;

	temp.jpjc_qt = $("#jpjc_qt").val();
	
	temp.xcfcsj = $("input[name='xcfcsj']:checked").attr("id");
	temp.tbzysx = $("input[name='tbzysx']:checked").attr("id");
	temp.gmhly = $("input[name='gmhly']:checked").attr("id");
	temp.hlykp = $("input[name='hlykp']:checked").attr("id");

	temp.blh = getBlh();
	temp.bl_id = $("#blbh").text();
	/*****************追加*********************/
	//特殊检查 - 右
	var tsjc_rs = $("input[name='tsjc_r']");
	var tsjc_r = "";
	$.each(tsjc_rs,function(i,item){
		if($(item).attr("checked")=="checked"){
			tsjc_r+=(i+1)+",";
		}
	});
	temp.tsjc_r = tsjc_r;
	//特殊检查 - 左
	var tsjc_ls = $("input[name='tsjc_l']");
	var tsjc_l = "";
	$.each(tsjc_ls,function(i,item){
		if($(item).attr("checked")=="checked"){
			tsjc_l+=(i+1)+",";
		}
	});
	temp.tsjc_l = tsjc_l;
	
	return temp;
}
function setFcjl(data){
	if(data!=null){
		$("#fcjl_id").val(data.id);
		$("#fcrq").val(formatDateDIY(data.fcrq,"-"));
		$("#ydjsj").val(data.ydjsj);
		$("#qjsj").val(data.qjsj);
		$("#jcr").val(data.jcr);
		//用户主述
		if(data.yhzs!=null){
			for(var i=1;i<=9;i++){
				if(data.yhzs.indexOf(i)>-1){
					$("#yhzs"+i).attr("checked","checked");
				}
			}
		}	
		$("#lysl_r").val(data.lysl_r);
		$("#qgd_ds_r").val(data.qgd_ds_r);
		$("#qgd_dc_r").val(data.qgd_dc_r);
		$("#qgd_ax_r").val(data.qgd_ax_r);
		$("#jzsl_r").val(data.jzsl_r);
		$("#jm_r").val(data.jm_r);
		$("#yy_r").val(data.yy_r);
		$("#bz_r").val(data.bz_r);
		/****************追加开始**************/
		//特殊检查 - 右
		if(data.tsjc_r!=null){
			for(var i=1;i<=12;i++){
				if(data.tsjc_r.indexOf(i)>-1){
					$("#tsjc_r"+i).attr("checked","checked");
				}
			}
		}
		//特殊检查 - 左
		if(data.tsjc_l!=null){
			for(var i=1;i<=12;i++){
				if(data.tsjc_l.indexOf(i)>-1){
					$("#tsjc_l"+i).attr("checked","checked");
				}
			}
		}
		/******************追加结束********************/
		$("#lysl_l").val(data.lysl_l);
		$("#qgd_ds_l").val(data.qgd_ds_l);
		$("#qgd_dc_l").val(data.qgd_dc_l);
		$("#qgd_ax_l").val(data.qgd_ax_l);
		$("#jzsl_l").val(data.jzsl_l);
		$("#jm_l").val(data.jm_l);
		$("#yy_l").val(data.yy_l);
		$("#bz_l").val(data.bz_l);
		
		//处置1 - 右
		if(data.cz_r!=null){
			for(var i=1;i<=12;i++){
				if(data.cz_r.indexOf(i)>-1){
					$("#cz_r"+i).attr("checked","checked");
				}
			}
		}
		//处置1 - 左
		if(data.cz_l!=null){
			for(var i=1;i<=12;i++){
				if(data.cz_l.indexOf(i)>-1){
					$("#cz_l"+i).attr("checked","checked");
				}
			}
		}
		$("#cz_td_r").val(data.cz_td_r);
		$("#cz_td_l").val(data.cz_td_l);
		$("#yongyao_r").val(data.yongyao_r);
		$("#yongyao_l").val(data.yongyao_l);
		
		
		//表面状况 - 右
		if(data.bmzk_r!=null){
			for(var i=1;i<=4;i++){
				if(data.bmzk_r.indexOf(i)>-1){
					$("#bmzk_r"+i).attr("checked","checked");
				}
			}
		}
		//表面状况 - 左
		if(data.bmzk_l!=null){
			for(var i=1;i<=4;i++){
				if(data.bmzk_l.indexOf(i)>-1){
					$("#bmzk_l"+i).attr("checked","checked");
				}
			}
		}

		//边缘状况 - 右
		if(data.byzk_r!=null){
			for(var i=1;i<=3;i++){
				if(data.byzk_r.indexOf(i)>-1){
					$("#byzk_r"+i).attr("checked","checked");
				}
			}
		}
		//边缘状况 - 左
		if(data.byzk_l!=null){
			for(var i=1;i<=3;i++){
				if(data.byzk_l.indexOf(i)>-1){
					$("#byzk_l"+i).attr("checked","checked");
				}
			}
		}
		//处置 - 右
		if(data.jpjc_cz_r!=null){
			for(var i=1;i<=3;i++){
				if(data.jpjc_cz_r.indexOf(i)>-1){
					$("#jpjc_cz_r"+i).attr("checked","checked");
				}
			}
		}
		//处置 - 左
		if(data.jpjc_cz_l!=null){
			for(var i=1;i<=3;i++){
				if(data.jpjc_cz_l.indexOf(i)>-1){
					$("#jpjc_cz_l"+i).attr("checked","checked");
				}
			}
		}

		$("#jpjc_qt").val(data.jpjc_qt);
		$("#"+data.xcfcsj).attr("checked","checked");
		$("#"+data.tbzysx).attr("checked","checked");
		$("#"+data.gmhly).attr("checked","checked");
		$("#"+data.hlykp).attr("checked","checked");
		setJcr();
	}
}
//取镜单
function getQjd(){
	var temp = {};
	temp.id = $("#qjd_id").val() == ''?null:$("#qjd_id").val();
	
	temp.glasses = $("#glasses").val();
	temp.glasses_money = $("#glasses_money").val();
	temp.slice = $("#slice").val();
	temp.slice_money_r = $("#slice_money_r").val();
	temp.slice_money_l = $("#slice_money_l").val();
	temp.full_money = $("#full_money").val();
	temp.advance = $("#advance").val();
	temp.debt = $("#debt").val();
	
	temp.ygs = $("#ygs").val();
	temp.jcys = $("#jcys").val();
	temp.jsr = $("#jsr").val();
	
	var pjrq = $("#pjrq").val();
	if(pjrq==''){
		pjrq = getDateNull();
	}else{
		pjrq = new Date($("#pjrq").val());
	}
	temp.pjrq = pjrq;
	
	var qjrq = $("#qjrq").val();
	if(qjrq==''){
		qjrq = getDateNull();
	}else{
		qjrq = new Date($("#qjrq").val());
	}
	temp.qjrq = qjrq;

	temp.xq = $("#xq").val();
	temp.yj = $("#yj").val();
	
	temp.bmqd_y_r = $("#bmqd_y_r").val();
	temp.sg_y_r = $("#sg_y_r").val();
	temp.zd_y_r = $("#zd_y_r").val();
	temp.zj_y_r = $("#zj_y_r").val();
	temp.add_y_r = $("#add_y_r").val();
	
	temp.bmqd_y_l = $("#bmqd_y_l").val();
	temp.sg_y_l = $("#sg_y_l").val();
	temp.zd_y_l = $("#zd_y_l").val();
	temp.zj_y_l = $("#zj_y_l").val();
	temp.add_y_l = $("#add_y_l").val();
	
	temp.bmqd_j_r = $("#bmqd_j_r").val();
	temp.sg_j_r = $("#sg_j_r").val();
	temp.zd_j_r = $("#zd_j_r").val();
	temp.zj_j_r = $("#zj_j_r").val();
	
	temp.bmqd_j_l = $("#bmqd_j_l").val();
	temp.sg_j_l = $("#sg_j_l").val();
	temp.zd_j_l = $("#zd_j_l").val();
	temp.zj_j_l = $("#zj_j_l").val();

	temp.pd = $("#pd").val();
	temp.bz = $("#bz").val();

	temp.blh = getBlh();
	temp.bl_id = $("#blbh").text();
	return temp;
}
/**************************************set**************************************/







//取镜单

function setQjd(data){
	if(data!=null){
		$("#qjd_id").val(data.id);
		
		$("#glasses").val(data.glasses);
		$("#glasses_money").val(data.glasses_money);
		$("#slice").val(data.slice);
		$("#slice_money_r").val(data.slice_money_r);
		$("#slice_money_l").val(data.slice_money_l);
		$("#full_money").val(data.full_money);
		$("#advance").val(data.advance);
		$("#debt").val(data.debt);
		
		$("#ygs").val(data.ygs);
		$("#jcys").val(data.jcys);
		$("#jsr").val(data.jsr);
		
		$("#pjrq").val(formatDateDIY(data.pjrq,"-"));
		$("#qjrq").val(formatDateDIY(data.qjrq,"-"));

		$("#xq").val(data.xq);
		$("#yj").val(data.yj);
		
		$("#bmqd_y_r").val(data.bmqd_y_r);
		$("#sg_y_r").val(data.sg_y_r);
		$("#zd_y_r").val(data.zd_y_r);
		$("#zj_y_r").val(data.zj_y_r);
		$("#add_y_r").val(data.add_y_r);
		
		$("#bmqd_y_l").val(data.bmqd_y_l);
		$("#sg_y_l").val(data.sg_y_l);
		$("#zd_y_l").val(data.zd_y_l);
		$("#zj_y_l").val(data.zj_y_l);
		$("#add_y_l").val(data.add_y_l);
		
		$("#bmqd_j_r").val(data.bmqd_j_r);
		$("#sg_j_r").val(data.sg_j_r);
		$("#zd_j_r").val(data.zd_j_r);
		$("#zj_j_r").val(data.zj_j_r);
		
		$("#bmqd_j_l").val(data.bmqd_j_l);
		$("#sg_j_l").val(data.sg_j_l);
		$("#zd_j_l").val(data.zd_j_l);
		$("#zj_j_l").val(data.zj_j_l);

		$("#pd").val(data.pd);
		$("#bz").val(data.bz);
	}
}












