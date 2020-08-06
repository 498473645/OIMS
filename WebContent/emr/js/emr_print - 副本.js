var DIAGNOSIS_GET_LIST_URL = "/publish/emr/getExistsDiagnosis.htm";
var exam_appoint_no_url="/publish/emrOrder/getExamAppointsNo.htm";
var getZYSX="/publish/emrOrder/getZYSX.htm";
var getSpecialLocation='/publish/shebei/getSpecialLocation.htm';
var findClassAndSubClass='/publish/emrOrder/findClassAndSubClass.htm';
var findExcuteDept='/publish/emrOrder/findEMROrderByJcxmidAndJiuzhenid.htm';
var suifang_time={'1':'1日后','2':'2日后','3':'3日后','4':'4日后','5':'5日后','7':'一周后','14':'两周后','21':'三周后','28':'四周后','56':'八周后','84':'十二周后','182':'半年后','365':'一年后'};
var getJzjlByCategoryIdAndJiuzhenid='/publish/jzjl/getJzjlListByCategoryIdAndJiuzhenId.htm';
var eyePDFBaoGao=[];
var item_class={'A':'西药','B':'中药','C':'化验','D':'检查','E':'治疗','F':'手术','G':'麻醉','H':'血费','I':'材料'}; 
var print_jcxm_differ=[1992,1998,1999,2002,2003,2004];
var qrcode_url='/publish/code/getQCodeImg.htm';
function _emr_preview(){// emrPrivew
	//setTimeout(function(){
	var win = showPrintWindow('preview');
	var page = $("<div />").addClass("printPage").appendTo(win);
	showWithHtmlTemplate("emr_privew",currentPatient,page);
	showBarcode(currentPatient.binglihao,page.find(".barcodeDiv"));
	$("#tabTitle").children("div:eq(3)").click();
	var div=makeRecordEMR(currentVisit.id);
	page.append(div);
	if(currentVisit.treatResult){
		$("#treat_result").val(currentVisit.treatResult);
	}
	$("#treat_result").blur(function(){
		
		getJSONData(updateTreatResult,{jiuzhenId:currentVisit.id,result:$("#treat_result").val()},'POST')
		
		currentVisit.treatResult=$("#treat_result").val();
	});
	//加入报告的显示
	$.each(eyePDFBaoGao,function(){
		var epbg=this;
		$("#spe"+this.jcdid).click(function(){
			speClickPDF(epbg.jcdid,epbg.data_getPDFListByJcd,epbg.data_getReportListByJcd);
		});
		
	});
	//},1500);
}

function printEMRB5(big){
	var win = showPrintWindow(big);
	var _show = $("#tabTitle").children(".tab_show");
	var page = $("<div />").addClass("printPage").appendTo(win);
	showWithHtmlTemplate("emr_print",{binglihao:currentPatient.binglihao,xingming:currentPatient.xingming,sex:currentPatient.sex,age:currentPatient.age,shouji:currentPatient.shouji,kdsj:formatDate(currentVisit.caozuoTime.time),kdys:parent.window.currentStaff.xingming},page);
	showBarcode(currentPatient.binglihao,page.find(".barcodeDiv"));
	$('.printPage h1').css({'line-height':'50px'});
	var tag = page.find(".orderList");
	tag.height(310);
	var div = $("<div />").appendTo(tag);
	$("<strong />").text("主诉：").appendTo(div);
	var id = oimsCategory.WENZHENMOBAN_ZHUSHU+"_"+currentVisit.id;
	$("<p />").text($("#"+id).text()).appendTo(div);
	
	//page=backPageCombineCurrentPage(page,"主诉：",win);
	
	div = $("<div />").appendTo(page.find('.orderList'));
	id = oimsCategory.WENZHENMOBAN_JIWANGSHI+"_"+currentVisit.id;
	$("<strong />").text("即往史：").appendTo(div);
	$("<p />").text($("#"+id).text()).appendTo(div);
	
	page=backPageCombineCurrentPage(page,"即往史：",win);
	
	div = $("<div />").appendTo(page.find('.orderList'));
	$("<strong />").text("专科检查：").appendTo(div);
	var p0 = $("<p />").appendTo(div);
	var txt=showTxt(getZKJCText,p0,_show);
	page=backPageCombineCurrentPage(page,"专科检查：",win,_show);
	
	div = $("<div />").appendTo(page.find('.orderList'));
	$("<strong />").text("诊断：").appendTo(div);
	$("<p />").text(getZhenduanText()).appendTo(div);
	page=backPageCombineCurrentPage(page,"诊断：",win);
	div = $("<div />").appendTo(page.find('.orderList'));
	$("<strong />").text("处置：").appendTo(div);
	var p1 = $("<p />").appendTo(div);
	showTxt(getChuzhiText,p1,_show);
	
	page=backPageCombineCurrentPage(page,"处置：",win,_show);
//	var height=0;
//	$.each($('.orderList').children('div'),function(i,temp){
//		height+=$(temp).height();
//	});
//	if(height>=280){
//		//重庆进行分页
//		var page2 = $("<div />").addClass("printPage").appendTo(win);
//		showWithHtmlTemplate("emr_print",{binglihao:currentPatient.binglihao,xingming:currentPatient.xingming,sex:currentPatient.sex,age:currentPatient.age,shouji:currentPatient.shouji,kdsj:formatDate(currentVisit.caozuoTime.time),kdys:parent.window.currentStaff.xingming},page2);
//		showBarcode(currentPatient.binglihao,page.find(".barcodeDiv"));
//		$('.printPage h1').css({'line-height':'50px'});
//		var h1_text=$('.printPage:last h1');
//		h1_text.text(h1_text.text()+'(续)');
//		var tag2 = page2.find(".orderList");
//		tag.children('div:last').remove();
//		div_page2 = $("<div />").appendTo(tag2);
//		$("<strong />").text("处置：").appendTo(div_page2);
//		var p1_page2 = $("<p />").appendTo(div_page2);
//		showTxt(getChuzhiText,p1_page2,_show);
//	}
}
//传入当前的page，判断最近添加的一次div是否超过了当前page，超过则删除最后一个div(最近div),把div放入到下一页，并返回下一页对象,不超过直接返回本页page
function backPageCombineCurrentPage(page,title,win,_show){
	var height=0;
	$.each(page.find('.orderList').children('div'),function(i,temp){
		height+=$(temp).height();
	});
	if(height>=310){
		var page2 = $("<div />").addClass("printPage").appendTo(win);
		showWithHtmlTemplate("emr_print",{binglihao:currentPatient.binglihao,xingming:currentPatient.xingming,sex:currentPatient.sex,age:currentPatient.age,shouji:currentPatient.shouji,kdsj:formatDate(currentVisit.caozuoTime.time),kdys:parent.window.currentStaff.xingming},page2);
		showBarcode(currentPatient.binglihao,page2.find(".barcodeDiv"));
		page2.find('h1').css({'line-height':'50px'});
		var h1_text=$('.printPage:last h1');
		h1_text.text(h1_text.text()+'(续)');
		var tag2 = page2.find(".orderList");
		tag2.height(310);
		page.find('.orderList').children('div:last').remove();
		if(title=='即往史：'){
			var	div = $("<div />").appendTo(tag2);
			var	id = oimsCategory.WENZHENMOBAN_JIWANGSHI+"_"+currentVisit.id;
			$("<strong />").text("即往史：").appendTo(div);
			$("<p />").text($("#"+id).text()).appendTo(div);
		}else if(title=='专科检查：'){
			var	div = $("<div />").appendTo(tag2);
			$("<strong />").text("专科检查：").appendTo(div);
			var p0 = $("<p />").appendTo(div);
			showTxt(getZKJCText,p0,_show);
		}else if(title=='诊断：'){
			var div = $("<div />").appendTo(tag2);
			$("<strong />").text("诊断：").appendTo(div);
			$("<p />").text(getZhenduanText()).appendTo(div);
		}else if(title=='处置：'){
			var div = $("<div />").appendTo(tag2);
			$("<strong />").text("处置：").appendTo(div);
			var p0 = $("<p />").appendTo(div);
			showTxt(getChuzhiText,p0,_show);
		}
		return page2;
	}else{
		return page;
	}
	
}

