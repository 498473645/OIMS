var bumen;
var level;
var diseases;
var inquiry;
var physical_examination;
var physical_examination_father;
//修改综合模板的时候用来传递参数
var updateComposite_dataObjects;
var updateComposite_obj;
var div_tab_inquiryandphysical_examination=["主诉","体格检查"];
var saveCompositeTemplateUrl="/publish/shurumoban/saveCompositeTemplate.htm";
var findAllTemplateByCompositeId="/publish/shurumoban/findAllTemplateByCompositeId.htm";
var updateAllTemplateByCompositeId="/publish/shurumoban/updateAllTemplateByCompositeId.htm";
var deleteCompositeTemplateUrl="/publish/shurumoban/deleteCompositeTemplate.htm";
function compositeTemplateReady(btns){
      //btns_baoGaoMoBan=btns;
	  pageTitle = '病史模板';
	  importCSS("/js/manager/emr/css/emr.css");
	  init();
	 
	  var div_advquery=$("<div/>").attr("id","div_advquery").attr("class","advquery").appendTo("#right");
	  var table_advquery="";
	      table_advquery+="<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
	      table_advquery+="<tr>"+
					      "<td width='23%' class='leftalign' >" +
					      "<input name='search' type='text' class='blurview' id='search' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"+"请输入疾病名称或模板名称"+"' size='28' />" +
					      "</td>"+
					      "<td width='9%'><a href='javascript:searchCompositeTemplate();' class='search'>"+language.Query+"</a></td>"+
			              "<td width='59%'>" +
			              "<div class='btn'>" +
			              "<a onclick='return false;' href='javascript:addCompositeTemplate();'><span class='adda'></span>"+language.Add+"</a>" +
			              "<a onclick='return false;' href='javascript:updateCompositeTemplate();'><span class='edita'></span>"+language.Modify+"</a>" +
			              "<a onclick='return false;'  href='javascript:delCompositeTemplate();'><span class='dela'></span>"+language.Del+"</a>" +
			              "</div>" +
			              "</td>"+
			              "</tr>";
	      table_advquery+="</table>";
	     
	  $(table_advquery).appendTo(div_advquery);
	  btnProwerConfig(btns);//按钮加上权限
	  showCompositeTemplateList();//显示报告模板列表
	  initialData_CompositeTemplateData();//初始化报告模板模块必须的数据
	  $("#search").click(function(){
		  clearInitQuery(this);
	  });//点击输入框清空字体
	  $("#search").blur(function(){
			if(this.value==""){
				$("#search").val("请输入疾病名称或模板名称");
				$("#search").addClass("blurview");
			}
	  });

}
function showCompositeTemplateList() {
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
			   			key : "category"
			   		},{
			   			title : "疾病名称",
			   			key : "disease"
			   		},{
			   			title : "创建人",
			   			key : "operator"
			   		},
			   		{
			   			title : "所属部门",
			   			key : "bmmc"
			   		}
			   		],
		manageMenu : null,
		url :contextPath+"/publish/shurumoban/findCompositeTemplateByPage.htm",
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
function initialData_CompositeTemplateData(){
	var url_findAllBuMen="/publish/bumen/findAllBuMen.htm";
	var url_findCategorysByFatherId="/publish/category/findCategorysByFatherId.htm";
	var url_findDiseases="/publish/jibing/findDiseases.htm";
	 level=getJSONData(url_findCategorysByFatherId,{fatherid:oimsCategory.SHRRUMOBAN_JIBIE,tag:Math.random()},"post").obj;
	 bumen=getJSONData(url_findAllBuMen,{tag:Math.random()},"post").obj;
	 diseases=getJSONData(url_findDiseases,{fatherId:oimsCategory.ILL_CATEGORY,tag:Math.random()},"post").obj;
	 inquiry=getJSONData(url_findCategorysByFatherId,{fatherid:oimsCategory.WENZHENMOBAN_CATEGORY_NAME,tag:Math.random()},"post").obj;
	 physical_examination_father=getJSONData(url_findCategorysByFatherId,{fatherid:oimsCategory.TIGEMOBAN_CATEGORY_NAME,tag:Math.random()},"post").obj;
	physical_examination=[];
	$.each(physical_examination_father,function(i,n){
		physical_examination.push(getJSONData(url_findCategorysByFatherId,{fatherid:this.categoryid,tag:Math.random()},"post").obj[0]);
		physical_examination.push(getJSONData(url_findCategorysByFatherId,{fatherid:this.categoryid,tag:Math.random()},"post").obj[1]);
	});
	
}
/**
 * 新增
 */
