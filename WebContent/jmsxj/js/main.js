/******************************************** 主体方法 ************************************************/
//病历
function sg_bl(){
	//清空显示区
	$("#tabContent").html("");
	/*var isAutoSetTab = "<div style='width:100%;height:20px;text-align:center;'>" +
				"显示最新检查结果<input type='radio' name='autoSet_sgbl' id='autoSet_sgbl_true'/>&nbsp;&nbsp;" +
				"显示上次保存的值<input type='radio' name='autoSet_sgbl' id='autoSet_sgbl_false' checked='checked'/>" +
			"</div>";
	$("#tabContent").append(isAutoSetTab);*/
	//加载模板
	var show_moban = $("<div/>").attr("id","show_moban").html(blmb1(67));
	$("#tabContent").append(show_moban);
	//模板赋值
	set_values();
	if($("#autoSet_sgbl_true").attr("checked")=='checked'){
		//自动赋值
		sg_auto_set();
	}
	$("input[name='autoSet_sgbl']").bind("click",function(){
		reset_sgbl_moban();
	});
	//加载功能按钮
	var funButtons = $("<div/>").attr("style","width:100%;height:20px;text-align:center;margin-top:10px;").html("" +
			"<input type='button' value='提交' style='width:60px;height:20px;' onclick='ti_bl()'/>&nbsp;&nbsp;" +
			"<input type='button' value='重置' style='width:60px;height:20px;' onclick='sg_bl()'/>&nbsp;&nbsp;" +
			"<input type='button' value='打印' style='width:60px;height:20px;' onclick='print_bl()'/>");
	$("#tabContent").append(funButtons);
	//checkbox控制
	bl_checkbox_ctrl();
	//加载日历控件
	calendarFun_sg("zjycpjsj");
	calendarFun_sg("rq");
	//添加一份新病历按钮控制
	add_bl_ctrl();
}
//同意书
function sg_tys(){
	//清空显示区
	$("#tabContent").html("");
	//加载模板切换按钮
	var btn_div1 = $("<div/>").attr("id","btn_div1").attr("style","width:90%;height:30px;text-align:center;margin-top:10px;");
	var div1_childNodes = "<input type='radio' id='jm_tys' name='tys' checked='checked' value='jm'/>&nbsp;&nbsp;" +
			"角膜塑形镜知情同意书&nbsp;&nbsp;<input type='radio' id='rgp_tys' name='tys' value='rgp'/>&nbsp;&nbsp;RGP矫正同意书";
	btn_div1.append(div1_childNodes);
	$("#tabContent").append(btn_div1);
	//加载默认模板
	var show_moban = $("<div/>").attr("id","show_moban").html(blmb1(65));
	$("#tabContent").append(show_moban);
	//点击按钮，切换模板
	$("input[name='tys']").click(function(){
		$("#show_moban").html("");
		var tys_choose = $("input[name='tys']:checked").val();
		if(tys_choose=="jm"){
			test = blmb1(65);
		}else{
			test = blmb1(66);
		}
		$("#show_moban").append(test);
	});
	//加载功能按钮
	var funButtons = $("<div/>").attr("style","width:100%;height:20px;text-align:center;margin-top:10px;").html("" +
			"<input type='button' value='打印' style='width:60px;height:20px;' onclick='print_tys()'/>");
	$("#tabContent").append(funButtons);
	//添加一份新病历按钮控制
	add_bl_ctrl();
}
//评估表
function sg_pgb(){
	$("#tabContent").html("");
	var show_moban = $("<div/>").attr("id","show_moban").html(blmb1(68));
	$("#tabContent").append(show_moban);
	set_values();//赋值
	//加载功能按钮
	var funButtons = $("<div/>").attr("style","width:100%;height:20px;text-align:center;margin-top:10px;").html("" +
			"<input type='hidden' id='ccdj_id' style='width:50px;'/>&nbsp;&nbsp;"+
			"<input type='button' value='提交' style='width:60px;height:20px;' onclick='ti_pgb()'/>&nbsp;&nbsp;" +
			"<input type='button' value='重置' style='width:60px;height:20px;' onclick='sg_pgb()'/>&nbsp;&nbsp;" +
			"<input type='button' value='打印' style='width:60px;height:20px;' onclick='print_pgb()'/>");
	$("#tabContent").append(funButtons);
	//checkbox控制
	pgb_checkbox_ctrl();
	//加载日历控件
	calendarFun_sg("djrq");
	//添加一份新病历按钮控制
	add_bl_ctrl();
}
//订片纪录
function sg_dpjl(){
	$("#tabContent").html("");
	var show_moban = $("<div/>").attr("id","show_moban").html(blmb1(69));
	$("#tabContent").append(show_moban);
	set_values();//赋值
	//加载功能按钮
	var funButtons = $("<div/>").attr("style","width:100%;height:20px;text-align:center;margin-top:10px;").html("" +
			"<input type='hidden' id='dpjl_id' style='width:50px;'/>&nbsp;&nbsp;"+
			"<input type='button' value='提交' style='width:60px;height:20px;' onclick='ti_dpjl()'/>&nbsp;&nbsp;" +
			"<input type='button' value='重置' style='width:60px;height:20px;' onclick='sg_dpjl()'/>&nbsp;&nbsp;" +
			"<input type='button' value='打印' style='width:60px;height:20px;' onclick='print_dpjl()'/>");
	$("#tabContent").append(funButtons);
	//checkbox控制
	dpjl_checkbox_ctrl();
	//加载日历控件
	calendarFun_sg("dprq");
	calendarFun_sg("sprq");
	calendarFun_sg("yprq");
	calendarFun_sg("jprq");
	//添加一份新病历按钮控制
	add_bl_ctrl();
}
//取镜单
function sg_qjd(){
	$("#tabContent").html("");
	var show_moban = $("<div/>").attr("id","show_moban").html(blmb1(77));
	$("#tabContent").append(show_moban);
	set_values();//赋值
	//加载功能按钮
	var funButtons = $("<div/>").attr("style","width:100%;height:20px;text-align:center;margin-top:10px;").html("" +
			"<input type='hidden' id='qjd_id' style='width:50px;'/>&nbsp;&nbsp;"+
			"<input type='button' value='提交' style='width:60px;height:20px;' onclick='ti_qjd()'/>&nbsp;&nbsp;" +
			"<input type='button' value='重置' style='width:60px;height:20px;' onclick='sg_qjd()'/>&nbsp;&nbsp;" +
			"<input type='button' value='打印' style='width:60px;height:20px;' onclick='print_qjd()'/>");
	$("#tabContent").append(funButtons);
	//加载日历控件
	calendarFun_sg("pjrq");
	calendarFun_sg("qjrq");
	//添加一份新病历按钮控制
	add_bl_ctrl();
}
//复查记录
function sg_fcjl(){
	$("#tabContent").html("");
	var show_moban = $("<div/>").attr("id","show_moban").html(blmb1(70));
	$("#tabContent").append(show_moban);
	set_values();//赋值
	//加载功能按钮
	var funButtons = $("<div/>").attr("style","width:100%;height:20px;text-align:center;margin-top:10px;").html("" +
			"<input type='hidden' id='fcjl_id' style='width:50px;'/>&nbsp;&nbsp;"+
			"<input type='button' value='提交' style='width:60px;height:20px;' onclick='ti_fcjl()'/>&nbsp;&nbsp;" +
			"<input type='button' value='重置' style='width:60px;height:20px;' onclick='sg_fcjl()'/>&nbsp;&nbsp;" +
			"<input type='button' value='打印' style='width:60px;height:20px;' onclick='print_fcjl()'/>");
	$("#tabContent").append(funButtons);
	//checkbox控制
	fcjl_checkbox_ctrl();
	//加载日历控件
	calendarFun_sg("fcrq");
	//calendarFun_sg("qjsj");
	calendarFun_sg("dprq");
	//添加一份新病历按钮控制
	add_bl_ctrl();
	setJcr();//检查人默认当前用户
}
//复查记录表
function add_fcjlb(){
	var blbh = $("#blbh").text();
	if(blbh!=null && blbh!=''){
		var data =  getJSONData("/publish/shiGuang/findSgFcjlByBlbh.htm",{bl_id:blbh},"POST").obj;
		var fcjlbDiv = $("<div/>").attr("id","fcjlbDiv");
		$(fcjlbDiv).oimsDialog({
			title:"复查记录表",
			width : 1100,
			height : 500,
			drag : false,
			locked :true,
			winType : 4,
			button : null
		});
		var tab = "<div id='fcjlb_print_div' style='width:1040px;height:510px;background:#fff;margin-left:30px;margin-top:10px;padding-top:10px;overflow:auto;'>" +
						"<h1 style='text-align:center;'>复查记录表</h1>" +
						"<table width='1000' cellpadding='0' cellspacing='0' border='0' style='border-left:1px solid;border-top:1px solid;text-align:center;font-size:12px;margin-left:10px;'>" +
							"<tr>" +
								"<td style='border-right:1px solid;border-bottom:1px solid;height:20px;width:10%;'>日期</td>" +
								"<td style='border-right:1px solid;border-bottom:1px solid;height:20px;width:5%;'>眼别</td>" +
								"<td style='border-right:1px solid;border-bottom:1px solid;height:20px;width:10%;'>裸眼视力</td>" +
								"<td style='border-right:1px solid;border-bottom:1px solid;height:20px;width:20%;'>屈光度</td>" +
								"<td style='border-right:1px solid;border-bottom:1px solid;height:20px;width:10%;'>矫正视力</td>" +
								"<td style='border-right:1px solid;border-bottom:1px solid;height:20px;width:10%;'>眼部情况</td>" +
								"<td style='border-right:1px solid;border-bottom:1px solid;height:20px;width:25%;'>备注</td>" +
								"<td style='border-right:1px solid;border-bottom:1px solid;height:20px;width:10%;'>检查者</td>" +
							"</tr>";
						if(data!=null){
							$.each(data,function(i,item){
								var fcrq = item.fcrq;
								if(fcrq!=null){
									fcrq = formatDateDIY(item.fcrq,"-");
								}else{
									fcrq = '';
								}
								tab+="<tr>" +
										"<td rowspan='2' style='border-right:1px solid;border-bottom:1px solid;height:20px;'>" +
											"<label>"+fcrq+"</label>" +
										"</td>" +
										"<td style='border-right:1px solid;border-bottom:1px solid;height:20px;'>R</td>" +
										"<td style='border-right:1px solid;border-bottom:1px solid;height:20px;'>" +
											"<label>"+item.lysl_r+"</label>" +
										"</td>" +
										"<td style='border-right:1px solid;border-bottom:1px solid;height:20px;'>" +
											"<label>"+item.qgd_r+"</label>" +
										"</td>" +
										"<td style='border-right:1px solid;border-bottom:1px solid;height:20px;'>" +
											"<label>"+item.jzsl_r+"</label>" +
										"</td>" +
										"<td style='border-right:1px solid;border-bottom:1px solid;height:20px;'>" +
											"<label>"+item.jm_r+"</label>" +
										"</td>" +
										"<td style='border-right:1px solid;border-bottom:1px solid;height:20px;'>" +
											"<label>"+item.bz_r+"</label>" +
										"</td>" +
										"<td rowspan='2' style='border-right:1px solid;border-bottom:1px solid;height:20px;'>" +
											"<label>"+item.jcr+"</label>" +
										"</td>" +
									"</tr>" +
									"<tr>" +
										"<td style='border-right:1px solid;border-bottom:1px solid;height:20px;'>L</td>" +
										"<td style='border-right:1px solid;border-bottom:1px solid;height:20px;'>" +
											"<label>"+item.lysl_l+"</label>" +
										"</td>" +
										"<td style='border-right:1px solid;border-bottom:1px solid;height:20px;'>" +
											"<label>"+item.qgd_l+"</label>" +
										"</td>" +
										"<td style='border-right:1px solid;border-bottom:1px solid;height:20px;'>" +
											"<label>"+item.jzsl_l+"</label>" +
										"</td>" +
										"<td style='border-right:1px solid;border-bottom:1px solid;height:20px;'>" +
											"<label>"+item.jm_l+"</label>" +
										"</td>" +
										"<td style='border-right:1px solid;border-bottom:1px solid;height:20px;'>" +
											"<label>"+item.bz_l+"</label>" +
										"</td>" +
									"</tr>";
							});		
						}
					tab+="</table>" +
					"</div>";
		$(fcjlbDiv).append(tab);
		var buttonDiv = $("<div/>").html("<input type='button' value='打印' style='width:60px;height:20px;margin-top:10px;' onclick='print_fcjlb()'/>");
		$(fcjlbDiv).append(buttonDiv);
	}
}



