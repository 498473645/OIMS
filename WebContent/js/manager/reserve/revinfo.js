

// ==============================================预约分派===================================

function revFormDisable(bool) {
	$.each($("#revForm").find("input[type='text']"), function() {
		$(this).attr("disabled", bool);
	});
	$.each($("#revForm").find("input[name='psex']"), function() {
		$(this).attr("disabled", bool);
	});
	$("#pno").attr("disabled", !bool);
	$("#revdt").attr("disabled",false);
}
// 标题
function initTitle(lanKey) {
	$("#right").empty();
	$("#right").append($("<div />").addClass("title"));

	$(".title", $("#right")).append(
			$("<div />").addClass("titleT").append(
					$("<span />").addClass("title1")).append(lanKey));
}
function revSubmit() {
	debugger;
	var etype = $("input[name='eyetype']:checked").val();
	var tmflag = $("input[name='tmflag']:checked").val();
	var projId = $("input[name='projId']:checked").val();
	var patientId = $("#huanzheId").val();
	var jiuzhenId = $("#jiuzhenId").val();
	if (tmflag == "" || tmflag == undefined) {
		//暂时不处理
		$.oimsAlert(yuyue_lan.qingxuanzeyuysj + "！");
		return;
	}
	var revdt = $("#revdt").val();
	if (revdt == "") {
		$.oimsAlert(yuyue_lan.qingxuanzeyuyrq + "！");
		return;
	}
	var data = {
		eyeType : etype,
		timeFlag : tmflag,
		jcxmId : projId,
		revdt : revdt,
		huanzheId : patientId,
		jiuzhenId : jiuzhenId,
		revInfoId : $("#revInfoId").val(),
		revProjId : $("#revProj").val()
	};
	var data = getJSONData(mrgRevInfoUrl, data, "POST");
	if (data.state) {
		$.oimsSucc(yuyue_lan.yuyuejianchacg + "！");
	} else {
		$.oimsError(yuyue_lan.yuyuejianchasb + "！");
	}
	revinfoinit();
}
// 抬头预约信息
function addSumInfoToTitle() {
	$("<div id='c' />").addClass("sum").appendTo($("#right.title"));
}
// 预约分派表单
function addMainForm() {
	var revMainForm = " <table width='100%' border='0' cellspacing='0' cellpadding='0'"
		+ "		class='tablew'>"
		+ "		<tr>"
		+ "			<td>"
		+ "				<div class='query1'>"
		+ "				<form id='revForm' autocomplete='off'>"
		+ "					<table id='revFormTb' width='100%' border='0' cellspacing='0' cellpadding='0'>"
		+ "						<tr>" + "<td align='right' nowrap='nowrap'>"+ yuyue_lan.BingLiHao+":"+ "</td>"
		+ "							<td><input type='hidden' id='huanzheId' name='huanzheId'/>"
		+ "                              <input type='hidden' id='jiuzhenId' name='jiuzhenId'/>"
		+ "                              <input type='hidden' id='revInfoId' name='revInfoId'/>"
		+ "                              <input name='pno' type='text' class='blur' id='pno' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\"/>"
		+ "                          </td>"
		+ "							<td align='right' nowrap='nowrap'>"
		+ yuyue_lan.XingMing
		+ ":</td>"
		+ "							<td><input type='text' name='pname' size='20'"
		+ "								id='pname' onblur=\"this.className='blur'\""
		+ "								onfocus=\"this.className='focus'\" class='blur' /></td>"
		+ "							<td align='right' nowrap='nowrap'>"
		+ yuyue_lan.Sex
		+ ":</td>"
		+ "							<td nowrap='nowrap'><input type='radio' name='psex'"
		+ "								id='radio4' value=1 /><label for='radio4'>"
		+ yuyue_lan.Male
		+ "</label>&nbsp;&nbsp;<input type='radio'"
		+ "								name='psex' id='radio5' value=0 /><label for='radio5'>"
		+ yuyue_lan.Female
		+ "</label></td>"
		+ "							<td align='right' nowrap='nowrap'>"
		+ yuyue_lan.Birth
		+ ":</td>"
		+ "							<td><input type='text' name='pbirthday' size='20'"
		+ "								id='pbirthday' onblur=\"this.className='blur'\""
		+ "								onfocus=\"this.className='focus'\" class='blur' /></td>"
		+ "						</tr>"
		+ "						<tr>"
		+ "							<td align='right' nowrap='nowrap'>"
		+ yuyue_lan.Sfzh
		+ ":</td>"
		+ "							<td><input type='text' name='pidcard' size='20'"
		+ "								id='pidcard' onblur=\"this.className='blur'\""
		+ "								onfocus=\"this.className='focus'\" class='blur' /></td>"
		+ "							<td align='right' nowrap='nowrap'>"
		+ yuyue_lan.TeleNum
		+ ":</td>"
		+ "							<td><input type='text' name='pphone' size='20'"
		+ "								id='pphone' onblur=\"this.className='blur'\""
		+ "								onfocus=\"this.className='focus'\" class='blur' /></td>"
		+ "							<td align='right' nowrap='nowrap'>"
		+ yuyue_lan.lianxidizhi
		+ ":</td>"
		+ "							<td colspan='3'><input type='text' name='paddr'"
		+ "								size='20' id='paddr' onblur=\"this.className='blur'\""
		+ "								onfocus=\"this.className='focus'\" class='blur' /></td>"
		+ "						</tr>"
		+ "						<tr>"
		+ "							<td align='right' nowrap='nowrap'>"
		+ yuyue_lan.yuyuexiangmu
		+ ":</td>"
		+ "							<td><select id='revProj'"
		+ "								onfocus=\"this.className='focus'\""
		+ "								onblur=\"this.className='blur'\">"
		+ "									<option value='0'></option>"
		+ "							</select></td>"
		+ "							<td align='right' nowrap='nowrap'>"
		+ yuyue_lan.jianchayanbie
		+ ":</td>"
		+ "							<td><input type='radio' name='eyetype' id='el' value='46' /><label for='el'>"
		+ yuyue_lan.LeftEye
		+ "</label>"
		+ "&nbsp;&nbsp;<input type='radio' name='eyetype' id='er' value='47' />"
		+ yuyue_lan.RightEye
		+ "</label>&nbsp;&nbsp;"
		+ "<input type='radio' name='eyetype' id='edbl' value='48' /><label for='edbl'>"
		+ yuyue_lan.DoubleEye
		+ "</label>"
		+ "</td>"
		+ "							<td id='jcmxtl' align='right'>&nbsp;</td><td colspan='3' align='left' id='jcmxls'>&nbsp;</td>"
		+ "						</tr>"
		+ "					</table>"
		+ "				</div>"
		+ "				<div class='line'></div>"
		+ "				<div class='query1'>"
		+ "					<table width='100%' border='0' cellspacing='0' cellpadding='0'"
		+ "						class='yytime'>"
		+ "						<tr>"
		+ "							<td width='8%' align='right' nowrap='nowrap'>"
		+ yuyue_lan.YuYueSJ
		+ ":</td>"
		+ "							<td width='21%'><input type='text' name='revdt'"
		+ "								size='20' id='revdt' onblur=\"this.className='blur'\""
		+ "								onfocus=\"this.className='focus'\" class='blur' /></td>"
		+ "							<td width='35%'><div class='buttonsytle1'"
		+ "									style='height: 30px; padding-left: 5px;'>"
		+ "									<a href='#' id='revLnk'><span class='subscribe'></span>"
		+ yuyue_lan.yuyue
		+ "</a>"
		+ "								</div></td>"
		+ "							<td width='7%'>&nbsp;</td>"
		+ "							<td width='7%'>&nbsp;</td>"
		+ "							<td width='7%'>&nbsp;</td>"
		+ "							<td width='7%'>&nbsp;</td>"
		+ "							<td width='8%'>&nbsp;</td>"
		+ "						</tr>"
		+ "						<tr>"
		+ "							<td align='right'>"
		+ yuyue_lan.shangwu
		+ ":</td>"
		+ "							<td colspan='7' class='font'>"
		+ "<input type='radio' name='tmflag' value='08:00:00' id='tmflag1'/><label for='tmflag1'>08:00</label>&nbsp;&nbsp;"
		+ "<input type='radio' name='tmflag' value='08:30:00' id='tmflag2'/><label for='tmflag2'>08:30</label>&nbsp;&nbsp;"
		+ "<input type='radio' name='tmflag' value='09:00:00' id='tmflag3'/><label for='tmflag3'>09:00</label>&nbsp;&nbsp;"
		+ "<input type='radio' name='tmflag' value='09:30:00' id='tmflag4'/><label for='tmflag4'>09:30</label>&nbsp;&nbsp;"
		+ "<input type='radio' name='tmflag' value='10:00:00' id='tmflag5'/><label for='tmflag5'>10:00</label>&nbsp;&nbsp;"
		+ "<input type='radio' name='tmflag' value='10:30:00' id='tmflag6'/><label for='tmflag6'>10:30</label>&nbsp;&nbsp;"
		+ "<input type='radio' name='tmflag' value='11:00:00' id='tmflag7'/><label for='tmflag7'>11:00</label>&nbsp;&nbsp;"
		+ "							</td>"
		+ "						</tr>"
		+ "						<tr>"
		+ "							<td align='right'>"
		+ yuyue_lan.xiawu
		+ ":</td>"
		+ "							<td colspan='7' class='font'>"
		+ "<input type='radio' name='tmflag' value='14:00:00' id='tmflag8'/><label for='tmflag8'>14:00</label>&nbsp;&nbsp;"
		+ "<input type='radio' name='tmflag' value='14:30:00' id='tmflag9'/><label for='tmflag9'>14:30</label>&nbsp;&nbsp;"
		+ "<input type='radio' name='tmflag' value='15:00:00' id='tmflag10'/><label for='tmflag10'>15:00</label>&nbsp;&nbsp;"
		+ "<input type='radio' name='tmflag' value='15:30:00' id='tmflag11'/><label for='tmflag11'>15:30</label>&nbsp;&nbsp;"
		+ "<input type='radio' name='tmflag' value='16:00:00' id='tmflag12'/><label for='tmflag12'>16:00</label>&nbsp;&nbsp;"
		+ "<input type='radio' name='tmflag' value='16:30:00' id='tmflag13'/><label for='tmflag13'>16:30</label>&nbsp;&nbsp;"
		+ "							</td>"
		+ "						</tr>"
		+ "					</table>"
		+ "				</form>"
		+ "				</div>"
		+ "			</td>"
		+ "			<td class='reservationTime'>"
		+ "				<div class='doctordate'>"
		+ "					<div id='showPreDt' class='up2'></div>"
		+ "					<ul id='dtshow'>"
		+ "					</ul>"
		+ "					<div id='showNextDt' class='down2'></div>"
		+ "				</div>"
		+ "				<div id='mjs:tip' class='ordertime'"
		+ "					style='position: absolute; left: 0; top: 0; display: none;'>&nbsp;</div>"
		+ "			</td>" + "		</tr>" + "	</table>";
	$("#right").append($("<div id='rev'/>").addClass("reservation"));
	$("#rev").append($(revMainForm));
}
// 已预约列表
function addList() {
	$("<div />").attr("id", "advquery").addClass("advquery").appendTo("#right");
	var queryTool = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='23%' class='leftalign' ><input name='search' type='text' class='blurview' id='search' value="
			+ yuyue_lan.InputBlhOrXingMing
			+ '...'
			+ " size='28'/>"
			+ "<input type='hidden' name='revstate' id='revstate' value='0'/>"
			+ "</td>"
			+ "<td width='9%'><a href='javascript:revInfoSearch();' class='search'>"
			+ yuyue_lan.Query
			+ "</a></td>"
			+
			// "<td width='9%'><a href='javascript:rev.info.advSearch();'
			// class='advsearch'></a></td>" +
			"<td width='59%' >"
			+ "<div class='btn'>"
			+ "<a href='javascript:updRevInfo();'><span class='edit'></span>"
			+ yuyue_lan.Modify
			+ "</a>"
			+ "<a href='javascript:delRevInfo();'><span class='del'></span>"
			+ yuyue_lan.Del
			+ "</a>"
			+ "</div>"
			+ "</td>"
			+ "</tr>"
			+ "</table>";

	$(queryTool).appendTo("#advquery");
	listFactor = {
		listObj : [ {
			title : yuyue_lan.BingLiHao,
			key : "pno"
		}, {
			title : yuyue_lan.XingMing,
			key : "pname"
		}, {
			title : yuyue_lan.Sex,
			key : "psex",
			func : function(value) {
				return (value == 0) ? yuyue_lan.Female : yuyue_lan.Male;
			}
		}, {
			title : yuyue_lan.Age,
			key : "pbirthday",
			func : function(value) {
				if (value.indexOf(" ") != -1) {
					value = value.split(" ")[0];
				}
				return cal(value);
			}
		}, {
			title : yuyue_lan.YuYueSJ,
			key : "revdt"
		}, {
			title : yuyue_lan.TeleNum,
			key : "phone"
		}, {
			title : yuyue_lan.YanBie,
			key : "eyetype",
			func : function(value) {
				if (value == 46) {
					return yuyue_lan.LeftEye;
				}
				if (value == 47) {
					return yuyue_lan.RightEye;
				}
				if (value == 48) {
					return yuyue_lan.DoubleEye;
				}
			}
		}, {
			title : yuyue_lan.Jcxm,
			key : "projName"
		}, {
			title : yuyue_lan.jcyq,
			key : "jcyq"
		}, {
			title : yuyue_lan.State,
			key : "revstate",
			func : function(value) {
				return (value == 1) ? yuyue_lan.yiqueren : yuyue_lan.yiyuyue;
			}
		} ],
		url : contextPath + findRevInfoByUser,// url
		method : "post",
		checkbox : true,
		single : true,
		invocationEvent : true,// 启用行选中事件
		methodName_Checked : fillRevJcd,// 触发的方法名
		data : {// data表示传的参数
			currentPage : 1,
			pageSize : 10,// Page类的方法,
			revstate : "0",
			tag : Math.random()
		}
	};

	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#right");
	$(div_list).createPageList(listFactor);
	$("#search").click(function(){
		$("#search").val().indexOf("请输入")!=-1?$("#search").val(""):null;
	});
	$("#search").blur(function(){
		$("#search").val()==""?$("#search").val("请输入病历号或姓名..."):null;
	});
}

