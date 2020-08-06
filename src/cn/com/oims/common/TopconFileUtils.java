package cn.com.oims.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

public class TopconFileUtils {
  public static Map<String, String> getTopconTimeAndYb(String url) {
    File jpegFile = new File(url);
    Map<String, String> map = new HashMap<String, String>();
    try {
      InputStream fis = new FileInputStream(jpegFile);
      byte[] img = new byte[200];
      fis.read(img, 20, 133);
      String str = new String(img);
      String[] str1 = str.split(",");
      if (str1.length > 6) {
        if (str1[0].indexOf("MAGEnet") != -1 && str1[0].indexOf("gIMAGEnet") == -1) {
          return getTopconZaoYingTimeAndYb(url);
        }
        if (str1[0].indexOf("gIMAGEnet") != -1) {
          return getTopconYanDiCaoZhaoTimeAndYb(url);
        }
        return map;
      } 
      return map;
    } catch (Exception e) {
      e.printStackTrace();
      return map;
    } 
  }
  
  public static Map<String, String> getTopconZaoYingTimeAndYb(String url) {
    File jpegFile = new File(url);
    Map<String, String> map = new HashMap<String, String>();
    String time = "";
    String yb = "";
    String jcsj = "";
    try {
      InputStream fis = new FileInputStream(jpegFile);
      byte[] img = new byte[200];
      fis.read(img, 20, 133);
      String str = new String(img);
      String[] str1 = str.split(",");
      if (str1.length > 6 && 
        str1[0].indexOf("MAGEnet") != -1) {
        jcsj = String.valueOf(str1[3]) + " " + str1[4];
        time = str1[6];
        if (str1.length > 10) {
          if ("1".equals(str1[10])) {
            yb = "OD";
          } else if ("2".equals(str1[10])) {
            yb = "OS";
          } else {
            yb = "";
          } 
        } else {
          yb = "";
        } 
      } 
      if (!"".equals(time)) {
        (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).parse(jcsj);
        map.put("jcsj", jcsj);
        map.put("time", time);
        map.put("yb", yb);
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    return map;
  }
  
  public static Map<String, String> getTopconNeiPiJiShuTimeAndYb(String url) throws Exception {
    File jpegFile = new File(url);
    Map<String, String> map = new HashMap<String, String>();
    String time = "";
    String yb = "";
    String jcsj = "";
    InputStream fis = new FileInputStream(jpegFile);
    byte[] img = new byte[200];
    fis.read(img, 20, 133);
    String str = new String(img);
    String[] str1 = str.split(",");
    if (str1.length > 6) {
      jcsj = String.valueOf(str1[3]) + " " + str1[4];
      time = str1[6];
      if (str1.length > 10) {
        if ("1".equals(str1[10])) {
          yb = "OD";
        } else if ("2".equals(str1[10])) {
          yb = "OS";
        } else {
          yb = "";
        } 
      } else {
        yb = "";
      } 
    } 
    map.put("jcsj", jcsj);
    map.put("time", time);
    map.put("yb", yb);
    return map;
  }
  
  public static Map<String, String> getTopconYanDiCaoZhaoTimeAndYb(String url) throws Exception {
    File jpegFile = new File(url);
    Map<String, String> map = new HashMap<String, String>();
    String time = "";
    String yb = "";
    String jcsj = "";
    InputStream fis = new FileInputStream(jpegFile);
    byte[] img = new byte[200];
    fis.read(img, 20, 133);
    String str = new String(img);
    String[] str1 = str.split(",");
    if (str1.length > 6 && 
      str1[0].indexOf("gIMAGEnet") != -1) {
      jcsj = String.valueOf(str1[2]) + " " + str1[3];
      time = str1[5];
      if (str1.length > 10) {
        if ("1".equals(str1[9])) {
          yb = "OD";
        } else if ("2".equals(str1[9])) {
          yb = "OS";
        } else {
          yb = "";
        } 
      } else {
        yb = "";
      } 
    } 
    map.put("jcsj", jcsj);
    map.put("time", time);
    map.put("yb", yb);
    return map;
  }
  
  public static void main(String[] args) {
    try {
      Map<String, String> map = getTopconYanDiCaoZhaoTimeAndYb("D:\\work\\中山大学眼科中心项目开发资料\\picdata\\彩照\\IM000002.JPG");
      System.out.println(map.get("jcsj"));
      System.out.println(map.get("time"));
      System.out.println(map.get("yb"));
    } catch (Exception e) {
      e.printStackTrace();
    } 
  }
}
