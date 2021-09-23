var FIND_SHOUTILIST_URL = "/publish/shouti/findShouTiList.htm";
var DELETE_SHOUTIILIST_URL = "/publish/shouti/deleteShouTi.htm";

$(document).ready(function(){
    importJS("/js/oimsUi.js");
    importJS("/js/oims_dengbi.js");
    importJS("/js/extend/camera/js/jquery.swfobject.1-1-1.min.js");
    importJS("/js/extend/camera/js/camera.js");
    importJS("/js/diqu.js");
    loadWelcomePage();
});

var l_st = {
    donorType: 435,//供体类型
    operationMode : 440,// 拟手术方式
    migrationStatus: 445,//移植手术状态
};

function loadJsAndCss_shouTi(btns){
    pageTitle = "受体管理";
    init();
    var rt ="<table cellspacing='0' cellpadding='0' border='0'>"
        + "<tr>"
        + "<td class='leftalign' width='180px'><input type='text' size='12' value='"
        + "请输入患者id或姓名查询"
        + "' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" id='search_patientId_doneeName' class='blurview' name='search_patientId_doneeName'></td>"
        + "<td><a href='javascript:seniorSearchSubmit_st_luke();' class='search'>"
        + "<span ></span>"
        + "查询"
        + "</a></td>"
        + "<td><a href='javascript:ShouTiExSearch_luke();' class='advsearch'>"
        + "<span ></span>"
        + "高级查询"
        + "</a></td>"
        + "</tr>"
        + "<tr>"
        + "<td colspan='4'>"
        + "<div class='btn'>"
        + "<a onclick='return true;' href='javascript:queryShouTi();'><span class='view' ></span>"
        + "查看"
        + "</a>" // 分诊
        + "<a onclick='return true;' href='javascript:addShouTi();'><span class='add' ></span>"
        + "新增"
        + "</a>"// 新增
        + "<a onclick='return true;' href='javascript:updateShouTi();'><span class='edit'></span>"
        + "修改"
        + "</a>"// 修改
        + "<a onclick='return true;' href='javascript:delShouTi();'><span class='del' ></span>"
        + "删除"
        + "</a>"// 删除
        + "</div>"
        + "</td>"
        + "</tr>"
        + "</table>";
    $("<div/>").attr("id", "advquery").addClass("advquery").appendTo("#right");
    $(rt).appendTo("#advquery");
    $("#search_donatorId_donatorName").click(function() {
        clearInitQuery(this);
    });
    showShouTi_list(btns);
}

//展示受体管理信息
function showShouTi_list(btns) {
    listFactor={
        url : contextPath + FIND_SHOUTILIST_URL, // url
        method : "post",
        checkbox : true,
        single : true,
        listObj : [
            {title:"姓名",key:"doneeName"},
            {title:"性别",key:"doneeSex",
                func:function(value){
                    return (value==1)?'男':'女';
             }},
            {title:"年龄",key:"doneeAge"},
            {title:"联系电话",key:"doneeTel"},
            {title:"家庭地址",key:"doneeAddress"},
            {title:"到院时间",key:"arriveDate",
                func :function(value){
                    return time(value).format_yyyy_mm_dd;
                }
            },
            {title:"拟手术方式",key:"operationMode",
                func:function(value) {
                    if (value == 441) {
                        return '穿透角移';
                    } else if (value == 442) {
                        return '板层角移';
                    }
                }
            },
            {title:"供体类型",key:"donorType",
                func:function(value) {
                    if (value == 436) {
                        return '新鲜供体';
                    } else if (value == 437) {
                        return '冰冻供体';
                    }
                }
             },
            {title:"移植手术状态",key:"migrationStatus",
                func:function(value) {
                    if (value == 446) {
                        return '新鲜供体';
                    } else if (value == 447) {
                        return '冰冻供体';
                    }
                }
            },
            {title:"角膜移植时间",key:"migrationTime",
                func :function(value){
                    return time(value).format_yyyy_mm_dd;
                }
            },
        ],
        data : {// data表示传的参数
            currentPage : 1,
            pageSize : getPageSize()
        }
    };
    if(btns==undefined || btns==null)
        btns=currentBtns;
    else
        currentBtns=btns;
    var div = $("<div />").attr("id","advquery").addClass("advquery").append("<div style='clear:both'></div>").appendTo("#right");
    div = $("<div />").addClass("btn").prependTo(div);
    showMyBTNS(btns,div);
    div.find("a").width(68);
    div = $("<div />").attr("id","pageList").addClass("list").appendTo("#right");
    div.createPageList(listFactor);
}