function getReserveJcdPageSize() {
	var bannerHeight = $("#header").outerHeight();
	var bottomHeight = $("#footer").outerHeight();
	var div_tabHeight = $(".query").outerHeight();
	var winHeight = $(window).height();
	var bodyHeight = winHeight - bannerHeight - bottomHeight - div_tabHeight;
	var h = bodyHeight - 78;
	return Math.floor(h / 25);
}


var revinfobtn = function() {
	$("#search").bind("focus", function() {
		if ($(this).val() == rev.info.searchtip) {
			$(this).removeClass();
			$(this).addClass("focus");
			$(this).val("");
		}
		this.select();
	});
	$("#search").bind("blur", function() {
		if ($(this).val() == "") {
			$(this).removeClass();
			$(this).addClass("blurview");
			$(this).val(rev.info.searchtip);
		}
	});
	$("#search").bind("keyup", function(e) {
		var key = e.which;
		if (13 == key) {
			revInfoSearch();
		}
	});
};
var revInfoSearch = function() {
	// 查询
	var search = $("#search").val();
//	if (search.indexOf(yuyue_lan.Qsr) != -1) {
//		search = "";
//	}
	var obj = {
		search : $("#search").val().indexOf(yuyue_lan.Qsr)!=-1?"":$("#search").val(),
		revstate : $("#revstate").val()
	};
	$.extend(listFactor.data, obj);
	$("#pageList").createPageList(listFactor);
};


