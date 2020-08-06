/**实时推送消息*/
var pushletServer = 'http://127.0.0.1:8080/EMR/pushlet.htm';

var comet = {
	connection : false,
	iframediv : false,
	initialize: function() {
		if (navigator.appVersion.indexOf("MSIE") != -1) {
			comet.connection = new ActiveXObject("htmlfile");
			comet.connection.open();
			comet.connection.write("<html>");
			comet.connection.write("<script>document.domain = '"+document.domain+"'");
			comet.connection.write("</html>");
			comet.connection.close();
			comet.iframediv = comet.connection.createElement("div");
			comet.connection.body.appendChild(comet.iframediv);
			comet.connection.parentWindow.comet = comet;
			comet.iframediv.innerHTML = "<iframe id='comet_iframe' src='"+pushletServer+"'></iframe>";

		} else if (navigator.appVersion.indexOf("KHTML") != -1) {
			comet.connection = document.createElement('iframe');
			comet.connection.setAttribute('id','comet_iframe');
			comet.connection.setAttribute('src',pushletServer);
			with (comet.connection.style) {
				position   = "absolute";
				left       = top   = "-100px";
				height     = width = "1px";
				visibility = "hidden";
			}
		    document.body.appendChild(comet.connection);
		} else {
			comet.connection = document.createElement('iframe');
			comet.connection.setAttribute('id','comet_iframe');
			with (comet.connection.style) {
			    left       = top   = "-100px";
			    height     = width = "1px";
			    visibility = "hidden";
			    display    = 'none';
			}
			comet.iframediv = document.createElement('iframe');
			comet.iframediv.setAttribute('src', pushletServer);
			comet.connection.appendChild(comet.iframediv);
			document.body.appendChild(comet.connection);
		}
	},

	//新增分诊患者
	addPatient:function(data){
		if($('#quantityInfoDiv').length>0){
			_emr_initQuantityInfo('.title');
		}
		if($('#emr_patientlist_searchbtn').length>0){
			$('#emr_patientlist_searchbtn').click();
		}
	},
	//退出
	onUnload: function() {
		if (comet.connection) {
			comet.connection = false;
		}
	}
};//comet end

comet.initialize();

if (window.addEventListener) {
	window.addEventListener("unload", comet.onUnload, false);
} else if (window.attachEvent) {
	window.attachEvent("onunload", comet.onUnload);
}
