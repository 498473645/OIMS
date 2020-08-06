package cn.com.oims.dao.impl;

import cn.com.oims.dao.IRevProjDetailDao;
import cn.com.oims.dao.pojo.RevProjDetail;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class RevProjDetailDaoImpl extends BaseDaoImpl implements IRevProjDetailDao {
  private String clazzName = RevProjDetail.class.getSimpleName();
  
  public void delByRevProjId(Long revProjId) {
    String sql = "delete from " + this.clazzName + " where revprojId=" + revProjId;
    executeUpdate(sql);
  }
  
  public List<RevProjDetail> getRevProjDetailByRevProjId(Long revProjId) {
    String hql = "from RevProjDetail rpd where rpd.revprojId=" + revProjId;
    return this.hibernateTemplate.find(hql);
  }
  
  public Serializable saveRevProjDetail(RevProjDetail t) {
    return this.hibernateTemplate.save(t);
  }
}
