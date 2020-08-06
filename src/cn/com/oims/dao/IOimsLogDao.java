package cn.com.oims.dao;

import cn.com.oims.dao.pojo.OimsLog;
import cn.com.oims.web.form.LogSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

public interface IOimsLogDao extends BaseDao {
  int counts();
  
  List<OimsLog> findAllOimsLog4Page(Page paramPage, LogSearchForm paramLogSearchForm);
  
  List<Map<String, Object>> getLogInfoList(LogSearchForm paramLogSearchForm);
  
  void delOimsLog(Serializable paramSerializable);
  
  Serializable saveOimsLog(OimsLog paramOimsLog);
  
  void saveOrUpdateOimsLog(OimsLog paramOimsLog);
  
  void updateOimsLog(OimsLog paramOimsLog);
  
  OimsLog findOimsLogById(Serializable paramSerializable);
}
