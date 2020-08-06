function tj_markYear(id,start,end){
	var d = new Date();
	var cy = d.getFullYear();
	var m = new Array();
	if(start==undefined)
		start = cy-10;
	if(end==undefined)
		end = cy+10;

	if(start<=end&&$(id).length>0){
		for(start;start<end;start++){
			if(start==cy)
				$("<option selected='selected' value="+start+">"+start+"</option>").appendTo(id);
			else
			$("<option value='"+start+"'>"+start+"</option>").appendTo(id);
		}
	}
}
function tj_markMonth(id){
	var d = new Date();
	var cm = d.getMonth()+1;
	if($(id).length>0){
		var i = 1;
		for(i;i<13;i++){
			if(i==cm)
				$("<option selected='selected' value="+i+">"+i+"</option>").appendTo(id);
			else
				$("<option value='"+i+"'>"+i+"</option>").appendTo(id);
		}
	}
}
function tj_redioSelect(){
	var redioSel = $("input[name='RadioGroup1']:checked").val();
	if(redioSel=='ny'){
		$("#fTime1_select").show();
		$("#fTime2_select").show();
		$("#fTime1_input").hide();
		$("#fTime2_input").hide();
		$("#fTime1_div").html("年份:");
		$("#fTime2_div").html("月份:");
	}else{
		$("#fTime1_select").hide();
		$("#fTime2_select").hide();
		$("#fTime1_input").show();
		$("#fTime2_input").show();
		$("#fTime1_div").html("开始时间:");
		$("#fTime2_div").html("结束时间:");
	}
	$("input[name='RadioGroup1']").change(tj_redioSelect);
}

function tj_searchData(){
	var timeType = $("input[name='RadioGroup1']:checked").val();
	var fTime1;
	var fTime2;
	var jcxms='';
	var doctors = '';
	var mzDoctors = '';
	if(timeType=='ny'){
		fTime1 = $("#fTime1_select").val();
		fTime2 = $("#fTime2_select").val();
	}else{
		fTime1 = $("#fTime1_input").val();
		fTime2 = $("#fTime2_input").val();
	}
	$("#jcxms ul li input:checked").each(function(i){
		if(i==0){
			jcxms = $(this).val();
		}else{
			jcxms+=","+$(this).val();
		}
	});
	$("#doctors table input:checked").each(function(i){
		if(i==0){
			doctors = $(this).val();
		}else{
			doctors+=","+$(this).val();
		}
	});
	$("#mzDoctors table input:checked").each(function(i){
		if(i==0){
			mzDoctors = $(this).val();
		}else{
			mzDoctors+=","+$(this).val();
		}
	});
	return {
		'fTime1':fTime1,
		'fTime2':fTime2,
		'jcxms':jcxms,
		'doctors':doctors,
		'timeType':timeType,
		'mzDoctors':mzDoctors,
		tag : Math.random()
	};
}

/**
 * 显示饼状图
 * @param div 显示区域
 * @param titleText 饼状图的标题
 * @param data 显示数据格式：[{gonghao=admin, y=1, name=admin},{},...]可以多余的添加其他元素例如工号
 * @param even 每个区域的点击事件
 */
function showPie(div, titleText, data,even){
	$(div).highcharts({
						chart : {
							type : 'pie',
						},
						title : {
							text : titleText
						},
						tooltip : {
							pointFormat : '数量: <b>{point.y}</b>'
						},
						plotOptions : {
							pie : {
								allowPointSelect : true,
								cursor : 'pointer',
								dataLabels : {
									enabled : true,
									format : '<b>{point.name}</b><br/>   {point.percentage:.1f} % ',
									style : {
										color : (Highcharts.theme && Highcharts.theme.contrastTextColor)
												|| 'black'
									}
								},
								events : {
									click : even
								}

							}
						},
						series : [ {
							type : 'pie',
							name : '出报告的医生',
							data : data
						} ]
					});
}
/**
 */
