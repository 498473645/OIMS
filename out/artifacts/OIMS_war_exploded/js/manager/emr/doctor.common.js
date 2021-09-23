var _emr_tabpanel = ['inquiry','physical','inspection','diagnosis','prescription'];
var _emr_paintswf_url = '/swf/mypaint.swf';
var _emr_paint_photo_saveUrl = '';
var _emr_paint_photoType = 1;
var _emr_getquantity_url = '/publish/emr/getquantity.htm';
var _emr_getprintdata_url = '/publish/emr/getprintdata.htm';
var _emr_input_itemsUrl = '/publish/emr/getitemsbyparentid.htm';
var _emr_report_templet_url = '/publish/baogaomoban/getBaogaoMobanById.htm';
var _emr_getreportdata_url = '/publish/emr/getreporttempletdata.htm';
var _emr_getbumenbyid_url = '/publish/bumen/findBuMenByID.htm';
var _emr_prescription_url='/publish/emr/savePrescription.htm';
var find_submit_medicines='/publish/emr/findSubmitMedicines.htm';
var delete_prescription_ids='/publish/emr/deletePrescriptionIds.htm';
var getInspectPhotoUrl = '/publish/emr/getInspectPhoto.htm';
var _emr_inquiry_categoryId = 30001;
var _emr_physical_categoryId = 30002;
var suifang_time={'1':'1日后','2':'2日后','3':'3日后','4':'4日后','5':'5日后','7':'一周后','14':'两周后','21':'三周后','28':'四周后','56':'八周后','84':'十二周后','182':'半年后','365':'一年后'};
var orderlist_url = '/publish/emr/getorderlist.htm';


/*************************************************************************************/
/**
 * 根据减少的宽度调整元素的宽度
 * @param objArr 需要调整的元素数组
 * @param cut 宽度减少量
 */
function _emr_changeWidthByReduce(objArr,cut){
	var totalWidth = 0 ;
	$.each(objArr,function(){
		if($(this).attr('fixed')==undefined)
			totalWidth += $(this).width();
	});
	
	$.each(objArr,function(){
		var rate = $(this).width()/totalWidth;
		if($(this).attr('fixed')==undefined)
			$(this).width((totalWidth-cut)*rate);
		$(this).trigger('myresize');
	});
}

/**
 * 根据增加的宽度调整元素的宽度
 * @param objArr 需要调整的元素数组
 * @param cut 宽度减少量
 */
function _emr_changeWidthByAdd(objArr,add){
	var totalWidth = 0 ;
	$.each(objArr,function(){
		if($(this).attr('fixed')==undefined)
			totalWidth += $(this).width();
	});
	
	$.each(objArr,function(){
		var rate = $(this).width()/totalWidth;
		if($(this).attr('fixed')==undefined)
			$(this).width((totalWidth+add)*rate);
		$(this).trigger('myresize');
	});
}

/**
 * flash画图插件
 * @param target 显示画图插件的元素
 * @param imagePath 图片路径
 * @param dimension{width:宽度,height:高度} 尺寸
 */
var _emr_paint_flash;
function _emr_paint(target,imagePath,dimension,id,callBack,tip,tipWidth){
	importJS("/js/jquery.swfobject.1-1-1.js");
	if(!dimension){
		dimension = {width:'100%',height:'100%'};
	}else{
		if(!dimension.width) dimension['width'] = '100%';
		if(!dimension.height) dimension['height'] = '100%';
	}
	$('<div/>').attr('id',id+'_div').width(dimension.width).height(dimension.height).appendTo(target).flash({
		swf : contextPath + _emr_paintswf_url+'?random=' + Math.random(),
		id : id,
		width : $('#'+id+'_div').width(),
		height : $('#'+id+'_div').height(),
		flashvars : {
			url:'..'+imagePath,
			tip:tip || '',
			tipWidth:tipWidth||'45',
			saveCallBackFunc:callBack
		},
		paremeters : {
			allowScriptAccess : "sameDomain",
			quality : "high",
			wmode : "transparent"
		}
	});
}
var _emr_dataCache = function(){
	var properties = {};
	var cache = {};
	properties.getData = function(url,param,type,pinyin){
		var key = url+JSON.stringify(param);
		if(!(escape(key) in cache)){//变量中不存在该url，则向后台发送请求
			param['tag'] = Math.random();
			cache[escape(key)] = getJSONData(url,param,type);
		}
		return cache[escape(key)];
	};
	properties.search = function(url,param,type,pinyin){
		var data = properties.getData(url,param,type);
		param['txt'] = pinyin;
		var result = new Array();
		if(data){
			for(var i=0,len=data.length;i<len;i++){
				var item = data[i];
				//精确查找
				if(item.pinyin.toLowerCase().indexOf(param.txt.toLowerCase())!=-1){
					result.push(item);
				}
				//模糊查找
//				var index = 0;
//				for(var j=0,len1=param.txt.length;j<len1;j++){
//					var c = param.txt.charAt(j);
//					var index1 = item.pinyin.indexOf(c,index);
//					if(index1!=-1&&index1>=index){
//						index = index1;
//					}else{
//						break;
//					}
//					if(j==len1-1){
//						result.push(item);
//					}
//				}
			}
		}
		return result;
	};
	return properties;
}();

/**
 * 计算年龄
 */
function _emr_calculteAge(birthday){
	birthday = birthday.replace(/\-/g,'/');
	var currentDate = new Date();
	var birthday = new Date(birthday);
	var age = currentDate.getFullYear()-birthday.getFullYear();
	if(currentDate.getMonth()-birthday.getMonth()<0){
		age = age - 1;
	}else if(currentDate.getMonth()-birthday.getMonth()==0){
		if(currentDate.getDate()-birthday.getDate()<0){
			age = age - 1;
		}
	}
	return age;
}

/**
 * 设置流式布局中a元素的宽度，以保持多个a标签导致换行时，每行结尾的a标签能够对齐
 * @param sortbtnArr
 */
