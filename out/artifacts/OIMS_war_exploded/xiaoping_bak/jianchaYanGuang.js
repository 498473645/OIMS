	
function initBtnFooter(){
	$("#footer").removeClass().addClass("footer pos").text("");
	$("<a href='javascript:saveYanGuang();'><span class='save'></span>保存</a>").appendTo("#footer");
	$("<a href='javascript:setGuohao();'><span class='next'></span>下一个</a>").appendTo("#footer");
	btnDisabled();
}

function showJcdForm(){
	$(".tabinfo").text("");
	$("<form/>").attr("id","yanGuangFm").appendTo(".tabinfo");
	$("<div/>").addClass("left1").appendTo("#yanGuangFm");
	$("<div/>").addClass("title2").text("客观屈光度参考值").appendTo(".left1");
	$("<div/>").attr("id","keGuanQuDuTab").addClass("tabmain1 list").appendTo(".left1");
	var tab1 = "<table width='100%' border='0' cellSpacing='0' cellPadding='0'>" +
	               "<tr><th></th><th>球镜度</th><th>散光度</th><th>轴位</th></tr>"+
	               "<tr><td nowrap='nowrap'>左眼</td>" +
		               "<td><input type='text' id='refLS' name='refLS' class='textipnut'/></td>" +
	                   "<td><input type='text' id='refLC' name='refLC' class='textipnut'/></td>" +
	                   "<td><input type='text' id='refLA' name='refLA' class='textipnut'/></td>" +
	                   "<input type='hidden' id='jzId' name='jiuzhenid'/>" +
		               "<input type='hidden' id='JcYs' name='jcys'/>" +
		               "<input type='hidden' id='hzID' name='huanzheId'/>" +
		               "<input type='hidden' id='jcdID' name='jcdid'/>" +
		               "<input type='hidden' id='jcsbid' name='jcsbid'/>" +
	                   "</tr>"+
	               "<tr><td nowrap='nowrap'>右眼</td>" +
	                    "<td><input type='text' id='refRS' name='refRS' class='textipnut'/></td>" +
	                    "<td><input type='text' id='refRC' name='refRC' class='textipnut'/></td>" +
	                    "<td><input type='text' id='refRA' name='refRA' class='textipnut'/></td></tr>"+
	               "<tr><td nowrap='nowrap'>瞳距</td><td colspan=3><input type='text' id='refPd' name='refPd' class='seeing1'/></td></tr>"+
			       "</table>";
	$(tab1).appendTo("#keGuanQuDuTab");
	
	$("<div/>").addClass("right1").appendTo("#yanGuangFm");
	$("<div/>").addClass("title1").text("角膜曲率参考值").appendTo(".right1");
	$("<div/>").attr("id","jiaoMoQuLiTab").addClass("tabmain1 list").appendTo(".right1");
	var tab2 = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"+
				  "<tr>"+
				    "<th class='mheight'>左眼</th>"+
				    "<th class='mheight'>角膜曲光度</th>"+
				    "<th class='mheight'>曲率半径 </th>"+
				    "<th class='mheight'> 方向</th>"+
				    "</tr>"+
				  "<tr>"+
				    "<td nowrap='nowrap' class='minheight' >水平方向</td>"+
				    "<td class='minheight'><input type='text' id='krtLHd' name='krtLHd' class='textipnut'/></td>"+
				    "<td class='minheight'><input type='text' id='krtLHmm' name='krtLHmm' class='textipnut'/></td>"+
				    "<td class='minheight'><input type='text' id='krtLHa' name='krtLHa' class='textipnut'/></td>"+
				    "</tr>"+
				  "<tr>"+
				    "<td nowrap='nowrap' class='minheight'>垂直方向</td>"+
				    "<td class='minheight'><input type='text' id='krtLVd' name='krtLVd' class='textipnut'/></td>"+
				    "<td class='minheight'><input type='text' id='krtLVmm' name='krtLVmm' class='textipnut'/></td>"+
				    "<td class='minheight'><input type='text' id='krtLVa' name='krtLVa' class='textipnut'/></td>"+
				    "</tr>"+
				  "<tr>"+
				    "<td nowrap='nowrap' class='minheight'>平均值</td>"+
				    "<td class='minheight'><input type='text' id='krtLAved' name='krtLAved' class='textipnut'/></td>"+
				    "<td class='minheight'><input type='text' id='krtLAvemm' name='krtLAvemm' class='textipnut'/></td>"+
				    "<td class='minheight'></td>"+
				  "</tr>"+
				  "<tr>"+
				    "<td nowrap='nowrap' class='minheight'>角膜散光度</td>"+
				    "<td class='minheight'>&nbsp;</td>"+
				    "<td class='minheight'><input type='text' id='krtLCylmm' name='krtLCylmm' class='textipnut'/></td>"+
				    "<td class='minheight'><input type='text' id='krtLCyla' name='krtLCyla' class='textipnut'/></td>"+
				  "</tr>"+
				  "<tr>"+
				    "<th class='mheight'>右眼</th>"+
				    "<th class='mheight'>角膜曲光度</th>"+
				    "<th class='mheight'>曲率半径 </th>"+
				    "<th class='mheight'>方向</th>"+
				  "</tr>"+
				  "<tr>"+
				    "<td class='minheight'>水平方向</td>"+
				    "<td class='minheight'><input type='text' id='krtRHd' name='krtRHd' class='textipnut'/></td>"+
				    "<td class='minheight'><input type='text' id='krtRHmm' name='krtRHmm' class='textipnut'/></td>"+
				    "<td class='minheight'><input type='text' id='krtRHa' name='krtRHa' class='textipnut'/></td>"+
				  "</tr>"+
				  "<tr>"+
				    "<td class='minheight'>垂直方向</td>"+
				    "<td class='minheight'><input type='text' id='krtRVd' name='krtRVd' class='textipnut'/></td>"+
				    "<td class='minheight'><input type='text' id='krtRVmm' name='krtRVmm' class='textipnut'/></td>"+
				    "<td class='minheight'><input type='text' id='krtRVa' name='krtRVa' class='textipnut'/></td>"+
				  "</tr>"+
				  "<tr>"+
				    "<td class='minheight'>平均值</td>"+
				    "<td class='minheight'><input type='text' id='krtRAved' name='krtRAved' class='textipnut'/></td>"+
				    "<td class='minheight'><input type='text' id='krtRAvemm' name='krtRAvemm' class='textipnut'/></td>"+
				    "<td class='minheight'>&nbsp;</td>"+
				  "</tr>"+
				  "<tr>"+
				    "<td class='minheight'>角膜散光度</td>"+
				    "<td class='minheight'>&nbsp;</td>"+
				    "<td class='minheight'><input type='text' id='krtRCylmm' name='krtRCylmm' class='textipnut'/></td>"+
				    "<td class='minheight'><input type='text' id='krtRCyla' name='krtRCyla' class='textipnut'/></td>"+
				  "</tr>"+
				  "</table>";
	$(tab2).appendTo("#jiaoMoQuLiTab");
	
	$("hzID").val($("#huanzheId").val());
	$("#jzId").val($("#jiuzhenId").val());
	$("#JcYs").val($("#jcysgh").val());
	$("#jcdID").val($("#jcdId").val());
	$("#jcsbid").val(task.jcsbid);
}