function addCompositeTemplate(){
	var div_inquiry="";
	var div_physical_examination="";
	var div_composite="<div><table width='100%' border='0' cellspacing='0' cellpadding='0' class=' templatetable'>"+
					 "<tr>"+
	                   "<td width='9%' align='right' nowrap>"+"名称"+"：</td>"+
	                   "<td width='40%'>" +
	                   "<input name='name' id='name' onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur' />"+
	                   "</td>"+
	                   "<td width='1%'><span class='required'>*</span></td>"+//必填提示
	                   "<td width='9%' align='right' nowrap>"+"级别"+"：</td>"+
	                   "<td width='40%'>" +
	                   "<select  name='level' id='level'  onblur=\"this.className='blur'\"></select>" +
	                   "</td>"+
	                   "<td width='1%'><span class='required'>*</span></td>"+//必填提示
	                   "</tr>"+
	                   "<tr>"+
	                   "<td width='9%' align='right' nowrap>"+"疾病"+"：</td>"+
	                   "<td width='40%'>" +
	                   "<select name='diseaseid' id='diseaseid' onblur=\"this.className='blur'\"></select>" +
	                   "</td>"+
	                   "<td width='1%'><span class='required'>*</span></td>"+//必填提示
	                   "<td width='9%' align='right' nowrap>"+"部门"+"：</td>"+
	                   "<td width='40%' align='right' nowrap>"+
	                   "<select name='bmId' id='bmId' onblur=\"this.className='blur'\"></select>"+
	                   "</td>"+
	                   "<td width='1%'><span class='required'>*</span></td>"+//必填提示
	                   "</tr></table></div>";
	 var div_tablabel=$("<div/>").attr("id","div_tablabel").attr("class","tablabel");
	   $.each(div_tab_inquiryandphysical_examination,function(i,n){
	    	var div=$("<div />").attr("class","tab_hide").attr("onclick","tab_click(this)").appendTo(div_tablabel);
	    	var div_html="<span>"+n+"</span>";
	    	$(div_html).appendTo(div);
	    	if(i==0){
	    		div.attr("class","tab_show");
	    	}
	    });
	   //构造主诉
	var table_inquiry="";
	
	$.each(inquiry,function(i,n){
		table_inquiry+="<tr><td align='center' nowrap >"+n.category+"：</td>"+
						"<td ><textarea onblur=\"this.className='blur';\" onfocus=\"this.className='focus'\" class='blur' id='"+n.categoryid+"'  cols='45' rows='5'/></td></tr>";
	});
	div_inquiry= "<div style='overflow:auto;height:200px' id='div_inquiry'>"+
				  "<table width='100%' cellspacing='0' cellpadding='0' class=' templatetable'>"+
				  table_inquiry+
				  "</table>"+
				  "</div>";
	//构造体格检查
	var table_physical_examination="";

	$.each(physical_examination,function(i,n){
		if(i%2==0){
			table_physical_examination+="<tr><td align='center' width='100'>"+physical_examination_father[i/2].category+"</td><td style='background-color:white;text-align:left;' ><div contentEditable='true' id='"+n.categoryid+"' /></td>";
		}
		else{
			table_physical_examination+="<td style='background-color:white;text-align:left;' ><div contentEditable='true' id='"+n.categoryid+"' hidefocus=\"true\"/></td></tr>";
		}
	});
	div_left_right_eyes="<div  id='left_right_eye'><table><tr><th width='153px'></th><th width='302px'>左眼</th><th width='302px'>右眼</th><th></th></tr></table></div>";
	div_physical_examination="<div class='div_physical_examination' id='div_physical_examination' >"+
							 "<table>"+
							  table_physical_examination+
							  "</table>"+
							  "</div>";
	var saveCompositeTemplate=oimsFormWindow({
		id:"saveCompositeTemplate",
		dialogTitle:language.Add,
		icon:"add",
		url:contextPath+"saveCompositeTemplate",
		height:400,
		width:800,
		method:"post",
		resetForm:reset_InsertCompositeTemplate,
		btnOkBefor:validate_InsertCompositeTemplate
		}) ;
		saveCompositeTemplate.append(div_composite).append(div_tablabel).append(div_inquiry).append(div_left_right_eyes).append(div_physical_examination);//追加表格
		//体格检查下的每个td中的div可编辑的时候,当按下回车键时不额外添加div的方法
		$.each(physical_examination,function(i,n){
			if(i%2==0){
				$("#"+this.categoryid).composite_div_br();
			}
			else{
			 	$("#"+this.categoryid).composite_div_br();
			}
		});
	    //级别
	    $.each(level,function(i,n){
		    $("<option value=\""+n.categoryid+"\">"+n.category+"</option>").appendTo("#level");
		});
//	    //疾病
//	    $.each(diseases,function(i,n){
//	    	$("<option value=\""+n.id+"\">"+n.disease+"</option>").appendTo("#diseaseid");
//	     });
	    // 调用一个方法重新给diseaseid下拉框赋值
	    importJS("/js/manager/moban/selectDiseases.js");
	    selectDiseasesTree("diseaseid",saveCompositeTemplate);
	     //所属科室下拉框
	     $.each(bumen,function(i,n){
	    	$("<option value=\""+n.id+"\">"+n.bmmc+"</option>").appendTo("#bmId");
	     });
}
function tab_click(obj){
	$("#div_tablabel").children().attr("class","tab_hide");
	$(obj).attr("class","tab_show").attr("style","display:block");
	if($(obj).index()==0){
		$("#div_inquiry").css("display","block");
		$("#div_physical_examination").css("display","none");
		$("#left_right_eye").css("display","none");
	}
	if($(obj).index()==1){
		$("#div_inquiry").css("display","none");
		$("#div_physical_examination").css("display","block");
		$("#left_right_eye").css("display","block");
	}
}
/**
 * 验证后提交
 */