function fillRevJcd(dataObjects) {
	if (dataObjects == null) {
		dataObjects = getCheckBoxValue();
	}

	$("#pno").val(dataObjects[0].pno);
	$("#pname").val(dataObjects[0].pname);
	var psex;
	if (dataObjects[0].psex) {
		psex = 1;
	} else {
		psex = 0;
	}

	$("input[name='psex'][value=" + psex + "]").attr("checked", true);
	$("#pbirthday").val(dataObjects[0].pbirthday);
	$("#pidcard").val(dataObjects[0].idcard);
	$("#pphone").val(dataObjects[0].phone);

	$("#paddr").val(dataObjects[0].jtdz);
	$("#huanzheId").val(dataObjects[0].huanzheId);
	$("#jiuzhenId").val(dataObjects[0].jiuzhenId);
	$("#revInfoId").val(dataObjects[0].revInfoId);
	$("#revProj").val(dataObjects[0].revprojId);
	var revdt = dataObjects[0].revdt;
	$("#revdt").val(revdt.split(" ")[0]);
	var revTime = revdt.split(" ")[1];
	$("input[name='tmflag'][value='" + revTime + "']").attr("checked", true);
	$("input[name='eyetype'][value=" + dataObjects[0].eyetype + "]").attr(
			"checked", true);

	showJcxm(dataObjects[0].revprojId);
	$("input[name='projId'][value=" + dataObjects[0].jcxmIds + "]").attr(
			"checked", true);
}

