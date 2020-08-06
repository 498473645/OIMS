package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyejmhd;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyejmhdService {
  void updateEyejmhd(Eyejmhd paramEyejmhd);
  
  Serializable saveEyejmhd(Eyejmhd paramEyejmhd);
  
  Eyejmhd selectEyejmhdByEyejmhd(Eyejmhd paramEyejmhd);
  
  void deleteEyejmhd(Eyejmhd paramEyejmhd);
}
