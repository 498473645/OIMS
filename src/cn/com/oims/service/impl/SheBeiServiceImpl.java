package cn.com.oims.service.impl;

import cn.com.oims.common.OimsCategoryConfig;
import cn.com.oims.dao.IBanGongShiDao;
import cn.com.oims.dao.ISheBeiDao;
import cn.com.oims.dao.pojo.BanGongShi;
import cn.com.oims.dao.pojo.SheBei;
import cn.com.oims.service.ISheBeiService;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SheBeiServiceImpl implements ISheBeiService {
  ISheBeiDao dao = null;
  
  @Autowired
  private IBanGongShiDao banGongShiDao;
  
  public ISheBeiDao getDao() {
    return this.dao;
  }
  
  @Autowired
  public void setDao(ISheBeiDao dao) {
    this.dao = dao;
  }
  
  public int countsOfSheBei() {
    return this.dao.countsOfSheBei();
  }
  
  public List<SheBei> findSheBeisByPage(Page page) {
    return this.dao.findSheBeisByPage(page);
  }
  
  public List<SheBei> findAllSheBeis() {
    return this.dao.findAllSheBeis();
  }
  
  public void deleteSheBeiById(Serializable id) {
    this.dao.deleteSheBeiById(id);
  }
  
  public Serializable saveSheBei(SheBei sheBei) {
    return this.dao.saveSheBei(sheBei);
  }
  
  public void saveOrUpdateSheBei(SheBei sheBei) {
    this.dao.saveOrUpdateSheBei(sheBei);
  }
  
  public void updateSheBei(SheBei sheBei) {
    this.dao.updateSheBei(sheBei);
  }
  
  public SheBei findSheBeiById(Serializable id) {
    return this.dao.findSheBeiById(id);
  }
  
  public List getShebeiListByManagerUser(String gonghao) {
    return this.dao.getShebeiListByManagerUser(gonghao);
  }
  
  public Map<String, Object> findAllSheBeisByPageAndSheBei(Page page, SheBei shebei) {
    Map<String, Object> map = new HashMap<>();
    map.put("list", this.dao.findAllSheBeisByPageAndSheBei(page, shebei));
    map.put("page", page);
    return map;
  }
  
  public void updateSheBeiBySheBei(SheBei shebei) {
    SheBei shebei_update = this.dao.findSheBeiById(shebei.getId());
    shebei_update.setQiyong(shebei.isQiyong());
    if (shebei.getJcxmIds() != null)
      shebei_update.setJcxmIds(shebei.getJcxmIds()); 
    this.dao.updateSheBei(shebei_update);
  }
  
  public List getShebeiListByManagerUserAndIp(String gonghao, String ip) {
    return this.dao.getShebeiListByManagerUserAndIp(gonghao, ip);
  }
  
  public SheBei getShebeiByLoginUserAndIp(String gonghao, String ip) {
    return this.dao.getShebeiByLoginUserAndIp(gonghao, ip);
  }
  
  public List<SheBei> getShebeisBySheBei(SheBei shebei) {
    return this.dao.getShebeisBySheBei(shebei);
  }
  
  public String getBgsIdByJcxmidAndBumenid(String jcxmid, int bumenid) {
    return this.dao.getBgsIdByJcxmidAndBumenid(jcxmid, bumenid);
  }
  
  public BanGongShi getSpecialLocation(Integer jcxmId) {
    String bgsId = getBgsIdByJcxmidAndBumenid(jcxmId.toString(), OimsCategoryConfig.WESTSOUTHHOSPITALAPARTMENT.intValue());
    return this.banGongShiDao.findBanGongShiById(Integer.valueOf(Integer.parseInt(bgsId)));
  }
  
  public List<SheBei> findSheBeiByJcxmIdAndIP(String jcxmId, String ip) {
    return this.dao.findSheBeiByJcxmIdAndIP(jcxmId, ip);
  }
}
