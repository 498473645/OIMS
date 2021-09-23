$(function(){
	initBaoGao(hzid,jzid);
});

//创建报告需要的各个检查项目的table
var bg_jibenxinxi = "";
var bg_tgjc = "";
var bg_yanya = "";
var bg_quguang = "";
var bg_pchao = "";
var bg_achao = "";


var infoData;
//得到报告所需数据
function initBaoGao(hzid,jzid){
	infoData = getJSONData("/publish/child/findHzxxById.htm", {
		huanzheid : hzid, // 患者id
		jiuzhenid : jzid, // 就诊id
		tag : Math.random()
	}, "post");
	if (infoData.state) {
		info = infoData.obj;
	
	bg_jibenxinxi +="<table width='56%' height='107' border='0'>"
				  +	 "<tr>"
				  +	 "<td colspan='4'><div align='center'><strong>基本信息</strong></div></td>"
			 	  +  "</tr>"
				  +	 "<tr>"
				  +	 "<td width='20%' nowrap='nowrap'><div align='right'>姓名:</div></td>"
				  +	 "<td width='28%'>"+info.hzxx.xingming+"</td>"
				  +	 "<td width='20%' nowrap='nowrap'><div align='right'>病历号:</div></td>"
				  +	 "<td width='28%'>"+info.hzxx.binglihao+"</td>"
				  +	 "</tr>"
				  +	 "<tr>"
				  +  "<td nowrap='nowrap'><div align='right'>出生日期:</div></td>"
				  +	 "<td>"+time(info.hzxx.shengri).format_yyyy_mm_dd()+"</td>"
				  +	 "<td nowrap='nowrap'><div align='right'>性别:</div></td>"
				  +  "<td>"+(info.hzxx.xingbie==true?"男":"女")+"</td>"
				  +  "</tr></table><hr width='58%'/>" ;
	}	  
	//发起请求 获取体格检查数据
    var tgjcData =getJSONData("/publish/child/findTGJC.htm",
				{	huanzheid:hzid,
    				jiuzhenid:jzid,
    				tag:Math.random()
    			},"POST");
	
	if(tgjcData.obj.tgjc60101 != null){
		bg_tgjc += "<table width='56%' height='210' border='0'>"
				+  "<tr>"
				+  "<th colspan='4' scope='col'>体格检查信息</th>"
				+  "</tr><tr>"
				+  "<td width='26%'><div align='right'>右眼角膜：</div></td>"
				+  "<td width='24%'><div align='center'>"+tgjcData.obj.tgjc60101+"</div></td>"
				+  "<td width='26%'><div align='right'>右眼结膜：</div></td>"
				+  "<td width='24%'><div align='center'>"+tgjcData.obj.tgjc60102+"</div></td></tr>"
				+  "<tr>"
				+  "<td><div align='right'>右眼晶体：</div></td>"
				+  "<td><div align='center'>"+tgjcData.obj.tgjc60103+"</div></td>"
				+  "<td><div align='right'>右眼玻璃体：</div></td>"
				+  "<td><div align='center'>"+tgjcData.obj.tgjc60104+"</div></td></tr>"
				+  "<tr>"
				+  "<td><div align='right'>右眼视网膜：</div></td>"
				+  "<td><div align='center'>"+tgjcData.obj.tgjc60105+"</div></td>"
				+  "<td><div align='right'>右眼视盘：</div></td>"
				+  "<td><div align='center'>"+tgjcData.obj.tgjc60106+"</div></td></tr>"
				+  "<tr>"
				+  "<td><div align='right'>左眼角膜：</div></td>"
				+  "<td><div align='center'>"+tgjcData.obj.tgjc60107+"</div></td>"
				+  "<td><div align='right'>左眼结膜：</div></td> "
				+  "<td><div align='center'>"+tgjcData.obj.tgjc60108+"</div></td></tr>"
				+  "<tr>" 
				+  "<td><div align='right'>左眼晶体：</div></td>"
				+  "<td><div align='center'>"+tgjcData.obj.tgjc60109+"</div></td>"
				+  "<td><div align='right'>左眼玻璃体：</div></td>"
				+  "<td><div align='center'>"+tgjcData.obj.tgjc60110+"</div></td></tr>"
				+  "<tr>"
				+  "<td><div align='right'>左眼视网膜：</div></td>"
				+  "<td><div align='center'>"+tgjcData.obj.tgjc60111+"</div></td>"
				+  "<td><div align='right'>左眼视盘：</div></td>"
				+  "<td><div align='center'>"+tgjcData.obj.tgjc60112+"</div></td></tr></table><p></p>";
	}		
			
	var yanYaData =getJSONData("/publish/child/getYanYaList.htm",
				{	search:jzid,
					currentPage : 1,
					pageSize : 1000000000,
    				tag:Math.random()
    			},"POST");
	
	if(yanYaData.list != ""){
		bg_yanya += "<table width='56%' height='109' border='0'>"
			 +  "<tr>"
			 +  "<th colspan='3' scope='col'>眼压检查信息</th></tr>"
			 +  "<tr>"
			 +  "<td width='33%'><div align='center'>病历号</div></td>"
			 +  "<td width='33%'><div align='center'>左眼</div></td>"
			 +  "<td width='34%'><div align='center'>右眼</div></td></tr>";
		$.each(yanYaData.list,function(m,data){			
			bg_yanya += "<tr>"
					 +  "<td><div align='center'>"+data.blh+"</div></td>"
					 +  "<td><div align='center'>"+data.os+"</div></td>"
					 +  "<td><div align='center'>"+data.od+"</div></td>"
					 +  "</tr>";
		});
		bg_yanya +="</table>";
	}
	var quguangData =getJSONData("/publish/child/findQuGuang.htm",
			{	huanzheID:hzid,
				jiuzhenID:jzid,
				currentPage : 1,
  				pageSize : 1,
				tag:Math.random()
			},"POST");
	
	//将数据填充到表格中
	if(quguangData.list != null){
		$.each(quguangData.list,function(m,data){
			bg_quguang += "<table width='56%' height='200' border='0'>"
					   +  "<tr>"
					   +  "<th colspan='3' scope='col'>屈光检查信息</th></tr>"
					   +  "<tr>"
					   +  "<td width='21%'><div align='center'></div></td>"
					   +  "<td width='38%'><div align='center'>左眼</div></td>"
					   +  "<td width='41%'><div align='center'>右眼</div></td></tr>"
					   +  "<tr>"
					   +  "<td><div align='right'>球径:</div></td>"
					   +  "<td><div align='center'>"+data.ls+"</div></td>"
					   +  "<td><div align='center'>"+data.rs+"</div></td></tr>"
					   +  "<tr>"
					   +  "<td><div align='right'>柱径:</div></td>"
					   +  "<td><div align='center'>"+data.lc+"</div></td>"
					   +  "<td><div align='center'>"+data.rc+"</div></td></tr>"
					   +  "<tr>"
					   +  "<td><div align='right'>轴度:</div></td>"
					   +  "<td><div align='center'>"+data.la+"</div></td>"
					   +  "<td><div align='center'>"+data.ra+"</div></td></tr>"
					   +  "<tr>"
					   +  "<td><div align='right'>可信度:</div></td>"
					   +  "<td><div align='center'>"+data.l+"</div></td>"
					   +  "<td><div align='center'>"+data.r+"</div></td></tr></table>";
		});		   
	}
	var pchaoData =getJSONData("/publish/child/findPchaoList.htm",
			{	huanzheId:hzid,
				jiuzhenId:jzid,
				currentPage : 1,
  				pageSize : 1,
				tag:Math.random()
			},"POST");
	
	if(pchaoData.list != null){
		$.each(pchaoData.list,function(m,data){
			bg_pchao += "<table width='56%' height='200' border='0'>"
					 +  "<tr>"
					 +  "<th colspan='3' scope='col'>P超检查信息</th></tr>"
					 +  "<tr>"
					 +  "<td width='21%'><div align='center'></div></td>"
					 +  "<td width='38%'><div align='center'>左眼</div></td>"
					 +  "<td width='41%'><div align='center'>右眼</div></td></tr>"
					 +  "<tr>"
					 +  "<td><div align='right'>第一次:</div></td>"
					 +  "<td><div align='center'>"+data.s1+"</div></td>"
					 +  "<td><div align='center'>"+data.d1+"</div></td></tr>"
					 +  "<tr>"
					 +  "<td><div align='right'>第二次:</div></td>"
					 +  "<td><div align='center'>"+data.s2+"</div></td>"
					 +  "<td><div align='center'>"+data.d2+"</div></td></tr>"
					 +  "<tr>"
					 +  "<td><div align='right'>第三次:</div></td>"
					 +  "<td><div align='center'>"+data.s3+"</div></td>"
					 +  "<td><div align='center'>"+data.d3+"</div></td></tr>"
					 +  "<tr>"
					 +  "<td><div align='right'>平均值:</div></td>"
					 +  "<td><div align='center'>"+data.save+"</div></td>"
					 +  "<td><div align='center'>"+data.dave+"</div></td></tr></table>";
			
		});
	}	
	var achaoData =getJSONData("/publish/child/findAchaoList.htm",
			{	huanzheId:hzid,
				jiuzhenId:jzid,
				currentPage : 1,
  				pageSize : 1,
				tag:Math.random()
			},"POST");
	
	if(achaoData.list != null){
		$.each(achaoData.list,function(m,data){
			bg_achao += "<table width='56%' height='200' border='0'>"
					 +  "<tr>"
					 +  "<th colspan='3' scope='col'>A超检查信息</th></tr>"
					 +  "<tr>"
					 +  "<td width='21%'><div align='center'></div></td>"
					 +  "<td width='38%'><div align='center'>左眼</div></td>"
					 +  "<td width='41%'><div align='center'>右眼</div></td></tr>"
					 +  "<tr>"
					 +  "<td><div align='right'>a:</div></td>"
					 +  "<td><div align='center'>"+data.osa+"</div></td>"
					 +  "<td><div align='center'>"+data.oda+"</div></td></tr>"
					 +  "<tr>"
					 +  "<td><div align='right'>l:</div></td>"
					 +  "<td><div align='center'>"+data.osl+"</div></td>"
					 +  "<td><div align='center'>"+data.odl+"</div></td></tr>"
					 +  "<tr>"
					 +  "<td><div align='right'>v:</div></td>"
					 +  "<td><div align='center'>"+data.osv+"</div></td>"
					 +  "<td><div align='center'>"+data.odv+"</div></td></tr>"
					 +  "<tr>"
					 +  "<td><div align='right'>al:</div></td>"
					 +  "<td><div align='center'>"+data.osal+"</div></td>"
					 +  "<td><div align='center'>"+data.odal+"</div></td></tr></table><hr width='58%'/>";
			
		});
	}
	//创建选择出报告检查项目的div
	var xm_div = $("<div/>").attr("id","xmDiv");
	xm_div.oimsDialog({
		width:600,
		height:260,
		title:"请选择项目出报告",
		winType:4,
		locked:false,
		closeButton:true
	});
	
	//创建选择出报告的检查项目table
	var xm_table = "<div align='center'>";
	xm_table += "<table width='100%' height='150' border='0'><tr><td width='30%'><div align='right'>体格检查：</div></td>";
	xm_table += "<td width='8%'><div align='left'><input type='checkbox' name='xm' value='tgjc' /><div/></td>";
	xm_table += "<td width='20%'><div align='right'>眼压：</div></td>";
	xm_table += "<td width='30%'><div align='left'><input type='checkbox' name='xm' value='yy' /><div/></td>";
	xm_table += "</tr>";
	xm_table += "<tr><td><div align='right'>A超：</div></td>";
	xm_table += "<td><div align='left'><input type='checkbox' name='xm' value='ac' /><div/></td>";
	xm_table += "<td><div align='right'>P超：</div></td>";
	xm_table += "<td><div align='left'><input type='checkbox' name='xm' value='pc' /><div/></td>";
	xm_table += "</tr>";
	xm_table += "<tr><td><div align='right'>验光：</div></td>";
	xm_table += "<td><div align='left'><input type='checkbox' name='xm' value='yg' /><div/></td>";
	xm_table += "<td></td>";
	xm_table += "<td></td>";
	xm_table += "</tr></table></div>";
	
	$(xm_table).appendTo($(xm_div));
	
	var xm_button = "<table  width='100%' border='0' cellspacing='0' cellpadding='0'>"
		+ "<tr>"
		+ "<td width='13%' >"
		+ "</td>"
		+ "<td width='10%' ><a href='####' class='advsearch' id='bg_submit'>确定<a/>"
		+ "</td>"
		+ "<td width='19%' ><a href='javascript:window.close();' class='advsearch' id='update'>取消<a/>"
		+ "</td>"
		+ "<tr/>"
		+ "</table>";
	
	$(xm_button).appendTo($(xm_div));
	
	
	
	
	$("#bg_submit").click(function(){
		showBaoGao($("input[name='xm']:checked " ));
	});
	
}