/**
 * 弹出高级查询表格
 */
function ShouTiExSearch_luke() {
    var seniorSearchTemplate = findEx_st();// 创建高级查询表格
    $.oimsBox({
        parentDiv : "advquery",// 将生成内容添加的id
        divContent : seniorSearchTemplate
    });
    debugger;
    calendarFun("search_migrationTime");// 移植时间
    calendarFun("search_operationRigDate");// 登记时间
    // 供体类型下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag: Math.random(),
        fatherid: l_st.donorType
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function (i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#search_donorType");
        });
    }
    // 拟手术方式下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag: Math.random(),
        fatherid: l_st.operationMode
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function (i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#search_operationMode");
        });
    }
}

function queryShouTi(inputId) {
    debugger;
    var dataObjects = getCheckBoxValue();
    if (dataObjects.length == 0 && inputId ==undefined) {
        $.oimsAlert("请选择需要查看的患者");
        return;
    }
    var state = 'query';
    var view = openStDialog(state);
    debugger;
    var form_queryShouTi = $("<form/>").attr("id", "form_queryShouTi").attr(
        "action", contextPath + "")
        .attr("enctype", "multipart/form-data").attr("method", "post");
    $(view).appendTo(form_queryShouTi);
    $(form_queryShouTi).oimsDialog({
        icon : "add",
        title : "查看",
        width : 820,
        height : 620,
        drag : false,// 是否可以拖动窗口
        locked : true,
        winType : 4,
        button : null
    });
    var queryData = getJSONData("/publish/shouti/queryShouTiById.htm", {
        tag : Math.random(),
        id: inputId != undefined? inputId : dataObjects[0].id
    }, "post");
    queryShouTifuzhi(queryData,'query');//赋值
}

function addShouTi() {
    var state = 'add';
    var view = openStDialog(state);
    var form_saveShouTi = $("<form/>").attr("id", "form_saveShouTi").attr(
        "action", contextPath + "")
        .attr("enctype", "multipart/form-data").attr("method", "post");
    $(view).appendTo(form_saveShouTi);
    var div_openbutton = $("<div/>").attr("id", "div_openbutton").attr("class",
        "openbutton").appendTo(form_saveShouTi);// 底部div
    var div_openbutton_html = "<a href='javascript:saveShouTi();'><span class='advsumit'></span>"
        + "提交"
        + "</a> <a href='javascript:fnResetAddForm();'><span class='advreset'></span>"
        + "重置" + "</a>";
    $(div_openbutton_html).appendTo(div_openbutton);
    $(form_saveShouTi).oimsDialog({
        icon : "add",
        title : "新增",
        width : 820,
        height : 640,
        drag : false,// 是否可以拖动窗口
        locked : true,
        winType : 4,
        button : null
    });
    getShouTiSelectInfo();
}

function updateShouTi() {
    var dataObjects = getCheckBoxValue();
    if (dataObjects.length == 0) {
        $.oimsAlert("请选择需要修改的患者");
        return;
    }
    var state = 'update';
    var view = openStDialog(state);
    var form_updateShouTi = $("<form/>").attr("id", "form_updateShouTi")
        .attr("action",
            contextPath + "")
        .attr("enctype", "multipart/form-data").attr("method", "post");
    $(view).appendTo(form_updateShouTi);
    var div_openbutton = $("<div/>").attr("id", "div_openbutton").attr("class",
        "openbutton").appendTo(form_updateShouTi);// 底部div
    var div_openbutton_html = "<a href='javascript:saveShouTi("+dataObjects[0].id+");'><span class='advsumit'></span>"
        + "提交"
        + "</a> <a href='javascript:fnResetUpdateForm();'><span class='advreset'></span>"
        + "重置" + "</a>";
    $(div_openbutton_html).appendTo(div_openbutton);
    $(form_updateShouTi).oimsDialog({
        icon : "edit",
        title : "修改",
        width : 820,
        height : 640,
        drag : false,
        locked : true,
        winType : 4,
        button : null
    });
    var queryData = getJSONData("/publish/shouti/queryShouTiById.htm", {
        tag : Math.random(),
        id: dataObjects[0].id
    }, "post");
    queryShouTifuzhi(queryData,'update');//赋值
}

