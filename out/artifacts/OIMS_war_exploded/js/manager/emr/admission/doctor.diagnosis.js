/**患者接诊*/

var _emr_container;
var _emr_gettabs_url = '/publish/emr/gettabs.htm';
var _emr_getpatientinfo_url = '/publish/emr/getpatientinfo.htm';
var _emr_patientdefaultphoto_female_url = '/images/pople0.png';
var _emr_patientdefaultphoto_male_url = '/images/pople.png';
var _emr_patientresource_url = '/publish/category/findCategorysByFatherId.htm';
var _emr_recordsOfHistory_url = '/publish/emr/getRecordsOfHistory.htm';
var _emr_passed_url = '/publish/emr/patientpass.htm';//患者过号
var _emr_finish_url = '/publish/emr/patientfinish.htm';//完成诊断
var _emr_updatemobile = '/publish/emr/updatepatientmobile.htm';// 更新手机号
var validateTabSwitchUrl = '/publish/emr/validateTabSwitch.htm';
var _emr_bingliprintnum_url='/publish/emr/bingliprintnum.htm';//查询是否有打印记录
var _emr_finishandupdateclinic_url='/publish/emr/finishandupdateclinic.htm';
var _emr_savebingliprint_url="/publish/emr/savebingliprint.htm";
var eyePDFBaoGao_jw=[];
var currentVisit;
/***********************************************************************************************/

/**
 * 初始化页面
 */
function _emr_initDiagnosisPage(){
	importJS('/jquery_ui/js/jquery-ui-1.10.2.custom.min.js');
	importJS('/easyui/plugins/jquery.parser.js');
	importJS("/easyui/plugins/jquery.draggable.js");
	importJS("/easyui/plugins/jquery.droppable.js");
	importJS("/easyui/plugins/jquery.tree.js");
	importJS('/easyui/plugins/jquery.panel.js');
	importJS('/easyui/plugins/jquery.resizable.js');
	importJS('/easyui/plugins/jquery.pagination.js');
	importJS('/easyui/plugins/jquery.linkbutton.js');
	importJS('/easyui/plugins/jquery.datagrid.js');
	importJS('/easyui/plugins/jquery.tooltip.js');
	importJS('/easyui/plugins/jquery.validatebox.js');
	importJS('/easyui/plugins/jquery.combo.js');
	importJS('/easyui/plugins/jquery.combobox.js');
	importJS('/easyui/plugins/jquery.menu.js');
	importJS('/easyui/plugins/jquery.numberbox.js');
	importJS('/easyui/plugins/jquery.spinner.js');
	importJS('/easyui/plugins/jquery.numberspinner.js');
	importJS('/easyui/locale/easyui-lang-zh_CN.js');
	importCSS('/jquery_ui/css/start/jquery-ui-1.10.2.custom.min.css');
	importCSS('/easyui/themes/default/panel.css');
	importCSS('/easyui/themes/default/datagrid.css');
	importCSS('/easyui/themes/default/combo.css');
	importCSS('/easyui/themes/default/combobox.css');
	importCSS('/easyui/themes/default/menu.css');
	importCSS('/easyui/themes/default/tree.css');
	importCSS('/easyui/themes/default/numberbox.css');
	importCSS('/easyui/themes/default/validatebox.css');
	importCSS('/easyui/themes/default/spinner.css');
	importCSS("/easyui/themes/icon.css");
	importCSS('/easyui/themes/default/linkbutton.css');
	importCSS('/easyui/themes/default/pagination.css');
	importCSS('/easyui/themes/default/tooltip.css');

	$.extend($.fn.datagrid.defaults.editors, {
	    numberspinner: {
	        init: function(container, options){
	            var input = $('<input type="text">').appendTo(container);
	            return input.numberspinner(options);
	        },
	        destroy: function(target){
	            $(target).numberspinner('destroy');
	        },
	        getValue: function(target){
	            return $(target).numberspinner('getValue');
	        },
	        setValue: function(target, value){
	            $(target).numberspinner('setValue',value);
	        },
	        resize: function(target, width){
	            $(target).numberspinner('resize',width);
	        }
	    }
	});
	pageTitle="患者接诊";
	init();

	/**加载今日接诊的患者人数信息*/
	_emr_initQuantityInfo($('.title'));

	/**加载医生工作站界面*/
	_emr_container = $(getHtmlContent('emrcontainer')).appendTo('.right');
	_emr_container.height($('.right').height()-$('.title').outerHeight()-2);
	_emr_container.width($(window).width()-$('.left').outerWidth()-4);
	$('.title').width(_emr_container.outerWidth()-10-2);
	/**加载 患者信息和按钮*/
	if(!_emr_initPatientInfo($('.toolbar'))){//无待接诊患者
		//TODO 跳转到患者列表界面
		_emr_initPatientListPage();
		return false;
	}

	/**加载工作区域*/
	$('#mainpanel').addClass('mainpanel');
	$('#mainpanel').height(_emr_container.height()-_emr_container.find('.toolbar').outerHeight()-5);
	$('#mainpanel').width(_emr_container.width());
	/**创建就诊记录滑块*/
	var showrecords = $('<div id="showrecords" class="records" />').appendTo('#mainpanel');
	$('<table style="width:100%;height:100%;border-collapse: collapse;"><tr><td>就诊记录</td></tr></table>').appendTo(showrecords);
	showrecords.attr('title','点击显示历史记录');
	showrecords.height($('#mainpanel').height()-1);
	showrecords.click(_emr_showRecordList);

	/**加载历史就诊记录列表*/
	var recordlist = $(getHtmlContent('recordlist')).appendTo('#mainpanel');
	recordlist.height(showrecords.height());
	var vChild = $('#jzlistdiv').children();
	$(vChild[2]).height($('#jzlistdiv').height()-$(vChild[0]).outerHeight()-$(vChild[1]).outerHeight()-$(vChild[3]).outerHeight());
	_emr_mousescroll($(vChild[2]),$(vChild[2]).children(),66);
	_emr_createRecords();
	showrecords.find('td').text('就诊记录'+$('#recordlist ul').children().length+'次');
	/**创建主要工作区域：包括选项卡和选项卡面板*/
	var main = $('<div id="main"/>').addClass('main').appendTo('#mainpanel');
	main.width($('#mainpanel').width()-showrecords.width()-2);
	main.height($('#mainpanel').height()-1);

	$('#recordlist ul').find('li:eq(0)').click();//显示主要界面
	$('#compare').unbind('click').bind('click',function(){
		_emr_recordCompare();
	});
//	importJS("/js/manager/emr/highstock.js") ;
}