var updRevInfo = function() {
	var etype = $("input[name='eyetype']:checked").val();
	var tmflag = $("input[name='tmflag']:checked").val();
	var projId = $("input[name='projId']:checked").val();
	var patientId = $("#huanzheId").val();
	var jiuzhenId = $("#jiuzhenId").val();
	if (tmflag == "" || tmflag == undefined) {
		// 暂时不处理
		$.oimsAlert(yuyue_lan.qingxuanzeyuysj + "！");
		return;
	}
	var revdt = $("#revdt").val();
	if (revdt == "") {
		$.oimsAlert(yuyue_lan.qingxuanzeyuyrq + "！");
		return;
	}
	var data = {
		// jcdId: jcdid,
		eyeType : etype,
		timeFlag : tmflag,
		jcxmId : projId,
		revdt : revdt,
		huanzheId : patientId,
		jiuzhenId : jiuzhenId,
		revInfoId : $("#revInfoId").val(),
		revProjId : $("#revProj").val()
	};
	var data = getJSONData("/publish/revinfo/updRevInfo.htm", data, "POST");
	if (data.state) {
		$.oimsSucc(yuyue_lan.yuyuejianchaxgcg + "！");
	} else {
		$.oimsError(yuyue_lan.yuyuejianchaxgsb + "！");
	}
	revinfoinit();
};

