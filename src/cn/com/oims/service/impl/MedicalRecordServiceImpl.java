package cn.com.oims.service.impl;

import cn.com.oims.dao.IJzjlDao;
import cn.com.oims.dao.pojo.Jzjl;
import cn.com.oims.service.IMedicalRecordService;
import com.codesnet.common.Page;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MedicalRecordServiceImpl implements IMedicalRecordService {
  IJzjlDao dao = null;
  
  public IJzjlDao getDao() {
    return this.dao;
  }
  
  @Autowired
  public void setDao(IJzjlDao dao) {
    this.dao = dao;
  }
  
  public Long saveMedicalRecord(Jzjl jilu) {
    return (Long)this.dao.saveJzjl(jilu);
  }
  
  public void updateMedicalRecord(Jzjl jilu) {
    this.dao.updateJzjl(jilu);
  }
  
  public Jzjl getMedicalRecord(Long id) {
    return this.dao.findJzjlById(id);
  }
  
  public List<Jzjl> medicalRecords(Page page, Integer categoryId, Long jiuzhenId) {
    return this.dao.medicalRecords(page, categoryId, jiuzhenId);
  }
}
