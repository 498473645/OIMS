package cn.com.oims.service;

import cn.com.oims.dao.pojo.JcxmFenlei;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public interface IJcxmFenleiService {
  Serializable saveJcxmFenlei(JcxmFenlei paramJcxmFenlei);
  
  void deleteJcxmFenlei(JcxmFenlei paramJcxmFenlei);
  
  List findJcxmFenleisByJcxmId(Integer paramInteger);
  
  List<JcxmFenlei> findJcxmFenleisByJcxmFenlei(JcxmFenlei paramJcxmFenlei);
}
