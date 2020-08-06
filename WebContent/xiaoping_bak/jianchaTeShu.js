
function initBtnFooter(){
	$("#footer").removeClass().addClass("footer").text("");
	$("<a href='javascript:startJc();'><span class='star'></span>开始检查</a>").appendTo("#footer");
	$("<a href='javascript:jieshuJc();' disabled><span class='end1'></span>结束检查</a>").appendTo("#footer");
	$("<a href='javascript:setGuohao();'><span class='next'></span>下一个</a>").appendTo("#footer");
}


/**
 * 开始检查
 */
function startJc(){
	var huanzheId = $("#huanzheId").val();
	if(huanzheId==""){
		$.oimsAlert("未选择患者检查单");
		return;
	}
    var jcysgh = $("#jcysgh").val();
	if(jcysgh==""){
		$.oimsAlert("请选择检查医生！");
		return;
	}
	clearInterval(zxJishiqi);
    var data=getJSONData("/publish/jcd/executeJcdStart.htm",{
        id:$("#jcdId").val(),
        jcysgh:jcysgh,
        jcsbid:task.jcsbid,
        startTime:getNow()
    });
    if(data.state){
    	doing = true;
    	$(".star").parent().attr("href","javascript:resetJcd();").html("<span class='break'></span>中断检查");
    	$(".end1").parent().removeAttr("disabled");
    	$(".end1").removeClass().addClass("end");
    }else{
    	$.oimsAlert(data.message);
    }
}
/**
 * 结束检查
 */
function jieshuJc(){
	doing = false;
    var data=getJSONData("/publish/jcd/executeJcdEnd.htm",{
        id:$("#jcdId").val(),
        endTime:getNow(),
        tag:Math.random()
    });
    if(data.state){
    	$.oimsSucc("保存至上传列表成功！");
    	task.start=true;
    	clearHzBasinfo();
    	var l2 = $(".menuleft ul li:eq(2)");
		exportUl("menuleft","menuright",l2);
		clearInterval(zxJishiqi);
		zxJishiqi = setInterval(showExecuteJcdList,600);
	//	showExecuteJcdList();
    	$(".break").parent().attr("href","javascript:startJc();").html("<span class='star'></span>开始检查");
    	$(".end").parent().attr("disabled",true);
    	$(".end").removeClass().addClass("end1");
    }else{
    	$.oimsAlert(data.message);	
    }
}

function resetJcd(){
	var data = getJSONData("/publish/jcd/executeJcdReset.htm",{id:$("#jcdId").val(),tag:Math.random()});
	doing = false;
    if(data.state){
    	$(".break").parent().attr("href","javascript:startJc();").html("<span class='star'></span>开始检查");
    	$(".end").parent().attr("disabled",true);
    	$(".end").removeClass().addClass("end1");
    }else{
    	$.oimsAlert(data.message);
    }
}


function btnDisabled(){
	$(".star").parent().attr("disabled",true);
	$(".star").removeClass().addClass("star1");
	if(!doing){
		$(".end").parent().attr("disabled",true);
		$(".end").removeClass().addClass("end1");	
	}
	$(".next").parent().attr("disabled",true);
	$(".next").removeClass().addClass("next1");
};
function btnValiate(){
	$(".star1").parent().removeAttr("disabled");
	$(".star1").removeClass().addClass("star");
	if(!doing){
		$(".end").parent().attr("disabled",true);
		$(".end").removeClass().addClass("end1");	
	}
	$(".next1").parent().removeAttr("disabled");
	$(".next1").removeClass().addClass("next");
}

function showJcdForm(){
	
}

function isExistHzxxToTeShu(){
	var huanzheId = $("#huanzheId").val();
	if(huanzheId==""){
		var l2 = $(".menuleft ul li:eq(2)");
		exportUl("menuleft","menuright",l2);
		btnValiate();
		clearInterval(zxJishiqi);
		zxJishiqi = setInterval(showExecuteJcdList,600);
//		showExecuteJcdList();
		$.oimsAlert("未选择患者检查单");
		return false;
	}
	return true;
}

function showBingliBingShi(){
	
	if(!isExistHzxxToTeShu()){
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
	if(!isExistHzxxToTeShu()){
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
	if(!isExistHzxxToTeShu()){
		return;
	}
	$(".tabinfo").text("");
	$("<div/>").addClass("title").appendTo(".tabinfo");
	$("<div/>").attr("id","tablist").appendTo(".tabinfo");
	$(".title").text("检查要求图示");
	$("#tablist").removeClass().addClass("tabmain prompt");
	var jctsTab = " <table width='100%' border='0' cellspacing='0' cellpadding='0'>"+
					" <tr>"+
					" <td width='50%' class='img' id='leftImg'></td>"+
					" <td width='50%' class='img' id='rightImg'></td>"+
					" </tr>"+
					" <tr>"+
					" <td class='text' id='jcyq' colspan=2></td>"+
					" </tr>"+
				" </table>";
	$(jctsTab).appendTo("#tablist");
	var jcdid= $("#jcdId").val();
	var data = getJSONData("/publish/jcd/getJcdById.htm",{id:jcdid});
	
	if(data.state){	
		var jcd = data.obj;
		$("#leftImg").text("");
		$("#rightImg").text("");
		$("#jcyq").text(jcd.jcyq);
		if(jcd.leftPic != "" && jcd.leftPic != null){
	    	$("<img src=\""+contextPath+jcd.leftPic+"\" width=\"200\" height=\"150\"/>").appendTo("#leftImg");
	    }else{
	    	$("<img src=\""+contextPath+"/exam_photos/eyea.png\" width=\"200\" height=\"150\"/>").appendTo("#leftImg");
	    }
	    if(jcd.rightPic != "" && jcd.rightPic != null){
	    	$("<img src=\""+contextPath+jcd.rightPic+"\" width=\"200\" height=\"150\"/>").appendTo("#rightImg");
	    }else{
	    	$("<img src=\""+contextPath+"/exam_photos/eyeaa.png\" width=\"200\" height=\"150\"/>").appendTo("#rightImg");
	    }	
    }
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



