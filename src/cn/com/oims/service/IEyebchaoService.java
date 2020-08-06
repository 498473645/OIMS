package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyebchao;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyebchaoService {
  void updateEyebchao(Eyebchao paramEyebchao);
  
  Serializable saveEyebchao(Eyebchao paramEyebchao);
  
  Eyebchao selectEyebchaoByEyebchao(Eyebchao paramEyebchao);
  
  void deleteEyebchao(Eyebchao paramEyebchao);
}
