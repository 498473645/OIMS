
function _emr_createDiseaseTree(){
	var setting = {
		view : {
			selectedMulti : false
		},
		check:{
			enable:true
		},
		data : {
			keep : {
				parent : true,
				leaf : true
			},
			simpleData : {
				enable : true,
				idKey:'id',
				pIdKey:'father_id'
			}
		}
	};
	var result = _emr_getCategoriesData(40000);
	var data = new Array();
	$.each(result,function(){
		var o = {};
		o.name = '('+this.icd_code+')'+this.disease;
		o.id = this.id;
		o.father_id = this.father_id;
		data.push(o);
	});
	result = _emr_getCategoriesData(40064);
	$.each(result,function(){
		var o = {};
		o.name = '('+this.icd_code+')'+this.disease;
		o.id = this.id;
		o.father_id = this.father_id;
		data.push(o);
	});
	_emr_diseaseTree=_emr_createTree(setting,data,'disease');
}

function _emr_getCategoriesData(fatherId){
	//RESULT是List<Ji
	var result = getJSONData(getDiseaseUrl,{fatherId:fatherId});
	if(!result.state){//错误处理，暂未写
		return 0;
	}
	return result.obj;
}

/**
 * 创建一颗树
 * @param setting ztree配置项
 * @param data 格式化的ztree节点数据
 * @param id 树容器id
 * @returns zTree
 */
function _emr_createTree(setting,data,id){
	importCSS("/css/zTree/zTreeStyle.css");
	importJS("/js/jquery.ztree.core-3.3.min.js");
	importJS("/demo/doctor/jquery.ztree.excheck-3.3.min.js");
	importJS("/demo/doctor/jquery.ztree.exhide-3.3.min.js");
	var tree = $.fn.zTree.init($("#"+id), setting, data);
	return tree;
}