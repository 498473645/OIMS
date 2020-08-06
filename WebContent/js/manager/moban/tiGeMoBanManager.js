var data_tige_jibie;//级别下拉框data
var data_tige_bmId;//所属科室下拉框data
var data_tige_select_jcxmId;//检查项目下拉框data
var data_tige_fenlei;//分类名称下拉框data
var global_objName_tige;//主要记录当前div的id
var global_categoryId_tige;//主要记录当前体格模板分类
var value_finally_jckj=10006;//检查可见的默认值
var value_finally_jcts=10007;//检查提示的默认值
var btns_tiGeMoban;

/*
 *梁建业
 *页面准备好需要执行的方法 
 */
function tiGeMobanReady(btns)
{   /*2014-4-21 modify by 刘正勇 根据数据库中配置的体格检查项，创建选项卡面板，并绑定选项卡切换事件*/
	btns_tiGeMoban=btns;
	pageTitle = moban_Lanague.TiGeMoban;
	init();
	initialData_tiGeMoBan();
	var div_tablabel=$("<div/>").attr("id","div_tablabel").attr("class","tablabel").appendTo("#right");
	$("<div/>").attr("id","div_main").appendTo("#right");//主Div对象
	//模板选项卡分类
	var data = data_tige_fenlei;
	if(data){
		for(var i=0,len=data.length;i<len;i++){
		    var divTab = $('<div/>').attr('id','div1_'+data[i].id).addClass('tab_hide').appendTo(div_tablabel);
		    $('<span/>').text(data[i].category).appendTo(divTab);
		    divTab.bind('click',{tabDiv:divTab,categoryid:data[i].categoryid},function(param){
		    	PageMenuActive_TiGeMoBan(param.data.tabDiv,param.data.categoryid);
		    });
		}
		PageMenuActive_TiGeMoBan(div_tablabel.children(':first'),data[0].categoryid);
	}
}

/*
 *梁建业
 *动态获取显示的条数 
 */
function getPageSize_tiGeMoBan(){
	var height_header = $(".header").outerHeight();
	var height_footer = $(".footer").outerHeight();
	var winHeight = $(window).height();
	var height_right=winHeight-height_header-height_footer;
	var height_titleT=$(".titleT").outerHeight();
	var height_advquery=$(".advquery").outerHeight();
	var height_tablabel=$(".tablabel").outerHeight();
    var height_pageList = height_right-height_titleT-height_advquery-height_tablabel-24;
    return Math.floor(height_pageList/25);
}

/*
 *梁建业
 *初始化下拉框的data 
 */
function initialData_tiGeMoBan()
{	
	//importCSS("/easyui/themes/default/easyui.css");
	
	importCSS('/easyui/themes/default/panel.css');
	//importCSS('/easyui/themes/default/tooltip.css');
	//importCSS('/easyui/themes/default/validatebox.css');
	importCSS('/easyui/themes/default/combo.css');
	importCSS('/easyui/themes/default/tree.css');
	importCSS('/easyui/themes/default/menu.css');
//	importJS("/js/jquery.easyui.min.js");
	importJS('/easyui/plugins/jquery.parser.js');
	importJS("/easyui/plugins/jquery.draggable.js");
	importJS("/easyui/plugins/jquery.droppable.js");
	importJS("/easyui/plugins/jquery.panel.js");
	importJS("/easyui/plugins/jquery.tooltip.js");
	importJS("/easyui/plugins/jquery.validatebox.js");
	importJS("/easyui/plugins/jquery.combo.js");
	importJS("/easyui/plugins/jquery.tree.js");
	importJS("/easyui/plugins/jquery.combotree.js");
	importJS("/easyui/plugins/jquery.menu.js");
	importCSS("/easyui/themes/icon.css");
	 var url_findAllBuMen="/publish/bumen/findAllBuMen.htm";//查询所有部门
	 var url_findCategorysByFatherId="/publish/category/findCategorysByFatherId.htm";//根据fatherid查询该fatherid下所有的码表信息
	 var url_findAllJcxm="/publish/jcxm/findAllJcxm.htm";//查询所有检查项目
	 data_tige_jibie=getJSONData(url_findCategorysByFatherId,{fatherid:oimsCategory.SHRRUMOBAN_JIBIE,tag:Math.random()},"post").obj;
	 data_tige_bmId=getJSONData(url_findAllBuMen,{tag:Math.random()},"post").obj;
//	 data_tige_select_jcxmId=getJSONData(url_findAllJcxm,{tag:Math.random()},"post").obj;
	 data_tige_fenlei=getJSONData(url_findCategorysByFatherId,{fatherid:oimsCategory.TIGEMOBAN_CATEGORY_NAME,tag:Math.random()},"post").obj;
}

