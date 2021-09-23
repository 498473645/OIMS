/* ********************************************************************/
/*权限数据更新*/
/*update quanxian set js_file_url='/js/manager/article/fblw_Manager.js' ,func='oims.fblw.fblw_init' where id = '349' ;*/
/* ********************************************************************/
/**
 * 导入文件
 */

/* ********************************************************************/
/**
 * 模块入口方法
 */
var oims = oims||{} ;

/*common.js 中的页面初始化方法*/
oims.pageInit = init ;

/*common.js中加载html文件方法,这个方法蛋疼，没有写contextPath*/
oims.loadHtmlTemp = function(url){
	return common_getHtmlTemplate (oims.contextPath+"/"+url+"?jsonsession="+Math.random()) ;
} ; 

/*页面contextPath*/
oims.contextPath = contextPath ;

/*建立发表论文空间*/
oims.fblw = oims.fblw||{} ;

/*论文模块初始化方法*/
oims.fblw.fblw_init = function(){
	/*页面元素*/
	oims.fblw.pageView.init() ;
	/*注册事件*/
	oims.fblw.pageEvent.init() ;
	/*页面加载完成之后查询一下数据*/
	oims.fblw.pageEvent.btn_Search_handler() ;
} ;

/* ********************************************************************/
/**
 * 初始化页面元素
 */
oims.fblw.pageView = oims.fblw.pageView||{} ;
oims.fblw.pageView.init = function(){
	oims.pageInit() ;
	oims.fblw.ws = oims.fblw.workSpace = $("#right") ;
	oims.fblw.htmlTemp = oims.loadHtmlTemp("js/manager/article/template/fblw_Manager_temp.html") ;

	/*添加查询工具条*/
	$("#advquery",oims.fblw.htmlTemp).appendTo(oims.fblw.ws) ;
	/*添加页面列表*/
	oims.fblw.pageView.pageList() ;
	
} ;
/**
 * 加载页面完成后，页面展现出的元素注册事件
 */
oims.fblw.pageEvent = oims.fblw.pageEvent||{} ;
oims.fblw.pageEvent.init = function(){
	/*页面查询按钮事件*/
	$("a.search").on("click",oims.fblw.pageEvent.btn_Search_handler) ;
	/*页面新增按钮事件*/
	$("#btn_add").on("click",oims.fblw.pageEvent.btn_add_handler) ;
	/*页面修改按钮事件*/
	$("#btn_edit").on("click",oims.fblw.pageEvent.btn_edit_handler) ;
	/*页面删除按钮事件*/
	$("#btn_del").on("click",oims.fblw.pageEvent.btn_del_handler) ;
	/*页面发布按钮事件*/
	$("#btn_start").on("click",oims.fblw.pageEvent.btn_start_handler) ;
} ;
/* ********************************************************************/
/**
 * 页面元素明细
 */
/*页面列表*/
oims.fblw.pageView.pageList = function(){
	oims.fblw.tableCfg  = {
		listObj : [  {
			title : "序号",
			key : "id"
		}, {
			title : "标题",
			key : "project_name"
		}, {
			title : "作者",
			key : "author"
		},{
			title : "期刊名",
			key : "job"
		},{
			title : "期刊号",
			key : "other"
		},{
			title : "时间",// 所属办公室
			key : "c_time",
		}
//		,{
//			title : "发布状态",
//			key : "publish",
//			func : function(p){
//				return p?"已发布":"未发布";
//			}
//		}
		],
		url : contextPath + "/publish/yuangong/model_lw_find_fblw.htm",
		method : "post",
		checkbox : true,
		single : true,
		data : {
			currentPage : 1,
			pageSize : getPageSize(),
			tag : Math.random()
		}
	};
	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
			.appendTo("#right");
	$(div_list).createPageList(oims.fblw.tableCfg);
} ;


/* ********************************************************************/

/*页面列表中选择数据转为Array[{name:'',value:''}]*/
oims.fblw.pageEvent.dateTool_jsonTime2Str = function (json){
	for(var k in json){
		if(json[k]!=null&& json[k] instanceof Object){
			json[k] = time(json[k]).format_yyyy_mm_dd() ;
		}
	}
	return json ;
} ;

/**
 * 页面事件
 */
