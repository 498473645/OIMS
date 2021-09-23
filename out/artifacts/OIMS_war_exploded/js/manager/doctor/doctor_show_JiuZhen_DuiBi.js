

//显示对比窗口
function show_duibi()
{
	
	var checkedList = $("#jzlistdiv input[type = checkbox]");
	
	var jz_str = "";
	
	for(var ci = 0 ; ci < checkedList.length ; ci++)
	{
		if(checkedList[ci].checked == true)
		{
			var jzid = checkedList[ci].value;//就诊id
			jz_str = jz_str + jzid +"#";
		}
	}
	
	if(jz_str == "")
	{
		$.oimsAlert("请选择要对比的就诊记录!");
		return false;
	}	
	
     var duibiinfo;
	
     var getDuiBiItemsInfoUrl = "/publish/doctor/getDuiBiItemsInfoUrl.htm";
	//获取患者的就诊次数列表信息
     duibiinfo = getJSONData(getDuiBiItemsInfoUrl, {jzids : jz_str},"post").obj;
	
     var getMedicalRecordCategoryUrl = "/publish/doctor/getMedicalRecordCategory.htm";
	//获取电子病历分类（问诊、体格检查……）
	var categories = getJSONData(getMedicalRecordCategoryUrl).obj;
	
	//组织数据结构
	var arrList = [];
	
	for(var i =0;i<categories.length;i++)
	{
		//获取该分类下的子类
		var c_items = getJSONData(getMedicalRecordCategoryUrl, {id : categories[i].id}).obj;
		
		if(c_items.length>0) //如果该分类下有子类
		{
			var arrChildren = [];
			arrChildren.push(categories[i].category);//分类名称
			arrChildren.push(categories[i].id);		 //分类id
			var arr = [];
			for(var j =0;j<c_items.length;j++)
			{
				var arr1 = [];
				arr1.push(c_items[j].category);//子类名称
				arr1.push(c_items[j].id);	   //子类id
				arr.push(arr1);
			}
			arrChildren.push(arr);
			arrList.push(arrChildren);
		}
		else //如果该分类下没有子类
		{
			var arrNoChildren = [];
			arrNoChildren.push(categories[i].category);
			arrNoChildren.push(categories[i].id);
			var arr = [];
			var arrNo = [];
			arrNo.push(categories[i].category);
			arrNo.push(categories[i].id);
			arr.push(arrNo);
			arrNoChildren.push(arr);
			arrList.push(arrNoChildren);
		}
	}
	var listarr = [
	               {"category":"视力","id":"30007"},
			       {"category":"眼压","id":"30008"},
			       {"category":"验光","id":"30009"},
			       {"category":"检查单","id":"30010"},
			       {"category":"化验单","id":"30011"}
			      ];
	for(var j =0;j<listarr.length;j++)
	{
		var arrNoChildren = [];
		arrNoChildren.push(listarr[j]["category"]);
		arrNoChildren.push(listarr[j]["id"]);
		var arr = [];
		var arrNo = [];
		arrNo.push(listarr[j]["category"]);
		arrNo.push(listarr[j]["id"]);
		arr.push(arrNo);
		arrNoChildren.push(arr);
		arrList.push(arrNoChildren);
	}
	
	//弹出对比窗口
	var div_dialog = $("<div />")/*.attr("style","overflow:auto;height:500px")*/.addClass("emr_duibi00")
	                         .attr("id","show_duibi_full_info_div")
	                         .appendTo("body");
	div_dialog.oimsDialog({
		winType : -2,  //普通窗口
		 title : "对比",
		 width : 800,  //宽
		 height: 550,
		locked : true
		
	});
	
	$(".openWin").css("overflow","hidden");
	$(".opencontent").removeClass("opencontent").addClass("opencontentvs");
	$(".viewIcon").removeClass("viewIcon").addClass("vs");
	
	
	var time_div = $("<div />")/*.attr({"style":"height:35px;width:100%"})*/.addClass("emr_duibitimediv")
	                           .attr("id","time_div")
	                           .appendTo(div_dialog);
	var div_gd = $("<div />")/*.attr({"style":"height:465px;width:100%;overflow:auto"})*/.addClass("emr_duibigd")
	                         .attr("id","div_guding")
	                         .appendTo(div_dialog);
	var con_div = $("<div />").attr({"width":"100%"})
	                          .attr("id","div_con")
	                          .appendTo(div_gd);
	
	//实时检测对比弹出页面是否改变宽度,保持标题和内容的宽度一致
	checkscroll_s();
	
	//显示时间标题栏
	var table1 = $('<table width="100%" border="0" cellspacing="0" cellpadding="0" class="vstime"></table>')
    			 .appendTo(time_div);
    var table1Tr = $("<tr/>").appendTo(table1);
    $("<td/>").addClass("timew").text("时间").appendTo(table1Tr);
    for(var i =0;i<duibiinfo.length;i++)
    {
        if(duibiinfo[i]!=undefined)
        {										//就诊时间
        	$("<td/>").addClass("timetdw").text(formatjzdate(duibiinfo[i].jztime)).appendTo(table1Tr);
        }
        else
        {
        	$("<td/>").addClass("timetdw").text("").appendTo(table1Tr);
        }
    }
    
	
	for( var y = 0 ; y < arrList.length ; y++ )
	{
		var divBiaoTou =  $("<div/>").addClass("vsmenu").appendTo(con_div)
		                             .css({"cursor":"pointer"})
		                             .append($('<span class="vsopen"></span>'))
		                             .append(arrList[y][0])//父分类
		                             .click(function(){
		                            	 
								               var tableDom = $(this)[0].nextSibling;
								               if(tableDom.style.display == "none")
								               {
								            	   	tableDom.style.display = "";
								            	   	$("span",this)[0].className = "vsopen";
								               }
								               else
								               {
								            	   tableDom.style.display = "none";
								            	   $("span",this)[0].className = "vscolse";
								               }
		                             });
		var table1 = $('<table width="100%" border="0" cellspacing="0" cellpadding="0" class="opentable"></table>')
                     .css("display","").appendTo(con_div);
		
		//循环该父分类下的子分类
		for(var i = 0 ; i < arrList[y][2].length ; i++)
		{
			var table1Tr = $("<tr/>").appendTo(table1);
			$("<td/>").addClass("opentd").text(arrList[y][2][i][0]).appendTo(table1Tr);
			
			var t1 = "A"+arrList[y][1];
			var t2 = "A"+arrList[y][2][i][1];
			
			for(var n =0;n<duibiinfo.length;n++)
		    {
				$("<td/>").html(returnTextOrLink_s(duibiinfo,n,i,t1,t2)).appendTo(table1Tr);
		    }
		}	
	}
}	

