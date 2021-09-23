function _emr_inspection_obj(){
	var panel = $(getHtmlContent('inspection')).appendTo('#tabpanel');
	var inspection = {
		resize:resize,
		panel:$(panel),
		clear:clear
	};
	var inspectionParentCategoryId = 7;//项目类别
	var _emr_inspection_itemsUrl = '/publish/emr/getitemsbyparentid.htm';
	var _emr_inspectitem_url = '/publish/emr/getinspectitems.htm';
	var _emr_inspect_paint_saveUrl = '/publish/emr/savepaint.htm';//画图保存url
	var inspect_save_url = '/publish/emr/saveinspectorder.htm';
	var inspect_paintAndTip_update_url = '/publish/emr/updatepaintandtip.htm';
	var orderlist_url = '/publish/emr/getorderlist.htm';
	var jcxmPertainItemUrl = '/publish/emr/getjcxmpertainitems.htm';
	var applyListUrl = '/publish/emr/getApplyList.htm';
	var items = getJSONData(_emr_inspection_itemsUrl,
			{categoryId:inspectionParentCategoryId,tag:Math.random()},
			'POST');//获取检查分类
	var optionTable;//供用户选择项目的table
	var resultTable;//展示用户已选择项目的table
	var flash_OD;//OD画图swf
	var flash_OS;//OS画图swf
	var timerR,timerL;//检查左右眼画图swf加载完毕的定时器
	var rate = 1.5;//画图放大比例
	var paintData = {};//保存检查单画图图片路径和检查提示
	
	//眼别comboxEditor，当眼别变化的时候小计价格也会跟着变动
	var comboboxEditor = {
		type:'combobox',
		options:{
			valueField:'eyesortId',
			textField:'eyesortText',
			panelHeight:'auto',
			editable:false,
			onChange:function(now,old){
				if(!old)return;
				var rows = resultTable.datagrid('getRows');
				for(var i=0,len=rows.length;i<len;i++){
					var row = rows[i];
					var index = resultTable.datagrid('getRowIndex',row);
					var editor = resultTable.datagrid('getEditor',{index:index,field:'eyesort'});
					if(editor&&editor.target[0]===this){
						$(this).data('currentRowIndex',index);
						var pertain = row.pertain||[];
						var sumPrice = 0;
						//加上所有附加项目的价格，如果选双眼则附加项目翻倍
						for(var k=0;k<pertain.length;k++){
							sumPrice = _emr_addNum(sumPrice,pertain[k].price*($(this).combobox('getValue')==48?2:1),2);
						}
						//检查项目基础价格
						row.amount = $(this).combobox('getValue')==48?row.price2:row.price1;
						//基础价格+附加项目价格（以区分单眼双眼）得到总价格
						row.amount = _emr_addNum(sumPrice,row.amount,2);
					}
				}
			},
			onHidePanel:function(){
				var combobox = $(this);
				var index = combobox.data('currentRowIndex');
				if(index!==undefined){
					resultTable.datagrid('endEdit',index);
					resultTable.datagrid('refreshRow',index);
					resultTable.datagrid('beginEdit',index);
					reloadFooter();
					combobox.removeData('currentRowIndex');
				}
			},
			data:[{eyesortId:48,eyesortText:'双眼'},
			      {eyesortId:47,eyesortText:'右眼'},
			      {eyesortId:46,eyesortText:'左眼'}
			      ]
		}
	};
	//列表是否存在
	var resultTableExists = false;
	var invalidInspectUrl = '/publish/emr/invalidInspectOrder.htm';
	/*************************************************************************/
	/*初始化界面*/
	resize();
	//申请单列表
	createApplyListTable();
	//显示已经开过单的检查项目
	AddExistsOrderList();
	//显示Logo图示（数据库中对应选择的检查项目没有rightpic与leftpic的时候显示的图片）
	showPaintLogo();
	//在页面上创建项目类别：眼科特检，全院检查，并定义点击事件
	createSortBtn();
	//拼音搜索，提交，打印，删除键绑定
	btnBindEvent();
	//初始化画图工具
	initPaintTool();
	
	/**
	 * 计算检查界面布局
	 */
	function resize(){
		var pnlTab = panel.parent();
		var panelHeight = pnlTab.height()-4-5;
		var inspect_left = $('#inspect_left');
		var inspect_right = $('#inspect_right');
		inspect_left.width((pnlTab.width()-10)-inspect_right.width()).height(panelHeight);
		inspect_right.height(panelHeight);
		var inspect_left_top = $('#inspect_left_top');
		inspect_left_top.height(panelHeight*0.6).width(inspect_left.width());
		var inspect_left_bottom = $('#inspect_left_bottom');
		inspect_left_bottom.height(panelHeight-inspect_left_top.height());
		inspect_left_top.children().height(inspect_left_top.height());
		var inspect_itemlist_div = $('#inspect_itemlist_div');
		var inspectionsort = $('#inspectionsort');
		inspect_itemlist_div.width(inspect_left_top.width()-inspectionsort.width()-1);
		$('#inspect_selectitem_div').height(inspect_left_top.height()-$('#inspect_pinyin_table').height()-1);
		
		optionTable = $('#inspect_selectitem_div table:eq(0)');
		resultTable = $('#inspect_selectedlist_div');
		resultTable.height(inspect_left_bottom.height()-$('#inspect_left_bottom div:eq(0)').height());
		inspect_left.unbind('myresize').bind('myresize',function(){
			inspect_left_top.width(inspect_left.width());
			inspect_left_bottom.width(inspect_left.width());
			inspect_itemlist_div.width(inspect_left_top.width()-inspectionsort.width()-1);
			resultTable.datagrid('resize',{width:inspect_left_bottom.width()});
		});
		if(resultTableExists){
			resultTable.datagrid('resize',{width:inspect_left_bottom.width()});
		}
	}
	
	/**创建申请单列表*/
	function createApplyListTable(){
		resultTable.datagrid({
			fitColumns:true,
			showFooter:true,
			border:false,
			striped:true,
			columns:[[
				{field:'id',hidden:true},
				{field:'showText',title:'项目名称',width:200,align:'left',halign:'center',resizable:false},
				{field:'eyesort',title:'眼别',width:50,align:'center',resizable:false,editor:comboboxEditor,formatter:function(value,row){
					return row.eyesortText;
				}},
				{field:'amount',title:'金额',width:50,align:'right',halign:'center',resizable:false},
			]],
			loadMsg:'',
			onSelect:function(rowIndex,rowData){
				showPaint(rowData);
			},
			onUnselect:function(rowIndex,rowData){
				showPaintLogo();
			}//,
			//data:{rows:[],footer:[{state:'<strong style="float:right;">共计：</strong>',amount:0}]}
		});
		resultTableExists = true;
	}
	
	/**获取已经开出的申请单列表*/
	function AddExistsOrderList(){
		var list = getJSONData(orderlist_url,{visit:$('body').data('patient').visit[0].id,tag:Math.random()},'POST');
		if(list){
			$.each(list,function(){
				var row = {};
				row.id = this.id;
				row.leftPicPath = this.leftPicPath;
				row.rightPicPath = this.rightPicPath;
				row.paintLeft = this.paintLeft;
				row.paintRight = this.paintRight;
				row.order = this.inspectId;
				row.name = this.inspectName;
				row.showText = this.showText;
				row.eyesortText = this.eyeSort;
				row.state = this.state;
				row.tips = this.tip;
				row.amount = this.price ? this.price.toFixed(2):0.00;
				resultTable.datagrid('appendRow',row);
			});
			reloadFooter();
		}
	}
	//
	function reloadFooter(){
		return;
		var footerRows = resultTable.datagrid('getFooterRows');
		var rows = resultTable.datagrid('getRows');
		var sum = 0;
		for(var i=0;i<rows.length;i++){
			sum = _emr_addNum(sum,rows[i].amount,2);
		}
		footerRows[0].amount = sum;
		resultTable.datagrid('reloadFooter');
	}
	
	var timer;
	/**绑定事件*/
	function btnBindEvent(){
		$('#inspect_pinyin_txt').bind('keyup',function(e){
			var self = $(this);
			if(timer){
				clearTimeout(timer);
			}
			var oldTxt = self.data('oldTxt');
			var pinyin = $.trim(self.val());
			if(!oldTxt&&!pinyin) return;
			if(!(oldTxt&&oldTxt!=pinyin||!oldTxt)) return;
			timer = setTimeout(function(){
				var item = $('#inspectionsort a[class*="sortbtn_on"]').data('item');
				var optionItems = getJSONData(_emr_inspectitem_url,{categoryId:item.categoryid,pinyin:pinyin,tag:Math.random()},'POST');
				createOptionItems(optionItems);
				self.data('oldTxt',pinyin);
			},100);
		});
		/*检查提示文本框*/
		$('#inspect_paint_tip_txt').click(function(){
			if($.trim($(this).val())=='请输入检查要求'){
				$(this).val('');
			}
		}).blur(function(){
			if(!$.trim($(this).val())){
				$(this).val('请输入检查要求');
			}
		});
		/*提交按钮*/
		$('#inspect_btn').find('a:eq(0)').bind('click',function(){
			var rows = resultTable.datagrid('getRows');
			var inspectArr = new Array();
			$.each(rows,function(){
				if(!this.order){
					var rIndex = resultTable.datagrid('getRowIndex',this);
					var rEditor = resultTable.datagrid('getEditor',{index:rIndex,field:'eyesort'});
					this.eyesortId = rEditor.target.combobox('getValue');
					this.eyesortText = rEditor.target.combobox('getText');
					var inspect = {};
					inspect.id = this.id;
					inspect.name = this.name;
					inspect.eyesortId = this.eyesortId;
					inspect.paintLeft = this.paintLeft||'';
					inspect.paintRight = this.paintRight||'';
					inspect.tips = this.tips||'';
					inspect.pertain = this.pertain;
					inspectArr.push(inspect);
				}
			});
//			return;//TODO
			if(inspectArr.length>0){
				var patient = $('body').data('patient');
				var data = {
					patientId:patient.id,
					visitId:patient.visit[0].id,
					inspects:inspectArr
				};
				var responseData = getJSONData(inspect_save_url,{inspectInfo:JSON.stringify(data),tag:Math.random()},'POST');
				$.each(responseData,function(){
					var data1 = this;
					$.each(rows,function(){
						if(this.id==data1.id){
							var index = resultTable.datagrid('getRowIndex',this);
							resultTable.datagrid('endEdit',index);
							resultTable.datagrid('updateRow',{index:index,row:data1});
						}
					});
				});
			}
		});
		/*打印按钮*/
		$('#inspect_btn').find('a:eq(1)').bind('click',function(){
			var selectedRows = resultTable.datagrid('getSelections');
			var patient = $('body').data('patient');
			if(selectedRows.length==0){
				var data = getJSONData(applyListUrl,{visitId:patient.visit[0].id,tag:Math.random()},"POST");
				if(data&&data.list.length>0){
					print(data);
				}else{
					$.oimsAlert('无申请单记录');
				}
			}else{
				var printData = new Array();
				$.each(selectedRows,function(){
					if(this.order){
						printData.push(this.order);
					}
				});
				if(printData.length>0){
					var data = getJSONData(applyListUrl,{visitId:patient.visit[0].id,orders:printData.toString(),tag:Math.random()},"POST");
					print(data);
				}
			}
		});
		/*删除按钮*/
		$('#inspect_btn').find('a:eq(2)').bind('click',function(){
			var rows = resultTable.datagrid('getSelections');
			if(rows.length==0){
				$.oimsAlert('请至少选择一条记录');
				return;
			}
			var submittedInspects = new Array();
			$.each(rows,function(){
				var index = resultTable.datagrid('getRowIndex',this);
				if(this.order){//已经提交到数据库中的数据需要进行处理
					submittedInspects.push(this.order);
					return;
				}
				resultTable.datagrid('deleteRow',index);
				reloadFooter();
			});
			if(submittedInspects.length>0){
				var result = getJSONData(invalidInspectUrl,{orders:submittedInspects.toString(),tag:Math.random()},'POST');
				if(result&&result.message){
					if(result.state){
						$.each(submittedInspects,function(){
							var self = this;
							$.each(rows,function(){
								if(self==this.order){
									var index = resultTable.datagrid('getRowIndex',this);
									resultTable.datagrid('deleteRow',index);
								}
							});
						});
						$.oimsSucc(result.message);
					}else
						$.oimsAlert(result.message);
				}
			}
			if($('#inspect_tips').data('inspectItem')){//如果存在画图结果，显示画图logo
				showPaintLogo();
			}
		});
	}
	var pageIndex = 1;
	//打印检查申请单
	function print(data){
		var html = getHtmlContent('print_apply');
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
		//win.document.open();
		win.document.write(html);
		win.document.close();
//		doPrintPreview(win.document,'B5 (JIS)');//调用jatoolsPrinter打印预览
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
			tr += '<td>'+(objItem.eye?objItem.eye:'')+'</td>';
			tr +='<td>'+(objItem.position?objItem.position:'')+'</td>';
			tr += '</tr>';
			return tr;
		}
	}

	/**
	 * 创建项目类别按钮
	 */
	function createSortBtn(){
		var btnarr = [];
		//var btnarr_list=[];
		items = [//{category:'常规检查',categoryid:8},
		         {category:'眼科特检',categoryid:9}//,
		         //{category:'全院检查',categoryid:10},
		         //{category:'检验项目',categoryid:11},
		         //{category:'检查套餐',categoryid:12}
		         ];
//		items_list=[ {category:'眼科特检',categoryid:9},
//		             {category:'全院检查',categoryid:10}];
		if(items){
			$.each(items,function(){
				var item = this;
				var title = item.category.length>7 ? item.category.substring(0,7)+'...':item.category;
				var a = $('<a class="sortbtn" style="width:90%"/>')
					.text(title)
					.attr('title',item.category)
					.data('item',item);
				btnarr.push(a);
				a.unbind('click').bind('click',function(){
					sortBtnClick($(this));
				});
				
			});
			_emr_initSortBtn($('#inspectionsort'),btnarr);
			btnarr[0].click();
		}
//		if(items_list){
//			$.each(items_list,function(){
//				var item_list=this;
//				var title = item_list.category.length>7 ? item_list.category.substring(0,7)+'...':item_list.category;
//				var div=$("<div class='tab_hide'><span>"+title+"</span></div>").appendTo($("#inspect_list_table"));
//				btnarr_list.push(div);
//				div.unbind('click').bind('click',function(){
//					inspectTabClick($(this));
//				});
//			});
//			btnarr_list[0].click();
//		}
		/**下方类别点击事件*/
//		function inspectTabClick(div){
//			if(!div.hasClass("tab_show")){
//				div.siblings().removeClass('tab_show');
//				div.addClass('tab_show');
//				//重新定义下方table的显示与提交，删除，打印按钮等
//				
//			}
//		}
		
		/**类别按钮点击事件，如：常规检查、特殊检查*/
		function sortBtnClick(a){
			if(!$(a).hasClass('sortbtn_on')){
				//移除上次选中的按钮css
				$(a).siblings().removeClass('sortbtn_on');
				//为本次点击的按钮添加css
				$(a).addClass('sortbtn_on');
				//让下面标签替换
//				$.each($('#inspect_list_table').find('span'),function(){
//					if($(this).text()==$(a).text()){
//						inspectTabClick($(this).parent());
//						return false;
//					}
//				});
				
				var optionItems = _emr_dataCache.getData(_emr_inspectitem_url,{categoryId:a.data('item').categoryid},'POST');
				createOptionItems(optionItems);
			}
		}
	}
	
	function createOptionItems(optionItems){
		if(optionItems){
			optionTable.empty();
			var tr;
			$.each(optionItems,function(i){
				if(i%2==0){
					tr = $('<tr/>').appendTo(optionTable);
				}
				var td = $('<td style="height:20px;"/>').html(this.xmmc).appendTo(tr).data('item',this);
				td.unbind('click').bind('click',function(){
					var self = $(this);
					self.removeClass('active');
					var arr = getSelectedMenuItems($('#inspectOptionList'));
					if($('#inspectOptionList').length==0){
						var item = self.data('item');
						var data = getJSONData(jcxmPertainItemUrl,{jcxmId:item.xmid,tag:Math.random()},'POST');
						var itemDataArr = new Array();
						if(data&&data.length>0){
							for(var k=0;k<data.length;k++){
								var d = data[k];
								itemDataArr.push({
									text:d.item_name,
									checked:d.defaultSelected,
									required:d.required,
									price:d.price,
									item_code:d.item_code,
									quantity:d.quantity
								});
							}
						}
						arr = itemDataArr;
					}
					optionItemClick(self,arr);
				});
				//右键单击检查项目，显示该项目所有附件项目信息
				td.unbind('contextmenu').bind('contextmenu',function(e){
					var self = $(this);
					if(!self.hasClass('active')){
						var item = self.data('item');
						optionTable.find('td[class="active"]').removeClass('active');
						self.addClass('active');
						var data = getJSONData(jcxmPertainItemUrl,{jcxmId:item.xmid,tag:Math.random()},'POST');
						var itemDataArr = new Array();
						if(data&&data.length>0){
							for(var k=0;k<data.length;k++){
								var d = data[k];
								itemDataArr.push({
									text:d.item_name,
									checked:d.defaultSelected,
									required:d.required,
									price:d.price,
									item_code:d.item_code,
									quantity:d.quantity
								});
							}
							var options = {
								id:'inspectOptionList',
								left:e.pageX,
								top:e.pageY,
								width:200,
								hideOnUnhover:false,
								checkbox:true,
								data:itemDataArr,
								onHide:function(){//附加项目面板隐藏后，移除检查项目选中状态
									optionTable.find('td[class="active"]').removeClass('active');
								}
							};
							initOptionListMenu(options);
						}
					}else{
						self.removeClass('active');
						hideMenu($('#inspectOptionList'));
					}
				});
			});
		}
	}
	
	/**检查项目点击事件,如：裂隙灯*/
	function optionItemClick(td,arr){
		var item = $(td).data('item');
		var rows = resultTable.datagrid('getRows');
		var existFlag = false;//判断检查项目是否已经存在于列表中
		for(var i=0;i<rows.length;i++){
			if(rows[i].id==item.xmid&&rows[i].state!='已作废'){
				existFlag = true;
				break;
			}
		}
		if(existFlag) return;//已存在，不能再次添加
		var eyesortText = $('input[type="radio"][name="inspect_eyesort"]:checked').next().text();
		var eyesortId = $('input[type="radio"][name="inspect_eyesort"]:checked').attr('value');
		var row = {
			id : item.xmid,
			name : item.xmmc,
			showText:item.xmmc,
			eyesortId : eyesortId,
			eyesortText : eyesortText,
			leftPicPath:item.leftPicPath,
			rightPicPath:item.rightPicPath,
			//price1单眼的jcxm_to_hisitem中对应的主项目的价格
			price1:item.price1,
			//price2双眼的jcxm_to)hisitem中对应的主项目的价格
			price2:item.price2,
			amount:0
		};
		if(arr&&arr.length>0){
			for(var i=0;i<arr.length;i++){
				row.showText += '+'+arr[i].text;
				row.amount = _emr_addNum(arr[i].price,row.amount,2);
				if(row.eyesortId==48){//附加项目双眼需要加2次
					row.amount = _emr_addNum(arr[i].price,row.amount,2);
				}
			}
			row.pertain = arr;
		}
		if(item.price2){//价格信息，存在两个价格，表示单眼、双眼
			row.amount = _emr_addNum(row.amount,(row.eyesortId==48 ? item.price2 : item.price1),2);
		}else{
			row.amount = _emr_addNum(row.amount,item.price1,2);
		}
		resultTable.datagrid('appendRow',row);
		var index = resultTable.datagrid('getRowIndex',row);
		if(item.categoryId!=8){
			resultTable.datagrid('beginEdit', index);
			var ed = resultTable.datagrid('getEditor', {index:index,field:'eyesort'});
			if(ed){
				$(ed.target).combobox('setValue',row.eyesortId);
			}
		}
		reloadFooter();
	}
	
	/**初始化画图工具*/
	function initPaintTool(){
		var btns = $('#inspect_paint_tool .sbtn a');
		$(btns[0]).click(function(){
			var param = {
				patientId:$('body').data('patient').id,
				regId:$('body').data('patient').visit[0].id,
				categoryId:$('#inspect_tips').data('inspectItem').id,
				eyes:"OD"
			};
			if(flash_OD){
				flash_OD.save(contextPath+_emr_inspect_paint_saveUrl,param);
			}
			if(flash_OS){
				param.eyes = "OS";
				flash_OS.save(contextPath+_emr_inspect_paint_saveUrl,param);
			}
		});
		/**重画*/
		$(btns[1]).click(function(){
			var row = $('#inspect_tips').data('inspectItem');
			if(flash_OD){
				flash_OD.loadPhoto({url:'..'+row.rightPicPath,tip:'OD',tipWidth:''});
			}
			if(flash_OS){
				flash_OS.loadPhoto({url:'..'+row.leftPicPath,tip:'OS',tipWidth:''});
			}
		});
		
		/**初始化颜色选择按钮点击事件*/
		$('#inspect_colorselector a span[name="selector"]').each(function(){
			$(this).click(function(){
				$('#inspect_colorselector a span[name="selector"]').removeClass('selected');
				$(this).addClass('selected');
				if(flash_OD)
					flash_OD.setPenColor($(this).css('background-color'));
				if(flash_OS)
					flash_OS.setPenColor($(this).css('background-color'));
			});
			if($(this).hasClass('selected')){
				$(this).click();
			}
		});
		
		/**start 设置画笔大小*/
		$('#inspect_minus').click(function(){
			var pensize = parseInt($('#inspect_pensize').val());
			if(pensize>1){
				$('#inspect_pensize').val(pensize-1);
				$('#inspect_pensize').data('oldSize',$('#inspect_pensize').val());
				if(flash_OD)
					flash_OD.setPenSize(pensize-1);
				if(flash_OS)
					flash_OS.setPenSize(pensize-1);
			}
		});
		$('#inspect_add').click(function(){
			var pensize = parseInt($('#inspect_pensize').val());
			$('#inspect_pensize').val(pensize+1);
			$('#inspect_pensize').data('oldSize',$('inspect_pensize').val());
			if(flash_OD)
				flash_OD.setPenSize(pensize+1);
			if(flash_OS)
				flash_OS.setPenSize(pensize+1);
		});
		$('#inspect_pensize').keyup(function(){
			var pensize = $('#inspect_pensize').val();
			if(/^[1-9]\d*/.test(pensize)){
				$('#inspect_pensize').data('oldSize',$('#inspect_pensize').val());
				if(flash_OD)
					flash_OD.setPenSize(parseInt(pensize));
				if(flash_OS)
					flash_OS.setPenSize(parseInt(pensize));
			}
		});
		$('#inspect_pensize').blur(function(){
			if($('#inspect_pensize').data('oldSize')){
				$('#inspect_pensize').val($('#inspect_pensize').data('oldSize'));
			}else{
				$('#inspect_pensize').val('1');
			}
		});
		/**end*/
	}
	
	/**初始化画图插件*/
	function initPaint(div,imgPath,id,tip,tipWidth,eyeSort){
		var dimension = {width:div.width(),height:div.height()};
		if(eyeSort=="OD"){
			if(!flash_OD){
				_emr_paint(div,imgPath,dimension,id,"_emr_inspectpaint_saveCallBack",tip,tipWidth);
				if(timerR){
					clearInterval(timerR);
				}
				timerR = setInterval(function(){
					if('setPenColor' in window[id]){
						flash_OD = window[id];
						clearInterval(timerR);
					}
				},100);
			}else{
				flash_OD.loadPhoto({url:'..'+imgPath,tip:tip,tipWidth:'45'});
			}
		}else{
			if(!flash_OS){
				_emr_paint(div,imgPath,dimension,id,"_emr_inspectpaint_saveCallBack",tip,tipWidth);
				if(timerL){
					clearInterval(timerL);
				}
				timerL = setInterval(function(){
					if('setPenColor' in window[id]){
						flash_OS = window[id];
						clearInterval(timerL);
					}
				},100);
			}else{
				flash_OS.loadPhoto({url:'..'+imgPath,tip:tip,tipWidth:'45'});
			}
		}
	}
	
	/**显示画图信息*/
	function showPaint(data){
		if(!data.rightPicPath||!data.leftPicPath){
			showPaintLogo();
		}else{
			$('#inspect_tips').text(data.name).data('inspectItem',data);
			$('#inspect_paint_tool').show();
			if(data.rightPicPath||data.paintRight){
				$('#inspect_paint_OD').children().show();
				$('#inspect_paint_OD img').hide();
				initPaint($('#inspect_paint_OD'),data.paintRight||data.rightPicPath,'inspect_paint_OD_swf','OD','','OD');
			}
			if(data.leftPicPath||data.paintLeft){
				$('#inspect_paint_OS').children().show();
				$('#inspect_paint_OS img').hide();
				initPaint($('#inspect_paint_OS'),data.paintLeft||data.leftPicPath,'inspect_paint_OS_swf','OS','','OS');
			}
			if(data.tips){$('#inspect_paint_tip_txt').val(data.tips);}
		}
	}
	
	/**
	 * 显示画图logo图片。当选择的检查项目无画图表示时，需要显示logo图片.
	 */
	function showPaintLogo(){
		$('#inspect_tips').text('检查提示');
		$('#inspect_paint_tip_txt').val('请输入检查要求');
		$('#inspect_paint_tool').hide();//隐藏画图工具
		
		$('#inspect_paint_OD').children().hide();
		$('#inspect_paint_OD img').attr('src','../images/eye.png').show();
		
		$('#inspect_paint_OS').children().hide();
		$('#inspect_paint_OS img').attr('src','../images/lefteye.png').show();
	}
	
	//保存画图结果后的处理方法
	window._emr_inspectpaint_saveCallBack = function(data,swfId){
		data = data.replace(/\\/g,'/');
		var d = eval('('+data+')');
		window[swfId].loadPhoto({url:'..'+d.obj.pictruePath,tip:d.obj.eyeSort,tipWidth:''});
		var row = $('#inspect_tips').data('inspectItem');
		var tip = $('#inspect_paint_tip_txt').val()=='请输入检查要求' ? '':$('#inspect_paint_tip_txt').val();
		if(row.order){//检查单已经提交，更新检查单画图和提示信息
			var param = {
				order:row.order,
				pictruePath:d.obj.pictruePath,
				eyeSort:d.obj.eyeSort,
				tip:tip
			};
			var resultData = getJSONData(inspect_paintAndTip_update_url,param,'POST');
			if(resultData&&resultData.state){
				setPaintAndTip();
			}
		}else{//检查单未提交，将画图结果和提示信息保存到该检查单信息中
			setPaintAndTip();
		}
		function setPaintAndTip(){
			if(d.obj.eyeSort=='OD'){
				row.paintRight = d.obj.pictruePath;
			}else{
				row.paintLeft = d.obj.pictruePath;
			}
			row.tips = tip;
		}
	};
	function clear(){
		//TODO 清除上一位患者开单数据
	}
	return inspection;
}

