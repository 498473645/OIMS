//========================预约项目============================================
var revprojtitle = function (){
	$("#right").empty();	
	$("#right").append($("<div />").addClass("title"));
	
	$(".title",$("#right")).append($("<div />") .addClass("titleT")
			.append($("<span />").addClass("title1"))
			.append(yuyue_lan.yuyuejianchaxm));
};
var revprojlstl = function (){
	$("<div />").attr("id","advquery").addClass("advquery").appendTo("#right");
	var queryTool = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
	    "<tr>" +
	      "<td width='23%' class='leftalign' ><input name='search' type='text' class='blurview' id='search' value='"+yuyue_lan.qingshuruyuyxm+"' size='28'/></td>" +
	      "<td width='9%'><a href='javascript:revProjSearch();' class='search'>"+language.Query+"</a></td>" +
	      "<td width='59%' >" +
	         "<div class='btn'>" +
	         "<a href='javascript:addRevProj();'><span class='add'></span>"+language.Add+"</a>" +
	         "<a href='javascript:updRevProj();'><span class='edit'></span>"+language.Modify+"</a>" +
	         "<a href='javascript:delRevProj();'><span class='del'></span>"+language.Del+"</a>" +
	         "</div>" +
	      "</td>" +
	    "</tr>" +
	  "</table>";
	$(queryTool).appendTo("#advquery");
};

var revprojlsform = function (){
	listFactor = {
	   listObj : [ 
			{
				title : yuyue_lan.Seria,
				key : "paihao"
			},
			{
				title : yuyue_lan.suoshubumen,
				key : "bmmc"
			},
			{
				title : yuyue_lan.XiangMuMC,
				key : "projName"
			},
			{
				title : yuyue_lan.ChargeMan,
				key : "xingming"
			},
			{
				title : yuyue_lan.JianChaWZ,
				key : "checkAddr"
			},
			{
				title : yuyue_lan.shangwuyuyues,
				key : "amnum"
			},
			{
				title : yuyue_lan.xiawuyuyues,
				key : "pmnum"
		    },
			{
				title : yuyue_lan.CzSj,
				key : "opertm"
		    }
			],
			url :contextPath+"/publish/revproj/getRevProjList.htm",// url
			method:"post",
			checkbox:true,
			single:false,
			data : {//data表示传的参数
				currentPage : 1,
			    pageSize : getPageSize(),//Page类的方法
				tag : Math.random()
			}
		};
	var div_list = $("<div />").attr("id", "pageList").attr("class","list").appendTo("#right");
	$(div_list).createPageList(listFactor);
};

var revprojbtn = function(){
	$("#search").bind("focus",function(){
		clearInitQuery(this);
	});
	$("#search").bind("blur",function(){
		if($(this).val() == ""){
			$(this).removeClass();
			$(this).addClass("blurview");
			$(this).val(yuyue_lan.qingshuruyuyxm);
		}
	});
};

var revprojinit = function (){
	revprojtitle();
	revprojlstl();
	revprojlsform();
	revprojbtn();
};
var revProjSearch = function(){
	//查询
	if($("#search").val() == yuyue_lan.qingshuruyuyxm){
		$("#search").val("");
	}
	var obj = {
		search : $("#search").val()
	};
	$.extend(listFactor.data, obj);
	$("#pageList").createPageList(listFactor);
};

/**
 * 重置预约项目时发现全部清空，修改bug，添加项目赋值方法
 * author:Guobaoqiang
 */
