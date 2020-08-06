$(document).ready(function(){
	inquiry_input_text = $('#inquiry_input_text').val();
	var width = $('#inquiry_input_div').parent().width();
	$('#inquiry_input_text').bind('keyup',function(e){
		if(e.keyCode==8){
			$('#inquiry_input_div').width($('#inquiry_input_text')[0].scrollWidth);
		}else if(e.keyCode==13){
			
		}else{
			if(inquiry_input_text!=$('#inquiry_input_text').val()){
				if(width>=$('#inquiry_input_text')[0].scrollWidth)
					$('#inquiry_input_div').width($('#inquiry_input_text')[0].scrollWidth+18);
			}
		}
		inquiry_input_text = $('#inquiry_input_text').val();
		if(!inquiry_input_text){
			$('#inquiry_input_div').width(25);
		}
	});
	$('#inquiry').click(function(){
		if(!$('#inquiry_input_text').val())
			$('#inquiry_input_text').focus();
		return;
		var text = $('#inquiry_input_text').val();
		setCaretPosition($('#inquiry_input_text')[0],text.length);
		function setCaretPosition(ctrl, pos){
			if(ctrl.setSelectionRange)
			{
				ctrl.focus();
				ctrl.setSelectionRange(pos,pos);
			}
			else if (ctrl.createTextRange) {
				var range = ctrl.createTextRange();
				range.collapse(true);
				range.moveEnd('character', pos);
				range.moveStart('character', pos);
				range.select();
			}
		}
	});
	_emr_templet_resize();
});

$(window).resize(function(){
	_emr_templet_resize();
});

function _emr_templet_addinput(){
	
}

/**
 * 改变病历模板定义页面尺寸
 */
function _emr_templet_resize(){
	var height = $(window).height()-$('.header').height()-$('.footer').height()-$('.title').height()-2;
	$('#main').height(height);
}
