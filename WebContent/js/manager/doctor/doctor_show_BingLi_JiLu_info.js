/*
 * 显示电子病历记录
 * 宋仁非
 * @param id 分类id
 */
function showThisMC(md, id) 
{
	//中间显示电子病历内容的区域
	var div = $(".mcChildTad");
	
	//快速定位导航图标
	var span = $(".mcTitleTag .edito");
	
	if (div.length>0) 
	{
		//清空电子病历显示区域
		div.text("");
	} 
	else 
	{
		div = $("<div />").addClass("mcChildTad")/*.css({
			"margin" : "8px",
			"border" : "1px solid #d2d2d2",
			"overflow" : "auto"
		})*/.addClass("emr_binglijilu01").appendTo(dws.mcTag);
		
		//设置高度
		div.height(dws.mcTag.height() - dws.mcTag.children().outerHeight()- 20);
	}
	
	//生成用来隐藏悬浮控件的div
	backGroundDiv();
	
	/*
	 * 判断是否是要显示诊断分类
	 */
	if(id==oimsCategory.DOCTOR_MANAGER_ZHENDUAN)//30005诊断分类id
	{
		
		var getSessionGongHaoUrl = "/publish/doctor/getSessionGongHaoUrl.htm";
		
		//获取当前登录医生的工号
		var gh = getJSONData(getSessionGongHaoUrl, {tag : Math.random()}).obj;
		
		//当就诊状态不为已完成  并且 本次就诊的负责医生为当前登录医生时
		//显示新增修改诊断界面
		if(md.state!=oimsCategory.VISITING_STATE_YIWANCHENG&&md.fzys==gh)
		{
			//加载诊断页面
			loadHtml(div,md,id);
		}
		else
		{
			//加载只读诊断页面
			loadReadOnlyHtml(div,md,id);
		}	
		
		
		//去掉快速定位分类导航
		span.remove();
	}
	
	/*
	 * 判断是否是要显示处方页面
	 */
	else if (id == oimsCategory.DOCTOR_MANAGER_CHUFANG)//30006 处方
	{
		var getSessionGongHaoUrl = "/publish/doctor/getSessionGongHaoUrl.htm";
		//获取当前登录医生的工号
		var gh = getJSONData(getSessionGongHaoUrl, {tag : Math.random()}).obj;
		
		//当就诊状态不为已完成  并且 本次就诊的负责医生为当前登录医生时
		//显示处方开药界面
		if(md.state!=oimsCategory.VISITING_STATE_YIWANCHENG&&md.fzys==gh)
		{
			//加载处方开药页面
			show_chufang(div,md,id);
		}
		else
		{
			//加载只读处方开药页面
			loadReadOnly_chufang_Html(div,md,id);
		}	
		
		
		//去掉快速定位分类导航
		span.remove();
	}	
	else
	{
		//id 父分类id
		
		var getMedicalRecordCategoryUrl = "/publish/doctor/getMedicalRecordCategory.htm";
		
		//电子病历分类的子类信息
		var categories = getJSONData(getMedicalRecordCategoryUrl, {id : id}).obj;
		
		//console.log("病历记录分类的子类信息");
		//console.log(categories);
		
		// 如果没有子分类则直接显示记录内容
		if (!categories.length) 
		{
			//去掉快速定位分类导航
			span.remove();
			
			var getCategoryByIdUrl = "/publish/doctor/getCategoryById.htm";
			//该病历记录分类中没有子类-直接显示信息
			var cate_o = getJSONData(getCategoryByIdUrl, {id : id}).obj;
			
			//console.log("该病历记录分类中没有子类-直接显示信息");
			//console.log(cate_o);
			
			//显示记录内容
			showMC(div, md, cate_o);
			
			return false;
		}
		
	    
		//保存快速定位分类导航数据的DIV
	    var menuDiv = $(".MCmenuDiv");
	    
	    //如果存在保存快速定位导航数据的div则删除
	    if(menuDiv.length>0)
	    {
	    	menuDiv.remove();
	    }	
	    //创建保存快速定位导航数据的div
	    menuDiv = $("<div />").addClass("MCmenuDiv").appendTo("body");
	    
	    //如果存在快速定位的导航图标  则删除
	    if(span.length>0)
	    {
	    	span.remove();
	    }	
	    
	    
	    	
    	if($("body").innerWidth()>=1048)
    	{
    		
    		//生成快速定位的导航图标
    		span = $("<span />").addClass("edito").addClass("emr_quickMenudiv")
    							/*.css("margin-right", "2px")
    							.css("margin-bottom", "8px")*/
    							.appendTo(".mcTag .mcTitleTag");
    		
    		//设置快速导航数据div的位置
    		menuDiv.css({
    			top : span.parent().offset().top + span.parent().height(),
    			left : span.offset().left
    		}).hide();
    		
    	}	
	    	
	   
	    
    	menuDiv.hide();
	    
		
		span.click(function(){
			
			menuDiv.toggle("fast", function(){
				
				setMenuHeight(menuDiv);
				
			});
			
			$(".MCmenuBgDiv").toggle();
			
		});
		
		
		
		//给快速导航数据div赋值	同时  在电子病历显示区域显示子分类页面结构
		$.each(categories, function(i, d){
			
			$("<a />").attr("href", "#mc" + d.id)
					  .text(d.category)		//子分类名称
					  .appendTo(menuDiv)
					  .click(function() {
						  
						menuDiv.hide("fast"); //快速导航隐藏
						$(".MCmenuBgDiv").hide();  //功能背景层隐藏
						return true;
					  });
			
			//子分类标题栏
			var div_mx = $("<div />").appendTo(div)
									 .attr("id","mx_"+d.id);
			
			var t = $("<h3 />").attr("id","ch_"+d.id)
							   .text(d.category)
							   .appendTo(div_mx);
			
			//锚
			$("<a />").attr("name", "mc" + d.id).prependTo(t);
			
			if (i > 0)
			{
				//t.css("border-top", "1px solid #d2d2d2");
				t.addClass("emr_quickMenudiv01");
			}
			//显示记录内容
			showMC(div_mx, md, d);
		});
		
		//console.log($(".mcChildTad textarea")[0].value);
		//console.log($(".mcChildTad textarea").length);
		
		
		//将非空的项目排在前边，并同时调整快速切换功能的排列顺序
		if($(".mcChildTad textarea").length>0)
		{
			
			for(var i = 0 ; i < $(".mcChildTad textarea").length ; i++)
			{
				if($(".mcChildTad textarea")[i].value!=null&&$(".mcChildTad textarea")[i].value!="")
				{
					var yd = $($(".mcChildTad textarea")[i]).parent().parent().prependTo($(".mcChildTad"));
					var id_v = yd.attr("id");
					
					id_v = id_v.toString();
					id_v = id_v.substring(3,id_v.length);
					
					var href = "#mc"+id_v;
					
					$(".MCmenuDiv a[href = "+href+"]").prependTo($(".MCmenuDiv"));
					
				}	
			}	
		}
		else if($(".mcChildTad p").length>0)
		{
			
			for(var i = 0 ; i < $(".mcChildTad p").length ; i++)
			{
				
				if($($(".mcChildTad p")[i]).text()!=null&&$($(".mcChildTad p")[i]).text()!="")
				{
					var yd = $($(".mcChildTad p")[i]).parent().prependTo($(".mcChildTad"));
					var id_v = yd.attr("id");
					
					id_v = id_v.toString();
					id_v = id_v.substring(3,id_v.length);
					
					var href = "#mc"+id_v;
					
					$(".MCmenuDiv a[href = "+href+"]").prependTo($(".MCmenuDiv"));
					
				}	
			}	
		}	
		
		//等比缩放输入框高度
		var category_count = categories.length;//获取子分类数量
		var mcChildTad_height = $(".mcChildTad").height();
		var keyong_height = mcChildTad_height - category_count*28;
		var dengbi_height = keyong_height/category_count;
		
		if(dengbi_height>70)
		{	
			DianZiShuRu_P = dengbi_height;
		}
		/*//cs("项目数量！");
		//cs(category_count);
		
		//cs("总体高度！");
		//cs(mcChildTad_height);
		
		//cs("可分配高度！");
		//cs(keyong_height);
		
		//cs("平均分配高度！");
		//cs(dengbi_height);*/
		
		var category_p = $(".mcChildTad p");
		var category_form = $(".mcChildTad form");
		var category_textarea = $(".mcChildTad textarea");
		
		if(keyong_height>category_count*70)
		{
			$.each(category_p, function(i, d){
				$(d).attr("style","height:"+dengbi_height+"px;");
			});
			
			$.each(category_form, function(i, d){
				$(d).attr("style","height:"+dengbi_height+"px;");
			});
			
			$.each(category_textarea, function(i, d){
				$(d).attr("style","width: 99.6%;height:"+(dengbi_height-2)+"px;");
			});
		};	
	
	};
}

