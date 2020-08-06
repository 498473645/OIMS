package cn.com.oims.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.sql.Clob;
import java.sql.SQLException;

public class LxlUtil {
  public static String ClobToString(Clob clob) {
    String reString = "";
    Reader is = null;
    BufferedReader br = null;
    try {
      if (clob != null) {
        is = clob.getCharacterStream();
        br = new BufferedReader(is);
        String s = br.readLine();
        StringBuffer sb = new StringBuffer();
        while (s != null) {
          sb.append(s);
          s = br.readLine();
        } 
        reString = sb.toString();
        br.close();
        is.close();
      } 
    } catch (SQLException e) {
      e.printStackTrace();
    } catch (IOException e) {
      e.printStackTrace();
    } catch (Exception e) {
      try {
        if (br != null)
          br.close(); 
        if (is != null)
          is.close(); 
      } catch (IOException e1) {
        e1.printStackTrace();
      } 
    } 
    return reString;
  }
  
  public static String removeTag(String str) {
    while (str.lastIndexOf("<") > -1 && str.lastIndexOf(">") > -1) {
      int beginIndex = str.lastIndexOf("<");
      int endIndex = str.lastIndexOf(">");
      System.out.print(String.valueOf(beginIndex) + "--" + endIndex);
      str = String.valueOf(str.substring(0, beginIndex)) + str.substring(endIndex + 1, str.length());
    } 
    return str;
  }
  
  public static void main(String[] args) {
    String str = "a<span>b";
    str = removeTag(str);
    System.out.println(str);
  }
}
