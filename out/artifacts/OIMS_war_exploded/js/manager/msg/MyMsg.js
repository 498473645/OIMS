/**
 * 消息推送模块JS
 * @author Li Yan 
 */
var FIND_USER_LIST = "/publish/msg/findUserlist.htm";
var FIND_MSG_URL = "/publish/msg/findMsgListWithUser.htm";
var FIND_TODAY_MSG_URL = "/publish/msg/findTodayMsgListWithUser.htm";
var FIND_MSG_USER_LIST = "/publish/msg/findMSGUserlist.htm";
var SEND_MSG_URL = "/publish/msg/sendMSG.htm";
var DELETE_MSG_URL = "/publish/msg/deleteMSG.htm";

$(function(){
	importCSS("/css/msg.css");
	showMSGIcon();
});

$(window).resize(function(){
	var offset = $("#footer").offset();
	$("#msgPanelDivBg").css({top:offset.top, left:$(window).width()-37})
	$("#msgPanelDiv").css({top:offset.top, left:$(window).width()-37})
	$("#msgUserListPanel").hide();
});

/**
 * 显示MSG图标
 */
function showMSGIcon(){
	var offset = $("#footer").offset();
	var div = $("#msgPanelDiv");
	if(!div.length){
		$("<div />").attr("id","msgPanelDivBg").addClass("msgPanel").addClass("msgPanelDivBg").css({top:offset.top, left:$(window).width()-39}).appendTo("body");
		div = $("<div />").attr("id","msgPanelDiv").attr("title","消息发送").addClass("msgPanel").addClass("msgPanelCount").css({top:offset.top, left:$(window).width()-39}).appendTo("body");
		div.click(function(){
			if(!$(this).children("a").length){
				showMSGUserListPanel();
			}
		});
	}
	
	var re = getJSONData(FIND_MSG_USER_LIST,{tag:Math.random()},"POST")
	
	if(re.length>0){
		div.text("");
		$("<a />").text(re.length).attr("href","javascript:void(0)").click(function(){
			showNewMSGUser(re);
		}).appendTo(div);
	}else{
		div.text("");
	}
	setTimeout("showMSGIcon()",5000);
}

/**
 * 显示有新消息的用户列表
 */
function showNewMSGUser(re){
	var tag = $("#newMsgUser");
	if(tag.length){
		if(tag.is(":visible"))
			tag.hide();
		else
			tag.show();
		return;
	}
	tag = $("<div />").attr("id","newMsgUser").addClass("msgUserDiv").appendTo("body");
	var ul = $("<ul />").appendTo(tag);
	$.each(re,function(i,d){
		var li = $("<li />").hover(function(){
			$(this).addClass("user_hover");
		},function(){
			$(this).removeClass("user_hover");
		}).appendTo(ul);
		$("<a />").data("data",d).attr("href","javascript:void(0)").addClass("name").click(function(){
			showMSGDialog($(this).data("data"));
			tag.remove();
		}).html(d.xingming).appendTo(li);
		if(d.zhiwu){
			$("<span />").html("&nbsp;-&nbsp;").appendTo(li);
			$("<span />").addClass("zhiwu").text(d.zhiwu).appendTo(li);
		}
	});
	var p = $("#msgPanelDiv").offset();
	tag.css({
		top:p.top-tag.outerHeight(),
		left:p.left-tag.outerWidth()+$("#msgPanelDiv").outerWidth()
	});
}


/**
 * 显示用户清单面板
 */
function showMSGUserListPanel(){
	var panel = $("#msgUserListPanel");
	if(panel.length){
		panel.remove();
		return;
	}
	panel = $("<div />").attr("id","msgUserListPanel").css({top:$("#content").offset().top, left:$("#content").width()-168, height:$("#content").height(),'background-color':"#7EE4C3"}).appendTo("body");
	$("<div />").addClass("msgPanelTitle").appendTo(panel);
	var p = $("<p />").addClass("userListBtnP").appendTo(panel);
	$("<span />").addClass("userListBTN").addClass("on").text("在线用户").click(function(){
		if($(this).hasClass("on"))return;
		p.find(".on").removeClass("on");
		showMSGUserList("online");
		$(this).addClass("on");
	}).appendTo(p);
	$("<span />").html("&nbsp; | &nbsp;").appendTo(p)
	$("<span />").addClass("userListBTN").text("离线用户").click(function(){
		if($(this).hasClass("on"))return;
		p.find(".on").removeClass("on");
		showMSGUserList("offline");
		$(this).addClass("on");
	}).appendTo(p);
	showMSGUserList("online");
}

/**
 * 显示用户列表
 * @param re
 */
