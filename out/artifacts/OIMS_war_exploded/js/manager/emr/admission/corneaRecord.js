
//角膜主程序
function view_jmyz(id,currentPatient){
	debugger;
	$("#medicalRecordTab30012").remove();
	var showHeight = getShowHeight_qg();
	//页面布局
	$(".medicalRecord").hide();
	var tag =  $("<div />").attr("id","medicalRecordTab"+id).addClass("medicalRecord").attr("style","height:"+showHeight+"px;").appendTo("body");
	var h = showHeight;
	tag.height(h);
	var qgblyl_width = $("#tabTitle").width();
   	var view = tbl_jmyz_add();
	$(view).appendTo(tag);
	$("<div class='btn'/>").attr("style","width:683px;height:20px;text-align:right;margin-top:0px;margin-left:44%;").html("" +
		"<input hidden name='inputId' id='inputId' type='text' value=''></input>&nbsp;&nbsp;&nbsp;&nbsp;" +
		"<a onclick='return true;' href='javascript:saveJmyz();'><span class='advsumit' ></span>保存</a>&nbsp;&nbsp;&nbsp;&nbsp;" +
		"<a onclick='return true;' href='javascript:resetJmyz();'><span class='advreset' ></span>重置</a>&nbsp;&nbsp;&nbsp;&nbsp;" +
		"<a onclick='return true;' href='javascript:print_jmyz();'><span class='print' ></span>打印</a>").appendTo(tag);

	tag.show();
 	$("#patientNo").text(currentPatient.binglihao!=undefined?currentPatient.binglihao:currentPatient.patientId);
	$("#name").text(currentPatient.xingming!=undefined?currentPatient.xingming:currentPatient.donatorName);
	$("#sex").text(currentPatient.sex!=undefined?currentPatient.sex:currentPatient.donatorSex);
	$("#age").text(currentPatient.age!=undefined?currentPatient.age:currentPatient.donatorAge);
	$("#visitDate").text(formatDate(new Date().getTime()));
	//构建记录者
	findRecorder();
	getJmyiInfo(currentPatient.binglihao!=undefined?currentPatient.binglihao:currentPatient.patientId);
	return tag;
}

function findRecorder(){
	var list=findQgYgList();
	$("#recorder").empty();
	console.log("==========findRecorder===========");
	$("<option />").appendTo("#recorder");
	$.each(list,function(i,n){
		$('<option value='+n.gonghao+'/>').text(n.xingming).appendTo($("#recorder"));
	});
}

function getJmyiInfo(patientNo) {
	var data = getJSONData("/publish/jiaomoyizhi/queryCorneaRecordByPatientNo.htm", {
		tag : Math.random(),
		patientNo: patientNo
	}, "post");
	if (data.list.length==0) {
		$.oimsAlert("该患者没有病历信息！");
		return;
	}
	$("#patientNo").text(data.list[0].patientNo);
	$("#recordNo").text(data.list[0].recordNo);
	$("#name").text(data.list[0].name);
	$("#sex").text(data.list[0].sex == 1 ? '男' : '女');//1 男,2 女
	$("#age").text(data.list[0].age);
	$("#visitDate").text(time(data.list[0].visitDate).format_yyyy_mm_dd);
	$("#complaintR").val(data.list[0].complaintR);//主述右眼
	$("#complaintL").val(data.list[0].complaintL);//主述左眼
	$("#visionR").val(data.list[0].visionR);//右眼视力
	$("#visionL").val(data.list[0].visionR);//左眼视力
	$("#conjunctivaR").val(data.list[0].conjunctivaR);//右眼结膜
	$("#conjunctivaL").val(data.list[0].conjunctivaL);//左眼结膜
	$("#corneaR").val(data.list[0].corneaR);//右眼角膜
	$("#corneaL").val(data.list[0].corneaL);//左眼角膜
	$("#anteriorChamberR").val(data.list[0].anteriorChamberR);//右眼前房
	$("#anteriorChamberL").val(data.list[0].anteriorChamberL);//左眼前房
	$("#pupilR").val(data.list[0].pupilR);//右眼瞳孔
	$("#pupilL").val(data.list[0].pupilL);//左眼瞳孔
	$("#crystalR").val(data.list[0].crystalR);//右眼晶体
	$("#crystalL").val(data.list[0].crystalL);//左眼晶体
	$("#eyeGroundR").val(data.list[0].eyeGroundR);//右眼眼底
	$("#eyeGroundL").val(data.list[0].eyeGroundL);//左眼眼底
	$("#iopR").val(data.list[0].iopR);//右眼眼压
	$("#iopL").val(data.list[0].iopL);//左眼眼压
	$("#remark").val(data.list[0].remark);//备注
	$("#recorder").val(data.list[0].updateUser != null ? data.list[0].updateUser : data.list[0].insertUser);
	$("#inputId").val(data.list[0].id);
}

