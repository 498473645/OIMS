var _emr_caseTabId = ['diagnosis','inquiry','physical','billing','handle'];
/**
 * 标签页显示切换
 * @param obj
 */
function _emr_showCaseTab(obj){
	var obj = $(obj);
	if(!obj.hasClass('tab_show')){
		obj.parent().children().each(function(i,o){
			if($(o).hasClass('tab_show')){
				$('#'+_emr_caseTabId[i]).css({'display':'none'});
				$(o).removeClass('tab_show');
				return;
			}
		});
		obj.addClass('tab_show');
		var index = obj.index();
		if(_emr_caseTabId[index]=='diagnosis'){
//			$('#showcheckorder')[0].click();
		}else{
			_emr__emr_hideCheckOrder_();
		}
		if($('#'+_emr_caseTabId[index]).length==0){
			_emr_getHtml(_emr_caseTabId[index]);
		}else{
			$('#'+_emr_caseTabId[index]).css({'display':'block'});
		}
	}
}

/**
 * 根据id获取页面文本,并显示到页面中
 * @param id
 */
function _emr_getHtml(id){
	$.ajax({
		url:'../demo/doctor/html/'+id+'.html',
		type:'POST',
		async:false,
		success:function(data){
			$(data).appendTo('#main');
			//如果是处理界面那么初始化药物过敏信息
			if(id=="handle"){
				for(var i=0;i<allergicHistoryData.length;i++){
					var tr=$("<tr height='20 ' />").appendTo($("#allergichistory"));
					$('<td width="90%"/>').text(allergicHistoryData[i].name).appendTo(tr).focus(function(){_emr_enableInput(this);});
					var td = $('<td width="10%"/>').appendTo(tr);
					$('<a>—</a>').appendTo(td).click(function(){
						$(this).parent().parent().remove();
					});
				}
			}
			$('#'+id).css({'display':'block'});
			$('#'+id).width($('#main').width());
			$('#'+id).height($('#main').height()-$('#maintab').outerHeight()-6);
		}
	});
}

var _emr_inquery_textarea = ['main_txt','now_txt','old_txt','allergies_txt','family_txt'];
/**
 * 根据不同名称显示问诊部分的模板信息
 * @param obj
 */
function _emr_inquiry(obj){
	var index = $(obj).parent().index();
	var title = $(obj).prev().text();
	$('#inquiry_title').text(title);
	$('#inquiry_position').attr('value',index);
	$('#inquiry_context').empty();
	$.each(_emr_inquiry_temp[_emr_inquery_textarea[index]],function(){
		$('<a/>').text(this).appendTo('#inquiry_context').click(function(){
			_emr_inquiry_setValue(this);
		});
		
	});
}
/**
 * 填充问诊信息
 * @param obj
 */
function _emr_inquiry_setValue(obj){
	var txt = $.trim($(obj).text());
	var index = $('#inquiry_position').attr('value');
	var textarea = $('#'+_emr_inquery_textarea[index]);
	var context = textarea.val();
	context = $.trim(context) ? context+',':'';
	textarea.val(context+txt);
}

/**
 * 选择体格检查结果并填充
 * @author caoyuan
 */
var _emr_physical_textarea=['_emr_eyelid','_emr_conjunctival','_emr_scleral','_emr_eyes','_emr_corneal','_emr_anterior','_emr_iris','_emr_pupil','_emr_lens','_emr_vitreous','_emr_fundus'];
function _emr_physical(obj){
	var index=$(obj).parent().parent().index()-1;
	if($('#physical_position').attr('value')&&$('#physical_position').attr('value')==index){
		return;
	}
	var title = $($(obj).parent().parent().children()[0]).text();
	$('#physical_position').attr('value',index);
	$('#physical_context').empty();
	var data = _emr_physical_temp[_emr_physical_textarea[index]];
	$.each(data,function(i,o){
		if(i=='flag'){
			$('#picture').empty();
			if(o==1){
				showPaintDialog(data.imgs);
			}
			$('#physical_title').html(title);
			return;
		}else if(i=='data'){
			$.each(o,function(){
				$('<a/>').text(this).appendTo('#physical_context').click(function(){
					var oldTxt = $.trim($(obj).val());
					var txt = $(this).text();
					var context = $.trim(oldTxt) ? oldTxt+',':'';
					$(obj).val(context+txt);
				});
			});
		}
	});
}

