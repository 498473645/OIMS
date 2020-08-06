package cn.com.oims.common;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.channels.FileChannel;
import java.text.SimpleDateFormat;
import java.util.Date;

public class FileTool implements Runnable {
  public long fileCopy_Transfer(File file_Source, File file_Target) throws Exception {
    long time = (new Date()).getTime();
    int size_Memory = 20971520;
    int length = 2097152;
    FileInputStream fileInputStream = new FileInputStream(file_Source);
    FileOutputStream fileOutputStream = new FileOutputStream(file_Target);
    FileChannel fileChannel_fileInputStream = fileInputStream.getChannel();
    FileChannel fileChannel_fileOutputStream = fileOutputStream
      .getChannel();
    while (true) {
      if (fileChannel_fileInputStream.position() == fileChannel_fileInputStream
        .size()) {
        fileChannel_fileInputStream.close();
        fileChannel_fileOutputStream.close();
        return (new Date()).getTime() - time;
      } 
      if (fileChannel_fileInputStream.size() - fileChannel_fileInputStream
        .position() < size_Memory) {
        length = (int)(fileChannel_fileInputStream.size() - fileChannel_fileInputStream
          .position());
      } else {
        length = size_Memory;
      } 
      fileChannel_fileInputStream.transferTo(
          fileChannel_fileInputStream.position(), length, 
          fileChannel_fileOutputStream);
      fileChannel_fileInputStream.position(fileChannel_fileInputStream
          .position() + length);
    } 
  }
  
  public long fileCopy_Transfer(String path_Source, String path_Target) throws Exception {
    File file_Source = new File(path_Source);
    File file_Target = new File(path_Target);
    return fileCopy_Transfer(file_Source, file_Target);
  }
  
  public void putStringToFile(String path_Target, String stringObject) throws IOException {
    FileOutputStream fileOutputStream = new FileOutputStream(path_Target);
    OutputStreamWriter outputStreamWriter = new OutputStreamWriter(
        fileOutputStream, "UTF-8");
    BufferedWriter bufferedWriter = new BufferedWriter(outputStreamWriter);
    bufferedWriter.write(stringObject);
    bufferedWriter.close();
    outputStreamWriter.close();
    fileOutputStream.close();
  }
  
  public static void deleteFile(String path) {
    File file = new File(path);
    if (file.isFile() && file.exists())
      file.delete(); 
  }
  
  public static void deleteDirectory(String path) {
    File file = new File(path);
    if (!file.exists() || !file.isDirectory())
      return; 
    File[] files = file.listFiles();
    for (int i = 0; i < files.length; i++) {
      if (files[i].isFile()) {
        deleteFile(files[i].getAbsolutePath());
      } else {
        deleteDirectory(files[i].getAbsolutePath());
      } 
    } 
  }
  
  public static String getExtensionName(String filename) {
    if (filename != null && filename.length() > 0) {
      int last_index_dot = filename.lastIndexOf('.');
      if (last_index_dot > -1 && 
        last_index_dot < filename.length() - 1)
        return filename.substring(last_index_dot + 1); 
    } 
    return filename;
  }
  
  public static String getIdByFile(String filePath, Integer numberLength) {
    String nowDate = (new SimpleDateFormat("yyyyMMdd")).format(new Date());
    String id = "1";
    int Number = 1;
    File file = new File(filePath);
    System.out.println(file.getAbsolutePath());
    if (file.exists() && file.isFile())
      try {
        BufferedReader bufferedReader = new BufferedReader(new FileReader(file));
        String DateAndNumberFile = bufferedReader.readLine();
        if (bufferedReader != null)
          bufferedReader.close(); 
        if (DateAndNumberFile.subSequence(0, nowDate.length()).equals(
            nowDate)) {
          String idFile = DateAndNumberFile.substring(nowDate
              .length());
          Number = Integer.parseInt(idFile) + 1;
        } 
      } catch (FileNotFoundException e) {
        e.printStackTrace();
      } catch (IOException iOException) {} 
    id = (new StringBuilder(String.valueOf(Number))).toString();
    int count = numberLength.intValue() - id.length();
    for (int i = 0; i < count; i++)
      id = "0" + id; 
    id = String.valueOf(nowDate) + id;
    setIdByFile(filePath, id);
    return id;
  }
  
  public static void setIdByFile(String filePath, String currentId) {
    File file = new File(filePath);
    String nowDate = (new SimpleDateFormat("yyyyMMdd")).format(new Date());
    if (currentId.length() < nowDate.length() || 
      !nowDate.equals(currentId.subSequence(0, nowDate.length())))
      return; 
    BufferedWriter bufferedWriter = null;
    try {
      if (!file.exists() && !file.isFile())
        file.createNewFile(); 
      bufferedWriter = new BufferedWriter(new FileWriter(file));
      bufferedWriter.write(currentId);
      if (bufferedWriter != null)
        bufferedWriter.close(); 
    } catch (IOException e) {
      e.printStackTrace();
    } 
  }
  
  public static boolean deleteDir(File dir) {
    if (dir.isDirectory()) {
      String[] children = dir.list();
      for (int i = 0; i < children.length; i++) {
        boolean success = deleteDir(new File(dir, children[i]));
        if (!success)
          return false; 
      } 
    } 
    return dir.delete();
  }
  
  public void run() {
    try {
      Thread.sleep(1000L);
    } catch (InterruptedException interruptedException) {}
  }
}
