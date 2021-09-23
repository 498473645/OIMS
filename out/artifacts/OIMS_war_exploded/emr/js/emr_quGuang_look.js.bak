/**
 * 屈光病历查看 入口
 */
function qg_look_entry(){
	importJS("/js/commonLanguage.js");
	importJS("/js/jquery.createPageList.js");
	importJS("/emr/js/emr_quGuang.js");
	importJS("/emr/js/emr_quGuang_getValues.js");
	$("#right").html("");
	pageTitle = "屈光病历查看";
	init();
	//搜索栏
	var search_tab = qg_look_query();
	$("<div/>").attr("id", "advquery").addClass("advquery").appendTo("#right");
	$(search_tab).appendTo("#advquery");
	$("#search_binglihao_xingming").click(function() {
		clearInitQuery(this);
	});
	$("#search_binglihao_xingming").blur(function() {
		if (this.value == "") {
			$("#search_binglihao_xingming").val("请输入病历号或患者姓名");
			$("#search_binglihao_xingming").addClass("blurview");
		}
	});
	$("#search_binglihao_xingming").bind("keyup", function(e) {
		if (e.which == 13) {
			seniorSearchSubmit_qg_luke();
		}
	});
//	$("#high_search_btn").toggle(
//			function(){
//				$("#high_search").show();
//			},
//			function(){
//				$("#high_search").hide();
//			}
//	);
	//列表
	qgbl_look();
}
//查看验证
function qg_look(){
	var blh = "";
	var id = "";
	var lc_id = "";
	var ssfs1 = "";
	var tag = $("input[name='changeSearch']:checked").attr("id");
	var objs = $("#pageList").find("input[type='checkbox']:checked");
	if(objs.length>1){
		$.oimsAlert("只能选择一条数据查看！");
	}else if(objs.length<1){
		$.oimsAlert("您还没有选择要查看的数据！");
	}else{
		var obj = objs.val();
		var os = obj.split(",");
		for(var i=0;i<os.length;i++){
			var o = os[i];
			var values = o.split(":");
			if(values.length==2 && values[0]=="'lc_id'"){
				lc_id=values[1];
			}
			if(values.length==2 && values[0]=="'ssfs1'"){
				ssfs1 = values[1];
			}
			if(values.length==2 && values[0]=="'id'"){
				id = values[1];
			}
			if(values.length==2 && values[0]=="'blh'"){
				var str = values[1];
				if(str!=null){
					var strs = str.split("'");
					if(strs.length==3){
						blh = strs[1];
					}
				}
			}
		}
		look_detail(lc_id,tag,ssfs1,id,blh);
	}
	
}
//查看详细信息
function look_detail(lc_id,tag,ssfs1,id,blh){
	$("#advquery").hide();
	$("#pageList").hide();
	//病历
	if(tag=="bl_radio" && (ssfs1=="'准分子'" || ssfs1=="'晶体植入'")){
		read_show_qgbl(63);
		var data = getJSONData(BL_ZFZ,{lc_id:lc_id},"POST").obj;
		if(data!=null){
			bl_update_set(data);			
		}
		bl_set_jbxx_look(blh);
	}
	if(tag=="bl_radio" && ssfs1=="'儿童屈光'"){
		read_show_qgbl(75);
		var data = getJSONData(BL_ER,{lc_id:lc_id},"POST").obj;
		if(data!=null){
			blEr_update_set(data);
		}
		bl_set_jbxx_look(blh);
	}
	if(tag=="yy_radio"){
		//var data = getJSONData(YY,{lc_id:lc_id},"POST").obj;
		//read_show_qgbl1(yy_printArea(data));
		read_show_qgbl1(tbl_yy_add());
		var data = getJSONData(YY,{lc_id:lc_id},"POST").obj;
		yy_update_set(data);
		$("#look_qgbl_div").children("table").eq(1).remove();
		$("#ssjlAdd").attr("style","width:80%;margin-top:10px;margin-left:10%;margin-bottom:10px;border-top:1px solid black;border-left:1px solid black;");
	}
	if(tag=="ssjl_radio" && ssfs1=="'准分子'"){
		read_show_qgbl1(tbl_ssjl_add());
		var data = getJSONData(SSJL_ZFZ,{lc_id:lc_id},"POST").obj;
		if(data!=null){
			ssfs_update_set(data);	
		}
	}
	if(tag=="ssjl_radio" && ssfs1=="'晶体植入'"){
		read_show_qgbl(71);
		var data = getJSONData(SSJL_JT,{lc_id:lc_id},"POST").obj;
		if(data!=null){
			jtss_update_set(data);	
		}
	}
	if(tag=="ssjl_radio" && ssfs1=="'儿童屈光'"){
		read_show_qgbl(74);
		var data = getJSONData(SSJL_ER,{lc_id:lc_id},"POST").obj;
		if(data!=null){
			er_ssjl_update_set(data);
		}
	}
	if(tag=="shfc_radio" && ssfs1=="'准分子'"){
		read_show_qgbl1(tbl_shjl_add());
		var data = getJSONData("/publish/quguang/getShjlById.htm?id="+id,{},"GET").obj;
		if(data!=null){
			shjl_update_set(data);
		}
		bl_set_jbxx_look(blh);
	}
	if(tag=="shfc_radio" && ssfs1=="'晶体植入'"){
		read_show_qgbl(72);
		var data = getJSONData("/publish/quguang/getQgShfcById.htm?id="+id,{},"GET").obj;
		if(data!=null){
			shfc_set(data);
		}
		bl_set_jbxx_look(blh);
	}
	if(tag=="shfc_radio" && ssfs1=="'儿童屈光'"){
		read_show_qgbl(76);
		var data = getJSONData("/publish/quguang/getQgShfcErById.htm?id="+id,{},"GET").obj;
		if(data!=null){
			shfc_er_set(data);
		}
	}
	bl_set_jbxx_look(blh);
}
//读取展示屈光病历
function read_show_qgbl(id){
	var test = blmb1(id);
	var look_qgbl_div = $("<div/>").attr("id","look_qgbl_div").append(test);
	$(look_qgbl_div).appendTo("#right");
	var back_btn = '<div id="back_btn_div" style="width:100%;height:30px;margin-left:48%;"><input type="button" value="关闭" onclick="back_list_look()" style="width:100px;height:20px;"/></div>';
	$("#right").append(back_btn);
}
function read_show_qgbl1(test){
	var look_qgbl_div = $("<div/>").attr("id","look_qgbl_div").append(test);
	$(look_qgbl_div).appendTo("#right");
	var back_btn = '<div id="back_btn_div" style="width:100%;height:30px;margin-left:48%;"><input type="button" value="关闭" onclick="back_list_look()" style="width:100px;height:20px;"/></div>';
	$("#right").append(back_btn);
}
//返回
function back_list_look(){
	$("#right").find("#look_qgbl_div").remove();
	$("#right").find("#back_btn_div").remove();
	$("#advquery").show();
	$("#pageList").show();
}
//搜索栏
function qg_look_query(){
	var tab = '<table width="100%" cellspacing="0" cellpadding="0" border="0">'+
					'<tbody>'+
						'<tr>'+
							'<td width="23%" class="leftalign">'+
								'<input type="text" size="28" value="请输入病历号或患者姓名" onblur="this.className=\'blur\'" onfocus="this.className=\'focus\'" id="search_binglihao_xingming" class="blurview" name="search_binglihao_xingming">'+
							'</td>'+
							'<td width="9%">'+
								'<a href="javascript:seniorSearchSubmit_qg_luke();" class="search">查询</a>'+
							'</td>'+
							'<td width="9%">'+
								'<a href="javascript:qg_search_luke();" class="advsearch">高级查询</a>'+
							'</td>'+
							'<td width="35%">'+
								'<div style="float:right;font-family:宋体;">'+
									'<input type="radio" id="bl_radio" name="changeSearch" checked="checked" onclick="switchList(\'bl_radio\')"/>&nbsp;'+
									'<span style="cursor:pointer;" onclick="switchList(\'bl_radio\')">病历</span>&nbsp;&nbsp;|&nbsp;&nbsp;'+
									'<input type="radio" id="yy_radio" name="changeSearch" onclick="switchList(\'yy_radio\')"/>&nbsp;'+
									'<span style="cursor:pointer;" onclick="switchList(\'yy_radio\')">预约</span>&nbsp;&nbsp;|&nbsp;&nbsp;'+
									'<input type="radio" id="ssjl_radio" name="changeSearch" onclick="switchList(\'ssjl_radio\')"/>&nbsp;'+
									'<span style="cursor:pointer;" onclick="switchList(\'ssjl_radio\')">手术记录</span>&nbsp;&nbsp;|&nbsp;&nbsp;'+
									'<input type="radio" id="shfc_radio" name="changeSearch" onclick="switchList(\'shfc_radio\')"/>&nbsp;'+
									'<span style="cursor:pointer;" onclick="switchList(\'shfc_radio\')">术后复查</span>&nbsp;&nbsp;|&nbsp;&nbsp;'+	
									'&nbsp;&nbsp;&nbsp;&nbsp;'+
								'</div>'+
							'</td>'+
							'<td width="24%">'+
								'<div class="btn">'+
									'<a onclick="return true;" href="javascript:qg_exprot();" style="width:70px;"><span class="export" ></span>导出单项</a>'+
									'<a onclick="return true;" href="javascript:qg_exprotAll();" style="width:70px;"><span class="export"></span>导出多项</a>'+
									'<a onclick="return true;" href="javascript:qg_look();"><span class="seedoctor"></span>查看</a>'+
								'</div>'+
							'</td>'+
						'</tr>'+
					'</tbody>'+
			'</table>';
	return tab;
}
//高级查询div
function qg_high_div(){
	importJS("/subgroup/calendar/js/jscal2.js");
	importJS("/subgroup/calendar/js/en.js");
	importCSS("/subgroup/calendar/css/jscal2.css");
	var rt = '<table width="100%" cellspacing="0" cellpadding="0" border="0">'+
	'<tbody>'+
		'<tr>'+
			'<td width="8%" nowrap="nowrap" align="right">病历编号：</td>'+
			'<td width="12%">'+
				'<input type="text" class="blur" onfocus="this.className=\'focus\'" onblur="this.className=\'blur\'" id="search_blbh" name="search_blbh">'+
			'</td>'+
			'<td width="8%" nowrap="nowrap" align="right">患者姓名：</td>'+
			'<td width="12%">'+
				'<input type="text" class="blur" onfocus="this.className=\'focus\'" onblur="this.className=\'blur\'" id="search_xingming" name="search_xingming">'+
			'</td>'+
			'<td width="8%" nowrap="nowrap" align="right">患者性别：</td>'+
			'<td width="12%">'+
				'<input type="checkbox" name="search_xingbie" class="c_r_class" id="search_xingbie" value="1">男'+
				'<input type="checkbox" name="search_xingbie" class="c_r_class" id="search_xingbie" value="0">女'+
			'</td>'+
			'<td width="8%" nowrap="nowrap" align="right">患者年龄：</td>'+
			'<td width="12%">'+
				'<input type="text" class="blur" onfocus="this.className=\'focus\'" onblur="this.className=\'blur\'" id="search_shengriStart" name="search_shengriStart" style="width:40%;">'+
				'&nbsp;至&nbsp;'+
				'<input type="text" class="blur" onfocus="this.className=\'focus\'" onblur="this.className=\'blur\'" id="search_shengriEnd" name="search_shengriEnd" style="width:40%;">'+
			'</td>'+
			'<td width="8%" nowrap="nowrap" align="right"> 手机号码：</td>'+
			'<td width="12%" id="search_ssdq_c">'+
				'<input type="text" class="blur" onfocus="this.className=\'focus\'" onblur="this.className=\'blur\'" id="search_shouji" name="search_shouji">'+
			'</td>'+
		'</tr>'+
		'<tr>'+
			'<td nowrap="nowrap" align="right"> 医生姓名：</td>'+
			'<td>'+
				'<input type="text" class="blur" onfocus="this.className=\'focus\'" onblur="this.className=\'blur\'" id="search_ys_xingming" name="search_ys_xingming">'+
			'</td>'+
			'<td nowrap="nowrap" align="right"> 配台技师：</td>'+
			'<td>'+
				'<input type="text" class="blur" onfocus="this.className=\'focus\'" onblur="this.className=\'blur\'" id="search_ptjs_xingming" name="search_ys_xingming">'+
			'</td>'+		
			'<td nowrap="nowrap" align="right"> 配台护士：</td>'+
			'<td>'+
				'<input type="text" class="blur" onfocus="this.className=\'focus\'" onblur="this.className=\'blur\'" id="search_pths_xingming" name="search_ys_xingming">'+
			'</td>'+
			'<td nowrap="nowrap" align="right">手术费用：</td>'+
			'<td>'+
				'<input type="text" class="blur" onfocus="this.className=\'focus\'" onblur="this.className=\'blur\'" id="search_ssfyStart" name="search_ssfy" style="width:40%">'+
				'&nbsp;至&nbsp;'+
				'<input type="text" class="blur" onfocus="this.className=\'focus\'" onblur="this.className=\'blur\'" id="search_ssfyEnd" name="search_ssfy" style="width:40%">'+
			'</td>'+
			'<td nowrap="nowrap" align="right">检查费用：</td>'+
			'<td>'+
				'<input type="text" class="blur" onfocus="this.className=\'focus\'" onblur="this.className=\'blur\'" id="search_jcfyStart" name="search_ssfy" style="width:40%">'+
				'&nbsp;至&nbsp;'+
				'<input type="text" class="blur" onfocus="this.className=\'focus\'" onblur="this.className=\'blur\'" id="search_jcfyEnd" name="search_ssfy" style="width:40%">'+
			'</td>'+
		'</tr> '+
		'<tr>'+
			'<td nowrap="nowrap" align="right"><label id="rq_name">就诊日期   >  = ：</label></td>'+
			'<td>'+
				'<input type="text" class="blur" onfocus="this.className=\'focus\'" onblur="this.className=\'blur\'" id="search_zcrqStart" name="search_zcrqStart">'+
			'</td>'+
			'<td nowrap="nowrap" align="right"><label id="rq_name">就诊日期  <   ：</label></td>'+
			'<td nowrap="nowrap" align="right">'+
				'<input type="text" class="blur" onfocus="this.className=\'focus\'" onblur="this.className=\'blur\'" id="search_zcrqEnd" name="search_zcrqEnd">'+
			'</td>'+
			'<td nowrap="nowrap" align="right">手术眼别：</td>'+
			'<td>'+
				'<input type="checkbox" name="search_yanbie" class="c_r_class" id="search_yanbie" value="1">左眼'+
				'<input type="checkbox" name="search_yanbie" class="c_r_class" id="search_yanbie" value="0">右眼'+
			'</td>'+
			'<td nowrap="nowrap" align="right">手术方式：</td>'+
			'<td colspan="3">'+
				'<select id="ssfs1" class="blur" style="width:30%">'+
					'<option selected="selected"></option>'+
					'<option>准分子</option>'+
					'<option>晶体植入</option>'+
					'<option>儿童屈光</option>'+
				'</select>&nbsp;&nbsp;'+
				'<select id="ssfs2" class="blur" style="width:30%">'+
					'<option selected="selected"></option>'+
					'<option>lasik-110</option>'+
					'<option>lasik-90</option>'+
					'<option>lasik飞秒</option>'+
					'<option>ICL</option>'+
					'<option>TICL</option>'+
					'<option>PRL</option>'+
				'</select>&nbsp;&nbsp;'+
				'<select id="ssfs3" class="blur" style="width:30%">'+
					'<option selected="selected"></option>'+
					'<option>普通</option>'+
					'<option>Q值</option>'+
					'<option>地形图</option>'+
					'<option>波前相差</option>'+
				'</select>'+
			'</td>'+
		'</tr> '+
		'<tr>'+
			'<td nowrap="nowrap" align="right"><label id="rq_name">交手术费日期   >  = ：</label></td>'+
			'<td>'+
				'<input type="text" class="blur" onfocus="this.className=\'focus\'" onblur="this.className=\'blur\'" id="ssf_rq_Start">'+
			'</td>'+
			'<td nowrap="nowrap" align="right"><label id="rq_name">交手术费日期  <   ：</label></td>'+
			'<td nowrap="nowrap" align="right">'+
				'<input type="text" class="blur" onfocus="this.className=\'focus\'" onblur="this.className=\'blur\'" id="ssf_rq_End">'+
			'</td>'+
			'<td nowrap="nowrap" align="right"><label id="rq_name">交检查费日期   >  = ：</label></td>'+
			'<td>'+
				'<input type="text" class="blur" onfocus="this.className=\'focus\'" onblur="this.className=\'blur\'" id="jcf_rq_Start">'+
			'</td>'+
			'<td nowrap="nowrap" align="right"><label id="rq_name">交检查费日期  <   ：</label></td>'+
			'<td nowrap="nowrap" align="right">'+
				'<input type="text" class="blur" onfocus="this.className=\'focus\'" onblur="this.className=\'blur\'" id="jcf_rq_End">'+
			'</td>'+
		'</tr> '+
	'</tbody>'+
	'</table>'+
	'<div class="avdopenbutton">'+
		'<a href="javascript:seniorSearchSubmit_qg_luke();"><span class="advsumit"></span>提交</a>'+ 
		'<a href="javascript:qgSearchReset();"><span class="advreset"></span>重置</a>'+
		'<a id="closeId"><span class="close"></span>关闭</a>'+
	'</div>';
	var table = $(rt);
	return table;
}

