$(document).ready(function(){
		var compare_hide = true;
		$("#compare_show").click(_emr_show);
		function _emr_show(){
			var diagnosis = $($('#diagnosis').children()[0]);
			if(compare_hide){
				diagnosis.width(diagnosis.width()-113);
//				$("#main").addClass('main_showrecords');
				$("#main").width($("#main").width()-114);
				$("#duibi").animate({width:113},100,function(){
					$(this).removeClass('compare_hide').addClass('compare_show');
					$('#main').children('.maintab').width($('#main').width());
				});
				compare_hide = false;
			}else{
				$("#duibi").animate({width:0},"fast",function(){
					$(this).removeClass('compare_show').addClass('compare_hide');
//					$("#main").removeClass('main_showrecords');
					$("#main").width($("#main").width()+114);
					diagnosis.width(diagnosis.width()+113);
					$('#main').children('.maintab').width($('#main').width());
				});
				compare_hide = true;
			}
		}
		//待用功能
		$("#duibi_time").click(duibi_time);
		function duibi_time(){
			win();
		}
		function win(){
			var win=$("<div id='sdiv'/>").appendTo("body").window({
				title:'设置时间',
				width:400,
				height:275,
				modal:true,
				collapsible:true,
				minimizable:true,
				maximizable:true,
				resizable:false
			});
			win.append(winHtml);
		}
		function winHtml(){
			var html="<span>请选择时间：</span><br/>"
					+"<hr/>"
					+"<center>"
					+"<input type='radio' name='time' id='time1' value='30' checked='checked'/>30秒&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' name='time' id='time2' value='60'/>60秒<br/>"
					+"<input type='radio' name='time' id='time3' value='600'/>10分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' name='time' id='time4' value='900'/>15分<br/>"
					+"<input type='radio' name='time' id='time5' value='1800'/>30分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' name='time' id='time6' value='3600'/>60分<br/>"
					+"<button onclick='chooseTime();'>确定</button>"
					+"<hr/>"
					+"</center>"
					+"<span>您还可以自定义时间：</span><br/>"
					+"<hr/>"
					+"<center>"
					+"请输入时间：<input type='text' name='wriTime1' id='wriTime1' size='1'/>时&nbsp;&nbsp;<input type='text' name='wriTime2' id='wriTime2' size='1'/>分&nbsp;&nbsp;<input type='text' name='wriTime3' id='wriTime3' size='1'/>秒"
					+"<button onclick='writeTime();'>确定</button><br/>"
					+"<span style='color:red;'>注意：<br/>1.请分段输入时间(以秒计);</span><br/>"
					+"<span style='color:red;'>2.请填写符合规范的数字(如：100或20);</span><br/>"
					+"<hr/>"
					+"</center>";
			return html;
		}
});
/**
 * 选择时间段展示接诊记录
 * @author caoyuan
 */
function chooseTime(){
			var time=$("[type='radio']:checked").val();
			alert("设置成功");
			$("#sdiv").window('close');
			setInterval(choose,parseInt(time*1000));
}

function choose(){
	$("#duibi").slideDown(1000);
}

/**
 * 输入时间段展示接诊记录
 * @author caoyuan
 */
function writeTime(){
	var wriTime1=$("#wriTime1").val();//时
	var wriTime2=$("#wriTime2").val();//分
	var wriTime3=$("#wriTime3").val();//秒
	alert("设置成功");
	$("#sdiv").window('close');
	if(wriTime1!="" && wriTime2=="" && wriTime3==""){
		setInterval(write,parseInt(wriTime1*60*60*1000));
	}
	if(wriTime1=="" && wriTime2!="" && wriTime3==""){
		setInterval(write,parseInt(wriTime2*60*1000));
	}
	if(wriTime1=="" && wriTime2=="" && wriTime3!=""){
		setInterval(write,parseInt(wriTime3*1000));
	}
}

function write(){
	$("#duibi").slideDown(1000);
}




		