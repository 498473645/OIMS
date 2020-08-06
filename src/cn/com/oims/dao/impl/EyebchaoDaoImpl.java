package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyebchaoDao;
import cn.com.oims.dao.pojo.Eyebchao;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class EyebchaoDaoImpl extends BaseDaoImpl implements IEyebchaoDao {
  public void updateEyebchao(Eyebchao eyebchao) {
    this.hibernateTemplate.update(eyebchao);
  }
  
  public Serializable saveEyebchao(Eyebchao eyebchao) {
    return this.hibernateTemplate.save(eyebchao);
  }
  
  public Eyebchao selectEyebchaoByEyebchao(Eyebchao eyebchao) {
    Eyebchao eyebchaoSelect = null;
    List<Eyebchao> list = this.hibernateTemplate.findByExample(eyebchao);
    if (list.size() >= 1)
      eyebchaoSelect = list.get(0); 
    return eyebchaoSelect;
  }
  
  public void deleteEyebchao(Eyebchao eyebchao) {
    this.hibernateTemplate.delete(eyebchao);
  }
}
