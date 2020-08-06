package cn.com.oims.service;

import cn.com.oims.dao.pojo.Baogao;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public interface IBaogaoService {
  Baogao getBaogaoById(Serializable paramSerializable);
  
  Serializable saveBaogao(Baogao paramBaogao);
  
  void delBaogaoById(Serializable paramSerializable);
  
  void saveOrUpdateBaogao(Baogao paramBaogao);
  
  void updateBaogao(Baogao paramBaogao);
  
  List<Baogao> findAllBaogao();
  
  Map<String, Object> findAllBaogao4Page(Page paramPage);
  
  Baogao findBaogaoByJcdId(Long paramLong);
  
  void deleteBaogaoByJcdId(Long paramLong);
  
  void updateBaogaoByBaogao(Baogao paramBaogao);
  
  Baogao findBaogaoByBaogao(Baogao paramBaogao);
  
  List<Baogao> findBaogaosByBaogao(Baogao paramBaogao);
  
  void deleteBaogaoByBaogao(Baogao paramBaogao);
  
  void deleteBaogaoByBaogao(String paramString, Long paramLong);
}
