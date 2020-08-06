package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyejgzl;
import java.io.Serializable;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public interface IEyejgzlService {
  void updateEyejgzl(Eyejgzl paramEyejgzl);
  
  Serializable saveEyejgzl(Eyejgzl paramEyejgzl);
  
  Eyejgzl selectEyejgzlByEyejgzl(Eyejgzl paramEyejgzl);
  
  void deleteEyejgzl(Eyejgzl paramEyejgzl);
  
  List getTreatResult(String paramString);
}
