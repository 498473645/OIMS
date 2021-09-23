function _emr_physical_obj(){
	var panel = $(getHtmlContent('physical')).appendTo('#tabpanel');
	var comps = new _emr_variableComp();//变量组件
	var physical = {
		resize:resize,
		panel:$(panel),
		clear:clear
	};
	//获取模板的路径
	var getTempletUrl = '/publish/emr/autofindurlwithvariable.htm';
	//保存查体各项内容的url
	var entryItemSaveUrl = '/publish/emr/saveorupdateentryitem.htm';
	//画图保存url
	var paintSaveUrl = '/publish/emr/savepaint.htm';
	//视力保存或者更新地址
	var saveOrUpdateVisionUrl = '/publish/emr/saveOrUpdateVision.htm';
	//眼压保存或者更新地址
	var saveOrUpdateIopUrl = '/publish/emr/saveOrUpdateIop.htm';
	
	//体格检查类别ID
	var physicalCategoryId = 30002;
	var flashObj;//画图swf
	var timer;//检查画图swf加载完毕的定时器
	var rate = 1.5;//画图放大比例
	var activeEditTr;//处于编辑状态的行
	
	/*体格检查包含的项目*/
	var entryItems = getJSONData(_emr_input_itemsUrl,{categoryId:physicalCategoryId,tag:Math.random()},'POST');
	var clearPaintUrl = '/publish/emr/clearPaint.htm';
	/*******************************************************************/
	
	/*初始化体格检查界面*/
	createEntryItems();
	resize();
	createVariableComps();
	bindGlobalEvents();
	
	/**
	 * 计算体格检查界面布局
	 */
	function resize(){
		var pnlTab = panel.parent();
		var panelHeight = pnlTab.height()-4-5;
		//设置查体项目面板元素的尺寸
		var physical_left = $('#physical_left');
		var physical_right = $('#physical_right');
		var physical_item = $('#physical_item');
		physical_left.width((pnlTab.width()-8)-physical_right.width()).height(panelHeight+2);
		physical_item.height(physical_left.height());
		var itemCount = physical_item.find('tr').length-1;
		var itemTotalHeight =physical_item.height() - 40;//40为第一行的高度
		var residue = itemTotalHeight%itemCount;
		var itemHeight = (itemTotalHeight-residue)/itemCount;
		physical_item.find('td').each(function(){
			$(this).css('height',itemHeight+'px');
		});
		//设置输入模板面板元素的尺寸
		physical_right.height(panelHeight);
		var brotherHeight = $('#physical_title_h3').height()+$('#physical_search_table').height()+$('#physical_paint').height();
		$('#physical_selectitem_div').height(physical_right.height()-brotherHeight-12);
	}
	
	/**绑定体格检查全局事件*/
	function bindGlobalEvents(){
		var timer;//定时器
		/**拼音查询键盘事件*/
		$('#physical_pinyin').unbind('keyup').bind('keyup',function(e){
			var input = $(this);
			var inputTxt = $.trim(input.val());
			var oldTxt = input.data('oldTxt');
			if((!oldTxt&&inputTxt)||(oldTxt&&inputTxt!=oldTxt)){
				if(timer){
					clearTimeout(timer);
				}
				timer = setTimeout(function(){
					var table=$('#physical_selectitem_table').empty();
					var comp = $('#physical_title').data('comp');
					var templets;
					if(inputTxt){
						table.css("display","block");
						$("#physical_display_tree").css("display","none");
						templets = _emr_dataCache.search(getTempletUrl,
								{categoryId:comp.getData('data').parent.categoryid},
								'POST',inputTxt);
					}else if(!inputTxt&&oldTxt){
						table.css("display","none");
						$("#physical_display_tree").css("display","block");
						templets=[];
//						templets = _emr_dataCache.getData(getTempletUrl,
//								{categoryId:comp.getData('data').parent.categoryid},'POST');
					}else{
						return;
					}
					$('#physical_selectitem_table').empty();
					for(var i=0,len=templets.length;i<len;i++){
						var templet = templets[i];
						var shuru = templet.shuru;
						var index = shuru.indexOf('?');
						if('child' in templet&&templet.child.length>0){
							while(index!=-1){
								shuru = shuru.replace('?',templet.child[0][0]);
								index = shuru.indexOf('?');
							}
						}
						var tr = $('<tr><td>'+shuru+'</td></tr>').data('data',templet).appendTo($('#physical_selectitem_table'));
						tr.bind('click',function(){
							comp.add($(this).data('data'));
						});
					}
					input.data('oldTxt',inputTxt);
				},200);
			}
		});
	}
	/**创建变量组件*/
	function createVariableComps(){
		$('#physical_item').find('td div').each(function(i){
			var self = $(this);
			var parentsTr = self.parents('tr');
			var comp = comps.create(self);//创建变量组件
			comp.setValue('未见异常');
			comp.editArea.css('min-height','14px');
			comp.editArea.parents('td').unbind('click').bind('click',function(){
				comp.editArea.focus();
			});
			comp.editArea.unbind('click').bind('click',function(e){
				e.stopPropagation();
			});
			comp.bind('focus',function(){
				if(!activeEditTr){
					activeEditTr = parentsTr;
					activeEditTr.children(':eq(0)').addClass('onTitle');
					activeEditTr.children(':eq(1)').addClass('onEdit');
					activeEditTr.children(':eq(2)').addClass('onEdit');
				}else{
					activeEditTr.children(':eq(0)').removeClass('onTitle');
					activeEditTr.children(':eq(1)').removeClass('onEdit');
					activeEditTr.children(':eq(2)').removeClass('onEdit');
					activeEditTr = parentsTr;
					activeEditTr.children(':eq(0)').addClass('onTitle');
					activeEditTr.children(':eq(1)').addClass('onEdit');
					activeEditTr.children(':eq(2)').addClass('onEdit');
				}
				_focus(comp);
			});
			initRecord(comp);
			/**组件内容发生改变时，进行保存*/
			comp.contentChange(entryItemSaveOrUpdate);
		});
	//	comps.get(0).focus();
		
		/**组件获得焦点时的处理方法*/
		function _focus(comp){
			var data = comp.getData('data');
			if(comp.getValue()=='未见异常'){
				comp.setValue('');
			}
			var oldComp = $('#physical_title').data('comp');
			var imgPath = data.parent.child[data.index].intr;
			/*如果有画图，直接加载该画图*/
			var patient = $('body').data('patient');
			var records = patient.visit[0].records;
			var categoryid = data.parent.child[data.index].categoryid;
			$.each(records,function(){
				if(this.categoryId==categoryid){//记录已存在
					imgPath = this.picPath||imgPath;//如果存在画图结果，则加载该画图结果。否则，加载默认画图图片
					return false;
				}
			});
			if(!oldComp||(data.parent.categoryid!=oldComp.getData('data').parent.categoryid)){//不同项目间切换，如眼睑、眼位之间切换
				$('#physical_pinyin').attr('value','');
				$('#physical_title').text(data.parent.category);
				$('#physical_title').data('comp',comp);//将变量组件绑定到快速录入模板上，以便使用拼音查询时使用。
				$('#physical_selectitem_div').find('table').css("display","none");
				$("#physical_display_tree").tree({
	    			animate:false,
	    			method:"get",
	    			url:contextPath+"/publish/shurumoban/findNodeAndMoBanByPid.htm?id=0&categoryId="+data.parent.categoryid,
	    			onBeforeExpand:function(node,param){
	    				$("#physical_display_tree").tree("options").url=contextPath+"/publish/shurumoban/findNodeAndMoBanByPid.htm?id="+node.id+"&categoryId="+data.parent.categoryid;
	    			},	
	    			loadFilter:function(data){
	    				if(data.msg){
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
	    					if($.trim(comp.getValue())=='未见异常'){
								comp.setValue('');
							}
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
				dealPaint(imgPath);
			}else if(data.parent.categoryid==oldComp.getData('data').parent.categoryid
					&&data.index!=oldComp.getData('data').index){//左右眼之间切换，如眼睑 左眼，右眼之间相互点击
				$('#physical_title').text(data.parent.category);
				$('#physical_title').data('comp',comp);//将变量组件绑定到快速录入模板上，以便使用拼音查询时使用。
				$('#physical_selectitem_div').find('table').css("display","none");
				$("#physical_display_tree").tree({
	    			animate:false,
	    			method:"get",
	    			url:contextPath+"/publish/shurumoban/findNodeAndMoBanByPid.htm?id=0&categoryId="+data.parent.categoryid,
	    			onBeforeExpand:function(node,param){
	    				$("#physical_display_tree").tree("options").url=contextPath+"/publish/shurumoban/findNodeAndMoBanByPid.htm?id="+node.id+"&categoryId="+data.parent.categoryid;
	    			},	
	    			loadFilter:function(data){
	    				if(data.msg){
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
	    				if(node.attributes){
							if($.trim(comp.getValue())=='未见异常'){
								comp.setValue('');
							}
							comp.add(node.attributes);
						}
	    			}
				});
				dealPaint(imgPath);
			}
			/*处理画图*/
			function dealPaint(imgpath){
				if(imgpath){//有画图
					//如果画图面板为隐藏状态，则调整选项面板高度
					if($('#physical_paint').css('display')=='none'){
						var brotherHeight = $('#physical_title_h3').height()+$('#physical_search_table').height()+$('#physical_paint').height();
						$('#physical_selectitem_div').height($('#physical_right').height()-brotherHeight-12);
					}
					//显示画图面板
					$('#physical_paint').css({display:'block'});
					if(!flashObj){//首次加载flash文件
						var swf_id = 'physicalpaint';
						var physical_paint_content =  $('#physical_paint_content');
						_emr_paint(physical_paint_content,imgpath,
								{width:physical_paint_content.width(),height:physical_paint_content.height()},
								swf_id,"_emr_physicalpaint_saveCallBack",
								data.index==0?'OD':'OS',
								'45');
						if(timer){
							clearInterval(timer);
						}
						timer = setInterval(function(){//flash文件加载完毕，保存flash,并初始化画图工具按钮
							if('setPenColor' in window[swf_id]){
								flashObj = window[swf_id];
								clearInterval(timer);
								var btns = $('#physical_paint_btns a');
								/**放大*/
								$(btns[0]).click(function(){
									var parent = $('#'+swf_id).parent();
									if(!$(this).data('flag')||$(this).data('flag')=='zoom'){
										var oldWidth = parent.width();
										var oldHeight = parent.height();
										parent.width(parent.width()*rate);
										parent.height(parent.height()*rate);
										$('#'+swf_id).width(parent.width());
										$('#'+swf_id).height(parent.height());
										var left = parent.position().left-oldWidth*(rate-1)-8;
										var top = parent.position().top-oldHeight*(rate-1)-8;
										parent.css({position:'absolute',left:left+'px',top:top+'px',border:'4px solid #d2d2d2'});
										$(this).data('flag','revert');
										$(this).text('还原');
									}else{
										parent.width(parent.width()/rate);
										parent.height(parent.height()/rate);
										$('#'+swf_id).width(parent.width());
										$('#'+swf_id).height(parent.height());
										parent.css({position:'static',border:'0px solid #d2d2d2'});
										$(this).data('flag','zoom');
										$(this).text('放大');
									}
								});
								/**保存*/
								$(btns[1]).click(function(){
									var data = $('#physical_title').data('comp').getData('data');
									var param = {
										patientId:$('body').data('patient').id,
										regId:$('body').data('patient').visit[0].id,
										categoryId:data.parent.child[data.index].categoryid,
										eyes:data.index==0? 'OD':'OS'
									};
									flashObj.save(contextPath+paintSaveUrl,param);
								});
								/**重画*/
								$(btns[2]).click(function(){
									var data = $('#physical_title').data('comp').getData('data');
									var category = data.parent.child[data.index];
									var result = getJSONData(clearPaintUrl,{categoryId:category.categoryid,visitId:getCurrentPatient().visit[0].id,tag:Math.random()},'POST');
									if(result&&result.state){
										var img = category.intr;
										flashObj.loadPhoto({url:'..'+img,tip:data.index==0?'OD':'OS',tipWidth:'45'});
									}
								});
								
								/**初始化颜色选择按钮点击事件*/
								$('#physical_colorselector a span[name="selector"]').each(function(){
									$(this).click(function(){
										$('#physical_colorselector a span[name="selector"]').removeClass('selected');
										$(this).addClass('selected');
										flashObj.setPenColor($(this).css('background-color'));
									});
									if($(this).hasClass('selected')){
										$(this).click();
									}
								});
								
								/**start 设置画笔大小*/
								$('#physical_pensize_minus').click(function(){
									var pensize = parseInt($('#physical_pensize').val());
									if(pensize>1){
										$('#physical_pensize').val(pensize-1);
										$('#physical_pensize').data('oldSize',$('#physical_pensize').val());
										flashObj.setPenSize(pensize-1);
									}
								});
								$('#physical_pensize_add').click(function(){
									var pensize = parseInt($('#physical_pensize').val());
									$('#physical_pensize').val(pensize+1);
									$('#physical_pensize').data('oldSize',$('#physical_pensize').val());
									flashObj.setPenSize(pensize+1);
								});
								$('#physical_pensize').keyup(function(){
									var pensize = $('#physical_pensize').val();
									if(/^[1-9]\d*/.test(pensize)){
										$('#physical_pensize').data('oldSize',$('#physical_pensize').val());
										flashObj.setPenSize(parseInt(pensize));
									}
								});
								$('#physical_pensize').blur(function(){
									if($('#physical_pensize').data('oldSize')){
										$('#physical_pensize').val($('#physical_pensize').data('oldSize'));
									}else{
										$('#physical_pensize').val('1');
									}
								});
								/**end*/
							}
						}, 100);
					}else{//已经加载过flash，直接加载图片
						flashObj.clear();
						/*隐藏画图面板时，如果画图板处于放大状态，则需要将它调整为原始大小*/
						if($('#physical_paint_btns a:eq(0)').data('flag')
								&&$('#physical_paint_btns a:eq(0)').data('flag')!='zoom'){
							$('#physical_paint_btns a:eq(0)').data('flag','revert');
							$('#physical_paint_btns a:eq(0)').click();
						}
						flashObj.loadPhoto({url:'..'+imgpath,tip:data.index==0?'OD':'OS',tipWidth:'45'});
					}
				}else{
					if($('#physical_paint').css('display')=='block'){
						var brotherHeight = $('#physical_title_h3').height()+$('#physical_search_table').height();
						$('#physical_selectitem_div').height($('#physical_right').height()-brotherHeight-12);
						$('#physical_paint').css({display:'none'});
					}
				}
			}
		}
	}
	
	/**初始化体格检查项*/
	function initRecord(comp){
		var patient = $('body').data('patient');
		var visit = patient.visit[0];
		var records = visit.records;
		var data = comp.getData('data');
		var categoryid = data.parent.child[data.index].categoryid;
		$.each(records,function(){
			if(this.categoryId==categoryid){
				comp.setValue($.trim(this.jilu)?this.jilu:'未见异常');
				return;
			}
		});
	}

	/**
	 * 创建体格检查包含的项
	 */
	function createEntryItems(){
		var parent = $('#physical_item');
		if(entryItems){
			$('<tr><th style="width:60px;"></th><th>右眼</th><th>左眼</th></tr>').appendTo(parent);
			//加上视力--------------------------------------
			var tr_shili = $('<tr/>').appendTo(parent);
			$('<td style="color:#53b4b5;" class="entryTitle"/>').text("视力").appendTo(tr_shili);
			var td_r_shili=$('<td/>').appendTo(tr_shili);
			//在右眼视力td下面再加上table
			var table_r_shili=$('<table width="100%" height="100%" cellspacing=0 cellpadding=0/>').appendTo(td_r_shili);
			var table_r_shili_rl=$('<tr/>').appendTo(table_r_shili);
			var table_r_shili_rjz=$('<tr/>').appendTo(table_r_shili);
			var table_r_shili_rj=$('<tr/>').appendTo(table_r_shili);
			table_r_shili_rl.append($('<td style="width:25%;text-align:center;" />').text('裸眼视力')).append($('<td style="width:75%;text-align:center;" />').append($('<input id="rl" class="blur" style="text-align:center;" type="text">')));
			table_r_shili_rjz.append($('<td style="width:25%;text-align:center;" />').text('矫正视力')).append($('<td style="width:75%;text-align:center;" />').append($('<input id="rjz" class="blur" style="text-align:center;" type="text">')));
			table_r_shili_rj.append($('<td style="width:25%;text-align:center;" />').text('近视力')).append($('<td style="width:75%;text-align:center;" />').append($('<input id="rj" class="blur" style="text-align:center;" type="text">')));
			var td_l_shili=$('<td/>').appendTo(tr_shili);
			//在左右视力td下面再加上table
			var table_l_shili=$('<table width="100%" height="100%" cellspacing=0 cellpadding=0/>').appendTo(td_l_shili);
			var table_l_shili_ll=$('<tr/>').appendTo(table_l_shili);
			var table_l_shili_ljz=$('<tr/>').appendTo(table_l_shili);
			var table_l_shili_lj=$('<tr/>').appendTo(table_l_shili);
			table_l_shili_ll.append($('<td style="width:25%;text-align:center;" />').text('裸眼视力')).append($('<td style="width:75%;text-align:center;" />').append($('<input id="ll" class="blur" style="text-align:center;" type="text">')));
			table_l_shili_ljz.append($('<td style="width:25%;text-align:center;" />').text('矫正视力')).append($('<td style="width:75%;text-align:center;" />').append($('<input id="ljz" class="blur" style="text-align:center;" type="text">')));
			table_l_shili_lj.append($('<td style="width:25%;text-align:center;" />').text('近视力')).append($('<td style="width:75%;text-align:center;" />').append($('<input id="lj" class="blur" style="text-align:center;" type="text">')));
			//初始化视力如果有的话
			var vision = $('body').data('patient').vision;
			if(vision){
				$('#physical_item #rl').val(vision.rl?vision.rl:'');
				$('#physical_item #rj').val(vision.rj?vision.rj:'');
				$('#physical_item #rjz').val(vision.rjz?vision.rjz:'');
				$('#physical_item #ll').val(vision.ll?vision.ll:'');
				$('#physical_item #lj').val(vision.lj?vision.lj:'');
				$('#physical_item #ljz').val(vision.ljz?vision.ljz:'');
			}
			//绑定事件
			$('#physical_item #rl').bind('blur',saveOrUpdateVision);
			$('#physical_item #rj').bind('blur',saveOrUpdateVision);
			$('#physical_item #rjz').bind('blur',saveOrUpdateVision);
			$('#physical_item #ll').bind('blur',saveOrUpdateVision);
			$('#physical_item #lj').bind('blur',saveOrUpdateVision);
			$('#physical_item #ljz').bind('blur',saveOrUpdateVision);
			//加上视力结束-----------------------------
			
			for(var i=0,len=entryItems.length;i<len;i++){
				if(i==len-1){
					//倒数第1个的时候在这之前插入眼压
					var tr_yanya=$('<tr/>').appendTo(parent);
					$('<td style="color:#53b4b5;" class="entryTitle"/>').text("眼压").appendTo(tr_yanya);
					tr_yanya.append($('<td/>').append($('<input id="iop_od" class="blur" style="text-align:center;width:90%" type="text">')));
					tr_yanya.append($('<td/>').append($('<input id="iop_os" class="blur" style="text-align:center;width:90%" type="text">')));
					//眼压初始化
					var iop = $('body').data('patient').iop;
					if(iop){
						$('#physical_item #iop_od').val(iop.od?iop.od:'');
						$('#physical_item #iop_os').val(iop.os?iop.os:'');
					}
					/* 眼压绑定事件*/
					$('#physical_item #iop_od').bind('blur',saveOrUpdateIop);
					$('#physical_item #iop_os').bind('blur',saveOrUpdateIop);
				}
				var entryItem = entryItems[i];
				var tr = $('<tr/>').appendTo(parent);
				$('<td style="color:#53b4b5;" class="entryTitle"/>').text(entryItem.category).appendTo(tr);
				for(var j=0;j<entryItem.child.length;j++){
					var itemchild = entryItem.child[j];
					var td = $('<td/>').appendTo(tr);
					$('<div/>').data('data',{parent:entryItem,index:j}).appendTo(td);
				}
			}
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
	}
	
	/**保存或者更新体格检查录入项内容*/
	function entryItemSaveOrUpdate(oldValue,value){
		//获取患者信息
		var patient = $('body').data('patient');
		//获取录入项信息
		var entryItemData = $('#physical_title').data('comp').getData('data');
		var categoryid = entryItemData.parent.child[entryItemData.index].categoryid;
		var record;
		//判断录入项是否已经存在于就诊记录中。如果已存在，则表示更新；否则，保存录入项结果
		$.each(patient.visit[0].records,function(){
			if(this.categoryId==categoryid){
				record = this;
				return;
			}
		});
		//提交的数据
		var param = {
			id:record?record.id:'',
			jiuzhen_id:patient.visit[0].id,
			category_id:categoryid,
			jilu:value
		};
		var resultData = getJSONData(entryItemSaveUrl,param,'POST');
		if(resultData.obj){
			if(!record){//保存记录，并将该记录添加到患者就诊信息中。
				record = {};
				record.categoryId = categoryid;
				record.id = resultData.obj;
				record.jilu = value;
				patient.visit[0].records.push(record);
			}else{//更新记录，同时更新患者就诊信息中对应的记录
				record.id = resultData.obj;
				record.jilu = value;
			}
		}
	}
	
	/**清空当前患者数据*/
	function clear(){
		$.each(comps.store,function(){
			this.setValue('未见异常');
			initRecord(this);
		});
		comps.get(0).focus();
	}
	
	/**保存画图结果后的处理函数*/
	window._emr_physicalpaint_saveCallBack = function(data,swfId){
		data = data.replace(/\\/g,'/');
		var d = eval('('+data+')');
		var data = $('#physical_title').data('comp').getData('data');
		window[swfId].loadPhoto({url:'..'+d.obj.pictruePath,tip:data.index==0?'OD':'OS',tipWidth:'45'});
		
		var patient = $('body').data('patient');
		var categoryid = data.parent.child[data.index].categoryid;
		var record;
		$.each(patient.visit[0].records,function(){
			if(this.categoryId==categoryid){
				record = this;
				return false;
			}
		});
		//提交的数据
		var param = {
			id:record?record.id:'',
			jiuzhen_id:patient.visit[0].id,
			category_id:categoryid,
			picPath:d.obj.pictruePath,
			jilu:record?record.jilu:''
		};
		var resultData = getJSONData(entryItemSaveUrl,param,'POST');
		if(resultData.obj){
			if(!record){//保存记录，并将该记录添加到患者就诊信息中。
				record = {};
				record.categoryId = categoryid;
				record.id = resultData.obj;
				record.jilu = '';
				record.picPath = d.obj.pictruePath;
				patient.visit[0].records.push(record);
			}else{
				record.picPath = d.obj.pictruePath;
			}
		}
	};
	
	return physical;
}

