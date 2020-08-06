var contorller_findJz = "/publish/bingli/findBySeach.htm" ;
var contorller_findEx = "/publish/bingli/findEx.htm" ;
var contorller_findExport = "/publish/bingli/export.htm" ;
var photo_pdf_movie_export="/publish/bingli/everyExport.htm";
var contorller_findByCategory = "/publish/bingli/findByCategory.htm" ;

function loadJsAndCss_BingLi() {
	importJS("/js/oimsUi.js") ;
	l_bi = setLanguage(l_bi); 
	//loadWelcomePage() ;
} ;

var l_bi = {
		localDb:483,//本地数据库
		distanceDb:484,//远程数据库
		InputBlhOrZhenDuanOrXm:354,//请输入病历号、诊断或姓名
		Export:68,//导出
		
		diagnose:485,//诊断
		cure:486,//治疗
		ZuShu:36,//主诉
		history:487,//即往史
		XianBingShi:37,//现病史
		homeHistory:488,//家族史
		drugHistory:489,//药敏史
		yanjianCheak:490,//体格检查-眼睑
		moreCheak:491,//体格检查-更多
		BingLiHao:383,//病历号
		Sex:189,//性别
		birthday:464,//生日 
		sequence:492,//次数
		Male:204,//男
		Female:205,//女
		has:473,// 有
		noHas:474,//无
		
		choiseHz:493,//请选择一个患者
		BingLiSee:329,//病历查看
		noDate:494,//无数据
		
		Birth:195,//出生日期
		Sfzh:385,//身份证号
		MobilePhone:200,//手机号码
		WorkDW:387,//工作单位
		Zcsj:388,//注册时间
		Name:188,//患者姓名 
		hzxb:40,//患者性别
		isYiBao:52,//是否医保
		
		SsDq:389,//所属地区
		
		zhi:51,//至
		TeleNum:162,//联系电话
		HzAge:53,//患者年龄
		DwTel:54,//单位电话
		BzFenLei:60,//病种分类 
		JiuZhenJiLu:61,//就诊记录
		
		HzDwDz:478,//单位地址
		HzDwYb:479,//单位邮编
		Jtdz:206,//家庭地址
		YZBB:480,//邮政编码
		LXFS:481,//联系方式
		Lxr:55,//联系人
		JinJiTel:56,//紧急电话
		HzSource:59,//患者来源
		illCode:495//疾病编码
} ;


/* -----------------------------s--------------------------------------------**/

var cp;

/**
 * 显示患者病历列表
 */
function showPatientList() {
	loadJsAndCss_BingLi();
//	var categoryTree = $(".right .categoryTree");
//	var load=true;
//	if (!categoryTree.length) {
//		categoryTree = $("<div />").width(180).height(
//				$(".content").height() - $(".title").outerHeight(true)).addClass(
//				"categoryTree").appendTo(".right");
//		categoryTree.css({
//			"background" : "#fff",
//			"overflow-y" : "auto",
//			"overflow-x" : "hidden",
//			"border-right" : "2px solid #ddd",
//			"float":"left"
//		});
//		var button=$("<div style='float:left'/>").addClass('btn').css({height:"30px","background":"#fff"}).append($("<a style='margin-left:65px' />").append($("<span />").addClass('dpersonnel')).append("疾病树")).appendTo(categoryTree);
//		var t = $("<div />").addClass("categoryTitle").width(280).css({height:"55px","line-height":"28px","background":"#fff"}).appendTo(categoryTree);
//	//	$("<a />").css({border:"1px solid #d2d2d2", background:"#ccc",width:"58px",color:"#fff",height:"22px","text-align":"center","line-height":"22px",display:"block",float:"left"}).text("本地数据库").appendTo(t);
//	//	$("<a />").css({width:"58px",color:"#fff",height:"22px","text-align":"center","line-height":"22px",display:"block",float:"left",border:"1px solid #d2d2d2"}).text("远程数据库").appendTo(t);
//		var titleDiv = $("<div />")/*.addClass("tablabel")*/  ;
//		titleDiv.append(($("<div />").addClass("tab_show").append($("<span />").append(l_bi.localDb)))) ;
//		titleDiv.append(($("<div />").addClass("tab_hide").append($("<span />").append(l_bi.distanceDb)))) ;
//		titleDiv.appendTo(t) ;
//	} else {
//		categoryTree.text("");
//	}
//	
//	//button.width(t.width());
//	$(button).toggle(function(){
//		categoryTree.children('div:eq(1)').css({display:'block'});
//		categoryTree.children('div:eq(2)').css({display:'block'});
//		if(load){
//			getCategoryTree();
//			showCategoryTree(categoryTree, oimsCategory.ILL_CATEGORY,onClick,onClick);
//			load=false;
//		}
//	},function(){
//		categoryTree.children('div:eq(1)').css({display:'none'});
//		categoryTree.children('div:eq(2)').css({display:'none'});
//	});
//	categoryTree.children('div:eq(1)').css({display:'none'});
//	categoryTree.children('div:eq(2)').css({display:'none'});
	var t=$("<div />").addClass("oims_div_className").width($(".right").width()-/*categoryTree.outerWidth()-*/25)/*.height(categoryTree.outerHeight()-16)*/.css({"float":"right","margin-left":"8px","overflow-y":"auto"}).appendTo(".right");

	l_bi.InputBlhOrZhenDuanOrXm="请输入病历号或者姓名";
	
	var str=l_bi.InputBlhOrZhenDuanOrXm;
	var pe_advquery = "<div class='advquery'>"+  
	" <table width='100%' cellspacing='0' cellpadding='0' border='0'>"+
	"  <tbody><tr>"+
	"  <td width='23%' class='leftalign'><input id='search' name='search' type='text' size='28' value='"+str+"' " +
	"	onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" id='textfield' class='blurview' name='textfield'></td>"+
	"  <td width='9%'><a class='search'  id='find'>"+language.Query+"</a></td>"+
	"   <td width='9%'><a class='advsearch'  id='findEx'>"+language.AdvSearch+"</a></td>"+
	"   <td width='59%'>"+
	"      <div class='btn'>"+
	"     <a id='bi_view'><span class='dpersonnel'></span>"+language.See+"</a>"+
	"     <a id='export'><span class='export'></span>"+l_bi.Export+"</a>"+   
	"	  <a id='exportPhoto' style='width:80px'><span class='export'></span>"+"导出影像"+"</a>"+   
	"     </div>"+
	"     </td>"+
	"   </tr>"+
	"  </tbody></table>"+
	" </div>" ;
	$(pe_advquery).appendTo(t) ;
	
	$("#search",t).blur(function(){
		$(this).removeClass("focus").addClass("blurview");
		if($(this).val().length==0)$(this).val(str);
	});
	$("#search",t).click(function(){
		if($(this).val()==str)
			$(this).val("") ;
	}) ;
	$("#find",t).click(function(){
//		debugger;
//		var s = $("#find",t).val();
//		if(s==str){
//			s=null;
//		}
//		showPatientListByCategory(null,s);
//		alert(1);
	});
	$("#findEx",t).click(function(){
//		showAdvSearch();
		findBingliEx() ;
	});
	$("<div />").addClass("list").appendTo(t);
	showPatientListByCategory();
	//于洋--2012-10-08
	addHeadler_bl_luke();

	
		
	//界面刷新处理
	$(window).resize(function (){
		$(".categoryTree").height($(".content").height() - $(".title").outerHeight(true));
		$("#C_ri").height($(".categoryTree").height()-$(".categoryTitle").height()) ;
		$(".oims_div_className").width($(".right").width()-categoryTree.outerWidth()-25).height($(".categoryTree").outerHeight() - 20);
	});
}

