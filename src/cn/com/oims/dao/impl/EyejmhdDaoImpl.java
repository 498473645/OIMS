package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyejmhdDao;
import cn.com.oims.dao.pojo.Eyejmhd;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyejmhdDaoImpl extends BaseDaoImpl implements IEyejmhdDao {
  public void updateEyejmhd(Eyejmhd eyejmhd) {
    this.hibernateTemplate.update(eyejmhd);
  }
  
  public Serializable saveEyejmhd(Eyejmhd eyejmhd) {
    return this.hibernateTemplate.save(eyejmhd);
  }
  
  public Eyejmhd selectEyejmhdByEyejmhd(Eyejmhd eyejmhd) {
    Eyejmhd eyejmhdSelect = null;
    List<Eyejmhd> list = this.hibernateTemplate.findByExample(eyejmhd);
    if (list.size() >= 1)
      eyejmhdSelect = list.get(0); 
    return eyejmhdSelect;
  }
  
  public void deleteEyejmhd(Eyejmhd eyejmhd) {
    this.hibernateTemplate.delete(eyejmhd);
  }
}
