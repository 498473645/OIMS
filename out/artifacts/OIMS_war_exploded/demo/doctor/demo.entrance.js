(function(){
	var _emr_screen_width = window.screen.width;
	if(_emr_screen_width==1024){
		importCSS('/demo/doctor/css/emr_1024.css');
	}else if(_emr_screen_width==1280){
		importCSS('/demo/doctor/css/emr_1366.css');
		importCSS('/demo/doctor/css/emr.css');
	}else if(_emr_screen_width==1366){
		importCSS('/demo/doctor/css/emr_1366.css');
		importCSS('/demo/doctor/css/emr.css');
	}
})();