function onClick(event, treeId, treeNode, clickFlag) {
	var ccs = getCategoriesData(treeNode.id);
	if (ccs.length == 0) {
		treeNode.isParent = false;
		showPatientListByCategory({
			id : treeNode.id
		});
		return;
	} else {
		treeNode.isParent = true;// 这个属性为true才会显示子节点
	}

	var nodes = new Array();
	$.each(ccs, function(i, v) {
		if (v == undefined)
			return false;
		nodes.push(categoryToTreeDate(v));
	});

	var zTree = $.fn.zTree.getZTreeObj("bingLiUL");
	if (treeNode.children.length == 0) {
		var ttreeNode = zTree.addNodes(treeNode, nodes, false);
		if (ttreeNode) {
		} else {
			alert("叶子节点被锁定，无法增加子节点");
		}
	}
	// 页面查询显示
	showPatientListByCategory({
		id : treeNode.id
	});
};

function showAdvSearch(){
	//$.oimsAlert("演示版暂未提供此功能");
	var advTag = $("<div />").addClass("advTag").appendTo("body");
	var ul = $("<ul />").appendTo(advTag);
	var li=$("<li />").appendTo(ul);
	$("<span />").text(l_bi.Name).appendTo(li);
	$("<input type=\"text\" name=\"name\" />").appendTo(li);
	li = $("<li />").appendTo(ul);
	$("<span />").text(l_bi.Birth).appendTo(li);
	$("<input type=\"text\" name=\"birthdayStart\" />").width(80).appendTo(li);
	$("<span />").width(20).css("text-align","center").text("-").appendTo(li);
	$("<input type=\"text\" name=\"birthdayEnd\" />").width(80).appendTo(li);
	li=$("<li />").appendTo(ul);
	$("<span />").text(l_bi.diagnose).appendTo(li);
	$("<input type=\"text\" name=\"mc\" />").appendTo(li);
	li=$("<li />").appendTo(ul);
	$("<span />").text(l_bi.cure).appendTo(li);
	$("<input type=\"text\" name=\"mc\" />").appendTo(li);
	li=$("<li />").appendTo(ul);
	$("<span />").text(l_bi.ZuShu).appendTo(li);
	$("<input type=\"text\" name=\"mc\" />").appendTo(li);
	li=$("<li />").appendTo(ul);
	$("<span />").text(l_bi.history).appendTo(li);
	$("<input type=\"text\" name=\"mc\" />").appendTo(li);
	li=$("<li />").appendTo(ul);
	$("<span />").text(l_bi.XianBingShi).appendTo(li);
	$("<input type=\"text\" name=\"mc\" />").appendTo(li);
	li=$("<li />").appendTo(ul);
	$("<span />").text(l_bi.homeHistory).appendTo(li);
	$("<input type=\"text\" name=\"mc\" />").appendTo(li);
	li=$("<li />").appendTo(ul);
	$("<span />").text(l_bi.drugHistory).appendTo(li);
	$("<input type=\"text\" name=\"mc\" />").appendTo(li);
	li=$("<li />").appendTo(ul);
	$("<span />").text(l_bi.yanjianCheak).appendTo(li);
	$("<input type=\"text\" name=\"mc\" />").appendTo(li);
	li=$("<li />").appendTo(ul);
	$("<span />").text(l_bi.moreCheak+"...").appendTo(li);
	$("<input type=\"text\" name=\"mc\" />").appendTo(li);
	advTag.oimsDialog({title:language.AdvSearch,width:400,height:300},function(){
		$(".right .list").text("");
		var t = $("<table />").css("width","100%").appendTo(".right .list");
		var th=$("<tr />").appendTo(t);
		$("<th />").text(language.Choice).appendTo(th);
		$("<th />").text(l_bi.BingLiHao).appendTo(th);
		$("<th />").text(l_bi.Name).appendTo(th);
		$("<th />").text(l_bi.Sex).appendTo(th);
		$("<th />").text(l_bi.birthday).appendTo(th);
		$("<th />").text(l_bi.sequence).appendTo(th);
		$("<th />").text(l_bi.diagnose).appendTo(th);
		var pl = patientListTestObj;
		var name = $("input:name=name").val();
		//alert(name);
		$.each(pl,function(i,d){
			
			if(category!=null && d.diagnosis.indexOf(category.category)==-1){
				return;
			}
			if(search!=null && search.length && d.diagnosis.indexOf(search)==-1 && d.name!=search && d.patientId!=search){
				return;
			}
			var tr=$("<tr />").appendTo(t);
			$("<input type=\"checkbox\" name=\"select\"/>").appendTo($("<td />").appendTo(tr));
			$("<td />").text(d.patientId).appendTo(tr);
			$("<td />").text(d.name).appendTo(tr);
			$("<td />").text(d.sex?l_bi.Male:l_bi.Female).appendTo(tr);
			$("<td />").text(d.birthday).appendTo(tr);
			$("<td />").text(d.count).appendTo(tr);
			$("<td />").text(d.diagnosis).appendTo(tr);
			(i+1)%2==0?tr.addClass("t1"):tr.addClass("t2");
			tr.hover(function(){
				$(this).addClass("t3");
			},function(){
				$(this).removeClass("t3");
			});
			tr.click(function(){
				var input = tr.children().first().children();
				var c=input.attr("checked");
				$("input:checked").removeAttr("checked");
				if(c!="checked"){
					input.attr("checked","checked");
					cp = d;
				}else{
					input.removeAttr("checked");
					cp = null;
				}
			});
		});
	});
}