/*
 *梁建业
 *体格模板列表 
 */
function showTigeMobanList(categoryId) {
	listFactor = {
			listObj : [ 
				   		{
				   			title : moban_Lanague.Seria,
				   			key : "id"
				   		},{
				   			title :moban_Lanague.NeiRong,
				   			key : "shuru_display"
				   		},{
				   			title : moban_Lanague.SuoYin,
				   			key : "suoyin"
				   		},{
				   			title : moban_Lanague.BelongsDepart,
				   			key : "bmId"
				   		},{
				   			title : moban_Lanague.CZR,
				   			key : "xingming"
				   		},{
				   			title : moban_Lanague.CzSj,
				   			key : "addTime"
				   		},{
				   			title : moban_Lanague.LeiXing,
				   			key : "category"
				   		}
				   		],
		manageMenu : null,
		url :contextPath+"/publish/shurumoban/findTempletForPage.htm",
		checkbox:true,
		method:"post",
		single:true,
		data : {
			categoryId:categoryId,
			currentPage : 1,
		    pageSize : getPageSize_tiGeMoBan(),//Page类的方法
			tag : Math.random()
		}
	};
	var div_list = $("<div/>").attr("id", "div_list").attr("class","list").appendTo("#div_main");
	$(div_list).createPageList(listFactor);
}

/*
 *梁建业
 *新增体格模板
 */
