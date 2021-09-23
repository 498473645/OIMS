var _emr_getprintdata_url = '/publish/emr/getprintdata.htm'; 
var _emr_input_itemsUrl = '/publish/emr/getitemsbyparentid.htm';
var getInspectPhotoUrl = '/publish/emr/getInspectPhoto.htm';
var orderlist_url = '/publish/emr/getorderlist.htm';
var updateTreatResult='/publish/emrOrder/updateTreatResult.htm';
var suifang_time={'1':'1日后','2':'2日后','3':'3日后','4':'4日后','5':'5日后','7':'一周后','14':'两周后','21':'三周后','28':'四周后','56':'八周后','84':'十二周后','182':'半年后','365':'一年后'};
var _emr_inquiry_categoryId = 30001;
var _emr_physical_categoryId = 30002;
function makeRecordEMR(jiuzhenId){
		var data = getJSONData(_emr_getprintdata_url,{visitId:jiuzhenId},'POST'); 
		var recordcontainer = $('<div class="emrHistoryRecord"/>');
		var div_new = $('<div class="record"/>').appendTo(recordcontainer).css({'height':'100%'});;
		$(makeRecord(data)).appendTo(div_new);
		//每个数组下面加上一个
		return recordcontainer;
}	

function makeRecord(data){
	var html = '';
	var records = data.records;
	/*视力*/
	var vision = data.vision;
	/*眼压*/
	var iop = data.iop;
	/*随访*/
	//var followup=data.followup;
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
					switch(iop.methodOS){
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
	adviceHtml += getChuZhiItems(CHUZHI_CATEGORY.otherExam);
	adviceHtml +='</td></tr>';
	adviceHtml +='<tr><th class="cell">化验</th><td class="cell txtleft">';
	adviceHtml += getChuZhiItems(CHUZHI_CATEGORY.labTest);
	adviceHtml +='</td></tr>';
	adviceHtml +='</table>';
	
	
	/*处方*/
	adviceHtml +='<table class="recordInquriyTable">';
	adviceHtml += '<tr><th class="cell" style="width: 10%;">处方</th><td class="cell textleft" style="text-align:left;padding-left:2px;">';
	adviceHtml += getChuZhiItems(CHUZHI_CATEGORY.prescribe);
	adviceHtml += '</td></tr>';
	/*治疗*/
	adviceHtml += '<tr><th class="cell" style="width: 10%;">治疗</th><td class="cell textleft" style="text-align:left;padding-left:2px;">';
	adviceHtml += getChuZhiItems(CHUZHI_CATEGORY.treat);
	adviceHtml += '</td></tr>';
	/*治疗回调*/
	adviceHtml += '<tr><th class="cell" style="width: 10%;">治疗结果</th><td class="cell textleft" style="text-align:left;padding-left:2px;">';
	adviceHtml += '<textarea id="treat_result" style="width:100%,height:100%"/>';
	adviceHtml += '</td></tr>';
	/*随访*/
	var obj=getSuifang();
	adviceHtml += '<tr><th class="cell" style="width: 10%;">随访</th><td class="cell textleft" style="text-align:left;padding-left:2px;">';
	if(obj){
		adviceHtml +=obj.zhuyi?(obj.zhuyi):'';
		if(obj.yyrq){
			var g=getDaysEmr(formatDate(/*new Date()*/obj.insertDate.time),formatDate(obj.yyrq.time));
			if(g>0){
				var value;
				$.each(suifang_time,function(key,val){
					if(parseInt(key)==parseInt(g)){
						value=val;
						return false;
					}
				});
				adviceHtml+='请于'+/*formatDate(obj.yyrq.time)*/value+'来本院复查；&nbsp&nbsp&nbsp';
			}
		}
	//	adviceHtml +=((obj.yyrq?('请于'+/*formatDate(obj.yyrq.time)*/value+"来本院复查；&nbsp&nbsp&nbsp"):'')+(obj.zhuyi?(obj.zhuyi):''));
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
			pic += '<img style="height:150px;" src="..'+picPath+'?tag='+Math.random()+'"/>';
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
			var t=true;
			$.each(eyePDFBaoGao,function(){
				if(this.jcdid==jcdid){
					t=false;
					return false;
				}
				
			});
			if(t){
				eyePDFBaoGao.push({jcdid:jcdid,data_getPDFListByJcd:data_getPDFListByJcd,data_getReportListByJcd:data_getReportListByJcd});
			}
			return temp;
		}
		return adviceHtml;
	}
	function bingliyulan_clickReportButton(adviceHtml,jcdid,data_getPDFListByJcd,data_getReportListByJcd){
		adviceHtml+='<a id=\'spe'+jcdid+'\' style="width:15;height:20;float:left" ><span class="report" style="width :15px;height :20px;display :inline-block"></span></a>';
		return adviceHtml;
	}
	
}

function speClickPDF(jcdid,data_getPDFListByJcd,data_getReportListByJcd){
	//进来的时候判断有没有jcdid对应的pdfdiv
	if($("#BingLipdfDiv"+jcdid).length){
		if($("#BingLipdfDiv"+jcdid).is(":visible"))
			$("#BingLipdfDiv" + jcdid).slideUp();
		else
			$("#BingLipdfDiv" + jcdid).slideDown();
	}
	//没有jcdid对应的pdfdiv
	else{
		var position = $('#spe'+jcdid).position();
		var left = position.left;
		$("<div />").attr("id", "BingLipdfDiv" + jcdid).css({
			left : left,
			top : position.top + $('#spe'+jcdid).outerHeight() + 10,
			"float" : "left",
			"z-index" : "9999",
			"position" : "absolute",
			"display" : "block"
		}).addClass("BingLipdfDiv").appendTo($('#spe'+jcdid));
		var ul = $("<ul/>").appendTo("#BingLipdfDiv" + jcdid);
		bingliyulan_createPDFList(jcdid,jcdid, data_getPDFListByJcd);
		bingliyulan_createReportList(jcdid,jcdid, data_getReportListByJcd);
		function bingliyulan_createPDFList(jcdid, i, data_getPDFListByJcd){
			if (data_getPDFListByJcd.state) {
				var filelist = data_getPDFListByJcd.obj;
				var ul = $("#BingLipdfDiv" + i + " ul:eq(0)");
				$.each(filelist, function(i, data_PDF) {
					if ((i % 2 != 0)) {
						$(
								"<li><a href='" + contextPath + data_PDF
										+ "' target='_blank' >PDF报告" + i + "</a></li>")
								.addClass("ji").appendTo(ul);
					} else {
						$(
								"<li><a href='" + contextPath + data_PDF
										+ "' target='_blank' >PDF报告" + i + "</a></li>")
								.addClass("ou").appendTo(ul);
					}
				});
			}
		}
		function bingliyulan_createReportList(jcdid, i, data_getReportListByJcd){
			var jcd = data_getReportListByJcd.obj;
			if (jcd.state == 1) {
				var ul = $("#BingLipdfDiv" + i + " ul:eq(0)");
				var num = $("#BingLipdfDiv" + i + " ul li").length + 1;
				var li;
				if (num % 2 == 0) {
					li = $("<li><a>系统报告</a></li>").addClass("ji").appendTo(ul);
				} else {
					li = $("<li><a>系统报告</a></li>").addClass("ou").appendTo(ul);
				}
				$(li).click(function() {
					importJS("/js/manager/baogao/baogaoController.js");
					initCssAndJs_baogaoAll();
					seeReportButUpdate(jcd);
				});
			}

		}
	}
}


