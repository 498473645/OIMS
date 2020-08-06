package cn.com.oims.service.impl;

import cn.com.oims.dao.IJcxmFenleiDao;
import cn.com.oims.dao.pojo.JcxmFenlei;
import cn.com.oims.service.IJcxmFenleiService;
import java.io.Serializable;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JcxmFenleiServiceImpl implements IJcxmFenleiService {
  IJcxmFenleiDao dao = null;
  
  public IJcxmFenleiDao getDao() {
    return this.dao;
  }
  
  @Autowired
  public void setDao(IJcxmFenleiDao dao) {
    this.dao = dao;
  }
  
  public Serializable saveJcxmFenlei(JcxmFenlei jcxmfenlei) {
    return this.dao.saveJcxmFenlei(jcxmfenlei);
  }
  
  public void deleteJcxmFenlei(JcxmFenlei jcxmfenlei) {
    this.dao.deleteJcxmFenlei(jcxmfenlei);
  }
  
  public List findJcxmFenleisByJcxmId(Integer jcxmId) {
    return this.dao.findJcxmFenleisByJcxmId(jcxmId);
  }
  
  public List<JcxmFenlei> findJcxmFenleisByJcxmFenlei(JcxmFenlei jcxmfenlei) {
    return this.dao.findJcxmFenleisByJcxmFenlei(jcxmfenlei);
  }
}
