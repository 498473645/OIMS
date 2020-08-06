var later=null;
var autofindurl="/publish/emr/autofindurl.htm";
var main_id=30100;
var now_id=30102;
var old_id=30103;
var allergies_id=30101;
var family_id=30104;
var inquiry_position_index=[0,1,2,3,4];



$.fn.autofind=function(inquiry_position){
	
	
	
	$(this).bind("keyup",function(){
		
		//通过隐藏的input判断到底是那个问诊的那个部分的模板
		var category_id=main_id;
		if(inquiry_position==inquiry_position_index[0]){
			category_id=main_id;
		}else if(inquiry_position==inquiry_position_index[1]){
			category_id=now_id;
		}else if(inquiry_position==inquiry_position_index[2]){
			category_id=old_id;
		}else if(inquiry_position==inquiry_position_index[3]){
			category_id=allergies_id;
		}else if(inquiry_position==inquiry_position_index[4]){
			category_id=family_id;
		}		
		var input=$(this);
		if(later!=null) clearTimeout(later);
		later=setTimeout(function(){
			//每次按键后过500毫秒要执行的函数
			var key=input.val();
			if($.trim(key)!=""){
				//ajax查找填充
				console.log(autofindurl+"@@"+category_id+"@@"+key);
				var data=getJSONData(autofindurl,{category_id:category_id,pinyin:key,tag:Math.random()},"POST");

				var table=$("#inquiry_context table").html("");
				$.each(data,function(i,n){
					var tr=$("<tr />").appendTo(table);
					var td=$("<td />").appendTo(tr);
					td.text(n.shuru);
				});
			
			}
			else{
				//填充之前完整的对应模板
				alert("输入为空");
			}
		},500);
	});
};