function validate_InsertCompositeTemplate(){
	
	 if($.trim($("#name").val())==""){
		$.oimsAlert("请输入综合模板名称");
		return false;
	}
	 
	 else if($.trim($("#selectofdiseaseid").text())==""){
		 $.oimsAlert("请输入疾病名称");
		 return false;
	 }
	 else{
			//构造json,发送ajax
			var composite_param={};
			composite_param["recordsets"]=JSON.stringify({name:$.trim($("#name").val()),level:$("#level option:selected").val(),diseaseid:$("#diseaseid option:selected").val(),bmId:$("#bmId option:selected").val()});
			composite_param["recordsetsdetail"]=[];
			//先放入问诊
			$.each(inquiry,function(i,n){
				composite_param["recordsetsdetail"].push({categoryId:n.categoryid,content:$("#"+n.categoryid).val()});
			});
			//再放入体格检查
			$.each(physical_examination,function(i,n){
				composite_param["recordsetsdetail"].push({categoryId:n.categoryid,content:$("#"+n.categoryid).text()});
			});
			//发送ajax请求到后台
			composite_param["recordsetsdetail"]=JSON.stringify(composite_param["recordsetsdetail"]);
			var data=getJSONData(saveCompositeTemplateUrl,composite_param,"POST");
			if(data.state==1){
				$.oimsSucc(language.InsertOK_Alert,compositeTemplateDialogClose("saveCompositeTemplate"));
			}
			else{
				$.oimsError(language.InsertFail_Alert,wenZhenMoban_DialogClose("saveCompositeTemplate"));
			}
			return false;
		}
	
	
}
/**
 * 重置
 */
