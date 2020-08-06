package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyeballpressDao;
import cn.com.oims.dao.pojo.Eyeballpress;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyeballpressDaoImpl extends BaseDaoImpl implements IEyeballpressDao {
  public void updateEyeballpress(Eyeballpress eyeballpress) {
    this.hibernateTemplate.update(eyeballpress);
  }
  
  public Serializable saveEyeballpress(Eyeballpress eyeballpress) {
    return this.hibernateTemplate.save(eyeballpress);
  }
  
  public Eyeballpress selectEyeballpressByEyeballpress(Eyeballpress eyeballpress) {
    Eyeballpress eyeballpressSelect = null;
    List<Eyeballpress> list = this.hibernateTemplate.findByExample(eyeballpress);
    if (list.size() >= 1)
      eyeballpressSelect = list.get(0); 
    return eyeballpressSelect;
  }
  
  public void deleteEyeballpress(Eyeballpress eyeballpress) {
    this.hibernateTemplate.delete(eyeballpress);
  }
}
