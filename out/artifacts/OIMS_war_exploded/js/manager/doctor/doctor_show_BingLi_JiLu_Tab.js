
/*
 * 显示病历记录页签
 * 宋仁非
 * */


function show_bingli_jilu_tab(md)
{
	var getMedicalRecordCategoryUrl = "/publish/doctor/getMedicalRecordCategory.htm";
	
	//获取电子病历分类（问诊、体格检查……）
	var categories = getJSONData(getMedicalRecordCategoryUrl).obj;
	
	//console.log("categories");
	//console.log(categories);
	
	//电子病历记录分类页签
	var div = $("#mcTitleTag_id");
	if (div.length<=0) 
	{
		div = $("<div />").addClass("tablabe2")
						  .height(28)
						  .attr("id","mcTitleTag_id")
		                  .addClass("mcTitleTag")
		                  .appendTo(dws.mcTag);
	} 
	else 
	{
		//清空页签显示区域
		div.text("");
	}
	//如何是患儿的话，那么不显示体格检查标签
	var mr=getJSONData("/publish/child/isXiaoEr.htm",{hzid:md.hzid},"POST");
	
	//循环拼接页签
	$.each(categories, function(i, d) 
	{	
		
		//如何是患儿的话，那么不显示体格检查标签	
		if(i==1&&mr.state==1){
			return true;
		}
		var a = $("<div />").appendTo(div);
		$("<span />").text(d.category).appendTo(a);
		if (i == 0) 
		{
			a.addClass("tab_show");
			a.attr("id","first_table");
//			console.dir(22);
			//显示电子病历记录
			
			showThisMC(md, d.id);
			
		} 
		else 
		{
			a.addClass("tab_hide");
		}
		
		a.click(function() {
			$(".right .mcTitleTag .tab_show").removeClass("tab_show")
			                                 .addClass("tab_hide");
			
				a.addClass("tab_show");
			
				zoom1024(div);
			
				//显示该类别下的的电子病历信息
				showThisMC(md, d.id);
			    
		});
		
	});
	
	zoom1024(div);
	
	//默认显示第一个页签“问诊”
	$("#first_table").click();
	
}	


function zoom1024(div)
{
	var table_div_width = 0;
	var table_show_width = $(".right .mcTitleTag .tab_show").outerWidth(true);
	var table_hide_divs = $(".right .mcTitleTag .tab_hide");
	$.each(table_hide_divs, function(i, d) 
	{
		table_div_width = table_div_width + $(d).outerWidth(true);
	});
	
	table_div_width = table_div_width + table_show_width;
	
	var nav_div = $(".mcTitleTag .edito");
	
	
	if((div.innerWidth()-nav_div.outerWidth(true))<table_div_width)
	{
		div.height(56);
	}
	else
	{
		div.height(28);
	}	
}	
	