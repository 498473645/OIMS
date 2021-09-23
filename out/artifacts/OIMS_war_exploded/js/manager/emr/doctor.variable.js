/**可输入可选变量控件*/
function _emr_variableComp(){
	var components = {
		create:createComp,
		store:[],
		get:getComp,
		count:count
	};
	function createComp(target){
		if($(target).length==0){
			return;
		}
		var variable = {
			container:function(){
				var containerDiv = $('<div class="variable"/>');
				if(target.data()){
					containerDiv.data(target.data());
				}
				$(target).replaceWith(containerDiv);
				return containerDiv;
			}(),
			editArea:'',
			popArea:'',
			add:add,
			getValue:getValue,
			pop:showPopArea,
			bind:bind,
			focus:focus,
			getData:function(name){
				return this.container.data(name);
			},
			contentChange:change,
			setValue:setText
		};
		variable.editArea = $('<div contentEditable="true" hidefocus="true" style="outline:none;"/>').attr('tabindex',components.count()+1).appendTo(variable.container);
		variable.popArea = $('<div class="pop" style="display:none;"/>').appendTo(variable.container);
		variable.popArea.css({width:'150px','max-height':'100px',border:'1px solid #c3c3c3'});
		variable.editArea.css({'word-break':'break-all','word-wrap':'brak-word','overflow-x':'hidden'});
//		variable.editArea.css({border:'1px solid #d2d2d2'});
		if(target.height()){
			variable.editArea.css({height:target.height()-2});
		}
		/**添加变量*/
		function add(obj){
			if(typeof(obj)=='object'){
				var templet = obj.shuru+'；';
				var index = templet.indexOf('?');
				var i = 0;
				while(index!=-1){
					var span = '<span style="color:red;cursor:pointer;margin:0px 2px;">'+obj.child[i++][0]+'</span>';
					templet = templet.replace('?',span);
					index = templet.indexOf('?');
				}
				var templet = $('<span/>').html(templet);
				$('span',templet).each(function(i){
					$(this).data('data',obj.child[i]);
				}).bind('mousedown',function(e){
					if(e.button==2){//鼠标右键
						//TODO 弹出变量选择下拉框
						variable.pop(e,$(this).data('data'));
					}
				});
				templet.appendTo(variable.editArea);
			}else{
				variable.editArea.append(obj);
			}
			if(obj&&typeof(changeFunc)=='function'){//如果绑定了contentchange事件，则触发该事件
				changeFunc.call(null,variable.editArea.data('oldVal'),getValue(variable.editArea.html()));
				variable.editArea.data('oldVal',getValue(variable.editArea.html()));
			}
		};
		/**获取文本*/
		function getValue(){
			var innerhtml = variable.editArea.html();//
			innerhtml = innerhtml.replace(/&nbsp;/g,' ');//替换转义后的空格
			innerhtml = innerhtml.replace(/<{1}\s*?\/?[s,S][p,P][a,A][n,N].*?>/g,'');//替换掉span标签
			innerhtml = innerhtml.replace(/<{1}\s*?[b,B][r,R]{1}\s*?\/?>/g,'\r\n');//替换回车换行
			return $.trim(innerhtml);
		};
		/**弹出选择面板*/
		function showPopArea(e,items){
			var target = $(e.target);
			variable.popArea.empty();
			$.each(components.store,function(){//隐藏全部选择面板
				this.popArea.hide();
			});
			variable.popArea.show();//显示当前右击的选择面板
			for(var i=0,len=items.length;i<len;i++){
				var a = $('<a/>').text(items[i]).appendTo(variable.popArea);
				a.unbind('click').bind('click',function(e1){
					target.text($(this).text());
					if(!$(this).hasClass('on')&&typeof(changeFunc)=='function'){//如果绑定了contentchange事件，则触发该事件
						changeFunc.call(null,variable.editArea.data('oldVal'),getValue(variable.editArea.html()));
						variable.editArea.data('oldVal',getValue(variable.editArea.html()));
					}
				});
				if($.trim($(e.target).text())==$.trim(items[i])){
					a.addClass('on');
				}
			}
			var totalHeight = target.position().top+target.height()+variable.popArea.height();
			var top = totalHeight>$('#main').height()?(target.position().top-variable.popArea.height()):(target.position().top+target.height());
			variable.popArea.css({position:'absolute',left:e.offsetX,top:top});
			$(document).unbind('click').bind('click',release);
			function release(e2){
				if(!(e2.target===variable.popArea[0])){
					variable.popArea.hide();
					$(document).unbind('click',release);
				}
			}
		};
		
		/**事件绑定*/
		function bind(type,data,func){
			if(type&&data){
				variable.editArea.bind.apply(variable.editArea,arguments);
			}
		}
		
		/**该方法不会触发contentchange*/
		function setText(value){
			if(typeof(value)=='string'){
				variable.editArea.data('oldVal',value);
				variable.editArea.html(value);
			}
		}
		
		/**
		 * 注册组件内容发生改变时，执行的事件（可能存在缺陷）
		 * @param func(oldValue,vaalue) 值改变时触发的函数 oldValue:改变之前的值，value:当前值
		 */
		var changeFunc;
		function change(func){
			changeFunc = func;
			if(typeof(func)=='function'){
				//失去焦点，开启对该组件值的监听
				variable.editArea.unbind('blur').bind('blur',function(){
					var value = getValue($(this).html());
					if((!$(this).data('oldVal')/*==undefined*/&&value)||($(this).data('oldVal')&&value!=$(this).data('oldVal'))){
						changeFunc.call($(this),$(this).data('oldVal'),value);
						$(this).data('oldVal',value);
					}
//					variable.editArea.watch('innerHTML',func);
				});
			}
		}
		
		/** 组件获得焦点，取消值发生改变的监听事件 */
		variable.editArea.unbind('focus').bind('focus',function(){
//			$(this).data('oldVal',getValue($(this).html()));
//			$.each(components.store,function(i){
//				this.editArea.unwatch('innerHTML');
//			});
		});
		
		/**设置组件获得焦点*/
		function focus(){
			//组件获得焦点，将光标移动到最后
			if(document.selection && document.selection.createRange){//IE
				var focus = $._data(variable.editArea[0],'events').focus?$._data(variable.editArea[0],'events').focus.concat():[];
				variable.editArea.unbind('focus').focus();
				$.each(focus,function(){
					var args = ['focus'];
					if(this.data){
						args.push(this.data);
					}
					if(this.handler){
						args.push(this.handler);
					}
					variable.editArea.bind.apply(variable.editArea,args);
				});
				var range = document.selection.createRange();
				range.collapse(true);
				range.moveStart('character', getValue().length);
				range.select();
			}else if(window.getSelection){//Firefox Safari Chrome Opera
				variable.editArea.focus();
				var selection = window.getSelection();
				var range = window.getSelection().getRangeAt(0);
				range.selectNodeContents(variable.editArea[0]);
				range.collapse(getValue().length == 0);
		        selection.removeAllRanges();
		        selection.addRange(range);
			}
		}
		/**特殊处理，按下回车键时，阻止浏览器默认事件，更改为使用<br>标签*/
		variable.editArea.unbind('keydown').bind('keydown',function(e){
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
					e.stopPropagation();
				}
			}
		});
		components.store.push(variable);
		return variable;
	}
	/**
	 * 获取指定位置的变量组件
	 * @param index 变量组件的位子，从0开始
	 */
	function getComp(index){
		if(components.store.length==0){
			throw '无变量组件';
		}
		if(index>=0&&index<=components.store.length-1){
			return components.store[index];
		}else{
			throw '无指定'+index+'位置的变量组件';
		}
	}
	
	function count(){
		return components.store.length;
	}
	return components;
}

