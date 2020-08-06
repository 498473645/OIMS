package cn.com.oims.service.impl;

import cn.com.oims.dao.IdataRecoverDao;
import cn.com.oims.service.IOimsDataRecoverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OimsDataRecoverServiceImpl implements IOimsDataRecoverService {
  IdataRecoverDao dao = null;
  
  public IdataRecoverDao getDao() {
    return this.dao;
  }
  
  @Autowired
  public void setDao(IdataRecoverDao dao) {
    this.dao = dao;
  }
  
  public String recover(String path, String[] a) {
    return this.dao.executeRecover(path, a);
  }
}
