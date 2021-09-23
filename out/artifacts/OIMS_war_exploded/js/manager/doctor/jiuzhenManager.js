/**
 *  author:zhujianrong
 *  date:2012-08-07
 */
//


//importCSS("/style/start/jquery-ui-1.8.2.custom.css");
//importJS("/js/jquery-ui-1.8.16.custom.min.js");
//importJS("/js/ui.datetimepicker.js");
function importCssAndJs(){

}

$(document).ready(function() {
	importCssAndJs();
});



function showDaiZhenHuanZheList(){
	pageTitle="未接诊";
    init();
    var DaiZhenHuanZheFunTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
								"<tr>" +
								  "<td width='23%' class='leftalign' ><input name='search' type='text' class='blurview' id='search' onfocus='this.className='focus'' onblur='this.className='blur'' value='请输入病历号或患者姓名' size='28' /></td>" +
								  "<td width='9%'><a href='javascript:jiuZhenQuery();' class='search'></a></td>" +
								  "<td width='9%'><a href='javascript:jiuZhenSeniorQuery();' class='advsearch'></a></td>" +
								  "<td width='59%' >" +
								  "<div class='btn'>" +
							       "<a href=''><span class='diagnosis'></span>接诊</a>" +
							       "</div>" +
								  "</td>" +
								"</tr>" +
								"</table>";

$("<div/>").attr("id","advquery").addClass("advquery").appendTo("#right");
$(DaiZhenHuanZheFunTemplate).appendTo("#advquery");
$("#search").click(function(){
	clearInitQuery(this);
});
	listFactor = {
	   listObj : [ 
			{
				title : "序号",
				key : "paihao"
			},
			{
				title : "病历号",
				key : "binglihao"
			},
			{
				title : "姓名",
				key : "hzxm"
			},
			{
				title : "性别",
				key : "hzxb"
			},
			{
				title : "年龄",
				key : "nianling"
			},
			{
				title : "接诊医生",
				key : "fzys"
			},
			{
				title : "接诊时间",
				key : "caozuoTime"
			},
			{
				title : "状态",
				key : "state"
			}
			],
			url :contextPath+"/publish/jiuzhen/getJiuZhenHuanZheList.htm?state=27",
			method:"post",
			checkbox:true,
			single:false,
			data : {
				currentPage : 1,
			    pageSize : 10,
				tag : Math.random()
			}
		};
	var div_list = $("<div />").attr("id", "pageList").attr("class","list").appendTo("#right");
	$(div_list).createPageList(listFactor);
}

function showFinishHuanZheList(){
	pageTitle="已完成";
    init();
    var FinishHuanZheFunTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
										"<tr>" +
										  "<td width='23%' class='leftalign' ><input name='search' type='text' class='blurview' id='search' onfocus='this.className='focus'' onblur='this.className='blur'' value='请输入病历号或患者姓名' size='28' /></td>" +
										  "<td width='9%'><a href='javascript:jiuZhenQuery();' class='search'></a></td>" +
										  "<td width='9%'><a href='javascript:jiuZhenSeniorQuery();' class='advsearch'></a></td>" +
										  "<td width='59%' >" +
										  "<div class='btn'>" +
									       "<a href=''><span class='view'></span>查看</a>" +
									       "</div>" +
										  "</td>" +
										"</tr>" +
									"</table>";
    $("<div/>").attr("id","advquery").addClass("advquery").appendTo("#right");
    $(FinishHuanZheFunTemplate).appendTo("#advquery");
    $("#search").click(function(){
    	clearInitQuery(this);
    });
    
	this.listFactor = {
	        listObj:[{
	        	title:"序号",
	        	key:"paihao"
	        },{
	            title:"病历号",
	            key:"binglihao"
	        },{
	            title:"患者姓名",
	            key:"hzxm"
	        },{
	            title:"性别",
	            key:"hzxb"
	        },{
	            title:"年龄",
	            key:"nianling"
	        },{
	            title:"接诊医生",
	            key:"fzys"
	        },{
	            title:"就诊次数",
	            key:"times"
	        },{
	            title:"状态",
	            key:"state"
	        }],
	        url :contextPath+"/publish/jiuzhen/getJiuZhenHuanZheList.htm?state=29",
			method:"post",
			checkbox:true,
			single:false,
			data : {//data表示传的参数
				currentPage : 1,
			    pageSize : 10,//Page类的方法
				tag : Math.random()
			}
	 };
	var div_list = $("<div />").attr("id", "pageList").attr("class","list").appendTo("#right");
	$(div_list).createPageList(listFactor);
	
}

