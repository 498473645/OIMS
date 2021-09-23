var huifangUrl = contextPath + "/publish/child/findHFJL.htm";

function HFListReady(btns){
    pageTitle="回访记录列表";
    init();
 var div_advquery =  $("<div/>").attr("id", "advquery").addClass("advquery").appendTo("#right");
    var childTemplate = "<table width='100%' border='0' cellspacing='0' cellpadding='0'>"
		+ "<tr>"
		+ "<td width='18%' class='leftalign' ><input name='search' type='text' class='blurview' id='search' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" value='"
		+ "请输入患者ID，姓名等"
		+ "' size='28' /></td>"
		+ "<td width='5%'><a  href='javascript:queryHFList();' class='search'>"+child_language.Query+"</a></td>"
		+ " <td width='5%'></td>"
		+ "<td width='72%' >"
		+ "</td>"
		+ "</tr>"
		+ "</table>";
    btnProwerConfig(btns);
    showHFList() ;
    $(childTemplate).appendTo(div_advquery);
    $("#search").click(function() {
		clearInitQuery(this);
	});// 点击清空输入框文字
	$("#search").blur(function() {
		if (this.value == "") {
			$("#search").val("请输入患者ID，姓名等");
			$("#search").addClass("blurview");
		}

	});
  };
  /**
   * @author andy
   * 按照条件查询患儿信息
   */
  function queryHFList(){
	  var pm = {};
	  var search = $("#search").val();
	  search =search==child_language.inputPatentIdOrName?"":$("#search").val();
	  $.extend(pm,{search:search});
	  $.extend(listFactor.data, pm);
	  $("#pageList").createPageList(listFactor);
  }

  /**
   * @author andy
   * 患者列表数据显示
   */
  function showHFList(){
	  
  	listFactor = {
  			listObj : [ {
  				title : "患者ID",
  				key : "id",
  			}, {
  				title : "患儿姓名",
  				key : "xingming"
  			}, {
  				title : "生日",
  				key : "shengri",
  				func:function(value){return value.toString().substring(0,11);}
  			}, {
  				title : "性别",
  				key : "xingbie",
  				func:function(value){return value = value == 1 ? '男':'女';}
  			}, {
  				title : "手机",
  				key : "shouji"
  			}, {
  				title : "电话",
  				key : "dianhua"
  			}, {
  				title : "备注",
  				key : "beizhu"
  			}, {
  				title : "回访方式",
  				key : "sffs",
  				func:function(value){return value = value == 1 ? '短信':'手机';}
  			}, {
  				title : "操作日期",
  				key : "addTime",
  				func:function(value){return value.toString().substring(0,11);}
  			}],
  			url : huifangUrl,
  			method : "post",
  			checkbox : true,
  			single : false,
  			data : {// data表示传的参数
  				currentPage : 1,
  				pageSize : getPageSize(),// Page类的方法
  				tag : Math.random()
  			}
  		};
  	$("#pageList").remove() ;
  	var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
  	.appendTo("#right");
  	$(div_list).createPageList(listFactor);
  } ;
