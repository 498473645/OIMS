//========================================预约号数变更=====================================================
var revchgdttitle = function (){
    $("#right").empty();    
    $("#right").append($("<div />").addClass("title"));
    
    $(".title",$("#right")).append($("<div />") .addClass("titleT")
            .append($("<span />").addClass("title1"))
            .append(yuyue_lan.YuyueHaoShuChg));
};


var revchgdtform = function(){
	var chgdtForm = '<div class="queryform">                                                   '
		+ '    <form action="post" id="revchgdt">                                    '
		+ '	<table width="100%" border="0" cellspacing="0" cellpadding="0">          '
		+ '		<tr>                                                                   '
		+ '			<td width="5%" align="right" nowrap>'+yuyue_lan.DepartName+'：</td>                  '
		+ '			<td width="14%"><input type="text" name="departMent"                 '
		+ '				id="departMent" onblur="this.className=\'blur\'"                     '
		+ '				onfocus="this.className=\'focus\'" class="blur" /><input type="hidden" name="bumenId" id="bumenId"></td>              '
		+ '			<td width="5%" align="right" nowrap>'+yuyue_lan.YuYueSJ+'：</td>                  '
		+ '			<td width="7%"><input type="text" name="revdt"                   '
		+ '				id="revdt" onblur="this.className=\'blur\'"                      '
		+ '				onfocus="this.className=\'focus\'" class="blur" /></td>              '
		+ '			<td width="4%" align="right" nowrap>'+yuyue_lan.yuyuexiangmu+'：</td>                  '
		+ '			<td width="7%"><select name="projid" id="projid"                      '
		+ '				 onblur="this.className=\'blur\'">   '
		+ '					<option value=""></option>                                 '
		+ '			</select></td>                                                       '
		+ '			<td width="7%" align="right" nowrap>'+yuyue_lan.yuyueshijian+'：</td>                  '
		+ '			<td width="13%" nowrap><input type="radio" name="timeflag" id="tfam" value="02:00:00" onclick="showRevChg(this);"/><label for="tfam">'+yuyue_lan.shangwu+'</label>'
		+ '              &nbsp;&nbsp;<input type="radio" name="timeflag" id="tfpm" value="13:00:00" onclick="showRevChg(this);"/><label for="tfpm">'+yuyue_lan.xiawu+'</label></td>                             '
		+ '		</tr>                                                                  '
		+ '		<tr>                                                                   '
		+ '			<td align="right" nowrap>'+yuyue_lan.dangqianhaoshu+'：</td>                             '
		+ '			<td><input type="text" name="revnum" id="revnum"             '
		+ '				onblur="this.className=\'blur\'" onfocus="this.className=\'focus\'"    '
		+ '				class="blur" /></td>                                               '
		+ '			<td align="right">'+yuyue_lan.yiyuyueshu+'：</td>                                    '
		+ '			<td><input type="text" name="yuyueNum" id="yuyueNum"             '
		+ '				onblur="this.className=\'blur\'" onfocus="this.className=\'focus\'"    '
		+ '				class="blur" /></td>                                               '
		+ '			<td align="right" nowrap>'+yuyue_lan.biangengshuliang+'：</td>                             '
		+ '			<td><input type="text" name="chgnum" id="chgnum"             '
		+ '				onblur="this.className=\'blur\'" onfocus="this.className=\'focus\'"    '
		+ '				class="blur" /></td>                                               '
		+ '			<td align="right" nowrap>'+yuyue_lan.yuyuedizhi+'：</td>                             '
		+ '			<td><input type="text" name="chkAddr" id="chkAddr"             '
		+ '				onblur="this.className=\'blur\'" onfocus="this.className=\'focus\'"    '
		+ '				class="blur" /></td>                                               '
		+ '		</tr>                                                                  '
		+ '	</table>                                                                 '
		+ '	<div class="buttonsytle">                                                '
		+ '		<a href="javascript:revChgdtAdd();"><span class="add"></span>'+yuyue_lan.AddNo+'</a>                '
		+ '		<a href="javascript:revChgdtDel();"><span class="del"></span>'+yuyue_lan.CutNo+'</a>                '
		+ '	</div>                                                                   '
		+ '	</form>                                                                  '
		+ '</div>                                                                    ';
	
	$(chgdtForm).appendTo("#right");
};
var revchgdtlsform = function (){
	listFactor = {
	   listObj : [ 
			{
				title : yuyue_lan.Seria,
				key : "paihao"
			},
			{
				title : yuyue_lan.DepartName,
				key : "bmmc"
			},
			{
				title : yuyue_lan.yuyuexiangmu,
				key : "projName"
			},
			{
				title : yuyue_lan.YuYueSJ,
				key : "revdt",
				func: function (value){
					return value.substring(0, 10);
				}
			},
			{
				title : yuyue_lan.XingQiShu,
				key : "revdt",
				func: function (value){
					return yuyue_lan.XingQi+toIELowerDate(value.substring(0, 10)).Format("W");
				}
			},
			{
				title : yuyue_lan.ShangXiaWu,
				key : "timeflag",
				func: function(value){
					return (value==1)?yuyue_lan.shangwu:yuyue_lan.xiawu;
				}
			},
			{
				title : yuyue_lan.biangengshu,
				key : "chgnum"
			},
			{
				title : yuyue_lan.State,
				key : "biaoshi",
				func:function(value){
					return (value==0)?yuyue_lan.CutNo:yuyue_lan.AddNo;
				}
			},
			{
				title : yuyue_lan.CZR,
				key : "xingming"
			}
			],
			url :contextPath + getRevChgList,// url
			method:"post",
			checkbox:false,
			single:false,
			data : {//data表示传的参数
				currentPage : 1,
			    pageSize : getRevChgPageSize(),//Page类的方法
				tag : Math.random()
			}
		};
	var div_list = $("<div />").attr("id", "pageList").attr("class","list").appendTo("#right");
	$(div_list).createPageList(listFactor);
};