function btnValiate(){
	$(".save1").parent().removeAttr("disabled");
	$(".save1").removeClass().addClass("save");
}

function btnDisabled(){
	$(".save").parent().attr("disabled",true);
	$(".save").removeClass().addClass("save1");
};

function key(value){
	if(value=='c'){
		$("#enter").val("");
	}else{
		var prevalue = $("#enter").val();
    	$("#enter").val(prevalue+value);
	}
 	
}

function showBingliBingShi(){
	
	if(!isExistHzxx()){
		return;
	}
	if(doing){
		$.oimsConfirm({strTitle:"确认中断检查！",remove_length:true},interuptCapture,cancel);
	}
	
	$(".tabinfo").text("");
	$("<div/>").addClass("title").appendTo(".tabinfo");
	$("<div/>").attr("id","tablist").appendTo(".tabinfo");
	$(".title").text("病历病史");
	$("#tablist").removeClass().addClass("tabmain");
	$("<div/>").addClass("tablabel").appendTo("#tablist");
	var data = getJSONData("/publish/category/findCategorysByFatherId.htm", {
		fatherid : 30001,
		tag : Math.random()
	}, "post");
	if (data.state) {
		var jiuzhenid = $("#jiuzhenId").val();
		$.each(data.obj, function(i, d) {
			
			var jilu = "";
			var data2 = getJSONData("/publish/jzjl/getJzjlListByCategoryIdAndJiuzhenId.htm",{categoryId:d.categoryid,jiuzhenId:jiuzhenid,tag:Math.random()},"post");
			if(data2.state){
				var jzjllist = data2.obj;
				$.each(jzjllist,function(j,d1){
					if(j==jzjllist.length-1){
						jilu +=d1.jilu;
					}else if(d1.jilu!=""){
						jilu +=d1.jilu+",";
					}
					  
				});
			}
			
			var div1 = $("<div/>").attr("id","div1_"+i).addClass("tab_hide").text(d.category).appendTo(".tablabel");
			if(i==0){	
				$("<div/>").attr("id","div"+i).addClass("ze").text(jilu).appendTo("#tablist");
				getPageMenu("div1_"+i,"div"+i);
				PageMenuActive("div1_"+i,"div"+i);
			}else{
				$("<div style='display:none'/>").attr("id","div"+i).addClass("ze").text(jilu).appendTo("#tablist");
			}
			
			div1.click(function(){
				PageMenuActive("div1_"+i,"div"+i);
			});
		});
	}
	
};