/**
 * 重置
 */
function qgSearchReset(){
	$("#search_xingming").val("");
	$("input[name='search_xingbie']:checked").attr("checked",false);
	$("#search_shouji").val("");
	$("#search_zcrqStart").val("");
	$("#search_zcrqEnd").val("");
	$("#search_blbh").val("");
	$("#search_ys_xingming").val("");
	$("#search_ptjs_xingming").val("");
	$("#search_pths_xingming").val("");
	$("#search_shengriStart").val("");
	$("#search_shengriEnd").val("");
	$("#search_ssfyStart").val("");
	$("#search_ssfyEnd").val("");
	$("#search_jcfyStart").val("");
	$("#search_jcfyEnd").val("");
	$("input[name='search_yanbie']:checked").attr("checked",false);
	$("#ssfs1").val("");
	$("#ssfs2").val("");
	$("#ssfs3").val("");
	$("#ssf_rq_Start").val("");
	$("#ssf_rq_End").val("");
	$("#jcf_rq_Start").val("");
	$("#jcf_rq_End").val("");
}
/**
 * 非空验证
 */
function qgCheckNull(){
	var tag = false;
	tag=($("#search_binglihao_xingming").val()!=undefined && $("#search_binglihao_xingming").val()!="" && $("#search_binglihao_xingming").val()!="请输入病历号或患者姓名")?true:tag;
	tag=($("#search_xingming").val()!=undefined && $("#search_xingming").val()!="")?true:tag;
	tag=$("input[name='search_xingbie']:checked").length>0?true:tag;
	tag=($("#search_shouji").val()!=undefined && $("#search_shouji").val()!="")?true:tag;
	tag=($("#search_zcrqStart").val()!=undefined && $("#search_zcrqStart").val()!="")?true:tag;
	tag=($("#search_zcrqEnd").val()!=undefined && $("#search_zcrqEnd").val()!="")?true:tag;
	tag=$("#ssf_rq_Start").val()?true:tag;
	tag=$("#ssf_rq_End").val()?true:tag;
	tag=$("#jcf_rq_Start").val()?true:tag;
	tag=$("#jcf_rq_End").val()?true:tag;
	tag=($("#search_blbh").val()!=undefined && $("#search_blbh").val()!="")?true:tag;
	tag=($("#search_ys_xingming").val()!=undefined && $("#search_ys_xingming").val()!="")?true:tag;
	tag=($("#search_shengriStart").val()!=undefined && $("#search_shengriStart").val()!="")?true:tag;
	tag=($("#search_shengriEnd").val()!=undefined && $("#search_shengriEnd").val()!="")?true:tag;
	tag=($("#search_ssfyStart").val()!=undefined && $("#search_ssfyStart").val()!="")?true:tag;
	tag=($("#search_ssfyEnd").val()!=undefined && $("#search_ssfyEnd").val()!="")?true:tag;
	tag=($("input[name='search_yanbie']:checked").length!=0)?true:tag;
	tag=($("#ssfs1").val()!=undefined && $("#ssfs1").val()!="")?true:tag;
	tag=($("#ssfs2").val()!=undefined && $("#ssfs2").val()!="")?true:tag;
	tag=($("#ssfs3").val()!=undefined && $("#ssfs3").val()!="")?true:tag;
	return tag;
}
/**
 * 验证时间段是否为空
 */