//duibiinfo[n][t1][t2]

//填充TD单元格中的数据
//宋仁非
function returnTextOrLink_s(duibiinfo,n,i,t1,t2)
{
	if(duibiinfo[n][t1]==undefined)
	{
		return "无";
	}
	
	if($.trim(duibiinfo[n][t1][t2])=="")
	{
		return "无";
	}
	else
	{
		if(t1=="A30007")//视力
		{
			var d = duibiinfo[n][t1][t2];
			var str = "<p>" +
					  "左眼:矫正视力"+d.left_jiaozheng+
					  "  近视力"+d.left_jin+
					  "  裸眼视力"+d.left_luoyan+
			          "</p>" +
			          "<p>" +
			          "右眼:矫正视力"+d.right_jiaozheng+
			          "  近视力"+d.right_jin+
			          "  裸眼视力"+d.right_luoyan+
			          "</p>";
			return str;
		}
		else if (t1=="A30008")//眼压
		{
			var d = duibiinfo[n][t1][t2];
			
			var span = $("<span />").append("查看")
									.addClass("emr_duibishowspan")
			                        /*.attr("style","color: blue;cursor: pointer;")*/
			                        .click(function(){
			                        	showYanyachakan(d);
			                        });
			
			return span;
		}
		else if(t1=="A30009")//验光
		{
			var d = duibiinfo[n][t1][t2];
			var span = $("<span />").append("查看")
									.addClass("emr_duibishowspan")
            						/*.attr("style","color: blue;cursor: pointer;")*/
            						.click(function(){
            							showyanguangdialog(d);
            						});

			return span;
			
		}
		else if(t1=="A30010")//检查单
		{
			var d = duibiinfo[n][t1][t2];
			var div = $("<div />");
			for(var x = 0 ; x < d.length ; x++)
			{
				var ids = d[x].id;//检查单id
				
				
				$("<span />").append(d[x].title+", ")
				             .appendTo(div)
				             .addClass("emr_duibishowspan")
							 .attr({/*"style":"color: blue;cursor: pointer;",*/"id":ids})
							 .click(function(){
								 
								 showStudy_duibi($(this)[0].id);
							 });
				
			}	
			return div;
		}
		else if(t1=="A30011")//化验单
		{
			var d = duibiinfo[n][t1][t2];
			var div = $("<div />");
			for(var x = 0 ; x < d.length ; x++)
			{
				var ids = d[x].huayan_id;//化验单id
				
				
				$("<span />").append(d[x].huayanitem+", ")
				             .appendTo(div)
				             .addClass("emr_duibishowspan")
							 .attr({/*"style":"color: blue;cursor: pointer;",*/"id":ids})
							 .click(function(){
								 
								 showHuaYan_duibi($(this)[0].id);
							 });
				
			}	
			return div;
		}	
		else
		{	
			return duibiinfo[n][t1][t2];
		}
	}	
		
		
	
}