/**
 * 初始化患者信息以及按钮事件
 * @param container 容器
 */
function _emr_initPatientInfo(container){
	var html = $(getHtmlContent('infoandtool'));
	var patientInfo;
	var currentVisitID = $('body').data('patient')?$('body').data('patient').visit[0].id : 0;
	if(getPatientInfo(currentVisitID)){
		html.appendTo(container);
		var index = 0;
		/**重呼
		$('div[class="btn"] a:eq('+(index++)+')',html).click(function(){
			$.oimsAlert('请'+$('body').data('patient').xingming+'到1诊室就诊！');
		});*/
		/**下一位*/
		$('div[class="btn"] a:eq('+(index++)+')',html).click(function(){
			if(!getPatientInfo($('body').data('patient').visit[0].id)){
				$.oimsAlert('最后一位');
				return;
			}else{
				_emr_createRecords();
				clearPrevPatientData();
				$('#recordlist ul').find('li:eq(0)').click();//显示主要界面
			}
		});
		/**过号*/
		$('div[class="btn"] a:eq('+(index++)+')',html).click(function(){
			getJSONData(_emr_passed_url,{visitId:$('body').data('patient').visit[0].id,tag:Math.random()},'POST');
			if(!getPatientInfo($('body').data('patient').visit[0].id)){
				_emr_initPatientListPage();
				$('body').removeData('patient');//移除绑定在body中的患者数据
				return;
			}else{
				_emr_createRecords();
				clearPrevPatientData();
				$('#recordlist ul').find('li:eq(0)').click();//显示主要界面
			}
		});
		/**完成*/
		$('div[class="btn"] a:eq('+(index++)+')',html).click(function(){
			if(validData()){
				finishDiagnose();
			}
		});

		/**完成并打印*/
		$('div[class="btn"] a:eq('+(index++)+')',html).click(function(){
			if(validData()){
				_emr_printRecord(finishDiagnose);
			}
		});
		return true;
	}
	return false;

	/**完成患者就诊*/
	function finishDiagnose(){
		var data = getJSONData(_emr_finish_url,{visitId:$('body').data('patient').visit[0].id,tag:Math.random()},'POST');
		if(data&&data.state==0){//未填写诊断信息，弹出提示窗口
			$.oimsError('请填写诊断结果');
			return false;
		}
		if(!getPatientInfo($('body').data('patient').visit[0].id)){//最后一位患者
			_emr_initPatientListPage();
			$('body').removeData('patient');//移除绑定在body中的患者数据
			return false;
		}else{
			_emr_createRecords();
			clearPrevPatientData();
			$('#recordlist ul').find('li:eq(0)').click();//显示主要界面
			_emr_initQuantityInfo($('.title'));//刷新患者人数信息
		}
	}


	/**
	 * 根据接诊的上一位患者就诊id，获取下一位接诊患者信息。
	 * @param currentVisitID 上一位患者的就诊ID，如果当前接诊患者未第一位患者，则为0
	 * @returns {Boolean} 存在返回true，否则返回false
	 */
	function getPatientInfo(currentVisitID){
		var param = {gonghao:currentDoctorGonghao,tag:Math.random(),currentVisitID:currentVisitID,state:$('body').data('visitState')};
		var data = getJSONData(_emr_getpatientinfo_url,param,'POST');
		if(data){//存在待接诊患者
			//设置患者头像图片
			data.photourl = data.photourl||(data.xingbie ? _emr_patientdefaultphoto_male_url:_emr_patientdefaultphoto_female_url);
			initPatientBase(html,data);
			$('body').data('patient',data);//将患者信息绑定到body中
			return true;
		}
		return false;
	}
	/**初始化患者基本信息*/
	function initPatientBase(html,data){
		$('td span:eq(0)',html).text(data.visit[0].serialNo);
		$('td span:eq(1)',html).text(data.binglihao);
		$('td span:eq(2)',html).text(data.xingming);
		$('td span:eq(3)',html).text(data.xingbie ? '男':'女');
		$('td span:eq(4)',html).text(_emr_calculteAge(data.shengri)+'岁');
		$('td span:eq(5)',html).text(data.charge_type);
		if(data.shouji){
			$('#mobile',html).attr('readonly','readonly').val(data.shouji);
		}else{
			$('#mobile',html).removeAttr('readonly').val('').bind('blur',function(){
				var mobile = $(this).val();
				if(mobile)
					data.shouji = getJSONData(_emr_updatemobile,{patientId:data.id,mobile:mobile,tag:Math.random()},'POST').obj;
			});
		}
		var img = $('th img:eq(0)',html).attr({src:'..'+data.photourl});
		img.unbind('mouseover');
		img.mouseover(function(){
			if(!patientInfo){
				patientInfo = $(getHtmlContent('patientInfo'));
				var left = $(this).position().left+$(this).width();
				var top = $(this).position().top;
				_emr_setPatientDetailInfo(patientInfo,$('body').data('patient'));
				patientInfo.css({position:'absolute',left:left,top:top}).appendTo('#emrContainer');
				$('body').data('patientId',$('body').data('patient').id);
			}else{
				if($('body').data('patientId')!=$('body').data('patient').id){
					_emr_setPatientDetailInfo(patientInfo,$('body').data('patient'));
					$('body').data('patientId',$('body').data('patient').id);
				}
				patientInfo.show();
			}
		});
		img.unbind('mouseout');
		img.mouseout(function(){
			if(patientInfo){
				patientInfo.hide();
			}
		});
	}
}
function validData(){
	if(!validateRequired()) return false;
	return true;
}
/**完成诊断时，验证病历合法性*/
function validateRequired(){
	var patient = $('body').data('patient');
	var flag = true;
	if(!patient.shouji){
		$.oimsAlert("请填写患者手机号",function(){
			$('#mobile').focus();
		});
		flag = false;
	}
	else if(!patient.vision||!patient.vision.ll||!patient.vision.rl){
		if(validateTabSwitch($('#tabs').children(':eq(1)'))){
			$.oimsAlert("请录入患者视力",function(){
				$('#tabs').children(':eq(1)').click();
			});

		}
		flag = false;
	}
//	else if(patient.visit[0].records){
//		$.each(patient.visit[0].records,function(){
//			if(this.categoryId==30104){
//				var jilu = $.trim(this.jilu);
//				if(!jilu){
//					$.oimsAlert("请完善过敏史",function(){
//						$('#tabs').children(':eq(0)').click();
//					});
//					flag = false;
//				}
//				return false;
//			}
//		});
//
//	}

	else{
		if(patient.visit[0].state==oimsCategory.VISITING_STATE_WAIT){
			if(!$.trim($("#followed_up_time").val())){
				if(validateTabSwitch($('#tabs').children(':eq(6)'))){
					$.oimsAlert("请录下次门诊随访时间",function(){
						$('#tabs').children(':eq(6)').click();
					});
				}
				flag = false;
			}
		}
		else{
			if(patient.visit[0].state==oimsCategory.VISITING_STATE_AGAIN||patient.visit[0].sate==oimsCategory.VISITING_STATE_YIWANCHENG){
				$('#tabs').children(':eq(6)').click();
				if(!$.trim($("#followed_up_time").val())){
					$.oimsAlert("请录入门诊随访");
					flag=false;
				}
			}
		}

	}
	return flag;
}