function delShouTi() {
    var data = getCheckBoxValue();
    if(data.length==0){
        $.oimsAlert("请选择要删除的对象！");
        return;
    }
    $.oimsConfirm("确定要删除吗？",function(){
        var re = getJSONData(DELETE_SHOUTIILIST_URL,{id:data[0].id},"POST");
        var msg ;
        if(re.state){
            msg="操作成功！";
            loadJsAndCss_shouTi();
        }else{
            msg="很抱歉，操作失败！";
        }
        $.oimsAlert(msg);
    });
}

function saveShouTi(id) {
    if (id ==undefined){
        var oValidataData = {
            nullValidataData: {
                'patientId': '患者id为空'
            }
        };
        var sReturn = fnFormValidata(oValidataData);
        if (sReturn != null) {
            $.oimsAlert(sReturn);// 带*为必填项
            return false;
        }
    }
    var patientId =  $("#patientId").val();// 患者ID
    var doneeName =  $("#doneeName").val();// 姓名
    // 性别复选框
    var doneeSex = "";
    if ($("#doneeSex").length != 0) {
        $("input[name='doneeSex']:checked").each(function() {
            doneeSex += $(this).val() + ",";
        });
        if (doneeSex != "")// 截取去掉后面的“,”
            doneeSex = doneeSex.substring(0, doneeSex.lastIndexOf(","));
    }
    var doneeAge =  $("#doneeAge").val();// 年龄
    var doneeTel =  $("#doneeTel").val();// 联系电话
    var doneeAddress =  $("#doneeAddress").val();// 家庭住址
    var operationRigDate =  $("#operationRigDate").val();// 登记日期
    var arriveDate =  $("#arriveDate").val();// 到院时间
    var donorType =  $("#donorType").val();//供体类型
    var operationMode =  $("#operationMode").val();//拟手术方式
    var migrationStatus =  $("#migrationStatus").val();//移植状态
    var migrationTime =  $("#migrationTime").val();//移植时间
    var diagnose =  $("#diagnose").val();//诊断
    var donatorNo =  $("#donatorNo").val();//供体编码
    var donatorName =  $("#donatorName").val();//姓名
    // 性别复选框
    var donatorSex = "";
    if ($("#donatorSex").length != 0) {
        $("input[name='donatorSex']:checked").each(function() {
            donatorSex += $(this).val() + ",";
        });
        if (donatorSex != "")// 截取去掉后面的“,”
            donatorSex = donatorSex.substring(0, donatorSex.lastIndexOf(","));
    }
    var donatorAge =  $("#donatorAge").val();//年龄
    var re = getJSONData("/publish/shouti/saveShouTi.htm", {
        patientId : patientId,
        doneeName : doneeName,
        doneeSex : doneeSex,
        doneeAge : doneeAge,
        doneeTel : doneeTel,
        doneeAddress : doneeAddress,
        operationRigDate : operationRigDate,
        arriveDate : arriveDate,
        donorType : donorType,
        operationMode : operationMode,
        migrationStatus : migrationStatus,
        migrationTime : migrationTime,
        diagnose : diagnose,
        donatorNo : donatorNo,
        donatorName : donatorName,
        donatorSex : donatorSex,
        donatorAge : donatorAge,
        id: id,//修改选中id
        tag : Math.random()
    }, "post");
    var msg ;
    if(re.state){
        msg="保存成功！";
        loadJsAndCss_shouTi();
        removeDiv_openWin();
    }else{
        msg="很抱歉，保存失败！";
    }
    $.oimsAlert(msg);
}

