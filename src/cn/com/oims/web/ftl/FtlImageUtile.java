package cn.com.oims.web.ftl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.util.Properties;
import org.junit.Test;
import sun.misc.BASE64Encoder;

public class FtlImageUtile {
  public static String getImageStr(File imgFile) {
    InputStream in = null;
    byte[] data = null;
    try {
      in = new FileInputStream(imgFile);
      data = new byte[in.available()];
      in.read(data);
      in.close();
    } catch (FileNotFoundException e) {
      e.printStackTrace();
    } catch (IOException e) {
      e.printStackTrace();
    } 
    BASE64Encoder encoder = new BASE64Encoder();
    return encoder.encode(data);
  }
  
  public static String getWebContentPath() {
    String webPath = null;
    try {
      String s = FtlImageUtile.class.getClassLoader().getResource("").toURI().toString();
      System.out.println(s);
      System.out.println(s.substring(6).substring(0, s.length() - 22));
      webPath = s.substring(6).substring(0, s.length() - 23);
    } catch (URISyntaxException e) {
      e.printStackTrace();
    } finally {}
    return webPath;
  }
  
  public static String yuanGongPhote2Str(String dataPath) {
    String path = getWebContentPath();
    path = path = String.valueOf(path) + dataPath;
    File f = new File(path);
    if (f.exists())
      return getImageStr(f); 
    return "";
  }
  
  @Test
  public void testPath() {
    String path = System.getProperty("user.dir");
    Properties p = System.getProperties();
    System.out.println("===========");
  }
  
  @Test
  public void test_YuanGongPhote2Str() {
    String s = yuanGongPhote2Str("/ygPhoto/201642717506822532912.jpg");
    String imageStr = getImageStr(new File("D:/file/workspace/eclipse/oims/OIMS/WebContent/ygPhoto/201642717506822532912.jpg"));
    String imageStr2 = getImageStr(new File("D:/file/workspace/eclipse/oims/OIMS/WebContent/ygPhoto/201642717506822532912.jpg"));
    System.out.println(s.equals(imageStr));
  }
  
  @Test
  public void image2Str() {
    String imageStr = getImageStr(new File("D:/file/workspace/eclipse/oims/OIMS/WebContent/ygPhoto/201642717506822532912.jpg"));
    System.out.println(imageStr);
  }
  
  @Test
  public void filePath() {
    try {
      String s = getClass().getClassLoader().getResource("").toURI().toString();
      System.out.println(s);
      System.out.println(s.substring(6).substring(0, s.length() - 23));
    } catch (URISyntaxException e) {
      e.printStackTrace();
    } 
  }
}
