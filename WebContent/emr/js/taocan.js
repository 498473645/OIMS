/**
 * 常用套餐 JS函数库
 * Li Yan
 */
var EMR_TAOCAN_SAVE_URL='/publish/taocan/saveEMRTaocan.htm';
var GET_TAOCAN_LIST_URL='/publish/taocan/findEMRTaocan.htm';
var DELETE_TAOCAN_URL='/publish/taocan/deleteEMRTaocan.htm';
var EDIT_TAOCAN_URL="/publish/taocan/editEMRTaocan.htm";
var update_taocan="/publish/taocan/updateEMRTaocan.htm";

/**
 * 显示套餐清单
 * @param tag1
 */
function showTaocanList(tag1){
	var combo = $("<div />").attr("id", "taocanItemDiv").css("overflow","auto").height(tag1.innerHeight() - tag1.children("h1").outerHeight()).appendTo(tag1);
	createComboItems(combo);
}

/**
 * 套餐编辑
 * @param data
 */
function editExamTaocan(data){
	var div=$('<div id="editComboName"/>');
	//提示保存陈成功或者失败
	var dialog = div.oimsDialog({
			title : "套餐修改",
			width : 233,
			height : 100,
			drag : false,
			locked :true,
			winType : 4,
			button : null
	});
	var f = $("<form />").attr("method","post").attr("action",contextPath+EDIT_TAOCAN_URL).ajaxForm({
		dataType : "json",
		beforeSubmit:function(c){
			//提交前的验证
			if(!f.children("input[name=name]").val().length)return false;
		},
		success : function(d) {
			if(!d.state){
				$.oimsError("套餐修改失败！");
				return;
			}
			$(".taocanSaveDiv").remove();
			$("#taocanItemDiv").text("");
			createComboItems($("#taocanItemDiv"));
			dialog.close();
		}
	}).appendTo(div);
	f.append('<input name="name" value="'+data.tcmc+'" style="margin-top:5px;margin-left:15px;margin-bottom:5px;float:left"/>');
	f.append('<div style="margin-top:5px;margin-left:5px;float:left"><input type="checkbox" name="belong" value="true" />&nbsp;&nbsp;&nbsp;共享</div>');
	$("<input />").attr("name","id").attr("type","hidden").val(data.id).appendTo(f);
	f.append('<div style="clear:both"/>');
	var operator=$('<div />').appendTo(div);
	$('<input type="button" class="button" value="确认" />').click(function(){
		f.submit();
	}).appendTo(operator);
	if(data.gongxiang)f.find("input[name=belong]").attr("checked","checked");
}

/**
 * 生成套餐保存操作层
 * @param obj
 */
function createSaveComboDiv(obj){
	if($('.taocanSaveDiv').length){
		if($('.taocanSaveDiv').is(":hidden"))
			$('.taocanSaveDiv').show();
		else
			$('.taocanSaveDiv').hide();
		return;
	}
	var comboList=getJSONData(GET_TAOCAN_LIST_URL,{tag:Math.random()},'POST').obj;
	var offset=obj.offset();
	var div=$('<div />').addClass("taocanSaveDiv").css({'top':offset.top+obj.height()}).appendTo(obj.parent());
	div.height($("#patientExamDiv").height()-6);
	var div_content=$('<div />').addClass("taocanListDiv").appendTo(div);
	var div_button=$('<div class="btn" />').appendTo(div);
	var input_collapse=$('<input type="button"  value="合并" class="button" />').appendTo(div_button);
	var input_add=$('<input type="button"  value="新增" class="button" />').appendTo(div_button);
	$("<div />").css({clear:"both"});
	div_content.height(div.height()-30);
	var form = $("<form />").appendTo(div_content);
	var ul=$('<ul/>').appendTo(form);
	$.each(comboList,function(i,d){
		var li=$('<li />').appendTo(ul);
		$("<input type=\"checkbox\" name=\"taocanId\" />").val(d.id).appendTo(li);
		$('<label />').html("&nbsp;"+d.tcmc).appendTo(li)
		li.toggle(function(){
			li.children("input[name=taocanId]").attr("checked","checked");
		},function(){
			li.children("input[name=taocanId]").removeAttr("checked");
		});
	});
	
	input_add.click(function(){
		var div=$('<div id="saveComboName"/>');
		//提示保存陈成功或者失败
		var dialog = div.oimsDialog({
				title : "请输入套餐名称",
				width : 233,
				height : 100,
				drag : false,
				locked :true,
				winType : 4,
				button : null
		});
		var f = $("<form />").appendTo(div);
		f.append("<input type=\"hidden\" name=\"taocanId\" />");
		f.append('<input name="tcmc" style="margin-top:5px;margin-left:15px;margin-bottom:5px;float:left"/>');
		f.append('<div style="margin-top:5px;margin-left:5px;float:left"><input type="checkbox" name="belong" value="true" />&nbsp;&nbsp;&nbsp;共享</div>');
		f.append('<div style="clear:both"/>');
		var operator=$('<div />').appendTo(div);
		$('<input type="button" class="button" value="确认" />').click(function(){
			saveTaocan(f.formSerialize(),function(){dialog.close()});
		}).appendTo(operator);
	});
	
	input_collapse.click(function(){
		var dataStr = form.formSerialize();
		saveTaocan(dataStr);
	});
	div.show();
}

