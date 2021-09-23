function LJManager(){
	//路径维护
	importCSS("/js/manager/emr/css/emr.css");
	importCSS("/emr/style.css");
	importCSS("/css/main.css");
	importCSS("/style/green/css/openWin.css");
	var div=$("<div class='recordcontainer'/>").appendTo($("#right"));
	var div0=$("<div class='record'/>").appendTo(div);
	var table=$("<table class='recordInquriyTable'>").appendTo(div0);
	var tr=$("<tr />").appendTo(table);
	var td=$("<td class='cell' style='width:25%;font-weight:700;font-size:16px;background-color:white;' rowspan=5/>").text("问诊").appendTo(tr);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;主诉");
	
	var tr=$("<tr/>").appendTo(table);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;现病史");
	
	var tr=$("<tr class='cell'/>").appendTo(table);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;既往史");
	
	var tr=$("<tr class='cell'/>").appendTo(table);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;过敏史");
	
	var tr=$("<tr class='cell'/>").appendTo(table);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;家族史");

	var table=$("<table class='recordInquriyTable'>").appendTo(div0);
	var tr=$("<tr />").appendTo(table);
	var td=$("<td class='cell' style='width:25%;text-align:center;font-weight:700;font-size:16px;background-color:white;' rowspan=16/>").text("专科检查").appendTo(tr);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;视力");
	
	var tr=$("<tr class='cell'/>").appendTo(table);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;眼压");
	
	var tr=$("<tr class='cell'/>").appendTo(table);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;眼位");
	
	var tr=$("<tr class='cell'/>").appendTo(table);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;眼球运动");
	
	var tr=$("<tr class='cell'/>").appendTo(table);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;眼睑");
	
	var tr=$("<tr class='cell'/>").appendTo(table);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;泪器");
	
	var tr=$("<tr class='cell'/>").appendTo(table);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;结膜");
	
	var tr=$("<tr class='cell'/>").appendTo(table);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;巩膜");
	
	var tr=$("<tr class='cell'/>").appendTo(table);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;角膜");
	
	var tr=$("<tr class='cell'/>").appendTo(table);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;前房");
	
	var tr=$("<tr class='cell'/>").appendTo(table);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;虹膜");
	
	var tr=$("<tr class='cell'/>").appendTo(table);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;瞳孔");
	
	var tr=$("<tr class='cell'/>").appendTo(table);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;晶体");
	
	var tr=$("<tr class='cell'/>").appendTo(table);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;玻璃体");
	
	var tr=$("<tr class='cell'/>").appendTo(table);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;眼底");
	
	var tr=$("<tr class='cell'/>").appendTo(table);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;眼眶");
	
	var table=$("<table class='recordInquriyTable'>").appendTo(div0);
	var tr=$("<tr />").appendTo(table);
	var td=$("<td class='cell' style='width:25%;text-align:center;font-weight:700;font-size:16px;background-color:white;'/>").text("诊断").appendTo(tr);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;诊断");
	
	var table=$("<table class='recordInquriyTable'>").appendTo(div0);
	var tr=$("<tr />").appendTo(table);
	var td=$("<td class='cell' style='width:25%;text-align:center;font-weight:700;font-size:16px;background-color:white;' rowspan=6/>").text("处置").appendTo(tr);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;特检");
	
	var tr=$("<tr class='cell'/>").appendTo(table);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;科外");
	
	var tr=$("<tr class='cell'/>").appendTo(table);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;化验");
	
	var tr=$("<tr class='cell'/>").appendTo(table);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;治疗");
	
	var tr=$("<tr class='cell'/>").appendTo(table);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;处方");
	
	var tr=$("<tr class='cell'/>").appendTo(table);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;手术");
	
	var table=$("<table class='recordInquriyTable'>").appendTo(div0);
	var tr=$("<tr />").appendTo(table);
	var td=$("<td class='cell' style='width:25%;text-align:center;font-weight:700;font-size:16px;background-color:white;' />").text("随访").appendTo(tr);
	td=$("<td class='cell txtleft'/>").appendTo(tr);
	var input=$("<input type='checkbox' style='width:15px;height:15px'/>").appendTo(td);
	td.append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;随访");
	
	var table=$("<table class='recordInquriyTable'>").appendTo(div0);
	var tr=$("<tr />").appendTo(table);
	var td=$("<td class='cell' style='width:100%;text-align:center;font-weight:700;' />").appendTo(tr);
	var div_sub=$("<div class='openbutton'/>").appendTo(td);
	var a=$('<a/>').append($("<span />").text("提交")).appendTo(div_sub);
	 a=$('<a/>').append($("<span />").text("重置")).appendTo(div_sub);
}