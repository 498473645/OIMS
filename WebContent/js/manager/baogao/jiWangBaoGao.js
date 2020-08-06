var getAllJCXM_url = "/publish/HistoryInspectResult/getAllJCXM.htm";
var getJCXMStateByBinglihao_url = "/publish/HistoryInspectResult/getJCXMStateByBinglihao.htm";
var getJCJGByBingLiHaoAndDate_url = "/publish/HistoryInspectResult/getJCJGByBingLiHaoAndDate.htm";
var getJCJGByBingLiHao_url = "/publish/HistoryInspectResult/getJCJGByBingLiHao.htm";
var getHuanzhexinxiByBLH_url = "/publish/huanZheXinXi/getHuanzhexinxiByBLHForHistoryBaogao.htm";
var getHuanzhexinxiByBLHToHis_url = "/publish/huanZheXinXi/getHuanzhexinxiByBLHToHis.htm";
var binglihao;
var HZXX;
function Ready_jiWangBaoGao(btns) {
	btns_baoGaoIs = btns;
	pageTitle = "查看原眼科检查记录";
	var div_advquery = $("<div/>").attr("id", "advquery").attr("class",
			"advquery").appendTo("#right");
	var table_advquery = "";
	table_advquery += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	table_advquery += "<tr>"
			+ "<td width='23%' class='leftalign' ><input name='search_jcdh' type='text' class='blurview' id='search_jcdh' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"
			+ "请输入病历号"
			+ "' size='28' /></td>"
			+ "<td width='9%'><a href='javascript:search_binglihao();' class='search'>"
			+ "查询" + "</a></td>" + // 普通查询
			"<td width='59%' >" + "</td>" + "</tr>";
	table_advquery += "</table>";
	$(table_advquery).appendTo(div_advquery);
	$("#search_jcdh").click(function() {
		clearInitQuery(this);
	});// 点击输入框清空字体
	$("#search_jcdh").blur(function() {
		if (this.value == "") {
			$("#search_jcdh").val("请输入病历号");
			$("#search_jcdh").addClass("blurview");
		}
	}).keydown(function(e){
		if (e.which == 13) {
			search_binglihao();
		}
	});
	
	var div_list = $("<div/>").attr("id", "div_list").appendTo("#right");
	// 获取所有的检查名称
	var getAllJCXM_data = getJSONData(getAllJCXM_url, {
		tag : Math.random()
	}, "POST");
	if ((getAllJCXM_data || getAllJCXM_data.obj != null)) {
		showJCXMAndState(getAllJCXM_data.obj, $("#search_jcdh").val(), div_list);
	}
}

function showJCXMAndState(data, binglihao, div) {
	var btnDiv = $("<div />").appendTo(div);
	var reportDiv = $("<div />").appendTo(div);
	$.each(data, function(index, data) {
		var content_div = $("<div />").attr("id", "jcxm" + data.id).attr(
				"style", "float:left;margin:5px;").appendTo(btnDiv);
		var input_button;
		if ((data.count != null && data.count > 0) && HZXX != null) {
			input_button = $("<input type='button' />").val(data.jcxmName)
					.attr("style", "width:100px;height:25px;color:red;")
					.appendTo(content_div);
			input_button.click(function() {
				getHospitalResult(binglihao, data.id, reportDiv);
			});
		} else {
			input_button = $("<input type='button' />").val(data.jcxmName)
					.attr("style", "width:100px;height:25px;").attr("disabled",
							"disabled").appendTo(content_div);
		}
		$("<input type='hidden' />").val(data.id)
				.attr("id", "hidden" + data.id).appendTo(content_div);
	});

}

