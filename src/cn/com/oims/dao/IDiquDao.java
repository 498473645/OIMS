package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Diqu;
import java.io.Serializable;
import java.util.List;

public interface IDiquDao {
  void save(Diqu paramDiqu);
  
  void update(Diqu paramDiqu);
  
  void del(Diqu paramDiqu);
  
  List<Diqu> findAll();
  
  Diqu findById(Serializable paramSerializable);
  
  List<Diqu> findDiqus(Integer paramInteger);
  
  String findChildDiquIDS(String paramString);
}
