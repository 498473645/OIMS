var TEMPLATE_RGJTJINGTI_CHANGJIA_FORM_URL="/js/manager/jingti/template/changjiaForm.html";
var SAVE_OR_UPDATE_RGJTCHANGJIA_FORM_URL="/publish/rgjtDict/saveOrUpdateRGJTChangjia.htm";
var FIND_RGJTCHANGJIA_LIST_URL="/publish/rgjtDict/findRGJCTChangjiaPageList.htm";
var DELETE_RGJTCHANGJIA_URL="/publish/rgjtDict/deleteRGJTChangjia.htm";

var FIND_RGJTXINGHAO_URL="/publish/rgjtDict/findRGJTXinhaoPageList.htm";
var SAVE_OR_UPDATE_RGJTXINGHAO_URL="/publish/rgjtDict/saveOrUpdateRGJTXinhao.htm";
var DELETE_RGJTXINGHAO_URL="/publish/rgjtDict/deleteRGJTXinhao.htm";
var TEMPLATE_RGJTXINGHAO_TEMPLATE_URL="/js/manager/jingti/template/xinghaoForm.html";

var FIND_RGJTPANLEIXING_URL = "/publish/rgjtDict/findRGJTPanleixingPageList.htm";
var SAVE_RGJTPANLEIXING_URL="/publish/rgjtDict/saveOrUpdateRGJTPlx.htm";
var DELETE_RGJTPANLEIXING_URL="/publish/rgjtDict/deleteRGJTPanleixing.htm";

var FIND_RGJTLEIXING_URL = "/publish/rgjtDict/findRGJTCjtglxPageList.htm";
var SAVE_RGJTLEIXING_URL = "/publish/rgjtDict/saveOrUpdateRGJTCjtglx.htm";
var DELETE_RGJTLEIXING_URL = "/publish/rgjtDict/deleteRGJTCjtglx.htm";
var TEMPLATE_RGJTLEIXING_URL="/js/manager/jingti/template/rgjtCjlxForm.html";

var FIND_RGJTCRKLX_LIST_URL="/publish/rgjtDict/findRGJTCrklxPageList.htm";
var SAVE_RGJTCRKLX_URL="/publish/rgjtDict/saveOrUpdateRGJTCrklx.htm";
var DELETE_RGJTCRKLX_URL="/publish/rgjtDict/deleteRGJTCrklx.htm";
var TEMPLATE_RGJTCRKLX_URL="/js/manager/jingti/template/crkForm.html";

var RGJT_CAIGOU_URL="/publish/rgjtKucun/caigousq.htm";
var TEMPLATE_RGJTCGSQ_URL="/js/manager/jingti/template/jtcgForm.html";
var FIND_RGJTKUCUN_URL="/publish/rgjtKucun/findKucunPageList.htm";
var FIND_RGJTCAIGOU_URL="/publish/rgjtKucun/findCaigouPageList.htm";
var FIND_RGJTMXLIST_URL="/publish/rgjtKucun/findCaigoumxPageList.htm";
var RGJT_CGPS_URL="/publish/rgjtKucun/caigouPifu.htm";
var RGJT_DELETE_CGSQ_URL="/publish/rgjtKucun/delCaigouShenqingdan.htm";
var FIND_RGJT_CKSQ_LIST_URL="/publish/rgjtKucun/findChukusqPageList.htm";
var TEMPLATE_RUKUFORM_URL="/js/manager/jingti/template/rgjtRukuForm.html";
var TEMPLATE_CHUKUOPER_URL="/js/manager/jingti/template/rgjtChukuOper.html";
var RGJT_CHURUKU_URL="/publish/rgjtKucun/jingtiChRuku.htm";
var FIND_OPERATION_PATIENT="/publish/rgjtKucun/findOperationPatient.htm";
var FIND_RGJT_BY_SN_URL="/publish/rgjtKucun/findRGJTBySN.htm";
var FIND_RGJT_KCMX_URL="/publish/rgjtKucun/findRGJTKucunMX.htm";
var FIND_RGJT_KC_URL="/publish/rgjtKucun/findRGJTKucun.htm";
var FIND_RGJT_KC_BY_PROID="/publish/rgjtKucun/findRGJTKucunByProId.htm";
var TEMPLATE_RGJT_KUCUN_SEARCH_URL = "/js/manager/jingti/template/kucunAdvSearch.html";
var FIND_RGJTKCMXLIST_URL="/publish/rgjtKucun/rgjtKucunMXPagelist.htm";
var FIND_RGJTKCLSLIST_URL="/publish/rgjtKucun/rgjtKucunLSPagelist.htm";
var FIND_CRKLSMX_URL = "/publish/rgjtKucun/findKucunLSMXList.htm";
var GEN_RGJT_REPORT_URL="/publish/rgjtKucun/rgjtKucunBaobiao.htm";
var GET_RGJTMx_REPORT_URL="/publish/rgjtKucun/rgjtMxBaobiao.htm";
var GET_DAY_NUM="/publish/rgjtKucun/getDayNum.htm";
var FIND_RGJT_CHUKU_OPER_URL="/publish/rgjtKucun/getJingTiDetalsByOperationId.htm";
var GONGHUOSHANG_LEIBIE={SCCJ:2,GHS:1,SCCJ_GHS:0};
var RGJTCRKLX_SHIYIONG=2;//?????????????????????????????????ID?????????
var RGJTCRKLX_JIEYONG=1;//???????????????
var RGJT_REPORT_PAGESIZE=15;
/**
 * ????????????????????????
 * @param btn
 */
function showRGJTKucunMX(btns){
	listFactor={
			url : contextPath + FIND_RGJTKCMXLIST_URL, // url
			method : "post",
			checkbox : true,
			single : true,
			listObj : [
				          {title:"ID",key:"id"},
				          {title:"????????????",key:"typeName"},
				          {title:"??????",key:"manufacturerName"},
				          {title:"?????????",key:"panTypeName"},
				          {title:"?????????",key:"diopter"},
				          {title:"??????",key:"price"},
				          {title:"A??????",key:"aConstant"},
				          {title:"???????????????",key:"surfaceDiameter"},
				          {title:"?????????",key:"diameter"},
				          {title:"SN",key:"sn"},
				          {title:"????????????",key:"expiTime",func:function(d){
				        	 var s = "-";
				        	 if(!d)return s;
				        	 var now = new Date();
				        	 if(d.time<now.getTime()){
				        		s = "?????????"; 
				        	 }else{
				        		 var days = Math.ceil((d.time-now.getTime())/(1000*60*60*24));
				        		 s =(days>30)? "?????????":(days+"???");
				        	 }
				        	 return s;
				          }},
				          {title:"??????",key:"quantity"}
				          ],
			data : {// data??????????????????
				currentPage : 1,
				pageSize : getPageSize()
			}
		};
		if(btns==undefined || btns==null)
			btns=currentBtns;
		else
			currentBtns=btns;
		var div = $("<div />").attr("id","advquery").addClass("advquery").append("<div style='clear:both'></div>").appendTo("#right");
//		showRGJTKucunSearchForm(div);
		div = $("<div />").addClass("btn").prependTo(div);
		showMyBTNS(btns,div);
		div.find("a").width(68);
		div = $("<div />").attr("id","pageList").addClass("list").appendTo("#right");
		div.createPageList(listFactor);
}

/**
 * ????????????
 */
function showRGJTLReport(){
	var dialog;

	var startDate = $("#advquery").find("input[name=operationDateStart]").val();
	var endDate = $("#advquery").find("input[name=operationDateEnd]").val();
	var div = $("<form />").attr("action",contextPath+GEN_RGJT_REPORT_URL).attr("method","post").css("margin","5px").attr("id","RGJTBaobiao").ajaxForm({
		dataType : "json",
		beforeSubmit: function(){
			
		},
		success:function(data){
			var title = $("#RGJTBaobiao").find("input[name=startDate]").val()+"???"+$("#RGJTBaobiao").find("input[name=endDate]").val();
			var v = $("#RGJTBaobiao").find("input[name=beiku]:checked").val();
			if(v!=""){
				title += v=="true"?"??????":"?????????";
			}
			title+="????????????";
			showReportTable(data,title,v);
//			dialog.close();
		}
	});
	$("<input />").attr("name","pageSize").val(RGJT_REPORT_PAGESIZE).attr("type","hidden").appendTo(div);
	$("<input />").attr("name","currentPage").val(1).attr("type","hidden").appendTo(div);
	$("<input />").attr("name","startDate").val(startDate).attr("type","text").width(88).appendTo(div);
	$("<span />").html("&nbsp;-&nbsp;").appendTo(div);
	$("<input />").attr("name","endDate").val(endDate).attr("type","text").css("margin-right","4px").width(88).appendTo(div);
	$("<input />").attr("name","beiku").attr("id","beiku").attr("checked","checked").attr("type","radio").val("").appendTo(div);
	$("<label />").html("??????&nbsp;").attr("for","beiku").appendTo(div);
	$("<input />").attr("name","beiku").attr("id","beiku0").attr("type","radio").val("false").appendTo(div);
	$("<label />").html("?????????&nbsp;").attr("for","beiku0").appendTo(div);
	$("<input />").attr("name","beiku").attr("id","beiku1").attr("type","radio").val("true").appendTo(div);
	$("<label />").html("??????&nbsp;").attr("for","beiku1").appendTo(div);
	dialog = $(div).oimsDialog({
		icon:"view",
		title:"????????????",
		width:500,
		height:120,
		locked:true,
		button:[{
			title : "??????",//????????????
			func : function(){
				$("#RGJTBaobiao").submit();
			},//????????????
			isCloseWin:false,//?????????????????????????????? true?????????false?????????
			className : "ok"//??????CSS??????
		  }]
	});
	
	function showReportTable(data,title,beiku){
		var div = $("div.rgjtReportDialog");
		if(!div.length){
			div = $("<div />").addClass("rgjtReportDialog");
			showPrintDialog(div,title);
		}
		var page = $("<div />").addClass("printPage").appendTo(div);
		$("<h1 />").text(title).appendTo(page);
		var table = $("<table />").width("100%").appendTo(page);
		var ttr = $("<tr />").appendTo(table);
		$("<th />").text("????????????").appendTo(ttr);
		$("<th />").text("??????").appendTo(ttr);
		$("<th />").text("??????").appendTo(ttr);
		if(beiku=="true"){
			$("<th />").text("????????????").appendTo(ttr);
		}
		$("<th />").text("?????????").appendTo(ttr);
		$("<th />").text("?????????").appendTo(ttr);
		$.each(data.list,function(i,d){
			var tr = $("<tr />").appendTo(table);
			$("<td />").text(d.name).appendTo(tr);
			$("<td />").text(d.price).appendTo(tr);
			$("<td />").text(d.diopter).appendTo(tr);
			if(beiku=="true"){
				var targetValue = 0;
				if(d.targetValue)targetValue=d.targetValue;
				$("<td />").text(targetValue).appendTo(tr);
			}
			$("<td />").text(d.quantity).appendTo(tr);
			var ykcTd = $("<td />").appendTo(tr);
			var ykc=0;
			var jc=0;
			$.each(d.reportList,function(_i,_d){
				if(i==0){
					$("<th />").text(_d.name).appendTo(ttr);
				}
				if(_d.id==RGJTCRKLX_JIEYONG){
					jc+=_d.quantity;
				}
				if(_d.category){
					ykc +=_d.quantity;
				}else{
					ykc -=_d.quantity;
				}
				$("<td />").text(_d.quantity).appendTo(tr);
			});
			ykcTd.text(d.quantity-ykc);
			if(i==0){
				$("<th />").text("?????????").appendTo(ttr);
				$("<th />").text("??????").appendTo(ttr);
			}
			$("<td />").text(jc).appendTo(tr);
			$("<td />").text(jc).appendTo(tr);
		});
		$("<div />").css("text-align","center").text(data.page.currentPage+"/"+data.page.pageCount).appendTo(page);
		var ci = $("#RGJTBaobiao").find("input[name=currentPage]");
		if(data.page.pageCount>ci.val()){
			ci.val(ci.val+1);
			$("#RGJTBaobiao").submit();
		}
	}
}

/**
 * ????????????????????????????????????
 */
