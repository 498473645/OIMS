var FIND_GONGTILIST_URL="/publish/gongti/findGongTiList.htm";
var DELETE_GONGTILIST_URL="/publish/gongti/deleteGongTi.htm";
var pat_dept={'230303':'A区','230304':'B区','230305':'C区','230306':'日间区','230307':'R区'};//可以定义到data.setting.js中
var contextPath ;
$(document).ready(function(){
    importJS("/js/oimsUi.js");
    importJS("/js/oims_dengbi.js");
    importJS("/js/extend/camera/js/jquery.swfobject.1-1-1.min.js");
    importJS("/js/extend/camera/js/camera.js");
    importJS("/js/diqu.js");
    loadWelcomePage();
});

var l_gt = {
    donatorIdType: 300,//证件类型
    allocationStatus : 305,// 分配状态
    processingResults: 315,//处理结果
    familyRelation: 320,//与捐献者关系
    antiHiv: 325,//艾滋病病毒抗体（Anti-HIV）
    hbsAg:335,//乙型肝炎表面抗原HBsAg
    antiHbs:345,//Anti-HBs
    antiHbc:355,//抗乙型肝炎核心抗体Anti-HBc
    antiHcv:365,//抗丙型肝炎病毒抗体Anti-HCV
    venerealDisease:375,//快速血浆反应素环状卡片试验-性病研究实验室试验（如梅毒）
    hpi:385,//现病史
    familyHistory: 390,//家族史
    previousHistory:395,//既往史
    personalHistory:400,//个人史
    deathReason: 405,//捐献者死亡原因
    transferType:415,//获取后转运保存方式
    storageType:420,//角膜保存方式
    crystalType:425,//晶体类型
    objective:430,//获取的目的
    materialType : 450,//获取材料类型
    trafficType: 455,//派车或自费
    migrationStatus: 445,//移植手术状态
};

function loadJsAndCss_gongTi(btns){
    pageTitle = "供体管理";
    init();
    var rt ="<table cellspacing='0' cellpadding='0' border='0'>"
        + "<tr>"
        + "<td class='leftalign' width='180px'><input type='text' size='12' value='"
        + "请输入供体编码或姓名查询"
        + "' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" id='search_donatorNo_donatorName' class='blurview' name='search_donatorNo_donatorName'></td>"
        + "<td><a href='javascript:seniorSearchSubmit_gt_luke();' class='search'>"
        + "<span ></span>"
        + "查询"
        + "</a></td>"
        + "<td><a href='javascript:GongTiExSearch_luke();' class='advsearch'>"
        + "<span ></span>"
        + "高级查询"
        + "</a></td>"
        + "</tr>"
        + "<tr>"
        + "<td colspan='4'>"
        + "<div class='btn'>"
        + "<a onclick='return true;' href='javascript:queryGongTi();'><span class='view' ></span>"
        + "查看"
        + "</a>" // 分诊
        + "<a onclick='return true;' href='javascript:addGongTi();'><span class='add' ></span>"
        + "新增"
        + "</a>"// 新增
        + "<a onclick='return true;' href='javascript:updateGongTi();'><span class='edit'></span>"
        + "修改"
        + "</a>"// 修改
        + "<a onclick='return true;' href='javascript:delGongTi();'><span class='del' ></span>"
        + "删除"
        + "</a>"// 删除
        + "<a onclick='return true;' href='javascript:printGongTi();'><span class='print' ></span>"
        + "打印"
        + "</a>"// 打印
        	+ "<a onclick='return true;' href='javascript:shouTixinxi();'><span class='gh' ></span>"
        	+ "受体信息" + "</a>           "// 受体信息
        + "</div>"
        + "</td>"
        + "</tr>"
        + "</table>";
    $("<div/>").attr("id", "advquery").addClass("advquery").appendTo("#right");
    $(rt).appendTo("#advquery");
    $("#search_donatorNo_donatorName").click(function() {
        clearInitQuery(this);
    });
    showGongTi_list(btns);
}

//展示供体管理信息
function showGongTi_list(btns) {
    listFactor={
        url : contextPath + FIND_GONGTILIST_URL, // url
        method : "post",
        checkbox : true,
        single : true,
        listObj : [
            {title:"供体编号",key:"donatorNo"},
            {title:"姓名",key:"donatorName"},
            {title:"性别",key:"donatorSex",
                func:function(value){
                return (value==1)?'男':'女';
            }},
            {title:"年龄",key:"donatorAge"},
            {title:"获取材料类型",key:"materialType",
                func:function(value) {
                    if (value == 451) {
                        return '眼球';
                    } else if (value == 452) {
                        return '角膜';
                    }
                }
            },
            {title:"获取时间",key:"takeTime",
                func :function(value){
                    return time(value).format_yyyy_mm_dd;
                }
            },
            {title:"获取眼别",key:"eyeType",
                func:function(value) {
                    if (value == 0) {
                        return '双眼';
                    } else if (value == 1) {
                        return '左眼';
                    } else if (value == 2) {
                        return '右眼';
                    }
                }
            },
            {title:"分配状态",key:"allocationStatus",
                func:function(value) {
                    if (value == 306) {
                        return '正在匹配中';
                    } else if (value == 307) {
                        return '匹配完成，没有找到合适的等待者';
                    } else if (value == 308) {
                        return '匹配完成，等待回复';
                    } else if (value == 309) {
                        return '分配结束，已分配';
                    } else if (value == 310) {
                        return '分配结束，未分配，强制中止';
                    } else if (value == 311) {
                        return '匹配完成，接受角膜通知书后退回';
                    }
                }
            }
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
function GongTiExSearch_luke() {
    var seniorSearchTemplate = findEx_gt();// 创建高级查询表格
    $.oimsBox({
        parentDiv : "advquery",// 将生成内容添加的id
        divContent : seniorSearchTemplate
    });
    calendarFun("search_take_Time");// 获取时间
    // 证件类型下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag : Math.random(),
        fatherid: l_gt.donatorIdType
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function(i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#search_donator_id_type");
        });
    }
    // 获取材料类型下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag : Math.random(),
        fatherid: l_gt.materialType
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function(i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#search_material_Type");
        });
    }
    // 分配状态下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag : Math.random(),
        fatherid: l_gt.allocationStatus
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function(i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#search_allocation_Status");
        });
    }
    // 处理结果下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag : Math.random(),
        fatherid: l_gt.processingResults
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function(i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#search_processing_results");
        });
    }
}

function queryGongTi() {
    var dataObjects = getCheckBoxValue();
    if (dataObjects.length == 0) {
        $.oimsAlert("请选择需要查看的患者");
        return;
    }
    var state = 'query';
    var view = openGtDialog(state);
    var form_queryGongTi = $("<form/>").attr("id", "form_queryGongTi").attr(
        "action", contextPath + "")
        .attr("enctype", "multipart/form-data").attr("method", "post");
    $(view).appendTo(form_queryGongTi);
    $(form_queryGongTi).oimsDialog({
        icon : "add",
        title : "查看",
        width : 820,
        height : 700,
        drag : false,// 是否可以拖动窗口
        locked : true,
        winType : 4,
        button : null
    });
    var queryData = getJSONData("/publish/gongti/queryGongTiById.htm", {
        tag : Math.random(),
        id: dataObjects[0].id
    }, "post");
    queryfuzhi(queryData,'query');//赋值
}

function addGongTi() {
    var state = 'add';
    var view = openGtDialog(state);
    var form_saveGongTi = $("<form/>").attr("id", "form_saveGongTi").attr(
        "action", contextPath + "/publish/gongti/saveGongTi.htm")
        .attr("enctype", "multipart/form-data").attr("method", "post");
    $(view).appendTo(form_saveGongTi);
    var div_openbutton = $("<div/>").attr("id", "div_openbutton").attr("class",
        "openbutton").appendTo(form_saveGongTi);// 底部div
    var div_openbutton_html = "<a href='javascript:saveGongTi();'><span class='advsumit'></span>"
        + "提交"
        + "</a> <a href='javascript:fnResetAddForm();'><span class='advreset'></span>"
        + "重置" + "</a>";
    $(div_openbutton_html).appendTo(div_openbutton);
    $(form_saveGongTi).oimsDialog({
        icon : "add",
        title : "新增",
        width : 820,
        height : 700,
        drag : false,// 是否可以拖动窗口
        locked : true,
        winType : 4,
        button : null
    });
    getGongTiSelectInfo();//字典
}

function updateGongTi() {
    var dataObjects = getCheckBoxValue();
    if (dataObjects.length == 0) {
        $.oimsAlert("请选择需要修改的患者");
        return;
    }
    var state = 'update';
    var view = openGtDialog(state);
    var form_updateGongTi = $("<form/>").attr("id", "form_updateGongTi")
        .attr("action",
            contextPath + "/publish/gongti/updateGongTi.htm")
        .attr("enctype", "multipart/form-data").attr("method", "post");
    $(view).appendTo(form_updateGongTi);
    var div_openbutton = $("<div/>").attr("id", "div_openbutton").attr("class",
        "openbutton").appendTo(form_updateGongTi);// 底部div
    var div_openbutton_html = "<a href='javascript:saveGongTi("+dataObjects[0].id+");'><span class='advsumit'></span>"
        + "提交"
        + "</a> <a href='javascript:fnResetUpdateForm();'><span class='advreset'></span>"
        + "重置" + "</a>";
    $(div_openbutton_html).appendTo(div_openbutton);
    $(form_updateGongTi).oimsDialog({
        icon : "edit",
        title : "修改",
        width : 820,
        height : 700,
        drag : false,
        locked : true,
        winType : 4,
        button : null
    });
    var queryData = getJSONData("/publish/gongti/queryGongTiById.htm", {
        tag : Math.random(),
        id: dataObjects[0].id
    }, "post");
    queryfuzhi(queryData,'update');//赋值
}