var _emr_variableComps = new _emr_variableComp();

/**
 * 检测监听对象指定的属性的值是否发生改变，时间间隔100ms
 * @param id 对象指定的属性
 * @param fn 发生改变是触发的函数
 */
jQuery.fn.watch = function(id, fn) {
    return this.each(function(){
        var self = this;
        function getValue(value){
        	if(value){
        		value = $.trim(value);
        		value = value.replace(/&nbsp;/g,' ');//替换转义后的空格
        		value = value.replace(/<{1}\s*?\/?[s,S][p,P][a,A][n,N].*?>/g,'');//替换掉span标签
            	value = value.replace(/<{1}\s*?[b,B][r,R]{1}\s*?\/?>/g,'\r\n');//替换回车换行
            	return value;
        	}
        	if(value==undefined){
        		return undefined;
        	}
        	return '';
        }
        $(self).data(
            'watch_timer',
            setInterval(function(){
            	console.dir('+++++');
                if (self[id]&&($(self).data('oldVal')==undefined||getValue(self[id])!=$(self).data('oldVal'))) {
                    fn.call(self, $(self).data('oldVal'), getValue(self[id]));
                    $(self).data('oldVal',getValue(self[id]));
                }
            }, 100)
        );
    });
    return self;
};
jQuery.fn.unwatch = function(id) {
    return this.each(function(){
    	if($(this).data('watch_timer')){
    		var self = this;
    		//延迟100ms清除对组件的监听事件
    		var timer = setTimeout(function(){
    			clearInterval($(self).data('watch_timer'));
    			$(self).removeData('watch_timer');
    			clearTimeout(timer);//只执行一次
    		},100);
    	}
    });
};