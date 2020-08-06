package cn.com.oims.service;

import cn.com.oims.dao.pojo.BaogaoPic;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public interface IBaogaoPicService {
  Serializable saveBaogaoPic(BaogaoPic paramBaogaoPic);
  
  void deleteBaogaoPicByBaogaoPic(BaogaoPic paramBaogaoPic);
  
  List<BaogaoPic> selectBaogaoPicsByBaogaoPic(BaogaoPic paramBaogaoPic);
}
