//加载文件
function loadJsAndCss(){
	importJS("/js/commonLanguage.js");
	importJS("/js/jquery.createPageList.js");
	importJS("/js/jquery.PrintArea.js");
	importJS("/js/jquery-barcode.min.js");
	importJS("/jmsxj/js/fenzhen.js");
	importJS("/jmsxj/js/main.js");
	importJS("/jmsxj/js/functions.js");
	importJS("/subgroup/calendar/js/jscal2.js");
	importJS("/subgroup/calendar/js/en.js");
	importJS("/jmsxj/js/packaging.js");
	importJS("/jmsxj/js/sg_getValues.js");
	importJS("/jmsxj/js/sg_conf.js");
	importJS("/jmsxj/js/sg_show_tsjc.js");
	importCSS("/subgroup/calendar/css/jscal2.css");
	importCSS("/style/green/css/green.css");
	//importCSS("/jmsxj/style/sg_css.css");
	//loadWelcomePage();
}

function _emr_jmsxj(id){
//	$(".medicalRecord").remove();	
//	var showWidth = $(".doctortitle").width();
//	var showHeight = $("#visitRecord").height()-$(".doctortitle").height();
//	var rightDiv = $("<div/>").attr("id","sg_right").attr("style","width:"+showWidth+"px;height:"+showHeight+"px;background:;").addClass("medicalRecord");
//	$("body").append(rightDiv);
//	loadJsAndCss();
//	main_sg(getBlh);
	$("#medicalRecordTab30008").remove();
	$(".medicalRecord").hide();
	var tag = $("#medicalRecordTab"+id);
	if(tag.length){
		tag.show();
		//$("#sg_right").show();
	}else{
		tag = $("<div />").attr("id","medicalRecordTab"+id).addClass("medicalRecord").appendTo("body");
		var h = $("#visitRecord").height()-$("#tabTitle").outerHeight()-tag.outerHeight()-4;
		tag.height(h);
		var showWidth = $("#patientInfo").width()-$("#visitRecord").width();
		var showHeight = $("#visitRecord").height()-$(".doctortitle").height();
		var rightDiv = $("<div/>").attr("id","sg_right").attr("style","width:"+showWidth+"px;height:"+showHeight+"px;background:;").appendTo(tag);
		loadJsAndCss();
		common_language = setLanguage(common_language);
		main_sg(getBlh());
	}
}
//患者列表
function hzfz_sg(){
	fenzhen();
}
//主方法
function main_sg(blh){
	if(blh==null){
		blh=getBlh();
	}
//	$("#right").append(getTop(blh));
//	$("#right").append(getVistList());
//	$("#right").append(getVisitRecord());
	
	$("#sg_right").append(getDoctortitle());
	$("#sg_right").append(getMedicalRecordTab());
	$("#doctortitle").append(getTitleBtnDiv());
	eval('sg_bl()');
}
//患者信息div
function getTop(blh){
	var hzxx = getJbxx(blh);
	var patientInfo = $("<div/>").attr("id","patientInfo");
	var childNodes ='';
	if(hzxx==null){
		childNodes+='<img width="25" height="25" src="../images/pople.png">'+
		'<strong>ID号：</strong>'+
		'<span class="replaceTxt" style="display: inline;" id="blh"></span>&nbsp;'+
		'<strong>患者姓名：</strong>'+
		'<span class="replaceTxt" style="display: inline;" id="name"></span>&nbsp;'+
		'<strong>性别：</strong>'+
		'<span class="replaceTxt" style="display: inline;" id="sex"></span>&nbsp;'+
		'<strong>年龄：</strong>'+
		'<span class="replaceTxt" style="display: inline;" id="age"></span>&nbsp;'+
		'<strong>是否医保：</strong>'+
		'<span class="replaceTxt" style="display: inline;" id="sfyb"></span>&nbsp;'+
		'<strong>手机：</strong>'+
		'<span class="replaceTxt" id="mobile" style="display: inline;" id="dianhua"></span>';
	}else{
		childNodes+='<img width="25" height="25" src="../images/pople.png">'+
		'<strong>ID号：</strong>'+
		'<span class="replaceTxt" style="display: inline;" id="blh">'+hzxx.blh+'</span>&nbsp;'+
		'<strong>患者姓名：</strong>'+
		'<span class="replaceTxt" style="display: inline;" id="name">'+hzxx.name+'</span>&nbsp;'+
		'<strong>性别：</strong>'+
		'<span class="replaceTxt" style="display: inline;" id="sex">'+hzxx.sex+'</span>&nbsp;'+
		'<strong>年龄：</strong>'+
		'<span class="replaceTxt" style="display: inline;" id="age">'+hzxx.age+'</span>&nbsp;'+
		'<strong>是否医保：</strong>'+
		'<span class="replaceTxt" style="display: inline;" id="sfyb">'+hzxx.yibao+'</span>&nbsp;'+
		'<strong>手机：</strong>'+
		'<span class="replaceTxt" id="mobile" style="display: inline;" id="dianhua">'+hzxx.dianhua+'</span>';
	}
	$(patientInfo).html(childNodes);
	var top = $("<div/>").attr("id","top").append(patientInfo);
	return top;
}
//对比
function getVistList(){
	var vistList = $("<div/>").addClass("visitList").attr("style","height:522px;display:none;");
	var childNodes = '<div class="contrast">对比</div>'+
					 '<a class="up1"></a>'+
					 '<div style="overflow: hidden; height: 480px;">'+
					 	'<ul>'+
							'<li class="on"><span class="emr_jiuzhenlistcheck">'+
								'<input type="checkbox" style="vertical-align: top;"></span>'+
								'<p>2014-11-10</p>'+
								'<p>医生：</p></li>'+
							'<li>'+
								'<span class="emr_jiuzhenlistcheck">'+
									'<input type="checkbox" style="vertical-align: top;">'+
								'</span>'+
								'<p>2014-11-09</p>'+
								'<p>医生：</p>'+
							'</li>'+
							'<li>'+
								'<span class="emr_jiuzhenlistcheck">'+
									'<input type="checkbox" style="vertical-align: top;">'+
								'</span>'+
								'<p>2014-11-08</p>'+
								'<p>医生：</p>'+
							'</li>'+
							'<li>'+
								'<span class="emr_jiuzhenlistcheck">'+
									'<input type="checkbox" style="vertical-align: top;">'+
								'</span>'+
								'<p>2014-11-07</p>'+
								'<p>医生：</p>'+
							'</li>'+
						'</ul>'+
					'</div>'+
					'<a class="down1"></a>';
	$(vistList).html(childNodes);
	return vistList;
}
//标签
function getDoctortitle(){
	var doctortitle = $("<div/>").attr("id","doctortitle").attr("style","height:28px;width:100%;background:url('../style/green/images/tdtitlebg.png');");
    var tabTitle = $("<div/>").attr("id","tabTitle").addClass("tab");
    var childNodes = '<div class="tab_show" id="sg_bl"><span>病历</span></div>'+
					 	//'<div class="tab_hide" id="sg_tys"><span>同意书</span></div>'+
					 	'<div class="tab_hide" id="sg_pgb"><span>评估表</span></div>'+
					 	'<div class="tab_hide" id="sg_dpjl"><span>订片记录</span></div>'+
					 	//'<div class="tab_hide" id="sg_qjd"><span>取镜单</span></div>'+
					 	'<div class="tab_hide" id="sg_fcjl"><span>复查记录</span></div>';
   tabTitle.html(childNodes);
   $(doctortitle).append(childNodes);
   $("#sg_right").append(doctortitle);
   $("#sg_bl").bind("click",function(){
		$("#doctortitle").find(".tab_show").removeClass("tab_show").addClass("tab_hide");
		$(this).removeClass("tab_hide").addClass("tab_show");
		eval('sg_bl()');
	});
	$("#sg_tys").bind("click",function(){
		$("#doctortitle").find(".tab_show").removeClass("tab_show").addClass("tab_hide");
		$(this).removeClass().addClass("tab_show");
		eval('sg_tys()');
	});
	$("#sg_pgb").bind("click",function(){
		$("#doctortitle").find(".tab_show").removeClass("tab_show").addClass("tab_hide");
		$(this).removeClass().addClass("tab_show");
		eval('sg_pgb()');
	});
	$("#sg_dpjl").bind("click",function(){
		$("#doctortitle").find(".tab_show").removeClass("tab_show").addClass("tab_hide");
		$(this).removeClass().addClass("tab_show");
		eval('sg_dpjl()');
	});
	$("#sg_qjd").bind("click",function(){
		$("#doctortitle").find(".tab_show").removeClass("tab_show").addClass("tab_hide");
		$(this).removeClass().addClass("tab_show");
		eval('sg_qjd()');
	});
	$("#sg_fcjl").bind("click",function(){
		$("#doctortitle").find(".tab_show").removeClass("tab_show").addClass("tab_hide");
		$(this).removeClass().addClass("tab_show");
		eval('sg_fcjl()');
	});
}

