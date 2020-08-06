package cn.com.oims.common;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class CommonFunction {
  public static Long getNianlingByCsrq(String csrq) {
    Date now = new Date();
    Date bir = null;
    try {
      bir = (new SimpleDateFormat("yyyy-MM-dd")).parse(csrq);
    } catch (ParseException e) {
      e.printStackTrace();
    } 
    long curTime = now.getTime();
    long birTime = bir.getTime();
    long totalDays = (curTime - birTime) / 86400000L;
    return Long.valueOf(totalDays / 365L);
  }
  
  public static int getWeekDay(String strContainDate) {
    if (strContainDate.indexOf(" ") != -1)
      strContainDate = strContainDate.split(" ")[0]; 
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    Date date = null;
    try {
      date = dateFormat.parse(strContainDate);
    } catch (ParseException e) {
      e.printStackTrace();
    } 
    Calendar cd = Calendar.getInstance();
    cd.setTime(date);
    int mydate = cd.get(7);
    byte showDate;
    switch(mydate) {
      case 1:
        showDate = 0;
        break;
      case 2:
        showDate = 1;
        break;
      case 3:
        showDate = 2;
        break;
      case 4:
        showDate = 3;
        break;
      case 5:
        showDate = 4;
        break;
      case 6:
        showDate = 5;
        break;
      default:
        showDate = 6;
    }
    return showDate;
  }
  
  public static String covert24To12Time(String line) {
    SimpleDateFormat _24time = new SimpleDateFormat("HH:mm");
    SimpleDateFormat _12time = new SimpleDateFormat("hh:mm", Locale.ENGLISH);
    String outTime = "";
    String[] array = line.split(":");
    try {
      if (Integer.parseInt(array[0]) < 0 || 
        Integer.parseInt(array[0]) > 23)
        throw new Exception("输入时间错误！"); 
      if (Integer.parseInt(array[1]) < 0 || 
        Integer.parseInt(array[1]) > 59)
        throw new Exception("输入时间错误！"); 
      outTime = _12time.format(_24time.parse(line));
    } catch (Exception e) {
      e.printStackTrace();
    } 
    return outTime;
  }
  
  public static int countDays(String begin, String end) {
    int days = 0;
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    Calendar c_b = Calendar.getInstance();
    Calendar c_e = Calendar.getInstance();
    try {
      c_b.setTime(sdf.parse(begin));
      c_e.setTime(sdf.parse(end));
      while (c_b.before(c_e)) {
        days++;
        c_b.add(6, 1);
      } 
    } catch (ParseException pe) {
      pe.printStackTrace();
    } 
    return days;
  }
  
  public static String filterStr(String sourceStr, String targetStr) {
    String[] sStr = sourceStr.split(",");
    String[] tStr = targetStr.split(",");
    List<String> list = new ArrayList<String>();
    for (int i = 0; i < sStr.length; i++) {
      int count = 0;
      String s = sStr[i];
      for (int j = 0; j < tStr.length; j++) {
        String t = tStr[j];
        if (s.equals(t))
          count++; 
      } 
      if (count == 0)
        list.add(s); 
    } 
    String tmpStr = "";
    int k;
    for (k = 0; k < list.size() - 1; k++)
      tmpStr = String.valueOf(tmpStr) + (String)list.get(k) + ","; 
    if (k == list.size() - 1)
      tmpStr = String.valueOf(tmpStr) + (String)list.get(k); 
    return tmpStr;
  }
  
  public static boolean isContainChinese(String str) {
    if (str.length() < (str.getBytes()).length)
      return true; 
    return false;
  }
  
  public static void main(String[] args) {}
  
  public static Date randomDate(Date start, Date end) {
    try {
      if (start.getTime() >= end.getTime())
        return null; 
      long date = randomTime(start.getTime(), end.getTime());
      return new Date(date);
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    } 
  }
  
  private static long randomTime(long begin, long end) {
    long rtn = begin + (long)(Math.random() * (end - begin));
    if (rtn == begin || rtn == end)
      return randomTime(begin, end); 
    return rtn;
  }
}