//实时检测对比弹出页面是否改变宽度,保持标题和内容的宽度一致
//宋仁非
function checkscroll_s()
{
	if($("#time_div").length<=0)
	{
		clearTimeout(duibi_timeout_handle);
		return false;
	}	
	
	var tdiv_w = $("#time_div").width();
	var cdiv_w = $("#div_con").width();
	
	if(tdiv_w!=cdiv_w)
	{
		$("#time_div").width(cdiv_w);
	}	
	duibi_timeout_handle = setTimeout('checkscroll_s()',500);
}



//格式化时间
//宋仁非
//check
function formatjzdate(d)
{
	var date = new Date(d.time);
	var day  = date.getDate();
	var month= date.getMonth() + 1;
	var year = date.getFullYear();
	
	if(month<10){month = "0"+month;}
	if(day<10){day = "0"+day;}	
    var date_str = year+"-"+month+"-"+day; 
    
    return date_str;
}

//check
function showHuaYan_duibi(ids)
{
	//ids 化验单id
	
	var div_gd = $("<div />")/*.attr("style","height:450px;overflow:auto")*/
							 .addClass("emr_duibilis")
    						 .attr("id","div_yanguang")
    						 .appendTo("body");
	div_gd.oimsDialog({
						winType : -2,  //普通窗口
						title : "化验",
						width : 430,  //宽
						height: 500,
						locked : false

					 });

	$(".openWin").css("overflow","hidden");
	
	var table_data =  $("<table />").attr({cellspacing:"2",cellpadding:"0",border:"0",})
	.addClass("emr_huayantable")
    /*.css({
			"border-top":"1px solid #D2D2D2",
			"text-align":"center",
			"color":" #4F4F4F",
			"font-size":"14px",
			"font-size": "12px",
			"color": "#4F4F4F;"
        })*/.appendTo(div_gd);

	var tb_th=["代号","项目名称","结果","参考值","单位"];//设置表头显示
	for(var i=0,l=tb_th.length;i<l;i++)
	{
		$("<th />").addClass("emr_huayantableth")/*.css({
						"background": "none repeat scroll 0 0 #D2D2D2",
							"height": "22px",
					   "line-height": "22px"
					   })*/
				   .text(tb_th[i])
				   .appendTo(table_data);
	}

	var td_css={
				"border-top": "1px solid #D2D2D2",
				"text-align": "center",
				    "height": "25px",
			  "padding-left": "2px",
			 "padding-right": "3px",
				"word-break": "break-all",
				 "min-width": "50px"
			   };

	var huayandan = null;

	var getHuaYanDanDetailInfoUrl = "/publish/doctor/getHuaYanDanDetailInfoUrl.htm";
	
	//获取该化验单详细数据
	huayandan = getJSONData(getHuaYanDanDetailInfoUrl, {hyid : ids,tag : Math.random()},"post").obj;

	//加载单元格中的数据
	for(var i = 0 ; i < huayandan.length ; i++)
	{
		var tr = $("<tr />").appendTo(table_data);
		$("<td />").addClass("emr_huayantabletd")/*.css(td_css)*/.text(huayandan[i].code).appendTo(tr);
		$("<td />").addClass("emr_huayantabletd")/*.css(td_css)*/.text(huayandan[i].name).appendTo(tr);
		$("<td />").addClass("emr_huayantabletd")/*.css(td_css)*/.text(huayandan[i].value).appendTo(tr);
		$("<td />").addClass("emr_huayantabletd")/*.css(td_css)*/.text(huayandan[i].reference).appendTo(tr);
		$("<td />").addClass("emr_huayantabletd")/*.css(td_css)*/.text(huayandan[i].unit).appendTo(tr);
	}
}

