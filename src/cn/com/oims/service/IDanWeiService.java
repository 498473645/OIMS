package cn.com.oims.service;

import cn.com.oims.dao.pojo.DanWei;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public interface IDanWeiService {
  DanWei getDanWeiById(Serializable paramSerializable);
  
  Serializable saveDanWei(DanWei paramDanWei);
  
  void delDanWeiById(Serializable paramSerializable);
  
  void saveOrUpdateDanWei(DanWei paramDanWei);
  
  void updateDanWei(DanWei paramDanWei);
  
  List<DanWei> findAllDanWei();
  
  Map<String, Object> findAllDanWei4Page(Page paramPage);
  
  boolean getValidate(String paramString);
}