/*function showPatientListByCategory(category,search) {
	$(".right .list").text("");
	var t = $("<table />").css("width","100%").appendTo(".right .list");
	var th=$("<tr />").appendTo(t);
	
	$("<th />").text(language.Choice).appendTo(th);
	$("<th />").text(l_bi.BingLiHao).appendTo(th);
	$("<th />").text(l_bi.Name).appendTo(th);
	$("<th />").text(l_bi.Sex).appendTo(th);
	$("<th />").text(l_bi.birthday).appendTo(th);
	$("<th />").text(l_bi.sequence).appendTo(th);
	$("<th />").text(l_bi.diagnose).appendTo(th);
	var pl = patientListTestObj;
	$.each(pl,function(i,d){
		if(category!=null && d.diagnosis.indexOf(category.category)==-1){
			return;
		}
		if(search!=null && search.length && d.diagnosis.indexOf(search)==-1 && d.name!=search && d.patientId!=search){
			return;
		}
		var tr=$("<tr />").appendTo(t);
		$("<input type=\"checkbox\" name=\"select\"/>").appendTo($("<td />").appendTo(tr));
		$("<td />").text(d.patientId).appendTo(tr);
		$("<td />").text(d.name).appendTo(tr);
		$("<td />").text(d.sex?l_bi.Male:l_bi.Female).appendTo(tr);
		$("<td />").text(d.birthday).appendTo(tr);
		$("<td />").text(d.count).appendTo(tr);
		$("<td />").text(d.diagnosis).appendTo(tr);
		(i+1)%2==0?tr.addClass("t1"):tr.addClass("t2");
		tr.hover(function(){
			$(this).addClass("t3");
		},function(){
			$(this).removeClass("t3");
		});
		tr.click(function(){
			var input = tr.children().first().children();
			var c=input.attr("checked");
			$("input:checked").removeAttr("checked");
			if(c!="checked"){
				input.attr("checked","checked");
				cp = d;
			}else{
				input.removeAttr("checked");
				cp = null;
			}
		});
	});
}*/

