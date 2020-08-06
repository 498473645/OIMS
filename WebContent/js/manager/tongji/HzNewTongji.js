var getKaiDanDoctorByQuanxian_url = "/publish/yuangong/getKaiDanDoctorByQuanxian.htm"; //获取所有的门诊医生权限的医生
var findDiqusByPid_url = "/publish/diqu/findDiqusByPid.htm"; //获取所有的门诊医生权限的医生
var tjHuanZheXinXiByHzTjForm_url = "/publish/tj/tjHuanZheXinXiByHzTjForm.htm"; //获取所有的门诊医生权限的医生
function showHzNewTongji(){
//	var chartShowRight = $("<div />").attr("id","chartShowRight").attr("style","float:right;border:1px solid red;").appendTo("#right");
//	showSearch(chartShowRight);
	
	var width = ($("#right").find(".title").width());//应用区域宽度
	var height = ($("#right").height())-($("#right").find(".title").height())-10;//应用区域高度
	var tj_content = $("<div/>").attr("id","tj_content").attr("class","divContent").attr("style","width:"+width+"px;height:"+height+"px;background:;").appendTo("#right");
	var tj_content_right = $("<div/>").attr("id","tj_content_right").attr("style","width:"+(width*0.25-2)+"px;height:"+height+"px;background:;float:right;overflow:auto;border:1px solid black;").appendTo(tj_content);
	var tj_content_left = $("<div/>").attr("id","tj_content_left").attr("style","width:"+(width*0.75-2)+"px;height:"+height+"px;background:;float:left;border:1px solid red;").appendTo(tj_content);
	hzNewTongji_init_openDiv("#tj_content_right");
	
	$("#a_btn_look").unbind().click(hzRequestData);
	hzRequestData();
}

function hzRequestData(){
	var findDiqusByPid_data = getJSONData(tjHuanZheXinXiByHzTjForm_url,HzNewTongji_searchData(),"POST");
	if(findDiqusByPid_data.state){
		showPie("#tj_content_left", "地区就诊患者统计", findDiqusByPid_data.obj,function(){});
	}
}


function hzNewTongji_init_openDiv(divId){
	//时间、检查科室、检查项目、检查单状态、检查医生、眼别、检查设备、诊别
	
	var table = "<div class='right_findTitle'>统计查询</div>" +
			"<table width='100%' border='0' id='selectTable'>" +
			"<tr>" +
			"<td colspan='2' align='center'>" +
			"<input type='radio' name='RadioGroup1' value='ny' id='RadioGroup1_0' checked='checked' />年月" +
			"<input type='radio' name='RadioGroup1' value='sj' id='RadioGroup1_1' />时间" +
			"</td>" +
			"</tr>" +
			"<tr>" +
			"<td width='22%'>" +
			"<div align='right' id='fTime1_div'>年份:</div>" +
			"</td>" +
			"<td width='78%'>" +
			"<select id='fTime1_select' style='width:100%;' /><input id='fTime1_input' style='width:100%;'/>" +
			"</td>" +
			"</tr>" +
			"<tr>" +
			"<td>" +
			"<div align='right'  id='fTime2_div'>月份:</div>" +
			"</td>" +
			"<td>" +
			"<select id='fTime2_select' style='width:100%;' /><input id='fTime2_input' style='width:100%;'/>" +
			"</td>" +
			"</tr>" +
			/*"<tr name='mzDoctor'>" +
			"<td colspan='2'>门诊医生:</td>" +
			"<tr name='mzDoctor'><td colspan='2'><div class='right_lilist_div' style='overflow:auto;height:120px;border:1px black solid;' id = 'mzDoctor'></div></td></tr>" +
			"</tr>" +*/
			"<tr><td colspan='2'><ul id='diquUl'><input id='diquId' type='hidden' /><li><select><option value ='0'>中国</option></select></li></ul></td></tr>"+
			
			"</table>"+
			"<div class='buttonsytle1'>" +
//			"<a id='a_btn_report'><span class='report'></span>生成报表</a>" +
			"<a id='a_btn_look'><span class='view'></span>页面查看</a></div>";
			$(table).appendTo($(divId));
	calendarFun("fTime1_input",-140);
	calendarFun("fTime2_input",-140);
	//单选按钮的选择切换
	tj_redioSelect();
	//初始化月份中的年月
	tj_markYear("#fTime1_select");
	tj_markMonth("#fTime2_select");
	
	//查询所有的门诊医生
	/*var getKaiDanDoctorByQuanxian_data = getJSONData(
			getKaiDanDoctorByQuanxian_url, {// 获取具有检查权限的医生
				tag : Math.random()
			}, "post");
	if (getKaiDanDoctorByQuanxian_data.state&&getKaiDanDoctorByQuanxian_data.obj.length>0) {
		var table_doctors = $("<table />").appendTo("#mzDoctor");
		var tr_doctors;
		var yuangonglist = getKaiDanDoctorByQuanxian_data.obj;
		$.each(yuangonglist, function(i, yuangong) {
			if(i%4==0)
				tr_doctors = $("<tr/>").appendTo(table_doctors);
			var td_doctors = $("<td align='left' />").appendTo(tr_doctors);
			$(
					"<input type='checkbox'  name='bg_doctor' value='"
							+ yuangong.gonghao + "'/>").appendTo(td_doctors);
			$("<label >" + yuangong.xingming + "</label><br>").appendTo(td_doctors);
		});
	}*/
	getNextDiqu(0);
}
function getNextDiqu(fatherId){
	var findDiqusByPid_data = getJSONData(findDiqusByPid_url,{pid:fatherId,tag:Math.random()},"POST");
	if(findDiqusByPid_data.state&&findDiqusByPid_data.obj.length>0){
		$("#diquId").val(fatherId);
		var sel = $("<select />").appendTo($("<li />").appendTo("#diquUl"));
		$("<option />").val(fatherId).text("全部").attr("selected","selected").appendTo(sel);
		$.each(findDiqusByPid_data.obj,function(i, diqu){
			$("<option />").val(diqu.id).text(diqu.name).appendTo(sel);
		});
		$(sel).change(function(){
			
//			$("#diquId").val($(this).parent().prev("li:select").val());
			$(this).parent().nextAll().remove();
			if($(this).children("option:selected").text()!='全部'){
				getNextDiqu($(this).val());
			}else{
				$("#diquId").val(fatherId);
			}
		});
	}else{
		
		$.oimsAlert("不存在下一级数据了。");
	}
}


function HzNewTongji_searchData(){
	var timeType = $("input[name='RadioGroup1']:checked").val();
	var fTime1;
	var fTime2;
	var diquId='';
	if(timeType=='ny'){
		fTime1 = $("#fTime1_select").val();
		fTime2 = $("#fTime2_select").val();
	}else{
		fTime1 = $("#fTime1_input").val();
		fTime2 = $("#fTime2_input").val();
	}
	
	var diquId =	$("#diquId").val();
	
	/*$("#checkDoctor table input:checked").each(function(i){
		if(i==0){
			doctors = $(this).val();
		}else{
			doctors+=","+$(this).val();
		}
	});*/
	
	return {
		'fTime1':fTime1,
		'fTime2':fTime2,
		'timeType':timeType,
		'diquIds':diquId,
		tag : Math.random()
	};
}