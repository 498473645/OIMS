var huanerListUrl = contextPath + "/publish/child/getChildList.htm";
var urlFindHZXX =  contextPath + "/publish/child/findHzxxById.htm";
var pcao;
/*
 * @author andy
 * right界面构造
 */
  function childListReady(btns){
	    pageTitle="患儿信息列表";
	    init();
	 var div_advquery =  $("<div/>").attr("id", "advquery").addClass("advquery").appendTo("#right");
	    var childTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='12%' class='leftalign' ><input name='search' type='text' class='blurview' id='search' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"
			+ child_language.inputPatentIdOrName
			+ "' size='28' /></td>"
			+ "<td width='5%'><a  href='javascript:queryHuanerList();' class='search'>"+child_language.Query+"</a></td>"
			+ " <td width='5%'></td>"
			+ "<td width='78%' >"
			+ "<div class='btn'>"
			+ "<a  href='javascript:updateChildRegistration();'><span class='adda'></span>"
			+ child_language.Modify
			+ "</a>"
			+ "<a  href='javascript:addTGJCTable();' class='four'><span class='adda'></span>"
			+ child_language.Physicalexamination
			+ "</a>"
			+ "<a  href='javascript:addYanYa1();'><span class='adda'></span>"
			+ child_language.YanYa
			+ "</a>"
			+ "<a  href='javascript:addQuGuang();'><span class='adda'></span>"
			+ child_language.YanGuang
			+ "</a>"
			+ "<a  href='javascript:addPCao();' class='four'><span class='adda'></span>"
			+ child_language.pchao
			+ "</a>"
			+ "<a  href='javascript:addAChao();' class='four'><span class='adda'></span>"
			+ child_language.achao
			+ "</a>"
			+ "<a  href='javascript:addJiBing();' class='four'><span class='adda'></span>"
			+ child_language.yandizhaoxiang
			+ "</a>"
			+ "<a  href='javascript:bingLi();'><span class='adda'></span>"
			+ child_language.bingli
			+ "</a>"
			+ "<a  href='javascript:showImportChildDia();'><span class='adda'></span>"
			+ child_language.Import
			+ "</a>"
			+ "<a  href='javascript:exportChild();'><span class='adda'></span>"
			+ child_language.Export
			+ "</a>"
			+ "<a  href='javascript:szyy();' class='four'><span class='adda'></span>"
			+ child_language.suizhenyuyue
			+ "</a>"
			+ "<a  href='javascript:getReport();' class='four'><span class='adda'></span>"
			+ "出报告"
			+ "</a>"
			+ "</div>"
			+ "</td>"
			+ "</tr>"
			+ "</table>";
	    btnProwerConfig(btns);
	    showHzList_andy() ;
	    $(childTemplate).appendTo(div_advquery);
	    $("#search").click(function() {
			clearInitQuery(this);
		});// 点击清空输入框文字
		$("#search").blur(function() {
			if (this.value == "") {
				$("#search").val(child_language.inputPatentIdOrName);
				$("#search").addClass("blurview");
			}

		});
      };
      /**
       * @author andy
       * 按照条件查询患儿信息
       */
      function queryHuanerList(){
    	  var pm = {};
    	  var search = $("#search").val();
    	  search =search==child_language.inputPatentIdOrName?"":$("#search").val();
    	  $.extend(pm,{search:search});
    	  $.extend(listFactor.data, pm);
    		$("#pageList").empty() ;
    		$("#pageList").createPageList(listFactor);
      }
    
      /**
       * @author andy
       * 患者列表数据显示
       */
      function showHzList_andy(){

      	listFactor = {
      			listObj : [ {
      				title : "病历号",
      				key : "patientID"
      			}, {
      				title : "患儿姓名",
      				key : "name"
      			}, {
      				title : "生日",
      				key : "birthday",
      				func:function(value){return value.toString().substring(0,11);}
      			}, {
      				title : "年龄",
      				key : "age"
      			}, {
      				title : "体重",
      				key : "weight"
      			}, {
      				title : "监护人",
      				key : "guardian"
      			}, {
      				title : "联系手机",
      				key : "mobile"
      			}, {
      				title : "联系电话",
      				key : "tel"
      			}, {
      				title : "就诊日期",
      				key : "caozuo_Time",
      				func:function(value){return value.toString().substring(0,11);}
      			},
      			{title:"患者ID",
      				key:"huanzheID"},
          		{title:"就诊ID",
          			key:"jiuzhenID"}
      				],
      			url : huanerListUrl,
      			method : "post",
      			checkbox : true,
      			single : false,
      			data : {// data表示传的参数
      				currentPage : 1,
      				pageSize : getPageSize(),// Page类的方法
      				tag : Math.random()
      			}
      		};
      	$("#pageList").remove() ;
      	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
      	.appendTo("#right");
      	$(div_list).createPageList(listFactor);
      } ;
      
      
      function getReport(){
        	var dataObjects = getCheckBoxValue();
      		if (dataObjects.length == 0) {
      			$.oimsAlert(language.CheckOneItem_Alert);
      			return ;
      		}
      		if (dataObjects.length >1) {
      			$.oimsAlert(language.OnlyOpOneData);
      			return ;
      		}

      	var win = window.open("");
      	html_baogao="";
      	 html_baogao+="<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'>";
	   html_baogao+="<html>";
  	    html_baogao+="<head>";
  	    html_baogao+="<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>";
  	    html_baogao+="<title>报告查看</title>";
  	    html_baogao+="<script language='javascript'> var contextPath='"+contextPath+"';</script>";
  	    html_baogao+="<link rel='stylesheet' type='text/css' href='"+contextPath+"/css/main.css' rel='stylesheet' type='text/css'>";
  	    html_baogao+="<link rel='stylesheet' type='text/css' href='"+contextPath+"/style/green/css/green.css' rel='stylesheet' type='text/css'>";
  	    html_baogao+="<link rel='stylesheet' type='text/css' href='"+contextPath+"/css/icon.css' rel='stylesheet' type='text/css'>";
  	    html_baogao+="<link rel='stylesheet' type='text/css' href='"+contextPath+"/style/green/css/openWin.css' rel='stylesheet' type='text/css'>";
  	    html_baogao+="<script src='"+contextPath+"/js/jquery.min.js'></script>";
  	    html_baogao+="<script src='"+contextPath+"/js/language.config.js'></script>";

  	    html_baogao+="<script src='"+contextPath+"/js/common.js'></script>";
  	    html_baogao+="<script src='"+contextPath+"/js/jquery.oimsDialog.js'></script>";
  	    html_baogao+="<script src='"+contextPath+"/js/manager/childCheck/OutBaoGao.js'></script>";
  	    html_baogao+="<script type='text/javascript'>";
  	    html_baogao+="var hzid="+dataObjects[0].huanzheID+",jzid="+dataObjects[0].jiuzhenID+";";
  	    html_baogao+="</script>";
  	    html_baogao+="</head>";
  	    html_baogao+="<body id='body_baogao'>";
  	    html_baogao+="</body>";
  	    html_baogao+="</html>";
  	    win.document.write(html_baogao);
  	    win.document.close();	
}