function reset_InsertCompositeTemplate(){
	$("#name").val("");
	$("#selectofdiseaseid").text("");
	$("#diseaseid").children().remove();
	selectItemByValue("level",level[0].categoryid);
	selectItemByValue("diseaseid",diseases[0].id);
	selectItemByValue("bmId",bumen[0].id);
	$("#div_inquiry textarea").val("");
	$("#div_physical_examination div").text("");
}
/**
 * 移除弹出框
 */
function compositeTemplateDialogClose(formId){
	$("#"+formId).parent().parent().remove();
	$("#div_list").remove();
	showCompositeTemplateList();
}
/**
 * 修改
 */
function updateCompositeTemplate(){
	var dataObjects=getCheckBoxValue();
	updateComposite_dataObjects=dataObjects;
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
	var div_inquiry="";
	var div_physical_examination="";
	var div_composite="<div><table width='100%' border='0' cellspacing='0' cellpadding='0' class=' templatetable'>"+
					 "<tr>"+
	                   "<td width='9%' align='right' nowrap>"+"名称"+"：</td>"+
	                   "<td width='40%'>" +
	                   "<input name='name' id='name' onblur=\"this.className='blur';checkIsStrEmpty(this);\" onfocus=\"this.className='focus'\" class='blur' />"+
	                   "</td>"+
	                   "<td width='1%'><span class='required'>*</span></td>"+//必填提示
	                   "<td width='9%' align='right' nowrap>"+"级别"+"：</td>"+
	                   "<td width='40%'>" +
	                   "<select  name='level' id='level'  onblur=\"this.className='blur'\"></select>" +
	                   "</td>"+
	                   "<td width='1%'><span class='required'>*</span></td>"+//必填提示
	                   "</tr>"+
	                   "<tr>"+
	                   "<td width='9%' align='right' nowrap>"+"疾病"+"：</td>"+
	                   "<td width='40%'>" +
	                   "<select name='diseaseid' id='diseaseid' onblur=\"this.className='blur'\"></select>" +
	                   "</td>"+
	                   "<td width='1%'><span class='required'>*</span></td>"+//必填提示
	                   "<td width='9%' align='right' nowrap>"+"部门"+":</td>"+
	                   "<td width='40%' align='right' nowrap>"+
	                   "<select name='bmId' id='bmId' onblur=\"this.className='blur'\"></select>"+
	                   "</td>"+
	                   "<td width='1%'><span class='required'>*</span></td>"+//必填提示
	                   "</tr></table></div>";
	 var div_tablabel=$("<div/>").attr("id","div_tablabel").attr("class","tablabel");
	   $.each(div_tab_inquiryandphysical_examination,function(i,n){
	    	var div=$("<div />").attr("class","tab_hide").attr("onclick","tab_click(this)").appendTo(div_tablabel);
	    	var div_html="<span>"+n+"</span>";
	    	$(div_html).appendTo(div);
	    	if(i==0){
	    		div.attr("class","tab_show");
	    	}
	    });
	   //构造主诉
	var table_inquiry="";
	$.each(inquiry,function(i,n){
		table_inquiry+="<tr><td align='center' nowrap >"+n.category+"：</td>"+
						"<td ><textarea onblur=\"this.className='blur';\" onfocus=\"this.className='focus'\" class='blur' id='"+n.categoryid+"'  cols='45' rows='5'/></td></tr>";
	});
	div_inquiry= "<div style='overflow:auto;height:200px' id='div_inquiry'>"+
				  "<table width='100%' cellspacing='0' cellpadding='0' class=' templatetable'>"+
				  table_inquiry+
				  "</table>"+
				  "</div>";
	//构造体格检查
	var table_physical_examination="";
	$.each(physical_examination,function(i,n){
		if(i%2==0){
			table_physical_examination+="<tr><td align='center' width='100px'>"+physical_examination_father[i/2].category+"</td><td style='background-color:white;text-align:left;' ><div contentEditable='true' id='"+n.categoryid+"'/></td>";
		}
		else{
			table_physical_examination+="<td style='background-color:white;text-align:left;' ><div contentEditable='true' id='"+n.categoryid+"' /></td></tr>";
		}
	});
	div_left_right_eyes="<div  id='left_right_eye'><table><tr><th width='153px'></th><th width='302px'>左眼</th><th width='302px'>右眼</th><th></th></tr></table></div>";
	div_physical_examination="<div class='div_physical_examination' id='div_physical_examination' >"+
							 "<table>"+
							  table_physical_examination+
							  "</table>"+
							  "</div>";
	  //向后台发请求根据recordsets的id返回所有下属输入模板以及变量集合
    var data=getJSONData(findAllTemplateByCompositeId,{id:dataObjects[0].id},"POST");
    updateComposite_obj=data.obj;
    //console.log(JSON.stringify(data.obj));
	var updateCompositeTemplate=oimsFormWindow({
		id:"updateCompositeTemplate",
		dialogTitle:language.Modify,
		icon:"edit",
		url:contextPath+"updateCompositeTemplate",
		height:400,
		width:800,
		method:"post",
		resetForm:reset_UpdateCompositeTemplate,
		btnOkBefor:validate_UpdateCompositeTemplate
		}) ;
	updateCompositeTemplate.append(div_composite).append(div_tablabel).append(div_inquiry).append(div_left_right_eyes).append(div_physical_examination);//追加表格
	//体格检查下的每个td中的div可编辑的时候,当按下回车键时不额外添加div的方法
	$.each(physical_examination,function(i,n){
		if(i%2==0){
			$("#"+this.categoryid).composite_div_br();
		}
		else{
		 	$("#"+this.categoryid).composite_div_br();
		}
	});
	    //级别
	    $.each(level,function(i,n){
		    $("<option value=\""+n.categoryid+"\">"+n.category+"</option>").appendTo("#level");
		});
	    //疾病
//	    $.each(diseases,function(i,n){
//	    	$("<option value=\""+n.id+"\">"+n.disease+"</option>").appendTo("#diseaseid");
//	     });
	    importJS("/js/manager/moban/selectDiseases.js");
	    selectDiseasesTree("diseaseid",updateCompositeTemplate);
	     //所属科室下拉框
	     $.each(bumen,function(i,n){
	    	$("<option value=\""+n.id+"\">"+n.bmmc+"</option>").appendTo("#bmId");
	     });
	     //基本信息赋值
	     $("#name").val(dataObjects[0].name);
	     $("#level").val(dataObjects[0].level);
	     $("#diseaseid").append($("<option value='"+dataObjects[0].diseaseid+"' "+"selected='selected'>"+"</option>"));
	     $("#selectofdiseaseid").text("("+(dataObjects[0].icd_code?dataObjects[0].icd_code:"")+")"+dataObjects[0].disease);
	     $("#bmId").val(dataObjects[0].bmId);
	     if(data.state==1){
	    	 //取出list中的所有
	    	 $.each(data.obj,function(i,n){
	    		 if($("#"+n.categoryId).is('div')){
	    			 $("#"+n.categoryId).text(n.content);
	    		 }
	    		 else{
	    		 $("#"+n.categoryId).val(n.content);}
	    	 });
	     }
}
/**
 * 修改的提交前验证
 */