var delRevInfo = function() {
	if (!isSelect()) {
		return;
	}
	var objs = getCheckBoxValue();
	var ids = new Array();
	$.each(objs, function() {
		ids.push(this.revInfoId);

	});
	var rs = getJSONData(delRevInfoUrl, {
		"ids" : ids.toString()
	}, "POST");
	if (rs.state) {
		$.oimsSucc(yuyue_lan.yuyuejianchasccg);
	} else {
		$.oimsError(yuyue_lan.yuyuejianchascsb);
	}
	revinfoinit();
};
var revinfoinit = function() {
	var lanKey = yuyue_lan.RuRev;
	initTitle(lanKey);
	addSumInfoToTitle();
	addMainForm();
	calendarFun("revdt");
	addList();
	$("#pbirthday").attr("readonly", "true");
	revFormDisable(true);
	$('input[name="psex"]')[0].checked = true;
	$('input[name="eyetype"]')[0].checked = true;

	var pnotip = yuyue_lan.qingshurubinglhhchsk;
	$("#pno").val(pnotip);
	$("#pno").attr("style", "color: #C4C4C4");
	$("#pno").bind("focus", function() {
		$("#pno").attr("style", "");
		if ($(this).val() == pnotip) {
			$(this).val("");
		}
		this.select();
	});
	$("#pno").bind("blur", function() {
		if ($(this).val() == "") {
			$("#pno").attr("style", "color: #C4C4C4");
			$(this).val(pnotip);
		}
	});
	$("#revLnk").bind("click", revSubmit);
//	$("#patientLnk").toggle(function() {
//		$("#pbtn").text(submitVal);
//		$("#revLnk").unbind("click");
//		$("#pno").attr("style", "");
//		revFormDisable(false);
//	}, function() {
//		$("#pbtn").text(pbtnVal);
//		$("#revLnk").bind("click", revSubmit);
//		revFormDisable(true);
//		$("#pno").attr("style", "color: #C4C4C4");
//		$("#pno").val(pnotip);
//	});
	/**
	 * 禁用函数click和blur
	 * author:Guobaoqiang
	 */
//	revinfobtn();

	var rps = getJSONData(getRevProjByUser, {
		tag : Math.random()
	}, "POST");
	if (rps.state) {
		var jcxmList = rps.obj;
		$.each(jcxmList, function(i, d) {
			$("#revProj").append(
					"<option value='" + d.id + "'>" + d.revProjName
							+ "</option>");
		});
		$("#revProj")
				.change(
						function() {
							// $("#jcmxls").remove();
							$("#jcmxls").text(" ");
							$("#jcmxtl").text(" ");
							if ($(this).val() != "") {
								var revprojid = $(this).val();
								showJcxm(revprojid);
								var data = getJSONData(
										"/publish/revinfo/getWeiYueManYyDateByXmid.htm",
										{
											"revProjId" : revprojid,
											tag : Math.random()
										}, "POST");
								if (data.state) {
									var yuyueDate = data.obj;
									$("#revdt").val(yuyueDate);
									var dt = toIELowerDate(yuyueDate);
									dtshow(dt, 0);
								}
							}
						});
	}

	dtshow(new Date(), 0);
	revinfoevent();
};