function showCurrentPatient(cp){
	if(cp==null){
		alert(l_bi.choiseHz);
		return;
	}
//	showTitle(l_bi.BingLiSee);
//	pageTitle="病例";
	
	importJS('/js/manager/emr/doctorManager.js');
	importJS('/js/manager/emr/doctor.common.js');
	importJS('/js/manager/emr/doctor.variable.js');
	importJS('/js/manager/emr/doctor.selection.js');
	importJS('/js/manager/emr/admission/doctor.diagnosis.js');
	importJS('/js/manager/emr/patientList/doctor.patientlist.js');
	importJS('/js/manager/emr/admission/doctor.compare.js');
	importJS('/js/manager/emr/jatoolsPrinter.js');
	importCSS("/css/doctorWorkstation.css");
	importCSS("/css/doctor.css");
	importCSS('/js/manager/emr/css/emr.css');
	importCSS('/js/manager/emr/css/selection.css');

	$('body').removeData('patient');
	
//	importJS('/jquery_ui/js/jquery-ui-1.10.2.custom.min.js');
//	importJS('/easyui/plugins/jquery.parser.js');
//	importJS("/easyui/plugins/jquery.draggable.js");
//	importJS("/easyui/plugins/jquery.droppable.js");
//	importJS("/easyui/plugins/jquery.tree.js");
//	importJS('/easyui/plugins/jquery.panel.js');
//	importJS('/easyui/plugins/jquery.resizable.js');
//	importJS('/easyui/plugins/jquery.pagination.js');
//	importJS('/easyui/plugins/jquery.linkbutton.js');
//	importJS('/easyui/plugins/jquery.datagrid.js');
//	importJS('/easyui/plugins/jquery.tooltip.js');
//	importJS('/easyui/plugins/jquery.validatebox.js');
//	importJS('/easyui/plugins/jquery.combo.js');
//	importJS('/easyui/plugins/jquery.combobox.js');
//	importJS('/easyui/plugins/jquery.menu.js');
//	importJS('/easyui/plugins/jquery.numberbox.js');
//	importJS('/easyui/plugins/jquery.spinner.js');
//	importJS('/easyui/plugins/jquery.numberspinner.js');
//	importJS('/easyui/locale/easyui-lang-zh_CN.js');
//	importCSS('/jquery_ui/css/start/jquery-ui-1.10.2.custom.min.css');
//	importCSS('/easyui/themes/default/panel.css');
//	importCSS('/easyui/themes/default/datagrid.css');
//	importCSS('/easyui/themes/default/combo.css');
//	importCSS('/easyui/themes/default/combobox.css');
//	importCSS('/easyui/themes/default/menu.css');
//	importCSS('/easyui/themes/default/tree.css');
//	importCSS('/easyui/themes/default/numberbox.css');
//	importCSS('/easyui/themes/default/validatebox.css');
//	importCSS('/easyui/themes/default/spinner.css');
//	importCSS("/easyui/themes/icon.css");
//	importCSS('/easyui/themes/default/linkbutton.css');
//	importCSS('/easyui/themes/default/pagination.css');
//	importCSS('/easyui/themes/default/tooltip.css');

//	$.extend($.fn.datagrid.defaults.editors, {    
//	    numberspinner: {    
//	        init: function(container, options){    
//	            var input = $('<input type="text">').appendTo(container);    
//	            return input.numberspinner(options);    
//	        },    
//	        destroy: function(target){    
//	            $(target).numberspinner('destroy');    
//	        },    
//	        getValue: function(target){    
//	            return $(target).numberspinner('getValue');    
//	        },    
//	        setValue: function(target, value){    
//	            $(target).numberspinner('setValue',value);    
//	        },    
//	        resize: function(target, width){    
//	            $(target).numberspinner('resize',width);    
//	        }    
//	    }    
//	});
	
	init();
	/**加载医生工作站界面*/
	_emr_container = $(getHtmlContent('emrcontainer')).appendTo('.right');
	_emr_container.height($('.right').height()-$('.title').outerHeight()-8);
	_emr_container.width(window.screen.width-$('.left').outerWidth()-4);
	$('.title').width(_emr_container.outerWidth()-10-2);
	/**加载 患者信息和按钮*/
	_bingli_initPatientInfo($('.toolbar'));
	
	function _bingli_initPatientInfo(container){
		var html = $(getHtmlContent('infoandtool'));
		html.appendTo(container);
		getPatientInfo(cp.patientId);
		function getPatientInfo(patientId){
			var _bingli_getpatientinfo_url='/publish/bingli/getpatientinfo.htm';
			var param = {patientId:patientId,tag:Math.random()};
			var data = getJSONData(_bingli_getpatientinfo_url,param,'POST');
			if(data){//存在待接诊患者
				//设置患者头像图片
				data.photourl = data.photourl||(data.xingbie ? _emr_patientdefaultphoto_male_url:_emr_patientdefaultphoto_female_url);
				initPatientBase(html,data);
				$('body').data('patient',data);//将患者信息绑定到body中
			}
		}
		/**初始化患者基本信息*/
		function initPatientBase(html,data){
			$('td span:eq(0)',html).text(data.visit[0].serialNo?data.visit[0].serialNo:"");
			$('td span:eq(1)',html).text(data.binglihao);
			$('td span:eq(2)',html).text(data.xingming);
			$('td span:eq(3)',html).text(data.xingbie ? '男':'女');
			$('td span:eq(4)',html).text(_emr_calculteAge(data.shengri)+'岁');
			$('td span:eq(5)',html).text(data.charge_type);
			if(data.shouji){
				$('#mobile',html).attr('readonly','readonly').val(data.shouji);
			}else{
				$('#mobile',html).removeAttr('readonly').val('').bind('blur',function(){
					var mobile = $(this).val();
					if(mobile)
						data.shouji = getJSONData(_emr_updatemobile,{patientId:data.id,mobile:mobile,tag:Math.random()},'POST').obj;
				});
			}
			var img = $('th img:eq(0)',html).attr({src:'..'+data.photourl});
//			img.unbind('mouseover');
//			img.mouseover(function(){
//				if(!patientInfo){
//					patientInfo = $(getHtmlContent('patientInfo'));
//					var left = $(this).position().left+$(this).width();
//					var top = $(this).position().top;
//					_emr_setPatientDetailInfo(patientInfo,$('body').data('patient'));
//					patientInfo.css({position:'absolute',left:left,top:top}).appendTo('#emrContainer');
//					$('body').data('patientId',$('body').data('patient').id);
//				}else{
//					if($('body').data('patientId')!=$('body').data('patient').id){
//						_emr_setPatientDetailInfo(patientInfo,$('body').data('patient'));
//						$('body').data('patientId',$('body').data('patient').id);
//					}
//					patientInfo.show();
//				}
//			});
//			img.unbind('mouseout');
//			img.mouseout(function(){
//				if(patientInfo){
//					patientInfo.hide();
//				}
//			});
		}

	}
	
	/**加载工作区域*/
	$('#mainpanel').addClass('mainpanel');
	$('#mainpanel').height(_emr_container.height()-_emr_container.find('.toolbar').outerHeight()-5);
	$('#mainpanel').width(_emr_container.width());
	/**创建就诊记录滑块*/
	var showrecords = $('<div id="showrecords" class="records" />').appendTo('#mainpanel');
	var a_record=$('<a id="jzRecord" class="hiden_a"><label class="hiden_a_label">就诊记录<span style="color:blue; display:block"> 5 </span>次</label></a>').appendTo(showrecords);
	var a_hospitalRecord=$('<a id="hospitalRecord" class="hiden_a"><label class="hiden_a_label">住院病历<span style="color:blue; display:block"> 5 </span>次</label></a>').appendTo(showrecords);
	var a_oldVisitRecord=$('<a id="oldVisitRecord" class="hiden_a"><label class="hiden_a_label">原系统既往病历<span style="color:blue; display:block"> 5 </span>次</label></a>').appendTo(showrecords);
	var patient=$('body').data('patient');
//	$('<table style="width:100%;height:100%;border-collapse: collapse;"><tr><td>就诊记录</td></tr></table>').appendTo(showrecords);
	showrecords.width(26);
	showrecords.attr('title','点击显示历史记录');
	showrecords.height($('#mainpanel').height()-1);
	a_record.click(_emr_showRecordList);
	a_hospitalRecord.click(function(){
		importJS("/emr/js/zhuYuanBingLi.js");
		showQYBL(patient.binglihao);
	});
	a_oldVisitRecord.click(function(){
		showMenZhenBingPage(patient.binglihao,patient.xingming,patient.xingbie?'男':'女',patient.jtdz,patient.shouji);
	});
	var getZhuYuanPatient_url = "/publish/emr/getZhuYuanPatient.htm";
	var getZhuYuanPatient_data = getJSONData(getZhuYuanPatient_url,{binglihao:patient.binglihao,tag : Math.random()},"POST");
	if(getZhuYuanPatient_data.state&&getZhuYuanPatient_data.obj!=null){
		$("#hospitalRecord span").text(getZhuYuanPatient_data.obj.length)
	}else{
		$("#hospitalRecord span").text(0);
	}
	var jiwangbingli_url='/publish/emr/getJiWangMenZhenBingLi.htm';
	$("#oldVisitRecord span").text("?");
	$.ajax({
		url : contextPath + jiwangbingli_url,
		data : {patientId:patient.binglihao,tag : Math.random()},
		type : "POST",
		dataType : 'json',
		success : function(data) {
			var menZhenBingLi_data = data;
			if(menZhenBingLi_data.state && menZhenBingLi_data.obj!=null){
				$("#oldVisitRecord span").text(menZhenBingLi_data.obj.length);
			}
		}
	});
	
	var getZhuYuanPatient_url = "/publish/emr/getZhuYuanPatient.htm";
	$("#hospitalRecord span").text("?");
	//debugger;
	$.ajax({
		url : contextPath + getZhuYuanPatient_url,
		data : {patientId:patient.binglihao,tag : Math.random()},
		async : true,
		type : "POST",
		dataType : 'json',
		success : function(data) {
			if(data.state && data.obj!=null){
				$("#hospitalRecord span").text(data.obj.length);
			}
		}
	});
	
	/**加载历史就诊记录列表*/
	var recordlist = $(getHtmlContent('recordlist')).appendTo('#mainpanel');
	recordlist.height(showrecords.height());
	var vChild = $('#jzlistdiv').children();
	$(vChild[2]).height($('#jzlistdiv').height()-$(vChild[0]).outerHeight()-$(vChild[1]).outerHeight()-$(vChild[3]).outerHeight());
	_emr_mousescroll($(vChild[2]),$(vChild[2]).children(),66);
	//用于区分区分是否应该显示不可编辑状态
	_emr_createRecords("bl");
	showrecords.children('a:eq(0)').find('span').text($('#recordlist ul').children().length);
	/**创建主要工作区域：包括选项卡和选项卡面板*/
	var main = $('<div id="main"/>').addClass('main').appendTo('#mainpanel');
	main.width($('#mainpanel').width()-showrecords.width()-2);
	main.height($('#mainpanel').height()-1);
	if($('#recordlist ul').find('li').length){
		$('#recordlist ul').find('li:eq(0)').click();//显示主要界面
	}
	else{
		a_oldVisitRecord.click();
	}
	$('#compare').unbind('click').bind('click',function(){
		_emr_recordCompare();
	});
}


