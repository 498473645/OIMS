package cn.com.oims.dao.impl;

import cn.com.oims.dao.IRGJTKucunDao;
import cn.com.oims.dao.pojo.RGJTCgmx;
import cn.com.oims.dao.pojo.RGJTCgsq;
import cn.com.oims.dao.pojo.RGJTChukuSQ;
import cn.com.oims.dao.pojo.RGJTChukusqmx;
import cn.com.oims.dao.pojo.RGJTCrkls;
import cn.com.oims.dao.pojo.RGJTCrklx;
import cn.com.oims.dao.pojo.RGJTCrkmx;
import cn.com.oims.dao.pojo.RGJTKucun;
import cn.com.oims.dao.pojo.RGJTKucunMX;
import cn.com.oims.web.form.RGJTBaobiaoForm;
import cn.com.oims.web.form.RGJTCaigouSearchForm;
import cn.com.oims.web.form.RGJTChukuSearchForm;
import cn.com.oims.web.form.RGJTKucunLSSearchForm;
import cn.com.oims.web.form.RGJTKucunSearchForm;
import com.codesnet.common.MultiUtils;
import com.codesnet.common.Page;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class RGJTKucunDaoImpl extends BaseDaoImpl implements IRGJTKucunDao {
  @Override
  public List<Map<String, Object>> findKucunPageList(RGJTKucunSearchForm form, Page page) {
    String hql = " from RGJTKucun k,RGJTCjtglx l, RGJTChangjia c, RGJTXinghao x, RGJTPanleixing p where k.proId=l.id and l.manufacturer=c.id and l.typeId=x.id and l.panTypeId=p.id";
    Map<String, Object> map = new HashMap<String, Object>();
    if (form.getaConstantEnd() != null) {
      hql = String.valueOf(hql) + " and l.aConstant<=" + form.getaConstantEnd();
    }
    if (form.getaConstantStart() != null) {
      hql = String.valueOf(hql) + " and l.aConstant>=" + form.getaConstantStart();
    }
    if (form.getDiopterEnd() != null) {
      hql = String.valueOf(hql) + " and k.diopter<=" + form.getDiopterEnd();
    }
    if (form.getDiopterStart() != null) {
      hql = String.valueOf(hql) + " and k.diopter>=" + form.getDiopterStart();
    }
    if (form.getInfomation() != null) {
      hql = String.valueOf(hql) + " and l.infomation like '%" + form.getInfomation() + "%'";
    }
    if (form.getManufacturerName() != null) {
      hql = String.valueOf(hql) + " and c.name like '%" + form.getManufacturerName() + "%'";
    }
    if (form.getPanTypeId() != null) {
      hql = String.valueOf(hql) + " and l.panTypeId=" + form.getPanTypeId();
    }
    if (form.getPriceEnd() != null) {
      hql = String.valueOf(hql) + " and l.price<=" + form.getPriceEnd();
    }
    if (form.getPriceStart() != null) {
      hql = String.valueOf(hql) + " and l.priceStart>=" + form.getPriceStart();
    }
    if (form.getSearch() != null) {
      hql = String.valueOf(hql) + " and (x.name like '%" + form.getSearch() + "%' or c.name like '%" + form.getSearch() + "%')";
    }
    if (form.getSurfaceDiameterEnd() != null) {
      hql = String.valueOf(hql) + " and l.surfaceDiameter<=" + form.getSurfaceDiameterEnd();
    }
    if (form.getSurfaceDiameterStart() != null) {
      hql = String.valueOf(hql) + " and l.surfaceDiameter>=" + form.getSurfaceDiameterStart();
    }
    if (form.getTypeName() != null) {
      hql = String.valueOf(hql) + " and x.name like '%" + form.getTypeName() + "%'";
    }
    hql = String.valueOf(hql) + " order by x.name asc";
    page.setRowsCount(Integer.valueOf(count("select count(*) " + hql)));
    page.init();
    String temp_hql = " select new map(k.id as id,k.quantity as quantity, k.diopter as diopter, c.name as manufacturerName,c.id as manufacturer,x.id as typeId, x.name as typeName, p.name as panTypeName, p.id as panTypeId,l.id as proId,l.diopterScopeStart as diopterScopeStart, l.diopterScopeEnd as diopterScopeEnd, l.price as price,l.aConstant as aConstant,k.batchNumber as batchNumber,k.expiTime as expiTime,l.diameter as diameter,l.surfaceDiameter as surfaceDiameter,l.infomation as infomation,";
    temp_hql = String.valueOf(temp_hql) + "(select sum(rmx.quantity) from RGJTCrkls rls,RGJTCrkmx rmx where k.proId=rmx.proId and rls.id=rmx.crklsId and  (rls.typeId=5 or rls.typeId=1) ";
    if (form.getStartDate() != null) {
      Date start = MultiUtils.getStartTimeOfDay(form.getStartDate());
      temp_hql = String.valueOf(temp_hql) + " and rls.insertDate>=:startDate_in";
      map.put("startDate_in", start);
    } 
    if (form.getEndDate() != null) {
      Date end = MultiUtils.getEndTimeOfDay(form.getEndDate());
      temp_hql = String.valueOf(temp_hql) + " and rls.insertDate<=:endDate_in";
      map.put("endDate_in", end);
    } 
    temp_hql = String.valueOf(temp_hql) + ") as inNum,";
    temp_hql = String.valueOf(temp_hql) + "(select sum(rmx.quantity) from RGJTCrkls rls,RGJTCrkmx rmx where k.proId=rmx.proId and rls.id=rmx.crklsId and  (rls.typeId=2 or rls.typeId=3) ";
    if (form.getStartDate() != null) {
      Date start = MultiUtils.getStartTimeOfDay(form.getStartDate());
      temp_hql = String.valueOf(temp_hql) + " and rls.insertDate>=:startDate_out";
      map.put("startDate_out", start);
    } 
    if (form.getEndDate() != null) {
      Date end = MultiUtils.getEndTimeOfDay(form.getEndDate());
      temp_hql = String.valueOf(temp_hql) + " and rls.insertDate<=:endDate_out";
      map.put("endDate_out", end);
    } 
    temp_hql = String.valueOf(temp_hql) + ") as outNum,";
    temp_hql = String.valueOf(temp_hql) + "(select sum(rmx.quantity) from RGJTCrkls rls,RGJTCrkmx rmx where k.proId=rmx.proId and rls.id=rmx.crklsId and  rls.typeId=6";
    if (form.getStartDate() != null) {
      Date start = MultiUtils.getStartTimeOfDay(form.getStartDate());
      temp_hql = String.valueOf(temp_hql) + " and rls.insertDate>=:startDate_th";
      map.put("startDate_th", start);
    } 
    if (form.getEndDate() != null) {
      Date end = MultiUtils.getEndTimeOfDay(form.getEndDate());
      temp_hql = String.valueOf(temp_hql) + " and rls.insertDate<=:endDate_th";
      map.put("endDate_th", end);
    } 
    temp_hql = String.valueOf(temp_hql) + ") as thNum";
    temp_hql = String.valueOf(temp_hql) + ")" + hql;
    return getListForPage(temp_hql, page.getStartRow().intValue(), page.getPageSize().intValue(), map);
  }
  
  @Override
  public RGJTCgsq getCaigousq(Long id) {
    return (RGJTCgsq)this.hibernateTemplate.get(RGJTCgsq.class, id);
  }
  
  @Override
  public void saveOrUpdate(Object obj) {
    this.hibernateTemplate.saveOrUpdate(obj);
  }
  
  @Override
  public List<RGJTCgmx> findCgmxList(Long id) {
    String hql = " from RGJTCgmx where cgsqdId=" + id;
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public void deleteAll(Collection list) {
    this.hibernateTemplate.deleteAll(list);
  }
  
  @Override
  public RGJTChukuSQ getRGJTChukuSQ(Long id) {
    return (RGJTChukuSQ)this.hibernateTemplate.get(RGJTChukuSQ.class, id);
  }
  
  @Override
  public List<RGJTChukusqmx> findRGJTChukusqmx(Long id) {
    String hql = " from RGJTChukusqmx where chukusqId=" + id;
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public void delete(Object cgsq) {
    this.hibernateTemplate.delete(cgsq);
  }
  
  @Override
  public List<Map<String, Object>> findCGmxList(Long cgsqdId, RGJTCaigouSearchForm form, Page page) {
    String hql = " from RGJTCgmx k,RGJTCjtglx l, RGJTChangjia c, RGJTXinghao x, RGJTPanleixing p where k.proId=l.id and l.manufacturer=c.id and l.typeId=x.id and l.panTypeId=p.id and k.cgsqdId=" + cgsqdId;
    page.setRowsCount(Integer.valueOf(count("select count(*) " + hql)));
    page.init();
    hql = " select new map(k.id as id, k.quantity as quantity, k.diopter as diopter, c.name as manufacturerName,c.id as manufacturer,x.id as typeId, x.name as typeName, p.name as panTypeName, p.id as panTypeId,l.id as proId,l.diopterScopeStart as diopterScopeStart, l.diopterScopeEnd as diopterScopeEnd, l.price as price,l.aConstant as aConstant,l.diameter as diameter,l.surfaceDiameter as surfaceDiameter,l.infomation as infomation)" + 
      
      hql;
    return getListForPage(hql, page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  @Override
  public List<RGJTCgsq> findGRJTCaigouPageList(RGJTCaigouSearchForm form, Page page) {
    String hql = " from RGJTCgsq";
    page.setRowsCount(Integer.valueOf(count("select count(*)" + hql)));
    page.init();
    return getListForPage(String.valueOf(hql) + " order by insertDate desc", page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  @Override
  public List<RGJTChukuSQ> findChukuSQPageList(RGJTChukuSearchForm form, Page page) {
    String hql = " from RGJTChukuSQ";
    page.setRowsCount(Integer.valueOf(count("select count(*)" + hql)));
    page.init();
    return getListForPage(String.valueOf(hql) + " order by insertDate desc", page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  @Override
  public List<Map<String, Object>> findChukusqmxPageList(Long id, RGJTChukuSearchForm form, Page page) {
    String hql = " from RGJTChukusqmx k,RGJTCjtglx l, RGJTChangjia c, RGJTXinghao x, RGJTPanleixing p where k.proId=l.id and l.manufacturer=c.id and l.typeId=x.id and l.panTypeId=p.id and k.chukusqId=" + id;
    page.setRowsCount(Integer.valueOf(count("select count(*) " + hql)));
    page.init();
    hql = " select new map(k.id as id, k.quantity as quantity, k.diopter as diopter, c.name as manufacturerName,c.id as manufacturer,x.id as typeId, x.name as typeName, p.name as panTypeName, p.id as panTypeId,l.id as proId,l.diopterScopeStart as diopterScopeStart, l.diopterScopeEnd as diopterScopeEnd, l.price as price,l.aConstant as aConstant,l.diameter as diameter,l.surfaceDiameter as surfaceDiameter,l.infomation as infomation)" + 
      
      hql;
    return getListForPage(hql, page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  @Override
  public RGJTCgmx getRGJTCgmx(RGJTCgmx cgmx) {
    String hql = " from RGJTCgmx where proId=" + cgmx.getProId() + " and diopter=" + cgmx.getDiopter() + " and cgsqdId=" + cgmx.getCgsqdId();
    List<RGJTCgmx> list = this.hibernateTemplate.find(hql);
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public RGJTKucun getRGJTKucun(RGJTCrkmx mx) {
    String hql = " from RGJTKucun k where  k.proId=" + mx.getProId();
    List<RGJTKucun> list = this.hibernateTemplate.find(hql);
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public int countRgjtkucun(Integer crklxId, Integer proId, Date startDate, Date endDate, Float diopter) {
    String hql = "select sum(x.quantity) from RGJTCrkmx x,RGJTCrkls s where s.id=x.crklsId and x.diopter=:diopter and s.typeId=:crklxId and x.proId=:proId and s.operationDate between :startDate and :endDate";
    Map<String, Object> map = new HashMap<String, Object>();
    map.put("crklxId", crklxId);
    map.put("startDate", startDate);
    map.put("endDate", endDate);
    map.put("proId", proId);
    map.put("diopter", diopter);
    List<Long> list = findList(hql, map);
    return (list.get(0) == null) ? 0 : ((Long)list.get(0)).intValue();
  }
  
  @Override
  public List<Map<String, Object>> findRGJTCjtglx(RGJTBaobiaoForm form, Page page) {
    String hql = " from RGJTCjtglx l,RGJTXinghao x, RGJTKucun k where l.id=k.proId and l.typeId=x.id and (l.disabled=false or k.quantity>0)";
    if (form.getBeiku() != null) {
      if (form.getBeiku().booleanValue()) {
        hql = String.valueOf(hql) + " and l.targetValue>0";
      } else {
        hql = String.valueOf(hql) + " and (l.targetValue is null or l.targetValue=0)";
      }
    }
    page.setRowsCount(Integer.valueOf(count("select count(*)" + hql)));
    page.init();
    hql = "select new map(l.id as id,k.diopter as diopter, x.name as name,k.quantity as quantity, l.price as price,l.targetValue as targetValue)" + hql;
    return getListForPage(String.valueOf(hql) + " order by l.id desc,x.id desc", page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  @Override
  public List<RGJTCrklx> findCrklx() {
    String hql = " from RGJTCrklx order by category, id";
    return this.hibernateTemplate.find(hql);
  }
  
  @Override
  public List<Map<String, Object>> findOperationPatient(String blh) {
    String hql = "select new map(h.id as patientId,h.xingming as name, h.xingbie as sex, h.shengri as birthday,o.appointmentTime as operationDate,o.id as id,(select xingming from YuanGong yg where yg.gonghao=o.doctor ) as doctor,(select xingming from YuanGong yg where yg.gonghao=o.circuitNurse) as circuitNurse) from HuanZheXinXi h,Operation o where  o.patientId=h.id and h.binglihao='" + blh + "' order by o.appointmentTime desc";
    List<Map<String, Object>> list = this.hibernateTemplate.find(hql);
    return list;
  }
  
  @Override
  public RGJTKucunMX findRGJKucunMXBySN(String sn) {
    String hql = " from RGJTKucunMX where sn='" + sn + "'";
    List<RGJTKucunMX> list = this.hibernateTemplate.find(hql);
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public Map<String, Object> findRGJTBySN(String sn) {
    String hql = " from RGJTKucunMX m, RGJTKucun k,RGJTCjtglx l, RGJTChangjia c, RGJTXinghao x, RGJTPanleixing p where k.id=m.kucunId and k.proId=l.id and l.manufacturer=c.id and l.typeId=x.id and l.panTypeId=p.id and m.sn='" + sn + "'";
    hql = " select new map(k.id as id, m.sn as sn, m.quantity as quantity, k.diopter as diopter, c.name as manufacturerName,c.id as manufacturer,x.id as typeId, x.name as typeName, p.name as panTypeName, p.id as panTypeId,l.id as proId,l.diopterScopeStart as diopterScopeStart, l.diopterScopeEnd as diopterScopeEnd, l.price as price,l.aConstant as aConstant,l.diameter as diameter,l.surfaceDiameter as surfaceDiameter,l.infomation as infomation,m.expiTime as expiTime)" + 
      
      hql;
    List<Map<String, Object>> list = this.hibernateTemplate.find(hql);
    return (list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public List<Map<String, Object>> findRGJTKucunMX(Long id, Boolean pro) {
    String hql = " from RGJTKucunMX m, RGJTKucun k,RGJTCjtglx l, RGJTChangjia c, RGJTXinghao x, RGJTPanleixing p where m.kucunId=k.id and k.proId=l.id and l.manufacturer=c.id and l.typeId=x.id and l.panTypeId=p.id and ";
    if (pro != null && pro.booleanValue()) {
      hql = String.valueOf(hql) + "m.proId=" + id;
    } else {
      hql = String.valueOf(hql) + "k.id=" + id;
    } 
    hql = " select new map(k.id as id, m.sn as sn, m.quantity as quantity, k.diopter as diopter, c.name as manufacturerName,c.id as manufacturer,x.id as typeId, x.name as typeName, p.name as panTypeName, p.id as panTypeId,l.id as proId,l.diopterScopeStart as diopterScopeStart, l.diopterScopeEnd as diopterScopeEnd, l.price as price,l.aConstant as aConstant,l.diameter as diameter,l.surfaceDiameter as surfaceDiameter,l.infomation as infomation,m.expiTime as expiTime)" + 
      
      hql;
    List<Map<String, Object>> list = this.hibernateTemplate.find(String.valueOf(hql) + " order by m.expiTime");
    return list;
  }
  
  @Override
  public List<Map<String, Object>> rgjtKucunMXPagelist(RGJTKucunSearchForm form, Page page) {
    String hql = " from RGJTKucunMX m, RGJTKucun k,RGJTCjtglx l, RGJTChangjia c, RGJTXinghao x, RGJTPanleixing p where m.kucunId=k.id and k.proId=l.id and l.manufacturer=c.id and l.typeId=x.id and l.panTypeId=p.id ";
    String mapSelect = " select new map(k.id as id, m.sn as sn, m.quantity as quantity, k.diopter as diopter, c.name as manufacturerName,c.id as manufacturer,x.id as typeId, x.name as typeName, p.name as panTypeName, p.id as panTypeId,l.id as proId,l.diopterScopeStart as diopterScopeStart, l.diopterScopeEnd as diopterScopeEnd, l.price as price,l.aConstant as aConstant,l.diameter as diameter,l.surfaceDiameter as surfaceDiameter,l.infomation as infomation,m.expiTime as expiTime)" + 
      
      hql;
    page.setRowsCount(Integer.valueOf(count("select count(*)" + hql)));
    page.init();
    return getListForPage(String.valueOf(mapSelect) + " order by m.expiTime", page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  @Override
  public List<Map<String, Object>> rgjtKucunLSPagelist(RGJTKucunLSSearchForm form, Page page) {
    if (form.getOutOrPut() != null && form.getOutOrPut().booleanValue()) {
      String str = " from RGJTCrkls ls, RGJTCrklx l,RGJTCrkmx mx,Operation o,YuanGong yg,HuanZheXinXi hzxx where ls.patientId=hzxx.binglihao and ls.id=mx.crklsId and yg.gonghao=o.doctor and o.id=mx.operationId and l.id=ls.typeId and ls.insertDate between :operationDateStart and :operationDateEnd";
      Map<String, Object> map1 = new HashMap<String, Object>();
      map1.put("operationDateStart", form.getOperationDateStart());
      map1.put("operationDateEnd", form.getOperationDateEnd());
      if (form.getOutOrPut() != null) {
        str = String.valueOf(str) + " and ls.outOrPut=:outOrPut";
        map1.put("outOrPut", form.getOutOrPut());
      } 
      if (form.getTypeId() != null) {
        str = String.valueOf(str) + " and ls.typeId in (" + form.getTypeId() + ")";
      }
      if (form.getProductId() != null) {
        str = String.valueOf(str) + " and mx.proId=" + form.getProductId();
      }
      if (form.getDoctor() != null && !form.getDoctor().isEmpty()) {
        str = String.valueOf(str) + " and yg.xingming like :doctor";
        map1.put("doctor", "%" + form.getDoctor() + "%");
      } 
      if (form.getPatientName() != null && !form.getPatientName().isEmpty()) {
        str = String.valueOf(str) + " and hzxx.xingming like :name";
        map1.put("name", "%" + form.getPatientName() + "%");
      } 
      if (form.getPatientId() != null && !form.getPatientId().isEmpty()) {
        str = String.valueOf(str) + " and hzxx.binglihao ='" + form.getPatientId() + "'";
      }
      if (form.getSn() != null && !form.getSn().isEmpty()) {
        str = String.valueOf(str) + " and mx.sn='" + form.getSn() + "'";
      }
      if (form.getBatchNumber() != null && !form.getBatchNumber().isEmpty()) {
        str = String.valueOf(str) + " and mx.batchNumber='" + form.getBatchNumber() + "'";
      }
      str = String.valueOf(str) + " and ls.typeId!=6 and (ls.note is null or ls.note !='退货')";
      page.setRowsCount(Integer.valueOf(counts("select count(*)" + str, map1)));
      page.init();
      str = " select new map(ls.id as id,l.name as typeName, ls.insertUser as insertUser, ls.insertDate as insertDate, ls.note as note, ls.outOrPut as outOrPut,ls.operationDate as operationDate, ls.patientId as patientId, ls.ghsId as ghsId,ls.quantity as quantity)" + str;
      return getListForPage(String.valueOf(str) + " order by ls.operationDate desc,insertDate desc", page.getStartRow().intValue(), page.getPageSize().intValue(), map1);
    } 
    String hql = " from RGJTCrkls ls, RGJTCrklx l where  l.id=ls.typeId and ls.insertDate between :operationDateStart and :operationDateEnd";
    Map<String, Object> map = new HashMap<String, Object>();
    map.put("operationDateStart", form.getOperationDateStart());
    map.put("operationDateEnd", form.getOperationDateEnd());
    if (form.getOutOrPut() != null) {
      hql = String.valueOf(hql) + " and ls.outOrPut=:outOrPut";
      map.put("outOrPut", form.getOutOrPut());
    } 
    if (form.getTypeId() != null) {
      hql = String.valueOf(hql) + " and ls.typeId in (" + form.getTypeId() + ")";
    }
    hql = String.valueOf(hql) + " and ls.typeId !=6 and (ls.note is null or ls.note !='退货') ";
    page.setRowsCount(Integer.valueOf(counts("select count(*)" + hql, map)));
    page.init();
    hql = " select new map(ls.id as id,l.name as typeName, ls.insertUser as insertUser, ls.insertDate as insertDate, ls.note as note, ls.outOrPut as outOrPut,ls.operationDate as operationDate, ls.patientId as patientId, ls.ghsId as ghsId,ls.quantity as quantity)" + hql;
    return getListForPage(String.valueOf(hql) + " order by ls.operationDate desc,insertDate desc", page.getStartRow().intValue(), page.getPageSize().intValue(), map);
  }
  
  @Override
  public List<Map<String, Object>> findRGJTKucunLSMX(Long id) {
    String hql = " from RGJTCrkmx m, RGJTCjtglx l, RGJTChangjia c, RGJTXinghao x, RGJTPanleixing p where l.id=m.proId and l.manufacturer=c.id and l.typeId=x.id and l.panTypeId=p.id and m.crklsId=" + id;
    hql = " select new map(m.id as id, m.sn as sn, m.quantity as quantity, m.diopter as diopter, c.name as manufacturerName,c.id as manufacturer,x.id as typeId, x.name as typeName, p.name as panTypeName, p.id as panTypeId,l.id as proId,l.diopterScopeStart as diopterScopeStart, l.diopterScopeEnd as diopterScopeEnd, l.price as price,l.aConstant as aConstant,l.diameter as diameter,l.surfaceDiameter as surfaceDiameter,l.infomation as infomation,m.expiTime as expiTime)" + 
      
      hql;
    List<Map<String, Object>> list = this.hibernateTemplate.find(String.valueOf(hql) + " order by m.expiTime");
    return list;
  }
  
  @Override
  public Map<String, Object> findRGJTKucun(Long id) {
    String hql = " from RGJTKucun k,RGJTCjtglx l, RGJTChangjia c, RGJTXinghao x, RGJTPanleixing p where  k.proId=l.id and l.manufacturer=c.id and l.typeId=x.id and l.panTypeId=p.id and ";
    hql = String.valueOf(hql) + "k.id=" + id;
    hql = " select new map(k.id as id, k.sn as sn, k.quantity as quantity, k.diopter as diopter, c.name as manufacturerName,c.id as manufacturer,x.id as typeId, x.name as typeName, p.name as panTypeName, p.id as panTypeId,l.id as proId,l.diopterScopeStart as diopterScopeStart, l.diopterScopeEnd as diopterScopeEnd, l.price as price,l.aConstant as aConstant,l.diameter as diameter,l.surfaceDiameter as surfaceDiameter,l.infomation as infomation,k.expiTime as expiTime,k.batchNumber as batchNumber)" + 
      
      hql;
    List<Map<String, Object>> list = this.hibernateTemplate.find(String.valueOf(hql) + " order by k.diopter");
    return (list != null && list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public Map<String, Object> findRGJTKucunByProId(Long id) {
    String hql = " from RGJTKucun k,RGJTCjtglx l, RGJTChangjia c, RGJTXinghao x, RGJTPanleixing p where  k.proId=l.id and l.manufacturer=c.id and l.typeId=x.id and l.panTypeId=p.id and ";
    hql = String.valueOf(hql) + "k.proId=" + id;
    hql = " select new map(k.id as id, k.sn as sn, k.quantity as quantity, k.diopter as diopter, c.name as manufacturerName,c.id as manufacturer,x.id as typeId, x.name as typeName, p.name as panTypeName, p.id as panTypeId,l.id as proId,l.diopterScopeStart as diopterScopeStart, l.diopterScopeEnd as diopterScopeEnd, l.price as price,l.aConstant as aConstant,l.diameter as diameter,l.surfaceDiameter as surfaceDiameter,l.infomation as infomation,k.expiTime as expiTime,k.batchNumber as batchNumber)" + 
      
      hql;
    List<Map<String, Object>> list = this.hibernateTemplate.find(String.valueOf(hql) + " order by k.diopter");
    return (list != null && list.size() > 0) ? list.get(0) : null;
  }
  
  @Override
  public List<Map<String, Object>> getRGJTMxBaobiao(RGJTBaobiaoForm form, Page page) {
    String hql = " from RGJTCrkls rls,RGJTCrkmx rmx,Operation o,RGJTCjtglx l,RGJTChangjia c,RGJTXinghao x,HuanZheXinXi hzxx,YuanGong yg where yg.gonghao=o.doctor  and rls.id=rmx.crklsId and rmx.operationId=o.id and l.id=rmx.proId and l.manufacturer=c.id and l.typeId=x.id and o.patientId=hzxx.id";
    Map<String, Object> map = new HashMap<String, Object>();
    if (form.getStartDate() != null) {
      hql = String.valueOf(hql) + " and rls.operationDate>=:startDate";
      map.put("startDate", MultiUtils.getStartTimeOfDay(form.getStartDate()));
    } 
    if (form.getEndDate() != null) {
      hql = String.valueOf(hql) + " and rls.operationDate<=:endDate";
      map.put("endDate", MultiUtils.getEndTimeOfDay(form.getEndDate()));
    } 
    if (form.getDoctor() != null && !form.getDoctor().isEmpty()) {
      hql = String.valueOf(hql) + " and yg.xingming like :doctor";
      map.put("doctor", "%" + form.getDoctor() + "%");
    } 
    if (form.getProductId() != null) {
      hql = String.valueOf(hql) + " and rmx.proId=" + form.getProductId();
    }
    if (form.getPatientName() != null && !form.getPatientName().isEmpty()) {
      hql = String.valueOf(hql) + " and hzxx.xingming like :name";
      map.put("name", "%" + form.getPatientName() + "%");
    } 
    if (form.getPatientId() != null && !form.getPatientId().isEmpty()) {
      hql = String.valueOf(hql) + " and hzxx.binglihao ='" + form.getPatientId() + "'";
    }
    if (form.getSn() != null && !form.getSn().isEmpty()) {
      hql = String.valueOf(hql) + " and rmx.sn='" + form.getSn() + "'";
    }
    if (form.getBatchNumber() != null && !form.getBatchNumber().isEmpty()) {
      hql = String.valueOf(hql) + " and rmx.batchNumber='" + form.getBatchNumber() + "'";
    }
    hql = String.valueOf(hql) + " and rls.typeId !=6 and (rls.note is null or rls.note !='退货') order by x.name,rls.operationDate,rls.id";
    page.setRowsCount(Integer.valueOf(counts("select count(*)" + hql, map)));
    page.init();
    hql = "select new map(x.name as typeName,rmx.quantity as quantity,c.name as manufacturer,hzxx.xingming as patientName,hzxx.binglihao as patientId,o.appointmentTime as operationDate,rmx.diopter as diopter,rmx.expiTime as expiTime,rmx.sn as sn,rmx.batchNumber as batchNumber,(select xingming from YuanGong  where o.doctor=gonghao)as doctor,(select xingming from YuanGong where o.circuitNurse=gonghao) as nurse)" + hql;
    return getListForPage(hql, page.getStartRow().intValue(), page.getPageSize().intValue(), map);
  }
  
  @Override
  public List<Map<String, Object>> getDayNum(Integer proId, Date startTime, Date endTime) {
    Map<String, Object> map = new HashMap<String, Object>();
    map.put("proId", proId);
    String hql = "select distinct new map(to_date(to_char(rcl.insertDate,'yyyy-MM-dd'),'yyyy-MM-dd') as date,(select sum(rcm1.quantity) from RGJTCrkmx rcm1,RGJTCrkls rcl1 where rcm1.crklsId=rcl1.id and rcm1.proId=rcm.proId and (rcl1.typeId=5 or rcl1.typeId=1) and to_char(rcl1.insertDate,'yyyy-MM-dd')=to_char(rcl.insertDate,'yyyy-MM-dd')) as rk,(select sum(rcm1.quantity) from RGJTCrkmx rcm1,RGJTCrkls rcl1 where rcm1.crklsId=rcl1.id and  rcm1.proId=rcm.proId and (rcl1.typeId=2 or rcl1.typeId=3)and to_char(rcl1.insertDate,'yyyy-MM-dd')=to_char(rcl.insertDate,'yyyy-MM-dd')) as ck,(select sum(rcm1.quantity) from RGJTCrkmx rcm1,RGJTCrkls rcl1 where rcm1.crklsId=rcl1.id and rcm1.proId=rcm.proId and rcl1.typeId=4 and to_char(rcl1.insertDate,'yyyy-MM-dd')=to_char(rcl.insertDate,'yyyy-MM-dd')) as sh,(select sum(rcm1.quantity) from RGJTCrkmx rcm1,RGJTCrkls rcl1 where rcm1.crklsId=rcl1.id and rcm1.proId=rcm.proId and rcl1.typeId=6 and to_char(rcl1.insertDate,'yyyy-MM-dd')=to_char(rcl.insertDate,'yyyy-MM-dd')) as th,(select rcm1.jieyu from RGJTCrkls rcl1,RGJTCrkmx rcm1 where  rcl1.id=rcm1.crklsId and rcl1.id=(select max(rcl2.id)from RGJTCrkls rcl2,RGJTCrkmx rcm2 where rcl2.id=rcm2.crklsId and to_char(rcl2.insertDate,'yyyy-MM-dd')=to_char(rcl.insertDate,'yyyy-MM-dd') and rcm2.proId=rcm.proId ))as jy) from RGJTCrkls rcl,RGJTCrkmx rcm where rcl.id=rcm.crklsId and rcm.proId=:proId";
    if (startTime != null) {
      hql = String.valueOf(hql) + " and rcl.insertDate>=:startTime";
      map.put("startTime", startTime);
    } 
    if (endTime != null) {
      hql = String.valueOf(hql) + " and rcl.insertDate<=:endTime";
      map.put("endTime", endTime);
    } 
    hql = String.valueOf(hql) + " order by date asc";
    List<Map<String, Object>> list = findList(hql, map);
    return list;
  }
  
  @Override
  public List<Map<String, Object>> getJingTiDetalsByOperationId(Long operationId) {
    String hql = "select new map(rmx.id as id,rcj.name as manufacturer,rxh.name as typeName,rplx.name as panTypeName,rmx.diopter as diopter,rtg.aConstant as aConstant,rtg.surfaceDiameter as surfaceDiameter,rtg.diameter as diameter,rmx.sn as sn,rmx.expiTime as expiTime,rmx.batchNumber as batchNumber,rmx.quantity as quantity,rxh.infomation as info,rtg.price as price) from RGJTCrkmx rmx,RGJTCjtglx rtg,RGJTChangjia rcj,RGJTXinghao rxh,RGJTPanleixing rplx where rmx.proId=rtg.id and rtg.manufacturer=rcj.id and rtg.typeId=rxh.id and rtg.panTypeId=rplx.id and  rmx.operationId=" + operationId + " and rmx.note is null";
    List<Map<String, Object>> list = this.hibernateTemplate.find(hql);
    return list;
  }
  
  @Override
  public RGJTCrkmx findCrkmxById(Long id) {
    return (RGJTCrkmx)this.hibernateTemplate.get(RGJTCrkmx.class, id);
  }
  
  @Override
  public RGJTCrkls findCrklsById(Long crklsId) {
    return (RGJTCrkls)this.hibernateTemplate.get(RGJTCrkls.class, crklsId);
  }
  
  @Override
  public List<Map<String, Object>> getRGJTMxBaobiaoExport(RGJTBaobiaoForm form) {
    String hql = " from RGJTCrkls rls,RGJTCrkmx rmx,Operation o,RGJTCjtglx l,RGJTChangjia c,RGJTXinghao x,HuanZheXinXi hzxx,YuanGong yg where yg.gonghao=o.doctor  and rls.id=rmx.crklsId and rmx.operationId=o.id and l.id=rmx.proId and l.manufacturer=c.id and l.typeId=x.id and o.patientId=hzxx.id";
    Map<String, Object> map = new HashMap<String, Object>();
    if (form.getStartDate() != null) {
      hql = String.valueOf(hql) + " and rls.operationDate>=:startDate";
      map.put("startDate", MultiUtils.getStartTimeOfDay(form.getStartDate()));
    } 
    if (form.getEndDate() != null) {
      hql = String.valueOf(hql) + " and rls.operationDate<=:endDate";
      map.put("endDate", MultiUtils.getEndTimeOfDay(form.getEndDate()));
    } 
    if (form.getDoctor() != null && !form.getDoctor().isEmpty()) {
      hql = String.valueOf(hql) + " and yg.xingming like :doctor";
      map.put("doctor", "%" + form.getDoctor() + "%");
    } 
    if (form.getProductId() != null) {
      hql = String.valueOf(hql) + " and rmx.proId=" + form.getProductId();
    }
    if (form.getPatientName() != null && !form.getPatientName().isEmpty()) {
      hql = String.valueOf(hql) + " and hzxx.xingming like :name";
      map.put("name", "%" + form.getPatientName() + "%");
    } 
    if (form.getPatientId() != null && !form.getPatientId().isEmpty()) {
      hql = String.valueOf(hql) + " and hzxx.binglihao ='" + form.getPatientId() + "'";
    }
    if (form.getSn() != null && !form.getSn().isEmpty()) {
      hql = String.valueOf(hql) + " and rmx.sn='" + form.getSn() + "'";
    }
    if (form.getBatchNumber() != null && !form.getBatchNumber().isEmpty()) {
      hql = String.valueOf(hql) + " and rmx.batchNumber='" + form.getBatchNumber() + "'";
    }
    hql = String.valueOf(hql) + " and rls.typeId !=6 and (rls.note is null or rls.note !='退货') ";
    hql = "select new map(x.name as typeName,rmx.quantity as quantity,c.name as manufacturer,hzxx.xingming as patientName,hzxx.binglihao as patientId,o.appointmentTime as operationDate,rmx.diopter as diopter,rmx.expiTime as expiTime,rmx.sn as sn,rmx.batchNumber as batchNumber,(select xingming from YuanGong  where o.doctor=gonghao)as doctor,(select xingming from YuanGong where o.circuitNurse=gonghao) as nurse)" + hql;
    return findList(hql, map);
  }
}