function showHuanZheXinXi(){
	if(!isExistHzxx()){
		return;
	}
	
	if(doing){
		$.oimsConfirm({strTitle:"确认中断检查！",remove_length:true},interuptCapture,cancel);
	}
	$(".tabinfo").text("");
	$("<div/>").addClass("title").appendTo(".tabinfo");
	$("<div/>").attr("id","tablist").appendTo(".tabinfo");
	$(".title").text("患者详细信息");
	$("#tablist").removeClass().addClass("tabmain peoinfo");
	
	var hzxxTable = "<table width='100%' border='0' cellSpacing='0' cellPadding='0'>";
	     hzxxTable +="<tr><td align='right' width='10%' nowrap='nowrap'>病历号：</td><td width='20%' id='binglihao'></td>"+
	     		         "<td align='right' width='10%' nowrap='nowrap'>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</td><td width='20%' id='hzxm'></td>" +
	     		          "<td align='right' width='10%' nowrap='nowrap'>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</td><td width='20%' id='hzxb'></td></tr>";		          
	     hzxxTable +="<tr><td align='right' width='10%' nowrap='nowrap'>手机号码：</td><td width='20%' id='shouji'></td>" +
	     		"<td align='right' width='10%' nowrap='nowrap'>座机号码：</td><td width='20%' id='dianhua'></td>" +
	     		"<td align='right' width='10%' nowrap='nowrap'>所属地区：</td><td width='20%' id='diqu'></td></tr>";
	     hzxxTable +="<tr><td align='right' width='10%' nowrap='nowrap'>联系人：</td><td width='20%' id='hzlxr'></td>" +
	     		"<td align='right' width='10%' nowrap='nowrap'>紧急电话：</td><td width='20%' id='hzlxrdh'></td>" +
	     		"<td align='right' width='10%' nowrap='nowrap'>患者来源：</td><td width='20%' id='laiyuan'></td>" +
	     		"</tr>";
	     hzxxTable +="<tr><td align='right' width='10%' nowrap='nowrap'>身份证号：</td><td width='20%' id='sfzh'></td>" +
  							"<td align='right' width='10%' nowrap='nowrap'></td><td colspan=3></td></tr>";
	     hzxxTable +="<tr><td align='right' width='10%' nowrap='nowrap'>家庭住址：</td><td colspan=3 id='jtdz'></td>" +	
	     				"<td align='right' width='10%' nowrap='nowrap'>邮政编码：</td><td width='20%' id='youbian'></td>" +
	     			"</tr>";
	     
	     hzxxTable +="<tr><td align='right' width='10%' nowrap='nowrap'>工作单位：</td><td colspan=3 id='gzdw'></td>" +
	     				"<td align='right' width='10%' nowrap='nowrap'>单位邮编：</td><td width='20%' id='dwyb'></td>" +
	     		     "</tr>";
	     hzxxTable +="</table>";
	     
	$(hzxxTable).appendTo("#tablist");
	
	initHzxx();
}