/*页面查询按钮事件 */
oims.fblw.pageEvent.btn_Search_handler = function(){
	var obj = {
			categoryId:$("select[name='categoryId']").find('option:selected').text(),
			keyword : $("input[name='keyword']").val().indexOf("请输入") >-1 ? "" : $("input[name='keyword']").val()
			
		};
		$.extend(oims.fblw.tableCfg.data, obj);
		$("#pageList").createPageList(oims.fblw.tableCfg);
} ;
/*页面新增按钮事件*/
oims.fblw.pageEvent.btn_add_handler = function(){
	var d = showFormDialog({
		width:800,
		height:400,
		title:"新增",
		locked:true,
//		formData:[] ,
		beforeSubmit:function(d){
			var titleIsNull = false ;
			$.each(d,function(i,v){
				if(v.name=='title'){
					if(v.value==null||v.value==''){
						titleIsNull = true ;
						return false;
					}
				}
			}) ;
			if(titleIsNull){
				 var div=$("<div />").text("请填写标题");
				 $(div).oimsDialog({
					 icon:'view',
					 title:'错误提示',
					 width:200,
					 height:100
				 }) ;
				return false ;
			}
		},
		submitCallBack:function(data){
			var div=$("<div />").text(data.message);
			$(div).oimsDialog({
				 icon:'view',
				 title:'操作提示',
				 width:200,
				 height:100
			 }) ;
			oims.fblw.pageEvent.btn_Search_handler() ;
		},
		templateUrl:"/js/manager/article/fblw/addWin/fblw_addWinHtmlTemp.html",
		action:'/publish/yuangong/model_lw_save.htm'
	}) ;
	
	/*页面附件元素点击事件*/
	$("#filePath").on("click",oims.fblw.pageEvent.input_click_handler) ;
	
};
/*页面修改按钮事件*/
oims.fblw.pageEvent.btn_edit_handler = function(){
	var cbv = getCheckBoxValue() ;
	if(cbv==null||cbv.length==0){
		 var div=$("<div />").text("请选择数据");
		 $(div).oimsDialog({
			 icon:'view',
			 title:'错误提示',
			 width:200,
			 height:100
		 }) ;
		return false;
	}
	var fromData = oims.fblw.pageEvent.dateTool_jsonTime2Str(cbv[0]);
	var d = showFormDialog({
		width:800,
		height:400,
		title:"修改",
		locked:true,
		formData:fromData ,
		beforeSubmit:function(d){
			var titleIsNull = false ;
			$.each(d,function(i,v){
				if(v.name=='title'){
					if(v.value==null||v.value==''){
						titleIsNull = true ;
						return false;
					}
				}
			}) ;
			if(titleIsNull){
				 var div=$("<div />").text("请填写标题");
				 $(div).oimsDialog({
					 icon:'view',
					 title:'错误提示',
					 width:200,
					 height:100
				 }) ;
				return false ;
			}
		},
		submitCallBack:function(data){
			var div=$("<div />").text(data.message);
			$(div).oimsDialog({
				 icon:'view',
				 title:'操作提示',
				 width:200,
				 height:100
			 }) ;
			oims.fblw.pageEvent.btn_Search_handler() ;
		},
		templateUrl:"/js/manager/article/fblw/addWin/fblw_addWinHtmlTemp.html",
		action:'/publish/yuangong/model_lw_update.htm'
	}) ;
	/*页面附件元素点击事件*/
	$("#filePath").on("click",oims.fblw.pageEvent.input_click_handler) ;
	
};
/*页面删除按钮事件*/
oims.fblw.pageEvent.btn_del_handler = function(){
	var cbv = getCheckBoxValue() ;
	if(cbv==null||cbv.length==0){
		 var div=$("<div />").text("请选择数据");
		 $(div).oimsDialog({
			 icon:'view',
			 title:'错误提示',
			 width:200,
			 height:100
		 }) ;
		return false;
	}
	$.oimsConfirm("确认删除数据？",function(){
		$.ajax({
			type:'POST',
			url:oims.contextPath+'/publish/yuangong/model_lw_del.htm',
			data:{id:cbv[0].id},
			success:function(d){
				$.oimsAlert(d.message) ;
				oims.fblw.pageEvent.btn_Search_handler() ;
			}
		}) ;
	}) ;
	
};
/*页面发布按钮事件*/
oims.fblw.pageEvent.btn_start_handler = function(){

	var cbv = getCheckBoxValue() ;
	if(cbv==null||cbv.length==0){
		 var div=$("<div />").text("请选择数据");
		 $(div).oimsDialog({
			 icon:'view',
			 title:'错误提示',
			 width:200,
			 height:100
		 }) ;
		return false;
	}
	$.oimsConfirm("确认发布？",function(){
		$.ajax({
			type:'POST',
			url:oims.contextPath+'/publish/yuangong/model_lw_publish.htm',
			data:{id:cbv[0].id},
			success:function(a){
				var a = $.parseJSON(a) ;
				 var div=$("<div />").text(a.message);
				 $(div).oimsDialog({
					 icon:'view',
					 title:'操作提示',
					 width:200,
					 height:100
				 }) ;
				 oims.fblw.pageEvent.btn_Search_handler() ;
			}
		}) ;
	}) ;
	

};
oims.fblw.pageEvent.input_click_handler = function(){
	var me = this ;
	$("<form/>")
	.attr('id','fileUploadForm')
	.attr('action',contextPath+"/publish/yuangong/getUploadFileOfJianli.htm")
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
	    										$("#filePath").val(data_Obj.obj.path) ;
	    									});
	    								else
	    									$.oimsError("上传附件失败", function() {
	    									});

	    							
	    							}
	    						});
	    				$("#fileUploadForm").submit();
				}
	    	  }
	      }]
	});

}
/* ********************************************************************/