//-------------------------小儿登记开始
      
      function childRegistrationReady(){
  		//pageTitle="患儿登记";
  		$("<div />").attr("id","advquery").addClass("advquery").appendTo("#right");
  		var childByBlh="<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
  			+ "<tr>"
  			+ "<td width='23%' class='leftalign' ><input name='blh' type='text' class='blurview' id='blh' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='请输入病历号' size='28' /></td>"
  			+ "<td width='7%'><a  href='javascript:queryChild();' class='search' >"+"查询"+"</a>"
  			+"<td width='7%'><a href='javascript:resetChildSearch();' class='search'>重置</a></td>"+"</td><td width='63%'></td></tr></table>";
  		$(childByBlh).appendTo("#advquery");
  		$("#blh").click(function() {
  			clearInitQuery(this);
  		});
//  		$("#blh").blur(function(){
//  			if(this.value==""){
//  				$("#blh").val("请输入病历号");
//  				$("#blh").addClass("blurview");
//  			}
//  				
//  		});
  		ChuZhenRegistrationWeb();
  		
  		
  	}
    //重做登记页面
    function ChuZhenRegistrationWeb(){
    	$("<div style='margin-top:20px'/>").attr("id","registration").appendTo("#right");
    	$("#registration").append($(addChildRegistrationTable()));
    	calendarFun("Birthday");
		calendarFun("Edc");
		/*
		 * 根据预产期和出生日期计算孕周
		 */
		$("#calculateDate").click(function(){
			if($("#Birthday").val()!=""&&$("#Edc").val()!=""){
				var b=$("#Birthday").val();
				var e=$("#Edc").val();
				var end = jsDate.strToDate(b) ;
				var start = jsDate.strToDate(e) ;
				var dy = jsDate.xcts(start,end) ;
				$("#GESTATION").val(Math.floor(dy/7)+"周"+dy%7+"日");
			}else{alert("预产期或生日为空");}
		});
    	$("<div  style='margin-top:20px'/>").attr("id","button").appendTo("#right");
    	$("<table width='100%'><tr><td width='60%'></td><td width='10%' ><a href='javascript:saveChuZhenChild()' class='search'>提交</a></td><td width='10%'><a href='javascript:resetChuZhenChild()' class='search'>重置</a></td><td width='20%'></td></tr></table>").appendTo("#button");
    }
  	/*
  	 * 重置病历号搜索框
  	 */
  	function resetChildSearch(){
  		$("#blh").val("");
  	}
  	function queryChild(){
  		//alert(1);
  			$("#registration").remove();
  			$("#button").remove();
  			var blh=$("#blh").val();
  			var data=getJSONData("/publish/child/findChild.htm",{blh:blh,tag:Math.random()},"POST");
  			
  			if(data.state==1){
  				if(data.message=="初诊添加"){
  					ChuZhenRegistrationWeb();
  				}
  				else if(data.message=="输入病历号有误"){
  					$.oimsError("输入病历号有误");
  					ChuZhenRegistrationWeb();
  				}
  				else{
  					
  					FuZhenRegistrationWeb(data);
  				}
  			}
  			else{
  				$.oimsAlert("数据库异常");
  			}
  	}

    	/*
    	 *添加小儿登记信息弹出框
    	 */
    	function saveChuZhenChild(){
    		if(ChuZhenFormValidate()){
    			var temp={	
    			  	    name:$("#Name").val(),
 					     sex:$("input[type='radio'][name='Sex']:checked").val(),
 					guardian:$("#guardian").val(),
 					birthday:$("#Birthday").val(),
 						 edc:$("#Edc").val(),
 				   GESTATION:$("#GESTATION").val(),
 			  multiple_Birth:$("input[type='radio'][name='Multiple_Birth']:checked").val(),
 			  			fmfs:$("input[type='radio'][name='Fmfs']:checked").val(),
 				birth_weight:$("#Birth_weight").val(),
 					  weight:$("#Weight").val(),
 				birth_height:$("#Birth_height").val(),
 					  height:$("#Height").val(),
 					  mobile:$("#Mobile").val(),
 					  	 tel:$("#Tel").val(),
 				  birth_note:$("#Birth_note").val(),
 				  		note:$("#Note").val(),
 		   historyOfGenetics:$("#historyOfGenetics").val(),
 		   			 zhenbie:$("input[type='radio'][name='Zhenbie']:checked").val()
 		   		   
        		};
    			//console.dir(temp);
        		$.ajax({url:contextPath+"/publish/child/saveChildRegistration.htm",
        			 type:"POST",
        			 async: false,
        			 dataType:"json",
        			 data:temp,
        			 success:function(data){
        				 if(data.state){$.oimsSucc("添加成功");}
        				 else{
        					 $.oimsError("异常");
        				 }},
        			 error:function(a,b,c){
        				 $.oimsError("添加失败，数据库异常");
        			}
    });
    			
    		}
    		
//    		var view=addChildRegistrationTable();
//    		
//    		var addChildForm=oimsFormWindow({
//    			id:"addForm",
//    			url:contextPath+"/publish/child/saveChildRegistration.htm",
//    			dialogTitle:"小儿初诊添加",
//    			width:700,
//    			height:400,
//    			resetForm:resetChuZhenForm,
//    			btnOkSuccess:function(data,responseText,statusText){
//    				$.oimsSucc("添加成功");
//    			},
//    			btnOkError:function(jqXHR,textStatus,errorThrown){
//    				$.oimsAlert("添加失败数据库异常");
//    			},
//    			btnOkBefor:ChuZhenFormValidate
//    			
//    		});
//    		addChildForm.append($(view));
//    		
//    		calendarFun("Birthday");
//    		calendarFun("Edc");
//    		/*
//    		 * 根据预产期和出生日期计算孕周
//    		 */
//    		$("#calculateDate").click(function(){
//    			if($("#Birthday").val()!=""&&$("#Edc").val()!=""){
//    				var b=$("#Birthday").val();
//    				var e=$("#Edc").val();
//    				var start = jsDate.strToDate(b) ;
//    				var end = jsDate.strToDate(e) ;
//    				var dy = jsDate.xcts(start,end) ;
//    				$("#GESTATION").val(Math.floor(dy/7)+"周"+dy%7+"日");
//    			}else{alert("预产期或生日为空");}
//    		});
    		
    	}


    	/*
    	 * 小儿登记信息内容table
    	 */
    	function addChildRegistrationTable(){
    		var tal = "<table width='100%' >"
    		//第一行姓名、性别
    		+"<tr>"
    		+"<td colspan='6'><hr></td>"
    		+"</tr>"
    		+"<tr>"
    		+"<td width='15%' align='right'>"+"小儿姓名："+"</td>"
    		+"<td width='28%' align='left'><input name='Name' type='text' id='Name'/></td>"
    		+"<td width='2%' ><span class='required'>*</span></td>"
    		+"<td width='15%' align='right'>"+"小儿性别："+"</td>"
    		+"<td width='30%' align='left'><input name='Sex' type='radio' id='Sex' value='1' checked='checked' />"
    		+"男"
    		+" <input type='radio' name='Sex' id='Sex' value='0' />"
    		+"女"
    		+"</td>"
    		+"<td width='2%' ><span class='required'>*</span></td>"
    		+"</tr>"
    		//第二行监护人、出生日期
    		+"<tr>"
    		+"<td align='right'>"+"监护人："+"</td>"
    		+"<td align='left'><input name='guardian' type='text' id='guardian'/></td>"
    		+"<td width='2%' ><span class='required'>*</span></td>"
    		+"<td align='right'>"+"出生日期："+"</td>"
    		+"<td align='left'><input name='Birthday' type='text' id='Birthday'/></td>"
    		+"<td width='2%' ><span class='required'>*</span></td>"
    		+"</tr>"
    		//第三行
    		+"<tr>"
    		+"<td align='right'>"+"预产期："+"</td>"
    		+"<td align='left'><input name='Edc' type='text' id='Edc'/></td>"
    		+"<td width='2%' ><span class='required'>*</span></td>"
    		+"<td align='right'>"+"孕周："+"</td>"
    		+"<td align='left'><input name='GESTATION' type='text' id='GESTATION'   readonly='readonly' />&nbsp;&nbsp;&nbsp;<input type='button' id='calculateDate' value='计算'/></td>"
    		+"<td width='2%'><span class='required'>*</span></td>"
    		+"</tr>"
    		//第四行
    		+"<tr>"
    		+"<td align='right'>"+"胎别："+"</td>"
    		+"<td align='left'><input type='radio' name='Multiple_Birth' id='Multiple_Birth' value='1' checked='checked' />"+"单胎"
    		+"<input type='radio' name='Multiple_Birth' id='Multiple_Birth' value='2' />"+"双胎"
    		+"<input type='radio' name='Multiple_Birth' id='Multiple_Birth' value='3' />"+"三胎"
    		+"</td>"
    		+"<td>&nbsp;</td>"
    		+"<td align='right'>"+"分娩方式："+"</td>"
    		+"<td align='left'><input name='Fmfs' type='radio' id='Fmfs' value='0' checked='checked' />"+"自然分娩"
    		+"<input type='radio' name='Fmfs' id='Fmfs' value='1' />"+"剖腹产"
    		+"</td>"
    		+"<td>&nbsp;</td>"
    		+"</tr>"
    		//第五行
    		+"<tr>"
    		+"<td align='right'>"+"出生体重："+"</td>"
    		+"<td align='left'><input type='text' name='Birth_weight' id='Birth_weight' />&nbsp;&nbsp;"
    		+"克"
    		+"</td>"
    		+"<td>&nbsp;</td>"
    		+"<td align='right'>"+"当前体重："+"</td>"
    		+"<td align='left'><input type='text' name='Weight' id='Weight' />&nbsp;&nbsp;"
    		+"克"
    		+"</td>"
    		+"<td>&nbsp;</td>"
    		+"</tr>"
    		//第六行
    		+"<tr>"
    		+"<td align='right'>"+"出生身高："+"</td>"
    		+"<td align='left'><input type='text' name='Birth_height' id='Birth_height' />&nbsp;&nbsp;"
    		+"cm"
    		+"</td>"
    		+"<td>&nbsp;</td>"
    		+"<td align='right'>"+"当前身高："+"</td>"
    		+"<td align='left'><input type='text' name='Height' id='Height' />&nbsp;&nbsp;"
    		+"cm"
    		+"</td>"
    		+"<td>&nbsp;</td>"
    		+"</tr>"
    		//第七行
    		+"<tr>"
    		+"<td align='right'>"+"手机："+"</td>"
    		+"<td align='left'><input type='text' name='Mobile' id='Mobile' /></td>"
    		+"<td>&nbsp;</td>"
    		+"<td align='right'>"+"电话："+"</td>"
    		+"<td align='left'><input type='text' name='Tel' id='Tel' /></td>"
    		+"<td>&nbsp;</td>"
    		+"</tr>"
    		//第八行
    		+"<tr>"
    		+"<td align='right' >"+"出生时情况："+"</td>"
    		+"<td colspan='5'><input name='Birth_note' type='text' id='Birth_note' value='' size='115' /></td>"
    		+"</tr>"
    		//第九行
    		+"<tr>"
    		+"<td align='right'>"+"当前状况备注："+"</td>"
    		+"<td colspan='5'><input name='Note' type='text' id='Note' size='115' /></td>"
    		+"</tr>"
    		//第十行
    		+"<tr>"
    		+"<td align='right' >"+"可疑遗传情况："+"</td>"
    		+"<td colspan='5' width=''><input name='historyOfGenetics' type='text' id='historyOfGenetics' size='115'  /></td>"
    		+"</tr>"
    		//第十一行
    		+"<tr>"
    		+"<td align='right'>"+"诊别："+"</td>"
    		+"<td colspan='5' align='left'><input name='Zhenbie' type='radio' id='Zhenbie' value='2' checked='checked' />"+" 门诊"
    		+"<input type='radio' name='Zhenbie' id='Zhenbie' value='60150' />"+"急诊"
    		+"<input type='radio' name='Zhenbie' id='Zhenbie' value='3' />"+"住院"
    		+"</td>"
    		+"</tr>"
    		+"</table>";
    		return tal;
    	}
    	/*
    	 * 小儿登记信息重置
    	 */
    	function resetChuZhenChild(){
    		$("#Name").val("");
    		$("#guardian").val("");
    		$("#Birthday").val("");
    		$("#Edc").val("");
    		$("#GESTATION").val("");
    		$("#Birth_weight").val("");
    		$("#Weight").val("");
    		$("#Mobile").val("");
    		$("#Tel").val("");
    		$("#Birth_note").val("");
    		$("#Note").val("");
    		$("#historyOfGenetics").val("");
    		$("#Birth_height").val("");
    		$("#Height").val("");
    		
    	}
    	/*
    	 * 初诊信息前台验证
    	 */
    	function ChuZhenFormValidate(){
    		
    		if($("#Name").val()==""){
    			$.oimsAlert("姓名不能为空");
    			return false;
    		}
    		if($("#Sex").val()==""){
    			$.oimsAlert("性别不能为空");
    			return false;
    		}
    		if($("#guardian").val()==""){
    			$.oimsAlert("监护人不能为空");
    			return false;
    		}
    		if($("#Birthday").val()==""){
    			$.oimsAlert("生日不能为空");
    			return false;
    		}
    		if($("#Edc").val()==""){
    			$.oimsAlert("预产期不能为空");
    			return false;
    		}
    		if($("#GESTATION").val()==""){
    			$.oimsAlert("孕周不能为空");
    			return false;
    		}
    		if(isNaN($("#Birth_weight").val())||$("#Birth_weight").val().indexOf(".")!=-1 ){
    			$.oimsAlert("出生体重不是整数");
    			return false;
    		}
    		if(isNaN($("#Weight").val())||$("#Weight").val().indexOf(".")!=-1 ){
    			$.oimsAlert("当前体重不是整数");
    			return false;
    		}
    		if(isNaN($("#Birth_height").val())||$("#Birth_height").val().indexOf(".")!=-1 ){
    			$.oimsAlert("出生身高不是整数");
    			return false;
    		}
    		if(isNaN($("#Height").val()) ||$("#Height").val().indexOf(".")!=-1){
    			$.oimsAlert("当前身高不是整数");
    			return false;
    		}
    		
    		return true;
    	}

    	/*
    	 * 添加小儿复诊信息登记弹出框
    	 */
    	//小儿登记复诊添加
    	function FuZhenRegistrationWeb(data){
    		//取得患儿信息
    		var child=data.obj;	
    		
    		$("<div style='margin-top:20px'/>").attr("id","registration").appendTo("#right");
        	$("#registration").append($(addChildFuZhenTable()));
        	calendarFun("Birthday");
    		calendarFun("Edc");
    		/*
    		 * 根据预产期和出生日期计算孕周
    		 */
    		$("#calculateDate").click(function(){
    			if($("#Birthday").val()!=""&&$("#Edc").val()!=""){
    				var b=$("#Birthday").val();
    				var e=$("#Edc").val();
    				var end = jsDate.strToDate(b) ;
    				var start = jsDate.strToDate(e) ;
    				var dy = jsDate.xcts(start,end) ;
    				$("#GESTATION").val(Math.floor(dy/7)+"周"+dy%7+"日");
    			}else{alert("预产期或生日为空");}
    		});
        	$("<div  style='margin-top:20px'/>").attr("id","button").appendTo("#right");
        	$("<input type='hidden' name='hzid' id='hzid' />").appendTo("#registration");
        
        	$("<table width='100%'><tr><td width='60%'></td><td width='10%' ><a href='javascript:saveFuZhenChild()' class='search'>提交</a></td><td width='10%'><a href='javascript:resetFuZhenChild("+JSON.stringify(child)+")' class='search'>重置</a></td><td width='20%'></td></tr></table>").appendTo("#button");
        	
        	//初始化更新信息
        	
        	$("#Name").val(child.hzxx.xingming);
    		$("input[type='radio'][name='Sex'][value='"+(child.hzxx.xingbie==true?"1":"0")+"']").attr("checked","checked");
    		$("#Birthday").val(child.shengri);
    		
    		$("#Edc").val(child.ycrq);
    		
    		$("#GESTATION").val(Math.floor(child.xecz.yunqi/7)+"周"+child.xecz.yunqi%7+"日");
    		$("input[type='radio'][name='Multiple_Birth'][value='"+child.xecz.taibie+"'] ").attr("checked","checked");
    		$("#Birth_weight ").val(child.xecz.cstz );
    		
    		$("#Mobile").val(child.hzxx.shouji);
    		$("#Tel").val(child.hzxx.dianhua);
    		$("#Birth_note").val(child.xecz.csqk);
    		$("#Birth_height").val(child.xecz.cssg);
    		$("#Note").val(child.xecz.dqqk);
    		$("#historyOfGenetics").val(child.xecz.kyycqk);
    		
    		
    		$("input[type='radio'][name='Fmfs'][value='"+child.xecz.fmfs+"']").attr("checked","checked");
    		$("#hzid").val(child.hzxx.id);
    		$("#patientID").val(child.hzxx.binglihao);
    	}
    	function saveFuZhenChild(){
//    	var view=addChildFuZhenTable();
//    	var child=data.obj;	
    		if(fuZhenFormValidate()){
    		var temp={
    		  	    name:$("#Name").val(),
				     sex:$("input[type='radio'][name='Sex']:checked").val(),
				mother_name:$("#Mother_name").val(),
				birthday:$("#Birthday").val(),
					 edc:$("#Edc").val(),
			   GESTATION:$("#GESTATION").val(),
		  multiple_Birth:$("input[type='radio'][name='Multiple_Birth']:checked").val(),
		  			fmfs:$("input[type='radio'][name='Fmfs']:checked").val(),
			birth_weight:$("#Birth_weight").val(),
				  weight:$("#Weight").val(),
			birth_height:$("#Birth_height").val(),
				  height:$("#Height").val(),
				  mobile:$("#Mobile").val(),
				  	 tel:$("#Tel").val(),
			  birth_note:$("#Birth_note").val(),
			  		note:$("#Note").val(),
	   historyOfGenetics:$("#historyOfGenetics").val(),
	   			 zhenbie:$("input[type='radio'][name='Zhenbie']:checked").val(),
	   			hzid:$("#hzid").val(),
	     		patientID:$("#patientID").val()
    		};
			//console.dir(temp);
    		$.ajax({url:contextPath+"/publish/child/updateFuZhen.htm",
    			 type:"POST",
    			 async: false,
    			 dataType:"json",
    			 data:temp,
    			 success:function(data){
    				 if(data.state)$.oimsSucc("添加成功");
    				 else{
    					 $.oimsError("添加失败");
    				 }},
    			 error:function(){$.oimsError("添加失败，数据库异常");}
    		});
    		}
//    		var addChildForm=oimsFormWindow({
//    			id:"addForm",
//    			url:contextPath+"/publish/child/updateFuZhen.htm",
//    			dialogTitle:"小儿复诊添加",
//    			width:700,
//    			height:400,
//    			resetForm:function(){resetFuZhenForm(child);},
//    			btnOkSuccess:function(data,responseText,statusText){
//    				$.oimsSucc("添加成功");
//    			},
//    			btnOkError:function(jqXHR,textStatus,errorThrown){
//    				$.oimsAlert("添加失败数据库异常");
//    			},
//    			btnOkBefor:fuZhenFormValidate
//    			
//    		});
//    		var hzid="<input type='hidden' name='hzid' id='hzid' />";
//    		addChildForm.append($(view)).append($(hzid));
//    		//给出生日期和孕产期文本框赋值
//    		calendarFun("Birthday");
//    		calendarFun("Edc");
//    		/*
//    		 * 计算孕周
//    		 */
//    		$("#calculateDate").click(function(){
//    			if($("#Birthday").val()!=""&&$("#Edc").val()!=""){
//    				var b=$("#Birthday").val();
//    				var e=$("#Edc").val();
//    				var start = jsDate.strToDate(b) ;
//    				var end = jsDate.strToDate(e) ;
//    				var dy = jsDate.xcts(start,end) ;
//    				$("#GESTATION").val(Math.floor(dy/7)+"周"+dy%7+"日");
//    			}else{alert("预产期或生日为空");}
//    		});
//    		
//    			
//    		$("#Name").val(child.hzxx.xingming);
//    		$("input[type='radio'][name='Sex'][value='"+(child.hzxx.xingbie==true?"1":"0")+"']").attr("checked","checked");
//    		$("#Birthday").val(time(child.hzxx.shengri).format_yyyy_mm_dd());
//    		$("#Edc").val(time(child.xecz.ycrq).format_yyyy_mm_dd());
//    		
//    		$("#GESTATION").val(Math.floor(child.xecz.yunqi/7)+"周"+child.xecz.yunqi%7+"日");
//    		$("#Multiple_Birth ").val(child.xecz.taibie);
//    		$("#Birth_weight ").val(child.xecz.cstz );
//    		
//    		$("#Mobile").val(child.hzxx.shouji);
//    		$("#Tel").val(child.hzxx.dianhua);
//    		$("#Birth_note").val(child.xecz.csqk);
//    		$("#Birth_height").val(child.xecz.cssg);
//    		$("#Note").val(child.xecz.dqqk);
//    		$("#historyOfGenetics").val(child.xecz.kyycqk);
//
//    		$("#Fmfs").val(child.xecz.fmfs);
//    		$("input[type='radio'][name='Fmfs'][value='"+child.xecz.fmfs+"']").attr("checked","checked");
//    		$("#hzid").val(child.hzxx.id);
//    		$("#patientID").val(child.hzxx.binglihao);
    			
    		}

    	/*
    	 * 复诊重置按钮
    	 * @author 刘洋
    	 */
    	function resetFuZhenChild(child){
    		
    		$("#Name").val(child.hzxx.xingming);
    		$("input[type='radio'][name='Sex'][value='"+(child.hzxx.xingbie==true?"1":"0")+"']").attr("checked","checked");
    		$("#Birthday").val(child.shengri);
    		$("#Edc").val(child.ycrq);
    		
    		$("#GESTATION").val(Math.floor(child.xecz.yunqi/7)+"周"+child.xecz.yunqi%7+"日");
    		$("input[type='radio'][name='Multiple_Birth'][value='"+child.xecz.taibie+"'] ").attr("checked","checked");
    		$("#Birth_weight ").val(child.xecz.cstz );
    		
    		$("#Mobile").val(child.hzxx.shouji);
    		$("#Tel").val(child.hzxx.dianhua);
    		$("#Birth_note").val(child.xecz.csqk);
    		$("#Birth_height").val(child.xecz.cssg);
    		$("#Note").val(child.xecz.dqqk);
    		$("#historyOfGenetics").val(child.xecz.kyycqk);

    		
    		$("input[type='radio'][name='Fmfs'][value='"+child.xecz.fmfs+"']").attr("checked","checked");
    		$("#hzid").val(child.hzxx.id);
    		$("#patientID").val(child.hzxx.binglihao);
    		$("#Mother_name").val("");
    		$("#Weight").val("");
    		$("#Height").val("");
    		$("input[type='radio'][name='Zhenbie'][value='2']").attr("checked","checked");
    	}
    	/*
    	 * 复诊信息添加前验证
    	 * @author 刘洋
    	 */
    	function fuZhenFormValidate(){
    		if($("#Name").val()==""){
    			$.oimsAlert("姓名不能为空");
    			return false;
    		}
    		if($("#Sex").val()==""){
    			$.oimsAlert("性别不能为空");
    			return false;
    		}
    		if($("#Mother_name").val()==""){
    			$.oimsAlert("监护人不能为空");
    			return false;
    		}
    		if($("#Birthday").val()==""){
    			$.oimsAlert("生日不能为空");
    			return false;
    		}
    		if($("#Edc").val()==""){
    			$.oimsAlert("预产期不能为空");
    			return false;
    		}
    		if($("#GESTATION").val()==""){
    			$.oimsAlert("孕周不能为空");
    			return false;
    		}
    		if(isNaN($("#Birth_weight").val())||$("#Birth_weight").val().indexOf(".")!=-1 ){
    			$.oimsAlert("出生体重不是整数");
    			return false;
    		}
    		if(isNaN($("#Weight").val())||$("#Weight").val().indexOf(".")!=-1 ){
    			$.oimsAlert("当前体重不是整数");
    			return false;
    		}
    		if(isNaN($("#Birth_height").val())||$("#Birth_height").val().indexOf(".")!=-1 ){
    			$.oimsAlert("出生身高不是整数");
    			return false;
    		}
    		if(isNaN($("#Height").val()) ||$("#Height").val().indexOf(".")!=-1){
    			$.oimsAlert("当前身高不是整数");
    			return false;
    		}
    		return true;
    	}

    	/*
    	 * 小儿复诊登记信息table
    	 */
    	function addChildFuZhenTable(){
    		var tal = "<table width='100%' >"
    			//第一行姓名、性别
    			+"<tr>"
    			+"<td colspan='6'><hr></td>"
    			+"</tr>"
    			+"<tr>"
    			+"<td width='15%' align='right'>"+"小儿姓名："+"</td>"
    			+"<td width='28%' align='left'><input name='Name' type='text' id='Name'/></td>"
    			+"<td width='2%' ><span class='required'>*</span></td>"
    			+"<td width='15%' align='right'>"+"小儿性别："+"</td>"
    			+"<td width='30%' align='left'><input name='Sex' type='radio' id='Sex' value='1' checked='checked' />"
    			+"男"
    			+" <input type='radio' name='Sex' id='Sex' value='0' />"
    			+"女"
    			+"</td>"
    			+"<td width='2%' ><span class='required'>*</span></td>"
    			+"</tr>"
    			//第二行监护人、出生日期
    			+"<tr>"
    			+"<td align='right'>"+"母亲姓名："+"</td>"
    			+"<td align='left'><input name='Mother_name' type='text' id='Mother_name'/></td>"
    			+"<td width='2%' ><span class='required'>*</span></td>"
    			+"<td align='right'>"+"出生日期："+"</td>"
    			+"<td align='left'><input name='Birthday' type='text' id='Birthday'/></td>"
    			+"<td width='2%' ><span class='required'>*</span></td>"
    			+"</tr>"
    			//第三行
    			+"<tr>"
    			+"<td align='right'>"+"预产期："+"</td>"
    			+"<td align='left'><input name='Edc' type='text' id='Edc'/></td>"
    			+"<td width='2%' ><span class='required'>*</span></td>"
    			+"<td align='right'>"+"孕周："+"</td>"
    			+"<td align='left'><input name='GESTATION' type='text' id='GESTATION'   readonly='readonly'/>&nbsp;&nbsp;&nbsp;<input type='button' id='calculateDate' value='计算'>"
    			+"</td>"
    			+"<td width='2%'><span class='required'>*</span></td>"
    			+"</tr>"
    			//第四行
    			+"<tr>"
    			+"<td align='right'>"+"胎别："+"</td>"
    			+"<td align='left'><input type='radio' name='Multiple_Birth' id='Multiple_Birth' value='1' checked='checked'/>"+"单胎"
    			+"<input type='radio' name='Multiple_Birth' id='Multiple_Birth' value='2' />"+"双胎"
    			+"<input type='radio' name='Multiple_Birth' id='Multiple_Birth' value='3' />"+"三胎"
    			+"</td>"
    			+"<td>&nbsp;</td>"
    			+"<td align='right'>"+"分娩方式："+"</td>"
    			+"<td align='left'><input name='Fmfs' type='radio' id='Fmfs' value='0'  />"+"自然分娩"
    			+"<input type='radio' name='Fmfs' id='Fmfs' value='1' />"+"剖腹产"
    			+"</td>"
    			+"<td>&nbsp;</td>"
    			+"</tr>"
    			//第五行
    			+"<tr>"
    			+"<td align='right'>"+"出生体重："+"</td>"
    			+"<td align='left'><input type='text' name='Birth_weight' id='Birth_weight' />&nbsp;&nbsp;"
    			+"克"
    			+"</td>"
    			+"<td>&nbsp;</td>"
    			+"<td align='right'>"+"当前体重："+"</td>"
    			+"<td align='left'><input type='text' name='Weight' id='Weight' />&nbsp;&nbsp;"
    			+"克"
    			+"</td>"
    			+"<td>&nbsp;</td>"
    			+"</tr>"
    			//第六行
    			+"<tr>"
    			+"<td align='right'>"+"出生身高："+"</td>"
    			+"<td align='left'><input type='text' name='Birth_height' id='Birth_height' />&nbsp;&nbsp;"
    			+"cm"
    			+"</td>"
    			+"<td>&nbsp;</td>"
    			+"<td align='right'>"+"当前身高："+"</td>"
    			+"<td align='left'><input type='text' name='Height' id='Height' />&nbsp;&nbsp;"
    			+"cm"
    			+"</td>"
    			+"<td>&nbsp;</td>"
    			+"</tr>"
    			//第七行
    			+"<tr>"
    			+"<td align='right'>"+"手机："+"</td>"
    			+"<td align='left'><input type='text' name='Mobile' id='Mobile' /></td>"
    			+"<td>&nbsp;</td>"
    			+"<td align='right'>"+"电话："+"</td>"
    			+"<td align='left'><input type='text' name='Tel' id='Tel' /></td>"
    			+"<td>&nbsp;</td>"
    			+"</tr>"
    			//第八行
    			+"<tr>"
    			+"<td align='right'>"+"出生时情况："+"</td>"
    			+"<td colspan='5' align='left'><input name='Birth_note' type='text' id='Birth_note' value='' size='115' /></td>"
    			+"</tr>"
    			//第九行
    			+"<tr>"
    			+"<td align='right'>"+"当前状况备注："+"</td>"
    			+"<td colspan='5' align='left'><input name='Note' type='text' id='Note' size='115' /></td>"
    			+"</tr>"
    			//第十行
    			+"<tr>"
    			+"<td align='right'>"+"可疑遗传情况："+"</td>"
    			+"<td colspan='5' align='left'><input name='historyOfGenetics' type='text' id='historyOfGenetics'  size='115' /></td>"
    			+"</tr>"
    			//第十一行
    			+"<tr>"
    			+"<td align='right'>"+"诊别："+"</td>"
    			+"<td colspan='2' align='left'><input name='Zhenbie' type='radio' id='Zhenbie' value='2' checked='checked' />"+" 门诊"
    			+"<input type='radio' name='Zhenbie' id='Zhenbie' value='60150' />"+"急诊"
    			+"<input type='radio' name='Zhenbie' id='Zhenbie' value='3' />"+"住院"
    			
    			+"</td>"
    			+"<td width='15%' align='right'>病历号：</td>"
    			+"<td width='25%' align='left'><input type='text' name='patientID' id='patientID' readonly='readonly'/></td>"
    			+"</tr>"
    			+"</table>";
    		
    			return tal;
    	}

    	/*
    	 * 修改小儿登记信息
    	 */
    	function updateChildRegistration(){
    	var dataObjects=getCheckBoxValue();
    		
    		if (dataObjects.length == 0) {
    			$.oimsAlert(language.CheckOneItem_Alert);
    			return;
    		}
    		if (dataObjects.length >1) {
    			$.oimsAlert(language.OnlyOpOneData);
    			return;
    		}
    		var view=updateChildAllInformationTable();
    		//通过调用方法形成一个window
    		var data=getJSONData("/publish/child/getChildByHzIdAndJiuzhenid.htm",
    				{hzid:dataObjects[0].huanzheID,jiuzhenid:dataObjects[0].jiuzhenID,tag:Math.random()},
    				"POST");
    		var child=data.obj;
    		var updateForm=oimsFormWindow({
    			id:"updateForm",
    			//icon:"edit",
    			url:contextPath+"/publish/child/updateChildRegistration.htm",
    			dialogTitle:"小儿登记信息修改",
    			height:400,
    			width:700,
    			resetForm:function(){resetChildModifyForm(child);},
    			btnOkSuccess:function(data,responseText,statusText){
    				$.oimsSucc(data.message);
    				
    				
    				updateForm.parent().parent().remove();  
    				
    				showHzList_andy();
    				
    				
    				
    			},
    			btnOkError:function(jqXHR,textStatus,errorThrown){
    				$.oimsAlert("修改失败");
    			},
    			btnOkBefor:childModifyFormValidate
    			
    		});
    		var hzid="<input type='hidden' name='hzid' id='hzid' />";
    		var jiuzhenid="<input type='hidden' name='jiuzhenid' id='jiuzhenid' />";
    		updateForm.append($(view)).append($(hzid)).append($(jiuzhenid));
    		
    		
    			calendarFun("Birthday");
    			calendarFun("Edc");
    			/*
    			 * 计算孕周
    			 */
    			$("#calculateDate").click(function(){
    				if($("#Birthday").val()!=""&&$("#Edc").val()!=""){
    					var b=$("#Birthday").val();
    					var e=$("#Edc").val();
    					var end = jsDate.strToDate(b) ;
    					var start = jsDate.strToDate(e) ;
    					var dy = jsDate.xcts(start,end) ;
    					$("#GESTATION").val(Math.floor(dy/7)+"周"+dy%7+"日");
    				}else{alert("预产期或生日为空");}
    			});
    			
    			if(data.state){
    				 $("#patientID").val(child.result.patientID);
    				 $("#Name").val(child.result.name);
    				$("input[type='radio'][name='Sex'][value='"+child.result.sex+"']").attr("checked","checked");
    				$("#Birthday").val(child.result.birthday);
    				$("#Edc").val(child.result.edc);
    				
    				$("#Mother_name").val(child.result.mother_name);
    				$("#GESTATION").val(child.result.GESTATION);
    				$("input[type='radio'][name='Multiple_Birth'][value='"+child.result.multiple_Birth +"']").attr("checked","checked");
    				$("#Birth_weight ").val(child.result.birth_weight  );
    				$("#Weight").val(child.result.weight);
    				$("#Mobile").val(child.result.mobile);
    				$("#Tel").val(child.result.tel);
    				$("#Birth_note").val(child.result.birth_note);
    				$("#Birth_height").val(child.result.birth_height);
    				$("#Note").val(child.result.note);
    				$("#historyOfGenetics").val(child.result.historyOfGenetics);
    				$("input[type='radio'][name='Fmfs'][value='"+child.result.fmfs+"']").attr("checked","checked");
    				$("#Height").val(child.result.height);
    				$("input[type='radio'][name='Zhenbie'][value='"+child.result.zhenbie+"']").attr("checked","checked");
    				$("#hzid").val(child.result.hzid);
    				$("#jiuzhenid").val(child.jiuzhenid);
    			}
    			else{
    				$.oimsError("查询基础信息失败，请确认数据库连接");
    			}

    	}

    	/*
    	 *修改时小儿弹出框所包含的表单 
    	 */
    	function updateChildAllInformationTable(){
    		var tal = "<table width='100%' >"
    			//第一行姓名、性别
    			+"<tr>"
    			+"<td width='23%' align='right'>"+"小儿姓名："+"</td>"
    			+"<td width='28%' align='left'><input name='Name' type='text' id='Name'/></td>"
    			+"<td width='2%' ><span class='required'>*</span></td>"
    			+"<td width='15%' align='right'>"+"小儿性别："+"</td>"
    			+"<td width='30%' align='left'><input name='Sex' type='radio' id='Sex' value='1' checked='checked' />"
    			+"男"
    			+" <input type='radio' name='Sex' id='Sex' value='0' />"
    			+"女"
    			+"</td>"
    			+"<td width='2%' ><span class='required'>*</span></td>"
    			+"</tr>"
    			//第二行监护人、出生日期
    			+"<tr>"
    			+"<td align='right'>"+"监护人："+"</td>"
    			+"<td align='left'><input name='Mother_name' type='text' id='Mother_name'/></td>"
    			+"<td width='2%' ><span class='required'>*</span></td>"
    			+"<td align='right'>"+"出生日期："+"</td>"
    			+"<td align='left'><input name='Birthday' type='text' id='Birthday'/></td>"
    			+"<td width='2%' ><span class='required'>*</span></td>"
    			+"</tr>"
    			//第三行
    			+"<tr>"
    			+"<td align='right'>"+"预产期："+"</td>"
    			+"<td align='left'><input name='Edc' type='text' id='Edc'/></td>"
    			+"<td width='2%' ><span class='required'>*</span></td>"
    			+"<td align='right'>"+"孕周："+"</td>"
    			+"<td align='left'><input name='GESTATION' type='text' id='GESTATION'   readonly='readonly'/>&nbsp;&nbsp;&nbsp;<input type='button' id='calculateDate' value='计算'>"
    			+"</td>"
    			+"<td width='2%' ><span class='required'>*</span></td>"
    			+"</tr>"
    			//第四行
    			+"<tr>"
    			+"<td align='right'>"+"胎别："+"</td>"
    			+"<td align='left'><input type='radio' name='Multiple_Birth' id='Multiple_Birth' value='1' checked='checked'/>"+"单胎"
    			+"<input type='radio' name='Multiple_Birth' id='Multiple_Birth' value='2' />"+"双胎"
    			+"<input type='radio' name='Multiple_Birth' id='Multiple_Birth' value='3' />"+"三胎"
    			+"</td>"
    			+"<td>&nbsp;</td>"
    			+"<td align='right'>"+"分娩方式："+"</td>"
    			+"<td align='left'><input name='Fmfs' type='radio' id='Fmfs' value='0'  />"+"自然分娩"
    			+"<input type='radio' name='Fmfs' id='Fmfs' value='1' />"+"剖腹产"
    			+"</td>"
    			+"<td>&nbsp;</td>"
    			+"</tr>"
    			//第五行
    			+"<tr>"
    			+"<td align='right'>"+"出生体重："+"</td>"
    			+"<td align='left'><input type='text' name='Birth_weight' id='Birth_weight' />&nbsp;&nbsp;"
    			+"克"
    			+"</td>"
    			+"<td>&nbsp;</td>"
    			+"<td align='right'>"+"当前体重："+"</td>"
    			+"<td align='left'><input type='text' name='Weight' id='Weight' />&nbsp;&nbsp;"
    			+"克"
    			+"</td>"
    			+"<td>&nbsp;</td>"
    			+"</tr>"
    			//第六行
    			+"<tr>"
    			+"<td align='right'>"+"出生身高："+"</td>"
    			+"<td align='left'><input type='text' name='Birth_height' id='Birth_height' />&nbsp;&nbsp;"
    			+"cm"
    			+"</td>"
    			+"<td>&nbsp;</td>"
    			+"<td align='right'>"+"当前身高："+"</td>"
    			+"<td align='left'><input type='text' name='Height' id='Height' />&nbsp;&nbsp;"
    			+"cm"
    			+"</td>"
    			+"<td>&nbsp;</td>"
    			+"</tr>"
    			//第七行
    			+"<tr>"
    			+"<td align='right'>"+"手机："+"</td>"
    			+"<td align='left'><input type='text' name='Mobile' id='Mobile' /></td>"
    			+"<td>&nbsp;</td>"
    			+"<td align='right'>"+"电话："+"</td>"
    			+"<td align='left'><input type='text' name='Tel' id='Tel' /></td>"
    			+"<td>&nbsp;</td>"
    			+"</tr>"
    			//第八行
    			+"<tr>"
    			+"<td align='right'>"+"出生时情况："+"</td>"
    			+"<td colspan='5' align='left'><input name='Birth_note' type='text' id='Birth_note' value='' size='71' /></td>"
    			+"</tr>"
    			//第九行
    			+"<tr>"
    			+"<td align='right'>"+"当前状况备注："+"</td>"
    			+"<td colspan='5' align='left'><input name='Note' type='text' id='Note' size='71' /></td>"
    			+"</tr>"
    			//第十行
    			+"<tr>"
    			+"<td align='right'>"+"可疑遗传情况："+"</td>"
    			+"<td colspan='5' align='left'><input name='historyOfGenetics' type='text' id='historyOfGenetics'  size='71' /></td>"
    			+"</tr>"
    			//第十一行
    			+"<tr>"
    			+"<td align='right'>"+"诊别："+"</td>"
    			+"<td colspan='2' align='left'><input name='Zhenbie' type='radio' id='Zhenbie' value='2' checked='checked' />"+" 门诊"
    			+"<input type='radio' name='Zhenbie' id='Zhenbie' value='60150' />"+"急诊"
    			+"<input type='radio' name='Zhenbie' id='Zhenbie' value='3' />"+"住院"
    			
    			+"</td>"
    			+"<td width='15%' align='right'>病历号：</td>"
    			+"<td width='25%' align='left'><input type='text' name='patientID' id='patientID' readonly='readonly'/></td>"
    			+"</tr>"
    			+"</table>";
    		
    			return tal;
    	}

    	/*
    	 * 重置为修改前的患儿属性
    	 */
    	function resetChildModifyForm(child){
    		$("#patientID").val(child.result.patientID);
    		 $("#Name").val(child.result.name);
    		$("input[type='radio'][name='Sex'][value='"+child.result.sex+"']").attr("checked","checked");
    		$("#Birthday").val(child.result.birthday);
    		$("#Edc").val(child.result.edc);
    		$("#Mother_name").val(child.result.mother_name);
    		$("#GESTATION").val(child.result.GESTATION);
    		$("input[type='radio'][name='Multiple_Birth'][value='"+child.result.multiple_Birth +"']").attr("checked","checked");
    		$("#Birth_weight ").val(child.result.birth_weight  );
    		$("#Weight").val(child.result.weight);
    		$("#Mobile").val(child.result.mobile);
    		$("#Tel").val(child.result.tel);
    		$("#Birth_note").val(child.result.birth_note);
    		$("#Birth_height").val(child.result.birth_height);
    		$("#Note").val(child.result.note);
    		$("#historyOfGenetics").val(child.result.historyOfGenetics);
    		$("input[type='radio'][name='Fmfs'][value='"+child.result.fmfs+"']").attr("checked","checked");
    		$("#Height").val(child.result.height);
    		$("input[type='radio'][name='Zhenbie'][value='"+child.result.zhenbie+"']").attr("checked","checked");
    		$("#hzid").val(child.result.hzid);
    		$("#jiuzhenid").val(child.jiuzhenid);
    	}

    	/*
    	 * 修改患儿属性前做必要的验证
    	 */
    	function childModifyFormValidate(){
    		if($("#Name").val()==""){
    			$.oimsAlert("姓名不能为空");
    			return false;
    		}
    		if($("#Sex").val()==""){
    			$.oimsAlert("性别不能为空");
    			return false;
    		}
    		if($("#Mother_name").val()==""){
    			$.oimsAlert("监护人不能为空");
    			return false;
    		}
    		if($("#Birthday").val()==""){
    			$.oimsAlert("生日不能为空");
    			return false;
    		}
    		if($("#Edc").val()==""){
    			$.oimsAlert("预产期不能为空");
    			return false;
    		}
    		if($("#GESTATION").val()==""){
    			$.oimsAlert("孕周不能为空");
    			return false;
    		}
    		if(isNaN($("#Birth_weight").val())||$("#Birth_weight").val().indexOf(".")!=-1 ){
    			$.oimsAlert("出生体重不是整数");
    			return false;
    		}
    		if(isNaN($("#Weight").val())||$("#Weight").val().indexOf(".")!=-1 ){
    			$.oimsAlert("当前体重不是整数");
    			return false;
    		}
    		if(isNaN($("#Birth_height").val())||$("#Birth_height").val().indexOf(".")!=-1 ){
    			$.oimsAlert("出生身高不是整数");
    			return false;
    		}
    		if(isNaN($("#Height").val()) ||$("#Height").val().indexOf(".")!=-1){
    			$.oimsAlert("当前身高不是整数");
    			return false;
    		}
    		return true;
    	}
