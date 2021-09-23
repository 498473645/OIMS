var FIND_YGJL_URL="/publish/yuangong/findYuangGongJianli.htm";
var FIND_YUANGONG_BY_GH_URL="/publish/yuangong/findYuangongByGh.htm";
var SAVE_YGJL_URL="/publish/yuangong/saveOrUpdateYgjl.htm";
var TEMPLATE_YGJL_URL="/js/manager/yuangong/template/jianli.html";
var TEMPLATE_YGJL_JT_URL="/js/manager/yuangong/template/jianliJT.html";
var DELETE_YGJL_URL="/publish/yuangong/deleteYgjl.htm";
var UPLOADFILE="/publish/yuangong/getUploadFileOfJianli.htm";//附件上传
var DOWNLOADFILE="/publish/yuangong/downLoadFileOfJianli.htm";//导出word

/**
 * 
 */
function wodeGerenJianli(btns){
	var gonghao = userData.gonghao;
	showYuangongJianli(gonghao,true,1);
	tiaoZhengYeiMian() ;
}

function tiaoZhengYeiMian(){
	var tmp ;
	/*设置所有表格的第一行第一格*/
	$(".MsoNormalTable").find("tr:first").find("td").removeAttr("width") ;
	$(".MsoNormalTable").find("tr:first").find("td").css("width","auto")
	$(".MsoNormalTable").find("tr:first").find("td:first").css("width","123px") ;
	$(".MsoNormalTable").find("tr:first").find("td:first").width(123) ;
	
	/*设置所有表格的第一行最后一格*/
	$(".MsoNormalTable").find("tr:first").find("td:last").removeAttr("width") ;
	$(".MsoNormalTable").find("tr:first").find("td:last").css("width","120px") ;
	$(".MsoNormalTable").find("tr:first").find("td:last").width(120) ;
	
	
	/*设置第一学历*/
	$("[name=dyxl]").find("tr:first").find("td:eq(2)").css("width","400px") ;
	
	/*设置最高学历*/
	$("[name=zgxl]").find("tr:first").find("td:eq(2)").css("width","400px") ;
	/*设置学位*/
	$("[name=xuewei]").find("tr:first").find("td:eq(2)").css("width","400px") ;
	/*设置发表论文*/
	$("[name=fblw]").find("tr:first").find("td:eq(1)").css("width","50px") ;
	
	$('input',$('#yg_jb_xx_table')).each(function(i,el){
		$(el).removeAttr('readOnly') ;
	}) ;
	$('input[name=yuangong_name]',$('#yg_jb_xx_table')).attr('readOnly','readOnly') ;
	//$('input[name=yuangong_sex]',$('#yg_jb_xx_table')).attr('readOnly','readOnly') ;
	
} ;
/**
 * 显示员工简历
 */