function validate_UpdateCompositeTemplate(){
	//obj每次打开update弹出框后都要向后台发送的其你去返回的是recordsetsdetail和模板变量的信息
	if($.trim($("#name").val())==""){
		$.oimsAlert("请输入综合模板名称");
		return false;
	}
	else if($.trim($("#selectofdiseaseid").text())==""){
		$.oimsAlert("请输入关联疾病");
		return false;
	}
	else{

		//构造json,发送ajax
		var composite_param={};
		composite_param["recordsets"]=JSON.stringify({id:updateComposite_dataObjects[0].id,name:$.trim($("#name").val()),level:$("#level option:selected").val(),diseaseid:$("#diseaseid option:selected").val(),bmId:$("#bmId option:selected").val()});
		composite_param["recordsetsdetail"]=[];
		$.each(updateComposite_obj,function(i,n){
			if($("#"+n.categoryId).is('div')){
				composite_param["recordsetsdetail"].push({id:n.id,categoryId:n.categoryId,content:$("#"+n.categoryId).text()});
			}
			else{
				composite_param["recordsetsdetail"].push({id:n.id,categoryId:n.categoryId,content:$("#"+n.categoryId).val()});
			}
		});
		//发送ajax请求到后台
		composite_param["recordsetsdetail"]=JSON.stringify(composite_param["recordsetsdetail"]);
		var data=getJSONData(updateAllTemplateByCompositeId,composite_param,"POST");
		if(data.state==1){
			$.oimsSucc(language.UpdateOK_Alert,compositeTemplateDialogClose("updateCompositeTemplate"));
		} 
		else{
			$.oimsError(language.UpdateFail_Alert,compositeTemplateDialogClose("updateCompositeTemplate"));
		}
		//禁止掉插件默认提交行为
		return false;
	}
	
}
/**
 * 重置
 */
