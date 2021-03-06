// 添加引用css和js(整理)
function initCssAndJs_baogaoAll() {
	importJS("/js/jquery.jqprint-0.3.js");
	importJS("/js/jquery.input.js");
	importJS("/js/oims_dengbi.js");
	importJS("/js/oimsCategory.config.js");
	importJS("/js/manager/baogao/initialBaoGao.js");
	// 特检
	importJS("/js/manager/baogao/eyezsxz.js");// 注视性质检查报告JS
	importJS("/js/manager/baogao/eyeygzy.js");// 荧光造影检查报告JS
	importJS("/js/manager/baogao/eyegcsy.js");// 视野检查报告JS
	importJS("/js/manager/baogao/eyeoct.js");// OCT检查报告JS
	importJS("/js/manager/baogao/eyeFVEP.js");// 电生理FVEP检查报告JS
	importJS("/js/manager/baogao/eyePERG.js");// 电生理FERG检查报告JS
	importJS("/js/manager/baogao/eyeMfERG.js");// 电生理FERG检查报告JS
	importJS("/js/manager/baogao/eyeFERG.js");// 电生理FERG检查报告JS
	importJS("/js/manager/baogao/eyeEOG.js");// 电生理EOG检查报告JS
	importJS("/js/manager/baogao/eyePVEP.js");// 电生理EOG检查报告JS
	importJS("/js/manager/baogao/eyejmdxt.js");// 暗适应检查报告JS
	importJS("/js/manager/baogao/eyect.js");// A超检查报告JS
	importJS("/js/manager/baogao/eyebchao.js");// B超检查报告JS
	importJS("/js/manager/baogao/eyemingandu.js");// 敏感度检查报告JS
	importJS("/js/manager/baogao/eyejmqlj.js");// 角膜曲率计检查报告JS
	importJS("/js/manager/baogao/eyejmspjs.js");// 角膜内皮计数检查报告JS
	importJS("/js/manager/baogao/eyeubm.js");// 超声生物显微镜(UBM)检查报告JS
	importJS("/js/manager/baogao/eyeqfjj.js");// 前房角镜检查报告JS
	importJS("/js/manager/baogao/eyesmj.js");// 三面镜检查报告JS
	// 验光
	importJS("/js/manager/baogao/eyeballpress.js");// 眼压检查报告JS
	importJS("/js/manager/baogao/eyeyxjc.js");// 隐斜检查报告JS
	importJS("/js/manager/baogao/eyetsjjfw.js");// 九方位检查报告JS
	importJS("/js/manager/baogao/eyetsjsj.js");// 三级视功能检查报告JS
	importJS("/js/manager/baogao/eyejgzl.js");// 激光治疗报告JS
	importJS("/js/manager/baogao/eyetsjzl.js");// 弱視治疗报告JS
	importJS("/js/manager/baogao/eyetsli.js");// 特殊视力检查录入报告JS
	importJS("/js/manager/baogao/eyedslzsq.js");// 低视力助视器检查录入报告JS
	importJS("/js/manager/baogao/eyexsjc.js");// 调节辐辏检查报告JS
	importJS("/js/manager/baogao/eyeygnew.js");// 验光检查报告JS
	importJS("/js/manager/baogao/eyesjjc.js");// 色觉检查报告JS
	importJS("/js/manager/baogao/eyeywyj.js");// 眼位眼肌检查报告JS
	importJS("/js/manager/baogao/eyeslj.js");// 三棱镜检查报告JS
	importJS("/js/manager/baogao/eyejmhd.js");// 角膜厚度检查报告JS
	importJS("/js/manager/baogao/eyelxdzx.js");// 裂隙灯照相检查报告JS
	importJS("/js/manager/baogao/eyeldcx.js");// 泪道冲洗检查报告JS
	importJS("/js/manager/baogao/eyejm.js");// 复视检查报告JS
	importJS("/js/manager/baogao/eyebdx.js");// 不等像检查报告JS
	importJS("/js/manager/baogao/eyeqianfangshendu.js");
	importJS("/js/manager/baogao/eyeRetcam.js");
}

function loadReportController(jcxmIds) {
	initCssAndJs_baogaoAll();
	reportController(jcxmIds);
}

function addTimeTag(dataO){
	$("<div />").attr("id","div_view").attr("class","qybl").appendTo("#right");
	var BaoGaoRelationTimeTag_data=getJSONData("/publish/baogao/getBaoGaoRelationTimeTag.htm",{
			tag : Math.random(),
			binglihao:dataO[0].binglihao,
			jcxmId:dataO[0].jcxmIds
		},"POST");
	if(dataO[0].jcxmIds==json_jcxm.ktYanguang){
		var BaoGaoRelationTimeTag_data_xt=getJSONData("/publish/baogao/getBaoGaoRelationTimeTag.htm",{
			tag : Math.random(),
			binglihao:dataO[0].binglihao,
			jcxmId:json_jcxm.xtYanguang
		},"POST");
		if(BaoGaoRelationTimeTag_data_xt.obj!=null){
			BaoGaoRelationTimeTag_data.obj=BaoGaoRelationTimeTag_data.obj.concat(BaoGaoRelationTimeTag_data_xt.obj);
			BaoGaoRelationTimeTag_data.obj.sort(function(v1,v2){
				if(v1.jcdId>v2.jcdId){
					return -1;
				}
				else if(v1.jcdId<v2.jcdId){
					return 1;
				}
			});
		}
	}
	else if(dataO[0].jcxmIds==json_jcxm.xtYanguang){
		var BaoGaoRelationTimeTag_data_kt=getJSONData("/publish/baogao/getBaoGaoRelationTimeTag.htm",{
			tag : Math.random(),
			binglihao:dataO[0].binglihao,
			jcxmId:json_jcxm.ktYanguang
		},"POST");
		if(BaoGaoRelationTimeTag_data_kt.obj!=null){
			BaoGaoRelationTimeTag_data.obj=BaoGaoRelationTimeTag_data.obj.concat(BaoGaoRelationTimeTag_data_kt.obj);
			BaoGaoRelationTimeTag_data.obj.sort(function(v1,v2){
				if(v1.jcdId>v2.jcdId){
					return -1;
				}
				else if(v1.jcdId<v2.jcdId){
					return 1;
				}
			});
		}
	}
	var ul = $("<ul />").appendTo($("<div id='leftMenu' />").attr("style","overflow-y: auto;height:550px;width:150px;float:left;text-align:center;").appendTo("#div_view"));
	if(dataO[0].state!='已完成'){
		$("<li><a>写报告</a></li>").appendTo(ul).addClass("on").click(function(){
			$(this).addClass("on").siblings().removeClass("on");
			$("#div_reportView").hide();
			$("#div_reportresult").show();
//			$("#div_buttonsytle1").show();
			$("#a_printreport").show();
			$("#a_savebaogao").show();
		});
	}
	
	$.each(BaoGaoRelationTimeTag_data.obj,function(index,data){
		var li = $("<li><a>"+formatDate(data.insertDate.time)+"</a></li>").appendTo(ul);
		$("<input id='jcdId' type='hidden' />").val(data.jcdId).appendTo(li);
		li.click(function(){
			$(this).addClass("on").siblings().removeClass("on");
			var jcd=getJSONData("/publish/jcd/getJcdByJcd.htm",{
				tag : Math.random(),
				id:$(this).find("input#jcdId").val()
			},"POST");
			if(jcd.state){
				parameter = baogao_moban_ajax(jcd.obj) ;
				importJS("/js/manager/baogao/reportPreview.js");// 注视性质检查报告JS
				reportPreviewInitData() ;
				$("#div_reportView").html("").show();	
				seeReportButUpdate(jcd.obj,"#div_reportView");
//				$("#div_reportresult").hide();
				//$("#div_reportresult").html($($('iframe')[0].contentWindow.document).find('div.reportresult').html());
//				$("#div_buttonsytle1").hide();
				$("#a_printreport").hide();
				if(dataO[0].state=='已完成')
				$("#a_printreport").show();
				$("#a_savebaogao").hide();
			}
			
			if($(".xiNanReport").length==1){
				$(".xiNanReport").hide() ;
			}
			if($(".reportresult").length==1){
				$(".reportresult").hide() ;
			}
			
		});
	});
}

