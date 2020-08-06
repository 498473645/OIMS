package cn.com.oims.dao;

import cn.com.oims.dao.pojo.DanWei;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public interface IDanWeiDao extends BaseDao {
  int counts();
  
  List<DanWei> findAllDanWei4Page(Page paramPage);
  
  List<DanWei> findAllDanWei();
  
  void delDanWei(Serializable paramSerializable);
  
  Serializable saveDanWei(DanWei paramDanWei);
  
  void saveOrUpdateDanWei(DanWei paramDanWei);
  
  void updateDanWei(DanWei paramDanWei);
  
  DanWei findDanWeiById(Serializable paramSerializable);
}
