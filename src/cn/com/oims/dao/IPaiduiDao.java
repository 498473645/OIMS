package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Paidui;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public interface IPaiduiDao extends BaseDao {
  int counts();
  
  List<Paidui> findAllPaidui4Page(Page paramPage);
  
  List<Paidui> findAllPaidui();
  
  void delPaidui(Serializable paramSerializable);
  
  Serializable savePaidui(Paidui paramPaidui);
  
  void saveOrUpdatePaidui(Paidui paramPaidui);
  
  void updatePaidui(Paidui paramPaidui);
  
  Paidui findPaiduiById(Serializable paramSerializable);
  
  boolean isBumenByIdToPaidui(Integer paramInteger);
  
  int getMaxXuHaoByBumenId(Integer paramInteger);
}