/**
 * 查询检查单模板,与检查单对象
 * @param jcd {jcxmIds:''}
 * @returns {___anonymous6370_6468}
 */
function baogao_moban_ajax(jcd){
	var url_findBaogaoMobansByBaogaoMoban = "/publish/baogaomoban/findBaogaoMobansByBaogaoMoban.htm";// 根据报告模板对象查询报告模板
	var data_obj_findBaogaoMobansByBaogaoMoban = getJSONData(
			url_findBaogaoMobansByBaogaoMoban, {
//				bumenId : jcd.jcksId,// 检查科室ID
				jcxmIds : jcd.jcxmIds,// 检查项目ID
				tag : Math.random()
			}, "POST").obj;// 报告模板对象
	var baogaoMoban_jcd = null;
	if (data_obj_findBaogaoMobansByBaogaoMoban != null
			&& data_obj_findBaogaoMobansByBaogaoMoban.length != 0) {
		baogaoMoban_jcd = data_obj_findBaogaoMobansByBaogaoMoban[data_obj_findBaogaoMobansByBaogaoMoban.length - 1];
		mobanId = baogaoMoban_jcd.id;
	}
	if (baogaoMoban_jcd == null) {
		$.oimsAlert("未配置报告模板");
		return;
	}
	var parameter = {
		jcd : jcd,
		baogaomoban : data_obj_findBaogaoMobansByBaogaoMoban,
		tag : Math.random()
	};
	return parameter ;
} ;



// 打开出报告窗口(报告管理和检查管理中已检完成功能)
function openDialog_outBaogao_baogaoAll(param) {
	dataObjects_choice = null;// 选中行的数据
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert("请选择检查单");
		return;
	}
	dataObjects_choice = dataObjects;// 选中行的数据
	console.dir(dataObjects_choice[0]);
	var url_findBaogaoMobansByBaogaoMoban = "/publish/baogaomoban/findBaogaoMobansByBaogaoMoban.htm";// 根据报告模板对象查询报告模板
	var data_obj_findBaogaoMobansByBaogaoMoban = getJSONData(
			url_findBaogaoMobansByBaogaoMoban, {
				bumenId : dataObjects[0].jcksId,// 检查科室ID
				jcxmIds : dataObjects[0].jcxmIds,// 检查项目ID
				tag : Math.random()
			}, "post").obj;// 报告模板对象
	var baogaoMoban_jcd = null;
	if (data_obj_findBaogaoMobansByBaogaoMoban != null
			&& data_obj_findBaogaoMobansByBaogaoMoban.length != 0) {
		baogaoMoban_jcd = data_obj_findBaogaoMobansByBaogaoMoban[data_obj_findBaogaoMobansByBaogaoMoban.length - 1];
		mobanId = baogaoMoban_jcd.id;
	}
	if (baogaoMoban_jcd == null) {
		$.oimsAlert("未配置报告模板");
		return;
	}
	//$("#right").html("");// 清空中部div
	$("#ybaogodiv").hide();
	document.getElementById("isprintsuc").value="0";
	addTimeTag(dataObjects);
	var div_reportdiv = $("<div/>").attr("id", "div_reportdiv").attr("style","width:"+($("#right").width()-150)+";float:left;text-align:center");
