/**
 * 今日患者列表入口方法
 * @class showTodayHuanZheXinXiList
 * @type {showTodayHuanZheXinXiList}
 */
function showTodayHuanZheXinXiList(){
    pageTitle = '今日患者' ;
    init();
    new TodayHuanzheManager().viewInit() ;
} ;

/**
 * 今日患者类
 * @class todayHuanzheManager
 * @type {todayHuanzheManager}
 */
function TodayHuanzheManager(){

    var me = this ;         //事件中用me调用类中的方法
    var listFactor = null ;//列表元素

    /**
     * 初始化页面
     * @returns
     */
    this. viewInit = function(){

        this.workTool() ;//添加工作区的功能元素
        this.viewHzList() ;//添加工作区的列表元素

        //添加响应事件
        $("#aSearch").click(this.searchSumitHander);//查询事件
        $("#aAdvSearch").click(this.advSearchHander);//高级查询事件
        $("#inputSearch").click(this.inputSearchHander);//查询输入窗点击事件
        $("#inputSearch").focusout(this.inputSearchFocusoutHander);//查询输入窗失去焦点事件
    } ;

    /**
     * 页面添加查询元素
     * @returns
     */
    this.workTool = function(){
        var rt = "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
            + "<tr>"
            + "<td width='23%' class='leftalign'>" +
            "<input type='text' size='28' value='"+l_hz.inBlhOrHzXm+"' onblur=\"this.className='blur'\" onfocus=\"this.className='focus'\" id='inputSearch' class='blurview' name='search'></td>"
            + "<td width='9%'><a href='javascript:#' class='search' id='aSearch'>"+language.Query+"</a></td>"
            + "<td width='9%'><a href='javascript:#' class='advsearch' id='aAdvSearch'>"+language.AdvSearch+"</a></td>"
            + "<td width='59%'>"
            + "<div class='btn'>"
            + "</div>" + "</td>" + "</tr>" + "</table>";
        $("<div/>").attr("id", "advquery").addClass("advquery").appendTo("#right");
        $(rt).appendTo("#advquery");
    } ;

    /**
     * inputSearch失去焦点事件
     * @param eme {string}
     * @returns
     */
    this.inputSearchFocusoutHander = function(eme){
        var em = $(eme.currentTarget) ;
        if(em.val()==''){
            em.val(em.attr('tmp')) ;
        }
    } ;

    /**
     * inputSearch焦点事件
     * @param eme {string}
     * @returns
     */
    this.inputSearchHander = function(eme){
        var em = $(eme.currentTarget) ;
        if(em.val().indexOf(common_language.ShuRuLanguage)!=-1){
            em.attr('tmp',em.val()) ;
            em.val('') ;
            em.focus() ;
        }
    } ;

    /**
     * 查询方法
     * @returns
     */
    this.searchSumitHander = function(){
        var search = $("#inputSearch").val();
        search = search == l_hz.inBlhOrHzXm ? "" : search;
        var ldata = me.listParam() ;
        $.extend(ldata,{search : search}) ;
        $.extend(listFactor.data, ldata);
        $("#pageList").empty() ;
        $("#pageList").createPageList(listFactor);
        return false;
    } ;

    /**
     * 高级查询方法
     * @returns
     */
    this.advSearchHander = function(){
        me.advSearchForm() ;//因为是事件进入的方法，所以this是页面元素
        $('#jrhzAdvSubmit').click(me.jrhzAdvSubmitHander) ;//高级查询提交事件
        $('#jrhzAdvReset').click(me.jrhzAdvResetHander) ;  //高级查询重置事件
        return false;
    } ;

    /**
     * 高级查询弹出窗
     * @returns
     */
    this.advSearchForm = function(){
        var seniorSearchTemplate = this.advSearchFormElement();
        $.oimsBox({
            parentDiv : "advquery",// 将生成内容添加的id
            divContent : seniorSearchTemplate
        });
        calendarFun("zcrqStart");
        calendarFun("zcrqEnd");
    } ;

    /**
     * 高级查询提交方法
     * @returns
     */
    this.jrhzAdvSubmitHander = function(){
        var fp = me.formParam('advquery','inputSearch') ;
        $.extend(listFactor.data,  $.extend(me.listParam(),fp));
        $("#pageList").empty() ;
        $("#pageList").createPageList(listFactor);
        return false ;
    } ;

    /**
     * 重置高级查询
     * @returns
     */
    this.jrhzAdvResetHander = function(){
        me.formReset('advquery','inputSearch') ;
        return false ;
    } ;

    /**
     * 高级查询元素
     * @returns {*|jQuery|HTMLElement}
     */
    this.advSearchFormElement = function(){

        var rt = "<table width='100%' cellspacing='0' cellpadding='0' border='0'>"
            + " <tr>"
            + "<td width='7%' nowrap='nowrap' align='right'>"+l_hz.Name+"：</td>"
            + "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='xingming' name='xingming'>"
            + "</td>"
            + "<td width='7%' nowrap='nowrap' align='right'>"+l_hz.hzxb+"：</td>"
            + "<td width='18%'><input type='checkbox' name='xingbie' class = 'c_r_class' id='xingbie' value='1'/>"+l_hz.Male+"<input type='checkbox' name='xingbie' class = 'c_r_class' id='xingbie' value='0'/>"+l_hz.Female+"</td>"
            + "<td width='7%' nowrap='nowrap' align='right'> "+l_hz.SsDq+"：</td>"
            + "<td width='15%' id='ssdq_c'></td>"
            + "<td  nowrap='' align='right'>"+l_hz.Zcsj+"：</td>"
            + "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='zcrqStart' name='zcrqStart'>"
            + "</td>"
            + "<td  nowrap='nowrap' align='right'>"+l_hz.zhi+"</td>"
            + "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='zcrqEnd' name='zcrqEnd'>"
            + "</td>"
            + "</tr>"
            + " <tr>"
            + "<td width='7%' nowrap='nowrap' align='right'>"+l_hz.MobilePhone+"：</td>"
            + "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='shouji' name='shouji'>"
            + "</td>"
            + "<td width='7%' nowrap='nowrap' align='right'>"+l_hz.isYiBao+"：</td>"
            + "<td width='18%'><input type='checkbox' name='yibao' id='idSYiBao' class = 'c_r_class' value='1'/>"+l_hz.has+"<input type='checkbox' name='yibao' id='idNYiBao' class = 'c_r_class' value='0'/>"+l_hz.noHas+"</td>"
            + "<td width='7%' nowrap='nowrap' align='right'> "+l_hz.TeleNum+"：</td>"
            + "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='dianhua' name='dianhua'></td>"
            + "<td  nowrap='' align='right'>"+l_hz.HzAge+"：</td>"
            + "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='shengriStart' name='shengriStart'>"
            + "</td>"
            + "<td  nowrap='nowrap' align='right'>"+l_hz.zhi+"</td>"
            + "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='shengriEnd' name='shengriEnd'>"
            + "</td>"
            + "</tr>"
            + " <tr>"
            + "<td width='7%' nowrap='nowrap' align='right'>"+l_hz.DwTel+"：</td>"
            + "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='dwdh' name='dwdh'>"
            + "</td>"
            + "<td width='7%' nowrap='nowrap' align='right'>"+l_hz.fm+"：</td>"
            + "<td width='18%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='hzlxr' name='hzlxr'></td>"
            + "<td width='7%' nowrap='nowrap' align='right'> "+l_hz.JinJiTel+"：</td>"
            + "<td width='15%'><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='hzlxrdh' name='hzlxrdh'></td>"
            + "<td  nowrap='' align='right'>"+l_hz.Sfzh+"：</td>"
            + "<td colspan=3><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='sfzh' name='sfzh'>"
            + "</td>"
            + "</tr>"
            + " <tr>"
            + "<td width='7%' nowrap='nowrap' align='right'>"+l_hz.HzSource+"：</td>"
            + "<td align='left' colspan=4 id='laiyuans'></td>"
            + "<td  nowrap='nowrap' align='right'>"+l_hz.Jtdz+"：</td>"
            + "<td colspan=4><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='jtdz' name='jtdz'>"
            + "</td>"
            + "</tr>"
            + "<tr>"
            + "<td nowrap='nowrap' aling='right'>"+l_hz.BzFenLei+"：</td>"
            + "<td width='15%'><select id='bingZhongId'name='bingZhongId'><option value=''></option></select></td>"
            + "<td  nowrap='' align='right'>"+l_hz.JiuZhenJiLu+"：</td>"
            + "<td colspan=7><input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" name='bingLiKey' id='bingLiKey'/>"
            + "</tr>"
            + "</table>"
            + " <div class='avdopenbutton' >"
            + " <a href='javascript:#' id='jrhzAdvSubmit'><span class='advsumit'></span>"+language.Submit+"</a>"
            + " <a href='javascript:#' id='jrhzAdvReset'><span class='advreset'></span>"+language.Reset+"</a>"
            + "<a id = 'closeId'><span class='close' ></span>"+language.Close+"</a>"
            + " </div> ";

        var listparam = {
            fatherid : oimsCategory.HUANZHE_RESOURCES,
            tag : Math.random()
        } ;
        var list = getJSONData("/publish/category/findCategorysByFatherId.htm",listparam , "post");
        var t = $(rt);
        $.each(list.obj, function(i, v) {
            if (v == undefined)
                return;
            var ipt = "<input type='checkbox' value='" + v.categoryid
                + "' name='laiyuan' class = 'c_r_class' >" + "&nbsp;" + v.category + "&nbsp;&nbsp;";
            $("#laiyuans", t).append(ipt);
        });
        listparam = {
            fatherid : oimsCategory.BINGZHONG,
            tag : Math.random()
        } ;
        list = getJSONData("/publish/category/findCategorysByFatherId.htm",listparam , "post");

        $.each(list.obj, function(i, v) {
            if (v == undefined)
                return;
            var ipt = $("<option>").val(v.categoryid).text(v.category);
            $("#bingZhongId", t).append(ipt);
        });
        //<input type='text' class='blur' onfocus=\"this.className='focus'\" onblur=\"this.className='blur'\" id='diqu' name='diqu'>
        var dqparam = {id:"diqu",name:'diqu',url:"diqu/findAllDiqu.htm",chg:{id:"id",text:"name",index1:"index1",index2:"index2"}} ;
        var dq = $.auto(dqparam) ;
        $("#ssdq_c",t).append(dq) ;



        return t;
    } ;

    /**
     * 显示今日患者列表
     * @returns
     */
    this.viewHzList = function (){
        listFactor = {
            listObj : [
//                {
//                title : language.Seria,
//                key : "paihao"
//            },
                {
                title : l_hz.BingLiHao,
                key : "binglihao"
            }, {
                title : l_hz.XingMing,
                key : "xingming"
            }, {
                title : l_hz.Sex,
                key : "xingbie",
                func : function(v) {
                    if (v)
                        return l_hz.Male;
                    else
                        return l_hz.Female;
                }
            }, {
                title : l_hz.Birth,
                key : "shengri"
            }, {
                title : l_hz.Sfzh,
                key : "sfzh"
            }, {
                title : l_hz.MobilePhone,
                key : "shouji"
            }, {
                title : l_hz.WorkDW,
                key : "gzdw"
            }, {
                title : l_hz.Zcsj,
                key : "zcrq"
            }, {
                title : l_hz.SsDq,
                key : "diqu"
            } ],
            url : contextPath + "/publish/jzjl/findTodayHuanZhe.htm",
            method : "post",
            checkbox : true,
            single : false,
            data : this.listParam()
        };
        $("#pageList").remove() ;
        var div_list = $("<div />").attr("id", "pageList").attr("class", "list")
            .appendTo("#right");
        $(div_list).createPageList(listFactor);
    } ;
    this.listParam = function(){
    	return {// data表示传的参数
            currentPage : 1,
            pageSize : getPageSize(),// Page类的方法
            tag : Math.random()
        } ;
    } ;
    /**
     * 返回form元素数据
     * @param formParentID
     * @param excludeID
     * @returns
     */
    this.formParam = function(formParentID,excludeID){
        var fpDiv = $("#"+formParentID) ;
        var param = {} ;
        // 所有的text元素 为param赋值
        var texts = $("input[type='text']",fpDiv) ;
        $.each(texts,function(index,d){
            if($(d).val()!=""){
                if($(d).attr('id')!=excludeID)
                    param[$(d).attr('name')] = $(d).val() ;
            }
        }) ;
        //所有的checkbox元素 为param赋值
        var checkboxs = $("input[type='checkbox']",fpDiv) ;
        $.each(checkboxs,function(index,d){
            if($(d).val()!=""&&$(d).attr('checked')){
                if(param[$(d).attr('name')]==undefined)
                    param[$(d).attr('name')] = $(d).val() ;
                else
                    param[$(d).attr('name')]+=","+$(d).val() ;
            }
        }) ;
        //所有的select元素 为param赋值
        var selects = $('select',fpDiv) ;
        $.each(selects,function(index,d){
            if($(d).val()!="")
                param[$(d).attr('name')] = $(d).val() ;
        }) ;
        return param ;
    } ;

    /**
     * 重置form元素方法
     * @param formParentID
     * @param excludeID
     * @returns
     */
    this.formReset = function(formParentID,excludeID){
        var fpDiv = $("#"+formParentID) ;
        // 所有的text元素 为param赋值
        var texts = $("input[type='text']",fpDiv) ;
        $.each(texts,function(index,d){
            if($(d).attr('id')!=excludeID)
                $(d).val('') ;
        }) ;
        //所有的checkbox元素 为param赋值
        var checkboxs = $("input[type='checkbox']",fpDiv) ;
        $.each(checkboxs,function(index,d   ){
            $(d).attr('checked',false) ;
        }) ;
        //所有的select元素 为param赋值
        var selects = $('select',fpDiv) ;
        $.each(selects,function(index,d){
            $(d).find('option').each(function(i,o){
                if(i==0)
                    $(o).attr('selected',true) ;
                else
                    $(o).attr('selected',false) ;
            })  ;

        }) ;
    } ;

} ;