function saveTiGeMoban(){
	var table_tigemoban="";//输入模板table
	table_tigemoban+="<table width='100%' border='0' cellspacing='0' cellpadding='0' class=' templatetable'>";
	table_tigemoban+="<tr>"+
	                   "<td width='8%' align='right' nowrap>"+moban_Lanague.FenLeiMc+"：</td>"+
	                   "<td width='16%'>" +
	                   "<select name='categoryId' id='categoryId'  onblur=\"this.className='blur'\"></select>" +
	                   "</td>"+
	                   "<td width='1%'><span class='required'>*</span></td>"+//必填提示
	                   "<td width='9%' align='right' nowrap>"+moban_Lanague.SuoYin+"：</td>"+
	                   "<td width='20%'>" +
	                   "<input type='text' name='suoyin' size='20' id='suoyin' onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur' />" +
	                   "</td>"+
	                   "<td width='1%'><span class='required'>*</span></td>"+//必填提示
	                   "<td width='9%' align='right' nowrap>"+moban_Lanague.JiBie+"：</td>"+
	                   "<td width='12%'>" +
	                   "<select name='jibie' id='jibie' onblur=\"this.className='blur'\"></select>" +
	                   "</td>"+
	                   "<td width='1%'><span class='required'>*</span></td>"+//必填提示
	                   "</tr>";
	table_tigemoban+="<tr>"+
				       "<td align='right' nowrap>"+moban_Lanague.BelongsDepart+"：</td>"+
				       "<td>" +
				       "<select name='bmId' id='bmId' onblur=\"this.className='blur'\"></select>" +
				       "</td>"+
				       "<td width='1%'><span class='required'>*</span></td>"+//必填提示
				       "<td width='9%' align='right' nowrap>"+"类别"+"：</td>"+
	                   "<td width='20%'>" +
	                   "<select id='moban_combotree' class='easyui-combotree' style='width:200px'></select>" +"<input type='hidden' name='treeNodeId' />"+
	                   "</td>"+
	                   "<td width='1%'><span class='required'>*</span></td>"+//必填提示
				       "</tr>";
	table_tigemoban+="<tr>"+
				       "<td align='right' valign='top' nowrap>"+moban_Lanague.NeiRong+"：</td>"+
				       "<td colspan='7'>" +
				       "<textarea name='shuru' id='shuru'  onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur' id='textarea' cols='45' rows='10'></textarea>" +
				       "</td>" +
				       "<td width='1%'><span class='required'>*</span></td>"+//必填提示
				       "</tr>";
	table_tigemoban += "<tr>"+
						"<td align='right' nowrap>"+moban_ps+"</td>"+
						"<td colspan='7' align='left' style='color:red;' >"+
						moban_ps_content+
						"</td>"+
						"<td width='1%'></td>"+
					    "</tr>";
	table_tigemoban+="</table>";
	var hidden_jcxmId="<input type='hidden' name='jcxmId' id='jcxmId' value='0'/>";//检查项目隐藏域
	var form_saveShuruMoban=oimsFormWindow({
		id:"from_saveShuruMoban",
		dialogTitle:language.Add,
		icon:"add",
		url:contextPath+"/publish/shurumoban/saveTemplet.htm",
		height:400,
		width:800,
		method:"post",
		resetForm:reset_from_saveTigeMoban,
		btnOkSuccess:function(data,responseText,statusText){ 
			if(data.state==1){
				$.oimsSucc(language.InsertOK_Alert,tiGeMoban_DialogClose("from_saveShuruMoban"));
			}
			else{
				$.oimsError(language.InsertFail_Alert,tiGeMoban_DialogClose("from_saveShuruMoban"));
			}
		},
		btnOkError:function(jqXHR,textStatus, errorThrown){ 
		},
		btnOkBefor:validate_tiGeMoBan_form_saveShuruMoban
		}) ;
		$("a[class='close']").click(function(){
			$(".combo-p").remove();
			$("#mm").remove();
			$(".menu-shadow").remove();
		});
	    form_saveShuruMoban.append(table_tigemoban);//追加表格
	    form_saveShuruMoban.append(hidden_jcxmId);//检查项目隐藏域
	    var sortCombotree = createSortComboTree({
	    	id:'moban_combotree',
	    	url:contextPath+"/publish/shurumoban/findComboTreeChildrenByPid.htm?id=0&categoryId="+($("#categoryId").val()?$("#categoryId").val():global_categoryId_tige),
	    	expandUrl:contextPath+"/publish/shurumoban/findComboTreeChildrenByPid.htm?categoryId="+$("#categoryId").val()
	    });
	    //分类下拉框
	    $.each(data_tige_fenlei,function(i,fenlei){
		    $("<option value=\""+fenlei.categoryid+"\">"+fenlei.category+"</option>").appendTo("#categoryId");
		});
	    //级别下拉框数据
	    $.each(data_tige_jibie,function(i,jibie){
	    	$("<option value=\""+jibie.categoryid+"\">"+jibie.category+"</option>").appendTo("#jibie");
	     });
	     //所属科室下拉框
	     $.each(data_tige_bmId,function(i,bumen){
	    //	$("<option value=\""+bumen.id+"\">"+bumen.bmmc+"</option>	").appendTo("#bmId");
	    	 if(bumen.bmbm==oimsCategory.YANKE_BUMEN_BIANMA)
	 	    	$("<option selected = 'selected' value=\""+bumen.id+"\">"+bumen.bmmc+"</option>").appendTo("#bmId");
	 	     else
	 	    	 $("<option value=\""+bumen.id+"\">"+bumen.bmmc+"</option>").appendTo("#bmId");
	     });
	     
	     onChange_tiGeMoBan_categoryId();//分类名称categoryId  onChange方法
	     $("#categoryId").val(global_categoryId_tige).change(onChange_tiGeMoBan_categoryId);//categoryId onchage事件绑定方法
	     $("#categoryId").change(function(){
	    	sortCombotree.combotree("clear");
	    	sortCombotree = createSortComboTree({
	    		id:'moban_combotree',
		    	url:contextPath+"/publish/shurumoban/findComboTreeChildrenByPid.htm?id=0&categoryId="+($("#categoryId").val()?$("#categoryId").val():global_categoryId_tige),
		    	expandUrl:contextPath+"/publish/shurumoban/findComboTreeChildrenByPid.htm?categoryId="+$("#categoryId").val()
		    });
		 });
}

/*
 *梁建业
 *体格模板弹出窗口关闭 
 */
function tiGeMoban_DialogClose(form_id)
{	$(".combo-p").remove();
	$("#mm").remove();
	$(".menu-shadow").remove();
	$("#"+form_id).parent().parent().remove();
	PageMenuActive_TiGeMoBan(global_objName_tige,global_categoryId_tige);
}

/*
 * 王杰
 * 新增去空格方法
 */
