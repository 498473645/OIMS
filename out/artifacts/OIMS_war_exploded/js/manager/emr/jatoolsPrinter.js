/**
 * 
 * 打印控件
 * 需要打印的内容必须要将id设置为page1、page2...
 * 
 */
/**demo*/
function doPrint_(how) {
//	if(!jatoolsPrinter||!jatoolsPrinter.print){
//		var c = confirm('未安装打印控件，是否进行安装？');
//		if(c){
//			window.location = '../plugin/setup.exe';
//		}
//		return;
//	}
	//打印文档对象
	var myDoc = {
		settings:{
			paperName:'B5 (JIS)',//选择打印纸张
			orientation:1,// 选择横向打印,1为纵向，2为横向
			topMargin:10,
            leftMargin:10,
            bottomMargin:10,
            rightMargin:10,   // 设置上下左距页边距为10毫米，注意，单位是 1/10毫米
		},
		documents : document, // 设置打印文档对象，未设置，默认为当前文档对象.如果打印iframe中的页面，只需传入该iframe窗口的document
		copyrights : '杰创软件拥有版权  www.jatools.com' // 版权声明必须
	};
	// 调用打印方法
	if (how == '打印预览...')
		jatoolsPrinter.printPreview(myDoc); // 打印预览

	else if (how == '打印...')
		jatoolsPrinter.print(myDoc, true); // 打印前弹出打印设置对话框

	else
		jatoolsPrinter.print(myDoc, false); // 不弹出对话框打印
}

/**
 * 验证打印控件是否安装成功。控件默认采用在线安装的方式，即cab文件
 * 如果采用cab方式安装失败，使用离线安装方式
 */
function validPrinter(){
	if(!jatoolsPrinter.object){
		var select = confirm('未安装打印控件，是否下载安装？');
		if(select){
			window.location = '../plugin/setup.exe';
		}
		return false;
	}
	return true;
}

/**
 * 打印
 * @param doc
 */
function doPrint(doc,paper){
	if(!validPrinter()) return false;
	var printDoc = {
		documents:doc||document,//设置打印文档
		settings:{
			paperName:paper||'A4',//选择打印纸张，未设置，默认A4
			orientation:1,// 选择横向打印,1为纵向，2为横向
			topMargin:40,
            leftMargin:50,
            bottomMargin:20,
            rightMargin:50
		},
		copyrights: '杰创软件拥有版权  www.jatools.com',
	};
	jatoolsPrinter.printPreview(printDoc); // 打印预览
}

function doPrintPreview(doc,paper,id) {
	if(!validPrinter()) return false;
	var printDoc = {
		documents:doc||document,//设置打印文档
		settings:{
			paperName:paper||'A4',//选择打印纸张，未设置，默认A4
			orientation:1,// 选择横向打印,1为纵向，2为横向
			topMargin:40,
            leftMargin:50,
            bottomMargin:20,
            rightMargin:50
		},
		copyrights: '杰创软件拥有版权  www.jatools.com',
	};
	jatoolsPrinter.printPreview(printDoc); // 打印预览
}