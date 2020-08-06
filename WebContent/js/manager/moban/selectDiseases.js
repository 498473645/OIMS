var compositeTemplateSearchDiseasesByPYUrl_later=null;
var compositeTemplateSearchDiseasesByPYUrl_pinyin="";


var compositeTemplateSearchDiseasesByPYUrl="/publish/jibing/compositeTemplateSearchDiseasesByPY.htm";
function selectDiseasesTree(obj,form){
	//取得select标签的位置。obj:页面上被替代的select id.url：jsTree 获得json后台
	 var $selectObj = $("#"+obj);
	 var offset=Offset($selectObj.get(0)); //取得Select所在的位置 
	 $selectObj.css("display","none");//隐藏原来的select
	 var $iDiv = $("<div id='selectof"+obj+"'></div>");//模拟一个div替代select
	 $iDiv.css("height",offset.height+"px");
	 //$iDiv.css("background","url(images/icon_select.gif) no-repeat right 4px");
	 $iDiv.css("border","1px solid #d2d2d2");
	 $iDiv.css("fontSize","12px");
	 $iDiv.css("lineHeight",offset.height+"px");
	 $iDiv.css("textIndent","4px");
	 $iDiv.css({"text-align":"left","overflow":"hidden","background-color":"#cce8cf"});
	 $selectObj.parent().append($iDiv);
	 $iDiv.click(function(){
		 compositeTemplateSearchDiseasesByPYUrl_pinyin="";
		if($.trim($("#pinyin").val())!=""){
			$("#pinyin").val("");
		}
	  if($("#selectchild"+obj).length==1){
	   //判断是否创建过弹出层div
	   if(($("#selectchild"+obj+":hidden").length==1)){
	    //打开
	    $("#selectchild"+obj).css("display","block");
	    //清除之前显示的内容，变成最开始的一级疾病内容
	    var diseases = getCategoriesData(40000);
	    $("#selectchild"+obj+" div:last").html("");
	    var ul=$("<ul id='bingLiUL' />").addClass("ztree").appendTo($("#selectchild"+obj+" div:last"));
		selectDiseaseTree(ul,diseases);
	   }else{
	    //隐藏
	    $("#selectchild"+obj).css("display","none");
	   }
	  }else{
		$(".openWin").css("overflow-y","hidden");
	   //初始一个div放在上一个div下边，当options的替身。
	   var $cDiv = $("<div id='selectchild"+obj+"'></div>");
	   $cDiv.css("position","absolute");
	   $cDiv.css("z-index","9999");
	   //position取到的是相对于最近的relative的div的偏移
	   $cDiv.css("top",($iDiv.position().top+$iDiv.height()+2)+"px");
	   $cDiv.css("left",($iDiv.position().left-1)+"px");
	   $cDiv.css("width",(offset.width)+"px");
	   $cDiv.css("height","290px");
	  // $cDiv.css("overflow","auto");
	   $cDiv.css("background","#f7f7f7");
	   $cDiv.css("border","2px solid silver");
	   //再加入一个div用于拼音检索
	   $pinyin=$("<div><input id='pinyin' size='"+$cDiv.width()/6.7+"px' /></div>");
	   $pinyin.css({"height":$iDiv.css("line-height"),"border":"1px solid #d2d2d2","width":$cDiv.width()});
	   $cDiv.append($pinyin);
	   $deptDiv = $("<div></div>");
	   $cDiv.append($deptDiv);
	   form.append($cDiv);
	   $deptDiv.css({"overflow":"auto","height":$cDiv.height()-$pinyin.height(),"width":$cDiv.width()});
	   //input调用拼音检索方法
	   $("#pinyin").compositeTemplateSearchDiseasesByPY();
	   //给$deptDiv初始化ztree
	   importJS("/js/categoryTree.js");
		result = getCategoriesData(40000);
		var ul=$("<ul id='bingLiUL' />").addClass("ztree").appendTo($deptDiv);
		//ul.show();
		//只引入一次tree的插件
		getCategoryTree();
		selectDiseaseTree(ul,result);
	  }
	 });
}

