﻿var data_9387476582 = [
                       		{"ID":"1","name":"眼底病变眼底眼压充血","ICD":"111"},
                       		{"ID":"2","name":"眼底病变眼","ICD":"222"}
                      ];


var getZhenDuanListUrl = "/publish/doctor/getZhenDuanListUrl.htm";

var delZhenDuanUrl = "/publish/doctor/delZhenDuanUrl.htm";
var matchJiBingNameUrl = "/publish/doctor/matchJiBingNameUrl.htm";
var saveZhenDuanUrl = "/publish/doctor/saveZhenDuanUrl.htm";
var getJiBingIntrListUrl = "/publish/doctor/getJiBingIntrListUrl.htm";

importJS("/js/manager/doctor/autoComplete.js");

var autoComplete;

var zhen_duan_jiu_zhen_id = null;

/**
 * 宋仁非
 * 只读就诊页面
 */

function loadReadOnlyHtml(div,md,id)
{
	 $("<div />").attr("class","diagnoselist").append($("<ul />")).appendTo(div);
	 
	//获取该患者本次就诊已添加的诊断信息
	var data1 =  getJSONData(getZhenDuanListUrl, {jzid : md.id,tag : Math.random()}).obj;
	
	var data2 = new Array();
	
    for(var i = 0 ; i<data1.length;i++)
    {
    	data2.push({"name":$.trim(data1[i].zdflname),"zdflid":data1[i].zdflid,"jzid":data1[i].jzid,"confirmed":data1[i].confirmed});
    	
    }	
	
	    
	//将该患者本次就诊已添加的诊断信息显示到页面上
    var show_ul = $(".diagnoselist ul");
    
    for(var i = 0,length = data2.length;i < length ;i++)
    {
    	if(data1[i].confirmed == "1")
    	{
    		$("<li />").append("<span />")
    		           .append(data2[i].name)
    		           .appendTo(show_ul);
    	}
    	else
    	{
    		$("<li />").append($("<span />").attr("class","question"))
    		           .append(data2[i].name)
    		           .appendTo(show_ul);
    	}	
       
    }
	
}

/*
 *王学良
 *加载初始化页面 
 *宋仁非 修改 2012-11-20
 */
function loadHtml(div,md,id)
{	
	
    $("<div />").attr("class","diagnoselist").append($("<ul />")).appendTo(div);
    
    var single_div = $("<div />").attr("class","single").appendTo(div);
    $("<input />").attr({"type":"radio","checked":"true","name":"radio","id":"radio","class":"radio","value":"1"})
                  .appendTo(single_div);
    $("<label />").attr({"for":"radio"}).append(language_doctor.YiQueZhen).appendTo(single_div);//"已确诊"
    single_div.append("&nbsp;&nbsp;");
    $("<input />").attr({"type":"radio","name":"radio","id":"radio1","class":"radio","value":"0"})
    			  .appendTo(single_div);
    $("<label />").attr({"for":"radio1"}).append(language_doctor.WeiQueZhen).appendTo(single_div);//"未确诊"
    
    var input_div = $("<div />").appendTo(div);
    $("<input />").attr({"type":"text","name":"textarea","onblur":"this.className='blur'",
    	                 "onfocus":"this.className='focus'","class":"blur","id":"textarea",
    	                 "style":"width:99.5%;font-size:12px","onkeyup":"autoComplete.start(event)"})
    	          .appendTo(input_div);
    
    $("<div />").attr({"class":"auto_hidden","id":"auto"}).appendTo(div);
    
    var btn_div = $("<div />").attr({"class":"openbutton","style":"background:none;"}).appendTo(div);//"提交"
    $("<a />").attr({"onclick":"addDiagnose()"}).append($("<span>").attr("class","advsumit")).append(language.Submit).appendTo(btn_div);
    //$("<a />").attr({"onclick":"resetDiagnose()"}).append($("<span>").attr("class","advreset")).append("重置").appendTo(btn_div);
    
    $("<div />").attr({"class":"auto_hidden","id":"auto"}).appendTo(div);
    
    zhen_duan_jiu_zhen_id=md.id;
    
     
    
    //获取该患者本次就诊已添加的诊断信息
    var data1 =  getJSONData(getZhenDuanListUrl, {jzid : md.id,tag : Math.random()}).obj;
    
    /*
    
    //获取疾病类别完整信息
    var jbdata = getJSONData(getJiBingListUrl, {jblb : oimsCategory.ILL_CATEGORY,tag : Math.random()}).obj;
    
    */
    
    var jbdata = jibing_leibie_data;
    
    //cs("该患者本次就诊已添加的诊断信息");
    //cs(data1);
    
    //cs("疾病类别完整信息");
    //cs(jbdata);
    
    var data2 = new Array();
    for(var i = 0 ; i<data1.length;i++)
    {
    	data2.push({"name":$.trim(data1[i].zdflname),"zdflid":data1[i].zdflid,"jzid":data1[i].jzid,"confirmed":data1[i].confirmed});
    }	
    
    //cs("data2");
    //cs(data2);
    
    //将该患者本次就诊已添加的诊断信息显示到页面上
    readData(data2);
    
    var autoData = [];
    var intrData = [];
    for(var i = 0;i<jbdata.length;i++)
    {
    	if(jbdata[i].intr==null||jbdata[i].intr=="")
    	{
    		continue;
    	}	
    	if(jbdata[i].intr.length>5)
    	{
    		continue;
    	}	
    	autoData.push($.trim(jbdata[i].category));
    	
    	intrData.push(jbdata[i].intr+"##"+$.trim(jbdata[i].category));
    	
    }	
    
    //cs("intrdata");
    //console.log(intrData);
    //console.log(autoData);
    
    autoComplete=new AutoComplete('textarea','auto',autoData,intrData);
}


