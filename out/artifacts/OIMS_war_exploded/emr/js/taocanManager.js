var FIND_TAOCAN_PAGE_LIST_URL="/publish/taocan/findEMRTaocanPageList.htm";
var FIND_SAMPLE_URL = "/publish/jcxm/findJcxmSample.htm";
var GET_TAOCAN_URL="/publish/taocan/getEMRTaocan.htm";
var EXAM_EYE_LIST_URL = "/publish/jcxm/findJcxmList.htm";
var TEMPLATE_EMR_TAOCAN_URL="/emr/template/html/taocan.html";
var EMR_TAOCAN_SAVE_UPDATE_URL="/publish/taocan/saveEMRTaocan.htm";
var FIND_ZHIXING_KESHI_URL = "/publish/jcxm/findJcxmZhixingkeshi.htm";
var DELETE_TAOCAN_URL='/publish/taocan/deleteEMRTaocan.htm';
var EDIT_TAOCAN_URL="/publish/taocan/editEMRTaocan.htm";
var taocanBTNS;

/**
 * 套餐管理入口方法
 * 显示套餐列表
 * @param btn
 */
function showTaocanPageList(btns){
	if(btns!=null){
		taocanBTNS=btns;
	}
//	importJS("/emr/js/taocan.js");
//	importJS("/emr/js/chuzhi.js");
	pageTitle = "套餐管理";
	init();
	var advqueryDiv = $("<div/>").attr("id", "advquery").addClass("advquery").appendTo("#right");
	advqueryDiv.append("<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='18%' class='leftalign' ><input name='search' type='text' class='blurview' id='search' onfocus=\"this.className='focus'\"  onblur=\"this.className='blur'\" value='"
			+ "请输入套餐名称或医生姓名"
			+ "' size='28' /></td>"
			+ "<td width='7%'><a  href='javascript:seniorEMRTaocanSubmit();' class='search' >"
			+ "查询"// 查询
			+ "</a></td><td class='btn'></td></tr></table>");
	showMyBTNS(taocanBTNS, $("#advquery td:last"));
	
	listFactor =  {
			listObj : [ {
				title : "序号",
				key : "id"
			}, {
				title : "名称",// 名称
				key : "tcmc"
			}, {
				title : "备注",// 所属科室
				key : "beizhu"
			}, {
				title : "创建人",
				key : "xingming"
			}, {
				title : "创建日期",// 采购价格
				key : "cjsj",
				func:function(v){
					return v?formatDate(v.time):"-";
				}
			}, {
				title : "共享状态",// 设备管理员
				key : "gongxiang",
				func:function(v){
					return v?"共享":"独享";
				}
			}],
			url : contextPath + FIND_TAOCAN_PAGE_LIST_URL,
			method : "post",
			checkbox : true,
			single : true,
			data : {// data表示传的参数
				currentPage : 1,
				pageSize : getPageSize(),// Page类的方法
				tag : Math.random()
			}
		};
		var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
				.appendTo("#right");
		$(div_list).createPageList(listFactor);
		advqueryDiv.find("input#search").focusin(function(){
			if($(this).val()=="请输入套餐名称或医生姓名")$(this).val("");
		}).blur(function(){
			var val = $.trim($(this).val())
			if(!val.length){
				$(this).val("请输入套餐名称或医生姓名");
			}
		});
}

function seniorEMRTaocanSubmit(){
	var search = $("#advquery").find("input#search");
	var val = $.trim(search.val());
	var lastVal = search.data("val");
	if(val==lastVal)return;
	if(val=="请输入套餐名称或医生姓名")val=null;
	var input = $("#pageForm").find("input[name=search]");
	if(!input.length)input = $("<input />").attr("type","hidden").attr("name","search").appendTo("#pageForm");
	input.val(val);
	$("#pageForm").submit();
	search.data("val",val);
}

/**
 * 入口方法
 * 修改套餐
 */
function editTaocan(){
//	importCSS("/emr/style.css");
	var data = getCheckBoxValue();
	if(data.length!=1){
		$.oimsAlert("请选择一个套餐进行修改！");
		return;
	}
	var re = getJSONData(GET_TAOCAN_URL,{id:data[0].id},"POST");
	if(re.state){
		showEMRTaocanForm(re.obj);
	}else{
		$.oimsError("获取套餐失败！");
	}
}

/**
 * 入口方法
 * 添加套餐
 */
function addTaocan(){
	showEMRTaocanForm(null);
}

/**
 * 显示套餐表单
 * @param data
 */
