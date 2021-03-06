package cn.com.oims.common;

import java.util.ArrayList;
import java.util.List;

public class ListClass {
  public static List getUserList() {
    List<List> l = new ArrayList<List>();
    List<String> list0 = new ArrayList();
    List<String> list1 = new ArrayList();
    list1.add("uid");
    list0.add("用户名");
    list1.add("password");
    list0.add("密码");
    list1.add("gonghao");
    list0.add("工号");
    list1.add("email");
    list0.add("邮箱");
    list1.add("jiaose");
    list0.add("角色");
    list1.add("rolevalue");
    list0.add("角色");
    list1.add("qiyong");
    list0.add("启用");
    list1.add("quanxian");
    list0.add("权限");
    list1.add("jishu");
    list0.add("级数");
    l.add(list0);
    l.add(list1);
    return l;
  }
  
  public static List getBuMenList() {
    List<List> l = new ArrayList<List>();
    List<String> list0 = new ArrayList();
    List<String> list1 = new ArrayList();
    list1.add("id");
    list0.add("序号");
    list1.add("dwid");
    list0.add("所属单位");
    list1.add("dwidValue");
    list0.add("所属单位");
    list1.add("bmbm");
    list0.add("科室编码");
    list1.add("officeId");
    list0.add("下属办公室");
    list1.add("officeIdValue");
    list0.add("下属办公室");
    list1.add("bmmc");
    list0.add("科室名称");
    list1.add("lxr");
    list0.add("负责人");
    list1.add("lxdh");
    list0.add("联系电话");
    list1.add("ywfw");
    list0.add("业务范围");
    l.add(list0);
    l.add(list1);
    return l;
  }
  
  public static List getSheBeiList() {
    List<List> l = new ArrayList<List>();
    List<String> list0 = new ArrayList();
    List<String> list1 = new ArrayList();
    list1.add("id");
    list0.add("序号");
    list1.add("sbmc");
    list0.add("设备名称");
    list1.add("ggxh");
    list0.add("规格型号");
    list1.add("bmId");
    list0.add("所属部门");
    list1.add("bmIdValue");
    list0.add("所属部门");
    list1.add("bgsId");
    list0.add("所属办公室");
    list1.add("bgsIdValue");
    list0.add("所属办公室");
    list1.add("ip");
    list0.add("IP");
    list1.add("smbUser");
    list0.add("设备用户");
    list1.add("smbPassword");
    list0.add("设备密码");
    list1.add("smbName");
    list0.add("设备名称");
    list1.add("online");
    list0.add("连接状态");
    list1.add("manageUser");
    list0.add("用户管理");
    list1.add("protocol");
    list0.add("主机/IP地址");
    list1.add("jcxmIds");
    list0.add("检查项目");
    list1.add("xmmc");
    list0.add("检查项目");
    list1.add("qiyong");
    list0.add("状态");
    l.add(list0);
    l.add(list1);
    return l;
  }
  
  public static List getPatientList() {
    List<List> l = new ArrayList<List>();
    List<String> list0 = new ArrayList();
    List<String> list1 = new ArrayList();
    list1.add("id");
    list0.add("序号");
    list1.add("diquId");
    list0.add("地区ID");
    list1.add("binglihao");
    list0.add("病历号");
    list1.add("xingming");
    list0.add("姓名");
    list1.add("xingbie");
    list0.add("性别");
    list1.add("shengri");
    list0.add("出生日期");
    list1.add("diqu");
    list0.add("所属地区");
    list1.add("sfzh");
    list0.add("身份证号");
    list1.add("gzdw");
    list0.add("工作单位");
    list1.add("dwyb");
    list0.add("dwyb");
    list1.add("dwdz");
    list0.add("单位地址");
    list1.add("dwdh");
    list0.add("单位电话");
    list1.add("jtdz");
    list0.add("家庭地址");
    list1.add("youbian");
    list0.add("邮编");
    list1.add("shouji");
    list0.add("手机号码");
    list1.add("dianhua");
    list0.add("电话");
    list1.add("hzlxr");
    list0.add("患者联系人");
    list1.add("hzlxrdh");
    list0.add("患者联系人电话");
    list1.add("yhzgx");
    list0.add("与患者关系");
    list1.add("yibao");
    list0.add("医保");
    list1.add("yibaohao");
    list0.add("医保号");
    list1.add("shangbao");
    list0.add("上报");
    list1.add("gongfei");
    list0.add("公费");
    list1.add("zcrq");
    list0.add("注册时间");
    list1.add("jilvren");
    list0.add("记录人");
    list1.add("beizhu");
    list0.add("备注");
    list1.add("laiyuan");
    list0.add("来源");
    list1.add("photourl");
    list0.add("photourl");
    l.add(list0);
    l.add(list1);
    return l;
  }
  