function reset_UpdateCompositeTemplate(){
	$("#name").val(updateComposite_dataObjects[0].name);
	$("#level").val(updateComposite_dataObjects[0].level);
	$("#diseaseid").children().remove();
	$("#diseaseid").append($("<option value='"+updateComposite_dataObjects[0].diseaseid+"' "+"selected=selected></option>"));
	$("#selectofdiseaseid").text("("+(updateComposite_dataObjects[0].icd_code?updateComposite_dataObjects[0].icd_code:"")+")"+updateComposite_dataObjects[0].disease);
	$("#bmId").val(updateComposite_dataObjects[0].bmId);
	 $.each(updateComposite_obj,function(i,n){
		 if($("#"+n.categoryId).is('div')){
			 $("#"+n.categoryId).text(n.content);
		 }
		 else{
		 $("#"+n.categoryId).val(n.content);}
	 });
}
/**
 * 删除
 */
function delCompositeTemplate(){
	var dataObjects=getCheckBoxValue();
	if(dataObjects.length==0)
	{
		$.oimsAlert(language.CheckOneItem_Alert);
		return;
	}
	$.oimsConfirm({strTitle:"确认删除综合模板？",remove_length:true}, deleteCompositeTemplateById);
}
/**
 * 通过Id删除综合模板
 */
function deleteCompositeTemplateById(){
	var dataObjects=getCheckBoxValue();
	var data=getJSONData(deleteCompositeTemplateUrl,{id:dataObjects[0].id,tag:Math.random()},"post");
	if(data.state==1)
	$.oimsSucc(language.DelOK_Alert,function(){
		$("#div_list").remove();
		showCompositeTemplateList();});
	else
	$.oimsError(language.DelError_Alert,function(){
		$("#div_list").remove();
		showCompositeTemplateList();});
}
/**
 * 按条件查询
 */
function searchCompositeTemplate(){
		if($.trim($("#search").val())=="请输入疾病名称或模板名称"||$.trim($("#search").val())==""){
			$.extend(listFactor.data,{search:''});
		}
		else{
			$.extend(listFactor.data,{search:$.trim($("#search").val())});
		}
	    $("#div_list").createPageList(listFactor);
}
/**
 * 可编辑div换行不创建div
 */
$.fn.composite_div_br=function(){
	$(this).focus();
	$(this).unbind('keydown').bind('keydown',function(e){
		if(e.keyCode==13){
			if (document.selection && document.selection.createRange) {
				var range = document.selection.createRange();
				range.pasteHTML('<br />');
				range.select();
				return false;
			} else if (window.getSelection) {
				var selection = window.getSelection();
				var range = window.getSelection().getRangeAt(0);
				range.deleteContents();
				var br = document.createElement('br');
				range.insertNode(br);
				range.setStartAfter(br);
				//改变了range后，需要重新选择range
				selection.removeAllRanges();
				selection.addRange(range);
				//return false;
				e.stopPropagation();
			}
		}
	});
};

