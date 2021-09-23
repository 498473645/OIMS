var paras = []; // 参数
var values = []; // 值
$(function() {
	var jcdh = $.getUrlParam("jcdh");
	var gonghao = $.getUrlParam("gonghao");
//	var jcdh = '66'; // 获取检查单号
//	var gonghao = "10002";
	data = getJSONData("/publish/jcd/findJCDInfoByjcdhForCapture.htm", {
		jcdh : jcdh,
		gonghao : gonghao,
		tag : Math.random()
	}, "POST");
	if (data.obj.jcd.jfbs == 0) {
		$("#listsee").removeClass("listsee").removeClass("black").addClass("red listsee");
	}
	var zhen = "急";
	if (data.obj.jcd.zhenbie == oimsCategory.ZHENBIE_ZHUYUAN) {
		zhen = "住";
		$(".main").addClass("zhu");
	} else if (data.obj.jcd.zhenbie == oimsCategory.ZHENBIE_MENZHEN) {
		zhen = "门";
		$(".main").addClass("men");
	}
	$("#listsee .listseebg").html("");
	var title = $("<span class='huanzheName'>"
			+ zhen
			+ "</span><font>"
			+ data.obj.jcd.xingming
			+ "</font> (病历号："
			+ data.obj.jcd.binglihao
			+ ")&nbsp;&nbsp;&nbsp;"
			+ data.obj.jcd.hzxb
			+ "&nbsp;&nbsp;&nbsp; "
			+ data.obj.jcd.nianling
			+ "岁&nbsp;  <span class='shouji'>手机：<input name='textfield' type='text' id='textfield' value='点输入框外即保存' /></span>");
	title.appendTo("#listsee .listseebg");
	// 设置主述及病史(可是设置的更详细)
	$(".left div:eq(0)").text(function() {
		var text = "";
		$.each(data.obj.jzjls, function(index, obj) {
			text += obj.jilu;
		});
		text = $("<div />").html(text).text();
		return text;
	});
	var jcyq = data.obj.jcd.jcyq;
	if(jcyq==null){
		jcyq="";
	}
	$(".left div:eq(1)").text(jcyq);
	if (data.obj.jcd.rightPic != null) {
		$(".right .od").html("");
		$("<img src=\"" + contextPath + data.obj.jcd.rightPic+ "\" width=\"195\" height=\"125\"/>").appendTo(".right .od");
	}
	if (data.obj.jcd.rightPic != null) {
		$(".right .os").html("");
		$("<img src=\"" + contextPath + data.obj.jcd.leftPic+ "\" width=\"195\" height=\"125\"/>").appendTo(".right .os");
//		$("<img/>").attr("src", data.obj.jcd.leftPic);
	}
	$("#tableKD tr:eq(0) td:eq(1)").html(data.obj.jcd.kdys);
	$("#tableKD tr:eq(0) td:eq(3)").html(data.obj.jcd.kdsj);
	$("#huanzheid").val(data.obj.jcd.huanzheID);
	if(data.obj.jcd.shouji!=undefined||data.obj.jcd.shouji!=null){
		$("#textfield").val(data.obj.jcd.shouji);
	}
	// 添加自动保存电话号码
	$("#textfield").focus(function() {
		$(this).val("");
	});
	$("#textfield").blur(
			function() {
				if ($(this).val() == null) {
					$(this).val("点输入框外即保存");
				} else {
					data = getJSONData(
							"/publish/huanZheXinXi/updateHuanzhexinxi.htm", {
								id : $("#huanzheid").val(),
								shouji : $(this).val(),
								gonghao : gonghao,
								tag : Math.random()
							}, "POST");
				}
			});
});

/*
 * function getLocationHref(){ var url = window.location.href; //获取网址字符串 var len =
 * url.length; var offset = url.indexOf("?"); var str = url.substr(offset, len);
 * var args = str.split("&"); len = args.length; for (var i = 0; i < len; i++) {
 * str = args[i]; var arg = str.split("="); if (args.length <= 1) break; else {
 * paras[i] = arg[0]; //参数名 values[i] = arg[1]; //参数值 } } }
 */

/*function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
	console.log(reg);
	var r = window.location.search.substr(1).match(reg); // 匹配目标参数
	if (r != null)
		return unescape(r[2]);
	return null; // 返回参数值
}*/