function findEx_st() {
    var rt = "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
        + " <tr>"
        + "<td width='7%' nowrap='nowrap' align='right'>"
        + "移植时间:"
        + "</td>"
        + "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_migrationTime' name='search_migrationTime'>"
        + "</td>"
        + "<td width='7%' nowrap='nowrap' align='right'>"
        + "患者ID:"
        + "</td>"
        + "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_patientId' name='search_patientId'>"
        + "</td>"
        + "<td width='7%' nowrap='nowrap' align='right'>"
        + "姓名:"
        + "</td>"
        + "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_doneeName' name='search_doneeName'>"
        + "</td>"
        + "  <td width='3%' style='text-align:right' nowrap>"
        + "联系电话:"
        + "</td>"
        + "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_doneeTel' name='search_doneeTel'>"
        + "</td>"
        + "</tr>"
        + " <tr>"
        + "<td width='7%' nowrap='nowrap' align='right'>"
        + "登记日期:"
        + "</td>"
        + "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_operationRigDate' name='search_operationRigDate'>"
        + "</td>"
        + "<td width='7%' nowrap='nowrap' align='right'>"
        + "供体编号:"
        + "</td>"
        + "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_donatorNo' name='search_donatorNo'>"
        + "</td>"
        + "<td width='7%' nowrap='nowrap' align='right'>"
        + "供体类型:"
        + "</td>"
        + "<td width='15%'>"
        + "<select id='search_donorType' name='search_donorType' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option>"
        + " </select></td>"
        + "<td width='7%' nowrap='nowrap' align='right'>"
        + "拟手术方式:"
        + "</td>"
        + "<td width='15%'>"
        + "<select id='search_operationMode' name='search_operationMode' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option>"
        + " </select></td>"
        + "</tr>"
        + "</table>"
        + " <div class='avdopenbutton' >"
        + " <a href='javascript:seniorSearchSubmit_st_luke();'><span class='advsumit'></span>"
        + "提交"
        + "</a>"
        + " <a href='javascript:seniorSearchReset_st();'><span class='advreset'></span>"
        + "重置" + "</a>" + "<a id = 'closeId'><span class='close' ></span>"
        + "关闭" + "</a>" + " </div> ";
    var table = $(rt);

    return table;
};

/**
 * 受体信息高级查询操作(整理)
 */
function seniorSearchSubmit_st_luke() {
    var data_search = {};
    var search = $("#search_patientId_doneeName").val().indexOf("请输入") != -1 ? ""
        : $("#search_patientId_doneeName").val();
    var migrationTime = $("#search_migrationTime").length == 1 ? $("#search_migrationTime")
        .val() : "";// 移植时间
    var patientId = $("#search_patientId").length == 1 ? $("#search_patientId")
        .val() : "";// 患者ID
    var doneeName = $("#search_doneeName").length == 1 ? $("#search_doneeName")
        .val() : "";// 姓名
    var doneeTel = $("#search_doneeTel").length == 1 ? $("#search_doneeTel")
        .val() : "";// 联系电话
    var operationRigDate = $("#search_operationRigDate").length == 1 ? $("#search_operationRigDate").val()
        : "";// 登记日期
    var donatorNo = $("#search_donatorNo").length == 1 ? $("#search_donatorNo").val()
        : "";// 供体编号
    var donorType = $("#search_donorType").length == 1 ? $("#search_donorType").val()
        : "";// 供体类型
    var operationMode = $("#search_operationMode").length == 1 ? $(
        "#search_operationMode").val() : "";// 拟手术方式

    data_search = {
        search : search,
        migrationTime : migrationTime,// 移植时间
        patientId : patientId,// 患者id
        doneeName : doneeName,// 姓名
        doneeTel : doneeTel,// 联系电话
        operationRigDate : operationRigDate,// 登记日期
        donatorNo : donatorNo,// 供体编号
        donorType : donorType,// 供体类型
        operationMode : operationMode// 拟手术方式
    };

    $.extend(listFactor.data, data_search);
    $("#pageList").createPageList(listFactor);

};

