package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyejmspjs;
import cn.com.oims.dao.pojo.Eyeygnew;
import cn.com.oims.dao.pojo.SgBlfy;
import cn.com.oims.dao.pojo.SgCcdj;
import cn.com.oims.dao.pojo.SgDpjl;
import cn.com.oims.dao.pojo.SgFcjl;
import cn.com.oims.dao.pojo.SgQjd;
import cn.com.oims.dao.pojo.Sgbl;
import cn.com.oims.web.form.SgZkjcForm;
import com.codesnet.common.Page;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public interface IShiGuangService {
  void saveSgbl(Sgbl paramSgbl);
  
  void updateSgbl(Sgbl paramSgbl);
  
  Sgbl getSgblById(Long paramLong);
  
  Map<String, Object> findSgbl4page(Page paramPage, String paramString);
  
  Sgbl getLastSgbl(String paramString);
  
  void saveSgCcdj(SgCcdj paramSgCcdj);
  
  void updateSgCcdj(SgCcdj paramSgCcdj);
  
  SgCcdj getSgCcdjById(Long paramLong);
  
  SgCcdj getSgCcdjByBlbh(Long paramLong);
  
  Map<String, Object> findSgCcdj4page(Page paramPage, Long paramLong);
  
  void saveSgDpjl(SgDpjl paramSgDpjl);
  
  void updateSgDpjl(SgDpjl paramSgDpjl);
  
  SgDpjl getSgDpjlById(Long paramLong);
  
  SgDpjl getSgDpjlByBlbh(Long paramLong);
  
  Map<String, Object> findSgDpjl4page(Page paramPage, Long paramLong);
  
  void saveSgQjd(SgQjd paramSgQjd);
  
  void updateSgQjd(SgQjd paramSgQjd);
  
  SgQjd getSgQjdById(Long paramLong);
  
  SgQjd getSgQjdByBlbh(Long paramLong);
  
  Map<String, Object> findSgQjd4page(Page paramPage, Long paramLong);
  
  void saveSgFcjl(SgFcjl paramSgFcjl);
  
  void updateSgFcjl(SgFcjl paramSgFcjl);
  
  SgFcjl getSgFcjlById(Long paramLong);
  
  SgFcjl getSgFcjlByBlbh(Long paramLong);
  
  Map<String, Object> findSgFcjl4page(Page paramPage, Long paramLong);
  
  List<SgFcjl> findSgFcjl(Long paramLong);
  
  Eyeygnew getEyeygnew(Long paramLong1, Long paramLong2, String paramString);
  
  Eyejmspjs getEyejmspjs(Long paramLong);
  
  List<SgZkjcForm> findZkjcByHzId(Long paramLong);
  
  List<SgZkjcForm> getLastZkjcByHzId(String paramString);
  
  void saveSgBlfy(SgBlfy paramSgBlfy);
  
  void updateSgBlfy(SgBlfy paramSgBlfy);
  
  SgBlfy getSgBlfyById(Long paramLong);
  
  SgBlfy getSgBlfyByBlbh(Long paramLong);
  
  Map<String, Object> findSgBlfy4page(Page paramPage, Long paramLong);
  
  List<SgBlfy> findSgBlfyByBlbh(Long paramLong);
}