/* -----------------------------e--------------------------------------------**/

function addHeadler_bl_luke() {
	$(".search").click(doctorSearchHeandler) ;	
	$(".search").click() ;
	$("#export").click(exportEXL) ;
	$("#bi_view").click(showCurrentPatient_bl) ;
	$("#exportPhoto").click(exportPhoto);
} ;
//病例导出
function exportEXL(){
	var pt = proTool() ;
	var table=$("div.list").children("table");
	var patient_id_arys=[];
	var arys=getCheckBoxValue();
	var patient_id_arys="";
	$.each(arys,function(i,n){
		patient_id_arys+=this.binglihao;
		if(i!=arys.length-1){
			patient_id_arys+=",";
		}
	});
	if(!arys.length){
		$.oimsAlert("请至少选择一个导出患者");
		return;
	}
	pt.proDown(contextPath+contorller_findExport,{patient_ids:patient_id_arys}) ;
	var w = $(".title").width()-$(".categoryTree").width()-10 ;
	$(".list").parent().width(w) ;
} ;
function exportPhoto(){

	var pt = proTool() ;
	var table=$("div.list").children("table");
	var patient_id_arys=[];
	var arys=getCheckBoxValue();
	var patient_id_arys="";
	$.each(arys,function(i,n){
		patient_id_arys+=this.binglihao;
		if(i!=arys.length-1){
			patient_id_arys+=",";
		}
	});
	if(!arys.length){
		$.oimsAlert("请至少选择一个导出患者");
		return;
	}
	$.ajax({
		url : contextPath + photo_pdf_movie_export,
		data :{patient_id_arys:patient_id_arys},
		async : false,
		type : 'POST',
		dataType : 'json',
		success : function(data) {
			if(data.obj!="/BingLi\\")
				location.href = contextPath + data.obj;
		}
	});
	var w = $(".title").width()-$(".categoryTree").width()-10 ;
	$(".list").parent().width(w) ;

}
function  doc_listSet(){
	return {
        listObj : [
                   {
                       title :l_bi.BingLiHao,
                       key :"binglihao"
                   },
                   {
                       title :l_bi.Name,
                       key :"xingming"
                   },
                   {
                       title :l_bi.Sex,
                       key :"xingbie",
                       func:function(v){return (v)?l_bi.Male:l_bi.Female;}
                   },{
                       title :l_bi.birthday,
                       key :"shengri",
                       func:function(v){
                    	   return formatDate(v.time);
                       }
                   },{
                       title :l_bi.sequence,
                       key :"cs"
                   },{
                	   title :l_bi.MobilePhone,
                	   key :"shouji"
                   },{
                	   title :"接诊医生",
                	   key:"doctor"
                   },
                   {
                       title :l_bi.diagnose,
                       key :"disease",
                       func:function(value){
                    	   var disease="";
                    	   $.each(value,function(i,n){
                    		   disease+=this.jibing;
                    		   if(i!=(value.length-1)){
                    			   disease+=";";
                    		   }
                    	   });
                    	   return disease;
                       }
                   }
               ],
//               url :contextPath+contorller_findJz,
               method:"post",
               checkbox:true,
               single:false,
               data : {// data表示传的参数
                   currentPage : 1,
                   pageSize : getPageSize(),// Page类的方法
                   tag : Math.random()
               }
           };
} ;