var _emr_deal_textarea = ['_emr_medical_order','_emr_handle','_emr_medical'];
/**
 * 显示处理填充模板
 * @param obj
 */
function _emr_deal(obj){
	var index = $(obj).parent().index();
	var title = $(obj).prev().text();
	$('#deal_title').text(title);
	$('#deal_position').attr('value',index);
	$('#deal_content').empty();
	$.each(_emr_deal_temp[_emr_deal_textarea[index]],function(){
		$('<a/>').text(this).appendTo('#deal_content').click(function(){
			var oldTxt = $.trim($(obj).val());
			var txt = $(this).text();
			var context = $.trim(oldTxt) ? oldTxt+',':'';
			$(obj).val(context+txt);
		});
	});
}

/**
 * 显示药品信息
 */
function _emr_showMedical(){
	$("#deal_content").html("");
	$('#deal_title').text('药品');
	$('#deal_position').attr('value','');
	$("<table width='100%' height='100%' id='medicaltoallergichistory'></table>").appendTo($("#deal_content"));
	$('#medicaltoallergichistory').empty();
	
	$.each(_emr_deal_temp[_emr_deal_textarea[2]],function(){
		
		var data = this;
		
		var tr=$("<tr />").appendTo($("#medicaltoallergichistory"));
		var td1=$("<td />").appendTo(tr);
		$('<a/>').text(data.commodityname).appendTo(td1).click(function(){
			//判断一下是否有过敏史，并且提示
			$("#medicalinfo").html("");
			$("#medicalinfo").val(data.title);
			var allergicHistory/*过敏史*/=$("#allergichistory tr");/*medical_allergies_content*/
			var haveallergicmedical=false;
			for(var i=0;i<allergicHistory.length;i++){
				
				//如果有过敏的药物那么再你同意添加的时候我添加那不同意我就不添加
				if(data.name==$(allergicHistory[i]).find("td:eq(0)").text()){
					haveallergicmedical=true;
					var b=confirm(data.commodityname+"和"+$(allergicHistory[i]).find("td:eq(0)").text()+"是一种药"+"吃这个他会挂的，让他挂么？");
					if(b)
					{
						
					_emr_addmedical(data);
					break;}
					break;
		}
				
			}
			//如果开的药与他的过敏史没有关系那么我就添加
			if(!haveallergicmedical){
				_emr_addmedical(data);
			}
			
			
		});
		var td2=$("<td />").appendTo(tr);
		$("<a />").text("过敏").appendTo(td2).click(function(){
			
			for(var i=0;i<allergicHistoryData.length;i++){
			
				if(data.name==allergicHistoryData[i].name){
					
					continue;
				}
				
				allergicHistoryCal+=1;
			}
			
			if(allergicHistoryCal==allergicHistoryData.length){
			var tr=$("<tr height='20 ' />").appendTo($("#allergichistory"));
			
			$('<td width="90%"/>').text(data.name).appendTo(tr).focus(function(){_emr_enableInput(this);});
			var td = $('<td width="10%"/>').appendTo(tr);
			$('<a>—</a>').appendTo(td).click(function(){
				$(this).parent().parent().remove();
			
			});
			alert("过敏史添加成功");
			}
			else{
				allergicHistoryCal=0;
				alert("已经有次过敏史");
			}
		});
	});
}

var _emr_diseaseTree;
/**
 * 已确诊
 */
function _emr_diagnosed(){
	_emr_diagnose(true);
}
/**
 * 未确诊
 */
function _emr_undiagnosed(){
	_emr_diagnose(false);
}
/**
 * 处理诊断信息
 */
function _emr_diagnose(type){
	var checked = _emr_diseaseTree.getCheckedNodes(true);
	if(checked.length>0){
		var ul = $(".diagnoselist").find('ul');
		$.each(checked,function(){
			var node = this;
			if(!node.isParent){
				var li = $('<li><span '+(!type?'class="question"':'')+'></span>'+node.name.substring(node.name.indexOf(')')+1)+'</li>').appendTo(ul);
				var notedel = $('<span class="notedel" style="display:none"/>').appendTo(li);
				li.mouseover(function(){
					$(this).find('span[class="notedel"]').css('display','block');
				});
				li.mouseout(function(){
					$(this).find('span[class="notedel"]').css('display','none');
				});
				notedel.click(function(){
					$(this).parent().remove();
					_emr_diseaseTree.showNode(node);
				});
				_emr_diseaseTree.hideNode(node);
			}
		});
		$(".diagnoselist")[0].scrollTop = $(".diagnoselist")[0].scrollHeight;
//		_emr_diseaseTree.hideNodes(checked);
	}
}
/**
 * 添加药品信息
 * @param data
 */
