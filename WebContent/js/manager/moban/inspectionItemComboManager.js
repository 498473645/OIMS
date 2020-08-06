var level;
var bumen;
var jcxm;
var InspectionItemCombo_obj;
var updateInspectionItemComboUrl="/publish/shurumoban/updateInspectionItemCombo.htm";
var addInspectionItemComboUrl="/publish/shurumoban/addInspectionItemCombo.htm";
var delInspectionItemComboUrl="/publish/shurumoban/delInspectionItemComboById.htm";
function inspectionItemComboReady(btns){

    //btns_baoGaoMoBan=btns;
	  pageTitle = moban_Lanague.inspectionItemCombo;
	//  importCSS("/js/manager/emr/css/emr.css");
	//  importCSS("/css/doctor.css");
	  init();
	 
	  var div_advquery=$("<div/>").attr("id","div_advquery").attr("class","advquery").appendTo("#right");
	  var table_advquery="";
	      table_advquery+="<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	      table_advquery+="<tr>"+
					      "<td width='23%' class='leftalign' >" +
					      "<input name='search' type='text' class='blurview' id='search' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"+"请输入组套名称"+"' size='28' />" +
					      "</td>"+
					      "<td width='9%'><a href='javascript:searchInspectionItemCombo();' class='search'>"+language.Query+"</a></td>"+
			              "<td width='59%'>" +
			              "<div class='btn'>" +
			              "<a onclick='return false;' href='javascript:addInspectionItemCombo();'><span class='adda'></span>"+language.Add+"</a>" +
			              "<a onclick='return false;' href='javascript:updateInspectionItemCombo();'><span class='edita'></span>"+language.Modify+"</a>" +
			              "<a onclick='return false;'  href='javascript:delInspectionItemCombo();'><span class='dela'></span>"+language.Del+"</a>" +
			              "</div>" +
			              "</td>"+
			              "</tr>";
	      table_advquery+="</table>";
	     
	  $(table_advquery).appendTo(div_advquery);
	  btnProwerConfig(btns);//按钮加上权限
	  showInspectionItemComboList();//检查项目组套列表
	  initialData_InspectionItemComboData();//初始化检查项目组套必须的数据
	  $("#search").click(function(){
		  clearInitQuery(this);
	  });//点击输入框清空字体
	  $("#search").blur(function(){
			if(this.value==""){
				$("#search").val("请输入组套名称");
				$("#search").addClass("blurview");
			}
	  });


}
function showInspectionItemComboList(){

	listFactor = {
			listObj : [ 
			   		{
			   			title : "序号",
			   			key : "id"
			   		},{
			   			title :"名称",
			   			key : "name"
			   		},{
			   			title : "级别",
			   			key : "levelDisplay"
			   		},{
			   			title : "检查项目",
			   			key : "inspectionitemPY"
			   		},
			   		{
			   			title : "创建人",
			   			key : "xingming"
			   		}
			   		],
		manageMenu : null,
		url :contextPath+"/publish/shurumoban/findInspectionItemComboByPage.htm",
		checkbox:true,
		method:"post",
		single:true,
		data : {
			currentPage : 1,
		    pageSize : getPageSize(),//Page类的方法
			tag : Math.random()
		}
	};
	var div_list = $("<div/>").attr("id", "div_list").attr("class","list").appendTo("#right");
	$(div_list).createPageList(listFactor);

}
function initialData_InspectionItemComboData(){
	var url_findAllBuMen="/publish/bumen/findAllBuMen.htm";
	var url_findCategorysByFatherId="/publish/category/findCategorysByFatherId.htm";
	var url_findAllJcxm="/publish/jcxm/findAllJcxm.htm";
	 level=getJSONData(url_findCategorysByFatherId,{fatherid:oimsCategory.SHRRUMOBAN_JIBIE,tag:Math.random()},"post").obj;
	 bumen=getJSONData(url_findAllBuMen,{tag:Math.random()},"post").obj;
	 jcxm=getJSONData(url_findAllJcxm,{tag:Math.random()},"post").obj;
}
function searchInspectionItemCombo(){

	if($.trim($("#search").val())=="请输入组套名称"){
		$.extend(listFactor.data,{search:''});
	}
	else{
		$.extend(listFactor.data,{search:$.trim($("#search").val())});
	}
    $("#div_list").createPageList(listFactor);

}
/**
 * 添加
 */
