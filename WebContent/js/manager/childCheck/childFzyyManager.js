function childFzyyList(btns){
	pageTitle = "复诊预约";
	init();
	var div_advquery = $("<div/>").attr("id", "advquery").addClass("advquery")
			.appendTo("#right");
	var fzyytemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+"<td width='10%' align='left'><input name='search' type='text' class='blurview' id='search' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"
			+ "请输入姓名或病历号"
			+ "' size='28' /></td>"
			+"<td width='10%' align='left'><a href='javascript:queryFzyy()' class='search'>查询</a></td>"
			+"<td width='60%'></td>"
			+"<td width='20%' nowrap='nowrap'><div class='btn'><a href='javascript:addSFJL();' ><span class='adda'></span>随访记录</a></div></td>"
			+ "</tr>"
			+ "</table>";
	$(fzyytemplate).appendTo($(div_advquery));
	btnProwerConfig(btns);//按钮加上权限
	   $("#search").click(function() {
			clearInitQuery(this);
		});// 点击清空输入框文字
		$("#search").blur(function() {
			if (this.value == "") {
				$("#search").val("请输入姓名或病历号");
				$("#search").addClass("blurview");
			}

		});
	showFzyyList();// 办公室信息列表
	
}
function showFzyyList(){
	listFactor = {
			listObj : [ {
				title : "患者姓名",
				key : "name"
			}, {
				title :"出生日期",
				key : "birthday",
				func:function(value){return value.toString().substring(0,11);}
			}, { 
				title : "预约日期",
				key : "yyrq",
				func:function(value){return value.toString().substring(0,11);}
			}, {
				title:"诊别",
				key: "yyzb",
				func : function(value) {
					return (value == 2) ? "门诊"
							:((value==3)?"住院":"急诊");
				}
			}, {
				title:"预检项目",
				key:"yjxm",
				func: function(value){
					var v=value.split(",");
					var str="";
					for(var i=0;i<v.length;i++){
						if(v[i]==56){
							str+=(i!=0?",":"")+"A超";
						}
						else if(v[i]==78){
							str+=(i!=0?",":"")+"眼压";
						}
						else if(v[i]==83){
							str+=(i!=0?",":"")+"P超";
						}
						else if(v[i]==84){
							str+=(i!=0?",":"")+"屈光";
						}
						else if(v[i]==85){
							str+=(i!=0?",":"")+"体格检查";
						}
					}
					return str;
				}
			}, {
				title:"手机",
				key:"mobile"
			}, {
				title:"预约情况",
				key:"yyqk"
				
			}, {
				title:"诊断记录",
				key:"zdjl"
			}, {
				title:"手术记录",
				key:"ssjl"
			}, {
				title:"标识",
				key:"biaoshi",
				func:function(value){
					if(value==60201){
						return "未随访";
					}
					else if(value==60202){
						return "已随访";
					}
				}
			}
		],
			url : contextPath + "/publish/child/showFzyyjl.htm",// url
			method : "post",
			checkbox : true,
			single : true,
			data : {// data表示传的参数
				currentPage : 1,
				pageSize : getPageSize(),// Page类的方法
				tag : Math.random()
			}
		};
		var div_list = $("<div />").attr("id", "div_list").attr("class", "list")
				.appendTo("#right");// 创建div_list添加到div_right
		$("#div_list").createPageList(listFactor);
}
function queryFzyy(){
	var obj = {
			search : $("#search").val().indexOf("请输入") != -1 ? "" : $("#search")
					.val()
		};
		$.extend(listFactor.data, obj);
		$("#div_list").createPageList(listFactor);
}
function addFzyyjl(){}



//-----随诊预约


