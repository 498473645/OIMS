package cn.com.oims.dao;

import cn.com.oims.dao.pojo.EMRTaocan;
import cn.com.oims.dao.pojo.EMRTaocanXM;
import com.codesnet.common.Page;
import java.util.Collection;
import java.util.List;
import java.util.Map;

public interface IEMRTaocanDao extends BaseDao {
  Integer save(Object paramObject);
  
  EMRTaocan getEMRTaocan(Integer paramInteger);
  
  void delete(Object paramObject);
  
  List<EMRTaocan> findEMRTaocan(String paramString);
  
  void deleteAll(Collection paramCollection);
  
  void deleteEMRTaocanXM(Integer paramInteger);
  
  EMRTaocanXM getEMRTaocanXM(Integer paramInteger);
  
  void updateEMRTaocanXM(EMRTaocanXM paramEMRTaocanXM);
  
  List<Map<String, Object>> findEMRTaocanList(Page paramPage, String paramString, Boolean paramBoolean);
}