function showJianChaTiShi(){
	if(!isExistHzxx()){
		return;
	}
	var jcysgh = $("#jcysgh").val();
	if(jcysgh==""){
		var r0 = $(".menureft ul li:eq(0)");
		exportUl("menuleft","menuright",r0);
		showJianChaDoctor();
		$.oimsAlert("请选择检查医生！");
		return false;
	}
	if(startCapture()){
		doing =true;
	}else{
		$.oimsAlert("采集端口未打开！");
	}
	showJcdForm();
	return true;
}

function startCapture(){
   return true;
}
function stopCapture(){
	return true;
}

function interuptCapture(){
	if(stopCapture()){
		doing = false;
	}else{
		cancel();
	}
}
function cancel(){
	var r2 = $(".menuright ul li:eq(2)");
	exportUl("menuleft","menuright",r2);
	showJcdForm();
	btnValiate();
	return false;
}


function fillForm(obj){
	$("#refLS").val(obj.REF_L_S);
	$("#refLC").val(obj.REF_L_C);
	$("#refLA").val(obj.REF_L_A);
	
	$("#refRS").val(obj.REF_R_S);
	$("#refRC").val(obj.REF_R_C);
	$("#refRA").val(obj.REF_R_A);
	
	$("#refPd").val(obj.REF_PD);
	
	$("#krtRHd").val(obj.KRT_R_HD);
	$("#krtRHmm").val(obj.KRT_R_HMM);
	$("#krtRHa").val(obj.KRT_R_HA);
	$("#krtRVd").val(obj.KRT_R_VD);
	$("#krtRVmm").val(obj.KRT_R_VMM);
	$("#krtRVa").val(obj.KRT_R_VA);
	$("#krtRAved").val(obj.KRT_R_AVED);
	$("#krtRAvemm").val(obj.KRT_R_AVEMM);
	$("#krtRCylmm").val(obj.KRT_R_CYLMM);
	$("#krtRCyla").val(obj.KRT_R_CYLA);
	$("#krtLHd").val(obj.KRT_L_HD);
	$("#krtLHmm").val(obj.KRT_L_HMM);
	$("#krtLHa").val(obj.KRT_L_HA);
	$("#krtLVd").val(obj.KRT_L_VD);
	$("#krtLVmm").val(obj.KRT_L_VMM);
	$("#krtLVa").val(obj.KRT_L_VA);
	$("#krtLAved").val(obj.KRT_L_AVED);
	$("#krtLAvemm").val(obj.KRT_L_AVEMM);
	$("#krtLCylmm").val(obj.KRT_L_CYLMM);
	$("#krtLCyla").val(obj.KRT_L_CYLA);
}

function isYanGuangConfirm(){

	 var jcysgh = $("#jcysgh").val();
     if(jcysgh==""){
		$.oimsAlert("请选择检查医生！");
		return false;
	}
	
	  return true;
}

function saveYanGuang(){
	if(isYanGuangConfirm()){
		$("#yanGuangFm").ajaxForm( {
			url: contextPath + "/publish/yanguang/yanGuangSave.htm",
			type: 'post',
	        dataType : 'json',
	        success : saveOrUpdate
	   });
	    $("#yanGuangFm").submit();
	}
	
}

function saveOrUpdate(data){
	if(data.state){
		clearHzBasinfo();
		var l2 = $(".menuleft ul li:eq(2)");
		exportUl("menuleft","menuright",l2);
		if(stopCapture()){
			doing = false;
		}else{
			$.oimsAlert("串口关闭异常，请重启！");
			return;
		}
		clearInterval(zxJishiqi);
		zxJishiqi = setInterval(showExecuteJcdList,600);
	//	showExecuteJcdList();
		$.oimsSucc("验光数据保存成功！");
		
	}else{
		$.oimsError("验光数据保存失败！");
	}
}