function addInspectionItemCombo(){
	var div_basicinfo="<div><table width='100%' border='0' cellspacing='0' cellpadding='0' class=' templatetable'>"+
					 "<tr>"+
	                   "<td width='8%' align='right' nowrap>"+"名称"+"：</td>"+
	                   "<td width='20%'>" +
	                   "<input name='name' id='name' onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur' />"+
	                   "</td>"+
	                   "<td width='3%'><span class='required'>*</span></td>"+//必填提示
	                   "<td width='8%' align='right' nowrap>"+"级别"+"：</td>"+
	                   "<td width='20%'>" +
	                   "<select  name='level' id='level'  onblur=\"this.className='blur'\"></select>" +
	                   "</td>"+
	                   "<td width='3%'><span class='required'>*</span></td>"+//必填提示
	                   "<td width='8%' align='right' nowrap>"+"部门"+"：</td>"+
	                   "<td width='20%' align='right' nowrap>"+
	                   "<select name='bmId' id='bmId' onblur=\"this.className='blur'\"></select>"+
	                   "</td>"+
	                   "<td width='3%'><span class='required'>*</span></td>"+//必填提示
	                   "</tr></table></div>";
	var div_ComboTable_content="<div id='checkedarray' style='overflow:auto;height:90%;border:1px solid silver'></div>";
	var  div_ComboTable="<div style='width:45%;float:left;height:200px;text-align:left'><h3 style='text-align:left'>已选择项目：</h3>"+div_ComboTable_content+"</div>";
	var div_checkbox_content="<div id='combo_checkbox' style='overflow:auto;height:90%;border:1px solid silver'></div>";
	var div_checkbox="<div  style='width:45%;float:right;height:200px;text-align:left;' ><h3 style='text-align:left'>待选择项目：</h3>"+div_checkbox_content+"</div>";
	
	var addInspectionItemCombo=oimsFormWindow({
		id:"addInspectionItemCombo",
		dialogTitle:language.Add,
		icon:"add",
		url:contextPath+"/publish/shurumoban/addInspectionItemCombo",
		height:400,
		width:600,
		method:"post",
		resetForm:reset_AddInspectionItemCombo,
		btnOkBefor:validate_AddInspectionItemCombo,
		}) ;
		$(".openWin").css("overflow-y","hidden");
		addInspectionItemCombo.append(div_basicinfo).append(div_ComboTable).append(div_checkbox);
		
	    //级别
	    $.each(level,function(i,n){
		    $("<option value=\""+n.categoryid+"\">"+n.category+"</option>").appendTo("#level");
		});
	     //所属科室下拉框
	     $.each(bumen,function(i,n){
	    	$("<option value=\""+n.id+"\">"+n.bmmc+"</option>").appendTo("#bmId");
	     });
	     //循环显示所有的检查项目到检查项目列表
	 
	     $.each(jcxm,function(i,n){
	    	 var d=$("<div style='height:20px;border-bottom:1px solid silver;line-height:20px'>"+n.xmmc+"</div>");
	    	 var e=$("<div style='height:20px;border-bottom:1px solid silver;line-height:20px' inspectionid='"+n.id+"'>"+n.xmmc+"</div>");
	    	$("#combo_checkbox").append(d);
//	    	d.click(function(){$("#combo_checkbox").remove(d);
//	    	$("#checkedarray").append(d);
	    	d.click(function(){d.css({"display":"none"});
	    	e.css({"display":"block"});
	    	$("#checkedarray").append(e);
	    	e.click(function(){e.css({"display":"none"});
	    	d.css({"display":"block"});
	    	});
	    	});
	    	
	    	});
	     
	    	
	
	  
}
/**
 * 添加验证
 */
function validate_AddInspectionItemCombo(){
	if($.trim($("#name").val())!=""){
		var childrendivblock=$("#checkedarray div:visible");
		if(childrendivblock.length==0){
			$.oimsAlert("检查项目不能为空");
			return false;
		}
		var param={};
		var v={tag:Math.random()};
		var inspectionids="";
		v["name"]=$.trim($("#name").val());
		v["level"]=$("#level").val();
		v["bmId"]=$("#bmId").val();
		
		$.each(childrendivblock,function(i,n){
			
			if(i==childrendivblock.length-1){
				inspectionids+=$(n).attr("inspectionid");
				return false;
			}
			inspectionids+=$(n).attr("inspectionid")+",";
		});
		v["inspectionitemIds"]=inspectionids;
		param["param"]=JSON.stringify(v);
		console.dir(JSON.stringify(param));
		var data=getJSONData(addInspectionItemComboUrl,param,"post");
		if(data.state==1){
			$.oimsSucc(language.InsertOK_Alert,inspectionItemCombo_DialogClose("addInspectionItemCombo"));
		}
		else{
			$.oimsError(language.InsertFail_Alert,inspectionItemCombo_DialogClose("addInspectionItemCombo"));
		}
		return false;
	}
	else{
		$.oimsAlert("请输入名称");
		return false;
	}

	
}
/**
 * 添加重置
 */
