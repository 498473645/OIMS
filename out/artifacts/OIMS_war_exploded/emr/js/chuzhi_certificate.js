var saveorupdate_certificate_url='/publish/certificate/saveOrUpdateCertificate.htm';


//显示诊断证明弹出框
function showDoctorCertificate(){
	 var div=$("<div id='certificate' style='padding:10px'/>");
	 div.oimsDialog({
			title : "门诊诊断证明书",
			width : 700,
			height : 480,
			drag : false,
			locked :true,
			winType : 4,
			button : [{title:"新增",func:addDiagnosisCertificate,isCloseWin:false},
			          {title:"打印",func:saveDiagnosisCertificate,isCloseWin:false},
			          {title:"删除",func:delDiagnosisCertificate,isCloseWin:false}//,
			          //{title:"打印",func:printDiagnosisCertificate,isCloseWin:false}
					  ]
		});
	 _emr_certificate(div);
}
//初始化弹出框
function _emr_certificate(div){
	var form = $("<form id='emr_certificate'/>").attr("action",contextPath+saveorupdate_certificate_url).attr("method","post").ajaxForm({
		dataType : "json",
		success : function(d) {
				if(!d.state){
					$.oimsError("失败！");
				}
				else{
					//$.oimsSucc("成功",function(){
						//TODO刷新列表
						printDiagnosisCertificate();
						$("a#certificateSearch").click();
						//findDiagnosisCertificate();
						//$("#showCertificate").find('tr:eq(1)').click();
					//});
				}
				return;
		}

	}).appendTo(div);
	var certificate_patientId;
	var certificate_visitId;
	if($("#careFrame").length){
		 var temp=$("#careFrame")[0].contentWindow.document.documentURI.substring($("#careFrame")[0].contentWindow.document.documentURI.indexOf('binglihao'));
		 temp=temp.split('&');
		 certificate_patientId=temp[0].split('=')[1];
		 certificate_visitId=temp[1].split('=')[1];
	}
	var table=$("<table cellspacing=0 />").appendTo(form);
	var tr=$('<tr/>').appendTo(table);
	var td=$('<td style="width:50px"/>').appendTo(tr).text('日期:');
	td=$('<td />').appendTo(tr).append("<input id='startDate' style='width:80px'/>");
	calendarFun("startDate");
	//$("#startDate").val(formatDate(new Date()));
	td=$('<td style="width:50px"/>').appendTo(tr).text("至");
	td=$('<td />').appendTo(tr).append("<input id='endDate' style='width:80px'/>");
	calendarFun("endDate");
	$("#endDate").val(formatDate(new Date()));
	td=$('<td style="width:100px"/>').appendTo(tr).text("病人ID");
	td=$('<td/>').appendTo(tr).append("<input id='patientid' style='width:80px'/>");
	if(certificate_patientId){
		$('#patientid').val(certificate_patientId);
	}
	td=$('<td/>').appendTo(tr);
	$("<a class='search' id='certificateSearch'>提取</a>").appendTo(td).click(findDiagnosisCertificate);
	td=$('<td/>').appendTo(tr).append("<a class='search' onclick='return false;'>确认</a>");
	tr=$('<tr/>').appendTo(table);
	td=$('<td colspan=8/>').appendTo(tr);
	var div_table_certificate=$('<div style="border:1px solid black;width:100%;height:120px;overflow:auto;"/>').appendTo(td);
	var table_show_all_certificate=$("<table id='showCertificate'/>").appendTo(div_table_certificate);
	tr=$("<tr/>").appendTo(table_show_all_certificate);
	td=$("<th width='40px'/>").appendTo(tr);
	td=$("<th/>").appendTo(tr).text("病人ID");
	td=$("<th/>").appendTo(tr).text("姓名");
	td=$("<th/>").appendTo(tr).text("日期");
	td=$("<th/>").appendTo(tr).text("科室");
	td=$("<th/>").appendTo(tr).text("医师");
	td=$("<th/>").appendTo(tr).text("确认");
	td=$("<th/>").appendTo(tr).text("操作人");

	tr=$('<tr/>').appendTo(table);
	td=$('<td />').appendTo(tr).text("病人ID:");
	td=$('<td/>').appendTo(tr);
	td.append('<input type="hidden" name="visitDate" />');
	td.append('<input type="hidden" name="visitNo" />');
	td.append('<input type="hidden" name="recNo" />');
	td.append('<input name="patientId" readonly style="width:100%;border:0px;"/>');
	td=$('<td />').appendTo(tr).text("姓名:");
	td=$('<td/>').appendTo(tr);
	td.append('<input name="name" readonly style="width:100%;border:0px;"/>');
	td=$('<td />').appendTo(tr).text("性别:");
	td=$('<td />').appendTo(tr);
	td.append('<input name="sex" readonly style="width:100%;border:0px;"/>');
	td=$('<td />').appendTo(tr).text("年龄:");
	td=$('<td />').appendTo(tr);
	td.append('<input name="age" readonly style="width:100%;border:0px;"/>');

	tr=$('<tr/>').appendTo(table);
	td=$('<td/>').appendTo(tr).text("证件号:");
	td=$('<td colspan=2/>').appendTo(tr).append("<input name='idNo' style='width:100%'/>");
	td=$('<td/>').appendTo(tr).text("联系电话:");
	td=$('<td />').appendTo(tr).append("<input name='phoneNumberHome' style='width:100%'/>");
	td=$('<td/>').appendTo(tr).text("编号:");
	td=$('<td colspan=2 />').appendTo(tr);
	td.append('<input name="conditionNo" readonly style="width:100%;border:0px;"/>');

	tr=$('<tr/>').appendTo(table);
	td=$('<td/>').appendTo(tr).text("单位:");
	td=$('<td colspan=5/>').appendTo(tr).append("<input name='unitInContract' style='width:100%' />");

	tr=$('<tr/>').appendTo(table);
	td=$('<td colspan=2/ style="text-align:left">').appendTo(tr).text("病情及诊断:");

	tr=$('<tr/>').appendTo(table);
	td=$('<td colspan=8/>').appendTo(tr).append("<textarea id='patCondition' name='patCondition'/>");

	tr=$('<tr/>').appendTo(table);
	td=$('<td colspan=2 style="text-align:left"/>').appendTo(tr).text("处理意见:");

	tr=$('<tr/>').appendTo(table);
	td=$('<td colspan=8/>').appendTo(tr).append("<textarea id='advice' name='advice'/>");
	if($('#patientid').val()){
		findDiagnosisCertificate();
	}
}
//刷新诊断证明列表
function findDiagnosisCertificate(){
	resetCertificate();
	//开始结束时间，病人ID号
	if(!$.trim($("#patientid").val())){
		$.oimsAlert("请输入病人ID号");
		return;
	}
    var data=getJSONData('/publish/certificate/findDiagnosisCertificate.htm',{tag:Math.random(),patientId:$("#patientid").val(),startDate:$("#startDate").val(),endDate:$("#endDate").val()},'POST');
    var state=data.state;
    //首先判断是否存在患者
    if(state==2){
    	$.oimsAlert("查无患者",function(){
    		resetCertificate();
    	});
    	return;
    }
    if(!data.obj){
    //	$.oimsAlert("没有查到相关诊断证明")
    	var n=getJSONData('/publish/huanZheXinXi/getHuanzhexinxiByBLH.htm',{tag:Math.random(),binglihao:$("#patientid").val()},'POST').obj;
    	$('input[name=patientId]').val(n.binglihao);
		$('input[name=name]').val(n.xingming);
		$('input[name=sex]').val(n.xingbie?'男':'女');
		$('input[name=age]').val(_emr_calculteAge(formatDate((n.shengri.time))));
		$('input[name=idNo]').val(n.sfzh);
		$('input[name=phoneNumberHome]').val(n.shouji);
		$('input[name=unitInContract]').val(n.jtdz);
		//TODO需要新增,关联最近一次挂号
		var obj=getJSONData('/publish/certificate/findLastJiuzhen.htm',{tag:Math.random(),id:n.id},'POST').obj;
		if(obj){
			$('input[name=visitDate]').val(formatDate(obj.caozuoTime.time));
			$('input[name=visitNo]').val(obj.haoma);
		}
    	return;
    }
    $.each(data.obj,function(i,n){
    	var tr=$('<tr/>').appendTo($("#showCertificate")).data('val',n);
    	var td=$('<td/>').appendTo(tr);
    	td=$('<td/>').appendTo(tr).text(n.patientId);
    	td=$('<td/>').appendTo(tr).text(n.name);
    	td=$('<td/>').appendTo(tr).text(formatDate(n.enterDateTime.time));
    	td=$('<td/>').appendTo(tr).text(n.visitDept);
    	td=$('<td/>').appendTo(tr).text(n.doctor);
    	td=$('<td/>').appendTo(tr).text(parseInt(n.check)?'Y':'N');
    	td=$('<td/>').appendTo(tr).text(n.checkOperator);
    	tr.click(function(){
    		//$(this).siblings().css({'background':'#F7F7F7'}).removeClass('focus_tr');
			$("tr.focus_tr").children("td").css({'background':'#F7F7F7'});
			$("tr.focus_tr").removeClass("focus_tr");
    		$(this).css({'background':'#aadbe7'}).addClass('focus_tr');
			$(this).children("td").css({'background':'#aadbe7'});
    		//	tr.on td{background:#aadbe7}
    		$('input[name=patientId]').val(n.patientId);
    		$('input[name=name]').val(n.name);
    		$('input[name=sex]').val(n.sex);
    		$('input[name=age]').val(n.age);
    		$('input[name=idNo]').val(n.idNo);
    		$('input[name=phoneNumberHome]').val(n.phoneNumberHome);
    		$('input[name=conditionNo]').val(n.conditionNo);
    		$('input[name=recNo]').val(n.recNo);
    		$('input[name=unitInContract]').val(n.unitInContract);
    		$('textarea[name=patCondition]').val(n.patCondition);
    		$('textarea[name=advice]').val(n.advice);
    		$('input[name=visitDate]').val(formatDate(n.visitDate.time));
    		$('input[name=visitNo]').val(n.visitNo);
    	});
    });
}
//重置诊断证明书
function resetCertificate(){
	$("#showCertificate").find('tr:gt(0)').remove();
	$('input[name=patientId]').val('');
	$('input[name=name]').val('');
	$('input[name=sex]').val('');
	$('input[name=age]').val('');
	$('input[name=idNo]').val('');
	$('input[name=phoneNumberHome]').val('');
	$('input[name=conditionNo]').val('');
	$('input[name=recNo]').val('');
	$('input[name=unitInContract]').val('');
	$('textarea[name=patCondition]').val('');
	$('textarea[name=advice]').val('');
}
//新增诊断证明
function addDiagnosisCertificate(){
	//重置除患者信息与诊断证明书列表外的
	$("#showCertificate tr").css({'background':'#F7F7F7'}).removeClass('focus_tr');
	//$('input[name=phoneNumberHome]').val('');
	$('input[name=conditionNo]').val('');
	$('input[name=recNo]').val('');
	//$('input[name=unitInContract]').val('');
	$('textarea[name=patCondition]').val('');
	$('textarea[name=advice]').val('');
	if(!$("#patientid").val()){
		$.oimsAlert("请先提取患者");
		return;
	}
	var n=getJSONData('/publish/huanZheXinXi/getHuanzhexinxiByBLH.htm',{tag:Math.random(),binglihao:$("#patientid").val()},'POST').obj;
	var obj=getJSONData('/publish/certificate/findLastJiuzhen.htm',{tag:Math.random(),id:n.id},'POST').obj;
	if(obj){
		$('input[name=visitDate]').val(formatDate(obj.caozuoTime.time));
		$('input[name=visitNo]').val(obj.haoma);
	}
}
//保存当前诊断证明
function saveDiagnosisCertificate(){
	//点击提取后保存显示的信息，将被保存,成功后提示修改或新增成功
		$('#emr_certificate').submit();
}
//删除指定诊断证明
function delDiagnosisCertificate(){
	/**var b=false;
	var ary=[];
	$.each($("#showCertificate").find('tr:gt(0)'),function(i,n){
		if($(n).hasClass('focus_tr')){
			b=true;
			ary.push($(n).data('val').conditionNo);
			ary.push($(n).data('val').enterDateTime.time);
		}
	});**/
	var select = $("#showCertificate").find("tr.focus_tr");
	if(select.length){
		var c = select.data('val');
		console.log(c);
		if(formatDate(c.enterDateTime.time) != getDateNow()) {
			$.oimsAlert("此条不能删除！");
			return;
		}
		var obj=getJSONData('/publish/certificate/delCertificates.htm',{tag:Math.random, patientId: c.patientId, recNo:c.recNo},'POST').obj;
		if(obj){
			findDiagnosisCertificate();
		}
		else{
			$.oimsAlert("删除失败");
		}

	}else{
		$.oimsAlert("请选择一条数据");
	}

}
//打印指定诊断证明
function printDiagnosisCertificate(){
	//alert(4);
	importJS('/emr/js/emr_functions.js');
	importCSS('/emr/style.css');
	var win = showPrintWindow();
	getPageTag(win);
	function getPageTag(win){
		var page = $("<div />").addClass("printPage").appendTo(win);
		var print_data={
				patientId:$("input[name=patientId]").val(),
				name:$("input[name=name]").val(),
				sex:$("input[name=sex]").val(),
				age:$("input[name=age]").val(),
				visitDate:$("input[name=visitDate]").val(),
				patCondition:$("#patCondition").val(),
				advice:$("#advice").val(),
				doctor:currentStaff.xingming,
				enterDate:formatDate(new Date()),
				conditionNo:$("input[name=conditionNo]").val(),
				};
	     showWithHtmlTemplate("print_certificate", print_data, page);
	}
	//importJS("/js/LodopFuncs.js");
	//自动打印存根,自定义打印
	$("a#printIll").unbind('click').bind('click',function(){
		printLodap($("#printTag"));
		$("#certificate_title").text("门诊诊断证明书存根");
		printLodap($("#printTag"));
		$(this).next().click();
	});
}