function saveJmyz() {
	debugger;
    var inputId = $("#inputId").val();
	var patientNo = $("#patientNo").text();
	var name = $("#name").text();
	var sex = $("#sex").text() == '男'?1:2;//1 男,2 女
	var age = $("#age").text();
	var visitDate = $("#visitDate").text();
	var yb = $("input[name='yanbie']:checked").val();
	var yanbie_r =null;
	var yanbie_l =null;
	if (yb == 0) {
		yanbie_r = "0";
	} else {
		yanbie_l = "1";
	}
	var complaintR = $("#complaintR").val();//主述右眼
	var complaintL = $("#complaintL").val();//主述左眼
	var visionR = $("#visionR").val();//右眼视力
	var visionL = $("#visionL").val();//左眼视力
	var conjunctivaR = $("#conjunctivaR").val();//右眼结膜
	var conjunctivaL = $("#conjunctivaL").val();//左眼结膜
	var corneaR = $("#corneaR").val();//右眼角膜
	var corneaL = $("#corneaL").val();//左眼角膜
	var anteriorChamberR = $("#anteriorChamberR").val();//右眼前房
	var anteriorChamberL = $("#anteriorChamberL").val();//左眼前房
	var pupilR = $("#pupilR").val();//右眼瞳孔
	var pupilL = $("#pupilL").val();//左眼瞳孔
	var crystalR = $("#crystalR").val();//右眼晶体
	var crystalL = $("#crystalL").val();//左眼晶体
	var eyeGroundR = $("#eyeGroundR").val();//右眼眼底
	var eyeGroundL = $("#eyeGroundL").val();//左眼眼底
	var iopR = $("#iopR").val();//右眼眼压
	var iopL = $("#iopL").val();//左眼眼压
	var remark = $("#remark").val();//备注
	var recorder = $("#recorder").val();
	if (yanbie_r = null) {
		complaintR =null;
		visionR = null;
		conjunctivaR = null;
		corneaR =null;
		anteriorChamberR =null;
		pupilR =null;
		crystalR =null;
		eyeGroundR =null;
		iopR =null;
	}
	if (yanbie_l =null) {
		complaintL =null;
		visionL =null;
		conjunctivaL =null;
		corneaL =null;
		anteriorChamberL =null;
		pupilL =null;
		crystalL =null;
		eyeGroundL =null;
		iopL =null;
	}
	var re = getJSONData("/publish/jiaomoyizhi/saveCorneaRecord.htm", {
		patientNo : patientNo,
		name : name,
		sex : sex,
		age : age,
		visitDate : visitDate,
		complaintR : complaintR,
		complaintL : complaintL,
		visionR : visionR,
		visionL : visionL,
		conjunctivaR : conjunctivaR,
		conjunctivaL : conjunctivaL,
		corneaR : corneaR,
		corneaL : corneaL,
		anteriorChamberR : anteriorChamberR,
		anteriorChamberL : anteriorChamberL,
		pupilR : pupilR,
		pupilL : pupilL,
		crystalR : crystalR,
		crystalL : crystalL,
		eyeGroundR : eyeGroundR,
		eyeGroundL : eyeGroundL,
		iopR : iopR,
		iopL : iopL,
		remark : remark,
		insertUser : recorder,
		updateUser : recorder,
		id : inputId,
		tag : Math.random()
	}, "post");
	var msg ;
	if(re.state){
		msg="保存成功！";
	}else{
		msg="很抱歉，保存失败！";
	}
	$.oimsAlert(msg);
}

function resetJmyz() {
	$("#visitDate").val("");
	$("#complaintR").val("");//主述右眼
	$("#complaintL").val("");//主述左眼
	$("#visionR").val("");//右眼视力
	$("#visionL").val("");//左眼视力
	$("#conjunctivaR").val("");//右眼结膜
	$("#conjunctivaL").val("");//左眼结膜
	$("#corneaR").val("");//右眼角膜
	$("#corneaL").val("");//左眼角膜
	$("#anteriorChamberR").val("");//右眼前房
	$("#anteriorChamberL").val("");//左眼前房
	$("#pupilR").val("");//右眼瞳孔
	$("#pupilL").val("");//左眼瞳孔
	$("#crystalR").val("");//右眼晶体
	$("#crystalL").val("");//左眼晶体
	$("#eyeGroundR").val("");//右眼眼底
	$("#eyeGroundL").val("");//左眼眼底
	$("#iopR").val("");//右眼眼压
	$("#iopL").val("");//左眼眼压
	$("#remark").val("");//备注
	$("#recorder").val("");
}

