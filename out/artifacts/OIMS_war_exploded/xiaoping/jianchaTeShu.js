
function initBtnFooter(){
	$("#footer").removeClass().addClass("footer").text("");
	$("<a href='javascript:startJc();'><span class='star'></span>"+xiaoping_language.StartExam+"</a>").appendTo("#footer");
	$("<a href='javascript:jieshuJc();' disabled><span class='end1'></span>"+xiaoping_language.EndExam+"</a>").appendTo("#footer");
	$("<a href='javascript:setGuohao();'><span class='next'></span>"+xiaoping_language.next+"</a>").appendTo("#footer");
}


/**
 * 开始检查
 */
function startJc(){
	var huanzheId = $("#huanzheId").val();
	if(huanzheId==""){
		$.oimsAlert(xiaoping_language.weixuanzehuanzhe);
		return;
	}
	
    var jcysgh = $("#jcysgh").val();
	if(jcysgh==""){
		$.oimsAlert(xiaoping_language.xuanzeyisheng);
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
    	$(".star").parent().attr("href","javascript:resetJcd();").html("<span class='break'></span>"+xiaoping_language.StopExam);
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
    	$.oimsSucc(xiaoping_language.baocunshangchuan);
    	task.start=true;
    	clearHzBasinfo();
    	var l2 = $(".menuleft ul li:eq(2)");
		exportUl("menuleft","menuright",l2);
		clearInterval(zxJishiqi);
		zxJishiqi = setInterval(showExecuteJcdList,600);
	//	showExecuteJcdList();
    	$(".break").parent().attr("href","javascript:startJc();").html("<span class='star'></span>"+xiaoping_language.StartExam);
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
    	$(".break").parent().attr("href","javascript:startJc();").html("<span class='star'></span>"+xiaoping_language.EndExam);
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
		$.oimsAlert(xiaoping_language.weixuanzehuanzhe);
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
	$(".title").text(xiaoping_language.BingLiBs);
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
	$(".title").text(xiaoping_language.huanzhexiangxixinxi);
	$("#tablist").removeClass().addClass("tabmain peoinfo");
	
	var hzxxTable = "<table width='100%' border='0' cellSpacing='0' cellPadding='0'>";
	     hzxxTable +="<tr><td align='right' width='10%' nowrap='nowrap'>"+xiaoping_language.BingLiHao+"：</td><td width='20%' id='binglihao'></td>"+
	     		         "<td align='right' width='10%' nowrap='nowrap'>"+xiaoping_language.XingMing+"：</td><td width='20%' id='hzxm'></td>" +
	     		          "<td align='right' width='10%' nowrap='nowrap'>"+xiaoping_language.Sex+"：</td><td width='20%' id='hzxb'></td></tr>";		          
	     hzxxTable +="<tr><td align='right' width='10%' nowrap='nowrap'>"+xiaoping_language.MobilePhone+"：</td><td width='20%' id='shouji'></td>" +
	     		"<td align='right' width='10%' nowrap='nowrap'>"+xiaoping_language.zuojihaoma+"：</td><td width='20%' id='dianhua'></td>" +
	     		"<td align='right' width='10%' nowrap='nowrap'>"+xiaoping_language.SsDq+"：</td><td width='20%' id='diqu'></td></tr>";
	     hzxxTable +="<tr><td align='right' width='10%' nowrap='nowrap'>"+xiaoping_language.Lxr+"：</td><td width='20%' id='hzlxr'></td>" +
	     		"<td align='right' width='10%' nowrap='nowrap'>"+xiaoping_language.JinJiTel+"：</td><td width='20%' id='hzlxrdh'></td>" +
	     		"<td align='right' width='10%' nowrap='nowrap'>"+xiaoping_language.HzSource+"：</td><td width='20%' id='laiyuan'></td>" +
	     		"</tr>";
	     hzxxTable +="<tr><td align='right' width='10%' nowrap='nowrap'>"+xiaoping_language.Sfzh+"：</td><td width='20%' id='sfzh'></td>" +
  							"<td align='right' width='10%' nowrap='nowrap'></td><td colspan=3></td></tr>";
	     hzxxTable +="<tr><td align='right' width='10%' nowrap='nowrap'>"+xiaoping_language.jiatingzhuzhi+"：</td><td colspan=3 id='jtdz'></td>" +	
	     				"<td align='right' width='10%' nowrap='nowrap'>"+xiaoping_language.YZBB+"：</td><td width='20%' id='youbian'></td>" +
	     			"</tr>";
	     
	     hzxxTable +="<tr><td align='right' width='10%' nowrap='nowrap'>"+xiaoping_language.WorkDW+"：</td><td colspan=3 id='gzdw'></td>" +
	     				"<td align='right' width='10%' nowrap='nowrap'>"+xiaoping_language.HzDwYb+"：</td><td width='20%' id='dwyb'></td>" +
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
	$(".title").text(xiaoping_language.jianchayaoqiutushi);
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
	$(".title").text(xiaoping_language.JcYs);
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
	$(".title").text(xiaoping_language.DjLb);
	$("#tablist").removeClass().addClass("tabmain list");
    task.start = false;
	listFactor = {
			   listObj : [ 
					{
						title : xiaoping_language.Seria,
						key : "paihao"
					},
					{
						title :xiaoping_language.BingLiHao,
						key : "binglihao"
					},
					{
						title : xiaoping_language.XingMing,
						key : "hzxm"
					},
					{
						title : xiaoping_language.Sex,
						key : "hzxb"
					},
					{
						title : xiaoping_language.Age,
						key : "nianling"
					},
					{
						title : xiaoping_language.Jcxm,
						key : "jcxmmc"
					},
					{
						title :xiaoping_language.YanBie,
						key : "yanbie",
						func: function(v){
							if(v==48){
								return xiaoping_language.DoubleEye;
							}else if(v==46){
								return xiaoping_language.LeftEye;
							}else if(v==47){
								return xiaoping_language.RightEye;
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
	$(".title").text(xiaoping_language.YjLb);
	$("#tablist").removeClass().addClass("tabmain list");
    task.start = false;
    listFactor = {
    		   listObj : [ 
    				{
    					title : xiaoping_language.Seria,
    					key : "paihao"
    				},
    				{
    					title : xiaoping_language.BingLiHao,
    					key : "binglihao"
    				},
    				{
    					title : xiaoping_language.XingMing,
    					key : "hzxm"
    				},
    				{
    					title : xiaoping_language.Sex,
    					key : "hzxb"
    				},
    				{
    					title : xiaoping_language.Age,
    					key : "nianling"
    				},
    				{
    					title : xiaoping_language.Jcxm,
    					key : "jcxmmc"
    				},
    				{
    					title : xiaoping_language.YanBie,
    					key : "yanbie"
    				},
    				{
    					title :xiaoping_language.Jcsj,
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
	$(".title").text(xiaoping_language.yiguohaoliebiao);
	$("#tablist").removeClass().addClass("tabmain list");
    task.start = false;
    listFactor = {
    		   listObj : [ 
    				{
    					title : xiaoping_language.Seria,
    					key : "paihao"
    				},
    				{
    					title : xiaoping_language.BingLiHao,
    					key : "binglihao"
    				},
    				{
    					title : xiaoping_language.XingMing,
    					key : "hzxm"
    				},
    				{
    					title : xiaoping_language.Sex,
    					key : "hzxb"
    				},
    				{
    					title : xiaoping_language.Age,
    					key : "nianling"
    				},
    				{
    					title : xiaoping_language.Jcxm,
    					key : "jcxmmc"
    				},
    				{
    					title : xiaoping_language.YanBie,
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
	$(".title").text(xiaoping_language.jianchadanzhuangtai);
	$("#tablist").removeClass().addClass("tabmain list");
    task.start = false;
    listFactor = {
    		   listObj : [ 
    				{
    					title : xiaoping_language.Seria,
    					key : "paihao"
    				},
    				{
    					title : xiaoping_language.BingLiHao,
    					key : "binglihao"
    				},
    				{
    					title : xiaoping_language.XingMing,
    					key : "hzxm"
    				},
    				{
    					title :xiaoping_language.Sex,
    					key : "hzxb"
    				},
    				{
    					title : xiaoping_language.Age,
    					key : "nianling"
    				},
    				{
    					title : xiaoping_language.Jcxm,
    					key : "jcxmmc"
    				},
    				{
    					title : xiaoping_language.YanBie,
    					key : "yanbie"
    				},
    				{
    					title :xiaoping_language.State,
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