function search_binglihao() {
	// HZXX = null;
	// binglihao = $("#search_jcdh").val();
	// HZXX =
	// getJSONData(getHuanzhexinxiByBLH_url,{binglihao:binglihao,tag:Math.random()},"POST").obj;
	// if(HZXX==null){
	// getJSONData(getHuanzhexinxiByBLHToHis_url,{binglihao:binglihao,tag:Math.random()},"POST");
	// HZXX =
	// getJSONData(getHuanzhexinxiByBLH_url,{binglihao:binglihao,tag:Math.random()},"POST").obj;
	// }
	// $("#right #div_list").text("");
	// var getJCXMStateByBinglihao_data =
	// getJSONData(getJCXMStateByBinglihao_url,
	// {
	// binglihao : binglihao,
	// tag : Math.random()
	// }, "POST");
	// if (getJCXMStateByBinglihao_data
	// && getJCXMStateByBinglihao_data.obj != null) {
	// showJCXMAndState(getJCXMStateByBinglihao_data.obj);
	// }
	showJWResultByBinglihao($("#search_jcdh").val(), $("#right #div_list"));

}

function show_result(data, hzxx, div) {
	var div_result_button = $("<div />").attr("id", "div_result_button").attr(
			"style", "clear: both;").appendTo(div);
	var cli_date = data.hbr.tableDate;
	var div_result_content = $("<div />").attr("id",
					"div_result_content").appendTo(div);
	$.each(data.list, function(index, da) {
		var input_button = $("<input type='button' />").attr("style",
				"height: 20px;width: 80px;margin: 5px;").val(da.cli_date)
				.appendTo(div_result_button);
		
		if (index == 0) {
			$.extend(da, hzxx);
			common_showWithHtmlTemplate(contextPath + data.hbr.url, da,
					div_result_content);
		}
		$(input_button).click(
				function() {
					$.extend(da, hzxx);
					div_result_content.text("");
					common_showWithHtmlTemplate(contextPath + data.hbr.url+"?tag="+Math.random(), da,
							div_result_content);
				});
	});
	var div_buttonsytle1 = $("<div/>").attr("id", "div_buttonsytle1").attr(
			"class", "buttonsytle1").attr("style",
			"width: 640px;margin: 0px auto;");// 操作按钮div
	$(div_buttonsytle1).appendTo(div);// 追加到主div
	var a_report = "<a id='a_printreport' class='btnone'><span class='print'></span>"
		+ "打印" + "</a>";// 打印报告信息
	$(a_report).appendTo(div_buttonsytle1).click(function(){
		importJS("/js/LodopFuncs.js");
		var strHtml="<body>"+$("#div_result_content").html()+"</body>"; 
		LODOP = getLodop();  
		LODOP.PRINT_INIT("OIMS打印");
		LODOP.ADD_PRINT_HTM(0,0,"100%","100%",strHtml);
		LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW",true);
		LODOP.SET_PRINT_MODE("FULL_HEIGHT_FOR_OVERFLOW",true); 
		LODOP.SET_PRINT_PAGESIZE(0,0,0,"A4");
		LODOP.PRINT();	
	});
	
}

function getHZXX(binglihao){
	HZXX = null;
	HZXX = getJSONData(getHuanzhexinxiByBLH_url, {
		binglihao : binglihao,
		tag : Math.random()
	}, "POST").obj;
	if (HZXX == null) {
		getJSONData(getHuanzhexinxiByBLHToHis_url, {
			binglihao : binglihao,
			tag : Math.random()
		}, "POST");
		HZXX = getJSONData(getHuanzhexinxiByBLH_url, {
			binglihao : binglihao,
			tag : Math.random()
		}, "POST").obj;
	}
}
/**
 * 患者病历号、填充的div
 * 
 * @param binglihao
 * @param div
 */
function showJWResultByBinglihao(binglihao, div) {
	getHZXX(binglihao);
	$(div).text("");
	var getJCXMStateByBinglihao_data = getJSONData(getJCXMStateByBinglihao_url,
			{
				binglihao : binglihao,
				tag : Math.random()
			}, "POST");
	if (getJCXMStateByBinglihao_data
			&& getJCXMStateByBinglihao_data.obj != null) {
		showJCXMAndState(getJCXMStateByBinglihao_data.obj, binglihao, div);
	}
}

/**
 * 根据条件查询对应的数据表
 * 
 */
