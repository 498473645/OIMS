package cn.com.oims.service.impl;

import cn.com.oims.dao.IBaogaoMobanDao;
import cn.com.oims.dao.pojo.BaogaoMoban;
import cn.com.oims.service.IBaogaoMobanService;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BaogaoMobanServiceImpl implements IBaogaoMobanService {
  IBaogaoMobanDao dao = null;
  
  public IBaogaoMobanDao getDao() {
    return this.dao;
  }
  
  @Autowired
  public void setDao(IBaogaoMobanDao dao) {
    this.dao = dao;
  }
  
  @Override
  public Serializable saveBaogaoMoban(BaogaoMoban baogaomoban) {
    return this.dao.saveBaogaoMoban(baogaomoban);
  }
  
  @Override
  public void delBaogaoMobanById(Serializable id) {
    this.dao.delBaogaoMoban(id);
  }
  
  @Override
  public void saveOrUpdateBaogaoMoban(BaogaoMoban o) {
    this.dao.saveOrUpdateBaogaoMoban(o);
  }
  
  @Override
  public List<BaogaoMoban> findAllBaogaoMobans() {
    return this.dao.findAllBaogaoMobans();
  }
  
  @Override
  public Map<String, Object> findAllBaogaoMoban4Page(Page p) {
    Map<String, Object> m = new HashMap<String, Object>();
    m.put("list", this.dao.findAllBaogaoMoban4Page(p));
    m.put("page", p);
    return m;
  }
  
  @Override
  public BaogaoMoban getBaogaoMobanById(Serializable id) {
    return this.dao.findBaogaoMobanById(id);
  }
  
  @Override
  public void updateBaogaoMoban(BaogaoMoban baogaomoban) {
    this.dao.updateBaogaoMoban(baogaomoban);
  }
  
  @Override
  public Map<String, Object> findAllBaogaoMobansByPage(Page page, BaogaoMoban baogaomoban) {
    Map<String, Object> map = new HashMap<String, Object>();
    List list = this.dao.findAllBaogaoMobansByPage(page, baogaomoban);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  @Override
  public List<BaogaoMoban> findBaogaoMobansByBaogaoMoban(BaogaoMoban baogaomoban) {
    return this.dao.findBaogaoMobansByBaogaoMoban(baogaomoban);
  }
}
