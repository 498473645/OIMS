/******************************************** 定义变量 ************************************************/
var EMR_HUANZHEXINXI_URL = "/publish/huanZheXinXi/getHuanzhexinxiByBLH.htm";
var EMR_JIUZHEN_URL = "/publish/doctor/getMedicalRecords.htm";


var EMR_TAB_TITLE_URL_qg = "/publish/emr/gettabs_qg.htm";
var EMR_QGSS_SAVE_URL = "/publish/quguang/saveQgss.htm";
var EMR_QGSS_UPDATE_URL = "/publish/quguang/updateQgss.htm";
var EMR_QGSS_LIST_Url = "/publish/quguang/findQgssByBlhFy.htm";

var EMR_SHJL_SAVE_URL = "/publish/quguang/saveShjl.htm";
var EMR_SHJL_UPDATE_URL = "/publish/quguang/updateShjl.htm";
var EMR_SHJL_LIST_Url = "/publish/quguang/findShjlByBlhFy.htm";

var EMR_YY_SAVE_URL = "/publish/quguang/saveYy.htm";
var EMR_YY_UPDATE_URL = "/publish/quguang/updateYy.htm";
var EMR_YY_BLHFY_URL = "/publish/quguang/findQgYyByBlhFy.htm";
var EMR_YY_ALLFY_URL = "/publish/quguang/findQgYyAllFy.htm";
var EMR_YY_GET_URL = "/publish/quguang/getQgYyById.htm";

var EMR_BL_SAVE_URL = "/publish/quguang/saveQgbl.htm";
var EMR_BL_UPDATE_URL = "/publish/quguang/updateQgbl.htm";
var EMR_BL_BLHFY_URL = "/publish/quguang/findQgblByBlhFy.htm";
var EMR_BL_GET_URL = "/publish/quguang/getQgblById.htm";
var EMR_BL_LAST_URL = "/publish/quguang/getQgblLastOne.htm";


var EMR_JT_SAVE_URL = "/publish/quguang/saveQgJtssjl.htm";
var EMR_JT_UPDATE_URL = "/publish/quguang/updateQgJtssjl.htm";
var EMR_JT_BLHFY_URL = "/publish/quguang/findQgJtssjlByBlhFy.htm";
var EMR_JT_GET_URL = "/publish/quguang/getQgJtssjlById.htm";

var EMR_SHFC_SAVE_URL = "/publish/quguang/saveQgShfc.htm";
var EMR_SHFC_UPDATE_URL = "/publish/quguang/updateQgShfc.htm";
var EMR_SHFC_BLHFY_URL = "/publish/quguang/findQgShfcByBlhFy.htm";
var EMR_SHFC_GET_URL = "/publish/quguang/getQgShfcById.htm";

var EMR_ER_SAVE_URL = "/publish/quguang/saveQgErSsjl.htm";
var EMR_ER_UPDATE_URL = "/publish/quguang/updateQgErSsjl.htm";
var EMR_ER_BLHFY_URL = "/publish/quguang/findQgErSsjlByBlhFy.htm";
var EMR_ER_GET_URL = "/publish/quguang/getQgErSsjlById.htm";

var EMR_BLER_SAVE_URL = "/publish/quguang/saveQgblEr.htm";
var EMR_BLER_UPDATE_URL = "/publish/quguang/updateQgblEr.htm";
var EMR_BLER_BLHFY_URL = "/publish/quguang/findQgblErByBlhFy.htm";
var EMR_BLER_GET_URL = "/publish/quguang/getQgblErById.htm";

var EMR_SHFC_ER_SAVE_URL = "/publish/quguang/saveQgShfcEr.htm";
var EMR_SHFC_ER_UPDATE_URL = "/publish/quguang/updateQgShfcEr.htm";
var EMR_SHFC_ER_BLHFY_URL = "/publish/quguang/findQgShfcErByBlhFy.htm";
var EMR_SHFC_ER_GET_URL = "/publish/quguang/getQgShfcErById.htm";

var EMR_QGLC_SAVE_URL = "/publish/quguang/saveQglc.htm";
var EMR_QGLC_UPDATE_URL = "/publish/quguang/updateQglc.htm";
var EMR_QGLC_BLHFY_URL = "/publish/quguang/findQglcByBlhFy.htm";
var EMR_QGLC_GET_URL = "/publish/quguang/getQglcById.htm";



var SSJL_ZFZ = "/publish/quguang/getQgssByLc_id.htm";
var SHJL_ZFZ = "/publish/quguang/getShjlByLc_id.htm";
var YY = "/publish/quguang/getQgYyByLc_id.htm";
var BL_ZFZ = "/publish/quguang/getQgblByLc_id.htm";
var SSJL_JT = "/publish/quguang/getQgJtssjlByLc_id.htm";
var SHFC_JT = "/publish/quguang/getQgShfcByLc_id.htm";
var SSJL_ER = "/publish/quguang/getQgErSsjlByLc_id.htm";
var BL_ER = "/publish/quguang/getQgblErByLc_id.htm";
var SHFC_ER = "/publish/quguang/getQgShfcErByLc_id.htm";

var BL_ID_GET="/publish/quguang/getQglcByBl_id.htm";
var qg_doctor_priority={'0060':'胡春明','0316':'熊洁','0087':'张辰星'};
var qg_engineer_priority={'0053':'王科','0349':'罗启惠'};
var qg_nurse_priority={'0243':'王素华','0069':'周青青','0288':'李欢欢'};

/******************************************** 主体方法 ************************************************/
//屈光 程序入口
function _emr_preview_qg(id){
	$("#medicalRecordTab30009").remove();
	importJS("/js/commonLanguage.js");
	importJS("/js/jquery.createPageList.js");
	importJS("/subgroup/calendar/js/jscal2.js");
	importJS("/subgroup/calendar/js/en.js");
	importJS("/emr/js/emr_quGuang_getValues.js");
	importCSS("/subgroup/calendar/css/jscal2.css");
	view_qg(id);
	//签字
	qgqz();
	qulc_set();//流程id 保存在页面
	btn_update_ctrl();
	//构建记录者
	findRecorder();
	setValue_qg();//页面赋值
	
	$("#tabTitle").children(".tab_show").removeClass().addClass("tab_hide");
	$("#tabTitle").children("div:eq(5)").addClass("tab_show");
	var blh = $("#patientInfo").children("span").first().text();
	//赋值——患者基本信息
	bl_set_jbxx(blh);
}
//切换标签自动保存
function switchTagAutoSave(){
	var flag_id = $("#div_show_4_2_1").find(".tab_show").attr("id");
	if(flag_id=='30021' && $("#lc_id").text()=='无'){
		return false;
	}else{
		return true;
	}
//	var flag_id = $("#div_show_4_2_1").find(".tab_show").attr("id");
//	if(flag_id=='30021'){
//		if($("#sel_lev1").val()=="准分子"){
//			ti_bl_qg();
////			$.oimsConfirm("是否需要保存？",function(){
////				ti_bl_qg();
////			},function(){});
//		}else if($("#sel_lev1").val()=="晶体植入"){
//			$.oimsConfirm("是否需要保存？",function(){
//				ti_bl_qg();
//			},function(){});
//		}else if($("#sel_lev1").val()=="儿童屈光"){
//			$.oimsConfirm("是否需要保存？",function(){
//				ti_blEr_qg();
//			},function(){});
//		}
////		$.oimsConfirm("打印后页面将还原为最初页面，如果您没有提交当前页面，请先点击“提交”按钮！是否立即打印？",function(){
////		},function(){});
//	}else 
//	if(flag_id=='30023'){
//		ti_yy_qg();
//	}else if(flag_id=='30024'){
//		if($("#sel_lev1").val()=="准分子"){
//			ti_qgss();
//		}else if($("#sel_lev1").val()=="晶体植入"){
//			ti_jt_ssjl();
//		}else if($("#sel_lev1").val()=="儿童屈光"){
//			ti_er_ssjl();
//		}
//	}
//	else if(flag_id=='30025'){
//		if($("#sel_lev1").val()=="准分子"){
//			if($("#shjl_add").find("#qm").text()!=''){
//				$.oimsConfirm("是否需要保存？",function(){
//					ti_shjl();	
//				},function(){});
//			}
//		}else if($("#sel_lev1").val()=="晶体植入"){
//			if($("#shjl_add").find("#qm").text()!=''){
//				$.oimsConfirm("是否需要保存？",function(){
//					ti_shfc();	
//				},function(){});			
//			}
//		}else if($("#sel_lev1").val()=="儿童屈光"){
//			if($("#shjl_add").find("#qm").text()!=''){
//				$.oimsConfirm("是否需要保存？",function(){
//					ti_shfc_er();	
//				},function(){});			
//			}
//		}
//	} 
	
}

//既往病历
function _emr_show_jwbl(){
//	$("#ssfsfl").show();
//	$("#div_ssfs").show();
//	$("#div_show_4_2_2").html("<input type='button' value='test button' onclick='kaiyao_mx();'/>");
	$("#div_show_4_2_2").html("");
	var div_show_4_2_2 =  $("#div_show_4_2_2"); 

	//病例号
	var patientId = $("#patientInfo").children("span").first().text();
	historyList(patientId);
}
//开药
function kaiyao_mx(){
	var kaiyao = "";
	var blh = $("#patientInfo").children("span").first().text();
	var jz = getJiuzhen_qg(blh,"first");
	if(jz!=null){
		var data = getJSONData("/publish/chufang/findChufangQindan.htm",{jiuzhenId:jz.id});
		if(data!=null){
			var data_list = data.obj;
			$.each(data_list,function(i,item){
				var cfmx = item.cfqd;
				var yp = item.yaopin;
				kaiyao+="药名：";
				kaiyao+=cfmx.yaoming;
				kaiyao+=" 用法：";
				kaiyao+=cfmx.yongfa;
				kaiyao+=" 用量："
				kaiyao+=cfmx.yongliang+cfmx.yldanwei;
				kaiyao+=" 频率："+cfmx.yongyaopinlv;
				kaiyao+=";";
			});
		}
	}
	return kaiyao;
}
//既往病例
function historyList(blh) {
	var listFactor = {
		listObj : [ {
			title : "流程编号",
			key : "id"
		}, {
			title : "病例号",
			key : "blh"
		}, {
			title : "患者姓名",
			key : "xingming"
		},{
			title : "手术方式-1",
			key : "ssfs1"
		},{
			title : "手术方式-2",
			key : "ssfs2"
		},{
			title : "手术方式-3",
			key : "ssfs3"
		},{
			title : "当前环节",
			key : "state",
			func:function(value){
				if(value==0){
					return '病历'; 
				}else if(value==1){
					return '同意书';
				}else if(value==2){
					return '预约';
				}else if(value==3){
					return '手术记录';
				}else if(value==4){
					return '术后复查';
				}else if(value==5){
					return '完成';
				}else{
					return '';
				}
			}
		},{
			title : "流程开始",
			key : "startTime"
		},{
			title : "流程结束",
			key : "endTime"
		}],
		url : contextPath + "/publish/quguang/findQglcByBlhFy.htm?blh='"+blh+"'",
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : 6,// Page类的方法
			tag : Math.random()
		}
	};
	$("#pageList").remove();
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#div_show_4_2_2");
	$(div_list).createPageList(listFactor);
	sel_jwbl();//选择既往病历
	
}
//选择既往病例
function sel_jwbl(){
	$("#pageListTable td").bind("click",function(){
		//给流程id、环节名称赋值
		var lc_id = $(this).parent().children("td").eq(1).text();//流程id
		var lc_name = $(this).parent().children("td").eq(7).text();//环节名称
		$("#lc_id").text(lc_id);
		$("#lc_name").text(lc_name);
		var ssfs1 = $(this).parent().children("td").eq(4).text();//手术方式-1级菜单
		var ssfs2 = $(this).parent().children("td").eq(5).text();//手术方式-2级菜单
		var ssfs3 = $(this).parent().children("td").eq(6).text();//手术方式-3级菜单
		//给手术方式赋值
		$("#sel_lev1").val(ssfs1);
		fenlei_lev2();
		if(ssfs2!=null && ssfs2!=''){
			$("#sel_lev2").val(ssfs2);
			fenlei_lev3();	
		}else{
			$("#fenlei2").html("");
			$("#fenlei3").html("");
		}
		if(ssfs3!=null && ssfs3!=''){
			$("#sel_lev3").val(ssfs3);	
		}else{
			$("#fenlei3").html("");
		}
		$("#div_show_4_2_1").find(".tab_show").removeClass("tab_show").addClass("tab_hide");
		$("#30021").addClass("tab_show");
		$("#tag_ml").show();
		setValue_qg();
	});
}

//屈光主程序
function view_qg(id){
	var showHeight = getShowHeight_qg();
	//页面布局
	$(".medicalRecord").hide();
	var tag = $("#medicalRecordTab"+id);
	if(tag.length){
		tag.show();
		var blh = $("#patientInfo").children("span").first().text();
		//赋值——患者基本信息
		bl_set_jbxx(blh);
	}else{
		tag = $("<div />").attr("id","medicalRecordTab"+id).addClass("medicalRecord").attr("style","height:"+showHeight+"px;").appendTo("body");
		//var h = $("#visitRecord").height()-$("#tabTitle").outerHeight()-tag.outerHeight()-4;
		var h = showHeight;
		tag.height(h);
		var qgblyl_width = $("#tabTitle").width();
		//var tag1 = $("<div/>").attr("id","div_show_1").attr("style","width:"+qgblyl_width+"px;height:10px;background:;").appendTo("#medicalRecordTab"+id);
		//var tag3 = $("<div/>").attr("id","div_show_3").attr("style","width:"+qgblyl_width+"px;height:10px;background:;").appendTo("#medicalRecordTab"+id);
		var tag4 = $("<div/>").attr("id","div_show_4").attr("style","width:"+(qgblyl_width)+"px;height:"+(h-2)+"px;background:;").appendTo("#medicalRecordTab"+id);
		//var tag4_1 = $("<div/>").attr("id","div_show_4_1").attr("style","width:20px;height:"+(h-20)+"px;background:;float:left;").appendTo(tag4);
		var tag4_2 = $("<div/>").attr("id","div_show_4_2").attr("style","width:"+(qgblyl_width-43)+"px;height:"+(h-2)+"px;background;float:left;border-top:1px solid #d2d2d2;border-left:1px solid #d2d2d2;border-right:1px solid #d2d2d2;").appendTo(tag4);
		//var tag4_3 = $("<div/>").attr("id","div_show_4_3").attr("style","width:20px;height:"+(h-20)+"px;background:;float:left;").appendTo(tag4);
		var tag4_2_1 = $("<div/>").attr("id","div_show_4_2_1").attr("style","width:"+(qgblyl_width-40-3)+"px;height:28px;background:url(../style/green/images/thbg.png);border-bottom:1px solid #d2d2d2;border-right:1px solid #d2d2d2;padding-top:2px;").appendTo(tag4_2);
		var tag_ml =$("<div/>").attr("id","tag_ml").attr("style","width:"+(qgblyl_width-40)+"px;height:28px;background:url(../style/green/images/thbg.png);overflow:auto;").appendTo(tag4_2); 
		var ml_tag = "检查费：<input type='text' id='qg_jcf' style='width:100px;'/>&nbsp;<input type='text' id='jcf_rq' style='width:100px;'/>" +
				"&nbsp;手术费：<input type='text' id='ssfy' style='width:100px;'/>&nbsp;<input type='text' id='ssf_rq' style='width:100px;'/>";
		tag_ml.append(ml_tag);
		var tag4_2_2 = $("<div/>").attr("id","div_show_4_2_2").attr("style","width:"+(qgblyl_width-40)+"px;height: 550px;overflow-y: auto;").appendTo(tag4_2);
		//读病例模板
		_emr_show_bl();
		/*var blh = $("#patientInfo").children("span").first().text();
		//赋值——患者基本信息
		bl_set_jbxx(blh);*/
		//页签
		var tag = $(tag4_2_1);
		//if(tag.children().length)return;
		if(!tag.children().length){
			var data = getJSONData(EMR_TAB_TITLE_URL_qg,null,"POST");
			$.each(data,function(i,d){
				var div = $("<div/>").attr("id",d.id).appendTo(tag);
				$("<span />").text(d.category).appendTo(div);
				var className = i==0 ? "tab_show":"tab_hide";
				div.addClass(className).click(function(){
					if(d.id=='30021'){
						$("#tag_ml").show();
					}else{
						$("#tag_ml").hide();
					}
					if(d.id!='30021'){
						if($("#bl_submit").length){
							$("#bl_submit").remove();
						}
					}
					if(!$(this).hasClass("tab_show")){
						var bc = switchTagAutoSave();//自动保存
						if(!bc){//没保存
							$.oimsConfirm("当前病历尚未保存，是否继续？",function(){
								tag.find(".tab_show").removeClass("tab_show").addClass("tab_hide");
								$(this).addClass("tab_show");
								eval('('+d.intr+'('+d.id+'))');	
							},function(){});	
						}else{
							tag.find(".tab_show").removeClass("tab_show").addClass("tab_hide");
							$(this).addClass("tab_show");
							eval('('+d.intr+'('+d.id+'))');	
						}
					}
				});
			});
		}
		ssfsjl();//手术方式级联
		calendarFun_yy("ssf_rq");
		calendarFun_yy("jcf_rq");
	}
	
/*	//病例号
	var blh = $("#patientInfo").children("span").first().text();
	alert(blh);
	//赋值——患者基本信息
	bl_set_jbxx(blh);
	//赋值——问诊
	//bl_set_wz(blh);
*/}
//病例
function _emr_show_bl(){
	var ssfs = $("#sel_lev1").val();
	//不同的手术方式，不同的手术记录
	if(ssfs=='儿童屈光'){
		er_bl();
	}else{
		zfz_bl();
	}
	//btn_ctrl();//控制按钮
	//btn_update_ctrl();
	setValue_qg();//页面赋值
}
//儿童病历
function er_bl(){
	$("#ssfsfl").show();
	$("#div_ssfs").show();
	var test = blmb1(75);
	//$("#div_show_4_2_2").html(test);
	//移除提交栏
	if($("#bl_submit").length){
		$("#bl_submit").remove();
	}
	$("#div_show_4_2_2").html("<div id='show_bl_er'>"+test+"</div>");
	var div_show_4_2_2 =  $("#div_show_4_2_2"); 
	var div_bl = $("<div id='bl_submit' />").attr("style","width:100%;height:20px;text-align:center;").html("" +
			"<input type='hidden' id='blEr_id'/>" +
			"<input type='button' value='提交' style='width:60px;height:20px;' onclick='ti_blEr_qg(1)'/>&nbsp;&nbsp;" +
			"<input type='button' value='重置' style='width:60px;height:20px;' onclick='_emr_show_bl()'/>&nbsp;&nbsp;" +
			"<input type='button' value='打印' style='width:60px;height:20px;' onclick='print_qgbl_er()'/>").appendTo(div_show_4_2);
	//病例号
	var patientId = $("#patientInfo").children("span").first().text();
	//赋值——患者基本信息
	bl_set_jbxx_er(patientId);
	//赋值——问诊
	//bl_set_wz(patientId);
	//列表
	//showList_blEr(patientId);
	//sel_list_blEr();
	//btn_ctrl();
	btn_update_ctrl();
	setValue_qg();//页面赋值
	qgqz();//签字
	spts();
	calendarFun_yy("cli_date");
	calendarFun_yy("czrq");
}
//准分子病历
function zfz_bl(){
	$("#ssfsfl").show();
	$("#div_ssfs").show();
	var test = blmb1(63);
	//$("#div_show_4_2_2").html(test);
	//移除之前的提交栏
	if($("#bl_submit").length){
		$("#bl_submit").remove();
	}
	$("#div_show_4_2_2").html("<div id='show_bl'>"+test+"</div>");
	var div_show_4_2_2 =  $("#div_show_4_2_2"); 
	var div_bl = $("<div id='bl_submit'/>").attr("style","width:100%;height:20px;text-align:center;").html("" +
			"<input type='hidden' id='bl_id'/>" +
			//"<input type='button' value='取值测试' onclick='auto_fx_jzjl_qg()'/>&nbsp;&nbsp;" +
			"<input type='button' value='提交' style='width:60px;height:20px;' onclick='ti_bl_qg(1)'/>&nbsp;&nbsp;" +
			"<input type='button' value='重置' style='width:60px;height:20px;' onclick='_emr_show_bl()'/>&nbsp;&nbsp;" +
			"<input type='button' value='打印' style='width:60px;height:20px;' onclick='print_qgbl()'/>&nbsp;&nbsp;" +
			"<input type='button' value='精简打印' style='width:60px;height:20px;' onclick='print_qgbl_jj()'/>").appendTo(div_show_4_2);
	//病例号
	var patientId = $("#patientInfo").children("span").first().text();
	//赋值——患者基本信息
	bl_set_jbxx(patientId);
	//赋值——问诊
	//bl_set_wz(patientId);
	//列表
	//showList_bl(patientId);
	//sel_list_bl();
	qgqz();//签字
	btn_update_ctrl();
	setValue_qg();//页面赋值
	spts();
	calendarFun_yy("cli_date");
	findRecorder();
}
function findRecorder(){
	var list=findQgYgList();
	$("#recorder").empty();
	console.log("==========findRecorder===========");
	$("<option />").appendTo("#recorder");
	$.each(list,function(i,n){
		$('<option value='+n.gonghao+'/>').text(n.xingming).appendTo($("#recorder"));
	});
}
//重新加载病例
function reloadBlEr(){
	var test = blmb1(75);
	$("#show_bl_er").html(test);
	findRecorder();
}
//重新加载病例
function reloadBl(){
	var test = blmb1(63);
	$("#show_bl").html(test);
	findRecorder();
}

//儿童 病历赋值——患者基本信息
function bl_set_jbxx_er(blh){
	var jbxx = getJbxx_qg(blh);
	//$("#bingliNumber").text(jbxx.blbh);
	$("#show_bl_er").find("#suffererName").text(jbxx.name);
	$("#show_bl_er").find("#sex").text(jbxx.sex);
	$("#show_bl_er").find("#birthday").text(jbxx.birthday);
	$("#show_bl_er").find("#czrq").text(jbxx.jzrq);
	$("#show_bl_er").find("#address").val(jbxx.address);
	$("#show_bl_er").find("#cellphone").val(jbxx.dianhua);
	//$("#caseNumber").text(jbxx.jz_id);
	$("#show_bl_er").find("#caseNumber").text(jbxx.blh);
	$("#show_bl_er").find("#jhr").text(jbxx.hzlxr);
	//$("#show_bl_er").find("#cli_date").text(jbxx.jzrq);
}
function ssjl_set_jbxx(blh){
	var jbxx = getJbxx_qg(blh);
	$("#ssjl_show_div").find("#caseNumber").text(jbxx.blh);
	$("#ssjl_show_div").find("#suffererName").text(jbxx.name);
	$("#ssjl_show_div").find("#sex").text(jbxx.sex);
	$("#ssjl_show_div").find("#age").text(jbxx.age);
}
function shjl_set_jbxx(blh){
	var jbxx = getJbxx_qg(blh);
	$("#shjl_show_div").find("#caseNumber").text(jbxx.blh);
	$("#shjl_show_div").find("#suffererName").text(jbxx.name);
	$("#shjl_show_div").find("#sex").text(jbxx.sex);
	$("#shjl_show_div").find("#age").text(jbxx.age);
}
//病历赋值——患者基本信息
function bl_set_jbxx(blh){
	var jbxx = getJbxx_qg(blh);
	$("#show_bl").find("#caseNumber").text(jbxx.blh);
	//$("#caseNumber").text(jbxx.jz_id);
	//$("#bingliNumber").text(jbxx.blbh);
	$("#show_bl").find("#qqNumber").val(jbxx.qq);
	$("#show_bl").find("#suffererName").text(jbxx.name);
	$("#show_bl").find("#sex").text(jbxx.sex);
	$("#show_bl").find("#birthday").text(jbxx.birthday);
	$("#show_bl").find("#job").val(jbxx.gzdw);
	//$("#show_bl").find("#cli_date").text(jbxx.jzrq);
	$("#show_bl").find("#address").val(jbxx.address);
	$("#show_bl").find("#cellphone").val(jbxx.dianhua);
	$("#show_bl").find("#age").text(jbxx.age);
}


//病例取值  
function blEr_get(){
//	var czrq = new Date();
//	if($("#czrq").val()!=''){
//		czrq = new Date($("#czrq").val());
//	}
	var jzrq = new Date();
	if($("#cli_date").val()!=''){
		jzrq = new Date($("#cli_date").val());
	}
	var id = $("#blEr_id").val();
	if(id==""){
		id=null;
	}
	/*var ssfs="";
	if($("#sel_lev1").val()!=undefined){
		ssfs+=$("#sel_lev1").val();
	}
	if($("#sel_lev2").val()!=undefined){
		ssfs+=">"+$("#sel_lev2").val();
	}
	if($("#sel_lev3").val()!=undefined){
		ssfs+=">"+$("#sel_lev3").val();
	}*/
	var temp = {
			id:id,
			//czrq:czrq,
			jzrq:jzrq,
			blh:$("#caseNumber").text(),
			bingliNumber:$("#bingliNumber").val(),
			qgzs:$("#qgzs").html(),
			qgjws:$("#qgjws").html(),
			ywgms:$("#ywgms").html(),
			jtjss:$("#jtjss").html(),
			yb:$("input[name='yanbie']:checked").val(),
			yw_r:$("#yw_r").val(),
			yw_l:$("#yw_l").val(),
			ysl_r:$("#ysl_r").val(),
			jsl_r:$("#jsl_r").val(),
			ysl_l:$("#ysl_l").val(),
			jsl_l:$("#jsl_l").val(),
			jmzj_r:$("#jmzj_r").val(),
			jmzj_l:$("#jmzj_l").val(),
			tkzj_m_r:$("#tkzj_m_r").val(),
			tkzj_a_r:$("#tkzj_a_r").val(),
			tkzj_m_l:$("#tkzj_m_l").val(),
			tkzj_a_l:$("#tkzj_a_l").val(),
			yanya_r:$("#yanya_r").val(),
			yanya_l:$("#yanya_l").val(),
			jmdxt_K1_r:$("#jmdxt_K1_r").val(),
			jmdxt_a_r:$("#jmdxt_a_r").val(),
			jmdxt_K1_l:$("#jmdxt_K1_l").val(),
			jmdxt_a_l:$("#jmdxt_a_l").val(),
			jmdxt_K2_r:$("#jmdxt_K2_r").val(),
			jmdxt_DK_r:$("#jmdxt_DK_r").val(),
			jmdxt_K2_l:$("#jmdxt_K2_l").val(),
			jmdxt_DK_l:$("#jmdxt_DK_l").val(),
			dnyg_r1:$("#dnyg_r1").val(),
			dnyg_l1:$("#dnyg_l1").val(),
			dnyg_r2:$("#dnyg_r2").val(),
			dnyg_l2:$("#dnyg_l2").val(),
			dnyg_r3:$("#dnyg_r3").val(),
			dnyg_l3:$("#dnyg_l3").val(),
			
			ktjy_r1:$("#ktjy_r1").val(),
			ktjy_l1:$("#ktjy_l1").val(),
			ktjy_r2:$("#ktjy_r2").val(),
			ktjy_l2:$("#ktjy_l2").val(),
			ktjy_r3:$("#ktjy_r3").val(),
			ktjy_l3:$("#ktjy_l3").val(),
			
			ktsp_r1:$("#ktsp_r1").val(),
			ktsp_l1:$("#ktsp_l1").val(),
			ktsp_r2:$("#ktsp_r2").val(),
			ktsp_l2:$("#ktsp_l2").val(),
			ktsp_r3:$("#ktsp_r3").val(),
			ktsp_l3:$("#ktsp_l3").val(),
			ktsp_r4:$("#ktsp_r4").val(),
			ktsp_l4:$("#ktsp_l4").val(),
			
			xtjy_r1:$("#xtjy_r1").val(),
			xtjy_l1:$("#xtjy_l1").val(),
			xtjy_r2:$("#xtjy_r2").val(),
			xtjy_l2:$("#xtjy_l2").val(),
			xtjy_r3:$("#xtjy_r3").val(),
			xtjy_l3:$("#xtjy_l3").val(),
			xtjy_r4:$("#xtjy_r4").val(),
			xtjy_l4:$("#xtjy_l4").val(),
			
			xtsp_r1:$("#xtsp_r1").val(),
			xtsp_l1:$("#xtsp_l1").val(),
			xtsp_r2:$("#xtsp_r2").val(),
			xtsp_l2:$("#xtsp_l2").val(),
			xtsp_r3:$("#xtsp_r3").val(),
			xtsp_l3:$("#xtsp_l3").val(),
			xtsp_r4:$("#xtsp_r4").val(),
			xtsp_l4:$("#xtsp_l4").val(),
			
			zsxz_r:$("#zsxz_r").val(),
			zsxz_l:$("#zsxz_l").val(),
			jmhd_r:$("#jmhd_r").val(),
			jmhd_l:$("#jmhd_l").val(),
			tss:$("#tss").val(),
			rhfw:$("#rhfw").val(),
			lts:$("#lts").val(),
			xbdjc:$("#xbdjc").val(),
			zxad_r:$("#zxad_r").val(),
			zxad_l:$("#zxad_l").val(),
			yzcd_r:$("#yzcd_r").val(),
			yzcd_l:$("#yzcd_l").val(),
			PVEP_r:$("#PVEP_r").val(),
			PVEP_l:$("#PVEP_l").val(),
			lxdzx_r:$("#lxdzx_r").val(),
			lxdzx_l:$("#lxdzx_l").val(),
			npjjc_r:$("#npjjc_r").val(),
			npjjc_l:$("#npjjc_l").val(),
			smjjc_1_r:$("#smjjc_1_r").val(),
			smjjc_1_l:$("#smjjc_1_l").val(),
			smjjc_2_r:$("#smjjc_2_r").val(),
			smjjc_2_l:$("#smjjc_2_l").val(),
			clyj_r:$("#clyj_r").val(),
			bz:$("#bz").val(),
			wz_qz:$("#wz_qz_gh").text(),
			yw_qz:$("#yw_qz_gh").text(),
			sl_qz:$("#sl_qz_gh").text(),
			jmzj_qz:$("#jmzj_qz_gh").text(),
			tkzj_qz:$("#tkzj_qz_gh").text(),
			
			yanya_qz:$("#yanya_qz_gh").text(),
			jmdxt_qz:$("#jmdxt_qz_gh").text(),
			dnyg_qz:$("#dnyg_qz_gh").text(),
			ktjy_qz:$("#ktjy_qz_gh").text(),
			ktsp_qz:$("#ktsp_qz_gh").text(),
			xtjy_qz:$("#xtjy_qz_gh").text(),
			xtsp_qz:$("#xtsp_qz_gh").text(),
			zsxz_qz:$("#zsxz_qz_gh").text(),
			jmhd_qz:$("#jmhd_qz_gh").text(),
			tss_qz:$("#tss_qz_gh").text(),
			rhfw_qz:$("#rhfw_qz_gh").text(),
			lts_qz:$("#lts_qz_gh").text(),
			xbdjc_qz:$("#xbdjc_qz_gh").text(),
			zxad_qz:$("#zxad_qz_gh").text(),
			yzcd_qz:$("#yzcd_qz_gh").text(),
			PVEP_qz:$("#PVEP_qz_gh").text(),
			lxdzx_qz:$("#lxdzx_qz_gh").text(),
			npjjc_qz:$("#npjjc_qz_gh").text(),
			smjjc_qz:$("#smjjc_qz_gh").text(),
			clyj_qz:$("#clyj_qz_gh").text(),
			jhr:$("#jhr").val(),
			bz_qz:$("#bz_qz_gh").text(),
			//ssfs:ssfs,
			ssfy:$("#ssfy").val(),
			qg_jcf:$("#qg_jcf").val(),
			ssf_rq:$("#ssf_rq").val()==''?(new Date()):(new Date($("#ssf_rq").val())),
			jcf_rq:$("#jcf_rq").val()==''?(new Date()):(new Date($("#jcf_rq").val()))
			}
	return temp;
}
//病例取值
function bl_get(){
	var czrq = new Date();
	var jzrq = new Date();
	if($("#cli_date").val()!=''){
		jzrq = new Date($("#cli_date").val());
	}
	var id = $("#bl_id").val();
	if(id==""){
		id=null;
	}
//	var ssfs="";
//	if($("#sel_lev1").val()!=undefined){
//		ssfs+=$("#sel_lev1").val();
//	}
//	if($("#sel_lev2").val()!=undefined){
//		ssfs+=">"+$("#sel_lev2").val();
//	}
//	if($("#sel_lev3").val()!=undefined){
//		ssfs+=">"+$("#sel_lev3").val();
//	}
	var temp = {
			id:id,
			czrq:czrq,
			jzrq:jzrq,
			blh:$("#caseNumber").text(),
			bingliNumber:$("#bingliNumber").val(),
			
			qgzs:$("#qgzs").html(),
			qgjws:$("#qgjws").html(),
			ywgms:$("#ywgms").html(),
			jtjss:$("#jtjss").html(),
			
			yb:$("input[name='yanbie']:checked").val(),
			ysl_r:$("#ysl_r").val(),
			jsl_r:$("#jsl_r").val(),
			ysl_l:$("#ysl_l").val(),
			jsl_l:$("#jsl_l").val(),
			tkzj_m_r:$("#tkzj_m_r").val(),
			tkzj_a_r:$("#tkzj_a_r").val(),
			tkzj_m_l:$("#tkzj_m_l").val(),
			tkzj_a_l:$("#tkzj_a_l").val(),
			jmzj_r:$("#jmzj_r").val(),
			jmzj_l:$("#jmzj_l").val(),
			yanya_r:$("#yanya_r").val(),
			yanya_l:$("#yanya_l").val(),
			jmdxt_K1_r:$("#jmdxt_K1_r").val(),
			jmdxt_a_r:$("#jmdxt_a_r").val(),
			jmdxt_K1_l:$("#jmdxt_K1_l").val(),
			jmdxt_a_l:$("#jmdxt_a_l").val(),
			jmdxt_K2_r:$("#jmdxt_K2_r").val(),
			jmdxt_DK_r:$("#jmdxt_DK_r").val(),
			jmdxt_K2_l:$("#jmdxt_K2_l").val(),
			jmdxt_DK_l:$("#jmdxt_DK_l").val(),
			pxl_H_r:$("#pxl_H_r").val(),
			pxl_V_r:$("#pxl_V_r").val(),
			pxl_H_l:$("#pxl_H_l").val(),
			pxl_V_l:$("#pxl_V_l").val(),
			dnyg_r1:$("#dnyg_r1").val(),
			dnyg_l1:$("#dnyg_l1").val(),
			dnyg_r2:$("#dnyg_r2").val(),
			dnyg_l2:$("#dnyg_l2").val(),
			dnyg_r3:$("#dnyg_r3").val(),
			dnyg_l3:$("#dnyg_l3").val(),
			stjy_r1:$("#stjy_r1").val(),
			stjy_l1:$("#stjy_l1").val(),
			stjy_r2:$("#stjy_r2").val(),
			stjy_l2:$("#stjy_l2").val(),
			stjy_r3:$("#stjy_r3").val(),
			stjy_l3:$("#stjy_l3").val(),
			stsp_r1:$("#stsp_r1").val(),
			stsp_l1:$("#stsp_l1").val(),
			stsp_r2:$("#stsp_r2").val(),
			stsp_l2:$("#stsp_l2").val(),
			stsp_r3:$("#stsp_r3").val(),
			stsp_l3:$("#stsp_l3").val(),
			stsp_r4:$("#stsp_r4").val(),
			stsp_l4:$("#stsp_l4").val(),
			xtjy_r1:$("#xtjy_r1").val(),
			xtjy_l1:$("#xtjy_l1").val(),
			xtjy_r2:$("#xtjy_r2").val(),
			xtjy_l2:$("#xtjy_l2").val(),
			xtjy_r3:$("#xtjy_r3").val(),
			xtjy_l3:$("#xtjy_l3").val(),
			xtjy_r4:$("#xtjy_r4").val(),
			xtjy_l4:$("#xtjy_l4").val(),
			xtsp_r1:$("#xtsp_r1").val(),
			xtsp_l1:$("#xtsp_l1").val(),
			xtsp_r2:$("#xtsp_r2").val(),
			xtsp_l2:$("#xtsp_l2").val(),
			xtsp_r3:$("#xtsp_r3").val(),
			xtsp_l3:$("#xtsp_l3").val(),
			xtsp_r4:$("#xtsp_r4").val(),
			xtsp_l4:$("#xtsp_l4").val(),
			jmhd_r:$("#jmhd_r").val(),
			jmhd_l:$("#jmhd_l").val(),
			qjjc_r:$("#qjjc_r").val(),
			qjjc_l:$("#qjjc_l").val(),
			ydjc_r:$("#ydjc_r").val(),
			ydjc_l:$("#ydjc_l").val(),
			clyj:$("#clyj").val(),
			bz:$("#bz").val(),
			sl_qz:$("#sl_qz_gh").text(),
			tkzj_qz:$("#tkzj_qz_gh").text(),
			jmzj_qz:$("#jmzj_qz_gh").text(),
			yanya_qz:$("#yanya_qz_gh").text(),
			jmdxt_K1_qz:$("#jmdxt_K1_qz_gh").text(),
			jmdxt_K2_qz:$("#jmdxt_K2_qz_gh").text(),
			wz_qz:$("#wz_qz_gh").text(),
			pxl_qz:$("#pxl_qz_gh").text(),
			dnyg_qz:$("#dnyg_qz_gh").text(),
			stjy_qz:$("#stjy_qz_gh").text(),
			stsp_qz:$("#stsp_qz_gh").text(),
			xtjy_qz:$("#xtjy_qz_gh").text(),
			xtsp_qz:$("#xtsp_qz_gh").text(),
			jmhd_qz:$("#jmhd_qz_gh").text(),
			qjjc_qz:$("#qjjc_qz_gh").text(),
			ydjc_qz:$("#ydjc_qz_gh").text(),
			clyj_qz:$("#clyj_qz_gh").text(),
			bz_qz:$("#bz_qz_gh").text(),
		  //ssfs:ssfs,
			ssfy:$("#ssfy").val(),
			qg_jcf:$("#qg_jcf").val(),
			ssf_rq:$("#ssf_rq").val()==''?(new Date()):(new Date($("#ssf_rq").val())),
			jcf_rq:$("#jcf_rq").val()==''?(new Date()):(new Date($("#jcf_rq").val())),
			recorder:$("#recorder").val()
			}
	return temp;
}


//病历赋值——问诊
//function bl_set_wz(blh){
//	//就诊id
//	var data = getHuanzhexinxi(blh);
//	var jz = getJiuzhen(data.id);
//	var jzid = jz.id;
//	var tabData = getJSONData(EMR_TAB_CATEGORY,{categoryId:30001},"POST")
//	$.each(tabData,function(i,d){
//		$.ajax({
//				url : contextPath + EMR_GET_MEDICAL_RECORD,
//				data : {categoryId:d.categoryid,jiuzhenId:jzid},
//				type : "POST",
//				dataType : 'json',
//				success : function(data) {
//					if(data.state && data.obj!=null){
//						var ti = data.obj.jilu;
//						if(data.obj.jilu==null || data.obj.jilu==""){
//							ti = "";
//						}
//						if(i==0){//第一行
//							$("#qgzs").text(ti);
//						}else if(i==2){
//							$("#qgjws").text(ti);
//						}else if(i==3){
//							$("#ywgms").text(ti);
//						}else if(i==4){
//							$("#jtjss").text(ti);
//						}
//					}
//				}
//			});
//	});
//	if($("#qgzs").text()=="" ||$("#qgzs").text()=="qgzs"){
//		$("#qgzs").text("视力减退                年，配镜                年，现镜：右                度，左	                度，稳定                年");
//	}
//}

//同意书
function _emr_show_tys(){
	$("#ssfsfl").hide();
	$("#div_ssfs").hide();

	var test = "<div style='width:530px;height:100px;margin:auto;margin-top:200px;text-align:center;'><label style='font-size:35px;color:blue;'>请先提交病历，或者点击“既往病历”页签，选择一份病历！</label></div>";
	if($("#lc_id").text()!="无"){
		var ssfs = $("#sel_lev1").val();
		//不同的手术方式，不同的手术记录
		if(ssfs=='准分子' || ssfs=='晶体植入'){
			test = blmb1(64);
			$("#div_show_4_2_2").html(test);
			var div_bl = $("<div/>").attr("style","width:100%;height:20px;text-align:center;").html("<input id='print_qgbl' type='button' value='&nbsp;&nbsp;打印第一页&nbsp;&nbsp;' onclick='print_tys(1);'/>&nbsp;&nbsp;<input id='print_qgbl' type='button' value='&nbsp;&nbsp;打印第二页&nbsp;&nbsp;' onclick='print_tys(2);'/>&nbsp;&nbsp;<input id='print_qgbl' type='button' value='&nbsp;&nbsp;打印全部&nbsp;&nbsp;' onclick='print_tys(3);'/>&nbsp;&nbsp;").appendTo(div_show_4_2_2);
			var patientId = $("#patientInfo").children("span").first().text();
			tys_set(patientId);
		}else if(ssfs=='儿童屈光'){
			test = blmb1(73);
			$("#div_show_4_2_2").html(test);
			var div_bl = $("<div/>").attr("style","width:100%;height:20px;text-align:center;").html("<input id='print_qgbl' type='button' value='&nbsp;&nbsp;打印&nbsp;&nbsp;' onclick='print_tys_er();'/>").appendTo(div_show_4_2_2);
		}else{
			$("#div_show_4_2_2").html(test);
		}
		//setValue_qg();//页面赋值
	}else{
		$("#div_show_4_2_2").html(test);
	}
	
}
function tys_set(blh){
	var jbxx = getJbxx_qg(blh);
	$("#caseNumber").text(blh);
	$("#suffererName").text(jbxx.name);
	$("#sex").text(jbxx.sex);
	$("#age").text(jbxx.age);
}
//预约
function _emr_show_yy(){
	var lc_id = $("#lc_id").text();
	var ssfs = $("#sel_lev1").val();
	//不同的手术方式，不同的手术记录
	if(lc_id!="无" && (ssfs=='准分子' || ssfs=='晶体植入' || ssfs=='儿童屈光')){
		$("#ssfsfl").hide();
		$("#div_ssfs").hide();
		var div_body = $("#div_show_4_2_2").html("");
		$("<div/>").attr("style","width:90%;height:20px;margin-left:5%;").appendTo(div_body);
		//$("<div/>").attr("style","width:90%;height:20px;margin-left:5%;").appendTo(div_body).html("<h3>>>添加</h3>");
		var div_top = $("<div/>").attr("id","ssjl_add").attr("style","width:90%;height:200px;margin-left:5%;background:;border:0px solid #d2d2d2;").appendTo(div_body);
		$("<div/>").attr("style","width:90%;height:20px;margin-left:5%;").appendTo(div_body);
		//$("<div/>").attr("style","width:90%;height:20px;margin-left:5%;").appendTo(div_body).html("<h3>>>列表</h3>");
		//var div_bottom = $("<div/>").attr("id","yy_list").attr("style","width:90%;height:170px;margin-left:5%;background:;border:0px solid #d2d2d2;").appendTo(div_body);
		//添加
		var tbl_add = tbl_yy_add();
		$(tbl_add).appendTo(div_top);
		$("#ssfy1h").bind("blur",function(){
			if($("#ssfy1h").val()!=""){
				$("#ssfy1").val("");
			}
		});
		$("#ssfy2h").bind("blur",function(){
			if($("#ssfy2h").val()!=""){
				$("#ssfy2").val("");
			}
		});
		$("#ssfy3h").bind("blur",function(){
			if($("#ssfy3h").val()!=""){
				$("#ssfy3").val("");
			}
		});
		$("#ssfy4h").bind("blur",function(){
			if($("#ssfy4h").val()!=""){
				$("#ssfy4").val("");
			}
		});
		$("#ssfy5h").bind("blur",function(){
			if($("#ssfy5h").val()!=""){
				$("#ssfy5").val("");
			}
		});
		$("#ssfy6h").bind("blur",function(){
			if($("#ssfy6h").val()!=""){
				$("#ssfy6").val("");
			}
		});
		$("#yyxm1").bind("click",function(){
			if($(this).attr("checked")!="checked"){
				$("#ssfy1").val("");
				$("#ssfy1h").val("");
			}
			if($(this).attr("checked")=="checked"){
				$("#ssfy1").val("4800");
			}
		});
		$("#yyxm2").bind("click",function(){
			if($(this).attr("checked")!="checked"){
				$("#ssfy2").val("");
				$("#ssfy2h").val("");
			}
			if($(this).attr("checked")=="checked"){
				$("#ssfy2").val("6800");
			}
		});
		$("#yyxm3").bind("click",function(){
			if($(this).attr("checked")!="checked"){
				$("#ssfy3").val("");
				$("#ssfy3h").val("");
			}
			if($(this).attr("checked")=="checked"){
				$("#ssfy3").val("12800");
			}
		});
		$("#yyxm4").bind("click",function(){
			if($(this).attr("checked")!="checked"){
				$("#ssfy4").val("");
				$("#ssfy4h").val("");
			}
			if($(this).attr("checked")=="checked"){
				$("#ssfy4").val("3800");
			}
		});
		$("#yyxm5").bind("click",function(){
			if($(this).attr("checked")!="checked"){
				$("#ssfy5").val("");
				$("#ssfy5h").val("");
			}
			if($(this).attr("checked")=="checked"){
				$("#ssfy5").val("20800");
			}
		});
		$("#yyxm6").bind("click",function(){
			if($(this).attr("checked")!="checked"){
				$("#ssfy6").val("");
				$("#ssfy6h").val("");
			}
			if($(this).attr("checked")=="checked"){
				$("#ssfy6").val("10800");
			}
		});
		//列表
		//var blh = $("#patientInfo").children("span").first().text();
		//showList_yy(blh);//列表
		//$("#pageList").attr("style","width:100%;margin-left:-10px;margin-top:-7px;");
		//sel_list_yy();//列表选中行
		
		$("input[name='am']").bind("click",function(){
			var ymd = $("#rili").val();
			var hs = $(this).val();
			var ymdhs = ymd+" "+hs;
				$("#showTime_yy").text(ymdhs);
		});
		//calendarFun_yy1("rili",null);
		$("#yy_rili").bind("click",function(){
			calendarFun_yy1("rili",null);
		});
		var patientId = $("#patientInfo").children("span").first().text();
		yy_set_jbxx(patientId);
		qgqz_yy();
		//btn_ctrl();//按钮权限控制
	}else{
		$("#ssfsfl").hide();
		$("#div_ssfs").hide();
		$("#div_show_4_2_2").html("<div style='width:530px;height:100px;margin:auto;margin-top:200px;text-align:center;'><label style='font-size:35px;color:blue;'>请先提交病历，或者点击“既往病历”页签，选择一份病历！</label></div>");
	}
	
	setValue_qg();//页面赋值
	
}
//术后复查
function _emr_show_shfc(){
	if($("#lc_id").text()=='无'){
		$("#ssfsfl").hide();
		$("#div_ssfs").hide();
		$("#div_show_4_2_2").html("<div style='width:530px;height:100px;margin:auto;margin-top:200px;text-align:center;'><label style='font-size:35px;color:blue;'>请先提交病历，或者点击“既往病历”页签，选择一份病历！</label></div>");
	}else{
		var ssfs = $("#sel_lev1").val();
		//不同的手术方式，不同的手术记录
		if(ssfs=='儿童屈光'){
			shfc_er();
		}else if(ssfs=='晶体植入'){
			shfc_jt();
		}else if(ssfs=='准分子'){
			_emr_show_shjl();
		}else{
			$("#ssfsfl").hide();
			$("#div_ssfs").hide();
			$("#div_show_4_2_2").html("<div style='width:530px;height:100px;margin:auto;margin-top:200px;text-align:center;'><label style='font-size:35px;color:blue;'>请先提交病历，或者点击“既往病历”页签，选择一份病历！</label></div>");
		}
		qgqz();//签字
		//btn_ctrl();//按钮权限控制
		//setValue_qg();//页面赋值
		set_zfz_shfc_clyj();//开药赋值
	}
	
	
	
}
//术后复查 儿童
function shfc_er(){
	$("#ssfsfl").hide();
	$("#div_ssfs").hide();
	var div_body = $("#div_show_4_2_2").html("");
	$("<div/>").attr("style","width:90%;height:10px;margin-left:5%;").appendTo(div_body);
	//$("<div/>").attr("id","div_liebiao").attr("style","width:90%;height:20px;margin-left:5%;background:url(../style/green/images/thbg.png) repeat-x left;").appendTo(div_body).html("<h3>>>详情</h3>");
	var div_top = $("<div/>").attr("id","shfc_er_add").attr("style","width:90%;height:970px;margin-left:5%;background:;border:0px solid #d2d2d2;").appendTo(div_body);
	$("<div/>").attr("style","width:90%;height:20px;margin-left:5%;").appendTo(div_body);
	//$("<div/>").attr("style","width:90%;height:20px;margin-left:5%;background:url(../style/green/images/thbg.png) repeat-x left;").appendTo(div_body).html("<h3>>>列表</h3>");
	var div_bottom = $("<div/>").attr("id","shfc_er_list").attr("style","width:90%;height:170px;margin-left:5%;background:;border:0px solid #d2d2d2;").appendTo(div_body);
	//添加
	reset_shfc_top_er();
	
	//列表
	var patientId = $("#patientInfo").children("span").first().text();
	showList_shfc_er(patientId);
	sel_list_shfc_er();
	qgqz();//签字
}
//晶体术后复查
function shfc_jt(){
	$("#ssfsfl").hide();
	$("#div_ssfs").hide();
	var div_body = $("#div_show_4_2_2").html("");
	$("<div/>").attr("style","width:90%;height:10px;margin-left:5%;").appendTo(div_body);
	//$("<div/>").attr("id","div_liebiao").attr("style","width:90%;height:20px;margin-left:5%;background:url(../style/green/images/thbg.png) repeat-x left;").appendTo(div_body).html("<h3>>>详情</h3>");
	var div_top = $("<div/>").attr("id","shfc_add").attr("style","width:90%;height:962px;margin-left:5%;background:;border:0px solid #d2d2d2;").appendTo(div_body);
	$("<div/>").attr("style","width:90%;height:20px;margin-left:5%;").appendTo(div_body);
	//$("<div/>").attr("style","width:90%;height:20px;margin-left:5%;background:url(../style/green/images/thbg.png) repeat-x left;").appendTo(div_body).html("<h3>>>列表</h3>");
	var div_bottom = $("<div/>").attr("id","shfc_list").attr("style","width:90%;height:170px;margin-left:5%;background:;border:0px solid #d2d2d2;").appendTo(div_body);
	//添加
	reset_shfc_top();
//	calendarFun_yy("kssj");
//	calendarFun_yy("jssj");
//	//列表
	var patientId = $("#patientInfo").children("span").first().text();
	showList_shfc(patientId);
	sel_list_shfc();
}
//儿童 术后复查 添加
function reset_shfc_top_er(){
	var div_top = $("#shfc_er_add").html(blmb1(76));
	$("<div/>").attr("style","width:100%;height:20px;text-align:center;margin-top:0px;").html("" +
			"<input type='hidden' id='shfc_er_id'/>" +
			"<input type='button' value='提交' style='width:60px;height:20px;' onclick='ti_shfc_er(1)'/>&nbsp;&nbsp;&nbsp;&nbsp;" +
			"<input type='button' value='重置' style='width:60px;height:20px;' onclick='_emr_show_shfc();'/>&nbsp;&nbsp;&nbsp;&nbsp;" +
			"<input type='button' value='打印' style='width:60px;height:20px;' onclick='print_shfc_er()'/>").appendTo(div_top);
/*		calendarFun_yy("ssrq_l");
		calendarFun_yy("ssrq_r");*/
		//基本信息赋值
		var patientId = $("#patientInfo").children("span").first().text();
		var jbxx = getJbxx_qg(patientId);
		$("#suffererName").text(jbxx.name);
		$("#sex").text(jbxx.sex);
		$("#age").text(jbxx.age);
		$("#blh").text(jbxx.blh);
		var sj = new Date();
		$("#nian").text(sj.getFullYear());
		$("#yue").text(sj.getMonth()+1);
		$("#ri").text(sj.getDate());
}
//术后复查 添加
function reset_shfc_top(){
	var div_top = $("#shfc_add").html(blmb1(72));
	$("<div/>").attr("style","width:100%;height:20px;text-align:center;margin-top:0px;").html("" +
			"<input type='hidden' id='shjl_id'/>" +
			"<input type='button' value='提交' style='width:60px;height:20px;' onclick='ti_shfc(1)'/>&nbsp;&nbsp;&nbsp;&nbsp;" +
			"<input type='button' value='重置' style='width:60px;height:20px;' onclick='_emr_show_shfc();'/>&nbsp;&nbsp;&nbsp;&nbsp;" +
			"<input type='button' value='打印' style='width:60px;height:20px;' onclick='print_shfc()'/>").appendTo(div_top);
/*		calendarFun_yy("ssrq_l");
		calendarFun_yy("ssrq_r");*/
		//基本信息赋值
		var patientId = $("#patientInfo").children("span").first().text();
		var jbxx = getJbxx_qg(patientId);
		$("#suffererName").text(jbxx.name);
		$("#sex").text(jbxx.sex);
		$("#age").text(jbxx.age);
		$("#blh").text(jbxx.blh);
		var sj = new Date();
		$("#nian").text(sj.getFullYear());
		$("#yue").text(sj.getMonth()+1);
		$("#ri").text(sj.getDate());
}
//打印
function print_shfc(){
	$("input[type='checkbox']").each(function(){
		if($(this).attr("checked")=="checked"){
			$(this).replaceWith("√");
		}else{
			$(this).remove();
		}
	});
	var sn_r = "";
	var ticl_wz_r = $("input[name='ticl_wz_r']:checked").val();
	if(ticl_wz_r=="s"){
		sn_r = "顺";
	}else if(ticl_wz_r=="n"){
		sn_r = "逆";
	}
	var ticl_wz_d_r = $("#ticl_wz_d_r").val();
	sn_r+="  "+ticl_wz_d_r+"  °";
	$("input[name='ticl_wz_r']:checked").parent().html(sn_r);

	var sn_l = "";
	var ticl_wz_l = $("input[name='ticl_wz_l']:checked").val();
	if(ticl_wz_l=="s"){
		sn_l = "顺";
	}else if(ticl_wz_l=="n"){
		sn_l = "逆";
	}
	var ticl_wz_d_l = $("#ticl_wz_d_l").val();
	sn_l+="  "+ticl_wz_d_l+"  °";
	$("input[name='ticl_wz_l']:checked").parent().html(sn_l);
	$("#shfc_print").printArea();
}
//打印 儿童
function print_shfc_er(){
	$("#shfc_print_er").printArea();
}
//提交 术后复查 儿童
function ti_shfc_er(autoSaveTag){
	if($("#sel_lev1").val()=="--请选择--"){
		$.oimsAlert("请选择手术方式！")
	}else{
		var temp = shfc_er_get();
		temp.lc_id = $("#lc_id").text();
		var url_shfc_er = "";
		if(temp.id==null){//添加
			url_shfc_er = EMR_SHFC_ER_SAVE_URL;
		}else{
			url_shfc_er = EMR_SHFC_ER_UPDATE_URL;
		}
		$.ajax({
			url : contextPath + url_shfc_er,
			data : temp,
			type : "POST",
			dataType : 'json',
			success : function(data) {
				if(data.state==1){
					if(autoSaveTag==1){
						_emr_show_shfc();
						$.oimsSucc('操作成功！');	
					}
				}else{
					$.oimsAlert('操作失败！');
				}
			}
		});
		
	}
}
//提交
function ti_shfc(autoSaveTag){
	if($("#sel_lev1").val()=="--请选择--"){
		$.oimsAlert("请选择手术方式！")
	}else{
		var temp = shfc_get();
		temp.lc_id = $("#lc_id").text();
		var url_shfc = "";
		if(temp.id==null){//添加
			url_shfc = EMR_SHFC_SAVE_URL;
		}else{
			url_shfc = EMR_SHFC_UPDATE_URL;
		}
		$.ajax({
			url : contextPath + url_shfc,
			data : temp,
			type : "POST",
			dataType : 'json',
			success : function(data) {
				if(data.state==1){
					if(autoSaveTag==1){
						_emr_show_shfc();
						$.oimsSucc('操作成功！');	
					}
				}else{
					$.oimsAlert('操作失败！');
				}
			}
		});
	}
}
//术后复查 赋值
function shfc_set(data){
	$("#shjl_id").val(data.id);
	$("#blh").val(data.blh);
	var sj = new Date(data.sj.time);
	$("#nian").text(sj.getFullYear());
	$("#yue").text(sj.getMonth()+1);
	$("#ri").text(sj.getDate());
	//特殊不适
	for(var i=1;i<6;i++){
		if(data.tsbs_r.indexOf(i)>-1){
			$("#tsbs_r"+i).attr("checked",true);
		}	
		if(data.tsbs_l.indexOf(i)>-1){
			$("#tsbs_l"+i).attr("checked",true);
		}	
	}

	$("#tsbs_qz").text(getUser1(data.tsbs_qz));
	$("#tsbs_qz_gh").text(data.tsbs_qz);
	
	for(var i=1;i<5;i++){
		//眩晕-右
		if(data.xy_r.indexOf(i)>-1){
			$("#xy_r"+i).attr("checked",true);
		}	
		//眩晕-左
		if(data.xy_l.indexOf(i)>-1){
			$("#xy_l"+i).attr("checked",true);
		}	
		//畏光-右
		if(data.wg_r.indexOf(i)>-1){
			$("#wg_r"+i).attr("checked",true);
		}	
		//畏光-左
		if(data.wg_l.indexOf(i)>-1){
			$("#wg_l"+i).attr("checked",true);
		}
		//视疲劳-右
		if(data.spl_r.indexOf(i)>-1){
			$("#spl_r"+i).attr("checked",true);
		}	
		//视疲劳-左
		if(data.spl_l.indexOf(i)>-1){
			$("#spl_l"+i).attr("checked",true);
		}
		//眩光-右
		if(data.xg_r.indexOf(i)>-1){
			$("#xg_r"+i).attr("checked",true);
		}	
		//眩光-左
		if(data.xg_l.indexOf(i)>-1){
			$("#xg_l"+i).attr("checked",true);
		}
		//阅读困难-右
		if(data.ydkn_r.indexOf(i)>-1){
			$("#ydkn_r"+i).attr("checked",true);
		}	
		//阅读困难-左
		if(data.ydkn_l.indexOf(i)>-1){
			$("#ydkn_l"+i).attr("checked",true);
		}
	}
	$("#xy_qz").text(getUser1(data.xy_qz));
	$("#xy_qz_gh").text(data.xy_qz);
	
	$("#wg_qz").text(getUser1(data.wg_qz));
	$("#wg_qz_gh").text(data.wg_qz);
	
	$("#spl_qz").text(getUser1(data.spl_qz));
	$("#spl_qz_gh").text(data.spl_qz);
	
	$("#xg_qz").text(getUser1(data.xg_qz));
	$("#xg_qz_gh").text(data.xg_qz);
	
	$("#ydkn_qz").text(getUser1(data.ydkn_qz));
	$("#ydkn_qz_gh").text(data.ydkn_qz);
	
	$("#lysl_r").val(data.lysl_r);
	$("#djsl_r").val(data.djsl_r);
	$("#lysl_l").val(data.lysl_l);
	$("#djsl_l").val(data.djsl_l);
	$("#sl_qz").text(getUser1(data.sl_qz));
	$("#sl_qz_gh").text(data.sl_qz);
	$("#yy_r").val(data.yy_r);
	$("#yy_l").val(data.yy_l);
	$("#yy_qz").text(getUser1(data.yy_qz));
	$("#yy_qz_gh").text(data.yy_qz);
	$("#qjjc_r").val(data.qjjc_r);
	$("#qjjc_l").val(data.qjjc_l);
	$("#qjjc_qz").text(getUser1(data.qjjc_qz));
	$("#qjjc_qz_gh").text(data.qjjc_qz);
	
	$("#ydjc_r").val(data.ydjc_r);
	$("#ydjc_l").val(data.ydjc_l);
	$("#ydjc_qz").text(getUser1(data.ydjc_qz));
	$("#ydjc_qz_gh").text(data.ydjc_qz);
	$("#dnyg_ds_r1").val(data.dnyg_ds_r1);
	$("#dnyg_ds_r").val(data.dnyg_ds_r);
	$("#dnyg_dc_r").val(data.dnyg_dc_r);
	$("#dnyg_ds_l1").val(data.dnyg_ds_l1);
	$("#dnyg_ds_l").val(data.dnyg_ds_l);
	$("#dnyg_dc_l").val(data.dnyg_dc_l);
	$("#dnyg_qz").text(getUser1(data.dnyg_qz));
	$("#dnyg_qz_gh").text(data.dnyg_qz);
	
	$("#ktjy_ds_r1").val(data.ktjy_ds_r1);
	$("#ktjy_ds_r").val(data.ktjy_ds_r);
	$("#ktjy_dc_r").val(data.ktjy_dc_r);
	$("#ktjy_ds_l1").val(data.ktjy_ds_l1);
	$("#ktjy_ds_l").val(data.ktjy_ds_l);
	$("#ktjy_dc_l").val(data.ktjy_dc_l);
	$("#ktjy_qz").text(getUser1(data.ktjy_qz));
	$("#ktjy_qz_gh").text(data.ktjy_qz);
	
	$("#ktsp_ds_r1").val(data.ktsp_ds_r1);
	$("#ktsp_ds_r").val(data.ktsp_ds_r);
	$("#ktsp_dc_r").val(data.ktsp_dc_r);
	$("#ktsp_jt_r").val(data.ktsp_jt_r);
	$("#ktsp_ds_l1").val(data.ktsp_ds_l1);
	$("#ktsp_ds_l").val(data.ktsp_ds_l);
	$("#ktsp_dc_l").val(data.ktsp_dc_l);
	$("#ktsp_jt_l").val(data.ktsp_jt_l);
	$("#ktsp_qz").text(getUser1(data.ktsp_qz));
	$("#ktsp_qz_gh").text(data.ktsp_qz);
	$("#xtjy_ds_r1").val(data.xtjy_ds_r1);
	$("#xtjy_ds_r").val(data.xtjy_ds_r);
	$("#xtjy_dc_r").val(data.xtjy_dc_r);
	$("#xtjy_jt_r").val(data.xtjy_jt_r);
	$("#xtjy_ds_l1").val(data.xtjy_ds_l1);
	$("#xtjy_ds_l").val(data.xtjy_ds_l);
	$("#xtjy_dc_l").val(data.xtjy_dc_l);
	$("#xtjy_jt_l").val(data.xtjy_jt_l);
	$("#xtjy_qz").text(getUser1(data.xtjy_qz));
	$("#xtjy_qz_gh").text(data.xtjy_qz);
	
	$("#xtsp_ds_r1").val(data.xtsp_ds_r1);
	$("#xtsp_ds_r").val(data.xtsp_ds_r);
	$("#xtsp_dc_r").val(data.xtsp_dc_r);
	$("#xtsp_jt_r").val(data.xtsp_jt_r);
	$("#xtsp_ds_l1").val(data.xtsp_ds_l1);
	$("#xtsp_ds_l").val(data.xtsp_ds_l);
	$("#xtsp_dc_l").val(data.xtsp_dc_l);
	$("#xtsp_jt_l").val(data.xtsp_jt_l);
	$("#xtsp_qz").text(getUser1(data.xtsp_qz));
	$("#xtsp_qz_gh").text(data.xtsp_qz);
	
	$("#ubm_gg_r").val(data.ubm_gg_r);
	$("#ubm_qfsd_r").val(data.ubm_qfsd_r);
	$("#ubm_gg_l").val(data.ubm_gg_l);
	$("#ubm_qfsd_l").val(data.ubm_qfsd_l);
	$("#ubm_qz").text(getUser1(data.ubm_qz));
	$("#ubm_qz_gh").text(data.ubm_qz);
	
	$("#jmnp_cd_r").val(data.jmnp_cd_r);
	$("#jmnp_bfb_r").val(data.jmnp_bfb_r);
	$("#jmnp_cd_l").val(data.jmnp_cd_l);
	$("#jmnp_bfb_l").val(data.jmnp_bfb_l);
	$("#jmnp_qz").text(getUser1(data.jmnp_qz));
	$("#jmnp_qz_gh").text(data.jmnp_qz);
	
	var ticl_wz_r = data.ticl_wz_r;
	if(ticl_wz_r=="s"){
		$("#ticl_wz_s_r").attr("checked","checked");
	}else if(ticl_wz_r=="n"){
		$("#ticl_wz_n_r").attr("checked","checked");
	}
	$("#ticl_wz_d_r").val(data.ticl_wz_d_r);
	var ticl_wz_l = data.ticl_wz_l;
	if(ticl_wz_l=="s"){
		$("#ticl_wz_s_l").attr("checked","checked");
	}else if(ticl_wz_r=="n"){
		$("#ticl_wz_n_l").attr("checked","checked");
	}
	$("#ticl_wz_d_l").val(data.ticl_wz_d_l);
	$("#ticl_wz_qz").text(getUser1(data.ticl_wz_qz));
	$("#ticl_wz_qz_gh").text(data.ticl_wz_qz);
	$("#qt").val(data.qt);
	$("#qt_qz").text(getUser1(data.qt_qz));
	$("#qt_qz_gh").text(data.qt_qz);
	var kaiyao = kaiyao_mx()==null?'':kaiyao_mx();
	var clyj_r = data.clyj_r;
	if(clyj_r==null || clyj_r == ''){
		clyj_r = kaiyao;
	}else{
		if(clyj_r.indexOf(kaiyao)>-1){
			clyj_r = data.clyj_r;
		}else{
			clyj_r = clyj_r+" "+kaiyao;
		}
	}
	$("#clyj_r").val(clyj_r);
	$("#clyj_qz").text(getUser1(data.clyj_qz));
	$("#clyj_qz_gh").text(data.clyj_qz);
}
//术后复查 赋值
function shfc_er_set(data){
	$("#shfc_er_id").val(data.id);
	$("#blh").val(data.blh);
	var sj = new Date(data.sj.time);
	$("#nian").text(sj.getFullYear());
	$("#yue").text(sj.getMonth()+1);
	$("#ri").text(sj.getDate());
	$("#yw_r").val(data.yw_r);
	$("#yw_l").val(data.yw_l);
	$("#yw_qz").text(getUser1(data.yw_qz));
	$("#yw_qz_gh").text(data.yw_qz);
	$("#sl_y_r").val(data.sl_y_r);
	$("#sl_y_l").val(data.sl_y_l);
	$("#sl_j_r").val(data.sl_j_r);
	$("#sl_j_l").val(data.sl_j_l);
	$("#sl_qz").text(getUser1(data.sl_qz));
	$("#sl_qz_gh").text(data.sl_qz);
	$("#jmzj_r").val(data.jmzj_r);
	$("#jmzj_l").val(data.jmzj_l);
	$("#jmzj_qz").text(getUser1(data.jmzj_qz));
	$("#jmzj_qz_gh").text(data.jmzj_qz);
	$("#tkzj_r").val(data.tkzj_r);
	$("#tkzj_l").val(data.tkzj_l);
	$("#tkzj_qz").text(getUser1(data.tkzj_qz));
	$("#tkzj_qz_gh").text(data.tkzj_qz);
	$("#yy_r").val(data.yy_r);
	$("#yy_l").val(data.yy_l);
	$("#yy_qz").text(getUser1(data.yy_qz));
	$("#yy_qz_gh").text(data.yy_qz);
	
	$("#dnyg_r1").val(data.dnyg_r1);
	$("#dnyg_l1").val(data.dnyg_l1);
	$("#dnyg_r2").val(data.dnyg_r2);
	$("#dnyg_l2").val(data.dnyg_l2);
	$("#dnyg_r3").val(data.dnyg_r3);
	$("#dnyg_l3").val(data.dnyg_l3);
	$("#dnyg_qz").text(getUser1(data.dnyg_qz));
	$("#dnyg_qz_gh").text(data.dnyg_qz);
	$("#ktjy_r1").val(data.ktjy_r1);
	$("#ktjy_l1").val(data.ktjy_l1);
	$("#ktjy_r2").val(data.ktjy_r2);
	$("#ktjy_l2").val(data.ktjy_l2);
	$("#ktjy_r3").val(data.ktjy_r3);
	$("#ktjy_l3").val(data.ktjy_l3);
	$("#ktjy_qz").text(getUser1(data.ktjy_qz));
	$("#ktjy_qz_gh").text(data.ktjy_qz);
	$("#ktsp_r1").val(data.ktsp_r1);
	$("#ktsp_l1").val(data.ktsp_l1);
	$("#ktsp_r2").val(data.ktsp_r2);
	$("#ktsp_l2").val(data.ktsp_l2);
	$("#ktsp_r3").val(data.ktsp_r3);
	$("#ktsp_l3").val(data.ktsp_l3);
	$("#ktsp_r4").val(data.ktsp_r4);
	$("#ktsp_l4").val(data.ktsp_l4);
	$("#ktsp_qz").text(getUser1(data.ktsp_qz));
	$("#ktsp_qz_gh").text(data.ktsp_qz);
	$("#xtjy_r1").val(data.xtjy_r1);
	$("#xtjy_l1").val(data.xtjy_l1);
	$("#xtjy_r2").val(data.xtjy_r2);
	$("#xtjy_l2").val(data.xtjy_l2);
	$("#xtjy_r3").val(data.xtjy_r3);
	$("#xtjy_l3").val(data.xtjy_l3);
	$("#xtjy_r4").val(data.xtjy_r4);
	$("#xtjy_l4").val(data.xtjy_l4);
	$("#xtjy_qz").text(getUser1(data.xtjy_qz));
	$("#xtjy_qz_gh").text(data.xtjy_qz);
	$("#xtsp_r1").val(data.xtsp_r1);
	$("#xtsp_l1").val(data.xtsp_l1);
	$("#xtsp_r2").val(data.xtsp_r2);
	$("#xtsp_l2").val(data.xtsp_l2);
	$("#xtsp_r3").val(data.xtsp_r3);
	$("#xtsp_l3").val(data.xtsp_l3);
	$("#xtsp_r4").val(data.xtsp_r4);
	$("#xtsp_l4").val(data.xtsp_l4);
	$("#xtsp_qz").text(getUser1(data.xtsp_qz));
	$("#xtsp_qz_gh").text(data.xtsp_qz);
	
	$("#zsxz_r").val(data.zsxz_r);
	$("#zsxz_l").val(data.zsxz_l);
	$("#zsxz_qz").text(getUser1(data.zsxz_qz));
	$("#zsxz_qz_gh").text(data.zsxz_qz);
	$("#jmdxt_r").val(data.jmdxt_r);
	$("#jmdxt_l").val(data.jmdxt_l);
	$("#jmdxt_qz").text(getUser1(data.jmdxt_qz));
	$("#jmdxt_qz_gh").text(data.jmdxt_qz);
	$("#jmhd_r").val(data.jmhd_r);
	$("#jmhd_l").val(data.jmhd_l);
	$("#jmhd_qz").text(getUser1(data.jmhd_qz));
	$("#jmhd_qz_gh").text(data.jmhd_qz);
	$("#tss_r").val(data.tss_r);
	$("#tss_l").val(data.tss_l);
	$("#tss_qz").text(getUser1(data.tss_qz));
	$("#tss_qz_gh").text(data.tss_qz);
	$("#rhfw_r").val(data.rhfw_r);
	$("#rhfw_l").val(data.rhfw_l);
	$("#rhfw_qz").text(getUser1(data.rhfw_qz));
	$("#rhfw_qz_gh").text(data.rhfw_qz);
	$("#lts_r").val(data.lts_r);
	$("#lts_l").val(data.lts_l);
	$("#lts_qz").text(getUser1(data.lts_qz));
	$("#lts_qz_gh").text(data.lts_qz);
	$("#xbdjc_r").val(data.xbdjc_r);
	$("#xbdjc_l").val(data.xbdjc_l);
	$("#xbdjc_qz").text(getUser1(data.xbdjc_qz));
	$("#xbdjc_qz_gh").text(data.xbdjc_qz);
	$("#zxad_r").val(data.zxad_r);
	$("#zxad_l").val(data.zxad_l);
	$("#zxad_qz").text(getUser1(data.zxad_qz));
	$("#zxad_qz_gh").text(data.zxad_qz);
	
	$("#yzcd_r").val(data.yzcd_r);
	$("#yzcd_l").val(data.yzcd_l);
	$("#yzcd_qz").text(getUser1(data.yzcd_qz));
	$("#yzcd_qz_gh").text(data.yzcd_qz);
	$("#PVEP_r").val(data.PVEP_r);
	$("#PVEP_l").val(data.PVEP_l);
	$("#PVEP_qz").text(getUser1(data.PVEP_qz));
	$("#PVEP_qz_gh").text(data.PVEP_qz);
	$("#lxdzx_r").val(data.lxdzx_r);
	$("#lxdzx_l").val(data.lxdzx_l);
	$("#lxdzx_qz").text(getUser1(data.lxdzx_qz));
	$("#lxdzx_qz_gh").text(data.lxdzx_qz);
	$("#npjjc_r").val(data.npjjc_r);
	$("#npjjc_l").val(data.npjjc_l);
	$("#npjjc_qz").text(getUser1(data.npjjc_qz));
	$("#npjjc_qz_gh").text(data.npjjc_qz);
	$("#shmzjl").val(data.shmzjl);
}
//术后复查 取值
function shfc_get(){
	var id = $("#shjl_id").val()==''?null:$("#shjl_id").val();
	var sj = new Date();
	//特殊不适-右
	var tsbs_r = $("input[name='tsbs_r']:checked");
	var tsbs_rs = "";
	$.each(tsbs_r,function(i,item){
		tsbs_rs+=$(item).val();
	});
	//特殊不适-左
	var tsbs_l = $("input[name='tsbs_l']:checked");
	var tsbs_ls = "";
	$.each(tsbs_l,function(i,item){
		tsbs_ls+=$(item).val();
	});
	//眩晕-右
	var xy_r = $("input[name='xy_r']:checked");
	var xy_rs = "";
	$.each(xy_r,function(i,item){
		xy_rs+=$(item).val();
	});
	//眩晕-左
	var xy_l = $("input[name='xy_l']:checked");
	var xy_ls = "";
	$.each(xy_l,function(i,item){
		xy_ls+=$(item).val();
	});
	//畏光-右
	var wg_r = $("input[name='wg_r']:checked");
	var wg_rs = "";
	$.each(wg_r,function(i,item){
		wg_rs+=$(item).val();
	});
	//畏光-左
	var wg_l = $("input[name='wg_l']:checked");
	var wg_ls = "";
	$.each(wg_l,function(i,item){
		wg_ls+=$(item).val();
	});
	//视疲劳-右
	var spl_r = $("input[name='spl_r']:checked");
	var spl_rs = "";
	$.each(spl_r,function(i,item){
		spl_rs+=$(item).val();
	});
	//视疲劳-左
	var spl_l = $("input[name='spl_l']:checked");
	var spl_ls = "";
	$.each(spl_l,function(i,item){
		spl_ls+=$(item).val();
	});
	//眩光-右
	var xg_r = $("input[name='xg_r']:checked");
	var xg_rs = "";
	$.each(xg_r,function(i,item){
		xg_rs+=$(item).val();
	});
	//眩光-左
	var xg_l = $("input[name='xg_l']:checked");
	var xg_ls = "";
	$.each(xg_l,function(i,item){
		xg_ls+=$(item).val();
	});
	//阅读困难-右
	var ydkn_r = $("input[name='ydkn_r']:checked");
	var ydkn_rs = "";
	$.each(ydkn_r,function(i,item){
		ydkn_rs+=$(item).val();
	});
	//阅读困难-左
	var ydkn_l = $("input[name='ydkn_l']:checked");
	var ydkn_ls = "";
	$.each(ydkn_l,function(i,item){
		ydkn_ls+=$(item).val();
	});
	//TICL位置顺/逆
	var ticl_wz_r = $("input[name='ticl_wz_r']:checked").val();
	if(ticl_wz_r==null || ticl_wz_r==undefined){
		ticl_wz_r = '';
	}
	var ticl_wz_l = $("input[name='ticl_wz_l']:checked").val();
	if(ticl_wz_l==null || ticl_wz_l==undefined){
		ticl_wz_l = '';
	}
	var temp = {
			id:id,
			blh:$("#blh").text(),
			sj:sj,
			tsbs_r:tsbs_rs,
			tsbs_l:tsbs_ls,
			tsbs_qz:$("#tsbs_qz_gh").text(),
			xy_r:xy_rs,
			xy_l:xy_ls,
			xy_qz:$("#xy_qz_gh").text(),
			wg_r:wg_rs,
			wg_l:wg_ls,
			wg_qz:$("#wg_qz_gh").text(),
			spl_r:spl_rs,
			spl_l:spl_ls,
			spl_qz:$("#spl_qz_gh").text(),
			xg_r:xg_rs,
			xg_l:xg_ls,
			xg_qz:$("#xg_qz_gh").text(),
			ydkn_r:ydkn_rs,
			ydkn_l:ydkn_ls,
			ydkn_qz:$("#ydkn_qz_gh").text(),
			lysl_r:$("#lysl_r").val(),
			djsl_r:$("#djsl_r").val(),
			lysl_l:$("#lysl_l").val(),
			djsl_l:$("#djsl_l").val(),
			sl_qz:$("#sl_qz_gh").text(),
			yy_r:$("#yy_r").val(),
			yy_l:$("#yy_l").val(),
			yy_qz:$("#yy_qz_gh").text(),
			qjjc_r:$("#qjjc_r").val(),
			qjjc_l:$("#qjjc_l").val(),
			qjjc_qz:$("#qjjc_qz_gh").text(),
			ydjc_r:$("#ydjc_r").val(),
			ydjc_l:$("#ydjc_l").val(),
			ydjc_qz:$("#ydjc_qz_gh").text(),
			dnyg_ds_r1:$("#dnyg_ds_r1").val(),
			dnyg_ds_r:$("#dnyg_ds_r").val(),
			dnyg_dc_r:$("#dnyg_dc_r").val(),
			dnyg_ds_l1:$("#dnyg_ds_l1").val(),
			dnyg_ds_l:$("#dnyg_ds_l").val(),
			dnyg_dc_l:$("#dnyg_dc_l").val(),
			dnyg_qz:$("#dnyg_qz_gh").text(),
			
			ktjy_ds_r1:$("#ktjy_ds_r1").val(),
			ktjy_ds_r:$("#ktjy_ds_r").val(),
			ktjy_dc_r:$("#ktjy_dc_r").val(),
			ktjy_ds_l1:$("#ktjy_ds_l1").val(),
			ktjy_ds_l:$("#ktjy_ds_l").val(),
			ktjy_dc_l:$("#ktjy_dc_l").val(),
			ktjy_qz:$("#ktjy_qz_gh").text(),
			
			ktsp_ds_r1:$("#ktsp_ds_r1").val(),
			ktsp_ds_r:$("#ktsp_ds_r").val(),
			ktsp_dc_r:$("#ktsp_dc_r").val(),
			ktsp_jt_r:$("#ktsp_jt_r").val(),
			ktsp_ds_l1:$("#ktsp_ds_l1").val(),
			ktsp_ds_l:$("#ktsp_ds_l").val(),
			ktsp_dc_l:$("#ktsp_dc_l").val(),
			ktsp_jt_l:$("#ktsp_jt_l").val(),
			ktsp_qz:$("#ktsp_qz_gh").text(),
			
			xtjy_ds_r1:$("#xtjy_ds_r1").val(),
			xtjy_ds_r:$("#xtjy_ds_r").val(),
			xtjy_dc_r:$("#xtjy_dc_r").val(),
			xtjy_jt_r:$("#xtjy_jt_r").val(),
			xtjy_ds_l1:$("#xtjy_ds_l1").val(),
			xtjy_ds_l:$("#xtjy_ds_l").val(),
			xtjy_dc_l:$("#xtjy_dc_l").val(),
			xtjy_jt_l:$("#xtjy_jt_l").val(),
			xtjy_qz:$("#xtjy_qz_gh").text(),
			
			xtsp_ds_r1:$("#xtsp_ds_r1").val(),
			xtsp_ds_r:$("#xtsp_ds_r").val(),
			xtsp_dc_r:$("#xtsp_dc_r").val(),
			xtsp_jt_r:$("#xtsp_jt_r").val(),
			xtsp_ds_l1:$("#xtsp_ds_l1").val(),
			xtsp_ds_l:$("#xtsp_ds_l").val(),
			xtsp_dc_l:$("#xtsp_dc_l").val(),
			xtsp_jt_l:$("#xtsp_jt_l").val(),
			xtsp_qz:$("#xtsp_qz_gh").text(),
			
			ubm_gg_r:$("#ubm_gg_r").val(),
			ubm_qfsd_r:$("#ubm_qfsd_r").val(),
			ubm_gg_l:$("#ubm_gg_l").val(),
			ubm_qfsd_l:$("#ubm_qfsd_l").val(),
			ubm_qz:$("#ubm_qz_gh").text(),
			jmnp_cd_r:$("#jmnp_cd_r").val(),
			jmnp_bfb_r:$("#jmnp_bfb_r").val(),
			jmnp_cd_l:$("#jmnp_cd_l").val(),
			jmnp_bfb_l:$("#jmnp_bfb_l").val(),
			jmnp_qz:$("#jmnp_qz_gh").text(),
			ticl_wz_r:ticl_wz_r,
			ticl_wz_d_r:$("#ticl_wz_d_r").val(),
			ticl_wz_l:ticl_wz_l,
			ticl_wz_d_l:$("#ticl_wz_d_l").val(),
			ticl_wz_qz:$("#ticl_wz_qz_gh").text(),
			qt:$("#qt").val(),
			qt_qz:$("#qt_qz_gh").text(),
			clyj_r:$("#clyj_r").val(),
			clyj_qz:$("#clyj_qz_gh").text()
	};
	return temp;
}
//术后复查 取值  小儿
function shfc_er_get(){
	var id = $("#shfc_er_id").val()==''?null:$("#shfc_er_id").val();
	var sj = new Date();
	var temp = {
			id:id,
			blh:$("#blh").text(),
			sj:sj,
			yw_r:$("#yw_r").val(),
			yw_l:$("#yw_l").val(),
			yw_qz:$("#yw_qz_gh").text(),
			sl_y_r:$("#sl_y_r").val(),
			sl_j_r:$("#sl_j_r").val(),
			sl_y_l:$("#sl_y_l").val(),
			sl_j_l:$("#sl_j_l").val(),
			sl_qz:$("#sl_qz_gh").text(),
			jmzj_r:$("#jmzj_r").val(),
			jmzj_l:$("#jmzj_l").val(),
			jmzj_qz:$("#jmzj_qz_gh").text(),
			tkzj_r:$("#tkzj_r").val(),
			tkzj_l:$("#tkzj_l").val(),
			tkzj_qz:$("#tkzj_qz_gh").text(),
			yy_r:$("#yy_r").val(),
			yy_l:$("#yy_l").val(),
			yy_qz:$("#yy_qz_gh").text(),
			dnyg_r1:$("#dnyg_r1").val(),
			dnyg_l1:$("#dnyg_l1").val(),
			dnyg_r2:$("#dnyg_r2").val(),
			dnyg_l2:$("#dnyg_l2").val(),
			dnyg_r3:$("#dnyg_r3").val(),
			dnyg_l3:$("#dnyg_l3").val(),
			dnyg_qz:$("#dnyg_qz_gh").text(),
			ktjy_r1:$("#ktjy_r1").val(),
			ktjy_l1:$("#ktjy_l1").val(),
			ktjy_r2:$("#ktjy_r2").val(),
			ktjy_l2:$("#ktjy_l2").val(),
			ktjy_r3:$("#ktjy_r3").val(),
			ktjy_l3:$("#ktjy_l3").val(),
			ktjy_qz:$("#ktjy_qz_gh").text(),
			ktsp_r1:$("#ktsp_r1").val(),
			ktsp_l1:$("#ktsp_l1").val(),
			ktsp_r2:$("#ktsp_r2").val(),
			ktsp_l2:$("#ktsp_l2").val(),
			ktsp_r3:$("#ktsp_r3").val(),
			ktsp_l3:$("#ktsp_l3").val(),
			ktsp_r4:$("#ktsp_r4").val(),
			ktsp_l4:$("#ktsp_l4").val(),
			ktsp_qz:$("#ktsp_qz_gh").text(),
			xtjy_r1:$("#xtjy_r1").val(),
			xtjy_l1:$("#xtjy_l1").val(),
			xtjy_r2:$("#xtjy_r2").val(),
			xtjy_l2:$("#xtjy_l2").val(),
			xtjy_r3:$("#xtjy_r3").val(),
			xtjy_l3:$("#xtjy_l3").val(),
			xtjy_r4:$("#xtjy_r4").val(),
			xtjy_l4:$("#xtjy_l4").val(),
			xtjy_qz:$("#xtjy_qz_gh").text(),
			xtsp_r1:$("#xtsp_r1").val(),
			xtsp_l1:$("#xtsp_l1").val(),
			xtsp_r2:$("#xtsp_r2").val(),
			xtsp_l2:$("#xtsp_l2").val(),
			xtsp_r3:$("#xtsp_r3").val(),
			xtsp_l3:$("#xtsp_l3").val(),
			xtsp_r4:$("#xtsp_r4").val(),
			xtsp_l4:$("#xtsp_l4").val(),
			xtsp_qz:$("#xtsp_qz_gh").text(),
			zsxz_r:$("#zsxz_r").val(),
			zsxz_l:$("#zsxz_l").val(),
			zsxz_qz:$("#zsxz_qz_gh").text(),
			jmdxt_r:$("#jmdxt_r").val(),
			jmdxt_l:$("#jmdxt_l").val(),
			jmdxt_qz:$("#jmdxt_qz_gh").text(),
			jmhd_r:$("#jmhd_r").val(),
			jmhd_l:$("#jmhd_l").val(),
			jmhd_qz:$("#jmhd_qz_gh").text(),
			tss_r:$("#tss_r").val(),
			tss_l:$("#tss_l").val(),
			tss_qz:$("#tss_qz_gh").text(),
			rhfw_r:$("#rhfw_r").val(),
			rhfw_l:$("#rhfw_l").val(),
			rhfw_qz:$("#rhfw_qz_gh").text(),
			lts_r:$("#lts_r").val(),
			lts_l:$("#lts_l").val(),
			lts_qz:$("#lts_qz_gh").text(),
			xbdjc_r:$("#xbdjc_r").val(),
			xbdjc_l:$("#xbdjc_l").val(),
			xbdjc_qz:$("#xbdjc_qz_gh").text(),
			zxad_r:$("#zxad_r").val(),
			zxad_l:$("#zxad_l").val(),
			zxad_qz:$("#zxad_qz_gh").text(),
			yzcd_r:$("#yzcd_r").val(),
			yzcd_l:$("#yzcd_l").val(),
			yzcd_qz:$("#yzcd_qz_gh").text(),
			PVEP_r:$("#PVEP_r").val(),
			PVEP_l:$("#PVEP_l").val(),
			PVEP_qz:$("#PVEP_qz_gh").text(),
			lxdzx_r:$("#lxdzx_r").val(),
			lxdzx_l:$("#lxdzx_l").val(),
			lxdzx_qz:$("#lxdzx_qz_gh").text(),
			npjjc_r:$("#npjjc_r").val(),
			npjjc_l:$("#npjjc_l").val(),
			npjjc_qz:$("#npjjc_qz_gh").text(),
			shmzjl:$("#shmzjl").val()
	};
	return temp;
}



//function findYyByBlh(){
//	$("#blh_yy").bind('keydown',function(e){
//		if(e.keyCode==13){
//			showList_yy($(this).val());
//			$("#pageList").attr("style","width:100%;margin-left:-10px;margin-top:-7px;");
//			sel_list_yy();//列表选中行
//			yy_jbxx_set($(this).val());
//		}
//	});
//}

//手术记录添加table
function tbl_yy_add(){
	var nowYear = dateToStr(null);
	var f1 = $("#sel_lev1").val();
	var f2 = $("#sel_lev2").val();
	var f3 = $("#sel_lev3").val();
	var yyxm = "";
		if(f1!='--请选择--'){
			yyxm+=f1;
		}
		if(f2!=undefined){
			yyxm+='>'+f2;
		} 
		if(f3!=undefined){
			yyxm+='>'+f3;
		}
	var tab_add = "<table id='ssjlAdd' cellpadding='0' cellspacing='0' width='100%' style='border-top:1px solid rgb(51,51,51);border-left:1px solid rgb(51,51,51);'>" +
					"<tr>" +
						"<td align='center' width='10%' class='td_border'>病例号：</td>" +
						"<td align='center' width='15%' class='td_border'><label id='blh_yy'></label></td>" +
						"<td align='center' width='10%' class='td_border'>姓名：</td>" +
						"<td align='center' width='15%' class='td_border'><label id='xingming_yy'></label></td>"+
						"<td align='center' width='10%' class='td_border'>性别：</td>" +
						"<td align='center' width='15%' class='td_border'><label id='sex'></label></td>"+
						"<td align='center' width='10%' class='td_border'>联系方式：</td>" +
						"<td align='center' width='15%' class='td_border'><label id='lxfs_yy'></label></td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' class='td_border'>出生日期：</td>" +
						"<td align='center' class='td_border'><label id='csrq_yy'></label></td>"+
						"<td align='center' class='td_border'>点药日期：</td>" +
						"<td align='center' class='td_border'>" +
							"<input type='text' id='dyrq_y' style='width:30px;'/>月" +
							"<input type='text' id='dyrq_r' style='width:30px;'/>日" +
						"</td>" +
						"<td align='center' class='td_border'>点药频率：</td>" +
						"<td align='center' class='td_border' colspan='3'>" +
							"<select id='dypl' style='width:50px;'>" +
							"<option>4</option>" +
							"<option>3</option>" +
							"<option>2</option>" +
							"<option>1</option>" +
							"</select>" +
							"&nbsp;&nbsp;次/日" +
						"</td>"+
					"</tr>" +
					"<tr>" +
						"<td align='center' class='td_border' rowspan='3'>预约项目：</td>" +
					"<td align='center' class='td_border' colspan='3' align='center'>" +
						"<input type='checkbox' id='yyxm1' name='yyxm'/>&nbsp;&nbsp;LASIK系列&nbsp;&nbsp;&nbsp;&nbsp;手术费用：&nbsp;&nbsp;"+
						"<select type='text' id='ssfy1' style='width:70px;'>" +
							"<option>4800</option>" +
							"<option>5800</option>" +
							"<option>6800</option>" +
							"<option>7800</option>" +
							"<option>8800</option>" +
							"<option>9800</option>" +
							"<option></option>" +
						"</select>" +
						"&nbsp;&nbsp;或&nbsp;&nbsp;<input type='text' id='ssfy1h' style='width:50px;'/>  元"+
					"</td>" +
					"<td align='center' class='td_border' colspan='4' align='center'>" +
						"<input type='checkbox' id='yyxm2' name='yyxm'/>&nbsp;&nbsp;超 薄 系 列&nbsp;&nbsp;&nbsp;&nbsp;手术费用：&nbsp;&nbsp;"+
						"<select type='text' id='ssfy2' style='width:70px;'>" +
					//		"<option>6800</option>" +
							"<option>7800</option>" +
							"<option>8800</option>" +
							"<option>9800</option>" +
							"<option></option>" +
						"</select>" +
						"&nbsp;&nbsp;或&nbsp;&nbsp;<input type='text' id='ssfy2h' style='width:50px;'/>  元"+
					"</td>" +
					"</tr>"+
					"<tr>"+
					"<td align='center' class='td_border' colspan='3' align='center'>" +
						"<input type='checkbox' id='yyxm3' name='yyxm'/>&nbsp;&nbsp;飞 秒 系 列&nbsp;&nbsp;&nbsp;&nbsp;手术费用：&nbsp;&nbsp;"+
						"<select type='text' id='ssfy3' style='width:70px;'>" +
//							"<option>12800</option>" +
							"<option>13800</option>" +
							"<option>14800</option>" +
							"<option>15800</option>" +
							"<option></option>" +
						"</select>" +
						"&nbsp;&nbsp;或&nbsp;&nbsp;<input type='text' id='ssfy3h' style='width:50px;'/>  元"+
					"</td>" +
					"<td align='center' class='td_border' colspan='4' align='center'>" +
						"<input type='checkbox' id='yyxm4' name='yyxm'/>&nbsp;&nbsp;ICL/TICL/PRL&nbsp;&nbsp;&nbsp;&nbsp;手术费用：&nbsp;&nbsp;"+
						"<select type='text' id='ssfy4' style='width:70px;'>" +
							"<option>32000</option>" +
							"<option>40000</option>" +
							"<option></option>" +
						"</select>" +
						"&nbsp;&nbsp;或&nbsp;&nbsp;<input type='text' id='ssfy4h' style='width:50px;'/>  元"+
					"</td>" +
				"</tr>" +
				
				"<tr>"+
				"<td align='center' class='td_border' colspan='3' align='center'>" +
					"<input type='checkbox' id='yyxm5' name='yyxm'/>&nbsp;&nbsp;全 飞 秒&nbsp;&nbsp;&nbsp;&nbsp;手术费用：&nbsp;&nbsp;"+
					"<select type='text' id='ssfy5' style='width:70px;'>" +
//						"<option>12800</option>" +
						"<option>20800</option>" +
//						"<option>14800</option>" +
//						"<option>15800</option>" +
						"<option></option>" +
					"</select>" +
					"&nbsp;&nbsp;或&nbsp;&nbsp;<input type='text' id='ssfy5h' style='width:50px;'/>  元"+
				"</td>" +
				"<td align='center' class='td_border' colspan='4' align='center'>" +
					"<input type='checkbox' id='yyxm6' name='yyxm'/>&nbsp;&nbsp;T-PRK&nbsp;&nbsp;&nbsp;&nbsp;手术费用：&nbsp;&nbsp;"+
					"<select type='text' id='ssfy6' style='width:70px;'>" +
						"<option>10800</option>" +
						"<option>11800</option>" +
						"<option>12800</option>" +
						"<option></option>" +
					"</select>" +
					"&nbsp;&nbsp;或&nbsp;&nbsp;<input type='text' id='ssfy6h' style='width:50px;'/>  元"+
				"</td>" +
			"</tr>" +
				
				"<tr>" +
					"<td align='center' class='td_border'>预约时间：</td>" +
					"<td align='center' class='td_border' colspan='2'>" +
						"<div id='yy_rili' style='width:85%;height:150px;text-align:center;cursor:pointer;'>" +
						"<input type='text' id='rili' name='rili' onclick='calendarFun_yy1(\"rili\",null);' readonly='readonly' style='height:1px;width:100%;border:0px;' value='"+nowYear+"'/><br/>" +
						"<img src='../images/rl.jpg' width='100%' height='99%'>" +
						"</div>" +
					"</td>" +
					"<td align='center' class='td_border' colspan='6'>" +
						"<table cellpadding='3' cellspacing='3' width='100%'>" +
							"<tr>" +
								"<td align='center'>" +
									"<div id='showTime_yy' style='width:50%;height:18px;border:1px solid #d2d2d2;background-color:white;'></div>" +
								"</td>" +
							"</tr>" +
							"<tr>" +
								"<td align='center'>" +
									"<table cellpadding='3' cellspacing='3' width='80%'>" +
										"<tr>" +
											"<td>上午：</td>" +
											"<td><input type='radio' id='t8' name='am' value='08:00:00'/>&nbsp;&nbsp;8:00</td>" +
											"<td><input type='radio' id='t9' name='am' value='09:00:00'/>&nbsp;&nbsp;9:00</td>" +
											"<td><input type='radio' id='t10' name='am' value='10:00:00'/>&nbsp;&nbsp;10:00</td>" +
											"<td><input type='radio' id='t11' name='am' value='11:00:00'/>&nbsp;&nbsp;11:00</td>" +
										"</tr>" +
										"<tr>" +
											"<td>下午：</td>" +
											"<td><input type='radio' id='t2' name='am' value='01:00:00'/>&nbsp;&nbsp;1:00</td>" +
											"<td><input type='radio' id='t3' name='am' value='02:00:00'/>&nbsp;&nbsp;2:00</td>" +
											"<td><input type='radio' id='t4' name='am' value='03:00:00'/>&nbsp;&nbsp;3:00</td>" +
											"<td><input type='radio' id='t5' name='am' value='04:00:00'/>&nbsp;&nbsp;4:00</td>" +
										"</tr>" +
									"</table>" +
								"</td>" +
							"</tr>" +
						"</table>" +
					"</td>" +
				"</tr>" +
				"<tr>" +
					"<td align='center' class='td_border'>签字</td>" +
					"<td colspan='7' align='left' class='td_border'>" +
						"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='text' id='yy_qz' onclick='openFloatDiv(\"yy_qz\")' onkeydown='closeFloatDiv()' style='cursor:pointer;'></label>"+
						"<input type='hidden' id='yy_qz_gh'/>"+
					"</td>" +
				"</tr>"+
				"</table>" +
				"<table border='0' cellpadding='0' cellspacing='0' width='100%' >" +
				"<tr>" +
					"<td align='right' colspan='6'>" +
						"<br/>"+
						"<input type='hidden' id='yy_id'/>" +
						"<input type='button' value='提交' style='width:60px;height:20px;' onclick='ti_yy_qg(1)'/>&nbsp;&nbsp;" +
						"<input type='button' value='重置' style='width:60px;height:20px;' onclick='_emr_show_yy()'/>&nbsp;&nbsp;" +
						"<input type='button' value='打印预约单' style='width:100px;height:20px;' onclick='print_yy();'/>" +
					"</td>" +
				"</tr>" +
				"</table>";
	return tab_add;
}		
//预约赋值
function yy_set_jbxx(blh){
	var jbxx = getJbxx_qg(blh);
	$("#blh_yy").text(jbxx.blh);
	$("#xingming_yy").text(jbxx.name);
	$("#sex").text(jbxx.sex);
	$("#lxfs_yy").text(jbxx.dianhua);
	$("#csrq_yy").text(jbxx.birthday);
}
//预约 取值
function yy_get(){
	//病例号
	var blh = $("#patientInfo").children("span").first().text();
	//var blh = $("#blh_yy").val();
	var yy_id = $("#yy_id").val();	//屈光手术id
	if(yy_id==""){
		yy_id=null;
	}
	//var yyxm = $("#yyxm").text();
	var yysj_val = $.trim($("#showTime_yy").text());
	if(yysj_val.length!=19){
		alert('请选择日期及时间！');
	}
	yysj_val = yysj_val.split(" ");
	if(yysj_val.length!=2){
		alert('请选择日期时间！');
	}
	var date = yysj_val[0].split("-");
	if(date.length!=3){
		alert('请选择日期！');
	}
	var time = yysj_val[1].split(":");
	if(time.length!=3){
		alert('请选择时间！');
	}
	var yysj = new Date(date[0],(parseInt(date[1]-1)),date[2],time[0],time[1],time[2]);
	var yyxm1 = $("#yyxm1").attr("checked")=="checked"?"1":"0";
	var yyxm2 = $("#yyxm2").attr("checked")=="checked"?"1":"0";
	var yyxm3 = $("#yyxm3").attr("checked")=="checked"?"1":"0";
	var yyxm4 = $("#yyxm4").attr("checked")=="checked"?"1":"0";
	var yyxm5 = $("#yyxm5").attr("checked")=="checked"?"1":"0";
	var yyxm6 = $("#yyxm6").attr("checked")=="checked"?"1":"0";
	
	var ssfy1 = $("#ssfy1").val();
	var ssfy2 = $("#ssfy2").val();
	var ssfy3 = $("#ssfy3").val();
	var ssfy4 = $("#ssfy4").val();
	var ssfy5 = $("#ssfy5").val();
	var ssfy6 = $("#ssfy6").val();
	
	var ssfy1h = $("#ssfy1h").val();
	var ssfy2h = $("#ssfy2h").val();
	var ssfy3h = $("#ssfy3h").val();
	var ssfy4h = $("#ssfy4h").val();
	var ssfy5h = $("#ssfy5h").val();
	var ssfy6h = $("#ssfy6h").val();
	
	var temp = {
		id:yy_id,
		blh:blh,
		yysj:yysj,
		dyrq_y:$("#dyrq_y").val(),
		dyrq_r:$("#dyrq_r").val(),
		dypl:$("#dypl").val(),
		yyxm1:yyxm1,
		yyxm2:yyxm2,
		yyxm3:yyxm3,
		yyxm4:yyxm4,
		yyxm5:yyxm5,
		yyxm6:yyxm6,
		ssfy1:ssfy1,
		ssfy2:ssfy2,
		ssfy3:ssfy3,
		ssfy4:ssfy4,
		ssfy5:ssfy5,
		ssfy6:ssfy6,
		ssfy1h:ssfy1h,
		ssfy2h:ssfy2h,
		ssfy3h:ssfy3h,
		ssfy4h:ssfy4h,
		ssfy5h:ssfy5h,
		ssfy6h:ssfy6h,
		yy_qz:$("#yy_qz_gh").val(),
	};
	return temp;
}
/**
 * 手术记录
 */
function _emr_show_ssjl(){
	$("#ssfsfl").show();
	$("#div_ssfs").show();
	if($("#lc_id").text()=='无'){
		$("#ssfsfl").hide();
		$("#div_ssfs").hide();
		$("#div_show_4_2_2").html("<div style='width:530px;height:100px;margin:auto;margin-top:200px;text-align:center;'><label style='font-size:35px;color:blue;'>请先提交病历，或者点击“既往病历”页签，选择一份病历！</label></div>");
	}else{
		var ssfs = $("#sel_lev1").val();
		//不同的手术方式，不同的手术记录
		if(ssfs=='准分子'){
			ssjl_zfz();
		}else if(ssfs=='晶体植入'){
			ssjl_jt();
		}else if(ssfs=='儿童屈光'){
			ssjl_er();
		}else{
			$("#ssfsfl").hide();
			$("#div_ssfs").hide();
			$("#div_show_4_2_2").html("<div style='width:530px;height:100px;margin:auto;margin-top:200px;text-align:center;'><label style='font-size:35px;color:blue;'>请先提交病历，或者点击“既往病历”页签，选择一份病历！</label></div>");
		}
		//btn_ctrl();//按钮权限控制
		var blh = $("#patientInfo").children("span").first().text();
		ssjl_set_jbxx(blh);
		setValue_qg();//页面赋值
	}
	
}
//手术记录——儿童
function ssjl_er(){
	var div_body = $("#div_show_4_2_2").html("");
	$("<div/>").attr("style","width:90%;height:10px;margin-left:5%;").appendTo(div_body);
	//$("<div/>").attr("id","div_liebiao").attr("style","width:90%;height:20px;margin-left:5%;background:url(../style/green/images/thbg.png) repeat-x left;").appendTo(div_body).html("<h3>>>详情</h3>");
	var div_top = $("<div/>").attr("id","ssjl_add").attr("style","width:90%;height:420px;margin-left:5%;background:;border:0px solid #d2d2d2;").appendTo(div_body);
	$("<div/>").attr("style","width:90%;height:20px;margin-left:5%;").appendTo(div_body);
//	$("<div/>").attr("style","width:90%;height:20px;margin-left:5%;background:url(../style/green/images/thbg.png) repeat-x left;").appendTo(div_body).html("<h3>>>列表</h3>");
//	var div_bottom = $("<div/>").attr("id","ssjl_er_list").attr("style","width:90%;height:170px;margin-left:5%;background:;border:0px solid #d2d2d2;").appendTo(div_body);
	//添加
	reset_ssjl_er_top();
	
	//基本信息赋值
	var patientId = $("#patientInfo").children("span").first().text();

	//列表
	//showList_er(patientId);
	//sel_list_er();
	setValue_qg();
}
//手术记录——晶体
function ssjl_jt(){
	var div_body = $("#div_show_4_2_2").html("");
	$("<div/>").attr("style","width:90%;height:10px;margin-left:5%;").appendTo(div_body);
//	$("<div/>").attr("id","div_liebiao").attr("style","width:90%;height:20px;margin-left:5%;background:url(../style/green/images/thbg.png) repeat-x left;").appendTo(div_body).html("<h3>>>详情</h3>");
	var div_top = $("<div/>").attr("id","ssjl_add").attr("style","height:1000px;background:;border:0px solid #d2d2d2;").appendTo(div_body);
	$("<div/>").attr("style","width:90%;height:20px;margin-left:5%;").appendTo(div_body);
//	$("<div/>").attr("style","width:90%;height:20px;margin-left:5%;background:url(../style/green/images/thbg.png) repeat-x left;").appendTo(div_body).html("<h3>>>列表</h3>");
//	var div_bottom = $("<div/>").attr("id","ssjl_list").attr("style","width:90%;height:170px;margin-left:5%;background:;border:0px solid #d2d2d2;").appendTo(div_body);
	//添加
	reset_ssjl_jt_top();
	
	//基本信息赋值
	var patientId = $("#patientInfo").children("span").first().text();
	var jbxx = getJbxx_qg(patientId);
	$("#kebie").text("眼科屈光中心");
	$("#suffererName").text(jbxx.name);
	$("#blh").text(jbxx.blh);

	//列表
	//showList_jt(patientId);
	//sel_list_jt();
	qgqz_jt_ssjl();//签字
	calendarFun_yy("kssj");
	calendarFun_yy("jssj");
	calendarFun_yy("kssj_r");
	calendarFun_yy("jssj_r");
	$("#kssj").val(formatDate(new Date()));
	$("#jssj").val(formatDate(new Date()));
	$("#kssj_r").val(formatDate(new Date()));
	$("#jssj_r").val(formatDate(new Date()));
	setValue_qg();
}
//术后复查 选择列表行
function sel_list_shfc(){
	$("#pageListTable td").bind("click",function(){
		var isChecked = $("input[name='checkBoxObj']:checked").length; 
		//if(isChecked==0){
			reset_shfc_top();
			var id = $(this).parent().children("td").eq(1).text();
			var data = getJSONData("/publish/quguang/getQgShfcById.htm?id="+id,{},"GET").obj;
			if(data!=null){
				shfc_set(data);
			}
			qgqz();//签字
		//}
	});
}
//术后复查 选择列表行 儿童
function sel_list_shfc_er(){
	$("#pageListTable td").bind("click",function(){
		var isChecked = $("input[name='checkBoxObj']:checked").length; 
		//if(isChecked==0){
			reset_shfc_top_er();
			var id = $(this).parent().children("td").eq(1).text();
			var data = getJSONData("/publish/quguang/getQgShfcErById.htm?id="+id,{},"GET").obj;
			if(data!=null){
				shfc_er_set(data);
			}
			qgqz();//签字
		//}
	});
}
//儿童 手术记录 选择列表行
function sel_list_er(){
	$("#pageListTable td").bind("click",function(){
		var isChecked = $("input[name='checkBoxObj']:checked").length; 
		//if(isChecked==0){
			reset_ssjl_er_top();
			var id = $(this).parent().children("td").eq(1).text();
			var data = getJSONData("/publish/quguang/getQgErSsjlById.htm?id="+id,{},"GET").obj;
			if(data!=null){
				er_ssjl_update_set(data);
			}
		//}
	});
}
//晶体 选择列表行
function sel_list_jt(){
	$("#pageListTable td").bind("click",function(){
		var isChecked = $("input[name='checkBoxObj']:checked").length; 
		//if(isChecked==0){
			reset_ssjl_jt_top();
			var id = $(this).parent().children("td").eq(1).text();
			var data = getJSONData("/publish/quguang/getQgJtssjlById.htm?id="+id,{},"GET").obj;
			if(data!=null){
				jtss_update_set(data);
			}
			calendarFun_yy("kssj");
			calendarFun_yy("jssj");
			qgqz_jt_ssjl();//签字
		//}
	});
}
//提交 儿童手术记录
function ti_er_ssjl(autoSaveTag){
	if($("#sel_lev1").val()=="--请选择--"){
		$.oimsAlert("请选择手术方式！")
	}else{
		var temp = er_ssjl_get();
		temp.lc_id = $("#lc_id").text();
		var url_er_jtss = "";
		if(temp.id==null){//添加
			url_er_jtss = EMR_ER_SAVE_URL;
		}else{
			url_er_jtss = EMR_ER_UPDATE_URL;
		}
		$.ajax({
			url : contextPath + url_er_jtss,
			data : temp,
			type : "POST",
			dataType : 'json',
			success : function(data) {
				if(data.state==1){
					if(autoSaveTag==1){
						$.oimsSucc('操作成功！');	
						//qglc_get();//流程提交
						//reset_er_qgss();
						if($("#er_id").val() == undefined || $("#er_id").val() == null ||$("#er_id").val() == ""){
							$("#er_id").val(data.obj);
						}
						lcwc();
					}
					
				}else{
					$.oimsAlert('操作失败！');
				}
			}
		});
	}
}

//提交 晶体手术记录
function ti_jt_ssjl(autoSaveTag){
	if($("#sel_lev1").val()=="--请选择--"){
		$.oimsAlert("请选择手术方式！")
	}else{
		var temp = jt_ssjl_get();
		temp.lc_id = $("#lc_id").text();
		var url_jtss = "";
		if(temp.id==null){//添加
			url_jtss = EMR_JT_SAVE_URL;
		}else{
			url_jtss = EMR_JT_UPDATE_URL;
		}
		$.ajax({
			url : contextPath + url_jtss,
			data : temp,
			type : "POST",
			dataType : 'json',
			success : function(data) {
				if(data.state==1){
					if(autoSaveTag==1){
						//reset_qgss();
						//qglc_get();//流程
						if($("#jt_id").val() == undefined || $("#jt_id").val() == null || $("#jt_id").val() ==  ""){
							$("#jt_id").val(data.obj);
						}
						lcwc();
						$.oimsSucc('操作成功！');
					}
				}else{
					$.oimsAlert('操作失败！');
				}
			}
		});
	}
} 
//手术记录 儿童 修改前赋值
function er_ssjl_update_set(data){
	$("#er_id").val(data.id);
	$("#zlfs_r").val(data.zlfs_r);
	$("#zlfs_l").val(data.zlfs_l);
	$("#mzfs_r").val(data.mzfs_r);
	$("#mzfs_l").val(data.mzfs_l);
	$("#jzds_r").val(data.jzds_r);
	$("#jzds_l").val(data.jzds_l);
	$("#zyd_r").val(data.zyd_r);
	$("#zyd_l").val(data.zyd_l);
	$("#zyd2_r").val(data.zyd2_r);
	$("#zyd2_l").val(data.zyd2_l);
	$("#gqzj_r").val(data.gqzj_r);
	$("#gqzj_l").val(data.gqzj_l);
	$("#ddjl_r").val(data.ddjl_r);
	$("#ddjl_l").val(data.ddjl_l);
	$("#MASK_r").val(data.MASK_r);
	$("#MASK_l").val(data.MASK_l);
	$("#ssys_r").val(getUser1(data.ssys_r));
	$("#ssys_r_gh").val(data.ssys_r);
	$("#ssys_l").val(getUser1(data.ssys_l));
	$("#ssys_l_gh").val(data.ssys_l);
	var ssrq_r = dateToStr(data.ssrq_r);
	$("#ssrq_r").val(ssrq_r);
	var ssrq_l = dateToStr(data.ssrq_l);
	$("#ssrq_l").val(ssrq_l);
	$("#bz").val(data.bz);
}
//手术记录  晶体 修改前赋值
function jtss_update_set(data){
	var jbxx = getJbxx_qg(data.blh);
	$("#suffererName").text(jbxx.name);
	
	$("#jt_id").val(data.id);

	$("#kebie").text(data.kebie);
	
	$("#blh").text(data.blh);
	$("#kebie_r").text(data.kebie);
	$("#blh_r").text(data.blh);
	$("#suffererName_r").text(jbxx.name);
	if(data.jkjy.indexOf("1")>-1){
		$("#jkjy1").attr("checked",true);
	} 
	if(data.jkjy.indexOf("2")>-1){
		$("#jkjy2").attr("checked",true);
	}
	
	if(data.yanbie=="r"){
		$("#yb_r").attr("checked",true);
	}else if(data.yanbie=="l"){
		$("#yb_l").attr("checked",true);
	}else if(data.yanbie=="s"){
		$("#yb_s").attr("checked",true);
	}
	$("#sg").val(data.sg);
	$("#tz").val(data.tz);
	$("#tw").val(data.tw);
	$("#mb").val(data.mb);
	$("#hx").val(data.hx);
	$("#xy").val(data.xy);
	if(data.sczb.indexOf("1")>-1){
		$("#sczb1").attr("checked",true);
	}
	if(data.sczb.indexOf("2")>-1){
		$("#sczb2").attr("checked",true);
	}
	if(data.sczb.indexOf("3")>-1){
		$("#sczb3").attr("checked",true);
	}
	if(data.sczb.indexOf("4")>-1){
		$("#sczb4").attr("checked",true);
	}
	if(data.sczb.indexOf("5")>-1){
		$("#sczb5").attr("checked",true);
	}
	if(data.ldcx.indexOf("1")>-1){
		$("#ldcx1").attr("checked",true);
	}
	if(data.ldcx.indexOf("2")>-1){
		$("#ldcx2").attr("checked",true);
	}
	if(data.ldcx.indexOf("3")>-1){
		$("#ldcx3").attr("checked",true);
	}
	$("#bz").val(data.bz);
	$("#sqzb_qm").text(getUser1(data.sqzb_qm));
	$("#sqzb_qm_gh").text(data.sqzb_qm);
	if(data.mzff.indexOf("1")>-1){
		$("#mzff1").attr("checked",true);
	}
	if(data.mzff.indexOf("2")>-1){
		$("#mzff2").attr("checked",true);
	}
	if(data.mzff.indexOf("3")>-1){
		$("#mzff3").attr("checked",true);
	}
	if(data.my.indexOf("1")>-1){
		$("#my1").attr("checked",true);
	}
	if(data.my.indexOf("2")>-1){
		$("#my2").attr("checked",true);
	}
	$("#qt").val(data.qt);
	var kssj = dateToStr(data.kssj);
	$("#kssj").val(kssj);
	var jssj = dateToStr(data.jssj);
	$("#jssj").val(jssj);
	if(data.ssmc.indexOf("1")>-1){
		$("#ssmc1").attr("checked",true);
	}
	if(data.ssmc.indexOf("2")>-1){
		$("#ssmc2").attr("checked",true);
	}
	if(data.ssmc.indexOf("3")>-1){
		$("#ssmc3").attr("checked",true);
	}
	$("#cj").val(data.cj);
	$("#xh").val(data.xh);
	$("#zdys").val(getUser1(data.zdys));
	$("#zdys_gh").val(data.zdys);
	$("#zsys").val(getUser1(data.zsys));
	$("#zsys_gh").val(data.zsys);
	$("#hs").val(getUser1(data.hs));
	$("#hs_gh").val(data.hs);
	$("#ssjl_qm").text(getUser1(data.ssjl_qm));
	$("#ssjl_qm_gh").text(data.ssjl_qm);
	$("#ssjg1").val(data.ssjg1);
	$("#ssjg31").val(data.ssjg31);
	$("#ssjg32").val(data.ssjg32);
	$("#ssjg33").val(data.ssjg33);
	$("#ssjg41").val(data.ssjg41);
	$("#ssjg42").val(data.ssjg42);
	$("#ssjg43").val(data.ssjg43);
	$("#ssjg44").val(data.ssjg44);
	if(data.ssjg5.indexOf("1")>-1){
		$("#ssjg51").attr("checked",true);
	}
	if(data.ssjg5.indexOf("2")>-1){
		$("#ssjg52").attr("checked",true);
	}
	if(data.ssjg5.indexOf("3")>-1){
		$("#ssjg53").attr("checked",true);
	}
	$("#ssjg6").val(data.ssjg6);
	if(data.ssjg6.indexOf("1")>-1){
		$("#ssjg61").attr("checked",true);
	}
	if(data.ssjg6.indexOf("3")>-1){
		$("#ssjg63").attr("checked",true);
	}
	$("#ssjg62").val(data.ssjg62);
	
	$("#ssjg_qm").text(getUser1(data.ssjg_qm));
	$("#ssjg_qm_gh").text(data.ssjg_qm);
	var nian =""; 
	var yue ="";
	var ri = "";
	var ssrq = new Date(data.ssrq.time);
	if(ssrq!=null){
		nian = ssrq.getFullYear();
		yue = ssrq.getMonth()+1;
		ri = ssrq.getDate();
	}
	$("#nian").text(nian);
	$("#yue").text(yue);
	$("#ri").text(ri);
//右眼
	if(data.jkjy_r.indexOf("1")>-1){
		$("#jkjy1_r").attr("checked",true);
	} 
	if(data.jkjy_r.indexOf("2")>-1){
		$("#jkjy2_r").attr("checked",true);
	}
	
//	if(data.yanbie=="r"){
//		$("#yb_r").attr("checked",true);
//	}else if(data.yanbie=="l"){
//		$("#yb_l").attr("checked",true);
//	}else if(data.yanbie=="s"){
//		$("#yb_s").attr("checked",true);
//	}
	$("#sg_r").val(data.sg_r);
	$("#tz_r").val(data.tz_r);
	$("#tw_r").val(data.tw_r);
	$("#mb_r").val(data.mb_r);
	$("#hx_r").val(data.hx_r);
	$("#xy_r").val(data.xy_r);
	if(data.sczb_r.indexOf("1")>-1){
		$("#sczb1_r").attr("checked",true);
	}
	if(data.sczb_r.indexOf("2")>-1){
		$("#sczb2_r").attr("checked",true);
	}
	if(data.sczb_r.indexOf("3")>-1){
		$("#sczb3_r").attr("checked",true);
	}
	if(data.sczb_r.indexOf("4")>-1){
		$("#sczb4_r").attr("checked",true);
	}
	if(data.sczb_r.indexOf("5")>-1){
		$("#sczb5_r").attr("checked",true);
	}
	if(data.ldcx_r.indexOf("1")>-1){
		$("#ldcx1_r").attr("checked",true);
	}
	if(data.ldcx_r.indexOf("2")>-1){
		$("#ldcx2_r").attr("checked",true);
	}
	if(data.ldcx_r.indexOf("3")>-1){
		$("#ldcx3_r").attr("checked",true);
	}
	$("#bz_r").val(data.bz_r);
	$("#sqzb_qm_r").text(getUser1(data.sqzb_qm_r));
	$("#sqzb_qm_gh_r").text(data.sqzb_qm_r);
	if(data.mzff_r.indexOf("1")>-1){
		$("#mzff1_r").attr("checked",true);
	}
	if(data.mzff_r.indexOf("2")>-1){
		$("#mzff2_r").attr("checked",true);
	}
	if(data.mzff_r.indexOf("3")>-1){
		$("#mzff3_r").attr("checked",true);
	}
	if(data.my_r.indexOf("1")>-1){
		$("#my1_r").attr("checked",true);
	}
	if(data.my_r.indexOf("2")>-1){
		$("#my2_r").attr("checked",true);
	}
	$("#qt_r").val(data.qt_r);
	var kssj_r = dateToStr(data.kssj_r);
	$("#kssj_r").val(kssj_r);
	var jssj_r = dateToStr(data.jssj_r);
	$("#jssj_r").val(jssj_r);
	if(data.ssmc_r.indexOf("1")>-1){
		$("#ssmc1_r").attr("checked",true);
	}
	if(data.ssmc_r.indexOf("2")>-1){
		$("#ssmc2_r").attr("checked",true);
	}
	if(data.ssmc_r.indexOf("3")>-1){
		$("#ssmc3_r").attr("checked",true);
	}
	$("#cj_r").val(data.cj_r);
	$("#xh_r").val(data.xh_r);
	$("#zdys_r").val(getUser1(data.zdys_r));
	$("#zdys_gh_r").val(data.zdys_r);
	$("#zsys_r").val(getUser1(data.zsys_r));
	$("#zsys_gh_r").val(data.zsys_r);
	$("#hs_r").val(getUser1(data.hs_r));
	$("#hs_gh_r").val(data.hs_r);
	$("#ssjl_qm_r").text(getUser1(data.ssjl_qm_r));
	$("#ssjl_qm_gh_r").text(data.ssjl_qm_r);
	$("#ssjg1_r").val(data.ssjg1_r);
	$("#ssjg31_r").val(data.ssjg31_r);
	$("#ssjg32_r").val(data.ssjg32_r);
	$("#ssjg33_r").val(data.ssjg33_r);
	$("#ssjg41_r").val(data.ssjg41_r);
	$("#ssjg42_r").val(data.ssjg42_r);
	$("#ssjg43_r").val(data.ssjg43_r);
	$("#ssjg44_r").val(data.ssjg44_r);
	if(data.ssjg5_r.indexOf("1")>-1){
		$("#ssjg51_r").attr("checked",true);
	}
	if(data.ssjg5_r.indexOf("2")>-1){
		$("#ssjg52_r").attr("checked",true);
	}
	if(data.ssjg5_r.indexOf("3")>-1){
		$("#ssjg53_r").attr("checked",true);
	}
	$("#ssjg6_r").val(data.ssjg6_r);
	if(data.ssjg6_r.indexOf("1")>-1){
		$("#ssjg61_r").attr("checked",true);
	}
	if(data.ssjg6_r.indexOf("3")>-1){
		$("#ssjg63_r").attr("checked",true);
	}
	$("#ssjg62_r").val(data.ssjg62_r);
	
	$("#ssjg_qm_r").text(getUser1(data.ssjg_qm_r));
	$("#ssjg_qm_gh_r").text(data.ssjg_qm_r);
	var nian_r =""; 
	var yue_r ="";
	var ri_r = "";
	var ssrq_r = new Date(data.ssrq_r.time);
	if(ssrq_r!=null){
		nian_r = ssrq_r.getFullYear();
		yue_r = ssrq_r.getMonth()+1;
		ri_r = ssrq_r.getDate();
	}
	$("#nian_r").text(nian_r);
	$("#yue_r").text(yue_r);
	$("#ri_r").text(ri_r);
	
}
//儿童 手术记录取值
function er_ssjl_get(){
	//病例号
	var blh = $("#patientInfo").children("span").first().text();
	var er_id = $("#er_id").val();	//屈光手术id
	if(er_id==""){
		er_id=null;
	}
	var czrq = new Date();
	var ssrq_r = $("#ssrq_r").val()==""?new Date():new Date($("#ssrq_r").val());
	var ssrq_l = $("#ssrq_l").val()==""?new Date():new Date($("#ssrq_l").val());
	var temp = {
			id:er_id,
			blh:blh,
			zlfs_r:$("#zlfs_r").val(),
			zlfs_l:$("#zlfs_l").val(),
			mzfs_r:$("#mzfs_r").val(),
			mzfs_l:$("#mzfs_l").val(),
			jzds_r:$("#jzds_r").val(),
			jzds_l:$("#jzds_l").val(),
			zyd_r:$("#zyd_r").val(),
			zyd_l:$("#zyd_l").val(),
			zyd2_r:$("#zyd2_r").val(),
			zyd2_l:$("#zyd2_l").val(),
			gqzj_r:$("#gqzj_r").val(),
			gqzj_l:$("#gqzj_l").val(),
			ddjl_r:$("#ddjl_r").val(),
			ddjl_l:$("#ddjl_l").val(),
			MASK_r:$("#MASK_r").val(),
			MASK_l:$("#MASK_l").val(),
			ssys_r:$("#ssys_r_gh").val(),
			ssys_l:$("#ssys_l_gh").val(),
			ssrq_r:ssrq_r,
			ssrq_l:ssrq_l,
			czrq:czrq,
			bz:$("#bz").val()
	};
	return temp;
}

//晶体手术记录赋值
function jt_ssjl_get(){
	//病例号
	var blh = $("#patientInfo").children("span").first().text();
	var jt_id = $("#jt_id").val();	//屈光手术id
	if(jt_id==""){
		jt_id=null;
	}
	var czrq = new Date();
	var jkjy = $("input[name='jkjy']:checked");
	var jkjys = "";
	$.each(jkjy,function(i,item){
		jkjys+=$(item).val();
	});
	//术晨准备
	var sczb = $("input[name='sczb']:checked");
	var sczbs = "";
	$.each(sczb,function(i,item){
		sczbs+=$(item).val();
	});
	//泪道冲洗
	var ldcx = $("input[name='ldcx']:checked");
	var ldcxs = "";
	$.each(ldcx,function(i,item){
		ldcxs+=$(item).val();
	});
	//麻醉方法
	var mzff = $("input[name='mzff']:checked");
	var mzffs = "";
	$.each(mzff,function(i,item){
		mzffs+=$(item).val();
	});
	//麻药
	var my = $("input[name='my']:checked");
	var mys = "";
	$.each(my,function(i,item){
		mys+=$(item).val();
	});
	//开始时间
	var kssj = $("#kssj").val()==""?new Date():new Date($("#kssj").val());
	var jssj = $("#jssj").val()==""?new Date():new Date($("#jssj").val());
	//手术名称
	var ssmc = $("input[name='ssmc']:checked");
	var ssmcs = "";
	$.each(ssmc,function(i,item){
		ssmcs+=$(item).val();
	});
	//手术经过5
	var ssjg5 = $("input[name='ssjg5']:checked");
	var ssjg5s = "";
	$.each(ssjg5,function(i,item){
		ssjg5s+=$(item).val();
	});
	//手术经过6
	var ssjg6 = $("input[name='ssjg6']:checked");
	var ssjg6s = "";
	$.each(ssjg6,function(i,item){
		ssjg6s+=$(item).val();
	});
	//操作日期
	var czrq = new Date();
	//右眼
	var czrq_r = new Date();
	var jkjy_r = $("input[name='jkjy_r']:checked");
	var jkjys_r = "";
	$.each(jkjy_r,function(i,item){
		jkjys_r+=$(item).val();
	});
	//术晨准备
	var sczb_r = $("input[name='sczb_r']:checked");
	var sczbs_r = "";
	$.each(sczb_r,function(i,item){
		sczbs_r+=$(item).val();
	});
	//泪道冲洗
	var ldcx_r = $("input[name='ldcx_r']:checked");
	var ldcxs_r = "";
	$.each(ldcx_r,function(i,item){
		ldcxs_r+=$(item).val();
	});
	//麻醉方法
	var mzff_r = $("input[name='mzff_r']:checked");
	var mzffs_r = "";
	$.each(mzff_r,function(i,item){
		mzffs_r+=$(item).val();
	});
	//麻药
	var my_r = $("input[name='my_r']:checked");
	var mys_r = "";
	$.each(my_r,function(i,item){
		mys_r+=$(item).val();
	});
	//开始时间
	var kssj_r = $("#kssj_r").val()==""?new Date():new Date($("#kssj_r").val());
	var jssj_r = $("#jssj_r").val()==""?new Date():new Date($("#jssj_r").val());
	//手术名称
	var ssmc_r = $("input[name='ssmc_r']:checked");
	var ssmcs_r = "";
	$.each(ssmc_r,function(i,item){
		ssmcs_r+=$(item).val();
	});
	//手术经过5
	var ssjg5_r = $("input[name='ssjg5_r']:checked");
	var ssjg5s_r = "";
	$.each(ssjg5_r,function(i,item){
		ssjg5s_r+=$(item).val();
	});
	//手术经过6
	var ssjg6_r = $("input[name='ssjg6_r']:checked");
	var ssjg6s_r = "";
	$.each(ssjg6_r,function(i,item){
		ssjg6s_r+=$(item).val();
	});
	//操作日期
	var czrq_r = new Date();
	var temp={
			id:jt_id,
			kebie:$("#kebie").text(),
			blh:$("#blh").text(),

			jkjy:jkjys,
			yanbie:$("input[name='yanbie']:checked").val(),
			sg:$("#sg").val(),
			tz:$("#tz").val(),
			tw:$("#tw").val(),
			mb:$("#mb").val(),
			hx:$("#hx").val(),
			xy:$("#xy").val(),
			sczb:sczbs,
			ldcx:ldcxs,
			bz:$("#bz").val(),
			sqzb_qm:$("#sqzb_qm_gh").text(),
			
			mzff:mzffs,
			my:mys,
			qt:$("#qt").val(),
			kssj:kssj,
			jssj:jssj,
			ssmc:ssmcs,
			cj:$("#cj").val(),
			xh:$("#xh").val(),
			zdys:$("#zdys_gh").val(),
			zsys:$("#zsys_gh").val(),
			hs:$("#hs_gh").val(),
			ssjl_qm:$("#ssjl_qm_gh").text(),
			
			ssjg1:$("#ssjg1").val(),
			ssjg31:$("#ssjg31").val(),
			ssjg32:$("#ssjg32").val(),
			ssjg33:$("#ssjg33").val(),
			ssjg41:$("#ssjg41").val(),
			ssjg42:$("#ssjg42").val(),
			ssjg43:$("#ssjg43").val(),
			ssjg44:$("#ssjg44").val(),
			ssjg5:ssjg5s,
			ssjg6:ssjg6s,
			ssjg62:$("#ssjg62").val(),
			ssjg_qm:$("#ssjg_qm_gh").text(),
			ssrq:kssj,
			czrq:czrq,
			//右眼
			jkjy_r:jkjys_r,
			yanbie_r:$("input[name='yanbie_r']:checked").val(),
			sg_r:$("#sg_r").val(),
			tz_r:$("#tz_r").val(),
			tw_r:$("#tw_r").val(),
			mb_r:$("#mb_r").val(),
			hx_r:$("#hx_r").val(),
			xy_r:$("#xy_r").val(),
			sczb_r:sczbs_r,
			ldcx_r:ldcxs_r,
			bz_r:$("#bz_r").val(),
			sqzb_qm_r:$("#sqzb_qm_gh_r").text(),
			
			mzff_r:mzffs_r,
			my_r:mys_r,
			qt_r:$("#qt_r").val(),
			kssj_r:kssj_r,
			jssj_r:jssj_r,
			ssmc_r:ssmcs_r,
			cj_r:$("#cj_r").val(),
			xh_r:$("#xh_r").val(),
			zdys_r:$("#zdys_gh_r").val(),
			zsys_r:$("#zsys_gh_r").val(),
			hs_r:$("#hs_gh_r").val(),
			ssjl_qm_r:$("#ssjl_qm_gh_r").text(),
			
			ssjg1_r:$("#ssjg1_r").val(),
			ssjg31_r:$("#ssjg31_r").val(),
			ssjg32_r:$("#ssjg32_r").val(),
			ssjg33_r:$("#ssjg33_r").val(),
			ssjg41_r:$("#ssjg41_r").val(),
			ssjg42_r:$("#ssjg42_r").val(),
			ssjg43_r:$("#ssjg43_r").val(),
			ssjg44_r:$("#ssjg44_r").val(),
			ssjg5_r:ssjg5s_r,
			ssjg6_r:ssjg6s_r,
			ssjg62_r:$("#ssjg62_r").val(),
			ssjg_qm_r:$("#ssjg_qm_gh_r").text(),
			ssrq_r:kssj_r,
			czrq_r:czrq_r
	};
	return temp;
}
//手术记录——准分子
function ssjl_zfz(){
	var div_body = $("#div_show_4_2_2").html("");
	$("<div/>").attr("style","width:90%;height:10px;margin-left:5%;").appendTo(div_body);
	//$("<div/>").attr("id","div_liebiao").attr("style","width:90%;height:20px;margin-left:5%;background:url(../style/green/images/thbg.png) repeat-x left;").appendTo(div_body).html("<h3>>>详情</h3>");
	var div_top = $("<div/>").attr("id","ssjl_add").attr("style","width:633;height:400px;margin-left:5%;background:;border:0px solid #d2d2d2;background:;").appendTo(div_body);
	$("<div/>").attr("style","width:90%;height:20px;margin-left:5%;").appendTo(div_body);
	//$("<div/>").attr("style","width:90%;height:20px;margin-left:5%;background:url(../style/green/images/thbg.png) repeat-x left;").appendTo(div_body).html("<h3>>>列表</h3>");
	//var div_bottom = $("<div/>").attr("id","ssjl_list").attr("style","width:90%;height:170px;margin-left:5%;background:;border:0px solid #d2d2d2;").appendTo(div_body);
	//添加
	reset_ssjl_div_top();
	ssjl_set();//赋值
	//selrow();//行选择
	var blh = $("#patientInfo").children("span").first().text();
	//list_qgss(blh);//列表
	//sel_list_ssjl();//列表选中行
	//$(pageList).attr("style","width:100%;margin-left:-10px;margin-top:-7px;");
	setValue_qg();
}
//儿童 术后记录（手术设计）
function reset_ssjl_er_top(){
	var div_top = $("#ssjl_add").html(tbl_ssjl_er_add());
	$("<div/>").attr("style","width:100%;height:20px;text-align:center;margin-top:0px;").html("" +
			"<input type='hidden' id='er_id'/>" +
			"<input type='button' value='提交' style='width:60px;height:20px;' onclick='ti_er_ssjl(1)'/>&nbsp;&nbsp;&nbsp;&nbsp;" +
			"<input type='button' value='重置' style='width:60px;height:20px;' onclick='_emr_show_ssjl();'/>&nbsp;&nbsp;&nbsp;&nbsp;" +
			"<input type='button' value='打印' style='width:60px;height:20px;' onclick='print_er_ssjl()'/>").appendTo(div_top);
		calendarFun_yy("ssrq_l");
		calendarFun_yy("ssrq_r");
}
function print_er_ssjl(){
	$("#er_ssjl").printArea();
}
//晶体
function reset_ssjl_jt_top(){
	var div_top = $("#ssjl_add").html(tbl_ssjl_jt_add());
	$("<div/>").attr("style","width:100%;height:20px;text-align:center;margin-top:0px;").html("" +
			"<input type='hidden' id='jt_id'/>" +
			"<input type='button' value='提交' style='width:60px;height:20px;' onclick='ti_jt_ssjl(1)'/>&nbsp;&nbsp;&nbsp;&nbsp;" +
			"<input type='button' value='重置' style='width:60px;height:20px;' onclick='_emr_show_ssjl();'/>&nbsp;&nbsp;&nbsp;&nbsp;" +
			"<input type='button' value='打印(左)' style='width:60px;height:20px;' onclick='print_jtssjl_l()'/>"+"<input type='button' value='打印(右)' style='width:60px;height:20px;' onclick='print_jtssjl_r()'/>").appendTo(div_top);
	
		calendarFun_yy("ssrq_l");
		calendarFun_yy("ssrq_r");
	
}
//打印晶体手术记录
function print_jtssjl_l(){
	if($("#yb_r").attr("checked")=="checked"){
		$("#yb_r").parent().html("<label style='font-size:20px;'/>右</label>");
	}else if($("#yb_l").attr("checked")=="checked"){
		$("#yb_l").parent().html("<label style='font-size:20px;'/>左</label>");
	}else if($("#yb_s").attr("checked")=="checked"){
		$("#yb_s").parent().html("<label style='font-size:20px;'/>双</label>");
	}
//	$(":checked").each(function(){
//		$(this).replaceWith("√");
//	});
	$("input[type='checkbox']").each(function(){
		if($(this).attr("checked")=="checked"){
			$(this).replaceWith("√");
		}else{
			$(this).remove();
		}
	});
		
		var lt=$("#jtssjl").children('div:eq(0)').printArea();
//		var lt=$("#jtssjl").children('div:eq(0)').printArea({extraCss:contextPath+'/jquery_ui/css/start/jquery-ui-1.10.2.custom.css'});
		
	//$("#jtssjl").printArea();
//	var t1=$("#jtssjl").print
}
function print_jtssjl_r(){
	if($("#yb_r").attr("checked")=="checked"){
		$("#yb_r").parent().html("<label style='font-size:20px;'/>右</label>");
	}else if($("#yb_l").attr("checked")=="checked"){
		$("#yb_l").parent().html("<label style='font-size:20px;'/>左</label>");
	}else if($("#yb_s").attr("checked")=="checked"){
		$("#yb_s").parent().html("<label style='font-size:20px;'/>双</label>");
	}
//	$(":checked").each(function(){
//		$(this).replaceWith("√");
//	});
	$("input[type='checkbox']").each(function(){
		if($(this).attr("checked")=="checked"){
			$(this).replaceWith("√");
		}else{
			$(this).remove();
		}
	});
	var lt=$("#jtssjl").children('div:eq(1)').printArea();
//	var t1=$("#jtssjl").print
}
function print_shjl_one(){
	$("input[type='checkbox']").each(function(){
		if($(this).attr("checked")=="checked"){
			$(this).replaceWith("√");
		}else{
			$(this).remove();
		}
	});
	$("#shjl_show_div").printArea();
	_emr_show_shjl();
}
//准分子
function reset_ssjl_div_top(){
	var div_top = $("#ssjl_add").html(tbl_ssjl_add());
	findRecorder();
	$("<div/>").attr("style","width:683px;height:20px;text-align:right;margin-top:0px;").html("" +
			"<input type='hidden' id='qgss_id'/><input type='hidden' id='qgss_temp' value='0'/>" +
			"<input type='button' value='提交' style='width:60px;height:20px;' onclick='ti_qgss(1)'/>&nbsp;&nbsp;&nbsp;&nbsp;" +
			"<input type='button' value='重置' style='width:60px;height:20px;' onclick='_emr_show_ssjl();'/>&nbsp;&nbsp;&nbsp;&nbsp;" +
			"<input type='button' value='打印' style='width:60px;height:20px;' onclick='print_ssjl()'/>").appendTo(div_top);
		calendarFun_yy("ssrq_l");
		$("#ssrq_l").val(formatDate(new Date()));
		calendarFun_yy("ssrq_r");
		$("#ssrq_r").val(formatDate(new Date()));
}
//手术记录 添加table 儿童
function tbl_ssjl_er_add(){
	return blmb1(74);
}
//手术记录添加table 晶体
function tbl_ssjl_jt_add(){
	return blmb1(71);
	
}
//手术记录添加table
//function tbl_ssjl_add(){
//	var tab_add = "<div id='ssjl_show_div' style='width:623px;'><table id='ssjlAdd' cellpadding='0' cellspacing='0' width='100%' style='border-top:1px solid #d2d2d2;border-left:1px solid #d2d2d2;'>" +
//	"<tr>" +
//		"<td width='10%' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'></td>" +
//		"<td align='center' width='35%' class='td_border'  style='background:url(../style/green/images/thbg1.png) repeat-x left;'>左</td>" +
//		"<td align='center' width='35%' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>右</td>" +
//		"<td width='20%' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'></td>"+
//	"</tr>" +
//	"<tr>" +
//		"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>手术方式</td>" +
//		"<td align='center' class='td_border'><label id='ssfs_l'></label></td>" +
//		"<td align='center' class='td_border'><label id='ssfs_r'></label></td>" +
//		"<td rowspan='8' class='td_border'>" +
//			"<table border='0' cellpadding='0' cellspacing='0' width='100%' height='100%' >" +
//				"<tr>" +
//					"<td rowspan='4' class='td_border' align='center'>手<br/>术<br/>结<br/>果</td>"+
//					"<td align='center'>左</td>" +
//					"<td align='center'>右</td>" +
//				"</tr>" +
//				"<tr>" +
//					"<td align='center'><input type='checkbox' id='btn1_l' name='btn_l' value='0'/><label name='ssjg_l'/>&nbsp;&nbsp;顺利</label></td>" +
//					"<td align='center'><input type='checkbox' id='btn1_r' name='btn_r' value='0'/><label name='ssjg_r'/>&nbsp;&nbsp;顺利</label></td>" +
//				"</tr>" +
//				"<tr>" +
//					"<td align='center'><input type='checkbox' id='btn2_l' name='btn_l' value='1'/><label name='ssjg_l'/>&nbsp;&nbsp;转眼</label></td>" +
//					"<td align='center'><input type='checkbox' id='btn2_r' name='btn_r' value='1'/><label name='ssjg_r'/>&nbsp;&nbsp;转眼</label></td>" +
//				"</tr>" +
//				"<tr>" +
//					"<td style='border-bottom:1px solid #d2d2d2;' align='center'><input type='checkbox' id='btn3_l' name='btn_l' value='2'/><label name='ssjg_l'/>&nbsp;&nbsp;挤眼</label></td>" +
//					"<td style='border-bottom:1px solid #d2d2d2;' align='center'><input type='checkbox' id='btn3_r' name='btn_r' value='2'/><label name='ssjg_r'/>&nbsp;&nbsp;挤眼</label></td>" +
//				"</tr>" +
//				"<tr>" +
//					"<td style='border-right:1px solid #d2d2d2;' align='center'>备注</td>" +
//					"<td colspan='2'><textarea id='ssjl_bz' name='tarea1' style='border:0px;width:98%;height:98%;'></textarea></td>" +
//				"</tr>" +
//			"</table>" +
//		"</td>"+
//	"</tr>" +
//	"<tr>" +
//		"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>矫正度数</td>" +
//		"<td align='center' class='td_border'>" +
//			"<input type='text' id='jzds_l' style='width:50px;border:0px;text-align:center;'/>DS"+
//             "<input type='text' id='jzds2_l' style='width:50px;border:0px;text-align:center;'/>DC×"+
//             "<input type='text' id='jzds3_l' style='width:50px;border:0px;text-align:center;'/>"+
//		"</td>" +
//		"<td align='center' class='td_border'>" +
//		"<input type='text' id='jzds_r' style='width:50px;border:0px;text-align:center;'/>DS"+
//         "<input type='text' id='jzds2_r' style='width:50px;border:0px;text-align:center;'/>DC×"+
//         "<input type='text' id='jzds3_r' style='width:50px;border:0px;text-align:center;'/>"+
//	"</td>" +
//		"<td align='center' class='td_border'><input type='text' class='input90' id='jzds_r' name='ss_r' style='border:0px;'/></td>" +
//	"</tr>" +
//	"<tr>" +
//		"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>光区直径</td>" +
//		"<td align='center' class='td_border'><input type='text' class='input80'  id='gqzj_l' name='ss_l'  style='border:0px;'/>mm</td>" +
//		"<td align='center' class='td_border'><input type='text' class='input80'  id='gqzj_r' name='ss_r'  style='border:0px;'/>mm</td>" +
//	"</tr>" +
//	"<tr>" +
//		"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>顶点距离</td>" +
//		"<td align='center' class='td_border'><input type='text' class='input80' id='ddjl_l' name='ss_l' value='12' style='border:0px;'/>mm</td>" +
//		"<td align='center' class='td_border'><input type='text' class='input80' id='ddjl_r' name='ss_r' value='12' style='border:0px;'/>mm</td>" +
//	"</tr>" +
//	"<tr>" +
//		"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>Kappa角</td>" +
//		"<td align='center' class='td_border'>"+
//			"X&nbsp;&nbsp;<input type='text' id='kappa_x_l' name='ss_l' style='width:40%;border:0px;'/>&nbsp;&nbsp;" +
//			"Y&nbsp;&nbsp;<input type='text' id='kappa_y_l' name='ss_l' style='width:40%;border:0px;'/>" +
//		"</td>" +
//		"<td align='center' class='td_border'>" +
//			"X&nbsp;&nbsp;<input type='text' id='kappa_x_r' name='ss_r' style='width:40%;border:0px;'/>&nbsp;&nbsp;" +
//			"Y&nbsp;&nbsp;<input type='text' id='kappa_y_r' name='ss_r' style='width:40%;border:0px;'/>" +
//		"</td>" +
//	"</tr>" +
//	"<tr>" +
//		"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>目标Q值</td>" +
//		"<td align='center' class='td_border'><input type='text' class='input80' id='mbqz_l' name='ss_l' style='border:0px;'/></td>" +
//		"<td align='center' class='td_border'><input type='text' class='input80' id='mbqz_r' name='ss_r' style='border:0px;'/></td>" +
//	"</tr>" +
//	"<tr>" +
//		"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>手术医生</td>" +
//		"<td align='center' class='td_border'>" +
//			"<input type='text' id='ssys_l' class='input90' name='ss_l' style='border:0px;' />"+
//			"<input type='hidden' id='ssys_l_gh'/>"+
//		"</td>" +
//		"<td align='center' class='td_border'>" +
//			"<input type='text' id='ssys_r' class='input90' name='ss_r' style='border:0px;'/>"+
//			"<input type='hidden' id='ssys_r_gh'/>"+
//		"</td>" +
//	"</tr>" +
//	"<tr>" +
//		"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>手术日期</td>" +
//		"<td align='center' class='td_border'><input type='text' class='input90' style='border:0px;' id='ssrq_l' name='ss_l' readonly='readonly'/></td>" +
//		"<td align='center' class='td_border'><input type='text' class='input90' style='border:0px;' id='ssrq_r' name='ss_r' readonly='readonly'/></td>" +
//	"</tr>" +
//"</table></div>";
//	return tab_add;
//}
function tbl_ssjl_add(){
	var tab_add = "<div id='ssjl_show_div' style='padding-bottom: 10px; margin: 0px auto; padding-left: 10px; width: 683px; padding-right: 10px; background: rgb(255,255,255); color: rgb(79,79,79); padding-top: 10px'>" +
			"<h1 style='text-align: center; line-height: 30px; height: 30px; font-size: 25px'>手术记录</h1>"+
		    "<div style='width:683px;border-bottom: rgb(51,51,51) 2px solid; font-size: 12px; border-top: rgb(51,51,51) 2px solid '>"+
		        "<table border='0' cellpadding='0' cellspacing='0' width='100%' style='font-size:12px;text-align:center;'>"+
		            "<tbody>"+
		                "<tr>"+
		                    "<th nowrap='nowrap' width='10%'>ID号：</th>"+
		                    "<td width='15%'>"+
		                        "<label id='caseNumber'>caseNumber</label></td>"+
		                    "<th height='30' nowrap='nowrap' width='10%''>"+
		                        "姓名：</th>"+
		                    "<td width='15%'>"+
		                        "<label id='suffererName'>suffererName</label></td>"+
		                    "<th nowrap='nowrap' width='10%'>性别：</th>"+
		                    "<td width='15%'><label id='sex'>sex</label></td>"+
		                    "<th nowrap='nowrap' width='10%'>年龄：</th>"+
		                    "<td width='15%'><label id='age'>age</label></td>"+
		                "</tr>"+
		            "</tbody>"+
		        "</table>"+
		    "</div>" +
			"<div style='width:683px;padding-top:10px;'>" +
				"<table id='ssjlAdd' cellpadding='0' cellspacing='0' width='100%' style='border-top:1px solid rgb(51,51,51);border-left:1px solid rgb(51,51,51);'>" +
					"<tr>" +
						"<td width='10%' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;text-align:center;'>眼别</td>" +
						"<td align='center' width='45%' class='td_border'  style='background:url(../style/green/images/thbg1.png) repeat-x left;'>右</td>" +
						"<td align='center' width='45%' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>左</td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>手术方式</td>" +
						"<td align='center' class='td_border'><label id='ssfs_r'></label></td>" +
						"<td align='center' class='td_border'><label id='ssfs_l'></label></td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>矫正度数</td>" +
						"<td align='center' class='td_border'>" +
							"<input type='text' id='jzds_r' style='width:50px;border:0px;text-align:center;'/>&nbsp;&nbsp;DS&nbsp;&nbsp;"+
					         "<input type='text' id='jzds2_r' style='width:50px;border:0px;text-align:center;'/>&nbsp;&nbsp;DC×&nbsp;&nbsp;"+
					         "<input type='text' id='jzds3_r' style='width:50px;border:0px;text-align:center;'/>"+
						"</td>" +
						"<td align='center' class='td_border'>" +
							"<input type='text' id='jzds_l' style='width:50px;border:0px;text-align:center;'/>&nbsp;&nbsp;DS&nbsp;&nbsp;"+
					         "<input type='text' id='jzds2_l' style='width:50px;border:0px;text-align:center;'/>&nbsp;&nbsp;DC×&nbsp;&nbsp;"+
					         "<input type='text' id='jzds3_l' style='width:50px;border:0px;text-align:center;'/>"+
						"</td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>光区直径</td>" +
						"<td align='center' class='td_border'><input type='text' class='input80'  id='gqzj_r' name='ss_r'  style='border:0px;'/>mm</td>" +
						"<td align='center' class='td_border'><input type='text' class='input80'  id='gqzj_l' name='ss_l'  style='border:0px;'/>mm</td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>顶点距离</td>" +
						"<td align='center' class='td_border'><input type='text' class='input80' id='ddjl_r' name='ss_r' value='12' style='border:0px;'/>mm</td>" +
						"<td align='center' class='td_border'><input type='text' class='input80' id='ddjl_l' name='ss_l' value='12' style='border:0px;'/>mm</td>" +
					"</tr>" +
							//新增4项
					"<tr>" +
					"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>底座厚度</td>" +
					"<td align='center' class='td_border'><input type='text' class='input80' id='dzhd_r' name='ss_r' value='' style='border:0px;'/>mm</td>" +
					"<td align='center' class='td_border'><input type='text' class='input80' id='dzhd_l' name='ss_l' value='' style='border:0px;'/>mm</td>" +
				"</tr>" +
				"<tr>" +
				"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>帽厚度</td>" +
				"<td align='center' class='td_border'><input type='text' class='input80' id='mhd_r' name='ss_r' value='' style='border:0px;'/>μm</td>" +
				"<td align='center' class='td_border'><input type='text' class='input80' id='mhd_l' name='ss_l' value='' style='border:0px;'/>μm</td>" +
			"</tr>" +
			"<tr>" +
			"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>透镜厚度</td>" +
			"<td align='center' class='td_border'><input type='text' class='input80' id='tjhd_r' name='ss_r' value='' style='border:0px;'/>μm</td>" +
			"<td align='center' class='td_border'><input type='text' class='input80' id='tjhd_l' name='ss_l' value='' style='border:0px;'/>μm</td>" +
		"</tr>" +
		"<tr>" +
		"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>剩余基质厚度</td>" +
		"<td align='center' class='td_border'><input type='text' class='input80' id='syjzhd_r' name='ss_r' value='' style='border:0px;'/>μm</td>" +
		"<td align='center' class='td_border'><input type='text' class='input80' id='syjzhd_l' name='ss_l' value='' style='border:0px;'/>μm</td>" +
		"</tr>" +
					"<tr style='display:none'>" +
						"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>Kappa角</td>" +
						"<td align='center' class='td_border'>" +
							"X&nbsp;&nbsp;<input type='text' id='kappa_x_r' name='ss_r' style='width:40%;border:0px;'/>&nbsp;&nbsp;" +
							"Y&nbsp;&nbsp;<input type='text' id='kappa_y_r' name='ss_r' style='width:40%;border:0px;'/>" +
						"</td>" +
						"<td align='center' class='td_border'>"+
							"X&nbsp;&nbsp;<input type='text' id='kappa_x_l' name='ss_l' style='width:40%;border:0px;'/>&nbsp;&nbsp;" +
							"Y&nbsp;&nbsp;<input type='text' id='kappa_y_l' name='ss_l' style='width:40%;border:0px;'/>" +
						"</td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>目标Q值</td>" +
						"<td align='center' class='td_border'><input type='text' class='input80' id='mbqz_r' name='ss_r' style='border:0px;'/></td>" +
						"<td align='center' class='td_border'><input type='text' class='input80' id='mbqz_l' name='ss_l' style='border:0px;'/></td>" +
					"</tr>" +
					"<tr style='display:none'>" +
						"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>地形图修正度数</td>" +
						"<td align='center' class='td_border'>" +
							"<input type='text' id='dxtxzds_r' style='width:50px;border:0px;text-align:center;'/>&nbsp;&nbsp;DS&nbsp;&nbsp;"+
					         "<input type='text' id='dxtxzds2_r' style='width:50px;border:0px;text-align:center;'/>&nbsp;&nbsp;DC×&nbsp;&nbsp;"+
					         "<input type='text' id='dxtxzds3_r' style='width:50px;border:0px;text-align:center;'/>"+
						"</td>" +
						"<td align='center' class='td_border'>" +
							"<input type='text' id='dxtxzds_l' style='width:50px;border:0px;text-align:center;'/>&nbsp;&nbsp;DS&nbsp;&nbsp;"+
					         "<input type='text' id='dxtxzds2_l' style='width:50px;border:0px;text-align:center;'/>&nbsp;&nbsp;DC×&nbsp;&nbsp;"+
					         "<input type='text' id='dxtxzds3_l' style='width:50px;border:0px;text-align:center;'/>"+
						"</td>" +
					"</tr>" +
					"<tr style='display:none'>" +
						"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>切削深度</td>" +
						"<td align='center' class='td_border'><input type='text' class='input80' id='qxsd_r' name='ss_r' style='border:0px;'/>µm</td>" +
						"<td align='center' class='td_border'><input type='text' class='input80' id='qxsd_l' name='ss_l' style='border:0px;'/>µm</td>" +
					"</tr>" +
					"<tr style='display:none'>" +
						"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>基质床剩余厚度</td>" +
						"<td align='center' class='td_border'><input type='text' class='input80' id='syhd_r' name='ss_r' style='border:0px;'/>µm</td>" +
						"<td align='center' class='td_border'><input type='text' class='input80' id='syhd_l' name='ss_l' style='border:0px;'/>µm</td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>手术医生</td>" +
						"<td align='center' class='td_border'>" +
							"<input type='text' id='ssys_r' class='input90' name='ss_r' style='border:0px;'  onclick='openFloatDiv(\"ssys_r\")' onkeydown='closeFloatDiv()' readonly='readonly'/>"+
							"<input type='hidden' id='ssys_r_gh'/>"+
						"</td>" +
						"<td align='center' class='td_border'>" +
							"<input type='text' id='ssys_l' class='input90' name='ss_l' style='border:0px;' onclick='openFloatDiv(\"ssys_l\")' onkeydown='closeFloatDiv()' readonly='readonly'/>"+
							"<input type='hidden' id='ssys_l_gh'/>"+
						"</td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>配台技师</td>" +
						"<td align='center' class='td_border'>" +
							"<input type='text' id='ptjs_r' class='input90' name='ss_r' style='border:0px;'  onclick='openFloatDiv(\"ptjs_r\")' onkeydown='closeFloatDiv()' readonly='readonly'/>"+
							"<input type='hidden' id='ptjs_r_gh'/>"+
						"</td>" +
						"<td align='center' class='td_border'>" +
							"<input type='text' id='ptjs_l' class='input90' name='ss_l' style='border:0px;' onclick='openFloatDiv(\"ptjs_l\")' onkeydown='closeFloatDiv()' readonly='readonly'/>"+
							"<input type='hidden' id='ptjs_l_gh'/>"+
						"</td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>配台护士</td>" +
						"<td align='center' class='td_border'>" +
							"<input type='text' id='pths_r' class='input90' name='ss_r' style='border:0px;'  onclick='openFloatDiv(\"pths_r\")' onkeydown='closeFloatDiv()' readonly='readonly'/>"+
							"<input type='hidden' id='pths_r_gh'/>"+
						"</td>" +
						"<td align='center' class='td_border'>" +
							"<input type='text' id='pths_l' class='input90' name='ss_l' style='border:0px;' onclick='openFloatDiv(\"pths_l\")' onkeydown='closeFloatDiv()' readonly='readonly'/>"+
							"<input type='hidden' id='pths_l_gh'/>"+
						"</td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>手术日期</td>" +
						"<td align='center' class='td_border'><input type='text' class='input90' style='border:0px;' id='ssrq_r' name='ss_r' readonly='readonly'/></td>" +
						"<td align='center' class='td_border'><input type='text' class='input90' style='border:0px;' id='ssrq_l' name='ss_l' readonly='readonly'/></td>" +
					"</tr>" +
					"<tr style='display:none'>" +
						"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>手术结果</td>" +
						"<td align='center' class='td_border'>" +
							"<input type='checkbox' id='btn1_r' name='btn_r' value='0'/><label name='ssjg_r'/>&nbsp;&nbsp;顺利</label>&nbsp;&nbsp;" +
							"<input type='checkbox' id='btn2_r' name='btn_r' value='1'/><label name='ssjg_r'/>&nbsp;&nbsp;转眼</label>&nbsp;&nbsp;" +
							"<input type='checkbox' id='btn3_r' name='btn_r' value='2'/><label name='ssjg_r'/>&nbsp;&nbsp;挤眼</label>" +
						"</td>" +
						"<td align='center' class='td_border'>" +
							"<input type='checkbox' id='btn1_l' name='btn_l' value='0'/><label name='ssjg_l'/>&nbsp;&nbsp;顺利</label>&nbsp;&nbsp;" +
							"<input type='checkbox' id='btn2_l' name='btn_l' value='1'/><label name='ssjg_l'/>&nbsp;&nbsp;转眼</label>&nbsp;&nbsp;" +
							"<input type='checkbox' id='btn3_l' name='btn_l' value='2'/><label name='ssjg_l'/>&nbsp;&nbsp;挤眼</label>" +
						"</td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>备注</td>" +
						"<td colspan='2' class='td_border'><textarea id='ssjl_bz' name='tarea1' style='border:0px;width:98%;height:96%;'></textarea></td>" +
					"</tr>" +
					"<tr>" +
					"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>记录人</td>" +
					"<td colspan='2' class='td_border'><select id='recorder'/></td>" +
				"</tr>" +
				"</table>" +
			"</div>" +
		"</div>";
	return tab_add;
}

//手术记录取值
function ssjl_get(){
	//病例号
	var blh = $("#patientInfo").children("span").first().text();
	var qgss_id = $("#qgss_id").val();	//屈光手术id
	if(qgss_id==""){
		qgss_id=null;
	}
	var ssfs_l = $("#ssfs_l").text();	//手术方式 左眼
	var ssfs_r = $("#ssfs_r").text();	//手术方式 右眼
	var jzds_l = $("#jzds_l").val();	//矫正度数 左眼
	var jzds_r = $("#jzds_r").val();	//矫正度数 右眼
	var jzds2_l = $("#jzds2_l").val();	//矫正度数 左眼
	var jzds2_r = $("#jzds2_r").val();	//矫正度数 右眼
	var jzds3_l = $("#jzds3_l").val();	//矫正度数 左眼
	var jzds3_r = $("#jzds3_r").val();	//矫正度数 右眼
	
	var dxtxzds_l = $("#dxtxzds_l").val();	//矫正度数 左眼
	var dxtxzds_r = $("#dxtxzds_r").val();	//地形图修正度数 右眼
	var dxtxzds2_l = $("#dxtxzds2_l").val();	//地形图修正度数 左眼
	var dxtxzds2_r = $("#dxtxzds2_r").val();	//地形图修正度数右眼
	var dxtxzds3_l = $("#dxtxzds3_l").val();	//地形图修正度数 左眼
	var dxtxzds3_r = $("#dxtxzds3_r").val();	//地形图修正度数 右眼
	
	var gqzj_l = $("#gqzj_l").val();	//光区直径 左眼
		//gqzj_l = gqzj_l.substring(0,gqzj_l.length-2);
	var gqzj_r = $("#gqzj_r").val();	//光区直径 右眼
		//gqzj_r = gqzj_r.substring(0,gqzj_r.length-2);
	var ddjl_l = $("#ddjl_l").val();	//顶点距离 左眼
		//ddjl_l = ddjl_l.substring(0,ddjl_l.length-2);
	var ddjl_r = $("#ddjl_r").val();	//顶点距离 右眼
		//ddjl_r = ddjl_r.substring(0,ddjl_r.length-2);
	//新增4项
	var dzhd_r=$("#dzhd_r").val();
	var dzhd_l=$("#dzhd_l").val();
	var mhd_r=$("#mhd_r").val();
	var mhd_l=$("#mhd_l").val();
	var tjhd_r=$("#tjhd_r").val();
	var tjhd_l=$("#tjhd_l").val();
	var syjzhd_r=$("#syjzhd_r").val();
	var syjzhd_l=$("#syjzhd_l").val();	
	var kappa_x_l = $("#kappa_x_l").val();
	var kappa_y_l = $("#kappa_y_l").val(); 
	var kappa_x_r =  $("#kappa_x_r").val();
	var kappa_y_r =  $("#kappa_y_r").val();
	var mbqz_l = $("#mbqz_l").val();
	var mbqz_r = $("#mbqz_r").val();
	var qxsd_l = $("#qxsd_l").val();
	var qxsd_r = $("#qxsd_r").val();
	var syhd_l = $("#syhd_l").val();
	var syhd_r = $("#syhd_r").val();
	var ssys_l = ($("#ssys_l_gh").val() == "" || $("#ssys_l_gh").val() == undefined)? null : $("#ssys_l_gh").val();	//手术医生 左眼
	var ssys_r = ($("#ssys_r_gh").val() == "" || $("#ssys_r_gh").val() == undefined)? null : $("#ssys_r_gh").val();	//手术医生 右眼
	var ptjs_l = $("#ptjs_l_gh").val();	//手术医生 左眼
	var ptjs_r = $("#ptjs_r_gh").val();	//手术医生 右眼
	
	var pths_l = $("#pths_l_gh").val();	//手术医生 左眼
	var pths_r = $("#pths_r_gh").val();	//手术医生 右眼
	
	var ssrq_l = new Date();
	if($("#ssrq_l").val()!=''){
		ssrq_l = new Date($("#ssrq_l").val());
	}
	var ssrq_r = new Date();
	if($("#ssrq_r").val()!=''){
		ssrq_r = new Date($("#ssrq_r").val());
	}
	var ssjg_l = "";
	var ssjg_r = "";
		$("input[name='btn_l']:checked").each(function(){
			ssjg_l+=$(this).val();
			ssjg_l+="@";
		});
		$("input[name='btn_r']:checked").each(function(){
			ssjg_r+=$(this).val();
			ssjg_r+="@";
		});
	var bz = $("#ssjl_bz").val();
	var recorder=$("#recorder").val();
	
	if(ssys_l == null){
		ssfs_l = null;
		jzds_l = null;
		jzds2_l = null;
		jzds3_l = null;
		dxtxzds_l = null;
		dxtxzds2_l = null;
		dxtxzds3_l = null;
		gqzj_l = null;
		dzhd_l = null;
		mhd_l = null;
		tjhd_l = null;
		syjzhd_l = null;
		ddjl_l = null;
		kappa_x_l = null;
		kappa_y_l = null;
		mbqz_l = null;
		qxsd_l = null;
		syhd_l = null;
		ssys_l = null;
		ptjs_l = null;
		pths_l = null;
		ssjg_l = null;
	}
	if(ssys_r == null){
		ssfs_r = null;
		jzds_r = null;
		jzds2_r = null;
		jzds3_r = null;
		dxtxzds_r = null;
		dxtxzds2_r = null;
		dxtxzds3_r = null;
		dzhd_r = null;
		mhd_r = null;
		tjhd_r = null;
		syjzhd_r = null;
		gqzj_r = null;
		ddjl_r = null;
		kappa_x_r = null;
		kappa_y_r = null;
		mbqz_r = null;
		qxsd_r = null;
		syhd_r = null;
		ssys_r = null;
		ptjs_r = null;
		pths_r = null;
		ssjg_r = null;
	}
	var temp = {
		id:qgss_id,
		blh:blh,
		ssfs_l:ssfs_l,
		ssfs_r:ssfs_r,
		jzds_l:jzds_l,
		jzds_r:jzds_r,
		jzds2_l:jzds2_l,
		jzds2_r:jzds2_r,
		jzds3_l:jzds3_l,
		jzds3_r:jzds3_r,
		dxtxzds_l:dxtxzds_l,
		dxtxzds_r:dxtxzds_r,
		dxtxzds2_l:dxtxzds2_l,
		dxtxzds2_r:dxtxzds2_r,
		dxtxzds3_l:dxtxzds3_l,
		dxtxzds3_r:dxtxzds3_r,
		gqzj_l:gqzj_l,
		dzhd_r:dzhd_r,
		dzhd_l:dzhd_l,
		mhd_r:mhd_r,
		mhd_l:mhd_l,
		tjhd_r:tjhd_r,
		tjhd_l:tjhd_l,
		syjzhd_r:syjzhd_r,
		syjzhd_l:syjzhd_l,
		gqzj_r:gqzj_r,
		ddjl_l:ddjl_l,
		ddjl_r:ddjl_r,
		kappa_x_l:kappa_x_l,
		kappa_y_l:kappa_y_l,
		kappa_x_r:kappa_x_r,
		kappa_y_r:kappa_y_r,
		mbqz_l:mbqz_l,
		mbqz_r:mbqz_r,
		qxsd_l:qxsd_l,
		qxsd_r:qxsd_r,
		syhd_l:syhd_l,
		syhd_r:syhd_r,
		ssys_l:ssys_l,
		ssys_r:ssys_r,
		ptjs_l:ptjs_l,
		ptjs_r:ptjs_r,
		pths_l:pths_l,
		pths_r:pths_r,
		ssjg_l:ssjg_l,
		ssjg_r:ssjg_r,
		ssrq_l:ssrq_l,
		ssrq_r:ssrq_r,
		bz:bz,
		recorder:recorder
	};
	return temp;
}

//手术记录赋值
function ssjl_set(){
	setSsfs();	//赋值——手术方式
}
//赋值——手术方式
function setSsfs(){
/*	var yb = $("input[name='yanbie']:checked").val();
	var f1 = $("#sel_lev1").val();
	var f2 = $("#sel_lev2").val();
	var f3 = $("#sel_lev3").val();
	var ssfs = "";
//	if(yb!=undefined){
		if(f1!='--请选择--'){
			ssfs+=f1;
		}
		if(f2!=undefined){
			ssfs+='>'+f2;
		} 
		if(f3!=undefined){
			ssfs+='>'+f3;
		}
		var ssfs = $("#sel_lev1").val();
		//不同的手术方式，不同的手术记录
		if(ssfs=='准分子' && $("#ssfs_l")!=undefined && $("#ssfs_r")!=undefined){
			$("#ssfs_l").text(ssfs);
			$("#ssfs_r").text(ssfs);
		}
		*/
	var lc_id = $("#lc_id").text();
	var lcObj =  getJSONData("/publish/quguang/getQglcById.htm?id="+lc_id,{},"GET").obj;
	var ssxm = lcObj.ssfs1+">"+lcObj.ssfs2+">"+lcObj.ssfs3;
	$("#ssfs_l").text(ssxm);
	$("#ssfs_r").text(ssxm);
//	}
	/*if(yb==0){//左眼
		$(ssfs_l).text(ssfs);
		$(ssfs_r).text("");
		$("input[name='ss_l']").show();
		$("input[name='ss_r']").hide();
		$("input[name='btn_l']").show();
		$("input[name='btn_r']").hide();
	}else if(yb==1){//右眼
		$(ssfs_l).text("");
		$(ssfs_r).text(ssfs);
		$("input[name='ss_l']").hide();
		$("input[name='ss_r']").show();
		$("input[name='btn_l']").hide();
		$("input[name='btn_r']").show();
	}else if(yb==2){//双眼
		$(ssfs_l).text(ssfs);
		$(ssfs_r).text(ssfs);
		$("input[name='ss_l']").show();
		$("input[name='ss_r']").show();
		$("input[name='btn_l']").show();
		$("input[name='btn_r']").show();
	}else{
		$(ssfs_l).text("");
		$(ssfs_r).text("");
		$("input[name='ss_l']").show();
		$("input[name='ss_r']").show();
		$("input[name='btn_l']").show();
		$("input[name='btn_r']").show();
	}*/
}

/**
 * 术后记录
 */
function _emr_show_shjl(){
	$("#ssfsfl").hide();
	$("#div_ssfs").hide();
	if($("#lc_id").text()=='无'){
		$("#div_show_4_2_2").html("<div style='width:530px;height:100px;margin:auto;margin-top:200px;text-align:center;'><label style='font-size:35px;color:blue;'>请先提交病历，或者点击“既往病历”页签，选择一份病历！</label></div>");
	}else{
		var div_body = $("#div_show_4_2_2").html("");
		$("<div/>").attr("style","width:683px;height:10px;margin-left:10%;").appendTo(div_body);
		//$("<div/>").attr("id","div_liebiao").attr("style","width:90%;height:20px;margin-left:5%;background:url(../style/green/images/thbg.png) repeat-x left;").appendTo(div_body).html("<h3>>>详情</h3>");
		var div_top = $("<div/>").attr("id","shjl_add").attr("style","683px;margin-left:5%;background:;border:0px solid #d2d2d2;").appendTo(div_body);
		//$("<div/>").attr("style","width:683px;height:20px;margin-left:10%;").appendTo(div_body);
		//$("<div/>").attr("style","width:90%;height:20px;margin-left:5%;background:url(../style/green/images/thbg.png) repeat-x left;").appendTo(div_body).html("<h3>>>列表</h3>");
		var div_bottom = $("<div/>").attr("id","shjl_list").attr("style","width:683px;height:170px;margin-left:20%;background:;border:0px solid #d2d2d2;").appendTo(div_body);
		//添加
		reset_shjl_div_top();
		
		//列表
		var blh = $("#patientInfo").children("span").first().text();
		list_shjl(blh);//列表
		$(pageList).attr("style","width:100%;margin-left:-10px;margin-top:-7px;");
		sel_list_shjl();//列表选中行
		qgqz();//签字
		//btn_ctrl();//按钮权限控制
		//setValue_qg();//页面赋值
		set_qgShjl_clyj();
		calendarFun_yy("sj");
	}
	var blh = $("#patientInfo").children("span").first().text();
	shjl_set_jbxx(blh);
}
//术后记录 取值
function shjl_get(){
	//病例号
	var blh = $("#patientInfo").children("span").first().text();
	var shjl_id = $("#shjl_id").val();	//屈光手术id
	if(shjl_id==""){
		shjl_id=null;
	}
	var zs_l = $("#zs_l").val();	//主述 左眼
	var zs_r = $("#zs_r").val();	//主述 右眼
	var sl_l = $("#sl_l").val();	//视力 左眼
	var sl_r = $("#sl_r").val();	//视力 右眼
	var xtsp1_l = $("#xtsp1_l").val();	//小瞳试片 左眼
	var xtsp2_l = $("#xtsp2_l").val();	//小瞳试片 左眼
	var xtsp3_l = $("#xtsp3_l").val();	//小瞳试片 左眼
	var xtsp4_l = $("#xtsp4_l").val();	//小瞳试片 左眼
	var xtsp1_r = $("#xtsp1_r").val();	//小瞳试片 右眼
	var xtsp2_r = $("#xtsp2_r").val();	//小瞳试片 右眼
	var xtsp3_r = $("#xtsp3_r").val();	//小瞳试片 右眼
	var xtsp4_r = $("#xtsp4_r").val();	//小瞳试片 右眼
	var lxd_l = $("#lxd_l").val();	//裂隙灯 左眼
	var lxd_r = $("#lxd_r").val();	//裂隙灯 右眼
	
	var dxt_l = "0";	//地形图 左眼
	var dxt_r = "0";	//地形图 右眼
	if($("#dxt_l").attr("checked")=="checked"){
		dxt_l="1";
	}
	if($("#dxt_r").attr("checked")=="checked"){
		dxt_r="1";
	}
	
	var yy_l = $("#yy_l").val();	//眼压 左眼
		//yy_l = yy_l.substring(0,yy_l.length-4);
	var yy_r = $("#yy_r").val();	//眼压 右眼
		//yy_r = yy_r.substring(0,yy_r.length-4);
	var cl_l = $("#cl_l").val();	//处理 左眼
	var cl_r = $("#cl_r").val();	//处理 右眼
	var sj = $("#sj").val();	//时间
	var qm = $("#qm_gh").text();	//签名
	var bz_shjl_l = $("#bz_shjl_l").val(); //备注术后记录
	var bz_shjl_r = $("#bz_shjl_r").val(); //备注术后记录
	var temp = {
		id:shjl_id,
		blh:blh,
		zs_l:zs_l,
		zs_r:zs_r,
		sl_l:sl_l,
		sl_r:sl_r,
		xtsp1_l:xtsp1_l,
		xtsp2_l:xtsp2_l,
		xtsp3_l:xtsp3_l,
		xtsp4_l:xtsp4_l,
		xtsp1_r:xtsp1_r,
		xtsp2_r:xtsp2_r,
		xtsp3_r:xtsp3_r,
		xtsp4_r:xtsp4_r,
		lxd_l:lxd_l,
		lxd_r:lxd_r,
		dxt_l:dxt_l,
		dxt_r:dxt_r,
		yy_l:yy_l,
		yy_r:yy_r,
		cl_l:cl_l,
		cl_r:cl_r,
		sj:sj,
		qm:qm,
		bz_shjl_l:bz_shjl_l,
		bz_shjl_r:bz_shjl_r,
		zs_qz:$("#zs_qz_gh").text(),
		sl_qz:$("#sl_qz_gh").text(),
		xtsp_qz:$("#xtsp_qz_gh").text(),
		lxd_qz:$("#lxd_qz_gh").text(),
		dxt_qz:$("#dxt_qz_gh").text(),
		yy_qz:$("#yy_qz_gh").text(),
		cl_qz:$("#cl_qz_gh").text(),
		bz_qz:$("#bz_qz_gh").text()
	};
	return temp;
}
function reset_shjl_div_top(){
	var div_top = $("#shjl_add").html(tbl_shjl_add());
	var blh = $("#patientInfo").children("span").first().text();
	$("<div/>").attr("style","width:683px;height:20px;text-align:right;margin-top:0px;margin-left:15%;").html("" +
			"<input type='hidden' id='shjl_id'/>" +
			"<input type='button' value='提交' style='width:60px;height:20px;' onclick='ti_shjl(1)'/>&nbsp;&nbsp;&nbsp;&nbsp;" +
			"<input type='button' value='重置' style='width:60px;height:20px;' onclick='_emr_show_shjl();'/>&nbsp;&nbsp;&nbsp;&nbsp;" +
			"<input type='button' value='打印单份' style='width:60px;height:20px;' onclick='print_shjl_one()'/>&nbsp;&nbsp;&nbsp;&nbsp;"+
			"<input type='button' value='打印多份' style='width:60px;height:20px;' onclick='print_shjl()'/>").appendTo(div_top);
}
//术后记录添加table
/*function tbl_shjl_add(){
	var tab_add = "<table id='ssjlAdd' cellpadding='0' cellspacing='0' width='100%' style='border-top:1px solid #d2d2d2;border-left:1px solid #d2d2d2;'>" +
					"<tr>" +
						"<td width='10%' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'></td>" +
						"<td align='center' width='30%' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>左</td>" +
						"<td align='center' width='30%' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>右</td>" +
						"<td width='30%' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'></td>"+
					"</tr>" +
					"<tr>" +
						"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>主述</td>" +
						"<td align='center' class='td_border'><textarea id='zs_l' class='textarea90' rows='3' onclick='openFloatDiv(\"zs_l\");' onkeydown='closeFloatDiv()'></textarea></td>" +
						"<td align='center' class='td_border'><textarea id='zs_r' class='textarea90' rows='3' onclick='openFloatDiv(\"zs_r\");' onkeydown='closeFloatDiv()'></textarea></td>" +
						"<td rowspan='8' class='td_border'>" +
							"<table border='0' cellpadding='0' cellspacing='0' width='100%' height='100%' >" +
								"<tr>" +
									"<td class='td_border' align='center' width='20%;'>时间</td>"+
									"<td align='center' width='80%;' style='border-bottom:1px solid #d2d2d2;'><label id='sj'>"+dateToStr()+"</label></td>" +
								"</tr>" +
								"<tr>" +
									"<td align='center' style='border-right:1px solid #d2d2d2;'>签名</td>"+
									"<td align='center' >" +
											"<label id='qm' onclick='openFloatDiv1(\"qm\",\"qm_gh\");' onkeydown='closeFloatDiv1()' style='cursor:pointer;'></label>" +
											"<label id='qm_gh' style='display:none;'></label>" +
									"</td>" +
								"</tr>" +
							"</table>" +
						"</td>"+
					"</tr>" +
					"<tr>" +
						"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>视力</td>" +
						"<td align='center' class='td_border'><input type='text' class='input90' id='sl_l'/></td>" +
						"<td align='center' class='td_border'><input type='text' class='input90' id='sl_r'/></td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>小瞳试片</td>" +
						"<td align='center' class='td_border'>" +
							"<input type='text' style='width:50px;' id='xtsp1_l'/>DS" +
							"<input type='text' style='width:50px;' id='xtsp2_l'/>DC×" +
							"<input type='text' style='width:50px;' id='xtsp3_l'/>=" +
							"<input type='text' style='width:50px;' id='xtsp4_l'/>" +
						"</td>" +
						"<td align='center' class='td_border'>" +
							"<input type='text' style='width:50px;' id='xtsp1_r'/>DS" +
							"<input type='text' style='width:50px;' id='xtsp2_r'/>DC×" +
							"<input type='text' style='width:50px;' id='xtsp3_r'/>=" +
							"<input type='text' style='width:50px;' id='xtsp4_r'/>" +
						"</td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>裂隙灯</td>" +
						"<td align='center' class='td_border'><input type='text' class='input90' id='lxd_l'/></td>" +
						"<td align='center' class='td_border'><input type='text' class='input90' id='lxd_r'/></td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>地形图</td>" +
//						"<td align='center' class='td_border'><input type='text' class='input90' id='dxt_l'/></td>" +
//						"<td align='center' class='td_border'><input type='text' class='input90' id='dxt_r'/></td>" +
						"<td align='center' class='td_border'><input type='checkbox' id='dxt_l'/></td>" +
						"<td align='center' class='td_border'><input type='checkbox' id='dxt_r'/></td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>眼压（mmHg）</td>" +
						"<td align='center' class='td_border'><input type='text' style='width:76%'  id='yy_l'/>mmHg</td>" +
						"<td align='center' class='td_border'><input type='text' style='width:76%'  id='yy_r'/>mmHg</td>" +
					"</tr>" +
					"<tr>" +
					"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>处理</td>" +
					"<td align='center' class='td_border' colspan='2'><textarea class='textarea90' rows='2' id='cl_l' /></textarea></td>" +
					"</tr>" +
					"<tr>" +
					"<td align='center' class='td_border' style='background:url(../style/green/images/thbg1.png) repeat-x left;'>备注</td>" +
					"<td align='center' class='td_border'><textarea class='textarea90' rows='1' id='bz_shjl_l'/></textarea></td>" +
					"<td align='center' class='td_border'><textarea class='textarea90' rows='1' id='bz_shjl_r'/></textarea></td>" +
					"</tr>" +
					"</table>";
	return tab_add;
}*/
function tbl_shjl_add(){
	var tab_add = "" +
				 "<div id='shjl_show_div' style='padding-bottom: 10px; margin: 0px auto; padding-left: 10px; width: 683px; padding-right: 10px; background: rgb(255,255,255); color: rgb(79,79,79); padding-top: 10px'>" +
					"<h1 style='text-align: center; line-height: 30px; height: 30px; font-size: 25px'>术后记录</h1>"+
				    "<div style='width:683px;border-bottom: rgb(51,51,51) 2px solid; font-size: 12px; border-top: rgb(51,51,51) 2px solid'>"+
				        "<table border='0' cellpadding='0' cellspacing='0' width='100%' style='font-size:12px;text-align:center;'>"+
				            "<tbody>"+
				                "<tr>"+
				                    "<th nowrap='nowrap' width='10%'>ID号：</th>"+
				                    "<td width='15%'>"+
				                        "<label id='caseNumber'>caseNumber</label></td>"+
				                    "<th height='30' nowrap='nowrap' width='10%''>"+
				                        "姓名：</th>"+
				                    "<td width='15%'>"+
				                        "<label id='suffererName'>suffererName</label></td>"+
				                    "<th nowrap='nowrap' width='10%'>性别：</th>"+
				                    "<td width='15%'><label id='sex'>sex</label></td>"+
				                    "<th nowrap='nowrap' width='10%'>年龄：</th>"+
				                    "<td width='15%'><label id='age'>age</label></td>"+
				                "</tr>"+
				            "</tbody>"+
				        "</table>"+
				    "</div>" +
			"<div style='width:683px;margin-top:10px;'><table id='ssjlAdd' cellpadding='0' cellspacing='0' width='683px' style='background: rgb(245,245,245);border-top:1px solid rgb(51,51,51);border-left:1px solid rgb(51,51,51);'>" +
					"<tr>" +
						"<td align='center' width='8%' class='td_border'>眼别</td>" +
						"<td align='center' width='42%' class='td_border'>右</td>" +
						"<td align='center' width='42%' class='td_border'>左</td>" +
						"<td align='center' width='8%' class='td_border'>签名</td>"+
					"</tr>" +
					"<tr>" +
						"<td align='center' class='td_border'>主述</td>" +
						"<td align='center' class='td_border' style='height:70px;'>" +
							"<textarea id='zs_r' class='textarea90' style='height:66px;border:0px;' onclick='openFloatDiv(\"zs_r\");' onkeydown='closeFloatDiv()'></textarea>" +
						"</td>" +
						"<td align='center' class='td_border' style='height:70px;'>" +
							"<textarea id='zs_l' class='textarea90' style='height:66px;border:0px;' onclick='openFloatDiv(\"zs_l\");' onkeydown='closeFloatDiv()'></textarea>" +
						"</td>" +
						"<td align='center' class='td_border'>" +
							"<label id='zs_qz' onclick='openFloatDiv1(\"zs_qz\",\"zs_qz_gh\")' onkeydown='closeFloatDiv1()' style='cursor:pointer;'></label>"+
							"<label id='zs_qz_gh' style='display:none;'></label>"+
						"</td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' class='td_border'>视力</td>" +
						"<td align='center' class='td_border'><input type='text' class='input90' id='sl_r' style='border:0px;'/></td>" +
						"<td align='center' class='td_border'><input type='text' class='input90' id='sl_l' style='border:0px;'/></td>" +
						"<td align='center' class='td_border'>" +
							"<label id='sl_qz' onclick='openFloatDiv1(\"sl_qz\",\"sl_qz_gh\")' onkeydown='closeFloatDiv1()' style='cursor:pointer;'></label>"+
							"<label id='sl_qz_gh' style='display:none;'></label>"+
						"</td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' class='td_border'>小瞳试片</td>" +
						"<td align='center' class='td_border'>" +
							"<input type='text' style='width:50px;border:0px;' id='xtsp1_r'/>&nbsp;DS&nbsp;" +
							"<input type='text' style='width:50px;border:0px;' id='xtsp2_r'/>&nbsp;DC×&nbsp;" +
							"<input type='text' style='width:50px;border:0px;' id='xtsp3_r'/>&nbsp;=&nbsp;" +
							"<input type='text' style='width:50px;border:0px;' id='xtsp4_r'/>" +
						"</td>" +
						"<td align='center' class='td_border'>" +
							"<input type='text' style='width:50px;border:0px;' id='xtsp1_l'/>&nbsp;DS&nbsp;" +
							"<input type='text' style='width:50px;border:0px;' id='xtsp2_l'/>&nbsp;DC×&nbsp;" +
							"<input type='text' style='width:50px;border:0px;' id='xtsp3_l'/>&nbsp;=&nbsp;" +
							"<input type='text' style='width:50px;border:0px;' id='xtsp4_l'/>" +
						"</td>" +
						"<td align='center' class='td_border'>" +
							"<label id='xtsp_qz' onclick='openFloatDiv1(\"xtsp_qz\",\"xtsp_qz_gh\")' onkeydown='closeFloatDiv1()' style='cursor:pointer;'></label>"+
							"<label id='xtsp_qz_gh' style='display:none;'></label>"+
						"</td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' class='td_border'>裂隙灯</td>" +
						"<td align='center' class='td_border' style='height:74px;'><textarea id='lxd_r' style='border:0px;width:90%;height:70px;' onclick='openFloatDiv(\"lxd_r\")' onkeydown='closeFloatDiv()'></textarea></td>" +
						"<td align='center' class='td_border' style='height:74px;'><textarea id='lxd_l' style='border:0px;width:90%;height:70px;' onclick='openFloatDiv(\"lxd_l\")' onkeydown='closeFloatDiv()'></textarea></td>" +
						"<td align='center' class='td_border'>" +
							"<label id='lxd_qz' onclick='openFloatDiv1(\"lxd_qz\",\"lxd_qz_gh\")' onkeydown='closeFloatDiv1()' style='cursor:pointer;'></label>"+
							"<label id='lxd_qz_gh' style='display:none;'></label>"+
						"</td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' class='td_border'>地形图</td>" +
						"<td align='center' class='td_border'><input type='checkbox' id='dxt_r'/></td>" +
						"<td align='center' class='td_border'><input type='checkbox' id='dxt_l'/></td>" +
						"<td align='center' class='td_border'>" +
							"<label id='dxt_qz' onclick='openFloatDiv1(\"dxt_qz\",\"dxt_qz_gh\")' onkeydown='closeFloatDiv1()' style='cursor:pointer;'></label>"+
							"<label id='dxt_qz_gh' style='display:none;'></label>"+
						"</td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' class='td_border'>眼压</td>" +
						"<td align='center' class='td_border'><input type='text' style='width:76%;border:0px;'  id='yy_r'/>mmHg</td>" +
						"<td align='center' class='td_border'><input type='text' style='width:76%;border:0px;'  id='yy_l'/>mmHg</td>" +
						"<td align='center' class='td_border'>" +
							"<label id='yy_qz' onclick='openFloatDiv1(\"yy_qz\",\"yy_qz_gh\")' onkeydown='closeFloatDiv1()' style='cursor:pointer;'></label>"+
							"<label id='yy_qz_gh' style='display:none;'></label>"+
						"</td>" +
					"</tr>" +
					"<tr>" +
					"<td align='center' class='td_border'>处理</td>" +
					"<td align='center' class='td_border' colspan='2'><textarea class='textarea90' rows='2' id='cl_l' style='border:0px;' onclick='openFloatDiv(\"cl_l\");' onkeydown='closeFloatDiv()'/></textarea></td>" +
					"<td align='center' class='td_border'>" +
						"<label id='cl_qz' onclick='openFloatDiv1(\"cl_qz\",\"cl_qz_gh\")' onkeydown='closeFloatDiv1()' style='cursor:pointer;'></label>"+
						"<label id='cl_qz_gh' style='display:none;'></label>"+
					"</td>" +
					"</tr>" +
					"<tr>" +
					"<td align='center' class='td_border'>备注</td>" +
					"<td align='center' class='td_border'><textarea class='textarea90' rows='1' id='bz_shjl_r' style='border:0px;'/></textarea></td>" +
					"<td align='center' class='td_border'><textarea class='textarea90' rows='1' id='bz_shjl_l' style='border:0px;'/></textarea></td>" +
					"<td align='center' class='td_border'>" +
						"<label id='bz_qz' onclick='openFloatDiv1(\"bz_qz\",\"bz_qz_gh\")' onkeydown='closeFloatDiv1()' style='cursor:pointer;'></label>"+
						"<label id='bz_qz_gh' style='display:none;'></label>"+
					"</td>" +
					"</tr>" +
					"<tr>" +
						"<td align='center' class='td_border'>时间</td>"+
						"<td align='center' style='border-bottom:1px solid rgb(51,51,51);border-right:1px solid rgb(51,51,51);'>" +
							"<input type='text' id='sj' value='"+dateToStr()+"' style='width:76%;border:0px;' readonly='readonly'/>"+
						"</td>" +
						"<td align='center' style='border-bottom:1px solid rgb(51,51,51);border-right:1px solid rgb(51,51,51);'>" +
						"</td>" +
						"<td align='center' style='border-bottom:1px solid rgb(51,51,51);border-right:1px solid rgb(51,51,51);'>" +
						"</td>" +
					"</tr>" +
					"</table></div></div>";
	return tab_add;
}
/******************************************** 其他方法************************************************/
/**
 * 手术方式 级联菜单
 */

function ssfsjl(){
	var tag = $("#div_show_4_2_1");
	//流程完成
	var div_lcwc = $("<div/>").attr("id","div_lcwc").attr("style","width:70px;height:16px;float:right;margin-top:5px;").appendTo(tag);
	var lc_btn = "<input type='button' style='width:65px;height:20px;float:left;margin-top:0px;' value='下次就诊' onclick='lcwc1();'/>";
	$(div_lcwc).html(lc_btn);
	//手术方式 提交
	var div_lcwc = $("<div/>").attr("id","div_ssfs").attr("style","width:70px;height:16px;float:right;margin-top:5px;").appendTo(tag);
	var ssfs_btn = "<input type='button' style='width:50px;height:20px;float:left;margin-top:0px;' value='修改' onclick='saveSsfs();'/>";
	$(div_lcwc).html(ssfs_btn+"&nbsp;&nbsp;&nbsp;<label style='color:blue;'>|</label>");
	var div_fl = $("<div/>").attr("id","ssfsfl").attr("style","width:365px;height:16px;float:right;margin-top:5px;").appendTo(tag);
	/*var div_yb = $("<div/>").attr("id","yb").attr("style","width:170px;height:16px;float:left;margin-top:3px;background:;").appendTo(div_fl);
	var input_yb = "眼别：&nbsp;&nbsp;<input type='radio' id='yb_l' name='yanbie' value='0'/>&nbsp;&nbsp;左&nbsp;&nbsp;<input type='radio' id='yb_r' name='yanbie' value='1'/>&nbsp;&nbsp;" +
			"右&nbsp;&nbsp;<input type='radio' id='yb_shuang' name='yanbie' value='2'/>&nbsp;&nbsp;双";
	$(div_yb).html(input_yb);*/
	var div_fenlei = $("<div/>").attr("id","fenlei").attr("style","width:80px;height:16px;float:left;margin-top:3px;").appendTo(div_fl);
	var sel_fl = "<label style='color:blue;'>|</label>&nbsp;&nbsp;手术方式：";
	$(div_fenlei).html(sel_fl);
	//一级菜单
	var div_fenlei1 = $("<div/>").attr("id","fenlei1").attr("style","width:90px;height:22px;float:left;margin-top:-1px;margin-left:3px;").appendTo(div_fl);
	var sel_fl1 = "<select id='sel_lev1' onchange='fenlei_lev2();'>" +
			"<option>--请选择--</option>" +
			"<option val='1'>准分子</option>" +
			"<option val='2'>晶体植入</option>" +
			"<option val='3'>儿童屈光</option>" +
			//"<option val='4'>飞秒手术</option>" +
			"</select>";
	$(div_fenlei1).html(sel_fl1);
	//二级菜单
	var div_fenlei2 = $("<div/>").attr("id","fenlei2").attr("style","width:90px;height:22px;float:left;margin-top:-1px;margin-left:3px;").appendTo(div_fl);
	//三级菜单
	var div_fenlei3 = $("<div/>").attr("id","fenlei3").attr("style","width:90px;height:22px;float:left;margin-top:-1px;margin-left:3px;").appendTo(div_fl);
	//流程
	var div_lc = $("<div/>").attr("id","div_lc").attr("style","width:200px;height:16px;float:right;margin-top:8px;").appendTo(tag);
	var lc_input = "<label>流程号：</label><label type='text' id='lc_id' style='color:red;'></label>&nbsp;<label style='color:blue;'>|</label>&nbsp;" +
			"<label>当前环节：</label><label type='text' id='lc_name' style='color:red;'></label>";
	$(div_lc).html(lc_input);

}
function fenlei_lev2(){
	//改变手术方式，刷新病历页面
	reset_bl();
	var fenlei = $("#sel_lev1").val();
	if(fenlei=="准分子"){
		var sel_fl2 = "<select id='sel_lev2' onchange='fenlei_lev3();'>" +
							"<option val='1'>lasik-110</option>" +
							"<option val='2'>lasik-90</option>" +
							"<option val='3'>lasik飞秒</option>" +
							"<option val='4'>Smart-TPRK</option>" +
							"<option val='5'>半飞秒</option>" +
							"<option val='6'>全飞秒</option>" +
						"</select>";
		$("#fenlei2").html(sel_fl2);
		fenlei_lev3();
	}else if(fenlei=="晶体植入"){
		$("#fenlei3").html("");
		var sel_fl2 = "<select id='sel_lev2' onchange='setSsfs();'>" +
						"<option val='4'>ICL</option>" +
						"<option val='5'>TICL</option>" +
						"<option val='6'>PRL</option>" +
					"</select>";
		$("#fenlei2").html(sel_fl2);		
	}else if(fenlei=="儿童屈光"){
		$("#fenlei2").html("");
		$("#fenlei3").html("");
		var sel_fl2 = "<select id='sel_lev2' onchange='et_fenlei();'>" +
						"<option val='1'>lasik-110</option>" +
						"<option val='2'>lasik-90</option>" +
						"<option val='3'>lasik飞秒</option>" +
						"<option val='4'>ICL</option>" +
						"<option val='5'>TICL</option>" +
						"<option val='6'>PRL</option>" +
					"</select>";
				$("#fenlei2").html(sel_fl2);	
				fenlei_lev3();
	}
//	else if(fenlei=="飞秒手术"){
//		var sel_fl2 = "<select id='sel_lev2' onchange='fenlei_lev3();'>" +
//		"<option val='7'>半飞秒</option>" +
//		"<option val='8'>全飞秒</option>" +
//		"</select>";
//		$("#fenlei2").html(sel_fl2);
//		fenlei_lev3();
//	}
	else{
		$("#fenlei2").html("");
		$("#fenlei3").html("");
	}
	//setSsfs();
}
function et_fenlei(){
	var fenlei = $("#sel_lev2").val();
	if(fenlei=="lasik-110" || fenlei=="lasik-90" || fenlei=="lasik飞秒"){
		fenlei_lev3();
	}else{
		$("#fenlei3").html("");
	}
	//setSsfs();
}
function fenlei_lev3(){
	var sel_fl3 = "<select id='sel_lev3' onchange='setSsfs();'>" +
					"<option val='1'>普通</option>" +
					"<option val='2'>Q值</option>" +
					"<option val='3'>地形图</option>" +
					"<option val='4'>波前相差</option>" +
					"<option val='5'>SCC</option>" +
				"</select>";
	$("#fenlei3").html(sel_fl3);
	//setSsfs();
}
/**
 * 读模板 方法
 */
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
/**
 * 打印
 */
function print_qgbl_er(){
	if($("#yanbie_r").attr("checked")=="checked"){
		$("#yanbie_r").hide();
		$("#yanbie_l").hide();
		$("#yanbie_r").parent().html("√右");
	}else if($("#yanbie_l").attr("checked")=="checked"){
		$("#yanbie_r").hide();
		$("#yanbie_l").hide();
		$("#yanbie_l").parent().html("√左");
	}else{
		$("#yanbie_r").hide();
		$("#yanbie_l").hide();
	}
	$("#show_bl_er").printArea();
}
/**
 * 打印
 */
function print_qgbl(){
	
	if($("#yanbie_r").attr("checked")=="checked"){
		$("#yanbie_r").hide();
		$("#yanbie_l").hide();
		$("#yanbie_r").parent().html("√右");
	}else if($("#yanbie_l").attr("checked")=="checked"){
		$("#yanbie_r").hide();
		$("#yanbie_l").hide();
		$("#yanbie_l").parent().html("√左");
	}else{
		$("#yanbie_r").hide();
		$("#yanbie_l").hide();
	}
	//removeBorder();
	$("#show_bl").printArea();
}
function print_qgbl_jj(){
	var test = blmb1(78);
	$("#show_bl").html(test);
	var lc_id = $("#lc_id").text();
	if(lc_id!='无'){
		var data = getJSONData(BL_ZFZ,{lc_id:lc_id},"POST").obj;	
		bl_update_set(data);
	}
	if(($.trim($("#stsp_r1").val())&&$.trim($("#stsp_r2").val()))){
		$("#stsp_r1").after("X");
	}
	if(($.trim($("#stsp_l1").val())&&$.trim($("#stsp_l2").val()))){
		$("#stsp_l1").after("X");
	}
	$("#date_print_qg_jj_bl").text(formatDate(new Date()));
	$("#show_bl").printArea(/*{popHt:800,popY:10}*/);
	reset_bl();
}
/**
 * 日历控件
 * @param id
 * @param leftWidth
 */
function calendarFun_yy1(id, leftWidth) {
//	$(".DynarchCalendar-topCont").hide();
	if ($("#" + id).length) {
		var cal = Calendar.setup({
			onSelect : function(cal) {
				//cal.hide();
				var date = cal.selection.get();
				if (date) {
					date = Calendar.intToDate(date);
					document.getElementById(id).value = Calendar.printDate(
							date, "%Y-%m-%d");
					if (document.getElementById(id).value != "") {
						$("#" + id).removeAttr("title").removeClass("error1");
//						if (!dateCompare(id, "")) {
//							$("#" + id).attr("title",
//									common_language.RiQiTimeChaoTu).addClass(
//									"error1");
//						}
					}
				}
			}
		});
		cal.widthLength(id);
		cal.topLength(id);
		cal.manageFields1(id, id, "%Y-%m-%d");
		if (!leftWidth) {
			leftWidth = 0;
		}
		//cal.manageFields(id, id, "%Y-%m-%d", leftWidth);
	}

}
function calendarFun_yy(id, leftWidth) {
//	$(".DynarchCalendar-topCont").hide();
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
//						if (!dateCompare(id, "")) {
//							$("#" + id).attr("title",
//									common_language.RiQiTimeChaoTu).addClass(
//									"error1");
//						}
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
		//cal.manageFields(id, id, "%Y-%m-%d", leftWidth);
	}
}
function calendarFun_yy2(id, leftWidth) {
//	$(".DynarchCalendar-topCont").hide();
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
//						if (!dateCompare(id, "")) {
//							$("#" + id).attr("title",
//									common_language.RiQiTimeChaoTu).addClass(
//									"error1");
//						}
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
		//cal.manageFields(id, id, "%Y-%m-%d", leftWidth);
	}
}
////术后复查 列表
//function showList_shfc(blh) {
//	var listFactor = {
//		listObj : [ {
//			title : "编号",
//			key : "id"
//		}, {
//			title : "病例号",
//			key : "blh"
//		}, {
//			title : "患者姓名",
//			key : "xingming"
//		}, {
//			title : "时间",
//			key : "sj",
//			func:function(value){
//					return value==null?"":value.substring(0,11);
//			}
//		}],
//		url : contextPath + "/publish/quguang/findQgShfcByBlhFy.htm?blh='"+blh+"'",
//		method : "post",
//		checkbox : true,
//		single : false,
//		data : {// data表示传的参数
//			currentPage : 1,
//			pageSize : 6,// Page类的方法
//			tag : Math.random()
//		}
//	};
//	$("#pageList").remove();
//	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
//			.appendTo("#shfc_list");
//	$(div_list).createPageList(listFactor);
//}
//术后复查 列表
function showList_shfc(blh) {
	var lc_id = $("#lc_id").text();
	var listFactor = {
		listObj : [ {
			title : "编号",
			key : "id"
		}, {
			title : "病例号",
			key : "blh"
		}, {
			title : "患者姓名",
			key : "xingming"
		}, {
			title : "时间",
			key : "sj"
		}],
		url : contextPath + "/publish/quguang/findQgShfcByLcFy.htm?lc_id="+lc_id+"",
		method : "post",
		checkbox : true,
		single : false,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : 6,// Page类的方法
			tag : Math.random()
		}
	};
	$("#pageList").remove();
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#shfc_list");
	$(div_list).createPageList(listFactor);
}
////术后复查 列表
//function showList_shfc_er(blh) {
//	var listFactor = {
//		listObj : [ {
//			title : "编号",
//			key : "id"
//		}, {
//			title : "病例号",
//			key : "blh"
//		}, {
//			title : "患者姓名",
//			key : "xingming"
//		}, {
//			title : "时间",
//			key : "sj",
//			func:function(value){
//					return value==null?"":value.substring(0,11);
//			}
//		}],
//		url : contextPath + "/publish/quguang/findQgShfcErByBlhFy.htm?blh='"+blh+"'",
//		method : "post",
//		checkbox : true,
//		single : false,
//		data : {// data表示传的参数
//			currentPage : 1,
//			pageSize : 6,// Page类的方法
//			tag : Math.random()
//		}
//	};
//	$("#pageList").remove();
//	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
//			.appendTo("#shfc_er_list");
//	$(div_list).createPageList(listFactor);
//}
//术后复查 列表
function showList_shfc_er(blh) {
	var lc_id = $("#lc_id").text();
	var listFactor = {
		listObj : [ {
			title : "编号",
			key : "id"
		}, {
			title : "病例号",
			key : "blh"
		}, {
			title : "患者姓名",
			key : "xingming"
		}, {
			title : "时间",
			key : "sj"
		}],
		url : contextPath + "/publish/quguang/findQgShfcErByLcFy.htm?lc_id="+lc_id+"",
		method : "post",
		checkbox : true,
		single : false,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : 6,// Page类的方法
			tag : Math.random()
		}
	};
	$("#pageList").remove();
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#shfc_er_list");
	$(div_list).createPageList(listFactor);
}
//小儿 手术记录 列表
//function showList_er(blh){
//	var listFactor = {
//			listObj : [ {
//				title : "编号",
//				key : "id"
//			}, {
//				title : "病例号",
//				key : "blh"
//			}, {
//				title : "患者姓名",
//				key : "xingming"
//			},{
//				title : "手术日期(右)",
//				key : "ssrq_r"
//			},{
//				title : "手术日期(左)",
//				key : "ssrq_l"
//			},{
//				title : "操作日期",
//				key : "czrq"
//			}],
//			url : contextPath + "/publish/quguang/findQgErSsjlByBlhFy.htm?blh='"+blh+"'",
//			method : "post",
//			checkbox : true,
//			single : false,
//			data : {// data表示传的参数
//				currentPage : 1,
//				pageSize : 6,// Page类的方法
//				tag : Math.random()
//			}
//		};
//		$("#pageList").remove();
//		var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
//				.appendTo("#ssjl_er_list");
//		$(div_list).createPageList(listFactor);
//}
//小儿 手术记录 列表
function showList_er(blh){
	var lc_id = $("#lc_id").text();
	var listFactor = {
			listObj : [ {
				title : "编号",
				key : "id"
			}, {
				title : "病例号",
				key : "blh"
			}, {
				title : "患者姓名",
				key : "xingming"
			},{
				title : "手术日期(右)",
				key : "ssrq_r"
			},{
				title : "手术日期(左)",
				key : "ssrq_l"
			},{
				title : "操作日期",
				key : "czrq"
			}],
			url : contextPath + "/publish/quguang/findQgErSsjlByLcFy.htm?lc_id="+lc_id+"",
			method : "post",
			checkbox : true,
			single : false,
			data : {// data表示传的参数
				currentPage : 1,
				pageSize : 6,// Page类的方法
				tag : Math.random()
			}
		};
		$("#pageList").remove();
		var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
				.appendTo("#ssjl_er_list");
		$(div_list).createPageList(listFactor);
}
//晶体 列表
function showList_jt(blh) {
	var listFactor = {
		listObj : [ {
			title : "编号",
			key : "id"
		}, {
			title : "病例号",
			key : "blh"
		}, {
			title : "患者姓名",
			key : "xingming"
		}, {
			title : "眼别",
			key : "yanbie"
		}, {
			title : "手术日期",
			key : "ssrq"
		}, {
			title : "操作日期",
			key : "czrq"
		}],
		url : contextPath + "/publish/quguang/findQgJtssjlByBlhFy.htm?blh='"+blh+"'",
		method : "post",
		checkbox : true,
		single : false,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : 6,// Page类的方法
			tag : Math.random()
		}
	};
	$("#pageList").remove();
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#ssjl_list");
	$(div_list).createPageList(listFactor);
}
//显示患者列表(整理)
function showList_ss() {
	listFactor = {
		listObj : [ {
			title : "序号",
			key : "paihao"
		}, {
			title : "手术日期",
			key : "ssrq"
		}, {
			title : "患者姓名",
			key : "xingming"
		}, {
			title : "手术医生",
			key : "doctor"
		}, {
			title : "眼别",
			key : "shengri"
		}, {
			title : "手术结果",
			key : "sfzh"
		}, {
			title : "备注",
			key : "shouji"
		} ],
		url : contextPath + "/publish/huanZheXinXi/findHuanZheList.htm",
		method : "post",
		checkbox : true,
		single : true,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : getPageSize(),// Page类的方法
			tag : Math.random()
		}
	};
	$("#pageList").remove();
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#div_bottom");
	$(div_list).createPageList(listFactor);
}
//提交 手术记录
function ti_qgss(autoSaveTag){
	if($("#sel_lev1").val()=="--请选择--"){
		$.oimsAlert("请选择手术方式！")
	}else{
		var qgss_tmp = $("#qgss_temp").val();
		if(qgss_tmp == 0){
			$("#qgss_temp").val(1);
			var temp = ssjl_get();
			temp.lc_id = $("#lc_id").text();
			var url_qgss = "";
			if(temp.id==null){//添加
				url_qgss = EMR_QGSS_SAVE_URL;
			}else{
				url_qgss = EMR_QGSS_UPDATE_URL;
			}
			$.ajax({
				url : contextPath + url_qgss,
				data : temp,
				type : "POST",
				dataType : 'json',
				success : function(data) {
					if(data.state==1){
						if(autoSaveTag==1){
							$.oimsSucc('操作成功！');	
							//reset_qgss();
							//qglc_get();//流程提交
							if($("#qgss_id").val() == undefined || $("#qgss_id").val() == null || $("#qgss_id").val() == ""){
								$("#qgss_id").val(data.obj);
							}
							lcwc();
							$("#qgss_temp").val(0);
						}
						
					}else{
						$.oimsAlert('操作失败！');
						$("#qgss_temp").val(0);
					}
				}
			});
		}
		
	}
}
//提交 术后记录
function ti_shjl(autoSaveTag){
	if($("#sel_lev1").val()=="--请选择--"){
		$.oimsAlert("请选择手术方式！")
	}else{
		var temp = shjl_get();
		temp.lc_id = $("#lc_id").text();
		var url_shjl = "";
		if(temp.id==null){//添加
			url_shjl = EMR_SHJL_SAVE_URL;
		}else{
			url_shjl = EMR_SHJL_UPDATE_URL;
		}
		$.ajax({
			url : contextPath + url_shjl,
			data : temp,
			type : "POST",
			dataType : 'json',
			success : function(data) {
				if(data.state==1){
					if(autoSaveTag){
						$.oimsSucc('操作成功！');
						reset_shjl();
					}
				}else{
					$.oimsAlert('操作失败！');
				}
			}
		});
	}
}
//提交 儿童病例
function ti_blEr_qg(autoSaveTag){
	if($("#sel_lev1").val()=="--请选择--"){
		$.oimsAlert("请选择手术方式！")
	}else{
		var temp = blEr_get();
		var url_blEr = "";
		if(temp.id==null){//添加
			url_blEr = EMR_BLER_SAVE_URL;
		}else{
			url_blEr = EMR_BLER_UPDATE_URL;
		}
		var blbh = temp.bingliNumber;
		if(blbh==""){
			blbh = autoCreateBinglihao(temp.id);
		}else{
			if(isNaN(blbh)){
				$.oimsAlert("您输入的病历编号不是数字，病历编号的格式为：4位数字年+5位数字尾号，如：201500001。请您按照规定格式填写，或者不填写，由系统自动生成！");
				return false;
			}else{
				if(blbh.length!=8 && blbh.length!=9){
					$.oimsAlert("您输入的病历编号位数不是9位，病历编号的格式为：4位数字年+5位数字尾号，如：201500001。请您按照规定格式填写，或者不填写，由系统自动生成！");
					return false;
				}
			}
		}
		temp.bingliNumber = blbh;
		$.ajax({
			url : contextPath + url_blEr,
			data : temp,
			type : "POST",
			dataType : 'json',
			success : function(data) {
				if(data.state==1){
					if(autoSaveTag==1){//手动提交
						auto_fx_er_qg();
						$.oimsSucc('操作成功！');
						qglc_get();//流程提交
					}else{//自动保存
						if($("#lc_id").text()=="无"){//填新病历时，自动发起流程
							qglc_get();//流程提交
						}
					}
					
				}else{
					$.oimsAlert('操作失败！');
				}
			}
		});
	}
	
}
//提交 病例
function ti_bl_qg(autoSaveTag){
	if($("#sel_lev1").val()=="--请选择--"){
		$.oimsAlert("请选择手术方式！")
	}else{
		var temp = bl_get();
		var url_bl = "";
		if(temp.id==null){//添加
			url_bl = EMR_BL_SAVE_URL;
		}else{
			url_bl = EMR_BL_UPDATE_URL;
		}
		var blbh = temp.bingliNumber;
		if(blbh==""){
			blbh = autoCreateBinglihao(temp.id);
		}else{
			if(isNaN(blbh)){
				$.oimsAlert("您输入的病历编号不是数字，病历编号的格式为：4位数字年+5位数字尾号，如：201500001。请您按照规定格式填写，或者不填写，由系统自动生成！");
				return false;
			}else{
				if(blbh.length!=8 && blbh.length!=9){
					$.oimsAlert("您输入的病历编号位数不是9位，病历编号的格式为：4位数字年+5位数字尾号，如：201500001。请您按照规定格式填写，或者不填写，由系统自动生成！");
					return false;
				}
			}
		}
		temp.bingliNumber = blbh;
		$.ajax({
			url : contextPath + url_bl,
			data : temp,
			type : "POST",
			dataType : 'json',
			success : function(data) {
				if(data.state==1){
					if(autoSaveTag==1){//手动提交
						auto_fx_zfz_qg();
						$.oimsSucc('操作成功！');
						qglc_get();//流程提交
					}else{//自动保存
						if($("#lc_id").text()=="无"){//填新病历时，自动发起流程
							qglc_get();//流程提交
						}
					}
						//reset_bl();
				}else{
					$.oimsAlert('操作失败！');
				}
			}
		});
	}
}
//提交 预约
function ti_yy_qg(autoSaveTag){
	if($("#sel_lev1").val()=="--请选择--"){
		$.oimsAlert("请选择手术方式！")
	}else{
		if($("#showTime_yy").html()!=''){
			var temp = yy_get();
			temp.lc_id = $("#lc_id").text();
			var url_yy = "";
			if(temp.id==null){//添加
				url_yy = EMR_YY_SAVE_URL;
			}else{
				url_yy = EMR_YY_UPDATE_URL;
			}
			$.ajax({
				url : contextPath + url_yy,
				data : temp,
				type : "POST",
				dataType : 'json',
				success : function(data) {
					if(data.state==1){
						if(autoSaveTag==1){
							qglc_get();//流程提交	
							$.oimsSucc('操作成功！');	
						}
					}else{
						$.oimsAlert('操作失败！');
					}
				}
			});
		}else{
			$.oimsAlert("请填写预约时间！");
		}
	}
}

//重置 预约
function reset_yy(){
	_emr_show_yy();
	//showList_yy($("#blh_yy").val());
	//$("#pageList").attr("style","width:100%;margin-left:-10px;margin-top:-7px;");
	//sel_list_yy();//列表选中行
	//yy_jbxx_set($("#blh_yy").val());
}
//重置 儿童手术记录
function reset_er_qgss(){
	_emr_show_ssjl();
}
//重置 手术记录
function reset_qgss(){
	_emr_show_ssjl();
}
//重置 术后记录
function reset_shjl(){
	_emr_show_shjl();
}
//儿童 病历 列表
function showList_blEr(blh) {
	var listFactor = {
		listObj : [ {
			title : "编号",
			key : "id"
		}, {
			title : "病例号",
			key : "blh"
		}, {
			title : "患者姓名",
			key : "xingming"
		}, {
			title : "眼别",
			key : "yb"
		}, {
			title : "日期",
			key : "czrq"
		}],
		url : contextPath + "/publish/quguang/findQgblErByBlhFy.htm?blh='"+blh+"'",
		method : "post",
		checkbox : true,
		single : false,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : 6,// Page类的方法
			tag : Math.random()
		}
	};
	$("#pageList").remove();
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#div_show_4_2_2");
	$(div_list).createPageList(listFactor);
}
//病历 列表
function showList_bl(blh) {
	var listFactor = {
		listObj : [ {
			title : "编号",
			key : "id"
		}, {
			title : "病例号",
			key : "blh"
		}, {
			title : "患者姓名",
			key : "xingming"
		}, {
			title : "眼别",
			key : "yb"
		}, {
			title : "日期",
			key : "czrq"
		}],
		url : contextPath + "/publish/quguang/findQgblByBlhFy.htm?blh='"+blh+"'",
		method : "post",
		checkbox : true,
		single : false,
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : 6,// Page类的方法
			tag : Math.random()
		}
	};
	$("#pageList").remove();
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#div_show_4_2_2");
	$(div_list).createPageList(listFactor);
}
//预约
//function showList_yy(blh) {
//	var listFactor = {
//		listObj : [ {
//			title : "预约编号",
//			key : "id"
//		}, {
//			title : "病例号",
//			key : "blh"
//		}, {
//			title : "患者姓名",
//			key : "xingming"
//		}, {
//			title : "预约项目",
//			key : "yyxm"
//		}, {
//			title : "预约时间",
//			key : "yysj"
//		}],
//		url : contextPath + "/publish/quguang/findQgYyByBlhFy.htm?blh='"+blh+"'",
//		method : "post",
//		checkbox : true,
//		single : true,
//		data : {// data表示传的参数
//			currentPage : 1,
//			pageSize : 6,// Page类的方法
//			tag : Math.random()
//		}
//	};
//	$("#pageList").remove();
//	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
//			.appendTo("#yy_list");
//	$(div_list).createPageList(listFactor);
//}
function showList_yy(blh) {
	var lc_id=$("#lc_id").text();
var listFactor = {
	listObj : [ {
		title : "预约编号",
		key : "id"
	}, {
		title : "病例号",
		key : "blh"
	}, {
		title : "患者姓名",
		key : "xingming"
	}, {
		title : "预约项目",
		key : "yyxm"
	}, {
		title : "预约时间",
		key : "yysj"
	}],
	url : contextPath + "/publish/quguang/findQgYyByLcFy.htm?lc_id="+lc_id+"",
	method : "post",
	checkbox : true,
	single : true,
	data : {// data表示传的参数
		currentPage : 1,
		pageSize : 6,// Page类的方法
		tag : Math.random()
	}
};
$("#pageList").remove();
var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
		.appendTo("#yy_list");
$(div_list).createPageList(listFactor);
}
////屈光手术列表
//function list_qgss(blh){
//	var listFactor = {
//  			listObj : [ {
//  				title : "手术编号",
//  				key : "id"
//  			},{
//  				title : "手术日期(左)",
//  				key : "ssrq_l"
//  			},{
//  				title : "手术日期(右)",
//  				key : "ssrq_r"
//  			}, {
//  				title : "手术医生（左）",
//  				key : "ssys_l"
//  			}, {
//  				title : "手术医生（右）",
//  				key : "ssys_r"
//  			}, {
//  				title : "手术结果（左）",
//  				key : "ssjg_l",
//  				func:function(value){
//  					return value==null?"":value.replace("@"," ").replace("0","顺利").replace("1","转眼").replace("2","挤眼").replace("@"," ");
//  				}	
//  			}, {
//  				title : "手术结果（右）",
//  				key : "ssjg_r",
//  				func:function(value){
//  					return value==null?"":value.replace("@"," ").replace("0","顺利").replace("1","转眼").replace("2","挤眼").replace("@"," ");
//  				}	
//  			}, {
//  				title : "备注信息（双）",
//  				key : "bz"
//  			}],
//  			url : contextPath + "/publish/quguang/findQgssByBlhFy.htm?blh='"+blh+"'",
//  			method : "get",
//  			checkbox : true,
//  			single : false,
//  			data : {// data表示传的参数
//  				currentPage : 1,
//  				pageSize : 6,// Page类的方法
//  				tag : Math.random()
//  			}
//  		};
//	$("#ssjl_list").html("");
//  	var div_list = $("<div />").attr("id", "pageList").attr("class", "list").appendTo("#ssjl_list");
//  	$(div_list).createPageList(listFactor);
//}
//屈光手术列表
function list_qgss(blh){
	var lc_id = $("#lc_id").text();
	var listFactor = {
  			listObj : [ {
  				title : "手术编号",
  				key : "id"
  			},{
  				title : "手术日期(左)",
  				key : "ssrq_l"
  			},{
  				title : "手术日期(右)",
  				key : "ssrq_r"
  			}, {
  				title : "手术医生（左）",
  				key : "ssys_l"
  			}, {
  				title : "手术医生（右）",
  				key : "ssys_r"
  			}, {
  				title : "手术结果（左）",
  				key : "ssjg_l",
  				func:function(value){
  					return value==null?"":value.replace("@"," ").replace("0","顺利").replace("1","转眼").replace("2","挤眼").replace("@"," ");
  				}	
  			}, {
  				title : "手术结果（右）",
  				key : "ssjg_r",
  				func:function(value){
  					return value==null?"":value.replace("@"," ").replace("0","顺利").replace("1","转眼").replace("2","挤眼").replace("@"," ");
  				}	
  			}, {
  				title : "备注信息（双）",
  				key : "bz"
  			}],
  			url : contextPath + "/publish/quguang/findQgssByLcFy.htm?lc_id="+lc_id+"",
  			method : "get",
  			checkbox : true,
  			single : false,
  			data : {// data表示传的参数
  				currentPage : 1,
  				pageSize : 6,// Page类的方法
  				tag : Math.random()
  			}
  		};
	$("#ssjl_list").html("");
  	var div_list = $("<div />").attr("id", "pageList").attr("class", "list").appendTo("#ssjl_list");
  	$(div_list).createPageList(listFactor);
}

////术后记录 列表
//function list_shjl(blh){
//	var listFactor = {
//  			listObj : [ {
//  				title : "编号",
//  				key : "id"
//  			},{
//  				title : "姓名",
//  				key : "xingming"
//  			},{
//  				title : "病历号",
//  				key : "blh"
//  			},{
//  				title : "时间",
//  				key : "sj",
//				func:function(value){
//  					return value==null?"":value.substring(0,11);
//  				}
//  			}],
//  			url : contextPath + "/publish/quguang/findShjlByBlhFy.htm?blh='"+blh+"'",
//  			method : "get",
//  			checkbox : true,
//  			single : false,
//  			data : {// data表示传的参数
//  				currentPage : 1,
//  				pageSize : 6,// Page类的方法
//  				tag : Math.random()
//  			}
//  		};
//	$("#shjl_list").html("");
//  	var div_list = $("<div />").attr("id", "pageList").attr("class", "list").appendTo("#shjl_list");
//  	$(div_list).createPageList(listFactor);
//}
//术后记录 列表
function list_shjl(blh){
	var lc_id = $("#lc_id").text();
	var listFactor = {
  			listObj : [ {
  				title : "编号",
  				key : "id"
  			},{
  				title : "姓名",
  				key : "xingming"
  			},{
  				title : "病历号",
  				key : "blh"
  			},{
  				title : "时间",
  				key : "sj",
  				func :function(v){
  					return formatDate(v.time);
  				}
  			}],
  			url : contextPath + "/publish/quguang/findShjlByLcFy.htm?lc_id="+lc_id+"",
  			method : "get",
  			checkbox : true,
  			single : true,
  			data : {// data表示传的参数
  				currentPage : 1,
  				pageSize : 6,// Page类的方法
  				tag : Math.random()
  			}
  		};
	$("#shjl_list").html("");
  	var div_list = $("<div />").attr("id", "pageList").attr("class", "list").appendTo("#shjl_list");
  	$(div_list).createPageList(listFactor);
}
var tag_click = 0;
//儿童病历选择列表行
function sel_list_blEr(){

	$("#pageListTable td").bind("click",function(){
		if(tag_click==10){
			tag_click = 0;
		}
		if(tag_click%2==0){
			reset_ck();
		}else{
			var isChecked = $("input[name='checkBoxObj']:checked").length; 
			//if(isChecked==0){
				reloadBlEr();
				var id = $(this).parent().children("td").eq(1).text();
				var data = getJSONData("/publish/quguang/getQgblErById.htm?id="+id,{},"GET").obj;
				if(data!=null){
					var lc_data = getLcByBl_id(id);//根据bl_id查看信息
					ssfs_set(lc_data);
					blEr_update_set(data);
				}
				
				qgqz();//签字
				//btn_ctrl();//控制
				tag_click++;
			//}
		}
	});
}
//根据bl_id查看信息
function getLcByBl_id(id){
	var data = getJSONData("/publish/quguang/getQglcByBl_id.htm?bl_id="+id+"",null,"GET").obj;
	if(data!=null){
		$("#lc_id").text(data.id);
		var lc_state = data.state;
		var lc_name = "";
		if(lc_state==0){
			lc_name = "病历";
		}else if(lc_state=="1"){
			lc_name = "同意书";
		}else if(lc_state=="2"){
			lc_name = "预约";
		}else if(lc_state=="3"){
			lc_name = "手术记录";
		}else if(lc_state=="4"){
			lc_name = "术后复查";
		}else if(lc_state=="5"){
			lc_name = "完成";
		}else{
			lc_name="";
		}
		$("#lc_name").text(lc_name);
		return data;
	}
	
}
//病历选择列表行
function sel_list_bl(){
	$("#pageListTable td").bind("click",function(){
		if(tag_click==10){
			tag_click = 0;
		}
		if(tag_click%2==0){
			reset_ck();
		}else{
			var isChecked = $("input[name='checkBoxObj']:checked").length; 
			//if(isChecked==0){
				reloadBl();
				var id = $(this).parent().children("td").eq(1).text();
				var data = getJSONData("/publish/quguang/getQgblById.htm?id="+id,{},"GET").obj;
				if(data!=null){
					var lc_data = getLcByBl_id(id);//根据bl_id查看信息
					ssfs_set(lc_data);
					bl_update_set(data);
				}
				
			//}
		}
		qgqz();//签字
		//btn_ctrl();//控制
		tag_click++;
	});
}

//预约选择列表行
function sel_list_yy(){
	$("#pageListTable td").bind("click",function(){
		var isChecked = $("input[name='checkBoxObj']:checked").length; 
		//if(isChecked==0){
			tbl_yy_add();
			var id = $(this).parent().children("td").eq(1).text();
			var data = getJSONData("/publish/quguang/getQgYyById.htm?id="+id,{},"GET").obj;
			if(data!=null){
				yy_update_set(data);
			}
		//}
	});
}
//屈光手术选择列表行
function sel_list_ssjl(){
	$("#pageListTable td").bind("click",function(){
		var isChecked = $("input[name='checkBoxObj']:checked").length; 
		if(isChecked==0){
			reset_ssjl_div_top();
			var id = $(this).parent().children("td").eq(1).text();
			var data = getJSONData("/publish/quguang/getQgssById.htm?id="+id,{},"GET").obj;
			if(data!=null){
				ssfs_update_set(data);
			}
		}else{
			reset_ssjl_div_top();
		}
	});
}
//术后记录选择列表行
function sel_list_shjl(){
	$("#pageListTable td").bind("click",function(){
		var isChecked = $("input[name='checkBoxObj']:checked").length; 
		//if(isChecked==0){
			reset_shjl_div_top();
			var id = $(this).parent().children("td").eq(1).text();
			var data = getJSONData("/publish/quguang/getShjlById.htm?id="+id,{},"GET").obj;
			if(data!=null){
				shjl_update_set(data);
			}
			qgqz();//签字
			calendarFun_yy("sj");
//		}else{
//			reset_shjl_div_top();
//		}
			var blh = $("#patientInfo").children("span").first().text();
			shjl_set_jbxx(blh);
	});
}
//预约基本信息赋值
function yy_jbxx_set(blh){
	var jbxx = getJbxx_qg(blh);
	$("#xingming_yy").text("");
	$("input[name='sex']").attr("checked",false);
	$("#lxfs_yy").text("");
	$("#csrq_yy").text("");
	$("#yyxm").text("");
	$("#showTime_yy").text("");
	$("#yy_id").val("");
	$("input[name='am']").attr("checked",false);
	$("#xingming_yy").text(jbxx.name);
	$("#sex").text(jbxx.sex);
	$("#lxfs_yy").text(jbxx.dianhua);
	$("#csrq_yy").text(jbxx.birthday);
}
//儿童病历 修改前赋值
function blEr_update_set(data){
	//赋值——患者基本信息
	bl_set_jbxx_er(data.blh);
	//赋值——问诊
	//bl_set_wz(data.blh);
	//赋值——检查
	$("#blEr_id").val(data.id);
	$("#caseNumber").text(data.blh);
	//if(data.bingliNumber!=null && data.bingliNumber!=''){
		$("#bingliNumber").val(data.bingliNumber);
//	}else{
//		$("#bingliNumber").val(autoCreateBinglihao());
//	}
		
//	var czrq = dateToStr();
//	if(data.czrq!=null){
//		czrq = dateToStr(data.czrq);	
//	}
	var jzrq = dateToStr();
	if(data.jzrq!=null){
		jzrq = dateToStr(data.jzrq);	
	}
	$("#cli_date").val(jzrq);
//	$("#czrq").val(czrq);

	$("#qgzs").html(data.qgzs);
	$("#qgjws").html(data.qgjws);
	$("#ywgms").html(data.ywgms);
	$("#jtjss").html(data.jtjss);
	if(data.yb==0){
		$("#yanbie_r").attr("checked",true);
	}else if(data.yb==1){
		$("#yanbie_l").attr("checked",true);
	}	
	$("#yw_r").val(data.yw_r);
	$("#yw_l").val(data.yw_l);
	//视力 （如果qg_bl表中有值，则显示该值；没有则去shili表（专科检查）中找值）
	var ysl_r = '';
	var jsl_r = '';
	var ysl_l = '';
	var jsl_l = '';
	var sl_qz = '';
	var shili_zkjc = get_shili();//视力-专科检查 中取到的
	if(data.ysl_r==null || data.ysl_r==''){
		ysl_r = (shili_zkjc.lysl_r==0?'':shili_zkjc.lysl_r);
	}else{
		ysl_r = data.ysl_r;
	}
	if(data.jsl_r==null || data.jsl_r==''){
		jsl_r = (shili_zkjc.jsl_r==0?'':shili_zkjc.jsl_r);
	}else{
		jsl_r = data.jsl_r;
	}
	if(data.ysl_l==null || data.ysl_l==''){
		ysl_l = (shili_zkjc.lysl_l==0?'':shili_zkjc.lysl_l);
	}else{
		ysl_l = data.ysl_l;
	}
	if(data.jsl_l==null || data.jsl_l==''){
		jsl_l = (shili_zkjc.jsl_l==0?'':shili_zkjc.jsl_l);
	}else{
		jsl_l = data.jsl_l;
	}
	if(data.sl_qz==null || data.sl_qz==''){
		sl_qz = shili_zkjc.jcys;
	}else{
		sl_qz = data.sl_qz;
	}
	$("#ysl_r").val(ysl_r);
	$("#jsl_r").val(jsl_r);
	$("#ysl_l").val(ysl_l);
	$("#jsl_l").val(jsl_l);
	$("#sl_qz").text(getUser1(sl_qz));
	$("#sl_qz_gh").text(sl_qz);
	
	$("#jmzj_r").val(data.jmzj_r);
	$("#jmzj_l").val(data.jmzj_l);
	$("#tkzj_m_r").val(data.tkzj_m_r);
	$("#tkzj_a_r").val(data.tkzj_a_r);
	$("#tkzj_m_l").val(data.tkzj_m_l);
	$("#tkzj_a_l").val(data.tkzj_a_l);
	//眼压 如果qg_bl_er中有值则用该值；如果没有值则去 专科检查的眼压中取值
	var yanya_r = '';
	var yanya_l = '';
	var yanya_qz = '';
	var yanya_zkjc = get_yanya();//专科检查中 取眼压值
	if(data.yanya_r==null || data.yanya_r==''){
		yanya_r = yanya_zkjc.yanya_r==0?'':yanya_zkjc.yanya_r;
	}else{
		yanya_r = data.yanya_r;
	}
	if(data.yanya_l==null || data.yanya_l==''){
		yanya_l = yanya_zkjc.yanya_l==0?'':yanya_zkjc.yanya_l;
	}else{
		yanya_l = data.yanya_l;
	}
	if(data.yanya_qz==null || data.yanya_qz==''){
		yanya_qz = yanya_zkjc.jcys;
	}else{
		yanya_qz = data.yanya_qz;
	}
	$("#yanya_r").val(yanya_r);
	$("#yanya_l").val(yanya_l);
	$("#yanya_qz").text(getUser1(yanya_qz));
	$("#yanya_qz_gh").text(yanya_qz);
	
	$("#jmdxt_K1_r").val(data.jmdxt_K1_r);
	$("#jmdxt_a_r").val(data.jmdxt_a_r);
	$("#jmdxt_K1_l").val(data.jmdxt_K1_l);
	$("#jmdxt_a_l").val(data.jmdxt_a_l);
	$("#jmdxt_K2_r").val(data.jmdxt_K2_r);
	$("#jmdxt_DK_r").val(data.jmdxt_DK_r);
	$("#jmdxt_K2_l").val(data.jmdxt_K2_l);
	$("#jmdxt_DK_l").val(data.jmdxt_DK_l);
	$("#dnyg_r1").val(data.dnyg_r1);
	$("#dnyg_l1").val(data.dnyg_l1);
	$("#dnyg_r2").val(data.dnyg_r2);
	$("#dnyg_l2").val(data.dnyg_l2);
	$("#dnyg_r3").val(data.dnyg_r3);
	$("#dnyg_l3").val(data.dnyg_l3);
	
	$("#ktjy_r1").val(data.ktjy_r1);
	$("#ktjy_l1").val(data.ktjy_l1);
	$("#ktjy_r2").val(data.ktjy_r2);
	$("#ktjy_l2").val(data.ktjy_l2);
	$("#ktjy_r3").val(data.ktjy_r3);
	$("#ktjy_l3").val(data.ktjy_l3);
	
	$("#ktsp_r1").val(data.ktsp_r1);
	$("#ktsp_l1").val(data.ktsp_l1);
	$("#ktsp_r2").val(data.ktsp_r2);
	$("#ktsp_l2").val(data.ktsp_l2);
	$("#ktsp_r3").val(data.ktsp_r3);
	$("#ktsp_l3").val(data.ktsp_l3);
	$("#ktsp_r4").val(data.ktsp_r4);
	$("#ktsp_l4").val(data.ktsp_l4);
	
	$("#xtjy_r1").val(data.xtjy_r1);
	$("#xtjy_l1").val(data.xtjy_l1);
	$("#xtjy_r2").val(data.xtjy_r2);
	$("#xtjy_l2").val(data.xtjy_l2);
	$("#xtjy_r3").val(data.xtjy_r3);
	$("#xtjy_l3").val(data.xtjy_l3);
	$("#xtjy_r4").val(data.xtjy_r4);
	$("#xtjy_l4").val(data.xtjy_l4);
	
	$("#xtsp_r1").val(data.xtsp_r1);
	$("#xtsp_l1").val(data.xtsp_l1);
	$("#xtsp_r2").val(data.xtsp_r2);
	$("#xtsp_l2").val(data.xtsp_l2);
	$("#xtsp_r3").val(data.xtsp_r3);
	$("#xtsp_l3").val(data.xtsp_l3);
	$("#xtsp_r4").val(data.xtsp_r4);
	$("#xtsp_l4").val(data.xtsp_l4);
	
	$("#zsxz_r").val(data.zsxz_r);
	$("#zsxz_l").val(data.zsxz_l);
	$("#jmhd_r").val(data.jmhd_r);
	$("#jmhd_l").val(data.jmhd_l);
	$("#tss").val(data.tss);
	$("#rhfw").val(data.rhfw);
	$("#lts").val(data.lts);
	$("#xbdjc").val(data.xbdjc);
	$("#zxad_r").val(data.zxad_r);
	$("#zxad_l").val(data.zxad_l);
	$("#yzcd_r").val(data.yzcd_r);
	$("#yzcd_l").val(data.yzcd_l);
	$("#PVEP_r").val(data.PVEP_r);
	$("#PVEP_l").val(data.PVEP_l);
	$("#lxdzx_r").val(data.lxdzx_r);
	$("#lxdzx_l").val(data.lxdzx_l);
	$("#npjjc_r").val(data.npjjc_r);
	$("#npjjc_l").val(data.npjjc_l);
	$("#smjjc_1_r").val(data.smjjc_1_r);
	$("#smjjc_1_l").val(data.smjjc_1_l);
	$("#smjjc_2_r").val(data.smjjc_2_r);
	$("#smjjc_2_l").val(data.smjjc_2_l);
	
	var clyj_r = data.clyj_r;
	var kaiyao = kaiyao_mx()==null?'':kaiyao_mx();
	if(clyj_r==null || clyj_r==''){
		clyj_r = kaiyao;
	}else{
		if(data.clyj_r.indexOf(kaiyao)>-1){
			clyj_r = data.clyj_r;
		}else{
			clyj_r = clyj_r+" "+kaiyao;
		}
	}
	$("#clyj_r").val(clyj_r);
	$("#bz").val(data.bz);
	$("#wz_qz").text(getUser1(data.wz_qz));
	$("#wz_qz_gh").text(data.wz_qz);
	
	$("#yw_qz").text(getUser1(data.yw_qz));
	$("#yw_qz_gh").text(data.yw_qz);
	
	$("#sl_qz").text(getUser1(data.sl_qz));
	$("#sl_qz_gh").text(data.sl_qz);
	$("#jmzj_qz").text(getUser1(data.jmzj_qz));
	$("#jmzj_qz_gh").text(data.jmzj_qz);
	
	$("#tkzj_qz").text(getUser1(data.tkzj_qz));
	$("#tkzj_qz_gh").text(data.tkzj_qz);
	
	$("#yanya_qz").text(getUser1(data.yanya_qz));
	$("#yanya_qz_gh").text(data.yanya_qz);
	
	$("#jmdxt_qz").text(getUser1(data.jmdxt_qz));
	$("#jmdxt_qz_gh").text(data.jmdxt_qz);
	
	$("#dnyg_qz").text(getUser1(data.dnyg_qz));
	$("#dnyg_qz_gh").text(data.dnyg_qz);
	
	$("#ktjy_qz").text(getUser1(data.ktjy_qz));
	$("#ktjy_qz_gh").text(data.ktjy_qz);
	
	$("#ktsp_qz").text(getUser1(data.ktsp_qz));
	$("#ktsp_qz_gh").text(data.ktsp_qz);
	
	$("#xtjy_qz").text(getUser1(data.xtjy_qz));
	$("#xtjy_qz_gh").text(data.xtjy_qz);
	
	$("#xtsp_qz").text(getUser1(data.xtsp_qz));
	$("#xtsp_qz_gh").text(data.xtsp_qz);
	
	$("#zsxz_qz").text(getUser1(data.zsxz_qz));
	$("#zsxz_qz_gh").text(data.zsxz_qz);
	
	$("#jmhd_qz").text(getUser1(data.jmhd_qz));
	$("#jmhd_qz_gh").text(data.jmhd_qz);
	
	$("#tss_qz").text(getUser1(data.tss_qz));
	$("#tss_qz_gh").text(data.tss_qz);
	
	$("#rhfw_qz").text(getUser1(data.rhfw_qz));
	$("#rhfw_qz_gh").text(data.rhfw_qz);
	
	$("#lts_qz").text(getUser1(data.lts_qz));
	$("#lts_qz_gh").text(data.lts_qz);
	
	$("#xbdjc_qz").text(getUser1(data.xbdjc_qz));
	$("#xbdjc_qz_gh").text(data.xbdjc_qz);
	
	$("#zxad_qz").text(getUser1(data.zxad_qz));
	$("#zxad_qz_gh").text(data.zxad_qz);
	
	$("#yzcd_qz").text(getUser1(data.yzcd_qz));
	$("#yzcd_qz_gh").text(data.yzcd_qz);
	
	$("#PVEP_qz").text(getUser1(data.PVEP_qz));
	$("#PVEP_qz_gh").text(data.PVEP_qz);
	
	$("#lxdzx_qz").text(getUser1(data.lxdzx_qz));
	$("#lxdzx_qz_gh").text(data.lxdzx_qz);
	
	$("#npjjc_qz").text(getUser1(data.npjjc_qz));
	$("#npjjc_qz_gh").text(data.npjjc_qz);
	
	$("#smjjc_qz").text(getUser1(data.smjjc_qz));
	$("#smjjc_qz_gh").text(data.smjjc_qz);
	
	$("#clyj_qz").text(getUser1(data.clyj_qz));
	$("#clyj_qz_gh").text(data.clyj_qz);
	
	$("#jhr").val(data.jhr);
	$("#bz_qz").text(getUser1(data.bz_qz));
	$("#bz_qz_bl").text(data.bz_qz);
	//$("#ssfs").text(data.ssfs);
	$("#ssfy").val(data.ssfy);
	$("#qg_jcf").val(data.qg_jcf);

	var ssf_rq = dateToStr();
	if(data.ssf_rq!=null){
		ssf_rq = dateToStr(data.ssf_rq);	
	}
	if(data.ssf_rq=='1970-01-01'){
		ssf_rq = '';
	}
	$("#ssf_rq").val(ssf_rq);
	
	var jcf_rq = dateToStr();
	if(data.jcf_rq!=null){
		jcf_rq = dateToStr(data.jcf_rq);	
	}
	if(data.jcf_rq=='1970-01-01'){
		jcf_rq = '';
	}
	$("#jcf_rq").val(jcf_rq);
}
//病历 修改前赋值
function bl_update_set(data){
	//赋值——患者基本信息
	bl_set_jbxx(data.blh);
	//赋值——问诊
	//bl_set_wz(data.blh);
	//赋值——检查
	$("#bl_id").val(data.id);	
	$("#caseNumber").text(data.blh);
//	if(data.bingliNumber!=null || data.bingliNumber!=''){
		$("#bingliNumber").val(data.bingliNumber);
//	}else{
	//	$("#bingliNumber").val(autoCreateBinglihao());
//	}
	var jzrq = dateToStr();
	if(data.jzrq!=null){
		jzrq = dateToStr(data.jzrq);	
	}
	$("#cli_date").val(jzrq);
	var wenzhenValues = get_wenzhen();
	var qgzs = '';
	var qgjws = '';
	var ywgms = '';
	var jtjss = '';
	//主述
	if(data.qgzs==null || data.qgzs==''){
		qgzs = wenzhenValues.zs;
	}else{
		qgzs = data.qgzs;
	}
	//既往史
	if(data.qgjws==null || data.qgjws==''){
		qgjws = wenzhenValues.jws;
	}else{
		qgjws = data.qgjws;
	}
	//药物过敏史/过敏史
	if(data.ywgms==null || data.ywgms==''){
		ywgms = wenzhenValues.gms;
	}else{
		ywgms = data.ywgms;
	}
	//家庭近视史/家族史
	if(data.jtjss==null || data.jtjss==''){
		jtjss = wenzhenValues.jzs;
	}else{
		jtjss = data.jtjss;
	}
	
	$("#qgzs").html(qgzs);
	$("#qgjws").html(qgjws);
	$("#ywgms").html(ywgms);
	$("#jtjss").html(jtjss);
	$("#wz_qz").text(getUser1(data.wz_qz));
	$("#wz_qz_gh").text(data.wz_qz);
	if(data.yb==0){
		$("#yanbie_r").attr("checked",true);
	}else if(data.yb==1){
		$("#yanbie_l").attr("checked",true);
	}	
	//视力 （如果qg_bl表中有值，则显示该值；没有则去shili表（专科检查）中找值）
	var ysl_r = '';
	var jsl_r = '';
	var ysl_l = '';
	var jsl_l = '';
	var sl_qz = '';
	var shili_zkjc = get_shili();//视力-专科检查 中取到的
	if(data.ysl_r==null || data.ysl_r==''){
		ysl_r = (shili_zkjc.lysl_r==0?'':shili_zkjc.lysl_r);
	}else{
		ysl_r = data.ysl_r;
	}
	if(data.jsl_r==null || data.jsl_r==''){
		jsl_r = (shili_zkjc.jsl_r==0?'':shili_zkjc.jsl_r);
	}else{
		jsl_r = data.jsl_r;
	}
	if(data.ysl_l==null || data.ysl_l==''){
		ysl_l = (shili_zkjc.lysl_l==0?'':shili_zkjc.lysl_l);
	}else{
		ysl_l = data.ysl_l;
	}
	if(data.jsl_l==null || data.jsl_l==''){
		jsl_l = (shili_zkjc.jsl_l==0?'':shili_zkjc.jsl_l);
	}else{
		jsl_l = data.jsl_l;
	}
	if(data.sl_qz==null || data.sl_qz==''){
		sl_qz = shili_zkjc.jcys;
	}else{
		sl_qz = data.sl_qz;
	}
	$("#ysl_r").val(ysl_r);
	$("#jsl_r").val(jsl_r);
	$("#ysl_l").val(ysl_l);
	$("#jsl_l").val(jsl_l);
	$("#sl_qz").text(getUser1(sl_qz));
	$("#sl_qz_gh").text(sl_qz);
	$("#tkzj_m_r").val(data.tkzj_m_r);
	$("#tkzj_a_r").val(data.tkzj_a_r);
	$("#tkzj_m_l").val(data.tkzj_m_l);
	$("#tkzj_a_l").val(data.tkzj_a_l);
	$("#jmzj_r").val(data.jmzj_r);
	$("#jmzj_l").val(data.jmzj_l);
	//眼压 如果qg_bl_er中有值则用该值；如果没有值则去 专科检查的眼压中取值
	var yanya_r = '';
	var yanya_l = '';
	var yanya_qz = '';
	var yanya_zkjc = get_yanya();//专科检查中 取眼压值
	if(data.yanya_r==null || data.yanya_r==''){
		yanya_r = yanya_zkjc.yanya_r==0?'':yanya_zkjc.yanya_r;
	}else{
		yanya_r = data.yanya_r;
	}
	if(data.yanya_l==null || data.yanya_l==''){
		yanya_l = yanya_zkjc.yanya_l==0?'':yanya_zkjc.yanya_l;
	}else{
		yanya_l = data.yanya_l;
	}
	if(data.yanya_qz==null || data.yanya_qz==''){
		yanya_qz = yanya_zkjc.jcys;
	}else{
		yanya_qz = data.yanya_qz;
	}
	$("#yanya_r").val(yanya_r);
	$("#yanya_l").val(yanya_l);
	$("#yanya_qz").text(getUser1(yanya_qz));
	$("#yanya_qz_gh").text(yanya_qz);
	
	$("#jmdxt_K1_r").val(data.jmdxt_K1_r);
	$("#jmdxt_a_r").val(data.jmdxt_a_r);
	$("#jmdxt_K1_l").val(data.jmdxt_K1_l);
	$("#jmdxt_a_l").val(data.jmdxt_a_l);
	$("#jmdxt_K2_r").val(data.jmdxt_K2_r);
	$("#jmdxt_DK_r").val(data.jmdxt_DK_r);
	$("#jmdxt_K2_l").val(data.jmdxt_K2_l);
	$("#jmdxt_DK_l").val(data.jmdxt_DK_l);
	$("#pxl_H_r").val(data.pxl_H_r);
	$("#pxl_V_r").val(data.pxl_V_r);
	$("#pxl_H_l").val(data.pxl_H_l);
	$("#pxl_V_l").val(data.pxl_V_l);
	$("#dnyg_r1").val(data.dnyg_r1);
	$("#dnyg_l1").val(data.dnyg_l1);
	$("#dnyg_r2").val(data.dnyg_r2);
	$("#dnyg_l2").val(data.dnyg_l2);
	$("#dnyg_r3").val(data.dnyg_r3);
	$("#dnyg_l3").val(data.dnyg_l3);
	$("#stjy_r1").val(data.stjy_r1);
	$("#stjy_l1").val(data.stjy_l1);
	$("#stjy_r2").val(data.stjy_r2);
	$("#stjy_l2").val(data.stjy_l2);
	$("#stjy_r3").val(data.stjy_r3);
	$("#stjy_l3").val(data.stjy_l3);
	$("#stsp_r1").val(data.stsp_r1);
	$("#stsp_l1").val(data.stsp_l1);
	$("#stsp_r2").val(data.stsp_r2);
	$("#stsp_l2").val(data.stsp_l2);
	$("#stsp_r3").val(data.stsp_r3);
	$("#stsp_l3").val(data.stsp_l3);
	$("#stsp_r4").val(data.stsp_r4);
	$("#stsp_l4").val(data.stsp_l4);
	$("#xtjy_r1").val(data.xtjy_r1);
	$("#xtjy_l1").val(data.xtjy_l1);
	$("#xtjy_r2").val(data.xtjy_r2);
	$("#xtjy_l2").val(data.xtjy_l2);
	$("#xtjy_r3").val(data.xtjy_r3);
	$("#xtjy_l3").val(data.xtjy_l3);
	$("#xtjy_r4").val(data.xtjy_r4);
	$("#xtjy_l4").val(data.xtjy_l4);
	$("#xtsp_r1").val(data.xtsp_r1);
	$("#xtsp_l1").val(data.xtsp_l1);
	$("#xtsp_r2").val(data.xtsp_r2);
	$("#xtsp_l2").val(data.xtsp_l2);
	$("#xtsp_r3").val(data.xtsp_r3);
	$("#xtsp_l3").val(data.xtsp_l3);
	$("#xtsp_r4").val(data.xtsp_r4);
	$("#xtsp_l4").val(data.xtsp_l4);
	$("#jmhd_r").val(data.jmhd_r);
	$("#jmhd_l").val(data.jmhd_l);
	$("#qjjc_r").val(data.qjjc_r);
	$("#qjjc_l").val(data.qjjc_l);
	$("#ydjc_r").val(data.ydjc_r);
	$("#ydjc_l").val(data.ydjc_l);
	var kaiyao = kaiyao_mx()==null?'':kaiyao_mx();
	var clyj = data.clyj;
	if(clyj==null || clyj==''){
		clyj = kaiyao;
	}else{
		if(clyj.indexOf(kaiyao)>-1){
			clyj = data.clyj;
		}else{
			clyj = clyj+" "+kaiyao;
		}	
	}
	$("#clyj").val(clyj);
	$("#bz").val(data.bz);
	
	
	$("#tkzj_qz").text(getUser1(data.tkzj_qz));
	$("#tkzj_qz_gh").text(data.tkzj_qz);
	
	$("#jmzj_qz").text(getUser1(data.jmzj_qz));
	$("#jmzj_qz_gh").text(data.jmzj_qz);
	
	$("#jmdxt_K1_qz").text(getUser1(data.jmdxt_K1_qz));
	$("#jmdxt_K1_qz_gh").text(data.jmdxt_K1_qz);
	
	$("#pxl_qz").text(getUser1(data.pxl_qz));
	$("#pxl_qz_gh").text(data.pxl_qz);
	
	$("#dnyg_qz").text(getUser1(data.dnyg_qz));
	$("#dnyg_qz_gh").text(data.dnyg_qz);
	
	$("#stjy_qz").text(getUser1(data.stjy_qz));
	$("#stjy_qz_gh").text(data.stjy_qz);
	
	$("#stsp_qz").text(getUser1(data.stsp_qz));
	$("#stsp_qz_gh").text(data.stsp_qz);
	
	$("#xtjy_qz").text(getUser1(data.xtjy_qz));
	$("#xtjy_qz_gh").text(data.xtjy_qz);
	
	$("#xtsp_qz").text(getUser1(data.xtsp_qz));
	$("#xtsp_qz_gh").text(data.xtsp_qz);
	
	$("#jmhd_qz").text(getUser1(data.jmhd_qz));
	$("#jmhd_qz_gh").text(data.jmhd_qz);
	
	$("#qjjc_qz").text(getUser1(data.qjjc_qz));
	$("#qjjc_qz_gh").text(data.qjjc_qz);
	
	$("#ydjc_qz").text(getUser1(data.ydjc_qz));
	$("#ydjc_qz_gh").text(data.ydjc_qz);
	
	$("#clyj_qz").text(getUser1(data.clyj_qz));
	$("#clyj_qz_gh").text(data.clyj_qz);
	
	$("#bz_qz").text(getUser1(data.bz_qz));
	$("#bz_qz_gh").text(data.bz_qz);
	/*******************补充************************/
	//$("#ssfs").text(data.ssfs);
	$("#ssfy").val(data.ssfy);
	$("#qg_jcf").val(data.qg_jcf);
	
	
	var ssf_rq = '';
	if(data.ssf_rq!=null){
		ssf_rq = dateToStr(data.ssf_rq);	
	}

	$("#ssf_rq").val(ssf_rq);
	
	var jcf_rq = '';
	if(data.jcf_rq!=null){
		jcf_rq = dateToStr(data.jcf_rq);	
	}
	$("#jcf_rq").val(jcf_rq);
	//recorder赋值
	if(data.recorder){
		$("#recorder").val(data.recorder);
	}
}
//预约 修改前赋值
function yy_update_set(data){
	$("#blh_yy").val("");
	$("#xingming_yy").text("");
	$("#sex").text("");
	$("#lxfs_yy").text("");
	$("#csrq_yy").text("");
	//$("#yyxm").text("");
	$("#showTime_yy").text("");
	$("#yy_id").val("");
	
	$("#blh_yy").text(data.blh);
	var jbxx = getJbxx_qg(data.blh);
	$("#xingming_yy").text(jbxx.name);
	$("#sex").text(jbxx.sex);
	$("#lxfs_yy").text(jbxx.dianhua);
	$("#csrq_yy").text(jbxx.birthday);
	
	var lc_id = data.lc_id;
	var lcObj =  getJSONData("/publish/quguang/getQglcById.htm?id="+lc_id,{},"GET").obj;
	var yyxm = lcObj.ssfs1+">"+lcObj.ssfs2+">"+lcObj.ssfs3;
	//$("#yyxm").text(data.yyxm);
	//$("#yyxm").text(yyxm);
	$("#showTime_yy").text(dateToStr_sj(data.yysj));
	$("#yy_id").val(data.id);
	var sj = "";
	var date_sj = $("#showTime_yy").text();
	if(date_sj!=""){
		var temp_sjs = date_sj.split(" ");
		if(temp_sjs.length>1){
			sj = temp_sjs[1];
			$("input[value='"+sj+"']").attr("checked",true);
		}
	}
	$("#dyrq_y").val(data.dyrq_y);
	$("#dyrq_r").val(data.dyrq_r);
	$("#dypl").val(data.dypl);
	//$("#ssfy").val(data.ssfy);
	//$("#ssfy1").val(data.ssfy1);
	if(data.yyxm1=="1"){
		$("#yyxm1").attr("checked","checked");
	}
	if(data.yyxm2=="1"){
		$("#yyxm2").attr("checked","checked");
	}
	if(data.yyxm3=="1"){
		$("#yyxm3").attr("checked","checked");
	}
	if(data.yyxm4=="1"){
		$("#yyxm4").attr("checked","checked");
	}
	if(data.yyxm5=="1"){
		$("#yyxm5").attr("checked","checked");
	}
	if(data.yyxm6=="1"){
		$("#yyxm6").attr("checked","checked");
	}
	$("#ssfy1").val(data.ssfy1);
	$("#ssfy2").val(data.ssfy2);
	$("#ssfy3").val(data.ssfy3);
	$("#ssfy4").val(data.ssfy4);
	$("#ssfy5").val(data.ssfy5);
	$("#ssfy6").val(data.ssfy6);
	
	$("#ssfy1h").val(data.ssfy1h);
	$("#ssfy2h").val(data.ssfy2h);
	$("#ssfy3h").val(data.ssfy3h);
	$("#ssfy4h").val(data.ssfy4h);
	$("#ssfy5h").val(data.ssfy5h);
	$("#ssfy6h").val(data.ssfy6h);
	
	$("#yy_qz").val(getUser1(data.yy_qz));
	$("#yy_qz_gh").val(data.yy_qz);
}

//手术记录  修改前赋值
function ssfs_update_set(data){
	var blh = $("#patientInfo").children("span").first().text();
	ssjl_set_jbxx(blh);
	$("#ssfs_l").text(data.ssfs_l);
	$("#ssfs_r").text(data.ssfs_r);
	$("#jzds_l").val(data.jzds_l);
	$("#jzds_r").val(data.jzds_r);
	$("#jzds2_l").val(data.jzds2_l);
	$("#jzds2_r").val(data.jzds2_r);
	$("#jzds3_l").val(data.jzds3_l);
	$("#jzds3_r").val(data.jzds3_r);
	$("#dxtxzds_l").val(data.dxtxzds_l);
	$("#dxtxzds_r").val(data.dxtxzds_r);
	$("#dxtxzds2_l").val(data.dxtxzds2_l);
	$("#dxtxzds2_r").val(data.dxtxzds2_r);
	$("#dxtxzds3_l").val(data.dxtxzds3_l);
	$("#dxtxzds3_r").val(data.dxtxzds3_r);
	$("#gqzj_l").val(data.gqzj_l);
	$("#gqzj_r").val(data.gqzj_r);
	$("#ddjl_l").val(data.ddjl_l);
	$("#ddjl_r").val(data.ddjl_r);
	$("#kappa_x_l").val(data.kappa_x_l);
	$("#dzhd_r").val(data.dzhd_r);
	$("#dzhd_l").val(data.dzhd_l);
	$("#mhd_r").val(data.mhd_r);
	$("#mhd_l").val(data.mhd_l);
	$("#tjhd_r").val(data.tjhd_r);
	$("#tjhd_l").val(data.tjhd_l);
	$("#syjzhd_r").val(data.syjzhd_r);
	$("#syjzhd_l").val(data.syjzhd_l);
	$("#kappa_x_r").val(data.kappa_x_r);
	$("#kappa_y_l").val(data.kappa_y_l);
	$("#kappa_y_r").val(data.kappa_y_r);
	$("#mbqz_l").val(data.mbqz_l);
	$("#mbqz_r").val(data.mbqz_r);
	$("#qxsd_l").val(data.qxsd_l);
	$("#qxsd_r").val(data.qxsd_r);
	$("#syhd_l").val(data.syhd_l);
	$("#syhd_r").val(data.syhd_r);
	$("#ssys_l").val(getUser1(data.ssys_l));
	$("#ssys_l_gh").val(data.ssys_l);
	$("#ssys_r").val(getUser1(data.ssys_r));
	$("#ssys_r_gh").val(data.ssys_r);
	
	$("#ptjs_l").val(getUser1(data.ptjs_l));
	$("#ptjs_l_gh").val(data.ptjs_l);
	$("#ptjs_r").val(getUser1(data.ptjs_r));
	$("#ptjs_r_gh").val(data.ptjs_r);
	
	$("#pths_l").val(getUser1(data.pths_l));
	$("#pths_l_gh").val(data.pths_l);
	$("#pths_r").val(getUser1(data.pths_r));
	$("#pths_r_gh").val(data.pths_r);
	
	$("#ssrq_l").val(dateToStr(data.ssrq_l));
	$("#ssrq_r").val(dateToStr(data.ssrq_r));
	
	var ssjg_l = data.ssjg_l;
	var ssjg_ls = ssjg_l.split("@");
	for(var j=0;j<ssjg_ls.length-1;j++){
		var jg = ssjg_ls[j];
		if(jg==0){
			$("#btn1_l").attr("checked",true);
		}else if(jg==1){
			$("#btn2_l").attr("checked",true);
		}else if(jg==2){
			$("#btn3_l").attr("checked",true);
		}
	}
	var ssjg_r = data.ssjg_r;
	var ssjg_rs = ssjg_r.split("@");
	for(var j=0;j<ssjg_rs.length-1;j++){
		var jg = ssjg_rs[j];
		if(jg==0){
			$("#btn1_r").attr("checked",true);
		}else if(jg==1){
			$("#btn2_r").attr("checked",true);
		}else if(jg==2){
			$("#btn3_r").attr("checked",true);
		}
	}
	$("#ssjl_bz").text(data.bz);
	$("#qgss_id").val(data.id);
	if(data.recorder)
	$("#recorder").val(data.recorder);
}
//术后记录 修改前赋值
function shjl_update_set(data){
	$("#zs_l").val(data.zs_l);
	$("#zs_r").val(data.zs_r);
	$("#sl_l").val(data.sl_l);
	$("#sl_r").val(data.sl_r);
	$("#xtsp1_l").val(data.xtsp1_l);
	$("#xtsp2_l").val(data.xtsp2_l);
	$("#xtsp3_l").val(data.xtsp3_l);
	$("#xtsp4_l").val(data.xtsp4_l);
	$("#xtsp1_r").val(data.xtsp1_r);
	$("#xtsp2_r").val(data.xtsp2_r);
	$("#xtsp3_r").val(data.xtsp3_r);
	$("#xtsp4_r").val(data.xtsp4_r);
	$("#lxd_l").val(data.lxd_l);
	$("#lxd_r").val(data.lxd_r);
	if(data.dxt_l=="1"){
		$("#dxt_l").attr("checked","checked");
	}
	if(data.dxt_r=="1"){
		$("#dxt_r").attr("checked","checked");
	}
//	$("#dxt_l").val(data.dxt_l);
//	$("#dxt_r").val(data.dxt_r);
	$("#yy_l").val(data.yy_l);
	$("#yy_r").val(data.yy_r);
	var kaiyao = kaiyao_mx()==null?'':kaiyao_mx();
	var cl_l = data.cl_l;
	var cl_r = data.cl_r;
	if(cl_l==null || cl_l==''){
		cl_l = kaiyao;
	}else{
		if(data.cl_l.indexOf(kaiyao)>-1){
			cl_l = data.cl_l;
		}else{
			cl_l = cl_l+" "+kaiyao;
		}
	}
	if(cl_r==null || cl_r==''){
		cl_r = kaiyao;	
	}else{
		if(data.cl_r.indexOf(kaiyao)>-1){
			cl_r = data.cl_r;
		}else{
			cl_r = data.cl_r+" "+kaiyao;
		}
	}
	$("#cl_l").val(cl_l);
	$("#cl_r").val(cl_r);
	$("#sj").val(dateToStr(data.sj));
	$("#qm").text(getUser1(data.qm));
	$("#qm_gh").text(data.qm);
	$("#bz_shjl_l").val(data.bz_shjl_l);
	$("#bz_shjl_r").val(data.bz_shjl_r);
	$("#shjl_id").val(data.id);
	
	$("#zs_qz").text(getUser1(data.zs_qz));
	$("#zs_qz_gh").text(data.zs_qz);
	
	$("#sl_qz").text(getUser1(data.sl_qz));
	$("#sl_qz_gh").text(data.sl_qz);
	
	$("#xtsp_qz").text(getUser1(data.xtsp_qz));
	$("#xtsp_qz_gh").text(data.xtsp_qz);
	
	$("#lxd_qz").text(getUser1(data.lxd_qz));
	$("#lxd_qz_gh").text(data.lxd_qz);
	
	$("#dxt_qz").text(getUser1(data.dxt_qz));
	$("#dxt_qz_gh").text(data.dxt_qz);
	
	$("#yy_qz").text(getUser1(data.yy_qz));
	$("#yy_qz_gh").text(data.yy_qz);
	
	$("#cl_qz").text(getUser1(data.cl_qz));
	$("#cl_qz_gh").text(data.cl_qz);
	
	$("#bz_qz").text(getUser1(data.bz_qz));
	$("#bz_qz_gh").text(data.bz_qz);
}
//打印 同意书
function print_tys(tag){
	qglc_get();//流程
	if(tag==1){
		$("#qg_tys").printArea();	
	}else if(tag==2){
		$("#qg_tys1").printArea();
	}else if(tag==3){
		$("#qg_tys").printArea();
		$("#qg_tys1").printArea();
	}
	
	
}
function print_tys_er(){
	qglc_get();//流程
	$("#qg_tys_er").printArea();
}
//打印 预约单
function print_yy(){
	var area = yy_printArea();
//	 var printWindow = window.open("");
//	    html_baogao="";
//	    html_baogao+="<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'>";
//	    html_baogao+="<html>";
//	    html_baogao+="<head>";
//	    html_baogao+="<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>";
//	    html_baogao+="<title>手术记录</title>";
//	    html_baogao+="<script language='javascript'> var contextPath='"+contextPath+"';</script>";
//	    html_baogao+="<link rel='stylesheet' type='text/css' href='"+contextPath+"/css/main.css' rel='stylesheet' type='text/css'>";
//	    html_baogao+="<link rel='stylesheet' type='text/css' href='"+contextPath+"/style/green/css/green.css' rel='stylesheet' type='text/css'>";
//	    html_baogao+="<link rel='stylesheet' type='text/css' href='"+contextPath+"/css/icon.css' rel='stylesheet' type='text/css'>";
//	    html_baogao+="<link rel='stylesheet' type='text/css' href='"+contextPath+"/style/green/css/openWin.css' rel='stylesheet' type='text/css'>";
//	    html_baogao+="<script src='"+contextPath+"/js/jquery.min.js'></script>";
//	    html_baogao+="<script src='"+contextPath+"/js/common.js'></script>";
//	    html_baogao+="<script src='"+contextPath+"/js/jquery.oimsDialog.js'></script>";
//	    html_baogao+="<script src='"+contextPath+"/js/jquery.PrintArea.js'></script>";
//	    html_baogao+="<script type='text/javascript'>" +
//					    "function print_sc(){" +
//					    	"$('#gaoZhiDan').printArea();" +
//					    	"window.close();" +
//					   "}" +
//	    		"</script>";
//	    html_baogao+="</head>";
//	    html_baogao+="<body id='body_baogao'  >";
//	    html_baogao+="<div id='gaoZhiDan' style='padding-bottom: 10px; margin: 0px auto; padding-left: 10px; width:590px; background: rgb(255,255,255); color: rgb(79,79,79); padding-top: 0px;border:0px solid;font-size:14px;'>";
//	    html_baogao+=area;
//		html_baogao+="</div>";
//	    html_baogao+="<div id='qt_div' class='print_btn' style='margin-left:50%;margin-top:10px;'><a href='javascript:print_sc();' class='btnone' id='a_print'><span class='print'></span>打印</a></div>";
//	    html_baogao+="</body>";
//	    html_baogao+="</html>";
//	    printWindow.document.write(html_baogao);
//	    printWindow.document.close();
		var printYYDiv = $("<div/>").attr("id","printYYDiv").append(area);
		$(printYYDiv).printArea();
		$("#printYYDiv").remove();
		
}

//打印 手术记录
function print_ssjl(){
	$("input[type='checkbox']").each(function(){
		if($(this).attr("checked")=="checked"){
			$(this).replaceWith("√");
		}else{
			$(this).replaceWith("<label style='font-size:20px;'>□</label>");
		}
	});
	$("#ssjl_show_div").printArea();
	ssjl_zfz();
//	var area = ssjl_printArea();
//	 var printWindow = window.open("");
//	    html_baogao="";
//	    html_baogao+="<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'>";
//	    html_baogao+="<html>";
//	    html_baogao+="<head>";
//	    html_baogao+="<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>";
//	    html_baogao+="<title>手术记录</title>";
//	    html_baogao+="<script language='javascript'> var contextPath='"+contextPath+"';</script>";
//	   // html_baogao+="<link rel='stylesheet' type='text/css' href='"+contextPath+"/css/main.css' rel='stylesheet' type='text/css'>";
//	    html_baogao+="<link rel='stylesheet' type='text/css' href='"+contextPath+"/style/green/css/green.css' rel='stylesheet' type='text/css'>";
//	    html_baogao+="<link rel='stylesheet' type='text/css' href='"+contextPath+"/css/icon.css' rel='stylesheet' type='text/css'>";
//	    html_baogao+="<link rel='stylesheet' type='text/css' href='"+contextPath+"/style/green/css/openWin.css' rel='stylesheet' type='text/css'>";
//	    html_baogao+="<script src='"+contextPath+"/js/jquery.min.js'></script>";
//	    html_baogao+="<script src='"+contextPath+"/js/common.js'></script>";
//	    html_baogao+="<script src='"+contextPath+"/js/jquery.oimsDialog.js'></script>";
//	    html_baogao+="<script src='"+contextPath+"/js/jquery.PrintArea.js'></script>";
//	    html_baogao+="<script type='text/javascript'>" +
//					    "function print_sc(){" +
//					    	"$('#gaoZhiDan').printArea();" +
//					   "}" +
//	    		"</script>";
//	    html_baogao+="</head>";
//	    html_baogao+="<body id='body_baogao'  >";
//	    html_baogao+="<div id='gaoZhiDan' style='width:630px;font-size:12px;'>";
//	    html_baogao+=area;
//		html_baogao+="</div>";
//	    html_baogao+="<div id='qt_div' class='print_btn' style='margin-left:50%;margin-top:10px;'><a href='javascript:print_sc();' class='btnone' id='a_print'><span class='print'></span>打印</a></div>";
//	    html_baogao+="</body>";
//	    html_baogao+="</html>";
//	    printWindow.document.write(html_baogao);
//	    printWindow.document.close();
}

//打印 术后记录
function print_shjl(){
	var blh = $("#patientInfo").children("span").first().text();
	var area = shjl_printArea();
	var print_div = $("<div/>").addClass("baoGaoDan_print1").html(area);
	var jbxx = getJbxx_qg(blh);
	$(print_div).find("#caseNumber").text(jbxx.blh);
	$(print_div).find("#suffererName").text(jbxx.name);
	$(print_div).find("#sex").text(jbxx.sex);
	$(print_div).find("#age").text(jbxx.age);
	$(print_div).printArea();
	/* var printWindow = window.open("");
	    html_baogao="";
	    html_baogao+="<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'>";
	    html_baogao+="<html>";
	    html_baogao+="<head>";
	    html_baogao+="<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>";
	    html_baogao+="<title>手术记录</title>";
	    html_baogao+="<script language='javascript'> var contextPath='"+contextPath+"';</script>";
	    html_baogao+="<link rel='stylesheet' type='text/css' href='"+contextPath+"/css/main.css' rel='stylesheet' type='text/css'>";
	    html_baogao+="<link rel='stylesheet' type='text/css' href='"+contextPath+"/style/green/css/green.css' rel='stylesheet' type='text/css'>";
	    html_baogao+="<link rel='stylesheet' type='text/css' href='"+contextPath+"/css/icon.css' rel='stylesheet' type='text/css'>";
	    html_baogao+="<link rel='stylesheet' type='text/css' href='"+contextPath+"/style/green/css/openWin.css' rel='stylesheet' type='text/css'>";
	    html_baogao+="<script src='"+contextPath+"/js/jquery.min.js'></script>";
	    html_baogao+="<script src='"+contextPath+"/js/common.js'></script>";
	    html_baogao+="<script src='"+contextPath+"/js/jquery.oimsDialog.js'></script>";
	    html_baogao+="<script src='"+contextPath+"/js/jquery.PrintArea.js'></script>";
	    html_baogao+="<script type='text/javascript'>" +
					    "function print_sc(){" +
					    "$('#gaoZhiDan').removeClass().addClass('baoGaoDan_print1').printArea();" +
				    	"$('#gaoZhiDan').removeClass().addClass('baoGaoDan_print');" +
					   "}" +
	    		"</script>";
	    html_baogao+="</head>";
	    html_baogao+="<body id='body_baogao'  >";
	    html_baogao+="<div id='gaoZhiDan' class='baoGaoDan_print'>";
	    html_baogao+=area;
		html_baogao+="</div>";
	    html_baogao+="<div id='qt_div' class='print_btn' style='margin-left:50%;margin-top:10px;'><a href='javascript:print_sc();' class='btnone' id='a_print'><span class='print'></span>打印</a></div>";
	    html_baogao+="</body>";
	    html_baogao+="</html>";
	    printWindow.document.write(html_baogao);
	    printWindow.document.close();*/
}
//预约单  打印
function yy_printArea(){
	var temp = yy_get();
	var jbxx = getJbxx_qg(temp.blh);
	var sj = temp.yysj;
	var nian = sj.getFullYear();
	var yue = sj.getMonth()+1;
	var ri = sj.getDate();
	var zhou = sj.getDay();
	var xiaoshi = sj.getHours();
	//ly修改
	if(parseInt(xiaoshi)==1){
		xiaoshi=13;
	}
	else if(parseInt(xiaoshi)==2){
		xiaoshi=14;
	}else if(parseInt(xiaoshi)==3){
		xiaoshi=15;
	}else if(parseInt(xiaoshi)==4){
		xiaoshi=16;
	}
	if(zhou==0){
		zhou="日";
	}else if(zhou==1){
		zhou="一"
	}else if(zhou==2){
		zhou="二"
	}else if(zhou==3){
		zhou="三"
	}else if(zhou==4){
		zhou="四"
	}else if(zhou==5){
		zhou="五"
	}else if(zhou==6){
		zhou="六"
	}else if(zhou==7){
		zhou="日"
	}
	//var yyxm = temp.yyxm;
	var ssfy1 = '';
	if(temp.ssfy1h!=null && temp.ssfy1h!=''){
		ssfy1 = temp.ssfy1h;
	}else if(temp.ssfy1!=null & temp.ssfy1!=''){
		ssfy1 = temp.ssfy1;
	}
	var ssfy2 = '';
	if(temp.ssfy2h!=null && temp.ssfy2h!=''){
		ssfy2 = temp.ssfy2h;
	}else if(temp.ssfy2!=null & temp.ssfy2!=''){
		ssfy2 = temp.ssfy2;
	}
	var ssfy3 = '';
	if(temp.ssfy3h!=null && temp.ssfy3h!=''){
		ssfy3 = temp.ssfy3h;
	}else if(temp.ssfy3!=null & temp.ssfy3!=''){
		ssfy3 = temp.ssfy3;
	}
	var ssfy4 = '';
	if(temp.ssfy4h!=null && temp.ssfy4h!=''){
		ssfy4 = temp.ssfy4h;
	}else if(temp.ssfy4!=null & temp.ssfy4!=''){
		ssfy4 = temp.ssfy4;
	}
	var ssfy5 = '';
	if(temp.ssfy5h!=null && temp.ssfy5h!=''){
		ssfy5 = temp.ssfy5h;
	}else if(temp.ssfy5!=null & temp.ssfy5!=''){
		ssfy5 = temp.ssfy5;
	}
	var ssfy6 = '';
	if(temp.ssfy6h!=null && temp.ssfy6h!=''){
		ssfy6 = temp.ssfy6h;
	}else if(temp.ssfy6!=null & temp.ssfy6!=''){
		ssfy6 = temp.ssfy6;
	}
	var area = "<div id='gaoZhiDan' style='padding-bottom: 10px; margin: 0px auto; padding-left: 10px; width:590px; background: rgb(255,255,255); color: rgb(79,79,79); padding-top: 0px;border:0px solid;'>" +
			"<table id='ssjlAdd' cellpadding='2' cellspacing='0' width='100%'>" +
					"<tr>" +
						"<td align='center'><h3 style='font-size:20px;font-family:黑体;'>屈光手术通知单</h3></td>" +
					"</tr>" +
					"<tr>" +
						"<td style='font-size:16px;'>亲爱的患友<span class='yy_print_bianliang'>&nbsp;&nbsp;&nbsp;&nbsp;<label id='xingming'>"+jbxx.name+"</label>&nbsp;&nbsp;&nbsp;&nbsp;</span>：</td>" +
					"</tr>" +
					"<tr>" +
						"<td style='line-height:25px;font-size:16px;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您已预约" +
							"<span style='border-bottom:1px solid black;'>&nbsp;&nbsp;&nbsp;&nbsp;<label id='nian'>"+nian+"</label>&nbsp;&nbsp;&nbsp;&nbsp;</span>年" +
							"<span style='border-bottom:1px solid black;'>&nbsp;&nbsp;&nbsp;&nbsp;<label id='yue'>"+yue+"</label>&nbsp;&nbsp;&nbsp;&nbsp;</span>月" +
							"<span style='border-bottom:1px solid black;'>&nbsp;&nbsp;&nbsp;&nbsp;<label id='ri'>"+ri+"</label>&nbsp;&nbsp;&nbsp;&nbsp;</span>日（周" +
							"<span style='border-bottom:1px solid black;'>&nbsp;&nbsp;<label id='zhou'>"+zhou+"</label>&nbsp;&nbsp;</span>）在我中心进行近视手术。根据检查结果，建议以下手术方式。请根据自身需求和经济情况，自行选择。" +
						"</td>" +
					"</tr>" +
				"</table>" +
				"<table id='ssjlAdd' cellpadding='2' cellspacing='0' width='100%' style='font-size:14px;'>" +
//					"<tr>" +
//						"<td style='font-size:20px;'>"+
//							"<label>";
//								if(temp.yyxm1=="1"){
//									area+="√";
//								}else{
//									area+="□";	
//								}
//					area+="</label>"+
//						"</td>" +
//						"<td style='font-size:18px;'>" +
//							"LASIK系列：" +
//						"</td>" +
//						"<td style='border-bottom:1px solid black;width:70px;font-size:16px;' align='center'>" +
//							"<label id='lasik'>";
//								if(temp.yyxm1=="1"){
//									area+=ssfy1;
//								}
//							area+="</label>" +
//						"</td>" +
//						"<td style='font-size:16px;'>" +
//							"（先“普通刀片”，后激光）" +
//						"</td>" +
//						"<td></td>" +
//					"</tr>" +
					"<tr>" +
						"<td style='font-size:14px;' >"+
							"<label>";
								if(temp.yyxm2=="1"){
									area+="√";
								}else{
									area+="□";	
								}
					area+="</label>"+
						"</td>" +
						"<td style='font-size:14px;' nowrap>" +
							"超 薄 系 列：" +
						"</td>" +
						"<td style='border-bottom:1px solid black;font-size:14px;' align='center'>";
							if(temp.yyxm2=="1"){
								area+=ssfy2;
							}
				area+="</td>" +
						"<td style='font-size:14px;'>" +
							"（先“超薄刀片”，后激光，更节约角膜）" +
						"</td>" +
						"<td></td>" +
					"</tr>" +
					"<tr>" +
						"<td style='font-size:14px;'>"+
							"<label>";
								if(temp.yyxm3=="1"){
									area+="√";
								}else{
									area+="□";	
								}
				area+="</label>"+
						"</td>" +
						"<td style='font-size:14px;' nowrap>" +
							"飞 秒 系 列：" +
						"</td>" +
						"<td style='border-bottom:1px solid black;font-size:14px;' align='center'>";
							if(temp.yyxm3=="1"){
								area+=ssfy3;
							}
				area+="</td>" +
						"<td style='font-size:14px;'>" +
							"（全激光，全程无刀；最节约角膜，更精确安全）" +
						"</td>" +
						"<td></td>" +
					"</tr>" +
					"<tr>" +
					"<td style='font-size:14px;'>"+
						"<label>";
							if(temp.yyxm5=="1"){
								area+="√";
							}else{
								area+="□";	
							}
			area+="</label>"+
					"</td>" +
					"<td style='font-size:14px;' nowrap>" +
						"全 飞 秒：" +
					"</td>" +
					"<td style='border-bottom:1px solid black;font-size:14px;' align='center'>";
						if(temp.yyxm5=="1"){
							area+=ssfy5;
						}
			area+="</td>" +
					"<td style='font-size:14px;'>" +
						"(无瓣全飞秒，全程无刀，微创，更精确安全)" +
					"</td>" +
					"<td></td>" +
				"</tr>" +
				"<tr>" +
				"<td style='font-size:14px;'>"+
					"<label>";
						if(temp.yyxm6=="1"){
							area+="√";
						}else{
							area+="□";	
						}
		area+="</label>"+
				"</td>" +
				"<td style='font-size:14px;' nowrap>" +
					"T-PRK：" +
				"</td>" +
				"<td style='border-bottom:1px solid black;font-size:14px;' align='center'>";
					if(temp.yyxm6=="1"){
						area+=ssfy6;
					}
		area+="</td>" +
				"<td style='font-size:14px;'>" +
					"(无瓣全激光，术后不适3天，点药时间1-3个月，但术后更安全）" +
				"</td>" +
				"<td></td>" +
			"</tr>" +
				"</table>" +
				"<table id='ssjlAdd' cellpadding='5' cellspacing='0' width='100%' >" +
					"<tr>" +
						"<td style='font-size:14px;'>" +
							"<span style='font-size:14px;'>";
								if(temp.yyxm4=="1"){
									area+="√";
								}else{
									area+="□";	
								}
						area+="</span>&nbsp;&nbsp;" +
							"<span style='font-size:14px;' nowrap>ICL</span>" +
							"<span style='border-bottom:1px solid black;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label id='icl'>";
								if(temp.yyxm4=="1"){
									area+=ssfy4;
								}
						area+="</label>&nbsp;&nbsp;&nbsp;&nbsp;</span>" +
							"（晶体植入手术，适合高度近视、角膜扁薄或形态异常患者）</br></br>" +
						"</td>" +
					"</tr>" +
					"<tr>" +
						"<td style='line-height:22px;font-size:15px;'>" +
							"1.请于<span class='yy_print_bianliang'>&nbsp;&nbsp;&nbsp;&nbsp;<label id='yue1'>"+temp.dyrq_y+"</label>&nbsp;&nbsp;&nbsp;&nbsp;</span>月" +
							"<span style='border-bottom:1px solid black;'>&nbsp;&nbsp;&nbsp;&nbsp;<label id='ri1'>"+temp.dyrq_r+"</label>&nbsp;&nbsp;&nbsp;&nbsp;</span>日开始点药，" +
							"<span style='border-bottom:1px solid black;'>&nbsp;&nbsp;&nbsp;&nbsp;<label id='ci'>"+temp.dypl+"</label>&nbsp;&nbsp;&nbsp;&nbsp;</span>次/日（早、中、晚、睡前），1-2滴/次，不同种类眼药之间间隔5分钟。" +
						"</td>" +
					"</tr>" +
					"<tr>" +
						"<td style='font-size:15px;'>" +
							"2.手术当日常规进餐，<span style='font-style:italic;font-weight:900;font-size:20px'>手术前、后请点托百士&加替沙星眼液各4次。</span>于<span style='border-bottom:1px solid black;'>&nbsp;&nbsp;&nbsp;&nbsp;<label id='xiaoshi'>"+xiaoshi+"</label>&nbsp;&nbsp;&nbsp;&nbsp;</span>:" +
							"<span  style='border-bottom:1px solid black;'>&nbsp;&nbsp;&nbsp;&nbsp;<label id='fen'>00</label>&nbsp;&nbsp;&nbsp;&nbsp;</span>前来我中心，无需挂号。" +
						"</td>" +
					"</tr>" +
					"<tr><td style='font-size:15px;'>3.学生、教师及军人，请带上相关证件，享受优惠</td></tr>" +
					"<tr><td style='font-size:16px;font-weight:bold;'><label style='font-weight:bolder;'>联系电话：</label>(023)68754126&nbsp;&nbsp;&nbsp;&nbsp;68754826</td></tr>" +
					"<tr><td align='right' style='font-size:20px;font-family:黑体;'>西南医院眼科屈光中心</td></tr>" +
				"</table></div>";
	return area;
}
//手术记录 打印
function ssjl_printArea(){
	var temp = ssjl_get();
	var area = "<table id='ssjlAdd' cellpadding='0' cellspacing='0' width='100%'>" +
	"<tr>" +
		"<td width='15%'></td>" +
		"<td align='center' width='25%'>左</td>" +
		"<td align='center' width='25%'>右</td>" +
		"<td width='35%'></td>"+
	"</tr></table>" +
	"<table id='ssjlAdd' cellpadding='0' cellspacing='0' width='100%' style='border-top:1px solid #d2d2d2;border-left:1px solid #d2d2d2;'>" +
	"<tr>" +
		"<td align='center' class='td_border' width='15%'>手术方式</td>" +
		"<td align='center' class='td_border' width='25%'>"+temp.ssfs_l+"<label id='ssfs_l'></label></td>" +
		"<td align='center' class='td_border' width='25%'><label id='ssfs_r'>"+temp.ssfs_r+"</label></td>" +
		"<td rowspan='6' class='td_border' width='35%'>" +
			"<table border='0' cellpadding='0' cellspacing='0' width='100%' height='100%' >" +
				"<tr>" +
					"<td rowspan='4' class='td_border' align='center' width='40%'>手术结果</td>"+
					"<td align='center'>左</td>" +
					"<td align='center'>右</td>" +
				"</tr>" +
				"<tr>";
			if($("#btn1_l").attr("checked")=='checked'){
				area+="<td align='center'><label name='ssjg_l'/>&nbsp;&nbsp;√顺利</label></td>";
			}else{
				area+="<td align='center'><label name='ssjg_l'/>&nbsp;&nbsp;顺利</label></td>";
			}
			if($("#btn1_r").attr("checked")=='checked'){
				area+="<td align='center'><label name='ssjg_r'/>&nbsp;&nbsp;√顺利</label></td>";
			}else{
				area+="<td align='center'><label name='ssjg_r'/>&nbsp;&nbsp;顺利</label></td>";
			}
			area+="</tr>" +
				"<tr>";
				if($("#btn2_l").attr("checked")=='checked'){
					area+="<td align='center'><label name='ssjg_l'/>&nbsp;&nbsp;√顺利</label></td>";
				}else{
					area+="<td align='center'><label name='ssjg_l'/>&nbsp;&nbsp;顺利</label></td>";
				}
				if($("#btn2_r").attr("checked")=='checked'){
					area+="<td align='center'><label name='ssjg_r'/>&nbsp;&nbsp;√转眼</label></td>";
				}else{
					area+="<td align='center'><label name='ssjg_r'/>&nbsp;&nbsp;转眼</label></td>";
				}
				//area+="<td align='center'><label name='ssjg_l'/>&nbsp;&nbsp;转眼</label></td>" +
				//area+="<td align='center'><label name='ssjg_r'/>&nbsp;&nbsp;转眼</label></td>" +
			area+="</tr>";
				"<tr>";
					if($("#btn3_l").attr("checked")=='checked'){
						area+="<td align='center' style='border-bottom:1px solid #d2d2d2;'><label name='ssjg_l'/>&nbsp;&nbsp;√挤眼</label></td>";
					}else{
						area+="<td align='center' style='border-bottom:1px solid #d2d2d2;'><label name='ssjg_l'/>&nbsp;&nbsp;挤眼</label></td>";
					}
					if($("#btn3_r").attr("checked")=='checked'){
						area+="<td align='center' style='border-bottom:1px solid #d2d2d2;'><label name='ssjg_r'/>&nbsp;&nbsp;√挤眼</label></td>";
					}else{
						area+="<td align='center' style='border-bottom:1px solid #d2d2d2;'><label name='ssjg_r'/>&nbsp;&nbsp;挤眼</label></td>";
					}
					//area+="<td style='border-bottom:1px solid #d2d2d2;' align='center'><label name='ssjg_l'/>&nbsp;&nbsp;挤眼</label></td>" +
					//area+="<td style='border-bottom:1px solid #d2d2d2;' align='center'><label name='ssjg_r'/>&nbsp;&nbsp;挤眼</label></td>" +
			area+="</tr>" +
				"<tr>" +
					"<td rowspan='2' style='border-right:1px solid #d2d2d2;' align='center'>备注</td>" +
					"<td rowspan='2' colspan='2' align='center'>"+temp.bz+"</td>" +
				"</tr>" +
			"</table>" +
		"</td>"+
	"</tr>" +
	"<tr>" +
		"<td align='center' class='td_border'>矫正度数</td>" +
		"<td align='center' class='td_border'>"+temp.jzds_l+"</td>" +
		"<td align='center' class='td_border'>"+temp.jzds_r+"</td>" +
	"</tr>" +
	"<tr>" +
		"<td align='center' class='td_border'>光区直径</td>" +
		"<td align='center' class='td_border'>"+temp.gqzj_l+"</td>" +
		"<td align='center' class='td_border'>"+temp.gqzj_r+"</td>" +
	"</tr>" +
	"<tr>" +
		"<td align='center' class='td_border'>顶点距离</td>" +
		"<td align='center' class='td_border'>"+temp.ddjl_l+"</td>" +
		"<td align='center' class='td_border'>"+temp.ddjl_r+"</td>" +
	"</tr>" +
	"<tr>" +
		"<td align='center' class='td_border'>Kappa角</td>" +
		"<td align='center' class='td_border'>" +
			"X&nbsp;&nbsp;"+temp.kappa_x_l+"&nbsp;&nbsp;" +
			"Y&nbsp;&nbsp;"+temp.kappa_y_l+"&nbsp;&nbsp;" +
		"</td>" +
		"<td align='center' class='td_border'>" +
			"X&nbsp;&nbsp;"+temp.kappa_x_r+"&nbsp;&nbsp;" +
			"Y&nbsp;&nbsp;"+temp.kappa_y_r+"&nbsp;&nbsp;" +
		"</td>" +
	"</tr>" +
	"<tr>" +
		"<td align='center' class='td_border'>手术医生</td>" +
		"<td align='center' class='td_border'>"+temp.ssys_l+"</td>" +
		"<td align='center' class='td_border'>"+temp.ssys_r+"</td>" +
	"</tr>" +
	"<tr>" +
		"<td align='center' class='td_border'>手术日期</td>" +
		"<td align='center' class='td_border'>"+$('#ssrq_l').val()+"</td>" +
		"<td align='center' class='td_border'>"+$('#ssrq_r').val()+"</td>" +
	"</tr>" +
"</table>";
	return area;
}
//术后记录 打印
function shjl_printArea(){
	var blh = $("#patientInfo").children("span").first().text();
	var list = getJSONData("/publish/quguang/findAllShjlByBlh.htm?blh='"+blh+"'",{},"POST");

	
	var area = "<table cellpadding='0' cellspacing='0' width='100%' >" +
					"<tr>" +
						"<td align='center'>" +
							"<div id='shjl_show_div' style='padding-bottom: 10px; margin: 0px auto; padding-left: 10px; width: 100%; padding-right: 10px; background: rgb(255,255,255); color: rgb(79,79,79); padding-top: 10px'>" +
								"<h1 style='text-align: center; line-height: 30px; height: 30px; font-size: 25px'>术后记录</h1>"+
							    "<div style='width:100%;border-bottom: rgb(51,51,51) 2px solid; font-size: 12px; border-top: rgb(51,51,51) 2px solid'>"+
							        "<table border='0' cellpadding='0' cellspacing='0' width='100%' style='font-size:12px;text-align:center;'>"+
							            "<tbody>"+
							                "<tr>"+
							                    "<th nowrap='nowrap' width='10%'>ID号：</th>"+
							                    "<td width='15%'>"+
							                        "<label id='caseNumber'>caseNumber</label></td>"+
							                    "<th height='30' nowrap='nowrap' width='10%''>"+
							                        "姓名：</th>"+
							                    "<td width='15%'>"+
							                        "<label id='suffererName'>suffererName</label></td>"+
							                    "<th nowrap='nowrap' width='10%'>性别：</th>"+
							                    "<td width='15%'><label id='sex'>sex</label></td>"+
							                    "<th nowrap='nowrap' width='10%'>年龄：</th>"+
							                    "<td width='15%'><label id='age'>age</label></td>"+
							                "</tr>"+
							            "</tbody>"+
							        "</table>"+
							    "</div>" +
						    "</div>" +
						"</td>" +
					"</tr>" +
				"</table>" +
				"<table cellpadding='0' cellspacing='0' width='100%'>" +
					"<tr>" +
						"<td>右眼</td>" +
					"</tr>" +
				"</table>" +
				"<table id='ssjlAdd' cellpadding='0' cellspacing='0' width='100%' style='font-size:12px;border-top:2px solid rgb(51,51,51);border-left:2px solid rgb(51,51,51);'>" +
					"<tr>" +
						"<td align='center' class='td_border' width='15%'>时间</td>" +
						"<td align='center' class='td_border' width='11%'>主诉</td>" +
						"<td align='center' class='td_border' width='6%'>视力</td>" +
						"<td align='center' class='td_border' width='16%'>小瞳试片</td>" +
						"<td align='center' class='td_border' width='10%'>裂隙灯</td>" +
						"<td align='center' class='td_border' width='10%'>地形图</td>" +
						"<td align='center' class='td_border' width='7%'>眼压（mmHg）</td>" +
						"<td align='center' class='td_border' width='18%'>处理</td>" +
						"<td align='center' class='td_border' width='7%'>签字</td>" +
					"</tr>";
				var len_r = 10;
				var bz_r = "";
				if(list!=null){
					var valLen = list.length;
					if(valLen>10){
						valLen = 10;
					}
					len_r = 10-valLen;
					$.each(list,function(i,item){
						var sj = "";
						if(item.sj!=null){
							sj = dateToStr(item.sj);
						}
						if(item.bz_shjl_r!=null && item.bz_shjl_r!=""){
							bz_r+=sj;
							bz_r+="&nbsp;&nbsp;："
							bz_r+=item.bz_shjl_r;
							bz_r+="；&nbsp;&nbsp;&nbsp;&nbsp;";
						}
						var xtsp_r= item.xtsp1_r +"DS"+item.xtsp2_r+"DC×"+item.xtsp3_r+"="+item.xtsp4_r;
						if(i<10){
							area+="<tr>" +
							"<td align='center' class='td_border'>"+sj+"</td>" +
							"<td align='center' class='td_border'>"+item.zs_r+"</td>" +
							"<td align='center' class='td_border'>"+item.sl_r+"</td>" +
							"<td align='center' class='td_border'>"+xtsp_r+"</td>" +
							"<td align='center' class='td_border'>"+item.lxd_r+"</td>";
							var dxt_r = item.dxt_r=="1"?"√":"";
							area+="<td align='center' class='td_border'>"+dxt_r+"</td>" +
							"<td align='center' class='td_border'>"+item.yy_r+"</td>" +
							"<td align='center' class='td_border'>"+item.cl_l+"</td>" +
							"<td align='center' class='td_border'>"+item.qm+"</td>" +
						"</tr>";
						}
						
					});	
					for(var i=0;i<len_r;i++){
						area+="<tr>" +
								"<td align='center' class='td_border'></td>" +
								"<td align='center' class='td_border'></td>" +
								"<td align='center' class='td_border'></td>" +
								"<td align='center' class='td_border'></td>" +
								"<td align='center' class='td_border'></td>" +
								"<td align='center' class='td_border'></td>" +
								"<td align='center' class='td_border'></td>" +
								"<td align='center' class='td_border'></td>" +
								"<td align='center' class='td_border'></td>" +
							"</tr>";
					}
				}
				area+="<tr>" +
						"<td class='td_border' style='height:80px;' align='center'>备注</td>" +
						"<td colspan='8' class='td_border' style='height:80px;'>"+bz_r+"</td>" +
					"</tr>";
			//--------------------------------
	area += "<table cellpadding='0' cellspacing='0' width='100%'>" +
				"<tr>" +
					"<td>左眼</td>" +
				"</tr>" +
			"</table>" +
			"<table id='ssjlAdd' cellpadding='0' cellspacing='0' width='100%' style='font-size:12px;border-top:2px solid rgb(51,51,51);border-left:2px solid rgb(51,51,51);'>" +
				"<tr>" +
					"<td align='center' class='td_border' width='15%'>时间</td>" +
					"<td align='center' class='td_border' width='11%'>主诉</td>" +
					"<td align='center' class='td_border' width='6%'>视力</td>" +
					"<td align='center' class='td_border' width='16%'>小瞳试片</td>" +
					"<td align='center' class='td_border' width='10%'>裂隙灯</td>" +
					"<td align='center' class='td_border' width='10%'>地形图</td>" +
					"<td align='center' class='td_border' width='7%'>眼压（mmHg）</td>" +
					"<td align='center' class='td_border' width='18%'>处&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;理</td>" +
					"<td align='center' class='td_border' width='7%'>签&nbsp;&nbsp;&nbsp;&nbsp;字</td>" +
				"</tr>";
			var len_l = 10;
			var bz_l = "";
			if(list!=null){
				var valLen = list.length;
				if(valLen>10){
					valLen = 10;
				}
				len_l = 10-valLen;
				$.each(list,function(i,item){
					var xtsp_l= item.xtsp1_l +"DS"+item.xtsp2_l+"DC×"+item.xtsp3_l+"="+item.xtsp4_l;
					var sj = "";
					if(item.sj!=null){
						sj = dateToStr(item.sj);
					}
					if(item.bz_shjl_l!=null && item.bz_shjl_l!=""){
						bz_l+=sj;
						bz_l+="&nbsp;&nbsp;："
						bz_l+=item.bz_shjl_l;
						bz_l+="；&nbsp;&nbsp;&nbsp;&nbsp;";
					}
					area+="<tr>" +
							"<td align='center' class='td_border'>"+sj+"</td>" +
							"<td align='center' class='td_border'>"+item.zs_l+"</td>" +
							"<td align='center' class='td_border'>"+item.sl_l+"</td>" +
							"<td align='center' class='td_border'>"+xtsp_l+"</td>" +
							"<td align='center' class='td_border'>"+item.lxd_l+"</td>";
							var dxt_l = item.dxt_l=="1"?"√":"";
					 area+="<td align='center' class='td_border'>"+dxt_l+"</td>" +
							"<td align='center' class='td_border'>"+item.yy_l+"</td>" +
							"<td align='center' class='td_border'>"+item.cl_l+"</td>" +
							"<td align='center' class='td_border'>"+item.qm+"</td>" +
						"</tr>";
				});	
				for(var i=0;i<len_l;i++){
					area+="<tr>" +
							"<td align='center' class='td_border'></td>" +
							"<td align='center' class='td_border'></td>" +
							"<td align='center' class='td_border'></td>" +
							"<td align='center' class='td_border'></td>" +
							"<td align='center' class='td_border'></td>" +
							"<td align='center' class='td_border'></td>" +
							"<td align='center' class='td_border'></td>" +
							"<td align='center' class='td_border'></td>" +
							"<td align='center' class='td_border'></td>" +
						"</tr>";
				}
			}
		area+="<tr>" +
				"<td class='td_border' style='height:80px;' align='center'>备注</td>" +
				"<td colspan='8' class='td_border' style='height:80px;'>"
				+bz_l
				+"</td>" +
			"</tr>";
		area+="</table>";
	return area;
}
/*************************************其他方法**************************************************/
//签字
//function qgqz(){
//	$("input[type='text']").change( function() {
//		var yg = getUser();
//		$(this).parent().parent().children("td:last").children("label:first").text(yg.xingming);
//		$(this).parent().parent().children("td:last").children("label:last").text(yg.gonghao);
//
//	});
//	$("input[type='checkbox']").change( function() {
//		var yg = getUser();
//		$(this).parent().parent().children("td:last").children("label:first").text(yg.xingming);
//	});
//	$("textarea").change( function() {
//		var yg = getUser();
//		$(this).parent().parent().children("td:last").children("label:first").text(yg.xingming);
//	});
//} 

/*function qgqz_shjl(){
	$("input[type='text']").change( function() {
		var yg = getUser();
		$("#qm").text(yg.xingming);
	});
	$("textarea").change( function() {
		var yg = getUser();
		$("#qm").text(yg.xingming);
	});
} 
function qgqz_jt_ssjl(){
	$("input[type='text']").change( function() {
		var yg = getUser();
		$(this).parent().parent().parent().children("tr:last").children("td:last").children("label").text(yg.xingming);
	});
	$("input[type='checkbox']").change( function() {
		var yg = getUser();
		$(this).parent().parent().parent().children("tr:last").children("td:last").children("label").text(yg.xingming);
	});
	$("input[type='radio']").change( function() {
		var yg = getUser();
		$(this).parent().parent().parent().children("tr:last").children("td:last").children("label").text(yg.xingming);
	});
	$("textarea").change( function() {
		var yg = getUser();
		$(this).parent().parent().parent().children("tr:last").children("td:last").children("label").text(yg.xingming);
	});
}*/
function getUser(){
	var ygdata = getJSONData("/publish/yuangong/findYuangongByGonghao.htm", {
		tag : Math.random()
	}, "post").obj;
	return ygdata;
}
function getUser1(gonghao){
	var ygdata = null;
	var xingming = '';
	if(gonghao!=null && gonghao!=''){
		ygdata = getJSONData("/publish/yuangong/findYuangongByGonghao1.htm", {gonghao:gonghao,tag : Math.random()}, "post");
		if(ygdata!=null && ygdata.obj!=null){
			var data = ygdata.obj;
			xingming = data.xingming;
		}
	}
	return xingming;
}
//屈光流程
function qglc_get(){
	var lc_id = $("#lc_id").text()==''?null:$("#lc_id").text();
	if(lc_id=="无"){
		lc_id=null;
	}
	var temp = {};
	var url_lc = '';
	if(lc_id==null){
		temp.id = lc_id;
		temp.blh = $("#patientInfo").children("span").first().text();
		temp.state = 1;
		temp.startTime = new Date();	
		url_lc = EMR_QGLC_SAVE_URL;
		var fl = $("#sel_lev1").val();
		temp.bl_id = getLastOneQgbl(fl);
	}else{
		temp =  getJSONData("/publish/quguang/getQglcById.htm?id="+lc_id,{},"GET").obj;
		temp.startTime = new Date(temp.startTime.time);
		var state = 0;
		var sel_tag = $("#div_show_4_2_1 ").children(".tab_show").children("span").text();
		if(sel_tag=="病历"){
			state = 0;
		}else if(sel_tag=="同意书"){
			state=1;
		}else if(sel_tag=="预约"){
			state=2;
		}else if(sel_tag=="手术记录"){
			state=4;
		}/*else if(sel_tag=="术后复查"){
			state=3;
		}*/
		temp.state = (state+1);
		url_lc = EMR_QGLC_UPDATE_URL;
	}
		temp.endTime = new Date();
		temp.ssfs1 = $("#sel_lev1").val();
		temp.ssfs2 = $("#sel_lev2").val();
		temp.ssfs3 = $("#sel_lev3").val();
			//提交
			$.ajax({
				url : contextPath + url_lc,
				data : temp,
				type : "POST",
				dataType : 'json',
				success : function(data) {
					qulc_set();//流程id 保存在页面
					pageJump();	
				}
			});
}
//重置 病历
function reset_bl(){
	_emr_show_bl();
}
//重置 病历
function reset_ck(){
	$("#lc_id").text("无");
	$("#lc_name").text("病历");
	$("#sel_lev1").val("--请选择--");
	$("#fenlei2").html("");
	$("#fenlei3").html("");
	$("input[type='text']").val("");
	$("textarea").val("");
}
//流程完成
function lcwc(){
	var lc_id = $("#lc_id").text()==''?null:$("#lc_id").text();
	var lc_name = $("#lc_name").text();
	if(lc_id==null || lc_id=='' || lc_id=='无'){
		$.oimsAlert('因为您还没有发起流程，所以无法结束流程！');
	}else if(lc_name==null || lc_name==''){
		$.oimsAlert('因为您还没有发起流程，所以无法结束流程！');
		$("#lc_id").text("无");
		$("#lc_name").text("无");
		$("#sel_lev1").val("--请选择--");
		$("#fenlei2").html("");
		$("#fenlei3").html("");
	}else{
		var temp =  getJSONData("/publish/quguang/getQglcById.htm?id="+lc_id,{},"GET").obj;
		temp.startTime=new Date(temp.startTime.time);
		temp.endTime=new Date();
		temp.state=5;
		//提交
		$.ajax({
			url : contextPath + EMR_QGLC_UPDATE_URL,
			data : temp,
			type : "POST",
			dataType : 'json',
			success : function(data) {
				if(data.state==1){
					$("#lc_name").text("完成");
					/*$("#lc_id").text("无");
					$("#lc_name").text("病历");
					$("#sel_lev1").val("--请选择--");
					$("#fenlei2").html("");
					$("#fenlei3").html("");
					$("#div_show_4_2_1 ").children(".tab_show").removeClass("tab_show").addClass("tab_hide");
					$("#div_show_4_2_1 ").children("div:eq(5)").addClass("tab_show");
					eval('_emr_show_jwbl()');
*/					/*$("#div_show_4_2_2").html("<div style='width:300px;height:100px;margin:auto;margin-top:200px;text-align:center;'><label style='font-size:35px;color:blue;'>流程已完成！</label></div>");
					$("#lc_id").text("无");
					$("#lc_name").text("病历");
					$("#sel_lev1").val("--请选择--");
					$("#fenlei2").html("");
					$("#fenlei3").html("");
					$("#div_show_4_2_1 ").children(".tab_show").removeClass("tab_show").addClass("tab_hide");*/
				}else{
					$.oimsAlert('操作失败！');
				}
			}
		});
	}
}
//开始流程
function lcwc1(){
	$("#lc_id").text("无");
	$("#lc_name").text("病历");
	$("#sel_lev1").val("--请选择--");
	$("#qg_jcf").val("");
	$("#jcf_rq").val("");
	$("#ssfy").val("");
	$("#ssf_rq").val("");
	$("#fenlei2").html("");
	$("#fenlei3").html("");
	$("#div_show_4_2_1 ").children(".tab_show").removeClass("tab_show").addClass("tab_hide");
	$("#div_show_4_2_1 ").children("div:eq(0)").addClass("tab_show");
	eval('_emr_show_bl()');
}
//页面跳转
function pageJump(){
	var lc_name = $("#lc_name").text();
	var tag_id = "";
	var tag_intr = "";
	if(lc_name=="病历"){
		tag_id = 30021;
		tag_intr = "_emr_show_bl";
		$("#div_show_4_2_1 ").children(".tab_show").removeClass("tab_show").addClass("tab_hide");
		$("#"+tag_id).addClass("tab_show");
		eval('('+tag_intr+'('+tag_id+'))');
	}else if(lc_name=="同意书"){
//		tag_id = 30022;
//		tag_intr = "_emr_show_tys";
//		$("#div_show_4_2_1 ").children(".tab_show").removeClass("tab_show").addClass("tab_hide");
//		$("#"+tag_id).addClass("tab_show");
//		eval('('+tag_intr+'('+tag_id+'))');
	}else if(lc_name=="预约"){
		tag_id = 30023;
		tag_intr = "_emr_show_yy";
		$("#div_show_4_2_1 ").children(".tab_show").removeClass("tab_show").addClass("tab_hide");
		$("#"+tag_id).addClass("tab_show");
		eval('('+tag_intr+'('+tag_id+'))');
	}
		
		
}
//流程id
function qulc_set(){
	var blh = $("#patientInfo").children("span").first().text();
	var data = getJSONData("/publish/quguang/findQglcByBlhWwc.htm?blh="+blh,{},"POST");
	var lc_name = "";
	if(data!=null){
		$("#lc_id").text(data.id);	
		lc_name = qglc_data[data.state];
	}else{
		$("#lc_id").text("无");
		lc_name = qglc_data[0]; 
	}
	$("#lc_name").text(lc_name);
	//当前页签
	var sel_tag = $("#div_show_4_2_1 ").children(".tab_show").children("span").text();
	//btn_ctrl();
	if(sel_tag=="病历"){
		ssfs_set(data);//手术方式赋值	
	}
}
//提交按钮控制
function btn_ctrl(){
	var sel_tag = $("#div_show_4_2_1 ").children(".tab_show").children("span").text();
	var lc_name = $("#lc_name").text();
	var lc_id = $("#lc_id").text();
	if(sel_tag=="病历"){
		if(lc_name!="病历" && lc_name!="同意书" && lc_name!="预约" && lc_name!="手术记录"){
			btn_ctrl_wucha();
		}
	}else if(sel_tag=="预约"){
		if(lc_name!="预约" && lc_name!="手术记录" && lc_name!="同意书"){
			btn_ctrl_wucha();	
		}
	}else if(sel_tag=="手术记录"){
		if(lc_name!="手术记录" && lc_name!="术后复查"){
			var temp =  getJSONData("/publish/quguang/getQglcById.htm?id="+lc_id,{},"GET");
			var nowTimeStr = dateToStr(null);
			var endTimeStr =''; 
			if(temp!=null){
				temp = temp.obj;
				endTimeStr = dateToStr(temp.endTime);
			}
			if(endTimeStr!=nowTimeStr){
				btn_ctrl_wucha();	
			}
		}
	}else if(sel_tag=="术后复查"){
		if(lc_name!="完成"){
			btn_ctrl_wucha();	
		}
	}
}
//无差别控制按钮
function btn_ctrl_wucha(){
	var lc_name = $("#lc_name").text();
	var sel_tag = $("#div_show_4_2_1 ").children(".tab_show").children("span").text();
	if(lc_name!=sel_tag){
		$(":button[value='提交']").attr("disabled",true);
	}else{
		$(":button[value='提交']").removeAttr("disabled");
	}
	if(sel_tag=="病历" && (lc_name=='' || lc_name==null)){
		$(":button[value='提交']").removeAttr("disabled");
	}
}
var qglc_data=["病历","同意书","预约","手术记录","术后复查"];

function btn_update_ctrl(){
	var lc_name = $("#lc_name").text();
	var sel_tag = $("#div_show_4_2_1 ").children(".tab_show").children("span").text();
	//if(sel_tag=="病历" && lc_name!="病历" && lc_name!="完成"){
	if($("#lc_id").text()=='无'){
		$(":button[value='修改']").attr("disabled",true);
	}else{
		$(":button[value='修改']").removeAttr("disabled");
	}
}
//保存手术方式
function saveSsfs(){
	var lc_id = $("#lc_id").text();
	if(lc_id=='无' || lc_id=='' || lc_id==null){
		$.oimsAlert("请先保存病历（发起流程）,然后才可以修改手术方式！");
	}else{
		var lcObj =  getJSONData("/publish/quguang/getQglcById.htm?id="+lc_id,{},"GET").obj;
		var lev1 = $("#sel_lev1").val();
		var lev2 = $("#sel_lev2").val();
		var lev3 = $("#sel_lev3").val();
		lcObj.ssfs1 = lev1;
		lcObj.ssfs2 = lev2;
		lcObj.ssfs3 = lev3;
		if(lcObj.startTime==null){
			lcObj.startTime = new Date();
		}else{
			lcObj.startTime = new Date(lcObj.startTime.time);	
		}
		if(lcObj.endTime==null){
			lcObj.endTime = new Date();
		}else{
			lcObj.endTime = new Date(lcObj.endTime.time);
		}
		//提交
		$.ajax({
			url : contextPath + EMR_QGLC_UPDATE_URL,
			data : lcObj,
			type : "POST",
			dataType : 'json',
			success : function(data) {
				if(data.state==1){
					setAutoValues();
					var sel_tag = $("#div_show_4_2_1").children(".tab_show").children("span").text();
					if(sel_tag=='手术记录'){
						_emr_show_ssjl();
					}
					$.oimsSucc('操作成功！');
				}else{
					$.oimsAlert('操作失败！');
				}
			}
		});
	}
	
}
//给手术方式赋值
function ssfs_set(data){
	var lc_id = $("#lc_id").text();
	if(lc_id=='无' || lc_id=='' || lc_id==null){

	}else{
		if(data!=null){
			$("#sel_lev1").val(data.ssfs1);
			fenlei_lev2();
			if(data.ssfs2!=null && data.ssfs2!=''){
				$("#sel_lev2").val(data.ssfs2);
				fenlei_lev3();	
			}else{
				$("#fenlei2").html("");
				$("#fenlei3").html("");
			}
			if(data.ssfs3!=null && data.ssfs3!=''){
				$("#sel_lev3").val(data.ssfs3);	
			}else{
				$("#fenlei3").html("");
			}
		}
	}
}
//最近的病例
function getLastOneQgbl(fl){
	//病例号
	var blh = $("#patientInfo").children("span").first().text();
	var url = "";
	if(fl=="准分子"){
		url = "/publish/quguang/getQgblLastOne.htm";
	}else if(fl=="晶体植入"){
		url = "/publish/quguang/getQgblLastOne.htm";
	}else if(fl=="儿童屈光"){
		url = "/publish/quguang/getQgblErLastOne.htm";
	}

	//var data = getJSONData(url,{blh:blh},"POST").obj;
	url+="?blh="+blh;
	var data = getJSONData(url,{},"POST").obj;
	var bl_id = null;
	if(data!=null){
		bl_id = data.id;
	}
	return bl_id;
}
//签字
function qgqz(){
	$("input[type='text']").change( function() {
		var yg = getUser();
		$(this).parent().parent().children("td:last").children("label:first").text(yg.xingming);
		$(this).parent().parent().children("td:last").children("label:last").text(yg.gonghao);
	});
	$("input[type='checkbox']").change( function() {
		var yg = getUser();
		$(this).parent().parent().children("td:last").children("label:first").text(yg.xingming);
		$(this).parent().parent().children("td:last").children("label:last").text(yg.gonghao);
	});
	$("textarea").change( function() {
		var yg = getUser();
		$(this).parent().parent().children("td:last").children("label:first").text(yg.xingming);
		$(this).parent().parent().children("td:last").children("label:last").text(yg.gonghao);
	});
	$("#qgzs").blur(function(){
			var yg = getUser();
			$("#wz_qz").text(yg.xingming);
			$("#wz_qz_gh").text(yg.gonghao);	
	});    
	$("#qgjws").blur(function(){
			var yg = getUser();
			$("#wz_qz").text(yg.xingming);
			$("#wz_qz_gh").text(yg.gonghao);
	});
	$("#ywgms").blur(function(){
			var yg = getUser();
			$("#wz_qz").text(yg.xingming);
			$("#wz_qz_gh").text(yg.gonghao);	
	});
	$("#jtjss").blur(function(){
			var yg = getUser();
			$("#wz_qz").text(yg.xingming);
			$("#wz_qz_gh").text(yg.gonghao);	
	});
} 
function qgqz_shjl(){
	$("input[type='text']").change( function() {
		var yg = getUser();
		$("#qm").text(yg.xingming);
		$("#qm_gh").text(yg.gonghao);	
	});
	$("textarea").change( function() {
		var yg = getUser();
		$("#qm").text(yg.xingming);
		$("#qm_gh").text(yg.gonghao);	
	});
} 
function qgqz_yy(){
	
	$("input[type='text']").change(function(){
		var yg = getUser();
		$("#yy_qz").val(yg.xingming);
		$("#yy_qz_gh").val(yg.gonghao);
	});
	$("input[type='checkbox']").change( function() {
		var yg = getUser();
		$("#yy_qz").val(yg.xingming);
		$("#yy_qz_gh").val(yg.gonghao);
	});
	$("input[type='radio']").change( function() {
		var yg = getUser();
		$("#yy_qz").val(yg.xingming);
		$("#yy_qz_gh").val(yg.gonghao);
	});
	$("select").change( function() {
		console.log("==========用户change=========")
		var yg = getUser();
		$("#yy_qz").val(yg.xingming);
		$("#yy_qz_gh").val(yg.gonghao);
	});
}
function qgqz_jt_ssjl(){
	$("input[type='text']").change( function() {
		var yg = getUser();
		$(this).parent().parent().parent().children("tr:last").children("td:last").children("label").text(yg.xingming);
	});
	$("input[type='checkbox']").change( function() {
		var yg = getUser();
		$(this).parent().parent().parent().children("tr:last").children("td:last").children("label").text(yg.xingming);
	});
	$("input[type='radio']").change( function() {
		var yg = getUser();
		$(this).parent().parent().parent().children("tr:last").children("td:last").children("label").text(yg.xingming);
	});
	$("textarea").change( function() {
		var yg = getUser();
		$(this).parent().parent().parent().children("tr:last").children("td:last").children("label").text(yg.xingming);
	});
}
//赋值
function setValue_qg(){
	var sel_tag = $("#div_show_4_2_1").children(".tab_show").children("span").text();
	var lc_id = $("#lc_id").text();
	var ssfs = $("#sel_lev1").val();
	var url = "";
	if(ssfs!="--请选择--"){
		if(sel_tag=="病历"){
			if(ssfs=="准分子" || ssfs=="晶体植入"){
				if($("#lc_id").text()!="无"){
					url=BL_ZFZ;	
				}else{
					set_qgbl_clyj();
					setAutoValues();
				}
				
			}else if(ssfs=="儿童屈光"){
				if($("#lc_id").text()!="无"){
					url=BL_ER;
				}else{
					set_qgblEr_clyj();
					setAutoValues();
				}
			}
		}else if(sel_tag=="预约"){
			url=YY;
		}else if(sel_tag=="手术记录"){
			if(ssfs=="准分子"){
				url=SSJL_ZFZ;
			}else if(ssfs=="晶体植入"){
				url=SSJL_JT;
			}else if(ssfs=="儿童屈光"){
				url=SSJL_ER;
			}
		}else if(sel_tag=="术后复查"){
			if(ssfs=="准分子"){
				url=SHJL_ZFZ;
				var blh = $("#patientInfo").children("span").first().text();
				shjl_set_jbxx(blh);
			}else if(ssfs=="晶体植入"){
				url=SHFC_JT;
			}else if(ssfs=="儿童屈光"){
				url=SHFC_ER;
			}
		}
		if(url!="" && lc_id!=null && lc_id!='无'){
			var data = getJSONData(url,{lc_id:lc_id},"POST").obj;	
			if(data!=null){
				if(sel_tag=="病历"){
					if(ssfs=="准分子" || ssfs=="晶体植入"){
						reloadBl();
						bl_update_set(data);
						qgqz();
						calendarFun_yy("cli_date");
					}else if(ssfs=="儿童屈光"){
						reloadBlEr();
						blEr_update_set(data);
						qgqz();
						calendarFun_yy("cli_date");
						calendarFun_yy("czrq");
						
						
					}
				}else if(sel_tag=="预约"){
					tbl_yy_add();
					yy_update_set(data);
					qgqz_yy();
				}else if(sel_tag=="手术记录"){
					if(ssfs=="准分子"){
						reset_ssjl_div_top();
						ssfs_update_set(data);
						var lcObj =  getJSONData("/publish/quguang/getQglcById.htm?id="+lc_id,{},"GET").obj;
						var ssxm = lcObj.ssfs1+">"+lcObj.ssfs2+">"+lcObj.ssfs3;
						$("#ssfs_l").text(ssxm);
						$("#ssfs_r").text(ssxm);
						//qgqz();
					}else if(ssfs=="晶体植入"){
						reset_ssjl_jt_top();
						jtss_update_set(data);
						qgqz_jt_ssjl();
						
					}else if(ssfs=="儿童屈光"){
						reset_ssjl_er_top();
						er_ssjl_update_set(data);
						qgqz();
					}
				}else if(sel_tag=="术后复查"){
					if(ssfs=="准分子"){
						reset_shjl_div_top();
						shjl_update_set(data);
						qgqz();
					}else if(ssfs=="晶体植入"){
						reset_shfc_top();
						shfc_set(data);
						qgqz();
					}else if(ssfs=="儿童屈光"){
						reset_shfc_top_er();
						shfc_er_set(data);
						qgqz();
					}
			}
				//btn_ctrl();
		}else{
			
			if(sel_tag=="预约"){
				qgqz_yy();
			}else{
				setAutoValues();	
			}
		}
	
	}
	
}
}
//去掉边框
function removeBorder(){
	$("#div_show_4_2_2").find("input[type='text']").attr("style","border:0px;");
	$("#div_show_4_2_2").find("textarea").attr("style","border:0px;");
}
//没有选择手术方式不允许写
function spts(){
	var lc_name = $("#lc_name").text();
	$("#div_show_4_2_2").children("div:first").bind("click",function(){
//		if($("#sel_lev1").val()=="--请选择--"){
//			$.oimsAlert("请选择手术方式！");
//		}
		if($("#sel_lev1").val()=="--请选择--"){
			$("#sel_lev1").val("准分子");
			fenlei_lev2();
		}
		
//		if(lc_name=="完成"){
//			$.oimsAlert("流程已完成，不能修改！如果您需要填写新的病历，请点击右上角的“下次就诊”按钮！");
//		}
	});
}


/******************************************** 其他方法************************************************/
//患者信息表
function getHuanzhexinxi(blh){
	var data = getJSONData(EMR_HUANZHEXINXI_URL,{binglihao:blh},"POST").obj;
	return data;							 
}
//就诊表
function getJiuzhen_qg(blh,th){
	//id,caozuoTime,state,fzys,hzid,doctor,bumen
	var data_hzxx = getHuanzhexinxi(blh);
	var jz = null;
	if(data_hzxx!=null){
		var hz_id = data_hzxx.id;
		var data = getJSONData(EMR_JIUZHEN_URL+"?id="+hz_id,null).obj;
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
function getJbxx_qg(blh){
	var jz_first = getJiuzhen_qg(blh,"first");
	var jz_last = getJiuzhen_qg(blh,"last");
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
	var jzrq = "";
	var address = "";
	var dianhua = "";
	var jz_id = "";
	var jz_hzlxr = "";
	var czrq = "";
	if(data!=null){
		id = data.id;
		blh = data.binglihao;
		blbh = data.binglihao;
		qq = data.qq;
		name = data.xingming;
		if(data.xingbie!=null){
			sex = data.xingbie?'男':'女';
		}
		if(data.shengri!=null && data.shengri!=""){
			bir = dateToStr(data.shengri);
			age = getAgeByBrithday(data.shengri);
		}
		if(data.gzdw!=null){
			 gzdw = data.job;
		}
		
		if(jz_first!=null){
			if(jz_first.caozuoTime!=null){
				czrq = dateToStr(jz_first.caozuoTime);	
			}
			jz_id = jz_first.id;
			jz_hzlxr = jz_first.hzlxr;
		}
		if(jz_last!=null){
			jzrq = dateToStr(jz_last.caozuoTime);
		}
		
		if(data.diqu!=null){
			address = data.jtdz;
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
	}
	var jbxx = {
			id:id,
			blh:blh,
			blbh:blbh,
			qq:qq,
			name:name,
			sex:sex,
			birthday:bir,
			age:age,
			gzdw:gzdw,
			jzrq:jzrq,
			address:address,
			dianhua:dianhua,
			jz_id:jz_id,
			hzlxr:jz_hzlxr,
			czrq:czrq,
			jz:jz_last
	};
	return jbxx;
}

//日期转成字符串
function dateToStr(dateObj){
	var dateStr = "";
	if(dateObj==undefined || dateObj==null){
		var newDate = new Date();
		dateStr = newDate.getFullYear()+'-'+(newDate.getMonth()+1<10?('0'+(newDate.getMonth()+1)):(newDate.getMonth()+1))+"-"+(newDate.getDate()<10?('0'+newDate.getDate()):newDate.getDate());
	}else{
		var newDate = new Date(dateObj.time);
		dateStr = newDate.getFullYear()+'-'+(newDate.getMonth()+1<10?('0'+(newDate.getMonth()+1)):(newDate.getMonth()+1))+"-"+(newDate.getDate()<10?('0'+newDate.getDate()):newDate.getDate());		
	}
	return dateStr;
}
function dateToStr_sj(dateObj){
	var newDate = new Date(dateObj.time);
	dateStr = newDate.getFullYear()+'-'+(newDate.getMonth()+1<10?('0'+(newDate.getMonth()+1)):(newDate.getMonth()+1))+"-"
	+(newDate.getDate()<10?('0'+newDate.getDate()):newDate.getDate())+" "+(newDate.getHours()<10?('0'+newDate.getHours()):newDate.getHours())+":"+(newDate.getMinutes()<10?('0'+newDate.getMinutes()):newDate.getMinutes())+":"+(newDate.getSeconds()<10?('0'+newDate.getSeconds()):newDate.getSeconds());		
	return dateStr;
}
//生日计算年龄
function getAgeByBrithday(dateObj){
	var birDate = new Date(dateObj.time);
	var bir_year = birDate.getFullYear();
	var nowDate = new Date();
	var now_year = nowDate.getFullYear();
	var age = now_year-bir_year;
	return age;
}
//悬浮层
function openFloatDiv(id){
	if($("#floatDiv").attr("id")==undefined){
		var obj = $("#"+id); 
		var offset = obj.offset();
		var leftPosition = offset.left;
		var topPosition = offset.top+obj.height();
		var widthDiv = obj.width();
		var fatherDiv = $("#div_show_4_2_2");
		var floatDiv = $("<div/>").attr("id","floatDiv").appendTo(fatherDiv);
		var tab="";
		if(id=="zs_l" || id=="zs_r"){
			$("#floatDiv").attr("style","width:"+(widthDiv-2)+"px;height:200px;z-index:9999;position:absolute;top:"+topPosition+"px;left:"+leftPosition+"px;border:1px solid #d2d2d2;overflow:auto;background:white;");
			tab = floatDivChild1();
			$(floatDiv).append(tab);
		}else if(id=="qjjc_r" || id=="qjjc_l" || id=="lxd_r" || id=="lxd_l"){
			$("#floatDiv").attr("style","width:"+(widthDiv-2)+"px;height:200px;z-index:9999;position:absolute;top:"+topPosition+"px;left:"+leftPosition+"px;border:1px solid #d2d2d2;overflow:auto;background:white;");
			tab = floatDivChild2();
			$(floatDiv).append(tab);
		}else if(id=="ydjc_r" || id=="ydjc_l"){
			$("#floatDiv").attr("style","width:"+(widthDiv-2)+"px;height:200px;z-index:9999;position:absolute;top:"+(offset.top-195)+"px;left:"+leftPosition+"px;border:1px solid #d2d2d2;overflow:auto;background:white;");
			tab = floatDivChild3();
			$(floatDiv).append(tab);
		}else if(id=="ssys_l" || id=="ssys_r" || id=="zdys" || id=="zsys" || id=="hs" || id=="ptjs_r" || id=="ptjs_l" || id=="pths_r" || id=="pths_l"|| id=="zdys_r" || id=="zsys_r" || id=="hs_r" ){
			$("#floatDiv").attr("style","width:"+(widthDiv-2)+"px;height:200px;z-index:9999;position:absolute;top:"+topPosition+"px;left:"+leftPosition+"px;border:1px solid #d2d2d2;overflow:auto;background:white;");
			//tab = floatDivChild4();
			tab = floatDivChild_yg(id);
			$(floatDiv).append(tab);
		}else if(id=="yy_qz"){
			$("#floatDiv").attr("style","width:"+(widthDiv-2)+"px;height:200px;z-index:9999;position:absolute;top:"+(offset.top-200)+"px;left:"+leftPosition+"px;border:1px solid #d2d2d2;overflow:auto;background:white;");
			tab = floatDivChild_yg();
			$(floatDiv).append(tab);
		}else if(id=="clyj" || id=="clyj_r" || id=="cl_l"){
			$("#floatDiv").attr("style","width:"+(widthDiv-2)+"px;height:200px;z-index:9999;position:absolute;top:"+topPosition+"px;left:"+leftPosition+"px;border:1px solid #d2d2d2;overflow:auto;background:white;");
			tab = floatDivChild4();
			$(floatDiv).append(tab);
		}
		
	}
	var floatLi = $("#floatDiv").find("li");
	$(floatLi).mouseover(function(){
		$(this).attr("style","background:#cfc5b2;");
	});
	$(floatLi).mouseout(function(){
		$(this).attr("style","background:;");
	});
	$(floatLi).click(function(){
		if(id=="ssys_l" || id=="ssys_r" || id=="zdys" || id=="zsys" || id=="hs" || id=="ptjs_r" || id=="ptjs_l" || id=="pths_r" || id=="pths_l" || id=="yy_qz"){
			var showVal = '';
			var val_gh = '';
			var fullVal = $(this).text();
			if(fullVal!=''){
				//如果选择右眼的时候左眼的跟着改变
				if(id=="ssys_r"||id=="ptjs_r"||id=="pths_r"){
					var vals = fullVal.split("/");
					showVal = vals[0];
					val_gh = vals[1];
					$("#"+id).val(showVal);
					$("#"+id+"_gh").val(val_gh);
					//同时左眼也要变
					var ids=id.split("_");
					$("#"+ids[0]+"_l").val(showVal);
					$("#"+ids[0]+"_l"+"_gh").val(val_gh);
				}else{
					var vals = fullVal.split("/");
					showVal = vals[0];
					val_gh = vals[1];
					$("#"+id).val(showVal);
					$("#"+id+"_gh").val(val_gh);
				}
			}
		}else{
			var beforeVal = $("#"+id).val();
			var showVal = "";
			if(beforeVal==""){
				showVal = $(this).text();
			}else{
				showVal = beforeVal+"，"+$(this).text();
			}
			$("#"+id).val(showVal);
		}
		closeFloatDiv();
		$("#"+id).focus();
		//签名
		if(id=="zs_l" || id=="zs_r"){
			var yg = getUser();
			$("#zs_qz").text(yg.xingming);
			$("#zs_qz_gh").text(yg.gonghao);
		}else if(id=="qjjc_r" || id=="qjjc_l" || id=="lxd_r" || id=="lxd_l"){
			var yg = getUser();
			$("#"+id).parent().parent().children("td:last").children("label:first").text(yg.xingming);
			$("#"+id).parent().parent().children("td:last").children("label:last").text(yg.gonghao);
		}else if(id=="ydjc_r" || id=="ydjc_l"){
			var yg = getUser();
			$("#"+id).parent().parent().children("td:last").children("label:first").text(yg.xingming);
			$("#"+id).parent().parent().children("td:last").children("label:last").text(yg.gonghao);
		}
	});
}
function closeFloatDiv(){
	$("#floatDiv").remove();
}
function getAutoValuesHeight_qg(count){
	var h = count*20+40;
	return h;
}
//术后复查-主述
function floatDivChild1(){
	var cont = findQgSgConf("qg_shfc_zs");//员工补充
	var tab = "<div style='width:100%;height:20px;margin-top:0px;background:#d2d2d2;text-align:center;cursor:pointer;' onclick='closeFloatDiv();'>关闭</div>"+
			"<div style='width:100%;height:180px;line-height:18px;'>" +
				"<ul>";
				tab+=cont.resStr;
//					"<li>无特殊性异常 </li>" +
//					"<li>眩光 </li>" +
//					"<li>夜间视力差 </li>" +
//					"<li>干涩、疲劳、不适 </li>" +
//					"<li>视力下降、视力波动 </li>" +
				tab+="</ul>" +
			"<div>";
	return tab;
}
//准分子病历-前节检查
function floatDivChild2(){
	var cont = findQgSgConf("qg_qjjc");//员工补充
	var tab = "<div style='width:100%;height:20px;margin-top:0px;background:#d2d2d2;text-align:center;cursor:pointer;' onclick='closeFloatDiv();'>关闭</div>" +
			"<div style='width:100%;height:180px;line-height:18px;'>" +
				"<ul>";
//					"<li>角膜光滑透明、前房（阴性）</li>" +
//					"<li>角膜透明，表皮完整，基质未见浸润；前房轴深4CT，Tyn（-），虹膜纹理清，未见前后粘连，瞳孔正圆，直径约3mm，直接间接对光反应灵敏，晶体透明。</li>"+
		tab+=cont.resStr;
		tab+="</ul>" +
			"<div>"
			;
	return tab;
}
//准分子病历-眼底检查
function floatDivChild3(){
	var cont = findQgSgConf("qg_ydjc");//员工补充
	var tab = "<div style='width:100%;height:20px;margin-top:0px;background:#d2d2d2;text-align:center;cursor:pointer;' onclick='closeFloatDiv();'>关闭</div>" +
			"<div style='width:100%;height:180px;line-height:18px;'>" +
				"<ul>";
//					"<li>双眼视乳头界清色淡红，C/D=0.2，黄斑中心凹反光可见，周边网膜平伏，未见出血或渗出，未见裂孔或变性区</li>" +
//					"<li>双眼视乳头界清色淡红</li>" +
//					"<li>C/D=0.</li>" +
//					"<li>黄斑中心凹反光可见</li>" +
//					"<li>周边网膜平伏</li>" +
//					"<li>未见出血或渗出</li>" +
//					"<li>未见裂孔或变性区</li>" +
			tab+=cont.resStr;
			tab+="</ul>" +
			"<div>"
			;
	return tab;
}
//处理意见
function floatDivChild4(){
	var cont = findQgSgConf("qg_clyj");//员工补充
	var tab = "<div style='width:100%;height:20px;margin-top:0px;background:#d2d2d2;text-align:center;cursor:pointer;' onclick='closeFloatDiv();'>关闭</div>" +
			"<div style='width:100%;height:180px;line-height:18px;'>" +
				"<ul>";
//					"<li>双眼视乳头界清色淡红，C/D=0.2，黄斑中心凹反光可见，周边网膜平伏，未见出血或渗出，未见裂孔或变性区</li>" +
//					"<li>双眼视乳头界清色淡红</li>" +
//					"<li>C/D=0.</li>" +
//					"<li>黄斑中心凹反光可见</li>" +
//					"<li>周边网膜平伏</li>" +
//					"<li>未见出血或渗出</li>" +
//					"<li>未见裂孔或变性区</li>" +
			tab+=cont.resStr;
			tab+="</ul>" +
			"<div>"
			;
	return tab;
}
//获取展示区的高度
function getShowHeight_qg(){
	var visitRecordHeight = $("#visitRecord").height();//543
	var tabTitleHeight = $("#tabTitle").height();
	var tabContentHeight = visitRecordHeight-tabTitleHeight-28;
	return tabContentHeight;
}
//修改患者信息（地址、电话、职业）
function updateHzxx(tag){
	var blh = $("#patientInfo").children("span").first().text();
	var hzxx = getHuanzhexinxi(blh);
	var valu = '';
	if(blh!='' && hzxx!=null){
		var id = hzxx.id;
		var jtdz = $("#address").val();
		var shouji = $("#cellphone").val();
		if(tag==1){//准分子
			var job = $("#job").val();
			var qq = $("#qqNumber").val();
			var data = getJSONData('/publish/huanZheXinXi/updateHzxx_zfz.htm',{id:id,jtdz:jtdz,shouji:shouji,job:job,qq:qq},'POST').obj;
		}else if(tag==2){//儿童
			var data = getJSONData('/publish/huanZheXinXi/updateHzxx_er.htm',{id:id,jtdz:jtdz,shouji:shouji},'POST').obj;
		}
		
		
	}
}
//屈光员工
function findQgYgList(){
	var data = getJSONData('/publish/quguang/findYuanGongList.htm',{},'POST');
	if(data!=null){
		return data.obj;
	}else{
		return null;
	}
}
//悬浮层
function openFloatDiv1(id,id_gh){
	if($("#floatDiv").attr("id")==undefined){
		var obj = $("#"+id); 
		var offset = obj.offset();
		var leftPosition = offset.left;
		var topPosition = offset.top+obj.height();
		var widthDiv = obj.width();
		var fatherDiv = $("#div_show_4_2_2");
		var floatDiv = $("<div/>").attr("id","floatDiv").appendTo(fatherDiv);
		var tab="";
		var divHeight = getYgHeight()+45;
		$("#floatDiv").attr("style","width:"+(widthDiv+50)+"px;height:"+divHeight+"px;z-index:9999;position:absolute;top:"+topPosition+"px;left:"+leftPosition+"px;border:1px solid #d2d2d2;overflow:auto;background:white;");
		tab = floatDivChild_yg();
		$(floatDiv).append(tab);
	}
	var floatLi = $("#floatDiv").find("li");
	$(floatLi).mouseover(function(){
		$(this).attr("style","background:#cfc5b2;");
	});
	$(floatLi).mouseout(function(){
		$(this).attr("style","background:;");
	});
	$(floatLi).click(function(){
		var showVal = $(this).text();
		var ygs = showVal.split("/");
		var xingming = ygs[0];
		var gonghao = ygs[1];
		$("#"+id).text(xingming);
		$("#"+id_gh).text(gonghao);
		closeFloatDiv1();
		$("#"+id).focus();
	});
}
function getYgHeight(bcsl){
	var ygList = findQgYgList();
	var count = 0;
	if(ygList!=null){
		count = ygList.length+bcsl;
	}
	var divHeight = 20*count+40;
	return divHeight;
}
function floatDivChild_yg(id){
	if(!id){
		var ygList = findQgYgList();
		var ygBc = findQgSgConf("qg_user");//员工补充
		var divHeight = getYgHeight(ygBc.resCount);
		var tab = "<div style='width:100%;height:20px;margin-top:0px;background:#d2d2d2;text-align:center;cursor:pointer;' onclick='closeFloatDiv1();'>关闭</div>" +
				"<div style='width:100%;height:180px;line-height:18px;'>" +
					"<ul><li>&nbsp;</li>";
						$.each(ygList,function(i,item){
							var aa = "<li>"+item.xingming+"/"+item.gonghao+"</li>";
							tab = tab+aa;	
						});
			 tab += ygBc.resStr;
			 tab += "</ul>" +
				"<div>"
				;
		return tab;	
	}else{
		var ary={};
		var ygList = findQgYgList();
		$.each(ygList,function(i,n){
			ary[n.gonghao]=n.xingming;
		});
		ygBc = getJSONData('/publish/quguang/findQgSgConf.htm',{tag:'qg_user'},'POST').obj;
		if(ygBc){
			$.each(ygBc,function(i,n){
				var strs=n.cont.split("/");
				ary[strs[1]]=strs[0];
			});
		}
		var tab = "<div style='width:100%;height:20px;margin-top:0px;background:#d2d2d2;text-align:center;cursor:pointer;' onclick='closeFloatDiv1();'>关闭</div>" +"<div style='width:100%;height:180px;line-height:18px;'>" +"<ul><li>&nbsp;</li>";
		if(id=='ssys_l'||id=='ssys_r'){
			$.each(qg_doctor_priority,function(i,n){
				tab+="<li>"+n+"/"+i+"</li>";
			});
			$.each(ary,function(i,n){
				if(qg_doctor_priority[i]){
					return true;
				}
				tab+="<li>"+n+"/"+i+"</li>";
			});
		}
		if(id=='ptjs_l'||id=='ptjs_r'){
			$.each(qg_engineer_priority,function(i,n){
				tab+="<li>"+n+"/"+i+"</li>";
			});
			$.each(ary,function(i,n){
				if(qg_engineer_priority[i]){
					return true;
				}
				tab+="<li>"+n+"/"+i+"</li>";
			});
		}
		if(id=='pths_l'||id=='pths_r'){
			$.each(qg_nurse_priority,function(i,n){
				tab+="<li>"+n+"/"+i+"</li>";
			});
			$.each(ary,function(i,n){
				if(qg_nurse_priority[i]){
					return true;
				}
				tab+="<li>"+n+"/"+i+"</li>";
			});
		}
		 tab += "</ul></div>" ;
		return tab;	
	}
	
}

function closeFloatDiv1(){
	$("#floatDiv").remove();
}
//读配置表
function findQgSgConf(tag){
	var resStr = '';
	var resCount = 0;
	var data = getJSONData('/publish/quguang/findQgSgConf.htm',{tag:tag},'POST');
	if(data!=null){
		var dataList = data.obj;
		resCount = dataList.length;
			$.each(dataList,function(i,item){
				 resStr += "<li>"+item.cont+"</li>";
			});
	}
	var temp = {};
	temp.resStr = resStr;
	temp.resCount = resCount;
	return temp;
}