function doctorSearchHeandler(){
	var list = $(".list").empty() ;
	var search = $("#search").val() ;
	search = search==l_bi.InputBlhOrZhenDuanOrXm?"":search ;
	var list_set = doc_listSet() ;
	$.extend(list_set,{url:(contextPath+contorller_findJz)}) ;
	$.extend(list_set.data,{search:search}) ;
	try{
		list.createPageList(list_set) ;
	}catch (e) {
		$.oimsAlert(l_bi.noDate) ;
	}
} ;



function showPatientListByCategory(category,search){
	if(category==null)return ;
	var list = $(".list") ;
	var list_set = doc_listSet() ;
	$.extend(list_set,{url:(contextPath+contorller_findJz)}) ;
	$.extend(list_set.data,{category:category.id}) ;
	try{
		list.createPageList(list_set) ;
	}catch (e) {
		$.oimsAlert(l_bi.noDate) ;
	}
} ;

function findBingliEx(){
	if($('#seniorSearch')[0]!=undefined)
		return ;
	var seniorSearchTemplate = findBingliExForm();
	
	$(".advquery").attr("id","advquery") ;
	//$(seniorSearchTemplate).oimsDialog({winType:4,icon:"advsearch",title:"高级查询",drag:true,locked:false,width:"880",height:"250"});
	$.oimsBox({
		parentDiv:"advquery",//将生成内容添加的id
		divContent : seniorSearchTemplate//需要添加的内容
	});
	calendarFun("zcrqStart") ;
    calendarFun("zcrqEnd",-140) ;

} ;
//高级查询
function seniorSearchSubmit_bi_luke(){
	   var pm = {} ;
		$.extend(pm,{xingming:$("#xingming").val()}) ;
		if(isNaN($("#shengriStart").val())||(!isNaN($("#shengriStart").val())&&$("#shengriStart").val()<0)){
			$.oimsAlert("开始年龄必须为正整数");
			return ;
		}
		if(isNaN($("#shengriEnd").val())||(!isNaN($("#shengriEnd").val())&&$("#shengriEnd").val()<0)){
			$.oimsAlert("结束年龄必须为正整数");
			return ;
		}
		$.extend(pm,{shengriStart:$("#shengriStart").val()}) ;
		$.extend(pm,{shengriEnd:$("#shengriEnd").val()}) ;
		$.extend(pm,{zcrqStart:$("#zcrqStart").val()}) ;
		$.extend(pm,{zcrqEnd:$("#zcrqEnd").val()}) ;
		$.extend(pm,{diqu:$("#diqu").val()}) ;
		$.extend(pm,{sfzh:$("#sfzh").val()}) ;
		$.extend(pm,{shouji:$("#shouji").val()}) ;
		$.extend(pm,{dianhua:$("#dianhua").val()}) ;
		$.extend(pm,{dwdh:$("#dwdh").val()}) ;
		$.extend(pm,{hzlxr:$("#hzlxr").val()}) ;
		$.extend(pm,{hzlxrdh:$("#hzlxrdh").val()}) ;
		$.extend(pm,{jtdz:$("#jtdz").val()}) ;
		$.extend(pm,{xingbie:checkboxVales("xingbie")}) ;
		$.extend(pm,{yibao:checkboxVales("yibao")}) ;
		$.extend(pm,{laiyuan:checkboxVales("laiyuan")}) ;
		$.extend(pm,{bingZhongId:$("#bingZhongId option:selected").val()});
		$.extend(pm,{bingLiKey:$("#bingLiKey").val()}) ;
		$.extend(pm,{jbbm:$("#jbbm").val()}) ;
		$.extend(pm,{fzys:$("#fzys").val()}) ;
		$.extend(pm,{zhenduan:$("#zhenduan").val()});
		$.extend(pm,{chufang:$("#chufang").val()});
		$.extend(pm,{jcxm:$("#jcxm").val()});
		var listFactor = doc_listSet() ;
		$.extend(listFactor.data,pm);
		$.extend(listFactor,{url:contextPath+contorller_findJz});
		$(".list").createPageList(listFactor);
		
//		$("#seniorSearch").parent().parent().remove() ;  //点提交，关闭高级查询
};
function seniorSearchReset_bingli(){
    $("#xingming").val("");
	$("#shouji").val("");
	$("#dianhua").val("");
	$("#sfzh").val("");
	$("#gzdw").val("");
	$("#dwdz").val("");
	$("#dwyb").val("");
	$("#dwdh").val("");
	$("#diqu").val("");
	$("#jtdz").val("");
    $("#hzlxr").val("");
    $("#hzlxrdh").val("");
	$("#youbian").val("");
	$("#beizhu").val("");
	//$("#bingZhongId").val("");
	$("#bingLiKey").val("");
	$("#jbbm").val("");
	$("#zcrqStart").val("");
	$("#zcrqEnd").val("");
	$("#shengriStart").val("");
	$("#shengriEnd").val("");
	$("#fzys").val("");
	$("#zhenduan").val("");
} ;
function checkboxVales(name,f){
	if(f==undefined) f = document ;
	var tmp = $("input[name='"+name+"'][checked='true']") ;
	var es = $("input[name='"+name+"']") ;
	var rt = "" ;
	$.each(es,function(i,v){
		if(v==undefined) return ;
		if($(v).attr("checked")){
			if(rt=="")
				rt+=$(v).val() ;
			else
				rt+=","+$(v).val() ;
		}
	}) ;
   return rt ;
} ;