function szyy(){
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert(language.CheckOneItem_Alert);
		return ;
	}
	if (dataObjects.length >1) {
		$.oimsAlert(language.OnlyOpOneData);
		return ;
	}
	var table="<div align='center'>"
	  +"<table width='50%'>"
	    +"<tr>"
	      +"<td width='10%'>"+"</td>"
	      +"<td width='15%'>"+"<div align='right'>"+"姓名："+"</div>"+"</td>"
	      +"<td width='20%'>"
	      	+"<input type='text' id='name' name='name' disabled='disabled' value=''/>"
	      +"</td>"
	      +"<td width='15%'>"+"<div align='right'>"+"性别："+"</div>"+"</td>"
	      +"<td width='30%'>"
	      	+"<div align='left'>"
	      	  +"<input type='radio' id='sex' name='sex' value='1' checked='checked' disabled='disabled'/>"+"男"
	        +"<input type='radio' id='sex' name='sex' value='0'  disabled='disabled'/>"+"女"+"</div>"+"</td>"
	      +"<td width='10%'>"+"</td>"
	    +"</tr>"
	    +"<tr>"
	      +"<td>"+"</td>"
	      +"<td>"+"<div align='right'>"+"病历号："+"</div>"+"</td>"
	      +"<td>"
	      	+"<input type='text' id='patientId' name='patientId' disabled='disabled' value=''/>"
	      +"</td>"
	      +"<td>"+"<div align='right'>"+"出生日期:"+"</div>"+"</td>"
	      +"<td>"
	      	+"<input type='text' id='birthday' name='birthday' disabled='disabled' value=''/>"
	      +"</td>"
	      +"<td>"+"</td>"
	    +"</tr>"
	    +"<tr>"
	      +"<td>"+"</td>"
	      +"<td colspan='4'>"+"<hr/>"+"</td>"
	      +"<td>"+"</td>"
	    +"</tr>"
	    +"<tr>"
	  	  +"<td>"+"</td>"
	      +"<td>"+"<div align='right'>"+"预约日期："+"</div>"+"</td>"
	      +"<td>"
	      	+"<input type='text' id='yyrq' name='yyrq'  />"
	      +"</td>" 
	      +"<td>"+"<div align='right'>"+"预约诊别："+"</div>"+"</td>"
	      +"<td>"
	      	+"<div align='left'>"
	      	  +"<input type='radio' id='yyzb' name='yyzb' value='2' checked='checked'/>"+"门诊"
	          +"<input type='radio' id='yyzb' name='yyzb' value='3' />"+"住院"+
	          "<input type='radio' id='yyzb' name='yyzb' value='60150' />"+"急诊"+
	  "</div>"+"</td>"
	      +"<td>"+"</td>"
	    +"</tr>"
	    +"<tr>"
	      +"<td colspan='6' height='3'>"+"</td>"
	    +"</tr>"
	    +"<tr>"
	      +"<td>"+"</td>"
	      +"<td>"+"<div align='right'>"+"预检项目："+"</div>"+"</td>"
	      +"<td colspan='3'>"
	      	+"<div align='left'>"
	      	  +"<input type='checkbox' id='yjxm' name='yjxm' value='56'/>"+"A超&nbsp;&nbsp;"
	          +"<input type='checkbox' id='yjxm' name='yjxm' value='78'/>"+"眼压&nbsp;&nbsp;"
	          +"<input type='checkbox' id='yjxm' name='yjxm' value='83'/>"+"P超&nbsp;&nbsp;"
	          +"<input type='checkbox' id='yjxm' name='yjxm' value='84'/>"+"屈光&nbsp;&nbsp;"
	          +"<input type='checkbox' id='yjxm' name='yjxm' value='85'/>"+"体格检查"+"</div>"+"</td>"
	      +"<td>"+"</td>"
	    +"</tr>"
	    +"<tr>"
	      +"<td colspan='6' height='3'>"+"</td>"
	    +"</tr>"
	    +"<tr>"
	      +"<td>"+"</td>"
	      +"<td>"+"<div align='right'>"+"用药情况："+"</div>"+"</td>"
	      +"<td colspan='3'>"
	      	+"<textarea style='width:95%; height:auto' id='yyqk' name='yyqk'>"+"</textarea>"
	      +"</td>"
	      +"<td>"+"</td>"
	    +"</tr>"
	    +"<tr>"
	      +"<td>"+"</td>"
	      +"<td>"+"<div align='right'>"+"诊断记录："+"</div>"+"</td>"
	      +"<td colspan='3'>"
	      	+"<textarea style='width:95%; height:auto' id='zdjl' name='zdjl'>"+"</textarea>"
	      +"</td>"
	      +"<td>"+"</td>"
	    +"</tr>"
	    +"<tr>"
	      +"<td>"+"</td>"
	      +"<td>"+"<div align='right'>"+"手术记录："+"</div>"+"</td>"
	      +"<td colspan='3'>"
	      	+"<textarea style='width:95%; height:auto' id='ssjl' name='ssjl'>"+"</textarea>"
	      +"</td>"
	      +"<td>"+"</td>"
	    +"</tr>"
	  +"</table>"
	+"</div>";
	var data = getJSONData("/publish/child/findHzxxAndFzyyByHzidAndJzid.htm", {
		huanzheid : dataObjects[0].huanzheID, // 患者id
		jiuzhenid : dataObjects[0].jiuzhenID,
		tag : Math.random()
	}, "post");
	var szyy = oimsFormWindow({
		id : "szyyForm",		//-----------↓ 不明白路径
		url : contextPath + "/publish/child/saveOrUpdateFuZhenYuYue.htm",
		dialogTitle : "随诊预约",
		height : 300,
		width : 600,
		resetForm:function(){resetSzyyForm(data.state,data.obj);},
		btnOkSuccess : function(data, responseText, statusText) {
//			$.oimsSucc("录入成功");		//录入成功
//			szyy.parent().parent().remove();			
			if(data.state==1){
				$.oimsSucc("添加成功");
				
			}
			else{
				$.oimsSucc("修改成功");
				
			}
			szyy.parent().parent().remove();
		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
			$.oimsError("录入失败");		//录入失败

		},
		btnOkBefor : szyyFormValidate	//表单非空验证
	});
	szyy.append($(table)).append($("<input type='hidden' name='jiuzhenID' id='jiuzhenID' />")).append($("<input type='hidden' name='huanzheID' id='huanzheID'>"));
	calendarFun("yyrq");
	
	if (data.state) {
		map=data.obj;
		$("#name").val(map.hzxx.xingming);
		$("input[type='radio'][name='sex'][value='"+(map.hzxx.xingbie==true?"1":"0")+"']").attr("checked","checked");
		$("#patientId").val(map.hzxx.binglihao);
		$("#birthday").val(time(map.hzxx.shengri).format_yyyy_mm_dd());
		$("#jiuzhenID").val(dataObjects[0].jiuzhenID);
		$("#huanzheID").val(dataObjects[0].huanzheID);
		if(data.state==1){
			//第一次添加，添加fzyy信息
			
		}
		else{
			//第二次更新，更新fzyy信息
			$("#yyrq").val(time(map.fzyy.yyrq).format_yyyy_mm_dd());
			$("input[type='radio'][name='yyzb'][value='"+(map.fzyy.yyzb==2?"2":(map.fzyy.yyzb==3?"3":"60150"))+"']").attr("checked","checked");
			var yjxm=$("input[type='checkbox'][name='yjxm']");
		
			var yjxmdata=map.fzyy.yjxm.split(",");
		
			for(var i=0;i<yjxm.length;i++){
				for(var j=0;j<yjxmdata.length;j++){
				
					if(yjxmdata[j]==$(yjxm[i]).val()){
						$(yjxm[i]).attr("checked","checked");
					}
				}
			}
		
			$("#yyqk").val(map.fzyy.yyqk);
			$("#zdjl").val(map.fzyy.zdjl);
			$("#ssjl").val(map.fzyy.ssjl);
			
		}
		
	}
	else{
		$.oimsAlert("数据库连接错误");
	}
}