/**
 * 保存套餐
 * @param dataStr
 */
function saveTaocan(dataStr,func){
	var formData = $("#patientExamDiv").children("form:visible").formSerialize();
	if(dataStr!=null)formData+="&"+dataStr;
	var data=getJSONData(EMR_TAOCAN_SAVE_URL,formData,"POST");
	if(!data.state){
		$.oimsError('保存套餐失败');
	}else{
		$.oimsSucc('保存套餐成功');
		$(".taocanSaveDiv").remove();
		$("#taocanItemDiv").text("");
		createComboItems($("#taocanItemDiv"));
		if(func!=null)func();
	}
}

/**
 * 生成套餐清单
 */
function createComboItems(tag){
	var comboList=getJSONData(GET_TAOCAN_LIST_URL,{tag:Math.random()},'POST').obj;
	var table=$('<table />').appendTo(tag);
	$.each(comboList,function(i,d){
		//console.dir(d);
		var tr = $("<tr />").hover(function(){
			$(this).children("td").addClass("on");
		}, function(){
			$(this).children("td").removeClass("on");
		}).appendTo(table);
		$("<td />").text(this.tcmc).data("data",d).click(function(){
			var data=$(this).data('data');
			//弹出选择层
			_emr_createComboDiv(data);
		}).appendTo(tr);
		if(parent.window.currentStaff.gonghao!='admin'){
			return true;
		}
		var td=$('<td />').width(30).css("text-align","center").appendTo(tr);
		$("<a />").text("修改").click(function(){
			editExamTaocan(d);
		}).appendTo(td);
		td = $('<td />').width(30).css("text-align","center").appendTo(tr);
		$("<a />").text("删除").click(function(){
			$.oimsConfirm('确定要删除整个套餐吗？',function(){
				var data = getJSONData(DELETE_TAOCAN_URL,{id:d.id});
				if(!data.state){
					$.oimsError("删除失败！");
				}else{
					$(".taocanSaveDiv").remove();
					$("#taocanItemDiv").text("");
					createComboItems($("#taocanItemDiv"));
				}
			});
		}).appendTo(td);
	});
}

/**
 * 生成对话框
 * @param data
 */