function getRevChgPageSize(){
	var bannerHeight = $("#header").outerHeight();
	var bottomHeight = $("#footer").outerHeight();
	var div_tabHeight = $(".queryform").outerHeight();
	var winHeight = $(window).height();
	var bodyHeight=winHeight-bannerHeight-bottomHeight-div_tabHeight;
    var h = bodyHeight-50;
    return Math.floor(h/25);
}

var revchgdtforminit = function(){
//	$.datepicker.setDefaults($.datepicker.regional['zh-CN']);
	$("input[name='timeflag']").attr("disabled", true);
	$("#chgnum,#revnum,#offernum,#departMent,#chkAddr,#revdt").attr("readonly", true);
//	$("#revdt").datepicker({minDate: new Date()});
	calendarFun("revdt");
	$("input[name='timeflag'][value='02:00:00']").attr("checked", true);
	$("#projid,#chkAddr, #chgnum, #revnum, #offernum").val("");
};
var revchgdtdata = function(){
	revchgdtforminit();
	var data = getJSONData(getBumenByGonghaoUrl, {tag:Math.random()}, "POST");
	if(data.state){
		var bumen = data.obj;
		$("#departMent").val(bumen.bmmc);
		$("#bumenId").val(bumen.id);
		var rpdata = getJSONData(getProjByDepartMent, 
				{"bumenId": bumen.id}, "POST");
		if(rpdata.state){
			var rpList = rpdata.obj;
			$.each(rpList, function(){
				$("#projid").append("<option value='"+this.id+"'>"
						+ this.projName + "</option>");
			});
		}
	}
	
	
	$("#revdt").val("");
	$("#projid").change(function(){
		if($("#projid").val() == ""){
			revchgdtforminit();
			return;
		}
		if($("#revdt").val()==""){
			$("#revdt").focus();
			return;
		}
		$("input[name='timeflag']").attr("disabled", false);
		$("#chgnum").attr("readonly", false);

		var data = getJSONData(findByJcxmNBumen, 
				{"reprojId": $("#projid").val(), "revdt": $("#revdt").val() }, "POST");
		if(data.state){
			var revchgForm = data.obj;
			$("input[name='timeflag'][value='02:00:00']").attr("checked", true);
				$("#revnum").val(revchgForm.offerAmNum);
				$("#yuyueNum").val(revchgForm.yuyueNumAm);
				$("#chkAddr").val(revchgForm.addr);
				$("#chgnum").val("");
		}
		
	});
};