//设置快速导航div的高度
function setMenuHeight(menuDiv) 
{
	
	if (menuDiv.offset().top + menuDiv.outerHeight() > $(window).height()) 
	{
		menuDiv.css("overflow", "auto")
			   .height($(window).height() - menuDiv.offset().top - 20);
	}
}

/**
 * 显示记录内容
 * 
 * @param tag   $(".mcChildTad");
 * @param md
 *              md.id 就诊id
 * @param category    分类id
 * 宋仁非
 */
function showMC(tag, md, category) 
{
	var r = null;
	
	var getMCUrl = "/publish/doctor/getMC.htm";
		
	//获取该分类下的就诊记录内容
	r = getJSONData(getMCUrl, {
		id : md.id,                //就诊id
		categoryId : category.id,  //分类id
		tag : Math.random()
	}).obj;
	
	//生成记录内容段落并拼接到 $(".mcChildTad");
	var hei = 70;
	
	if(DianZiShuRu_P>hei)
	{
		hei = DianZiShuRu_P;
	}	
	//设置高度，填充记录内容
	var p = $("<p />").text($.trim(r.jilu)).height(hei).appendTo(tag);
	
	
	if(r.picPath!=null&&r.picPath!="")
	{
		//显示“图示”图标
		showHuaTu(r.id,category.id,r.picPath);
	}	
	
	var getSessionGongHaoUrl = "/publish/doctor/getSessionGongHaoUrl.htm";
	
	//获取当前登录医生的工号
	var gh = getJSONData(getSessionGongHaoUrl, {tag : Math.random()}).obj;
	
	//如果当前就诊状态为待诊或复诊  则允许输入、修改就诊记录
	if (md.state != oimsCategory.VISITING_STATE_YIWANCHENG && md.fzys==gh) 
	{
		p.click(function(){
			//输入并保存电子病历记录
			inputMC(p, md, category, r);
			
		});
		p.click();
	}
	
}


