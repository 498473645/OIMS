package cn.com.oims.common;

import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class CheckTeleFormat {
  public static String checkphone(String photo) {
    if (photo != null && !"".equals(photo)) {
      String reisphoto = photo.replace("，", ",").replace(";", ",")
        .replace("；", ",").replace("　", ",").replace(" ", ",")
        .replace("/", ",").replace("\\", ",");
      String[] photo1 = reisphoto.split(",");
      String[] photo2 = new String[photo1.length];
      if (photo1 != null && photo1.length > 0) {
        for (int i = 0; i < photo1.length; i++) {
          boolean isfirst = false;
          if (photo1[i]
            .matches("(^[0-9]{3,4}-[0-9]{3,8}$)|^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|2|3|5|6|7|8|9])\\d{8}$")) {
            photo2[i] = photo1[i];
            isfirst = true;
          } 
          if (!isfirst && 
            photo1[i]
            .matches("(^[0-9]{3,4}-[0-9]{3,8}-[0-9]{0,100}$)|^((\\+86)|(86))?(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|2|3|5|6|7|8|9])\\d{8}$"))
            photo2[i] = photo1[i]; 
        } 
        if (photo2.length > 0)
          return photo2[0]; 
      } 
    } 
    return null;
  }
  
  public static boolean checkemail(String s) {
    boolean b = false;
    if (s != null && !s.equals(""))
      if (s.matches("(?=^[\\w.@]{6,50}$)\\w+@\\w+(?:\\.[\\w]{2,3}){1,2}")) {
        b = true;
      } else {
        b = false;
      }  
    return b;
  }
  
  public static boolean checkStringToInt(String s) {
    boolean b = true;
    if (s != null && !s.equals(""))
      if (s.matches("^[0-9]+$")) {
        b = true;
      } else {
        b = false;
      }  
    return b;
  }
  
  public static boolean checkPostcode(String s) {
    boolean b = true;
    if (s != null && !s.equals(""))
      if (s.matches("^[0-9]{6}$")) {
        b = true;
      } else {
        b = false;
      }  
    return b;
  }
  
  public static Date checkDate(String s) {
    if (s.indexOf(".") != -1)
      s = s.substring(0, s.lastIndexOf(".")); 
    Date b = null;
    SimpleDateFormat dfa = new SimpleDateFormat("yyyy-MM-dd HH:mm:SS");
    SimpleDateFormat dfb = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    SimpleDateFormat dfc = new SimpleDateFormat("yyyy-MM-dd");
    if (!s.equals("null") && !s.equals("")) {
      try {
        b = dfa.parse(s);
      } catch (ParseException e) {
        try {
          b = dfb.parse(s);
        } catch (ParseException e1) {
          try {
            b = dfc.parse(s);
          } catch (ParseException parseException) {}
        } 
      } 
    } else if (s.equals("") || s.equals("null")) {
      b = null;
    } 
    return b;
  }
  
  public static String getDateString(String s) {
    if (s.indexOf(".") != -1)
      s = s.substring(0, s.lastIndexOf(".")); 
    String b = "";
    SimpleDateFormat dfc = new SimpleDateFormat("yyyy-MM-dd");
    if (!s.equals("null") && !s.equals("")) {
      b = s.substring(0, s.lastIndexOf(" "));
    } else if (s.equals("") || s.equals("null")) {
      b = dfc.format(new Date());
    } 
    return b;
  }
  
  public static boolean checkFileName(String s) {
    boolean b = false;
    File f = new File(s);
    if (f.isFile())
      b = true; 
    return b;
  }
  
  public static void main(String[] args) {
    System.out.println(getDateString(""));
  }
}
