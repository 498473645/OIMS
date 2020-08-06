package cn.com.oims.common;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

public class FileBiz {
  public List<FileItem> getFileItem(HttpServletRequest request) throws Exception {
    List<FileItem> fileItems = new ArrayList<FileItem>();
    String vPath = "/UploadFile";
    String realPath = request.getSession().getServletContext().getRealPath(vPath);
    File tmpDir = new File(realPath);
    try {
      DiskFileItemFactory factory = new DiskFileItemFactory();
      factory.setSizeThreshold(10485760);
      factory.setRepository(tmpDir);
      ServletFileUpload sfu = new ServletFileUpload((FileItemFactory)factory);
      sfu.setFileSizeMax(1073741824L);
      sfu.setSizeMax(-2147483648L);
      fileItems = sfu.parseRequest(request);
    } catch (Exception e) {
      e.printStackTrace();
    } 
    return fileItems;
  }
  
  public void removeFile(String path) {
    removeFile(new File(path));
  }
  
  public void removeFile(File path) {
    if (path.isDirectory()) {
      File[] child = path.listFiles();
      if (child != null && child.length != 0)
        for (int i = 0; i < child.length; i++) {
          removeFile(child[i]);
          child[i].delete();
        }  
    } 
    path.delete();
  }
  
  public void delDirectory(String path) {
    File file = new File(path);
    if (file.isDirectory()) {
      File[] child = file.listFiles();
      if (child == null || child.length == 0)
        file.delete(); 
    } 
  }
  
  public void copyFile(String oldFilePath, String newPath, String photoId) {
    try {
      int bytesum = 0;
      int byteread = 0;
      File oldfile = new File(oldFilePath);
      if (oldfile.exists()) {
        if (!(new File(newPath)).isDirectory())
          (new File(newPath)).mkdirs(); 
        String sub = oldFilePath.substring(oldFilePath.lastIndexOf("."));
        String newFilePath = String.valueOf(newPath) + photoId + sub;
        InputStream inStream = new FileInputStream(oldFilePath);
        FileOutputStream fs = new FileOutputStream(newFilePath);
        byte[] buffer = new byte[1048576];
        while ((byteread = inStream.read(buffer)) != -1) {
          bytesum += byteread;
          fs.write(buffer, 0, byteread);
        } 
        inStream.close();
        fs.close();
      } 
    } catch (Exception e) {
      System.out.println("���Ƶ����ļ���������");
      e.printStackTrace();
    } 
  }
  
  public List ReadFile(String filePath) throws Exception {
    List<String> list = new ArrayList();
    try {
      File file = new File(filePath);
      if (file.exists()) {
        FileReader reader = new FileReader(filePath);
        BufferedReader br = new BufferedReader(reader);
        String s1 = null;
        while ((s1 = br.readLine()) != null)
          list.add(s1); 
        br.close();
        reader.close();
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    return list;
  }
  
  public List filterList(List<String> list, String condition) throws Exception {
    List<String> filterlist = new ArrayList();
    for (int i = 0; i < list.size(); i++) {
      String str = list.get(i);
      if (str.contains(condition))
        filterlist.add(str); 
    } 
    return filterlist;
  }
  
  public String getWebClassesPath() {
    String path = getClass().getProtectionDomain().getCodeSource()
      .getLocation().getPath();
    path = path.substring(0, path.indexOf("/eye"));
    return path;
  }
  
  public static void main(String[] arg) throws Exception {
    FileBiz fb = new FileBiz();
    System.out.println(fb.getWebClassesPath());
  }
}