/**
 * 输入并保存电子病历记录
 * 
 * @param p   "<p>"段落容器
 * @param md  就诊信息
 * @param category  记录分类
 * 宋仁非
 */
function inputMC(p, md, category, r) 
{
	
	
	//console.log("inputMC");
	//console.log(p.text());
	//console.log(md);
	//console.log(category);
	//console.log(r);
	
	/*  p.text()
	 * 
	 "双眼疼痛"
	*/
	
	/*    md
	 date: "2012-11-25"
	 doctor: "赵医生"
	 fzys: "10007"
	 hzid: 16
	 id: 15
	 state: 27
	 */
	
	/*    category
	 * 
	 category: "主述"
	 fatherid: 30001
	 id: 30100
	 intr: "主述"
	*/
	
	/*    r
	 * 
	 categoryId: 30100
	 id: 1920
	 jilu: "双眼疼痛"
     jiuzhenId: 15
     jlTime: null
     jlren: ""
     picPath: ""
    */
	
	//去掉绑定的click事件
	p.unbind("click");
	
	//获取段落的内容
	var v = p.text();
	//清空段落
	p.text("");
	
	var saveOrUpdateMCUrl = "/publish/doctor/saveOrUpdateMC.htm";
	
	//用form表单替换p段落
	p = $("<form />").attr("method", "post")
	                 .attr("action",contextPath + saveOrUpdateMCUrl)
	                 .height(p.height())
	                 .replaceAll(p);
	
	var inputId = $("<input />").attr("name", "id")
								.attr("type", "hidden")
								.appendTo(p);
	
	$("<input />").attr("name", "mdId")
				  .attr("type", "hidden")
				  .val(md.id)
				  .appendTo(p);
	
	$("<input />").attr("name", "categoryId")
				  .attr("type", "hidden")
				  .val(category.id)
				  .appendTo(p);
	
	var inputPath = $("<input />").attr("name", "path")
								  .attr("type", "hidden")
								  .val(r.picPath)
								  .appendTo(p);
	
	if (r!=null) 
	{
		inputId.val(r.id);
		inputPath.val(r.picPath);
	}
	
	var input = $("<textarea />").attr({"name":"val"/*,"style":"width: 99.6%;"*/})
								 .addClass("emr_binglijilutextarea")
							     .height(p.height())
							     .val(v)
			                     .appendTo(p);
	//可编辑文本域双击事件
	input.dblclick(function(e){ 
		
		//如果页面上已经存在快捷按钮则先删除
		if($(".MRDiv_BG_1").length>0 || $(".MRDiv_BG_2").length>0)
		{
			$(".MRDiv_BG_1").remove();
			$(".MRDiv_BG_2").remove();
		}	
		
		//将当前双击的input赋给全局变量
		CurrentInput = p ;
		
		//透明点击功能层
		$(".MCmenuBgDiv").show(); 
		
		//显示打开模板按钮
		var open_btn = $("<div />").css({top : e.clientY + "px",left : e.clientX + "px"})
					.addClass("MRDiv_BG_1")
					.appendTo("body");
		
		//绑定打开模板的点击事件
		$("<a />").addClass("MR_BT_Pen")
				  .appendTo(open_btn)
				  .click(function(){
					  
					  //显示模板信息div
					  showTemplate(open_btn , p);
					  //移除打开模板按钮
					  open_btn.remove();
				  });
		
		//如果该记录有画图底图  则显示画图按钮
		if(category.intr!="" && category.intr!=null && category.intr.length > 6)
		{
			if(flash_swfobject_flag==0)
			{	
				importJS("/js/jquery.swfobject.1-1-1.js");
				flash_swfobject_flag = 1 ;
			}
			
			open_btn.removeClass("MRDiv_BG_1").addClass("MRDiv_BG_2");
			
			$("<a />").addClass("MR_BT_Paint")
					  .appendTo(open_btn)
					  .click(function(){
						
						showPaintDialog();
						$(".MCmenuBgDiv").hide(); 
						open_btn.remove();
						
					});
		}	
		
	});
	
	//输入文本域失去焦点时自动保存
	input.blur(function(){
			saveBingLiJiLu(p);
	});
	
	//弹出画图窗口
	function showPaintDialog() 
	{
		var div = $("<div />").attr("style","padding:10px;").appendTo("body");
		paintWin = div.oimsDialog({
			title : language_doctor.Paint+"-"+category.category,
			width : 750,
			height : 350,
			locked : true,
			button : [ {
				title : language_doctor.Save,//"保存",
				func : paintSave,
				isCloseWin : false,
				className : "submit"
			} ]
		});
		showPaintNew(div);
	}
	
	//点击画图窗口保存按钮
	function paintSave()
	{
		if(category.intr.split(",").length==2)
		{
			getFLASHJSONData("paintSWF_OD");
			getFLASHJSONData("paintSWF_OS");
		}
		else
		{
			getFLASHJSONData("paintSWF");
		}
		
		function getFLASHJSONData(swdId)
		{
			$("#"+swdId+"_new").flash(function(){
				
				this.paintSave();
				
			});
		}
	}
	
	//显示画图窗口内容
	function showPaintNew(div)
	{
		var patientId =  md.hzid;         //患者ID
		var regId     =  md.id;           //就诊ID
		var mrId      =  r.id;            //记录ID
		var _url      =  category.intr.split(",");   //画图图片地址
		var photoType =  1;
		var paintSaveUrl = contextPath+"/publish/doctor/paintSave.htm";   //保存画图
		
		paintLength = _url.length;
		
		if(_url.length==2)
		{
			var ost=$("<div />").addClass("OSPaint")
								.addClass("emr_paintosod")
			                    //.attr("style","width:360px;height:242px ;float:left;margin-right:5px")
			                    .appendTo(div);
			
			var odt=$("<div />").addClass("ODPaint")
								.addClass("emr_paintosod")
			                    //.attr("style","width:360px;height:242px ;float:left;margin-left:5px")
			                    .appendTo(div);
			showSWF(_url[0],"OD",ost);
			showSWF(_url[1],"OS",odt);
		}
		else
		{
			showSWF(_url[0],null,odiv);
		}
		
		function showSWF(src,y,odiv)
		{
			var params = 
			    {
					allowScriptAccess : "sameDomain",
					quality:"high",
					wmode:"transparent"
				};
			var swfID="paintSWF";
			
			if(y!=null) {
				$("<a />").text(y).addClass("emr_paintfontsize")/*.attr("style","font-size: 12px;")*/.appendTo(odiv);
				swfID+= "_"+y;
			}
			$("<div />").attr("id",swfID+"_new").appendTo(odiv).flash({ 
		          swf: contextPath+'/swf/paint.swf?random='+Math.random(),
		          id: swfID,
		          width: 360,
		          height: 230,
		          flashvars: {		url : contextPath+src,
		        	  		 	   eyes : y,
		        	  		  patientId : patientId,
		        	  		      regId : regId,
		        	  		    saveUrl : paintSaveUrl,
		        	  		         id : mrId,
		        	  		  photoType : photoType,
		        	  	   callbackFunc : "paintCallback"
		        	  		 },
		          paremeters: params
		     });
		}
	}
	
	
	
	
	function showTemplate(open_btn,p_form)
	{
		var url = "/publish/doctor/getShuruMoBan.htm";
		
		var moban = getJSONData(url, {categoryId : category.id,tag : Math.random()}).obj;
		
		//cs("模板数据");
		//cs(moban);
		/*
		 * 模板数据  moban
			0: Object
				index: "1"
				val: "注意休息"
			1: Object
				index: "2"
				val: "少看电视"
			2: Object
			3: Object
		 */
		
		//模板div
		var div = $("<div />").css({
									top : open_btn.position().top,
									left : open_btn.position().left
								  })
							  .addClass("inputTemplateList")
							  .appendTo("body");
		//标题div
		var title = $("<div />").addClass("oims_title").appendTo(div);
		
		//模板列表div
		var tag = $("<div />").appendTo(div);
		
		//标题赋值
		title.text(category.category);
		
		//关闭按钮
		$("<span />").text("")
					 .appendTo(title)
					 .click(function(){
						 //关闭输入模板div
						 div.hide("fast", function(){ div.remove();});
						 $(".MCmenuBgDiv").hide(); 
						 //保存输入的就诊记录
						 saveBingLiJiLu(p_form);
					 });
		
		div.hide();
		
		//循环拼接模板内容
		$.each(moban, function(i, x){
			
			var a = $("<a />").text(x.val).appendTo(tag);
			
			$(a).click(function(){
				
						input.val(input.val() + x.val + ",");
						
				});
			
			b=true;
		});
		
		if(moban.length==0)
		{
			div.remove();
			$(".MCmenuBgDiv").hide(); 
			return false;
		}
		
		div.show("fast", function(){
			
			//鼠标点击标题栏移动模板div
			var x = 0, y = 0, c = false;
			
			//鼠标按下事件
			title.mousedown(function(e){
				c = true;
				x = e.clientX - div.offset().left;
				y = e.clientY - div.offset().top;
			});
			
			//鼠标弹起事件
			title.mouseup(function() {
				c = false;
			});
			
			//鼠标移出title事件
			title.mouseout(function(){
				c = false;
			});
			
			//鼠标移动事件
			title.mousemove(function(e){
				
				if (!c)
				{	
					return false;
				}
				
				var cx = e.clientX - x;
				var cy = e.clientY - y;
				
				//模板div不可移出页面范围
				if (cx + div.outerWidth() > $(window).width() || cx < 0)
				{	
					return false;
				}
				
				//模板div不可移出页面范围
				if (cy + div.outerHeight() > $(window).height() || cy < 0)
				{	
					return false; 
				}
				
				//给模板div赋新的位置
				div.css({
					top : cy,
					left : cx
				});
				
			});
		});
		
		//如果模板div太长 则出现滚动条
		if (div.offset().top + div.outerHeight() > $(window).height())
		{	
			div.css("overflow", "auto")
			   .height($(window).height() - div.offset().top - 20);
		}
		
	}
	
	
	
	/***************************************************************/
	
	/*input.input({
		title : category.category,
		categoryId : category.id,
		paint : getPaint(),
		tfunc : saveOrUpdateMR,
		pfunc : paintSave,
		templateUrl : "/publish/doctor/getShuruMoBan.htm"
	});
	
	p.ajaxForm({
		dataType : "json",
        async : false,
		success : saveOrUpdateMR
	});
	
	function saveOrUpdateMR(result) 
	{
		//cs(result);
		if (result.state) 
		{
			//cs(result);
			//cs(result.obj.id+":"+result.obj.path);
			inputId.val(result.obj.id);
			inputPath.val(result.obj.path);
			showHuaTu(result.obj.id,result.obj.categoryId,result.obj.path);
		} 
		else 
		{
			$.oimsAlert("保存失败！");
		}
	}
	
	function getPaint() 
	{
		if (category.intr == undefined || category.intr == null || category.intr.length < 6) 
		{
			return null;
		}
		return {
			url : category.intr.split(","),
			patientId : md.hzid,           // 患者id
			regId : md.id,                 // 就诊id
			mrId : inputId.val(),
			photoType : 1
		};
	}*/
	
	/***************************************************************/
	
}