function showMSGUserList(v){
	var tag = $("#userListTag");
	if(!tag.length){
		tag = $("<div />").attr("id","userListTag").addClass("userListTag").height($("#msgUserListPanel").height()-$(".msgPanelTitle").outerHeight()-$("#msgUserListPanel").children("p").outerHeight()).appendTo("#msgUserListPanel");
	}else{
		tag.text("");
	}
	var page=1,pageCount=1;
	addUserList();
	function addUserList(){
		var re = getJSONData(FIND_USER_LIST,{currentPage:page,online:(v=="online"),pageSize:30},"POST");
		if(re.list.length>0){
			var input=$("<input />").attr("type","text").attr("class","text").attr("id","showUserId").attr("style","width: 95%").appendTo(tag);
			$("#showUserId").bind("input propertychange",function(){
			   var iupvalue = this.value;
			   ul.find("li").each(function(){
//				   debugger;
					 var aname=this.firstChild.innerHTML;
					 var isin=find(iupvalue,aname);
					 if(isin>=0){
						 $(this).show();
					 }else{
						 $(this).hide();
					 }
					  if(iupvalue==""){
						  $(this).show();
					  }
			   });
			});
			var ul = tag.find("ul");
			if(!ul.length)ul = $("<ul />").appendTo(tag);
			$.each(re.list,function(i,d){
				var li = $("<li />").hover(function(){
					$(this).addClass("user_hover");
				},function(){
					$(this).removeClass("user_hover");
				}).appendTo(ul);
				if(v=="online"){
					$("<a />").data("data",d).attr("href","javascript:void(0)").addClass("name").click(function(){
						showMSGDialog($(this).data("data"));
					}).html(d.xingming).appendTo(li);
					}else{
						$("<a />").data("data",d).attr("href","javascript:void(0)").click(function(){
							showMSGDialog($(this).data("data"));
						}).html(d.xingming).appendTo(li);					
					}
				if(d.zhiwu!=null){
					$("<span />").html("&nbsp;-&nbsp;").appendTo(li);
					$("<span />").addClass("zhiwu").text(d.zhiwu).appendTo(li);
				}
//				$("<span />").addClass("newmsg").text("新").appendTo(li);
			});
		}
//		pageCount = re.page.pageCount;
//		if(pageCount>page){
//			tag.bind("scroll",function(e){
//				var h = tag[0].scrollHeight-tag.height();
//				var h0 = $(e.target).scrollTop();
//				if(h-h0<60){
//					page++;
//					addUserList();
//					if(page==pageCount)tag.unbind("scroll");
//					return false;
//				}
//			});
//		}
	}
	//tag.scrollTop(0);
	function find(sFind,sObj){
		var nSize = sFind.length;
		var nLen = sObj.length;
		var sCompare;
		if(nSize<=nLen){
			for(var i=0;i<nLen-nSize+1;i++){
				sCompare = sObj.substring(i,i+nSize);
				if(sCompare == sFind){
					return i;
				}
			}
		}
		return -1;
	}
}


/**
 * 显示消息对话框
 */
function showMSGDialog(user){
	var div = $("#msgDialog_"+user.gonghao);
	if (!div.length) {
		div = $("<div />").attr("id","msgDialog_"+user.gonghao).addClass("msgDialog").appendTo("body");
		var history = $("<div />").attr("id","msgHistoryDiv_"+user.gonghao).addClass("msgHistoryDiv").appendTo(div);
		$("<div />").attr("id","msgHistory_"+user.gonghao).addClass("msgHistory") .appendTo(history);
		$("<div />").attr("id","msgToday_"+user.gonghao).addClass("msgToday").appendTo(history);
		var inputDiv = $("<div />").attr("id","msgInputDiv_"+user.gonghao).addClass("msgInputDiv").height(108).appendTo(div);
		div.oimsDialog({
			title:user.xingming+" - 对话",
			locked:true
		});
		var h = div.parent().height()
		div.height(h);
		history.height(h-inputDiv.outerHeight());
	}
	showHistoryMsgList(user.gonghao);
	showMsgForm(user.gonghao);
	showTodayMsgList(user.gonghao);
}

/**
 * 显示历史记录
 */
function showHistoryMsgList(gonghao,page,pageSize){
	var tag = $("#msgHistory_"+gonghao);
	if(page==undefined)page=1;
	if(page==1)tag.text("");
	
	if(page>1){
		$(".morMsgListDiv").remove();
	}
	if(pageSize==undefined)pageSize=10;
	var re = getJSONData(FIND_MSG_URL,{gonghao:gonghao,currentPage:page,pageSize:pageSize},"POST");
	$.each(re.list,function(i,d){
		showMSGInDialog(d,tag,gonghao,0);
	});
	
	if(re.page.pageCount>page){
		$("<div />").addClass("morMsgListDiv").text("点击获取更多").click(function(){
			var change = $(this).data("change");
			if(change){
				var len = tag.children("div.msgBox").length;
				if(len<pageSize)len = pageSize;
				showHistoryMsgList(gonghao,1,len);
			}else
				showHistoryMsgList(gonghao, page+1);
		}).prependTo(tag);
	}
}

/**
 * 显示今天的对话记录
 * @param gonghao
 */
