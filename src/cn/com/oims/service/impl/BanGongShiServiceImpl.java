package cn.com.oims.service.impl;

import cn.com.oims.dao.IBanGongShiDao;
import cn.com.oims.dao.IBuMenDao;
import cn.com.oims.dao.pojo.BanGongShi;
import cn.com.oims.dao.pojo.BuMen;
import cn.com.oims.service.IBanGongShiService;
import cn.com.oims.web.form.BanGongShiSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BanGongShiServiceImpl implements IBanGongShiService {
  IBanGongShiDao dao = null;
  
  IBuMenDao bumenDao = null;
  
  @Autowired
  public void setBumenDao(IBuMenDao bumenDao) {
    this.bumenDao = bumenDao;
  }
  
  @Autowired
  public void setDao(IBanGongShiDao dao) {
    this.dao = dao;
  }
  
  @Override
  public Serializable saveBanGongShi(BanGongShi bangongshi) {
    return this.dao.saveBanGongShi(bangongshi);
  }
  
  @Override
  public void delBanGongShiById(Serializable id) {
    this.dao.delBanGongShi(id);
  }
  
  @Override
  public void saveOrUpdateBanGongShi(BanGongShi o) {
    this.dao.saveOrUpdateBanGongShi(o);
  }
  
  @Override
  public List<BanGongShi> findAllBanGongShi() {
    return this.dao.findAllBanGongShi();
  }
  
  @Override
  public Map<String, Object> findAllBanGongShi4Page(Page p, BanGongShiSearchForm bgs) {
    Map<String, Object> m = new HashMap<String, Object>();
    m.put("list", this.dao.findAllBanGongShi4Page(p, bgs));
    m.put("page", p);
    return m;
  }
  
  @Override
  public BanGongShi getBanGongShiById(Serializable id) {
    return this.dao.findBanGongShiById(id);
  }
  
  @Override
  public void updateBanGongShi(BanGongShi bangongshi) {
    this.dao.updateBanGongShi(bangongshi);
  }
  
  @Override
  public List findAllBanGongShiByBuMenID(int id) {
    BuMen bumen = this.bumenDao.findBuMenById(Integer.valueOf(id));
    List<BanGongShi> list = new ArrayList<BanGongShi>();
    if (bumen != null && bumen.getOfficeId() != null && !"".equals(bumen.getOfficeId())) {
      list = this.dao.findAllBanGongShiByOfficeID(bumen.getOfficeId());
    }
    return list;
  }
  
  @Override
  public List findBuMenByBanGongShiID(int id) {
    List list = this.bumenDao.findBuMenByBanGongShiID(Integer.valueOf(id));
    return list;
  }
  
  @Override
  public int findBangongshiId(String name) {
    BanGongShi b = this.dao.findBangongshiId(name);
    return (b == null) ? -1 : b.getId().intValue();
  }
  
  @Override
  public Boolean getValidate(String bgs) {
    List<BanGongShi> list = this.dao.findAllBanGongShi();
    for (BanGongShi b : list) {
      if (b.getBgs().equals(bgs)) {
        return Boolean.valueOf(false);
      }
    } 
    return Boolean.valueOf(true);
  }
  
  @Override
  public BanGongShi findBanGongShiByBgs(String bgs) {
    return this.dao.findBanGongShiByBgs(bgs);
  }
}
