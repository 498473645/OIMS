package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Jcd;
import cn.com.oims.dao.pojo.ShiLi;
import cn.com.oims.web.form.HzXxSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public interface IShiLiDao extends BaseDao {
  int counts();
  
  List<ShiLi> findAllShiLi4Page(Page paramPage);
  
  List<ShiLi> findAllShiLi();
  
  void delShiLi(Serializable paramSerializable);
  
  Serializable saveShiLi(ShiLi paramShiLi);
  
  void saveOrUpdateShiLi(ShiLi paramShiLi);
  
  void updateJcdBiaoShi(Jcd paramJcd);
  
  void updateShiLi(ShiLi paramShiLi);
  
  ShiLi findShiLiById(Serializable paramSerializable);
  
  List<Map<String, Object>> findShiLiByJcd(Serializable paramSerializable);
  
  List<ShiLi> getShiLiListByHzid(Long paramLong);
  
  List findAllShiLi4Page(Page paramPage, HzXxSearchForm paramHzXxSearchForm);
  
  List<ShiLi> findShiLi(Long paramLong, Integer paramInteger);
  
  Jcd findJcdByJiuzhenId(Long paramLong);
  
  ShiLi getShiLiByJcdId(Long paramLong);
  
  ShiLi getShiliByJiuzhenId(Long paramLong);
  
  ShiLi getShiliByHzId(Long paramLong);
}
