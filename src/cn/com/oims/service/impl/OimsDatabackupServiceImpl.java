package cn.com.oims.service.impl;

import cn.com.oims.dao.IdataBackupDao;
import cn.com.oims.service.IOimsDatabackupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OimsDatabackupServiceImpl implements IOimsDatabackupService {
  IdataBackupDao dao = null;
  
  public IdataBackupDao getDao() {
    return this.dao;
  }
  
  @Autowired
  public void setDao(IdataBackupDao dao) {
    this.dao = dao;
  }
  
  public String backup(String path, String[] list) {
    return this.dao.executeBackup(path, list);
  }
}
