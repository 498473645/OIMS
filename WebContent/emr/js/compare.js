/**对比*/
function _emr_recordCompare(){
	var compare_data_url = '/publish/emr/getcomparedata.htm';
	var selectRecords = $('#vistListDiv').find('input[type="checkbox"]:checked');
	var count = selectRecords.length;
	if(count<1){
		$.oimsAlert('请至少选择一条记录');
		return;
	}
	var visits = new Array();
	var visitIds = new Array();
	$.each(selectRecords,function(){
		visits.push($(this).parents('li').data('visit'));
		visitIds.push(visits[visits.length-1].id);
	});
	
	var container = $('<div id="comparecontainer" class="emr_duibi00" style="overflow-y:auto"/>').appendTo('body');
	container.css({height:505});
	container.oimsDialog({
		title:'对比',
		width:800,
		height:550,
		locked:true
	});
	container.parent().attr('class','opencontentvs');
	/**就诊日期*/
	var timeDiv = $('<div class="emr_duibitimediv"/>').appendTo(container);
	var timeTable = $('<table class="vstime" style="width:100%;border-collapse:collapse;"/>').appendTo(timeDiv);
	var timeTr = $('<tr/>').appendTo(timeTable);
	$('<td class="timew" style="width:10%;"/>').text('时间').appendTo(timeTr);
	var width = 90/visits.length;
	var date = new Array();
	$.each(visits,function(){
		$('<td class="timetdw" style="width:'+width+'%"/>').text(formatDate(this.caozuoTime.time)).appendTo(timeTr);
		date.push(this.date);
	});
	var contentGDDiv = $('<div class="emr_duibigd"/>').appendTo(container);
	var contentDiv = $('<div width="100%"/>').appendTo(contentGDDiv);
	var data = getJSONData(compare_data_url,{visitIds:visitIds.toString()},'POST');
	/**问诊*/
	_emr_createInquriyCompareTable(contentDiv,data[0],width);
	/**体格检查*/
	_emr_createPhysicalCompareTable(contentDiv,data[1],width);
	/**诊断*/
	_emr_createResultCompareTable(contentDiv,data[2],width);
//	/**检查*/
//	_emr_createInspectCompareTable(contentDiv,data[2],width,visits.length);
	
//	/**处方*/
//	_emr_createResultCompareTable(contentDiv,data[4],width);
//	/**视力*/
//	_emr_createVisionCompareTable(contentDiv,data[6],date);
	
	timeDiv.css({position:'fixed',width:container[0].clientWidth});
	timeDiv.next().css({'margin-top':timeDiv.outerHeight()});
	container.scroll(function(){
		var top = timeDiv.offset().top+timeDiv.outerHeight();
		var headerHeight = $('#physical_header').outerHeight();
		var table = $('#physical_header').next();
		var tablePosition = table.offset().top+table.outerHeight();
		var headerPosition = $('#physical_header').offset().top+headerHeight;
		if($('#physical_header').offset().top<top
				&&$('#physical_header').css('position')!='fixed'
				&&tablePosition>top+headerHeight){
			$('#physical_header').next().css({'margin-top':$('#physical_header').outerHeight()});
			$('#physical_header').css({position:'fixed',top:top,width:container[0].clientWidth});
		}else if($('#physical_header').css('position')=='fixed'){
			if(table.offset().top>headerPosition||tablePosition<=headerPosition){
				$('#physical_header').css({position:'static'});
				$('#physical_header').next().css({'margin-top':0});
			}
		}
	});
}

/**
 * 创建对比标题
 * @param contentDiv 对应容器
 * @param title 标题
 */
function _emr_createCompareTitle(contentDiv,title){
	var div = $('<div class="vsmenu" style="cursor:pointer;"/>').appendTo(contentDiv).click(function(){
		var span = div.find('span');
		if(span.hasClass('vsopen')){
			span.removeClass('vsopen').addClass('vscolse');
			$(this).next().hide();
		}else{
			span.removeClass('vscolse').addClass('vsopen');
			$(this).next().show();
		}
		$('.emr_duibitimediv').css({width:$('#comparecontainer')[0].clientWidth});
	});
	$('<span class="vsopen"/>').appendTo(div);
	div.append(title);
}

/**
 * 创建问诊对比
 * @param contentDiv
 * @param data
 * @param width
 */
function _emr_createInquriyCompareTable(contentDiv,data,width){
	_emr_createCompareTitle(contentDiv,data.category);
	var table = $('<table style="width:100%;border-collapse:collapse;" class="opentable"/>').appendTo(contentDiv);
	$.each(data.items,function(){
		var tr = $('<tr/>').appendTo(table);
		$('<td class="opentd" style="width:10%;"/>').text(this.category).appendTo(tr);
		$.each(this.values,function(){
			$('<td style="width:'+width+'%"/>').text(this[0]).appendTo(tr);
		});
	});
}
/**
 * 创建体格检查对比
 * @param contentDiv
 * @param data
 * @param width
 */