/**清除上一位接诊患者的就诊数据*/
function clearPrevPatientData(){
	$('#tabs').children().each(function(){
		var obj = $(this).data('contentObj');
		if(obj&&obj.clear){
			obj.clear();
		}
	});
}

/**
 * 初始化问诊、体格检查、检查、诊断、处方等标签
 * @param container 容器
 */
function _emr_initTabs(container){
	var data = getJSONData(_emr_gettabs_url,{tag:Math.random()},'POST');
	if(data){
		var html = $('<div id="tabs" style="height: 28px;" class="tablabe2 mcTitleTag">').appendTo(container);
		for(var i=0,len=data.length;i<len;i++){
			var tab = $('<div class="tab_hide"><span>'+data[i].category+'</span></div>').appendTo(html).data('tabData',data[i]);
			if(data[i].intr){
				var func = eval('('+data[i].intr+')');
				tab.bind('click',func);
			}
		}
		return true;
	}
	return false;
}

/**问诊选项卡面板*/
function _emr_inquiry(){
	if(!_emr_switchTab(this,$(this).data('contentObj'))) return;
	if($(this).data('contentObj')){return;};
	importJS('/js/manager/emr/admission/doctor.inquiry.js');
	$(this).data('contentObj',new _emr_inquiry_obj());
}
/**体格检查选项卡面板*/
function _emr_physical(){
	if(!_emr_switchTab(this,$(this).data('contentObj'))) return;
	if($(this).data('contentObj')){return;};
	importJS('/js/manager/emr/admission/doctor.physical.js');
	$(this).data('contentObj',new _emr_physical_obj());
}

/** 检查选项卡面板*/
function _emr_inspection(){
	if(!_emr_switchTab(this,$(this).data('contentObj'))) return;
	if($(this).data('contentObj')){return;};
	importJS('/js/manager/emr/admission/doctor.inspection.js');
	$(this).data('contentObj',new _emr_inspection_obj());
}

