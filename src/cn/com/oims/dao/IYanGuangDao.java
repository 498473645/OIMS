package cn.com.oims.dao;

import cn.com.oims.dao.pojo.YanGuang;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;

public interface IYanGuangDao extends BaseDao {
  int counts();
  
  List<YanGuang> findAllYanGuang4Page(Page paramPage);
  
  List<YanGuang> findAllYanGuang();
  
  void delYanGuang(Serializable paramSerializable);
  
  Serializable saveYanGuang(YanGuang paramYanGuang);
  
  void saveOrUpdateYanGuang(YanGuang paramYanGuang);
  
  void updateYanGuang(YanGuang paramYanGuang);
  
  YanGuang findYanGuangById(Serializable paramSerializable);
  
  List<YanGuang> findYanGuangList(Page paramPage, Serializable paramSerializable);
}
