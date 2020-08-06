package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyetsli;
import java.io.Serializable;
import org.springframework.stereotype.Service;

@Service
public interface IEyetsliService {
  void updateEyetsli(Eyetsli paramEyetsli);
  
  Serializable saveEyetsli(Eyetsli paramEyetsli);
  
  Eyetsli selectEyetsliByEyetsli(Eyetsli paramEyetsli);
  
  void deleteEyetsli(Eyetsli paramEyetsli);
}
