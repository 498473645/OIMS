package cn.com.oims.service;

import cn.com.oims.dao.pojo.YanYa;
import cn.com.oims.web.form.HzXxSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public interface IYanYaService {
  YanYa getYanYaById(Serializable paramSerializable);
  
  YanYa getYanYaByJcd(Serializable paramSerializable);
  
  Serializable saveYanYa(YanYa paramYanYa);
  
  void delYanYaById(Serializable paramSerializable);
  
  void saveOrUpdateYanYa(YanYa paramYanYa);
  
  void updateYanYa(YanYa paramYanYa);
  
  List<YanYa> findAllYanYa();
  
  Map<String, Object> findAllYanYa4Page(Page paramPage, HzXxSearchForm paramHzXxSearchForm);
  
  List<YanYa> getYanYaListByHzid(Long paramLong);
  
  List<YanYa> selectYanYasByYanYa(YanYa paramYanYa);
  
  YanYa getYanYaByJiuzheId(Long paramLong);
  
  YanYa getYanYaByHzId(Long paramLong);
}
