package cn.com.oims.service;

import cn.com.oims.dao.pojo.Diqu;
import java.util.List;
import java.util.Map;
import java.util.Vector;

public interface IDiquService {
  void saveDiqu(Diqu paramDiqu);
  
  void updateDiqu(Diqu paramDiqu);
  
  void delDiqu(Diqu paramDiqu);
  
  Diqu findDiquById(Diqu paramDiqu);
  
  List<Diqu> findDiquAll();
  
  List<Diqu> findDiqus(Integer paramInteger);
  
  Vector<Map<String, Object>> findDiquFull(int paramInt);
}