function showJianChaDoctor(){
	if(doing){
		$.oimsConfirm({strTitle:"确认中断检查！",remove_length:true},interuptCapture,cancel);
	}
	
	$(".tabinfo").text("");
	$("<div/>").addClass("title").appendTo(".tabinfo");
	$("<div/>").attr("id","tablist").appendTo(".tabinfo");
	$(".title").text("检查医生");
	$("#tablist").removeClass().addClass("tabmain");
	var ysdata = getJSONData("/publish/yuangong/getDoctorByBumenAndQuanxian.htm",{tag:Math.random()});
	if(ysdata.state){
		var ul = $("<ul/>").addClass("doctorname").appendTo("#tablist");
		$.each(ysdata.obj,function(i,d){
			var li ;
			if($("#jcysgh").val()==d.gonghao){
				li = $("<li/>").addClass("vid").text(d.xingming).appendTo(ul);
			}else{
				li = $("<li/>").text(d.xingming).appendTo(ul);
			}
		    $("<input type='radio' id='checkys' name='checkys' style='display:none;' value='"+d.gonghao+"'/>").appendTo(li);
		});
	}
	
	$("#tablist ul li").click(function() {
	    $("#tablist ul li").removeClass("vid");
		$(this).addClass("vid");
		$(this).children().attr("checked", true);
		$("#jcys").val($(this).text());
		$("#jcysgh").val($(this).children().val());
	});
}

/**
 * 待检查列表
 */
var zdExamConf = true;
function showExecuteJcdList(){
	if(zdExamConf){
		if(doing){
			$.oimsConfirm({strTitle:"确认中断检查！",remove_length:true},interuptCapture,cancel);
		}
		zdExamConf = false;
	}	
	$(".tabinfo").text("");
	$("<div/>").addClass("title").appendTo(".tabinfo");
	$("<div/>").attr("id","tablist").appendTo(".tabinfo");
	$(".title").text("待检列表");
	$("#tablist").removeClass().addClass("tabmain list");
    task.start = false;
	listFactor = {
			   listObj : [ 
					{
						title : "序号",
						key : "paihao"
					},
					{
						title : "病历号",
						key : "binglihao"
					},
					{
						title : "姓名",
						key : "hzxm"
					},
					{
						title : "性别",
						key : "hzxb"
					},
					{
						title : "年龄",
						key : "nianling"
					},
					{
						title : "检查项目",
						key : "jcxmmc"
					},
					{
						title : "眼别",
						key : "yanbie",
						func: function(v){
							if(v==48){
								return "双眼";
							}else if(v==46){
								return "左眼";
							}else if(v==47){
								return "右眼";
							};
	                    	return "";
	                    }
					}
					],
					url :contextPath+"/publish/jcd/getExecuteJcdList.htm?factor=50,"+task.jcsbid,
					checkbox:true,
					single:true,
					invocationEvent:true,//启用行选中事件
					methodName_Checked:showHzBasinfo,//触发的方法名
					methodName_NoChecked:clearHzBasinfo,
					method:"post",
					data : {
						currentPage : 1,
					    pageSize : pageSize,
						tag : Math.random()
					}
        };
	var x = $("<div />").attr("id", "pageList").appendTo("#tablist");
	$(x).createPageList(listFactor);
	
}

/**
 * 已完成检查单列表
 */
