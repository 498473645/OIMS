//=======================================已预约页面============================================


var revinfolstitle = function (){
    $("#right").empty();    
    $("#right").append($("<div />").addClass("title"));
    
    $(".title",$("#right")).append($("<div />") .addClass("titleT")
            .append($("<span />").addClass("title1"))
            .append(yuyue_lan.YuyueItem));
};
var revinfolslstl = function (){
	$("<div />").attr("id","advquery").addClass("advquery").appendTo("#right");
	var queryTool = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
	    "<tr>" +
	      "<td width='23%' class='leftalign' ><input name='search' type='text' class='blurview' " +
	      "id='search' value="+yuyue_lan.InputBlhOrXingMing+"..."+" size='28'/>"+
	      "<td width='9%'><a href='javascript:normalSearch();' class='search'>"+yuyue_lan.Query+"</a></td>" +
//	      "<td width='9%'><a href='javascript:rev.infols.advSearch();' class='advsearch'></a></td>" +
	      "<td width='59%' >" +
	         "<div class='btn'>" +
	         "<a href='javascript:mrg();'><span class='edit'></span>"+yuyue_lan.Modify+"</a>" +
	         "<a href='javascript:del();'><span class='del'></span>"+yuyue_lan.Del+"</a>" +
	         "</div>" +
	      "</td>" +
	    "</tr>" +
	  "</table>";
	$(queryTool).appendTo("#advquery");
};

var revinfolslsbd = function (){
	listFactor = {
	   listObj : [ 
			{
				title : yuyue_lan.BingLiHao,
				key : "pno"
			},
			{
				title : yuyue_lan.XingMing,
				key : "pname"
			},
			{
				title : yuyue_lan.Sex,
				key : "psex",
				func: function(value){
					return (value==0)?yuyue_lan.Female:yuyue_lan.Male;
				}
			},
			{
				title : yuyue_lan.Age,
				key : "pbirthday",
				func: function(value){
					return cal(value);
				}
			},
			{
				title : yuyue_lan.YuYueSJ,
				key : "revdt"
			},
			{
				title :yuyue_lan.TeleNum,
				key : "phone"
			},
			{
				title : yuyue_lan.YanBie,
				key : "eyetype",
				func: function(value){
					if(value==46){
						return yuyue_lan.LeftEye;
					}
					if(value==47){
						return yuyue_lan.RightEye;
					}
					if(value==48){
						return yuyue_lan.DoubleEye;
					}
				}
			},
			{
				title : yuyue_lan.Jcxm,
				key : "projName"
			},
			{
				title : yuyue_lan.jcyq,
				key : "memo"
			},
			{
				title : yuyue_lan.State,
				key : "revstate",
				func: function(value){
					return (value==1)?yuyue_lan.yiqueren:yuyue_lan.yiyuyue;
				}
			}
			],
			url :contextPath+findRevInfoByUser+"?factor=all",// url
			method:"post",
			checkbox:true,
			single:false,
			data : {//data表示传的参数
				currentPage : 1,
			    pageSize : getPageSize(),//Page类的方法,
				tag : Math.random()
			}
		};
	var div_list = $("<div />").attr("id", "pageList").attr("class","list").appendTo("#right");
	$(div_list).createPageList(listFactor);
};
var revinfolsbtn = function(){
	$("#search").bind("focus",function(){
		clearInitQuery(this);
	});
	$("#search").bind("blur",function(){
		if($(this).val() == ""){
			$(this).removeClass();
			$(this).addClass("blurview");
			$(this).val(yuyue_lan.InputBlhOrXingMing+"...");
		}
	});
};

var normalSearch = function(){
	//查询
	if($("#search").val() == yuyue_lan.InputBlhOrXingMing+"..."){
		$("#search").val("");
	}
	var obj = {
		search : $("#search").val()
	};
	$.extend(listFactor.data, obj);
	$("#pageList").createPageList(listFactor);
};

var mrg = function(){
	if(!isSingleSelect()){
		return;
	}
	var dataObjects=getCheckBoxValue();
	revinfoinit();
	fillRevJcd(dataObjects);
};
var del = function(){
	if(!isSelect()){
		return;
	}
	var objs=getCheckBoxValue();
	var ids = new Array();
	$.each(objs, function(){
		ids.push(this.revInfoId);
	});
	var rs = getJSONData(delRevInfoUrl,{"ids": ids.toString() },"POST");
	if(rs.state){
		$.oimsSucc(yuyue_lan.yuyuejianchasccg+"！");
	}else{
		$.oimsError(yuyue_lan.yuyuejianchascsb+"！");
	}
	revinfoinit();
	//只能删除未确认信息
};

var revinfolsinit = function(){
	revinfolstitle();
	revinfolslstl();
	revinfolslsbd();
	revinfolsbtn();
};

var isSelect=function(){
	var dataObjects=getCheckBoxValue();
	if(!dataObjects || dataObjects.length<1){
		$.oimsAlert(yuyue_lan.qingxuanzejiljxcz+"！");
		return false;
	}
	return true;
};
var isSingleSelect=function(){
	var dataObjects=getCheckBoxValue();
	if(dataObjects.length!=1){
		$.oimsAlert(yuyue_lan.qingxuanzeyitjljxcz+"！");
		return false;
	}
	return true;
};