function reset_AddInspectionItemCombo(){
	$("#name").val("");
	$("#level").val(bumen[0].id);
	$("#bmId").val(level[0].id);
	$("#checkedarray div").css("display","none");
	$("#combo_checkbox div").css("display","block");
}

function updateInspectionItemCombo(){
	var dataObjects=getCheckBoxValue();
	InspectionItemCombo_obj=dataObjects[0];
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
	var div_basicinfo="<div><table width='100%' border='0' cellspacing='0' cellpadding='0' class=' templatetable'>"+
					 "<tr>"+
	                   "<td width='8%' align='right' nowrap>"+"名称"+"：</td>"+
	                   "<td width='20%'>" +
	                   "<input name='name' id='name' onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur' />"+
	                   "</td>"+
	                   "<td width='3%'><span class='required'>*</span></td>"+//必填提示
	                   "<td width='8%' align='right' nowrap>"+"级别"+"：</td>"+
	                   "<td width='20%'>" +
	                   "<select  name='level' id='level'  onblur=\"this.className='blur'\"></select>" +
	                   "</td>"+
	                   "<td width='3%'><span class='required'>*</span></td>"+//必填提示
	                   "<td width='8%' align='right' nowrap>"+"部门"+"：</td>"+
	                   "<td width='20%' align='right' nowrap>"+
	                   "<select name='bmId' id='bmId' onblur=\"this.className='blur'\"></select>"+
	                   "</td>"+
	                   "<td width='3%'><span class='required'>*</span></td>"+//必填提示
	                   "</tr></table></div>";
	var div_ComboTable_content="<div id='checkedarray' style='overflow:auto;height:90%;border:1px solid silver'></div>";
	var  div_ComboTable="<div style='width:45%;float:left;height:200px;text-align:left'><h3 style='text-align:left'>已选择项目：</h3>"+div_ComboTable_content+"</div>";
	var div_checkbox_content="<div id='combo_checkbox' style='overflow:auto;height:90%;border:1px solid silver'></div>";
	var div_checkbox="<div  style='width:45%;float:right;height:200px;text-align:left;' ><h3 style='text-align:left'>待选择项目：</h3>"+div_checkbox_content+"</div>";
	
	var updateInspectionItemCombo=oimsFormWindow({
		id:"updateInspectionItemCombo",
		dialogTitle:language.Modify,
		icon:"edit",
		url:contextPath+"/publish/shurumoban/updateInspectionItemCombo.htm",
		height:400,
		width:600,
		method:"post",
		resetForm:reset_UpdateInspectionItemCombo,
		btnOkBefor:validate_UpdateInspectionItemCombo,
		}) ;
		$(".openWin").css("overflow-y","hidden");
		updateInspectionItemCombo.append(div_basicinfo).append(div_ComboTable).append(div_checkbox);
		
	    //级别
	    $.each(level,function(i,n){
		    $("<option value=\""+n.categoryid+"\">"+n.category+"</option>").appendTo("#level");
		});
	     //所属科室下拉框
	     $.each(bumen,function(i,n){
	    	$("<option value=\""+n.id+"\">"+n.bmmc+"</option>").appendTo("#bmId");
	     });
	     //初始化基础信息
	     $("#name").val(dataObjects[0].name);
	     $("#level").val(dataObjects[0].level);
	     $("#bmId").val(dataObjects[0].bmId);
	     //显示已有项目到已选择列表,没有选择项目到待选择列表
	     $.each(jcxm,function(i,n){
	    	 var d= $("<div style='height:20px;border-bottom:1px solid silver;line-height:20px;display:block' inspectionid='"+n.id+"'>"+n.xmmc+"</div>");
	    	 $("#combo_checkbox").append(d);
	    	 var e=$("<div style='height:20px;border-bottom:1px solid silver;line-height:20px;display:none' inspectionid='"+n.id+"'>"+n.xmmc+"</div>");
	    	 $("#checkedarray").append(e);
	     });
	     $("#combo_checkbox").children().click(function(){
	    	$(this).css({"display":"none"});
	    	$("#checkedarray").find("[inspectionid='"+$(this).attr("inspectionid")+"']").css({"display":"block"});
	     });
	     $("#checkedarray").children().click(function(){
	    	 $(this).css({"display":"none"});
		    $("#combo_checkbox").find("[inspectionid='"+$(this).attr("inspectionid")+"']").css({"display":"block"});
	     });
	    var inspectionitemIds=dataObjects[0].inspectionitemIds;
	    inspectionitemIds=inspectionitemIds.split(",");
	    $.each(inspectionitemIds,function(i,n){
	    	$("#checkedarray").find("[inspectionid='"+n+"']").css({"display":"block"});
	    	$("#combo_checkbox").find("[inspectionid='"+n+"']").css({"display":"none"});
	    });
	    
	    	
	
	  

}
/**
 * 修改验证
 */
