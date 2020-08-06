package cn.com.oims.utils;

import cn.com.oims.common.Utils;
import cn.com.oims.web.ftl.FtlCgjl;
import cn.com.oims.web.ftl.FtlCykt;
import cn.com.oims.web.ftl.FtlFblw;
import cn.com.oims.web.ftl.FtlGzjl;
import cn.com.oims.web.ftl.FtlHdzl;
import cn.com.oims.web.ftl.FtlJtcy;
import cn.com.oims.web.ftl.FtlJypx;
import cn.com.oims.web.ftl.FtlQtry;
import cn.com.oims.web.ftl.FtlXwlw;
import cn.com.oims.web.ftl.FtlYuanGong;
import freemarker.template.Configuration;
import freemarker.template.DefaultObjectWrapper;
import freemarker.template.ObjectWrapper;
import freemarker.template.Template;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FtlTool {
  public static Object copyField(Object src, Object tag) throws RuntimeException {
    Field[] f_src = src.getClass().getDeclaredFields();
    Field[] f_tag = tag.getClass().getDeclaredFields();
    try {
      byte b;
      int i;
      Field[] arrayOfField;
      for (i = (arrayOfField = f_tag).length, b = 0; b < i; ) {
        Field ft = arrayOfField[b];
        ft.setAccessible(true);
        byte b1;
        int j;
        Field[] arrayOfField1;
        for (j = (arrayOfField1 = f_src).length, b1 = 0; b1 < j; ) {
          Field fs = arrayOfField1[b1];
          fs.setAccessible(true);
          if (fs.getName().equals(ft.getName())) {
            if (fs.get(src) == null)
              break; 
            if (fs.getType().equals(Date.class)) {
              String time = Utils.dateToStrShort((Date)fs.get(src));
              ft.set(tag, time);
              break;
            } 
            ft.set(tag, fs.get(src).toString());
            break;
          } 
          b1++;
        } 
        b++;
      } 
    } catch (Exception e) {
      e.printStackTrace();
      throw new RuntimeException("FtlBeanUtil 转换异常");
    } 
    return tag;
  }
  
  public static List copyField4List(List<Object> srcs, Class<?> tagClass) {
    List<Object> ftlDatas = new ArrayList(10);
    try {
      if (srcs == null || srcs.size() == 0)
        ftlDatas.add(tagClass.newInstance()); 
      for (Object obj : srcs) {
        Object ftl = copyField(obj, tagClass.newInstance());
        ftlDatas.add(ftl);
      } 
    } catch (Exception e) {
      e.printStackTrace();
      throw new RuntimeException("FtlBeanUtil toList 转换异常");
    } 
    return ftlDatas;
  }
  
  private static Configuration configuration = null;
  
  static {
    try {
      configuration = new Configuration();
      String path = FtlTool.class.getResource("/cn/com/oims/web/ftl").getFile();
      configuration.setDirectoryForTemplateLoading(new File(path));
      configuration.setObjectWrapper((ObjectWrapper)new DefaultObjectWrapper());
      configuration.setDefaultEncoding("utf-8");
    } catch (Exception e) {
      e.printStackTrace();
    } 
  }
  
  public static void freemarkerFileOutPut(Map<?, ?> data, String ftlName, OutputStream os) {
    try {
      Template ftlTemplate = configuration.getTemplate(String.valueOf(ftlName) + ".ftl");
      Writer writer = new OutputStreamWriter(os, "utf-8");
      ftlTemplate.process(data, writer);
      writer.close();
      os.close();
    } catch (Exception e) {
      e.printStackTrace();
    } 
  }
  
  public static void main(String[] args) {
    try {
      System.out.println("======start=====");
      Map<String, Object> data = new HashMap<>();
      data.put("gonghao", "123");
      FtlYuanGong yg = new FtlYuanGong();
      data.put("yg", yg);
      List<FtlJtcy> lstJtcy = new ArrayList<>(5);
      lstJtcy.add(new FtlJtcy());
      lstJtcy.add(new FtlJtcy());
      lstJtcy.add(new FtlJtcy());
      lstJtcy.add(new FtlJtcy());
      data.put("lstJtcy", lstJtcy);
      List<Object> lstJypx = new ArrayList(5);
      lstJypx.add(new FtlJypx());
      lstJypx.add(new FtlJypx());
      lstJypx.add(new FtlJypx());
      lstJypx.add(new FtlJypx());
      data.put("lstJypx", lstJypx);
      List<Object> lstGzjl = new ArrayList(10);
      lstGzjl.add(new FtlGzjl());
      lstGzjl.add(new FtlGzjl());
      lstGzjl.add(new FtlGzjl());
      lstGzjl.add(new FtlGzjl());
      data.put("lstGzjl", lstGzjl);
      List<Object> lstCgjl = new ArrayList(10);
      lstCgjl.add(new FtlCgjl());
      lstCgjl.add(new FtlCgjl());
      lstCgjl.add(new FtlCgjl());
      lstCgjl.add(new FtlCgjl());
      lstCgjl.add(new FtlCgjl());
      data.put("lstCgjl", lstCgjl);
      List<Object> lstCykt = new ArrayList(10);
      lstCykt.add(new FtlCykt());
      lstCykt.add(new FtlCykt());
      lstCykt.add(new FtlCykt());
      lstCykt.add(new FtlCykt());
      lstCykt.add(new FtlCykt());
      data.put("lstCykt", lstCykt);
      List<Object> lstFblw = new ArrayList(10);
      lstFblw.add(new FtlFblw());
      lstFblw.add(new FtlFblw());
      lstFblw.add(new FtlFblw());
      lstFblw.add(new FtlFblw());
      lstFblw.add(new FtlFblw());
      data.put("lstFblw", lstFblw);
      List<Object> lstXwlw = new ArrayList(10);
      lstXwlw.add(new FtlXwlw());
      lstXwlw.add(new FtlXwlw());
      lstXwlw.add(new FtlXwlw());
      lstXwlw.add(new FtlXwlw());
      lstXwlw.add(new FtlXwlw());
      data.put("lstXwlw", lstXwlw);
      List<Object> lstHdzl = new ArrayList(10);
      lstHdzl.add(new FtlHdzl());
      lstHdzl.add(new FtlHdzl());
      lstHdzl.add(new FtlHdzl());
      lstHdzl.add(new FtlHdzl());
      data.put("lstHdzl", lstHdzl);
      List<Object> lstQtry = new ArrayList(10);
      lstQtry.add(new FtlQtry());
      lstQtry.add(new FtlQtry());
      lstQtry.add(new FtlQtry());
      lstQtry.add(new FtlQtry());
      data.put("lstQtry", lstQtry);
      FileOutputStream fos = new FileOutputStream(new File("d:\\test.doc"));
      freemarkerFileOutPut(data, "yuangong", fos);
      System.out.println("=====over======");
    } catch (Exception e) {
      e.printStackTrace();
    } 
  }
}