/*
 * 查看检查单
 * id 检查单id
 */
function showStudy_duibi(ids)
{
	//ids 检查单id
	var study;
	
	var getStudyUrl = "/publish/doctor/getStudy.htm";
	
	//获取检查单信息 （检查时间、图像列表）
	
	study = getJSONData(getStudyUrl, {id : $.trim(ids),tag : Math.random()}).obj;
	
	//console.log(study);
	
	//弹出窗口
	var div = $("<div />")/*.attr("style","height:520px;overflow:auto")*/.addClass("emr_duibistudydiv")
	 						 .attr("id","div_jcDan")
	 						 .appendTo("body");
	
	  div.oimsDialog({
		               winType : -2,  //普通窗口
		               title   : "检查单",
		               width   : 800,  //宽
		               height  : 550,
		               locked  : false
					});
	
	$(".openWin").css("overflow","hidden");
	
	//return false;
	
	//先清除图片查看插件 防止重复加载
	if($(".oimsslide-gallery").length>0)
	{
		$(".oimsslide-gallery").remove();
	}
	//拼接图像显示区域的图片
	var slidediv = $("<div />").attr("class","oimsslide-gallery");
	
	slidediv.appendTo(div);
	
	//先显示16张图片
	forShow();
	
	//加载图片
	function forShow()
	{
		if(study.length>0)
		{	
			var m = 0;
			if(study.length>=16){m=16;}else{m=study.length;}
			for(var i = 0; i<m;i++)
			{
				var d = study.shift();
				
				var div = $("<div />").addClass("emr_oimsslidediv")/*.attr({"style":"width:195px; height:146px; float:left;text-align:center ;vertical-align: middle; "})*/
									  .appendTo(slidediv);
				
				var t = $("<a />").appendTo(div);
				
				$("<div />").attr("class","oimsslide-caption")
				            .text("").appendTo(div);
				showThumbJCDan(d,i,t);
			}
		}
	}
	
	var scroll_height = 0;
	
	//鼠标滚轮事件 触发动态加载剩余图片
	div.scroll( function() { 
		
		if(div.scrollTop()-scroll_height>=10)
		{
			scroll_height = div.scrollTop();
			
			forShow();
		}	
		
	});
	
}
/*
 * 显示缩略图
 */
