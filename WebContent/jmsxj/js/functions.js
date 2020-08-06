/******************************************** 定义变量 ************************************************/
var EMR_HUANZHEXINXI_URL = "/publish/huanZheXinXi/getHuanzhexinxiByBLH.htm";
var EMR_JIUZHEN_URL = "/publish/doctor/getMedicalRecords.htm";
/********************************************模板*********************************************/
function blmb1(mobanId){
	var blmb = "";
	var url_getBaogaoMobanById = "/publish/baogaomoban/getBaogaoMobanById.htm";
	var data_getBaogaoMobanById = getJSONData(url_getBaogaoMobanById, {
		id : mobanId,
		tag : Math.random()
	}, "post");// 报告模板对象
	if (!data_getBaogaoMobanById.state) {
		alert("查询报告模板信息出错");
		return;
	}
	var data_obj_getBaogaoMobanById = data_getBaogaoMobanById.obj;
	if (data_obj_getBaogaoMobanById == null) {
		alert("报告模板信息不存在");
		return;
	}
	blmb = data_obj_getBaogaoMobanById.moban;
	return blmb;
}
/********************************************get set*****************************************/
//标签文本
function get_flag_text(){
	var flag_text = $("#doctortitle").find(".tab_show").children("span").text();
	return flag_text;
}
//患者信息表
function getHuanzhexinxi(blh){
	var data = getJSONData(EMR_HUANZHEXINXI_URL,{binglihao:blh},"POST").obj;
	return data;							 
}
//就诊表
function getJiuzhen(blh,th){
	//id,caozuoTime,state,fzys,hzid,doctor,bumen
	var data_hzxx = getHuanzhexinxi(blh);
	var jz = null;
	if(data!=null){
		var hz_id = data_hzxx.id;
		var data = getJSONData(EMR_JIUZHEN_URL+"?id="+hzxx_id,null).obj;
		if(data!=null){	
			if(th=="first"){
				jz = data[0];
			}else if(th=="last"){
				jz = data[data.length-1];
			}else{
				jz = data[0];
			}
		}
	}
	return jz;
}
//患者基本信息
function getJbxx(blh){
	var data = getHuanzhexinxi(blh);
	var id = 0;
	var blh = "";
	var blbh = "";
	var qq = "";
	var name = "";
	var sex = "";
	var bir = "";
	var age = 0;
	var gzdw = "";
	var address = "";
	var dianhua = "";
	var yibao = "";
	
	var youbian = "";
	if(data!=null){
		id = data.id;
		blh = data.binglihao;
		qq = data.qq;
		name = data.xingming;
		if(data.xingbie!=null){
			sex = data.xingbie?'男':'女';
		}
		if(data.shengri!=null && data.shengri!=""){
			bir = formatDate(data.shengri);
			age = getAge(data.shengri.time);
		}
		if(data.gzdw!=null){
			 gzdw = data.gzdw;
		}
		if(data.diqu!=null){
			address = data.diqu;
		}
		if(data.shouji!=null && data.shouji!=""){
			dianhua=data.shouji;
		}else if(data.shouji!=null && data.dianhua!=""){
			dianhua = data.dianhua;
		}else if(data.shouji!=null && data.dwdh!=""){
			dianhua = data.dwdh;
		}else if(data.shouji!=null && data.hzlxrdh!=""){
			dianhua = data.hzlxrdh;
		}
		if(data.yibao){
			yibao = "是";
		}else{
			yibao = "否";
		}
		if(data.youbian!=null){
			youbian = data.youbian;
		}
	}
	var jbxx = {
			id:id,
			blh:blh,
			qq:qq,
			name:name,
			sex:sex,
			birthday:bir,
			age:age,
			gzdw:gzdw,
			address:address,
			dianhua:dianhua,
			yibao:yibao,
			youbian:youbian
	};
	return jbxx;
}
//基本信息赋值
function set_jbxx(){
	var blh = getBlh();
	var jbxx = getJbxx(blh);
	var jz_first = getJiuzhen(blh,"first");
	var jz_last = getJiuzhen(blh,"last");
	var flag_text = get_flag_text();
	if(flag_text=="病历"){
		$("#show_moban").find("#caseNumber").text(jbxx.blh);
		$("#show_moban").find("#suffererName").text(jbxx.name);
		$("#show_moban").find("#sex").text(jbxx.sex);
		$("#show_moban").find("#age").text(jbxx.age);
	}else if(flag_text=="同意书"){
			$("#show_moban").find("#suffererName").text(jbxx.name);
			$("#show_moban").find("#sex").text(jbxx.sex);
			$("#show_moban").find("#age").text(jbxx.age);
	}else if(flag_text=="评估表"){
		$("#show_moban").find("#caseNumber").text(jbxx.blh);
		$("#show_moban").find("#suffererName").text(jbxx.name);
		$("#show_moban").find("#sex").text(jbxx.sex);
		$("#show_moban").find("#age").text(jbxx.age);
	}else if(flag_text=="订片记录"){
		$("#show_moban").find("#caseNumber").text(jbxx.blh);
		$("#show_moban").find("#suffererName").text(jbxx.name);
		$("#show_moban").find("#sex").text(jbxx.sex);
		$("#show_moban").find("#age").text(jbxx.age);
	}else if(flag_text=="复查记录"){
		$("#show_moban").find("#caseNumber").text(jbxx.blh);
		$("#show_moban").find("#suffererName").text(jbxx.name);
		$("#show_moban").find("#sex").text(jbxx.sex);
		$("#show_moban").find("#age").text(jbxx.age);
	}else if(flag_text=="取镜单"){
		$("#show_moban").find("#sufferName").text(jbxx.name);
		$("#show_moban").find("#sex").text(jbxx.sex);
		$("#show_moban").find("#phone").text(jbxx.dianhua);
		$("#show_moban").find("#age").text(jbxx.age);
		$("#show_moban").find("#address").text(jbxx.address);
		$("#show_moban").find("#postcode").text(jbxx.youbian);
		$("#show_moban").find("#profession").text(jbxx.gzdw);
	}
}
function getUser(){
	var ygdata = getJSONData("/publish/yuangong/findYuangongByGonghao.htm", {
		tag : Math.random()
	}, "post").obj;
	return ygdata;
}
//检查人
function setJcr(){
	var user = getUser();
	var xingming = '';
	if(user!=null){
		xingming = user.xingming;
	}
	var jcr_text = $("#jcr").val();
	if(jcr_text==''){
		$("#jcr").val(xingming);
	}
}
//取镜单基本信息
function set_qjd_jbxx(){
	//病历信息
	var data =  getJSONData("/publish/shiGuang/getSgblById.htm",{id:$("#blbh").text()}).obj;
	$("#jcys").val(data.ys);
	$("#ygs").val(data.ygs);
	var yg = getUser();
	$("#jsr").val(yg.xingming);
}
//赋值
function set_values(){
	//基本信息赋值
	set_jbxx();
	//个体表单信息赋值
	var flag_text = get_flag_text();
	if(flag_text=="病历"){
		if($("#blbh").text()!=''){
			//初始值
			var data =  getJSONData("/publish/shiGuang/getSgblById.htm",{id:$("#blbh").text()}).obj;
			setSgbl(data);
			//列表
			sgblList(getBlh());
			$("#pageListTable").find("input[type='checkbox']:first").attr("checked","checked");
			//点击事件
			$("#pageListTable td").bind("click",function(){
				var cb = $(this).parent().children("td").eq(0).children("input[type='checkbox']");
				if($(cb).attr("checked")!="checked"){
					var id = $(this).parent().children("td").eq(1).text();
					var data = getJSONData("/publish/shiGuang/getSgblById.htm?id="+id,{}).obj;
					if(data!=null){
						update_bl(data.id,formatDateDIY(data.czrq,"-"));
						setSgbl(data);
					}
				}else{
					$("#blbh").text("");
					$("#blrq").text("");
					sg_bl();
				}
						
			});
			
		}
	}else if(flag_text=="评估表"){
		if($("#blbh").text()!=''){
			//列表
			pgbList($("#blbh").text());
			//点击事件
			$("#pageListTable td").bind("click",function(){
				var cb = $(this).parent().children("td").eq(0).children("input[type='checkbox']");
				if($(cb).attr("checked")!="checked"){
					var id = $(this).parent().children("td").eq(1).text();
					var data1 = getJSONData("/publish/shiGuang/getSgCcdjById.htm?id="+id,{}).obj;
					if(data1!=null){
						setSgCcdj(data1);
					}
				}else{
					sg_pgb();
				}
						
			});
			
		}
	}else if(flag_text=="订片记录"){
		if($("#blbh").text()!=''){
			//列表
			dpjlList($("#blbh").text());
			//点击事件
			$("#pageListTable td").bind("click",function(){
				
				var cb = $(this).parent().children("td").eq(0).children("input[type='checkbox']");
				if($(cb).attr("checked")!="checked"){
					var id = $(this).parent().children("td").eq(1).text();
					var data1 = getJSONData("/publish/shiGuang/getSgDpjlById.htm?id="+id,{}).obj;
					if(data1!=null){
						setDpjl(data1);
					}
				}else{
					sg_dpjl();
				}
						
			});
		}
	}else if(flag_text=="取镜单"){
		//取镜单基本信息
		set_qjd_jbxx();
		//病历号条码
		getCodeBar();
		if($("#blbh").text()!=''){
			//列表
			qjdList($("#blbh").text());
			//点击事件
			$("#pageListTable td").bind("click",function(){
				
				var cb = $(this).parent().children("td").eq(0).children("input[type='checkbox']");
				if($(cb).attr("checked")!="checked"){
					var id = $(this).parent().children("td").eq(1).text();
					var data1 = getJSONData("/publish/shiGuang/getSgQjdById.htm?id="+id,{}).obj;
					if(data1!=null){
						setQjd(data1);
					}
				}else{
					sg_qjd();
				}
						
			});
		}
	}else if(flag_text=="复查记录"){
		//列表
		fcjlList($("#blbh").text());
		//点击事件
		$("#pageListTable td").bind("click",function(){
			var cb = $(this).parent().children("td").eq(0).children("input[type='checkbox']");
			if($(cb).attr("checked")!="checked"){
				var id = $(this).parent().children("td").eq(1).text();
				var data1 = getJSONData("/publish/shiGuang/getSgFcjlById.htm?id="+id,{}).obj;
				if(data1!=null){
					setFcjl(data1);
				}
			}else{
				sg_fcjl();
			}
			
		});
	}
}
//生成条码
function getCodeBar(){
	$("#blh_tm").html("").barcode(getBlh(), "code39",{barWidth:1, barHeight:20});
	$("#blh_tm").children("div:last").attr("style","font-size:10px;margin-top:0px;text-align:center;");
}
/************************************************打印*********************************************/
function print_bl(){
	$.oimsConfirm("打印后页面将还原为最初页面，如果您没有提交当前页面，请先点击“提交”按钮！是否立即打印？",function(){
		replace_checkbox("tabContent");
		//replace_input("tabContent");
		replace_button("tabContent");
		replace_textarea("tabContent");
		replace_select("tabContent");
		$("#show_moban").printArea();
		sg_bl();
	},function(){});
}
function print_tys(){
	$("#show_moban").printArea();
}
function print_pgb(){
	$.oimsConfirm("打印后页面将还原为最初页面，如果您没有提交当前页面，请先点击“提交”按钮！是否立即打印？",function(){
		replace_checkbox("tabContent");
		//replace_input("tabContent");
		replace_textarea("tabContent");
		$("#show_moban").printArea();
		sg_pgb();
	},function(){});
}
function print_dpjl(){
	$.oimsConfirm("打印后页面将还原为最初页面，如果您没有提交当前页面，请先点击“提交”按钮！是否立即打印？",function(){
		replace_checkbox("tabContent");
		//replace_input("tabContent");
		replace_textarea("tabContent");
		$("#show_moban").printArea();
		sg_dpjl();
	},function(){});
}
function print_qjd(){
	$.oimsConfirm("打印后页面将还原为最初页面，如果您没有提交当前页面，请先点击“提交”按钮！是否立即打印？",function(){
		//replace_input("tabContent");
		$("#show_moban").printArea();
		sg_qjd();
	},function(){});
}
function print_fcjl(){
	$.oimsConfirm("打印后页面将还原为最初页面，如果您没有提交当前页面，请先点击“提交”按钮！是否立即打印？",function(){
		replace_checkbox("tabContent");
		//replace_input("tabContent");
		replace_textarea("tabContent");
		$("#show_moban").printArea();
		sg_fcjl();
	},function(){});
}
function print_fcjlb(){
	$.oimsConfirm("打印后页面将还原为最初页面，如果您没有提交当前页面，请先点击“提交”按钮！是否立即打印？",function(){
		$("#fcjlb_print_div").printArea();
	},function(){});
}
/**********************************************checkbox控制*******************************************/
//checkbox单选
function checkbox_single(cname){
	$("input[name='"+cname+"']").each(function(){  
		$(this).click(function(){ 
			if(this.checked==false){
				$("input[name='"+cname+"']").attr("checked",false);	
			}else{
				$("input[name='"+cname+"']").attr("checked",false);
				this.checked = true;
			}
		});  
	});  
}

