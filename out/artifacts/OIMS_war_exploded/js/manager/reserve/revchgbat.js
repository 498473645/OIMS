//====================================预约号数批处理========================

var revchgbattitle = function (){
    $("#right").empty();    
    $("#right").append($("<div />").addClass("title"));
    
    $(".title",$("#right")).append($("<div />") .addClass("titleT")
            .append($("<span />").addClass("title1"))
            .append(yuyue_lan.YuyueHaoShuBat));
};
var revchgbatform = function (){
	var chgbatForm = '<div class="queryform">                                                   '
		+ '    <form action="post" id="revchgdt">                                    '
		+ '	<table width="100%" border="0" cellspacing="0" cellpadding="0">          '
		+ '		<tr>                                                                   '
		+ '			<td width="5%" align="right" nowrap>'+yuyue_lan.DepartName+'：</td>                  '
		+ '			<td width="14%"><input type="text" name="departMent"                 '
		+ '				id="departMent" onblur="this.className=\'blur\'"                     '
		+ '				onfocus="this.className=\'focus\'" class="blur" /><input type="hidden" name="bumenId" id="bumenId"></td>              '
		+ '			<td width="5%" align="right" nowrap>'+yuyue_lan.qishiriqi+'：</td>                  '
		+ '			<td width="7%"><input type="text" name="revdt"                   '
		+ '				id="revdt" onblur="this.className=\'blur\'"                      '
		+ '				onfocus="this.className=\'focus\'" class="blur" /></td>              '
		+'            <td width="4%" align="right" nowrap>'+yuyue_lan.XingQiShu+'：</td>                                                   '
		+'            <td width="7%"><select id="weekFlag"  onblur="this.className=\'blur\'">'
		+'              <option value=1>'+yuyue_lan.Monday+'</option>'
		+'              <option value=2>'+yuyue_lan.Tuesday+'</option>'
		+'              <option value=3>'+yuyue_lan.Wednesday+'</option>'
		+'              <option value=4>'+yuyue_lan.Thursday+'</option>'
		+'              <option value=5>'+yuyue_lan.Friday+'</option>'
		+'              <option value=6>'+yuyue_lan.Saturday+'</option>'
		+'              <option value=0>'+yuyue_lan.Sunday+'</option>'
		+'            </select></td>'
		+'            <td width="7%" align="right" nowrap>'+yuyue_lan.yuyuezhouqi+'：</td>'
		+'            <td width="13%" nowrap><input type="radio" name="revPeriod" id="revPeriod0" value="30" />'
		+'                <label for="revPeriod0">'+yuyue_lan.MonthRiQi+'</label>&nbsp;&nbsp;'
		+'                <input type="radio" name="revPeriod" id="revPeriod1" value="90" />'
		+'                <label for="revPeriod1">'+yuyue_lan.jidu+'</label>&nbsp;&nbsp;'
		+'                <input type="radio" name="revPeriod" id="revPeriod2" value="180" />'
		+'                <label for="revPeriod2">'+yuyue_lan.bannian+'</label>&nbsp;&nbsp;'
		+'                <input type="radio" name="revPeriod" id="revPeriod3" value="365" />'
		+'                <label for="revPeriod3">'+yuyue_lan.year+'</label></td>'
		+'            </tr>'
		+ '		</tr>'
		+ '		<tr>'
		+ '			<td width="4%" align="right" nowrap>'+yuyue_lan.yuyuexiangmu+'：</td>                  '
		+ '			<td width="7%"><select name="projid" id="projid"                      '
		+ '				 onblur="this.className=\'blur\'">   '
		+ '					<option value=""></option>                                 '
		+ '			</select></td>                                                       '
		+ '			<td align="right" nowrap>'+yuyue_lan.jishu+'：</td>                             '
		+ '			<td><input type="text" name="revnum" id="revnum"             '
		+ '				onblur="this.className=\'blur\'" onfocus="this.className=\'focus\'"    '
		+ '				class="blur" /></td>                                               '
		+ '			<td align="right" nowrap>'+yuyue_lan.biangengshuliang+'：</td>                             '
		+ '			<td><input type="text" name="chgnum" id="chgnum"             '
		+ '				onblur="this.className=\'blur\'" onfocus="this.className=\'focus\'"    '
		+ '				class="blur" /></td>                                               '
		+ '			<td width="7%" align="right" nowrap>'+yuyue_lan.yuyueshijian+'：</td>                  '
		+ '			<td width="13%" nowrap><input type="radio" name="timeflag"              '
		+ '				id="tfam" value="02:00:00" onclick="showRevChgBat(this);"/><label for="tfam">'+yuyue_lan.shangwu+'</label>&nbsp;&nbsp;<input type="radio" name="timeflag"  '
		+ '				id="tfpm" value="13:00:00" onclick="showRevChgBat(this);"/><label for="tfpm">'+yuyue_lan.xiawu+'</label></td>                             '
		+ '		</tr>                                                                  '
		+ '	</table>                                                                 '
		+ '	<div class="buttonsytle">                                                '
		+ '		<a href="javascript:revchgbatadd();"><span class="add"></span>'+yuyue_lan.AddNo+'</a>                '
		+ '		<a href="javascript:revchgbatdel();"><span class="del"></span>'+yuyue_lan.CutNo+'</a>                '
		+ '	</div>                                                                   '
		+ '	</form>                                                                  '
		+ '</div>                                                                    ';
	
	$(chgbatForm).appendTo("#right");
};
var revchgbatlsform = function (){
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
					    pageSize : getRevChgBatPageSize(),//Page类的方法
						tag : Math.random()
					}
				};
			var div_list = $("<div />").attr("id", "pageList").attr("class","list").appendTo("#right");
			$(div_list).createPageList(listFactor);
};