function showRGJCRKLS(btns){
	listFactor={
			url : contextPath + FIND_RGJTKCLSLIST_URL, // url
			method : "post",
			checkbox : true,
			single : true,
			listObj : [
				          {title:"ID",key:"id"},
				          {title:"???????????????",key:"typeName"},
				          {title:"???????????????",key:"insertUser"},
				          {title:"????????????",key:"insertDate"},
				          {title:"??????",key:"outOrPut",func:function(d){return d?"??????":"??????";}},
				          {title:"???????????????",key:"insertDate",func:function(d){return formatDate(d.time);}},
				          {title:"????????????",key:"operationDate",func:function(d){return !d?'':formatDate(d.time);}},
				          {title:"????????????",key:"quantity"},
				          {title:"??????",key:"note"}
				          ],
			data : {// data??????????????????
				currentPage : 1,
				pageSize : getPageSize()
			}
		};
		if(btns==undefined || btns==null)
			btns=currentBtns;
		else
			currentBtns=btns;

		var div = $("<div />").attr("id","advquery").addClass("advquery").append("<div style='clear:both'></div>").appendTo("#right");
		showRGJTKucunLSSearchForm(div);
		div = $("<div />").addClass("btn").prependTo(div);
		showMyBTNS(btns,div);
		div.find("a:last").hide();
		div.find("a").width(68);
		div.append($("<a style='width:68px;'/>").text("????????????").prepend("<span class='start' />").click(function(){
			if(!$("#operationDateStart").val()||!$("#operationDateEnd").val()){
				$.oimsAlert("?????????????????????");
				return false;
			}
			showRGJTMxPrintPage($("#operationDateStart").val(),$("#operationDateEnd").val());
		}));
		div = $("<div />").attr("id","pageList").addClass("list").appendTo("#right");
		div.createPageList(listFactor);
}

function showRGJTKucunLSSearchForm(tag){
	var div = $("<div />").css("float","left").prependTo(tag);
	var t0 = $("<select name='outOrPut'><option value=''>??????</option><option value='1' selected=selected>??????</option><option value='0'>??????</option></select>").width(58).css({"float":"left",margin:"2px 4px 0 6px"}).appendTo(div);
//	var typeId = $("<select />").attr("name","typeId").css("float","left").width(88).appendTo(div);
	var now = new Date();
	var today = formatDate(now.getTime());
	now.setDate(1);
	var startDate = formatDate(now.getTime());
	var s0 =$("<input type='text' name='operationDateStart' id='operationDateStart' />").css({"float":"left",margin:"2px 0"}).val(startDate).width(88).appendTo(div);
	$("<span />").text("-").css({display:"block","text-align":"center","float":"left", "margin-top":"2px"}).width(18).appendTo(div);
	var e0=$("<input type='text' name='operationDateEnd' id='operationDateEnd' />").width(88).css({"float":"left",margin:"2px 0"}).val(today).appendTo(div);
	//??????????????????????????????????????????????????????
	var div_ck=$("<div class='div_ck' style='float:left'/>").appendTo(div).hide();
	$("<span />").text("??????:").appendTo(div_ck);
	var d0=$("<input type='text' name='doctor' id='doctor' />").width(80).css({margin:"2px 0"}).appendTo(div_ck);
	var p0=$("<input type='hidden' name='productId' id='productId' />").appendTo(div_ck);
	$("<span />").text("??????:").appendTo(div_ck);
	$("<input type='text' name='productName' id='productName' />").width(80).css({margin:"2px 0"}).appendTo(div_ck).keyup(function(){
		var input=$(this);
		var val = $.trim($(this).val());
		if(!val.length){
			$("#productId").val("");
			return;
		}
		var re = getJSONData(FIND_RGJTLEIXING_URL,{inputCode:val,pageSize:100,currentPage:1,/*manufacturer:tr.find("select[name=manufacturer]").val()*/},"POST");
		var tag = $("div.jingtiNameListDiv");
		if(!tag.length)
			tag = $("<div />").appendTo("#right").css({position:"absolute","z-index":9999,width:$(this).width(),border:"1px solid #ddd"}).addClass("jingtiNameListDiv").appendTo("body");
		else
			tag.text("").show();
		var p = $(this).offset();
		tag.css({left:p.left,top:p.top+$(this).height()});
		if(!re.list.length){
			$.oimsAlert("???????????????????????????????????????");
			$("#productId").val("");
			$(this).val("");
			tag.hide();
			return;
		}
		$.each(re.list,function(i,d){
			var a = $("<a />").css({display:"block",background:"#fff",margin:"0 1px", height:"22px", "line-height":"22px"}).attr("href","javascript:void(0)").html(d.typeName).appendTo(tag);
			a.click(function(){
					tag.hide();
					$('input[name=productId]').val(d.id);
					$('input[name=productName]').val(d.typeName);
			}).hover(function(){
				$(this).focus();
			},function(){
				$(this).blur();
			}).focusin(function(){
				$(this).css({background:"blue", color:"#fff"});
			}).blur(function(){
				$(this).css({background:"#fff",color:"#000"})
			}).keyup(function(e){
				var prev = $(this).prev();
				var next = $(this).next();
				if(e.keyCode==38 && prev.length){
					prev.focus();
				}else if(e.keyCode==40 && next.length){
					next.focus();
				}
			});
		});
		//tag.children("a:first").focus();
	});
	$("<span />").text("????????????:").appendTo(div_ck);
	var patientName0=$("<input type='text' name='patientName' id='patientName' />").width(80).css({margin:"2px 0"}).appendTo(div_ck);
	$("<br/>").appendTo(div_ck);
	$("<span />").text("ID???:").appendTo(div_ck);
	var patientId0=$("<input type='text' name='patientId' id='patientId' />").width(80).css({margin:"2px 0"}).appendTo(div_ck);
	$("<span />").text("??????:").appendTo(div_ck);
	var sn0=$("<input type='text' name='sn' id='sn' />").width(80).css({margin:"2px 0"}).appendTo(div_ck);
	$("<span />").text("?????????:").appendTo(div_ck);
	
	var batchNumber0=$("<input type='text' name='batchNumber' id='batchNumber' />").width(90).css({margin:"2px 0"}).appendTo(div_ck);
//	$("<span />").text("??????:").appendTo(div_ck);
//	var d0=$("<input type='text' name='nurse' id='nurse' />").width(60).css({margin:"2px 0"}).appendTo(div_ck);
	$("select[name=outOrPut]").change(function(){
		if($(this).val()==1){
//			$("input[name=doctor]").show()
//			$("input[name=productName]").show();
			$("div.div_ck").show();
		}else{
			$("div.div_ck").hide();
//			$("input[name=doctor]").hide()
//			$("input[name=productName]").hide();
		}
	});
	$("div.div_ck").show();
	$('<a class="search" href="javascript:void(0);" style="float: left; margin:0 4px">??????</a>').css("float","left").click(function(){
//		if(t0.val()==1){
			//?????????????????????
//			var p=$("#pageForm").find("input[name=productId]");
//			if(!p.length)
//				p=$("<input />").attr("name","productId").attr("type","hidden").appendTo("#pageForm");
//			if(!$.trim($("input[name=productName]").val())){
//				p.val("");
//			}else{
//				p.val(p0.val());
//			}
//			var d=$("#pageForm").find("input[name=doctor]");
//			if(!d.length)
//				d=$("<input />").attr("name","doctor").attr("type","hidden").appendTo("#pageForm");
//			d.val(d0.val());
			
//			var patientName=$("#pageForm").find("input[name=patientName]");
//			if(!patientName.length)
//				patientName=$("<input />").attr("name","patientName").attr("type","hidden").appendTo("#pageForm");
//			patientName.val(patientName0.val());
			
//			var patientId=$("#pageForm").find("input[name=patientId]");
//			if(!patientId.length)
//				patientId=$("<input />").attr("name","patientId").attr("type","hidden").appendTo("#pageForm");
//			patientId.val(patientId0.val());
			
//			var sn=$("#pageForm").find("input[name=sn]");
//			if(!sn.length)
//				sn=$("<input />").attr("name","sn").attr("type","hidden").appendTo("#pageForm");
//			sn.val(sn0.val());
//			
//			var batchNumber=$("#pageForm").find("input[name=batchNumber]");
//			if(!batchNumber.length)
//				batchNumber=$("<input />").attr("name","batchNumber").attr("type","hidden").appendTo("#pageForm");
//			batchNumber.val(batchNumber0.val());
//		}
		
		
		
//		var s = $("#pageForm").find("input[name=operationDateStart]");
//		if(!s.length)
//			s=$("<input />").attr("name","operationDateStart").attr("type","hidden").appendTo("#pageForm");
//		s.val(s0.val());
//		var e = $("#pageForm").find("input[name=operationDateEnd]");
//		if(!e.length)
//			e=$("<input />").attr("name","operationDateEnd").attr("type","hidden").appendTo("#pageForm");
//		e.val(e0.val());
//		var t = $("#pageForm").find("input[name=outOrPut]");
//		if(!t.length)
//			t=$("<input />").attr("name","outOrPut").attr("type","hidden").appendTo("#pageForm");
//		t.val(t0.val())
//		$("#pageForm").find("input[name=currentPage]").val(1);
//		$("#pageForm").submit();
		var data_temp = listFactor.data;
		if(t0.val()==1){
			data_temp = $.extend(data_temp,{productId:(!$.trim($("input[name=productName]").val())?'':p0.val()),doctor:d0.val(),patientName:patientName0.val(),patientId:patientId0.val(),sn:sn0.val(),batchNumber:batchNumber0.val()});
			listFactor.data=data_temp;
		}
		else{
			data_temp = $.extend(data_temp,{productId:'',doctor:'',patientName:'',patientId:'',sn:'',batchNumber:''});
			listFactor.data=data_temp;
		}
		data_temp = $.extend(data_temp,{operationDateStart:s0.val(),operationDateEnd:e0.val(),outOrPut:t0.val()});
		listFactor.data=data_temp;
		$("#pageList").createPageList(listFactor);
	}).appendTo(div);
	calendarFun("operationDateStart");
	calendarFun("operationDateEnd");
	div.find("input").addClass("blur").focusin(function(){$(this).removeClass("blur").addClass("focus");}).blur(function(){$(this).removeClass("focus").addClass("blur");})
}

function showRGJTLSMX(){
	var data = getCheckBoxValue();
	if(data.length!=1){
		$.oimsAlert("???????????????????????????????????????");
		return;
	}
	var s = data[0].outOrPut?"??????":"??????";
	var title = "????????????"+s+"????????????"
		
	var re = getJSONData(FIND_CRKLSMX_URL,{id:data[0].id});
	if(!re.state||!re.obj.length){
		$.oimsAlert("????????????????????????");
		return;
	}
	var div = $("<div />").appendTo("body");
	var table = $("<table />").width("100%").appendTo(div);
	$('<tr><th>??????</th><th>????????????</th><th width="48">?????????</th><th width="48">?????????</th><th width="48">A??????</th><th width="68">???????????????</th><th width="48">?????????</th><th width="100">SN</th><th width="72">????????????</th><th width="48">??????</th></tr>').appendTo(table);
	$.each(re.obj,function(i,d){
		var tr = $("<tr />").appendTo(table);
		$("<td />").text(d.manufacturerName).appendTo(tr);
		$("<td />").text(d.typeName).appendTo(tr);
		$("<td />").text(d.panTypeName).appendTo(tr);
		$("<td />").text(d.diopter).appendTo(tr);
		$("<td />").text(d.aConstant).appendTo(tr);
		$("<td />").text(d.surfaceDiameter).appendTo(tr);
		$("<td />").text(d.diameter).appendTo(tr);
		$("<td />").text(d.sn).appendTo(tr);
		var date = "-";
		if(d.expiTime)date = formatDate(d.expiTime.time);
		$("<td />").text(date).appendTo(tr);
		$("<td />").text(d.quantity).appendTo(tr);
	});
	div.oimsDialog({title:title,locked:true,width:680,height:480,icon:"view"});
}

/**
 * ???????????????????????????
 */
function jingtiLiushuiZhangCK(){
	var data = getCheckBoxValue();
	if(data.length!=1){
		$.oimsAlert("???????????????????????????????????????");
		return;
	}
	//TODO ?????????
}

/**
 * ???????????????????????????
 */