function _emr_addmedical(data){
	
	var tr = $('<tr height="30"/>').appendTo('#medical_table');
	$('<td width="15%"/>').text(data?data.name:'').appendTo(tr).focus(function(){_emr_enableInput(this);});
	$('<td width="15%" />').text(data?data.commodityname:'').appendTo(tr).focus(function(){_emr_enableInput(this);});
	$('<td width="10%"/>').text(data?data.type:'').appendTo(tr).focus(function(){_emr_enableInput(this);});
	$('<td width="5%"/>').text(data?data.jixing:'').appendTo(tr).focus(function(){_emr_enableInput(this);});
	$('<td width="10%"/>').text(data?data.num:'').appendTo(tr).focus(function(){_emr_enableInput(this);});
	$('<td width="5%"/>').text(data?data.unit:'').appendTo(tr);//单位
	$('<td width="15%"/>').text(data?data.direction:'').appendTo(tr).focus(function(){_emr_enableInput(this);});//频率
	$('<td width="10%"/>').text(data?data.route:'').appendTo(tr).focus(function(){_emr_enableInput(this);});//用药途径
	$('<td width="5%"/>').text(data?data.level:'').appendTo(tr);
	
	var td = $('<td width="5%"/>').appendTo(tr);
	if($('#medical_table').height()>$('#medical_table').parent().height()){
		$('#medical_table').parent().prev().width($('#medical_table').width());
	}
	$('<a>—</a>').appendTo(td).click(function(){
		$(this).parent().parent().remove();
		if($('#medical_table').height()<=$('#medical_table').parent().height()){
			$('#medical_table').parent().prev().width($('#medical_table').width());
		}
	});
}

/**
 * 增加和删除药物过敏史
 */
function _emr_addallergichistory(){
	
	
	var tr=$("<tr height='20 ' />").appendTo($("#allergichistory"));
	
	$('<td width="90%"/>').text('').appendTo(tr).focus(function(){_emr_enableInput(this);});
	var td = $('<td width="10%"/>').appendTo(tr);
	$('<a>—</a>').appendTo(td).click(function(){
		$(this).parent().parent().remove();
	
	});
	
	
}
/**
 * 处方表格可输入切换
 * @param obj
 */
function _emr_enableInput(obj){
	
	if($(obj).find('input').length==0){
		var txt = $(obj).text();
		$(obj).empty();
		var input = $('<input type="text">').css({width:'100%',height:'29px',border:'0px','text-align':'center'}).appendTo($(obj));
		input.focus();
		input.attr('value',txt);
		input.blur(function(){
			$(obj).text(input.val());
			$(this).remove();
		});
	}
}

var hasTree;
var getDiseaseUrl="/publish/jibing/findDiseases.htm";//发现疾病树信息
function getCategoryTree(){
	if(!hasTree){
		importJS("../js/oimsCategory.config.js");
		importJS("../js/categoryTree.js");
		importCSS("../css/categoryTree.css");
		hasTree=true;;
	}
	return hasTree;
}



//弹出画图窗口
function showPaintDialog(imgs) {
		importJS("/js/jquery.swfobject.1-1-1.js");
		var div=$("#picture");
		showPaintNew(div,imgs);
}

// 点击画图窗口保存按钮
function paintSave() {
	if (category.intr.split(",").length == 2) {
		getFLASHJSONData("paintSWF_OD");
		getFLASHJSONData("paintSWF_OS");
	} else {
		getFLASHJSONData("paintSWF");
	}
	function getFLASHJSONData(swdId) {
		$("#" + swdId + "_new").flash(function() {
			this.paintSave();
		});
	}
}

