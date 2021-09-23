function look(blh){
	var value="";
	if(blh!=null && blh!=''){
		value=blh;
	}
	window.open(contextPath+"/picbrowser/index.jsp?blh="+value,'','channelmode=yes,resizable=1');
	loadWelcomePage();
}