function _emr_initSortBtn(container,sortbtnArr){
	var sortBtnPanelWidth = container[0].clientWidth-1;
	var sortBtnPanelContainer = $('<div style="overflow:hidden;"/>').height(container.height()).appendTo(container);
	var sortBtnPanel = $('<div/>').appendTo(sortBtnPanelContainer);
	$(sortbtnArr).each(function(){
		$(this).appendTo(sortBtnPanel);
	});
	var totalHeight = 0;
	if(sortBtnPanelWidth<=0) return;
	var data = $(sortbtnArr[0]).parent().data(sortBtnPanelWidth+'');
	if(!data){
		data = {};
		var totalWidth = 0;
		var total = 0;
		for(var i=0,len=sortbtnArr.length;i<len;i++){
			var btn = $(sortbtnArr[i]);
			totalWidth +=btn.outerWidth()+10;
			total++;
			if(i<len-1){
				if(totalWidth+$(sortbtnArr[i+1]).outerWidth()+10>sortBtnPanelWidth){
					var lackWidth = sortBtnPanelWidth-totalWidth;
					if(lackWidth>=0&&total>1){
						var residue = lackWidth%total;
						var avgWidth = (lackWidth-residue)/total;
						for(var j=i+1-total;j<=i;j++){
							$(sortbtnArr[j]).width($(sortbtnArr[j]).width()+avgWidth);
							data[j] = $(sortbtnArr[j]).width();
						}
						for(var j=i-residue+1;j<i;j++){
							$(sortbtnArr[j]).width($(sortbtnArr[j]).width()+1);
							data[j] = $(sortbtnArr[j]).width();
						}
					}else if(total==1){
						$(sortbtnArr[i]).width($(sortbtnArr[i]).width()+lackWidth);
						data[i] = $(sortbtnArr[i]).width();
					}else if(lackWidth<0){//为负数，只存在一种情况：只有一个a标签，并且该a标签宽度大于父容器宽度
						$(sortbtnArr[i]).width($(sortbtnArr[i]).width()+lackWidth);
						data[i] = $(sortbtnArr[i]).width();
					}
					totalWidth = 0;
					total = 0;
					totalHeight +=btn.outerHeight()+10;
				}
			}else{
				var lackWidth = sortBtnPanelWidth-totalWidth;
				if(lackWidth<0){
					$(sortbtnArr[i]).width($(sortbtnArr[i]).width()+lackWidth);
					data[i] = $(sortbtnArr[i]).width();
				}
				totalHeight +=btn.outerHeight()+10;
			}
			data['height'] = totalHeight;
			sortBtnPanel.data(sortBtnPanelWidth+'',data);
		}
	}else{
		for(var i=0,len=sortbtnArr.length;i<len;i++){
			$(sortbtnArr[i]).width(data[i]);
		}
	}
	var temp = sortBtnPanel.height()-sortBtnPanel.data(sortBtnPanelWidth+'').height;
	if(temp>0&&sortBtnPanel[0].clientHeight>sortBtnPanel.parent()[0].clientHeight){
		var marginTop = sortBtnPanel.css('margin-top');
		var marginTop = marginTop.substring(0, marginTop.indexOf("px"));
		sortBtnPanel.css('margin-top',(parseInt(marginTop)+temp)+'px');
	}
	sortBtnPanel.height(sortBtnPanel.data(sortBtnPanelWidth+'').height);
	if(sortBtnPanel.height()>sortBtnPanel.parent().height()){
		var up = $('<div class="up1" style="height:10px;overflow:hidden;cursor:pointer;"></div>').insertBefore(sortBtnPanelContainer);
		var down = $('<div class="down1" style="height:10px;overflow:hidden;cursor:pointer;"></div>').insertAfter(sortBtnPanelContainer);
		sortBtnPanelContainer.height(container.height()-up.height()-down.height());
		_emr_mousescroll(sortBtnPanelContainer,sortBtnPanel,23);
		up.click(function(){
			_emr_mousescroll_changePostion(sortBtnPanelContainer,sortBtnPanel,23,-1);
		});
		down.click(function(){
			_emr_mousescroll_changePostion(sortBtnPanelContainer,sortBtnPanel,23,1);
		});
	}else{
		sortBtnPanel.parent().prev().remove();
		sortBtnPanel.parent().next().remove();
		sortBtnPanelContainer.height(container.height());
	}
}

function _emr_printRecord(callBack){
	if($('#printFrame').length) $('#printFrame').remove();
	var printFrame = $('<iframe id="printFrame" name="printFrame" style="display:none;"/>').appendTo('body');
	var patient = getCurrentPatient();
	var data = getJSONData(_emr_getprintdata_url,{visitId:patient.visit[0].id},'POST');//患者所有需要打印的数据
	var html = getHtmlContent('print_history');
	html = html.replace('<!--treatmentoftype-->',patient.visit[0].zhenbie==2?'门诊':'急诊');
	html = html.replace('<!--page-->',"page1");
	html = html.replace('<!--date-->',patient.visit[0].date.substring(0,10));
	html = html.replace('<!--medicalNo-->',patient.visit[0].id);
	html = html.replace('<!--name-->',patient.xingming);
	html = html.replace('<!--sex-->',patient.xingbie?'男':'女');
	html = html.replace('<!--age-->',_emr_calculteAge(patient.shengri));
	html = html.replace('<!-- charge_type -->',patient.charge_type);
	
	//TODO 需要填充
	html = html.replace('<!--description-->',findResult(30100,data.records));//主诉
	html = html.replace('<!--pass-->',findResult(30103,data.records));//既往史
	html = html.replace('<!--physical-->',makePhysicalStr(data));//检查（视力、体格检查）
	html = html.replace('<!--diagnose-->',makeDiagnoseStr(data));//诊断
	html = html.replace('<!--hanlde-->',makeHandleStr(data));//处置
	var win = printFrame[0].contentWindow;
	win.document.write(html);
	win.document.close();
	if(typeof callBack=='function'){
		callBack();
		doPrintPreview(win.document,'B5(JIS)',patient.visit[0].id);
		
	}else if(typeof callBack=='object'){
		doPrintPreview(win.document,'B5(JIS)',patient.visit[0].id);
	}
	
	function makeHandleStr(data){
		var handleStr = '';
		$.each(data.inspect,function(){
			handleStr += this.inspectName+';';
		});
		$.each(data.handle,function(){
			handleStr += this.item_name+';';
		});
		$.each(data.prescription,function(){
			handleStr += '('+this.drugName+'  '+this.drugSpec+this.firmId+'  '+this.amount+this.units+' '+this.dosage+this.dosageUnits+''+this.administration+' '+this.frequency+');';
		});
		if(data.followup){
			handleStr+=data.followup.content?'注意事项:'+data.followup.content+";":'';
			handleStr+=data.followup.followed_time?'下次随访时间:'+data.followup.followed_time+'':'';
		}
		return handleStr;
	}
	
	function makeDiagnoseStr(data){
		var diagnoseStr = '';
		$.each(data.diagnosis,function(){
			diagnoseStr += this.zdflname+';';
		});
		return diagnoseStr;
	}
	
	function makePhysicalStr(data){
		var records=data.records;
		var vision = data.vision;
		var visionStr = '';
		if(vision.lr){
			visionStr += '右眼裸眼视力：'+vision.lr+';';
		}
		if(vision.jzr){
			visionStr += '右眼矫正视力：'+vision.jzr+';';
		}
		if(vision.jr){
			visionStr += '右眼近视力：'+vision.jr+';';
		}
		if(vision.ll){
			visionStr += '左眼裸眼视力：'+vision.ll+';';
		}
		if(vision.jzl){
			visionStr += '左眼矫正视力：'+vision.jzl+';';
		}
		if(vision.jl){
			visionStr += '左眼近视力：'+vision.jl+';';
		}
		var physicalitems = getJSONData(_emr_input_itemsUrl,{categoryId:_emr_physical_categoryId,tag:Math.random()},'POST');
		var physicalStr = '';
		$.each(physicalitems,function(i){
			var item = this.child;
			var rStr = findPhysicalResult(item[0].categoryid,records);
			var lStr = findPhysicalResult(item[1].categoryid,records);
			if(rStr){
				physicalStr += '右眼'+this.category+'：'+rStr+';';
			}
			if(lStr){
				physicalStr += '左眼'+this.category+'：'+lStr+';';
			}
		});
		return visionStr + physicalStr;
	}
	
	function findPhysicalResult(categoryid,records){
		for(var i=0;i<records.length;i++){
			if(categoryid==records[i].categoryId){
				return records[i].jilu;
			}
		}
		return '';
	}
	
	function findResult(categoryid,records){
		for(var i=0;i<records.length;i++){
			if(categoryid==records[i].categoryId){
				return records[i].jilu;
			}
		}
		return '';
	}
}