function _emr_createComboDiv(data){
	 var div=$("<div id='comboItems' />");
	 div.oimsDialog({
			title : data.tcmc+'套餐',
			width : 800,
			height : 460,
			drag : false,
			locked :true,
			winType : 4,
			button : [{
						title : "提交",//按纽文字
			         	func : function(){
			        		var tables=$('div.tabContent').children('div').children('table');
			        		$.each(tables,function(){
			        			var trs=$(this).find('tr');
			        			$.each(trs,function(){
			        				if(!$(this).index()){
			        					return true;
			        				}
			        				var input=$(this).children('td:eq(0)').children('input');
			        				if(input.attr('checked')){
			        					var d=getJSONData(findJcxmUrl,{id:input.data('id')},'POST').obj;
			        					var count=$(this).children('td:eq(2)').text();
			        					var listType=input.data('listType');
			        					var k=$(this).children('td:last').prev().prev().children('select').val();
			        					var dept=$(this).children('td:last').prev().children('select').val();
			        					if(listType==CHUZHI_CATEGORY.otherExam){
			        						addExam(d,parseInt(count),listType,null,null,null,dept);
			        					}
			        					else{
			        						addExam(d,parseInt(count),listType,null,null,k,dept);
			        					}
			        					setCHUZHI_FORM(false,listType);
			        				}
			        			});
			        		});
			        	},//响应函数
			         	isCloseWin:true,//点击后，是否关闭窗口 true关闭，false不关闭
			         	className : "ok"//指定CSS名称
			         },{
							title : "打印",//按纽文字
				         	func : function(){
				        		if(currentVisit.haoma.toUpperCase().indexOf("OIMS")!=-1){
				        			$.oimsAlert("<p style='text-align:left; text-indent:2em'>因未找到患者的挂号信息，系统仅提供病历保存功能。请在医院系统中补开全院检查及化验项目！</p>");
				        			return;
				        		}
				        		saveAndPrint=true;
				        		var tables=$('div.tabContent').children('div').children('table');
				        		$.each(tables,function(){
				        			var trs=$(this).find('tr');
				        			$.each(trs,function(){
				        				if(!$(this).index()){
				        					return true;
				        				}
				        				var input=$(this).children('td:eq(0)').children('input');
				        				if(input.attr('checked')){
				        					var d=getJSONData(findJcxmUrl,{id:input.data('id')},'POST').obj;
				        					var count=$(this).children('td:eq(2)').text();
				        					var listType=input.data('listType');
				        					var k=$(this).children('td:last').prev().prev().children('select').val();
				        					var dept=$(this).children('td:last').prev().children('select').val();
				        					if(listType==CHUZHI_CATEGORY.otherExam){
				        						addExam(d,parseInt(count),listType,null,null,null,dept);
				        					}
				        					else{
				        						addExam(d,parseInt(count),listType,null,null,k,dept);
				        					}
				        					setCHUZHI_FORM(false,listType);
				        					var b=true;
				        					$.each(listTypes,function(){
				        						if(parseInt(this)==parseInt(listType)){
				        							b=false;
				        						}
				        					});
				        					if(b){
				        						listTypes.push(listType);
				        						listTypes_combo.push(listType);
				        					}
				        				}
				        			});
				        		});
				        		comboSubmit=true;
				        		$.each(listTypes,function(){
				        			var lt=this;
				        			$.each($("#examListDiv .deptList").children('ul').children('li').children('a'),function(){
				        				if(parseInt($(this).data('listType'))==parseInt(lt)){
				        					$(this).click();
				        					return false;
				        				}
				        			});
				        			//保存并打印相应类型处置
				        			chuzhiFormSubmit();
				        			//TODO 从listTypes中移除掉此type,下次不用再提交
				        			listTypes.shift();
				        			//先提交第一个
				        			return false;
				        		});
				        	},//响应函数
				         	isCloseWin:true,//点击后，是否关闭窗口 true关闭，false不关闭
				         	className : "print"//指定CSS名称
				         },{
				        	 title:"保存",
				        	 isCloseWin:true,
				        	 className:"ok",
				        	 func:function(){
				        			var tables=$('div.tabContent').children('div').children('table');
				        			var ary=[];
				        			$.each(tables,function(){
				        				var trs=$(this).find('tr');
				        				$.each(trs,function(){
				        					if(!$(this).index()){
				        						return true;
				        					}
				        					var input=$(this).children('td:eq(0)').children('input');
				        					var id=input.data("taocanxmid");
				        					var k=$(this).children('td:last').prev().prev().children('select').length?$(this).children('td:last').prev().prev().children('select').val():null;
				        					var dept=$(this).children('td:last').prev().children('select').val();
				        					var obj={};
				        					obj["id"]=id;
				        					obj["yanbiebiaoben"]=k;
				        					obj["dept"]=dept;
				        					ary.push(obj);
				        				});
				        			});
				        			if(ary.length)
				        			var data=getJSONData(update_taocan,{ary:JSON.stringify(ary)},'POST');
				        			if(data.state){
				        				$.oimsSucc("套餐项目保存成功");
				        				$(".taocanSaveDiv").remove();
				        				$("#taocanItemDiv").text("");
				        				createComboItems($("#taocanItemDiv"));
				        			}else{
				        				$.oimsError("套餐项目保存失败");
				        			}
				        			
				        		}
				         }
			]
		});
//	 div.css({'height':'508px'});
	 _emr_createComboItems(data);
}

