package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyeminganduDao;
import cn.com.oims.dao.pojo.EyeMingandu;
import cn.com.oims.service.IEyeMinganduService;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyeMinganduServiceImpl implements IEyeMinganduService {
  @Autowired
  private IEyeminganduDao eyemgddao = null;
  
  public void updateEyeMGD(EyeMingandu eyemingandu) {
    this.eyemgddao.updateEyemingandu(eyemingandu);
  }
  
  public Serializable saveEyeMGD(EyeMingandu eyemingandu) {
    return this.eyemgddao.saveEyemingandu(eyemingandu);
  }
  
  public EyeMingandu selectEyeMGDByEyeMGD(EyeMingandu eyemingandu) {
    return this.eyemgddao.selectEyemgdByEyemgd(eyemingandu);
  }
  
  public void deleteEyeMGD(EyeMingandu eyemingandu) {
    this.eyemgddao.deleteEyemgd(eyemingandu);
  }
}
