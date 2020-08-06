package cn.com.oims.service.impl;

import cn.com.oims.dao.IMenZhenTJDao;
import cn.com.oims.service.IMenZhenTJService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MenZhenTJServiceImpl implements IMenZhenTJService {
  private IMenZhenTJDao MenZhenDao;
  
  @Autowired
  public void setMenZhenDao(IMenZhenTJDao menZhenDao) {
    this.MenZhenDao = menZhenDao;
  }
  
  public Map<String, Object> getPatientInfo(String patient_id) {
    return this.MenZhenDao.getPatientInfo(patient_id);
  }
}
