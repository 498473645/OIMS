package cn.com.oims.service.impl;

import cn.com.oims.dao.IManageItemDao;
import cn.com.oims.dao.pojo.Manageitem;
import cn.com.oims.service.IManageItemService;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ManageItemServiceImpl implements IManageItemService {
  IManageItemDao dao = null;
  
  @Autowired
  public void setDao(IManageItemDao dao) {
    this.dao = dao;
  }
  
  public Serializable saveManageitem(Manageitem o) {
    return this.dao.saveManageItem(o);
  }
  
  public void delManageitemById(Serializable id) {
    this.dao.delManageItem(id);
  }
  
  public void saveOrUpdateManageitem(Manageitem o) {
    this.dao.saveOrUpdateManageItem(o);
  }
  
  public List<Manageitem> findAllManageitem() {
    return this.dao.findAllManageItem();
  }
  
  public Map<String, Object> findAllManageitem4Page(Page p) {
    Map<String, Object> m = new HashMap<>();
    m.put("list", this.dao.findAllManageItem4Page(p));
    m.put("page", p);
    return m;
  }
  
  public Manageitem getManageitemById(Serializable id) {
    return this.dao.findManageItemById(id);
  }
  
  public void updateManageitem(Manageitem o) {
    this.dao.updateManageItem(o);
  }
  
  public List<Manageitem> findManageitemListByCategoryId(Integer categoryId) {
    return this.dao.findManageitemListByCategoryId(categoryId);
  }
  
  public void updateManageitemState(boolean state, Long id) {
    Manageitem item = this.dao.findManageItemById(id);
    item.setState(state);
    this.dao.updateManageItem(item);
  }
  
  public void updateUserConfState(boolean state, Long id, int categoryId) {
    List<Manageitem> list = this.dao.findManageitemListNotIdByCategoryId(
        state, id, Integer.valueOf(categoryId));
    Iterator<Manageitem> iterator = list.iterator();
    while (iterator.hasNext()) {
      Manageitem manageitem = iterator.next();
      manageitem.setState(state);
      this.dao.updateManageItem(manageitem);
    } 
  }
  
  public void updateManageitemVals(Integer vals, Long id) {
    Manageitem item = this.dao.findManageItemById(id);
    item.setVals(String.valueOf(vals));
    this.dao.updateManageItem(item);
  }
  
  public Manageitem getUserConfState(boolean state, int categoryId) {
    return this.dao.getUserConfState(state, categoryId);
  }
  
  public Manageitem updateManageitemVals(Manageitem mi) {
    Manageitem m = this.dao.findManageItemById(mi.getId());
    m.setVals(mi.getVals());
    this.dao.updateManageItem(m);
    return m;
  }
  
  public Manageitem updateManageitemState(Manageitem mi) {
    Manageitem m = this.dao.findManageItemById(mi.getId());
    m.setState(!m.isState());
    this.dao.updateManageItem(m);
    return m;
  }
}
