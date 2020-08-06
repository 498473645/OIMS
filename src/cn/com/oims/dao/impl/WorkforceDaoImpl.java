package cn.com.oims.dao.impl;

import cn.com.oims.dao.IWorkforceDao;
import cn.com.oims.dao.pojo.PaibanBGS;
import cn.com.oims.dao.pojo.WorkforceChild;
import cn.com.oims.dao.pojo.WorkforceManager;
import cn.com.oims.web.form.WorkforceManagerForm;
import com.codesnet.common.Page;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class WorkforceDaoImpl extends BaseDaoImpl implements IWorkforceDao {
  @Override
  public Long saveWorkforceManager(WorkforceManager wm) {
    return (Long)this.hibernateTemplate.save(wm);
  }
  
  @Override
  public Long saveWorkforceChild(WorkforceChild wch) {
    return (Long)this.hibernateTemplate.save(wch);
  }
  
  @Override
  public void updateWorkforceManager(WorkforceManager wm) {
    this.hibernateTemplate.update(wm);
  }
  
  @Override
  public void updateWorkforceChild(WorkforceChild wch) {
    this.hibernateTemplate.update(wch);
  }
  
  @Override
  public void delWorkforceManager(Long id) {
    this.hibernateTemplate.delete(findWorkforceManager(id));
  }
  
  @Override
  public void delWorkforceChild(Long id) {
    this.hibernateTemplate.delete(findWorkforceChild(id));
  }
  
  @Override
  public WorkforceManager findWorkforceManager(Long id) {
    return (WorkforceManager)this.hibernateTemplate.get(WorkforceManager.class, id);
  }
  
  @Override
  public WorkforceChild findWorkforceChild(Long id) {
    return (WorkforceChild)this.hibernateTemplate.get(WorkforceChild.class, id);
  }
  
  @Override
  public void delManagerList(Collection<WorkforceManager> list) {
    this.hibernateTemplate.deleteAll(list);
  }
  
  @Override
  public void delChildList(Collection<WorkforceChild> list) {
    this.hibernateTemplate.deleteAll(list);
  }
  
  @Override
  public List<WorkforceManager> findWorkForceManagerByPage(Page page, WorkforceManagerForm wmf) {
    Map<String, Object> map = new HashMap<String, Object>();
    String hql = " from WorkforceManager wm where 1=:wmnum";
    map.put("wmnum", Integer.valueOf(1));
    page.setRowsCount(Integer.valueOf(counts("select count(*)" + hql, map)));
    page.init();
    return getListForPage(hql, page.getStartRow().intValue(), page.getPageSize().intValue(), map);
  }
  
  @Override
  public List<WorkforceManager> findWorkForceManagerByfid(Long fid) {
    String hql = "from WorkforceManager where fatherid = '" + fid + "'";
    List<WorkforceManager> list = this.hibernateTemplate.find(hql);
    if (list != null && list.size() > 0) {
      return list;
    }
    return null;
  }
  
  @Override
  public List<WorkforceChild> findWorkForceChildByworkid(String workid) {
    String hql = "from WorkforceChild where workid = '" + workid + "'";
    List<WorkforceChild> list = this.hibernateTemplate.find(hql);
    if (list != null && list.size() > 0) {
      return list;
    }
    return null;
  }
  
  @Override
  public PaibanBGS findPaibanBGSByID(Long id) {
    return (PaibanBGS)this.hibernateTemplate.get(PaibanBGS.class, id);
  }
  
  @Override
  public List<PaibanBGS> findPaibanBGSList() {
    String hql = " from PaibanBGS ";
    List<PaibanBGS> list = this.hibernateTemplate.find(hql);
    if (list != null && list.size() > 0) {
      return list;
    }
    return null;
  }
}