function getRevChgBatPageSize(){
	var bannerHeight = $("#header").outerHeight();
	var bottomHeight = $("#footer").outerHeight();
	var div_tabHeight = $(".queryform").outerHeight();
	var winHeight = $(window).height();
	var bodyHeight=winHeight-bannerHeight-bottomHeight-div_tabHeight;
    var h = bodyHeight-50;
    return Math.floor(h/25);
}

var revchgbatforminit = function(){
	$("#chgnum,#revnum,#departMent,#chkAddr,#revdt").attr("readonly", true);
	$("input[name='timeflag']").attr("disabled", true);
	//-------------------------------------------------------------------------------------------------------------
	/**
	 * 添加日历挂件，包括改变星期值
	 * author:Guobaoqiang
	 */
	calendar_rev_Fun("revdt","weekFlag");
	//-------------------------------------------------------------------------------------------------------------
	$("input[name='timeflag'][value='02:00:00']").attr("checked", true);
	$("input[name='revPeriod'][value='30']").attr("checked", true);
	$("#weekFlag").val(1);
	$("#projid,#chkAddr, #chgnum, #revnum").val("");
};
var revchgbatdata = function(){
	revchgbatforminit();
	$("input[name='timeflag']").attr("disabled", true);
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
	
	$("#projid").change(function(){
		if($("#projid").val() == ""){
			revchgbatforminit();
			return;
		}
		if($("#revdt").val()==""){
			$("#revdt").focus();
			return;
		}
		$("input[name='timeflag']").attr("disabled", false);
		$("#chgnum").attr("readonly", false);
		var d = getJSONData(findRevProjById,{"id":$("#projid").val(),tag:Math.random()},"POST");
		
		if(d.state){
			var revProj = d.obj;
			$("input[name='timeflag'][value='02:00:00']").attr("checked", true);
			$("#revnum").val(revProj.amnum);
			$("#chgnum").val("");
		}
	});
};
function calendar_rev_Fun(id,rev_id){
	if($("#"+id).length){
	 var cal = Calendar.setup({
         onSelect: function(cal) { 
        	 cal.hide();
			 var date = cal.selection.get();
             if (date) {
                     date = Calendar.intToDate(date);
                     document.getElementById(id).value = Calendar.printDate(date, "%Y-%m-%d");
                     if(document.getElementById(id).value != ""){
                    	 $("#"+id).removeAttr("title").removeClass("error1");
                    	 if(!dateCompare(id,"")){
                    		 $("#"+id).attr("title",common_language.RiQiTimeChaoTu).addClass("error1");
                    	 }
                     }
                     if(rev_id){
                    	  var revdt_date=new Date(date);
                          var revdt_day=revdt_date.getDay();
                          $("#"+rev_id)[0].value=revdt_day;
                     }
             }
		  }
     });
		  cal.widthLength(id);
		  cal.topLength(id);
	      cal.manageFields(id, id, "%Y-%m-%d");
	 }
}

