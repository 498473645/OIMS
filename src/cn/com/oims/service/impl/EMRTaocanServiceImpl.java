package cn.com.oims.service.impl;

import cn.com.oims.dao.IEMRTaocanDao;
import cn.com.oims.dao.pojo.EMRTaocan;
import cn.com.oims.dao.pojo.EMRTaocanXM;
import cn.com.oims.dao.pojo.EMRTaocanXMMX;
import cn.com.oims.service.IEMRTaocanService;
import com.codesnet.common.Page;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EMRTaocanServiceImpl implements IEMRTaocanService {
  @Autowired
  private IEMRTaocanDao taocanDao;
  
  @Transactional
  public void saveEMRTaocan(EMRTaocan emrTaocan) {
    Integer id = emrTaocan.getId();
    if (id != null) {
      updateEMRTaocan(emrTaocan);
      return;
    } 
    id = this.taocanDao.save(emrTaocan);
    List<EMRTaocanXM> tcxmList = emrTaocan.getTaocanXM();
    Iterator<EMRTaocanXM> itr = tcxmList.iterator();
    while (itr.hasNext()) {
      EMRTaocanXM xm = itr.next();
      xm.setTaocanId(id);
      Integer xmId = this.taocanDao.save(xm);
      for (EMRTaocanXMMX xmmx : xm.getTcxmmx()) {
        xmmx.setTcxmId(xmId);
        this.taocanDao.save(xmmx);
      } 
    } 
  }
  
  private void updateEMRTaocan(EMRTaocan emrTaocan) {
    EMRTaocan old = this.taocanDao.getEMRTaocan(emrTaocan.getId());
    if (old == null)
      throw new RuntimeException("未找到要合并的套餐！"); 
    List<EMRTaocanXM> oldXMList = old.getTaocanXM();
    List<EMRTaocanXM> tcxmList = emrTaocan.getTaocanXM();
    Iterator<EMRTaocanXM> itr = tcxmList.iterator();
    while (itr.hasNext()) {
      EMRTaocanXM xm = itr.next();
      xm.setTaocanId(emrTaocan.getId());
      updateTaocanXM(xm, oldXMList);
    } 
    if (emrTaocan.getBeizhu() != null) {
      BeanUtils.copyProperties(emrTaocan, old);
      this.taocanDao.update("EMRTaocan", old);
      if (oldXMList.size() > 0)
        this.taocanDao.deleteAll(oldXMList); 
    } 
  }
  
  private void updateTaocanXM(EMRTaocanXM xm, List<EMRTaocanXM> oldXMList) {
    Iterator<EMRTaocanXM> itr = oldXMList.iterator();
    boolean add = true;
    while (itr.hasNext()) {
      EMRTaocanXM old = itr.next();
      if (old.getXmType().intValue() == xm.getXmType().intValue() && old.getXmId().intValue() == xm.getXmId().intValue()) {
        add = false;
        Integer id = old.getId();
        List<EMRTaocanXMMX> list = old.getTcxmmx();
        BeanUtils.copyProperties(xm, old);
        old.setId(id);
        this.taocanDao.update("EMRTaocanXM", old);
        updateTaocanXMMX(old, list);
        oldXMList.remove(old);
        break;
      } 
    } 
    if (add) {
      Integer id = this.taocanDao.save(xm);
      for (EMRTaocanXMMX xmmx : xm.getTcxmmx()) {
        xmmx.setTcxmId(id);
        this.taocanDao.save(xmmx);
      } 
    } 
  }
  
  private void updateTaocanXMMX(EMRTaocanXM xm, List<EMRTaocanXMMX> oldList) {
    List<EMRTaocanXMMX> list = xm.getTcxmmx();
    Iterator<EMRTaocanXMMX> itr = list.iterator();
    while (itr.hasNext()) {
      EMRTaocanXMMX xmmx = itr.next();
      boolean add = true;
      for (EMRTaocanXMMX old : oldList) {
        if (xmmx.getFsxmId().intValue() == old.getFsxmId().intValue()) {
          add = false;
          if (xmmx.getShuliang() != old.getShuliang()) {
            Integer id = old.getId();
            BeanUtils.copyProperties(xmmx, old);
            old.setId(id);
            this.taocanDao.update("EMRTaocanXMMX", old);
          } 
          oldList.remove(old);
          break;
        } 
      } 
      if (!add)
        continue; 
      xmmx.setTcxmId(xm.getId());
      this.taocanDao.save(xmmx);
    } 
    if (oldList.size() > 0)
      this.taocanDao.deleteAll(oldList); 
  }
  
  @Transactional
  public void deleteEMRTaocan(Integer id) {
    EMRTaocan taocan = this.taocanDao.getEMRTaocan(id);
    List<EMRTaocanXM> tcxmList = taocan.getTaocanXM();
    Iterator<EMRTaocanXM> itr = tcxmList.iterator();
    while (itr.hasNext()) {
      EMRTaocanXM xm = itr.next();
      this.taocanDao.deleteAll(xm.getTcxmmx());
      this.taocanDao.delete(xm);
    } 
    this.taocanDao.delete(taocan);
  }
  
  public List<EMRTaocan> findEMRTaocan(String gonghao) {
    return this.taocanDao.findEMRTaocan(gonghao);
  }
  
  public void deleteEMRTaocanXM(Integer tcxmId) {
    this.taocanDao.deleteEMRTaocanXM(tcxmId);
  }
  
  public void updateTaocan(EMRTaocan taocan) {
    EMRTaocan taocanOld = this.taocanDao.getEMRTaocan(taocan.getId());
    if (taocan.getTcmc() != null)
      taocanOld.setTcmc(taocan.getTcmc()); 
    taocanOld.setGongxiang(taocan.isGongxiang());
    this.taocanDao.update("EMRTaocan", taocanOld);
  }
  
  @Transactional
  public void updateEMRTaocan(JSONArray ja) {
    for (int i = 0; i < ja.size(); i++) {
      JSONObject jo = ja.getJSONObject(i);
      EMRTaocanXM etxm = this.taocanDao.getEMRTaocanXM(Integer.valueOf(jo.getInt("id")));
      etxm.setExcutiveDept(Integer.valueOf(jo.getInt("dept")));
      etxm.setYanbiebiaoben((jo.get("yanbiebiaoben") == null || jo.get("yanbiebiaoben").equals("null")) ? null : Integer.valueOf(jo.getInt("yanbiebiaoben")));
      this.taocanDao.updateEMRTaocanXM(etxm);
    } 
  }
  
  public Map<String, Object> findEMRTaocanPageList(Page page, String search, Boolean share) {
    List<Map<String, Object>> list = this.taocanDao.findEMRTaocanList(page, search, share);
    Map<String, Object> map = new HashMap<>();
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public EMRTaocan getEMRTaocan(Integer id) {
    return this.taocanDao.getEMRTaocan(id);
  }
}