var lastMSGListToday=null;
function showTodayMsgList(gonghao,show){
	var tag = $("#msgToday_"+gonghao);
	if(!tag.length)return;
    var re = getJSONData(FIND_TODAY_MSG_URL,{gonghao:gonghao},"POST");
    if(re.length && (!show ||re.length!=lastMSGListToday.length||re[re.length-1].id!=lastMSGListToday[lastMSGListToday.length-1].id)){
	    lastMSGListToday = re;
	    tag.text("");
	    $.each(re,function(i,d){
			showMSGInDialog(d,tag,gonghao,1);
		});
	    var h = tag.parent()[0].scrollHeight-tag.parent().height();
	    if(h){
	    	tag.parent().scrollTop(h);
	    }
    }
    setTimeout("showTodayMsgList('"+gonghao+"',1)",5000);
}

function showMSGInDialog(d,tag,user,order){
	var className = d.insertUser==user?"userMsg":"myMsg";
	var div = order ? $("<div />").appendTo(tag) : $("<div />").prependTo(tag);
	div.addClass("msgBox").addClass(className);
	$("<p />").append($("<a />").text("X").attr("title","删除此条").addClass("deleteBtn").click(function(){
		var more = $(this).parent().parent().parent().find(".morMsgListDiv");
		var re = getJSONData(DELETE_MSG_URL,{id:d.id,re:true});
		if(re.state){
			div.remove();
			if(more.length){
				more.data("change",true);
			}
		}else{
			$.oimsAlert("删除失败！");
		}
	})).appendTo(div);
	if(d.title!=null && d.title.length){
		$("<div />").addClass("msgTitle").text(d.title).appendTo(div);
	}
	var content = "";
	if(d.insertUser==user){
		content = user +"：              ";
	}else{
		content = "我：               ";
	}
	if(d.content!=null && d.content.length){		
		var divmsg = $("<div />").addClass("msgContent").html(d.content).appendTo(div);
		divmsg.prepend($("<span />").attr("style","color:#463edd").text(content));		
		}
	if(d.attachment && d.attachment.length){
		var ad = $("<div />").addClass("msgAttachmentDiv").appendTo(div);
		$.each(d.attachment,function(i,a){
			$("<a />").addClass("msgAttachment").text(a.filename).attr("href",contextPath+a.path).attr("target","_blank").appendTo(ad);
			ad.prepend($("<span />").attr("style","color:#463edd").text(content));		
		});
	}
	$("<div />").addClass("msgSendTime").text(formatDateTime(d.insertDate.time)).appendTo(div);
	if($("#hideAll").attr("value")=='显示全部'){
		$(".msgContent").parent().hide();
	}else{
		$(".msgContent").parent().show();		
	}
}
function dotrim(str){
	return str.replace(/(^\s*)|(\s*$)/g,'');
}
/**
 * 显示消息发送表单
 * @param gonghao
 */
function showMsgForm(gonghao){
	if(gonghao==null||gonghao==""){
		$.oimsError("用户工号未获取到！");
		return;
	}
	var tag = $("#msgInputDiv_"+gonghao);
	tag = $("<form />").attr("action",contextPath+SEND_MSG_URL).attr("name","msgSendForm").ajaxForm({
		type:"post",
		dataType:"json",
		beforeSubmit:function(){
			var input = dotrim(tag.find("input[name=content]").val());
			var file = dotrim(tag.find("input[name=file]").val());
			if(!input.length && !file.length){
				$.oimsError("不能发送空信息！");
				return false;
			}
		},
		success:function(data, i,s){
			tag.clearForm();
			tag.find("input[name=file]").replaceWith($("<input />").attr("name","file").attr("type","file"));
			tag.find("input[name=receiver]").val(gonghao);
			tag.find(".msgInput").text("");
			showTodayMsgList(gonghao,1);
		},
		error:function(){
			$.oimsError("发送失败！");
		}
	}).appendTo(tag);
	$("<input />").attr("name","receiver").attr("type","hidden").val(gonghao).appendTo(tag);
	var inputTag = $("<input />").attr("name","content").attr("type","hidden").appendTo(tag);
	$("<div contenteditable=\"true\" hidefocus=\"true\" />").blur(function(){
		inputTag.val($(this).html());
	}).addClass("msgInput").appendTo(tag);
	$("<input />").attr("name","file").attr("type","file").appendTo(tag);
	$("<input />").attr("type","submit").attr("name","msgSubmit").addClass("submitMSG").attr("value","发送").appendTo(tag);
	var count = 1;
	$("<input />").attr("type","button").attr("id","hideAll").addClass("submitMSG").attr("style","margin-left:300px").attr("value","只显示文件").click(function(){
		if(count % 2 ==0 ){
			$("#hideAll").attr("value","只显示文件");	
			$(".msgContent").parent().show();
		}else{
			$("#hideAll").attr("value","显示全部");
			$(".msgContent").parent().hide();
		}
		count ++;
	}).appendTo(tag);	
}