//--------------------小儿登记结束
    	//-----------------P超开始
    	/**
    	 * <p>
    	 * 用于保存p超
    	 * </p>
    	 * 
    	 * @author Zhangjunze
    	 * 
    	 */
    	var pcao;
    	function addPCao() {
    		// 获取选择的复选框的值
    		var dataObj = getCheckBoxValue();
    		if (dataObj.length == 0) {
    			$.oimsAlert(language.CheckOneItem_Alert);
    			return;
    		}
    		if (dataObj.length >1) {
    			$.oimsAlert(language.OnlyOpOneData);
    			return;
    		}
    		var table_jiben = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
    				+ "<tr>"
    				+ "<td width='8%'></td>"
    				+ "<td width='19%' align='center'  class='sl'>"
    				+ "</td>"
    				+ "<td width='7%' align='right' nowrap='nowrap'>姓名"
    				+ ":</td>"
    				+ "<td width='19%' align='left'><input type='text' name='xingming' size='20' id='xingming' disabled=true/></td>"
    				+ "<td width='7%' align='right' nowrap='nowrap'>病历号 "
    				+ ":</td>"
    				+ "<td width='19%' align='left'><input type='text' name='binglihao' size='20' id='binglihao' disabled=true /></td>"
    				+ "<td width='28%' align='left'>&nbsp;</td>"
    				+ "</tr>"
    				+ "</table>"
    				+ "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
    				+ "<tr>"
    				+ "<td width='8%'></td>"
    				+ "<td width='19%' align='center'  class='sl'>"
    				+ "</td>"
    				+ "<td width='7%' align='right' nowrap='nowrap'>出生日期"
    				+ ":</td>"
    				+ "<td width='19%' align='left'><input type='text' name='chushengriqi' size='20' id='chushengriqi' disabled=true/></td>"
    				+ "<td width='7%' align='right' nowrap='nowrap'>性别"
    				+ ":</td>"
    				+ "<td width='19%' align='left'><input type='text' name='xingbie' size='20' id='xingbie' disabled=true /></td>"
    				+ "<td width='28%' align='left'>&nbsp;</td>" + "</tr>" + "</table>";

    		var table_diyici = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
    				+ "<tr>"
    				+ "<td width='8%'></td>"
    				+ "<td width='19%' align='center'  class='sl'>"
    				+ "第一次"
    				+ ":</td>"
    				+ "<td width='7%' align='right' nowrap='nowrap'>"
    				+ "左眼"
    				+ ":</td>"
    				+ "<td width='19%' align='left'><input type='text' name='OD1' size='20' id='OD1' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
    				+ "<td width='7%' align='right' nowrap='nowrap'> "
    				+ "右眼"
    				+ ":</td>"
    				+ "<td width='19%' align='left'><input type='text' name='OS1' size='20' id='OS1' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
    				+ "<td width='28%' align='left'>&nbsp;</td>" + "</tr>" + "</table>";

    		var table_dierci = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
    				+ "<tr>"
    				+ "<td width='8%'></td>"
    				+ "<td width='19%' align='center'  class='sl'>"
    				+ "第二次"
    				+ ":</td>"
    				+ "<td width='7%' align='right' nowrap='nowrap'>"
    				+ "左眼"
    				+ ":</td>"
    				+ "<td width='19%' align='left'><input type='text' name='OD2' size='20' id='OD2' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
    				+ "<td width='7%' align='right' nowrap='nowrap'>"
    				+ "右眼"
    				+ ":</td>"
    				+ "<td width='19%' align='left'><input type='text' name='OS2' size='20' id='OS2' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
    				+ "<td width='28%' align='left'>&nbsp;</td>" + "</tr>" + "</table>";

    		var table_disanci = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
    				+ "<tr>"
    				+ "<td width='8%'></td>"
    				+ "<td width='19%' align='center'  class='sl'>"
    				+ "第三次"
    				+ ":</td>"
    				+ "<td width='7%' align='right' nowrap='nowrap'>"
    				+ "左眼"
    				+ "</td>"
    				+ "<td width='19%' align='left'><input type='text' name='OD3' size='20' id='OD3' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
    				+ "<td width='7%' align='right' nowrap='nowrap'>"
    				+ "右眼"
    				+ "</td>"
    				+ "<td width='19%' align='left'><input type='text' name='OS3' size='20' id='OS3' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
    				+ "<td width='28%' align='left'>&nbsp;</td>" + "</tr>" + "</table>";
    		var table_pingjun = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
    				+ "<tr>"
    				+ "<td width='8%'></td>"
    				+ "<td width='19%' align='center'  class='sl'>"
    				+ "平均值"
    				+ ":</td>"
    				+ "<td width='7%' align='right' nowrap='nowrap'>"
    				+ "左眼"
    				+ "</td>"
    				+ "<td width='19%' align='left'><input type='text' name='ODave' size='20' id='ODave' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
    				+ "<td width='7%' align='right' nowrap='nowrap'>"
    				+ "右眼"
    				+ "</td>"
    				+ "<td width='19%' align='left'><input type='text' name='OSave' size='20' id='OSave' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
    				+ "<td width='28%' align='left'>&nbsp;</td>" + "</tr>" + "</table>";

    		var yincang_id = "<input type=hidden name='jiuzhenId' id='jiuzhenId'>"
    				+ "<input type=hidden name='huanzheId' id='huanzheId'>";
    		var date1 = getJSONData("/publish/child/findHzxxById.htm", {
    			huanzheid : dataObj[0].huanzheID, // 患者id
    			jiuzhenid : dataObj[0].jiuzhenID, // 就诊id
    			tag : Math.random()
    		}, "post");
    		var f = oimsFormWindow({
    			id : "form_pcao",
    			url : contextPath + "/publish/child/addPcao.htm",
    			height : 300,
    			width : 600,
    			resetForm:function(){resetPcaoForm(date1);},
    			dialogTitle:"p超",
    			btnOkSuccess : function(data, responseText, statusText) {
    				$.oimsSucc("添加成功");
    				f.parent().parent().remove();
    				
    			},
    			btnOkError : function(jqXHR, textStatus, errorThrown) {
    				$.oimsError("添加成功");
    			},
    			btnOkBefor :pcaoValidate
    		});
    		f.append(table_jiben);
    		f.append(table_diyici);
    		f.append(table_dierci);
    		f.append(table_disanci);
    		f.append(table_pingjun);
    		f.append(yincang_id);
    		$("#huanzheId").val(dataObj[0].huanzheID);// 患者id
    		$("#jiuzhenId").val(dataObj[0].jiuzhenID);// 就诊id
    		
    		if (date1.state) {
    			pcao = date1.obj;
    			
    			$("#xingming").val(pcao.hzxx.xingming);
    			$("#binglihao").val(pcao.hzxx.binglihao);
    			$("#chushengriqi").val(time(pcao.hzxx.shengri).format_yyyy_mm_dd());
    			$("#xingbie").val(pcao.hzxx.xingbie==true?"男":"女");
    			if(pcao.pcao==undefined){}
    			else{
    				$("#OD1").val(pcao.pcao.OD1).attr("readonly","readonly");
            		$("#OS1").val(pcao.pcao.OS1).attr("readonly","readonly");
            		$("#OD2").val(pcao.pcao.OD2).attr("readonly","readonly");
            		$("#OS2").val(pcao.pcao.OS2).attr("readonly","readonly");
            		$("#OD3").val(pcao.pcao.OD3).attr("readonly","readonly");
            		$("#OS3").val(pcao.pcao.OS3).attr("readonly","readonly");
            		$("#ODave").val(pcao.pcao.ODave).attr("readonly","readonly");
            		$("#OSave").val(pcao.pcao.OSave).attr("readonly","readonly");
            		$(".openbutton").prepend($("<a href='javascript:changePChaoEdit()' id='pchaoedit'><span></span>编辑</a>"));
    	    		$(".advsumit").parent().attr("style","display:none");
    	    		$(".advreset").parent().attr("style","display:none");
    			}
    			
    			
    		}
    		
    	}
    	//编辑p超
    	function changePChaoEdit(){
    		$("#OD1").removeAttr("readonly");
    		$("#OS1").removeAttr("readonly");
    		$("#OD2").removeAttr("readonly");
    		$("#OS2").removeAttr("readonly");
    		$("#OD3").removeAttr("readonly");
    		$("#OS3").removeAttr("readonly");
    		$("#ODave").removeAttr("readonly");
    		$("#OSave").removeAttr("readonly");
    		$("#pchaoedit").attr("style","display:none");
    		$(".advsumit").parent().attr("style","display:''");
    		$(".advreset").parent().attr("style","display:''");
    		
    	}
    	//重置p超
    	function resetPcaoForm(date1){
    		if(date1.state){
    			pcao = date1.obj;
    			if(pcao.pcao==undefined){
    				$("#OD1").val("");
            		$("#OS1").val("");
            		$("#OD2").val("");
            		$("#OS2").val("");
            		$("#OD3").val("");
            		$("#OS3").val("");
            		$("#ODave").val("");
            		$("#OSave").val("");
    			}
    			else{
    				
    				$("#OD1").val(pcao.pcao.OD1);
            		$("#OS1").val(pcao.pcao.OS1);
            		$("#OD2").val(pcao.pcao.OD2);
            		$("#OS2").val(pcao.pcao.OS2);
            		$("#OD3").val(pcao.pcao.OD3);
            		$("#OS3").val(pcao.pcao.OS3);
            		$("#ODave").val(pcao.pcao.ODave);
            		$("#OSave").val(pcao.pcao.OSave);
    			}
    			
    		}
    		
    	 }
    	function pcaoValidate(){
    		if($("#OD1").val()==""||$("#OS1").val()==""||$("#OD2").val()==""||$("#OS2").val()==""||$("#OD3").val()==""||$("#OS3").val()==""||$("#ODave").val()==""||$("#OSave").val()==""){
    			$.oimsAlert("添加信息不能为空");
    			return false;
    		}
    		if(isNaN($("#OD1").val())||isNaN($("#OS1").val())||isNaN($("#OD2").val())||isNaN($("#OS2").val())||isNaN($("#OD3").val())||isNaN($("#OS3").val())||isNaN($("#ODave").val())||isNaN($("#OSave").val())){
    			$.oimsAlert("添加信息必须是数字");
    			return false;
    		}
    		return true;
    	}
    	
    	
  //--------------------眼压  	

    	function addYanYa1() {
    		var dataObjects = getCheckBoxValue();
    		if (dataObjects.length == 0) {
    			$.oimsAlert(language.CheckOneItem_Alert);
    			return ;
    		}
    		if (dataObjects.length >1) {
    			$.oimsAlert(language.OnlyOpOneData);
    			return ;
    		}
    		//眼压弹窗后按钮
    		var yBtnTable = "<table  width='100%' border='0' cellspacing='0' cellpadding='0'>"
			+ "<tr>"
			+ "<td width='60%' >"
			+ "</td>"
			+ "<td width='19%' ><a href=\"javascript:addOrUpdateBox('yBtnDiv','add','"+dataObjects[0].huanzheID+"','"+dataObjects[0].jiuzhenID+"','"+dataObjects[0].patientID+"');\" class='advsearch' id='add'>新增<a/>"
			+ "</td>"
			+ "<td width='19%' ><a href=\"javascript:addOrUpdateBox('yBtnDiv','update','"+dataObjects[0].huanzheID+"','"+dataObjects[0].jiuzhenID+"','"+dataObjects[0].patientID+"');\" class='advsearch' id='update'>修改<a/>"
			+ "</td>"
			+ "<tr/>"
			+ "</table>";
    		  
    		
    		// 形成弹出窗口，并规定其样式
    		showYanYaList(dataObjects[0].jiuzhenID);
    		var yDiv = $("<div/>").attr("id","yYDiv");
    		var yBtnTableDiv = $("<div/>").attr("id","yBtnDiv");
    		yBtnTableDiv.append(yBtnTable);
    		//$("#yListDiv").appendTo($(yBtnTableDiv));
    		yDiv.append($(yBtnTableDiv));
    		yDiv.append($("#yListDiv"));
    		yDiv.oimsDialog({
    			width:600,
    			height:400,
    			title:"眼压",
    			winType:4,
    			locked:true,
    			closeButton:true,
    		});
		}
    	
    	function showYanYaList(jiuzhenID){
    		//alert(jiuzhenID);
			yYList = {
				listObj :[{
					title:"左眼",
					key:"os"
					
				},{
					title:"右眼",
					key:"od"
					
				},{
					title:"检查时间",
					key:"ycsj",
					func:function(value){return value.toString().substring(0,11);}
				},{
					title:"检查单ID",
					key:"id"
				}],
				url : contextPath + "/publish/child/getYanYaList.htm",
	  			method : "post",
	  			checkbox : true,
	  			single : false,
	  			data : {// data表示传的参数
	  				currentPage : 1,
	  				pageSize : getPageSize(),// Page类的方法
	  				tag : Math.random(),
	  				search:jiuzhenID
	  			}				
			}	
		  	var yListDiv = $("<div><div />")/*.attr("id","yListDiv").attr("class","list").appendTo("#yYDiv");*/
		  	$(yListDiv).attr("id","yListDiv").attr("class","list");
			$(yListDiv).appendTo("#right");
			$.ajax({
				url : yYList.url,//url
		        data : yYList.data,//参数
		        async : false,
		        dataType : 'json',
		        type : yYList.method,//get,post传参方式
		        success : function(data) {
		            showMyList($(yListDiv), data, yYList);
		        }
			});
		}
    	
    	
    	//-------------------------------------------------------------------------------------
    	//---------------------current = yListDiv----------------------------------------------------
    	//---------------------settings = yYList---------------------------------------------------------
    	//-------------------------------------------------------------------------------------
    	//-------------------------------------------------------------------------------------
    	function showMyList(current, data, settings) {
    	    $(current).text("");//首先清空div内容
    	    addList(current, data.list, settings);//添加list数据
    	    var formId=settings.formId;//formId 表单ID
    	    if(formId==undefined)formId="yYForm";//默认值为pageForm
    	    var pageForm = $("#"+formId);//是一个form对象
    	    if(!pageForm.length){//form对象为空创建此form对象
    	        pageForm=$("<form/>").attr("id", formId).css("text-align","right").appendTo(current);
    	    }else{//form对象不为空
    	        $(pageForm).text("");
    	    }
    	    $.each(settings.data,function(n,v){
    	        $("<input/>").attr("name",n).attr("type","hidden").val(v).appendTo(pageForm);
    	    });
    	    $(pageForm).attr("method", settings.method);//form 对象的method方法赋值
    	    $(pageForm).attr("action", settings.url);//form对象的url
    	    addPage(data.page, pageForm);//传入一个集合数据集，一个form对象，添加数据
    	    $(pageForm).ajaxForm({
    	        dataType : 'json',
    	        success : function(result) {
    	            showMyList(current, result, settings);
    	        }
    	    });
    	}
    	
    	//target 表单对象
    	function addPage(page,target) {
    		var divID = $("#yListDiv").attr("id");
    	    $("<input/>").attr("type", "hidden").attr("name", "pageCount").val(page.pageCount).appendTo(target);
    	    var div = $("<div/>").addClass("page").appendTo(target);
    	    if(divID != undefined) {
    	        var input = "<div id = 'yQuanXuanDiv' class ='selectAllClass'>" +
    	        			"<input id = 'yQuanXuanInput' type ='checkBox' class ='selectAllClassInput' />" +
    	        			"<span>"+common_language.quanXuanLanguage+"</span></div>" +
    	        			"<div id = 'yFanXuan' class = 'invertSelectClass'>" +
    	        			"<input id = 'yFanXuanInput' type ='checkBox' class = 'invertSelectClassInput' />" +
    	        			"<span>"+common_language.fanXuanLanguage+"</span></div>";
    	        div.append($(input));
    	    }
    	    if (page.pageCount > 1) {
    	      $("<span ><input name='page' type='text' class='blur1'/>" +
    	      		"<a id='go' href='#'>GO</a></span>").appendTo(div);
    	        $("#"+divID+" a[id=go]").click(
    	                function() {
    	                    var n = $("#"+divID+" input[name=page]").val();
    	                    if (isNaN(n)) {
    	                        $.oimsAlert(common_language.QingShuRuNum);
    	                        return;
    	                    }
    	                    if (n < 1 || n > eval($("#"+divID+" input[name=pageCount]").val())) {
    	                        $.oimsAlert(common_language.QingShuRuOneDao + $("#"+divID+" input[name=pageCount]").val()
    	                                + common_language.ZhiJianNum);
    	                        return;
    	                    }
    	                    $("#"+divID+" input[name=currentPage]").val(n);
    	                    $(target).submit();
    	                });
    	    }
    	    
    	    //添加全选反选功能
    	    $("#yQuanXuanInput").click(function (){
    	        $("#yFanXuanInput")[0].checked = false;
    	        var TF = false;
    	        if($(this)[0].checked){
    	            TF = true;
    	        }else{
    	            TF = false;
    	        }
    	        $("#" + divID +" table input[type = 'checkbox']").each(function(){
    	            $(this)[0].checked = TF;
    	            if(TF){
    	                $(this)[0].parentNode.parentNode.className = "t4";
    	            }else{
    	                $(this)[0].parentNode.parentNode.className = selectClass(($(this)[0].id).split("checkBoxObj")[1]);
    	            }
    	        });
    	    });
    	    $("#yFanXuanInput").click(function (){
    	        $("#yQuanXuanInput")[0].checked = false;
    	        $("#" + divID +" table input[type = 'checkbox']").each(function(){
    	            $(this)[0].checked = !$(this)[0].checked;
    	            if($(this)[0].checked){
    	                $(this)[0].parentNode.parentNode.className = "t4";
    	            }else{
    	                $(this)[0].parentNode.parentNode.className = selectClass(($(this)[0].id).split("checkBoxObj")[1]);
    	            }
    	        });
    	    });
    	    if (page.currentPage < page.pageCount) {   	        
    	        var l = $("<a href='#'><span class='pagerighta' title='"+common_language.LastYeLanguage+"'></span></a>").appendTo(div);
    	        $(l).click(function() {
    	            $("#"+divID+" input[name=currentPage]").val(page.pageCount);
    	            $(target).submit();
    	        });   	    
    	        var nextPage = $("<a href='#'><span class='pagerightb' title='"+common_language.NextYeLanguage+"'></span></a>").appendTo(div);
    	        $(nextPage).click(
    	                function() {
    	                    var curPage = page.currentPage+1;
    	                    $("#"+divID+" input[name=currentPage]").val(curPage);
    	                    $(target).submit();
    	                });   	        
    	    }   	    
    	    if (page.currentPage > 1) {    	        
    	        var p = $("<a href='#'><span class='pageleftb' title='"+common_language.ShangYeLanguage+"'></span></a>").appendTo(div);
    	        $(p).click(
    	                function() {
    	                    var curPage = page.currentPage-1;
    	                    $("#"+divID+" input[name=currentPage]").val(curPage);
    	                    $(target).submit();
    	            });
    	        var firstPage =  $("<a href='#'><span class='pagelefta' title='"+common_language.ShowYeLanguage+"'></span></a>").appendTo(div);
    	        $(firstPage).click(function() {
    	            $("#"+divID+" input[name=currentPage]").val(1);
    	            $(target).submit();
    	        });	        
    	    } 	    
    	    var str = "<span>"+common_language.DangQianNum + page.currentPage+common_language.YeGongLanguage+page.pageCount+ common_language.YeGongLanguage+page.rowsCount+common_language.tiaoLanguageFen+"&nbsp;&nbsp; &nbsp;</span>";
    	    $(str).appendTo(div);	    
    	}
    	
    	function addList(currentDiv,listData,settings)
    	{
    		var divID = $(currentDiv).attr("id");
    	    var listObj=settings.listObj;//表格标题的参数（对象的数组）listObj : [ {title : "列标题一",key : ""},{title : "列标题二",key : ""} ]
    	    var tableId=$(currentDiv).attr("id")+"Table";//声明一个ID
    	    var tablex=$("<table/>").attr("id",tableId).attr("cellspacing",0).attr("cellpadding",0).appendTo(currentDiv);//创建一个table写入到currentDiv
    	    var trTitle=$("<tr/>").appendTo(tablex);//表格第一行对象
    	    if(settings.checkbox==true)//true表示显示复选框
    	        $("<th/>").attr("nowrap","true").text(common_language.xuanZeLanguage).appendTo(trTitle);//<th>则表示标题,一般用在一列的第一格,里面的内容会自动加粗加黑他们
    	    //表格标题的打印
    	    $.each(listObj,function(i,obj){
    	        $("<th/>").attr("nowrap","true").text(obj.title).appendTo(trTitle);//<th>则表示标题,一般用在一列的第一格,里面的内容会自动加粗加黑他们
    	    });
    	    if(settings.manageMenu!=undefined && settings.manageMenu!=null && settings.manageMenu!="")
    	        $("<th/>").text(common_language.YongHuCaoLanguage).appendTo(trTitle);
    	    //表格数据打印，listData是一个数据对象的集合
    	    if(listData!=null&&listData.length!=0){
    	    //数据打印方法开始
    	    $.each(listData,function(m,data){//对象的集合
    	        //trData定义开始
    	        var trData = $("<tr/>");
    	        if(settings.checkbox==true)//true表示显示复选框,主要解决没有复选框单击行报错问题
    	        {
    	            trData.bind('click',function(){ //创建一行写入到tablex表格中
    	            	if($("#yQuanXuanInput").length != 0){
    	    	            $("#yQuanXuanInput")[0].checked = false;
    	    	            $("#yFanXuanInput")[0].checked = false;
    	            	}
    		            if(settings.single==true)//single==true表示复选框只能单选
    		            {                
    		                var checkBoxObjm=$('#'+divID+' input[id=checkBoxObj'+m+']')[0];
    		                var state=false;
    		                if(checkBoxObjm.checked==false){
    		                    state=true;
    		                    $(this)[0].className = "t4";
    		                }else{
    		                    $(this)[0].className = selectClass(m);
    		                }
    		                    
    		                if(settings.invocationEvent==true){
    		                	selectCancel('checkBoxObj');
    		                    selectAllCheckboxByID(state,'checkBoxObj',"checkBoxObj"+m,settings.methodName_Checked,settings.methodName_NoChecked);
    		                }else{
    		                    selectAllCheckboxByID(state,'checkBoxObj',"checkBoxObj"+m,null,null);     
    		                }
    		                
    		             }else
    		             {
    		                if($('#'+divID+' input[id=checkBoxObj'+m+']')[0].checked==true){                    
    		                    $('#'+divID+' input[id=checkBoxObj'+m+']')[0].checked=false;
    		                    $(this)[0].className = selectClass(m);
    		                }else{
    		                    $('#'+divID+' input[id=checkBoxObj'+m+']')[0].checked=true;
    		                    $(this)[0].className = "t4";
    		                }
    		             }
    		        });
    	        }
    	        //trData定义结束
    	        trData.appendTo(tablex);
    	        if(settings.checkbox==true)//true表示显示复选框
    	        {
    	            var checkBoxObj=$("<input />").attr("type", "checkbox").attr("name", "checkBoxObj").attr("id","checkBoxObj"+m).attr("value",data).attr("value",(JSON.stringify(data).replace(new RegExp("\"","gm"),"'"))).click(function(){
    	            	if($('#'+divID+' input[id=checkBoxObj'+m+']')[0].checked==true){
    	                	 $('#'+divID+' input[id=checkBoxObj'+m+']')[0].checked=false;
    	                }                  
    	                else
    	                {
    	                    $('#'+divID+' input[id=checkBoxObj'+m+']')[0].checked=true;
    	                }
    	                   
    	            });
    	            $("<td />").html(checkBoxObj).appendTo(trData);
    	        }
    	        $.each(listObj, function(n, obj){//key的集合
    	            var val_td="-";
    	            $.each(data,function(key,value){//对象属性值的集合
    	                if (key == obj.key) {//字段等于表格表头的key
    	                    if(value!=null&&typeof(value)=="object"&&value.time!=null)//时间
    	                        value=formatDateTime(parseInt(value.time));
    	                    if (obj.func != undefined)
    	                        value = obj.func(value);//什么意思     
    	                    if(value!=null&&value.length>20)//如果长度过长
    	                    	value=value.substring(0,12)+".....";
    	                    val_td=value; 
    	                }
    	            });//三次循环结束
    	            $("<td />").html(val_td).appendTo(trData);
    	        });//二层循环结束
    	        if(settings.manageMenu!=undefined && settings.manageMenu!=null && settings.manageMenu!="")
    	            $(getManageMenuForList(data, settings)).appendTo($("<td/>").appendTo(trData));
    	    });//一层循环结束
    	    //数据打印方法结束
    	    tableCss(tableId);//表格样式渲染
    	    }else
    	    {
    	        var trError=$("<tr/>").appendTo(tablex);
    	        var rowspanNumber=settings.data.pageSize;
    	        var colspanNumber=listObj.length;
    	        if(settings.checkbox==true)
    	            colspanNumber+=1;
    	        if(settings.manageMenu!=undefined && settings.manageMenu!=null && settings.manageMenu!="")
    	            colspanNumber+=1;
    	        var tdErrorHtml="<font size='3' color='red'></font>";
    	        var tdError= $("<td/>").html(tdErrorHtml).attr("rowspan",rowspanNumber).attr("colspan",colspanNumber).appendTo(trError);
    	        tableErrorCss(tableId);//表格错误样式渲染
    	    }
    	}   
    	
    	//-------------------------------------------------------------------------------------
    	//-------------------------------------------------------------------------------------
    	//-------------------------------------------------------------------------------------
    	//-------------------------------------------------------------------------------------
    	//-------------------------------------------------------------------------------------
    	//-------------------------------------------------------------------------------------
    	
		
		function addOrUpdateBox(parentDivID,type,hzid,jzid,patientID){
			var os = '';
			var od = '';
			if(type == 'update'){
				//
	    		if ($("#yListDivTable input[name='checkBoxObj']:checked ").length == 0) {
	    			$.oimsAlert(language.CheckOneItem_Alert);
	    			return ;
	    		}
	    		if ($("#yListDivTable input[name='checkBoxObj']:checked ").length >1) {
	    			$.oimsAlert(language.OnlyOpOneData);
	    			return ;
	    		}
	    		var data = eval("("+$("#yListDivTable input[name='checkBoxObj']:checked")[0].value+")");
    			os = type == 'update' ? data.os : ""; 
    			od = type == 'update' ? data.od : "";
			}
			//parentDivID---父容器的ID	type---addOrUpdate
			
			//弹出的table
			var divContent = "";
			divContent += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
			divContent += "<tr>"
						+  "<td width='15%' align='right' nowrap>左眼：<input id='type' type='hidden' value='"+type+"'></td>" 
						+  "<td width='30%'><input type='text' name='os'   id='os'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' value='"+os+"' /></td>" 
						+  "<td width='15%' align='right' nowrap>右眼：</td>" 
						+  "<td width='30%'><input type='text' name='od'   id='od'   onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' value='"+od+"' /></td>"  
						+  "</tr>";
			divContent += "</table>";
			divContent += "<div class='avdopenbutton' >";
			divContent += "<a id='submit"+type+"' href='#'><span class='advsumit'></span>提交</a> " 
						+  "<a id='reset"+type+"' href='#'><span class='advreset'></span>重置</a>" 
						+  "<a id = 'closeId"+type+"'><span class='close' ></span>关闭</a>";
			divContent += "</div>";
			if($(".avdsearch").length == 0)	showWin();
			else{
				if(type == $("#type").val()){
					$(".avdsearch").animate({"height":"0"},"normal",function(){
						$(".avdsearch").remove();
						$("#"+type+"Div").className = "avdsearch";
					})
				}else{
					$("#"+$("#type").val()+"Div").animate({"height":"0"},"normal",function(){
						$("#"+$("#type").val()+"Div").remove();
						$("#"+type+"Div").className = "avdsearch";
					})
					showWin();
				}
			};
			//显示Div
			function showWin(){
				var win = $("<div/>").addClass("avdsearch");
				$(win).attr("id",type+"Div");
				$(divContent).appendTo(win);
				$("#"+ parentDivID).append(win);
				win.css({"display":"none","margin":"0px 10px 0px 5px"});
				win.slideDown("normal");
				$("#"+type+"Div").className = "xuanzhong_oimsDiv";
				$("#closeId"+type).click(function(){
					$("#"+type+"Div").animate({"height":"0"},"normal",function(){
						$("#"+type+"Div").remove();
						$("#"+type+"Div").className = "advsearch";					
					});
				});
				$("#reset"+type).click(function(){
					$("#od").val("");
	    			$("#os").val("");
				});
				
				$("#submit"+type).click(function(){
					var yanYaurl = '';
					if(type == 'add'){
						yanYaurl = '/publish/child/addYanYa.htm';
					}else if(type == 'update'){
						yanYaurl = '/publish/child/updateYanYa.htm';
					}
					var result = getJSONData(yanYaurl, {
						huanzeId : hzid, // 患者id
						jiuzhenId : jzid, // 就诊id
		    			od:$("#od").val(),
		    			os:$("#os").val(),
		    			jcdid:$("#yListDivTable input[name='checkBoxObj']:checked ").parent().nextAll().last().html(),
		    			tag : Math.random()	
		    		}, "post");
					if(result.state == 1) alert((type == 'add'? "添加":"修改") + "成功！");
					else alert((type == 'add'? "添加":"修改") + "失败！");
					$("#yListDiv").remove();
					
					showYanYaList(jzid);
					$("#yYDiv").append($("#yListDiv"));	
					
					
				});
				
				
			};
			
		}