function showYuangongJianli(gonghao, edit,btns){
	if(!gonghao){
		var select = getCheckBoxValue();
		if(select.length!=1){
			$.oimsAlert("请选择一个员工！");
			return;
		}else{
			gonghao = select[0].gonghao?select[0].gonghao:select[0].gh;
		}
	}
	var re= getJSONData(FIND_YUANGONG_BY_GH_URL,{gh:gonghao},"POST");
	if(!re.state){
		$.oimsAlert("未找到员工！");
		return;
	}
	var yg=re.obj;
	re = getJSONData(FIND_YGJL_URL, {gonghao:gonghao},"POST");
	if(!re.state){
		$.oimsError("获取员工简历时出错了！");
		return;
	}
	
	pageTitle = yg.xingming + "简历";
	init();
	var div = $("<div />").css({"overflow":"auto"}).height($("#right").innerHeight()-$("#right").children(".title").outerHeight()-2).addClass("yuangongJianli").appendTo("#right");
	//--------------
	var html;
	$.ajax({url:contextPath+TEMPLATE_YGJL_JT_URL+"?tag="+Math.random(), async : false, type : "GET", success : function(t){html=t;}});
	var div = $('<form />').attr("id","jianliForm").addClass('jianliForm').append(html).appendTo($(".yuangongJianli")) ;
	var form_photo= "<form id='upTXForm1' action="+contextPath+"'/publish/yuangong/updataYuanGongTouXiangManage.htm' enctype='multipart/form-data' method='post'>"+
    // "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"+
	//	          "<tr>"+
	//	           " <td width='26%' rowspan='4' class='photo'><img src='../ygPhoto/head.png' width='80' height='100' id='image_Tx'/></td>"+
	//	            "<td width='17%' align='right' class='photo'>"+userConf_language.UploadHeadPhoto+"：</td>"+
	//	            "<td width='57%' align='left' >"+
					"<input type='hidden' id='gh_hide' name='gh_hide'/>"+
		            "<div class='searchfile'>"+
		            "<input type='file' name='yg_photo1' class='filed1' id='yg_photo1' onchange=\"onChange_TouXiangPath_yg('"+yg.gonghao+"');\"/>"+
					"<div class='fieldstyle'><input type='text' name='txt_fieldstyle1' readonly='readonly' id='txt_fieldstyle1' class='fieldtext1'/></div>"+
					"<div class='buttonstyle'><input type='button'  id='btn_yuyan1' class='fieldbutton1'/></div></div>"+"</form>";
	$(form_photo).appendTo($("#user_photo").parent().parent().parent());
	$.customfile('fieldbutton1', 'filed1', 'fieldtext1');
	//				"</div>"+
	//----------
	if(yg.photo && isWebPhoto(yg.photo)){
		$("#user_photo").attr("src",contextPath+yg.photo);
	}
//	$('select[name=detailKind]').change(function(){
//		$(this).next().val($('select[name=detailKind]'));
//	});
	console.log(yg);
    $("#yuangong_gonghao").html(yg.gonghao) ;
    $("#yuangong_name").val(yg.xingming) ;
    $("#yuangong_sex").val(yg.xingbie) ;
    $("#yuangong_shenfenzheng").val(yg.sfzh);
    if(yg.shengri!=null)$("#yuangong_birthday").val(formatDate(yg.shengri.time));
    $("#yuangong_title").val(yg.title);
    $("#yuanggong_phone").val(yg.dianhua) ;
    $("#yuangong_email").val(yg.email) ;
    $("#yuangong_address").val(yg.diqu) ;
    
    $("input[name=yuangong_jg]").val(yg.yuangong_jg) ;
    $("select[name=yuangong_hy]").val(yg.yuangong_hy_i) ;
    $("input[name=yuangong_mz]").val(yg.yuangong_mz) ;
    $("select[name=yuangong_zzmm]").val(yg.yuangong_zzmm_i) ;
    $("input[name=yuangong_sg]").val(yg.yuangong_sg) ;
    if(yg.zhicheng_filePath){
    	$('a.zhicheng_filePath').attr('target','_Blank') ;
		$('a.zhicheng_filePath').attr('src',yg.zhicheng_filePath).text('文件') ;
		$($('a.zhicheng_filePath').parent().parent().parent().next().find('input')[0]).val(yg.id);
    }
    if(yg.sfzh_filePath){
    	$('a.sfzh_filePath').attr('target','_Blank') ;
		$('a.sfzh_filePath').attr('src',yg.sfzh_filePath).text('文件') ;
		$($('a.sfzh_filePath').parent().parent().parent().next().find('input')[0]).val(yg.id);
    }
    
    blandDataToPage(re) ; //绑定数据到各个table
    $("a[name=addRow]").click(function(){
    	var me = $(this) ;
    	var rowSpan = me.parents("tr").parent().children('tr:first').children("td:first").attr('rowspan');
    	me.parents("tr").parent().children('tr:first').children("td:first").attr('rowspan',parseInt(rowSpan)+1)
    	var table = me.parents("tr").parent() ;//得到table
    	var lastTr = table.children('tr:last') ;//得到最后一个tr
    	var tdclone = lastTr.clone() ;
    	$.each(tdclone.find('input'),function(){
    			$(this).val('');
    	});
    	$.each(tdclone.find('a[name!=addRow]'),function(){
    		$(this).html('未发现附件');
    		$(this).attr('src','');
    	});
    	$(tdclone).find('a[name=addRow]').remove();
    	tdclone.appendTo(table) ;
    	 eventHandler(edit,gonghao) ; 
    	 eventUploadHandler(edit,gonghao) ;//文件上传处理
    	 eventFileDownLoadHandler() ; //处理文件下载事件
    });
    eventHandler(edit,gonghao) ; //保存删除事件处理
    eventUploadHandler(edit,gonghao) ;//文件上传处理
    eventFileDownLoadHandler() ; //处理文件下载事件    
	if(btns==1){
		$("#jlclose").remove();
	}
    $("#jlclose").click(function() {
	    $.oimsConfirm({strTitle :"关闭前请确认已保存，确认关闭吗？",remove_length : true},function(){  
	    	showYuanGongList(btns);
		});
	});// 点击输入框清空字体
}
function onChange_TouXiangPath_yg(gonghao) {
	$("#upTXForm1")[0].action = contextPath
			+ "/publish/yuangong/updataYuanGongTouXiangManage.htm";
	$("#upTXForm1").ajaxForm(
			{
				dataType : "json",
				iframe : true,
				beforeSend : function() {
					$("#gh_hide").val(gonghao);
				},
				uploadProgress : function() {
				},
				complete : function(data_Result) {
					$("#upTXForm1")[0].action = "/publish/yuangong/updataYuanGongTouXiangManage.htm";
					var data_pre = data_Result.responseText;
					var data_string = "";
					if (data_pre.indexOf("</pre") == -1)
						data_string = data_pre;
					else
						data_string = data_pre.substring(data_pre.indexOf("{"),
								data_pre.indexOf("</pre"));
					var data = eval("(" + data_string + ")");
					var data_state = data.state;
					var data_obj = data.obj;
					if (data_state == 1) {
						if (data_obj.photo != null&& data_obj.photo != ""){
							$("#user_photo").attr("src",contextPath+ data_obj.photo);
							ygPhoto = contextPath +data_obj.photo;
						}
					} else
						$.oimsAlert("头像上传失败");
				}
			});
	$("#upTXForm1").submit();
}
function eventFileDownLoadHandler(){
	$("[name=filepath]").click(function(){
		if($(this).attr('src')==''){
			return ;
		}
//		window.location.href = $(this).attr('src') ;
		window.open($(this).attr('src'));
	});
}