function delGongTi() {
    var data = getCheckBoxValue();
    if(data.length==0){
        $.oimsAlert("请选择要删除的对象！");
        return;
    }
    $.oimsConfirm("确定要删除吗？",function(){
        var re = getJSONData(DELETE_GONGTILIST_URL,{id:data[0].id},"POST");
        var msg ;
        if(re.state){
            msg="操作成功！";
            loadJsAndCss_gongTi();
        }else{
            msg="很抱歉，操作失败！";
        }
        $.oimsAlert(msg);
    });
}

function  saveGongTi(id) {
    if (id ==undefined){
        var oValidataData = {
            nullValidataData: {
                'eyeBank': '眼库名称为空'
            }
        };
        var sReturn = fnFormValidata(oValidataData);
        if (sReturn != null) {
            $.oimsAlert(sReturn);// 带*为必填项
            return false;
        }
    }
    var eyeBank =  $("#eyeBank").val();// 眼库名称
    var bankTel =  $("#bankTel").val();// 固定电话
    var bankMobile =  $("#bankMobile").val();// 手机号码
    var bankEmail =  $("#bankEmail").val();// 电子邮箱
    var patientId =  $("#patientId").val();// 患者ID
    var donatorNo =  $("#donatorNo").val();// 供体编号
    var donatorName =  $("#donatorName").val();// 姓名
    // 性别复选框
    var donatorSex = "";
    if ($("#donatorSex").length != 0) {
        $("input[name='donatorSex']:checked").each(function() {
            donatorSex += $(this).val() + ",";
        });
        if (donatorSex != "")// 截取去掉后面的“,”
            donatorSex = donatorSex.substring(0, donatorSex.lastIndexOf(","));
    }
    var donatorAge =  $("#donatorAge").val();// 年龄
    var donatorNationality =  $("#donatorNationality").val();// 国籍/地区
    var donatorIdType =  $("#donatorIdType").val();// 证件类型
    var donatorIdNo =  $("#donatorIdNo").val();// 证件号码
    var belongHospital =  $("#belongHospital").val();// 所属医院
    var nowAddress =  $("#nowAddress").val();//当前所在地
    var familyName =  $("#familyName").val();//家属姓名
    var familyRelation =  $("#familyRelation").val();//与捐献者关系
    //病人本人同意捐献眼球/角膜
    var donatorIntension = "";
    if ($("#donatorIntension").length != 0) {
        $("input[name='donatorIntension']:checked").each(function() {
            donatorIntension += $(this).val() + ",";
        });
        if (donatorIntension != "")// 截取去掉后面的“,”
            donatorIntension = donatorIntension.substring(0, donatorIntension.lastIndexOf(","));
    }
    //病人是否向其家属或其他人表达其捐献意愿
    var expressIntension = "";
    if ($("#expressIntension").length != 0) {
        $("input[name='expressIntension']:checked").each(function() {
            expressIntension += $(this).val() + ",";
        });
        if (expressIntension != "")// 截取去掉后面的“,”
            expressIntension = expressIntension.substring(0, expressIntension.lastIndexOf(","));
    }
    //病人配偶、父母及成年子女是否同意捐献者身故后捐献眼球/角膜
    var familyIntension = "";
    if ($("#familyIntension").length != 0) {
        $("input[name='familyIntension']:checked").each(function() {
            familyIntension += $(this).val() + ",";
        });
        if (familyIntension != "")// 截取去掉后面的“,”
            familyIntension = familyIntension.substring(0, familyIntension.lastIndexOf(","));
    }

    var antiHiv =  $("#antiHiv").val();//艾滋病病毒抗体（Anti-HIV）
    var hbsAg =  $("#hbsAg").val();//乙型肝炎表面抗原HBsAg
    var antiHbs =  $("#antiHbs").val();//Anti-HBs
    var antiHbc =  $("#antiHbc").val();//抗乙型肝炎核心抗体Anti-HBc
    var antiHcv =  $("#antiHcv").val();//抗丙型肝炎病毒抗体Anti-HCV
    var venerealDisease =  $("#venerealDisease").val();//快速血浆反应素环状卡片试验-性病研究实验室试验（如梅毒）
    var hpi =  $("#hpi").val();//现病史
    var familyHistory =  $("#familyHistory").val();//家族史
    var previousHistory =  $("#previousHistory").val();//既往史
    var personalHistory =  $("#personalHistory").val();//个人史
    var deathTime =  $("#deathTime").val();//捐献者死亡时间
    var deathReason =  $("#deathReason").val();//捐献者死亡原因

    var takeDepartment =  $("#takeDepartment").val();//获取单位名称
    var materialType =  $("#materialType").val();//获取材料类型
    var takeTime =  $("#takeTime").val();//获取时间
    var takeAddress =  $("#takeAddress").val();//获取地点
    var takeMembers =  $("#takeMembers").val();//取材人员
    var trafficType =  $("#trafficType").val();//派车或自费
    //获取后是否规范冷藏条件下转运
    var coldStorage = "";
    if ($("#coldStorage").length != 0) {
        $("input[name='coldStorage']:checked").each(function() {
            coldStorage += $(this).val() + ",";
        });
        if (coldStorage != "")// 截取去掉后面的“,”
            coldStorage = coldStorage.substring(0, coldStorage.lastIndexOf(","));
    }
    var transferType =  $("#transferType").val();//获取后转运保存方式
    //获取眼别
    var eyeType = "";
    if ($("#eyeType").length != 0) {
        $("input[name='eyeType']:checked").each(function() {
            eyeType += $(this).val() + ",";
        });
        if (eyeType != "")// 截取去掉后面的“,”
            eyeType = eyeType.substring(0, eyeType.lastIndexOf(","));
    }
    //角膜材料是否已保存
    var isStoraged = "";
    if ($("#isStoraged").length != 0) {
        $("input[name='isStoraged']:checked").each(function() {
            isStoraged += $(this).val() + ",";
        });
        if (isStoraged != "")// 截取去掉后面的“,”
            isStoraged = isStoraged.substring(0, isStoraged.lastIndexOf(","));
    }
    var materialNo =  $("#materialNo").val();//角膜材料编号
    var storageTime =  $("#storageTime").val();//保存日期时间
    var storageType =  $("#storageType").val();//角膜保存方式
    var coneaEvaluateTime =  $("#coneaEvaluateTime").val();//角膜评估日期时间
    var scleroticRingWidth =  $("#scleroticRingWidth").val();//巩膜环宽度（mm）
    var coneaDiam =  $("#coneaDiam").val();//角膜直径（mm）
    var hyalomereDiam =  $("#hyalomereDiam").val();//透明区直径（mm）
    var crystalType =  $("#crystalType").val();//晶体类型
    //上皮层是否完整光滑
    var epitheliumSmooth = "";
    if ($("#epitheliumSmooth").length != 0) {
        $("input[name='epitheliumSmooth']:checked").each(function() {
            epitheliumSmooth += $(this).val() + ",";
        });
        if (epitheliumSmooth != "")// 截取去掉后面的“,”
            epitheliumSmooth = epitheliumSmooth.substring(0, epitheliumSmooth.lastIndexOf(","));
    }
    //基质层是否清亮
    var stromaClear = "";
    if ($("#stromaClear").length != 0) {
        $("input[name='stromaClear']:checked").each(function() {
            stromaClear += $(this).val() + ",";
        });
        if (stromaClear != "")// 截取去掉后面的“,”
            stromaClear = stromaClear.substring(0, stromaClear.lastIndexOf(","));
    }
    //后弹力层有无皱褶及缺损
    var descemetFold = "";
    if ($("#descemetFold").length != 0) {
        $("input[name='descemetFold']:checked").each(function() {
            descemetFold += $(this).val() + ",";
        });
        if (descemetFold != "")// 截取去掉后面的“,”
            descemetFold = descemetFold.substring(0, descemetFold.lastIndexOf(","));
    }
    var ecd =  $("#ecd").val();//内皮细胞密度(个/mm)
    //内皮层有无压力线及缺损
    var endotheliumDefect = "";
    if ($("#endotheliumDefect").length != 0) {
        $("input[name='endotheliumDefect']:checked").each(function() {
            endotheliumDefect += $(this).val() + ",";
        });
        if (endotheliumDefect != "")// 截取去掉后面的“,”
            endotheliumDefect = endotheliumDefect.substring(0, endotheliumDefect.lastIndexOf(","));
    }
    var endothelialCellThickness =  $("#endothelialCellThickness").val();//内皮细胞厚度(um)
    //可应用范围
    var applicableScope = "";
    if ($("#applicableScope").length != 0) {
        $("input[name='applicableScope']:checked").each(function() {
            applicableScope += $(this).val() + ",";
        });
        if (applicableScope != "")// 截取去掉后面的“,”
            applicableScope = applicableScope.substring(0, applicableScope.lastIndexOf(","));
    }
    var objective =  $("#objective").val();//获取的目的
    var allocationStatus =  $("#allocationStatus").val();//分配状态
    var processingResults =  $("#processingResults").val();//处理结果

    var re = getJSONData("/publish/gongti/saveGongTi.htm", {
        eyeBank : eyeBank,//眼库名称
        bankTel :  bankTel,// 固定电话
        bankMobile :  bankMobile,// 手机号码
        bankEmail :  bankEmail,// 电子邮箱
        patientId : patientId,// 患者id
        donatorNo : donatorNo,// 供体编号
        donatorName : donatorName,// 姓名
        donatorSex : donatorSex,// 性别
        donatorAge : donatorAge,//年龄
        donatorNationality : donatorNationality,//国籍/地区
        donatorIdType : donatorIdType,// 证件类型
        donatorIdNo : donatorIdNo,// 证件号码
        belongHospital : belongHospital,// 所属医院
        nowAddress : nowAddress,//当前所在地
        familyName : familyName,// 家属姓名
        familyRelation : familyRelation,//与捐献者关系
        donatorIntension : donatorIntension,//病人本人同意捐献眼球/角膜
        expressIntension : expressIntension,//病人是否向其家属或其他人表达其捐献意愿
        familyIntension : familyIntension,//病人配偶、父母及成年子女是否同意捐献者身故后捐献眼球/角膜
        antiHiv:antiHiv,//艾滋病病毒抗体（Anti-HIV）
        hbsAg:hbsAg,//乙型肝炎表面抗原HBsAg
        antiHbs:antiHbs,//Anti-HBs
        antiHbc:antiHbc,//抗乙型肝炎核心抗体Anti-HBc
        antiHcv:antiHcv,//抗丙型肝炎病毒抗体Anti-HCV
        venerealDisease:venerealDisease,//快速血浆反应素环状卡片试验-性病研究实验室试验（如梅毒）
        hpi:hpi,//现病史
        familyHistory:familyHistory,//家族史
        previousHistory:previousHistory,//既往史
        personalHistory:personalHistory,//个人史
        deathTime:deathTime,//捐献者死亡时间
        deathReason:deathReason,//捐献者死亡原因
        takeDepartment : takeDepartment,// 获取单位名称
        materialType : materialType,// 获取材料类型
        takeTime : takeTime,// 获取时间
        takeAddress : takeAddress,//获取地点
        takeMembers : takeMembers,//取材人员
        trafficType : trafficType,//派车或自费
        coldStorage : coldStorage,//获取后是否规范冷藏条件下转运
        transferType : transferType,//获取后转运保存方式
        eyeType : eyeType,// 获取眼别
        isStoraged : isStoraged,//角膜材料是否已保存
        materialNo : materialNo,// 角膜材料编号
        storageTime : storageTime,//保存日期时间
        storageType : storageType,//角膜保存方式
        coneaEvaluateTime : coneaEvaluateTime,//角膜评估日期时间
        scleroticRingWidth : scleroticRingWidth,//巩膜环宽度（mm）
        coneaDiam : coneaDiam,//角膜直径（mm）
        hyalomereDiam : hyalomereDiam,//透明区直径（mm）
        crystalType : crystalType,//晶体类型
        epitheliumSmooth : epitheliumSmooth,//上皮层是否完整光滑
        stromaClear : stromaClear,//基质层是否清亮
        descemetFold : descemetFold,//后弹力层有无皱褶及缺损
        ecd : ecd,//内皮细胞密度(个/mm)
        endotheliumDefect : endotheliumDefect,//内皮层有无压力线及缺损
        endothelialCellThickness : endothelialCellThickness,//内皮细胞厚度(um)
        applicableScope : applicableScope,//可应用范围
        objective : objective,//获取的目的
        allocationStatus : allocationStatus,// 分配状态
        processingResults : processingResults,// 处理结果
        id: id,//修改选中id
        tag : Math.random()
    }, "post");
    var msg ;
    if(re.state){
        msg="保存成功！";
        loadJsAndCss_gongTi();
        removeDiv_openWin();
    }else{
        msg="很抱歉，保存失败！";
    }
    $.oimsAlert(msg);
}

