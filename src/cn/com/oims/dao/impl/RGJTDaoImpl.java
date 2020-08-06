package cn.com.oims.dao.impl;

import cn.com.oims.dao.IRGJTDictDao;
import cn.com.oims.dao.pojo.RGJTChangjia;
import cn.com.oims.dao.pojo.RGJTCjtglx;
import cn.com.oims.dao.pojo.RGJTCrklx;
import cn.com.oims.dao.pojo.RGJTPanleixing;
import cn.com.oims.dao.pojo.RGJTXinghao;
import cn.com.oims.web.form.RGJTSearchForm;
import com.codesnet.common.Page;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class RGJTDaoImpl extends BaseDaoImpl implements IRGJTDictDao {
  public void saveOrUpdate(Object cj) {
    this.hibernateTemplate.saveOrUpdate(cj);
  }
  
  public List<RGJTChangjia> findRGJTChangjia(Integer category, String inputCode, Page page) {
    String hql = " from RGJTChangjia where 1=1";
    if (category != null) {
      hql = String.valueOf(hql) + " and (category=" + category;
      if (category != RGJT_CSLX_SCCJ_GHS)
        hql = String.valueOf(hql) + " or category=" + RGJT_CSLX_SCCJ_GHS; 
      hql = String.valueOf(hql) + ")";
    } 
    return returnList(hql, inputCode, page);
  }
  
  private List returnList(String hql, String code, Page page) {
    if (code != null && !code.isEmpty())
      hql = String.valueOf(hql) + " and code like '%" + code.toUpperCase() + "%'"; 
    page.setRowsCount(Integer.valueOf(count("select count(*)" + hql)));
    page.init();
    return getListForPage(hql, page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  public RGJTChangjia getRGJTChangjia(Integer id) {
    return (RGJTChangjia)this.hibernateTemplate.get(RGJTChangjia.class, id);
  }
  
  public void delete(Object obj) {
    this.hibernateTemplate.delete(obj);
  }
  
  public List<RGJTXinghao> findRGJTXinhaoPageList(String code, Page page) {
    String hql = " from RGJTXinghao where 1=1";
    return returnList(hql, code, page);
  }
  
  public RGJTXinghao getRGJTXinghao(Integer id) {
    return (RGJTXinghao)this.hibernateTemplate.get(RGJTXinghao.class, id);
  }
  
  public List<RGJTPanleixing> findRGJTPanleixing(String code, Page page) {
    String hql = " from RGJTPanleixing where 1=1";
    return returnList(hql, code, page);
  }
  
  public RGJTPanleixing getRGJTPanleixing(Integer id) {
    return (RGJTPanleixing)this.hibernateTemplate.get(RGJTPanleixing.class, id);
  }
  
  public List<RGJTCjtglx> findRGJTCjtglx(RGJTSearchForm form, Page page) {
    String hql = " from RGJTCjtglx l, RGJTChangjia c, RGJTXinghao x, RGJTPanleixing p where l.manufacturer=c.id and l.typeId=x.id and l.panTypeId=p.id";
    page.setRowsCount(Integer.valueOf(count("select count(*) " + hql)));
    page.init();
    hql = " select new map(c.name as manufacturerName,c.id as manufacturer,x.id as typeId, x.name as typeName, p.name as panTypeName, p.id as panTypeId,l.id as id,l.diopterScopeStart as diopterScopeStart, l.diopterScopeEnd as diopterScopeEnd, l.price as price,l.aConstant as aConstant,l.diameter as diameter,l.surfaceDiameter as surfaceDiameter,l.infomation as infomation)" + 
      
      hql;
    if (form.getInputCode() != null)
      hql = String.valueOf(hql) + " and (x.code like '%" + form.getInputCode().toUpperCase() + "%' or x.name like '%" + form.getInputCode() + "%')"; 
    if (form.getManufacturer() != null)
      hql = String.valueOf(hql) + " and c.id=" + form.getManufacturer(); 
    return getListForPage(hql, page.getStartRow().intValue(), page.getPageSize().intValue());
  }
  
  public RGJTCjtglx getRGJTCjtglx(Integer id) {
    return (RGJTCjtglx)this.hibernateTemplate.get(RGJTCjtglx.class, id);
  }
  
  public List<RGJTCrklx> findRGJTCrklxPageList(String code, Integer category, Page page) {
    String hql = " from RGJTCrklx where 1=1";
    if (code != null && !code.isEmpty())
      hql = String.valueOf(hql) + " and code like '%" + code.toUpperCase() + "%'"; 
    if (category != null)
      hql = String.valueOf(hql) + " and category=" + category; 
    return returnList(hql, code, page);
  }
  
  public RGJTCrklx getRGJTCrklx(Integer id) {
    return (RGJTCrklx)this.hibernateTemplate.get(RGJTCrklx.class, id);
  }
}
