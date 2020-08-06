function getCategoriesData(fatherId){
	//RESULT是List<Ji
	var result = getJSONData(getDiseaseUrl,{fatherId:fatherId,tag:Math.random()});
	if(!result.state){//错误处理，暂未写
		return 0;
	}
	return result.obj;
}

function showCategoryTree(target, fatherId,clickFunc,expandFunc) {
	if (fatherId == undefined || fatherId == null)
		fatherId = 0;
	var result = getCategoriesData(fatherId);
	if (!result.length)
		return;
	var callbackFunc={
		onClick : clickFunc,
		onExpand : expandFunc
	}
	showMyTree(target, result,callbackFunc);

}
/*// 疾病管理的树展示
function showDiseaseTree(target, fatherId) {
	if (fatherId == undefined || fatherId == null)
		fatherId = 0;
	var result = getCategoriesData(fatherId);
	if (!result.length)
		return;
	showTree(target, result);
}*/
/*function showTree(target, result) {
	$(".categoryTitle").width(175);
	var t = $("<div id='C_ri' />").css({
		"overflow" : "auto"
	});
	t.width(180);
	t.height($(".categoryTree").height() - $(".tablabel").height() - 40);
	t.appendTo(target);
	var ul = $("<ul id='bingLiUL' />").addClass("ztree").appendTo(t);
	ul.show();
	createDiseaseTree("bingLiUL", result);
}*/

function showMyTree(target, result,callbackFunc) {
	$(".categoryTitle").width(175);
	var t = $("<div id='C_ri' />").css({
		"overflow" : "auto"
	});
	t.width(180);
	t.height($(".categoryTree").height() - $(".tablabel").height() - 40);
	t.appendTo(target);
	var ul = $("<ul id='bingLiUL' />").addClass("ztree").appendTo(t);
	ul.show();
	createTree("bingLiUL", result,callbackFunc);
}
/*function createDiseaseTree(ul, result) {
	importCSS("/css/zTree/zTreeStyle.css");
	importJS("/js/jquery.ztree.core-3.3.min.js");
	var treeDate = new Array();
	$.each(result, function(i, v) {
		var d = categoryToTreeDate(v);
		treeDate.push(d);
	});

	var setting = {
		view : {
			selectedMulti : false
		},
		edit : {
			enable : true,
			showRemoveBtn : false,
			showRenameBtn : false
		},
		data : {
			keep : {
				parent : true,
				leaf : true
			},
			simpleData : {
				enable : true
			}
		},
		callback : {
			onClick : onDiseaseClick,
			onExpand : onDiseaseClick

		}
	};

	$.fn.zTree.init($("#" + ul), setting, treeDate);
};
*/

function createTree(ul, result,callbackFunc) {
	importCSS("/css/zTree/zTreeStyle.css");
	importJS("/js/jquery.ztree.core-3.3.min.js");
	var treeDate = new Array();
	$.each(result, function(i, v) {
		var d = categoryToTreeDate(v);
		treeDate.push(d);
	});
	var setting = {
		view : {
			selectedMulti : false
		},
		edit : {
			enable : true,
			showRemoveBtn : false,
			showRenameBtn : false
		},
		data : {
			keep : {
				parent : true,
				leaf : true
			},
			simpleData : {
				enable : true
			}
		},
		callback : callbackFunc
	};

	$.fn.zTree.init($("#" + ul), setting, treeDate);
};

/**
 * 递归生成数据
 * 
 * @param d
 */
function setTreeDate(d) {
	var t = getCategoriesData(d.id);
	if (t.length <= 0)
		return;
	$.each(t, function(i, v) {
		if (v == undefined)
			return false;
		var tmp = categoryToTreeDate(v);
		d.children.push(tmp);
		setTreeDate(tmp);
	});
}
/**
 * category数据转成zTree所用数据
 * 
 * @param c
 * @returns {___anonymous1333_1412}
 */
function categoryToTreeDate(c) {

	var ar = getCategoriesData(c.id);
	if (ar.length > 0 || c.id == 40001)
		ar = true;
	else
		ar = false;

	return {
		isParent : ar, // 让没有子节点的根也显示为文件夹，但是正常的子节点也显示为文件夹了
		name : "(" + c.id + ")" + c.category,
		id : c.id,
		pId : c.fatherid,
		children : new Array()
	};
};

function beforeClick(treeId, treeNode, clickFlag) {
	return (treeNode.click != false);
};

// 定义全局变量，把它作为添加疾病时候的id值
var disease_id;

function beforeDrag(treeId, treeNodes) {
	alert(beforeDrag);
	return false;
};