function printGongTi() {
    var dataObjects = getCheckBoxValue();
    if (dataObjects.length == 0) {
        $.oimsAlert("请选择需要打印的患者");
        return;
    }
    //页面布局
    debugger;
    var showHeight = 1000;
    $(".medicalRecord").hide();
    var tag =  $("<div />").attr("id","medicalRecordTab").addClass("medicalRecord").attr("style","height:"+showHeight+"px;").appendTo("body");
    var h = showHeight;
    tag.height(h);
    var qgblyl_width = $("#tabTitle").width();
    var view = tbl_gt_add();
    $(view).appendTo(tag);
    tag.show();
    var newHtm = tag[0].innerHTML;
    // var oldHtm=document.body.innerHTML;
    // document.body.innerHTML=newHtm;//购建新的网页
    var win = window.open(contextPath + "/js/manager/yanku/gongti.html","");//新建窗口
    var head = "";
    head += "<meta http-equiv='Content-Type' content='text/html; charset=utf-8'>";
    head += "<title>打印</title>";
    head += "<link rel='stylesheet' type='text/css' href='"
        + contextPath + "/css/main.css' rel='stylesheet' type='text/css'>";
    head += "<link rel='stylesheet' type='text/css' href='"
        + contextPath
        + "/style/green/css/green.css' rel='stylesheet' type='text/css'>";
    head += "<link rel='stylesheet' type='text/css' href='"
        + contextPath + "/css/icon.css' rel='stylesheet' type='text/css'>";
    head += "<link rel='stylesheet' type='text/css' href='"
        + contextPath
        + "/style/green/css/openWin.css' rel='stylesheet' type='text/css'>";
    head += "<script src='" + contextPath
        + "/js/jquery.min.js'></script>";
    head += "<script src='" + contextPath + "/js/common.js'></script>";
    head += "<script type='text/javascript'>";
    head += "</script>";
    win.document.getElementsByTagName('head')[0].innerHTML += head;
    win.document.body.innerHTML = newHtm;//打印内容写到新建窗口中
    // win.document.write(html_css);
    win.print();//执行打印
    // if(tata=document.execCommand("print")){
    //     document.body.innerHTML=oldHtm;
    //     location.reload();
    // };
}

function shouTixinxi() {
    var dataObjects = getCheckBoxValue();
    if (dataObjects.length == 0) {
        $.oimsAlert("请选择患者");
        return;
    }
    var state = 'shouTixinxi';
    var form_closeShouTi = $("<form/>").attr("id", "form_closeShouTi" )
        .attr("action",
            contextPath + "")
        .attr("enctype", "multipart/form-data").attr("method", "post");
    var queryData = getJSONData("/publish/shouti/queryShouTiByDonatorNo.htm", {
        tag : Math.random(),
        donatorNo: dataObjects[0].donatorNo
    }, "post");
    debugger
    for(var i=0;i<queryData.list.length;i++) {
        var view = openStXxDialog(shouTixinxi);
        view[1].id= "table" + i;
        view[1].children[0].rows[3].cells[1].children[0].id = "table" + i + "_a";
        $(view).appendTo(form_closeShouTi);
    }
    var div_openbutton = $("<div/>").attr("id", "div_openbutton").attr("class",
        "openbutton").appendTo(form_closeShouTi);// 底部div
    var div_openbutton_html = "<a style='margin-left: 365px' href='javascript:doClose();' class='btnone' id='a_close'><span class='del'></span>"
        + "关闭" + "</a>";
    $(div_openbutton_html).appendTo(div_openbutton);
    $(form_closeShouTi).oimsDialog({
        icon : "edit",
        title : "受体信息",
        width : 820,
        height : 700,
        drag : false,
        locked : true,
        winType : 4,
        button : null
    });
    for(var i=0;i<queryData.list.length;i++) {
        queryShouTiInfo(queryData.list[i],i);//赋值
    }
}

// 关闭jsp(整理)
function doClose() {
    removeDiv_openWin();
}