//保存病历记录    宋仁非
function saveBingLiJiLu(p_form)
{
	if(!p_form)
	{
		return false;
	}	
	//记录id
	var jl_id = $(p_form[0][name = "id"]).val();  
	
	//就诊id
	var jz_id = $(p_form[0][name = "mdId"]).val();		
	
	//病历分类id
	var category_id = $(p_form[0][name = "categoryId"]).val(); 
	
	//记录内容
	var jl_info = $(p_form[0][name = "val"]).val()+" ";     
	
	//图片地址
	var pic_path = $(p_form[0][name = "path"]).val();   
	
	//cs("jl_id");
	//cs($(p_form[0][name = "id"]).val());
	
	//cs("jz_id");
	//cs($(p_form[0][name = "mdId"]).val());
	
	//cs("category_id");
	//cs($(p_form[0][name = "categoryId"]).val());
	
	//cs("jl_info");
	//cs($(p_form[0][name = "val"]).val());
	
	//cs("pic_path");
	//cs($(p_form[0][name = "path"]).val());
	
	if(pic_path==""||pic_path==null)
	{
		if($.trim(jl_info)==""||$.trim(jl_info)==null)
		{
			jl_info = " ";
		}
	}	
		
	
	var save_result = getJSONData("/publish/doctor/saveOrUpdateMC_New.htm", 
								 {      jl_id : jl_id,
								        jz_id : jz_id,
								  category_id : category_id,
								      jl_info : jl_info,
								     pic_path : pic_path,
								          tag : Math.random()},
								  "POST");
	
	$(p_form[0][name = "id"]).val(save_result.obj);
	
	showHuaTu(save_result.obj,category_id,pic_path);
	
}

