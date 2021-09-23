var _emr_checkorderviewshow = false;
function _emr_showCheckOrder(obj){
	if($('#checkorderview').length==0){
		$.ajax({
			url:'../demo/doctor/html/checkorder.html',
			type:'POST',
			success:function(data){
				var right = $('body').width()-$(obj)[0].getBoundingClientRect().left;
				var top = $(obj)[0].getBoundingClientRect().top;
				var div = $(data).css({right:right,top:top,height:$('#case').height()}).appendTo('body');
				_emr__emr_showCheckOrder_(obj);
				_emr_initCheckOrderView();
			}
		});
	}else{
		if(_emr_checkorderviewshow){
			_emr__emr_hideCheckOrder_();
		}else{
			_emr__emr_showCheckOrder_();
		}
	}
}

function _emr__emr_showCheckOrder_(obj){
	if(!_emr_checkorderviewshow){
		$('#checkorderview').show();
		$('#checkorderview').animate({width:400}, "fast");
		_emr_checkorderviewshow = true;
	}
}
function _emr__emr_hideCheckOrder_(){
	if(_emr_checkorderviewshow){
		$('#checkorderview').animate({width:0}, "fast",function(){
			$('#checkorderview').hide();
		});
		_emr_checkorderviewshow = false;
	}
}
//$(window).resize(function(){
//	var right = $(window).width()-$('#showcheckorder')[0].getBoundingClientRect().left+24;
//	var top = $('#showcheckorder')[0].getBoundingClientRect().top;
//	$('#checkorderview').css({right:right,top:top,height:$('#case').height()});
//});