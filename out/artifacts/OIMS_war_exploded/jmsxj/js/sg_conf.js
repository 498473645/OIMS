/*****************************悬浮层**************************************/
//悬浮层
function openFloatDiv_sg(id){
	if($("#floatDiv").attr("id")==undefined){
		var obj = $("#"+id); 
		var offset = obj.offset();
		var leftPosition = offset.left;
		var topPosition = offset.top+obj.height();
		var widthDiv = obj.width();
		var fatherDiv = $("#tabContent");
		var floatDiv = $("<div/>").attr("id","floatDiv").appendTo(fatherDiv);
		var tab="";
		if(id=="jy" || id=="jy"){
			$("#floatDiv").attr("style","width:"+(widthDiv-2)+"px;height:200px;z-index:9999;position:absolute;top:"+(topPosition-200-36)+"px;left:"+leftPosition+"px;border:1px solid #d2d2d2;overflow:auto;background:white;");
			tab = floatDivChild1_sg();
			$(floatDiv).append(tab);
		}
		if(id=="yongyao_r" || id=="yongyao_l"){
			$("#floatDiv").attr("style","width:"+(widthDiv-2)+"px;height:200px;z-index:9999;position:absolute;top:"+topPosition+"px;left:"+leftPosition+"px;border:1px solid #d2d2d2;overflow:auto;background:white;");
			tab = floatDivChild2_sg();
			$(floatDiv).append(tab);
		}
		if(id=="ys"){
			var cont = findQgSgConf_sg("qg_user");
			$("#floatDiv").attr("style","width:"+(widthDiv*2)+"px;height:200px;z-index:9999;position:absolute;top:"+(topPosition-200-20)+"px;left:"+leftPosition+"px;border:1px solid #d2d2d2;overflow:auto;background:white;");
			tab = floatDivChild3_sg();
			$(floatDiv).append(tab);
		}
		if(id=="yps"){
			var cont = findQgSgConf_sg("qg_user");
			$("#floatDiv").attr("style","width:"+(widthDiv*2)+"px;height:200px;z-index:9999;position:absolute;top:"+(topPosition-200-20)+"px;left:"+leftPosition+"px;border:1px solid #d2d2d2;overflow:auto;background:white;");
			tab = floatDivChild4_sg();
			$(floatDiv).append(tab);
		}
		if(id=="ygs"){
			var cont = findQgSgConf_sg("qg_user");
			$("#floatDiv").attr("style","width:"+(widthDiv*2)+"px;height:200px;z-index:9999;position:absolute;top:"+(topPosition-200-20)+"px;left:"+leftPosition+"px;border:1px solid #d2d2d2;overflow:auto;background:white;");
			tab = floatDivChild5_sg();
			$(floatDiv).append(tab);
		}
	}
	var floatLi = $("#floatDiv").find("li");
	$(floatLi).mouseover(function(){
		$(this).attr("style","background:#cfc5b2;");
	});
	$(floatLi).mouseout(function(){
		$(this).attr("style","background:;");
	});
	$(floatLi).click(function(){
		if(id=="ys" || id=="yps" || id=="ygs"){
			$("#"+id).val("");
		}
		var beforeVal = $("#"+id).val();
		var showVal = "";
		if(beforeVal==""){
			showVal = $(this).text();
		}else{
			if($("#"+id).val().indexOf("（")==($("#"+id).val().length-1) || $(this).text().indexOf("）")==0 ){
				showVal = beforeVal+""+$(this).text();	
			}else{
				showVal = beforeVal+"，"+$(this).text();	
			}
		}
		if(id=="ys" || id=="yps" || id=="ygs"){
			var vals = showVal.split("/");
			var xingming_sg = "";
			var gonghao_sg = "";
			if(vals!=null && vals.length==2){
				xingming_sg = vals[0];
				gonghao_sg = vals[1];
			}
			$("#"+id).val(xingming_sg);
			$("#"+id+"_sg").val(gonghao_sg);
		}else{
			$("#"+id).val(showVal);	
		}
		
		closeFloatDiv();
		$("#"+id).focus();
	});
}
function closeFloatDiv_sg(){
	$("#floatDiv").remove();
}
//术后复查-主述
function floatDivChild1_sg(){
	var cont=findQgSgConf_sg("sg_ysjy");
	var tab = "<div style='width:100%;height:20px;margin-top:0px;background:#d2d2d2;text-align:center;cursor:pointer;' onclick='closeFloatDiv();'>关闭</div>" +
			"<div style='width:100%;height:170px;line-height:18px;background:#;margin-top:10px;'>" +
				"<ul>";
//					"<li>可以配戴</li>" +
//					"<li>治疗后复查</li>" +
//					"<li>暂不配戴 </li>" +
//					"<li>用药下配戴 </li>" +
			tab+=cont.resStr;
			tab+="</ul>" +
			"<div>"
			;
	return tab;
}
//术后复查-主述
function floatDivChild2_sg(){
	var cont=findQgSgConf_sg("sg_fczs");
	var tab = "<div style='width:100%;height:20px;margin-top:0px;background:#d2d2d2;text-align:center;cursor:pointer;' onclick='closeFloatDiv();'>关闭</div>" +
	"<div style='width:100%;height:170px;line-height:18px;background:#;margin-top:10px;'>" +
				"<ul>";
//					"<li>人工泪液</li>" +
//					"<li>上皮修复</li>" +
//					"<li>抗生素</li>" +
//					"<li>抗过敏</li>" +
//					"<li>滴眼液</li>" +
				tab+=cont.resStr;
				tab+="</ul>" +
				"<div>";
	return tab;
}
//病历-医师
function floatDivChild3_sg(){
	var cont = findQgSgConf_sg("qg_user");
	var tab = "<div style='width:100%;height:20px;margin-top:0px;background:#d2d2d2;text-align:center;cursor:pointer;' onclick='closeFloatDiv();'>关闭</div>" +
	"<div style='width:100%;height:170px;line-height:18px;background:#;margin-top:10px;'>" +
				"<ul>";
//					"<li>汪辉</li>" +
//					"<li>熊洁</li>" +
//					"<li>张晨星</li>" +
//					"<li>胡春明</li>" +
			tab+=findYiShi();
			tab+=cont.resStr;
			tab+="</ul>" +
			"<div>";
	return tab;
}
//病历-验配师
function floatDivChild4_sg(){
	var cont = findQgSgConf_sg("sg_user");
	var tab = "<div style='width:100%;height:20px;margin-top:0px;background:#d2d2d2;text-align:center;cursor:pointer;' onclick='closeFloatDiv();'>关闭</div>" +
	"<div style='width:100%;height:170px;line-height:18px;background:#;margin-top:10px;'>" +
				"<ul>";
//					"<li>周素君</li>" +
//					"<li>王科</li>" +
//					"<li>王娅</li>" +
//					"<li>陈红雨</li>" +
//					"<li>刘波</li>" +
//					"<li>聂亚梅</li>" +
//					"<li>王菁</li>" +
//					"<li>吴小林</li>" +
//					"<li>冉莉</li>" +
					tab+=findYpsShi();
					tab+=cont.resStr;
					tab+="</ul>" +
					"<div>";
	return tab;
}
//病历-验光师
function floatDivChild5_sg(){
	var cont = findQgSgConf_sg("sg_user");
	var tab = "<div style='width:100%;height:20px;margin-top:0px;background:#d2d2d2;text-align:center;cursor:pointer;' onclick='closeFloatDiv();'>关闭</div>" +
	"<div style='width:100%;height:170px;line-height:18px;background:#;margin-top:10px;'>" +
				"<ul>";
//					"<li>周素君</li>" +
//					"<li>王科</li>" +
//					"<li>王娅</li>" +
//					"<li>陈红雨</li>" +
//					"<li>刘波</li>" +
//					"<li>聂亚梅</li>" +
//					"<li>王菁</li>" +
//					"<li>吴小林</li>" +
//					"<li>冉莉</li>" +
	tab+=findYpsShi();
	tab+=cont.resStr;
	tab+="</ul>" +
	"<div>";
	return tab;
}


















