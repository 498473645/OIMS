package cn.com.oims.service;

import cn.com.oims.dao.pojo.RevProjDetail;
import java.io.Serializable;
import java.util.List;

public interface IRevProjDetailService {
  void delByRevProjId(Long paramLong);
  
  List<RevProjDetail> getRevProjDetailByRevProjId(Long paramLong);
  
  Serializable saveRevProjDetail(RevProjDetail paramRevProjDetail);
}
