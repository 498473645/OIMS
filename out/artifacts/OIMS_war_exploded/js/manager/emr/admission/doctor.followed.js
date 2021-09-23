function _emr_followed_obj(){
	var panel = $(getHtmlContent('followed')).appendTo('#tabpanel');
	var followed = {
			resize:resize,
			panel:$(panel),
			clear:clear
		};
	var saveFollowedUpUrl = '/publish/emr/saveFollowedUp.htm';
	var findFollowedUpByVisitId='/publish/emr/findFollowdUpByVisitId.htm';
	resize();
	addExistFollowed();
	bindGlobalEvent();
	
	function resize(){
		$("#followed_up_time").datepicker({dateFormat:'yy-mm-dd',onClose:function(dateText,inst){
			var oldText = $.data($("#followed_up_time"),'oldText');
			if(!oldText){
				$.data($("#followed_up_time"),'oldText','');
			}
			var text = $.trim($("#followed_up_time").val());
			if(text&&text!=oldText){
				getJSONData(saveFollowedUpUrl,{visitId:getCurrentPatient().visit[0].id,followed_time:text,content:$.trim($('#followed_up_info').val()),tag:Math.random()},'POST');
				$.data(this,'oldText',text);
			}
				$("#followed_up_time").val(text);
		
			
		
		}});
	}
	
	function addExistFollowed(){
		var data=getJSONData(findFollowedUpByVisitId,{visitId:getCurrentPatient().visit[0].id,tag:Math.random()},'POST');
		if(!data.obj){
			$('#followed_up_time').data('oldText','');
			$('#followed_up_info').data('oldText','');
		}
		else{
		$('#followed_up_time').val(data.obj.followed_time+"进行复诊").data('oldText',data.obj.followed_time);
		$('#followed_up_info').val(data.obj.content).data('oldText',data.obj.content);
		}
	}
	
	
	function bindGlobalEvent(){
		$('#followed_up_info').unbind('blur').bind('blur',function(){

			var oldText = $.data(this,'oldText');
			if(!oldText){
				$.data(this,'oldText','');
			}
			var text = $.trim($(this).val());
			if(text&&text!=oldText){
				getJSONData(saveFollowedUpUrl,{visitId:getCurrentPatient().visit[0].id,content:text,followed_time:$('#followed_up_time').data('oldText'),tag:Math.random()},'POST');
				$.data(this,'oldText',text);
			}
		
		});
	}
	function clear(){
		
	}
	return followed;
}