/**
 * 鼠标滚轮滚动显示超出容器部分内容的方法
 * @param outer 外部容器
 * @param inner 内部容器
 */
function _emr_mousescroll(outer,inner,height) {
	importJS("/jquery_mousewheel/jquery.mousewheel.js");
	//绑定就诊列表滚动事件
	$(outer).mousewheel(function(event, delta, deltaX, deltaY) {
		_emr_mousescroll_changePostion(outer,inner,height,delta);
	});
}

function _emr_mousescroll_changePostion(outer,inner,height,delta){
	var outerHeight = $(outer).innerHeight();
	var innerHeight = $(inner).innerHeight();
	height = height||10;
	if (innerHeight > outerHeight) {
		if (delta > 0) {
			var h = $(inner).css("margin-top");
			var a = h.substring(0, h.indexOf("px"));
			if (parseInt(a) != 0) {
				var v = 0;
				if (a > -height) {
					v = 0;
				} else {
					v = parseInt(a) + height;
				}
				var t = v + "px";
				$(inner).css("margin-top", t);
			} else if (parseInt(a) >= 0) {
				var t = 0 + "px";
				$(inner).css("margin-top", t);
			}
		} else if (delta < 0) {
			var h = $(inner).css("margin-top");
			var a = h.substring(0, h.indexOf("px"));
			var chah = innerHeight - outerHeight;
			chah = Math.abs(chah);
			a = Math.abs(a);
			var v = 0;
			if (chah - a >= height) {
				v = -a - height;
			} else if (chah - a < height) {
				v = -a - (chah - a);
			}
			var t = v + "px";
			$(inner).css("margin-top", t);
		}
	}
	return false; // prevent default
}

/**
 * div出现滚动条，调整表头宽度
 * @param headerDiv 表头
 * @param tableDiv 表格
 */
function _emr_headerResize(headerDiv,tableDiv){
	if($(tableDiv)[0].clientWidth<$(tableDiv).width()){
		$(headerDiv).width($(tableDiv)[0].clientWidth);
	}else{
		$(headerDiv).width($(tableDiv).width());
	}
}

/**
 * 初始化患者人数信息
 * 后期扩展：采用轮询方式，不断刷新人数信息
 * @param container 容器
 */
function _emr_initQuantityInfo(container){
	$('#quantityInfoDiv').remove();
	var html = $('<div id="quantityInfoDiv" class="sum"/>').appendTo(container);
	$('<strong>今日眼科挂号总数：</strong><span>[<font class="red">0</font>]人,</span>').appendTo(html);
	$('<strong>已诊：</strong><span>[<font class="red">0</font>]人,</span>').appendTo(html);
	$('<strong>待诊：</strong><span>[<font class="green">0</font>]人,</span>').appendTo(html);
	$('<strong>您今日接诊患者总数：</strong><span>[<font class="red">0</font>]人，</span>').appendTo(html);
	$('<strong>待诊患者：</strong><span>[<font class="red">0</font>]人,</span>').appendTo(html);
	$('<strong>复诊患者：</strong><span>[<font class="blue">0</font>]人,</span>').appendTo(html);
	$('<strong>已过号患者：</strong><span>[<font class="green">0</font>]人,</span>').appendTo(html);
	$('<strong>已完成患者：</strong><span>[<font class="green">0</font>]人</span>').appendTo(html);
	var data = getJSONData(_emr_getquantity_url,{gonghao:currentDoctorGonghao,tag:Math.random()},'POST');
	if(data){
		$('font',html).each(function(i){
			$(this).text(data[i]);
		});
	}
}

