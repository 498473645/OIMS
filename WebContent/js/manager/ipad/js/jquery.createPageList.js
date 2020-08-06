;(function($) {
$.fn.createPageListIpad=function(settings) {
	var current = this;//表示分页div对象
	load(settings,current);
};

/*
 *  current表示分页div对象
 *  settings参数的集合
 */
function load(settings, current) {
	$.ajax({
		url : settings.url,//url
		data : settings.data,//参数
		async : false,
		dataType : 'json',
		type : settings.method,//get,post传参方式
		success : function(data) {
			showMyList(current, data, settings);
		}
	});
}

/*
 *显示list
 *current当前div对象
 *data 是后台返回的一个结果集
 *settings前台封装的参数
 */
function showMyList(current, data, settings) {
	$(current).text("");//首先清空div内容
	addListData(current, data.list, settings);//添加list数据
	var formId=settings.formId;//formId 表单ID
	if(formId==undefined)formId="pageForm";//默认值为pageForm
	var pageForm = $("#"+formId);//是一个form对象
	if(!pageForm.length){//form对象为空创建此form对象
		pageForm=$("<form/>").attr("id", formId).css("text-align","right").appendTo(current);
	}else{//form对象不为空
		$(pageForm).text("");
	}
	$.each(settings.data,function(n,v){
		$("<input/>").attr("name",n).attr("type","hidden").val(v).appendTo(pageForm);
	});
	$(pageForm).attr("method", settings.method);//form 对象的method方法赋值
	$(pageForm).attr("action", settings.url);//form对象的url
	addPageData(data.page, pageForm);//传入一个集合数据集，一个form对象，添加数据
	$(pageForm).ajaxForm({
		dataType : 'json',
		success : function(result) {
			showMyList(current, result, settings);
		}
	});
}
/*
 *添加分页控件下面的下一页等方法
 *page 是一个包含了，页数，总条数，每页显示的行数的数值
 *target可以理解为一个form表单对象
 */
function addPageData(page,target) {
	$("<input/>").attr("type", "hidden").attr("name", "pageCount").val(page.pageCount).appendTo(target);
	var div = $("<div/>").addClass("page").appendTo(target);
	if (page.pageCount > 1) {
	  $("<span ><input name='page' type='text' class='blur1'/><a id='go' href='#'>GO</a></span>").appendTo(div);
		$("#go").click(
				function() {
					var n = $("input[name=page]").val();
					if (isNaN(n)) {
						$.oimsAlert(ipadLanguage.QingShuRuNum);
						return;
					}
					if (n < 1 || n > eval($("input[name=pageCount]").val())) {
						$.oimsAlert(ipadLanguage.QingShuRuOneDao + $("input[name=pageCount]").val()
								+ ipadLanguage.ZhiJianNum);
						return;
					}
					$("input[name=currentPage]").val(n);
					$(target).submit();
				});
	}
	if (page.currentPage < page.pageCount) {
		var l = $("<a href='#'><span class='pagerighta' title='"+ipadLanguage.LastYeLanguage+"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>").appendTo(div);
		$(l).click(function() {
			$("input[name=currentPage]").val(page.pageCount);
			$(target).submit();
		});
		var nextPage = $("<a href='#'><span class='pagerightb' title='"+ipadLanguage.NextYeLanguage+"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>").appendTo(div);
		$(nextPage).click(
				function() {
					var curPage = page.currentPage+1;
					$("input[name=currentPage]").val(curPage);
					$(target).submit();
				});

		
	}
	if (page.currentPage > 1) {
		var p = $("<a href='#'><span class='pageleftb' title='"+ipadLanguage.ShangYeLanguage+"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>").appendTo(div);
		$(p).click(
				function() {
					var curPage = page.currentPage-1;
					$("input[name=currentPage]").val(curPage);
					$(target).submit();
			});
		var firstPage =  $("<a href='#'><span class='pagelefta' title='"+ipadLanguage.ShowYeLanguage+"'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>").appendTo(div);
		$(firstPage).click(function() {
			$("input[name=currentPage]").val(1);
			$(target).submit();
		});
	}
	var str = "<span> "+ipadLanguage.DangQianNum+page.currentPage+ipadLanguage.YeGongLanguage+page.pageCount+ipadLanguage.YeGongLanguage+page.rowsCount+ipadLanguage.tiaoLanguageFen+"</span>";
	$(str).appendTo(div);
}

/*
 * current表示当前分页div对象
 * ListData后台返回的对象集合对象
 * settings前台封装的参数集合
 * 根据数据集集合，动态打印表格
 */
function addListData(currentDiv,listData,settings)
{
	var listObj=settings.listObj;//表格标题的参数（对象的数组）listObj : [ {title : "列标题一",key : ""},{title : "列标题二",key : ""} ]
	var tableId=$(currentDiv).attr("id")+"Table";//声明一个ID
	var tablex=$("<table/>").attr("id",tableId).attr("cellspacing",0).attr("cellpadding",0).appendTo(currentDiv);//创建一个table写入到currentDiv
	var trTitle=$("<tr/>").appendTo(tablex);//表格第一行对象
	if(settings.checkbox==true)//true表示显示复选框
		$("<th/>").text(ipadLanguage.xuanZeLanguage).appendTo(trTitle);//<th>则表示标题,一般用在一列的第一格,里面的内容会自动加粗加黑他们
	//表格标题的打印
	$.each(listObj,function(i,obj){
		$("<th/>").text(obj.title).appendTo(trTitle);//<th>则表示标题,一般用在一列的第一格,里面的内容会自动加粗加黑他们
	});
	if(settings.manageMenu!=undefined && settings.manageMenu!=null && settings.manageMenu!="")
		$("<th/>").text(ipadLanguage.YongHuCaoLanguage).appendTo(trTitle);
	//表格数据打印，listData是一个数据对象的集合
	if(listData!=null&&listData.length!=0){
	//数据打印方法开始
	$.each(listData,function(m,data){//对象的集合
		//trData定义开始
		var trData = $("<tr/>");
		if(settings.checkbox==true)//true表示显示复选框,主要解决没有复选框单击行报错问题
		{
			trData.bind('click',function(){ //创建一行写入到tablex表格中
			if(settings.single==true)//single==true表示复选框只能单选
			{				
				var checkBoxObjm=$('#checkBoxObj'+m)[0];
		    	var state=false;
		        if(checkBoxObjm.checked==false){
		        	state=true;
		        	$(this)[0].className = "t4";
		        }else{
		        	$(this)[0].className = selectClass(m);
		        }
		        	
		        if(settings.invocationEvent==true){
		        	selectAllCheckboxByID(state,'checkBoxObj','checkBoxObj'+m,settings.methodName_Checked,settings.methodName_NoChecked);
		        }else{
		        	selectAllCheckboxByID(state,'checkBoxObj','checkBoxObj'+m,null,null); 	
		        }
		        
		     }else
		     {
				if($('#checkBoxObj'+m)[0].checked==true){					
					$('#checkBoxObj'+m)[0].checked=false;
					$(this)[0].className = selectClass(m);
				}else{
					$('#checkBoxObj'+m)[0].checked=true;
					$(this)[0].className = "t4";
			    }
		     }
		});
		}
		//trData定义结束
		trData.appendTo(tablex);
		if(settings.checkbox==true)//true表示显示复选框
		{
			var checkBoxObj=$("<input />").attr("type", "checkbox").attr("name", "checkBoxObj").attr("id","checkBoxObj"+m).attr("value",data).attr("value",(JSON.stringify(data).replace(new RegExp("\"","gm"),"'"))).click(function(){
				if($('#checkBoxObj'+m)[0].checked==true)
				   $('#checkBoxObj'+m)[0].checked=false;
				else
				{
					$('#checkBoxObj'+m)[0].checked=true;
				}
				   
			});
			$("<td />").html(checkBoxObj).appendTo(trData);
		}
		$.each(listObj, function(n, obj){//key的集合
			var val_td="-";
			$.each(data,function(key,value){//对象属性值的集合
				if (key == obj.key) {//字段等于表格表头的key
					if(value!=null&&typeof(value)=="object"&&value.time!=null)//时间
						value=formatDateTime(parseInt(value.time));
					if (obj.func != undefined)
						value = obj.func(value);//什么意思					
					val_td=value;
					
				}
			});//三次循环结束
			$("<td />").html(val_td).appendTo(trData);
		});//二层循环结束
		if(settings.manageMenu!=undefined && settings.manageMenu!=null && settings.manageMenu!="")
			$(getManageMenuForList(data, settings)).appendTo($("<td/>").appendTo(trData));
	});//一层循环结束
	//数据打印方法结束
	tableCss(tableId);//表格样式渲染
	}else
	{
		var trError=$("<tr/>").appendTo(tablex);
        var rowspanNumber=settings.data.pageSize;
        var colspanNumber=listObj.length;
        if(settings.checkbox==true)
        	colspanNumber+=1;
        if(settings.manageMenu!=undefined && settings.manageMenu!=null && settings.manageMenu!="")
        	colspanNumber+=1;
        var tdErrorHtml="<font size='3' color='red'></font>";
		var tdError= $("<td/>").html(tdErrorHtml).attr("rowspan",rowspanNumber).attr("colspan",colspanNumber).appendTo(trError);
		tableErrorCss(tableId);//表格错误样式渲染
	}
}    

/*
 * 返回一个操作的超链接字符串
 */
function getManageMenuForList(data,settings)
{
	var menuStr="";//拼装的超链接字符串
	//manageMenu是一个操作的集合manageMenu : [{title : "操作一",url : "javascript:#"}, {title : "操作二",url : "javascript:#"} ]
	$.each(settings.manageMenu,function(i,menu){
		if(i>0)//不止一个操作
			menuStr+="&nbsp;&nbsp;|";
		var titleStr=menu.title;//超链接字符串
		var urlStr=menu.url;//javascript:add();
//		alert(typeof(urlStr));
	    if(urlStr.split(":")[0]=="javascript")
	    {
	    	var begin=urlStr.indexOf("(");
	    	if(begin>0)//方法名是这样的 javascript:add() 存在超链接参数
	    	{
	    		var pamameters=urlStr.substring(begin + 1, urlStr.indexOf(")")).split(",");//参数的数组
	    		for(var n=0;n<pamameters.length;n++)
	    		{
	    			$.each(data, function(key,value) {
						if (pamameters[n]==key)
							urlStr = urlStr.replace(key,"'"+value+"'");//替换
					});
	    		}
//	    		alert(urlStr);
	    	}else//不存在（表示只是简单的方法名 javascript:add 然后这些方法默认添加上data对象集合参数
	    	{
	    		var paramData = JSON.stringify(data) ; 
				paramData=paramData.replace(new RegExp("\"","gm"),"'");
				urlStr += "( "+paramData+" )";
	    	}
	    }//大if结束
	    menuStr += "<a href=\"" + urlStr + "\">" + titleStr + "</a>";
	});
	return menuStr;
}

})(jQuery);