//	.attr("style","overflow-x:hidden;overflow-y:hidden;");// 主div
	$(div_reportdiv).appendTo("#right");
	var div_reportView = $("<div/>").attr("id", "div_reportView").appendTo(div_reportdiv);// 报告模板主DIV
	var div_reportresult = $("<div/>").attr("id", "div_reportresult").attr(
			"class", "reportresult").appendTo(div_reportdiv);// 报告模板主DIV
	$(div_reportresult).html(baogaoMoban_jcd.moban);// 模板内容
	var div_buttonsytle1 = $("<div/>").attr("id", "div_buttonsytle1").attr(
			"class", "buttonsytle1").attr("style",
			"width: 640px;margin: 0px auto;");// 操作按钮div
	$(div_buttonsytle1).appendTo(div_reportdiv);// 追加到主div
	var a_report = "<a id='a_printreport' class='btnone'><span class='print'></span>"
			+ "打印" + "</a>";// 打印报告信息
	$(a_report).appendTo(div_buttonsytle1);
	var a_save = "<a id='a_savebaogao' class='btnone'><span class='save'></span>"
			+ "保存" + "</a>";// 保存报告信息
	$(a_save).appendTo(div_buttonsytle1);
	var a_jwbaogao = "<a id='a_jwbaogao' class='btnone'><span class='doing'></span>"
		+ "原眼科" + "</a>";
	$(a_jwbaogao).appendTo(div_buttonsytle1);
	var a_bingli = "<a id='a_bingli' class='btnone'><span class='doing'></span>"
		+ "病历" + "</a>";
	$(a_bingli).appendTo(div_buttonsytle1);
	var a_close = "<a id='a_closebaogao' class='btnone'><span class='close'></span>"
			+ "关闭" + "</a>";
	$(a_close).appendTo(div_buttonsytle1);
	var windowOpen;
	$("#a_closebaogao").mousedown(function(){
		if(windowOpen!=undefined){
			windowOpen.close();
		}
	  $("#div_view").remove();
	  $("#div_reportdiv").remove();
	  $("#ybaogodiv").show();
		if($("#isprintsuc").val()==1){
		     var options = document.getElementsByName("checkBoxObj");
		     for ( var i = 0; i < options.length; i++) {
		    	 if (options[i].checked) {
		    	    $(options[i].parentNode.parentNode).remove();
		         }
		    } 
		}
	});
	$("#a_jwbaogao").click(function(){
		showHospitalDataByJCXM(dataObjects_choice[0].binglihao,dataObjects_choice[0].jcxmIds);
	});
	$("#a_bingli").click(function(){
		
		windowOpen = window.open("/OIMS/emr/emr.jsp?binglihao="+dataObjects_choice[0].binglihao);
		windowOpen.onload=function(){$(windowOpen.document.getElementById('vistListDiv')).find('ul').children('li:first').children('p').click();};
	});
	reportController(dataObjects_choice[0].jcxmIds);
	//定位报告模li
	$.each($('#leftMenu').find('input'),function(){
		if($(this).val()==dataObjects_choice[0].jcdid){
			$(this).parent('li').addClass('on').focus();
			return false;
		}
	});
	//li.on上下移动时候模板内容跟着变
	$(window).keyup(function(e){
		var l=$('#leftMenu').find('li.on');
		if($(l).length){
			if(e.keyCode==38){
				if($(l).is("li:first-child")){
					return false;
				}else{
					$(l).removeClass('on');
					$(l).prev().click();
				}
			}else if(e.keyCode==40){
				if($(l).is("li:last-child")){
					return false;
				}else{
					$(l).removeClass('on');
					$(l).next().click();
				}
			}
		}
		
	});
}
// 查看报告（阅片和医生工作站）弹页面
function seeReportButUpdate(jcd,tag) {
	var url_findBaogaoMobansByBaogaoMoban = "/publish/baogaomoban/findBaogaoMobansByBaogaoMoban.htm";// 根据报告模板对象查询报告模板
	var data_obj_findBaogaoMobansByBaogaoMoban = getJSONData(
			url_findBaogaoMobansByBaogaoMoban, {
//				bumenId : jcd.jcksId,// 检查科室ID
				jcxmIds : jcd.jcxmIds,// 检查项目ID
				tag : Math.random()
			}, "POST").obj;// 报告模板对象
	var baogaoMoban_jcd = null;
	if (data_obj_findBaogaoMobansByBaogaoMoban != null
			&& data_obj_findBaogaoMobansByBaogaoMoban.length != 0) {
		baogaoMoban_jcd = data_obj_findBaogaoMobansByBaogaoMoban[data_obj_findBaogaoMobansByBaogaoMoban.length - 1];
		mobanId = baogaoMoban_jcd.id;
	}
	if (baogaoMoban_jcd == null) {
		$.oimsAlert("未配置报告模板");
		return;
	}
	var parameter = {
		jcd : jcd,
		baogaomoban : data_obj_findBaogaoMobansByBaogaoMoban,
		tag : Math.random()
	};
	var parameterString = JSON.stringify(parameter);
	var div_reportdiv = "<div id='div_reportdiv' style='overflow-x:hidden;overflow-y:hidden;'>"
			+ "<div class='reportresult'>"
			+ baogaoMoban_jcd.moban
			+ "</div>"
			+ "</div>";
	
	var html_baogao = "";
	html_baogao += "<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'>";
	html_baogao += "<html>";
	html_baogao += "<head>";
	html_baogao += "<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>";
	html_baogao += "<title>报告预览</title>";
	html_baogao += "<script language='javascript'> var contextPath='"
			+ contextPath + "';</script>";
	html_baogao += "<link rel='stylesheet' type='text/css' href='"
			+ contextPath + "/css/main.css' rel='stylesheet' type='text/css'>";
	html_baogao += "<link rel='stylesheet' type='text/css' href='"
			+ contextPath
			+ "/style/green/css/green.css' rel='stylesheet' type='text/css'>";
	html_baogao += "<link rel='stylesheet' type='text/css' href='"
			+ contextPath + "/css/icon.css' rel='stylesheet' type='text/css'>";
	html_baogao += "<link rel='stylesheet' type='text/css' href='"
			+ contextPath
			+ "/style/green/css/openWin.css' rel='stylesheet' type='text/css'>";
	html_baogao += "<script src='" + contextPath
			+ "/js/jquery.min.js'></script>";
	html_baogao += "<script src='" + contextPath + "/js/common.js'></script>";
	html_baogao += "<script src='" + contextPath
			+ "/js/jquery.oimsDialog.js'></script>";
	html_baogao += "<script src='" + contextPath
			+ "/js/manager/baogao/language.config.js'></script>";
	html_baogao += "<script src='" + contextPath
			+ "/js/manager/baogao/initialBaoGao.js'></script>";
	html_baogao += "<script src='" + contextPath
			+ "/js/oimsCategory.config.js'></script>";
	html_baogao += "<script src='" + contextPath + "/js/common.js'></script>";
	html_baogao += "<script src='" + contextPath
			+ "/js/manager/baogao/reportPreview.js?tag=" + Math.random()
			+ "' charset='UTF-8'></script>";
	html_baogao += "<script type='text/javascript'>";
	html_baogao += "var parameter=" + parameterString + ";";
	html_baogao += "</script>";
	html_baogao += "</head>";
	html_baogao += "<body id='body_baogao' text-align='center' >";
	html_baogao += div_reportdiv;
	html_baogao += "</body>";
	html_baogao += "</html>";
	if(tag==null||tag==undefined){
		var printWindow = window.open("");
		printWindow.document.write(html_baogao);
		printWindow.document.close();	
	}else{
		var iframe  = $("<iframe id='ifr_printView' />").attr("style","height:"+($("#right").height()-50)+"px;width:"+($("#right").width()-276)+"px;border:0;").appendTo($(tag));
		var win = iframe[0].contentWindow;
		win.document.write(html_baogao);
		win.document.close();
	}
	
}