//生成用来隐藏悬浮控件的div   宋仁非
function backGroundDiv()
{
	//浏览器窗口大小的div 实现点击其他区域 导航消失
    var menuBgDiv = $(".MCmenuBgDiv");
    
    //如没有全浏览器窗口的功能DIV 则创建
    if(menuBgDiv.length>0)
    {
    	//menuBgDiv.remove();
    }	
    else
    {	
    
	    menuBgDiv = $("<div />")
	    						.width($(document).width()-5)
	    						.height($(document).height()-5)
	    						.addClass("emr_bgdiv")
	    						/*.css({
	    								position : "absolute",
	    								top : 0,
	    								left : 0,
	    								background:"#ccc",
	    								filter:"alpha(opacity=5)",//透明
	    				                opacity:0.01
	    								
	    							})*/
	    						.addClass("MCmenuBgDiv")
	    						.appendTo("body");
	    	
	    menuBgDiv.click(function(){
	    		
	    		//打开输入模板的图标移除
	    		$(".MRDiv_BG_1").remove();
	    		$(".MRDiv_BG_2").remove();
	    		//输入模板div隐藏
	    		$(".inputTemplateList").hide("fast");
	    		//快速定位导航div隐藏
	    		$(".MCmenuDiv").hide("fast");
	    		//自身隐藏
	    		$(".MCmenuBgDiv").hide();
	    		//保存病历记录
				saveBingLiJiLu(CurrentInput);
	    		
	    	}).hide();
    }
}