/**诊断选项卡面板*/
function _emr_diagnose(){
	if(!_emr_switchTab(this,$(this).data('contentObj'))) return;
	if($(this).data('contentObj')){return;};
	importJS('/js/manager/emr/admission/doctor.diagnose.js');
	$(this).data('contentObj',new _emr_diagnose_obj());
}
/**处方选项卡面板*/
function _emr_prescription(){
	if(!_emr_switchTab(this,$(this).data('contentObj'))) return;
	if($(this).data('contentObj')){return;};
	importJS('/js/manager/emr/admission/doctor.prescription.js');
	$(this).data('contentObj',new _emr_prescription_obj());
}
/**治疗选项卡面板*/
function _emr_handle(){
	if(!_emr_switchTab(this,$(this).data('contentObj'))) return;
	if($(this).data('contentObj')){return;};
	importJS('/js/manager/emr/admission/doctor.handle.js');
	$(this).data('contentObj',new _emr_handle_obj());
}
/**随访选项卡面板*/
function _emr_followed(){
	if(!_emr_switchTab(this,$(this).data('contentObj'))) return;
	if($(this).data('contentObj')){return;};
	importJS('/js/manager/emr/admission/doctor.followed.js');
	$(this).data('contentObj',new _emr_followed_obj());
}
/**标签页切换*/
function _emr_switchTab(tab,contentObj){
	if(!$(tab).hasClass('tab_show')){
		if(!validateTabSwitch(tab)){
			return false;
		}
		var oldTab = $('#tabs').children('div[class*="tab_show"]:eq(0)');
		if(oldTab.length>0){
			oldTab.data('contentObj').panel.hide();
			oldTab.removeClass('tab_show');
		}
		$(tab).addClass('tab_show');
		if(contentObj&&contentObj.panel){
			contentObj.panel.show();
			if(contentObj.show&&typeof contentObj.show=='function'){
				contentObj.show();
			}
			contentObj.resize();
		}
		return true;
	}
}

/**
 * 问诊、查体、检查、诊断、处方等标签页切换之前的验证。返回true可以切换标签，返回fasle弹出提示错误信息，并跳转到对应的录入界面（填写查体、诊断结果之前，必须先写主诉；开检查和处方之前都必须填写诊断结果）
 * 验证不通过，弹出提示信息，并跳转到对应的录入界面
 */
function validateTabSwitch(tab){
	//return true;
	var tabData = $(tab).data('tabData');
	var validData = getJSONData(validateTabSwitchUrl,{visitId:getCurrentPatient().visit[0].id,categoryId:tabData.id,tag:Math.random()},'POST');
	if(validData&&validData.obj){
		return true;
	}
	$.oimsError(validData.message,function(){
		$('#tabs').children().each(function(){
			var self = $(this);
			if(self.data('tabData').id==validData.showTabId){
				self.click();//跳转到需要录入信息的界面
				return false;
			}
		});
	});
	return false;
}

/**
 * 控制历史就诊记录显示和隐藏
 */
function _emr_showRecordList(){
	if($('#recordlist').width()>0){
		$("#main").css({'left':'28px'}).width($("#main").width()+114);
		$('#tabpanel').width($('#main').width()).children().each(function(){
			_emr_changeWidthByAdd($(this).children(),114);
		});
		$("#recordlist").css('z-index',1).animate({width:0},100,function(){
			$('#recordlist').css('z-index','auto');
		});
		$('#showrecords').attr('title','点击显示历史记录');
	}else{
		$('#recordlist').css('z-index',1).animate({width:113},100,function(){
			$('#main').css({'left':'141px'}).width($("#main").width()-114);
			$('#tabpanel').width($('#main').width());
			$('#tabpanel').children().each(function(){
				_emr_changeWidthByReduce($(this).children(),114);
			});
			$('#recordlist').css('z-index','auto');
		});
		$('#showrecords').attr('title','点击隐藏历史记录');
	}
}

$(window).resize(function(){
//	_emr_container.height($('.right').height()-$('.title').outerHeight()-2);
//	_emr_container.width(window.screen.width-$('.left').outerWidth()-4);
//	$('.title').width($('.title').width());
});

/**
 * 设置患者详细信息
 * @param container 显示患者详细信息的容器
 * @param patientData 患者数据
 */
function _emr_setPatientDetailInfo(container,patientData){
	$('td span:eq(0)',container).text(patientData.xingming);//姓名
	$('td span:eq(1)',container).text(patientData.zcrq);//注册日期
	$('td span:eq(2)',container).text(patientData.xingbie?'男':'女');//性别
	$('td span:eq(3)',container).text(patientData.shengri);//出生日期
	$('td span:eq(4)',container).text(patientData.shouji);//手机
	$('td span:eq(5)',container).text(patientData.diqu);//所属地区
	$('td span:eq(6)',container).text(patientData.yibao?'是':'否');//是否医保
	$('td span:eq(7)',container).text(patientData.sfzh);//身份证号
	$('td span:eq(8)',container).text(patientData.dianhua);//固定电话
	$('td span:eq(9)',container).text(patientData.gzdw);//工作单位
	$('td span:eq(11)',container).text(patientData.dwdz);//单位地址
	$('td span:eq(12)',container).text(patientData.hzlxr);//家属
	$('td span:eq(13)',container).text(patientData.dwyb);//单位邮编
	$('td span:eq(14)',container).text(patientData.hzlxrdh);//紧急电话
	$('td span:eq(15)',container).text(patientData.youbian);//邮政编码
	$('td span:eq(16)',container).text(patientData.jtdz);//家庭地址
	$('td span:eq(17)',container).text(patientData.beizhu);//备注
	$('td img:eq(0)',container).attr({src:'..'+patientData.photourl});//头像
	var data = container.data('patientResource');
	if(!data){
		data = getJSONData(_emr_patientresource_url, {fatherid:oimsCategory.HUANZHE_RESOURCES,tag:Math.random()}, "post");
		container.data('patientResource',data);
	}
	$.each(data.obj,function(){
		if(this.categoryid==patientData.laiyuan){
			$('td span:eq(10)',container).text(this.category);//患者来源
		}
	});
}

