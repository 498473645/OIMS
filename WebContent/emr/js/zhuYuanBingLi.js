/**
 * 显示住院病历
 * @param binglihao
 */
function showQYBL(binglihao){
	var getZhuYuanPatient_url = "/publish/emr/getZhuYuanPatient.htm";
	var getBingliHTML_url = "/publish/emr/getBingliHTML.htm";
	var qybl = $("<div />").addClass("qybl").attr("id","qybl");
	var ul = $("<ul />").appendTo($("<div id='leftMenu' />").attr("style","width:25%;float:left;").appendTo($(qybl)));
	$("<div id='rightContent' />").attr("style","float:left;text-align:left;overflow:auto;width:74%;").appendTo(qybl);
	var getZhuYuanPatient_data = getJSONData(getZhuYuanPatient_url,{binglihao:binglihao,tag : Math.random()},"POST");
	if(getZhuYuanPatient_data.state&&getZhuYuanPatient_data.obj!=null){
		$.each(getZhuYuanPatient_data.obj,function(index,data){
			var visit_date = data.visitDate.time!=null?formatDate(data.visitDate.time):null;
			var a_value =  visit_date+"  "+data.deptName;
			var li = $("<li><a>"+a_value+"</a></li>").appendTo(ul);
			$("<input id='visitNo' type='hidden' />").val(data.visitNo).appendTo(li);
			$("<input id='visitDate' type='hidden' />").val(visit_date).appendTo(li);
			li.click(function(){
				$("#rightContent").text("");
				$($(this).siblings()).find("a").removeClass("on");
				$(this).find("a").addClass("on");
				var getBingliHTML_data = getJSONData(getBingliHTML_url,{
					binglihao:binglihao,
					visitID:$(this).find("input#visitNo").val(),
					visitType:oimsCategory.ZHENBIE_ZHUYUAN,
					visitDate:$(this).find("input#visitDate").val(),
					typeID:"",
					tag : Math.random()
					},"POST");
				if(getBingliHTML_data.state&&getBingliHTML_data.obj!=null){
					$("#rightContent").append($(getBingliHTML_data.obj));
				}
			});
		});
		$(qybl).oimsDialog({
			title : "查询",
			width : 900,
			icon : 'view',
			height : 500,
			drag : false,
			locked : true,
			winType : 4
		});
		//
		$(".openWin").css({"overflow":"hidden","height":($("#right").height())});
		$("#rightContent").height(($(".openWin").height()-$(".opentitle").height()));
		$("#leftMenu").css({"overflow":"auto"}).height(($(".openWin").height()-$(".opentitle").height()));
		//初始化报告内容
		var getBingliHTML_data = getJSONData(getBingliHTML_url,{
			binglihao:binglihao,
			visitID:$("#leftMenu ul li:eq(0) #visitNo").val(),
			visitType:oimsCategory.ZHENBIE_ZHUYUAN,
			visitDate:$("#leftMenu ul li:eq(0) #visitDate").val(),
			typeID:"",
			tag : Math.random()
			},"POST");
		if(getBingliHTML_data.state&&getBingliHTML_data.obj!=null){
			$("#rightContent").append($(getBingliHTML_data.obj));
			$("#leftMenu ul li:eq(0) a").addClass("on");
		}else{
			$.oimsAlert("没有住院病历！");
		}
	}else{
		$.oimsAlert("没有住院记录！");
	}
}

