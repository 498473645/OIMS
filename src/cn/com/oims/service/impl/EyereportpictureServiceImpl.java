package cn.com.oims.service.impl;

import cn.com.oims.dao.IEyereportpictureDao;
import cn.com.oims.dao.pojo.Eyereportpicture;
import cn.com.oims.service.IEyereportpictureService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EyereportpictureServiceImpl implements IEyereportpictureService {
  @Autowired
  private IEyereportpictureDao eyereportpicturedao = null;
  
  public void updateEyereportpicture(Eyereportpicture eyereportpicture) {
    this.eyereportpicturedao.updateEyereportpicture(eyereportpicture);
  }
  
  public void saveEyereportpicture(Eyereportpicture eyereportpicture) {
    this.eyereportpicturedao.saveEyereportpicture(eyereportpicture);
  }
  
  public Eyereportpicture selectEyereportpictureByEyereportpicture(Eyereportpicture eyereportpicture) {
    return this.eyereportpicturedao.selectEyereportpictureByEyereportpicture(eyereportpicture);
  }
  
  public void deleteEyereportpicture(Eyereportpicture eyereportpicture) {
    this.eyereportpicturedao.deleteEyereportpicture(eyereportpicture);
  }
  
  public List<Eyereportpicture> selectEyereportpicturesByEyereportpicture(Eyereportpicture eyereportpicture) {
    return this.eyereportpicturedao.selectEyereportpicturesByEyereportpicture(eyereportpicture);
  }
}
