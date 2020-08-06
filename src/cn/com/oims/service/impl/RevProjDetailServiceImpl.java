package cn.com.oims.service.impl;

import cn.com.oims.dao.IRevProjDetailDao;
import cn.com.oims.dao.pojo.RevProjDetail;
import cn.com.oims.service.IRevProjDetailService;
import java.io.Serializable;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RevProjDetailServiceImpl implements IRevProjDetailService {
  @Autowired
  private IRevProjDetailDao iRevProjDetailDao;
  
  public Serializable saveRevProjDetail(RevProjDetail t) {
    return this.iRevProjDetailDao.saveRevProjDetail(t);
  }
  
  public void delByRevProjId(Long revProjId) {
    this.iRevProjDetailDao.delByRevProjId(revProjId);
  }
  
  public List<RevProjDetail> getRevProjDetailByRevProjId(Long revProjId) {
    return this.iRevProjDetailDao.getRevProjDetailByRevProjId(revProjId);
  }
}