function showFinishJcdList(){
	if(doing){
		$.oimsConfirm({strTitle:"确认中断检查！",remove_length:true},interuptCapture,cancel);
	}
	
	$(".tabinfo").text("");
	$("<div/>").addClass("title").appendTo(".tabinfo");
	$("<div/>").attr("id","tablist").appendTo(".tabinfo");
	$(".title").text("已检列表");
	$("#tablist").removeClass().addClass("tabmain list");
    task.start = false;
    listFactor = {
    		   listObj : [ 
    				{
    					title : "序号",
    					key : "paihao"
    				},
    				{
    					title : "病历号",
    					key : "binglihao"
    				},
    				{
    					title : "姓名",
    					key : "hzxm"
    				},
    				{
    					title : "性别",
    					key : "hzxb"
    				},
    				{
    					title : "年龄",
    					key : "nianling"
    				},
    				{
    					title : "检查项目",
    					key : "jcxmmc"
    				},
    				{
    					title : "眼别",
    					key : "yanbie"
    				},
    				{
    					title : "检查时间",
    					key : "jssj"
    				}
    				],
    				url :contextPath+"/publish/jcd/getJcdList.htm?factor=56,"+task.jcsbid,// url
    				method:"post",
    				checkbox:false,
    				single:true,
    				data : {//data表示传的参数
    					currentPage : 1,
    				    pageSize : pageSize,//Page类的方法
    					tag : Math.random()
    				}
    			};
    		var x = $("<div />").attr("id", "pageList").appendTo("#tablist");
    		$(x).createPageList(listFactor);
	
}


/**
 * 过号检查单列表
 */
function showGuohaoJcdList(){
	if(doing){
		$.oimsConfirm({strTitle:"确认中断检查！",remove_length:true},interuptCapture,cancel);
	}
	$(".tabinfo").text("");
	$("<div/>").addClass("title").appendTo(".tabinfo");
	$("<div/>").attr("id","tablist").appendTo(".tabinfo");
	$(".title").text("已过号列表");
	$("#tablist").removeClass().addClass("tabmain list");
    task.start = false;
    listFactor = {
    		   listObj : [ 
    				{
    					title : "序号",
    					key : "paihao"
    				},
    				{
    					title : "病历号",
    					key : "binglihao"
    				},
    				{
    					title : "姓名",
    					key : "hzxm"
    				},
    				{
    					title : "性别",
    					key : "hzxb"
    				},
    				{
    					title : "年龄",
    					key : "nianling"
    				},
    				{
    					title : "检查项目",
    					key : "jcxmmc"
    				},
    				{
    					title : "眼别",
    					key : "yanbie"	
    				}
    				],
    				url :contextPath+"/publish/jcd/getJcdList.htm?factor=53,"+task.jcsbid,// url
    				method:"post",
    				checkbox:true,
    				single:true,
    				invocationEvent:true,//启用行选中事件
					methodName_Checked:showHzBasinfo,//触发的方法名
					methodName_NoChecked:clearHzBasinfo,
    				data : {//data表示传的参数
    					currentPage : 1,
    				    pageSize : pageSize,//Page类的方法
    					tag : Math.random()
    				}
    			};
    		var x = $("<div />").attr("id", "pageList").appendTo("#tablist");
    		$(x).createPageList(listFactor);
	
}


/**
 * 所有检查单列表
 */
function showAllJcdList(){

	if(doing){
		$.oimsConfirm({strTitle:"确认中断检查！",remove_length:true},interuptCapture,cancel);
	}
	$(".tabinfo").text("");
	$("<div/>").addClass("title").appendTo(".tabinfo");
	$("<div/>").attr("id","tablist").appendTo(".tabinfo");
	$(".title").text("检查单状态列表");
	$("#tablist").removeClass().addClass("tabmain list");
    task.start = false;
    listFactor = {
    		   listObj : [ 
    				{
    					title : "序号",
    					key : "paihao"
    				},
    				{
    					title : "病历号",
    					key : "binglihao"
    				},
    				{
    					title : "姓名",
    					key : "hzxm"
    				},
    				{
    					title : "性别",
    					key : "hzxb"
    				},
    				{
    					title : "年龄",
    					key : "nianling"
    				},
    				{
    					title : "检查项目",
    					key : "jcxmmc"
    				},
    				{
    					title : "眼别",
    					key : "yanbie"
    				},
    				{
    					title : "状态",
    					key : "biaoshi"
    				}
    				],
    				url :contextPath+"/publish/jcd/getJcdList.htm?factor=0,"+task.jcsbid,// url
    				method:"post",
    				checkbox:false,
    				single:true,
    				data : {//data表示传的参数
    					currentPage : 1,
    				    pageSize : pageSize,//Page类的方法
    					tag : Math.random()
    				}
    			};
    		var x = $("<div />").attr("id", "pageList").appendTo("#tablist");
    		$(x).createPageList(listFactor);
	
}