/*
 * //查看报告（阅片和医生工作站）弹页面 function seeReportButUpdate(jcd) { var
 * url_findBaogaoMobansByBaogaoMoban =
 * "/publish/baogaomoban/findBaogaoMobansByBaogaoMoban.htm";// 根据报告模板对象查询报告模板
 * var data_obj_findBaogaoMobansByBaogaoMoban = getJSONData(
 * url_findBaogaoMobansByBaogaoMoban, { bumenId : jcd.jcksId,// 检查科室ID jcxmIds :
 * jcd.jcxmIds,// 检查项目ID tag : Math.random() }, "post").obj;// 报告模板对象 var
 * baogaoMoban_jcd = null; if (data_obj_findBaogaoMobansByBaogaoMoban != null &&
 * data_obj_findBaogaoMobansByBaogaoMoban.length != 0) { baogaoMoban_jcd =
 * data_obj_findBaogaoMobansByBaogaoMoban[data_obj_findBaogaoMobansByBaogaoMoban.length -
 * 1]; mobanId = baogaoMoban_jcd.id; } if (baogaoMoban_jcd == null) {
 * $.oimsAlert("未配置报告模板"); return; } var parameter = { jcd : jcd, baogaomoban :
 * data_obj_findBaogaoMobansByBaogaoMoban, tag : Math.random() }; parameter =
 * JSON.stringify(parameter); // var winDiv = $("<div />").appendTo("body") //
 * $(printWindow).oimsDialog({ // winType : 4, // icon : "view", // title :
 * "录入", // drag : false, // locked : true, // width : "740", //
 * height:undefined // }); var div_reportdiv = "<div id='div_reportdiv'
 * style='overflow-x:hidden;overflow-y:hidden;'>" + "<div
 * class='reportresult'>" + baogaoMoban_jcd.moban + "</div>" + "</div>"; //
 * var printWindow = window.open(""); var printWindow = $("<iframe />").css({
 * width : "740", height : "auto" }).appendTo("body"); var html_baogao = "";
 * html_baogao += "<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01
 * Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'>"; html_baogao += "<html>";
 * html_baogao += "<head>"; html_baogao += "<meta http-equiv='Content-Type'
 * content='text/html; charset=UTF-8'>"; html_baogao += "<title>报告预览</title>";
 * html_baogao += "<script language='javascript'> var contextPath='" +
 * contextPath + "';</script>"; html_baogao += "<link rel='stylesheet'
 * type='text/css' href='" + contextPath + "/css/main.css' rel='stylesheet'
 * type='text/css'>"; html_baogao += "<link rel='stylesheet' type='text/css'
 * href='" + contextPath + "/style/green/css/green.css' rel='stylesheet'
 * type='text/css'>"; html_baogao += "<link rel='stylesheet' type='text/css'
 * href='" + contextPath + "/css/icon.css' rel='stylesheet' type='text/css'>";
 * html_baogao += "<link rel='stylesheet' type='text/css' href='" + contextPath +
 * "/style/green/css/openWin.css' rel='stylesheet' type='text/css'>";
 * html_baogao += "<script src='" + contextPath + "/js/jquery.min.js'></script>";
 * html_baogao += "<script src='" + contextPath + "/js/common.js'></script>";
 * html_baogao += "<script src='" + contextPath + "/js/jquery.oimsDialog.js'></script>";
 * html_baogao += "<script src='" + contextPath +
 * "/js/manager/baogao/language.config.js'></script>"; html_baogao += "<script
 * src='" + contextPath + "/js/manager/baogao/initialBaoGao.js'></script>";
 * html_baogao += "<script src='" + contextPath + "/js/oimsCategory.config.js'></script>";
 * html_baogao += "<script src='" + contextPath + "/js/common.js'></script>";
 * html_baogao += "<script src='" + contextPath +
 * "/js/manager/baogao/reportPreview.js?tag=" + Math.random() + "'
 * charset='UTF-8'></script>"; html_baogao += "<script
 * type='text/javascript'>"; html_baogao += "var parameter=" + parameter + ";";
 * html_baogao += "</script>"; html_baogao += "</head>"; html_baogao += "<body
 * id='body_baogao' text-align='center' >"; html_baogao += div_reportdiv;
 * html_baogao += "</body>"; html_baogao += "</html>";
 * printWindow.contentWindow.document.write(html_baogao); //
 * printWindow.document.close(); printWindow.html(html_baogao);
 * 
 * $(printWindow).oimsDialog({ winType : 4, icon : "view", title : "录入", drag :
 * false, locked : true, width : "740", height : undefined }); // var
 * div_reportdiv = "<div id='div_reportdiv' //
 * style='overflow-x:hidden;overflow-y:hidden;'>" // + "<div
 * class='reportresult'>" // + baogaoMoban_jcd.moban // + "</div>" // + "</div>";
 *  // var width = $("#div_reportdiv").width(); // $(".openWin").css({ // width :
 * width // });
 *  }
 */

// 获取到检查项目后自动加载
function reportController(jcxmIds) {
	if (jcxmIds == json_jcxm.anshiyingjiancha||jcxmIds == json_jcxm.gfs) {// 暗适应
		initData_eyejmdxt();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyejmdxt);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyejmdxt);
		// //$("#a_closebaogao").bind("click", renovate_BaoGaoNotIs);
	} else if (jcxmIds == json_jcxm.jiaomoneipijishu) {// 角膜内皮计数
		initData_eyejmspjs();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyejmspjs);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyejmspjs);
		// $("#a_closebaogao").bind("click", renovate_BaoGaoNotIs);
	} else if (jcxmIds == json_jcxm.jiaomoqulvji) {// 角膜曲率计
		initData_eyejmqlj();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyejmqlj);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyejmqlj);
		// $("#a_closebaogao").bind("click", renovate_BaoGaoNotIs);
	} else if (jcxmIds == json_jcxm.qianfangjiaojing) {// 前房角镜
		initData_eyeqfjj();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyeqfjj);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyeqfjj);
		// $("#a_closebaogao").bind("click", renovate_BaoGaoNotIs);
	} else if (jcxmIds == json_jcxm.jiufangwei) {// 九方位斜视角
		initData_eyetsjjfw();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyetsjjfw);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyetsjjfw);
		// $("#a_closebaogao").bind("click", renovate_BaoGaoNotIs);
	} else if (jcxmIds == json_jcxm.sanjishigongneng) {// 三级视功能（同视机）
		initData_eyetsjsj();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyetsjsj);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyetsjsj);
		// $("#a_closebaogao").bind("click", renovate_BaoGaoNotIs);
	} else if (jcxmIds == json_jcxm.bchao) { //B超
		
		initData_eyebchao();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyebchao);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyebchao);
		// $("#a_closebaogao").bind("click", renovate_BaoGaoNotIs);
	}else if(jcxmIds==json_jcxm.qianfangshendu){
		initData_eyeqianfangshendu();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyeqianfangshendu);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyeqianfangshendu);
	}
	 else if (jcxmIds == json_jcxm.yanya) {// 眼压
		initData_eyeballpress();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyeballpress);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyeballpress);
		// $("#a_closebaogao").bind("click", renovate_BaoGaoNotIs);
	} else if (jcxmIds == json_jcxm.yinxiejiancha
			|| jcxmIds == json_jcxm.mashigan) {// 隐斜、马氏杆试验
		initData_eyeyxjc();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyeyxjc);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyeyxjc);
		// $("#a_closebaogao").bind("click", renovate_BaoGaoNotIs);
	} else if (jcxmIds == json_jcxm.sanmianjing) {// 三面镜
		initData_eyesmj();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyesmj);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyesmj);
		// $("#a_closebaogao").bind("click", renovate_BaoGaoNotIs);
	} else if (jcxmIds == json_jcxm.ubm) { // UBM
		initData_eyeubm();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyeubm);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyeubm);
		// $("#a_closebaogao").bind("click", renovate_BaoGaoNotIs);
	} else if (jcxmIds == json_jcxm.achao 
		|| jcxmIds == json_jcxm.iolmaster
			|| jcxmIds == json_jcxm.rgjtdsjs) { // A超、Iolmaster、人工晶体度数测量
		initData_eyect();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyect);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyect);
		// $("#a_closebaogao").bind("click", renovate_BaoGaoNotIs);
	} else if (jcxmIds == json_jcxm.oct_huangbangqu_shipan
			|| jcxmIds == json_jcxm.oct_huangbangqu
			|| jcxmIds == json_jcxm.oct_shipan
			|| jcxmIds == json_jcxm.oct_qianjie
			|| jcxmIds == json_jcxm.oct_xlcx) { // OCT 4
		initData_eyeoct();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyeoct);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyeoct);
		// $("#a_closebaogao").bind("click", renovate_BaoGaoNotIs);
	} else if (jcxmIds == json_jcxm.ygzy_yinduoqinglv
			|| jcxmIds == json_jcxm.ygzy_yiguangsunan
			|| jcxmIds == json_jcxm.ygzy_lishede
			||jcxmIds == json_jcxm.ydzx_litizhaoxiang
			|| jcxmIds == json_jcxm.ydzx
			|| jcxmIds == json_jcxm.zfygFFA
			|| jcxmIds == json_jcxm.zfygICGA) { // 眼底荧光照影3
		initData_eyeygzy();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyeygzy);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyeygzy);
		// $("#a_closebaogao").bind("click", renovate_BaoGaoNotIs);
	} else 