function jiuZhenQuery(){
	var obj = {search:$("#search").val()};
    $.extend(listFactor.data,obj);
    $("#pageList").createPageList(listFactor);
}

function jiuZhenSeniorQuery(){
	var seniorSearchTemplate = " <table width='100%' border='0' cellspacing='0' cellpadding='0'>" +
		" <tr>" +
		"  <td width='7%' align='right' nowrap>病历号：</td>" +
		" <td width='12%'><input type='text' name='binglihao'   id='binglihao'   onblur='this.className='blur'' onfocus='this.className='focus'' class='blur' /></td>" +
		"  <td width='7%' align='right' nowrap>患者姓名：</td>" +
		" <td width='12%'><input type='text' name='xingming'   id='xingming'   onblur='this.className='blur'' onfocus='this.className='focus'' class='blur' /></td>" +
		"  <td width='5%' align='right' nowrap>性别：</td>" +
		"  <td width='15%'><input type='radio' name='xingbie' id='xingbie' value='1'/>男<input type='radio' name='xingbie' id='xingbie' value='0'/>女<input type='radio' name='xingbie' id='xingbie' value='2'/>全部</td>" +
		" <td width='7%' align='right' nowrap>联系方式：</td>" +
		" <td width='13%'><input type='text' name='shouji'   id='shouji'   onblur='this.className='blur'' onfocus='this.className='focus'' class='blur' /></td>" +
		
		" </tr>" +
		" <tr>" +
		" <td width='4%' align='right' nowrap>接诊医生：</td>" +
		" <td width='7%'><select name='fzys' id='fzys' onfocus='this.className='focus'' onblur='this.className='blur''>" +
		" <option value=''>--请选择接诊医生--</option>" +
		"</select></td>" +
		" <td width='8%' align='right' nowrap>接诊时间：</td>" +
		" <td width='13%'><input type='text' name='startTime'   id='startTime'   onblur='this.className='blur'' onfocus='this.className='focus'' class='blur' />" +
		" </td>" +
		" <td align='right' nowrap></td>" +
		" <td>" +
		
		" </td>" +
		
		" <td align='right' nowrap> </td>" +
		" <td></td>" +
		" </tr>" +
		" </table>" +
		" <div class='buttonsytle' >" +
		" <a href='javascript:seniorSearchSubmit();'><span class='advsumit'></span>提交</a>" +
		" <a href='javascript:seniorSearchReset();'><span class='advreset'></span>重置</a>" +
		" </div> ";
	var div = $("<div />").attr("id","seniorSearch").appendTo("body");
	$(seniorSearchTemplate).appendTo("#seniorSearch");
	$(div).oimsDialog({winType:4,icon:"advsearch",title:"高级查询",drag:true,locked:false,width:"800",height:"170"});
}

function seniorSearchSubmit(){
	var obj = {binglihao:$("#binglihao").val(),xingming:$("#xingming").val(),
			xingbie:$("input[name='xingbie']:checked").val(),
			shouji:$("#shouji").val(),fzys:$("#fzys option:selected").val(),
			startTime:$("#startTime").val()};
   $.extend(listFactor.data,obj);
   $("#pageList").createPageList(listFactor);
}

function seniorSearchReset(){
	$("#binglihao").val("");
	$("#xingming").val("");
	$("input:[name='xingbie']").attr("checked",false);
	$("#shouji").val("");
	$("#fzys").val("");
	$("#startTime").val("");
}