function fnDeleteSpack(stext){
	return stext.replace(/\s+/g, ""); 
}

/*
 *梁建业
 *体格模板新增验证
 */
function validate_tiGeMoBan_form_saveShuruMoban()
 {
	if (!$('#moban_combotree').combotree('getValue')) {
		$.oimsAlert("类别不能为空", function() {
			$('#moban_combotree').combotree('showPanel');
		});
		return false;
	}
	$("#suoyin").val(jQuery.trim($("#suoyin").val()));//索引
	//$("#shuru").val(jQuery.trim($("#shuru").val()));//内容
	//$("#suoyin").val(fnDeleteSpack($("#suoyin").val()));//索引
	$("#shuru").val(fnDeleteSpack($("#shuru").val()));//内容
	var value_shuRuMoBan_suoyin=$("#suoyin").val();
	var value_shuRuMoBan_shuru=$("#shuru").val();
	var value_shuRuMoBan_jcxmId=$("#jcxmId").val();
	var regulation_null="^[^ ]+$";//非空验证
	var validate_null = new RegExp(regulation_null);
	if(!validate_null.test(value_shuRuMoBan_suoyin))//索引
    {
    	$.oimsAlert(moban_Lanague.Qsrmbsy,function(){
    		$("#suoyin").focus();
    	});
    	return false;
    }
	var value_shuRuMoBan_categoryId=$("#categoryId")[0][$("#categoryId")[0].selectedIndex].value;
	if(value_shuRuMoBan_categoryId==value_finally_jckj||value_shuRuMoBan_categoryId==value_finally_jcts)
	{
		if(0==value_shuRuMoBan_jcxmId)
		{
			$.oimsAlert(moban_Lanague.Qxzjcxm,function(){
	    		$("#jcxmId").focus();
	    	});
			return false;
		}
	}
	if(!validate_null.test(value_shuRuMoBan_shuru))//内容
    {
    	$.oimsAlert(moban_Lanague.Qsrmbnr,function(){
    		$("#shuru").focus();
    	});
    	return false;
    }
	return true;
}
/*
 *梁建业
 *体格模板修改
 */
