package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyelxdzx;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyelxdzxService {
  void updateEyelxdzx(Eyelxdzx paramEyelxdzx);
  
  Serializable saveEyelxdzx(Eyelxdzx paramEyelxdzx);
  
  Eyelxdzx selectEyelxdzxByEyelxdzx(Eyelxdzx paramEyelxdzx);
  
  void deleteEyelxdzx(Eyelxdzx paramEyelxdzx);
}