/**
 * 生成套餐项目清单
 * @param data
 */
function _emr_createComboItems(data){
	var taocanXM=data.taocanXM;
	var div=$("<div />").addClass("tabContent").appendTo($('#comboItems'));
	$('<h1/>').text('特检/科外/化验/治疗项目').appendTo(div);
	var comboDiv=$("<div />").appendTo(div);
	var comboTable=$('<table style="margin:auto;border-collapse:collapse; text-align:center;">').appendTo(comboDiv);
	var tr=$('<tr />').appendTo(comboTable);
	$('<th style="width:50px"/>').text('选择').appendTo(tr);
	$('<th />').width(400).text('项目名称').appendTo(tr);
	$('<th style="width:50px"/>').text('数量').appendTo(tr);
	$('<th style="width:80px"/>').text('眼别/标本').appendTo(tr);
	$('<th style="width:100px"/>').text('执行科室').appendTo(tr);
	$("<th />").width(40).appendTo(tr);
	$.each(taocanXM,function(i,d){
		var jcxm=getJSONData(findJcxmUrl,{id:this.xmId},'POST').obj;
		var obj=this;
		var tr0=$('<tr/>').appendTo(comboTable);
		var location;
		if(jcxm.categoryId==oimsCategory.TE_SHU_JIAN_CHA){
			var td0=$('<td />').appendTo(tr0);
			$('<input type="checkbox" name="comboCheckBoxItems" />').appendTo(td0).attr('checked','checked').data('listType',CHUZHI_CATEGORY.eyeExam).data('id',this.xmId).data('taocanxmid',this.id);
			td0=$('<td />').text(jcxm.xmmc).appendTo(tr0);
			td0=$('<td />').text(obj.shuliang).appendTo(tr0);
			td0=$('<td />').appendTo(tr0);
			var select=$('<select/>').appendTo(td0);
			$("<option />").val(oimsCategory.DOUBLE_EYE).text("双眼").appendTo(select);
			$("<option />").val(oimsCategory.LEFT_EYE).text("左眼").appendTo(select);
			$("<option />").val(oimsCategory.RIGHT_EYE).text("右眼").appendTo(select);
			select.val(taocanXM.yanbiebiaoben);
			td0=$('<td />').appendTo(tr0);
			select=$('<select />').appendTo(td0);
			location=getJSONData(FIND_ZHIXING_KESHI_URL,{jcxmId:this.xmId});
			if (location.state){
				$.each(location.obj, function(i, n) {
					var o = $("<option />").attr("value", n.id).text(n.bgs).appendTo(select);
					if (n.id == d.excutiveDept)
						o.attr("selected", "selected");
				});
//			var o = $("<option />").attr("value", location.obj.id).text(location.obj.weizhi).appendTo(select).attr('selected','selected');
			}
		}else if(jcxm.bianma.indexOf('EXAM')!=-1){
			var td0=$('<td />').appendTo(tr0);
			$('<input type="checkbox" name="comboCheckBoxItems" />').appendTo(td0).attr('checked','checked').data('listType',CHUZHI_CATEGORY.otherExam).data('id',this.xmId).data('taocanxmid',this.id);
			td0=$('<td />').text(jcxm.xmmc).appendTo(tr0);
			td0=$('<td />').text(obj.shuliang).appendTo(tr0);
			td0=$('<td />').appendTo(tr0);//不存在眼别
			td0=$('<td />').appendTo(tr0);//执行科室
			select=$('<select />').appendTo(td0);
			result = getJSONData(FIND_ZHIXING_KESHI_URL, {
				jcxmId : this.xmId,
				tag:Math.random()
			});
			if (!result.state || !result.obj.length)
				return;
			$.each(result.obj, function(i, n) {
				var o = $("<option />").attr("value", n.id).text(n.bgs).appendTo(select);
				if (n.id == d.excutiveDept)
					o.attr("selected", "selected");
			});
		}else if(jcxm.bianma.indexOf('LIS')!=-1){
			var td0=$('<td />').appendTo(tr0);
			$('<input type="checkbox" name="comboCheckBoxItems" />').appendTo(td0).attr('checked','checked').data('listType',CHUZHI_CATEGORY.labTest).data('id',this.xmId).data('taocanxmid',this.id);
			td0=$('<td />').text(jcxm.xmmc).appendTo(tr0);
			td0=$('<td />').text(obj.shuliang).appendTo(tr0);
			td0=$('<td />').appendTo(tr0);
			var select=$('<select/>').appendTo(td0);
			var result = getJSONData(FIND_SAMPLE_URL, {
				jcxmId : obj.xmId
			});
			if (result.state){
				$.each(result.obj, function(i, s) {
					var o = $("<option />").attr("value", s.id).text(s.sampleName)
							.appendTo(select);
				});
				select.val(d.yanbiebiaoben);
			}
				
			td0=$('<td />').appendTo(tr0);
			select=$('<select />').appendTo(td0);
			result = getJSONData(FIND_ZHIXING_KESHI_URL, {
				jcxmId : this.xmId,
				tag:Math.random()
			});
			if (!result.state || !result.obj.length)
				return;
			$.each(result.obj, function(i, n) {
				var o = $("<option />").attr("value", n.id).text(n.bgs).appendTo(select);
				if (n.id == d.excutiveDept)
					o.attr("selected", "selected");
			});
		}else if(jcxm.categoryId==CHUZHI_CATEGORY.treat){
				var td0=$('<td />').appendTo(tr0);
				$('<input type="checkbox" name="comboCheckBoxItems" />').appendTo(td0).attr('checked','checked').data('listType',CHUZHI_CATEGORY.treat).data('id',this.xmId).data('taocanxmid',this.id);
				td0=$('<td />').text(jcxm.xmmc).appendTo(tr0);
				td0=$('<td />').text(obj.shuliang).appendTo(tr0);
				td0=$('<td />').appendTo(tr0);
				var select=$('<select/>').appendTo(td0);
				$("<option />").val(oimsCategory.DOUBLE_EYE).text("双眼").appendTo(select);
				$("<option />").val(oimsCategory.LEFT_EYE).text("左眼").appendTo(select);
				$("<option />").val(oimsCategory.RIGHT_EYE).text("右眼").appendTo(select);
				select.val(d.yanbiebiaoben);
				td0=$('<td />').appendTo(tr0);
				select=$('<select />').appendTo(td0);
				$("<option />").attr("value",130).text('眼科治疗室').appendTo(select).attr('selected','selected');
		}
		var mtd = $("<td />").appendTo(tr0);
		if(parent.window.currentStaff.gonghao=='admin'){
			$("<a />").click(function(){
			$.oimsConfirm("确定要从套餐中移除此项吗？",function(){
				var data = getJSONData(DELETE_TAOCAN_URL,{tcxmId:d.id});
				if(!data.state)
					$.oimsError("删除失败！");
				else{
					tr0.remove();
					$(".taocanSaveDiv").remove();
					$("#taocanItemDiv").text("");
					createComboItems($("#taocanItemDiv"));
				}
			});
		}).text("删除").appendTo(mtd);	
		}
		
	});
	/*div = $("<div style='height:"+($('#comboItems').height()-$('#comboItems').children('div:eq(0)').height())+"px;padding-top:5px' />").addClass("openbutton").appendTo($('#comboItems'));
	$("<a><span class=\"advsumit\"></span>提交</a>").click(function(){
		var tables=$('div.tabContent').children('div').children('table');
		$.each(tables,function(){
			var trs=$(this).find('tr');
			$.each(trs,function(){
				if(!$(this).index()){
					return true;
				}
				var input=$(this).children('td:eq(0)').children('input');
				if(input.attr('checked')){
					var d=getJSONData(findJcxmUrl,{id:input.data('id')},'POST').obj;
					var count=$(this).children('td:eq(2)').text();
					var listType=input.data('listType');
					var k=$(this).children('td:last').prev().prev().children('select').val();
					var dept=$(this).children('td:last').prev().children('select').val();
					if(listType==CHUZHI_CATEGORY.otherExam){
						addExam(d,parseInt(count),listType,null,null,null,dept);
					}
					else{
						addExam(d,parseInt(count),listType,null,null,k,dept);
					}
					setCHUZHI_FORM(false,listType);
				}
			});
		});
		$('div.closediv').children('a').click();
	}).appendTo(div);
	$("<a><span class=\"advsumit\"></span>打印</a>").click(function(){
		if(currentVisit.haoma.toUpperCase().indexOf("OIMS")!=-1){
			$.oimsAlert("<p style='text-align:left; text-indent:2em'>因未找到患者的挂号信息，系统仅提供病历保存功能。请在医院系统中补开全院检查及化验项目！</p>");
			return;
		}
		saveAndPrint=true;
		var tables=$('div.tabContent').children('div').children('table');
		$.each(tables,function(){
			var trs=$(this).find('tr');
			$.each(trs,function(){
				if(!$(this).index()){
					return true;
				}
				var input=$(this).children('td:eq(0)').children('input');
				if(input.attr('checked')){
					var d=getJSONData(findJcxmUrl,{id:input.data('id')},'POST').obj;
					var count=$(this).children('td:eq(2)').text();
					var listType=input.data('listType');
					var k=$(this).children('td:last').prev().prev().children('select').val();
					var dept=$(this).children('td:last').prev().children('select').val();
					if(listType==CHUZHI_CATEGORY.otherExam){
						addExam(d,parseInt(count),listType,null,null,null,dept);
					}
					else{
						addExam(d,parseInt(count),listType,null,null,k,dept);
					}
					setCHUZHI_FORM(false,listType);
					var b=true;
					$.each(listTypes,function(){
						if(parseInt(this)==parseInt(listType)){
							b=false;
						}
					});
					if(b){
						listTypes.push(listType);
						listTypes_combo.push(listType);
					}
				}
			});
		});
		comboSubmit=true;
		$.each(listTypes,function(){
			var lt=this;
			$.each($("#examListDiv .deptList").children('ul').children('li').children('a'),function(){
				if(parseInt($(this).data('listType'))==parseInt(lt)){
					$(this).click();
					return false;
				}
			});
			//保存并打印相应类型处置
			chuzhiFormSubmit();
			//TODO 从listTypes中移除掉此type,下次不用再提交
			listTypes.shift();
			//先提交第一个
			return false;
		});
		$('div.closediv').children('a').click();
	}).appendTo(div);
	$("<a><span class=\"advsumit\"></span>保存</a>").click(function(){
		var tables=$('div.tabContent').children('div').children('table');
		var ary=[];
		$.each(tables,function(){
			var trs=$(this).find('tr');
			$.each(trs,function(){
				if(!$(this).index()){
					return true;
				}
				var input=$(this).children('td:eq(0)').children('input');
				var id=input.data("taocanxmid");
				var k=$(this).children('td:last').prev().prev().children('select').length?$(this).children('td:last').prev().prev().children('select').val():null;
				var dept=$(this).children('td:last').prev().children('select').val();
				var obj={};
				obj["id"]=id;
				obj["yanbiebiaoben"]=k;
				obj["dept"]=dept;
				ary.push(obj);
			});
		});
		if(ary.length)
		var data=getJSONData(update_taocan,{ary:JSON.stringify(ary)},'POST');
		if(data.state){
			$.oimsSucc("套餐项目保存成功");
			$(".taocanSaveDiv").remove();
			$("#taocanItemDiv").text("");
			createComboItems($("#taocanItemDiv"));
		}else{
			$.oimsError("套餐项目保存失败");
		}
		
	}).appendTo(div);*/
}