/**
 * 高级查询的重置方法(整理)
 */
function seniorSearchReset_st() {
    $("#search_migrationTime").val("");// 移植时间
    $("#search_patientId").val("");// 患者id
    $("#search_doneeName").val("");// 姓名
    $("#search_doneeTel").val("");// 联系电话
    $("#search_operationRigDate").val("");// 登记日期
    $("#search_donatorNo").val("");// 供体编号
    $("#search_donorType").val("");// 供体类型
    $("#search_operationMode").val("");// 拟手术方式
}

/**
 * 受体信息详情页面
 * @param state
 * @returns {jQuery.fn.init|jQuery|HTMLElement}
 */
function openStDialog(state) {
    var rt = "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
        + "<tr>"
        + "<td style='display : flex'><span style='background-color: #3B9C3D;margin-left: 10px;margin-top: 3px;border-radius: 1px;margin-right: 5px;width: 4px;height: 15px'></span>患者信息</td>"
        + "</tr>"
        + "<tr>"
        + "<td style='padding-left: 8px;display: flex' align='right' nowrap='nowrap'>"
        + "<span style='color: red;margin-left: 37px'>*</span>患者ID"
        + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp"
        + "<input style='width: 179px;margin-top: 3px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='patientId' name='patientId'><div class='btn' style='margin-inline-end: -35px'><a onclick='return true;' href='javascript:patsinhospital();' style='margin-left: 14px'><span class='gh' ></span>"
        + "在院患者" + "</a></div></td>"
        + "<td style='padding-left: 22px;padding-top: 3px' align='right' nowrap='nowrap'>"
        + "<span style='color: red'>*</span>姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 280px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='doneeName' name='doneeName'></td>"
        + "</tr>"
        + "<tr>"
        + "<td style='padding-left:45px' align='left' nowrap='nowrap'>"
        + "<span style='color: red'>*</span>性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp别"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' checked='checked' value='1' id='doneeSex' name='doneeSex' class = 'c_r_class'>"
        + "男"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' value='2' id='doneeSex' name='doneeSex' class = 'c_r_class' >"
        + "女"
        + "</td>"
        + "<td style='padding-left: 22px' align='right' nowrap='nowrap'>"
        + "<span style='color: red'>*</span>年&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp龄"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 280px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='doneeAge' name='doneeAge'></td>"
        + "</tr>"
        + "<tr>"
        + "<td style='padding-left: 7px' align='right' nowrap='nowrap'>"
        + "<span style='color: red'>*</span>联系电话"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 280px;margin-inline-end: 9px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='doneeTel' name='doneeTel'></td>"
        + "<td  align='right' nowrap='nowrap'>"
        + "<span style='color: red'>*</span>家庭住址"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 280px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='doneeAddress' name='doneeAddress'></td>"
        + "</tr>"
        + "</table>";
    rt += "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
        + "<tr>"
        + "<td style='display : flex'><span style='background-color: #3B9C3D;margin-left: 10px;margin-top: 3px;border-radius: 1px;margin-right: 5px;width: 4px;height: 15px'></span>手术信息</td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 42px'>*</span>登记日期"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 280px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='operationRigDate' name='operationRigDate'>"
        + "</td>"
        + "<td>"
        + "<span style='color: red;margin-left: 65px'>*</span>到院时间"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 280px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='arriveDate' name='arriveDate'>"
        + "</td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 42px'>*</span>供体类型"
        + "&nbsp;&nbsp;&nbsp;"
        + "<select id='donorType' name='donorType' style='width: 280px' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option>"
        + " </select></td>"
        + "<td>"
        + "<span style='color: red;margin-left: 48px'>*</span>拟手术方式"
        + "&nbsp;&nbsp;&nbsp;"
        + "<select id='operationMode' name='operationMode' style='width: 280px' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option>"
        + " </select></td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 42px'>*</span>移植状态"
        + "&nbsp;&nbsp;&nbsp;"
        + "<select id='migrationStatus' name='migrationStatus' style='width: 280px' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option>"
        + " <option value='446'>新鲜供体</option>"
        + " <option value='447'>冰冻供体</option>"
        + " </select></td>"
        + "<td>"
        + "<span style='color: red;margin-left: 60px'>*</span>移植时间"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 280px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='migrationTime' name='migrationTime'>"
        + "</td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 45px'>*</span>诊&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp断"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 280px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='diagnose' name='diagnose'>"
        + "</td>"
        + "</tr>"
        + "</table>";
    rt += "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
        + "<tr>"
        + "<td style='display : flex'><span style='background-color: #3B9C3D;margin-left: 10px;margin-top: 3px;border-radius: 1px;margin-right: 5px;width: 4px;height: 15px'></span>检查结果</td>"
        + "</tr>"
        + "<tr>"
        + "<td colspan='5'>"
        + "<div class='btn' style='display: flex'>"
        + "<a style='width: 90px;margin-left: 45px' onclick='return true;' href='javascript:void(0);'><span class='view' ></span>"
        + "病历"
        + "</a>"
        + "<a style='width: 90px;margin-left: 35px' onclick='return true;' href='javascript:void(0);'><span class='view' ></span>"
        + "双眼视力"
        + "</a>"
        + "<a style='width: 90px;margin-left: 35px' onclick='return true;' href='javascript:void(0);'><span class='view'></span>"
        + "眼压"
        + "</a>"
        + "<a style='width: 90px;margin-left: 35px' onclick='return false;' href='javascript:void(0);'><span class='view' ></span>"
        + "前节OCT"
        + "</a>"
        + "<a style='width: 90px;margin-left: 35px' onclick='return false;' href='javascript:void(0);'><span class='view' ></span>"
        + "眼前段照相"
        + "</a>"
        + "</div>"
        + "</td>"
        + "</tr>"
        + "<td colspan='5'>"
        + "<div class='btn'>"
        + "<a style='width: 90px;margin-left: 45px' onclick='return false;' href='javascript:void(0);'><span class='view' ></span>"
        + "验光"
        + "</a>"
        + "<a style='width: 90px;margin-left: 35px' onclick='return false;' href='javascript:void(0);'><span class='view' ></span>"
        + "角膜地形图"
        + "</a>"
        + "<a style='width: 90px;margin-left: 35px' onclick='return true;' href='javascript:void(0);'><span class='view'></span>"
        + "B超"
        + "</a>"
        + "<a style='width: 90px;margin-left: 35px' onclick='return false;' href='javascript:void(0);'><span class='view' ></span>"
        + "FVEP"
        + "</a>"
        + "<a style='width: 90px;margin-left: 35px' onclick='return false;' href='javascript:void(0);'><span class='view' ></span>"
        + "FERG"
        + "</a>"
        + "</div>"
        + "</td>"
        + "<tr>"
        + "</table>";
    rt += "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
        + "<tr>"
        + "<td style='display : flex'><span style='background-color: #3B9C3D;margin-left: 10px;margin-top: 3px;border-radius: 1px;margin-right: 5px;width: 4px;height: 15px'></span>供体信息</td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 40px'>*</span>供体编码"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 280px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='donatorNo' name='donatorNo'>"
        + "</td>"
        + "<td>"
        + "<span style='color: red;margin-left: 50px'>*</span>姓&nbsp&nbsp&nbsp&nbsp名"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 280px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='donatorName' name='donatorName'>"
        + "</td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 40px'>*</span>性&nbsp&nbsp&nbsp&nbsp别"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='margin-left: 15px' type='radio' checked='checked' value='1' id='donatorSex' name='donatorSex' class = 'c_r_class'>"
        + "男"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' value='2' id='donatorSex' name='donatorSex' class = 'c_r_class' >"
        + "女"
        + "</td>"
        + "<td style='margin-left: 195px'>"
        + "<span style='color: red;margin-left: 50px'>*</span>年&nbsp&nbsp&nbsp&nbsp龄"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 280px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='donatorAge' name='donatorAge'>"
        + "</td>"
        + "</tr>"
        + "</table>";
    rt += "</table>";

    var t = $(rt);
    return t;
}