function showThumbJCDan(d,i,t) 
{
	//获取图像后缀名
	var ext = d.path.split(".")[d.path.split(".").length - 1];
	
	if (ext == "jpg" || ext == "jpeg" || ext == "png" || ext == "gif"
		||ext == "JPG"|| ext == "JPEG" || ext == "PNG" || ext == "GIF") 
	{
		
		var image = $("<img />").attr("src", contextPath+"/"+d.path)
								.appendTo(t);
								
		//获取大图地址
		var path = yuantuQuanxian() ? d.path.replace("\\thumb", "") : d.path;
		
		//给A标签添加方法 class href
		t.attr("onclick","return hs.expand(this)")
		 .attr("class","oimsslide")
		 .attr("href",contextPath+"/"+path);
		
		
		//图片等比缩放
		suofang_tupianJcDan(image,d);
		
	} 
	else 
	{
		//查看视频文件
		showFlvJcDan(d.path,i,t);
	}
}

//等比缩放图片 
function suofang_tupianJcDan(image,d)
{
	var result = imageZoom(d.w,d.h,195,146);
	
	image.attr("width",result.width).attr("height",result.height);
	
	if(image.attr("height")=="0"||image.attr("width")=="0")
	{
		image.attr("width",195).attr("height",146);
	}	
}

/*
 * 显示视频
 */
function showFlvJcDan(path,i,t) 
{
	importCSS("/flowplayer/style.css");
	importJS("/js/swfobject.js");
	importJS("/flowplayer/flowplayer-3.2.11.min.js");
	
	 t.attr("id", "player"+i)
	  .attr("class","oimsslide")
	  .attr("href", contextPath +"\\"+path);
    flowplayer("player"+i, contextPath+ "/flowplayer/flowplayer-3.2.15.swf");
}

/*
 * 查看验光数据
 */
