package cn.com.oims.common;

import com.codesnet.common.MultiUtils;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import org.springframework.web.multipart.MultipartFile;

public class FileUpOrDownLoad {
  public static String doFileUpLoad(MultipartFile multipartFile, String path_targetFile) {
    File file_targetFile = new File(path_targetFile);
    if (!file_targetFile.exists() && !file_targetFile.isDirectory())
      file_targetFile.mkdirs(); 
    boolean result_doFileUpLoad = true;
    String generateFilename = null;
    String path_outputStream = null;
    InputStream inputStream = null;
    OutputStream outputStream = null;
    try {
      if (multipartFile.getSize() > 0L) {
        inputStream = multipartFile.getInputStream();
        String originalFilename = multipartFile.getOriginalFilename();
        String originalFileFormat = originalFilename
          .substring(originalFilename.lastIndexOf("."));
        generateFilename = String.valueOf(MultiUtils.getTimeRodem()) + 
          originalFileFormat;
        path_outputStream = String.valueOf(path_targetFile) + File.separator + 
          generateFilename;
        outputStream = new FileOutputStream(path_outputStream);
        int readBytes = 0;
        int bufferSize = 8192;
        if (bufferSize > (int)multipartFile.getSize())
          bufferSize = (int)multipartFile.getSize(); 
        byte[] buffer = new byte[bufferSize];
        while (true) {
          readBytes = inputStream.read(buffer);
          if (readBytes == -1)
            break; 
          outputStream.write(buffer, 0, readBytes);
        } 
      } else {
        result_doFileUpLoad = false;
      } 
    } catch (IOException e) {
      result_doFileUpLoad = false;
    } finally {
      if (outputStream != null)
        try {
          outputStream.close();
        } catch (Exception exception) {} 
      if (inputStream != null)
        try {
          inputStream.close();
        } catch (Exception exception) {} 
    } 
    return result_doFileUpLoad ? generateFilename : null;
  }
  
  public static String doFileUpLoadName(MultipartFile multipartFile, String path_targetFile) {
    File file_targetFile = new File(path_targetFile);
    if (!file_targetFile.exists() && !file_targetFile.isDirectory())
      file_targetFile.mkdirs(); 
    boolean result_doFileUpLoad = true;
    String generateFilename = null;
    String path_outputStream = null;
    InputStream inputStream = null;
    OutputStream outputStream = null;
    try {
      if (multipartFile.getSize() > 0L) {
        inputStream = multipartFile.getInputStream();
        String originalFilename = multipartFile.getOriginalFilename();
        generateFilename = originalFilename;
        path_outputStream = String.valueOf(path_targetFile) + File.separator + 
          originalFilename;
        outputStream = new FileOutputStream(path_outputStream);
        int readBytes = 0;
        int bufferSize = 8192;
        if (bufferSize > (int)multipartFile.getSize())
          bufferSize = (int)multipartFile.getSize(); 
        byte[] buffer = new byte[bufferSize];
        while (true) {
          readBytes = inputStream.read(buffer);
          if (readBytes == -1)
            break; 
          outputStream.write(buffer, 0, readBytes);
        } 
      } else {
        result_doFileUpLoad = false;
      } 
    } catch (IOException e) {
      result_doFileUpLoad = false;
    } finally {
      if (outputStream != null)
        try {
          outputStream.close();
        } catch (Exception exception) {} 
      if (inputStream != null)
        try {
          inputStream.close();
        } catch (Exception exception) {} 
    } 
    return result_doFileUpLoad ? generateFilename : null;
  }
}
