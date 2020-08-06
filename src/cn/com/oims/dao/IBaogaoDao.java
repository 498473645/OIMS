package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Baogao;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public interface IBaogaoDao extends BaseDao {
  int counts();
  
  List<Baogao> findAllBaogao4Page(Page paramPage);
  
  List<Baogao> findAllBaogao();
  
  void delBaogao(Serializable paramSerializable);
  
  Serializable saveBaogao(Baogao paramBaogao);
  
  void saveOrUpdateBaogao(Baogao paramBaogao);
  
  void updateBaogao(Baogao paramBaogao);
  
  Baogao findBaogaoById(Serializable paramSerializable);
  
  Baogao findBaogaoByJcdId(Long paramLong);
  
  void deleteBaogaoByJcdId(Long paramLong);
  
  void deleteBaogaoByBaogao(Baogao paramBaogao);
  
  void updateBaogaoByBaogao(Baogao paramBaogao);
  
  Baogao findBaogaoByBaogao(Baogao paramBaogao);
  
  List<Baogao> findBaogaosByBaogao(Baogao paramBaogao);
  
  void deleteBaogaoByBaogao(String paramString, Long paramLong);
}