//显示图示按钮  jlid:记录id    cid:分类id   path:图片地址   宋仁非
function showHuaTu(jlid,cid,path)
{
	if(path==""||path==null||path.length<10)
	{
		return false;
	}	

	var showcid = "showimg"+cid;
	
	$("#"+showcid).remove();
	
	var html = $("<a />").attr("id","showimg"+cid)
						 .addClass("emr_huatutitle")
	                     /*.attr("style","font-size: 12px;color: blue;font-style: normal;")*/
	                     .text("  "+language_doctor.TuShi)//" 图示"
	                     .click(function(){
	                    	 
	                    	 showimage(jlid);
	                    	 
	                      });
	
	var chcid = "ch_"+cid;
	
	$("#"+chcid).append(html);
	
}

//看图示   宋仁非
function showimage(jlid)
{
	
	var getJiuZhenImageUrl = "/publish/doctor/getJiuZhenImageUrl.htm";
	
	v = getJSONData(getJiuZhenImageUrl,{jlid:jlid,tag:Math.random}).obj;
	
	urls = v[0].iurl.split(",");
	
	var div = $("<div />").addClass("emr_showimagediv01")/*.attr("style","padding:10px;")*/;
	
	var left = $("<div />").addClass("emr_showimagediv02")/*.attr("style","width:360px;height:230px ;float:left;margin-right:5px")*/
						   .appendTo(div);
	
	var right = $("<div />").addClass("emr_showimagediv02")/*.attr("style","width:360px;height:230px ;float:left;margin-left:5px")*/
		                    .appendTo(div);
	
	var limg = $("<img />").addClass("emr_showimage00")/*.attr("style","width:360px;height:230px ;")*/
	                       .attr("src",contextPath+urls[0]).appendTo(left);
	
	var rimg = $("<img />").addClass("emr_showimage00")/*.attr("style","width:360px;height:230px ;")*/
	                       .attr("src",contextPath+urls[1]).appendTo(right);
	
	div.appendTo("body");
	
	$(div).oimsDialog({winType : 4,
		                  icon : "openform",
		                 title : language_doctor.TuShi,//"图示",
		                  drag : false,
		                locked : false,
		                 width : "750",
		                height : "290"});
	
}

