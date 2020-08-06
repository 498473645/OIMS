package cn.com.oims.dao;

import cn.com.oims.dao.pojo.OutpTreatRec;
import java.util.Date;
import java.util.List;

public interface IOutpTreatRecDao {
  List<OutpTreatRec> getOutpTreatRecs(Date paramDate, String paramString);
  
  List<OutpTreatRec> getOutpTreatRecs(Date paramDate, String paramString, Integer paramInteger);
  
  void save(OutpTreatRec paramOutpTreatRec);
  
  OutpTreatRec getOutpTreatRec(Long paramLong);
  
  void delete(OutpTreatRec paramOutpTreatRec);
  
  List<OutpTreatRec> getOutpTreatRecs(Long paramLong, Integer paramInteger);
}
