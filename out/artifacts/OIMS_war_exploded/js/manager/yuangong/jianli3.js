var FIND_YGJL_URL="/publish/yuangong/findYuangGongJianli.htm";
var FIND_YUANGONG_BY_GH_URL="/publish/yuangong/findYuangongByGh.htm";
var SAVE_YGJL_URL="/publish/yuangong/saveOrUpdateYgjl.htm";
var TEMPLATE_YGJL_URL="/js/manager/yuangong/template/jianli.html";
var DELETE_YGJL_URL="/publish/yuangong/deleteYgjl.htm";

/**
 * 
 */
function wodeGerenJianli(btns){
	var gonghao = userData.gonghao;
	showYuangongJianli(gonghao,true);
}
/**
 * 显示员工简历
 */
function showYuangongJianli(gonghao, edit){
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
	div = $("<div />").css({"background":"#fff"}).width(800).appendTo(div);
	$(common_getHtmlTemplate(contextPath+"/js/manager/yuangong/template/yuangong.html")).appendTo(div);
	if(yg.photo && isWebPhoto(yg.photo)){
		$("#yg_photo").attr("src",contextPath+yg.photo);
	}
	var shengri = yg.shengri?formatDate(yg.shengri.time):"";
	yg = $.extend(yg,{shengri:shengri})
	replaceFormData(div,yg);
	
	showYGJLTag(div,re,gonghao,edit);
}

function showYGJLTag(div,re,gonghao,edit){
	var tem = $(common_getHtmlTemplate(contextPath+TEMPLATE_YGJL_URL));
	$("<div />").addClass('toolBar').css({marign:0,padding:0,background:"#ccc",height:"24px","line-height":"24px","font-weight":"bold","text-align":"center","font-size":"12px"}).text("家庭主要成员").attr('name','jtcy').attr('data','家庭主要成员').appendTo(div);
	
	$("<div />").addClass('toolBar').css({marign:0,'border-top':'5px solid white',padding:0,background:"#ccc",height:"24px","line-height":"24px","font-weight":"bold","text-align":"center","font-size":"12px"}).attr('name','dyxl').attr('data','第一学历').text("第一学历").appendTo(div);
	$("<div />").addClass('toolBar').css({marign:0,'border-top':'5px solid white',padding:0,background:"#ccc",height:"24px","line-height":"24px","font-weight":"bold","text-align":"center","font-size":"12px"}).attr('name','zgxl').attr('data','最高学历').text("最高学历").appendTo(div);
	$("<div />").addClass('toolBar').css({marign:0,'border-top':'5px solid white',padding:0,background:"#ccc",height:"24px","line-height":"24px","font-weight":"bold","text-align":"center","font-size":"12px"}).attr('name','xw').attr('data','学   位').text("学位").appendTo(div);
	$("<div />").addClass('toolBar').css({marign:0,'border-top':'5px solid white',padding:0,background:"#ccc",height:"24px","line-height":"24px","font-weight":"bold","text-align":"center","font-size":"12px"}).attr('name','jypx').attr('data','教育培训及实习经历（从第一学历起）').text("教育培训及实习经历（从第一学历起）").appendTo(div);
	$("<div />").addClass('toolBar').css({marign:0,'border-top':'5px solid white',padding:0,background:"#ccc",height:"24px","line-height":"24px","font-weight":"bold","text-align":"center","font-size":"12px"}).attr('name','gzjl').attr('data','工作简历').text("工作简历").appendTo(div);
	$("<div />").addClass('toolBar').css({marign:0,'border-top':'5px solid white',padding:0,background:"#ccc",height:"24px","line-height":"24px","font-weight":"bold","text-align":"center","font-size":"12px"}).attr('name','cgjl').attr('data','成果奖励').text("成果奖励").appendTo(div);
	$("<div />").addClass('toolBar').css({marign:0,'border-top':'5px solid white',padding:0,background:"#ccc",height:"24px","line-height":"24px","font-weight":"bold","text-align":"center","font-size":"12px"}).attr('name','cykt').attr('data','主持或参与课题').text("主持或参与课题").appendTo(div);
	$("<div />").addClass('toolBar').css({marign:0,'border-top':'5px solid white',padding:0,background:"#ccc",height:"24px","line-height":"24px","font-weight":"bold","text-align":"center","font-size":"12px"}).attr('name','fblw').attr('data','发表论文').text("发表论文").appendTo(div);
	$("<div />").addClass('toolBar').css({marign:0,'border-top':'5px solid white',padding:0,background:"#ccc",height:"24px","line-height":"24px","font-weight":"bold","text-align":"center","font-size":"12px"}).attr('name','xwlw').attr('data','学位论文').text("学位论文").appendTo(div);
	$("<div />").addClass('toolBar').css({marign:0,'border-top':'5px solid white',padding:0,background:"#ccc",height:"24px","line-height":"24px","font-weight":"bold","text-align":"center","font-size":"12px"}).attr('name','hdzl').attr('data','获得专利').text("获得专利").appendTo(div);
	$("<div />").addClass('toolBar').css({marign:0,'border-top':'5px solid white',padding:0,background:"#ccc",height:"24px","line-height":"24px","font-weight":"bold","text-align":"center","font-size":"12px"}).attr('name','rych').attr('data','获得的其它奖励和荣誉称号').text("获得的其它奖励和荣誉称号").appendTo(div);
	$("<div />").addClass('toolBar').css({marign:0,'border-top':'5px solid white',padding:0,background:"#ccc",height:"24px","line-height":"24px","font-weight":"bold","text-align":"center","font-size":"12px"}).attr('name','zwpj').attr('data','自我评价').text("自我评价").appendTo(div);
//	
//	$.each(re.obj,function(i,d){
//		var tag = $("<div />").addClass("gongzuojingli_"+d.id).addClass("gongzuojingli").append(tem.clone()).appendTo(div);
//		addYGJLTagWithData(tag,d,edit);
//	});
	if(edit){//循环每个title 并在后面加入添加按钮
		$.each($('.toolBar'),function(i,d){
			$("<span />").html("&nbsp; &nbsp; - &nbsp; &nbsp; ").appendTo(d);
			$("<a />").text("添加").click(function(){
//				showAddYGJLForm(d, {gonghao:gonghao},edit);
				showAddOrUpdataJLForm(d,{gonghao:gonghao},edit,tem) ;//显示添加或者修改表单
			}).appendTo(d);
		}) ;
	}
}
function showAddOrUpdataJLForm(taget,obj,edit,tem){
	var topDiv = $("<div/>").append(tem) ;
	var formId = $(taget).attr('name') ;
	var title = (obj.id?'修改':'添加')+$(taget).attr('data') ;
	var win = topDiv.find('[id='+formId+']');
	var div_openbutton_html = "<a style='font-size:24px'><span class='advsubmit'></span>"
		+ "[提交]"// 提交
		+ "</a>";
	$(div_openbutton_html).appendTo(win) ;
	win.oimsDialog({
		icon : 'add',
		title : title,// 新增
		width : 450,
		height : 260,
		drag : false,
		locked : true,
		winType : 4
	});
	$("a").click(function(){
		$("form").attr('action',contextPath+SAVE_YGJL_URL);
		$("#gonghao").val(obj.gonghao);
		$("form").ajaxForm(
				{
				complete:function(){
					addResponseTextToTable({id:'111'},taget) ;
					removeDiv_openWin();
				}
				});
		$("form").submit();
	});
}
//------得到返回数据并 填充表格
function  addResponseTextToTable(obj,taget){
	    var id = obj.id ; //得到ID
	    $("<div />").insertAfter($(taget)).html('asdfsafsa') ;
}

