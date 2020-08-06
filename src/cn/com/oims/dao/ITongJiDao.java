package cn.com.oims.dao;

import cn.com.oims.web.form.ChartHql;
import com.codesnet.common.Page;
import java.util.Date;
import java.util.List;
import java.util.Map;

public interface ITongJiDao {
  List<Map<String, Object>> find4Chart(String paramString1, String paramString2, Date paramDate1, Date paramDate2);
  
  List<Map<String, Object>> find4ChartEx(String paramString1, String paramString2, String paramString3, Date paramDate1, Date paramDate2);
  
  List<Map<String, Object>> find4ChartHql(ChartHql paramChartHql, Map<String, Object> paramMap);
  
  Integer count(ChartHql paramChartHql, Map<String, Object> paramMap);
  
  List<Map<String, Object>> find4ListHql(ChartHql paramChartHql, Map<String, Object> paramMap, Page paramPage);
  
  List<Map<String, Object>> findYuanGongByBumen(String paramString);
  
  List<Map<String, Object>> findSheBieByBumen(String paramString1, String paramString2);
}