//---------------------P超结束-------------------------
    	//-------------A超开始------

    	function addAChao(){
    		var dataObj = getCheckBoxValue();	//获取选中项中 第一个选中项的值
	
    		
    		if (dataObj.length == 0) {
    			$.oimsAlert(language.CheckOneItem_Alert);
    			return;
    		}
    		if (dataObj.length >1) {
    			$.oimsAlert(language.OnlyOpOneData);
    			return;
    		}
    		var aChaoResult = getJSONData("/publish/child/findUpdateAChao.htm", {
    			huanzheid : dataObj[0].huanzheID, // 患者id
    			jiuzhenid : dataObj[0].jiuzhenID, // 就诊id
    			tag : Math.random()	
    		}, "post");
    		//->>弹窗中显示的数据
    		var table_jibenOne = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
    			+ "<tr>"
    			+"<td width='8%'></td>"
    			+ "<td width='19%' align='center'  class='sl'>"+"</td>"
    			+ "<td width='7%' align='right' nowrap='nowrap'>姓名"+":</td>"
    			+ "<td width='19%' align='left'><input type='text' name='xingming' size='20' id='xingming' disabled=true/></td>"
    			+ "<td width='7%' align='right' nowrap='nowrap'>病历号 "+":</td>"
    			+ "<td width='19%' align='left'><input type='text' name='binglihao' size='20' id='binglihao' disabled=true /></td>"
    			+ "<td width='28%' align='left'>&nbsp;</td>" + "</tr>" + "</table>";

    		var table_jibenTwo = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
    			+ "<tr>"
    			+"<td width='8%'></td>"
    			+ "<td width='19%' align='center'  class='sl'>"+"</td>"
    			+ "<td width='7%' align='right' nowrap='nowrap'>出生日期"+":</td>"
    			+ "<td width='19%' align='left'><input type='text' name='birthday' size='20' id='birthday' disabled=true/></td>"
    			+ "<td width='7%' align='right' nowrap='nowrap'>性别 "+":</td>"
    			+ "<td width='19%' align='left'><input type='text' name='sex' size='20' id='sex' disabled=true /></td>"
    			+ "<td width='28%' align='left'>&nbsp;</td>" + "</tr>" + "</table>";
    		
    		var table_a = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
    				+ "<tr>"
    				+"<td width='8%'></td>"
    				+ "<td width='19%' align='center'  class='sl'>"+"a"+":</td>"
    				+ "<td width='7%' align='right' nowrap='nowrap'>"+"左眼"+":</td>"
    				+ "<td width='19%' align='left'><input type='text' name='od_a' size='20' id='od_a' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
    				+ "<td width='7%' align='right' nowrap='nowrap'> "+"右眼"+":</td>"
    				+ "<td width='19%' align='left'><input type='text' name='os_a' size='20' id='os_a' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
    				+ "<td width='28%' align='left'>&nbsp;</td>" + "</tr>" + "</table>";

    		var table_l = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
    				+ "<tr>"
    				+"<td width='8%'></td>"
    				+ "<td width='19%' align='center'  class='sl'>"+"l"+":</td>"
    				+ "<td width='7%' align='right' nowrap='nowrap'>"+"左眼"+":</td>"
    				+ "<td width='19%' align='left'><input type='text' name='od_l' size='20' id='od_l' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
    				+ "<td width='7%' align='right' nowrap='nowrap'>"+"右眼"+":</td>"
    				+ "<td width='19%' align='left'><input type='text' name='os_l' size='20' id='os_l' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
    				+ "<td width='28%' align='left'>&nbsp;</td>" + "</tr>" + "</table>";

    		var table_v = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
    				+ "<tr>"
    				+"<td width='8%'></td>"
    				+ "<td width='19%' align='center'  class='sl'>"+"v"+":</td>"
    				+ "<td width='7%' align='right' nowrap='nowrap'>"+"左眼"+"</td>"
    				+ "<td width='19%' align='left'><input type='text' name='od_v' size='20' id='od_v' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
    				+ "<td width='7%' align='right' nowrap='nowrap'>"+"右眼"+"</td>"
    				+ "<td width='19%' align='left'><input type='text' name='os_v' size='20' id='os_v' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
    				+ "<td width='28%' align='left'>&nbsp;</td>" + "</tr>" + "</table>";
    		
    		var table_al = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
    			+ "<tr>"
    			+"<td width='8%'></td>"
    			+ "<td width='19%' align='center'  class='sl'>"+"al"+":</td>"
    			+ "<td width='7%' align='right' nowrap='nowrap'>"+"左眼"+"</td>"
    			+ "<td width='19%' align='left'><input type='text' name='od_al' size='20' id='od_al' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
    			+ "<td width='7%' align='right' nowrap='nowrap'>"+"右眼	"+"</td>"
    			+ "<td width='19%' align='left'><input type='text' name='os_al' size='20' id='os_al' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
    			+ "<td width='28%' align='left'>&nbsp;</td>" + "</tr>" + "</table>";
    		
    		var yincang_id = "<input type=hidden name='jiuzhenId' id='jiuzhenId'>"
    			+ "<input type=hidden name='huanzheId' id='huanzheId'>";
    		//->>点击后显示的窗口
    		var f = oimsFormWindow({
    			id : "form_AChao",		
    			url : contextPath + "/publish/child/saveOrUpdateAChao.htm",
    			dialogTitle : "A超检查信息",
    			height : 300,
    			width : 600,
    			resetForm : function(){resetAChaoForm(aChaoResult.state,aChaoResult.obj);},
    			btnOkSuccess : function(data, responseText, statusText) {
    				if(data.state == 1)
    					$.oimsSucc("添加成功");
    				if(data.state == 2)
    					$.oimsSucc("修改成功");	
    				f.parent().parent().remove();
    			},
    			btnOkError : function(jqXHR, textStatus, errorThrown) {
    				$.oimsError("添加失败，请假查数据库连接");

    			},
    			btnOkBefor : aChaoFormValidate
    		});
    		f.append(table_jibenOne);
    		f.append(table_jibenTwo);
    		f.append(table_a);
    		f.append(table_l);
    		f.append(table_v);
    		f.append(table_al);
    		f.append(yincang_id);
    		$("#huanzheId").val(dataObj[0].huanzheID);// 患者id
    		$("#jiuzhenId").val(dataObj[0].jiuzhenID);// 就诊id
    		
    		
    		var result = getJSONData("/publish/child/findHzxxById.htm", {
    			huanzheid : dataObj[0].huanzheID, // 患者id
    			jiuzhenid : dataObj[0].jiuzhenID, // 就诊id
    			tag : Math.random()	
    		}, "post");
    		if (result.state) {
    			aChao = result.obj;
    			
    			$("#xingming").val(aChao.hzxx.xingming);
    			$("#binglihao").val(aChao.hzxx.binglihao);
    			$("#birthday").val(time(aChao.hzxx.shengri).format_yyyy_mm_dd());
    			$("#sex").val(aChao.hzxx.xingbie==true?"男":"女");
    		}
    	
    		if (aChaoResult.state == 2) {		
    			aChao = aChaoResult.obj;	
    			$("#od_a").val(aChao.ac.od_a).attr("readonly","readonly");
        		$("#os_a").val(aChao.ac.os_a).attr("readonly","readonly");
        		$("#od_v").val(aChao.ac.od_v).attr("readonly","readonly");
        		$("#os_v").val(aChao.ac.os_v).attr("readonly","readonly");
        		$("#od_l").val(aChao.ac.od_l).attr("readonly","readonly");
        		$("#os_l").val(aChao.ac.os_l).attr("readonly","readonly");
        		$("#od_al").val(aChao.ac.od_al).attr("readonly","readonly");
        		$("#os_al").val(aChao.ac.os_al).attr("readonly","readonly");
        		$(".openbutton").prepend($("<a href='javascript:changeAChaoEdit()' id='AChaoEdit'><span></span>编辑</a>"));
	    		$(".advsumit").parent().attr("style","display:none");
	    		$(".advreset").parent().attr("style","display:none");
    		}
    		if(aChaoResult.state == 1){
    			resetAChaoForm();
    		}
    	}
    	//A超表单验证是否为空
    	function aChaoFormValidate(){
    		if(	$("#od_a").val()==""||$("#os_a").val()==""||$("#od_v").val()==""||$("#os_v").val()==""||$("#od_l").val()==""||$("#os_l").val()==""||$("#od_al").val()==""||$("#os_al").val()==""){
    			$.oimsAlert("添加信息不能为空");
    			return false;
    		}
    		if(isNaN($("#od_a").val())||isNaN($("#os_a").val())||isNaN($("#od_v").val())||isNaN($("#os_v").val())||isNaN($("#od_l").val())||isNaN($("#os_l").val())||isNaN($("#os_l").val())||isNaN($("#os_al").val())){
    			$.oimsAlert("添加的信息必须为数字");
    			return false;
    		}
    	}

    	//重置A超表单信息
    	function resetAChaoForm(state,aChao) {
    		if(state==2){$("#od_a").val(aChao.ac.od_a);
    		$("#os_a").val(aChao.ac.os_a);
    		$("#od_v").val(aChao.ac.od_v);
    		$("#os_v").val(aChao.ac.os_v);
    		$("#od_l").val(aChao.ac.od_l);
    		$("#os_l").val(aChao.ac.os_l);
    		$("#od_al").val(aChao.ac.od_al);
    		$("#os_al").val(aChao.ac.os_al);}
    		else{
    			$("#od_a").val("");
        		$("#os_a").val("");
        		$("#od_v").val("");
        		$("#os_v").val("");
        		$("#od_l").val("");
        		$("#os_l").val("");
        		$("#od_al").val("");
        		$("#os_al").val("");
    		}
    		
    	}
    	//更改a超状态为可编辑
    	function changeAChaoEdit(){
    		$("#od_a").removeAttr("readonly");
    		$("#os_a").removeAttr("readonly");
    		$("#od_v").removeAttr("readonly");
    		$("#os_v").removeAttr("readonly");
    		$("#od_l").removeAttr("readonly");
    		$("#os_l").removeAttr("readonly");
    		$("#od_al").removeAttr("readonly");
    		$("#os_al").removeAttr("readonly");
    		$("#AChaoEdit").attr("style","display:none");
    		$(".advsumit").parent().attr("style","display:''");;
    		$(".advreset").parent().attr("style","display:''");
    	}

    	//-------------------------------体格检查开始
    	function addTGJCTable() {
    		// 获取选择的复选框的值
    		var dataObj = getCheckBoxValue();
    		if (dataObj.length == 0) {
    			$.oimsAlert(language.CheckOneItem_Alert);
    			return;
    		}
    		if (dataObj.length >1) {
    			$.oimsAlert(language.OnlyOpOneData);
    			return;
    		}
    		var table="<table width='700'>"
        	    +"<tr>"
        	    +"<td width='23%' align='right'>小儿姓名：</td>"
        	    +"<td width='28%'><input name='name' type='text' id='name'  disabled/></td>"
        	    +"<td width='2%'></td>"
        	    +"<td width='17%' align='right'>病历号：</td>"
        	    +"<td width='28%'><input type='text' name='patientID' id='patientID' disabled></td>"
        	    +"<td width='2%' ></td>"
        	    +"</tr>"
        	    +"<tr>"
        	    +"<td align='right'>小儿性别：</td>"
        	    +"<td><input name='sex' type='radio' id='sex' value='1' disabled/>男<input type='radio' name='sex' id='sex' value='0' disabled/>女</td>"
        	    +"<td></td>"
        	    +"<td align='right'>出生日期：</td>"
        	    +"<td><input name='birthday' type='text' id='birthday'  disabled/></td>"
        	    +"<td></td>"
        	    +"</tr>"
        	    +"<tr>"
        	    +"<td align='right'>监护人姓名：</td>"
        	    +"<td><input type='text' name='jhrxm' id='jhrxm' disabled></td>"
        	    +"<td>&nbsp;</td>"
//        	    +"<td align='right'>就诊id:</td>"
//        	    +"<td><input type='text' name='jiuzhenID' id='jiuzhenID'></td>"
//        	    +"<td>&nbsp;</td>"
        	    +"</tr>"
        	    +"<tr>"
        	    +"<td align='right'>右眼角膜：</td>"
        	    +"<td><input type='text' name='jiaomoOD' id='jiaomoOD'></td>"
        	    +"<td>&nbsp;</td>"
        	    +"<td align='right'>右眼结膜：</td>"
        	    +"<td><input type='text' name='jiemoOD' id='jiemoOD'></td>"
        	    +"<td>&nbsp;</td>"
        	    +"</tr>"
        	    +"<tr>"
        	    +"<td align='right'>右眼晶体：</td>"
        	    +"<td><input type='text' name='jingtiOD' id='jingtiOD'></td>"
        	    +"<td>&nbsp;</td>"
        	    +"<td align='right'>右眼玻璃体：</td>"
        	    +"<td><input type='text' name='bolitiOD' id='bolitiOD'></td>"
        	    +"<td>&nbsp;</td>"
        	    +"</tr>"
        	    +"<tr>"
        	    +"<td align='right'>右眼视网膜：</td>"
        	    +"<td><input type='text' name='shiwangmoOD' id='shiwangmoOD'></td>"
        	    +"<td>&nbsp;</td>"
        	    +"<td align='right'>右眼视盘：</td>"
        	    +"<td><input type='text' name='shipanOD' id='shipanOD'></td>"
        	    +"<td>&nbsp;</td>"
        	    +"</tr>"
        	    +"<tr>"
        	    +"<td align='right'>左眼角膜：</td>"
        	    +"<td><input type='text' name='jiaomoOS' id='jiaomoOS'></td>"
        	    +"<td>&nbsp;</td>"
        	    +"<td align='right'>左眼结膜：</td>"
        	    +"<td><input type='text' name='jiemoOS' id='jiemoOS'></td>"
        	    +"<td>&nbsp;</td>"
        	    +"</tr>"
        	    +"<tr>"
        	    +"<td align='right'>左眼晶体：</td>"
        	    +"<td><input type='text' name='jingtiOS' id='jingtiOS'></td>"
        	    +"<td>&nbsp;</td>"
        	    +"<td align='right'>左眼玻璃体：</td>"
        	    +"<td><input type='text' name='bolitiOS' id='bolitiOS'></td>"
        	    +"<td>&nbsp;</td>"
        	    +"</tr>"
        	    +"<tr>"
        	    +"<td align='right'>左眼视网膜：</td>"
        	    +"<td><input type='text' name='shiwangmoOS' id='shiwangmoOS'></td>"
        	    +"<td>&nbsp;</td>"
        	    +"<td align='right'>左眼视盘：</td>"
        	    +"<td><input type='text' name='shipanOS' id='shipanOS'></td>"
        	    +"<td>&nbsp;</td>"
        	    +"</table>";
    		var yincang_id = "<input type=hidden name='jiuzhenId' id='jiuzhenId'>"
    				+ "<input type=hidden name='huanzheId' id='huanzheId'>";
    		var date1 = getJSONData("/publish/child/findTGJC.htm", {
    			huanzheid : dataObj[0].huanzheID, // 患者id
    			jiuzhenid : dataObj[0].jiuzhenID, // 就诊id
    			tag : Math.random()
    		}, "post");
    		var f = oimsFormWindow({
    			id : "form_tigeCheck",
    			url : contextPath + "/publish/child/addTiGeInfo.htm",
    			height : 300,
    			width : 600,
    			dialogTitle:"体格检查",
    			resetForm:function(){resetTGJCForm(date1.state,date1.obj);},
    			btnOkSuccess : function(data, responseText, statusText) {
    				$.oimsSucc("添加成功");
    				f.parent().parent().remove();
    				
    			},
    			
    			btnOkError : function(jqXHR, textStatus, errorThrown) {
    				$.oimsError("添加失败");
    			},
    			btnOkBefor:tgjcValidate
    			
    		});
    		f.append(table);
    		f.append(yincang_id);
    		$("#huanzheId").val(dataObj[0].huanzheID);// 患者id
    		$("#jiuzhenId").val(dataObj[0].jiuzhenID);// 就诊id
    	
    		
    		if (date1.state) {
    			
    			tige = date1.obj;
    			$("#name").val(tige.hzxx.xingming);
    			$("#patientID").val(tige.hzxx.binglihao);
    			$("#birthday").val(time(tige.hzxx.shengri).format_yyyy_mm_dd());
    			$("input[type='radio'][name='sex'][value='"+(tige.hzxx.xingbie==true?"1":"0")+"']").attr("checked","checked");
    			$("#jhrxm").val(tige.hzxx.hzlxr);
    			if(date1.state==1){
    				
    			}
    			else{
    				$("#jiaomoOD").val(tige.tgjc60101).attr("readonly","readonly");
            		$("#jiemoOD").val(tige.tgjc60102).attr("readonly","readonly");
            		$("#jingtiOD").val(tige.tgjc60103).attr("readonly","readonly");
            		$("#bolitiOD").val(tige.tgjc60104).attr("readonly","readonly");
            		$("#shiwangmoOD").val(tige.tgjc60105).attr("readonly","readonly");
            		$("#shipanOD").val(tige.tgjc60106).attr("readonly","readonly");
            		$("#jiaomoOS").val(tige.tgjc60107).attr("readonly","readonly");
            		$("#jiemoOS").val(tige.tgjc60108).attr("readonly","readonly");
            		$("#jingtiOS").val(tige.tgjc60109).attr("readonly","readonly");
            		$("#bolitiOS").val(tige.tgjc60110).attr("readonly","readonly");
            		$("#shiwangmoOS").val(tige.tgjc60111).attr("readonly","readonly");
            		$("#shipanOS").val(tige.tgjc60112).attr("readonly","readonly");
            		$(".openbutton").prepend($("<a href='javascript:changeTgjcEdit()' id='tgjcedit'><span></span>编辑</a>"));
    	    		$(".advsumit").parent().attr("style","display:none");
    	    		$(".advreset").parent().attr("style","display:none");
    				}
    		
    			
    			/*
    			 * $("#OD1").val(ShiLi.rjz); $("#OD2").val(ShiLi.lj);
    			 * $("#OD3").val(ShiLi.rj); $("#OS1").val(ShiLi.rjz);
    			 * $("#OS2").val(ShiLi.lj); $("#OS3").val(ShiLi.rj);
    			 * $("#ODave").val(ShiLi.rjz); $("#OSave").val(ShiLi.lj);
    			 */
    		}
    		else{
    			$.oimsAlert("数据库连接异常");
    		}
    	}
    	//使体格检查变成可编辑状态
    	function changeTgjcEdit(){
    		$("#jiaomoOD").removeAttr("readonly");
    		$("#jiemoOD").removeAttr("readonly");
    		$("#jingtiOD").removeAttr("readonly");
    		$("#bolitiOD").removeAttr("readonly");
    		$("#shiwangmoOD").removeAttr("readonly");
    		$("#shipanOD").removeAttr("readonly");
    		$("#jiaomoOS").removeAttr("readonly");
    		$("#jiemoOS").removeAttr("readonly");
    		$("#jingtiOS").removeAttr("readonly");
    		$("#bolitiOS").removeAttr("readonly");
    		$("#shiwangmoOS").removeAttr("readonly");
    		$("#shipanOS").removeAttr("readonly");
    		$("#tgjcedit").attr("style","display:none");
    		$(".advsumit").parent().attr("style","display:''");
    		$(".advreset").parent().attr("style","display:''");
    	}
    	
    	
    	function resetTGJCForm(state,tige){
    		if(state==2){
    			$("#jiaomoOD").val(tige.tgjc60101);
        		$("#jiemoOD").val(tige.tgjc60102);
        		$("#jingtiOD").val(tige.tgjc60103);
        		$("#bolitiOD").val(tige.tgjc60104);
        		$("#shiwangmoOD").val(tige.tgjc60105);
        		$("#shipanOD").val(tige.tgjc60106);
        		$("#jiaomoOS").val(tige.tgjc60107);
        		$("#jiemoOS").val(tige.tgjc60108);
        		$("#jingtiOS").val(tige.tgjc60109);
        		$("#bolitiOS").val(tige.tgjc60110);
        		$("#shiwangmoOS").val(tige.tgjc60111);
        		$("#shipanOS").val(tige.tgjc60112);

    		}
    		else{
    			$("#jiaomoOD").val("");
        		$("#jiemoOD").val("");
        		$("#jingtiOD").val("");
        		$("#bolitiOD").val("");
        		$("#shiwangmoOD").val("");
        		$("#shipanOD").val("");
        		$("#jiaomoOS").val("");
        		$("#jiemoOS").val("");
        		$("#jingtiOS").val("");
        		$("#bolitiOS").val("");
        		$("#shiwangmoOS").val("");
        		$("#shipanOS").val("");

    		}
    		    		
    	}
    	function tgjcValidate(){
    		if($("#jiaomoOD").val()==""||$("#jiemoOD").val()==""||$("#jingtiOD").val()==""||$("#bolitiOD").val()==""||$("#shiwangmoOD").val()==""||$("#shipanOD").val()==""||$("#jiaomoOS").val()==""||$("#jiemoOS").val()==""||$("#jingtiOS").val()==""||$("#bolitiOS").val()==""||$("#shiwangmoOS").val()==""||$("#shipanOS").val()==""){
    			$.oimsAlert("添加信息不能为空");
    			return false;
    		}
    		return true;
    	}