function showEMRTaocanForm(data){
	var obj = showFormDialog({
		width:820,
		height:520,
		title:"套餐",
		submitCallBack:function(data){
			showTaocanPageList(null);
		},
		templateUrl:TEMPLATE_EMR_TAOCAN_URL,
		action:EMR_TAOCAN_SAVE_UPDATE_URL,
		formData:data
	});
	var table = obj.form.find("table#mingxi");
	var tr = table.find("tr:last").clone();
	table.find("tr:last").remove();
	var addBtn=obj.form.find("a#addTaocanMX");
	addBtn.click(function(){
		addTR();
	});
	if(!data)
		addBtn.click();
	else{
		$.each(data.taocanXM,function(i,d){
			addTR(d);
		});
		obj.form.find("input[name=taocanId]").val(data.id);
		if(data.gongxiang)obj.form.find("input[name=belong]").attr("checked","checked");
	}
	function addTR(xm){
		var newTR = tr.clone().appendTo(table);
		newTR.find("a.removeOne").click(function(){
			if(table.find("a.removeOne").length>1)newTR.remove();
		});
		newTR.find("input[name=xmmc]").keyup(function(){
			showTaocanItems(newTR,$(this));
		});
		newTR.find("select[name=categoryId]").change(function(){
			newTR.find("input[name=xmmc]").data("xmmc","").val("");
			newTR.find("input[name=jcxmId]").val("");
			newTR.find("input[name=count]").val("");
			newTR.find("select[name=yanbiebiaoben]").text("");
			newTR.find("select[name=zhixingkeshiSelected]").text("");
		});
		
		if(xm){
			newTR.find("select[name=categoryId]").val(xm.xmType);
			newTR.find("input[name=xmmc]").val(xm.jcxm.xmmc);
			newTR.find("input[name=jcxmId]").val(xm.xmId);
			newTR.find("input[name=count]").val(xm.shuliang);
			var select = newTR.find("select[name=yanbiebiaoben]");
			var category = xm.xmType;
			if(category == 13){
				var eyes = [{title:"双眼",value:oimsCategory.DOUBLE_EYE},{title:"右眼",value:oimsCategory.RIGHT_EYE},{title:"左眼",value:oimsCategory.LEFT_EYE}];
				$.each(eyes,function(n,v){
					$("<option />").val(v.value).text(v.title).appendTo(select);
				});
			}else if(category == 15){
				var result = getJSONData(FIND_SAMPLE_URL, {
					jcxmId : xm.xmId
				});
				if (result.state){
					$.each(result.obj, function(i, s) {
						var o = $("<option />").attr("value", s.id).text(s.sampleName)
								.appendTo(select);
					});
				}
			}else{
				$("<option />").appendTo(select);
			}
			select.val(xm.yanbiebiaoben);
			select = newTR.find("select[name=zhixingkeshiSelected]");
			select.text("");
			var location=getJSONData(FIND_ZHIXING_KESHI_URL,{jcxmId:xm.xmId});
			if (location.state){
				$.each(location.obj, function(i, n) {
					$("<option />").attr("value", n.id).text(n.bgs).appendTo(select);
				});
			}
			select.val(xm.excutiveDept);
		}
	}
}

/**
 * 显示套餐待选项
 * @param tr
 */
function showTaocanItems(tr,input){
	if(!input.val().length)return;
	var div = $("div#itemOptions");
	if(!div.length) 
		div = $("<div />").attr("id","itemOptions").css({"z-index":999,top:input.offset().top+input.outerHeight(),left:input.offset().left,width:input.outerWidth()}).addClass("itemOptions").appendTo("body");
	else
		div.text("");
	var category = parseInt(tr.find("select[name=categoryId]").val());

	var re = getJSONData(EXAM_EYE_LIST_URL,{search:input.val(),categoryId:category, currentPage:1, pageSize:100},"POST");
	if(re.state)
	$.each(re.obj,function(i,d){
		$("<a />").attr("href","javascript:void(0);").text(d.xmmc).click(function(){
			div.remove();
			input.val(d.xmmc).data("xmmc",d.xmmc);
			tr.find("input[name=jcxmId]").val(d.id);
			tr.find("input[name=count]").val(1);
			var select = tr.find("select[name=yanbiebiaoben]");
			select.text("");
			if(category == 13 || category==5){
				var eyes = [{title:"双眼",value:oimsCategory.DOUBLE_EYE},{title:"右眼",value:oimsCategory.RIGHT_EYE},{title:"左眼",value:oimsCategory.LEFT_EYE}];
				$.each(eyes,function(n,v){
					$("<option />").val(v.value).text(v.title).appendTo(select);
				});
			}else if(category==15){
				var result = getJSONData(FIND_SAMPLE_URL, {
					jcxmId : d.id
				});
				if (result.state){
					$.each(result.obj, function(i, s) {
						var o = $("<option />").attr("value", s.id).text(s.sampleName)
								.appendTo(select);
					});
					select.val(d.yanbiebiaoben);
				}
			}else{
				$("<option />").appendTo(select);
			}
			select = tr.find("select[name=zhixingkeshiSelected]");
			select.text("");
			var location=getJSONData(FIND_ZHIXING_KESHI_URL,{jcxmId:d.id});
			if (location.state){
				$.each(location.obj, function(i, n) {
					$("<option />").attr("value", n.id).text(n.bgs).appendTo(select);
				});
			}
		}).appendTo(div);
	});
	
	input.blur(function(){
		if($(this).data("xmmc")!=null){
			if($(this).val()!=$(this).data("xmmc"))$(this).val($(this).data("xmmc"));
		}else{
			$(this).val("");
		}
	});
}

/**
 * 入口方法
 * 删除套餐
 */
function delTaocan(){
	var data = getCheckBoxValue();
	if(data.length!=1){
		$.oimsAlert("请选择一个套餐！");
		return;
	}
	$.oimsConfirm("确定要删除吗？",function(){
		var re = getJSONData(DELETE_TAOCAN_URL,{id:data[0].id});
		if(re.state){
			showTaocanPageList(null);
		}else{
			$.oimsAlert("删除失败！");
		}
	});
	
}

/**
 * 设置套餐共享
 */
function endableTaocan(){
	shareEMRTaocan(true);
}

/**
 * 禁用套餐共享
 */
function disEnableTaocan(){
	shareEMRTaocan(false);
}

function shareEMRTaocan(v){
	var data = getCheckBoxValue();
	if(data.length!=1){
		$.oimsAlert("请选择一个套餐！");
		return;
	}
	if(v==data[0].gongxiang)return;
	var str = data[0].gongxiang?"确定不再共享此套餐吗？":"确定要共享此套餐吗？";
	$.oimsConfirm(str,function(){
		var re = getJSONData(EDIT_TAOCAN_URL,{id:data[0].id, belong:v},"POST");
		if(re.state){
			showTaocanPageList(null);
		}else{
			$.oimsAlert("删除失败！");
		}
	});
}

