package cn.com.oims.dao;

import cn.com.oims.dao.pojo.BaogaoPic;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public interface IBaogaoPicDao extends BaseDao {
  Serializable saveBaogaoPic(BaogaoPic paramBaogaoPic);
  
  void deleteBaogaoPicByBaogaoPic(BaogaoPic paramBaogaoPic);
  
  List<BaogaoPic> selectBaogaoPicsByBaogaoPic(BaogaoPic paramBaogaoPic);
}