//		if () { // 眼底照相2
//		initData_eyeydzx();
//		if ($("#a_printreport").length == 1)
//			$("#a_printreport").bind("click", previewEyeydzx);
//		if ($("#a_savebaogao").length == 1)
//			$("#a_savebaogao").bind("click", saveOrUpdateEyeydzx);
		// $("#a_closebaogao").bind("click", renovate_BaoGaoNotIs);
//	} else 
		if (jcxmIds == json_jcxm.shiye 
			|| jcxmIds == json_jcxm.weishiye) { //视野2
		initData_eyegcsy();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyegcsy);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyegcsy);
		// $("#a_closebaogao").bind("click", renovate_BaoGaoNotIs);
	} else if (jcxmIds == json_jcxm.dsl_fvep) { //电生理-fvep
		initData_eyeFVEP();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyeFVEP);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyeFVEP);
	} else if (jcxmIds == json_jcxm.dsl_pvep) { //电生理-pvep
		initData_eyePVEP();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyePVEP);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyePVEP);
	} else if (jcxmIds == json_jcxm.dsl_ferg) { //电生理-ferg
		initData_eyeFERG();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyeFERG);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyeFERG);
	} else if (jcxmIds == json_jcxm.dsl_perg) { ////电生理-perg
		initData_eyePERG();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyePERG);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyePERG);
	} else if (jcxmIds == json_jcxm.dsl_mf_erg) { //电生理-mf-erg
		initData_eyeMfERG();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyeMfERG);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyeMfERG);
	} else if (jcxmIds == json_jcxm.dsl_eog) { //电生理-eog
		initData_eyeEOG();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyeEOG);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyeEOG);
	} else if (jcxmIds == json_jcxm.jiguangzhiliao//激光治疗
			 ||jcxmIds == json_jcxm.jgqnmsjs//激光前囊膜松解术
			 ||jcxmIds == json_jcxm.hmzbqcs//虹膜周边切除术
			 ||jcxmIds == json_jcxm.swmdbcjggn//视网膜多波长激光光凝
			 ||jcxmIds == json_jcxm.pdt//光动力疗法（PDT）
			 ||jcxmIds == json_jcxm.ttt//经瞳孔温热疗法（TTT）
			 ||jcxmIds == json_jcxm.jghnmqks//激光后囊膜切开术
			 ||jcxmIds == json_jcxm.khjggmbfxqds//氪黄激光巩膜瓣缝线切断术
			 ||jcxmIds == json_jcxm.adkscmqks//安顿孔渗出膜切开术
			 ||jcxmIds == json_jcxm.tkqscmqks//瞳孔区渗出膜切开术
			 ||jcxmIds == json_jcxm.jgzlqgy//激光治疗青光眼（SLT）
			 ||jcxmIds == json_jcxm.jghmbmxsxgfbs//激光虹膜表面新生血管封闭术
			 ||jcxmIds == json_jcxm.yagjghmcmqks
			 ||jcxmIds == json_jcxm.jghmzbcxs) { //YAG激光虹膜残膜切开术
		initData_eyejgzl();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyejgzl);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyejgzl);
	} else if (jcxmIds == json_jcxm.ruoshizhiliao) { //弱视治疗
		initData_eyetsjzl();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyetsjzl);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyetsjzl);
	} else if (jcxmIds == json_jcxm.teshushili||jcxmIds == json_jcxm.tuxingshili) { //特殊视力、图形视力检查
		initData_eyetsli();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyetsli);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyetsli);
	} else if (jcxmIds == json_jcxm.dishilizhushiqi) { //低视力助视器
		initData_eyedslzsq();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyedslzsq);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyedslzsq);
	} else if (jcxmIds == json_jcxm.tiaojiefucou) { //调节辐辏
		initData_eyexsjc();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyexsjc);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyexsjc);
	} else if (jcxmIds == json_jcxm.ktYanguang
			||jcxmIds == json_jcxm.xtYanguang
			||jcxmIds == json_jcxm.weimangjiancha||jcxmIds ==json_jcxm.xtygedtrs) {// 小瞳验光、扩瞳验光、伪盲检查
		initData_eyeygnew();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyeygnew);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyeygnew);
	} else if (jcxmIds == json_jcxm.sejuejiancha) {// 色觉检查
		initData_eyesjjc();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyesjjc);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyesjjc);
	} else if (jcxmIds == json_jcxm.yanweiyanji) {// 眼位眼肌
		initData_eyeywyj();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyeywyj);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyeywyj);
	} else if (jcxmIds == json_jcxm.sanlengjing
			||jcxmIds == json_jcxm.xieshiduceding) {// 三棱镜
		initData_eyeslj();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyeslj);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyeslj);
	} else if (jcxmIds == json_jcxm.jiaomohoudu) {// 角膜厚度
		initData_eyejmhd();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyejmhd);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyejmhd);
	} else if (jcxmIds == json_jcxm.liexidengzhaoxiang) {// 裂隙灯照相
		initData_eyelxdzx();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyelxdzx);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyelxdzx);
	}else if (jcxmIds == json_jcxm.zhushixingzhi
			||jcxmIds == json_jcxm.yizhiandian) { // 注视性质检查，抑制暗点
		initData_eyezsxz();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyezsxz);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyezsxz);
	}else if (jcxmIds == json_jcxm.leidaochongxi) { // 泪道冲洗
		initData_eyeldcx();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyeldcx);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyeldcx);
	}else if (jcxmIds == json_jcxm.fushijiancha) { // 复视检查
		initData_eyejm();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyejm);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyejm);
	}else if (jcxmIds == json_jcxm.budengxiang) { // 不等像检查
		initData_eyebdx();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyebdx);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyebdx);
	}else if(jcxmIds == json_jcxm.duibimingandu||jcxmIds==json_jcxm.jiaomodixingtu||jcxmIds==json_jcxm.jmdxtsirius){//对比敏感度
		initData_eyemingandu();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyemingandu);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyemingandu);
	}else if(jcxmIds == json_jcxm.retcam){
		//Retcam
		
		initData_eyeRetcam();
		if ($("#a_printreport").length == 1)
			$("#a_printreport").bind("click", previewEyeRetcam);
		if ($("#a_savebaogao").length == 1)
			$("#a_savebaogao").bind("click", saveOrUpdateEyeRetcam);
	
	}
	// else {
	// console.log("其他检查项目");
	// }
	var buttom_tr = null ;
	for(var tr=$("#doctor");!tr.is('tr');){
		tr = tr.parent();
		if(tr.is("tr")){
			buttom_tr = tr ;
			break ;
		}
	}
	buttom_tr.attr('id','_tr_shqm') ;
	/*只处理以下这些检查项目*/
	if(jcxmIds==json_jcxm.ydzx||
			jcxmIds==json_jcxm.ygzy_lishede||
			
			jcxmIds==json_jcxm.oct_qianjie||
			jcxmIds==json_jcxm.oct_shipan||
			jcxmIds==json_jcxm.oct_huangbangqu||
			jcxmIds==json_jcxm.oct_huangbangqu_shipan||
			jcxmIds==json_jcxm.dsl_fvep||
			jcxmIds==json_jcxm.dsl_pvep||
			jcxmIds==json_jcxm.dsl_perg||
			jcxmIds==json_jcxm.dsl_ferg||
			jcxmIds==json_jcxm.dsl_mf_erg||
			jcxmIds==json_jcxm.dsl_eog||
			
			jcxmIds==json_jcxm.achao||
			jcxmIds==json_jcxm.bchao||
			jcxmIds==json_jcxm.ubm||
			jcxmIds==json_jcxm.iolmaster||
			
			jcxmIds==json_jcxm.sanmianjing||
			jcxmIds==json_jcxm.qianfangjiaojing||
			jcxmIds==json_jcxm.jgqnmsjs||
			jcxmIds==json_jcxm.hmzbqcs||
			jcxmIds==json_jcxm.swmdbcjggn||
			jcxmIds==json_jcxm.pdt||
			jcxmIds==json_jcxm.ttt||
			jcxmIds==json_jcxm.jghnmqks||
			jcxmIds==json_jcxm.khjggmbfxqds||
			jcxmIds==json_jcxm.adkscmqks||
			jcxmIds==json_jcxm.tkqscmqks||
			jcxmIds==json_jcxm.jgzlqgy||
			jcxmIds==json_jcxm.jghmbmxsxgfbs||
			jcxmIds==json_jcxm.yagjghmcmqks||
			jcxmIds==json_jcxm.zfygFFA||
			jcxmIds==json_jcxm.zfygICGA
			){
		/*调整页面布局*/
		buttom_tr.find('th').each(function(i,el){
			$(el).width("10%") ;
		}) ; 
		buttom_tr.find('td').each(function(i,el){
			$(el).width("15%") ;
		}) ;
		/*代码有bug，不加判断会加3次*/
		if(buttom_tr.find('img').length==0){
			/*为不同的检查项目添加不同的审核医生*/
			if(jcxmIds==json_jcxm.ydzx||
					jcxmIds==json_jcxm.ygzy_lishede||
					jcxmIds==json_jcxm.zfygFFA||
					jcxmIds==json_jcxm.zfygICGA){
				buttom_tr.append("<td><div style='position:absolute; '><img src='../images/ysqm/ys_sun_cheng.png' width=60 /></td>") ;
				var p = buttom_tr.find('div').position() ;
				buttom_tr.find('div').css("top",p.top-25).hide();
			}
			if(jcxmIds==json_jcxm.oct_qianjie||
				jcxmIds==json_jcxm.oct_shipan||
				jcxmIds==json_jcxm.oct_huangbangqu||
				jcxmIds==json_jcxm.oct_huangbangqu_shipan||
				jcxmIds==json_jcxm.dsl_fvep||
				jcxmIds==json_jcxm.dsl_pvep||
				jcxmIds==json_jcxm.dsl_perg||
				jcxmIds==json_jcxm.dsl_ferg||
				jcxmIds==json_jcxm.dsl_mf_erg||
				jcxmIds==json_jcxm.dsl_eog){
				buttom_tr.append("<td><div style='position:absolute; '><img src='../images/ysqm/ys_zhang_min_fan.png' width=60 /></td>") ;
				var p = buttom_tr.find('div').position() ;
				buttom_tr.find('div').css("top",p.top-25).hide();
			}
			if(jcxmIds==json_jcxm.achao||
				jcxmIds==json_jcxm.bchao||
				jcxmIds==json_jcxm.ubm||
				jcxmIds==json_jcxm.iolmaster){
				buttom_tr.append("<td><div style='position:absolute; '><img src='../images/ysqm/ys_chen_jun.png' width=60 /></td>") ;
				var p = buttom_tr.find('div').position() ;
				buttom_tr.find('div').css("top",p.top-25).hide();
			}
			if(jcxmIds==json_jcxm.sanmianjing||
					jcxmIds==json_jcxm.qianfangjiaojing||
					jcxmIds==json_jcxm.jgqnmsjs||
					jcxmIds==json_jcxm.hmzbqcs||
					jcxmIds==json_jcxm.swmdbcjggn||
					jcxmIds==json_jcxm.pdt||
					jcxmIds==json_jcxm.ttt||
					jcxmIds==json_jcxm.jghnmqks||
					jcxmIds==json_jcxm.khjggmbfxqds||
					jcxmIds==json_jcxm.adkscmqks||
					jcxmIds==json_jcxm.tkqscmqks||
					jcxmIds==json_jcxm.jgzlqgy||
					jcxmIds==json_jcxm.jghmbmxsxgfbs||
					jcxmIds==json_jcxm.yagjghmcmqks){
				buttom_tr.append("<td><div style='position:absolute; '><img src='../images/ysqm/ys_ran_li.png' width=60 /></td>") ;
				var p = buttom_tr.find('div').position() ;
				buttom_tr.find('div').css("top",p.top-25).hide();
			}
		}
	}
	
}
// 查看报告（阅片和医生工作站）弹框
/*
 * function report_wenzhi(jcd) { initCssAndJs_baogaoAll(); var
 * url_findBaogaoMobansByBaogaoMoban =
 * "/publish/baogaomoban/findBaogaoMobansByBaogaoMoban.htm";// 根据报告模板对象查询报告模板
 * var data_obj_findBaogaoMobansByBaogaoMoban = getJSONData(
 * url_findBaogaoMobansByBaogaoMoban, { bumenId : jcd.jcksId,// 检查科室ID jcxmIds :
 * jcd.jcxmIds,// 检查项目ID tag : Math.random() }, "post").obj;// 报告模板对象 var
 * baogaoMoban_jcd = null; if (data_obj_findBaogaoMobansByBaogaoMoban != null &&
 * data_obj_findBaogaoMobansByBaogaoMoban.length != 0) { baogaoMoban_jcd =
 * data_obj_findBaogaoMobansByBaogaoMoban[data_obj_findBaogaoMobansByBaogaoMoban.length -
 * 1]; mobanId = baogaoMoban_jcd.id; } if (baogaoMoban_jcd == null) {
 * $.oimsAlert("未配置报告模板"); return; } reportController(jcd.jcxmIds) var
 * div_reportdiv = $("<div/>").attr("id", "div_reportdiv").attr("style",
 * "overflow-x:hidden;overflow-y:hidden;");// 主div //
 * $(div_reportdiv).appendTo("#right"); var div_reportresult = $("<div/>").attr("id",
 * "div_reportresult").attr( "class", "reportresult").appendTo(div_reportdiv);//
 * 报告模板主DIV $(div_reportresult).html(baogaoMoban_jcd.moban);// 模板内容
 * 
 * $(div_reportdiv).oimsDialog({ winType : 4, icon : "view", title : "录入", drag :
 * false, locked : true, width : "740", height : undefined }); // var width =
 * $("#div_reportdiv").width(); // var height = $("#div_reportdiv").height(); //
 * $(".openWin").css({ // width : width, // height : height + 30 // }); }
 */
