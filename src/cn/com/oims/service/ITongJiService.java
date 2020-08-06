package cn.com.oims.service;

import cn.com.oims.web.form.ChartHql;
import com.codesnet.common.Page;
import java.io.File;
import java.util.List;
import java.util.Map;

public interface ITongJiService {
  List<Map<String, Object>> find4Chart(String paramString1, String paramString2, String paramString3, String paramString4);
  
  List<Map<String, Object>> find4ChartEx(String paramString1, String paramString2, String paramString3, String paramString4, String paramString5);
  
  List<Map<String, Object>> find4ChartHql(ChartHql paramChartHql, String paramString);
  
  Map<String, Object> find4ListHql(ChartHql paramChartHql, String paramString, Page paramPage);
  
  File find4Export(ChartHql paramChartHql, String paramString1, String paramString2) throws Exception;
  
  List<Map<String, Object>> findYuanGongByBumen(String paramString);
  
  List<Map<String, Object>> findSheBieByBumen(String paramString1, String paramString2);
}
