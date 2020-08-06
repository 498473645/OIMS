package cn.com.oims.service;

import cn.com.oims.dao.pojo.BaogaoMoban;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public interface IBaogaoMobanService {
  BaogaoMoban getBaogaoMobanById(Serializable paramSerializable);
  
  Serializable saveBaogaoMoban(BaogaoMoban paramBaogaoMoban);
  
  void delBaogaoMobanById(Serializable paramSerializable);
  
  void saveOrUpdateBaogaoMoban(BaogaoMoban paramBaogaoMoban);
  
  void updateBaogaoMoban(BaogaoMoban paramBaogaoMoban);
  
  List<BaogaoMoban> findAllBaogaoMobans();
  
  Map<String, Object> findAllBaogaoMoban4Page(Page paramPage);
  
  Map<String, Object> findAllBaogaoMobansByPage(Page paramPage, BaogaoMoban paramBaogaoMoban);
  
  List<BaogaoMoban> findBaogaoMobansByBaogaoMoban(BaogaoMoban paramBaogaoMoban);
}