function findEx_gt() {
    var rt = "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
        + " <tr>"
        + "<td width='7%' nowrap='nowrap' align='right'>"
        + "供体编码:"
        + "</td>"
        + "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_donator_No' name='search_donator_No'>"
        + "</td>"
        + "<td width='7%' nowrap='nowrap' align='right'>"
        + "患者ID:"
        + "</td>"
        + "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_patient_Id' name='search_patient_Id'>"
        + "</td>"
        + "<td width='7%' nowrap='nowrap' align='right'>"
        + "姓名:"
        + "</td>"
        + "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_donator_Name' name='search_donator_Name'>"
        + "</td>"
        + "<td width='7%' nowrap='nowrap' align='right'>"
        + "性别:"
        + "</td>"
        + "<td width='18%'><input type='radio' name='search_donator_Sex' class = 'c_r_class' id='search_donator_Sex' value='1'/>"
        + "男&nbsp;&nbsp;"
        + "<input type='radio' name='search_donator_Sex' class = 'c_r_class' id='search_donator_Sex' value='2'/>"
        + "女&nbsp;&nbsp;"
        + "<input type='radio' name='search_donator_Sex' class = 'c_r_class' id='search_donator_Sex' value='0'/>"
        + "不详"
        + "</td>"
        + "</tr>"
        + " <tr>"
        + "  <td width='3%' style='text-align:right' nowrap>"
        + "证件类型:"
        + "</td>"
        + " <td width='12%'><select id='search_donator_id_type' name='search_donator_id_type'  onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option>"
        + " </select></td>"
        + "<td width='7%' nowrap='nowrap' align='right'>"
        + "证件号码:"
        + "</td>"
        + "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_donator_id_No' name='search_donator_id_No'>"
        + "</td>"
        + "<td width='7%' nowrap='nowrap' align='right'>"
        + "所属医院:"
        + "</td>"
        + "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_belong_hospital' name='search_belong_hospital'>"
        + "</td>"
        + "<td width='7%' nowrap='nowrap' align='right'>"
        + "家属姓名:"
        + "</td>"
        + "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_family_name' name='search_family_name'>"
        + "</td>"
        + "</tr>"
        + " <tr>"
        + "<td width='7%' nowrap='nowrap' align='right'>"
        + "获取单位名称:"
        + "</td>"
        + "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_take_department' name='search_take_department'>"
        + "</td>"
        + "<td width='7%' nowrap='nowrap' align='right'>"
        + "获取材料类型:"
        + "</td>"
        + " <td width='15%'><select id='search_material_Type' name='search_material_Type'  onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option>"
        + " </select></td>"
        + "<td width='7%' nowrap='' align='right'>"
        + "获取时间:"
        + "</td>"
        + "<td width='11%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_take_Time' name='search_take_Time'>"
        + "</td>"
        + "<td width='7%' nowrap='nowrap' align='right'>"
        + "获取眼别:"
        + "</td>"
        + "<td width='18%'><input type='radio' name='search_eye_Type' class = 'c_r_class' id='search_eye_Type' value='0'/>"
        + "双眼&nbsp;&nbsp;"
        + "<input type='radio' name='search_eye_Type' class = 'c_r_class' id='search_eye_Type' value='1'/>"
        + "左眼&nbsp;&nbsp;"
        + "<input type='radio' name='search_eye_Type' class = 'c_r_class' id='search_eye_Type' value='2'/>"
        + "右眼"
        + "</td>"
        + "</tr>"
        + " <tr>"
        + "<td width='7%' nowrap='nowrap' align='right'>"
        + "角膜材料编号:"
        + "</td>"
        + "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='search_material_no' name='search_material_no'>"
        + "</td>"
        + "  <td width='3%' style='text-align:right' nowrap>"
        + "分配状态:"
        + "</td>"
        + " <td width='12%'><select id='search_allocation_Status' name='search_allocation_Status'  onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option>"
        + " </select></td>"
        + "  <td width='3%' style='text-align:right' nowrap>"
        + "处理结果:"
        + "</td>"
        + " <td width='12%'><select id='search_processing_results' name='search_processing_results'  onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option>"
        + " </select></td>"
        + "</tr>"
        + "</table>"
        + " <div class='avdopenbutton' >"
        + " <a href='javascript:seniorSearchSubmit_gt_luke();'><span class='advsumit'></span>"
        + "提交"
        + "</a>"
        + " <a href='javascript:seniorSearchReset_gt();'><span class='advreset'></span>"
        + "重置" + "</a>" + "<a id = 'closeId'><span class='close' ></span>"
        + "关闭" + "</a>" + " </div> ";
    var table = $(rt);

    return table;
};

/**
 * 供体信息高级查询操作(整理)
 */
function seniorSearchSubmit_gt_luke() {
    var data_search = {};
    var search = $("#search_donatorNo_donatorName").val().indexOf("请输入") != -1 ? ""
        : $("#search_donatorNo_donatorName").val();
    var donatorNo = $("#search_donator_No").length == 1 ? $("#search_donator_No")
        .val() : "";// 供体编号
    var patientId = $("#search_patient_Id").length == 1 ? $("#search_patient_Id")
        .val() : "";// 患者id
    var donatorName = $("#search_donator_Name").length == 1 ? $("#search_donator_Name")
        .val() : "";// 姓名
    // 性别复选框
    var donatorSex = "";
    if ($("#search_donator_Sex").length != 0) {
        $("input[name='search_donator_Sex']:checked").each(function() {
            donatorSex += $(this).val() + ",";
        });
        if (donatorSex != "")// 截取去掉后面的“,”
            donatorSex = donatorSex.substring(0, donatorSex.lastIndexOf(","));
    }
    var donatorIdType = $("#search_donator_id_type").length == 1 ? $(
        "#search_donator_id_type").val() : "";// 证件类型
    var donatorIdNo = $("#search_donator_id_No").length == 1 ? $("#search_donator_id_No")
        .val() : "";// 证件号码
    var belongHospital = $("#search_belong_hospital").length == 1 ? $("#search_belong_hospital").val()
        : "";// 所属医院
    var familyName = $("#search_family_name").length == 1 ? $("#search_family_name").val()
        : "";// 家属姓名
    var takeDepartment = $("#search_take_department").length == 1 ? $("#search_take_department").val()
        : "";// 获取单位名称
    var materialType = $("#search_material_Type").length == 1 ? $(
        "#search_material_Type").val() : "";// 获取材料类型
    var takeTime = $("#search_take_Time").length == 1 ? $(
        "#search_take_Time").val() : "";// 获取时间
    // 获取眼别复选框
    var eyeType = "";
    if ($("#search_eye_Type").length != 0) {
        $("input[name='search_eye_Type']:checked").each(function() {
            eyeType += $(this).val() + ",";
        });
        if (eyeType != "")// 截取去掉后面的“,”
            eyeType = eyeType.substring(0, eyeType.lastIndexOf(","));
    }
    var materialNo = $("#search_material_no").length == 1 ? $("#search_material_no").val() : "";// 角膜材料编号
    var allocationStatus = $("#search_allocation_Status").length == 1 ? $("#search_allocation_Status")
        .val() : "";// 分配状态
    var processingResults = $("#search_processing_results").length == 1 ? $(
        "#search_processing_results option:selected").val() : "";// 处理结果
    data_search = {
        search : search,
        donatorNo : donatorNo,// 供体编号
        patientId : patientId,// 患者id
        donatorName : donatorName,// 姓名
        donatorSex : donatorSex,// 性别
        donatorIdType : donatorIdType,// 证件类型d
        donatorIdNo : donatorIdNo,// 证件号码
        belongHospital : belongHospital,// 所属医院
        familyName : familyName,// 家属姓名
        takeDepartment : takeDepartment,// 获取单位名称
        materialType : materialType,// 获取材料类型
        takeTime : takeTime,// 获取时间
        eyeType : eyeType,// 获取眼别
        materialNo : materialNo,// 角膜材料编号
        allocationStatus : allocationStatus,// 分配状态
        processingResults : processingResults// 处理结果
    };

    $.extend(listFactor.data, data_search);
    $("#pageList").createPageList(listFactor);

};

/**
 * 高级查询的重置方法(整理)
 */
function seniorSearchReset_gt() {
    $("#search_donator_No").val("");// 供体编码
    $("#search_patient_Id").val("");// 患者id
    $("#search_donator_Name").val("");// 姓名
    $("[name = search_donator_Sex]:radio").attr("checked", false);// 性别
    $("#search_donator_id_type").val("");// 证件类型
    $("#search_donator_id_No").val("");// 证件号码
    $("#search_belong_hospital").val("");// 所属医院
    $("#search_family_name").val("");// 家属姓名
    $("#search_take_department").val("");// 获取单位名称
    $("#search_material_Type").val("");// 获取材料类型
    $("#search_take_Time").val("");// 获取时间
    $("[name = search_eye_Type]:radio").attr("checked", false);// 获取眼别
    $("#search_material_no").val("");// 角膜材料编号
    $("#search_allocation_Status").val("");// 分配状态
    $("#search_processing_results").val("");// 处理结果
}

/**
 * 供体信息详情页面
 * @param state
 * @returns {jQuery.fn.init|jQuery|HTMLElement}
 */
