package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyeoctDao;
import cn.com.oims.dao.pojo.Eyeoct;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyeoctDaoImpl extends BaseDaoImpl implements IEyeoctDao {
  public void updateEyeoct(Eyeoct eyeoct) {
    this.hibernateTemplate.update(eyeoct);
  }
  
  public Serializable saveEyeoct(Eyeoct eyeoct) {
    return this.hibernateTemplate.save(eyeoct);
  }
  
  public Eyeoct selectEyeoctByEyeoct(Eyeoct eyeoct) {
    Eyeoct eyeoctSelect = null;
    List<Eyeoct> list = this.hibernateTemplate.findByExample(eyeoct);
    if (list.size() >= 1)
      eyeoctSelect = list.get(0); 
    return eyeoctSelect;
  }
  
  public void deleteEyeoct(Eyeoct eyeoct) {
    this.hibernateTemplate.delete(eyeoct);
  }
}