function eventUploadHandler(edit,gonghao){
	if(!edit){
		return  ;
	}
	$("span[name=fujian]").click(function(){
		return false ;
	});
	$("span[name=fujian]").click(function(){
		var me = this ;
		$("<form/>")
		.attr('id','fileUploadForm')
		.attr('action',contextPath+UPLOADFILE)
		.attr("enctype", "multipart/form-data")
		.attr("method", "post")
		.append($("<input type='file' name='uploadFile' class='fieldbutton'/>")).oimsDialog({title:'附件上传',width:250,height:150,
			locked:true,
			button:[{
		    	  title:'上传',
		    	  className : "ok",//指定CSS名称
		    	  func:function(a,b){
		    		  if($("#fileUploadForm").find('input').val()==''){
		    			  $.oimsError('对不起,您还没有选择文件,不能进行上传操作') ;
		    			  return ;
		    		  }else {
		    			  $("#fileUploadForm").ajaxForm(
		    						{
		    							uploadProgress : function() {
		    							},
		    							complete : function(data_Result) {
		    								var data_pre = data_Result.responseText;
		    								var data_string = "";
		    								if (data_pre.indexOf("</pre") == -1)
		    									data_string = data_pre;
		    								else
		    									data_string = data_pre.substring(data_pre.indexOf("{"),
		    											data_pre.indexOf("</pre"));
		    								var data_Obj = eval("(" + data_string + ")");
		    								var state = data_Obj.state;
		    								if (state)
		    									$.oimsSucc("上传附件成功", function() {
		    										$(me).parents('tr').find('a[name=filepath]').html(data_Obj.obj.fujian) ;
		    										$(me).parents('tr').find('a[name=filepath]').attr('src',contextPath+data_Obj.obj.path);
		    										removeDiv_openWin();
		    									});
		    								else
		    									$.oimsError("上传附件失败", function() {
		    										removeDiv_openWin();
		    									});

		    							
		    							}
		    						});
		    				$("#fileUploadForm").submit();
					}
		    	  }
		      }]
		});
	});
}
   function eventHandler(edit,gonghao){
	   $("span").unbind("click") ;
	   $("span[name=exprotWord]").click(function(){
		   $.oimsConfirm({
				strTitle : "是否确认导出WORD文档",
				remove_length : true
			}, function() {
//				var data = getJSONData(DOWNLOADFILE, {
//					gonghao:gonghao,
//					tag : Math.random()
//				}, "post");
//				
//				if (data.state == 1) {
//					window.location.href = contextPath+data.obj ;
//				} else if (data.state == 0) {
//					$.oimsAlert("导出WORD错误,请联系管理员", null);
//				}
				window.location.href = contextPath+DOWNLOADFILE+"?gonghao="+gonghao ;
			});
	   }) ;
	   if(edit){ //可编辑的情况
           $("input[class=inputTime]").blur(function(){
        	  if(!Date.parseDate($(this).val(),'yyyy-mm-dd')){
        		  $(this).val('');
        	  }
           });
           
           datetimepicker($("input.inputTime"),{
   			todayButton:false,
   			defaultSelect:false,
   			timepicker:false,
   			format:'Y-m-d'
   		});
         
		   $("span[name=delete]").click(function(e){ //删除数据事件处理
			   var tr = $(this).parent().parent().parent() ; //得到当前按钮所在的tr
			   if($(tr).find('input:last').val()==''){ $.oimsError('对不起,您不能做这样的操作') ;return ;}//得到最后一个input元素（ID),如果此元素值为''则提示无法删除
			   else{
				   var id = $(tr).find('input:last').val() ; //得到ID , 进行删除炒作
				   $.oimsConfirm({
						strTitle : "确认删除该条记录?",
						remove_length : true
					}, function(){doDel(tr)},null);
			   }
		   }) ;
		   $("span[name=sfzh_delete]").click(function(e){ //删除数据事件处理
			   if(!$('a.sfzh_filePath').attr('src')){
				   $.oimsError('不存在可删除附件');return;
			   }
			   else{
				   var tr=$(this).parent().parent().parent();
				   $.oimsConfirm({
					   strTitle:"确认删除附件?",
					   remove_length:true
				   },function(){
					   var re = getJSONData(DELETE_YGJL_URL,{type:'sfzh_filePath',id:$(tr).find('input:last').val()},"POST");
						if(!re.state){
							$.oimsAlert("删除失败！");
						}else{
							 $.oimsSucc('数据删除成功') ;
						}
					    $('a.sfzh_filePath').text('未发现附件');
					    $('a.sfzh_filePath').attr('src','') ;
				   },null);
			   }
		   }) ;
		   $("span[name=zhicheng_delete]").click(function(e){ //删除数据事件处理
			   if(!$('a.zhicheng_filePath').attr('src')){
				   $.oimsError('不存在可删除附件');return;
			   }
			   else{
				   var tr=$(this).parent().parent().parent();
				   $.oimsConfirm({
					   strTitle:"确认删除附件?",
					   remove_length:true
				   },function(){
					   var re = getJSONData(DELETE_YGJL_URL,{type:'zhicheng_filePath',id:$(tr).find('input:last').val()},"POST");
						if(!re.state){
							$.oimsAlert("删除失败！");
						}else{
							 $.oimsSucc('数据删除成功') ;
						}
					    $('a.zhicheng_filePath').text('未发现附件');
					    $('a.zhicheng_filePath').attr('src','') ;
				   
				   },null);
			   }
		   }) ;
		   $("span[name=saveData]").click(function(){//保存事件处理
			   var tr = $(this).parent().parent().parent() ; //得到当前按钮所在的tr
			   var model = fomateTrData(tr) ;
			   model.type = $(this).parents('table').attr('name');
			   model.gonghao = gonghao ;
			   if(model.type=='yuangong'){
				   
			   }else{
				   if(!sureCanSubmit(tr)){
					   $.oimsError('对不起,数据不全不能保存') ;
					 //一行数据都为空则无法提交
					   return false;
				   }
			   }
				  var data = getJSONData(SAVE_YGJL_URL,model,'POST') ;
				  if(data.state){
					  if(data.obj.id)
						  $(tr).find('input:last').val(data.obj.id) ;
					  $.oimsSucc('数据保存成功') ;
				  }else {
					  $.oimsError('对不起,数据保存失败') ;
				  }
		   });
		   $("span[name=saveDataText]").click(function(){
			   var tr = $(this).parent().parent().parent() ; //得到当前按钮所在的tr 
			   var table = tr.parent() ;
			   if($(tr).find('textarea').val()==''){$.oimsError('对不起,数据不全不能保存') ;return }
			   else{
				   var model = fomateTrData(tr) ;
				   model.type = $(this).parents('table').attr('name');
				   model.gonghao = gonghao ;
				   model.name = $(tr).find('textarea').val();
				  var data = getJSONData(SAVE_YGJL_URL,model,'POST') ;
				  if(data.state){
					  $(tr).find('input:last').val(data.obj.id) ;
					  $.oimsSucc('数据保存成功') ;
				  }else {
					  $.oimsError('对不起,数据保存失败') ;
				}
			   }
			   
		   });
	   }else {//不可编辑的情况，所有输入框只读 
		   $.each($("[ name=option]"),function(){
			   $(this).css('display','none');
		   });
		   $.each($("input"),function(){
				$(this).attr('readOnly','readOnly');
			});
		   $.each($("select"),function(){
				$(this).attr('disabled','disabled');
			});
			$.each($("textarea"),function(){
				$(this).attr('disabled','disabled') ;
			});
			$.each($(".redClass"),function(){
				$(this).attr('class','') ;
			}) ;
			$.each($(".blueClass"),function(){
				$(this).attr('class','') ;
			}) ;
			
	}
   }
   /*判断tr中每个input标签(除了id)是否为空*/
   function sureCanSubmit(tr){
	   var inputs = $(tr).find('input:not([name=id],[name=fujian])') ;//筛选出name！=id的所有input
	   var cansubimit = true ;
	   $.each($(inputs),function(){
		   if($(this).val()==''){
			   cansubimit =false;
		   }
	   });
	   return cansubimit ;
   }
   
   /*删除方法*/
   function doDel(tr){
	   var type = tr.parent('tbody').parent('table').attr('name') ;
	   var re = getJSONData(DELETE_YGJL_URL,{type:type,id:$(tr).find('input:last').val()},"POST");
		if(!re.state){
			$.oimsAlert("删除失败！");
		}else{
			 $.oimsSucc('数据删除成功') ;
		}
	   clearData(tr) ;
   }
   /*数据清0方法 删除成功后使用*/
   function clearData(tr){
	   $.each($(tr).find('input'),function(){
		   $(this).val('') ;
	   });
	   $.each($(tr).find('textarea'),function(){
		   $(this).val('') ;
	   });
	   $.each($(tr).find("[name=filepath]"),function(){
		   $(this).text('未发现附件');
		   $(this).attr('src','') ;
	   });
   } ;
   
   /*保存所对应的行元素，封装成param,并提*/
   function fomateTrData(tr){
	   var table = tr.parent('tbody').parent('table') ;
	   var param = {} ;
	   param.type = table.attr('name') ;
	   var tmp,jel ;
	   if(param.type=='yuangong'){
		   jel = table ;
	   }else{
		   jel = tr ;
	   }
	   
	   jel.find('input').each(function(i,el){
		   tmp = $(el) ;
		   param[tmp.attr('name')]=tmp.val() ;
	   }) ;
	   jel.find('select').each(function(i,el){
		   tmp = $(el) ;
		   param[tmp.attr('name')]=tmp.val() ;
	   }) ;
	   jel.find('textarea').each(function(i,el){
		   tmp = $(el) ;
		   param[tmp.attr('name')]=tmp.val() ;
	   }) ;
	   if(param.type=='yuangong'){
		   param.zhicheng_filePath=$(jel.find('a.zhicheng_filePath')[0]).attr('src');
		   param.sfzh_filePath=$(jel.find('a.sfzh_filePath')[0]).attr('src');
	   }else{
		   $(jel.find('a[name=filepath]')).each(function(i,el){
			   tmp = $(el) ;
			   param.filePath=tmp.attr('src') ;
		   }) ;   
	   }
	   
	   return param ;
   } ;
   
   /*将需要保持的tr中的每个数据封装成对象，点击保存时以ajax的方式提交*/
   function fomateTrData_bak(tr){
	   var inputs = $(tr).find('input'); //得到tr内所有的input元素
	   var selects = $(tr).find('select') ;
	   var fujian = $(tr).find('a[name=filepath]') ;
	   var model= {} ;
	   model.classType = $(selects).val() ;
	   $.each(inputs,function(i){
		   if($(this).attr('name')=='chengwei'){
			   model.chengwei = $(this).val();
		   }
		   if($(this).attr('name')=='name'){
			   model.name = $(this).val();
		   }
		   if($(this).attr('name')=='job'){
			   model.job = $(this).val();
		   }
		   if($(this).attr('name')=='phone'){
			   model.phone = $(this).val();
		   }
		   if($(this).attr('name')=='id'){
			   model.id = $(this).val();
		   }
		   if($(this).attr('name')=='time'){
			   model.time = jsDate.strToDate($(this).val());
		   }
		   if($(this).attr('name')=='detailType'){
			   model.detailType = $(this).val();
		   }
		   if($(this).attr('name')=='user_name'){
			   model.user_name = $(this).val();
		   }
		   if($(this).attr('name')=='money'){
			   model.money = $(this).val();
		   }
		   if($(this).attr('name')=='startTime'){
			   model.startTime = jsDate.strToDate($(this).val());
		   }
		   if($(this).attr('name')=='endTime'){
			   model.endTime =jsDate.strToDate($(this).val());
		   }
		   if($(this).attr('name')=='other'){
			   model.other = $(this).val();
		   }
		   if($(this).attr('name')=='project_name'){
			   model.project_name = $(this).val();
		   }
		   
	   });
	   if($(fujian).html()=='未发现附件'){
		   model.fujian='' ;
		   model.path='';
	   }else {
		   model.fujian=$(fujian).html() ;
		   model.path=$(fujian).attr('src');
	  }
	   return model ;
   } ;
   /*页面绑定数据*/
