package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEMRTaocanDao;
import cn.com.oims.dao.pojo.EMRTaocan;
import cn.com.oims.dao.pojo.EMRTaocanXM;
import cn.com.oims.dao.pojo.Jcxm;
import com.codesnet.common.Page;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class EMRTaocanDaoImpl extends BaseDaoImpl implements IEMRTaocanDao {
  @Override
  public Integer save(Object obj) {
    return (Integer)this.hibernateTemplate.save(obj);
  }
  
  @Override
  public EMRTaocan getEMRTaocan(Integer id) {
    EMRTaocan taocan = (EMRTaocan)this.hibernateTemplate.get(EMRTaocan.class, id);
    taocan.setTaocanXM(findEMRTaocanXM(id));
    return taocan;
  }
  
  private List<EMRTaocanXM> findEMRTaocanXM(Integer id) {
    String hql = " from EMRTaocanXM where taocanId=" + id + " order by xmType, id";
    List<EMRTaocanXM> list = this.hibernateTemplate.find(hql);
    Iterator<EMRTaocanXM> itr = list.iterator();
    while (itr.hasNext()) {
      EMRTaocanXM xm = itr.next();
      xm.setJcxm((Jcxm)this.hibernateTemplate.get(Jcxm.class, xm.getXmId()));
      xm.setTcxmmx(this.hibernateTemplate.find("from EMRTaocanXMMX where tcxmId=" + xm.getId()));
    } 
    return list;
  }
  
  @Override
  public void delete(Object obj) {
    this.hibernateTemplate.delete(obj);
  }
  
  @Override
  public List<EMRTaocan> findEMRTaocan(String gonghao) {
    String hql = " from EMRTaocan where gonghao='" + gonghao + "' or gongxiang=true order by cjsj";
    List<EMRTaocan> list = this.hibernateTemplate.find(hql);
    Iterator<EMRTaocan> itr = list.iterator();
    while (itr.hasNext()) {
      EMRTaocan taocan = itr.next();
      taocan.setTaocanXM(findEMRTaocanXM(taocan.getId()));
    } 
    return list;
  }
  
  @Override
  public void deleteAll(Collection oldList) {
    this.hibernateTemplate.deleteAll(oldList);
  }
  
  @Override
  public void deleteEMRTaocanXM(Integer tcxmId) {
    this.hibernateTemplate.deleteAll(this.hibernateTemplate.find("from EMRTaocanXMMX where tcxmId=" + tcxmId));
    this.hibernateTemplate.delete(this.hibernateTemplate.get(EMRTaocanXM.class, tcxmId));
  }
  
  @Override
  public EMRTaocanXM getEMRTaocanXM(Integer tcxmId) {
    return (EMRTaocanXM)this.hibernateTemplate.get(EMRTaocanXM.class, tcxmId);
  }
  
  @Override
  public void updateEMRTaocanXM(EMRTaocanXM etxm) {
    this.hibernateTemplate.update(etxm);
  }
  
  @Override
  public List<Map<String, Object>> findEMRTaocanList(Page page, String search, Boolean share) {
    String map = "select new map(t.id as id,t.tcmc as tcmc, t.beizhu as beizhu, t.gonghao as gonghao, t.gongxiang as gongxiang, t.cjsj as cjsj, y.xingming as xingming)";
    String order = " order by t.cjsj desc, t.gongxiang desc";
    String hql = " from EMRTaocan t, YuanGong y where y.gonghao=t.gonghao";
    Map<String, Object> m = new HashMap<String, Object>();
    if (search != null && !search.isEmpty()) {
      hql = String.valueOf(hql) + " and (y.xingming like :search or t.tcmc like :search)";
      m.put("search", "%" + search + "%");
    } 
    if (share != null) {
      hql = String.valueOf(hql) + " and t.gongxiang=:gongxiang";
      m.put("gongxiang", share);
    } 
    if (m.keySet().isEmpty()) {
      page.setRowsCount(Integer.valueOf(counts("select count(*) " + hql)));
      page.init();
      return getListForPage(String.valueOf(map) + hql + order, page.getStartRow().intValue(), page.getPageSize().intValue());
    } 
    page.setRowsCount(Integer.valueOf(counts("select count(*) " + hql, m)));
    page.init();
    return getListForPage(String.valueOf(map) + hql + order, page.getStartRow().intValue(), page.getPageSize().intValue(), m);
  }
}