function printComboList(listTypes){
	var win = showPrintWindow();
	$.each(listTypes,function(){
		var page = null;
		var page1 = null;
		var	listType= this;
		var table = $("form#chuzhiForm_"+listType).children("table");
		var x=false;
		var tag;
		var tag1;
		var th;
		var indexCash=[];
		var t;
		var t1;
		var sampleSort;
		var list = getJSONData(DIAGNOSIS_GET_LIST_URL,{tag:Math.random(),visitId:currentVisit.id},"POST");
		var zhenduan='';
		$.each(list,function(i,n){
			zhenduan+=(n.eye?n.eye:'')+n.zdflname+(parseInt(n.confirmed)==0?'?':'');
			if(i!=list.length-1){
				zhenduan+="；";
			}
		});
		$.each(table.find("tr"),function(i,tr){
			if(i==0){
				th=$(tr).clone();
				if(listType!=CHUZHI_CATEGORY.prescribe){
					if(listType==CHUZHI_CATEGORY.operation){
						th.prepend($('<th style="width:40px;"/>').text('类别'));
						$(th.find('th:eq(1)')[0]).after($('<th style="width:70px;"/>').text('单价'));
						th.append($('<th />').text('小计'));	
						th.find('th:last').prev().prev().width(50);
					}else{
						th.append($('<th />').text('执行科室'));	
					}
				}
				$.each(th.find('th'),function(){
	if(($(this).text()=='金额'&&listType!=CHUZHI_CATEGORY.Qg_operation)||$(this).text()=='库存'||$(this).text()=='药局'||$(this).text()=='生产厂商'){
						indexCash.push($(this).index());
						$(this).css({"display":"none"});
						return ;
					}
					else{
						$(this).css({"text-align":"left"});
					}
				});
				return true;
			}
			var dept = $(tr).find("input[name=excutiveDept]").val();
			var jcxmId=$(tr).find('input[name=jcxmId]').val();
			var jiuzhenId=$("form#chuzhiForm_"+listType).find('input[name=jiuzhenId]').val();
			if(listType==CHUZHI_CATEGORY.eyeExam){
				t=$("table.print_sheet_eye");
			}
			else if(listType==CHUZHI_CATEGORY.labTest){
				if(parseInt(dept)>=40&&parseInt(dept)<=47)
					t=$("table.print_sheet_59");
				else
					t=$("table.print_sheet_"+dept);
			}
			else{
				t=$("table.print_sheet_"+dept);
			}
			if(listType==CHUZHI_CATEGORY.labTest){
				sampleSort=$("table.sample_sheet_"+$(tr).find('select').val());
			}
			t1=$("table.print_sheet_"+dept+"1");
			if(listType==CHUZHI_CATEGORY.prescribe&&($(tr).find("td:eq(8)").text()=='便民药房'||$(tr).find("td:eq(8)").text()=='药品超市')){
				if(!t1.length){
					if(page1==null){
						page1 = getPageTag(listType,tr);
						tag1 = page1.find(".orderList");
						tag1.html("");
						t1=$("<table />").addClass("print_sheet_"+dept+"1").appendTo(tag1);
						th.clone().appendTo(t1);
					}else{
						page1 = page1.clone().appendTo(win);
					}
				}
			}else{
				if(listType==CHUZHI_CATEGORY.eyeExam){
					if(page==null){
						page = getPageTag(listType,tr);
						$("<div />").css("clear","both").prependTo(page);
					
					tag = page.find(".orderList");
					tag.html("");
					t=$("<table />").addClass("print_sheet_eye").appendTo(tag);
					th.clone().appendTo(t);
					}
				}
				else if(listType==CHUZHI_CATEGORY.labTest){
					//如果不是一个科室或者不是一个标本都要新建page
					var xm=$(tr).children("td:eq(0)").text();
					var num=$(tr).children("td:eq(1)").children('input').val();
					if(!t.length||!sampleSort.length){
							
							page = getPageTag(listType,tr);
							$("<div />").css("clear","both").prependTo(page);
							tag = page.find(".orderList");
							tag.html("");
							if(parseInt(dept)>=40&&parseInt(dept)<=47)
								t=$("<table />").addClass("print_sheet_59").addClass("sample_sheet_"+$(tr).find('select').val()).appendTo(tag);
							else
								t=$("<table />").addClass("print_sheet_"+dept).addClass("sample_sheet_"+$(tr).find('select').val()).appendTo(tag);
							var tr0=$("<tr/>").appendTo(t);
							$("<td style='width:100px;font-size:14px'/>").text("临床诊断：").appendTo(tr0);
							$("<td />").text(zhenduan).css({'font-size':'14px'}).appendTo(tr0);
							tr0=$("<tr/>").appendTo(t);
							$("<td style='width:100px;font-size:14px'/>").text("标本种类：").appendTo(tr0);
							var biaoben=$(tr).find('select').children("option[value=\""+$(tr).find('select').val()+"\"]").text();
							$("<td/>").text(biaoben).css({'font-size':'14px'}).appendTo(tr0);
							tr0=$("<tr/>").appendTo(t);
							$("<td style='width:100px;font-size:14px'/>").text("执行科室：").appendTo(tr0);
							var locationSelect=$('div#jctsDiv_'+jcxmId+'_'+CHUZHI_CATEGORY.labTest).find('select[name=zhixingkeshiSelected]');
							var location = locationSelect.children("option[value="+locationSelect.val()+"]").text();
							if(location.indexOf("检验科")!=-1){
								$("<td/>").text("检验科").css({'font-size':'14px'}).appendTo(tr0);
							}
							else{
								$("<td/>").text(location.substring(0,3)).css({'font-size':'14px'}).appendTo(tr0);
							}
							tr0=$("<tr/>").appendTo(t);
							$("<td style='width:100px;font-size:14px'/>").text("检验项目：").appendTo(tr0);
							var td;
							if(parseInt(dept)>=40&&parseInt(dept)<=47){
								td=$("<td  id=lis_59_"+$(tr).find('select').val()+"/>").appendTo(tr0);
							}else{
								td=$("<td  id=lis_"+dept+"_"+$(tr).find('select').val()+"/>").appendTo(tr0);
							}
							
							if(num==1){
								//td.html(1+"."+"<span>"+xm+"</span>").css({'font-size':'14px'});
								if($("#jcxmFushu_"+jcxmId).length){
									$.each($("#jcxmFushu_"+jcxmId).find("tr"),function(i){
										td.html(td.html()+"<br/>"+(i+1)+"."+"<span>"+$(this).find('td:eq(1)').text()+"</span>").css({'font-size':'14px'});
									});
								}
								else{
									td.html(1+"."+"<span>"+xm+"</span>").css({'font-size':'14px'});
								}
							}
							else{
								for(var i=0;i<num;i++){
									td.html(td.html()+"<br/>"+(i+1)+"."+"<span>"+xm+"</span>").css({'font-size':'14px'});
								}
							}
					}
					//以前同一个标本与同一执行科室的项目存在，则不需要新建
					else{
						var td=$("#lis_"+(parseInt(dept)>=40&&parseInt(dept)<=47?59:dept)+"_"+$(tr).find('select').val());
						var n=$(td).find('span').length;
						if(num==1){
							if($("#jcxmFushu_"+jcxmId).length){
								$.each($("#jcxmFushu_"+jcxmId).find("tr"),function(i){
									td.html(td.html()+"<br/>"+(n+i+1)+"."+"<span>"+$(this).find('td:eq(1)').text()+"</span>").css({'font-size':'14px'});
								});
							}
							else{
								td.html(td.html()+"<br/>"+(n+1)+"."+"<span>"+xm+"</span>").css({'font-size':'14px'});
							}
						
						}
						else{
							for(var i=0;i<num;i++){
								td.html(td.html()+"<br/>"+(i+n+1)+"."+"<span>"+xm+"</span>").css({'font-size':'14px'});
							}
						}
					}
					
				}
				else{
					if(!t.length||listType==CHUZHI_CATEGORY.otherExam){

						//如果没有这个部门的对应的page
						if(listType==CHUZHI_CATEGORY.otherExam){
							page = getPageTag(listType,tr);
							$("<div />").css("clear","both").prependTo(page);
						}
						else{
							if(page==null){
								page = getPageTag(listType,tr);
								$("<div />").css("clear","both").prependTo(page);
							}
							else
								page=page.clone().appendTo(win);
						}
						tag = page.find(".orderList");
						tag.html("");
						t=$("<table />").addClass("print_sheet_"+dept).appendTo(tag);
						if(listType==CHUZHI_CATEGORY.otherExam){
								var tr0=$("<tr/>").appendTo(t);
								var classandsubclass=getJSONData(findClassAndSubClass,{jcxmId:jcxmId},'POST').obj;
								var td0=$('<td style="width:80px;text-align:right"/>').appendTo(tr0);
								$(td0).text("检查类型：")
								td0=$('<td />').appendTo(tr0);
								$(td0).html((classandsubclass[0]?classandsubclass[0]:"")+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+(classandsubclass[1]?classandsubclass[1]:""));
								//执行机房
								tr0=$("<tr/>").appendTo(t);
								//EMRORDER中取（根据就诊ID与检查项目id，默认一个项目一次就诊只能做一次）
								var order=getJSONData(findExcuteDept,{jcxmId:jcxmId,jiuzhenId:currentVisit.id},'POST').obj;
								td0=$('<td style="width:80px;text-align:right"/>').appendTo(tr0);
								$(td0).text("执行机房：");
								td0=$('<td />').appendTo(tr0);
								$(td0).text(order?(order.callbackMessage?order.callbackMessage.split('$')[0]:''):'');
								// 临床诊断
								tr0=$("<tr />").appendTo(t);
								var diagnosis=getJSONData(DIAGNOSIS_GET_LIST_URL,{tag:Math.random(),visitId:currentVisit.id},'POST');
								var adviceHtml="";
								$.each(diagnosis,function(){
									adviceHtml += (this.eye?this.eye:'')+this.zdflname+(parseInt(this.confirmed)==0?'?':'')+'；';
								});
								td0=$('<td style="width:80px;text-align:right"/>').appendTo(tr0);
								$(td0).text("临床诊断：");
								td0=$('<td/>').appendTo(tr0);
								$(td0).text(adviceHtml);
								// 症状
								tr0=$("<tr />").appendTo(t);
								var zhusu=getJSONData(getJzjlByCategoryIdAndJiuzhenid,{categoryId:oimsCategory.WENZHENMOBAN_ZHUSHU,jiuzhenId:currentVisit.id},'POST').obj;
								td0=$('<td style="width:80px;text-align:right"/>').appendTo(tr0);
								$(td0).text("症状：");
								td0=$('<td/>').appendTo(tr0);
								$(td0).text(zhusu?zhusu[0].jilu:'');
								//附加说明
								tr0=$("<tr />").appendTo(t);
								var notice=$($(tr).find("input[name=note]")[0]).val();
								td0=$('<td style="width:80px;text-align:right"/>').appendTo(tr0);
								$(td0).text("附加说明：");
								td0=$('<td/>').appendTo(tr0);
								$(td0).text(notice?notice:'');
								// 检查项目
								tr0=$("<tr />").appendTo(t);
								td0=$('<td style="width:80px;text-align:right"/>').appendTo(tr0);
								$(td0).text("检查项目：");
								td0=$('<td/>').appendTo(tr0);
								$(td0).text($(tr).find('td:eq(0)').text());
								var bgsbm=getJSONData('/publish/bangongshi/getBanGongShiById.htm',{id:dept},'POST').obj.bgsBm;
								if(bgsbm=='4102'||bgsbm=='410201'||bgsbm=='410202'||bgsbm=='410203'||bgsbm=='410204'||bgsbm=='410205'||bgsbm=='410206'||bgsbm=='410230'){
									if(!tag.find('div.fsknote').length){
										$('<div  style="height:'+(296-8-32-$('table.print_sheet_'+dept).height())+'px;"/>').attr("id","fskdiv_"+dept).appendTo(tag);
										var div=$('<div  class="fsknote" style="height:32px"/>').appendTo(tag);
										div.css({'font-size':'13px'});
										//查找执行科室以及预约时间
										var zysx=getJSONData(getZYSX,{jcxmId:jcxmId,jiuzhenId:jiuzhenId,dept:dept,listType:listType},'POST').obj;
										div.append((zysx.scheduledDate?("请于"+formatDate(zysx.scheduledDate.time)+","):'')+(zysx.address?zysx.address:'')+"。").append("</br>放射科上下班时间为上午8:00-12:00，下午1:00-4:30,周末下午休息。夜间急诊病人请到门诊二楼北二区登记台联系值班医生");
									}
								}
								$('td').css({'font-size':'14px'});
								return true;
						}else{
							th.clone().appendTo(t);
						}
					}
//					else{
//						//如果有这个部门的对应page
//						if(listType==CHUZHI_CATEGORY.otherExam){
//							var tr0=$("<tr/>").appendTo(t);
//							var td0=$("<td/>").appendTo(t);
//							    td0=$("<td/>").appendTo(t);
//							td0.text($(tr).find('td:eq(0)').text());
//							$('td').css({'font-size':'14px'});
//							$("#fskdiv_"+dept).height(296-8-32-$('table.print_sheet_'+dept).height());
//							return true;
//						}
//					}
				}
			}
			if(listType==CHUZHI_CATEGORY.eyeExam||listType==CHUZHI_CATEGORY.treat||listType==CHUZHI_CATEGORY.Qg_operation||listType==CHUZHI_CATEGORY.operation){
				//如果检查项目是广角镜检查
//				var location='';
//				location=getJSONData(FIND_ZHIXING_KESHI_URL,{jcxmId:jcxmId}).obj;
				var url='/publish/bangongshi/getBanGongShiById.htm';
				var bgs_id=$("#jctsDiv_"+jcxmId+"_"+listType).find('select').val();
				var location=getJSONData(url,{id:bgs_id},'POST').obj;
				$.each($('table.jcxmFushu'),function(i,n){
					if($(this).attr('id').split('_')[1]==jcxmId){
						$.each($(this).find('tr'),function(){
							if(!$(this).find('input[type=checkbox]').attr('checked')){
								return true;
							}
							if(listType!=CHUZHI_CATEGORY.operation){
								if(t.find("tr").length>7||jcxmId==1000357||jcxmId==1000358){
								if($(this).attr('class').split("_")[1]==24007||$(this).attr('class').split("_")[1]==24009){
									var	cailiao_page=page.clone().appendTo(win);
									var cailiao_tag = cailiao_page.find(".orderList");
									cailiao_tag.html("");
									t.removeClass("print_sheet_"+(listType==CHUZHI_CATEGORY.eyeExam?'eye':dept));
								    t=$("<table cellspacing=0 cellpadding=0 />").addClass("print_sheet_"+dept).appendTo(cailiao_tag);
								    th.clone().appendTo(t);
								}
								else if(t.find("tr").length>7){
									t.removeClass("print_sheet_"+(listType==CHUZHI_CATEGORY.eyeExam?'eye':dept));
									page=null;
									if(page==null){
									page = getPageTag(listType,tr);
									$("<div />").css("clear","both").prependTo(page);
									tag = page.find(".orderList");
									tag.html("");
									t=$("<table cellspacing=0 cellpadding=0 />").addClass("print_sheet_"+(listType==CHUZHI_CATEGORY.eyeExam?'eye':dept)).appendTo(tag);
									th.clone().appendTo(t);
									}
								}
							}
						}else{
							if(t.find("tr").length>10){
								t.removeClass("print_sheet_"+(listType==CHUZHI_CATEGORY.eyeExam?'eye':dept));
								page=null;
								if(page==null){
								page = getPageTag(listType,tr);
								$("<div />").css("clear","both").prependTo(page);
								tag = page.find(".orderList");
								tag.html("");
								t=$("<table cellspacing=0 cellpadding=0 />").addClass("print_sheet_"+(listType==CHUZHI_CATEGORY.eyeExam?'eye':dept)).appendTo(tag);
								th.clone().appendTo(t);
								}
							
							}
						}
						
						//-----填充数据--------------------
						var tr0 = $("<tr />").appendTo(t);
						//类别
						if(listType==CHUZHI_CATEGORY.operation){
							td0=$("<td />").appendTo(tr0);
							td0.css({"text-align":"left","font-size":"15px"});
							td0.text(item_class[$(this).data('pricecode').split("@")[0]]);
						}
						
						var td0 = $("<td />").appendTo(tr0);
						var temp="";
						td0.css({"text-align":"left","font-size":"15px"});
						td0.attr("nowrap","nowrap");
						//名称
						if($(this).index()==0){
							if((parseInt(jcxmId)>=1000007&&parseInt(jcxmId)<=1000014)||parseInt(jcxmId)==1000025||parseInt(jcxmId)==2005||parseInt(jcxmId)==1000335||$.inArray(parseInt(jcxmId),print_jcxm_differ)!=-1){
								if(parseInt(jcxmId)==1000025){
									temp="三面镜眼底检查(前房角镜检查)";
								}else if($.inArray(parseInt(jcxmId),print_jcxm_differ)!=-1){
									//temp="激光治疗青光眼(SLT)(视网膜多波长激光光凝)";
									temp=$(this).find('td:eq(1)').text()+"("+$(tr).children('td:eq(0)').text()+")";
								}
								else{
									temp=$(tr).children('td:eq(0)').text();
								}
							}
							if(listType==CHUZHI_CATEGORY.operation){
								td0.html((temp?temp:($(this).find('td:eq(1)').text()))+'&nbsp;&nbsp;&nbsp;&nbsp;'+$(this).data('pricecode').split("@")[2]);
								//诊室赋值
								tag.prev().children('span[id=location]').text(location.weizhi);
							}else{
								if(parseInt(jcxmId)>=1000001&&parseInt(jcxmId)<=1000004){
									td0.html((temp?temp:($(this).find('td:eq(1)').text()))+'&nbsp;&nbsp;&nbsp;&nbsp;'+$(this).data('pricecode').split("@")[2]);
								}else{
									td0.text(temp?temp:($(this).find('td:eq(1)').text()));
								}
							}
						}
						else{
							if(listType==CHUZHI_CATEGORY.operation)
								td0.html($(this).find('td:eq(1)').text()+'&nbsp;&nbsp;&nbsp;&nbsp;'+$(this).data('pricecode').split("@")[2]);// 组件的名字
							else
								td0.text(temp?temp:($(this).find('td:eq(1)').text()));
						}
						//单价
						if(listType==CHUZHI_CATEGORY.operation){
							td0=$("<td />").appendTo(tr0);
							td0.css({"text-align":"left","font-size":"15px"});
							td0.text($($(this).find('input:eq(0)')[0]).data('price'));
						}
						//数量
						td0=$("<td />").appendTo(tr0);
						td0.css({"text-align":"left","font-size":"15px"});
						td0.text($(this).find('td:eq(2)').find('input').val()*$(tr).find('input[name=count]').val());
						if(listType==CHUZHI_CATEGORY.operation){
							td0=$("<td />").appendTo(tr0);
							td0.css({"text-align":"left","font-size":"15px"});
							td0.attr("nowrap","nowrap");
							if($(this).index()==0){
								td0.text($(tr).find('select').find('option[value='+$(tr).find('select').val()+']').text());
							}
							//小计
							td0=$("<td />").appendTo(tr0);
							td0.css({"text-align":"left","font-size":"15px"});
							td0.attr("nowrap","nowrap");
							td0.text((parseFloat($($(this).find('input:eq(0)')[0]).data('price'))*parseFloat($($(this).find('input[name=suliang]')[0]).val())).toFixed(2));
						}else{
							if($(this).index()==0){
								//眼别
								td0=$("<td />").appendTo(tr0);
								td0.css({"text-align":"left","font-size":"15px"});
								td0.attr("nowrap","nowrap");
								td0.text($(tr).find('select').find('option[value='+$(tr).find('select').val()+']').text());
								//小计
								if(listType==CHUZHI_CATEGORY.Qg_operation){
									td0=$("<td />").appendTo(tr0);
									td0.css({"text-align":"left","font-size":"15px"});
									td0.attr("nowrap","nowrap");
									td0.text($(tr).find('input[name=money]').val());
								}
								//位置
								td0=$("<td />").appendTo(tr0);
								td0.css({"text-align":"left","font-size":"15px"});
								td0.attr("nowrap","nowrap");
								//td0.text((location&&location.length)?location[0].weizhi:'眼科');
								td0.text(location.weizhi);
							}
						}
						
					});
					$("<tr/>").append($('<td colspan="2" style="text-align: left; font-size: 15px;" nowrap="nowrap"/>').text('--------------------------------')).appendTo(t);
				}
			});
		}else if(listType==CHUZHI_CATEGORY.prescribe||listType==CHUZHI_CATEGORY.otherExam){
			var tr0;
			if(listType==CHUZHI_CATEGORY.prescribe&&($(tr).find("td:eq(8)").text()=='便民药房'||$(tr).find("td:eq(8)").text()=='药品超市')){
				tr0 = $("<tr />").appendTo(t1);
			}else{
				tr0 = $("<tr />").appendTo(t);
			}
			var s = $("#totalPrice");
			var totalPrice = (s.length && s.text().length)?parseFloat(s.text()):0;
			var tds = $(tr).children("td");
			for (var n = 0; n < tds.length; n++) {
				var td = tds[n];
					if(listType==CHUZHI_CATEGORY.prescribe && n==4){
						var price = parseFloat($(td).text());
						totalPrice=totalPrice+price;
					}
					if((listType==CHUZHI_CATEGORY.prescribe && n==$(tr).children("td").length)||containArray(indexCash,n)) continue;
					var td0 = $("<td />").appendTo(tr0);
					td0.css({"text-align":"left","font-size":"15px"});
					var input = $(td).children("input");
					if(input.length){
						if(listType==CHUZHI_CATEGORY.prescribe&&n==6){
							td0.text(input.val()+$(td).text());
							continue;
						}else{
							td0.text(input.val());
							continue;
						}
					}
					var select = $(td).children("select");
					if(select.length){
						var txt = select.children("option[value=\""+select.val()+"\"]").text();
						td0.text(txt);
						continue;
					}
					td0.text($(td).text());
			}
			$("#totalPrice").text(totalPrice.toFixed(2));
			//检验,科外加上执行科室
			if(/*listType==CHUZHI_CATEGORY.labTest||*/listType==CHUZHI_CATEGORY.otherExam){
				td0=$('<td/>').appendTo(tr0);
				td0.css({"text-align":"left","font-size":"15px"});
				var locationSelect=$('div#jctsDiv_'+jcxmId+'_'+listType).find('select[name=zhixingkeshiSelected]');
				var location = locationSelect.children("option[value="+locationSelect.val()+"]").text();
				if(listType==CHUZHI_CATEGORY.labTest){
					if(location.indexOf("检验科")!=-1){
						td0.text("检验科");
					}
					else{
						td0.text(location.substring(0,3));
					}
				}else{
					td0.text(location);
				}
			}
		} 
		if(listType==CHUZHI_CATEGORY.otherExam){
			$('div.orderList').children('div').css({'margin-top':($('div.orderList').height()-8*2-$('div.orderList').children('table').height()-30)});
		}
		if(listType==CHUZHI_CATEGORY.prescribe){
			if(t.find("tr").length>5){t.removeClass("print_sheet_"+dept);page=null;};
			if($(t1).find("tr").length>5){$(t1).removeClass("print_sheet_"+dept);page1 = null}
		}
		if(listType==CHUZHI_CATEGORY.labTest){
		}
//		else{
			//如果为特殊治疗分页打印材料
//			if(t.find("tr").length>7||jcxmId==1000357||jcxmId==1000358){
//				t.removeClass("print_sheet_"+(listType==CHUZHI_CATEGORY.eyeExam?'eye':dept));
//				page=null;
//			};
//		}
	});
	});
	
	function getPageTag(listType,tr){
		importJS('/js/jquery.qrcode.js');
		var page = $("<div />").addClass("printPage").appendTo(win);
		var list = getJSONData(DIAGNOSIS_GET_LIST_URL,{tag:Math.random(),visitId:currentVisit.id},"POST");
		var zhenduan='';
		$.each(list,function(i,n){
			zhenduan+=(n.eye?n.eye:'')+n.zdflname+(parseInt(n.confirmed)==0?'?':'');
			if(i!=list.length-1){
				zhenduan+="；";
			}
		});
		var exam_no;
		if(listType==CHUZHI_CATEGORY.otherExam){
			var jcxmId=$(tr).find('input[name=jcxmId]').val();
			var jiuzhenId=$("form#chuzhiForm_"+listType).find('input[name=jiuzhenId]').val();
			exam_no=getJSONData(exam_appoint_no_url,{jcxmId:jcxmId,jiuzhenId:jiuzhenId},'POST').obj;
		//	if(exam_no==null)exam_no=currentPatient.binglihao;

		}
		var test;
		if(listType==CHUZHI_CATEGORY.labTest){
			var jcxmId=$(tr).find('input[name=jcxmId]').val();
			var jiuzhenId=$("form#chuzhiForm_"+listType).find('input[name=jiuzhenId]').val();
			test=getJSONData(findExcuteDept,{jcxmId:jcxmId,jiuzhenId:jiuzhenId},'POST').obj;
		}
		var print_data={
				binglihao:currentPatient.binglihao,
				xingming:currentPatient.xingming,
				sex:currentPatient.sex,
				age:currentPatient.age,
				shouji:currentPatient.shouji,
				zhenduan:zhenduan,
				kdsj:getDatetime(),
				kdys:parent.window.currentStaff.xingming,
				chargeType:currentPatient.charge_type,
				keshi:"眼科门诊"};
	
	if(listType==CHUZHI_CATEGORY.otherExam)
		showWithHtmlTemplate("print_otherExam", print_data, page);
	 else if (listType == CHUZHI_CATEGORY.labTest){
		showWithHtmlTemplate("print_labTest", print_data, page);
	}else if (listType == CHUZHI_CATEGORY.prescribe
			&& ($(tr).find("td:eq(8)").text() == '便民药房'||$(tr).find("td:eq(8)").text() == '药品超市')) {
		page.addClass("ypcs");
		showWithHtmlTemplate("print_prescribe_bianmin", print_data, page);
	} else if(listType == CHUZHI_CATEGORY.prescribe
			&& $(tr).find("td:eq(8)").text() == '门诊西药房') {
		showWithHtmlTemplate("print_prescribe_xiyaofang", print_data, page);
	}else if(listType == CHUZHI_CATEGORY.operation){
			if(zhenduan&&zhenduan.length>=40){
				zhenduan=zhenduan.substring(0, 40)+'.....';
				print_data.zhenduan=zhenduan;
			}
			showWithHtmlTemplate("print_operation", print_data, page);
			page.children('h2').text('门诊手术申请单');
			
		}else{
		showWithHtmlTemplate("print_eyeExam", print_data, page);
		if(listType==CHUZHI_CATEGORY.Qg_operation)
			page.children('h2').text('屈光手术申请单');
		if(listType==CHUZHI_CATEGORY.treat)
			page.children('h2').text('眼科治疗申请单');
	}
		var jcxmId=$(tr).find('input[name=jcxmId]').val();
		if($("#jctsDiv_"+jcxmId+"_"+listType).find('input[id=jiajijiancha]').attr("checked")){
			page.find('div[id=isUrgent]').text('急');
		}
		$("td").css({'font-size':'14px'});
		if(listType==CHUZHI_CATEGORY.otherExam&&exam_no){
//			$(page.find(".qrcode")).qrcode({
//				render:"image",
//				size:55,
//				text:"ZOB"+currentPatient.binglihao
//			});
			var qrcode=getJSONData(qrcode_url,{text:"ZOB"+currentPatient.binglihao,width:90,height:90}).obj;
			page.find('.qrcode').append('<img src="'+contextPath+qrcode+'"/>');
		//	$(page.find(".qrcode")).append("<div style='float:left'>请扫描二维码<br/>进自助机缴费<div>");
			showBarcode(exam_no,$(page.find(".barcodeDiv")));
			$(page.find(".barcodeDiv")).css({"height":"65px"});
		}
		else if(listType==CHUZHI_CATEGORY.otherExam&&!exam_no){
			$.oimsAlert("无法生成条码，开单失败");
			  	if($("#printClose").length){
			  		$("#printClose").click();
			  	}
		}
		else if(listType==CHUZHI_CATEGORY.labTest&&!test.orderNo){
			$.oimsAlert("无法生成条码，开单失败");
		  	if($("#printClose").length){
		  		$("#printClose").click();
		  	}
		}
		
		else{
//			$(page.find(".qrcode")).qrcode({
//				render:"image",
//				size:45,
//				text:"ZOB"+currentPatient.binglihao
//			});
			var qrcode=getJSONData(qrcode_url,{text:"ZOB"+currentPatient.binglihao,width:90,height:90}).obj;
			page.find('.qrcode').append('<img src="'+contextPath+qrcode+'"/>');
			showBarcode(currentPatient.binglihao,page.find(".barcodeDiv"));
		}
		return page;
	}
	function getDatetime(){
		var date = new Date();
		var mounth = (date.getMonth() + 1) + "";
		if (mounth.length == 1)
			mounth = "0" + mounth;
		var day = date.getDate() + "";
		if (day.length == 1)
			day = "0" + day;
		var h = date.getHours() + "";
		if (h.length == 1)
			h = "0" + h;
		var m = date.getMinutes() + "";
		if (m.length == 1)
			m = "0" + m;
		var s = date.getSeconds() + "";
		if (s.length == 1)
			s = "0" + s;
		var str = date.getUTCFullYear() + "-" + mounth + "-" + day + " " + h + ":"
				+ m + ":" + s;
		return str;
}

}