function blandDataToPage(yg){
	var array  = yg.obj ; //得到及简历数据集合
	$.each(array,function(i,d){
		var table = $("[name="+i+"]") ;//得到对应table
		blandData(table, d) ;
	});
}
/*动态绑定数据*/
function blandData(table,data){
	
	
	function javaTimeToJsStr(date){
		  if(date==null || date=="")return "-";
			var date = new Date(date.time);
			var mounth=(date.getMonth()+1)+"";
			if(mounth.length==1)mounth="0"+mounth;
			var day=date.getDate()+"";
			if(day.length==1)day="0"+day;	
			var str=date.getUTCFullYear()+"-"+mounth+"-"+day;
			return str;
		};
	
	for(var i = 0 ;i<data.length;i++){
		
		/*行不够需要添加行*/
		if(table.find("tr:eq("+(i+1)+")").length==0){
			
			var tr = table.find("tr:eq(1)") ;
			var cloneTr = tr.clone() ;
			table.append(cloneTr) ;
			
			var rowSpanTd = rowSpan = table.find('tr:eq(0)').find('td:eq(0)') ;
			var rowSpan = rowSpanTd.attr('rowSpan') ;
			rowSpanTd.attr('rowSpan',rowSpan+1) ;
		}
		
		
		/*添加数据*/
		var inputs,selects,areas,images,tmpData ;
		inputs = table.find("tr:eq("+(i+1)+")").find('input') ;
		inputs.each(function(k,el){
			if(data[i][$(el).attr('name')] instanceof Object){
				data[i][$(el).attr('name')] = javaTimeToJsStr(data[i][$(el).attr('name')]) ;
			}
			$(el).val(data[i][$(el).attr('name')]) ;
		}) ;
		selects = table.find("tr:eq("+(i+1)+")").find('select') ;
		selects.each(function(i,el){
			$(el).val(data[i][$(el).attr('name')]) ;
		}) ;
		areas = table.find("tr:eq("+(i+1)+")").find('textarea') ;
		areas.each(function(i,el){
			$(el).val(data[i][$(el).attr('name')]) ;
		});
		images = table.find("tr:eq("+(i+1)+")").find('a[name=filepath]') ;
		images.each(function(i,el){
			if(table.attr('name')=='dyxl'){
				if(data[i].dyxl_filePath){
					$(el).attr('target','_Blank') ;
					$(el).attr('src',data[i].dyxl_filePath).text('文件') ;
				}
			}
			else if(table.attr('name')=='zgxl'){
				if(data[i].zgxl_filePath){
					$(el).attr('target','_Blank') ;
					$(el).attr('src',data[i].zgxl_filePath).text('文件') ;
				}
			}
			else if(table.attr('name')=='xuewei'){
				if(data[i].xuewei_filePath){
					$(el).attr('target','_Blank') ;
					$(el).attr('src',data[i].xuewei_filePath).text('文件') ;
				}
			}
			else {
				if(data[i].filePath){
					$(el).attr('target','_Blank') ;
					$(el).attr('src',data[i].filePath).text('文件') ;
				}
			}
		});
		
	}
	
	
} ;
function blandData2(table,data){
	var tr = $(table).find("tr:first").siblings(); // 取得同级tr
	var firstTd = $(table).find("tr:first").find("td:first") ;//得到第一个td ， 此td会设置rowspan属性
	if(tr.length>=data.length){// 如果当前表格的行数》返回数据的长度，此时只需要一次绑定数据即可
		for(var i=0 ;i<data.length;i++){
			$($(tr)[i]).find("[name=chengwei]").val(data[i].chengwei) ;
			$($(tr)[i]).find("[name=name]").val(data[i].name) ;
			$($(tr)[i]).find("[name=job]").val(data[i].job) ;
			$($(tr)[i]).find("[name=phone]").val(data[i].phone) ;
			$($(tr)[i]).find("[name=id]").val(data[i].id) ;
			$($(tr)[i]).find("[name=project_name]").val(data[i].project_name) ;
			$($(tr)[i]).find("[name=startTime]").val(data[i].startTime?formatDateTime(data[i].startTime.time).split(' ')[0]:'') ;
			$($(tr)[i]).find("[name=endTime]").val(data[i].endTime?formatDateTime(data[i].endTime.time).split(' ')[0]:'') ;
			$($(tr)[i]).find("[name=time]").val(data[i].time?formatDateTime(data[i].time.time).split(' ')[0]:'') ;
			$($(tr)[i]).find("[name=other]").val(data[i].other) ;
			$($(tr)[i]).find("[name=classType]").val(data[i].classType) ;
			$($(tr)[i]).find("[name=detailType]").val(data[i].detailType) ;
			$($(tr)[i]).find("[name=user_name]").val(data[i].user_name) ;
			$($(tr)[i]).find("[name=money]").val(data[i].money) ;
			if(data[i].fujian!=''){
				$($(tr)[i]).find("[name=filepath]").text(data[i].fujian) ;
				$($(tr)[i]).find("[name=filepath]").attr('src',data[i].path) ;
			}else {
				$($(tr)[i]).find("[name=filepath]").text('未发现附件') ;
				$($(tr)[i]).find("[name=filepath]").attr('src','') ;
			}
		
		}
	}else { //此时表格的行数小于数据的长度，则需要复制一行空数据再设置值,并且需要设置rowspan为data的长度
		var rowSpan = data.length ;
		$(firstTd).attr('rowspan',rowSpan+1);
		for(var i=0;i<data.length-tr.length;i++){
			$(table).find('tr:last').clone().appendTo($(table));
		}
		blandData(table,data) ;
	}
}

