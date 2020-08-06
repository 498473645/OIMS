
/*
 * 显示处方页面
 * 
 */
//check
function show_chufang(div,md,id)
{
		
	var table = $("<table />").attr("id","yaopin_edit_table")
							  .addClass("emr_chufangtable")
							  /*.attr({"width":"100%","border":"0","cellspacing":"0","cellpadding":"0"})*/
							  .attr("table-layout","fixed")
                              .addClass("chuf");
	var tr1 = $("<tr />").attr("id","yaopin_title")
	                     .append($("<th />").append("药品名称"))
	                     .append($("<th />").append("类型"))
	                     .append($("<th />").append("数量"))
	                     .append($("<th />").append("规格"))
	                     .append($("<th />").append("用法用量"))
	                     .append($("<th />").append("操作"));
	
	var tr2 = new_yaopin_edit_line(1);
	
	tr1.appendTo(table);
	tr2.appendTo(table);
	
	$("<div />").addClass("opencontent").addClass("contentchu")
	            .append(table)
	            .appendTo(div);
	
	
	var btndiv = $("<div />").addClass("openbutton").attr("style","background:none")
	                         .appendTo(div);
	$("<a />").append(
					  $("<span />").addClass("save")
			         )
	          .append("提交")
	          .click(function(){yaopin_save(md);})
	          .appendTo(btndiv);
	
	$( "#yaopin_name_input_1" ).autocomplete({
		source: function(request,response){
			
			var term = request.term;
			
			if(term in yaopin_name_list_cache)
			{
				response(yaopin_name_list_cache[term]);
				return false;
			}
			
			if($.trim(term)!="")
			{
				var getSearchYaoPinNameUrl = "/publish/doctor/getSearchYaoPinNameUrl.htm";
				
				var result = getJSONData(getSearchYaoPinNameUrl, {"text":term,tag : Math.random()},"post").obj;
				
				yaopin_name_list_cache[term] = result;
				
				response( result );
			}
		},
		
		change: yaopin_change,
		
		select: yaopin_select
	});
	
	var getJiuZhenChuFangInfoUrl = "/publish/doctor/getJiuZhenChuFangInfoUrl.htm";
	
	var cfdata = getJSONData(getJiuZhenChuFangInfoUrl, {"jzid":md.id,tag : Math.random()},"post").obj;
	
	//console.log(cfdata);
	
	for(var n = 0 ; n < cfdata.length ; n++)
	{
		var cf_id = cfdata[n].chufang_id;
		var num = cfdata[n].num;
		var cus_dir = cfdata[n].cus_dir;
		var dir_w = $("#yaopin_dir_1").width();
		var d = {"name":cfdata[n].yaopin_name,"type_name":cfdata[n].type_name,"unit":cfdata[n].yaopin_unit};
		yaopin_add_one_line(cf_id,d,num,cus_dir,dir_w);
	}	
	
}

//加载只读处方开药页面
function loadReadOnly_chufang_Html(div,md,id)
{
	
}

function yaopin_change()
{
	checkandinputyaopininfo();
}

function yaopin_select()
{
	checkandinputyaopininfo();
}

function checkandinputyaopininfo()
{
	var term = $("#yaopin_name_input_1").val();
	
	if($.trim(term)!="")
	{
		var getYaoPinInfoByNameUrl = "/publish/doctor/getYaoPinInfoByNameUrl.htm";
		
		var result = getJSONData(getYaoPinInfoByNameUrl, {"text":term,tag : Math.random()},"post").obj;
		
		if(result!=null&&result!="")
		{	
			var d = result[0];
			$("#yaopin_type_1").html(d.type_name);
			$("#yaopin_unit_1").html(d.unit);
			$("#yaopin_dir_1").val(d.dir);
			
		}
		
		
	}
}

