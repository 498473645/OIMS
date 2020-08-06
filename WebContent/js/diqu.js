function showDiquSelect(tag,id,callback){
	if(id==undefined||id==null){
		id=0;
	}
	var re = getJSONData("/publish/diqu/findDiqusByPid.htm",{pid:id},"POST");
	if(!re.state||!re.obj.length){
		if (callback!=undefined) callback(id);
		return;
	}
	var ds = tag.find("select[name=diquId]");
	if(ds.length){
		ds.attr("name",ds.attr("name")+"_"+id);
	}
	var select = $("<select />").attr("name","diquId").width(58).addClass("diqu").change(function(){
		var t =$(this);
		var currentId=t.val();
		var _t=t.next();
		while(_t.length && _t[0].tagName=="SELECT"){
			_t.remove();
			_t = t.next();
		}
		if(currentId!=id)
			showDiquSelect(tag,currentId,callback);
	}).appendTo(tag);
	select.append("<option value='"+id+"'>请选择</option>");
	$.each(re.obj,function(i,d){
		$("<option />").val(d.id).text(d.name).appendTo(select);
	});
}

function showFullDiquSelect(tag,id,callback){
	if(id==undefined||id==null||id==0){
		showDiquSelect(tag,id,callback);
		return 
	}
	var re = getJSONData("/publish/diqu/findFullDiquID.htm",{id:id},"POST");
	if(!re.state || !re.obj.length){
		showDiquSelect(tag,id,callback);
		return;
	}
	for(var i=re.obj.length-1; i>=0; i--){
		var map = re.obj[i];
		var name = "diquId";
		if(i>0)name=name+"_"+i;
		var select = $("<select />").attr("name",name).width(58).addClass("diqu").change(function(){
			var t =$(this);
			var currentId=t.val();
			var _t=t.next();
			while(_t.length && _t[0].tagName=="SELECT"){
				_t.remove();
				_t = t.next();
			}
			if(currentId!=id)
				showDiquSelect(tag,currentId,callback);
		}).appendTo(tag);
		select.append("<option value='"+id+"'>请选择</option>");
		$.each(map.list,function(n,d){
			var option = $("<option />").val(d.id).text(d.name).appendTo(select);
			if(map.id==d.id)option.attr("selected","selected");
		});
	}
}