function jingtiLiushuiZhangRK(){
	var data = getCheckBoxValue();
	if(data.length!=1){
		$.oimsAlert("???????????????????????????????????????");
		return;
	}
	//TODO ?????????
}

/**
 * ??????????????????????????????
 */
function showRGJTKCMX(){
	var data = getCheckBoxValue();
	if(data.length!=1){
		$.oimsAlert("???????????????????????????????????????");
		return;
	}
	var div = $("<div id='doctordiv'/>").append(
	"<p>???????????????<input type='text' name='doctor' id='doctor' /></p>").append("<input type='hidden' id='productId'/>");
	div.oimsDialog({
	title : "??????",
	width : 250,
	icon : 'view',
	height : 110,
	drag : false,
	locked : true,
	winType : 4,
	button : [ {
		title : "??????",
		func : function() {
			//TODO????????????????????????????????????
			var proId=getCheckBoxValue()[0].proId;
			$("#productId").val(proId);
			showRGJTChukuDetails();
		},
		isCloseWin : true,
		className : "sumit"
	} ],
//	closeCallback : function() {
//		showPatientListToday(); // ????????????????????????
//	}
	});
	$("#doctor").focus();
	$("#doctor").keydown(function(event) {
	if (event.keyCode == 13) {
		//TODO????????????????????????????????????
		showRGJTChukuDetails();
	}
	});

}
function showRGJTChukuDetails(){
	showRGJTMxPrintPage($("input[name=startDate]").val(),$("input[name=endDate]").val());
}

function showRGJTKucunSearchForm(tag){
	var div = $("<div />").css("float","left").prependTo(tag);
	var normalText = "?????????????????????";
	var searchInput = $("<input />").attr("name","search").focusin(function(){
		if($.trim($(this).val())==normalText){
			$(this).val("").removeClass("blurview").addClass("focus");
		}
	}).blur(function(){
		if(!$.trim($(this).val()).length){
			$(this).val(normalText).removeClass("focus").addClass("blurview");
		}
	}).val(normalText).addClass("blurview").css({"float":"left","margin":"2px 4px"}).width(266).height(20).appendTo(div).keyup(function(){
		var val = $.trim($(this).val());
		if(!val.length)return;
		var re = getJSONData(FIND_RGJTLEIXING_URL,{inputCode:val,pageSize:100,currentPage:1/*,manufacturer:tr.find("select[name=manufacturer]").val()*/},"POST");
		var tag = $("div.jingtiNameListDiv");
		if(!tag.length)
			tag = $("<div />").appendTo("#right").css({position:"absolute","z-index":9999,width:$(this).width(),border:"1px solid #ddd"}).addClass("jingtiNameListDiv").appendTo("body");
		else
			tag.text("").show();
		var p = $(this).offset();
		tag.css({left:p.left,top:p.top+$(this).height()});
		if(!re.list.length){
			$.oimsAlert("???????????????????????????????????????");
			tag.hide();
			$(this).val("");
			return;
		}
		$.each(re.list,function(i,d){
			var a = $("<a />").css({display:"block",background:"#fff",margin:"0 1px", height:"22px", "line-height":"22px"}).attr("href","javascript:void(0)").html(d.typeName).appendTo(tag);
			a.click(function(){
				tag.hide();
				$("input[name=search]").val(d.typeName);
			}).hover(function(){
				$(this).focus();
			},function(){
				$(this).blur();
			}).focusin(function(){
				$(this).css({background:"blue", color:"#fff"});
			}).blur(function(){
				$(this).css({background:"#fff",color:"#000"})
			}).keyup(function(e){
				var prev = $(this).prev();
				var next = $(this).next();
				if(e.keyCode==38 && prev.length){
					prev.focus();
				}else if(e.keyCode==40 && next.length){
					next.focus();
				}
			});
		});
	//	tag.children("a:first").focus();
	});
//	var advDiv = $("<form />").addClass("avdsearch").append(common_getHtmlTemplate(contextPath+TEMPLATE_RGJT_KUCUN_SEARCH_URL)).css({margin:"4px 8px 0 4px"}).hide().appendTo(tag);
//	advDiv.find("input[type=text]").width("100%");
//	var re = getJSONData(FIND_RGJTPANLEIXING_URL,{currentPage:1,pageSize:100},"POST");
//	var select = advDiv.find("select#panTypeId");
//	$.each(re.list,function(i,d){
//		$("<option />").val(d.id).text(d.name).appendTo(select);
//	});
//	var advBtn = $('<a class="advsearch" href="javascript:void(0)">????????????</a>').css("float","left").click(function(){
//		if(advDiv.is(":visible"))
//			advDiv.hide('slow');
//		else
//			advDiv.show('slow');
//	}).appendTo(div);
	div.append("<span style='float: left; margin: 4px 4px;  height: 20px;'>??????:</span>");
	var start_search=$("<input style='float: left; margin: 2px 4px; width: 100px; height: 20px;' name='startDate' id='startDate_search'/>").appendTo(div);
	div.append("<span style='float: left; margin: 4px 4px;  height: 20px;'>???:</span>");
	var end_search=$("<input style='float: left; margin: 2px 4px; width: 100px; height: 20px;' name='endDate' id='endDate_search'/>").appendTo(div);
	calendarFun("startDate_search");
	calendarFun("endDate_search");
	var queryBtn = $('<a class="search" href="javascript:void(0);" style="float: left;">??????</a>').appendTo(div);
	queryBtn.click(function(){
		var search = $.trim(searchInput.val());
		var start=$.trim(start_search.val());
		var end=$.trim(end_search.val());
		if(search == normalText)search="";
//		var t = $("#pageForm").find("input[name=search]");
//		var sd=$("#pageForm").find("input[name=startDate]");
//		var ed=$("#pageForm").find("input[name=endDate]");
//		if(!t.length)
//			t = $("<input />").attr("name","search").attr("type","hidden").appendTo("#pageForm");
//		if(!sd.length)
//			sd=$("<input />").attr("name","startDate").attr("type","hidden").appendTo("#pageForm");
//		if(!ed.length)
//			ed=$("<input />").attr("name","endDate").attr("type","hidden").appendTo("#pageForm");
//		t.val(search);
//		sd.val(start);
//		ed.val(end);
//		$("#pageForm").submit();
		
		var data_temp = listFactor.data;
		data_temp = $.extend(data_temp,{search:search,startDate:start,endDate:end});
		listFactor.data=data_temp;
		$("#pageList").createPageList(listFactor);
	});
}
/**
 * ????????????
 */
function jingtiChuku(){
	showRGJTChuRukuForm(0);
//	$("table#mingxi").remove()
}

/**
 * ????????????->????????????->????????????/??????
 */
function jingtiRuku(){
	showRGJTChuRukuForm(1);
}

/**
 * ???????????????????????????
 * @returns
 */
