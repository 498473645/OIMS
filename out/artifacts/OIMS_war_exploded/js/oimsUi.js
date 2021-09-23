;(function($) {
	/**
	 * 用法$.textAddCommbo({})
	 * pm:{
	 *  name:
	 *  class:
	 *  parent:
	 *  textAttr:{}
	 *  data:[{text:""}]
	 * }
	 */
	var pm_textAddCommbo = {} ;
	//定义函数textAddCommbo有两个属性 1：ele,2:tree;
	/**
	 * @constructor
	 */
	$.textAddCommbo = function(pm){
		//  ？？？ele通过调用_createTextAddCommbo函数得到???不定义ui不行么？
		pm_textAddCommbo = pm ;
		var ui = _createTextAddCommbo(pm) ;
		return {
				ele:ui,
				treeUl:_getTreeUl,
				tree:_tree
			} ;
	} ;
	function _getTreeUl(){
		return $("#oimsUi_textAddCommbo_commbo_"+pm_textAddCommbo.id) ;
	} ;
	/**
	 * [{text:""},{text:""}...]
	 */
	function _tree(p,id){
		if(!id){
			_getTreeUl().tree({data:p}) ;
		}else{
			$("#oimsUi_textAddCommbo_commbo_"+id).tree({data:p}) ;
		}
			
	} ;
	
//	ele属性
    function _createTextAddCommbo(pm){
//        定义一个input接收选中值
        var input = "<input id='"+pm.id+"' name='"+pm.id+"'/>" ;
//        定义div包括下拉选项和选择按钮
        var div = "<div class='dataselectdrop' id='dataselectdrop_"+pm.id+"'  style=\"z-index:1000\"  >" +
              "<div class='selectlist' id='oimsUi_textAddCommbo_selectlist_"+pm.id+"'>"+
              
                "<ul id='oimsUi_textAddCommbo_commbo_"+pm.id+"' class='easyui-tree' style='height:auto;' data-options='checkbox:true'></ul>"+
              "</div>"+
              "<div class='selectbtn' id = 'selectbtn_"+pm.id+"'>"+
                "<a id ='oimsUi_textAddCommbo_btnOk_"+pm.id+"' >"+common_language.queDingLanguage+"</a> <a id = 'oimsUi_textAddCommbo_btnCancel_"+pm.id+"'>"+common_language.quXiaoLanguage+"</a>"+
              "</div>"+
           "</div>" ;
//        定义input的属性
        var jinput = $(input).attr({readOnly:"true",onblur:"this.className='blur'",onfocus:"this.className='focus'"}).addClass("blur") ;
//       div刚开始处于隐藏
        var jdiv = $(div) ;
        jdiv.hide() ;
        var rt = $("<div />") ;
        rt.append(jinput).append(jdiv) ;
        
//        当点击输入框，focus
        jinput.focus(function(){
            var textWidth = "" ;
//            读取用户的浏览器信息
             if(jQuery.browser.msie){
                    textWidth = $("#"+pm.id)[0].clientWidth;
                }else{
                	//等于input的长度
                    textWidth = $("#"+pm.id).width();
                }
             
            //input下的div长度等于input的宽度
            $("#dataselectdrop_"+pm.id).width(textWidth);
//            每个选项的长度
            $("#oimsUi_textAddCommbo_commbo_"+pm.id).width(textWidth) ;
//            下拉条div内容的长度
            $("#oimsUi_textAddCommbo_selectlist_"+pm.id).width(textWidth) ;
//            下拉条div按钮的长度
            $("#selectbtn_"+pm.id).width(textWidth) ;
//            点击确定按钮
            $("#oimsUi_textAddCommbo_btnOk_"+pm.id).click(function(){
//            	整个div隐藏
                $("#dataselectdrop_"+pm.id).hide() ;
                var str = "";
                var str1 = "";
//                收集选中选项的数据span.tree-checkbox1
                var aa = $("#oimsUi_textAddCommbo_commbo_"+pm.id+" span.tree-checkbox1").siblings();
                for(var i = 0,length = aa.length;i<length;i++){
                    if(aa[i].className == "tree-title"){
//                    	去掉最后一个，号
                        if(i == length -1){
                            str += aa[i].innerHTML;
//                            ？？？这里写parentElement
                            str1 += aa[i].parentElement.id;
                        }else{
                            str += aa[i].innerHTML + ",";
                            str1 += aa[i].parentElement.id + ",";
                        }
                    }
                }
//                定义输入框input的值
                $("#"+pm.id).val(str);
//                隐藏域的值
                $("#"+pm.hiddenId).val(str1);
                $("#"+pm.id).change() ;
//                取消两个按钮的click绑定事件
                $("#oimsUi_textAddCommbo_btnOk_"+pm.id).unbind("click") ;
//                alert(str1);
            }) ;
            $("#oimsUi_textAddCommbo_btnCancel_"+pm.id).click(function(){
                $("#dataselectdrop_"+pm.id).hide() ;
                $("#oimsUi_textAddCommbo_btnCancel_"+pm.id).unbind("click") ;
            }) ;
            
//            展示下拉框div
            $("#dataselectdrop_"+pm.id).show() ;
//            var h = 100 ;
//            var h = 150 ;
//            $("#oimsUi_textAddCommbo_selectlist_"+pm.id).height(h) ;
//            $("#oimsUi_textAddCommbo_commbo_"+pm.id).height(h) ;
//            选项选中结果
            var str = $("#"+pm.id).val().split(",") ;
            if($("#"+pm.id).val() != ""){
//            所有选项span.tree-title
            	var aa = $("#oimsUi_textAddCommbo_commbo_"+pm.id +" span.tree-title");
            	for(var j = 0,length = str.length;j<length;j++){
                	for(var i = 0,length = aa.length;i<length;i++){
                    	if(aa[i].innerHTML == str[j]){
                        	$(aa[i]).prev()[0].className ="tree-checkbox tree-checkbox1";
                    	}
                	}
					
            	}
            }else{
            	var treeArr = $(".tree-checkbox1");
            	for(var i = 0,length = treeArr.length;i<length;i++){
            		treeArr[i].className = "tree-checkbox tree-checkbox0";
            	}
               
            }

            
        });
        return rt.children() ;
    } ;
    
    
    /**
     * @constructor
	 * p.id    自动完成组件id
	 * p.name  自动完成组件名称
	 * p.url   自动完成组件数据源
	 * p.data  自动完成组件参数
	 * p.ar    自动完成组件本地数据源ar = [{id,text,index1,index2}] text:"显示文字",index1:"中文全拼",index2:"中文简拼"
	 * p.pid   选项追加到的容器
	 * p.tag   分隔标志
	 * p.chg   数据转换参数{id,:"对应属性",text:"对应属性",index1:"对应属性",index2:"对应属性"}
	 */
	$.auto = function(p){
		var isInDiv = false ;//鼠标是否在div内
		if(!p) p={} ;
		p.tag = p.tag==undefined?",":p.tag ;
		var input = $("<input type='text' class='blur' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" />" +
				"<input type='hidden' id='"+p.id+"_' />") ;
		if(p.eff)
		$(input.get(0)).focusout(function(){
			if(!isInDiv){
				var rt = $(input.get(0)).val() ;
				var rts = rt.split(",") ;
				if(rts.length>0){
					var v = rts[rts.length-1] ;
					var eff = false ;//值是否有效  false无效
					$.each(testAr,function(i,v2){
						if(!v2) return false ;
						if(v2.text==v){
							eff = true ;
							return false ;
						}
					}) ;
					if(!eff){
//						alert("填写的值无效:"+v) ;
//						$(input.get(0)).val(rt.substring(0,rt.lastIndexOf(p.tag))) ;
					}
				}else{
					
				}
			}
			$("#"+p.id+"_").change() ;
		}) ;
		
		if(p.id){
			$(input.get(0)).attr("id",p.id) ;
		}
			
		if(p.name){
			$(input.get(0)).attr("name",p.name) ;
			$(input.get(1)).attr("name",p.name+"_") ;
		}
		
		
			

		var testAr = undefined ;
		var getData = function(chg){
			var rt = ajaxReq({url:p.url,data:p.data}) ;
			if(rt!=null&&typeof(rt)=="object"&&typeof(rt.obj)=="object"&&rt.obj.length>0){
				rt=rt.obj ;
				if(p.chg){//参数转化
					var array = new Array() ;
					$.each(rt,function(i2,v2){
						var e = {id:"",text:"",index1:"",index2:""} ;
						e.id = eval("v2."+p.chg.id)==undefined?"":eval("v2."+p.chg.id) ;
						e.text = eval("v2."+p.chg.text)==undefined?"":eval("v2."+p.chg.text) ;
						e.index1 = eval("v2."+p.chg.index1)==undefined?"":eval("v2."+p.chg.index1) ;
						e.index2 = eval("v2."+p.chg.index2)==undefined?"":eval("v2."+p.chg.index2) ;
						array.push(e) ;
					}) ;
					rt = array ;
				}
			}else{
				rt = new Array() ;
			}
			return rt ;
		} ;
		if(p.url!=undefined){
			testAr = getData() ;
		}else if(p.ar!=undefined){
			testAr=p.ar ;
		}else if(testAr==undefined){
			alert(common_language.ZdwcYuanSu) ;
			return  ;
		}
		
		$(input.get(0)).change(function(e){
			//这里去写把选择的文字对应的id写到hidden里面去
		}) ;
		
		
		var autoSelectedColoer = "#abcde1" ;
		var autoNotSelectedColoer = "" ;
		function k13(a){//回车
			var index = undefined ;
			$.each($("#oims_auto_"+p.id).children(),function(i){
				if($($(this)).attr("selected")=="selected")
					index=i ;
			}) ;
			index = index==undefined?0:index ;
			if(a.keyCode==13){
				var enter = $($("#oims_auto_"+p.id).children().get(index)).text() ;
				var inputValue = $("#"+p.id).val() ;
				inputValue = inputValue.substring(0,inputValue.lastIndexOf(p.tag)+1) ;
				$("#"+p.id).val(inputValue+enter) ;
				$("#oims_auto_"+p.id).remove() ;
				$("#"+p.id+"_").change() ;
				return true;
			}else
				return false ;
		} ;
		
		function k40(a){//向下事件
			if(a.keyCode==40){
				var selected = false ;
				$("#oims_auto_"+p.id).children().each(function(i){
					if($(this).attr("selected")=="selected"){
						$(this).attr("selected",false) ;
						$(this).css("background-color",autoNotSelectedColoer) ;
						$($(this).next('div').get(0)).css("background-color",autoSelectedColoer).attr("selected","selected") ;//向下选中
						selected = true ;
						return false ;
					}
				}) ;
				
				if(!selected){
					$($("#oims_auto_"+p.id).children().get(0)).css("background-color",autoSelectedColoer).attr("selected","selected") ;
				}
				return true ;
			}else
				return false ;
			
		}
		
		function k38(a){//向上事件
			if(a.keyCode==38){
				var selected = false ;
				$("#oims_auto_"+p.id).children().each(function(i){
					if($(this).attr("selected")=="selected"){
						$(this).attr("selected",false) ;
						$(this).css("background-color",autoNotSelectedColoer) ;
						$($(this).prev('div').get(0)).css("background-color",autoSelectedColoer).attr("selected","selected") ;//向上选中
						selected = true ;
						return false ;
					}
				}) ;
				if(!selected){
					$($("#oims_auto_"+p.id).children().get(0)).css("background-color",autoSelectedColoer).attr("selected","selected") ;
				}
				return true ;
			}else
				return false ;
			
		}
		
		input.bind({"keyup":function(a){
			if(k13(a)) return ;//回国事件
			if(k40(a)) return ;//向下事件
			if(k38(a)) return ;//向上事件
			
			$("#oims_auto_"+p.id).remove() ;
			var at = $("<div id='oims_auto_"+p.id+"' />") ;
			at.mouseover(function(){isInDiv=true ;}) ;
			at.mouseout(function(){isInDiv=false ;}) ;
			at.css("position","absolute") ;
			at.addClass("deleteDiv_Oims");
			at.width($("#"+p.id).width()) ;
			var left = $("#"+p.id).get(0).getBoundingClientRect().left;
			var top = $("#"+p.id).get(0).getBoundingClientRect().top + $("#"+p.id).get(0).offsetHeight;
			at.css({left:left+"px",top:top+"px","overflow-y":"auto",border: "1px solid #c3c3c3","background-color": "white"}) ;
			at.height(100) ;
			if(input.val().length==0) return ;
			var iv = input.val() ;
			iv = iv.substring(iv.lastIndexOf(p.tag)+1) ;
			if(iv==undefined||iv=="") return false ;
			var ar = new Array() ;
			//支持简拼
			$.each(testAr,function(i,v){
				if(!v) return false ;
				if(v.index2==iv){
					var b = false ;
					$.each(ar,function(i1,v1){
						if(v1.text==v.text){
							b=true ;
							return false ;
						}
					}) ;
					if(!b){
						ar.push(v) ;
					}
				}
			}) ;
			//支持全拼与文字
			$.each(testAr,function(i,v){
				if(!v) return false ;
				var b = false ;
				if(v.index1.indexOf(iv)==0||v.text.indexOf(iv)==0){
					$.each(ar,function(i1,v1){
						if(v1.text==v.text){
							b=true ;
							return false ;
						}
					}) ;
					if(!b){
						ar.push(v) ;
					}
				}
			}) ;
			
			if(ar.length<=0) return ;
			//显示可选内容
			$.each(ar,function(i,v){
				if(!v) return false ;
				var d = $("<div />").attr("val",v.id).text(v.text) ;
				d.click(function(e){
					var t = $(e.currentTarget).text() ;
					var inputValue = $("#"+p.id).val() ;
					inputValue = inputValue.substring(0,inputValue.lastIndexOf(p.tag)+1) ;
					$("#"+p.id).val(inputValue+t) ;
					$("#oims_auto_"+p.id).remove() ;
					$("#"+p.id+"_").change() ;
				}) ;
				d.mouseover(function(){
					$(this).css({"background-color":autoSelectedColoer,cursor: "pointer"}) ;
				}).mouseout(function(){
					$(this).css({"background-color":autoNotSelectedColoer,cursor: "default"}) ;
				});
				d.css({}) ;//添加　自动完成选项　样式
				at.append(d) ;
			}) ;
			var zi = 0 ;
			$("div").each(function(){
				if($(this).css("z-index")=='auto')return true ;
				zi = $(this).css("z-index")>zi?$(this).css("z-index"):zi ;
			}) ;
			at.css("z-index",zi+10) ;
			if(p.pid)
				$("#"+p.pid).append(at) ;
			else
				$("body").append(at) ;
		}
		,
		"focusout":function(){
			if(!isInDiv) 
				$("#oims_auto_"+p.id).remove() ;
		}
		}) ;
		return input ;
	} ;
	
	function log(info,tag){
//		tag = tag==undefined?"oimsUi":tag ;
//		console.log(tag+"\t"+info)
	} ;
	function ls(obj,tag){
//		tag = tag==undefined?"oimsUi":tag ;
//		console.log(tag+"\tstart") ;
//		console.dir(obj) ;
//		console.log(tag+"\tend") ;
	} ;

	/**
	 * @param p{ar:[{k:"",v:""},url:"",param:{},change:{k:"",v:""},strlength:"",treeH:""]}
	 */
	/**
	 * @constructor
	 */
	$.fn.oimsCombox = function(p){
		var _this = this ;
		if(!p)
			return ;
		var ar = [] ;
		if(p.ar){
			ar = p.ar ;
			addLi(ar) ;
		}else if(p.url){
			if(p.param)
				$.extend(p.param,{tag:Math.random()}) ;
			$.post(p.url,p.param,function(d){
				d=d.obj ;
				if(p.change){
					$.each(d,function(i,v){
						ar.push({k:eval("v."+p.change.k),v:eval("v."+p.change.v)}) ;
					}) ;
				}else{
					ar.push({k:d.k,v:d.v}) ;
				}
				addLi(ar) ;
			},"json") ;
		}else{
			return  ;
		}
		
		var addLi = function(ar){
			$("#"+ulId).empty() ;
			if(ar.length==0)
				return false ;
			$.each(ar,function(i,v){
				if(p.strlength)
					
				var li = "<li style='display:block'><input type='checkbox' value='"+v.v+"' key='"+v.k+"' />" +
						"<span style='display:inline;margin-left: 5px'>"+v.k.substring(0,p.strlength)+"</span></li>" ;
				$("#"+ulId).append($(li)) ;
			}) ;
		} ;
		
		var _isShow = false ;//默认为隐藏
		var _this = $(this) ;
		var rm = Math.random() ;
		var _top = $(this).get(0).getBoundingClientRect().top ;
		var _bottom = $(this).get(0).getBoundingClientRect().bottom ;
		var _parent = $(this).parent() ;
		var divId = "oims_combox_div_tree_"+_this.attr("id") ;
		var ulId  = "oims_combox_ul_tree_" +_this.attr("id") ;
		var okId =  "oims_combox_ok_tree_" +_this.attr("id") ;
		var resetId =  "oims_combox_resetId_tree_" +_this.attr("id") ;
		_this.attr("readonly",true) ;
		var z_index = 1000 ;
		
		if($("#"+divId).get(0))
			return false;
		p.treeH = p.treeH?p.treeH:100;
		var ele = "<div style='z-index:100;position:absolute;'>" +
					"<input type='hidden' id='"+_this.attr("id")+"_' name='"+_this.attr('name')+"_' />" +
						"<div id='"+divId+"' >" +
							"<div style='display:block;overflow-y:scroll;height:"+p.treeH+"px;z-index:100'><ul id='"+ulId+"'></ul></div>"+
							"<div style='display:block'><button id='"+okId+"'  >"+common_language.queDingLanguage+"</button><button id='"+resetId+"' >"+common_language.quXiaoLanguage+"</button></div>"+
						"</div>" +
				  "</div>";
		ele = $(ele) ;
		var _div = $("#"+divId,ele) ;
		var _ul  = $("#"+ulId,ele);
		
		if($("#right").get(0)){
			$("#right").scroll(function(){
				ele.offset({top:$(_this).offset().top+$(_this).get(0).height,left:$(_this).offset().left}) ;
			}) ;
		}
		if($(".statisticsfrom1").get(0)){
			$(".statisticsfrom1").scroll(function(){
				ele.offset({top:$(_this).offset().top+$(_this).get(0).height,left:$(_this).offset().left}) ;
			}) ;
		}
		
		var left = _this.get(0).getBoundingClientRect().left;
		var r = _this.get(0).getBoundingClientRect().right;
		var top =  _this.get(0).getBoundingClientRect().top + _this.get(0).offsetHeight;
		_div.css({left:left+"px",top:top+"px",width:r-left,"overflow-y":"auto",border: "1px solid #c3c3c3","background-color": "white","heigth":"50px"}) ;
		
		var hide = function(){
			_div.hide() ;
		} ;
		var show = function(){
			_div.show() ;
		} ;
		
		
		_this.click(function(){
			if(!_isShow){
				show() ;
				_isShow = !_isShow ;
			}else {
				hide() ;
				_isShow = !_isShow ;
			}
			var vs = $("#"+_this.attr("id")+"_",ele).val().split(",") ;
//			var vs = _this.val().split(",") ;
			$("li",_ul).each(function(){
				var _this = $(this) ;
				$("input",_this).attr("checked",false) ;
			}) ;
			$("li",_ul).each(function(){
				var _this = $(this) ;
				$.each(vs,function(i,v){
					if(v==$("input",_this).val()){
						$("input",_this).attr("checked","checked") ;
					}
				}) ;
			}) ;
		}) ;
			
		$("#"+okId,ele).click(function(){
			var vs = [] ;
			$("li",_ul).each(function(){
				var _this = $(this) ;
				if($("input",_this).attr("checked")=="checked"){
					vs.push({v:$("input",_this).val(),k:$("input",_this).attr("key")}) ;
				}
			}) ;
			var showStr = "" ;
			var hideStr = "" ;
			$.each(vs,function(i,v){
				showStr+= showStr.length==0?v.k:","+v.k ;
				hideStr+=hideStr.length==0?v.v:","+v.v ;
			}) ;
			_this.val(showStr) ;
			$("#"+_this.attr("id")+"_",ele).val(hideStr) ;
			$("#"+_this.attr("id")+"_",ele).change() ;
			_this.change() ;
			_isShow = false ;
			hide() ;
		} ) ;
		$("#"+resetId,ele).click(function(){
			_isShow = false ;
			hide() ;
		} );
		/*
		var testLi = "<li style='display:block'><input type='checkbox' value='一' /><span style='display:inline;margin-left: 5px'>ssss</span></li>" ;
		testLi = $(testLi) ;
		_ul.append(testLi.clone()) ;
		_ul.append(testLi.clone()) ;
		_ul.append(testLi.clone()) ;
		*/
		
		_parent.append(ele) ;
		hide() ;
	} ;
    
})(jQuery);