//就诊记录
function getVisitRecord(){
	var showHeight = getShowHeight_sg()+20;
	var visitRecord = $("<div/>").attr("id","visitRecord").attr("style","height:"+showHeight+"px;");
	var visitRecordTitle = $("<div/>").attr("id","visitRecordTitle").attr("style","margin-top:207px;");
	var wenzi = '就诊记录<span style="color:blue; display:block">n</span>次';
	$(visitRecordTitle).html(wenzi);
	$(visitRecord).append(visitRecordTitle);
	return visitRecord;
}
//展示区域
function getMedicalRecordTab(){
	var showHeight = getShowHeight_sg()-10;
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
		var medicalRecordTab = $("<div/>").attr("id","medicalRecordTab").attr("style","width:100%;height: "+showHeight+"px;");
		$("<div/>").attr("id","tabContent").attr("style","width:70%;height: "+showHeight+"px;float:left;border-right:1px solid #d2d2d2;overflow:auto;").appendTo(medicalRecordTab);
		var tabRight = $("<div/>").attr("id","tabRight").attr("style","width:27%;height: "+showHeight+"px;float:left;").appendTo(medicalRecordTab);
		//当前病历系统编号、日期
		var tabWhich = $("<div/>").attr("id","tabWhich").addClass("tabWhich").appendTo(tabRight);
		var tabMessages = "<table border='0' cellpadding='0' cellspacing='0' width='90%'>" +
							"<tr>" +
								"<td style='text-align:center;font-size:12px;'><label style='color:red;font-weight:blod;'>*</label>当前病历：</td>" +
								"<td style='text-align:center;font-size:12px;'><label id='blbh'>"+bl_id+"</label></td>" +
								"<td style='text-align:center;font-size:12px;'>检查日期：</td>" +
								"<td style='text-align:center;font-size:12px;'><label id='blrq'>"+czrq+"</label></td>" +
							"</tr>" +
						"</table>";
		$(tabWhich).append(tabMessages);
		//列表
		var tabList = $("<div/>").attr("id","tabList").attr("style","height:"+(showHeight-30)+"px").addClass("tabList").appendTo(tabRight);
		return medicalRecordTab;
	}else{
		return '';
	}
	
}
function getTitleBtnDiv(){
	
	var title_buttons = $("<div/>").attr("id","title_buttons").attr("style","width:50%;height:25px;text-align:right;float:right;");
	var isAutoSetTab = "<div id='auto_setSgbl_div' style='width:300px;height:22px;text-align:center;float:right;margin-top:3px;margin-right:10px;'>" +
	"显示最新检查结果<input type='radio' name='autoSet_sgbl' id='autoSet_sgbl_true'/>&nbsp;&nbsp;" +
	"显示上次保存的值<input type='radio' name='autoSet_sgbl' id='autoSet_sgbl_false' checked='checked'/>&nbsp;&nbsp;" +
	"<input type='button' value='刷新' style='width:40px;height:20px;border:2px solid gold;color:#red;cursor:pointer;' onclick='reset_sgbl_moban()'/>"+
"</div>";
	var add_bl_btn = "<div id='add_bl_btn_div' style='width:120px;height:22px;float:right;margin-top:3px;margin-right:10px;'><input type='button' value='填写一份新病历' style='width:120px;height:20px;border:2px solid gold;color:#red;cursor:pointer;' onclick='add_bl();'/></div>&nbsp;&nbsp;";
	var add_fcjlb_btn = "<div id='add_fcjlb_btn_div' style='width:120px;height:22px;float:right;margin-top:3px;margin-right:10px;'><input type='button' value='查看复查记录表' style='width:120px;height:20px;border:2px solid gold;color:#red;cursor:pointer;' onclick='add_fcjlb();'/></div>&nbsp;&nbsp;";
	$(title_buttons).append(add_bl_btn).append(add_fcjlb_btn).append(isAutoSetTab);
	return title_buttons;
}