/*
 *表格样式渲染
 */
function tableCss(id)
{
	$("#" + id).css("width", "100%");
	var Ptr= $("#" + id + " tr");
	for (var i=1;i<Ptr.length+1;i++) 
	{ 
		if(i%2>0){ 
			Ptr[i-1].className = "t2";
		}else{
			Ptr[i-1].className = "t1";
		}
	}
	    for(var i=0;i<Ptr.length;i++) {
		Ptr[i].onmouseover=function(){
			if(this.className != "t4"){
				this.tmpClass=this.className;
				this.className = "t3"; 
			}
		};
		Ptr[i].onmouseout=function(){
			if(this.className != "t4"){
				this.className=this.tmpClass;
			}			
		};
    }
}
/*
 *表格样式渲染
 */
function tableErrorCss(id)
{
	$("#" + id).css("width", "100%");
}
/** 
* 全选的所有指定id名称的同名checkbox 
* @state 全选的checkbox的状态 
* @name 表格中的所有checkbox的名称 
* @name 表格中的所有checkbox的id 
*/ 
function selectAllCheckboxByID(state,name,id,methodName_Checked,methodName_NoChecked) {
	var ids = document.getElementsByName(name); 
	for (var i = 0; i < ids.length; i++) 
	{ 
		
		if(ids[i].id == id) 
		{
			ids[i].checked = state;
			if(state==true&&methodName_Checked!=null&&methodName_Checked!="")
				methodName_Checked();
			if(state==false&&methodName_NoChecked!=null&&methodName_NoChecked!="")
				methodName_NoChecked();
				
		}
		else
		{
			ids[i].checked = false;
			ids[i].parentNode.parentNode.className = selectClass((ids[i].id).split("checkBoxObj")[1]);
		}
	} 
} 
/*
 *获取选中复选框的的数据
 *返回一个对象的集合 
 */
function getCheckBoxValue()
{
	 var dataObjects=new Array();
     var options = document.getElementsByName("checkBoxObj");
     for ( var i = 0; i < options.length; i++) {
	 if (options[i].checked) {
		 var dataObject=eval("("+options[i].value+")");
		 dataObjects.push(dataObject);
	}
    }	
    return dataObjects;
}

function selectClass(index){
	var className = "";
	if(index % 2 == 0){
		className = "t1";
	}else{
		className = "t2";
	}
	return className;
}