function showRevChgBat(field){
	var dt = field.value;
	 var reporjId =	$('#projid option:selected').val();
	 var revdt = $("#revdt").val();
	 var d = getJSONData(findRevProjById,{"id":$("#projid").val(),tag:Math.random() }, "POST");
	 if(d.state){
		 var revProj = d.obj;
			if(dt=="02:00:00"){
				$("#revnum").val(revProj.amnum);
			} else{
				$("#revnum").val(revProj.pmnum);
			} 	
		}
};

var revchgbatadd = function(){
	//加号
	if($("#chgnum").val() == ""||$("#chgnum").val()==0){
		$.oimsAlert(yuyue_lan.qingshurubiangsl);
		return;
	}
	var revPeriod = $("input[name='revPeriod']:checked").val();
	var weekFlag = $("#weekFlag option:selected").val();
	var revTime = $("input[name='timeflag']:checked").val();
	var reporjId =	$("#projid option:selected").val();
	
	var d = getJSONData(findRevProjById,{"id":reporjId,tag:Math.random()},"POST");
	if(d.state){
		var revProj = d.obj;
		var adddata = {
				timeFlag:revTime,
				weekFlag:weekFlag,
				revPeriod:revPeriod,
				chgnum: $("#chgnum").val(),
				revdt: $("#revdt").val()+" "+revTime,
				jcxmid: revProj.jcxmIds,
				bmid: revProj.bumenId,
				uid: revProj.userId,
				biaoshi:1
			};
		
		var chgdata = getJSONData(mrgRevChgBatUrl,adddata, "POST");
		if(chgdata.state){
			$.oimsSucc(yuyue_lan.yuyuehaoshubgcg+"！",revchgbatinit);
		}
	}
};
var revchgbatdel = function(){
	//减号
	if($("#chgnum").val() == ""||$("#chgnum").val()==0){
		$.oimsAlert(yuyue_lan.qingshurubiangsl);
		return;
	}
	if($("#chgnum").val()>$("#revnum").val())
		{
		  $.oimsAlert(yuyue_lan.biangengshuliangdydqhs+"!");
		  $("#chgnum").val("");
		  return;
		}
	var revPeriod = $("input[name='revPeriod']:checked").val();
	var weekFlag = $("#weekFlag option:selected").val();
	var revTime = $("input[name='timeflag']:checked").val();
	var reporjId =	$('#projid option:selected').val();
	
	var d = getJSONData(findRevProjById,{"id":reporjId,tag:Math.random()},"POST");
	if(d.state){
		var revProj = d.obj;
		var adddata = {
				timeFlag:revTime,
				weekFlag:weekFlag,
				revPeriod:revPeriod,
				chgnum: $("#chgnum").val(),
				revdt: $("#revdt").val()+" "+revTime,
				jcxmid: revProj.jcxmIds,
				bmid: revProj.bumenId,
				uid: revProj.userId,
				biaoshi:0
			};
		
		var chgdata = getJSONData(mrgRevChgBatUrl,adddata, "POST");
		if(chgdata.state){
			$.oimsSucc(yuyue_lan.yuyuehaoshubgcg+"！",revchgbatinit);
		}
	}
};
var revchgbatinit = function(){
	revchgbattitle();
	revchgbatform();
	revchgbatlsform();
	revchgbatdata();
};