function Offset(e) 
{ 
//取标签的绝对位置 
 var t = e.offsetTop; 
 var l = e.offsetLeft; 
 var w = e.offsetWidth; 
 var h = e.offsetHeight-2; 
 while(e=e.offsetParent) 
 { 
  t+=e.offsetTop; 
  l+=e.offsetLeft; 
 } 
 return { 
  top : t, 
  left : l, 
  width : w, 
  height : h 
 }; 
}
function selectDiseaseTree(ul,result,pinyin){
	
	importCSS("/css/zTree/zTreeStyle.css") ;
	importJS("/js/jquery.ztree.core-3.3.min.js") ;
	var treeDate = new Array() ;
	$.each(result,function(i,v){
		var d = categoryToTreeDate(v) ;
		treeDate.push(d) ;
//		setTreeDate(d) ;//递归全部加载
	}) ;
	
	var setting = {
			view: {
				selectedMulti: false
			},
			edit: {
				enable: true,
				showRemoveBtn: false,
				showRenameBtn: false
			},
			data: {
				keep: {
					parent:true,
					leaf:true
				},
				simpleData: {
					enable: true
				}
			},
			callback: {
				onClick: fillSelect,
				onExpand:fillSelect

			}
		};
	$.fn.zTree.init(ul,setting,treeDate);
}
function fillSelect(event, treeId, treeNode, clickFlag){
	if(clickFlag){
		var id=treeNode.id;
		var name=treeNode.name;
		$("#diseaseid").children().remove();
		//将被选中的疾病的Id赋值给select标签，但是不显示它，显示它的还是$iDiv，但是提交用的是select
		$("#diseaseid").append($("<option value='"+id+"' "+"selected='selected'></option>"));
		$("#selectofdiseaseid").text(name);
		$("#selectchilddiseaseid").css("display","none");
		return;
	}
	var ccs;
	
	if(compositeTemplateSearchDiseasesByPYUrl_pinyin==""){ccs= getCategoriesData(treeNode.id) ;}
	
	else{ccs=getJSONData(compositeTemplateSearchDiseasesByPYUrl,{pinyin:compositeTemplateSearchDiseasesByPYUrl_pinyin,fatherId:treeNode.id,tag:Math.random()},"POST").obj;}
	
	if(ccs.length==0){ 
		treeNode.isParent = false ;
		return ;
	}else{
		treeNode.isParent = true ;//这个属性为true才会显示子节点
	}
	var nodes = new Array() ;
	$.each(ccs,function(i,v){
		if(v==undefined) return false ;
			nodes.push(categoryToTreeDate(v)) ;
	}) ;
	var zTree = $.fn.zTree.getZTreeObj("bingLiUL");
	if(treeNode.children.length==0){
		var ttreeNode = zTree.addNodes(treeNode,nodes ,false);
		if (ttreeNode) {
		} else {
			alert("叶子节点被锁定，无法增加子节点");
		}
	}
}
$.fn.compositeTemplateSearchDiseasesByPY=function(){
	$(this).bind("keyup",function(){
		var input=$(this);
		if(compositeTemplateSearchDiseasesByPYUrl_later!=null) clearTimeout(compositeTemplateSearchDiseasesByPYUrl_later);
		compositeTemplateSearchDiseasesByPYUrl_later=setTimeout(function(){
			//每次按键后过500毫秒要执行的函数
				var key=$.trim(input.val());
				//ajax查找填充
				
				var data=getJSONData(compositeTemplateSearchDiseasesByPYUrl,{pinyin:key,fatherId:40000,tag:Math.random()},"POST");
				$("#selectchilddiseaseid div:last").html("");
				var ul=$("<ul id='bingLiUL' />").addClass("ztree").appendTo($deptDiv);
				compositeTemplateSearchDiseasesByPYUrl_pinyin=key;
				
				selectDiseaseTree(ul,data.obj);
				
			
			
		
		},500);
	});

}