/*
 *王学良
 *读取该患者本次就诊已添加的诊断信息，显示在页面上 
 *宋仁非 修改 2012-11-20
 */
function readData(str)
{
	var show_ul = $(".diagnoselist ul");
    
    for(var i = 0,length = str.length;i < length ;i++)
    {
    	
    	var li = "";
    	if(str[i].confirmed == "1")
    	{
    		 li = $("<li />").append("<span />")
    		                 .append(str[i].name)
    		                 .appendTo(show_ul);
    	}
    	else   
    	{
    		li = $("<li />").append($("<span />").attr("class","question"))
    		                .append(str[i].name)
    		                .appendTo(show_ul);
    	}	
      
       $("<span />").attr({"class":"notedel","id":str[i].zdflid,"name":str[i].jzid}).appendTo(li);
       
       bindDiagnoseFun(str[i].zdflid);
    }
    
}

//在诊断信息上绑定删除事件  
function bindDiagnoseFun(id)
{
    $(".diagnoselist ul li")
    .bind("mouseover",function (){
    	
        $(this).children(".notedel").css("display","");
        
    })
    .bind("mouseout",function (){
    	
        $(this).children(".notedel").css("display","none");
        
    });
    
    $("#"+id).bind("click",function (){
    	
        $(this).parent().remove();
        
        cs("zdflid");
        cs($(this).attr("id"));
        cs("jzid");
        cs($(this).attr("name"));
        
        //删除一条诊断信息
        var bl =  getJSONData(delZhenDuanUrl,{zdflid : $(this).attr("id"),
        	                                    jzid : $(this).attr("name"),
        	                                     tag : Math.random()}).obj;
        
        if(bl)
        {
        	$.oimsSucc(language.DelOK_Alert+"！",null);//删除成功
        }	
        
    });
}
/*
 *王学良
 *添加和修改诊断信息
 */
function addDiagnose(){
    var radioList = $("[name='radio']:radio:checked");
    
    cs("radioList");
    cs(radioList);
    
    var nameStr = "";
    
    if(radioList.length != 0)
    {
        nameStr = radioList;
    }
    else
    {
    	$.oimsAlert(language_doctor.PlaceChoseQueZhen+"！");//请选择是否确诊
        return false;
    }
    
    var decideDiagnose = "";
    var textareaStr = $.trim($("#textarea").val());
    var a = null;
    
    if(textareaStr==""||textareaStr==null)
    {
    	$("#textarea").val("");
    	return false;
    }
    else
    {
    	$("#textarea").val(textareaStr);
    }	
    
    //判断输入的是否是标准的病历分类
    var list =  getJSONData(matchJiBingNameUrl, {name:textareaStr,tag : Math.random()},"POST").obj;
    
    cs("list");
    cs(list);
    
    if(list.length==0)
    {
    	$.oimsError(language_doctor.PlaceInputBiaoZhun+"！",null);//请输入标准疾病分类名称
    	return false;
    }
    else
    {
    	a = list[0];
    }	
    
    var data = $(".diagnoselist ul li .notedel");
    
    cs("notedel");
    cs(data);
    
    //判断要新增的诊断是否已存在
    if(!isDiagnoseExist(data,a.id))
    {
        if(nameStr.attr("value") == 0)
        {
            decideDiagnose = "<li>" +
            		              "<span class=\"question\"></span>" +
            		               a.category + 
            		               "<span class=\"notedel\" " +
            		                       "id = '"+a.id+"' " +
            		                     "name = '"+zhen_duan_jiu_zhen_id+"' >" +
            		               "</span>" +
            				"</li>";
        }
        else
        {
            decideDiagnose = "<li>" +
            					  "<span ></span>" + 
            					  a.category + 
            					  "<span class=\"notedel\" " +
            					          "id = '"+a.id+"' " +
            					        "name = '"+zhen_duan_jiu_zhen_id+"' >" +
            					  "</span>" +
            			     "</li>";
        }
        
        $(".diagnoselist ul").append(decideDiagnose);
            
        //将新增的诊断信息保存到数据库
        var bl =  getJSONData(saveZhenDuanUrl, {jbfl:a.id,
        	                                    jzid:zhen_duan_jiu_zhen_id,
        	                                 confirm:nameStr.attr("value"),
        	                                    tag : Math.random()}).obj;    
        if(!bl)
        {
        	$.oimsError(language_doctor.BaoCunShiBai+"！",null);//保存失败
        }	

        //清空输入框
        $("#textarea").val("");
    }
    else
    {
    	$.oimsAlert(language_doctor.GaiZhenDuanYiCunZai+"!",null);//该诊断已存在
        
        return false;
        
    }
    
    //在诊断信息上绑定删除事件 
    bindDiagnoseFun(a.id);
}
/*
 *王学良
 *重置诊断信息 
 */
function resetDiagnose()
{
	//清空输入框
    $("#textarea").val("");
    
    //清空确诊状态
    var radios = $(".radio");
    for(var i = 0,length = $(".radio").length;i<length;i++)
    {
        radios[i].checked = false;
    }
}
/*
 *王学良
 *判断诊断信息是否存在 
 */
function isDiagnoseExist(strData,str)
{
    var isExist = false;
    for(var i = 0,length = strData.length;i < length ;i++)
    {
        if($(strData[i]).attr("id") == str)
        {
            isExist = true;
        }
    }
    return isExist;
}