function showRGJTChuRukuForm(category){
	var data = getCheckBoxValue();
	var d;
	if(data.length>1){
		$.oimsAlert("???????????????????????????????????????");
		return;
	}
	if(!category){
		if(!data.length){
			$.oimsAlert("???????????????????????????????????????");
			return;
		}
		var d=data[0];
	}
	else{
		var d = data.length==1?data[0]:null;
	}
	console.dir(d);
	if(d!=null&&d.expectedDate&&category)d= $.extend(d,{expectedDate:formatDate(data.expectedDate.time)});
	var obj = showFormDialog({
		width:920,
		height:580,
		title:"??????"+(category?"??????":"??????"),
		beforeSubmit:function(){
			if(!obj.form.find("input[name=typeId]:checked").length){
				$.oimsAlert("???????????????????????????");
				return false;
			}
			if(!$(obj.form.find("input[name=typeName]")[0]).val()){
				$.oimsAlert("??????????????????");
				return false;
			}
			if(!$(obj.form.find("select[name=manufacturer]")[0]).val()){
				$.oimsAlert("??????????????????");
				return false;
			}
			if(!$(obj.form.find("input[name=quantity]")[0]).val()){
				$.oimsAlert("??????????????????");
				return false;
			}
			var s=true;
			//???????????????????????????????????????
			if(!category){
				if(!$(obj.form.find("input[name=diopter]")[0]).val()){
					$.oimsAlert("??????????????????");
					return false;
				}
				var snInput = obj.form.find("input[name=sn]");
				if(!snInput.length){
					return false;
				}
				$.each(snInput, function(i,input){
				if(!$.trim($(input).val()).length){
					s=false;
					$.oimsAlert("??????????????????SN???");
					return s;
				}
				});
//				var snInput = obj.form.find("input[name=batchNumber]");
//				$.each(snInput, function(i,input){
//					if(!$.trim($(input).val()).length){
//						s=false;
//						$.oimsAlert("?????????????????????");
//						return s;
//					}
//				});
				var snInput = obj.form.find("input[name=expiTime]");
				$.each(snInput, function(i,input){
					if(!$.trim($(input).val()).length){
						s=false;
						$.oimsAlert("??????????????????");
						return s;
					}
				});
			}
			return s;
		},
		submitCallBack:function(data){
			if(data.state==1){
				$.oimsAlert("????????????");
				//obj.dialog.close();
			}else{
				$.oimsAlert("????????????");
				return ;
			}
			if(category)
				showJingtiKucunPageList(null);
			if(!category){
				$("#mingxi").find('tr:gt(0)').css({'background-color':'red'});
				$("#operPrint").click();
				
			}
				
		},
		templateUrl:(!category?TEMPLATE_CHUKUOPER_URL:TEMPLATE_RUKUFORM_URL),
		action:RGJT_CHURUKU_URL,
		formData:(!category?null:d),
		ps:'jtck'
	});
	
	obj.form.find("input[name=outOrPut]").val(category==0);
	var re = getJSONData(FIND_RGJTCRKLX_LIST_URL,{pageSize:100,currentPage:1,category:category},"POST");
	$.each(re.list,function(i,lx){
		$("<input type='radio' name='typeId' />").blur(function(){
			churukuleixin();
		}).click(function(){
			churukuleixin();
		}).val(lx.id).attr("id","typeId"+lx.id).appendTo("td#TDTypeId");
		$("<label />").attr("for","typeId"+lx.id).html(lx.name+"&nbsp; &nbsp;").appendTo("td#TDTypeId");
	});
	
	var tableMingxi = obj.form.find("table#mingxi");
	var trTitle = tableMingxi.find("tr:first");
	var addTr = tableMingxi.find("tr:last").clone();
	tableMingxi.find("tr:last").remove();
	
	addTr.children("td").height(22);
	addTr.find("select").css({height:22,border:0});
	addTr.find("input[type=text]").css({height:22,border:0});
//	trTitle.children("th:last").children("a").click(function(){
//		addMingxiEvent();
//	});
	
	var md = getJSONData(FIND_RGJTCHANGJIA_LIST_URL,{pageSize:100,currentPage:1, category:GONGHUOSHANG_LEIBIE.SCCJ},"POST");
	var mselect = addTr.find("select[name=manufacturer]");
	if(!d)$("<option />").appendTo(mselect);
	$.each(md.list,function(i,d){
		$("<option />").text(d.name).val(d.id).appendTo(mselect);
	});
	//????????????
	if(d&&category==1){
		var re = getJSONData(FIND_RGJT_KC_URL,{id:d.id,tag:Math.random()});
//		$.each(re.obj,function(i,d){
//			addMingxiEvent(d);
//		});
		addMingxiEvent(re.obj);
	}
	else{
		//????????????????????????????????????????????????????????????????????????????????????????????????
		if(d){//????????????????????????
			var oper_list=getJSONData(FIND_RGJT_CHUKU_OPER_URL,{operationId:d.id,tag:Math.random()},'POST').obj;
			if(oper_list!=null&&oper_list.length){
				$.each(oper_list,function(i,n){
					var tr=$('<tr style="background-color:red" readonly/>').appendTo($("table#mingxi"));
					var td=$('<td/>').appendTo(tr);
					td.append($("<a>-</a>").click(function(){
						$(this).data('data',n);
						deleteOperJingti($(this));
					}));
					td=$('<td/>').appendTo(tr);
					td.text(this.manufacturer);
					td=$('<td/>').appendTo(tr);
					td.text(this.typeName);
//					td=$('<td/>').appendTo(tr);
//					td.text(this.panTypeName);
					td=$('<td/>').appendTo(tr);
					td.text(this.diopter);
			//		td=$('<td/>').appendTo(tr);
//					td.text(this.aConstant);
//					td=$('<td/>').appendTo(tr);
	//				td.text(this.surfaceDiameter?this.surfaceDiameter:'');
//					td=$('<td/>').appendTo(tr);
//					td.text(this.diameter?this.diameter:'');
					td=$('<td/>').appendTo(tr);
					td.text(this.sn);
					td=$('<td/>').appendTo(tr);
					td.text(formatDate(this.expiTime.time));
					td=$('<td/>').appendTo(tr);
					td.text(this.batchNumber);
					td=$('<td/>').appendTo(tr);
					td.text(this.quantity);
				});
			}
		}
		addMingxiEvent(null);
	}
	//??????????????????	
	$("#rgjtChukuOper").find("tr:first").find("td:last").append("<div class='btn' style='float:right'><a id='operPrint'>??????<span class='print'></span></a></div>");
	$("#operPrint").click(function(){
		showOperJingti('????????????????????????',d);
	});
	function churukuleixin(){
		if(obj.form.find("input[name=typeId]:checked").val()!=RGJTCRKLX_SHIYIONG){
			$(".patientSelectDiv").remove();
			return;
		}
		var data=getCheckBoxValue();
		var tag = $(".patientSelectDiv");
		if(tag.length)return;
		tag = $("<div />").css("display","inline").addClass("patientSelectDiv").appendTo("td#TDTypeId");
		var normalText = "???????????????ID";
		var pInput = $("<input />").attr("type","hidden").attr("name","patientId").appendTo(tag);
		var operationDateInput = $("<input />").attr("type","hidden").attr("name","operationDate").appendTo(tag);
		var operationIdInput = $("<input />").attr("type","hidden").attr("name","operationId").appendTo(tag);
//		$("<input />").focusin(function(){
//			if($.trim($(this).val())==normalText)
//				$(this).val("").css("color","#000");
//		}).blur(function(){
//			var v = $.trim($(this).val());
//			if(!v.length){
//				$(this).val(normalText).css("color","#ccc");
//				return;
//			}
//			var re = getJSONData(FIND_OPERATION_PATIENT,{blh:v,tag:Math.random()},"POST");
//			if(re==null||!re.length){
//				$.oimsAlert("???????????????????????????ID?????????????????????????????????");
//				return;
//			}
//			//??????????????????????????????????????????????????????????????????
////			if(re.length>1){
////				openOperationDialog(re);	
////			}
//			if(re.length==1){
//		console.dir(data[0]);
//				re=re[0];
				tag.children("span.patientSpan").remove();
				pInput.val(data[0].patientNo);
				operationDateInput.val(data[0].appointmentTime?formatDate(data[0].appointmentTime.time):'');
				operationIdInput.val(data[0].id);
				$("<span />").addClass("patientSpan").html(data[0].patientName+"&nbsp;").appendTo(tag);
				$("<span />").addClass("patientSpan").text(data[0].sex?"???":"???").appendTo(tag);
				$("<span />").addClass("patientSpan").html("&nbsp;"+formatDate(data[0].birthday.time)).appendTo(tag);
				
//			}
			
//		}).attr("type","text").val(normalText).css("color","#ccc").width(80).appendTo(tag);
//		function openOperationDialog(list){
//
//			var tag = $("<table />").attr("id","operationChooseTable");
//			var tr = $("<tr />").appendTo(tag);
//			var thval = [/*'????????????',*/'????????????','????????????','??????','??????','??????','??????'/*,'??????'*/];
//			$.each(thval,function(i,v){
//				$("<th />").text(v).appendTo(tr);
//			});
//			var win = $(tag).oimsDialog({
//				title:"?????????????????????",
//				icon:"view",
//				locked:true,
//				//closeCallback:closeCallback
//			});
//			$.each(list,function(i,d){
//				tr = $("<tr />").data("val",d).dblclick(function(){
//					$(".patientSelectDiv").children("span.patientSpan").remove();
//					pInput.val($(this).data('val').patientId);
//					operationDateInput.val(formatDate($(this).data('val').operationDate.time));
//					operationIdInput.val($(this).data('val').id);
//					$("<span />").addClass("patientSpan").html($(this).data('val').name+"&nbsp;").appendTo($(".patientSelectDiv"));
//					$("<span />").addClass("patientSpan").text($(this).data('val').sex?"???":"???").appendTo($(".patientSelectDiv"));
//					$("<span />").addClass("patientSpan").html("&nbsp;"+formatDate($(this).data('val').birthday.time)).appendTo($(".patientSelectDiv"));
//					win.close();
//				}).appendTo("#operationChooseTable");
//				//$("<td />").text(d.operationName).appendTo(tr);
//				$("<td />").text(!d.operationDate?'':formatDate(d.operationDate.time)).appendTo(tr);
//				$("<td />").text(d.name).appendTo(tr);
//				$("<td />").text(d.sex?"???":"???").appendTo(tr);
//				$("<td />").text(formatDate(d.birthday.time)).appendTo(tr);
//				$("<td />").text(d.doctor).appendTo(tr);
//				$("<td />").text(d.circuitNurse).appendTo(tr);
//	//			$("<td />").text(d.state).appendTo(tr);
//			});
//
//		}
	}
	
	function addMingxiEvent(mxd){
		var tr = addTr.clone();
		tr.find("input").val("");
		tr.show().appendTo(tableMingxi);
//		tr.children("td:last").click(function(){
//			if(tableMingxi.find("tr").length==2)return;
//			$(this).parent().remove();
//		});
		if(mxd!=null){
			tr.find("select[name=manufacturer]").val(mxd.manufacturer);
			tr.find("input[name=typeName]").val(mxd.typeName);
			tr.find("input[name=proId]").val(mxd.proId);
			tr.find("input[name=panTypeName]").val(mxd.panTypeName);
			tr.find("input[name=aConstant]").val(mxd.aConstant);
			tr.find("input[name=surfaceDiameter]").val(mxd.surfaceDiameter);
			tr.find("input[name=diameter]").val(mxd.diameter);
			tr.find("input[name=quantity]").val(mxd.quantity);
			tr.find("input[name=sn]").val(mxd.sn);
			if(mxd.expiTime)tr.find("input[name=expiTime]").val(formatDate(mxd.expiTime.time));
			tr.find("input[name=diopter]").val(mxd.diopter).data("start",mxd.diopterScopeStart).data("end",mxd.diopterScopeEnd)
		}
		//?????????????????????????????????1
		if(!category&&!mxd){
			tr.find("input[name=quantity]").val(1);
		}
		tr.find("input[name!=typeName]").focusin(function(){
			$("div.jingtiNameListDiv").remove();
		});
		tr.find("select[name=manufacturer]").change(function(){
			var val =$(this).val();
			if(!val.length)return;
			var re = getJSONData(FIND_RGJTLEIXING_URL,{pageSize:100,currentPage:1,manufacturer:tr.find("select[name=manufacturer]").val()},"POST");
			
			if(!re.list.length){
				$.oimsAlert("???????????????????????????????????????");
				$(this).val("");
				return;
			}
			var tag = $("div.jingtiNameListDiv");
			if(!tag.length)
				tag = $("<div />").appendTo("#right").css({position:"absolute","z-index":9999,width:$(this).width(),border:"1px solid #ddd"}).addClass("jingtiNameListDiv").appendTo("body");
			else
				tag.text("").show();
			var p = tr.find("input[name=typeName]").offset();
			tag.css({left:p.left,top:p.top+tr.find("input[name=typeName]").height()});
			$.each(re.list,function(i,d){
				var a = $("<a />").css({display:"block",background:"#fff",margin:"0 1px", height:"22px", "line-height":"22px"}).attr("href","javascript:void(0)").html(d.typeName).appendTo(tag);
				a.click(function(){
					tag.hide();
					if(!category){
						//?????????d.id????????????id;
						var kc = getJSONData(FIND_RGJT_KC_BY_PROID,{id:d.id,tag:Math.random()});
						if(!kc.state ||!kc.obj|| !kc.obj.quantity){
							$.oimsAlert("????????????????????????");
							$("input[name=typeName]").val("");
							$("input[name=proId]").val("");
							return;
						}
					//	var x = false;
//						$.each(list.obj,function(_i,_d){
//							//if(obj.form.find("input[name=sn][value="+_d.sn+"]").length)return true;
//							x=true;
//							fillRGJTTable(_d,tr);
//						});
						fillRGJTTable(kc.obj,tr);
					}else
						fillRGJTTable(d,tr);
				}).hover(function(){
					$(this).focus();
				},function(){
					$(this).blur();
				}).focusin(function(){
					$(this).css({background:"blue", color:"#fff"});
				}).blur(function(){
					$(this).css({background:"#fff",color:"#000"})
				}).keyup(function(e){
					var prev = $(this).prev();
					var next = $(this).next();
					if(e.keyCode==38 && prev.length){
						prev.focus();
					}else if(e.keyCode==40 && next.length){
						next.focus();
					}
				});
			});
			tag.children("a:first").focus();
		
		});
		tr.find("input[name=typeName]").focusin(function(){
//			var ms = tr.find("select[name=manufacturer]");
//			if(ms.val()==""){
//				$.oimsAlert("???????????????????????????");
//				ms.focus();
//			}
		}).keyup(function(){
			var val = $.trim($(this).val());
			if(!val.length)return;
			var re = getJSONData(FIND_RGJTLEIXING_URL,{inputCode:val,pageSize:100,currentPage:1/*,manufacturer:tr.find("select[name=manufacturer]").val()*/},"POST");
			var tag = $("div.jingtiNameListDiv");
			if(!tag.length)
				tag = $("<div />").appendTo("#right").css({position:"absolute","z-index":9999,width:$(this).width(),border:"1px solid #ddd"}).addClass("jingtiNameListDiv").appendTo("body");
			else
				tag.text("").show();
			var p = $(this).offset();
			tag.css({left:p.left,top:p.top+$(this).height()});
			if(!re.list.length){
				$.oimsAlert("???????????????????????????????????????");
				tag.hide();
				$(this).val("");
				return;
			}
			$.each(re.list,function(i,d){
				var a = $("<a />").css({display:"block",background:"#fff",margin:"0 1px", height:"22px", "line-height":"22px"}).attr("href","javascript:void(0)").html(d.typeName).appendTo(tag);
				a.click(function(){
					tag.hide();
					if(!category){
						//?????????d.id????????????id;
						var kc = getJSONData(FIND_RGJT_KC_BY_PROID,{id:d.id,tag:Math.random()});
						if(!kc.state ||!kc.obj|| !kc.obj.quantity){
							$.oimsAlert("????????????????????????");
							$("input[name=typeName]").val("");
							$("input[name=proId]").val("");
							return;
						}
					//	var x = false;
//						$.each(list.obj,function(_i,_d){
//							//if(obj.form.find("input[name=sn][value="+_d.sn+"]").length)return true;
//							x=true;
//							fillRGJTTable(_d,tr);
//						});
						fillRGJTTable(kc.obj,tr);
					}else
						fillRGJTTable(d,tr);
				}).hover(function(){
					$(this).focus();
				},function(){
					$(this).blur();
				}).focusin(function(){
					$(this).css({background:"blue", color:"#fff"});
				}).blur(function(){
					$(this).css({background:"#fff",color:"#000"})
				}).keyup(function(e){
					var prev = $(this).prev();
					var next = $(this).next();
					if(e.keyCode==38 && prev.length){
						prev.focus();
					}else if(e.keyCode==40 && next.length){
						next.focus();
					}
				});
			});
		//	tag.children("a:first").focus();
		})
//		.keyup(function(e){
//			if(e.keyCode==13){
//				$(this).keyup();
//			}
//		});
		tr.find("input[name=diopter]").focusin(function(){
			if(!tr.find("input[name=proId]").val().length){
				$.oimsAlert("???????????????????????????");
				tr.find("select[name=manufacturer]").focus();
				return;
			}
		}).blur(function(){
			var scope0 = $(this).data("start");
			var scope1 = $(this).data("end");
			var val = parseFloat($(this).val());
			if(val==NaN){
				$.oimsError("??????????????????");
				return;
			}
			if(val<scope0||val>scope1){
				$.oimsError("???????????????????????????????????????????????????"+scope0+"-"+scope1+"?????????");
				$(this).focusin();
				return;
			}
			tr.find("input[name=sn]").focus();
		});
//		tr.find("input[name=quantity]").keyup(function(e){
//			if(e.keyCode==13){
//				trTitle.children("th:last").children("a").click();
//			}
//		});
//		tr.find("input[name=sn]").blur(function(){
//			var sn = $.trim($(this).val());
//			if(!sn.length)return;
//			var re = getJSONData(FIND_RGJT_BY_SN_URL,{sn:sn,tag:Math.random()});
//			if(!re.obj&&!category){
//				$.oimsAlert("???????????????????????????");
//				return;
//			}
//			if(category && re.obj){
//				$.oimsAlert("?????????????????????");
//				return;
//			}
//			if(re.obj)fillRGJTTable(re.obj,tr);
//		});
	}
	
	function fillRGJTTable(d,tr){
		if((!d || !d.quantity) && !category){
			$.oimsAlert("????????????????????????");
			return;
		}
		tr.find("input[name=typeName]").val(d.typeName);
		tr.find("input[name=proId]").val(d.proId?d.proId:d.id);
		tr.find("input[name=panTypeName]").val(d.panTypeName);
		tr.find("input[name=aConstant]").val(d.aConstant);
		tr.find("input[name=surfaceDiameter]").val(d.surfaceDiameter);
		tr.find("input[name=diameter]").val(d.diameter);
//		tr.find("input[name=quantity]").val();
//		if(d.expiTime){
//			tr.find("input[name=expiTime]").val(formatDate(d.expiTime.time));
//		}
	//	tr.find("input[name=batchNumber]").val(d.batchNumber);
		tr.find("select[name=manufacturer]").val(d.manufacturer);
		tr.find("input[name=diopter]").val(d.diopter).data("start",d.diopterScopeStart).data("end",d.diopterScopeEnd);
	}
	function showOperJingti(title,d/*,processState, operationRoomId, startDate,endDate*/){
		importCSS("/css/print.css");
		importJS("/js/LodopFuncs.js");
		var template = common_getHtmlTemplate(contextPath+"/js/manager/jingti/template/operJingTi.html");
		var pageDiv = $("<div />").addClass("printPage").append(template);
		
//		var page=1;
		var printPage = $("<div />").attr("id","printTag");
		var dialog = printPage.oimsDialog({
			title:title,
			width:"1000",
			height:"600",
			locked:true,
			button:[{
			       		title : "??????",
			       		func : function(){
			       			var strStyleCSS="<link href='"+contextPath+"/css/print_oper_jingti.css?tag="+Math.random()+"' type='text/css' rel='stylesheet'>";
			       			var strHtml=strStyleCSS+"<body>"+printPage[0].innerHTML+"</body>"; 
			       			LODOP = getLodop();  
			       			LODOP.PRINT_INIT("OIMS??????");
			       			LODOP.ADD_PRINT_HTM(0,0,"100%","100%",strHtml);
			       			LODOP.SET_PRINT_PAGESIZE (2,'','',"A4");
//			       			LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","88%");
			    //   			LODOP.PRINT();	
			       			LODOP.PREVIEW();
			       		},
			       		className : "print",
			       		isCloseWin:true
			       },{
			       		title : "??????",
			       		func : function(){
			       			dialog.close();
			       		},
			       		className : "close"
			       }]
		});
//		var cp;
//		var n=0;
//		var array = [] ;
	//	while(true){
		//	cp = pageDiv.clone().appendTo(printPage);
			pageDiv.appendTo(printPage);
			//??????
			$('span.patientName').text(d.patientName);
			$('span.identity').text(d.patientNo);
			$('span.operationDate').text(formatDate(d.appointmentTime.time));
			var table_oper = pageDiv.find("table.content");
	//		var re = getJSONData(FIND_OPERATION_URL,{pageSize:18,currentPage:page, process:processState,operationRoomId:operationRoomId, appointmentTimeStart:startDate, appointmentTimeEnd:endDate,isprint:true},"POST");
//			n+=re.list.length;
//			array.reverse();
//			for(var i = 0 ;i<array.length ;i++){
//				$(array[i]).appendTo(table) ;
//			}
//			array.length=0;
//			if(re.list.length==0)break;
			var oper_list=getJSONData(FIND_RGJT_CHUKU_OPER_URL,{operationId:d.id,tag:Math.random()},'POST').obj;
			if(oper_list!=null&&oper_list.length){
				$.each(oper_list,function(i,n){
					var tr=$('<tr/>').appendTo(table_oper);
					//table_oper.find('tr:first').after;
					//var tr=$('<tr/>').insertAfter(table_oper.find('tr:first'));
					var td=$('<td style="height:140px"/>').appendTo(tr);
					td.text(i+1);
					td=$('<td/>').appendTo(tr);
					td.text(this.showName?this.showName:'');
					td=$('<td/>').appendTo(tr);
					td.text(this.info?this.info:'');
					td=$('<td/>').appendTo(tr);
					td.text(this.showName?this.showName:'');
					td=$('<td/>').appendTo(tr);
					td.text(this.typeName);
					td=$('<td/>').appendTo(tr);
					td.text(this.manufacturer);
					td=$('<td/>').appendTo(tr);
					td.text('???');
					td=$('<td/>').appendTo(tr);
					td.text(this.quantity);
					td=$('<td/>').appendTo(tr);
					td.text(this.price?this.price:'');
					td=$('<td/>').appendTo(tr);
					td.text(this.sn);
					td=$('<td/>').appendTo(tr);
					td.text(formatDate(this.expiTime.time));
				});
			}
			//??????????????????
			table_oper.append("<tr><td style='height:50px'>-</td><td>???????????????????????????</td><td>????????????20183221672</td><td>?????????</td><td>1ml</td><td>????????????</td><td>???</td><td>1</td><td>105</td><td></td><td></td></tr>");
			table_oper.append("<tr><td style='height:50px'>-</td><td>????????????????????????</td><td>????????????20163223032</td><td>DisCoVisc</td><td>1.0ml</td><td>?????????????????????</td><td>???</td><td>1</td><td>650</td><td></td><td></td></tr>");
			table_oper.append("<tr><td style='height:50px'>-</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>");
			//			page++;
//			if(page>re.page.pageCount/*&&array.length==0*/){
//				break;
//			}
	//	}
	//	var titleDiv = $("<div />").css({"font-weight":"bold","text-align":"center","font-size":"17px"}).text(title).prependTo(".printPage");
	}
	function deleteOperJingti(t){
		var mx=$(t).data('data');
		var state=getJSONData('/publish/rgjtKucun/deleteOperJingti.htm',{id:mx.id},'POST').state;
		if(state){
			$.oimsSucc('????????????');
			$(t).parent().parent().remove();
		}else{
			$.oimsError('????????????');
		}
		
	}
	
	
	/* *2016-05-04??????bug XNYY-36 ??????3?????????****************************************************************************/
	/*??????bug???*/
	/*??????????????????????????????*/
	var addBtn = $("#mingxi").find("tr:first").find("th:last") ;
	addBtn.on("click",function(e){
		var tr = $("#mingxi").find("tr:eq(1)").clone() ;
		$('input',tr).each(function(i,el){
			$(el).val() ;
		}) ;
		tr.find('td:last').on('click',removeBtn_handler) ;
		$("#mingxi").append(tr) ;
	}) ;
	var addTrElementEvents = function(tr){
		tr.find("select[name='manufacturer']").on('change',function(e){
			
		}) ;
	} ;
	
	/*?????????????????????????????? */
	var removeBtn = $("#mingxi").find("tr:eq(1)").find("td:last") ;
	var removeBtn_handler = function (e){
		/*??????????????????????????????????????????*/
		if($(e.currentTarget).parent().parent().find("tr").length<=2){
			return false;
		}
		$(e.currentTarget).parent().remove() ;
	} ;
	removeBtn.on('click',removeBtn_handler) ;
	
}
/**
 * ????????????????????????
 * @param btns
 */
