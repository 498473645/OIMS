package cn.com.oims.service.impl;

import cn.com.oims.dao.IYuYanDao;
import cn.com.oims.dao.pojo.YuYan;
import cn.com.oims.service.IYuYanService;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class YuYanServiceImpl implements IYuYanService {
  IYuYanDao dao = null;
  
  public IYuYanDao getDao() {
    return this.dao;
  }
  
  @Autowired
  public void setDao(IYuYanDao dao) {
    this.dao = dao;
  }
  
  public int countsOfYuYan() {
    return this.dao.countsOfYuYan();
  }
  
  public List<YuYan> findYuYansByPage(Page page) {
    return this.dao.findYuYansByPage(page);
  }
  
  public List<YuYan> findAllYuYans() {
    return this.dao.findAllYuYans();
  }
  
  public void deleteYuYanById(Serializable id) {
    this.dao.deleteYuYanById(id);
  }
  
  public Serializable saveYuYan(YuYan yuyan) {
    return this.dao.saveYuYan(yuyan);
  }
  
  public void saveOrUpdateYuYan(YuYan yuyan) {
    this.dao.saveOrUpdateYuYan(yuyan);
  }
  
  public void updateYuYan(YuYan yuyan) {
    this.dao.updateYuYan(yuyan);
  }
  
  public YuYan findYuYanById(Serializable id) {
    return this.dao.findYuYanById(id);
  }
  
  public YuYan findYuYanByIdAndFenLei(Integer id, Integer fenlei) {
    return this.dao.findYuYanByIdAndFenLei(id, fenlei);
  }
  
  public Map<String, Object> findAllYuYansByPageAndYuYan(Page page, YuYan yuyan) {
    Map<String, Object> map = new HashMap<>();
    List list = this.dao.findAllYuYansByPageAndYuYan(page, yuyan);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public void deleteYuYanByIdAndFenLei(Integer id, Integer fenlei) {
    this.dao.deleteYuYanByIdAndFenLei(id, fenlei);
  }
  
  public List<YuYan> findAllYuYansByYuYan(YuYan yuyan) {
    return this.dao.findAllYuYansByYuYan(yuyan);
  }
  
  public List<YuYan> findAllYuYansByIdsAndFenlei(String ids, Integer fenlei) {
    return this.dao.findAllYuYansByIdsAndFenlei(ids, fenlei);
  }
}
