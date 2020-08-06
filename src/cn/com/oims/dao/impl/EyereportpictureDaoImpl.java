package cn.com.oims.dao.impl;

import cn.com.oims.dao.IEyereportpictureDao;
import cn.com.oims.dao.pojo.Eyereportpicture;
import java.util.List;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Example;
import org.hibernate.criterion.Order;
import org.springframework.stereotype.Component;

@Component
public class EyereportpictureDaoImpl extends BaseDaoImpl implements IEyereportpictureDao {
  private String clazzName = Eyereportpicture.class.getSimpleName();
  
  private DetachedCriteria getDC() {
    return DetachedCriteria.forClass(Eyereportpicture.class);
  }
  
  public void updateEyereportpicture(Eyereportpicture eyereportpicture) {
    this.hibernateTemplate.update(eyereportpicture);
  }
  
  public void saveEyereportpicture(Eyereportpicture eyereportpicture) {
    this.hibernateTemplate.save(eyereportpicture);
  }
  
  public Eyereportpicture selectEyereportpictureByEyereportpicture(Eyereportpicture eyereportpicture) {
    Eyereportpicture eyereportpictureSelect = null;
    List<Eyereportpicture> list = this.hibernateTemplate.findByExample(eyereportpicture);
    if (list.size() >= 1)
      eyereportpictureSelect = list.get(0); 
    return eyereportpictureSelect;
  }
  
  public void deleteEyereportpicture(Eyereportpicture eyereportpicture) {
    this.hibernateTemplate.delete(eyereportpicture);
  }
  
  public List<Eyereportpicture> selectEyereportpicturesByEyereportpicture(Eyereportpicture eyereportpicture) {
    return this.hibernateTemplate.findByCriteria(getDC().add((Criterion)Example.create(eyereportpicture)).addOrder(Order.asc("paixu")));
  }
}