function showJingtiCKSQPageList(btns){
	listFactor={
			url : contextPath + FIND_RGJT_CKSQ_LIST_URL, // url
			method : "post",
			checkbox : true,
			single : true,
			listObj : [
			          {title:"ID",key:"id"},
			          {title:"????????????",key:"title"},
			          {title:"?????????",key:"insertUser"},
			          {title:"??????????????????",key:"expectedDate",func:function(d){
			        	  return formatDate(d.time)
			          }},
			          {title:"????????????",key:"approvalFlag",func:function(d){
			        	  var s="";
			        	  if(d==null || d=="")
			        		  s="??????";
			        	  else if(d)
			        		  s="?????????";
			        	  else
			        		  s="?????????";
			        	  return s;
			          }},
			          {title:"?????????",key:"approver"}
			          ],
			data : {// data??????????????????
				currentPage : 1,
				pageSize : getPageSize()
			}
		};
		if(btns==undefined || btns==null)
			btns=currentBtns;
		else
			currentBtns=btns;
		pageTitle = "??????????????????";
		init();
		var div = $("<div />").attr("id","advquery").addClass("advquery").append("<div style='clear:both'></div>").appendTo("#right");
		div = $("<div />").addClass("btn").prependTo(div);
		showMyBTNS(btns,div);
		div.find("a").width(68);
		div = $("<div />").attr("id","pageList").addClass("list").appendTo("#right");
		div.createPageList(listFactor);
}
/**
 * ??????????????????
 */
function deleteJingticgsq (){
	var data = getCheckBoxValue();
	if(data.length==0||data.length>1){
		$.oimsAlert("???????????????????????????????????????");
		return;
	}
	$.oimsConfirm("?????????????????????",function(){
		var re = getJSONData(RGJT_DELETE_CGSQ_URL,{id:data[0].id},"POST");
		if(re.state){
			showJingtiCGSQ();
		}else{
			$.oimsError("???????????????");
		}
	})
	
}
/**
 * ??????
 */
function pizhunJingticgsq(){
	var data = getCheckBoxValue();
	if(data.length==0||data.length>1){
		$.oimsAlert("???????????????????????????????????????");
		return;
	}
	//TODO
	showJingtiCgsqPF(data[0],RGJT_CGPS_URL);
}

/**
 * ????????????????????????????????????
 */
function showJingtiCgsqPF(data,url){
	var obj = showFormDialog({
		width:820,
		height:520,
		title:"??????????????????",
		submitCallBack:function(data){
			showJingtiCGSQ(null);
		},
		templateUrl:TEMPLATE_RGJTCGSQ_URL,
		action:url
	});
	
	var re = getJSONData(FIND_RGJTCHANGJIA_LIST_URL,{currentPage:1,pageSize:100,category:GONGHUOSHANG_LEIBIE.GHS},"POST");
	var select = obj.form.find("select#supplier");
	$.each(re.list,function(i,d){
		$("<option />").val(d.id).text(d.name).appendTo(select);
	});
	if(data)
		select.val(data.supplier);
	if(data)data = $.extend(data,{expectedDate:formatDate(data.expectedDate.time)});
	replaceFormData(obj.form,data);
	obj.form.find("input[name=id]").val(data.id);
	var tableMingxi = obj.form.find("table#mingxi");
	tableMingxi.find("tr:last").remove();
	var re = getJSONData(FIND_RGJTMXLIST_URL,{id:data.id,pageSize:100,currentPage:1},"POST");
	$.each(re.list,function(i,d){
		tr = $("<tr />").appendTo(tableMingxi);
		$("<td />").height(22).text(d.manufacturerName).appendTo(tr);
		$("<td />").text(d.typeName).appendTo(tr);
		$("<td />").text(d.panTypeName).appendTo(tr);
		$("<td />").text(d.diopter).appendTo(tr);
		$("<td />").text(d.aConstant).appendTo(tr);
		$("<td />").text(d.surfaceDiameter).appendTo(tr);
		$("<td />").text(d.diameter).appendTo(tr);
		$("<td />").text(d.quantity).appendTo(tr);
		$("<td />").appendTo(tr);
	});
	var h0=tableMingxi.outerHeight(),h1=tableMingxi.parent().height();
	if(h0<h1){
		tableMingxi.parent().height(h0);
	}
	var tr = $("<tr />").appendTo(obj.form.children("table"));
	$("<td />").text("??????").appendTo(tr);
	var td = $("<td />").css({"text-align":"left"}).appendTo(tr);
	$("<input type='radio' name='approvalFlag' value='true' id='flagTrue' />").appendTo(td);
	$("<label for='flagTrue' />").html("&nbsp;????????????&nbsp;").appendTo(td);
	$("<input type='radio' name='approvalFlag' value='false' id='flagFlase' />").appendTo(td);
	$("<label for='flagFlase' />").html("&nbsp;????????????&nbsp;").appendTo(td);
	obj.form.find("input[name=approvalFlag][value="+data.approvalFlag+"]").attr("checked","checked");
	tr = $("<tr />").appendTo(obj.form.children("table"));
	$("<td />").text("????????????").appendTo(tr);
	var td = $("<td />").appendTo(tr);
	$("<textarea name='approvalMsg'></textarea>").text(data.approvalMsg).appendTo(td);
	
}

