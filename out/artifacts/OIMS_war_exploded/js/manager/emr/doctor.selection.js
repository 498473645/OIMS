function initOptionListMenu(options,flag){
	var _flag = $('#'+options.id).data('flag');
	if(_flag&&_flag==flag){
		return;
	}
	$('#'+options.id).remove();
	var _options = {
		id:'',
		width:120,
		hideOnUnhover:true,
		checkbox:false,
		radio:false,
		canParentSelect:false
	};
	_options = $.extend(_options,options);
	if(_options.checkbox) _options.radio = false;
	if(!_options.id) _options.id = Math.random().toString().replace('.','');
	var cnter = $('<div id="'+_options.id+'">').appendTo('body');
	$('#'+options.id).data('flag',flag).data('options',_options);
	createOptionListMenu(cnter,_options,null,options.data);
	$(document).unbind('.menu').bind('click.menu',function(e){
		if(_options.checkbox||_options.radio){
			var target = $(e.target);
			if(target.hasClass('selection-menu-item')||target.parents('.selection-menu-item').length>0){
				return;
			}
		}
		hideMenu(cnter);
	});
}

function getSelectedMenuItems(cnter){
	var selected = cnter.find('input[type="checkbox"]:checked');
	var arr = new Array();
	for(var i=0;i<selected.length;i++){
		arr.push($(selected[i]).parents('.selection-menu-item').data('data'));
	}
	return arr;
}

function hideMenu(cnter){
	var onHide = cnter.data('options').onHide;
	if(typeof(onHide)=='function'){
		onHide.call(null);
	}
	cnter.remove();
	$(document).unbind('.menu');
}

function createOptionListMenu(container,options,parent,data){
	var itemHeight = 23;
	var optionList = $('<div class="selection-menu"/>').appendTo(container);
	if(parent){
		options.left = parent.offset().left+options.width-3;
		options.top = parent.offset().top-3;
		optionList.data('parent',parent);
	}
	optionList.css({height:data.length*itemHeight,width:options.width,left:options.left,top:options.top});
	$('<div class="selection-menu-line"/>').css({height:optionList.height()+12}).appendTo(optionList);
	var radioName = Math.random();
	for(var i=0;i<data.length;i++){
		var itemData = data[i];
		var optionDiv = $('<div class="selection-menu-item"/>').appendTo(optionList);
		optionDiv.data('data',itemData);
		var chkDiv = $('<div style="float:left;width:19px;height:19px;padding-top:2px;"/>').appendTo(optionDiv);
		var textDiv = $('<div class="selection-menu-text"/>').css({width:optionList.width()-44}).attr('title',itemData.text).appendTo(optionDiv);
		
		var chkId = Math.random().toString().replace('.','');
		if(itemData.isParent){//有子菜单
			$('<div class="selection-menu-rightarrow"/>').appendTo(optionDiv);
			if(options.canParentSelect&&options.checkbox){
				$('<input type="checkbox" id="'+chkId+'">').appendTo(chkDiv);
				if(itemData.checked){
					$('#'+chkId).attr('checked','checked');
				}
			}else if(options.canParentSelect&&options.radio){
				$('<input type="radio" id="'+chkId+'" name="'+radioName+'">').appendTo(chkDiv);
				if(itemData.checked){
					$('#'+chkId).attr('checked','checked');
				}
			}
		}else{//无子菜单
			if(options.checkbox){
				$('<input type="checkbox" id="'+chkId+'">').appendTo(chkDiv);
				if(itemData.checked){
					$('#'+chkId).attr('checked','checked');
				}
				if(itemData.required){
					$('#'+chkId).attr('disabled','true');
				}
			}else if(options.radio){
				$('<input type="radio" id="'+chkId+'" name="'+radioName+'">').appendTo(chkDiv);
				if(itemData.checked){
					$('#'+chkId).attr('checked','checked');
				}
				if(itemData.required){
					$('#'+chkId).attr('disabled','true');
				}
			}
		}
		var textLbl = $('<label for="'+chkId+'"/>').text($.trim(itemData.text)).appendTo(textDiv);
		if(options.checkbox||options.radio){
			chkDiv.children().click(function(){
				var self = $(this);
				var item = self.parent().parent();
				if(self.attr('checked')){
					if(options.onChecked&&typeof(options.onChecked)=='function'){
						options.onChecked.call(self,item.data('data'),
								item.parent().data('parent')?item.parent().data('parent').data('data'):null);
					}
					if(options.radio){
//						hideMenu(container);
					}
				}else{
					if(options.onUnchecked&&typeof(options.onUnchecked)=='function'){
						options.onUnchecked.call(self,item.data('data'),
								item.parent().data('parent')?item.parent().data('parent').data('data'):null);
					}
				}
			});
		}
		
		optionDiv.unbind('.menu');
		optionDiv.bind('click.menu',function(e){
			e.stopPropagation();
			var self = $(this);
			if(!self.hasClass('selection-menu-item')) return;
		});
		optionDiv.bind('mouseenter.menu',function(e){
			var self = $(this);
			if(!self.hasClass('selection-menu-item')||self.hasClass('selection-menu-active')) return;
			self.siblings().removeClass('selection-menu-active');
			self.parents('.selection-menu').nextAll().remove();
			self.addClass('selection-menu-active');
			if(self.data('data').isParent){
				if(options.parentHover){
					options.parentHover.call(null,container,options,self,self.data('data'));
				}
			}
		});
		optionDiv.bind('mouseleave.menu',function(e){
			var self = $(this);
			if(!self.hasClass('selection-menu-item')) return;
			var target = $(e.toElement);
			if(target.data('parent')&&target.data('parent')[0]===self[0]){
				
			}else{
				self.removeClass('selection-menu-active');
				if(self.data('data').isParent){
					self.parent().nextAll().remove();
				}
			}
		});
		optionList.unbind('.menu');
		optionList.bind('mouseleave.menu',function(e){
			var self = $(this);
			if(!self.hasClass('selection-menu')) return;
			var target = $(e.toElement);
			var active = self.find('.selection-menu-active');
			var tParent = target.data('parent');
			var tParents = target.parents('.selection-menu').data('parent');
			if((tParent&&tParent[0]==active[0])
					||(tParents&&tParents[0]==active[0])){//父菜单移动到子菜单面板
//				console.dir('F2C');
			}else if(self.data('parent')&&self.data('parent')[0]==target.parents('.selection-menu-item')[0]){//子菜单移动到父菜单
//				console.dir('C2F');
			}else if(target.hasClass('.selection-menu')||target.parents('.selection-menu').length>0){//子菜单移动到父菜单面板
//				console.dir('2FP');
				if(options.hideOnUnhover){
					optionList.nextAll().remove();
					optionList.remove();
				}
			}else{
				if(options.hideOnUnhover){
					$('#'+options.id).remove();
				}
			}
		});
	}
}