//重置
function resetSzyyForm(state,map){
	//如果是第一次添加
	if(state==1){
		$("#yyrq").val("");
		$("input[type='radio'][name='yyzb'][value='2']").attr("checked","checked");
		var yjxm=$("input[type='checkbox'][name='yjxm']");
		for(var i=0;i<yjxm.length;i++){
			$(yjxm[i]).removeAttr("checked");
		}
		$("#yyqk").val("");
		$("#zdjl").val("");
		$("#ssjl").val("");
	}
	//如果是第二次添加
	else if (state==2){
		$("#yyrq").val(time(map.fzyy.yyrq).format_yyyy_mm_dd());
		$("input[type='radio'][name='yyzb'][value='"+(map.fzyy.yyzb==2?"2":(map.fzyy.yyzb==3?"3":"60150"))+"']").attr("checked","checked");
		var yjxm=$("input[type='checkbox'][name='yjxm']");
	
		var yjxmdata=map.fzyy.yjxm.split(",");
		for(var i=0;i<yjxm.length;i++){
			$(yjxm[i]).removeAttr("checked");
		}
		for(var i=0;i<yjxm.length;i++){
			for(var j=0;j<yjxmdata.length;j++){
			
				if(yjxmdata[j]==$(yjxm[i]).val()){
					$(yjxm[i]).attr("checked","checked");
				}
			}
		}
	
		$("#yyqk").val(map.fzyy.yyqk);
		$("#zdjl").val(map.fzyy.zdjl);
		$("#ssjl").val(map.fzyy.ssjl);
	}
}


//
function szyyFormValidate(){
	if($("#yyrq").val()==""){
		$.oimsAlert("预约日期不能为空");
		return false;
	}
	return true;
}


