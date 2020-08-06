package cn.com.oims.dao.impl;

import cn.com.oims.dao.IdataBackupDao;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import org.springframework.stereotype.Component;

@Component
public class DataBackupDaoImpl implements IdataBackupDao {
  public String executeBackup(String path, String[] list) {
    String s = "";
    String command = "mysqldump -u " + list[0] + " -p" + list[1] + " --default-character-set=gbk " + 
      " -e --max_allowed_packet=1048576 --net_buffer_length=16384 oimsv3";
    Runtime runtime = Runtime.getRuntime();
    try {
      Process process = runtime.exec(command);
      InputStream in = process.getInputStream();
      int length = in.available();
      if (in.read() != -1) {
        File file = new File(path);
        file.getParentFile().mkdirs();
        file.createNewFile();
        FileOutputStream filestream = new FileOutputStream(file);
        int readBytes = 0;
        int bufferSize = 4096;
        byte[] buffer = new byte[bufferSize];
        String database = "-";
        filestream.write(database.getBytes());
        while (true) {
          readBytes = in.read(buffer);
          if (readBytes == -1)
            break; 
          filestream.write(buffer, 0, readBytes);
        } 
        filestream.close();
        in.close();
        s = "成功";
        System.out.println("123");
      } 
    } catch (Exception e) {
      e.printStackTrace();
      s = "失败";
    } finally {}
    return s;
  }
  
  public static void main(String[] args) {
    String[] a = { "root", "123" };
    (new DataBackupDaoImpl()).executeBackup("D:\\yuangong.sql", a);
  }
}