//    	/**
//    	 * <p>
//    	 * 用于体格检查添加表单
//    	 * </p>
//    	 * 
//    	 * @author andy
//    	 * 
//    	 */
//    	function resetEditTiGeForm() {
//    		$("#name").val(pcao.hzxx.xingming);
//    		$("#patientID").val(pcao.hzxx.binglihao);
//    		$("#birthday").val(pcao.hzxx.shengri);
//    		$("#sex").val(pcao.hzxx.xingbie);
//    	}
    	
 //--------------------屈光
    	function addQuGuang(){
    		var dataObj = getCheckBoxValue();
    		if (dataObj.length == 0) {
    			$.oimsAlert(language.CheckOneItem_Alert);
    			return;
    		}
    		if (dataObj.length >1) {
    			$.oimsAlert(language.OnlyOpOneData);
    			return;
    		}
    		
    		//用户基本信息
    		var table_jibenOne = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
    			+ "<tr>"
    			+"<td width='8%'></td>"
    			+ "<td width='19%' align='center'  class='sl'>"+"</td>"
    			+ "<td width='7%' align='right' nowrap='nowrap'>姓名"+":</td>"
    			+ "<td width='19%' align='left'><input type='text' name='xingming' size='20' id='xingming' disabled=true/></td>"
    			+ "<td width='7%' align='right' nowrap='nowrap'>病历号 "+":</td>"
    			+ "<td width='19%' align='left'><input type='text' name='binglihao' size='20' id='binglihao' disabled=true /></td>"
    			+ "<td width='28%' align='left'>&nbsp;</td>" + "</tr>" + "</table>";

    		var table_jibenTwo = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
    			+ "<tr>"
    			+"<td width='8%'></td>"
    			+ "<td width='19%' align='center'  class='sl'>"+"</td>"
    			+ "<td width='7%' align='right' nowrap='nowrap'>出生日期"+":</td>"
    			+ "<td width='19%' align='left'><input type='text' name='birthday' size='20' id='birthday' disabled=true/></td>"
    			+ "<td width='7%' align='right' nowrap='nowrap'>性别 "+":</td>"
    			+ "<td width='19%' align='left'><input type='text' name='sex' size='20' id='sex' disabled=true /></td>"
    			+ "<td width='28%' align='left'>&nbsp;</td>" + "</tr>" + "</table>";
    		//球径
    		var table_ref_s = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
    				+ "<tr>"
    				+"<td width='8%'></td>"
    				+ "<td width='19%' align='center'  class='sl'>"+"球径"+":</td>"
    				+ "<td width='7%' align='right' nowrap='nowrap'>"+"左眼"+":</td>"
    				+ "<td width='19%' align='left'><input type='text' name='ref_l_s' size='20' id='ref_l_s' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
    				+ "<td width='7%' align='right' nowrap='nowrap'> "+"右眼"+":</td>"
    				+ "<td width='19%' align='left'><input type='text' name='ref_r_s' size='20' id='ref_r_s' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
    				+ "<td width='28%' align='left'>&nbsp;</td>" + "</tr>" + "</table>";
    		
    		//柱径
    		var table_ref_c = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
    			+ "<tr>"
    			+"<td width='8%'></td>"
    			+ "<td width='19%' align='center'  class='sl'>"+"柱径"+":</td>"
    			+ "<td width='7%' align='right' nowrap='nowrap'>"+"左眼"+":</td>"
    			+ "<td width='19%' align='left'><input type='text' name='ref_l_c' size='20' id='ref_l_c' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
    			+ "<td width='7%' align='right' nowrap='nowrap'> "+"右眼"+":</td>"
    			+ "<td width='19%' align='left'><input type='text' name='ref_r_c' size='20' id='ref_r_c' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
    			+ "<td width='28%' align='left'>&nbsp;</td>" + "</tr>" + "</table>";
    		
    		//轴度
    		var table_ref_a = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
    			+ "<tr>"
    			+"<td width='8%'></td>"
    			+ "<td width='19%' align='center'  class='sl'>"+"轴度"+":</td>"
    			+ "<td width='7%' align='right' nowrap='nowrap'>"+"左眼"+":</td>"
    			+ "<td width='19%' align='left'><input type='text' name='ref_l_a' size='20' id='ref_l_a' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
    			+ "<td width='7%' align='right' nowrap='nowrap'> "+"右眼"+":</td>"
    			+ "<td width='19%' align='left'><input type='text' name='ref_r_a' size='20' id='ref_r_a' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
    			+ "<td width='28%' align='left'>&nbsp;</td>" + "</tr>" + "</table>";
    		//可信度
    		var table_kxd = "<table width='100%' border='0' cellspacing='0' cellpadding='0' height='25'>"
    			+ "<tr>"
    			+"<td width='8%'></td>"
    			+ "<td width='19%' align='center'  class='sl'>"+"可信度"+":</td>"
    			+ "<td width='7%' align='right' nowrap='nowrap'>"+"左眼"+":</td>"
    			+ "<td width='19%' align='left'><input type='text' name='kxd_l' size='20' id='kxd_l' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
    			+ "<td width='7%' align='right' nowrap='nowrap'> "+"右眼"+":</td>"
    			+ "<td width='19%' align='left'><input type='text' name='kxd_r' size='20' id='kxd_r' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" class='blur' /></td>"
    			+ "<td width='28%' align='left'>&nbsp;</td>" + "</tr>" + "</table>";
    		
    		//隐藏的ID
    		var yincang_id = "<input type=hidden name='jiuzhenID' id='jiuzhenID'>"
    			+ "<input type=hidden name='huanzheID' id='huanzheID'>";
    		
    		var quguangData = getJSONData("/publish/child/findUpdateQuGuang.htm", {
	    		huanzheid : dataObj[0].huanzheID, // 患者id
	    		jiuzhenid : dataObj[0].jiuzhenID, // 就诊id
	    		tag : Math.random()
	    	}, "post");
    		//->>点击后显示的窗口
    		var f = oimsFormWindow({
    			id : "form_QuGuang",		
    			url : contextPath + "/publish/child/saveOrUpdateQuGuang.htm",
    			dialogTitle : "屈光检查信息",
    			height : 300,
    			width : 600,
    			resetForm:function(){resetQuGuangForm(quguangData.state,quguangData.obj);},
    			btnOkSuccess : function(data, responseText, statusText) {
    				if(data.state == 1)
    					$.oimsSucc("添加成功");
    				if(data.state == 2)
    					$.oimsSucc("修改成功");		//录入成功
    				f.parent().parent().remove();	
    				
    			},
    			btnOkError : function(jqXHR, textStatus, errorThrown) {
    				$.oimsError("录入失败");		//录入失败

    			},
    			btnOkBefor : quGuangFormValidate	//表单非空验证
    		});
    		f.append(table_jibenOne);
    		f.append(table_jibenTwo);
    		f.append(table_ref_s);
    		f.append(table_ref_c);
    		f.append(table_ref_a);
    		f.append(table_kxd);
    		f.append(yincang_id);
    		$("#huanzheID").val(dataObj[0].huanzheID);// 患者id
    		$("#jiuzhenID").val(dataObj[0].jiuzhenID);// 就诊id
    		
    		
    	   
    	    	var data = getJSONData("/publish/child/findHzxxById.htm", {
    	    		huanzheid : dataObj[0].huanzheID, // 患者id
    	    		jiuzhenid : dataObj[0].jiuzhenID, // 就诊id
    	    		tag : Math.random()
    	    	}, "post");
    	    	if (data.state) {
    	    		quGuang = data.obj;
    	    		
    	    		$("#xingming").val(quGuang.hzxx.xingming);
    	    		$("#binglihao").val(quGuang.hzxx.binglihao);
    	    		$("#birthday").val(time(quGuang.hzxx.shengri).format_yyyy_mm_dd());
    	    		$("#sex").val(quGuang.hzxx.xingbie==true?"男":"女");
    	    		
    	    	}
    	    	
    	    	if (quguangData.state == 2) {
    	    		quGuang = quguangData.obj;
    	    		$("#ref_r_s").val(quGuang.yanG.refRS).attr("readonly","readonly");
    	    		$("#ref_l_s").val(quGuang.yanG.refLS).attr("readonly","readonly");
    	    		$("#ref_r_c").val(quGuang.yanG.refRC).attr("readonly","readonly");
    	    		$("#ref_l_c").val(quGuang.yanG.refLC).attr("readonly","readonly");
    	    		$("#ref_r_a").val(quGuang.yanG.refRA).attr("readonly","readonly");
    	    		$("#ref_l_a").val(quGuang.yanG.refLA).attr("readonly","readonly");
    	    		$("#kxd_r").val(quGuang.yanG.kxd_r).attr("readonly","readonly");
    	    		$("#kxd_l").val(quGuang.yanG.kxd_l).attr("readonly","readonly");
    	    		$(".openbutton").prepend($("<a href='javascript:changeQuGuangEdit()' id='quguangedit'><span></span>编辑</a>"));
    	    		$(".advsumit").parent().attr("style","display:none");
    	    		$(".advreset").parent().attr("style","display:none");
    	    		
    	    	}
    	    }
    	
    	//屈光检查表单验证是否为空
    	function quGuangFormValidate(){
    		if(	$("#ref_r_s").val()==""||$("#ref_l_s").val()==""||$("#ref_r_c").val()==""||$("#ref_l_c").val()==""||$("#ref_r_a").val()==""||$("#ref_l_a").val()==""||$("#kxd_r").val()==""||$("#kxd_l").val()==""){
    			$.oimsAlert("插入信息不能为空");
    			return false;
    		}
    		if(isNaN($("#ref_r_s").val())||isNaN($("#ref_l_s").val())||isNaN($("#ref_r_c").val())||isNaN($("#ref_l_c").val())||isNaN($("#ref_r_a").val())||isNaN($("#ref_l_a").val())||isNaN($("#kxd_r").val())||isNaN($("#kxd_l").val())){
    			$.oimsAlert("插入信息必须位数字");
    			return false;
    		}
    	}

    	//重置屈光检查表单信息
    	function resetQuGuangForm(state,quGuang) {
    		if(state==2){
    			$("#ref_r_s").val(quGuang.yanG.refRS);
	    		$("#ref_l_s").val(quGuang.yanG.refLS);
	    		$("#ref_r_c").val(quGuang.yanG.refRC);
	    		$("#ref_l_c").val(quGuang.yanG.refLC);
	    		$("#ref_r_a").val(quGuang.yanG.refRA);
	    		$("#ref_l_a").val(quGuang.yanG.refLA);
	    		$("#kxd_r").val(quGuang.yanG.kxd_r);
	    		$("#kxd_l").val(quGuang.yanG.kxd_l);
    		}
    		else{
    			$("#ref_r_s").val("");
	    		$("#ref_l_s").val("");
	    		$("#ref_r_c").val("");
	    		$("#ref_l_c").val("");
	    		$("#ref_r_a").val("");
	    		$("#ref_l_a").val("");
	    		$("#kxd_r").val("");
	    		$("#kxd_l").val("");
    		}
    		
    		
    	}
    	//点击编辑改变屈光为可编辑
    	function changeQuGuangEdit(){
    		$("#ref_r_s").removeAttr("readonly");
    		$("#ref_l_s").removeAttr("readonly");
    		$("#ref_r_c").removeAttr("readonly");
    		$("#ref_l_c").removeAttr("readonly");
    		$("#ref_r_a").removeAttr("readonly");
    		$("#ref_l_a").removeAttr("readonly");
    		$("#kxd_r").removeAttr("readonly");
    		$("#kxd_l").removeAttr("readonly");
    		$("#quguangedit").attr("style","display:none");
    		$(".advsumit").parent().attr("style","display:''");
    		$(".advreset").parent().attr("style","display:''");
    		
    		
    	}
    	
    	function bingLi(){
    		 if (!utilTool().listSelectOne())
    		        return;
    		    var dataObj = utilTool().listSelectOne();

    		    
    		    var u = contextPath
    		        + "/publish/huanZheXinXi/findJiuZhenByHuanZhe.htm";
    		    $.post(u,{hzid : dataObj.huanzheID},function(d) {
    		        if (d.obj != null&& d.state == 1) {
    		            var parm = {SN : 1,birthday : {},caozuoren : "",
    		                caozuotime : "",cztime : "",fzys : "",
    		                fzysname : "",haoma : "",id : "",
    		                mobile : "",name : "",patientId : "",
    		                photo : "",sex : "",state : "",
    		                zhenbie : ""
    		            };
    		            parm.birthday.time = Date.parse(new utilTool().strToDate(dataObj.shengri));
    		            $.extend(parm,dataObj);
    		            parm.patientId = parm.huanzheID;
    		            $.extend(parm,d.obj);
    		            parm.cztime = time(d.obj.caozuoTime).format_yyyy_mm_dd_hms();
    		            //parm.mobile = parm.shouji;
    		            parm.name = parm.xingming;
    		            parm.photo = parm.photourl;
    		            parm.sex = parm.xingbie;
    		            loadJsAndCss_YiSheng() ;
    		            showHuanZheGuanLi(parm);
    		           
//    																		$(".titleT").append(l_hz.BingLiSee) ;
    		        } else {
    		            $.oimsAlert(l_hz.jiuzheDateIsNull);
    		        }
    		    }, "json");

    	    
    	}
    	

    
    	
    	