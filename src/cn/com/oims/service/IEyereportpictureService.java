package cn.com.oims.service;

import cn.com.oims.dao.pojo.Eyereportpicture;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public interface IEyereportpictureService {
  void updateEyereportpicture(Eyereportpicture paramEyereportpicture);
  
  void saveEyereportpicture(Eyereportpicture paramEyereportpicture);
  
  Eyereportpicture selectEyereportpictureByEyereportpicture(Eyereportpicture paramEyereportpicture);
  
  List<Eyereportpicture> selectEyereportpicturesByEyereportpicture(Eyereportpicture paramEyereportpicture);
  
  void deleteEyereportpicture(Eyereportpicture paramEyereportpicture);
}