/**
 * ????????????
 */
function editJingticgsq(){
	var data = getCheckBoxValue();
	if(data.length==0||data.length>1){
		$.oimsAlert("???????????????????????????????????????");
		return;
	}
	addJingtiCaigou(data[0]);
}
/**
 * ????????????????????????
 * @param btns
 */
function showJingtiCGSQ(btns){
	listFactor={
			url : contextPath + FIND_RGJTCAIGOU_URL, // url
			method : "post",
			checkbox : true,
			single : true,
			listObj : [
			          {title:"ID",key:"id"},
			          {title:"????????????",key:"title"},
			          {title:"?????????",key:"insertUser"},
			          {title:"??????????????????",key:"expectedDate",func:function(d){
			        	  return d?formatDate(d.time):"-";
			          }},
			          {title:"????????????",key:"approvalFlag",func:function(d){
			        	  var s="";
			        	  if(d==null)
			        		  s="??????";
			        	  else if(d)
			        		  s="?????????";
			        	  else
			        		  s="?????????";
			        	  return s;
			          }},
			          {title:"?????????",key:"approver"}
			          ],
			data : {// data??????????????????
				currentPage : 1,
				pageSize : getPageSize()
			}
		};
		if(btns==undefined || btns==null)
			btns=currentBtns;
		else
			currentBtns=btns;
		pageTitle = "??????????????????";
		init();
		var div = $("<div />").attr("id","advquery").addClass("advquery").append("<div style='clear:both'></div>").appendTo("#right");
		div = $("<div />").addClass("btn").prependTo(div);
		showMyBTNS(btns,div);
		div.find("a").width(68);
		div = $("<div />").attr("id","pageList").addClass("list").appendTo("#right");
		div.createPageList(listFactor);
}

function addJingticgsq(){
	addJingtiCaigou(null);
}

/**
 * ??????????????????
 */
function addJingtiCaigou(data){
	if(data && data.expectedDate)
		data = $.extend(data,{expectedDate:formatDate(data.expectedDate.time)});
	var obj = showFormDialog({
		width:820,
		height:520,
		title:"??????????????????",
		beforeSubmit:function(){
			var b_diopter = true ;
			var b_quantity = true ;
			$("input[name='diopter']").each(function(i,j){
				if(!$(j).val())
					b_diopter = false ;
			}) ;
			if(!b_diopter){
				$.oimsAlert("?????????????????????");
				return false;
			}
			
			$("input[name='quantity']").each(function(i,j){
				if(!$(j).val())
					b_quantity = false ;
			}) ;
			if(!b_quantity){
				$.oimsAlert("??????????????????");
				return false;
			}
			if(!$("#expectedDate").val()){
				$.oimsAlert("????????????????????????");
				return false;
			}
			return true;	
//			
			
			
		},
		submitCallBack:function(data){
			if(data.state==1){
				$.oimsAlert("????????????");
			}else{
				$.oimsAlert("????????????");
				return false;
			}
			showJingtiKucunPageList(null);
		},
		templateUrl:TEMPLATE_RGJTCGSQ_URL,
		action:RGJT_CAIGOU_URL,
		formData:data
	});
	
	calendarFun("expectedDate") ;
	var re = getJSONData(FIND_RGJTCHANGJIA_LIST_URL,{currentPage:1,pageSize:100,category:GONGHUOSHANG_LEIBIE.GHS},"POST");
	var select = obj.form.find("select#supplier");
	$.each(re.list,function(i,d){
		$("<option />").val(d.id).text(d.name).appendTo(select);
	});
	if(data)
		select.val(data.supplier);
	var title = !data?(getDateNow()+"?????????????????????"):data.title;
	obj.form.find("input[name=title]").val(title);
	var tableMingxi = obj.form.find("table#mingxi");
	var trTitle = tableMingxi.find("tr:first");
	var addTr = tableMingxi.find("tr:last").clone();
	tableMingxi.find("tr:last").remove();
	addTr.children("td").height(22);
	addTr.find("select").css({height:22,border:0});
	addTr.find("input[type=text]").css({height:22,border:0});
	var md = getJSONData(FIND_RGJTCHANGJIA_LIST_URL,{pageSize:100,currentPage:1, category:GONGHUOSHANG_LEIBIE.SCCJ},"POST");
	var mselect = addTr.find("select[name=manufacturer]");
	if(!data)$("<option />").appendTo(mselect);
	$.each(md.list,function(i,d){
		$("<option />").text(d.name).val(d.id).appendTo(mselect);
	});
	addTr.hide();
	trTitle.children("th:last").children("a").click(function(){
		addMingxiEvent(null);
	});
	if(data!=undefined && data!=null){
		var re = getJSONData(FIND_RGJTMXLIST_URL,{id:data.id,pageSize:100,currentPage:1},"POST");
		$.each(re.list,function(i,d){
			addMingxiEvent(d);
		});
	}else
		addMingxiEvent(null);
	function addMingxiEvent(mxd){
		var tr = addTr.clone();
		tr.show().appendTo(tableMingxi);
		tr.children("td:last").click(function(){
			if(tableMingxi.find("tr").length==2)return;
			$(this).parent().remove();
		});
		if(mxd!=null){
			tr.find("select[name=manufacturer]").val(mxd.manufacturer);
			tr.find("input[name=typeName]").val(mxd.typeName);
			tr.find("input[name=proId]").val(mxd.proId);
			tr.find("input[name=panTypeName]").val(mxd.panTypeName);
			tr.find("input[name=aConstant]").val(mxd.aConstant);
			tr.find("input[name=surfaceDiameter]").val(mxd.surfaceDiameter);
			tr.find("input[name=diameter]").val(mxd.diameter);
			tr.find("input[name=quantity]").val(mxd.quantity);
			tr.find("input[name=diopter]").val(mxd.diopter).data("start",mxd.diopterScopeStart).data("end",mxd.diopterScopeEnd)
		}
		tr.find("input[name=typeName]").focusin(function(){
			var ms = tr.find("select[name=manufacturer]");
			if(ms.val()==""){
				$.oimsAlert("???????????????????????????");
				ms.focus();
			}
		}).blur(function(){
			var val = $.trim($(this).val());
			if(!val.length)return;
			var re = getJSONData(FIND_RGJTLEIXING_URL,{inputCode:val,pageSize:100,currentPage:1,manufacturer:tr.find("select[name=manufacturer]").val()},"POST");
			if(!re.list){
				$.oimsAlert("???????????????????????????????????????");
				$(this).val("");
				return;
			}
			var tag = $("div.jingtiNameListDiv");
			if(!tag.length)
				tag = $("<div />").appendTo("#right").css({position:"absolute","z-index":9999,width:$(this).width(),border:"1px solid #ddd"}).addClass("jingtiNameListDiv").appendTo("body");
			else
				tag.text("").show();
			var p = $(this).offset();
			tag.css({left:p.left,top:p.top+$(this).height()});
			$.each(re.list,function(i,d){
				var a = $("<a />").css({display:"block",background:"#fff",margin:"0 1px", height:"22px", "line-height":"22px"}).attr("href","javascript:void(0)").html(d.typeName).appendTo(tag);
				a.click(function(){
					tag.hide();
					tr.find("input[name=typeName]").val(d.typeName);
					tr.find("input[name=proId]").val(d.id);
					tr.find("input[name=panTypeName]").val(d.panTypeName);
					tr.find("input[name=aConstant]").val(d.aConstant);
					tr.find("input[name=surfaceDiameter]").val(d.aConstant);
					tr.find("input[name=diameter]").val(d.aConstant);
					tr.find("input[name=diopter]").data("start",d.diopterScopeStart).data("end",d.diopterScopeEnd).focus();
				}).hover(function(){
					$(this).focus();
				},function(){
					$(this).blur();
				}).focusin(function(){
					$(this).css({background:"blue", color:"#fff"});
				}).blur(function(){
					$(this).css({background:"#fff",color:"#000"})
				}).keyup(function(e){
					var prev = $(this).prev();
					var next = $(this).next();
					if(e.keyCode==38 && prev.length){
						prev.focus();
					}else if(e.keyCode==40 && next.length){
						next.focus();
					}
				});
			});
			tag.children("a:first").focus();
		}).keyup(function(e){
			if(e.keyCode==13){
				$(this).blur();
			}
		});
		tr.find("input[name=diopter]").focusin(function(){
			if(!tr.find("input[name=proId]").val().length){
				$.oimsAlert("?????????????????????????????????");
				tr.find("select[name=manufacturer]").focus();
				return;
			}
		}).blur(function(){
			var scope0 = $(this).data("start");
			var scope1 = $(this).data("end");
			var val = parseFloat($(this).val());
			if(val==NaN){
				$.oimsError("??????????????????");
				return;
			}
			if(val<scope0||val>scope1){
				$.oimsError("???????????????????????????????????????????????????"+scope0+"-"+scope1+"?????????");
				return;
			}
			tr.find("input[name=quantity]").focus();
		});
		tr.find("input[name=quantity]").keyup(function(e){
			if(e.keyCode==13){
				trTitle.children("th:last").children("a").click();
			}
		});
	}
}

/**
 * ????????????->????????????  ??????
 * ??????
 * buns[{func: "addJingtiCaigou",title: "????????????"}
 * 		{func: "jingtiRuku",title: "??????"}
 * 		{func: "jingtiChuku",title: "??????"}
 * 		{func: "jingtiLiushuiZhangCK",title: "????????????"}
 * 		{func: "showRGJTKCMX",title: "??????"}
 * 		{func: "showJingtiMonthNum",title: "????????????"}
 * 		{func: "jingtiLiushuiZhangRK",title: "????????????"}
 * ]


 * @param btns
 */
function showJingtiKucunPageList(btns){
	listFactor={
			url : contextPath + FIND_RGJTKUCUN_URL, // url
			method : "post",
			checkbox : true,
			single : true,
			listObj : [
			          {title:"ID",key:"id"},
			          {title:"????????????",key:"typeName"},
			          {title:"??????",key:"manufacturerName"},
			          {title:"?????????",key:"panTypeName"},
			          {title:"??????",key:"price"},
			          {title:"A??????",key:"aConstant"},
			          {title:"???????????????",key:"surfaceDiameter"},
			          {title:"?????????",key:"diameter"},
			          {title:"?????????",key:"inNum"},
			          {title:"?????????",key:"outNum"},
			          {title:"??????",key:"quantity"}
			          ],
			data : {// data??????????????????
				currentPage : 1,
				pageSize : getPageSize()
			}
		};
		if(btns==undefined || btns==null)
			btns=currentBtns;
		else
			currentBtns=btns;
		pageTitle = "??????????????????";
		init();
		var div = $("<div />").attr("id","advquery").addClass("advquery").append("<div style='clear:both'></div>").appendTo("#right");
		showRGJTKucunSearchForm(div);
		div = $("<div />").addClass("btn").prependTo(div);
		showMyBTNS(btns,div);
		div.find("a").width(68);
		//div.find("a:last").css("display","none");
		div = $("<div />").attr("id","pageList").addClass("list").appendTo("#right");
		div.createPageList(listFactor);
}

/**
 * ?????????????????????
 */
function addJingtiCrklx(){
	showJingtiCRKLXForm(null);
}

/**
 * ?????????????????????
 */
