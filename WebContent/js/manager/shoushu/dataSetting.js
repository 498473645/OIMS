//TODO 下面的几个东东 下一步需存入数据库中
/**
 * 1.手术类别
 */
var operationCategories = [
                           {name:"门诊",value:0},
                           {name:"住院",value:1}
                           ];
var childOperationCategories = [
                                {name:"常规",value:1},
                                {name:"日间手术",value:2},
                                {name:"非二次计划手术",value:3},
                                {name:"周末手术",value:4}];
/**
 * 2.手术大小
 */
var operationSizeValue = [
                           {name:"小型手术", value:0},
                           {name:"中型手术", value:1},
                           {name:"大型手术", value:2}
                           ];

/**
 * 3.手术级别
 */
var operationLevelValue = [
                              {name:"一级手术", value:0},
                              {name:"二级手术", value:1},
                              {name:"三级手术", value:2},
                              {name:"四级手术", value:3}
                              ];

/**
 * 4.手术时预定义
 */
var operationRooms = [
                     {id:1,name:"1号"},
                     {id:2,name:"2号"},
                     {id:3,name:"3号"},
                     {id:4,name:"4号"},
                     {id:5,name:"5号"},
                     {id:6,name:"急诊"},
                     {id:7,name:"门诊"}
                     ];
/**
 * 5.麻醉方式
 */
var anesthesiaValues =[
                       {id:1,name:"表面麻醉"},
                       {id:2,name:"局部麻醉"},
                       {id:3,name:"吸入全麻"},
                       {id:4,name:"静脉全麻"},
                       {id:0,name:"无麻醉"}
                       ];

/**
 * 6.状态
 */
var processStateValues = [
                          {value:0,name:"已预约"},
                          {value:1,name:"已申请"},
                          {value:2,name:"已安排"},
                          {value:3,name:"已手术"},
                          {value:4,name:"未手术"},
                          {value:5,name:"停手术"},
						   {value:10,name:"手术中"}
                          ];
/**
 * 
 * @param v
 * @returns {String}
 */
var pat_dept={'230303':'A区','230304':'B区','230305':'C区','230306':'日间区','230307':'R区'};//可以定义到data.setting.js中

function getOperationCategoryByValue(v){
	var s = "-";
	$.each(operationCategories,function(i,d){
		if(d.value==v){
			s=d.name;
			return false;
		}
	});
	return s;
}

function getOperationLevelByValue(v){
	var s = "-";
	$.each(operationLevelValue,function(i,d){
		if(d.value==v){
			s=d.name;
			return false;
		}
	});
	return s;
}

function getOperationRoomById(v){
	var s = "-";
	$.each(operationRooms,function(i,d){
		if(d.id==v){
			s=d.name;
			return false;
		}
	});
	return s;
}

function getAnesthesiaById(v){
	var s = "-";
	$.each(anesthesiaValues,function(i,d){
		if(d.id==v){
			s=d.name;
			return false;
		}
	});
	return s;
}

function getProcessStateByValue(v){
	var s = "-";
	$.each(processStateValues,function(i,d){
		if(d.value==v){
			s=d.name;
			return false;
		}
	});
	return s;
}

function getOperationSizeByValue(v){
	var s = "-";
	$.each(operationSizeValue,function(i,d){
		if(d.value==v){
			s=d.name;
			return false;
		}
	});
	return s;
}

function getChildOperationCategoryByValue(v){
	var s = "-";
	$.each(childOperationCategories,function(i,d){
		if(d.value==v){
			s=d.name;
			return false;
		}
	});
	return s;
}