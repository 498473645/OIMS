
var huanzheGetUrl = "/publish/huanzhe/getHuanzhe.htm";
var focusId ;

function initBtnFooter(){
	$("#footer").removeClass().addClass("footer pos").text("");
	$("<a href='javascript:saveYanYa();'><span class='save'></span>保存</a>").appendTo("#footer");
	$("<a href='javascript:setGuohao();'><span class='next'></span>下一个</a>").appendTo("#footer");
	btnDisabled();
}

function showJcdForm(){
	$(".tabinfo").text("");
	$("<div/>").addClass("left").appendTo(".tabinfo");
	$("<div/>").addClass("right").appendTo(".tabinfo");
	$("<div/>").addClass("title1").text("眼压检查").appendTo(".left");
	$("<div/>").attr("id","yalitab").addClass("tabmain1 list").appendTo(".left");
	var yanyatab = "<form id='yanyaFm'><table width='100%' border='0' cellSpacing='0' cellPadding='0'>" +
	               "<tr><th></th><th>压力值</th></tr>"+
	               "<tr><td class='seet' nowrap='nowrap'>左眼</td><td>" +
	               "<input type='text' id='lvalue' name='OS' class='seeing1'/>" +
	               "<input type='hidden' id='hzID' name='huanzheId'/>" +
	               "<input type='hidden' id='jzId' name='jiuzhenId'/>" +
	               "<input type='hidden' id='JcYs' name='jcys'/>" +
	               "<input type='hidden' id='jcdID' name='jcdId'/>" +
	               "<input type='hidden' id='jcsbid' name='jcsbid'/>" +
	               "</td></tr>"+
	               "<tr><td class='seet' nowrap='nowrap'>右眼</td><td>" +
	               "<input type='text' id='rvalue' name='OD' class='seeing1'/>" +
	               "</td></tr>"+
			       "</table></form>";
	$(yanyatab).appendTo("#yalitab");
	
	$(".seeing1").click(function(e){
		var event = window.event || e;
		var taget = event.srcElement || event.target;
		focusId = taget.id;
	});
	
	var ul = "<ul id='yanyaUl'>" +
				"<li class='d1' valueName='1'></li>"+
				"<li class='d2' valueName='2'></li>"+
				"<li class='d3' valueName='3'></li>"+
				"<li class='d4' valueName='4'></li>"+
				"<li class='d5' valueName='5'></li>"+
				"<li class='d6' valueName='6'></li>"+
				"<li class='d7' valueName='7'></li>"+
				"<li class='d8' valueName='8'></li>"+
				"<li class='d9' valueName='9'></li>"+
				"<li class='dc' valueName='c'></li>"+
				"<li class='d0' valueName='0'></li>"+
				"<li class='d' valueName='.'></li>" +
			"</ul>";
	$(ul).appendTo(".right");
	
	$("#yanyaUl li").click(function(e){	
		var val = $(this).attr("valueName");
		if(val=='c'){
			$("#"+focusId).val("");
		}else if(val=="."){
			var prevalue = $("#"+focusId).val();
			if(prevalue.indexOf(".")!=-1){
				$.oimsAlert("眼压值输入不正确！");
				return;
			}
	    	$("#"+focusId).val(prevalue+val);
		}else{
			var prevalue = $("#"+focusId).val();
			var yanya = prevalue+val;
			if(!checkIsYanYa(yanya)){
				$.oimsAlert("眼压值输入不正确！");
				return;
			}
			$("#"+focusId).val(prevalue+val);
		}
	});
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

function checkIsYanYa(yanyaVal){
	if(yanyaVal<100&&yanyaVal>0){
		return true;
	}
	return false;
}

function fillForm(yanya){
	$("#lvalue").val(yanya.lvalue);
	$("#rvalue").val(yanya.rvalue);
}



function saveYanYa(){
	if(isYanYaConfirm()){
		$("#yanyaFm").ajaxForm( {
			url: contextPath + "/publish/yanya/saveYanya.htm",
			type: 'post',
	        dataType : 'json',
	        success : saveOrUpdate
	   });
	    $("#yanyaFm").submit();
	}
}

function isYanYaConfirm(){
	var lvalue = $("#lvalue").val();
	var rvalue = $("#rvalue").val();
	var jcysgh = $("#jcysgh").val();
    if(jcysgh==""){
		$.oimsAlert("请选择检查医生！");
		return false;
	}
	if(lvalue==""){
		   $.oimsAlert("请输入左眼眼压!");
		   $("#lvalue").focus();
		   return false;
	}
	if(rvalue==""){
		$.oimsAlert("请输入右眼眼压!");
		return false;
	}

		  return true;
}

function saveOrUpdate(data){
	if(data.state){
		clearHzBasinfo();
		var l2 = $(".menuleft ul li:eq(2)");
		exportUl("menuleft","menuright",l2);
		clearInterval(zxJishiqi);
		zxJishiqi = setInterval(showExecuteJcdList,600);
	//	showExecuteJcdList();
		$.oimsSucc("眼压数据保存成功！");
		
	}else{
		$.oimsError("眼压数据保存失败！");
	}
}

function showBingliBingShi(){
	if(!isExistHzxx()){
		return;
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
	showJcdForm();
	return true;
}

function showJianChaDoctor(){
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
function showExecuteJcdList(){
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
		$.oimsConfirm({strTitle:"确认中断检查！",remove_length:true},stopCapture,cancel);
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