//function addYGJLTagWithData(tag,d,edit){
//	d = $.extend(d,{startDate:formatDate(d.startDate.time),endDate:d.endDate?formatDate(d.endDate.time):""})
//	if(edit){
//		var div = $("<div />").css({"text-align":"right", padding:"0 8px 4px"}).insertAfter(tag);
//		$("<a />").attr("href","javascript:void(0)").text("[编辑]").click(function(){
//			showAddYGJLForm(tag,d,edit);
//		}).appendTo(div);
//		$("<span />").html("&nbsp; | &nbsp; ").appendTo(div);
//		$("<a />").attr("href","javascript:void(0)").text("[删除]").click(function(){
//			$.oimsConfirm("确定要删除吗？",function(){
//				var re = getJSONData(DELETE_YGJL_URL,{id:d.id},"POST");
//				if(!re.state){
//					$.oimsAlert("删除失败！");
//				}else{
//					tag.remove();
//					div.remove();
//				}
//			});
//		}).appendTo(div);
//	}
//	replaceFormData(tag,d);
//}

//function showAddYGJLForm(div, d,edit){
//	var title = (d.id?"修改":"添加")+"工作（学习）经历";
//	showFormDialog({
//		action:SAVE_YGJL_URL,
//		width:500,height:320,title:title,locked:true,
//		beforeSubmit:function(_d){
//			var r=true;
//			$.each(_d,function(i,d_){
//				if(d_.name!="endDate" && d_.name!="id" && d_.value==""){
//					r=false;
//					return false;
//				}
//			});
//			if(!r)$.oimsAlert("表单未填写完整！");
//			return r;
//		},submitCallBack:function(re){
//			if(!re.state){
//				$.oimsAlert("提交失败！");
//				return;	
//			}
//			var tem = common_getHtmlTemplate(contextPath+TEMPLATE_YGJL_URL);
//			var tag = $(".gongzuojingli_"+d.id);
//			if(tag.length){
//				tag.html(tem);
//				tag.next("div").remove();
//			}else{
//				tag = $("<div />").addClass("gongzuojingli_"+re.obj.id).addClass("gongzuojingli").append(tem).insertAfter(div);
//			}
//			addYGJLTagWithData(tag,re.obj,edit);
//		},templateUrl:TEMPLATE_YGJL_URL,formData:d
//	});
//	calendarFun("startDate");
//	calendarFun("endDate");
//}