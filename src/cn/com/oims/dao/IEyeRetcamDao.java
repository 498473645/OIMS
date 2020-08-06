package cn.com.oims.dao;

import cn.com.oims.dao.pojo.EyeRetcam;
import java.io.Serializable;

public interface IEyeRetcamDao extends BaseDao {
  void updateEyeRetcam(EyeRetcam paramEyeRetcam);
  
  Serializable saveEyeRetcam(EyeRetcam paramEyeRetcam);
  
  EyeRetcam selectEyeRetcamByEyeRetcam(EyeRetcam paramEyeRetcam);
  
  void deleteEyeRetcam(EyeRetcam paramEyeRetcam);
}
