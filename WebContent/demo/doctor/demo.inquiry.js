function changeInquiryWinSize(){
	var height = $('#inquiry').height()-1;
	$('.inquiry').height($('#inquiry').height()-1);
	$('.inquiry').children().each(function(){
		$(this).height(height/5);
		$(this).find('textarea').height(height/5-$(this).find('h3').outerHeight());
	});
}