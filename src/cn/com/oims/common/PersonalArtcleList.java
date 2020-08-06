package cn.com.oims.common;

import java.util.ArrayList;
import java.util.List;

public class PersonalArtcleList {
  public static List getCGJL() {
    List<List> l = new ArrayList<List>();
    List<String> list0 = new ArrayList();
    List<String> list1 = new ArrayList();
    list1.add("classType");
    list0.add("成果级别");
    list1.add("project_name");
    list0.add("成果名称");
    list1.add("detailType");
    list0.add("成果类别");
    list1.add("finalTime");
    list0.add("获得时间");
    list1.add("fujian");
    list0.add("资料文件");
    list1.add("author");
    list0.add("作者");
    l.add(list0);
    l.add(list1);
    return l;
  }
  
  public static List getCYKT() {
    List<List> l = new ArrayList<List>();
    List<String> list0 = new ArrayList();
    List<String> list1 = new ArrayList();
    list1.add("classType");
    list0.add("课题级别");
    list1.add("project_name");
    list0.add("成果名称");
    list1.add("money");
    list0.add("获得经费");
    list1.add("user_name");
    list0.add("参与人员");
    list1.add("startTime");
    list0.add("开始时间");
    list1.add("endTime");
    list0.add("结束时间");
    list1.add("fujian");
    list0.add("资料文件");
    list1.add("author");
    list0.add("作者");
    l.add(list0);
    l.add(list1);
    return l;
  }
  
  public static List getFBLW() {
    List<List> l = new ArrayList<List>();
    List<String> list0 = new ArrayList();
    List<String> list1 = new ArrayList();
    list1.add("detailKind");
    list0.add("分类");
    list1.add("detailType");
    list0.add("论文类别");
    list1.add("project_name");
    list0.add("论文名称");
    list1.add("job");
    list0.add("发表期刊");
    list1.add("other");
    list0.add("期刊号（期、卷、页码）");
    list1.add("finalTime");
    list0.add("发表时间");
    list1.add("fujian");
    list0.add("资料文件");
    list1.add("author");
    list0.add("作者");
    l.add(list0);
    l.add(list1);
    return l;
  }
  
  public static List getXWLW() {
    List<List> l = new ArrayList<List>();
    List<String> list0 = new ArrayList();
    List<String> list1 = new ArrayList();
    list1.add("detailType");
    list0.add("论文类别");
    list1.add("project_name");
    list0.add("论文名称");
    list1.add("user_name");
    list0.add("指导老师");
    list1.add("finalTime");
    list0.add("发表时间");
    list1.add("fujian");
    list0.add("资料文件");
    list1.add("author");
    list0.add("作者");
    l.add(list0);
    l.add(list1);
    return l;
  }
  
  public static List getHDZL() {
    List<List> l = new ArrayList<List>();
    List<String> list0 = new ArrayList();
    List<String> list1 = new ArrayList();
    list1.add("detailType");
    list0.add("专利类型");
    list1.add("project_name");
    list0.add("专利名称");
    list1.add("job");
    list0.add("专利号");
    list1.add("finalTime");
    list0.add("获得时间");
    list1.add("fujian");
    list0.add("资料文件");
    list1.add("author");
    list0.add("作者");
    l.add(list0);
    l.add(list1);
    return l;
  }
  
  public static List getQTRY() {
    List<List> l = new ArrayList<List>();
    List<String> list0 = new ArrayList();
    List<String> list1 = new ArrayList();
    list1.add("classType");
    list0.add("奖励级别");
    list1.add("project_name");
    list0.add("奖励或荣誉名称");
    list1.add("content");
    list0.add("奖励事由");
    list1.add("finalTime");
    list0.add("获得时间");
    list1.add("fujian");
    list0.add("资料文件");
    list1.add("author");
    list0.add("作者");
    l.add(list0);
    l.add(list1);
    return l;
  }
  
  public static List getReturnTypeByClassType(String type) {
    if (type.equals("cgjl"))
      return getCGJL(); 
    if (type.equals("cykt"))
      return getCYKT(); 
    if (type.equals("fblw"))
      return getFBLW(); 
    if (type.equals("xwlw"))
      return getXWLW(); 
    if (type.equals("hdzl"))
      return getHDZL(); 
    if (type.equals("qtry"))
      return getQTRY(); 
    return null;
  }
}