/**
 * 创建就诊记录列表
 */
function _emr_createRecords(bl){
	var patient = $('body').data('patient');
	var ul = $('#recordlist ul').empty();
	/**今天*/
	$.each(patient.visit,function(i){
		var li = $('<li style="cursor: pointer; overflow: hidden;"/>').data('visit',this).appendTo(ul);
		var span = $('<span class="emr_jiuzhenlistcheck"/>').appendTo(li);
		var checkbox = $('<input type="checkbox" style="vertical-align: top;">').appendTo(span);
		checkbox.unbind('click').bind('click',function(e){
			if(ul.find('input[type="checkbox"]:checked').length>3){
				$.oimsAlert('最多对比三次就诊记录');
				$(this).removeAttr('checked');
			}
			e.stopPropagation();
		});
		$('<p/>').text(this.date.substring(0,10)).appendTo(li);
		$('<p/>').text('医生：'+this.doctorName).appendTo(li);
		li.unbind('click').bind('click',function(){
			_emr_showWorkPanel($(this),bl);
		});
	});
	$('#showrecords').find('td').text('就诊记录'+$('#recordlist ul').children().length+'次');
}

/**
 * 根据选择的记录，展示对应的界面
 * @param li
 */
function _emr_showWorkPanel(li,bl){
	var ul = $('#recordlist ul');
	var visit = li.data('visit');

	var EMR_PATIENT_INFO_URL = "/publish/emr/showDoctorWorkstation.htm";
	var patient = $('body').data('patient');
	var data = getJSONData(EMR_PATIENT_INFO_URL,{binglihao:patient.binglihao},"POST");
	currentPatient=data.obj.patient;
	visitList = data.obj.visitList;

	var index = li.index();
	if(!li.hasClass('visited')){
					importJS('/emr/js/emr_functions.js');
					importCSS('/emr/style.css');
					importJS('/emr/js/emr_print.js');
					importJS('/emr/js/study.js');
					importJS('/emr/js/chuzhi.js');
					var main = $('#main').empty();
					ul.find('li[class="visited"]').removeClass('visited');
					li.addClass('visited');
					var recordcontainer = $('<div class="recordcontainer"/>').appendTo($('#main').empty());
					var div = $('<div class="record"/>').appendTo(recordcontainer);
					if(!$('.toolbar').data('btn')){
						$('.toolbar').data('btn',$('.toolbar .btn').clone(true));
					}
					$('.toolbar .btn').empty();
					//增加一个按钮显示打印
					$('.toolbar .btn').append($("<a id='shutdown' />").text("关闭").append($("<span class='del' />")));
					$('.toolbar .btn').append($("<a id='printBingLi'/>").text("打印").append($("<span class='print'/>"))/*$("<input type='button' id='printBingLi' value='打印' />"*/);
					$('.toolbar .btn').append($("<a id='zyz' />").text("住院证").append($("<span class='zyz' />")));
					var data = getJSONData(_emr_getprintdata_url,{visitId:visit.id},'POST');
					eyePDFBaoGao_jw=[];
					$(makeRecord(data)).appendTo(div);
					$.each(eyePDFBaoGao_jw,function(){
						var epbg=this;
						$("#spe"+this.jcdid).click(function(){
							speClickPDF(epbg.jcdid,epbg.data_getPDFListByJcd,epbg.data_getReportListByJcd);
						});

					});
					$("#shutdown").click(function(){
						$("#emrContainer").remove();
						$("div.oims_div_className").show();
						$('.title,.tablabel,.mainBody').show();
					});

					$("#zyz").click(function(){
						debugger
						//住院证弹出框
						zyzForm(visitList[index]);
					});

					function speClickPDF(jcdid,data_getPDFListByJcd,data_getReportListByJcd){
						//进来的时候判断有没有jcdid对应的pdfdiv
						if($("#BingLipdfDiv"+jcdid).length){
							if($("#BingLipdfDiv"+jcdid).is(":visible"))
								$("#BingLipdfDiv" + jcdid).slideUp();
							else
								$("#BingLipdfDiv" + jcdid).slideDown();
						}
						//没有jcdid对应的pdfdiv
						else{
							var position = $('#spe'+jcdid).position();
							var left = position.left;
							$("<div />").attr("id", "BingLipdfDiv" + jcdid).css({
								left : left,
								top : position.top + $('#spe'+jcdid).outerHeight() + 10,
								"float" : "left",
								"z-index" : "9999",
								"position" : "absolute",
								"display" : "block"
							}).addClass("BingLipdfDiv").appendTo($('#spe'+jcdid));
							var ul = $("<ul/>").appendTo("#BingLipdfDiv" + jcdid);
							bingliyulan_createPDFList(jcdid,jcdid, data_getPDFListByJcd);
							bingliyulan_createReportList(jcdid,jcdid, data_getReportListByJcd);
							function bingliyulan_createPDFList(jcdid, i, data_getPDFListByJcd){
								if (data_getPDFListByJcd.state) {
									var filelist = data_getPDFListByJcd.obj;
									var ul = $("#BingLipdfDiv" + i + " ul:eq(0)");
									$.each(filelist, function(i, data_PDF) {
										if ((i % 2 != 0)) {
											$(
													"<li><a href='" + contextPath + data_PDF
															+ "' target='_blank' >PDF报告" + i + "</a></li>")
													.addClass("ji").appendTo(ul);
										} else {
											$(
													"<li><a href='" + contextPath + data_PDF
															+ "' target='_blank' >PDF报告" + i + "</a></li>")
													.addClass("ou").appendTo(ul);
										}
									});
								}
							}
							function bingliyulan_createReportList(jcdid, i, data_getReportListByJcd){
								var jcd = data_getReportListByJcd.obj;
								if (jcd.state == 1) {
									var ul = $("#BingLipdfDiv" + i + " ul:eq(0)");
									var num = $("#BingLipdfDiv" + i + " ul li").length + 1;
									var li;
									if (num % 2 == 0) {
										li = $("<li><a>系统报告</a></li>").addClass("ji").appendTo(ul);
									} else {
										li = $("<li><a>系统报告</a></li>").addClass("ou").appendTo(ul);
									}
									$(li).click(function() {
										importJS("/js/manager/baogao/baogaoController.js");
										initCssAndJs_baogaoAll();
										seeReportButUpdate(jcd);
									});
								}

							}
						}
					}
					$("#printBingLi").click(function(){
							var div = $("<div id='selectPrint'/>");
							div.append($("<a id='printbl' style='font-size:medium;font-weight:900;color:#2B07DD;'/>").text("打印病历").append($("<br/>")));
							div.append($("<a id='printch' style='font-size:medium;font-weight:900;color:#2B07DD;'/>").text("打印处方"));
							div.oimsDialog({
								title : "选择打印",
								width : 250,
								icon : 'view',
								height : 110,
								drag : false,
								locked : true,
								winType : 4
							});
						//alert("打印病历");
						$("#printch").click(function(){

							printEMRB5_JIWANG();
							function printEMRB5_JIWANG(){
								var EMR_PATIENT_INFO_URL = "/publish/emr/showDoctorWorkstation.htm";
								var GETPRINTDATA_URL="/publish/emr/getprintdata.htm";
								var patient = $('body').data('patient');
								var win = showPrintWindow();
								var page = $("<div />").addClass("printPage").appendTo(win);
								var data = getJSONData(EMR_PATIENT_INFO_URL,{binglihao:patient.binglihao},"POST");
								var printData=getJSONData(GETPRINTDATA_URL,{visitId:visit.id},'POST');
								currentPatient=data.obj.patient;
								if(!data.state){
									$.oimsAlert(data.message);
									return;
								}
								var shenriFlag = ""
								if (visit.date != null) {
									var year = parseInt(formatDate(new Date()).substring(0, 4)) - parseInt(visit.date.substring(0,4))//获取历史时间和当前时间相差多少年
									shenriFlag = parseInt(formatDate((currentPatient.shengri.time)).split("-")[0]) + year + "-" + formatDate((currentPatient.shengri.time)).split("-")[1] + "-" + formatDate((currentPatient.shengri.time)).split("-")[2]
								}
								currentDoctor = data.gonghao;
								var sex = currentPatient.xingbie?"男":"女";
								var age = _emr_calculteAge(formatDate(shenriFlag!=""?shenriFlag:currentPatient.shengri.time));
								var zd='';
								var zhenduan=printData.diagnosis;
								$.each(zhenduan,function(){
									zd+=this.eye+this.zdflname+(parseInt(this.confirmed)==0?'?':'')+";";
								});
								showWithHtmlTemplate(
										"print_prescribe_xiyaofang",
										{
											binglihao : currentPatient.binglihao,
											xingming : currentPatient.xingming,
											shouji:currentPatient.shouji,
											chargeType:currentPatient.charge_type,
											sex : sex,
											age : age,
											kdsj : visit.date.substring(0,10),
											kdys : visit.doctorName,
											zhenduan : zd,
											keshi : "眼科门诊"
										}, page);
								var qrcode=getJSONData(qrcode_url,{text:"ZOB"+currentPatient.binglihao,width:90,height:90}).obj;
								page.find('.qrcode').append('<img src="'+contextPath+qrcode+'"/>');
								showBarcode(currentPatient.binglihao,page.find(".barcodeDiv"));
								$('.printPage h1').css({'line-height':'50px'});
								var tag = page.find(".orderList");
								tag.html("");
								div = $("<div />").appendTo(tag);
								var tab=$("<table cellspacing='0' cellpadding='0' class='print_sheet_101'/>").appendTo(div);
								var tr=$("<tr/>").appendTo(tab);
								$("<th style='width: 200px; text-align: left;'>").text("药品名称").appendTo(tr);
								$("<th style='width: 100px; text-align: left;'>").text("规格").appendTo(tr);
								$("<th style='width: 40px; text-align: left;'>").text("单位").appendTo(tr);
								$("<th style='width: 40px; text-align: left;'>").text("数量").appendTo(tr);
								$("<th style='width: 80px; text-align: left;'>").text("用法").appendTo(tr);
								$("<th style='width: 50px; text-align: left;'>").text("用量").appendTo(tr);
								$("<th style='width: 50px; text-align: left;'>").text("频率").appendTo(tr);
								var cflist=printData.cflist;
								var totalPrice = 0;
								$.each(cflist, function(i, d) {
									var tr = $("<tr/>").appendTo(tab);
									$("<td style='text-align: left; font-size: 15px;'/>").text(d.yaoming).appendTo(tr);
									$("<td style='text-align: left; font-size: 15px;'/>").text(d.packageSpec).appendTo(tr);
									$("<td style='text-align: left; font-size: 15px;'/>").text(d.packageUnits).appendTo(tr);
									$("<td style='text-align: left; font-size: 15px;'/>").text(d.shuliang).appendTo(tr);
									$("<td style='text-align: left; font-size: 15px;'/>").text(d.yongfa).appendTo(tr);
									$("<td style='text-align: left; font-size: 15px;'/>").text(d.yongliang).appendTo(tr);
									$("<td style='text-align: left; font-size: 15px;'/>").text(d.yongyaopinlv).appendTo(tr);
									var jiage = parseFloat(d.jiage);
									totalPrice += jiage;
								});
								$("#totalPrice").text(totalPrice);
							}
					    });
						$("#printbl").click(function(){
						printEMRB5_JIWANG();
						function printEMRB5_JIWANG(){
							var EMR_PATIENT_INFO_URL = "/publish/emr/showDoctorWorkstation.htm";
							var CATEGORY_GET_URL = "/publish/category/getCategoryById.htm";
							var GETPRINTDATA_URL="/publish/emr/getprintdata.htm";
							var _emr_input_itemsUrl = '/publish/emr/getitemsbyparentid.htm';
						//	var specialTreat='/publish/jiuzhen/';
							var _emr_physical_categoryId = 30002;
							var patient = $('body').data('patient');
							var win = showPrintWindow();
							var page = $("<div />").addClass("printPage jiwang").appendTo(win);
							var data = getJSONData(EMR_PATIENT_INFO_URL,{binglihao:patient.binglihao},"POST");
							var printData=getJSONData(GETPRINTDATA_URL,{visitId:visit.id},'POST');
							currentPatient=data.obj.patient;
							if(!data.state){
								$.oimsAlert(data.message);
								return;
							}
							var shenriFlag = ""
							if (visit.date != null) {
								var year = parseInt(formatDate(new Date()).substring(0, 4)) - parseInt(visit.date.substring(0,4))//获取历史时间和当前时间相差多少年
								shenriFlag = parseInt(formatDate((currentPatient.shengri.time)).split("-")[0]) + year + "-" + formatDate((currentPatient.shengri.time)).split("-")[1] + "-" + formatDate((currentPatient.shengri.time)).split("-")[2]
							}
							currentDoctor = data.gonghao;
							var sex = currentPatient.xingbie?"男":"女";
							var age = _emr_calculteAge(formatDate(shenriFlag!=""?shenriFlag:currentPatient.shengri.time));
							showWithHtmlTemplate("emr_print",{binglihao:currentPatient.binglihao,xingming:currentPatient.xingming,sex:sex,age:age,kdsj:visit.date.substring(0,10),kdys:visit.doctorName},page);
							showBarcode(currentPatient.binglihao,page.find(".barcodeDiv"));
							$('.printPage h1').css({'line-height':'50px'});
							var tag = page.find(".orderList");
							$.each(printData.records,function(){
								if(this.categoryId==30100){
									var div = $("<div />").appendTo(tag);
									$("<strong />").text("主诉：").appendTo(div);
									$("<p />").text(this.jilu).appendTo(div);
								}
								if(this.categoryId==30103){
									div = $("<div />").appendTo(tag);
									$("<strong />").text("即往史：").appendTo(div);
									$("<p />").text(this.jilu).appendTo(div);
									page=backPageCombineCurrentPageJW(page,"即往史：",win,printData);
								}
							});
							div = $("<div />").appendTo(page.find('.orderList'));
							$("<strong />").text("专科检查：").appendTo(div);
							var p0 = $("<p />").appendTo(div);
							showZKJC(printData,p0);
							page=backPageCombineCurrentPageJW(page,"专科检查：",win,printData);
							function showZKJC(printData,p0){
							var	vision=printData.vision;
							var iop=printData.iop;
							var zkjc='';
							if(vision){
								zkjc+='右眼裸眼视力:'+(vision.lr?getShiLiDisplay(vision.lr):'未查')+'。右眼近视力:'+(vision.jr ? getShiLiDisplay(vision.jr) : '未查')+'。右眼矫正视力:'+(vision.jzr ? getShiLiDisplay(vision.jzr) : '未查')+'。右眼ETDRs:'+(vision.redtrs ? vision.redtrs : '未查')+'。';
								zkjc+='左眼裸眼视力:'+(vision.ll?getShiLiDisplay(vision.ll):'未查')+'。左眼近视力:'+(vision.jl ? getShiLiDisplay(vision.jl) : '未查')+'。左眼矫正视力:'+(vision.jzl ? getShiLiDisplay(vision.jzl) : '未查')+'。左眼ETDRs:'+(vision.ledtrs ? vision.ledtrs : '未查')+'。';
							}
							if(iop){
								zkjc+= '右眼眼压:'+(iop.od?(iop.od+"mmHg"):(iop.beizhu.split(',')[0]?iop.beizhu.split(',')[0]:''))+'。';
								zkjc+= '左眼眼压:'+(iop.os?(iop.os+"mmHg"):(iop.beizhu.split(',')[1]?iop.beizhu.split(',')[1]:''))+'。';
							}

							var records=printData.records;
							var physicalitems = getJSONData(_emr_input_itemsUrl,{categoryId:_emr_physical_categoryId,tag:Math.random()},'POST');
							$.each(physicalitems,function(i){
								var item = this.child;
								var rStr = findPhysicalResult(item[0].categoryid,records);
								var lStr = findPhysicalResult(item[1].categoryid,records);
								if(rStr){
									zkjc += '右眼'+this.category+'：'+$('<p />').html(rStr).text()+';';
								}
								if(lStr){
									zkjc += '左眼'+this.category+'：'+$('<p />').html(lStr).text()+';';
								}
							});
							p0.text(zkjc);
							}
							div = $("<div />").appendTo(tag);
							$("<strong />").text("诊断：").appendTo(div);
							p0=$("<p />").appendTo(div);
							showZHENDUAN(printData,p0);
							page=backPageCombineCurrentPageJW(page,"诊断：",win,printData);
							function showZHENDUAN(printData,p0){
								var zd='';
								var zhenduan=printData.diagnosis;
								$.each(zhenduan,function(){
									zd+=this.eye+this.zdflname+(parseInt(this.confirmed)==0?'?':'')+";";
								});
								p0.text(zd);
							}
							div = $("<div />").appendTo(tag);
							$("<strong />").text("处置：").appendTo(div);
							p0 = $("<p />").appendTo(div);
							showCHUZHI(printData,p0,data);
							page=backPageCombineCurrentPageJW(page,"处置：",win,printData);
							function showCHUZHI(printData,p0,data){
								var chuzhi='';
								var lis=printData.inspect.lis;
								var hospital=printData.inspect.hospital;
								var treat=printData.inspect.treat;
								var prescription=printData.prescription;
								var special_items=printData.inspect.special;
								var specialTreat=printData.specialTreat;
								var st='';
								switch(parseInt(specialTreat)){
								case 1:st='建议住院治疗';break;
								case 2:st='预约日间手术';break;
								case 3:st='预约门诊手术';break;
								}
								var special='';
								$.each(special_items,function(i,n){
									special+=this.inspectName;
									if(i!=special_items.length-1){
										special+=";";
									}
								});
								var sf=printData.sf;
								chuzhi+=(lis?(lis+";"):'')+(hospital?(hospital+";"):'')+(special?(special+";"):'')+(prescription?(prescription+";"):'')+(treat?(treat+";"):'')+(st?(st+";"):'')+(sf?((sf.yyrq?('复诊时间:'+formatDate(sf.yyrq.time)+';'):'')+(sf.zhuyi?sf.zhuyi:'')):'');
								p0.text(chuzhi);
							}
							function findPhysicalResult(categoryid,records){
								for(var i=0;i<records.length;i++){
									if(categoryid==records[i].categoryId){
										return records[i].jilu;
									}
								}
								return '';
							}
							function backPageCombineCurrentPageJW(page,title,win,printData){
								var height=0;
								$.each(page.find('.orderList').children('div'),function(i,temp){
									height+=$(temp).height();
								});
								if(height>=280){
									var page2 = $("<div />").addClass("printPage").appendTo(win);
								//	showWithHtmlTemplate("emr_print",{binglihao:currentPatient.binglihao,xingming:currentPatient.xingming,sex:currentPatient.sex,age:currentPatient.age,shouji:currentPatient.shouji,kdsj:formatDate(currentVisit.caozuoTime.time),kdys:parent.window.currentStaff.xingming},page2);
									showWithHtmlTemplate("emr_print",{binglihao:currentPatient.binglihao,xingming:currentPatient.xingming,sex:sex,age:age,kdsj:visit.date.substring(0,10),kdys:visit.doctorName},page2);
									showBarcode(currentPatient.binglihao,page2.find(".barcodeDiv"));
									page2.find('h1').css({'line-height':'50px'});
									var h1_text=$('.printPage:last h1');
									h1_text.text(h1_text.text()+'(续)');
									var tag2 = page2.find(".orderList");
									page.find('.orderList').children('div:last').remove();
									if(title=='即往史：'){
										div = $("<div />").appendTo(tag2);
										$("<strong />").text("即往史：").appendTo(div);
										var jws='';
										$.each(printData.records,function(i,n){
											if(this.categoryId==30103){
												jws=this.jilu;
											}
										});
										$("<p />").text(jws).appendTo(div);
									}else if(title=='专科检查：'){
										var	div = $("<div />").appendTo(tag2);
										$("<strong />").text("专科检查：").appendTo(div);
										var p0 = $("<p />").appendTo(div);
										showZKJC(printData,p0);
									}else if(title=='诊断：'){
										var div = $("<div />").appendTo(tag2);
										$("<strong />").text("诊断：").appendTo(div);
										var p0=$("<p />").appendTo(div);
										showZHENDUAN(printData,p0);
									}else if(title=='处置：'){
										var div = $("<div />").appendTo(tag2);
										$("<strong />").text("处置：").appendTo(div);
										p0 = $("<p />").appendTo(div);
										showCHUZHI(printData,p0);
									}
									return page2;
								}else{
									return page;
								}

							}
						}
					});
					});
	}
}