  public static List getYuanGongList() {
    List<List> l = new ArrayList<List>();
    List<String> list0 = new ArrayList();
    List<String> list1 = new ArrayList();
    list1.add("id");
    list0.add("序号");
    list1.add("gonghao");
    list0.add("工号");
    list1.add("bumenId");
    list0.add("所属科室");
    list1.add("bumenValue");
    list0.add("所属科室");
    list1.add("bgsId");
    list0.add("所属办公室");
    list1.add("bgsValue");
    list0.add("所属办公室");
    list1.add("xingming");
    list0.add("姓名");
    list1.add("zhiwu");
    list0.add("职务");
    list1.add("shengri");
    list0.add("生日");
    list1.add("diqu");
    list0.add("地区");
    list1.add("sfzh");
    list0.add("身份证号");
    list1.add("sfzh");
    list0.add("身份证号");
    list1.add("dianhua");
    list0.add("联系电话");
    list1.add("shouji");
    list0.add("手机");
    list1.add("jtdz");
    list0.add("家庭地址");
    list1.add("email");
    list0.add("邮箱");
    list1.add("jianjie");
    list0.add("简介");
    list1.add("xingbie");
    list0.add("性别");
    l.add(list0);
    l.add(list1);
    return l;
  }
  
  public static List getJcXmList() {
    List<List> l = new ArrayList<List>();
    List<String> list0 = new ArrayList();
    List<String> list1 = new ArrayList();
    list1.add("id");
    list0.add("序号");
    list1.add("bianma");
    list0.add("项目编码");
    list1.add("xmmc");
    list0.add("项目名称");
    list1.add("xmms");
    list0.add("项目描述");
    list1.add("fatherId");
    list0.add("项目类别");
    list1.add("fatherIdValue");
    list0.add("项目类别");
    list1.add("categoryId");
    list0.add("项目归类");
    list1.add("categoryIdValue");
    list0.add("项目归类");
    list1.add("leftPicPath");
    list0.add("左眼");
    list1.add("rightPicPath");
    list0.add("右眼");
    l.add(list0);
    l.add(list1);
    return l;
  }
  
  public static List getBaoGaoList() {
    List<List> l = new ArrayList<List>();
    List<String> list0 = new ArrayList();
    List<String> list1 = new ArrayList();
    list1.add("id");
    list0.add("序号");
    list1.add("jcdId");
    list0.add("检查单号");
    list1.add("bgys");
    list0.add("办公医生");
    list1.add("bgTime");
    list0.add("办公时间");
    list1.add("shys");
    list0.add("审核医生");
    list1.add("shTime");
    list0.add("审核时间");
    list1.add("jckj");
    list0.add("检查可见");
    list1.add("jcts");
    list0.add("检查提示");
    list1.add("state");
    list0.add("状态");
    list1.add("mobanId");
    list0.add("模版号");
    list1.add("mobanIdValue");
    list0.add("模版号");
    l.add(list0);
    l.add(list1);
    return l;
  }
  
  public static List getShuRuMoBanList() {
    List<List> l = new ArrayList<List>();
    List<String> list0 = new ArrayList();
    List<String> list1 = new ArrayList();
    list1.add("id");
    list0.add("序号");
    list1.add("shuru");
    list0.add("输入");
    list1.add("suoyin");
    list0.add("索引");
    list1.add("bmId");
    list0.add("所属科室");
    list1.add("bmIdValue");
    list0.add("所属科室");
    list1.add("jibie");
    list0.add("级别");
    list1.add("jibieValue");
    list0.add("级别");
    list1.add("categoryId");
    list0.add("分类");
    list1.add("categoryIdValue");
    list0.add("分类");
    list1.add("jcxmId");
    list0.add("检查项目");
    list1.add("jcxmIdValue");
    list0.add("检查项目");
    list1.add("gonghao");
    list0.add("操作人");
    list1.add("gonghaoValue");
    list0.add("操作人");
    list1.add("addTime");
    list0.add("操作时间");
    l.add(list0);
    l.add(list1);
    return l;
  }
  
