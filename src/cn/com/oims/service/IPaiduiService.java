package cn.com.oims.service;

import cn.com.oims.dao.pojo.Paidui;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public interface IPaiduiService {
  Paidui getPaiduiById(Serializable paramSerializable);
  
  Serializable savePaidui(Paidui paramPaidui);
  
  void delPaiduiById(Serializable paramSerializable);
  
  void saveOrUpdatePaidui(Paidui paramPaidui);
  
  void updatePaidui(Paidui paramPaidui);
  
  List<Paidui> findAllPaidui();
  
  Map<String, Object> findAllPaidui4Page(Page paramPage);
  
  boolean isBumenByIdToPaidui(Integer paramInteger);
  
  int getMaxXuHaoByBumenId(Integer paramInteger);
}