function showTxt(func, showTag,_show){
	//showTag.html("<img src=\""+contextPath+"/images/waitting.gif\" width=\"22\" height=\"22\" />");
	var txt = func();
	if(!txt.length){
		setTimeout(function(){showTxt(func,showTag,_show)},1000);
		//showTxt(func,showTag,_show);
	}else{
		showTag.html(txt);
		var func = _show.data("func");
		eval('('+func+')');
	}
}
function getChuZhiItems(id){
	var form=$("#chuzhiForm_"+id);
	var table=form.children('table');
	var text='';
	//

	if(id!=CHUZHI_CATEGORY.prescribe){
		var result = getJSONData(FIND_ORDER_URL, {
			visitId : currentVisit.id,
			categoryId : id,
			jiaofei:null
		}, "POST");
		if (!result.state || !result.obj.length){
		}
		else{
			$.each(result.obj,function(i,n){
				text+=this.order.itemName;
				if(i!=result.obj.length-1){
					text+=";";
				}
			});
		}	
	}else{
		var re = getJSONData(FIND_CHUFANGQINDAN_URL, {
			jiuzhenId : currentVisit.id,
			jiaofei : null,
			tag : Math.random()
		});
		if (!re.state || !re.obj.length){
		}else{
			$.each(re.obj, function(i, d) {
				text+=d.yaopin.drugName+"&nbsp;"+d.yaopin.packageSpec+"&nbsp;"+d.cfqd.shuliang+d.yaopin.packageUnits+"&nbsp;每次"+d.cfqd.yongliang+d.yaopin.dosageUnit+"&nbsp;"+d.cfqd.yongfa+"&nbsp;"+d.cfqd.yongyaopinlv;
				if(i!=re.obj.length-1){
					text+=";<br>";
				}
			});
		}
	}
	if(id==CHUZHI_CATEGORY.treat){
		var k;
		if(currentVisit.treatMethod){
			switch(parseInt(currentVisit.treatMethod)){
			case 1:k='建议住院治疗';break;
			case 2:k='预约日间手术';break;
			case 3:k='预约门诊手术';break;
			}
			text+=k;
		}
	}
	return text;
}