function qgCheckSj(){
//	var tag1=($("#search_zcrqStart").val()!=undefined && $("#search_zcrqStart").val()!="")?true:false;
//	var tag2=($("#search_zcrqEnd").val()!=undefined && $("#search_zcrqEnd").val()!="")?true:false;
//	if(tag1==false && tag2==false){
//		return false;
//	}else{
		return true;
//	}
}
function qg_data_search(){
	var data_search = {};
	var search = $("#search_binglihao_xingming").val().indexOf("请输入") != -1 ? "": $("#search_binglihao_xingming").val();
	var xingming = $("#search_xingming").length == 1 ? $("#search_xingming").val() : "";// 患者姓名
	// 性别复选框
	var xingbie = "";
	if ($("#search_xingbie").length != 0) {
		$("input[name='search_xingbie']:checked").each(function() {
			xingbie += $(this).val() + ",";
		});
		if (xingbie != "")// 截取去掉后面的“,”
			xingbie = xingbie.substring(0, xingbie.lastIndexOf(","));
	}
	var shouji = $("#search_shouji").length == 1 ? $("#search_shouji").val(): "";// 手机号码
	var zcrqStart = $("#search_zcrqStart").length == 1 ? $("#search_zcrqStart").val(): "";// 注册时间结束
	var zcrqEnd = $("#search_zcrqEnd").length == 1 ? $("#search_zcrqEnd").val(): "";// 注册时间结束
	
	var search_blbh = $("#search_blbh").length ==1 ? $("#search_blbh").val():"";
	var search_ys_xingming = $("#search_ys_xingming").length==1?$("#search_ys_xingming").val():"";
	var search_ptjs_xingming = $("#search_ptjs_xingming").length==1?$("#search_ptjs_xingming").val():"";
	var search_pths_xingming = $("#search_pths_xingming").length==1?$("#search_pths_xingming").val():"";
	var shengriStart = $("#search_shengriStart").length == 1 ? $(
			"#search_shengriStart").val() : "";// 患者年龄开始
	var shengriEnd = $("#search_shengriEnd").length == 1 ? $(
			"#search_shengriEnd").val() : "";// 患者年龄结束
	
	var search_ssfyStart = $("#search_ssfyStart").length==1?$("#search_ssfyStart").val():"";
	var search_ssfyEnd = $("#search_ssfyEnd").length==1?$("#search_ssfyEnd").val():"";
	var search_jcfyStart = $("#search_jcfyStart").length==1?$("#search_jcfyStart").val():"";
	var search_jcfyEnd = $("#search_jcfyEnd").length==1?$("#search_jcfyEnd").val():"";
	// 眼别复选框
	var yanbie = "";
	if ($("#search_yanbie").length != 0) {
		$("input[name='search_yanbie']:checked").each(function() {
			yanbie += $(this).val() + ",";
		});
		if (yanbie != "")// 截取去掉后面的“,”
			yanbie = yanbie.substring(0, yanbie.lastIndexOf(","));
	}	
	var ssfs1 = $("#ssfs1").val();
	var ssfs2 = $("#ssfs2").val();
	var ssfs3 = $("#ssfs3").val();
	
	data_search = {
		search : search,
		xingming : xingming,// 患者姓名
		xingbie : xingbie,// 性别
		shouji : shouji,// 手机号码
		rqStart : zcrqStart,// 注册时间开始
		rqEnd : zcrqEnd,// 注册时间结束
		binglinumber : search_blbh,// 病历编号
		ys_xingming : search_ys_xingming,//医生姓名
		ptjs_xingming : search_ptjs_xingming,//配台技师姓名
		pths_xingming : search_pths_xingming,//配台护士姓名
		shengriStart : shengriStart,// 患者年龄开始
		shengriEnd : shengriEnd,// 患者年龄结束
		
		ssfyStart : search_ssfyStart,// 手术费用 开始
		ssfyEnd : search_ssfyEnd,// 手术费用 结束
		jcfyStart : search_jcfyStart,// 检查费用 开始
		jcfyEnd : search_jcfyEnd,// 检查费用 结束
		yb : yanbie,// 患者联系人电话紧急电话
		ssfs1 : ssfs1,//1级手术方式
		ssfs2 : ssfs2,//2级手术方式
		ssfs3 : ssfs3,//3级手术方式
		ssfrq_start:$("#ssf_rq_Start").val(),
		ssfrq_end:$("#ssf_rq_End").val(),
		jcfrq_start:$("#jcf_rq_Start").val(),
		jcfrq_end:$("#jcf_rq_End").val()
	};
	return data_search;
}
/**
 * 查询、高级查询的提交
 */
