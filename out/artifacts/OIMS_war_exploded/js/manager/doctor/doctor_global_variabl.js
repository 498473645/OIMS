var hasTree = false;

var debug = false;  //是否处于debug模式

//本篇语言
var doctorLanguage = { study : 7};

//页面结构变量
var dws = {
				patientTag : null,
				mcListTag : null,
				mcTag : null,
				displayTag : null
		  };

var dzhz;   //待诊患者
var fzhz;   //复诊患者
var ghhz;   //过号患者
var wchz;   //完成患者

var display_mode = 'block';  //默认显示模式

var global_state = "";       //页面当前显示页签的患者就诊状态

var search_bl = false;       //是否是通过查询按钮触发的查询

var flash_swfobject_flag = 0;

var huanzheguanli_tiaozhuan_flag = 0;  //判断是否是从其他模块跳转到医生工作站  1：其他模块跳转  2：本模块正常操作

//打印调试信息方法   宋仁非
function cs(data)
{
	//console.log(data);
}

/*初始化图片查看控件---start*/

hs="";

importJS("/oimsslide/oimsslide.js");
importCSS("/oimsslide/oimsslide.css");

hs.addSlideshow({});

/*初始化图片查看控件---end*/


var work_song_width = 0;  //接诊界面主窗口宽度
var work_song_height = 0; //接诊界面主窗口高度

var jibing_leibie_data ;  //疾病类别完整信息

var duibi_timeout_handle ;  //对比窗口判断是否出现滚动条动态调整表头宽度setTimeout 句柄；

var DianZiShuRu_P = 0; //病历输入页面输入区域高度

var CurrentInput ;   //当前双击打开模板输入的病历记录form

var yaopin_name_list_cache = {};  //保存从后台动态传回的药品名称列表缓存

var printBingLiMoBanHead = "<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='zh-CN' ><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'/><head>	<title></title>	<script type='text/javascript' >		function loadAfter()		{";