function findBingliExForm(){
	var rt = "<table width='100%' cellspacing='0' cellpadding='0' border='0'>" +
				" <tr>" +
					"<td width='7%' nowrap='nowrap' align='right'>"+l_bi.Name+"：</td>" +
					"<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='xingming' name='xingming'>" +
					"</td>" +
					"<td width='7%' nowrap='nowrap' align='right'>"+l_bi.Sex+"：</td>" +
					"<td width='18%'><input type='checkbox' name='xingbie' id='xingbie' value='1' class = 'c_r_class' />"+l_bi.Male+"<input type='checkbox' name='xingbie' id='xingbie' class = 'c_r_class' value='0'/>"+l_bi.Female+"</td>" +
					"<td width='7%' nowrap='nowrap' align='right'> "+l_bi.SsDq+"：</td>" +
					"<td width='15%' id='ssdq_c'></td>" +
					"<td  nowrap='' align='right'>就诊时间：</td>" +
			        "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='zcrqStart' name='zcrqStart'>" +
			        "</td>" +
			        "<td  nowrap='nowrap' align='right'>"+l_bi.zhi+"</td>" +
			        "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='zcrqEnd' name='zcrqEnd'>" +
			        "</td>" +
                 "</tr>" +
                 " <tr>" +
 					"<td width='7%' nowrap='nowrap' align='right'>"+l_bi.MobilePhone+"：</td>" +
 					"<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='shouji' name='shouji'>" +
 					"</td>" +
 					"<td width='7%' nowrap='nowrap' align='right'>"+l_bi.isYiBao+"：</td>" +
 					"<td width='18%'><input type='checkbox' name='yibao' class = 'c_r_class'  id='idSYiBao' value='1'/>"+l_bi.has+"<input type='checkbox' name='yibao' class = 'c_r_class' id='idNYiBao' value='0'/>"+l_bi.noHas+"</td>" +
 					"<td width='7%' nowrap='nowrap' align='right'> "+l_bi.TeleNum+"：</td>" +
 					"<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='dianhua' name='dianhua'></td>" +
 					"<td  nowrap='' align='right'>"+l_bi.HzAge+"：</td>" +
 			        "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='shengriStart' name='shengriStart'>" +
 			        "</td>" +
 			        "<td  nowrap='nowrap' align='right'>"+l_bi.zhi+"</td>" +
 			        "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='shengriEnd' name='shengriEnd'>" +
 			        "</td>" +
 			        "</tr>" +
			       " <tr>" +
					"<td width='7%' nowrap='nowrap' align='right'>"+l_bi.DwTel+"：</td>" +
					"<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='dwdh' name='dwdh'>" +
					"</td>" +
					"<td width='7%' nowrap='nowrap' align='right'>"+l_bi.Lxr+"：</td>" +
					"<td width='18%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='hzlxr' name='hzlxr'></td>" +
 					"<td width='7%' nowrap='nowrap' align='right'> "+l_bi.JinJiTel+"：</td>" +
					"<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='hzlxrdh' name='hzlxrdh'></td>" +
					"<td  nowrap='' align='right'>"+l_bi.Sfzh+"：</td>" +
			        "<td colspan=3><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='sfzh' name='sfzh'>" +
			        "</td>" +
			        "</tr>" +
                 " <tr>" +
 					"<td width='7%' nowrap='nowrap' align='right'>"+l_bi.HzSource+"：</td>" +
 					"<td align='left' colspan=3 id='laiyuans'></td>" +
 					"<td width='7%' nowrap='nowrap' align='right'>"+"诊断"+"：</td>" +
 				   "<td colspan=2><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='zhenduan' name='zhenduan'>" +
 					"<td  nowrap='nowrap' align='right'>"+l_bi.Jtdz+"：</td>" +
 			        "<td colspan=2><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='jtdz' name='jtdz'>" +
 			        "</td>" +
                 "</tr>" +
		        "<tr>" +
			        //"<td nowrap='nowrap' aling='right'>"+l_bi.BzFenLei+"：</td>"+
			       // "<td width='15%'><select id='bingZhongId'><option value=''></option></select></td>"+
			        "<td  nowrap='' align='right'>"+l_bi.JiuZhenJiLu+"：</td>" +
			        "<td colspan=3><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" name='bingLiKey' id='bingLiKey'/>"+
			        "<td  nowrap='' align='right'>"+l_bi.illCode+"：</td>" +
			        "<td colspan=2><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" name='jbbm' id='jbbm'/>"+
			        "<td  nowrap='' align='right'>接诊医生：</td>" +
			        "<td colspan=2><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" name='fzys' id='fzys'/>"+
			      "</tr>"+
			      "<tr>"+
			        "<td  nowrap='' align='right'>药品：</td>" +
			        "<td ><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" name='chufang' id='chufang'/>"+
			        "<td  nowrap='' align='right'>检查项目：</td>" +
			        "<td ><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" name='jcxm' id='jcxm'/>"+
		        "</tr>" +

		      "</table>"+
	        " <div class='avdopenbutton' >" +
			" <a href='javascript:seniorSearchSubmit_bi_luke();'><span class='advsumit'></span>"+language.Submit+"</a>" +
			" <a href='javascript:seniorSearchReset_bingli();'><span class='advreset'></span>"+language.Reset+"</a>" +
			" <a id = 'closeId'><span class='close' ></span>"+language.Close+"</a>"+//注意这里的新添加的内容
			" </div> ";
	
	 var list = getJSONData("/publish/category/findCategorysByFatherId.htm",{fatherid:oimsCategory.HUANZHE_RESOURCES,tag:Math.random()},"post");
     var t = $(rt) ;
     $.each(list.obj,function(i,v){
    	 if(v==undefined) return ;
     	var ipt = "<input type='checkbox'  class = 'c_r_class' value='"+v.categoryid+"' name='laiyuan'>"+"&nbsp;"+v.category +"&nbsp;&nbsp;";
     	$("#laiyuans",t).append(ipt) ;
     }) ;
     
     list = getJSONData("/publish/category/findCategorysByFatherId.htm",{fatherid:oimsCategory.BINGZHONG,tag:Math.random()},"post");
     
     $.each(list.obj,function(i,v){
    	 if(v==undefined) return ;
     	var ipt = $("<option>").val(v.categoryid).text(v.category) ;
     	$("#bingZhongId",t).append(ipt) ;
     }) ;
//     <input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='diqu' name='diqu'>
//     var dq = $.auto({id:"diqu",name:'diqu',url:"diqu/findAllDiqu.htm",chg:{id:"id",text:"name",index1:"index1",index2:"index2"}}) ;
     $("#ssdq_c",t).append("<input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='diqu' name='diqu'>") ;
//     
	return t ;
} ;

function showCurrentPatient_bl(){
	
	if(cp==undefined)
		cp = {} ;
	var cp_ = utilTool().listSelectOne() ;
	var w = $(".title").width()-$(".categoryTree").width()-10 ;
	$(".list").parent().width(w) ;
	if(!cp_)
		return ;
//	$("#right").empty();
	$("#right").children("div:last").hide();
	cp.patientId = cp_.id ;
	cp.name = cp_.xingming ;
	cp.sex = cp_.xingbie ;
	cp.birthday = cp_.shengri ;
	cp.mobile = cp_.shouji ;
	showCurrentPatient(cp) ;
	$(".welcomebg").remove() ;
	
} ;