function _emr_createPhysicalCompareTable(contentDiv,data,width){
	_emr_createCompareTitle(contentDiv,data.category);
	var div = $('<div/>').appendTo(contentDiv);
	var headerDiv = $('<div  id="physical_header"/>').appendTo(div);
	var headerTable = $('<table style="width:100%;border-collapse:collapse;" class="opentable"/>').appendTo(headerDiv);
	var table = $('<table style="width:100%;border-collapse:collapse;" class="opentable"/>').appendTo(div);
	var tr = $('<tr><td class="opentd" style="width:10%;"></td></tr>').appendTo(headerTable);
	$.each(data.items,function(){
		$.each(this.items,function(){
			$.each(this.values,function(){
				$('<td style="width:'+(width/2)+'%;background-color:#e8e8e8;">右眼</td><td style="width:'+(width/2)+'%;background-color:#e8e8e8;">左眼</td>').appendTo(tr);
			});
			return false;
		});
		return false;
	});
	$.each(data.items,function(){
		var tr = $('<tr/>').appendTo(table);
		$('<td class="opentd" style="width:10%;"/>').text(this.category).appendTo(tr);
		$.each(this.items,function(){
			$.each(this.values,function(){
				$('<td style="width:'+(width/2)+'%"/>').text(this[0]).appendTo(tr);
			});
		});
	});
}

/**
 * 创建检查对比
 * @param contentDiv
 * @param data
 * @param width
 * @param count
 */
function _emr_createInspectCompareTable(contentDiv,data,width,count){
	_emr_createCompareTitle(contentDiv,data.category);
	var table = $('<table style="width:100%;border-collapse:collapse;" class="opentable"/>').appendTo(contentDiv);
	$.each(data.items,function(){
		var tr = $('<tr/>').appendTo(table);
		$('<td class="opentd" style="width:10%;"/>').text(this.category).appendTo(tr);
		$.each(this.values,function(){
			var td = $('<td style="width:'+width+'%"/>').appendTo(tr);
			$.each(this,function(){
				$('<a style="color:blue;margin:0px 5px;float:left;"/>').text(this[1]).appendTo(td);
			});
		});
	});
}

/**
 * 创建诊断、处方对比
 * @param contentDiv
 * @param data
 * @param width
 * @param count
 */
function _emr_createResultCompareTable(contentDiv,data,width,count){
	_emr_createCompareTitle(contentDiv,data.category);
	var table = $('<table style="width:100%;border-collapse:collapse;" class="opentable"/>').appendTo(contentDiv);
	$.each(data.items,function(){
		var tr = $('<tr/>').appendTo(table);
		$('<td class="opentd" style="width:10%;"/>').text(this.category).appendTo(tr);
		$.each(this.values,function(){
			var td = $('<td style="width:'+width+'%"/>').appendTo(tr);
			$.each(this,function(){
				$('<span style="margin:0px 5px;float:left;"/>').text(this[0]).appendTo(td);
				$('<br/>').appendTo(td);
			});
		});
	});
}

function _emr_createVisionCompareTable(contentDiv,data,date){
	_emr_createCompareTitle(contentDiv,'视力');
	var table = $('<table style="width:100%;border-collapse:collapse;" class="opentable"/>').appendTo(contentDiv);
	var tr = $('<tr/>').appendTo(table);
	$('<td class="opentd" style="width:10%;"/>').text('视力').appendTo(tr);
	var td = $('<td/>').appendTo(tr);
	$('<div id="visionLine"/>').appendTo(td);
	var nakedR = new Array();//裸眼视力
	var nakedL = new Array();
	var redressR = new Array();//矫正视力
	var redressL = new Array();
	var myopiaR = new Array();//近视力
	var myopiaL = new Array();
	$.each(data.values,function(){
		nakedR.push(this[0]);
		nakedL.push(this[1]);
		redressR.push(this[2]);
		redressL.push(this[3]);
		myopiaR.push(this[4]);
		myopiaL.push(this[5]);
	});
	
	$('#visionLine').highcharts({
		chart:{
			type:'line',
			height:350
		},
		title:{text:''},
		xAxis:{categories:date},
		yAxis:{title:{text:''},lineWidth:1},
		plotOptions: {
             line: {
                 dataLabels: {
                     enabled: true
                 },
                 enableMouseTracking: false
             }
         },
         legend: {
             layout: 'vertical',
             align: 'right',
             verticalAlign: 'middle',
             borderWidth: 0
        },
        credits:{enabled:false},
		series:[{name:'裸-OD',data:nakedR,color:'#cc3333'},
		        {name:'裸-OS',data:nakedL,color:'#cc3333'},
		        {name:'矫正-OD',data:redressR,color:'#3300ff'},
		        {name:'矫正-OS',data:redressL,color:'#3300ff'},
		        {name:'近-OD',data:myopiaR,color:'#33cc00'},
		        {name:'近-OS',data:myopiaL,color:'#33cc00'}
				]
	});
}

/**
 * 格式化对比数据
 * @param data 根据就诊id获取的就诊记录数据
 */
function _emr_formatCompareData(data){
	
}