function seniorSearchSubmit_qg_luke() {
	var data_search = qg_data_search();
	$.extend(listFactor.data, data_search);
	$("#pageList").createPageList(listFactor);

};
//弹出高级查询表格
function qg_search_luke(){
	var seniorSearchTemplate = qg_high_div();//创建高级查询表格
	$.oimsBox({
		parentDiv:"advquery",//将生成内容添加的id
		divContent:seniorSearchTemplate
	});
	calendarFun_yy("search_zcrqStart");
	calendarFun_yy("search_zcrqEnd",-100);	
	calendarFun_yy("ssf_rq_Start");
	calendarFun_yy("ssf_rq_End");
	calendarFun_yy("jcf_rq_Start");
	calendarFun_yy("jcf_rq_End");
}
//导出
function qg_exprot(){
	var isSjNull = qgCheckSj();
	var isNull =qgCheckNull();
	if(isSjNull==false){
		$.oimsAlert("请填写“高级查询”中的开始日期段！");
	}else{
		if(!isNull){
			$.oimsConfirm("导出全部数据可能会需要很长时间，您确定不使用查询条件？",function(){
				qg_exprot_do();
			},function(){});
		}else{
			qg_exprot_do();
		}
	}
}
function qg_exprot_do(){
	var tag = $("input[name='changeSearch']:checked").attr("id");
	var data_search = qg_data_search();
	$.ajax({
		url : contextPath + "/publish/quguang/qg_export.htm?tag="+tag,
		data :data_search,
		async : false,
		type : 'POST',
		dataType : 'json',
		success : function(data) {
			if(data.state)
				location.href=contextPath+data.obj;
		}
	});	
}
//导出
function qg_exprotAll(){
	var isSjNull = qgCheckSj();
	var isNull =qgCheckNull();
	if(isSjNull==false){
		$.oimsAlert("请填写“高级查询”中的开始日期段！");
	}else{
		if(!isNull){
			$.oimsConfirm("导出全部数据可能会需要很长时间，您确定不使用查询条件？",function(){
				var tag = $("input[name='changeSearch']:checked").attr("id");
				qg_exprotAll_do();
			},function(){});
		}else{
			qg_exprotAll_do();
		}
	}
}
function qg_exprotAll_do(){
	var data_search = qg_data_search();
	$.ajax({
		url : contextPath + "/publish/quguang/qg_export_all.htm",
		data :data_search,
		async : false,
		type : 'POST',
		dataType : 'json',
		success : function(data) {
			if(data.state)
				location.href=contextPath+data.obj;
		}
	});
}
/**
 * 病历列表
 * @param blh
 */