function openGtDialog(state) {
    var rt = "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
        + "<tr>"
        + "<td style='display : flex'><span style='background-color: #3B9C3D;margin-left: 10px;margin-top: 3px;border-radius: 1px;margin-right: 5px;width: 4px;height: 15px'></span>眼库信息</td>"
        + "</tr>"
        + "<tr>"
        + "<td style='padding-left: 4px' align='right' nowrap='nowrap'>"
        + "<span style='color: red'>*</span>眼库名称"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 280px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='eyeBank' name='eyeBank'>"
        + "</td>"
        + "<td align='right' nowrap='nowrap'>"
        + "<span style='color: red'></span>固定电话"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 280px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='bankTel' name='bankTel'></td>"
        + "</tr>"
        + "<tr>"
        + "<td style='padding-left: 4px' align='right' nowrap='nowrap'>"
        + "<span style='color: red'></span>手机号码"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 280px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='bankMobile' name='bankMobile'></td>"
        + "<td align='right' nowrap='nowrap'>"
        + "<span style='color: red'></span>电子邮箱"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 280px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='bankEmail' name='bankEmail'></td>"
        + "</tr>"
        + "</table>";
    rt += "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
        + "<tr>"
        + "<td style='display : flex'><span style='background-color: #3B9C3D;margin-left: 10px;margin-top: 3px;border-radius: 1px;margin-right: 5px;width: 4px;height: 15px'></span>捐献者信息</td>"
        + "</tr>"
        + "<tr>"
        + "<td style='padding-left: 22px;display: flex;line-height: 30px' align='right' nowrap='nowrap'>"
        + "<span style='color: red;margin-left: 37px'>*</span>患者ID"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 179px;margin-top: 3px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='patientId' name='patientId'><div class='btn' style='margin-inline-end: -35px'><a id='patsinhospital' onclick='return true;' href='javascript:patsinhospital()'  style='margin-left: 14px'><span class='gh' ></span>"
        + "在院患者" + "</a></div></td>"
        + "<td align='right' nowrap='nowrap' style='padding-top: 3px'>"
        + "<span style='color: red'>*</span>供体编号"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 280px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='donatorNo' name='donatorNo'></td>"
        + "</tr>"
        + "<tr>"
        + "<td style='padding-left: 22px;padding-top: 3px' align='right' nowrap='nowrap'>"
        + "<span style='color: red'>*</span>姓&nbsp&nbsp&nbsp&nbsp名"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 179px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='donatorName' name='donatorName'><a onclick='return true;' href='javascript:look_jmyz()' style='margin-left: 53px;text-decoration:underline;color: #3B9C3D'>查看病历</a></td>"
        + "<td style='padding-left: 50px' align='left' nowrap='nowrap'>"
        + "<span style='color: red'>*</span>性&nbsp&nbsp&nbsp&nbsp别"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' checked='checked' value='1' id='donatorSex' name='donatorSex' class = 'c_r_class'>"
        + "男"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' value='2' id='donatorSex' name='donatorSex' class = 'c_r_class' >"
        + "女"
        + "</td>"
        + "</tr>"
        + "<tr>"
        + "<td style='padding-left: 22px' align='right' nowrap='nowrap'>"
        + "<span style='color: red'>*</span>年&nbsp&nbsp&nbsp&nbsp龄"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 280px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='donatorAge' name='donatorAge'></td>"
        + "<td  align='right' nowrap='nowrap'>"
        + "<span style='color: red'>*</span>国籍/地区"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 280px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='donatorNationality' name='donatorNationality'></td>"
        + "</tr>"
        + "<tr>"
        + "<td style='padding-left: 15px' align='right' nowrap='nowrap'>"
        + "<span style='color: red'>*</span>证件类型"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<select id='donatorIdType' name='donatorIdType' style='width: 280px;margin-inline-end: 0px' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option>"
        + " </select></td>"
        + "<td  align='right' nowrap='nowrap'>"
        + "<span style='color: red'>*</span>证件号码"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 280px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='donatorIdNo' name='donatorIdNo'></td>"
        + "</tr>"
        + "<tr>"
        + "<td style='padding-left: 22px' align='right' nowrap='nowrap'>"
        + "<span style='color: red'>*</span>所属医院"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 280px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='belongHospital' name='belongHospital'></td>"
        + "<td  align='right' nowrap='nowrap'>"
        + "<span style='color: red'>*</span>当前所在地"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 280px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='nowAddress' name='nowAddress'></td>"
        + "</tr>"
        + "</table>";
    rt += "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
        + "<tr>"
        + "<td style='display : flex'><span style='background-color: #3B9C3D;margin-left: 10px;margin-top: 3px;border-radius: 1px;margin-right: 5px;width: 4px;height: 15px'></span>捐献者家属信息</td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 50px'>*</span>家属姓名"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 280px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='familyName' name='familyName'>"
        + "</td>"
        + "<td>"
        + "<span style='color: red;margin-left: 19px'>*</span>与捐献者关系"
        + "&nbsp;&nbsp;&nbsp;"
        + "<select id='familyRelation' name='familyRelation' style='width: 280px' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option>"
        + " </select></td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 50px'>*</span>病人本人同意捐献眼球/角膜"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' checked='checked' value='1' id='donatorIntension' name='donatorIntension' class = 'c_r_class'>"
        + "同意"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' checked='checked' value='2' id='donatorIntension' name='donatorIntension' class = 'c_r_class'>"
        + "不同意"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' value='0' id='donatorIntension' name='donatorIntension' class = 'c_r_class' >"
        + "由于临床或其他原因，无法了解病人的捐献医院"
        + "</td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 50px'>*</span>病人是否向其家属或其他人表达其捐献意愿"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' checked='checked' value='1' id='expressIntension' name='expressIntension' class = 'c_r_class'>"
        + "是"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' checked='checked' value='2' id='expressIntension' name='expressIntension' class = 'c_r_class'>"
        + "否"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' value='0' id='expressIntension' name='expressIntension' class = 'c_r_class' >"
        + "未知"
        + "</td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 50px'>*</span>病人配偶、父母及成年子女是否同意捐献者身故后捐献眼球/角膜"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' checked='checked' value='1' id='familyIntension' name='familyIntension' class = 'c_r_class'>"
        + "是"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' checked='checked' value='2' id='familyIntension' name='familyIntension' class = 'c_r_class'>"
        + "否"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' value='0' id='familyIntension' name='familyIntension' class = 'c_r_class' >"
        + "未知"
        + "</td>"
        + "</tr>"
        + "</table>";
    rt += "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
        + "<tr>"
        + "<td style='display : flex'><span style='background-color: #3B9C3D;margin-left: 10px;margin-top: 3px;border-radius: 1px;margin-right: 5px;width: 4px;height: 15px'></span>捐献者身体信息</td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 50px'>*</span>艾滋病病毒抗体（Anti-HIV）"
        + "&nbsp;&nbsp;&nbsp;"
        + "<select id='antiHiv' name='antiHiv' style='width: 150px;margin-left: 5px' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option>"
        + "</td>"
        + "<td>"
        + "<span style='color: red;margin-left: 50px'>*</span>乙型肝炎表面抗原HBsAg"
        + "&nbsp;&nbsp;&nbsp;"
        + "<select id='hbsAg' name='hbsAg' style='width: 150px' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option></td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 50px'>*</span>Anti-HBs"
        + "&nbsp;&nbsp;&nbsp;"
        + "<select id='antiHbs' name='antiHbs' style='width: 150px;margin-left: 111px' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option>"
        + "</td>"
        + "<td>"
        + "<span style='color: red;margin-left: 26px'>*</span>抗乙型肝炎核心抗体Anti-HBc"
        + "&nbsp;&nbsp;&nbsp;"
        + "<select id='antiHbc' name='antiHbc' style='width: 150px' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option></td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 50px'>*</span>抗丙型肝炎病毒抗体Anti-HCV"
        + "&nbsp;&nbsp;&nbsp;"
        + "<select id='antiHcv' name='antiHcv' style='width: 150px' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option></td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 50px'>*</span>快速血浆反应素环状卡片试验-性病研究实验室试验（如梅毒）"
        + "&nbsp;&nbsp;&nbsp;"
        + "<select id='venerealDisease' name='venerealDisease' style='width: 150px' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option></td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 50px''>*</span>现病史"
        + "&nbsp;&nbsp;&nbsp;"
        + "<select id='hpi' name='hpi' style='width: 93px' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option>"
        + "</td>"
        + "<td>"
        + "<span style='color: red;margin-left: 35px''>*</span>家族史"
        + "&nbsp;&nbsp;&nbsp;"
        + "<select id='familyHistory' name='familyHistory' style='width: 93px' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option>"
        + "</td>"
        + "<td>"
        + "<span style='color: red;margin-left: 35px''>*</span>既往史"
        + "&nbsp;&nbsp;&nbsp;"
        + "<select id='previousHistory' name='previousHistory' style='width: 93px' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option>"
        + "</td>"
        + "<td>"
        + "<span style='color: red;margin-left: 35px''>*</span>个人史"
        + "&nbsp;&nbsp;&nbsp;"
        + "<select id='personalHistory' name='personalHistory' style='width: 93px' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option></td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 50px''>*</span>捐献者死亡时间"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 232px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='deathTime' name='deathTime'></td>"
        + "<td>"
        + "<span style='color: red;margin-left: 50px''>*</span>捐献者死亡原因"
        + "&nbsp;&nbsp;&nbsp;"
        + "<select id='deathReason' name='deathReason' style='width: 232px' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option></td>"
        + "</tr>"
        + "</table>";
    rt += "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
        + "<tr>"
        + "<td style='display : flex'><span style='background-color: #3B9C3D;margin-left: 10px;margin-top: 3px;border-radius: 1px;margin-right: 5px;width: 4px;height: 15px'></span>眼球/角膜获取信息</td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 50px'>*</span>获取单位名称"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 252px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='takeDepartment' name='takeDepartment'>"
        + "<span style='color: red;margin-left: 45px'>*</span>获取材料类型"
        + "&nbsp;&nbsp;&nbsp;"
        + "<select id='materialType' name='materialType' style='width: 252px' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option>"
        + " </select></td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 50px'>*</span>获取时间"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 252px;margin-left: 24px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='takeTime' name='takeTime'>"
        + "<span style='color: red;margin-left: 45px'>*</span>获取地点"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 252px;margin-left: 24px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='takeAddress' name='takeAddress'></td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 50px'>*</span>取材人员"
        + "&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 252px;margin-left: 24px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='takeMembers' name='takeMembers'>"
        + "<span style='color: red;margin-left: 45px'>*</span>派车或自费"
        + "&nbsp;&nbsp;&nbsp;"
        + "<select id='trafficType' name='trafficType' style='width: 252px;margin-left: 12px' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option></td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 50px'>*</span>获取后是否规范冷藏条件下转运"
        + "&nbsp;&nbsp;&nbsp;"
        + "<td>"
        + "<input type='radio' checked='checked' value='1' id='coldStorage' name='coldStorage' class = 'c_r_class'>"
        + "是"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' value='0' id='coldStorage' name='coldStorage' class = 'c_r_class' >"
        + "否"
        + "</td>"
        + "<td>"
        + "<span style='color: red;margin-left: 67px'>*</span>获取后转运保存方式"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<select id='transferType' name='transferType' style='width: 252px;margin-left: 2px' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option></td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 50px'>*</span>获取眼别"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<td>"
        + "<input type='radio' checked='checked' value='0' id='eyeType' name='eyeType' class = 'c_r_class'>"
        + "双眼"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' checked='checked' value='1' id='eyeType' name='eyeType' class = 'c_r_class'>"
        + "左眼"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' value='2' id='eyeType' name='eyeType' class = 'c_r_class' >"
        + "右眼"
        + "</td>"
        + "<td>"
        + "<span style='color: red;margin-left: 98px'>*</span>角膜材料是否已保存"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<td>"
        + "<input type='radio' checked='checked' value='1' id='isStoraged' name='isStoraged' class = 'c_r_class'>"
        + "是"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' value='0' id='isStoraged' name='isStoraged' class = 'c_r_class' >"
        + "否"
        + "</td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 50px'>*</span>角膜材料编号"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 252px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='materialNo' name='materialNo'>"
        + "<span style='color: red;margin-left: 37px'>*</span>保存日期时间"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 252px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='storageTime' name='storageTime'></td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 50px'>*</span>角膜保存方式"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<select id='storageType' name='storageType' style='width: 252px' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option></td>"
        + "</tr>"
        + "</table>";
    rt += "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
        + "<tr>"
        + "<td style='display : flex'><span style='background-color: #3B9C3D;margin-left: 10px;margin-top: 3px;border-radius: 1px;margin-right: 5px;width: 4px;height: 15px'></span>眼球/角膜评估信息</td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 50px'>*</span>角膜评估日期时间"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 226px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='coneaEvaluateTime' name='coneaEvaluateTime'>"
        + "<span style='color: red;margin-left: 45px'>*</span>巩膜环宽度（mm）"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 226px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='scleroticRingWidth' name='scleroticRingWidth'></td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 52px'>*</span>角膜直径（mm）"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 226px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='coneaDiam' name='coneaDiam'>"
        + "<span style='color: red;margin-left: 46px'>*</span>透明区直径（mm）"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 226px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='hyalomereDiam' name='hyalomereDiam'></td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 51px'>*</span>晶体类型"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<select id='crystalType' name='crystalType' style='width: 226px;margin-left: 47px' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option>"
        + "</td>"
        + "<td>"
        + "<span style='color: red;margin-left: 37px'>*</span>上皮层是否完整光滑"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' checked='checked' value='1' id='epitheliumSmooth' name='epitheliumSmooth' class = 'c_r_class'>"
        + "是"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' value='0' id='epitheliumSmooth' name='epitheliumSmooth' class = 'c_r_class' >"
        + "否"
        + "</td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 50px'>*</span>基质层是否清亮"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<td>"
        + "<input type='radio' checked='checked' value='1' id='stromaClear' name='stromaClear' class = 'c_r_class'>"
        + "是"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' value='0' id='stromaClear' name='stromaClear' class = 'c_r_class' >"
        + "否"
        + "</td>"
        + "<td>"
        + "<span style='color: red;margin-left: 190px'>*</span>后弹力层有无皱褶及缺损"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<td>"
        + "<input type='radio' checked='checked' value='1' id='descemetFold' name='descemetFold' class = 'c_r_class'>"
        + "有"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' checked='checked' value='2' id='descemetFold' name='descemetFold' class = 'c_r_class'>"
        + "无"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' value='0' id='descemetFold' name='descemetFold' class = 'c_r_class' >"
        + "未知"
        + "</td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 24px'>*</span>内皮细胞密度(个/mm)"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 226px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='ecd' name='ecd'>"
        + "<span style='color: red;margin-left: 46px'>*</span>内皮层有无压力线及缺损"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<td>"
        + "<input type='radio' checked='checked' value='1' id='endotheliumDefect' name='endotheliumDefect' class = 'c_r_class'>"
        + "有"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' checked='checked' value='2' id='endotheliumDefect' name='endotheliumDefect' class = 'c_r_class'>"
        + "无"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' value='0' id='endotheliumDefect' name='endotheliumDefect' class = 'c_r_class' >"
        + "未知"
        + "</td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 45px'>*</span>内皮细胞厚度(um)"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 226px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='endothelialCellThickness' name='endothelialCellThickness'>"
        + "<span style='color: red;margin-left: 46px'>*</span>可应用范围"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<td>"
        + "<input type='radio' checked='checked' value='1' id='applicableScope' name='applicableScope' class = 'c_r_class'>"
        + "PK"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' checked='checked' value='2' id='applicableScope' name='applicableScope' class = 'c_r_class'>"
        + "EK"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' checked='checked' value='3' id='applicableScope' name='applicableScope' class = 'c_r_class'>"
        + "ALK"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input type='radio' value='4' id='applicableScope' name='applicableScope' class = 'c_r_class' >"
        + "治疗性"
        + "</td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 50px'>*</span>获取的目的"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<select id='objective' name='objective' style='width: 226px;margin-left: 34px' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option></td>"
        + "</tr>"
        + "</table>";
    rt += "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
        + "<tr>"
        + "<td style='display : flex'><span style='background-color: #3B9C3D;margin-left: 10px;margin-top: 3px;border-radius: 1px;margin-right: 5px;width: 4px;height: 15px'></span>眼球/角膜状态</td>"
        + "</tr>"
        + "<tr style='display: flex;width: 100%;white-space: nowrap'>"
        + "<td>"
        + "<span style='color: red;margin-left: 50px'>*</span>分配状态"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<select id='allocationStatus' name='allocationStatus' style='width: 226px' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option></td>"
        + "<td>"
        + "<span style='color: red;margin-left: 64px'>*</span>处理结果"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<select id='processingResults' name='processingResults' style='width: 226px' onblur=\"this.className='blur'\">"
        + " <option value=''>请选择</option></td>"
        + "</tr>"
        + "</table>";
    rt += "</table>";
    var t = $(rt);
    return t;

};