//复诊预约记录添加随访记录
function addSFJL(){
	var dataObjects = getCheckBoxValue();
	if (dataObjects.length == 0) {
		$.oimsAlert(language.CheckOneItem_Alert);
		return ;
	}
	if (dataObjects.length >1) {
		$.oimsAlert(language.OnlyOpOneData);
		return ;
	}
	var table="<table width='600'  cellspacing='0' cellpadding='0'>"
  +"<tr>"
    +"<td width='10%' align='right'>"+"姓名:"+"</td>"
    +"<td width='20%' align='left'>"+"<input type='text' name='name' id='name' disabled='disabled' />"+"</td>"
    +"<td width='10%'>"+"</td>"
    +"<td width='10%' align='right'>"+"性别:"+"</td>"
    +"<td width='20%' align='left'>"+"<input type='radio' disabled='disabled' name='sex' value='1' />"+"男"+"<input type='radio' disabled='disabled' name='sex' value='0' />"+"女"+"</td>"
  +"</tr>"
  +"<tr>"
    +"<td width='10%' align='right'>"+"出生日期:"+"</td>"
    +"<td width='20%' align='left'>"+"<input type='text' name='birthday' id='birthday' disabled='disabled' />"+"</td>"
    +"<td width='10%'>"+"</td>"
    +"<td width='10%' align='right'>"+"随访方式:"+"</td>"
    +"<td width='20%' align='left'>"+"<input type='radio' name='sffs' checked='checked'  value='1'/>"+"短信"+"<input type='radio' name='sffs'  value='2' />"+"电话"+"</td>"
  +"</tr>"
  +"<tr>"
    +"<td width='10%' align='right'>"+"备注"+"</td>"
    +"<td colspan='4'>"+"<input type='textarea' name='beizhu' id='beizhu' style='width:95%;height:auto' />"+"</td>"
    +"</tr>"
+"</table>";
	var data = getJSONData("/publish/child/findHzxxAndSfjlByHzidAndFzyyid.htm", {
		huanzheid : dataObjects[0].huanzheID, // 患者id
		fzyyid : dataObjects[0].fzyyID,//复诊预约id
		tag : Math.random()
	}, "post");
	var sfjl= oimsFormWindow({
		id : "sfjlForm",		//-----------↓ 不明白路径
		url : contextPath + "/publish/child/saveOrUpdateSFJL.htm",
		dialogTitle : "随访记录",
		height : 300,
		width : 600,
		resetForm:function(){resetSfjlForm(data.state,data.obj);},
		btnOkSuccess : function(data, responseText, statusText) {
//			$.oimsSucc("录入成功");		//录入成功
//			szyy.parent().parent().remove();			
			if(data.state==1){
				$.oimsSucc("添加成功");
				showFzyyList();
			}
			else{
				$.oimsSucc("修改成功");
				showFzyyList();
			}
			sfjl.parent().parent().remove();
		},
		btnOkError : function(jqXHR, textStatus, errorThrown) {
			$.oimsError("录入失败");		//录入失败

		},
		btnOkBefor : sfjlFormValidate	//表单非空验证
	});
	sfjl.append($(table)).append($("<input type='hidden' name='fzyyID' id='fzyyID' />")).append($("<input type='hidden' name='huanzheID' id='huanzheID'>"));
	
	
	if (data.state) {
		map=data.obj;
		$("#name").val(map.hzxx.xingming);
		$("input[type='radio'][name='sex'][value='"+(map.hzxx.xingbie==true?"1":"0")+"']").attr("checked","checked");
		
		$("#birthday").val(time(map.hzxx.shengri).format_yyyy_mm_dd());
		$("#fzyyID").val(dataObjects[0].fzyyID);
		$("#huanzheID").val(dataObjects[0].huanzheID);
		if(data.state==1){
			//第一次添加，添加fzyy信息
			
		}
		else{
			//第二次更新，更新fzyy信息
			$("input[type='radio'][name='sffs'][value='"+map.fzyyjl.sffs+"']").attr("checked","checked");
			$("#beizhu").val(map.fzyyjl.beizhu);
			
		}
		
	}
	else{
		$.oimsAlert("数据库连接错误");
	}
	
}
//随访记录重置
function resetSfjlForm(state,map){
	if(state==1){
		$("input[type='radio'][name='sffs'][value='1']").attr("checked","checked");
		$("#beizhu").val("");
	}
	else if(state==2){
		$("input[type='radio'][name='sffs'][value='"+map.fzyyjl.sffs+"']").attr("checked","checked");
		$("#beizhu").val(map.fzyyjl.beizhu);
	}
}
//随访记录验证
function sfjlFormValidate(){}