function updateTiGeMoban(){
	var dataObjects=getCheckBoxValue();
	if(dataObjects.length==0)
	{
		$.oimsAlert(language.CheckOneItem_Alert);
		return;
	}
	if(dataObjects.length>1)
	{
		$.oimsAlert(language.OnlyOpOneData);
		return;
	}
	var table_tigemoban="";//输入模板table
	table_tigemoban+="<table width='100%' border='0' cellspacing='0' cellpadding='0' class=' templatetable'>";
	table_tigemoban+="<tr>"+
	                   "<td width='8%' align='right' nowrap>"+moban_Lanague.FenLeiMc+"：</td>"+
	                   "<td width='16%'>" +
	                   "<select name='categoryId' id='categoryId' onblur=\"this.className='blur'\"></select>" +
	                   "</td>"+
	                   "<td width='1%'><span class='required'>*</span></td>"+//必填提示
	                   "<td width='9%' align='right' nowrap>"+moban_Lanague.SuoYin+"：</td>"+
	                   "<td width='20%'>" +
	                   "<input type='text' name='suoyin' size='20' id='suoyin' onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur' />" +
	                   "</td>"+
	                   "<td width='1%'><span class='required'>*</span></td>"+//必填提示
	                   "<td width='9%' align='right' nowrap>"+moban_Lanague.JiBie+"：</td>"+
	                   "<td width='12%'>" +
	                   "<select name='jibie' id='jibie' onblur=\"this.className='blur'\"></select>" +
	                   "</td>"+
	                   "<td width='1%'><span class='required'>*</span></td>"+//必填提示
	                   "</tr>";
	table_tigemoban+="<tr>"+
				       "<td align='right' nowrap>"+moban_Lanague.BelongsDepart+"：</td>"+
				       "<td>" +
				       "<select name='bmId' id='bmId' onblur=\"this.className='blur'\"></select>" +
				       "</td>"+
				       "<td width='1%'><span class='required'>*</span></td>"+//必填提示
				       "<td width='9%' align='right' nowrap>"+"类别"+"：</td>"+
	                   "<td width='20%'>" +
	                   "<select id='moban_combotree' class='easyui-combotree' style='width:200px'></select>" +"<input id='treeNodeId' type='hidden' name='treeNodeId' />"+
	                   "</td>"+
	                   "<td width='1%'><span class='required'>*</span></td>"+//必填提示
				       "</tr>";
	table_tigemoban+="<tr>"+
    			       "<td align='right' valign='top' nowrap>"+moban_Lanague.NeiRong+"：</td>"+
    			       "<td colspan='7'>" +
    			       "<textarea name='shuru' id='shuru' onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur' id='textarea' cols='45' rows='10'></textarea>" +
    			       "</td>" +
    			       "<td width='1%'><span class='required'>*</span></td>"+//必填提示
    			       "</tr>";
	table_tigemoban += "<tr>"+
						"<td align='right' nowrap>"+moban_ps+"</td>"+
						"<td colspan='7' align='left' style='color:red;' >"+
						moban_ps_content+
						"</td>"+
						"<td width='1%'></td>"+
					    "</tr>";
	table_tigemoban+="</table>";
	var hidden_id="<input type='hidden' name='id' id='id'/>"+"<input type='hidden' name='treeNodeId' />";//隐藏域
	var hidden_jcxmId="<input type='hidden' name='jcxmId' id='jcxmId' value='0'/>";//检查项目隐藏域
	var form_updateShuruMoban=oimsFormWindow({
		id:"form_updateShuruMoban",
		dialogTitle:language.Modify,
		icon:"edit",
		url:contextPath+"/publish/shurumoban/updateTemplet.htm",
		height:400,
		width:800,
		method:"post",
		resetForm:reset_from_updateTigeMoban,
		btnOkSuccess:function(data,responseText,statusText){ 
			if(data.state==1){
				$.oimsSucc(language.UpdateOK_Alert,tiGeMoban_DialogClose("form_updateShuruMoban"));
			}
			else{
				$.oimsError(language.UpdateFail_Alert,tiGeMoban_DialogClose("form_updateShuruMoban"));
			}
		},
		btnOkError:function(jqXHR,textStatus, errorThrown){ 
                   
		},
		btnOkBefor:validate_tiGeMoBan_form_updateShuruMoban
		}) ;
	    form_updateShuruMoban.append(table_tigemoban);//体格模板表格追加
	    form_updateShuruMoban.append(hidden_id);//隐藏域追加
	    form_updateShuruMoban.append(hidden_jcxmId);//检查项目隐藏域
	    var sortCombotree = createSortComboTree({
	    	id:'moban_combotree',
	    	url:contextPath+"/publish/shurumoban/findComboTreeChildrenByPid.htm?id=0&categoryId="+($("#categoryId").val()?$("#categoryId").val():global_categoryId_tige),
	    	expandUrl:contextPath+"/publish/shurumoban/findComboTreeChildrenByPid.htm?categoryId="+$("#categoryId").val()
	    });
	    if(dataObjects[0].treeNodeId)
	    	sortCombotree.combotree('setValue',dataObjects[0].treeNodeId);
	    //分类下拉框
	    $.each(data_tige_fenlei,function(i,fenlei){
		    $("<option value=\""+fenlei.categoryid+"\">"+fenlei.category+"</option>").appendTo("#categoryId");
		});
	    //级别下拉框数据
	    $.each(data_tige_jibie,function(i,jibie){
	    	$("<option value=\""+jibie.categoryid+"\">"+jibie.category+"</option>").appendTo("#jibie");
	     });
	     //所属科室下拉框
	     $.each(data_tige_bmId,function(i,bumen){
	    	$("<option value=\""+bumen.id+"\">"+bumen.bmmc+"</option>").appendTo("#bmId");
	     });

	     //赋值
         $("#id").val(dataObjects[0].id);
	     selectItemByValue("categoryId",dataObjects[0].categoryId);
	     $("#suoyin").val(dataObjects[0].suoyin);
	    
	     selectItemByValue("jibie",dataObjects[0].jibie);
	     selectItemByValue("bmId",dataObjects[0].bmId);
	     $("input[name='treeNodeId']").val(dataObjects[0].treeNodeId);
	     $("#shuru").val(dataObjects[0].shuru);
	     $("#jcxmId").val(dataObjects[0].jcxmId);
	     onChange_tiGeMoBan_categoryId();//分类名称categoryId  onChange方法
	     $("#categoryId").change(onChange_tiGeMoBan_categoryId);//categoryId onchage事件绑定方法
	     $("#categoryId").change(function(){
		    sortCombotree.combotree("clear");
		    $('#treeNodeId').val('');
		    sortCombotree = createSortComboTree({
		    	id:'moban_combotree',
			    url:contextPath+"/publish/shurumoban/findComboTreeChildrenByPid.htm?id=0&categoryId="+($("#categoryId").val()?$("#categoryId").val():global_categoryId_tige),
			    expandUrl:contextPath+"/publish/shurumoban/findComboTreeChildrenByPid.htm?categoryId="+$("#categoryId").val()
			});
		});
}

