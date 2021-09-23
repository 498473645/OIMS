var combotree_del_node_url="/publish/shurumoban/combotreeDelNode.htm";
var templetSortSaveOrUpdateUrl = '/publish/shurumoban/templetSortSaveOrUpdate.htm';
/*
 *梁建业
 *模板管理模块需要引用的js 
 */
function loadJsAndCss_Moban(btns)
{
	loadWelcomePage();
	moban_Lanague = setLanguage(moban_Lanague);
}

/*
 *检查项目分类国际化
 */
var moban_Lanague = {
    FenLeiMc:370,//分类名称
	SuoYin:377,//索引
	JiBie:382,//级别
	BelongsDepart:191,//所属科室
	Jcxm:14,//检查项目
	NeiRong:376,//内容
	ShuRuMoban:310,//输入模板
	JianChaKj:401,//检查可见
	JianChaTs:402,//检查提示
	Seria:214,//序号
	CZR:380,//操作人
	CzSj:378,//操作时间
	LeiXing:379,//类型
	Qsrmbsy:736,//请输入模板索引
	Qsrmbnr:737,//Qsrmbnr
	Qxzjcxm:738,//请选择检查项目
	Sfqrscsrmbxx:739,//是否确认删除输入模版信息
	Qsr:735,//请输入
	BaoGaoMoban:311,//报告模板
	Start:31,//启用
	BiaoTi:381,//标题
	Baogaourl:740,//报告路径
	Mobanfy:741,//模板复用
	Mobannr:742,//模板内容
	Qsrbgmbbt:743,//请输入报告模板标题
	Qsrbgmbnr:744,//请输入报告模板内容
	Qrscbgmbxx:745,//确认删除报告模版信息？
	BaoGaoMoban:311,//报告模板
	Bgmbscsb:746,//报告模版上传失败
	WenZhenMoban:312,//问诊模板
	ZuShu:36,//主诉
	XianBingShi:37,//现病史
	JiWangShi:38,//既往史
	Zhenduansm:747,//诊断说明
	Qrscwzmbxx:748,//确认删除问诊模板信息
	TiGeMoban:313,//体格模板
	Yanjian:749,//眼睑
	Jiemo:750,//结膜
	Hongmo:751,//巩膜
	Yanwaiji:752,//眼外肌
	Jiaomo:753,//角膜
	Qianfang:754,//前房
	Hongmosecond:755,//虹膜
	Tongkong:756,//瞳孔
	Jingzhuangti:757,//晶状体
	Boliti:758,//玻璃体
	Shipan:759,//视盘
	Huangban:760,//黄斑
	Xueguan:761,//血管
	Shiwangmo:762,//视网膜
	Qrsctgmb:763,//确认删除体格模板
	Qingshurusuoyin:789,//请输入索引
	Suoskswjcxm:1059,//所属科室无检查项目
	Qingshurubgmbbt:1061,//请输入报告模板标题
    isnull:0//最后删除
};
/**
 * 创建类别树形下拉框
 * @author 刘正勇
 * @param options
 */
