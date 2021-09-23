function exportChild() {
	var pt = proTool();
	var ar = getCheckBoxValue() ;
	var ids = "" ;
	$.each(ar,function(i,v){
		if(!v)return false ;
		ids+= (ids=="")?v.huanzheID:","+v.huanzheID ;
	}) ;
	pt.proDown(contextPath + "/publish/child/exportChild.htm", {where:ids});
};

function showImportChildDia(){

	var table_importChild="";
	table_importChild+="<table width='100%' border='0' cellspacing='0' cellpadding='0' class=' templatetable'>";
	table_importChild+="<tr>" +
				        "<td align='right' nowrap>"+"请选择exl文件"+"</td>"+
				        "<td>"+
				        "<div class='searchfile'>"+
                        "<input type='file' name='url_excel_child' id ='url_excel_child' class='filed'/>"+
                        "<div class='fieldstyle'><input type='text' name='txt_fieldstyle' id='txt_fieldstyle' class='fieldtext'/></div>"+
                        "<div class='buttonstyle'><input type='button'  id='btn_child' class='fieldbutton'/></div>"+
                        "</div>"+
                        "</div>"+
				        "</td>"+
			  		    "</tr>";
	table_importChild+="</table>";
	var form_importChild=$("<form/>").attr("id","form_importChild").attr("action",contextPath+"/publish/child/importChild.htm").attr("enctype","multipart/form-data").attr("method","post");
	$(table_importChild).appendTo(form_importChild);
	var div_openbutton=$("<div/>").attr("id","div_openbutton").attr("class","openbutton").appendTo(form_importChild);//底部div
    var div_openbutton_html="<a href='javascript:importChild();'><span class='advsumit'></span>"+"提交"+"</a> <a href=''><span class='advreset'></span>"+"重置"+"</a>";
	$(div_openbutton_html).appendTo(div_openbutton);
	$(form_importChild).oimsDialog({
    icon:"export",
    title:"导入",
    width:450,
    height:120,
    drag:true,
    locked:true,
    winType:4,
    button:null
    });
	$.customfile('fieldbutton','filed','fieldtext',"openWin");
}

  function importChild(){
	  $("#form_importChild").ajaxForm({
		    beforeSend:null,
		    uploadProgress: function() {
		    },
			complete: function(data_Result) {
				var data_pre=data_Result.responseText;
				var data_string="";
		        if(data_pre.indexOf("</pre")==-1)
		        	data_string=data_pre;
		        else
		        	data_string=data_pre.substring(data_pre.indexOf("{"),data_pre.indexOf("</pre"));
				var data_Obj=eval("("+data_string+")");
				var state=data_Obj.state;
				if(state==1)
					$.oimsAlert("导入成功");
				else
					$.oimsAlert("导入失败");
			}
	     });
	$("#form_importChild").submit();
	  
  }