//病历-checkbox控制
function bl_checkbox_ctrl(){
	//视力验光 
	checkbox_single("slygjc");
	$("#slygjc_pl").blur(function(){
		if($(this).val()!=''){
			$("#slygjc2").attr("checked",true);
		}
	});
	$("#slygjc2").click(function(){
		if(this.checked==false){
			$("#slygjc_pl").val("");
		}
	});
	$("#slygjc1").click(function(){
		if(this.checked==true){
			$("#slygjc_pl").val("");
		}
	});
	checkbox_single("yj_r");
	checkbox_single("yj_l");
}
//评估表-checkbox控制
function pgb_checkbox_ctrl(){
	checkbox_single("ydd_sd_r");
	checkbox_single("ydd_sd_l");
}
//定片记录-checkbox控制
function dpjl_checkbox_ctrl(){
	checkbox_single("bmhh_r");
	checkbox_single("bmhh_l");
	checkbox_single("byqs_r");
	checkbox_single("byqs_l");
	checkbox_single("jl");
	for(var i=1;i<=10;i++){
		checkbox_single("btn"+i);	
	}
}
//复查记录-checkbox控制
function fcjl_checkbox_ctrl(){
	//处置1
	//checkbox_single("cz_r");
	//checkbox_single("cz_l");
	$("#cz_r2").click(function(){
		if(this.checked==false){
			$("#cz_td_r").val("");
		}
	});
	$("input[name='cz_r']").each(function(){
		$(this).click(function(){
			if(this.id!="cz_r2"){
				$("#cz_td_r").val("");
			}
		});
	});
	$("#cz_td_r").blur(function(){
		if($(this).val()!=''){
			$("#cz_r2").attr("checked",true);
		}
	});
	$("#cz_l2").click(function(){
		if(this.checked==false){
			$("#cz_td_l").val("");
		}
	});
	$("input[name='cz_l']").each(function(){
		$(this).click(function(){
			if(this.id!="cz_l2"){
				$("#cz_td_l").val("");
			}
		});
	});
	$("#cz_td_l").blur(function(){
		if($(this).val()!=''){
			$("#cz_l2").attr("checked",true);
		}
	});
	checkbox_single("xcfcsj");
	checkbox_single("tbzysx");
	checkbox_single("gmhly");
	checkbox_single("hlykp");
}
//checkbox换成☑□
function replace_checkbox(fatherId){
	$("#"+fatherId).find("input[type='checkbox']").each(function(){
		if($(this).attr("checked")=="checked"){
			$(this).replaceWith("<label style='font-size:14px'>☑</label>");
		}else{
			$(this).replaceWith("<label style='font-size:20px;'>□</label>");
		}
	});
}
//select换成值
function replace_select(fatherId){
	$("#"+fatherId).find("select").each(function(){
			$(this).replaceWith($(this).val());
	});
}
//input换成值
function replace_input(fatherId){
	$("#"+fatherId).find("input[type='text']").each(function(){
		$(this).replaceWith($(this).val());
	});	
}
//去掉按钮
function replace_button(fatherId){
	$("#"+fatherId).find("input[type='button']").each(function(){
		$(this).replaceWith("");
	});		
}
//textarea换成值
function replace_textarea(fatherId){
	$("#"+fatherId).find("textarea").each(function(){
		$(this).replaceWith($(this).val());
	});
}
/****************************************通用方法**********************************/
//日历控件
function calendarFun_sg(id, leftWidth) {
	if ($("#" + id).length) {
		var cal = Calendar.setup({
			onSelect : function(cal) {
				cal.hide();
				var date = cal.selection.get();
				if (date) {
					date = Calendar.intToDate(date);
					document.getElementById(id).value = Calendar.printDate(
							date, "%Y-%m-%d");
					if (document.getElementById(id).value != "") {
						$("#" + id).removeAttr("title").removeClass("error1");
					}
				}
			}
		});
		cal.widthLength(id);
		cal.topLength(id);
		cal.manageFields(id, id, "%Y-%m-%d");
		if (!leftWidth) {
			leftWidth = 0;
		}
	}
}
//空时间
function getDateNull(){
	var nullStr = "1900-01-01 00:00:00";
	var nullDate = new Date(nullStr);
	return nullDate;
}
function getNewDate(){
	var nowDate = new Date();
	var yy = nowDate.getFullYear();
	var mm = nowDate.getMonth()+1;
	var dd = nowDate.getDate();
	var nowStr = yy+"-"+mm+"-"+dd+" 00:00:00";
	return new Date(nowStr);
}
/*************************************提交**************************************************/
function ti_bl(){
	var url_bl = "";
	if($("#blbh").text()==''){
		url_bl = "/publish/shiGuang/saveSgbl.htm";
	}else{
		url_bl = "/publish/shiGuang/updateSgbl.htm";
	}
	var temp = getSgbl();
	$.ajax({
		url : contextPath + url_bl,
		data : temp,
		type : "POST",
		dataType : 'json',
		success : function(data) {
			if(data.state==1){
				$.oimsSucc('操作成功！');
				resetBh();
				sg_bl();
			}else{
				$.oimsAlert('操作失败！');
			}
		}
	});
}
function ti_pgb(){
	var url_pgb = "";
	if($("#ccdj_id").val()==''){
		url_pgb = "/publish/shiGuang/saveSgCcdj.htm";
	}else{
		url_pgb = "/publish/shiGuang/updateSgCcdj.htm";
	}
	var temp = getSgCcdj();
	$.ajax({
		url : contextPath + url_pgb,
		data : temp,
		type : "POST",
		dataType : 'json',
		success : function(data) {
			if(data.state==1){
				$.oimsSucc('操作成功！');
				sg_pgb();
			}else{
				$.oimsAlert('操作失败！');
			}
		}
	});
}
function ti_dpjl(){
	var url_dpjl = "";
	if($("#dpjl_id").val()==''){
		url_dpjl = "/publish/shiGuang/saveSgDpjl.htm";
	}else{
		url_dpjl = "/publish/shiGuang/updateSgDpjl.htm";
	}
	var temp = getDpjl();
	$.ajax({
		url : contextPath + url_dpjl,
		data : temp,
		type : "POST",
		dataType : 'json',
		success : function(data) {
			if(data.state==1){
				$.oimsSucc('操作成功！');
				sg_dpjl();
			}else{
				$.oimsAlert('操作失败！');
			}
		}
	});
}
function ti_qjd(){
	var url_qjd = "";
	if($("#qjd_id").val()==''){
		url_qjd = "/publish/shiGuang/saveSgQjd.htm";
	}else{
		url_qjd = "/publish/shiGuang/updateSgQjd.htm";
	}
	var temp = getQjd();
	$.ajax({
		url : contextPath + url_qjd,
		data : temp,
		type : "POST",
		dataType : 'json',
		success : function(data) {
			if(data.state==1){
				$.oimsSucc('操作成功！');
				sg_qjd();
			}else{
				$.oimsAlert('操作失败！');
			}
		}
	});
}
function ti_fcjl(){
	var url_fcjl = "";
	if($("#fcjl_id").val()==''){
		url_fcjl = "/publish/shiGuang/saveSgFcjl.htm";
	}else{
		url_fcjl = "/publish/shiGuang/updateSgFcjl.htm";
	}
	var temp = getFcjl();
	$.ajax({
		url : contextPath + url_fcjl,
		data : temp,
		type : "POST",
		dataType : 'json',
		success : function(data) {
			if(data.state==1){
				$.oimsSucc('操作成功！');
				sg_fcjl();
			}else{
				$.oimsAlert('操作失败！');
			}
		}
	});
}
/***********零碎方法**************/
function add_bl(){
	$("#pageListTable").find("input[type='checkbox']").attr("checked",false);
		$("#blbh").text("");
		$("#blrq").text("");
		sg_bl();
}
function update_bl(blbh,blrq){
	$("#blbh").text(blbh);
	$("#blrq").text(blrq);
}
//刷新系统编号
function resetBh(){
	var blh = getBlh();
	if(blh!=''){
		var data =  getJSONData("/publish/shiGuang/getLastSgbl.htm",{blh:blh}).obj;
		var bl_id = '';
		var czrq = '';
		if(data!=null){
			if(data.id!=null){
				bl_id = data.id;	
			}
			if(data.czrq!=null){
				czrq = formatDateDIY(data.czrq,"/");
			}
		}
		$("#blbh").text(bl_id);
		$("#blrq").text(czrq);
	}
}
//获取展示区的高度
//function getShowHeight(){
//	var screenHeight = document.body.scrollHeight;
//	var otherHeight = 63+34+30+28+37+5;
//	var showHeight = screenHeight-otherHeight;
//	return showHeight;
//}
function getShowHeight_sg(){
//	var screenHeight = document.body.clientHeight;//543
//	var otherHeight =30+28+20;
//	var showHeight = screenHeight-otherHeight;
//	return showHeight;
	var visitRecordHeight = $("#visitRecord").height();//543
	var tabTitleHeight = $("#tabTitle").height();
	var tabContentHeight = visitRecordHeight-tabTitleHeight-28;
	return tabContentHeight;
}
//添加一份新病历按钮控制
function add_bl_ctrl(){
	var flag_text = get_flag_text();
	if(flag_text=="病历"){
		$("#add_bl_btn_div").show();
		$("#auto_setSgbl_div").show();
		$("#add_fcjlb_btn_div").hide();
	}else if(flag_text=="复查记录"){
		$("#add_bl_btn_div").hide();
		$("#auto_setSgbl_div").hide();
		$("#add_fcjlb_btn_div").show();
	}else{
		$("#add_bl_btn_div").hide();
		$("#auto_setSgbl_div").hide();
		$("#add_fcjlb_btn_div").hide();
	}
	
	
}
/*********************************************列表*******************************************/
function sgblList(blh) {
	var listFactor = {
		listObj : [ {
			title : "系统编号",
			key : "id"
		},{
			title : "日期",
			key : "czrq"
		}],
		url : contextPath + "/publish/shiGuang/findSgblByBlhFy.htm?blh='"+blh+"'",
		method : "post",
		checkbox : true,
		single : false,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : 12,// Page类的方法
			tag : Math.random()
		}
	};
	$("#tabList").html("");
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#tabList");
	$(div_list).createPageList(listFactor);
}
function pgbList(blbh) {
	var listFactor = {
		listObj : [ {
			title : "系统编号",
			key : "id"
		},{
			title : "戴镜日期",
			key : "djrq"
		}],
		url : contextPath + "/publish/shiGuang/findSgCcdj4page.htm?bl_id="+blbh,
		method : "post",
		checkbox : true,
		single : false,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : 12,// Page类的方法
			tag : Math.random()
		}
	};
	$("#tabList").html("");
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#tabList");
	$(div_list).createPageList(listFactor);
}
function qjdList(blbh){
	var listFactor = {
			listObj : [ {
				title : "系统编号",
				key : "id"
			},{
				title : "取镜日期",
				key : "qjrq"
			}],
			url : contextPath + "/publish/shiGuang/findSgQjd4page.htm?bl_id="+blbh,
			method : "post",
			checkbox : true,
			single : false,
			data : {// data表示传的参数
				currentPage : 1,
				pageSize : 12,// Page类的方法
				tag : Math.random()
			}
		};
		$("#tabList").html("");
		var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
				.appendTo("#tabList");
		$(div_list).createPageList(listFactor);
}
function dpjlList(blbh) {
	var listFactor = {
		listObj : [ {
			title : "系统编号",
			key : "id"
		},{
			title : "定片日期",
			key : "dprq"
		}],
		url : contextPath + "/publish/shiGuang/findSgDpjl4page.htm?bl_id="+blbh,
		method : "post",
		checkbox : true,
		single : false,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : 12,// Page类的方法
			tag : Math.random()
		}
	};
	$("#tabList").html("");
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#tabList");
	$(div_list).createPageList(listFactor);
}
function fcjlList(blbh) {
	var listFactor = {
		listObj : [ {
			title : "系统编号",
			key : "id"
		},{
			title : "复查日期",
			key : "fcrq"
		}],
		url : contextPath + "/publish/shiGuang/findSgFcjl4page.htm?bl_id="+blbh,
		method : "post",
		checkbox : true,
		single : false,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : 12,// Page类的方法
			tag : Math.random()
		}
	};
	$("#tabList").html("");
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#tabList");
	$(div_list).createPageList(listFactor);
}
/*****************************清空***************************************/
function clearTabContent(){
	$("#tabContent").find("input[type='text']").each(function(item){
		$(item).val("");
	});
	$("#tabContent").find("input[type='checkbox']").each(function(item){
		$(item).attr("checked",false);
	});
	$("#tabContent").find("input[type='radio']").each(function(item){
		$(item).attr("checked",false);
	});
	$("#tabContent").find("select").each(function(item){
		$(item).val("");
	});
}
//获取病例号
function getBlh(){
	var blh = $("#patientInfo").children("span").first().text();
	return blh;
}


