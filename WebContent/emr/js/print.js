var _emr_getprintdata_url= '/publish/emr/getprintdata.htm';
var _emr_input_itemsUrl='/publish/emr/getitemsbyparentid.htm';
var _emr_inquiry_categoryId = 30001;
var _emr_physical_categoryId = 30002;
function _emr_printRecord(){
	
	if($('#printFrame').length) $('#printFrame').remove();
	var printFrame = $('<iframe id="printFrame" name="printFrame" style="display:none;"/>').appendTo('body');
	var patient = getCurrentPatient(currentVisit.huanzheId);
	var data = getJSONData(_emr_getprintdata_url,{visitId:currentVisit.id},'POST');//患者所有需要打印的数据
	var html = getHtmlTemplate('print_history');
	html = html.replace('<!--treatmentoftype-->',currentVisit.zhenbie==2?'门诊':'急诊');
	html = html.replace('<!--page-->',"page1");
	html = html.replace('<!--date-->',formatDate(currentVisit.caozuoTime.time).substring(0,10));
	html = html.replace('<!--medicalNo-->',currentVisit.id);
	html = html.replace('<!--name-->',patient.xingming);
	html = html.replace('<!--sex-->',patient.xingbie?'男':'女');
	html = html.replace('<!--age-->',_emr_calculteAge(formatDate(patient.shengri.time)));
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
	
	doPrintPreview(win.document,'B5(JIS)',currentVisit.id);
	function getCurrentPatient(id){
		return getJSONData('/publish/huanZheXinXi/findHuanZheById.htm',{id:id},'POST').obj;
	};
	//生日转年龄插件
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
			handleStr+=data.followup.content?data.followup.content+";":'';
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
		if(vision.redtrs){
			visionStr += '右ETDRs：'+vision.redtrs+';';
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
		if(vision.ledtrs){
			visionStr += '左ETDRs：'+vision.ledtrs+';';
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