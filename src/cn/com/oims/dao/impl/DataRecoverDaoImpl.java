package cn.com.oims.dao.impl;

import cn.com.oims.dao.IdataRecoverDao;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.LineNumberReader;
import org.springframework.stereotype.Component;

@Component
public class DataRecoverDaoImpl extends BaseDaoImpl implements IdataRecoverDao {
  public String executeRecover(String path, String[] a) {
    Runtime runtime = Runtime.getRuntime();
    String info = "";
    try {
      Runtime rt = Runtime.getRuntime();
      String cmd = "mysql -h localhost -u " + a[0] + " -p" + a[1] + " oimsv3 < " + path;
      Process process = rt.exec("cmd /c " + cmd);
      InputStreamReader isr = new InputStreamReader(process.getErrorStream());
      LineNumberReader input = new LineNumberReader(isr);
      info = "成功";
      String line;
      while ((line = input.readLine()) != null) {
        info = "输入错误或文件错误";
        System.out.println(String.valueOf(line) + "~~~~~~~~~~");
      } 
      System.out.println("还原成功!");
    } catch (IOException e) {
      e.printStackTrace();
    } 
    return info;
  }
  
  public static void main(String[] args) {
    String[] a = { "root", "123" };
    (new DataRecoverDaoImpl()).executeRecover("D:\\yuangong.sql", a);
  }
}
