package cn.com.oims.dao;

import cn.com.oims.dao.pojo.PaibanBGS;
import cn.com.oims.dao.pojo.WorkforceChild;
import cn.com.oims.dao.pojo.WorkforceManager;
import cn.com.oims.web.form.WorkforceManagerForm;
import com.codesnet.common.Page;
import java.util.Collection;
import java.util.List;

public interface IWorkforceDao extends BaseDao {
  Long saveWorkforceManager(WorkforceManager paramWorkforceManager);
  
  Long saveWorkforceChild(WorkforceChild paramWorkforceChild);
  
  void updateWorkforceManager(WorkforceManager paramWorkforceManager);
  
  void updateWorkforceChild(WorkforceChild paramWorkforceChild);
  
  void delWorkforceManager(Long paramLong);
  
  void delWorkforceChild(Long paramLong);
  
  WorkforceManager findWorkforceManager(Long paramLong);
  
  WorkforceChild findWorkforceChild(Long paramLong);
  
  void delManagerList(Collection<WorkforceManager> paramCollection);
  
  void delChildList(Collection<WorkforceChild> paramCollection);
  
  List<WorkforceManager> findWorkForceManagerByPage(Page paramPage, WorkforceManagerForm paramWorkforceManagerForm);
  
  List<WorkforceManager> findWorkForceManagerByfid(Long paramLong);
  
  List<WorkforceChild> findWorkForceChildByworkid(String paramString);
  
  PaibanBGS findPaibanBGSByID(Long paramLong);
  
  List<PaibanBGS> findPaibanBGSList();
}
