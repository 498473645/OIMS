package cn.com.oims.common;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GetFileList {
  public static List getList(String path) {
    List<Map<Object, Object>> l = new ArrayList();
    File file = new File(path);
    File[] f = file.listFiles();
    try {
      for (int i = f.length - 1; i >= 0; i--) {
        if (f[i].isDirectory() && f[i] != null) {
          getList(f[i].getPath());
        } else if (f[i].getName().indexOf(".sql") != -1) {
          Map<Object, Object> map = new HashMap<Object, Object>();
          map.put("id", Integer.valueOf(i));
          map.put("path", f[i].getPath());
          map.put("time", longToDate(Long.valueOf(f[i].lastModified()).longValue()));
          l.add(map);
        } 
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } 
    return l;
  }
  
  public static String longToDate(long time) {
    SimpleDateFormat df = new SimpleDateFormat("yyyy年MM月dd日HH时mm分");
    String date = df.format(Long.valueOf(time));
    return date;
  }
  
  public static void main(String[] args) {
    List d = getList("D:\\workspace\\.metadata\\.plugins\\org.eclipse.wst.server.core\\tmp0\\wtpwebapps\\OIMSV3_danwei\\temp");
    System.out.println(d.size());
    for (int i = 0; i < d.size(); i++)
      System.out.println(d.get(i)); 
  }
}
