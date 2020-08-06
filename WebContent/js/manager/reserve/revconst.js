importJS("/js/manager/reserve/revutil.js");

utils.ns("jcxm");
utils.ns("category");
utils.ns("rev");
utils.ns("rev.revproj");
utils.ns("rev.revinfo");
utils.ns("rev.revchg");
utils.ns("common");
utils.ns("bumen");
utils.ns("user");
utils.ns("rev.form");
common.findLanById =  "/publish/yuyan/findYuYanByIdAndFenLei.htm";
jcxm.findByCategory = "/publish/revproj/findByCategory.htm";
var findUserYuanGongMap = "/publish/yuangong/getYuYueDoctorByQuanxian.htm";
category.findChildren = "/publish/oimsCategory/findCategories.htm";
var findAllBumenUrl = "/publish/bumen/findAllBuMen.htm";
user.findAllUser = "/publish/user/findAllUser.htm";
var findRevProjById = "/publish/revproj/findRevProjById.htm";
var delRevProjUrl = "/publish/revproj/delRevProj.htm";
rev.revproj.getJcxmIdByBumen = "/publish/revproj/getJcxmIdByBumen.htm";
var getRevProjByUser = "/publish/revproj/getRevProjByUser.htm";
var getJcxmByRevProjDetail = "/publish/revproj/getJcxmByRevProjDetail.htm";

//revinfo
var findRevInfoByUser = "/publish/revinfo/findRevInfoByUser.htm";
rev.revinfo.findRevInfoByRevProjNDt = "/publish/revinfo/findRevInfoByRevProjNDt.htm";
rev.revinfo.revInfoConfirm = "/publish/revinfo/revInfoConfirm.htm";
var delRevInfoUrl = "/publish/revinfo/delRevInfo.htm";
var getDateShow = "/publish/revinfo/getDateShow.htm";
rev.revinfo.findPatientMapByNo = "/publish/revinfo/findPatientMapByNo.htm";
rev.revinfo.getJcdByPatient = "/publish/revinfo/getJcdByPatient.htm";
var mrgRevInfoUrl = "/publish/revinfo/mrgRevInfo.htm";
rev.revinfo.getRevInfoById = "/publish/revinfo/getRevInfoById.htm";
rev.revinfo.getRevProjByJcxmNUser = "/publish/revinfo/getRevProjByJcxmNUser.htm";
rev.revinfo.getDateShowInit = "/publish/revinfo/getDateShowInit.htm";

//revchg
var getRevChgList = "/publish/revchg/getRevChgList.htm";
var getBumenByGonghaoUrl = "/publish/revchg/getDepartMent.htm";
var getProjByDepartMent = "/publish/revchg/getProjByDepartMent.htm";
var findByJcxmNBumen = "/publish/revchg/findByJcxmNBumen.htm";
var mrgRevChgUrl = "/publish/revchg/mrgRevChg.htm";
var mrgRevChgBatUrl = "/publish/revchg/mrgRevChgBat.htm";

//bumen
bumen.findBuMenByID = "/publish/bumen/findBuMenByID.htm";
