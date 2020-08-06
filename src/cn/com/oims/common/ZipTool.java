package cn.com.oims.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class ZipTool {
  public void zip(String souceFileName, String destFileName) {
    File file = new File(souceFileName);
    try {
      zip(file, destFileName);
    } catch (IOException e) {
      e.printStackTrace();
    } 
  }
  
  public void zip(File souceFile, String destFileName) throws IOException {
    FileOutputStream fileOut = null;
    try {
      fileOut = new FileOutputStream(destFileName);
    } catch (FileNotFoundException e) {
      e.printStackTrace();
    } 
    ZipOutputStream out = new ZipOutputStream(fileOut);
    zip(souceFile, out, "");
    out.close();
  }
  
  public void zip(File souceFile, ZipOutputStream out, String base) throws IOException {
    if (souceFile.isDirectory()) {
      File[] files = souceFile.listFiles();
      out.putNextEntry(new ZipEntry(String.valueOf(base) + "/"));
      base = (base.length() == 0) ? "" : (String.valueOf(base) + "/");
      byte b;
      int i;
      File[] arrayOfFile1;
      for (i = (arrayOfFile1 = files).length, b = 0; b < i; ) {
        File file = arrayOfFile1[b];
        zip(file, out, String.valueOf(base) + file.getName());
        b++;
      } 
    } else {
      if (base.length() > 0) {
        out.putNextEntry(new ZipEntry(base));
      } else {
        out.putNextEntry(new ZipEntry(souceFile.getName()));
      } 
      System.out.println("filepath=" + souceFile.getPath());
      FileInputStream in = new FileInputStream(souceFile);
      byte[] by = new byte[1024];
      int b;
      while ((b = in.read(by)) != -1)
        out.write(by, 0, b); 
      in.close();
    } 
  }
}
