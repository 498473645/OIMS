package cn.com.oims.service.impl;

import cn.com.oims.dao.IBaogaoDao;
import cn.com.oims.dao.pojo.Baogao;
import cn.com.oims.service.IBaogaoService;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BaogaoServiceImpl implements IBaogaoService {
  IBaogaoDao dao = null;
  
  public IBaogaoDao getDao() {
    return this.dao;
  }
  
  @Autowired
  public void setDao(IBaogaoDao dao) {
    this.dao = dao;
  }
  
  @Override
  public Serializable saveBaogao(Baogao baogao) {
    return this.dao.saveBaogao(baogao);
  }
  
  @Override
  public void delBaogaoById(Serializable id) {
    this.dao.delBaogao(id);
  }
  
  @Override
  public void saveOrUpdateBaogao(Baogao o) {
    this.dao.saveOrUpdateBaogao(o);
  }
  
  @Override
  public List<Baogao> findAllBaogao() {
    return this.dao.findAllBaogao();
  }
  
  @Override
  public Map<String, Object> findAllBaogao4Page(Page p) {
    Map<String, Object> m = new HashMap<String, Object>();
    m.put("list", this.dao.findAllBaogao4Page(p));
    m.put("page", p);
    return m;
  }
  
  @Override
  public Baogao getBaogaoById(Serializable id) {
    return this.dao.findBaogaoById(id);
  }
  
  @Override
  public void updateBaogao(Baogao o) {
    this.dao.updateBaogao(o);
  }
  
  @Override
  public Baogao findBaogaoByJcdId(Long jcdId) {
    return this.dao.findBaogaoByJcdId(jcdId);
  }
  
  @Override
  public void deleteBaogaoByJcdId(Long jcdId) {
    this.dao.deleteBaogaoByJcdId(jcdId);
  }
  
  @Override
  public void updateBaogaoByBaogao(Baogao baogao) {
    this.dao.updateBaogaoByBaogao(baogao);
  }
  
  @Override
  public Baogao findBaogaoByBaogao(Baogao baogao) {
    return this.dao.findBaogaoByBaogao(baogao);
  }
  
  @Override
  public void deleteBaogaoByBaogao(Baogao baogao) {
    this.dao.deleteBaogaoByBaogao(baogao);
  }
  
  @Override
  public List<Baogao> findBaogaosByBaogao(Baogao baogao) {
    return this.dao.findBaogaosByBaogao(baogao);
  }
  
  @Override
  public void deleteBaogaoByBaogao(String className, Long jcdId) {
    this.dao.deleteBaogaoByBaogao(className, jcdId);
  }
}