function showAddYGJLFormF(tag,data,edit){
	var title = (data.id?"修改":"添加")+tag.title;
	if(tag.title=='家庭主要成员'){
//		showFormDialog({
//			width:500,height:250,title:title,templateUrl:TEMPLATE_YGJL_JT_URL,formData:data
//		}) ;
		var html;
		$.ajax({url:contextPath+TEMPLATE_YGJL_JT_URL+"?tag="+Math.random(), async : false, type : "GET", success : function(t){html=t;}});
		var div = $('<html />').append(html) ;
		$(tag).parent().parent().html(html) ;
		div.oimsDialog({
			  width:900,
			  height:500,
			  icon:'openwinicon',
			  drag:false,
			  locked:true,
		      title:title,//窗口标题
		      button:[{
		    	  title:'保存',
		    	  className : "ok"//指定CSS名称
		      }]
		     
		  });
	}else if(tag.title=='第一学历'){
		showFormDialog({
			width:500,height:200,title:title,templateUrl:TEMPLATE_YGJL_DYXL_URL,formData:data
		}) ;
	}else if(tag.title=='最高学历'){
		showFormDialog({
			width:500,height:200,title:title,templateUrl:TEMPLATE_YGJL_ZGXL_URL,formData:data
		}) ;
	}else if(tag.title=='学   位'){
		showFormDialog({
			width:500,height:200,title:title,templateUrl:TEMPLATE_YGJL_XW_URL,formData:data
		}) ;
	}else if(tag.title=='教育培训及实习经历（从第一学历起）'){
		showFormDialog({
			width:500,height:200,title:title,templateUrl:TEMPLATE_YGJL_JYJL_URL,formData:data
		}) ;
	}
	
}

