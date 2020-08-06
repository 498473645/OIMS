package cn.com.oims.service.impl;

import cn.com.oims.dao.IBaogaoPicDao;
import cn.com.oims.dao.pojo.BaogaoPic;
import cn.com.oims.service.IBaogaoPicService;
import java.io.Serializable;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BaogaoPicServiceImpl implements IBaogaoPicService {
  @Autowired
  private IBaogaoPicDao baogaopicdao = null;
  
  public Serializable saveBaogaoPic(BaogaoPic baogaoPic) {
    return this.baogaopicdao.saveBaogaoPic(baogaoPic);
  }
  
  public void deleteBaogaoPicByBaogaoPic(BaogaoPic baogaopic) {
    this.baogaopicdao.deleteBaogaoPicByBaogaoPic(baogaopic);
  }
  
  public List<BaogaoPic> selectBaogaoPicsByBaogaoPic(BaogaoPic baogaopic) {
    return this.baogaopicdao.selectBaogaoPicsByBaogaoPic(baogaopic);
  }
}
