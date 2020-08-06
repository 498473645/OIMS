package cn.com.oims.service.impl;

import cn.com.oims.dao.IRGJTKucunDao;
import cn.com.oims.dao.pojo.RGJTCgmx;
import cn.com.oims.dao.pojo.RGJTCgsq;
import cn.com.oims.dao.pojo.RGJTChukuSQ;
import cn.com.oims.dao.pojo.RGJTChukusqmx;
import cn.com.oims.dao.pojo.RGJTCrkls;
import cn.com.oims.dao.pojo.RGJTCrklx;
import cn.com.oims.dao.pojo.RGJTCrkmx;
import cn.com.oims.dao.pojo.RGJTKucun;
import cn.com.oims.service.IRGJTKuncunService;
import cn.com.oims.web.form.RGJTBaobiaoForm;
import cn.com.oims.web.form.RGJTCaigouSearchForm;
import cn.com.oims.web.form.RGJTCgsqdForm;
import cn.com.oims.web.form.RGJTChukuForm;
import cn.com.oims.web.form.RGJTChukuSearchForm;
import cn.com.oims.web.form.RGJTKucunLSSearchForm;
import cn.com.oims.web.form.RGJTKucunSearchForm;
import cn.com.oims.web.form.RGJTRukuForm;
import com.codesnet.common.Page;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RGJTKuncunServiceImpl implements IRGJTKuncunService {
  @Autowired
  private IRGJTKucunDao kcDao;
  
  public Map<String, Object> findKucunPageList(RGJTKucunSearchForm form, Page page) {
    Map<String, Object> map = new HashMap<>();
    List<Map<String, Object>> list = this.kcDao.findKucunPageList(form, page);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  @Transactional
  public boolean caigousq(RGJTCgsqdForm form, List<RGJTCgmx> list, String gonghao) {
    RGJTCgsq cgsqd;
    if (form.getId() != null) {
      cgsqd = this.kcDao.getCaigousq(form.getId());
      if (cgsqd == null)
        throw new RuntimeException("未找到要修改的对象！"); 
      deleteCaigousqmx(cgsqd.getId());
    } else {
      cgsqd = new RGJTCgsq();
      cgsqd.setInsertDate(new Date());
      cgsqd.setInsertUser(gonghao);
    } 
    BeanUtils.copyProperties(form, cgsqd);
    this.kcDao.saveOrUpdate(cgsqd);
    saveCaigousqmx(cgsqd.getId(), list);
    return false;
  }
  
  private void saveCaigousqmx(Long id, List<RGJTCgmx> list) {
    for (RGJTCgmx cgmx : list) {
      cgmx.setCgsqdId(id);
      RGJTCgmx mx = this.kcDao.getRGJTCgmx(cgmx);
      if (mx != null) {
        mx.setQuantity(cgmx.getQuantity());
        this.kcDao.saveOrUpdate(mx);
        continue;
      } 
      this.kcDao.saveOrUpdate(cgmx);
    } 
  }
  
  private void deleteCaigousqmx(Long id) {
    List<RGJTCgmx> list = this.kcDao.findCgmxList(id);
    this.kcDao.deleteAll(list);
  }
  
  public boolean caigouShenhe(Long id, boolean flag, String note, String gonghao) {
    RGJTCgsq cgsqd = this.kcDao.getCaigousq(id);
    cgsqd.setAuditFlag(Boolean.valueOf(flag));
    cgsqd.setAuditDate(new Date());
    cgsqd.setAuditor(gonghao);
    cgsqd.setAuditMsg(note);
    this.kcDao.update("RGJTCgsq", cgsqd);
    return true;
  }
  
  public void caigouPifu(Long id, boolean flag, String note, String gonghao) {
    RGJTCgsq cgsqd = this.kcDao.getCaigousq(id);
    cgsqd.setApprovalFlag(Boolean.valueOf(flag));
    cgsqd.setApprovalDate(new Date());
    cgsqd.setApprovalMsg(note);
    cgsqd.setApprover(gonghao);
    this.kcDao.update("RGJTCgsq", cgsqd);
  }
  
  @Transactional
  public void jingtiChRuku(RGJTRukuForm form, List<RGJTCrkmx> list, String gonghao, Long operationId) {
    RGJTCrkls crkls = new RGJTCrkls();
    BeanUtils.copyProperties(form, crkls);
    crkls.setInertDate(new Date());
    crkls.setInsertUser(gonghao);
    this.kcDao.saveOrUpdate(crkls);
    int n = 0;
    for (RGJTCrkmx mx : list) {
      mx.setCrklsId(crkls.getId());
      mx.setOutOrPut(form.isOutOrPut());
      n += mx.getQuantity();
      mx.setNote(form.getNote());
      if (form.isOutOrPut())
        mx.setOperationId(operationId); 
      RGJTKucun kucun = this.kcDao.getRGJTKucun(mx);
      if (kucun == null) {
        kucun = new RGJTKucun();
        kucun.setCrksqdId(null);
        kucun.setDiopter(mx.getDiopter());
        kucun.setNote(form.getNote());
        kucun.setProId(mx.getProId());
        kucun.setQuantity(Integer.valueOf(mx.getQuantity()));
        kucun.setBatchNumber(mx.getBatchNumber());
        kucun.setExpiTime(mx.getExpiTime());
      } else {
        int quantity = form.isOutOrPut() ? (kucun.getQuantity().intValue() - mx.getQuantity()) : (kucun.getQuantity().intValue() + mx.getQuantity());
        if (quantity < 0)
          throw new RuntimeException("库存不足！"); 
        kucun.setQuantity(Integer.valueOf(quantity));
      } 
      this.kcDao.saveOrUpdate(kucun);
      mx.setJieyu(kucun.getQuantity().intValue());
      this.kcDao.saveOrUpdate(mx);
    } 
    crkls.setQuantity(Integer.valueOf(n));
    this.kcDao.saveOrUpdate(crkls);
  }
  
  @Transactional
  public void chukuShenqing(RGJTChukuForm form, List<RGJTChukusqmx> list, String gonghao) {
    RGJTChukuSQ cksq;
    if (form.getId() != null) {
      cksq = this.kcDao.getRGJTChukuSQ(form.getId());
      deleteRGJTChukusqmx(form.getId());
    } else {
      cksq = new RGJTChukuSQ();
      cksq.setInsertDate(new Date());
      cksq.setInsertUser(gonghao);
    } 
    BeanUtils.copyProperties(form, cksq);
    this.kcDao.saveOrUpdate(cksq);
    saveChukusqmx(cksq.getId(), list);
  }
  
  private void saveChukusqmx(Long id, List<RGJTChukusqmx> list) {
    for (RGJTChukusqmx mx : list) {
      mx.setChukusqId(id);
      this.kcDao.saveOrUpdate(mx);
    } 
  }
  
  private void deleteRGJTChukusqmx(Long id) {
    List<RGJTChukusqmx> list = this.kcDao.findRGJTChukusqmx(id);
    this.kcDao.deleteAll(list);
  }
  
  public boolean chukuShenhe(Long id, boolean flag, String note, String gonghao) {
    RGJTChukuSQ cksq = this.kcDao.getRGJTChukuSQ(id);
    cksq.setAuditDate(new Date());
    cksq.setAuditFlag(Boolean.valueOf(flag));
    cksq.setAuditor(gonghao);
    cksq.setAuditMsg(note);
    this.kcDao.saveOrUpdate(cksq);
    return true;
  }
  
  public boolean chukuPifu(Long id, boolean flag, String note, String gonghao) {
    RGJTChukuSQ cksq = this.kcDao.getRGJTChukuSQ(id);
    cksq.setApprovalDate(new Date());
    cksq.setApprovalFlag(Boolean.valueOf(flag));
    cksq.setApprovalMsg(note);
    cksq.setApprover(gonghao);
    this.kcDao.saveOrUpdate(cksq);
    return true;
  }
  
  @Transactional
  public boolean delCaigouShenqingdan(Long id, String gonghao) {
    RGJTCgsq cgsq = this.kcDao.getCaigousq(id);
    List<RGJTCgmx> list = this.kcDao.findCgmxList(id);
    this.kcDao.deleteAll(list);
    this.kcDao.delete(cgsq);
    return true;
  }
  
  @Transactional
  public boolean delChukuShenqingdan(Long id, String gonghao) {
    RGJTChukuSQ cksq = this.kcDao.getRGJTChukuSQ(id);
    List<RGJTChukusqmx> list = this.kcDao.findRGJTChukusqmx(id);
    this.kcDao.deleteAll(list);
    this.kcDao.delete(cksq);
    return true;
  }
  
  public Map<String, Object> findCaigouPageList(RGJTCaigouSearchForm form, Page page) {
    Map<String, Object> map = new HashMap<>();
    List<RGJTCgsq> list = this.kcDao.findGRJTCaigouPageList(form, page);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public Map<String, Object> findChukusqPageList(RGJTChukuSearchForm form, Page page) {
    Map<String, Object> map = new HashMap<>();
    List<RGJTChukuSQ> list = this.kcDao.findChukuSQPageList(form, page);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public Map<String, Object> findCaigoumxPageList(Long id, RGJTCaigouSearchForm form, Page page) {
    Map<String, Object> map = new HashMap<>();
    List<Map<String, Object>> list = this.kcDao.findCGmxList(id, form, page);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public Map<String, Object> findChukusqmxPageList(Long id, RGJTChukuSearchForm form, Page page) {
    Map<String, Object> map = new HashMap<>();
    List<Map<String, Object>> list = this.kcDao.findChukusqmxPageList(id, form, page);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public Map getRGJTKucunBaobiao(RGJTBaobiaoForm form, Page page) {
    List<Map<String, Object>> list = this.kcDao.findRGJTCjtglx(form, page);
    List<RGJTCrklx> rl = this.kcDao.findCrklx();
    Iterator<Map<String, Object>> itr = list.iterator();
    while (itr.hasNext()) {
      Map<String, Object> map = itr.next();
      List<Map<String, Object>> r = new ArrayList<>();
      for (RGJTCrklx lx : rl) {
        Map<String, Object> m = new HashMap<>();
        m.put("name", lx.getName());
        m.put("category", Integer.valueOf(lx.getCategory()));
        m.put("id", lx.getId());
        m.put("quantity", Integer.valueOf(this.kcDao.countRgjtkucun(lx.getId(), (Integer)map.get("id"), form.getStartDate(), form.getEndDate(), (Float)map.get("diopter"))));
        r.add(m);
      } 
      map.put("reportList", r);
    } 
    Map<String, Object> result = new HashMap<>();
    result.put("list", list);
    result.put("page", page);
    return result;
  }
  
  public List<Map<String, Object>> findOperationPatient(String blh) {
    return this.kcDao.findOperationPatient(blh);
  }
  
  public Map<String, Object> findRGJTBySN(String sn) {
    return this.kcDao.findRGJTBySN(sn);
  }
  
  public List<Map<String, Object>> findRGJTKucunMX(Long id, Boolean pro) {
    return this.kcDao.findRGJTKucunMX(id, pro);
  }
  
  public Map rgjtKucunMXPagelist(RGJTKucunSearchForm form, Page page) {
    Map<String, Object> map = new HashMap<>();
    List<Map<String, Object>> list = this.kcDao.rgjtKucunMXPagelist(form, page);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public Map rgjtKucunLSPagelist(RGJTKucunLSSearchForm form, Page page) {
    Map<String, Object> map = new HashMap<>();
    if (form.getOperationDateStart() == null) {
      Calendar cal = Calendar.getInstance();
      cal.set(5, 1);
      form.setOperationDateStart(cal.getTime());
    } 
    if (form.getOperationDateEnd() == null)
      form.setOperationDateEnd(new Date()); 
    List<Map<String, Object>> list = this.kcDao.rgjtKucunLSPagelist(form, page);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public List<Map<String, Object>> findRGJTKucunLSMX(Long id) {
    return this.kcDao.findRGJTKucunLSMX(id);
  }
  
  public Map<String, Object> findRGJTKucun(Long id) {
    return this.kcDao.findRGJTKucun(id);
  }
  
  public Map<String, Object> findRGJTKucunByProId(Long id) {
    return this.kcDao.findRGJTKucunByProId(id);
  }
  
  public Map getRGJTMxBaobiao(RGJTBaobiaoForm form, Page page) {
    Map<String, Object> map = new HashMap<>();
    List<Map<String, Object>> list = this.kcDao.getRGJTMxBaobiao(form, page);
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public List<Map<String, Object>> getDayNum(Integer proId, Date startTime, Date endTime) {
    return this.kcDao.getDayNum(proId, startTime, endTime);
  }
  
  public List<Map<String, Object>> getJingTiDetalsByOperationId(Long operationId) {
    List<Map<String, Object>> list = this.kcDao.getJingTiDetalsByOperationId(operationId);
    return list;
  }
  
  public void deleteOperJingti(Long id, String gonghao) {
    RGJTCrkmx rcx = this.kcDao.findCrkmxById(id);
    RGJTCrkls rcl = this.kcDao.findCrklsById(rcx.getCrklsId());
    RGJTCrkls crkls = new RGJTCrkls();
    crkls.setInertDate(new Date());
    crkls.setInsertUser(gonghao);
    crkls.setOutOrPut(false);
    crkls.setTypeId(Integer.valueOf(6));
    crkls.setOperationDate(rcl.getOperationDate());
    crkls.setPatientId(rcl.getPatientId());
    crkls.setQuantity(rcl.getQuantity());
    this.kcDao.saveOrUpdate(crkls);
    rcl.setNote("退货");
    this.kcDao.saveOrUpdate(rcl);
    RGJTCrkmx crkmx = new RGJTCrkmx();
    BeanUtils.copyProperties(rcx, crkmx);
    crkmx.setId(null);
    crkmx.setCrklsId(crkls.getId());
    crkmx.setNote("退货");
    RGJTKucun kucun = this.kcDao.getRGJTKucun(rcx);
    int quantity = kucun.getQuantity().intValue() + crkls.getQuantity().intValue();
    kucun.setQuantity(Integer.valueOf(quantity));
    this.kcDao.saveOrUpdate(kucun);
    crkmx.setJieyu(kucun.getQuantity().intValue());
    this.kcDao.saveOrUpdate(crkmx);
    rcx.setNote(crkmx.getId().toString());
    this.kcDao.saveOrUpdate(rcx);
  }
  
  public List<Map<String, Object>> getRGJTMxBaobiaoExport(RGJTBaobiaoForm form) {
    return this.kcDao.getRGJTMxBaobiaoExport(form);
  }
}
