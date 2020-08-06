package cn.com.oims.service.impl;

import cn.com.oims.dao.IDiquDao;
import cn.com.oims.dao.pojo.Diqu;
import cn.com.oims.service.IDiquService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DiquServiceImpl implements IDiquService {
  private IDiquDao diquDao;
  
  @Autowired
  public void setDiquDao(IDiquDao diquDao) {
    this.diquDao = diquDao;
  }
  
  @Override
  public void saveDiqu(Diqu d) {
    this.diquDao.save(d);
  }
  
  @Override
  public void updateDiqu(Diqu d) {
    this.diquDao.update(d);
  }
  
  @Override
  public void delDiqu(Diqu d) {
    Diqu dq = this.diquDao.findById(d.getId());
    this.diquDao.del(dq);
  }
  
  @Override
  public Diqu findDiquById(Diqu d) {
    return this.diquDao.findById(d.getId());
  }
  
  @Override
  public List<Diqu> findDiquAll() {
    return this.diquDao.findAll();
  }
  
  @Override
  public List<Diqu> findDiqus(Integer fatherId) {
    return this.diquDao.findDiqus(fatherId);
  }
  
  @Override
  public Vector<Map<String, Object>> findDiquFull(int id) {
    Vector<Map<String, Object>> vec = new Vector<Map<String, Object>>();
    Diqu dq = this.diquDao.findById(Integer.valueOf(id));
    int i = 0;
    while (dq != null) {
      Map<String, Object> map = new HashMap<String, Object>();
      List<Diqu> list = this.diquDao.findDiqus(dq.getPid());
      map.put("id", dq.getId());
      map.put("list", list);
      vec.add(map);
      dq = this.diquDao.findById(dq.getPid());
      i++;
      if (i > 100) {
        throw new RuntimeException("太深的地区关联！");
      }
    } 
    return vec;
  }
}
