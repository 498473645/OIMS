package cn.com.oims.dao.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class Test {
  public static Date str2Date(String dateStr) throws Exception {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", 
        Locale.ENGLISH);
    try {
      return sdf.parse(dateStr);
    } catch (ParseException e) {
      return null;
    } catch (Exception e) {
      return null;
    } 
  }
  
  public static void main(String[] args) throws Exception {
    System.out.println(str2Date("20090909"));
  }
}
