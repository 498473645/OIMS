function _emr_handle_obj(){
	var panel = $(getHtmlContent('handle')).appendTo('#tabpanel');
	var handle = {
		resize:resize,
		panel:$(panel),
		clear:clear
	};
	var optionTable,resultTable;
	/*下拉表格配置（暂时未用）
	var projectNameCombo = {
		type:'combogrid',
		options:{
			width:400,
			panelWidth: 400,
			valueField: 'projectId',
			textField: 'projectName',
			value:'',
			columns: [[
				{field:'projectId',hidden:true},
				{field:'projectName',title:'项目名称',align:'left',halign:'center',width:120},
				{field:'units',title:'单位',align:'left',halign:'center',width:80},
				{field:'price',title:'价格',align:'left',halign:'center',width:80}
			]],
			data:[
				{projectId:1,projectName:'拔倒睫',units:'次',price:6.6},
				{projectId:2,projectName:'泪道冲洗',units:'次',price:14.3}
			],
			onChange:function(newValue,oldValue){
				var rows = resultTable.datagrid('getRows');
				for(var i=0,len=rows.length;i<len;i++){
					var row = rows[i];
					var index = resultTable.datagrid('getRowIndex',row);
					var editor = resultTable.datagrid('getEditor',{index:index,field:'projectName'});
					if(editor&&editor.target[0]===this){
						$(this).data('currentRowIndex',index);
					}
				}
			},
			onHidePanel:function(){
				var combogrid = $(this);
				var grid = combogrid.combogrid('grid');
				var selected = grid.datagrid('getSelected');
				$(this).data('row',selected);
				var row = {
					id:selected.projectId,
					projectName:selected.projectName,
					quantity:1,
					units:selected.units
				};
				var index = combogrid.data('currentRowIndex');
				resultTable.datagrid('endEdit',index);
				resultTable.datagrid('updateRow',{
					index:index,
					row:row
				});
				resultTable.datagrid('beginEdit',index);
				combogrid.removeData('currentRowIndex');
			}
		}
	};
	*/
	var handleProjectUrl = '/publish/emr/getHandleProject.htm';
	var handlePertainUrl = '/publish/emr/getHandlePertain.htm';
	var saveHandleOrdersUrl = '/publish/emr/saveHandleOrders.htm';
	var existHandleOrdersUrl = '/publish/emr/getExistHandleOrders.htm';
	var delHandleOrdersUrl = '/publish/emr/delHandleOrders.htm';
	var printHandleOrdersUrl = '/publish/emr/getHandlePrintData.htm';
	var saveFollowedUpUrl = '/publish/emr/saveFollowedUp.htm';
	var findFollowedUpByVisitId='/publish/emr/findFollowdUpByVisitId.htm';
	/******************************************************************************/
	resize();
	createOptionTable();
	createResultTable();
	addExistHandleOrders();
	bindGlobalEvent();
	/**计算处置界面布局*/
	function resize(){
		var pnlTab = panel.parent();
		var panelHeight = pnlTab.height()-4-5;
		var height = panelHeight-$('#handle_pinyin_div').height()
			-$('#handle_tool_div').height();
		optionTable = $('#handle_optionList table');
		resultTable = $('#handle_resultList');
		$('#handle_optionList').height(height/3*2);
		resultTable.height(height/3);
		optionTable.unbind('myresize').bind('myresize',function(){
		});
		$('handle_resultList_div').width(pnlTab.width());
		$('#handle_resultList_div').unbind('myresize').bind('myresize',function(){
			resultTable.datagrid('resize',{width:$(this).width()});
		});
	//	calendarEMR_FOLLOWED("followed_up_info");
	}
	
	/**创建治疗项目列表*/
	function createOptionTable(){
		var optionData = _emr_dataCache.getData(handleProjectUrl,{validable:true},'POST');
		createOptionProjects(optionData);
	}
	
	/**创建治疗项目*/
	function createOptionProjects(optionData){
		if(optionData){
			optionTable.empty();
			var tr;
			$.each(optionData,function(i){
				if(i%2==0){
					tr = $('<tr/>').appendTo(optionTable);
				}
				var td = $('<td style="height:20px;"/>').html(this.project_name).appendTo(tr);
				$.data(td[0],'project',this);
				td.unbind('click').bind('click',function(){
					var self = $(this).removeClass('active');
					var arr = getSelectedMenuItems($('#handleOptionList'));
					if($('#handleOptionList').length==0){
						var project = $.data(self[0],'project');
						var data = getJSONData(handlePertainUrl,{handleId:project.id,tag:Math.random()},'POST');
						var pertainProjectArray = new Array();
						if(data&&data.length>0){
							for(var k=0;k<data.length;k++){
								var d = data[k];
								pertainProjectArray.push({
									text:d.item_name,
									checked:d.defaultSelected,
									required:d.required,
									price:d.price,
									item_code:d.item_code,
									quantity:d.quantity
								});
							}
						}
						arr = pertainProjectArray;
					}
					optionItemClick(self,arr);
				});
				//右键单击检查项目，显示该项目所有附件项目信息
				td.unbind('contextmenu').bind('contextmenu',function(e){
					var self = $(this);
					if(!self.hasClass('active')){
						var project = $.data(self[0],'project');
						optionTable.find('td[class="active"]').removeClass('active');
						self.addClass('active');
						var data = getJSONData(handlePertainUrl,{handleId:project.id,tag:Math.random()},'POST');
						var pertainProjectArray = new Array();
						if(data&&data.length>0){
							for(var k=0;k<data.length;k++){
								var d = data[k];
								pertainProjectArray.push({
									text:d.item_name,
									checked:d.defaultSelected,
									required:d.required,
									price:d.price,
									item_code:d.item_code,
									quantity:d.quantity
								});
							}
							var options = {
								id:'handleOptionList',
								left:e.pageX,
								top:e.pageY,
								width:200,
								hideOnUnhover:false,
								checkbox:true,
								data:pertainProjectArray,
								onHide:function(){//附加项目面板隐藏后，移除检查项目选中状态
									optionTable.find('td[class="active"]').removeClass('active');
								}
							};
							initOptionListMenu(options);
						}
					}else{
						self.removeClass('active');
						hideMenu($('#handleOptionList'));
					}
				});
			});
		}
	}
	/**点击治疗项目*/
	function optionItemClick(elem,data){
		var project = $.data(elem[0],'project');
		var rows = resultTable.datagrid('getRows'),i=0,length=rows.length,existFlag=false;
		for(;i<length;i++){
			if(rows[i].id==project.id){
				existFlag = true;
				break;
			}
		}
		if(!existFlag){
			var row = {
				id:project.id,
				quantity:1,
				project:project,
				amount:0
			};
			if(data&&data.length>0){
				row.pertain = data;
			}
			resultTable.datagrid('appendRow',row);
			resultTable.datagrid('beginEdit',length);
		}
	}
	
	/**创建开单列表*/
	function createResultTable(){
		resultTable.datagrid({
//			fitColumns:true,
			showFooter:true,
			border:false,
			striped:true,
			loadMsg:'',
			columns:[[
				{field:'id',hidden:true},
				{field:'projectName',title:'项目名称',width:400,align:'left',halign:'center',resizable:false,formatter:function(value,row){
					return row.project.project_name;
				}},
				{field:'quantity',title:'数量',width:80,align:'center',halign:'center',editor:{
					type:'numberspinner',
					options:{
						width:80,
						min:1,
						required:true,
						missingMessage:'请输入数量！',
						onChange:calculateAmount
					}
				},resizable:false},
				{field:'units',title:'单位',width:100,align:'center',halign:'center',resizable:false,formatter:function(value,row){
					return row.project.project_units;
				}},
				{field:'amount',title:'金额',width:100,align:'right',halign:'center',resizable:false},
				{field:'administration',title:'备注',width:100,align:'right',halign:'center',editor:{
					type:'combobox',
					options:{
						width:100,
						valueField:'eyeId',
						textField:'eyeText',
						panelHeight:'auto',
						data:[
						      {eyeId:48,eyeText:'双眼'},
						      {eyeId:47,eyeText:'右眼'},
						      {eyeId:46,eyeText:'左眼'}
						      ]
					}
				},resizable:false,formatter:function(value,row){
					return row.administration;
				}},
			]]
		});
	}
	
	/**计算金额*/
	function calculateAmount(now,old){
		if(now){
			var rows=resultTable.datagrid("getRows");
			var quantity = parseInt(now);
			for(var i=0;i<rows.length;i++){
				var row = rows[i];
				var index=resultTable.datagrid("getRowIndex",rows[i]);
				var editor=resultTable.datagrid("getEditor",{index:index,field:"quantity"});
				if(editor&&editor.target[0]===this){
					row.amount = (quantity*parseFloat(row.project.price).toFixed(2)).toFixed(2);
					var pertain = row.pertain;
					if(pertain){
						for(var k=0;k<pertain.length;k++){
							var pAmount = quantity*(parseFloat(pertain[k].price).toFixed(2));
							row.amount = _emr_addNum(pAmount,parseFloat(row.amount),2);
						}
					}
					resultTable.prev().children("div[class*='datagrid-body']")
					.children("table").children("tbody").children("tr:eq("+index+")")
					.children("td[field='amount']").children("div").text(rows[i].amount+'');
				}
			}
		}
	}
	
	/**
	 * 添加已存在的治疗单和随访记录
	 */
	function addExistHandleOrders(){
		var result = getJSONData(existHandleOrdersUrl,{visitId:getCurrentPatient().visit[0].id,tag:Math.random()},'POST');
		for(var i=0;i<result.length;i++){
			var order = result[i];
			var project = {
				project_name:order.projectName,
				project_units:order.units
			};
			resultTable.datagrid('appendRow',{
				outpTreatRecId:order.outpTreatRecId,
				id:order.projectId,
				quantity:order.quantity,
				project:project,
				amount:parseFloat(order.amount).toFixed(2),
				administration:order.administration
			});
		}
		
	}
	
	var timer;
	function bindGlobalEvent(){
		$('#handle_pinyin_text').unbind('keyup.handle').bind('keyup.handle',function(){
			var self = $(this);
			if(timer){
				clearTimeout(timer);
			}
			var oldTxt = self.data('oldTxt');
			var pinyin = $.trim(self.val());
			if(!oldTxt&&!pinyin) return;
			if(!(oldTxt&&oldTxt!=pinyin||!oldTxt)) return;
			timer = setTimeout(function(){
				var optionData = getJSONData(handleProjectUrl,{pinyin:pinyin,validable:true,tag:Math.random()},'POST');
				createOptionProjects(optionData);
				self.data('oldTxt',pinyin);
			},100);
		});
		var btns = $('#handle_list_btn a');
		/*提交*/
		$(btns[0]).bind('click',function(){
			var rows = resultTable.datagrid('getSelections');
			if(!rows.length){
				rows = resultTable.datagrid('getRows');
			}
			if(!rows.length) return;
			var handleArr = [];
			for(var i=0;i<rows.length;i++){
				var row = rows[i];
				if(row.outpTreatRecId) continue;
				var index = resultTable.datagrid('getRowIndex',row);
				var editor = resultTable.datagrid('getEditor',{index:index,field:'administration'});
				var quantityEd = resultTable.datagrid('getEditor',{index:index,field:'quantity'});
				if(editor&&editor.target!=null){
					var administration = $(editor.target).combobox('getText');
					row.administration = administration;
					row.quantity = $(quantityEd.target).numberspinner('getValue');
					handleArr.push({
						projectId:row.id,
						quantity:row.quantity,
						administration:row.administration,
						pertain:row.pertain
					});
				}
			}
			if(handleArr.length){
				var patient = getCurrentPatient();
				var result = getJSONData(saveHandleOrdersUrl,{handleOrders:JSON.stringify(handleArr),
					visitId:patient.visit[0].id,tag:Math.random()},'POST');
				if(result){
					for(var i=0;i<rows.length;i++){
						var row = rows[i];
						for(var k=0;k<result.length;k++){
							if(row.id==result[k].projectId){
								var index = resultTable.datagrid('getRowIndex',row);
								resultTable.datagrid('endEdit',index);
								resultTable.datagrid('updateRow',{index:index,row:{
										outpTreatRecId:result[k].outpTreatRecId,
										administration:result[k].administration
										}
									}
								);
								delete row.project;
								delete row.pertain;
							}
						}
					}
				}
			}
		});
		/*打印*/
		$(btns[1]).bind('click',function(){
			var rows = resultTable.datagrid('getSelections');
			if(!rows.length){
				rows = resultTable.datagrid('getRows');
			}
			var printOrders = [];
			for(var i=0;i<rows.length;i++){
				var row = rows[i];
				if(row.outpTreatRecId){
					printOrders.push(row.outpTreatRecId);
				}
			}
			if(printOrders.length){
				var printData = getJSONData(printHandleOrdersUrl,{orders:printOrders.join(','),
						visitId:getCurrentPatient().visit[0].id,
						tag:Math.random()
					},'POST');
				if(printData&&printData.list.length){
					print(printData);
				}
			}else{
				$.oimsAlert('无可打印治疗单记录');
			}
		});
		/*删除*/
		$(btns[2]).bind('click',function(){
			var rows = resultTable.datagrid('getSelections'),i=0,length=rows.length;
			var handleOrders = [];
			var submitOrders = [];
			for(;i<length;i++){
				var row = rows[i];
				var index = resultTable.datagrid('getRowIndex',row);
				if(row.outpTreatRecId){
					handleOrders.push(row.outpTreatRecId);
					submitOrders.push(row);
				}
				resultTable.datagrid('deleteRow',index);
			}
			if(handleOrders.length){
				var result = getJSONData(delHandleOrdersUrl,{orders:handleOrders.join(','),tag:Math.random()},'POST');
				if(result){
					for(var i=0;i<result.length;i++){
						for(var k=0;k<submitOrders.length;k++){
							var row = submitOrders[k];
							if(result[i]==row.outpTreatRecId){
								var index = resultTable.datagrid('getRowIndex',row);
								resultTable.datagrid('deleteRow',index);
							}
						}
					}
				}
			}
		});
	}
	
	/**清除患者对应的处置数据*/
	function clear(){
		
	}
	var pageIndex = 1;
	function print(data){
		var html = getHtmlContent('print_handle');
		var start = html.indexOf('<!--start-->');
		var end = html.indexOf('<!--end-->');
		var head = html.substring(0,start+12);
		var main = html.substring(start+12,end);
		var footer = html.substring(end);
		var patient = getCurrentPatient();
		html = head;
		pageIndex = 1;
		for(var i=0;i<data.list.length;i++){
			var obj = data.list[i];
			makeHtml(obj.items,obj.position);
		}
		html +=footer;
		if($('#printFrame').length) $('#printFrame').remove();
		var printFrame = $('<iframe id="printFrame" name="printFrame" style="display:none;"/>').appendTo('body');
		var win = printFrame[0].contentWindow;
		win.document.write(html);
		win.document.close();
//		doPrintPreview(win.document,'B5 (JIS)');//调用jatoolsPrinter预览
		doPrint(win.document,'B5 (JIS)');//调用jatoolsPrinter直接打印
		/*
		 * 每张申请单最大打印16条项目，如果超过，则增加一张申请单。
		 * 18条，打印2张
		 * 33条，打印3张
		 */
		function makeHtml(items,position){
			var count = 0;
			var container = makeHeader(position?position:'');
			var list = '';
			for(var i=0;i<items.length;i++){
				var objItemArr = items[i];
				count += objItemArr.length+1;
				if(count>17){
					container = container.replace('<!--list-->',list);
					html +=container;
					list = '';
					makeHtml(items.slice(i),position);
					break;
				}else{
					for(var k=0;k<objItemArr.length;k++){
						var objItem = objItemArr[k];
						list += makeList(objItem);
					}
					list += '<tr><td colspan="5">&nbsp;</td></tr>';
				}
			}
			if(list){
				container = container.replace('<!--list-->',list);
				html +=container;
			}
		}
		function makeHeader(position){//生成申请单头部信息
			var container = main;
			container = container.replace('<!--page-->',"page"+(pageIndex++));//打印页面id
			container = container.replace('<!--name-->',patient.xingming);
			container = container.replace('<!--sex-->',patient.xingbie?'男':'女');
			container = container.replace('<!--age-->',_emr_calculteAge(patient.shengri));
			container = container.replace('<!--medicalNo-->',patient.binglihao);
			container = container.replace('<!--doctor-->',data.doctor);
			container = container.replace('<!--printDate-->',data.printDate);
			container = container.replace('<!--position-->',position);
			container = container.replace('<!--diagnose-->',data.diagnose);
			return container;
		}
		function makeList(objItem){//生成检查单项目列表信息
			var tr = '<tr>';
			tr += '<td>'+objItem.item_name+'</td>';
			tr += '<td>'+objItem.quantity+'</td>';
			tr += '<td>'+objItem.units+'</td>';
			tr += '<td>'+objItem.costs+'</td>';
			tr += '<td>'+(objItem.administration?objItem.administration:'')+'</td>';
			tr += '</tr>';
			return tr;
		}
	}
	
	return handle;
}