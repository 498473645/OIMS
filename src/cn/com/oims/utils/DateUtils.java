package cn.com.oims.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import org.apache.commons.lang.StringUtils;

public final class DateUtils {
  public static final String DATE_FORMAT_DEFAULT = "yyyy-MM-dd";
  
  public static final String DATETIME_FORMAT_DEFAULT = "yyyy-MM-dd HH:mm:ss";
  
  public static String formatDate(Date dt, String formatstr) {
    DateFormat df = new SimpleDateFormat(
        StringUtils.isEmpty(formatstr) ? "yyyy-MM-dd" : 
        formatstr);
    return df.format(dt);
  }
  
  public static Date parseStr(String dtStr, String formatstr) {
    DateFormat df = new SimpleDateFormat(
        StringUtils.isEmpty(formatstr) ? "yyyy-MM-dd" : 
        formatstr);
    try {
      return df.parse(dtStr);
    } catch (ParseException e) {
      return null;
    } 
  }
  
  public static Date dateFormat(Date date, String pattern) {
    SimpleDateFormat format = new SimpleDateFormat(pattern);
    try {
      return format.parse(format.format(date));
    } catch (ParseException e) {
      return date;
    } 
  }
  
  public static int calculateAge(Date stop, Date start) {
    Calendar birthday = Calendar.getInstance();
    birthday.setTime(start);
    Calendar stopDate = Calendar.getInstance();
    stopDate.setTime(stop);
    int age = stopDate.get(1) - birthday.get(1);
    if (stopDate.get(2) - birthday.get(2) < 0) {
      age--;
    } else if (stopDate.get(2) - birthday.get(2) == 0 && 
      stopDate.get(5) - birthday.get(5) < 0) {
      age--;
    } 
    return age;
  }
  
  public static Date getLastDayOfMonth(Date dt) {
    Calendar cal = Calendar.getInstance();
    cal.setTime(dt);
    cal.add(2, 1);
    cal.add(5, -1);
    return cal.getTime();
  }
  
  public static void main(String[] args) {}
}