function qgbl_look(qgSearchForm) {
	listFactor = {
	listObj : [ {
		title : "序号",
		key : "xh"
	}/*,{
		title : "ID号",
		key : "blh"
	}*/,{
		title : "病历编号",
		key : "binglinumber"
	},{
		title : "患者姓名",
		key : "xingming"
	}, {
		title : "患者性别",
		key : "xingbie"
	}, {
		title : "患者年龄",
		key : "age"
	}, {
		title : "电话号码",
		key : "shouji"
	}, {
		title : "手术费用",
		key : "ssfy"
	}, {
		title : "交手术费日期",
		key : "ssf_rq"
	},{
		title : "检查费用",
		key : "qg_jcf"
	}, {
		title : "交检查费日期",
		key : "jcf_rq"
	}, {
		title : "就诊日期",
		key : "sj"
	}, {
		title : "手术方式1",
		key : "ssfs1"
	}, {
		title : "手术方式2",
		key : "ssfs2"
	}, {
		title : "手术方式3",
		key : "ssfs3"
	}],
	url : contextPath + "/publish/quguang/findQgbl.htm",
	method : "post",
	checkbox : true,
	single : true,
	data : {// data表示传的参数
		currentPage : 1,
		pageSize : 10,// Page类的方法
		tag : Math.random(),
	}
};
$("#pageList").remove();
var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
		.appendTo("#right");
$(div_list).createPageList(listFactor);
}
/**
 * 预约列表
 * @param blh
 */
