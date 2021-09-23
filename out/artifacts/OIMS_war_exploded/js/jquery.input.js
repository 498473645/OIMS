var inputTarget,paintFunctionCallBack, paintWin,paintLength=0,paintCurrent=0;
/**
 * 输入插件
 * @author Li Yan
 */
;(function($){
	
$.fn.input1=function(settings)
{
	importCSS("/css/oimsInput.css");
	var t = this;
	var id = settings.categoryId;  //分类id
	var func = settings.tfunc;     //保存记录内容
	paintFunctionCallBack = settings.pfunc;   //保存画图图片
	var paint = settings.paint;   
	var title = settings.title;	   //标题
		 
		
		var paintSaveUrl = contextPath+"/publish/paint/paintSave.htm";   //保存
		
		var findHtml = "null";
		if(settings.findHtml){
			findHtml = settings.findHtml;
		}
		var findFun = settings.findFun;
		
		
		var d, c = "MRDiv_BG_1";
		if (paint != undefined) {
			c = "MRDiv_BG_2";
		}
		
		t.blur(function(){
			//mrId = func();
			if(t.val().length>0){
//				alert(0);
				$(t).parent().submit();
			}
		});
		if (1!=1) {
			d = {
				state : 1,
				obj : [ {
					index : "aaa",
					val : "测试一下"
				}, {
					index : "bbb",
					val : "测试一下啦"
				}, {
					index : "ccc",
					val : "测试二下啦"
				} ]
			};
		} else {
			//读取数据
			d = getJSONData(url, {
				categoryId : id,
				tag : Math.random()
			});
		}
		if (!d.state) {
			$.oimsAlert(d.message);
			return;
		}
		$(document).click(function(){
			$(".MRDiv_BG_2").remove();
			$(".MRDiv_BG_1").remove();	
			$(".inputTemplateList").remove();
		});
		t.dblclick(function(e) {
			//移除原有的模板
			$(".MRDiv_BG_2").remove();
			$(".MRDiv_BG_1").remove();
			$(".inputTemplateList").remove();
			
			//创建新的模板
			var tt= $("<div />").css({
				top : e.clientY + "px",
				left : e.clientX + "px"
			}).addClass(c).appendTo("body");
			$("<a />").attr("title", language.template).addClass("MR_BT_Pen")
					.appendTo(tt).click(function(e) {
						showInputTemplate("",tt);
						tt.remove();
						if (e.stopPropagation) e.stopPropagation();
						  else e.cancelBubble = true;
					});
			if (paint != undefined) {
				importJS("/js/jquery.swfobject.js");
				$("<a />").attr("title", language.paint)
						.addClass("MR_BT_Paint").appendTo(tt).click(function(e) {
							inputTarget = t.parent();
							showPaintWin();
							tt.remove();
							if (e.stopPropagation) e.stopPropagation();
							  else e.cancelBubble = true;
						});
			}
			e.cancelBubble = true;
		});
        var o=null;
		t.keydown(function(e){
			if (e.which == 13)
				return;
			if ($(".inputTemplateList").length)
				$(".inputTemplateList").remove();
			o=getIndex();
		});
		t.keyup(function(e) {
			if (e.which == 13)
				return;
			v=getIndex();
			if(v!=null && v!=o){
				showInputTemplate(v);
			}
		});
		
		function getIndex(){
			var v = t.val();
			if (v.length < 3)
				return null;
			var patt = /[,.，。！!]/g;
			var n = 0;
			var r;
			while ((r = patt.exec(v)) != null) {
				var i = patt.lastIndex;
				if (i > 0)
					n = i;
			}
			if (v.length - n < 3)
				return null;
			
			v = v.substring(n, v.length);
			return v;
		}

		/**
		 * 画图
		 */
		function showPaintWin() {
			var div = $("<div />").width(510).height(190).appendTo("body");
			paintWin = div.oimsDialog({
				title : title,
				width : 502,
				height : 300,
				locked : true,
				button : [ {
					title : language.save,
					func : paintSave,
					isCloseWin : false,
					className : "submit"
				} ]
			});
			showPaint(div);
		}
		
		function paintSave(){
			if(settings.paint.url.length==2){
				getFLASHJSONData("paintSWF_OD");// thisMovie("paintSWF_OD").paintSave();
				getFLASHJSONData("paintSWF_OS");//thisMovie("paintSWF_OS").paintSave();
			}else{
				getFLASHJSONData("paintSWF");
			}
			//return pfunc();
			return false;
			function getFLASHJSONData(swdId){
				$("#"+swdId).flash(function(){this.paintSave();});
			}
		}
		
		function showPaint(div){
			var patientId = paint.patientId;//患者ID
			var regId = paint.regId;//就诊ID
			var mrId = paint.mrId;//记录ID
			var _url = paint.url;
			var photoType = paint.photoType;
			//if(src.length>4)return;
			//alert(_url.length);
			paintLength = _url.length;
			if(_url.length==2){
				var ost=$("<div />").addClass("OSPaint").css("float","left").appendTo(div);
				var odt=$("<div />").addClass("ODPaint").css("float","left").appendTo(div);
				showSWF(_url[0],"OD",ost);
				showSWF(_url[1],"OS",odt);
			}else{
				showSWF(_url[0],null,div);
			}
			function showSWF(src,y,t){
				var params = 
				    {
						allowScriptAccess : "sameDomain",
						quality:"high",
						wmode:"transparent"
					};
				var swfID="paintSWF";
				
				if(y!=null) {
					$("<a />").text(y).appendTo(t);
					swfID+= "_"+y;
				}
				$("<p />").appendTo(t).flash({ 
			          swf: contextPath+'/swf/paint.swf',
			          id: swfID,
			          width: 251,
			          height: 195,
			          flashvars: {url:contextPath+src,eyes:y,patientId:patientId,regId:regId,saveUrl:paintSaveUrl,id:mrId,photoType:photoType,callbackFunc:"paintCallback"},
			          paremeters: params
			     });
			}
		}

		/**
		 * 显示输入模版
		 */
		function showInputTemplate(index,divcotent) {
			var div = $("<div />").css({
				top : divcotent.position().top,
				left : divcotent.position().left
			}).addClass("inputTemplateList").hide().appendTo("body");
			
			var h = $("<div />").addClass("oims_title").appendTo(div).click(function(e){
				if (e.stopPropagation) e.stopPropagation();
				  else e.cancelBubble = true;
			});
			if(findHtml){
				var divFind = $("<div />");
				divFind.click(function(e){
					if (e.stopPropagation) e.stopPropagation();
					  else e.cancelBubble = true;
				}).appendTo(div);
				
				$("<input type ='text'/>").attr("id",findHtml.textId).click(function(e){
					if (e.stopPropagation) e.stopPropagation();
					  else e.cancelBubble = true;
				}).appendTo(divFind);
				$("<input type ='button'/>").attr({"id":findHtml.btnId,"value":"查询"}).click(function(e){
					findFun();
					if (e.stopPropagation) e.stopPropagation();
					  else e.cancelBubble = true;
				}).appendTo(divFind);
			}
			
			var tag = $("<div style = 'height: 150px;overflow-x: hidden;overflow-y: auto;border: 1.5px solid #c3c3c3;'/>").appendTo(div);
			h.text(title);
			$("<span />").text("").click(function(e) {
				div.hide("slow", function() {
					div.remove();
				});							
			}).appendTo(h);
			div.hide();
			var b=false;
			$.each(d.obj, function(i, x) {
				if (index!=undefined && index != null) {
					var i0=x.index+"";
					if (i0.indexOf(index)==-1 && x.val.indexOf(index)==-1)
						return true;
				}
				
				var a = $("<a />").text(x.val).appendTo(tag);
				$(a).click(
						function(e) {
							if (index != null) {
								t.val(t.val().substring(0,
										t.val().length - index.length)
										+ x.val + ",");
								index=null;
							} else {
								t.val(t.val() + x.val + ",");
							}
							if (e.stopPropagation) e.stopPropagation();
							  else e.cancelBubble = true;
						});
				b=true;
			});
			if(!b){
				div.remove();
				return;
			}
			
			div.show("slow");
			var x = 0, y = 0, c = false;
			h.mousedown(function(e) {
				c = true;
				x = e.clientX - div.offset().left;
				y = e.clientY - div.offset().top;
			});
			$(document).mouseup(function() {
				c = false;
			});
			$(document).mousemove(function(e) {
				if (!c)
					return;
				var cx = e.clientX - x;
				var cy = e.clientY - y;
				/*if (cx + div.outerWidth() > $(window).width()
						|| cx + div.outerWidth() < 0)
					return;
				if (cy + div.outerHeight() > $(window).height()
						|| cy + div.outerHeight() < 0)
					return;*/
				div.css({
					top : cy,
					left : cx
				});
			});
			if (div.offset().top + div.outerHeight() > $(window).height())
				div.css("overflow", "auto").height(
						$(window).height() - div.offset().top - 20);
		}
	};
	
	
	$.fn.input=function(settings)
	{
			importCSS("/css/oimsInput.css");
			var t = this;
			
			
			var func = settings.tfunc;     //保存记录内容
			
			paintFunctionCallBack = settings.pfunc;   //保存画图图片
			
			var paint = settings.paint;   
			
			var title = settings.title;	   //标题
			
			var arrData = settings.templateData;//获取输入模板的url  
			
			var paintSaveUrl = contextPath+"/publish/paint/paintSave.htm";   //保存
			
			var findHtml = "null";
			if(settings.findHtml){
				findHtml = settings.findHtml;
			}
			var findFun = settings.findFun;
			
			
			var d, c = "MRDiv_BG_1";
			if (paint != undefined) {
				c = "MRDiv_BG_2";
			}
			
			t.blur(function(){
				//mrId = func();
				if(t.val().length>0){
//					alert(0);
					$(t).parent().submit();
				}
			});
			$(document).click(function(){
				$(".MRDiv_BG_2").remove();
				$(".MRDiv_BG_1").remove();	
				var className = $(".openWin")[0] && $(".openWin")[0].className;
				if(className){
					if($(".openWin")[0].className =="openWin"){
						$(".openWin").remove();
					}
				}
			});
			t.click(function(e) {
				//移除原有的模板
				$(".MRDiv_BG_2").remove();
				$(".MRDiv_BG_1").remove();
				$(".openWin").remove();		

				
				
				//创建新的模板
				var tt= $("<div />").css({
					top : e.clientY + "px",
					left : e.clientX + "px"
				}).addClass(c).appendTo("body");
				
				var mobanA = $("<a />").attr("title", "模板").addClass("MR_BT_Pen")
						.appendTo(tt).click(function(e) {
							showInputTemplateNew("",tt);
							tt.remove();
							if (e.stopPropagation) e.stopPropagation();
							  else e.cancelBubble = true;
						});
				$(this).keydown(function(){
					tt.remove();
				});
				if (paint != undefined) {
					importJS("/js/jquery.swfobject.js");
					$("<a />").attr("title", "画图")
							.addClass("MR_BT_Paint").appendTo(tt).click(function(e) {
								inputTarget = t.parent();
								showPaintWin();
								tt.remove();
								if (e.stopPropagation) e.stopPropagation();
								  else e.cancelBubble = true;
							});
				}
				if (e.stopPropagation) e.stopPropagation();
				  else e.cancelBubble = true;
			});
	        var o=null;
//			t.keydown(function(e){
//				if (e.which == 13)
//					return;
//				if ($(".openWin").length)
//					$(".openWin").remove();
//				o=getIndex();
//			});
//			t.keyup(function(e) {
//				if (e.which == 13)
//					return;
//				v=getIndex();
//				if(v!=null && v!=o){
//					showInputTemplateNew(v);
//				}
//			});
//			
			function getIndex(){
				var v = t.val();
				if (v.length < 3)
					return null;
				var patt = /[,.，。！!]/g;
				var n = 0;
				var r;
				while ((r = patt.exec(v)) != null) {
					var i = patt.lastIndex;
					if (i > 0)
						n = i;
				}
				if (v.length - n < 3)
					return null;
				
				v = v.substring(n, v.length);
				return v;
			}

			/**
			 * 画图
			 */
			function showPaintWin() {
				var div = $("<div />").width(510).height(190).appendTo("body");
				paintWin = div.oimsDialog({
					title : title,
					width : 502,
					height : 300,
					locked : true,
					button : [ {
						title : "保存",
						func : paintSave,
						isCloseWin : false,
						className : "submit"
					} ]
				});
				showPaint(div);
			}
			
			function paintSave(){
				if(settings.paint.url.length==2){
					getFLASHJSONData("paintSWF_OD");// thisMovie("paintSWF_OD").paintSave();
					getFLASHJSONData("paintSWF_OS");//thisMovie("paintSWF_OS").paintSave();
				}else{
					getFLASHJSONData("paintSWF");
				}
				//return pfunc();
				return false;
				function getFLASHJSONData(swdId){
					$("#"+swdId).flash(function(){this.paintSave();});
				}
			}
			
			function showPaint(div){
				var patientId = paint.patientId;//患者ID
				var regId = paint.regId;//就诊ID
				var mrId = paint.mrId;//记录ID
				var _url = paint.url;
				var photoType = paint.photoType;
				//if(src.length>4)return;
				//alert(_url.length);
				paintLength = _url.length;
				if(_url.length==2){
					var ost=$("<div />").addClass("OSPaint").css("float","left").appendTo(div);
					var odt=$("<div />").addClass("ODPaint").css("float","left").appendTo(div);
					showSWF(_url[0],"OD",ost);
					showSWF(_url[1],"OS",odt);
				}else{
					showSWF(_url[0],null,div);
				}
				function showSWF(src,y,t){
					var params = 
					    {
							allowScriptAccess : "sameDomain",
							quality:"high",
							wmode:"transparent"
						};
					var swfID="paintSWF";
					
					if(y!=null) {
						$("<a />").text(y).appendTo(t);
						swfID+= "_"+y;
					}
					$("<p />").appendTo(t).flash({ 
				          swf: contextPath+'/swf/paint.swf',
				          id: swfID,
				          width: 251,
				          height: 195,
				          flashvars: {url:contextPath+src,eyes:y,patientId:patientId,regId:regId,saveUrl:paintSaveUrl,id:mrId,photoType:photoType,callbackFunc:"paintCallback"},
				          paremeters: params
				     });
				}
			}

			/**
			 * 显示输入模版
			 */
			function showInputTemplateNew(index,divcotent) {
				/*if (div.offset().top + div.outerHeight() > $(window).height())
					div.css("overflow", "auto").height(
							$(window).height() - div.offset().top - 20);*/			
				
		      /*
		        *创建面板
		        */
		        var winDiv = $("<div/>").attr("class","openWin").css({width:"280px",overflow:"hidden",position:"absolute",top:divcotent.position().top + "px",left:divcotent.position().left + "px"});
		        //关闭按钮
		        var titleAclose = $("<a/>").addClass("close").click(function(e){
		            winDiv.remove();
					//$("#aa").show();
		            if (e.stopPropagation) e.stopPropagation();
					  else e.cancelBubble = true;
		        });
		        //存放关闭按钮的div
		        var titleDivClose = $("<div/>").addClass("closediv").append(titleAclose);
		        //存放标题栏的div
		        var titleDiv = $("<div/>").addClass("opentitle").css("cursor","pointer").append(titleDivClose);
		        titleDiv.append($("<span class='view'></span><a>"+title+"</a>"));
		        //是否支持拖拽
		        var c = false,x,y;
		        titleDiv.mousedown(function(e) {
		            c = true;
		            x = e.clientX - winDiv.offset().left;
		            y = e.clientY - winDiv.offset().top;
			        $(document).mouseup(function(e) {
			            c = false;
			        });
			        $(document).mousemove(function(e) {
			            if (!c)
			                return;
			            var cx = e.clientX - x;
			            var cy = e.clientY - y;
			            winDiv.css({
			                top : cy,
			                left : cx
			            });
			        });
		            if (e.stopPropagation) e.stopPropagation();
					  else e.cancelBubble = true;
		        }).click(function(e){
		            if (e.stopPropagation) e.stopPropagation();
					  else e.cancelBubble = true;
		        });
		        titleDiv.appendTo(winDiv);
		        winDiv.appendTo($(document.body));
		        
		        
		        

		        
		        
		        /*
		        *创建查询框和查询按钮
		        */
		        var cxDiv = $("<div class='checksearch'/>");
		        var cxBtn = $("<a/>").append("<span>查询</span>").click(function(e){
		        	$(".checksearchlist").scrollTop("0");
		            var txtSuo = $("#textfield").val();
		            if(txtSuo.replace(/(^\s*)|(\s*$)/g,'')==""){ return; }//值为空，退出
		            try{ var reg = new RegExp("(" + txtSuo + ")","i");}
		            catch (e){ return; }
		            var div_index=0;//记录创建的DIV的索引
		             for(var i=0;i<arr.length;i++){
		                $(arr1[i]).css("background-color","");
		             }
		            for(var i=0;i<arr.length;i++){
		                if(reg.test(arr[i])){
		                	var scrolltop = 0;
		                	for(var j = i-1;j>=0;j--){
		                		scrolltop +=  arr1[j].clientHeight;
		                	}
		                   $(arr1[i]).css("background-color","#ffeec5");
		                   if($(".checksearchlist").scrollTop() < $(".checksearchlist ul")[0].clientHeight - $(".checksearchlist")[0].clientHeight){
		                        $(".checksearchlist").scrollTop(scrolltop);
		                   }
		                   index = findIndex(arr[i]);
		                   break;
		                }
		            }
		            $("#textfield").focus();
		            if (e.stopPropagation) e.stopPropagation();
					  else e.cancelBubble = true;
		        });
		        var cxInput = $('<input type="text" name="textfield" id="textfield" onblur="this.className=\'blur\'" onfocus="this.className=\'focus\'" class="blur"  style="width:190px;"  />');
		        cxDiv.append(cxBtn).append(cxInput);
		        cxDiv.appendTo(winDiv);
				$("#textfield").focus();
				
				
				

				
		        /*
		        *填写内容
		        */
				var ctDiv = $("<div class='checksearchlist'/>");
				var ctUl = $("<ul/>");
				
		        for(var i = 0,length = arrData.length;i<length;i++){
		            if(i%2==0){
		                var li = $("<li sIndex = '"+ arrData[i][1] +"' />").text(arrData[i][0]);
		            }else{
		                var li = $("<li sIndex = '"+ arrData[i][1] +"' />").text(arrData[i][0]).addClass("bg");
		            }
		            li.appendTo(ctUl);
		        }
			
				ctDiv.append(ctUl);
				//if(ctUl[0].clientWidth > 280)
				ctDiv.appendTo(winDiv);
				if(ctUl[0].clientHeight > 280){
					$(ctDiv).css({height:"200px","overflow-x":"hidden","overflow-y": "auto"});
				}
				
				
				/*
		        *模糊查询
		        */
		        
		        //获取所有的li元素
		        var arr = [];
		        var arr1 = [];
		        var arr2 = [];
		        var liList = $(".checksearchlist ul li");
		        for(var i = 0,length = liList.length;i<length;i++){
		            arr.push(liList[i].attributes["sIndex"].value);
		            arr1.push(liList[i]);
		            arr2.push(liList[i].innerHTML);
		        }
		        //更改颜色
		        function changeClassname(length,_index){
		            for(var i=0;i<length;i++){ 
		                if(i!=_index ){        
		                    $(arr1[i]).css("background-color","");
		                }else{
		                    $(arr1[i]).css("background-color","#ffeec5");
		                    $("#textfield").val(arr[i]);
		                }
		            }
		        }
		        //查询列表索引
		        function findIndex(objStr){
		            var liIndex = -2;
		            for(var i = 0,length = arr.length;i<length;i++){
		                if(arr[i] == objStr){
		                    liIndex = i;
		                    break;
		                }
		            }
		            return liIndex;
		        }
			        
		        //查询内容索引
		        function findContentIndex(objStr){
		            var liIndexContent = -2;
		            for(var i = 0,length = arr2.length;i<length;i++){
		                if(arr2[i] == objStr){
		                	liIndexContent = i;
		                    break;
		                }
		            }
		            return liIndexContent;
		        }
		        
		        var index = -1;
		        
		        $(".checksearchlist ul").click(function(e){
		        	var tStr = t.val();
		            $("#textfield").val(e.target.attributes["sIndex"].value);
		            for(var i=0;i<arr1.length;i++){
		                $(arr1[i]).css("background-color","");
		            }
		                
		            $(e.target).css("background-color","#ffeec5");
		            index = findIndex(e.target.attributes["sIndex"].value);
		            if(index == -2){
		            	index = findContentIndex(e.target.InnerHTML);
		            }
		            $("#textfield").focus();
		            var textValue = tStr.replace(/(^\s*)|(\s*$)/g, "");
		            if(tStr == ""||textValue==null || textValue == ""){
		            	t.val(e.target.innerHTML);
		            }else{
		            	tStr += "," + e.target.innerHTML;
		            	t.val(tStr);
		            }
		            winDiv.remove();
		            t.focus();
		            var len = t.val().length;
		        	if (document.selection) {
		        		var sel = t[0].createTextRange();
		        		sel.moveStart('character', len);
		        		sel.collapse();
		        		sel.select();
		        	} else if (typeof t[0].selectionStart == 'number'
		        			&& typeof t[0].selectionEnd == 'number') {
		        		t[0].selectionStart = t[0].selectionEnd = len;
		        	}

		            if (e.stopPropagation) e.stopPropagation();
					  else e.cancelBubble = true;
		        });
		        
		        $("#textfield").keyup(function(e){
		        	
		            // 光标键"↑"
		            if(e.keyCode == 38){
		                index--;
		                if(index < 0){
		                    index = 0;
		                }
		                changeClassname(arr1.length,index);
	                	var scrolltop = 0;
	                	for(var j = index-1;j>=0;j--){
	                		scrolltop +=  arr1[j].clientHeight;
	                	}
	                    if(scrolltop < $(".checksearchlist ul")[0].clientHeight - $(".checksearchlist")[0].clientHeight){
	                        $(".checksearchlist").scrollTop(scrolltop);
	                    }
		                return;
		            }
		            //光标键"↓"
		            if(e.keyCode == 40){
		                if($(this).val() == ""){
		                    index = 0;
		                }else{
		                    index++;
		                    if(index == arr1.length){
		                        index = index -1;
		                    }
		                }
		                changeClassname(arr1.length,index);
	                	var scrolltop = 0;
	                	for(var j = index-1;j>=0;j--){
	                		scrolltop +=  arr1[j].clientHeight;
	                	}
	                    if($(".checksearchlist").scrollTop() < $(".checksearchlist ul")[0].clientHeight - $(".checksearchlist")[0].clientHeight){
	                        $(".checksearchlist").scrollTop(scrolltop);
	                    }
		                return;
		            }
		            //回车键
		            if(e.keyCode == 13){
		            	var tStr = t.val();
		                if($(this).val() != ""){
			                if($(this).val() != ""){
			                	var textValue = tStr.replace(/(^\s*)|(\s*$)/g, "");
					            if(tStr == ""||textValue==null || textValue == ""){
					            	t.val(arr2[index]);
					            }else{
					            	if(index != -1){
						            	tStr += "," + arr2[index];
						            	t.val(tStr);
					            	}
					            }
					            winDiv.remove();
					            t.focus();
					            var len = t.val().length;
					        	if (document.selection) {
					        		var sel = t[0].createTextRange();
					        		sel.moveStart('character', len);
					        		sel.collapse();
					        		sel.select();
					        	} else if (typeof t[0].selectionStart == 'number'
					        			&& typeof t[0].selectionEnd == 'number') {
					        		t[0].selectionStart = t[0].selectionEnd = len;
					        	}

			                }                    
		                }
		                return;
		            }
		            $(ctDiv).scrollTop("0");
		            var txtSuo = $(this).val();
		            if(txtSuo.replace(/(^\s*)|(\s*$)/g,'')==""){ return; }//值为空，退出
		            try{ var reg = new RegExp("(" + txtSuo + ")","i");}
		            catch (e){ return; }
		            var div_index=0;//记录创建的DIV的索引
		             for(var i=0;i<arr.length;i++){
		                $(arr1[i]).css("background-color","");
		             }
		            for(var i=0;i<arr.length;i++){
		            	index = -1;
		                if(reg.test(arr[i])){
		                	var scrolltop = 0;
		                	for(var j = i-1;j>=0;j--){
		                		scrolltop +=  arr1[j].clientHeight;
		                	}
		                   $(arr1[i]).css("background-color","#ffeec5");
		                   if($(".checksearchlist").scrollTop() < $(".checksearchlist ul")[0].clientHeight - $(".checksearchlist")[0].clientHeight){
		                        $(".checksearchlist").scrollTop(scrolltop);
		                   }
		                   index = findIndex(arr[i]);
		                   break;
		                }else if(reg.test(arr2[i])){
		                	var scrolltop = 0;
		                	for(var j = i-1;j>=0;j--){
		                		scrolltop +=  arr1[j].clientHeight;
		                	}
		                   $(arr1[i]).css("background-color","#ffeec5");
		                   if($(".checksearchlist").scrollTop() < $(".checksearchlist ul")[0].clientHeight - $(".checksearchlist")[0].clientHeight){
		                        $(".checksearchlist").scrollTop(scrolltop);
		                   }
		                   index = findContentIndex(arr2[i]);
		                   break;
		                }
		            }
		        }).click(function(e){
		        	if (e.stopPropagation) e.stopPropagation();
					  else e.cancelBubble = true;
		        });
				
		}
};
		
	
})(jQuery);

function paintCallback(data,eyes){
	var d = eval('('+data+')');
	if(d.state){
		paintCurrent++;
		paintFunctionCallBack(d,eyes);
		//inputTarget.submit();
		if(paintCurrent==paintLength){
			paintCurrent=0;
			paintWin.close();
		}
	}
}