var _emr_paint_flash;
// 显示画图窗口内容
function showPaintNew(div,imgs) {
	var patientId = 1; // 患者ID
	var regId = 1; // 就诊ID
	var mrId = 1; // 记录ID
	var _url = imgs; // 画图图片地址
	var photoType = 1;
	var paintSaveUrl = contextPath + "/publish/doctor/paintSave.htm"; // 保存画图
	paintLength = _url.length;
	if (_url.length == 2) {
		var odt = $("<div />").addClass("OSPaint").addClass("emr_paintosod").attr("style","width:100%;height:100%;")
		.appendTo(div);
		showSWF(_url[0], "OD", odt);
	} else {
		showSWF(_url[0], null, odiv);
	}
	function showSWF(src, y, odiv) {
		var params = {
			allowScriptAccess : "sameDomain",
			quality : "high",
			wmode : "transparent"
		};
		var swfID = "paintSWF";
		$("<div />").attr("id", swfID + "_new").appendTo(odiv).flash({
			swf : contextPath + '/swf/paint.swf?random=' + Math.random(),
			id : swfID,
			width : '100%',
			height : 250,
			flashvars : {
				url : contextPath + src,
				eyes : y,
				patientId : patientId,
				regId : regId,
				saveUrl : paintSaveUrl,
				id : mrId,
				photoType : photoType,
				callbackFunc : "paintCallback"
			},
			paremeters : params
		});
		_emr_paint_flash = window[swfID];
		//判断flash是否加载完毕，每隔100毫秒检查一次
		var interval = setInterval(function(){
			 try {
				if ('setPenColor' in _emr_paint_flash) { // 轮询flash的某个方法即可
					var color = $('#colorselector a span[class="selected"]').css('background-color');
					_emr_paint_flash.setPenColor(_emr_colorHex(color));
					_emr_paint_flash.setPenSize($('#pensize').val());
					//绑定颜色选择
					$('#colorselector a span').unbind('click');
					$('#colorselector a span').bind('click',function(){
						if($(this).hasClass('selected')){
							return;
						}else{
							$('#colorselector a span').removeClass('selected');
							$(this).addClass('selected');
							_emr_setPenColor(this);
						}
					});
					//绑定画笔尺寸
					$('#minus').unbind('click');
					$('#minus').bind('click',function(){
						_emr_setPenSize(this);
					});
					$('#add').unbind('click');
					$('#add').bind('click',function(){
						_emr_setPenSize(this);
					});
					$('#pensize').unbind('keyup');
					var timer;
					$('#pensize').bind('keyup',function(){
						var val = $(this).val();
						if(timer){
							clearTimeout(timer);
						}
						timer = setTimeout(function(){
							if(val&&/^[1-9]\d*/.test($.trim(val))){
								_emr_paint_flash.setPenSize($('#pensize').val());
							}else{
								$('#pensize').val(1);
							}
						},500);
					});
					$('#repaint').unbind('click');
					$('#repaint').bind('click',function(){
						$('#picture').empty();
						showPaintNew(div,[]);
					});
					clearInterval(interval);
				}
			} catch (ex) {

			}
		},100);
	}
}
/**
 * 设置画笔颜色
 */
function _emr_setPenColor(obj){
	var color = $(obj).css('background-color');
	_emr_paint_flash.setPenColor(_emr_colorHex(color));
}

function _emr_colorHex(text) {
	var that = text;
	if (/^(rgb|RGB)/.test(that)) {
		var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
		var strHex = "#";
		for ( var i = 0; i < aColor.length; i++) {
			var hex = Number(aColor[i]).toString(16);
			if (hex === "0") {
				hex += hex;
			}
			strHex += hex;
		}
		if (strHex.length !== 7) {
			strHex = that;
		}
		return strHex.replace('#','0x');
	}else if(that.indexOf('#')==0){
		return that.replace('#','0x');
	}else {
		return that;
	}
};
/**
 * 设置画笔尺寸
 */
function _emr_setPenSize(obj){
	var val = $.trim($('#pensize').val());
	if(val&&/^[1-9]\d*/.test(val)){
		if(obj.id=="minus"){
			if(parseInt(val)>1){
				$('#pensize').val(parseInt(val)-1);
			}
		}else{
			$('#pensize').val(parseInt(val)+1);
		}
		_emr_paint_flash.setPenSize($('#pensize').val());
	}
}