/*
 *梁建业
 *体格模板修改验证
 */
function validate_tiGeMoBan_form_updateShuruMoban()
{
	if (!$('#moban_combotree').combotree('getValue')) {
		$.oimsAlert("类别不能为空", function() {
			$('#moban_combotree').combotree('showPanel');
		});
		return false;
	}
	$("#suoyin").val($.trim($("#suoyin").val()));//索引
	$("#shuru").val(fnDeleteSpack($("#shuru").val()));//内容
	var value_shuRuMoBan_suoyin=$("#suoyin").val();
	var value_shuRuMoBan_shuru=$("#shuru").val();
	var value_shuRuMoBan_jcxmId=$("#jcxmId").val();
	var regulation_null="^[^ ]+$";//非空验证
	var validate_null = new RegExp(regulation_null);
	if(!validate_null.test(value_shuRuMoBan_suoyin))//索引
    {
    	$.oimsAlert(moban_Lanague.Qsrmbsy,function(){
    		$("#suoyin").focus();
    	});
    	return false;
    }
	var value_shuRuMoBan_categoryId=$("#categoryId")[0][$("#categoryId")[0].selectedIndex].value;
	
	if(value_shuRuMoBan_categoryId==value_finally_jckj||value_shuRuMoBan_categoryId==value_finally_jcts)
	{
		if(0==value_shuRuMoBan_jcxmId)
		{
			$.oimsAlert(moban_Lanague.Qxzjcxm,function(){
	    		$("#jcxmId").focus();
	    	});
			return false;
		}
	}
	if($("#shuru").val()==""){
		$.oimsAlert("内容不能为空");
		return false;
	}else{
		return true;
	}
}

/*
 *梁建业
 *体格模板删除 
 */
function deleteTiGeMobanById()
{
	var dataObjects=getCheckBoxValue();
	if(dataObjects.length==0)
	{
		$.oimsAlert(language.CheckOneItem_Alert);
		return;
	}
	
	$.oimsConfirm({strTitle:moban_Lanague.Qrsctgmb,remove_length:true}, dodeleteTiGeMobanById);
}

/*
 *梁建业
 *执行体格模板删除操作 
 */
function dodeleteTiGeMobanById()
{
	var dataObjects=getCheckBoxValue();
	var url_deleteTiGeMobanById="/publish/shurumoban/deleteTempletById.htm";
	var data=getJSONData(url_deleteTiGeMobanById,{id:dataObjects[0].id,tag:Math.random()},"post");
	if(data.state==1)
	$.oimsSucc(language.DelOK_Alert,PageMenuActive_TiGeMoBan(global_objName_tige,global_categoryId_tige));
	else
	$.oimsError(language.DelError_Alert,PageMenuActive_TiGeMoBan(global_objName_tige,global_categoryId_tige));
}

/*
 *梁建业
 *div层的显示隐藏切换 
 */