function getChuzhiText(){
	var text = "";
	var tag = $("#patientExamDiv");
	if(!tag.length){
		var categoryId = 30004;
		_emr_inspection(categoryId);
		var st = DATA_TRANSMITTING;
		if(st.length){
			return text;
		}
		tag = $("#patientExamDiv");
	}
	tag = tag.children("form");
	$.each(tag.children("table"),function(i,table){
		var txt="";
		if($(this).prev().val()!=CHUZHI_CATEGORY.prescribe){
			var result = getJSONData(FIND_ORDER_URL, {
				visitId : currentVisit.id,
				categoryId : $(this).prev().val(),
				jiaofei:null
			}, "POST");
			if (!result.state || !result.obj.length){
			}
			else{
				if(parseInt($(this).prev().val())==CHUZHI_CATEGORY.eyeExam||parseInt($(this).prev().val())==CHUZHI_CATEGORY.treat){
					$.each(result.obj,function(i,n){
						var select;
						switch(parseInt(this.order.part)){
						case oimsCategory.DOUBLE_EYE:select="双眼";break;
						case oimsCategory.RIGHT_EYE:select="右眼";break;
						case oimsCategory.LEFT_EYE:select="左眼";break;
						}
						
						txt+=this.order.itemName+'('+select+')'+";";
					});
				}else{
					$.each(result.obj,function(i,n){
					
						txt+=this.order.itemName+";";
					});
				}
				
			}	
		}else{
			var re = getJSONData(FIND_CHUFANGQINDAN_URL, {
				jiuzhenId : currentVisit.id,
				jiaofei : null,
				tag : Math.random()
			});
			if (!re.state || !re.obj.length){
			}else{
				$.each(re.obj, function(i, d) {
					txt+=d.yaopin.drugName+"&nbsp;"+d.yaopin.packageSpec+"&nbsp;"+d.cfqd.shuliang+d.yaopin.packageUnits+"&nbsp;每次"+d.cfqd.yongliang+d.yaopin.dosageUnit+"&nbsp;"+d.cfqd.yongfa+"&nbsp;"+d.cfqd.yongyaopinlv+";";
				});
			}
		}
		text += txt;
	});
	if(currentVisit.treatResult){
		text +=currentVisit.treatResult+";";
	}
	var k='';
	if(currentVisit.treatMethod){
		switch(parseInt(currentVisit.treatMethod)){
		case 1:k='建议住院治疗';break;
		case 2:k='预约日间手术';break;
		case 3:k='预约门诊手术';break;
		}
		text+=k;
	}
	var end = text.substring(text.length-1, text.length);
	if(end=="；")text = text.substring(0,text.length-1);
	if(text.length)text += "。";
	var data = getSuifang();
	if(data!=null){
		if(data.yyrq){
			var g=getDaysEmr(formatDate(/*new Date()*/data.insertDate.time),formatDate(data.yyrq.time));
			var value;
			$.each(suifang_time,function(key,val){
				if(parseInt(key)==parseInt(g)){
					value=val;
					return false;
				}
			});
			text+="请于"+/* formatDate(data.yyrq.time) */value+"来本院复查。";
		}
		text+=data.zhuyi?(data.zhuyi):"";
	}
	return text;
}

