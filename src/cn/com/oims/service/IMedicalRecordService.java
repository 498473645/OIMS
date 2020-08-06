package cn.com.oims.service;

import cn.com.oims.dao.pojo.Jzjl;
import com.codesnet.common.Page;
import java.util.List;

public interface IMedicalRecordService {
  Long saveMedicalRecord(Jzjl paramJzjl);
  
  void updateMedicalRecord(Jzjl paramJzjl);
  
  Jzjl getMedicalRecord(Long paramLong);
  
  List<Jzjl> medicalRecords(Page paramPage, Integer paramInteger, Long paramLong);
}