var printBingLiMoBanAfter = "document.getElementById('menzhenID').innerHTML=menzhenID;			document.getElementById('binglihao').innerHTML=binglihao;			document.getElementById('name').innerHTML=name;			document.getElementById('sex').innerHTML=sex;			document.getElementById('jiuzhentime').innerHTML=jiuzhentime;			document.getElementById('age').innerHTML=age;			document.getElementById('phone').innerHTML=phone;			document.getElementById('address').innerHTML=address;			document.getElementById('zhushu').innerHTML=zhushu;			document.getElementById('xianbingshi').innerHTML=xianbingshi;			document.getElementById('jiazushi').innerHTML=jiazushi;			document.getElementById('jiwangshi').innerHTML=jiwangshi;			document.getElementById('yanjian').innerHTML=yanjian;			document.getElementById('jiemo').innerHTML=jiemo;			document.getElementById('gongmo').innerHTML=gongmo;			document.getElementById('yanwaiji').innerHTML=yanwaiji;			document.getElementById('jiaomo').innerHTML=jiaomo;			document.getElementById('qianfang').innerHTML=qianfang;			document.getElementById('hongmo').innerHTML=hongmo;			document.getElementById('tongkong').innerHTML=tongkong;			document.getElementById('jingzhuangti').innerHTML=jingzhuangti;			document.getElementById('boliti').innerHTML=boliti;			document.getElementById('shipan').innerHTML=shipan;			document.getElementById('huangban').innerHTML=huangban;			document.getElementById('xueguan').innerHTML=xueguan;			document.getElementById('shiwangmo').innerHTML=shiwangmo;			document.getElementById('chufang').innerHTML=chufang;			document.getElementById('zhenduan').innerHTML=zhenduan;								}				function printMe()		{			document.body.innerHTML=document.getElementById('bodydiv').innerHTML;			window.print();		}			</script></head><body onload='loadAfter();'  style=' overflow:auto;' ><div id='print1'  style=' margin: 0px auto;width: 640px;padding-top: 5px;' >	<div style='float:right;' >		<input type='button' value='打印' onClick='printMe();' >	</div></div><div id='bodydiv' style='background: rgb(255,255,255); color: rgb(79,79,79); padding-bottom: 10px; padding-top: 10px; padding-left: 10px; margin: 0px auto; padding-right: 10px; width: 640px;'>	<div style='margin: 0px auto; width: 640px;' >            	<div>				<h1 style='text-align: center;'>					<span style='font-size:28px;'>				<strong>天津眼科医院门诊病历</strong>			</span>		</h1>					<p style='text-align: right;'>			<span style='font-size:16px;'>				门诊号：			</span>			<span style='font-size:16px;' id = 'menzhenID'>							</span>		</p>	</div>	<div style='margin-left: 5px;margin-right: 5px;'>		<table border='1px' cellspacing='1px' cellpadding='1px' style='text-align: center; height:70px; width:630px; border-collapse:collapse; font-size: 12px;' >			<tr>				<td style='width:10%;'>病历号：</td>				<td style='width:15%;' id = 'binglihao' ></td>								<td style='width:8%;'>姓名：</td>				<td style='width:15%;' id = 'name' ></td>								<td style='width:8%;'>性别：</td>				<td style='width:8%;' id = 'sex'></td>								<td style='width:12%;'>就诊时间：</td>				<td style='width:24%;' id = 'jiuzhentime' ></td>			</tr>			<tr>				<td >年龄：</td>				<td id = 'age' ></td>								<td >电话：</td>				<td id = 'phone' ></td>								<td >住址：</td>				<td colspan='3' id = 'address'></td>					</tr>		</table><table border='1px' cellpadding='1px' cellspacing='1px' style='text-align: center; height:550px; width:630px; border-collapse:collapse; font-size: 12px;'>        	<tr>            	<td style='width:25%' colspan='2'>主述</td><td style='width:75%; text-align:left; padding-left:10px;' id='zhushu' ></td></tr><tr>            	<td colspan='2'>现病史</td><td style='text-align:left; padding-left:10px;' id='xianbingshi' ></td></tr><tr>            	<td colspan='2'>家族史</td><td style='text-align:left;padding-left:10px;' id='jiazushi' ></td></tr><tr>            	<td colspan='2'>既往史</td><td style='text-align:left;padding-left:10px;' id='jiwangshi' ></td></tr><tr>            	<td rowspan='5'  style='width:10%; border-bottom:#FFF; ' ></td><td style='width:15%;' >眼睑</td><td style='text-align:left;padding-left:10px;' id='yanjian' ></td></tr><tr><td>结膜</td><td style='text-align:left;padding-left:10px;' id='jiemo' ></td></tr><tr><td>巩膜</td><td style='text-align:left;padding-left:10px;' id='gongmo' ></td></tr><tr><td>眼外肌</td><td style='text-align:left;padding-left:10px;' id='yanwaiji' ></td></tr><tr><td>角膜</td><td style='text-align:left;padding-left:10px;' id='jiaomo' ></td></tr><tr>            	<td style='border-bottom:#FFF;  border-top:#FFF; ' >体</td><td>前房</td><td style='text-align:left;padding-left:10px;' id='qianfang' ></td></tr><tr>            	<td style='border-bottom:#FFF;  border-top:#FFF; '>格</td><td>虹膜</td><td style='text-align:left;padding-left:10px;' id='hongmo' ></td></tr><tr>            	<td style='border-bottom:#FFF;  border-top:#FFF; '>检</td><td>瞳孔</td><td style='text-align:left;padding-left:10px;' id='tongkong' ></td></tr><tr>            	<td style='border-bottom:#FFF;  border-top:#FFF; '>查</td><td>晶状体</td><td style='text-align:left;padding-left:10px;' id='jingzhuangti' ></td></tr><tr>            	<td rowspan='5' style=' border-top:#FFF;'></td><td>玻璃体</td><td style='text-align:left;padding-left:10px;' id='boliti' ></td></tr><tr><td>视盘</td><td style='text-align:left;padding-left:10px;' id='shipan' ></td></tr><tr><td>黄斑</td><td style='text-align:left;padding-left:10px;' id='huangban' ></td></tr><tr><td>血管</td><td style='text-align:left;padding-left:10px;' id='xueguan' ></td></tr><tr><td>视网膜</td><td style='text-align:left;padding-left:10px;' id='shiwangmo' ></td></tr></table><table border='1px' cellpadding='1px' cellspacing='1px' style=' border-top: #FFF; text-align: center; height:150px; width:630px; border-collapse:collapse; font-size: 12px;'>        	<tr>            	<td style='width:10.15%;' >处方</td><td style='text-align:left;padding-left:10px;' id='chufang' ></td></tr><tr>            	<td>诊断</td><td style='text-align:left;padding-left:10px;' id='zhenduan' ></td></tr></table>	</div><div>    	<h4 style='text-align: left;'>					<span style='font-size:16px;'>				<strong>天津市眼科医院</strong>			</span>		</h4>	</div></div></div><div id='print2' style='margin: 0px auto;width: 640px;' >	<div style='float:right;' >		<input type='button' value='打印' onClick='printMe();' >	</div></div></body></html>";