function getZhenduanText(){
	var txt="";
	var table = $("#patientDiseaseDiv");
	if(!table.length){
		var categoryId = 30003;
		_emr_diagnose(categoryId);
		table = $("#patientDiseaseDiv");
	}
	table = table.find("table");
	$.each(table.find("tr"),function(i,tr){
		tr = $(tr);
		if(i==0)
			return true;
		else if(i>1){
			txt += "，";
		}
		var td = tr.children("td:first");
		var bm = td.text();
		td = td.next();
		var yb = td.children("select").val();
		td = td.next();
		txt += yb+bm;
		var qz = td.children("select").val();
		if(qz!=1) txt += "?";
	});
	return txt;
}

function getZKJCText(){
	var txt="";
	var table = $("#medicalRecordTab"+oimsCategory.TIGEMOBAN_CATEGORY_NAME);
	if(!table.length){
		//形成体格检查模版结构但未填充数据，但是视力以及眼压在方法中得意展示，其他的体格检查则没有
		_emr_physical(oimsCategory.TIGEMOBAN_CATEGORY_NAME);
//		var st = DATA_TRANSMITTING;
//		if(st.length){
//			//return txt;
//		}
		table = $("#medicalRecordTab"+oimsCategory.TIGEMOBAN_CATEGORY_NAME);
	}
	table = table.find("form").children("table");
	$.each(table.children('tbody').children('tr'),function(i,tr){
		if(txt.length){
			var end = txt.substring(txt.length-1, txt.length);
			if(end=="；")
				txt = txt.substring(0,txt.length-1);
			if(end!="。")txt+="。";
		}
		if(i<=3){
			
			var td = $(tr).children("td:first");
			if(i==0){
				return true;
			}else{
				if(i==1||i==2){
					var next = i==1?$(td).next():$(td);
					var v = $.trim(next.children("input").val());
					next = next.next();
					if(v.length)txt += "右眼"+next.children("span").text()+":"+v;
					v = $.trim(next.children("input").val());
					if(txt.length && v.length)txt+="；";
					if(v.length)txt += "左眼"+next.children("span").text()+":"+v;
				}
				else{
					var tr=$(td).children('table').find('tr');
					$.each(tr,function(i,n){
						if($(this).find('input').val())
							txt+="右眼"+$(this).find('span.eyeTitle').text()+":"+$(this).find('input').val()+";";
					})
					tr=$(td).next().children('table').find('tr');
					$.each(tr,function(i,n){
						if($(this).find('input').val())
							txt+="左眼"+$(this).find('span.eyeTitle').text()+":"+$(this).find('input').val()+";";
					})
					
				}
			}
		}else if(i==4){
			var t = "眼压：";
			var odtd = $(tr).children("td:first").next();
			var od0 = $.trim(odtd.find("input#yanyaJianchaOD").val());
			var od1 = odtd.find("div:eq(1) input").val();
			var methodOD=$('#yanyaMethodOD').val();
			switch(parseInt(methodOD)){
			case 1:methodOD="非接触";break;
			case 2:methodOD="回弹式";break;
			case 3:methodOD="修式";break;
			case 4:methodOD="Goldman";break;
			}
			if(od0.length)
				txt += "右眼"+t +od0+"mmHg("+methodOD+")";
			if(od1.length){
				txt+="右眼指测眼压:"+od1+"；";
			}
			var ostd = $(tr).children("td:last");
			var os0 = $.trim(ostd.find("input#yanyaJianchaOS").val());
			var os1 = ostd.find("div:eq(1) input").val();
			var methodOS=$('#yanyaMethodOS').val();
			switch(parseInt(methodOS)){
			case 1:methodOS="非接触";break;
			case 2:methodOS="回弹式";break;
			case 3:methodOS="修式";break;
			case 4:methodOS="Goldman";break;
			}
			if(os0.length)
				txt += "左眼"+t +os0+"mmHg("+methodOS+")";
			if(os1.length){
				txt+="左眼指测眼压:"+os1;
			}
			// 眼压
		}else
			txt += getTDText(tr);
	});
	return txt;
	
	function getTDText(tr){
		var txt = "";
		var td = $(tr).children("td:first");
		var t = td.text();
		var od = td.next();
		if(od.text().length && od.text()!="未见异常"&&od.text()!='见图示'){
			txt += "右眼"+t+"："+od.text().replace('见图示','');
		}
		if(txt.length)txt+="；"
		var os =  od.next();
		if(os.text().length && os.text()!="未见异常"&&od.text()!='见图示'){
			txt += "左眼"+t+"："+os.text().replace('见图示','');
		}
		return txt;
	}
}