function fillAllItem(){
	var dm = getJSONData(findAllBumenUrl, {tag:Math.random()}, "POST");
	$("#departMent")[0].length=0;
	$("<option value=''></option>").appendTo($("#departMent"));
	if(dm && dm.state == 1){
		$.each(dm.obj, function(){
			$("#departMent").append("<option value='"+this.id+"'>"+this.bmmc+"</option>");
		});
	}
	$("#uid")[0].length=0;
	$("<option value=''></option>").appendTo($("#uid"));
	var us = getJSONData("/publish/yuangong/getYuYueDoctorByQuanxian.htm",{tag:Math.random()});
	if(us && us.state == 1){
		$.each(us.obj, function(){
		     $("#uid").append("<option value='"+this.gonghao+"'>"+this.xingming+"</option>");
		});
	}
	$("#btmFrmDIV").remove();
	var arr = new Array();
	var data = getJSONData("/publish/jcxm/findAllJcxm.htm", {
		tag : Math.random()
	}, "post");
	if (data.state) {
		$.each(data.obj, function(i, d) {
			arr.push({
				text : d.xmmc,
				id : d.id
			});

		});
	}
	var ff = $.textAddCommbo({
		id : "btmFrmDIV",
		hiddenId:"jcxmIds"
	});
	$("#btmFrm").append(ff.ele);
	ff.tree(arr, "btmFrmDIV");
	
	var objCheck = getCheckBoxValue();
	
	$("<input type='hidden' value='' name='id' id='id'/>").appendTo("#revProjForm");
	
	var data2 = getJSONData("/publish/revproj/findRevProjDetailById.htm", {"revProjId": objCheck[0].id }, "POST");
	if(data2.state){
		var revProjDetail = data2.obj;
		var jcxm = "";
		$.each(revProjDetail,function(i,d){
			if(i==revProjDetail.length-1){
				jcxm +=d.jcxmmc;
			}else{
				jcxm +=d.jcxmmc+",";
			}
		});
		$("#btmFrmDIV").val(jcxm);
	}

	$("#id").val(objCheck[0].id);
	$("#departMent").val(objCheck[0].bumenId);
	$("#uid").val(objCheck[0].userId);
	$("#amnum").val(objCheck[0].amnum);
	$("#pmnum").val(objCheck[0].pmnum);
	$("#projName").val(objCheck[0].projName);
	$("#checkAddr").val(objCheck[0].checkAddr);
	
	$("#jcxmIds").val(objCheck[0].jcxmIds);
};
function resetRevProjForm(){
//	$.each($("#revProjForm").find("input[type='text']"),function(){
//		$(this).val("");
//	});
//	$.each($("#revProjForm").find("select"),function(){
//		$(this).val("");
//	});
//	$("input[name='detail']").attr("checked", false); 
//	$("input[name='detail']").attr("disabled", false);
	if($("#id").val()!=null){
//		var revproj = getJSONData(rev.revproj.findRevProjById, {"id": $("#id").val() }, "POST").obj;
//		if(revproj){
//			$("#id").val(revproj.id);
//			$("#departMent").val(revproj.departMent);
//			$("#uid").val(revproj.uid);
//			$("#amnum").val(revproj.amnum);
//			$("#pmnum").val(revproj.pmnum);
//			$("#projName").val(revproj.projName);
//			$("#checkAddr").val(revproj.checkAddr);
//			$.each(revproj.detail,function(){
//				$("input[name='detail'][value='"+this+"']").attr("checked", true);
//			});
//		}
		fillAllItem();
	}
	
}
function revProjFormValidate(){
	if($("#departMent").val() == ""){
		$.oimsAlert(yuyue_lan.qingxuanzesuosbm+"！");
		$("#departMent").focus();
		return false;
	}
	if($("#uid").val() == ""){
		$.oimsAlert(yuyue_lan.qingxuanzefuzr+"！");
		$("#uid").focus();
		return false;
	}
	if($("#amnum").val() == ""){
		$.oimsAlert(yuyue_lan.qingshurushangwzdyys+"！");
		$("#amnum").focus();
		return false;
	}
	if($("#pmnum").val() == ""){
		$.oimsAlert(yuyue_lan.qingshuruxiawzdyys+"！");
		$("#pmnum").focus();
		return false;
	}
	if($("#projName").val() == ""){
		$.oimsAlert(yuyue_lan.qingshuruyuyxm+"！");
		$("#projName").focus();
		return false;
	}
	if($("#checkAddr").val() == ""){
		$.oimsAlert(yuyue_lan.qingshurujiancwz+"！");
		$("#checkAddr").focus();
		return false;
	}
	if($("#jcxmIds").val() == ""){
		$.oimsAlert(yuyue_lan.qingxuanzeyuyjcxm+"！");
		$("#jcxmIds").focus();
		return false;
	}
	return true;
}
function addRevProj(){
	var revProjForm = oimsFormWindow({
		id : "revProjForm",
		url : contextPath + "/publish/revproj/addRevProj.htm",
		height : 300,
		width : 750,
		resetForm : resetRevProjForm,
		btnOkSuccess : function(responseText) {
			$.oimsSucc(yuyue_lan.yuyuexiangmutjcg+"！");
			revProjForm.parent().parent().remove();
			revprojinit();
		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
		},
		btnOkBefor : revProjFormValidate
	});
	
	var revProjFormHTML = '<div id="topForm" class="checkdiv1">                               '
		+'	<table width="100%" border="0" cellspacing="0" cellpadding="0">                   '
		+'		<tr>                                                                          '
		+'			<td width="12%" align="right" nowrap="nowrap">'+yuyue_lan.suoshubumen+'：</td>                '
		+'			<td width="16%" align="left"><select name="bumenId" id="departMent"        '
		+'				 onblur="this.className=\'blur\'">  '
		+'					<option value=""></option>                          '
		+'			</select></td>                                                      '
		+'         <td width="1%"><span class="required">*</span></td>'
		+'			<td width="11%" align="right" nowrap="nowrap">'+yuyue_lan.yuyuefuzer+'：</td>     '
		+'			<td width="16%" align="left"><select name="userId" id="uid" onblur="this.className=\'blur\'">  '
		+'					<option value=""></option>                          '
		+'			</select></td> '
		+'         <td width="1%"><span class="required">*</span></td>'
		+'			<td width="15%" align="right" nowrap="nowrap">'+yuyue_lan.shangwuyuyuezds+'：</td> '
		+'			<td width="7%" align="left"><input type="text"                      '
		+'				name="amnum" id="amnum" maxlength="4" onblur="this.className=\'blur\'"  '
		+'				onfocus="this.className=\'focus\'" class="blur" /></td>             '
		+'         <td width="1%"><span class="required">*</span></td>'
		+'			<td width="14%" align="left" nowrap="nowrap">'+yuyue_lan.xiawuzuidayys+'：</td>  '
		+'			<td width="7%" align="left"><input type="text"                      '
		+'				name="pmnum" id="pmnum" maxlength="4" onblur="this.className=\'blur\'"  '
		+'				onfocus="this.className=\'focus\'" class="blur" /></td>             '
		+'         <td width="1%"><span class="required">*</span></td>'
		+'		</tr>                                                                 '
		+'		<tr>                                                                  '
		+'			<td align="right" nowrap="nowrap">'+yuyue_lan.yuyuexiangmu+'：</td>               '
		+'			<td colspan="4" align="right"><input type="text"                    '
		+'				name="projName" id="projName" onblur="this.className=\'blur\'"  '
		+'				onfocus="this.className=\'focus\'" class="blur" /></td>             '
		+'         <td width="1%"><span class="required">*</span></td>'
		+'			<td align="right" nowrap="nowrap">'+yuyue_lan.JianChaWZ+'：</td>                   '
		+'			<td colspan="4" align="right"><input type="text"                    '
		+'				name="checkAddr" id="checkAddr"                               '
		+'				onblur="this.className=\'blur\'" onfocus="this.className=\'focus\'"   '
		+'				class="blur" /></td>                                              '
		+'         <td width="1%"><span class="required">*</span></td>'
		+'		</tr>                                                                 '
		+'     <tr><td align="right" nowrap="nowrap">'+yuyue_lan.yuyueguanlixm+'：</td>'
		+'         <td colspan="9" align="right"><div id="btmFrm" class="checkdiv"/>'
		+'         <input type="hidden" name="jcxmIds" id="jcxmIds"/></td>'
		+'         <td width="1%"><span class="required">*</span></td>'
		+'     </tr>'
		+'	</table>                                                                '
		+'</div>                                                                    ';
	//添加
	revProjForm.append(revProjFormHTML);
	var dm = getJSONData(findAllBumenUrl, {tag:Math.random()}, "POST");
	if(dm && dm.state == 1){
		$.each(dm.obj, function(){
			$("#departMent").append("<option value='"+this.id+"'>"+this.bmmc+"</option>");
		});
	}
	var us = getJSONData("/publish/yuangong/getYuYueDoctorByQuanxian.htm",{tag:Math.random()});
	if(us && us.state == 1){
		$.each(us.obj, function(){
		     $("#uid").append("<option value='"+this.gonghao+"'>"+this.xingming+"</option>");
		});
	}
	
	var arr = new Array();
	var data = getJSONData("/publish/jcxm/findAllJcxm.htm", {
		tag : Math.random()
	}, "post");
	if (data.state) {
		$.each(data.obj, function(i, d) {
			arr.push({
				text : d.xmmc,
				id : d.id
			});

		});
	}
	var ff = $.textAddCommbo({
		id : "btmFrmDIV",
		hiddenId:"jcxmIds"
	});
	$("#btmFrm").append(ff.ele);
	ff.tree(arr, "btmFrmDIV");
}