function showColumnAndType(div, titleText,data){
	 $(div).highcharts({
         chart: {
             type: 'column'                    //图表类型
         },
         title: {
             text: titleText      //标题
         },
         xAxis: {
         	title:{
         		text:""
         	},
         	type: 'category'
//            categories:data.xAxis  //X轴数据列
         },
         yAxis: {
             min: 0,
             title: {
                 text: '数量'               //
             },
             stackLabels: {
                 enabled: true,
                 style: {
                     fontWeight: 'bold',
                     color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                 }
             }
         },
         tooltip: {
             pointFormat: '<a><span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/><a>',
             shared: true
         },
         plotOptions: {
             column: {
                 stacking: 'normal'
             }
         },
         series:data
     });
}
function showColumn(div,titleText,data,even){
	$(div).highcharts({                   //图表展示容器，与div的id保持一致
        chart: {
            type: 'column'                         //指定图表的类型，默认是折线图（line）
        },
        title: {
            text: titleText      //指定图表标题
        },
        xAxis: {
        	type: 'category',
//            categories: data.xAxis,   //指定x轴分组
            	  labels: { 
                      rotation: -90
            	  }
        },
        yAxis: {
            title: {
                text: '数量'                  //指定y轴的标题
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        }, plotOptions: {
            column: {
				allowPointSelect : true,
				cursor : 'pointer',
				events : {
					click : even
				}
            }
        },
        series:[{
        	name:"数量",
        	data:data
        }]       
    });
	
}
function showColumnEveryOne(div,titleText,data){

	$(div).highcharts({                   //图表展示容器，与div的id保持一致
        chart: {
            type: 'column'                         //指定图表的类型，默认是折线图（line）
        },
        title: {
            text: titleText      //指定图表标题
        },
        xAxis: {
        	type: 'category',
//            categories: data.xAxis,   //指定x轴分组
            	  labels: { 
                      rotation: -90
            	  }
        },
        yAxis: {
            title: {
                text: '数量'                  //指定y轴的标题
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        }, plotOptions: {
            column: {
            	stacking: 'normal'
            }
        },
        tooltip: {
//        	pointFormmatter:function(){
//        		return '<a>fffff</a>' ;
//        	},
           formatter:function(){
        	   var temp='<a><span>';
        	   var details=this.points[0].point['details'];
        	   $.each(details,function(i,n){
        		   for(var i in n){
        			   temp=temp+i+'</span>:<b>'+n[i]+'</b><br/>';
        		   }
        	   });
//        	   $.each(var i in details){
//        		   temp=temp+i+'</span>:<b>'+details[i]+'</b></br>';
//        	   }
        	  temp=temp+'</a>';
        	return temp;  
           },
        //	   return '<a><span>{this.points[0].point[]}</span>: <b>{this.point.y}</b><br/><a>';},
           shared: true
        },
        series:[{
        	name:"数量",
        	data:data
        }]       
    });
	

}





function showSearch(div){
	/** 打开查询div开始 */
	var div_opendiv = $("<div/>").attr("id", "div_opendiv").attr(
			"class", "opendiv").appendTo($(div));// 打开查询div
	var div_closebtn = $("<div/>").attr("id", "div_closebtn").attr(
			"class", "closebtn").appendTo(div_opendiv);// 关闭查询div
	var div_closebtn_html = "<span>" + "关闭查询" + "</span>";
	$(div_closebtn_html).appendTo(div_closebtn);// 关闭查询
	$("<div/>").attr("id", "div_openimg").attr("class", "openimg")
			.appendTo(div_opendiv);// 所有查询div
	var div_img = $("<div/>").attr("id", "div_img").attr("class",
			"img").appendTo("#chartShowRight");// 打开查询div
	var div_img_html = "<span>" + "打开查询" + "</span>";
	$(div_img_html).appendTo(div_img);
	/** 打开图片div结束 */
	setCss_opendiv();
}

/**
 * 设置查询显示的样式
 */
function setCss_opendiv() {
	var width = $(".opendiv").width(), divHeight = $("body").height()
			- $(".header").height() - $(".footer").height(), divTop = $(
			".header").height(), divOpenHeight = divHeight - 22;
	$(".opendiv").css({
		"right" : "-" + width + "px",
		"height" : divHeight + "px",
		"top" : divTop + "px"
	});
	$(".openimg").css("height", divOpenHeight + "px");
	$(".img").click(function() {
		// 从数据库中获取数据
		$(this).animate({
			"opacity" : "0"
		}, 100, function() {
			$(this).css("z-index", "-9999");
			$(".opendiv").animate({
				"right" : "0px"
			}, "slow");
		});
	});
	$(".closebtn").click(function() {
		$(".opendiv").animate({
			"right" : "-" + width + "px"
		}, "slow", function() {
			$(".img").css({
				"opacity" : "1",
				"z-index" : "9999"
			}, 10);
		});
	});
}