/* ====================================文字报告==================================== */
function initCssAndJs_baogao_wenzi() {
	importJS("/js/jquery.jqprint-0.3.js");
	importJS("/js/jquery.input.js");
	importJS("/js/oims_dengbi.js");
	importJS("/js/manager/baogao/initialBaoGao.js");
	importJS("/js/manager/jiancha/eyeReportCommon.js"); // 加载关闭Dialog的窗口时初始化待见患者界面
	importJS("/js/manager/baogao/eyejmdxt.js");// 暗适应检查报告JS
	// importJS("/js/manager/jiancha/eyejmspjs.js");// 角膜内皮计数检查报告JS
	importJS("/js/manager/baogao/eyejmqlj.js");// 角膜曲率计检查报告JS
	importJS("/js/manager/baogao/eyeqfjj.js");// 前房角镜检查报告JS
	importJS("/js/manager/baogao/eyetsjjfw.js");// 九方位检查报告JS
	importJS("/js/manager/baogao/eyetsjsj.js");// 三级视功能检查报告JS
	// importJS("/js/manager/jiancha/eyebchao.js");// B超检查报告JS
	importJS("/js/manager/baogao/eyeballpress.js");// 眼压检查报告JS
	importJS("/js/manager/baogao/eyeyxjc.js"); // 隐斜检查报告JS
	importJS("/js/manager/baogao/eyesmj.js");// 三面镜检查报告JS
	// importJS("/js/manager/jiancha/eyeubm.js");// 超声生物显微镜(UBM)检查报告JS
	// importJS("/js/manager/jiancha/eyect.js");// A超检查报告JS
	// importJS("/js/manager/jiancha/eyeoct.js");// OCT检查报告JS
	// importJS("/js/manager/jiancha/eyeygzy.js");// 荧光造影检查报告JS
    importJS("/js/manager/baogao/eyezsxz.js");// 注视性质检查报告JS
	importJS("/js/manager/baogao/eyejgzl.js");// 激光治疗报告JS
	importJS("/js/manager/baogao/eyetsjzl.js");// 弱視治疗报告JS
	importJS("/js/manager/baogao/eyetsli.js");// 特殊视力检查录入报告JS
	importJS("/js/manager/baogao/eyedslzsq.js");// 低视力助视器检查录入报告JS
	importJS("/js/manager/baogao/eyexsjc.js");// 调节辐辏检查报告JS
	importJS("/js/manager/baogao/eyeygnew.js");// 验光检查报告JS
	importJS("/js/manager/baogao/eyesjjc.js");// 色觉检查报告JS
	importJS("/js/manager/baogao/eyeywyj.js");// 眼位眼肌检查报告JS
	importJS("/js/manager/baogao/eyeslj.js");// 三棱镜检查报告JS
	importJS("/js/manager/baogao/eyejmhd.js");// 角膜厚度检查报告JS
	importJS("/js/manager/baogao/eyebldcx.js");// 泪道冲洗报告JS
	importJS("/js/manager/baogao/eyejm.js");// 复视报告JS
	importJS("/js/manager/baogao/eyebdx.js");// 不等像检查报告JS
	importJS("/js/manager/baogao/eyeqianfangshendu.js");// 不等像检查报告JS
}
// 文字报告控制
function reportControllerWenZi(jcxmIds, baogaoMoban_jcd) {
	initCssAndJs_baogao_wenzi();
	if (jcxmIds == json_jcxm.anshiyingjiancha) { // 暗适应
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyejmdxt();
		$("#a_printreport").bind("click", previewEyejmdxt);
		$("#a_savebaogao").bind("click", function() {
			saveOrUpdateEyejmdxt(true);
		});
	} else if (jcxmIds == json_jcxm.jiaomoqulvji) {// 角膜曲率
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyejmqlj();
		$("#a_printreport").bind("click", previewEyejmqlj);
		$("#a_savebaogao").bind("click", function() {
			saveOrUpdateEyejmqlj(true);
		});
	} else if (jcxmIds == json_jcxm.qianfangjiaojing) {// 前房角镜
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyeqfjj();
		$("#a_printreport").bind("click", previewEyeqfjj);
		$("#a_savebaogao").bind("click", function() {
			saveOrUpdateEyeqfjj(true);
		});
	} else if (jcxmIds == json_jcxm.sanmianjing) {// 三面镜
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyesmj();
		$("#a_printreport").bind("click", previewEyesmj);
		$("#a_savebaogao").bind("click", function() {
			saveOrUpdateEyesmj(true);
		});
	} else if (jcxmIds == json_jcxm.jiguangzhiliao// 激光治疗
			 ||jcxmIds == json_jcxm.jgqnmsjs//激光前囊膜松解术
			 ||jcxmIds == json_jcxm.hmzbqcs//虹膜周边切除术
			 ||jcxmIds == json_jcxm.swmdbcjggn//视网膜多波长激光光凝
			 ||jcxmIds == json_jcxm.pdt//光动力疗法（PDT）
			 ||jcxmIds == json_jcxm.ttt//经瞳孔温热疗法（TTT）
			 ||jcxmIds == json_jcxm.jghnmqks//激光后囊膜切开术
			 ||jcxmIds == json_jcxm.khjggmbfxqds//氪黄激光巩膜瓣缝线切断术
			 ||jcxmIds == json_jcxm.adkscmqks//安顿孔渗出膜切开术
			 ||jcxmIds == json_jcxm.tkqscmqks//瞳孔区渗出膜切开术
			 ||jcxmIds == json_jcxm.jgzlqgy//激光治疗青光眼（SLT）
			 ||jcxmIds == json_jcxm.jghmbmxsxgfbs//激光虹膜表面新生血管封闭术
			 ||jcxmIds == json_jcxm.yagjghmcmqks) { //YAG激光虹膜残膜切开术
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyejgzl();
		$("#a_printreport").bind("click", previewEyejgzl);
		$("#a_savebaogao").bind("click", function() {
			saveOrUpdateEyejgzl(true);
		});
	} else if (jcxmIds == json_jcxm.ruoshizhiliao) { // 弱视治疗
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyetsjzl();
		$("#a_printreport").bind("click", previewEyetsjzl);
		$("#a_savebaogao").bind("click", function() {
			saveOrUpdateEyetsjzl(true);
		});
	} else if (jcxmIds == json_jcxm.tiaojiefucou) { // 调节辐辏
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyexsjc();
		$("#a_printreport").bind("click", previewEyexsjc);
		$("#a_savebaogao").bind("click", function() {
			saveOrUpdateEyexsjc(true);
		});
	} else if (jcxmIds == json_jcxm.teshushili) { // 特殊视力
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyetsli();
		$("#a_printreport").bind("click", previewEyetsli);
		$("#a_savebaogao").bind("click", function() {
			saveOrUpdateEyetsli(true);
		});
	} else if (jcxmIds == json_jcxm.dishilizhushiqi) { // 低视力助视器
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyedslzsq();
		$("#a_printreport").bind("click", previewEyedslzsq);
		$("#a_savebaogao").bind("click", function() {
			saveOrUpdateEyedslzsq(true);
		});
	} else if (jcxmIds == json_jcxm.ktYanguang
			||jcxmIds == json_jcxm.xtYanguang
			||jcxmIds == json_jcxm.weimangjiancha) { // 小瞳验光、扩瞳验光
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyeygnew();
		$("#a_printreport").bind("click", previewEyeygnew);
		$("#a_savebaogao").bind("click", function() {
			saveOrUpdateEyeygnew(true);
		});
	} else if (jcxmIds == json_jcxm.sejuejiancha) { // 色觉检查
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyesjjc();
		$("#a_printreport").bind("click", previewEyesjjc);
		$("#a_savebaogao").bind("click", function() {
			saveOrUpdateEyesjjc(true);
		});
	} else if (jcxmIds == json_jcxm.yanweiyanji) { // 眼位眼肌检查
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyeywyj();
		$("#a_printreport").bind("click", previewEyeywyj);
		$("#a_savebaogao").bind("click", function() {
			saveOrUpdateEyeywyj(true);
		});
	} else if (jcxmIds == json_jcxm.yanya) { // 眼压检查报告
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyeballpress();
		$("#a_printreport").bind("click", previewEyeballpress);
		$("#a_savebaogao").bind("click", function() {
			saveOrUpdateEyeballpress(true);
		});
	} else if (jcxmIds == json_jcxm.sanjishigongneng) { // 三级视功能（同视机）
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyetsjsj();
		$("#a_printreport").bind("click", previewEyetsjsj);
		$("#a_savebaogao").bind("click", function() {
			saveOrUpdateEyetsjsj(true);
		});
	} else if (jcxmIds == json_jcxm.jiufangwei) { // 九方位
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyetsjjfw();
		$("#a_printreport").bind("click", previewEyetsjjfw);
		$("#a_savebaogao").bind("click", function() {
			saveOrUpdateEyetsjjfw(true);
		});
	} else if (jcxmIds == json_jcxm.yinxiejiancha
			|| jcxmIds == json_jcxm.mashigan) { // 隐斜检查
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyeyxjc();
		$("#a_printreport").bind("click", previewEyeyxjc);
		$("#a_savebaogao").bind("click", function() {
			saveOrUpdateEyeyxjc(true);
		});
	} else if (jcxmIds == json_jcxm.sanlengjing
			||jcxmIds == json_jcxm.xieshiduceding) { // 三棱镜检查、斜视度测定
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyeslj();
		$("#a_printreport").bind("click", previewEyeslj);
		$("#a_savebaogao").bind("click", function() {
			saveOrUpdateEyeslj(true);
		});
	} else if (jcxmIds == json_jcxm.jiaomohoudu) { // 角膜厚度检查
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyejmhd();
		$("#a_printreport").bind("click", previewEyejmhd);
		$("#a_savebaogao").bind("click", function() {
			saveOrUpdateEyejmhd(true);
		});
	} else if (jcxmIds == json_jcxm.zhushixingzhi
			   ||jcxmIds == json_jcxm.yizhiandian ) { // 注释性质
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyezsxz();
		$("#a_printreport").bind("click", previewEyezsxz);
		$("#a_savebaogao").bind("click", function() {
			saveOrUpdateEyezsxz(true);
		});
	}else if (jcxmIds == json_jcxm.leidaochongxi) { // 泪道冲洗
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyeldcx();
		$("#a_printreport").bind("click", previewEyeldcx);
		$("#a_savebaogao").bind("click", function() {
		saveOrUpdateEyeldcx(true);
		});
	}else if (jcxmIds == json_jcxm.fushijiancha) { // 复视检查
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyejm();
		$("#a_printreport").bind("click", previewEyejm);
		$("#a_savebaogao").bind("click", function() {
		saveOrUpdateEyejm(true);
		});
	}else if (jcxmIds == json_jcxm.budengxiang) { // 不等像检查
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyebdx();
		$("#a_printreport").bind("click", previewEyebdx);
		$("#a_savebaogao").bind("click", function() {
		saveOrUpdateEyebdx(true);
		});
	}else if(jcxmIds==json_jcxm.retcam){
		init_Baogao_Moban(baogaoMoban_jcd);
		initData_eyeRetcam();
		$("#a_printreport").bind("click", previewEyeRetcam);
		$("#a_savebaogao").bind("click", function() {
		saveOrUpdateEyeRetcam(true);
		});
	
	} else {
		$.oimsAlert("请先上传图片，然后到已检患者中进行出报告");
	}
}


