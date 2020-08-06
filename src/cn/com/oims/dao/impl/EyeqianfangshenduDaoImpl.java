package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyeqianfangshenduDao;
import cn.com.oims.dao.pojo.Eyeqianfangshendu;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyeqianfangshenduDaoImpl extends BaseDaoImpl implements IEyeqianfangshenduDao {
  public void updateEyeqianfangshendu(Eyeqianfangshendu eyeqianfangshendu) {
    this.hibernateTemplate.update(eyeqianfangshendu);
  }
  
  public Serializable saveEyeqianfangshendu(Eyeqianfangshendu eyeqianfangshendu) {
    return this.hibernateTemplate.save(eyeqianfangshendu);
  }
  
  public Eyeqianfangshendu selectEyeqianfangshenduByEyeqianfangshendu(Eyeqianfangshendu eyeqianfangshendu) {
    Eyeqianfangshendu eyeqianfangshenduSelect = null;
    List<Eyeqianfangshendu> list = this.hibernateTemplate.findByExample(eyeqianfangshendu);
    if (list.size() >= 1)
      eyeqianfangshenduSelect = list.get(0); 
    return eyeqianfangshenduSelect;
  }
  
  public void deleteEyeqianfangshendu(Eyeqianfangshendu eyeqianfangshendu) {
    this.hibernateTemplate.delete(eyeqianfangshendu);
  }
}
