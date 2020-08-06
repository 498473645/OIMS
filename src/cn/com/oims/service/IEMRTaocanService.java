package cn.com.oims.service;

import cn.com.oims.dao.pojo.EMRTaocan;
import com.codesnet.common.Page;
import java.util.List;
import java.util.Map;
import net.sf.json.JSONArray;

public interface IEMRTaocanService {
  void saveEMRTaocan(EMRTaocan paramEMRTaocan);
  
  void deleteEMRTaocan(Integer paramInteger);
  
  List<EMRTaocan> findEMRTaocan(String paramString);
  
  void deleteEMRTaocanXM(Integer paramInteger);
  
  void updateTaocan(EMRTaocan paramEMRTaocan);
  
  void updateEMRTaocan(JSONArray paramJSONArray);
  
  Map<String, Object> findEMRTaocanPageList(Page paramPage, String paramString, Boolean paramBoolean);
  
  EMRTaocan getEMRTaocan(Integer paramInteger);
}
