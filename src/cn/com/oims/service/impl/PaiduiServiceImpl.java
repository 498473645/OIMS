package cn.com.oims.service.impl;

import cn.com.oims.dao.IPaiduiDao;
import cn.com.oims.dao.pojo.Paidui;
import cn.com.oims.service.IPaiduiService;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaiduiServiceImpl implements IPaiduiService {
  IPaiduiDao dao = null;
  
  public IPaiduiDao getDao() {
    return this.dao;
  }
  
  @Autowired
  public void setDao(IPaiduiDao dao) {
    this.dao = dao;
  }
  
  public Serializable savePaidui(Paidui o) {
    return this.dao.savePaidui(o);
  }
  
  public void delPaiduiById(Serializable id) {
    this.dao.delPaidui(id);
  }
  
  public void saveOrUpdatePaidui(Paidui o) {
    this.dao.saveOrUpdatePaidui(o);
  }
  
  public List<Paidui> findAllPaidui() {
    return this.dao.findAllPaidui();
  }
  
  public Map<String, Object> findAllPaidui4Page(Page p) {
    Map<String, Object> m = new HashMap<>();
    m.put("list", this.dao.findAllPaidui4Page(p));
    m.put("page", p);
    return m;
  }
  
  public Paidui getPaiduiById(Serializable id) {
    return this.dao.findPaiduiById(id);
  }
  
  public void updatePaidui(Paidui o) {
    this.dao.updatePaidui(o);
  }
  
  public boolean isBumenByIdToPaidui(Integer id) {
    return this.dao.isBumenByIdToPaidui(id);
  }
  
  public int getMaxXuHaoByBumenId(Integer bumenId) {
    return this.dao.getMaxXuHaoByBumenId(bumenId);
  }
}
