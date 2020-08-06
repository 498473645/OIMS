package cn.com.oims.service;

import cn.com.oims.dao.pojo.OimsLog;
import cn.com.oims.web.form.LogSearchForm;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public interface IOimsLogService {
  OimsLog getOimsLogById(Serializable paramSerializable);
  
  Serializable saveOimsLog(OimsLog paramOimsLog);
  
  Serializable saveOimsLog(MyResult paramMyResult, int paramInt);
  
  void delOimsLogById(Serializable paramSerializable);
  
  void saveOrUpdateOimsLog(OimsLog paramOimsLog);
  
  void updateOimsLog(OimsLog paramOimsLog);
  
  List<Map<String, Object>> getLogInfoList(LogSearchForm paramLogSearchForm);
  
  Map<String, Object> findAllOimsLog4Page(Page paramPage, LogSearchForm paramLogSearchForm);
}