function getHospitalResult(binglihao, id, reportDiv) {
	var getJCJGByBingLiHao_data = getJSONData(getJCJGByBingLiHao_url, {
		binglihao : binglihao,
		jcxmId : id,
		tag : Math.random()
	}, "POST");
	if (getJCJGByBingLiHao_data.state && getJCJGByBingLiHao_data.obj != null) {
		$(reportDiv).text("");
		if(HZXX==undefined||HZXX==null)
			getHZXX(binglihao);
		show_result(getJCJGByBingLiHao_data.obj, HZXX, reportDiv);
	}
}



function showHospitalData(binglihao,jcxmid){
	var getHistoryBaogaoRelationByJCXM_url = "/publish/HistoryInspectResult/getHistoryBaogaoRelationByJCXM.htm"
	var getHistoryBaogaoRelationByJCXM_data = getJSONData(getHistoryBaogaoRelationByJCXM_url,{jcxmid:jcxmid,tag:Math.random()},"POST");
	var getJCJGByBingLiHao_data = getJSONData(getJCJGByBingLiHao_url, {
		binglihao : binglihao,
		jcxmId : getHistoryBaogaoRelationByJCXM_data.obj.id,
		tag : Math.random()
	}, "POST");
	if (getJCJGByBingLiHao_data.state && getJCJGByBingLiHao_data.obj != null&&getJCJGByBingLiHao_data.obj.list.length) {
		$(reportDiv).text("");
		var reportDiv = $("<div />").append($("<div />").attr("id","reportDiv"));
		reportDiv.oimsDialog({
			title : "查看原眼科报告",
			width : 750,
			icon : 'view',
			height : 500,
			drag : false,
			locked : true,
			winType : 4,
		});
//		var width = $("#div_result_content").width();
//		var height = $("#div_result_content").height();
//
//		$(".openWin").css({
//			"width" : width,
//			"height" : function(index, value) {
//				var height = $("#div_reportdiv").height();
//				var windowHeight = $(window).height();
//				if (height <= windowHeight) {
//					return height;
//				}
//			}
//		});
//		if(HZXX==undefined||HZXX==null)
			getHZXX(binglihao);
		show_result(getJCJGByBingLiHao_data.obj, HZXX, reportDiv);
	}else{
		$.oimsAlert("该患者没有检查过该项目！");
	}
	//根据jcxmid查询对应 检查项目
}

// function show_result(data){
// var div_result = $("<div
// />").attr("id","div_result").appendTo($("#div_list"));
// var div_result_button = $("<div
// />").attr("id","div_result_button").attr("style","clear:
// both;").appendTo($(div_result));
// var ul = $("<ul />").appendTo(div_result_button);
// var cli_date = data.hbr.tableDate;
// $.each(data.list,function(index,da){
// $("<li />").text(da.cli_date).appendTo(ul);
// });
// debugger;
// jiwang_timeFun();
//	
//	
//	
// var div_result_content = $("<div
// />").attr("id","div_result_content").appendTo($(div_result));
// }
//
//
// function jiwang_timeFun(){
// importCSS("/js/manager/baogao/css/jiwang.css");
// var ulList = $("#div_result_button ul li");
// jiwang_ulLiControl(ulList);
// $(ulList).click(function(){
// zIndex = 900;
// for(var i = 0,length = ulList.length;i<length;i++){
// if(ulList[i] == $(this)[0]){
// }else{
// zIndex = zIndex - 1;
// $(ulList[i]).css({"z-index":zIndex});
// $(ulList[i])[0].className = "off";
// }
// }
// $(this)[0].className = "on";
// $(this).css({"z-index":"900"});
// });
// }
//
// function jiwang_ulLiControl(ulList){
// var left = 15+$("#div_result_button").position().left,
// zIndex = 900;
// for(var i = 0,length = ulList.length;i<length;i++){
// if(i != 0){
// left = left +94;
// zIndex = zIndex - 1;
// $(ulList[i]).css({"left":left+"px","position":"absolute","z-index":zIndex});
// }else{
// $(ulList[i]).css({"left":left+"px","position":"absolute","z-index":"900"});
// }
// }
// }
