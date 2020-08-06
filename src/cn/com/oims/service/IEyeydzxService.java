package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyeydzx;
import org.springframework.stereotype.Service;

@Service
public interface IEyeydzxService {
  void updateEyeydzx(Eyeydzx paramEyeydzx);
  
  void saveEyeydzx(Eyeydzx paramEyeydzx);
  
  Eyeydzx selectEyeydzxByEyeydzx(Eyeydzx paramEyeydzx);
  
  void deleteEyeydzx(Eyeydzx paramEyeydzx);
}
