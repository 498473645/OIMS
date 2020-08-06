package cn.com.oims.dao;

import cn.com.oims.dao.pojo.RevProjDetail;
import java.io.Serializable;
import java.util.List;

public interface IRevProjDetailDao {
  void delByRevProjId(Long paramLong);
  
  List<RevProjDetail> getRevProjDetailByRevProjId(Long paramLong);
  
  Serializable saveRevProjDetail(RevProjDetail paramRevProjDetail);
}
