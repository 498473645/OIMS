package cn.com.oims.dao;

import cn.com.oims.dao.pojo.JcxmFenlei;
import java.io.Serializable;
import java.util.List;

public interface IJcxmFenleiDao extends BaseDao {
  Serializable saveJcxmFenlei(JcxmFenlei paramJcxmFenlei);
  
  void deleteJcxmFenlei(JcxmFenlei paramJcxmFenlei);
  
  List findJcxmFenleisByJcxmId(Integer paramInteger);
  
  List<JcxmFenlei> findJcxmFenleisByJcxmFenlei(JcxmFenlei paramJcxmFenlei);
}
