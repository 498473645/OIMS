package cn.com.oims.dao;

import cn.com.oims.dao.pojo.BaogaoMoban;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public interface IBaogaoMobanDao extends BaseDao {
  int counts();
  
  List<BaogaoMoban> findAllBaogaoMoban4Page(Page paramPage);
  
  List<BaogaoMoban> findAllBaogaoMobans();
  
  void delBaogaoMoban(Serializable paramSerializable);
  
  Serializable saveBaogaoMoban(BaogaoMoban paramBaogaoMoban);
  
  void saveOrUpdateBaogaoMoban(BaogaoMoban paramBaogaoMoban);
  
  void updateBaogaoMoban(BaogaoMoban paramBaogaoMoban);
  
  BaogaoMoban findBaogaoMobanById(Serializable paramSerializable);
  
  List findAllBaogaoMobansByPage(Page paramPage, BaogaoMoban paramBaogaoMoban);
  
  List<BaogaoMoban> findBaogaoMobansByBaogaoMoban(BaogaoMoban paramBaogaoMoban);
}