function editJingtiCrklx(){
	var data = getCheckBoxValue();
	if(data.length==0||data.length>1){
		$.oimsAlert("???????????????????????????????????????");
		return;
	}
	if(data[0].id<3){
		$.oimsAlert("???????????????????????????????????????");
		return;
	}
	showJingtiCRKLXForm(data[0]);
}
/**
 * ?????????????????????
 */
function deleteJingtiCrklx(){
	var data = getCheckBoxValue();
	if(data.length==0||data.length>1){
		$.oimsAlert("???????????????????????????????????????");
		return;
	}
	if(data[0].id<3){
		$.oimsAlert("???????????????????????????????????????");
		return;
	}
	$.oimsConfirm("?????????????????????????????????????????????????????????",function(){
		var re = getJSONData(DELETE_RGJTCRKLX_URL,{id:data[0].id},"POST");
		if(!re.state){
			$.oimsError("???????????????");
		}else{
			showJingtiCsklxPageList(null);
		}
	}
	);
}

function showJingtiCRKLXForm(data){
		showFormDialog({
			width:500,
			height:180,
			title:(data?"??????":"??????")+"?????????????????????",
			submitCallBack:function(data){
				showJingtiCsklxPageList(null);
			},
			templateUrl:TEMPLATE_RGJTCRKLX_URL,
			action:SAVE_RGJTCRKLX_URL,
			formData:data
		});
}

/**
 * ???????????????????????????
 * @param btns
 */
function showJingtiCsklxPageList(btns){
	listFactor={
			url : contextPath + FIND_RGJTCRKLX_LIST_URL, // url
			method : "post",
			checkbox : true,
			single : true,
			listObj : [
			          {title:"ID",key:"id"},
			          {title:"??????",key:"category",func:function(d){
			        	  return d?"??????":"??????";
			          }},
			          {title:"??????",key:"name"},
			          {title:"??????",key:"code"},
			          {title:"????????????",key:"note"}
			          ],
			data : {// data??????????????????
				currentPage : 1,
				pageSize : getPageSize()
			}
		};
		if(btns==undefined || btns==null)
			btns=currentBtns;
		else
			currentBtns=btns;
		pageTitle = "?????????????????????";
		init();
		var div = $("<div />").attr("id","advquery").addClass("advquery").append("<div style='clear:both'></div>").appendTo("#right");
//		showSearchForm(div);
		div = $("<div />").addClass("btn").prependTo(div);
		showMyBTNS(btns,div);
		div = $("<div />").attr("id","pageList").addClass("list").appendTo("#right");
		div.createPageList(listFactor);
}

/**
 * ??????????????????
 */
function deleteJingticjlx(){
	var data = getCheckBoxValue();
	if(data.length==0||data.length>1){
		$.oimsAlert("???????????????????????????????????????");
		return;
	}
	$.oimsConfirm("?????????????????????????????????????????????????????????",function(){
		var re = getJSONData(DELETE_RGJTLEIXING_URL,{id:data[0].id},"POST");
		if(!re.state){
			$.oimsError("???????????????");
		}else{
			showJingticjlxPageList(null);
		}
	}
	);
}
/**
 * ??????????????????
 * @param btns
 */
function addJingticjlx(btns){
	showJingtiLeixingForm();
}
/**
 * ??????????????????
 */
function editJingticjlx(){
	var data = getCheckBoxValue();
	if(data.length==0||data.length>1){
		$.oimsAlert("???????????????????????????????????????");
		return;
	}
	showJingtiLeixingForm(data[0]);
}

/**
 * ????????????????????????
 * @param data
 */
function showJingtiLeixingForm(data){
	var obj = showFormDialog({
		width:580,
		height:320,
		title:(data?"??????":"??????")+"????????????",
		submitCallBack:function(data){
			showJingticjlxPageList(null);
		},
		templateUrl:TEMPLATE_RGJTLEIXING_URL,
		action:SAVE_RGJTLEIXING_URL,
		formData:data
	});
	var re = getJSONData(FIND_RGJTCHANGJIA_LIST_URL,{currentPage:1,pageSize:100,category:GONGHUOSHANG_LEIBIE.SCCJ},"POST");
	var select = obj.form.find("select#manufacturer");
	showSelect(select,re.list);
	if(data)
		select.val(data.manufacturer);
	
	re = getJSONData(FIND_RGJTXINGHAO_URL,{currentPage:1,pageSize:100},"POST");
	select = obj.form.find("select#typeId");
	showSelect(select,re.list);
	if(data)
		select.val(data.typeId);
	re = getJSONData(FIND_RGJTPANLEIXING_URL,{currentPage:1,pageSize:100},"POST");
	select = obj.form.find("select#panTypeId");
	showSelect(select,re.list);
	if(data)select.val(data.panTypeId);
	
	function showSelect(select,list){
		$.each(list,function(i,d){
			$("<option />").val(d.id).text(d.name).appendTo(select);
		});
	}
}

/**
 * ??????????????????
 * @param btns
 */
function showJingticjlxPageList(btns){
	listFactor={
			url : contextPath + FIND_RGJTLEIXING_URL, // url
			method : "post",
			checkbox : true,
			single : true,
			listObj : [
			          {title:"ID",key:"id"},
			          {title:"????????????",key:"typeName"},
			          {title:"??????",key:"manufacturerName"},
			          {title:"?????????",key:"panTypeName"},
			          {title:"????????????",key:"price"},
			          {title:"A??????",key:"aConstant"},
			          {title:"???????????????",key:"surfaceDiameter"},
			          {title:"?????????",key:"diameter"}
			          ],
			data : {// data??????????????????
				currentPage : 1,
				pageSize : getPageSize()
			}
		};
		if(btns==undefined || btns==null)
			btns=currentBtns;
		else
			currentBtns=btns;
		pageTitle = "?????????????????????";
		init();
		var div = $("<div />").attr("id","advquery").addClass("advquery").append("<div style='clear:both'></div>").appendTo("#right");
//		showSearchForm(div);
		div = $("<div />").addClass("btn").prependTo(div);
		showMyBTNS(btns,div);
		div = $("<div />").attr("id","pageList").addClass("list").appendTo("#right");
		div.createPageList(listFactor);
}

/**
 * ???????????????
 */
function addJingtiplx(){
	showJingtiPanleixingForm(null);
}

/**
 * ???????????????
 */
function editJingtiplx(){
	var data = getCheckBoxValue();
	if(data.length==0||data.length>1){
		$.oimsAlert("???????????????????????????????????????");
		return;
	}
	showJingtiPanleixingForm(data[0]);
}
/**
 * ???????????????
 */
function deleteJingtiplx(){
	var data = getCheckBoxValue();
	if(data.length==0||data.length>1){
		$.oimsAlert("???????????????????????????????????????");
		return;
	}
	$.oimsConfirm("?????????????????????????????????????????????????????????",function(){
		var re = getJSONData(DELETE_RGJTPANLEIXING_URL,{id:data[0].id},"POST");
		if(!re.state){
			$.oimsError("???????????????");
		}else{
			showJingtixhPageList(null);
		}
	}
	);
}

function showJingtiPanleixingForm(data){
		showFormDialog({
			width:500,
			height:180,
			title:(data?"??????":"??????")+"???????????????",
			submitCallBack:function(data){
				showJingtiplxPageList(null);
			},
			templateUrl:TEMPLATE_RGJTXINGHAO_TEMPLATE_URL,
			action:SAVE_RGJTPANLEIXING_URL,
			formData:data
		});
}
/**
 * ?????????????????????
 */
function showJingtiplxPageList(btns){
	listFactor={
			url : contextPath + FIND_RGJTPANLEIXING_URL, // url
			method : "post",
			checkbox : true,
			single : true,
			listObj : [
			          {title:"ID",key:"id"},
			          {title:"??????",key:"name"},
			          {title:"??????",key:"code"},
			          {title:"???????????????",key:"infomation"}
			          ],
			data : {// data??????????????????
				currentPage : 1,
				pageSize : getPageSize()
			}
		};
		if(btns==undefined || btns==null)
			btns=currentBtns;
		else
			currentBtns=btns;
		pageTitle = "?????????????????????";
		init();
		var div = $("<div />").attr("id","advquery").addClass("advquery").append("<div style='clear:both'></div>").appendTo("#right");
//		showSearchForm(div);
		div = $("<div />").addClass("btn").prependTo(div);
		showMyBTNS(btns,div);
		div = $("<div />").attr("id","pageList").addClass("list").appendTo("#right");
		div.createPageList(listFactor);
}

/**
 * ??????????????????
 * @returns
 */
function addJingtixh(){
	showRGJTXinghaoForm(null);
}
/**
 * ??????????????????
 */
function deleteJingtixh(){
	var data = getCheckBoxValue();
	if(data.length==0||data.length>1){
		$.oimsAlert("???????????????????????????????????????");
		return;
	}
	$.oimsConfirm("?????????????????????????????????????????????????????????",function(){
		var re = getJSONData(DELETE_RGJTXINGHAO_URL,{id:data[0].id},"POST");
		if(!re.state){
			$.oimsError("???????????????");
		}else{
			showJingtixhPageList(null);
		}
	}
	);
}
/**
 * ??????????????????
 */
function editJingtixh(){
	var data = getCheckBoxValue();
	if(data.length==0||data.length>1){
		$.oimsAlert("???????????????????????????????????????");
		return;
	}
	showRGJTXinghaoForm(data[0]);
}
function showRGJTXinghaoForm(data){
	showFormDialog({
		width:500,
		height:180,
		title:(data?"??????":"??????")+"????????????",
		submitCallBack:function(data){
			showJingtixhPageList(null);
		},
		templateUrl:TEMPLATE_RGJTXINGHAO_TEMPLATE_URL,
		action:SAVE_OR_UPDATE_RGJTXINGHAO_URL,
		formData:data
	});
}

/**
 * ????????????????????????
 * @param btns
 */
function showJingtixhPageList(btns){
	listFactor={
			url : contextPath + FIND_RGJTXINGHAO_URL, // url
			method : "post",
			checkbox : true,
			single : true,
			listObj : [
			          {title:"ID",key:"id"},
			          {title:"????????????",key:"name"},
			          {title:"????????????",key:"code"},
			          {title:"????????????????????????",key:"infomation"},
				      {title:"????????????",key:"showName"}
			          ],
			data : {// data??????????????????
				currentPage : 1,
				pageSize : getPageSize()
			}
		};
		pageTitle = "??????????????????";
		init();
		if(btns==undefined || btns==null)
			btns=currentBtns;
		else
			currentBtns=btns;
		
		var div = $("<div />").attr("id","advquery").addClass("advquery").append("<div style='clear:both'></div>").appendTo("#right");
//		showSearchForm(div);
		div = $("<div />").addClass("btn").prependTo(div);
		showMyBTNS(btns,div);
		div = $("<div />").attr("id","pageList").addClass("list").appendTo("#right");
		div.createPageList(listFactor);
}

/**
 * ????????????????????????
 */
function deleteJingtiCjxx(){
	var data = getCheckBoxValue();
	if(data.length==0||data.length>1){
		$.oimsAlert("???????????????????????????????????????");
		return;
	}
	$.oimsConfirm("?????????????????????????????????????????????????????????",function(){
		var re = getJSONData(DELETE_RGJTCHANGJIA_URL,{id:data[0].id},"POST");
		if(!re.state){
			$.oimsError("???????????????");
		}else{
			showJingticjPageList();
		}
	}
	);
}

/**
 * ??????????????????????????????
 */
function editJingtiCjxx(){
	var data = getCheckBoxValue();
	if(data.length==0||data.length>1){
		$.oimsAlert("???????????????????????????????????????");
		return;
	}
	showJingtiCjxxDialog(data[0]);
}

/**
 * ????????????????????????
 */
function addJingtiCjxx(){
	showJingtiCjxxDialog(null);
}

function showJingtiCjxxDialog(data){
	showFormDialog({
		width:500,
		height:330,
		title:(data?"??????":"??????")+"??????????????????",
		submitCallBack:function(data){
			showJingticjPageList(null);
		},
		templateUrl:TEMPLATE_RGJTJINGTI_CHANGJIA_FORM_URL,
		action:SAVE_OR_UPDATE_RGJTCHANGJIA_FORM_URL,
		formData:data
	});
}