function qgYY_look() {
	listFactor = {
	listObj : [ {
		title : "序号",
		key : "xh"
	},{
		title : "ID号",
		key : "blh"
	},{
		title : "病历编号",
		key : "binglinumber"
	}, {
		title : "患者姓名",
		key : "xingming"
	}, {
		title : "患者性别",
		key : "xingbie"
	}, {
		title : "患者年龄",
		key : "age"
	}, {
		title : "电话号码",
		key : "shouji"
	}, {
		title : "预约时间",
		key : "sj"
	}, {
		title : "医生姓名",
		key : "ys_xingming"
	}],
	url : contextPath + "/publish/quguang/findQgYY.htm",
	method : "post",
	checkbox : true,
	single : true,
	data : {// data表示传的参数
		currentPage : 1,
		pageSize : 10,// Page类的方法
		tag : Math.random()
	}
};
$("#pageList").remove();
var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
		.appendTo("#right");
$(div_list).createPageList(listFactor);
}
/**
 * 手术列表（以眼为单位）
 */
function qgss_look(){
	listFactor = {
			listObj : [ {
				title : "序号",
				key : "xh"
			},{
				title : "ID号",
				key : "blh"
			},{
				title : "病历编号",
				key : "binglinumber"
			},{
				title : "患者姓名",
				key : "xingming"
			}, {
				title : "患者性别",
				key : "xingbie"
			}, {
				title : "患者年龄",
				key : "age"
			}, {
				title : "电话号码",
				key : "shouji"
			}, {
				title : "手术费用",
				key : "ssfy"
			}, {
				title : "交手术费日期",
				key : "ssf_rq"
			}, {
				title : "眼别",
				key : "yb"
			}, {
				title : "手术日期",
				key : "sj"
			}, {
				title : "手术方式1",
				key : "ssfs1"
			}, {
				title : "手术方式2",
				key : "ssfs2"
			}, {
				title : "手术方式3",
				key : "ssfs3"
			}, {
				title : "手术医生",
				key : "ys_xingming"
			}, {
				title : "配台技师",
				key : "ptjs_xingming"
			}, {
				title : "配台护士",
				key : "pths_xingming"
			}],
			url : contextPath + "/publish/quguang/findQgss.htm",
			method : "post",
			checkbox : true,
			single : true,
			data : {// data表示传的参数
				currentPage : 1,
				pageSize : 10,// Page类的方法
				tag : Math.random()
			}
		};
		$("#pageList").remove();
		var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
				.appendTo("#right");
		$(div_list).createPageList(listFactor);
}
/**
 * 术后复查
 */