function openStXxDialog(state) {
    var rt = "<table width='100%' style='margin-left: 7px' cellspacing='0' cellpadding='0' border='0'>"
        + "<tr>"
        + "<td style='padding-bottom: 0px'><div style='width: 100%;height: 27px;line-height: 27px;border-bottom: 5px solid #3B9C3D;background-color: #3B9C3D;border-top-left-radius: 4px;border-top-right-radius: 4px'>"
        + "<span style='color: #fff'>受体信息</span>"
        + "</div></td>"
        + "</tr>"
        + "</table>";
    rt += "<table width='100%' style='margin-bottom: 20px;border-bottom: 1px solid #3B9C3D;border-left:1px solid #3B9C3D;border-right: 1px solid #3B9C3D;border-bottom-left-radius: 4px;border-bottom-right-radius: 4px;width: 799px;margin-left: 9px' cellspacing='0' cellpadding='0' border='0'>"
        + "<tr>"
        + "<td>"
        + "<div style='width: 100%;height: 25px;'><span style='margin-left: 50px'></span>受体姓名"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input readonly style='width: 226px;border:none;background-color: #f7f7f7' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='dontor_doneeName' name='dontor_doneeName'>"
        + "<span style='margin-left: 50px'></span>受体患者地址"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input style='width: 226px;border:none;background-color: #f7f7f7' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='dontor_doneeAddress' name='dontor_doneeAddress'>"
        + "</div></td>"
        + "</tr>"
        + "<tr>"
        + "<td>"
        + "<div style='width: 100%;height: 25px;margin-left: 2px'><span style='margin-left: 20px'></span>受体证件类型"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input readonly style='width: 226px;border:none;background-color: #f7f7f7' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='dontor_doneeIdType' name='dontor_doneeIdType'>"
        + "<span style='margin-left: 50px'></span>受体证件号码"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input readonly style='width: 226px;border:none;background-color: #f7f7f7' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='dontor_doneeIdNo' name='dontor_doneeIdNo'>"
        + "</div></td>"
        + "</tr>"
        + "<tr>"
        + "<td>"
        + "<div style='width: 100%;height: 25px;margin-left: 2px'><span style='margin-left: 20px'></span>移植状态"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input readonly style='width: 226px;border:none;background-color: #f7f7f7' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='dontor_migrationStatus' name='dontor_migrationStatus'>"
        + "<span style='margin-left: 50px'></span>移植日期"
        + "&nbsp;&nbsp;&nbsp;&nbsp;"
        + "<input readonly style='width: 226px;border:none;background-color: #f7f7f7;padding-left: 30px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='dontor_migrationTime' name='dontor_migrationTime'>"
        + "</div></td>"
        + "</tr>"
        + "<tr>"
        + "<td>"
        + "<input hidden style='width: 100px' type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='inputId' name='inputId'>"
        + "</td>"
        + "<td>"
        + "<a style='text-decoration: underline;color: #3B9C3D;margin-left: -88px' onclick='lookShouTi(this)'>>>查看详情</a>"
        + "</td>"
        + "</tr>"
        + "</table>";
    rt += "</table>";
    var t = $(rt);
    return t;
}

function lookShouTi(obj) {
    debugger;
    var aId = obj.id.split("_")[0];
    var inputId = $("#" + aId).find("#inputId").val();
    queryShouTi(inputId);
}