function showyanguangdialog(d)
{
	var div_gd = $("<div />")/*.attr("style","height:470px;overflow:auto")*/.addClass("emr_duibiyanguangdiv")
	                         .attr("id","div_yanguang")
	                         .appendTo("body");
	div_gd.oimsDialog({
		winType : -2,  //普通窗口
		 title : "验光",
		 width : 430,  //宽
		 height: 500,
		locked : false
		
	});
	
	$(".openWin").css("overflow","hidden");
	
	
	var t=$("<table />").appendTo($("#div_yanguang"));
	$("<caption />").append(language_doctor.KeGuanQuGuangDuValue/*"客观屈光度参考值"*/).appendTo(t);
	var tr = $("<tr />").appendTo(t);
	$("<th />").text("").appendTo(tr);
	$("<th />").text(language_doctor.QiuJingDu/*"球镜度"*/).appendTo(tr);
	$("<th />").text(language_doctor.SanGuangDu/*"散光度"*/).appendTo(tr);
	$("<th />").text(language_doctor.ZhouWei/*"轴位"*/).appendTo(tr);
	
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.LeftEye).appendTo(tr);//"左眼"
	$("<td />").attr("id","refLS").appendTo(tr);
	$("<td />").attr("id","refLC").appendTo(tr);
	$("<td />").attr("id","refLA").appendTo(tr);
	
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.RightEye).appendTo(tr);//"右眼"
	$("<td />").attr("id","refRS").appendTo(tr);
	$("<td />").attr("id","refRC").appendTo(tr);
	$("<td />").attr("id","refRA").appendTo(tr);
	
	
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.TongJu/*"瞳距"*/).appendTo(tr);//"瞳距"
	$("<td />").attr({"id":"refPd","colspan":"3"}).appendTo(tr);
	
	
	
	var t=$("<table />").appendTo($("#div_yanguang"));
	$("<caption />").append(language_doctor.JiaoMoQuLv/*"角膜曲率参考值"*/).appendTo(t);
	var tr = $("<tr />").appendTo(t);
	$("<th />").text(language_doctor.LeftEye/*"左眼"*/).appendTo(tr);//"眼别"
	$("<th />").text(language_doctor.JiaoMoQuGuangDu/*"角膜曲光度"*/).appendTo(tr);
	$("<th />").text(language_doctor.QuLvBanJing/*"曲率半径"*/).appendTo(tr);
	$("<th />").text(language_doctor.FangXiang/*"方向"*/).appendTo(tr);
	
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.ShuiPingFangXiang/*"水平方向"*/).appendTo(tr);//"左眼"
	$("<td />").attr("id","krtLHd").appendTo(tr);
	$("<td />").attr("id","krtLHmm").appendTo(tr);
	$("<td />").attr("id","krtLHa").appendTo(tr);
	
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.ChuiZhiFangXiang/*"垂直方向"*/).appendTo(tr);//"右眼"
	$("<td />").attr("id","krtLVd").appendTo(tr);
	$("<td />").attr("id","krtLVmm").appendTo(tr);
	$("<td />").attr("id","krtLVa").appendTo(tr);
	
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.PingJunZhi/*"平均值"*/).appendTo(tr);//"右眼"
	$("<td />").attr("id","krtLAved").appendTo(tr);
	$("<td />").attr("id","krtLAvemm").appendTo(tr);
	$("<td />").attr("id","16od").appendTo(tr);
	
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.JiaoMoSanGuangDu/*"角膜散光度"*/).appendTo(tr);//"右眼"
	$("<td />").attr("id","14od").appendTo(tr);
	$("<td />").attr("id","krtLCylmm").appendTo(tr);
	$("<td />").attr("id","krtLCyla").appendTo(tr);
	
	var tr = $("<tr />").appendTo(t);
	$("<th />").text(language_doctor.RightEye/*"右眼"*/).appendTo(tr);//"眼别"
	$("<th />").text(language_doctor.JiaoMoQuGuangDu/*"角膜曲光度"*/).appendTo(tr);
	$("<th />").text(language_doctor.QuLvBanJing/*"曲率半径"*/).appendTo(tr);
	$("<th />").text(language_doctor.FangXiang/*"方向"*/).appendTo(tr);
	
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.ShuiPingFangXiang/*"水平方向"*/).appendTo(tr);//"左眼"
	$("<td />").attr("id","krtRHd").appendTo(tr);
	$("<td />").attr("id","krtRHmm").appendTo(tr);
	$("<td />").attr("id","krtRHa").appendTo(tr);
	
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.ChuiZhiFangXiang/*"垂直方向"*/).appendTo(tr);//"右眼"
	$("<td />").attr("id","krtRVd").appendTo(tr);
	$("<td />").attr("id","krtRVmm").appendTo(tr);
	$("<td />").attr("id","krtRVa").appendTo(tr);
	
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.PingJunZhi/*"平均值"*/).appendTo(tr);//"右眼"
	$("<td />").attr("id","krtRAved").appendTo(tr);
	$("<td />").attr("id","krtRAvemm").appendTo(tr);
	$("<td />").attr("id","16od").appendTo(tr);
	
	tr=$("<tr />").appendTo(t);
	$("<td />").text(language_doctor.JiaoMoSanGuangDu/*"角膜散光度"*/).appendTo(tr);//"右眼"
	$("<td />").attr("id","14od").appendTo(tr);
	$("<td />").attr("id","krtRCylmm").appendTo(tr);
	$("<td />").attr("id","krtRCyla").appendTo(tr);
	
	
	$("#refLS").text(d.refLS);
	$("#refLC").text(d.refLC);
	$("#refLA").text(d.refLA);
	
	$("#refRS").text(d.refRS);
	$("#refRC").text(d.refRC);
	$("#refRA").text(d.refRA);
	
	$("#refPd").text(d.refPd);
	
	$("#krtLHd").text(d.krtLHd);
	$("#krtLHmm").text(d.krtLHmm);
	$("#krtLHa").text(d.krtLHa);
	
	$("#krtLVd").text(d.krtLVd);
	$("#krtLVmm").text(d.krtLVmm);
	$("#krtLVa").text(d.krtLVa);
	
	$("#krtLAved").text(d.krtLAved);
	$("#krtLAvemm").text(d.krtLAvemm);
	
	$("#krtLCylmm").text(d.krtLCylmm);
	$("#krtLCyla").text(d.krtLCyla);
	
	$("#krtRHd").text(d.krtRHd);
	$("#krtRHmm").text(d.krtRHmm);
	$("#krtRHa").text(d.krtRHa);
	
	$("#krtRVd").text(d.krtRVd);
	$("#krtRVmm").text(d.krtRVmm);
	$("#krtRVa").text(d.krtRVa);
	
	$("#krtRAved").text(d.krtRAved);
	$("#krtRAvemm").text(d.krtRAvemm);
	
	$("#krtRCylmm").text(d.krtRCylmm);
	$("#krtRCyla").text(d.krtRCyla);
	
}

