var findPrescribesUrl='/publish/chufang/findDrugDictPageList.htm';
var syncPrescribeUrl='/publish/chufang/syncDrug.htm';
var updateDrugUseUrl='/publish/chufang/updateDrugUse.htm';
function showPrescribePageList(btns){
	pageTitle = '药品';
	init();
	listFactor = {
			url : contextPath + findPrescribesUrl, // url
			method : "post",
			checkbox : true,
			single : false,
			listObj : [
			           {
				title : "药品名称",// 序号
				key : "drugName"
			}, {
				title : "规格",// 办公室名称
				key : "packageSpec"
			}, {
				title : "单位",// 位置
				key : "packageUnits"
			},{
				title :"是否启用",
				key : "enableFlag",
				func : function(d) {
						return d?'<a class="isuse">是</a>':'<a class="isuse">否</a>';
				}	
			}
			],
			data : {// data表示传的参数
				currentPage : 1,
				pageSize : getPageSize(),
				tag:Math.random()
			}
		};
		 var div = $("<div />").attr("id","advquery").addClass("advquery").appendTo("#right");
		 var div1=$("<div />").css("float","left").prependTo(div);
		 var normalText = "请输入晶体型号";
		 var searchInput = $("<input />").attr("name","search").focusin(function(){
			if($.trim($(this).val())==normalText){
				$(this).val("").removeClass("blurview").addClass("focus");
			}
		}).blur(function(){
			if(!$.trim($(this).val()).length){
				$(this).val(normalText).removeClass("focus").addClass("blurview");
			}
		}).val(normalText).addClass("blurview").css({"float":"left","margin":"2px 4px"}).width(266).height(20).appendTo(div1);
	$('<a class="search" href="javascript:void(0);" style="float: left;">查询</a>').appendTo(div1).click(function(){
		var search = $.trim(searchInput.val());
		if(search == normalText)search="";
		var data = listFactor.data;
		data = $.extend(data,{search:search});//预约
		listFactor.data=data;
		$("#pageList").createPageList(listFactor);
			$('a.isuse').unbind('click').bind('click',function(){
			updateDrugUse($(this).parent().parent());
		});
	});
	div.append("<div style='clear:both'></div>");
	div = $("<div />").addClass("btn").prependTo(div);
	showMyBTNS(btns,div);
//	div.find('a').click(function(){
//		syncPerscribes();
//	});
	div = $("<div />").attr("id","pageList").addClass("list").appendTo("#right");
	div.createPageList(listFactor);
	//定义点击启用禁用事件
	$('a.isuse').click(function(){
		updateDrugUse($(this).parent().parent());
	});
}
function syncPerscribes(){
//	var div = $("<div />").addClass("lockedBackground")/*.addClass("lockedDiv")*/.css({
//        top : 0,
//        left : 0,
//        position : "absolute",
//        width : "100%",
//        height : $(window).height(),
//        "z-index":33,
//        background:"#ccc",
//        filter:"alpha(opacity=60)",
//        opacity:0.6
//    }).appendTo("body");
//	$("<div />").appendTo(div).width(200).height(30).text("同步中，请稍后。。。").css({"line-height":30,"font-size":"22px",background:"#fff","text-align":"center","color":"#000","font-weight":"bold","margin":"auto"});
//	//alert(1);
////	div.show();
////	$.oimsConfirm({strTitle:'确认执行同步?'},function(){
////	debugger;
////		$('div.openWin').children('div.opencontent')
//		getJSONData(syncPrescribeUrl,{});
//		//法请求
//		if(data.state){
//			$.oimsSucc("同步成功");
//			div.remove();
//		}
//		else{
//			div.remove();
//			$.oimsError("同步失败");
//		}
		
//	});
//	$.oimsAlert(1);
		$.ajax({
			url : contextPath + syncPrescribeUrl,
//			data :{patient_id_arys:patient_id_arys},
			async : false,
			type : 'GET',
			dataType : 'json',
			beforeSend:function(){
				var div = $("<div />").addClass("lockedBackground")/*.addClass("lockedDiv")*/.css({
			        top : 0,
			        left : 0,
			        position : "absolute",
			        width : "100%",
			        height : $(window).height(),
			        "z-index":9999,
			        background:"#ccc",
			        filter:"alpha(opacity=60)",
			        opacity:0.6
			    }).appendTo("body");
				$("<div />").appendTo(div).width(200).height(30).text("同步中，请稍后。。。").css({"line-height":30,"font-size":"22px",background:"#fff","text-align":"center","color":"#000","font-weight":"bold","margin":"auto"});
			},
			success : function(data) {
				debugger;
				var lockedBackground = $(".lockedBackground");
				if (lockedBackground.length > 0)
					lockedBackground.remove();
				$.oimsSucc("同步成功");
			}
		});
	
}
function updateDrugUse(tr){
	var id=eval("("+$(tr).find('input[name=checkBoxObj]').val()+")").id;
	var obj=getJSONData(updateDrugUseUrl,{id:id},'POST');
	var obj={state:1};
	if(!obj.state){
		oimsAlert('失败');
	}else{
		var t=($(tr).find('td:last').find('a').text()=='是'?'否':'是');
		$(tr).find('td:last').find('a').text(t);
	}
}