var updRevProj = function(){//type=1 添加  type=2修改
	if(!isSingleSelect()){
		return;
	}
	var revProjForm = oimsFormWindow({
		id : "revProjForm",
		url : contextPath + "/publish/revproj/updRevProj.htm",
		height : 300,
		width : 750,
		resetForm : resetRevProjForm,
		dialogTitle : yuyue_lan.Modify,
		btnOkSuccess : function(responseText) {
			$.oimsSucc(yuyue_lan.yuyuexiangmuxgcg+"！");
			revProjForm.parent().parent().remove();
			revprojinit();
		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
		},
		btnOkBefor : revProjFormValidate
	});
	var revProjFormHTML = '<div id="topForm" class="checkdiv1">                               '
		+'	<table width="100%" border="0" cellspacing="0" cellpadding="0">                   '
		+'		<tr>                                                                          '
		+'			<td width="12%" align="right" nowrap="nowrap">'+yuyue_lan.suoshubumen+'：</td>                '
		+'			<td width="16%" align="left"><select name="bumenId" id="departMent"        '
		+'				 onblur="this.className=\'blur\'">  '
		+'					<option value=""></option>                          '
		+'			</select></td>                                                      '
		+'         <td width="1%"><span class="required">*</span></td>'
		+'			<td width="11%" align="right" nowrap="nowrap">'+yuyue_lan.yuyuefuzer+'：</td>     '
		+'			<td width="16%" align="left"><select name="userId" id="uid" onblur="this.className=\'blur\'">  '
		+'					<option value=""></option>                          '
		+'			</select></td> '
		+'         <td width="1%"><span class="required">*</span></td>'
		+'			<td width="15%" align="right" nowrap="nowrap">'+yuyue_lan.shangwuyuyuezds+'：</td> '
		+'			<td width="7%" align="left"><input type="text"                      '
		+'				name="amnum" id="amnum" maxlength="4" onblur="this.className=\'blur\'"  '
		+'				onfocus="this.className=\'focus\'" class="blur" /></td>             '
		+'         <td width="1%"><span class="required">*</span></td>'
		+'			<td width="14%" align="left" nowrap="nowrap">'+yuyue_lan.xiawuzuidayys+'：</td>  '
		+'			<td width="7%" align="left"><input type="text"                      '
		+'				name="pmnum" id="pmnum" maxlength="4" onblur="this.className=\'blur\'"  '
		+'				onfocus="this.className=\'focus\'" class="blur" /></td>             '
		+'         <td width="1%"><span class="required">*</span></td>'
		+'		</tr>                                                                 '
		+'		<tr>                                                                  '
		+'			<td align="right" nowrap="nowrap">'+yuyue_lan.yuyuexiangmu+'：</td>               '
		+'			<td colspan="4" align="right"><input type="text"                    '
		+'				name="projName" id="projName" onblur="this.className=\'blur\'"  '
		+'				onfocus="this.className=\'focus\'" class="blur" /></td>             '
		+'         <td width="1%"><span class="required">*</span></td>'
		+'			<td align="right" nowrap="nowrap">'+yuyue_lan.JianChaWZ+'：</td>                   '
		+'			<td colspan="4" align="right"><input type="text"                    '
		+'				name="checkAddr" id="checkAddr"                               '
		+'				onblur="this.className=\'blur\'" onfocus="this.className=\'focus\'"   '
		+'				class="blur" /></td>                                              '
		+'         <td width="1%"><span class="required">*</span></td>'
		+'		</tr>                                                                 '
		+'     <tr><td align="right" nowrap="nowrap">'+yuyue_lan.yuyueguanlixm+'：</td>'
		+'         <td colspan="9" align="right"><div id="btmFrm" class="checkdiv"/>'
		+'         <input type="hidden" name="jcxmIds" id="jcxmIds"/></td>'
		+'         <td width="1%"><span class="required">*</span></td>'
		+'     </tr>'
		+'	</table>                                                                '
		+'</div>                                                                                ';
	//添加
	revProjForm.append(revProjFormHTML);
	var dm = getJSONData(findAllBumenUrl, {tag:Math.random()}, "POST");
	if(dm && dm.state == 1){
		$.each(dm.obj, function(){
			$("#departMent").append("<option value='"+this.id+"'>"+this.bmmc+"</option>");
		});
	}
	var us = getJSONData("/publish/yuangong/getYuYueDoctorByQuanxian.htm",{tag:Math.random()});
	if(us && us.state == 1){
		$.each(us.obj, function(){
		     $("#uid").append("<option value='"+this.gonghao+"'>"+this.xingming+"</option>");
		});
	}
	
	var arr = new Array();
	var data = getJSONData("/publish/jcxm/findAllJcxm.htm", {
		tag : Math.random()
	}, "post");
	if (data.state) {
		$.each(data.obj, function(i, d) {
			arr.push({
				text : d.xmmc,
				id : d.id
			});

		});
	}
	var ff = $.textAddCommbo({
		id : "btmFrmDIV",
		hiddenId:"jcxmIds"
	});
	$("#btmFrm").append(ff.ele);
	ff.tree(arr, "btmFrmDIV");
	
	var objCheck = getCheckBoxValue();
	
	$("<input type='hidden' value='' name='id' id='id'/>").appendTo("#revProjForm");
	
	var data2 = getJSONData("/publish/revproj/findRevProjDetailById.htm", {"revProjId": objCheck[0].id }, "POST");
	if(data2.state){
		var revProjDetail = data2.obj;
		var jcxm = "";
		$.each(revProjDetail,function(i,d){
			if(i==revProjDetail.length-1){
				jcxm +=d.jcxmmc;
			}else{
				jcxm +=d.jcxmmc+",";
			}
		});
		$("#btmFrmDIV").val(jcxm);
	}

	$("#id").val(objCheck[0].id);
	$("#departMent").val(objCheck[0].bumenId);
	$("#uid").val(objCheck[0].userId);
	$("#amnum").val(objCheck[0].amnum);
	$("#pmnum").val(objCheck[0].pmnum);
	$("#projName").val(objCheck[0].projName);
	$("#checkAddr").val(objCheck[0].checkAddr);
	$("#jcxmIds").val(objCheck[0].jcxmIds);

};

var delRevProj = function(){
	var dataObjects=getCheckBoxValue();
	if(dataObjects.length==0){
		$.oimsAlert(yuyue_lan.qingxuanzeliebjljxcz+"！");
		return;
	}
	$.oimsConfirm({strTitle:yuyue_lan.shifoushanchuxzjcxm+"！",remove_length:true}, doDelRevProj);
};
function doDelRevProj(dataObjects){
	var dataObjects=getCheckBoxValue();
	var ids = new Array();
	$.each(dataObjects, function(i){
		ids.push(dataObjects[i].id);
	});
	var t = getJSONData(delRevProjUrl,{"ids": ids.toString()},"POST");
	if(t && t.state == 1){
		$.oimsSucc(language.DelOK_Alert,revprojinit);
		//revprojinit();
	}else{
		$.oimsAlert(language.DelError_Alert);
	}
}