function createSortComboTree(options){
	 var showFlag = true;
	 var endEditFlag = true;
	 $("#"+options.id).combotree({
		 panelHeight:150
	 });
	 var treePanel = $("#"+options.id).combotree('tree');
	 $("#"+options.id).combotree('panel').panel({
		 onBeforeClose:function(){
			 return showFlag;
		 }
	 });
	 treePanel.attr('style','width:auto;height:auto;background-color:#ffffff;border:0;');
	 var panel = $("#"+options.id).combotree('panel');
	 panel.unbind('contextmenu').bind('contextmenu',function(e){
		 var menu = createContextMenu('sortContextmenu');
		 menu.menu('disableItem',menu.menu('findItem','添加子类别').target);
		 menu.menu('disableItem',menu.menu('findItem','重命名').target);
		 menu.menu('disableItem',menu.menu('findItem','删除').target);
		 menu.menu('show',{left: e.pageX,top: e.pageY});
	 });
	 treePanel.tree({
		onContextMenu: function(e, node){
	    	e.preventDefault();
	    	e.stopPropagation();
	    	$(this).tree('select', node.target);
	    	if($($(node.target).parent().parent()[0]).hasClass("tree")){
	    		if(treePanel.children("li").length==1){
	    			$($("#sortContextmenu").children("div")[2]).css("display","none");
	    		}else{
	    			$($("#sortContextmenu").children("div")[2]).css("display","block");
	    		}
	    	}else{
	    		$($("#sortContextmenu").children("div")[2]).css("display","block");
	    	}
	    	var menu = createContextMenu('sortContextmenu');
	    	menu.menu('enableItem',menu.menu('findItem','添加子类别').target);
			menu.menu('enableItem',menu.menu('findItem','重命名').target);
			menu.menu('enableItem',menu.menu('findItem','删除').target);
			menu.menu('show', {left: e.pageX,top: e.pageY});
		},
		method:"get",
		onSelect:function(node){
			if(!endEditFlag) {
				showFlag = false;
				return;
			}
			$("input[name='treeNodeId']").val($(this).tree("getSelected").id);
		},
		url:options.url,
		onBeforeExpand:function(node,param){
			$(this).tree("options").url= contextPath+"/publish/shurumoban/findComboTreeChildrenByPid.htm?categoryId="+$("#categoryId").val()+"&id="+node.id;
		},	
		loadFilter:function(data){
			if(data.msg){
				return data.msg;
			}else{
				return data;
			}
		},
		onAfterEdit:function(node){
			if(!$.trim(node.text)){
				$(this).tree('beginEdit',node.target);
				return;
			}
			var parentNode = $(this).tree('getParent',node.target);
			var data=getJSONData(templetSortSaveOrUpdateUrl,{
	 				id:node.id,
	 				pid:parentNode?parentNode.id:null,
	 				name:node.text,
	 				categoryId:$("#categoryId").val(),
	 				tag:Math.random()
				},
				"POST");
			if(data){
				$(this).tree('update',{
	 				target:node.target,
	 				id:data.id
	 			});
				endEditFlag = true;
				showFlag = true;
			}else{
				$.oimsError('出现未知错误',function(){
					$(this).tree('remove',node.target);
				});
			}
		}
	});
	 
	 function createContextMenu(id){
		if($('#'+id).length>0){
			$('#'+id).menu('destroy');
		}
		var menuItemsHtml = '<div id="'+id+'" class="easyui-menu" style="width:120px;"></div>';
  		$('body').append(menuItemsHtml);//下拉树右键菜单的html
	    var menu = $('#'+id);
	    menu.menu({
	    	onShow:function(){
	    		showFlag = false;
	    	},
	    	onHide:function(){
	    		if(!endEditFlag){
	    			showFlag = false;
	    		}else{
	    			showFlag = true;
	    		}
	    	}
	    });
	    menu.menu('appendItem',{
	    	text:'添加根类别',
	    	onclick:function(e){
	    		if(!endEditFlag) return;
	    		var id = 'new'+Math.random().toString().replace('.','');
	    		var node = {parent:null,data:[{id:id,text:'新类别',iconCls:'icon-ly-fold'}]};
		    	treePanel.tree('append',node);
		    	var node = treePanel.tree('find',id);
		    	treePanel.tree('select',node.target);
		    	treePanel.tree('beginEdit',node.target);
		    	endEditFlag = false;
		    	showFlag = false;
	    	}
	    });
	    menu.menu('appendItem',{
	    	text:'添加子类别',
	    	onclick:function(){
	    		if(!endEditFlag) return;
	    		var parentNode = treePanel.tree('getSelected');
	    		var id = 'new'+Math.random().toString().replace('.','');
	    		var node = {parent:parentNode.target,data:[{id:id,text:'新类别',iconCls:'icon-ly-fold'}]};
	    		treePanel.tree('append',node);
		    	var node = treePanel.tree('find',id);
		    	treePanel.tree('select',node.target);
		    	treePanel.tree('beginEdit',node.target);
		    	endEditFlag = false;
		    	showFlag = false;
	    	}
	    });
	    menu.menu('appendItem',{
	    	text:'重命名',
	    	onclick:function(){
	    		if(!endEditFlag) return;
	    		var node = treePanel.tree('getSelected');
	    		treePanel.tree('beginEdit',node.target);
	    		endEditFlag = false;
	    		showFlag = false;
	    	}
	    });
	    menu.menu('appendItem',{
	    	text:'删除',
	    	onclick:function(){
	    		var node = treePanel.tree('getSelected');
	    		var data = getJSONData(combotree_del_node_url,{id:node.id,tag:Math.random()},'POST');
	    		if(data&&data.state){
	    			var parentNode = treePanel.tree('getParent',node.target);
	    			if(parentNode){
	    				parentNode.iconCls="icon-ly-fold";
	    			}
	    			treePanel.tree('remove',node.target);
	    			$("#"+options.id).combotree("clear");
	    		}
	    	}
	    });
	    return menu;
	 }
	 return $('#'+options.id);
}