function showBaoGao(jcxm){
	
	var bg_div = $("<div align='center'/>");
	$(bg_div).attr("id","bg_div");
	$(bg_div).append($(bg_jibenxinxi));
	
	$.each(jcxm,function(m,data){
		if(data.value == 'tgjc') $(bg_div).append($(bg_tgjc));
		if(data.value == 'yy')   $(bg_div).append($(bg_yanya));
		if(data.value == 'yg')   $(bg_div).append($(bg_quguang));
		if(data.value == 'pc')   $(bg_div).append($(bg_pchao));
		if(data.value == 'ac')   $(bg_div).append($(bg_achao));
	});
	$("#xmDiv").parent().parent().remove();
	
	$(bg_div).appendTo("#body_baogao");
	//检查情况
	var bg_footOneDiv = $("<div align = 'center'/>");
	var chuli=getJSONData("/publish/doctor/getMC.htm",{id:jzid,categoryId:30003,tag:Math.random()});
	var footOneHtml = "处理:<br/><textarea style='width:56%;height:100px;' readonly='readonly'>"+chuli.obj.jilu+"</textarea>";
	var zhenduan = getJSONData("/publish/doctor/getZhenDuanInfoUrl.htm", {
		jzid : jzid, // 就诊id
		tag : Math.random()
	});
	var t="";
	$.each(zhenduan.obj,function(m,data){
		
		var zhenduanInfo = getJSONData("/publish/category/getCategoryById.htm",{
			id:data.zdflid,
			tag:Math.random()
		},"post");
		 t=zhenduanInfo.obj.category;
	});
	var footTwoHtml = " <br/>诊断:<br/><textarea style='width:56%;height:100px;' readonly='readonly'>"+t+"</textarea>";
	
	$(bg_footOneDiv).append(footOneHtml).append(footTwoHtml);
	$(bg_footOneDiv).appendTo("#bg_div");
	
	//获取系统时间
	var date = new Date();
	var bg_footTwoDiv = $("<div align='left' style=' width:56%;'/>");
	var footTwoHtml = "报告日期: "+date.getFullYear()+"年--"+date.getMonth()+1+"月--"+date.getDate()+"日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;报告医生："+infoData.gonghao+" &nbsp;&nbsp;&nbsp;" 
					+  "医生签字 <hr width='100%' size='2'/>" 
					+  " 注：本报告谨供临床医师参考，影像科医师签字后有效";
	$(bg_footTwoDiv).append(footTwoHtml);
	$(bg_footTwoDiv).appendTo("#bg_div");
	//按钮
	var btnDiv = $("<div align='center' style=' width:56%;'>");
	var btnHtml = "<a href='javascript:window.close();' class='search' id='dayin' style='float:right'>取消<a/><a href='javascript:window.print();' class='search' id='dayin'  name = 'dayin'>打印<a/>";
	$(btnDiv).append(btnHtml);
	$(btnDiv).appendTo("#bg_div");
}


