function getGongTiSelectInfo() {
    calendarFun("takeTime");// 获取时间
    calendarFun("deathTime");// 捐献者死亡时间
    calendarFun("storageTime");// 保存日期时间
    calendarFun("coneaEvaluateTime");// 角膜评估日期时间
    // 证件类型下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag : Math.random(),
        fatherid: l_gt.donatorIdType
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function(i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#donatorIdType");
        });
    }
    // 与捐献者关系下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag : Math.random(),
        fatherid: l_gt.familyRelation
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function(i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#familyRelation");
        });
    }
    // 艾滋病病毒抗体（Anti-HIV）下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag : Math.random(),
        fatherid: l_gt.antiHiv
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function(i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#antiHiv");
        });
    }
    // 乙型肝炎表面抗原HBsAg下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag : Math.random(),
        fatherid: l_gt.hbsAg
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function(i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#hbsAg");
        });
    }
    // Anti-HBs下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag : Math.random(),
        fatherid: l_gt.antiHbs
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function(i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#antiHbs");
        });
    }
    // 抗乙型肝炎核心抗体Anti-HBc下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag : Math.random(),
        fatherid: l_gt.antiHbc
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function(i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#antiHbc");
        });
    }
    // 抗丙型肝炎病毒抗体Anti-HCV下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag : Math.random(),
        fatherid: l_gt.antiHcv
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function(i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#antiHcv");
        });
    }
    // 快速血浆反应素环状卡片试验-性病研究实验室试验（如梅毒）下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag : Math.random(),
        fatherid: l_gt.venerealDisease
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function(i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#venerealDisease");
        });
    }
    // 现病史下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag : Math.random(),
        fatherid: l_gt.hpi
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function(i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#hpi");
        });
    }
    // 家族史下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag : Math.random(),
        fatherid: l_gt.familyHistory
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function(i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#familyHistory");
        });
    }
    // 既往史下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag : Math.random(),
        fatherid: l_gt.previousHistory
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function(i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#previousHistory");
        });
    }
    // 个人史下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag : Math.random(),
        fatherid: l_gt.personalHistory
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function(i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#personalHistory");
        });
    }
    // 捐献者死亡原因下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag : Math.random(),
        fatherid: l_gt.deathReason
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function(i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#deathReason");
        });
    }
    // 获取材料类型下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag : Math.random(),
        fatherid: l_gt.materialType
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function(i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#materialType");
        });
    }
    // 派车或自费
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag : Math.random(),
        fatherid: l_gt.trafficType
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function(i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#trafficType");
        });
    }
    // 获取后转运保存方式下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag : Math.random(),
        fatherid: l_gt.transferType
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function(i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#transferType");
        });
    }
    // 角膜保存方式下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag : Math.random(),
        fatherid: l_gt.storageType
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function(i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#storageType");
        });
    }
    // 晶体类型下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag : Math.random(),
        fatherid: l_gt.crystalType
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function(i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#crystalType");
        });
    }
    // 获取的目的下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag : Math.random(),
        fatherid: l_gt.objective
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function(i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#objective");
        });
    }
    // 分配状态下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag : Math.random(),
        fatherid: l_gt.allocationStatus
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function(i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#allocationStatus");
        });
    }
    // 处理结果下拉框赋值
    var categoryDate = getJSONData("/publish/category/findCategorysByFatherId.htm", {// 根据员工工号获取对应的检查项目
        tag : Math.random(),
        fatherid: l_gt.processingResults
    }, "post");
    if (categoryDate.state) {
        var categoryList = categoryDate.obj;
        $.each(categoryList, function(i, d) {
            $("<option value=\"" + d.categoryid + "\">" + d.category + "</option>")
                .appendTo("#processingResults");
        });
    }
}

function queryfuzhi(data,state) {
    getGongTiSelectInfo();
    if (state=='query') {
        $("#eyeBank").val(data.list[0].eye_bank).attr("readonly","readonly");
        $("#bankTel").val(data.list[0].bank_tel).attr("readonly","readonly");
        $("#bankMobile").val(data.list[0].bank_mobile).attr("readonly","readonly");
        $("#bankEmail").val(data.list[0].bank_email).attr("readonly","readonly");
        $("#patientId").val(data.list[0].patient_Id).attr("readonly","readonly");
        $("#donatorNo").val(data.list[0].donator_No).attr("readonly","readonly");
        $("#donatorName").val(data.list[0].donator_Name).attr("readonly","readonly");
        utilTool().radioSelect('donatorSex', data.list[0].donator_Sex,
            state == 'query' ? $("#form_queryGongTi"): $("#form_updateGongTi"));// 性别
        $("#donatorAge").val(data.list[0].donator_Age).attr("readonly","readonly");
        $("#donatorNationality").val(data.list[0].donator_nationality).attr("readonly","readonly");
        $("#donatorIdType").val(data.list[0].donator_id_type).attr("readonly","readonly");
        $("#donatorIdNo").val(data.list[0].donator_id_No).attr("readonly","readonly");
        $("#belongHospital").val(data.list[0].belong_hospital).attr("readonly","readonly");
        $("#nowAddress").val(data.list[0].now_address).attr("readonly","readonly");
        $("#familyName").val(data.list[0].family_name).attr("readonly","readonly");
        $("#familyRelation").val(data.list[0].family_relation).attr("readonly","readonly");
        utilTool().radioSelect('donatorIntension', data.list[0].donator_intension,
            state == 'query' ? $("#form_queryGongTi"): $("#form_updateGongTi"));
        utilTool().radioSelect('expressIntension', data.list[0].express_intension,
            state == 'query' ? $("#form_queryGongTi"): $("#form_updateGongTi"));
        utilTool().radioSelect('familyIntension', data.list[0].family_intension,
            state == 'query' ? $("#form_queryGongTi"): $("#form_updateGongTi"));
        $("#antiHiv").val(data.list[0].anti_hiv).attr("readonly","readonly");
        $("#hbsAg").val(data.list[0].hbs_ag).attr("readonly","readonly");
        $("#antiHbs").val(data.list[0].anti_hbs).attr("readonly","readonly");
        $("#antiHbc").val(data.list[0].anti_hbc).attr("readonly","readonly");
        $("#antiHcv").val(data.list[0].anti_hcv).attr("readonly","readonly");
        $("#venerealDisease").val(data.list[0].venereal_disease).attr("readonly","readonly");
        $("#hpi").val(data.list[0].hpi).attr("readonly","readonly");
        $("#familyHistory").val(data.list[0].family_history).attr("readonly","readonly");
        $("#previousHistory").val(data.list[0].previous_history).attr("readonly","readonly");
        $("#personalHistory").val(data.list[0].personal_history).attr("readonly","readonly");
        $("#deathTime").val(time(data.list[0].death_time).format_yyyy_mm_dd).attr("readonly","readonly");
        $("#deathReason").val(data.list[0].death_reason).attr("readonly","readonly");
        $("#takeDepartment").val(data.list[0].take_department).attr("readonly","readonly");
        $("#materialType").val(data.list[0].material_Type).attr("readonly","readonly");
        $("#takeTime").val(time(data.list[0].take_Time).format_yyyy_mm_dd).attr("readonly","readonly");
        $("#takeAddress").val(data.list[0].take_address).attr("readonly","readonly");
        $("#takeMembers").val(data.list[0].take_members).attr("readonly","readonly");
        $("#trafficType").val(data.list[0].traffic_type).attr("readonly","readonly");
        utilTool().radioSelect('coldStorage', data.list[0].cold_storage,
            state == 'query' ? $("#form_queryGongTi"): $("#form_updateGongTi"));
        $("#transferType").val(data.list[0].transfer_type).attr("readonly","readonly");
        utilTool().radioSelect('eyeType', data.list[0].eye_Type,
            state == 'query' ? $("#form_queryGongTi"): $("#form_updateGongTi"));
        utilTool().radioSelect('isStoraged', data.list[0].is_storaged,
            state == 'query' ? $("#form_queryGongTi"): $("#form_updateGongTi"));
        $("#materialNo").val(data.list[0].material_no).attr("readonly","readonly");
        $("#storageTime").val(time(data.list[0].storage_time).format_yyyy_mm_dd).attr("readonly","readonly");
        $("#storageType").val(data.list[0].storage_type).attr("readonly","readonly");
        $("#coneaEvaluateTime").val(time(data.list[0].conea_evaluate_time).format_yyyy_mm_dd).attr("readonly","readonly");
        $("#scleroticRingWidth").val(data.list[0].sclerotic_ring_width).attr("readonly","readonly");
        $("#coneaDiam").val(data.list[0].conea_diam).attr("readonly","readonly");
        $("#hyalomereDiam").val(data.list[0].hyalomere_diam).attr("readonly","readonly");
        $("#crystalType").val(data.list[0].crystal_type).attr("readonly","readonly");
        utilTool().radioSelect('epitheliumSmooth', data.list[0].epithelium_smooth,
            state == 'query' ? $("#form_queryGongTi"): $("#form_updateGongTi"));
        utilTool().radioSelect('stromaClear', data.list[0].stroma_clear,
            state == 'query' ? $("#form_queryGongTi"): $("#form_updateGongTi"));
        utilTool().radioSelect('descemetFold', data.list[0].descemet_fold,
            state == 'query' ? $("#form_queryGongTi"): $("#form_updateGongTi"));
        $("#ecd").val(data.list[0].ecd).attr("readonly","readonly");
        utilTool().radioSelect('endotheliumDefect', data.list[0].endothelium_defect,
            state == 'query' ? $("#form_queryGongTi"): $("#form_updateGongTi"));
        $("#endothelialCellThickness").val(data.list[0].endothelial_cell_thickness).attr("readonly","readonly");
        utilTool().radioSelect('applicableScope', data.list[0].applicable_scope,
            state == 'query' ? $("#form_queryGongTi"): $("#form_updateGongTi"));
        $("#objective").val(data.list[0].objective).attr("readonly","readonly");
        $("#allocationStatus").val(data.list[0].allocation_Status).attr("readonly","readonly");
        $("#processingResults").val(data.list[0].processing_results).attr("readonly","readonly");
    } else if (state=='update'){
        $("#eyeBank").val(data.list[0].eye_bank).attr("readonly","readonly");
        $("#bankTel").val(data.list[0].bank_tel);
        $("#bankMobile").val(data.list[0].bank_mobile);
        $("#bankEmail").val(data.list[0].bank_email);
        $("#patientId").val(data.list[0].patient_Id);
        $("#donatorNo").val(data.list[0].donator_No);
        $("#donatorName").val(data.list[0].donator_Name);
        utilTool().radioSelect('donatorSex', data.list[0].donator_Sex,
            state == 'query' ? $("#form_queryGongTi"): $("#form_updateGongTi"));// 性别
        $("#donatorAge").val(data.list[0].donator_Age);
        $("#donatorNationality").val(data.list[0].donator_nationality);
        $("#donatorIdType").val(data.list[0].donator_id_type);
        $("#donatorIdNo").val(data.list[0].donator_id_No);
        $("#belongHospital").val(data.list[0].belong_hospital);
        $("#nowAddress").val(data.list[0].now_address);
        $("#familyName").val(data.list[0].family_name);
        $("#familyRelation").val(data.list[0].family_relation);
        utilTool().radioSelect('donatorIntension', data.list[0].donator_intension,
            state == 'query' ? $("#form_queryGongTi"): $("#form_updateGongTi"));
        utilTool().radioSelect('expressIntension', data.list[0].express_intension,
            state == 'query' ? $("#form_queryGongTi"): $("#form_updateGongTi"));
        utilTool().radioSelect('familyIntension', data.list[0].family_intension,
            state == 'query' ? $("#form_queryGongTi"): $("#form_updateGongTi"));
        $("#antiHiv").val(data.list[0].anti_hiv);
        $("#hbsAg").val(data.list[0].hbs_ag);
        $("#antiHbs").val(data.list[0].anti_hbs);
        $("#antiHbc").val(data.list[0].anti_hbc);
        $("#antiHcv").val(data.list[0].anti_hcv);
        $("#venerealDisease").val(data.list[0].venereal_disease);
        $("#hpi").val(data.list[0].hpi);
        $("#familyHistory").val(data.list[0].family_history);
        $("#previousHistory").val(data.list[0].previous_history);
        $("#personalHistory").val(data.list[0].personal_history);
        $("#deathTime").val(time(data.list[0].death_time).format_yyyy_mm_dd);
        $("#deathReason").val(data.list[0].death_reason);
        $("#takeDepartment").val(data.list[0].take_department);
        $("#materialType").val(data.list[0].material_Type);
        $("#takeTime").val(time(data.list[0].take_Time).format_yyyy_mm_dd);
        $("#takeAddress").val(data.list[0].take_address);
        $("#takeMembers").val(data.list[0].take_members);
        $("#trafficType").val(data.list[0].traffic_type);
        utilTool().radioSelect('coldStorage', data.list[0].cold_storage,
            state == 'query' ? $("#form_queryGongTi"): $("#form_updateGongTi"));
        $("#transferType").val(data.list[0].transfer_type);
        utilTool().radioSelect('eyeType', data.list[0].eye_Type,
            state == 'query' ? $("#form_queryGongTi"): $("#form_updateGongTi"));
        utilTool().radioSelect('isStoraged', data.list[0].is_storaged,
            state == 'query' ? $("#form_queryGongTi"): $("#form_updateGongTi"));
        $("#materialNo").val(data.list[0].material_no);
        $("#storageTime").val(time(data.list[0].storage_time).format_yyyy_mm_dd);
        $("#storageType").val(data.list[0].storage_type);
        $("#coneaEvaluateTime").val(time(data.list[0].conea_evaluate_time).format_yyyy_mm_dd);
        $("#scleroticRingWidth").val(data.list[0].sclerotic_ring_width);
        $("#coneaDiam").val(data.list[0].conea_diam);
        $("#hyalomereDiam").val(data.list[0].hyalomere_diam);
        $("#crystalType").val(data.list[0].crystal_type);
        utilTool().radioSelect('epitheliumSmooth', data.list[0].epithelium_smooth,
            state == 'query' ? $("#form_queryGongTi"): $("#form_updateGongTi"));
        utilTool().radioSelect('stromaClear', data.list[0].stroma_clear,
            state == 'query' ? $("#form_queryGongTi"): $("#form_updateGongTi"));
        utilTool().radioSelect('descemetFold', data.list[0].descemet_fold,
            state == 'query' ? $("#form_queryGongTi"): $("#form_updateGongTi"));
        $("#ecd").val(data.list[0].ecd);
        utilTool().radioSelect('endotheliumDefect', data.list[0].endothelium_defect,
            state == 'query' ? $("#form_queryGongTi"): $("#form_updateGongTi"));
        $("#endothelialCellThickness").val(data.list[0].endothelial_cell_thickness);
        utilTool().radioSelect('applicableScope', data.list[0].applicable_scope,
            state == 'query' ? $("#form_queryGongTi"): $("#form_updateGongTi"));
        $("#objective").val(data.list[0].objective);
        $("#allocationStatus").val(data.list[0].allocation_Status);
        $("#processingResults").val(data.list[0].processing_results);
    }
}

