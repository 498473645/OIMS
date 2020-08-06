package cn.com.oims.common;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
import org.springframework.web.multipart.MultipartFile;

public class FavFTPUtil {
  public static boolean uploadFile(String hostname, int port, String username, String password, String pathname, String fileName, InputStream inputStream) {
    boolean flag = false;
    FTPClient ftpClient = new FTPClient();
    ftpClient.setControlEncoding("UTF-8");
    try {
      ftpClient.connect(hostname, port);
      ftpClient.login(username, password);
      int replyCode = ftpClient.getReplyCode();
      if (!FTPReply.isPositiveCompletion(replyCode))
        return flag; 
      ftpClient.setFileType(2);
      ftpClient.setBufferSize(1048576);
      ftpClient.makeDirectory(pathname);
      ftpClient.changeWorkingDirectory(pathname);
      BufferedInputStream input = new BufferedInputStream(inputStream);
      ftpClient.storeFile(fileName, input);
      inputStream.close();
      ftpClient.logout();
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      if (ftpClient.isConnected())
        try {
          ftpClient.disconnect();
        } catch (IOException e) {
          e.printStackTrace();
        }  
    } 
    if (ftpClient.isConnected())
      try {
        ftpClient.disconnect();
      } catch (IOException e) {
        e.printStackTrace();
      }  
    return flag;
  }
  
  public static boolean uploadFileFromProduction(String hostname, int port, String username, String password, String pathname, String filename, MultipartFile vediofile) {
    boolean flag = false;
    try {
      InputStream inputStream = vediofile.getInputStream();
      flag = uploadFile(hostname, port, username, password, pathname, 
          filename, inputStream);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    return flag;
  }
  
  public static boolean deleteFile(String hostname, int port, String username, String password, String pathname, String filename) {
    boolean flag = false;
    FTPClient ftpClient = new FTPClient();
    try {
      ftpClient.connect(hostname, port);
      ftpClient.login(username, password);
      int replyCode = ftpClient.getReplyCode();
      if (!FTPReply.isPositiveCompletion(replyCode))
        return flag; 
      ftpClient.changeWorkingDirectory(pathname);
      ftpClient.dele(filename);
      ftpClient.logout();
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      if (ftpClient.isConnected())
        try {
          ftpClient.logout();
        } catch (IOException iOException) {} 
    } 
    if (ftpClient.isConnected())
      try {
        ftpClient.logout();
      } catch (IOException iOException) {} 
    return flag;
  }
  
  public static boolean downloadFile(String hostname, int port, String username, String password, String pathname, String filename, String localpath) {
    boolean flag = false;
    FTPClient ftpClient = new FTPClient();
    try {
      ftpClient.connect(hostname, port);
      ftpClient.login(username, password);
      int replyCode = ftpClient.getReplyCode();
      if (!FTPReply.isPositiveCompletion(replyCode))
        return flag; 
      ftpClient.changeWorkingDirectory(pathname);
      FTPFile[] ftpFiles = ftpClient.listFiles();
      byte b;
      int i;
      FTPFile[] arrayOfFTPFile1;
      for (i = (arrayOfFTPFile1 = ftpFiles).length, b = 0; b < i; ) {
        FTPFile file = arrayOfFTPFile1[b];
        if (filename.equalsIgnoreCase(file.getName())) {
          File localFile = new File(String.valueOf(localpath) + "/" + file.getName());
          OutputStream os = new FileOutputStream(localFile);
          ftpClient.retrieveFile(file.getName(), os);
          os.close();
        } 
        b++;
      } 
      ftpClient.logout();
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      if (ftpClient.isConnected())
        try {
          ftpClient.logout();
        } catch (IOException iOException) {} 
    } 
    if (ftpClient.isConnected())
      try {
        ftpClient.logout();
      } catch (IOException iOException) {} 
    return flag;
  }
}
