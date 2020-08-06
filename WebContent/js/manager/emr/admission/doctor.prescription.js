function _emr_prescription_obj(){
	var panel = $(getHtmlContent('prescription')).appendTo('#tabpanel');
	var prescription = {
		resize:resize,
		panel:$(panel)
	};
	var MedicinesListTable;
	var optionTable;//供用户选择项目的table
	var resultTable;//展示用户已选择项目的table
	var _emr_prescription_eleMap = {};
	var _emr_medicines_url="/publish/emr/findMedicines.htm";
	var medicineslist_url="/publish/emr/findSubmitMedicines.htm";
	var prescription_save_url="/publish/emr/savePrescription.htm";
	var deleteMedicines_url="/publish/emr/deleteMedicines.htm";
	var getPrescPrintDataUrl = "/publish/emr/getPrescPrintData.htm";
	var comboboxEditor_num = {
			type:'numberspinner',
			options:{
				min: 1,  
				editable: true,
				precision:0,
				required:true,
				onChange:function(value){
					var rows=resultTable.datagrid("getRows");
					for(var i=0;i<rows.length;i++){
						var index=resultTable.datagrid("getRowIndex",rows[i]);
						var editor=resultTable.datagrid("getEditor",{index:index,field:"num"});
						if(editor&&$(editor.target)[0]===this){
							if(value){
								rows[i].amount=parseFloat(value)*parseFloat(rows[i].price);
								rows[i].amount = rows[i].amount.toFixed(2);
								resultTable.prev().children("div[class*='datagrid-body']").children("table").children("tbody").children("tr:eq("+index+")").children("td[field='amount']").children("div").text(rows[i].amount);
							}
						}
					}
				}
			}
		};
	var comboboxEditor_dose_per_unit = {
			type:'numberspinner',
			options:{
				min: 0.00,  
				editable: true,
				required:true,
				precision:3
			}
	};
	var dosageComboData = getJSONData("/publish/emr/findAdministrations.htm",{tag:Math.random()},'POST');
	var comboboxEditor_dosage = {
			type:'combobox',
			options:{
				valueField:'dosageId',
				textField:'dosageText',
				panelHeight:150,
				required:true,
				editable:true,
				data:dosageComboData.obj,
				filter: function(q, row){//定义输入检索方法，此处为根据拼音和中文匹配
					var opts = $(this).combobox('options');
					return row[opts.valueField].toLowerCase().indexOf(q.toLowerCase())>-1
						||row[opts.textField].indexOf(q)==0;
				}
			}
		};
	var frequencyComboData = getJSONData("/publish/emr/findFrequencys.htm",{tag:Math.random()},'POST');
	var comboboxEditor_frequency = {
			type:'combobox',
			options:{
				valueField:'frequencyId',
				textField:'frequencyText',
				panelHeight:150,
				required:true,
				editable:true,
				data:frequencyComboData.obj
			}
		};
	//列表是否存在
	var resultTableExists = false;
	/**************************************************************************/
	resize();
	createMedicinesListTable();
	createApplyListTable();
	addExistsOrderList();
	btnBindEvent();
	/**
	 * 计算处方标签页的尺寸
	 * @param panel
	 */
	function resize(){
		//药品表
		optionTable=$("#medicines_list_div");
		//获得处方表
		resultTable = $('#prescription_selectedlist_div');
		var pnlTab = panel.parent();//tabpanel
		var panelHeight = pnlTab.height()-4-5;
		var pnlMain = $('#prescription_main');
		var pnlTop = $('#prescription_top');
		var pnlBottom = $('#prescription_bottom');
		pnlMain.width(pnlTab.width()-2).height(panelHeight+2);
		pnlTop.height(panelHeight*0.6);
		pnlBottom.height(panelHeight-pnlTop.height()-1);
		optionTable.height(pnlTop.height()-$('#prescription_pinyin_div').height()+1);
		resultTable.height(pnlBottom.height()-$('#prescription_tool_div').height()+1);
		pnlMain.unbind('myresize').bind('myresize',function(){
			resultTable.datagrid('resize',{width:pnlMain.width()-4});
			optionTable.datagrid('resize',{width:pnlMain.width()-4});
		});
		if(resultTableExists){
			resultTable.datagrid('resize',{width:pnlMain.width()-4});
		}
	}
	//加载药品信息
	function createMedicinesListTable(){
		optionTable.datagrid({
			fitColumns:true,
			showFooter:false,
			border:false,
			striped:true,
			singleSelect:true,
			pagination:true,
			loadMsg:'',
			columns:[[
				{field:'DRUG_CODE',hidden:true},
				{field:'DOSE_PER_UNIT',hidden:true},
				{field:'DOSE_UNITS',hidden:true},
				{field:'DRUG_NAME',title:'药品名称',width:200,align:'left',halign:'center',resizable:false},
				{field:'FIRM_ID',title:'生厂商',width:50,align:'left',halign:'center',resizable:false},
				{field:'PACKAGE_SPEC',title:'总规格',width:50,align:'left',halign:'center',resizable:false},
				{field:'PACKAGE_UNITS',title:'总单位',width:50,align:'left',halign:'center',resizable:false},
				{field:'DRUG_SPEC',title:'规格',width:50,align:'left',halign:'center',resizable:false},
				{field:'UNITS',title:'单位',width:50,align:'left',halign:'center',resizable:false},
				{field:'DRUG_FORM',title:'药品类型',width:50,align:'left',halign:'center',resizable:false},
				{field:'TOXI_PROPERTY',title:'特性',width:50,align:'left',halign:'center',resizable:false},
				{field:'PRICE',title:'单价',width:50,align:'left',halign:'center',resizable:false},
				{field:'QUANTITY',title:'库存',width:50,align:'left',halign:'center',resizable:false},
			]],
			onSelect:function(rowIndex,rowData){
				itemSelect(rowData);
			},
			data:[]
			
		});
		optionTable.datagrid('options').loadMsg='正在查询数据...';
		 var p = optionTable.datagrid('getPager');
		 $(p).pagination({ // 设置分页功能栏
			// 分页功能可以通过Pagination的事件调用后台分页功能来实现
			beforePageText : '第',// 页数文本框前显示的汉字
			afterPageText : '页    共 {pages} 页',
			displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录',
			showRefresh:false,
			pageSize: 10,//每页显示的记录条数，默认为10  
		    pageList: [10,15,30],//可以设置每页记录条数的列表  
		});
	}
	
	/** 创建药品单列表 */
	function createApplyListTable(){
		resultTable.datagrid({
			fitColumns:true,
			showFooter:false,
			border:false,
			striped:true,
			loadMsg:'',
			columns:[[
				{field:'drug_code',hidden:true},
				{field:'price',hidden:true},
				{field:'id',hidden:true},
				{field:'firm_id',hidden:true},
				{field:'drug_name',title:'药品名称',width:200,align:'left',halign:'center',resizable:false},
				{field:'dose_per_unit',title:'每次用量',width:50,align:'left',halign:'center',resizable:false,editor:comboboxEditor_dose_per_unit},
				{field:'dose_units',title:'用量单位',width:40,align:'left',halign:'center',resizable:false},
				{field:'dosage',title:'用法',width:50,align:'left',halign:'center',resizable:false,editor:comboboxEditor_dosage},
				{field:'frequency',title:'频率',width:40,align:'left',halign:'center',resizable:false,editor:comboboxEditor_frequency},
				{field:'drug_spec',title:'总规格',width:50,align:'left',halign:'center',resizable:false},
				{field:'num',title:'总量',width:30,align:'left',halign:'center',resizable:false,editor:comboboxEditor_num},
				{field:'units',title:'总单位',width:30,align:'left',halign:'center',resizable:false},
				{field:'amount',title:'金额',width:50,align:'right',halign:'center',resizable:false},
			]],
		});
		resultTableExists = true;
	}
	
	/**获取已经开出的申请单列表*/
	function addExistsOrderList(){
		var list = getJSONData(medicineslist_url,{jiuzhenId:$('body').data('patient').visit[0].id,tag:Math.random()},'POST').obj;
		if(list){
			$.each(list,function(){
				var row = {};
				row.drug_code = this.drugCode;
				row.drug_name = this.drugName;
				row.dose_per_unit = this.dosage;
				row.dose_units = this.dosageUnits;
				row.dosage = this.administration;
				row.frequency = this.frequency;
				row.drug_spec = this.drugSpec;
				row.num = this.amount;
				row.units=this.units;
				row.amount = this.costs;
				row.id=	this.id;
				resultTable.datagrid('appendRow',row);
			});
		}
	}
	var timer;
	function btnBindEvent(){
		$("#prescription_pinyin").bind("keyup",function(){
			var self = $(this);
			if(timer){clearTimeout(timer);}
			var input = $.trim(self.val());
			var oldText = self.data('oldText');
			if(oldText==input) return;//拼音未改变，不再重复查询数据库
			timer=setTimeout(function(){
				$.extend(optionTable.datagrid('options'),{url:contextPath+_emr_medicines_url,queryParams:{input:input}});
				optionTable.datagrid('reload');
				self.data('oldText',input);
			},1000);
		});
		/** *****提交******* */
		$('#prescription_btn').find('a:eq(0)').bind('click',function(){
			var rows = resultTable.datagrid('getSelections');
			if(!rows.length){//判断是否有选择的数据，如果没有则默认为所有数据
				rows = resultTable.datagrid('getRows');
			}
			if(!rows.length){
				return;
			}
			var prescrptionArr = new Array();
			var errorFlag = false;
			for(var i=0;i<rows.length;i++){
				var row = rows[i];
				var rIndex = resultTable.datagrid('getRowIndex',row);
				var editors = resultTable.datagrid('getEditors',rIndex);
				if(editors.length){//处于编辑状态的药品可以提交
					var dose_per_unit_Editor = editors[0];
					var dosePerUnitText = dose_per_unit_Editor.target.numberspinner('getValue');
					var dosage_Editor = editors[1];
					var dosageText = dosage_Editor.target.combobox('getText');
					var frequency_Editor = editors[2];
					var frequencyText = frequency_Editor.target.combobox('getText');
					var num_Editor = editors[3];
					var numText = num_Editor.target.numberspinner('getValue');
					var prescription = {};
					prescription.drugCode = row.drug_code;
					prescription.drugName = row.drug_name;
					prescription.dosage = dosePerUnitText;
					prescription.dosageUnits=row.dose_units;
					prescription.costs=parseFloat(numText)*parseFloat(row.price);
					prescription.charges=parseFloat(numText)*parseFloat(row.price);
					prescription.units=row.units;
					prescription.drugSpec=row.drug_spec;
					prescription.administration=dosageText;
					prescription.frequency=frequencyText;
					prescription.amount=numText;
					prescription.firmId=this.firm_id;
					prescription.serialNo=$('body').data('patient').visit[0].id;
					if(!$.trim(prescription.dosage)){
						$.oimsAlert("每次用量不能为空");
						errorFlag = true;
						break;
					}
					if(!$.trim(prescription.administration)){
						$.oimsAlert("用法不能为空");
						errorFlag = true;
						break;
					}
					if(!$.trim(prescription.frequency)){
						$.oimsAlert("频率不能为空");
						errorFlag = true;
						break;
					}
					if(!$.trim(prescription.amount)){
						$.oimsAlert("总量不能为空");
						errorFlag = true;
						break;
					}
					prescrptionArr.push(prescription);
				}
			}
			if(errorFlag) return;
			if(prescrptionArr.length&&prescrptionArr.length<=5){
				var patient = $('body').data('patient');
				var data = {
					binglihao:patient.binglihao,
					visitId:patient.visit[0].id,
					prescrptionArr:JSON.stringify(prescrptionArr),
					tag:Math.random()
				};
				//默认情况提交所有可以编辑的记录
				var responseData = getJSONData(prescription_save_url,data,'POST');
				//console.log(responseData);
				//console.log(responseData.obj.length);
				//TODO 将each语句修改为了for循环，还未作验证
				//rows被选择的前台的条目（可能包括已经提交的或者是所有的条目）
				
				if (responseData.obj!=null) {
									for(var i=0;i<rows.length;i++){
					var row = rows[i];
					if(!responseData.obj.length) break;
					//responseDate是提交到后台并且保存之后的返回的提价的条目的信息
					for(var j=0;j<responseData.obj.length;j++){
						var data = responseData.obj[j];
						if(row.drug_code==data.drugCode){
							var index = resultTable.datagrid('getRowIndex',row);
							resultTable.datagrid('endEdit',index);
							resultTable.datagrid('updateRow',{index:index,row:{dosage:data.administration,frequency:data.frequency,id:data.id}});
							responseData.obj.splice(j,1);
							break;
						}
					}
				}
				}else{
					alert("");
				}
			}else if(prescrptionArr.length>5){
				$.oimsAlert("每次最多提交5种药品");
				return;
			}
		});
		/*******打印********/
		$('#prescription_btn').find('a:eq(1)').bind('click',function(){
			var patient = $('body').data('patient');
			var printData = getJSONData(getPrescPrintDataUrl,{medicalNum:patient.binglihao,visitId:patient.visit[0].id,tag:Math.random},"POST");
			print(printData);
		});
		/*******删除********/
		$('#prescription_btn').find('a:eq(2)').bind('click',function(){
			var rows=resultTable.datagrid("getSelections");
			var database_delete_ids=[];
			var database_delete=[];
			$.each(rows,function(){
				if(this.id){
					database_delete.push(this);
					database_delete_ids.push(this.id);
				}
				else{
					var index=resultTable.datagrid("getRowIndex",this);
					resultTable.datagrid('endEdit',index);
					resultTable.datagrid('deleteRow',index);
				}
				
			});
			if(database_delete.length>0){
				var data=getJSONData(deleteMedicines_url,{ids:JSON.stringify(database_delete_ids)},"POST");
				if(data.state==1){
					$.each(database_delete,function(){
						var index=resultTable.datagrid("getRowIndex",this);
						resultTable.datagrid('endEdit',index);
						resultTable.datagrid('deleteRow',index);
					});
				}
				else{
					$.oimsAlert("删除失败");
				}
			}
		});
	}
	function itemSelect(rowData){
		var item = rowData;
		var row = {
			drug_code : item.DRUG_CODE,
			drug_name : item.DRUG_NAME,
			dose_per_unit:item.DOSE_PER_UNIT,
			dose_units:item.DOSE_UNITS,
//			dosageId:'KF',
			//dosageText:item.ADMINISTRATION,
			frequencyId:1,
			drug_spec:item.PACKAGE_SPEC,
			price:item.PRICE,
			units:item.PACKAGE_UNITS,
			amount:item.PRICE,
			state:"",
			num:1,
			firm_id:item.FIRM_ID
		};
		var rows = resultTable.datagrid('getRows');
		var exist = false;
		//表示在表格中已经有了此药品并且药品没有作废那么不能添加了
		for(var i=0;i<rows.length;i++){
			if(rows[i].drug_code==row.drug_code){
				exist = true;
				break;
			}
		}
		if(!exist){//选择的检查项目不存在列表中，则添加到列表中
			resultTable.datagrid('appendRow',row);
			var index = rows.length-1;
			resultTable.datagrid('beginEdit', index);
			//combobox框赋值
//			var dosePerUnit = resultTable.datagrid('getEditor', {index:index,field:'dose_per_unit'});
			var dosage=resultTable.datagrid('getEditor',{index:index,field:'dosage'});
			var frequency=resultTable.datagrid('getEditor',{index:index,field:'frequency'});
//			$(dosePerUnit.target).numberspinner('setValue',row.dosePerUnit);
			$(dosage.target).combobox('setText',row.dosageText);
			$(frequency.target).combobox('setValue',row.frequencyId);
		}
	}
	var pageIndex = 1;
	function print(printData){
		if(!printData||(printData&&printData.prescList.length==0)){
			$.oimsAlert('无处方记录！\n请提交处方信息');
			return;
		}
		var html = getHtmlContent('print_presc');
		var start = html.indexOf('<!--start-->');
		var end = html.indexOf('<!--end-->');
		var head = html.substring(0,start+12);
		var main = html.substring(start+12,end);
		var footer = html.substring(end);
		var patient = getCurrentPatient();
		html = head;
		pageIndex = 1;
		for(var i=0;i<printData.prescList.length;i++){
			var prescList = printData.prescList[i];
			makeHtml(prescList);
		}
		if($('#printFrame').length) $('#printFrame').remove();
		var printFrame = $('<iframe id="printFrame" name="printFrame" style="display:none;"/>').appendTo('body');
		var win = printFrame[0].contentWindow;
		win.document.write(html);
		win.document.close();
//		doPrintPreview(win.document,'B5 (JIS)');//调用jatoolsPrinter打印预览
		doPrint(win.document,'B5 (JIS)');//调用jatoolsPrinter直接打印
		
		function makeHtml(prescList){
			var container = makeHeader();
			var list = '';
			for(var i=0;i<prescList.length;i++){
				list += makeList(prescList[i]);
			}
			container = container.replace('<!--list-->',list);
			html += container;
		}
		function makeHeader(){
			var container = main;
			container = container.replace('<!--page-->',"page"+(pageIndex++));//打印页面id
			container = container.replace('<!--name-->',patient.xingming);
			container = container.replace('<!--sex-->',patient.xingbie?'男':'女');
			container = container.replace('<!--age-->',_emr_calculteAge(patient.shengri));
			container = container.replace('<!--medicalNo-->',patient.binglihao);
			container = container.replace('<!--date-->',printData.printDate);
			container = container.replace('<!--position-->',printData.clinic);
			container = container.replace('<!--diagnose-->',printData.diagnose);
			return container;
		}
		
		function makeList(presc){
			var li = '<li>';
			li += '<span>'+presc.drugName+'</span>';
			li += '<span class="left30">'+presc.drugSpec+presc.firmId+'</span>';
			li += '<span class="left30">×'+presc.amount+presc.units+'</span>';
			li += '<div style="width:100%;height:0.1mm;"></div>';
			li += '<span>用法：'+presc.dosage+presc.dosageUnits+'</span>';
			li += '<span class="left30">'+presc.administration+'</span>';
			li += '<span class="left30">'+presc.frequency+'</span>';
			li += '</li>';
			return li;
		}
	}
	
	/**
	 * 展示所有药品通过处方种类
	 */
	
	return prescription;
}