/*
 * 查看眼压曲线
 */
function showYanyachakan(d)
{
	var div_gd = $("<div />").attr("id","div_yanya1").appendTo("body");
	
	div_gd.oimsDialog({
						winType : -2,   //普通窗口
						title   : "眼压曲线",
						width   : 430,  //宽
						height  : 340,  //高
						locked  : false
					 });
	
	$(".openWin").css("overflow","hidden");
	
	sw = 410;
	sh = 300;
	var l_data = [];
	var r_data = [];
	
	var date = [];
	
	for(var i = 0;i<d.length;i++)
	{
		
		l_data.push(d[i].left==null?0:d[i].left);
		r_data.push(d[i].right==null?0:d[i].right);
		
		var h = d[i].ycsj.hours;
		var m = d[i].ycsj.minutes;
		var h_str = "";
		var m_str = "";
		
		if(h<10){h_str = "0"+h;}
		else{h_str = h;}
		
		if(m<10){m_str = "0"+m;}
		else{m_str = m;}	
		date.push(h_str+":"+m_str);
	}	
	
	
	createClickChaKan(sw,sh,l_data,r_data,date);
	
}
/*
 * 眼压曲线内容
 * 用法举例：
 * sw 曲线图的宽
 * sh 曲线图的高
 * l_data 左眼的参数
 * r_data 右眼的参数
 * date 检查日期
 */
function createClickChaKan(sw,sh,l_data,r_data,date)
{
	
	
	
	var option = 
				{
					chartContent:{width:sw,height:sh},
					divContent:{id:"div_yanya1"},
					xAxisContent:{name:language_doctor.Jcsj,unit:""}, //检查时间
					yAxisContent:{name:language_doctor.YanYa+"(mmHg)",unit:""},//眼压
					arrayContent:[{name:language_doctor.LeftEye/*"左眼"*/,data:l_data},
					              {name:language_doctor.RightEye/*"右眼"*/,data:r_data}],
					categoriesNum:date
				};
	creteChartChaKan(option);
}
/*
 * 眼压曲线参数设置
 * check
 */
function creteChartChaKan(options)
{
    var chart = new Highcharts.Chart({
    	
        chart: {
            	renderTo: options.divContent.id,
            	type: 'line',
            	width: options.chartContent.width,
            	height:options.chartContent.height,
            	style: 
            		 {
            			margin: '0 auto'
            		 }
               },
               
        title: {
            	text: language_doctor.YanYaToLine/*'眼压曲线'*/
               },
               
     subtitle: {
            	text: ''
               },
               
        xAxis: {
				categories: options.categoriesNum,
					 title: {
						 	enabled:true,
						 	 text: options.xAxisContent.name
					        },
			        labels: {
			                 formatter: function() 
			                            {
			                	 			return this.value + options.xAxisContent.unit;
			                            }
			        		},
			        		lineWidth: 2
               }, 
        	   
        yAxis: {
            	title: {
            			text: options.yAxisContent.name
            		   },
               labels: {
		                formatter: function() 
		                		   {
		                    			return this.value + options.yAxisContent.unit;
		                		   }
               		   },
            lineWidth: 2,
			      min: 0
        },
        
        legend: {
            enabled: true
        },
        
        tooltip: {
			enabled: true,
            formatter: function() 
            		   {
                			return this.x +options.xAxisContent.unit+"<br/>"+
                			this.series.name + ":"+ this.y +options.yAxisContent.unit + "<br/>";
            		   }
        },
        
		plotOptions: {
						line: {
								dataLabels: {
												enabled: true
											},
								enableMouseTracking: true
							  }
		},
		
        series: options.arrayContent
        
    });
}
