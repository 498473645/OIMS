package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyeldcx;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public interface IEyeldcxService {
  void updateEyeldcx(Eyeldcx paramEyeldcx);
  
  Serializable saveEyeldcx(Eyeldcx paramEyeldcx);
  
  Eyeldcx selectEyeldcxByEyeldcx(Eyeldcx paramEyeldcx);
  
  void deleteEyeldcx(Eyeldcx paramEyeldcx);
  
  List getTreatResult(String paramString);
}
