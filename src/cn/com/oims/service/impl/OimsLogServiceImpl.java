package cn.com.oims.service.impl;

import cn.com.oims.dao.IOimsLogDao;
import cn.com.oims.dao.pojo.OimsLog;
import cn.com.oims.service.IOimsLogService;
import cn.com.oims.web.form.LogSearchForm;
import com.codesnet.common.MyResult;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OimsLogServiceImpl implements IOimsLogService {
  IOimsLogDao dao = null;
  
  public IOimsLogDao getDao() {
    return this.dao;
  }
  
  @Autowired
  public void setDao(IOimsLogDao dao) {
    this.dao = dao;
  }
  
  public Serializable saveOimsLog(OimsLog o) {
    return this.dao.saveOimsLog(o);
  }
  
  public void delOimsLogById(Serializable id) {
    this.dao.delOimsLog(id);
  }
  
  public void saveOrUpdateOimsLog(OimsLog o) {
    this.dao.saveOrUpdateOimsLog(o);
  }
  
  public List<Map<String, Object>> getLogInfoList(LogSearchForm lsf) {
    List<Map<String, Object>> list = this.dao.getLogInfoList(lsf);
    for (Map<String, Object> map : list) {
      if (Boolean.valueOf(map.get("czjg").toString()).booleanValue()) {
        map.put("czjg", "正常");
      } else {
        map.put("czjg", "异常");
      } 
      if (((Integer)map.get("rzjb")).intValue() == 0) {
        map.put("rzjb", "普通");
        continue;
      } 
      if (((Integer)map.get("rzjb")).intValue() == 1) {
        map.put("rzjb", "中等");
        continue;
      } 
      map.put("rzjb", "严重");
    } 
    return list;
  }
  
  public Map<String, Object> findAllOimsLog4Page(Page p, LogSearchForm lsf) {
    Map<String, Object> map = new HashMap<>();
    map.put("list", this.dao.findAllOimsLog4Page(p, lsf));
    map.put("page", p);
    return map;
  }
  
  public OimsLog getOimsLogById(Serializable id) {
    return this.dao.findOimsLogById(id);
  }
  
  public void updateOimsLog(OimsLog o) {
    this.dao.updateOimsLog(o);
  }
  
  public Serializable saveOimsLog(MyResult result, int level) {
    OimsLog log = new OimsLog();
    boolean x = (result.getState() == 1);
    log.setCzjg(x);
    log.setCznr(String.valueOf(result.getDoing()) + ":" + result.getMessage());
    log.setCzr(result.getGonghao());
    log.setCzsj(result.getDate());
    log.setRzjb(Integer.valueOf(level));
    log.setState(Integer.valueOf(0));
    return this.dao.saveOimsLog(log);
  }
}
