function _emr_inquiry_obj(){
	var panel = $(getHtmlContent('inquiry')).appendTo('#tabpanel');//问诊主要工作区域
	var comps = new _emr_variableComp();//变量组件容器
	var inquriy = {
		resize:resize,
		panel:$(panel),
		clear:clear
	};
	//获取模板的路径
	var getTempletUrl = '/publish/emr/autofindurlwithvariable.htm';
	//录入项保存路径
	var entryItemSaveUrl = '/publish/emr/saveorupdateentryitem.htm';
	//问诊类别ID
	var inquriyCategoryId = 30001;
	/*问诊所包含的所有录入项*/
	var entryItems = getJSONData(_emr_input_itemsUrl,{categoryId:inquriyCategoryId,tag:Math.random()},'POST');
	//当前编辑的录入项容器
	var activeEditDiv;
	var getLastTimeInfoUrl = '/publish/emr/getLastTimeInfo.htm';
	/*************************************************************************/
	
	/*初始化问诊页面*/
	var callbacks = $.Callbacks();
	callbacks.add(createEntryItems);
	callbacks.add(resize);
	callbacks.add(createVariableComps);
	callbacks.add(bindGlobalEvents);
	callbacks.add(getLastTimeInfo);
	callbacks.fireWith(this);
//	createEntryItems();
//	resize();
//	createVariableComps();
//	bindGlobalEvents();
	
	/**
	 * 设置问诊面板布局
	 */
	function resize(){
		var pnlTab = panel.parent();
		var panelheight = pnlTab.height()-4-5;
		var entryitems_panel = $('#inquiry_entryitems_panel');//左侧面板，主诉、现病史等
		var selectitem_panel = $('#inquiry_selectitem_panel');//右侧面板，快速录入模板
		entryitems_panel.height(panelheight).width(pnlTab.width()-10-selectitem_panel.width());
		selectitem_panel.height(panelheight);
		//计算主诉、现病史等的尺寸
		var temp = entryitems_panel.height()%entryItems.length;
		entryitems_panel.children().height((entryitems_panel.height()-temp)/entryitems_panel.children().length);
		var editDiv = entryitems_panel.children().children('div');
		editDiv.css({'overflow':'auto'}).each(function(i){
			var self = $(this);
			var parent = self.parent();
			if(i==(editDiv.length-1)){
				self.height(parent.height()-$('#inquiry_title_h3').height()-1+temp);
			}else{
				self.height(parent.height()-$('#inquiry_title_h3').height()-1);
			}
		});
		//计算右侧面板尺寸
		var pnlRightChild = selectitem_panel.children();
		$('#inquiry_option_panel').height(selectitem_panel.innerHeight()-$('#inquiry_title_h3').outerHeight()-$('#inquiry_pinyin_panel').outerHeight()-4);
	}

	/**
	 * 创建数据库中问诊包含的各个录入项
	 */
	function createEntryItems(){
		if(entryItems){
			for(var i=0;i<entryItems.length;i++){
				var entryItem = entryItems[i];
				var parent = $('<div class="entryitempanel"/>').appendTo($(panel.children()[0]));
				$('<h3/>').text(entryItem.category).appendTo(parent);
				var edit = $('<div/>').data('data',entryItem).appendTo(parent);
			}
		}
	}
	/**
	 * 创建可选可输入变量组件
	 */
	function createVariableComps(){
		$('#inquiry_entryitems_panel').children('div').children('div').each(function(){
			var self = $(this);
			var parentDiv = self.parent();
			var comp = comps.create(self);//创建变量组件
			initRecord(comp);
			comp.bind('focus',{data:comp},function(param){
				if(!activeEditDiv){
					activeEditDiv = parentDiv;
					activeEditDiv.addClass('entryitempanelEdit');
				}else{
					activeEditDiv.removeClass('entryitempanelEdit');
					activeEditDiv = parentDiv;
					activeEditDiv.addClass('entryitempanelEdit');
				}
				_focus(param.data.data);
			});
			comp.contentChange(function(oldValue,value){
				var patient = $('body').data('patient');
				var records = patient.visit[0].records;
				var categoryid = comp.getData('data').categoryid;
				var record;
				$.each(records,function(){
					if(this.categoryId==categoryid){
						record = this;
						return;
					}
				});
				var param = {
					id:record?record.id:'',
					jiuzhen_id:patient.visit[0].id,
					category_id:categoryid,
					jilu:value
				};
				var data = getJSONData(entryItemSaveUrl,param,'POST');
				if(!record){
					record = {};
					record.categoryId = categoryid;
					record.id = data.obj;
					record.jilu = value;
					patient.visit[0].records.push(record);
				}else{
					record.jilu = value;
				}
			});
		});
		comps.get(0).focus();
		function _focus(comp){
			var data = comp.getData('data');
			var oldComp = $('#inquiry_title').data('comp');
			if(!oldComp||(data.categoryid!=oldComp.getData('data').categoryid)){
				//当第一次进来，oldComp不存在或者是切换了问诊的不同内容，则重新定义和显示右侧模板
				$('#inquiry_pinyin').attr('value','');
				$('#inquiry_title').text(data.category);
				$('#inquiry_title').data('comp',comp);//将变量组件绑定到快速录入模板上，以便使用拼音查询时使用。
				$('#inquiry_option_panel').find('table').css("display","none");
				$("#inquiry_display_tree").tree({
	    			animate:false,
	    			method:"get",
	    			url:contextPath+"/publish/shurumoban/findNodeAndMoBanByPid.htm?id=0&categoryId="+data.categoryid,
	    			onBeforeExpand:function(node,param){
	    				$("#inquiry_display_tree").tree("options").url=contextPath+"/publish/shurumoban/findNodeAndMoBanByPid.htm?id="+node.id+"&categoryId="+data.categoryid;
	    			},	
	    			loadFilter:function(data){
	    				if(data.msg){
	    					//返回的msg中的可能包含两类节点（目录节点，模板节点），目录节点state是closed,text是templet.shuru,attribute中包含child即对应的模板变量
	    					//模板节点state不确定，根据后台的查找是否还有（目录节点，模板节点）来确定，text是其name
	    					//得到的模板节点前台要重新进行组合，再放入text中
	    					//当点击模板节点的时候添加到左侧
	    					var msg=[];
	    					$.each(data.msg,function(){
	    						var templet = this;
	    						var tem=templet.text;
	    						var shuru = templet.text;
	    						var i = shuru.indexOf('?');
	    						var k = 0;
	    						while(i!=-1){
	    							shuru = shuru.replace('?',templet.attributes.child[k++][0]);
	    							i = shuru.indexOf('?');
	    						}
	    						templet.text=shuru;
	    						//只要是模板就有attributes属性就可以双击，只要不是模板就没有attributes属性
	    						if(templet.attributes){
	    							templet.attributes.shuru=tem;
	    						}
	    						msg.push(templet);
	    					});
	    					return msg;
	    				}
	    				else{
	    					return data;
	    				}
	    			},
	    			onClick:function(node){
	    				if($(this).tree('isLeaf',node.target)){
	    					comp.add(node.attributes);
	    				}else{
	    					if(!$(node.target).data('expand')){
	    						$(this).tree('expand',node.target);
	    					}else{
	    						$(this).tree('collapse',node.target);
	    					}
	    				}
	    			},
	    			onExpand:function(node){
	    				$(node.target).data('expand',true);
	    			},
	    			onCollapse:function(node){
	    				$(node.target).data('expand',false);
	    			}
				});
			}
		}
	}
	
	/**初始化变量组件的值*/
	function initRecord(comp){
		var patient = $('body').data('patient');
		var visit = patient.visit[0];
		var records = visit.records;
		var categoryid = comp.getData('data').categoryid;
		$.each(records,function(){
			if(this.categoryId==categoryid){
				comp.setValue(this.jilu);
				return false;
			}
		});
	}

	/**绑定问诊界面全局事件*/
	function bindGlobalEvents(){
		var timer;//定时器
		/**拼音查询键盘事件*/
		$('#inquiry_pinyin').unbind('keyup').bind('keyup',function(e){
			var input = $(this);
			var inputTxt = $.trim(input.val());
			var oldTxt = input.data('oldTxt');
			if((!oldTxt&&inputTxt)||(oldTxt&&inputTxt!=oldTxt)){
				if(timer){
					clearTimeout(timer);
				}
				timer = setTimeout(function(){
					var table = $('#inquiry_option_panel').find('table').empty();
					var comp = $('#inquiry_title').data('comp');
					var templets;
					if(inputTxt){
						//templets = _emr_dataCache.search(getTempletUrl,{categoryId:comp.getData('data').categoryid},'POST',inputTxt);
						table.css("display","block");
						$("#inquiry_display_tree").css("display","none");
						templets = _emr_dataCache.search(getTempletUrl,{categoryId:comp.getData('data').categoryid},'POST',inputTxt);
					}else if(!inputTxt&&oldTxt){
						//templets = _emr_dataCache.getData(getTempletUrl,{categoryId:comp.getData('data').categoryid},'POST');
						table.css("display","none");
						$("#inquiry_display_tree").css("display","block");
						templets=[];
					}else{
						return;
					}
					$.each(templets,function(){
						var templet = this;
						var shuru = templet.shuru;
						var i = shuru.indexOf('?');
						var k = 0;
						while(i!=-1){
							shuru = shuru.replace('?',templet.child[k++][0]);
							i = shuru.indexOf('?');
						}
						var tr = $('<tr><td>'+shuru+'</td></tr>').data('data',templet).appendTo(table);
						tr.bind('click',function(){
							comp.add($(this).data('data'));
						});
					});
					input.data('oldTxt',inputTxt);
				},200);
			}
		});
	}
	
	/**获取并添加上一次的诊断结果、过敏史、家族史*/
	function getLastTimeInfo(){
		var patient = getCurrentPatient();
		var data = getJSONData(getLastTimeInfoUrl,{visitId:patient.visit[0].id,patientId:patient.id,tag:Math.random()},'POST');
		/*上次的诊断结果为本次的既往史结果*/
		if(data.passHistory)
			comps.get(2).add(data.passHistory);
		/*过敏史*/
		if(data.allergyHistory)
			comps.get(3).add(data.allergyHistory);
		/*家族史*/
		if(data.familyHistory)
			comps.get(4).add(data.familyHistory);
	}
	
	/**清空问诊界面所有与患者有关的数据*/
	function clear(){
		$.each(comps.store,function(){
			this.setValue('');
			initRecord(this);
		});
		comps.get(0).focus();
	}
	return inquriy;
}