//*****************************************************************************

//图片保存回调函数  宋仁非
function paintCallback(data,eyes)
{
	//cs("paintCallback");
	//cs(eyes);
	
	var d = eval('('+data+')');
	//cs(d);
	
	if(d.state)
	{
		paintCurrent++;
		
		paintSave_Callback(d,eyes);
		
		if(paintCurrent==paintLength)
		{
			paintCurrent=0;
			
			//保存病历记录
			saveBingLiJiLu(CurrentInput);
			
			//关闭弹出的画图窗口
			paintWin.close();
		}
	}
}

/**
 * 体格检查图片保存回调
 * 宋仁非
 * @param data
 * @param eyes
 */
function paintSave_Callback(data, eyes) 
{
	v = data.obj;
	//cs("v:"+v);
	
	var input = CurrentInput.children("input[name=path]");
	
	var x = input.val();
	
	if (x == null||x=="")
	{
		x = ",";
	}
	
	var vs = x.split(",");
	
	if (eyes.toLocaleLowerCase() == "od")
	{	
		vs[0] = v;
	}	
	else if (eyes.toLocaleLowerCase() == "os")
	{	
		vs[1] = v;
	}
	
	//cs("vs:"+vs.toString());
	//cs(vs);
	
	input.val(vs.toString());
}