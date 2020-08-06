package cn.com.oims.service.impl;

import cn.com.oims.dao.IYhpzDao;
import cn.com.oims.dao.pojo.Yhpz;
import cn.com.oims.service.IYhpzService;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class YhpzServiceImpl implements IYhpzService {
  IYhpzDao dao = null;
  
  public IYhpzDao getDao() {
    return this.dao;
  }
  
  @Autowired
  public void setDao(IYhpzDao dao) {
    this.dao = dao;
  }
  
  public int countsOfYhpz() {
    return this.dao.countsOfYhpz();
  }
  
  public List<Yhpz> findYhpzsByPage(Page page) {
    return this.dao.findYhpzsByPage(page);
  }
  
  public List<Yhpz> findAllYhpzs() {
    return this.dao.findAllYhpzs();
  }
  
  public void deleteYhpzById(Serializable id) {
    this.dao.deleteYhpzById(id);
  }
  
  public Serializable saveYhpz(Yhpz yhpz) {
    return this.dao.saveYhpz(yhpz);
  }
  
  public void saveOrUpdateYhpz(Yhpz yhpz) {
    this.dao.saveOrUpdateYhpz(yhpz);
  }
  
  public void updateYhpz(Yhpz yhpz) {
    this.dao.updateYhpz(yhpz);
  }
  
  public Yhpz findYhpzById(Serializable id) {
    return this.dao.findYhpzById(id);
  }
}
