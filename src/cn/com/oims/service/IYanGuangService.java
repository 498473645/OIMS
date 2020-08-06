package cn.com.oims.service;

import cn.com.oims.dao.pojo.YanGuang;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

public interface IYanGuangService {
  YanGuang getYanGuangById(Serializable paramSerializable);
  
  Serializable saveYanGuang(YanGuang paramYanGuang);
  
  void delYanGuangById(Serializable paramSerializable);
  
  void saveOrUpdateYanGuang(YanGuang paramYanGuang);
  
  void updateYanGuang(YanGuang paramYanGuang);
  
  List<YanGuang> findAllYanGuang();
  
  Map<String, Object> findAllYanGuang4Page(Page paramPage);
}
