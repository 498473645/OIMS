package cn.com.oims.service.impl;

import cn.com.oims.dao.IWorkforceDao;
import cn.com.oims.dao.pojo.PaibanBGS;
import cn.com.oims.dao.pojo.WorkforceChild;
import cn.com.oims.dao.pojo.WorkforceManager;
import cn.com.oims.service.IWorkforceService;
import cn.com.oims.web.form.WorkforceManagerForm;
import com.codesnet.common.Page;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkforceServiceImpl implements IWorkforceService {
  @Autowired
  private IWorkforceDao workforcedao;
  
  public Long saveWorkforceManager(WorkforceManager wm) {
    return this.workforcedao.saveWorkforceManager(wm);
  }
  
  public Long saveWorkforceChild(WorkforceChild wch) {
    return this.workforcedao.saveWorkforceChild(wch);
  }
  
  public void updateWorkforceManager(WorkforceManager wm) {
    this.workforcedao.updateWorkforceManager(wm);
  }
  
  public void updateWorkforceChild(WorkforceChild wch) {
    this.workforcedao.updateWorkforceChild(wch);
  }
  
  public void delWorkforceManager(Long id) {
    this.workforcedao.delWorkforceManager(id);
  }
  
  public void delWorkforceChild(Long id) {
    this.workforcedao.delWorkforceChild(id);
  }
  
  public WorkforceManager findWorkforceManager(Long id) {
    return this.workforcedao.findWorkforceManager(id);
  }
  
  public WorkforceChild findWorkforceChild(Long id) {
    return this.workforcedao.findWorkforceChild(id);
  }
  
  public void delManagerList(Collection<WorkforceManager> list) {
    this.workforcedao.delManagerList(list);
  }
  
  public void delChildList(Collection<WorkforceChild> list) {
    this.workforcedao.delChildList(list);
  }
  
  public Map<String, Object> findWorkForceManagerByPage(Page page, WorkforceManagerForm wmf) {
    List<WorkforceManager> list = this.workforcedao.findWorkForceManagerByPage(page, wmf);
    Map<String, Object> map = new HashMap<>();
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public List<WorkforceManager> findWorkForceManagerByfid(Long fid) {
    return this.workforcedao.findWorkForceManagerByfid(fid);
  }
  
  public List<WorkforceChild> findWorkForceChildByworkid(String workid) {
    return this.workforcedao.findWorkForceChildByworkid(workid);
  }
  
  public PaibanBGS findPaibanBGSByID(Long id) {
    return this.workforcedao.findPaibanBGSByID(id);
  }
  
  public List<PaibanBGS> findPaibanBGSList() {
    return this.workforcedao.findPaibanBGSList();
  }
}