function showJcxm(revprojid) {
	var jcxmids = getJSONData(getJcxmByRevProjDetail, {
		"revProjId" : revprojid
	}, "POST");
	if (jcxmids.state) {
		$("#jcmxtl").text(yuyue_lan.Jcxm + ":");
		$("#jcmxls").empty();
		$.each(jcxmids.obj, function(i, d) {
			$("#jcmxls").append(
					"<input type='radio' name='projId' id='pid" + d.jcxmId
							+ "' value='" + d.jcxmId + "'>" + "<label for='pid"
							+ this.jcxmid + "'>" + d.jcxmmc
							+ "</label>&nbsp;&nbsp;");
		});
	}
}

var dtshow = function(dt, flag) {
	$("#dtshow").empty();

	var dtobj = getJSONData(getDateShow, {
		"dt" : dt,
		"flag" : flag
	}, "POST").obj;
	$.each(dtobj,
			function() {
				$("#dtshow").append(
						"<li val='"
								+ this.dt
								+ "'>"
								+ toIELowerDate(this.dt).Format(
										'MM' + yuyue_lan.MonthRiQi + 'dd'
												+ yuyue_lan.SRIndex + '[W]')
								+ "</li>");
			});

	$("#dtshow li").hover(
			function() {
				var tip = "";
				var pid = $("#revProj").val();
				if (pid == undefined || pid == "") {
					return;
				}
				var statusForm = getJSONData(findByJcxmNBumen, {
					"reprojId" : pid,
					"revdt" : toIELowerDate($(this).attr("val")).Format(
							"yyyy-MM-dd")
				}, "POST").obj;

				if (statusForm) {
					var tip = "<span>" + yuyue_lan.shangwu + ":</span>" + "<p>"
							+ yuyue_lan.keyuyue + "：<font class=\"blue\">"
							+ statusForm.amnum + "</font>" + yuyue_lan.ren
							+ "</p>" + "<p>" + yuyue_lan.zongyuyue
							+ "：<font class=\"red\">" + statusForm.offerAmNum
							+ "</font>" + yuyue_lan.ren + "</p>" + "<span>"
							+ yuyue_lan.shangwu + "：</span>" + "<p>"
							+ yuyue_lan.keyuyueshu + "：<font class=\"blue\">"
							+ statusForm.pmnum + "</font>" + yuyue_lan.ren
							+ "</p>" + "<p>" + yuyue_lan.zongyuyue
							+ "：<font class=\"red\">" + statusForm.offerPmNum
							+ "</font>" + yuyue_lan.ren + "</p>";

					$(this).attr("tips", tip);
				}
			});

};

function readGhInfo() {
	//if (event.keyCode == 13) {
		var blh = $("#pno").val();
		writeData(blh);
	//}
}

