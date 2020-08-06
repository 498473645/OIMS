package cn.com.oims.service.impl;

import cn.com.oims.dao.IBuMenDao;
import cn.com.oims.dao.pojo.BuMen;
import cn.com.oims.service.IBuMenService;
import cn.com.oims.web.form.BuMenSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BuMenServiceImpl implements IBuMenService {
  IBuMenDao dao = null;
  
  public IBuMenDao getDao() {
    return this.dao;
  }
  
  @Autowired
  public void setDao(IBuMenDao dao) {
    this.dao = dao;
  }
  
  @Override
  public Serializable saveBuMen(BuMen bumen) {
    return this.dao.saveBuMen(bumen);
  }
  
  @Override
  public void delBuMenById(Serializable id) {
    this.dao.delBuMen(id);
  }
  
  @Override
  public void saveOrUpdateBuMen(BuMen o) {
    this.dao.saveOrUpdateBuMen(o);
  }
  
  @Override
  public List<BuMen> findAllBuMen() {
    return this.dao.findAllBuMen();
  }
  
  @Override
  public BuMen getBuMenById(Serializable id) {
    return this.dao.findBuMenById(id);
  }
  
  @Override
  public void updateBuMen(BuMen bumen) {
    this.dao.updateBuMen(bumen);
  }
  
  @Override
  public List getBumenList(Page page, BuMenSearchForm bsf) {
    return this.dao.getBumenList(page, bsf);
  }
  
  @Override
  public BuMen GetBuMenByName(String name) {
    return this.dao.getBuMenByName(name);
  }
  
  @Override
  public List<Map<String, Object>> getBuMenList(BuMenSearchForm bsf) {
    return this.dao.getBuMenListInfo(bsf);
  }
  
  @Override
  public List<BuMen> getShebeiList(BuMen bsf) {
    return this.dao.getShebeiList(bsf);
  }
  
  @Override
  public Map<String, Object> bumenValidate(String bmbm, String bmmc) {
    Map<String, Object> map = new HashMap<String, Object>();
    boolean b1 = bmbmIsOk(bmbm);
    boolean b2 = bmmcIsOk(bmmc);
    if (b1 && b2) {
      map.put("validate", "yes");
      return map;
    } 
    if (!b1) {
      map.put("validate", "no");
      map.put("reason", "科室编码重复");
      return map;
    } 
    map.put("validate", "no");
    map.put("reason", "科室名称重复");
    return map;
  }
  
  private boolean bmmcIsOk(String bmmc) {
    List<BuMen> list = this.dao.findAllBuMen();
    for (BuMen b : list) {
      if (b.getBmmc().equals(bmmc)) {
        return false;
      }
    } 
    return true;
  }
  
  private boolean bmbmIsOk(String bmbm) {
    List<BuMen> list = this.dao.findAllBuMen();
    for (BuMen b : list) {
      if (b.getBmbm().equals(bmbm)) {
        return false;
      }
    } 
    return true;
  }
}