function print_jmyz() {
	window.print();//打印刚才新建的网页
}

//屈光员工
function findQgYgList(){
	var data = getJSONData('/publish/quguang/findYuanGongList.htm',{},'POST');
	if(data!=null){
		return data.obj;
	}else{
		return null;
	}
}

function tbl_jmyz_add(){
	var tab_add = "<div id='ssjl_show_div' style='padding-bottom: 10px; margin: 0px auto; padding-left: 10px; width: 683px; padding-right: 10px; background: rgb(255,255,255); color: rgb(79,79,79); padding-top: 10px'>" +
		"<h1 style='text-align: center; line-height: 30px; height: 30px; font-size: 19px;margin-top: 10px;margin-bottom: 10px'>陆军军医大学西南医院</h1>"+
		"<h1 style='text-align: center; line-height: 30px; height: 30px; font-size: 25px'>角膜移植病历</h1>"+
		"<div style='width:683px;margin-top: 15px; font-size: 12px;'>"+
		"<table border='0' cellpadding='0' cellspacing='0' width='100%' style='font-size:12px;text-align:center;'>"+
		"<tbody>"+
		"<tr>"+
		"<th nowrap='nowrap' width='10%'>ID号：</th>"+
		"<td width='15%'>"+
		"<label id='patientNo'></label></td>"+
		"<th height='30' nowrap='nowrap' width='10%''>"+
		"病历编号：</th>"+
		"<td width='15%'>"+
		"<label id='recordNo'></label></td>"+
		"</tr>"+
		"</tbody>"+
		"</table>"+
		"</div>" +
		"<div style='width:683px;padding-top:10px;'>" +
		"<table id='ssjlAdd' cellpadding='0' cellspacing='0' width='100%' style='border-top:1px solid rgb(51,51,51);border-left:1px solid rgb(51,51,51);'>" +
		"<tr>" +
		"<td nowrap='nowrap' class='td_border' style='text-align:center;'>姓名</td>" +
		"<td nowrap='nowrap' align='center' style='width:12%' class='td_border'><label id='name'></label></td>" +
		"<td nowrap='nowrap' class='td_border' style='text-align:center;'>性别</td>" +
		"<td nowrap='nowrap' align='center' style='width:12%' class='td_border'><label id='sex'></label></td>" +
		"<td nowrap='nowrap' class='td_border' style='text-align:center;'>年龄</td>" +
		"<td nowrap='nowrap' align='center' style='width:12%' class='td_border'><label id='age'></label></td>" +
		"<td nowrap='nowrap' class='td_border' style='text-align:center;'>就诊日期</td>" +
		"<td nowrap='nowrap' align='center' style='width:12%' class='td_border'><label id='visitDate'></label></td>" +
		"</tr>" +
		"</table>"+
		"</div>" +
		"<div style='width:683px;'>" +
		"<table id='ssjlAdd' cellpadding='0' cellspacing='0' width='100%' style='border-top:1px solid rgb(51,51,51);border-left:1px solid rgb(51,51,51);'>" +
		"<tr>" +
		"<td width='10%' class='td_border' style='text-align:center;'>眼别</td>" +
		"<td align='center' width='45%' class='td_border'><input type='radio' value='0' name='yanbie' id='yanbie_r'>&nbsp;&nbsp;右眼</td>" +
		"<td align='center' width='45%' class='td_border'><input type='radio' value='1' name='yanbie' id='yanbie_l'>&nbsp;&nbsp;左眼</td>" +
		"</tr>" +
		"<tr>" +
		"<td align='center' class='td_border'>主述</td>" +
		"<td align='center' class='td_border' style='height:70px;'>" +
		"<textarea id='complaintR' class='textarea90' style='height:66px;border:0px;'></textarea>" +
		"</td>" +
		"<td align='center' class='td_border' style='height:70px;'>" +
		"<textarea id='complaintL' class='textarea90' style='height:66px;border:0px;'></textarea>" +
		"</td>" +
		"</tr>" +
		"<tr>" +
		"<td align='center' class='td_border'>视力</td>" +
		"<td align='center' class='td_border'><input type=\"text\" style=\"width:40px;border:0px;\" id=\"visionR\">&nbsp;&nbsp;远&nbsp;&nbsp;<input type=\"text\" style=\"width:40px;border:0px;\" id=\"visionR\">&nbsp;&nbsp;近</td>" +
		"<td align='center' class='td_border'><input type=\"text\" style=\"width:40px;border:0px;\" id=\"visionL\">&nbsp;&nbsp;远&nbsp;&nbsp;<input type=\"text\" style=\"width:40px;border:0px;\" id=\"visionL\">&nbsp;&nbsp;近</td>" +
		"</tr>" +
		"<tr>" +
		"<td align='center' class='td_border'>结膜</td>" +
		"<td align='center' class='td_border'><input type='text' class='input80'  id='conjunctivaR' name='conjunctivaR'  style='border:0px;'/></td>" +
		"<td align='center' class='td_border'><input type='text' class='input80'  id='conjunctivaL' name='conjunctivaL'  style='border:0px;'/></td>" +
		"</tr>" +
		"<tr>" +
		"<td align='center' class='td_border'>角膜</td>" +
		"<td align='center' class='td_border'><input type='text' class='input80' id='corneaR' name='corneaR' value='' style='border:0px;'/></td>" +
		"<td align='center' class='td_border'><input type='text' class='input80' id='corneaL' name='corneaL' value='' style='border:0px;'/></td>" +
		"</tr>" +
		"<tr>" +
		"<td align='center' class='td_border'>前房</td>" +
		"<td align='center' class='td_border'><input type='text' class='input80' id='anteriorChamberR' name='anteriorChamberR' value='' style='border:0px;'/></td>" +
		"<td align='center' class='td_border'><input type='text' class='input80' id='anteriorChamberL' name='anteriorChamberL' value='' style='border:0px;'/></td>" +
		"</tr>" +
		"<tr>" +
		"<td align='center' class='td_border'>瞳孔</td>" +
		"<td align='center' class='td_border'><input type='text' class='input80' id='pupilR' name='pupilR' value='' style='border:0px;'/></td>" +
		"<td align='center' class='td_border'><input type='text' class='input80' id='pupilL' name='pupilL' value='' style='border:0px;'/></td>" +
		"</tr>" +
		"<tr>" +
		"<td align='center' class='td_border'>晶体</td>" +
		"<td align='center' class='td_border'><input type='text' class='input80' id='crystalR' name='crystalR' value='' style='border:0px;'/></td>" +
		"<td align='center' class='td_border'><input type='text' class='input80' id='crystalL' name='crystalL' value='' style='border:0px;'/></td>" +
		"</tr>" +
		"<tr>" +
		"<td align='center' class='td_border'>眼底</td>" +
		"<td align='center' class='td_border'><input type='text' class='input80' id='eyeGroundR' name='eyeGroundR' value='' style='border:0px;'/></td>" +
		"<td align='center' class='td_border'><input type='text' class='input80' id='eyeGroundL' name='eyeGroundL' value='' style='border:0px;'/></td>" +
		"</tr>" +
		"<tr>" +
		"<td align='center' class='td_border'>眼压</td>" +
		"<td align='center' class='td_border'><input type='text' class='input80' id='iopR' name='iopR' value='' style='border:0px;'/>mmHg</td>" +
		"<td align='center' class='td_border'><input type='text' class='input80' id='iopL' name='iopL' value='' style='border:0px;'/>mmHg</td>" +
		"</tr>" +
		"<tr>" +
		"<td align='center' class='td_border'>检查结果</td>" +
		"<td align='center' class='td_border'><input type='text' class='input80' id='mbqz_r' name='ss_r' style='border:0px;'/></td>" +
		"<td align='center' class='td_border'><input type='text' class='input80' id='mbqz_l' name='ss_l' style='border:0px;'/></td>" +
		"</tr>" +
		"<tr>" +
		"<td align='center' class='td_border'>备注</td>" +
		"<td colspan='2' class='td_border'><textarea id='remark' name='remark' style='border:0px;width:98%;height:96%;'></textarea></td>" +
		"</tr>" +
		"<tr>" +
		"<td align='center' class='td_border'>录入人</td>" +
		"<td colspan='2' class='td_border'><select id='recorder'/></td>" +
		"</tr>" +
		"</table>" +
		"</div>" +
		"</div>";
	return tab_add;
}

