function _emr_diagnose_obj(){
	var panel = $(getHtmlContent('diagnosis')).appendTo('#tabpanel');
	var diagnose = {
		resize:resize,
		panel:$(panel),
		show:show,
		clear:clear
	};
	var optionTable;
	var resultTable;
	var resultTableExists = false;
	var optionPanelShowTime = 100;//疾病选择面板多少毫秒后显示
	var eyeCombobox = {
		type:'combobox',
		options:{
			valueField:'eyesortId',
			textField:'eyesortText',
			panelHeight:'auto',
			editable:false,
			data:[{eyesortId:48,eyesortText:'双眼'},
				  {eyesortId:47,eyesortText:'右眼'},
				  {eyesortId:46,eyesortText:'左眼'}
			]
		}
	};
	var stateCombobox = {
			type:'combobox',
			options:{
				valueField:'stateId',
				textField:'stateText',
				panelHeight:'auto',
				editable:false,
				data:[
				    {stateId:1,stateText:'已确诊'},
					{stateId:0,stateText:'待确诊'}
				]
			}
		};
	var diseaseURL = '/publish/jibing/findDiseases.htm';
	var saveDiagnosisUrl = '/publish/emr/saveDiagnosis.htm';
	var deleteDiagnosisUrl = '/publish/emr/removeDiagnosis.htm';
	var existsDiagnosisUrl = '/publish/emr/getExistsDiagnosis.htm';
	var saveOrUpdateVisionUrl = '/publish/emr/saveOrUpdateVision.htm';
	var saveOrUpdateIopUrl = '/publish/emr/saveOrUpdateIop.htm';
	var getOptometry = '/publish/emr/getOptometry.htm';
	var orderlist_url = '/publish/emr/getorderlist.htm';
	var getDiseasesByPinyin = '/publish/emr/getDiseasesByPinyin.htm';
	/*************************************************************************/
	var callbacks = $.Callbacks();
	callbacks.add(resize);
	callbacks.add(createTopDiseaseSortTable);
	callbacks.add(createResultListTable);
	callbacks.add(addExistsDiagnoseList);
	callbacks.add(createSortBtn);
	callbacks.add(bindGlobalEvent);
	callbacks.add(initInspectList);
	callbacks.fire();
	callbacks.empty();
//	resize();
//	createTopDiseaseSortTable();
//	createResultListTable();
//	addExistsDiagnoseList();
//	createSortBtn();
//	bindGlobalEvent();
//	initInspectList();
	/**
	 * 计算诊断标签页尺寸
	 * @param panel
	 */
	function resize(){
		var pnlTab = panel.parent();
		var panelHeight = pnlTab.height()-4-5;
		var pnlLeft = $('#diagnose_left');
		var pnlRight = $('#checkorderview');
		pnlLeft.width((pnlTab.width()-10)-pnlRight.width()).height(panelHeight);
		pnlRight.height(panelHeight);
		var pnlLeftTop = $('#diagnose_left_top');
		var pnlLeftBottom = $('#diagnose_left_bottom');
		pnlLeftTop.height(panelHeight*0.6);
		pnlLeftBottom.height(panelHeight-pnlLeftTop.height());
		$('#disease').height(pnlLeftTop.height());
		$('#disgnose_optionTable_div').height($('#disease').height()-$('#diagnose_pinyin_div').height()-4);
		$('#diagnose_result_list').height(pnlLeftBottom.height()-$('#diagnose_resulttable_tool').height());
		resultTable = $('#diagnose_result_list');
		
		var ulHeight = pnlRight.height()-$('#diagnose_result_tab').height()-$('#diagnose_inspect_result_div').height()
			-$('#diagnose_inspect_tab_sort').height()-10;
		
		$('#diagnose_inspect_list ul').height(ulHeight);
		$('#diagnose_assay_list ul').height(ulHeight);
		
		pnlLeft.unbind('myresize').bind('myresize',function(){
			resultTable.datagrid('resize',{width:pnlLeft.width()});
		});
		if(resultTableExists){
			resultTable.datagrid('resize',{width:pnlLeft.width()});
		}
	}
	
	var timer;
	/**创建顶级疾病类别列表*/
	function createTopDiseaseSortTable(){
		var data = getDiseasesByFatherId(40000);
		var table = $('#disgnose_optionTable');
		var tr;
		for(var i=0;i<data.length;i++){
			if(i%2==0){
				tr = $('<tr/>').appendTo(table);
			}
			var td = $('<td/>').attr('value',data[i].id).html(data[i].disease).appendTo(tr);
			td.bind('click',function(e){
				var self = $(this);
				if(timer) clearTimeout(timer);
				timer = setTimeout(function(){
					if(!self.hasClass('active')){
						table.find('td[class="active"]').removeClass('active');
						self.addClass('active');
					}
					var optionData = getDiseasesByFatherId(self.attr('value'));
					var optionArr = new Array();
					for(var j=0;j<optionData.length;j++){
						var option = optionData[j];
						optionArr.push({
							id:option.id,
							text:option.disease,
							icd10:option.icd_code,
							isParent:option.isParent
						});
					}
					var options = {
						id:'diseaseOptionList',
						left:e.clientX,
						top:e.clientY,
						width:200,
						hideOnUnhover:false,
						checkbox:true,
						onHide:function(){
							table.find('td[class="active"]').removeClass('active');
						},
						parentHover:function(container,options,parent,itemData){
							var optionArr1 = new Array();
							var rows = resultTable.datagrid('getRows').concat();;
							$.each(getDiseasesByFatherId(itemData.id),function(){
								var self = this;
								var checked = false;
								$.each(rows,function(i){
									if(self.id==this.id){
										checked = true;
										rows.splice(i,1);
										return false;
									}
								});
								optionArr1.push({
									id:this.id,
									text:this.disease,
									icd10:this.icd_code,
									isParent:this.isParent,
									checked:checked
								});
							});
							createOptionListMenu(container,options,parent,optionArr1);
						},
						onChecked:function(itemData){
							var row = {id:itemData.id,name:itemData.text,eyesortId:48,stateId:1};
							addDiagnose(row);
						},
						onUnchecked:function(itemData){
							var rows = resultTable.datagrid('getRows');
							for(var i=0;i<rows.length;i++){
								var row = rows[i];
								if(row.id==itemData.id){
									var index = resultTable.datagrid('getRowIndex',row);
									resultTable.datagrid('deleteRow',index);
								}
							}
						},
						data:optionArr
					};
					initOptionListMenu(options,self.attr('value'));
				},optionPanelShowTime);
			});
			td.bind('mouseleave',function(e){
				var self = $(this);
				if(timer) clearTimeout(timer);
			});
		}
	}
	
	/**添加诊断结果*/
	function addDiagnose(row){
		resultTable.datagrid('appendRow',row);
		var index = resultTable.datagrid('getRowIndex',row);
		resultTable.datagrid('beginEdit',index);
		var editors = resultTable.datagrid('getEditors',index);
		if(editors){
			$(editors[0].target).combobox('setValue',row.eyesortId);
			$(editors[1].target).combobox('setValue',row.stateId);
		}
	}
	
	/**根据父节点获取疾病分类和疾病列表*/
	function getDiseasesByFatherId(fatherId){
		var data = _emr_dataCache.getData(diseaseURL,{fatherId:fatherId},'POST');
		if(data&&data.obj){
			return data.obj;
		}
		return [];
	}
	/**创建诊断结果列表*/
	function createResultListTable(){
		resultTable.datagrid({
			fitColumns:true,
			border:false,
			striped:true,
			onClickRow:beginEdit,
			columns:[[
				{field:'id',hidden:true},
				{field:'name',title:'疾病名称',width:200,align:'left',halign:'center',resizable:false},
				{field:'eyesort',title:'眼别',width:50,align:'center',resizable:false,editor:eyeCombobox,formatter:function(value,row){
					return row.eyesortText;
				}},
				{field:'state',title:'状态',width:50,align:'center',resizable:false,editor:stateCombobox,formatter:function(value,row){
					if(row.stateText=='待确诊'){
						return '<span style="color:red;">'+row.stateText+'</span>';
					}else{
						return row.stateText;
					}
				}}
			]],
			loadMsg:'',
			data:[]
		});
		resultTableExists = true;
	}
	function beginEdit(index,row){
		var editors = resultTable.datagrid('getEditors',index);
		if(!(editors&&editors.length)){
			resultTable.datagrid('beginEdit',index);
			editors = resultTable.datagrid('getEditors',index);
			$(editors[0].target).combobox('setText',row.eyesortText);
			$(editors[1].target).combobox('setText',row.stateText);
		}
	}
	/**添加已经存在的诊断结果*/
	function addExistsDiagnoseList(){
		var list = getJSONData(existsDiagnosisUrl,{visitId:$('body').data('patient').visit[0].id,tag:Math.random()},'POST');
		if(list){
			for(var i=0;i<list.length;i++){
				var elem = list[i];
				var row = {};
				row.id = elem.zdflid;
				row.zdfl_id = elem.zdflid;
				row.jiuzhen_id = elem.jzid;
				row.name = elem.zdflname;
				row.eyesortText = elem.eye;
				row.stateText = elem.confirmed==0 ? '待确诊':'已确诊';
				resultTable.datagrid('appendRow',row);
//				var index = resultTable.datagrid('getRowIndex',row);
//				resultTable.datagrid('beginEdit',index);
//				var editors = resultTable.datagrid('getEditors',index);
//				$(editors[0].target).combobox('setText',row.eyesortText);
//				$(editors[1].target).combobox('setValue',elem.confirmed);
			}
		}
	}

	function createSortBtn(){
//		var btnarr = [];
//		for(var i=0,len=_emr_diagnose_sortbtn.length;i<len;i++){
//			var title = _emr_diagnose_sortbtn[i];
//			title = title.length>7 ? title.substring(0,7)+'...':title;
//			btnarr.push($('<a class="sortbtn" style="width:90%"/>').text(title).attr('title',_emr_diagnose_sortbtn[i]));
//		}
//		_emr_initSortBtn($('#diseasesortdiv'),btnarr);
	}
	var searchTimer;
	/**全局事件绑定*/
	function bindGlobalEvent(){
		
		$('#diagnose_pinyin_txt').bind('keyup',function(){
			var self = $(this);
			if(searchTimer) clearTimeout(searchTimer);
			var oldTxt = self.data('oldTxt');
			var pinyin = $.trim(self.val());
			if(!oldTxt&&!pinyin) return;
			if(!(oldTxt&&oldTxt!=pinyin||!oldTxt)) return;
			searchTimer = setTimeout(function(){
				var table = $('#disgnose_optionTable').empty();
				if(pinyin){
					self.data('oldTxt',pinyin);
					var diseases = getJSONData(getDiseasesByPinyin,{search:pinyin,tag:Math.random()},'POST');
					var tr;
					for(var i=0;i<diseases.length;i++){
						if(i%2==0){
							tr = $('<tr/>').appendTo(table);
						}
						var td = $('<td/>').data('data',diseases[i]).html(diseases[i].disease).appendTo(tr);
						td.click(function(){
							var disease = $(this).data('data');
							var row = {id:disease.id,name:disease.disease,eyesortId:48,stateId:1};
							var rows = resultTable.datagrid('getRows');
							var existsFlag = false;
							$.each(rows,function(){
								if(this.id==row.id){
									existsFlag = true;
									return false;
								}
							});
							if(!existsFlag)
								addDiagnose(row);
						});
					}
				}else{
					self.data('oldTxt',pinyin);
					createTopDiseaseSortTable();
				}
			},500);
		});
		
		var btnTool = $('#diagnose_resulttable_tool .btn');
		/*提交按钮*/
		btnTool.find('a:eq(0)').bind('click',function(){
			var rows = resultTable.datagrid('getRows');
			var diagnosis = new Array();
			var visitId = $('body').data('patient').visit[0].id;
			for(var i=0;i<rows.length;i++){
				var row = rows[i];
				var index = resultTable.datagrid('getRowIndex',row);
				var editors = resultTable.datagrid('getEditors',index);
				if(editors.length){
					var eye = $(editors[0].target).combobox('getText');
					var state = $(editors[1].target).combobox('getValue');
					diagnosis.push({visitId:visitId,diseaseId:row.id,state:state,eye:eye});
				}
			}
			var result = getJSONData(saveDiagnosisUrl,{diagnosis:JSON.stringify(diagnosis),tag:Math.random()},"POST");
			for(var i=0;i<rows.length;i++){
				var row = rows[i];
				for(var j=0;j<result.length;j++){
					var resultElem = result[j];
					if(resultElem.zdfl_id==row.id){
						var index = resultTable.datagrid('getRowIndex',row);
						row.zdfl_id = resultElem.zdfl_id;
						row.jiuzhen_id = resultElem.jiuzhen_id;
						var index = resultTable.datagrid('getRowIndex',row);
						var editors = resultTable.datagrid('getEditors',index);
						var eye = $(editors[0].target).combobox('getText');
						var state = $(editors[1].target).combobox('getText');
						resultTable.datagrid('endEdit',index);
						resultTable.datagrid('updateRow',{index:index,row:{stateText:state,eyesortText:eye}});
					}
				}
			}
			$.oimsSucc('提交成功');
		});
		/*删除按钮*/
		btnTool.find('a:eq(1)').bind('click',function(){
			var selectedRows = resultTable.datagrid('getSelections');
			if(selectedRows.length==0){
				$.oimsAlert('请选择要删除的记录');
				return;
			}
			var diagnosis = new Array();
			for(var i=0;i<selectedRows.length;i++){
				var row = selectedRows[i];
				if(row.jiuzhen_id&&row.zdfl_id){
					diagnosis.push({visitId:row.jiuzhen_id,diseaseId:row.zdfl_id});
				}
				var index = resultTable.datagrid('getRowIndex',row);
				resultTable.datagrid('deleteRow',index);
			}
			//删除以保存过的诊断结果
			getJSONData(deleteDiagnosisUrl,{diagnosis:JSON.stringify(diagnosis),tag:Math.random()},"POST");
			$.oimsSucc('删除成功');
		});
		
		var diagnose_result_tab = $('#diagnose_result_tab');
		var diagnose_inspect_tab = $('#diagnose_inspect_tab_sort');
		var patient = $('body').data('patient');
		$('#diagnose_vision #rl').bind('blur',saveOrUpdateVision);
		$('#diagnose_vision #rj').bind('blur',saveOrUpdateVision);
		$('#diagnose_vision #rjz').bind('blur',saveOrUpdateVision);
		$('#diagnose_vision #ll').bind('blur',saveOrUpdateVision);
		$('#diagnose_vision #lj').bind('blur',saveOrUpdateVision);
		$('#diagnose_vision #ljz').bind('blur',saveOrUpdateVision);
		/*视力*/
		diagnose_result_tab.children(':eq(0)').click(function(){
			var self = $(this);
			var vision = patient.vision;
			if(vision){
				$('#diagnose_vision #rl').val(vision.rl?vision.rl:'');
				$('#diagnose_vision #rj').val(vision.rj?vision.rj:'');
				$('#diagnose_vision #rjz').val(vision.rjz?vision.rjz:'');
				$('#diagnose_vision #ll').val(vision.ll?vision.ll:'');
				$('#diagnose_vision #lj').val(vision.lj?vision.lj:'');
				$('#diagnose_vision #ljz').val(vision.ljz?vision.ljz:'');
			}
			if(!self.hasClass('tab_show')){
				self.siblings().removeClass('tab_show');
				self.addClass('tab_show');
				$('#diagnose_iop').hide();
				$('#diagnose_optometry').hide();
				$('#diagnose_photo').hide();
				$('#diagnose_vision').show();
			}
		}).click();
		/* 眼压*/
		$('#diagnose_iop #iop_od').bind('blur',saveOrUpdateIop);
		$('#diagnose_iop #iop_os').bind('blur',saveOrUpdateIop);
		diagnose_result_tab.children(':eq(1)').click(function(){
			var self = $(this);
			var iop = patient.iop;
			if(iop){
				$('#diagnose_iop #iop_od').val(iop.od?iop.od:'');
				$('#diagnose_iop #iop_os').val(iop.os?iop.os:'');
			}
			if(!self.hasClass('tab_show')){
				self.siblings().removeClass('tab_show');
				self.addClass('tab_show');
				$('#diagnose_optometry').hide();
				$('#diagnose_photo').hide();
				$('#diagnose_vision').hide();
				$('#diagnose_iop').show();
			}
		});
		/*验光*/
		diagnose_result_tab.children(':eq(2)').click(function(){
			var self = $(this);
			var result = getJSONData(getOptometry,{visitId:patient.visit[0].id,tag:Math.random()},'POST');
			if(result){
				for(var i in result){
					$('#diagnose_optometry #'+i).text(result[i]?result[i]:'');
				}
			}
			if(!self.hasClass('tab_show')){
				self.siblings().removeClass('tab_show');
				self.addClass('tab_show');
				$('#diagnose_photo').hide();
				$('#diagnose_vision').hide();
				$('#diagnose_iop').hide();
				$('#diagnose_optometry').show();
			}
		});
		diagnose_result_tab.children(':eq(3)').click(function(){
			var self = $(this);
			if(!self.hasClass('tab_show')){
				self.siblings().removeClass('tab_show');
				self.addClass('tab_show');
				$('#diagnose_vision').hide();
				$('#diagnose_iop').hide();
				$('#diagnose_optometry').hide();
				$('#diagnose_photo').show();
			}
		});
		/****************检查结果标签******************/
		diagnose_inspect_tab.children(':eq(0)').click(function(){
			var self = $(this);
			if(!self.hasClass('tab_show')){
				self.siblings().removeClass('tab_show');
				self.addClass('tab_show');
				$('#diagnose_assay_list').hide();
				$('#diagnose_inspect_list').show();
			}
		}).click();
		diagnose_inspect_tab.children(':eq(1)').click(function(){
			var self = $(this);
			if(!self.hasClass('tab_show')){
				self.siblings().removeClass('tab_show');
				self.addClass('tab_show');
				$('#diagnose_inspect_list').hide();
				$('#diagnose_assay_list').show();
			}
		});
		
		$('#disgnose_optionTable td').click(function(){
			var self = $(this);
		});
		$('#diagnose_resulttable_tool div[class="btn"] a:eq(0)').click(function(){
			var input = $('#diagnose_result_custom_text').val();
			if($.trim(input)){
			}
		});
		$('#diagnose_resulttable_tool div[class="btn"] a:eq(2)').click(function(){
		});
	}
	
	/**新增或者修改视力结果*/
	function saveOrUpdateVision(){
		var self = $(this);
		var input = $.trim(self.val());
		var patient = $('body').data('patient');
		if(input&&!(/^-?([0][1-9]*|[1-9]\d*)(\.\d+)?$/.test(input))){
			self.val(patient.vision?patient.vision[self.attr('id')]:'');
			return;
		}
		var vision = {};
		if(patient.vision){
			vision = patient.vision;
			if(vision[self.attr('id')] == input){
				return;
			}
		}
		vision.id = patient.vision ? patient.vision.id:null;
		vision.jiuzhen_id = patient.visit[0].id;
		vision.huanzhe_id = patient.id;
		vision[self.attr('id')] = input;
		var result = getJSONData(saveOrUpdateVisionUrl,{vision:JSON.stringify(vision)},'POST');
		vision.id = result.obj;
		patient.vision = vision;
	}
	/**保存或者更新眼压数据*/
	function saveOrUpdateIop(){
		var self = $(this);
		var param = self.attr('id');
		param = param.substr(param.indexOf('_')+1,2);
		var input = $.trim(self.val());
		var patient = $('body').data('patient');
		if(input&&!(/^-?([0][1-9]*|[1-9]\d*)(\.\d+)?$/.test(input))){
			self.val(patient.iop?patient.iop[param]:'');
			return;
		}
		var iop = {};
		if(patient.iop){
			iop = patient.iop;
			if(iop[param] == input){
				return;
			}
		}
		iop.id = patient.iop ? patient.iop.id:null;
		iop.jiuzhen_id = patient.visit[0].id;
		iop.huanzhe_id = patient.id;
		iop[param] = input;
		var result = getJSONData(saveOrUpdateIopUrl,{iop:JSON.stringify(iop)},'POST');
		iop.id = result.obj;
		patient.iop = iop;
	}
	
	function show(){
		initInspectList();
	}
	
	function initInspectList(){
		var diagnose_result_tab = $('#diagnose_result_tab');
		var inspects = getJSONData(orderlist_url,{visit:$('body').data('patient').visit[0].id,tag:Math.random()},'POST');
		if(inspects){
			var ul = $('#diagnose_inspect_list ul').empty();
			for(var i=0;i<inspects.length;i++){
				var inspect = inspects[i];
				if(inspect.categoryId==8) continue;//常规检查不显示
				var icon = getStateIcon(inspect.biaoshi);
				var li = $('<li class="emr_jcdlistpointer"/>').attr({title:icon.tip+'——'+inspect.inspectName,id:inspect.inspectId}).text(inspect.inspectName.length>4?inspect.inspectName.substring(0,3)+"...":inspect.inspectName).appendTo(ul);
//				$('<span style="max-width:150px;overflow:hidden;text-overflow:ellipsis;"/>').appendTo(li);
				$('<span/>').addClass(icon.icon).appendTo(li);
				if(inspect.biaoshi==56)
					li.click(showPhoto);
			}
		}
		function getStateIcon(state){
			var icon = {tip:'待检查',icon:'dcheck'};
			switch (state) {
				case 50:icon.icon='dcheck';icon.tip='待检查';break;
				case 51:icon.icon='ycheck';icon.tip='已检查';break;
				case 52:icon.icon='dSupplements';icon.tip='待补传';break;
				case 53:icon.icon='live';icon.tip='已过号';break;
				case 54:icon.icon='start';icon.tip='检查中';break;
				case 55:icon.icon='din';icon.tip='待上传';break;
				case 56:icon.icon='end';icon.tip='已完成';break;
				case 57:icon.icon='dlinkno';icon.tip='待上传连接异常';break;
				case 58:icon.icon='fileno';icon.tip='待上传未找到文件';break;
				case 59:icon.icon='slinkno';icon.tip='上传中连接异常';break;
				case 60:icon.icon='lose';icon.tip='上传中文件丢失';break;
				case 61:icon.icon='derror';icon.tip='上传中文件错误';break;
			}
			return icon;
		}
		function showPhoto(){
			var self = $(this);
			var title = self.text();
			if(diagnose_result_tab.children().length<4){
				var div = $('<div class="tab_hide"/>').appendTo(diagnose_result_tab);
				$('<span style="max-width:150px;text-overflow: ellipsis;overflow:hidden;"/>').appendTo(div);
				div.click(function(){
					var self_1 = $(this);
					if(!self_1.hasClass('tab_show')){
						self_1.siblings().removeClass('tab_show');
						self_1.addClass('tab_show');
						$('#diagnose_vision').hide();
						$('#diagnose_iop').hide();
						$('#diagnose_optometry').hide();
						$('#diagnose_photo').show();
					}
				});
				var doubleScreen = $('<div/>').addClass('btn').addClass('emr_doublebtn').appendTo('#diagnose_result_tab');
				var a = $('<a class="four noline"><span class="screen emr_doublebtnspan"></span>双屏显示</a>').appendTo(doubleScreen);
				a.click(function(){
					var patient = $('body').data('patient');
					importJS("/js/flashShow.js");
					studyView(patient.id);
				});
			}
			diagnose_result_tab.children(':eq(3)').find('span').attr('title',title).text(title.length>4?title.substring(0,3)+"...":title);
			
			diagnose_result_tab.children(':eq(3)').click();
			$("#diagnose_photo").html("");
			var photos = getJSONData(getInspectPhotoUrl,{inspectId:self.attr('id'),tag:Math.random()},'POST');
			var gallery = $("<div class='oimsslide-gallery'/>").appendTo($("#diagnose_photo"));
			var flag = false;
			var oldWidth = gallery.width();
			for(var i=0;i<photos.length;i++){
				var photo = photos[i];
				var href = photo.path.replace(/\\/g,'/');
				var suffix = href.substring(href.lastIndexOf('.')+1).toUpperCase();
				var a = $('<a onclick="return hs.expand(this)" class="oimsslide"/>').appendTo(gallery);
				a.attr('style','float:left;');
				if(oldWidth>gallery.width()){
					if(!flag){
						flag = true;
						oldWidth = gallery.width();
						var as = gallery.find('a');
						$.each(as,function(){
							$(this).width($(this).width()-window.scrollbarWidth/2);
						});
					}
				}
				a.width(200).height(165);
				if(suffix=="JPG"||suffix=="JPEG"||suffix=="GIF"||suffix=="PNG"){//图片
					a.attr('href',contextPath+'/'+href.replace('thumb/',''));
					if(flag){
						a.width(a.width()-window.scrollbarWidth/2);
					}
					var img = $('<img src="../'+href+'"/ style="width:100%;height:100%;">').appendTo(a);
				}else{//视频
					importCSS("/flowplayer/style.css");
					importJS("/js/swfobject.js");
					importJS("/flowplayer/flowplayer-3.2.11.min.js");
					if(flag){
						a.width(a.width()-window.scrollbarWidth/2);
					}
					var div = $('<div style="border:2px solid silver;"/>').width(a.width()-4).height(a.height()-4).appendTo(a);
					var flv = $('<a/>').attr({'id':'player'+i,'href':contextPath +"\\"+photo.path}).appendTo(div);
				    flowplayer("player"+i, contextPath+ "/flowplayer/flowplayer-3.2.15.swf");
				}
			}
		}
	}
	
	function clear(){
		
	}
	
	return diagnose;
}