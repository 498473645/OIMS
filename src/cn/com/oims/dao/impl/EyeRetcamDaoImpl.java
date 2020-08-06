package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyeRetcamDao;
import cn.com.oims.dao.pojo.EyeRetcam;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyeRetcamDaoImpl extends BaseDaoImpl implements IEyeRetcamDao {
  public void updateEyeRetcam(EyeRetcam eyeRetcam) {
    this.hibernateTemplate.update(eyeRetcam);
  }
  
  public Serializable saveEyeRetcam(EyeRetcam eyeRetcam) {
    return this.hibernateTemplate.save(eyeRetcam);
  }
  
  public EyeRetcam selectEyeRetcamByEyeRetcam(EyeRetcam eyeRetcam) {
    EyeRetcam eyeRetcamSelect = null;
    List<EyeRetcam> list = this.hibernateTemplate.findByExample(eyeRetcam);
    if (list.size() >= 1)
      eyeRetcamSelect = list.get(0); 
    return eyeRetcamSelect;
  }
  
  public void deleteEyeRetcam(EyeRetcam eyeRetcam) {
    this.hibernateTemplate.delete(eyeRetcam);
  }
}