  public static List getLogList() {
    List<List> l = new ArrayList<List>();
    List<String> list0 = new ArrayList();
    List<String> list1 = new ArrayList();
    list1.add("id");
    list0.add("序号");
    list1.add("cznr");
    list0.add("日志内容");
    list1.add("rzjb");
    list0.add("日志级别");
    list1.add("czsj");
    list0.add("生成时间");
    list1.add("czr");
    list0.add("操作人");
    list1.add("czjg");
    list0.add("状态");
    l.add(list0);
    l.add(list1);
    return l;
  }
  
  public static List getBaoGaoMoBanList() {
    List<List> l = new ArrayList<List>();
    List<String> list0 = new ArrayList();
    List<String> list1 = new ArrayList();
    list1.add("id");
    list0.add("序号");
    list1.add("biaoti");
    list0.add("标题\t");
    list1.add("moban");
    list0.add("模版\t");
    list1.add("jibie");
    list0.add("级别");
    list1.add("jibieValue");
    list0.add("级别");
    list1.add("jcxmIds");
    list0.add("检查项目");
    list1.add("jcxmIdsValue");
    list0.add("检查项目");
    list1.add("bumenId");
    list0.add("所属科室");
    list1.add("bumenIdValue");
    list0.add("所属科室");
    list1.add("gonghao");
    list0.add("操作人");
    list1.add("categoryId");
    list0.add("分类");
    list1.add("categoryIdValue");
    list0.add("分类");
    list1.add("url");
    list0.add("url");
    l.add(list0);
    l.add(list1);
    return l;
  }
  
  public static List getJcdList() {
    List<List> l = new ArrayList<List>();
    List<String> list0 = new ArrayList();
    List<String> list1 = new ArrayList();
    list1.add("id");
    list0.add("序号");
    list1.add("jcdh");
    list0.add("检查单号");
    list1.add("jiuzhenId");
    list0.add("就诊号");
    list1.add("biaoti");
    list0.add("标题");
    list1.add("jcsbId");
    list0.add("检查设备ID");
    list1.add("huanzheId");
    list0.add("患者号");
    list1.add("jcxmIds");
    list0.add("检查项目号");
    list1.add("jcxmIdsValue");
    list0.add("检查项目号");
    list1.add("kdksId");
    list0.add("开单科室");
    list1.add("kdksIdValue");
    list0.add("开单科室");
    list1.add("kdys");
    list0.add("开单医生");
    list1.add("kdysValue");
    list0.add("开单医生");
    list1.add("kdTime");
    list0.add("开单时间");
    list1.add("jcys");
    list0.add("检查医生");
    list1.add("jcysValue");
    list0.add("检查医生");
    list1.add("jcksTime");
    list0.add("检查开始时间");
    list1.add("jcjsTime");
    list0.add("检查结束时间");
    list1.add("leftPic");
    list0.add("左眼图片");
    list1.add("rightPic");
    list0.add("右眼图片");
    list1.add("jfbs");
    list0.add("计费标识");
    list1.add("biaoshi");
    list0.add("标识");
    list1.add("biaoshiValue");
    list0.add("标识");
    list1.add("yanbie");
    list0.add("眼别");
    list1.add("yanbieValue");
    list0.add("眼别");
    list1.add("jcyq");
    list0.add("检查要求");
    list1.add("state");
    list0.add("状态");
    l.add(list0);
    l.add(list1);
    return l;
  }
  
  public static List getFixedAssetsList() {
    List<List> l = new ArrayList<List>();
    List<String> list0 = new ArrayList();
    List<String> list1 = new ArrayList();
    list1.add("id");
    list0.add("序号");
    list1.add("category");
    list0.add("资产类别");
    list1.add("flowerNo");
    list0.add("资产编号");
    list1.add("name");
    list0.add("名称");
    list1.add("guige");
    list0.add("规格");
    list1.add("xinghao");
    list0.add("型号");
    list1.add("danwei");
    list0.add("单位");
    list1.add("price");
    list0.add("单价");
    list1.add("num");
    list0.add("数量");
    list1.add("money");
    list0.add("金额");
    list1.add("department");
    list0.add("所属单位");
    list1.add("userDepartment");
    list0.add("使用单位");
    list1.add("scrapFlag");
    list0.add("状态");
    list1.add("yongtu");
    list0.add("用途");
    list1.add("local");
    list0.add("所在位置");
    list1.add("operator");
    list0.add("保管人");
    list1.add("detalieduse");
    list0.add("详细用途");
    list1.add("information");
    list0.add("备注");
    l.add(list0);
    l.add(list1);
    return l;
  }
}