//眼部检查详情
function ybjcxq(tag){
	var showContext = "";
	var id = "";
	if(tag==1){
		showContext = $("#jiaomo_r").val();
		id="jiaomo_r";
	}else if(tag==2){
		showContext = $("#jiaomo_l").val();
		id = "jiaomo_l";
	}else if(tag==3){
		showContext = $("#jiemo_r").val();
		id = "jiemo_r";
	}else if(tag==4){
		showContext = $("#jiemo_l").val();
		id = "jiemo_l";
	}else if(tag==5){
		showContext = $("#yandi_r").val();
		id = "yandi_r";
	}else if(tag==6){
		showContext = $("#yandi_l").val();
		id = "yandi_l";
	}else if(tag==7){
		showContext = $("#qt_r_hidden").val()==''?$("#qt_r").val():$("#qt_r_hidden").val();
		id = "qt_r";
	}else if(tag==8){
		showContext = $("#qt_l_hidden").val()==''?$("#qt_l").val():$("#qt_l_hidden").val();
		id = "qt_l";
	}
	getFloatDiv_sg(id);
	$("#contextSonShow").html(showContext);
	
}
//悬浮层
function getFloatDiv_sg(id){
	closeFloatDiv_ybjc();
	var buttonObj = $("#"+id).parent().find("input[type='button']");
	var offset = buttonObj.offset();
	var leftPosition = offset.left+buttonObj.width();
	var topPosition = offset.top;
	var widthDiv = 170;
	var heightDiv = 170;
	var fatherDiv = $("#tabContent");
	var floatDiv_ybjc = $("<div/>").attr("id","floatDiv_ybjc").appendTo(fatherDiv);
	$("#floatDiv_ybjc").attr("style","width:"+widthDiv+"px;height:"+heightDiv+"px;z-index:9999;position:absolute;top:"+topPosition+"px;left:"+(leftPosition+5)+"px;border:1px solid #c2c2c2;overflow:auto;background:white;");
	$(floatDiv_ybjc).appendTo(fatherDiv);
	var topSon = $("<div/>").attr("id","topSon").appendTo(floatDiv_ybjc);
	
	var contextSon = $("<div/>").attr("id","contextSon").appendTo(floatDiv_ybjc);
	$(topSon).attr("style","width:"+widthDiv+"px;height:20px;border-bottom:1px solid;");
	$(contextSon).attr("style","width:"+(widthDiv)+"px;height:140px;background:;");
	var topTab = "<div style='width:100px;height:16px;margin-top:2px;float:left;'>" +
						"<span style='font-family:黑体;color:#000;'>详细信息</span>" +
					"</div>" +
					"<div style='width:70px;height:16px;margin-top:2px;float:right;text-align:right;'>" +
						"<span style='background:#c0c0c0;color:#000;border:1px solid black;cursor:pointer;' onclick='closeFloatDiv_ybjc()'>关闭</span>" +
					"</div>";
	$(topSon).append(topTab);
	var contextTab = "<div id='contextSonShow' style='width:"+(widthDiv-10)+"px;height:130px;margin-top:5px;margin-left:5px;background:;'></div>";
	$(contextSon).append(contextTab);

} 
//关闭悬浮层
function closeFloatDiv_ybjc(){
	$("#floatDiv_ybjc").remove();
}
//刷新病历模板
function reset_sgbl_moban(){
	if($("#autoSet_sgbl_true").attr("checked")=='checked'){
		$("#show_moban").html(blmb1(67));
		//模板赋值
		set_values();
		//自动赋值
		sg_auto_set();
	}
	if($("#autoSet_sgbl_false").attr("checked")=='checked'){
		//模板赋值
		$("#show_moban").html(blmb1(67));
		//模板赋值
		set_values();
	}
}


