package cn.com.oims.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;

public class QgUtil {
  public static String getQgtjMainSql(String realPath) {
    String sqlStr = "";
    try {
      String encoding = "UTF-8";
      File file = new File(realPath);
      if (file.isFile() && file.exists()) {
        InputStreamReader read = new InputStreamReader(
            new FileInputStream(file), encoding);
        BufferedReader bufferedReader = new BufferedReader(read);
        String lineTxt = null;
        while ((lineTxt = bufferedReader.readLine()) != null)
          sqlStr = String.valueOf(sqlStr) + lineTxt; 
        read.close();
      } else {
        System.out.println("找不到指定的文件");
      } 
    } catch (Exception e) {
      System.out.println("读取文件内容出错");
      e.printStackTrace();
    } 
    return sqlStr;
  }
}
