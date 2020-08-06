package cn.com.oims.service;

import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.ShiLi;
import cn.com.oims.web.form.HzXxSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public interface IShiLiService {
  ShiLi getShiLiById(Serializable paramSerializable);
  
  Serializable saveShiLi(ShiLi paramShiLi);
  
  void updateJcdBiaoShi(Jcd paramJcd);
  
  void delShiLiById(Serializable paramSerializable);
  
  void saveOrUpdateShiLi(ShiLi paramShiLi);
  
  void updateShiLi(ShiLi paramShiLi);
  
  List<ShiLi> findAllShiLi();
  
  List<Map<String, Object>> findShiLiByJcdId(Serializable paramSerializable);
  
  Map<String, Object> findAllShiLi4Page(Page paramPage);
  
  Map<String, Object> findAllShiLi4Page(Page paramPage, HzXxSearchForm paramHzXxSearchForm);
  
  List<ShiLi> getShiLiListByHzid(Long paramLong);
  
  List<ShiLi> findShiLi(Long paramLong, Integer paramInteger);
  
  ShiLi getShiliByJcdId(Long paramLong);
  
  ShiLi getShiliByJiuzhenId(Long paramLong);
  
  ShiLi getShiliByHzId(Long paramLong);
  
  String getShiLiValue(float paramFloat);
}