//提交保存开药信息
function yaopin_save(md)
{
	var term = $("#yaopin_name_input_1").val();
	
	if($.trim(term)!="")
	{
		var getYaoPinInfoByNameUrl = "/publish/doctor/getYaoPinInfoByNameUrl.htm";
		
		var result = getJSONData(getYaoPinInfoByNameUrl, {"text":term,tag : Math.random()},"post").obj;
		
		if(result!=null&&result!="")
		{	
			
			var d = result[0];	
			
			var num = $("#yaopin_num_1").val();
			var cus_dir = $("#yaopin_dir_1").val();
			var dir_w = $("#yaopin_dir_1").width();
			
			var saveChuFangInfoUrl = "/publish/doctor/saveChuFangInfoUrl.htm";
			
			var cf_id = getJSONData(saveChuFangInfoUrl, {"jzid":md.id,"ypid":d.ypid,"num":num,"cus_dir":cus_dir,tag : Math.random()},"post").obj;
			
			yaopin_add_one_line(cf_id,d,num,cus_dir,dir_w);
		}
		else
		{
			alert("请输入正确的药品名称！");
		}	
		
	}
}

function yaopin_add_one_line(cf_id,d,num,cus_dir,dir_w)
{
		
	var table = $("#yaopin_edit_table");
	$("<tr />").append(
						$("<td />").append(
											$("<span />").addClass("emr_yaopinedittable")/*.attr({"style":"display:block;text-align:center"})*/
			  			                          	     .append(d.name)
			  			                  )
			          )
			   .append(
						$("<td />").append(
											$("<span />").addClass("emr_yaopinedittable")/*.attr({"style":"display:block;text-align:center"})*/
														 .append(d.type_name)
										  )
			          )
			   .append(
						$("<td />").append(
											$("<span />").addClass("emr_yaopinedittable")/*.attr({"style":"display:block;text-align:center"})*/
											             .append(num)
								          )
			          )
			   .append(
						$("<td />").append(
								            $("<span />").addClass("emr_yaopinedittable")/*.attr({"style":"display:block;text-align:center"})*/
								                         .append(d.unit)
								          )
			          )
			   .append(
						$("<td />").attr("style","max-width:"+(dir_w-20)+"px").append(cus_dir)
			          )  
			   .append($("<td />").attr("style","cursor: pointer")
			            .addClass("chudel")
			            .click(function(){
			            	delete_yaopin_tr($(this).parent(),cf_id);
			            }))
	
	.prependTo(table);
}

function new_yaopin_edit_line(n)
{
	 var tr2 = $("<tr />")
     .attr("id","yaopin_newline_"+n)
	 .append(
			 $("<td />").append(
					 			$("<input />").attr({"type":"text",
					 				              "onfocus":"this.className='focus'",
					 				               "onblur":"this.className='blur'",
					 				                 "size":"15",
					 				                   "id":"yaopin_name_input_"+n})
					 			              .addClass("blur")
                               )
            )
     .append($("<td />").append(
					    		 $("<span />").attr({"id":"yaopin_type_"+n,
							             			"style":"display:block;text-align:center"
										  			})
										  	  .append("")
	                           )
            )       
	 
	 .append($("<td />").append(
			 					$("<input />").attr({"type":"text",
			 						              "onfocus":"this.className='focus'",
                                                   "onblur":"this.className='blur'",
                                                     "size":"1",
                                                       "id":"yaopin_num_"+n})
                                              .addClass("blur")
			                    )
			 )
	 .append($("<td />").append(
			 					$("<span />").attr({"id":"yaopin_unit_"+n,
			 						               "style":"display:block;text-align:center"
			 									  })
			 					             .append("")
			 					)
			)
	 .append($("<td />").append(
			 					$("<textarea />").attr({
			 							"rows":2,"cols":15,
			 										   "id":"yaopin_dir_"+n,
			 						              "onfocus":"this.className='focus'",
                                                   "onblur":"this.className='blur'"
                                                     })
                                              .addClass("blur")
			                    )
			 )
	 .append($("<td />").attr("style","cursor: pointer")
			            .addClass("chudel")
			            .click(function(){
			            	clear_yaopin_tr();
			            }));
	
	return tr2;
}


//清空药品编辑行
function clear_yaopin_tr()
{
	$("#yaopin_name_input_1").val("");
	$("#yaopin_type_1").html("");
	$("#yaopin_num_1").val("");
	$("#yaopin_unit_1").html("");
	$("#yaopin_dir_1").val("");
}


//删除一行已保存的药品信息
function delete_yaopin_tr(t,cf_id)
{
	var delChuFangInfoUrl = "/publish/doctor/delChuFangInfoUrl.htm";
	
	var bl = getJSONData(delChuFangInfoUrl, {"cf_id":cf_id,tag : Math.random()},"post").obj;
	if(bl == "true")
	{
		$(t).remove();
	}	
	
}