function addYGJLTagWithData(tag,d,edit){
	d = $.extend(d,{startDate:formatDate(d.startDate.time),endDate:d.endDate?formatDate(d.endDate.time):""})
	if(edit){
		var div = $("<div />").css({"text-align":"right", padding:"0 8px 4px"}).insertAfter(tag);
		$("<a />").attr("href","javascript:void(0)").text("[编辑]").click(function(){
			showAddYGJLForm(tag,d,edit);
		}).appendTo(div);
		$("<span />").html("&nbsp; | &nbsp; ").appendTo(div);
		$("<a />").attr("href","javascript:void(0)").text("[删除]").click(function(){
			$.oimsConfirm("确定要删除吗？",function(){
				var re = getJSONData(DELETE_YGJL_URL,{id:d.id},"POST");
				if(!re.state){
					$.oimsAlert("删除失败！");
				}else{
					tag.remove();
					div.remove();
				}
			});
		}).appendTo(div);
	}
	replaceFormData(tag,d);
}

function showAddYGJLForm(div, d,edit){
	var title = (d.id?"修改":"添加")+"工作（学习）经历";
	showFormDialog({
		action:SAVE_YGJL_URL,
		width:500,height:320,title:title,locked:true,
		beforeSubmit:function(_d){
			var r=true;
			$.each(_d,function(i,d_){
				if(d_.name!="endDate" && d_.name!="id" && d_.value==""){
					r=false;
					return false;
				}
			});
			if(!r)$.oimsAlert("表单未填写完整！");
			return r;
		},submitCallBack:function(re){
			if(!re.state){
				$.oimsAlert("提交失败！");
				return;	
			}
			var tem = common_getHtmlTemplate(contextPath+TEMPLATE_YGJL_URL);
			var tag = $(".gongzuojingli_"+d.id);
			if(tag.length){
				tag.html(tem);
				tag.next("div").remove();
			}else{
				tag = $("<div />").addClass("gongzuojingli_"+re.obj.id).addClass("gongzuojingli").append(tem).insertAfter(div);
			}
			addYGJLTagWithData(tag,re.obj,edit);
		},templateUrl:TEMPLATE_YGJL_URL,formData:d
	});
	calendarFun("startDate");
	calendarFun("endDate");
}