function getUser1_sg(gonghao){
	var ygdata = null;
	var xingming = '';
	if(gonghao!=null && gonghao!=''){
		ygdata = getJSONData("/publish/yuangong/findYuangongByGonghao1.htm", {gonghao:gonghao,tag : Math.random()}, "post");
		if(ygdata!=null && ygdata.obj!=null){
			var data = ygdata.obj;
			xingming = data.xingming;
		}
	}
	return xingming;
}
//读配置表
function findQgSgConf_sg(tag){
	var resStr = '';
	var resCount = 0;
	var data = getJSONData('/publish/quguang/findQgSgConf.htm',{tag:tag},'POST');
	if(data!=null){
		var dataList = data.obj;
		resCount = dataList.length;
			$.each(dataList,function(i,item){
				 resStr += "<li>"+item.cont+"</li>";
			});
	}
	var temp = {};
	temp.resStr = resStr;
	temp.resCount = resCount;
	return temp;
}
/**********************************医师（屈光医生） 开始*************************************/
//屈光员工
function findQgYgList_sg(){
	var data = getJSONData('/publish/quguang/findYuanGongList.htm',{},'POST');
	if(data!=null){
		return data.obj;
	}else{
		return null;
	}
}
//医生（屈光医生）
function findYiShi(){
	var tab = "";
	var ygList = findQgYgList_sg();
	$.each(ygList,function(i,item){
		var aa = "<li>"+item.xingming+"/"+item.gonghao+"</li>";
		tab = tab+aa;	
	});
	return tab;
}
/******************验配师 开始********************/
//角膜塑形镜医生
function findSgYgList_sg(){
	var data = getJSONData('/publish/shiGuang/findYuanGongList.htm',{},'POST');
	if(data!=null){
		return data.obj;
	}else{
		return null;
	}
}
//验配师（角膜塑形镜医生）
function findYpsShi(){
	var tab = "";
	var ygList = findSgYgList_sg();
	$.each(ygList,function(i,item){
		var aa = "<li>"+item.xingming+"/"+item.gonghao+"</li>";
		tab = tab+aa;	
	});
	return tab;
}
/******************验配师 结束********************/


function sgYs(){//角膜塑形镜医生
	var tab = "";
	var ygList = findQgYgList_sg();
	$.each(ygList,function(i,item){
		var aa = "<li>"+item.xingming+"/"+item.gonghao+"</li>";
		tab = tab+aa;	
	});
	return tab;
}
/************************************医师（屈光医生） 结束*************************************/
/**验配师、验光师 接**/
function getAutoValuesHeight_sg(count){
	var h = count*20+50;
	return h;
}
