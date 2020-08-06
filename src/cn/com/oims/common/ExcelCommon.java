package cn.com.oims.common;

import java.util.Map;
import jxl.write.WritableSheet;

public class ExcelCommon {
  private WritableSheet writeHead(Map<Number, String> map) {
    WritableSheet sheet = null;
    map.put(Integer.valueOf(1), "id");
    map.put(Integer.valueOf(2), "cznr");
    map.put(Integer.valueOf(3), "czr");
    map.put(Integer.valueOf(4), "czsj");
    map.put(Integer.valueOf(5), "rzjb");
    map.put(Integer.valueOf(6), "czjg");
    return sheet;
  }
}
