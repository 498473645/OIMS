/**
 * 显示既往门诊病历
 * @param binglihao,xingming,sex,jtdz,shouji
 */
function showMZBLP(binglihao,xingming,sex,jtdz,shouji){
	var mzbl = $("<div />").addClass("mzbl").attr("id","mzbl");
	var ul = $("<ul />").appendTo($("<div id='leftMenu' />").attr("style","width:20%;float:left;overflow:auto;").appendTo($(mzbl)));
	$("<div id='rightContent' />").attr("style","float:left;text-align:left;overflow:auto;width:79%;").appendTo(mzbl);
	var jiwangbingli_url='/publish/emr/getJiWangMenZhenBingLi.htm';
	var menZhenBingLi_data = getJSONData(jiwangbingli_url,{patientId:binglihao,tag : Math.random()},"POST");
	if(menZhenBingLi_data.state && menZhenBingLi_data.obj!=null && menZhenBingLi_data.obj.length>=1){
		$(mzbl).oimsDialog({
			title : "查询",
			width : 900,
			icon : 'view',
			height : 500,
			drag : false,
			locked : true,
			winType : 4
		});
		$(".openWin").css({"overflow":"hidden","height":($("#right").height()),"top":"50px"});
		$("#rightContent").height(($(".openWin").height()-$(".opentitle").height()));
		$("#leftMenu").height(($(".openWin").height()-$(".opentitle").height()));
		//查询出数据进行下步操作
		$.each(menZhenBingLi_data.obj,function(index,d){
			$.extend(d,{'sex':sex,'xingming':xingming,'cellphone':shouji,'address':jtdz});
			var str = d.cli_date;
			var year = str.substring(0,4);
			var yue = str.substring(4,6);
			var day = str.substring(6,8);
			var shi = str.substring(8,10);
			var fen = str.substring(10,12);
			var miao = str.substring(12,14);
			d.cli_date = year+"-"+yue+"-"+day+" "+shi+":"+fen+":"+miao;
			var li = $("<li><a>"+d.cli_date+"</a></li>").appendTo(ul);
			if(index==0){
				$(li).find("a").addClass("on");
				common_showWithHtmlTemplate(contextPath+'/emr/template/html/xnyyMZBL.html', d,$("#rightContent"));
			}
			$(li).click(function(){
				$($(this).siblings()).find("a").removeClass("on");
				$(this).find("a").addClass("on");
				$("#rightContent").text("");
				common_showWithHtmlTemplate(contextPath+'/emr/template/html/xnyyMZBL.html', d,$("#rightContent"))
			});
		});
	}else{
		$.oimsAlert("该患者不存在就诊！");
	}
	}