/**
 * ?????? ??????????????????????????????
 * @param btns
 */
function showJingticjPageList(btns){
	listFactor={
		url : contextPath + FIND_RGJTCHANGJIA_LIST_URL, // url
		method : "post",
		checkbox : true,
		single : true,
		listObj : [
		          {title:"ID",key:"id"},
		          {title:"????????????",key:"name"},
		          {title:"?????????", key:"contact"},
		          {title:"??????",key:"tel"},
		          {title:"??????",key:"mobile"},
		          {title:"??????",key:"fax"},
		          {title:"Email",key:"mail"},
		          {title:"???????????????",key:"category",func:function(v){
		        	  var s;
		        	  switch(v){
		        		  case 0:
		        			  s="?????????/????????????";
		        			  break;
		        		  case 1:
		        			  s="?????????";
		        			  break;
		        		  case 2:
		        			  s="????????????";
		        			  break;
		        		  default:
		        			  s="-";
		        	  }
		        	  return s;
		          }}
		          ],
		data : {// data??????????????????
			currentPage : 1,
			pageSize : getPageSize()
		}
	};
	pageTitle = "????????????????????????";
	init();
	if(btns==undefined || btns==null)
		btns=currentBtns;
	else
		currentBtns=btns;
	
	var div = $("<div />").attr("id","advquery").addClass("advquery").append("<div style='clear:both'></div>").appendTo("#right");
//	showSearchForm(div);
	div = $("<div />").addClass("btn").prependTo(div);
	showMyBTNS(btns,div);
	div = $("<div />").attr("id","pageList").addClass("list").appendTo("#right");
	div.createPageList(listFactor);
}
function showRGJTMxPrintPage(startDate,endDate){
	importCSS("/css/print.css");
	importJS("/js/LodopFuncs.js");
	var template = common_getHtmlTemplate(contextPath+"/js/manager/jingti/template/rgjtmxprintpage.html");
	var pageDiv = $("<div />").addClass("printPage").append(template);
	
	var page=1;
	var printPage = $("<div />").attr("id","printTag");
	var dialog = printPage.oimsDialog({
		title:"??????????????????",
		width:"1000",
		height:"600",
		locked:true,
		button:[{
		       		title : "??????",
		       		func : function(){
		       			var strStyleCSS="<link href='"+contextPath+"/css/print_operation.css?tag="+Math.random()+"' type='text/css' rel='stylesheet'>";
		       			var strHtml=strStyleCSS+"<body>"+printPage[0].innerHTML+"</body>"; 
		       			LODOP = getLodop();  
		       			LODOP.PRINT_INIT("OIMS??????");
		       			LODOP.ADD_PRINT_HTM(0,0,"100%","100%",strHtml);
		       			LODOP.SET_PRINT_PAGESIZE (2,'','',"A4");
//		       			LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","88%");
		       			LODOP.PRINT();	
		//       			LODOP.PREVIEW();
		       		},
		       		className : "print",
		       		isCloseWin:false
		       },{
		       		title : "??????",
		       		func : function(){
		       			dialog.close();
		       		},
		       		className : "close"
		       },{
		    	   title:"????????????",
		    	   func :function(){
		    		   if(!$("#operationDateStart").val()||!$("#operationDateEnd").val()){
		   				$.oimsAlert("?????????????????????");
		   				}
		    		   else{
		    			   jingtimx_export(startDate,endDate,$("#doctor").val(),$("#productId").val(),$("#patientName").val(),$("#patientId").val(),$("#sn").val(),$("#batchNumber").val());
		    		   }
		    		   
		    	   },
		    	   className: "print",
		    	   isCloseWin:false
		       }]
	});
	var cp;
	var n=0;
//	var array = [] ;
	while(true){
		cp = pageDiv.clone().appendTo(printPage);
		var table = cp.children("table");
		var re = getJSONData(GET_RGJTMx_REPORT_URL,{pageSize:20,currentPage:page, startDate:startDate, endDate:endDate,doctor:$("#doctor").val(),productId:$("#productId").val(),patientName:$("#patientName").val(),patientId:$("#patientId").val(),sn:$("#sn").val(),batchNumber:$("#batchNumber").val()},"POST");
		n+=re.list.length;
//		array.reverse();
//		for(var i = 0 ;i<array.length ;i++){
//			$(array[i]).appendTo(table) ;
//		}
//		array.length=0;
		if(re.list.length==0)break;
		$.each(re.list,function(i,d){
			var tr = $("<tr style='height:30px'/>").appendTo(table);
			$("<td />").text('???????????????').appendTo(tr);
			$("<td />").text(d.typeName).appendTo(tr);
			$("<td />").text(d.quantity).appendTo(tr);
			$("<td />").text(d.manufacturer).appendTo(tr);
			$("<td />").html(d.patientName).appendTo(tr);
			$("<td />").html(d.patientId).appendTo(tr);
			$("<td />").html(formatDate(d.operationDate.time)).appendTo(tr);
			$("<td />").text(d.diopter).appendTo(tr);
			$("<td />").text(formatDate(d.expiTime.time)).appendTo(tr);
			$("<td />").html(d.sn).appendTo(tr);
			$("<td />").text(d.batchNumber).appendTo(tr);
			$("<td />").text(d.doctor).appendTo(tr);
			$("<td />").text(d.nurse).appendTo(tr);
		});
		page++;
		if(page>re.page.pageCount){
			break;
		}
		
	}
	var titleDiv = $("<div />").css({"font-weight":"bold","text-align":"center","font-size":"17px"}).text("?????????????????????????????????("+n+")").prependTo(".printPage");

}
function showJingtiMonthNum(){
	var data = getCheckBoxValue();
	if(data.length!=1){
		$.oimsAlert("???????????????????????????????????????");
		return;
	}
	var daynum_list=getJSONData(GET_DAY_NUM,{tag:Math.random(),proId:data[0].proId,startDate:$("#startDate_search").val(),endDate:$("#endDate_search").val()},'POST').obj;
	var div = $("<div />").appendTo("body");
	div.append("<h1>"+data[0].typeName+"??????????????????(??????:"+($("#startDate_search").val()?$("#startDate_search").val():'???')+"---??????:"+($("#endDate_search").val()?$("#endDate_search").val():'???')+")</h1>");
	var table = $("<table />").width("100%").appendTo(div);
	$('<tr><th>??????</th><th>??????</th><th>??????</th><th>???????????????</th><th>??????</th><th>??????</th></tr>').appendTo(table);
	$.each(daynum_list,function(i,d){
		var tr = $("<tr />").appendTo(table);
		$("<td />").text(formatDate(d.date.time)).appendTo(tr);
		$("<td />").text(d.rk?d.rk:'').appendTo(tr);
		$("<td />").text(d.ck?d.ck:'').appendTo(tr);
		$("<td />").text(d.sh?d.sh:'').appendTo(tr);
		$("<td />").text(d.th?d.th:'').appendTo(tr);
		$("<td />").text(d.jy).appendTo(tr);
	});
	div.oimsDialog({title:"????????????",locked:true,width:680,height:480,icon:"view"});
	
	
	
}
function showJingtiNumBaobiao (){
	
	var data = getCheckBoxValue();
	if(data.length!=1){
		$.oimsAlert("???????????????????????????????????????");
		return;
	}
	console.dir(data[0]);
	importCSS("/css/print.css");
	importJS("/js/LodopFuncs.js");
	var template = common_getHtmlTemplate(contextPath+"/js/manager/jingti/template/rgjtnumprintpage.html");
	var pageDiv = $("<div />").addClass("printPage").append(template);
	
	var page=1;
	var printPage = $("<div />").attr("id","printTag").css({'width':'auto'});
	var dialog = printPage.oimsDialog({
		title:"????????????",
		width:"1000",
		height:"600",
		locked:true,
		button:[{
		       		title : "??????",
		       		func : function(){
		       			var strStyleCSS="<link href='"+contextPath+"/css/print_operation.css?tag="+Math.random()+"' type='text/css' rel='stylesheet'>";
		       			var strHtml=strStyleCSS+"<body>"+printPage[0].innerHTML+"</body>"; 
		       			LODOP = getLodop();  
		       			LODOP.PRINT_INIT("OIMS??????");
		       			LODOP.ADD_PRINT_HTM(0,0,"100%","100%",strHtml);
		       			LODOP.SET_PRINT_PAGESIZE (2,'','',"A4");
//		       			LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","88%");
		       			LODOP.PRINT();	
		//       			LODOP.PREVIEW();
		       		},
		       		className : "print",
		       		isCloseWin:false
		       },{
		       		title : "??????",
		       		func : function(){
		       			dialog.close();
		       		},
		       		className : "close"
		       },{
		    	   title:"????????????",
		    	   func :function(){
		    		   if(!$("#startDate_search").val()||!$("#endDate_search").val()){
		    			   $.oimsAlert("????????????????????????");
		    		   }
		    		   else{
		    			   jingtinum_export(data[0].proId,$("#startDate_search").val(),$("#endDate_search").val());
		    		   }
		    		   
		    	   },
		    	   className: "print",
		    	   isCloseWin:false
		       }]
	});
	var cp;
	var n=0;

	var re = getJSONData(GET_DAY_NUM,{proId:data[0].proId,startDate:$("#startDate_search").val(), endDate:$("#endDate_search").val()},"POST").obj;

	var table;		
			$.each(re,function(i,d){
				if(i%20==0){
					cp = pageDiv.clone().appendTo(printPage);
					table = cp.children("table");
				}
				var tr = $("<tr />").appendTo(table);
				$("<td />").text(formatDate(d.date.time)).appendTo(tr);
				$("<td />").text(d.rk?d.rk:'').appendTo(tr);
				$("<td />").text(d.ck?d.ck:'').appendTo(tr);
				$("<td />").text(d.sh?d.sh:'').appendTo(tr);
				$("<td />").text(d.jy).appendTo(tr);
			});

	var titleDiv = $("<div />").css({"font-weight":"bold","text-align":"center","font-size":"17px"}).html(($("#startDate_search").val()?$("#startDate_search").val():'???')+"???"+($("#endDate_search").val()?$("#endDate_search").val():'???')+"&nbsp;&nbsp;&nbsp;"+data[0].typeName+"&nbsp;&nbsp;&nbsp;??????????????????").prependTo(".printPage");


}
function jingtinum_export(id,startDate,endDate){
	var pt = proTool() ;
	pt.jtproDown(contextPath+"/publish/rgjtKucun/exportjingtinum.htm" ,{productId:id,startDate:startDate, endDate:endDate}) ;
}
function jingtimx_export(startDate,endDate,doctor,id,patientName,patientId,sn,batchNumber){
	var pt = proTool() ;
	pt.jtproDown(contextPath+"/publish/rgjtKucun/exportjingtimx.htm" ,{productId:id,startDate:startDate, endDate:endDate,doctor:doctor,patientName:patientName,sn:sn,batchNumber:batchNumber}) ;
}
function showJingtiHuanchu(){

	var data = getCheckBoxValue();
	if(data.length!=1){
		$.oimsAlert("???????????????????????????????????????");
		return;
	}
	var div = $("<div id='jingti_chuku'/>").append("<p>?????????<input type='text' name='quantity' id='quantity' /></p>");
	div.oimsDialog({
	title : "????????????",
	width : 250,
	icon : 'view',
	height : 150,
	drag : false,
	locked : true,
	winType : 4,
	button : [ {
		title : "??????",
		func : function() {
			if(!$("#quantity").val()||isNaN($("#quantity").val())||parseInt($("#quantity").val())!=$("#quantity").val()||parseInt($("#quantity").val())<=0){
				$.oimsAlert('??????????????????');
			}
			else{
				var d= getJSONData(RGJT_CHURUKU_URL,{proId:data[0].proId,quantity:$("#quantity").val(),typeId:3,outOrPut:true});
				if(d.state){
					$.oimsSucc('????????????');
				}
				else{
					$.oimsError('????????????');
				}
			}
		
		},
		isCloseWin : true,
		className : "sumit"
	} ],
//	closeCallback : function() {
//		showPatientListToday(); // ????????????????????????
//	}
	});
	$("#quantity").focus();
//	$("#hc").keydown(function(event) {
//	if (event.keyCode == 13) {
//		
//	}
//	});

}