function writeData(blh) {
	if (blh == "") {
		$.oimsAlert(yuyue_lan.qingshurubinglh);
		$("#pno").focus();
	} else {
		var data = getJSONData("/publish/jiuzhen/getJiuZhenByBlh.htm", {
			binglihao : blh
		}, "POST");
		if (data.state == 1) {
			ghhzxx = data.obj;
			$("#pname").val(ghhzxx.xingming);
			$("input[name='psex'][value=" + ghhzxx.xingbie + "]").attr(
					"checked", true);
			$("#pbirthday").val(ghhzxx.csrq);
			$("#pidcard").val(ghhzxx.sfzh);
			$("#pphone").val(ghhzxx.shouji);

			$("#paddr").val(ghhzxx.jtdz);
			$("#huanzheId").val(ghhzxx.huanzheId);
			$("#jiuzhenId").val(ghhzxx.jiuzhenId);

		} else {
			$.oimsAlert(yuyue_lan.weiqudaohuanzjzxx + "！");
		}
	}
}

var revinfoevent = function() {
	$("#showPreDt").bind("click", function() {
		var dt = toIELowerDate($("#dtshow li:first-child").attr("val"));
		dtshow(dt, -1);
	});
	$("#showNextDt").bind("click", function() {
		var dt = toIELowerDate($("#dtshow li:last-child").attr("val"));
		dtshow(dt, 1);
	});
//	$("#revdt").change(function() {
//		$("input[name='tmflag']").attr("disabled", true);
//		var pid = $("input[name='projId']:checked").val();
//		if (pid == undefined || pid == "") {
//			$.oimsAlert(yuyue_lan.qingxianxuanzeyyxm + "！");
//			$(this).val("");
//			return;
//		}
//		if ($(this).val() == "") {
//			return;
//		}
//		var revChgForm = getJSONData(rev.revchg.findByJcxmNBumen, {
//			"jcxmid" : pid,
//			"revdt" : toIELowerDate($(this).val())
//		}, "POST").obj;
//		if (Number(revChgForm.amnum) - Number(revChgForm.offerAmNum) > 0) {
//			rev.info.am(false);
//		}
//		if (Number(revChgForm.pmnum) - Number(revChgForm.offerPmNum) > 0) {
//			rev.info.pm(false);
//		}
//	});
	$("#pno").bind("keydown", function(e) {
		if (e.which == 13) {
			readGhInfo();
		}
	});
};

//var revPatienInit = function(pno) {
//	$("#revProj").attr("disabled", true);
//	$("#revProj").val("");
//	$("#pname").val("");
//	$("#pidcard").val("");
//	$("#pphone").val("");
//	$("#paddr").val("");
//	$("#pbirthday").val("");
//	$("#jcmxtl").text("");
//	$("#patientId").val("");
//	$("#jcmxls").empty();
//	$("input[name='psex'][value='" + common.sex.MALE + "']").attr("checked",
//			true);
//	$("input[name='eyetype'][value='" + common.eyetype.EYEL + "']").attr(
//			"checked", true);
//	rev.info.jcd = undefined;
//	if (pno == "") {
//		return;
//	}
//	rev.info.patient = getJSONData(rev.revinfo.findPatientMapByNo, {
//		"pno" : pno
//	}, "POST").obj[0];
//	if (!rev.info.patient) {
//		$.oimsAlert(yuyue_lan.binglihaobucz + "！");
//		return;
//	}
//
//	$("#patientId").val(rev.info.patient.id);
//	$("#pbirthday").val(rev.info.patient.birthday);
//	if (rev.info.patient.xingbie) {
//		$("input[name='psex'][value='" + common.sex.MALE + "']").attr(
//				"checked", true);
//	} else {
//		$("input[name='psex'][value='" + common.sex.FEMALE + "']").attr(
//				"checked", true);
//	}
//	$("#pname").val(rev.info.patient.xingming);
//	$("#pidcard").val(rev.info.patient.sfzh);
//	$("#pphone").val(rev.info.patient.shouji);
//	$("#paddr").val(rev.info.patient.jtdz);
//};

