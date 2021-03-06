var fzysToday = [];
var searchData = {};
var doctorGonghao;
var getFzysToday_url = "/publish/emr/getFzysToday.htm";
var huanZheFenZhen_saveOrUpdateJiuzhen_url = "/publish/jiuzhen/saveOrUpdateJiuzhen.htm"; // 根据ID号进行分诊
var findJzByDoctorToday="/publish/jiuzhen/findJzByDoctorToday.htm";
function _emr_initPatientListPage() {
	pageTitle = "患者列表";
	init();
	fzysToday = init_fzysToday();
	/** 加载今日接诊的患者人数信息 */
	_emr_initQuantityInfo($('.title'));
	new _emr_patientList_obj();
}
function init_fzysToday() {
	var data = getJSONData(getFzysToday_url, {
		tag : Math.random()
	}, "POST");
	doctorGonghao = data.gonghao;
	return data;
}

function _emr_patientList_obj() {
	var patientList = {
		initTabAndToolPanel : initTabAndToolPanel
	};
	var getVisitState_url = '/publish/emr/getitemsbyparentid.htm';// 获取就诊状态
	var getVisitListByState_url = '/publish/emr/getvisitlistbystate.htm';// 获取该就诊状态下的就诊信息
	//var getFuChaListBySate_url='/publish/emr/getFuChaListByState.htm';
	var _emr_patientdefaultphoto_female_url = '/images/pople0.png';
	var _emr_patientdefaultphoto_male_url = '/images/pople.png';
	var categoryParentId = 26;// 就诊状态
	if (!$('body').data('patientListShowStyle')) {
		$('body').data('patientListShowStyle', 'list');// 设置显示风格，默认为卡片形式
	}
	initTabAndToolPanel();
	initMainPanel();
	if (fenzhenkaidan&&userData.role!=61){
		$($('.right').children()[1]).find('div[class="tab_hide"]:eq(2)').click();
	}
	else
	{
		$($('.right').children()[1]).find('div[class="tab_hide"]:eq(0)').click();
	}
	/** 初始化标签和工具面板 */
	function initTabAndToolPanel() {
		var data = getJSONData(getVisitState_url, {
			categoryId : categoryParentId,
			tag : Math.random()
		}, 'POST');
		var emr_doctorTitle01 = $('<div/>').addClass(
			'tablabel emr_doctorTitle01').height(35).appendTo('.right');
		var emr_doctorTitle02 = $('<div/>').addClass('emr_doctorTitle02').css(
			"padding-top", "8px").appendTo(emr_doctorTitle01);

		if (data) {
			$.each(data, function() {
				$(
					'<div class="tab_hide"><span>' + this.category
					+ '</span></div>').appendTo(emr_doctorTitle02)
					.bind('click', function() {
						tabSwitch($(this));
					}).data('categoryId', this.categoryid);
			});
			//显示七天内复查
			$('<div id="fucha" class="tab_hide"><span>复查</span></div>').appendTo(emr_doctorTitle02)
				.bind('click', function() {
					if (!$(this).hasClass('tab_show')) {
						$(this).parent().find('div[class *="tab_show"]')
							.removeClass('tab_show').addClass('tab_hide');
						$(this).removeClass('tab_hide').addClass('tab_show');
						if(fenzhenkaidan){
							searchData = {
								currentPage : 1,
								pageSize : getPageSize() - 1,
								state : '-1',//点击复查显示空列表
								tag : Math.random(),
								gonghao : currentDoctorGonghao,
								fucha:1,
								fenzhenkaidan:1
							};
							showListStyle();
						}
						else{
							searchData = {
								currentPage : 1,
								pageSize : getPageSize() - 1,
								state : '28,29,94',
								tag : Math.random(),
								gonghao : currentDoctorGonghao,
								fucha:1
							};
							showListStyle();
						}

					}
				})/*.data('categoryId',100)*/;
			if(fenzhenkaidan&&userData.role==61){
				$('#fucha').css({'display':'none'});
			}else if (fenzhenkaidan&&userData.role!=61){
				$('#fucha').siblings().css({'display':'none'});
			}
			//				})/*.data('categoryId', this.categoryid)*/;
		}
		/** 初始化查询，切换显示 */
		var emr_doctorTitle03 = $('<div/>').addClass('emr_doctorTitle03')
			.appendTo(emr_doctorTitle01);
		$("<div />").css("clear", "both").appendTo(emr_doctorTitle01);
		var emr_searchDiv = $('<div/>').addClass('emr_searchDiv').appendTo(
			emr_doctorTitle03);
		var table = $('<table/>').addClass('emr_searchTable').appendTo(
			emr_searchDiv);
		var tr = $('<tr/>').appendTo(table);
		var td$ = $('<td/>').appendTo(tr);
		td$.append($("<select id='helpOtherDoctor' style='width:70px;'/>"));
		var self = null;
		$.each(fzysToday.obj, function() {
			if(this.gonghao=='admin')
				return true;
			if (this.gonghao == userData.gonghao) {
				$("#helpOtherDoctor").append(
					$("<option value=" + this.gonghao + ">" + '自己'
						+ "</option>"));
				self = this;
			} else if (this.gonghao) {
				$("#helpOtherDoctor").append(
					$("<option value=" + this.gonghao + ">" + this.xingming
						+ "</option>"));
			}
		});
		if (self == null) {
			$("#helpOtherDoctor").append(
				$("<option value=" + userData.gonghao + ">" + '自己'
					+ "</option>"));
		}
		$("#helpOtherDoctor").val(currentDoctorGonghao);
		$('#helpOtherDoctor').change(function() {
			// 进入其他医生的界面
			currentDoctorGonghao = $("#helpOtherDoctor").val();
			_emr_initQuantityInfo($('.title'));
			if ($('body').data('patientListShowStyle') != 'card') {
				showListStyle_doctor_sreachData();
			} else {
				showCardStyle_doctor_sreachData();
			}
			$(".emr_doctorTitle02").children('div:eq(0)').click();
		});
		var td0 = $('<td/>').appendTo(tr);
		$('<input id="_emr_patientListSearchTxt" type="text" class="blur"/>')
			.attr({
				onfocus : 'this.className=\'focus\'',
				onblur : 'this.className=\'blur\'',
				size : '35',
				value : '请输入患者ID号或姓名'
			})
			.appendTo(td0)
			.click(function() {
				if ($.trim($(this).val()) == '请输入患者ID号或姓名') {
					$(this).val('');
				}
			})
			.blur(function() {
				if (!$.trim($(this).val())) {
					$(this).val('请输入患者ID号或姓名');
				}
			})
			.keyup(
				function(e) {
					if (e.keyCode == 13) {// 回车查询患者
						var categoryId = $($('.right').children()[1])
							.find('div[class="tab_show"]:eq(0)')
							.data('categoryId');
						if ($('body').data('patientListShowStyle') == 'card') {
							showCardStyle_binglihao_sreachData();
						} else {
							showListStyle_binglihao_sreachData();
						}
					}
				}).focus().val("");
		var td1 = $('<td/>').appendTo(tr);
		/** 查询 */
		$('<a id="emr_patientlist_searchbtn" class="search"/>').html('查询')
			.appendTo(td1).click(function() {
			// var categoryId =
			// $($('.right').children()[1]).find('div[class="tab_show"]:eq(0)').data('categoryId');
			if ($('body').data('patientListShowStyle') == 'card') {
				showCardStyle_binglihao_sreachData();
			} else {
				showListStyle_binglihao_sreachData();
			}
		});
		var td2 = $('<td/>').appendTo(tr);
		/** 切换显示风格 */
		// $('<a class="cutbg"/>').html('<span
		// class="cut"></span>显示切换').appendTo(td2).click(function(){
		// //var categoryId =
		// $($('.right').children()[1]).find('div[class="tab_show"]:eq(0)').data('categoryId');
		// if($('body').data('patientListShowStyle')=='card'){
		// showListStyle_doctor_sreachData();
		// $('body').data('patientListShowStyle','list');
		// }else{
		// showCardStyle_doctor_sreachData();
		// $('body').data('patientListShowStyle','card');
		// }
		// });
		$('<a id="emr_patientlist_searchbtn" class="advsearch"/>').text("提取患者").appendTo(td2).click(function(){
			var data=getJSONData("/publish/emr/resetList.htm",{gonghao:$('#helpOtherDoctor').val(),tag:Math.random()},'POST');
		});
	}
	;
	/** 初始化显示患者信息面板 */
	function initMainPanel() {
		var height = $('.right').height()
			- $($('.right').children()[0]).outerHeight()
			- $($('.right').children()[1]).outerHeight() - 2;
		$('<div class="mainBody"></div>').height(height).appendTo('.right');
	}

	/** 切换标签 */
	function tabSwitch(tab) {
		if (!tab.hasClass('tab_show')) {
			tab.parent().find('div[class *="tab_show"]')
				.removeClass('tab_show').addClass('tab_hide');
			tab.removeClass('tab_hide').addClass('tab_show');
			if ($('body').data('patientListShowStyle') == 'card') {
				showCardStyle_doctor_sreachData();
			} else {
				showListStyle_doctor_sreachData();
			}
		}
	}
	// 通过切换医生显示列表
	function showListStyle_doctor_sreachData() {
		searchData = {
			currentPage : 1,
			pageSize : getPageSize() - 1,
			state : $($('.right').children()[1]).find(
				'div[class="tab_show"]:eq(0)').data('categoryId'),
			tag : Math.random(),
			gonghao : currentDoctorGonghao
		};
		showListStyle();
	}
	// 通过病历号显示列表
	function showListStyle_binglihao_sreachData() {
		var searchText = $.trim($('#_emr_patientListSearchTxt').val());
		if (searchText == '请输入患者ID号或姓名' || searchText == '') {
			$.oimsAlert("请输入患者ID号或者姓名");
			return;
		}
		//如果是复查的（通过点击查询）
		if($("div.emr_doctorTitle02").children("div[id=fucha]").hasClass('tab_show')){
			searchData = {
				currentPage : 1,
				pageSize : getPageSize() - 1,
				//gonghao:currentDoctorGonghao,
				state:(fenzhenkaidan==1?'27,28,29,94':'28,29,94'),
				searchText : searchText,
				tag : Math.random(),
				fucha:1,
				fenzhenkaidan:fenzhenkaidan
			};
		}
		//如果不是复查（通过点击查询）
		else{
			searchData = {
				currentPage : 1,
				pageSize : getPageSize() - 1,
				//gonghao:currentDoctorGonghao,
				//state: $($('.right').children()[1]).find('div[class="tab_show"]:eq(0)').data('categoryId'),
				searchText : searchText,
				tag : Math.random()
			};
		}
//		searchData = {
//			currentPage : 1,
//			pageSize : getPageSize() - 1,
//			searchText : searchText,
//			tag : Math.random()
//			
//		};
		showListStyle();
		// var options = $("#_emr_patientListDiv input[name='checkBoxObj'] ");
		// if(options.length>0){
		// var dataObject=eval("("+options[0].value+")");
		// var fzys = dataObject.fzys;
		// $('#helpOtherDoctor').val(fzys);
		// }
	}
	// 通过医生显示卡片
	function showCardStyle_doctor_sreachData() {
		var tab = $($('.right').children()[1]).find(
			'div[class="tab_show"]:eq(0)');
		searchData = {
			gonghao : $("#helpOtherDoctor").val(),
			state : tab.data('categoryId'),
			style : 'card',
			tag : Math.random()
		};
		showCardStyle();
	}
	// 通过病历号显示卡片
	function showCardStyle_binglihao_sreachData() {
		var searchText = $.trim($('#_emr_patientListSearchTxt').val());
		if (searchText == '请输入患者ID号或姓名' || searchText == '') {
			$.oimsAlert("请输入患者ID号或者姓名");
			return;
		}
		searchData = {
			style : 'card',
			searchText : searchText,
			tag : Math.random()
		};
		showCardStyle();
		// var div = $($('.right').children()[2]);
		// var options = div.find("input[type='hidden']");
		// if(options.length>0){
		// var dataObject=eval("("+options[0].value+")");
		// var fzys = dataObject.fzys;
		// $('#helpOtherDoctor').val(fzys);
		// }
	}

	function huanZheFenZhen_ToDayJiuZhen(jiuzhen,fucha) {
		currentVisit = jiuzhen;
		if(fucha){
			// 如果该患者在该医生当天下有了接诊则不能新增
			//	var b= getJSONData(findJzByDoctorToday,{huanzheId:jiuzhen.patientId},'POST').obj;
			//	if(b){
			//		$.oimsAlert("该患者今天已有挂号信息，请查看待诊或已诊");
			//		return;
			//	}
			if(fenzhenkaidan){
				doctorJieZhen(fucha,jiuzhen);
			}
			else{
				// $.oimsXZ({
				// 	strTitle:"该患者为7天内复查患者，如果要复制上一次病历，请点“续诊”；<br/>如果要新建病历，请点“新建”；<br/><font style='color:red; font-weight:bold;'>如果要查看病历，请点“查看”；</font><br/>不做任何操作，请直接关闭。",
				// 	remove_length:true
				// },function(){
				// 	//续诊
				// 	var huanZheFenZhen_saveOrUpdateJiuzhen_data = getJSONData(
				// 		huanZheFenZhen_saveOrUpdateJiuzhen_url, {
				// 			id : jiuzhen.id
				// 		}, "POST");
				// 	if (huanZheFenZhen_saveOrUpdateJiuzhen_data.state) {
				// 		// alert("提示分诊成功!出现患者就诊");
				// 		doctorJieZhen(fucha,huanZheFenZhen_saveOrUpdateJiuzhen_data.obj);
				// 	} else {
				// 		// alert("提示分诊失败！出现患者列表");
				// 		showListStyle_doctor_sreachData();
				// 	}
				// },function(){
				// 	//新建空病例
				// 	var huanZheFenZhen_saveOrUpdateJiuzhen_data = getJSONData(
				// 		huanZheFenZhen_saveOrUpdateJiuzhen_url, {
				// 			id : jiuzhen.id,
				// 			fznc:1
				// 		}, "POST");
				// 	if (huanZheFenZhen_saveOrUpdateJiuzhen_data.state) {
				// 		// alert("提示分诊成功!出现患者就诊");
				// 		doctorJieZhen(fucha,huanZheFenZhen_saveOrUpdateJiuzhen_data.obj);
				// 	} else {
				// 		// alert("提示分诊失败！出现患者列表");
				// 		showListStyle_doctor_sreachData();
				// 	}
				// },function(){//查看
				//关闭按钮
				// if($("#shutdown") != undefined){
				// 	$("#shutdown").click(function () {
				// 		$('.title,.tablabel,.mainBody').show();
				// 	});
				// }
				//隐藏患者列表
				$('.title,.tablabel,.mainBody').hide();

				var cpt = {};
				var cp_ = utilTool().listSelectOne() ;
				cpt.patientId = cp_.patientId;
				showCurrentPatient(cpt);

				// });
				$('div.opencontent').css({'text-align':'left'});
			}
		}
		//如果不是复查的病人
		else{
			if (jiuzhen.fzys != doctorGonghao){
				if(fenzhenkaidan){
					doctorJieZhen(fucha,jiuzhen);
				}
				else{
					$.oimsConfirm({
						strTitle : "该患者不是挂本人的号，是否接诊此患者？",
						remove_length : true
					}, function() {
						var huanZheFenZhen_saveOrUpdateJiuzhen_data = getJSONData(
							huanZheFenZhen_saveOrUpdateJiuzhen_url, {
								id : jiuzhen.id
							}, "POST");
						if (huanZheFenZhen_saveOrUpdateJiuzhen_data.state) {
							// alert("提示分诊成功!出现患者就诊");
							doctorJieZhen(fucha,huanZheFenZhen_saveOrUpdateJiuzhen_data.obj);
						} else {
							// alert("提示分诊失败！出现患者列表");
							showListStyle_doctor_sreachData();
						}
					}, function() {
						// alert("出现患者列表");
						showListStyle_doctor_sreachData();
					});
				}
			}
			else
				// 查看自己的病人
				doctorJieZhen(fucha,jiuzhen);
		}
	}
	// 医生接诊
	function doctorJieZhen(fucha,jiuzhen) {
		var tr = $("#_emr_patientListDiv").find(
			'input[type="checkbox"]:checked').parent().parent();
		// 取当前的值
		var p = eval('(' + tr.find('input[type="checkbox"]').attr('value')
			+ ')');
		if (tr.index() > 1) {
			var value = eval('('
				+ tr.prev().find('input[type="checkbox"]').attr('value')
				+ ')');
			$('body').data('patient', {
				visit : [ {
					id : value.id
				} ]
			});
		} else {
			$('body').removeData('patient');
		}
		$('body')
			.data(
				'visitState',
				$($('.right').children()[1]).find(
					'div[class="tab_show"]:eq(0)').data(
					'categoryId'));
		var iframe = $(".right #careFrame");
		$(".tablabel").remove();
		$(".mainBody").remove();
		if (!iframe.length) {
			iframe = $(
				"<iframe id='careFrame' width='100%' height='"
				+ ($('.right').height() - $('.title').height() - 2)
				+ "' frameBorder='0' scrolling='auto'/>").appendTo(
				$(".right"));
			//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外


			//$("#careFrame").focus();
		}
		if(!fucha){
			iframe[0].src = contextPath+"/emr/emr.jsp?binglihao=" + p.binglihao+"&visiteId="+jiuzhen.id+"&fenzhenkaidan="+fenzhenkaidan;
		}
		else{
			iframe[0].src = contextPath+"/emr/emr.jsp?binglihao=" + p.binglihao+"&fucha=1&visiteId="+jiuzhen.id+"&fenzhenkaidan="+fenzhenkaidan;
		}

	}

	/** 显示为列表风格 */
	function showListStyle() {
		$('<div id="_emr_patientListDiv" class="list emr_listdiv"/>').appendTo(
			$($('.right').children()[2]).empty());
		var searchText = $.trim($('#_emr_patientListSearchTxt').val());
		var listFactor = {
			listObj : [ {
				title : "序号",
				key : "serial_no",
			}, {
				title : "患者id号",// his那边的
				key : "binglihao"
			}, {
				title : "姓名",// "姓名",
				key : "name"
			}, {
				title : "性别",// "性别",
				key : "psex"
			}, {
				title : "年龄",// "年龄",
				key : "birthday",
				func : function(d) {
					return _emr_calculteAge(formatDate(d));
				}
			}, {
				title : "联系方式",// "联系方式",
				key : "mobile"
			}, {
				title : "挂号时间",// "挂号时间",
				key : "ptime",
				func : function(value) {
					return value.toString().substring(0, 10);
				}
			}, {
				title : "就诊状态",// "就诊状态",
				key : "pstate"
			}, {
				title : "接诊医生",// "接诊医生",
				key : "fzysName"
			}, {
				title : "就诊科室",// "接诊医生",
				key : "keshi"
			} ],
			url : contextPath + getVisitListByState_url,
			method : "post",
			checkbox : true,
			single : true,
			invocationEvent : true, // 启用行选中事件
			methodName_Checked : function() {
				var tr = $("#_emr_patientListDiv").find(
					'input[type="checkbox"]:checked').parent().parent();
				var p = eval('('
					+ tr.find('input[type="checkbox"]').attr('value') + ')');
				huanZheFenZhen_ToDayJiuZhen(p,searchData.fucha);

				// window.open("/OIMS/emr/emr.jsp?binglihao="+p.binglihao);
				// _emr_initDiagnosisPage();
			}, // 触发的方法名
			data : searchData
		};
		$("#_emr_patientListDiv").createPageList(listFactor);
	}
	// {gonghao:$("#helpOtherDoctor").val(),state:categoryId,style:'card',searchText:searchText,tag:Math.random()}
	/** 显示为卡片风格 */
	function showCardStyle() {
		var tab = $($('.right').children()[1]).find(
			'div[class="tab_show"]:eq(0)');
		var categoryId = tab.data('categoryId');
		var searchText = $.trim($('#_emr_patientListSearchTxt').val());
		var data = getJSONData(getVisitListByState_url, searchData, 'POST');
		//console.log(data);
		var ul = $('<ul/>').appendTo($($('.right').children()[2]).empty());
		if (data) {
			if (data.obj.length == 0) {
				$('<div class="backup1"><p>无' + tab.text() + '患者信息</p></div>')
					.appendTo($('.right').children()[2]);
			} else {
				$
					.each(
						data.obj,
						function() {
							var patientData = this;
							$("<input type='hidden' />")
								.val(
									JSON
										.stringify(
											patientData)
										.replace(
											new RegExp(
												"\"",
												"gm"),
											"'"))
								.appendTo(ul);
							var li = $('<li/>')
								.data('visitId', this.id).appendTo(
									ul);
							var photourl = patientData.photo
								|| (patientData.sex ? _emr_patientdefaultphoto_male_url
									: _emr_patientdefaultphoto_female_url);
							$(
								'<a><img style="width:100px;height:100px;" src="..'
								+ photourl + '"/></a>')
								.appendTo(li);
							$('<strong/>').html('病历号：').appendTo(li);
							$('<span/>').html(
								patientData.binglihao + '<br/>')
								.appendTo(li);
							$('<strong/>').html('姓名：').appendTo(li);
							$('<span/>').html(
								patientData.name + '<br/>')
								.appendTo(li);
							$('<strong/>').html('性别：').appendTo(li);
							$('<span/>').html(
								(patientData.sex ? '男' : '女')
								+ '<br/>').appendTo(li);
							$('<strong/>').html('年龄：').appendTo(li);
							$('<span/>')
								.html(
									_emr_calculteAge(patientData.birthday_str)
									+ '<br/>')
								.appendTo(li);
							$('<strong/>').html('手机：').appendTo(li);
							$('<span/>')
								.html(
									(patientData.mobile ? patientData.mobile
										: '未留')
									+ '<br/>')
								.appendTo(li);
							$('<div class="jtime"/>').html(
								'<strong>挂号时间：</strong><span>'
								+ patientData.cztime
								+ '</span>').appendTo(li);
							li
								.click(function() {
									$('body').data('patient', {
										visit : [ {
											id : patientData.id
										} ]
									});
									$('body')
										.data(
											'visitState',
											$(
												$(
													'.right')
													.children()[1])
												.find(
													'div[class="tab_show"]:eq(0)')
												.data(
													'categoryId'));
									var iframe = $(".right #careFrame");
									$(".tablabel").remove();
									$(".mainBody").remove();
									if (!iframe.length) {
										iframe = $(
											"<iframe id='careFrame' width='100%' height='"
											+ ($(
											'.right')
												.height()
											- $(
												'.title')
												.height() - 2)
											+ "' frameBorder='0' scrolling='auto'/>")
											.appendTo(
												$(".right"));
									}
									iframe[0].src = contextPath+"/emr/emr.jsp?binglihao="
										+ patientData.binglihao;

									// window.open("/OIMS/emr/emr.jsp?binglihao="+p.binglihao);
									// _emr_initDiagnosisPage();
								});// 选中患者信息卡片，跳转到对应的患者接诊页面
						});
			}
		}
	}
	return patientList;
}
