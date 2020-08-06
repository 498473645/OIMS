package cn.com.oims.dao;

import cn.com.oims.dao.pojo.Eyereportpicture;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public interface IEyereportpictureDao extends BaseDao {
  void updateEyereportpicture(Eyereportpicture paramEyereportpicture);
  
  void saveEyereportpicture(Eyereportpicture paramEyereportpicture);
  
  Eyereportpicture selectEyereportpictureByEyereportpicture(Eyereportpicture paramEyereportpicture);
  
  List<Eyereportpicture> selectEyereportpicturesByEyereportpicture(Eyereportpicture paramEyereportpicture);
  
  void deleteEyereportpicture(Eyereportpicture paramEyereportpicture);
}