function PageMenuActive_TiGeMoBan(tabDiv,categoryId)
{
	if(tabDiv instanceof jQuery){
		if(!tabDiv.hasClass('tab_show')){
			tabDiv.siblings('.tab_show').removeClass('tab_show').addClass('tab_hide');
			tabDiv.addClass('tab_show');
		}
	}else if(typeof(tabDiv)=='string'){
		tabDiv = $('#'+tabDiv);
	}else{
		tabDiv = $(tabDiv);
	}
	$("#div_main").html("");
    var div_advquery=$("<div/>").attr("id","div_advquery").attr("class","advquery").appendTo("#div_main");
    var table_advquery="";
    table_advquery+="<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
    table_advquery+="<tr>"+
		              "<td width='23%' class='leftalign' ><input name='search_suoyin' type='text' class='blurview' id='search_suoyin' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"+moban_Lanague.Qingshurusuoyin+"' size='28' /></td>"+
		              "<td width='9%'><a href='javascript:searchTigeMoban();' class='search'>"+language.Query+"</a></td>"+
		              "<td width='9%'></td>"+
		              "<td width='59%'>" +
		              "<div class='btn'>" +
		              "<a onclick='return false;' href='javascript:saveTiGeMoban();'><span class='adda'></span>"+language.Add+"</a>" + //添加
		              "<a onclick='return false;' href='javascript:updateTiGeMoban();'><span class='edita'></span>"+language.Modify+"</a>" + //修改
		              "<a onclick='return false;' href='javascript:deleteTiGeMobanById();'><span class='dela'></span>"+language.Del+"</a>" + //删除
		              "</div>" +
		              "</td>"+
		              "</tr>";
    table_advquery+="</table>";
    $(table_advquery).appendTo(div_advquery);
    btnProwerConfig(btns_tiGeMoban);//按钮加上权限
    showTigeMobanList(categoryId);
    global_objName_tige = tabDiv[0].id;
	global_categoryId_tige=categoryId;
	$("#search_suoyin").click(function(){
		  clearInitQuery(this);
	});//点击输入框清空字体
	$("#search_suoyin").blur(function(){
		if(this.value==""){
			$("#search_suoyin").val(moban_Lanague.Qingshurusuoyin);
			$("#search_suoyin").addClass("blurview");
		}
	});
}
//全局赋值
function getPageMenu_TiGe(menuName)
{
	activePageMenu = menuName;
}

/*
 *梁建业
 *分类名称categoryId  onChange方法
 */ 
function onChange_tiGeMoBan_categoryId()
{
	return;//2014-4-21 modify by 刘正勇：该方法暂时无用
	var value_shuRuMoBan_categoryId=$("#categoryId")[0][$("#categoryId")[0].selectedIndex].value;
	if(value_shuRuMoBan_categoryId==value_finally_jckj||value_shuRuMoBan_categoryId==value_finally_jcts)
	{
//		$("#select_jcxmId")[0].disabled=false;
	}
	else
	{
//		selectItemByValue("select_jcxmId",0);
		$("#jcxmId").val(0);
//		$("#select_jcxmId")[0].disabled=true;//只读状态
	}
		
}
function onChange_tiGeMoBan_select_JcxmId()
{
//	var value_shuRuMoBan_select_jcxmId=$("#select_jcxmId")[0][$("#select_jcxmId")[0].selectedIndex].value;
//	$("#jcxmId").val(value_shuRuMoBan_select_jcxmId);
}
/*
 *梁建业
 *查询条件（searchTigeMoban） 
 */
function searchTigeMoban(){
	var data_search;
	if($("#search_suoyin").val().indexOf(moban_Lanague.Qsr)!=-1)
		data_search = {suoyin:''};
	else
        data_search = {suoyin:$("#search_suoyin").val()};
    $.extend(listFactor.data,data_search);
    $("#div_list").createPageList(listFactor);
};


/*
 *梁建业
 *重置新增体格模板表单 
 */
function reset_from_saveTigeMoban()
{	
	$("#moban_combotree").combotree("clear");
	selectItemByValue("categoryId",data_tige_fenlei[0].categoryid);//分类名称
	$("#suoyin").val('');//索引
	selectItemByValue("jibie",data_tige_jibie[0].categoryid);//级    别
	selectItemByValue("bmId",data_tige_bmId[0].id);//所属科室
	onChange_tiGeMoBan_categoryId();//检查项目
	$("#shuru").val('');//内容
}

/*
 *梁建业
 *重置修改体格模板表单 
 */
function reset_from_updateTigeMoban(dataObjects)
{
	var dataObjects=getCheckBoxValue();
	//赋值
	$("#shuru").val(dataObjects[0].shuru);
    $("#id").val(dataObjects[0].shurumobanid);
    selectItemByValue("categoryId",dataObjects[0].categoryId);
    $("#suoyin").val(dataObjects[0].suoyin);
    selectItemByValue("jibie",dataObjects[0].jibie);
    selectItemByValue("bmId",dataObjects[0].bmId);
//    selectItemByValue("select_jcxmId",dataObjects[0].jcxmId);
    $("#jcxmId").val(dataObjects[0].jcxmId);
    onChange_tiGeMoBan_categoryId();//分类名称categoryId  onChange方法
}