function showYanya()
{
	var d = [];
	// 清空检查单图片显示区域
//	$(".studyShowTag").text("");
	$("<div />").attr({"id":"yanya_div"}).appendTo("#iop");
	
	var sw = $(".studyShowTag").innerWidth();
	var sh = $(".studyShowTag").innerHeight();
	
	var l_data = [];
	var r_data = [];
	
	var date = [];
	
	for(var i = 0;i<d.length;i++)
	{
		
		l_data.push(d[i].left==null?0:d[i].left);
		r_data.push(d[i].right==null?0:d[i].right);
		
		var h = d[i].ycsj.hours;
		var m = d[i].ycsj.minutes;
		var h_str = "";
		var m_str = "";
		
		if(h<10)
		{
			  h_str = "0"+h;
		}
		else
		{
			  h_str = h;
		}
		
		if(m<10)
		{
			m_str = "0"+m;
		}
		else
		{
			m_str = m;
		}	
		
		date.push(h_str+":"+m_str);
	}	
	
	createClick(sw,sh,l_data,r_data,date);
	
}

function createClick(sw,sh,l_data,r_data,date)
{
	
	if(date.length>8)
	{
		sw=sw+(date.length-8)*40;
	}	
	
	var option = 
				{
					chartContent:{width:328,height:240},
					divContent:{id:"yanya_div"},
					xAxisContent:{name:'检查时间',unit:""}, //检查时间
					yAxisContent:{name:'眼压'+"(mmHg)",unit:""},//眼压
					arrayContent:[{name:'左眼'/*"左眼"*/,data:l_data},{name:'右眼'/*"右眼"*/,data:r_data}],
					categoriesNum:date
				};
	creteChart(option);
}
function creteChart(options)
{
    var chart = new Highcharts.Chart({
    	
        chart: {
            	renderTo: options.divContent.id,
            	type: 'line',
            	width: options.chartContent.width,
            	height:options.chartContent.height,
            	style: 
            		 {
            			margin: '0 auto'
            		 }
               },
               
        title: {
            	text: ''/*'眼压曲线'*/
               },
               
     subtitle: {
            	text: ''
               },
               
        xAxis: {
				categories: options.categoriesNum,
					 title: {
						 	 text: options.xAxisContent.name
					        },
			        labels: {
			                 formatter: function() 
			                            {
			                	 			return this.value + options.xAxisContent.unit;
			                            }
			        		}
        }, 
        	   
        yAxis: {
            	title: {
            			text: options.yAxisContent.name
            		   },
               labels: {
		                formatter: function() 
		                		   {
		                    			return this.value + options.yAxisContent.unit;
		                		   }
               		   },
            lineWidth: 2,
			      min: 0
        },
        
        legend: {
            enabled: true
        },
        
        tooltip: {
			enabled: true,
            formatter: function() 
            		   {
                			return this.x +options.xAxisContent.unit+"<br/>"+
                			this.series.name + ":"+ this.y +options.yAxisContent.unit + "<br/>";
            		   }
        },
        
		plotOptions: {
						line: {
								dataLabels: {
												enabled: true
											},
								enableMouseTracking: true
							  }
		},
        series: options.arrayContent
        
    });
}

$(document).ready(function(){
	$('#case').height($(window).height()-$('.header').outerHeight()-$('.footer').outerHeight()-$('.title').outerHeight()-$('.toolbar').outerHeight()-26);
	$('#case').width($(window).innerWidth()-$('.left').outerWidth()-26);
	$('#main').width($('#case').width()-$('#compare_show').outerWidth());
	_emr_getHtml('diagnosis');
	changeInquiryWinSize();
//	$('#main').resize(function(){
//		$('#main').children('.maintab').width($('#main').width());
//	});
});
$(window).resize(function(){
	resize_1();
	$('#case').height($(window).height()-$('.header').outerHeight()-$('.footer').outerHeight()-$('.title').outerHeight()-$('.toolbar').outerHeight()-26);
	$('#case').width($(window).innerWidth()-$('.left').outerWidth()-26);
	$('#main').width($('#case').width()-$('#compare_show').outerWidth());
//	$('#main').children('.maintab').width($('#main').width()-2);
//	$('#main').resize(function(){
//		$(this).children('.maintab').width($('#main').width());
//		$(this).children('.maintab').height($('#main').height());
//	});
});

function test(){
	
}