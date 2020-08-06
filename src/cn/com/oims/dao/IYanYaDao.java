package cn.com.oims.dao;

import cn.com.oims.dao.pojo.YanYa;
import cn.com.oims.web.form.HzXxSearchForm;
import com.codesnet.common.Page;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public interface IYanYaDao extends BaseDao {
  int counts();
  
  List<YanYa> findAllYanYa4Page(Page paramPage, HzXxSearchForm paramHzXxSearchForm);
  
  List<YanYa> findAllYanYa();
  
  void delYanYa(Serializable paramSerializable);
  
  Serializable saveYanYa(YanYa paramYanYa);
  
  void saveOrUpdateYanYa(YanYa paramYanYa);
  
  void updateYanYa(YanYa paramYanYa);
  
  YanYa findYanYaById(Serializable paramSerializable);
  
  List<YanYa> getYanYaListByHzid(Long paramLong);
  
  List<YanYa> selectYanYasByYanYa(YanYa paramYanYa);
  
  YanYa getYanYaByJiuzhenId(Long paramLong);
  
  YanYa getYanYaByHzId(Long paramLong);
}