function _tableComp(options){
	var tableComp = {
		options:options,
		addRow:addRow,
		getAllRows:getAllRows,
		getSelectedRows:getSelectedRows,
		beforeDelete:'',
		deleteSelectedRows:deleteSelectedRows,
		deleteSelectedPrescriptionRows:deleteSelectedPrescriptionRows,
		setTotal:setTotal,
		getTotal:getTotal,
		submitPrescriptionItems:submitPrescriptionItems,
		beforeSubmitPrescription:beforeSubmitPrescription
	};
	var compDiv = $('<div/>').css({height:options.parent.height(),width:'100%'}).appendTo(options.parent);
	var tableWidth = (compDiv.width()-window.scrollbarWidth)*100/compDiv.width()+'%';
	var headerDiv = $('<div style="border-top:1px solid #d2d2d2;border-bottom:1px solid #d2d2d2;"/>').appendTo(compDiv);
	var headerTable = $('<table class="resultTable" style="width:'+tableWidth+';"/>').appendTo(headerDiv);
	var popDiv;
	var frequency_select=["bid","q2h","qd","qd皮试","qid","qn","qod","sos","tid","需要时","一天5次","q1h","q1/2h","q3h","q4h","q6h","q8h","q?h","qm","晨服"];
	var num_select=[1,2,3,4,5,6,7,8,9,10,15,20,25,50,250,0.1,0.2,0.3,0.4,0.5,1.5];
	var unit_select=["#","g","ml","包","料","瓶","支","粒","mg","片","滴"];
	var usage_select=["im","ivgtt","ou","po","激光用","外用","od","os","结膜下","球旁注射","漱口","饭前口服","直肠给药","舌下含","滴鼻","颞浅动","术前用","滴眼","造影用"];
	var total_select=[1,2,3,4,5,6,7,8,9,10,15,20,30,40,50,100,150,200];
	if(options.columns){
		var headerTr = $('<tr/>').appendTo(headerTable);
		var th = $('<th/>').css({width:options.columns[0].width,'text-align':options.columns[0].align}).appendTo(headerTr);
		th.css("cursor","default");
		$('<input type="checkbox">').appendTo(th).click(function(){
			if($(this).attr('checked')){
				contentTable.find('tr').find('td:eq(0) input[type="checkbox"]').attr('checked','checked');
				contentTable.find('tr').addClass('t3');
			}else{
				contentTable.find('tr').find('td:eq(0) input[type="checkbox"]:checked').removeAttr('checked');
				contentTable.find('tr').removeClass('t3');
			}
		});
		$.each(options.columns,function(i){
			if(i>0)
				$('<th style="border-right:1px solid #d2d2d2;"/>').css({width:this.width,'text-align':this.align}).text(this.name).appendTo(headerTr);
		});
	}
	var contentDiv = $('<div style="overflow-y:auto;margin-bottom:5px;border-bottom:1px solid #d2d2d2;background-color:#fff;"/>').appendTo(compDiv);
	var contentTable = $('<table class="resultTable" id="selectedItemslist" style="width:'+tableWidth+';"/>').appendTo(contentDiv);
	var footerDiv;
	if(!options.showTotal||options.showTotal!='false'){
		footerDiv = $('<div style="height:25px;width:100%;"/>').appendTo(compDiv);
		$('<span style="float:right;margin-right:5px;">共计：<span>0.0</span>元</span>').appendTo(footerDiv);
	}
	var contentDivMaxHeight = compDiv.height()-headerDiv.height()-(footerDiv?footerDiv.height():0)-1;
	contentDiv.css('height',contentDivMaxHeight);
	
	function addRow(columns){
		
		var tr = $('<tr/>').appendTo(contentTable).data('rowData',columns);
		var td = $('<td/>').css({width:options.columns[0].width,'text-align':options.columns[0].align}).appendTo(tr);
		$('<input type="checkbox" value="">').appendTo(td).click(function(e){
			if($(this).parent().parent().hasClass('t3'))
				$(this).parent().parent().removeClass('t3');
			else
				$(this).parent().parent().addClass('t3');
			e.stopPropagation();
		});
		$.each(options.columns,function(i){
			if(i>0) {
				var td = $('<td/>').css({width:this.width,'text-align':this.align}).html(columns[i]).appendTo(tr);
				td.css("height","16px").css("cursor","default");
				//ary.push(td.css({"edit":this.edit}));
				if(this.edit==true){
					td.css("position","relative");
					//alert(td.width());
					correctTd($(".resultTable tr").find("th:eq("+i+")"),td);
				}else{
					console.dir(columns[i]);
				}
			}
		});
		function correctTd(obj,td){
			var input=$("<input style='width:"+($(obj).width()-18)+"px;margin-left:0px'/>").appendTo($(td)).click(function(){return false;});
			var select=$("<select />").appendTo($(td)).click(function(){return false;});
			select.css({"width":(input.width()+18)+"px","height":(input.height()+3)+"px","clip":"rect(auto auto auto "+input.width()+"px)","position":"absolute"});
			if($(obj).index()==2){
				$.each(num_select,function(i){
					if(i==0){
						input.val(this);
						select.append($("<option selected='selected'>"+this+"</option>"));
					}
					else{
						select.append($("<option>"+this+"</option>"));
					}
				});
			}
			else if($(obj).index()==3){
				$.each(unit_select,function(i){
					if(i==0){
						input.val(this);
						select.append($("<option selected='selected'>"+this+"</option>"));
					}
					else{
						select.append($("<option>"+this+"</option>"));
					}
				});
			}
			else if($(obj).index()==4){
				$.each(usage_select,function(i){
					if(i==0){
						input.val(this);
						select.append($("<option selected='selected'>"+this+"</option>"));
					}
					else{
						select.append($("<option>"+this+"</option>"));
					}
				});
			}
			else if($(obj).index()==5){
				$.each(frequency_select,function(i){
					if(i==0){
						input.val(this);
						select.append($("<option selected='selected'>"+this+"</option>"));
					}
					else{
						select.append($("<option>"+this+"</option>"));
					}
				});
			}
			else if($(obj).index()==7){
				
				$.each(total_select,function(i){
					if(i==0){
						input.val(this);
						select.append($("<option selected='selected'>"+this+"</option>"));
					}
					else{
						select.append($("<option>"+this+"</option>"));
					}
				});
				select.change(function(){
					
					var money=0;
					input.parent().parent().find("td:last").text(input.parent().parent().find("td:eq(6)").text()*$(this).find("option:selected").text());
					$.each(input.parent().parent().parent().find("tr"),function(){
						money+=parseInt($(this).find("td:last").text());
						//把改变了的小计列的值重新记录到rowData中
						if(input.parent().parent().index()==$(this).index()){
							var columns=$(this).data("rowData");
							columns[columns.length-1]=parseInt($(this).find("td:last").text());
							$(this).data("rowData",columns);
						}
						});
					setTotal(money);
				});
			}
			select.offset(input.offset());
			select.change(function(){input.val(select.val());});
					if($(td).index()==7){
						var later=null;
					input.keyup(function(){
						if(later){clearTimeout(later);}
						later=setTimeout(function(){
							var money=0;
							input.parent().parent().find("td:last").text(input.parent().parent().find("td:eq(6)").text()*input.val());
							$.each(input.parent().parent().parent().find("tr"),function(){
								money+=parseInt($(this).find("td:last").text());
								//把改变了的小计列的值重新记录到rowData中
								if(input.parent().parent().index()==$(this).index()){
									var columns=$(this).data("rowData");
									columns[columns.length-1]=parseInt($(this).find("td:last").text());
									$(this).data("rowData",columns);
								}
								});
							
							setTotal(money);
						},100);
					});
					}
		}
		if(contentDiv.height()<contentTable[0].clientHeight){
			contentTable.css('width','100%');
			tr.prev().find('td').css("border-bottom","1px solid #d2d2d2");
			tr.find('td').css("border-bottom","0px solid #d2d2d2");
			contentDiv[0].scrollTop = contentDiv[0].scrollHeight;
		}else{
			contentTable.css('width',tableWidth);
		}
		tr.click(function(){
			var checkbox = $(this).find('td:eq(0) input[type="checkbox"]');
			if(checkbox.attr('checked')){
				checkbox.removeAttr('checked');
				$(this).removeClass('t3');
			}else{
				checkbox.attr('checked','checked');
				$(this).addClass('t3');
			}
		}).mouseover(function(){
			$(this).addClass('t2');
		}).mouseout(function(){
			$(this).removeClass('t2');
		});
		setTotal(getTotal()+columns[options.totalIndex]);
	}
	
	function deleteSelectedPrescriptionRows(obj){
			if(obj.find("td:eq(9)").text()=='未提交'){
				setTotal(getTotal()-obj.data('rowData')[options.totalIndex]);
				obj.remove();
					}
			if(contentDiv.height()>contentTable[0].clientHeight){
				contentTable.css('width',tableWidth);
				contentTable.find('tr:last').find('td').css("border-bottom","1px solid #d2d2d2");
			}else{
				contentTable.css('width','100%');
				contentTable.find('tr:last').find('td').css("border-bottom","0px solid #d2d2d2");
			}
	}
function deleteSelectedRows(){
		
		var mark = true;
		if(typeof(tableComp.beforeDelete)=='function'){
			var selectedRows = getSelectedRows();
			mark = tableComp.beforeDelete(selectedRows);
		}
		if(mark){
			contentTable.find('tr').each(function(){
				if($(this).find('td:eq(0) input[type="checkbox"]:checked').length==1){
					setTotal(getTotal()-$(this).data('rowData')[options.totalIndex]);
					$(this).remove();
				}
			});
			if(contentDiv.height()>contentTable[0].clientHeight){
				contentTable.css('width',tableWidth);
				contentTable.find('tr:last').find('td').css("border-bottom","1px solid #d2d2d2");
			}else{
				contentTable.css('width','100%');
				contentTable.find('tr:last').find('td').css("border-bottom","0px solid #d2d2d2");
			}
		}
	}
	
	
	function getAllRows(){
		var rows = new Array();
		contentTable.find('tr').each(function(){
			rows.push({data:$(this).data('rowData'),index:$(this).index()});
		});
		return rows;
	}
	
	function getSelectedRows(){
		var rows = new Array();
		contentTable.find('tr').each(function(){
			if($(this).find('td:eq(0) input[type="checkbox"]:checked').length==1){
				rows.push({data:$(this).data('rowData'),index:$(this).index()});
			}
		});
		return rows;
	}
	
	function setTotal(total){
		if(footerDiv)
			footerDiv.find('span span').text(total);
	}
	
	function getTotal(total){
		if(footerDiv)
			return parseFloat(footerDiv.find('span span').text());
		return null;
	}
	//处方提交前验证
	function beforeSubmitPrescription(){
		
	}
	//提交
	function submitPrescriptionItems(){
		//选出所有checkbox核实了的条目
		
		var checkboxs=$("#selectedItemslist tr").find("td:eq(0)").find("input:checked");
		if(!checkboxs.length){
			$.oimsAlert("请至少选择一个条目");
			return ;
		}
		else{
			//提交被选中的tr的哪些字段
			var param={};
			param["recipe"]=JSON.stringify({jiuzhenId:$("body").data("patient").visit[0].id});
			param["prescription"]=[];
			var flag=4;
			$.each(checkboxs,function(){
				var tr=$(this).parent().parent();
				if(tr.find("td:eq(9)").text()=="已提交"){
					flag=0;
					return false;
				}
				if(tr.find("td:eq(9)").text()=="作废"){
					flag=5;
					return false;
				}
				if(isNaN(tr.find("td:eq(7)").find("input").val())){
					flag=1;
					return false;
				}
				if(!isNaN(tr.find("td:eq(7)").find("input").val())&&tr.find("td:eq(7)").find("input").val()<=0){
					flag=1;
					return false;
				}
				if(!isNaN(tr.find("td:eq(7)").find("input").val())&&tr.find("td:eq(7)").find("input").val()>0&&tr.find("td:eq(7)").find("input").val()>tr.data("rowData")[0].limitedQuantity){
					flag=3;
					return false;
				}
				if(isNaN(tr.find("td:eq(2)").find("input").val())){
					flag=2;
					return false;
				}
				if(!isNaN(tr.find("td:eq(2)").find("input").val())&&tr.find("td:eq(2)").find("input").val()<=0){
					flag=2;
					return false;
				}
				var obj={drugId:tr.data("rowData")[0].id,num:tr.find("td:eq(2)").find("input").val(),unit:tr.find("td:eq(3)").find("input").val(),medicalUsage:tr.find("td:eq(4)").find("input").val(),frequency:tr.find("td:eq(5)").find("input").val(),drugTotal:tr.find("td:eq(7)").find("input").val(),subTotal:tr.find("td:last").text()};
				param["prescription"].push(obj);
			});
			param["prescription"]=JSON.stringify(param["prescription"]);
			//判断是否可以提交（需验证）
			switch(flag){
			case 0:$.oimsError("有的条目已经被提交过,请选择未被提交的条目");break;
			case 1:$.oimsError("总量不是合理数字");break;
			case 2:$.oimsError("每次用量不是合理数字");break;
			case 3:$.oimsError("超过限量");break;
			case 4:submit_items();break;
			case 5:$.oimsError("作废的条目不能重复提交");break;
			}
			function submit_items(){
				var data=getJSONData(_emr_prescription_url,param,"POST");
				if(data.state==1){
					$.each(checkboxs,function(i){
						var tr=$(this).parent().parent();
						tr.find("td:eq(9)").text("已提交");
						//并且将下拉列表框去掉变成只读文本
						tr.find("td:eq(2)").text(tr.find("td:eq(2)").find("input").val()).css("text-align","center");
						tr.find("td:eq(3)").text(tr.find("td:eq(3)").find("input").val()).css("text-align","center");
						tr.find("td:eq(4)").text(tr.find("td:eq(4)").find("input").val()).css("text-align","center");
						tr.find("td:eq(5)").text(tr.find("td:eq(5)").find("input").val()).css("text-align","center");
						tr.find("td:eq(7)").text(tr.find("td:eq(7)").find("input").val()).css("text-align","center");
						//将返回的药品信息id赋值给相应条目
						var ids=data.obj;
						tr.data("submit_prescription_id",ids[i]);
					});
					$.oimsSucc("提交成功");
				}
				else{
					$.oimsError("提交失败");
				}
			}
		}
	}
	
	return tableComp;
}