function queryShouTiInfo(data,i) {
    var migrationStatus ;
    if (data.migrationStatus == 446) {
        migrationStatus = '新鲜供体';
    } else if (data.migrationStatus == 447) {
        migrationStatus = '冰冻供体';
    }
    var doneeIdType;
    if (data.doneeIdType == 301) {
        doneeIdType = '身份证';
    }
    $('#table' + i).find("#inputId").val(data.id);
    $('#table' + i).find("#dontor_doneeName").val(data.doneeName);
    $('#table' + i).find("#dontor_doneeAddress").val(data.doneeAddress);
    $('#table' + i).find("#dontor_doneeIdType").val(doneeIdType);
    $('#table' + i).find("#dontor_doneeIdNo").val(data.doneeIdNo);
    $('#table' + i).find("#dontor_migrationStatus").val(migrationStatus);
    $('#table' + i).find("#dontor_migrationTime").val(time(data.migrationTime).format_yyyy_mm_dd);
}

function patsinhospital() {
    var pathospitaldiv = $("<div/>").attr("id","pathospitaldiv");
    $(pathospitaldiv).oimsDialog({
        icon : "edit",
        title : "在院患者",
        locked : true,
    });
    var ul=$("<ul/>").appendTo(pathospitaldiv);
    $.each(pat_dept,function(i,n) {
        $('<li class="treetitle"/>').text(n).appendTo(ul).data('deptCode', i).toggle(function () {
            var positionTable = $(this).next();
            positionTable.css({'display': 'block'});
            var data = getJSONData(findPatsInHospital, {
                tag: Math.random(),
                deptCode: $(this).data('deptCode')
            }, 'POST').obj;
            positionTable.empty();
            var length = data.length;
            if (!length) {
                return;
            }
            var tr;
            $.each(data, function (i, n) {
                if (!(i % 8)) {
                    tr = $('<tr/>').appendTo(positionTable);
                }
                var td = $('<td/>').appendTo(tr);
                var div = $('<div style="border:1px solid rgb(0,255,31)"/>').appendTo(td);
                div.append('<p style="text-align:left"><span>姓名:</span><span>' + n.name + '</span></p>');
                div.append('<p style="text-align:left"><span>性别:</span><span>' + n.sex + '</span></p>');
                div.append('<p style="text-align:left"><span>病历号:</span><span>' + n.patientId + '</span></p>');
                div.append('<p style="text-align:left"><span>出生日期:</span><span>' + formatDate(n.birthday.time) + '</span></p>');
                div.append('<p style="text-align:left"><span>床位号：</span><span>' + n.bedNo + '</span></p>');
                td.data('patientId', n.patientId).click(function () {
                    shoushu_patientid = $(this).data("patientId");
                    $("#pathospitaldiv").parent().prev().find('a').click();
                    $("#patientNo").val(shoushu_patientid);
                    $("#patientNo").blur();
                });
            });
        }, function () {
            $(this).next().css({'display': 'none'});
        });
        $("<table width='100%' border=0 cellspacing=0 style='display:none'/>").appendTo(ul);
    })
};

function look_jmyz() {
    importJS("/js/manager/emr/admission/corneaRecord.js");
    importJS("/emr/js/emr_quGuang.js");
    debugger;
    var dataObjects = getCheckBoxValue();
    var test = view_jmyz(dataObjects[0].patientId,dataObjects[0]);
    var look_qgbl_div = $("<div/>").attr("id","look_qgbl_div").append(test);
    $(look_qgbl_div).appendTo("#right");
    var back_btn = '<div id="back_btn_div" class="btn" style="height:30px;margin-left:48%;"><a onclick="return true;" href="javascript:back_list_look();"><span class="close" ></span>关闭</a></div>';
    $("#right").append(back_btn);
    removeDiv_openWin();
    $("#advquery").hide();
    $("#pageList").hide();
    document.getElementsByClassName("btn")[2].style.display="none";
}

function tbl_gt_add(){
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
        "<td nowrap='nowrap' align='center' style='width:12%' class='td_border'><input type='text' class='input80'  id='visitDate' name='visitDate'  style='border:0px;'/></td>" +
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
