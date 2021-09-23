/**
 * 开单
 */
var _emr_checkTabs = ['normal','special','sort','assay'];
function _emr_showChecks(obj){
	obj =$(obj);
	if(obj.hasClass('tab_show')){
		return;
	}else{
		var index = obj.index();
		obj.parent().children().each(function(i,o){
			if($(o).hasClass('tab_show')){
				$('#'+_emr_checkTabs[i]).css({'display':'none'});
				$(o).removeClass('tab_show');
				return;
			}
		});
		obj.addClass('tab_show');
		$('#'+_emr_checkTabs[index]).css({'display':'block'});
		if(_emr_checkTabs[index]=="normal"){
		}else if(_emr_checkTabs[index]=="special"){
			_emr_showNormalChecks();
			_emr_showSpecialChecks();
		}else if(_emr_checkTabs[index]=="sort"){
			_emr_showSortChecks();
		}
	}
}

/**
 * 常规检查
 */
function _emr_showNormalChecks(){
	if($('#normalitems').children().length>0){
		return;
	}
	var getChangGuiListUrl = "/publish/doctor/getChangGuiListUrl.htm";
	var normalList = getJSONData(getChangGuiListUrl, {id : 8}).obj;
	$('<caption>常规检查</caption>').appendTo('#normalitems');
	var tr;
	for(var i=0,len=normalList.length;i<len;i++){
		var item = normalList[i];
		if(i%2==0){
			tr = $('<tr/>').appendTo('#normalitems');
		}
		var td = $('<td/>').css({'border-bottom':'1px dashed #d2d2d2','width':'50%'}).appendTo(tr);
		var checkbox = $('<input type="checkbox">').attr({'id':item.xmid}).appendTo(td);
		var span = $('<span/>').text(item.xmmc).appendTo(td);
		span.click(function(){
			$(this).prev().click();
		});
	}
}

/**
 * 显示检查项目
 */
function _emr_showSpecialChecks(){
	if($('#specialitems').children().length>0){
		return;
	}
	var getTeShuListAllUrl = "/publish/doctor/getTeShuListAllUrl.htm";
	var specialList = getJSONData(getTeShuListAllUrl, {id : 9}).obj;
	$('<caption>特殊检查</caption>').appendTo('#specialitems');
	var tr;
	for(var i=0,len=specialList.length;i<len;i++){
		var item = specialList[i];
		if(i%2==0){
			tr = $('<tr/>').appendTo('#specialitems');
		}
		var td = $('<td/>').css({'border-bottom':'1px dashed #d2d2d2','width':'50%'}).appendTo(tr);
		var checkbox = $('<input type="checkbox">').attr({'id':item.xmid}).appendTo(td);
		var span = $('<span/>').text(item.xmmc).appendTo(td);
		span.click(function(){
			if($(this).prev().attr('checked')){
				$(this).prev().removeAttr('checked');
				_emr_billing_clearPaint();
			}else{
				$(this).prev().attr('checked','checked');
				_emr_billing_showPaint();
			}
		});
	}
}

/**
 * 按病种显示检查项目
 */
function _emr_showSortChecks(){
	if($($('#sort').children()[0]).children().length>0){
		return;
	}
	var getTeShuListUrl = "/publish/doctor/getTeShuListUrl.htm";
	var sortList = getJSONData(getTeShuListUrl, {id : 9}).obj;
	var left = $($('#sort').children()[0]);
	var right = $($('#sort').children()[1]);
	function show(btn){
		if($(btn).hasClass('close')){
			$(btn).removeClass('close').addClass('open');
			$(btn).parent().next().css({'display':'block'});
		}else{
			$(btn).removeClass('open').addClass('close');
			$(btn).parent().next().css({'display':'none'});
		}
	}
	for(var i=0,len=sortList.length;i<len;i++){
		var item = sortList[i];
		var disease = $('<div class="disease"/>');
		var title = $('<div class="title"/>').text(item.jbname).appendTo(disease);
		var chkAll = $('<input type="checkbox" style="float:left;margin-top:3px;"/>').appendTo(title);
		chkAll.click(function(){
			if($(this).attr('checked')=='checked'){
				$(this).parent().next().find('input[type="checkbox"]').attr('checked','checked');
				/*全选，展开检查项目*/
				$(this).next().next().removeClass().addClass('open');
				$(this).parent().next().css('display','block');
			}else{
				$(this).parent().next().find('input[type="checkbox"]').removeAttr('checked');
			}
		});
		$('<span/>').appendTo(title);
		var btn = $('<span class="close"/>').appendTo(title);
		var table = $('<table style="border-collapse: collapse;width:100%;display:none;"/>').appendTo(disease);
		btn.click(function(){
			show(this);
		});
		var childItems = item.jcxm;
		for(var j=0,len1=childItems.length;j<len1;j++){
			var tr=$('<tr/>').appendTo(table);
			var td = $('<td style="border-bottom:1px dashed #d2d2d2;padding-left:12px;"/>').appendTo(tr);
			$('<input type="checkbox"/>').attr({id:childItems[j].xmid}).appendTo(td).click(function(){
				if($(this).attr('checked')=='checked'){
					$(this).parents('.disease').find('div[class="title"] input').attr('checked','checked');
				}else{
					if($(this).parents('.disease').find('table input:checked').length==0){
						$(this).parents('.disease').find('div[class="title"] input').removeAttr('checked');
					}
				}
			});
			var span = $('<span style="margin-left:5px;"/>').text(childItems[j].xmmc).appendTo(td);
			span.click(function(){
				if($(this).prev().attr('checked')=='checked'){
					$(this).prev().removeAttr('checked');
					if($(this).parents('.disease').find('table input:checked').length==0){
						$(this).parents('.disease').find('div[class="title"] input').removeAttr('checked');
					}
				}else{
					$(this).prev().attr('checked','checked');
					$(this).parents('.disease').find('div[class="title"] input').attr('checked','checked');
				}
			});
		}
		if(i%2==0){
			disease.appendTo(left);
		}else{
			disease.appendTo(right);
		}
	}
}

function _emr_billing_showPaint(){
	importJS("/js/jquery.swfobject.1-1-1.js");
	var od=$("#check_tips_od").empty();
	var os=$("#check_tips_os").empty();
	showPaintNew(od,['/demo/doctor/physical_images/fundus_od.png','/demo/doctor/physical_images/fundus_od.png']);
	showPaintNew(os,['/demo/doctor/physical_images/fundus_od.png','/demo/doctor/physical_images/fundus_od.png']);
}

function _emr_billing_clearPaint(){
	$("#check_tips_od").empty();
	$("#check_tips_os").empty();
}