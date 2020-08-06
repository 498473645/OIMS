package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyebdx;
import java.io.Serializable;

public interface IEyebdxDao extends BaseDao {
  void updateEyebdx(Eyebdx paramEyebdx);
  
  Serializable saveEyebdx(Eyebdx paramEyebdx);
  
  Eyebdx selectEyebdxByEyebdx(Eyebdx paramEyebdx);
  
  void deleteEyebdx(Eyebdx paramEyebdx);
}