function validate_UpdateInspectionItemCombo(){

	if($.trim($("#name").val())!=""){
		var childrendivblock=$("#checkedarray div:visible");
		if(childrendivblock.length==0){
			$.oimsAlert("检查项目不能为空");
			return false;
		}
		var param={};
		var v={tag:Math.random()};
		var inspectionids="";
		v["name"]=$.trim($("#name").val());
		v["level"]=$("#level").val();
		v["bmId"]=$("#bmId").val();
		v["id"]=InspectionItemCombo_obj.id;
		$.each(childrendivblock,function(i,n){
			
			if(i==childrendivblock.length-1){
				inspectionids+=$(n).attr("inspectionid");
				return false;
			}
			inspectionids+=$(n).attr("inspectionid")+",";
		});
		v["inspectionitemIds"]=inspectionids;
		param["param"]=JSON.stringify(v);
		console.dir(JSON.stringify(param));
		var data=getJSONData(updateInspectionItemComboUrl,param,"post");
		if(data.state==1){
			$.oimsSucc(language.InsertOK_Alert,inspectionItemCombo_DialogClose("updateInspectionItemCombo"));
		}
		else{
			$.oimsError(language.InsertFail_Alert,inspectionItemCombo_DialogClose("updateInspectionItemCombo"));
		}
		return false;
	}
	else{
		$.oimsAlert("请输入名称");
		return false;
	}

	

}
/**
 * 修改重置
 */
function reset_UpdateInspectionItemCombo(){
	var dataObjects=getCheckBoxValue();
	$("#name").val(InspectionItemCombo_obj.name);
	$("#level").val(InspectionItemCombo_obj.level);
	$("#bmId").val(InspectionItemCombo_obj.bmId);
	$("#checkedarray div").css("display","none");
	$("#combo_checkbox div").css("display","block");
	 var inspectionitemIds=dataObjects[0].inspectionitemIds;
	    inspectionitemIds=inspectionitemIds.split(",");
	    $.each(inspectionitemIds,function(i,n){
	    	$("#checkedarray").find("[inspectionid='"+n+"']").css({"display":"block"});
	    	$("#combo_checkbox").find("[inspectionid='"+n+"']").css({"display":"none"});
	    });

}
function delInspectionItemCombo(){

	var dataObjects=getCheckBoxValue();
	if(dataObjects.length==0)
	{
		$.oimsAlert(language.CheckOneItem_Alert);
		return;
	}
	$.oimsConfirm({strTitle:"确认删除综合模板？",remove_length:true}, delInspectionItemComboById);

}
function delInspectionItemComboById(){

	var dataObjects=getCheckBoxValue();
	var data=getJSONData(delInspectionItemComboUrl,{id:dataObjects[0].id,tag:Math.random()},"post");
	if(data.state==1)
	$.oimsSucc(language.DelOK_Alert,function(){
		$("#div_list").remove();
		showInspectionItemComboList();});
	else
	$.oimsError(language.DelError_Alert,function(){
		$("#div_list").remove();
		showInspectionItemComboList();});

}
/**
 * 关闭弹出框
 */
function inspectionItemCombo_DialogClose(formid){
	$("#"+formid).parent().parent().remove();
	$("#div_list").remove();
	showInspectionItemComboList(); 
}