/**
 * 拼装病历：问诊，体格检查，处方，诊断
 */
function makeRecord(data){
	var html = '';
	var records = data.records;
	/*视力*/
	var vision = data.vision;
	/*眼压*/
	var iop = data.iop;
	/*随访*/
	var sf=data.sf;
	/*问诊*/
	var inquriyitems = getJSONData(_emr_input_itemsUrl,{categoryId:_emr_inquiry_categoryId,tag:Math.random()},'POST');
	var inquriyhtml = '<table class="recordInquriyTable">';
	$.each(inquriyitems,function(i){
		if(i==0){
			inquriyhtml += '<tr><th class="cell" style="width:25%;">'+this.category+'</th>';
			inquriyhtml += '<td class="cell txtleft">'+findResult(this.categoryid,records)+'</td></tr>';
		}else{
			inquriyhtml += '<tr><th class="cell" style="width:25%;">'+this.category+'</th>';
			inquriyhtml += '<td class="cell txtleft">'+findResult(this.categoryid,records)+'</td></tr>';
		}
	});
	inquriyhtml +='</table>';
	html += inquriyhtml;
	
	/*体格检查*/
	var physicalhtml = '<table class="recordInquriyTable">';
	physicalhtml +='<tr><th class="cell" style="width:10%;border-right:0px;"></th>';
	physicalhtml +='<th class="cell" style="width:20%;border-left:0px;"></th>';
	physicalhtml +='<th class="cell" style="width:35%;">右眼</th>';
	physicalhtml +='<th class="cell" style="">左眼</th></tr>';
	
	
	
	var physicalitems = getJSONData(_emr_input_itemsUrl,{categoryId:_emr_physical_categoryId,tag:Math.random()},'POST');
	physicalhtml += '<tr><th class="cell" rowspan="<!--体格检查-->" style="text-align:center;font-size: 14px;">专<br><br>科<br><br>检<br><br>查</th>';
	physicalhtml +='<th class="cell"  style="text-align:center;font-size:14px;">视力</th>';
	if(!vision){
		physicalhtml +='<td class="cell txtleft"></td>';
		physicalhtml +='<td class="cell txtleft"></td></tr>';
	}
	else{
		//右眼
		physicalhtml +='<td class="cell txtleft">裸眼视力:'+(vision.lr?getShiLiDisplay(vision.lr):'未查')+'<br>近视力:'+(vision.jr ? getShiLiDisplay(vision.jr) : '未查')+'<br>矫正视力:'+(vision.jzr ? getShiLiDisplay(vision.jzr) : '未查')+'<br>ETDRs:'+(vision.redtrs ? vision.redtrs : '未查')+'</td>';
		//左眼
		physicalhtml +='<td class="cell txtleft">裸眼视力:'+(vision.ll?getShiLiDisplay(vision.ll):'未查')+'<br>近视力:'+(vision.jl ? getShiLiDisplay(vision.jl) : '未查')+'<br>矫正视力:'+(vision.jzl ? getShiLiDisplay(vision.jzl) : '未查')+'<br>ETDRs:'+(vision.ledtrs ? vision.ledtrs : '未查')+'</td>';
	}
	$.each(physicalitems,function(i){
			if(i==0){
				physicalhtml +='<tr><th class="cell">眼压</th>';
				if(!iop){
					physicalhtml += '<td class="cell txtleft"></td>';
					physicalhtml += '<td class="cell txtleft"></td></tr>';
				}else{
					var methodOD='';
					switch(iop.methodOD){
					case 1:methodOD="非接触";break;
					case 2:methodOD="回弹式";break;
					case 3:methodOD="修式";break;
					case 4:methodOD="Goldman";break;
					}
					var methodOS="";
					switch(iop.methodOD){
					case 1:methodOS="非接触";break;
					case 2:methodOS="回弹式";break;
					case 3:methodOS="修式";break;
					case 4:methodOS="Goldman";break;
					}
					physicalhtml += '<td class="cell txtleft">'+(iop.refuse?'患者拒查':(iop.od?(iop.od+"mmHg("+methodOD+")"):((iop.beizhu.split(',')[0]=='null'||!iop.beizhu)?'':iop.beizhu.split(',')[0])))+'</td>';
					physicalhtml += '<td class="cell txtleft">'+(iop.refuse?'患者拒查':(iop.os?(iop.os+"mmHg("+methodOS+")"):((iop.beizhu.split(',')[1]=='null'||!iop.beizhu)?'':iop.beizhu.split(',')[1])))+'</td></tr>';
				}
			}
			var item = this.child;
			physicalhtml += '<tr><th class="cell">'+this.category+'</th>';
			physicalhtml += '<td class="cell txtleft" id="yanjian_r">'+findPhysicalResult(item[0].categoryid,records).replace('见图示','')+(divPhysicalPic(this,records,0)?divPhysicalPic(this,records,0):"")+'</td>';
			physicalhtml += '<td class="cell txtleft" id="yanjian_l">'+findPhysicalResult(item[1].categoryid,records).replace('见图示','')+(divPhysicalPic(this,records,1)?divPhysicalPic(this,records,1):"")+'</td></tr>';
	});
//	//rowspan计算，另外加的两个一个是视力一个是眼压
	physicalhtml=physicalhtml.replace("<!--体格检查-->",(physicalitems.length+2))/*+((picTotal%2)?Math.ceil(picTotal/2):(picTotal/2)))*/;
//	physicalhtml=physicalhtml.replace("<!--图示-->",(picTotal%2)?Math.ceil(picTotal/2):(picTotal/2));
	physicalhtml += '</table>';
	html += physicalhtml;
	
	/**医嘱*/
	var adviceHtml = '<table class="recordInquriyTable">';
	/*诊断*/
	adviceHtml += '<tr><th class="cell" style="width: 10%;">诊断</th><td  class="cell textleft">';
	$.each(data.diagnosis,function(){
		adviceHtml += '<a class="item" style="color:none;">'+(this.eye?this.eye:'')+this.zdflname+(parseInt(this.confirmed)==0?'?':'')+'；</a>';
	});
	adviceHtml += '</td></tr>';
	
	adviceHtml += '</table>';
	/*检查*/
	adviceHtml += '<table class="recordInquriyTable"><tr><th class="cell" style="width:10%" rowspan=3>检查</th>';
	adviceHtml +='<th class="cell" style="width:20%">特检</th><td class="cell txtleft">';
	$.each(data.inspect.special,function(){
		if(this.inspectName=="视力检查"){
			return true;
		}
		if(this.biaoshi==56){
			adviceHtml += '<a class="itemlinkover" value="'+this.inspectId+'" onclick="parent.window.iframeToFather('+this.inspectId+');">'+this.inspectName+'</a>';
			adviceHtml=addPDFBaoGao(adviceHtml,this.inspectId);
		}
		else{
			adviceHtml+='<span class="itemlink">'+this.inspectName+'</span>';
		}
	});	 
	adviceHtml +='</td></tr>';
	adviceHtml +='<tr><th class="cell">科外</th><td class="cell txtleft">';
	adviceHtml += data.inspect.hospital;
	adviceHtml +='</td></tr>';
	adviceHtml +='<tr><th class="cell">化验</th><td class="cell txtleft">';
	adviceHtml += data.inspect.lis;
	adviceHtml +='</td></tr>';
	adviceHtml +='</table>';
	/*处方*/
	adviceHtml +='<table class="recordInquriyTable">';
	adviceHtml += '<tr><th class="cell" style="width: 10%;">处方</th><td class="cell textleft" style="text-align:left;padding-left:2px;">';
	adviceHtml += data.prescription;
	adviceHtml += '</td></tr>';
	/*治疗*/
	var st='';
	switch(parseInt(data.specialTreat)){
	case 1:st='住院治疗';break;
	case 2:st='日间手术';break;
	case 3:st='门诊手术';break;
	}
	adviceHtml += '<tr><th class="cell" style="width: 10%;">治疗</th><td class="cell textleft" style="text-align:left;padding-left:2px;">';
	adviceHtml += (data.inspect.treat?(data.inspect.treat+';'):'')+st;
	adviceHtml += '</td></tr>';
	/*随访*/
	adviceHtml += '<tr><th class="cell" style="width: 10%;">随访</th><td class="cell textleft" style="text-align:left;padding-left:2px;">';
	if(sf){
		adviceHtml +=sf.zhuyi?(sf.zhuyi):'';
		if(sf.yyrq){
			var g=getDaysEmr(formatDate(new Date()),formatDate(sf.yyrq.time));
			var value;
			$.each(suifang_time,function(key,val){
				if(parseInt(key)==parseInt(g)){
					value=val;
					return false;
				}
			});
			adviceHtml+='请于'+/*formatDate(obj.yyrq.time)*/value+'来本院复查；&nbsp&nbsp&nbsp';
		}
//		adviceHtml +=((sf.yyrq?('复诊时间:'+formatDate(sf.yyrq.time)+"；&nbsp&nbsp&nbsp"):'')+(sf.zhuyi?(sf.zhuyi):''));
	}
	adviceHtml += '</td></tr>';
	adviceHtml += '</table>';
	html += adviceHtml;
	return html;
	function findResult(categoryid,records){
		for(var i=0;i<records.length;i++){
			if(categoryid==records[i].categoryId){
				return records[i].jilu;
			}
		}
		return '';
	}
	
	function findPhysicalResult(categoryid,records){
		for(var i=0;i<records.length;i++){
			if(categoryid==records[i].categoryId){
				return records[i].jilu?records[i].jilu:'未见异常';
			}
		}
		return '未见异常';
	}
	
	function findPaint(categoryid,records){
		for(var i=0;i<records.length;i++){
			if(categoryid==records[i].categoryId){
				return records[i].picPath;
			}
		}
		return '';
	}
	function divPhysicalPic(physicalitem,records,i){
		var picPath = findPaint(physicalitem.child[i].categoryid,records);
		var pic="";
		if(picPath){
			pic += '<div class="paint" style="float:'+/*(picNum==1?'left':'right')+*/'">';
			pic += '<img style="height:150px;" src="..'+picPath+'"/>';
			pic += '<span style="position:absolute;left:0px;top:0px;">'+physicalitem.category+(i==0?'OD':'OS')+'</span></div>';
		}
		return pic;
	}
	function addPDFBaoGao(adviceHtml,jcdid){
		pdfFag = false;
		reportFag = false;
		// 判断是不是存在PDF报告
		var url_getPDFListByJcd = "/publish/jcd/getJcdPDFList.htm";
		var data_getPDFListByJcd = getJSONData(url_getPDFListByJcd, {
			jcdid : jcdid,
			tag : Math.random()
		}, "post");
		if (data_getPDFListByJcd.state == 1 && data_getPDFListByJcd.obj.length > 0) {
			pdfFag = true;
		}
		// 判断是不是存在系统中出的报告
		var url_getReportListByJcd = "/publish/jcd/getJcdByJcd.htm";
		var data_getReportListByJcd = getJSONData(url_getReportListByJcd, {
			id : jcdid,
			tag : Math.random()
		}, "post");
		if (data_getReportListByJcd.state == 1
				&& data_getReportListByJcd.obj.state == 1) {
			reportFag = true;
		}
		if (pdfFag || reportFag) { // 表示存在报告
			var temp=bingliyulan_clickReportButton(adviceHtml,jcdid,data_getPDFListByJcd,data_getReportListByJcd);
			eyePDFBaoGao_jw.push({jcdid:jcdid,data_getPDFListByJcd:data_getPDFListByJcd,data_getReportListByJcd:data_getReportListByJcd});
			return temp;
		}
		return adviceHtml;
	}
	function bingliyulan_clickReportButton(adviceHtml,jcdid,data_getPDFListByJcd,data_getReportListByJcd){
		adviceHtml+='<a id=\'spe'+jcdid+'\' style="width:15;height:20;float:left" ><span class="report" style="width :15px;height :20px;display :inline-block"></span></a>';
		return adviceHtml;
	}
	
	
}
function jcdPicture(inspectId){
	var div=$("<div />");
	var divPic=$('<div class="studyShowTag" style="height: 291px; background-color: #ffffff; overflow-x: hidden;overflow-y:auto; white-space: nowrap;">');
	var divPic_list=$("<div id='diagnose_photo'/>");
	var div_inspect_list=$('<div id="diagnose_inspect_list" class="checklist" >');
	var ul_list=$('<ul style="height: 100px; white-space: nowrap;"></ul>');
	div.append(divPic.append(divPic_list)).append(div_inspect_list.append(ul_list));
	div.oimsDialog({
		title : "图片",
		width : 603,
		height : 450,
		drag : false,
		locked :true,
		winType : 4,
		button : null
	});
	
	displaySmallPic(inspectId);
	inspectListLoad();

}
function  inspectListLoad(){
	//console.log(JSON.stringify($('body').data('patient').visit[0]));
	var inspects = getJSONData(orderlist_url,{visit:$('body').data('patient').visit[0].id,tag:Math.random()},'POST');
	
	if(inspects){
		var ul = $('#diagnose_inspect_list ul').empty();
		for(var i=0;i<inspects.length;i++){
			var inspect = inspects[i];
			if(inspect.categoryId==8) continue;//常规检查不显示
			var icon = getStateIcon(inspect.biaoshi);
			var li = $('<li class="emr_jcdlistpointer"/>').attr({title:icon.tip+'——'+inspect.inspectName,id:inspect.inspectId}).text(inspect.inspectName).appendTo(ul);
			$('<span/>').addClass(icon.icon).appendTo(li);
			if(inspect.biaoshi==56){
				li.click(function(){
					displaySmallPic($(this).attr("id"));
				});}
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
}
function displaySmallPic(inspectId){
	$("#diagnose_photo").html("");
	var photos = getJSONData(getInspectPhotoUrl,{inspectId:inspectId,tag:Math.random()},'POST');
	var gallery = $("<div class='oimsslide-gallery'/>").appendTo($("#diagnose_photo"));
	var flag = false;
	var oldWidth = gallery.width();
	for(var i=0;i<photos.length;i++){
		var photo = photos[i];
		var href = photo.path.replace(/\\/g,'/');
		var suffix = href.substring(href.lastIndexOf('.')+1).toUpperCase();
		var a = $('<a onclick="return hs.expand(this)" class="oimsslide"  />').appendTo(gallery);
		a.attr('style','float:left;');
		if(oldWidth>gallery.width()){
			if(!flag){
				flag = true;
				oldWidth = gallery.width();
				var as = gallery.find('a');
				$.each(as,function(){
					$(this).width($(this).width()-window.scrollbarWidth/3);
				});
			}
		}
		a.width(200).height(165);
		if(suffix=="JPG"||suffix=="JPEG"||suffix=="GIF"||suffix=="PNG"){//图片
			a.attr('href',contextPath+'/'+href.replace('thumb/',''));
			if(flag){
				a.width(a.width()-window.scrollbarWidth/3);
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

function makeInspectHtml(data,win){
	var patient = $('body').data('patient');
	$.each(data.inspect,function(){
		var inspect = this;
		var reportData = getJSONData(_emr_getreportdata_url,{inspectId:this.inspectId,tag:Math.random()},'POST');
		if(reportData){
			var templet = getJSONData(_emr_report_templet_url,{id:reportData.mobanId,tag:Math.random()},'POST').obj;
			var depart = getJSONData(_emr_getbumenbyid_url,{id:templet.bumenId,tag:Math.random()},'POST').obj;
			var moban= $(templet.moban,win.document.body).appendTo(win.document.body);
			$('#suffererName',moban).text(patient.xingming);
			$('#sex',moban).text(patient.xingbie ? '男':'女');
			$('#age',moban).text(_emr_calculteAge(patient.shengri));
			$('#caseNumber',moban).text(patient.binglihao);
			$('#department',moban).text(depart.bmmc);
			$('#eyeSex',moban).text(inspect.eyeSort);
			$('#reportDate',moban).text(reportData.bgTime);
			$('#reportDoctor',moban).text(reportData.bgys);
			$('#jckj',moban).text(reportData.jckj);
			$('#jcts',moban).text(reportData.jcts);
			$('.class_img',moban).each(function(i){
				var parent = $(this).text('');
				$('<img/>',win.document.body).attr('src',reportData.pic[i].picUrl).attr({height:200,width:250}).appendTo(parent);
			});
		}
	});
}

function getCurrentPatient(){
	return $('body').data('patient');
}

/**解决小数相加出现多位小数的问题*/
function _emr_addNum(num1,num2,fractionDigits){
	var sq1,sq2,m;
	try{
		sq1 = num1.toString().split('.')[1].length;
	}catch(e){
		sq1 = 0;
	}
	try{
		sq2 = num2.toString().split('.')[1].length;
	}catch(e){
		sq2 = 0;
	}
	m = Math.pow(10,Math.max(sq1,sq2));
	var result = ((num1*m+num2*m)/m).toFixed(fractionDigits?fractionDigits:2);
	return result;
}
/**解决小数相减出现多位小数的问题*/
function _emr_minus(num1,num2,fractionDigits){
	var sq1,sq2,m;
	try{
		sq1 = num1.toString().split('.')[1].length;
	}catch(e){
		sq1 = 0;
	}
	try{
		sq2 = num2.toString().split('.')[1].length;
	}catch(e){
		sq2 = 0;
	}
	m = Math.pow(10,Math.max(sq1,sq2));
	return ((num1*m-num2*m)/m).toFixed(fractionDigits?fractionDigits:2);
}

/**
 * 
 */
function iframeToFather(inspectId){
	jcdPictureEMR(inspectId);

	function jcdPictureEMR(inspectId){
	var div=$("<div />");
	
	var divPic=$('<div class="studyShowTag" style="height:420px; background-color: #ffffff; overflow-x: hidden;overflow-y:auto; white-space: nowrap;">');
	var divPic_list=$("<div id='diagnose_photo'/>");
//	var div_inspect_list=$('<div id="diagnose_inspect_list" class="checklist" >');
//	var ul_list=$('<ul style="height: 100px; white-space: nowrap;"></ul>');
	div.append(divPic.append(divPic_list));//.append(div_inspect_list.append(ul_list));
	div.oimsDialog({
		title : "图片",
		width : 603,
		height : 450,
		drag : false,
		locked :true,
		winType : 4,
		button : null
	});
	
	displaySmallPic(inspectId);
//	inspectListLoad();

}
function displaySmallPic(inspectId,currentV){
	$("#diagnose_photo").html("");
	var photos = getJSONData(getInspectPhotoUrl,{inspectId:inspectId,tag:Math.random()},'POST');
	var gallery = $("<div class='oimsslide-gallery'/>").appendTo($("#diagnose_photo"));
	var flag = false;
	var oldWidth = gallery.width();
	for(var i=0;i<photos.length;i++){
		var photo = photos[i];
		var href = photo.path.replace(/\\/g,'/');
		var suffix = href.substring(href.lastIndexOf('.')+1).toUpperCase();
		var a = $('<a onclick="return hs.expand(this)" class="oimsslide"  />').appendTo(gallery);
		a.attr('style','float:left;');
		if(oldWidth>gallery.width()){
			if(!flag){
				flag = true;
				oldWidth = gallery.width();
				var as = gallery.find('a');
				$.each(as,function(){
					$(this).width($(this).width()-window.scrollbarWidth/3);
				});
			}
		}
		a.width(199).height(165);
		if(suffix=="JPG"||suffix=="JPEG"||suffix=="GIF"||suffix=="PNG"){//图片
			a.attr('href',contextPath+'/'+href.replace('thumb/',''));
			if(flag){
				a.width(a.width()-window.scrollbarWidth/3);
			}
			var img = $('<img src="../'+href+'"/ style="width:'+a.width()+'px;height:100%;">').appendTo(a);
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
function  inspectListLoad(){
	var inspects = getJSONData(orderlist_url,{visit:currentVisit.id,tag:Math.random()},'POST');
	if(inspects){
		var ul = $('#diagnose_inspect_list ul').empty();
		for(var i=0;i<inspects.length;i++){
			var inspect = inspects[i];
			if(inspect.categoryId==8) continue;//常规检查不显示
			if(inspect.inspectName=='视力检查')continue;
			var icon = getStateIcon(inspect.biaoshi);
			var li = $('<li class="emr_jcdlistpointer"/>').attr({title:icon.tip+'——'+inspect.inspectName,id:inspect.inspectId}).text(inspect.inspectName).appendTo(ul);
			$('<span/>').addClass(icon.icon).appendTo(li);
			if(inspect.biaoshi==56){
				li.click(function(){
					displaySmallPic($(this).attr("id"));
				});}
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
}

}