function getShouTiSelectInfo() {
    calendarFun("operationRigDate");// 登记日期
    calendarFun("arriveDate");// 到院时间
    calendarFun("migrationTime");// 移植时间
    // 供体类型下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag: Math.random(),
        fatherid: l_st.donorType
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function (i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#donorType");
        });
    }
    // 拟手术方式下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag: Math.random(),
        fatherid: l_st.operationMode
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function (i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#operationMode");
        });
    }
}

function queryShouTifuzhi(data,state) {
    getShouTiSelectInfo();
    if (state == 'query') {
        $("#patientId").val(data.list[0].patient_Id).attr("readonly","readonly");
        $(doneeName).val(data.list[0].donee_Name).attr("readonly","readonly");
        utilTool().radioSelect('doneeSex', data.list[0].donee_Sex,
            state == 'query' ? $("#form_queryShouTi"): $("#form_updateShouTi"));// 性别
        $("#doneeAge").val(data.list[0].donee_Age).attr("readonly","readonly");
        $("#doneeTel").val(data.list[0].donee_tel).attr("readonly","readonly");
        $(doneeAddress).val(data.list[0].donee_address).attr("readonly","readonly");
        $("#operationRigDate").val(time(data.list[0].operation_rig_date).format_yyyy_mm_dd);
        $("#arriveDate").val(time(data.list[0].arrive_date).format_yyyy_mm_dd);
        $("#donorType").val(data.list[0].donor_type).attr("readonly","readonly");
        $("#operationMode").val(data.list[0].operation_mode).attr("readonly","readonly");
        $(migrationStatus).val(data.list[0].migration_status).attr("readonly","readonly");
        $(migrationTime).val(time(data.list[0].migration_time).format_yyyy_mm_dd);
        $("#diagnose").val(data.list[0].diagnose).attr("readonly","readonly");
        $("#donatorNo").val(data.list[0].donator_no).attr("readonly","readonly");
        $("#donatorName").val(data.list[0].donator_name).attr("readonly","readonly");
        utilTool().radioSelect('donatorSex', data.list[0].donator_sex,
            state == 'query' ? $("#form_queryShouTi"): $("#form_updateShouTi"));// 性别
        $("#donatorAge").val(data.list[0].donator_age).attr("readonly","readonly");
    } else {
        $("#patientId").val(data.list[0].patient_Id).attr("readonly","readonly");
        $(doneeName).val(data.list[0].donee_Name).attr("readonly","readonly");
        utilTool().radioSelect('doneeSex', data.list[0].donee_Sex,
            state == 'query' ? $("#form_queryShouTi"): $("#form_updateShouTi"));// 性别
        $("#doneeAge").val(data.list[0].donee_Age).attr("readonly","readonly");
        $("#doneeTel").val(data.list[0].donee_tel).attr("readonly","readonly");
        $(doneeAddress).val(data.list[0].donee_address).attr("readonly","readonly");
        $("#operationRigDate").val(time(data.list[0].operation_rig_date).format_yyyy_mm_dd);
        $("#arriveDate").val(time(data.list[0].arrive_date).format_yyyy_mm_dd);
        $("#donorType").val(data.list[0].donor_type);
        $("#operationMode").val(data.list[0].operation_mode);
        $(migrationStatus).val(data.list[0].migration_status);
        $(migrationTime).val(time(data.list[0].migration_time).format_yyyy_mm_dd);
        $("#diagnose").val(data.list[0].diagnose);
        $("#donatorNo").val(data.list[0].donator_no);
        $("#donatorName").val(data.list[0].donator_name);
        utilTool().radioSelect('donatorSex', data.list[0].donator_sex,
            state == 'query' ? $("#form_queryShouTi"): $("#form_updateShouTi"));// 性别
        $("#donatorAge").val(data.list[0].donator_age);
    }
}