function printOrders(combo){
	var	listType= $("#examListDiv .deptList a.selected").data("listType");
	if(/*listType!=CHUZHI_CATEGORY.treat && listType!=CHUZHI_CATEGORY.prescribe && listType!=CHUZHI_CATEGORY.eyeExam &&*/ currentVisit.haoma.toUpperCase().indexOf("OIMS")!=-1&&listType==CHUZHI_CATEGORY.labTest){
		$.oimsAlert("<p style='text-align:left; text-indent:2em'>因未找到患者的挂号信息，系统仅提供病历保存功能。请在医院系统中补开化验项目！</p>");
		return;
	}
	var page = null;
	var page1 = null;
//	var k=true;
	//筛选检查项目的打印数量ziduan
	var table = $("form.chuzhiForm:visible").children("table");
//	if(listType==CHUZHI_CATEGORY.otherExam){
//		$.each(table.find("tr"),function(i,tr){
//			if(i==0){
//				return true;
//			}
//			var jcxmId=$(tr).find('input[name=jcxmId]').val();
//			var jiuzhenId=table.find('input[name=jiuzhenId]').val();
//			exam_no=getJSONData(exam_appoint_no_url,{jcxmId:jcxmId,jiuzhenId:jiuzhenId},'POST').obj;
//			if(!exam_no) {
//				k=false;
//			}
//		});
//		
//	}
	var win = showPrintWindow();
	var x=false;
	var tag;
	var tag1;
	var th;
	var indexCash=[];
	var t;
	var t1;
	var sampleSort;
	var list = getJSONData(DIAGNOSIS_GET_LIST_URL,{tag:Math.random(),visitId:currentVisit.id},"POST");
	var zhenduan='';
	$.each(list,function(i,n){
		zhenduan+=(n.eye?n.eye:'')+n.zdflname+(parseInt(n.confirmed)==0?'?':'');
		if(i!=list.length-1){
			zhenduan+="；";
		}
	});
	$.each(table.find("tr"),function(i,tr){
		if(i==0){ 
			th=$(tr).clone();
			if(listType!=CHUZHI_CATEGORY.prescribe){
				if(listType==CHUZHI_CATEGORY.operation){
					th.prepend($('<th style="width:40px;"/>').text('类别'));
					$(th.find('th:eq(1)')[0]).after($('<th style="width:70px;"/>').text('单价'));
					th.append($('<th />').text('小计'));	
					th.find('th:last').prev().prev().width(50);
				}else{
					th.append($('<th />').text('执行科室'));	
				}
			}
			$.each(th.find('th'),function(){
				if(($(this).text()=='金额'&&listType!=CHUZHI_CATEGORY.Qg_operation)||$(this).text()=='库存'||$(this).text()=='药局'||$(this).text()=='生产厂商'){
					indexCash.push($(this).index());
					$(this).css({"display":"none"});
					return ;
				}
				else{
					$(this).css({"text-align":"left"});
				}
			});
			return true;
		}
		if(combo&&combo=="choose"){
			if(table.find("tr").hasClass("selected")){
				if(!$(this).hasClass("selected")){
					return true;
				}
			}
			else{
				return false;
			}
		}
		var dept = $(tr).find("input[name=excutiveDept]").val();
		
		var jcxmId=$(tr).find('input[name=jcxmId]').val();
		var jiuzhenId=$("form.chuzhiForm:visible").find('input[name=jiuzhenId]').val();
		if(listType==CHUZHI_CATEGORY.eyeExam){
			t=$("table.print_sheet_eye");
		}
		else if(listType==CHUZHI_CATEGORY.labTest){
			if(parseInt(dept)>=40&&parseInt(dept)<=47)
				t=$("table.print_sheet_59");
			else
				t=$("table.print_sheet_"+dept);
		}
		else{
			t=$("table.print_sheet_"+dept);
		}
		if(listType==CHUZHI_CATEGORY.labTest){
			sampleSort=$("table.sample_sheet_"+$(tr).find('select').val());
		}
		t1=$("table.print_sheet_"+dept+"1");
		if(listType==CHUZHI_CATEGORY.prescribe&&($(tr).find("td:eq(8)").text()=='便民药房'||$(tr).find("td:eq(8)").text()=='药品超市')){
			if(!t1.length){
				if(page1==null){
					page1 = getPageTag(listType,tr);
					tag1 = page1.find(".orderList");
					tag1.html("");
					t1=$("<table />").addClass("print_sheet_"+dept+"1").appendTo(tag1);
					th.clone().appendTo(t1);
				}else{
					page1 = page1.clone().appendTo(win);
				}
			}
		}else{
			if(listType==CHUZHI_CATEGORY.eyeExam){
				if(page==null){
					page = getPageTag(listType,tr);
					$("<div />").css("clear","both").prependTo(page);
					tag = page.find(".orderList");
					tag.html("");
					t=$("<table />").addClass("print_sheet_eye").appendTo(tag);
					th.clone().appendTo(t);
				}
			}
			else if(listType==CHUZHI_CATEGORY.labTest){
				//如果不是一个科室或者不是一个标本都要新建page
				var xm=$(tr).children("td:eq(0)").text();
				var num=$(tr).children("td:eq(1)").children('input').val();
				if(!t.length||!sampleSort.length){
						
						page = getPageTag(listType,tr);
						$("<div />").css("clear","both").prependTo(page);
						tag = page.find(".orderList");
						tag.html("");
						if(parseInt(dept)>=40&&parseInt(dept)<=47)
							t=$("<table />").addClass("print_sheet_59").addClass("sample_sheet_"+$(tr).find('select').val()).appendTo(tag);
						else
							t=$("<table />").addClass("print_sheet_"+dept).addClass("sample_sheet_"+$(tr).find('select').val()).appendTo(tag);
						var tr0=$("<tr/>").appendTo(t);
						$("<td style='width:100px;font-size:14px'/>").text("临床诊断：").appendTo(tr0);
						$("<td />").text(zhenduan).css({'font-size':'14px'}).appendTo(tr0);
						tr0=$("<tr/>").appendTo(t);
						$("<td style='width:100px;font-size:14px'/>").text("标本种类：").appendTo(tr0);
						var biaoben=$(tr).find('select').children("option[value=\""+$(tr).find('select').val()+"\"]").text();
						$("<td/>").text(biaoben).css({'font-size':'14px'}).appendTo(tr0);
						tr0=$("<tr/>").appendTo(t);
						$("<td style='width:100px;font-size:14px'/>").text("执行科室：").appendTo(tr0);
						var locationSelect=$('div#jctsDiv_'+jcxmId+'_'+CHUZHI_CATEGORY.labTest).find('select[name=zhixingkeshiSelected]');
						var location = locationSelect.children("option[value="+locationSelect.val()+"]").text();
						if(location.indexOf("检验科")!=-1){
							$("<td/>").text("检验科").css({'font-size':'14px'}).appendTo(tr0);
						}
						else{
							$("<td/>").text(location.substring(0,3)).css({'font-size':'14px'}).appendTo(tr0);
						}
						tr0=$("<tr/>").appendTo(t);
						$("<td style='width:100px;font-size:14px'/>").text("检验项目：").appendTo(tr0);
						var td;
						if(parseInt(dept)>=40&&parseInt(dept)<=47){
							td=$("<td  id=lis_59_"+$(tr).find('select').val()+"/>").appendTo(tr0);
						}else{
							td=$("<td  id=lis_"+dept+"_"+$(tr).find('select').val()+"/>").appendTo(tr0);
						}
						if(num==1){
							if($("#jcxmFushu_"+jcxmId).length){
								$.each($("#jcxmFushu_"+jcxmId).find("tr"),function(i){
									td.html(td.html()+"<br/>"+(i+1)+"."+"<span>"+$(this).find('td:eq(1)').text()+"</span>").css({'font-size':'14px'});
								});
							}
							else{
								td.html(1+"."+"<span>"+xm+"</span>").css({'font-size':'14px'});
							}
							
						}
						else{
							for(var i=0;i<num;i++){
								td.html(td.html()+"<br/>"+(i+1)+"."+"<span>"+xm+"</span>").css({'font-size':'14px'});
							}
						}
						
				}
				//以前同一个标本与同一执行科室的项目存在，则不需要新建
				else{
					var td=$("#lis_"+(parseInt(dept)>=40&&parseInt(dept)<=47?59:dept)+"_"+$(tr).find('select').val());
					var n=$(td).find('span').length;
					if(num==1){
						if($("#jcxmFushu_"+jcxmId).length){
							$.each($("#jcxmFushu_"+jcxmId).find("tr"),function(i){
								td.html(td.html()+"<br/>"+(n+i+1)+"."+"<span>"+$(this).find('td:eq(1)').text()+"</span>").css({'font-size':'14px'});
							});
						}
						else{
							td.html(td.html()+"<br/>"+(n+1)+"."+"<span>"+xm+"</span>").css({'font-size':'14px'});
						}
					}
					else{
						for(var i=0;i<num;i++){
							td.html(td.html()+"<br/>"+(i+n+1)+"."+"<span>"+xm+"</span>").css({'font-size':'14px'});
						}
					}
				}
				
			}
			else{
				if(!t.length||listType==CHUZHI_CATEGORY.otherExam){
					//如果没有这个部门的对应的page
						if(listType==CHUZHI_CATEGORY.otherExam){
							page = getPageTag(listType,tr);
							$("<div />").css("clear","both").prependTo(page);
						}
						else{
							if(page==null){
								page = getPageTag(listType,tr);
								$("<div />").css("clear","both").prependTo(page);
							}
							else
								page=page.clone().appendTo(win);
						}
						tag = page.find(".orderList");
						tag.html("");
						t=$("<table cellspacing=0 cellpadding=0 />").addClass("print_sheet_"+dept).appendTo(tag);
						if(listType==CHUZHI_CATEGORY.otherExam){
								var tr0=$("<tr/>").appendTo(t);
								var classandsubclass=getJSONData(findClassAndSubClass,{jcxmId:jcxmId},'POST').obj;
								var td0=$('<td style="width:80px;text-align:right"/>').appendTo(tr0);
								$(td0).text("检查类型：")
								td0=$('<td />').appendTo(tr0);
								$(td0).html((classandsubclass[0]?classandsubclass[0]:"")+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+(classandsubclass[1]?classandsubclass[1]:""));
								//执行机房
								tr0=$("<tr/>").appendTo(t);
								//EMRORDER中取（根据就诊ID与检查项目id，默认一个项目一次就诊只能做一次）
								var order=getJSONData(findExcuteDept,{jcxmId:jcxmId,jiuzhenId:currentVisit.id},'POST').obj;
								td0=$('<td style="width:80px;text-align:right"/>').appendTo(tr0);
								$(td0).text("执行机房：");
								td0=$('<td />').appendTo(tr0);
								$(td0).text(order?(order.callbackMessage?order.callbackMessage.split('$')[0]:''):'');
								// 临床诊断
								tr0=$("<tr />").appendTo(t);
								var diagnosis=getJSONData(DIAGNOSIS_GET_LIST_URL,{tag:Math.random(),visitId:currentVisit.id},'POST');
								var adviceHtml="";
								$.each(diagnosis,function(){
									adviceHtml += (this.eye?this.eye:'')+this.zdflname+(parseInt(this.confirmed)==0?'?':'')+'；';
								});
								td0=$('<td style="width:80px;text-align:right"/>').appendTo(tr0);
								$(td0).text("临床诊断：");
								td0=$('<td/>').appendTo(tr0);
								$(td0).text(adviceHtml);
								// 症状
								tr0=$("<tr />").appendTo(t);
								var zhusu=getJSONData(getJzjlByCategoryIdAndJiuzhenid,{categoryId:oimsCategory.WENZHENMOBAN_ZHUSHU,jiuzhenId:currentVisit.id},'POST').obj;
								td0=$('<td style="width:80px;text-align:right"/>').appendTo(tr0);
								$(td0).text("症状：");
								td0=$('<td/>').appendTo(tr0);
								$(td0).text(zhusu?zhusu[0].jilu:'');
								//附加说明
								tr0=$("<tr />").appendTo(t);
								var notice=$($(tr).find("input[name=note]")[0]).val();
								td0=$('<td style="width:80px;text-align:right"/>').appendTo(tr0);
								$(td0).text("附加说明：");
								td0=$('<td/>').appendTo(tr0);
								$(td0).text(notice?notice:'');
								// 检查项目
								tr0=$("<tr />").appendTo(t);
								td0=$('<td style="width:80px;text-align:right"/>').appendTo(tr0);
								$(td0).text("检查项目：");
								td0=$('<td/>').appendTo(tr0);
								$(td0).text($(tr).find('td:eq(0)').text());
								var bgsbm=getJSONData('/publish/bangongshi/getBanGongShiById.htm',{id:dept},'POST').obj.bgsBm;
								if(bgsbm=='4102'||bgsbm=='410201'||bgsbm=='410202'||bgsbm=='410203'||bgsbm=='410204'||bgsbm=='410205'||bgsbm=='410206'||bgsbm=='410230'){
									if(!tag.find('div.fsknote').length){
										$('<div  style="height:'+(296-8-32-$('table.print_sheet_'+dept).height())+'px;"/>').attr("id","fskdiv_"+dept).appendTo(tag);
										var div=$('<div  class="fsknote" style="height:32px"/>').appendTo(tag);
										div.css({'font-size':'13px'});
										//查找执行科室以及预约时间
										var zysx=getJSONData(getZYSX,{jcxmId:jcxmId,jiuzhenId:jiuzhenId,dept:dept,listType:listType},'POST').obj;
										div.append((zysx.scheduledDate?("请于"+formatDate(zysx.scheduledDate.time)+","):'')+(zysx.address?zysx.address:'')+"。").append("</br>放射科上下班时间为上午8:00-12:00，下午1:00-4:30,周末下午休息。夜间急诊病人请到门诊二楼北二区登记台联系值班医生");
									}
								}
								$('td').css({'font-size':'14px'});
								return true;
						}else{
							th.clone().appendTo(t);
						}
			}
//				else{
//					//如果有这个部门的对应page
//					if(listType==CHUZHI_CATEGORY.otherExam){
//						var tr0=$("<tr/>").appendTo(t);
//						var td0=$("<td/>").appendTo(t);
//						    td0=$("<td/>").appendTo(t);
//						td0.text($(tr).find('td:eq(0)').text());
//						$('td').css({'font-size':'14px'});
//						$("#fskdiv_"+dept).height(296-8-32-$('table.print_sheet_'+dept).height());
//						return true;
//					}
//				}
			}
		
		}
		if(listType==CHUZHI_CATEGORY.eyeExam||listType==CHUZHI_CATEGORY.treat||listType==CHUZHI_CATEGORY.Qg_operation||listType==CHUZHI_CATEGORY.operation){
			//如果检查项目是广角镜检查
//			var location='';
//			location=getJSONData(FIND_ZHIXING_KESHI_URL,{jcxmId:jcxmId}).obj;
			var url='/publish/bangongshi/getBanGongShiById.htm';
			var bgs_id=$("#jctsDiv_"+jcxmId+"_"+listType).find('select').val();
			var location=getJSONData(url,{id:bgs_id},'POST').obj;
			$.each($('table.jcxmFushu'),function(i,n){
				if($(this).attr('id').split('_')[1]==jcxmId){
					$.each($(this).find('tr'),function(){
						if(!$(this).find('input[type=checkbox]').attr('checked')){
							return true;
						}
						if(listType!=CHUZHI_CATEGORY.operation){
							if(t.find("tr").length>7||jcxmId==1000357||jcxmId==1000358){
								if($(this).attr('class').split("_")[1]==24007||$(this).attr('class').split("_")[1]==24009){
									var	cailiao_page=page.clone().appendTo(win);
									var cailiao_tag = cailiao_page.find(".orderList");
									cailiao_tag.html("");
									t.removeClass("print_sheet_"+(listType==CHUZHI_CATEGORY.eyeExam?'eye':dept));
								    t=$("<table cellspacing=0 cellpadding=0 />").addClass("print_sheet_"+dept).appendTo(cailiao_tag);
								    th.clone().appendTo(t);
								}
								else if(t.find("tr").length>7){
									t.removeClass("print_sheet_"+(listType==CHUZHI_CATEGORY.eyeExam?'eye':dept));
									page=null;
									if(page==null){
									page = getPageTag(listType,tr);
									$("<div />").css("clear","both").prependTo(page);
									tag = page.find(".orderList");
									tag.html("");
									t=$("<table cellspacing=0 cellpadding=0 />").addClass("print_sheet_"+(listType==CHUZHI_CATEGORY.eyeExam?'eye':dept)).appendTo(tag);
									th.clone().appendTo(t);
									}
								}
							}
						}else{
							if(t.find("tr").length>10){
								t.removeClass("print_sheet_"+(listType==CHUZHI_CATEGORY.eyeExam?'eye':dept));
								page=null;
								if(page==null){
								page = getPageTag(listType,tr);
								$("<div />").css("clear","both").prependTo(page);
								tag = page.find(".orderList");
								tag.html("");
								t=$("<table cellspacing=0 cellpadding=0 />").addClass("print_sheet_"+(listType==CHUZHI_CATEGORY.eyeExam?'eye':dept)).appendTo(tag);
								th.clone().appendTo(t);
								}
							
							}
						}
						
						//-----填充数据--------------------
						var tr0 = $("<tr/>").appendTo(t);
						//类别
						if(listType==CHUZHI_CATEGORY.operation){
							td0=$("<td />").appendTo(tr0);
							td0.css({"text-align":"left","font-size":"15px"});
							td0.text(item_class[$(this).data('pricecode').split("@")[0]]);
						}
						
						var td0 = $("<td />").appendTo(tr0);
						var temp="";
						td0.css({"text-align":"left","font-size":"15px"});
						td0.attr("nowrap","nowrap");
						//名称
						if($(this).index()==0){
							if((parseInt(jcxmId)>=1000007&&parseInt(jcxmId)<=1000014)||parseInt(jcxmId)==1000025||parseInt(jcxmId)==2005||parseInt(jcxmId)==1000335||$.inArray(parseInt(jcxmId),print_jcxm_differ)!=-1){
								if(parseInt(jcxmId)==1000025){
									temp="三面镜眼底检查(前房角镜检查)";
								}else if($.inArray(parseInt(jcxmId),print_jcxm_differ)!=-1){
									//temp="激光治疗青光眼(SLT)(视网膜多波长激光光凝)";
									temp=$(this).find('td:eq(1)').text()+"("+$(tr).children('td:eq(0)').text()+")";
								}
								else{
									temp=$(tr).children('td:eq(0)').text();
								}
							}
							if(listType==CHUZHI_CATEGORY.operation){
								td0.html((temp?temp:($(this).find('td:eq(1)').text()))+'&nbsp;&nbsp;&nbsp;&nbsp;'+$(this).data('pricecode').split("@")[2]);
								//诊室赋值
								tag.prev().children('span[id=location]').text(location.weizhi);
							}else{
								if(parseInt(jcxmId)>=1000001&&parseInt(jcxmId)<=1000004){
									td0.html((temp?temp:($(this).find('td:eq(1)').text()))+'&nbsp;&nbsp;&nbsp;&nbsp;'+$(this).data('pricecode').split("@")[2]);
								}else{
									td0.text(temp?temp:($(this).find('td:eq(1)').text()));
								}
								
							}
						}
						else{
							if(listType==CHUZHI_CATEGORY.operation)
								td0.html($(this).find('td:eq(1)').text()+'&nbsp;&nbsp;&nbsp;&nbsp;'+$(this).data('pricecode').split("@")[2]);// 组件的名字
							else
								td0.text(temp?temp:($(this).find('td:eq(1)').text()));
						}
						//单价
						if(listType==CHUZHI_CATEGORY.operation){
							td0=$("<td />").appendTo(tr0);
							td0.css({"text-align":"left","font-size":"15px"});
							td0.text($($(this).find('input:eq(0)')[0]).data('price'));
						}
						//数量
						td0=$("<td />").appendTo(tr0);
						td0.css({"text-align":"left","font-size":"15px"});
						td0.text($(this).find('td:eq(2)').find('input').val()*$(tr).find('input[name=count]').val());
						if(listType==CHUZHI_CATEGORY.operation){
							td0=$("<td />").appendTo(tr0);
							td0.css({"text-align":"left","font-size":"15px"});
							td0.attr("nowrap","nowrap");
							if($(this).index()==0){
								td0.text($(tr).find('select').find('option[value='+$(tr).find('select').val()+']').text());
							}
							//小计
							td0=$("<td />").appendTo(tr0);
							td0.css({"text-align":"left","font-size":"15px"});
							td0.attr("nowrap","nowrap");
							td0.text((parseFloat($($(this).find('input:eq(0)')[0]).data('price'))*parseFloat($($(this).find('input[name=suliang]')[0]).val())).toFixed(2));
						}else{
							if($(this).index()==0){
								//眼别
								td0=$("<td />").appendTo(tr0);
								td0.css({"text-align":"left","font-size":"15px"});
								td0.attr("nowrap","nowrap");
								td0.text($(tr).find('select').find('option[value='+$(tr).find('select').val()+']').text());
								//小计
								if(listType==CHUZHI_CATEGORY.Qg_operation){
									td0=$("<td />").appendTo(tr0);
									td0.css({"text-align":"left","font-size":"15px"});
									td0.attr("nowrap","nowrap");
									td0.text($(tr).find('input[name=money]').val());
								}
								//位置
								td0=$("<td />").appendTo(tr0);
								td0.css({"text-align":"left","font-size":"15px"});
								td0.attr("nowrap","nowrap");
								td0.text(location.weizhi);
							}
						}
						
					});
					$("<tr/>").append($('<td colspan="2" style="text-align: left; font-size: 15px;" nowrap="nowrap"/>').text('--------------------------------')).appendTo(t);
				}
			});
		}else if(listType==CHUZHI_CATEGORY.prescribe||listType==CHUZHI_CATEGORY.otherExam){
			var tr0;
			if(listType==CHUZHI_CATEGORY.prescribe&&($(tr).find("td:eq(8)").text()=='便民药房'||$(tr).find("td:eq(8)").text()=='药品超市')){
				tr0 = $("<tr />").appendTo(t1);
			}else{
				tr0 = $("<tr />").appendTo(t);
			}
			var s = $("#totalPrice");
			var totalPrice = (s.length && s.text().length)?parseFloat(s.text()):0;
			var tds = $(tr).children("td");
			for (var n = 0; n < tds.length; n++) {
				var td = tds[n];
					if(listType==CHUZHI_CATEGORY.prescribe && n==4){
						var price = parseFloat($(td).text());
						totalPrice=totalPrice+price;
					}
					if((listType==CHUZHI_CATEGORY.prescribe && n==$(tr).children("td").length)||containArray(indexCash,n)) continue;
					var td0 = $("<td />").appendTo(tr0);
					td0.css({"text-align":"left","font-size":"15px"});
					var input = $(td).children("input");
					if(input.length){
						if(listType==CHUZHI_CATEGORY.prescribe&&n==6){
							td0.text(input.val()+$(td).text());
							continue;
						}else{
							td0.text(input.val());
							continue;
						}
					}
					var select = $(td).children("select");
					if(select.length){
						var txt = select.children("option[value=\""+select.val()+"\"]").text();
						td0.text(txt);
						continue;
					}
					td0.text($(td).text());
			}
			$("#totalPrice").text(totalPrice.toFixed(2));
			//检验,科外加上执行科室
			if(/*listType==CHUZHI_CATEGORY.labTest||*/listType==CHUZHI_CATEGORY.otherExam){
				td0=$('<td/>').appendTo(tr0);
				td0.css({"text-align":"left","font-size":"15px"});
				var locationSelect=$('div#jctsDiv_'+jcxmId+'_'+listType).find('select[name=zhixingkeshiSelected]');
				var location = locationSelect.children("option[value="+locationSelect.val()+"]").text();
				if(listType==CHUZHI_CATEGORY.labTest){
					if(location.indexOf("检验科")!=-1){
						td0.text("检验科");
					}
					else{
						td0.text(location.substring(0,3));
					}
				}else{
					td0.text(location);
				}
			}
		} 
		if(listType==CHUZHI_CATEGORY.otherExam){
			$('div.orderList').children('div').css({'margin-top':($('div.orderList').height()-8*2-$('div.orderList').children('table').height()-30)});
		}
		if(listType==CHUZHI_CATEGORY.prescribe){
			if(t.find("tr").length>5){t.removeClass("print_sheet_"+dept);page=null;};
			if($(t1).find("tr").length>5){$(t1).removeClass("print_sheet_"+dept);page1 = null}
		}
		if(listType==CHUZHI_CATEGORY.labTest){
		}
//		else{
			//如果为特殊治疗分页打印材料
//			if(t.find("tr").length>7||jcxmId==1000357||jcxmId==1000358){
//				t.removeClass("print_sheet_"+(listType==CHUZHI_CATEGORY.eyeExam?'eye':dept));
//				page=null;
//			};
//		}
	});
	function getPageTag(listType,tr){
		importJS('/js/jquery.qrcode.js');
		var page = $("<div />").addClass("printPage").appendTo(win);
		var list = getJSONData(DIAGNOSIS_GET_LIST_URL,{tag:Math.random(),visitId:currentVisit.id},"POST");
		var zhenduan='';
		$.each(list,function(i,n){
			zhenduan+=(n.eye?n.eye:'')+n.zdflname+(parseInt(n.confirmed)==0?'?':'');
			if(i!=list.length-1){
				zhenduan+="；";
			}
		});
		var exam_no;
		if(listType==CHUZHI_CATEGORY.otherExam){
			var jcxmId=$(tr).find('input[name=jcxmId]').val();
			var jiuzhenId=$("form#chuzhiForm_"+listType).find('input[name=jiuzhenId]').val();
			exam_no=getJSONData(exam_appoint_no_url,{jcxmId:jcxmId,jiuzhenId:jiuzhenId},'POST').obj;
		//	if(exam_no==null)exam_no=currentPatient.binglihao;

		}
		var test;
		if(listType==CHUZHI_CATEGORY.labTest){
			var jcxmId=$(tr).find('input[name=jcxmId]').val();
			var jiuzhenId=$("form#chuzhiForm_"+listType).find('input[name=jiuzhenId]').val();
			test=getJSONData(findExcuteDept,{jcxmId:jcxmId,jiuzhenId:jiuzhenId},'POST').obj;
		}
		var print_data={
				binglihao:currentPatient.binglihao,
				xingming:currentPatient.xingming,
				sex:currentPatient.sex,
				age:currentPatient.age,
				shouji:currentPatient.shouji,
				zhenduan:zhenduan,
				kdsj:getDatetime(),
				kdys:parent.window.currentStaff.xingming,
				chargeType:currentPatient.charge_type,
				keshi:"眼科门诊"};
	
	if(listType==CHUZHI_CATEGORY.otherExam)
		showWithHtmlTemplate("print_otherExam", print_data, page);
	 else if (listType == CHUZHI_CATEGORY.labTest){
		showWithHtmlTemplate("print_labTest", print_data, page);
	}else if (listType == CHUZHI_CATEGORY.prescribe
			&& ($(tr).find("td:eq(8)").text() == '便民药房'||$(tr).find("td:eq(8)").text() == '药品超市')) {
		page.addClass("ypcs");
		showWithHtmlTemplate("print_prescribe_bianmin", print_data, page);
	} else if(listType == CHUZHI_CATEGORY.prescribe
			&& $(tr).find("td:eq(8)").text() == '门诊西药房') {
		showWithHtmlTemplate("print_prescribe_xiyaofang", print_data, page);
	}else if(listType == CHUZHI_CATEGORY.operation){
			if(zhenduan&&zhenduan.length>=40){
				zhenduan=zhenduan.substring(0, 40)+'.....';
				print_data.zhenduan=zhenduan;
			}
			showWithHtmlTemplate("print_operation", print_data, page);
			page.children('h2').text('门诊手术申请单');
			
		}else{
		showWithHtmlTemplate("print_eyeExam", print_data, page);
		if(listType==CHUZHI_CATEGORY.Qg_operation)
			page.children('h2').text('屈光手术申请单');
		if(listType==CHUZHI_CATEGORY.treat)
			page.children('h2').text('眼科治疗申请单');
	}
		var jcxmId=$(tr).find('input[name=jcxmId]').val();
		if($("#jctsDiv_"+jcxmId+"_"+listType).find('input[id=jiajijiancha]').attr("checked")){
			page.find('div[id=isUrgent]').text('急');
		}
		$("td").css({'font-size':'14px'});
		if((listType==CHUZHI_CATEGORY.otherExam&&exam_no)||listType==CHUZHI_CATEGORY.prescribe){
//			$(page.find(".qrcode")).qrcode({
//				render:"image",
//				size:55,
//				text:"ZOB"+currentPatient.binglihao
//			});
			var qrcode=getJSONData(qrcode_url,{text:"ZOB"+currentPatient.binglihao,width:90,height:90}).obj;
			page.find('.qrcode').append('<img src="'+contextPath+qrcode+'"/>');
	//		$(page.find(".qrcode")).append("<div style='float:left'>请扫描二维码<br/>进自助机缴费<div>");
			if(listType!=CHUZHI_CATEGORY.prescribe){
				showBarcode(exam_no,$(page.find(".barcodeDiv")));
			}else{
				showBarcode(currentPatient.binglihao,page.find(".barcodeDiv"));
			}
			$(page.find(".barcodeDiv")).css({"height":"65px"});
		}
		else if(listType==CHUZHI_CATEGORY.otherExam&&!exam_no){
			$.oimsAlert("无法生成条码，开单失败");
			  	if($("#printClose").length){
			  		$("#printClose").click();
			  	}
		}
		else if(listType==CHUZHI_CATEGORY.labTest&&!test.orderNo){
			$.oimsAlert("无法生成条码，开单失败");
		  	if($("#printClose").length){
		  		$("#printClose").click();
		  	}
		}
		
		else{
//			$(page.find(".qrcode")).qrcode({
//				render:"image",
//				size:45,
//				text:"ZOB"+currentPatient.binglihao
//			});
			var qrcode=getJSONData(qrcode_url,{text:"ZOB"+currentPatient.binglihao,width:90,height:90}).obj;
			page.find('.qrcode').append('<img src="'+contextPath+qrcode+'"/>');
			showBarcode(currentPatient.binglihao,page.find(".barcodeDiv"));
		}
		return page;
	
}
	function getDatetime(){
			var date = new Date();
			var mounth = (date.getMonth() + 1) + "";
			if (mounth.length == 1)
				mounth = "0" + mounth;
			var day = date.getDate() + "";
			if (day.length == 1)
				day = "0" + day;
			var h = date.getHours() + "";
			if (h.length == 1)
				h = "0" + h;
			var m = date.getMinutes() + "";
			if (m.length == 1)
				m = "0" + m;
			var s = date.getSeconds() + "";
			if (s.length == 1)
				s = "0" + s;
			var str = date.getUTCFullYear() + "-" + mounth + "-" + day + " " + h + ":"
					+ m + ":" + s;
			return str;
	}
}