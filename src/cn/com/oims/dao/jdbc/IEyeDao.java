package cn.com.oims.dao.jdbc;

import cn.com.oims.dao.pojo.EyeInfoOutpClinic;
import cn.com.oims.dao.pojo.HuanZheXinXi;
import java.util.Date;
import java.util.List;

public interface IEyeDao {
  EyeInfoOutpClinic getEyeInfoOutpClinic(String paramString1, Date paramDate, String paramString2);
  
  void saveEyeInfoOutpClinic(EyeInfoOutpClinic paramEyeInfoOutpClinic);
  
  void updateEyeInfoOutpClinic(EyeInfoOutpClinic paramEyeInfoOutpClinic);
  
  List<EyeInfoOutpClinic> getEyeInfoOutpClinicList(String paramString);
  
  Boolean findPatientById(String paramString);
  
  void addPatientToEyeDatabase(HuanZheXinXi paramHuanZheXinXi);
}
