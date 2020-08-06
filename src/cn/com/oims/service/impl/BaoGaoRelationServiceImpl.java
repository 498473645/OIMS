package cn.com.oims.service.impl;

import cn.com.oims.dao.IBaoGaoRelationDao;
import cn.com.oims.dao.IHuanZheXinXiDao;
import cn.com.oims.dao.IJcdDao;
import cn.com.oims.dao.pojo.BaoGaoRelation;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import cn.com.oims.service.IBaoGaoRelationService;
import java.io.Serializable;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BaoGaoRelationServiceImpl implements IBaoGaoRelationService {
  @Autowired
  public IBaoGaoRelationDao baoGaoRelationDao;
  
  @Autowired
  public IJcdDao jcdDao;
  
  @Autowired
  public IHuanZheXinXiDao huanZheXinXiDao;
  
  public Serializable saveBaoGaoRelation(BaoGaoRelation baoGaoRelation) {
    return this.baoGaoRelationDao.saveBaoGaoRelation(baoGaoRelation);
  }
  
  public void updateBaoGaoRelation(BaoGaoRelation baoGaoRelation) {
    this.baoGaoRelationDao.updateBaoGaoRelation(baoGaoRelation);
  }
  
  public BaoGaoRelation getBaoGaoRelationById(Long id) {
    return this.baoGaoRelationDao.getBaoGaoRelationById(id);
  }
  
  public List<BaoGaoRelation> getBaoGaoRelationsByBaoGaoRelation(BaoGaoRelation baoGaoRelation) {
    return this.baoGaoRelationDao.getBaoGaoRelationsByBaoGaoRelation(baoGaoRelation);
  }
  
  public List<BaoGaoRelation> getBaoGaoRelationTimeTag(String binglihao, String jcxmId) {
    HuanZheXinXi hzxx = this.huanZheXinXiDao.getHuanzhexinxiByBLH(binglihao);
    List<BaoGaoRelation> list = this.baoGaoRelationDao.getBaoGaoRelation(hzxx.getId(), jcxmId);
    return list;
  }
  
  public void deleteBaogaoRelationByJcdId(Long jcdId) {
    this.baoGaoRelationDao.deleteBaogaoRelationByJcdId(jcdId);
  }
}
