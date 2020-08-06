package cn.com.oims.service;

import cn.com.oims.dao.pojo.Yhpz;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;

public interface IYhpzService {
  int countsOfYhpz();
  
  List<Yhpz> findYhpzsByPage(Page paramPage);
  
  List<Yhpz> findAllYhpzs();
  
  void deleteYhpzById(Serializable paramSerializable);
  
  Serializable saveYhpz(Yhpz paramYhpz);
  
  void saveOrUpdateYhpz(Yhpz paramYhpz);
  
  void updateYhpz(Yhpz paramYhpz);
  
  Yhpz findYhpzById(Serializable paramSerializable);
}