function showRevChg(field){
	var dt = field.value;
	 var reporjId =	$('#projid option:selected').val();
	 var revdt = $("#revdt").val();
	 var data = getJSONData(findByJcxmNBumen,{"reprojId": reporjId, "revdt": revdt,tag:Math.random() }, "POST");
	 if(data.state){
		 var revchgForm = data.obj;
			if(dt=="02:00:00"){
					$("#revnum").val(revchgForm.offerAmNum);
					$("#yuyueNum").val(revchgForm.yuyueNumAm);
					$("#chkAddr").val(revchgForm.addr);
					$("#chgnum").val("");
			} else{
					$("#revnum").val(revchgForm.offerPmNum);
					$("#yuyueNum").val(revchgForm.yuyueNumPm);
					$("#chkAddr").val(revchgForm.addr);
					$("#chgnum").val("");
		
			} 	
		}
};

var revChgdtAdd= function(){
	//加号
	if($("#chgnum").val() == ""||$("#chgnum").val()==0){
		$.oimsAlert(yuyue_lan.qingshurubiangsl);
		return;
	}
	var revTime = $("input[name='timeflag']:checked").val();
	var reporjId =	$('#projid option:selected').val();
	
	var d = getJSONData(findRevProjById,{"id":reporjId,tag:Math.random()},"POST");
	if(d.state){
		var revProj = d.obj;
		var adddata = {
				chgnum: $("#chgnum").val(),
				revdt: $("#revdt").val()+" "+revTime,
				jcxmid: revProj.jcxmIds,
				bmid: revProj.bumenId,
				uid: revProj.userId,
				biaoshi:1
			};
		
		var chgdata = getJSONData(mrgRevChgUrl,adddata, "POST");
		if(chgdata.state){
			$.oimsSucc(yuyue_lan.yuyuehaoshubgcg+"!",revchgdtinit);
		}
	}
	
	
};
var revChgdtDel= function(){
	//减号
	if($("#chgnum").val() == 0){
		$.oimsAlert(yuyue_lan.qingshurubiangsl);
		return;
	}
	if($("#chgnum").val()>$("#revnum").val()){
		$.oimsAlert(yuyue_lan.biangengshuliangdydqhs+"!");
		$("#chgnum").val("");
		return;
	}
	var revTime = $("input[name='timeflag']:checked").val();
	var reporjId =	$('#projid option:selected').val();
	
	var d = getJSONData(findRevProjById,{"id":reporjId,tag:Math.random()},"POST");
	if(d.state){
		var revProj = d.obj;
		var adddata = {
				chgnum: $("#chgnum").val(),
				revdt: $("#revdt").val()+" "+revTime,
				jcxmid: revProj.jcxmIds,
				bmid: revProj.bumenId,
				uid: revProj.userId,
				biaoshi:0
			};
		
		var chgdata = getJSONData(mrgRevChgUrl,adddata, "POST");
		if(chgdata.state){
			$.oimsSucc(yuyue_lan.yuyuehaoshubgcg+"!",revchgdtinit);
		}
	}
};
var revchgdtinit = function(){
	revchgdttitle();
	revchgdtform();
	revchgdtlsform();
	revchgdtdata();
};