// 初始化文字报告模版
function init_Baogao_Moban(baogaoMoban_jcd) {
	var div_reportdiv = $("<div/>").attr("id", "div_reportdiv").attr("style",
			"overflow-x:hidden;overflow-y:hidden;");// 主div
	var div_reportresult = $("<div/>").attr("id", "div_reportresult").attr(
			"class", "reportresult").appendTo(div_reportdiv);// 报告模板主DIV
	$(div_reportresult).html(baogaoMoban_jcd.moban);// 模板内容
	var div_buttonsytle1 = $("<div/>").attr("id", "div_buttonsytle1").attr(
			"class", "buttonsytle1").attr("style",
			"width: 640px;margin: 0px auto;");// 操作按钮div
	$(div_buttonsytle1).appendTo(div_reportdiv);// 追加到主div

	var a_report = "<a id='a_printreport' class='btnone'><span class='print'></span>"
			+ "打印" + "</a>";// 打印报告信息
	$(a_report).appendTo(div_buttonsytle1);
	var a_save = "<a id='a_savebaogao' class='btnone'><span class='save'></span>"
			+ "保存" + "</a>";// 保存报告信息
	$(a_save).appendTo(div_buttonsytle1);
	var a_close = "<a id='a_closebaogao' class='btnone'><span class='close'></span>"
			+ "关闭" + "</a>";
	$(a_close).appendTo(div_buttonsytle1);

	$(div_reportdiv).oimsDialog({
		winType : 4,
		icon : "view",
		title : "录入",
		drag : false,
		locked : true,
		width : "740",
		height : "600"
	});
	var width = $("#div_reportdiv").width();
	var height = $("#div_reportdiv").height();

	$(".openWin").css({
		"width" : width,
		"height" : function(index, value) {
			var height = $("#div_reportdiv").height();
			var windowHeight = $(window).height();
			if (height <= windowHeight) {
				return height + 30;
			}
		}
	});
}

// var windowHeight = $(window).height();
// if(height>windowHeight){
// return {
// width:width
// }
// }else{
// return {
// width : width,
// height:height
// }
// }
/* ====================================文字报告==================================== */

/****************************************查看原眼科数据******************************************************/
function showHospitalDataByJCXM(binglihao,jcxmid){
	importJS("/js/manager/baogao/jiWangBaoGao.js");
	showHospitalData(binglihao,jcxmid);
}
/****************************************查看原眼科数据******************************************************/
