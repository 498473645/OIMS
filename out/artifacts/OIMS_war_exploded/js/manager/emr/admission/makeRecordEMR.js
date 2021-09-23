var _emr_getprintdata_url = '/publish/emr/getprintdata.htm'; 
var _emr_input_itemsUrl = '/publish/emr/getitemsbyparentid.htm';
var _emr_inquiry_categoryId = 30001;
var _emr_physical_categoryId = 30002;
function makeRecordEMR(jiuzhenId,div){
	importJS("/js/manager/emr/admission/makeRecordEMR.js");
	importCSS("/js/manager/emr/css/emr.css");
	var data = getJSONData(_emr_getprintdata_url,{visitId:jiuzhenId},'POST'); 
	//div存在
	if(div){
		var m= $(makeRecord(data)).appendTo(div);
		return div;
	}else{
		var recordcontainer = $('<div class="recordcontainer"/>');
		var div_new = $('<div class="record"/>').appendTo(recordcontainer);
		var m=$(makeRecordEMR(data)).appendTo(div_new);
		return recordcontainer;
	}
	

function makeRecordEMR(data){

	var html = '';
	var records = data.records;
	/*视力*/
	var vision = data.vision;
	/*眼压*/
	var iop = data.iop;
	/*随访*/
	var followup=data.followup;
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
	physicalhtml += '<tr><th class="cell" rowspan="<!--体格检查-->" style="text-align:center;font-size: 14px;">体<br><br>格<br><br>检<br><br>查</th>';
	physicalhtml +='<th class="cell"  style="text-align:center;font-size:14px;">视力</th>';
	if(!vision){
		physicalhtml +='<td class="cell txtleft"></td>';
		physicalhtml +='<td class="cell txtleft"></td></tr>';
	}
	else{
		//右眼
		physicalhtml +='<td class="cell txtleft">裸眼视力:'+(vision.lr?vision.lr:'未查')+'<br>矫正视力:'+(vision.jzr ? vision.jzr : '未查')+'<br>近视力:'+(vision.jr ? vision.jr : '未查')+'</td>';
		//左眼
		physicalhtml +='<td class="cell txtleft">裸眼视力:'+(vision.ll?vision.ll:'未查')+'<br>矫正视力:'+(vision.jzl ? vision.jzl : '未查')+'<br>近视力:'+(vision.jl ? vision.jl : '未查')+'</td>';
	}
	
	
	$.each(physicalitems,function(i){
			if(i==physicalitems.length-1){
				physicalhtml +='<tr><th class="cell">眼压</th>';
				if(!iop){
					physicalhtml += '<td class="cell txtleft"></td>';
					physicalhtml += '<td class="cell txtleft"></td></tr>';
				}else{
					physicalhtml += '<td class="cell txtleft">'+(iop.od?iop.od:'')+'</td>';
					physicalhtml += '<td class="cell txtleft">'+(iop.od?iop.od:'')+'</td></tr>';
				}
			}
			var item = this.child;
			physicalhtml += '<tr><th class="cell">'+this.category+'</th>';
			physicalhtml += '<td class="cell txtleft" id="yanjian_r">'+findPhysicalResult(item[0].categoryid,records)+'</td>';
			physicalhtml += '<td class="cell txtleft" id="yanjian_l">'+findPhysicalResult(item[1].categoryid,records)+'</td></tr>';
	});
	var pic = '<tr><td rowspan="<!--图示-->">图示</td><td class="cell" colspan="2">';
	var picNum = 0;
	var picTotal = 0;
	for(var i=0;i<physicalitems.length;i++){
		var physicalitem = physicalitems[i];
		for(var j=0;j<physicalitem.child.length;j++){
			var picPath = findPaint(physicalitem.child[j].categoryid,records);
			if(picPath){
				picNum++;
				picTotal++;
				pic += '<div class="paint" style="float:'+(picNum==1?'left':'right')+'">';
				pic += '<img style="width:100%;height:100%;" src="..'+picPath+'"/>';
				pic += '<span style="position:absolute;left:0px;top:0px;">'+physicalitem.category+(j==0?'OD':'OS')+'</span></div>';
			}
		}
		if(picNum==2){
			picNum = 0;
			pic += '</td></tr>';
			physicalhtml += pic;
			pic = '<tr><td class="cell" colspan="3">';
		}
	}
	if(picTotal%2==1){
		pic += '</td></tr>';
		physicalhtml += pic;
	}
	//rowspan计算，另外加的两个一个是视力一个是眼压
	physicalhtml=physicalhtml.replace("<!--体格检查-->",(physicalitems.length+2)+((picTotal%2)?Math.ceil(picTotal/2):(picTotal/2)));
	physicalhtml=physicalhtml.replace("<!--图示-->",(picTotal%2)?Math.ceil(picTotal/2):(picTotal/2));
	physicalhtml += '</table>';
	html += physicalhtml;
	
	/**医嘱*/
	var adviceHtml = '<table class="recordInquriyTable">';
	/*诊断*/
	adviceHtml += '<tr><th class="cell" style="width: 10%;">诊断</th><td class="cell textleft">';
	$.each(data.diagnosis,function(){
		adviceHtml += '<a class="item" style="color:none;">'+this.zdflname+'；</a>';
	});
	adviceHtml += '</td></tr>';
	/*检查*/
	adviceHtml += '<tr><th class="cell" style="width: 10%;">检查</th><td class="cell textleft" id="inspectRecord">';
	$.each(data.inspect,function(){
		adviceHtml += '<a class="itemlink" value="'+this.inspectId+'" onclick="jcdPicture('+this.inspectId+');">'+this.inspectName+'</a>';
	});
	adviceHtml += '</td></tr>';
	/*治疗*/
	adviceHtml += '<tr><th class="cell" style="width: 10%;">治疗</th><td class="cell textleft">';
	adviceHtml += '<a class="item" style="color:none;">随访时间：'+(followup?followup.followed_time:'')+'；</a>';
	adviceHtml += '<a class="item" style="color:none;">注意事项：'+(followup?followup.content:'')+'；</a>';
	adviceHtml += '</td></tr>';
	/*处置*/
	adviceHtml += '<tr><th class="cell" style="width: 10%;">处置</th><td class="cell textleft">';
	$.each(data.handle,function(){
		adviceHtml += '<a class="item" style="color:none;">'+this.item_name+'；</a>';
	});
	adviceHtml += '</td></tr>';
	/*处方*/
	adviceHtml += '<tr><th class="cell" style="width: 10%;">处方</th><td class="cell textleft">';
	var prescription = data.prescription;//getJSONData();
	$.each(prescription,function(){
		adviceHtml += '<p class="item" align="left">'+this.drugName+'<span style="margin-left:20px;">'+this.drugSpec+this.firmId+'</span>'+'<span style="margin-left:20px;">×'+this.amount+this.units+'</span>'+'<span style="margin-left:20px;">'+this.dosage+this.dosageUnits+'</span>'+'<span style="margin-left:20px;">'+this.administration+'</span>'+'<span style="margin-left:20px;">'+this.frequency+'</span>'+'</p>';
	});
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
	
}
}