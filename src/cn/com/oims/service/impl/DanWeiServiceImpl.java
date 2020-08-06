package cn.com.oims.service.impl;

import cn.com.oims.dao.IDanWeiDao;
import cn.com.oims.dao.pojo.DanWei;
import cn.com.oims.service.IDanWeiService;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DanWeiServiceImpl implements IDanWeiService {
  IDanWeiDao dao = null;
  
  public IDanWeiDao getDao() {
    return this.dao;
  }
  
  @Autowired
  public void setDao(IDanWeiDao dao) {
    this.dao = dao;
  }
  
  @Override
  public Serializable saveDanWei(DanWei danwei) {
    return this.dao.saveDanWei(danwei);
  }
  
  @Override
  public void delDanWeiById(Serializable id) {
    this.dao.delDanWei(id);
  }
  
  @Override
  public void saveOrUpdateDanWei(DanWei o) {
    this.dao.saveOrUpdateDanWei(o);
  }
  
  @Override
  public List<DanWei> findAllDanWei() {
    return this.dao.findAllDanWei();
  }
  
  @Override
  public Map<String, Object> findAllDanWei4Page(Page page) {
    Map<String, Object> map = new HashMap<String, Object>();
    map.put("list", this.dao.findAllDanWei4Page(page));
    map.put("page", page);
    return map;
  }
  
  @Override
  public DanWei getDanWeiById(Serializable id) {
    return this.dao.findDanWeiById(id);
  }
  
  @Override
  public void updateDanWei(DanWei danwei) {
    this.dao.updateDanWei(danwei);
  }
  
  @Override
  public boolean getValidate(String dwmc) {
    List<DanWei> list = this.dao.findAllDanWei();
    for (DanWei dw : list) {
      if (dw.getDwmc().equals(dwmc)) {
        return false;
      }
    } 
    return true;
  }
}