function qgfc_look(){//select b.id,b.blh,b.binglinumber,b.xingming,b.xingbie,b.shouji,b.sj,b.ssfs1,b.ssfs2,b.ssfs3
	listFactor = {
			listObj : [ {
				title : "序号",
				key : "xh"
			},{
				title : "ID号",
				key : "blh"
			},{
				title : "病历编号",
				key : "binglinumber"
			},{
				title : "患者姓名",
				key : "xingming"
			}, {
				title : "患者性别",
				key : "xingbie"
			}, {
				title : "患者年龄",
				key : "age"
			}, {
				title : "电话号码",
				key : "shouji"
			}, {
				title : "复查日期",
				key : "sj"
			}, {
				title : "手术方式1",
				key : "ssfs1"
			}, {
				title : "手术方式2",
				key : "ssfs2"
			}, {
				title : "手术方式3",
				key : "ssfs3"
			}],
			url : contextPath + "/publish/quguang/findQgShjl.htm",
			method : "post",
			checkbox : true,
			single : true,
			data : {// data表示传的参数
				currentPage : 1,
				pageSize : 10,// Page类的方法
				tag : Math.random()
			}
		};
		$("#pageList").remove();
		var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
				.appendTo("#right");
		$(div_list).createPageList(listFactor);
}
/**
 * 切换列表
 */
function switchList(id){
	$("#"+id).attr("checked",true);
		if(id=='bl_radio'){
			qgbl_look();
		}
		if(id=='yy_radio'){
			qgYY_look();
		}
		if(id=='ssjl_radio'){
			qgss_look();
		}
		if(id=='shfc_radio'){
			qgfc_look();
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
		cal.manageFields(id, id, "%Y-%m-%d", leftWidth);
	}
}
//病历赋值——患者基本信息
function bl_set_jbxx_look(blh){
	var jbxx = getJbxx_qg(blh);
	$("#look_qgbl_div").find("#caseNumber").text(jbxx.blh);
	$("#look_qgbl_div").find("#qqNumber").val(jbxx.qq);
	$("#look_qgbl_div").find("#suffererName").text(jbxx.name);
	$("#look_qgbl_div").find("#sex").text(jbxx.sex);
	$("#look_qgbl_div").find("#birthday").text(jbxx.birthday);
	$("#look_qgbl_div").find("#job").val(jbxx.gzdw);
	$("#look_qgbl_div").find("#address").val(jbxx.address);
	$("#look_qgbl_div").find("#cellphone").val(jbxx.dianhua);
	$("#look_qgbl_div").find("#age").text(jbxx.age);
}